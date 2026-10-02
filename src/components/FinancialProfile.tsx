import React from 'react';
import type {
  RiskPreference,
  LivingSituation,
  EmergencySavingsStatus,
  Dependents,
  UserProfile,
} from '../types/financial';
import {
  RiskIcon,
  LivingIcon,
  EmergencyStatusIcon,
  DependentsIcon,
} from './CategoryIcon';
import { Shield, Sparkles, Home, PiggyBank, Users, ArrowLeft, Check, Globe } from 'lucide-react';

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
        <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          Step 3 of 3
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 mb-2">
          Tell us a little more
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">
          These optional details fine-tune your emergency cushion and investment mix.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8 transition-colors">
        {/* Country (India Context) */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">
            Target Country & Currency
          </label>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">India (INR ₹)</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Calibrated for Indian tax frameworks, PPF, EPF, NPS, and urban cost standards.
              </div>
            </div>
            <span className="ml-auto text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
              Selected
            </span>
          </div>
        </div>

        {/* 1. Risk Preference */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <label className="text-sm font-bold text-slate-900 dark:text-white">
              Investment Risk Style
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'conservative' as RiskPreference,
                label: 'Conservative',
                mix: '70% Safe / 30% Market',
                desc: 'Focus on capital safety, fixed deposits, and low volatility.',
              },
              {
                id: 'balanced' as RiskPreference,
                label: 'Balanced',
                mix: '40% Safe / 60% Market',
                desc: 'Healthy mix of equity index funds and safe fixed income.',
              },
              {
                id: 'growth' as RiskPreference,
                label: 'Growth',
                mix: '15% Safe / 85% Market',
                desc: 'Maximum long-term compounding with diversified equity funds.',
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
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-500 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                      <RiskIcon risk={opt.id} className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{opt.label}</div>
                  <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1">{opt.mix}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Living Situation */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <label className="text-sm font-bold text-slate-900 dark:text-white">
              Living Situation
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'family' as LivingSituation,
                label: 'Living with Family',
                effect: 'Lower needs, higher investing power',
                desc: 'Shared household bills allow you to save and invest more.',
              },
              {
                id: 'renting' as LivingSituation,
                label: 'Renting',
                effect: 'Standard rental overhead',
                desc: 'Budgets for monthly city rent, security deposits, and bills.',
              },
              {
                id: 'ownHouse' as LivingSituation,
                label: 'Own House',
                effect: 'Maintenance / EMI buffer',
                desc: 'Budgets for property maintenance, taxes, or home loan EMIs.',
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
                      ? 'bg-sky-50/70 dark:bg-sky-950/40 border-sky-600 dark:border-sky-500 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/60 flex items-center justify-center text-sky-700 dark:text-sky-300">
                      <LivingIcon situation={opt.id} className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{opt.label}</div>
                  <div className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 mb-1">{opt.effect}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Existing Emergency Savings */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PiggyBank className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <label className="text-sm font-bold text-slate-900 dark:text-white">
              Current Emergency Cushion
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                id: 'none' as EmergencySavingsStatus,
                label: 'None (0 months)',
                status: 'Urgent priority',
              },
              {
                id: '1to3' as EmergencySavingsStatus,
                label: '1–3 Months',
                status: 'Building up',
              },
              {
                id: '3to6' as EmergencySavingsStatus,
                label: '3–6 Months',
                status: 'Healthy cushion',
              },
              {
                id: '6plus' as EmergencySavingsStatus,
                label: '6+ Months',
                status: 'Fully shielded',
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
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-600 dark:border-emerald-500 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                      <EmergencyStatusIcon status={opt.id} className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{opt.label}</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
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
            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <label className="text-sm font-bold text-slate-900 dark:text-white">
              Family Dependents
            </label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                id: 'none' as Dependents,
                label: 'None',
                desc: 'Supporting only yourself',
              },
              {
                id: '1to2' as Dependents,
                label: '1–2 Dependents',
                desc: 'Spouse, child, or parent',
              },
              {
                id: '3plus' as Dependents,
                label: '3+ Dependents',
                desc: 'Larger family requirements',
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
                      ? 'bg-purple-50/80 dark:bg-purple-950/50 border-purple-600 dark:border-purple-500 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300">
                      <DependentsIcon dependents={opt.id} className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{opt.label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{opt.desc}</div>
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
          className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer text-sm"
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
