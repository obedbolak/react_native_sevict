import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Context
import { useAuth } from '@/context/authContext';
import { useTheme } from '../../context/themeContext';

const LoginScreen = () => {
  // Context hooks
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { login, isLoading, authError } = useAuth();
  
  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  
  // Layout hooks
  const insets = useSafeAreaInsets();

  // Effects
  useEffect(() => {
    return () => {
      if (errorTimeout) clearTimeout(errorTimeout);
    };
  }, [errorTimeout]);

  // Handlers
  const handleLogin = async () => {
    Keyboard.dismiss();
    await login(username, password);
  };

  // Styles
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardAvoidingContainer: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'space-between',
    },
    topSection: {
      flex: 1,
      justifyContent: 'center',
      minHeight: 300, // Minimum height to prevent squashing
    },
    // Logo Section
    logoContainer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    logo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
    },
    // Form Section
    formContainer: {
      paddingVertical: 20,
    },
    headerContainer: {
      marginBottom: 32,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.subtext,
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      left: 16,
      zIndex: 1,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingLeft: 48,
      backgroundColor: colors.inputBackground,
      color: colors.text,
      fontSize: 16,
    },
    passwordInput: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingLeft: 48,
      paddingRight: 48,
      backgroundColor: colors.inputBackground,
      color: colors.text,
      fontSize: 16,
    },
    eyeButton: {
      position: 'absolute',
      right: 16,
      padding: 10,
    },
    loginButton: {
      width: '100%',
      height: 50,
      backgroundColor: colors.primary,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    loginButtonText: {
      color: colors.buttonText,
      fontSize: 18,
      fontWeight: '600',
    },
    errorContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    errorText: {
      color: colors.error || '#DC2626',
      fontSize: 15,
      marginTop: 4,
    },
    // Footer Section - This will stick above keyboard
    footerContainer: {
      paddingBottom: Platform.OS === 'ios' ? (20 + insets.bottom) : (10 + insets.bottom),
    },
    socialContainer: {
      marginBottom: 24,
    },
    socialText: {
      fontSize: 16,
      color: colors.subtext,
      marginBottom: 16,
      textAlign: 'center',
    },
    socialIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 24,
    },
    socialIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      color: colors.text,
      fontSize: 16,
    },
    signupLink: {
      color: colors.primary,
      fontWeight: '600',
      fontSize: 16,
      marginLeft: 6,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.contentContainer}>
              {/* Top Section - Logo and Form */}
              <View style={styles.topSection}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                  <Image 
                    source={require("../../assets/images/react-logo.png")} 
                    style={styles.logo} 
                    accessibilityLabel="App logo"
                  />
                </View>

                {/* Form Section */}
                <View style={styles.formContainer}>
                  <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={toggleTheme}>
                      <MaterialIcons 
                        name={isDarkMode ? "dark-mode" : "light-mode"} 
                        size={24} 
                        color={colors.icon} 
                        accessibilityLabel={isDarkMode ? "Light mode icon" : "Dark mode icon"}
                      />
                    </TouchableOpacity>
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Sign in to continue with the App</Text>
                  </View>
                  
                  {/* Email Input */}
                  <View style={styles.inputContainer}>
                    <MaterialIcons 
                      name="email" 
                      size={20} 
                      color={colors.icon} 
                      style={styles.inputIcon}
                      accessibilityLabel="Email icon"
                    />
                    <TextInput
                      placeholder="Enter Email"
                      value={username}
                      onChangeText={setUsername}
                      style={styles.input}
                      autoCapitalize="none"
                      placeholderTextColor={colors.placeholder}
                      keyboardType="email-address"
                      accessibilityLabel="Email input"
                      autoComplete="email"
                    />
                  </View>
                  
                  {/* Password Input */}
                  <View style={styles.inputContainer}>
                    <MaterialIcons 
                      name="lock" 
                      size={20} 
                      color={colors.icon} 
                      style={styles.inputIcon}
                      accessibilityLabel="Password icon"
                    />
                    <TextInput
                      placeholder="Enter Password"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      style={styles.passwordInput}
                      autoCapitalize="none"
                      placeholderTextColor={colors.placeholder}
                      accessibilityLabel="Password input"
                      autoComplete="password"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      accessibilityLabel={showPassword ? "Show password" : "Hide password"}
                    >
                      <MaterialIcons 
                        name={showPassword ? "visibility" : "visibility-off"} 
                        size={20} 
                        color={colors.icon} 
                      />
                    </TouchableOpacity>
                  </View>
                  
                  {authError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{authError}</Text>
                      <MaterialIcons 
                        name="error" 
                        size={20} 
                        color={colors.error || '#DC2626'} 
                      />
                    </View>
                  )}
                  
                  {/* Login Button */}
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
                    disabled={isLoading}
                    accessibilityLabel="Login button"
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.buttonText} />
                    ) : (
                      <Text style={styles.loginButtonText}>Login</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Footer Section - Will stick above keyboard */}
              <View style={styles.footerContainer}>
                <View style={styles.socialContainer}>
                  <Text style={styles.socialText}>Or continue with</Text>
                  <View style={styles.socialIconsContainer}>
                    <Image 
                      source={{ uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000" }} 
                      style={styles.socialIcon} 
                      accessibilityLabel="Google login"
                    />
                    <Image 
                      source={{ uri: "https://img.icons8.com/color/48/000000/facebook-new.png" }} 
                      style={styles.socialIcon} 
                      accessibilityLabel="Facebook login"
                    />
                    <Image 
                      source={{ uri: "https://img.icons8.com/?size=100&id=30840&format=png&color=000000" }} 
                      style={styles.socialIcon} 
                      accessibilityLabel="Apple login"
                    />
                  </View>
                </View>

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account?</Text>
                  <TouchableOpacity 
                    onPress={() => router.replace('./signup')}
                    accessibilityLabel="Navigate to sign up"
                  >
                    <Text style={styles.signupLink}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;