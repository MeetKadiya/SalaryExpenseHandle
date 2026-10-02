export type LifeStage = 'student' | 'youngProfessional' | 'family' | 'preRetirement' | 'retired';

export type RiskPreference = 'conservative' | 'balanced' | 'growth';

export type LivingSituation = 'family' | 'renting' | 'ownHouse';

export type EmergencySavingsStatus = 'none' | '1to3' | '3to6' | '6plus';

export type Dependents = 'none' | '1to2' | '3plus';

export interface UserProfile {
  lifeStage: LifeStage;
  monthlyIncome: number;
  country: string;
  riskPreference: RiskPreference;
  livingSituation: LivingSituation;
  emergencySavings: EmergencySavingsStatus;
  dependents: Dependents;
  planName?: string;
  savedAt?: string;
}

export type CategoryKey =
  | 'needs'
  | 'emergency'
  | 'investments'
  | 'retirement'
  | 'insurance'
  | 'growth'
  | 'lifestyle'
  | 'goals';

export interface AllocationSubcategory {
  name: string;
  percentageShare: number; // percentage of this category
  description: string;
  type: 'safe' | 'market' | 'expense' | 'protection' | 'growth';
}

export interface AllocationItem {
  key: CategoryKey;
  label: string;
  emoji: string;
  percentage: number; // percentage of total salary
  amount: number;
  color: string;
  bgLight: string;
  borderColor: string;
  description: string;
  whyImportant: string;
  subcategories: AllocationSubcategory[];
}

export interface InvestmentBreakdown {
  safePercentage: number; // % of total salary allocated to safe
  safeAmount: number;
  safeInstruments: { name: string; desc: string; risk: string }[];
  marketPercentage: number; // % of total salary allocated to market
  marketAmount: number;
  marketInstruments: { name: string; desc: string; risk: string }[];
}

export interface AllocationResult {
  allocations: Record<CategoryKey, AllocationItem>;
  totalPercentage: number;
  totalAmount: number;
  unallocatedPercentage: number;
  unallocatedAmount: number;
  emergencyFundMetrics: {
    targetMonthsMin: number;
    targetMonthsMax: number;
    targetAmountMin: number;
    targetAmountMax: number;
    currentEstimatedMonths: number;
    gapAmount: number;
    statusText: string;
    actionAdvice: string;
  };
  explanation: {
    title: string;
    summary: string;
    highlights: string[];
    emergencyReason: string;
    investmentStrategy: string;
  };
  investmentBreakdown: InvestmentBreakdown;
}

export interface GoalPreset {
  id: string;
  name: string;
  icon: string;
  defaultAmount: number;
  defaultYears: number;
  category: 'short' | 'medium' | 'long';
}

export interface FinancialGoalCalculation {
  goalName: string;
  targetAmount: number;
  targetYears: number;
  targetMonths: number;
  monthlyRequired: number;
  currentMonthlyAllocation: number;
  difference: number;
  feasibility: 'onTrack' | 'moderateGap' | 'heavyStretch';
  tips: string[];
}

export interface SalaryGrowthYear {
  year: number;
  monthlySalary: number;
  annualSalary: number;
  needsAmount: number;
  emergencyAmount: number;
  investmentsAmount: number;
  goalsAmount: number;
  lifestyleAmount: number;
}
