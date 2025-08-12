'use client';

import { useState } from 'react';

export default function WishesSimple() {
  const [language, setLanguage] = useState<'zh' | 'en'>('en');
  const [wishes] = useState([
    {
      id: 1,
      title: { zh: 'AI 诗歌创作助手', en: 'AI Poetry Assistant' },
      description: {
        zh: '一个能够根据用户情感和主题创作个性化诗歌的智能体。',
        en: 'An agent that creates personalized poems based on user emotions and themes.',
      },
      author: { zh: '诗人小A', en: 'Poet A' },
      status: 'idea',
      likes: 23,
      comments: 8,
      views: 1567,
      tags: {
        zh: ['AI', '诗歌', '创作'],
        en: ['AI', 'Poetry', 'Creation'],
      },
      createdAt: '2024-01-15',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea':
        return 'text-blue-400 bg-blue-400/10';
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'completed':
        return 'text-green-400 bg-green-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'idea':
        return language === 'zh' ? '灵感' : 'Idea';
      case 'in-progress':
        return language === 'zh' ? '进行中' : 'In Progress';
      case 'completed':
        return language === 'zh' ? '已完成' : 'Completed';
      default:
        return language === 'zh' ? '未知' : 'Unknown';
    }
  };

  return (
    <div className='min-h-screen bg-zinc-900 text-white'>
      <div className='max-w-6xl mx-auto px-4 py-10'>
        <div className='text-center mb-12'>
          <a
            className='text-zinc-400 hover:text-white transition-colors mb-4 inline-block'
            href='/'
          >
            {language === 'zh' ? '← 返回首页' : '← Back to Home'}
          </a>
          <h1 className='text-4xl font-bold mb-4'>
            {language === 'zh' ? '⭐ 许愿池' : '⭐ Wishing Pool'}
          </h1>
          <p className='text-zinc-400 mb-6'>
            {language === 'zh'
              ? '展示灵感碎片和半成品想法'
              : 'Show inspiration fragments and half-finished ideas'}
          </p>
          <button className='inline-block bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105'>
            {language === 'zh' ? '添加愿望' : 'Add Wish'}
          </button>

          {/* Language Switcher */}
          <div className='mt-4'>
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className='flex items-center space-x-2 px-3 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors mx-auto'
            >
              <span>{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
              <span>{language === 'zh' ? '中文' : 'English'}</span>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {wishes.map(wish => (
            <div
              key={wish.id}
              className='bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-zinc-600 transition-all duration-300 transform hover:-translate-y-1'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold mb-2'>
                    {wish.title[language]}
                  </h3>
                  <div className='flex items-center space-x-2 text-sm text-zinc-400'>
                    <span>
                      {language === 'zh' ? '作者：' : 'by '}
                      {wish.author[language]}
                    </span>
                    <span>•</span>
                    <span>{wish.createdAt}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(wish.status)}`}
                >
                  {getStatusText(wish.status)}
                </span>
              </div>

              <p className='text-zinc-300 text-sm mb-4 leading-relaxed'>
                {wish.description[language]}
              </p>

              <div className='flex flex-wrap gap-2 mb-4'>
                {wish.tags[language].map((tag, index) => (
                  <span
                    key={index}
                    className='px-2 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className='flex items-center justify-between text-sm text-zinc-400'>
                <div className='flex items-center space-x-4'>
                  <button className='flex items-center space-x-1 hover:text-pink-400 transition-colors'>
                    <span>❤️</span>
                    <span>{wish.likes}</span>
                  </button>
                  <button className='flex items-center space-x-1 hover:text-blue-400 transition-colors'>
                    <span>💬</span>
                    <span>{wish.comments}</span>
                  </button>
                  <span className='flex items-center space-x-1'>
                    <span role='img' aria-label='views'>
                      👀
                    </span>
                    <span>{wish.views?.toLocaleString() || 0}</span>
                  </span>
                </div>
                <button className='text-pink-400 hover:text-pink-300 transition-colors'>
                  {language === 'zh' ? '支持这个愿望' : 'Support this wish'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
