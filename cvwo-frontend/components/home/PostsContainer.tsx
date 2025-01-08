import React from "react";
import PostCard from "@/components/card/PostCard";
import { fetchPostByCategory, fetchPostsAction } from "@/utils/actions";

type PostsContainerProps = {
  category: string;
};

const PostsContainer: React.FC<PostsContainerProps> = async ({ category }) => {
  
  type Post = {
    id: number;
    title: string;
    content: string;
    category: string;
    user: {
      first_name: string;
      last_name: string;
    };
    comment_count: number;
  };

  let posts = [];

  if (category === "All") {
    // Fetch all posts if no category is specified or if the category is "All"
    posts = await fetchPostsAction();
  } else {
    // Fetch posts by the specified category
    posts = await fetchPostByCategory(category);
  }
  if (posts.length === 0) {
    return (
      <p>
        Sorry, there were no posts to fetch. Try changing the category to one
        that contains posts.
      </p>
    );
  }

  return (
    <div>
      {posts.map((post: Post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          category={post.category}
          username={`${post.user.first_name} ${post.user.last_name}`}
          comment_count={post.comment_count}
        />
      ))}
    </div>
  );
};

export default PostsContainer;
