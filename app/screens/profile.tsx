import { useTheme } from '@/context/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const { colors } = useTheme();

  // Student data
  const studentInfo = {
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

  // Carousel effect
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % studentInfo.bannerImage.length);
    }, 5000);
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
    { id: 1, name: "Course Catalog", icon: "book-open-variant", color: colors.primary, bgColor: `${colors.primary}15` },
    { id: 2, name: "Academic Calendar", icon: "calendar-check", color: colors.success, bgColor: `${colors.success}15` },
    { id: 3, name: "Library", icon: "library", color: colors.primary, bgColor: `${colors.primary}15` },
    { id: 4, name: "Tech Support", icon: "headset", color: colors.link, bgColor: `${colors.link}15` },
    { id: 5, name: "Campus Map", icon: "map-marker", color: colors.success, bgColor: `${colors.success}15` },
    { id: 6, name: "Feedback", icon: "message-text", color: colors.primary, bgColor: `${colors.primary}15` },
  ];

  const recentActivities = [
    { id: 1, title: "Submitted Assignment 3", course: "Data Structures", time: "2 hours ago", icon: "check-circle", color: colors.success },
    { id: 2, title: "New grade posted", course: "Web Development", time: "1 day ago", icon: "star-circle", color: colors.primary },
    { id: 3, title: "Announcement: Holiday", course: "All Courses", time: "3 days ago", icon: "bullhorn", color: colors.warning },
  ];

  const progressPercentage = (academicProgress.completedCredits / academicProgress.totalCredits) * 100;

  // Fixed StyleSheet for Profile Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 60,
  },
  
  // Banner Section
  bannerSection: {
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
    backgroundColor: 'rgba(58, 134, 255, 0.3)',
  },
  
  // Profile Card - Fixed positioning and margins
  profileCard: {
    position: 'absolute',
    top: 100,
    left: 16,
    right: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 20,
    elevation: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
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
  
  // Status Indicators - Fixed positioning
  statusContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gpaContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpaIcon: {
    marginRight: 4,
  },
  gpaText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  notificationBadge: {
    backgroundColor: colors.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  
  // Student Details - Fixed grid layout
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Changed from flex-start
    marginTop: 12,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Ensures exactly 2 items per row
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 8, // Increased padding
    paddingVertical: 10,
    minHeight: 50, // Added minimum height for consistency
  },
  detailIcon: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  detailText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap', // Allow text to wrap
  },
  
  // Content Section - Fixed margin
  contentSection: {
    
    paddingTop: 30, // Reduced from 25
    marginTop: 90, // Reduced from 80
  },
  
  // Section Headers
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}15`,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  
  // Stats Container - Fixed equal spacing
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch', // Added to ensure equal height
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center', // Added for vertical centering
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100, // Added minimum height
  },
  statIcon: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.subtext,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 14,
  },
  
  // Progress Card - No changes needed
  progressCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTitleIcon: {
    marginRight: 8,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarContainer: {
    backgroundColor: colors.border,
    borderRadius: 8,
    height: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: colors.primary,
    height: '100%',
    borderRadius: 8,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  progressDetail: {
    alignItems: 'center',
  },
  progressDetailNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  progressDetailLabel: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 2,
    fontWeight: '500',
  },
  honorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  honorBadge: {
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  honorText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  
  // Payment Card - No changes needed
  paymentCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#FFE6E6',
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentHeaderIcon: {
    backgroundColor: '#FFE6E6',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: colors.subtext,
    fontWeight: '500',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  negativeAmount: {
    color: colors.error,
  },
  paymentDue: {
    color: colors.warning,
  },
  paymentButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  paymentButtonIcon: {
    marginRight: 8,
  },
  paymentButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  
  // Quick Links Grid - MAJOR FIXES
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Changed from default
    gap: 12,
  },
  quickLink: {
    width: '48%', // Fixed width for consistent 2-column layout
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 12, // Increased padding
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 60, // Added minimum height
    flexDirection: 'row', // Keep row direction
    alignItems: 'center',
    justifyContent: 'space-between', // Space between content and arrow
  },
  quickLinkContent: { // NEW: Container for icon and text
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickLinkIcon: {
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  quickLinkText: {
    fontSize: 13, // Reduced font size
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    flexWrap: 'wrap', // Allow text wrapping
  },
  quickLinkArrow: {
    backgroundColor: colors.border,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8, // Added margin
  },
  
  // Activity Cards - Minor fixes
  activityCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityIcon: {
    borderRadius: 16,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityCourse: {
    fontSize: 13,
    color: colors.subtext,
    fontWeight: '500',
    flex: 1, // Added to prevent text overflow
  },
  activityTime: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8, // Added margin
  },
});
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner Section */}
      <View style={styles.bannerSection}>
        <Image source={{ uri: studentInfo.bannerImage?.[currentIndex] }} style={styles.bannerImage} />
        <View style={styles.bannerOverlay} />
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Status Indicators */}
          <View style={styles.statusContainer}>
            <View style={styles.gpaContainer}>
              <MaterialCommunityIcons name="school" size={14} color="white" style={styles.gpaIcon} />
              <Text style={styles.gpaText}>GPA {studentInfo.gpa}</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>5</Text>
            </View>
          </View>
          
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Text style={styles.studentId}>{studentInfo.studentId}</Text>
              <Text style={styles.studentProgram}>{studentInfo.program}</Text>
              <Text style={styles.studentYear}>{studentInfo.year}</Text>
            </View>
          </View>
          
          {/* Student Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MaterialCommunityIcons name="email" size={16} color="#25D366" />
              </View>
              <Text style={styles.detailText}>{studentInfo.email}</Text>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MaterialCommunityIcons name="phone" size={16} color="#25D366" />
              </View>
              <Text style={styles.detailText}>{studentInfo.phone}</Text>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MaterialCommunityIcons name="account-tie" size={16} color="#25D366" />
              </View>
              <Text style={styles.detailText}>Advisor: {studentInfo.advisor}</Text>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MaterialCommunityIcons name="calendar-today" size={16} color="#25D366" />
              </View>
              <Text style={styles.detailText}>Grad: {studentInfo.expectedGraduation}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Portal Overview */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Portal Overview</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <MaterialCommunityIcons name="bullhorn" size={20} color={colors.primary} />
              </View>
              <Text style={styles.statNumber}>{portalStats.announcements}</Text>
              <Text style={styles.statLabel}>New Announcements</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <MaterialCommunityIcons name="book-open-variant" size={20} color={colors.primary} />
              </View>
              <Text style={styles.statNumber}>{portalStats.newResources}</Text>
              <Text style={styles.statLabel}>New Resources</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <MaterialCommunityIcons name="school" size={20} color={colors.primary} />
              </View>
              <Text style={styles.statNumber}>{portalStats.coursesEnrolled}</Text>
              <Text style={styles.statLabel}>Courses Enrolled</Text>
            </View>
          </View>
        </View>

        {/* Academic Progress */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Academic Progress</Text>
          </View>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressTitle}>
                <MaterialCommunityIcons name="trophy" size={20} color={colors.primary} style={styles.progressTitleIcon} />
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>Degree Progress</Text>
              </View>
              <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}%</Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
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
                  <MaterialCommunityIcons name="medal" size={14} color={colors.primary} />
                  <Text style={styles.honorText}>{honor}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Summary</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color="#25D366" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <View style={styles.paymentHeaderIcon}>
                <MaterialCommunityIcons name="credit-card" size={18} color="#FF3B30" />
              </View>
              <Text style={styles.paymentHeaderText}>Current Balance</Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Outstanding Balance:</Text>
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
              <MaterialCommunityIcons name="credit-card" size={18} color="white" style={styles.paymentButtonIcon} />
              <Text style={styles.paymentButtonText}>Make Payment</Text>
            </TouchableOpacity>
          </View>
        </View>

        

<View style={styles.sectionContainer}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>Quick Links</Text>
  </View>
  <View style={styles.quickLinksGrid}>
    {quickLinks.map(link => (
      <TouchableOpacity key={link.id} style={styles.quickLink}>
        <View style={styles.quickLinkContent}>
          <View style={[styles.quickLinkIcon, { backgroundColor: link.bgColor }]}>
            <MaterialCommunityIcons name={link.icon as any} size={18} color={link.color} />
          </View>
          <Text style={styles.quickLinkText}>{link.name}</Text>
        </View>
        <View style={styles.quickLinkArrow}>
          <MaterialCommunityIcons name="chevron-right" size={16} color={colors.subtext} />
        </View>
      </TouchableOpacity>
    ))}
  </View>
</View>

        {/* Recent Activities */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color="#25D366" />
            </TouchableOpacity>
          </View>
          
          {recentActivities.map(activity => (
            <TouchableOpacity key={activity.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                  <MaterialCommunityIcons name={activity.icon as any} size={18} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <View style={styles.activityMeta}>
                    <Text style={styles.activityCourse}>{activity.course}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}