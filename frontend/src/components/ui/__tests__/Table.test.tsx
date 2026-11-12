import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Table from '@/components/ui/Table';

interface TestItem {
  id: number;
  name: string;
}

const columns = [
  { key: 'name', header: 'Name' },
];

const data: TestItem[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table columns={columns} data={data} keyExtractor={(item) => item.id} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<Table columns={columns} data={data} keyExtractor={(item) => item.id} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders empty message when data is empty', () => {
    render(<Table columns={columns} data={[]} keyExtractor={(item) => item.id} emptyMessage="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('shows default empty message', () => {
    render(<Table columns={columns} data={[]} keyExtractor={(item) => item.id} />);
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
  });

  it('renders custom render function', () => {
    const customColumns = [
      { key: 'name', header: 'Name', render: (item: TestItem) => <span data-testid={`custom-${item.id}`}>Custom {item.name}</span> },
    ];
    render(<Table columns={customColumns} data={data} keyExtractor={(item) => item.id} />);
    expect(screen.getByTestId('custom-1')).toHaveTextContent('Custom Alice');
  });
});
