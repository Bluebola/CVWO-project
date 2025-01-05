import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type PostCardProps = {
  title: string;
  content: string;
  category: string;
  username: string;
};

function PostCard({ title, content, category, username }: PostCardProps) {
  return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Category: {category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <p>Posted by: {username}</p>
          </CardDescription>
        </CardFooter>
      </Card>
  );
}

export default PostCard;
