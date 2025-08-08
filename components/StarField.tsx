'use client'

export default function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* 星空背景 */}
      <div 
        className="absolute inset-0 opacity-30"
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
          animation: 'twinkle 4s ease-in-out infinite alternate'
        }}
      />
      
      {/* 流星效果 */}
      <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
      <div className="absolute top-10 left-1/3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" />
      <div className="absolute top-20 left-2/3 w-1 h-1 bg-purple-300 rounded-full animate-bounce" />
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
} 