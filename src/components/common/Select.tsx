import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  placeholder,
  className,
  id,
  disabled,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-gray-700 tracking-wide">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          ref={ref}
          disabled={disabled}
          className={twMerge(
            clsx(
              'w-full bg-white border rounded-md text-sm text-gray-900 transition-colors appearance-none pr-9 py-2 px-3',
              'focus:outline-none focus:ring-2 focus:ring-[#0c3b1e]/20 focus:border-[#0c3b1e]',
              'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300',
              className
            )
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 text-gray-400 pointer-events-none flex items-center">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
