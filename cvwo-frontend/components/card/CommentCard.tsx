import React from 'react';
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

type CommentCardProps = {
  content: string;
  username: string;
};

function CommentCard({ content, username }: CommentCardProps) {
  return (
    <Card className="transition-colors duration-200 hover:bg-gray-100  dark:hover:bg-gray-800 my-4">
      <CardHeader>
        <CardDescription>Comment: This is normal comment card </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">Posted by: {username}</p>
      </CardFooter>
    </Card>
  );
}

export default CommentCard;