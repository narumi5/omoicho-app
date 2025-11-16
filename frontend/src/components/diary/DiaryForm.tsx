'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { VALIDATION } from '@/lib/constants';

interface DiaryFormProps {
  onSubmit: (content: string) => void;
}

export function DiaryForm({ onSubmit }: DiaryFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
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
      <div className="flex items-center justify-end">
        <Button type="submit">投稿</Button>
      </div>
    </form>
  );
}
