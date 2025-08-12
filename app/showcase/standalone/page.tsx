'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Dropdown } from '../../../components/ui/dropdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import Footer from '../../../components/Footer';
import { TranslationControls } from '../../../components/TranslationControls';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

// 模块数据类型定义
interface ModuleData {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  icon: string;
  path: string;
  views: number;
  features: { zh: string; en: string }[];
  status: 'active' | 'beta' | 'coming-soon';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  contributors: number;
}

// 过滤选项
interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export default function StandaloneShowcase() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'views' | 'name' | 'updated' | 'difficulty'>('views');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 确保组件只在客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 本地翻译对象
  const localTranslations = {
    zh: {
      title: 'Cyber Nüwa 功能展示',
      subtitle: 'AI智能体共创平台',
      overview: '平台概览',
      overviewDesc: 'Cyber Nüwa是一个开放的AI智能体共创平台，集成了任务发布、智能体训练和社区协作。',
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
        'coming-soon': '即将推出',
      },
      searchPlaceholder: '搜索模块...',
      allStatus: '全部状态',
      allCategories: '全部分类',
      allDifficulties: '全部难度',
      sortByViews: '按访问量',
      sortByName: '按名称',
      sortByUpdated: '按更新时间',
      sortByDifficulty: '按难度',
      gridView: '网格视图',
      listView: '列表视图',
      difficulty: {
        beginner: '初级',
        intermediate: '中级',
        advanced: '高级'
      },
      category: {
        core: '核心功能',
        community: '社区功能',
        advanced: '高级功能',
        experimental: '实验功能'
      }
    },
    en: {
      title: 'Cyber Nüwa Feature Showcase',
      subtitle: 'AI Agent Co-Creation Platform',
      overview: 'Platform Overview',
      overviewDesc: 'Cyber Nüwa is an open platform for AI agent co-creation, integrating task publishing, agent training, and community collaboration.',
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
        'coming-soon': 'Coming Soon',
      },
      searchPlaceholder: 'Search modules...',
      allStatus: 'All Status',
      allCategories: 'All Categories',
      allDifficulties: 'All Difficulties',
      sortByViews: 'By Views',
      sortByName: 'By Name',
      sortByUpdated: 'By Updated',
      sortByDifficulty: 'By Difficulty',
      gridView: 'Grid View',
      listView: 'List View',
      difficulty: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      category: {
        core: 'Core Features',
        community: 'Community Features',
        advanced: 'Advanced Features',
        experimental: 'Experimental Features'
      }
    },
  };

  const t = localTranslations[language as keyof typeof localTranslations];

  // 模块数据
  const modules: ModuleData[] = [
    {
      id: 'launch-mission',
      title: { zh: '发布任务', en: 'Launch Mission' },
      description: {
        zh: '创建和发布新的AI任务，让智能体为你工作',
        en: 'Create and launch new AI tasks, let agents work for you',
      },
      icon: '🚀',
      path: '/launch-mission',
      views: 1247,
      features: [
        { zh: '任务模板', en: 'Task Templates' },
        { zh: '智能推荐', en: 'Smart Recommendations' },
        { zh: '实时状态', en: 'Real-time Status' },
      ],
      status: 'active',
      category: 'core',
      difficulty: 'beginner',
      lastUpdated: '2025-01-15',
      contributors: 5
    },
    {
      id: 'agents',
      title: { zh: '智能体孵化器', en: 'Agent Incubator' },
      description: {
        zh: '发现、创建和训练各种AI智能体',
        en: 'Discover, create and train various AI agents',
      },
      icon: '🤖',
      path: '/agents',
      views: 2156,
      features: [
        { zh: '智能体市场', en: 'Agent Marketplace' },
        { zh: '性能评估', en: 'Performance Evaluation' },
        { zh: '协作训练', en: 'Collaborative Training' },
      ],
      status: 'active',
      category: 'core',
      difficulty: 'intermediate',
      lastUpdated: '2025-01-14',
      contributors: 12
    },
    {
      id: 'task-square',
      title: { zh: '任务广场', en: 'Task Square' },
      description: {
        zh: '浏览和参与各种AI任务，获得经验值',
        en: 'Browse and participate in various AI tasks, earn XP',
      },
      icon: '🏆',
      path: '/task-square',
      views: 4123,
      features: [
        { zh: '任务分类', en: 'Task Categories' },
        { zh: '经验值系统', en: 'XP System' },
        { zh: '排行榜', en: 'Leaderboard' },
      ],
      status: 'active',
      category: 'community',
      difficulty: 'beginner',
      lastUpdated: '2025-01-13',
      contributors: 8
    },
    {
      id: 'wishes',
      title: { zh: '许愿池', en: 'Wish Pool' },
      description: {
        zh: '分享你的想法，让社区一起实现愿望',
        en: 'Share your ideas and let the community realize wishes together',
      },
      icon: '⭐',
      path: '/wishes',
      views: 3456,
      features: [
        { zh: '愿望投票', en: 'Wish Voting' },
        { zh: '社区支持', en: 'Community Support' },
        { zh: '实现追踪', en: 'Implementation Tracking' },
      ],
      status: 'active',
      category: 'community',
      difficulty: 'beginner',
      lastUpdated: '2025-01-12',
      contributors: 15
    },
    {
      id: 'narratives',
      title: { zh: '元叙事广场', en: 'Metanarrative Square' },
      description: {
        zh: '分享和讨论AI相关的故事和见解',
        en: 'Share and discuss AI-related stories and insights',
      },
      icon: '📚',
      path: '/narratives',
      views: 1892,
      features: [
        { zh: '故事分享', en: 'Story Sharing' },
        { zh: '社区讨论', en: 'Community Discussion' },
        { zh: '知识库', en: 'Knowledge Base' },
      ],
      status: 'active',
      category: 'community',
      difficulty: 'beginner',
      lastUpdated: '2025-01-11',
      contributors: 20
    },
    {
      id: 'roles',
      title: { zh: '角色系统', en: 'Role System' },
      description: {
        zh: '了解平台角色体系，提升你的权限和能力',
        en: 'Learn about the platform role system and enhance your permissions and capabilities',
      },
      icon: '👑',
      path: '/roles',
      views: 1567,
      features: [
        { zh: '角色升级', en: 'Role Progression' },
        { zh: '权限管理', en: 'Permission Management' },
        { zh: '成就系统', en: 'Achievement System' },
      ],
      status: 'active',
      category: 'advanced',
      difficulty: 'intermediate',
      lastUpdated: '2025-01-10',
      contributors: 6
    },
    {
      id: 'train-agent',
      title: { zh: '智能体训练', en: 'Agent Training' },
      description: {
        zh: '使用先进的训练技术创建和优化AI智能体',
        en: 'Create and optimize AI agents using advanced training techniques',
      },
      icon: '🎯',
      path: '/train-agent',
      views: 2341,
      features: [
        { zh: '模型选择', en: 'Model Selection' },
        { zh: '训练配置', en: 'Training Configuration' },
        { zh: '性能监控', en: 'Performance Monitoring' },
      ],
      status: 'beta',
      category: 'advanced',
      difficulty: 'advanced',
      lastUpdated: '2025-01-09',
      contributors: 3
    },
    {
      id: 'ai-marketplace',
      title: { zh: 'AI市场', en: 'AI Marketplace' },
      description: {
        zh: '交易和分享AI模型、数据集和解决方案',
        en: 'Trade and share AI models, datasets, and solutions',
      },
      icon: '🛒',
      path: '/marketplace',
      views: 892,
      features: [
        { zh: '模型交易', en: 'Model Trading' },
        { zh: '数据集共享', en: 'Dataset Sharing' },
        { zh: '解决方案市场', en: 'Solution Marketplace' },
      ],
      status: 'coming-soon',
      category: 'experimental',
      difficulty: 'intermediate',
      lastUpdated: '2025-01-08',
      contributors: 0
    }
  ];

  // 过滤和排序模块
  const filteredAndSortedModules = useMemo(() => {
    let filtered = modules.filter(module => {
      const matchesSearch = module.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.description[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.features.some(feature => feature[language].toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || module.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesDifficulty;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'views':
          aValue = a.views;
          bValue = b.views;
          break;
        case 'name':
          aValue = a.title[language].toLowerCase();
          bValue = b.title[language].toLowerCase();
          break;
        case 'updated':
          aValue = new Date(a.lastUpdated).getTime();
          bValue = new Date(b.lastUpdated).getTime();
          break;
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          aValue = difficultyOrder[a.difficulty];
          bValue = difficultyOrder[b.difficulty];
          break;
        default:
          aValue = a.views;
          bValue = b.views;
          break;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [modules, searchTerm, statusFilter, categoryFilter, difficultyFilter, sortBy, sortOrder, language]);

  // 计算统计数据
  const stats = {
    totalModules: modules.length,
    totalViews: modules.reduce((sum, module) => sum + module.views, 0),
    activeModules: modules.filter(m => m.status === 'active').length,
    betaModules: modules.filter(m => m.status === 'beta').length,
    comingSoonModules: modules.filter(m => m.status === 'coming-soon').length,
    totalContributors: modules.reduce((sum, module) => sum + module.contributors, 0)
  };

  // 事件处理
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
  };

  const handleDifficultyFilter = (value: string) => {
    setDifficultyFilter(value);
  };

  const handleSort = (field: 'views' | 'name' | 'updated' | 'difficulty') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleModuleClick = (modulePath: string, moduleId: string) => {
    // 模拟增加访问量
    const foundModule = modules.find(m => m.id === moduleId);
    if (foundModule) {
      foundModule.views += 1;
    }
    router.push(modulePath);
  };

  // 获取本地化文本
  const getLocalizedText = (key: string) => {
    return t[key as keyof typeof t] || key;
  };

  // 过滤选项
  const statusOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allStatus') },
    { value: 'active', label: t.status.active },
    { value: 'beta', label: t.status.beta },
    { value: 'coming-soon', label: t.status['coming-soon'] }
  ];

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allCategories') },
    { value: 'core', label: t.category.core },
    { value: 'community', label: t.category.community },
    { value: 'advanced', label: t.category.advanced },
    { value: 'experimental', label: t.category.experimental }
  ];

  const difficultyOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allDifficulties') },
    { value: 'beginner', label: t.difficulty.beginner },
    { value: 'intermediate', label: t.difficulty.intermediate },
    { value: 'advanced', label: t.difficulty.advanced }
  ];

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'success' as const, text: t.status.active },
      beta: { variant: 'warning' as const, text: t.status.beta },
      'coming-soon': { variant: 'outline' as const, text: t.status['coming-soon'] }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} size="sm">
        {config.text}
      </Badge>
    );
  };

  // 获取难度徽章
  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      beginner: { variant: 'success' as const, text: t.difficulty.beginner },
      intermediate: { variant: 'warning' as const, text: t.difficulty.intermediate },
      advanced: { variant: 'danger' as const, text: t.difficulty.advanced }
    };
    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig];
    return (
      <Badge variant={config.variant} size="sm">
        {config.text}
      </Badge>
    );
  };

  // 在客户端渲染之前显示加载状态
  if (!isClient) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
        {/* Header */}
        <header className="bg-zinc-800/50 border-b border-zinc-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CN</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">{getLocalizedText('title')}</h1>
                  <p className="text-sm text-zinc-400">{getLocalizedText('subtitle')}</p>
                </div>
              </div>

              {/* 语言切换器 */}
              <TranslationControls showSettings={false} />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 to-purple-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">{getLocalizedText('title')}</h2>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              {getLocalizedText('overviewDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://cyber-nuwa.vercel.app/">
                <Button variant="primary" size="lg">
                  {getLocalizedText('backToMain')}
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <Link href="http://localhost:3000">
                <Button variant="secondary" size="lg">
                  🚀 本地动态主站
                  <span className="ml-2">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 bg-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Card className="bg-zinc-800/50 border-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{stats.totalModules}</div>
                <div className="text-xs text-zinc-400">{getLocalizedText('totalModules')}</div>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">{stats.totalViews.toLocaleString()}</div>
                <div className="text-xs text-zinc-400">{getLocalizedText('totalViews')}</div>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.activeModules}</div>
                <div className="text-xs text-zinc-400">{getLocalizedText('activeFeatures')}</div>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">{stats.betaModules}</div>
                <div className="text-xs text-zinc-400">{getLocalizedText('betaFeatures')}</div>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">{stats.comingSoonModules}</div>
                <div className="text-xs text-zinc-400">{t.status['coming-soon']}</div>
              </Card>
              <Card className="bg-zinc-800/50 border-zinc-700 p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">{stats.totalContributors}</div>
                <div className="text-xs text-zinc-400">{language === 'zh' ? '贡献者' : 'Contributors'}</div>
              </Card>
            </div>
          </div>
        </section>

        {/* 控制面板 */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-zinc-800/50 border-zinc-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                {/* 搜索 */}
                <div className="lg:col-span-2">
                  <Input
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder={getLocalizedText('searchPlaceholder')}
                    className="w-full"
                  />
                </div>

                {/* 状态过滤 */}
                <Dropdown
                  trigger={
                    <Button variant="outline" className="w-full justify-between">
                      {statusFilter === 'all' 
                        ? getLocalizedText('allStatus')
                        : statusOptions.find(opt => opt.value === statusFilter)?.label
                      }
                      <span>▼</span>
                    </Button>
                  }
                  options={statusOptions.map(opt => ({
                    value: opt.value,
                    label: opt.label
                  }))}
                  onSelect={(option: { value: string | number; label: string }) => handleStatusFilter(option.value.toString())}
                  placement="bottom"
                  className="w-full"
                />

                {/* 分类过滤 */}
                <Dropdown
                  trigger={
                    <Button variant="outline" className="w-full justify-between">
                      {categoryFilter === 'all' 
                        ? getLocalizedText('allCategories')
                        : categoryOptions.find(opt => opt.value === categoryFilter)?.label
                      }
                      <span>▼</span>
                    </Button>
                  }
                  options={categoryOptions.map(opt => ({
                    value: opt.value,
                    label: opt.label
                  }))}
                  onSelect={(option: { value: string | number; label: string }) => handleCategoryFilter(option.value.toString())}
                  placement="bottom"
                  className="w-full"
                />

                {/* 难度过滤 */}
                <Dropdown
                  trigger={
                    <Button variant="outline" className="w-full justify-between">
                      {difficultyFilter === 'all' 
                        ? getLocalizedText('allDifficulties')
                        : difficultyOptions.find(opt => opt.value === difficultyFilter)?.label
                      }
                      <span>▼</span>
                    </Button>
                  }
                  options={difficultyOptions.map(opt => ({
                    value: opt.value,
                    label: opt.label
                  }))}
                  onSelect={(option: { value: string | number; label: string }) => handleDifficultyFilter(option.value.toString())}
                  placement="bottom"
                  className="w-full"
                />
              </div>

              {/* 排序和视图控制 */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">
                    {language === 'zh' ? '排序方式: ' : 'Sort by: '}
                  </span>
                  {(['views', 'name', 'updated', 'difficulty'] as const).map(field => (
                    <Button
                      key={field}
                      variant={sortBy === field ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => handleSort(field)}
                      className="text-xs"
                    >
                      {field === 'views' ? getLocalizedText('sortByViews') :
                       field === 'name' ? getLocalizedText('sortByName') :
                       field === 'updated' ? getLocalizedText('sortByUpdated') :
                       getLocalizedText('sortByDifficulty')}
                      {sortBy === field && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleViewModeChange('grid')}
                  >
                    📱 {getLocalizedText('gridView')}
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleViewModeChange('list')}
                  >
                    📋 {getLocalizedText('listView')}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-8 text-center">
              {getLocalizedText('explore')}
            </h3>
            
            {viewMode === 'grid' ? (
              /* 网格视图 */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedModules.map(module => (
                  <Card
                    key={module.id}
                    className="bg-zinc-800/50 border-zinc-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl">{module.icon}</div>
                        <div className="flex gap-2">
                          {getStatusBadge(module.status)}
                          {getDifficultyBadge(module.difficulty)}
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold mb-2">
                        {module.title[language]}
                      </h4>
                      <p className="text-zinc-400 text-sm mb-4">
                        {module.description[language]}
                      </p>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-zinc-500 mb-1">
                          <span>{getLocalizedText('views')}</span>
                          <span>{module.views.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((module.views / stats.totalViews) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-zinc-500 mb-2">
                          {getLocalizedText('features')}:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {module.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" size="sm">
                              {feature[language]}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                        <span>{language === 'zh' ? '更新: ' : 'Updated: '}{module.lastUpdated}</span>
                        <span>{language === 'zh' ? '贡献者: ' : 'Contributors: '}{module.contributors}</span>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => handleModuleClick(module.path, module.id)}
                      >
                        {getLocalizedText('tryNow')}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* 列表视图 */
              <div className="space-y-4">
                {filteredAndSortedModules.map(module => (
                  <Card
                    key={module.id}
                    className="bg-zinc-800/50 border-zinc-700 hover:border-blue-500 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{module.icon}</div>
                          <div>
                            <h4 className="text-lg font-semibold">
                              {module.title[language]}
                            </h4>
                            <p className="text-zinc-400 text-sm">
                              {module.description[language]}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(module.status)}
                          {getDifficultyBadge(module.difficulty)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('views')}: </span>
                          <span className="text-zinc-200">{module.views.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{language === 'zh' ? '分类: ' : 'Category: '}</span>
                          <span className="text-zinc-200">
                            {categoryOptions.find(opt => opt.value === module.category)?.label}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{language === 'zh' ? '更新: ' : 'Updated: '}</span>
                          <span className="text-zinc-200">{module.lastUpdated}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{language === 'zh' ? '贡献者: ' : 'Contributors: '}</span>
                          <span className="text-zinc-200">{module.contributors}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-wrap gap-1">
                          {module.features.map((feature, index) => (
                            <Badge key={index} variant="outline" size="sm">
                              {feature[language]}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleModuleClick(module.path, module.id)}
                        >
                          {getLocalizedText('tryNow')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 页脚 */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
