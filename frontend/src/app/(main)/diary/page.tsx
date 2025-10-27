'use client';

import React, { useState } from 'react';
import { DiaryForm } from '@/components/diary/DiaryForm';
import { DiaryList } from '@/components/diary/DiaryList';
import { useDiaries } from '@/hooks/useDiaries';

export default function DiaryPage() {
  // TODO: 実際のユーザー情報から取得
  const mockCoupleId = 'couple-123';
  const mockUserId = 'user-123';

  const { diaries, loading } = useDiaries(mockCoupleId);
  const [localDiaries, setLocalDiaries] = useState(diaries);

  const handleSubmit = async (content: string, isPrivate: boolean) => {
    try {
      const res = await fetch('/api/diaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          isPrivate,
          authorId: mockUserId,
          coupleId: mockCoupleId,
        }),
      });

      if (res.ok) {
        const newDiary = await res.json();
        setLocalDiaries([newDiary, ...localDiaries]);
      }
    } catch (error) {
      console.error('Failed to create diary:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">カップル日記</h1>
        <DiaryForm onSubmit={handleSubmit} />
        {loading ? (
          <div className="text-center py-8 text-gray-500">読み込み中...</div>
        ) : (
          <DiaryList diaries={localDiaries.length > 0 ? localDiaries : diaries} />
        )}
      </div>
    </div>
  );
}
