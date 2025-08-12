'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Dropdown } from './ui/dropdown';
import { cn } from '@/lib/utils';

interface LanguageOption {
  code: 'zh' | 'en';
  name: string;
  flag: string;
  nativeName: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: 'zh',
    name: 'Chinese',
    flag: '🇨🇳',
    nativeName: '中文'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  }
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languageOptions.find(lang => lang.code === language) ?? languageOptions[0]!;

  const handleLanguageChange = (lang: 'zh' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Dropdown
        trigger={
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDropdown}
            className={cn(
              'w-10 h-10 p-0 rounded-full transition-all duration-200',
              'bg-transparent hover:bg-zinc-800/20',
              'flex items-center justify-center',
              isOpen && 'bg-zinc-800/30'
            )}
            aria-label="Language Switcher"
          >
            <span className="text-lg">{currentLanguage.flag}</span>
          </Button>
        }
        options={languageOptions.map(option => ({
          value: option.code,
          label: option.nativeName,
          icon: <span className="text-base mr-2">{option.flag}</span>
        }))}
        onSelect={(option) => handleLanguageChange(option.value as 'zh' | 'en')}
        placement="bottom"
        className="min-w-[140px]"
      />
    </div>
  );
}
