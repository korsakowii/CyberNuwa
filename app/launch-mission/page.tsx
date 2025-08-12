'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '../../locales/translations';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { 
  Footer, 
  TranslationControls, 
  ErrorBoundary
} from '../../components';

// 任务类型定义
interface TaskFormData {
  title: string;
  description: string;
  tags: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  estimatedHours: number;
  deadline: string;
  requirements: string;
  budget: string;
  collaborationType: 'individual' | 'team' | 'open';
}

// 任务状态
interface TaskStatus {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string;
  progress: number;
  currentStep: string;
}

export default function LaunchMission() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].launchMission;

  // 状态管理
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'preview'>('basic');
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    tags: '',
    category: 'general',
    priority: 'medium',
    estimatedHours: 1,
    deadline: '',
    requirements: '',
    budget: '',
    collaborationType: 'open'
  });

  const [taskStatus, setTaskStatus] = useState<TaskStatus>({
    isSubmitting: false,
    isSuccess: false,
    error: '',
    progress: 0,
    currentStep: ''
  });

  // 事件处理
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);



  const handleSelectChange = useCallback((name: keyof TaskFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setTaskStatus(prev => ({
      ...prev,
      isSubmitting: true,
      error: '',
      progress: 0
    }));

    try {
      // 模拟提交过程
      const steps = [
        '验证表单数据...',
        '提交愿望到后端...',
        'AI 分析任务需求...',
        '生成任务描述...',
        '创建任务记录...',
        '完成！'
      ];

      for (let i = 0; i < steps.length; i++) {
        setTaskStatus(prev => ({
          ...prev,
          currentStep: steps[i],
          progress: Math.round((i / (steps.length - 1)) * 100)
        }));

        // 模拟每个步骤的延迟
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setTaskStatus(prev => ({
        ...prev,
        isSuccess: true,
        isSubmitting: false
      }));
    } catch (err) {
      setTaskStatus(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : '提交失败',
        isSubmitting: false
      }));
    }
  }, []);

  const handleNewTask = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      category: 'general',
      priority: 'medium',
      estimatedHours: 1,
      deadline: '',
      requirements: '',
      budget: '',
      collaborationType: 'open'
    });
    setTaskStatus({
      isSubmitting: false,
      isSuccess: false,
      error: '',
      progress: 0,
      currentStep: ''
    });
    setActiveTab('basic');
  }, []);

  const handleTabChange = useCallback((tab: 'basic' | 'advanced' | 'preview') => {
    setActiveTab(tab);
  }, []);

  // 获取本地化文本
  const getLocalizedText = (key: string) => {
    const texts = {
      backHome: language === 'zh' ? '← 返回首页' : '← Back to Home',
      title: t.title,
      subtitle: t.subtitle,
      basic: language === 'zh' ? '基本信息' : 'Basic Information',
      advanced: language === 'zh' ? '高级设置' : 'Advanced Settings',
      preview: language === 'zh' ? '预览确认' : 'Preview & Confirm',
      formTitle: t.form.title,
      formDescription: t.form.description,
      formTags: t.form.tags,
      formCategory: language === 'zh' ? '分类' : 'Category',
      formPriority: language === 'zh' ? '优先级' : 'Priority',
      formEstimatedHours: language === 'zh' ? '预估工时' : 'Estimated Hours',
      formDeadline: language === 'zh' ? '截止日期' : 'Deadline',
      formRequirements: language === 'zh' ? '具体要求' : 'Requirements',
      formBudget: language === 'zh' ? '预算范围' : 'Budget Range',
      formCollaborationType: language === 'zh' ? '协作方式' : 'Collaboration Type',
      titlePlaceholder: t.form.titlePlaceholder,
      descriptionPlaceholder: t.form.descriptionPlaceholder,
      tagsPlaceholder: t.form.tagsPlaceholder,
      requirementsPlaceholder: language === 'zh' 
        ? '请详细描述任务的具体要求、技术栈、交付标准等...'
        : 'Please describe specific requirements, tech stack, delivery standards, etc...',
      back: t.form.back,
      submit: t.form.submit,
      submitting: t.form.submitting,
      successTitle: t.success.title,
      successMessage: t.success.message,
      newTask: t.success.newTask,
      low: language === 'zh' ? '低' : 'Low',
      medium: language === 'zh' ? '中' : 'Medium',
      high: language === 'zh' ? '高' : 'High',
      individual: language === 'zh' ? '个人' : 'Individual',
      team: language === 'zh' ? '团队' : 'Team',
      open: language === 'zh' ? '开放协作' : 'Open Collaboration',
      general: language === 'zh' ? '通用' : 'General',
      development: language === 'zh' ? '开发' : 'Development',
      design: language === 'zh' ? '设计' : 'Design',
      research: language === 'zh' ? '研究' : 'Research',
      content: language === 'zh' ? '内容' : 'Content',
      other: language === 'zh' ? '其他' : 'Other'
    };
    return texts[key as keyof typeof texts] || key;
  };

  // 分类选项
  const categoryOptions = [
    { value: 'general', label: getLocalizedText('general') },
    { value: 'development', label: getLocalizedText('development') },
    { value: 'design', label: getLocalizedText('design') },
    { value: 'research', label: getLocalizedText('research') },
    { value: 'content', label: getLocalizedText('content') },
    { value: 'other', label: getLocalizedText('other') }
  ];

  // 优先级选项
  const priorityOptions = [
    { value: 'low', label: getLocalizedText('low'), color: 'text-blue-400' },
    { value: 'medium', label: getLocalizedText('medium'), color: 'text-yellow-400' },
    { value: 'high', label: getLocalizedText('high'), color: 'text-red-400' }
  ];

  // 协作方式选项
  const collaborationOptions = [
    { value: 'individual', label: getLocalizedText('individual') },
    { value: 'team', label: getLocalizedText('team') },
    { value: 'open', label: getLocalizedText('open') }
  ];

  // 表单验证
  const isFormValid = formData.title.trim() && formData.description.trim();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* 页面头部 */}
          <div className="text-center mb-12">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors mb-4 inline-block"
            >
              {getLocalizedText('backHome')}
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              {getLocalizedText('title')}
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              {getLocalizedText('subtitle')}
            </p>
          </div>

          {!taskStatus.isSuccess ? (
            /* 任务创建表单 */
            <Card className="bg-zinc-800/50 border-zinc-700 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="basic">{getLocalizedText('basic')}</TabsTrigger>
                    <TabsTrigger value="advanced">{getLocalizedText('advanced')}</TabsTrigger>
                    <TabsTrigger value="preview">{getLocalizedText('preview')}</TabsTrigger>
                  </TabsList>

                  {/* 基本信息标签页 */}
                  <TabsContent value="basic" className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('formTitle')} *
                      </label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder={getLocalizedText('titlePlaceholder')}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('formDescription')} *
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder={getLocalizedText('descriptionPlaceholder')}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('formCategory')}
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleSelectChange('category', e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          {categoryOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('formPriority')}
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) => handleSelectChange('priority', e.target.value as TaskFormData['priority'])}
                          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          {priorityOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('formTags')}
                      </label>
                      <Input
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder={getLocalizedText('tagsPlaceholder')}
                        className="w-full"
                      />
                    </div>
                  </TabsContent>

                  {/* 高级设置标签页 */}
                  <TabsContent value="advanced" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="estimatedHours" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('formEstimatedHours')}
                        </label>
                        <Input
                          id="estimatedHours"
                          name="estimatedHours"
                          type="number"
                          min="1"
                          value={formData.estimatedHours}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('formDeadline')}
                        </label>
                        <Input
                          id="deadline"
                          name="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="requirements" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('formRequirements')}
                      </label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={4}
                        placeholder={getLocalizedText('requirementsPlaceholder')}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('formBudget')}
                        </label>
                        <Input
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="0-1000 XP"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label htmlFor="collaborationType" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('formCollaborationType')}
                        </label>
                        <select
                          value={formData.collaborationType}
                          onChange={(e) => handleSelectChange('collaborationType', e.target.value as TaskFormData['collaborationType'])}
                          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          {collaborationOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </TabsContent>

                  {/* 预览确认标签页 */}
                  <TabsContent value="preview" className="space-y-6">
                    <Card className="bg-zinc-700/30 border-zinc-600 p-6">
                      <h3 className="text-lg font-semibold mb-4">{getLocalizedText('formTitle')}</h3>
                      <p className="text-zinc-300 mb-4">{formData.title}</p>
                      
                      <h4 className="text-md font-medium mb-2">{getLocalizedText('formDescription')}</h4>
                      <p className="text-zinc-300 mb-4">{formData.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('formCategory')}: </span>
                          <span className="text-zinc-200">
                            {categoryOptions.find(opt => opt.value === formData.category)?.label}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('formPriority')}: </span>
                          <Badge 
                            variant={formData.priority === 'high' ? 'danger' : 
                                    formData.priority === 'medium' ? 'warning' : 'primary'}
                            size="sm"
                          >
                            {priorityOptions.find(opt => opt.value === formData.priority)?.label}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('formEstimatedHours')}: </span>
                          <span className="text-zinc-200">{formData.estimatedHours}h</span>
                        </div>
                        <div>
                          <span className="text-zinc-400">{getLocalizedText('formCollaborationType')}: </span>
                          <span className="text-zinc-200">
                            {collaborationOptions.find(opt => opt.value === formData.collaborationType)?.label}
                          </span>
                        </div>
                      </div>

                      {formData.tags && (
                        <div className="mt-4">
                          <span className="text-zinc-400">{getLocalizedText('formTags')}: </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags.split(',').map((tag, index) => (
                              <Badge key={index} variant="outline" size="sm">
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* 错误提示 */}
                {taskStatus.error && (
                  <Card className="bg-red-900/30 border-red-700 p-4">
                    <p className="text-red-400">{taskStatus.error}</p>
                  </Card>
                )}

                {/* 提交进度 */}
                {taskStatus.isSubmitting && (
                  <Card className="bg-blue-900/30 border-blue-700 p-6 text-center">
                    <div className="text-2xl mb-4">🚀</div>
                    <h3 className="text-lg font-semibold mb-2">{taskStatus.currentStep}</h3>
                    <div className="w-full bg-zinc-700 rounded-full h-3 mb-4">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${taskStatus.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-zinc-400">{taskStatus.progress}%</p>
                  </Card>
                )}

                {/* 操作按钮 */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/')}
                    className="px-6 py-3"
                  >
                    {getLocalizedText('back')}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={taskStatus.isSubmitting || !isFormValid}
                    className="px-6 py-3 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {taskStatus.isSubmitting ? getLocalizedText('submitting') : getLocalizedText('submit')}
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            /* 成功状态 */
            <Card className="bg-zinc-800/50 border-zinc-700 p-8 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                {getLocalizedText('successTitle')}
              </h2>
              <p className="text-zinc-300 mb-8">{getLocalizedText('successMessage')}</p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={handleNewTask}
                  className="transform hover:scale-105"
                >
                  ✨ {getLocalizedText('newTask')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  🏠 {getLocalizedText('back')}
                </Button>
              </div>
            </Card>
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
