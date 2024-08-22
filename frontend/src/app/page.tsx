'use client';

import React, { useState } from "react";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ToolCard from '@/components/ToolCard';
import StarRating from '@/components/StarRating';
import AddToolButton from '@/components/AddToolButton';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function MainComponent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([
    { name: "すべて", id: "all" },
    { name: "IDE", id: "ide" },
    { name: "テキストエディタ", id: "text-editor" },
    { name: "バージョン管理", id: "version-control" },
    { name: "デバッガー", id: "debugger" },
    { name: "ビルドツール", id: "build-tool" },
  ]);

  const [tools, setTools] = useState([
    {
      name: "Visual Studio Code",
      version: "1.60.0",
      category: "テキストエディタ",
      status: "使用中",
      icon: "fas fa-code",
      rating: 4,
    },
    {
      name: "Git",
      version: "2.33.0",
      category: "バージョン管理",
      status: "使用中",
      icon: "fas fa-code-branch",
      rating: 5,
    },
    {
      name: "PyCharm",
      version: "2021.2",
      category: "IDE",
      status: "未使用",
      icon: "fas fa-laptop-code",
      rating: 3,
    },
    {
      name: "Chrome DevTools",
      version: "94.0",
      category: "デバッガー",
      status: "使用中",
      icon: "fas fa-bug",
      rating: 4,
    },
    {
      name: "Webpack",
      version: "5.54.0",
      category: "ビルドツール",
      status: "使用中",
      icon: "fas fa-cogs",
      rating: 4,
    },
    {
      name: "Sublime Text",
      version: "4.0",
      category: "テキストエディタ",
      status: "未使用",
      icon: "fas fa-edit",
      rating: 3,
    },
  ]);

  const filteredTools = selectedCategory === "all"
    ? tools
    : tools.filter(tool => tool.category === categories.find(cat => cat.id === selectedCategory)?.name);

  const handleRatingChange = (toolName: string, newRating: number) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.name === toolName ? { ...tool, rating: newRating } : tool
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-roboto text-[#333333]">
      <Header />

      <main className="container mx-auto p-4 md:flex">
        <Sidebar
          initialCategories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onCategoriesChange={setCategories}
        />

        <section className="md:w-3/4">
          <h2 className="text-2xl font-semibold mb-6">マイツール</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <ToolCard
                key={index}
                name={tool.name}
                version={tool.version}
                category={tool.category}
                status={tool.status}
                icon={tool.icon}
              >
                <StarRating
                  rating={tool.rating}
                  onRatingChange={(newRating) => handleRatingChange(tool.name, newRating)}
                />
                <Link href={`/tool/${encodeURIComponent(tool.name.replace(/ /g, '-'))}`} passHref>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-[#3498DB] hover:text-white transition-colors"
                  >
                    詳細を見る
                  </Button>
                </Link>
              </ToolCard>
            ))}
          </div>
        </section>
      </main>

      <AddToolButton />
    </div>
  );
}