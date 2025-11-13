'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Home, PenLine, Settings, LogOut, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  const menuItems = [
    { href: '/diary', label: 'ホーム', icon: Home },
    { href: '/diary/new', label: '日記を書く', icon: PenLine },
    { href: '/couple', label: '設定', icon: Settings },
  ];

  return (
    <>
      {/* オーバーレイ（モバイル） */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={onClose} />
      )}

      {/* サイドバー */}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 md:relative md:inset-y-0 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* ヘッダー */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h1 className="text-2xl font-bold text-primary">想い帳</h1>
              {user && <p className="mt-2 text-sm text-gray-600">{user.name}</p>}
            </div>
            {/* 閉じるボタン（モバイルのみ） */}
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 md:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* メニュー */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                        isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ログアウト */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">ログアウト</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
