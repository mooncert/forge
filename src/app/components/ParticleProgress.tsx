import { useEffect, useRef } from "react";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
  rotation: number;
  rotationSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  life: number;
}

interface ParticleProgressProps {
  value: number;
  className?: string;
}

export function ParticleProgress({ value, className }: ParticleProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Determine stage
    const getStage = () => {
      if (value <= 30) return 'seed';
      if (value <= 70) return 'growth';
      if (value <= 90) return 'hype';
      return 'launch';
    };
    
    const stage = getStage();
    const progressX = (value / 100) * rect.width;

    // Stage-specific configurations
    const stageConfig = {
      seed: {
        glowColor: 'rgba(94, 234, 212, 0.2)',
        glowRadius: 8,
        particleColor: { h: 174, s: 70, l: 60 }, // Teal
        sparkColors: [],
        sparkRate: 1, // no sparks
        particleRate: 1, // no particles
        sparkCount: 0,
        particleSpeed: 0,
      },
      growth: {
        glowColor: 'rgba(34, 211, 238, 0.4)',
        glowRadius: 12,
        particleColor: { h: 213, s: 85, l: 65 }, // Cyan/Blue
        sparkColors: [],
        sparkRate: 1, // no sparks
        particleRate: 0.92,
        sparkCount: 0,
        particleSpeed: 3,
      },
      hype: {
        glowColor: 'rgba(139, 92, 246, 0.6)',
        glowRadius: 18,
        particleColor: { h: 280, s: 80, l: 65 }, // Purple/Pink
        sparkColors: [],
        sparkRate: 1, // no sparks
        particleRate: 0.88,
        sparkCount: 0,
        particleSpeed: 4,
      },
      launch: {
        glowColor: 'rgba(250, 204, 21, 0.7)',
        glowRadius: 25,
        particleColor: { h: 35, s: 95, l: 60 }, // Gold/Orange
        sparkColors: ['#FACC15', '#FCD34D', '#FB923C', '#F97316', '#FF6B00'],
        sparkRate: 0.75,
        particleRate: 0.82,
        sparkCount: 6,
        particleSpeed: 6,
      },
    };
    
    const config = stageConfig[stage];

    function createSpark() {
      if (!canvas || config.sparkCount === 0) return;
      const rect = canvas.getBoundingClientRect();
      const progressX = (value / 100) * rect.width;
      
      for (let i = 0; i < config.sparkCount; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
        const speed = Math.random() * config.particleSpeed + config.particleSpeed;
        
        sparksRef.current.push({
          x: progressX,
          y: rect.height / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() * 3 + 1.5,
          color: config.sparkColors[Math.floor(Math.random() * config.sparkColors.length)],
        });
      }
    }

    function createParticle() {
      if (!canvas || stage === 'seed') return;
      const rect = canvas.getBoundingClientRect();
      const progressX = (value / 100) * rect.width;
      
      const particleCount = stage === 'launch' ? 2 : 1;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: progressX + (Math.random() - 0.5) * 6,
          y: rect.height / 2 + (Math.random() - 0.5) * 3,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -Math.random() * 2.5 - 1.5,
          life: 1,
          size: Math.random() * 2.5 + 1.5,
          hue: Math.random() * 30 - 15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
        });
      }
    }

    function createSparkle() {
      if (!canvas || stage === 'seed' || stage === 'growth') return;
      const rect = canvas.getBoundingClientRect();
      const progressX = (value / 100) * rect.width;
      
      sparklesRef.current.push({
        x: progressX - Math.random() * 15,
        y: rect.height / 2 + (Math.random() - 0.5) * rect.height * 0.8,
        life: 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Stage-specific trailing glow at progress end
      const progressX = (value / 100) * rect.width;
      if (progressX > 0 && stage !== 'seed') {
        const gradient = ctx.createRadialGradient(
          progressX, rect.height / 2, 0,
          progressX, rect.height / 2, config.glowRadius
        );
        gradient.addColorStop(0, config.glowColor);
        gradient.addColorStop(1, config.glowColor.replace(/[\d.]+\)$/, '0)'));
        ctx.fillStyle = gradient;
        ctx.fillRect(progressX - config.glowRadius, 0, config.glowRadius * 2, rect.height);
      }

      // Update and draw sparks
      sparksRef.current = sparksRef.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.15;
        s.vx *= 0.98;
        s.life -= 0.02;

        if (s.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = s.life;
        
        ctx.shadowBlur = stage === 'launch' ? 12 : 8;
        ctx.shadowColor = s.color;
        
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        return true;
      });

      // Update and draw sparkles
      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life -= 0.025;
        if (s.life <= 0) return false;

        const sparkleSize = 1.5 * s.life;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.life * Math.PI * 2);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${s.life * 0.6})`;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const x = Math.cos(angle) * sparkleSize;
          const y = Math.sin(angle) * sparkleSize;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.fill();
        ctx.restore();

        return true;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.99;
        p.life -= 0.012;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) return false;

        const hue = config.particleColor.h + p.hue;
        const alpha = p.life * 0.7;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(${hue}, ${config.particleColor.s}%, ${config.particleColor.l}%, ${alpha * 0.6})`;
        
        const particleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        particleGradient.addColorStop(0, `hsla(${hue}, ${config.particleColor.s}%, ${config.particleColor.l}%, ${alpha})`);
        particleGradient.addColorStop(0.6, `hsla(${hue}, ${config.particleColor.s - 5}%, ${config.particleColor.l - 5}%, ${alpha * 0.6})`);
        particleGradient.addColorStop(1, `hsla(${hue}, ${config.particleColor.s - 10}%, ${config.particleColor.l - 10}%, 0)`);
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(-p.size * 0.25, -p.size * 0.25, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        return true;
      });

      // Create effects based on stage
      if (value > 0 && stage !== 'seed' && Math.random() > config.sparkRate) {
        createSpark();
      }

      if (value > 0 && stage !== 'seed' && Math.random() > config.particleRate) {
        createParticle();
      }

      if ((stage === 'hype' || stage === 'launch') && Math.random() > 0.96) {
        createSparkle();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value]);

  return (
    <div className="relative" style={{ overflow: 'visible' }}>
      <Progress value={value} className={className} />
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{ 
          width: "100%", 
          height: "200%",
          top: "-50%",
          left: 0
        }}
      />
    </div>
  );
}