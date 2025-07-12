import { useTheme } from '@/context/themeContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const { colors } = useTheme();
  // Sample user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@techfuture.edu",
    studentId: "TF20230045",
    enrolledCourses: 5,
    completedCourses: 3,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const enrolledCourses = [
    { id: 1, name: "Python Programming", progress: 75 },
    { id: 2, name: "Web Development", progress: 40 },
    { id: 3, name: "Data Structures", progress: 90 },
  ];

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
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3a86ff',
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  idCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    elevation: 2,
  },
  idInfo: {
    flex: 1,
    marginLeft: 15,
  },
  idLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  idNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  idAction: {
    backgroundColor: '#e9f2ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  idActionText: {
    color: '#3a86ff',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
    marginLeft: 5,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  courseProgressText: {
    fontSize: 14,
    color: '#3a86ff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3a86ff',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '30%',
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
  },
});


  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.enrolledCourses}</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.completedCourses}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>A</Text>
            <Text style={styles.statLabel}>Grade Avg</Text>
          </View>
        </View>
      </View>

      {/* Student ID Card */}
      <View style={styles.idCard}>
        <MaterialCommunityIcons name="card-account-details" size={24} color="#3a86ff" />
        <View style={styles.idInfo}>
          <Text style={styles.idLabel}>Student ID</Text>
          <Text style={styles.idNumber}>{user.studentId}</Text>
        </View>
        <TouchableOpacity style={styles.idAction}>
          <Text style={styles.idActionText}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Current Courses */}
      <Text style={styles.sectionTitle}>My Courses</Text>
      {enrolledCourses.map(course => (
        <TouchableOpacity key={course.id} style={styles.courseCard}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseProgressText}>{course.progress}% Complete</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
          </View>
        </TouchableOpacity>
      ))}

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="assignment" size={24} color="#3a86ff" />
          <Text style={styles.actionText}>Assignments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="schedule" size={24} color="#3a86ff" />
          <Text style={styles.actionText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="payment" size={24} color="#3a86ff" />
          <Text style={styles.actionText}>Payments</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


export default Profile;