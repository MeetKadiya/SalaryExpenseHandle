import React, { useState } from 'react';
import type {
  AllocationResult,
  UserProfile,
  CategoryKey,
} from '../types/financial';
import { formatINR } from '../utils/formatters';
import { AllocationCard } from './AllocationCard';
import { AllocationChart } from './AllocationChart';
import { FinancialExplanation } from './FinancialExplanation';
import { EmergencyFundCard } from './EmergencyFundCard';
import { InvestmentGuide } from './InvestmentGuide';
import { GoalCalculator } from './GoalCalculator';
import { SalarySimulator } from './SalarySimulator';
import { AllocationTuner } from './AllocationTuner';
import { Disclaimer } from './Disclaimer';
import {
  Edit3,
  Bookmark,
  Share2,
  Printer,
  Wallet,
  Home,
  PiggyBank,
  TrendingUp,
} from 'lucide-react';

interface AllocationDashboardProps {
  result: AllocationResult;
  profile: UserProfile;
  onEditInputs: () => void;
  onSavePlan: () => void;
  onShare: () => void;
  onPrint: () => void;
  onUpdateCustomPercentages: (customPcts: Record<CategoryKey, number>) => void;
  onResetToRecommended: () => void;
}

export const AllocationDashboard: React.FC<AllocationDashboardProps> = ({
  result,
  profile,
  onEditInputs,
  onSavePlan,
  onShare,
  onPrint,
  onUpdateCustomPercentages,
  onResetToRecommended,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'needs' | 'wealth' | 'savings'>('all');

  const { allocations, totalAmount } = result;

  // Filter allocation cards based on filter tab
  const cardList = Object.values(allocations).filter((item) => {
    if (item.percentage === 0) return false;
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'needs') {
      return item.key === 'needs' || item.key === 'insurance';
    }
    if (activeCategoryFilter === 'wealth') {
      return item.key === 'investments' || item.key === 'retirement' || item.key === 'growth';
    }
    if (activeCategoryFilter === 'savings') {
      return item.key === 'emergency' || item.key === 'goals' || item.key === 'lifestyle';
    }
    return true;
  });

  const stageLabels: Record<string, string> = {
    student: 'Student / Early Career',
    youngProfessional: 'Young Professional',
    family: 'Middle Aged / Family',
    preRetirement: 'Pre-Retirement',
    retired: 'Retired',
  };

  const totalInvestments =
    (allocations.investments?.amount || 0) + (allocations.retirement?.amount || 0);
  const totalInvestmentsPct =
    (allocations.investments?.percentage || 0) + (allocations.retirement?.percentage || 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 dark:from-emerald-950 dark:via-teal-950 dark:to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {stageLabels[profile.lifeStage]}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                Risk: {profile.riskPreference}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                Housing: {profile.livingSituation}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
                Dependents: {profile.dependents}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Your {formatINR(totalAmount)} Monthly Blueprint
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl">
              Every rupee of your income is balanced across needs, emergency safety, inflation-beating
              investments, and intentional lifestyle.
            </p>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 no-print">
            <button
              type="button"
              onClick={onEditInputs}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Inputs</span>
            </button>

            <button
              type="button"
              onClick={onSavePlan}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <Bookmark className="w-4 h-4 text-emerald-400" />
              <span>Save Plan</span>
            </button>

            <button
              type="button"
              onClick={onShare}
              className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={onPrint}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: In-Hand Income */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">
            <span>Total Monthly In-Hand</span>
            <Wallet className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {formatINR(totalAmount)}
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold mt-1">
            {formatINR(totalAmount * 12)} / year
          </div>
        </div>

        {/* KPI 2: Essentials */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-sky-800 dark:text-sky-300 font-semibold mb-2">
            <span>Essential Needs</span>
            <Home className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-sky-950 dark:text-sky-200">
            {formatINR(allocations.needs?.amount || 0)}
          </div>
          <div className="text-[11px] text-sky-800 dark:text-sky-400 font-bold mt-1">
            {allocations.needs?.percentage}% of total income
          </div>
        </div>

        {/* KPI 3: Wealth Building */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-purple-800 dark:text-purple-300 font-semibold mb-2">
            <span>Wealth & Retirement</span>
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-950 dark:text-purple-200">
            {formatINR(totalInvestments)}
          </div>
          <div className="text-[11px] text-purple-800 dark:text-purple-400 font-bold mt-1">
            {totalInvestmentsPct}% of total income
          </div>
        </div>

        {/* KPI 4: Liquid Savings & Goals */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold mb-2">
            <span>Liquid Cushion & Goals</span>
            <PiggyBank className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-950 dark:text-emerald-200">
            {formatINR(
              (allocations.emergency?.amount || 0) + (allocations.goals?.amount || 0)
            )}
          </div>
          <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-bold mt-1">
            {(allocations.emergency?.percentage || 0) + (allocations.goals?.percentage || 0)}% of total
          </div>
        </div>
      </div>

      {/* Interactive Visualizations */}
      <AllocationChart result={result} monthlyIncome={totalAmount} />

      {/* Allocation Cards Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Salary Allocation Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Clear rupee values and percentage shares for each bucket.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Buckets
            </button>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('needs')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeCategoryFilter === 'needs'
                  ? 'bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Needs & Protection
            </button>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('wealth')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeCategoryFilter === 'wealth'
                  ? 'bg-white dark:bg-slate-900 text-purple-800 dark:text-purple-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Wealth & Growth
            </button>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('savings')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeCategoryFilter === 'savings'
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Savings & Goals
            </button>
          </div>
        </div>

        {/* Cards Grid: Mobile single-column, tablet 2-cols, desktop 3-cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardList.map((item) => (
            <AllocationCard key={item.key} item={item} totalIncome={totalAmount} />
          ))}
        </div>
      </div>

      {/* Optional Allocation Tuner (Power User Customizer) */}
      <AllocationTuner
        result={result}
        monthlyIncome={totalAmount}
        onUpdatePercentages={onUpdateCustomPercentages}
        onResetToRecommended={onResetToRecommended}
      />

      {/* Why This Plan? Explanation */}
      <FinancialExplanation result={result} profile={profile} />

      {/* Emergency Fund Card */}
      <EmergencyFundCard result={result} profile={profile} />

      {/* Safe vs Market Investments Guide */}
      <InvestmentGuide
        breakdown={result.investmentBreakdown}
        riskPreference={profile.riskPreference}
        totalMonthlySalary={totalAmount}
      />

      {/* Goals Calculator */}
      <GoalCalculator
        currentMonthlyGoalsAllocation={
          (allocations.goals?.amount || 0) + (allocations.growth?.amount || 0)
        }
      />

      {/* Salary Growth Simulator */}
      <SalarySimulator
        currentMonthlySalary={totalAmount}
        allocationPercentages={{
          needs: allocations.needs?.percentage || 0,
          emergency: allocations.emergency?.percentage || 0,
          investments: allocations.investments?.percentage || 0,
          retirement: allocations.retirement?.percentage || 0,
          insurance: allocations.insurance?.percentage || 0,
          growth: allocations.growth?.percentage || 0,
          lifestyle: allocations.lifestyle?.percentage || 0,
          goals: allocations.goals?.percentage || 0,
        }}
      />

      {/* Official Legal & Regulatory Disclaimer */}
      <Disclaimer />
    </div>
  );
};
