'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
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

export default function StandaloneShowcase() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [pageViews, setPageViews] = useState(0);

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
      id: 'train-agent',
      title: { zh: '智能体训练', en: 'Agent Training' },
      description: { zh: '专业化的智能体训练和优化平台', en: 'Professional agent training and optimization platform' },
      icon: '🎯',
      path: '/train-agent',
      views: 892,
      features: [
        { zh: '自定义数据集', en: 'Custom Datasets' },
        { zh: '训练监控', en: 'Training Monitoring' },
        { zh: '模型优化', en: 'Model Optimization' }
      ],
      status: 'beta'
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
      id: 'roles',
      title: { zh: '用户角色', en: 'User Roles' },
      description: { zh: '探索不同的用户角色和权限系统', en: 'Explore different user roles and permission systems' },
      icon: '👥',
      path: '/roles',
      views: 1567,
      features: [
        { zh: '角色升级', en: 'Role Progression' },
        { zh: '权限管理', en: 'Permission Management' },
        { zh: '成就系统', en: 'Achievement System' }
      ],
      status: 'active'
    },
    {
      id: 'narratives',
      title: { zh: '元叙事广场', en: 'Metanarrative Square' },
      description: { zh: '分享和讨论AI相关的故事和见解', en: 'Share and discuss AI-related stories and insights' },
      icon: '📚',
      path: '/narratives',
      views: 2789,
      features: [
        { zh: '故事创作', en: 'Story Creation' },
        { zh: '社区讨论', en: 'Community Discussion' },
        { zh: '内容推荐', en: 'Content Recommendations' }
      ],
      status: 'active'
    },
    {
      id: 'task-square',
      title: { zh: '任务广场', en: 'Task Square' },
      description: { zh: '浏览和参与各种AI任务，获得奖励', en: 'Browse and participate in various AI tasks, earn rewards' },
      icon: '🏆',
      path: '/task-square',
      views: 4123,
      features: [
        { zh: '任务分类', en: 'Task Categories' },
        { zh: '奖励系统', en: 'Reward System' },
        { zh: '排行榜', en: 'Leaderboard' }
      ],
      status: 'active'
    }
  ];

  // 页面浏览量统计
  useEffect(() => {
    const currentViews = parseInt(localStorage.getItem('showcase-views') || '0');
    const newViews = currentViews + 1;
    localStorage.setItem('showcase-views', newViews.toString());
    setPageViews(newViews);
  }, []);

  // 增加模块浏览量
  const incrementModuleViews = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      module.views += 1;
      // 在实际应用中，这里会发送API请求到后端
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { zh: '活跃', en: 'Active', color: 'bg-green-500' },
      'beta': { zh: '测试版', en: 'Beta', color: 'bg-yellow-500' },
      'coming-soon': { zh: '即将推出', en: 'Coming Soon', color: 'bg-gray-500' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`${config.color} text-white text-xs px-2 py-1 rounded-full`}>
        {config[language]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {language === 'zh' ? 'CyberNuwa 功能展示' : 'CyberNuwa Feature Showcase'}
          </h1>
          <p className="text-xl text-zinc-300 mb-4">
            {language === 'zh' ? '探索AI智能体平台的完整功能' : 'Explore the complete features of the AI Agent Platform'}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-zinc-400">
            <span>👀 {language === 'zh' ? '页面浏览量' : 'Page Views'}: {pageViews}</span>
            <span>📅 {language === 'zh' ? '更新时间' : 'Updated'}: {new Date().toLocaleDateString()}</span>
          </div>
          
          {/* 语言切换器 */}
          <div className="mt-6 flex justify-center">
            <div className="flex bg-zinc-800/50 rounded-lg p-1">
              <button
                onClick={() => setLanguage('zh')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'zh' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700">
            <div className="text-3xl font-bold text-blue-400">{modules.length}</div>
            <div className="text-zinc-400">{language === 'zh' ? '功能模块' : 'Modules'}</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700">
            <div className="text-3xl font-bold text-green-400">
              {modules.reduce((sum, m) => sum + m.views, 0).toLocaleString()}
            </div>
            <div className="text-zinc-400">{language === 'zh' ? '总浏览量' : 'Total Views'}</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700">
            <div className="text-3xl font-bold text-purple-400">
              {modules.filter(m => m.status === 'active').length}
            </div>
            <div className="text-zinc-400">{language === 'zh' ? '活跃功能' : 'Active Features'}</div>
          </div>
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700">
            <div className="text-3xl font-bold text-yellow-400">
              {modules.filter(m => m.status === 'beta').length}
            </div>
            <div className="text-zinc-400">{language === 'zh' ? '测试功能' : 'Beta Features'}</div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{module.icon}</div>
                {getStatusBadge(module.status)}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {module.title[language]}
              </h3>
              
              <p className="text-zinc-400 mb-4 text-sm">
                {module.description[language]}
              </p>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                  <span>👀 {language === 'zh' ? '围观' : 'Views'}</span>
                  <span className="font-mono">{module.views.toLocaleString()}</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((module.views / 5000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-zinc-500 mb-2">
                  {language === 'zh' ? '主要功能' : 'Key Features'}:
                </div>
                <div className="flex flex-wrap gap-1">
                  {module.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded"
                    >
                      {feature[language]}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => incrementModuleViews(module.id)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {language === 'zh' ? '查看详情' : 'View Details'}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-zinc-400">
          <p className="mb-4">
            {language === 'zh' 
              ? '这是一个演示项目，展示了CyberNuwa AI智能体平台的核心功能模块。所有数据均为模拟数据。'
              : 'This is a demo project showcasing the core feature modules of the CyberNuwa AI Agent Platform. All data is simulated.'
            }
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span>🌐 {language === 'zh' ? '支持中英文切换' : 'Bilingual Support'}</span>
            <span>⚡ {language === 'zh' ? '响应式设计' : 'Responsive Design'}</span>
            <span>🎨 {language === 'zh' ? '现代化UI' : 'Modern UI'}</span>
          </div>
          <div className="mt-4 text-xs">
            © 2024 Cyber Nüwa. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </div>
        </div>
      </div>
    </div>
  );
} 