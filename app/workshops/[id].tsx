import { useTheme } from '@/context/themeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Workshop {
    id: number;
    title: string;
    link: string;
    instructor: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
}

const Workshopdetails = () => {
    const { colors } = useTheme();
    const { item } = useLocalSearchParams();
    const parsedItem: Workshop = JSON.parse(item as string);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
        },
        backButton: {
            padding: 8,
        },
        title: {
            fontSize: 28,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 8,
        },
        image: {
            width: '100%',
            height: 250,
        },
        content: {
            padding: 20,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 12,
        },
        text: {
            fontSize: 16,
            color: colors.text,
            lineHeight: 24,
        },
        infoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
        },
        infoBox: {
            flex: 1,
            padding: 12,
            backgroundColor: colors.cardBackground,
            borderRadius: 12,
            marginRight: 8,
        },
        infoLabel: {
            fontSize: 12,
            color: colors.subtext,
            marginBottom: 4,
        },
        infoValue: {
            fontSize: 16,
            fontWeight: '500',
            color: colors.text,
        },
        categoryBadge: {
            alignSelf: 'flex-start',
            backgroundColor: colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginBottom: 16,
        },
        categoryText: {
            color: 'white',
            fontSize: 12,
            fontWeight: '600',
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <MaterialIcons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Workshop Details</Text>
            </View>

            <ImageBackground
                source={{ uri: parsedItem.link }}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.content}>
                {parsedItem.category && (
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{parsedItem.category}</Text>
                    </View>
                )}

                <Text style={styles.title}>{parsedItem.title}</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Instructor</Text>
                        <Text style={styles.infoValue}>{parsedItem.instructor}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Date</Text>
                        <Text style={styles.infoValue}>{parsedItem.date}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Time</Text>
                        <Text style={styles.infoValue}>{parsedItem.time}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Location</Text>
                        <Text style={styles.infoValue}>{parsedItem.location}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About this workshop</Text>
                    <Text style={styles.text}>{parsedItem.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Workshopdetails;