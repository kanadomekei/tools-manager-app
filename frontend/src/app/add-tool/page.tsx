import { Button } from "@/components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Header from '@/components/Header';

export default function AddTool() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">新規アプリ登録</h1>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">アプリ名</label>
                <Input type="text" id="name" className="w-full" />
              </div>
              <div>
                <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">バージョン</label>
                <Input type="text" id="version" className="w-full" />
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
              <Select>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {/* カテゴリーオプションを追加 */}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="mainFeatures" className="block text-sm font-medium text-gray-700 mb-1">主な機能</label>
              <Textarea id="mainFeatures" className="w-full h-24" />
            </div>
            
            <div>
              <label htmlFor="installMethod" className="block text-sm font-medium text-gray-700 mb-1">インストール方法</label>
              <Textarea id="installMethod" className="w-full h-24" />
            </div>
            
            <div>
              <label htmlFor="bashScript" className="block text-sm font-medium text-gray-700 mb-1">バッシュスクリプト</label>
              <Textarea id="bashScript" className="w-full h-24 font-mono" />
            </div>
            
            <div>
              <label htmlFor="usageStatus" className="block text-sm font-medium text-gray-700 mb-1">使用状況</label>
              <Select>
                <SelectTrigger id="usageStatus" className="w-full">
                  <SelectValue placeholder="未使用" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="未使用">未使用</SelectItem>
                  {/* 他の使用状況オプションを追加 */}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="officialSite" className="block text-sm font-medium text-gray-700 mb-1">公式サイト</label>
              <Input type="url" id="officialSite" className="w-full" />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              登録
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}