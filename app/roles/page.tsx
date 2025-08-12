'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '../../locales/translations';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
// Progress component - 使用自定义实现
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { 
  Footer, 
  TranslationControls, 
  ErrorBoundary,
  StatusBadge 
} from '../../components';
import { cn } from '../../lib/utils';

// 角色类型定义
interface Role {
  id: number;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  level: { zh: string; en: string };
  permissions: { zh: string[]; en: string[] };
  requirements: { zh: string; en: string };
  avatar: string;
  color: string;
  members: number;
  nextLevel: { zh: string; en: string } | null;
  category: 'creator' | 'trainer' | 'guardian' | 'elder';
  experienceRequired: number;
  benefits: { zh: string[]; en: string[] };
  restrictions?: { zh: string[]; en: string[] };
}

// 用户状态类型
interface UserStatus {
  role: { zh: string; en: string };
  level: { zh: string; en: string };
  progress: number;
  nextRequirement: { zh: string; en: string };
  currentExperience: number;
  nextLevelExperience: number;
  achievements: string[];
  badges: string[];
}

// 进度路径类型
interface ProgressionPath {
  name: { zh: string; en: string };
  level: { zh: string; en: string };
  color: string;
  icon: string;
  experienceRequired: number;
  description: { zh: string; en: string };
}

export default function Roles() {
  const { language } = useLanguage();
  const t = translations[language].roles;

  // 状态管理
  const [activeTab, setActiveTab] = useState<'overview' | 'progression' | 'achievements'>('overview');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // 角色数据
  const roles: Role[] = [
    {
      id: 1,
      name: { zh: '创意者', en: 'Creator' },
      description: {
        zh: '专注于提出创新想法和概念的用户',
        en: 'Users focused on proposing innovative ideas and concepts',
      },
      level: { zh: '初级', en: 'Beginner' },
      permissions: {
        zh: ['提交任务', '参与讨论', '查看公开内容', '创建愿望清单'],
        en: ['Submit Tasks', 'Participate in Discussions', 'View Public Content', 'Create Wish Lists'],
      },
      requirements: { zh: '完成注册即可获得', en: 'Granted upon registration' },
      avatar: '🎨',
      color: 'from-pink-500 to-rose-600',
      members: 156,
      nextLevel: { zh: '中级创意者', en: 'Intermediate Creator' },
      category: 'creator',
      experienceRequired: 0,
      benefits: {
        zh: ['基础功能访问', '社区参与', '学习资源'],
        en: ['Basic Feature Access', 'Community Participation', 'Learning Resources']
      }
    },
    {
      id: 2,
      name: { zh: '训练师', en: 'Trainer' },
      description: {
        zh: '专门训练和优化智能体的专家',
        en: 'Experts specializing in training and optimizing agents',
      },
      level: { zh: '中级', en: 'Intermediate' },
      permissions: {
        zh: ['训练智能体', '发布训练成果', '参与技术讨论', '指导新手'],
        en: ['Train Agents', 'Publish Training Results', 'Join Technical Discussions', 'Mentor Newcomers'],
      },
      requirements: {
        zh: '完成3个任务并获得好评',
        en: 'Complete 3 tasks and receive positive feedback',
      },
      avatar: '🤖',
      color: 'from-blue-500 to-purple-600',
      members: 89,
      nextLevel: { zh: '高级训练师', en: 'Advanced Trainer' },
      category: 'trainer',
      experienceRequired: 1000,
      benefits: {
        zh: ['高级训练工具', '优先技术支持', '收入分成'],
        en: ['Advanced Training Tools', 'Priority Technical Support', 'Revenue Sharing']
      }
    },
    {
      id: 3,
      name: { zh: '守护者', en: 'Guardian' },
      description: {
        zh: '维护平台秩序和内容质量的社区管理者',
        en: 'Community managers maintaining platform order and content quality',
      },
      level: { zh: '高级', en: 'Advanced' },
      permissions: {
        zh: ['内容审核', '用户管理', '平台规则制定', '特殊权限'],
        en: ['Content Review', 'User Management', 'Platform Rule Setting', 'Special Privileges'],
      },
      requirements: {
        zh: '成为训练师6个月以上，贡献突出',
        en: 'Be a trainer for over 6 months with outstanding contributions',
      },
      avatar: '🏛️',
      color: 'from-emerald-500 to-teal-600',
      members: 23,
      nextLevel: { zh: '元老守护者', en: 'Elder Guardian' },
      category: 'guardian',
      experienceRequired: 5000,
      benefits: {
        zh: ['管理权限', '高级功能', '平台决策参与'],
        en: ['Administrative Rights', 'Advanced Features', 'Platform Decision Participation']
      }
    },
    {
      id: 4,
      name: { zh: '元老', en: 'Elder' },
      description: {
        zh: '平台的核心贡献者和精神领袖',
        en: 'Core contributors and spiritual leaders of the platform',
      },
      level: { zh: '顶级', en: 'Top' },
      permissions: {
        zh: ['平台决策参与', '特殊功能访问', '导师资格', '最高权限'],
        en: ['Participate in Platform Decisions', 'Access Special Features', 'Mentor Qualification', 'Highest Privileges'],
      },
      requirements: {
        zh: '成为守护者1年以上，对平台有重大贡献',
        en: 'Be a guardian for over 1 year with significant contributions',
      },
      avatar: '🌟',
      color: 'from-yellow-500 to-orange-600',
      members: 7,
      nextLevel: null,
      category: 'elder',
      experienceRequired: 10000,
      benefits: {
        zh: ['最高权限', '平台股份', '终身荣誉'],
        en: ['Highest Privileges', 'Platform Equity', 'Lifetime Honors']
      }
    },
  ];

  // 当前用户状态
  const currentUser: UserStatus = {
    role: { zh: '创意者', en: 'Creator' },
    level: { zh: '初级', en: 'Beginner' },
    progress: 45,
    nextRequirement: {
      zh: '完成2个任务以获得训练师资格',
      en: 'Complete 2 tasks to qualify as a Trainer',
    },
    currentExperience: 450,
    nextLevelExperience: 1000,
    achievements: ['首次登录', '完成第一个任务', '获得好评'],
    badges: ['🌱 新手', '💡 创意', '🤝 合作']
  };

  // 进度路径
  const progressionPath: ProgressionPath[] = [
    {
      name: { zh: '创意者', en: 'Creator' },
      level: { zh: '初级', en: 'Beginner' },
      color: 'from-pink-500 to-rose-600',
      icon: '🎨',
      experienceRequired: 0,
      description: { zh: '开始你的创意之旅', en: 'Start your creative journey' }
    },
    {
      name: { zh: '训练师', en: 'Trainer' },
      level: { zh: '中级', en: 'Intermediate' },
      color: 'from-blue-500 to-purple-600',
      icon: '🤖',
      experienceRequired: 1000,
      description: { zh: '掌握智能体训练技能', en: 'Master agent training skills' }
    },
    {
      name: { zh: '守护者', en: 'Guardian' },
      level: { zh: '高级', en: 'Advanced' },
      color: 'from-emerald-500 to-teal-600',
      icon: '🏛️',
      experienceRequired: 5000,
      description: { zh: '维护平台秩序与质量', en: 'Maintain platform order and quality' }
    },
    {
      name: { zh: '元老', en: 'Elder' },
      level: { zh: '顶级', en: 'Top' },
      color: 'from-yellow-500 to-orange-600',
      icon: '🌟',
      experienceRequired: 10000,
      description: { zh: '成为平台精神领袖', en: 'Become a platform spiritual leader' }
    },
  ];

  // 事件处理
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleTabChange = (tab: 'overview' | 'progression' | 'achievements') => {
    setActiveTab(tab);
  };

  // 获取本地化文本
  const getLocalizedText = (key: string) => {
    const texts = {
      backHome: language === 'zh' ? '← 返回首页' : '← Back Home',
      title: t.title,
      subtitle: t.subtitle,
      currentStatus: t.currentStatus,
      upgradeProgress: t.upgradeProgress,
      nextRequirement: t.nextRequirement,
      members: t.members,
      permissions: t.permissions,
      requirement: t.requirement,
      nextLevel: t.nextLevel,
      viewDetails: t.viewDetails,
      roleDevelopmentPath: t.roleDevelopmentPath,
      roleDevelopmentPathDescription: t.roleDevelopmentPathDescription,
      howToProgress1: t.howToProgress1,
      howToProgress2: t.howToProgress2,
      overview: language === 'zh' ? '概览' : 'Overview',
      progression: language === 'zh' ? '进度' : 'Progression',
      achievements: language === 'zh' ? '成就' : 'Achievements',
      experience: language === 'zh' ? '经验值' : 'Experience',
      benefits: language === 'zh' ? '权益' : 'Benefits',
      restrictions: language === 'zh' ? '限制' : 'Restrictions',
      currentRole: language === 'zh' ? '当前角色' : 'Current Role',
      currentLevel: language === 'zh' ? '当前等级' : 'Current Level',
      progressToNext: language === 'zh' ? '升级进度' : 'Progress to Next',
      nextRole: language === 'zh' ? '下一个角色' : 'Next Role',
      requirements: language === 'zh' ? '要求' : 'Requirements',
      totalMembers: language === 'zh' ? '总成员数' : 'Total Members',
      activeMembers: language === 'zh' ? '活跃成员' : 'Active Members',
      roleCategories: language === 'zh' ? '角色分类' : 'Role Categories',
      allRoles: language === 'zh' ? '所有角色' : 'All Roles',
      creatorRoles: language === 'zh' ? '创意角色' : 'Creator Roles',
      technicalRoles: language === 'zh' ? '技术角色' : 'Technical Roles',
      managementRoles: language === 'zh' ? '管理角色' : 'Management Roles'
    };
    return texts[key as keyof typeof texts] || key;
  };

  // 角色分类
  const roleCategories = {
    creator: roles.filter(role => role.category === 'creator'),
    technical: roles.filter(role => role.category === 'trainer'),
    management: roles.filter(role => ['guardian', 'elder'].includes(role.category))
  };

  // 统计数据
  const stats = {
    totalMembers: roles.reduce((acc, role) => acc + role.members, 0),
    activeMembers: Math.floor(roles.reduce((acc, role) => acc + role.members, 0) * 0.7),
    totalRoles: roles.length,
    averageProgress: Math.round(roles.reduce((acc, role) => acc + (role.members > 0 ? 1 : 0), 0) / roles.length * 100)
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.totalRoles}</div>
              <div className="text-zinc-400">{getLocalizedText('totalRoles')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalMembers}</div>
              <div className="text-zinc-400">{getLocalizedText('totalMembers')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.activeMembers}</div>
              <div className="text-zinc-400">{getLocalizedText('activeMembers')}</div>
            </Card>
            <Card className="bg-zinc-800/50 border-zinc-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stats.averageProgress}%</div>
              <div className="text-zinc-400">{getLocalizedText('averageProgress')}</div>
            </Card>
          </div>

          {/* 标签页导航 */}
          <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as any)} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">{getLocalizedText('overview')}</TabsTrigger>
              <TabsTrigger value="progression">{getLocalizedText('progression')}</TabsTrigger>
              <TabsTrigger value="achievements">{getLocalizedText('achievements')}</TabsTrigger>
            </TabsList>

            {/* 概览标签页 */}
            <TabsContent value="overview" className="space-y-8">
              {/* 当前用户状态 */}
              <Card className="bg-zinc-800/50 border-zinc-700 p-6">
                <h2 className="text-xl font-semibold mb-4">{getLocalizedText('currentStatus')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {currentUser.role[language]}
                    </div>
                    <div className="text-zinc-400">{getLocalizedText('currentRole')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {currentUser.level[language]}
                    </div>
                    <div className="text-zinc-400">{getLocalizedText('currentLevel')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {currentUser.progress}%
                    </div>
                    <div className="text-zinc-400">{getLocalizedText('progressToNext')}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">{getLocalizedText('upgradeProgress')}</span>
                    <span className="text-zinc-300">{currentUser.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${currentUser.progress}%` }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-zinc-300">
                    {currentUser.nextRequirement[language]}
                  </div>
                  <div className="text-zinc-400">{getLocalizedText('nextRequirement')}</div>
                </div>
              </Card>

              {/* 角色网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    className={cn(
                      "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1",
                      selectedRole?.id === role.id && "border-blue-500 bg-zinc-800/70"
                    )}
                  >
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleRoleSelect(role)}
                    >
                    <div className="p-6">
                      {/* 角色头部 */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center text-2xl",
                              role.color
                            )}
                          >
                            {role.avatar}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">
                              {role.name[language]}
                            </h3>
                            <p className="text-sm text-zinc-400">
                              {role.level[language]}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-zinc-300">
                            {role.members}
                          </div>
                          <div className="text-xs text-zinc-400">{getLocalizedText('members')}</div>
                        </div>
                      </div>

                      {/* 描述 */}
                      <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                        {role.description[language]}
                      </p>

                      {/* 权限 */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('permissions')}
                        </h4>
                        <div className="space-y-1">
                          {role.permissions[language].slice(0, 3).map((permission, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 text-sm text-zinc-400"
                            >
                              <span className="text-blue-400">✓</span>
                              <span>{permission}</span>
                            </div>
                          ))}
                          {role.permissions[language].length > 3 && (
                            <div className="text-xs text-zinc-500">
                              +{role.permissions[language].length - 3} {language === 'zh' ? '更多权限' : 'more permissions'}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 要求 */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('requirements')}
                        </h4>
                        <p className="text-sm text-zinc-400">
                          {role.requirements[language]}
                        </p>
                      </div>

                      {/* 下一个等级 */}
                      {role.nextLevel && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-zinc-300 mb-2">
                            {getLocalizedText('nextLevel')}
                          </h4>
                          <p className="text-sm text-zinc-400">
                            {role.nextLevel[language]}
                          </p>
                        </div>
                      )}

                      {/* 操作按钮 */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleRoleSelect(role)}
                      >
                        {getLocalizedText('viewDetails')}
                                             </Button>
                     </div>
                    </div>
                   </Card>
                 ))}
               </div>
             </TabsContent>

            {/* 进度标签页 */}
            <TabsContent value="progression" className="space-y-8">
              {/* 角色发展路径 */}
              <Card className="bg-zinc-800/50 border-zinc-700 p-6">
                <h2 className="text-2xl font-bold text-center mb-8">
                  {getLocalizedText('roleDevelopmentPath')}
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                  {progressionPath.map((role, index) => (
                    <div
                      key={role.name.zh}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full bg-gradient-to-r flex items-center justify-center text-2xl mb-2",
                          role.color
                        )}
                      >
                        {role.icon}
                      </div>
                      <div className="text-sm font-medium text-zinc-300">
                        {role.name[language]}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {role.level[language]}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {role.experienceRequired} XP
                      </div>
                      {index < progressionPath.length - 1 && (
                        <div className="hidden md:block w-16 h-0.5 bg-zinc-600 mt-4"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center text-sm text-zinc-400">
                  <p>{getLocalizedText('roleDevelopmentPathDescription')}</p>
                </div>
              </Card>

              {/* 当前进度详情 */}
              <Card className="bg-zinc-800/50 border-zinc-700 p-6">
                <h3 className="text-xl font-semibold mb-4">{getLocalizedText('progressToNext')}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400">{getLocalizedText('experience')}</span>
                      <span className="text-zinc-300">
                        {currentUser.currentExperience} / {currentUser.nextLevelExperience} XP
                      </span>
                    </div>
                                         <div className="w-full bg-zinc-700 rounded-full h-3">
                       <div
                         className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                         style={{ width: `${(currentUser.currentExperience / currentUser.nextLevelExperience) * 100}%` }}
                       />
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-400">{getLocalizedText('currentRole')}: </span>
                      <span className="text-zinc-200">{currentUser.role[language]}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">{getLocalizedText('nextRole')}: </span>
                      <span className="text-zinc-200">训练师</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* 成就标签页 */}
            <TabsContent value="achievements" className="space-y-8">
              {/* 成就展示 */}
              <Card className="bg-zinc-800/50 border-zinc-700 p-6">
                <h3 className="text-xl font-semibold mb-4">{getLocalizedText('achievements')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentUser.achievements.map((achievement, index) => (
                    <div key={index} className="text-center p-4 bg-zinc-700/30 rounded-lg">
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="text-sm text-zinc-300">{achievement}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 徽章展示 */}
              <Card className="bg-zinc-800/50 border-zinc-700 p-6">
                <h3 className="text-xl font-semibold mb-4">{getLocalizedText('badges')}</h3>
                <div className="flex flex-wrap gap-3">
                  {currentUser.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-lg px-3 py-2">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 如何进步 */}
          <div className="mt-8 text-center text-zinc-400 text-sm">
            <p>
              {getLocalizedText('howToProgress1')}
              <br />
              {getLocalizedText('howToProgress2')}
            </p>
          </div>
        </div>

        {/* 页脚 */}
        <Footer />

        {/* 翻译控制 */}
        <TranslationControls showSettings={true} />
      </div>
    </ErrorBoundary>
  );
}
