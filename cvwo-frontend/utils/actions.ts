"use server";
// import { profileSchema, propertySchema } from "./schemas";
// import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { validateWithZodSchema } from "./schemas";
// import { imageSchema } from "./schemas";
// import { uploadImage } from "./supabase";

export const createProfileAction = async (
  prevState: any,
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
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await currentUser();
    if (!user) throw new Error("Please login to update your profile");
    const databaseUser = await fetchProfile();
    console.log("Database user:", databaseUser);
    try {
      const rawData = Object.fromEntries(formData);
      const response = await axios.put(`http://127.0.0.1:3000/api/user/${databaseUser.ID}`, {
        first_name: rawData.first_name,
        last_name: rawData.last_name,
        // Add other fields as necessary
      });
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
