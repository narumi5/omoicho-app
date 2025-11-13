'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DiaryList } from '@/components/diary/DiaryList';
import { useDiaries } from '@/hooks/useDiaries';
import { Button } from '@/components/ui/Button';
import { PenLine } from 'lucide-react';
import { getMe } from '@/lib/api/auth';

export default function DiaryPage() {
  const router = useRouter();
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(true);

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
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const { diaries, loading } = useDiaries(coupleId || '');

  if (userLoading) {
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-700">日記一覧</h1>
          <Link href="/diary/new">
            <Button className="flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              日記を書く
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="py-8 text-center text-gray-500">読み込み中...</div>
        ) : (
          <DiaryList diaries={diaries} />
        )}
      </div>
    </div>
  );
}
