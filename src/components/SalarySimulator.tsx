import React, { useState } from 'react';
import { calculateSalaryGrowthProjection } from '../utils/financialEngine';
import { formatINR } from '../utils/formatters';
import type { CategoryKey } from '../types/financial';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Info } from 'lucide-react';

interface SalarySimulatorProps {
  currentMonthlySalary: number;
  allocationPercentages: Record<CategoryKey, number>;
}

export const SalarySimulator: React.FC<SalarySimulatorProps> = ({
  currentMonthlySalary,
  allocationPercentages,
}) => {
  const [growthRate, setGrowthRate] = useState<number>(10);
  const [horizonYears, setHorizonYears] = useState<number>(5);

  const projections = calculateSalaryGrowthProjection(
    currentMonthlySalary,
    growthRate,
    horizonYears,
    allocationPercentages
  );

  const finalYear = projections[projections.length - 1];

  const CustomGrowthTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 dark:bg-slate-800/95 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700">
          <div className="font-bold text-slate-300 mb-1">{label}</div>
          <div className="text-emerald-400 font-extrabold text-sm">
            Monthly: {formatINR(data.monthlySalary)}
          </div>
          <div className="text-slate-300 font-medium">
            Annual: {formatINR(data.annualSalary)}
          </div>
          <div className="mt-1.5 pt-1.5 border-t border-slate-700 text-purple-300">
            Investments: {formatINR(data.investmentsAmount)} /mo
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
            Income Growth Simulator
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-2">
            What if your salary grows?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Simulate how future appraisals and promotions scale your monthly wealth.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Year {horizonYears} Estimated Salary</span>
          <div className="text-xl sm:text-2xl font-extrabold text-indigo-700 dark:text-indigo-400">
            {formatINR(finalYear.monthlySalary)}
            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal"> /mo</span>
          </div>
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Expected Annual Growth Rate:
            </label>
            <span className="text-sm font-extrabold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
              {growthRate}% / year
            </span>
          </div>
          <input
            type="range"
            min={4}
            max={25}
            step={1}
            value={growthRate}
            onChange={(e) => setGrowthRate(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600 mt-1 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">
            <span>4% (Inflation match)</span>
            <span>12% (Standard appraisal)</span>
            <span>25% (High promotion)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Time Horizon:
            </label>
            <span className="text-sm font-extrabold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
              {horizonYears} Years
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={7}
            step={1}
            value={horizonYears}
            onChange={(e) => setHorizonYears(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600 mt-1 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1">
            <span>2 Years</span>
            <span>4 Years</span>
            <span>7 Years</span>
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="h-64 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={projections} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tickFormatter={(y) => `Year ${y}`}
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis
              tickFormatter={(v) => formatINR(v, true)}
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip content={<CustomGrowthTooltip />} />
            <Area
              type="monotone"
              dataKey="monthlySalary"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#salaryGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Year-by-Year Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs mb-4">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="py-3 px-4">Timeline</th>
              <th className="py-3 px-4">Monthly Salary</th>
              <th className="py-3 px-4">Annual CTC</th>
              <th className="py-3 px-4">Needs ({allocationPercentages.needs}%)</th>
              <th className="py-3 px-4">Investments ({((allocationPercentages.investments || 0) + (allocationPercentages.retirement || 0))}%)</th>
              <th className="py-3 px-4">Savings & Goals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {projections.map((p) => (
              <tr key={p.year} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Year {p.year}</td>
                <td className="py-3 px-4 font-bold text-indigo-700 dark:text-indigo-400">{formatINR(p.monthlySalary)}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{formatINR(p.annualSalary)}</td>
                <td className="py-3 px-4 text-sky-700 dark:text-sky-400">{formatINR(p.needsAmount)}</td>
                <td className="py-3 px-4 text-purple-700 dark:text-purple-400 font-bold">{formatINR(p.investmentsAmount)}</td>
                <td className="py-3 px-4 text-teal-700 dark:text-teal-400">
                  {formatINR(p.emergencyAmount + p.goalsAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          <strong>Notice:</strong> This growth simulator is a mathematical compounding projection based on your inputs. It is not an employment guarantee or market prediction.
        </span>
      </div>
    </div>
  );
};
