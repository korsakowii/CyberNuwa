'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '../../locales/translations';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
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

// 训练数据类型定义
interface TrainingData {
  name: string;
  description: string;
  prompt: string;
  samples: string;
  personality: string;
  constraints: string;
  category: string;
  tags: string[];
  modelType: 'gpt-4' | 'gpt-3.5' | 'claude' | 'custom';
  trainingMode: 'supervised' | 'reinforcement' | 'hybrid';
}

// 训练步骤类型
interface TrainingStep {
  id: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  progress: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
}

export default function TrainAgent() {
  const { language } = useLanguage();
  const t = translations[language].trainAgent;

  // 状态管理
  const [trainingData, setTrainingData] = useState<TrainingData>({
    name: '',
    description: '',
    prompt: '',
    samples: '',
    personality: '',
    constraints: '',
    category: 'general',
    tags: [],
    modelType: 'gpt-4',
    trainingMode: 'supervised'
  });

  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [trainingSteps, setTrainingSteps] = useState<TrainingStep[]>([
    {
      id: 'parse',
      name: { zh: '解析训练数据', en: 'Parse Training Data' },
      description: { zh: '分析和验证输入的训练数据', en: 'Analyze and validate input training data' },
      progress: 0,
      status: 'pending'
    },
    {
      id: 'architecture',
      name: { zh: '构建模型架构', en: 'Build Model Architecture' },
      description: { zh: '根据需求设计模型结构', en: 'Design model structure based on requirements' },
      progress: 0,
      status: 'pending'
    },
    {
      id: 'training',
      name: { zh: '训练模型参数', en: 'Train Model Parameters' },
      description: { zh: '使用训练数据优化模型', en: 'Optimize model using training data' },
      progress: 0,
      status: 'pending'
    },
    {
      id: 'optimization',
      name: { zh: '优化性能', en: 'Optimize Performance' },
      description: { zh: '调整和优化模型性能', en: 'Tune and optimize model performance' },
      progress: 0,
      status: 'pending'
    },
    {
      id: 'deployment',
      name: { zh: '部署完成', en: 'Deploy Complete' },
      description: { zh: '将训练好的模型部署到生产环境', en: 'Deploy trained model to production' },
      progress: 0,
      status: 'pending'
    }
  ]);

  // 事件处理
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTrainingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleInputChange = useCallback((name: keyof TrainingData, value: string) => {
    setTrainingData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSelectChange = useCallback((name: keyof TrainingData, value: string | string[]) => {
    setTrainingData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTraining(true);
    setTrainingProgress(0);
    setCurrentStep(0);

    // 重置训练步骤状态
    setTrainingSteps(prev => prev.map(step => ({ ...step, progress: 0, status: 'pending' as const })));

    // 模拟训练过程
    const simulateTraining = async () => {
      for (let stepIndex = 0; stepIndex < trainingSteps.length; stepIndex++) {
        setCurrentStep(stepIndex);
        
        // 更新当前步骤状态
        setTrainingSteps(prev => prev.map((step, index) => 
          index === stepIndex ? { ...step, status: 'running' as const } : step
        ));

        // 模拟步骤执行
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          
          setTrainingProgress(prev => {
            const newProgress = Math.min(prev + 10, (stepIndex + 1) * 20);
            return newProgress;
          });

          setTrainingSteps(prev => prev.map((step, index) => 
            index === stepIndex ? { ...step, progress } : step
          ));
        }

        // 完成当前步骤
        setTrainingSteps(prev => prev.map((step, index) => 
          index === stepIndex ? { ...step, status: 'completed' as const } : step
        ));
      }

      setIsTraining(false);
    };

    simulateTraining();
  }, [trainingSteps]);

  const handleReset = useCallback(() => {
    setIsTraining(false);
    setTrainingProgress(0);
    setCurrentStep(0);
    setTrainingSteps(prev => prev.map(step => ({ ...step, progress: 0, status: 'pending' as const })));
  }, []);

  // 获取本地化文本
  const getLocalizedText = (key: string) => {
    const texts = {
      backHome: language === 'zh' ? '← 返回首页' : '← Back Home',
      title: t.title,
      subtitle: t.subtitle,
      name: t.form.name,
      description: t.form.description,
      prompt: t.form.prompt,
      samples: t.form.samples,
      personality: t.form.personality,
      constraints: t.form.constraints,
      submit: t.form.submit,
      training: t.form.training,
      complete: t.progress.complete,
      viewAgents: language === 'zh' ? '查看智能体' : 'View Agents',
      trainingDescription: language === 'zh' 
        ? '训练完成后，你的智能体将出现在 Agent 养成所中。后续可扩展为接入真实的 LLM 接口进行训练。'
        : 'After training, your agent will appear in the Agent Incubator. Future versions can integrate with real LLM APIs for training.',
      promptDescription: language === 'zh'
        ? '这是智能体的核心指令，决定了它的基本行为模式'
        : "This is the agent's core instruction that determines its basic behavior patterns",
      samplesDescription: language === 'zh'
        ? '提供一些输入输出的示例，帮助智能体学习正确的响应方式...'
        : 'Provide input-output examples to help the agent learn correct response patterns...',
      samplesFormat: language === 'zh'
        ? '格式：输入 | 期望输出（每行一个样本）'
        : 'Format: Input | Expected Output (one sample per line)',
      waitMessage: language === 'zh'
        ? '请耐心等待，训练过程可能需要几分钟'
        : 'Please wait patiently, training may take several minutes',
      category: language === 'zh' ? '分类' : 'Category',
      tags: language === 'zh' ? '标签' : 'Tags',
      modelType: language === 'zh' ? '模型类型' : 'Model Type',
      trainingMode: language === 'zh' ? '训练模式' : 'Training Mode',
      basicInfo: language === 'zh' ? '基本信息' : 'Basic Information',
      trainingConfig: language === 'zh' ? '训练配置' : 'Training Configuration',
      advanced: language === 'zh' ? '高级设置' : 'Advanced Settings'
    };
    return texts[key as keyof typeof texts] || key;
  };

  // 分类选项
  const categoryOptions = [
    { value: 'general', label: language === 'zh' ? '通用' : 'General' },
    { value: 'creative', label: language === 'zh' ? '创意' : 'Creative' },
    { value: 'technical', label: language === 'zh' ? '技术' : 'Technical' },
    { value: 'business', label: language === 'zh' ? '商业' : 'Business' },
    { value: 'education', label: language === 'zh' ? '教育' : 'Education' },
    { value: 'entertainment', label: language === 'zh' ? '娱乐' : 'Entertainment' }
  ];

  // 模型类型选项
  const modelTypeOptions = [
    { value: 'gpt-4', label: 'GPT-4', description: language === 'zh' ? '最强大的模型，适合复杂任务' : 'Most powerful model, suitable for complex tasks' },
    { value: 'gpt-3.5', label: 'GPT-3.5', description: language === 'zh' ? '平衡性能和成本' : 'Balanced performance and cost' },
    { value: 'claude', label: 'Claude', description: language === 'zh' ? '擅长分析和推理' : 'Good at analysis and reasoning' },
    { value: 'custom', label: language === 'zh' ? '自定义' : 'Custom', description: language === 'zh' ? '使用自己的模型' : 'Use your own model' }
  ];

  // 训练模式选项
  const trainingModeOptions = [
    { value: 'supervised', label: language === 'zh' ? '监督学习' : 'Supervised Learning', description: language === 'zh' ? '使用标记数据训练' : 'Train with labeled data' },
    { value: 'reinforcement', label: language === 'zh' ? '强化学习' : 'Reinforcement Learning', description: language === 'zh' ? '通过奖励机制学习' : 'Learn through reward mechanism' },
    { value: 'hybrid', label: language === 'zh' ? '混合模式' : 'Hybrid Mode', description: language === 'zh' ? '结合多种学习方法' : 'Combine multiple learning methods' }
  ];

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
            <h1 className="text-4xl font-bold mb-4">{getLocalizedText('title')}</h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">{getLocalizedText('subtitle')}</p>
          </div>

          {!isTraining ? (
            /* 训练配置表单 */
            <Card className="bg-zinc-800/50 border-zinc-700 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="basic">{getLocalizedText('basicInfo')}</TabsTrigger>
                    <TabsTrigger value="config">{getLocalizedText('trainingConfig')}</TabsTrigger>
                    <TabsTrigger value="advanced">{getLocalizedText('advanced')}</TabsTrigger>
                  </TabsList>

                  {/* 基本信息 */}
                  <TabsContent value="basic" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('name')}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={trainingData.name}
                          onChange={(value) => handleInputChange('name', value)}
                          required
                          placeholder={t.form.namePlaceholder}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('description')}
                        </label>
                        <Input
                          id="description"
                          name="description"
                          value={trainingData.description}
                          onChange={handleChange}
                          required
                          placeholder={t.form.descriptionPlaceholder}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="prompt" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('prompt')}
                      </label>
                      <Textarea
                        id="prompt"
                        name="prompt"
                        value={trainingData.prompt}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder={t.form.promptPlaceholder}
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500 mt-1">
                        {getLocalizedText('promptDescription')}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="samples" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('samples')}
                      </label>
                      <Textarea
                        id="samples"
                        name="samples"
                        value={trainingData.samples}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder={language === 'zh'
                          ? '提供一些输入输出的示例，帮助智能体学习正确的响应方式...'
                          : 'Provide input-output examples to help the agent learn correct response patterns...'
                        }
                        className="w-full"
                      />
                      <p className="text-xs text-zinc-500 mt-1">
                        {getLocalizedText('samplesFormat')}
                      </p>
                    </div>
                  </TabsContent>

                  {/* 训练配置 */}
                  <TabsContent value="config" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('category')}
                        </label>
                        <select
                          value={trainingData.category}
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
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          {getLocalizedText('modelType')}
                        </label>
                        <select
                          value={trainingData.modelType}
                          onChange={(e) => handleSelectChange('modelType', e.target.value as TrainingData['modelType'])}
                          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          {modelTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('trainingMode')}
                      </label>
                      <select
                        value={trainingData.trainingMode}
                        onChange={(e) => handleSelectChange('trainingMode', e.target.value as TrainingData['trainingMode'])}
                        className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      >
                        {trainingModeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </TabsContent>

                  {/* 高级设置 */}
                  <TabsContent value="advanced" className="space-y-6">
                    <div>
                      <label htmlFor="personality" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('personality')}
                      </label>
                      <Textarea
                        id="personality"
                        name="personality"
                        value={trainingData.personality}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t.form.personalityPlaceholder}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="constraints" className="block text-sm font-medium text-zinc-300 mb-2">
                        {getLocalizedText('constraints')}
                      </label>
                      <Textarea
                        id="constraints"
                        name="constraints"
                        value={trainingData.constraints}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t.form.constraintsPlaceholder}
                        className="w-full"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* 提交按钮 */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full transform hover:scale-105"
                >
                  🚀 {getLocalizedText('submit')}
                </Button>
              </form>
            </Card>
          ) : (
            /* 训练进度界面 */
            <Card className="bg-zinc-800/50 border-zinc-700 p-8 text-center">
              <div className="text-6xl mb-6">🤖</div>
              <h2 className="text-2xl font-bold mb-4">{getLocalizedText('training')}</h2>
              <p className="text-zinc-400 mb-8">
                {getLocalizedText('waitMessage')}
              </p>

              {/* 总体进度 */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">{t.progress.title}</span>
                  <span className="text-zinc-300">{trainingProgress}%</span>
                </div>
                                 <div className="w-full bg-zinc-700 rounded-full h-3">
                   <div
                     className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500"
                     style={{ width: `${trainingProgress}%` }}
                   />
                 </div>
              </div>

              {/* 训练步骤 */}
              <div className="text-left max-w-2xl mx-auto space-y-4">
                {trainingSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
                      step.status === 'completed' && "border-green-500/50 bg-green-500/10",
                      step.status === 'running' && "border-blue-500/50 bg-blue-500/10",
                      step.status === 'pending' && "border-zinc-600 bg-zinc-700/20"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold",
                        step.status === 'completed' && "bg-green-500 text-white",
                        step.status === 'running' && "bg-blue-500 text-white animate-pulse",
                        step.status === 'pending' && "bg-zinc-600 text-zinc-400"
                      )}>
                        {step.status === 'completed' ? '✓' : 
                         step.status === 'running' ? '⟳' : '○'}
                      </div>
                      <div>
                        <div className={cn(
                          "font-medium",
                          step.status === 'completed' && "text-green-400",
                          step.status === 'running' && "text-blue-400",
                          step.status === 'pending' && "text-zinc-500"
                        )}>
                          {step.name[language]}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {step.description[language]}
                        </div>
                      </div>
                    </div>
                    
                    {step.status === 'running' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-zinc-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-blue-400">{step.progress}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {trainingProgress >= 100 && (
                <div className="mt-8">
                  <div className="text-green-400 text-xl font-semibold mb-4">
                    🎉 {getLocalizedText('complete')}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link href="/agents">
                      <Button variant="primary">
                        👁️ {getLocalizedText('viewAgents')}
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={handleReset}>
                      🔄 {language === 'zh' ? '重新训练' : 'Train Again'}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* 说明文字 */}
          <div className="mt-8 text-center text-zinc-400 text-sm">
            <p className="max-w-3xl mx-auto">
              {getLocalizedText('trainingDescription')}
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
