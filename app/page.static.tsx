'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ModuleData {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  icon: string;
  path: string;
  views: number;
  features: { zh: string; en: string }[];
  status: 'active' | 'beta' | 'coming-soon';
}

export default function StaticHomePage() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [pageViews, setPageViews] = useState(0);

  // 简化的翻译
  const t = {
    zh: {
      title: 'CyberNuwa 功能展示',
      subtitle: 'AI智能体共创平台',
      overview: '平台概览',
      overviewDesc: 'CyberNuwa是一个开放的AI智能体共创平台，集成了任务发布、智能体训练和社区协作。',
      explore: '探索平台模块',
      backToMain: '返回主站',
      totalModules: '核心模块',
      totalViews: '总访问量',
      activeFeatures: '活跃功能',
      betaFeatures: '测试功能',
      tryNow: '立即体验',
      views: '访问量',
      features: '功能特性',
      status: {
        active: '已上线',
        beta: '测试版',
        'coming-soon': '即将推出'
      }
    },
    en: {
      title: 'CyberNuwa Feature Showcase',
      subtitle: 'AI Agent Co-Creation Platform',
      overview: 'Platform Overview',
      overviewDesc: 'CyberNuwa is an open platform for AI agent co-creation, integrating task publishing, agent training, and community collaboration.',
      explore: 'Explore Platform Modules',
      backToMain: 'Back to Main Site',
      totalModules: 'Core Modules',
      totalViews: 'Total Views',
      activeFeatures: 'Active Features',
      betaFeatures: 'Beta Features',
      tryNow: 'Try Now',
      views: 'Views',
      features: 'Features',
      status: {
        active: 'Active',
        beta: 'Beta',
        'coming-soon': 'Coming Soon'
      }
    }
  };

  // 模拟数据 - 包含浏览量
  const modules: ModuleData[] = [
    {
      id: 'launch-mission',
      title: { zh: '发布任务', en: 'Launch Mission' },
      description: { zh: '创建和发布新的AI任务，让智能体为你工作', en: 'Create and launch new AI tasks, let agents work for you' },
      icon: '🚀',
      path: '/launch-mission',
      views: 1247,
      features: [
        { zh: '任务模板', en: 'Task Templates' },
        { zh: '智能推荐', en: 'Smart Recommendations' },
        { zh: '实时状态', en: 'Real-time Status' }
      ],
      status: 'active'
    },
    {
      id: 'agents',
      title: { zh: '智能体孵化器', en: 'Agent Incubator' },
      description: { zh: '发现、创建和训练各种AI智能体', en: 'Discover, create and train various AI agents' },
      icon: '🤖',
      path: '/agents',
      views: 2156,
      features: [
        { zh: '智能体市场', en: 'Agent Marketplace' },
        { zh: '性能评估', en: 'Performance Evaluation' },
        { zh: '协作训练', en: 'Collaborative Training' }
      ],
      status: 'active'
    },
    {
      id: 'task-square',
      title: { zh: '任务广场', en: 'Task Square' },
      description: { zh: '浏览和参与各种AI任务，获得经验值', en: 'Browse and participate in various AI tasks, earn XP' },
      icon: '🏆',
      path: '/task-square',
      views: 4123,
      features: [
        { zh: '任务分类', en: 'Task Categories' },
        { zh: '经验值系统', en: 'XP System' },
        { zh: '排行榜', en: 'Leaderboard' }
      ],
      status: 'active'
    },
    {
      id: 'wishes',
      title: { zh: '许愿池', en: 'Wish Pool' },
      description: { zh: '分享你的想法，让社区一起实现愿望', en: 'Share your ideas and let the community realize wishes together' },
      icon: '⭐',
      path: '/wishes',
      views: 3456,
      features: [
        { zh: '愿望投票', en: 'Wish Voting' },
        { zh: '社区支持', en: 'Community Support' },
        { zh: '实现追踪', en: 'Implementation Tracking' }
      ],
      status: 'active'
    },
    {
      id: 'narratives',
      title: { zh: '元叙事广场', en: 'Metanarrative Square' },
      description: { zh: '分享和讨论AI相关的故事和见解', en: 'Share and discuss AI-related stories and insights' },
      icon: '📚',
      path: '/narratives',
      views: 1892,
      features: [
        { zh: '故事分享', en: 'Story Sharing' },
        { zh: '社区讨论', en: 'Community Discussion' },
        { zh: '知识库', en: 'Knowledge Base' }
      ],
      status: 'active'
    }
  ];

  // 计算统计数据
  const totalViews = modules.reduce((sum, module) => sum + module.views, 0);
  const activeModules = modules.filter(m => m.status === 'active').length;
  const betaModules = modules.filter(m => m.status === 'beta').length;

  // 模拟页面访问量增加
  useEffect(() => {
    const storedViews = localStorage.getItem('showcase-views') || '0';
    const currentViews = parseInt(storedViews) + 1;
    localStorage.setItem('showcase-views', currentViews.toString());
    setPageViews(currentViews);
  }, []);

  const incrementModuleViews = (moduleId: string) => {
    // 客户端模拟增加访问量
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      module.views += 1;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-500', text: t[language].status.active },
      beta: { color: 'bg-yellow-500', text: t[language].status.beta },
      'coming-soon': { color: 'bg-gray-500', text: t[language].status['coming-soon'] }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">{t[language].title}</h1>
                <p className="text-sm text-zinc-400">{t[language].subtitle}</p>
              </div>
            </div>
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center space-x-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors"
              >
                <span>{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
                <span>{language === 'zh' ? '中文' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">{t[language].title}</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            {t[language].overviewDesc}
          </p>
          <Link 
            href="https://cyber-nuwa.vercel.app/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t[language].backToMain}
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{modules.length}</div>
              <div className="text-sm text-zinc-400">{t[language].totalModules}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{totalViews.toLocaleString()}</div>
              <div className="text-sm text-zinc-400">{t[language].totalViews}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{activeModules}</div>
              <div className="text-sm text-zinc-400">{t[language].activeFeatures}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{betaModules}</div>
              <div className="text-sm text-zinc-400">{t[language].betaFeatures}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-8 text-center">{t[language].explore}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div key={module.id} className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{module.icon}</div>
                  {getStatusBadge(module.status)}
                </div>
                
                <h4 className="text-lg font-semibold mb-2">{module.title[language]}</h4>
                <p className="text-zinc-400 text-sm mb-4">{module.description[language]}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-zinc-500 mb-1">
                    <span>{t[language].views}</span>
                    <span>{module.views.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((module.views / totalViews) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-zinc-500 mb-2">{t[language].features}:</div>
                  <div className="flex flex-wrap gap-1">
                    {module.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-zinc-700 rounded text-xs">
                        {feature[language]}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => incrementModuleViews(module.id)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t[language].tryNow}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 自定义Footer - 响应语言切换 */}
      <footer className="bg-zinc-800/50 border-t border-zinc-700 mt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版权信息 */}
            <div className="text-zinc-400 text-sm">
              © 2024 Cyber Nüwa. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
            </div>

            {/* 右侧平台描述 */}
            <div className="text-zinc-500 text-xs">
              {language === 'zh' ? 'AI智能体共创平台' : 'AI Agent Co-Creation Platform'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 