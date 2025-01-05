import React from "react";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { fetchUserPostAction } from "@/utils/actions";
import PostCard from "@/components/card/PostCard";
import { fetchProfileByUserID } from "@/utils/actions";
async function UserPosts() {
  const posts = await fetchUserPostAction();
  const user = await fetchProfileByUserID(posts[0].user_id);
  const name = user.first_name + " " + user.last_name;
  console.log("Supposed to console log user here");
  console.log("user", user);
  return (
    <RequireProfile>
      <div>
        <h1>User's Posts</h1>
        <ul>
          {posts.map(
            (post: {
              id: React.Key | null | undefined;
              title: any;
              content: any;
              category: any;
              userName: string;
            }) => (
              <li key={post.id}>
                <PostCard
                  title={post.title}
                  content={post.content}
                  category={post.category}
                  username={name}
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
