/**
 * Indian Rupee (INR) currency and numbering formatters
 */

export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  const rounded = Math.round(amount);

  if (compact) {
    if (Math.abs(rounded) >= 10000000) {
      return `₹${(rounded / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (Math.abs(rounded) >= 100000) {
      return `₹${(rounded / 100000).toFixed(2).replace(/\.00$/, '')} L`;
    }
    if (Math.abs(rounded) >= 1000) {
      return `₹${(rounded / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
  }

  // Format with Indian comma grouping (en-IN)
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(rounded);

  return `₹${formatted}`;
}

export function parseINRInput(value: string): number {
  const clean = value.replace(/[^0-9]/g, '');
  if (!clean) return 0;
  const num = parseInt(clean, 10);
  return isNaN(num) ? 0 : Math.min(num, 100000000); // capped at 10 Cr/month for safety
}

export function formatPercentage(val: number): string {
  return `${val.toFixed(val % 1 === 0 ? 0 : 1)}%`;
}
