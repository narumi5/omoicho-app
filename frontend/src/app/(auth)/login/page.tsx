'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { LoginInput, LoginResponse, ApiResponse } from '@/types/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loginData: LoginInput = {
        email,
        password,
      };

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          const result: ApiResponse<LoginResponse> = await response.json();
          setError(result.error || 'ログインに失敗しました');
        } else {
          setError('ログインに失敗しました');
        }
        setLoading(false);
        return;
      }

      await response.json();

      // 成功時はホームページへリダイレクト
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('通信エラーが発生しました');
      setLoading(false);
    }
  };

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
