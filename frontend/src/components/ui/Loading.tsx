import React from 'react';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = '読み込み中...' }: LoadingProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
}
