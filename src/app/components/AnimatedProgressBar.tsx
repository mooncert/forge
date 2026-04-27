import { motion } from "motion/react";
import { useTheme } from "../App";
import { useState, useEffect } from "react";

interface AnimatedProgressBarProps {
  progress: number; // 0-100
  remainingTokens?: number; // Optional: tokens remaining in pool
  tokenSymbol?: string; // Optional: token symbol for display
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  glow: number;
  rotation: number; // 날카로운 모양을 위한 회전값
}

export function AnimatedProgressBar({ progress, remainingTokens, tokenSymbol }: AnimatedProgressBarProps) {
  const { effectiveTheme } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Get color based on progress
  const getTierConfig = (progress: number) => {
    if (progress < 5) return { main: '#6B7280', glow: 'rgba(107, 116, 128, 0.5)', name: 'INACTIVE' }; // INACTIVE: 5% 미만
    if (progress < 20) return { main: '#CD7F32', glow: 'rgba(205, 127, 50, 0.6)', name: 'BRONZE' }; // BRONZE: 5-19%
    if (progress < 50) return { main: '#C0C0C0', glow: 'rgba(192, 192, 192, 0.7)', name: 'SILVER' }; // SILVER: 20-49%
    if (progress < 70) return { main: '#FFD700', glow: 'rgba(255, 215, 0, 0.8)', name: 'GOLD' }; // GOLD: 50-69%
    if (progress < 80) return { main: '#85AA3F', glow: 'rgba(133, 170, 63, 0.8)', name: 'PLATINUM' }; // PLATINUM: 70-80% 미만
    if (progress < 100) return { main: '#00D9FF', glow: 'rgba(0, 217, 255, 0.9)', name: 'DIAMOND' }; // DIAMOND: 80-99%
    return { main: '#9333EA', glow: 'rgba(147, 51, 234, 1)', name: 'Hall of Fame' }; // Hall of Fame: 100%
  };

  const colors = getTierConfig(progress);

  // Generate particles
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      // Dynamic particle count based on progress stage - 저사양 PC 고려하여 수량 감소
      let particleCount = 6;
      let maxDistance = 30;
      let particleBaseSize = 1.5;
      let particleVariance = 1.5;
      let glowIntensity = 2;
      
      if (progress < 20) {
        // BRONZE: 0-19% - 최소한의 파티클
        particleCount = 4;
        maxDistance = 20;
        particleBaseSize = 0.8;
        particleVariance = 0.6;
        glowIntensity = 2;
      } else if (progress < 50) {
        // SILVER: 20-49% - 약간 증가
        particleCount = 6;
        maxDistance = 25;
        particleBaseSize = 1;
        particleVariance = 0.8;
        glowIntensity = 2.5;
      } else if (progress < 70) {
        // GOLD: 50-69% - 중간 수준
        particleCount = 8;
        maxDistance = 30;
        particleBaseSize = 1.2;
        particleVariance = 1;
        glowIntensity = 3;
      } else if (progress < 80) {
        // PLATINUM: 70-80% 미만 - 조금 더
        particleCount = 10;
        maxDistance = 35;
        particleBaseSize = 1.5;
        particleVariance = 1.2;
        glowIntensity = 3.5;
      } else if (progress < 100) {
        // DIAMOND: 80-99% - 최대 파티클 효과
        particleCount = 15;
        maxDistance = 40;
        particleBaseSize = 2;
        particleVariance = 1.5;
        glowIntensity = 4;
      } else {
        // GRADUATION: 100% - 화려한 효과
        particleCount = 20;
        maxDistance = 50;
        particleBaseSize = 2.5;
        particleVariance = 2;
        glowIntensity = 5;
      }

      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const distance = Math.random() * maxDistance + (maxDistance * 0.5);
        return {
          id: Date.now() + i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: Math.random() * particleVariance + particleBaseSize,
          duration: Math.random() * 1 + 1.5, // 1.5~2.5초로 빠르게
          delay: (i / particleCount) * 2.5, // 0~2.5초 사이로 고르게 분산
          glow: glowIntensity,
          rotation: Math.random() * 360,
        };
      });
      setParticles(newParticles);
    }
  }, [progress]);

  return (
    <div 
      className="relative w-full h-2 rounded-full overflow-visible group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Tooltip */}
      {isHovered && remainingTokens !== undefined && (
        <div 
          className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap z-50 ${
            effectiveTheme === 'dark' 
              ? 'bg-gray-900 text-gray-100 border border-gray-700' 
              : 'bg-white text-gray-900 border border-gray-300'
          }`}
          style={{
            boxShadow: effectiveTheme === 'dark' 
              ? '0 4px 12px rgba(0, 0, 0, 0.5)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          {remainingTokens.toLocaleString()} {tokenSymbol || 'tokens'} remaining
          <div 
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
              effectiveTheme === 'dark' ? 'bg-gray-900 border-r border-b border-gray-700' : 'bg-white border-r border-b border-gray-300'
            }`}
          />
        </div>
      )}
      
      {/* Background Track */}
      <div
        className={`absolute inset-0 rounded-full ${
          effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
        }`}
      />

      {/* Progress Fill */}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
        style={{
          width: `${progress}%`,
          background: progress >= 80 
            ? `linear-gradient(90deg, #00D9FF, #00F0FF, #40E0D0, #00D9FF)` // DIAMOND: 화려한 청록 그라데이션
            : `linear-gradient(90deg, ${colors.main}, ${colors.main}dd)`,
          boxShadow: progress >= 80
            ? `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow}60, 0 0 90px ${colors.glow}30` // DIAMOND: 더 강한 발광
            : `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}40`,
        }}
        initial={{ width: 0 }}
        animate={{ 
          width: `${progress}%`,
          ...(progress >= 80 ? { 
            boxShadow: [
              `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow}60, 0 0 90px ${colors.glow}30`,
              `0 0 40px ${colors.glow}, 0 0 80px ${colors.glow}80, 0 0 120px ${colors.glow}50`,
              `0 0 30px ${colors.glow}, 0 0 60px ${colors.glow}60, 0 0 90px ${colors.glow}30`,
            ]
          } : {})
        }}
        transition={{ 
          width: { duration: 1, ease: "easeOut" },
          ...(progress >= 80 ? { 
            boxShadow: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          } : {})
        }}
      >
        {/* Animated Shine Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: progress >= 80
              ? `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)` // DIAMOND: 더 밝은 샤인
              : `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: progress >= 80 ? 1.5 : 2, // DIAMOND: 더 빠른 샤인
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* DIAMOND 전용: 반짝이는 별 효과 */}
        {progress >= 80 && (
          <>
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: '20%', top: '50%', transform: 'translateY(-50%)' }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: '50%', top: '50%', transform: 'translateY(-50%)' }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 0.4,
              }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: '75%', top: '50%', transform: 'translateY(-50%)' }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 0.8,
              }}
            />
          </>
        )}
      </motion.div>

      {/* Particles at the end */}
      {progress > 0 && progress < 100 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${Math.min(progress, 100)}%` }}
        >
          {particles.map((particle) => (
            <div key={particle.id} className="absolute">
              {/* 메인 파티클 - 원 형태 */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: particle.size * 2,
                  height: particle.size * 2,
                  backgroundColor: colors.main,
                  boxShadow: `0 0 ${particle.size * particle.glow}px ${colors.main}, 0 0 ${particle.size * particle.glow * 2}px ${colors.glow}`,
                  willChange: 'transform, opacity',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: "easeOut",
                }}
              />
              
              {/* 약간의 꼬리 효과 - 과하지 않게 */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: particle.size * 1.2,
                  height: particle.size * 1.2,
                  willChange: 'transform, opacity',
                }}
                initial={{ x: 0, y: 0, opacity: 0.6, scale: 1 }}
                animate={{
                  x: particle.x * 0.5,
                  y: particle.y * 0.5,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{
                  duration: particle.duration * 0.7,
                  delay: particle.delay + 0.1,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: "easeOut",
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${colors.main}80, transparent)`,
                    filter: `blur(1px)`,
                  }}
                />
              </motion.div>
              
              {/* DIAMOND 전용: 추가 파티클 레이어 */}
              {progress >= 80 && (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: particle.size * 1.5,
                    height: particle.size * 1.5,
                    backgroundColor: '#FFFFFF',
                    boxShadow: `0 0 ${particle.size * 4}px #00D9FF, 0 0 ${particle.size * 6}px rgba(0, 217, 255, 0.6)`,
                    willChange: 'transform, opacity',
                  }}
                  initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
                  animate={{
                    x: particle.x * 1.2,
                    y: particle.y * 1.2,
                    opacity: 0,
                    scale: 0.2,
                  }}
                  transition={{
                    duration: particle.duration * 1.1,
                    delay: particle.delay + 0.05,
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: "easeOut",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Completion Burst */}
      {progress >= 100 && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${colors.main}80, transparent)`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </div>
  );
}