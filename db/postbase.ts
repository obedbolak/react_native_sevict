import * as SQLite from 'expo-sqlite';

// Database and table names
const DB_NAME = 'posts.db';
const POSTS_TABLE = 'posts';
const IMAGES_TABLE = 'post_images';

// Interface definitions
interface PostImage {
  public_id: string;
  url: string;
  _id: string;
}

interface User {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  images: PostImage[];
  likes: number;
  postedBy: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SyncResult {
  added: number;
  updated: number;
}

// Database instance
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the database and create tables
 */
export const initPostDatabase = async (): Promise<void> => {
  try {
    if (!db) {
      db = await SQLite.openDatabaseAsync(DB_NAME);
    }

    // Create posts table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS ${POSTS_TABLE} (
        _id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        postedBy_id TEXT NOT NULL,
        postedBy_name TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        __v INTEGER DEFAULT 0
      );
    `);

    // Create post images table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS ${IMAGES_TABLE} (
        _id TEXT PRIMARY KEY,
        post_id TEXT NOT NULL,
        public_id TEXT NOT NULL,
        url TEXT NOT NULL,
        FOREIGN KEY (post_id) REFERENCES ${POSTS_TABLE}(_id) ON DELETE CASCADE
      );
    `);

    // Create indexes for better performance
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_posts_created_at ON ${POSTS_TABLE}(createdAt DESC);
      CREATE INDEX IF NOT EXISTS idx_images_post_id ON ${IMAGES_TABLE}(post_id);
    `);

    console.log('Post database initialized successfully');
  } catch (error) {
    console.error('Error initializing post database:', error);
    throw error;
  }
};

/**
 * Save a single post to the database
 */
export const savePostToDatabase = async (post: Post): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    await db.runAsync('BEGIN TRANSACTION');

    // Insert or replace post
    await db.runAsync(
      `INSERT OR REPLACE INTO ${POSTS_TABLE} 
       (_id, title, description, likes, postedBy_id, postedBy_name, createdAt, updatedAt, __v) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        post._id,
        post.title,
        post.description,
        post.likes,
        post.postedBy._id,
        post.postedBy.name,
        post.createdAt,
        post.updatedAt,
        post.__v
      ]
    );

    // Delete existing images for this post
    await db.runAsync(`DELETE FROM ${IMAGES_TABLE} WHERE post_id = ?`, [post._id]);

    // Insert new images
    for (const image of post.images) {
      await db.runAsync(
        `INSERT INTO ${IMAGES_TABLE} (_id, post_id, public_id, url) VALUES (?, ?, ?, ?)`,
        [image._id, post._id, image.public_id, image.url]
      );
    }

    await db.runAsync('COMMIT');
    console.log(`Post ${post._id} saved to database`);
  } catch (error) {
    await db.runAsync('ROLLBACK');
    console.error('Error saving post to database:', error);
    throw error;
  }
};

/**
 * Save multiple posts to the database
 */
export const savePostsToDatabase = async (posts: Post[]): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    await db.runAsync('BEGIN TRANSACTION');

    for (const post of posts) {
      // Insert or replace post
      await db.runAsync(
        `INSERT OR REPLACE INTO ${POSTS_TABLE} 
         (_id, title, description, likes, postedBy_id, postedBy_name, createdAt, updatedAt, __v) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          post._id,
          post.title,
          post.description,
          post.likes,
          post.postedBy._id,
          post.postedBy.name,
          post.createdAt,
          post.updatedAt,
          post.__v
        ]
      );

      // Delete existing images for this post
      await db.runAsync(`DELETE FROM ${IMAGES_TABLE} WHERE post_id = ?`, [post._id]);

      // Insert new images
      for (const image of post.images) {
        await db.runAsync(
          `INSERT INTO ${IMAGES_TABLE} (_id, post_id, public_id, url) VALUES (?, ?, ?, ?)`,
          [image._id, post._id, image.public_id, image.url]
        );
      }
    }

    await db.runAsync('COMMIT');
    console.log(`${posts.length} posts saved to database`);
  } catch (error) {
    await db.runAsync('ROLLBACK');
    console.error('Error saving posts to database:', error);
    throw error;
  }
};

/**
 * Get all posts from the database
 */
export const getPostsFromDatabase = async (): Promise<Post[]> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    // Get all posts ordered by creation date (newest first)
    const postsResult = await db.getAllAsync<{
      _id: string;
      title: string;
      description: string;
      likes: number;
      postedBy_id: string;
      postedBy_name: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }>(`SELECT * FROM ${POSTS_TABLE} ORDER BY createdAt DESC`);

    const posts: Post[] = [];

    for (const postRow of postsResult) {
      // Get images for this post
      const imagesResult = await db.getAllAsync<{
        _id: string;
        public_id: string;
        url: string;
      }>(`SELECT _id, public_id, url FROM ${IMAGES_TABLE} WHERE post_id = ?`, [postRow._id]);

      const post: Post = {
        _id: postRow._id,
        title: postRow.title,
        description: postRow.description,
        likes: postRow.likes,
        postedBy: {
          _id: postRow.postedBy_id,
          name: postRow.postedBy_name
        },
        createdAt: postRow.createdAt,
        updatedAt: postRow.updatedAt,
        __v: postRow.__v,
        images: imagesResult.map(img => ({
          _id: img._id,
          public_id: img.public_id,
          url: img.url
        }))
      };

      posts.push(post);
    }

    console.log(`Retrieved ${posts.length} posts from database`);
    return posts;
  } catch (error) {
    console.error('Error getting posts from database:', error);
    throw error;
  }
};

/**
 * Get a single post by ID
 */
export const getPostById = async (postId: string): Promise<Post | null> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    const postResult = await db.getFirstAsync<{
      _id: string;
      title: string;
      description: string;
      likes: number;
      postedBy_id: string;
      postedBy_name: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }>(`SELECT * FROM ${POSTS_TABLE} WHERE _id = ?`, [postId]);

    if (!postResult) {
      return null;
    }

    // Get images for this post
    const imagesResult = await db.getAllAsync<{
      _id: string;
      public_id: string;
      url: string;
    }>(`SELECT _id, public_id, url FROM ${IMAGES_TABLE} WHERE post_id = ?`, [postId]);

    const post: Post = {
      _id: postResult._id,
      title: postResult.title,
      description: postResult.description,
      likes: postResult.likes,
      postedBy: {
        _id: postResult.postedBy_id,
        name: postResult.postedBy_name
      },
      createdAt: postResult.createdAt,
      updatedAt: postResult.updatedAt,
      __v: postResult.__v,
      images: imagesResult.map(img => ({
        _id: img._id,
        public_id: img.public_id,
        url: img.url
      }))
    };

    return post;
  } catch (error) {
    console.error('Error getting post by ID:', error);
    throw error;
  }
};

/**
 * Update a post in the database
 */
export const updatePostInDatabase = async (
  postId: string, 
  updates: Partial<Post>
): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    await db.runAsync('BEGIN TRANSACTION');

    // Build dynamic update query
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (updates.title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(updates.title);
    }
    if (updates.description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(updates.description);
    }
    if (updates.likes !== undefined) {
      updateFields.push('likes = ?');
      updateValues.push(updates.likes);
    }
    if (updates.updatedAt !== undefined) {
      updateFields.push('updatedAt = ?');
      updateValues.push(updates.updatedAt);
    }
    if (updates.__v !== undefined) {
      updateFields.push('__v = ?');
      updateValues.push(updates.__v);
    }

    if (updateFields.length > 0) {
      updateValues.push(postId);
      await db.runAsync(
        `UPDATE ${POSTS_TABLE} SET ${updateFields.join(', ')} WHERE _id = ?`,
        updateValues
      );
    }

    // Update images if provided
    if (updates.images !== undefined) {
      // Delete existing images
      await db.runAsync(`DELETE FROM ${IMAGES_TABLE} WHERE post_id = ?`, [postId]);

      // Insert new images
      for (const image of updates.images) {
        await db.runAsync(
          `INSERT INTO ${IMAGES_TABLE} (_id, post_id, public_id, url) VALUES (?, ?, ?, ?)`,
          [image._id, postId, image.public_id, image.url]
        );
      }
    }

    await db.runAsync('COMMIT');
    console.log(`Post ${postId} updated in database`);
  } catch (error) {
    await db.runAsync('ROLLBACK');
    console.error('Error updating post in database:', error);
    throw error;
  }
};

/**
 * Delete a post from the database
 */
export const deletePostFromDatabase = async (postId: string): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    await db.runAsync('BEGIN TRANSACTION');

    // Delete images first (foreign key constraint)
    await db.runAsync(`DELETE FROM ${IMAGES_TABLE} WHERE post_id = ?`, [postId]);

    // Delete post
    await db.runAsync(`DELETE FROM ${POSTS_TABLE} WHERE _id = ?`, [postId]);

    await db.runAsync('COMMIT');
    console.log(`Post ${postId} deleted from database`);
  } catch (error) {
    await db.runAsync('ROLLBACK');
    console.error('Error deleting post from database:', error);
    throw error;
  }
};

/**
 * Get the count of posts in the database
 */
export const getPostsCount = async (): Promise<number> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    const result = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM ${POSTS_TABLE}`
    );
    return result?.count || 0;
  } catch (error) {
    console.error('Error getting posts count:', error);
    throw error;
  }
};

/**
 * Sync posts with server data (intelligent comparison and update)
 */
export const syncPostsWithServer = async (serverPosts: Post[]): Promise<SyncResult> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    let added = 0;
    let updated = 0;

    // First, get all local posts outside of transaction
    const localPostsResult = await db.getAllAsync<{
      _id: string;
      updatedAt: string;
    }>(`SELECT _id, updatedAt FROM ${POSTS_TABLE}`);

    // Create a map for quick lookup
    const localPostsMap = new Map<string, string>();
    localPostsResult.forEach(post => {
      localPostsMap.set(post._id, post.updatedAt);
    });

    // Now start transaction for all write operations
    await db.runAsync('BEGIN TRANSACTION');

    for (const serverPost of serverPosts) {
      const localUpdatedAt = localPostsMap.get(serverPost._id);

      if (!localUpdatedAt) {
        // New post - add it
        await db.runAsync(
          `INSERT INTO ${POSTS_TABLE} 
           (_id, title, description, likes, postedBy_id, postedBy_name, createdAt, updatedAt, __v) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            serverPost._id,
            serverPost.title,
            serverPost.description,
            serverPost.likes,
            serverPost.postedBy._id,
            serverPost.postedBy.name,
            serverPost.createdAt,
            serverPost.updatedAt,
            serverPost.__v
          ]
        );

        // Add images
        for (const image of serverPost.images) {
          await db.runAsync(
            `INSERT INTO ${IMAGES_TABLE} (_id, post_id, public_id, url) VALUES (?, ?, ?, ?)`,
            [image._id, serverPost._id, image.public_id, image.url]
          );
        }

        added++;
      } else {
        // Check if server version is newer
        const localDate = new Date(localUpdatedAt);
        const serverDate = new Date(serverPost.updatedAt);

        if (serverDate > localDate) {
          // Update existing post
          await db.runAsync(
            `UPDATE ${POSTS_TABLE} 
             SET title = ?, description = ?, likes = ?, postedBy_id = ?, postedBy_name = ?, 
                 createdAt = ?, updatedAt = ?, __v = ? 
             WHERE _id = ?`,
            [
              serverPost.title,
              serverPost.description,
              serverPost.likes,
              serverPost.postedBy._id,
              serverPost.postedBy.name,
              serverPost.createdAt,
              serverPost.updatedAt,
              serverPost.__v,
              serverPost._id
            ]
          );

          // Update images
          await db.runAsync(`DELETE FROM ${IMAGES_TABLE} WHERE post_id = ?`, [serverPost._id]);
          for (const image of serverPost.images) {
            await db.runAsync(
              `INSERT INTO ${IMAGES_TABLE} (_id, post_id, public_id, url) VALUES (?, ?, ?, ?)`,
              [image._id, serverPost._id, image.public_id, image.url]
            );
          }

          updated++;
        }
      }
    }

    await db.runAsync('COMMIT');

    console.log(`Sync completed: ${added} posts added, ${updated} posts updated`);
    return { added, updated };
  } catch (error) {
    try {
      await db.runAsync('ROLLBACK');
    } catch (rollbackError) {
      console.error('Error during rollback:', rollbackError);
    }
    console.error('Error syncing posts with server:', error);
    throw error;
  }
};

/**
 * Clear all posts from the database
 */
export const clearPostsDatabase = async (): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    await db.runAsync('BEGIN TRANSACTION');
    await db.runAsync(`DELETE FROM ${IMAGES_TABLE}`);
    await db.runAsync(`DELETE FROM ${POSTS_TABLE}`);
    await db.runAsync('COMMIT');
    console.log('Posts database cleared');
  } catch (error) {
    await db.runAsync('ROLLBACK');
    console.error('Error clearing posts database:', error);
    throw error;
  }
};

/**
 * Get database statistics
 */
export const getDatabaseStats = async (): Promise<{
  postsCount: number;
  imagesCount: number;
  dbSize: number;
}> => {
  if (!db) {
    throw new Error('Database not initialized');
  }

  try {
    const postsResult = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM ${POSTS_TABLE}`
    );
    const imagesResult = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM ${IMAGES_TABLE}`
    );

    // Get database size (approximate)
    const sizeResult = await db.getFirstAsync<{ size: number }>(
      `SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()`
    );

    return {
      postsCount: postsResult?.count || 0,
      imagesCount: imagesResult?.count || 0,
      dbSize: sizeResult?.size || 0
    };
  } catch (error) {
    console.error('Error getting database stats:', error);
    throw error;
  }
};