import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface CustomUserResource {
  privateMetadata: {
    hasProfile?: boolean;
  };
}

const RequireProfile = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
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

  const customUser = user as CustomUserResource;

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

  return <>{children}</>;
};

export default RequireProfile;
