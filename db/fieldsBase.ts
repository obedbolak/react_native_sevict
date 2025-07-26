import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("fields.db");

// Interfaces based on your JSON response
interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  image: string;
  description: string;
  field: string;
  _id: string;
}

interface Program {
  name: string;
  duration: string;
  level: string[];
  description: string;
  careerPaths: string[];
  images: string[];
  courses: Course[];
  _id: string;
}

interface Field {
  _id: string;
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  programsCount: number;
  totalCourses: number;
  programs: Program[];
}

interface FieldsResponse {
  success: boolean;
  message: string;
  count: number;
  fields: Field[];
}

interface SavedField {
  id: string;
  fieldId: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  programsCount: number;
  totalCourses: number;
}

interface SavedProgram {
  id: string;
  fieldId: string;
  name: string;
  duration: string;
  level: string; // JSON stringified array
  description: string;
  careerPaths: string; // JSON stringified array
  programId: string;
}

interface SavedCourse {
  id: string;
  programId: string;
  courseId: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  description: string;
  field: string;
  mongoId: string;
}

interface SavedImage {
  id: string;
  referenceId: string; // programId or courseId
  referenceType: string; // 'program' or 'course'
  url: string;
  blob: Uint8Array;
}

// Initialize fields database
export const initFieldsDatabase = async (): Promise<void> => {
  try {
    // Create fields table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS fields (
        id TEXT PRIMARY KEY,
        fieldId TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        description TEXT NOT NULL,
        programsCount INTEGER NOT NULL DEFAULT 0,
        totalCourses INTEGER NOT NULL DEFAULT 0
      )
    `);

    // Create programs table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS programs (
        id TEXT PRIMARY KEY,
        fieldId TEXT NOT NULL,
        name TEXT NOT NULL,
        duration TEXT NOT NULL,
        level TEXT NOT NULL,
        description TEXT NOT NULL,
        careerPaths TEXT NOT NULL,
        programId TEXT NOT NULL,
        FOREIGN KEY (fieldId) REFERENCES fields (fieldId) ON DELETE CASCADE
      )
    `);

    // Create courses table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        programId TEXT NOT NULL,
        courseId TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        instructor TEXT NOT NULL,
        duration TEXT NOT NULL,
        level TEXT NOT NULL,
        rating REAL NOT NULL DEFAULT 0,
        students INTEGER NOT NULL DEFAULT 0,
        description TEXT NOT NULL,
        field TEXT NOT NULL,
        mongoId TEXT NOT NULL,
        FOREIGN KEY (programId) REFERENCES programs (programId) ON DELETE CASCADE
      )
    `);

    // Create images table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS field_images (
        id TEXT PRIMARY KEY,
        referenceId TEXT NOT NULL,
        referenceType TEXT NOT NULL,
        url TEXT NOT NULL,
        blob BLOB NOT NULL
      )
    `);

    // Create indexes
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_programs_field_id ON programs(fieldId);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_courses_program_id ON courses(programId);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_field_images_reference ON field_images(referenceId, referenceType);
    `);

    console.log("Fields database initialized successfully");
  } catch (error) {
    console.error("Error initializing fields database:", error);
    throw error;
  }
};

// Enhanced image download with retry logic
const downloadImageAsBlob = async (
  url: string,
  retries = 3
): Promise<Uint8Array> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    } catch (error) {
      console.warn(`Image download attempt ${attempt} failed:`, error);

      if (attempt === retries) {
        throw new Error(
          `Failed to download image after ${retries} attempts: ${error}`
        );
      }

      // Wait before retry (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  throw new Error("Unexpected error in downloadImageAsBlob");
};

// Save fields with all related data
export const saveFields = async (fieldsData: FieldsResponse): Promise<void> => {
  if (
    !fieldsData.success ||
    !fieldsData.fields ||
    !Array.isArray(fieldsData.fields)
  ) {
    throw new Error("Invalid fields data format");
  }

  console.log(`Saving ${fieldsData.fields.length} fields...`);

  try {
    // Start transaction
    await db.execAsync("BEGIN TRANSACTION");

    // Clear existing data
    await db.runAsync("DELETE FROM field_images");
    await db.runAsync("DELETE FROM courses");
    await db.runAsync("DELETE FROM programs");
    await db.runAsync("DELETE FROM fields");

    for (const field of fieldsData.fields) {
      try {
        // Insert field
        await db.runAsync(
          `INSERT INTO fields 
           (id, fieldId, title, icon, color, description, programsCount, totalCourses)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            field._id,
            field.id,
            field.title,
            field.icon,
            field.color,
            field.description,
            field.programsCount,
            field.totalCourses,
          ]
        );

        // Process programs
        for (const program of field.programs) {
          // Insert program
          await db.runAsync(
            `INSERT INTO programs 
             (id, fieldId, name, duration, level, description, careerPaths, programId)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              `${field.id}_${program._id}`,
              field.id,
              program.name,
              program.duration,
              JSON.stringify(program.level),
              program.description,
              JSON.stringify(program.careerPaths),
              program._id,
            ]
          );

          // Download and save program images
          if (program.images && Array.isArray(program.images)) {
            for (let i = 0; i < program.images.length; i++) {
              const imageUrl = program.images[i];
              try {
                console.log(`Downloading program image: ${imageUrl}`);
                const imageBlob = await downloadImageAsBlob(imageUrl);

                await db.runAsync(
                  `INSERT INTO field_images 
                   (id, referenceId, referenceType, url, blob)
                   VALUES (?, ?, ?, ?, ?)`,
                  [
                    `${program._id}_image_${i}`,
                    program._id,
                    "program",
                    imageUrl,
                    imageBlob,
                  ]
                );

                console.log(`Program image saved: ${program._id}_image_${i}`);
              } catch (imageError) {
                console.warn(
                  `Failed to download program image ${imageUrl}:`,
                  imageError
                );
                // Continue with next image even if one fails
              }
            }
          }

          // Process courses
          for (const course of program.courses) {
            // Insert course
            await db.runAsync(
              `INSERT INTO courses 
               (id, programId, courseId, title, category, instructor, duration, level, rating, students, description, field, mongoId)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                `${program._id}_${course.id}`,
                program._id,
                course.id,
                course.title,
                course.category,
                course.instructor,
                course.duration,
                course.level,
                course.rating,
                course.students,
                course.description,
                course.field,
                course._id,
              ]
            );

            // Download and save course image
            if (course.image) {
              try {
                console.log(`Downloading course image: ${course.image}`);
                const imageBlob = await downloadImageAsBlob(course.image);

                await db.runAsync(
                  `INSERT INTO field_images 
                   (id, referenceId, referenceType, url, blob)
                   VALUES (?, ?, ?, ?, ?)`,
                  [
                    `${course.id}_image`,
                    course.id,
                    "course",
                    course.image,
                    imageBlob,
                  ]
                );

                console.log(`Course image saved: ${course.id}_image`);
              } catch (imageError) {
                console.warn(
                  `Failed to download course image ${course.image}:`,
                  imageError
                );
                // Continue even if image fails
              }
            }
          }
        }

        console.log(`Field saved: ${field.id}`);
      } catch (fieldError) {
        console.error(`Failed to save field ${field.id}:`, fieldError);
        // Continue with next field even if one fails
      }
    }

    // Commit transaction
    await db.execAsync("COMMIT");
    console.log("Finished saving fields");
  } catch (error) {
    // Rollback on error
    try {
      await db.execAsync("ROLLBACK");
    } catch (rollbackError) {
      console.error("Error during rollback:", rollbackError);
    }
    console.error("Error saving fields:", error);
    throw error;
  }
};

// Get all fields with complete data
export const getAllFields = async (): Promise<Field[]> => {
  try {
    const fields = await db.getAllAsync<SavedField>(`
      SELECT * FROM fields 
      ORDER BY title ASC
    `);

    if (!fields || fields.length === 0) {
      return [];
    }

    const fieldsWithPrograms: Field[] = [];

    for (const field of fields) {
      // Get programs for this field
      const programs = await db.getAllAsync<SavedProgram>(
        `
        SELECT * FROM programs 
        WHERE fieldId = ?
        ORDER BY name ASC
      `,
        [field.fieldId]
      );

      const fieldPrograms: Program[] = [];

      for (const program of programs) {
        // Get courses for this program
        const courses = await db.getAllAsync<SavedCourse>(
          `
          SELECT * FROM courses 
          WHERE programId = ?
          ORDER BY title ASC
        `,
          [program.programId]
        );

        // Get program images
        const programImages = await db.getAllAsync<SavedImage>(
          `
          SELECT * FROM field_images 
          WHERE referenceId = ? AND referenceType = 'program'
          ORDER BY id ASC
        `,
          [program.programId]
        );

        const programCourses: Course[] = [];

        for (const course of courses) {
          const fullCourse: Course = {
            id: course.courseId,
            title: course.title,
            category: course.category,
            instructor: course.instructor,
            duration: course.duration,
            level: course.level,
            rating: course.rating,
            students: course.students,
            image: "", // Will be populated from blob if needed
            description: course.description,
            field: course.field,
            _id: course.mongoId,
          };

          programCourses.push(fullCourse);
        }

        const fullProgram: Program = {
          name: program.name,
          duration: program.duration,
          level: JSON.parse(program.level),
          description: program.description,
          careerPaths: JSON.parse(program.careerPaths),
          images: programImages.map((img) => img.url),
          courses: programCourses,
          _id: program.programId,
        };

        fieldPrograms.push(fullProgram);
      }

      const fullField: Field = {
        _id: field.id,
        id: field.fieldId,
        title: field.title,
        icon: field.icon,
        color: field.color,
        description: field.description,
        programsCount: field.programsCount,
        totalCourses: field.totalCourses,
        programs: fieldPrograms,
      };

      fieldsWithPrograms.push(fullField);
    }

    return fieldsWithPrograms;
  } catch (error) {
    console.error("Error getting fields:", error);
    return [];
  }
};

// Get image blob for offline display
export const getFieldImageBlob = async (
  referenceId: string,
  referenceType: "program" | "course"
): Promise<Uint8Array | null> => {
  try {
    const result = await db.getFirstAsync<{ blob: Uint8Array }>(
      `
      SELECT blob FROM field_images 
      WHERE referenceId = ? AND referenceType = ?
      LIMIT 1
    `,
      [referenceId, referenceType]
    );

    return result?.blob || null;
  } catch (error) {
    console.error("Error getting image blob:", error);
    return null;
  }
};

// Get fields count
export const getFieldsCount = async (): Promise<number> => {
  try {
    const result = await db.getFirstAsync<{ count: number }>(`
      SELECT COUNT(*) as count FROM fields
    `);
    return result?.count || 0;
  } catch (error) {
    console.error("Error getting fields count:", error);
    return 0;
  }
};

// Delete all fields
export const deleteAllFields = async (): Promise<void> => {
  try {
    await db.execAsync("BEGIN TRANSACTION");
    await db.runAsync("DELETE FROM field_images");
    await db.runAsync("DELETE FROM courses");
    await db.runAsync("DELETE FROM programs");
    await db.runAsync("DELETE FROM fields");
    await db.execAsync("COMMIT");
    console.log("All fields deleted");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    console.error("Error deleting fields:", error);
    throw error;
  }
};

// Search fields by title or description
export const searchFields = async (query: string): Promise<Field[]> => {
  try {
    const fields = await db.getAllAsync<SavedField>(
      `
      SELECT * FROM fields 
      WHERE title LIKE ? OR description LIKE ?
      ORDER BY title ASC
    `,
      [`%${query}%`, `%${query}%`]
    );

    // For search results, we'll return a simplified version without all nested data
    // to improve performance. You can modify this based on your needs.
    const searchResults: Field[] = fields.map((field) => ({
      _id: field.id,
      id: field.fieldId,
      title: field.title,
      icon: field.icon,
      color: field.color,
      description: field.description,
      programsCount: field.programsCount,
      totalCourses: field.totalCourses,
      programs: [], // Empty for search results, load full data when needed
    }));

    return searchResults;
  } catch (error) {
    console.error("Error searching fields:", error);
    return [];
  }
};
