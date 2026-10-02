import React from 'react';
import type {
  RiskPreference,
  LivingSituation,
  EmergencySavingsStatus,
  Dependents,
  UserProfile,
} from '../types/financial';
import { Shield, Sparkles, Home, PiggyBank, Users, ArrowLeft, Check } from 'lucide-react';

interface FinancialProfileProps {
  profile: UserProfile;
  onChange: (updated: Partial<UserProfile>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const FinancialProfile: React.FC<FinancialProfileProps> = ({
  profile,
  onChange,
  onSubmit,
  onBack,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Step 3 of 3
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
          Tell us a little more
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
          These optional nuances fine-tune your emergency buffer, living needs, and investment style.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-8">
        {/* Country (India Fixed/Context) */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
            Target Country & Currency
          </label>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-2xl">🇮🇳</span>
            <div>
              <div className="text-sm font-bold text-slate-900">India (INR ₹)</div>
              <div className="text-xs text-slate-500">
                Calibrated for Indian tax deductions, PPF, EPF, NPS, and urban/semi-urban cost structures.
              </div>
            </div>
            <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              Selected
            </span>
          </div>
        </div>

        {/* 1. Risk Preference */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-emerald-600" />
            <label className="text-sm font-bold text-slate-900">
              Investment Risk Preference
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'conservative' as RiskPreference,
                label: 'Conservative',
                emoji: '🛡️',
                mix: '70% Safe / 30% Market',
                desc: 'Focus on capital protection, bank FDs, PPF, and low volatility.',
              },
              {
                id: 'balanced' as RiskPreference,
                label: 'Balanced',
                emoji: '⚖️',
                mix: '40% Safe / 60% Market',
                desc: 'Healthy mix of equity index funds for growth plus debt anchors.',
              },
              {
                id: 'growth' as RiskPreference,
                label: 'Growth',
                emoji: '🚀',
                mix: '15% Safe / 85% Market',
                desc: 'Aggressive wealth compounding via diversified index & flexi-caps.',
              },
            ].map((opt) => {
              const isSelected = profile.riskPreference === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => onChange({ riskPreference: opt.id })}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{opt.emoji}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[11px] font-semibold text-emerald-700 mb-1">{opt.mix}</div>
                  <div className="text-xs text-slate-500 leading-snug">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Living Situation */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-4 h-4 text-sky-600" />
            <label className="text-sm font-bold text-slate-900">
              Living Situation
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'family' as LivingSituation,
                label: 'Living with Family',
                emoji: '🏡',
                effect: 'Lower needs, higher investing power',
                desc: 'Shared household expenses allow greater allocation to wealth creation.',
              },
              {
                id: 'renting' as LivingSituation,
                label: 'Renting',
                emoji: '🏢',
                effect: 'Standard rental overhead',
                desc: 'Allocates a disciplined buffer for city rent, deposit & utilities.',
              },
              {
                id: 'ownHouse' as LivingSituation,
                label: 'Own House',
                emoji: '🏠',
                effect: 'Maintenance / EMI buffer',
                desc: 'Budgets for property maintenance, taxes, or home loan servicing.',
              },
            ].map((opt) => {
              const isSelected = profile.livingSituation === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => onChange({ livingSituation: opt.id })}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-600 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{opt.emoji}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[11px] font-semibold text-sky-700 mb-1">{opt.effect}</div>
                  <div className="text-xs text-slate-500 leading-snug">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Existing Emergency Savings */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PiggyBank className="w-4 h-4 text-emerald-600" />
            <label className="text-sm font-bold text-slate-900">
              Existing Emergency Savings Cushion
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                id: 'none' as EmergencySavingsStatus,
                label: 'None (0 months)',
                emoji: '❌',
                status: 'Urgent priority',
                desc: 'Plan will boost emergency savings first',
              },
              {
                id: '1to3' as EmergencySavingsStatus,
                label: '1–3 Months',
                emoji: '⏳',
                status: 'Building up',
                desc: 'On the right track',
              },
              {
                id: '3to6' as EmergencySavingsStatus,
                label: '3–6 Months',
                emoji: '🛡️',
                status: 'Healthy cushion',
                desc: 'Standard resilient foundation',
              },
              {
                id: '6plus' as EmergencySavingsStatus,
                label: '6+ Months',
                emoji: '💎',
                status: 'Fully shielded',
                desc: 'Surplus redirected into wealth',
              },
            ].map((opt) => {
              const isSelected = profile.emergencySavings === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => onChange({ emergencySavings: opt.id })}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{opt.emoji}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                    {opt.status}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Dependents */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-purple-600" />
            <label className="text-sm font-bold text-slate-900">
              Number of Financial Dependents
            </label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                id: 'none' as Dependents,
                label: 'None',
                desc: 'Only supporting yourself',
                emoji: '👤',
              },
              {
                id: '1to2' as Dependents,
                label: '1–2 Dependents',
                desc: 'Spouse, child, or elderly parent',
                emoji: '👨‍👩‍👦',
              },
              {
                id: '3plus' as Dependents,
                label: '3+ Dependents',
                desc: 'Larger family safety requirements',
                emoji: '👨‍👩‍👧‍👦',
              },
            ].map((opt) => {
              const isSelected = profile.dependents === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => onChange({ dependents: opt.id })}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-600 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{opt.emoji}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[11px] text-slate-500">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Salary</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-2xl transition-all flex items-center gap-3 cursor-pointer text-base sm:text-lg group"
        >
          <span>Calculate My Plan</span>
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};
