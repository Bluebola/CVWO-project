import React from "react";
import RequireProfile from "@/components/requireProfile/RequireProfile";
function UserPosts() {
  return (
    <RequireProfile>
      <div>List of User's own posts go here.</div>
    </RequireProfile>
  );
}

export default UserPosts;
