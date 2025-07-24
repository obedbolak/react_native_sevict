import { useTheme } from '@/context/themeContext';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Workshop = () => {
    const {colors} = useTheme();
    const styles = StyleSheet.create({
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
})
  return (
    <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Workshops</Text>
            <TouchableOpacity onPress={() => router.push('/workshops/lists')}>
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
  )
}

export default Workshop

