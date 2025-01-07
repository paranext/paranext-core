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
];

const lotsOfInvoices = Array(10).fill(invoices).flat();

export default function TableExamples() {
  return (
    <>
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
          {invoices.map((invoice) => (
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
            <TableCell className="tw-text-end">-SUM-</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

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
                key={invoice.invoice + index}
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
              <TableCell className="tw-text-end">-SUM-</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
