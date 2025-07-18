import { useTheme } from '@/context/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Homepage = () => {
  const { colors } = useTheme();

  const categories = [
    {
      id: 1,
      title: 'Food & Dining',
      icon: 'food-fork-drink',
      color: '#FF6B6B',
      description: 'Discover local restaurants and cuisines'
    },
    {
      id: 2,
      title: 'Shopping',
      icon: 'shopping',
      color: '#4ECDC4',
      description: 'Browse amazing deals and products'
    },
    {
      id: 3,
      title: 'Entertainment',
      icon: 'movie',
      color: '#45B7D1',
      description: 'Movies, shows & entertainment events'
    },
    {
      id: 4,
      title: 'Health & Fitness',
      icon: 'dumbbell',
      color: '#96CEB4',
      description: 'Stay healthy and maintain active lifestyle'
    },
    {
      id: 5,
      title: 'Travel',
      icon: 'airplane',
      color: '#FFEAA7',
      description: 'Explore new destinations and adventures'
    },
    {
      id: 6,
      title: 'Education',
      icon: 'school',
      color: '#DDA0DD',
      description: 'Learn something new and expand knowledge'
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

  const renderCategoryCard = (category:any) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { 
        backgroundColor: colors.cardBackground, 
        borderColor: colors.border,
        shadowColor: '#000'
      }]}
      onPress={() => handleCategoryPress(category)}
      activeOpacity={0.8}
    >
      <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
        <MaterialCommunityIcons 
          name={category.icon} 
          size={28} 
          color={colors.buttonText} 
        />
      </View>
      <Text style={[styles.categoryTitle, { color: colors.text }]}>
        {category.title}
      </Text>
      <Text style={[styles.categoryDescription, { color: colors.subtext }]}>
        {category.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: colors.buttonText }]}>
              Welcome to Your App
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.buttonText }]}>
              Discover amazing experiences and connect with what matters most
            </Text>
            <TouchableOpacity 
              style={[styles.heroButton, { backgroundColor: colors.cardBackground }]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons 
                name="rocket-launch" 
                size={20} 
                color={colors.primary} 
                style={styles.buttonIcon}
              />
              <Text style={[styles.heroButtonText, { color: colors.primary }]}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Explore Categories
          </Text>
          <Text style={[styles.sectionText, { color: colors.text }]}>
            Find exactly what you're looking for with our carefully curated categories. 
            Each section is designed to help you discover new experiences and connect 
            with services that matter most to you.
          </Text>
          
          <View style={styles.categoriesGrid}>
            {categories.map(category => renderCategoryCard(category))}
          </View>
        </View>

        {/* Features Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Why Choose Our App?
          </Text>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureBullet, { backgroundColor: colors.primary }]} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Personalized Experience
              </Text>
              <Text style={[styles.featureDescription, { color: colors.subtext }]}>
                Get recommendations tailored to your preferences and interests
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureBullet, { backgroundColor: colors.primary }]} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Easy Navigation
              </Text>
              <Text style={[styles.featureDescription, { color: colors.subtext }]}>
                Intuitive interface designed for seamless user experience
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureBullet, { backgroundColor: colors.primary }]} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Real-time Updates
              </Text>
              <Text style={[styles.featureDescription, { color: colors.subtext }]}>
                Stay informed with live updates and notifications
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureBullet, { backgroundColor: colors.primary }]} />
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Secure & Reliable
              </Text>
              <Text style={[styles.featureDescription, { color: colors.subtext }]}>
                Your data is protected with industry-standard security measures
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => console.log('Profile pressed')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="account-circle" 
              size={20} 
              color={colors.buttonText} 
              style={styles.actionIcon}
            />
            <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>
              My Profile
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => console.log('Settings pressed')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="cog" 
              size={20} 
              color={colors.buttonText} 
              style={styles.actionIcon}
            />
            <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>
              Settings
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => console.log('Support pressed')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="help-circle" 
              size={20} 
              color={colors.buttonText} 
              style={styles.actionIcon}
            />
            <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>
              Help & Support
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => console.log('About pressed')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="information" 
              size={20} 
              color={colors.buttonText} 
              style={styles.actionIcon}
            />
            <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>
              About Us
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 18,
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 24,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 8,
  },
  heroButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
    letterSpacing: 0.2,
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  categoryCard: {
    width: (width - 82) / 2,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '400',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
    marginTop: 6,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default Homepage;