'use client'

import React, { useState } from 'react'

interface SimpleParticleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function SimpleParticleButton({
  children,
  onClick,
  className = '',
  disabled = false
}: SimpleParticleButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (disabled || isAnimating) return
    
    setIsAnimating(true)
    onClick?.()
    
    // 重置动画状态
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <div>
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-center">
          <div className="text-cyan-400 text-4xl animate-pulse font-bold">✨</div>
        </div>
      )}
      <button
        onClick={handleClick}
        disabled={disabled || isAnimating}
        className={`${className} ${isAnimating ? 'pointer-events-none' : ''}`}
      >
        {children}
      </button>
    </div>
  )
} 