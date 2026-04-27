import { X, RefreshCw, ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "../App";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import type { TokenData } from "../types";
import { ConfirmDepositModal } from "./ConfirmDepositModal";
import { ConfirmWithdrawModal } from "./ConfirmWithdrawModal";
import { CompletedModal } from "./CompletedModal";

interface LiquidityModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: TokenData;
}

export function LiquidityModal({ isOpen, onClose, token }: LiquidityModalProps) {
  const { effectiveTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'add' | 'withdraw'>('add');
  const [tokenAmount, setTokenAmount] = useState('');
  const [crossAmount, setCrossAmount] = useState('');
  
  // Withdraw tab states
  const [lpAmount, setLpAmount] = useState('');
  const [showWithdrawalDetails, setShowWithdrawalDetails] = useState(false);
  const [showRewardReduction, setShowRewardReduction] = useState(false);
  
  // Confirmation modal states
  const [showDepositConfirm, setShowDepositConfirm] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  
  // Completed modal state
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [completedType, setCompletedType] = useState<'deposit' | 'withdraw'>('deposit');
  
  if (!isOpen) return null;

  // Mock data
  const lpTokens = 5.6417;
  const lpTokensUSD = 65.73;
  const poolOwnership = 0.0;
  const exchangeRate = 0.0304; // 1 TOKEN = 0.0304 CROSS
  
  // User's balances (mock data)
  const userTokenBalance = 9.1325; // FBF balance
  const userCrossBalance = 2.0535; // CROSS balance

  // Handle token amount change
  const handleTokenAmountChange = (value: string) => {
    setTokenAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) * exchangeRate;
      setCrossAmount(calculated.toFixed(4));
    } else {
      setCrossAmount('');
    }
  };

  // Handle CROSS amount change
  const handleCrossAmountChange = (value: string) => {
    setCrossAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) / exchangeRate;
      setTokenAmount(calculated.toFixed(4));
    } else {
      setTokenAmount('');
    }
  };

  // Check balance validations
  const isTokenExceedingBalance = tokenAmount && parseFloat(tokenAmount) > userTokenBalance;
  const isCrossExceedingBalance = crossAmount && parseFloat(crossAmount) > userCrossBalance;
  const isLpExceedingBalance = lpAmount && parseFloat(lpAmount) > lpTokens;
  const hasAddBalanceError = isTokenExceedingBalance || isCrossExceedingBalance;

  // Calculate withdrawal amounts based on LP input
  const calculateWithdrawal = () => {
    if (!lpAmount || isNaN(parseFloat(lpAmount)) || parseFloat(lpAmount) === 0) {
      return {
        tokenWithdrawal: 0,
        crossWithdrawal: 0,
        totalUSD: 0,
        reduction: 0
      };
    }

    const lpValue = parseFloat(lpAmount);
    const lpPercentage = lpValue / lpTokens;
    
    // Mock pool values - adjust these based on actual pool data
    const poolTokenAmount = 300.0; // Total FBF in pool
    const poolCrossAmount = 9.12; // Total CROSS in pool
    
    const tokenWithdrawal = poolTokenAmount * lpPercentage;
    const crossWithdrawal = poolCrossAmount * lpPercentage;
    const totalUSD = lpValue * (lpTokensUSD / lpTokens);
    const reduction = lpPercentage * 100; // Percentage reduction
    
    return {
      tokenWithdrawal,
      crossWithdrawal,
      totalUSD,
      reduction
    };
  };

  const withdrawalData = calculateWithdrawal();

  // Check if deposit button should be enabled
  const isDepositEnabled = tokenAmount && crossAmount && 
    parseFloat(tokenAmount) > 0 && parseFloat(crossAmount) > 0 && !hasAddBalanceError;
  
  // Check if withdraw button should be enabled
  const isWithdrawEnabled = lpAmount && parseFloat(lpAmount) > 0 && !isLpExceedingBalance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Main Liquidity Modal - Only show when confirm modals are NOT shown */}
      {!showDepositConfirm && !showWithdrawConfirm && !showCompletedModal && (
        <div className={`relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl border ${
          effectiveTheme === 'dark' 
            ? 'bg-[#1a1f2e] border-gray-700/50' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <img src={token.image} alt={token.symbol} className="w-10 h-10 rounded-full border-2 border-[#1a1f2e] z-10" />
                <img src={crossCoin} alt="CROSS" className="w-10 h-10 rounded-full border-2 border-[#1a1f2e]" />
              </div>
              <div className="flex items-center gap-2">
                <h2 className={`text-xl font-bold ${
                  effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {token.symbol}-CROSS
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-[#56C880]/20 text-[#56C880] border border-[#56C880]/30">
                  Deposited
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className={`p-2 rounded-lg transition-colors ${
                  effectiveTheme === 'dark' 
                    ? 'hover:bg-gray-700/50 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <RefreshCw size={20} />
              </button>
              <button 
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  effectiveTheme === 'dark' 
                    ? 'hover:bg-gray-700/50 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Info Stats */}
          <div className={`px-6 py-4 border-b border-gray-700/50 ${
            effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-500">LP Token </span>
                <span className="font-semibold">{lpTokens.toFixed(4)} LP</span>
                <span className="text-gray-500"> (${lpTokensUSD.toFixed(2)})</span>
              </div>
              <div>
                <span className="text-gray-500">Pool Ownership </span>
                <span className="font-semibold">{poolOwnership.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700/50">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 px-6 py-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'add'
                  ? effectiveTheme === 'dark'
                    ? 'text-white'
                    : 'text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Add
              {activeTab === 'add' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#56C880]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 px-6 py-3 text-sm font-semibold transition-colors relative ${
                activeTab === 'withdraw'
                  ? effectiveTheme === 'dark'
                    ? 'text-white'
                    : 'text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Withdraw
              {activeTab === 'withdraw' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#56C880]" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'add' ? (
              <>
                {/* Token Inputs */}
                <div className={`rounded-xl border p-6 space-y-4 ${
                  effectiveTheme === 'dark'
                    ? 'bg-[#0d1117] border-gray-700/50'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  {/* Token Input (Now First) */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <img src={token.image} alt={token.symbol} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className={`font-semibold ${
                          effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {token.symbol}
                        </div>
                        <div className="text-sm text-gray-500">9.1325</div>
                      </div>
                    </div>
                    
                    <Input
                      type="number"
                      value={tokenAmount}
                      onChange={(e) => handleTokenAmountChange(e.target.value)}
                      placeholder="0.0"
                      className={`w-32 text-right text-2xl font-semibold border-none ${
                        effectiveTheme === 'dark'
                          ? 'bg-transparent text-gray-400'
                          : 'bg-transparent text-gray-600'
                      }`}
                    />
                  </div>

                  {/* Divider */}
                  <div className={`border-t ${
                    effectiveTheme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
                  }`} />

                  {/* CROSS Input (Now Second) */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <img src={crossCoin} alt="CROSS" className="w-8 h-8 rounded-full" />
                      <div>
                        <div className={`font-semibold ${
                          effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          CROSS
                        </div>
                        <div className="text-sm text-gray-500">2.0535</div>
                      </div>
                    </div>
                    
                    <Input
                      type="number"
                      value={crossAmount}
                      onChange={(e) => handleCrossAmountChange(e.target.value)}
                      placeholder="0.0"
                      className={`w-32 text-right text-2xl font-semibold border-none ${
                        effectiveTheme === 'dark'
                          ? 'bg-transparent text-gray-400'
                          : 'bg-transparent text-gray-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Exchange Rate */}
                <div className={`flex items-center justify-center gap-2 mt-4 text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <RefreshCw size={14} />
                  <span>1 {token.symbol} = {exchangeRate.toFixed(4)} CROSS</span>
                </div>

                {/* Balance Error Alert */}
                {hasAddBalanceError && (
                  <div className={`mt-4 px-4 py-3 rounded-lg border ${
                    effectiveTheme === 'dark'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-red-50 border-red-200 text-red-600'
                  }`}>
                    <p className="text-sm font-medium">Input value exceeds balance.</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={onClose}
                    className={`flex-1 py-3 h-12 font-semibold rounded-lg transition-colors ${
                      effectiveTheme === 'dark'
                        ? 'bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800'
                        : 'bg-transparent border-2 border-gray-300 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!isDepositEnabled}
                    onClick={() => setShowDepositConfirm(true)}
                    className={`flex-1 py-3 h-12 font-semibold rounded-lg transition-all ${
                      isDepositEnabled
                        ? 'bg-gradient-to-r from-[#56C880] to-[#45B570] hover:from-[#45B570] hover:to-[#56C880] text-white shadow-lg shadow-[#56C880]/20 cursor-pointer'
                        : effectiveTheme === 'dark'
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Deposit
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* LP Token Input */}
                <div className="mb-4">
                  <div className={`text-sm mb-2 ${
                    effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    LP Token {lpTokens.toFixed(4)} LP
                  </div>
                  <div className={`rounded-xl border p-6 ${
                    effectiveTheme === 'dark'
                      ? 'bg-[#0d1117] border-gray-700/50'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-semibold ${
                        effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Estimated Withdrawal Amount
                      </div>
                      <Input
                        type="number"
                        value={lpAmount}
                        onChange={(e) => setLpAmount(e.target.value)}
                        placeholder="0.0"
                        className={`w-24 text-right text-3xl font-semibold border-none ${
                          effectiveTheme === 'dark'
                            ? 'bg-transparent text-gray-300'
                            : 'bg-transparent text-gray-700'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Exchange Rate */}
                <div className={`flex items-center justify-center gap-2 my-4 text-sm ${
                  effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <RefreshCw size={14} />
                  <span>1 {token.symbol} = {exchangeRate.toFixed(4)} CROSS</span>
                </div>

                {/* Estimated Withdrawal Details */}
                <div className={`rounded-xl border mb-3 ${
                  effectiveTheme === 'dark'
                    ? 'bg-[#0d1117] border-gray-700/50'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <button
                    onClick={() => setShowWithdrawalDetails(!showWithdrawalDetails)}
                    className="w-full px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${
                        effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Estimated Withdrawal Amount
                      </span>
                      <Info size={14} className="text-gray-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${
                        effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        ${withdrawalData.totalUSD.toFixed(2)}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-500 transition-transform ${
                          showWithdrawalDetails ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {showWithdrawalDetails && (
                    <div className="px-4 pb-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{token.symbol} Amount</span>
                        <span className={effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {withdrawalData.tokenWithdrawal.toFixed(4)} {token.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CROSS Amount</span>
                        <span className={effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {withdrawalData.crossWithdrawal.toFixed(4)} CROSS
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Estimated Reward Reduction */}
                <div className={`rounded-xl border mb-6 ${
                  effectiveTheme === 'dark'
                    ? 'bg-[#0d1117] border-gray-700/50'
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <button
                    onClick={() => setShowRewardReduction(!showRewardReduction)}
                    className="w-full px-4 py-3 flex items-center justify-between"
                  >
                    <span className={`text-sm font-semibold ${
                      effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Estimated Reward Reduction
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-500 transition-transform ${
                        showRewardReduction ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {showRewardReduction && (
                    <div className="px-4 pb-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reduction</span>
                        <span className={effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {withdrawalData.reduction.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* LP Balance Error Alert */}
                {isLpExceedingBalance && (
                  <div className={`mb-6 px-4 py-3 rounded-lg border ${
                    effectiveTheme === 'dark'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-red-50 border-red-200 text-red-600'
                  }`}>
                    <p className="text-sm font-medium">Input value exceeds balance.</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={onClose}
                    className={`flex-1 py-3 h-12 font-semibold rounded-lg transition-colors ${
                      effectiveTheme === 'dark'
                        ? 'bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800'
                        : 'bg-transparent border-2 border-gray-300 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!isWithdrawEnabled}
                    onClick={() => setShowWithdrawConfirm(true)}
                    className={`flex-1 py-3 h-12 font-semibold rounded-lg transition-all ${
                      isWithdrawEnabled
                        ? 'bg-gradient-to-r from-[#56C880] to-[#45B570] hover:from-[#45B570] hover:to-[#56C880] text-white shadow-lg shadow-[#56C880]/20 cursor-pointer'
                        : effectiveTheme === 'dark'
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Withdraw
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Deposit Confirmation Modal */}
      {showDepositConfirm && (
        <ConfirmDepositModal
          onClose={() => setShowDepositConfirm(false)}
          token={token}
          tokenAmount={parseFloat(tokenAmount)}
          crossAmount={parseFloat(crossAmount)}
          exchangeRate={exchangeRate}
          lpTokens={lpTokens}
          lpTokensUSD={lpTokensUSD}
          poolOwnership={poolOwnership}
          userTokenBalance={userTokenBalance}
          userCrossBalance={userCrossBalance}
          onCloseParent={onClose}
          onConfirm={() => {
            setShowCompletedModal(true);
            setCompletedType('deposit');
          }}
        />
      )}

      {/* Withdraw Confirmation Modal */}
      {showWithdrawConfirm && (
        <ConfirmWithdrawModal
          onClose={() => setShowWithdrawConfirm(false)}
          token={token}
          lpAmount={parseFloat(lpAmount)}
          withdrawalData={withdrawalData}
          onCloseParent={onClose}
          onConfirm={() => {
            setShowCompletedModal(true);
            setCompletedType('withdraw');
          }}
        />
      )}

      {/* Completed Modal */}
      {showCompletedModal && (
        <CompletedModal
          isOpen={showCompletedModal}
          onClose={() => setShowCompletedModal(false)}
          token={token}
          type={completedType}
          onCloseParent={onClose}
        />
      )}
    </div>
  );
}