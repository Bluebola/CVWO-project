import React from 'react';
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PiLineVerticalLight } from 'react-icons/pi';
import CommentDeleteButton from './CommentDeleteButton';
type CommentCardProps = { 
  commentId: number;
  content: string;
  username: string;
};

function UserCommentCard({ commentId, content, username }: CommentCardProps) {
  return (
    <Card className="transition-colors duration-200 hover:bg-gray-100  dark:hover:bg-gray-800 my-4">
      <CardHeader>
        <CardDescription>Comment: </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">Posted by: {username}</p>
        <PiLineVerticalLight className="mx-1" size={22} />{" "}
        <CommentDeleteButton commentId={commentId} />
      </CardFooter>
     
    </Card>
  );
}

export default UserCommentCard;