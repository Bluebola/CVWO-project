import React from "react";
import { isPostOwner, fetchPostById } from "@/utils/actions";
import PostCard from "@/components/card/PostCard";
import UserPostCard from "@/components/card/UserPostCard";
import RequireProfile from "@/components/requireProfile/RequireProfile";

interface UpdatePostProps {
  params: {
    id: number;
  };
}

async function PostPage({ params }: UpdatePostProps) {
  const { id } = params;
  const post = await fetchPostById(id);
  const isOwner = await isPostOwner(id);

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
            username={post.username}
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

    </RequireProfile>
  );
}

export default PostPage;
