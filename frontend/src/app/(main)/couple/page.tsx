'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { createCouple, joinCouple, getCoupleInfo } from '@/lib/api/couples';
import { getMe } from '@/lib/api/auth';

interface CoupleData {
  id: string;
  inviteCode: string;
  partner?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function CouplePage() {
  const { user } = useAuth();
  const [inviteCode, setInviteCode] = useState('');
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // カップル情報を取得
  useEffect(() => {
    const fetchCoupleData = async () => {
      try {
        const meData = await getMe();
        if (meData.data?.coupleId) {
          const coupleInfo = await getCoupleInfo(meData.data.coupleId);
          setCoupleData(coupleInfo.data);
        } else {
          setCoupleData(null);
        }
      } catch (error) {
        console.error('Failed to fetch couple data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupleData();
  }, []);

  const handleCreateCouple = async () => {
    try {
      setError('');
      const data = await createCouple();
      setCoupleData({
        id: data.data.coupleId,
        inviteCode: data.data.inviteCode,
      });
    } catch (error) {
      console.error('Failed to create couple:', error);
      setError(error instanceof Error ? error.message : 'カップル作成に失敗しました');
    }
  };

  const handleJoinCouple = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      await joinCouple(inviteCode);
      window.location.reload();
    } catch (error) {
      console.error('Failed to join couple:', error);
      setError(error instanceof Error ? error.message : 'カップル参加に失敗しました');
    }
  };

  const copyToClipboard = () => {
    if (coupleData?.inviteCode) {
      navigator.clipboard.writeText(coupleData.inviteCode);
      alert('招待コードをコピーしました！');
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

  // カップル既存の場合
  if (coupleData?.partner) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-700">設定</h1>

          {/* マイページ情報 */}
          <Card className="mb-6">
            <h2 className="mb-4 text-xl font-bold text-gray-700">マイページ</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">名前</p>
                <p className="text-lg font-medium text-gray-700">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">メールアドレス</p>
                <p className="text-lg font-medium text-gray-700">{user?.email}</p>
              </div>
            </div>
          </Card>

          {/* パートナー情報 */}
          <Card>
            <h2 className="mb-4 text-xl font-bold text-gray-700">パートナー情報</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">名前</p>
                <p className="text-lg font-medium text-gray-700">{coupleData.partner.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">メールアドレス</p>
                <p className="text-lg font-medium text-gray-700">{coupleData.partner.email}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // カップル未設定の場合
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-700">設定</h1>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* カップル作成済みの場合：招待コード表示のみ */}
        {coupleData?.inviteCode ? (
          <Card className="mx-auto max-w-md">
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
                  className="whitespace-nowrap text-sm"
                  variant="secondary"
                >
                  コピー
                </Button>
              </div>
              <p className="mt-3 text-xs text-gray-500">このコードをパートナーに共有してください</p>
            </div>
          </Card>
        ) : (
          /* カップル未作成の場合：作成 or 参加 */
          <div className="grid gap-6 md:grid-cols-2">
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
