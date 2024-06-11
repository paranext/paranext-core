import { Button as ShadcnButton } from '@/components/shadcn-ui/button';
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
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextField,
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from '../..';
import { HasDirection } from '../direction-toggle';

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

function Basics({ direction }: HasDirection) {
  return (
    <div>
      <VerticalTabs defaultValue="Button" dir={direction}>
        <VerticalTabsList>
          <VerticalTabsTrigger value="Button">Button</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Input">Input</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Dropdown Menu">Dropdown Menu</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Tabs">Tabs</VerticalTabsTrigger>
          <VerticalTabsTrigger value="Table">Table</VerticalTabsTrigger>
        </VerticalTabsList>

        <VerticalTabsContent value="Button">
          Wrapped
          <div>
            {/* eslint-disable-next-line no-alert */}
            <Button onClick={() => alert('Hello World')}>Wrapped Button</Button>
            <Button className="primary">primary</Button>
            <Button className="secondary">secondary</Button>
            <Button className="secondary">disabled</Button>
            <Button className="video">video</Button>
            <Button className="paratext">paratext</Button>
            <Button className="paratext bright">paratext bright</Button>
          </div>
          Shadcn
          <table>
            <tbody>
              <tr>
                <td>variant</td>
                <td>
                  {/* eslint-disable-next-line no-alert */}
                  <ShadcnButton onClick={() => alert('Hello World')}>Shadcn Button</ShadcnButton>
                  <ShadcnButton variant="default">default</ShadcnButton>
                  <ShadcnButton variant="destructive">destructive</ShadcnButton>
                  <ShadcnButton variant="outline">outline</ShadcnButton>
                  <ShadcnButton variant="secondary">secondary</ShadcnButton>
                  <ShadcnButton variant="ghost">ghost</ShadcnButton>
                  <ShadcnButton variant="link">link</ShadcnButton>
                </td>
              </tr>
              <tr>
                <td>size</td>
                <td>
                  <span className="pr-mx-2">default:</span>
                  <ShadcnButton size="default">AAA</ShadcnButton>
                  <span className="pr-mx-2">icon:</span>
                  <ShadcnButton size="icon">AAA</ShadcnButton>
                  <span className="pr-mx-2">sm:</span>
                  <ShadcnButton size="sm">AAA</ShadcnButton>
                  <span className="pr-mx-2">lg:</span>
                  <ShadcnButton size="lg">AAA</ShadcnButton>
                </td>
              </tr>
            </tbody>
          </table>
        </VerticalTabsContent>

        <VerticalTabsContent value="Input">
          <table>
            <tr>
              <td>
                Text Field <div className="pr-text-xs">(wrapped)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <TextField />
              </td>
            </tr>
            <tr>
              <td>
                Shadcn Input
                <div className="pr-text-xs">(shadcn-ui/input)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td>
                Shdcn Input <div className="pr-text-xs">(from ui.shadcn.com &rarr; input)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td className="">
                {/* copied from ui.shadcn.com but replaced ring-ring with pr-ring-[240 5% 64.9%], as they set --ring to this value in their style.css */}
                <Input className="pr-flex pr-h-10 pr-w-full pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50" />
              </td>
            </tr>
            <tr>
              <td>
                Small Input
                <div className="pr-text-xs">(from ui.jln.dev &rarr; popover)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <Input className="pr-full pr-file:border-0 pr-col-span-2 pr-flex pr-h-8 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50" />
              </td>
            </tr>
            <tr>
              <td>
                BVC Input <div className="pr-text-xs">(from book-chapter-control)</div>
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td>
                <Input className="pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none" />
              </td>
            </tr>
          </table>
        </VerticalTabsContent>

        <VerticalTabsContent value="Dropdown Menu">
          <p>Note: the dropdown has a bad visibility in dark mode right now</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ShadcnButton>Open</ShadcnButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>DropdownMenuLabel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>DropdownMenuItem</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </VerticalTabsContent>

        <VerticalTabsContent value="Tabs">
          <Tabs defaultValue="2-youShouldNotSeeThis" dir={direction}>
            <TabsList>
              <TabsTrigger value="1">
                <Button>non-text tab trigger</Button>
              </TabsTrigger>
              <TabsTrigger value="2-youShouldNotSeeThis">Tab 2</TabsTrigger>
              <TabsTrigger value="3">Tab 3 - no linked content</TabsTrigger>
            </TabsList>
            <TabsContent value="1">Tab 1 Content</TabsContent>
            <TabsContent value="2-youShouldNotSeeThis">Tab 2 Content</TabsContent>
            {/* intentionally left out 3 to see the effect */}
          </Tabs>
          <hr className="pr-my-4" />
          <VerticalTabs defaultValue="2-youShouldNotSeeThis" dir={direction}>
            <VerticalTabsList>
              <VerticalTabsTrigger value="1">
                <Button>non-text tab trigger</Button>
              </VerticalTabsTrigger>
              <VerticalTabsTrigger value="2-youShouldNotSeeThis">Tab 2</VerticalTabsTrigger>
              <VerticalTabsTrigger value="3">Tab 3</VerticalTabsTrigger>
              <VerticalTabsTrigger value="4">Tab 4</VerticalTabsTrigger>
            </VerticalTabsList>
            <VerticalTabsContent value="1">Tab 1 Content</VerticalTabsContent>
            <VerticalTabsContent value="2-youShouldNotSeeThis">
              <div>
                Tab 2 Content: Another set of vertical tabs without a default value
                <VerticalTabs dir={direction}>
                  <VerticalTabsList>
                    <VerticalTabsTrigger value="1">Tab 2-1</VerticalTabsTrigger>
                    <VerticalTabsTrigger value="2">Tab 2-2</VerticalTabsTrigger>
                  </VerticalTabsList>
                  <VerticalTabsContent value="1">Tab 2-1 Content</VerticalTabsContent>
                  <VerticalTabsContent value="2">Tab 2-2 Content</VerticalTabsContent>
                </VerticalTabs>
              </div>
            </VerticalTabsContent>
            <VerticalTabsContent value="3">Tab 3 Content</VerticalTabsContent>
            <VerticalTabsContent value="4">Tab 4 Content</VerticalTabsContent>
          </VerticalTabs>
        </VerticalTabsContent>

        <VerticalTabsContent value="Table">
          <Table className="pr-border">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">-SUM-</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </VerticalTabsContent>
      </VerticalTabs>
    </div>
  );
}

export default Basics;
