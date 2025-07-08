import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
type ThemeContextType = {
  themeMode: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const getCurrentTheme = () => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark' ? DarkTheme : DefaultTheme;
    }
    return themeMode === 'dark' ? DarkTheme : DefaultTheme;
  };

  const toggleTheme = () => {
    const modes = ['system', 'light', 'dark'];
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setThemeMode(nextMode);
    // Optionally save to AsyncStorage
    AsyncStorage.setItem('themeMode', nextMode);
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider value={getCurrentTheme()}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}


