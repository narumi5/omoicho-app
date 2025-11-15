'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/lib/toast';
import type { SignupInput, SignupResponse, ApiResponse } from '@/types/api';

export default function SignupPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
          const errorMessage = result.error || '登録に失敗しました';
          setError(errorMessage);
          showError(errorMessage);
        } else {
          setError('登録に失敗しました');
          showError('登録に失敗しました');
        }
        setLoading(false);
        return;
      }

      await response.json();

      // 成功時はログインページへリダイレクト
      showSuccess('アカウントを作成しました！');
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = '通信エラーが発生しました';
      setError(errorMessage);
      showError(errorMessage);
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
        {/* サインアップフォーム */}
        <Card className="w-full">
          <h1 className="mb-8 text-center text-3xl font-bold text-primary">新規登録</h1>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
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
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="mb-3 text-center text-sm text-gray-600">すでにアカウントをお持ちの方</p>
            <Button as="link" href="/login" variant="outline" className="w-full">
              ログイン
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
