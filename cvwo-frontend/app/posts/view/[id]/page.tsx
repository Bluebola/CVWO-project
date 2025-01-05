import React from "react";
import {
  isPostOwner,
  fetchPostById,
  fetchProfileByUserID,
} from "@/utils/actions";
import PostCard from "@/components/card/PostCard";
import UserPostCard from "@/components/card/UserPostCard";
import CommentCard from "@/components/card/CommentCard";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { fetchCommentsById } from "@/utils/actions";
import { fetchCommentsAction } from "@/utils/actions";
interface UpdatePostProps {
  params: {
    id: number;
  };
}

async function PostPage({ params }: UpdatePostProps) {
  const { id } = await params;
  const post = await fetchPostById(id);
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
          (comment: { id: number; content: string; username: string }) => (
            <CommentCard
              key={comment.id}
              content={comment.content}
              username={comment.username}
            />
          )
        )}
      </div>
    </RequireProfile>
  );
}

export default PostPage;
