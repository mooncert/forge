"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useTheme } from "../../App";
import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const { effectiveTheme } = useTheme();
  const currentValue = value || 0;
  
  // Determine stage based on value
  const getStage = () => {
    if (currentValue < 5) return 'none';         // No tier: 0~5% 미만
    if (currentValue < 20) return 'bronze';      // BRONZE: 5%~19%
    if (currentValue < 50) return 'silver';      // SILVER: 20%~49%
    if (currentValue < 70) return 'gold';        // GOLD: 50%~69%
    if (currentValue < 80) return 'platinum';    // PLATINUM: 70%~80% 미만
    if (currentValue < 100) return 'diamond';    // DIAMOND: 80%~99%
    return 'hof';                                 // Hall of Fame: 100%
  };
  
  const stage = getStage();
  
  // Stage-specific styles
  const stageStyles = {
    none: {
      gradient: 'from-gray-500 via-gray-500 to-gray-500',
      glow: effectiveTheme === 'dark' 
        ? '0 0 5px rgba(107, 116, 128, 0.2)' 
        : '0 0 3px rgba(107, 116, 128, 0.1)',
      showWave: false,
      vibrate: false,
    },
    bronze: {
      gradient: 'from-[#CD7F32] via-[#CD7F32] to-[#CD7F32]',
      glow: effectiveTheme === 'dark' 
        ? '0 0 8px rgba(205, 127, 50, 0.3)' 
        : '0 0 5px rgba(205, 127, 50, 0.2)',
      showWave: false,
      vibrate: false,
    },
    silver: {
      gradient: 'from-[#C0C0C0] via-[#C0C0C0] to-[#C0C0C0]',
      glow: effectiveTheme === 'dark' 
        ? '0 0 12px rgba(192, 192, 192, 0.5)' 
        : '0 0 8px rgba(192, 192, 192, 0.4)',
      showWave: true,
      vibrate: false,
    },
    gold: {
      gradient: 'from-[#FFD700] via-[#FFD700] to-[#FFD700]',
      glow: effectiveTheme === 'dark' 
        ? '0 0 20px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 215, 0, 0.5)' 
        : '0 0 15px rgba(255, 215, 0, 0.6), 0 0 25px rgba(255, 215, 0, 0.4)',
      showWave: true,
      vibrate: false,
    },
    platinum: {
      gradient: 'from-[#556B2F] via-[#556B2F] to-[#556B2F]',
      glow: effectiveTheme === 'dark' 
        ? '0 0 20px rgba(85, 107, 47, 0.7), 0 0 30px rgba(85, 107, 47, 0.5)' 
        : '0 0 15px rgba(85, 107, 47, 0.6), 0 0 25px rgba(85, 107, 47, 0.4)',
      showWave: true,
      vibrate: false,
    },
    diamond: {
      gradient: 'from-[#B9F2FF] via-[#B9F2FF] to-[#B9F2FF]',
      glow: effectiveTheme === 'dark' 
        ? '0 0 25px rgba(185, 242, 255, 0.8), 0 0 40px rgba(185, 242, 255, 0.6), 0 0 60px rgba(185, 242, 255, 0.4)' 
        : '0 0 20px rgba(185, 242, 255, 0.7), 0 0 35px rgba(185, 242, 255, 0.5)',
      showWave: true,
      vibrate: true,
    },
    hof: {
      gradient: 'from-[#9333EA] via-[#A855F7] to-[#9333EA]',
      glow: effectiveTheme === 'dark' 
        ? '0 0 30px rgba(147, 51, 234, 1), 0 0 50px rgba(147, 51, 234, 0.7), 0 0 70px rgba(147, 51, 234, 0.5)' 
        : '0 0 25px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.6)',
      showWave: true,
      vibrate: true,
    },
  };
  
  const currentStageStyle = stageStyles[stage];
  
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full shadow-inner",
        effectiveTheme === "dark" 
          ? "bg-gray-800/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" 
          : "bg-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all duration-700 ease-out relative overflow-hidden",
          currentStageStyle.vibrate && "animate-pulse"
        )}
        style={{ transform: `translateX(-${100 - currentValue}%)` }}
      >
        {/* Stage-specific gradient */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-r",
            currentStageStyle.gradient
          )}
          style={{
            boxShadow: currentStageStyle.glow,
          }}
        />
        
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10" />
        
        {/* Animated wave effect (Growth, Hype, Launch only) */}
        {currentStageStyle.showWave && (
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                animation: stage === 'launch' ? 'wave 1s ease-in-out infinite' : 'wave 2s ease-in-out infinite',
                transform: 'translateX(-100%)',
              }}
            />
          </div>
        )}
        
        {/* Bright edge highlight */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1 blur-[2px]"
          style={{
            backgroundColor: stage === 'launch' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'
          }}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };