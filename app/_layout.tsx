import { AuthProvider, useAuth } from "@/context/authContext";
import { FieldsProvider } from "@/context/fieldsContext";
import { PostsProvider } from "@/context/postContext";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "../context/themeContext";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function ThemedApp() {
  const { isDarkMode } = useTheme();
  const { isLoading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Hide splash screen once loading is complete
      SplashScreen.hideAsync();

      // Navigate based on authentication state
      if (!isAuthenticated) {
        router.replace("/(auth)");
      } else if (isAuthenticated && user?.role === "user") {
        router.replace("/dashboard");
      } else if (isAuthenticated && user?.role === "admin") {
        router.replace("/admin");
      }
    }
  }, [isLoading, isAuthenticated]);

  // Show nothing while loading (splash screen is still visible)
  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="dashboard"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="+not-found"
          options={{
            title: "Not Found",
            animation: "fade",
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <CustomThemeProvider>
      <PostsProvider>
        <FieldsProvider>
          <AuthProvider>
            <ThemedApp />
          </AuthProvider>
        </FieldsProvider>
      </PostsProvider>
    </CustomThemeProvider>
  );
}
