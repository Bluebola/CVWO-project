"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CreatePostButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/posts/create");
  };

  return (
    <Button className="mt-2 " onClick={handleClick}>
      Create Post
    </Button>
  );
};

export default CreatePostButton;
