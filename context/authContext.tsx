import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { deleteUser, getUser, initDatabase, saveUser } from "../db/database";

interface ProfilePic {
  public_id: string;
  url: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: ProfilePic | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUserData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
  authError: string | null;
  profilePicBlob?: Uint8Array;
  clearError: () => void;
  forgotPassword: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [profilePicBlob, setProfilePicBlob] = useState<Uint8Array | undefined>(
    undefined
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const updateProfilePicBlob = useCallback(async () => {
    try {
      const storedData = await getUser();
      if (storedData?.profilePicBlob) {
        setProfilePicBlob(storedData.profilePicBlob);
      }
    } catch (error) {
      console.warn("Failed to get profile pic blob:", error);
    }
  }, []);

  const clearAuthData = useCallback(async () => {
    try {
      await deleteUser();
      setUser(null);
      setAuthToken(null);
      setProfilePicBlob(undefined);
      setIsAuthenticated(false);
      setAuthError(null);
      console.log("Auth data cleared completely");
    } catch (error) {
      console.error("Error clearing auth data:", error);
      throw error;
    }
  }, []);

  const fetchCurrentUser = useCallback(async (token: string): Promise<User> => {
    try {
      const response = await fetch(
        "http://10.0.2.2:5000/api/v1/auth/get-user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          throw new Error(
            "Server returned HTML instead of JSON - likely authentication failed"
          );
        }

        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user");
      }

      const data = await response.json();
      return data.user; // Return just the user object
    } catch (error) {
      console.error("fetchCurrentUser error:", error);

      setAuthToken(null);
      setUser(null);
      setIsAuthenticated(false);
      if (error instanceof SyntaxError) {
        throw new Error("Invalid server response - token may be expired");
      }
      throw error;
    }
  }, []);

  const verifyTokenInBackground = useCallback(
    async (token: string, currentUser: User) => {
      try {
        const freshUser = await fetchCurrentUser(token);
        if (JSON.stringify(freshUser) !== JSON.stringify(currentUser)) {
          await saveUser(freshUser, token);
          setUser(freshUser);
          await updateProfilePicBlob();
        }
      } catch (error) {
        console.warn("Background token verification failed:", error);
        // Don't change isAuthenticated - keep using stored data
      }
    },
    [fetchCurrentUser, updateProfilePicBlob]
  );

  const initializeAuth = useCallback(async () => {
    try {
      await initDatabase();
      const storedData = await getUser();

      if (storedData?.token && storedData.user) {
        setAuthToken(storedData.token);
        setUser(storedData.user);
        setProfilePicBlob(storedData.profilePicBlob);
        setIsAuthenticated(true);

        // Verify token in background
        verifyTokenInBackground(storedData.token, storedData.user);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [verifyTokenInBackground]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleAuthRequest = useCallback(async (url: string, body: object) => {
    setAuthError(null);
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/v1/auth${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          throw new Error("Server error - please try again");
        }

        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      return await response.json();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setAuthError(errorMessage);
      setInterval(() => setAuthError(""), 5000);
      throw error;
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const data = await handleAuthRequest("/login", { email, password });

        if (!data.user || !data.token) {
          throw new Error("Invalid response from server");
        }

        await saveUser(data.user, data.token);

        setUser(data.user);
        setAuthToken(data.token);
        setIsAuthenticated(true);
        await updateProfilePicBlob();
      } catch (error) {
        setIsAuthenticated(false);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthRequest, updateProfilePicBlob]
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      try {
        const responseData = await handleAuthRequest("/register", {
          name,
          email,
          password,
        });

        if (responseData.token && responseData.user) {
          await saveUser(responseData.user, responseData.token);
          setUser(responseData.user);
          setAuthToken(responseData.token);
          setIsAuthenticated(true);
          await updateProfilePicBlob();
        } else {
          await login(email, password);
        }
      } catch (error) {
        setIsAuthenticated(false);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [handleAuthRequest, login, updateProfilePicBlob]
  );

  const forgotPassword = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const response = await fetch(
          "http://10.0.2.2:5000/api/v1/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Password reset request failed");
        }

        // Success - no need to return anything specific
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Password reset request failed";
        setAuthError(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      await clearAuthData();
    } catch (error) {
      setAuthError("Failed to clear authentication data");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData]);

  const updateUser = useCallback(
    async (updatedUserData: Partial<User>): Promise<void> => {
      try {
        if (!authToken) throw new Error("Not authenticated");
        if (!user) throw new Error("No user data available");

        // Optional: Check for actual changes
        const hasChanges = Object.keys(updatedUserData).some(
          (key) =>
            JSON.stringify(user[key as keyof User]) !==
            JSON.stringify(updatedUserData[key as keyof User])
        );
        if (!hasChanges) return;

        const response = await fetch(
          "http://10.0.2.2:5000/api/v1/auth/patch-user",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedUserData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Update failed");
        }

        // Get the updated user data from the server
        const apiResponse = await response.json();

        // Fetch the complete user data again to ensure we have everything
        const completeUser = await fetchCurrentUser(authToken);

        // Save the complete user data to local storage
        await saveUser(completeUser, authToken, profilePicBlob);

        // Update state with the fresh data
        setUser(completeUser);

        if (updatedUserData.profilePic !== undefined) {
          await updateProfilePicBlob();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Update failed";
        setAuthError(errorMessage);
        console.error("Update user error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [authToken, user, profilePicBlob, updateProfilePicBlob, fetchCurrentUser]
  );

  const refreshUser = useCallback(async (): Promise<void> => {
    if (!authToken || !isAuthenticated) return;

    setIsLoading(true);
    setAuthError(null);

    try {
      const freshUser = await fetchCurrentUser(authToken);

      if (JSON.stringify(freshUser) !== JSON.stringify(user)) {
        await saveUser(freshUser, authToken, profilePicBlob);
        setUser(freshUser);
        await updateProfilePicBlob();
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("authentication")) {
        setIsAuthenticated(false);
        return;
      }

      const errorMessage = "Failed to refresh user data";
      setAuthError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [
    authToken,
    user,
    isAuthenticated,
    fetchCurrentUser,
    updateProfilePicBlob,
    profilePicBlob,
  ]);

  const value: AuthContextType = {
    user,
    authToken,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    authError,
    profilePicBlob,
    clearError,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
