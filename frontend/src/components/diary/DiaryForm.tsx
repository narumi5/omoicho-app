'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface DiaryFormProps {
  onSubmit: (content: string, isPrivate: boolean) => void;
}

export function DiaryForm({ onSubmit }: DiaryFormProps) {
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content, isPrivate);
    setContent('');
    setIsPrivate(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="今日の出来事を書く..."
        className="w-full h-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        required
      />
      <div className="flex justify-between items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">プライベート（自分だけ）</span>
        </label>
        <Button type="submit">投稿</Button>
      </div>
    </form>
  );
}
