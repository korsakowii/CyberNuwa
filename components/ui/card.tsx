import React from 'react';
import { BaseComponentProps } from '@/types';
import { cn } from '@/lib/utils';

interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

interface CardHeaderProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

interface CardContentProps extends BaseComponentProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface CardFooterProps extends BaseComponentProps {
  justify?: 'start' | 'center' | 'end' | 'between';
}

const cardVariants = {
  default: 'bg-zinc-800 border border-zinc-700',
  outlined: 'bg-transparent border border-zinc-700',
  elevated: 'bg-zinc-800 border border-zinc-700 shadow-lg',
};

const cardPaddings = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const contentPaddings = {
  none: '',
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const footerJustify = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
  ...props
}) => {
  const classes = cn(
    'rounded-lg transition-all duration-200',
    cardVariants[variant],
    cardPaddings[padding],
    hover && 'hover:shadow-lg hover:border-zinc-600',
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('flex items-start justify-between', className)}
      {...props}
    >
      <div className='flex-1'>
        {title && (
          <h3 className='text-lg font-semibold text-white mb-1'>{title}</h3>
        )}
        {subtitle && <p className='text-sm text-zinc-400'>{subtitle}</p>}
        {children}
      </div>
      {action && <div className='ml-4 flex-shrink-0'>{action}</div>}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  padding = 'md',
  className,
  children,
  ...props
}) => {
  const classes = cn(contentPaddings[padding], className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  justify = 'start',
  className,
  children,
  ...props
}) => {
  const classes = cn('flex items-center', footerJustify[justify], className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// 组合组件
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
