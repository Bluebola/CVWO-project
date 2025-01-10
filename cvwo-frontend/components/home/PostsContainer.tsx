import React from "react";
import PostCard from "@/components/card/PostCard";
import UserPostCard from "../card/UserPostCard";
import CreatePostButton from "./CreatePostButton";
import {
  fetchPostByCategory,
  fetchPostsAction,
  fetchProfileForHome,
} from "@/utils/actions";

type PostsContainerProps = {
  category: string;
};

const PostsContainer: React.FC<PostsContainerProps> = async ({ category }) => {
  type Post = {
    id: number;
    title: string;
    content: string;
    category: string;
    user_id: number;
    user: {
      first_name: string;
      last_name: string;
    };
    comment_count: number;
  };
  const currentUser = await fetchProfileForHome();

  let posts = [];

  if (category === "All") {
    // Fetch all posts if no category is specified or if the category is "All"
    posts = await fetchPostsAction();
  } else {
    // Fetch posts by the specified category
    posts = await fetchPostByCategory(category);
  }
  console.log(posts);
  if (posts.length === 0) {
    return (
      <div>
        <p>Sorry, there are no posts to fetch.</p>
        <p>
          Try changing the category to one that contains posts, or create a post
          of this category yourself using the button below.
        </p>
        <CreatePostButton />
      </div>
    );
  }

  return (
    <div>
      {posts.reverse().map((post: Post) => {
        if (currentUser && post.user_id === Number(currentUser.ID)) {
          return (
            <UserPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              category={post.category}
              username={`${post.user.first_name} ${post.user.last_name}`}
              comment_count={post.comment_count}
            />
          );
        } else {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              category={post.category}
              username={`${post.user.first_name} ${post.user.last_name}`}
              comment_count={post.comment_count}
            />
          );
        }
      })}
      <CreatePostButton />
    </div>
  );
};

export default PostsContainer;
