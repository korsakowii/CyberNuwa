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
      info: '信息'
    },
    
    // 主页面
    home: {
      hero: {
        title: '🌌 Cyber Nüwa',
        subtitle: '面向创意共创与智能体养成的开放式平台',
        description: '融合 Kaggle 的任务机制、Notion 的协作空间与 HuggingFace 的模型文化'
      },
      modules: {
        title: '探索平台模块',
        launchMission: { title: '🚀 发起任务', description: '提交创意任务，让社区共同孵化' },
        agents: { title: '🤖 Agent 养成所', description: '查看智能体列表与训练记录' },
        trainAgent: { title: '🎯 训练智能体', description: '通过提示词和样本训练自定义 Agent' },
        wishes: { title: '⭐ 许愿池', description: '展示灵感碎片和半成品想法' },
        roles: { title: '👥 用户角色', description: '扮演不同角色，体验不同权限路径' },
        narratives: { title: '📖 元叙事广场', description: '记录社区发展和 Agent 传记' },
        taskSquare: { title: '🏛️ 任务广场', description: '浏览所有公开任务与进展' }
      },
      vision: {
        title: '项目愿景',
        content: '让每个创意都被看见、让每位参与者都能留下痕迹，在非问答型协作中捏出赛博智能体，共同建造一座人机共创的灵感宇宙。'
      }
    },

    // Launch Mission 页面
    launchMission: {
      title: '🚀 发起任务',
      subtitle: '提交创意任务，让社区共同孵化',
      form: {
        title: '任务标题',
        titlePlaceholder: '输入你的创意任务标题...',
        description: '任务描述',
        descriptionPlaceholder: '详细描述你的任务需求、目标和期望结果...',
        tags: '标签',
        tagsPlaceholder: '用逗号分隔的标签，如：AI, 创意, 协作',
        submit: '提交任务',
        back: '返回首页'
      },
      success: {
        title: '🎉 任务提交成功！',
        message: '你的创意任务已成功提交到社区。我们将尽快审核并发布。',
        newTask: '提交新任务',
        back: '返回首页'
      }
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
        inactive: '已停用'
      },
      status: {
        active: '运行中',
        training: '训练中',
        inactive: '已停用',
        unknown: '未知'
      }
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
        training: '训练中...'
      },
      progress: {
        title: '训练进度',
        complete: '训练完成！'
      }
    },

    // Wishes 页面
    wishes: {
      title: '⭐ 许愿池',
      subtitle: '展示灵感碎片和半成品想法',
      backHome: '← 返回首页',
      addWish: '添加愿望',
      status: {
        idea: '灵感',
        'in-progress': '进行中',
        completed: '已完成',
        unknown: '未知'
      }
    },

    // Roles 页面
    roles: {
      title: '👥 用户角色',
      subtitle: '扮演不同角色，体验不同权限路径',
      backHome: '← 返回首页'
    },

    // Narratives 页面
    narratives: {
      title: '📖 元叙事广场',
      subtitle: '记录社区发展和 Agent 传记',
      backHome: '← 返回首页'
    },

    // Task Square 页面
    taskSquare: {
      title: '🏛️ 任务广场',
      subtitle: '浏览所有公开任务与进展',
      backHome: '← 返回首页'
    }
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
      info: 'Info'
    },

    // Home page
    home: {
      hero: {
        title: '🌌 Cyber Nüwa',
        subtitle: 'Open Platform for Creative Co-Creation and AI Agent Development',
        description: 'Integrating Kaggle\'s task mechanisms, Notion\'s collaborative spaces, and HuggingFace\'s model culture'
      },
      modules: {
        title: 'Explore Platform Modules',
        launchMission: { title: '🚀 Launch Mission', description: 'Submit creative tasks for community incubation' },
        agents: { title: '🤖 Agent Incubator', description: 'View agent list and training records' },
        trainAgent: { title: '🎯 Train Agent', description: 'Train custom agents with prompts and samples' },
        wishes: { title: '⭐ Wish Pool', description: 'Show inspiration fragments and half-finished ideas' },
        roles: { title: '👥 User Roles', description: 'Experience different roles and permission paths' },
        narratives: { title: '📖 Metanarrative Square', description: 'Record community development and agent biographies' },
        taskSquare: { title: '🏛️ Task Square', description: 'Browse all public tasks and progress' }
      },
      vision: {
        title: 'Project Vision',
        content: 'Let every idea be seen, let every participant leave their mark, mold cyber agents through non-Q&A collaboration, and together build a universe of human-machine co-creation.'
      }
    },

    // Launch Mission page
    launchMission: {
      title: '🚀 Launch Mission',
      subtitle: 'Submit creative tasks for community incubation',
      form: {
        title: 'Mission Title',
        titlePlaceholder: 'Enter your creative mission title...',
        description: 'Mission Description',
        descriptionPlaceholder: 'Describe your mission requirements, goals, and expected outcomes...',
        tags: 'Tags',
        tagsPlaceholder: 'Comma-separated tags, e.g.: AI, Creative, Collaboration',
        submit: 'Submit Mission',
        back: 'Back to Home'
      },
      success: {
        title: '🎉 Mission Submitted Successfully!',
        message: 'Your creative mission has been successfully submitted to the community. We will review and publish it soon.',
        newTask: 'Submit New Mission',
        back: 'Back to Home'
      }
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
        inactive: 'Inactive'
      },
      status: {
        active: 'Active',
        training: 'Training',
        inactive: 'Inactive',
        unknown: 'Unknown'
      }
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
        descriptionPlaceholder: 'Briefly describe the agent\'s function...',
        prompt: 'Core Prompt *',
        promptPlaceholder: 'Define the agent\'s core behavior and response patterns...',
        samples: 'Training Samples',
        samplesPlaceholder: 'Provide some example conversations or scenarios...',
        personality: 'Personality Traits',
        personalityPlaceholder: 'Describe the agent\'s personality...',
        constraints: 'Behavior Constraints',
        constraintsPlaceholder: 'Define the agent\'s behavioral boundaries...',
        submit: 'Start Training',
        training: 'Training...'
      },
      progress: {
        title: 'Training Progress',
        complete: 'Training Complete!'
      }
    },

    // Wishes page
    wishes: {
      title: '⭐ Wish Pool',
      subtitle: 'Show inspiration fragments and half-finished ideas',
      backHome: '← Back to Home',
      addWish: 'Add Wish',
      status: {
        idea: 'Idea',
        'in-progress': 'In Progress',
        completed: 'Completed',
        unknown: 'Unknown'
      }
    },

    // Roles page
    roles: {
      title: '👥 User Roles',
      subtitle: 'Experience different roles and permission paths',
      backHome: '← Back to Home'
    },

    // Narratives page
    narratives: {
      title: '📖 Metanarrative Square',
      subtitle: 'Record community development and agent biographies',
      backHome: '← Back to Home'
    },

    // Task Square page
    taskSquare: {
      title: '🏛️ Task Square',
      subtitle: 'Browse all public tasks and progress',
      backHome: '← Back to Home'
    }
  }
} 