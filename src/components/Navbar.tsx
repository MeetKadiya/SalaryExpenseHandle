import React from 'react';
import { Printer, Bookmark, RotateCcw, Share2, Sun, Moon } from 'lucide-react';
import type { UserProfile } from '../types/financial';
import type { Theme } from '../utils/theme';

interface NavbarProps {
  currentProfile: UserProfile;
  savedPlansCount: number;
  onOpenSavedPlans: () => void;
  onReset: () => void;
  onPrint: () => void;
  onShare: () => void;
  currentStep: number;
  onNavigateStep: (step: number) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedPlansCount,
  onOpenSavedPlans,
  onReset,
  onPrint,
  onShare,
  currentStep,
  onNavigateStep,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigateStep(1)}
            title="SalaryWise Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-extrabold text-xl group-hover:scale-105 transition-transform">
              <span>₹</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 dark:from-white dark:via-slate-100 dark:to-emerald-400 bg-clip-text text-transparent">
                  SalaryWise
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800">
                  India
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Simple Salary Allocation & Financial Plan
              </p>
            </div>
          </div>

          {/* Quick Steps Navigation if already on step 4 or moving around */}
          {currentStep > 1 && (
            <div className="hidden md:flex items-center bg-slate-100/90 dark:bg-slate-800/90 rounded-full p-1 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
              <button
                onClick={() => onNavigateStep(1)}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  currentStep === 1
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1. Stage
              </button>
              <button
                onClick={() => onNavigateStep(2)}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  currentStep === 2
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2. Salary
              </button>
              <button
                onClick={() => onNavigateStep(3)}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  currentStep === 3
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                3. Profile
              </button>
              <button
                onClick={() => onNavigateStep(4)}
                className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  currentStep === 4
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                4. Blueprint
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Saved Plans */}
            <button
              onClick={onOpenSavedPlans}
              className="relative p-2 sm:px-3 sm:py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
              title="Saved Plans"
            >
              <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Saved Plans</span>
              {savedPlansCount > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {savedPlansCount}
                </span>
              )}
            </button>

            {currentStep === 4 && (
              <>
                {/* Share Button */}
                <button
                  onClick={onShare}
                  className="p-2 sm:px-3 sm:py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
                  title="Share Blueprint"
                >
                  <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="hidden md:inline">Share</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={onPrint}
                  className="p-2 sm:px-3 sm:py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-transparent hover:border-slate-200 dark:hover:border-slate-700 no-print cursor-pointer"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span className="hidden md:inline">Print</span>
                </button>
              </>
            )}

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-2 sm:px-3 sm:py-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-medium border border-transparent hover:border-rose-200 dark:hover:border-rose-800 cursor-pointer"
              title="Reset All Inputs"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
