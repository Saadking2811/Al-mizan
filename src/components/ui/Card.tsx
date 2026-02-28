'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className,
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddings: Record<string, string> = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

  return (
    <div
      className={cn(
        'card',
        paddings[padding],
        hover && 'hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
