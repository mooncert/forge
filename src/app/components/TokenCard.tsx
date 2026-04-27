import { TrendingUp, TrendingDown, Users, Trophy, Play, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../App";
import forgeLogo from "figma:asset/21f3c6abd25d5385d3fa88edecb250b65cc3ef8f.png";
import { useState, useEffect, memo, useMemo } from "react";
import { AnimatedProgressBar } from "./AnimatedProgressBar";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import crossAraIcon from "@/assets/a0b26e794d33f97992d7e602cfbe030961352e5b.png";
import type { TokenData } from "../types";
import { formatNumber, formatPercentage, CROSS_TO_USD } from "../utils/formatters";
import { getTierFromMarketCap } from "../utils/tierHelpers";

interface TokenCardProps {
  token: TokenData;
  onClick: () => void;
  rank: number;
  viewMode?: 'grid' | 'list';
}

export function TokenCard({ token, onClick, rank, viewMode = 'grid' }: TokenCardProps) {
  const { effectiveTheme } = useTheme();
  const isPositive = token.priceChange24h >= 0;
  
  // Generate random time ago (mock data)
  const timeAgo = Math.floor(Math.random() * 60);
  const timeUnit = timeAgo < 1 ? 's' : 'm';
  const displayTime = timeAgo < 1 ? Math.floor(Math.random() * 59) + 1 : timeAgo;

  // Mock creator address (shortened)
  const creatorAddress = token.creatorAddress || `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;

  // Get tier badge based on bonding progress
  const getTierBadge = (progress: number) => {
    if (progress < 5) {
      return {
        name: 'INACTIVE',
        emoji: '⚫',
        gradient: 'from-gray-600 via-gray-500 to-gray-600',
        glow: 'rgba(107, 116, 128, 0.5)',
        border: 'border-gray-500/50',
      };
    }
    if (progress < 20) {
      return {
        name: 'BRONZE',
        emoji: '🥉',
        gradient: 'from-[#CD7F32] via-[#D4A574] to-[#CD7F32]',
        glow: 'rgba(205, 127, 50, 0.6)',
        border: 'border-[#CD7F32]/50',
      };
    }
    if (progress < 50) {
      return {
        name: 'SILVER',
        emoji: '🥈',
        gradient: 'from-[#C0C0C0] via-[#E8E8E8] to-[#C0C0C0]',
        glow: 'rgba(192, 192, 192, 0.7)',
        border: 'border-[#C0C0C0]/50',
      };
    }
    if (progress < 70) {
      return {
        name: 'GOLD',
        emoji: '🥇',
        gradient: 'from-[#FFD700] via-[#FFC700] to-[#FFD700]',
        glow: 'rgba(255, 215, 0, 0.8)',
        border: 'border-[#FFD700]/50',
      };
    }
    if (progress < 80) {
      return {
        name: 'PLATINUM',
        emoji: '💚',
        gradient: 'from-[#556B2F] via-[#6B8E23] to-[#556B2F]',
        glow: 'rgba(85, 107, 47, 0.8)',
        border: 'border-[#85AA3F]/50',
      };
    }
    if (progress < 100) {
      return {
        name: 'DIAMOND',
        emoji: '💎',
        gradient: 'from-[#00D9FF] via-[#40E0D0] to-[#00D9FF]',
        glow: 'rgba(0, 217, 255, 0.9)',
        border: 'border-[#00D9FF]/50',
      };
    }
    return {
      name: 'Hall of Fame',
      emoji: '🏆',
      gradient: 'from-[#9333EA] via-[#A855F7] to-[#9333EA]',
      glow: 'rgba(147, 51, 234, 1)',
      border: 'border-[#9333EA]/50',
    };
  };

  const tierBadge = token.bondingProgress !== undefined ? getTierBadge(token.bondingProgress) : null;

  // Progress bar color based on rank (cycling colors like in the image)
  const getProgressBarColor = () => {
    const colors = [
      'bg-pink-500',
      'bg-yellow-500', 
      'bg-cyan-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-red-500',
    ];
    return colors[rank % colors.length];
  };

  // Bonding Curve Stage colors based on progress
  const getBondingStageStyle = (progress: number) => {
    if (progress < 25) {
      // Seed: Bright Cyan
      return {
        color: 'bg-cyan-400',
      };
    } else if (progress < 50) {
      // Growth: Bright Blue
      return {
        color: 'bg-blue-500',
      };
    } else if (progress < 75) {
      // Hype: Bright Purple
      return {
        color: 'bg-purple-500',
      };
    } else {
      // Launch: Bright Orange
      return {
        color: 'bg-orange-500',
      };
    }
  };

  // Format market cap to K/M format
  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  // List View (Epic Games Style)
  if (viewMode === 'list') {
    return (
      <motion.div
        onClick={onClick}
        className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
          effectiveTheme === 'dark'
            ? 'bg-gray-950 border-gray-800 hover:border-[#56C880]'
            : 'bg-white border-gray-200 hover:border-[#56C880]'
        }`}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* 좌우 분할 레이아웃 */}
        <div className="flex gap-4 p-4">
          {/* 왼쪽: 게임 이미지 썸네일 */}
          <div className="relative flex-shrink-0 w-36 h-36 rounded-xl overflow-hidden">
            {token.gameImage ? (
              <img 
                src={token.category === "AI Agent" ? crossAraIcon : token.gameImage} 
                alt={token.gameTitle}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#56C880] to-[#45B570]" />
            )}
            
            {/* Tier Badge - 좌측 상단 - 입체적 디자인 */}
            {tierBadge && (
              <motion.div
                className="absolute top-2 left-2"
                animate={{ scale: tierBadge.name === 'DIAMOND' ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 2, repeat: tierBadge.name === 'DIAMOND' ? Infinity : 0 }}
              >
                <div 
                  className={`relative flex items-center px-3 py-1.5 rounded-md bg-gradient-to-br ${tierBadge.gradient} font-extrabold text-[10px] tracking-wider shadow-2xl border-[3px] ${tierBadge.border}`}
                  style={{
                    boxShadow: `0 0 25px ${tierBadge.glow}, 0 6px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)`,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <span className="text-white drop-shadow-lg">{tierBadge.name}</span>
                </div>
              </motion.div>
            )}
            
            {/* Category Icon - 우측 상단 */}
            <div className="absolute top-2 right-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-950/95 backdrop-blur-md border-2 border-[#56C880] shadow-lg shadow-[#56C880]/50">
                {token.category === "AI Agent" ? (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* AI Text */}
                    <text x="20" y="25" textAnchor="middle" fill="#56C880" fontSize="18" fontWeight="900" fontFamily="Arial, sans-serif">AI</text>
                  </svg>
                ) : (
                  <Gamepad2 className="text-[#56C880]" size={24} strokeWidth={2.5} />
                )}
              </div>
            </div>
          </div>

          {/* 중앙: 정보 영역 */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              {/* 게임 타이틀 + 토큰 심볼 */}
              <div className="flex items-baseline gap-2 mb-1.5">
                <h3 className={`text-lg font-bold truncate ${
                  effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {token.gameTitle}
                </h3>
                <span className={`text-xs flex-shrink-0 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {token.symbol}
                </span>
              </div>

              {/* Creator + Time */}
              <div className="flex items-center gap-2 text-xs mb-2">
                <Users size={12} className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {creatorAddress}
                </span>
                <span className={effectiveTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>•</span>
                <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {displayTime}{timeUnit} ago
                </span>
              </div>

              {/* 게임 설명 - 1줄 고정 */}
              {token.description && (
                <p className={`text-xs mb-3 line-clamp-1 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {token.description}
                </p>
              )}

              {/* Bonding Progress Bar */}
              {token.bondingProgress !== undefined && (
                <div className="mb-3">
                  <AnimatedProgressBar progress={token.bondingProgress} />
                </div>
              )}
            </div>

            {/* 하단: Market Cap & Price - 인라인 형태 */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Market Cap */}
              <div className="flex items-center gap-1.5">
                <span className={`text-xs ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Market Cap
                </span>
                <img src={crossCoin} alt="CROSS" className="w-4 h-4" />
                <span className={`font-bold text-sm ${
                  effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {((token.marketCap / CROSS_TO_USD) / 1000).toFixed(1)}K
                </span>
              </div>

              {/* Divider */}
              <div className={`w-px h-4 ${
                effectiveTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
              }`} />

              {/* Price */}
              <div className="flex items-center gap-1.5">
                <span className={`text-xs ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Price
                </span>
                <img src={crossCoin} alt="CROSS" className="w-4 h-4" />
                <span className={`font-bold text-sm ${
                  effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {(token.price / CROSS_TO_USD).toFixed(8)}
                </span>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${
                  token.priceChange24h === 0 
                    ? 'text-gray-400'
                    : isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {token.priceChange24h === 0 ? (
                    <>— 0.00%</>
                  ) : (
                    <>
                      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {isPositive ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View (Steam Style) - Default
  return (
    <motion.div
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
        effectiveTheme === 'dark'
          ? 'bg-gray-950 border-gray-800 hover:border-[#56C880]'
          : 'bg-white border-gray-200 hover:border-[#56C880]'
      }`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* 상단: 게임 이미지 배너 (16:9) */}
      <div className="relative w-full aspect-video overflow-hidden">
        {token.gameImage ? (
          <img 
            src={token.category === "AI Agent" ? crossAraIcon : token.gameImage} 
            alt={token.gameTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#56C880] to-[#45B570]" />
        )}
        
        {/* Tier Badge - 좌측 상단 - 입체적 디자인 */}
        {tierBadge && (
          <motion.div
            className="absolute top-3 left-3"
            animate={{ scale: tierBadge.name === 'DIAMOND' ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 2, repeat: tierBadge.name === 'DIAMOND' ? Infinity : 0 }}
          >
            <div 
              className={`relative flex items-center px-3 py-1.5 rounded-md bg-gradient-to-br ${tierBadge.gradient} font-extrabold text-[11px] tracking-wider shadow-2xl border-[3px] ${tierBadge.border}`}
              style={{
                boxShadow: `0 0 30px ${tierBadge.glow}, 0 8px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)`,
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
              }}
            >
              <span className="text-white drop-shadow-lg">{tierBadge.name}</span>
            </div>
          </motion.div>
        )}
        
        {/* Category Icon - 우측 상단 */}
        <div className="absolute top-3 right-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-950/95 backdrop-blur-md border-2 border-[#56C880] shadow-lg shadow-[#56C880]/50">
            {token.category === "AI Agent" ? (
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* AI Text */}
                <text x="20" y="25" textAnchor="middle" fill="#56C880" fontSize="18" fontWeight="900" fontFamily="Arial, sans-serif">AI</text>
              </svg>
            ) : (
              <Gamepad2 className="text-[#56C880]" size={24} strokeWidth={2.5} />
            )}
          </div>
        </div>
      </div>

      {/* 하단: 정보 영역 */}
      <div className="p-5">
        {/* 게임 타이틀 + 토큰 심볼 */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className={`text-xl font-bold ${
            effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {token.gameTitle}
          </h3>
          <img src={token.image} alt={token.symbol} className="w-6 h-6 rounded-full" />
          <span className={`text-sm ${
            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {token.symbol}
          </span>
        </div>

        {/* Creator + Time */}
        <div className="flex items-center gap-2 text-xs mb-3">
          <Users size={12} className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
          <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            {creatorAddress}
          </span>
          <span className={effectiveTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>•</span>
          <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            {displayTime}{timeUnit} ago
          </span>
          <span className={effectiveTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>•</span>
          <div className="flex items-center gap-1">
            <Play size={12} className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
            <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {Math.floor(token.playCount || 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* 게임 설명 - 2줄 고정 */}
        {token.description && (
          <p className={`text-sm mb-3 line-clamp-2 leading-snug ${
            effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}
             style={{ minHeight: '2rem' }}
          >
            {token.description}
          </p>
        )}

        {/* Market Cap - Progress Bar 위에 배치 */}
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-xs ${
            effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Market Cap
          </span>
          <div className="flex items-center gap-1">
            <span className={`font-bold text-sm ${
              effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {((token.marketCap / CROSS_TO_USD) / 1000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}K
            </span>
          </div>
        </div>

        {/* Bonding Progress Bar */}
        {token.bondingProgress !== undefined && (
          <div className="mb-3">
            <AnimatedProgressBar progress={token.bondingProgress} />
          </div>
        )}

        {/* Price - 강조된 큰 사이즈 */}
        <div className={`p-3 rounded-lg ${
          effectiveTheme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs ${
              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Price
            </span>
            <div className={`flex items-center gap-1.5 text-xs font-medium ${
              token.priceChange24h === 0 
                ? 'text-gray-400'
                : isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {token.priceChange24h === 0 ? (
                <>— 0.00%</>
              ) : (
                <>
                  {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {isPositive ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <img src={crossCoin} alt="CROSS" className="w-5 h-5" />
            <span className={`font-bold text-2xl ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {(token.price / CROSS_TO_USD).toFixed(8)}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#56C880]/10 to-transparent" />
      </div>
    </motion.div>
  );
}