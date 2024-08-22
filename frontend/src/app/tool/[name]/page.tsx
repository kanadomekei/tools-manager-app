'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';

export default function ToolDetail() {
  const params = useParams();
  const toolName = decodeURIComponent(params.name as string).replace(/-/g, ' ');

  const toolDetails = {
    name: toolName,
    version: "1.60.0",
    category: "テキストエディタ",
    status: "使用中",
    icon: "fas fa-code",
    description: "Microsoftが開発した無料のソースコードエディタです。デバッグ、タスク実行、バージョン管理などの機能を備えています。",
    mainFeatures: [
      "IntelliSenseによるコード補完",
      "デバッグ機能",
      "Git統合",
      "拡張機能によるカスタマイズ"
    ],
    installSteps: [
      "公式サイトからインストーラーをダウンロード",
      "インストーラーを実行し、画面の指示に従う",
      "インストールが完了後、Visual Studio Codeを起動"
    ],
    bashScript: `#!/bin/bash
sudo apt update
sudo apt install software-properties-common apt-transport-https wget -y
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code`,
    officialSite: "https://code.visualstudio.com/",
    supportedOS: "Windows 10+, macOS 10.11+, Linux",
    lastUpdated: "2024-07-15"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-[#E4E8F0] font-roboto text-[#333333]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" passHref>
            <Button variant="outline" className="hover:bg-white/20 transition-colors">
              <i className="fas fa-arrow-left mr-2"></i>戻る
            </Button>
          </Link>
          <Link href={`/tool/${encodeURIComponent(toolName.replace(/ /g, '-'))}/edit`} passHref>
            <Button className="bg-[#3498DB] text-white hover:bg-[#2980B9] transition-colors">
              <i className="fas fa-edit mr-2"></i>編集
            </Button>
          </Link>
        </div>
        <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white p-6">
            <div className="flex items-center space-x-4">
              <i className={`${toolDetails.icon} text-5xl`}></i>
              <div>
                <CardTitle className="text-3xl font-bold">{toolDetails.name}</CardTitle>
                <CardDescription className="text-xl text-white/80">バージョン {toolDetails.version}</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Badge variant="secondary" className="bg-white/20 text-white">{toolDetails.category}</Badge>
              <Badge variant={toolDetails.status === "使用中" ? "default" : "secondary"} className="bg-green-500 text-white">
                {toolDetails.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">概要</h2>
              <p className="text-gray-700 leading-relaxed">{toolDetails.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">主な機能</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {toolDetails.mainFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">インストール方法</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {toolDetails.installSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">Bashスクリプト</h2>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{toolDetails.bashScript}</code>
              </pre>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-[#2C3E50]">その他の情報</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p><strong>公式サイト:</strong></p>
                  <a href={toolDetails.officialSite} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{toolDetails.officialSite}</a>
                </div>
                <div>
                  <p><strong>対応OS:</strong></p>
                  <p>{toolDetails.supportedOS}</p>
                </div>
                <div>
                  <p><strong>最終更新日:</strong></p>
                  <p>{toolDetails.lastUpdated}</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}