'use client'

import React, { useRef, useEffect, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface ParticleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function ParticleButton({
  children,
  onClick,
  className = '',
  disabled = false
}: ParticleButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  const createParticles = (x: number, y: number): Particle[] => {
    const particles: Particle[] = []
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080']
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20
      const speed = 2 + Math.random() * 3
      const life = 60 + Math.random() * 60
      
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3
      })
    }
    
    return particles
  }

  const animateParticles = (particles: Particle[]) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!canvas || !ctx) {
      console.error('Canvas or context not available')
      return
    }

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 调试：绘制一个背景矩形来确认Canvas正在渲染
    ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 更新和绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      
      // 更新位置
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += 0.1 // 重力
      particle.life--

      // 绘制粒子
      const alpha = (particle.life / particle.maxLife) * 0.5 // 增加透明度，让效果更柔和
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // 移除死亡的粒子
      if (particle.life <= 0) {
        particles.splice(i, 1)
      }
    }

    // 继续动画或停止
    if (particles.length > 0) {
      animationRef.current = requestAnimationFrame(() => animateParticles(particles))
    } else {
      setIsAnimating(false)
    }
  }

  const animateParticlesWithCanvas = (particles: Particle[], targetCanvas: HTMLCanvasElement) => {
    const ctx = targetCanvas.getContext('2d')
    
    if (!ctx) {
      console.error('Canvas context not available')
      return
    }

    // 清除画布
    ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height)

    // 更新和绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      
      // 更新位置
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += 0.1 // 重力
      particle.life--

      // 绘制粒子
      const alpha = (particle.life / particle.maxLife) * 0.5 // 增加透明度，让效果更柔和
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // 移除死亡的粒子
      if (particle.life <= 0) {
        particles.splice(i, 1)
      }
    }

    // 继续动画或停止
    if (particles.length > 0) {
      animationRef.current = requestAnimationFrame(() => animateParticlesWithCanvas(particles, targetCanvas))
    } else {
      setIsAnimating(false)
      // 移除Canvas
      if (targetCanvas.parentNode) {
        targetCanvas.parentNode.removeChild(targetCanvas)
      }
    }
  }

  const handleClick = () => {
    if (disabled || isAnimating) return

    const button = buttonRef.current
    const canvas = canvasRef.current
    
    if (!button || !canvas) return

    // 获取按钮位置
    const rect = button.getBoundingClientRect()
    
    // 设置画布位置和大小
    canvas.style.position = 'fixed'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    
    // 设置Canvas的实际尺寸（像素）
    // 使用CSS尺寸，让浏览器自动处理设备像素比
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 计算按钮中心在Canvas坐标系中的位置
    // 现在Canvas坐标系和页面坐标系是1:1的
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2



    // 创建一个新的Canvas元素，避免React状态问题
    const newCanvas = document.createElement('canvas')
    newCanvas.style.position = 'fixed'
    newCanvas.style.top = '0'
    newCanvas.style.left = '0'
    newCanvas.style.width = '100vw'
    newCanvas.style.height = '100vh'
    newCanvas.style.pointerEvents = 'none'
    newCanvas.style.zIndex = '10000'
    newCanvas.width = window.innerWidth
    newCanvas.height = window.innerHeight
    
    // 添加到body
    document.body.appendChild(newCanvas)
    
    setIsAnimating(true)
    
    // 立即开始粒子动画
    const ctx = newCanvas.getContext('2d')
    if (ctx) {
      // 创建粒子
      const particles = createParticles(centerX, centerY)
      
      // 开始动画
      animateParticlesWithCanvas(particles, newCanvas)
    }



    // 执行点击回调
    onClick?.()
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'none'
        }}
      />
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={disabled || isAnimating}
        className={`${className} ${isAnimating ? 'pointer-events-none' : ''}`}
      >
        {children}
      </button>
    </>
  )
} 