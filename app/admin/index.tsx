import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { content, StatCard, stats, users } from "../../db/userDataadmin";

const { width } = Dimensions.get("window");

export default function AdminDashboard() {
  const { colors, isDarkMode } = useTheme();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "content" | "analytics" | "settings"
  >("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitle: {
          fontSize: 24,
          fontWeight: "700",
          color: colors.text,
        },
        headerActions: {
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        },
        actionButton: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.primary + "10",
          justifyContent: "center",
          alignItems: "center",
        },
        tabContainer: {
          flexDirection: "row",
          backgroundColor: colors.cardBackground,
          paddingHorizontal: 1,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        tab: {
          paddingHorizontal: 7,
          paddingVertical: 8,
          marginRight: 8,
          borderRadius: 20,
          backgroundColor: "transparent",
        },
        activeTab: {
          backgroundColor: colors.primary,
        },
        tabText: {
          fontSize: 14,
          fontWeight: "500",
          color: colors.subtext,
        },
        activeTabText: {
          color: colors.background,
        },
        content: {
          flex: 1,
          padding: 20,
        },
        statsContainer: {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
        },
        statCard: {
          flex: 1,
          minWidth: (width - 56) / 2,
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        },
        statHeader: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        },
        statTitle: {
          fontSize: 14,
          color: colors.subtext,
          fontWeight: "500",
        },
        statIconContainer: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: colors.primary + "15",
          justifyContent: "center",
          alignItems: "center",
        },
        statValue: {
          fontSize: 24,
          fontWeight: "700",
          color: colors.text,
          marginBottom: 4,
        },
        statChange: {
          fontSize: 12,
          fontWeight: "500",
        },
        positiveChange: {
          color: "#10B981",
        },
        negativeChange: {
          color: "#EF4444",
        },
        neutralChange: {
          color: colors.subtext,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: "600",
          color: colors.text,
          marginBottom: 16,
        },
        card: {
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.border,
        },
        searchContainer: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.background,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.border,
        },
        searchInput: {
          flex: 1,
          marginLeft: 8,
          fontSize: 16,
          color: colors.text,
        },
        userItem: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        checkbox: {
          width: 20,
          height: 20,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: colors.border,
          marginRight: 12,
          justifyContent: "center",
          alignItems: "center",
        },
        checkedCheckbox: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        avatar: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.primary + "20",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        },
        avatarText: {
          fontSize: 16,
          fontWeight: "600",
          color: colors.primary,
        },
        userInfo: {
          flex: 1,
        },
        userName: {
          fontSize: 16,
          fontWeight: "600",
          color: colors.text,
        },
        userEmail: {
          fontSize: 14,
          color: colors.subtext,
        },
        userMeta: {
          alignItems: "flex-end",
        },
        roleChip: {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          marginBottom: 4,
        },
        studentChip: {
          backgroundColor: "#3B82F6" + "20",
        },
        instructorChip: {
          backgroundColor: "#10B981" + "20",
        },
        adminChip: {
          backgroundColor: "#F59E0B" + "20",
        },
        roleText: {
          fontSize: 12,
          fontWeight: "500",
          textTransform: "capitalize",
        },
        studentText: {
          color: "#3B82F6",
        },
        instructorText: {
          color: "#10B981",
        },
        adminText: {
          color: "#F59E0B",
        },
        statusDot: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginLeft: 8,
        },
        activeStatus: {
          backgroundColor: "#10B981",
        },
        inactiveStatus: {
          backgroundColor: "#6B7280",
        },
        suspendedStatus: {
          backgroundColor: "#EF4444",
        },
        actionBar: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        },
        selectedCount: {
          fontSize: 14,
          color: colors.subtext,
        },
        actionButtons: {
          flexDirection: "row",
          gap: 8,
        },
        actionBtn: {
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
          borderWidth: 1,
        },
        primaryBtn: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        dangerBtn: {
          backgroundColor: "#EF4444" + "10",
          borderColor: "#EF4444",
        },
        btnText: {
          fontSize: 12,
          fontWeight: "500",
        },
        primaryBtnText: {
          color: colors.background,
        },
        dangerBtnText: {
          color: "#EF4444",
        },
        contentItem: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        contentIcon: {
          width: 40,
          height: 40,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        },
        courseIcon: {
          backgroundColor: "#3B82F6" + "20",
        },
        postIcon: {
          backgroundColor: "#10B981" + "20",
        },
        announcementIcon: {
          backgroundColor: "#F59E0B" + "20",
        },
        contentInfo: {
          flex: 1,
        },
        contentTitle: {
          fontSize: 16,
          fontWeight: "600",
          color: colors.text,
        },
        contentMeta: {
          fontSize: 14,
          color: colors.subtext,
        },
        contentStats: {
          alignItems: "flex-end",
        },
        viewCount: {
          fontSize: 14,
          fontWeight: "500",
          color: colors.text,
        },
        settingsSection: {
          marginBottom: 24,
        },
        settingItem: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        settingInfo: {
          flex: 1,
        },
        settingTitle: {
          fontSize: 16,
          fontWeight: "500",
          color: colors.text,
        },
        settingDescription: {
          fontSize: 14,
          color: colors.subtext,
          marginTop: 2,
        },
      }),
    [colors, width]
  );

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: "dashboard" },
    { key: "users" as const, label: "Users", icon: "people" },
    { key: "content" as const, label: "Content", icon: "library-books" },
    { key: "analytics" as const, label: "Analytics", icon: "analytics" },
    { key: "settings" as const, label: "Settings", icon: "settings" },
  ];

  const renderIcon = (
    iconName: string,
    iconFamily: string,
    size: number = 20,
    color: string = colors.primary
  ) => {
    switch (iconFamily) {
      case "MaterialIcons":
        return (
          <MaterialIcons name={iconName as any} size={size} color={color} />
        );
      case "Feather":
        return <Feather name={iconName as any} size={size} color={color} />;
      case "Ionicons":
        return <Ionicons name={iconName as any} size={size} color={color} />;
      default:
        return (
          <MaterialIcons name={iconName as any} size={size} color={color} />
        );
    }
  };

  const toggleUserSelection = useCallback((userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const selectAllUsers = useCallback(() => {
    setSelectedUsers(
      selectedUsers.length === users.length ? [] : users.map((u) => u.id)
    );
  }, [selectedUsers.length, users.length]);

  const renderStatCard = (stat: StatCard, index: number) => (
    <View key={index} style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{stat.title}</Text>
        <View style={styles.statIconContainer}>
          {renderIcon(stat.icon, stat.iconFamily, 16)}
        </View>
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text
        style={[
          styles.statChange,
          stat.changeType === "positive"
            ? styles.positiveChange
            : stat.changeType === "negative"
            ? styles.negativeChange
            : styles.neutralChange,
        ]}
      >
        {stat.change} from last month
      </Text>
    </View>
  );

  const renderOverview = () => (
    <View>
      <View style={styles.statsContainer}>{stats.map(renderStatCard)}</View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.card}>
        <View style={styles.userItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              John Doe enrolled in React Native Course
            </Text>
            <Text style={styles.userEmail}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.userItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SS</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              Sarah Smith published new course
            </Text>
            <Text style={styles.userEmail}>5 hours ago</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderUsers = () => (
    <View>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={colors.subtext} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor={colors.subtext}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {selectedUsers.length > 0 && (
        <View style={styles.actionBar}>
          <Text style={styles.selectedCount}>
            {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}{" "}
            selected
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionBtn, styles.primaryBtn]}>
              <Text style={[styles.btnText, styles.primaryBtnText]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.dangerBtn]}>
              <Text style={[styles.btnText, styles.dangerBtnText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.card}>
        <TouchableOpacity style={styles.userItem} onPress={selectAllUsers}>
          <View
            style={[
              styles.checkbox,
              selectedUsers.length === users.length && styles.checkedCheckbox,
            ]}
          >
            {selectedUsers.length === users.length && (
              <MaterialIcons name="check" size={16} color={colors.background} />
            )}
          </View>
          <Text style={styles.userName}>Select All</Text>
        </TouchableOpacity>

        {users
          .filter(
            (user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.userItem}
              onPress={() => toggleUserSelection(user.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedUsers.includes(user.id) && styles.checkedCheckbox,
                ]}
              >
                {selectedUsers.includes(user.id) && (
                  <MaterialIcons
                    name="check"
                    size={16}
                    color={colors.background}
                  />
                )}
              </View>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
              <View style={styles.userMeta}>
                <View
                  style={[
                    styles.roleChip,
                    user.role === "student"
                      ? styles.studentChip
                      : user.role === "instructor"
                      ? styles.instructorChip
                      : styles.adminChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.roleText,
                      user.role === "student"
                        ? styles.studentText
                        : user.role === "instructor"
                        ? styles.instructorText
                        : styles.adminText,
                    ]}
                  >
                    {user.role}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.userEmail}>{user.lastActive}</Text>
                  <View
                    style={[
                      styles.statusDot,
                      user.status === "active"
                        ? styles.activeStatus
                        : user.status === "inactive"
                        ? styles.inactiveStatus
                        : styles.suspendedStatus,
                    ]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );

  const renderContent = () => (
    <View>
      <Text style={styles.sectionTitle}>Content Management</Text>
      <View style={styles.card}>
        {content.map((item) => (
          <View key={item.id} style={styles.contentItem}>
            <View
              style={[
                styles.contentIcon,
                item.type === "course"
                  ? styles.courseIcon
                  : item.type === "post"
                  ? styles.postIcon
                  : styles.announcementIcon,
              ]}
            >
              {renderIcon(
                item.type === "course"
                  ? "book"
                  : item.type === "post"
                  ? "file-text"
                  : "megaphone",
                "Feather",
                20,
                item.type === "course"
                  ? "#3B82F6"
                  : item.type === "post"
                  ? "#10B981"
                  : "#F59E0B"
              )}
            </View>
            <View style={styles.contentInfo}>
              <Text style={styles.contentTitle}>{item.title}</Text>
              <Text style={styles.contentMeta}>
                by {item.author} • {item.type} • {item.createdAt}
              </Text>
            </View>
            <View style={styles.contentStats}>
              <Text style={styles.viewCount}>{item.views} views</Text>
              <View
                style={[
                  styles.roleChip,
                  item.status === "published"
                    ? styles.instructorChip
                    : item.status === "draft"
                    ? styles.studentChip
                    : styles.adminChip,
                ]}
              >
                <Text
                  style={[
                    styles.roleText,
                    item.status === "published"
                      ? styles.instructorText
                      : item.status === "draft"
                      ? styles.studentText
                      : styles.adminText,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAnalytics = () => (
    <View>
      <Text style={styles.sectionTitle}>Analytics Overview</Text>
      <View style={styles.card}>
        <Text style={styles.userName}>User Engagement</Text>
        <Text style={styles.userEmail}>Daily active users: 1,247</Text>
        <Text style={styles.userEmail}>Weekly retention: 68%</Text>
        <Text style={styles.userEmail}>Monthly growth: +23%</Text>
      </View>

      <Text style={styles.sectionTitle}>Course Performance</Text>
      <View style={styles.card}>
        <Text style={styles.userName}>Top Performing Courses</Text>
        <Text style={styles.userEmail}>
          1. React Native Fundamentals - 847 enrollments
        </Text>
        <Text style={styles.userEmail}>
          2. JavaScript Advanced - 623 enrollments
        </Text>
        <Text style={styles.userEmail}>3. UI/UX Design - 441 enrollments</Text>
      </View>
    </View>
  );

  const renderSettings = () => (
    <View>
      <Text style={styles.sectionTitle}>System Settings</Text>

      <View style={styles.settingsSection}>
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Maintenance Mode</Text>
              <Text style={styles.settingDescription}>
                Enable maintenance mode for system updates
              </Text>
            </View>
            <Switch
              value={false}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>User Registration</Text>
              <Text style={styles.settingDescription}>
                Allow new users to register
              </Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Email Notifications</Text>
              <Text style={styles.settingDescription}>
                Send system notifications via email
              </Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Security</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
            <Text style={styles.settingDescription}>
              Require 2FA for admin accounts
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={colors.subtext}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomWidth: 0 }]}
        >
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Session Management</Text>
            <Text style={styles.settingDescription}>
              Manage active user sessions
            </Text>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={20}
            color={colors.subtext}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.settingItem,
          {
            justifyContent: "center",
            gap: 10,
            borderTopWidth: 1,
            borderColor: colors.border,
          },
        ]}
        onPress={() => handleLogout()}
      >
        <Text style={styles.settingTitle}>Logout</Text>

        <MaterialIcons name="logout" size={20} color={colors.subtext} />
      </TouchableOpacity>
    </View>
  );

  const renderContent_Tab = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "users":
        return renderUsers();
      case "content":
        return renderContent();
      case "analytics":
        return renderAnalytics();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons
              name="notifications"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons
              name="account-circle"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && { color: colors.tabTextActive },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderContent_Tab()}
      </ScrollView>
    </SafeAreaView>
  );
}
