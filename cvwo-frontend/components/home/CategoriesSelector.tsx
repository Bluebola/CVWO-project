"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const name = "category";

function CategoriesSelector({ defaultValue }: { defaultValue?: string }) {
  const [selectedCategory, setSelectedCategory] = useState(defaultValue || "");
  const router = useRouter();

  const handleSelectChange = (value: string) => {
    setSelectedCategory(value);
    // Here you can use the selected value as a search param or for any other purpose
    console.log("Selected category:", value);
    // Example: Update the URL with the selected category as a search param
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("category", value);
    // nAVIGATE TO  the current URL with the updated search params
    router.push(`/?${searchParams.toString()}`);
  };

  return (
    <div className="mb-2">
      <Select
        defaultValue={defaultValue}
        onValueChange={handleSelectChange}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
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

export default CategoriesSelector;
