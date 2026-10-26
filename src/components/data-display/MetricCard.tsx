import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export interface MetricCardProps {
  title: string;
  amount?: number;
  customValue?: string | number;
  percentage?: number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'green' | 'amber' | 'blue' | 'red' | 'dark' | 'gray';
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    text: string;
  };
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  amount,
  customValue,
  percentage,
  subtitle,
  icon: Icon,
  variant = 'green',
  trend,
  onClick,
}) => {
  const styles = {
    dark: {
      card: 'bg-[#0a2e18] text-white border-[#0c3b1e]',
      iconBg: 'bg-emerald-900/50 text-emerald-300',
      valueColor: 'text-white',
      subColor: 'text-emerald-200/80',
    },
    green: {
      card: 'bg-white text-gray-900 border-gray-200 border-l-4 border-l-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-700',
      valueColor: 'text-[#0c3b1e]',
      subColor: 'text-gray-500',
    },
    amber: {
      card: 'bg-white text-gray-900 border-gray-200 border-l-4 border-l-amber-500',
      iconBg: 'bg-amber-50 text-amber-700',
      valueColor: 'text-amber-800',
      subColor: 'text-gray-500',
    },
    blue: {
      card: 'bg-white text-gray-900 border-gray-200 border-l-4 border-l-blue-600',
      iconBg: 'bg-blue-50 text-blue-700',
      valueColor: 'text-blue-900',
      subColor: 'text-gray-500',
    },
    red: {
      card: 'bg-white text-gray-900 border-gray-200 border-l-4 border-l-red-600',
      iconBg: 'bg-red-50 text-red-700',
      valueColor: 'text-red-700',
      subColor: 'text-gray-500',
    },
    gray: {
      card: 'bg-white text-gray-900 border-gray-200 border-l-4 border-l-gray-400',
      iconBg: 'bg-gray-100 text-gray-700',
      valueColor: 'text-gray-800',
      subColor: 'text-gray-500',
    },
  };

  const current = styles[variant];

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-4 shadow-xs transition hover:shadow-md ${current.card} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <h4 className={`text-xl font-bold tracking-tight ${current.valueColor}`}>
              {customValue !== undefined
                ? customValue
                : amount !== undefined
                ? formatCurrency(amount)
                : '-'}
            </h4>
            {percentage !== undefined && (
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {percentage}%
              </span>
            )}
          </div>
          {subtitle && <p className={`mt-1 text-xs ${current.subColor}`}>{subtitle}</p>}
          {trend && (
            <p className="mt-2 text-[11px] font-medium text-emerald-600">
              {trend.text}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${current.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
