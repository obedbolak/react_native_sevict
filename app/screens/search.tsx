import { useTheme } from '@/context/themeContext';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Search = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    level: 'All',
    duration: 'All',
    rating: 'All',
  });

  // Sample data
  const categories = [
    { id: 'web', name: 'Web Development', icon: 'code' },
    { id: 'mobile', name: 'Mobile Development', icon: 'phone-android' },
    { id: 'data', name: 'Data Science', icon: 'data-usage' },
    { id: 'ai', name: 'AI & Machine Learning', icon: 'robot' },
    { id: 'cyber', name: 'Cyber Security', icon: 'security' },
    { id: 'cloud', name: 'Cloud Computing', icon: 'cloud' },
    { id: 'game', name: 'Game Development', icon: 'sports-esports' },
    { id: 'design', name: 'UI/UX Design', icon: 'design-services' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Python Bootcamp',
      category: 'data',
      instructor: 'Dr. Sarah Chen',
      duration: '8 weeks',
      level: 'Beginner',
      rating: 4.8,
      students: 1245,
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'Advanced React Native',
      category: 'mobile',
      instructor: 'Mark Johnson',
      duration: '6 weeks',
      level: 'Advanced',
      rating: 4.9,
      students: 892,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      category: 'ai',
      instructor: 'Prof. Alan Turing',
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: 2103,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 4,
      title: 'Full Stack Web Development',
      category: 'web',
      instructor: 'Emily Rodriguez',
      duration: '12 weeks',
      level: 'Beginner',
      rating: 4.6,
      students: 1567,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  const filteredCourses = courses.filter(course => {
    // Filter by search query
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    
    // Filter by additional filters
    const matchesLevel = filters.level === 'All' || course.level === filters.level;
    const matchesDuration = filters.duration === 'All' || course.duration.includes(filters.duration);
    const matchesRating = filters.rating === 'All' || 
                         (filters.rating === '4+' && course.rating >= 4) ||
                         (filters.rating === '4.5+' && course.rating >= 4.5);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesRating;
  });

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingBottom: 16,
    paddingHorizontal: 4,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sectionBackgroundColor,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    minHeight: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategory: {
    backgroundColor: '#3a86ff',
    borderColor: '#3a86ff',
  },
  categoryText: {
    marginLeft: 8,
    color: '#495057',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  filterText: {
    fontSize: 14,
    color: '#3a86ff',
    fontWeight: '600',
  },
  coursesContainer: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImage: {
    height: 150,
    width: '100%',
  },
  courseImageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  courseLevel: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  courseLevelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseMetaText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#6c757d',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  filterOptions: {
    flex: 1,
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 28,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 14,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  filterButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginHorizontal: 5,
    marginBottom: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#3a86ff',
    borderColor: '#3a86ff',
  },
  filterButtonText: {
    color: '#495057',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
  },
  resetButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  resetButtonText: {
    color: '#6c757d',
    fontWeight: '600',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#3a86ff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});


  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color="#6c757d" />
          <TextInput
            placeholder="Search courses, instructors..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6c757d"
          />
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <MaterialIcons name="filter-list" size={24} color="#3a86ff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Fields of Study</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === item.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
          >
            <MaterialIcons name={item.icon as any} size={24} color={selectedCategory === item.id ? '#fff' : '#3a86ff'} />
            <Text style={[styles.categoryText, selectedCategory === item.id && styles.selectedCategoryText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
        </Text>
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Courses List */}
      <FlatList
        data={filteredCourses}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.coursesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.courseImage}
              imageStyle={styles.courseImageStyle}
            >
              <View style={styles.courseLevel}>
                <Text style={styles.courseLevelText}>{item.level}</Text>
              </View>
            </ImageBackground>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseInstructor}>By {item.instructor}</Text>
              <View style={styles.courseMeta}>
                <View style={styles.courseMetaItem}>
                  <MaterialIcons name="access-time" size={16} color="#6c757d" />
                  <Text style={styles.courseMetaText}>{item.duration}</Text>
                </View>
                <View style={styles.courseMetaItem}>
                  <FontAwesome name="star" size={16} color="#ffc107" />
                  <Text style={styles.courseMetaText}>{item.rating}</Text>
                </View>
                <View style={styles.courseMetaItem}>
                  <Ionicons name="people" size={16} color="#6c757d" />
                  <Text style={styles.courseMetaText}>{item.students}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Filters Modal */}
       <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <MaterialIcons name="close" size={24} color="#6c757d" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterOptions}>
              {/* Level Filter */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Level</Text>
                <View style={styles.filterButtons}>
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.filterButton,
                        filters.level === level && styles.activeFilter
                      ]}
                      onPress={() => setFilters({...filters, level})}
                    >
                      <Text style={[
                        styles.filterButtonText,
                        filters.level === level && styles.activeFilterText
                      ]}>
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Duration Filter */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Duration</Text>
                <View style={styles.filterButtons}>
                  {['All', '4', '6', '8', '10', '12'].map(duration => (
                    <TouchableOpacity
                      key={duration}
                      style={[
                        styles.filterButton,
                        filters.duration === duration && styles.activeFilter
                      ]}
                      onPress={() => setFilters({...filters, duration})}
                    >
                      <Text style={[
                        styles.filterButtonText,
                        filters.duration === duration && styles.activeFilterText
                      ]}>
                        {duration === 'All' ? duration : `${duration} weeks`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Rating Filter */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Rating</Text>
                <View style={styles.filterButtons}>
                  {['All', '4+', '4.5+'].map(rating => (
                    <TouchableOpacity
                      key={rating}
                      style={[
                        styles.filterButton,
                        filters.rating === rating && styles.activeFilter
                      ]}
                      onPress={() => setFilters({...filters, rating})}
                    >
                      <Text style={[
                        styles.filterButtonText,
                        filters.rating === rating && styles.activeFilterText
                      ]}>
                        {rating === 'All' ? rating : `${rating} ★`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => setFilters({
                  level: 'All',
                  duration: 'All',
                  rating: 'All',
                })}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default Search;