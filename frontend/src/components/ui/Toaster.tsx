'use client';

import React, { useState } from 'react';
import { useToast, Toast as ToastType } from '@/contexts/ToastContext';

function Toast({
  toast,
  onRemove,
  isManualClose,
}: {
  toast: ToastType;
  onRemove: () => void;
  isManualClose: boolean;
}) {
  const handleClose = () => {
    onRemove();
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg
            className="h-5 w-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case 'loading':
        return (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        );
      default:
        return (
          <svg
            className="h-5 w-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      case 'loading':
        return 'border-primary';
      default:
        return 'border-blue-500';
    }
  };

  return (
    <div
      className={`flex min-w-[300px] max-w-md items-center gap-3 rounded-lg border-l-4 bg-white p-4 shadow-lg ${getBorderColor()} ${isManualClose || toast.isAutoClosing ? 'animate-fade-out' : 'animate-slide-in'} `}
    >
      {getIcon()}
      <p className="flex-1 text-sm text-gray-700">{toast.message}</p>
      {toast.type !== 'loading' && (
        <button
          onClick={handleClose}
          className="text-gray-400 transition-colors hover:text-gray-600"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export function Toaster() {
  const { toasts, removeToast } = useToast();
  const [manualClosing, setManualClosing] = useState<Set<string>>(new Set());

  const handleManualRemove = (id: string) => {
    setManualClosing((prev) => new Set(prev).add(id));
    setTimeout(() => {
      removeToast(id);
      setManualClosing((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 400);
  };

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            toast={toast}
            onRemove={() => handleManualRemove(toast.id)}
            isManualClose={manualClosing.has(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
