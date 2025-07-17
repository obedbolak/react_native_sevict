import { useTheme } from '@/context/themeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Post {
  _id: string;
  title: string;
  description?: string;
  images?: Array<{ public_id: string; url: string }>;
  createdAt?: string;
  postedBy?: { name: string };
}

interface FormData {
  title: string;
  content: string;
  image: string;
  author: string;
  tags: string;
}

const AddPost = () => {
  const { colors } = useTheme();
  const [fetchedPosts, setFetchedPosts] = React.useState<Post[]>([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [likedPosts, setLikedPosts] = React.useState<Set<string>>(new Set());
  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    content: '',
    image: '',
    author: '',
    tags: ''
  });

  const fetchPosts = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await axios.get('http://10.0.2.2:5000/api/v1/post/get-all-post');
      setFetchedPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to fetch posts');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async () => {
    if (!formData.title || !formData.author) {
      Alert.alert('Error', 'Please fill in at least the title and author fields');
      return;
    }

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.content);
      form.append('postedBy', formData.author);
      form.append('tags', formData.tags);
      
      if (formData.image) {
        if (formData.image.startsWith('file:')) {
          const localUri = formData.image;
          const filename = localUri.split('/').pop() || 'image.jpg';
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : 'image/jpg';
          
          form.append('images', {
            uri: localUri,
            name: filename,
            type
          } as any);
        } else {
          form.append('images', formData.image);
        }
      }

      await axios.post('http://10.0.2.2:5000/api/v1/post/create-post', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({
        title: '',
        content: '',
        image: '',
        author: '',
        tags: ''
      });
      setIsModalVisible(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post');
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to pick images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleInputChange('image', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleInputChange('image', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;
    return date.toLocaleDateString();
  };

  const renderPostItem = useCallback(({ item }: { item: Post }) => {
    const isLiked = likedPosts.has(item._id);
    const avatarColor = colors.primary;
    const initials = item.postedBy?.name?.charAt(0).toUpperCase() || 'A';

    return (
      <View style={[styles.postContainer, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.username, { color: colors.text }]}>
                {item.postedBy?.name || "Anonymous"}
              </Text>
              <Text style={[styles.timeAgo, { color: colors.subtext }]}>
                {formatTimeAgo(item.createdAt || Date.now().toString())}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons name="more-horiz" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Image */}
        {item.images?.[0]?.url && (
          <Image 
            source={{ uri: item.images[0].url }} 
            style={styles.postImage} 
            resizeMode="cover"
          />
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <View style={styles.leftActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => toggleLike(item._id)}
            >
              <MaterialIcons 
                name={isLiked ? "favorite" : "favorite-outline"} 
                size={26} 
                color={isLiked ? "#FF3040" : colors.text} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="chat-bubble-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="send" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Likes */}
        <View style={styles.likesContainer}>
          <Text style={[styles.likesText, { color: colors.text }]}>
            {Math.floor(Math.random() * 1000) + 1} likes
          </Text>
        </View>

        {/* Caption */}
        <View style={styles.captionContainer}>
          <Text style={[styles.captionText, { color: colors.text }]}>
            <Text style={styles.captionUsername}>
              {item.postedBy?.name || "Anonymous"}
            </Text>
            {' '}
            {item.title}
            {item.description && ` ${item.description}`}
          </Text>
        </View>

        {/* Comments */}
        <TouchableOpacity style={styles.commentsContainer}>
          <Text style={[styles.commentsText, { color: colors.subtext }]}>
            View all {Math.floor(Math.random() * 50) + 1} comments
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, [colors, likedPosts]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingBottom: 20,
    },
    createPostButton: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginHorizontal: 16,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    createPostButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    postContainer: {
      marginBottom: 20,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    avatarText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    userDetails: {
      flex: 1,
    },
    username: {
      fontSize: 16,
      fontWeight: '600',
    },
    timeAgo: {
      fontSize: 12,
      marginTop: 2,
    },
    moreButton: {
      padding: 8,
    },
    postImage: {
      width: screenWidth,
      height: screenWidth,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    leftActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      marginRight: 16,
    },
    likesContainer: {
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    likesText: {
      fontSize: 14,
      fontWeight: '600',
    },
    captionContainer: {
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    captionText: {
      fontSize: 14,
      lineHeight: 18,
    },
    captionUsername: {
      fontWeight: '600',
    },
    commentsContainer: {
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    commentsText: {
      fontSize: 14,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      width: '90%',
      maxHeight: '85%',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    modalContent: {
      
      paddingHorizontal: 20,
      
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    closeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.inputBackground,
    },
    formContainer: {
      gap: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
      paddingBottom: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 25,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
    },
    submitButton: {
      backgroundColor: colors.primary,
    },
    cancelButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    imageSection: {
      gap: 16,
    },
    imageButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 12,
    },
    imageButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 8,
    },
    imageButtonText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
    imagePreview: {
      position: 'relative',
      alignSelf: 'center',
      borderRadius: 12,
      overflow: 'hidden',
    },
    previewImage: {
      width: 250,
      height: 250,
      borderRadius: 12,
    },
    removeImageButton: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 15,
      width: 30,
      height: 30,
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchPosts}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <TouchableOpacity 
            style={styles.createPostButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.createPostButtonText}>+ Create New Post</Text>
          </TouchableOpacity>
        }
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Create New Post</Text>
                <TouchableOpacity 
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.formContainer}>
                <View>
                  <Text style={styles.label}>Caption *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.title}
                    onChangeText={(text) => handleInputChange('title', text)}
                    placeholder="Write a caption..."
                    placeholderTextColor={colors.subtext}
                    multiline={false}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Username *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.author}
                    onChangeText={(text) => handleInputChange('author', text)}
                    placeholder="Enter your username"
                    placeholderTextColor={colors.subtext}
                    multiline={false}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.content}
                    onChangeText={(text) => handleInputChange('content', text)}
                    placeholder="Tell your story..."
                    placeholderTextColor={colors.subtext}
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>

                <View>
                  <Text style={styles.label}>Photo</Text>
                  <View style={styles.imageSection}>
                    <TextInput
                      style={styles.input}
                      value={formData.image}
                      onChangeText={(text) => handleInputChange('image', text)}
                      placeholder="Enter image URL or use camera/gallery"
                      placeholderTextColor={colors.subtext}
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
                          <MaterialIcons name="close" size={18} color="white" />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    
                    <View style={styles.imageButtons}>
                      <TouchableOpacity 
                        style={styles.imageButton}
                        onPress={pickImage}
                      >
                        <MaterialIcons name="photo-library" size={20} color={colors.primary} />
                        <Text style={styles.imageButtonText}>Gallery</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.imageButton}
                        onPress={takePhoto}
                      >
                        <MaterialIcons name="camera-alt" size={20} color={colors.primary} />
                        <Text style={styles.imageButtonText}>Camera</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={styles.label}>Tags</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.tags}
                    onChangeText={(text) => handleInputChange('tags', text)}
                    placeholder="#hashtags #separated #by #spaces"
                    placeholderTextColor={colors.subtext}
                    multiline={false}
                  />
                </View>

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
                    <Text style={styles.submitButtonText}>Share</Text>
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