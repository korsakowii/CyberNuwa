'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

// Footer 链接接口
interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

// Footer 分组接口
interface FooterGroup {
  title: string;
  links: FooterLink[];
}

// Footer 属性接口
interface FooterProps {
  language?: 'zh' | 'en';
  showSocialLinks?: boolean;
  showNewsletter?: boolean;
  className?: string;
  compact?: boolean;
}

export default function Footer({ 
  language: propLanguage, 
  showSocialLinks = true,
  showNewsletter = false,
  className,
  compact = false
}: FooterProps = {}) {
  // 优先级：props > LanguageContext > 默认中文
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage || 'zh';

  // Footer 链接分组
  const footerGroups: FooterGroup[] = [
    {
      title: language === 'zh' ? '产品' : 'Product',
      links: [
        { label: language === 'zh' ? '智能体' : 'Agents', href: '/agents' },
        { label: language === 'zh' ? '叙事' : 'Narratives', href: '/narratives' },
        { label: language === 'zh' ? '角色' : 'Roles', href: '/roles' },
        { label: language === 'zh' ? '任务广场' : 'Task Square', href: '/task-square' },
        { label: language === 'zh' ? '训练中心' : 'Training Center', href: '/train-agent' }
      ]
    },
    {
      title: language === 'zh' ? '资源' : 'Resources',
      links: [
        { label: language === 'zh' ? '文档' : 'Documentation', href: '/docs', external: true },
        { label: language === 'zh' ? 'API' : 'API', href: '/api', external: true },
        { label: language === 'zh' ? '教程' : 'Tutorials', href: '/tutorials' },
        { label: language === 'zh' ? '示例' : 'Examples', href: '/examples' },
        { label: language === 'zh' ? '博客' : 'Blog', href: '/blog' }
      ]
    },
    {
      title: language === 'zh' ? '支持' : 'Support',
      links: [
        { label: language === 'zh' ? '帮助中心' : 'Help Center', href: '/help' },
        { label: language === 'zh' ? '联系我们' : 'Contact Us', href: '/contact' },
        { label: language === 'zh' ? '状态页面' : 'Status', href: '/status' },
        { label: language === 'zh' ? '反馈' : 'Feedback', href: '/feedback' },
        { label: language === 'zh' ? '社区' : 'Community', href: '/community' }
      ]
    },
    {
      title: language === 'zh' ? '公司' : 'Company',
      links: [
        { label: language === 'zh' ? '关于我们' : 'About Us', href: '/about' },
        { label: language === 'zh' ? '团队' : 'Team', href: '/team' },
        { label: language === 'zh' ? '招聘' : 'Careers', href: '/careers' },
        { label: language === 'zh' ? '新闻' : 'News', href: '/news' },
        { label: language === 'zh' ? '合作伙伴' : 'Partners', href: '/partners' }
      ]
    }
  ];

  // 社交媒体链接
  const socialLinks: FooterLink[] = [
    { label: 'GitHub', href: 'https://github.com/cybernuwa', external: true, icon: '🐙' },
    { label: 'Twitter', href: 'https://twitter.com/cybernuwa', external: true, icon: '🐦' },
    { label: 'Discord', href: 'https://discord.gg/cybernuwa', external: true, icon: '🎮' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/cybernuwa', external: true, icon: '💼' }
  ];

  // 处理链接点击
  const handleLinkClick = (link: FooterLink) => {
    if (link.external) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
    } else {
      // 这里可以添加内部导航逻辑
      console.log('Navigate to:', link.href);
    }
  };

  // 处理返回顶部
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={cn(
      'bg-gradient-to-t from-zinc-900 to-zinc-800/50 border-t border-zinc-700',
      'mt-20 pb-24 relative overflow-hidden',
      className
    )}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {!compact && (
          <>
            {/* 主要内容区域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {footerGroups.map((group, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {group.title}
                  </h3>
                  <ul className="space-y-2">
                    {group.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button
                          onClick={() => handleLinkClick(link)}
                          className={cn(
                            'text-zinc-400 hover:text-white transition-colors duration-200',
                            'text-sm hover:underline decoration-zinc-600 hover:decoration-white',
                            'flex items-center gap-2'
                          )}
                        >
                          {link.icon && <span>{link.icon}</span>}
                          {link.label}
                          {link.external && (
                            <span className="text-xs text-zinc-500">↗</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 分隔线 */}
            <div className="border-t border-zinc-700 mb-8" />

            {/* 社交媒体和新闻订阅 */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
              {/* 社交媒体链接 */}
              {showSocialLinks && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-400">
                    {language === 'zh' ? '关注我们' : 'Follow us'}
                  </span>
                  <div className="flex gap-3">
                    {socialLinks.map((link, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLinkClick(link)}
                        className="p-2 h-10 w-10 rounded-full hover:bg-zinc-700/50"
                        aria-label={link.label}
                      >
                        <span className="text-lg">{link.icon}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 新闻订阅 */}
              {showNewsletter && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-400">
                    {language === 'zh' ? '订阅更新' : 'Subscribe to updates'}
                  </span>
                  <Button variant="outline" size="sm">
                    {language === 'zh' ? '订阅' : 'Subscribe'}
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {/* 底部信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* 左侧信息 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            {/* 版权信息 */}
            <div className="text-zinc-400">
              © 2025 Cyber Nüwa.{' '}
              {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
            </div>

            {/* 版本信息 */}
            <div className="flex items-center gap-2">
              <Badge variant="outline" size="sm">
                v1.0.0
              </Badge>
              <span className="text-zinc-500">
                {language === 'zh' ? '测试版' : 'Beta'}
              </span>
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="flex items-center gap-6 text-sm">
            {/* 平台描述 */}
            <div className="text-zinc-500 hidden sm:block">
              {language === 'zh'
                ? 'AI智能体共创平台'
                : 'AI Agent Co-Creation Platform'}
            </div>

            {/* 返回顶部按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToTop}
              className="text-zinc-400 hover:text-white"
              aria-label={language === 'zh' ? '返回顶部' : 'Back to top'}
            >
              ↑
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
