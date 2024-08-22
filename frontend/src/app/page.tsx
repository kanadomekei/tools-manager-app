'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import Header from '@/components/Header';
function MainComponent() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const categories = [
    { name: "すべて", id: "all" },
    { name: "IDE", id: "ide" },
    { name: "テキストエディタ", id: "text-editor" },
    { name: "バージョン管理", id: "version-control" },
    { name: "デバッガー", id: "debugger" },
    { name: "ビルドツール", id: "build-tool" },
  ];

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
            <h2 className="text-xl font-semibold mb-4">カテゴリー</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id} className="mb-2">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full text-left",
                      selectedCategory === category.id
                        ? "bg-[#3498DB] text-white"
                        : "hover:bg-[#3498DB] hover:bg-opacity-10"
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
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
                    variant={tool.status === "使用中" ? "default" : "secondary"}
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