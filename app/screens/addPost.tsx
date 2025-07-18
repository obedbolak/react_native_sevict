import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
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

interface PostImage {
  public_id: string;
  url: string;
}

interface User {
  _id: string;
  name: string;
 
}
interface Post {
  _id: string;
  title: string;
  description: string;
  images: PostImage[];
  likes: number;
  postedBy: User;
}



const AddPost: React.FC = () => {
  const { token, user } = useAuth();
  const {colors} = useTheme();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [imagesUpdate, setImagesUpdate] = useState<string[]>([]);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
   
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://10.0.2.2:5000/api/v1/post/get-all-post");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      
      setPosts(data.posts || []);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch posts.");
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(
        `http://10.0.2.2:5000/api/v1/post/delete-post/${postId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== postId));
        Alert.alert("Deleted", "Post deleted successfully.");
      } else {
        Alert.alert("Error", "Failed to delete post.");
      }
    } catch {
      Alert.alert("Error", "Failed to delete post.");
    }
  };


  const handleUpdateByImage = async (postId: string) => {
  try {
    if (!images || images.length === 0) {
      Alert.alert("Error", "No images selected");
      return;
    }

    const formData = new FormData();
    const uniqueUris = new Set<string>();

    // Process images, ensuring no duplicates and proper format
    images.forEach((image: string | { uri: string }) => {
      let uri: string;
      
      // Handle both string and object formats
      if (typeof image === 'string') {
        uri = image;
      } else if ((image as { uri: string })?.uri) {
        uri = (image as { uri: string }).uri;
      } else {
        console.warn('Invalid image format:', image);
        return;
      }

      // Skip if we've already processed this URI
      if (uniqueUris.has(uri)) {
        return;
      }
      uniqueUris.add(uri);

      const filename = uri.split('/').pop() || `image_${Date.now()}`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('files', {
        uri,
        name: filename,
        type,
      } as unknown as Blob);
    });

    // Check if we actually have files to upload
    if (uniqueUris.size === 0) {
      Alert.alert("Error", "No valid images to upload");
      return;
    }

    const res = await fetch(
      `http://10.0.2.2:5000/api/v1/post/add-post-images/${postId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type - let React Native set it with boundary
        },
        body: formData,
      }
    );

    const response = await res.json();

    if (res.ok && response.success) {
      Alert.alert("Success", "Images added successfully");
      // Update local state if needed
      fetchPosts(); // Refresh posts list
      setImages([]); // Clear selected images
    } else {
      Alert.alert("Error", response.message || "Failed to add images");
    }
  } catch (error) {
    console.error("Error updating post by image:", error);
    Alert.alert("Error", "Failed to update post with images");
  }
};


  const handleEdit = (post: Post) => {
    setEditingPostId(post._id);
    setName(post.title);
    setDescription(post.description);
    setImages(post.images.map(img => img.url));
    setShowForm(true);
    // Add other fields as needed
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      Alert.alert("Error", "Please select at least one image.");
      return;
    }
    //check if editing post and image has been added to the images array
   
    try {
      let url = "http://10.0.2.2:5000/api/v1/post/create-post";
      let method = "POST";
      
      if (editingPostId) {
        url = `http://10.0.2.2:5000/api/v1/post/update-post/${editingPostId}`;
        method = "PUT";
        
        // For updates, send as JSON if no new images are being uploaded
        const hasNewImages = images.some(img => !img.startsWith('http'));
        
        if (!hasNewImages) {
          // Send JSON data for update without new images
          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: name,
              description: description,
            
            }),
          });

          const responseData = await response.json();

          if (response.ok && responseData.success) {
            Alert.alert("Success", "Post updated!");
            setName("");
            setDescription("");
            setImages([]);
            setEditingPostId(null);
            setShowForm(false);
            fetchPosts();
          } else {
            Alert.alert("Error", responseData.message || "Failed to update post.");
          }
          return;
        }
      }

      // Use FormData for create or update with new images
      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
    

      // Only append new images (not existing URLs)
      const newImages = images.filter(img => !img.startsWith('http'));
      newImages.forEach((uri, index) => {
        const type = uri.endsWith(".jpg") ? "image/jpeg" : "image/png";
        formData.append("files", {
          uri,
          name: `product_image${index + 1}.jpg`,
          type,
        } as any);
      });

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData, let the browser set it with boundary
        },
        body: formData,
      });

      const responseText = await response.text();
      const responseData = JSON.parse(responseText);

      if (response.ok && responseData.success) {
        Alert.alert("Success", editingPostId ? "Post updated!" : "Post created!");
        setName("");
        setDescription("");
        setImages([]);
        setEditingPostId(null);
        setShowForm(false);
        fetchPosts();
      } else {
        Alert.alert("Error", responseData.message || "Failed to submit post.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "There was an error while submitting the post.");
    }
  };


  const handleCancelForm = () => {
    setName("");
    setDescription("");
    setImages([]);
    setEditingPostId(null);
    setShowForm(false);
  };

  const pickImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
     if (editingPostId && result.assets) {
      setImagesUpdate(prev => [...prev, ...result.assets.map(asset => asset.uri)].slice(0, 5));
      handleUpdateByImage(editingPostId);
     }
    if (!result.canceled && result.assets) {
      setImages((prevImages) =>
        [...prevImages, ...result.assets.map((asset) => asset.uri)].slice(0, 5)
      );
    }
    
  }

  const renderImages = () => (
    <View style={styles.imageGridContainer}>
      {images.map((uri, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri }} style={styles.image} />
          <TouchableOpacity
            onPress={() => {
              const newImages = [...images];
              newImages.splice(index, 1);
              setImages(newImages);

              
                // Find the corresponding image object to get public_id
                const post = posts.find(p => p._id === editingPostId);
                const imgObj = post?.images.find(img => img.url === uri);
                if (imgObj) {
                  console.log("Deleting image with public_id:", imgObj.public_id);
                  handleDeletePostImage(imgObj.public_id);

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
        placeholder="Product Title"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor={colors.placeholder }
      />
      <TextInput
        placeholder="Product Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        placeholderTextColor={colors.placeholder }
      />
   
      <TextInput
        placeholder="Tags (comma separated)"
        value={tags}
        onChangeText={setTags}
        style={styles.input}
        placeholderTextColor={colors.placeholder }
      />
     
      {renderImages()}
      <View style={styles.formButtonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelForm }>
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
                name={post.likes > 0 ? "message" : "message-outline"} 
                size={16} 
                color={post.likes > 0 ? colors.destructive : colors.mutedForeground} 
              />
              <Text style={styles.likeCount}>
                {post.likes > 0 ? post.likes : ''}
              </Text>
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

// Add these styles to your StyleSheet


  const handleDeletePostImage = async (imageId: string) => {
    try {
      const res = await fetch(
        `http://10.0.2.2:5000/api/v1/post/delete-post-image/${editingPostId}/${imageId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setPosts(
          posts.map((p) => ({
            ...p,
            images: p.images.filter((img) => img.public_id !== imageId),
          }))
        );
        Alert.alert("Deleted", "Image deleted successfully.");
      } else {
        Alert.alert("Error", "Failed to delete image.");
      }
    } catch {
      Alert.alert("Error", "Failed to delete image.");
    }
  };

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