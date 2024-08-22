'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function ToolDetail() {
  const params = useParams();
  const toolName = decodeURIComponent(params.name as string).replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-roboto text-[#333333] p-8">
      <Link href="/" passHref>
        <Button variant="outline" className="mb-4">
          戻る
        </Button>
      </Link>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{toolName}</CardTitle>
          <CardDescription>ツールの詳細情報</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            これは {toolName} の詳細ページです。ここに詳細な情報を表示します。
          </p>
          <p>
            この仮のページは、実際のデータを取得して表示するように拡張できます。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}