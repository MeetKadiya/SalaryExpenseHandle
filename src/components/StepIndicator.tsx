import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const STEPS = [
  { id: 1, title: 'Life Stage', desc: 'Choose journey phase' },
  { id: 2, title: 'Monthly Salary', desc: 'Enter take-home pay' },
  { id: 3, title: 'Profile Details', desc: 'Risk & living context' },
  { id: 4, title: 'Salary Blueprint', desc: 'Personalized dashboard' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onSelectStep,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      <div className="relative flex items-center justify-between">
        {/* Progress connecting line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 -z-10 rounded-full" />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-emerald-600 -z-10 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = step.id < currentStep || currentStep === 4;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onSelectStep(step.id)}
              className={`flex flex-col items-center group cursor-pointer transition-all ${
                !isClickable ? 'cursor-not-allowed opacity-60' : ''
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-white border-emerald-600 text-emerald-700 shadow-md ring-4 ring-emerald-500/20'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
              </div>
              <span
                className={`mt-2 text-xs font-semibold hidden sm:block ${
                  isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
