
import { createProfileAction, hasUserProfile } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Button";
async function CreateProfile() {
  const user = await currentUser();
  // if (user && user.privateMetadata.hasProfile) {
  //   redirect("/");
  // }
  const profileExists = await hasUserProfile();
  if (user && profileExists) {
    redirect("/");
  }
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Create a profile here!</h1>
      <p className="text-gray-500 text-sm">
        Please create a profile to be able to create, view and comment on posts.
      </p>
      <div className="border p-8 rounded-md max-w-lg">
        <FormContainer action={createProfileAction}>
          <div className="grid gap-4 mt-4 ">
            <FormInput type="text" name="first_name" label="First Name" />
            <FormInput type="text" name="last_name" label="Last Name" />
          </div>
          <SubmitButton text="Create Profile" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfile;
