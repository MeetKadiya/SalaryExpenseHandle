import React from 'react';
import type { AllocationResult, UserProfile } from '../types/financial';
import { Sparkles, CheckCircle2, ShieldCheck, Lightbulb, HelpCircle } from 'lucide-react';

interface FinancialExplanationProps {
  result: AllocationResult;
  profile?: UserProfile;
}

export const FinancialExplanation: React.FC<FinancialExplanationProps> = ({
  result,
}) => {
  const { explanation } = result;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800 transition-colors">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
              Clear Financial Reasoning
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Why this allocation?
            </h3>
          </div>
        </div>

        {/* Dynamic Summary */}
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 font-normal">
          {explanation.summary}
        </p>

        {/* 2 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Emergency Fund Rationale */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Emergency Safety Strategy</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {explanation.emergencyReason}
            </p>
          </div>

          {/* Investment Strategy */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Investment Risk Framework</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {explanation.investmentStrategy}
            </p>
          </div>
        </div>

        {/* Highlights Checklist */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
            Key Highlights of Your Plan
          </div>
          {explanation.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Educational Indian Context Tip */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200 leading-relaxed">
          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Tax Tip:</strong> When implementing your plan, you can use Section 80C (PPF, ELSS up to ₹1.5L) and Section 80D (Health Insurance) if you use the Old Tax Regime. In the New Tax Regime, low-cost broad index funds without lock-in periods give you complete freedom.
          </span>
        </div>
      </div>
    </div>
  );
};
