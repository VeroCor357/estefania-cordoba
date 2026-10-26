import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className,
  id,
  disabled,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-gray-700 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 text-gray-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={twMerge(
            clsx(
              'w-full bg-white border rounded-md text-sm text-gray-900 placeholder:text-gray-400 transition-colors',
              'py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0c3b1e]/20 focus:border-[#0c3b1e]',
              'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
              icon && iconPosition === 'left' ? 'pl-9' : '',
              icon && iconPosition === 'right' ? 'pr-9' : '',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300',
              className
            )
          )}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 text-gray-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
