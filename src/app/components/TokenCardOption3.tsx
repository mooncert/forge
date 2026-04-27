import { TrendingUp, TrendingDown, Users, Activity, Clock, DollarSign, Droplet, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../App";
import forgeLogo from "figma:asset/21f3c6abd25d5385d3fa88edecb250b65cc3ef8f.png";
import { TokenData } from "./TokenCard";

interface TokenCardProps {
  token: TokenData;
  onClick: () => void;
  rank: number;
}

export function TokenCardOption3({ token, onClick, rank }: TokenCardProps) {
  const { effectiveTheme } = useTheme();
  const isPositive = token.priceChange24h >= 0;
  
  const timeAgo = Math.floor(Math.random() * 60);
  const timeUnit = timeAgo < 1 ? 's' : 'm';
  const displayTime = timeAgo < 1 ? Math.floor(Math.random() * 59) + 1 : timeAgo;

  const getRankBadgeColor = () => {
    if (rank === 1) return 'from-yellow-400 to-orange-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-[#56C880] to-[#4ADE80]';
  };

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
      {/* 배경 이미지 - 진하게 (opacity 높임) */}
      <div className="absolute inset-0 overflow-hidden">
        {token.gameImage ? (
          <img 
            src={token.gameImage} 
            alt={token.gameTitle}
            className="w-full h-full object-cover opacity-30"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#56C880] to-[#45B570] opacity-30" />
        )}
        {/* 하단 그라디언트 오버레이 */}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          effectiveTheme === 'dark'
            ? 'from-gray-950 via-gray-950/80 to-transparent'
            : 'from-white via-white/80 to-transparent'
        }`} />
      </div>

      {/* Content */}
      <div className="relative p-5">
        {/* 상단: Publisher + Rank */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={forgeLogo} alt="Verse8" className="w-5 h-5" />
            <span className={`text-sm font-bold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              FORGE
            </span>
            <span className={`text-sm font-semibold ${
              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Origin
            </span>
          </div>
          
          {/* Rank Badge */}
          {rank <= 10 && (
            <motion.div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-br ${getRankBadgeColor()} text-white font-bold text-sm shadow-lg`}
              animate={{ scale: rank === 1 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: rank === 1 ? Infinity : 0 }}
            >
              {rank <= 3 && <Trophy size={14} />}
              #{rank}
            </motion.div>
          )}
        </div>

        {/* 게임 설명 */}
        <p className={`text-sm mb-3 line-clamp-2 ${
          effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {token.description || `${token.gameTitle} - Experience the next generation of blockchain gaming`}
        </p>

        {/* 게임 타이틀 */}
        <h3 className={`text-2xl font-bold mb-4 ${
          effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {token.gameTitle}
        </h3>

        {/* 통계 박스 - 3열 그리드 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Volume 24h */}
          <div className={`p-3 rounded-lg backdrop-blur-sm ${
            effectiveTheme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              <Activity size={12} className="text-[#56C880]" />
              <span className={`text-xs ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Volume 24h
              </span>
            </div>
            <div className={`text-sm font-bold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              ${(token.volume24h / 1000).toFixed(1)}K
            </div>
          </div>

          {/* Liquidity */}
          <div className={`p-3 rounded-lg backdrop-blur-sm ${
            effectiveTheme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              <Droplet size={12} className="text-[#56C880]" />
              <span className={`text-xs ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Liquidity
              </span>
            </div>
            <div className={`text-sm font-bold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              ${(token.liquidity / 1000).toFixed(1)}K
            </div>
          </div>

          {/* Price */}
          <div className={`p-3 rounded-lg backdrop-blur-sm ${
            effectiveTheme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign size={12} className="text-[#56C880]" />
              <span className={`text-xs ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Price
              </span>
            </div>
            <div className={`text-sm font-bold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              ${token.price.toFixed(6)}
            </div>
          </div>
        </div>

        {/* 하단: 작은 통계 칩들 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            {/* Holders */}
            <div className="flex items-center gap-1">
              <Users size={12} className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
              <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {token.holders.toLocaleString()}
              </span>
            </div>
            
            <span className={effectiveTheme === 'dark' ? 'text-gray-700' : 'text-gray-300'}>•</span>
            
            {/* Market Cap */}
            <div className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              ${(token.marketCap / 1000).toFixed(1)}K
            </div>
            
            <span className={effectiveTheme === 'dark' ? 'text-gray-700' : 'text-gray-300'}>•</span>
            
            {/* Time */}
            <div className="flex items-center gap-1">
              <Clock size={12} className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
              <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {displayTime}{timeUnit} ago
              </span>
            </div>
          </div>

          {/* Price Change Badge */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
            isPositive
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span className="text-xs font-bold">
              {isPositive ? '+' : ''}{token.priceChange24h.toFixed(2)}%
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
