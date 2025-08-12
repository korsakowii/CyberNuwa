import { TranslationKeys } from '@/types/translations';

// Chinese translations
export const zhTranslations: TranslationKeys = {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    view: '查看',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    reset: '重置',
    search: '搜索',
    filter: '筛选',
    sort: '排序',
    refresh: '刷新',
    close: '关闭',
    open: '打开',
    yes: '是',
    no: '否',
    ok: '确定',
    retry: '重试',
    copy: '复制',
    share: '分享',
    download: '下载',
    upload: '上传',
    settings: '设置',
    profile: '个人资料',
    logout: '退出登录',
    login: '登录',
    register: '注册',
  },
  pages: {
    home: {
      title: 'CyberNuwa',
      subtitle: 'AI智能体训练与协作平台',
      description: '构建、训练和部署AI智能体，与社区协作共创未来',
      getStarted: '开始使用',
      learnMore: '了解更多',
      features: {
        title: '核心功能',
        aiTraining: 'AI训练',
        collaboration: '协作平台',
        community: '社区生态',
      },
    },
    wishes: {
      title: '💫 愿望广场',
      subtitle: '分享你的创意想法与需求',
      currentDisplay: '当前显示',
      wishes: '个愿望',
      loading: '加载中...',
      loadingFailed: '加载失败',
      retry: '重试',
      copyright: '© 2024 CyberNuwa. 保留所有权利。',
      currentLanguage: '当前语言：中文',
      currentLanguageEn: 'Current Language: English',
      defaultWishes: {
        title: '智能体训练助手',
        description: '需要一个能够帮助训练AI智能体的助手工具',
        author: 'AI爱好者',
        tags: 'AI训练,智能体,助手',
      },
      add: {
        title: '添加新愿望',
        subtitle: '分享你的创意想法',
        form: {
          title: '愿望标题',
          titlePlaceholder: '输入愿望标题...',
          description: '愿望描述',
          descriptionPlaceholder: '详细描述你的愿望...',
          tags: '标签',
          tagsPlaceholder: '用逗号分隔标签...',
          submit: '提交愿望',
          back: '返回',
        },
      },
    },
    agents: {
      title: '🤖 智能体广场',
      subtitle: '探索和训练AI智能体',
      creator: '创建者',
      creatorBy: '创建者：',
      trainingProgress: '训练进度',
      viewDetails: '查看详情',
      use: '使用',
      noAgentsYet: '暂无智能体',
      noAgentsDesc: '开始训练你的第一个AI智能体',
      startTraining: '开始训练',
      avgProgress: '平均完成度',
    },
    launchMission: {
      title: '🚀 发布任务',
      subtitle: '创建新的协作任务',
      form: {
        title: '任务标题',
        titlePlaceholder: '输入任务标题...',
        description: '任务描述',
        descriptionPlaceholder: '详细描述你的任务需求...',
        tags: '标签',
        tagsPlaceholder: '用逗号分隔标签...',
        submit: '🚀 发布任务',
        submitting: '提交中...',
        back: '返回',
      },
    },
    trainAgent: {
      title: '🎯 训练智能体',
      subtitle: '定制化AI智能体训练',
    },
    roles: {
      title: '👥 角色管理',
      subtitle: '管理用户角色和权限',
    },
    narratives: {
      title: '📖 元叙事广场',
      subtitle: '记录社区发展与智能体传记',
      backHome: '← 返回首页',
      total: '总叙事',
      agentBiographies: '智能体传记',
      communityHistory: '社区历史',
      totalLikes: '总点赞',
      readMore: '阅读更多',
      other: '其他',
      shareStory: '分享故事',
      shareButton: '分享我的故事',
      shareDesc1: '记录你在平台上的重要时刻',
      shareDesc2: '分享你的智能体训练心得',
      timelineTitle: '发展时间线',
      types: {
        community: '社区历史',
        agentBiography: '智能体传记',
        other: '其他',
      },
    },
    taskSquare: {
      title: '🏛️ 任务广场',
      subtitle: '浏览所有公开任务与进度',
      backHome: '← 返回首页',
      total: '总任务',
      open: '开放中',
      inProgress: '进行中',
      completed: '已完成',
      closed: '已关闭',
      pending: '待处理',
      high: '高',
      medium: '中',
      low: '低',
      reward: '奖励',
      participants: '参与者',
      assignee: '负责人',
      experience: '经验值',
    },
  },
  components: {
    wishCard: {
      like: '点赞',
      comment: '评论',
      share: '分享',
      edit: '编辑',
      delete: '删除',
      status: {
        pending: '待处理',
        inProgress: '进行中',
        completed: '已完成',
        cancelled: '已取消',
      },
      priority: {
        low: '低',
        medium: '中',
        high: '高',
        urgent: '紧急',
      },
    },
    translationControls: {
      language: '语言',
      autoTranslate: '自动翻译',
      settings: '设置',
    },
    errorBoundary: {
      title: '出现错误',
      message: '抱歉，页面出现了问题',
      retry: '重试',
      report: '报告问题',
    },
    apiStatus: {
      online: '在线',
      offline: '离线',
      connecting: '连接中',
      error: '连接错误',
    },
  },
  forms: {
    common: {
      required: '必填',
      optional: '可选',
      minLength: '最小长度',
      maxLength: '最大长度',
      invalidFormat: '格式无效',
    },
    validation: {
      required: '此字段为必填项',
      minLength: '长度不能少于 {min} 个字符',
      maxLength: '长度不能超过 {max} 个字符',
      invalidEmail: '请输入有效的邮箱地址',
      invalidUrl: '请输入有效的URL',
      invalidNumber: '请输入有效的数字',
      invalidDate: '请输入有效的日期',
    },
  },
  errors: {
    common: {
      unexpected: '发生意外错误',
      notFound: '页面未找到',
      unauthorized: '未授权访问',
      forbidden: '禁止访问',
      serverError: '服务器错误',
    },
    network: {
      connectionFailed: '连接失败',
      timeout: '请求超时',
      serverUnavailable: '服务器不可用',
    },
  },
};

// English translations
export const enTranslations: TranslationKeys = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    close: 'Close',
    open: 'Open',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    retry: 'Retry',
    copy: 'Copy',
    share: 'Share',
    download: 'Download',
    upload: 'Upload',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
  },
  pages: {
    home: {
      title: 'CyberNuwa',
      subtitle: 'AI Agent Training & Collaboration Platform',
      description:
        'Build, train and deploy AI agents, collaborate with community to create the future',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      features: {
        title: 'Core Features',
        aiTraining: 'AI Training',
        collaboration: 'Collaboration',
        community: 'Community',
      },
    },
    wishes: {
      title: '💫 Wish Square',
      subtitle: 'Share your creative ideas and needs',
      currentDisplay: 'Currently displaying',
      wishes: 'wishes',
      loading: 'Loading...',
      loadingFailed: 'Loading failed',
      retry: 'Retry',
      copyright: '© 2024 CyberNuwa. All rights reserved.',
      currentLanguage: 'Current Language: English',
      currentLanguageEn: 'Current Language: English',
      defaultWishes: {
        title: 'Agent Training Assistant',
        description: 'Need an assistant tool to help train AI agents',
        author: 'AI Enthusiast',
        tags: 'AI Training,Agent,Assistant',
      },
      add: {
        title: 'Add New Wish',
        subtitle: 'Share your creative ideas',
        form: {
          title: 'Wish Title',
          titlePlaceholder: 'Enter wish title...',
          description: 'Wish Description',
          descriptionPlaceholder: 'Describe your wish in detail...',
          tags: 'Tags',
          tagsPlaceholder: 'Separate tags with commas...',
          submit: 'Submit Wish',
          back: 'Back',
        },
      },
    },
    agents: {
      title: '🤖 Agent Square',
      subtitle: 'Explore and train AI agents',
      creator: 'Creator',
      creatorBy: 'Creator: ',
      trainingProgress: 'Training Progress',
      viewDetails: 'View Details',
      use: 'Use',
      noAgentsYet: 'No agents yet',
      noAgentsDesc: 'Start training your first AI agent',
      startTraining: 'Start Training',
      avgProgress: 'Average Progress',
    },
    launchMission: {
      title: '🚀 Launch Mission',
      subtitle: 'Create new collaboration tasks',
      form: {
        title: 'Mission Title',
        titlePlaceholder: 'Enter your creative mission title...',
        description: 'Mission Description',
        descriptionPlaceholder:
          'Describe your mission requirements, goals, and expected outcomes in detail...',
        tags: 'Tags',
        tagsPlaceholder:
          'Comma-separated tags, e.g.: AI, Creative, Collaboration',
        submit: 'Submit Mission',
        submitting: 'Submitting...',
        back: 'Back to Home',
      },
    },
    trainAgent: {
      title: '🎯 Train Agent',
      subtitle: 'Customized AI agent training',
    },
    roles: {
      title: '👥 Role Management',
      subtitle: 'Manage user roles and permissions',
    },
    narratives: {
      title: '📖 Metanarrative Square',
      subtitle: 'Record community development and Agent biographies',
      backHome: '← Back to Home',
      total: 'Total Narratives',
      agentBiographies: 'Agent Biographies',
      communityHistory: 'Community History',
      totalLikes: 'Total Likes',
      readMore: 'Read More',
      other: 'Other',
      shareStory: 'Share Your Story',
      shareButton: 'Share My Story',
      shareDesc1: 'Record your important moments on the platform',
      shareDesc2: 'Share your agent training insights',
      timelineTitle: 'Development Timeline',
      types: {
        community: 'Community History',
        agentBiography: 'Agent Biography',
        other: 'Other',
      },
    },
    taskSquare: {
      title: '🏛️ Task Square',
      subtitle: 'Browse all public tasks and progress',
      backHome: '← Back to Home',
      total: 'Total Tasks',
      open: 'Open',
      inProgress: 'In Progress',
      completed: 'Completed',
      closed: 'Closed',
      pending: 'Pending',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      reward: 'Reward',
      participants: 'Participants',
      assignee: 'Assignee',
      experience: 'XP',
    },
  },
  components: {
    wishCard: {
      like: 'Like',
      comment: 'Comment',
      share: 'Share',
      edit: 'Edit',
      delete: 'Delete',
      status: {
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },
      priority: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        urgent: 'Urgent',
      },
    },
    translationControls: {
      language: 'Language',
      autoTranslate: 'Auto Translate',
      settings: 'Settings',
    },
    errorBoundary: {
      title: 'Something went wrong',
      message: 'Sorry, there was a problem with this page',
      retry: 'Try again',
      report: 'Report issue',
    },
    apiStatus: {
      online: 'Online',
      offline: 'Offline',
      connecting: 'Connecting',
      error: 'Connection Error',
    },
  },
  forms: {
    common: {
      required: 'Required',
      optional: 'Optional',
      minLength: 'Minimum length',
      maxLength: 'Maximum length',
      invalidFormat: 'Invalid format',
    },
    validation: {
      required: 'This field is required',
      minLength: 'Must be at least {min} characters',
      maxLength: 'Must be no more than {max} characters',
      invalidEmail: 'Please enter a valid email address',
      invalidUrl: 'Please enter a valid URL',
      invalidNumber: 'Please enter a valid number',
      invalidDate: 'Please enter a valid date',
    },
  },
  errors: {
    common: {
      unexpected: 'An unexpected error occurred',
      notFound: 'Page not found',
      unauthorized: 'Unauthorized access',
      forbidden: 'Access forbidden',
      serverError: 'Server error',
    },
    network: {
      connectionFailed: 'Connection failed',
      timeout: 'Request timeout',
      serverUnavailable: 'Server unavailable',
    },
  },
};

// Translation manager class
export class TranslationManager {
  private translations: Record<string, TranslationKeys> = {
    zh: zhTranslations,
    en: enTranslations,
  };

  getTranslation(path: string, language: 'zh' | 'en'): string {
    const keys = path.split('.');
    let current: any = this.translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return path; // Return path if translation not found
      }
    }

    return typeof current === 'string' ? current : path;
  }

  validateTranslations(): string[] {
    const errors: string[] = [];

    // Validate that all translation keys exist in both languages
    const zhKeys = this.getAllKeys(zhTranslations);
    const enKeys = this.getAllKeys(enTranslations);

    const missingInZh = enKeys.filter(key => !this.hasKey(zhTranslations, key));
    const missingInEn = zhKeys.filter(key => !this.hasKey(enTranslations, key));

    missingInZh.forEach(key =>
      errors.push(`Missing Chinese translation for: ${key}`)
    );
    missingInEn.forEach(key =>
      errors.push(`Missing English translation for: ${key}`)
    );

    return errors;
  }

  private getAllKeys(obj: any, prefix = ''): string[] {
    const keys: string[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          keys.push(...this.getAllKeys(obj[key], currentKey));
        } else {
          keys.push(currentKey);
        }
      }
    }

    return keys;
  }

  private hasKey(obj: any, path: string): boolean {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return false;
      }
    }

    return true;
  }
}

// Export default instance
export const translationManager = new TranslationManager();
