'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DiaryList } from '@/components/diary/DiaryList';
import { useDiaries } from '@/hooks/useDiaries';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PenLine } from 'lucide-react';
import { getMe } from '@/lib/api/auth';
import { createCouple, joinCouple, getCoupleInfo } from '@/lib/api/couples';
import { useToast } from '@/lib/toast';

interface CoupleData {
  id: string;
  inviteCode: string;
  partner?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function DiaryPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const meData = await getMe();
        if (meData.data?.coupleId) {
          setCoupleId(meData.data.coupleId);
          // カップル情報を取得
          const coupleInfo = await getCoupleInfo(meData.data.coupleId);
          setCoupleData(coupleInfo.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const { diaries, loading } = useDiaries(coupleId || '');

  const handleCreateCouple = async () => {
    try {
      setError('');
      const data = await createCouple();
      setCoupleData({
        id: data.data.coupleId,
        inviteCode: data.data.inviteCode,
      });
      setCoupleId(data.data.coupleId);
      showSuccess('招待コードを発行しました！');
    } catch (error) {
      console.error('Failed to create couple:', error);
      const message = error instanceof Error ? error.message : 'カップル作成に失敗しました';
      setError(message);
      showError(message);
    }
  };

  const handleJoinCouple = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      await joinCouple(inviteCode);
      showSuccess('カップルに参加しました！');
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Failed to join couple:', error);
      const message = error instanceof Error ? error.message : 'カップル参加に失敗しました';
      setError(message);
      showError(message);
    }
  };

  const copyToClipboard = async () => {
    if (!coupleData?.inviteCode) return;

    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(coupleData.inviteCode);
        showSuccess('招待コードをコピーしました！');
      } else {
        // フォールバック: 古いブラウザ用
        const textArea = document.createElement('textarea');
        textArea.value = coupleData.inviteCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSuccess('招待コードをコピーしました！');
      }
    } catch (error) {
      console.error('Failed to copy:', error);
      showError('コピーに失敗しました');
    }
  };

  if (userLoading) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  // パートナー設定済みの場合
  if (coupleData?.partner) {
    return (
      <div className="py-8">
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

  // パートナー未設定の場合
  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-700">パートナー設定</h1>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* カップル作成済みの場合：招待コード表示 + 参加フォーム */}
        {coupleData?.inviteCode ? (
          <div className="mx-auto max-w-md space-y-6">
            <Card>
              <h2 className="mb-4 text-xl font-bold text-gray-700">招待コード</h2>
              <p className="mb-4 text-sm text-gray-600">
                パートナーが参加するまで、このコードを共有してください
              </p>
              <div className="rounded-lg border border-pink-200 bg-pink-50 p-3 md:p-4">
                <p className="mb-2 text-sm text-gray-600">招待コード:</p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="break-all font-mono text-xl font-bold text-primary md:text-2xl">
                    {coupleData.inviteCode}
                  </p>
                  <Button
                    onClick={copyToClipboard}
                    variant="secondary"
                    className="whitespace-nowrap text-sm"
                  >
                    コピー
                  </Button>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  このコードをパートナーに共有してください
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="mb-4 text-xl font-bold text-gray-700">カップルに参加</h2>
              <p className="mb-4 text-sm text-gray-600">パートナーの招待コードを入力してください</p>
              <form onSubmit={handleJoinCouple}>
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="招待コードを入力"
                  required
                  className="mb-4"
                />
                <Button type="submit" className="w-full">
                  参加する
                </Button>
              </form>
            </Card>
          </div>
        ) : (
          /* カップル未作成の場合：作成 or 参加 */
          <div className="mx-auto max-w-md space-y-6">
            <Card>
              <h2 className="mb-4 text-xl font-bold text-gray-700">カップルを作成</h2>
              <p className="mb-4 text-sm text-gray-600">
                招待コードを発行してパートナーを招待します
              </p>
              <Button onClick={handleCreateCouple} className="w-full">
                招待コードを発行
              </Button>
            </Card>

            <Card>
              <h2 className="mb-4 text-xl font-bold text-gray-700">カップルに参加</h2>
              <p className="mb-4 text-sm text-gray-600">パートナーの招待コードを入力してください</p>
              <form onSubmit={handleJoinCouple}>
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="招待コードを入力"
                  required
                  className="mb-4"
                />
                <Button type="submit" className="w-full">
                  参加する
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
