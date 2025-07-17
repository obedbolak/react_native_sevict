import { useTheme } from '@/context/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ComputerEngineeringScreen = () => {
  const { colors } = useTheme();

  const handleResourcePress = (resourceType: string) => {
    // TODO: Implement navigation to specific resource
    console.log(`Opening ${resourceType}`);
  };

  interface SpecializationCardProps {
    title: string;
    description: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  }

  const renderSpecializationCard = (
    title: SpecializationCardProps['title'],
    description: SpecializationCardProps['description'],
    icon: SpecializationCardProps['icon']
  ) => (
    <View style={[styles.specializationCard, { 
      backgroundColor: colors.cardBackground, 
      borderColor: colors.border,
      shadowColor: '#000'
    }]}>
      <View style={styles.specializationHeader}>
        <MaterialCommunityIcons 
          name={icon} 
          size={24} 
          color={colors.primary} 
          style={styles.specializationIcon}
        />
        <Text style={[styles.specializationTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.specializationText, { color: colors.subtext }]}>
        {description}
      </Text>
    </View>
  );

  const renderCareerItem = (title: string, description: string ) => (
    <View style={styles.careerItem}>
      <View style={[styles.careerBullet, { backgroundColor: colors.primary }]} />
      <View style={styles.careerContent}>
        <Text style={[styles.careerTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.careerDescription, { color: colors.subtext }]}>
          {description}
        </Text>
      </View>
    </View>
  );

  interface CourseCardProps {
    title: string;
    code: string;
    credits: string;
    description: string;
  }

  const renderCourseCard = (
    title: CourseCardProps['title'],
    code: CourseCardProps['code'],
    credits: CourseCardProps['credits'],
    description: CourseCardProps['description']
  ) => (
    <View style={[styles.courseCard, { 
      backgroundColor: colors.cardBackground, 
      borderColor: colors.border,
      shadowColor: '#000'
    }]}>
      <View style={styles.courseHeader}>
        <Text style={[styles.courseTitle, { color: colors.text }]}>
          {title}
        </Text>
        <View style={styles.courseDetails}>
          <Text style={[styles.courseCode, { color: colors.primary }]}>
            {code}
          </Text>
          <Text style={[styles.courseCredits, { color: colors.subtext }]}>
            {credits} credits
          </Text>
        </View>
      </View>
      <Text style={[styles.courseDescription, { color: colors.subtext }]}>
        {description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.cardBackground }]} 
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons 
            name="arrow-left" 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>

        {/* Header Section */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: colors.buttonText }]}>
              Computer Engineering
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.buttonText }]}>
              Bridging Hardware and Software Innovation
            </Text>
          </View>
        </View>

        {/* Overview Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Program Overview
          </Text>
          <Text style={[styles.sectionText, { color: colors.text }]}>
            Computer Engineering integrates electrical engineering principles with computer science 
            fundamentals to design and develop advanced computing systems. Our program prepares 
            students to tackle complex challenges in hardware design, embedded systems, and 
            computational architecture, positioning graduates at the forefront of technological innovation.
          </Text>
        </View>

        {/* Specializations Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Specialization Areas
          </Text>
          
          <View style={styles.specializationContainer}>
            {renderSpecializationCard(
              "Hardware Systems Design",
              "Focus on microprocessor design, VLSI circuits, and computer architecture optimization.",
              "memory"
            )}
            
            {renderSpecializationCard(
              "Embedded Systems",
              "Develop real-time systems for IoT, automotive, and industrial applications.",
              "chip"
            )}
            
            {renderSpecializationCard(
              "Network & Communications",
              "Design secure, high-performance network infrastructure and communication protocols.",
              "network"
            )}
            
            {renderSpecializationCard(
              "Digital Signal Processing",
              "Apply advanced algorithms for multimedia, telecommunications, and data analysis.",
              "waveform"
            )}
          </View>
        </View>

        {/* Career Paths Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Career Opportunities
          </Text>
          
          {renderCareerItem(
            "Hardware Design Engineer",
            "Develop cutting-edge processors, memory systems, and specialized computing hardware"
          )}
          
          {renderCareerItem(
            "Systems Architect",
            "Design large-scale computing infrastructure and enterprise system architectures"
          )}
          
          {renderCareerItem(
            "Embedded Systems Engineer",
            "Create intelligent systems for automotive, aerospace, and consumer electronics"
          )}
          
          {renderCareerItem(
            "Network Infrastructure Engineer",
            "Build and optimize high-performance network systems and cybersecurity solutions"
          )}
          
          {renderCareerItem(
            "Research & Development Engineer",
            "Pioneer next-generation computing technologies and emerging hardware solutions"
          )}
        </View>

        {/* Key Courses Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Core Curriculum
          </Text>
          
          {renderCourseCard(
            "Digital Logic Design",
            "CE 201",
            "4",
            "Fundamental principles of digital circuits, Boolean algebra, and combinational logic systems"
          )}
          
          {renderCourseCard(
            "Computer Architecture",
            "CE 301",
            "4",
            "Advanced study of processor design, memory hierarchies, and parallel computing systems"
          )}
          
          {renderCourseCard(
            "Operating Systems",
            "CE 320",
            "3",
            "System-level programming, process management, and distributed computing concepts"
          )}
          
          {renderCourseCard(
            "VLSI Design",
            "CE 410",
            "4",
            "Very Large Scale Integration design methodologies and semiconductor manufacturing processes"
          )}
        </View>

        {/* Resources Section */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackgroundColor }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Academic Resources
          </Text>
          
          <TouchableOpacity 
            style={[styles.resourceButton, { backgroundColor: colors.primary }]}
            onPress={() => handleResourcePress('Department Website')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="web" 
              size={20} 
              color={colors.buttonText} 
              style={styles.resourceIcon}
            />
            <Text style={[styles.resourceButtonText, { color: colors.buttonText }]}>
              Department Website
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.resourceButton, { backgroundColor: colors.primary }]}
            onPress={() => handleResourcePress('Course Catalog')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="book-open-variant" 
              size={20} 
              color={colors.buttonText} 
              style={styles.resourceIcon}
            />
            <Text style={[styles.resourceButtonText, { color: colors.buttonText }]}>
              Course Catalog
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.resourceButton, { backgroundColor: colors.primary }]}
            onPress={() => handleResourcePress('Faculty Directory')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="account-group" 
              size={20} 
              color={colors.buttonText} 
              style={styles.resourceIcon}
            />
            <Text style={[styles.resourceButtonText, { color: colors.buttonText }]}>
              Faculty Directory
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.resourceButton, { backgroundColor: colors.primary }]}
            onPress={() => handleResourcePress('Research Labs')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name="flask" 
              size={20} 
              color={colors.buttonText} 
              style={styles.resourceIcon}
            />
            <Text style={[styles.resourceButtonText, { color: colors.buttonText }]}>
              Research Laboratories
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 80,
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
  },
  specializationContainer: {
    marginTop: 8,
  },
  specializationCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  specializationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  specializationIcon: {
    marginRight: 12,
  },
  specializationTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  specializationText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  careerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  careerBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
    marginTop: 6,
  },
  careerContent: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  careerDescription: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },
  courseCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  courseDetails: {
    alignItems: 'flex-end',
  },
  courseCode: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  courseCredits: {
    fontSize: 13,
    fontWeight: '400',
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  resourceButton: {
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
  resourceIcon: {
    marginRight: 8,
  },
  resourceButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default ComputerEngineeringScreen;