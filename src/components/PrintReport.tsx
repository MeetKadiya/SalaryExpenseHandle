import React from 'react';
import type { AllocationResult, UserProfile } from '../types/financial';
import { formatINR } from '../utils/formatters';

interface PrintReportProps {
  result: AllocationResult;
  profile: UserProfile;
}

export const PrintReport: React.FC<PrintReportProps> = ({ result, profile }) => {
  const stageLabels: Record<string, string> = {
    student: 'Student / Early Career',
    youngProfessional: 'Young Professional',
    family: 'Middle Aged / Family',
    preRetirement: 'Pre-Retirement',
    retired: 'Retired',
  };

  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto">
      {/* Print Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">
            SalaryWise Financial Blueprint
          </h1>
          <p className="text-sm text-slate-600">
            Personal Salary Allocation & Wealth Planning Report • India (INR)
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div>Generated on: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          <div>Report ID: SW-{Date.now().toString().slice(-6)}</div>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-slate-100 mb-6 text-xs">
        <div>
          <span className="text-slate-500 block">Monthly In-Hand</span>
          <span className="text-base font-bold text-slate-900">{formatINR(profile.monthlyIncome)}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Life Stage</span>
          <span className="text-sm font-bold text-slate-900">{stageLabels[profile.lifeStage]}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Risk Style</span>
          <span className="text-sm font-bold capitalize text-slate-900">{profile.riskPreference}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Dependents / Housing</span>
          <span className="text-sm font-bold text-slate-900 capitalize">
            {profile.dependents} deps / {profile.livingSituation}
          </span>
        </div>
      </div>

      {/* Allocation Table */}
      <h2 className="text-lg font-bold text-slate-900 mb-2">Monthly Allocation Breakdown</h2>
      <table className="w-full text-left text-xs border border-slate-300 mb-6">
        <thead className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
          <tr>
            <th className="p-2.5">Category</th>
            <th className="p-2.5">Share %</th>
            <th className="p-2.5">Monthly (₹)</th>
            <th className="p-2.5">Annualized (₹)</th>
            <th className="p-2.5">Primary Purpose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {Object.values(result.allocations)
            .filter((item) => item.percentage > 0)
            .map((item) => (
              <tr key={item.key}>
                <td className="p-2.5 font-bold">
                  {item.label}
                </td>
                <td className="p-2.5 font-bold">{item.percentage}%</td>
                <td className="p-2.5 font-bold text-slate-900">{formatINR(item.amount)}</td>
                <td className="p-2.5 text-slate-700">{formatINR(item.amount * 12)}</td>
                <td className="p-2.5 text-slate-600">{item.whyImportant}</td>
              </tr>
            ))}
        </tbody>
        <tfoot className="bg-slate-100 font-extrabold border-t-2 border-slate-900">
          <tr>
            <td className="p-2.5">Total Allocation</td>
            <td className="p-2.5">100%</td>
            <td className="p-2.5">{formatINR(result.totalAmount)}</td>
            <td className="p-2.5">{formatINR(result.totalAmount * 12)}</td>
            <td className="p-2.5 text-slate-500">Exact 100% Reconciled</td>
          </tr>
        </tfoot>
      </table>

      {/* Strategic Recommendations */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border border-slate-300 rounded-xl text-xs">
          <h3 className="font-bold text-slate-900 mb-1">Emergency Fund Strategy</h3>
          <p className="text-slate-700 mb-2">{result.emergencyFundMetrics.statusText}</p>
          <p className="text-slate-600 italic">{result.emergencyFundMetrics.actionAdvice}</p>
        </div>

        <div className="p-4 border border-slate-300 rounded-xl text-xs">
          <h3 className="font-bold text-slate-900 mb-1">Investment Mix</h3>
          <p className="text-slate-700 mb-1">
            <strong>Safe Assets ({result.investmentBreakdown.safePercentage}%):</strong> {formatINR(result.investmentBreakdown.safeAmount)}/mo (PPF, Bank FDs, Sovereign G-Secs)
          </p>
          <p className="text-slate-700">
            <strong>Market-Linked ({result.investmentBreakdown.marketPercentage}%):</strong> {formatINR(result.investmentBreakdown.marketAmount)}/mo (Diversified Index & Flexi-cap Funds)
          </p>
        </div>
      </div>

      {/* Plan Rationale */}
      <div className="p-4 border border-slate-300 rounded-xl text-xs mb-6">
        <h3 className="font-bold text-slate-900 mb-1">Why This Plan?</h3>
        <p className="text-slate-700 leading-relaxed">{result.explanation.summary}</p>
      </div>

      {/* Legal Disclaimer */}
      <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 leading-tight">
        <strong>Important Disclaimer:</strong> This blueprint provides general educational guidance and is not personalized financial or tax advice. Actual allocations should consider individual debt, insurance, taxes, and family obligations. Consult a SEBI-registered advisor for specific product selections.
      </div>
    </div>
  );
};
