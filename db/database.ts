import * as SQLite from 'expo-sqlite';

// Type definitions matching your server response
interface ProfilePic {
  public_id: string;
  url: string;
}

// Type for server response
interface ServerUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: ProfilePic | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Type definitions matching your AuthContext User interface
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: ProfilePic | null; // Fixed: Made this nullable to match reality
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Database connection with proper error handling
const getDatabaseAsync = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    return await SQLite.openDatabaseAsync('authDatabase.db');
  } catch (error) {
    console.error('Failed to open database:', error);
    throw new Error('Database connection failed');
  }
};

// Helper function to download and convert image URL to base64
const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    // Convert to base64 directly
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data URL prefix
      };
      reader.onerror = () => reject(new Error('Failed to convert to base64'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Failed to convert URL to base64:', error);
    throw error;
  }
};

// Convert server user format to local user format (simplified)
const convertServerUserToLocalUser = (serverUser: ServerUser): User => {
  return {
    _id: serverUser._id,
    name: serverUser.name,
    email: serverUser.email,
    role: serverUser.role,
    profilePic: serverUser.profilePic, // Keep the original format with URL
    createdAt: serverUser.createdAt,
    updatedAt: serverUser.updatedAt,
    __v: serverUser.__v
  };
};

// TypeScript interfaces for database operations
interface TableColumn {
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
}

interface LegacyUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic_base64?: string | null;
  profilePic_type?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: any; // For any additional legacy fields
}

// Initialize database with users table and handle migrations
export const initDatabase = async (): Promise<void> => {
  try {
    const db = await getDatabaseAsync();
    
    // Check if table exists and get its structure
    const tableInfo = await db.getAllAsync<TableColumn>(`PRAGMA table_info(users)`);
    const existingColumns = tableInfo.map((col) => col.name);
    
    console.log('Existing columns:', existingColumns);
    
    if (tableInfo.length === 0) {
      // Table doesn't exist, create it with the full structure
      console.log('Creating new users table...');
      await db.execAsync(`
        CREATE TABLE users (
          _id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          role TEXT NOT NULL,
          profilePic_public_id TEXT,
          profilePic_url TEXT,
          profilePic_base64 TEXT,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          __v INTEGER DEFAULT 0
        );
      `);
      
      // Create index for faster email lookups
      await db.execAsync(`
        CREATE INDEX idx_users_email ON users(email);
      `);
      
      console.log('New users table created successfully');
    } else {
      // Table exists, check if we need to migrate
      const requiredColumns: string[] = [
        '_id', 'name', 'email', 'role', 
        'profilePic_public_id', 'profilePic_url', 'profilePic_base64',
        'createdAt', 'updatedAt', '__v'
      ];
      
      const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));
      
      if (missingColumns.length > 0) {
        console.log('Migrating database, missing columns:', missingColumns);
        
        // Get existing data with proper typing
        const existingUsers = await db.getAllAsync<LegacyUser>('SELECT * FROM users');
        console.log(`Found ${existingUsers.length} existing users to migrate`);
        
        // Drop the old table
        await db.execAsync(`DROP TABLE IF EXISTS users;`);
        
        // Create new table with correct structure
        await db.execAsync(`
          CREATE TABLE users (
            _id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL,
            profilePic_public_id TEXT,
            profilePic_url TEXT,
            profilePic_base64 TEXT,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL,
            __v INTEGER DEFAULT 0
          );
        `);
        
        // Create index
        await db.execAsync(`
          CREATE INDEX idx_users_email ON users(email);
        `);
        
        // Migrate existing data with proper error handling
        for (const user of existingUsers) {
          try {
            // Handle old data structure with type safety
            const profilePicPublicId: string | null = null;
            const profilePicUrl: string | null = null;
            const profilePicBase64: string | null = user.profilePic_base64 || null;
            
            // Ensure all required fields exist with fallbacks
            const migrationData: [string, string, string, string, string | null, string | null, string | null, string, string, number] = [
              user._id || '',
              user.name || '',
              user.email || '',
              user.role || 'user',
              profilePicPublicId,
              profilePicUrl,
              profilePicBase64,
              user.createdAt || new Date().toISOString(),
              user.updatedAt || new Date().toISOString(),
              user.__v ?? 0
            ];
            
            await db.runAsync(
              `INSERT INTO users (
                _id, name, email, role, 
                profilePic_public_id, profilePic_url, profilePic_base64,
                createdAt, updatedAt, __v
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              migrationData
            );
            
            console.log(`Migrated user: ${user.email}`);
          } catch (migrateError) {
            console.error(`Failed to migrate user ${user.email}:`, migrateError);
            // Continue with other users even if one fails
          }
        }
        
        console.log('Database migration completed successfully');
      } else {
        console.log('Database already has correct structure');
      }
    }
    
    console.log('Auth database initialized successfully');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Save user to database (handles both server and local format)
export const saveUserToDatabase = async (user: User | ServerUser): Promise<void> => {
  try {
    const db = await getDatabaseAsync();
    
    // Convert server user to local user format if needed
    const localUser: User = 'profilePic' in user && 
      user.profilePic && 
      typeof user.profilePic === 'object' && 
      'url' in user.profilePic
        ? convertServerUserToLocalUser(user as ServerUser)
        : user as User;
    
    let profilePicBase64: string | null = null;
    
    // Try to download and cache profile picture as base64
    if (localUser.profilePic?.url) {
      try {
        profilePicBase64 = await urlToBase64(localUser.profilePic.url);
      } catch (error) {
        console.warn('Failed to cache profile picture:', error);
        // Continue without caching - we still have the URL
      }
    }

    await db.runAsync(
      `INSERT OR REPLACE INTO users (
        _id, name, email, role, 
        profilePic_public_id, profilePic_url, profilePic_base64,
        createdAt, updatedAt, __v
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        localUser._id,
        localUser.name,
        localUser.email,
        localUser.role,
        localUser.profilePic?.public_id || null,
        localUser.profilePic?.url || null,
        profilePicBase64,
        localUser.createdAt,
        localUser.updatedAt,
        localUser.__v
      ]
    );
    
    console.log('User saved to database successfully');
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
};

// Get user from database
export const getUserFromDatabase = async (userIdOrToken: string): Promise<User | null> => {
  try {
    const db = await getDatabaseAsync();
    
    // First try to get user by ID directly
    let result = await db.getFirstAsync<any>(
      'SELECT * FROM users WHERE _id = ?',
      [userIdOrToken]
    );
    
    // If not found and it looks like a token (contains dots), get the first user
    if (!result && userIdOrToken.includes('.')) {
      result = await db.getFirstAsync<any>('SELECT * FROM users ORDER BY updatedAt DESC LIMIT 1');
    }
    
    if (!result) {
      console.log('No user found in database');
      return null;
    }

    // Reconstruct profilePic object with type safety
    let profilePic: ProfilePic | null = null;
    if (result.profilePic_public_id && result.profilePic_url) {
      profilePic = {
        public_id: result.profilePic_public_id,
        url: result.profilePic_url
      };
    }
    
    const user: User = {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
      profilePic,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      __v: result.__v
    };
    
    return user;
  } catch (error) {
    console.error('Error getting user from database:', error);
    return null; // Return null instead of throwing to prevent auth crashes
  }
};

// Delete user from database (used during logout)
export const deleteUserFromDatabase = async (userIdOrToken: string): Promise<void> => {
  try {
    const db = await getDatabaseAsync();
    
    // Try to delete by ID first
    let result = await db.runAsync(
      'DELETE FROM users WHERE _id = ?',
      [userIdOrToken]
    );
    
    // If no changes and it looks like a token, delete all users (single user device)
    if (result.changes === 0 && userIdOrToken.includes('.')) {
      result = await db.runAsync('DELETE FROM users');
    }
    
    console.log(`Deleted ${result.changes} user(s) from database`);
  } catch (error) {
    console.error('Error deleting user from database:', error);
    throw error;
  }
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const db = await getDatabaseAsync();
    
    const result = await db.getFirstAsync<any>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (!result) {
      return null;
    }

    // Reconstruct profilePic object with type safety
    let profilePic: ProfilePic | null = null;
    if (result.profilePic_public_id && result.profilePic_url) {
      profilePic = {
        public_id: result.profilePic_public_id,
        url: result.profilePic_url
      };
    }
    
    const user: User = {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
      profilePic,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      __v: result.__v
    };
    
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
};

// Update user in database
export const updateUserInDatabase = async (userId: string, updatedData: Partial<User>): Promise<void> => {
  try {
    const db = await getDatabaseAsync();
    
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    
    if (updatedData.name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(updatedData.name);
    }
    
    if (updatedData.email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(updatedData.email);
    }
    
    if (updatedData.role !== undefined) {
      updateFields.push('role = ?');
      updateValues.push(updatedData.role);
    }
    
    if (updatedData.profilePic !== undefined) {
      if (updatedData.profilePic) {
        updateFields.push('profilePic_public_id = ?', 'profilePic_url = ?');
        updateValues.push(updatedData.profilePic.public_id, updatedData.profilePic.url);
        
        // Try to update cached base64 version
        try {
          const base64 = await urlToBase64(updatedData.profilePic.url);
          updateFields.push('profilePic_base64 = ?');
          updateValues.push(base64);
        } catch (error) {
          console.warn('Failed to cache updated profile picture:', error);
        }
      } else {
        updateFields.push('profilePic_public_id = ?', 'profilePic_url = ?', 'profilePic_base64 = ?');
        updateValues.push(null, null, null);
      }
    }
    
    if (updatedData.updatedAt !== undefined) {
      updateFields.push('updatedAt = ?');
      updateValues.push(updatedData.updatedAt);
    }
    
    if (updatedData.__v !== undefined) {
      updateFields.push('__v = ?');
      updateValues.push(updatedData.__v);
    }
    
    if (updateFields.length === 0) {
      console.log('No fields to update');
      return;
    }
    
    updateValues.push(userId);
    
    const result = await db.runAsync(
      `UPDATE users SET ${updateFields.join(', ')} WHERE _id = ?`,
      updateValues
    );
    
    console.log(`Updated ${result.changes} user(s) in database`);
  } catch (error) {
    console.error('Error updating user in database:', error);
    throw error;
  }
};

// Clear all users (useful for development/testing)
export const clearAllUsers = async (): Promise<void> => {
  try {
    const db = await getDatabaseAsync();
    await db.runAsync('DELETE FROM users');
    console.log('All users cleared from database');
  } catch (error) {
    console.error('Error clearing users:', error);
    throw error;
  }
};

// Get database info (useful for debugging)
export const getDatabaseInfo = async (): Promise<{ userCount: number; users: Partial<User>[] }> => {
  try {
    const db = await getDatabaseAsync();
    
    const countResult = await db.getFirstAsync('SELECT COUNT(*) as count FROM users') as any;
    const usersResult = await db.getAllAsync('SELECT _id, name, email, role FROM users') as any[];
    
    return {
      userCount: countResult.count || 0,
      users: usersResult || []
    };
  } catch (error) {
    console.error('Error getting database info:', error);
    return { userCount: 0, users: [] };
  }
};

// Test database connection
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    await getDatabaseAsync();
    console.log('Database connection test: SUCCESS');
    return true;
  } catch (error) {
    console.error('Database connection test: FAILED', error);
    return false;
  }
};

// Export types for use in other files
export type { ProfilePic, ServerUser, User };
