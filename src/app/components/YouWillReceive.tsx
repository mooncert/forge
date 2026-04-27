import { useTheme } from "../App";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface YouWillReceiveProps {
  amount: number;
  tokenSymbol: string;
  tokenIcon?: string;
}

export function YouWillReceive({ amount, tokenSymbol, tokenIcon }: YouWillReceiveProps) {
  const { effectiveTheme } = useTheme();
  const [countdown, setCountdown] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilling, setIsFilling] = useState(true); // true = filling, false = emptying
  const [isTransitioning, setIsTransitioning] = useState(true); // Control transition

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev >= 4) {
          setIsRefreshing(true);
          setTimeout(() => setIsRefreshing(false), 250);
          // Disable transition momentarily to prevent rewind
          setIsTransitioning(false);
          setTimeout(() => setIsTransitioning(true), 50);
          // Toggle between filling and emptying
          setIsFilling((prevFilling) => !prevFilling);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (amount <= 0) return null;

  // Calculate progress
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  
  let strokeDashoffset;
  if (isFilling) {
    // Filling: 0% to 100% clockwise
    const progressPercentage = (countdown / 4) * 100;
    strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
  } else {
    // Emptying: 100% to 0% clockwise (rotate away)
    // Start from 0 (full) and continue rotating to -circumference (empty)
    const progressPercentage = (countdown / 4) * 100;
    strokeDashoffset = 0 - (progressPercentage / 100) * circumference;
  }

  return (
    <div className="space-y-1.5">
      {/* Header: You will receive + Timer in same row */}
      <div className="flex items-center justify-between">
        <p
          className={`text-xs ${
            effectiveTheme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          You will receive
        </p>
        
        <div className="flex items-center gap-2">
          <svg width="20" height="20" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="10"
              cy="10"
              r={radius}
              stroke={effectiveTheme === "dark" ? "#374151" : "#E5E7EB"}
              strokeWidth="2"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="10"
              cy="10"
              r={radius}
              stroke="#56C880"
              strokeWidth="2"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-linear ${isTransitioning ? '' : 'transition-none'}`}
            />
          </svg>
          <div className="flex items-center gap-1">
            <RefreshCw
              size={12}
              className={`${
                effectiveTheme === "dark" ? "text-gray-500" : "text-gray-400"
              } ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span
              className={`text-xs tabular-nums ${
                effectiveTheme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {isFilling ? countdown + 1 : 5 - countdown}s
            </span>
          </div>
        </div>
      </div>
      
      {/* Amount Display */}
      <div
        className={`rounded-lg px-4 py-3 border flex items-center ${
          effectiveTheme === "dark"
            ? "bg-gray-900/50 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {tokenIcon && (
          <img
            src={tokenIcon}
            alt={tokenSymbol}
            className="w-6 h-6 rounded-full"
          />
        )}
        <div className="flex-1 flex justify-end">
          <span
            className={`text-xl font-semibold tabular-nums transition-all duration-150 relative inline-block`}
          >
            <span 
              className={`relative inline-block ${
                isRefreshing 
                  ? 'text-shine-active' 
                  : effectiveTheme === "dark" ? 'text-shine-dark' : 'text-shine-light'
              }`}
            >
              {amount.toFixed(4)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}