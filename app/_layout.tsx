import { AuthProvider, useAuth } from '@/context/authContext';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../context/themeContext';


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function ThemedApp() {
  const { isDarkMode } = useTheme();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      } else {
        router.replace("/(auth)");
      }
    }
  }, [isLoading, isAuthenticated]);

  // Don't render the Stack while still loading auth state
  if (isLoading) {
    return null; // Keep splash screen visible
  }

  return (
    <>
    <StatusBar style={isDarkMode ? "light" : "dark"} />
    
    {
      isAuthenticated ? (
        <Stack>
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>
      )
    }
      
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <AuthProvider>
        <ThemedApp />
      </AuthProvider>
    </CustomThemeProvider>
  );
}