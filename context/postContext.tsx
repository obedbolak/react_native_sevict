import React, { createContext, ReactNode, useCallback, useContext, useEffect, useReducer } from 'react';
import {
  deleteAllPosts,
  deletePost,
  getAllPosts,
  getPostById,
  getPostImageBlob,
  getPostsCount,
  getPostsPaginated,
  initPostsDatabase,
  savePost,
  savePosts,
  searchPosts,
} from '../db/postbase'; // Adjust import path as needed

// Types from your database file
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

// Context State
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  initialized: boolean;
  searchQuery: string;
  searchResults: Post[];
}

// Actions
type PostsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'REMOVE_POST'; payload: string }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_TOTAL_COUNT'; payload: number }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'CLEAR_POSTS' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: Post[] };

// Initial State
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  totalCount: 0,
  initialized: false,
  searchQuery: '',
  searchResults: [],
};

// Reducer
const postsReducer = (state: PostsState, action: PostsAction): PostsState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false, error: null };
    case 'ADD_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
        error: null,
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        totalCount: state.totalCount + 1,
        error: null,
      };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
        error: null,
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        totalCount: Math.max(0, state.totalCount - 1),
        error: null,
      };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'SET_TOTAL_COUNT':
      return { ...state, totalCount: action.payload };
    case 'SET_INITIALIZED':
      return { ...state, initialized: action.payload };
    case 'CLEAR_POSTS':
      return { ...state, posts: [], totalCount: 0, hasMore: true, error: null };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, loading: false, error: null };
    default:
      return state;
  }
};

// Context Value Interface
interface PostsContextValue {
  // State
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  initialized: boolean;
  searchQuery: string;
  searchResults: Post[];

  // Actions
  initializeDatabase: () => Promise<void>;
  loadPosts: (refresh?: boolean) => Promise<void>;
  loadMorePosts: () => Promise<void>;
  addPost: (post: Post) => Promise<void>;
  addPosts: (postsData: PostsResponse) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
  removePost: (postId: string) => Promise<void>;
  clearAllPosts: () => Promise<void>;
  getPost: (postId: string) => Promise<Post | null>;
  searchPostsLocal: (query: string) => Promise<void>;
  clearSearch: () => void;
  refreshPostsCount: () => Promise<void>;
  getImageBlob: (postId: string, imageId: string) => Promise<Uint8Array | null>;
}

// Create Context
const PostsContext = createContext<PostsContextValue | undefined>(undefined);

// Provider Props
interface PostsProviderProps {
  children: ReactNode;
}

// Posts Provider Component
export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    // Initialize the database when the provider mounts
    initializeDatabase();

    // Load posts on initial render
    loadPosts();
  }, []);




  // Initialize Database
  const initializeDatabase = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await initPostsDatabase();
      dispatch({ type: 'SET_INITIALIZED', payload: true });
      await refreshPostsCount();
    } catch (error) {
      console.error('Failed to initialize database:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize database' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Load Posts
  const loadPosts = useCallback(async (refresh = false) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (refresh) {
        dispatch({ type: 'CLEAR_POSTS' });
      }

      const allPosts = await getAllPosts();
      dispatch({ type: 'SET_POSTS', payload: allPosts });
      dispatch({ type: 'SET_HAS_MORE', payload: false }); // Since we loaded all posts
    } catch (error) {
      console.error('Failed to load posts:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load posts' });
    }
  }, []);

  // Load More Posts (Paginated)
  const loadMorePosts = useCallback(async () => {
    if (!state.hasMore || state.loading) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { posts: newPosts, hasMore } = await getPostsPaginated(20, state.posts.length);
      
      dispatch({ type: 'ADD_POSTS', payload: newPosts });
      dispatch({ type: 'SET_HAS_MORE', payload: hasMore });
    } catch (error) {
      console.error('Failed to load more posts:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load more posts' });
    }
  }, [state.hasMore, state.loading, state.posts.length]);

  // Add Single Post
  const addPost = useCallback(async (post: Post) => {
    try {
      await savePost(post);
      dispatch({ type: 'ADD_POST', payload: post });
    } catch (error) {
      console.error('Failed to add post:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add post' });
      throw error;
    }
  }, []);

  // Add Multiple Posts
  const addPosts = useCallback(async (postsData: PostsResponse) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await savePosts(postsData);
      // Reload posts to get the updated list
      await loadPosts(true);
    } catch (error) {
      console.error('Failed to add posts:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add posts' });
      throw error;
    }
  }, [loadPosts]);

  // Update Post
  const updatePost = useCallback(async (post: Post) => {
    try {
      await savePost(post); // savePost handles both insert and update
      dispatch({ type: 'UPDATE_POST', payload: post });
    } catch (error) {
      console.error('Failed to update post:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update post' });
      throw error;
    }
  }, []);

  // Remove Post
  const removePost = useCallback(async (postId: string) => {
    try {
      await deletePost(postId);
      dispatch({ type: 'REMOVE_POST', payload: postId });
    } catch (error) {
      console.error('Failed to remove post:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove post' });
      throw error;
    }
  }, []);

  // Clear All Posts
  const clearAllPosts = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await deleteAllPosts();
      dispatch({ type: 'CLEAR_POSTS' });
      await refreshPostsCount();
    } catch (error) {
      console.error('Failed to clear posts:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear posts' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Get Single Post
  const getPost = useCallback(async (postId: string): Promise<Post | null> => {
    try {
      return await getPostById(postId);
    } catch (error) {
      console.error('Failed to get post:', error);
      return null;
    }
  }, []);

  // Search Posts
  const searchPostsLocal = useCallback(async (query: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
      
      if (query.trim() === '') {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
        return;
      }

      const results = await searchPosts(query);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
    } catch (error) {
      console.error('Failed to search posts:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to search posts' });
    }
  }, []);

  // Clear Search
  const clearSearch = useCallback(() => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
  }, []);

  // Refresh Posts Count
  const refreshPostsCount = useCallback(async () => {
    try {
      const count = await getPostsCount();
      dispatch({ type: 'SET_TOTAL_COUNT', payload: count });
    } catch (error) {
      console.error('Failed to get posts count:', error);
    }
  }, []);

  // Get Image Blob
  const getImageBlob = useCallback(async (postId: string, imageId: string): Promise<Uint8Array | null> => {
    try {
      return await getPostImageBlob(postId, imageId);
    } catch (error) {
      console.error('Failed to get image blob:', error);
      return null;
    }
  }, []);

  const contextValue: PostsContextValue = {
    // State
    posts: state.posts,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    totalCount: state.totalCount,
    initialized: state.initialized,
    searchQuery: state.searchQuery,
    searchResults: state.searchResults,

    // Actions
    initializeDatabase,
    loadPosts,
    loadMorePosts,
    addPost,
    addPosts,
    updatePost,
    removePost,
    clearAllPosts,
    getPost,
    searchPostsLocal,
    clearSearch,
    refreshPostsCount,
    getImageBlob,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom Hook
export const usePosts = (): PostsContextValue => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

// Export types for use in other components
export type { Post, PostedBy, PostImage, PostsResponse };

