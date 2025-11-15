import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  disabled?: boolean;
  className?: string;
  href?: string;
  as?: 'button' | 'link';
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  href,
  as = 'button',
}: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center px-4 py-2 rounded-full font-medium transition-all active:scale-95';
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl',
    secondary:
      'bg-surface text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-md hover:shadow-lg',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl',
    outline:
      'bg-white text-primary border-2 border-primary hover:bg-surface-pink shadow-md hover:shadow-lg',
  };

  const classes = `${baseStyle} ${variantStyles[variant]} ${
    disabled ? 'transform-none cursor-not-allowed opacity-50' : ''
  } ${className}`;

  if (as === 'link' && href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
