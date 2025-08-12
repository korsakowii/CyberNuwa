import React, { forwardRef } from 'react';
import { InputProps } from '@/types';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      type = 'text',
      required = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const classes = cn(baseClasses, className);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={classes}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
