import React from 'react';
import { Diary } from '@/types';
import { DiaryCard } from './DiaryCard';

interface DiaryListProps {
  diaries: Diary[];
}

export function DiaryList({ diaries }: DiaryListProps) {
  if (diaries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        まだ日記がありません
      </div>
    );
  }

  return (
    <div>
      {diaries.map((diary) => (
        <DiaryCard key={diary.id} diary={diary} />
      ))}
    </div>
  );
}
