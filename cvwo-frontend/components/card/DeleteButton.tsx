"use client"; // Mark this file as a client component

import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type DeleteButtonProps = {
  postId: number;
};

function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter(); // Use the useRouter hook
  const handleDeleteClick = async () => {
    const result = await deletePostAction(postId);
    toast({
      description: `${result.message}`,
    });
    console.log(`Delete post with ID: ${postId}`);
    router.refresh(); // Refresh the page to reflect the changes
  };

  return (
    <Button
      onClick={handleDeleteClick}
      className="flex items-center text-gray-500 hover:text-gray-700 p-0"
      title="Press this to delete your post"
      variant="ghost"
    >
      <MdDeleteOutline />
      <span className=" hover:text-gray-700 ml-0 pl-0">delete</span>
    </Button>
  );
}

export default DeleteButton;
