'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DiaryForm } from '@/components/diary/DiaryForm';
import { useAuth } from '@/contexts/AuthContext';
import { createDiary } from '@/lib/api/diaries';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/lib/toast';
import { useUserWithCouple } from '@/hooks/useUserWithCouple';
import { Alert } from '@/components/ui/Alert';

export default function NewDiaryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const { coupleId, coupleData, loading, error } = useUserWithCouple();

  const handleSubmit = async (content: string, isPrivate: boolean) => {
    if (!user || !coupleId) {
      showError('ログインとカップル設定が必要です');
      return;
    }

    try {
      await createDiary({
        content,
        isPrivate,
        authorId: user.id,
        coupleId: coupleId,
      });
      showSuccess('日記を作成しました！');
      setTimeout(() => router.push('/diary'), 1000);
    } catch (error) {
      console.error('Failed to create diary:', error);
      const message = error instanceof Error ? error.message : '日記の作成に失敗しました';
      showError(message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-md px-4">
          <Alert variant="error">{error}</Alert>
        </div>
      </div>
    );
  }

  // パートナー未設定の場合
  if (!coupleData?.partner) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-md px-4">
          <Card className="text-center">
            <p className="mb-6 text-gray-600">日記を書くにはパートナー設定をしてください</p>
            <Button as="link" href="/diary" className="w-full">
              ホームへ
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-700">日記を書く</h1>
        <DiaryForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
