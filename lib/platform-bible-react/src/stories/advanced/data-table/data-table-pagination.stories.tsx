import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTablePagination } from '@/components/advanced/data-table/data-table-pagination.component';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

const meta: Meta<typeof DataTablePagination> = {
  title: 'Advanced/DataTablePagination',
  component: DataTablePagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A pagination component designed to work with TanStack Table for data table navigation.

This component provides:
- Page navigation (first, previous, next, last)
- Rows per page selection
- Current page and total pages display
- Selected rows count
- Responsive design (some buttons hidden on smaller screens)

Typically used as part of the DataTable component ecosystem.
        `,
      },
    },
  },
  argTypes: {
    table: {
      control: false,
      description: 'TanStack Table instance with pagination state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for demonstration
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
};

const sampleUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Moderator'][i % 3],
  status: i % 4 === 0 ? 'inactive' : 'active',
}));

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

function PaginationDemo({ initialPageSize = 10 }: { initialPageSize?: number }) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: sampleUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  return (
    <div className="tw-space-y-4">
      <div className="tw-rounded tw-border">
        <div className="tw-p-4">
          <h3 className="tw-mb-2 tw-text-lg tw-font-semibold">Data Table Example</h3>
          <p className="tw-mb-4 tw-text-sm tw-text-muted-foreground">
            This shows the pagination component with a simulated data table.
          </p>

          <div className="tw-mb-2 tw-grid tw-grid-cols-4 tw-gap-4 tw-border-b tw-pb-2 tw-text-sm tw-font-medium">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
          </div>

          {table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="tw-grid tw-grid-cols-4 tw-gap-4 tw-border-b tw-py-2 tw-text-sm"
            >
              <div>{row.original.name}</div>
              <div>{row.original.email}</div>
              <div>{row.original.role}</div>
              <div>{row.original.status}</div>
            </div>
          ))}
        </div>

        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <PaginationDemo />,
};

export const SmallPageSize: Story = {
  render: () => <PaginationDemo initialPageSize={5} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a smaller page size to show more navigation interactions.',
      },
    },
  },
};

export const LargePageSize: Story = {
  render: () => <PaginationDemo initialPageSize={25} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a larger page size, showing fewer pages.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [pageSize, setPageSize] = useState(10);

    const table = useReactTable({
      data: sampleUsers,
      columns: [
        {
          id: 'select',
          header: 'Select',
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={(e) => {
                const newSelection = { ...rowSelection };
                if (e.target.checked) {
                  newSelection[row.id] = true;
                } else {
                  delete newSelection[row.id];
                }
                setRowSelection(newSelection);
              }}
            />
          ),
        },
        ...columns,
      ],
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        rowSelection,
        pagination: {
          pageIndex: 0,
          pageSize,
        },
      },
      onPaginationChange: (updater) => {
        if (typeof updater === 'function') {
          const newState = updater({ pageIndex: 0, pageSize });
          setPageSize(newState.pageSize);
        }
      },
    });

    return (
      <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-gap-4">
          <h3 className="tw-text-lg tw-font-semibold">Interactive Pagination</h3>
          <div className="tw-text-sm tw-text-muted-foreground">
            Try selecting rows and changing page size
          </div>
        </div>

        <div className="tw-rounded tw-border">
          <div className="tw-p-4">
            <div className="tw-mb-2 tw-grid tw-grid-cols-5 tw-gap-4 tw-border-b tw-pb-2 tw-text-sm tw-font-medium">
              <div>Select</div>
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Status</div>
            </div>

            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="tw-grid tw-grid-cols-5 tw-gap-4 tw-border-b tw-py-2 tw-text-sm"
              >
                <div>
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={(e) => {
                      const newSelection = { ...rowSelection };
                      if (e.target.checked) {
                        newSelection[row.id] = true;
                      } else {
                        delete newSelection[row.id];
                      }
                      setRowSelection(newSelection);
                    }}
                  />
                </div>
                <div>{row.original.name}</div>
                <div>{row.original.email}</div>
                <div>{row.original.role}</div>
                <div>{row.original.status}</div>
              </div>
            ))}
          </div>

          <DataTablePagination table={table} />
        </div>

        {Object.keys(rowSelection).length > 0 && (
          <div className="tw-rounded tw-border tw-bg-blue-50 tw-p-4">
            <h4 className="tw-mb-2 tw-font-medium">Selected Rows:</h4>
            <div className="tw-text-sm tw-text-muted-foreground">
              {Object.keys(rowSelection)
                .map((id) => sampleUsers[parseInt(id, 10)]?.name)
                .join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with row selection and dynamic pagination updates.',
      },
    },
  },
};
