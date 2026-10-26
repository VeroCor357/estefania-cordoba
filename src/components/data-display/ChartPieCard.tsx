import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export interface PieChartSegment {
  label: string;
  value: number;
  color: string;
}

export interface ChartPieCardProps {
  title: string;
  subtitle?: string;
  segments: PieChartSegment[];
  totalLabel?: string;
  showCurrency?: boolean;
}

export const ChartPieCard: React.FC<ChartPieCardProps> = ({
  title,
  subtitle,
  segments,
  totalLabel = 'Total Asignado',
  showCurrency = true,
}) => {
  const total = segments.reduce((acc, seg) => acc + seg.value, 0);

  // Calculate SVG arc paths or donut strokes
  const size = 180;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-5 flex flex-col justify-between">
      <div>
        <h4 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h4>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-4">
        {/* SVG Donut */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {total > 0 &&
              segments.map((segment, idx) => {
                const percent = (segment.value / total) * 100;
                const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += percent;

                return (
                  <circle
                    key={idx}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={segment.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    fill="transparent"
                    className="transition-all duration-500 hover:opacity-80"
                  />
                );
              })}
          </svg>

          {/* Center text in Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <span className="text-[10px] uppercase font-bold text-gray-500">{totalLabel}</span>
            <span className="text-sm font-extrabold text-[#0c3b1e]">
              {showCurrency ? formatCurrency(total) : total}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
          {segments.map((seg, idx) => {
            const percent = total > 0 ? ((seg.value / total) * 100).toFixed(1) : '0';
            return (
              <div key={idx} className="flex items-center justify-between sm:justify-start gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-gray-700 font-medium">{seg.label}</span>
                </div>
                <div className="text-right ml-auto">
                  <span className="font-bold text-gray-900 block">
                    {showCurrency ? formatCurrency(seg.value) : seg.value}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">({percent}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
