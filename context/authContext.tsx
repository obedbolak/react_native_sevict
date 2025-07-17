import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilepic: {
    public_id: string;
    url: string;
  };
  
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
  register: (name: string, email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  loginloading: boolean;
  registerloading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginloading, setLoginLoading] = useState(false);
  const [registerloading, setRegisterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load auth data on initial render
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync("authToken"),
          SecureStore.getItemAsync("authUser")
        ]);

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Set all auth states together to avoid race conditions
          setToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Set axios default header
          axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
          
          console.log("Auth restored from storage");
        } else {
          // If no stored auth data, ensure we're in unauthenticated state
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to load auth data", error);
        setError("Failed to load authentication data");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoginLoading(true);

      const response = await axios.post<AuthResponse>("http://10.0.2.2:5000/api/v1/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        setLoginLoading(false);
        // Store auth data securely
        await Promise.all([
          SecureStore.setItemAsync("authToken", newToken),
          SecureStore.setItemAsync("authUser", JSON.stringify(newUser))
        ]);
        
        // Update state atomically
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        // Set axios default header
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        
        console.log("Login successful");
        
        // Navigation will be handled by the layout component
        // based on the updated isAuthenticated state
      }
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setLoginLoading(false);
      setError(errorMessage);
      setTimeout(() => {setError(null)
        
      }
      , 5000);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setRegisterLoading(true);

      // Basic client-side validation
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const response = await axios.post<AuthResponse>(
        "http://10.0.2.2:5000/api/v1/auth/register", 
        { name, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        setRegisterLoading(false);
        // Store auth data securely
        await Promise.all([
          SecureStore.setItemAsync("authToken", newToken),
          SecureStore.setItemAsync("authUser", JSON.stringify(newUser))
        ]);
        
        // Update state atomically
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        // Set axios default header
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        
        console.log("Registration successful");
        
        return { success: true };
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      setRegisterLoading(false);
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Clear auth data from storage
      await Promise.all([
        SecureStore.deleteItemAsync("authToken"),
        SecureStore.deleteItemAsync("authUser")
      ]);
      
      // Reset state atomically
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      // Remove axios default header
      delete axios.defaults.headers.common["Authorization"];
      
      console.log("Logout successful");
      
      // Navigation will be handled by the layout component
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
        loginloading,
        registerloading
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