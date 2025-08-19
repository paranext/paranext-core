import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, type ColumnDef } from '@/components/advanced/data-table/data-table.component';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';

const meta: Meta<typeof DataTable> = {
  title: 'Advanced/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A feature-rich table component that infuses the basic shadcn-based Table component with features from TanStack's React Table library.

Features include:
- Sorting
- Filtering
- Pagination
- Column visibility controls
- Row selection
- Sticky headers
- Custom row click handlers

This component is highly customizable and suitable for displaying complex data sets with various interactive features.
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: false,
      description: 'Array of column definitions',
    },
    data: {
      control: false,
      description: 'Array of data to display in the table',
    },
    enablePagination: {
      control: 'boolean',
      description: 'Enable pagination for the table',
    },
    showPaginationControls: {
      control: 'boolean',
      description: 'Show detailed pagination controls',
    },
    showColumnVisibilityControls: {
      control: 'boolean',
      description: 'Show column visibility toggle controls',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Make the table header sticky when scrolling',
    },
    onRowClickHandler: {
      action: 'row-clicked',
      description: 'Handler function called when a row is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data types
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastLogin: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured: boolean;
};

// Sample users data
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
    lastLogin: '2024-08-19',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-03-22',
    lastLogin: '2024-08-18',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'inactive',
    joinDate: '2023-05-10',
    lastLogin: '2024-08-15',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'pending',
    joinDate: '2024-08-01',
    lastLogin: 'Never',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-12-05',
    lastLogin: '2024-08-17',
  },
];

// Sample products data
const products: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1299.99,
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    stock: 50,
    featured: false,
  },
  { id: '3', name: 'Office Chair', category: 'Furniture', price: 249.99, stock: 8, featured: true },
  {
    id: '4',
    name: 'Notebook Set',
    category: 'Stationery',
    price: 12.99,
    stock: 100,
    featured: false,
  },
  {
    id: '5',
    name: 'Standing Desk',
    category: 'Furniture',
    price: 499.99,
    stock: 3,
    featured: true,
  },
  {
    id: '6',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 25,
    featured: false,
  },
  { id: '7', name: 'Pen Set', category: 'Stationery', price: 8.99, stock: 75, featured: false },
  {
    id: '8',
    name: 'Monitor 4K',
    category: 'Electronics',
    price: 399.99,
    stock: 12,
    featured: true,
  },
];

// Basic user columns
const userColumns: ColumnDef<User>[] = [
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
    cell: ({ row }) => {
      const status = row.getValue<User['status']>('status');
      let variant: 'default' | 'secondary' | 'outline' = 'outline';
      if (status === 'active') {
        variant = 'default';
      } else if (status === 'inactive') {
        variant = 'secondary';
      }
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

// Advanced user columns with sorting and actions
const advancedUserColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue<User['role']>('role');
      return <Badge variant="outline">{role}</Badge>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<User['status']>('status');
      let variant: 'default' | 'secondary' | 'outline' = 'outline';
      if (status === 'active') {
        variant = 'default';
      } else if (status === 'inactive') {
        variant = 'secondary';
      }
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'joinDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Join Date
          <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="tw-h-8 tw-w-8 tw-p-0">
              <span className="tw-sr-only">Open menu</span>
              <MoreHorizontal className="tw-h-4 tw-w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="tw-mr-2 tw-h-4 tw-w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="tw-mr-2 tw-h-4 tw-w-4" />
              Edit user
            </DropdownMenuItem>
            <DropdownMenuItem className="tw-text-red-600">
              <Trash2 className="tw-mr-2 tw-h-4 tw-w-4" />
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Product columns
const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      return <div className="tw-font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Stock
          <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock = parseInt(String(row.getValue('stock')), 10);
      let variant: 'destructive' | 'outline' | 'default' = 'default';
      if (stock < 10) {
        variant = 'destructive';
      } else if (stock < 25) {
        variant = 'outline';
      }
      return <Badge variant={variant}>{stock} units</Badge>;
    },
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => {
      const featured = row.getValue<Product['featured']>('featured');
      return <Badge variant={featured ? 'default' : 'secondary'}>{featured ? 'Yes' : 'No'}</Badge>;
    },
  },
];

export const BasicTable: Story = {
  render: () => <DataTable<User, unknown> columns={userColumns} data={users} />,
  parameters: {
    docs: {
      description: {
        story: 'A basic table showing user data with minimal configuration.',
      },
    },
  },
};

export const WithPagination: Story = {
  render: () => (
    <DataTable<Product, unknown>
      columns={productColumns}
      data={[...products, ...products, ...products]}
      enablePagination
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with pagination enabled to handle larger datasets.',
      },
    },
  },
};

export const WithPaginationControls: Story = {
  render: () => (
    <DataTable<Product, unknown>
      columns={productColumns}
      data={[...products, ...products, ...products]}
      enablePagination
      showPaginationControls
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with detailed pagination controls for better navigation.',
      },
    },
  },
};

export const WithColumnVisibilityControls: Story = {
  render: () => (
    <DataTable<User, unknown>
      columns={advancedUserColumns}
      data={users}
      showColumnVisibilityControls
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with column visibility controls allowing users to show/hide columns.',
      },
    },
  },
};

export const StickyHeader: Story = {
  render: () => (
    <DataTable<Product, unknown>
      columns={productColumns}
      data={[...products, ...products, ...products]} // Triple the data to show scrolling
      stickyHeader
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with sticky header - scroll down to see the header remain fixed.',
      },
    },
  },
};

export const FullFeatured: Story = {
  render: () => (
    <DataTable<User, unknown>
      columns={advancedUserColumns}
      data={users}
      enablePagination
      showPaginationControls
      showColumnVisibilityControls
      stickyHeader
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Full-featured DataTable with built-in column visibility controls, pagination, and all features enabled.',
      },
    },
  },
};

export const EmptyTable: Story = {
  render: () => <DataTable<User, unknown> columns={userColumns} data={[]} />,
  parameters: {
    docs: {
      description: {
        story: 'Table with no data to show the empty state.',
      },
    },
  },
};
