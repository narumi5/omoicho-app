'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // すでにログイン済みの場合は日記ページにリダイレクト
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/diary');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // 成功時は日記一覧ページへリダイレクト
      router.push('/diary');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
      setLoading(false);
    }
  };

  // 認証チェック中は何も表示しない
  if (authLoading) {
    return null;
  }

  // すでにログイン済みの場合は何も表示しない（リダイレクト中）
  if (user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-pink p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <h1 className="mb-8 text-center text-3xl font-bold text-primary">ログイン</h1>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6文字以上"
                minLength={6}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              アカウントをお持ちでない方は{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                新規登録
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
