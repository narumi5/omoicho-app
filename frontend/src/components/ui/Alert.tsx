import React from 'react';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ variant = 'info', children, className = '' }: AlertProps) {
  const variantStyles = {
    error: 'border-red-200 bg-red-50 text-red-600',
    success: 'border-green-200 bg-green-50 text-green-600',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-600',
    info: 'border-blue-200 bg-blue-50 text-blue-600',
  };

  return (
    <div
      className={`rounded-lg border px-4 py-3 ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
}
