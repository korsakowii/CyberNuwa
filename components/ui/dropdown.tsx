import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';

// 下拉选项接口
export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  divider?: boolean;
}

// 下拉组件属性
interface DropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  searchable?: boolean;
  placeholder?: string;
  maxHeight?: string;
}

// 下拉菜单组件
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  options,
  onSelect,
  className,
  placement = 'bottom',
  align = 'start',
  width = 'auto',
  disabled = false,
  searchable = false,
  placeholder = '搜索...',
  maxHeight = '300px'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // 过滤选项
  const filteredOptions = searchable
    ? options.filter(option => 
        !option.divider && 
        option.label && 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 处理选项选择
  const handleOptionSelect = (option: DropdownOption) => {
    if (option.disabled || option.divider) return;
    
    setSelectedOption(option);
    onSelect?.(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  // 获取位置类名
  const getPlacementClasses = () => {
    const baseClasses = 'absolute z-50';
    
    switch (placement) {
      case 'top':
        return cn(baseClasses, 'bottom-full mb-2');
      case 'bottom':
        return cn(baseClasses, 'top-full mt-2');
      case 'left':
        return cn(baseClasses, 'right-full mr-2');
      case 'right':
        return cn(baseClasses, 'left-full ml-2');
      default:
        return cn(baseClasses, 'top-full mt-2');
    }
  };

  // 获取对齐类名
  const getAlignClasses = () => {
    switch (align) {
      case 'start':
        return 'left-0';
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      case 'end':
        return 'right-0';
      default:
        return 'left-0';
    }
  };

  // 获取宽度类名
  const getWidthClasses = () => {
    switch (width) {
      case 'sm':
        return 'w-32';
      case 'md':
        return 'w-56';
      case 'lg':
        return 'w-64';
      case 'xl':
        return 'w-80';
      default:
        return 'w-56';
    }
  };

  return (
    <div className={cn('relative inline-block', className)}>
      {/* 触发器 */}
      <div
        ref={triggerRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {trigger}
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            getPlacementClasses(),
            getAlignClasses(),
            getWidthClasses(),
            'bg-white border border-gray-200 rounded-md shadow-lg'
          )}
        >
          {/* 搜索框 */}
          {searchable && (
            <div className="p-3 border-b border-gray-100">
              <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          )}

          {/* 选项列表 */}
          <div
            className="overflow-y-auto"
            style={{ maxHeight }}
          >
            {filteredOptions.map((option, index) => (
              <div key={option.value || index}>
                {option.divider ? (
                  <div className="h-px bg-gray-200 my-1" />
                ) : (
                  <div
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors',
                      option.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100',
                      selectedOption?.value === option.value && 'bg-blue-50 text-blue-700'
                    )}
                  >
                    {option.icon && (
                      <span className="flex-shrink-0">{option.icon}</span>
                    )}
                    <span className="flex-1">{option.label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 无结果提示 */}
          {searchable && filteredOptions.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              无搜索结果
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 下拉按钮组件
interface DropdownButtonProps extends Omit<DropdownProps, 'trigger'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  ...dropdownProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      {...dropdownProps}
      trigger={
        <Button
          variant={variant}
          size={size}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          {icon}
          {label}
          <svg
            className={cn(
              'w-4 h-4 transition-transform',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      }
    />
  );
};

// 默认导出
export default Dropdown;
