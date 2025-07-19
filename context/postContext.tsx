import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

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
});

const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Helper function to validate and normalize data
  const validateAndNormalizeData = (data: any): Post[] => {
    if (data && typeof data === 'object' && 'posts' in data) {
      return Array.isArray(data.posts) ? data.posts : [];
    }
    return Array.isArray(data) ? data : [];
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://onemarketapi.xyz/api/v1/post/get-all-post');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      const validatedPosts = validateAndNormalizeData(data);

      setPosts(validatedPosts);
      setLastUpdated(new Date());

      // Update cache
      await AsyncStorage.multiSet([
        ['posts', JSON.stringify(validatedPosts)],
        ['lastUpdated', new Date().toISOString()]
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Fetch error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCachedData = useCallback(async () => {
    try {
      const [cachedPosts, cachedLastUpdated] = await AsyncStorage.multiGet(['posts', 'lastUpdated']);
      
      if (cachedPosts?.[1]) {
        const parsedPosts = JSON.parse(cachedPosts[1]);
        setPosts(validateAndNormalizeData(parsedPosts));
      }

      if (cachedLastUpdated?.[1]) {
        setLastUpdated(new Date(cachedLastUpdated[1]));
      }
    } catch (err) {
      console.error('Cache load error:', err);
    }
  }, []);

  const createPost = useCallback(
    async (post: { title: string; description: string }, images: string[]) => {
      // Declare tempId outside try block for catch access
      const tempId = `temp-${Date.now()}`;
      try {
        // Get token if not already set
        if (!token) {
          const storedToken = await SecureStore.getItemAsync("token");
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

        // Optimistically update the local state
        setPosts(prev => [...prev, tempPost]);

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
        const response = await fetch('https://onemarketapi.xyz/api/v1/post/create-post', {
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

        // Update cache
        const cachedPosts = await AsyncStorage.getItem('posts');
        let updatedPosts: Post[] = [];
        if (cachedPosts) {
          updatedPosts = JSON.parse(cachedPosts);
          updatedPosts = updatedPosts.map(p => p._id === tempId ? createdPost : p);
        }
        await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));

        return createdPost;
      } catch (error) {
        // Revert optimistic update on error
        setPosts(prev => prev.filter(p => p._id !== tempId));
        
        console.error('Create post error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to create post");
        throw error;
      }
    },
    [token]
  );

  const refreshData = useCallback(async () => {
    try {
      // First try to get cached data
      const cachedPosts = await AsyncStorage.getItem('posts');
      let cachedData: Post[] = [];
      if (cachedPosts) {
        try {
          cachedData = JSON.parse(cachedPosts);
        } catch {}
      }

      // Then fetch fresh data
      const response = await fetch('https://onemarketapi.xyz/api/v1/post/get-all-post');
      if (!response.ok) {
        throw new Error('Failed to refresh posts');
      }

      const data = await response.json();
      const latestPosts = validateAndNormalizeData(data);

      // Check if there are new posts
      const cachedIds = new Set(cachedData.map(post => post._id));
      const newPosts = latestPosts.filter((post: Post) => !cachedIds.has(post._id));

      if (newPosts.length > 0) {
        const updatedPosts = [...cachedData, ...newPosts];
        setPosts(updatedPosts);
        await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
      }

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Refresh error:', err);
    }
  }, []);

  const updatePost = useCallback(
    async (postId: string, updates: { title?: string; description?: string }, newImages?: string[]) => {
      try {
        if (!token) {
          const storedToken = await SecureStore.getItemAsync("token");
          if (storedToken) {
            setToken(storedToken);
          } else {
            throw new Error("Authentication token is missing");
          }
        }

        // Optimistically update local state
        setPosts(prev => prev.map(post => 
          post._id === postId ? { ...post, ...updates } : post
        ));

        // If no new images, just update text fields
        if (!newImages || newImages.length === 0) {
          const response = await fetch(`https://onemarketapi.xyz/api/v1/post/update-post/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          });

          if (!response.ok) {
            throw new Error('Failed to update post');
          }

          const updatedPost = await response.json();
          
          // Update state with server response
          setPosts(prev => prev.map(post => 
            post._id === postId ? updatedPost.post : post
          ));

          // Update cache
          const cachedPosts = await AsyncStorage.getItem('posts');
          if (cachedPosts) {
            const parsed = JSON.parse(cachedPosts);
            const updated = parsed.map((post: Post) => 
              post._id === postId ? updatedPost.post : post
            );
            await AsyncStorage.setItem('posts', JSON.stringify(updated));
          }

          return updatedPost;
        }

        // If there are new images, use FormData
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

        const response = await fetch(`https://onemarketapi.xyz/api/v1/post/add-post-images/${postId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to update post with images');
        }

        const updatedPost = await response.json();
        
        // Update state with server response
        setPosts(prev => prev.map(post => 
          post._id === postId ? updatedPost.post : post
        ));

        // Update cache
        const cachedPosts = await AsyncStorage.getItem('posts');
        if (cachedPosts) {
          const parsed = JSON.parse(cachedPosts);
          const updated = parsed.map((post: Post) => 
            post._id === postId ? updatedPost.post : post
          );
          await AsyncStorage.setItem('posts', JSON.stringify(updated));
        }

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

        // Optimistically remove from local state
        setPosts(prev => prev.filter(post => post._id !== postId));

        const response = await fetch(`https://onemarketapi.xyz/api/v1/post/delete-post/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        // Update cache
        const cachedPosts = await AsyncStorage.getItem('posts');
        if (cachedPosts) {
          const parsed = JSON.parse(cachedPosts);
          const updated = parsed.filter((post: Post) => post._id !== postId);
          await AsyncStorage.setItem('posts', JSON.stringify(updated));
        }

        // No return value needed for Promise<void>
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

        // Optimistically update local state
        setPosts(prev => prev.map(post => 
          post._id === postId 
            ? { 
                ...post, 
                images: post.images.filter(img => img.public_id !== imageId) 
              } 
            : post
        ));

        const response = await fetch(`https://onemarketapi.xyz/api/v1/post/delete-post-image/${postId}/${imageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete post image');
        }

        // Update cache
        const cachedPosts = await AsyncStorage.getItem('posts');
        if (cachedPosts) {
          const parsed = JSON.parse(cachedPosts);
          const updated = parsed.map((post: Post) => 
            post._id === postId 
              ? { 
                  ...post, 
                  images: post.images.filter(img => img.public_id !== imageId) 
                } 
              : post
          );
          await AsyncStorage.setItem('posts', JSON.stringify(updated));
        }

      } catch (error) {
        console.error('Delete post image error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to delete post image");
        // Refresh data to ensure consistency
        await refreshData();
        throw error;
      }
    },
    [token, refreshData]
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

        const response = await fetch(`https://onemarketapi.xyz/api/v1/post/add-post-images/${postId}`, {
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
        
        // Update state with server response
        setPosts(prev => prev.map(post => 
          post._id === postId ? updatedPost.post : post
        ));

        // Update cache
        const cachedPosts = await AsyncStorage.getItem('posts');
        if (cachedPosts) {
          const parsed = JSON.parse(cachedPosts);
          const updated = parsed.map((post: Post) => 
            post._id === postId ? updatedPost.post : post
          );
          await AsyncStorage.setItem('posts', JSON.stringify(updated));
        }

        return updatedPost;
      } catch (error) {
        console.error('Add post images error:', error);
        Alert.alert("Error", error instanceof Error ? error.message : "Failed to add images to post");
        // Refresh data to ensure consistency
        await refreshData();
        throw error;
      }
    },
    [token, refreshData]
  );

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let isMounted = true;

    const handleConnectivityChange = async (state: import('@react-native-community/netinfo').NetInfoState) => {
      if (state.isConnected === true && isMounted) {
        await fetchData();
        if (!intervalId) {
          intervalId = setInterval(fetchData, 5 * 60 * 1000); // 5 minutes
        }
      } else {
        // If disconnected, clear polling interval
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    };

    // Initial load from cache
    loadCachedData();

    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    // Also check current connection on mount
    NetInfo.fetch().then(handleConnectivityChange);

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
      unsubscribe();
    };
  }, [fetchData, loadCachedData]);

  return (
    <PostContext.Provider 
      value={{ 
        posts,
        loading,
        error,
        lastUpdated,
        refreshData,
        createPost,
        updatePost,
        deletePost,
        deletePostImage,
        addPostImages
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);

export { PostContext, PostProvider, usePost };
