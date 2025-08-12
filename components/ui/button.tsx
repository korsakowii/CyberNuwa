import React from 'react';
import { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
  secondary: 'bg-zinc-700 hover:bg-zinc-600 text-white border-transparent',
  outline:
    'bg-transparent border border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white',
  ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = cn(
    baseClasses,
    buttonVariants[variant],
    buttonSizes[size],
    className
  );

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <div className='mr-2 animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent' />
      )}
      {children}
    </button>
  );
};
