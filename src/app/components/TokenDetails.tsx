import { ArrowLeft, ExternalLink, Users, Droplets, TrendingUp, Flame, Crown, Gamepad2, Link, Plus, MessageSquare, ThumbsUp, ChevronDown, Star, Share2, Copy, Clock, ArrowUp, ArrowDown, X, Medal, Award, Trophy, Sprout, Zap, Gem, Play, Heart, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TradingInterface } from "./TradingInterface";
import { TokenChart } from "./TokenChart";
import type { TokenData } from "../types";
import { useTheme } from "../App";
import { useState, useRef, useEffect } from "react";
import { Tooltip } from "./Tooltip";
import { ShareModal } from "./ShareModal";
import { AnimatedProgressBar } from "./AnimatedProgressBar";
import { useMetaTags } from "../hooks/useMetaTags";
import { CROSS_TO_USD, formatNumber, formatCrossWithUSD } from "../utils/formatters";
import gameTokenIcon from "figma:asset/ed5cd97fee00ddf5d6d7491bd26eeeb9d3dd3d1e.png";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import crossAraIcon from "@/assets/a0b26e794d33f97992d7e602cfbe030961352e5b.png";
import { LiquidityModal } from "./LiquidityModal";

interface TokenDetailsProps {
  token: TokenData;
  onBack: () => void;
}

export function TokenDetails({ token, onBack }: TokenDetailsProps) {
  const { effectiveTheme } = useTheme();
  const isPositive = token.priceChange24h >= 0;
  const totalSupply = 1000000000; // 1B tokens
  const circulatingSupply = token.marketCap / token.price;
  const [selectedTrade, setSelectedTrade] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const tradingRef = useRef<HTMLDivElement>(null);
  const [autoExpand, setAutoExpand] = useState(false);
  const [isTradingVisible, setIsTradingVisible] = useState(false);
  const [hasPassedTrading, setHasPassedTrading] = useState(false);
  const [showMyTrades, setShowMyTrades] = useState(false);
  const [visibleTradesCount, setVisibleTradesCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const tradesContainerRef = useRef<HTMLDivElement>(null);
  const [showLiquidityModal, setShowLiquidityModal] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // User's wallet address for filtering
  const MY_WALLET_ADDRESS = "0xB903...16b6";
  
  // Calculate bonding progress (graduated at 100%)
  const bondingProgress = token.bondingProgress || 0;
  
  // Calculate remaining tokens in the pool
  // Assuming 800M tokens (80% of total supply) are allocated to the bonding pool
  const bondingPoolTotal = 800000000; // 800M tokens
  const remainingTokens = Math.round(bondingPoolTotal * (100 - bondingProgress) / 100);

  // Update meta tags for social sharing
  useMetaTags({
    title: `${token.gameTitle} (${token.symbol}) - Forge`,
    description: `${token.gameTitle} on Forge. Market Cap: ${((token.marketCap / CROSS_TO_USD) / 1000000).toFixed(2)}M CROSS • Price: ${(token.price / CROSS_TO_USD).toFixed(6)} CROSS • 24h Change: ${token.priceChange24h >= 0 ? '+' : ''}${token.priceChange24h.toFixed(2)}%`,
    image: token.gameImage || token.image,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    type: 'website',
  });

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleTradesCount(10);
  }, [showMyTrades]);

  // Scroll to trading interface
  const scrollToTrading = () => {
    setAutoExpand(true);
    if (tradingRef.current) {
      const yOffset = -80; // Offset for header
      const y = tradingRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Check if trading interface is visible using Intersection Observer
  useEffect(() => {
    if (!tradingRef.current) return;

    const handleScroll = () => {
      if (!tradingRef.current) return;
      
      const rect = tradingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if user has scrolled past the trading interface
      // If the top of trading interface is above the viewport, user has passed it
      if (rect.top < windowHeight) {
        setHasPassedTrading(true);
      } else {
        setHasPassedTrading(false);
      }
      
      // Check if trading interface is currently visible
      setIsTradingVisible(rect.top < windowHeight && rect.bottom > 0);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mock top holders
  const mockHolders = [
    { address: "0Bx4...qx14", fullAddress: "0Bx742d8fa829ce3c3d99f96ce8b3e48c5b3cqx14", percentage: 8.97 },
    { address: "ABy2...t3Ks", fullAddress: "ABy2f8fa829ce3c3d99f96ce8b3e48c5b3ct3Ks", percentage: 3.41 },
    { address: "7xF9...mK2p", fullAddress: "7xF9d8fa829ce3c3d99f96ce8b3e48c5b3cmK2p", percentage: 2.87 },
    { address: "Qw5t...Lp9z", fullAddress: "Qw5t8fa829ce3c3d99f96ce8b3e48c5b3cLp9z", percentage: 2.54 },
    { address: "3nH8...Rt6v", fullAddress: "3nH8fa829ce3c3d99f96ce8b3e48c5b3cRt6v", percentage: 2.13 },
    { address: "9kJ2...Yx4b", fullAddress: "9kJ28fa829ce3c3d99f96ce8b3e48c5b3cYx4b", percentage: 1.95 },
    { address: "5mP7...Dn8c", fullAddress: "5mP7fa829ce3c3d99f96ce8b3e48c5b3cDn8c", percentage: 1.76 },
    { address: "8gL4...Wq3s", fullAddress: "8gL48fa829ce3c3d99f96ce8b3e48c5b3cWq3s", percentage: 1.52 },
    { address: "2vB6...Zt7n", fullAddress: "2vB6fa829ce3c3d99f96ce8b3e48c5b3cZt7n", percentage: 1.38 },
    { address: "4rC1...Hm5k", fullAddress: "4rC1fa829ce3c3d99f96ce8b3e48c5b3cHm5k", percentage: 1.21 },
  ];

  // Mock trades data
  const mockTrades = [
    { id: 1, type: "Buy", price: "0.0001", amount: "138.2535 TOTO", value: "0.0182 CROSS", trader: "0xB903...16b6", fullAddress: "0xB903f8fa829ce3c3d99f96ce8b3e48c5b3c16b6", txHash: "0xabc123def456", time: "1d ago" },
    { id: 2, type: "Buy", price: "0.0001", amount: "11.4345 TOTO", value: "0.0015 CROSS", trader: "0xB903...16b6", fullAddress: "0xB903f8fa829ce3c3d99f96ce8b3e48c5b3c16b6", txHash: "0xdef789abc012", time: "1d ago" },
    { id: 3, type: "Sell", price: "0.0002", amount: "250.5000 TOTO", value: "0.0501 CROSS", trader: "0x742d...9c4a", fullAddress: "0x742d8fa829ce3c3d99f96ce8b3e48c5b3c9c4a", txHash: "0x123abc456def", time: "2d ago" },
    { id: 4, type: "Buy", price: "0.0001", amount: "75.3210 TOTO", value: "0.0075 CROSS", trader: "0x1A2b...3C4d", fullAddress: "0x1A2bf8fa829ce3c3d99f96ce8b3e48c5b3c3C4d", txHash: "0x456def789abc", time: "3d ago" },
    { id: 5, type: "Sell", price: "0.0003", amount: "500.0000 TOTO", value: "0.1500 CROSS", trader: "0x5E6f...7G8h", fullAddress: "0x5E6ff8fa829ce3c3d99f96ce8b3e48c5b3c7G8h", txHash: "0x789abc012def", time: "3d ago" },
    { id: 6, type: "Buy", price: "0.0001", amount: "92.1234 TOTO", value: "0.0092 CROSS", trader: "0x9I0j...1K2l", fullAddress: "0x9I0jf8fa829ce3c3d99f96ce8b3e48c5b3c1K2l", txHash: "0xabc012def456", time: "4d ago" },
    { id: 7, type: "Buy", price: "0.0002", amount: "180.4567 TOTO", value: "0.0361 CROSS", trader: "0x3M4n...5O6p", fullAddress: "0x3M4nf8fa829ce3c3d99f96ce8b3e48c5b3c5O6p", txHash: "0xdef456abc789", time: "5d ago" },
    { id: 8, type: "Sell", price: "0.0001", amount: "45.7890 TOTO", value: "0.0046 CROSS", trader: "0x7Q8r...9S0t", fullAddress: "0x7Q8rf8fa829ce3c3d99f96ce8b3e48c5b3c9S0t", txHash: "0x123def789abc", time: "5d ago" },
    { id: 9, type: "Buy", price: "0.0001", amount: "220.5678 TOTO", value: "0.0221 CROSS", trader: "0x4U5v...6W7x", fullAddress: "0x4U5vf8fa829ce3c3d99f96ce8b3e48c5b3c6W7x", txHash: "0x456abc012def", time: "6d ago" },
    { id: 10, type: "Sell", price: "0.0002", amount: "350.1234 TOTO", value: "0.0700 CROSS", trader: "0x8Y9z...0A1b", fullAddress: "0x8Y9zf8fa829ce3c3d99f96ce8b3e48c5b3c0A1b", txHash: "0x789def012abc", time: "6d ago" },
    { id: 11, type: "Buy", price: "0.0001", amount: "65.4321 TOTO", value: "0.0065 CROSS", trader: "0x2C3d...4E5f", fullAddress: "0x2C3df8fa829ce3c3d99f96ce8b3e48c5b3c4E5f", txHash: "0xabc456def789", time: "7d ago" },
    { id: 12, type: "Buy", price: "0.0003", amount: "450.9876 TOTO", value: "0.1353 CROSS", trader: "0x6G7h...8I9j", fullAddress: "0x6G7hf8fa829ce3c3d99f96ce8b3e48c5b3c8I9j", txHash: "0xdef789012abc", time: "7d ago" },
    { id: 13, type: "Sell", price: "0.0001", amount: "125.6543 TOTO", value: "0.0126 CROSS", trader: "0x0K1l...2M3n", fullAddress: "0x0K1lf8fa829ce3c3d99f96ce8b3e48c5b3c2M3n", txHash: "0x123abc789def", time: "8d ago" },
    { id: 14, type: "Buy", price: "0.0002", amount: "300.2468 TOTO", value: "0.0600 CROSS", trader: "0x4O5p...6Q7r", fullAddress: "0x4O5pf8fa829ce3c3d99f96ce8b3e48c5b3c6Q7r", txHash: "0x456def012abc", time: "8d ago" },
    { id: 15, type: "Sell", price: "0.0001", amount: "88.3579 TOTO", value: "0.0088 CROSS", trader: "0x8S9t...0U1v", fullAddress: "0x8S9tf8fa829ce3c3d99f96ce8b3e48c5b3c0U1v", txHash: "0x789abc456def", time: "9d ago" },
    { id: 16, type: "Buy", price: "0.0002", amount: "410.7531 TOTO", value: "0.0822 CROSS", trader: "0x2W3x...4Y5z", fullAddress: "0x2W3xf8fa829ce3c3d99f96ce8b3e48c5b3c4Y5z", txHash: "0xabc789def012", time: "9d ago" },
    { id: 17, type: "Buy", price: "0.0001", amount: "156.8642 TOTO", value: "0.0157 CROSS", trader: "0x6A7b...8C9d", fullAddress: "0x6A7bf8fa829ce3c3d99f96ce8b3e48c5b3c8C9d", txHash: "0xdef012abc456", time: "10d ago" },
    { id: 18, type: "Sell", price: "0.0003", amount: "580.9753 TOTO", value: "0.1743 CROSS", trader: "0x0E1f...2G3h", fullAddress: "0x0E1ff8fa829ce3c3d99f96ce8b3e48c5b3c2G3h", txHash: "0x123def456abc", time: "10d ago" },
    { id: 19, type: "Buy", price: "0.0001", amount: "95.3210 TOTO", value: "0.0095 CROSS", trader: "0x4I5j...6K7l", fullAddress: "0x4I5jf8fa829ce3c3d99f96ce8b3e48c5b3c6K7l", txHash: "0x456abc789def", time: "11d ago" },
    { id: 20, type: "Sell", price: "0.0002", amount: "275.4321 TOTO", value: "0.0551 CROSS", trader: "0x8M9n...0O1p", fullAddress: "0x8M9nf8fa829ce3c3d99f96ce8b3e48c5b3c0O1p", txHash: "0x789def456abc", time: "11d ago" },
  ];

  // Get rank icon component
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy size={16} className="text-yellow-400" />;
      case 1:
        return <Medal size={16} className="text-gray-400" />;
      case 2:
        return <Award size={16} className="text-amber-600" />;
      case 3:
        return <span className={`text-xs font-bold w-4 text-center ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>4</span>;
      default:
        return <span className={`text-xs font-bold w-4 text-center ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{index + 1}</span>;
    }
  };

  return (
    <div className={`min-h-screen ${effectiveTheme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-4 max-w-[1600px]">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 items-start">
          {/* Left: Chart & Info */}
          <div className="flex flex-col gap-4">
            {/* Compact Header */}
            <Card style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-between gap-3 md:gap-4">
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    {/* Game Icon */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#56C880] to-[#45B570] flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img src={token.category === "AI Agent" ? crossAraIcon : gameTokenIcon} alt={token.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Title & Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className={`text-base md:text-lg font-bold truncate ${
                          effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {token.gameTitle}{' '}
                          <span className={effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                            | {token.symbol}
                          </span>
                        </h1>
                        {/* Category Icon */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          effectiveTheme === 'dark' ? 'bg-[#56C880]/10' : 'bg-[#56C880]/10'
                        }`}>
                          {token.category === "AI Agent" ? (
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* AI Text */}
                              <text x="20" y="25" textAnchor="middle" fill="#56C880" fontSize="18" fontWeight="900" fontFamily="Arial, sans-serif">AI</text>
                            </svg>
                          ) : (
                            <Gamepad2 className="text-[#56C880]" size={24} />
                          )}
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 md:gap-2 text-xs flex-wrap ${
                        effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        <button 
                          onClick={() => window.open('https://explorer.crosstoken.io/612055/address/0x742d8fa829ce3c3d99f96ce8b3e48c5b3c9c4a', '_blank', 'noopener,noreferrer')}
                          className="flex items-center gap-1 md:gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <span className="font-mono text-xs">0x742d...9c4a</span>
                          <ExternalLink size={10} className={`${
                            effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                          }`} />
                        </button>
                        <span className="text-gray-600 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1 hidden sm:flex">
                          <Clock size={12} />
                          <span className="text-xs">22h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1.5 md:gap-2">
                    <Button 
                      variant="outline"
                      className={`px-2 md:px-4 py-2 h-9 text-sm rounded-md ${
                        effectiveTheme === 'dark'
                          ? 'bg-gray-950 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setShowShareModal(true)}
                    >
                      <Share2 size={14} className="md:mr-1.5" />
                      <span className="hidden md:inline">Share</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`px-2 md:px-2.5 py-2 h-9 rounded-md transition-colors ${
                        isFavorite
                          ? 'border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500'
                          : effectiveTheme === 'dark'
                          ? 'bg-gray-950 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Star 
                        size={16} 
                        className={isFavorite ? 'text-yellow-500 fill-yellow-500' : ''} 
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <TokenChart token={token} />

            {/* Token Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Card className="p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
                <p className={`text-xs leading-none mb-1.5 ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <Tooltip text="The total market value of the token's circulating supply. Calculated as Current Price × Circulating Supply.">
                    Market Cap
                  </Tooltip>
                </p>
                <div className="flex items-center justify-end gap-1.5">
                  <img src={crossCoin} alt="CROSS" className="w-6 h-6 md:w-7 md:h-7" />
                  <span className={`text-2xl md:text-3xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {((token.marketCap / CROSS_TO_USD) / 1000000).toFixed(0)}M
                  </span>
                </div>
                <p className={`text-xs text-right ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ≈ ${(token.marketCap / 1000000).toFixed(2)}M
                </p>
              </Card>

              <Card className="p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
                <p className={`text-xs leading-none mb-1.5 ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <Tooltip text="The total dollar value of all transactions for this token within the last 24 hours.">
                    24h Volume
                  </Tooltip>
                </p>
                <div className="flex items-center justify-end gap-1.5 mb-0.5">
                  <img src={crossCoin} alt="CROSS" className="w-6 h-6 md:w-7 md:h-7" />
                  <span className={`text-2xl md:text-3xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {((token.volume24h / CROSS_TO_USD) / 1000).toFixed(1)}K
                  </span>
                </div>
                <p className={`text-xs text-right ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ≈ ${(token.volume24h / 1000).toFixed(1)}K
                </p>
              </Card>

              <Card className="p-4 col-span-2 md:col-span-1" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
                <p className={`text-xs leading-none mb-1.5 ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <Tooltip text="The total amount of tokens that have been created, minus any tokens that have been burned.">
                    Total Supply
                  </Tooltip>
                </p>
                <div className="flex items-center justify-end gap-1.5 mb-0.5">
                  <img src={gameTokenIcon} alt={token.symbol} className="w-6 h-6 md:w-7 md:h-7 rounded-full" />
                  <span className={`text-2xl md:text-3xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {totalSupply.toLocaleString()}
                  </span>
                </div>
                <p className={`text-xs text-right ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  ≈ ${((totalSupply * token.price) / 1000000).toFixed(2)}M
                </p>
              </Card>
            </div>

            {/* Game Information Section */}
            <Card style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {token.category === "AI Agent" ? (
                    <div className="w-10 h-10 rounded-lg bg-[#56C880]/10 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* AI Text */}
                        <text x="20" y="25" textAnchor="middle" fill="#56C880" fontSize="18" fontWeight="900" fontFamily="Arial, sans-serif">AI</text>
                      </svg>
                    </div>
                  ) : (
                    <Gamepad2 className="text-[#56C880]" size={40} />
                  )}
                  <h2 className={`text-xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {token.category === "AI Agent" ? "Token Information" : "Game Information"}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <img 
                      src={token.category === "AI Agent" ? crossAraIcon : token.image}
                      alt="Game Icon"
                      className={`w-20 h-20 rounded-lg object-cover border-2 ${
                        effectiveTheme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${
                          effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {token.gameTitle}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-1 text-xs ${
                            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            <Play size={14} />
                            <span>169,516</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className={`text-sm transition-all duration-300 ${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        } ${!isDescriptionExpanded ? 'line-clamp-2' : ''}`}>
                          Experience the ultimate gaming adventure with {token.name}! This revolutionary game token powers an immersive gaming ecosystem where players can earn, trade, and participate in a vibrant community.
                        </p>
                        <button
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className={`text-sm font-medium mt-1 transition-colors ${
                            effectiveTheme === 'dark' 
                              ? 'text-[#56C880] hover:text-[#4ADE80]' 
                              : 'text-[#56C880] hover:text-[#45B570]'
                          }`}
                        >
                          {isDescriptionExpanded ? 'Show Less' : 'More'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {token.category !== "AI Agent" && (
                    bondingProgress === 100 ? (
                      <div className="grid grid-cols-2 gap-3">
                        <Button className="w-full bg-[#56C880] hover:bg-[#45B570] text-white font-semibold">
                          <Gamepad2 size={16} className="mr-2" />
                          Play Now
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full font-semibold border-2 text-white hover:opacity-90"
                          style={{
                            background: effectiveTheme === 'dark'
                              ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.85), rgba(147, 51, 234, 0.75), rgba(147, 51, 234, 0.65))'
                              : 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(147, 51, 234, 0.85), rgba(126, 34, 206, 0.8))',
                            borderColor: effectiveTheme === 'dark' ? 'rgba(147, 51, 234, 0.8)' : 'rgba(147, 51, 234, 0.9)',
                            boxShadow: effectiveTheme === 'dark'
                              ? '0 0 20px rgba(147, 51, 234, 0.4)'
                              : '0 0 15px rgba(147, 51, 234, 0.3)'
                          }}
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Go to Market
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full bg-[#56C880] hover:bg-[#45B570] text-white font-semibold">
                        <Gamepad2 size={16} className="mr-2" />
                        Play Now
                      </Button>
                    )
                  )}
                  
                  {token.category === "AI Agent" && bondingProgress === 100 && (
                    <Button 
                      variant="outline"
                      className="w-full font-semibold border-2 text-white hover:opacity-90"
                      style={{
                        background: effectiveTheme === 'dark'
                          ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.85), rgba(147, 51, 234, 0.75), rgba(147, 51, 234, 0.65))'
                          : 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(147, 51, 234, 0.85), rgba(126, 34, 206, 0.8))',
                        borderColor: effectiveTheme === 'dark' ? 'rgba(147, 51, 234, 0.8)' : 'rgba(147, 51, 234, 0.9)',
                        boxShadow: effectiveTheme === 'dark'
                          ? '0 0 20px rgba(147, 51, 234, 0.4)'
                          : '0 0 15px rgba(147, 51, 234, 0.3)'
                      }}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Go to Market
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Trading Interface - Mobile Only (appears before Trade History) */}
            <div className="lg:hidden">
              <TradingInterface 
                token={token} 
                ref={tradingRef} 
                scrollToTrading={!hasPassedTrading ? scrollToTrading : undefined}
                autoExpand={autoExpand}
              />
            </div>

            {/* Trades Section */}
            <Card style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-bold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Trade History
                  </h2>
                  <Button
                    onClick={() => setShowMyTrades(!showMyTrades)}
                    className={`px-3 py-1.5 h-auto rounded-md text-sm font-semibold transition-all ${
                      showMyTrades
                        ? 'bg-[#56C880] hover:bg-[#45B570] text-white'
                        : effectiveTheme === 'dark'
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                    }`}
                  >
                    My
                  </Button>
                </div>

                {/* Table Wrapper with Horizontal Scroll */}
                <div className="overflow-x-auto">
                  {/* Table Header */}
                  <div className={`grid grid-cols-[0.8fr_2fr_1.5fr_1.5fr_1fr] gap-3 pb-3 mb-3 border-b min-w-[600px] ${
                    effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <div className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Type
                    </div>
                    <div className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      From
                    </div>
                    <div className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      To
                    </div>
                    <div className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Trader
                    </div>
                    <div className={`text-sm text-right ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Time
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div ref={tradesContainerRef}>
                    {mockTrades
                      .filter(trade => !showMyTrades || trade.trader === MY_WALLET_ADDRESS)
                      .slice(0, visibleTradesCount)
                      .map((trade) => (
                      <div 
                        key={trade.id}
                        onClick={() => setSelectedTrade(trade)}
                        className={`grid grid-cols-[0.8fr_2fr_1.5fr_1.5fr_1fr] gap-3 items-center py-3 border-b cursor-pointer transition-colors min-w-[600px] ${
                          effectiveTheme === 'dark' 
                            ? 'border-gray-800 hover:bg-gray-900/50' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {/* Type */}
                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${
                            trade.type === 'Buy' 
                              ? 'bg-[#56C880]/10 text-[#56C880]' 
                              : 'bg-red-500/10 text-red-500'
                          }`}>
                            {trade.type.toUpperCase()}
                          </span>
                          {trade.trader === MY_WALLET_ADDRESS && (
                            <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                              effectiveTheme === 'dark'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-blue-500/15 text-blue-600'
                            }`}>
                              My
                            </span>
                          )}
                        </div>

                        {/* From (Amount) */}
                        <div className="flex items-center gap-1.5">
                          <img src={gameTokenIcon} alt={token.symbol} className="w-5 h-5 rounded-full flex-shrink-0" />
                          <span className={`text-sm truncate ${
                            effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {parseFloat(trade.amount.split(' ')[0]).toFixed(8)}
                          </span>
                        </div>

                        {/* To (Value) */}
                        <div className="flex items-center gap-1.5">
                          <img src={crossCoin} alt="CROSS" className="w-5 h-5 flex-shrink-0" />
                          <span className={`text-sm truncate ${
                            effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {parseFloat(trade.value.split(' ')[0]).toFixed(8)}
                          </span>
                        </div>

                        {/* Trader */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://explorer.crosstoken.io/612055/address/${trade.fullAddress}`, '_blank', 'noopener,noreferrer');
                          }}
                          className={`flex items-center gap-1.5 text-sm font-mono transition-colors ${
                            effectiveTheme === 'dark' ? 'text-gray-400 hover:text-[#56C880]' : 'text-gray-600 hover:text-[#56C880]'
                          }`}
                          title="View address on Explorer"
                        >
                          <span>{trade.trader}</span>
                          <ExternalLink size={12} className="flex-shrink-0" />
                        </button>

                        {/* Time */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://explorer.crosstoken.io/612055/tx/${trade.txHash}`, '_blank', 'noopener,noreferrer');
                          }}
                          className={`flex items-center gap-1.5 text-sm text-right justify-end transition-colors ${
                            effectiveTheme === 'dark' ? 'text-gray-400 hover:text-[#56C880]' : 'text-gray-500 hover:text-[#56C880]'
                          }`}
                          title="View transaction on Explorer"
                        >
                          <span>{trade.time}</span>
                          <ExternalLink size={12} className="flex-shrink-0" />
                        </button>
                      </div>
                    ))}
                    {visibleTradesCount < mockTrades.filter(trade => !showMyTrades || trade.trader === MY_WALLET_ADDRESS).length && (
                      <div className="text-center py-3">
                        <Button
                          onClick={() => {
                            setIsLoadingMore(true);
                            setTimeout(() => {
                              setVisibleTradesCount(visibleTradesCount + 10);
                              setIsLoadingMore(false);
                            }, 500);
                          }}
                          className={`px-3 py-1.5 h-auto rounded-md text-sm font-semibold transition-all ${
                            effectiveTheme === 'dark'
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                          }`}
                        >
                          {isLoadingMore ? 'Loading...' : 'Load More'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right: Trading and Bonding Info */}
          <div className="lg:sticky lg:top-20 flex flex-col gap-4">
            <div className="hidden lg:block">
              <TradingInterface 
                token={token} 
                ref={tradingRef} 
                scrollToTrading={!hasPassedTrading ? scrollToTrading : undefined}
                autoExpand={autoExpand}
              />
            </div>

            {/* Liquidity Pool Section - Only for Graduated Tokens */}
            {bondingProgress >= 100 && (
              <Card className="flex flex-col" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center -space-x-1">
                        <img 
                          src={token.category === "AI Agent" ? crossAraIcon : token.image} 
                          alt={token.symbol} 
                          className={`w-6 h-6 rounded-full border-2 z-10 ${
                            effectiveTheme === 'dark' ? 'border-gray-800' : 'border-white'
                          }`} 
                        />
                        <img 
                          src={crossCoin} 
                          alt="CROSS" 
                          className={`w-6 h-6 rounded-full border-2 ${
                            effectiveTheme === 'dark' ? 'border-gray-800' : 'border-white'
                          }`}
                        />
                      </div>
                      <span className={`font-semibold ${
                        effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {token.symbol}-CROSS Pool
                      </span>
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-[#56C880]/20 text-[#56C880] border border-[#56C880]/30">
                        Deposited
                      </span>
                    </div>
                  </div>
                  
                  <div className={`rounded-lg p-3 mb-3 ${
                    effectiveTheme === 'dark' 
                      ? 'bg-[#56C880]/10 border border-[#56C880]/20' 
                      : 'bg-[#56C880]/5 border border-[#56C880]/10'
                  }`}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Total Value Locked</span>
                      <div className="flex items-center gap-1">
                        <img src={crossCoin} alt="CROSS" className="w-4 h-4" />
                        <span className={`font-semibold ${
                          effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {formatNumber(token.marketCap * 0.15)}
                        </span>
                        <span className="text-gray-500 text-xs">
                          (${formatNumber(token.marketCap * 0.15 * CROSS_TO_USD)})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Your Position</span>
                      <span className={`font-semibold ${
                        effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        0.00 LP
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setShowLiquidityModal(true)}
                    className="w-full bg-gradient-to-r from-[#56C880] to-[#45B570] hover:from-[#45B570] hover:to-[#56C880] text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-lg shadow-[#56C880]/20 h-14"
                  >
                    <Droplets size={16} className="mr-2" />
                    Deposit Liquidity
                  </Button>
                </div>
              </Card>
            )}

            {/* Bonding Curve Progress */}
            <Card className="flex flex-col" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      Hall of Fame Progress
                    </span>
                    <Tooltip text={
                      <div className="text-left">
                        <div className="font-semibold mb-2">Grades are calculated as follows:</div>
                        <div className="space-y-1">
                          <div>• Bronze: 50K Game Token Sold</div>
                          <div>• Silver: 200M Game Token Sold</div>
                          <div>• Gold: 500M Game Token Sold</div>
                          <div>• Platinum: 700M Game Token Sold</div>
                          <div>• Diamond: 800M Game Token Sold</div>
                        </div>
                      </div>
                    }>
                      <Info size={16} className={`cursor-help ${
                        effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </Tooltip>
                  </div>
                  <span className={`font-bold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {bondingProgress.toFixed(1)}%
                  </span>
                </div>
                {bondingProgress < 100 && (
                <AnimatedProgressBar 
                  progress={bondingProgress} 
                  remainingTokens={remainingTokens}
                  tokenSymbol={token.symbol}
                />
                )}
                
                {/* BRONZE Tier: 5%~19% */}
                {bondingProgress >= 5 && bondingProgress < 20 && (
                  <div className={`relative border-2 rounded-xl p-4 text-center flex items-center justify-center overflow-hidden mt-3`} 
                    style={{ 
                      background: effectiveTheme === 'dark'
                        ? 'linear-gradient(135deg, rgba(205, 127, 50, 0.3), rgba(205, 127, 50, 0.25), rgba(205, 127, 50, 0.2))'
                        : 'linear-gradient(135deg, rgba(180, 100, 30, 0.35), rgba(190, 110, 40, 0.3), rgba(200, 120, 50, 0.25))',
                      borderColor: effectiveTheme === 'dark' ? 'rgba(205, 127, 50, 0.7)' : 'rgba(180, 100, 30, 0.8)',
                      boxShadow: effectiveTheme === 'dark' 
                        ? '0 0 25px rgba(205, 127, 50, 0.4), inset 0 0 20px rgba(205, 127, 50, 0.15)' 
                        : '0 0 20px rgba(180, 100, 30, 0.35), inset 0 0 18px rgba(190, 110, 40, 0.2)'
                  }}>
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" 
                         style={{ 
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 3s infinite linear'
                         }} />
                    <span className={`relative font-bold text-lg flex items-center gap-2`} 
                      style={{
                        color: effectiveTheme === 'dark' ? '#CD7F32' : '#8B4513',
                        textShadow: effectiveTheme === 'dark' 
                          ? '0 0 12px rgba(205, 127, 50, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)' 
                          : '0 0 10px rgba(205, 127, 50, 0.5), 0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      BRONZE
                    </span>
                  </div>
                )}
                
                {/* SILVER Tier: 20%~49% */}
                {bondingProgress >= 20 && bondingProgress < 50 && (
                  <div className={`relative border-2 rounded-xl p-4 text-center flex items-center justify-center overflow-hidden mt-3`}
                    style={{ 
                      background: effectiveTheme === 'dark'
                        ? 'linear-gradient(135deg, rgba(192, 192, 192, 0.3), rgba(192, 192, 192, 0.25), rgba(192, 192, 192, 0.2))'
                        : 'linear-gradient(135deg, rgba(160, 160, 160, 0.35), rgba(170, 170, 170, 0.3), rgba(180, 180, 180, 0.25))',
                      borderColor: effectiveTheme === 'dark' ? 'rgba(192, 192, 192, 0.7)' : 'rgba(140, 140, 140, 0.8)',
                      boxShadow: effectiveTheme === 'dark' 
                        ? '0 0 25px rgba(192, 192, 192, 0.4), inset 0 0 20px rgba(192, 192, 192, 0.15)' 
                        : '0 0 20px rgba(160, 160, 160, 0.35), inset 0 0 18px rgba(170, 170, 170, 0.2)'
                  }}>
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" 
                         style={{ 
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 3s infinite linear'
                         }} />
                    <span className={`relative font-bold text-lg flex items-center gap-2`}
                      style={{
                        color: effectiveTheme === 'dark' ? '#E8E8E8' : '#505050',
                        textShadow: effectiveTheme === 'dark' 
                          ? '0 0 12px rgba(192, 192, 192, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)' 
                          : '0 0 10px rgba(192, 192, 192, 0.5), 0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      SILVER
                    </span>
                  </div>
                )}
                
                {/* GOLD Tier: 50%~69% */}
                {bondingProgress >= 50 && bondingProgress < 70 && (
                  <div className={`relative border-2 rounded-xl p-4 text-center flex items-center justify-center overflow-hidden mt-3`}
                    style={{ 
                      background: effectiveTheme === 'dark'
                        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.25), rgba(255, 215, 0, 0.2))'
                        : 'linear-gradient(135deg, rgba(220, 180, 0, 0.35), rgba(230, 190, 0, 0.3), rgba(240, 200, 0, 0.25))',
                      borderColor: effectiveTheme === 'dark' ? 'rgba(255, 215, 0, 0.7)' : 'rgba(200, 160, 0, 0.8)',
                      boxShadow: effectiveTheme === 'dark' 
                        ? '0 0 30px rgba(255, 215, 0, 0.45), inset 0 0 22px rgba(255, 215, 0, 0.15)' 
                        : '0 0 25px rgba(220, 180, 0, 0.4), inset 0 0 20px rgba(230, 190, 0, 0.2)'
                  }}>
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" 
                         style={{ 
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 3s infinite linear'
                         }} />
                    <span className={`relative font-bold text-lg flex items-center gap-2`}
                      style={{
                        color: effectiveTheme === 'dark' ? '#FFFACD' : '#996A00',
                        textShadow: effectiveTheme === 'dark' 
                          ? '0 0 12px rgba(255, 215, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)' 
                          : '0 0 10px rgba(255, 215, 0, 0.5), 0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      GOLD
                    </span>
                  </div>
                )}
                
                {/* PLATINUM Tier: 70%~80% 미만 */}
                {bondingProgress >= 70 && bondingProgress < 80 && (
                  <div className={`relative border-2 rounded-xl p-4 text-center flex items-center justify-center overflow-hidden mt-3`}
                    style={{ 
                      background: effectiveTheme === 'dark'
                        ? 'linear-gradient(135deg, rgba(85, 107, 47, 0.35), rgba(85, 107, 47, 0.3), rgba(85, 107, 47, 0.25))'
                        : 'linear-gradient(135deg, rgba(100, 130, 60, 0.4), rgba(110, 140, 70, 0.35), rgba(120, 150, 80, 0.3))',
                      borderColor: effectiveTheme === 'dark' ? 'rgba(85, 107, 47, 0.7)' : 'rgba(70, 90, 40, 0.8)',
                      boxShadow: effectiveTheme === 'dark' 
                        ? '0 0 32px rgba(85, 107, 47, 0.45), inset 0 0 24px rgba(85, 107, 47, 0.15)' 
                        : '0 0 28px rgba(100, 130, 60, 0.4), inset 0 0 22px rgba(110, 140, 70, 0.2)'
                  }}>
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" 
                         style={{ 
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 3s infinite linear'
                         }} />
                    <span className={`relative font-bold text-lg flex items-center gap-2`}
                      style={{
                        color: effectiveTheme === 'dark' ? '#C8D9A8' : '#3A4A1F',
                        textShadow: effectiveTheme === 'dark' 
                          ? '0 0 12px rgba(85, 107, 47, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)' 
                          : '0 0 10px rgba(85, 107, 47, 0.5), 0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      PLATINUM
                    </span>
                  </div>
                )}
                
                {/* DIAMOND Tier: 80%~99% */}
                {bondingProgress >= 80 && bondingProgress < 100 && (
                  <div className={`relative border-2 rounded-xl p-4 text-center flex items-center justify-center overflow-hidden mt-3`}
                    style={{ 
                      background: effectiveTheme === 'dark'
                        ? 'linear-gradient(135deg, rgba(185, 242, 255, 0.25), rgba(185, 242, 255, 0.2), rgba(185, 242, 255, 0.15))'
                        : 'linear-gradient(135deg, rgba(100, 200, 230, 0.3), rgba(120, 210, 240, 0.25), rgba(140, 220, 250, 0.2))',
                      borderColor: effectiveTheme === 'dark' ? 'rgba(185, 242, 255, 0.6)' : 'rgba(100, 200, 230, 0.7)',
                      boxShadow: effectiveTheme === 'dark' 
                        ? '0 0 35px rgba(185, 242, 255, 0.4), inset 0 0 25px rgba(185, 242, 255, 0.15)' 
                        : '0 0 25px rgba(100, 200, 230, 0.35), inset 0 0 20px rgba(120, 210, 240, 0.2)'
                  }}>
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                         style={{ 
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 3s infinite linear'
                         }} />
                    <span className={`relative font-bold text-lg flex items-center gap-2`}
                      style={{
                        color: effectiveTheme === 'dark' ? '#E0F7FF' : '#0D5F7F',
                        textShadow: effectiveTheme === 'dark' 
                          ? '0 0 12px rgba(185, 242, 255, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)' 
                          : '0 0 10px rgba(100, 200, 230, 0.5), 0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      DIAMOND
                    </span>
                  </div>
                )}
                
                {/* HOF Tier: 100% */}
                {bondingProgress >= 100 && (
                  <div className={`relative border-2 rounded-xl p-4 text-center flex items-center justify-center overflow-hidden mt-3`}
                    style={{ 
                      background: effectiveTheme === 'dark'
                        ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.35), rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0.25))'
                        : 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(147, 51, 234, 0.35), rgba(126, 34, 206, 0.3))',
                      borderColor: effectiveTheme === 'dark' ? 'rgba(147, 51, 234, 0.8)' : 'rgba(147, 51, 234, 0.9)',
                      boxShadow: effectiveTheme === 'dark' 
                        ? '0 0 40px rgba(147, 51, 234, 0.6), inset 0 0 30px rgba(147, 51, 234, 0.2)' 
                        : '0 0 35px rgba(147, 51, 234, 0.5), inset 0 0 25px rgba(168, 85, 247, 0.25)'
                  }}>
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer" 
                         style={{ 
                           backgroundSize: '200% 100%',
                           animation: 'shimmer 2.5s infinite linear'
                         }} />
                    <span className={`relative font-bold text-lg flex items-center gap-2`}
                      style={{
                        color: effectiveTheme === 'dark' ? '#E9D5FF' : '#581C87',
                        textShadow: effectiveTheme === 'dark' 
                          ? '0 0 15px rgba(147, 51, 234, 0.9), 0 1px 2px rgba(0, 0, 0, 0.5)' 
                          : '0 0 12px rgba(147, 51, 234, 0.6), 0 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      🏆 Hall of Fame
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Token Info */}
            <Card className="flex flex-col" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Gamepad2 className="text-[#56C880]" size={20} />
                  <span className={`font-semibold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Token Info
                  </span>
                </div>
                <div className="space-y-2.5 flex-1">
                  {/* Creator */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Creator
                    </span>
                    <button
                      onClick={() => window.open(`https://explorer.crosstoken.io/612055/address/${token.creatorAddress}`, '_blank', 'noopener,noreferrer')}
                      className={`flex items-center gap-1.5 transition-colors ${
                        effectiveTheme === 'dark'
                          ? 'text-gray-200 hover:text-[#56C880]'
                          : 'text-gray-800 hover:text-[#56C880]'
                      }`}
                      title="View on Explorer"
                    >
                      <Flame size={14} className="text-[#56C880]" />
                      <span className="font-mono text-sm">
                        {token.creatorAddress}
                      </span>
                      <ExternalLink size={12} className="flex-shrink-0" />
                    </button>
                  </div>

                  {/* Created */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Created
                    </span>
                    <span className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {(() => {
                        // Generate a creation date based on token ID (for demo purposes)
                        const baseDate = new Date('2025-01-15');
                        const dayOffset = parseInt(token.id) || 0;
                        const createdDate = new Date(baseDate);
                        createdDate.setDate(baseDate.getDate() - dayOffset);
                        
                        const now = new Date();
                        const diffTime = Math.abs(now.getTime() - createdDate.getTime());
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                        
                        if (diffDays === 0) return 'Today';
                        if (diffDays === 1) return 'Yesterday';
                        if (diffDays < 30) return `${diffDays}d ago`;
                        
                        const diffMonths = Math.floor(diffDays / 30);
                        if (diffMonths < 12) return `${diffMonths}mo ago`;
                        
                        const diffYears = Math.floor(diffMonths / 12);
                        return `${diffYears}y ago`;
                      })()}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Price
                    </span>
                    <span className={`font-semibold ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {(token.price / CROSS_TO_USD).toFixed(8)} CROSS
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Top Holders */}
            <Card className="flex flex-col" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="text-[#56C880]" size={20} />
                  <span className={`font-semibold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Top holders
                  </span>
                </div>
                <div className="space-y-2.5 flex-1">
                  {mockHolders.map((holder, index) => (
                    <button
                      key={index}
                      onClick={() => window.open(`https://explorer.crosstoken.io/612055/address/${holder.fullAddress}`, '_blank', 'noopener,noreferrer')}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                        effectiveTheme === 'dark'
                          ? 'hover:bg-gray-800'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {getRankIcon(index)}
                        <span className={`text-sm font-mono ${
                          effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {holder.address}
                        </span>
                        <ExternalLink size={14} className={`${
                          effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className={`text-sm font-semibold ${
                        effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {holder.percentage}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTrade && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTrade(null)}
        >
          <div 
            className={`max-w-lg w-full rounded-xl shadow-2xl ${
              effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <h3 className={`text-xl font-bold ${
                effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Transaction Details
              </h3>
              <button
                onClick={() => setSelectedTrade(null)}
                className={`p-2 rounded-lg transition-colors ${
                  effectiveTheme === 'dark'
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Transaction Type */}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Type
                </span>
                <span className={`inline-block px-3 py-1.5 rounded font-semibold ${
                  selectedTrade.type === 'Buy' 
                    ? 'bg-[#56C880]/10 text-[#56C880]' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {selectedTrade.type.toUpperCase()}
                </span>
              </div>

              {/* From */}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  From
                </span>
                <div className="flex items-center gap-2">
                  <img src={gameTokenIcon} alt={token.symbol} className="w-5 h-5 rounded-full" />
                  <span className={`font-semibold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {parseFloat(selectedTrade.amount.split(' ')[0]).toFixed(8)}
                  </span>
                </div>
              </div>

              {/* To */}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  To
                </span>
                <div className="flex items-center gap-2">
                  <img src={crossCoin} alt="CROSS" className="w-5 h-5" />
                  <span className={`font-semibold ${
                    effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {parseFloat(selectedTrade.value.split(' ')[0]).toFixed(8)}
                  </span>
                </div>
              </div>

              {/* Trader */}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Trader
                </span>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm ${
                    effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedTrade.trader}
                  </span>
                  <button className={`p-1 rounded transition-colors ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}>
                    <Copy size={14} />
                  </button>
                  <button className={`p-1 rounded transition-colors ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Time
                </span>
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {selectedTrade.time}
                </span>
              </div>

              {/* Transaction Hash */}
              <div className={`pt-4 border-t ${
                effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <span className={`text-sm block mb-2 ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Transaction Hash
                </span>
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <span className={`font-mono text-sm flex-1 truncate ${
                    effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    0x742d8fa829ce3c3d99f96ce8b3e48c5b3c...9c4a
                  </span>
                  <button className={`p-1.5 rounded transition-colors ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                      : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                  }`}>
                    <Copy size={14} />
                  </button>
                  <button className={`p-1.5 rounded transition-colors ${
                    effectiveTheme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                      : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                  }`}>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-6 border-t ${
              effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <Button 
                onClick={() => setSelectedTrade(null)}
                className={`w-full ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          token={token}
        />
      )}

      {/* Liquidity Modal */}
      <LiquidityModal
        isOpen={showLiquidityModal}
        onClose={() => setShowLiquidityModal(false)}
        token={token}
      />
    </div>
  );
}