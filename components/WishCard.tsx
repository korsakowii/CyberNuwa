'use client';

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

// 统一的SVG图标组件
const IconHeart = ({ filled = false, className = "" }) => (
  <svg 
    className={cn("w-4 h-4", className)} 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
    />
  </svg>
);

const IconComment = ({ className = "" }) => (
  <svg 
    className={cn("w-4 h-4", className)} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
    />
  </svg>
);

const IconEye = ({ className = "" }) => (
  <svg 
    className={cn("w-4 h-4", className)} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
    />
  </svg>
);

// 使用新的类型系统
interface Wish {
  id: number;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  author: { zh: string; en: string };
  status: 'idea' | 'in-progress' | 'completed' | 'pending' | 'processing';
  likes: number;
  comments: number;
  views: number;
  tags: { zh: string[]; en: string[] };
  createdAt: string;
}

interface WishCardProps {
  wish: Wish;
  index: number;
  onLike?: (wishId: number) => void;
  onComment?: (wishId: number) => void;
  onView?: (wishId: number) => void;
  className?: string;
}

export function WishCard({ 
  wish, 
  index, 
  onLike, 
  onComment, 
  onView, 
  className 
}: WishCardProps) {
  const { language } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);

  // 获取状态配置
  const getStatusConfig = (status: Wish['status']) => {
    const configs = {
      idea: { color: 'blue', text: language === 'zh' ? '想法' : 'Idea' },
      'in-progress': { color: 'yellow', text: language === 'zh' ? '进行中' : 'In Progress' },
      completed: { color: 'green', text: language === 'zh' ? '已完成' : 'Completed' },
      pending: { color: 'blue', text: language === 'zh' ? '待处理' : 'Pending' },
      processing: { color: 'yellow', text: language === 'zh' ? '处理中' : 'Processing' },
    };
    return configs[status] || configs.idea;
  };

  // 获取当前语言的文本
  const getLocalizedText = (textObj: { zh: string; en: string }) => {
    return textObj[language] || textObj.en;
  };

  // 处理点赞
  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(wish.id);
  };

  // 处理评论
  const handleComment = () => {
    onComment?.(wish.id);
  };

  // 处理查看
  const handleView = () => {
    onView?.(wish.id);
  };

  const statusConfig = getStatusConfig(wish.status);
  const title = getLocalizedText(wish.title);
  const description = getLocalizedText(wish.description);
  const author = getLocalizedText(wish.author);
  const tags = wish.tags[language] || wish.tags.en || [];

  return (
    <div
      className={cn(
        'group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:rotate-1',
        'bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm',
        'border border-zinc-700/50 hover:border-purple-400/50',
        'shadow-lg hover:shadow-2xl hover:shadow-purple-500/20',
        'rounded-lg p-6',
        className
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: 'fadeInUp 0.6s ease-out forwards',
      }}
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 浮动粒子 */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={statusConfig.color as any} className="text-xs">
                {statusConfig.text}
              </Badge>
              <span className="text-xs text-zinc-400">
                {language === 'zh' ? '作者: ' : 'By: '}{author}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <p className="text-zinc-300 text-sm line-clamp-3 mb-4">
          {description}
        </p>
        
        {/* 标签 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* 统计信息 */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <span>{language === 'zh' ? '点赞' : 'Likes'}: {wish.likes}</span>
            <span>{language === 'zh' ? '评论' : 'Comments'}: {wish.comments}</span>
            <span>{language === 'zh' ? '浏览' : 'Views'}: {wish.views}</span>
          </div>
          <span className="text-zinc-500">
            {new Date(wish.createdAt).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-700/50">
        <div className="flex items-center gap-2 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              'flex-1 transition-all duration-200 hover:bg-zinc-700/50',
              isLiked && 'text-red-400 hover:text-red-300'
            )}
          >
            <IconHeart 
              filled={isLiked} 
              className={cn(
                "mr-2 transition-colors duration-200",
                isLiked ? "text-red-400" : "text-zinc-400"
              )} 
            />
            {language === 'zh' ? '点赞' : 'Like'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            className="flex-1 hover:bg-zinc-700/50 transition-all duration-200"
          >
            <IconComment className="mr-2 text-zinc-400" />
            {language === 'zh' ? '评论' : 'Comment'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleView}
            className="flex-1 border-zinc-600 hover:bg-zinc-700/50 hover:border-zinc-500 transition-all duration-200"
          >
            <IconEye className="mr-2 text-zinc-400" />
            {language === 'zh' ? '查看' : 'View'}
          </Button>
        </div>
      </div>
    </div>
  );
}
