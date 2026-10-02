import React, { useState } from 'react';
import type { AllocationResult, UserProfile } from '../types/financial';
import { formatINR } from '../utils/formatters';
import { X, Copy, Check, Share2, MessageCircle, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AllocationResult;
  profile: UserProfile;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  result,
  profile,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const stageLabels: Record<string, string> = {
    student: 'Student / Early Career',
    youngProfessional: 'Young Professional',
    family: 'Middle Aged / Family',
    preRetirement: 'Pre-Retirement',
    retired: 'Retired',
  };

  const lines = [
    `📊 My Monthly Salary Blueprint on SalaryWise:`,
    `💰 Total In-Hand Income: ${formatINR(profile.monthlyIncome)}/mo`,
    `🎯 Life Stage: ${stageLabels[profile.lifeStage] || profile.lifeStage}`,
    ``,
    `Allocation Breakdown:`,
    `Needs: ${result.allocations.needs?.percentage || 0}% (${formatINR(result.allocations.needs?.amount || 0)})`,
    `Emergency Cushion: ${result.allocations.emergency?.percentage || 0}% (${formatINR(result.allocations.emergency?.amount || 0)})`,
    `Wealth Investments: ${result.allocations.investments?.percentage || 0}% (${formatINR(result.allocations.investments?.amount || 0)})`,
    result.allocations.retirement?.percentage ? `Retirement: ${result.allocations.retirement.percentage}% (${formatINR(result.allocations.retirement.amount)})` : null,
    result.allocations.insurance?.percentage ? `Insurance/Protection: ${result.allocations.insurance.percentage}% (${formatINR(result.allocations.insurance.amount)})` : null,
    result.allocations.growth?.percentage ? `Career Growth: ${result.allocations.growth.percentage}% (${formatINR(result.allocations.growth.amount)})` : null,
    result.allocations.goals?.percentage ? `Goals: ${result.allocations.goals.percentage}% (${formatINR(result.allocations.goals.amount)})` : null,
    result.allocations.lifestyle?.percentage ? `Lifestyle/Fun: ${result.allocations.lifestyle.percentage}% (${formatINR(result.allocations.lifestyle.amount)})` : null,
    ``,
    `Give every rupee a purpose! Calculated with SalaryWise.`,
  ].filter(Boolean).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const tweet = `My monthly salary allocation blueprint on SalaryWise: ${result.allocations.needs.percentage}% Needs | ${result.allocations.emergency.percentage}% Savings | ${result.allocations.investments.percentage}% Investments. Give every rupee a purpose!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-in transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Share Your Blueprint</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Share a privacy-friendly summary without exposing sensitive credentials.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Preview Box */}
        <div className="my-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
          {lines}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleTwitter}
            className="px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Twitter / X</span>
          </button>
        </div>
      </div>
    </div>
  );
};
