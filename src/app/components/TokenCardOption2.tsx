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

export function TokenCardOption2({ token, onClick, rank }: TokenCardProps) {
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
      {/* 좌우 분할 레이아웃 - Epic Games 스타일 */}
      <div className="flex gap-4 p-5">
        {/* 왼쪽: 게임 이미지 썸네일 */}
        <div className="relative flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden">
          {token.gameImage ? (
            <img 
              src={token.gameImage} 
              alt={token.gameTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#56C880] to-[#45B570]" />
          )}
          
          {/* Rank Badge - 이미지 위에 */}
          {rank <= 10 && (
            <motion.div
              className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-br ${getRankBadgeColor()} text-white font-bold text-xs shadow-lg`}
              animate={{ scale: rank === 1 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: rank === 1 ? Infinity : 0 }}
            >
              {rank <= 3 && <Trophy size={12} />}
              #{rank}
            </motion.div>
          )}
        </div>

        {/* 오른쪽: 정보 영역 */}
        <div className="flex-1 flex flex-col">
          {/* Publisher */}
          <div className="flex items-center gap-2 mb-2">
            <img src={forgeLogo} alt="Verse8" className="w-4 h-4" />
            <span className={`text-xs font-bold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              FORGE
            </span>
            <span className={`text-xs font-semibold ${
              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Origin
            </span>
          </div>

          {/* 게임 타이틀 */}
          <h3 className={`text-xl font-bold mb-2 ${
            effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {token.gameTitle}
          </h3>

          {/* 게임 설명 */}
          <p className={`text-xs mb-3 line-clamp-2 ${
            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {token.description || `${token.gameTitle} - Experience the next generation of blockchain gaming`}
          </p>

          {/* 통계 박스 - 3열 그리드 */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className={`p-2 rounded-lg ${
              effectiveTheme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-1 mb-0.5">
                <Activity size={10} className="text-[#56C880]" />
                <span className={`text-[10px] ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Volume 24h
                </span>
              </div>
              <div className={`text-xs font-bold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${(token.volume24h / 1000).toFixed(1)}K
              </div>
            </div>

            <div className={`p-2 rounded-lg ${
              effectiveTheme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-1 mb-0.5">
                <Droplet size={10} className="text-[#56C880]" />
                <span className={`text-[10px] ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Liquidity
                </span>
              </div>
              <div className={`text-xs font-bold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${(token.liquidity / 1000).toFixed(1)}K
              </div>
            </div>

            <div className={`p-2 rounded-lg ${
              effectiveTheme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-1 mb-0.5">
                <DollarSign size={10} className="text-[#56C880]" />
                <span className={`text-[10px] ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Price
                </span>
              </div>
              <div className={`text-xs font-bold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ${token.price.toFixed(6)}
              </div>
            </div>
          </div>

          {/* 하단: 작은 통계 칩들 */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="flex items-center gap-1">
                <Users size={10} className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {token.holders.toLocaleString()}
                </span>
              </div>
              <span className={effectiveTheme === 'dark' ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <div className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                ${(token.marketCap / 1000).toFixed(1)}K
              </div>
              <span className={effectiveTheme === 'dark' ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <div className="flex items-center gap-1">
                <Clock size={10} className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                <span className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {displayTime}{timeUnit} ago
                </span>
              </div>
            </div>

            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              isPositive
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              <span className="text-[10px] font-bold">
                {isPositive ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
