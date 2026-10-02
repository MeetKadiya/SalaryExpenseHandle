import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import type {
  UserProfile,
  AllocationResult,
  CategoryKey,
  LifeStage,
} from './types/financial';
import { calculateSalaryAllocation } from './utils/financialEngine';
import {
  loadCurrentProfile,
  saveCurrentProfile,
  getSavedPlans,
  clearCurrentProfile,
  DEFAULT_PROFILE,
} from './utils/storage';
import type { SavedPlanEntry } from './utils/storage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StepIndicator } from './components/StepIndicator';
import { LifeStageSelector } from './components/LifeStageSelector';
import { SalaryInput } from './components/SalaryInput';
import { FinancialProfile } from './components/FinancialProfile';
import { AllocationDashboard } from './components/AllocationDashboard';
import { ShareModal } from './components/ShareModal';
import { SavedPlansDrawer } from './components/SavedPlansDrawer';
import { PrintReport } from './components/PrintReport';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => loadCurrentProfile());
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customPercentages, setCustomPercentages] = useState<Record<CategoryKey, number> | null>(null);

  const [savedPlans, setSavedPlans] = useState<SavedPlanEntry[]>(() => getSavedPlans());
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSavedPlansDrawerOpen, setIsSavedPlansDrawerOpen] = useState(false);

  const calculatorRef = useRef<HTMLDivElement>(null);

  // Auto-save current profile whenever it changes
  useEffect(() => {
    saveCurrentProfile(profile);
  }, [profile]);

  // Compute base allocation result from calculation engine
  const baseResult: AllocationResult = calculateSalaryAllocation(profile);

  // If user has applied custom percentages, compute customized result
  const activeResult: AllocationResult = React.useMemo(() => {
    if (!customPercentages) return baseResult;

    // Apply custom percentages with recalculated amounts
    const updatedAllocations = { ...baseResult.allocations };
    let sumAmounts = 0;
    let maxKey: CategoryKey = 'needs';
    let maxVal = -1;

    (Object.keys(customPercentages) as CategoryKey[]).forEach((key) => {
      const pct = customPercentages[key];
      const amt = Math.round((profile.monthlyIncome * pct) / 100);
      sumAmounts += amt;
      if (pct > maxVal) {
        maxVal = pct;
        maxKey = key;
      }

      if (updatedAllocations[key]) {
        updatedAllocations[key] = {
          ...updatedAllocations[key],
          percentage: pct,
          amount: amt,
        };
      }
    });

    const diff = profile.monthlyIncome - sumAmounts;
    if (diff !== 0 && updatedAllocations[maxKey]) {
      updatedAllocations[maxKey].amount += diff;
    }

    return {
      ...baseResult,
      allocations: updatedAllocations,
    };
  }, [baseResult, customPercentages, profile.monthlyIncome]);

  const handleStartCalculator = () => {
    setCurrentStep(1);
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileChange = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    // Reset custom percentages when core profile changes
    setCustomPercentages(null);
  };

  const handleCalculatePlan = () => {
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#6366f1', '#0ea5e9'],
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all inputs to defaults?')) {
      clearCurrentProfile();
      setProfile(DEFAULT_PROFILE);
      setCustomPercentages(null);
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadPlan = (loadedProfile: UserProfile) => {
    setProfile(loadedProfile);
    setCustomPercentages(null);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefreshPlans = () => {
    setSavedPlans(getSavedPlans());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Navbar
        currentProfile={profile}
        savedPlansCount={savedPlans.length}
        onOpenSavedPlans={() => setIsSavedPlansDrawerOpen(true)}
        onReset={handleReset}
        onPrint={handlePrint}
        onShare={() => setIsShareModalOpen(true)}
        currentStep={currentStep}
        onNavigateStep={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1 pb-16">
        {/* Hero Section shown on initial steps */}
        {currentStep < 4 && (
          <HeroSection onStart={handleStartCalculator} />
        )}

        <div ref={calculatorRef} className="pt-6">
          {/* Step Indicator */}
          {currentStep < 4 && (
            <StepIndicator
              currentStep={currentStep}
              onSelectStep={(step) => setCurrentStep(step)}
            />
          )}

          {/* Step 1: Life Stage */}
          {currentStep === 1 && (
            <div className="px-4 animate-fade-in">
              <LifeStageSelector
                selectedStage={profile.lifeStage}
                onSelect={(stage: LifeStage) => {
                  handleProfileChange({ lifeStage: stage });
                  setCurrentStep(2);
                }}
                onNext={() => setCurrentStep(2)}
              />
            </div>
          )}

          {/* Step 2: Salary Input */}
          {currentStep === 2 && (
            <div className="px-4 animate-fade-in">
              <SalaryInput
                salary={profile.monthlyIncome}
                onChange={(amt) => handleProfileChange({ monthlyIncome: amt })}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            </div>
          )}

          {/* Step 3: Tell us a little more (Financial Profile) */}
          {currentStep === 3 && (
            <div className="px-4 animate-fade-in">
              <FinancialProfile
                profile={profile}
                onChange={handleProfileChange}
                onSubmit={handleCalculatePlan}
                onBack={() => setCurrentStep(2)}
              />
            </div>
          )}

          {/* Step 4: Results Dashboard */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <AllocationDashboard
                result={activeResult}
                profile={profile}
                onEditInputs={() => {
                  setCurrentStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSavePlan={() => setIsSavedPlansDrawerOpen(true)}
                onShare={() => setIsShareModalOpen(true)}
                onPrint={handlePrint}
                onUpdateCustomPercentages={(pcts) => setCustomPercentages(pcts)}
                onResetToRecommended={() => setCustomPercentages(null)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 px-4 text-center text-xs text-slate-500 space-y-2 no-print">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
          <span>SalaryWise</span>
          <span>•</span>
          <span>Give Every Rupee a Purpose</span>
        </div>
        <p className="max-w-xl mx-auto text-slate-400">
          Designed for Indian salaried professionals, families, students, and retirees. Calculations are dynamic, client-side, and 100% private.
        </p>
      </footer>

      {/* Modals & Drawers */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        result={activeResult}
        profile={profile}
      />

      <SavedPlansDrawer
        isOpen={isSavedPlansDrawerOpen}
        onClose={() => setIsSavedPlansDrawerOpen(false)}
        savedPlans={savedPlans}
        currentProfile={profile}
        onLoadPlan={handleLoadPlan}
        onRefreshPlans={handleRefreshPlans}
      />

      {/* Print View for PDF / Printing */}
      <PrintReport result={activeResult} profile={profile} />
    </div>
  );
};

export default App;
