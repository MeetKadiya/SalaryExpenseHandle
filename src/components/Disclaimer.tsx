import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-slate-100/90 dark:bg-slate-900/90 rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
            Important Educational & Regulatory Disclaimer
          </h4>
          <p className="italic text-slate-700 dark:text-slate-300 font-medium">
            “This calculator provides general educational guidance and is not personalized financial advice.
            Actual allocations should consider your expenses, debt, emergency needs, taxes, insurance and financial goals.”
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-normal">
            SalaryWise does not sell investment products, collect brokerage fees, or recommend specific company stocks or mutual fund schemes. Calculations are based on generalized personal finance rules of thumb adapted for Indian cost standards. Consult a SEBI-registered investment advisor (RIA) or licensed financial planner for personalized advice suited to your tax jurisdiction and family obligations.
          </p>
        </div>
      </div>
    </div>
  );
};
