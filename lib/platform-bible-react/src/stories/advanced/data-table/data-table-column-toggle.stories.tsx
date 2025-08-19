import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { DataTableViewOptions } from '@/components/advanced/data-table/data-table-column-toggle.component';
import { useReactTable, getCoreRowModel, type ColumnDef } from '@tanstack/react-table';

const meta: Meta<typeof DataTableViewOptions> = {
  title: 'Advanced/DataTableViewOptions',
  component: DataTableViewOptions,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A dropdown component for toggling column visibility in data tables.

This component provides:
- Dropdown menu with checkboxes for each hideable column
- Toggle individual column visibility
- Responsive design (hidden on smaller screens)
- Integration with TanStack Table's column visibility state

Perfect for allowing users to customize which columns they want to see in large data tables.
        `,
      },
    },
  },
  argTypes: {
    table: {
      control: false,
      description: 'TanStack Table instance with column visibility state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for demonstration
type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
};

const sampleEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 85000,
    startDate: '2022-01-15',
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 75000,
    startDate: '2021-06-10',
    status: 'active',
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@company.com',
    department: 'Sales',
    position: 'Sales Representative',
    salary: 55000,
    startDate: '2023-03-22',
    status: 'active',
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice.brown@company.com',
    department: 'HR',
    position: 'HR Specialist',
    salary: 60000,
    startDate: '2022-11-05',
    status: 'inactive',
  },
];

const employeeColumns: ColumnDef<Employee>[] = [
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'department',
    accessorKey: 'department',
    header: 'Department',
  },
  {
    id: 'position',
    accessorKey: 'position',
    header: 'Position',
  },
  {
    id: 'salary',
    accessorKey: 'salary',
    header: 'Salary',
    cell: ({ row }) => {
      const salary: number = row.getValue('salary');
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(salary);
    },
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header: 'Start Date',
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
  },
];

function ColumnToggleDemo({
  hideableColumns = ['department', 'position', 'salary', 'startDate', 'status'],
}: {
  hideableColumns?: string[];
}) {
  const [columnVisibility, setColumnVisibility] = useState({});

  const columnsWithHiding = employeeColumns.map((col) => ({
    ...col,
    enableHiding: col.id ? hideableColumns.includes(col.id) : false,
  }));

  const table = useReactTable({
    data: sampleEmployees,
    columns: columnsWithHiding,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-items-center tw-justify-between">
        <h3 className="tw-text-lg tw-font-semibold">Employee Data</h3>
        <DataTableViewOptions table={table} />
      </div>

      <div className="tw-overflow-x-auto tw-rounded tw-border">
        <table className="tw-w-full">
          <thead>
            <tr className="tw-border-b">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th key={header.id} className="tw-p-3 tw-text-left tw-text-sm tw-font-medium">
                    {header.isPlaceholder ? undefined : (
                      <span>
                        {typeof header.column.columnDef.header === 'string'
                          ? header.column.columnDef.header
                          : 'Column'}
                      </span>
                    )}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="tw-border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="tw-p-3 tw-text-sm">
                    {typeof cell.column.columnDef.cell === 'function'
                      ? cell.column.columnDef.cell(cell.getContext())
                      : // eslint-disable-next-line no-type-assertion/no-type-assertion
                        (cell.getValue() as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tw-text-xs tw-text-muted-foreground">
        Visible columns: {table.getVisibleLeafColumns().length} of{' '}
        {table.getAllLeafColumns().length}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <ColumnToggleDemo />,
};

export const AllColumnsHideable: Story = {
  render: () => (
    <ColumnToggleDemo
      hideableColumns={[
        'firstName',
        'lastName',
        'email',
        'department',
        'position',
        'salary',
        'startDate',
        'status',
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'All columns can be hidden/shown using the column toggle.',
      },
    },
  },
};

export const LimitedToggle: Story = {
  render: () => <ColumnToggleDemo hideableColumns={['department', 'salary']} />,
  parameters: {
    docs: {
      description: {
        story: 'Only specific columns (department and salary) can be toggled.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
      salary: false, // Start with salary hidden
      startDate: false, // Start with start date hidden
    });

    const columnsWithHiding = employeeColumns.map((col) => ({
      ...col,
      enableHiding: col.id
        ? ['department', 'position', 'salary', 'startDate', 'status'].includes(col.id)
        : false,
    }));

    const table = useReactTable({
      data: sampleEmployees,
      columns: columnsWithHiding,
      getCoreRowModel: getCoreRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
        columnVisibility,
      },
    });

    const hiddenColumns = Object.entries(columnVisibility)
      .filter(([, visible]) => !visible)
      .map(([column]) => column);

    return (
      <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-justify-between">
          <div>
            <h3 className="tw-text-lg tw-font-semibold">Interactive Column Toggle</h3>
            <p className="tw-text-sm tw-text-muted-foreground">
              Use the &quot;View&quot; button to show/hide columns
            </p>
          </div>
          <DataTableViewOptions table={table} />
        </div>

        {hiddenColumns.length > 0 && (
          <div className="tw-rounded tw-border tw-bg-orange-50 tw-p-3">
            <div className="tw-text-sm tw-font-medium tw-text-orange-800">
              Hidden columns: {hiddenColumns.join(', ')}
            </div>
          </div>
        )}

        <div className="tw-overflow-x-auto tw-rounded tw-border">
          <table className="tw-w-full">
            <thead>
              <tr className="tw-border-b tw-bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th key={header.id} className="tw-p-3 tw-text-left tw-text-sm tw-font-medium">
                      {header.isPlaceholder ? undefined : (
                        <span>
                          {typeof header.column.columnDef.header === 'string'
                            ? header.column.columnDef.header
                            : 'Column'}
                        </span>
                      )}
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`tw-border-b ${index % 2 === 0 ? 'tw-bg-gray-25' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="tw-p-3 tw-text-sm">
                      {typeof cell.column.columnDef.cell === 'function'
                        ? cell.column.columnDef.cell(cell.getContext())
                        : // eslint-disable-next-line no-type-assertion/no-type-assertion
                          (cell.getValue() as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tw-flex tw-items-center tw-justify-between tw-text-xs tw-text-muted-foreground">
          <div>
            Showing {table.getVisibleLeafColumns().length} of {table.getAllLeafColumns().length}{' '}
            columns
          </div>
          <div>{sampleEmployees.length} employees total</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example starting with some columns hidden and showing dynamic updates.',
      },
    },
  },
};
