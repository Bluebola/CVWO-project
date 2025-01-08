import React from "react";
import {
  isPostOwner,
  fetchPostById,
  fetchProfileByUserID,
  fetchProfile,
} from "@/utils/actions";
import PostCard from "@/components/card/PostCard";
import UserPostCard from "@/components/card/UserPostCard";
import CommentCard from "@/components/card/CommentCard";
import UserCommentCard from "@/components/card/UserCommentCard";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { fetchCommentsById } from "@/utils/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface UpdatePostProps {
  params: {
    id: number;
  };
}

async function PostPage({ params }: UpdatePostProps) {
  const { id } = await params;
  //obtain currentUser - to check if user is owner of comment
  const currentUser = await fetchProfile();
  const post = await fetchPostById(id);
  // check if user is owner of post
  const isOwner = await isPostOwner(id);
  const comments = await fetchCommentsById(id);
  const user = await fetchProfileByUserID(post.user_id);
  const name = user.first_name + " " + user.last_name;
  return (
    <RequireProfile>
      <div>Post: </div>
      <div>
        {isOwner ? (
          <UserPostCard
            id={post.id}
            title={post.title}
            content={post.content}
            category={post.category}
            username={name}
            comment_count={post.comment_count}
          />
        ) : (
          <PostCard
            id={post.id}
            title={post.title}
            content={post.content}
            category={post.category}
            username={post.username}
            comment_count={post.comment_count}
          />
        )}
      </div>
      <div>Comments: </div>
      <div>
        {comments.map(
          (comment: {
            id: number;
            content: string;
            user: { ID: number; first_name: string; last_name: string };
          }) => {
            return comment.user.ID === Number(currentUser.ID) ? (
              <UserCommentCard
                key={comment.id}
                commentId={comment.id}
                content={comment.content}
                username={`${comment.user.first_name} ${comment.user.last_name}`}
              />
            ) : (
              <CommentCard
                key={comment.id}
                content={comment.content}
                username={`${comment.user.first_name} ${comment.user.last_name}`}
              />
            );
          }
        )}
      </div>
      <div className="mt-4">
        <Link href={`/comments/create/${post.id}`}>
          <Button variant="default">Add Comment</Button>
        </Link>
      </div>
    </RequireProfile>
  );
}

export default PostPage;
