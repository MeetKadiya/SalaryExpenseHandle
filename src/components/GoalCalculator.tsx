import React, { useState } from 'react';
import { POPULAR_GOALS, calculateGoalFeasibility } from '../utils/financialEngine';
import { formatINR, parseINRInput } from '../utils/formatters';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface GoalCalculatorProps {
  currentMonthlyGoalsAllocation: number;
}

export const GoalCalculator: React.FC<GoalCalculatorProps> = ({
  currentMonthlyGoalsAllocation,
}) => {
  const [selectedGoalId, setSelectedGoalId] = useState<string>('car');
  const [goalName, setGoalName] = useState<string>('Car Down Payment');
  const [targetAmount, setTargetAmount] = useState<number>(350000);
  const [targetYears, setTargetYears] = useState<number>(2);

  const handleSelectGoal = (goal: typeof POPULAR_GOALS[0]) => {
    setSelectedGoalId(goal.id);
    setGoalName(goal.name);
    setTargetAmount(goal.defaultAmount);
    setTargetYears(goal.defaultYears);
  };

  const calculation = calculateGoalFeasibility(
    goalName,
    targetAmount,
    targetYears,
    currentMonthlyGoalsAllocation
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Interactive Goal Planner
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
            What are you saving for?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Calculate the exact monthly SIP or savings required to hit your life milestones.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-500 font-medium">Your Current Goal Allocation</span>
          <div className="text-xl sm:text-2xl font-extrabold text-teal-700">
            {formatINR(currentMonthlyGoalsAllocation)}
            <span className="text-xs text-slate-500 font-normal"> /mo</span>
          </div>
        </div>
      </div>

      {/* Preset Goal Chips */}
      <div className="my-6">
        <label className="block text-xs font-semibold text-slate-500 mb-2">
          Select or Customize a Goal
        </label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_GOALS.map((goal) => {
            const isSelected = selectedGoalId === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => handleSelectGoal(goal)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <span>{goal.icon}</span>
                <span>{goal.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Goal Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Goal Name
          </label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm font-semibold text-slate-900 outline-hidden transition-all"
            placeholder="e.g. Dream Trip"
          />
        </div>

        {/* Goal Amount */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Target Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
              ₹
            </span>
            <input
              type="text"
              value={new Intl.NumberFormat('en-IN').format(targetAmount)}
              onChange={(e) => setTargetAmount(parseINRInput(e.target.value))}
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm font-bold text-slate-900 outline-hidden transition-all"
              placeholder="5,00,000"
            />
          </div>
        </div>

        {/* Target Timeline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Target Horizon: {targetYears} {targetYears === 1 ? 'Year' : 'Years'} ({targetYears * 12} Months)
          </label>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={targetYears}
            onChange={(e) => setTargetYears(parseFloat(e.target.value))}
            className="w-full accent-teal-600 mt-2"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>6 Months</span>
            <span>5 Years</span>
            <span>10 Years</span>
          </div>
        </div>
      </div>

      {/* Results Card */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border-2 transition-all ${
          calculation.feasibility === 'onTrack'
            ? 'bg-teal-50/60 border-teal-300'
            : calculation.feasibility === 'moderateGap'
            ? 'bg-amber-50/60 border-amber-300'
            : 'bg-rose-50/60 border-rose-300'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-slate-500">
              Required Monthly Contribution
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              {formatINR(calculation.monthlyRequired)}
              <span className="text-xs sm:text-sm font-medium text-slate-600"> / month</span>
            </div>
            <div className="text-xs text-slate-500">
              To reach {formatINR(targetAmount)} in {targetYears} years ({calculation.targetMonths} months)
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Feasibility Verdict
            </span>
            {calculation.feasibility === 'onTrack' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-teal-600 text-white shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fully On Track!
              </span>
            ) : calculation.feasibility === 'moderateGap' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-600 text-white shadow-xs">
                <AlertCircle className="w-3.5 h-3.5" /> Moderate Gap
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-xs">
                <AlertCircle className="w-3.5 h-3.5" /> High Stretch
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Advice & Tips */}
        <div className="mt-4 space-y-1.5">
          {calculation.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
              <span className="text-teal-700 font-bold shrink-0 mt-0.5">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
