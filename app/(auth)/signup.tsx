import { Colors } from "@/constants/Colors";
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
  View,
} from 'react-native';

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (errorTimeout) clearTimeout(errorTimeout);
    };
  }, [errorTimeout]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleRegister = () => {
    Keyboard.dismiss();
    
    // Clear any existing timeout
    if (errorTimeout) clearTimeout(errorTimeout);

    // Validate form
    if (!formData.username.trim() || !formData.email.trim() || 
        !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError('All fields are required');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      setErrorTimeout(setTimeout(() => setError(''), 5000));
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/dashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
                  <Text style={styles.title}>Create Account!</Text>
                  <Text style={styles.subtitle}>Please Create Your Account</Text>
                </View>
                
                {/* Name Input */}
                <View style={styles.inputContainer}>
                  <MaterialIcons 
                    name="person" 
                    size={20} 
                    color={Colors.light.icon} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Enter Name"
                    value={formData.username}
                    onChangeText={(text) => handleInputChange('username', text)}
                    style={styles.input}
                    placeholderTextColor={Colors.light.placeholder}
                    accessibilityLabel="Name input"
                    autoComplete="name"
                  />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <MaterialIcons 
                    name="email" 
                    size={20} 
                    color={Colors.light.icon} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Enter Email"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    style={styles.input}
                    placeholderTextColor={Colors.light.placeholder}
                    keyboardType="email-address"
                    accessibilityLabel="Email input"
                    autoComplete="email"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <MaterialIcons 
                    name="lock" 
                    size={20} 
                    color={Colors.light.icon} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Enter Password"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    style={styles.input}
                    placeholderTextColor={Colors.light.placeholder}
                    accessibilityLabel="Password input"
                    autoComplete="password-new"
                    autoCapitalize="none"
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

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                  <MaterialIcons 
                    name="lock" 
                    size={20} 
                    color={Colors.light.icon} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    style={styles.input}
                    placeholderTextColor={Colors.light.placeholder}
                    accessibilityLabel="Password input"
                    autoComplete="password-new"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                    accessibilityLabel={showConfirmPassword ? "Show password" : "Hide password"}
                  >
                    <MaterialIcons 
                      name={showPassword ? "visibility" : "visibility-off"} 
                      size={20} 
                      color={Colors.light.icon} 
                    />
                  </TouchableOpacity>
                </View>
                
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Terms Checkbox */}
                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    onPress={() => setAcceptTerms(!acceptTerms)}
                    style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}
                    accessibilityLabel={acceptTerms ? "Terms accepted" : "Accept terms"}
                  >
                    {acceptTerms && (
                      <MaterialIcons name="check" size={16} color={Colors.light.background} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    I accept the <Text style={styles.termsLink}>Terms & Conditions</Text>
                  </Text>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  onPress={handleRegister}
                  style={[styles.registerButton, isLoading && styles.buttonDisabled]}
                  disabled={isLoading}
                  accessibilityLabel="Register button"
                >
                  {isLoading ? (
                    <ActivityIndicator color={Colors.light.background} />
                  ) : (
                    <Text style={styles.registerButtonText}>Register</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer Section */}
            <View style={styles.container3}>
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity 
                  onPress={() => router.replace('/(auth)')}
                  accessibilityLabel="Navigate to sign in"
                >
                  <Text style={styles.footerLink}>Sign In</Text>
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
    flex: 1,
    backgroundColor: Colors.light.background,
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
    flex: 2,
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
    color: Colors.light.text, // Fixed from Text to text
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext, // Changed from Text to subtext
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
    backgroundColor: Colors.light.inputBackground, // Fixed from inputbackgroundcolor to inputBackground
    color: Colors.light.text, // Fixed from Text to text
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: Colors.light.checked,
    borderColor: Colors.light.primary,
  },
  termsText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  termsLink: {
    color: Colors.light.primary,
    textDecorationLine: 'underline',
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: Colors.light.buttonText, // Changed from background to buttonText
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.light.error, // Fixed from texterror to error
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.light.text, // Fixed from Text to text
    fontSize: 16,
  },
  footerLink: {
    color: Colors.light.primary, // Changed from footerText to primary
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
});


export default SignupScreen;