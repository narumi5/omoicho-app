'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { SignupInput, SignupResponse, ApiResponse } from '@/types/api';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // パスワード確認チェック
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    setLoading(true);

    try {
      const signupData: SignupInput = {
        name,
        email,
        password,
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          const result: ApiResponse<SignupResponse> = await response.json();
          setError(result.error || '登録に失敗しました');
        } else {
          setError('登録に失敗しました');
        }
        setLoading(false);
        return;
      }

      await response.json();

      // 成功時はホームページへリダイレクト
      router.push('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError('通信エラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-pink p-4">
      <div className="w-full max-w-md">
        {/* サインアップフォーム */}
        <Card className="w-full">
          <h1 className="mb-8 text-center text-3xl font-bold text-primary">新規登録</h1>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 名前 */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                名前
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="山田太郎"
                required
              />
            </div>

            {/* メールアドレス */}
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

            {/* パスワード */}
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

            {/* パスワード確認 */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                パスワード（確認）
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="パスワードを再入力"
                minLength={6}
                required
              />
            </div>

            {/* 送信ボタン */}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? '登録中...' : '登録する'}
            </Button>
          </form>

          {/* ログインリンク */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              すでにアカウントをお持ちの方は{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                ログイン
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
