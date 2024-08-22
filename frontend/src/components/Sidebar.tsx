import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Category {
  name: string;
  id: string;
}

interface SidebarProps {
  initialCategories: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  onCategoriesChange: (categories: Category[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  initialCategories,
  selectedCategory,
  setSelectedCategory,
  onCategoriesChange
}) => {
  const [categories, setCategories] = useState(initialCategories);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      const newId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
      const updatedCategories = [...categories, { name: newCategoryName, id: newId }];
      setCategories(updatedCategories);
      onCategoriesChange(updatedCategories);
      setNewCategoryName("");
      setIsAddCategoryDialogOpen(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      alert('「すべて」カテゴリーは削除できません。');
      return;
    }
    setCategoryToDelete(categoryId);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryToDelete);
      setCategories(updatedCategories);
      onCategoriesChange(updatedCategories);
      if (selectedCategory === categoryToDelete) {
        setSelectedCategory('all');
      }
      setCategoryToDelete(null);
    }
  };

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

      <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新しいカテゴリーを追加</DialogTitle>
          </DialogHeader>
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="カテゴリー名を入力"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleAddCategory}>追加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={categoryToDelete !== null} onOpenChange={() => setCategoryToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>カテゴリーの削除</DialogTitle>
          </DialogHeader>
          <p>本当にこのカテゴリーを削除しますか？この操作は取り消せません。</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryToDelete(null)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCategory}>
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default Sidebar;