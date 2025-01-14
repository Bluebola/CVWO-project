import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Image from "next/image";
import { fetchProfile, updateProfileAction } from "@/utils/actions";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Button";
async function ProfilePage() {
    
  const user = await currentUser();
  const databaseUser = await fetchProfile();
  return (
      //This RequireProfile component checks if the user has a profile and prompts them to create one if they do not have one.
    <RequireProfile>
      <div>
        <Image
          src={user!.imageUrl} // Use type assertion to inform TypeScript that user is not null
          alt="Profile Image"
          width={100}
          height={100}
        />
        <p>
          Hello, user {databaseUser.first_name} {databaseUser.last_name}!
        </p>
      </div>
      <hr className="my-4" /> {/* Added line */}

      <FormContainer action={updateProfileAction}>
          <div className='grid gap-4 md:grid-cols-2 mt-4 '>
            <FormInput
              type='text'
              name='first_name'
              label='First Name'
              defaultValue={databaseUser.first_name}
            />
            <FormInput
              type='text'
              name='last_name'
              label='Last Name'
              defaultValue={databaseUser.last_name}
            />
          </div>
          <SubmitButton text='Update Profile' className='mt-8' />
        </FormContainer>
    </RequireProfile>
  );
}

export default ProfilePage;
