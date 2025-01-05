import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

type CommentCardProps = {
  content: string;
  username: string;
};

function CommentCard({ content, username }: CommentCardProps) {
  return (
    <Card className="transition-colors duration-200 hover:bg-gray-100 my-4">
      <CardHeader>
        <CardDescription>Comment: </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p>Posted by: {username}</p>
      </CardFooter>
    </Card>
  );
}

export default CommentCard;