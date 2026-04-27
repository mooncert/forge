import { Button } from "./ui/button";
import { useTheme } from "../App";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import type { TokenData } from "../types";

interface ConfirmDepositModalProps {
  onClose: () => void;
  token: TokenData;
  tokenAmount: number;
  crossAmount: number;
  exchangeRate: number;
  lpTokens: number;
  lpTokensUSD: number;
  poolOwnership: number;
  userTokenBalance: number;
  userCrossBalance: number;
  onCloseParent: () => void;
  onConfirm: () => void;
}

export function ConfirmDepositModal({
  onClose,
  token,
  tokenAmount,
  crossAmount,
  exchangeRate,
  onCloseParent,
  onConfirm
}: ConfirmDepositModalProps) {
  const { effectiveTheme } = useTheme();

  const handleConfirm = () => {
    // Handle deposit confirmation
    console.log('Deposit confirmed');
    onClose();
    onConfirm();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl border p-6 ${
        effectiveTheme === 'dark'
          ? 'bg-[#1a1f2e] border-gray-700/50'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-xl font-bold mb-6 ${
          effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Confirm Deposit
        </h3>

        {/* Summary */}
        <div className={`rounded-xl border p-4 space-y-3 mb-6 ${
          effectiveTheme === 'dark'
            ? 'bg-[#0d1117] border-gray-700/50'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">You're depositing</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={token.image} alt={token.symbol} className="w-6 h-6 rounded-full" />
              <span className={`font-semibold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {token.symbol}
              </span>
            </div>
            <span className={`font-semibold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {parseFloat(tokenAmount).toFixed(4)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={crossCoin} alt="CROSS" className="w-6 h-6 rounded-full" />
              <span className={`font-semibold ${
                effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                CROSS
              </span>
            </div>
            <span className={`font-semibold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {parseFloat(crossAmount).toFixed(4)}
            </span>
          </div>

          <div className={`border-t pt-3 ${
            effectiveTheme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Exchange Rate</span>
              <span className={`text-sm font-medium ${
                effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                1 {token.symbol} = {exchangeRate.toFixed(4)} CROSS
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Estimated LP Tokens</span>
            <span className="text-sm font-semibold text-[#56C880]">
              +{(parseFloat(tokenAmount) * 0.0188).toFixed(4)} LP
            </span>
          </div>
        </div>

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
            onClick={handleConfirm}
            className="flex-1 py-3 h-12 font-semibold rounded-lg transition-all bg-gradient-to-r from-[#56C880] to-[#45B570] hover:from-[#45B570] hover:to-[#56C880] text-white shadow-lg shadow-[#56C880]/20"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}