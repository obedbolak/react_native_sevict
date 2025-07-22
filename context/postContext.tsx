import NetInfo from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  deletePostFromDatabase,
  getPostsCount,
  getPostsFromDatabase,
  initPostDatabase,
  savePostToDatabase,
  savePostsToDatabase,
  updatePostInDatabase
} from '../db/postbase'; // Import your post database functions

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

interface PostContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshData: () => Promise<void>;
  createPost: (post: { title: string; description: string }, images: string[]) => Promise<void>;
  updatePost: (postId: string, updates: { title?: string; description?: string }, newImages?: string[]) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  deletePostImage: (postId: string, imageId: string) => Promise<void>;
  addPostImages: (postId: string, images: string[]) => Promise<void>;
  getPostsCount: () => Promise<number>;
}

const PostContext = createContext<PostContextType>({
  posts: [],
  loading: true,
  error: null,
  lastUpdated: null,
  refreshData: async () => {},
  createPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
  deletePostImage: async () => {},
  addPostImages: async () => {},
  getPostsCount: async () => 0,
});

const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Helper function to validate and normalize data
  const validateAndNormalizeData = (data: any): Post[] => {
  try {
    // Handle case where data contains a 'posts' array
    if (data && typeof data === 'object' && Array.isArray(data.posts)) {
      return data.posts.filter((post: any) => 
        post && 
        typeof post === 'object' && 
        post._id && 
        typeof post._id === 'string'
      );
    }
    
    // Handle case where data is directly an array
    if (Array.isArray(data)) {
      return data.filter((post: any) => 
        post && 
        typeof post === 'object' && 
        post._id && 
        typeof post._id === 'string'
      );
    }

    return [];
  } catch (error) {
    console.error('Data validation error:', error);
    return [];
  }
};
  // Load posts from local database
  const loadLocalPosts = useCallback(async () => {
    try {
      const localPosts = await getPostsFromDatabase();
      setPosts(localPosts);
      console.log(`Loaded ${localPosts.length} posts from local database`);
      
      if (localPosts.length > 0) {
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Error loading local posts:', err);
    }
  }, []);

  // Fetch posts from server and save to local database
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://10.0.2.2:5000/api/v1/post/get-all-post');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      const validatedPosts = validateAndNormalizeData(data);

      // Save to local database
      await savePostsToDatabase(validatedPosts);
      
      // Update state
      setPosts(validatedPosts);
      setLastUpdated(new Date());

      console.log(`Fetched and saved ${validatedPosts.length} posts`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Fetch error:', errorMessage);
      
      // Load from local database as fallback
      await loadLocalPosts();
    } finally {
      setLoading(false);
    }
  }, [loadLocalPosts]);

  const createPost = useCallback(
    async (post: { title: string; description: string }, images: string[]) => {
      const tempId = `temp-${Date.now()}`;
      try {
        // Get token if not already set
        if (!token) {
          const storedToken = await SecureStore.getItemAsync("authToken");
          if (storedToken) {
            setToken(storedToken);
          } else {
            throw new Error("Authentication token is missing");
          }
        }

        // Create a temporary post object for optimistic update
        const tempPost: Post = {
          _id: tempId,
          ...post,
          images: images.map(uri => ({
            url: uri,
            public_id: "",
            _id: `temp-img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          })),
          likes: 0,
          postedBy: {
            _id: "temp-user",
            name: "You"
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          __v: 0
        };

        // Optimistically update the local state and database
        setPosts(prev => [tempPost, ...prev]);
        await savePostToDatabase(tempPost);

        // Prepare FormData
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("description", post.description);
        
        images.forEach((uri, index) => {
          const filename = uri.split('/').pop() || `image_${index}.jpg`;
          const type = uri.endsWith(".png") ? "image/png" : "image/jpeg";
          
          formData.append("files", {
            uri,
            name: filename,
            type,
          } as any);
        });

        // Send request to server
        const response = await fetch('http://10.0.2.2:5000/api/v1/post/create-post', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create post');
        }

        const responseData = await response.json();
        const createdPost = responseData.post;

        // Replace temporary post with actual post from server
        setPosts(prev => prev.map(p => p._id === tempId ? createdPost : p));
        
        // Update database with real post and remove temp post
        await deletePostFromDatabase(tempId);
        await savePostToDatabase(createdPost);

        return createdPost;
      } catch (error) {
        // Revert optimistic update on error
        setPosts(prev => prev.filter(p => p._id !== tempId));
        await deletePostFromDatabase(tempId);
        
        console.error('Create post error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to create post");
        throw error;
      }
    },
    [token]
  );

  const refreshData = useCallback(async () => {
    try {
      // Load local data first for immediate UI update
      await loadLocalPosts();
      
      // Then fetch fresh data from server
      await fetchData();
    } catch (err) {
      console.error('Refresh error:', err);
      // At least load local data
      await loadLocalPosts();
    }
  }, [loadLocalPosts, fetchData]);

  const updatePost = useCallback(
    async (postId: string, updates: { title?: string; description?: string }, newImages?: string[]) => {
      try {
        if (!token) {
          const storedToken = await SecureStore.getItemAsync("authToken");
          if (storedToken) {
            setToken(storedToken);
          } else {
            throw new Error("Authentication token is missing");
          }
        }

        // Optimistically update local state and database
        const updatedData = { ...updates, updatedAt: new Date().toISOString() };
        setPosts(prev => prev.map(post => 
          post._id === postId ? { ...post, ...updatedData } : post
        ));
        await updatePostInDatabase(postId, updatedData);

        // Send update to server
        let response;
        if (!newImages || newImages.length === 0) {
          // Text-only update
          response = await fetch(`http://10.0.2.2:5000/api/v1/post/update-post/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          });
        } else {
          // Update with new images
          const formData = new FormData();
          if (updates.title) formData.append("title", updates.title);
          if (updates.description) formData.append("description", updates.description);
          
          newImages.forEach((uri, index) => {
            const filename = uri.split('/').pop() || `image_${index}.jpg`;
            const type = uri.endsWith(".png") ? "image/png" : "image/jpeg";
            
            formData.append("files", {
              uri,
              name: filename,
              type,
            } as any);
          });

          response = await fetch(`http://10.0.2.2:5000/api/v1/post/add-post-images/${postId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
        }

        if (!response.ok) {
          throw new Error('Failed to update post');
        }

        const updatedPost = await response.json();
        const serverPost = updatedPost.post;
        
        // Update state and database with server response
        setPosts(prev => prev.map(post => 
          post._id === postId ? serverPost : post
        ));
        await savePostToDatabase(serverPost);

        return updatedPost;
      } catch (error) {
        console.error('Update post error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to update post");
        // Refresh data to ensure consistency
        await refreshData();
        throw error;
      }
    },
    [token, refreshData]
  );

  const deletePost = useCallback(
    async (postId: string) => {
      try {
        if (!token) {
          const storedToken = await SecureStore.getItemAsync("token");
          if (storedToken) {
            setToken(storedToken);
          } else {
            throw new Error("Authentication token is missing");
          }
        }

        // Optimistically remove from local state and database
        setPosts(prev => prev.filter(post => post._id !== postId));
        await deletePostFromDatabase(postId);

        const response = await fetch(`http://10.0.2.2:5000/api/v1/post/delete-post/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Delete post error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to delete post");
        // Refresh data to ensure consistency
        await refreshData();
        throw error;
      }
    },
    [token, refreshData]
  );

  const deletePostImage = useCallback(
    async (postId: string, imageId: string) => {
      try {
        if (!token) {
          const storedToken = await SecureStore.getItemAsync("token");
          if (storedToken) {
            setToken(storedToken);
          } else {
            throw new Error("Authentication token is missing");
          }
        }

        // Optimistically update local state and database
        const updatedPosts = posts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              images: post.images.filter(img => img._id !== imageId),
              updatedAt: new Date().toISOString()
            };
          }
          return post;
        });
        
        setPosts(updatedPosts);
        await updatePostInDatabase(postId, {
          images: updatedPosts.find(p => p._id === postId)?.images || [],
          updatedAt: new Date().toISOString()
        });

        const response = await fetch(`http://10.0.2.2:5000/api/v1/post/delete-post-image/${postId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ imageId }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete post image');
        }

        const updatedPost = await response.json();
        
        // Update state and database with server response
        setPosts(prev => prev.map(post => 
          post._id === postId ? updatedPost.post : post
        ));
        await savePostToDatabase(updatedPost.post);

        return updatedPost;
      } catch (error) {
        console.error('Delete post image error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to delete post image");
        // Refresh data to ensure consistency
        await refreshData();
        throw error;
      }
    },
    [token, posts, refreshData]
  );

  const addPostImages = useCallback(
    async (postId: string, images: string[]) => {
      try {
        if (!token) {
          const storedToken = await SecureStore.getItemAsync("token");
          if (storedToken) {
            setToken(storedToken);
          } else {
            throw new Error("Authentication token is missing");
          }
        }

        // Prepare FormData
        const formData = new FormData();
        images.forEach((uri, index) => {
          const filename = uri.split('/').pop() || `image_${index}.jpg`;
          const type = uri.endsWith(".png") ? "image/png" : "image/jpeg";
          
          formData.append("files", {
            uri,
            name: filename,
            type,
          } as any);
        });

        const response = await fetch(`http://10.0.2.2:5000/api/v1/post/add-post-images/${postId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to add images to post');
        }

        const updatedPost = await response.json();
        
        // Update state and database
        setPosts(prev => prev.map(post => 
          post._id === postId ? updatedPost.post : post
        ));
        await savePostToDatabase(updatedPost.post);

        return updatedPost;
      } catch (error) {
        console.error('Add post images error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to add images to post");
        throw error;
      }
    },
    [token]
  );

  // Initialize database and load data
  useEffect(() => {
    const initialize = async () => {
      try {
        await initPostDatabase();
        await loadLocalPosts();
        
        // Check network connection
        const netState = await NetInfo.fetch();
        if (netState.isConnected) {
          await fetchData();
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Initialization failed');
      } finally {
        setLoading(false);
      }
    };

    initialize();

    // Set up network listener
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        fetchData().catch(console.error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [loadLocalPosts, fetchData]);

  const contextValue: PostContextType = {
    posts,
    loading,
    error,
    lastUpdated,
    refreshData,
    createPost,
    updatePost,
    deletePost,
    deletePostImage,
    addPostImages,
    getPostsCount: () => getPostsCount(),
  };

  return (
    <PostContext.Provider value={contextValue}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

export default PostProvider;