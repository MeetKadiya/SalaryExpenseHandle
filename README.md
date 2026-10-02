# 💰 SalaryWise — Give Every Rupee a Purpose

> **A personal salary allocation and financial planning calculator tailored for India (INR ₹).**  
> Designed with modern fintech ergonomics, dynamic life-stage frameworks, risk-calibrated asset splits, goal roadmaps, and salary compounding simulations.

---

## 🌟 Key Features

1. **Multi-Step Guided Flow (<60 seconds)**:
   - **Step 1: Life Stage Selection**: 🎓 Student / Early Career, 💼 Young Professional, 👨‍👩‍👧 Middle Aged / Family, 👴 Pre-Retirement, 🧓 Retired.
   - **Step 2: Monthly Take-Home Pay**: Large ₹ currency input, live Indian number formatting (e.g. `₹50,000`, `₹1,50,000`), quick-select salary pills, and annualized CTC preview.
   - **Step 3: Financial Profile**: Risk preference (Conservative, Balanced, Growth), Living situation (Family, Renting, Own House), Existing emergency cushion (None, 1–3 mo, 3–6 mo, 6+ mo), and Financial Dependents (None, 1–2, 3+).
   - **Step 4: Salary Blueprint**: Personalized, comprehensive financial dashboard.

2. **Dynamic Financial Adjustment Engine**:
   - **No One-Size-Fits-All**: Uses life-stage starting baselines and dynamically recalibrates every bucket according to emergency preparedness, dependents, housing costs, and income scale.
   - **Strict 100% Math Guarantee**: Allocation percentages and rupee sums strictly equal 100.0% and exact salary with automated rounding reconciliation.
   - **Emergency Cushion Logic**:
     - Automatically calculates recommended reserves (3–6 months for students/young pros; 6–12 months for families/retirees).
     - If reserve is 0, temporarily boosts savings (+8%) and explains why.
     - When 6+ months is achieved, dials down emergency contribution to a 4% liquidity buffer and channels surplus into investments & goals.

3. **Interactive Visualizations**:
   - **Recharts Interactive Donut Chart**: Hover micro-interactions, custom tooltips with percentages & rupee amounts, and center income label.
   - **Horizontal Comparative Bar Chart**: Visual comparison of Total Income vs Needs, Savings, Investments, and Goals.

4. **Safe vs. Market-Linked Wealth Architecture**:
   - Clearly differentiates safe lower-risk options (PPF, Bank FDs, Sovereign G-Secs, T-Bills) from market-linked growth options (Nifty 50 Index, Flexi-cap, Mid-cap mutual funds).
   - Complies with strict educational standards: never describes any asset as completely "risk-free".

5. **Milestone Goal Calculator**:
   - Calculate exact monthly contributions needed for popular goals (Car, House Down Payment, Wedding, Higher Education, Vacation, Gadgets, Custom).
   - Real-time feasibility check against your current monthly blueprint.

6. **5-Year Salary Growth Simulator**:
   - Compounding projections with adjustable annual growth rate (4% to 25%) and horizon sliders (2 to 7 years).
   - Year-by-year table and visual growth area chart.

7. **Productivity & Sharing Tools**:
   - **Custom Allocation Fine-Tuner**: Sliders to manually adjust any category with instant "Auto-Balance to 100%".
   - **Local Storage Library**: Save multiple plans privately in the browser with timestamps.
   - **Print / PDF Export**: Formatted printable view ready for paper or PDF export (`Ctrl + P` / `Cmd + P`).
   - **Privacy-Friendly Sharing**: Generate clean summary text for WhatsApp, Twitter/X, or clipboard without exposing sensitive credentials.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Recharts** (Interactive charts)
- **Lucide React** (Fintech icons)
- **Canvas Confetti** (Micro-celebration)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
git clone <repo-url>
cd SalaryExpenseHandle
npm install
```

### Local Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

The production assets will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Netlify Deployment

This project is a static single-page web application (SPA) optimized for Netlify.

### Configuration (`netlify.toml` included)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deploy directly via Netlify CLI or connect your Git repository.

---

## ⚖️ Legal & Educational Disclaimer

> “This calculator provides general educational guidance and is not personalized financial advice. Actual allocations should consider your expenses, debt, emergency needs, taxes, insurance and financial goals.”

SalaryWise does not sell investment products, collect brokerage fees, or recommend specific individual company stocks.
