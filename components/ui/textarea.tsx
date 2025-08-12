import React, { forwardRef } from 'react';
import { TextareaProps } from '@/types';
import { cn } from '@/lib/utils';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value,
      onChange,
      placeholder,
      rows = 4,
      required = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed';

    const classes = cn(baseClasses, className);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={classes}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
