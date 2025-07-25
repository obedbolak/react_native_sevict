// Updated Settings Component with optimized re-renders
import { useAuth } from '@/context/authContext';
import { useTheme } from '@/context/themeContext';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface SettingsItem {
  icon: string;
  name: string;
  component: React.ReactNode;
}

export default function Settings ()  {
  const { toggleTheme, colors, isDarkMode } = useTheme();
  const { logout, user, authToken, updateUser} = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  //i want to make sure i update user data when the profile picture is updated
 

  // Memoized styles to prevent recreation on every render
  const styles = useMemo(() => StyleSheet.create({
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
      paddingBottom: 20,
    },
    profileHeader: {
      alignItems: 'center',
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
      backgroundColor: colors.sectionBackgroundColor,
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
  }), [colors]);

  // Memoized user data
  const currentUser = useMemo(() => ({
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex.johnson@techfuture.edu",
    studentId: "TF20230045",
    enrolledCourses: 5,
    completedCourses: 3,
  }), [user]);

  // Memoized settings items
  const settingsItems = useMemo<SettingsItem[]>(() => [
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
      name: 'Terms & Conditions',
      component: <MaterialIcons name="chevron-right" size={24} color={colors.settingsValue} />,
    },
  ], [notificationsEnabled, isDarkMode, colors, styles.settingsValue, toggleTheme]);

  // Memoized callbacks
  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [logout]);

  const handleUpdateProfile = useCallback(async (imageUri: string) => {
    if (!authToken || !user?._id) {
      Alert.alert('Error', 'Authentication required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `profile-${Date.now()}.jpg`,
      } as any);

      const apiUrl = `http://10.0.2.2:5000/api/v1/auth/profile-picture-update/${user._id}`;
      
      const response = await axios.put(apiUrl, formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
      });
      
      await updateUser(response.data.user);
     console.log('Profile picture updated successfully:');
    } catch (error) {
      console.error('Upload Error:', error);
      let errorMessage = 'Failed to upload image. Please try again.';
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data?.message || errorMessage;
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    }
  }, [authToken, user?._id, updateUser]);

  const pickImage = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to pick images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        await handleUpdateProfile(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  }, [handleUpdateProfile]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     
      <TouchableOpacity  onPress={pickImage} style={styles.profileHeader}>
         {user?.profilePic?.url ? 
          (<Image source={{ uri: user?.profilePic?.url }} style={styles.avatar}/>) 
          : <Image source={require('../../assets/images/profile.png')} style={styles.avatar} />
        }
        <Text style={styles.userName}>{currentUser.name}</Text>
        <Text style={styles.userEmail}>{currentUser.email}</Text>
        <>
          
        </>

      </TouchableOpacity>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.settingsSection}>
        {settingsItems.slice(0, 3).map((item, index) => (
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
        {settingsItems.slice(3).map((item, index) => (
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
            <MaterialIcons name="lock" size={20} color={colors.primary} />
          </View>
          <Text style={styles.settingsText}> Change Password</Text>
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

