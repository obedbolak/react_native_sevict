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

const AddPost: React.FC = () => {
  const { authToken, user } = useAuth();
  const { colors } = useTheme();
  const { 
    posts, 
    loading, 
    error,
    createPost, 
    updatePost, 
    deletePost,
    deletePostImage,
    addPostImages,
    refreshData
  } = usePosts();
  
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const pickImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      
      if (editingPostId) {
        // For editing, immediately upload new images
        try {
          await addPostImages(editingPostId, newImages);
          setImages(prev => [...prev, ...newImages].slice(0, 5));
        } catch (error) {
          Alert.alert("Error", "Failed to add images");
        }
      } else {
        // For new post, just add to local state
        setImages(prev => [...prev, ...newImages].slice(0, 5));
      }
    }
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      Alert.alert("Error", "Please select at least one image.");
      return;
    }

    try {
      if (editingPostId) {
        await updatePost(editingPostId, { title: name, description }, images);
      } else {
        await createPost({ title: name, description }, images);
      }
      
      // Reset form
      setName("");
      setDescription("");
      setImages([]);
      setEditingPostId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      Alert.alert("Success", "Post deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete post");
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!editingPostId) return;
    
    try {
      await deletePostImage(editingPostId, imageId);
      setImages(prev => prev.filter(uri => !uri.includes(imageId)));
    } catch (error) {
      console.error("Delete image error:", error);
      Alert.alert("Error", "Failed to delete image");
    }
  };

  type Post = {
    _id: string;
    title: string;
    description: string;
    images: { url: string; public_id: string }[];
    postedBy?: { _id: string; name?: string };
    likes: number;
  };
  
    const handleEdit = (post: Post) => {
      setEditingPostId(post._id);
      setName(post.title);
      setDescription(post.description);
      setImages(post.images.map(img => img.url));
      setShowForm(true);
    };

  const handleCancelForm = () => {
    setName("");
    setDescription("");
    setImages([]);
    setEditingPostId(null);
    setShowForm(false);
  };

  const renderImages = () => (
    <View style={styles.imageGridContainer}>
      {images.map((uri, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri }} style={styles.image} />
          <TouchableOpacity
            onPress={() => {
              // Find the corresponding image object to get public_id
              const post = posts.find(p => p._id === editingPostId);
              const imgObj = post?.images.find(img => img.url === uri);
              
              if (imgObj) {
                handleDeleteImage(imgObj.public_id);
              } else {
                // For newly added images not yet uploaded
                setImages(prev => prev.filter((_, i) => i !== index));
              }
            }}
            style={styles.imageDeleteButton}
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ))}
      {images.length < 5 && (
        <TouchableOpacity
          onPress={pickImages}
          style={[styles.imageContainer, styles.addImageButton]}
        >
          <MaterialIcons name="add-photo-alternate" size={32} color="#007bff" />
          <Text style={styles.addImageText}>Add Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>
        {editingPostId ? "Edit Post" : "Add New Post"}
      </Text>
      <TextInput
        placeholder="Post Title"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor={colors.placeholder}
      />
      <TextInput
        placeholder="Post Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        placeholderTextColor={colors.placeholder}
      />
     
      {renderImages()}
      <View style={styles.formButtonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelForm}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {editingPostId ? "Update Post" : "Post Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPosts = () => (
    <View style={styles.postsContainer}>
      {posts.map((post) => (
        <View key={post._id} style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{post.title}</Text>
            {user?._id === post.postedBy?._id && (
              <View style={styles.cardActions}>
                <TouchableOpacity 
                  onPress={() => handleEdit(post)}
                  style={styles.actionButton}
                >
                  <MaterialCommunityIcons 
                    name="pencil" 
                    size={16} 
                    color={colors.mutedForeground} 
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
          
          <Text style={styles.cardDescription}>{post.description}</Text>
          
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={styles.likeButton}>
                <MaterialCommunityIcons 
                  name={post.likes > 0 ? "heart" : "heart-outline"} 
                  size={16} 
                  color={post.likes > 0 ? colors.destructive : colors.mutedForeground} 
                />
                <Text style={styles.likeCount}>
                  {post.likes > 0 ? post.likes : ''}
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
            
            <Text style={styles.postedBy}>
              Posted by: {post.postedBy?.name || 'Unknown'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

   const styles = StyleSheet.create({
    postsContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  cardContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
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
    color: colors.foreground,
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.mutedForeground,
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
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  likeCount: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
  postedBy: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: colors.background,
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.text,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  productItem: {
    width: "33%",
    padding: 8,
  },
  productCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 8,
    borderColor: colors.border,
    borderWidth: 1,
  },
  productImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
    color: colors.text,
  },
  productDescription: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 4,
  },
  formContainer: {
    marginTop: 16,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
    color: colors.text,
  },
  postsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  postsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  createPostButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createPostButtonText: {
    color: colors.buttonText,
    fontWeight: "bold",
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: colors.inputBackground,
    color: colors.text,
  
  },
  categoryLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: colors.text,
  },
  picker: {
    marginBottom: 16,
    color: colors.text,
  },
  imageGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: (Dimensions.get("window").width - 52) / 4,
    height: (Dimensions.get("window").width - 52) / 4,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageDeleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: colors.error,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  addImageButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
  },
  addImageText: {
    color: colors.primary,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.text,
  },
  selectButton: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: colors.text,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
  },
  formButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.subtext,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: colors.buttonText,
    fontWeight: "bold",
  },
  submitButton: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.error,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 8,
  },
  submitButtonText: {
    color: colors.buttonText,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.error,
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
  },
  postCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderColor: colors.border,
    borderWidth: 1,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: colors.error,
    borderRadius: 5,
    padding: 10,
    
  },
});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postsHeader}>
        <Text style={styles.postsTitle}>Posts</Text>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => setShowForm(true)}
        >
          <MaterialIcons name="add" size={20} color="white" />
          <Text style={styles.createPostButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {showForm ? renderForm() : renderPosts()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPost;