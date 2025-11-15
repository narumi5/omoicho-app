'use client';

import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-gray-200 bg-white md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-gray-100"
          aria-label="メニュー"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-primary">想い帳</h1>
        <div className="w-10" /> {/* 中央揃え用のスペーサー */}
      </div>
    </header>
  );
}
