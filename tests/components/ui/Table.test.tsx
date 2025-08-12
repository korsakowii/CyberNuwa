import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption } from '../../../components/ui/table';

describe('Table Components', () => {
  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  describe('Table', () => {
    it('renders with default variant', () => {
      render(
        <Table data-testid="table">
          <tbody>
            <tr><td>Test</td></tr>
          </tbody>
        </Table>
      );
      
      const table = screen.getByTestId('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('w-full', 'border-collapse');
    });

    it('renders with bordered variant', () => {
      render(
        <Table variant="bordered" data-testid="table">
          <tbody>
            <tr><td>Test</td></tr>
          </tbody>
        </Table>
      );
      
      const table = screen.getByTestId('table');
      expect(table).toHaveClass('border', 'border-gray-200');
    });

    it('applies custom className', () => {
      render(
        <Table className="custom-class" data-testid="table">
          <tbody>
            <tr><td>Test</td></tr>
          </tbody>
        </Table>
      );
      
      const table = screen.getByTestId('table');
      expect(table).toHaveClass('custom-class');
    });
  });

  describe('TableHeader', () => {
    it('renders with correct styling', () => {
      render(
        <Table>
          <TableHeader data-testid="header">
            <tr><th>Header</th></tr>
          </TableHeader>
        </Table>
      );
      
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('bg-gray-50');
    });
  });

  describe('TableBody', () => {
    it('renders with correct styling', () => {
      render(
        <Table>
          <TableBody data-testid="body">
            <tr><td>Body</td></tr>
          </TableBody>
        </Table>
      );
      
      const body = screen.getByTestId('body');
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass('divide-y', 'divide-gray-200');
    });
  });

  describe('TableRow', () => {
    it('renders with hover effect by default', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="row">
              <td>Test</td>
            </TableRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByTestId('row');
      expect(row).toHaveClass('hover:bg-gray-50');
    });

    it('renders without hover effect when disabled', () => {
      render(
        <Table>
          <TableBody>
            <TableRow hover={false} data-testid="row">
              <td>Test</td>
            </TableRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByTestId('row');
      expect(row).not.toHaveClass('hover:bg-gray-50');
    });

    it('renders with selected state', () => {
      render(
        <Table>
          <TableBody>
            <TableRow selected data-testid="row">
              <td>Test</td>
            </TableRow>
          </TableBody>
        </Table>
      );
      
      const row = screen.getByTestId('row');
      expect(row).toHaveClass('bg-blue-50');
    });
  });

  describe('TableHead', () => {
    it('renders with default styling', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableHead data-testid="head">Name</TableHead>
            </tr>
          </TableHeader>
        </Table>
      );
      
      const head = screen.getByTestId('head');
      expect(head).toBeInTheDocument();
      expect(head).toHaveClass('px-6', 'py-3', 'text-left');
    });

    it('renders as sortable when specified', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableHead sortable data-testid="head">Name</TableHead>
            </tr>
          </TableHeader>
        </Table>
      );
      
      const head = screen.getByTestId('head');
      expect(head).toHaveClass('cursor-pointer', 'select-none');
    });

    it('shows sort direction indicators', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableHead sortable sortDirection="asc" data-testid="head">Name</TableHead>
            </tr>
          </TableHeader>
        </Table>
      );
      
      const head = screen.getByTestId('head');
      expect(head).toHaveTextContent('↑');
    });

    it('calls onSort when clicked', () => {
      const mockOnSort = jest.fn();
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableHead sortable onSort={mockOnSort} data-testid="head">Name</TableHead>
            </tr>
          </TableHeader>
        </Table>
      );
      
      const head = screen.getByTestId('head');
      fireEvent.click(head);
      expect(mockOnSort).toHaveBeenCalledTimes(1);
    });
  });

  describe('TableCell', () => {
    it('renders with default alignment', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      
      const cell = screen.getByTestId('cell');
      expect(cell).toBeInTheDocument();
      expect(cell).toHaveClass('text-left');
    });

    it('renders with center alignment', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center" data-testid="cell">Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      
      const cell = screen.getByTestId('cell');
      expect(cell).toHaveClass('text-center');
    });

    it('renders with right alignment', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right" data-testid="cell">Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      
      const cell = screen.getByTestId('cell');
      expect(cell).toHaveClass('text-right');
    });
  });

  describe('TableFooter', () => {
    it('renders with correct styling', () => {
      render(
        <Table>
          <TableFooter data-testid="footer">
            <tr><td>Footer</td></tr>
          </TableFooter>
        </Table>
      );
      
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('bg-gray-50');
    });
  });

  describe('TableCaption', () => {
    it('renders with correct styling', () => {
      render(
        <Table>
          <TableCaption data-testid="caption">Table Description</TableCaption>
          <tbody>
            <tr><td>Test</td></tr>
          </tbody>
        </Table>
      );
      
      const caption = screen.getByTestId('caption');
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveClass('mt-4', 'text-sm', 'text-gray-500');
    });
  });

  describe('Complete Table Integration', () => {
    it('renders a complete table with all components', () => {
      render(
        <Table data-testid="table">
          <TableCaption>User List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total: {mockData.length} users</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
      
      expect(screen.getByTestId('table')).toBeInTheDocument();
      expect(screen.getByText('User List')).toBeInTheDocument();
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Total: 2 users')).toBeInTheDocument();
    });
  });
});
