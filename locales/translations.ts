export const translations = {
  zh: {
    // 通用
    common: {
      backHome: '← 返回首页',
      loading: '加载中...',
      submit: '提交',
      cancel: '取消',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      view: '查看',
      add: '添加',
      search: '搜索',
      filter: '筛选',
      sort: '排序',
      refresh: '刷新',
      close: '关闭',
      confirm: '确认',
      yes: '是',
      no: '否',
      ok: '确定',
      error: '错误',
      success: '成功',
      warning: '警告',
      info: '信息',
    },

    // 主页面
    home: {
      hero: {
        title: '🌌 Cyber Nüwa',
        subtitle: '面向创意共创与智能体养成的开放式平台',
        description:
          '融合 Kaggle 的任务机制、Notion 的协作空间与 HuggingFace 的模型文化',
      },
      modules: {
        title: '探索平台模块',
        launchMission: {
          title: '发起任务',
          description: '提交创意任务，让社区共同孵化',
        },
        agents: {
          title: 'Agent 养成所',
          description: '查看智能体列表与训练记录',
        },
        trainAgent: {
          title: '训练智能体',
          description: '通过提示词和样本训练自定义 Agent',
        },
        wishes: { title: '许愿池', description: '展示灵感碎片和半成品想法' },
        roles: {
          title: '用户角色',
          description: '扮演不同角色，体验不同权限路径',
        },
        narratives: {
          title: '元叙事广场',
          description: '记录社区发展和 Agent 传记',
        },
        taskSquare: {
          title: '任务广场',
          description: '浏览所有公开任务与进展',
        },
      },
      vision: {
        title: '项目愿景',
        content:
          '让每个创意都被看见、让每位参与者都能留下痕迹，在非问答型协作中捏出赛博智能体，共同建造一座人机共创的灵感宇宙。',
      },
    },

    // Launch Mission 页面
    launchMission: {
      title: '🚀 发起任务',
      subtitle: '提交创意任务，让社区共同孵化',
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
      success: {
        title: '🎉 任务提交成功！',
        message: '你的创意任务已成功提交到社区。我们将尽快审核并发布。',
        newTask: '提交新任务',
        back: '返回首页',
      },
    },

    // Agents 页面
    agents: {
      title: '🤖 Agent 养成所',
      subtitle: '查看智能体列表与训练记录',
      backHome: '← 返回首页',
      trainNew: '🎯 训练新智能体',
      stats: {
        total: '总智能体数',
        active: '运行中',
        training: '训练中',
        inactive: '已停用',
      },
      status: {
        active: '运行中',
        training: '训练中',
        inactive: '已停用',
        unknown: '未知',
      },
      // 添加页面中硬编码的文本翻译
      creator: '创建者',
      creatorBy: 'by',
      trainingProgress: '训练进度',
      viewDetails: '查看详情',
      use: '使用',
      noAgentsYet: '还没有智能体',
      noAgentsDesc: '成为第一个训练智能体的用户吧！',
      startTraining: '开始训练',
      avgProgress: '平均完成度',
    },

    // Train Agent 页面
    trainAgent: {
      title: '🎯 训练智能体',
      subtitle: '通过提示词和样本训练自定义 Agent',
      backHome: '← 返回首页',
      form: {
        name: '智能体名称 *',
        namePlaceholder: '给你的智能体起个名字...',
        description: '智能体描述 *',
        descriptionPlaceholder: '简要描述智能体的功能...',
        prompt: '核心提示词 *',
        promptPlaceholder: '定义智能体的核心行为和响应模式...',
        samples: '训练样本',
        samplesPlaceholder: '提供一些示例对话或场景...',
        personality: '性格特征',
        personalityPlaceholder: '描述智能体的性格特点...',
        constraints: '行为约束',
        constraintsPlaceholder: '定义智能体的行为边界...',
        submit: '开始训练',
        training: '训练中...',
      },
      progress: {
        title: '训练进度',
        complete: '训练完成！',
      },
    },

    // Wishes 页面
    wishes: {
      title: '⭐ 许愿池',
      subtitle: '展示灵感碎片和半成品想法',
      backHome: '← 返回首页',
      addWish: '添加愿望',
      supportWish: '支持这个愿望',
      dropWish: '许下愿望',
      author: '作者',
      time: '时间',
      likes: '点赞',
      comments: '评论',
      views: '浏览',
      status: {
        idea: '灵感',
        'in-progress': '进行中',
        completed: '已完成',
        pending: '待处理',
        processing: '处理中',
        done: '已完成',
        unknown: '未知',
      },
      // 添加页面中硬编码的文本翻译
      currentDisplay: '当前显示',
      wishes: '个愿望',
      loading: '加载中...',
      loadingFailed: '加载失败',
      retry: '重试',
      // 页脚和调试组件翻译
      copyright: '© 2025 Cyber Nüwa. All rights reserved.',
      currentLanguage: '当前语言: 中文',
      currentLanguageEn: 'Current Language: English',
      // 默认愿望数据翻译
      defaultWishes: {
        coffee: {
          title: '每天都能喝到完美的咖啡',
          description:
            '找到最适合的咖啡豆，每一天都从一杯完美的咖啡开始，甚至能预测明天想喝什么口味。',
          author: '咖啡爱好者',
          tags: ['咖啡', '生活品质', '日常'],
        },
        anime: {
          title: '实时翻译日漫',
          description:
            '不用等字幕组，实时翻译喜欢的日漫，享受原汁原味的观看体验，顺便自动配音成我的声音。',
          author: '动漫迷',
          tags: ['动漫', '翻译', '娱乐'],
        },
        dream: {
          title: '分析梦境含义',
          description:
            '分析梦境，了解这些奇怪的梦到底是什么意思，探索潜意识世界，顺便预测今晚会做什么梦。',
          author: '梦境探索者',
          tags: ['梦境', '心理学', '探索'],
        },
        plant: {
          title: '多肉植物养护',
          description:
            '多肉植物不再死掉，知道什么时候浇水、施肥，茁壮成长，还能听懂植物说话。',
          author: '植物父母',
          tags: ['植物', '养护', '生活'],
        },
      },
    },

    // Roles 页面
    roles: {
      title: '👥 用户角色',
      subtitle: '扮演不同角色，体验不同权限路径',
      backHome: '← 返回首页',
      currentStatus: '你的当前状态',
      upgradeProgress: '升级进度',
      members: '成员',
      permissions: '权限',
      requirement: '获得要求',
      nextLevel: '下一级',
      nextRequirement: '下一级要求',
      viewDetails: '查看详情',
      roleDevelopmentPath: '角色发展路径',
      roleDevelopmentPathDescription:
        '每个角色都有独特的权限和发展路径，通过贡献和参与来提升你的角色等级',
      howToProgress1:
        '想要提升角色等级？积极参与任务、训练智能体、贡献优质内容！',
      howToProgress2: '每个角色都有独特的成长路径和专属权限。',
    },

    // Narratives 页面
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

    // Task Square 页面
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

  en: {
    // Common
    common: {
      backHome: '← Back to Home',
      loading: 'Loading...',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      refresh: 'Refresh',
      close: 'Close',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
    },

    // Home page
    home: {
      hero: {
        title: '🌌 Cyber Nüwa',
        subtitle:
          'Open Platform for Creative Co-Creation and AI Agent Development',
        description:
          "Integrating Kaggle's task mechanisms, Notion's collaborative spaces, and HuggingFace's model culture",
      },
      modules: {
        title: 'Explore Platform Modules',
        launchMission: {
          title: 'Launch Mission',
          description: 'Submit creative tasks for community incubation',
        },
        agents: {
          title: 'Agent Incubator',
          description: 'View agent list and training records',
        },
        trainAgent: {
          title: 'Train Agent',
          description: 'Train custom agents with prompts and samples',
        },
        wishes: {
          title: 'Wish Pool',
          description: 'Show inspiration fragments and half-finished ideas',
        },
        roles: {
          title: 'User Roles',
          description: 'Experience different roles and permission paths',
        },
        narratives: {
          title: 'Metanarrative Square',
          description: 'Record community development and agent biographies',
        },
        taskSquare: {
          title: 'Task Square',
          description: 'Browse all public tasks and progress',
        },
      },
      vision: {
        title: 'Project Vision',
        content:
          'Let every idea be seen, let every participant leave their mark, mold cyber agents through non-Q&A collaboration, and together build a universe of human-machine co-creation.',
      },
    },

    // Launch Mission page
    launchMission: {
      title: '🚀 Launch Mission',
      subtitle: 'Submit creative tasks for community incubation',
      form: {
        title: 'Mission Title',
        titlePlaceholder: 'Enter your creative mission title...',
        description: 'Mission Description',
        descriptionPlaceholder:
          'Describe your mission requirements, goals, and expected outcomes...',
        tags: 'Tags',
        tagsPlaceholder:
          'Comma-separated tags, e.g.: AI, Creative, Collaboration',
        submit: 'Submit Mission',
        submitting: 'Submitting...',
        back: 'Back to Home',
      },
      success: {
        title: '🎉 Mission Submitted Successfully!',
        message:
          'Your creative mission has been successfully submitted to the community. We will review and publish it soon.',
        newTask: 'Submit New Mission',
        back: 'Back to Home',
      },
    },

    // Agents page
    agents: {
      title: '🤖 Agent Incubator',
      subtitle: 'View agent list and training records',
      backHome: '← Back to Home',
      trainNew: '🎯 Train New Agent',
      stats: {
        total: 'Total Agents',
        active: 'Active',
        training: 'Training',
        inactive: 'Inactive',
      },
      status: {
        active: 'Active',
        training: 'Training',
        inactive: 'Inactive',
        unknown: 'Unknown',
      },
      // 添加页面中硬编码的文本翻译
      creator: 'Creator',
      creatorBy: 'by',
      trainingProgress: 'Training Progress',
      viewDetails: 'View Details',
      use: 'Use',
      noAgentsYet: 'No agents yet',
      noAgentsDesc: 'Be the first to train an agent!',
      startTraining: 'Start Training',
      avgProgress: 'Avg Progress',
    },

    // Train Agent page
    trainAgent: {
      title: '🎯 Train Agent',
      subtitle: 'Train custom agents with prompts and samples',
      backHome: '← Back to Home',
      form: {
        name: 'Agent Name *',
        namePlaceholder: 'Give your agent a name...',
        description: 'Agent Description *',
        descriptionPlaceholder: "Briefly describe the agent's function...",
        prompt: 'Core Prompt *',
        promptPlaceholder:
          "Define the agent's core behavior and response patterns...",
        samples: 'Training Samples',
        samplesPlaceholder:
          'Provide some example conversations or scenarios...',
        personality: 'Personality Traits',
        personalityPlaceholder: "Describe the agent's personality...",
        constraints: 'Behavior Constraints',
        constraintsPlaceholder: "Define the agent's behavioral boundaries...",
        submit: 'Start Training',
        training: 'Training...',
      },
      progress: {
        title: 'Training Progress',
        complete: 'Training Complete!',
      },
    },

    // Wishes page
    wishes: {
      title: '⭐ Wish Pool',
      subtitle: 'Show inspiration fragments and half-finished ideas',
      backHome: '← Back to Home',
      addWish: 'Add Wish',
      supportWish: 'Support this wish',
      dropWish: 'Make a Wish',
      author: 'Author',
      time: 'Time',
      likes: 'Likes',
      comments: 'Comments',
      views: 'Views',
      status: {
        idea: 'Idea',
        'in-progress': 'In Progress',
        completed: 'Completed',
        pending: 'Pending',
        processing: 'Processing',
        done: 'Done',
        unknown: 'Unknown',
      },
      // 添加页面中硬编码的文本翻译
      currentDisplay: 'Current Display',
      wishes: ' wishes',
      loading: 'Loading...',
      loadingFailed: 'Loading failed',
      retry: 'Retry',
      // 页脚和调试组件翻译
      copyright: '© 2025 Cyber Nüwa. All rights reserved.',
      currentLanguage: 'Current Language: English',
      currentLanguageEn: 'Current Language: English',
      // 默认愿望数据翻译
      defaultWishes: {
        coffee: {
          title: 'Perfect coffee every day',
          description:
            "Find the perfect coffee beans, start every day with a perfect cup, even predict what you'll want to drink tomorrow.",
          author: 'Coffee lover',
          tags: ['Coffee', 'Quality of life', 'Daily'],
        },
        anime: {
          title: 'Real-time Japanese anime translation',
          description:
            'No need to wait for subtitles, translate your favorite Japanese anime in real-time, enjoy the original viewing experience, and automatically dub it in my voice.',
          author: 'Anime fan',
          tags: ['Anime', 'Translation', 'Entertainment'],
        },
        dream: {
          title: 'Analyze dream meanings',
          description:
            "Analyze dreams, understand what these strange dreams mean, explore the subconscious world, and predict what you'll dream about tonight.",
          author: 'Dream explorer',
          tags: ['Dreams', 'Psychology', 'Exploration'],
        },
        plant: {
          title: 'Succulent care',
          description:
            'Succulents no longer die, know when to water and fertilize, thrive, and even understand what plants say.',
          author: 'Plant parents',
          tags: ['Plants', 'Care', 'Lifestyle'],
        },
      },
    },

    // Roles page
    roles: {
      title: '👥 User Roles',
      subtitle: 'Experience different roles and permission paths',
      backHome: '← Back to Home',
      currentStatus: 'Your Current Status',
      upgradeProgress: 'Upgrade Progress',
      members: 'Members',
      permissions: 'Permissions',
      requirement: 'Requirement',
      nextLevel: 'Next Level',
      nextRequirement: 'Next Requirement',
      viewDetails: 'View Details',
      roleDevelopmentPath: 'Role Development Path',
      roleDevelopmentPathDescription:
        'Each role has unique permissions and development paths. Improve your role level through contribution and participation.',
      howToProgress1:
        'Want to level up your role? Actively participate in tasks, train agents, and contribute quality content!',
      howToProgress2:
        'Each role has a unique growth path and exclusive permissions.',
    },

    // Narratives page
    narratives: {
      title: '📖 Metanarrative Square',
      subtitle: 'Record community development and agent biographies',
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

    // Task Square page
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
};
