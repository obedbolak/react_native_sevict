import { useTheme } from '@/context/themeContext';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Activity {
    name: string;
    shortDescription: string;
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
    const { currentActivity } = useLocalSearchParams();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const { colors } = useTheme();

    // Parse the stringified activity object
    const activity: Activity = currentActivity ? JSON.parse(currentActivity as string) : null;

    const handlePressLink = () => {
        if (activity.link) {
            Linking.openURL(activity.link);
        }
    };

    const handlePressPhone = () => {
        if (activity.contact?.phone) {
            Linking.openURL(`tel:${activity.contact.phone}`);
        }
    };

    const handlePressEmail = () => {
        if (activity.contact?.email) {
            Linking.openURL(`mailto:${activity.contact.email}`);
        }
    };

    if (!activity) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.loadingContainer}>
                    <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {/* Hero Image Section */}
                {activity.bannerImage?.length > 0 && (
                    <View style={styles.heroSection}>
                        <View style={[styles.heroImageContainer, { backgroundColor: colors.border }]}>
                            <Image
                                source={{ uri: activity.bannerImage[activeImageIndex] }}
                                style={styles.heroImage}
                                resizeMode="cover"
                            />
                            <View style={[styles.heroOverlay, { 
                                backgroundColor: 'rgba(0,0,0,0.1)'
                            }]} />
                        </View>
                        
                        {/* Image Thumbnails */}
                        {activity.bannerImage.length > 1 && (
                            <ScrollView 
                                horizontal 
                                style={styles.thumbnailContainer}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.thumbnailContent}
                            >
                                {activity.bannerImage.map((image, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveImageIndex(index)}
                                        style={[
                                            styles.thumbnail,
                                            activeImageIndex === index && { 
                                                borderColor: colors.primary 
                                            }
                                        ]}
                                    >
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.thumbnailImage}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                )}

                {/* Content Section */}
                <View style={styles.contentSection}>
                    {/* Category Badge */}
                    <View style={styles.categoryContainer}>
                        <View style={[styles.categoryBadge, { 
                            backgroundColor: colors.secondary,
                            borderColor: colors.border 
                        }]}>
                            <Text style={[styles.categoryText, { color: colors.primary }]}>
                                {activity.category}
                            </Text>
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={[styles.title, { color: colors.text }]}>
                        {activity.name}
                    </Text>

                    {/* Short Description */}
                    <Text style={[styles.description, { color: colors.subtext }]}>
                        {activity.shortDescription}
                    </Text>

                    {/* Divider */}
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* Long Description Section */}
                    <View style={styles.detailsSection}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            About this Activity
                        </Text>
                        <Text style={[styles.longDescription, { color: colors.text }]}>
                            {activity.longDescription}
                        </Text>
                    </View>

                    {/* Contact Information Section */}
                    {(activity.contact || activity.link) && (
                        <>
                            <View style={[styles.divider, { backgroundColor: colors.border }]} />
                            <View style={styles.detailsSection}>
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                    Contact Information
                                </Text>
                                
                                {activity.contact?.phone && (
                                    <TouchableOpacity 
                                        style={styles.contactItem} 
                                        onPress={handlePressPhone}
                                    >
                                        <MaterialIcons name="phone" size={20} color={colors.primary} />
                                        <Text style={[styles.contactText, { color: colors.text }]}>
                                            {activity.contact.phone}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                
                                {activity.contact?.email && (
                                    <TouchableOpacity 
                                        style={styles.contactItem} 
                                        onPress={handlePressEmail}
                                    >
                                        <MaterialIcons name="email" size={20} color={colors.primary} />
                                        <Text style={[styles.contactText, { color: colors.text }]}>
                                            {activity.contact.email}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                
                                {activity.link && (
                                    <TouchableOpacity 
                                        style={styles.contactItem} 
                                        onPress={handlePressLink}
                                    >
                                        <FontAwesome name="link" size={20} color={colors.primary} />
                                        <Text style={[styles.contactText, { color: colors.primary }]}>
                                            Visit Website
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    )}

                    {/* Location Information Section */}
                    {activity.location && (
                        <>
                            <View style={[styles.divider, { backgroundColor: colors.border }]} />
                            <View style={styles.detailsSection}>
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                    Location
                                </Text>
                                <View style={styles.contactItem}>
                                    <Ionicons name="location" size={20} color={colors.primary} />
                                    <View>
                                        <Text style={[styles.contactText, { color: colors.text }]}>
                                            {activity.location.address}
                                        </Text>
                                        <Text style={[styles.contactText, { color: colors.subtext }]}>
                                            {activity.location.city}, {activity.location.state} {activity.location.zip}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 32,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '500',
    },
    heroSection: {
        marginBottom: 24,
    },
    heroImageContainer: {
        position: 'relative',
        height: 280,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    thumbnailContainer: {
        marginTop: 16,
        paddingHorizontal: 20,
    },
    thumbnailContent: {
        paddingRight: 20,
    },
    thumbnail: {
        marginRight: 12,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    thumbnailImage: {
        width: 60,
        height: 60,
    },
    contentSection: {
        paddingHorizontal: 20,
    },
    categoryContainer: {
        marginBottom: 12,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
        lineHeight: 34,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    divider: {
        height: 1,
        marginBottom: 24,
    },
    detailsSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    longDescription: {
        fontSize: 16,
        lineHeight: 26,
        letterSpacing: 0.2,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    contactText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default ActivityDetails;