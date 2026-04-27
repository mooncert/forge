import { useState, forwardRef, useEffect } from "react";
import { ArrowDownUp, Settings, ChevronDown, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import type { TokenData } from "./TokenCard";
import { useTheme } from "../App";
import solIcon from "figma:asset/3cfa5c6d6425a11f82d7e5757482f7f266a42f96.png";
import { Tooltip } from "./Tooltip";
import OrderGroup from "../../imports/OrderGroup";
import { SwapCompleteDialog } from "./SwapCompleteDialog";
import crossIcon from "figma:asset/310adedabfd22f48a397c51de763ba1bc687b3ca.png";
import { YouWillReceive } from "./YouWillReceive";

interface TradingInterfaceProps {
  token: TokenData;
  scrollToTrading?: () => void;
  autoExpand?: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
}

export const TradingInterface = forwardRef<HTMLDivElement, TradingInterfaceProps>(
  ({ token, scrollToTrading, autoExpand, onVisibilityChange }, ref) => {
    const { effectiveTheme } = useTheme();
    const [buyAmount, setBuyAmount] = useState("");
    const [sellAmount, setSellAmount] = useState("");
    const [slippage, setSlippage] = useState("1");
    const [showSlippageModal, setShowSlippageModal] = useState(false);
    const [inputToken, setInputToken] = useState<"CROSS" | "snowgolem">("CROSS");
    const [showBuySwapInfo, setShowBuySwapInfo] = useState(false);
    const [showSellSwapInfo, setShowSellSwapInfo] = useState(false);
    const [showSwapCompleteModal, setShowSwapCompleteModal] = useState(false);

    const calculateBuyOutput = (crossAmount: number) => {
      const fee = 0.01;
      const amountAfterFee = crossAmount * (1 - fee);
      const k = token.liquidity * (token.marketCap / token.price);
      const newCrossReserve = token.liquidity + amountAfterFee;
      const newTokenReserve = k / newCrossReserve;
      return (token.marketCap / token.price) - newTokenReserve;
    };

    const calculateSellOutput = (tokenAmount: number) => {
      const fee = 0.01;
      const amountAfterFee = tokenAmount * (1 - fee);
      const k = token.liquidity * (token.marketCap / token.price);
      const newTokenReserve = (token.marketCap / token.price) + amountAfterFee;
      const newCrossReserve = k / newTokenReserve;
      return token.liquidity - newCrossReserve;
    };

    const buyOutput = buyAmount ? calculateBuyOutput(parseFloat(buyAmount)) : 0;
    const sellOutput = sellAmount ? calculateSellOutput(parseFloat(sellAmount)) : 0;

    const quickBuyAmounts = ["Reset", "25%", "50%", "75%", "Max"];
    
    useEffect(() => {
      if (autoExpand) {
        setShowBuySwapInfo(true);
      }
    }, [autoExpand]);

    useEffect(() => {
      if (onVisibilityChange) {
        onVisibilityChange(showBuySwapInfo || showSellSwapInfo);
      }
    }, [showBuySwapInfo, showSellSwapInfo, onVisibilityChange]);

    // Intersection Observer to detect when TradingInterface is visible
    useEffect(() => {
      if (!ref || typeof ref === 'function') return;
      
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // If trading interface is visible (even partially), hide sticky button
          if (entry.isIntersecting && scrollToTrading) {
            // Trading interface is in view
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px 0px 0px'
        }
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }, [ref, scrollToTrading]);

    return (
      <>
        <Card className="p-4 md:p-6" ref={ref}>
          <Tabs defaultValue="buy" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 mb-4 ${
              effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <TabsTrigger 
                value="buy"
                className={`font-semibold text-sm ${
                  effectiveTheme === 'dark'
                    ? 'data-[state=active]:bg-[#56C880] data-[state=active]:text-white text-gray-400'
                    : 'data-[state=active]:bg-[#56C880] data-[state=active]:text-white text-gray-600'
                }`}
              >
                Buy
              </TabsTrigger>
              <TabsTrigger 
                value="sell"
                className={`font-semibold text-sm ${
                  effectiveTheme === 'dark'
                    ? 'data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-400'
                    : 'data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-600'
                }`}
              >
                Sell
              </TabsTrigger>
            </TabsList>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-1 gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSlippageModal(true)}
                className={`text-[11px] md:text-xs flex items-center gap-1.5 ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Settings size={14} />
                <span>Slippage</span>
                <span>0.50%</span>
              </Button>
            </div>

            <TabsContent value="buy" className="space-y-4">
              <div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className={`text-4xl font-semibold h-14 text-right pl-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      effectiveTheme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-gray-100'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={inputToken === "CROSS" ? crossIcon : solIcon} alt={inputToken} className="w-6 h-6 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Quick Buy Buttons */}
              <div className="grid grid-cols-5 gap-1.5 md:gap-2">
                {quickBuyAmounts.map((amount, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (amount === "Reset") setBuyAmount("");
                      else if (amount === "25%") setBuyAmount("0.25");
                      else if (amount === "50%") setBuyAmount("0.5");
                      else if (amount === "75%") setBuyAmount("0.75");
                      else if (amount === "Max") setBuyAmount("10");
                    }}
                    className={`text-xs py-1 h-8 ${
                      effectiveTheme === 'dark'
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#56C880] text-gray-300'
                        : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-[#56C880] text-gray-700'
                    }`}
                  >
                    {amount}
                  </Button>
                ))}
              </div>

              {/* You Will Receive */}
              {buyAmount && parseFloat(buyAmount) > 0 && (
                <YouWillReceive 
                  amount={buyOutput} 
                  tokenSymbol={token.symbol}
                  tokenIcon={token.image}
                />
              )}

              <Button 
                className="w-full bg-[#56C880] hover:bg-[#45B570] text-white font-bold text-lg h-14 flex items-center justify-center gap-2" 
                size="lg"
                onClick={() => {
                  setShowBuySwapInfo(!showBuySwapInfo);
                  // Simulate swap completion for testing
                  if (buyAmount) {
                    setTimeout(() => setShowSwapCompleteModal(true), 500);
                  }
                }}
              >
                Log in to buy
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-300 ${showBuySwapInfo ? 'rotate-180' : ''}`} 
                />
              </Button>

              {/* Swap Info Section for Buy */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showBuySwapInfo ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`pt-4 pb-2 px-4 rounded-lg ${
                  effectiveTheme === 'dark' ? 'bg-gray-800/70' : 'bg-gray-100/70'
                }`}>
                  <OrderGroup />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    className={`text-4xl font-semibold h-14 text-right pl-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      effectiveTheme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-gray-100'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={token.image} alt={token.symbol} className="w-6 h-6 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Quick Sell Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {quickBuyAmounts.map((amount, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (amount === "Reset") setSellAmount("");
                      else if (amount === "25%") setSellAmount("0.25");
                      else if (amount === "50%") setSellAmount("0.5");
                      else if (amount === "75%") setSellAmount("0.75");
                      else if (amount === "Max") setSellAmount("10");
                    }}
                    className={`text-xs py-1 h-8 ${
                      effectiveTheme === 'dark'
                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-red-500 text-gray-300'
                        : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-red-500 text-gray-700'
                    }`}
                  >
                    {amount}
                  </Button>
                ))}
              </div>

              {/* You Will Receive */}
              {sellAmount && parseFloat(sellAmount) > 0 && (
                <YouWillReceive 
                  amount={sellOutput} 
                  tokenSymbol="CROSS"
                  tokenIcon={crossIcon}
                />
              )}

              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg h-14 flex items-center justify-center gap-2" 
                size="lg"
                onClick={() => setShowSellSwapInfo(!showSellSwapInfo)}
              >
                Log in to sell
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-300 ${showSellSwapInfo ? 'rotate-180' : ''}`} 
                />
              </Button>

              {/* Swap Info Section for Sell */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showSellSwapInfo ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`pt-4 pb-2 px-4 rounded-lg ${
                  effectiveTheme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <OrderGroup />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Slippage Modal */}
        {showSlippageModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSlippageModal(false)}
          >
            <Card 
              className={`p-6 w-full max-w-[400px] ${
                effectiveTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold text-lg ${
                  effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Slippage Settings
                </h3>
                <button
                  onClick={() => setShowSlippageModal(false)}
                  className={`text-2xl ${
                    effectiveTheme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`text-sm mb-2 block ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Tooltip text="The maximum price difference you are willing to accept. Transactions will revert if the price changes beyond this range." dotted={true}>
                      Max Slippage (%)
                    </Tooltip>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                      className={`flex-1 ${
                        effectiveTheme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-gray-100'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                    />
                    <span className={`flex items-center px-3 ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      %
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {["0.5", "1", "2", "5"].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => setSlippage(value)}
                      className={`${
                        slippage === value
                          ? 'border-[#56C880] bg-[#56C880]/10'
                          : effectiveTheme === 'dark'
                            ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300'
                            : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {value}%
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={() => setShowSlippageModal(false)}
                  className="w-full bg-[#56C880] hover:bg-[#45B570] text-black font-semibold"
                >
                  Confirm
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Swap Complete Modal */}
        {showSwapCompleteModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSwapCompleteModal(false)}
          >
            <div 
              className="w-full max-w-[400px]"
              onClick={(e) => e.stopPropagation()}
            >
              <SwapCompleteDialog onClose={() => setShowSwapCompleteModal(false)} />
            </div>
          </div>
        )}

        {/* Mobile Floating Buy Button */}
        {scrollToTrading && (
          <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t pointer-events-none ${
            effectiveTheme === 'dark' 
              ? 'from-black/80 to-transparent' 
              : 'from-white/80 to-transparent'
          }`}>
            <Button
              onClick={scrollToTrading}
              className="w-full bg-[#56C880] hover:bg-[#45B570] text-white font-bold text-lg h-14 shadow-lg pointer-events-auto"
            >
              Buy {token.symbol}
            </Button>
          </div>
        )}
      </>
    );
  }
);

TradingInterface.displayName = "TradingInterface";