'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface ToolCardProps {
  name: string;
  description: string;
  imageSrc: string;
  isInstalled: boolean;
  key: string;
}

export default function ToolCard({ name, description, imageSrc, isInstalled }: ToolCardProps) {
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow hover:scale-105">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <img src={imageSrc} alt={name} className="w-10 h-10 object-cover" />
          <div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Badge
          variant={isInstalled ? "default" : "secondary"}
          className={cn(isInstalled ? "bg-[#3498DB]" : "bg-gray-300")}
        >
          {isInstalled ? "インストール済み" : "未インストール"}
        </Badge>
      </CardFooter>
    </Card>
  );
}