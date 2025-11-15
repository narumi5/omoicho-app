'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { getCoupleInfo } from '@/lib/api/couples';
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
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
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

  if (loading) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-700">設定</h1>

        {/* ログイン情報 */}
        <Card className="mb-6">
          <h2 className="mb-4 text-xl font-bold text-gray-700">ログイン情報</h2>
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
          {coupleData?.partner ? (
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
          ) : (
            <p className="text-gray-600">パートナーがいません</p>
          )}
        </Card>
      </div>
    </div>
  );
}
