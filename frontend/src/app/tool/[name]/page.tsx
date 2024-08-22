'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolDetail() {
  const params = useParams();
  const toolName = decodeURIComponent(params.name as string).replace(/-/g, ' ');

  // ツールの詳細情報（実際のアプリケーションではAPIから取得するなど）
  const toolDetails = {
    name: toolName,
    version: "1.60.0",
    category: "テキストエディタ",
    status: "使用中",
    icon: "fas fa-code",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-roboto text-[#333333] p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" passHref>
          <Button variant="outline" className="mb-4">
            <i className="fas fa-arrow-left mr-2"></i>戻る
          </Button>
        </Link>
        <Card className="bg-white shadow-md">
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <i className={`${toolDetails.icon} text-4xl text-[#3498DB]`}></i>
            <div>
              <CardTitle className="text-3xl font-bold">{toolDetails.name}</CardTitle>
              <CardDescription className="text-lg">バージョン {toolDetails.version}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <Badge variant="secondary" className="text-sm">{toolDetails.category}</Badge>
              <Badge variant={toolDetails.status === "使用中" ? "default" : "secondary"} className="text-sm">
                {toolDetails.status}
              </Badge>
            </div>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">概要</h2>
              <p>{toolDetails.name}は、Microsoftが開発した無料のソースコードエディタです。デバッグ、タスク実行、バージョン管理などの機能を備えています。</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">主な機能</h2>
              <ul className="list-disc list-inside">
                <li>IntelliSenseによるコード補完</li>
                <li>デバッグ機能</li>
                <li>Git統合</li>
                <li>拡張機能によるカスタマイズ</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">インストール方法</h2>
              <ol className="list-decimal list-inside">
                <li>公式サイトからインストーラーをダウンロード</li>
                <li>インストーラーを実行し、画面の指示に従う</li>
                <li>インストールが完了後、{toolDetails.name}を起動</li>
              </ol>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Bashスクリプト</h2>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  {`#!/bin/bash
sudo apt update
sudo apt install software-properties-common apt-transport-https wget -y
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code`}
                </code>
              </pre>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">その他の情報</h2>
              <p><strong>カテゴリー:</strong> テキストエディタ</p>
              <p><strong>公式サイト:</strong> <a href="https://code.visualstudio.com/" className="text-blue-600 hover:underline">https://code.visualstudio.com/</a></p>
              <p><strong>対応OS:</strong> Windows 10+, macOS 10.11+, Linux</p>
              <p><strong>最終更新日:</strong> 2024-07-15</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">参考文献</h2>
              <ul className="list-disc list-inside">
                <li><a href="https://code.visualstudio.com/docs" className="text-blue-600 hover:underline">Visual Studio Code Documentation</a></li>
                <li><a href="https://github.com/microsoft/vscode" className="text-blue-600 hover:underline">GitHub - microsoft/vscode</a></li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}