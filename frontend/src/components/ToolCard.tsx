'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  name: string;
  version: string;
  category: string;
  status: string;
  icon: string;
  children: React.ReactNode;
}

export default function ToolCard({ name, version, category, status, icon, children }: ToolCardProps) {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow hover:scale-105">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <i className={cn(icon, "text-2xl text-[#3498DB]")}></i>
          <div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription className="text-sm">
              バージョン: {version}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">カテゴリー: {category}</p>
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant={status === "使用中" ? "default" : "secondary"}
            className={cn(
              status === "使用中" ? "bg-[#3498DB]" : "bg-gray-300"
            )}
          >
            {status}
          </Badge>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}