'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { getDiary } from '@/lib/api/diaries';
import { Diary } from '@/types';

export default function DiaryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await getDiary(params.id as string);
        setDiary(response.data || (response as any));
      } catch (error) {
        console.error('Error fetching diary:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDiary();
    }
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (!diary) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-gray-500">日記が見つかりませんでした</p>
          <Button as="link" href="/diary" className="mt-4">
            一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl">日記詳細</h1>
          <Button as="link" href="/diary" variant="outline" className="shrink-0">
            一覧に戻る
          </Button>
        </div>

        <Card className="w-full">
          <div className="mb-4">
            <h2 className="text-xl font-bold">{diary.author?.name}</h2>
            <p className="text-sm text-gray-500">
              {new Date(diary.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </p>
          </div>

          <div
            className="mb-6 min-w-0 max-w-full whitespace-pre-wrap text-gray-800"
            style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
          >
            {diary.content}
          </div>

          {diary.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {diary.images.map((image, index) => (
                <div key={index} className="relative h-48 w-full min-w-0">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    fill
                    className="rounded object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
