import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const name = "category";
function CategoriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Category
      </Label>
      <Select defaultValue={defaultValue} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="General">General</SelectItem>
          <SelectItem value="Technology">Technology</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Lifestyle">Lifestyle</SelectItem>
          <SelectItem value="Politics">Politics</SelectItem>
          <SelectItem value="Science">Science</SelectItem>
          <SelectItem value="Sports">Sports</SelectItem>
          <SelectItem value="Travel">Travel</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
export default CategoriesInput;
