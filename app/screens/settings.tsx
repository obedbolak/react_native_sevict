import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';


const Settings = () => {

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const settingsItems = [
    {
      icon: 'notifications',
      name: 'Notifications',
      component: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#e9ecef', true: '#3a86ff' }}
        />
      ),
    },
    {
      icon: 'moon',
      name: 'Dark Mode',
      component: (
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: '#e9ecef', true: '#3a86ff' }}
        />
      ),
    },
    {
      icon: 'lock',
      name: 'Change Password',
      component: <MaterialIcons name="chevron-right" size={24} color="#adb5bd" />,
    },
    {
      icon: 'language',
      name: 'Language',
      component: <Text style={styles.settingsValue}>English</Text>,
    },
    {
      icon: 'help-circle',
      name: 'Help Center',
      component: <MaterialIcons name="chevron-right" size={24} color="#adb5bd" />,
    },
    {
      icon: 'file-text',
      name: 'Terms & Privacy',
      component: <MaterialIcons name="chevron-right" size={24} color="#adb5bd" />,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.settingsSection}>
        {settingsItems.slice(0, 4).map((item, index) => (
          <TouchableOpacity key={index} style={styles.settingsItem}>
            <View style={styles.settingsIcon}>
              {/* Use the correct icon set for each icon */}
              {item.icon === 'notifications' || item.icon === 'lock' || item.icon === 'language' ? (
                <MaterialIcons name={item.icon as any} size={20} color="#3a86ff" />
              ) : item.icon === 'moon' ? (
                <Feather name="moon" size={20} color="#3a86ff" />
              ) : (
                <Feather name={item.icon as any} size={20} color="#3a86ff" />
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
              <Feather name={item.icon as any} size={20} color="#3a86ff" />
            </View>
            <Text style={styles.settingsName}>{item.name}</Text>
            <View style={styles.settingsAction}>
              {item.component}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => {
        router.replace("/(auth)");
         /* Add logout functionality */ }}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>TechFuture Academy v1.2.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  settingsIcon: {
    width: 30,
    alignItems: 'center',
  },
  settingsName: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
    marginLeft: 10,
  },
  settingsAction: {
    marginLeft: 10,
  },
  settingsValue: {
    fontSize: 14,
    color: '#adb5bd',
  },
  logoutButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  logoutText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    color: '#adb5bd',
    marginTop: 30,
    marginBottom: 20,
  },
});

export default Settings;