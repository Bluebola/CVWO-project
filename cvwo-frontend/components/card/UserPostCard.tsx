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
import { FaRegEdit } from "react-icons/fa";
import { PiLineVerticalLight } from "react-icons/pi";
import DeleteButton from "./DeleteButton";
import { Separator } from "../ui/separator";
type PostCardProps = {
  id: number;
  title: string;
  content: string;
  category: string;
  username: string;
  comment_count: number;
};

function UserPostCard({
  id,
  title,
  content,
  category,
  username,
  comment_count,
}: PostCardProps) {
  return (
    <Card className="transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 my-4">
      <CardHeader className="hover:underline">
        <Link href={`/posts/view/${id}`}>
          <CardTitle className="hover:underline">{title}</CardTitle>{" "}
          <CardDescription className="hover:underline mt-2">
            Category: {category}
          </CardDescription>
        </Link>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="mt-5">
        <CardDescription>
          <p>Posted by: {username}</p>
        </CardDescription>
        <PiLineVerticalLight className="mx-1" size={22} />{" "}
        <CardDescription className="ml-1 ">
          <p>comment count: {comment_count}</p>
        </CardDescription>
        <PiLineVerticalLight className="mx-1" size={22} />{" "}
        {/* edit link goes here */}
        <Link
          href={`/posts/edit/${id}`}
          className="flex items-center text-gray-500 hover:text-gray-700"
          title="Press this to edit your post"
        >
          <FaRegEdit />
          <CardDescription className="ml-2  hover:text-gray-700">
            <p>edit</p>
          </CardDescription>
        </Link>
        <PiLineVerticalLight className="mx-1" size={22} />{" "}
        <DeleteButton postId={id} />
      </CardFooter>
    </Card>
  );
}

export default UserPostCard;
