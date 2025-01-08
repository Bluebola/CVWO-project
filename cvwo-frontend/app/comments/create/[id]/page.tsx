import { SubmitButton } from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import RequireProfile from "@/components/requireProfile/RequireProfile";
import { createCommentAction, fetchPostById } from "@/utils/actions";
type CreateCommentsProps = {
  params: {
    id: number;
  };
};

async function CreateComments({ params }: CreateCommentsProps) {
  const { id } = await params;
  const post = await fetchPostById(id);
 
  return (
    <RequireProfile>
      <div className="mb-4">Create your comment here for post with title &quot;{post.title}&quot;</div>
      <FormContainer action={createCommentAction}>
        <input type="hidden" name="post_id" value={id} />{" "}
        <FormInput type="textarea" name="content" label="Comment" />
        <SubmitButton text="Create Comment" className="mt-4" />
      </FormContainer>
    </RequireProfile>
  );
}

export default CreateComments;
