import { Wallet, TrendingUp, TrendingDown, Send, X, Twitter, ArrowLeft, ChartPie, Navigation } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useTheme } from "../App";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import crossIcon from "figma:asset/310adedabfd22f48a397c51de763ba1bc687b3ca.png";
import fbfTokenImage from "figma:asset/c66235bc62b378efff9e754ca0700cc536db5a51.png";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { PNLShareModal } from "./PNLShareModal";

interface PortfolioHolding {
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  gameTitle: string;
  balance: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
  tokenImage: string;
}

interface LiquidityPool {
  poolId: string;
  tokenId: string; // Add tokenId for navigation
  tokenName: string;
  tokenSymbol: string;
  gameTitle: string;
  tokenImage: string;
  poolOwnership: number; // percentage with 2 decimals
  lpTokens: number; // LP token amount with 2 decimals
}

interface PortfolioProps {
  onNavigate?: (view: string, tokenId?: string) => void;
}

export function Portfolio({ onNavigate }: PortfolioProps) {
  const { effectiveTheme } = useTheme();
  const [transferModal, setTransferModal] = useState<PortfolioHolding | null>(null);
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [pnlShareModal, setPNLShareModal] = useState(false);
  const [crossTransferModal, setCrossTransferModal] = useState(false);
  const [crossTransferAddress, setCrossTransferAddress] = useState("");
  const [crossTransferAmount, setCrossTransferAmount] = useState("");
  
  const crossBalance = 12345.67;
  const crossUsdValue = crossBalance * 2.5;
  
  const holdings: PortfolioHolding[] = [
    {
      tokenId: "1",
      tokenName: "Dragon Slayer",
      tokenSymbol: "DST",
      gameTitle: "Fantasy Quest RPG",
      balance: 125000,
      avgBuyPrice: 0.000038,
      currentPrice: 0.000045,
      totalValue: 5.625,
      profitLoss: 0.875,
      profitLossPercent: 18.42,
      tokenImage: "https://images.unsplash.com/photo-1766052740776-c1fad8f6ecdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb24lMjBmYW50YXN5JTIwZ2FtZXxlbnwxfHx8fDE3NjY5OTIxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      tokenId: "2",
      tokenName: "Space Warriors",
      tokenSymbol: "SWR",
      gameTitle: "Galactic Battles",
      balance: 85000,
      avgBuyPrice: 0.000062,
      currentPrice: 0.000058,
      totalValue: 4.93,
      profitLoss: -0.34,
      profitLossPercent: -6.45,
      tokenImage: "https://images.unsplash.com/photo-1600403373679-d56e6e1a3364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHdhcnJpb3IlMjBnYW1lfGVufDF8fHx8MTc2Njk5MjE2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      tokenId: "3",
      tokenName: "Cyber Punk",
      tokenSymbol: "CPK",
      gameTitle: "Neon City 2077",
      balance: 200000,
      avgBuyPrice: 0.000025,
      currentPrice: 0.000032,
      totalValue: 6.4,
      profitLoss: 1.4,
      profitLossPercent: 28.0,
      tokenImage: "https://images.unsplash.com/photo-1615511676712-df98fcc708d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9ufGVufDF8fHx8MTc2Njk1OTEzNnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      tokenId: "transfer-cross",
      tokenName: "CROSS",
      tokenSymbol: "CROSS",
      gameTitle: "-",
      balance: 3500,
      avgBuyPrice: 0,
      currentPrice: 0.00025,
      totalValue: 0.875,
      profitLoss: 0,
      profitLossPercent: 0,
      tokenImage: crossIcon
    },
    {
      tokenId: "transfer-moltz",
      tokenName: "Moltz",
      tokenSymbol: "MOLTZ",
      gameTitle: "Moltz",
      balance: 250.5,
      avgBuyPrice: 0,
      currentPrice: 0.00018,
      totalValue: 0.04509,
      profitLoss: 0,
      profitLossPercent: 0,
      tokenImage: "https://console-contents.crosstoken.io/builder/mcp/019c9e85-44af-7290-a561-46418aa9d605/019c9e85-44d1-740e-8774-17b16c8a5bf5.png"
    }
  ];

  const liquidityPools: LiquidityPool[] = [
    {
      poolId: "pool-1",
      tokenId: "28", // Football Frenzy - graduated token (bondingProgress: 100)
      tokenName: "Football Frenzy",
      tokenSymbol: "FBF",
      gameTitle: "Football Frenzy",
      tokenImage: fbfTokenImage,
      poolOwnership: 5.42,
      lpTokens: 1234.56
    },
    {
      poolId: "pool-2",
      tokenId: "8", // Ultimate Survival - graduated token (bondingProgress: 92.3)
      tokenName: "Ultimate Survival",
      tokenSymbol: "ULS",
      gameTitle: "Ultimate Survival",
      tokenImage: "https://images.unsplash.com/photo-1741642823666-be2358972252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwZGlhbW9uZCUyMGdlbSUyMGNyeXN0YWx8ZW58MXx8fHwxNzY2NzM2MjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      poolOwnership: 12.75,
      lpTokens: 8956.23
    }
  ];

  const totalValue = holdings.reduce((sum, h) => sum + h.totalValue, 0);
  const totalProfitLoss = holdings.reduce((sum, h) => sum + h.profitLoss, 0);
  const totalProfitLossPercent = (totalProfitLoss / (totalValue - totalProfitLoss)) * 100;

  const handleSharePNL = () => {
    setPNLShareModal(true);
  };

  const pnlBorderClass = totalProfitLoss >= 0 
    ? 'border-[#10B981]/30 hover:border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
    : 'border-[#EF4444]/30 hover:border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.1)]';

  const pnlGlowClass = totalProfitLoss >= 0 ? 'from-[#10B981]/5' : 'from-[#EF4444]/5';

  return (
    <div className={`min-h-screen relative overflow-hidden ${effectiveTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {effectiveTheme === 'dark' && (
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(86, 200, 128, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(86, 200, 128, 0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
      )}

      {effectiveTheme === 'dark' && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#56C880] opacity-[0.08] blur-[120px] rounded-full" />
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#56C880] opacity-[0.05] blur-[100px] rounded-full" />
        </>
      )}

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl relative z-10">
        <Button
          onClick={() => onNavigate?.('home')}
          variant="ghost"
          className={`mb-6 md:mb-8 ${
            effectiveTheme === 'dark'
              ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        
        <div className="mb-6 md:mb-8">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className={`text-2xl md:text-4xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>My Portfolio</h1>
              <p className={`text-base md:text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Track my tokens</p>
            </div>
            {/* <Button
              onClick={handleSharePNL}
              className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white flex-shrink-0"
            >
              <Twitter size={18} className="mr-2" />
              <span className="hidden md:inline">Share PNL</span>
              <span className="md:hidden">Share</span>
            </Button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className={`p-4 sm:p-5 lg:p-6 border-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
            effectiveTheme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900 to-gray-900/50 border-[#56C880]/30 hover:border-[#56C880] shadow-[0_0_20px_rgba(86,200,128,0.1)]' 
              : 'bg-white border-gray-200 hover:border-[#56C880]/50 hover:shadow-[#56C880]/10'
          }`}>
            {effectiveTheme === 'dark' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#56C880]/5 to-transparent pointer-events-none" />
            )}
            <div className="relative z-10">
              <div className={`flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Wallet size={16} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Total Value</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <img src={crossCoin} alt="CROSS" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  {totalValue.toFixed(2)}
                </p>
              </div>
              <p className={`text-xs sm:text-sm ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                ≈ ${(totalValue * 2.5).toFixed(2)} USD
              </p>
            </div>
          </Card>

          <Card className={`p-4 sm:p-5 lg:p-6 border-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
            effectiveTheme === 'dark'
              ? 'bg-gradient-to-br from-gray-900 to-gray-900/50 border-[#56C880]/30 hover:border-[#56C880] shadow-[0_0_20px_rgba(86,200,128,0.1)]'
              : 'bg-white border-gray-200 hover:border-[#56C880]/50 hover:shadow-[#56C880]/10'
          }`}>
            {effectiveTheme === 'dark' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#56C880]/5 to-transparent pointer-events-none" />
            )}
            <div className="relative z-10">
              <div className={`flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <ChartPie size={16} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Holdings</span>
              </div>
              <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {holdings.length}
              </p>
              <p className={`text-xs sm:text-sm ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                Different tokens
              </p>
            </div>
          </Card>
        </div>

        {/* <Card className={`p-6 border-2 mb-6 sm:mb-8 relative overflow-hidden ${
          effectiveTheme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-[#56C880]/30 shadow-[0_0_30px_rgba(86,200,128,0.15)]'
            : 'bg-white border-gray-200'
        }`}>
          {effectiveTheme === 'dark' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-[#56C880]/10 via-transparent to-[#56C880]/10 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#56C880] to-transparent" />
            </>
          )}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>CROSS Token Holdings</h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className={`text-sm mb-2 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Balance
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <img src={crossCoin} alt="CROSS" className="w-8 h-8" />
                  <span className={`text-3xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {crossBalance.toLocaleString()}
                  </span>
                  <span className={`text-lg ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    CROSS
                  </span>
                </div>
                <div className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  ≈ ${crossUsdValue.toLocaleString()} USD
                </div>
              </div>

              <Button
                onClick={() => setCrossTransferModal(true)}
                className="bg-[#56C880] hover:bg-[#45B570] text-white px-6 py-3 shadow-[0_0_20px_rgba(86,200,128,0.3)] hover:shadow-[0_0_30px_rgba(86,200,128,0.5)] transition-all"
              >
                <Send size={18} className="mr-2" />
                Transfer
              </Button>
            </div>
          </div>
        </Card> */}

        <Card className={`border-2 overflow-hidden ${
          effectiveTheme === 'dark' 
            ? 'bg-gray-900 border-gray-800 shadow-[0_0_20px_rgba(86,200,128,0.05)]' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-6 border-b ${effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>My Holdings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${
                effectiveTheme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <tr>
                  <th className={`px-3 md:px-6 py-3 text-left text-xs font-semibold tracking-wider ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Token
                  </th>
                  <th className={`px-3 md:px-6 py-3 text-left text-xs font-semibold tracking-wider hidden lg:table-cell ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Game
                  </th>
                  <th className={`px-3 md:px-6 py-3 text-right text-xs font-semibold tracking-wider ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Amount
                  </th>
                  <th className={`px-3 md:px-6 py-3 text-right text-xs font-semibold tracking-wider hidden md:table-cell ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Price
                  </th>
                  <th className={`px-3 md:px-6 py-3 text-right text-xs font-semibold tracking-wider ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Value
                  </th>
                  {/* <th className={`px-3 md:px-6 py-3 text-right text-xs font-semibold tracking-wider hidden sm:table-cell ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    PNL
                  </th> */}
                  <th className={`px-3 md:px-6 py-3 text-center text-xs font-semibold tracking-wider ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${effectiveTheme === 'dark' ? 'divide-gray-800' : 'divide-gray-200'}`}>
                {holdings.map((holding) => (
                  <tr 
                    key={holding.tokenId} 
                    className={`transition-colors ${
                      effectiveTheme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-3 md:px-6 py-4 cursor-pointer" onClick={() => onNavigate?.('token', holding.tokenId)}>
                      <div className="flex items-center gap-2 md:gap-3">
                        <img 
                          src={holding.tokenImage} 
                          alt={holding.tokenSymbol} 
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className={`font-semibold text-sm md:text-base truncate ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{holding.tokenName}</div>
                          <div className={`text-xs md:text-sm truncate ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{holding.tokenSymbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-3 md:px-6 py-4 text-sm cursor-pointer hidden lg:table-cell ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} onClick={() => onNavigate?.('token', holding.tokenId)}>
                      {holding.gameTitle}
                    </td>
                    <td className={`px-3 md:px-6 py-4 text-right cursor-pointer ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} onClick={() => onNavigate?.('token', holding.tokenId)}>
                      <div className="flex items-center justify-end gap-1.5">
                        <img 
                          src={holding.tokenImage} 
                          alt={holding.tokenSymbol} 
                          className="w-4 h-4 md:w-5 md:h-5 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="text-xs md:text-sm font-medium truncate">
                          {holding.balance.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-right cursor-pointer hidden md:table-cell" onClick={() => onNavigate?.('token', holding.tokenId)}>
                      <div className="flex items-center justify-end gap-1.5 mb-1">
                        <img src={crossCoin} alt="CROSS" className="w-4 h-4 flex-shrink-0" />
                        <span className={`text-xs md:text-sm font-semibold ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {holding.currentPrice.toFixed(6)}
                        </span>
                      </div>
                      <div className={`text-xs ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ≈ ${(holding.currentPrice * 2.5).toFixed(6)}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-right cursor-pointer" onClick={() => onNavigate?.('token', holding.tokenId)}>
                      <div className="flex items-center justify-end gap-1.5 mb-1">
                        <img src={crossCoin} alt="CROSS" className="w-4 h-4 flex-shrink-0" />
                        <span className={`text-xs md:text-sm font-semibold ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {holding.totalValue.toFixed(3)}
                        </span>
                      </div>
                      <div className={`text-xs hidden md:block ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ≈ ${(holding.totalValue * 2.5).toFixed(2)}
                      </div>
                    </td>
                    {/* <td className="px-3 md:px-6 py-4 text-right cursor-pointer hidden sm:table-cell" onClick={() => onNavigate?.('token', holding.tokenId)}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-end gap-1.5">
                          {holding.profitLoss >= 0 ? (
                            <TrendingUp size={14} className="text-[#10B981] flex-shrink-0" />
                          ) : (
                            <TrendingDown size={14} className="text-[#EF4444] flex-shrink-0" />
                          )}
                          <img src={crossCoin} alt="CROSS" className="w-4 h-4 flex-shrink-0" />
                          <span className={`text-xs md:text-sm font-semibold ${
                            holding.profitLoss >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                          }`}>
                            {holding.profitLoss >= 0 ? '+' : ''}{holding.profitLoss.toFixed(3)}
                          </span>
                        </div>
                        <div className={`text-xs hidden md:block ${
                          holding.profitLoss >= 0 ? 'text-[#10B981]/70' : 'text-[#EF4444]/70'
                        }`}>
                          {holding.profitLoss >= 0 ? '+' : '-'}${Math.abs(holding.profitLoss * 2.5).toFixed(2)} ({holding.profitLoss >= 0 ? '+' : ''}{holding.profitLossPercent.toFixed(2)}%)
                        </div>
                        <div className="hidden lg:block w-full">
                          <div className={`h-1.5 rounded-full overflow-hidden ${
                            effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                          }`}>
                            <div
                              className={`h-full transition-all duration-500 ${
                                holding.profitLoss >= 0 ? 'bg-[#10B981]' : 'bg-[#EF4444]'
                              }`}
                              style={{
                                width: `${Math.min(Math.abs(holding.profitLossPercent), 100)}%`,
                                boxShadow: holding.profitLoss >= 0
                                  ? '0 0 8px rgba(16, 185, 129, 0.4)'
                                  : '0 0 8px rgba(239, 68, 68, 0.4)'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </td> */}
                    <td className="px-3 md:px-6 py-4 text-center">
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTransferModal(holding);
                        }}
                        className="bg-[#56C880] hover:bg-[#45B570] text-white text-xs md:text-sm px-2 md:px-4"
                      >
                        <Send size={14} className="md:mr-1" />
                        <span className="hidden md:inline">Transfer</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {holdings.length === 0 && (
            <div className="p-12 text-center">
              <Wallet size={48} className={`mx-auto mb-4 ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <p className={`text-lg font-semibold mb-2 ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>No Holdings Yet</p>
              <p className={effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Start trading to build your portfolio</p>
            </div>
          )}
        </Card>

        {/* My Pool Section */}
        {liquidityPools.length > 0 && (
          <Card className={`border-2 overflow-hidden mb-6 sm:mb-8 mt-6 sm:mt-8 ${
            effectiveTheme === 'dark' 
              ? 'bg-gray-900 border-gray-800 shadow-[0_0_20px_rgba(86,200,128,0.05)]' 
              : 'bg-white border-gray-200'
          }`}>
            <div className={`p-6 border-b ${effectiveTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>My Pool</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b ${
                  effectiveTheme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <tr>
                    <th className={`px-3 md:px-6 py-3 text-left text-xs font-semibold tracking-wider ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Pair
                    </th>
                    <th className={`px-3 md:px-6 py-3 text-right text-xs font-semibold tracking-wider ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Pool Ownership
                    </th>
                    <th className={`px-3 md:px-6 py-3 text-right text-xs font-semibold tracking-wider ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      LP Token
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${effectiveTheme === 'dark' ? 'divide-gray-800' : 'divide-gray-200'}`}>
                  {liquidityPools.map((pool) => (
                    <tr 
                      key={pool.poolId} 
                      onClick={() => onNavigate?.('token', pool.tokenId)}
                      className={`transition-colors cursor-pointer ${
                        effectiveTheme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-3 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Token Images */}
                          <div className="flex items-center -space-x-2">
                            <img 
                              src={pool.tokenImage} 
                              alt={pool.tokenSymbol} 
                              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-gray-900 flex-shrink-0 relative z-10"
                            />
                            <img 
                              src={crossCoin} 
                              alt="CROSS" 
                              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-900 flex-shrink-0"
                            />
                          </div>
                          {/* Token Info */}
                          <div className="min-w-0">
                            <div className={`font-semibold text-sm md:text-base truncate ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                              {pool.tokenSymbol}-CROSS
                            </div>
                            <div className={`text-xs md:text-sm truncate ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                              {pool.gameTitle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-4 text-right">
                        <div className={`text-sm md:text-base font-semibold ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {pool.poolOwnership.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-4 text-right">
                        <div className={`text-sm md:text-base font-semibold ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          {pool.lpTokens.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Transfer Modal */}
      <Dialog open={!!transferModal} onOpenChange={() => { setTransferModal(null); setTransferAddress(""); setTransferAmount(""); }}>
        <DialogContent className={`max-w-lg ${
          effectiveTheme === 'dark'
            ? 'bg-gray-900 border-gray-800 text-gray-100'
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          {transferModal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  Transfer {transferModal.tokenSymbol}
                </DialogTitle>
              </DialogHeader>

              <div className={`h-px ${effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />

              {/* Token Info */}
              <div className={`flex items-center gap-3 p-4 rounded-lg border ${
                effectiveTheme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={transferModal.tokenImage} alt={transferModal.tokenSymbol} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className={`font-bold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {transferModal.tokenName}
                  </div>
                  <div className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Balance: {transferModal.balance.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Recipient Address */}
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Recipient Address
                </label>
                <Input
                  placeholder="0x..."
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  className={effectiveTheme === 'dark'
                    ? 'bg-transparent border-gray-700 text-gray-100 placeholder:text-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                  }
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  Amount
                </label>
                <div className="relative">
                  <Input
                    placeholder="Amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className={effectiveTheme === 'dark'
                      ? 'bg-transparent border-gray-700 text-gray-100 placeholder:text-gray-500 pr-16'
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 pr-16'
                    }
                  />
                  <button
                    onClick={() => setTransferAmount(transferModal.balance.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#56C880] hover:text-[#45B570]"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Fee & Summary */}
              <div className={`rounded-lg p-4 space-y-3 ${
                effectiveTheme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Estimated Gas Fee
                  </span>
                  <span className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    -
                  </span>
                </div>
                <div className={`h-px ${effectiveTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    You will send
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      <img src={transferModal.tokenImage} alt={transferModal.tokenSymbol} className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-sm font-semibold ${effectiveTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {transferAmount || "0"} {transferModal.tokenSymbol}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`h-px ${effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className={`flex-1 ${effectiveTheme === 'dark'
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => { setTransferModal(null); setTransferAddress(""); setTransferAmount(""); }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#56C880] hover:bg-[#45B570] text-white disabled:opacity-50"
                  disabled={!transferAddress || !transferAmount}
                >
                  <Navigation size={16} className="mr-2" />
                  Confirm Transfer
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <PNLShareModal
        isOpen={pnlShareModal}
        onClose={() => setPNLShareModal(false)}
        totalValue={totalValue}
        totalProfitLoss={totalProfitLoss}
        totalProfitLossPercent={totalProfitLossPercent}
        holdingsCount={holdings.length}
        topHoldings={holdings.map(h => ({
          tokenName: h.tokenName,
          tokenSymbol: h.tokenSymbol,
          profitLoss: h.profitLoss,
          profitLossPercent: h.profitLossPercent
        })).sort((a, b) => Math.abs(b.profitLoss) - Math.abs(a.profitLoss))}
      />
    </div>
  );
}