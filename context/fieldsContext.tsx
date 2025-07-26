import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  deleteAllFields,
  getAllFields,
  getFieldImageBlob,
  getFieldsCount,
  initFieldsDatabase,
  saveFields,
  searchFields,
} from "../db/fieldsBase"; // Adjust import path as needed

// Types from your database file
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

// Context State
interface FieldsState {
  fields: Field[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  initialized: boolean;
  searchQuery: string;
  searchResults: Field[];
}

// Actions
type FieldsAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_FIELDS"; payload: Field[] }
  | { type: "SET_TOTAL_COUNT"; payload: number }
  | { type: "SET_INITIALIZED"; payload: boolean }
  | { type: "CLEAR_FIELDS" }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SEARCH_RESULTS"; payload: Field[] };

// Initial State
const initialState: FieldsState = {
  fields: [],
  loading: false,
  error: null,
  totalCount: 0,
  initialized: false,
  searchQuery: "",
  searchResults: [],
};

// Reducer
const fieldsReducer = (
  state: FieldsState,
  action: FieldsAction
): FieldsState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_FIELDS":
      return { ...state, fields: action.payload, loading: false, error: null };
    case "SET_TOTAL_COUNT":
      return { ...state, totalCount: action.payload };
    case "SET_INITIALIZED":
      return { ...state, initialized: action.payload };
    case "CLEAR_FIELDS":
      return { ...state, fields: [], totalCount: 0, error: null };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Context Value Interface
interface FieldsContextValue {
  // State
  fields: Field[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  initialized: boolean;
  searchQuery: string;
  searchResults: Field[];

  // Actions
  initializeDatabase: () => Promise<void>;
  saveAndLoadFields: (fieldsData: FieldsResponse) => Promise<void>;
  loadFields: () => Promise<void>;
  clearAllFields: () => Promise<void>;
  searchFieldsLocal: (query: string) => Promise<void>;
  clearSearch: () => void;
  refreshFieldsCount: () => Promise<void>;
  getImageBlob: (
    referenceId: string,
    referenceType: "program" | "course"
  ) => Promise<Uint8Array | null>;
}

// Create Context
const FieldsContext = createContext<FieldsContextValue | undefined>(undefined);

// Provider Props
interface FieldsProviderProps {
  children: ReactNode;
}

// Fields Provider Component
export const FieldsProvider: React.FC<FieldsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(fieldsReducer, initialState);

  useEffect(() => {
    // Initialize the database when the provider mounts
    initializeDatabase();
  }, []);

  // Initialize Database
  const initializeDatabase = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await initFieldsDatabase();
      dispatch({ type: "SET_INITIALIZED", payload: true });
      await refreshFieldsCount();

      // Load existing fields if any
      await loadFields();
    } catch (error) {
      console.error("Failed to initialize fields database:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to initialize database" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Main function: Save fields from server response and load them
  const saveAndLoadFields = useCallback(async (fieldsData: FieldsResponse) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      // Save fields to database (this will download and store images as blobs)
      await saveFields(fieldsData);

      // Load the saved fields back into state
      await loadFields();

      console.log("Fields saved and loaded successfully");
    } catch (error) {
      console.error("Failed to save and load fields:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to save and load fields",
      });
      throw error;
    }
  }, []);

  // Load Fields from database
  const loadFields = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const allFields = await getAllFields();
      dispatch({ type: "SET_FIELDS", payload: allFields });
      dispatch({ type: "SET_TOTAL_COUNT", payload: allFields.length });
    } catch (error) {
      console.error("Failed to load fields:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load fields" });
    }
  }, []);

  // Clear All Fields
  const clearAllFields = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await deleteAllFields();
      dispatch({ type: "CLEAR_FIELDS" });
      await refreshFieldsCount();
    } catch (error) {
      console.error("Failed to clear fields:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to clear fields" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Search Fields
  const searchFieldsLocal = useCallback(async (query: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_SEARCH_QUERY", payload: query });

      if (query.trim() === "") {
        dispatch({ type: "SET_SEARCH_RESULTS", payload: [] });
        return;
      }

      const results = await searchFields(query);
      dispatch({ type: "SET_SEARCH_RESULTS", payload: results });
    } catch (error) {
      console.error("Failed to search fields:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to search fields" });
    }
  }, []);

  // Clear Search
  const clearSearch = useCallback(() => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
    dispatch({ type: "SET_SEARCH_RESULTS", payload: [] });
  }, []);

  // Refresh Fields Count
  const refreshFieldsCount = useCallback(async () => {
    try {
      const count = await getFieldsCount();
      dispatch({ type: "SET_TOTAL_COUNT", payload: count });
    } catch (error) {
      console.error("Failed to get fields count:", error);
    }
  }, []);

  // Get Image Blob
  const getImageBlob = useCallback(
    async (
      referenceId: string,
      referenceType: "program" | "course"
    ): Promise<Uint8Array | null> => {
      try {
        return await getFieldImageBlob(referenceId, referenceType);
      } catch (error) {
        console.error("Failed to get image blob:", error);
        return null;
      }
    },
    []
  );

  const contextValue: FieldsContextValue = {
    // State
    fields: state.fields,
    loading: state.loading,
    error: state.error,
    totalCount: state.totalCount,
    initialized: state.initialized,
    searchQuery: state.searchQuery,
    searchResults: state.searchResults,

    // Actions
    initializeDatabase,
    saveAndLoadFields, // Main function you requested
    loadFields,
    clearAllFields,
    searchFieldsLocal,
    clearSearch,
    refreshFieldsCount,
    getImageBlob,
  };

  return (
    <FieldsContext.Provider value={contextValue}>
      {children}
    </FieldsContext.Provider>
  );
};

// Custom Hook
export const useFields = (): FieldsContextValue => {
  const context = useContext(FieldsContext);
  if (context === undefined) {
    throw new Error("useFields must be used within a FieldsProvider");
  }
  return context;
};

// Export types for use in other components
export type { Course, Field, FieldsResponse, Program };
