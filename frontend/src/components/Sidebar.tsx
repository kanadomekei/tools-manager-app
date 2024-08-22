import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from 'lucide-react';

interface Category {
  name: string;
  id: string;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  isMobileMenuOpen: boolean;
  setSelectedCategory: (id: string) => void;
  setIsAddCategoryDialogOpen: (isOpen: boolean) => void;
  handleDeleteCategory: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  isMobileMenuOpen,
  setSelectedCategory,
  setIsAddCategoryDialogOpen,
  handleDeleteCategory
}) => {
  return (
    <aside className="md:w-1/4 mb-4 md:mb-0 md:pr-4">
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-[#3498DB] text-white"
        >
          <i className="fas fa-bars mr-2"></i> カテゴリーメニュー
        </Button>
      </div>
      <nav className={cn("md:block", isMobileMenuOpen ? "block" : "hidden")}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">カテゴリー</h2>
          <Button
            variant="outline"
            size="sm"
            className="text-[#3498DB] border-[#3498DB] hover:bg-[#3498DB] hover:text-white"
            onClick={() => setIsAddCategoryDialogOpen(true)}
          >
            <i className="fas fa-plus mr-1"></i> 追加
          </Button>
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-2 flex items-center">
              <div className="flex-grow relative">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full text-left pr-10",
                    selectedCategory === category.id
                      ? "bg-[#3498DB] text-white"
                      : "hover:bg-[#3498DB] hover:bg-opacity-10"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
                {category.id !== 'all' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-red-100 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;