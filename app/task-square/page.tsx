'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
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
import { cn } from '../../lib/utils';

// 任务类型定义
interface Task {
  id: number;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  creator: { zh: string; en: string };
  status: 'open' | 'in-progress' | 'completed' | 'cancelled' | 'pending';
  tags: { zh: string[]; en: string[] };
  progress: number;
  participants: number;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  assignee: string;
  reward: string;
  views: number;
  category: string;
  createdAt: string;
  estimatedHours?: number;
  skills?: string[];
}

// 过滤选项
interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export default function TaskSquare() {
  const { language } = useLanguage();

  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'progress' | 'deadline' | 'priority' | 'created'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // 任务数据
  const [tasks, setTasks] = useState<Task[]>([]);

  // 本地翻译对象
  const localTranslations = {
    zh: {
      title: '任务广场',
      subtitle: '浏览所有公开任务与进展',
      backHome: '← 返回首页',
      total: '总任务数',
      open: '招募中',
      inProgress: '进行中',
      completed: '已完成',
      closed: '已关闭',
      pending: '待处理',
      high: '高优先级',
      medium: '中优先级',
      low: '低优先级',
      reward: '奖励',
      participants: '参与者',
      assignee: '负责人',
      creator: '创建者',
      experience: '经验值',
      addTask: '发布任务',
      totalTasks: '总任务数',
      status: '状态',
      priority: '优先级',
      progress: '进度',
      deadline: '截止日期',
      viewProgress: '查看进度',
      viewResult: '查看结果',
      details: '详情',
      emptyTaskSquare: '任务广场还是空的',
      beFirst: '成为第一个发布任务的用户吧！',
      launchFirstTask: '发布第一个任务',
      searchPlaceholder: '搜索任务...',
      allStatus: '全部状态',
      allPriorities: '全部优先级',
      allCategories: '全部分类',
      sortByTitle: '按标题',
      sortByProgress: '按进度',
      sortByDeadline: '按截止日期',
      sortByPriority: '按优先级',
      sortByCreated: '按创建时间',
      foundTasks: '共找到 ',
      tasks: ' 个任务',
      estimatedHours: '预估工时',
      skills: '所需技能',
      category: '分类'
    },
    en: {
      title: 'Task Square',
      subtitle: 'Browse all public tasks and progress',
      backHome: '← Back to Home',
      total: 'Total Tasks',
      open: 'Open',
      inProgress: 'In Progress',
      completed: 'Completed',
      closed: 'Closed',
      pending: 'Pending',
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority',
      reward: 'Reward',
      participants: 'Participants',
      assignee: 'Assignee',
      creator: 'Creator',
      experience: 'Experience',
      addTask: 'Add Task',
      totalTasks: 'Total Tasks',
      status: 'Status',
      priority: 'Priority',
      progress: 'Progress',
      deadline: 'Deadline',
      viewProgress: 'View Progress',
      viewResult: 'View Result',
      details: 'Details',
      emptyTaskSquare: 'Task Square is empty',
      beFirst: 'Be the first to post a task!',
      launchFirstTask: 'Post First Task',
      searchPlaceholder: 'Search tasks...',
      allStatus: 'All Status',
      allPriorities: 'All Priorities',
      allCategories: 'All Categories',
      sortByTitle: 'By Title',
      sortByProgress: 'By Progress',
      sortByDeadline: 'By Deadline',
      sortByPriority: 'By Priority',
      sortByCreated: 'By Created',
      foundTasks: 'Found ',
      tasks: ' tasks',
      estimatedHours: 'Est. Hours',
      skills: 'Skills Required',
      category: 'Category'
    },
  };

  const t = localTranslations[language as keyof typeof localTranslations];

  // 初始化任务数据
  useEffect(() => {
    const initialTasks: Task[] = [
      {
        id: 1,
        title: { zh: 'AI 写作助手开发', en: 'AI Writing Assistant Development' },
        description: {
          zh: '开发一个能够辅助用户写作、润色和生成内容的智能体。',
          en: 'Develop an agent that assists users in writing, polishing, and generating content.',
        },
        creator: { zh: 'Alice', en: 'Alice' },
        status: 'in-progress',
        tags: {
          zh: ['AI', '写作', '内容生成'],
          en: ['AI', 'Writing', 'Content Generation'],
        },
        progress: 60,
        participants: 12,
        priority: 'high',
        deadline: '2025-07-01',
        assignee: 'Alice',
        reward: '6000-8000 XP',
        views: 1247,
        category: 'development',
        createdAt: '2025-01-15',
        estimatedHours: 120,
        skills: ['Python', 'NLP', 'React']
      },
      {
        id: 2,
        title: { zh: '多语言翻译工具', en: 'Multilingual Translation Tool' },
        description: {
          zh: '构建一个支持多语言实时翻译的智能体，适用于文本和语音。',
          en: 'Build an agent that supports real-time multilingual translation for text and speech.',
        },
        creator: { zh: 'Bob', en: 'Bob' },
        status: 'completed',
        tags: {
          zh: ['翻译', '多语言', '语音'],
          en: ['Translation', 'Multilingual', 'Speech'],
        },
        progress: 100,
        participants: 8,
        priority: 'medium',
        deadline: '2025-06-15',
        assignee: 'Bob',
        reward: '4000-6000 XP',
        views: 892,
        category: 'language',
        createdAt: '2025-01-14',
        estimatedHours: 80,
        skills: ['JavaScript', 'Translation API', 'WebRTC']
      },
      {
        id: 3,
        title: {
          zh: '智能体协作平台优化',
          en: 'Agent Collaboration Platform Optimization',
        },
        description: {
          zh: '优化平台性能，提升多智能体协作效率和用户体验。',
          en: 'Optimize platform performance to improve multi-agent collaboration efficiency and user experience.',
        },
        creator: { zh: 'Charlie', en: 'Charlie' },
        status: 'pending',
        tags: {
          zh: ['平台', '协作', '优化'],
          en: ['Platform', 'Collaboration', 'Optimization'],
        },
        progress: 0,
        participants: 5,
        priority: 'low',
        deadline: '2025-08-01',
        assignee: 'Charlie',
        reward: '2500-3500 XP',
        views: 567,
        category: 'platform',
        createdAt: '2025-01-13',
        estimatedHours: 60,
        skills: ['Performance', 'System Design', 'Monitoring']
      },
      {
        id: 4,
        title: { zh: '创意设计助手', en: 'Creative Design Assistant' },
        description: {
          zh: '开发一个能够生成创意设计、图标和视觉元素的智能体。',
          en: 'Develop an agent that generates creative designs, icons, and visual elements.',
        },
        creator: { zh: 'Diana', en: 'Diana' },
        status: 'open',
        tags: {
          zh: ['设计', '创意', '视觉'],
          en: ['Design', 'Creative', 'Visual'],
        },
        progress: 0,
        participants: 3,
        priority: 'medium',
        deadline: '2025-07-15',
        assignee: '',
        reward: '3500-5000 XP',
        views: 234,
        category: 'design',
        createdAt: '2025-01-12',
        estimatedHours: 90,
        skills: ['Design Tools', 'AI Art', 'UI/UX']
      },
      {
        id: 5,
        title: { zh: '数据分析报告生成器', en: 'Data Analysis Report Generator' },
        description: {
          zh: '创建一个能够自动分析数据并生成专业报告的智能体。',
          en: 'Create an agent that automatically analyzes data and generates professional reports.',
        },
        creator: { zh: 'Eva', en: 'Eva' },
        status: 'in-progress',
        tags: {
          zh: ['数据分析', '报告', '自动化'],
          en: ['Data Analysis', 'Reporting', 'Automation'],
        },
        progress: 75,
        participants: 6,
        priority: 'high',
        deadline: '2025-06-30',
        assignee: 'Eva',
        reward: '5000-7000 XP',
        views: 456,
        category: 'analytics',
        createdAt: '2025-01-11',
        estimatedHours: 100,
        skills: ['Python', 'Pandas', 'Data Visualization']
      }
    ];
    setTasks(initialTasks);
  }, []);

  // 过滤和排序任务
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description[language].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'deadline':
          aValue = new Date(a.deadline).getTime();
          bValue = new Date(b.deadline).getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'created':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'title':
        default:
          aValue = a.title[language].toLowerCase();
          bValue = b.title[language].toLowerCase();
          break;
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy, sortOrder, language]);

  // 分页
  const totalPages = Math.ceil(filteredAndSortedTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = filteredAndSortedTasks.slice(startIndex, startIndex + itemsPerPage);

  // 分页信息
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems: filteredAndSortedTasks.length,
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

  const handlePriorityFilter = (value: string) => {
    setPriorityFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (field: 'title' | 'progress' | 'deadline' | 'priority' | 'created') => {
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

  // 任务操作
  const handleViewProgress = (taskId: number) => {
    console.log('View task progress:', taskId);
  };

  const handleViewResult = (taskId: number) => {
    console.log('View task result:', taskId);
  };

  const handleViewDetails = (taskId: number) => {
    console.log('View task details:', taskId);
  };

  // 获取本地化文本
  const getLocalizedText = (key: string) => {
    return t[key as keyof typeof t] || key;
  };

  // 过滤选项
  const statusOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allStatus') },
    { value: 'open', label: getLocalizedText('open') },
    { value: 'in-progress', label: getLocalizedText('inProgress') },
    { value: 'completed', label: getLocalizedText('completed') },
    { value: 'pending', label: getLocalizedText('pending') }
  ];

  const priorityOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allPriorities') },
    { value: 'high', label: getLocalizedText('high') },
    { value: 'medium', label: getLocalizedText('medium') },
    { value: 'low', label: getLocalizedText('low') }
  ];

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allCategories') },
    { value: 'development', label: language === 'zh' ? '开发' : 'Development' },
    { value: 'design', label: language === 'zh' ? '设计' : 'Design' },
    { value: 'analytics', label: language === 'zh' ? '分析' : 'Analytics' },
    { value: 'language', label: language === 'zh' ? '语言' : 'Language' },
    { value: 'platform', label: language === 'zh' ? '平台' : 'Platform' }
  ];

  // 统计数据
  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    totalParticipants: tasks.reduce((acc, task) => acc + task.participants, 0)
  };

  // 格式化经验值
  const formatExperience = (experience: string, language: string) => {
    const match = experience.match(/(\d+)(-(\d+))?XP?/);
    if (!match) {
      return experience;
    }
    const min = parseInt(match[1]!, 10);
    const max = match[3] ? parseInt(match[3]!, 10) : undefined;
    if (language === 'en') {
      return max ? `${min}-${max} XP` : `${min} XP`;
    }
    return max ? `${min}-${max} ${getLocalizedText('experience')}` : `${min} ${getLocalizedText('experience')}`;
  };

  // 如果没有任务，显示空状态
  if (tasks.length === 0) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-10 text-center">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block"
            >
              {getLocalizedText('backHome')}
            </Link>
            <h1 className="text-4xl font-bold mb-4">{getLocalizedText('title')}</h1>
            <p className="text-zinc-400 mb-6">{getLocalizedText('subtitle')}</p>
            <Card className="bg-zinc-800/30 border-zinc-700 p-12">
              <p className="text-xl text-zinc-300 mb-4">{getLocalizedText('emptyTaskSquare')}</p>
              <p className="text-zinc-400 mb-6">{getLocalizedText('beFirst')}</p>
              <Link href="/launch-mission">
                <Button variant="primary" size="lg" className="transform hover:scale-105">
                  🚀 {getLocalizedText('launchFirstTask')}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

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
            <Link href="/launch-mission">
              <Button variant="primary" size="lg" className="transform hover:scale-105">
                🚀 {getLocalizedText('addTask')}
              </Button>
            </Link>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.total}</div>
              <div className="text-zinc-400">{getLocalizedText('totalTasks')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.inProgress}</div>
              <div className="text-zinc-400">{getLocalizedText('inProgress')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stats.completed}</div>
              <div className="text-zinc-400">{getLocalizedText('completed')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalParticipants}</div>
              <div className="text-zinc-400">{getLocalizedText('participants')}</div>
            </Card>
          </div>

          {/* 控制面板 */}
          <Card className="mb-8 p-6 bg-zinc-800/50 border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

              {/* 优先级过滤 */}
              <Dropdown
                trigger={
                  <Button variant="outline" className="w-full justify-between">
                    {priorityFilter === 'all' 
                      ? getLocalizedText('allPriorities')
                      : priorityOptions.find(opt => opt.value === priorityFilter)?.label
                    }
                    <span>▼</span>
                  </Button>
                }
                options={priorityOptions.map(opt => ({
                  value: opt.value,
                  label: opt.label
                }))}
                onSelect={(option: { value: string | number; label: string }) => handlePriorityFilter(option.value.toString())}
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
            </div>

            {/* 排序控制 */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">
                  {language === 'zh' ? '排序方式: ' : 'Sort by: '}
                </span>
                {(['title', 'progress', 'deadline', 'priority', 'created'] as const).map(field => (
                  <Button
                    key={field}
                    variant={sortBy === field ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleSort(field)}
                    className="text-xs"
                  >
                    {field === 'title' ? getLocalizedText('sortByTitle') :
                     field === 'progress' ? getLocalizedText('sortByProgress') :
                     field === 'deadline' ? getLocalizedText('sortByDeadline') :
                     field === 'priority' ? getLocalizedText('sortByPriority') :
                     getLocalizedText('sortByCreated')}
                    {sortBy === field && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              <div className="text-sm text-zinc-400">
                {getLocalizedText('foundTasks')}
                <span className="text-white font-medium">{filteredAndSortedTasks.length}</span>
                {getLocalizedText('tasks')}
              </div>
            </div>
          </Card>

          {/* 任务列表 */}
          <div className="space-y-6 mb-8">
            {paginatedTasks.map(task => (
              <Card
                key={task.id}
                className="bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* 任务信息 */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold">
                          {task.title[language]}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {/* 状态标签 */}
                          <StatusBadge 
                            status={task.status as StatusType} 
                            size="sm"
                          />
                          {/* 优先级标签 */}
                          <Badge 
                            variant={task.priority === 'high' ? 'danger' : 
                                    task.priority === 'medium' ? 'warning' : 'primary'}
                            size="sm"
                          >
                            {getLocalizedText(task.priority)}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-zinc-300 mb-4">
                        {task.description[language]}
                      </p>
                      
                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {task.tags[language].map((tag, index) => (
                          <Badge key={index} variant="outline" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* 任务详情 */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('creator')}: </span>
                          <span className="text-zinc-200">{task.creator[language]}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('assignee')}: </span>
                          <span className="text-zinc-200">{task.assignee || '-'}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('deadline')}: </span>
                          <span className="text-zinc-200">{task.deadline}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('reward')}: </span>
                          <span className="text-zinc-200">
                            {formatExperience(task.reward, language)}
                          </span>
                        </div>
                      </div>

                      {/* 额外信息 */}
                      {task.estimatedHours && (
                        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                          <span>
                            {getLocalizedText('estimatedHours')}: {task.estimatedHours}h
                          </span>
                          {task.skills && task.skills.length > 0 && (
                            <span>
                              {getLocalizedText('skills')}: {task.skills.join(', ')}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* 右侧信息 */}
                    <div className="flex flex-col items-end gap-4">
                      {/* 进度条 */}
                      <div className="text-right">
                        <div className="text-sm text-zinc-400 mb-1">{getLocalizedText('progress')}</div>
                        <div className="w-24 bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-zinc-300 mt-1">{task.progress}%</div>
                      </div>
                      
                      {/* 参与者和浏览量 */}
                      <div className="text-right text-sm">
                        <div className="text-zinc-400">
                          {getLocalizedText('participants')}: <span className="text-zinc-200">{task.participants}</span>
                        </div>
                        <div className="text-zinc-400">
                          Views: <span className="text-zinc-200">{task.views}</span>
                        </div>
                      </div>
                      
                      {/* 操作按钮 */}
                      <div className="flex gap-2">
                        {task.status === 'in-progress' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleViewProgress(task.id)}
                          >
                            {getLocalizedText('viewProgress')}
                          </Button>
                        )}
                        {task.status === 'completed' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleViewResult(task.id)}
                          >
                            {getLocalizedText('viewResult')}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(task.id)}
                        >
                          {getLocalizedText('details')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                info={paginationInfo}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                showItemsPerPage={true}
                itemsPerPageOptions={[6, 12, 18, 24]}
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