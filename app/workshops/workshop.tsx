import { useTheme } from '@/context/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { workshopsData } from '../../db/workShop';

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
            <TouchableOpacity onPress={() => router.push('/workshops/lists')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.viewAllText}>View all</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.workshopCard} onPress={() => router.push({
            pathname: '/workshops/[id]',
            params: { item: JSON.stringify(workshopsData[0]) },
          })}>
            <ImageBackground 
              source={{ uri: workshopsData[0].link }}
              style={styles.workshopImage}
              resizeMode="cover"
            >
              <View style={styles.workshopOverlay}>
                <Text style={styles.workshopDate}>{workshopsData[0].date}</Text>
                <Text style={styles.workshopTitle}>{workshopsData[0].title}</Text>
                <Text style={styles.workshopInstructor}>with {workshopsData[0].instructor}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
  )
}

export default Workshop

