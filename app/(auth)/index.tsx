import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
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

const index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    Keyboard.dismiss();

   if(!username.trim() && !password.trim()){
      setError('All fields are required');
      // setIsLoading(false);
      return;
    }else if(!password.trim()){
      setError('Password is required');
      // setIsLoading(false);
      return;
    }else if(!username.trim()){
      setError('Username is required');
      // setIsLoading(false);
      return;
    }
    else if(password !== '12345678'){
      setError('Invalid credentials');
      // setIsLoading(false);
      return;
    }else if(username !== 'laura'){
      setError("Invalid username")
      return;
    }else{
      router.replace("/dashboard");
    }
    // setIsLoading(true);

    // Simulate API call
    // setTimeout(() => {
    //   if (password === 'password123') {
    //     router.replace('./dashboard');
    //   } else {
    //     setError('Invalid credentials');
    //   }
    //   setIsLoading(false);
    // }, 1500);
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
                  <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Sign in to to continue with the App</Text></View>
                
                <TextInput
                  placeholder="Enter Email"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholderTextColor={'grey'}
                />
              <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="Enter Password"
                      secureTextEntry={showPassword}
                      value={password}
                      onChangeText={setPassword}
                      style={styles.passwordInput}
                      autoCapitalize="none"
                      placeholderTextColor={'grey'}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      {!showPassword ? (
                        <MaterialIcons name="visibility" size={20} color="black" />
                      ) : (
                        <MaterialIcons name="visibility-off" size={20} color="black" />
                      )}
                    </TouchableOpacity>
                  </View>
                
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity
                  onPress={handleLogin}
                  style={styles.loginButton}
                  
                >
                  
                    <Text style={styles.loginButtonText}>Login</Text>
                
                </TouchableOpacity>
                
              </View>
            </View>

            {/* Container 3: Social Icons (flex: 1) */}
            <View style={styles.container3}>
              <View style={{flex:1}}>
                <Text style={styles.socialText}>Or continue with</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', flex:2}}> 
                <Image source={{uri:"https://img.icons8.com/?size=100&id=17949&format=png&color=000000"}} style={styles.socialIcon} />
                <Image source={{uri:"https://img.icons8.com/color/48/000000/facebook-new.png"}} style={styles.socialIcon} />
                {/* apple logo */}

                <Image source={{uri:"https://img.icons8.com/?size=100&id=30840&format=png&color=000000"}} style={styles.socialIcon} />
              
              </View>
             

              <View style={{flex:1, flexDirection:"row", justifyContent:"center", alignItems:"center", gap:6, paddingBottom:20}}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.replace('./signup')}><Text style={styles.footerLink}>Sign up</Text></TouchableOpacity>
                
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',

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
    
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  // Container 2: Form Inputs
  container2: {
    flex: 1.2,
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
});