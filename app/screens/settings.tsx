// Updated Settings Component
import { useAuth } from '@/context/authContext';
import { useTheme } from '@/context/themeContext';
import * as ImagePicker from 'expo-image-picker';

import { Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const { toggleTheme, colors, isDarkMode } = useTheme();
  const { logout, user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
const [imageData, setImageData] = useState<{
  uri: string;
  type: string;
  fileName: string;
} | null>(null);

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const styles = StyleSheet.create({
    avatarContainer: {
      alignItems: 'flex-end',
      marginBottom: 20,
      flexDirection: 'row',
      
    },
    avatarTouch: {
      position: 'absolute',
      borderRadius: 50,
      right: 0,
    },
    avatarupload: {
      width: 40,
      height: 40,
      borderRadius: 50,
      right: 0,
    },
     settingsCard: {
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 18,
          marginBottom: 25,
          elevation: 3,
        },
        settingsRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.background,
        },
        settingsIcon: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: `${colors.primary}20`,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 15,
        },
        settingsText: {
          fontSize: 16,
          fontWeight: '500',
          color: colors.text,
          flex: 1,
        },
        notificationBadge: {
          position: 'absolute',
          top: 15,
          right: 15,
          backgroundColor: '#F44336',
          borderRadius: 12,
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
        },
        notificationText: {
          color: '#FFF',
          fontSize: 12,
          fontWeight: 'bold',
        },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 25,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: colors.avatarBorder,
      marginBottom: 15,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: colors.subtext,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.subtext,
      marginTop: 20,
      marginBottom: 10,
      marginLeft: 5,
    },
    settingsSection: {
      backgroundColor:colors.sectionBackgroundColor,
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    
    settingsName: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      marginLeft: 10,
    },
    settingsAction: {
      marginLeft: 10,
    },
    settingsValue: {
      fontSize: 14,
      color: colors.settingsValue,
    },
    logoutButton: {
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    logoutText: {
      color: colors.error,
      fontSize: 16,
      fontWeight: '500',
    },
    versionText: {
      textAlign: 'center',
      color: colors.settingsValue,
      marginTop: 30,
      marginBottom: 20,
    },
  });

  const defaultUser = {
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex.johnson@techfuture.edu",
    studentId: "TF20230045",
    enrolledCourses: 5,
    completedCourses: 3,

    avatar: user?.profilepic?.url || "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const settingsItems = [
    {
      icon: 'notifications',
      name: 'Notifications',
      component: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={notificationsEnabled ? colors.background : colors.settingsValue}
        />
      ),
    },
    {
      icon: 'moon',
      name: 'Dark Mode',
      component: (
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={isDarkMode ? colors.background : colors.settingsValue}
        />
      ),
    },
    {
      icon: 'lock',
      name: 'Change Password',
      component: <MaterialIcons name="chevron-right" size={24} color={colors.settingsValue} />,
    },
    {
      icon: 'language',
      name: 'Language',
      component: <Text style={styles.settingsValue}>English</Text>,
    },
    {
      icon: 'help-circle',
      name: 'Help Center',
      component: <MaterialIcons name="chevron-right" size={24} color={colors.settingsValue} />,
    },
    {
      icon: 'file-text',
      name: 'Terms & Privacy',
      component: <MaterialIcons name="chevron-right" size={24} color={colors.settingsValue} />,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

 
    // Handle camera
    const takePhoto = async () => {
      try {
        // Request permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos.');
          return;
        }
  
        // Take photo
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.8,
        });
  
        if (!result.canceled && result.assets[0]) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      }
    };

const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to pick images.');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);
      
      const imageInfo = {
        uri: selectedImage.uri,
        type: selectedImage.type || 'image/jpeg',
        fileName: selectedImage.fileName || `image-${Date.now()}.jpg`
      };
      
      setImageData(imageInfo);
      return imageInfo;
    }
    return null;
  } catch (error) {
    Alert.alert('Error', 'Failed to pick image. Please try again.');
    return null;
  }
};

const handleUpdateProfile = async () => {
  if (!imageData) {
    console.log('No image data available');
    return;
  }

  try {
    const formData = new FormData();
    
    // Correct way to append file in React Native
    formData.append('image', {
      uri: imageData.uri,
      type: imageData.type,
      name: imageData.fileName
    } as any); // Type assertion needed for React Native FormData

    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Error', 'Authentication required');
      return;
    }

    const response = await axios.put(
      `https://10.0.2.2:5000/api/v1/auth/profile-picture-update/${user?._id}`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('Upload successful:', response.data);
    Alert.alert('Success', 'Avatar uploaded successfully!');
    
  } catch (error) {
    console.error('Upload failed:', error);
    Alert.alert('Error', 'Failed to upload image. Please try again.');
  }
};

useEffect(() => {
  if (imageData) {
    handleUpdateProfile();
  }
}, [imageData]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
        <Image source={{ uri: defaultUser.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.avatarTouch} onPress={pickImage}>
        <Image source={require('../../assets/images/imageupload.png')} style={styles.avatarupload} />
        </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{defaultUser.name}</Text>
        <Text style={styles.userEmail}>{defaultUser.email}</Text>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.settingsSection}>
        {settingsItems.slice(0, 4).map((item, index) => (
          <TouchableOpacity key={index} style={styles.settingsItem}>
            <View style={styles.settingsIcon}>
              {item.icon === 'notifications' || item.icon === 'lock' || item.icon === 'language' ? (
                <MaterialIcons name={item.icon as any} size={20} color={colors.primary} />
              ) : item.icon === 'moon' ? (
                <Feather name="moon" size={20} color={colors.primary} />
              ) : (
                <Feather name={item.icon as any} size={20} color={colors.primary} />
              )}
            </View>
            <Text style={styles.settingsName}>{item.name}</Text>
            <View style={styles.settingsAction}>
              {item.component}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Support Section */}
      <Text style={styles.sectionTitle}>Support</Text>
      <View style={styles.settingsSection}>
        {settingsItems.slice(4).map((item, index) => (
          <TouchableOpacity key={index} style={styles.settingsItem}>
            <View style={styles.settingsIcon}>
              <Feather name={item.icon as any} size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingsName}>{item.name}</Text>
            <View style={styles.settingsAction}>
              {item.component}
            </View>
          </TouchableOpacity>
        ))}
      </View>

       {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsIcon}>
              <MaterialCommunityIcons name="theme-light-dark" size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingsText}>Dark Mode</Text>
            <FontAwesome name="toggle-off" size={24} color={colors.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsIcon}>
              <MaterialIcons name="notifications" size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingsText}>Notifications</Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingsRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingsIcon}>
              <MaterialIcons name="privacy-tip" size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingsText}>Privacy & Security</Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.subtext} />
          </TouchableOpacity>
        </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>STC v1.2.0</Text>
    </ScrollView>
  );
};

export default Settings;