'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '../lib/utils';

// 星星类型定义
export type StarType = 'normal' | 'twinkling' | 'shooting' | 'pulsing';

// 星星配置接口
interface StarConfig {
  id: string;
  type: StarType;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  delay: number;
  duration: number;
}

// 组件属性接口
interface StarFieldProps {
  className?: string;
  starCount?: number;
  enabled?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  colors?: string[];
  animationSpeed?: 'slow' | 'normal' | 'fast';
  showShootingStars?: boolean;
  showTwinkling?: boolean;
  zIndex?: number;
}

export default function StarField({
  className,
  starCount = 100,
  enabled = true,
  intensity = 'medium',
  colors = ['#ffffff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080'],
  animationSpeed = 'normal',
  showShootingStars = true,
  showTwinkling = true,
  zIndex = 0
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [stars, setStars] = useState<StarConfig[]>([]);
  const [shootingStars, setShootingStars] = useState<StarConfig[]>([]);

  // 获取强度配置
  const getIntensityConfig = useCallback(() => {
    switch (intensity) {
      case 'low':
        return { opacity: 0.2, size: 1, count: Math.floor(starCount * 0.5) };
      case 'high':
        return { opacity: 0.6, size: 2, count: Math.floor(starCount * 1.5) };
      default:
        return { opacity: 0.4, size: 1.5, count: starCount };
    }
  }, [intensity, starCount]);

  // 获取动画速度配置
  const getAnimationSpeed = useCallback(() => {
    switch (animationSpeed) {
      case 'slow':
        return { twinkle: 6, shooting: 8, pulse: 4 };
      case 'fast':
        return { twinkle: 2, shooting: 3, pulse: 1.5 };
      default:
        return { twinkle: 4, shooting: 5, pulse: 2 };
    }
  }, [animationSpeed]);

  // 生成星星
  const generateStars = useCallback(() => {
    const config = getIntensityConfig();
    const newStars: StarConfig[] = [];

    for (let i = 0; i < config.count; i++) {
      const type: StarType = showTwinkling && Math.random() > 0.7 ? 'twinkling' : 'normal';
      const star: StarConfig = {
        id: `star-${i}`,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: config.size * (0.5 + Math.random() * 0.5),
        opacity: config.opacity * (0.5 + Math.random() * 0.5),
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: getAnimationSpeed().twinkle
      };
      newStars.push(star);
    }

    setStars(newStars);
  }, [getIntensityConfig, getAnimationSpeed, showTwinkling, colors]);

  // 生成流星
  const generateShootingStar = useCallback(() => {
    if (!showShootingStars) return;

    const shootingStar: StarConfig = {
      id: `shooting-${Date.now()}`,
      type: 'shooting',
      x: Math.random() * 100,
      y: 0,
      size: 2,
      opacity: 0.8,
      color: '#ffffff',
      delay: 0,
      duration: getAnimationSpeed().shooting
    };

    setShootingStars(prev => [...prev, shootingStar]);

    // 移除流星
    setTimeout(() => {
      setShootingStars(prev => prev.filter(star => star.id !== shootingStar.id));
    }, shootingStar.duration * 1000);
  }, [showShootingStars, getAnimationSpeed]);

  // 绘制星星
  const drawStars = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制静态星星
    stars.forEach(star => {
      ctx.save();
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = star.color;
      
      if (star.type === 'twinkling') {
        const time = Date.now() / 1000;
        const twinkle = Math.sin(time * (2 * Math.PI / star.duration) + star.delay) * 0.3 + 0.7;
        ctx.globalAlpha = star.opacity * twinkle;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    });

    // 绘制流星
    shootingStars.forEach(star => {
      const time = Date.now() / 1000;
      const progress = (time % star.duration) / star.duration;
      
      ctx.save();
      ctx.globalAlpha = star.opacity * (1 - progress);
      ctx.strokeStyle = star.color;
      ctx.lineWidth = star.size;
      ctx.lineCap = 'round';
      
      const startX = star.x;
      const startY = star.y;
      const endX = star.x + progress * 100;
      const endY = star.y + progress * 50;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.restore();
    });
  }, [stars, shootingStars]);

  // 动画循环
  const animate = useCallback(() => {
    drawStars();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawStars]);

  // 初始化
  useEffect(() => {
    if (!enabled) return;

    generateStars();
    
    // 设置画布尺寸
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [enabled, generateStars]);

  // 启动动画
  useEffect(() => {
    if (!enabled) return;

    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, animate]);

  // 流星生成定时器
  useEffect(() => {
    if (!enabled || !showShootingStars) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% 概率生成流星
        generateShootingStar();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [enabled, showShootingStars, generateShootingStar]);

  if (!enabled) return null;

  return (
    <div 
      className={cn('fixed inset-0 pointer-events-none overflow-hidden', className)}
      style={{ zIndex }}
    >
      {/* Canvas 星空背景 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />
      
      {/* 备用 CSS 星空效果 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #ddd, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: `twinkle ${getAnimationSpeed().twinkle}s ease-in-out infinite alternate`,
        }}
      />

      {/* 装饰性星星 */}
      <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
      <div className="absolute top-10 left-1/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" />
      <div className="absolute top-20 left-2/3 w-1 h-1 bg-purple-300 rounded-full animate-bounce" />

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
