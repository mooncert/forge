// 숫자 포맷팅 유틸리티

export const CROSS_TO_USD = 0.25;

export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimals)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
}

export function formatCurrency(num: number, decimals: number = 2): string {
  return `$${formatNumber(num, decimals)}`;
}

export function formatCrossAmount(cross: number, decimals: number = 2): string {
  return `${formatNumber(cross, decimals)} CROSS`;
}

export function formatCrossWithUSD(cross: number, decimals: number = 2): string {
  const usd = cross * CROSS_TO_USD;
  return `${formatNumber(cross, decimals)} CROSS ($${formatNumber(usd, decimals)})`;
}

export function formatPercentage(num: number, decimals: number = 2): string {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(decimals)}%`;
}

export function formatAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function crossToUSD(cross: number): number {
  return cross * CROSS_TO_USD;
}

export function usdToCross(usd: number): number {
  return usd / CROSS_TO_USD;
}
