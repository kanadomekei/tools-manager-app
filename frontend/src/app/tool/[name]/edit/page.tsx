'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import EditToolForm from '@/components/EditToolForm';

export default function EditTool() {
  const params = useParams();
  const router = useRouter();
  const toolName = decodeURIComponent(params.name as string).replace(/-/g, ' ');

  const [toolDetails, setToolDetails] = useState({
    name: '',
    version: '',
    category: '',
    status: '',
    description: '',
    mainFeatures: [''],
    installScripts: [{ os: '', script: '' }],
    uninstallScripts: [{ os: '', script: '' }],
    officialSite: '',
    referenceSites: [{ name: '', url: '' }],
    relatedTools: [{ name: '' }],
  });

  useEffect(() => {
    // ここで実際のAPIからデータを取得する代わりに、仮のデータを設定しています
    setToolDetails({
      name: toolName,
      version: "1.60.0",
      category: "テキストエディタ",
      status: "使用中",
      description: "Microsoftが開発した無料のソースコードエディタです。デバッグ、タスク実行バージョン管理などの機能を備えています。",
      mainFeatures: [
        "IntelliSenseによるコード補完",
        "デバッグ機能",
        "Git統合",
        "拡張機能によるカスタマイズ"
      ],
      installScripts: [
        { os: 'ubuntu', script: '#!/bin/bash\nsudo apt update\nsudo apt install code' },
        { os: 'arch', script: '#!/bin/bash\nsudo pacman -S visual-studio-code-bin' }
      ],
      uninstallScripts: [
        { os: 'ubuntu', script: '#!/bin/bash\nsudo apt remove code\nsudo apt autoremove' },
        { os: 'arch', script: '#!/bin/bash\nsudo pacman -Rs visual-studio-code-bin' }
      ],
      officialSite: "https://code.visualstudio.com/",
      referenceSites: [
        { name: "Visual Studio Code ドキュメント", url: "https://code.visualstudio.com/docs" },
        { name: "VS Code Can Do That?", url: "https://vscodecandothat.com/" },
      ],
      relatedTools: [
        { name: "Sublime Text" },
        { name: "Atom" },
        { name: "WebStorm" },
      ],
    });
  }, [toolName]);

  const handleSubmit = (updatedToolDetails) => {
    // ここでAPIを呼び出してデータを更新する処理を実装
    console.log('更新されたツール情報:', updatedToolDetails);
    router.push(`/tool/${encodeURIComponent(updatedToolDetails.name.replace(/ /g, '-'))}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href={`/tool/${encodeURIComponent(toolName.replace(/ /g, '-'))}`} passHref>
            <Button variant="outline" className="flex items-center">
              <i className="fas fa-arrow-left mr-2"></i>戻る
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{toolName}の編集</h1>
        </div>
        <EditToolForm toolDetails={toolDetails} onSubmit={handleSubmit} />
      </main>
    </div>
  );
}