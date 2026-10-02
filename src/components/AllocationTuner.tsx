import React, { useState } from 'react';
import type { CategoryKey, AllocationResult } from '../types/financial';
import { formatINR } from '../utils/formatters';
import { Sliders, RotateCcw, Check, AlertCircle } from 'lucide-react';

interface AllocationTunerProps {
  result: AllocationResult;
  monthlyIncome: number;
  onUpdatePercentages: (newPercentages: Record<CategoryKey, number>) => void;
  onResetToRecommended: () => void;
}

export const AllocationTuner: React.FC<AllocationTunerProps> = ({
  result,
  monthlyIncome,
  onUpdatePercentages,
  onResetToRecommended,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localPcts, setLocalPcts] = useState<Record<CategoryKey, number>>(() => {
    const pcts: any = {};
    Object.keys(result.allocations).forEach((k) => {
      pcts[k] = result.allocations[k as CategoryKey].percentage;
    });
    return pcts;
  });

  const totalSum = Object.values(localPcts).reduce((a, b) => a + b, 0);

  const handleSliderChange = (key: CategoryKey, val: number) => {
    const updated = { ...localPcts, [key]: val };
    setLocalPcts(updated);
    if (Object.values(updated).reduce((a, b) => a + b, 0) === 100) {
      onUpdatePercentages(updated);
    }
  };

  const handleAutoRebalance = () => {
    const keys = Object.keys(localPcts) as CategoryKey[];
    const currentTotal = totalSum || 1;
    const rebalanced: any = {};
    let sum = 0;
    let maxKey = keys[0];
    let maxVal = -1;

    keys.forEach((k) => {
      const p = Math.round((localPcts[k] / currentTotal) * 100);
      rebalanced[k] = p;
      sum += p;
      if (p > maxVal) {
        maxVal = p;
        maxKey = k;
      }
    });

    const diff = 100 - sum;
    if (diff !== 0) {
      rebalanced[maxKey] += diff;
    }

    setLocalPcts(rebalanced);
    onUpdatePercentages(rebalanced);
  };

  const handleApply = () => {
    if (totalSum === 100) {
      onUpdatePercentages(localPcts);
      setIsOpen(false);
    } else {
      handleAutoRebalance();
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Custom Allocation Fine-Tuning</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Want to tweak the exact percentages? Manually customize every allocation slice.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer border border-indigo-200 self-start sm:self-auto"
        >
          {isOpen ? 'Close Customizer' : 'Customize Percentages'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 pt-6 border-t border-slate-100 animate-fade-in space-y-6">
          {/* Total Sum Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-600">
                Total Percentage:
              </span>
              <span
                className={`text-base font-extrabold px-3 py-0.5 rounded-full ${
                  totalSum === 100
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {totalSum}%
              </span>
              {totalSum !== 100 && (
                <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Must equal exactly 100%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {totalSum !== 100 && (
                <button
                  type="button"
                  onClick={handleAutoRebalance}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  Auto-Balance to 100%
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onResetToRecommended();
                  const pcts: any = {};
                  Object.keys(result.allocations).forEach((k) => {
                    pcts[k] = result.allocations[k as CategoryKey].percentage;
                  });
                  setLocalPcts(pcts);
                }}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-100 font-medium cursor-pointer transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Recommended</span>
              </button>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(localPcts).map((key) => {
              const catKey = key as CategoryKey;
              const item = result.allocations[catKey];
              const pct = localPcts[catKey];
              const amt = Math.round((monthlyIncome * pct) / 100);

              return (
                <div
                  key={catKey}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </span>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 mr-2">{pct}%</span>
                      <span className="text-xs text-slate-500 font-semibold">{formatINR(amt)}</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={80}
                    step={1}
                    value={pct}
                    onChange={(e) => handleSliderChange(catKey, parseInt(e.target.value, 10))}
                    className="w-full cursor-pointer accent-indigo-600"
                  />
                </div>
              );
            })}
          </div>

          {/* Apply Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer shadow-md transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Apply Custom Allocation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
