import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

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
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
            animation: 'fade',
          }} 
        />
        <Stack.Screen 
          name="dashboard" 
          options={{ 
            headerShown: false,
            animation: 'fade',
          }} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{
            title: 'Not Found',
            animation: 'fade',
          }}
        />
      </Stack>
    </>
  );
}