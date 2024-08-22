'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2 } from 'lucide-react'; // Lucide Reactアイコンをインポート

function MainComponent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [categories, setCategories] = useState([
    { name: "すべて", id: "all" },
    { name: "IDE", id: "ide" },
    { name: "テキストエディタ", id: "text-editor" },
    { name: "バージョン管理", id: "version-control" },
    { name: "デバッガー", id: "debugger" },
    { name: "ビルドツール", id: "build-tool" },
  ]);

  const tools = [
    {
      name: "Visual Studio Code",
      version: "1.60.0",
      category: "テキストエディタ",
      status: "使用中",
      icon: "fas fa-code",
    },
    {
      name: "Git",
      version: "2.33.0",
      category: "バージョン管理",
      status: "使用中",
      icon: "fas fa-code-branch",
    },
    {
      name: "PyCharm",
      version: "2021.2",
      category: "IDE",
      status: "未使用",
      icon: "fas fa-laptop-code",
    },
    {
      name: "Chrome DevTools",
      version: "94.0",
      category: "デバッガー",
      status: "使用中",
      icon: "fas fa-bug",
    },
    {
      name: "Webpack",
      version: "5.54.0",
      category: "ビルドツール",
      status: "使用中",
      icon: "fas fa-cogs",
    },
    {
      name: "Sublime Text",
      version: "4.0",
      category: "テキストエディタ",
      status: "未使用",
      icon: "fas fa-edit",
    },
  ];

  const filteredTools = selectedCategory === "all"
    ? tools
    : tools.filter(tool => tool.category === categories.find(cat => cat.id === selectedCategory)?.name);

  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      const newId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
      setCategories([...categories, { name: newCategoryName, id: newId }]);
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
      if (selectedCategory === categoryToDelete) {
        setSelectedCategory('all');
      }
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-roboto text-[#333333]">
      <Header />

      <main className="container mx-auto p-4 md:flex">
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
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex-grow text-left pr-10 relative",
                      selectedCategory === category.id
                        ? "bg-[#3498DB] text-white"
                        : "hover:bg-[#3498DB] hover:bg-opacity-10"
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
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
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="md:w-3/4">
          <h2 className="text-2xl font-semibold mb-6">マイツール</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <Card
                key={index}
                className="bg-white shadow-md hover:shadow-lg transition-shadow hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <i className={cn(tool.icon, "text-2xl text-[#3498DB]")}></i>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        バージョン: {tool.version}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">カテゴリー: {tool.category}</p>
                  <Badge
                    variant={tool.status === "���用中" ? "default" : "secondary"}
                    className={cn(
                      tool.status === "使用中" ? "bg-[#3498DB]" : "bg-gray-300"
                    )}
                  >
                    {tool.status}
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Link href={`/tool/${encodeURIComponent(tool.name.replace(/ /g, '-'))}`} passHref>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-[#3498DB] hover:text-white transition-colors"
                    >
                      詳細を見る
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

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

      <div className="fixed bottom-8 right-8">
        <Link href="/add-tool" passHref>
          <Button
            className="bg-[#3498DB] text-white hover:bg-[#2980B9] transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>ツールを追加
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MainComponent;