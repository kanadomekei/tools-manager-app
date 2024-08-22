'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }
    // ここで登録処理を実装します
    console.log('登録処理:', name, email, password);
    // 登録成功後、ログイン画面にリダイレクト
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="flex items-center justify-center pt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">アカウント登録</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">名前</label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
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
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">パスワード（確認）</label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-[#3498DB] hover:bg-[#2980B9]">
                登録
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちの方は
              <Link href="/login" className="text-[#3498DB] hover:underline">
                こちら
              </Link>
              からログイン
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}