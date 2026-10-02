import React from 'react';
import { Printer, Bookmark, RotateCcw, Share2 } from 'lucide-react';
import type { UserProfile } from '../types/financial';

interface NavbarProps {
  currentProfile: UserProfile;
  savedPlansCount: number;
  onOpenSavedPlans: () => void;
  onReset: () => void;
  onPrint: () => void;
  onShare: () => void;
  currentStep: number;
  onNavigateStep: (step: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedPlansCount,
  onOpenSavedPlans,
  onReset,
  onPrint,
  onShare,
  currentStep,
  onNavigateStep,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
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
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 bg-clip-text text-transparent">
                  SalaryWise
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  India 🇮🇳
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Smart Salary Allocation & Wealth Blueprint
              </p>
            </div>
          </div>

          {/* Quick Steps Navigation if already on step 4 or moving around */}
          {currentStep > 1 && (
            <div className="hidden md:flex items-center bg-slate-100/90 rounded-full p-1 border border-slate-200 text-xs font-medium text-slate-600">
              <button
                onClick={() => onNavigateStep(1)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  currentStep === 1 ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                1. Stage
              </button>
              <button
                onClick={() => onNavigateStep(2)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  currentStep === 2 ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                2. Salary
              </button>
              <button
                onClick={() => onNavigateStep(3)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  currentStep === 3 ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                3. Profile
              </button>
              <button
                onClick={() => onNavigateStep(4)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  currentStep === 4 ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'hover:text-slate-900'
                }`}
              >
                4. Blueprint
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Saved Plans */}
            <button
              onClick={onOpenSavedPlans}
              className="relative p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-transparent hover:border-slate-200"
              title="Saved Plans"
            >
              <Bookmark className="w-4 h-4 text-emerald-600" />
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
                  className="p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-transparent hover:border-slate-200"
                  title="Share Blueprint"
                >
                  <Share2 className="w-4 h-4 text-indigo-600" />
                  <span className="hidden md:inline">Share</span>
                </button>

                {/* Print Button */}
                <button
                  onClick={onPrint}
                  className="p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-transparent hover:border-slate-200 no-print"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span className="hidden md:inline">Print</span>
                </button>
              </>
            )}

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-2 sm:px-3 sm:py-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-1.5 text-xs sm:text-sm font-medium border border-transparent hover:border-rose-200"
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
