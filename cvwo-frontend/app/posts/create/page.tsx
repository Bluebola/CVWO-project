import { SubmitButton } from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { createPostAction } from "@/utils/actions";
import CategoriesInput from "@/components/form/CategoriesInput";

// This is the page where the user can fill in a form and create a post.
function CreatePost() {
  return (
    <RequireProfile>
      <div className="mb-6">Enter your post&apos;s Title, Content and Category to create a post.</div>
      <FormContainer action={createPostAction}>
        <FormInput type="text" name="title" label="Title" />
        <FormInput type="textarea" name="content" label="Content" />
        <CategoriesInput defaultValue="General" />
        <SubmitButton text="Create Post" className="mt-8" />
      </FormContainer>
    </RequireProfile>
  );
}

export default CreatePost;
