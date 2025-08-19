import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Table> = {
  title: 'Shadcn/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    stickyHeader: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="tw-text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="tw-text-end">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic table with caption, headers, and data rows.',
      },
    },
  },
};

export const WithBorder: Story = {
  render: () => (
    <Table className="tw-border">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="tw-text-end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 3).map((invoice) => (
          <TableRow
            key={invoice.invoice}
            data-state={invoice.paymentStatus === 'Paid' ? 'selected' : ''}
          >
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="tw-text-end">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="tw-text-end">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A table with borders, selected rows, and footer, similar to the original example.',
      },
    },
  },
};

export const StickyHeader: Story = {
  render: () => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const lotsOfInvoices = Array(15).fill(invoices).flat() as typeof invoices;

    return (
      <div className="tw-relative tw-max-h-80 tw-overflow-auto">
        <Table stickyHeader className="tw-border">
          <TableHeader stickyHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="tw-text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lotsOfInvoices.map((invoice, index) => (
              <TableRow
                // eslint-disable-next-line react/no-array-index-key
                key={`${invoice.invoice}-${index}`}
                data-state={invoice.paymentStatus === 'Paid' ? 'selected' : ''}
              >
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="tw-text-end">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="tw-text-end">$12,750.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A table with sticky header for scrollable content, matching the original example.',
      },
    },
  },
};

export const Simple: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A simple table without caption or footer.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="tw-text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Laptop</TableCell>
          <TableCell>$999.00</TableCell>
          <TableCell>5</TableCell>
          <TableCell className="tw-text-end">
            <button type="button" className="tw-mr-2 tw-text-blue-600 hover:tw-underline">
              Edit
            </button>
            <button type="button" className="tw-text-red-600 hover:tw-underline">
              Delete
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Phone</TableCell>
          <TableCell>$699.00</TableCell>
          <TableCell>12</TableCell>
          <TableCell className="tw-text-end">
            <button type="button" className="tw-mr-2 tw-text-blue-600 hover:tw-underline">
              Edit
            </button>
            <button type="button" className="tw-text-red-600 hover:tw-underline">
              Delete
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Tablet</TableCell>
          <TableCell>$399.00</TableCell>
          <TableCell>8</TableCell>
          <TableCell className="tw-text-end">
            <button type="button" className="tw-mr-2 tw-text-blue-600 hover:tw-underline">
              Edit
            </button>
            <button type="button" className="tw-text-red-600 hover:tw-underline">
              Delete
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A table with action buttons in the last column.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Interactive table example</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="tw-text-end">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Item A</TableCell>
          <TableCell>Active</TableCell>
          <TableCell className="tw-text-end">$100</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>2</TableCell>
          <TableCell>Item B</TableCell>
          <TableCell>Selected</TableCell>
          <TableCell className="tw-text-end">$200</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>Item C</TableCell>
          <TableCell>Inactive</TableCell>
          <TableCell className="tw-text-end">$150</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  args: {
    stickyHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive table where you can experiment with properties using the controls.',
      },
    },
  },
};
