import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';

// 分页信息接口
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// 分页组件属性
interface PaginationProps {
  info: PaginationInfo;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  className?: string;
  showItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
  showTotal?: boolean;
  showPageInfo?: boolean;
}

// 分页按钮组件
interface PaginationButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  disabled = false,
  active = false,
  children,
  className
}) => (
  <Button
    variant={active ? 'primary' : 'outline'}
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'min-w-[40px] h-10 px-3',
      active && 'bg-primary text-primary-foreground',
      className
    )}
  >
    {children}
  </Button>
);

// 主分页组件
export const Pagination: React.FC<PaginationProps> = ({
  info,
  onPageChange,
  onItemsPerPageChange,
  className,
  showItemsPerPage = true,
  itemsPerPageOptions = [10, 20, 50, 100],
  showTotal = true,
  showPageInfo = true
}) => {
  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPreviousPage } = info;

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // 如果总页数少于等于最大可见页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 否则显示部分页码，包含省略号
      if (currentPage <= 4) {
        // 当前页在前4页
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // 当前页在后4页
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}>
      {/* 左侧信息 */}
      <div className="flex items-center gap-4">
        {showTotal && (
          <div className="text-sm text-gray-600">
            共 {totalItems} 条记录
          </div>
        )}
        
        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">每页</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">条</span>
          </div>
        )}
      </div>

      {/* 分页导航 - 只有当总页数大于1时显示 */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* 上一页 */}
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPreviousPage}
            className="mr-2"
          >
            上一页
          </PaginationButton>

          {/* 页码 */}
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <PaginationButton
                  onClick={() => onPageChange(page as number)}
                  active={page === currentPage}
                >
                  {page}
                </PaginationButton>
              )}
            </React.Fragment>
          ))}

          {/* 下一页 */}
          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className="ml-2"
          >
            下一页
          </PaginationButton>
        </div>
      )}

      {/* 右侧页面信息 */}
      {showPageInfo && (
        <div className="text-sm text-gray-600">
          第 {currentPage} 页，共 {totalPages} 页
        </div>
      )}
    </div>
  );
};

// 默认导出
export default Pagination;
