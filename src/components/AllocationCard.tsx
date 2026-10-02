import React, { useState } from 'react';
import type { AllocationItem } from '../types/financial';
import { formatINR } from '../utils/formatters';
import { CategoryIcon } from './CategoryIcon';
import { ChevronDown, ChevronUp, Info, Shield, TrendingUp, ShieldCheck } from 'lucide-react';

interface AllocationCardProps {
  item: AllocationItem;
  totalIncome: number;
}

export const AllocationCard: React.FC<AllocationCardProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between group"
      style={{ borderTopColor: item.color, borderTopWidth: '4px' }}
    >
      <div>
        {/* Header: Icon, Title, Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${item.color}15`, color: item.color }}
            >
              <CategoryIcon category={item.key} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {item.label}
              </h4>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {formatINR(item.amount * 12)} / year
              </span>
            </div>
          </div>

          <div className="text-right">
            <div
              className="text-xl sm:text-2xl font-extrabold tracking-tight"
              style={{ color: item.color }}
            >
              {item.percentage}%
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {formatINR(item.amount)}
              <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">/mo</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(100, Math.max(2, item.percentage))}%`,
              backgroundColor: item.color,
            }}
          />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          {item.description}
        </p>

        {/* Role Callout */}
        <div className="flex items-start gap-1.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
          <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-700 dark:text-slate-200">Purpose:</strong> {item.whyImportant}
          </span>
        </div>
      </div>

      {/* Subcategories toggle */}
      {item.subcategories && item.subcategories.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors py-1 cursor-pointer"
          >
            <span>Recommended Sub-allocation</span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expanded && (
            <div className="mt-2.5 space-y-2 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800">
              {item.subcategories.map((sub, idx) => {
                const subAmt = Math.round((item.amount * sub.percentageShare) / 100);
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{sub.name}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                            sub.type === 'safe'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              : sub.type === 'market'
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'
                              : sub.type === 'protection'
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {sub.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{sub.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(subAmt)}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{sub.percentageShare}% share</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
