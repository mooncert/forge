import { useState } from "react";
import { CheckCircle, Copy, ChevronRight, TrendingUp, DollarSign, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useTheme } from "../App";
import tokenImage from "figma:asset/fc65c20c3bb05d6fb31cad54c966051d86b7089d.png";

interface CreateTokenProps {
  onBack: () => void;
}

export function CreateToken({ onBack }: CreateTokenProps) {
  const { effectiveTheme } = useTheme();
  const [selectedToken, setSelectedToken] = useState({
    name: "I1",
    symbol: "$I1symbol",
    address: "0xF25a3666aF365FE4CEDE7af84E444f29f41EAbC6",
    image: tokenImage
  });
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const ownerAddress = "0x815C14148c34307C6435DCD40fbad8f5b2973c51";

  const handleCopyAddress = (address: string, type: string) => {
    try {
      // Use fallback method for better compatibility
      const textarea = document.createElement('textarea');
      textarea.value = address;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        setCopiedAddress(type);
        setTimeout(() => setCopiedAddress(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSupplyLiquidity = () => {
    alert("🚀 유동성 공급이 시작됩니다!");
  };

  return (
    <div className={`min-h-screen py-6 md:py-12 ${ 
      effectiveTheme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#56C880]/10 mb-3 md:mb-4">
            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-[#56C880]" />
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${
            effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Forge Your Token
          </h1>
          <p className={`text-sm md:text-base ${
            effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Create. Deploy. Trade.
          </p>
        </div>

        {/* Main Card */}
        <Card className={`p-4 md:p-6 mb-6 ${
          effectiveTheme === 'dark' 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Project Owner */}
          <div className={`rounded-xl p-4 mb-6 ${
            effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                effectiveTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs mb-1 ${
                  effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Project Owner
                </p>
                <p className={`text-sm font-mono break-all ${
                  effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {ownerAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Token Selection */}
          <div className="mb-6">
            <h3 className={`text-sm font-semibold mb-3 ${
              effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Select Token
            </h3>
            <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
              effectiveTheme === 'dark'
                ? 'border-[#56C880] bg-gray-800/50'
                : 'border-[#56C880] bg-green-50/30'
            }`}>
              <div className="flex items-center gap-4">
                <img 
                  src={selectedToken.image} 
                  alt={selectedToken.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold ${
                      effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {selectedToken.name}
                    </h4>
                    <span className={`text-sm ${
                      effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {selectedToken.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs font-mono break-all ${
                      effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {selectedToken.address}
                    </p>
                    <button
                      onClick={() => handleCopyAddress(selectedToken.address, 'token')}
                      className={`p-1 rounded hover:bg-gray-700/50 transition-colors ${
                        copiedAddress === 'token' ? 'text-[#56C880]' : 'text-gray-500'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <CheckCircle className="w-6 h-6 text-[#56C880]" />
              </div>
            </div>
          </div>

          {/* Purchase Amount */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-3">
              <h3 className={`text-sm font-semibold ${
                effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Initial Purchase Amount (Optional)
              </h3>
            </div>
            <p className={`text-xs mb-3 ${
              effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Enter amount to purchase tokens upon pool creation. 0 to create pool only.
            </p>
            <div className="relative">
              <Input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder="0"
                className={`pr-20 py-6 text-lg ${
                  effectiveTheme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg font-semibold ${
                effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                CROSS
              </div>
            </div>
          </div>

          {/* Pool Info */}
          <div className={`rounded-xl p-5 ${
            effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <h3 className={`text-sm font-semibold mb-4 ${
              effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Pool Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Pool Allocation
                </span>
                <span className={`font-semibold ${
                  effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  1,000,000,000 (100%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Initial Price (Fixed)
                </span>
                <span className={`font-semibold ${
                  effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  0.00000500 CROSS
                </span>
              </div>
            </div>
          </div>

          {/* Supply Button */}
          <Button
            onClick={handleSupplyLiquidity}
            className="w-full mt-6 bg-[#56C880] hover:bg-[#45B570] text-white font-semibold py-6 text-lg"
          >
            Supply Liquidity
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>

        {/* Back Button */}
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className={`w-full py-6 font-semibold mb-12 ${
            effectiveTheme === 'dark'
              ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          ← Go Back
        </Button>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          {/* Market on Day 1 */}
          <Card className={`p-6 border-2 ${
            effectiveTheme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-[#56C880] flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Market on Day 1
            </h3>
            <p className={`text-sm leading-relaxed ${
              effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Instant liquidity, instant trading
            </p>
          </Card>

          {/* Creator Fees */}
          <Card className={`p-6 border-2 ${
            effectiveTheme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-[#56C880] flex items-center justify-center mb-4">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Creator Fees
            </h3>
            <p className={`text-sm leading-relaxed ${
              effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Earn from every trade
            </p>
          </Card>

          {/* Fair Launch */}
          <Card className={`p-6 border-2 ${
            effectiveTheme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-[#0891b2] flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Fair Launch
            </h3>
            <p className={`text-sm leading-relaxed ${
              effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Fixed supply from day 1
            </p>
          </Card>

          {/* Launch for Free */}
          <Card className={`p-6 border-2 ${
            effectiveTheme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-[#0891b2] flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${
              effectiveTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Launch for Free
            </h3>
            <p className={`text-sm leading-relaxed ${
              effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              No capital required
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}