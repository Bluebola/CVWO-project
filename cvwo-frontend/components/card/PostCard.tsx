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
import { PiLineVerticalLight } from "react-icons/pi";
type PostCardProps = {
  id: number;
  title: string;
  content: string;
  category: string;
  username: string;
  comment_count: number;
};

function PostCard({
  id,
  title,
  content,
  category,
  username,
  comment_count,
}: PostCardProps) {
  return (
    <Card className="transition-colors duration-200 hover:bg-gray-100 my-4">
      <CardHeader className="hover:underline">
        <Link  href={`/posts/view/${id}`}>
          <CardTitle className="hover:underline">{title}</CardTitle>{" "}
          <CardDescription className="hover:underline mt-2">
            Category: {category}
          </CardDescription>
        </Link>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <div className="border-b border-gray-200 mb-2"></div>
      <CardFooter className="mt-5">
        <CardDescription>
          <p>Posted by: {username}</p>
        </CardDescription>
        <PiLineVerticalLight className="mx-1" size={22} />{" "}
        <CardDescription className="ml-1 ">
          <p>comment count: {comment_count}</p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default PostCard;