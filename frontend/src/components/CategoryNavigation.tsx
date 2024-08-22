import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  id: string;
}

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  onDeleteCategory: (id: string) => void;
  onAddCategory: () => void;
}

export default function CategoryNavigation({
  categories,
  selectedCategory,
  onSelectCategory,
  onDeleteCategory,
  onAddCategory
}: CategoryNavigationProps) {
  return (
    <nav>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">カテゴリー</h2>
        <Button
          variant="outline"
          size="sm"
          className="text-[#3498DB] border-[#3498DB] hover:bg-[#3498DB] hover:text-white"
          onClick={onAddCategory}
        >
          <i className="fas fa-plus mr-1"></i> 追加
        </Button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2 flex items-center justify-between">
            <Button
              variant="ghost"
              className={cn(
                "w-full text-left",
                selectedCategory === category.id
                  ? "bg-[#3498DB] text-white"
                  : "hover:bg-[#3498DB] hover:bg-opacity-10"
              )}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </Button>
            {category.id !== 'all' && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-100 hover:text-red-700"
                onClick={() => onDeleteCategory(category.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}