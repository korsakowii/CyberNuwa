import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  rounded = false,
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variants = {
    default: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
    primary: 'bg-blue-100 text-blue-900 hover:bg-blue-200',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
    success: 'bg-green-100 text-green-900 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200',
    danger: 'bg-red-100 text-red-900 hover:bg-red-200',
    outline: 'border border-zinc-200 text-zinc-900 hover:bg-zinc-50',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    rounded ? 'rounded-full' : 'rounded-md',
    className
  );

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
