// 티어 관련 유틸리티

import type { Tier } from '../types';

export interface TierInfo {
  name: Tier;
  minMarketCap: number;
  maxMarketCap: number;
  color: string;
  icon: string;
  gradient: string;
  badgeGradient: string;
}

export const TIER_THRESHOLDS: Record<Tier, TierInfo> = {
  BRONZE: {
    name: "BRONZE",
    minMarketCap: 0,
    maxMarketCap: 100000,
    color: "#CD7F32",
    icon: "🥉",
    gradient: "from-amber-700 via-amber-600 to-amber-700",
    badgeGradient: "bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700"
  },
  SILVER: {
    name: "SILVER",
    minMarketCap: 100000,
    maxMarketCap: 500000,
    color: "#C0C0C0",
    icon: "🥈",
    gradient: "from-gray-400 via-gray-300 to-gray-400",
    badgeGradient: "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400"
  },
  GOLD: {
    name: "GOLD",
    minMarketCap: 500000,
    maxMarketCap: 2000000,
    color: "#FFD700",
    icon: "🥇",
    gradient: "from-yellow-500 via-yellow-400 to-yellow-500",
    badgeGradient: "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500"
  },
  PLATINUM: {
    name: "PLATINUM",
    minMarketCap: 2000000,
    maxMarketCap: 10000000,
    color: "#E5E4E2",
    icon: "💎",
    gradient: "from-slate-300 via-slate-200 to-slate-300",
    badgeGradient: "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300"
  },
  DIAMOND: {
    name: "DIAMOND",
    minMarketCap: 10000000,
    maxMarketCap: Infinity,
    color: "#B9F2FF",
    icon: "💠",
    gradient: "from-cyan-400 via-blue-400 to-cyan-400",
    badgeGradient: "bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400"
  }
};

export function getTierFromMarketCap(marketCap: number): TierInfo {
  if (marketCap >= TIER_THRESHOLDS.DIAMOND.minMarketCap) return TIER_THRESHOLDS.DIAMOND;
  if (marketCap >= TIER_THRESHOLDS.PLATINUM.minMarketCap) return TIER_THRESHOLDS.PLATINUM;
  if (marketCap >= TIER_THRESHOLDS.GOLD.minMarketCap) return TIER_THRESHOLDS.GOLD;
  if (marketCap >= TIER_THRESHOLDS.SILVER.minMarketCap) return TIER_THRESHOLDS.SILVER;
  return TIER_THRESHOLDS.BRONZE;
}

export function getNextTier(currentTier: Tier): TierInfo | null {
  const tiers: Tier[] = ["BRONZE", "SILVER", "GOLD", "PLATINUM", "DIAMOND"];
  const currentIndex = tiers.indexOf(currentTier);
  
  if (currentIndex === -1 || currentIndex === tiers.length - 1) return null;
  
  return TIER_THRESHOLDS[tiers[currentIndex + 1]];
}

export function getProgressToNextTier(marketCap: number): number {
  const currentTier = getTierFromMarketCap(marketCap);
  const nextTier = getNextTier(currentTier.name);
  
  if (!nextTier) return 100; // Already at max tier
  
  const progress = ((marketCap - currentTier.minMarketCap) / (nextTier.minMarketCap - currentTier.minMarketCap)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}
