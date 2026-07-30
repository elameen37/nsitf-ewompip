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
  const accentClasses = {
    green: 'border-nsitf-green-500/30 text-nsitf-green-400 bg-nsitf-green-500/10 shadow-glow-green',
    gold: 'border-nsitf-gold-500/30 text-nsitf-gold-400 bg-nsitf-gold-500/10 shadow-glow-gold',
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10 shadow-glow-cyan',
    purple: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  };

  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-nsitf-green-500/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <div className="text-2xl lg:text-3xl font-extrabold text-white mt-1 tracking-tight font-sans">
            {value}
          </div>
        </div>

        <div className={`p-3 rounded-xl border ${accentClasses[accentColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        {change && (
          <div
            className={`flex items-center gap-1 font-semibold font-mono px-2 py-0.5 rounded ${
              isPositive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{change}</span>
          </div>
        )}
        {subtitle && <span className="text-slate-400 font-medium truncate">{subtitle}</span>}
      </div>
    </div>
  );
};
