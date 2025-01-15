"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { commentSchema, postSchema, profileSchema } from "./schemas";
import { ZodError } from "zod";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use the environment variable
});

export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    console.log(
      "create profile action is running, the action is actually being submitted."
    );
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");
    const clerk = await clerkClient();
    const rawData = Object.fromEntries(formData);
    // Validate rawData using Zod
    const validatedFields = profileSchema.parse({
      firstName: rawData.first_name,
      lastName: rawData.last_name,
    });

    // Make API request
    const response = await axiosInstance.post("/user", {
      clerk_id: user.id,
      email: user.emailAddresses[0].emailAddress,
      first_name: validatedFields.firstName,
      last_name: validatedFields.lastName,
    });
    console.log("User IS BEING created:", response.data);
    await clerk.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
    return {
      message: "Profile created successfully. You may now create, view, edit and comment on posts.",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      return { message: errorMessages.join(", ") };
    }
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  } finally {
    setTimeout(() => redirect("/"), 1500);
  }
};

export const updateProfileAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await currentUser();
  if (!user) throw new Error("Please login to update your profile");
  const databaseUser = await fetchProfile();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse({
      firstName: rawData.first_name,
      lastName: rawData.last_name,
    });
    const response = await axiosInstance.put(`/user/${databaseUser.ID}`, {
      first_name: validatedFields.firstName,
      last_name: validatedFields.lastName,
      // Add other fields as necessary
    });
    console.log("Profile updated:", response.data);
    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      return { message: errorMessages.join(", ") };
    }
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to access this route");
  if (!user.privateMetadata.hasProfile) {
    redirect("/profile/create");
  }
  return user;
};

export const hasUserProfile = async (): Promise<boolean> => {
  // console.log("hasUserProfile function is running");
  const user = await currentUser();
  if (!user) {
    return false;
  }

  try {
    const response = await axiosInstance.get("/user");
    const users = response.data;

    // Find the user with the matching clerk_id
    const userProfile = users.find((u: any) => u.clerk_id === user.id);

    return !!userProfile; // Return true if userProfile exists, otherwise false
  } catch (error) {
    console.error("Error checking user profile:", error);
    return false;
  }
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  try {
    const response = await axiosInstance.get("/user");
    const users = response.data;

    // Find the user with the matching clerk_id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const fetchProfileForHome = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const response = await axiosInstance.get("/user");
    const users = response.data;

    // Find the user with the matching clerk_id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userProfile = users.find((u: any) => u.clerk_id === user.id);

    if (!userProfile) {
      console.log(
        "Profile not found, log thrown from fetchProfileForHome function"
      );
      return null;
    } else {
      console.log("Profile found, log thrown from fetchProfileForHome function");
    }

    return userProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
};

export const fetchProfileByUserID = async (userID: string | number) => {
  try {
    console.log("fetchProfileByUserID function is running");
    const response = await axiosInstance.get(`/user/${userID}`);
    const userProfile = response.data;
    return userProfile;
  } catch (error) {
    console.error("Error fetching profile by userID:", error);
    throw new Error("Failed to fetch profile by userID");
  }
};

export const createPostAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    // console.log(
    //   "The try block is running, the action is actually being submitted."
    // );
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a post");
    const databaseUser = await fetchProfile();
    const rawData = Object.fromEntries(formData);
    // console.log("Raw data:", rawData);

    // Validate the form data
    const validatedFields = postSchema.parse({
      title: rawData.title,
      content: rawData.content,
    });

    const response = await axiosInstance.post("/post", {
      title: validatedFields.title,
      content: validatedFields.content,
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
    //if it is an error from validation, return this error message instead.
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      return { message: errorMessages.join(", ") };
    }
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const fetchPostsAction = async () => {
  try {
    // console.log("try block is runnindwag!!!!!!!!!!!!!!!");
    const response = await axiosInstance.get("/post");
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
    const userPosts = allPosts.filter(
      (post: { user_id: number }) => post.user_id === databaseUser.ID
    );
    return userPosts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
};

// deletePostAction deletes a post with the given ID
export const deletePostAction = async (postId: number) => {
  try {
    const response = await axiosInstance.delete(`/post/${postId}`);
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
export const updatePostAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    // console.log("FormData Content:", formData);
    const rawData = Object.fromEntries(formData);
    const postId = rawData.id;
    // console.log("Updating post with ID:", postId);

    const validatedFields = postSchema.parse({
      title: rawData.title,
      content: rawData.content,
    });
    const response = await axiosInstance.put(`/post/${postId}`, {
      title: validatedFields.title,
      content: validatedFields.content,
      category: rawData.category,
    });
    console.log("Post updated:", response.data);
    return {
      message: "Post updated successfully",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      return { message: errorMessages.join(", ") };
    }
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
    const response = await axiosInstance.get(`/post/${postId}`);
    const post = response.data;
    return post;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Failed to fetch post");
  }
};

// Fetch posts by category
export const fetchPostByCategory = async (category: string) => {
  try {
    const allPosts = await fetchPostsAction();
    const filteredPosts = allPosts.filter(
      (post: { category: string }) => post.category === category
    );
    return filteredPosts;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
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
    const response = await axiosInstance.get(`/comment`);
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
    const postComments = allComments.filter(
      (comment: { post_id: number }) => comment.post_id === Number(postId)
    );
    return postComments;
  } catch (error) {
    console.error("Error fetching comments by post ID:", error);
    throw new Error("Failed to fetch comments");
  }
};

// Delete a comment by its ID
export const deleteCommentAction = async (commentId: number) => {
  try {
    await axiosInstance.delete(`/comment/${commentId}`);
    return {
      message: "Comment deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

// Create a new comment
export const createCommentAction = async (
  prevState: unknown,
  formData: FormData
) => {
  // const postID = Object.fromEntries(formData).post_id;
  try {
    console.log(
      "The try block is running, the action is actually being submitted. This is the createCommentAction"
    );
    const user = await currentUser();
    const databaseUser = await fetchProfile();
    if (!user) throw new Error("Please login to create a comment");

    const rawData = Object.fromEntries(formData);
    // console.log("Raw Data:", rawData); // Log the raw data for debugging
    // console.log(databaseUser);
    // Validate the form data
    const validatedFields = commentSchema.parse({
      content: rawData.content,
    });
    const response = await axiosInstance.post("/comment", {
      user_id: databaseUser.ID,
      post_id: Number(rawData.post_id),
      content: validatedFields.content,
    });
    console.log("Comment created:", response.data);
    return {
      message: "Comment created successfully",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      return { message: errorMessages.join(", ") };
    }
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};
