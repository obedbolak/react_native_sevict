import { useTheme } from '@/context/themeContext';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { activities } from '../../db/activityData';

interface Activity {
    name: string;
    description: string;
    bannerImage: string[];
    category: string;
    longDescription: string;
    link?: string;
    contact?: {
        email: string;
        phone: string;
    };
    location?: {
        address: string;
        city: string;
        state: string;
        zip: string;
    };
}

const ActivityDetails = () => {
    const { colors } = useTheme();
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const currentActivity = activities[currentActivityIndex];

  // Handle image and activity rotation
    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex(prev => {
                // If we've reached the last image, move to next activity
                if (prev + 1 >= currentActivity.bannerImage.length) {
                    // Move to next activity (with wrap-around)
                    setCurrentActivityIndex(prevActivity => 
                        (prevActivity + 1) % activities.length
                    );
                    return 0; // Reset image index for new activity
                }
                // Otherwise just go to next image
                return prev + 1;
            });
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(imageInterval);
    }, [currentActivityIndex, currentActivity.bannerImage.length]);

    const styles = StyleSheet.create({
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
            color: 'white',
            marginBottom: 5,
        },
        bannerSubtitle: {
            fontSize: 16,
            color: 'white',
            marginBottom: 15,
        },
        bannerButton: {
            backgroundColor: colors.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            alignSelf: 'flex-start',
        },
        bannerButtonText: {
            color: colors.buttonText,
            fontWeight: 'bold',
        },
    });

    return (
        <TouchableOpacity style={styles.bannerContainer} onPress={() => {router.push({
            pathname: '/activities/[activityDetails]',
            params: { currentActivity: JSON.stringify(currentActivity)
             },
        })}}>
            <ImageBackground
                source={{ uri: currentActivity.bannerImage[currentImageIndex] }}
                style={styles.bannerImage}
                resizeMode="cover"
            >
                <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerTitle}>{currentActivity.name}</Text>
                    <Text style={styles.bannerSubtitle}>{currentActivity.description}</Text>
                    <View style={styles.bannerButton}>
                        <Text style={styles.bannerButtonText}>Learn More</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default ActivityDetails;