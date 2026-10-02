import type { UserProfile } from '../types/financial';

const CURRENT_PROFILE_KEY = 'salarywise_current_profile';
const SAVED_PLANS_KEY = 'salarywise_saved_plans';

export interface SavedPlanEntry {
  id: string;
  name: string;
  savedAt: string;
  profile: UserProfile;
}

export const DEFAULT_PROFILE: UserProfile = {
  lifeStage: 'youngProfessional',
  monthlyIncome: 50000,
  country: 'India',
  riskPreference: 'balanced',
  livingSituation: 'renting',
  emergencySavings: '1to3',
  dependents: 'none',
};

export function saveCurrentProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage', err);
  }
}

export function loadCurrentProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(CURRENT_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PROFILE, ...parsed };
    }
  } catch (err) {
    console.error('Failed to load profile from localStorage', err);
  }
  return DEFAULT_PROFILE;
}

export function clearCurrentProfile(): void {
  try {
    localStorage.removeItem(CURRENT_PROFILE_KEY);
  } catch (err) {
    console.error('Failed to clear profile', err);
  }
}

export function getSavedPlans(): SavedPlanEntry[] {
  try {
    const raw = localStorage.getItem(SAVED_PLANS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to get saved plans', err);
  }
  return [];
}

export function savePlanToLibrary(name: string, profile: UserProfile): SavedPlanEntry {
  const plans = getSavedPlans();
  const entry: SavedPlanEntry = {
    id: `plan_${Date.now()}`,
    name: name.trim() || `Plan - ${new Date().toLocaleDateString('en-IN')}`,
    savedAt: new Date().toISOString(),
    profile: { ...profile },
  };

  const updated = [entry, ...plans.slice(0, 9)]; // keep up to 10 plans
  try {
    localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save plan to library', err);
  }
  return entry;
}

export function deleteSavedPlan(id: string): void {
  const plans = getSavedPlans();
  const updated = plans.filter((p) => p.id !== id);
  try {
    localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete saved plan', err);
  }
}
