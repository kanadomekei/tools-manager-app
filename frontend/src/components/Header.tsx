'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const isLoggedIn = false; // ここで実際のログイン状態を確認する処理を実装します

    const handleLogout = () => {
        // ログアウト処理を実装します
        console.log('ログアウト処理');
        router.push('/login');
    };

    return (
      <header className="bg-[#1E2A3B] text-white p-4 flex justify-between items-center">
        <Link href="/" className="hover:text-gray-300 transition-colors">
          <h1 className="text-2xl font-bold">プログラミングツール管理アプリ</h1>
        </Link>
        {isLoggedIn ? (
          <Button
            variant="outline"
            className="text-white border-white hover:bg-[#3498DB] transition-colors"
            onClick={handleLogout}
          >
            ログアウト
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-[#3498DB] transition-colors"
            >
              ログイン
            </Button>
          </Link>
        )}
      </header>
    );
  }