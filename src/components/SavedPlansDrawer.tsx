import React, { useState } from 'react';
import type { UserProfile } from '../types/financial';
import type { SavedPlanEntry } from '../utils/storage';
import { savePlanToLibrary, deleteSavedPlan } from '../utils/storage';
import { formatINR } from '../utils/formatters';
import { X, Bookmark, Trash2, ArrowUpRight, Plus, Check } from 'lucide-react';

interface SavedPlansDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlans: SavedPlanEntry[];
  currentProfile: UserProfile;
  onLoadPlan: (profile: UserProfile) => void;
  onRefreshPlans: () => void;
}

export const SavedPlansDrawer: React.FC<SavedPlansDrawerProps> = ({
  isOpen,
  onClose,
  savedPlans,
  currentProfile,
  onLoadPlan,
  onRefreshPlans,
}) => {
  const [newPlanName, setNewPlanName] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    savePlanToLibrary(newPlanName || `Plan - ${formatINR(currentProfile.monthlyIncome)}`, currentProfile);
    setNewPlanName('');
    setJustSaved(true);
    onRefreshPlans();
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    deleteSavedPlan(id);
    onRefreshPlans();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-slide-left p-6">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Saved Plans Library</h3>
                <p className="text-xs text-slate-500">Stored privately in your browser</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Save Current Plan Input */}
          <form onSubmit={handleSaveCurrent} className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Save Current Active Plan
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                placeholder={`e.g. My ${formatINR(currentProfile.monthlyIncome)} Plan`}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-emerald-500 font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
              >
                {justSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{justSaved ? 'Saved!' : 'Save'}</span>
              </button>
            </div>
          </form>

          {/* List of Saved Plans */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Saved History ({savedPlans.length})
            </div>

            {savedPlans.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                No saved plans yet. Name and save your current calculation above!
              </div>
            ) : (
              savedPlans.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-white shadow-2xs transition-all flex items-start justify-between gap-3 group"
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900">{entry.name}</div>
                    <div className="text-xs font-extrabold text-emerald-700 mt-0.5">
                      {formatINR(entry.profile.monthlyIncome)} / month
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                      <span className="capitalize bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                        {entry.profile.lifeStage}
                      </span>
                      <span>•</span>
                      <span>{new Date(entry.savedAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadPlan(entry.profile);
                        onClose();
                      }}
                      className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                      title="Load this plan"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete this plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          Saved in browser storage (never sent to external servers)
        </div>
      </div>
    </div>
  );
};
