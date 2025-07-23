import { useTheme } from '@/context/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { institutionInfo, programData } from '../../db/fieldsData';

interface Item {
  name: string;
  duration: string;
  level: string[];
  description: string;
  images?: string[]; // Optional field for program images
  courses?: string[];
  careerPaths?: string[]; // Optional field for career paths
}

const Fields = () => {
  const params = useLocalSearchParams<{ id?: string }>();
  const field = programData.find((item) => item.id === params.id);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedProgram, setSelectedProgram] = React.useState<Item | null>(null);
  const { colors } = useTheme();

  const styles = makeStyles(colors); // Create styles with current theme colors

  if (!field) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Field not found</Text>
      </View>
    );
  }

  const renderProgramItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.programCard} onPress={() => {
      setSelectedProgram(item);
      setModalVisible(true);
    }}>
      
      <Text style={styles.programName}>{item.name}</Text>
      <View style={styles.programMeta}>
        <Text style={styles.programDuration}>{item.duration}</Text>
        <Text style={styles.programLevel}>{item.level.join(' / ')}</Text>
      </View>
      <Text style={styles.programDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const parseColor = (color: string) =>
    color.replace('bg-', '#').replace('-500', '');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={{ padding: 16, position: 'sticky', left: 16, elevation: 2,shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.1,shadowRadius: 2, shadowColor: 'white' }} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
      </TouchableOpacity>
      <View style={[styles.header, { backgroundColor: parseColor(field.color) }]}>
        <Text style={styles.headerIcon}>{field.icon}</Text>
        <Text style={styles.headerTitle}>{field.title}</Text>
        <Text style={styles.headerDescription}>{field.description}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.programsTitle}>Available Programs</Text>

        <FlatList
          data={field.programs}
          renderItem={renderProgramItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No programs available for this field</Text>
          }
        />
      </View>
     
    </ScrollView> 
  <Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    {/* Touchable overlay to close when tapping outside */}
    <TouchableOpacity 
      style={styles.modalOverlayTouchable}
      activeOpacity={1}
      onPress={() => setModalVisible(false)}
    />
    
    {/* Bottom sheet container */}
    <View style={[styles.bottomSheet, { backgroundColor: colors.card }]}>
      {/* Drag handle indicator */}
      <View style={styles.dragHandle} />
      
      {/* Close button */}
      <TouchableOpacity
        style={styles.modalCloseButton}
        onPress={() => setModalVisible(false)}
      >
        <MaterialCommunityIcons name="close" size={24} color={colors.text} />
      </TouchableOpacity>
      
      {/* Scrollable content */}
      <ScrollView style={styles.modalContent}>
        {selectedProgram && (
          <>
            <Text style={styles.modalProgramName}>{selectedProgram.name}</Text>
            
            <View style={styles.modalProgramMeta}>
              <Text style={styles.modalProgramDuration}>{selectedProgram.duration}</Text>
              <Text style={styles.modalProgramLevel}>{selectedProgram.level.join(' / ')}</Text>
            </View>
            
            <Text style={styles.modalProgramDescription}>{selectedProgram.description}</Text>
            
            {selectedProgram.images && selectedProgram.images.length > 0 && (
              <FlatList
                data={selectedProgram.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{ marginRight: 10 }}>
                    <Image
                      source={{ uri: item }}
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                  </View>
                )}
              />  
            )}
            <View style={{ marginTop: 20 ,flexDirection:'row'}}> 
              {selectedProgram.courses && selectedProgram.courses.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Courses Offered</Text>
                {selectedProgram.courses.map((course, index) => (
                  <Text key={index} style={styles.infoText}>{course}</Text>
                ))}
              </View>
            )}
            {selectedProgram.careerPaths && selectedProgram.careerPaths.length > 0 && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Career Paths</Text>
                {selectedProgram.careerPaths.map((path, index) => (
                  <Text key={index} style={styles.infoText}>{path}</Text>
                ))}
              </View>
            )}</View>

           
          </>
        )}
        
        {/* School info section */}
        <View style={styles.schoolInfoContainer}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
            <Text style={styles.infoText}>{institutionInfo?.contact.phones.join(', ')}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="email" size={20} color={colors.primary} />
            <Text style={styles.infoText}>{institutionInfo?.contact.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} />
            <Text style={styles.infoText}>{institutionInfo?.contact.address}</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Apply button fixed at bottom */}
      <TouchableOpacity 
        style={[styles.applyButton, { backgroundColor: colors.primary }]}
        onPress={() => {
          // Handle apply action
          console.log('Apply button pressed');
        }}
      >
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

// Create a function that returns StyleSheet with dynamic colors
const makeStyles = (colors: any) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
    marginTop: 60,
  },
  header: {
    padding: 24,
    alignItems: 'center', 
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 12,
    color: colors.primary, // Assuming you have this in your theme
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: colors.subtext,
    textAlign: 'center',
    opacity: 0.85,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  programsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  programCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  programMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  programDuration: {
    fontSize: 14,
    color: colors.subtext,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  programLevel: {
    fontSize: 14,
    color: colors.subtext,
    fontStyle: 'italic',
  },
  programDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.subtext,
    textAlign: 'center',
    marginTop: 24,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  
  modalOverlayTouchable: {
    flex: 1,
  },
  
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    maxHeight: '85%',
  },
  
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  
   modalCard: {
    width: '90%', // Fixed width, not full screen
    maxHeight: '80%', // Maximum height
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 8,
  },
  
  modalContent: {
    marginTop: 10,
  },
  
  modalProgramName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  
  modalProgramMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  
  modalProgramDuration: {
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.secondary + '30', // Add opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  modalProgramLevel: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
  },
  
  modalProgramDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 20,
  },
  
  schoolInfoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  infoText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
  
  applyButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Fields;