import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, TrendingUp, Wallet, Home, PiggyBank, Target } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-50 dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 transition-colors">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/30 via-teal-100/20 to-indigo-200/20 dark:from-emerald-900/10 dark:via-teal-900/10 dark:to-indigo-900/10 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Simple Salary Planning Engine • India Edition</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6">
          Give Every Rupee <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 dark:from-emerald-400 dark:via-teal-400 dark:to-indigo-400 bg-clip-text text-transparent">
            a Purpose.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8">
          Enter your salary, choose your life stage, and get a clear, step-by-step plan for spending,
          saving, and investing — built with realistic Indian living costs.
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
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Takes under 60 seconds • 100% Free
          </span>
        </div>

        {/* Visual Pipeline with clean Lucide icons */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-4 sm:p-6 max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-4 text-center">
            How Your Rupee Flows
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 items-center">
            {/* Step 1: Income */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-slate-200/70 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 mb-1.5">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">1. Income</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">In-hand salary</span>
            </div>

            {/* Step 2: Needs */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 hover:border-sky-300 dark:hover:border-sky-600 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/70 flex items-center justify-center text-sky-700 dark:text-sky-300 mb-1.5">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-sky-950 dark:text-sky-200">2. Needs</span>
              <span className="text-[11px] text-sky-600 dark:text-sky-400">Rent, food, bills</span>
            </div>

            {/* Step 3: Savings */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/70 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-1.5">
                <PiggyBank className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">3. Savings</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Emergency fund</span>
            </div>

            {/* Step 4: Investments */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/70 flex items-center justify-center text-purple-700 dark:text-purple-300 mb-1.5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-purple-950 dark:text-purple-200">4. Investments</span>
              <span className="text-[11px] text-purple-600 dark:text-purple-400">Index & safe funds</span>
            </div>

            {/* Step 5: Goals */}
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/70 flex items-center justify-center text-teal-700 dark:text-teal-300 mb-1.5">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-teal-950 dark:text-teal-200">5. Goals</span>
              <span className="text-[11px] text-teal-600 dark:text-teal-400">Life milestones</span>
            </div>
          </div>
        </div>

        {/* Trust Points */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Private — Runs entirely in your browser</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Adapts dynamically to your stage & lifestyle</span>
          </div>
        </div>
      </div>
    </section>
  );
};
