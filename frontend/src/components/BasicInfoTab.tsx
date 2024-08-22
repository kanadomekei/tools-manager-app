import React from 'react';
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function BasicInfoTab({ toolDetails, onChange }) {
  return (
    <>
      <CardHeader>
        <CardTitle>基本情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ツール名</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={toolDetails.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">バージョン</label>
            <Input
              type="text"
              id="version"
              name="version"
              value={toolDetails.version}
              onChange={(e) => onChange('version', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
            <Select
              name="category"
              value={toolDetails.category}
              onValueChange={(value) => onChange('category', value)}
            >
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
            <Select
              name="status"
              value={toolDetails.status}
              onValueChange={(value) => onChange('status', value)}
            >
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
    </>
  );
}