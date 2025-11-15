'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { VALIDATION } from '@/lib/constants';

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
    <form onSubmit={handleSubmit} className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="今日の出来事を書く..."
        className="mb-4 h-32 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        maxLength={VALIDATION.DIARY_MAX_LENGTH}
        required
      />
      <p className="mb-4 text-right text-xs text-gray-500">
        {content.length} / {VALIDATION.DIARY_MAX_LENGTH}文字
      </p>
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="mr-2"
          />
          <span className="text-[12px] text-gray-700 sm:text-sm">プライベート（自分だけ）</span>
        </label>
        <Button type="submit">投稿</Button>
      </div>
    </form>
  );
}
