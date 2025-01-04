
import RequireProfile from "@/components/requireProfile/RequireProfile";
function CreatePost() {
  return (
    <RequireProfile>
      <div>Create your posts here</div>
    </RequireProfile>
  );
}

export default CreatePost;
