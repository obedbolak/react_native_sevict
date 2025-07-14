// Updated Settings Component
import { useAuth } from '@/context/authContext';
import { useTheme } from '@/context/themeContext';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const { toggleTheme, colors, isDarkMode } = useTheme();
  const { logout, user } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const styles = StyleSheet.create({
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
    settingsIcon: {
      width: 30,
      alignItems: 'center',
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: defaultUser.avatar }} style={styles.avatar} />
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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>TechFuture Academy v1.2.0</Text>
    </ScrollView>
  );
};

export default Settings;