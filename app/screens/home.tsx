import { useTheme } from '@/context/themeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AtivityDetails from '../activities/[id]';
import Workshop from '../workshops/workshop';


const Home = () => {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMoreFields, setShowMoreFields] = useState(false);


  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: colors.background,
      
      paddingTop: 10,
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
      backgroundColor: colors.cardBackground,
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
      color: colors.text,
    },

    sectionContainer: {
      backgroundColor: colors.cardBackground,
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
      color: colors.text,
    },
    viewAllText: {
      color: colors.primary,
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
      backgroundColor: colors.inputBackground,
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
      color: colors.text,
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
      color: colors.text,
      marginBottom: 5,
    },
    newsExcerpt: {
      fontSize: 14,
      color: colors.subtext,
      marginBottom: 8,
      lineHeight: 20,
    },
    newsDate: {
      fontSize: 12,
      color: colors.settingsValue,
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
            <MaterialIcons name="search" size={20} color={colors.icon} />
            <TextInput 
              placeholder="Search courses, workshops..." 
              style={styles.searchInput} 
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>

        {/* Banner Image with Call-to-Action */}
       <AtivityDetails />

        {/* Quick Access Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Fields</Text>
            <TouchableOpacity onPress={() => setShowMoreFields(!showMoreFields)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.viewAllText}>View all</Text>
                {showMoreFields ?
                  <MaterialIcons name="keyboard-arrow-up" size={20} color={colors.primary} />
                  :<MaterialIcons name="keyboard-arrow-right" size={20} color={colors.primary} />}
                
            </View>
              
            </TouchableOpacity>
          </View>
          
          <View style={styles.courseIconsContainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'computer' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='computer' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Computer Engineering</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'management' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='manage-accounts' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Management</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'business' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='business-center' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>business & finance</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'biomedical' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='health-and-safety' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>BioMedical</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Course Icons */}
          {showMoreFields && (
            <>
          <View style={[styles.courseIconsContainer, { marginTop: 15 }]}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'electrical' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='electrical-services' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Electrical</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'mechanical' }
            })}>
              <View style={styles.iconBackground}>
                {/* mechanics */}

                <MaterialIcons name='engineering' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Mechanical</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'arts' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='palette' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Arts and Culture</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'agriculture' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='agriculture' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Agriculture & Food Science</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.courseIconsContainer, { marginTop: 20 }]}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'civil' }
            })}>
              <View style={styles.iconBackground}>
                {/* civil engineering */}
                <MaterialIcons name='work' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Civil Engineering</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'communication' }
            })}>
              <View style={styles.iconBackground}>
                {/* mechanics */}

                <MaterialIcons name='ring-volume' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Communication</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'education' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='menu-book' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Science of Education</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconContainer} onPress={() => router.push({
              pathname: '/fields/[id]',
              params: { id: 'tourism' }
            })}>
              <View style={styles.iconBackground}>
                <MaterialIcons name='location-city' size={32} color={colors.primary} />
              </View>
              <Text style={styles.iconLabel}>Tourism and Hotel Management</Text>
            </TouchableOpacity>
          </View>
          </>
            
          )
            
          }
          
          
        </View>

        {/* Upcoming Workshops Section */}
        <Workshop />

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