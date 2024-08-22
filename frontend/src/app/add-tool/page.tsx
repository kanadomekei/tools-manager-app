'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';

export default function AddTool() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setToolDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setToolDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, arrayName: string) => {
    setToolDetails(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName: string) => {
    setToolDetails(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };

  const removeArrayItem = (index: number, arrayName: string) => {
    setToolDetails(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでAPIを呼び出してデータを送信する処理を実装
    console.log('登録されたツール情報:', toolDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">新規アプリ登録</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                      onChange={(e) => handleArrayChange(index, e.target.value, 'mainFeatures')}
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
                      onChange={(e) => handleArrayChange(index, { ...script, os: e.target.value }, 'installScripts')}
                          placeholder="OS"
                          className="mb-2"
                        />
                        <Textarea
                          value={script.script}
                      onChange={(e) => handleArrayChange(index, { ...script, script: e.target.value }, 'installScripts')}
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
                      onChange={(e) => handleArrayChange(index, { ...script, os: e.target.value }, 'uninstallScripts')}
                          placeholder="OS"
                          className="mb-2"
                        />
                        <Textarea
                          value={script.script}
                      onChange={(e) => handleArrayChange(index, { ...script, script: e.target.value }, 'uninstallScripts')}
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
                      onChange={(e) => handleArrayChange(index, { ...site, name: e.target.value }, 'referenceSites')}
                          placeholder="サイト名"
                          className="flex-grow mr-2"
                        />
                        <Input
                          type="url"
                          value={site.url}
                      onChange={(e) => handleArrayChange(index, { ...site, url: e.target.value }, 'referenceSites')}
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
                      onChange={(e) => handleArrayChange(index, { ...tool, name: e.target.value }, 'relatedTools')}
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

          <div className="mt-6">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              登録
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}