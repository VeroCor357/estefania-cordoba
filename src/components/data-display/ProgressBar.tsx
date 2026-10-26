import React from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'institutional' | 'success' | 'warning' | 'danger' | 'auto';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = true,
  size = 'md',
  variant = 'auto',
  className = '',
}) => {
  const safeValue = Math.max(0, Math.min(value, max));
  const percentage = Math.round((safeValue / max) * 100);

  // Auto variant based on progress percentage
  const resolvedVariant =
    variant === 'auto'
      ? percentage >= 80
        ? 'success'
        : percentage >= 40
        ? 'institutional'
        : percentage >= 20
        ? 'warning'
        : 'danger'
      : variant;

  const barColors = {
    institutional: 'bg-[#0c3b1e]',
    success: 'bg-emerald-600',
    warning: 'bg-amber-500',
    danger: 'bg-red-600',
  };

  const textColors = {
    institutional: 'text-[#0c3b1e]',
    success: 'text-emerald-700',
    warning: 'text-amber-700',
    danger: 'text-red-700',
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full flex items-center gap-2 ${className}`}>
      <div className={`flex-1 bg-gray-200 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-500 ${barColors[resolvedVariant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={`text-xs font-bold shrink-0 min-w-[36px] text-right ${textColors[resolvedVariant]}`}>
          {percentage}%
        </span>
      )}
    </div>
  );
};
