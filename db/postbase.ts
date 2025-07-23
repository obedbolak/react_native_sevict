import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('posts.db'); // Using same database

interface PostImage {
  _id: string;
  public_id: string;
  url: string;
}

interface PostedBy {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  postedBy: PostedBy;
  images: PostImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PostsResponse {
  success: boolean;
  message: string;
  posts: Post[];
}

interface SavedPost {
  id: string;
  title: string;
  description: string;
  postedById: string;
  postedByName: string;
  createdAt: string;
  updatedAt: string;
  v: number;
}

interface SavedPostImage {
  id: string;
  postId: string;
  imageId: string;
  publicId: string;
  url: string;
  blob: Uint8Array;
}

// Initialize posts tables
export const initPostsDatabase = async (): Promise<void> => {
  try {
    // Create posts table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        postedById TEXT NOT NULL,
        postedByName TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        v INTEGER NOT NULL DEFAULT 0
      )
    `);

    // Create post_images table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS post_images (
        id TEXT PRIMARY KEY,
        postId TEXT NOT NULL,
        imageId TEXT NOT NULL,
        publicId TEXT NOT NULL,
        url TEXT NOT NULL,
        blob BLOB NOT NULL,
        FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE
      )
    `);

    // Create indexes
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(createdAt DESC);
    `);

    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_post_images_post_id ON post_images(postId);
    `);

    console.log('Posts database initialized successfully');
  } catch (error) {
    console.error('Error initializing posts database:', error);
    throw error;
  }
};

// Download image and convert to blob
const downloadImageAsBlob = async (url: string): Promise<Uint8Array> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
};

// Save a single post with images
export const savePost = async (post: Post): Promise<void> => {
  if (!post._id || !post.title || !post.postedBy) {
    throw new Error('Required post fields are missing');
  }

  try {
    // Start transaction
    await db.execAsync('BEGIN TRANSACTION');

    // Insert post
    await db.runAsync(
      `INSERT OR REPLACE INTO posts 
       (id, title, description, postedById, postedByName, createdAt, updatedAt, v)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        post._id,
        post.title,
        post.description,
        post.postedBy._id,
        post.postedBy.name,
        post.createdAt,
        post.updatedAt,
        post.__v || 0
      ]
    );

    // Delete existing images for this post
    await db.runAsync('DELETE FROM post_images WHERE postId = ?', [post._id]);

    // Download and save images
    for (const image of post.images) {
      try {
        console.log(`Downloading image: ${image.url}`);
        const imageBlob = await downloadImageAsBlob(image.url);
        
        await db.runAsync(
          `INSERT INTO post_images 
           (id, postId, imageId, publicId, url, blob)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            `${post._id}_${image._id}`,
            post._id,
            image._id,
            image.public_id,
            image.url,
            imageBlob
          ]
        );
        
        console.log(`Image saved: ${image._id}`);
      } catch (imageError) {
        console.warn(`Failed to download image ${image._id}:`, imageError);
        // Continue with next image even if one fails
      }
    }

    // Commit transaction
    await db.execAsync('COMMIT');
    console.log(`Post saved: ${post._id}`);
  } catch (error) {
    // Rollback on error
    await db.execAsync('ROLLBACK');
    console.error('Error saving post:', error);
    throw error;
  }
};

// Save multiple posts (like from API response)
export const savePosts = async (postsData: PostsResponse): Promise<void> => {
  if (!postsData.success || !postsData.posts || !Array.isArray(postsData.posts)) {
    throw new Error('Invalid posts data format');
  }

  console.log(`Saving ${postsData.posts.length} posts...`);
  
  for (const post of postsData.posts) {
    try {
      await savePost(post);
    } catch (error) {
      console.error(`Failed to save post ${post._id}:`, error);
      // Continue with next post even if one fails
    }
  }
  
  console.log('Finished saving posts');
};

// Get all posts with images
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const posts = await db.getAllAsync<SavedPost>(`
      SELECT * FROM posts 
      ORDER BY createdAt DESC
    `);

    if (!posts || posts.length === 0) {
      return [];
    }

    const postsWithImages: Post[] = [];

    for (const post of posts) {
      // Get images for this post
      const images = await db.getAllAsync<SavedPostImage>(`
        SELECT * FROM post_images 
        WHERE postId = ?
        ORDER BY imageId
      `, [post.id]);

      const postImages: PostImage[] = images.map(img => ({
        _id: img.imageId,
        public_id: img.publicId,
        url: img.url
      }));

      const fullPost: Post = {
        _id: post.id,
        title: post.title,
        description: post.description,
        postedBy: {
          _id: post.postedById,
          name: post.postedByName
        },
        images: postImages,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        __v: post.v
      };

      postsWithImages.push(fullPost);
    }

    return postsWithImages;
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
};

// Get a single post by ID
export const getPost = async (postId: string): Promise<Post | null> => {
  try {
    const post = await db.getFirstAsync<SavedPost>(`
      SELECT * FROM posts WHERE id = ?
    `, [postId]);

    if (!post) return null;

    const images = await db.getAllAsync<SavedPostImage>(`
      SELECT * FROM post_images 
      WHERE postId = ?
      ORDER BY imageId
    `, [postId]);

    const postImages: PostImage[] = images.map(img => ({
      _id: img.imageId,
      public_id: img.publicId,
      url: img.url
    }));

    return {
      _id: post.id,
      title: post.title,
      description: post.description,
      postedBy: {
        _id: post.postedById,
        name: post.postedByName
      },
      images: postImages,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      __v: post.v
    };
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
};

// Get image blob for offline display
export const getPostImageBlob = async (postId: string, imageId: string): Promise<Uint8Array | null> => {
  try {
    const result = await db.getFirstAsync<{ blob: Uint8Array }>(`
      SELECT blob FROM post_images 
      WHERE postId = ? AND imageId = ?
    `, [postId, imageId]);

    return result?.blob || null;
  } catch (error) {
    console.error('Error getting image blob:', error);
    return null;
  }
};

// Delete all posts
export const deleteAllPosts = async (): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM post_images');
    await db.runAsync('DELETE FROM posts');
    console.log('All posts deleted');
  } catch (error) {
    console.error('Error deleting posts:', error);
    throw error;
  }
};

// Delete a specific post
export const deletePost = async (postId: string): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM post_images WHERE postId = ?', [postId]);
    await db.runAsync('DELETE FROM posts WHERE id = ?', [postId]);
    console.log(`Post deleted: ${postId}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Get posts count
export const getPostsCount = async (): Promise<number> => {
  try {
    const result = await db.getFirstAsync<{ count: number }>(`
      SELECT COUNT(*) as count FROM posts
    `);
    return result?.count || 0;
  } catch (error) {
    console.error('Error getting posts count:', error);
    return 0;
  }
};