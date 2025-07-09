// ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors, darkTheme, lightTheme } from '../constants/Colors';

type Theme = typeof lightTheme | typeof darkTheme | 'device';

interface ThemeContextType {
  theme: Theme;
  colors: typeof Colors.light | typeof Colors.dark;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = '@user_theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('device');
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load saved theme preference on initial render
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ['device', lightTheme, darkTheme].includes(savedTheme)) {
          setTheme(savedTheme as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference whenever it changes
  useEffect(() => {
    if (!isThemeLoaded) return; // Don't save on initial load
    
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
    };

    saveTheme();
  }, [theme, isThemeLoaded]);

  // Listen to device theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'device') {
        setIsDarkMode(colorScheme === 'dark');
      }
    });

    return () => subscription.remove();
  }, [theme]);

  // Update isDarkMode when theme changes
  useEffect(() => {
    if (theme === 'device') {
      setIsDarkMode(Appearance.getColorScheme() === 'dark');
    } else {
      setIsDarkMode(theme === darkTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'device') {
        return Appearance.getColorScheme() === 'dark' ? lightTheme : darkTheme;
      }
      return prevTheme === lightTheme ? darkTheme : lightTheme;
    });
  };

  const colors = isDarkMode ? Colors.dark : Colors.light;

  // Don't render children until theme is loaded to avoid flash of wrong theme
  if (!isThemeLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};