import { motion } from "motion/react";
import { Gamepad2, Trophy, DollarSign, ArrowUpRight, TrendingUp, Flame, ChartPie, Droplets, Bot, Rocket, ChevronRight } from "lucide-react";
import { useTheme } from "../App";
import { TokenData } from "./TokenCard";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import crossAraIcon from "@/assets/a0b26e794d33f97992d7e602cfbe030961352e5b.png";
import { Tooltip } from "./Tooltip";

interface HeroProps {
  onLaunchClick: () => void;
  featuredTokens: TokenData[];
  onSelectToken: (token: TokenData) => void;
  onAgentSkillsClick?: () => void;
}

export function Hero({ onLaunchClick, featuredTokens, onSelectToken, onAgentSkillsClick }: HeroProps) {
  const { effectiveTheme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // CROSS to USD conversion rate (example: 1 CROSS = $0.25)
  const CROSS_TO_USD = 0.25;
  
  // Get top 5 featured games
  const topFeaturedGames = featuredTokens.length > 0
    ? [...featuredTokens].sort((a, b) => b.marketCap - a.marketCap).slice(0, 5)
    : [];

  // Get top trending games
  const trendingGames = featuredTokens.length > 0
    ? [...featuredTokens].sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 4)
    : [];

  // Auto-play carousel
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play effect
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(scrollNext, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  // Calculate total trading volume
  const totalVolume = featuredTokens.reduce((sum, token) => sum + token.volume24h, 0);

  return (
    <section 
      className={`relative overflow-hidden ${ 
        effectiveTheme === 'dark' 
          ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black' 
          : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
      }`}
    >
      {/* 배경 애니메이션 그리드 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, ${effectiveTheme === 'dark' ? '#56C880' : '#56C880'} 1px, transparent 1px),
            linear-gradient(to bottom, ${effectiveTheme === 'dark' ? '#56C880' : '#56C880'} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.1
        }} />
      </div>

      {/* 배경 빛 효과 */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#56C880]/20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#4ADE80]/10 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* 상단 헤더 */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <motion.div 
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#56C880]/20 to-[#4ADE80]/20 border border-[#56C880]/40 mb-2 sm:mb-3 backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Trophy size={14} className="text-[#56C880] sm:w-4 sm:h-4" />
                <span className={`text-xs sm:text-sm font-bold bg-gradient-to-r from-[#56C880] to-[#4ADE80] bg-clip-text text-transparent`}>
                  Featured Tokens
                </span>
              </motion.div>
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${ 
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                From Games to Agents,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#56C880] via-[#4ADE80] to-[#56C880] animate-gradient bg-[length:200%_auto]">
                  Ignite the Market
                </span>
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 items-start">
            {/* Featured Games Carousel - 왼쪽 큰 영역 */}
            {topFeaturedGames.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="overflow-hidden rounded-xl sm:rounded-2xl h-[320px] sm:h-[380px] lg:h-[460px] shadow-2xl shadow-[#56C880]/10" ref={emblaRef}>
                  <div className="flex h-full">
                    {topFeaturedGames.map((game, index) => (
                      <div key={game.id} className="flex-[0_0_100%] min-w-0 h-full">
                        <div
                          onClick={() => onSelectToken(game)}
                          className={`group relative h-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${ 
                            effectiveTheme === 'dark'
                              ? 'bg-gray-900 border-gray-800 hover:border-[#56C880] hover:shadow-2xl hover:shadow-[#56C880]/20'
                              : 'bg-white border-gray-200 hover:border-[#56C880] hover:shadow-2xl hover:shadow-[#56C880]/20'
                          }`}
                        >
                          {/* 게임 배경 이미지 */}
                          <div className="absolute inset-0">
                            {game.gameImage ? (
                              <>
                                <img
                                  src={game.gameImage}
                                  alt={game.gameTitle}
                                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                              </>
                            ) : (
                              <>
                                <div className="w-full h-full bg-gradient-to-br from-[#56C880] via-[#45B570] to-[#4ADE80] flex items-center justify-center">
                                  <img src={crossAraIcon} alt={game.gameTitle} className="w-2/3 h-2/3 object-contain" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                              </>
                            )}
                          </div>

                          {/* Hot Badge */}
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-6 lg:left-6 flex gap-1 sm:gap-1.5 lg:gap-2">
                            <motion.div 
                              className="flex items-center gap-1 lg:gap-1.5 px-2 sm:px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs lg:text-sm font-bold shadow-lg shadow-orange-500/50"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Flame size={10} className="sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                              HOT
                            </motion.div>
                          </div>

                          {/* 게임 정보 */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                            <div className="flex items-end justify-between">
                              <div className="flex-1">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-1.5 lg:mb-2 drop-shadow-lg">
                                  {game.gameTitle}
                                </h2>
                                <p className="text-gray-200 text-[10px] sm:text-xs lg:text-sm mb-2 sm:mb-3 lg:mb-4 line-clamp-2">
                                  {game.description || "Experience the next generation of gaming with blockchain-powered token economy"}
                                </p>
                                
                                {/* Token Info */}
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-4">
                                  <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-4 py-1.5 sm:py-2 lg:py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                    <img src={game.image} alt={game.symbol} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full" />
                                    <span className="font-bold text-white text-[10px] sm:text-xs lg:text-sm">{game.symbol}</span>
                                  </div>
                                  <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-4 py-1.5 sm:py-2 lg:py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                    <span className="text-[10px] sm:text-xs lg:text-sm text-white/70">Price</span>
                                    <img src={crossCoin} alt="CROSS" className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                                    <span className="font-bold text-white text-[10px] sm:text-xs lg:text-sm">{game.price.toFixed(6)}</span>
                                    <span className={`font-bold text-[10px] sm:text-xs lg:text-sm ${ 
                                      game.priceChange24h > 0
                                        ? 'text-emerald-400'
                                        : game.priceChange24h < 0
                                        ? 'text-red-400'
                                        : 'text-gray-400'
                                    }`}>
                                      {game.priceChange24h > 0 ? '↑' : game.priceChange24h < 0 ? '↓' : '—'}
                                      {game.priceChange24h !== 0 && (game.priceChange24h > 0 ? '+' : '')}{game.priceChange24h.toFixed(1)}%
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-4 py-1.5 sm:py-2 lg:py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                    <span className="text-[10px] sm:text-xs lg:text-sm text-white/70">MC</span>
                                    <img src={crossCoin} alt="CROSS" className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5" />
                                    <span className="font-bold text-white text-[10px] sm:text-xs lg:text-sm">{(game.marketCap / 0.25 / 1000).toFixed(2)}K</span>
                                  </div>
                                </div>

                                {/* Stats - removed, now in Token Info section */}
                              </div>

                              {/* Play/Trade Button */}
                              <motion.div
                                className="hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold rounded-lg group-hover:from-[#56C880] group-hover:to-[#4ADE80] group-hover:text-white transition-all duration-300 shadow-xl"
                                whileHover={{ scale: 1.05 }}
                              >
                                Trade Now
                                <ArrowUpRight size={18} />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Trending Games - 오른쪽 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col h-[380px] lg:h-[460px]"
            >
              <div className="flex flex-col justify-between h-full gap-2 lg:gap-3">
              {trendingGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  onClick={() => onSelectToken(game)}
                  className={`group relative py-3 px-4 lg:py-4 lg:px-5 rounded-xl cursor-pointer border transition-all duration-300 flex-1 min-h-0 ${
                    effectiveTheme === 'dark'
                      ? 'bg-gray-900/50 border-gray-800 hover:border-[#56C880] hover:bg-gray-900'
                      : 'bg-white border-gray-200 hover:border-[#56C880] hover:shadow-lg'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center gap-4 lg:gap-5 h-full">
                    {/* Game Image */}
                    <div className="relative w-[64px] h-[64px] lg:w-[68px] lg:h-[68px] rounded-lg overflow-hidden bg-gradient-to-br from-[#56C880] to-[#45B570] flex-shrink-0">
                      {game.gameImage ? (
                        <img src={game.gameImage} alt={game.gameTitle} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <img src={crossAraIcon} alt={game.gameTitle} className="w-full h-full object-contain p-1" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </>
                      )}
                    </div>

                    {/* Game Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`font-bold truncate text-sm lg:text-base ${
                          effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {game.gameTitle}
                        </h4>
                        <span className={`text-[10px] lg:text-xs ${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {game.symbol}
                        </span>
                      </div>
                      
                      {/* Price & Change */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex items-center gap-1">
                          <img src={crossCoin} alt="CROSS" className="w-3 h-3" />
                          <span className={`font-bold text-xs lg:text-sm ${
                            effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {(game.price / 0.25).toFixed(8)}
                          </span>
                        </div>
                        <div className={`flex items-center gap-0.5 text-[10px] font-bold ${
                          game.priceChange24h > 0
                            ? 'text-emerald-400'
                            : game.priceChange24h < 0
                            ? 'text-red-400'
                            : effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {game.priceChange24h > 0 ? '↑' : game.priceChange24h < 0 ? '↓' : '—'}
                          {game.priceChange24h !== 0 && (game.priceChange24h > 0 ? '+' : '')}{game.priceChange24h.toFixed(1)}%
                        </div>
                      </div>
                      
                      {/* MC & Vol */}
                      <div className="flex items-center gap-2 lg:gap-3 text-[10px] lg:text-xs">
                        <div className="flex items-center gap-1">
                          <span className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>MC:</span>
                          <img src={crossCoin} alt="CROSS" className="w-3 h-3" />
                          <span className={`font-bold ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {Math.floor(game.marketCap / CROSS_TO_USD / 1000)}K
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tier Badge */}
                    {(() => {
                      const progress = game.bondingProgress || 0;
                      let tierBadge = null;
                      
                      if (progress < 5) {
                        tierBadge = null;
                      } else if (progress < 20) {
                        tierBadge = { name: 'BRONZE', gradient: 'from-[#CD7F32] via-[#B8733D] to-[#CD7F32]', glow: 'rgba(205, 127, 50, 0.6)', border: 'border-[#CD7F32]/50' };
                      } else if (progress < 50) {
                        tierBadge = { name: 'SILVER', gradient: 'from-[#C0C0C0] via-[#D3D3D3] to-[#C0C0C0]', glow: 'rgba(192, 192, 192, 0.7)', border: 'border-[#C0C0C0]/50' };
                      } else if (progress < 70) {
                        tierBadge = { name: 'GOLD', gradient: 'from-[#FFD700] via-[#FFC700] to-[#FFD700]', glow: 'rgba(255, 215, 0, 0.8)', border: 'border-[#FFD700]/50' };
                      } else if (progress < 80) {
                        tierBadge = { name: 'PLATINUM', gradient: 'from-[#556B2F] via-[#6B8E23] to-[#556B2F]', glow: 'rgba(85, 107, 47, 0.8)', border: 'border-[#85AA3F]/50' };
                      } else if (progress < 100) {
                        tierBadge = { name: 'DIAMOND', gradient: 'from-[#00D9FF] via-[#40E0D0] to-[#00D9FF]', glow: 'rgba(0, 217, 255, 0.9)', border: 'border-[#00D9FF]/50' };
                      } else {
                        tierBadge = { name: 'Hall of Fame', gradient: 'from-[#9333EA] via-[#A855F7] to-[#9333EA]', glow: 'rgba(147, 51, 234, 1)', border: 'border-[#9333EA]/50' };
                      }

                      return tierBadge ? (
                        <motion.div
                          className="flex-shrink-0"
                          animate={{ scale: tierBadge.name === 'DIAMOND' || tierBadge.name === 'Hall of Fame' ? [1, 1.05, 1] : 1 }}
                          transition={{ duration: 2, repeat: tierBadge.name === 'DIAMOND' || tierBadge.name === 'Hall of Fame' ? Infinity : 0 }}
                        >
                          <div 
                            className={`flex items-center justify-center px-2 lg:px-2.5 py-1 lg:py-1.5 rounded-md bg-gradient-to-br ${tierBadge.gradient} font-extrabold text-[9px] lg:text-[10px] tracking-wider shadow-2xl border-2 ${tierBadge.border}`}
                            style={{
                              boxShadow: `0 0 20px ${tierBadge.glow}, 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)`,
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            <span className="text-white drop-shadow-lg whitespace-nowrap">{tierBadge.name}</span>
                          </div>
                        </motion.div>
                      ) : null;
                    })()}
                  </div>
                </motion.div>
              ))}
              </div>
            </motion.div>
          </div>

          {/* Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${ 
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {/* Games Live */}
              <motion.div
                className={`relative p-4 rounded-xl border transition-all duration-300 ${ 
                  effectiveTheme === 'dark'
                    ? 'bg-gray-900/50 border-gray-800 hover:border-[#56C880]/50 shadow-lg shadow-[#56C880]/5'
                    : 'bg-white border-gray-200 hover:border-[#56C880]/50 hover:shadow-md'
                }`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Gamepad2 size={16} className="text-[#56C880]" />
                  <span className={`text-xs ${ 
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Tooltip text="The number of game tokens currently available for trading on the platform. Each game has its own token economy.">
                      Token Live
                    </Tooltip>
                  </span>
                </div>
                <div className={`text-3xl font-bold mb-1 text-right ${
                  effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {featuredTokens.length}
                </div>
              </motion.div>

              {/* Total Market Cap */}
              <motion.div
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-900/50 border-gray-800 hover:border-[#56C880]/50 shadow-lg shadow-[#56C880]/5'
                    : 'bg-white border-gray-200 hover:border-[#56C880]/50 hover:shadow-md'
                }`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ChartPie size={16} className="text-[#56C880]" />
                  <span className={`text-xs ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Tooltip text="The total value of all game tokens in circulation.">
                      Market Cap
                    </Tooltip>
                  </span>
                </div>
                <div className={`flex items-center gap-2 mb-1 justify-end`}>
                  <img src={crossCoin} alt="CROSS" className="w-6 h-6" />
                  <span className={`text-3xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {Math.floor((featuredTokens.reduce((sum, t) => sum + t.marketCap, 0) / CROSS_TO_USD) / 1000000)}M
                  </span>
                </div>
                <div className={`text-xs text-right ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ≈ ${(featuredTokens.reduce((sum, t) => sum + t.marketCap, 0) / 1000000).toFixed(2)}M
                </div>
              </motion.div>

              {/* Total Trading Volume */}
              <motion.div
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-900/50 border-gray-800 hover:border-[#56C880]/50 shadow-lg shadow-[#56C880]/5'
                    : 'bg-white border-gray-200 hover:border-[#56C880]/50 hover:shadow-md'
                }`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-[#56C880]" />
                  <span className={`text-xs ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Tooltip text="The total value of trades executed in the last 24 hours across all game tokens.">
                      24h Volume
                    </Tooltip>
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 mb-1 justify-end flex-wrap`}>
                  <img src={crossCoin} alt="CROSS" className="w-5 h-5 flex-shrink-0" />
                  <span className={`text-2xl md:text-3xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {((totalVolume / CROSS_TO_USD) / 1000).toFixed(1)}K
                  </span>
                </div>
                <div className={`text-xs text-right ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ≈ ${(totalVolume / 1000).toFixed(1)}K
                </div>
              </motion.div>

              {/* Total Liquidity */}
              <motion.div
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-900/50 border-gray-800 hover:border-[#56C880]/50 shadow-lg shadow-[#56C880]/5'
                    : 'bg-white border-gray-200 hover:border-[#56C880]/50 hover:shadow-md'
                }`}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Droplets size={16} className="text-[#56C880]" />
                  <span className={`text-xs ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Tooltip text="The scale of assets supplied to pools for exchange.">
                      Total Liquidity
                    </Tooltip>
                  </span>
                </div>
                <div className={`flex items-center gap-2 mb-1 justify-end`}>
                  <img src={crossCoin} alt="CROSS" className="w-6 h-6" />
                  <span className={`text-3xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {((featuredTokens.reduce((sum, t) => sum + t.liquidity, 0) / CROSS_TO_USD) / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className={`text-xs text-right ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ≈ ${(featuredTokens.reduce((sum, t) => sum + t.liquidity, 0) / 1000000).toFixed(2)}M
                </div>
              </motion.div>
            </div>

            {/* Action Banners */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Agent Skills Banner */}
              <motion.button
                onClick={onAgentSkillsClick}
                className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#14B8A6] hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Bot size={24} className="text-white" />
                  <span className="text-base font-bold text-white">Agent Skills</span>
                  <ChevronRight size={20} className="text-white/90 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              {/* Launch My Agent Banner */}
              <motion.button
                onClick={() => window.open('https://moltarena.crosstoken.io', '_blank')}
                className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#fb923c] hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Rocket size={20} className="text-white" />
                  <span className="text-base font-bold text-white">Launch My Agent</span>
                  <ChevronRight size={20} className="text-white/90 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}