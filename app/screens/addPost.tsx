import { useAuth } from "@/context/authContext";
import { usePosts } from "@/context/postContext";
import { useTheme } from "@/context/themeContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PostImage = {
  public_id: string;
  url: string;
  _id: string;
};

type Post = {
  _id: string;
  title: string;
  description: string;
  images: PostImage[];
  postedBy?: { _id: string; name?: string };
  likes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const AddPost: React.FC = () => {
  const { authToken, user } = useAuth();
  const { colors } = useTheme();
  const { 
    posts, 
    createPost, 
    updatePost, 
    deletePost,
    deletePostImage,
    refreshData
  } = usePosts();
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tempImages, setTempImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<PostImage[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const pickImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Please allow access to your photos to select images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5 - existingImages.length - tempImages.length,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      setTempImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmit = async () => {
    if (tempImages.length === 0 && existingImages.length === 0) {
      Alert.alert("Error", "Please select at least one image");
      return;
    }

    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingPostId) {
        await updatePost(
          editingPostId, 
          { title, description },
          tempImages
        );
      } else {
        await createPost({ title, description }, tempImages);
      }
      
      handleCancelForm();
      Alert.alert("Success", editingPostId ? "Post updated successfully" : "Post created successfully");
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Failed to save post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(postId);
              refreshData();
            } catch (error) {
              console.error("Delete error:", error);
              Alert.alert("Error", "Failed to delete post");
            }
          }
        }
      ]
    );
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!editingPostId) return;
    
    try {
      await deletePostImage(editingPostId, imageId);
      setExistingImages(prev => prev.filter(img => img.public_id !== imageId));
      refreshData();
    } catch (error) {
      console.error("Delete image error:", error);
      Alert.alert("Error", "Failed to delete image");
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post._id);
    setTitle(post.title);
    setDescription(post.description);
    setExistingImages(post.images);
    setTempImages([]);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setTitle("");
    setDescription("");
    setTempImages([]);
    setExistingImages([]);
    setEditingPostId(null);
    setShowForm(false);
  };

  const renderImages = () => (
    <View style={styles.imageGridContainer}>
      {existingImages.map((image) => (
        <View key={image.public_id} style={styles.imageContainer}>
          <Image source={{ uri: image.url }} style={styles.image} />
          <TouchableOpacity
            onPress={() => handleDeleteImage(image.public_id)}
            style={styles.imageDeleteButton}
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ))}
      
      {tempImages.map((uri, index) => (
        <View key={`temp-${index}`} style={styles.imageContainer}>
          <Image source={{ uri }} style={styles.image} />
          <TouchableOpacity
            onPress={() => {
              setTempImages(prev => prev.filter((_, i) => i !== index));
            }}
            style={styles.imageDeleteButton}
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ))}
      
      {(existingImages.length + tempImages.length) < 5 && (
        <TouchableOpacity
          onPress={pickImages}
          style={[styles.imageContainer, styles.addImageButton]}
          disabled={isSubmitting}
        >
          <MaterialIcons 
            name="add-photo-alternate" 
            size={32} 
            color={colors.primary} 
          />
          <Text style={[styles.addImageText, { color: colors.primary }]}>
            Add Image
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderForm = () => (
    <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.formTitle, { color: colors.text }]}>
        {editingPostId ? "Edit Post" : "Create New Post"}
      </Text>
      
      <TextInput
        placeholder="Post Title"
        placeholderTextColor={colors.placeholder}
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { 
          borderColor: colors.border,
          backgroundColor: colors.inputBackground,
          color: colors.text
        }]}
        editable={!isSubmitting}
      />
      
      <TextInput
        placeholder="Post Description"
        placeholderTextColor={colors.placeholder}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { 
          borderColor: colors.border,
          backgroundColor: colors.inputBackground,
          color: colors.text,
          minHeight: 100,
          textAlignVertical: 'top'
        }]}
        multiline
        editable={!isSubmitting}
      />
     
      {renderImages()}
      
      <View style={styles.formButtonContainer}>
        <TouchableOpacity 
          style={[styles.cancelButton, { backgroundColor: colors.link }]}
          onPress={handleCancelForm}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.submitButton, { 
            backgroundColor: isSubmitting ? colors.mutedForeground : colors.primary,
            opacity: isSubmitting ? 0.7 : 1
          }]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Processing..." : (editingPostId ? "Update" : "Post")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPosts = () => (
    <View style={styles.postsContainer}>
      {posts.map((post ) => (
        <View key={post._id} style={[styles.cardContainer, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{post.title}</Text>
            
            {user?._id === post.postedBy?._id && (
              <View style={styles.cardActions}>
                <TouchableOpacity 
                  onPress={() =>{}}
                  style={styles.actionButton}
                >
                  <MaterialCommunityIcons 
                    name="pencil" 
                    size={16} 
                    color={colors.primary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDelete(post._id)}
                  style={styles.actionButton}
                >
                  <MaterialCommunityIcons 
                    name="trash-can-outline" 
                    size={16} 
                    color={colors.destructive} 
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <Text style={[styles.cardDescription, { color: colors.mutedForeground }]}>
            {post.description}
          </Text>
          
          {post.images.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardImageContainer}
            >
              {post.images.map((image) => (
                <Image
                  key={image.public_id}
                  source={{ uri: image.url }}
                  style={styles.cardImage}
                />
              ))}
            </ScrollView>
          )}
          
          <View style={styles.cardFooter}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <TouchableOpacity style={styles.likeButton}>
                <MaterialCommunityIcons 
                  name={ "heart-outline"} 
                  size={16} 
                  color={colors.mutedForeground} 
                />
                <Text style={[styles.likeCount, { color: colors.mutedForeground }]}>
                  0
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.likeButton}>
                <MaterialCommunityIcons 
                  name="message-outline" 
                  size={16} 
                  color={colors.mutedForeground} 
                />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.postedBy, { color: colors.mutedForeground }]}>
              Posted by: {post.postedBy?.name || 'Unknown'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.postsHeader}>
        <Text style={[styles.postsTitle, { color: colors.text }]}>Posts</Text>
        
        {!showForm && (
          <TouchableOpacity
            style={[styles.createPostButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowForm(true)}
          >
            <MaterialIcons name="add" size={20} color="white" />
            <Text style={styles.createPostButtonText}>Create Post</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {showForm ? renderForm() : renderPosts()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  postsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  postsTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  createPostButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createPostButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 4,
  },
  formContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  imageGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  imageContainer: {
    width: (Dimensions.get("window").width - 64) / 3,
    height: (Dimensions.get("window").width - 64) / 3,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageDeleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,0,0,0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageText: {
    fontSize: 12,
    marginTop: 4,
  },
  formButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  postsContainer: {
    gap: 16,
  },
  cardContainer: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  cardImageContainer: {
    gap: 8,
    marginBottom: 16,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeCount: {
    fontSize: 14,
  },
  postedBy: {
    fontSize: 12,
  },
});

export default AddPost;