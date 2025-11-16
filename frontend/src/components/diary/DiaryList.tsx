import React from 'react';
import { Diary } from '@/types';
import { DiaryCard } from './DiaryCard';

interface DiaryListProps {
  diaries: Diary[];
}

export function DiaryList({ diaries }: DiaryListProps) {
  if (diaries.length === 0) {
    return <div className="py-8 text-center text-gray-500">まだ日記がありません</div>;
  }

  // 日付ごとにグループ化
  const groupedDiaries: { [date: string]: Diary[] } = {};
  diaries.forEach((diary) => {
    const dateKey = new Date(diary.date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!groupedDiaries[dateKey]) {
      groupedDiaries[dateKey] = [];
    }
    groupedDiaries[dateKey].push(diary);
  });

  return (
    <div>
      {Object.entries(groupedDiaries).map(([date, diariesInDate]) => (
        <div key={date} className="mb-8">
          {/* 日付ヘッダー */}
          <div className="mb-4 flex items-center gap-4">
            <h2 className="whitespace-nowrap text-lg font-bold text-gray-700">{date}</h2>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* その日の日記 */}
          <div className="space-y-4">
            {diariesInDate.map((diary) => (
              <DiaryCard key={diary.id} diary={diary} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
