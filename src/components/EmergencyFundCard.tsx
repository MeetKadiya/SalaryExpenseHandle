import React from 'react';
import type { AllocationResult, UserProfile } from '../types/financial';
import { formatINR } from '../utils/formatters';
import { ShieldCheck, Clock } from 'lucide-react';

interface EmergencyFundCardProps {
  result: AllocationResult;
  profile: UserProfile;
}

export const EmergencyFundCard: React.FC<EmergencyFundCardProps> = ({
  result,
  profile,
}) => {
  const { emergencyFundMetrics, allocations } = result;
  const monthlySavings = allocations.emergency.amount;
  const isTargetAchieved = profile.emergencySavings === '6plus';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl">
            🏦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Safety Net Engine
              </span>
              {isTargetAchieved ? (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Fully Shielded
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Building Phase
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              Your Emergency Cushion Blueprint
            </h3>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-500 font-medium">Monthly Allocation</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700">
            {formatINR(monthlySavings)}
            <span className="text-xs text-slate-500 font-normal"> /mo ({allocations.emergency.percentage}%)</span>
          </div>
        </div>
      </div>

      {/* Target Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 block mb-1">
            Recommended Reserve Target
          </span>
          <div className="text-xl font-extrabold text-slate-900">
            {emergencyFundMetrics.targetMonthsMin}–{emergencyFundMetrics.targetMonthsMax} Months
          </div>
          <span className="text-xs text-slate-500">of essential living expenses</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-800 block mb-1">
            Target Cushion Amount
          </span>
          <div className="text-xl font-extrabold text-emerald-900">
            {formatINR(emergencyFundMetrics.targetAmountMin)} – {formatINR(emergencyFundMetrics.targetAmountMax)}
          </div>
          <span className="text-xs text-emerald-700">for complete peace of mind</span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-sky-800 block mb-1">
            Current Status Benchmark
          </span>
          <div className="text-base font-bold text-sky-950 mt-1">
            {emergencyFundMetrics.currentEstimatedMonths > 0
              ? `~${emergencyFundMetrics.currentEstimatedMonths} months reserved`
              : '0 months currently funded'}
          </div>
          <span className="text-xs text-sky-700">
            {emergencyFundMetrics.gapAmount > 0
              ? `Gap: ${formatINR(emergencyFundMetrics.gapAmount)}`
              : 'Goal achieved!'}
          </span>
        </div>
      </div>

      {/* Action Advice Box */}
      <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
        <div className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Recommended Next Action:</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {emergencyFundMetrics.actionAdvice}
        </p>
      </div>

      {/* Where to park emergency funds */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <span className="font-semibold text-slate-700">Best places to park this money in India:</span>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
            1. Bank Auto-Sweep Fixed Deposit (24/7 ATM/UPI access)
          </span>
          <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
            2. High-Yield Savings Account
          </span>
          <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
            3. Overnight / Liquid Mutual Funds
          </span>
        </div>
      </div>
    </div>
  );
};
