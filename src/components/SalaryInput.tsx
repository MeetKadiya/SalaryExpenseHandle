import React, { useState, useEffect } from 'react';
import { formatINR, parseINRInput } from '../utils/formatters';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

interface SalaryInputProps {
  salary: number;
  onChange: (newSalary: number) => void;
  onNext?: () => void;
  onBack?: () => void;
}

const PRESET_SALARIES = [
  25000,
  40000,
  50000,
  75000,
  100000,
  150000,
  250000,
  500000,
];

export const SalaryInput: React.FC<SalaryInputProps> = ({
  salary,
  onChange,
  onNext,
  onBack,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    salary ? new Intl.NumberFormat('en-IN').format(salary) : '50,000'
  );

  useEffect(() => {
    setDisplayValue(salary ? new Intl.NumberFormat('en-IN').format(salary) : '');
  }, [salary]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const parsed = parseINRInput(rawVal);
    onChange(parsed);
    setDisplayValue(parsed ? new Intl.NumberFormat('en-IN').format(parsed) : '');
  };

  const handlePresetClick = (amt: number) => {
    onChange(amt);
    setDisplayValue(new Intl.NumberFormat('en-IN').format(amt));
  };

  const annualIncome = salary * 12;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          Step 2 of 3
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 mb-2">
          What is your monthly income?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">
          Enter your take-home (in-hand) pay after taxes and PF deductions.
        </p>
      </div>

      {/* Main Large Rupee Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
        <label
          htmlFor="salary-input"
          className="block text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 text-center mb-4"
        >
          Monthly In-Hand Salary
        </label>

        <div className="relative flex items-center justify-center max-w-md mx-auto bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl border-2 border-emerald-500/40 focus-within:border-emerald-600 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all p-3 sm:p-4">
          <span className="text-3xl sm:text-5xl font-extrabold text-emerald-700 dark:text-emerald-400 select-none mr-2">
            ₹
          </span>
          <input
            id="salary-input"
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleInputChange}
            placeholder="50,000"
            className="w-full text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white bg-transparent outline-hidden tracking-tight text-left"
            autoFocus
          />
        </div>

        {/* Real-time annual & daily indicator */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          <div className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200/70 dark:border-emerald-800 font-semibold">
            Annual: {formatINR(annualIncome)} / year
          </div>
          <div className="text-slate-400 dark:text-slate-600">•</div>
          <div className="text-slate-500 dark:text-slate-400">
            Daily average: {formatINR(salary / 30)} / day
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 text-center mb-3">
            Quick Select Common Monthly Incomes
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_SALARIES.map((amt) => {
              const isSelected = salary === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetClick(amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {formatINR(amt, true)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Helpful Tip */}
        <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900 text-blue-900 dark:text-blue-200 text-xs leading-relaxed">
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Tip:</strong> If your monthly income varies, enter your conservative average over the last 6 months.
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}
        {onNext && (
          <button
            type="button"
            disabled={!salary || salary <= 0}
            onClick={onNext}
            className="ml-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
          >
            <span>Continue to Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
