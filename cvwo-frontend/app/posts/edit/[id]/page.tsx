import React from "react";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Button";
import CategoriesInput from "@/components/form/CategoriesInput";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { updatePostAction } from "@/utils/actions";
interface UpdatePostProps {
  params: {
    id: any;
  };
}

export default async function UpdatePost({ params }: UpdatePostProps) {
  const { id } = await params;

  return (
    <RequireProfile>
      <div>this is post with id: {id}</div>
      <div>Update your post here</div>
      <FormContainer action={updatePostAction}>
        <input type="hidden" name="id" value={id} />        {/* Hidden input for post ID */}
        <FormInput type="text" name="title" label="Title" />
        <FormInput type="textarea" name="content" label="Content" />
        <CategoriesInput defaultValue="General" />
        <SubmitButton text="Update Post" className="mt-8" />
      </FormContainer>
    </RequireProfile>
  );
}
