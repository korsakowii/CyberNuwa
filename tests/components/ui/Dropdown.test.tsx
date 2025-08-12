import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dropdown from '../../../components/ui/dropdown';
import type { DropdownOption } from '../../../components/ui/dropdown';

// 模拟Button组件
jest.mock('../../../components/ui/button', () => {
  return function MockButton({ children, onClick, disabled, className, ...props }: any) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={className}
        data-testid="dropdown-button"
        {...props}
      >
        {children}
      </button>
    );
  };
});

describe('Dropdown Component', () => {
  const mockOptions: DropdownOption[] = [
    { label: '选项 1', value: 'option1' },
    { label: '选项 2', value: 'option2' },
    { label: '选项 3', value: 'option3', disabled: true },
    { label: '', value: 'divider', divider: true },
    { label: '选项 4', value: 'option4', icon: '🌟' }
  ];

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders dropdown trigger', () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      expect(screen.getByText('点击我')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
          className="custom-dropdown"
        />
      );
      
      const dropdown = screen.getByText('点击我').closest('div')?.parentElement;
      expect(dropdown).toHaveClass('custom-dropdown');
    });
  });

  describe('Dropdown Menu', () => {
    it('shows dropdown menu when clicked', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('选项 1')).toBeInTheDocument();
        expect(screen.getByText('选项 2')).toBeInTheDocument();
        expect(screen.getByText('选项 3')).toBeInTheDocument();
        expect(screen.getByText('选项 4')).toBeInTheDocument();
      });
    });

    it('hides dropdown menu when clicking outside', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('选项 1')).toBeInTheDocument();
      });
      
      // 点击外部
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(screen.queryByText('选项 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('Option Selection', () => {
    it('calls onSelect when option is clicked', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByText('选项 1');
        fireEvent.click(option);
      });
      
      expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0]);
    });

    it('closes dropdown after selection', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByText('选项 1');
        fireEvent.click(option);
      });
      
      await waitFor(() => {
        expect(screen.queryByText('选项 1')).not.toBeInTheDocument();
      });
    });

    it('does not call onSelect for disabled options', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const disabledOption = screen.getByText('选项 3');
        fireEvent.click(disabledOption);
      });
      
      expect(mockOnSelect).not.toHaveBeenCalled();
    });

    it('does not call onSelect for divider options', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const divider = screen.getByText('选项 3').nextElementSibling?.querySelector('div');
        if (divider) {
          fireEvent.click(divider);
        }
      });
      
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('Option Types', () => {
    it('renders regular options correctly', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByText('选项 1').closest('div');
        expect(option).toHaveClass('px-4', 'py-3');
      });
    });

    it('renders options with icons', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('🌟')).toBeInTheDocument();
        expect(screen.getByText('选项 4')).toBeInTheDocument();
      });
    });

    it('renders disabled options with correct styling', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const disabledOption = screen.getByText('选项 3').closest('div');
        expect(disabledOption).toHaveClass('text-gray-400', 'cursor-not-allowed');
      });
    });

    it('renders dividers correctly', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        // 直接查找分隔符元素
        const divider = document.querySelector('.h-px.bg-gray-200');
        expect(divider).toHaveClass('h-px', 'bg-gray-200');
      });
    });
  });

  describe('Placement and Alignment', () => {
    it('applies correct placement classes', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
          placement="top"
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        // 直接查找菜单容器
        const menu = document.querySelector('.absolute.z-50.bottom-full');
        expect(menu).toHaveClass('bottom-full');
      });
    });

    it('applies correct alignment classes', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
          align="end"
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        // 直接查找菜单容器
        const menu = document.querySelector('.absolute.z-50.right-0');
        expect(menu).toHaveClass('right-0');
      });
    });
  });

  describe('Width Control', () => {
    it('applies custom width when specified', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
          width="xl"
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        // 直接查找菜单容器
        const menu = document.querySelector('.absolute.z-50.w-80');
        expect(menu).toHaveClass('w-80');
      });
    });

    it('uses default width when not specified', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        // 直接查找菜单容器
        const menu = document.querySelector('.absolute.z-50.w-56');
        expect(menu).toHaveClass('w-56');
      });
    });
  });

  describe('Search Functionality', () => {
    it('shows search input when searchable is true', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
          searchable={true}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText('搜索...')).toBeInTheDocument();
      });
    });

    it('filters options based on search input', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
          searchable={true}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('搜索...');
        fireEvent.change(searchInput, { target: { value: '选项 1' } });
        
        expect(screen.getByText('选项 1')).toBeInTheDocument();
        expect(screen.queryByText('选项 2')).not.toBeInTheDocument();
      });
    });

    it('shows no results message when search has no matches', async () => {
      render(
        <Dropdown
          options={mockOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
          searchable={true}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('搜索...');
        fireEvent.change(searchInput, { target: { value: '不存在' } });
        
        expect(screen.getByText('无搜索结果')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(
        <Dropdown
          options={[]}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      // 空选项数组时，下拉菜单应该为空，不显示任何提示
      expect(screen.queryByText('没有可用的选项')).not.toBeInTheDocument();
    });

    it('handles options with missing label', () => {
      const invalidOptions: DropdownOption[] = [
        { label: '', value: 'option1' },
        { label: '选项 2', value: 'option2' }
      ];
      
      render(
        <Dropdown
          options={invalidOptions}
          onSelect={mockOnSelect}
          trigger={<button>点击我</button>}
        />
      );
      
      const trigger = screen.getByText('点击我');
      fireEvent.click(trigger);
      
      // Should not crash and should render valid options
      expect(screen.getByText('选项 2')).toBeInTheDocument();
    });
  });
});
