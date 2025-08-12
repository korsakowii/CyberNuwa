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
  Footer, 
  TranslationControls, 
  ErrorBoundary,
  StatusBadge 
} from '../../components';
import { cn } from '../../lib/utils';

// 叙事类型定义
interface Narrative {
  id: number;
  type: 'community' | 'agent-biography' | 'platform-update' | 'user-story' | 'technical';
  title: { zh: string; en: string };
  author: { zh: string; en: string };
  content: { zh: string; en: string };
  tags: { zh: string[]; en: string[] };
  date: string;
  likes: number;
  readTime: number;
  comments: number;
  views: number;
  status: 'published' | 'draft' | 'archived';
  category: string;
  featured?: boolean;
  excerpt?: { zh: string; en: string };
}

// 过滤选项
interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export default function Narratives() {
  const { language } = useLanguage();
  const t = translations[language].narratives;

  // 状态管理
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // 叙事数据
  const narratives: Narrative[] = [
    {
      id: 1,
      type: 'community',
      title: { zh: '平台启动记', en: 'Platform Launch Story' },
      author: { zh: '管理员', en: 'Admin' },
      content: {
        zh: '2025年8月，Cyber Nüwa 平台正式上线，开启了人机共创的新纪元。这是一个激动人心的时刻，我们见证了AI技术与人类创造力的完美结合。平台不仅提供了智能体训练工具，更重要的是建立了一个充满活力的创作者社区。',
        en: 'In August 2025, the Cyber Nüwa platform officially launched, ushering in a new era of human-AI co-creation. This is an exciting moment as we witnessed the perfect combination of AI technology and human creativity. The platform not only provides agent training tools but more importantly establishes a vibrant creator community.',
      },
      tags: { zh: ['平台', '历史', '里程碑'], en: ['Platform', 'History', 'Milestone'] },
      date: '2025-08-01',
      likes: 12,
      readTime: 3,
      comments: 2,
      views: 2341,
      status: 'published',
      category: 'platform',
      featured: true,
      excerpt: {
        zh: 'Cyber Nüwa 平台正式上线，开启人机共创新纪元',
        en: 'Cyber Nüwa platform officially launches, ushering in a new era of human-AI co-creation'
      }
    },
    {
      id: 2,
      type: 'agent-biography',
      title: { zh: '首个智能体诞生', en: 'First Agent Born' },
      author: { zh: 'Alice', en: 'Alice' },
      content: {
        zh: '创意助手成为平台上第一个被训练成功的智能体，帮助用户激发灵感。这个智能体展现了AI在创意领域的巨大潜力，能够理解用户需求，提供个性化的创意建议。',
        en: 'Creative Assistant became the first successfully trained agent on the platform, helping users spark inspiration. This agent demonstrates the enormous potential of AI in the creative field, able to understand user needs and provide personalized creative suggestions.',
      },
      tags: { zh: ['智能体', '创意', 'AI'], en: ['Agent', 'Creativity', 'AI'] },
      date: '2025-08-15',
      likes: 8,
      readTime: 2,
      comments: 0,
      views: 1567,
      status: 'published',
      category: 'ai',
      excerpt: {
        zh: '创意助手成为第一个成功训练的智能体',
        en: 'Creative Assistant becomes the first successfully trained agent'
      }
    },
    {
      id: 3,
      type: 'community',
      title: { zh: '社区共创高峰', en: 'Community Co-Creation Peak' },
      author: { zh: 'Bob', en: 'Bob' },
      content: {
        zh: '数百名用户参与任务与智能体训练，社区活跃度创新高。用户们分享经验、交流想法，形成了一个真正的共创生态。这种协作精神正是平台成功的关键。',
        en: 'Hundreds of users participated in tasks and agent training, reaching new heights of community engagement. Users share experiences and exchange ideas, forming a true co-creation ecosystem. This collaborative spirit is the key to the platform\'s success.',
      },
      tags: { zh: ['社区', '协作', '生态'], en: ['Community', 'Collaboration', 'Ecosystem'] },
      date: '2025-09-15',
      likes: 5,
      readTime: 4,
      comments: 5,
      views: 892,
      status: 'published',
      category: 'community',
      excerpt: {
        zh: '社区活跃度创新高，用户共创生态形成',
        en: 'Community engagement reaches new heights, user co-creation ecosystem forms'
      }
    },
    {
      id: 4,
      type: 'technical',
      title: { zh: '智能体训练技术突破', en: 'Agent Training Technical Breakthrough' },
      author: { zh: 'Charlie', en: 'Charlie' },
      content: {
        zh: '我们开发了新的智能体训练算法，显著提升了训练效率和智能体性能。这项技术突破让更多用户能够轻松训练出高质量的智能体。',
        en: 'We developed new agent training algorithms that significantly improve training efficiency and agent performance. This technological breakthrough allows more users to easily train high-quality agents.',
      },
      tags: { zh: ['技术', '算法', '突破'], en: ['Technology', 'Algorithm', 'Breakthrough'] },
      date: '2025-09-20',
      likes: 15,
      readTime: 5,
      comments: 8,
      views: 1203,
      status: 'published',
      category: 'technology',
      featured: true,
      excerpt: {
        zh: '新算法显著提升智能体训练效率',
        en: 'New algorithm significantly improves agent training efficiency'
      }
    },
    {
      id: 5,
      type: 'user-story',
      title: { zh: '从新手到专家的成长之路', en: 'From Novice to Expert Growth Path' },
      author: { zh: 'Diana', en: 'Diana' },
      content: {
        zh: '分享我在平台上的学习经历，从最初的不懂AI到能够独立训练智能体。这个过程充满了挑战，但也带来了巨大的成就感。',
        en: 'Sharing my learning experience on the platform, from initially not understanding AI to being able to independently train agents. This process is full of challenges but also brings great sense of achievement.',
      },
      tags: { zh: ['成长', '学习', '经验'], en: ['Growth', 'Learning', 'Experience'] },
      date: '2025-09-25',
      likes: 23,
      readTime: 3,
      comments: 12,
      views: 1890,
      status: 'published',
      category: 'experience',
      excerpt: {
        zh: '个人成长故事：从AI新手到专家',
        en: 'Personal growth story: from AI novice to expert'
      }
    },
    {
      id: 6,
      type: 'platform-update',
      title: { zh: '平台功能重大更新', en: 'Major Platform Feature Update' },
      author: { zh: '管理员', en: 'Admin' },
      content: {
        zh: '我们推出了多项新功能，包括智能体市场、协作工作空间和高级分析工具。这些更新让平台更加完善，用户体验得到显著提升。',
        en: 'We launched multiple new features including agent marketplace, collaborative workspace, and advanced analytics tools. These updates make the platform more complete and significantly improve user experience.',
      },
      tags: { zh: ['更新', '功能', '平台'], en: ['Update', 'Features', 'Platform'] },
      date: '2025-10-01',
      likes: 18,
      readTime: 4,
      comments: 6,
      views: 2100,
      status: 'published',
      category: 'platform',
      excerpt: {
        zh: '多项新功能上线，平台体验大幅提升',
        en: 'Multiple new features launched, platform experience greatly improved'
      }
    }
  ];

  // 过滤和排序叙事
  const filteredAndSortedNarratives = useMemo(() => {
    let filtered = narratives.filter(narrative => {
      const matchesSearch = narrative.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           narrative.content[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                           narrative.tags[language].some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = typeFilter === 'all' || narrative.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || narrative.category === categoryFilter;
      
      return matchesSearch && matchesType && matchesCategory;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'views':
          aValue = a.views;
          bValue = b.views;
          break;
        case 'likes':
          aValue = a.likes;
          bValue = b.likes;
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
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
  }, [narratives, searchTerm, typeFilter, categoryFilter, sortBy, sortOrder, language]);

  // 分页
  const totalPages = Math.ceil(filteredAndSortedNarratives.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNarratives = filteredAndSortedNarratives.slice(startIndex, startIndex + itemsPerPage);

  // 分页信息
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems: filteredAndSortedNarratives.length,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };

  // 事件处理
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (field: 'date' | 'views' | 'likes' | 'title') => {
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

  const handleViewModeChange = (mode: 'grid' | 'timeline') => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  // 叙事操作
  const handleLike = (narrativeId: number) => {
    console.log('Like narrative:', narrativeId);
  };

  const handleComment = (narrativeId: number) => {
    console.log('Comment on narrative:', narrativeId);
  };

  const handleReadMore = (narrativeId: number) => {
    console.log('Read more narrative:', narrativeId);
  };

  // 获取本地化文本
  const getLocalizedText = (key: string) => {
    const texts = {
      backHome: language === 'zh' ? '← 返回首页' : '← Back Home',
      title: t.title,
      subtitle: t.subtitle,
      total: t.total,
      agentBiographies: t.agentBiographies,
      communityHistory: t.communityHistory,
      totalLikes: t.totalLikes,
      readMore: t.readMore,
      timelineTitle: t.timelineTitle,
      shareStory: t.shareStory,
      shareDesc1: t.shareDesc1,
      shareDesc2: t.shareDesc2,
      shareButton: t.shareButton,
      searchPlaceholder: language === 'zh' ? '搜索叙事...' : 'Search narratives...',
      allTypes: language === 'zh' ? '全部类型' : 'All Types',
      allCategories: language === 'zh' ? '全部分类' : 'All Categories',
      sortByDate: language === 'zh' ? '按日期' : 'By Date',
      sortByViews: language === 'zh' ? '按浏览量' : 'By Views',
      sortByLikes: language === 'zh' ? '按点赞' : 'By Likes',
      sortByTitle: language === 'zh' ? '按标题' : 'By Title',
      foundNarratives: language === 'zh' ? '共找到 ' : 'Found ',
      narratives: language === 'zh' ? ' 个叙事' : ' narratives',
      gridView: language === 'zh' ? '网格视图' : 'Grid View',
      timelineView: language === 'zh' ? '时间线视图' : 'Timeline View',
      author: language === 'zh' ? '作者：' : 'by ',
      readTime: language === 'zh' ? '阅读时间' : 'Read Time',
      totalViews: language === 'zh' ? '总浏览量' : 'Total Views',
      totalComments: language === 'zh' ? '总评论数' : 'Total Comments',
      featured: language === 'zh' ? '精选' : 'Featured',
      new: language === 'zh' ? '新' : 'New'
    };
    return texts[key as keyof typeof texts] || key;
  };

  // 过滤选项
  const typeOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allTypes') },
    { value: 'community', label: getLocalizedText('communityHistory') },
    { value: 'agent-biography', label: getLocalizedText('agentBiographies') },
    { value: 'technical', label: language === 'zh' ? '技术' : 'Technical' },
    { value: 'user-story', label: language === 'zh' ? '用户故事' : 'User Story' },
    { value: 'platform-update', label: language === 'zh' ? '平台更新' : 'Platform Update' }
  ];

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: getLocalizedText('allCategories') },
    { value: 'platform', label: language === 'zh' ? '平台' : 'Platform' },
    { value: 'ai', label: language === 'zh' ? 'AI' : 'AI' },
    { value: 'community', label: language === 'zh' ? '社区' : 'Community' },
    { value: 'technology', label: language === 'zh' ? '技术' : 'Technology' },
    { value: 'experience', label: language === 'zh' ? '经验' : 'Experience' }
  ];

  // 统计数据
  const stats = {
    total: narratives.length,
    agentBiographies: narratives.filter(n => n.type === 'agent-biography').length,
    communityHistory: narratives.filter(n => n.type === 'community').length,
    totalViews: narratives.reduce((sum, n) => sum + (n.views || 0), 0),
    totalLikes: narratives.reduce((acc, n) => acc + (n.likes || 0), 0)
  };

  // 获取类型颜色
  const getTypeColor = (type: string) => {
    const colors = {
      community: 'text-blue-400 bg-blue-400/10',
      'agent-biography': 'text-purple-400 bg-purple-400/10',
      technical: 'text-green-400 bg-green-400/10',
      'user-story': 'text-yellow-400 bg-yellow-400/10',
      'platform-update': 'text-orange-400 bg-orange-400/10'
    };
    return colors[type as keyof typeof colors] || 'text-gray-400 bg-gray-400/10';
  };

  // 获取类型标签
  const getTypeLabel = (type: string) => {
    const labels = {
      community: getLocalizedText('communityHistory'),
      'agent-biography': getLocalizedText('agentBiographies'),
      technical: language === 'zh' ? '技术' : 'Technical',
      'user-story': language === 'zh' ? '用户故事' : 'User Story',
      'platform-update': language === 'zh' ? '平台更新' : 'Platform Update'
    };
    return labels[type as keyof typeof labels] || type;
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
            <p className="text-zinc-400 mb-6 max-w-3xl mx-auto">{getLocalizedText('subtitle')}</p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.total}</div>
              <div className="text-zinc-400">{getLocalizedText('total')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stats.agentBiographies}</div>
              <div className="text-zinc-400">{getLocalizedText('agentBiographies')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.communityHistory}</div>
              <div className="text-zinc-400">{getLocalizedText('communityHistory')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {stats.totalViews.toLocaleString()}
              </div>
              <div className="text-zinc-400">{getLocalizedText('totalViews')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.totalLikes}</div>
              <div className="text-zinc-400">{getLocalizedText('totalLikes')}</div>
            </Card>
          </div>

          {/* 控制面板 */}
          <Card className="mb-8 p-6 bg-zinc-800/50 border-zinc-700">
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

              {/* 类型过滤 */}
              <Dropdown
                trigger={
                  <Button variant="outline" className="w-full justify-between">
                    {typeFilter === 'all' 
                      ? getLocalizedText('allTypes')
                      : typeOptions.find(opt => opt.value === typeFilter)?.label
                    }
                    <span>▼</span>
                  </Button>
                }
                options={typeOptions.map(opt => ({
                  value: opt.value,
                  label: opt.label
                }))}
                onSelect={(option: { value: string | number; label: string }) => handleTypeFilter(option.value.toString())}
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

              {/* 视图模式切换 */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleViewModeChange('grid')}
                  className="flex-1"
                >
                  📱 {getLocalizedText('gridView')}
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleViewModeChange('timeline')}
                  className="flex-1"
                >
                  📅 {getLocalizedText('timelineView')}
                </Button>
              </div>
            </div>

            {/* 排序控制 */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">
                  {language === 'zh' ? '排序方式: ' : 'Sort by: '}
                </span>
                {(['date', 'views', 'likes', 'title'] as const).map(field => (
                  <Button
                    key={field}
                    variant={sortBy === field ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleSort(field)}
                    className="text-xs"
                  >
                    {field === 'date' ? getLocalizedText('sortByDate') :
                     field === 'views' ? getLocalizedText('sortByViews') :
                     field === 'likes' ? getLocalizedText('sortByLikes') :
                     getLocalizedText('sortByTitle')}
                    {sortBy === field && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              <div className="text-sm text-zinc-400">
                {getLocalizedText('foundNarratives')}
                <span className="text-white font-medium">{filteredAndSortedNarratives.length}</span>
                {getLocalizedText('narratives')}
              </div>
            </div>
          </Card>

          {/* 叙事内容 */}
          {viewMode === 'grid' ? (
            /* 网格视图 */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {paginatedNarratives.map(narrative => (
                <Card
                  key={narrative.id}
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1",
                    narrative.featured && "border-yellow-500/50 bg-zinc-800/70"
                  )}
                >
                  <div className="p-6">
                    {/* 叙事头部 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">
                            {narrative.title[language]}
                          </h3>
                          {narrative.featured && (
                            <Badge variant="warning" size="sm">
                              {getLocalizedText('featured')}
                            </Badge>
                          )}
                          {new Date(narrative.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                            <Badge variant="success" size="sm">
                              {getLocalizedText('new')}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-zinc-400">
                          <span>
                            {getLocalizedText('author')}
                            {narrative.author[language]}
                          </span>
                          <span>•</span>
                          <span>{narrative.date}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", getTypeColor(narrative.type))}
                      >
                        {getTypeLabel(narrative.type)}
                      </Badge>
                    </div>

                    {/* 内容预览 */}
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed line-clamp-3">
                      {narrative.excerpt?.[language] || narrative.content[language]}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {narrative.tags[language].map((tag, index) => (
                        <Badge key={index} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* 元信息 */}
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <div className="flex items-center space-x-4">
                        <span>⏱️ {narrative.readTime} {getLocalizedText('readTime')}</span>
                        <button 
                          className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                          onClick={() => handleLike(narrative.id)}
                        >
                          <span>❤️</span>
                          <span>{narrative.likes}</span>
                        </button>
                        <button 
                          className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                          onClick={() => handleComment(narrative.id)}
                        >
                          <span>💬</span>
                          <span>{narrative.comments}</span>
                        </button>
                        <span className="flex items-center space-x-1">
                          <span role="img" aria-label="views">👀</span>
                          <span>{narrative.views?.toLocaleString() || 0}</span>
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReadMore(narrative.id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {getLocalizedText('readMore')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* 时间线视图 */
            <Card className="mb-8 bg-zinc-800/50 border-zinc-700 p-6">
              <h2 className="text-2xl font-bold text-center mb-8">
                {getLocalizedText('timelineTitle')}
              </h2>
              <div className="space-y-6">
                {paginatedNarratives.map((narrative, index) => (
                  <div key={narrative.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full",
                          narrative.type === 'community' ? 'bg-blue-400' : 
                          narrative.type === 'agent-biography' ? 'bg-purple-400' :
                          narrative.type === 'technical' ? 'bg-green-400' :
                          narrative.type === 'user-story' ? 'bg-yellow-400' : 'bg-orange-400'
                        )}
                      />
                      {index < paginatedNarratives.length - 1 && (
                        <div
                          className={cn(
                            "w-0.5 h-12 mx-auto mt-2",
                            narrative.type === 'community' ? 'bg-blue-400/30' : 
                            narrative.type === 'agent-biography' ? 'bg-purple-400/30' :
                            narrative.type === 'technical' ? 'bg-green-400/30' :
                            narrative.type === 'user-story' ? 'bg-yellow-400/30' : 'bg-orange-400/30'
                          )}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-zinc-300">
                          {narrative.title[language]}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            narrative.type === 'community' ? 'bg-blue-900 text-blue-300' : 
                            narrative.type === 'agent-biography' ? 'bg-purple-900 text-purple-300' :
                            narrative.type === 'technical' ? 'bg-green-900 text-green-300' :
                            narrative.type === 'user-story' ? 'bg-yellow-900 text-yellow-300' : 'bg-orange-900 text-orange-300'
                          )}
                        >
                          {getTypeLabel(narrative.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-400">{narrative.date}</p>
                      <p className="text-sm text-zinc-300 mt-2 line-clamp-2">
                        {narrative.excerpt?.[language] || narrative.content[language]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex justify-center mb-8">
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

          {/* 分享故事 */}
          <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">{getLocalizedText('shareStory')}</h3>
            <p className="text-zinc-400 mb-6">
              {getLocalizedText('shareDesc1')}
              <br />
              {getLocalizedText('shareDesc2')}
            </p>
            <Button variant="primary" size="lg" className="transform hover:scale-105">
              ✍️ {getLocalizedText('shareButton')}
            </Button>
          </Card>
        </div>

        {/* 页脚 */}
        <Footer />

        {/* 翻译控制 */}
        <TranslationControls showSettings={true} />

        <style jsx>{`
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
}
