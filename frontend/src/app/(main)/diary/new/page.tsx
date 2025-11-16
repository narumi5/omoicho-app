'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiaryForm } from '@/components/diary/DiaryForm';
import { useAuth } from '@/contexts/AuthContext';
import { createDiary, updateDiary } from '@/lib/api/diaries';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/lib/toast';
import { useUserWithCouple } from '@/hooks/useUserWithCouple';
import { Alert } from '@/components/ui/Alert';
import { Diary } from '@/types';
import api from '@/lib/axios';

export default function NewDiaryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const { coupleId, coupleData, loading, error } = useUserWithCouple();
  const [todayDiary, setTodayDiary] = useState<Diary | null>(null);
  const [checkingDiary, setCheckingDiary] = useState(true);

  // 今日の日記があるかチェック
  useEffect(() => {
    const checkTodayDiary = async () => {
      if (!user) return;

      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await api.get(`/api/diaries?authorId=${user.id}&date=${today}`);
        if (response.data) {
          setTodayDiary(response.data);
        }
      } catch (error) {
        console.error('Failed to check today diary:', error);
      } finally {
        setCheckingDiary(false);
      }
    };

    if (user) {
      checkTodayDiary();
    }
  }, [user]);

  const handleSubmit = async (content: string) => {
    if (!user || !coupleId) {
      showError('ログインとカップル設定が必要です');
      return;
    }

    try {
      if (todayDiary) {
        // 既存の日記を更新
        await updateDiary(todayDiary.id, { content });
        showSuccess('日記を更新しました！');
      } else {
        // 新規作成
        await createDiary({
          content,
          authorId: user.id,
          coupleId: coupleId,
        });
        showSuccess('日記を作成しました！');
      }
      setTimeout(() => router.push('/diary'), 1000);
    } catch (error) {
      console.error('Failed to save diary:', error);
      const message = error instanceof Error ? error.message : '日記の保存に失敗しました';
      showError(message);
    }
  };

  if (loading || checkingDiary) {
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
        <h1 className="mb-8 text-3xl font-bold text-gray-700">
          {todayDiary ? '今日の日記を編集' : '日記を書く'}
        </h1>
        {todayDiary && (
          <Alert variant="info" className="mb-4">
            今日はすでに日記を書いています。内容を編集できます。
          </Alert>
        )}
        <DiaryForm
          onSubmit={handleSubmit}
          initialContent={todayDiary?.content}
          isEdit={!!todayDiary}
        />
      </div>
    </div>
  );
}
