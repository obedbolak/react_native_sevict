import { useTheme } from '@/context/themeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { workshopsData } from '../../db/workShop';

const { width } = Dimensions.get('window');

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


const Lists = () => {
    const { colors } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    
    // Extract unique categories for filtering
    const categories = useMemo(() => {
        const cats = ['All', ...new Set((workshopsData as Workshop[]).map(item => item.category || 'General'))];
        return cats;
    }, []);

    // Filter and search logic
    const filteredWorkshops = useMemo(() => {
        return (workshopsData as Workshop[]).filter(workshop => {
            const matchesSearch = workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = selectedFilter === 'All' || workshop.category === selectedFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, selectedFilter]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            padding: 20,
            paddingBottom: 10,
        },
        title: {
            fontSize: 32,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 8,
            letterSpacing: -0.5,
        },
        subtitle: {
            fontSize: 16,
            color: colors.subtext,
            marginBottom: 24,
            fontWeight: '400',
        },
        searchContainer: {
            marginBottom: 20,
        },
        searchInput: {
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            paddingHorizontal: 20,
            paddingVertical: 16,
            fontSize: 16,
            color: colors.text,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
        },
        filterContainer: {
            marginBottom: 24,
        },
        filterScrollView: {
            paddingHorizontal: 20,
        },
        filterChip: {
            backgroundColor: colors.cardBackground,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 25,
            marginRight: 12,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 1,
        },
        filterChipActive: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        filterText: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '600',
        },
        filterTextActive: {
            color: 'white',
        },
        listContainer: {
            paddingHorizontal: 6,
            paddingBottom: 20,
        },
        workshopCard: {
            height: 200,
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 8,
        },
        workshopImage: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        workshopOverlay: {
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: 20,
        },
        workshopBadge: {
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(255,255,255,0.2)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginBottom: 12,
            backdropFilter: 'blur(10px)',
        },
        workshopCategory: {
            color: 'white',
            fontSize: 12,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        workshopDate: {
            color: 'rgba(255,255,255,0.9)',
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 8,
        },
        workshopTitle: {
            color: 'white',
            fontSize: 22,
            fontWeight: '700',
            marginBottom: 6,
            lineHeight: 28,
        },
        workshopInstructor: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: 15,
            fontWeight: '500',
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 60,
        },
        emptyStateText: {
            fontSize: 18,
            color: colors.subtext,
            textAlign: 'center',
            fontWeight: '500',
        },
        emptyStateSubtext: {
            fontSize: 14,
            color: colors.subtext,
            textAlign: 'center',
            marginTop: 8,
            opacity: 0.7,
        },
    });

    const renderWorkshopCard = ({ item }: { item: Workshop }) => (
        <TouchableOpacity 
            style={styles.workshopCard}
            activeOpacity={0.9}
            onPress={() => router.push({
                pathname: '/workshops/[id]',
                params: { item: JSON.stringify(item) },
            })}
        >
            <ImageBackground
                source={{ uri: item.link }}
                style={styles.workshopImage}
                resizeMode="cover"
            >
                <View style={styles.workshopOverlay}>
                    {item.category && (
                        <View style={styles.workshopBadge}>
                            <Text style={styles.workshopCategory}>{item.category}</Text>
                        </View>
                    )}
                    <Text style={styles.workshopDate}>
                        {item.date} • {item.time}
                    </Text>
                    <Text style={styles.workshopTitle} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text style={styles.workshopInstructor}>
                        with {item.instructor}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    const renderFilterChip = (category: string) => (
        <TouchableOpacity
            key={category}
            style={[
                styles.filterChip,
                selectedFilter === category && styles.filterChipActive
            ]}
            onPress={() => setSelectedFilter(category)}
            activeOpacity={0.7}
        >
            <Text style={[
                styles.filterText,
                selectedFilter === category && styles.filterTextActive
            ]}>
                {category}
            </Text>
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No workshops found</Text>
            <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter criteria
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
           <View style={{flexDirection: 'row', alignItems: 'center', gap: 50, paddingHorizontal: 20 }}>
            <MaterialIcons name="arrow-back-ios" size={24} color={colors.text} onPress={() => router.back()} />
                <Text style={styles.title}>Workshops</Text></View>
            <FlatList
                data={filteredWorkshops}
                renderItem={renderWorkshopCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
                onScrollBeginDrag={() => {
                    // Dismiss keyboard when scrolling starts
                    if (searchQuery) {
                        // You can add keyboard dismiss logic here if needed
                    }
                }}
                ListHeaderComponent={() => (
                    <>
                          <View style={styles.header}>
                
                <Text style={styles.subtitle}>
                    Discover amazing learning opportunities
                </Text>
                
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search workshops or instructors..."
                        placeholderTextColor={colors.placeholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        clearButtonMode="while-editing"
                    />
                </View>
            </View>

            <View style={styles.filterContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScrollView}
                >
                    {categories.map(renderFilterChip)}
                </ScrollView>
            </View>
                    </>
                )}
            />
        </SafeAreaView>
    );
};

export default Lists;