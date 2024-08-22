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

interface InstallScript {
  os: string;
  script: string;
}

interface ReferenceSite {
  name: string;
  url: string;
}

interface RelatedTool {
  name: string;
}

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

  const handleArrayChange = (index: number, field: string, value: string, arrayName: string) => {
    setToolDetails(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName: string) => {
    setToolDetails(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], arrayName === 'mainFeatures' ? '' : { name: '' }]
    }));
  };

  const removeArrayItem = (index: number, arrayName: string) => {
    setToolDetails(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
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
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basic">基本情報</TabsTrigger>
              <TabsTrigger value="features">機能と説明</TabsTrigger>
              <TabsTrigger value="scripts">スクリプト</TabsTrigger>
              <TabsTrigger value="related">関連情報</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>基本情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ツール名</label>
            <Input type="text" id="name" name="name" value={toolDetails.name} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">バージョン</label>
            <Input type="text" id="version" name="version" value={toolDetails.version} onChange={handleChange} className="w-full" />
          </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
          </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>機能と説明</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">説明</label>
            <Textarea id="description" name="description" value={toolDetails.description} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">主な機能</label>
            {toolDetails.mainFeatures.map((feature, index) => (
              <div key={index} className="flex mb-2">
                <Input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange(index, 'feature', e.target.value, 'mainFeatures')}
                  className="flex-grow mr-2"
                />
                        <Button type="button" onClick={() => removeArrayItem(index, 'mainFeatures')} variant="destructive" size="sm">
                          <i className="fas fa-trash mr-2"></i>削除
                        </Button>
              </div>
            ))}
                    <Button type="button" onClick={() => addArrayItem('mainFeatures')} variant="outline" className="mt-2">
                      <i className="fas fa-plus mr-2"></i>機能を追加
                    </Button>
          </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="scripts">
              <Card>
                <CardHeader>
                  <CardTitle>インストール/アンインストールスクリプト</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">インストールスクリプト</label>
            {toolDetails.installScripts.map((script, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <Input
                  type="text"
                  value={script.os}
                  onChange={(e) => handleArrayChange(index, 'os', e.target.value, 'installScripts')}
                  placeholder="OS"
                  className="mb-2"
                />
                <Textarea
                  value={script.script}
                  onChange={(e) => handleArrayChange(index, 'script', e.target.value, 'installScripts')}
                  placeholder="スクリプト"
                  className="mb-2"
                />
                        <Button type="button" onClick={() => removeArrayItem(index, 'installScripts')} variant="destructive" size="sm">
                          <i className="fas fa-trash mr-2"></i>削除
                        </Button>
              </div>
            ))}
                    <Button type="button" onClick={() => addArrayItem('installScripts')} variant="outline" className="mt-2">
                      <i className="fas fa-plus mr-2"></i>スクリプトを追加
                    </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">アンインストールスクリプト</label>
            {toolDetails.uninstallScripts.map((script, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <Input
                  type="text"
                  value={script.os}
                  onChange={(e) => handleArrayChange(index, 'os', e.target.value, 'uninstallScripts')}
                  placeholder="OS"
                  className="mb-2"
                />
                <Textarea
                  value={script.script}
                  onChange={(e) => handleArrayChange(index, 'script', e.target.value, 'uninstallScripts')}
                  placeholder="スクリプト"
                  className="mb-2"
                />
                        <Button type="button" onClick={() => removeArrayItem(index, 'uninstallScripts')} variant="destructive" size="sm">
                          <i className="fas fa-trash mr-2"></i>削除
                        </Button>
              </div>
            ))}
                    <Button type="button" onClick={() => addArrayItem('uninstallScripts')} variant="outline" className="mt-2">
                      <i className="fas fa-plus mr-2"></i>スクリプトを追加
                    </Button>
          </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="related">
              <Card>
                <CardHeader>
                  <CardTitle>関連情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
          <div>
            <label htmlFor="officialSite" className="block text-sm font-medium text-gray-700 mb-1">公式サイト</label>
            <Input type="url" id="officialSite" name="officialSite" value={toolDetails.officialSite} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">参考サイト</label>
            {toolDetails.referenceSites.map((site, index) => (
              <div key={index} className="flex mb-2">
                <Input
                  type="text"
                  value={site.name}
                  onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'referenceSites')}
                  placeholder="サイト名"
                  className="flex-grow mr-2"
                />
                <Input
                  type="url"
                  value={site.url}
                  onChange={(e) => handleArrayChange(index, 'url', e.target.value, 'referenceSites')}
                  placeholder="URL"
                  className="flex-grow mr-2"
                />
                        <Button type="button" onClick={() => removeArrayItem(index, 'referenceSites')} variant="destructive" size="sm">
                          <i className="fas fa-trash mr-2"></i>削除
                        </Button>
              </div>
            ))}
                    <Button type="button" onClick={() => addArrayItem('referenceSites')} variant="outline" className="mt-2">
                      <i className="fas fa-plus mr-2"></i>サイトを追加
                    </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">関連ツール</label>
            {toolDetails.relatedTools.map((tool, index) => (
              <div key={index} className="flex mb-2">
                <Input
                  type="text"
                  value={tool.name}
                  onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'relatedTools')}
                  placeholder="ツール名"
                  className="flex-grow mr-2"
                />
                <Button type="button" onClick={() => removeArrayItem(index, 'relatedTools')} variant="destructive" size="sm">
                  <i className="fas fa-trash mr-2"></i>削除
                </Button>
              </div>
            ))}
                    <Button type="button" onClick={() => addArrayItem('relatedTools')} variant="outline" className="mt-2">
                      <i className="fas fa-plus mr-2"></i>ツールを追加
                    </Button>
          </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="mt-6">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            更新
          </Button>
          </div>
        </form>
      </main>
    </div>
  );
}