import { useAuth } from '@/context/authContext';
import { useTheme } from '@/context/themeContext';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddPost from "../screens/addPost";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Search from "../screens/search";
import Settings from "../screens/settings";

type Tabs = "home" | "search" | "profile" | "settings" | "addPost";

const createStyles = (colors: any, insets: any, height: number, width: number) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 5,
    },
    contentContainer: {
      flex: 1,
      paddingBottom: 50 + insets.bottom,
    },
    headerContainer: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingTop: insets.top > 0 ? 10 : 0,
      backgroundColor: colors.sectionBackgroundColor,
      borderRadius: 10,
      marginBottom: 1,
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
      height: height * 0.06,
      width: width * 0.13,
      borderRadius: 55,
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
      paddingBottom: Math.max(insets.bottom, 10),
      backgroundColor: colors.sectionBackgroundColor,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    },
    navButtonsContainer: {
      flexDirection: 'row',
      gap: width * 0.1,
      backgroundColor: colors.sectionBackgroundColor,
    },
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
      bottom: 10 + Math.max(insets.bottom, 10),
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
    safeAreaTop: {
      height: insets.top,
      backgroundColor: colors.background,
    },
    safeAreaBottom: {
      height: insets.bottom,
      backgroundColor: colors.sectionBackgroundColor,
    },
    screenWrapper: {
      flex: 1,
      paddingHorizontal: Math.max(insets.left, 10),
      paddingRight: Math.max(insets.right, 10),
    },
  });

const NavButton = React.memo(({
  iconName,
  activeIconName,
  label,
  isActive,
  onPress,
  IconComponent
}: {
  iconName: string;
  activeIconName?: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
  IconComponent: React.ComponentType<any>;
}) => {
  const activeColor = "#2563eb";
  const inactiveColor = "#64748b";
  
  return (
    <TouchableOpacity style={{
      alignItems: 'center',
    }} onPress={onPress}>
      <IconComponent
        name={isActive ? (activeIconName || iconName) : iconName}
        size={28}
        color={isActive ? activeColor : inactiveColor}
      />
      <Text
        style={[
          {
      fontSize: 12,
      marginTop: 5,
    },
          { 
            color: isActive ? activeColor : inactiveColor, 
            fontWeight: isActive ? "bold" : "normal" 
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
});

const ScreenContent = React.memo(({ activeTab }: { activeTab: Tabs }) => {
  switch (activeTab) {
    case "home": return <Home />;
    case "search": return <Search />;
    case "profile": return <Profile />;
    case "settings": return <Settings />;
    case "addPost": return <AddPost />;
    default: return <Home />;
  }
});

const Index = React.memo(() => {
  const { width, height } = useMemo(() => Dimensions.get('window'), []);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tabs>("home");
  const { user } = useAuth();
  
  const styles = useMemo(() => 
    createStyles(colors, insets, height, width),
    [colors, insets, height, width]
  );
  
  const setTabHome = useCallback(() => setActiveTab("home"), []);
  const setTabSearch = useCallback(() => setActiveTab("search"), []);
  const setTabProfile = useCallback(() => setActiveTab("profile"), []);
  const setTabSettings = useCallback(() => setActiveTab("settings"), []);
  const setTabAddPost = useCallback(() => setActiveTab("addPost"), []);

  return (
    <View style={styles.container}>
      {insets.top > 0 && <View style={styles.safeAreaTop} />}
      
      <View style={styles.contentContainer}>
        {activeTab === "home" && (
          <View style={styles.headerContainer}>
            <View style={styles.profileContainer}>
             {user?.profilePic?.url ? 
  (<Image source={{ uri: user?.profilePic?.url }} style={styles.profileImage}/>) 
  : <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
}
              <View>
                <Text style={styles.greetingText}>
                  {new Date().getHours() < 12 
                    ? "Good Morning" 
                    : new Date().getHours() < 18 
                      ? "Good Afternoon" 
                      : "Good Evening"}
                </Text>
                <Text style={styles.userName}>{user?.name}</Text>
              </View>
            </View>
            <View style={styles.notificationIcon}>
              <MaterialIcons name="notifications-none" size={24} color="black" />
            </View>
          </View>
        )}

        <View style={styles.screenWrapper}>
          <ScreenContent activeTab={activeTab} />
        </View>
        
      </View>

      <View style={styles.bottomNavContainer}>
        <View style={styles.navButtonsContainer}>
          <NavButton
            iconName="home-outline"
            activeIconName="home"
            label="Home"
            isActive={activeTab === "home"}
            onPress={setTabHome}
            IconComponent={Ionicons}
          />
          <NavButton
            iconName="search"
            label="Search"
            isActive={activeTab === "search"}
            onPress={setTabSearch}
            IconComponent={MaterialIcons}
          />
        </View>







       



















        <TouchableOpacity style={styles.addButton} onPress={setTabAddPost}>
          <MaterialIcons name="add-circle" size={54} color="#2563eb" />
        </TouchableOpacity>

        <View style={styles.navButtonsContainer}>
          <NavButton
            iconName="person-outline"
            activeIconName="person"
            label="Portal"
            isActive={activeTab === "profile"}
            onPress={setTabProfile}
            IconComponent={MaterialIcons}
          />
          <NavButton
            iconName="settings-outline"
            activeIconName="settings"
            label="Settings"
            isActive={activeTab === "settings"}
            onPress={setTabSettings}
            IconComponent={Ionicons}
          />
        </View>
      </View>
    </View>
  );
});

export default Index;