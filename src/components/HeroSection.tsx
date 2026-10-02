import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, TrendingUp, Wallet } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-50">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/30 via-teal-100/20 to-indigo-200/20 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Intelligent Salary Allocation Engine • India Edition</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
          Give Every Rupee <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            a Purpose.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
          Enter your salary, choose your life stage, and get a personalized plan for spending,
          saving, and investing — built with dynamic Indian living costs in mind.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all flex items-center justify-center gap-3 group transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Build My Salary Plan</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Takes under 60 seconds • No signup required
          </span>
        </div>

        {/* Visual Pipeline Card: Income → Needs → Savings → Investments → Goals */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-4 sm:p-6 max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-600 mb-4 text-center">
            How Your Rupee Flows
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 items-center">
            {/* Step 1: Income */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
              <span className="text-2xl mb-1">💵</span>
              <span className="text-xs font-bold text-slate-900">1. Income</span>
              <span className="text-[11px] text-slate-500">In-hand salary</span>
            </div>

            {/* Step 2: Needs */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-sky-50/70 border border-sky-200 hover:border-sky-300 transition-colors">
              <span className="text-2xl mb-1">🏠</span>
              <span className="text-xs font-bold text-sky-950">2. Needs</span>
              <span className="text-[11px] text-sky-600">Rent, groceries, bills</span>
            </div>

            {/* Step 3: Savings */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-300 transition-colors">
              <span className="text-2xl mb-1">🏦</span>
              <span className="text-xs font-bold text-emerald-950">3. Savings</span>
              <span className="text-[11px] text-emerald-600">Emergency cushion</span>
            </div>

            {/* Step 4: Investments */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-purple-50/70 border border-purple-200 hover:border-purple-300 transition-colors">
              <span className="text-2xl mb-1">📈</span>
              <span className="text-xs font-bold text-purple-950">4. Investments</span>
              <span className="text-[11px] text-purple-600">Index & safe wealth</span>
            </div>

            {/* Step 5: Goals */}
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center p-3 rounded-xl bg-teal-50/70 border border-teal-200 hover:border-teal-300 transition-colors">
              <span className="text-2xl mb-1">🎯</span>
              <span className="text-xs font-bold text-teal-950">5. Goals</span>
              <span className="text-[11px] text-teal-600">Life milestones</span>
            </div>
          </div>
        </div>

        {/* Trust Points */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Private — Runs locally in your browser</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span>Adapts dynamically to your life stage & risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-teal-600" />
            <span>Exact 100% mathematical allocation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
