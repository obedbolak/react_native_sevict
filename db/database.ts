import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('auth.db');

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: {
    public_id: string;
    url: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const initDatabase = async (): Promise<void> => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        profilePicPublicId TEXT,
        profilePicUrl TEXT,
        profilePicBlob BLOB,
        token TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        v INTEGER NOT NULL DEFAULT 0
      )
    `);
    
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const saveUser = async (user: User, token: string, profilePicBlob?: Uint8Array): Promise<void> => {
  if (!user._id || !user.name || !user.email || !token) {
    throw new Error('Required user fields are missing');
  }

  try {
    await db.runAsync(
      `INSERT OR REPLACE INTO users 
       (id, name, email, role, profilePicPublicId, profilePicUrl, profilePicBlob, token, createdAt, updatedAt, v) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user._id,
        user.name,
        user.email,
        user.role,
        user.profilePic?.public_id || null,
        user.profilePic?.url || null,
        profilePicBlob || null,
        token,
        user.createdAt,
        user.updatedAt,
        user.__v || 0
      ]
    );
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getUser = async (): Promise<{user: User, token: string, profilePicBlob?: Uint8Array} | null> => {
  try {
    const result = await db.getFirstAsync<{
      id: string;
      name: string;
      email: string;
      role: string;
      profilePicPublicId: string | null;
      profilePicUrl: string | null;
      profilePicBlob: Uint8Array | null;
      token: string;
      createdAt: string;
      updatedAt: string;
      v: number;
    }>('SELECT * FROM users LIMIT 1');
    
    if (!result) return null;

    const user: User = {
      _id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      profilePic: result.profilePicPublicId && result.profilePicUrl ? {
        public_id: result.profilePicPublicId,
        url: result.profilePicUrl
      } : null,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      __v: result.v
    };

    return { 
      user, 
      token: result.token,
      profilePicBlob: result.profilePicBlob || undefined
    };
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const deleteUser = async (): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM users');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};