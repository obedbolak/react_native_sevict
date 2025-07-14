import { useTheme } from '@/context/themeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/Colors';

// Type definitions
interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  type: 'text' | 'image';
  tags: string[];
}

interface FormData {
  title: string;
  content: string;
  image: string;
  author: string;
  type: 'text' | 'image';
  tags: string;
}

const AddPost = () => {
  const{colors} = useTheme();
  // const [posts, setPosts] = React.useState<Post[]>([
  //   {
  //     id: '1',
  //     title: 'Getting Started with React Native',
  //     content: 'Here are some tips for beginners starting with React Native development...',
  //     author: 'Jane Doe',
  //     date: '2 hours ago',
  //     likes: 24,
  //     comments: 5,
  //     type: 'text' as const,
  //     tags: ['reactnative', 'beginners']
  //   },
  //   {
  //     id: '2',
  //     title: 'Beautiful Sunset',
  //     content: '',
  //     image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  //     author: 'John Smith',
  //     date: '1 day ago',
  //     likes: 142,
  //     comments: 18,
  //     type: 'image' as const,
  //     tags: ['photography', 'nature']
  //   },
  //   // Add more posts as needed
  // ]);
const [fetchedPosts, setFetchedPosts] = React.useState<Post[]>([]);
  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  
  // State for form data
  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    content: '',
    image: '',
    author: '',
    type: 'text' as const,
    tags: ''
  });

  // Handle form submission
  const handleCreatePost = () => {
    if (!formData.title || !formData.author) {
      Alert.alert('Error', 'Please fill in at least the title and author fields');
      return;
    }

   
    
    setFormData({
      title: '',
      content: '',
      image: '',
      author: '',
      type: 'text' as const,
      tags: ''
    });
    setIsModalVisible(false);
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to get random Unsplash image
  const getRandomUnsplashImage = (width: number = 800, height: number = 600, query: string = '') => {
    const baseUrl = 'https://images.unsplash.com';
    const params = new URLSearchParams({
      w: width.toString(),
      h: height.toString(),
      q: '80',
      fm: 'jpg',
      fit: 'crop'
    });
    
    if (query) {
      return `${baseUrl}/photo-${Date.now()}?${params}&query=${encodeURIComponent(query)}`;
    }
    
    // List of popular Unsplash photo IDs for variety
    const photoIds = [
      '1506905925346-21bda4d32df4', // sunset
      '1518837695005-2083093ee35b', // mountain
      '1441974231531-c6227db76b6e', // ocean
      '1506905925346-21bda4d32df4', // nature
      '1469474968028-56623f02e42e', // city
      '1517077304055-6e89abbf09b0', // sky
      '1524504388940-b1c1fe6b5f1d', // flowers
      '1546026423-cc4642628d2b', // forest
      '1502134249126-9f3755a50d78', // beach
      '1518837695005-2083093ee35b'  // landscape
    ];
    
    const randomId = photoIds[Math.floor(Math.random() * photoIds.length)];
    return `${baseUrl}/photo-${randomId}?${params}`;
  };

  // Handle image picker
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to pick images.');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleInputChange('image', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  // Handle camera
  const takePhoto = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos.');
        return;
      }

      // Take photo
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleInputChange('image', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  // Handle random Unsplash image
  const addRandomUnsplashImage = () => {
    const randomImage = getRandomUnsplashImage();
    handleInputChange('image', randomImage);
  };

      interface Post {
  _id: string;
  title: string;
  description?: string;
  images?: Array<{ public_id: string; url: string }>;
  createdAt?: string;
  postedBy?: { name: string };
}

const renderPostItem = ({ item }: { item: Post }) => (
  <View style={styles.postContainer} key={item._id}>
    <View style={styles.postHeader}>
      <Text style={styles.postAuthor}>
        {item.postedBy?.name || "Anonymous"}
      </Text>
      <Text style={styles.postDate}>
        {new Date(item.createdAt || Date.now()).toLocaleDateString()}
      </Text>
    </View>
    
    <Text style={styles.postTitle}>{item.title}</Text>
    
    {item.description && (
      <Text style={styles.postContent}>{item.description}</Text>
    )}
    
    {item.images?.[0]?.url && (
      <Image 
        source={{ uri: item.images[0].url }} 
        style={styles.postImage} 
      />
    )}
    
    <View style={styles.postFooter}>
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="favorite-outline" size={20} color={Colors.light.icon} />
        <Text style={styles.actionText}>2</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="chat-bubble-outline" size={20} color={Colors.light.icon} />
        <Text style={styles.actionText}>3</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="share" size={20} color={Colors.light.icon} />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
    </View>
  </View>
);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:5000/api/v1/post/get-all-post');
        const data = await response.data.posts;
        setFetchedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
    
  }, []);


  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  createPostButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,  
    alignItems: 'center',
    marginBottom: 16,
  },
  createPostButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',   
  },
  postContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,

  },
  postDate: {
    fontSize: 12,
    color: colors.subtext, 
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: colors.subtext,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#6c757d',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },  
  actionText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Image picker styles
  imageSection: {
    gap: 12,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    gap: 6,
  },
  imageButtonText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  imagePreview: {
    position: 'relative',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

  return (
    <View style={styles.container}>
      
  
<FlatList
  data={fetchedPosts}
  renderItem={renderPostItem}
  keyExtractor={(item) => item._id}
  contentContainerStyle={styles.listContent}
  ListHeaderComponent={
    <>
      <TouchableOpacity 
        style={styles.createPostButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.createPostButtonText}>Create New Post</Text>
      </TouchableOpacity>

      {fetchedPosts.map((post: Post) => renderPostItem({ item: post }))}
    </>
  }
/>

      {/* Create Post Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Create New Post</Text>
                <TouchableOpacity 
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.label}>Title *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.title}
                  onChangeText={(text) => handleInputChange('title', text)}
                  placeholder="Enter post title"
                  multiline={false}
                />

                <Text style={styles.label}>Author *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.author}
                  onChangeText={(text) => handleInputChange('author', text)}
                  placeholder="Enter your name"
                  multiline={false}
                />

                <Text style={styles.label}>Content</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.content}
                  onChangeText={(text) => handleInputChange('content', text)}
                  placeholder="Write your post content here..."
                  multiline={true}
                  numberOfLines={4}
                />

                <Text style={styles.label}>Image</Text>
                <View style={styles.imageSection}>
                  <TextInput
                    style={styles.input}
                    value={formData.image}
                    onChangeText={(text) => handleInputChange('image', text)}
                    placeholder="Enter image URL or use options below"
                    multiline={false}
                  />
                  
                  {formData.image ? (
                    <View style={styles.imagePreview}>
                      <Image 
                        source={{ uri: formData.image }} 
                        style={styles.previewImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity 
                        style={styles.removeImageButton}
                        onPress={() => handleInputChange('image', '')}
                      >
                        <MaterialIcons name="close" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  
                  <View style={styles.imageButtons}>
                    <TouchableOpacity 
                      style={styles.imageButton}
                      onPress={pickImage}
                    >
                      <MaterialIcons name="photo-library" size={20} color={Colors.light.primary} />
                      <Text style={styles.imageButtonText}>Gallery</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.imageButton}
                      onPress={takePhoto}
                    >
                      <MaterialIcons name="camera-alt" size={20} color={Colors.light.primary} />
                      <Text style={styles.imageButtonText}>Camera</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.imageButton}
                      onPress={addRandomUnsplashImage}
                    >
                      <MaterialIcons name="shuffle" size={20} color={Colors.light.primary} />
                      <Text style={styles.imageButtonText}>Random</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.label}>Tags (comma-separated)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.tags}
                  onChangeText={(text) => handleInputChange('tags', text)}
                  placeholder="e.g., reactnative, javascript, mobile"
                  multiline={false}
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.submitButton]}
                    onPress={handleCreatePost}
                  >
                    <Text style={styles.submitButtonText}>Create Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};
export default AddPost;
