import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string().min(2, { message: " The minimum length for the firstname input is 2 characters. Please input more characters" }),
    lastName: z.string().min(2, { message: " The minimum length for the lastname input is 2 characters. Please input more characters" }),
  });
  
  export const postSchema = z.object({
    title: z.string().min(2, { message: "The minimum length for the title input is 2 characters. Please input more characters" }),
    content: z.string().min(2, { message: "The minimum length for the content input is 2 characters. Please input more characters" }),
  });

  export const commentSchema = z.object({
    content: z.string().min(2, { message: "The minimum length for the content input is 2 characters. Please input more characters" }),
  });