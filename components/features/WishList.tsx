import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  Pagination,
  Dropdown,
  Button,
  Badge,
  Card,
  Input
} from '../ui';
import type { PaginationInfo, DropdownOption } from '../ui';

// 愿望数据类型
export interface Wish {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// 愿望列表组件属性
interface WishListProps {
  wishes: Wish[];
  onWishUpdate?: (wish: Wish) => void;
  onWishDelete?: (wishId: string) => void;
  onWishStatusChange?: (wishId: string, status: Wish['status']) => void;
  className?: string;
}

// 状态选项
const statusOptions: DropdownOption[] = [
  { value: 'all', label: '全部状态' },
  { value: 'pending', label: '待处理' },
  { value: 'in_progress', label: '进行中' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' }
];

// 优先级选项
const priorityOptions: DropdownOption[] = [
  { value: 'all', label: '全部优先级' },
  { value: 'high', label: '高优先级', icon: '🔴' },
  { value: 'medium', label: '中优先级', icon: '🟡' },
  { value: 'low', label: '低优先级', icon: '🟢' }
];

// 状态标签颜色映射
const statusColorMap: Record<Wish['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

// 状态标签文本映射
const statusTextMap: Record<Wish['status'], string> = {
  pending: '待处理',
  in_progress: '进行中',
  completed: '已完成',
  cancelled: '已取消'
};

// 优先级标签颜色映射
const priorityColorMap: Record<Wish['priority'], string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

// 优先级标签文本映射
const priorityTextMap: Record<Wish['priority'], string> = {
  high: '高',
  medium: '中',
  low: '低'
};

// 愿望列表组件
export const WishList: React.FC<WishListProps> = ({
  wishes,
  onWishUpdate,
  onWishDelete,
  onWishStatusChange,
  className
}) => {
  // 状态管理
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Wish>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // 过滤和排序愿望
  const filteredAndSortedWishes = useMemo(() => {
    let filtered = wishes.filter(wish => {
      const matchesStatus = statusFilter === 'all' || wish.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || wish.priority === priorityFilter;
      const matchesSearch = searchTerm === '' || 
        wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wish.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesStatus && matchesPriority && matchesSearch;
    });

    // 排序
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc' 
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      
      return 0;
    });

    return filtered;
  }, [wishes, statusFilter, priorityFilter, searchTerm, sortField, sortDirection]);

  // 分页计算
  const totalItems = filteredAndSortedWishes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWishes = filteredAndSortedWishes.slice(startIndex, endIndex);

  // 分页信息
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };

  // 处理排序
  const handleSort = (field: keyof Wish) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 处理状态变更
  const handleStatusChange = (wishId: string, newStatus: Wish['status']) => {
    onWishStatusChange?.(wishId, newStatus);
  };

  return (
    <div className={className}>
      {/* 搜索和过滤区域 */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1">
              <Input
                placeholder="搜索愿望标题、描述或标签..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* 状态过滤 */}
            <Dropdown
              trigger={
                <Button variant="outline" className="min-w-[120px]">
                  {statusFilter === 'all' ? '全部状态' : statusTextMap[statusFilter as Wish['status']]}
                </Button>
              }
              options={statusOptions}
              onSelect={(option) => setStatusFilter(option.value as string)}
              width="sm"
            />
            
            {/* 优先级过滤 */}
            <Dropdown
              trigger={
                <Button variant="outline" className="min-w-[120px]">
                  {priorityFilter === 'all' ? '全部优先级' : priorityTextMap[priorityFilter as Wish['priority']]}
                </Button>
              }
              options={priorityOptions}
              onSelect={(option) => setPriorityFilter(option.value as string)}
              width="sm"
            />
          </div>
        </div>
      </Card>

      {/* 愿望列表表格 */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  sortable 
                  sortDirection={sortField === 'title' ? sortDirection : null}
                  onSort={() => handleSort('title')}
                >
                  标题
                </TableHead>
                <TableHead>描述</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>标签</TableHead>
                <TableHead 
                  sortable 
                  sortDirection={sortField === 'createdAt' ? sortDirection : null}
                  onSort={() => handleSort('createdAt')}
                >
                  创建时间
                </TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentWishes.map((wish) => (
                <TableRow key={wish.id}>
                  <TableCell className="font-medium">{wish.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{wish.description}</TableCell>
                  <TableCell>
                    <Badge className={statusColorMap[wish.status]}>
                      {statusTextMap[wish.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColorMap[wish.priority]}>
                      {priorityTextMap[wish.priority]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {wish.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(wish.createdAt).toLocaleDateString('zh-CN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dropdown
                        trigger={
                          <Button size="sm" variant="outline">
                            状态
                          </Button>
                        }
                        options={statusOptions.filter(opt => opt.value !== 'all')}
                        onSelect={(option) => handleStatusChange(wish.id, option.value as Wish['status'])}
                        width="sm"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onWishUpdate?.(wish)}
                      >
                        编辑
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => onWishDelete?.(wish.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* 分页 */}
        {totalPages > 1 && (
          <div className="p-4 border-t">
            <Pagination
              info={paginationInfo}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
              showItemsPerPage
              showTotal
              showPageInfo
            />
          </div>
        )}
      </Card>
    </div>
  );
};

// 默认导出
export default WishList;
