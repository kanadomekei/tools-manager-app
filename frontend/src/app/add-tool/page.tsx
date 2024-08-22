import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function AddTool() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新規アプリ登録</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">アプリ名:</label>
          <Input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="version" className="block text-sm font-medium mb-1">バージョン:</label>
          <Input type="text" id="version" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">カテゴリー:</label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {/* カテゴリーオプションを追加 */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="mainFeatures" className="block text-sm font-medium mb-1">主な機能:</label>
          <Textarea id="mainFeatures" />
        </div>
        <div>
          <label htmlFor="installMethod" className="block text-sm font-medium mb-1">インストール方法:</label>
          <Textarea id="installMethod" />
        </div>
        <div>
          <label htmlFor="bashScript" className="block text-sm font-medium mb-1">バッシュスクリプト:</label>
          <Textarea id="bashScript" />
        </div>
        <div>
          <label htmlFor="usageStatus" className="block text-sm font-medium mb-1">使用状況:</label>
          <Select>
            <SelectTrigger id="usageStatus">
              <SelectValue placeholder="未使用" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="未使用">未使用</SelectItem>
              {/* 他の使用状況オプションを追加 */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="officialSite" className="block text-sm font-medium mb-1">公式サイト:</label>
          <Input type="url" id="officialSite" />
        </div>
        <Button type="submit">登録</Button>
      </form>
    </div>
  );
}