import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  deleteUserFromDatabase,
  getUserFromDatabase,
  initDatabase,
  saveUserToDatabase,
} from '../db/database';

// Type definitions matching your server response
interface ProfilePic {
  public_id: string;
  url: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: ProfilePic | null; // Make profilePic optional
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  // Add any additional registration fields here
}

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>; // Updated signature RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUserData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
  authError: string | null;
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
  

    const isAuthenticated = !!authToken && !!user;


  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await initDatabase();
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          const storedUser = await getUserFromDatabase(token);
          if (storedUser) {
            setUser(storedUser);
            setAuthToken(token);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleAuthRequest = async (url: string, body: object) => {
    try {
      
      
      const response = await fetch(`http://10.0.2.2:5000/api/v1/auth${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Auth request error:', error);
      setAuthError(
        error instanceof Error ? error.message : 'An error occurred'
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data = await handleAuthRequest('/login', { email, password });
      
      await SecureStore.setItemAsync('authToken', data.token);
      await saveUserToDatabase(data.user);
      
      setUser(data.user);
      setAuthToken(data.token);
      setAuthError(null);
      setIsLoading(false);
      
    } catch (error) {
      // Error already handled in handleAuthRequest
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const responseData = await handleAuthRequest('/register', {
        name,
        email,
        password,
      });
      
      // Some APIs return user data directly on register, others require login
      if (responseData.token && responseData.user) {
        await SecureStore.setItemAsync('authToken', responseData.token);
        await saveUserToDatabase(responseData.user);
        
        setUser(responseData.user);
        setAuthToken(responseData.token);
      } else {
        // If register doesn't automatically log in, call login
        await login(email, password);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchCurrentUser = async (token: string): Promise<User> => {
    const response = await fetch('http://10.0.2.2:5000/api/v1/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    
    return await response.json();
  };

  const logout = async (): Promise<void> => {
    try {
      if (authToken) {
        await deleteUserFromDatabase(authToken);
        await SecureStore.deleteItemAsync('authToken');
      }
      setUser(null);
      setAuthToken(null);
    } catch (error) {
      console.error('Logout error:', error);
      setAuthError('Failed to logout');
      throw error;
    }
  };

  const updateUser = async (updatedUserData: Partial<User>): Promise<void> => {
    try {
      if (!authToken) throw new Error('Not authenticated');
      
      const response = await fetch('http://10.0.2.2:5000/api/v1/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const updatedUser = await response.json();
      await saveUserToDatabase(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
      setAuthError(error instanceof Error ? error.message : 'Failed to update user');
      throw error;
    }
  };

  const refreshUser = async (): Promise<void> => {
    if (!authToken) return;
    try {
      const freshUser = await fetchCurrentUser(authToken);
      await saveUserToDatabase(freshUser);
      setUser(freshUser);
    } catch (error) {
      console.error('Refresh user error:', error);
      setAuthError('Failed to refresh user data');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    authToken,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: isAuthenticated,
    authError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};