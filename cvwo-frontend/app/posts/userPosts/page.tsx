import React from "react";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { fetchUserPostAction } from "@/utils/actions";
import UserPostCard from "@/components/card/UserPostCard";
import { fetchProfileByUserID } from "@/utils/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreatePostButton from "@/components/home/CreatePostButton";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
async function UserPosts() {


  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // This code block is just the RequireProfile component but it is written separately and at the start of the program to prevent errors when we try to await different actions
  // like the awaits below this. This is because we need to check if the user has a profile before we can fetch their posts.
  interface CustomUserResource {
    privateMetadata: {
      hasProfile?: boolean;
    };
  }
  const userRequireProfile = await currentUser();

  if (!userRequireProfile) {
    return (
      <div>
        <p>Please sign in to view this content.</p>
        <SignInButton mode="modal">
          <button className="w-full text-left">Login</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="w-full text-left">Register</button>
        </SignUpButton>
      </div>
    );
  }

  const customUser = userRequireProfile as CustomUserResource;

  if (!customUser.privateMetadata?.hasProfile) {
    return (
      <div>
        <p>
          You do not have a profile yet. Please create one to view this page.
        </p>
        <Link href="/profile/create" passHref>
          <Button className="mt-5">Create Profile</Button>
        </Link>
      </div>
    );
  }
 // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
 const posts = await fetchUserPostAction();
  if (posts.length === 0) {
    return (
      <RequireProfile>
        <div>
          <h1>Users Posts</h1>
          <div className="mt-8">
            <p>You have not posted anything yet. Create a post now!</p>
            <Link href="/posts/create" passHref>
              <Button className="mt-2">Create Post</Button>
            </Link>
          </div>
        </div>
      </RequireProfile>
    );
  }

  const user = await fetchProfileByUserID(posts[0].user_id);
  const name = user.first_name + " " + user.last_name;

  return (
    <RequireProfile>
      <div>
        <h1>Welcome, {name}! Here are your posts: </h1>
        <p className="text-xs text-gray-500 mt-2">
          Click on the title to view post comments.
        </p>

        <ul>
          {posts
            .reverse()
            .map(
              (post: {
                id: number;
                title: string;
                content: string;
                category: string;
                userName: string;
                comment_count: number;
              }) => (
                <li key={post.id}>
                  <UserPostCard
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    category={post.category}
                    username={name}
                    comment_count={post.comment_count}
                  />
                </li>
              )
            )}
        </ul>
      </div>
      <CreatePostButton />
    </RequireProfile>
  );
}

export default UserPosts;
