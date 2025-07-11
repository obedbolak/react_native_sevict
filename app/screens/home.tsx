import { useTheme } from '@/context/themeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 5,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.text,
  },
  schoolName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.inputBackground,
  },
  bannerContainer: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    height: '100%',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#3a86ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  viewAllText: {
    color: '#3a86ff',
    fontWeight: '500',
  },
  courseIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  iconContainer: {
    alignItems: 'center',
    width: 70,
  },
  iconBackground: {
    backgroundColor: '#e9f2ff',
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconLabel: {
    fontSize: 13,
    textAlign: 'center',
    color: '#495057',
  },
  workshopCard: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  workshopImage: {
    height: '100%',
    width: '100%',
  },
  workshopOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
    height: '100%',
    justifyContent: 'flex-end',
  },
  workshopDate: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  workshopTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  workshopInstructor: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  newsCard: {
    paddingVertical: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  newsExcerpt: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    lineHeight: 20,
  },
  newsDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
});
  return (
    <View style={styles.contentContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.schoolName}>SEVICHITM University</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color="gray" />
            <TextInput 
              placeholder="Search courses, workshops..." 
              style={styles.searchInput} 
              placeholderTextColor="gray"
            />
          </View>
        </View>

        {/* Banner Image with Call-to-Action */}
        <TouchableOpacity style={styles.bannerContainer}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }}
            style={styles.bannerImage}
            resizeMode="cover"
          >
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>New Coding Bootcamp</Text>
              <Text style={styles.bannerSubtitle}>Start your tech career today</Text>
              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Learn More</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Quick Access Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Courses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.courseIconsContainer}>
            <TouchableOpacity style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='code' size={32} color="#3a86ff" />
              </View>
              <Text style={styles.iconLabel}>Web Dev</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='phone-android' size={32} color="#3a86ff" />
              </View>
              <Text style={styles.iconLabel}>Mobile Dev</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='data-usage' size={32} color="#3a86ff" />
              </View>
              <Text style={styles.iconLabel}>Data Science</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='security' size={32} color="#3a86ff" />
              </View>
              <Text style={styles.iconLabel}>Cyber Security</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Workshops Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Workshops</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.workshopCard}>
            <ImageBackground 
              source={{ uri: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }}
              style={styles.workshopImage}
              resizeMode="cover"
            >
              <View style={styles.workshopOverlay}>
                <Text style={styles.workshopDate}>JUL 15</Text>
                <Text style={styles.workshopTitle}>Python for Beginners</Text>
                <Text style={styles.workshopInstructor}>With Dr. Sarah Chen</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* News & Updates Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>News & Updates</Text>
          </View>
          
          <View style={styles.newsCard}>
            <Text style={styles.newsTitle}>New AI Lab Opening Soon</Text>
            <Text style={styles.newsExcerpt}>Our state-of-the-art artificial intelligence lab will be ready for students this fall semester.</Text>
            <Text style={styles.newsDate}>2 days ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

