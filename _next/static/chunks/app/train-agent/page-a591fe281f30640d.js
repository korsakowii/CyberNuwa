(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [67],
  {
    7233: function (e, t, s) {
      Promise.resolve().then(s.bind(s, 8874));
    },
    8874: function (e, t, s) {
      'use strict';
      (s.r(t),
        s.d(t, {
          default: function () {
            return l;
          },
        }));
      var i = s(7437),
        n = s(2265),
        r = s(7648),
        a = s(8596),
        o = s(8800);
      function l() {
        let { language: e, setLanguage: t } = (0, a.Z)(),
          s = o.I[e].trainAgent,
          [l, c] = (0, n.useState)({
            name: '',
            description: '',
            prompt: '',
            samples: '',
            personality: '',
            constraints: '',
          }),
          [u, d] = (0, n.useState)(!1),
          [m, p] = (0, n.useState)(0),
          h = async e => {
            (e.preventDefault(), d(!0), p(0));
            let t = setInterval(() => {
              p(e => (e >= 100 ? (clearInterval(t), d(!1), 100) : e + 10));
            }, 500);
          },
          g = e => {
            c({ ...l, [e.target.name]: e.target.value });
          };
        return (0, i.jsxs)('div', {
          className: 'bg-zinc-900 text-white py-10',
          children: [
            (0, i.jsxs)('div', {
              className: 'max-w-4xl mx-auto px-4',
              children: [
                (0, i.jsxs)('div', {
                  className: 'text-center mb-12',
                  children: [
                    (0, i.jsx)(r.default, {
                      href: '/',
                      className:
                        'text-zinc-400 hover:text-white transition-colors mb-4 inline-block',
                      children: s.backHome,
                    }),
                    (0, i.jsx)('h1', {
                      className: 'text-4xl font-bold mb-4',
                      children: s.title,
                    }),
                    (0, i.jsx)('p', {
                      className: 'text-zinc-400',
                      children: s.subtitle,
                    }),
                  ],
                }),
                u
                  ? (0, i.jsxs)('div', {
                      className:
                        'bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 text-center',
                      children: [
                        (0, i.jsx)('div', {
                          className: 'text-6xl mb-6',
                          children: '\uD83E\uDD16',
                        }),
                        (0, i.jsx)('h2', {
                          className: 'text-2xl font-bold mb-4',
                          children: s.form.training,
                        }),
                        (0, i.jsx)('p', {
                          className: 'text-zinc-400 mb-8',
                          children:
                            'zh' === e
                              ? '请耐心等待，训练过程可能需要几分钟'
                              : 'Please wait patiently, training may take several minutes',
                        }),
                        (0, i.jsxs)('div', {
                          className: 'mb-6',
                          children: [
                            (0, i.jsxs)('div', {
                              className: 'flex justify-between text-sm mb-2',
                              children: [
                                (0, i.jsx)('span', {
                                  className: 'text-zinc-400',
                                  children: s.progress.title,
                                }),
                                (0, i.jsxs)('span', {
                                  className: 'text-zinc-300',
                                  children: [m, '%'],
                                }),
                              ],
                            }),
                            (0, i.jsx)('div', {
                              className: 'w-full bg-zinc-700 rounded-full h-3',
                              children: (0, i.jsx)('div', {
                                className:
                                  'bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500',
                                style: { width: ''.concat(m, '%') },
                              }),
                            }),
                          ],
                        }),
                        (0, i.jsxs)('div', {
                          className: 'text-left max-w-md mx-auto space-y-2',
                          children: [
                            (0, i.jsxs)('div', {
                              className: 'flex items-center space-x-3 '.concat(
                                m >= 20 ? 'text-green-400' : 'text-zinc-500'
                              ),
                              children: [
                                (0, i.jsx)('span', {
                                  children: m >= 20 ? '✓' : '○',
                                }),
                                (0, i.jsx)('span', {
                                  children:
                                    'zh' === e
                                      ? '解析训练数据'
                                      : 'Parsing training data',
                                }),
                              ],
                            }),
                            (0, i.jsxs)('div', {
                              className: 'flex items-center space-x-3 '.concat(
                                m >= 40 ? 'text-green-400' : 'text-zinc-500'
                              ),
                              children: [
                                (0, i.jsx)('span', {
                                  children: m >= 40 ? '✓' : '○',
                                }),
                                (0, i.jsx)('span', {
                                  children:
                                    'zh' === e
                                      ? '构建模型架构'
                                      : 'Building model architecture',
                                }),
                              ],
                            }),
                            (0, i.jsxs)('div', {
                              className: 'flex items-center space-x-3 '.concat(
                                m >= 60 ? 'text-green-400' : 'text-zinc-500'
                              ),
                              children: [
                                (0, i.jsx)('span', {
                                  children: m >= 60 ? '✓' : '○',
                                }),
                                (0, i.jsx)('span', {
                                  children:
                                    'zh' === e
                                      ? '训练模型参数'
                                      : 'Training model parameters',
                                }),
                              ],
                            }),
                            (0, i.jsxs)('div', {
                              className: 'flex items-center space-x-3 '.concat(
                                m >= 80 ? 'text-green-400' : 'text-zinc-500'
                              ),
                              children: [
                                (0, i.jsx)('span', {
                                  children: m >= 80 ? '✓' : '○',
                                }),
                                (0, i.jsx)('span', {
                                  children:
                                    'zh' === e
                                      ? '优化性能'
                                      : 'Optimizing performance',
                                }),
                              ],
                            }),
                            (0, i.jsxs)('div', {
                              className: 'flex items-center space-x-3 '.concat(
                                m >= 100 ? 'text-green-400' : 'text-zinc-500'
                              ),
                              children: [
                                (0, i.jsx)('span', {
                                  children: m >= 100 ? '✓' : '○',
                                }),
                                (0, i.jsx)('span', {
                                  children:
                                    'zh' === e
                                      ? '部署完成'
                                      : 'Deployment complete',
                                }),
                              ],
                            }),
                          ],
                        }),
                        m >= 100 &&
                          (0, i.jsxs)('div', {
                            className: 'mt-8',
                            children: [
                              (0, i.jsxs)('div', {
                                className:
                                  'text-green-400 text-xl font-semibold mb-4',
                                children: [
                                  '\uD83C\uDF89 ',
                                  s.progress.complete,
                                ],
                              }),
                              (0, i.jsx)(r.default, {
                                href: '/agents',
                                className:
                                  'inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors',
                                children:
                                  'zh' === e ? '查看智能体' : 'View Agents',
                              }),
                            ],
                          }),
                      ],
                    })
                  : (0, i.jsx)('div', {
                      className:
                        'bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8',
                      children: (0, i.jsxs)('form', {
                        onSubmit: h,
                        className: 'space-y-6',
                        children: [
                          (0, i.jsxs)('div', {
                            className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                            children: [
                              (0, i.jsxs)('div', {
                                children: [
                                  (0, i.jsx)('label', {
                                    htmlFor: 'name',
                                    className:
                                      'block text-sm font-medium text-zinc-300 mb-2',
                                    children: s.form.name,
                                  }),
                                  (0, i.jsx)('input', {
                                    type: 'text',
                                    id: 'name',
                                    name: 'name',
                                    value: l.name,
                                    onChange: g,
                                    required: !0,
                                    className:
                                      'w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400',
                                    placeholder: s.form.namePlaceholder,
                                  }),
                                ],
                              }),
                              (0, i.jsxs)('div', {
                                children: [
                                  (0, i.jsx)('label', {
                                    htmlFor: 'description',
                                    className:
                                      'block text-sm font-medium text-zinc-300 mb-2',
                                    children: s.form.description,
                                  }),
                                  (0, i.jsx)('input', {
                                    type: 'text',
                                    id: 'description',
                                    name: 'description',
                                    value: l.description,
                                    onChange: g,
                                    required: !0,
                                    className:
                                      'w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400',
                                    placeholder: s.form.descriptionPlaceholder,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, i.jsxs)('div', {
                            children: [
                              (0, i.jsx)('label', {
                                htmlFor: 'prompt',
                                className:
                                  'block text-sm font-medium text-zinc-300 mb-2',
                                children: s.form.prompt,
                              }),
                              (0, i.jsx)('textarea', {
                                id: 'prompt',
                                name: 'prompt',
                                value: l.prompt,
                                onChange: g,
                                required: !0,
                                rows: 4,
                                className:
                                  'w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none',
                                placeholder: s.form.promptPlaceholder,
                              }),
                              (0, i.jsx)('p', {
                                className: 'text-xs text-zinc-500 mt-1',
                                children:
                                  'zh' === e
                                    ? '这是智能体的核心指令，决定了它的基本行为模式'
                                    : "This is the agent's core instruction that determines its basic behavior patterns",
                              }),
                            ],
                          }),
                          (0, i.jsxs)('div', {
                            children: [
                              (0, i.jsx)('label', {
                                htmlFor: 'samples',
                                className:
                                  'block text-sm font-medium text-zinc-300 mb-2',
                                children: s.form.samples,
                              }),
                              (0, i.jsx)('textarea', {
                                id: 'samples',
                                name: 'samples',
                                value: l.samples,
                                onChange: g,
                                required: !0,
                                rows: 6,
                                className:
                                  'w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none',
                                placeholder:
                                  'zh' === e
                                    ? '提供一些输入输出的示例，帮助智能体学习正确的响应方式...'
                                    : 'Provide input-output examples to help the agent learn correct response patterns...',
                              }),
                              (0, i.jsx)('p', {
                                className: 'text-xs text-zinc-500 mt-1',
                                children:
                                  'zh' === e
                                    ? '格式：输入 | 期望输出（每行一个样本）'
                                    : 'Format: Input | Expected Output (one sample per line)',
                              }),
                            ],
                          }),
                          (0, i.jsxs)('div', {
                            children: [
                              (0, i.jsx)('label', {
                                htmlFor: 'personality',
                                className:
                                  'block text-sm font-medium text-zinc-300 mb-2',
                                children: s.form.personality,
                              }),
                              (0, i.jsx)('textarea', {
                                id: 'personality',
                                name: 'personality',
                                value: l.personality,
                                onChange: g,
                                rows: 3,
                                className:
                                  'w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none',
                                placeholder: s.form.personalityPlaceholder,
                              }),
                            ],
                          }),
                          (0, i.jsxs)('div', {
                            children: [
                              (0, i.jsx)('label', {
                                htmlFor: 'constraints',
                                className:
                                  'block text-sm font-medium text-zinc-300 mb-2',
                                children: s.form.constraints,
                              }),
                              (0, i.jsx)('textarea', {
                                id: 'constraints',
                                name: 'constraints',
                                value: l.constraints,
                                onChange: g,
                                rows: 3,
                                className:
                                  'w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-400 resize-none',
                                placeholder: s.form.constraintsPlaceholder,
                              }),
                            ],
                          }),
                          (0, i.jsx)('button', {
                            type: 'submit',
                            className:
                              'w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-800',
                            children: s.form.submit,
                          }),
                        ],
                      }),
                    }),
                (0, i.jsx)('div', {
                  className: 'mt-8 text-center text-zinc-400 text-sm',
                  children: (0, i.jsx)('p', {
                    children:
                      'zh' === e
                        ? '训练完成后，你的智能体将出现在 Agent 养成所中。后续可扩展为接入真实的 LLM 接口进行训练。'
                        : 'After training, your agent will appear in the Agent Incubator. Future versions can integrate with real LLM APIs for training.',
                  }),
                }),
              ],
            }),
            (0, i.jsx)('footer', {
              className: 'bg-zinc-800/50 border-t border-zinc-700 mt-20 pb-24',
              children: (0, i.jsx)('div', {
                className: 'max-w-6xl mx-auto px-4 py-8',
                children: (0, i.jsxs)('div', {
                  className:
                    'flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0',
                  children: [
                    (0, i.jsxs)('div', {
                      className: 'text-zinc-400 text-sm',
                      children: [
                        '\xa9 2024 Cyber N\xfcwa. ',
                        'zh' === e ? '保留所有权利。' : 'All rights reserved.',
                      ],
                    }),
                    (0, i.jsx)('div', {
                      className: 'text-zinc-500 text-xs',
                      children:
                        'zh' === e
                          ? 'AI智能体共创平台'
                          : 'AI Agent Co-Creation Platform',
                    }),
                    (0, i.jsx)('div', {
                      className: 'flex items-center',
                      children: (0, i.jsxs)('button', {
                        onClick: () => t('zh' === e ? 'en' : 'zh'),
                        className:
                          'flex items-center space-x-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors',
                        children: [
                          (0, i.jsx)('span', {
                            children:
                              'zh' === e
                                ? '\uD83C\uDDE8\uD83C\uDDF3'
                                : '\uD83C\uDDFA\uD83C\uDDF8',
                          }),
                          (0, i.jsx)('span', {
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
    8596: function (e, t, s) {
      'use strict';
      s.d(t, {
        LanguageProvider: function () {
          return a;
        },
        Z: function () {
          return o;
        },
      });
      var i = s(7437),
        n = s(2265);
      let r = (0, n.createContext)(void 0);
      function a(e) {
        let { children: t } = e,
          [s, a] = (0, n.useState)('en');
        return (0, i.jsx)(r.Provider, {
          value: { language: s, setLanguage: a },
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
    8800: function (e, t, s) {
      'use strict';
      s.d(t, {
        I: function () {
          return i;
        },
      });
      let i = {
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
      return e((e.s = 7233));
    }),
      (_N_E = e.O()));
  },
]);
