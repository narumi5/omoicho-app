'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/contexts/AuthContext';
import { useUserWithCouple } from '@/hooks/useUserWithCouple';
import { Alert } from '@/components/ui/Alert';

export default function CouplePage() {
  const { user } = useAuth();
  const { coupleData, loading, error } = useUserWithCouple();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-2xl px-4">
          <Alert variant="error">{error}</Alert>
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
