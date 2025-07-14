import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true for initial load
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load auth data on initial render
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        setIsLoading(true);
        
        // Get both token and user data from secure storage
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync("authToken"),
          SecureStore.getItemAsync("authUser")
        ]);

        // If both token and user details exist, log the user in
        if (storedToken && storedUser) { 
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error("Failed to load auth data", error);
        setError("Failed to load authentication data");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
    setIsLoading(true);

      const response = await axios.post<AuthResponse>("http://10.0.2.2:5000/api/v1/auth/login", {
        email,
        password,
      });
      

      if (response.data.success) {

        // receive token and user from the response of the server 
        const { token, user } = response.data;
        setIsLoading(false);
        // Store both token and user data securely
        await SecureStore.setItemAsync("authToken", token);
        await SecureStore.setItemAsync("authUser", JSON.stringify(user));
        
        // Update state
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        router.replace("/dashboard");
        // Note: Navigation is now handled in the layout component
      }
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

    const response = await axios.post<AuthResponse>("http://10.0.2.2:5000/api/v1/auth/register", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store both token and user data securely
        await SecureStore.setItemAsync("authToken", token);
        await SecureStore.setItemAsync("authUser", JSON.stringify(user));
        
        // Update state
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        // Note: Navigation is now handled in the layout component
      }
    } catch (error: any) {      

      let errorMessage = "Registration failed. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Clear all auth data from storage
      await SecureStore.deleteItemAsync("authToken");
      await SecureStore.deleteItemAsync("authUser");
      
      // Reset state
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      delete axios.defaults.headers.common["Authorization"];
      
      // Note: Navigation is now handled in the layout component
    } catch (error) {
      console.error("Failed to logout", error);
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        isLoading,
        error,
        user,
        login,
        logout,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};