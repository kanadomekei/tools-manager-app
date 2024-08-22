'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Header from '@/components/Header';

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
    mainFeatures: '',
    installMethod: '',
    bashScript: '',
    officialSite: '',
  });

  useEffect(() => {
    // ここで実際のAPIからデータを取得する代わりに、仮のデータを設定しています
    setToolDetails({
      name: toolName,
      version: "1.60.0",
      category: "テキストエディタ",
      status: "使用中",
      description: "Microsoftが開発した無料のソースコードエディタです。",
      mainFeatures: "IntelliSense、デバッグ機能、Git統合",
      installMethod: "1. 公式サイトからダウンロード\n2. インストーラーを実行",
      bashScript: "#!/bin/bash\nsudo apt update\nsudo apt install code",
      officialSite: "https://code.visualstudio.com/",
    });
  }, [toolName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでAPIを呼び出してデータを更新する処理を実装
    console.log('更新されたツール情報:', toolDetails);
    router.push(`/tool/${encodeURIComponent(toolDetails.name.replace(/ /g, '-'))}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setToolDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setToolDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-roboto text-[#333333]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link href={`/tool/${encodeURIComponent(toolName.replace(/ /g, '-'))}`} passHref>
          <Button variant="outline" className="mb-4">
            <i className="fas fa-arrow-left mr-2"></i>戻る
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-6">{toolName}の編集</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ツール名</label>
            <Input type="text" id="name" name="name" value={toolDetails.name} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">バージョン</label>
            <Input type="text" id="version" name="version" value={toolDetails.version} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
            <Select name="category" value={toolDetails.category} onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="カテゴリーを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IDE">IDE</SelectItem>
                <SelectItem value="テキストエディタ">テキストエディタ</SelectItem>
                <SelectItem value="バージョン管理">バージョン管理</SelectItem>
                <SelectItem value="デバッガー">デバッガー</SelectItem>
                <SelectItem value="ビルドツール">ビルドツール</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
            <Select name="status" value={toolDetails.status} onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="ステータスを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="使用中">使用中</SelectItem>
                <SelectItem value="未使用">未使用</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">説明</label>
            <Textarea id="description" name="description" value={toolDetails.description} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label htmlFor="mainFeatures" className="block text-sm font-medium text-gray-700 mb-1">主な機能</label>
            <Textarea id="mainFeatures" name="mainFeatures" value={toolDetails.mainFeatures} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label htmlFor="installMethod" className="block text-sm font-medium text-gray-700 mb-1">インストール方法</label>
            <Textarea id="installMethod" name="installMethod" value={toolDetails.installMethod} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label htmlFor="bashScript" className="block text-sm font-medium text-gray-700 mb-1">Bashスクリプト</label>
            <Textarea id="bashScript" name="bashScript" value={toolDetails.bashScript} onChange={handleChange} className="w-full font-mono" />
          </div>
          <div>
            <label htmlFor="officialSite" className="block text-sm font-medium text-gray-700 mb-1">公式サイト</label>
            <Input type="url" id="officialSite" name="officialSite" value={toolDetails.officialSite} onChange={handleChange} className="w-full" />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            更新
          </Button>
        </form>
      </main>
    </div>
  );
}