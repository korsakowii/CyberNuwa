import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '../../lib/utils';

// 类型定义
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: ReactNode;
}

interface TabsListProps {
  className?: string;
  children: ReactNode;
}

interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}

interface TabsGroupProps {
  label?: string;
  className?: string;
  children: ReactNode;
}

// Context
const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

// 主组件
export const Tabs: React.FC<TabsProps> = ({
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const controlledValue = value !== undefined ? value : internalValue;
  const activeTab = controlledValue || (React.Children.toArray(children)[0] as any)?.props?.value || '';

  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, orientation }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList 组件
export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  const { orientation } = useTabsContext();
  
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500',
        orientation === 'vertical' && 'flex-col h-auto w-40',
        className
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
};

// TabsTrigger 组件
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const { activeTab, setActiveTab, orientation } = useTabsContext();
  const isActive = activeTab === value;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    // 获取所有标签页的值
    const tabValues: string[] = [];
    const tabElements = event.currentTarget.parentElement?.querySelectorAll('[role="tab"]');
    if (tabElements) {
      tabElements.forEach(tab => {
        const tabValue = tab.getAttribute('data-value') || tab.getAttribute('value');
        if (tabValue && typeof tabValue === 'string') tabValues.push(tabValue);
      });
    }

    const currentIndex = tabValues.indexOf(value);
    let nextValue = value;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < tabValues.length - 1) {
          const nextTabValue = tabValues[currentIndex + 1];
          if (nextTabValue) nextValue = nextTabValue;
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          const prevTabValue = tabValues[currentIndex - 1];
          if (prevTabValue) nextValue = prevTabValue;
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setActiveTab(value);
        return;
    }

    if (nextValue !== value) {
      setActiveTab(nextValue);
    }
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        isActive
          ? 'bg-white text-gray-950 shadow-sm'
          : 'text-gray-600 hover:text-gray-950',
        disabled && 'pointer-events-none opacity-50',
        orientation === 'vertical' && 'w-full justify-start',
        className
      )}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      onKeyDown={handleKeyDown}
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      {...props}
    >
      {children}
    </button>
  );
};

// TabsContent 组件
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        className
      )}
      role="tabpanel"
      data-state={isActive ? 'active' : 'inactive'}
      data-testid={`${value}-content`}
      {...props}
    >
      {children}
    </div>
  );
};

// TabsGroup 组件
export const TabsGroup: React.FC<TabsGroupProps> = ({
  label,
  className,
  children,
}) => {
  const { orientation } = useTabsContext();

  return (
    <div className={cn(
      orientation === 'vertical' ? 'mb-4' : 'space-y-4',
      className
    )}>
      {label && (
        <h3 className="mb-2 text-sm font-medium text-gray-700">{label}</h3>
      )}
      <div className={cn(
        orientation === 'horizontal' ? 'flex space-x-4 space-y-0' : 'flex flex-col space-y-4 space-x-0'
      )}>
        {children}
      </div>
    </div>
  );
};

// 组合组件
export const TabsRoot = Tabs;
export const TabsTab = TabsTrigger;
export const TabsPanel = TabsContent;

// 默认导出
export default Tabs;
