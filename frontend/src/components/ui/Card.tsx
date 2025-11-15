import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`overflow-hidden rounded-lg bg-white p-6 shadow-md ${className}`}>
      {children}
    </div>
  );
}
