'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '../../locales/translations';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Dropdown } from '../../components/ui/dropdown';
import { Pagination, type PaginationInfo } from '../../components/ui/pagination';
import { 
  StatusBadge, 
  type StatusType,
  Footer,
  TranslationControls,
  ErrorBoundary 
} from '../../components';


// 智能体类型定义
interface Agent {
  id: number;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  creator: { zh: string; en: string };
  status: 'active' | 'training' | 'inactive' | 'maintenance';
  trainingProgress: number;
  tags: { zh: string[]; en: string[] };
  avatar: string;
  category: string;
  createdAt: string;
  lastUsed?: string;
  performance?: number;
}

// 过滤选项
interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export default function Agents() {
  const { language } = useLanguage();
  const t = translations[language].agents;

  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'created' | 'performance'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // 智能体数据
  const agents: Agent[] = [
    {
      id: 1,
      name: { zh: '创意助手', en: 'Creative Assistant' },
      description: {
        zh: '专门帮助用户进行创意构思和头脑风暴的智能体',
        en: 'An agent dedicated to helping users brainstorm and generate creative ideas',
      },
      creator: { zh: 'Alice', en: 'Alice' },
      status: 'active',
      trainingProgress: 85,
      tags: { zh: ['创意', '头脑风暴', '协作'], en: ['Creativity', 'Brainstorming', 'Collaboration'] },
      avatar: '🎨',
      category: 'creativity',
      createdAt: '2025-01-15',
      lastUsed: '2025-01-20',
      performance: 92
    },
    {
      id: 2,
      name: { zh: '代码审查员', en: 'Code Reviewer' },
      description: {
        zh: '自动审查代码质量，提供改进建议的智能体',
        en: 'An agent that automatically reviews code quality and provides improvement suggestions',
      },
      creator: { zh: 'Bob', en: 'Bob' },
      status: 'training',
      trainingProgress: 45,
      tags: { zh: ['编程', '代码审查', '质量保证'], en: ['Programming', 'Code Review', 'Quality Assurance'] },
      avatar: '💻',
      category: 'development',
      createdAt: '2025-01-14',
      performance: 78
    },
    {
      id: 3,
      name: { zh: '故事编织者', en: 'Story Weaver' },
      description: {
        zh: '根据用户提供的情节元素，生成完整故事的智能体',
        en: 'An agent that generates complete stories based on user-provided plot elements',
      },
      creator: { zh: 'Charlie', en: 'Charlie' },
      status: 'active',
      trainingProgress: 92,
      tags: { zh: ['写作', '故事创作', '文学'], en: ['Writing', 'Storytelling', 'Literature'] },
      avatar: '📚',
      category: 'writing',
      createdAt: '2025-01-13',
      lastUsed: '2025-01-19',
      performance: 95
    },
    {
      id: 4,
      name: { zh: '数据分析师', en: 'Data Analyst' },
      description: {
        zh: '自动分析数据并生成可视化报告的智能体',
        en: 'An agent that automatically analyzes data and generates visual reports',
      },
      creator: { zh: 'Diana', en: 'Diana' },
      status: 'inactive',
      trainingProgress: 100,
      tags: { zh: ['数据分析', '可视化', '报告'], en: ['Data Analysis', 'Visualization', 'Reporting'] },
      avatar: '📊',
      category: 'analytics',
      createdAt: '2025-01-12',
      lastUsed: '2025-01-18',
      performance: 88
    },
    {
      id: 5,
      name: { zh: '翻译专家', en: 'Translation Expert' },
      description: {
        zh: '多语言翻译和本地化服务的智能体',
        en: 'An agent providing multilingual translation and localization services',
      },
      creator: { zh: 'Eva', en: 'Eva' },
      status: 'active',
      trainingProgress: 78,
      tags: { zh: ['翻译', '多语言', '本地化'], en: ['Translation', 'Multilingual', 'Localization'] },
      avatar: '🌐',
      category: 'language',
      createdAt: '2025-01-11',
      lastUsed: '2025-01-20',
      performance: 91
    },
    {
      id: 6,
      name: { zh: '设计顾问', en: 'Design Consultant' },
      description: {
        zh: '提供设计建议和创意指导的智能体',
        en: 'An agent that provides design advice and creative guidance',
      },
      creator: { zh: 'Frank', en: 'Frank' },
      status: 'maintenance',
      trainingProgress: 100,
      tags: { zh: ['设计', '创意', '视觉'], en: ['Design', 'Creative', 'Visual'] },
      avatar: '🎭',
      category: 'design',
      createdAt: '2025-01-10',
      lastUsed: '2025-01-17',
      performance: 85
    }
  ];

  // 过滤和排序智能体
  const filteredAndSortedAgents = useMemo(() => {
          const filtered = agents.filter(agent => {
      const matchesSearch = agent.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.description[language].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || agent.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'progress':
          aValue = a.trainingProgress;
          bValue = b.trainingProgress;
          break;
        case 'created':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'performance':
          aValue = a.performance || 0;
          bValue = b.performance || 0;
          break;
        case 'name':
        default:
          aValue = a.name[language].toLowerCase();
          bValue = b.name[language].toLowerCase();
          break;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [agents, searchTerm, statusFilter, categoryFilter, sortBy, sortOrder, language]);

  // 分页
  const totalPages = Math.ceil(filteredAndSortedAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = filteredAndSortedAgents.slice(startIndex, startIndex + itemsPerPage);

  // 分页信息
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems: filteredAndSortedAgents.length,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };

  // 事件处理
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (field: 'name' | 'progress' | 'created' | 'performance') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // 智能体操作
  const handleViewDetails = (agentId: number) => {
    console.log('View agent details:', agentId);
  };

  const handleUseAgent = (agentId: number) => {
    console.log('Use agent:', agentId);
  };

  const handleEditAgent = (agentId: number) => {
    console.log('Edit agent:', agentId);
  };

  // 获取本地化文本
  const getLocalizedText = (key: string) => {
    const texts = {
      backHome: language === 'zh' ? '← 返回首页' : '← Back Home',
      title: t.title,
      subtitle: t.subtitle,
      trainNew: t.trainNew,
      total: t.stats.total,
      active: t.stats.active,
      training: t.stats.training,
      avgProgress: t.avgProgress,
      creatorBy: t.creatorBy,
      trainingProgress: t.trainingProgress,
      viewDetails: t.viewDetails,
      use: t.use,
      noAgents: language === 'zh' ? '还没有智能体' : 'No agents yet',
      noAgentsDesc: language === 'zh' ? '成为第一个训练智能体的用户吧！' : 'Be the first to train an agent!',
      startTraining: language === 'zh' ? '开始训练' : 'Start Training',
      searchPlaceholder: language === 'zh' ? '搜索智能体...' : 'Search agents...',
      allStatus: language === 'zh' ? '全部状态' : 'All Status',
      allCategories: language === 'zh' ? '全部分类' : 'All Categories',
      sortByName: language === 'zh' ? '按名称' : 'By Name',
      sortByProgress: language === 'zh' ? '按进度' : 'By Progress',
      sortByCreated: language === 'zh' ? '按创建时间' : 'By Created',
      sortByPerformance: language === 'zh' ? '按性能' : 'By Performance',
      foundAgents: language === 'zh' ? '共找到 ' : 'Found ',
      agents: language === 'zh' ? ' 个智能体' : ' agents'
    };
    return texts[key as keyof typeof texts] || key;
  };

  // 过滤选项
  const statusOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allStatus') },
    { value: 'active', label: language === 'zh' ? '活跃' : 'Active' },
    { value: 'training', label: language === 'zh' ? '训练中' : 'Training' },
    { value: 'inactive', label: language === 'zh' ? '非活跃' : 'Inactive' },
    { value: 'maintenance', label: language === 'zh' ? '维护中' : 'Maintenance' }
  ];

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allCategories') },
    { value: 'creativity', label: language === 'zh' ? '创意' : 'Creativity' },
    { value: 'development', label: language === 'zh' ? '开发' : 'Development' },
    { value: 'writing', label: language === 'zh' ? '写作' : 'Writing' },
    { value: 'analytics', label: language === 'zh' ? '分析' : 'Analytics' },
    { value: 'language', label: language === 'zh' ? '语言' : 'Language' },
    { value: 'design', label: language === 'zh' ? '设计' : 'Design' }
  ];

  // 统计数据
  const stats = {
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    training: agents.filter(a => a.status === 'training').length,
    avgProgress: Math.round(agents.reduce((acc, agent) => acc + agent.trainingProgress, 0) / agents.length)
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* 页面头部 */}
          <div className="text-center mb-12">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block"
            >
              {getLocalizedText('backHome')}
            </Link>
            <h1 className="text-4xl font-bold mb-4">{getLocalizedText('title')}</h1>
            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">{getLocalizedText('subtitle')}</p>
            <Link href="/train-agent">
              <Button variant="primary" size="lg" className="transform hover:scale-105">
                🚀 {getLocalizedText('trainNew')}
              </Button>
            </Link>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.total}</div>
              <div className="text-zinc-400">{getLocalizedText('total')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{stats.active}</div>
              <div className="text-zinc-400">{getLocalizedText('active')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.training}</div>
              <div className="text-zinc-400">{getLocalizedText('training')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stats.avgProgress}%</div>
              <div className="text-zinc-400">{getLocalizedText('avgProgress')}</div>
            </Card>
          </div>

          {/* 控制面板 */}
          <Card className="mb-8 p-6 bg-zinc-800/50 border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                onSelect={(option) => handleStatusFilter(option.value.toString())}
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
                onSelect={(option) => handleCategoryFilter(option.value.toString())}
                placement="bottom"
                className="w-full"
              />
            </div>

            {/* 排序控制 */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">
                  {language === 'zh' ? '排序方式: ' : 'Sort by: '}
                </span>
                {(['name', 'progress', 'created', 'performance'] as const).map(field => (
                  <Button
                    key={field}
                    variant={sortBy === field ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleSort(field)}
                    className="text-xs"
                  >
                    {field === 'name' ? getLocalizedText('sortByName') :
                     field === 'progress' ? getLocalizedText('sortByProgress') :
                     field === 'created' ? getLocalizedText('sortByCreated') :
                     getLocalizedText('sortByPerformance')}
                    {sortBy === field && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              <div className="text-sm text-zinc-400">
                {getLocalizedText('foundAgents')}
                <span className="text-white font-medium">{filteredAndSortedAgents.length}</span>
                {getLocalizedText('agents')}
              </div>
            </div>
          </Card>

          {/* 智能体网格 */}
          {paginatedAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* 智能体头部 */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{agent.avatar}</div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {agent.name[language]}
                          </h3>
                          <p className="text-sm text-zinc-400">
                            {getLocalizedText('creatorBy')} {agent.creator[language]}
                          </p>
                        </div>
                      </div>
                      <StatusBadge 
                        status={agent.status as StatusType} 
                        size="sm"
                      />
                    </div>

                    {/* 描述 */}
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                      {agent.description[language]}
                    </p>

                    {/* 训练进度 */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">{getLocalizedText('trainingProgress')}</span>
                        <span className="text-zinc-300">
                          {agent.trainingProgress}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${agent.trainingProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags[language].map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(agent.id)}
                        className="flex-1"
                      >
                        👁️ {getLocalizedText('viewDetails')}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUseAgent(agent.id)}
                        className="flex-1"
                      >
                        🚀 {getLocalizedText('use')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-16 bg-zinc-800/30 border-zinc-700">
              <div className="text-zinc-400">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">
                  {getLocalizedText('noAgents')}
                </h3>
                <p className="text-sm mb-6">
                  {getLocalizedText('noAgentsDesc')}
                </p>
                <Link href="/train-agent">
                  <Button variant="primary">
                    🚀 {getLocalizedText('startTraining')}
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                info={paginationInfo}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                showItemsPerPage={true}
                itemsPerPageOptions={[6, 9, 12, 18]}
                showTotal={false}
                showPageInfo={true}
              />
            </div>
          )}
        </div>

        {/* 页脚 */}
        <Footer />

        {/* 翻译控制 */}
        <TranslationControls showSettings={true} />
      </div>
    </ErrorBoundary>
  );
}
