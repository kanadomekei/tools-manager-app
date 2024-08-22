import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
      <header className="bg-[#1E2A3B] text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">プログラミングツール管理アプリ</h1>
      <Button
      variant="outline"
      className="text-white border-white hover:bg-[#3498DB] transition-colors"
      >
      ログイン
      </Button>
</header>
    );
  }