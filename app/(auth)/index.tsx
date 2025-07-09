import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/themeContext';

   


const LoginScreen = () => {
  const { isDarkMode, colors, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
   const [errorTimeout, setErrorTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
   
  
    // Clear timeout when component unmounts
    useEffect(() => {
      return () => {
        if (errorTimeout) clearTimeout(errorTimeout);
      };
    }, [errorTimeout]);

  const handleLogin = () => {
    Keyboard.dismiss();

    // Clear any existing timeout
    if (errorTimeout) clearTimeout(errorTimeout);

    if (!username.trim() && !password.trim()) {
      setError('All fields are required');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    } else if (!password.trim()) {
      setError('Password is required');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    } else if (!username.trim()) {
      setError('Username is required');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    } else if (password !== '12345678') {
      setError('Invalid credentials');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    } else if (username !== 'laura') {
      setError("Invalid username");
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? colors.background : colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
            {/* Logo Section */}
            <View style={styles.container1}>
              <Image 
                source={require("../../assets/images/react-logo.png")} 
                style={styles.logo} 
                accessibilityLabel="App logo"
              />
            </View>

            {/* Form Section */}
            <View style={styles.container2}>
              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <TouchableOpacity onPress={() => toggleTheme()}>
                    <MaterialIcons 
                      name={isDarkMode ? "dark-mode" : "light-mode"} 
                      size={24} 
                      color={Colors.light.icon} 
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
                    color={Colors.light.icon} 
                    style={styles.inputIcon}
                    accessibilityLabel="Email icon"
                  />
                  <TextInput
                    placeholder="Enter Email"
                    value={username}
                    onChangeText={(text) => {
                      setUsername(text);
                      if (error) setError('');
                    }}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholderTextColor={Colors.light.placeholder}
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
                    color={Colors.light.icon} 
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
                    placeholderTextColor={Colors.light.placeholder}
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
                      color={Colors.light.icon} 
                    />
                  </TouchableOpacity>
                </View>
                
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                
                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  style={styles.loginButton}
                  disabled={isLoading}
                  accessibilityLabel="Login button"
                >
                  {isLoading ? (
                    <ActivityIndicator color={Colors.light.buttonText} />
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer Section */}
            <View style={styles.container3}>
              <View style={styles.socialContainer}>
                <Text style={styles.socialText}>Or continue with</Text>
                <View style={styles.socialIconsContainer}>
                  <Image 
                    source={{uri:"https://img.icons8.com/?size=100&id=17949&format=png&color=000000"}} 
                    style={styles.socialIcon} 
                    accessibilityLabel="Google login"
                  />
                  <Image 
                    source={{uri:"https://img.icons8.com/color/48/000000/facebook-new.png"}} 
                    style={styles.socialIcon} 
                    accessibilityLabel="Facebook login"
                  />
                  <Image 
                    source={{uri:"https://img.icons8.com/?size=100&id=30840&format=png&color=000000"}} 
                    style={styles.socialIcon} 
                    accessibilityLabel="Apple login"
                  />
                </View>
              </View>

              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity 
                  onPress={() => router.replace('./signup')}
                  accessibilityLabel="Navigate to sign up"
                >
                  <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  keyboardAvoiding: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  // Logo Section
  container1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  // Form Section
  container2: {
    flex: 1.2,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext,
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
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingLeft: 48,
    backgroundColor: Colors.light.inputBackground,
    color: Colors.light.text,
    fontSize: 16,
  },
  passwordInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingLeft: 48,
    paddingRight: 48,
    backgroundColor: Colors.light.inputBackground,
    color: Colors.light.text,
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
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: Colors.light.buttonText,
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  // Footer Section
  container3: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  socialContainer: {
    marginBottom: 24,
  },
  socialText: {
    fontSize: 16,
    color: Colors.light.subtext,
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.light.text,
    fontSize: 16,
  },
  footerLink: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
});

export default LoginScreen;