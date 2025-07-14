import { useAuth } from '@/context/authContext';
import { useTheme } from '@/context/themeContext';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddPost from "../screens/addPost";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Search from "../screens/search";
import Settings from "../screens/settings";

type Tabs = "home" | "search" | "profile" | "settings" | "addPost";
const index = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<Tabs>("home")
  const {user} = useAuth();

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  headerContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.sectionBackgroundColor,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 15,
  },
  greetingText: {
    color: colors.subtext,
    fontSize: 14,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.text,
  },
  notificationIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
backgroundColor: colors.sectionBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderTopEndRadius: 10,
  },
  navButtonsContainer: {
    flexDirection: 'row',
    gap: 40,
    backgroundColor: colors.sectionBackgroundColor,
  },
  // Add this to your styles:

 navIcon: {
    marginBottom: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: '53%',
    marginLeft: -27,
    backgroundColor: colors.background,
    borderRadius: 40,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
     {activeTab === "home"  && <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://tse4.mm.bing.net/th/id/OIP.Gz62k7vTQNxqkz9Q6yE4NgHaHa?r=0&cb=thvnextc1&rs=1&pid=ImgDetMain&o=7&rm=3" }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greetingText}>Good morning</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
        </View>
        <View style={styles.notificationIcon}>
          <MaterialIcons name="notifications-none" size={24} color="black" />
        </View>
      </View>} 
     
      {activeTab === "home" && <Home />}
      {activeTab === "search" && <Search />}
      {activeTab === "profile" && <Profile />}
      {activeTab === "settings" && <Settings />}
      {activeTab === "addPost" && <AddPost />}
      

      {/* Bottom Navigation */}
  <View style={styles.bottomNavContainer}>
  <View style={styles.navButtonsContainer}>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => setActiveTab("home")}
    >
      <Ionicons
        name={activeTab === "home" ? "home" : "home-outline"}
        size={28}
        color={activeTab === "home" ? "#2563eb" : "#64748b"}
      />
      <Text
        style={[
          styles.navButtonText,
          { color: activeTab === "home" ? "#2563eb" : "#64748b", fontWeight: activeTab === "home" ? "bold" : "normal" },
        ]}
      >
        Home
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => setActiveTab("search")}
    >
      <MaterialIcons
        name={activeTab === "search" ? "search" : "search"}
        size={28}
        color={activeTab === "search" ? "#2563eb" : "#64748b"}
      />
      <Text
        style={[
          styles.navButtonText,
          { color: activeTab === "search" ? "#2563eb" : "#64748b", fontWeight: activeTab === "search" ? "bold" : "normal" },
        ]}
      >
        Search
      </Text>
    </TouchableOpacity>
  </View>

  <TouchableOpacity style={styles.addButton } onPress={() => setActiveTab("addPost")}>
    <MaterialIcons name="add-circle" size={54} color="#2563eb" />
  </TouchableOpacity>

  <View style={styles.navButtonsContainer}>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => setActiveTab("profile")}
    >
      <MaterialIcons
        name={activeTab === "profile" ? "person" : "person-outline"}
        size={28}
        color={activeTab === "profile" ? "#2563eb" : "#64748b"}
      />
      <Text
        style={[
          styles.navButtonText,
          { color: activeTab === "profile" ? "#2563eb" : "#64748b", fontWeight: activeTab === "profile" ? "bold" : "normal" },
        ]}
      >
        Portal
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => setActiveTab("settings")}
    >
      <Ionicons
        name={activeTab === "settings" ? "settings" : "settings-outline"}
        size={28}
        color={activeTab === "settings" ? "#2563eb" : "#64748b"}
      />
      <Text
        style={[
          styles.navButtonText,
          { color: activeTab === "settings" ? "#2563eb" : "#64748b", fontWeight: activeTab === "settings" ? "bold" : "normal" },
        ]}
      >
        Settings
      </Text>
    </TouchableOpacity>
  </View>
</View>


    </SafeAreaView>
  );
};

export default index;

