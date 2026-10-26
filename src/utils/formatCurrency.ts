/**
 * Formats a numeric value into Argentine Peso currency format (e.g. $ 1.091.142.708,00)
 */
export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '$ 0,00';
  }

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a short currency representation (e.g. $ 1.2M or $ 350K) for compact charts or cards
 */
export function formatCompactCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '$ 0';
  }

  if (Math.abs(value) >= 1_000_000_000) {
    return `$ ${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$ ${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$ ${(value / 1_000).toFixed(0)}K`;
  }

  return `$ ${value.toFixed(0)}`;
}
