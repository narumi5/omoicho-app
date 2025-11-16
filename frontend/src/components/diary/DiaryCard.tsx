import React from 'react';
import Image from 'next/image';
import { Diary } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface DiaryCardProps {
  diary: Diary;
}

export function DiaryCard({ diary }: DiaryCardProps) {
  return (
    <Card className="mb-4">
      <div className="mb-2">
        <h3 className="text-lg font-bold">{diary.author?.name}</h3>
        <p className="text-sm text-gray-500">{new Date(diary.date).toLocaleDateString('ja-JP')}</p>
      </div>
      <p
        className="mb-4 overflow-hidden break-words text-gray-800"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}
      >
        {diary.content}
      </p>
      {diary.images.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {diary.images.map((image, index) => (
            <div key={index} className="relative h-32 w-full">
              <Image src={image} alt={`Image ${index + 1}`} fill className="rounded object-cover" />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end">
        <Button as="link" href={`/diary/${diary.id}`} variant="outline" className="text-sm">
          詳細
        </Button>
      </div>
    </Card>
  );
}
