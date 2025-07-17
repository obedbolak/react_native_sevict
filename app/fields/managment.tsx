import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const Homepage = () => {
  const categories = [
    {
      id: 1,
      title: 'Food & Dining',
      icon: '🍕',
      color: '#FF6B6B',
      description: 'Discover local restaurants'
    },
    {
      id: 2,
      title: 'Shopping',
      icon: '🛍️',
      color: '#4ECDC4',
      description: 'Browse amazing deals'
    },
    {
      id: 3,
      title: 'Entertainment',
      icon: '🎬',
      color: '#45B7D1',
      description: 'Movies, shows & events'
    },
    {
      id: 4,
      title: 'Health & Fitness',
      icon: '💪',
      color: '#96CEB4',
      description: 'Stay healthy and active'
    },
    {
      id: 5,
      title: 'Travel',
      icon: '✈️',
      color: '#FFEAA7',
      description: 'Explore new destinations'
    },
    {
      id: 6,
      title: 'Education',
      icon: '📚',
      color: '#DDA0DD',
      description: 'Learn something new'
    }
  ];

  const handleCategoryPress = (category:any) => {
    console.log('Category pressed:', category.title);
    // Add navigation logic here
  };

  const handleGetStarted = () => {
    console.log('Get Started pressed');
    // Add navigation logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Welcome to Your App</Text>
            <Text style={styles.heroSubtitle}>
              Discover amazing experiences and connect with what matters most
            </Text>
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.heroButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroImageContainer}>
            <View style={styles.heroPlaceholder}>
              <Text style={styles.heroPlaceholderText}>🚀</Text>
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <Text style={styles.sectionSubtitle}>
            Find exactly what you're looking for
          </Text>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: category.color }]}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.8}
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    backgroundColor: '#1a1a2e',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 300,
  },
  heroContent: {
    flex: 1,
    paddingRight: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#b8b8b8',
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  heroImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#2a2a4e',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ff6b6b',
  },
  heroPlaceholderText: {
    fontSize: 40,
  },
  categoriesSection: {
    padding: 20,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 50) / 2,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default Homepage;