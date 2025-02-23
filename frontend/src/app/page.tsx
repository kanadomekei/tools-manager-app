'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function MainComponent() {
  const [selectedCategory, setSelectedCategory] = React.useState("ide");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const categories = [
    { name: "IDE", id: "ide" },
    { name: "テキストエディタ", id: "text-editor" },
    { name: "バージョン管理", id: "version-control" },
    { name: "デバッガー", id: "debugger" },
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
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-roboto text-[#333333]">
      <header className="bg-[#1E2A3B] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">プログラミングツール管理アプリ</h1>
        <Button
          variant="outline"
          className="text-white border-white hover:bg-[#3498DB] transition-colors"
        >
          ログイン
        </Button>
      </header>

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
            {tools.map((tool, index) => (
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
                  <Button
                    variant="outline"
                    className="w-full hover:bg-[#3498DB] hover:text-white transition-colors"
                  >
                    詳細を見る
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainComponent;