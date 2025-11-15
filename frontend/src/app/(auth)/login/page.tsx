'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z
    .string({ message: 'メールアドレスを入力してください' })
    .email({ message: '有効なメールアドレスを入力してください' }),
  password: z
    .string({ message: 'パスワードを入力してください' })
    .min(6, { message: 'パスワードは6文字以上で入力してください' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading: authLoading } = useAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // すでにログイン済みの場合は日記ページにリダイレクト
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/diary');
    }
  }, [user, authLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    setError('');

    try {
      await login(data.email, data.password);
      // 成功時は日記一覧ページへリダイレクト
      router.push('/diary');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField label="メールアドレス" error={errors.email?.message} htmlFor="email">
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register('email')}
              />
            </FormField>

            <FormField label="パスワード" error={errors.password?.message} htmlFor="password">
              <Input
                id="password"
                type="password"
                placeholder="6文字以上"
                {...register('password')}
              />
            </FormField>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="mb-3 text-center text-sm text-gray-600">アカウントをお持ちでない方</p>
            <Button as="link" href="/signup" variant="outline" className="w-full">
              新規登録
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
