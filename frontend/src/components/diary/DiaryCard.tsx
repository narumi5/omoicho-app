import React from 'react';
import { Diary } from '@/types';
import { Card } from '@/components/ui/Card';

interface DiaryCardProps {
  diary: Diary;
}

export function DiaryCard({ diary }: DiaryCardProps) {
  return (
    <Card className="mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg">{diary.author?.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(diary.date).toLocaleDateString('ja-JP')}
          </p>
        </div>
        {diary.isPrivate && (
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
            プライベート
          </span>
        )}
      </div>
      <p className="text-gray-800 whitespace-pre-wrap mb-4">{diary.content}</p>
      {diary.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {diary.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      )}
    </Card>
  );
}
