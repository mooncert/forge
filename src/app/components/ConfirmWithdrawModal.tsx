import { Button } from "./ui/button";
import { useTheme } from "../App";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import type { TokenData } from "../types";

interface WithdrawalData {
  tokenWithdrawal: number;
  crossWithdrawal: number;
  totalUSD: number;
  reduction: number;
}

interface ConfirmWithdrawModalProps {
  onClose: () => void;
  token: TokenData;
  lpAmount: number;
  withdrawalData: WithdrawalData;
  onCloseParent: () => void;
  onConfirm: () => void;
}

export function ConfirmWithdrawModal({
  onClose,
  token,
  lpAmount,
  withdrawalData,
  onCloseParent,
  onConfirm
}: ConfirmWithdrawModalProps) {
  const { effectiveTheme } = useTheme();

  const handleConfirm = () => {
    // Handle withdraw confirmation
    console.log('Withdraw confirmed');
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
          Confirm Withdraw
        </h3>

        {/* Summary */}
        <div className={`rounded-xl border p-4 space-y-3 mb-6 ${
          effectiveTheme === 'dark'
            ? 'bg-[#0d1117] border-gray-700/50'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">You're withdrawing</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`font-semibold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              LP Tokens
            </span>
            <span className="font-semibold text-red-400">
              -{parseFloat(lpAmount).toFixed(4)} LP
            </span>
          </div>

          <div className={`border-t pt-3 ${
            effectiveTheme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">You'll receive</span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img src={token.image} alt={token.symbol} className="w-5 h-5 rounded-full" />
                <span className={`text-sm font-medium ${
                  effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {token.symbol}
                </span>
              </div>
              <span className="text-sm font-semibold text-[#56C880]">
                +{withdrawalData.tokenWithdrawal.toFixed(4)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={crossCoin} alt="CROSS" className="w-5 h-5 rounded-full" />
                <span className={`text-sm font-medium ${
                  effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  CROSS
                </span>
              </div>
              <span className="text-sm font-semibold text-[#56C880]">
                +{withdrawalData.crossWithdrawal.toFixed(4)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Value</span>
            <span className={`text-sm font-semibold ${
              effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              ${withdrawalData.totalUSD.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Reward Reduction</span>
            <span className="text-sm font-semibold text-orange-400">
              -{withdrawalData.reduction.toFixed(2)}%
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