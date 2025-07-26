import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SignupScreen = () => {
  const { register, authError, isLoading } = useAuth();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimeout) clearTimeout(errorTimeout);
    };
  }, [errorTimeout]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    Keyboard.dismiss();
    try {
      await register(formData.username, formData.email, formData.password);
    } catch (error) {
      // Error handling already in auth context
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardAvoiding: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    mainContainer: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: "space-between",
    },
    topSection: {
      flex: 1,
      justifyContent: "center",
      minHeight: 400, // Minimum height to prevent squashing
    },
    // Logo Section
    logoContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: "contain",
    },
    // Form Section
    formContainer: {
      paddingVertical: 20,
    },
    headerContainer: {
      marginBottom: 24,
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.subtext,
    },
    inputContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: 16,
      zIndex: 1,
    },
    input: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingLeft: 48,
      paddingRight: 48, // Extra padding for eye button
      backgroundColor: colors.inputBackground,
      color: colors.text,
      fontSize: 16,
    },
    eyeButton: {
      position: "absolute",
      right: 16,
      padding: 10,
    },
    termsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 16,
      paddingLeft: 16,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    checkboxChecked: {
      backgroundColor: colors.checkboxBackground,
      borderColor: colors.primary,
    },
    termsText: {
      color: colors.text,
      fontSize: 14,
      flex: 1,
    },
    termsLink: {
      color: colors.primary,
      textDecorationLine: "underline",
    },
    registerButton: {
      width: "100%",
      height: 50,
      backgroundColor: colors.primary,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    registerButtonText: {
      color: colors.buttonText,
      fontSize: 18,
      fontWeight: "600",
    },
    errorContainer: {
      alignItems: "flex-end",
      flexDirection: "row",
      justifyContent: "center",
      gap: 4,
    },
    errorText: {
      color: colors.error || "#DC2626",
      fontSize: 15,
      marginTop: 4,
    },
    // Footer Section - Will stick above keyboard
    footerContainer: {
      paddingBottom: Platform.OS === "ios" ? 20 : 10,
    },
    footerSigninContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    footerText: {
      color: colors.text,
      fontSize: 16,
    },
    footerLink: {
      color: colors.primary,
      fontWeight: "600",
      fontSize: 16,
      marginLeft: 6,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
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
                    <Text style={styles.title}>Create Account!</Text>
                    <Text style={styles.subtitle}>
                      Please Create Your Account
                    </Text>
                  </View>

                  {/* Name Input */}
                  <View style={styles.inputContainer}>
                    <MaterialIcons
                      name="person"
                      size={20}
                      color={colors.icon}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Enter Name"
                      value={formData.username}
                      onChangeText={(text) =>
                        handleInputChange("username", text)
                      }
                      style={styles.input}
                      placeholderTextColor={colors.placeholder}
                      accessibilityLabel="Name input"
                      autoComplete="name"
                    />
                  </View>

                  {/* Email Input */}
                  <View style={styles.inputContainer}>
                    <MaterialIcons
                      name="email"
                      size={20}
                      color={colors.icon}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Enter Email"
                      value={formData.email}
                      onChangeText={(text) => handleInputChange("email", text)}
                      style={styles.input}
                      placeholderTextColor={colors.placeholder}
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
                      color={colors.icon}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Enter Password"
                      secureTextEntry={!showPassword}
                      value={formData.password}
                      onChangeText={(text) =>
                        handleInputChange("password", text)
                      }
                      style={styles.input}
                      placeholderTextColor={colors.placeholder}
                      accessibilityLabel="Password input"
                      autoComplete="password-new"
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      accessibilityLabel={
                        showPassword ? "Show password" : "Hide password"
                      }
                    >
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                        size={20}
                        color={colors.icon}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Confirm Password Input */}
                  <View style={styles.inputContainer}>
                    <MaterialIcons
                      name="lock"
                      size={20}
                      color={colors.icon}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Confirm Password"
                      secureTextEntry={!showConfirmPassword}
                      value={formData.confirmPassword}
                      onChangeText={(text) =>
                        handleInputChange("confirmPassword", text)
                      }
                      style={styles.input}
                      placeholderTextColor={colors.placeholder}
                      accessibilityLabel="Confirm password input"
                      autoComplete="password-new"
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={styles.eyeButton}
                      accessibilityLabel={
                        showConfirmPassword ? "Show password" : "Hide password"
                      }
                    >
                      <MaterialIcons
                        name={
                          showConfirmPassword ? "visibility" : "visibility-off"
                        }
                        size={20}
                        color={colors.icon}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Terms Checkbox */}
                  <View style={styles.termsContainer}>
                    <TouchableOpacity
                      onPress={() => setAcceptTerms(!acceptTerms)}
                      style={[
                        styles.checkbox,
                        acceptTerms && styles.checkboxChecked,
                      ]}
                      accessibilityLabel={
                        acceptTerms ? "Terms accepted" : "Accept terms"
                      }
                    >
                      {acceptTerms && (
                        <MaterialIcons
                          name="check"
                          size={16}
                          color={colors.background}
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.termsText}>
                      I accept the
                      <Text style={styles.termsLink}>Terms & Conditions</Text>
                    </Text>
                  </View>
                  {authError && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{authError}</Text>
                      <MaterialIcons
                        name="person-off"
                        size={20}
                        color={colors.error || "#DC2626"}
                      />
                    </View>
                  )}

                  {/* Register Button */}
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={[
                      styles.registerButton,
                      (isLoading || !acceptTerms) && styles.buttonDisabled,
                    ]}
                    disabled={isLoading || !acceptTerms}
                    accessibilityLabel="Register button"
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.background} />
                    ) : (
                      <Text style={styles.registerButtonText}>Register</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Footer Section - Will stick above keyboard */}
              <View style={styles.footerContainer}>
                <View style={styles.footerSigninContainer}>
                  <Text style={styles.footerText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.replace("/(auth)")}
                    accessibilityLabel="Navigate to sign in"
                  >
                    <Text style={styles.footerLink}>Sign In</Text>
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

export default SignupScreen;
