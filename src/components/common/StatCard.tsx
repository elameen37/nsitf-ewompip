import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: LucideIcon;
  accentColor?: 'green' | 'gold' | 'cyan' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon: Icon,
  accentColor = 'green',
}) => {
  const iconContainerStyles = {
    green: 'bg-[#00381e]/60 text-[#00c878] border-[#00703c]',
    gold: 'bg-[#3b2b00]/60 text-amber-400 border-[#785b00]',
    cyan: 'bg-[#042838]/60 text-cyan-400 border-[#085273]',
    purple: 'bg-[#271040]/60 text-purple-400 border-[#502280]',
  };

  return (
    <div className="bg-[#091c2f] rounded-2xl p-5 border border-[#132d4a] hover:border-[#00c878]/40 transition-all duration-300 shadow-lg flex flex-col justify-between space-y-3">
      {/* Top Header Row */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight font-sans">
            {value}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border ${iconContainerStyles[accentColor]} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Subtitle & Trend Pill Badge */}
      <div className="space-y-2 pt-1">
        {subtitle && <div className="text-xs text-slate-400 leading-snug">{subtitle}</div>}

        {change && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border ${
              isPositive
                ? 'bg-[#00381e] text-[#00e680] border-[#008048]'
                : 'bg-[#3b1218] text-[#ff6b7d] border-[#85222f]'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};
