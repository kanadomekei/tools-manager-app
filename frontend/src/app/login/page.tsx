'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでログイン処理を実装します
    console.log('ログイン処理:', email, password);
    // ログイン成功後、ホーム画面にリダイレクト
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="flex items-center justify-center pt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">ログイン</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-[#3498DB] hover:bg-[#2980B9]">
                ログイン
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでない方は
              <Link href="/register" className="text-[#3498DB] hover:underline">
                こちら
              </Link>
              から登録
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}