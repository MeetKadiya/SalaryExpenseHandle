import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import type { AllocationResult } from '../types/financial';
import { formatINR } from '../utils/formatters';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';

interface AllocationChartProps {
  result: AllocationResult;
  monthlyIncome: number;
}

export const AllocationChart: React.FC<AllocationChartProps> = ({
  result,
  monthlyIncome,
}) => {
  const [activeTab, setActiveTab] = useState<'donut' | 'bar'>('donut');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Prepare Pie Chart data (only non-zero allocations)
  const pieData = Object.values(result.allocations)
    .filter((item) => item.percentage > 0)
    .map((item) => ({
      name: item.label,
      value: item.percentage,
      amount: item.amount,
      color: item.color,
      emoji: item.emoji,
      key: item.key,
    }));

  // Prepare Horizontal Bar Chart data comparing:
  // Income vs Needs vs Savings vs Investments vs Goals
  const needsAmt = result.allocations.needs?.amount || 0;
  const savingsAmt = result.allocations.emergency?.amount || 0;
  const investmentsAmt =
    (result.allocations.investments?.amount || 0) +
    (result.allocations.retirement?.amount || 0);
  const goalsAmt =
    (result.allocations.goals?.amount || 0) +
    (result.allocations.growth?.amount || 0);

  const barData = [
    {
      category: 'Total Income',
      amount: monthlyIncome,
      percentage: 100,
      fill: '#0f172a',
      emoji: '💵',
    },
    {
      category: 'Needs',
      amount: needsAmt,
      percentage: Math.round((needsAmt / monthlyIncome) * 100),
      fill: '#0284c7',
      emoji: '🏠',
    },
    {
      category: 'Savings',
      amount: savingsAmt,
      percentage: Math.round((savingsAmt / monthlyIncome) * 100),
      fill: '#059669',
      emoji: '🏦',
    },
    {
      category: 'Investments',
      amount: investmentsAmt,
      percentage: Math.round((investmentsAmt / monthlyIncome) * 100),
      fill: '#7c3aed',
      emoji: '📈',
    },
    {
      category: 'Goals & Growth',
      amount: goalsAmt,
      percentage: Math.round((goalsAmt / monthlyIncome) * 100),
      fill: '#0d9488',
      emoji: '🎯',
    },
  ];

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 backdrop-blur-md">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <span>{data.emoji}</span>
            <span>{data.name}</span>
          </div>
          <div className="text-emerald-400 font-extrabold text-sm">
            {formatINR(data.amount)} / month
          </div>
          <div className="text-slate-300 font-semibold">{data.value}% of salary</div>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 backdrop-blur-md">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <span>{data.emoji}</span>
            <span>{data.category}</span>
          </div>
          <div className="text-emerald-400 font-extrabold text-sm">
            {formatINR(data.amount)}
          </div>
          <div className="text-slate-300 font-semibold">{data.percentage}% of total income</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50">
      {/* Header & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Interactive Allocation Visualizer
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore how every single rupee of your salary is distributed.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('donut')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'donut'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Donut Chart</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bar')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bar'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Comparative Bar</span>
          </button>
        </div>
      </div>

      {activeTab === 'donut' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Donut Chart with Center Label */}
          <div className="lg:col-span-7 relative h-72 sm:h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="88%"
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={900}
                  animationEasing="ease-out"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="cursor-pointer transition-opacity duration-200"
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                Monthly Income
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {formatINR(monthlyIncome)}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5 border border-emerald-200">
                100% Allocated
              </span>
            </div>
          </div>

          {/* Interactive Legend List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
              Allocation Breakdown
            </div>
            {pieData.map((item, idx) => (
              <div
                key={item.key}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-slate-50 border-slate-400 shadow-xs'
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-xs font-extrabold" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {formatINR(item.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Horizontal Comparative Bar Chart */
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis
                type="number"
                tickFormatter={(val) => formatINR(val, true)}
                stroke="#94a3b8"
                fontSize={12}
              />
              <YAxis
                type="category"
                dataKey="category"
                stroke="#64748b"
                fontSize={12}
                width={95}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="amount"
                radius={[0, 8, 8, 0]}
                animationDuration={900}
              >
                {barData.map((entry, index) => (
                  <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Comparing Total Income vs Needs, Savings, Investments, and Goals & Growth
          </p>
        </div>
      )}
    </div>
  );
};
