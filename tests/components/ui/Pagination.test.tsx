import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../../../components/ui/pagination';
import type { PaginationInfo } from '../../../components/ui/pagination';

// 模拟Button组件
jest.mock('../../../components/ui/button', () => {
  const MockButton = ({ children, onClick, disabled, className, ...props }: any) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={className}
        data-testid="pagination-button"
        {...props}
      >
        {children}
      </button>
    );
  };
  return { Button: MockButton };
});

describe('Pagination Component', () => {
  const mockPaginationInfo: PaginationInfo = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    hasNextPage: true,
    hasPreviousPage: false
  };

  const mockOnPageChange = jest.fn();
  const mockOnItemsPerPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders pagination component', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.getByText('共 100 条记录')).toBeInTheDocument();
      expect(screen.getByText('第 1 页，共 10 页')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
          className="custom-class"
        />
      );
      
      const pagination = screen.getByText('共 100 条记录').closest('div')?.parentElement?.parentElement;
      expect(pagination).toHaveClass('custom-class');
    });
  });

  describe('Page Navigation', () => {
    it('renders previous and next buttons', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.getByText('上一页')).toBeInTheDocument();
      expect(screen.getByText('下一页')).toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      const prevButton = screen.getByText('上一页');
      expect(prevButton).toBeDisabled();
    });

    it('enables next button when hasNextPage is true', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      const nextButton = screen.getByText('下一页');
      expect(nextButton).not.toBeDisabled();
    });

    it('calls onPageChange when next button is clicked', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      const nextButton = screen.getByText('下一页');
      fireEvent.click(nextButton);
      
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when previous button is clicked', () => {
      const infoWithPrevious = {
        ...mockPaginationInfo,
        currentPage: 2,
        hasPreviousPage: true
      };
      
      render(
        <Pagination
          info={infoWithPrevious}
          onPageChange={mockOnPageChange}
        />
      );
      
      const prevButton = screen.getByText('上一页');
      fireEvent.click(prevButton);
      
      expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Page Numbers', () => {
    it('renders page numbers for small total pages', () => {
      const smallPaginationInfo = {
        ...mockPaginationInfo,
        totalPages: 5
      };
      
      render(
        <Pagination
          info={smallPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders ellipsis for large total pages', () => {
      const largePaginationInfo = {
        ...mockPaginationInfo,
        totalPages: 20,
        currentPage: 10
      };
      
      render(
        <Pagination
          info={largePaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getAllByText('...')).toHaveLength(2);
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('11')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('highlights current page', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      const currentPageButton = screen.getByText('1');
      expect(currentPageButton).toHaveClass('bg-primary');
    });

    it('calls onPageChange when page number is clicked', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      const pageButton = screen.getByText('2');
      fireEvent.click(pageButton);
      
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe('Items Per Page', () => {
    it('renders items per page selector when enabled', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          showItemsPerPage={true}
        />
      );
      
      expect(screen.getByText('每页')).toBeInTheDocument();
      expect(screen.getByDisplayValue('10')).toBeInTheDocument();
      expect(screen.getByText('条')).toBeInTheDocument();
    });

    it('does not render items per page selector when disabled', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
          showItemsPerPage={false}
        />
      );
      
      expect(screen.queryByText('每页')).not.toBeInTheDocument();
      expect(screen.queryByDisplayValue('10')).not.toBeInTheDocument();
    });

    it('calls onItemsPerPageChange when selection changes', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          showItemsPerPage={true}
        />
      );
      
      const select = screen.getByDisplayValue('10');
      fireEvent.change(select, { target: { value: '20' } });
      
      expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(20);
    });

    it('uses custom items per page options', () => {
      const customOptions = [5, 15, 25, 50];
      const customPaginationInfo = {
        ...mockPaginationInfo,
        itemsPerPage: 5
      };
      
      render(
        <Pagination
          info={customPaginationInfo}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          showItemsPerPage={true}
          itemsPerPageOptions={customOptions}
        />
      );
      
      // 检查所有选项都在下拉菜单中
      customOptions.forEach(option => {
        const optionElement = screen.getByRole('option', { name: option.toString() });
        expect(optionElement).toBeInTheDocument();
      });
    });
  });

  describe('Display Options', () => {
    it('hides total count when showTotal is false', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
          showTotal={false}
        />
      );
      
      expect(screen.queryByText('共 100 条记录')).not.toBeInTheDocument();
    });

    it('hides page info when showPageInfo is false', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
          showPageInfo={false}
        />
      );
      
      expect(screen.queryByText('第 1 页，共 10 页')).not.toBeInTheDocument();
    });

    it('hides pagination when only one page', () => {
      const singlePageInfo = {
        ...mockPaginationInfo,
        totalPages: 1,
        hasNextPage: false
      };
      
      render(
        <Pagination
          info={singlePageInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.queryByText('上一页')).not.toBeInTheDocument();
      expect(screen.queryByText('下一页')).not.toBeInTheDocument();
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero total items', () => {
      const zeroItemsInfo = {
        ...mockPaginationInfo,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false
      };
      
      render(
        <Pagination
          info={zeroItemsInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      expect(screen.getByText('共 0 条记录')).toBeInTheDocument();
      expect(screen.getByText('第 1 页，共 0 页')).toBeInTheDocument();
    });

    it('handles current page greater than total pages', () => {
      const invalidPageInfo = {
        ...mockPaginationInfo,
        currentPage: 15,
        totalPages: 10
      };
      
      render(
        <Pagination
          info={invalidPageInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      // Should still render without crashing
      expect(screen.getByText('共 100 条记录')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      render(
        <Pagination
          info={mockPaginationInfo}
          onPageChange={mockOnPageChange}
        />
      );
      
      const container = screen.getByText('共 100 条记录').closest('div')?.parentElement?.parentElement;
      expect(container).toHaveClass('flex-col', 'sm:flex-row');
    });
  });
});
