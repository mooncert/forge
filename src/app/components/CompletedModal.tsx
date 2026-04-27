import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../App";
import crossCoin from "figma:asset/431ee8d40726913da14f55c0c2aa3cbb7424b402.png";
import type { TokenData } from "../types";

interface CompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: TokenData;
  type: 'deposit' | 'withdraw';
  onCloseParent: () => void;
}

export function CompletedModal({ isOpen, onClose, token, type, onCloseParent }: CompletedModalProps) {
  const { effectiveTheme } = useTheme();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    onCloseParent();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-sm mx-4 rounded-2xl shadow-2xl bg-[#1a1f2e] p-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#56C880] flex items-center justify-center shadow-lg shadow-[#56C880]/30">
            <CheckCircle2 size={36} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center mb-8 text-white">
          {type === 'deposit' ? 'Deposit is Completed' : 'Withdraw is Completed'}
        </h3>

        {/* Token Icons */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="relative">
            <img 
              src={token.image} 
              alt={token.symbol} 
              className="w-14 h-14 rounded-full shadow-lg" 
            />
          </div>
          <div className="relative">
            <img 
              src={crossCoin} 
              alt="CROSS" 
              className="w-14 h-14 rounded-full shadow-lg" 
            />
          </div>
        </div>

        {/* Complete Button */}
        <Button
          onClick={handleClose}
          className="w-full py-4 h-14 font-bold text-lg rounded-xl transition-all bg-[#56C880] hover:bg-[#45B570] text-white shadow-lg shadow-[#56C880]/20"
        >
          Complete
        </Button>
      </div>
    </div>
  );
}