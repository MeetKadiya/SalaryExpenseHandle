import React from 'react';
import type { LifeStage } from '../types/financial';
import { LifeStageIcon } from './CategoryIcon';
import { Check } from 'lucide-react';

interface LifeStageOption {
  id: LifeStage;
  title: string;
  ageRange: string;
  tagline: string;
  priorities: string[];
}

const LIFE_STAGES: LifeStageOption[] = [
  {
    id: 'student',
    title: 'Student / Early Career',
    ageRange: 'Ages 18–24',
    tagline: 'Starting out, building basic savings habits, and learning new skills.',
    priorities: ['30% Low Essentials', '20% Emergency Fund', '10% Skills'],
  },
  {
    id: 'youngProfessional',
    title: 'Young Professional',
    ageRange: 'Ages 23–32',
    tagline: 'Growing your income, investing for the future, and saving for goals.',
    priorities: ['30% Wealth Investing', '10% Personal Goals', '15% Savings'],
  },
  {
    id: 'family',
    title: 'Middle Aged / Family',
    ageRange: 'Ages 30–48',
    tagline: 'Balancing home bills, children, health insurance, and retirement.',
    priorities: ['40% Household Needs', '10% Retirement', 'Health & Term Cover'],
  },
  {
    id: 'preRetirement',
    title: 'Pre-Retirement',
    ageRange: 'Ages 48–60',
    tagline: 'Peak earnings, boosting your retirement fund, and reducing risk.',
    priorities: ['30% Retirement', '10% Healthcare', 'Safe Investments'],
  },
  {
    id: 'retired',
    title: 'Retired',
    ageRange: 'Ages 60+',
    tagline: 'Enjoying steady monthly income, safe deposits, and healthcare security.',
    priorities: ['50% Living Needs', '15% Medical Care', '20% Safe Income'],
  },
];

interface LifeStageSelectorProps {
  selectedStage: LifeStage;
  onSelect: (stage: LifeStage) => void;
  onNext?: () => void;
}

export const LifeStageSelector: React.FC<LifeStageSelectorProps> = ({
  selectedStage,
  onSelect,
  onNext,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          Step 1 of 3
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 mb-2">
          What stage of life are you in?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          Choose your current phase to get the most realistic allocation for your situation.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="radiogroup"
        aria-label="Select Life Stage"
      >
        {LIFE_STAGES.map((stage) => {
          const isSelected = selectedStage === stage.id;
          return (
            <div
              key={stage.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onSelect(stage.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(stage.id);
                }
              }}
              className={`relative cursor-pointer rounded-2xl p-5 sm:p-6 transition-all border-2 text-left flex flex-col justify-between group outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-gradient-to-b from-emerald-50/80 to-white dark:from-emerald-950/50 dark:to-slate-900 border-emerald-600 dark:border-emerald-500 shadow-lg shadow-emerald-600/10 scale-[1.01]'
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              {/* Checkmark badge */}
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-transparent border border-slate-300 dark:border-slate-700 group-hover:border-slate-400'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <LifeStageIcon stage={stage.id} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                      {stage.ageRange}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {stage.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                {stage.priorities.map((item, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-emerald-100/70 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {onNext && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Salary</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
