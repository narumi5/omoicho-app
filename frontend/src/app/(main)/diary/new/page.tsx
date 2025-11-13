'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiaryForm } from '@/components/diary/DiaryForm';
import { useAuth } from '@/contexts/AuthContext';
import { getMe } from '@/lib/api/auth';

export default function NewDiaryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const meData = await getMe();
        if (meData.data?.coupleId) {
          setCoupleId(meData.data.coupleId);
        } else {
          alert('カップル設定が必要です');
          router.push('/couple');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (content: string, isPrivate: boolean) => {
    if (!user || !coupleId) {
      alert('ログインとカップル設定が必要です');
      return;
    }

    try {
      const res = await fetch('/api/diaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          isPrivate,
          authorId: user.id,
          coupleId: coupleId,
        }),
      });

      if (res.ok) {
        // 日記作成後、一覧ページにリダイレクト
        router.push('/diary');
      } else {
        const errorData = await res.json();
        alert(`日記の作成に失敗しました: ${errorData.error || ''}`);
      }
    } catch (error) {
      console.error('Failed to create diary:', error);
      alert('日記の作成に失敗しました');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-700">日記を書く</h1>
        <DiaryForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
