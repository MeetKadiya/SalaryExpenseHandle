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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Asset Allocation Structure
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
            Safe vs. Market-Linked Investments
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            How your investable capital is structured based on your{' '}
            <strong className="text-slate-800 capitalize">{riskPreference}</strong> risk preference.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-500 font-medium">Total Wealth Compounding</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {formatINR(breakdown.safeAmount + breakdown.marketAmount)}
            <span className="text-xs text-slate-500 font-normal"> /mo</span>
          </div>
        </div>
      </div>

      {/* Visual Bar Split */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-emerald-700 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> Safe / Lower-Risk Assets (
            {formatINR(breakdown.safeAmount)})
          </span>
          <span className="text-purple-700 flex items-center gap-1.5">
            Market-Linked Growth Assets ({formatINR(breakdown.marketAmount)}){' '}
            <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
          </span>
        </div>
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
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
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-emerald-950">
                    Safe / Lower-Risk Options
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Capital preservation & stability
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-emerald-800">
                  {formatINR(breakdown.safeAmount)}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium">per month</div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {breakdown.safeInstruments.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                  <div className="text-xs font-bold text-slate-800">{item.name}</div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                    <span>Risk Profile:</span>
                    <span>{item.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Market-Linked Growth */}
        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-purple-950">
                    Market-Linked Growth Options
                  </h4>
                  <span className="text-[11px] font-semibold text-purple-700">
                    Inflation-beating wealth compounding
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-purple-800">
                  {formatINR(breakdown.marketAmount)}
                </div>
                <div className="text-[11px] text-purple-600 font-medium">per month</div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {breakdown.marketInstruments.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-white border border-purple-100 shadow-2xs">
                  <div className="text-xs font-bold text-slate-800">{item.name}</div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md w-fit">
                    <span>Risk Profile:</span>
                    <span>{item.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice Warning */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Investment Risk Principle:</strong> No investment is completely “risk-free”. Fixed deposits and PPF are subject to purchasing power risk (inflation) and changing policy interest rates, whereas equities fluctuate daily with market volatility. We do not recommend specific individual company stocks.
        </span>
      </div>
    </div>
  );
};
