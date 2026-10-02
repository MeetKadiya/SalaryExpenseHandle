import type {
  LifeStage,
  UserProfile,
  AllocationResult,
  CategoryKey,
  AllocationItem,
  InvestmentBreakdown,
  FinancialGoalCalculation,
  SalaryGrowthYear,
  GoalPreset,
} from '../types/financial';
import { formatINR } from './formatters';

// Base Allocation Profiles (Standard starting baseline percentages)
export const BASE_PROFILES: Record<LifeStage, Record<CategoryKey, number>> = {
  student: {
    needs: 30,
    emergency: 20,
    investments: 30,
    growth: 10,
    lifestyle: 10,
    retirement: 0,
    insurance: 0,
    goals: 0,
  },
  youngProfessional: {
    needs: 35,
    emergency: 15,
    investments: 30,
    growth: 5,
    goals: 10,
    lifestyle: 5,
    retirement: 0,
    insurance: 0,
  },
  family: {
    needs: 40,
    investments: 25,
    emergency: 10,
    retirement: 10,
    insurance: 5,
    lifestyle: 10,
    growth: 0,
    goals: 0,
  },
  preRetirement: {
    needs: 40,
    retirement: 30,
    emergency: 15, // safe savings / liquid cushion
    insurance: 10, // healthcare and critical illness
    lifestyle: 5,
    investments: 0,
    growth: 0,
    goals: 0,
  },
  retired: {
    needs: 50, // essential living
    insurance: 15, // healthcare & medical reserve
    investments: 20, // safe income-generating investments
    lifestyle: 10,
    emergency: 5, // liquidity reserve
    growth: 0,
    goals: 0,
    retirement: 0,
  },
};

// UI Metadata for each category
export const CATEGORY_META: Record<
  CategoryKey,
  {
    label: string;
    emoji: string;
    color: string;
    bgLight: string;
    borderColor: string;
    description: string;
    whyImportant: string;
  }
> = {
  needs: {
    label: 'Essential Expenses',
    emoji: '🏠',
    color: '#0284c7', // sky-600
    bgLight: '#f0f9ff',
    borderColor: '#bae6fd',
    description: 'Rent or home loan EMI, groceries, utilities, transport, and basic utilities.',
    whyImportant: 'Keeps your day-to-day life running smoothly without incurring high-interest debt.',
  },
  emergency: {
    label: 'Emergency Cushion',
    emoji: '🏦',
    color: '#059669', // emerald-600
    bgLight: '#ecfdf5',
    borderColor: '#a7f3d0',
    description: 'Liquid savings stored in sweep-in FDs, liquid funds, or high-yield savings accounts.',
    whyImportant: 'Shields you from unexpected medical expenses, job disruptions, or sudden repairs.',
  },
  investments: {
    label: 'Wealth Investments',
    emoji: '📈',
    color: '#7c3aed', // violet-600
    bgLight: '#f5f3ff',
    borderColor: '#ddd6fe',
    description: 'Diversified index funds, mutual funds, PPF, and long-term equity growth assets.',
    whyImportant: 'Compounds your wealth faster than inflation to build genuine financial freedom.',
  },
  retirement: {
    label: 'Retirement Fund',
    emoji: '🌅',
    color: '#d97706', // amber-600
    bgLight: '#fffbeb',
    borderColor: '#fde68a',
    description: 'Dedicated retirement vehicles (EPF, PPF, NPS, target-date retirement portfolios).',
    whyImportant: 'Guarantees your financial independence and dignity when you stop active work.',
  },
  insurance: {
    label: 'Protection & Healthcare',
    emoji: '🛡️',
    color: '#e11d48', // rose-600
    bgLight: '#fff1f2',
    borderColor: '#fecdd3',
    description: 'Pure term life insurance, comprehensive family health cover, and critical illness riders.',
    whyImportant: 'Protects your entire accumulated wealth from catastrophic hospital bills.',
  },
  growth: {
    label: 'Skill & Career Growth',
    emoji: '🎓',
    color: '#2563eb', // blue-600
    bgLight: '#eff6ff',
    borderColor: '#bfdbfe',
    description: 'Certifications, specialized masterclasses, industry books, tech subscriptions, and coaching.',
    whyImportant: 'Your personal earning potential is your highest-yield compounding asset.',
  },
  lifestyle: {
    label: 'Lifestyle & Fun',
    emoji: '🎮',
    color: '#db2777', // pink-600
    bgLight: '#fdf2f8',
    borderColor: '#fbcfe8',
    description: 'Dining out, weekend leisure, movie tickets, OTT subscriptions, and guilt-free treats.',
    whyImportant: 'Guilt-free enjoyment prevents financial burnout and makes your budget sustainable.',
  },
  goals: {
    label: 'Short-Term Goals',
    emoji: '🎯',
    color: '#0d9488', // teal-600
    bgLight: '#f0fdfa',
    borderColor: '#99f6e4',
    description: 'Planned milestones: buying a vehicle, wedding budget, international vacation, or gadget upgrades.',
    whyImportant: 'Allows you to fund milestone dreams in cash without credit cards or costly personal loans.',
  },
};

/**
 * Core Dynamic Financial Engine
 * Calculates customized allocation percentages and rupee values based on profile inputs
 */
export function calculateSalaryAllocation(profile: UserProfile): AllocationResult {
  const { lifeStage, monthlyIncome, riskPreference, livingSituation, emergencySavings, dependents } = profile;

  // 1. Start with life-stage baseline
  const raw: Record<CategoryKey, number> = { ...BASE_PROFILES[lifeStage] };

  // 2. Adjust for Emergency Savings Status
  let emergencyReasonText = '';
  if (emergencySavings === 'none') {
    // Aggressively boost emergency fund (+8%)
    const boost = 8;
    raw.emergency += boost;
    // Offset from lifestyle and goals/investments
    if (raw.lifestyle >= 6) {
      raw.lifestyle -= 4;
    } else {
      raw.lifestyle = Math.max(2, raw.lifestyle - 2);
    }
    if (raw.goals >= 4) {
      raw.goals -= 4;
    } else if (raw.investments >= 10) {
      raw.investments -= 4;
    }
    emergencyReasonText = 'Your emergency cushion is currently 0, so we have temporarily boosted your emergency savings allocation by 8% to protect you against sudden emergencies before deploying heavy market capital.';
  } else if (emergencySavings === '1to3') {
    const boost = 4;
    raw.emergency += boost;
    if (raw.lifestyle >= 4) raw.lifestyle -= 2;
    if (raw.goals >= 2) raw.goals -= 2;
    emergencyReasonText = 'You have a 1–3 month cushion started. We allocated extra toward liquid savings so you can reach your optimal target safely.';
  } else if (emergencySavings === '6plus') {
    // Emergency fund already fully funded!
    // Maintain a small 3-4% liquidity buffer and redirect remainder into investments and goals
    const freed = Math.max(0, raw.emergency - 4);
    raw.emergency = 4;
    if (raw.investments > 0) {
      raw.investments += Math.round(freed * 0.65);
    } else if (raw.retirement > 0) {
      raw.retirement += Math.round(freed * 0.65);
    }
    raw.goals += Math.round(freed * 0.35);
    emergencyReasonText = 'Congratulations! Since you already maintain a solid 6+ month emergency cushion, your required ongoing emergency savings is dialed down to a small 4% liquidity buffer. The remaining surplus is channeled directly into wealth compounding and short-term goals.';
  } else {
    emergencyReasonText = 'Your 3–6 month reserve provides a balanced safety net, allowing you to maintain regular allocations.';
  }

  // 3. Adjust for Living Situation
  if (livingSituation === 'renting') {
    // Rent usually increases needs
    raw.needs += 4;
    if (raw.lifestyle >= 6) {
      raw.lifestyle -= 2;
      if (raw.goals >= 2) raw.goals -= 2;
      else if (raw.investments >= 2) raw.investments -= 2;
    }
  } else if (livingSituation === 'family') {
    // Living with family significantly trims essential needs
    const reduction = 8;
    raw.needs = Math.max(20, raw.needs - reduction);
    if (raw.investments > 0) raw.investments += 4;
    if (raw.growth > 0) raw.growth += 2;
    else raw.goals += 2;
    raw.emergency += 2;
  }

  // 4. Adjust for Dependents
  if (dependents === '1to2') {
    raw.needs += 3;
    raw.insurance = (raw.insurance || 0) + 3;
    if (raw.lifestyle >= 6) raw.lifestyle -= 3;
    if (raw.goals >= 3) raw.goals -= 3;
  } else if (dependents === '3plus') {
    raw.needs += 6;
    raw.insurance = (raw.insurance || 0) + 5;
    if (raw.lifestyle >= 6) raw.lifestyle -= 4;
    if (raw.goals >= 4) raw.goals -= 4;
    else if (raw.investments >= 5) raw.investments -= 3;
  }

  // 5. Adjust for Income Scale
  if (monthlyIncome >= 200000) {
    // Higher earners can comfortably meet needs with smaller percentage
    raw.needs = Math.max(25, raw.needs - 4);
    if (raw.investments > 0) raw.investments += 3;
    if (raw.retirement > 0) raw.retirement += 1;
    else raw.goals += 1;
  } else if (monthlyIncome <= 25000 && monthlyIncome > 0) {
    // Modest incomes need higher proportion for essentials
    raw.needs += 5;
    if (raw.investments >= 8) raw.investments -= 3;
    if (raw.lifestyle >= 5) raw.lifestyle -= 2;
  }

  // 6. Guarantee Exact 100% Total with Integer Percentages
  const allKeys = Object.keys(raw) as CategoryKey[];
  let totalRaw = allKeys.reduce((acc, k) => acc + Math.max(0, raw[k]), 0);
  if (totalRaw === 0) totalRaw = 100;

  // First pass: normalized floating point
  const normalized: Record<CategoryKey, number> = {} as any;
  allKeys.forEach((k) => {
    normalized[k] = (Math.max(0, raw[k]) / totalRaw) * 100;
  });

  // Second pass: round to nearest integer
  const roundedPercentages: Record<CategoryKey, number> = {} as any;
  let sumRounded = 0;
  let maxCategoryKey: CategoryKey = 'needs';
  let maxVal = -1;

  allKeys.forEach((k) => {
    const r = Math.round(normalized[k]);
    roundedPercentages[k] = r;
    sumRounded += r;
    if (r > maxVal) {
      maxVal = r;
      maxCategoryKey = k;
    }
  });

  // Fix any 1% rounding discrepancy on the largest category
  const diff = 100 - sumRounded;
  if (diff !== 0 && roundedPercentages[maxCategoryKey] !== undefined) {
    roundedPercentages[maxCategoryKey] += diff;
  }

  // 7. Calculate Rupee amounts and reconcile rounding
  const amounts: Record<CategoryKey, number> = {} as any;
  let totalCalculatedAmount = 0;

  allKeys.forEach((k) => {
    const amt = Math.round((monthlyIncome * roundedPercentages[k]) / 100);
    amounts[k] = amt;
    totalCalculatedAmount += amt;
  });

  const amountDiff = monthlyIncome - totalCalculatedAmount;
  if (amountDiff !== 0 && amounts[maxCategoryKey] !== undefined) {
    amounts[maxCategoryKey] += amountDiff;
  }

  // 8. Generate Subcategories & Item structures
  const allocations: Record<CategoryKey, AllocationItem> = {} as any;

  allKeys.forEach((key) => {
    const meta = CATEGORY_META[key];
    const pct = roundedPercentages[key];
    const amt = amounts[key];

    let subcategories: AllocationItem['subcategories'] = [];

    if (key === 'needs') {
      subcategories = [
        { name: 'Rent / Home Maintenance / EMI', percentageShare: 50, description: 'Primary shelter and housing costs', type: 'expense' },
        { name: 'Groceries, Food & Essentials', percentageShare: 30, description: 'Daily nutrition, household supplies', type: 'expense' },
        { name: 'Utilities & Transport', percentageShare: 20, description: 'Electricity, water, fuel, commute', type: 'expense' },
      ];
    } else if (key === 'emergency') {
      subcategories = [
        { name: 'Liquid Savings / Sweep-in Bank FD', percentageShare: 60, description: 'Instant 24/7 access without penalties', type: 'safe' },
        { name: 'Arbitrage / Ultra-Short Term Debt Fund', percentageShare: 40, description: 'Tax-efficient stable returns', type: 'safe' },
      ];
    } else if (key === 'investments') {
      if (riskPreference === 'conservative') {
        subcategories = [
          { name: 'Safe Instruments (PPF, T-Bills, FDs)', percentageShare: 70, description: 'Capital preservation & steady interest', type: 'safe' },
          { name: 'Broad Market Equity Index Funds', percentageShare: 30, description: 'Nifty 50 / Large cap index tracking', type: 'market' },
        ];
      } else if (riskPreference === 'growth') {
        subcategories = [
          { name: 'Diversified Index Funds (Nifty 50 / Next 50)', percentageShare: 50, description: 'Low-cost core passive equity', type: 'market' },
          { name: 'Active Flexi-cap / Mid-cap Mutual Funds', percentageShare: 35, description: 'Higher alpha long-term compounders', type: 'market' },
          { name: 'Safe Anchors (PPF / High-Yield Fixed Income)', percentageShare: 15, description: 'Minimal baseline stabilizer', type: 'safe' },
        ];
      } else {
        // Balanced
        subcategories = [
          { name: 'Diversified Equity Index / Flexi-cap Funds', percentageShare: 60, description: 'Broad market compounding', type: 'market' },
          { name: 'Safe Government Securities / PPF / Bank FDs', percentageShare: 40, description: 'Zero volatility anchor', type: 'safe' },
        ];
      }
    } else if (key === 'retirement') {
      subcategories = [
        { name: 'EPF / NPS (National Pension System)', percentageShare: 60, description: 'Structured pension with tax benefits', type: 'safe' },
        { name: 'Retirement-focused Long-Term Equity SIP', percentageShare: 40, description: 'Inflation-beating 15+ year horizon', type: 'market' },
      ];
    } else if (key === 'insurance') {
      subcategories = [
        { name: 'Family Health Insurance (Floater + Super Top-up)', percentageShare: 60, description: 'Hospitalization and day-care cover', type: 'protection' },
        { name: 'Pure Term Life Insurance', percentageShare: 40, description: 'High-cover income replacement for dependents', type: 'protection' },
      ];
    } else if (key === 'growth') {
      subcategories = [
        { name: 'Professional Courses & Certifications', percentageShare: 60, description: 'Skills that upgrade salary bands', type: 'growth' },
        { name: 'Books, Subscriptions & Productive Tools', percentageShare: 40, description: 'Daily learning & efficiency leverage', type: 'growth' },
      ];
    } else if (key === 'lifestyle') {
      subcategories = [
        { name: 'Dining out & Social Gatherings', percentageShare: 50, description: 'Connecting with friends and loved ones', type: 'expense' },
        { name: 'Leisure, Hobbies & Entertainment', percentageShare: 50, description: 'Guilt-free personal joy', type: 'expense' },
      ];
    } else if (key === 'goals') {
      subcategories = [
        { name: 'Short-Term Target Fund (Recurring Deposit / Liquid)', percentageShare: 70, description: 'Capital locked for next 1–3 year purchases', type: 'safe' },
        { name: 'Milestone Buffer', percentageShare: 30, description: 'Flexibility for unexpected celebrations', type: 'safe' },
      ];
    }

    allocations[key] = {
      key,
      label: meta.label,
      emoji: meta.emoji,
      percentage: pct,
      amount: amt,
      color: meta.color,
      bgLight: meta.bgLight,
      borderColor: meta.borderColor,
      description: meta.description,
      whyImportant: meta.whyImportant,
      subcategories,
    };
  });

  // 9. Investment Breakdown (Safe vs Market-Linked)
  let totalInvestable = amounts.investments + amounts.retirement;
  let safeFraction = 0.4;
  let marketFraction = 0.6;

  if (riskPreference === 'conservative') {
    safeFraction = 0.7;
    marketFraction = 0.3;
  } else if (riskPreference === 'growth') {
    safeFraction = 0.15;
    marketFraction = 0.85;
  }

  const safeAmt = Math.round(totalInvestable * safeFraction);
  const marketAmt = totalInvestable - safeAmt;

  const investmentBreakdown: InvestmentBreakdown = {
    safePercentage: Math.round(((roundedPercentages.investments + roundedPercentages.retirement) * safeFraction)),
    safeAmount: safeAmt,
    safeInstruments: [
      { name: 'Public Provident Fund (PPF)', desc: 'Government-backed 15-year exempt-exempt-exempt compounding with sovereign safety.', risk: 'Government backed (Zero default risk)' },
      { name: 'Bank Fixed Deposits / Sweep FDs', desc: 'DICGC insured up to ₹5 Lakhs per bank with guaranteed maturity values.', risk: 'Bank credit risk (Insured up to ₹5L)' },
      { name: 'Government Securities (T-Bills / G-Secs)', desc: 'Direct RBI Retail Direct access to central and state government bonds.', risk: 'Sovereign safety (Subject to interest-rate risk if sold early)' },
      { name: 'National Pension System (NPS) - Tier I / II Safe Scheme', desc: 'Government and corporate debt fund options with low expense ratio.', risk: 'Credit & duration risk' },
    ],
    marketPercentage: Math.round(((roundedPercentages.investments + roundedPercentages.retirement) * marketFraction)),
    marketAmount: marketAmt,
    marketInstruments: [
      { name: 'Diversified Broad Index Funds (Nifty 50 / Nifty Next 50)', desc: 'Low-cost passive exposure to the top 100 Indian companies driving national GDP.', risk: 'Market volatility (Historical resilience over 5-7+ years)' },
      { name: 'Flexi-Cap & Mid-Cap Mutual Funds', desc: 'Active fund manager flexibility to allocate across large, mid, and small businesses.', risk: 'Market equity risk' },
      { name: 'International / Multi-Asset Allocation Funds', desc: 'Geographic and asset class diversification to hedge currency and local drawdowns.', risk: 'Currency & market fluctuations' },
    ],
  };

  // 10. Emergency Fund Metrics
  const monthlyEssentials = amounts.needs + (amounts.insurance || 0);
  let targetMonthsMin = 3;
  let targetMonthsMax = 6;
  if (lifeStage === 'family' || dependents !== 'none' || lifeStage === 'preRetirement' || lifeStage === 'retired') {
    targetMonthsMin = 6;
    targetMonthsMax = 12;
  }

  const targetAmountMin = monthlyEssentials * targetMonthsMin;
  const targetAmountMax = monthlyEssentials * targetMonthsMax;

  let currentEstMonths = 0;
  if (emergencySavings === '1to3') currentEstMonths = 2;
  else if (emergencySavings === '3to6') currentEstMonths = 4.5;
  else if (emergencySavings === '6plus') currentEstMonths = targetMonthsMax;

  const currentEstAmount = monthlyEssentials * currentEstMonths;
  const gapAmount = Math.max(0, targetAmountMin - currentEstAmount);

  let emergencyStatusText = '';
  let emergencyActionAdvice = '';
  if (emergencySavings === 'none') {
    emergencyStatusText = `Needs immediate setup. Your baseline target is ${formatINR(targetAmountMin)} (${targetMonthsMin} months of essential expenses).`;
    emergencyActionAdvice = `Prioritize building this cushion before any aggressive stock market exposure. At your current allocation of ${formatINR(amounts.emergency)}/mo, you will achieve your 3-month safety baseline in approximately ${amounts.emergency > 0 ? Math.ceil(targetAmountMin / amounts.emergency) : 'N/A'} months.`;
  } else if (emergencySavings === '1to3') {
    emergencyStatusText = `Promising start (${currentEstMonths} months covered). Target goal: ${formatINR(targetAmountMin)} – ${formatINR(targetAmountMax)}.`;
    emergencyActionAdvice = `Keep depositing ${formatINR(amounts.emergency)}/mo into high-yield sweep FDs to reach the recommended ${targetMonthsMin}-month benchmark smoothly.`;
  } else if (emergencySavings === '6plus') {
    emergencyStatusText = `Fully protected! You hold a rock-solid cushion exceeding ${formatINR(targetAmountMin)}.`;
    emergencyActionAdvice = 'Because your foundation is secure, redirect ongoing surplus into long-term compounding instruments and milestone goals.';
  } else {
    emergencyStatusText = `Healthy foundation (${targetMonthsMin}–${targetMonthsMax} months target).`;
    emergencyActionAdvice = 'Maintain your automated monthly contribution to keep pace with cost-of-living adjustments.';
  }

  // 11. Personalized Narrative Explanation
  const lifeStageTitles: Record<LifeStage, string> = {
    student: 'Student / Early Career Wealth Accelerator Blueprint',
    youngProfessional: 'Young Professional High-Growth & Goal Blueprint',
    family: 'Family Financial Security & Balanced Compounding Blueprint',
    preRetirement: 'Pre-Retirement Capital Preservation & Readiness Blueprint',
    retired: 'Retiree Guaranteed Cashflow & Healthcare Security Blueprint',
  };

  const dynamicSummary = generateDynamicSummary(profile, roundedPercentages, amounts);

  const highlights: string[] = [
    `Essentials kept strictly at ${roundedPercentages.needs}% (${formatINR(amounts.needs)}) to prevent lifestyle inflation.`,
    `Emergency savings calibrated at ${roundedPercentages.emergency}% (${formatINR(amounts.emergency)}/month) tailored to your ${emergencySavings} current reserve.`,
    `${roundedPercentages.investments + roundedPercentages.retirement}% (${formatINR(totalInvestable)}/month) dedicated to wealth building with a ${riskPreference} asset mix.`,
  ];

  if (roundedPercentages.growth > 0) {
    highlights.push(`Career & Skill development allocated ${roundedPercentages.growth}% (${formatINR(amounts.growth)}) to continuously boost your salary.`);
  }
  if (roundedPercentages.goals > 0) {
    highlights.push(`Dedicated goal buffer of ${roundedPercentages.goals}% (${formatINR(amounts.goals)}) to cashflow planned purchases without credit debt.`);
  }

  return {
    allocations,
    totalPercentage: 100,
    totalAmount: monthlyIncome,
    unallocatedPercentage: 0,
    unallocatedAmount: 0,
    emergencyFundMetrics: {
      targetMonthsMin,
      targetMonthsMax,
      targetAmountMin,
      targetAmountMax,
      currentEstimatedMonths: currentEstMonths,
      gapAmount,
      statusText: emergencyStatusText,
      actionAdvice: emergencyActionAdvice,
    },
    explanation: {
      title: lifeStageTitles[lifeStage],
      summary: dynamicSummary,
      highlights,
      emergencyReason: emergencyReasonText,
      investmentStrategy: `Given your ${riskPreference} risk preference, your wealth investments are divided into ${investmentBreakdown.safePercentage}% safe instruments (PPF, FDs, G-Secs) and ${investmentBreakdown.marketPercentage}% market-linked equity index/mutual funds. This ensures downside stability while beating long-term inflation.`,
    },
    investmentBreakdown,
  };
}

function generateDynamicSummary(
  profile: UserProfile,
  pcts: Record<CategoryKey, number>,
  amounts: Record<CategoryKey, number>
): string {
  const { lifeStage, livingSituation, dependents } = profile;

  let livingContext = '';
  if (livingSituation === 'family') {
    livingContext = 'Benefiting from living with family, your housing overhead is substantially lower, enabling you to accelerate investments and skill acquisition.';
  } else if (livingSituation === 'renting') {
    livingContext = 'Accounting for rental accommodation, essential needs are budgeted with a comfortable buffer so you never feel cash-strapped on rent day.';
  } else {
    livingContext = 'With home ownership, your essential budget maintains property taxes and home maintenance without dipping into investments.';
  }

  let familyContext = '';
  if (dependents === '1to2' || dependents === '3plus') {
    familyContext = `Having ${dependents === '3plus' ? '3 or more' : '1–2'} dependents, the blueprint reinforces comprehensive health and term insurance cover alongside structured family retirement planning.`;
  }

  if (lifeStage === 'student') {
    return `You are in your early career/student stage, the golden phase where time is your greatest asset. The plan allocates ${pcts.investments}% (${formatINR(amounts.investments)}) to long-term wealth, while dedicating ${pcts.growth}% (${formatINR(amounts.growth)}) to skill development. ${livingContext} Your lifestyle allocation is intentionally paced to let income increments fuel rapid compound growth.`;
  }

  if (lifeStage === 'youngProfessional') {
    return `As a young professional, your earning momentum is picking up speed. This blueprint balances aggressive long-term compounding (${pcts.investments}%, ${formatINR(amounts.investments)}) with short-term goal fulfillment (${pcts.goals}%, ${formatINR(amounts.goals)}). ${livingContext} A structured emergency fund allocation keeps you resilient against unforeseen surprises.`;
  }

  if (lifeStage === 'family') {
    return `In the family stage, balancing current comfort, child-rearing, and future retirement is paramount. Essentials are allocated ${pcts.needs}% (${formatINR(amounts.needs)}), with ${pcts.retirement}% dedicated to retirement and ${pcts.insurance}% toward pure risk protection. ${familyContext} ${livingContext}`;
  }

  if (lifeStage === 'preRetirement') {
    return `With retirement on the near horizon, capital preservation and healthcare readiness take center stage. 40% is reserved for comfortable living, while ${pcts.retirement}% (${formatINR(amounts.retirement)}) accelerates your final retirement corpus and ${pcts.insurance}% secures healthcare. This minimizes risk exposure to market drawdowns.`;
  }

  // Retired
  return `In retirement, consistent cashflow and healthcare peace of mind are the core pillars. 50% is allocated for day-to-day essentials, 15% dedicated to healthcare reserves, and 20% invested in safe income-generating assets (Senior Citizens Savings Scheme, Bank FDs, Sovereign Annuities) to generate peaceful, worry-free passive cashflow.`;
}

/**
 * Goal Calculator Utility
 */
export const POPULAR_GOALS: GoalPreset[] = [
  { id: 'emergency', name: 'Emergency Fund Cushion', icon: '🛡️', defaultAmount: 150000, defaultYears: 1, category: 'short' },
  { id: 'gadget', name: 'Laptop / Premium Phone', icon: '💻', defaultAmount: 100000, defaultYears: 1, category: 'short' },
  { id: 'education', name: 'Higher Education / MBA', icon: '🎓', defaultAmount: 800000, defaultYears: 3, category: 'medium' },
  { id: 'car', name: 'Car Down Payment', icon: '🚗', defaultAmount: 350000, defaultYears: 2, category: 'short' },
  { id: 'house', name: 'House Down Payment', icon: '🏠', defaultAmount: 1500000, defaultYears: 5, category: 'medium' },
  { id: 'marriage', name: 'Wedding Expenses', icon: '💍', defaultAmount: 700000, defaultYears: 3, category: 'medium' },
  { id: 'travel', name: 'Dream International Vacation', icon: '✈️', defaultAmount: 200000, defaultYears: 1, category: 'short' },
  { id: 'retirement', name: 'Retirement Milestone Corpus', icon: '🌅', defaultAmount: 5000000, defaultYears: 10, category: 'long' },
  { id: 'custom', name: 'Custom Financial Goal', icon: '🎯', defaultAmount: 250000, defaultYears: 2, category: 'medium' },
];

export function calculateGoalFeasibility(
  goalName: string,
  targetAmount: number,
  targetYears: number,
  currentGoalsAllocation: number
): FinancialGoalCalculation {
  const targetMonths = Math.max(1, Math.round(targetYears * 12));
  const monthlyRequired = Math.round(targetAmount / targetMonths);
  const difference = currentGoalsAllocation - monthlyRequired;

  let feasibility: FinancialGoalCalculation['feasibility'] = 'onTrack';
  const tips: string[] = [];

  if (difference >= 0) {
    feasibility = 'onTrack';
    tips.push(`Your current monthly goal allocation of ${formatINR(currentGoalsAllocation)} fully covers the required ${formatINR(monthlyRequired)}/month.`);
    tips.push('Automate a monthly Recurring Deposit (RD) or sweep account on salary day so you never accidentally spend it.');
  } else if (Math.abs(difference) <= monthlyRequired * 0.35) {
    feasibility = 'moderateGap';
    tips.push(`You have a modest gap of ${formatINR(Math.abs(difference))}/month.`);
    tips.push(`Option A: Extend your target timeline from ${targetYears} years to ${(targetAmount / (currentGoalsAllocation * 12)).toFixed(1)} years.`);
    tips.push(`Option B: Temporarily reallocate ${formatINR(Math.abs(difference))} from your Lifestyle/Fun allowance toward this goal.`);
  } else {
    feasibility = 'heavyStretch';
    tips.push(`Requires ${formatINR(monthlyRequired)}/month vs current goal allocation of ${formatINR(currentGoalsAllocation)}/month.`);
    tips.push('Consider breaking this milestone into phased stages or earmarking annual bonuses/tax refunds toward it.');
    tips.push('Review whether extending the horizon can make monthly contributions sustainable without starving your emergency fund.');
  }

  return {
    goalName,
    targetAmount,
    targetYears,
    targetMonths,
    monthlyRequired,
    currentMonthlyAllocation: currentGoalsAllocation,
    difference,
    feasibility,
    tips,
  };
}

/**
 * Salary Growth Simulator
 */
export function calculateSalaryGrowthProjection(
  currentSalary: number,
  annualGrowthRatePercent: number,
  horizonYears: number = 5,
  allocationPercentages: Record<CategoryKey, number>
): SalaryGrowthYear[] {
  const result: SalaryGrowthYear[] = [];
  let salary = currentSalary;

  for (let y = 1; y <= horizonYears; y++) {
    if (y > 1) {
      salary = Math.round(salary * (1 + annualGrowthRatePercent / 100));
    }

    const needs = Math.round((salary * (allocationPercentages.needs || 0)) / 100);
    const emergency = Math.round((salary * (allocationPercentages.emergency || 0)) / 100);
    const investments = Math.round((salary * ((allocationPercentages.investments || 0) + (allocationPercentages.retirement || 0))) / 100);
    const goals = Math.round((salary * (allocationPercentages.goals || 0)) / 100);
    const lifestyle = Math.round((salary * (allocationPercentages.lifestyle || 0)) / 100);

    result.push({
      year: y,
      monthlySalary: salary,
      annualSalary: salary * 12,
      needsAmount: needs,
      emergencyAmount: emergency,
      investmentsAmount: investments,
      goalsAmount: goals,
      lifestyleAmount: lifestyle,
    });
  }

  return result;
}
