import { useTheme } from '@/context/themeContext';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { activities } from '../../db/activityData';

interface Activity {
    name: string;
    description: string;
    bannerImage: string[];
    category: string;
}

const ActivityDetails = () => {
    const { colors } = useTheme();
    const [currentActivity, setCurrentActivity] = useState<Activity>(activities[0]); // Default to first activity
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-rotate images for the current activity
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % currentActivity.bannerImage.length
            );
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [currentActivity.bannerImage.length]);

    // Update the current activity when the route params change
    useEffect(() => {
        setInterval(() => {
         setCurrentActivity(previousActivity => previousActivity === activities[activities.length - 1] ? activities[0] : activities[activities.indexOf(previousActivity) + 1]);
        }, 30000);
        
    }, [currentActivity]);

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
        <TouchableOpacity style={styles.bannerContainer}>
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