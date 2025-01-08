import { Separator } from "@/components/ui/separator";
import { IoHome } from "react-icons/io5";
import CategoriesSelector from "@/components/home/CategoriesSelector";
import PostsContainer from "@/components/home/PostsContainer";
async function HomePage({ searchParams }: { searchParams: { category: string } }) {
  const params = await searchParams;
  const category = params.category || "All";  
  return (
    <div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <IoHome className="w-6 h-6" />
          <h1 className="text-3xl">Homepage</h1>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-xs text-gray-500 mr-1">Select Category:</p>
          <CategoriesSelector defaultValue={category} />
        </div>
      </div>
      <Separator className="my-4" />
      <PostsContainer category={category} />
    </div>
  );
}
export default HomePage;
