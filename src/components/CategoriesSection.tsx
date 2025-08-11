import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export function CategoriesSection() {
  const categories = ["Category1", "Category2", "Category3"];

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {categories.map((cat, index) => (
        <Badge
          key={index}
          variant="outline"
          className="px-4 py-2 text-sm font-medium cursor-pointer hover:bg-accent transition-colors"
        >
          {cat}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Badge>
      ))}
    </div>
  );
}