import React from 'react';
import type { LifeStage } from '../types/financial';
import { Check } from 'lucide-react';

interface LifeStageOption {
  id: LifeStage;
  title: string;
  emoji: string;
  ageRange: string;
  tagline: string;
  priorities: string[];
}

const LIFE_STAGES: LifeStageOption[] = [
  {
    id: 'student',
    title: 'Student / Early Career',
    emoji: '🎓',
    ageRange: 'Ages 18–24',
    tagline: 'Building financial discipline, emergency safety net & skill foundations.',
    priorities: ['30% Low Essentials', '20% Emergency Net', '10% Upskilling'],
  },
  {
    id: 'youngProfessional',
    title: 'Young Professional',
    emoji: '💼',
    ageRange: 'Ages 23–32',
    tagline: 'Accelerating income growth, compounding wealth & planning personal goals.',
    priorities: ['30% Market Investments', '10% Short-term Goals', '15% Cushion'],
  },
  {
    id: 'family',
    title: 'Middle Aged / Family',
    emoji: '👨‍👩‍👧',
    ageRange: 'Ages 30–48',
    tagline: 'Managing household stability, child education, term insurance & retirement.',
    priorities: ['40% Household Needs', '10% Retirement', 'Term & Health Cover'],
  },
  {
    id: 'preRetirement',
    title: 'Pre-Retirement',
    emoji: '👴',
    ageRange: 'Ages 48–60',
    tagline: 'Peak earning years, aggressive retirement catch-up & capital de-risking.',
    priorities: ['30% Retirement Catch-up', '10% Healthcare Fund', 'Safe Capital'],
  },
  {
    id: 'retired',
    title: 'Retired',
    emoji: '🧓',
    ageRange: 'Ages 60+',
    tagline: 'Sustained monthly cashflow, healthcare peace of mind & capital preservation.',
    priorities: ['50% Living Needs', '15% Medical Care', '20% Safe Fixed Income'],
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
        <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Step 1 of 3
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
          What stage of life are you in?
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
          Your life stage defines your financial responsibilities, time horizon, and risk capacity.
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
                  ? 'bg-gradient-to-b from-emerald-50/80 to-white border-emerald-600 shadow-lg shadow-emerald-600/10 scale-[1.01]'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Checkmark badge */}
              <div
                className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-transparent border border-slate-300 group-hover:border-slate-400'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl filter drop-shadow-xs">{stage.emoji}</span>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      {stage.ageRange}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {stage.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {stage.priorities.map((item, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-emerald-100/60 text-emerald-900 border border-emerald-200/60'
                        : 'bg-slate-100 text-slate-600'
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
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Salary</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};
