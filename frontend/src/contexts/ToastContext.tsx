'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { TOAST } from '@/lib/constants';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  isAutoClosing?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => string;
  removeToast: (id: string) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showLoading: (message: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = Math.random().toString(36).substring(7);
      const toast: Toast = { id, type, message };

      setToasts((prev) => [...prev, toast]);

      // ローディング以外は自動で消える（フェードアウトアニメーション付き）
      if (type !== 'loading') {
        const duration =
          type === 'error'
            ? TOAST.DURATION.ERROR
            : type === 'success'
              ? TOAST.DURATION.SUCCESS
              : TOAST.DURATION.INFO;
        setTimeout(() => {
          // フェードアウト開始
          setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isAutoClosing: true } : t)));
          // アニメーション後に削除
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
          }, TOAST.ANIMATION_DURATION);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (message: string) => {
      showToast(message, 'success');
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string) => {
      showToast(message, 'error');
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      showToast(message, 'info');
    },
    [showToast]
  );

  const showLoading = useCallback(
    (message: string) => {
      return showToast(message, 'loading');
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
        showSuccess,
        showError,
        showInfo,
        showLoading,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
