(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [550],
  {
    9217: function (e, t, i) {
      Promise.resolve().then(i.bind(i, 2915));
    },
    2915: function (e, t, i) {
      'use strict';
      (i.r(t),
        i.d(t, {
          default: function () {
            return o;
          },
        }));
      var s = i(7437),
        n = i(7648),
        r = i(8596),
        a = i(8800);
      function o() {
        let { language: e, setLanguage: t } = (0, r.Z)(),
          i = a.I[e].roles,
          o = [
            {
              name: { zh: '创意者', en: 'Creator' },
              level: { zh: '初级', en: 'Beginner' },
              color: 'from-pink-500 to-rose-600',
              icon: '\uD83C\uDFA8',
            },
            {
              name: { zh: '训练师', en: 'Trainer' },
              level: { zh: '中级', en: 'Intermediate' },
              color: 'from-blue-500 to-purple-600',
              icon: '\uD83E\uDD16',
            },
            {
              name: { zh: '守护者', en: 'Guardian' },
              level: { zh: '高级', en: 'Advanced' },
              color: 'from-green-500 to-teal-600',
              icon: '\uD83C\uDFDB️',
            },
            {
              name: { zh: '元老', en: 'Elder' },
              level: { zh: '顶级', en: 'Top' },
              color: 'from-yellow-500 to-orange-600',
              icon: '\uD83C\uDF1F',
            },
          ];
        return (0, s.jsxs)('div', {
          className: 'bg-zinc-900 text-white py-10',
          children: [
            (0, s.jsxs)('div', {
              className: 'max-w-6xl mx-auto px-4',
              children: [
                (0, s.jsxs)('div', {
                  className: 'text-center mb-12',
                  children: [
                    (0, s.jsx)(n.default, {
                      href: '/',
                      className:
                        'text-zinc-400 hover:text-white transition-colors mb-4 inline-block',
                      children: i.backHome,
                    }),
                    (0, s.jsx)('h1', {
                      className: 'text-4xl font-bold mb-4',
                      children: i.title,
                    }),
                    (0, s.jsx)('p', {
                      className: 'text-zinc-400 mb-6',
                      children: i.subtitle,
                    }),
                  ],
                }),
                (0, s.jsxs)('div', {
                  className:
                    'bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 mb-8',
                  children: [
                    (0, s.jsx)('h2', {
                      className: 'text-xl font-semibold mb-4',
                      children: i.currentStatus,
                    }),
                    (0, s.jsxs)('div', {
                      className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
                      children: [
                        (0, s.jsxs)('div', {
                          className: 'text-center',
                          children: [
                            (0, s.jsx)('div', {
                              className: 'text-2xl font-bold text-blue-400',
                              children: { zh: '创意者', en: 'Creator' }[e],
                            }),
                            (0, s.jsx)('div', {
                              className: 'text-zinc-400',
                              children: { zh: '初级', en: 'Beginner' }[e],
                            }),
                          ],
                        }),
                        (0, s.jsxs)('div', {
                          className: 'text-center',
                          children: [
                            (0, s.jsxs)('div', {
                              className: 'text-2xl font-bold text-green-400',
                              children: [45, '%'],
                            }),
                            (0, s.jsx)('div', {
                              className: 'text-zinc-400',
                              children: i.upgradeProgress,
                            }),
                          ],
                        }),
                        (0, s.jsxs)('div', {
                          className: 'text-center',
                          children: [
                            (0, s.jsx)('div', {
                              className: 'text-sm text-zinc-300',
                              children: {
                                zh: '完成2个任务以获得训练师资格',
                                en: 'Complete 2 tasks to qualify as a Trainer',
                              }[e],
                            }),
                            (0, s.jsx)('div', {
                              className: 'text-zinc-400',
                              children: i.nextRequirement,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, s.jsxs)('div', {
                      className: 'mt-4',
                      children: [
                        (0, s.jsxs)('div', {
                          className: 'flex justify-between text-sm mb-1',
                          children: [
                            (0, s.jsx)('span', {
                              className: 'text-zinc-400',
                              children: i.upgradeProgress,
                            }),
                            (0, s.jsxs)('span', {
                              className: 'text-zinc-300',
                              children: [45, '%'],
                            }),
                          ],
                        }),
                        (0, s.jsx)('div', {
                          className: 'w-full bg-zinc-700 rounded-full h-2',
                          children: (0, s.jsx)('div', {
                            className:
                              'bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300',
                            style: { width: ''.concat(45, '%') },
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)('div', {
                  className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                  children: [
                    {
                      id: 1,
                      name: { zh: '创意者', en: 'Creator' },
                      description: {
                        zh: '专注于提出创新想法和概念的用户',
                        en: 'Users focused on proposing innovative ideas and concepts',
                      },
                      level: { zh: '初级', en: 'Beginner' },
                      permissions: {
                        zh: ['提交任务', '参与讨论', '查看公开内容'],
                        en: [
                          'Submit Tasks',
                          'Participate in Discussions',
                          'View Public Content',
                        ],
                      },
                      requirements: {
                        zh: '完成注册即可获得',
                        en: 'Granted upon registration',
                      },
                      avatar: '\uD83C\uDFA8',
                      color: 'from-pink-500 to-rose-600',
                      members: 156,
                      nextLevel: {
                        zh: '中级创意者',
                        en: 'Intermediate Creator',
                      },
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
                        zh: ['训练智能体', '发布训练成果', '参与技术讨论'],
                        en: [
                          'Train Agents',
                          'Publish Training Results',
                          'Join Technical Discussions',
                        ],
                      },
                      requirements: {
                        zh: '完成3个任务并获得好评',
                        en: 'Complete 3 tasks and receive positive feedback',
                      },
                      avatar: '\uD83E\uDD16',
                      color: 'from-blue-500 to-purple-600',
                      members: 89,
                      nextLevel: { zh: '高级训练师', en: 'Advanced Trainer' },
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
                        zh: ['内容审核', '用户管理', '平台规则制定'],
                        en: [
                          'Content Review',
                          'User Management',
                          'Platform Rule Setting',
                        ],
                      },
                      requirements: {
                        zh: '成为训练师6个月以上，贡献突出',
                        en: 'Be a trainer for over 6 months with outstanding contributions',
                      },
                      avatar: '\uD83C\uDFDB️',
                      color: 'from-green-500 to-teal-600',
                      members: 23,
                      nextLevel: { zh: '元老守护者', en: 'Elder Guardian' },
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
                        zh: ['平台决策参与', '特殊功能访问', '导师资格'],
                        en: [
                          'Participate in Platform Decisions',
                          'Access Special Features',
                          'Mentor Qualification',
                        ],
                      },
                      requirements: {
                        zh: '成为守护者1年以上，对平台有重大贡献',
                        en: 'Be a guardian for over 1 year with significant contributions',
                      },
                      avatar: '\uD83C\uDF1F',
                      color: 'from-yellow-500 to-orange-600',
                      members: 7,
                      nextLevel: null,
                    },
                  ].map((t, n) =>
                    (0, s.jsxs)(
                      'div',
                      {
                        className:
                          'bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1',
                        children: [
                          (0, s.jsxs)('div', {
                            className: 'flex items-center justify-between mb-4',
                            children: [
                              (0, s.jsxs)('div', {
                                className: 'flex items-center space-x-3',
                                children: [
                                  (0, s.jsx)('div', {
                                    className:
                                      'w-12 h-12 rounded-lg bg-gradient-to-r '.concat(
                                        t.color,
                                        ' flex items-center justify-center text-2xl'
                                      ),
                                    children: t.avatar,
                                  }),
                                  (0, s.jsxs)('div', {
                                    children: [
                                      (0, s.jsx)('h3', {
                                        className: 'text-xl font-semibold',
                                        children: t.name[e],
                                      }),
                                      (0, s.jsx)('p', {
                                        className: 'text-sm text-zinc-400',
                                        children: t.level[e],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsxs)('div', {
                                className: 'text-right',
                                children: [
                                  (0, s.jsx)('div', {
                                    className:
                                      'text-lg font-bold text-zinc-300',
                                    children: t.members,
                                  }),
                                  (0, s.jsx)('div', {
                                    className: 'text-xs text-zinc-400',
                                    children: i.members,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, s.jsx)('p', {
                            className:
                              'text-zinc-300 text-sm mb-4 leading-relaxed',
                            children: t.description[e],
                          }),
                          (0, s.jsxs)('div', {
                            className: 'mb-4',
                            children: [
                              (0, s.jsx)('h4', {
                                className:
                                  'text-sm font-medium text-zinc-300 mb-2',
                                children: i.permissions,
                              }),
                              (0, s.jsx)('div', {
                                className: 'space-y-1',
                                children: t.permissions[e].map((e, t) =>
                                  (0, s.jsxs)(
                                    'div',
                                    {
                                      className:
                                        'flex items-center space-x-2 text-sm text-zinc-400',
                                      children: [
                                        (0, s.jsx)('span', {
                                          className: 'text-green-400',
                                          children: '✓',
                                        }),
                                        (0, s.jsx)('span', { children: e }),
                                      ],
                                    },
                                    t
                                  )
                                ),
                              }),
                            ],
                          }),
                          (0, s.jsxs)('div', {
                            className: 'mb-4',
                            children: [
                              (0, s.jsx)('h4', {
                                className:
                                  'text-sm font-medium text-zinc-300 mb-2',
                                children: i.requirement,
                              }),
                              (0, s.jsx)('p', {
                                className: 'text-sm text-zinc-400',
                                children: t.requirements[e],
                              }),
                            ],
                          }),
                          t.nextLevel &&
                            (0, s.jsxs)('div', {
                              className: 'mb-4',
                              children: [
                                (0, s.jsx)('h4', {
                                  className:
                                    'text-sm font-medium text-zinc-300 mb-2',
                                  children: i.nextLevel,
                                }),
                                (0, s.jsx)('p', {
                                  className: 'text-sm text-zinc-400',
                                  children: t.nextLevel[e],
                                }),
                              ],
                            }),
                          (0, s.jsx)('button', {
                            className:
                              'w-full bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300',
                            children: i.viewDetails,
                          }),
                        ],
                      },
                      t.id
                    )
                  ),
                }),
                (0, s.jsxs)('div', {
                  className: 'mt-12',
                  children: [
                    (0, s.jsx)('h2', {
                      className: 'text-2xl font-bold text-center mb-8',
                      children: i.roleDevelopmentPath,
                    }),
                    (0, s.jsxs)('div', {
                      className:
                        'bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6',
                      children: [
                        (0, s.jsx)('div', {
                          className:
                            'flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4',
                          children: o.map((t, i) =>
                            (0, s.jsxs)(
                              'div',
                              {
                                className:
                                  'flex flex-col items-center text-center',
                                children: [
                                  (0, s.jsx)('div', {
                                    className:
                                      'w-16 h-16 rounded-full bg-gradient-to-r '.concat(
                                        t.color,
                                        ' flex items-center justify-center text-2xl mb-2'
                                      ),
                                    children: t.icon,
                                  }),
                                  (0, s.jsx)('div', {
                                    className:
                                      'text-sm font-medium text-zinc-300',
                                    children: t.name[e],
                                  }),
                                  (0, s.jsx)('div', {
                                    className: 'text-xs text-zinc-400',
                                    children: t.level[e],
                                  }),
                                  i < o.length - 1 &&
                                    (0, s.jsx)('div', {
                                      className:
                                        'hidden md:block w-16 h-0.5 bg-zinc-600 mt-4',
                                    }),
                                ],
                              },
                              t.name.zh
                            )
                          ),
                        }),
                        (0, s.jsx)('div', {
                          className: 'mt-6 text-center text-sm text-zinc-400',
                          children: (0, s.jsx)('p', {
                            children: i.roleDevelopmentPathDescription,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)('div', {
                  className: 'mt-8 text-center text-zinc-400 text-sm',
                  children: (0, s.jsxs)('p', {
                    children: [
                      i.howToProgress1,
                      (0, s.jsx)('br', {}),
                      i.howToProgress2,
                    ],
                  }),
                }),
              ],
            }),
            (0, s.jsx)('footer', {
              className: 'bg-zinc-800/50 border-t border-zinc-700 mt-20 pb-24',
              children: (0, s.jsx)('div', {
                className: 'max-w-6xl mx-auto px-4 py-8',
                children: (0, s.jsxs)('div', {
                  className:
                    'flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0',
                  children: [
                    (0, s.jsxs)('div', {
                      className: 'text-zinc-400 text-sm',
                      children: [
                        '\xa9 2024 Cyber N\xfcwa. ',
                        'zh' === e ? '保留所有权利。' : 'All rights reserved.',
                      ],
                    }),
                    (0, s.jsx)('div', {
                      className: 'text-zinc-500 text-xs',
                      children:
                        'zh' === e
                          ? 'AI智能体共创平台'
                          : 'AI Agent Co-Creation Platform',
                    }),
                    (0, s.jsx)('div', {
                      className: 'flex items-center',
                      children: (0, s.jsxs)('button', {
                        onClick: () => t('zh' === e ? 'en' : 'zh'),
                        className:
                          'flex items-center space-x-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors',
                        children: [
                          (0, s.jsx)('span', {
                            children:
                              'zh' === e
                                ? '\uD83C\uDDE8\uD83C\uDDF3'
                                : '\uD83C\uDDFA\uD83C\uDDF8',
                          }),
                          (0, s.jsx)('span', {
                            children: 'zh' === e ? '中文' : 'English',
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        });
      }
    },
    8596: function (e, t, i) {
      'use strict';
      i.d(t, {
        LanguageProvider: function () {
          return a;
        },
        Z: function () {
          return o;
        },
      });
      var s = i(7437),
        n = i(2265);
      let r = (0, n.createContext)(void 0);
      function a(e) {
        let { children: t } = e,
          [i, a] = (0, n.useState)('en');
        return (0, s.jsx)(r.Provider, {
          value: { language: i, setLanguage: a },
          children: t,
        });
      }
      function o() {
        let e = (0, n.useContext)(r);
        if (void 0 === e)
          throw Error('useLanguage must be used within a LanguageProvider');
        return e;
      }
    },
    8800: function (e, t, i) {
      'use strict';
      i.d(t, {
        I: function () {
          return s;
        },
      });
      let s = {
        zh: {
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
          home: {
            hero: {
              title: '\uD83C\uDF0C Cyber N\xfcwa',
              subtitle: '面向创意共创与智能体养成的开放式平台',
              description:
                '融合 Kaggle 的任务机制、Notion 的协作空间与 HuggingFace 的模型文化',
            },
            modules: {
              title: '探索平台模块',
              launchMission: {
                title: '\uD83D\uDE80 发起任务',
                description: '提交创意任务，让社区共同孵化',
              },
              agents: {
                title: '\uD83E\uDD16 Agent 养成所',
                description: '查看智能体列表与训练记录',
              },
              trainAgent: {
                title: '\uD83C\uDFAF 训练智能体',
                description: '通过提示词和样本训练自定义 Agent',
              },
              wishes: {
                title: '⭐ 许愿池',
                description: '展示灵感碎片和半成品想法',
              },
              roles: {
                title: '\uD83D\uDC65 用户角色',
                description: '扮演不同角色，体验不同权限路径',
              },
              narratives: {
                title: '\uD83D\uDCD6 元叙事广场',
                description: '记录社区发展和 Agent 传记',
              },
              taskSquare: {
                title: '\uD83C\uDFDB️ 任务广场',
                description: '浏览所有公开任务与进展',
              },
            },
            vision: {
              title: '项目愿景',
              content:
                '让每个创意都被看见、让每位参与者都能留下痕迹，在非问答型协作中捏出赛博智能体，共同建造一座人机共创的灵感宇宙。',
            },
          },
          launchMission: {
            title: '\uD83D\uDE80 发起任务',
            subtitle: '提交创意任务，让社区共同孵化',
            form: {
              title: '任务标题',
              titlePlaceholder: '输入你的创意任务标题...',
              description: '任务描述',
              descriptionPlaceholder: '详细描述你的任务需求、目标和期望结果...',
              tags: '标签',
              tagsPlaceholder: '用逗号分隔的标签，如：AI, 创意, 协作',
              submit: '提交任务',
              back: '返回首页',
            },
            success: {
              title: '\uD83C\uDF89 任务提交成功！',
              message: '你的创意任务已成功提交到社区。我们将尽快审核并发布。',
              newTask: '提交新任务',
              back: '返回首页',
            },
          },
          agents: {
            title: '\uD83E\uDD16 Agent 养成所',
            subtitle: '查看智能体列表与训练记录',
            backHome: '← 返回首页',
            trainNew: '\uD83C\uDFAF 训练新智能体',
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
          },
          trainAgent: {
            title: '\uD83C\uDFAF 训练智能体',
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
            progress: { title: '训练进度', complete: '训练完成！' },
          },
          wishes: {
            title: '⭐ 许愿池',
            subtitle: '展示灵感碎片和半成品想法',
            backHome: '← 返回首页',
            addWish: '添加愿望',
            supportWish: '支持这个愿望',
            status: {
              idea: '灵感',
              'in-progress': '进行中',
              completed: '已完成',
              unknown: '未知',
            },
          },
          roles: {
            title: '\uD83D\uDC65 用户角色',
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
          narratives: {
            title: '\uD83D\uDCD6 元叙事广场',
            subtitle: '记录社区发展和 Agent 传记',
            backHome: '← 返回首页',
            total: '总叙事数',
            agentBiographies: '智能体传记',
            communityHistory: '社区历史',
            totalLikes: '总点赞数',
            readMore: '阅读全文',
            other: '其他',
            shareStory: '分享你的故事',
            shareButton: '撰写叙事',
            shareDesc1:
              '无论是社区贡献的经历，还是智能体训练的心得，都值得被记录和分享。',
            shareDesc2: '让我们一起书写 CyberNuwa 的历史。',
            timelineTitle: '社区发展时间线',
          },
          taskSquare: {
            title: '\uD83C\uDFDB️ 任务广场',
            subtitle: '浏览所有公开任务与进展',
            addTask: '发布新任务',
            totalTasks: '总任务数',
            inProgress: '进行中',
            completed: '已完成',
            participants: '参与者',
            status: {
              pending: '待启动',
              'in-progress': '进行中',
              completed: '已完成',
              unknown: '未知',
            },
            priority: {
              high: '高优先级',
              medium: '中优先级',
              low: '低优先级',
              unknown: '未知',
            },
            assignee: '负责人',
            viewResult: '查看成果',
            details: '详情',
            deadline: '截止：',
            reward: '经验值：',
            emptyTaskSquare: '暂无任务',
            beFirst: '成为第一个发布任务的用户吧！',
            launchFirstTask: '发布第一个任务',
            backHome: '← 返回首页',
            viewProgress: '查看进展',
            progress: '完成进度',
          },
        },
        en: {
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
          home: {
            hero: {
              title: '\uD83C\uDF0C Cyber N\xfcwa',
              subtitle:
                'Open Platform for Creative Co-Creation and AI Agent Development',
              description:
                "Integrating Kaggle's task mechanisms, Notion's collaborative spaces, and HuggingFace's model culture",
            },
            modules: {
              title: 'Explore Platform Modules',
              launchMission: {
                title: '\uD83D\uDE80 Launch Mission',
                description: 'Submit creative tasks for community incubation',
              },
              agents: {
                title: '\uD83E\uDD16 Agent Incubator',
                description: 'View agent list and training records',
              },
              trainAgent: {
                title: '\uD83C\uDFAF Train Agent',
                description: 'Train custom agents with prompts and samples',
              },
              wishes: {
                title: '⭐ Wish Pool',
                description:
                  'Show inspiration fragments and half-finished ideas',
              },
              roles: {
                title: '\uD83D\uDC65 User Roles',
                description: 'Experience different roles and permission paths',
              },
              narratives: {
                title: '\uD83D\uDCD6 Metanarrative Square',
                description:
                  'Record community development and agent biographies',
              },
              taskSquare: {
                title: '\uD83C\uDFDB️ Task Square',
                description: 'Browse all public tasks and progress',
              },
            },
            vision: {
              title: 'Project Vision',
              content:
                'Let every idea be seen, let every participant leave their mark, mold cyber agents through non-Q&A collaboration, and together build a universe of human-machine co-creation.',
            },
          },
          launchMission: {
            title: '\uD83D\uDE80 Launch Mission',
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
              back: 'Back to Home',
            },
            success: {
              title: '\uD83C\uDF89 Mission Submitted Successfully!',
              message:
                'Your creative mission has been successfully submitted to the community. We will review and publish it soon.',
              newTask: 'Submit New Mission',
              back: 'Back to Home',
            },
          },
          agents: {
            title: '\uD83E\uDD16 Agent Incubator',
            subtitle: 'View agent list and training records',
            backHome: '← Back to Home',
            trainNew: '\uD83C\uDFAF Train New Agent',
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
          },
          trainAgent: {
            title: '\uD83C\uDFAF Train Agent',
            subtitle: 'Train custom agents with prompts and samples',
            backHome: '← Back to Home',
            form: {
              name: 'Agent Name *',
              namePlaceholder: 'Give your agent a name...',
              description: 'Agent Description *',
              descriptionPlaceholder:
                "Briefly describe the agent's function...",
              prompt: 'Core Prompt *',
              promptPlaceholder:
                "Define the agent's core behavior and response patterns...",
              samples: 'Training Samples',
              samplesPlaceholder:
                'Provide some example conversations or scenarios...',
              personality: 'Personality Traits',
              personalityPlaceholder: "Describe the agent's personality...",
              constraints: 'Behavior Constraints',
              constraintsPlaceholder:
                "Define the agent's behavioral boundaries...",
              submit: 'Start Training',
              training: 'Training...',
            },
            progress: {
              title: 'Training Progress',
              complete: 'Training Complete!',
            },
          },
          wishes: {
            title: '⭐ Wish Pool',
            subtitle: 'Show inspiration fragments and half-finished ideas',
            backHome: '← Back to Home',
            addWish: 'Add Wish',
            supportWish: 'Support this wish',
            status: {
              idea: 'Idea',
              'in-progress': 'In Progress',
              completed: 'Completed',
              unknown: 'Unknown',
            },
          },
          roles: {
            title: '\uD83D\uDC65 User Roles',
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
          narratives: {
            title: '\uD83D\uDCD6 Metanarrative Square',
            subtitle: 'Record community development and agent biographies',
            backHome: '← Back to Home',
            total: 'Total Narratives',
            agentBiographies: 'Agent Biographies',
            communityHistory: 'Community History',
            totalLikes: 'Total Likes',
            readMore: 'Read More',
            other: 'Other',
            shareStory: 'Share Your Story',
            shareButton: 'Write Narrative',
            shareDesc1:
              'Whether it is the experience of community contribution or the insights of agent training, it is worth recording and sharing.',
            shareDesc2: 'Let us write the history of CyberNuwa together.',
            timelineTitle: 'Community Timeline',
          },
          taskSquare: {
            title: '\uD83C\uDFDB️ Task Square',
            subtitle: 'Browse all public tasks and progress',
            addTask: 'Publish New Task',
            totalTasks: 'Total Tasks',
            inProgress: 'In Progress',
            completed: 'Completed',
            participants: 'Participants',
            status: {
              pending: 'Pending',
              'in-progress': 'In Progress',
              completed: 'Completed',
              unknown: 'Unknown',
            },
            priority: {
              high: 'High Priority',
              medium: 'Medium Priority',
              low: 'Low Priority',
              unknown: 'Unknown',
            },
            assignee: 'Assignee',
            viewResult: 'View Result',
            details: 'Details',
            deadline: 'Deadline:',
            reward: 'XP:',
            emptyTaskSquare: 'No tasks yet',
            beFirst: 'Be the first to publish a task!',
            launchFirstTask: 'Publish the first task',
            backHome: '← Back to Home',
            viewProgress: 'View Progress',
            progress: 'Progress',
          },
        },
      };
    },
  },
  function (e) {
    (e.O(0, [648, 971, 117, 744], function () {
      return e((e.s = 9217));
    }),
      (_N_E = e.O()));
  },
]);
