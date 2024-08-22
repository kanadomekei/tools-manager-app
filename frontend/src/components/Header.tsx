'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { FiCode, FiLogIn, FiLogOut } from 'react-icons/fi'; // アイコンをインポート

export default function Header() {
    const router = useRouter();
    const isLoggedIn = false; // 実際のログイン状態確認処理

    const handleLogout = () => {
        // ログアウト処理
        console.log('ログアウト処理');
        router.push('/login');
    };

    return (
      <header className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 hover:text-gray-200 transition-colors">
            <FiCode className="text-2xl" />
            <h1 className="text-xl font-semibold">プログラミングツール管理</h1>
          </Link>
          {isLoggedIn ? (
            <Button
              variant="ghost"
              className="text-white hover:bg-white hover:bg-opacity-20 transition-colors flex items-center space-x-2"
              onClick={handleLogout}
            >
              <FiLogOut />
              <span>ログアウト</span>
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button
                variant="ghost"
                className="text-white hover:bg-white hover:bg-opacity-20 transition-colors flex items-center space-x-2"
              >
                <FiLogIn />
                <span>ログイン</span>
              </Button>
            </Link>
          )}
        </div>
      </header>
    );
  }