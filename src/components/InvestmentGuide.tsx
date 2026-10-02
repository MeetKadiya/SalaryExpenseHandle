import React from 'react';
import type { InvestmentBreakdown, RiskPreference } from '../types/financial';
import { formatINR } from '../utils/formatters';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';

interface InvestmentGuideProps {
  breakdown: InvestmentBreakdown;
  riskPreference: RiskPreference;
  totalMonthlySalary?: number;
}

export const InvestmentGuide: React.FC<InvestmentGuideProps> = ({
  breakdown,
  riskPreference,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
            Investment Structure
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-2">
            Safe vs. Market-Linked Investments
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            How your investable money is structured based on your{' '}
            <strong className="text-slate-800 dark:text-slate-200 capitalize">{riskPreference}</strong> risk preference.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Monthly Investing</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {formatINR(breakdown.safeAmount + breakdown.marketAmount)}
            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> /mo</span>
          </div>
        </div>
      </div>

      {/* Visual Bar Split */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Safe / Lower-Risk (
            {formatINR(breakdown.safeAmount)})
          </span>
          <span className="text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
            Market-Linked Growth ({formatINR(breakdown.marketAmount)}){' '}
            <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          </span>
        </div>
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-emerald-500 transition-all duration-700"
            style={{
              width: `${(breakdown.safeAmount / (breakdown.safeAmount + breakdown.marketAmount || 1)) * 100}%`,
            }}
            title="Safe Assets"
          />
          <div
            className="h-full bg-purple-600 transition-all duration-700"
            style={{
              width: `${(breakdown.marketAmount / (breakdown.safeAmount + breakdown.marketAmount || 1)) * 100}%`,
            }}
            title="Market-Linked Assets"
          />
        </div>
      </div>

      {/* Two Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Safe / Lower-Risk */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-200">
                    Safe / Lower-Risk Options
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    Capital preservation & steady interest
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-emerald-800 dark:text-emerald-300">
                  {formatINR(breakdown.safeAmount)}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">per month</div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {breakdown.safeInstruments.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 shadow-2xs">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md w-fit">
                    <span>Safety:</span>
                    <span>{item.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Market-Linked Growth */}
        <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-800/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-purple-950 dark:text-purple-200">
                    Market-Linked Growth Options
                  </h4>
                  <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-400">
                    Inflation-beating wealth compounding
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-purple-800 dark:text-purple-300">
                  {formatINR(breakdown.marketAmount)}
                </div>
                <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">per month</div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {breakdown.marketInstruments.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 shadow-2xs">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-md w-fit">
                    <span>Market Nature:</span>
                    <span>{item.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice Warning */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Important Investment Note:</strong> No investment is completely risk-free. Bank deposits have inflation risk, while stocks fluctuate with markets. SalaryWise does not recommend individual company stocks.
        </span>
      </div>
    </div>
  );
};
