'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function CouplePage() {
  const [inviteCode, setInviteCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleCreateCouple = async () => {
    try {
      // TODO: 実際のユーザーIDを取得
      const res = await fetch('/api/couples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user-123' }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedCode(data.inviteCode);
      }
    } catch (error) {
      console.error('Failed to create couple:', error);
    }
  };

  const handleJoinCouple = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: 実際のユーザーIDを取得
      const res = await fetch('/api/couples/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user-123', inviteCode }),
      });

      if (res.ok) {
        alert('カップルに参加しました！');
      }
    } catch (error) {
      console.error('Failed to join couple:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">カップル設定</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold mb-4">カップルを作成</h2>
            <p className="text-gray-600 mb-4 text-sm">
              招待コードを発行してパートナーを招待します
            </p>
            <Button onClick={handleCreateCouple} className="w-full">
              招待コードを発行
            </Button>
            {generatedCode && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-600 mb-2">招待コード:</p>
                <p className="text-2xl font-mono font-bold text-blue-600">
                  {generatedCode}
                </p>
              </div>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">カップルに参加</h2>
            <p className="text-gray-600 mb-4 text-sm">
              パートナーの招待コードを入力してください
            </p>
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
      </div>
    </div>
  );
}
