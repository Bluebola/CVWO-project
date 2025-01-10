import React from "react";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { fetchUserPostAction } from "@/utils/actions";
import UserPostCard from "@/components/card/UserPostCard";
import { fetchProfileByUserID } from "@/utils/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
async function UserPosts() {
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
          {posts.map(
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
    </RequireProfile>
  );
}

export default UserPosts;
