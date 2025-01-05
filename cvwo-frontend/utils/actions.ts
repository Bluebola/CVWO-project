"use server";
// import { profileSchema, propertySchema } from "./schemas";
// import db from "./db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { validateWithZodSchema } from "./schemas";
// import { imageSchema } from "./schemas";
// import { uploadImage } from "./supabase";

export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    console.log(
      "The try block is running, the action is actually being submitted."
    );
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");
    const clerk = await clerkClient();
    const rawData = Object.fromEntries(formData);
    //   const validatedFields = validateWithZodSchema(profileSchema, rawData);
    const response = await axios.post("http://127.0.0.1:3000/api/user", {
      clerk_id: user.id,
      email: user.emailAddresses[0].emailAddress,
      first_name: rawData.first_name,
      last_name: rawData.last_name,
    });
    console.log("User created:", response.data);
    await clerk.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
    return {
      message: "Profile created successfully",
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  } finally {
    redirect("/");
  }
};

export const updateProfileAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();
  if (!user) throw new Error("Please login to update your profile");
  const databaseUser = await fetchProfile();
  console.log("Database user:", databaseUser);
  try {
    const rawData = Object.fromEntries(formData);
    const response = await axios.put(
      `http://127.0.0.1:3000/api/user/${databaseUser.ID}`,
      {
        first_name: rawData.first_name,
        last_name: rawData.last_name,
        // Add other fields as necessary
      }
    );
    console.log("User updated:", response.data);

    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to access this route");
  if (!user.privateMetadata.hasProfile) {
    redirect("/profile/create");
  }
  return user;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  try {
    const response = await axios.get("http://127.0.0.1:3000/api/user");
    const users = response.data;

    // Find the user with the matching clerk_id
    const userProfile = users.find((u: any) => u.clerk_id === user.id);

    if (!userProfile) {
      throw new Error("Profile not found");
    }

    return userProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
};

export const fetchProfileByUserID = async (userID: string | number) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/user/${userID}`);
    const userProfile = response.data;
    return userProfile;
  } catch (error) {
    console.error("Error fetching profile by userID:", error);
    throw new Error("Failed to fetch profile by userID");
  }
};

// type Post struct {
// 	ID           uint      `json:"id" gorm:"primaryKey"`
// 	Title        string    `json:"title" gorm:"not null"`
// 	Content      string    `json:"content" gorm:"type:text;not null"`
// 	DateTime     time.Time `json:"date_time" gorm:"autoCreateTime"`
// 	Category     string    `json:"category" gorm:"not null"`
// 	UserID       uint      `json:"user_id" gorm:"not null"` // Foreign key to User
// 	CommentCount int       `json:"comment_count" gorm:"default:0"`
// }

export const createPostAction = async (prevState: unknown, formData: FormData) => {
  try {
    console.log(
      "The try block is running, the action is actually being submitted."
    );
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a post");
    const databaseUser = await fetchProfile();
    const rawData = Object.fromEntries(formData);
    // console.log("Raw data:", rawData);
    const response = await axios.post("http://127.0.0.1:3000/api/post", {
      title: rawData.title,
      content: rawData.content,
      date_time: new Date().toISOString(), // Assuming the server will handle the correct format
      category: rawData.category,
      user_id: databaseUser.ID,
      comment_count: 0, // Default value
    });
    console.log("Post created:", response.data);

    return {
      message: "Post created successfully",
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const fetchPostsAction = async () => {
  try {
    // console.log("try block is runnindwag!!!!!!!!!!!!!!!");
    const response = await axios.get("http://127.0.0.1:3000/api/post");
    const posts = response.data;
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};

export const fetchUserPostAction = async () => {
  try {
    // console.log("try block is running");
    const user = await currentUser();
    if (!user) throw new Error("Please login to fetch your posts");
    const databaseUser = await fetchProfile();
    const allPosts = await fetchPostsAction();
    const userPosts = allPosts.filter((post: { user_id: number; }) => post.user_id === databaseUser.ID);
    return userPosts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
};

// deletePostAction deletes a post with the given ID
export const deletePostAction = async (postId: number) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:3000/api/post/${postId}`);
    console.log("Post deleted:", response.data);
    return {
      message: "Post deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

// updatePostAction updates a post with the given form data
export const updatePostAction = async (prevState: unknown, formData: FormData) => {
  try {
    console.log("FormData Content:", formData);
    const rawData = Object.fromEntries(formData);
    const postId = rawData.id;
    console.log("Updating post with ID:", postId);
    const response = await axios.put(`http://127.0.0.1:3000/api/post/${postId}`, {
      title: rawData.title,
      content: rawData.content,
      category: rawData.category,
    });
    console.log("Post updated:", response.data);
    return {
      message: "Post updated successfully",
    };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  } finally {
    redirect("/posts/userPosts");
  }
};

// fetchPostById fetches a single post by its ID
export const fetchPostById = async (postId: number) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/post/${postId}`);
    const post = response.data;
    return post;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Failed to fetch post");
  }
};

//Check if post's user_id matches the current user's ID
export const isPostOwner = async (postId: number) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to check ownership");
    // get the current logged in user from the database
    const databaseUser = await fetchProfile();
    // get the post by ID
    const post = await fetchPostById(postId);
    // check if the post's user_id matches the current user's ID
    return post.user_id === databaseUser.ID;
  } catch (error) {
    console.error("Error checking post ownership:", error);
    return false;
  }
};

// Get all comments for a post
export const fetchCommentsAction = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/comment`);
    const comments = response.data;
    return comments;
  } catch (error) {
    console.error("Error fetching comments by post ID:", error);
    throw new Error("Failed to fetch comments");
  }
};

// Get comments for a specific post by its ID
export const fetchCommentsById = async (postId: number) => {
  try {
    const allComments = await fetchCommentsAction();
    const postComments = allComments.filter((comment: { post_id: number }) => comment.post_id === Number(postId));
    return postComments;
  } catch (error) {
    console.error("Error fetching comments by post ID:", error);
    throw new Error("Failed to fetch comments");
  }
};