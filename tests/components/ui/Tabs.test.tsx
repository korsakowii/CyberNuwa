import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs, { TabsList, TabsTrigger, TabsContent, TabsGroup } from '../../../components/ui/tabs';

describe('Tabs Component', () => {
  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Tabs Rendering', () => {
    it('renders tabs with default value', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('标签 1')).toBeInTheDocument();
      expect(screen.getByText('标签 2')).toBeInTheDocument();
      expect(screen.getByText('内容 1')).toBeInTheDocument();
      expect(screen.queryByText('内容 2')).not.toBeInTheDocument(); // 默认隐藏
    });

    it('renders with custom className', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange} className="custom-tabs">
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const tabsContainer = screen.getByText('标签 1').closest('div')?.parentElement;
      expect(tabsContainer).toHaveClass('custom-tabs');
    });
  });

  describe('TabsList Component', () => {
    it('renders tabs list with correct styling', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList className="custom-list">
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const tabsList = screen.getByText('标签 1').closest('div');
      expect(tabsList).toHaveClass('custom-list', 'inline-flex', 'h-10', 'items-center');
    });

    it('applies orientation classes correctly', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange} orientation="vertical">
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const tabsList = screen.getByText('标签 1').closest('div');
      expect(tabsList).toHaveClass('flex-col', 'h-auto', 'w-auto');
    });
  });

  describe('TabsTrigger Component', () => {
    it('renders tab trigger with correct value', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1" data-testid="tab1-trigger">标签 1</TabsTrigger>
            <TabsTrigger value="tab2" data-testid="tab2-trigger">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      const tab1Trigger = screen.getByTestId('tab1-trigger');
      const tab2Trigger = screen.getByTestId('tab2-trigger');
      
      expect(tab1Trigger).toHaveAttribute('data-state', 'active');
      expect(tab2Trigger).toHaveAttribute('data-state', 'inactive');
    });

    it('applies custom className to trigger', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1" className="custom-trigger">标签 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const trigger = screen.getByText('标签 1');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('calls onValueChange when clicked', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      const tab2Trigger = screen.getByText('标签 2');
      fireEvent.click(tab2Trigger);
      
      expect(mockOnValueChange).toHaveBeenCalledWith('tab2');
    });

    it('applies disabled state correctly', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const disabledTrigger = screen.getByText('标签 2');
      expect(disabledTrigger).toBeDisabled();
      expect(disabledTrigger).toHaveClass('pointer-events-none', 'opacity-50');
    });

    it('does not call onValueChange when disabled', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const disabledTrigger = screen.getByText('标签 2');
      fireEvent.click(disabledTrigger);
      
      expect(mockOnValueChange).not.toHaveBeenCalled();
    });
  });

  describe('TabsContent Component', () => {
    it('shows content for active tab', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      expect(screen.getByText('内容 1')).toBeInTheDocument();
      expect(screen.queryByText('内容 2')).not.toBeInTheDocument();
    });

    it('shows content when tab becomes active', () => {
      const { rerender } = render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      // 切换到标签 2
      rerender(
        <Tabs value="tab2" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      expect(screen.queryByText('内容 1')).not.toBeInTheDocument();
      expect(screen.getByText('内容 2')).toBeInTheDocument();
    });

    it('applies custom className to content', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content">内容 1</TabsContent>
        </Tabs>
      );
      
      const content = screen.getByText('内容 1');
      expect(content).toHaveClass('custom-content');
    });

    it('applies correct data attributes', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="tab1-content">内容 1</TabsContent>
          <TabsContent value="tab2" data-testid="tab2-content">内容 2</TabsContent>
        </Tabs>
      );
      
      const tab1Content = screen.getByTestId('tab1-content');
      expect(tab1Content).toHaveAttribute('data-state', 'active');
      
      // 由于非活动内容不在DOM中，我们只测试活动内容
      expect(screen.queryByTestId('tab2-content')).not.toBeInTheDocument();
    });
  });

  describe('TabsGroup Component', () => {
    it('renders tabs group with correct styling', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsGroup className="custom-group">
            <TabsList>
              <TabsTrigger value="tab1">标签 1</TabsTrigger>
              <TabsTrigger value="tab2">标签 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">内容 1</TabsContent>
            <TabsContent value="tab2">内容 2</TabsContent>
          </TabsGroup>
        </Tabs>
      );
      
      const group = screen.getByText('标签 1').closest('div')?.parentElement?.parentElement;
      expect(group).toHaveClass('custom-group', 'space-y-4');
    });

    it('applies orientation classes to group', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange} orientation="vertical">
          <TabsGroup>
            <TabsList>
              <TabsTrigger value="tab1">标签 1</TabsTrigger>
              <TabsTrigger value="tab2">标签 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">内容 1</TabsContent>
            <TabsContent value="tab2">内容 2</TabsContent>
          </TabsGroup>
        </Tabs>
      );
      
      // 查找 TabsGroup 内部的 flex 容器
      const flexContainer = document.querySelector('.flex.flex-col.space-y-4.space-x-0');
      expect(flexContainer).toHaveClass('flex', 'flex-col', 'space-y-4', 'space-x-0');
    });
  });

  describe('Orientation Support', () => {
    it('applies horizontal orientation by default', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const tabsList = screen.getByText('标签 1').closest('div');
      expect(tabsList).toHaveClass('inline-flex', 'h-10');
    });

    it('applies vertical orientation when specified', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange} orientation="vertical">
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const tabsList = screen.getByText('标签 1').closest('div');
      expect(tabsList).toHaveClass('flex-col', 'h-auto', 'w-auto');
    });
  });

  describe('Accessibility', () => {
    it('applies correct ARIA attributes', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      const tab1Trigger = screen.getByText('标签 1');
      const tab2Trigger = screen.getByText('标签 2');
      
      expect(tab1Trigger).toHaveAttribute('aria-selected', 'true');
      expect(tab2Trigger).toHaveAttribute('aria-selected', 'false');
    });

    it('applies role attributes correctly', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
        </Tabs>
      );
      
      const tabsList = screen.getByText('标签 1').closest('div');
      const content = screen.getByText('内容 1');
      
      expect(tabsList).toHaveAttribute('role', 'tablist');
      expect(content).toHaveAttribute('role', 'tabpanel');
    });
  });

  describe('Edge Cases', () => {
    it('handles no tabs gracefully', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList />
        </Tabs>
      );
      
      // Should render without crashing
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles no content gracefully', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      // Should render without crashing
      expect(screen.getByText('标签 1')).toBeInTheDocument();
    });

    it('handles invalid value gracefully', () => {
      render(
        <Tabs value="invalid" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      // Should render without crashing, no tab should be active
      expect(screen.getByText('标签 1')).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('标签 2')).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation', () => {
      render(
        <Tabs value="tab1" onValueChange={mockOnValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">标签 1</TabsTrigger>
            <TabsTrigger value="tab2">标签 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">内容 1</TabsContent>
          <TabsContent value="tab2">内容 2</TabsContent>
        </Tabs>
      );
      
      const tab1Trigger = screen.getByText('标签 1');
      tab1Trigger.focus();
      
      // 按右箭头键应该切换到下一个标签
      fireEvent.keyDown(tab1Trigger, { key: 'ArrowRight' });
      
      expect(mockOnValueChange).toHaveBeenCalledWith('tab2');
    });
  });
});
