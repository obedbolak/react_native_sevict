import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { router } from 'expo-router';
import React, { useState } from 'react';

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



const singup = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const [acceptTerms, setAcceptTerms] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleRegister = () => {
    Keyboard.dismiss();
    setIsLoading(true);

  if (
  !username.trim() ||
  !email.trim() ||
  !password.trim() ||
  !confirmPassword.trim()
) {
  setError('All fields are required');
  setIsLoading(false);
  return;
} else if (password !== confirmPassword) {
  setError('Passwords do not match');
  setIsLoading(false);
  return;
}

    // Simulate API call
    setTimeout(() => {
      if (password === 'password123') {
        router.replace('./dashboard');
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
            {/* Container 1: Logo (flex: 1) */}
            <View style={styles.container1}>
              <Image source={require("../../assets/images/react-logo.png")} style={styles.logo} />
            </View>

            {/* Container 2: Form Inputs (flex: 2, centered) */}
            <View style={styles.container2}>
              <View style={styles.formContainer}>
                <View style={{flexDirection:'column', alignItems:'flex-start'}}>
                  <Text style={styles.title}>Create Account!</Text>
                <Text style={styles.subtitle}>Please Create Your Account</Text></View>
                
                 <TextInput
                  placeholder="Enter Name"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholderTextColor={"grey"}
                />
                <TextInput
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholderTextColor={"grey"}
                />
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="Enter Password"
                      secureTextEntry={showPassword}
                      value={password}
                      onChangeText={setPassword}
                      style={styles.passwordInput}
                      autoCapitalize="none"
                      placeholderTextColor={"grey"}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      {showPassword ? (
                        <MaterialIcons name="visibility" size={20} color="black" />
                      ) : (
                        <MaterialIcons name="visibility-off" size={20} color="black" />
                      )}
                    </TouchableOpacity>
                  </View>
                   <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="Confirm Password"
                      secureTextEntry={showPassword}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      style={styles.passwordInput}
                      autoCapitalize="none"
                      placeholderTextColor={"grey"}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      {showPassword ? (
                        <MaterialIcons name="visibility" size={20} color="black" />
                      ) : (
                        <MaterialIcons name="visibility-off" size={20} color="black" />
                      )}
                    </TouchableOpacity>
                  </View>
                
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.loginButton}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>Register</Text>
                  )}
                </TouchableOpacity>
                {/* <CheckBox /> */}
                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    onPress={() => setAcceptTerms(!acceptTerms)}
                    style={[styles.checkboxContainer, acceptTerms && styles.checked]} // Apply checked style if acceptTerms is true (checkedstyles.checkbox}
                  >
                    {acceptTerms ? (
                      <MaterialIcons name="check" size={20} color="white" />
                    ) : null}
                  </TouchableOpacity>
                  
                  <Text style={styles.termsText}>
                    I accept the <Text style={styles.link}>Terms & Conditions</Text>
                  </Text>
                </View>

                
              </View>
            </View>

            {/* Container 3: Social Icons (flex: 1) */}
            <View style={styles.container3}>
            
             

              <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignItems:"flex-end", paddingBottom:50, gap:6 }}>
                <Text>I have an account?</Text>
                <TouchableOpacity onPress={() => router.replace('/(auth)')}><Text style={styles.footerLink}>Sign In</Text></TouchableOpacity>
                
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default singup;

const styles = StyleSheet.create({
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Container 1: Logo
  container1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 32,

  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  // Container 2: Form Inputs
  container2: {
    flex: 2,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
  },
  footerLink: {
    color: '#007bff',
    fontWeight: '600',
    fontSize: 18,
  },
  // Container 3: Social Icons
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
    
  },
  socialIcon: {
    marginLeft: 16,
    height:40,
    width:40
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    color: '#333',
    // Remove marginBottom here, handled by container
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
    top: 13,
  },
  socialText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    paddingLeft:10
  },
  termsText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});