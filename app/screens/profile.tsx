import { useTheme } from '@/context/themeContext';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

const Profile = () => {
  const { colors } = useTheme();

  // Student data
  const studentInfo = {
    name: "Alex Johnson",
    studentId: "STU2024-001",
    program: "Computer Science",
    year: "3rd Year",
    gpa: 3.8,
    email: "nson@sevichitm.edu",
    phone: "+237 67895-4567",
    address: "chepelle obili, Campus City",
    enrollmentDate: "September 2022",
    expectedGraduation: "May 2026",
    advisor: "Dr. Sarah Mitchell",
    
   bannerImage: [
  "https://picsum.photos/800/200?random=1",
  "https://picsum.photos/800/200?random=2",
  "https://picsum.photos/800/200?random=3",
  "https://picsum.photos/800/200?random=4",
  "https://picsum.photos/800/200?random=5"
]
    
  };

//use timeout to make a carousel effect
  const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % studentInfo.bannerImage.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);


   
    
    

  // Portal data
  const portalStats = {
    announcements: 3,
    
    newResources: 5,
    coursesEnrolled: 6
  };

  const academicProgress = {
    completedCredits: 90,
    totalCredits: 120,
    currentSemesterCredits: 15,
    honors: ["Dean's List Fall 2023", "Academic Excellence Award"]
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
      flex: 1,
      backgroundColor: colors.background, 
      paddingBottom: 60,
      
    },
    bannerContainer: {
      position: 'relative',
      height: 200,
      marginBottom: 60,
      
    
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',

    },
    bannerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    profileCard: {
      position: 'absolute',
      top: 100,
      left: 20,
      right: 20,
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      padding: 20,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15,
      borderWidth: 4,
      borderColor: colors.primary,
    },
    profileInfo: {
      flex: 1,
    
    },
    studentName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    studentId: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: 2,
    },
    studentProgram: {
      fontSize: 14,
      color: colors.subtext,
      marginBottom: 2,
    },
    studentYear: {
      fontSize: 14,
      color: colors.subtext,
    },
    gpaContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: colors.primary,
      borderRadius: 25,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    gpaText: {
      color: colors.buttonText,
      fontSize: 14,
      fontWeight: 'bold',
    },
    studentDetails: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
      marginBottom: 8,
    },
    detailIcon: {
      marginRight: 8,
    },
    detailText: {
      fontSize: 12,
      color: colors.subtext,
      flex: 1,
    },
    scrollContent: {
      padding: 20,
      marginTop: 80,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
      marginTop: 20,
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
      fontWeight: '600',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: "center",
      gap: 10,
      marginBottom: 25,
    },
    statCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      width: '30%',
      alignItems: 'center',
      elevation: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 11,
      color: colors.subtext,
      textAlign: 'center',
      lineHeight: 14,
    },
    progressCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    progressTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    progressPercentage: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.background,
      borderRadius: 4,
      marginBottom: 15,
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 4,
    },
    progressDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    progressDetail: {
      alignItems: 'center',
    },
    progressDetailNumber: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    progressDetailLabel: {
      fontSize: 12,
      color: colors.subtext,
      marginTop: 2,
    },
    honorsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    honorBadge: {
      backgroundColor: `${colors.primary}20`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    honorText: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '500',
    },
    paymentCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 18,
      marginBottom: 15,
      elevation: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
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
      marginTop: 8,
    },
    paymentMethodText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.subtext,
    },
    paymentButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 15,
      marginTop: 12,
      alignItems: 'center',
    },
    paymentButtonText: {
      color: colors.buttonText,
      fontWeight: '600',
      fontSize: 16,
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
      borderRadius: 16,
      padding: 16,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    quickLinkIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    quickLinkText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    activityCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 18,
      marginBottom: 15,
      elevation: 3,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    activityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    activityIcon: {
      backgroundColor: `${colors.primary}20`,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
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
      fontWeight: '500',
    },
    activityTime: {
      fontSize: 13,
      color: colors.subtext,
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
  });

  const progressPercentage = (academicProgress.completedCredits / academicProgress.totalCredits) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner with Profile Card */}
      <View style={styles.bannerContainer}>
        <Image source={{ uri: studentInfo.bannerImage?.[currentIndex] }} style={styles.bannerImage} />
        <View style={styles.bannerOverlay} />
        
        <View style={styles.profileCard}>
          <View style={styles.gpaContainer}>
            <Text style={styles.gpaText}>GPA {studentInfo.gpa}</Text>
          </View>
          
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
          </View>
          
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Text style={styles.studentName}>{studentInfo.name}</Text>
              <Text style={styles.studentId}>{studentInfo.studentId}</Text>
              <Text style={styles.studentProgram}>{studentInfo.program}</Text>
              <Text style={styles.studentYear}>{studentInfo.year}</Text>
            </View>
          </View>
          
          <View style={styles.studentDetails}>
            <View style={styles.detailItem}>
              <MaterialIcons name="email" size={16} color={colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>{studentInfo.email}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="phone" size={16} color={colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>{studentInfo.phone}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="person" size={16} color={colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>Advisor: {studentInfo.advisor}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="calendar-today" size={16} color={colors.primary} style={styles.detailIcon} />
              <Text style={styles.detailText}>Grad: {studentInfo.expectedGraduation}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.scrollContent}>
        {/* Portal Stats */}
        <Text style={styles.sectionTitle}>Portal Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{portalStats.announcements}</Text>
            <Text style={styles.statLabel}>New Announcements</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{portalStats.newResources}</Text>
            <Text style={styles.statLabel}>New Resources</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{portalStats.coursesEnrolled}</Text>
            <Text style={styles.statLabel}>Courses Enrolled</Text>
          </View>
        </View>

        {/* Academic Progress */}
        <Text style={styles.sectionTitle}>Academic Progress</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Degree Progress</Text>
            <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}%</Text>
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          
          <View style={styles.progressDetails}>
            <View style={styles.progressDetail}>
              <Text style={styles.progressDetailNumber}>{academicProgress.completedCredits}</Text>
              <Text style={styles.progressDetailLabel}>Completed</Text>
            </View>
            <View style={styles.progressDetail}>
              <Text style={styles.progressDetailNumber}>{academicProgress.currentSemesterCredits}</Text>
              <Text style={styles.progressDetailLabel}>Current Semester</Text>
            </View>
            <View style={styles.progressDetail}>
              <Text style={styles.progressDetailNumber}>{academicProgress.totalCredits - academicProgress.completedCredits}</Text>
              <Text style={styles.progressDetailLabel}>Remaining</Text>
            </View>
          </View>
          
          <View style={styles.honorsContainer}>
            {academicProgress.honors.map((honor, index) => (
              <View key={index} style={styles.honorBadge}>
                <Text style={styles.honorText}>{honor}</Text>
              </View>
            ))}
          </View>
        </View>

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
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Make Payment</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.quickLinksContainer}>
          {quickLinks.map(link => (
            <TouchableOpacity key={link.id} style={styles.quickLink}>
              <View style={[styles.quickLinkIcon, { backgroundColor: `${link.color}20` }]}>
                <MaterialIcons name={link.icon as any} size={22} color={link.color} />
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
              <View style={styles.activityIcon}>
                <MaterialIcons 
                  name={activity.icon as any} 
                  size={18} 
                  color={colors.primary} 
                />
              </View>
              <Text style={styles.activityTitle}>{activity.title}</Text>
            </View>
            <View style={styles.activityMeta}>
              <Text style={styles.activityCourse}>{activity.course}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

       
      </View>
    </ScrollView>
  );
};

export default Profile;