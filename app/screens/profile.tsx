import { useTheme } from '@/context/themeContext';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const { colors } = useTheme();

  // Portal data
  const portalStats = {
    announcements: 3,
    upcomingDeadlines: 2,
    newResources: 5,
  };

  const paymentDetails = {
    balance: 1250.50,
    dueDate: '2023-12-15',
    recentPayments: [
      { id: 1, amount: 500.00, date: '2023-11-01', method: 'Credit Card' },
      { id: 2, amount: 750.50, date: '2023-10-01', method: 'Bank Transfer' },
    ],
    upcomingPayments: [
      { id: 1, amount: 625.25, dueDate: '2023-12-15', description: 'Tuition Fee' },
      { id: 2, amount: 150.00, dueDate: '2024-01-05', description: 'Lab Fees' },
    ]
  };

  const quickLinks = [
    { id: 1, name: "Course Catalog", icon: "book", color: "#4CAF50" },
    { id: 2, name: "Academic Calendar", icon: "calendar", color: "#2196F3" },
    { id: 3, name: "Library", icon: "library", color: "#9C27B0" },
    { id: 4, name: "Tech Support", icon: "support", color: "#FF9800" },
    { id: 5, name: "Campus Map", icon: "map", color: "#607D8B" },
    { id: 6, name: "Feedback", icon: "feedback", color: "#E91E63" },
  ];

  const recentActivities = [
    { id: 1, title: "Submitted Assignment 3", course: "Data Structures", time: "2 hours ago", icon: "assignment" },
    { id: 2, title: "New grade posted", course: "Web Development", time: "1 day ago", icon: "grade" },
    { id: 3, title: "Announcement: Holiday", course: "All Courses", time: "3 days ago", icon: "announcement" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: colors.background,
      padding: 20,
      marginBottom: 60,
    },
    portalHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 25,
      paddingVertical: 15,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      elevation: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    portalTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 5,
    },
    portalSubtitle: {
      fontSize: 18,
      color: colors.subtext,
      textAlign: 'center',
      paddingHorizontal: 30,
    },
    notificationIcon: {
      position: 'absolute',
      right: 20,
      top: 20,
    },
    portalStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    statCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 15,
      width: '30%',
      alignItems: 'center',
      elevation: 2,
    },
    statNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 12,
      color: colors.subtext,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
      marginTop: 10,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    viewAllText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    paymentCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      elevation: 2,
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    paymentLabel: {
      fontSize: 14,
      color: colors.subtext,
    },
    paymentValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    paymentAmount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    positiveAmount: {
      color: '#4CAF50',
    },
    negativeAmount: {
      color: '#F44336',
    },
    paymentDue: {
      color: '#FF9800',
    },
    paymentMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    paymentMethodText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.subtext,
    },
    quickLinksContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    quickLink: {
      width: '48%',
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
    },
    quickLinkIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    quickLinkText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      flex: 1,
    },
    activityCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      elevation: 2,
    },
    activityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    activityIcon: {
      marginRight: 10,
    },
    activityTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    activityMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    activityCourse: {
      fontSize: 13,
      color: colors.subtext,
    },
    activityTime: {
      fontSize: 13,
      color: colors.subtext,
    },
    darkModeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 15,
      marginBottom: 25,
      elevation: 2,
    },
    darkModeText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginLeft: 12,
      flex: 1,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Portal Header with Title */}
      <View style={styles.portalHeader}>
        <Text style={styles.portalTitle}>Software Engineer</Text>
        <Text style={styles.portalSubtitle}>Building innovative solutions through code and creativity</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <MaterialIcons name="notifications" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      

      {/* Portal Stats */}
      <Text style={styles.sectionTitle}>Portal Overview</Text>
      <View style={styles.portalStats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{portalStats.announcements}</Text>
          <Text style={styles.statLabel}>New Announcements</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{portalStats.upcomingDeadlines}</Text>
          <Text style={styles.statLabel}>Upcoming Deadlines</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{portalStats.newResources}</Text>
          <Text style={styles.statLabel}>New Resources</Text>
        </View>
      </View>

      {/* Quick Links */}
      <Text style={styles.sectionTitle}>Quick Links</Text>
      <View style={styles.quickLinksContainer}>
        {quickLinks.map(link => (
          <TouchableOpacity key={link.id} style={styles.quickLink}>
            <View style={[styles.quickLinkIcon, { backgroundColor: `${link.color}20` }]}>
              <MaterialIcons name={link.icon as any} size={20} color={link.color} />
            </View>
            <Text style={styles.quickLinkText}>{link.name}</Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.subtext} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activities */}
      <Text style={styles.sectionTitle}>Recent Activities</Text>
      {recentActivities.map(activity => (
        <TouchableOpacity key={activity.id} style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <MaterialIcons 
              name={activity.icon as any} 
              size={20} 
              color={colors.primary} 
              style={styles.activityIcon} 
            />
            <Text style={styles.activityTitle}>{activity.title}</Text>
          </View>
          <View style={styles.activityMeta}>
            <Text style={styles.activityCourse}>{activity.course}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Portal Settings */}
      <Text style={styles.sectionTitle}>Portal Settings</Text>
      <TouchableOpacity style={styles.darkModeToggle}>
        <MaterialCommunityIcons 
          name="theme-light-dark" 
          size={24} 
          color={colors.primary} 
        />
        <Text style={styles.darkModeText}>Dark Mode</Text>
        <FontAwesome name="toggle-off" size={28} color={colors.subtext} />
      </TouchableOpacity>
      {/* Payment Summary */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.paymentCard}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Current Balance:</Text>
          <Text style={[styles.paymentValue, styles.negativeAmount]}>
            -${paymentDetails.balance.toFixed(2)}
          </Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Next Payment Due:</Text>
          <Text style={[styles.paymentValue, styles.paymentDue]}>
            {paymentDetails.dueDate}
          </Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor: colors.primary,
          borderRadius: 8,
          padding: 12,
          marginTop: 10,
          alignItems: 'center'
        }}>
          <Text style={{
            color: colors.buttonText,
            fontWeight: '600',
            fontSize: 16
          }}>Make Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Payments */}
      <Text style={styles.sectionTitle}>Upcoming Payments</Text>
      {paymentDetails.upcomingPayments.map(payment => (
        <View key={payment.id} style={styles.paymentCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>{payment.description}</Text>
            <Text style={[styles.paymentValue, styles.negativeAmount]}>
              -${payment.amount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Due Date:</Text>
            <Text style={[styles.paymentValue, styles.paymentDue]}>
              {payment.dueDate}
            </Text>
          </View>
        </View>
      ))}

      {/* Recent Payments */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Payments</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {paymentDetails.recentPayments.map(payment => (
        <View key={payment.id} style={styles.paymentCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Amount Paid:</Text>
            <Text style={[styles.paymentValue, styles.positiveAmount]}>
              +${payment.amount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Date:</Text>
            <Text style={styles.paymentValue}>{payment.date}</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Ionicons name={payment.method === 'Credit Card' ? 'card' : 'cash'} 
                     size={16} 
                     color={colors.subtext} />
            <Text style={styles.paymentMethodText}>{payment.method}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Profile;