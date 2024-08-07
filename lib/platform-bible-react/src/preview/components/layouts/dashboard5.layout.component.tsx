/* eslint-disable jsx-a11y/anchor-is-valid */
/* source: mostly copied and adapted from shadcn's blocks > dashboard 5 example */
import {
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users2,
} from 'lucide-react';

import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Input } from '@/components/shadcn-ui/input';

import { Slider } from '@/components/shadcn-ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import { useState } from 'react';
import { HasDirection } from '@/preview/preview-components/direction-toggle';

export default function Dashboard5Examples({ direction }: HasDirection) {
  const [progress, setProgress] = useState<number[]>([25]);
  return (
    <div className="pr-flex pr-h-[100%] pr-w-full pr-rounded-md pr-bg-muted/40">
      <aside className="pr-s-0 pr-inset-y-0 pr-z-10 pr-hidden pr-w-14 pr-flex-col pr-rounded-s-md pr-border-e pr-bg-background sm:pr-flex">
        <nav className="pr-flex pr-flex-col pr-items-center pr-gap-4 pr-px-2 sm:pr-py-5">
          <div className="pr-group pr-flex pr-h-9 pr-w-9 pr-shrink-0 pr-items-center pr-justify-center pr-gap-2 pr-rounded-full pr-bg-primary pr-text-lg pr-font-semibold pr-text-primary-foreground md:pr-h-8 md:pr-w-8 md:pr-text-base">
            <Package2 className="pr-group-hover:pr-scale-110 pr-h-4 pr-w-4 pr-transition-all" />
            <a className="pr-sr-only">Acme Inc</a>
          </div>
          <div>
            <div>
              <div className="pr-flex pr-h-9 pr-w-9 pr-items-center pr-justify-center pr-rounded-lg pr-text-muted-foreground pr-transition-colors hover:pr-text-foreground md:pr-h-8 md:pr-w-8">
                <Home className="pr-h-5 pr-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="pr-flex pr-h-9 pr-w-9 pr-items-center pr-justify-center pr-rounded-lg pr-bg-accent pr-text-accent-foreground pr-transition-colors hover:pr-text-foreground md:pr-h-8 md:pr-w-8">
                <ShoppingCart className="pr-h-5 pr-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="pr-flex pr-h-9 pr-w-9 pr-items-center pr-justify-center pr-rounded-lg pr-text-muted-foreground pr-transition-colors hover:pr-text-foreground md:pr-h-8 md:pr-w-8">
                <Package className="pr-h-5 pr-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="pr-flex pr-h-9 pr-w-9 pr-items-center pr-justify-center pr-rounded-lg pr-text-muted-foreground pr-transition-colors hover:pr-text-foreground md:pr-h-8 md:pr-w-8">
                <Users2 className="pr-h-5 pr-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="pr-flex pr-h-9 pr-w-9 pr-items-center pr-justify-center pr-rounded-lg pr-text-muted-foreground pr-transition-colors hover:pr-text-foreground md:pr-h-8 md:pr-w-8">
                <LineChart className="pr-h-5 pr-w-5" />
              </div>
            </div>
          </div>
        </nav>
        <nav className="pr-mt-auto pr-flex pr-flex-col pr-items-center pr-gap-4 pr-px-2 sm:pr-py-5">
          <div>
            <div>
              <div className="pr-flex pr-h-9 pr-w-9 pr-items-center pr-justify-center pr-rounded-lg pr-text-muted-foreground pr-transition-colors hover:pr-text-foreground md:pr-h-8 md:pr-w-8">
                <Settings className="pr-h-5 pr-w-5" />
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <div className="pr-flex pr-flex-col pr-overflow-auto focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring sm:pr-gap-4 sm:pr-py-4 sm:pr-pl-14">
        <header className="sm:h-auto pr-sticky pr-top-0 pr-z-30 pr-flex pr-h-14 pr-items-center pr-gap-4 pr-border-b pr-bg-background pr-px-4 sm:pr-static sm:pr-border-0 sm:pr-bg-transparent sm:pr-px-6">
          <Tabs className="pr-hidden">
            <TabsList>
              <TabsTrigger value="a">
                <Button size="icon" variant="outline" className="sm:pr-hidden">
                  <PanelLeft className="pr-h-5 pr-w-5" />
                  <a className="pr-sr-only">Toggle Menu</a>
                </Button>
              </TabsTrigger>
              <TabsTrigger value="b" />
            </TabsList>

            {/* <SheetContent side="left" className="sm:max-pr-w-xs"> */}
            <TabsContent value="a" className="sm:max-pr-w-xs pr-bg-secondary">
              <nav className="pr-grid pr-gap-6 pr-text-lg pr-font-medium">
                <div className="pr-group pr-flex pr-h-10 pr-w-10 pr-shrink-0 pr-items-center pr-justify-center pr-gap-2 pr-rounded-full pr-bg-primary pr-text-lg pr-font-semibold pr-text-primary-foreground md:pr-text-base">
                  <Package2 className="pr-group-hover:pr-scale-110 pr-h-5 pr-w-5 pr-transition-all" />
                  <a className="pr-sr-only">Acme Inc</a>
                </div>
                <div className="pr-flex pr-items-center pr-gap-4 pr-px-2.5 pr-text-muted-foreground hover:pr-text-foreground">
                  <Home className="pr-h-5 pr-w-5" />
                  Dashboard
                </div>
                <div className="pr-flex pr-items-center pr-gap-4 pr-px-2.5 pr-text-foreground">
                  <ShoppingCart className="pr-h-5 pr-w-5" />
                  Orders
                </div>
                <div className="pr-flex pr-items-center pr-gap-4 pr-px-2.5 pr-text-muted-foreground hover:pr-text-foreground">
                  <Package className="pr-h-5 pr-w-5" />
                  Products
                </div>
                <div className="pr-flex pr-items-center pr-gap-4 pr-px-2.5 pr-text-muted-foreground hover:pr-text-foreground">
                  <Users2 className="pr-h-5 pr-w-5" />
                  Customers
                </div>
                <div className="pr-flex pr-items-center pr-gap-4 pr-px-2.5 pr-text-muted-foreground hover:pr-text-foreground">
                  <LineChart className="pr-h-5 pr-w-5" />
                  Settings
                </div>
              </nav>
            </TabsContent>
          </Tabs>
          {/*           <Breadcrumb className="pr-hidden md:pr-flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <div>Dashboard</div>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <div>Orders</div>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Recent Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
          <div className="pr-relative pr-ml-auto pr-flex-1 md:pr-grow-0">
            <Search className="pr-absolute pr-left-2.5 pr-top-2.5 pr-h-4 pr-w-4 pr-text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pr-w-full pr-rounded-lg pr-bg-background pr-pl-8 focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring md:pr-w-[200px] lg:pr-w-[336px]"
            />
          </div>
          <DropdownMenu dir={direction}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="pr-overflow-hidden pr-rounded-full">
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="pr-grid pr-flex-1 pr-items-start pr-gap-4 pr-p-4 sm:pr-px-6 sm:pr-py-0 md:pr-gap-8 lg:pr-grid-cols-3 xl:pr-grid-cols-3">
          <div className="pr-grid pr-auto-rows-max pr-items-start pr-gap-4 md:pr-gap-8 lg:pr-col-span-2">
            <div className="pr-grid pr-gap-4 sm:pr-grid-cols-2 md:pr-grid-cols-4 lg:pr-grid-cols-2 xl:pr-grid-cols-4">
              <Card className="sm:pr-col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-pr-w-lg pr-text-balance pr-leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful
                    Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="pr-text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="pr-text-xs pr-text-muted-foreground">
                    +{progress[0]}% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Slider
                    dir={direction}
                    defaultValue={progress}
                    max={100}
                    step={1}
                    disabled
                    onValueChange={(value) => setProgress(value)}
                    aria-label={`${progress[0]}% increase`}
                  />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="pr-text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="pr-text-xs pr-text-muted-foreground">+10% from last month</div>
                </CardContent>
                <CardFooter>Progress value={10}</CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week" dir={direction}>
              <div className="pr-flex pr-items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="pr-ms-auto pr-flex pr-items-center pr-gap-2">
                  <DropdownMenu dir={direction}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="pr-h-7 pr-gap-1 pr-text-sm">
                        <ListFilter className="pr-h-3.5 pr-w-3.5" />
                        <span className="pr-sr-only sm:pr-not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="pr-h-7 pr-gap-1 pr-text-sm">
                    <File className="pr-h-3.5 pr-w-3.5" />
                    <span className="pr-sr-only sm:pr-not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="pr-px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders from your store.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="pr-hidden sm:pr-table-cell">Type</TableHead>
                          <TableHead className="pr-hidden sm:pr-table-cell">Status</TableHead>
                          <TableHead className="pr-hidden md:pr-table-cell">Date</TableHead>
                          <TableHead className="pr-text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="pr-bg-accent">
                          <TableCell>
                            <div className="pr-font-medium">Liam Johnson</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Sale</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-bg-secondary pr-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-23</TableCell>
                          <TableCell className="pr-text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="pr-font-medium">Olivia Smith</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Refund</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-border pr-text-xs">Declined</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-24</TableCell>
                          <TableCell className="pr-text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="pr-font-medium">Noah Williams</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Subscription</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-bg-secondary pr-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-25</TableCell>
                          <TableCell className="pr-text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="pr-font-medium">Emma Brown</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Sale</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-bg-secondary pr-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-26</TableCell>
                          <TableCell className="pr-text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="pr-font-medium">Liam Johnson</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Sale</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-bg-secondary pr-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-23</TableCell>
                          <TableCell className="pr-text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="pr-font-medium">Liam Johnson</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Sale</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-bg-secondary pr-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-23</TableCell>
                          <TableCell className="pr-text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="pr-font-medium">Olivia Smith</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Refund</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-bg-secondary pr-text-xs">Declined</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-24</TableCell>
                          <TableCell className="pr-text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="pr-font-medium">Emma Brown</div>
                            <div className="pr-hidden pr-text-sm pr-text-muted-foreground md:pr-inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">Sale</TableCell>
                          <TableCell className="pr-hidden sm:pr-table-cell">
                            <div className="pr-bg-secondary pr-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="pr-hidden md:pr-table-cell">2023-06-26</TableCell>
                          <TableCell className="pr-text-right">$450.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="pr-overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="pr-flex pr-flex-row pr-items-start pr-bg-muted/50">
                <div className="pr-grid pr-gap-0.5">
                  <CardTitle className="pr-group pr-flex pr-items-center pr-gap-2 pr-text-lg">
                    Order Oe31b70H
                    <Button
                      size="icon"
                      variant="outline"
                      className="pr-h-6 pr-w-6 pr-opacity-0 pr-transition-opacity group-hover:pr-opacity-100"
                    >
                      <Copy className="pr-h-3 pr-w-3" />
                      <a className="pr-sr-only">Copy Order ID</a>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="pr-ml-auto pr-flex pr-items-center pr-gap-1">
                  <Button size="sm" variant="outline" className="pr-h-8 pr-gap-1">
                    <Truck className="pr-h-3.5 pr-w-3.5" />
                    <span className="lg:pr-sr-only xl:pr-not-sr-only xl:pr-whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu dir={direction}>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="pr-h-8 pr-w-8">
                        <MoreVertical className="pr-h-3.5 pr-w-3.5" />
                        <a className="pr-sr-only">More</a>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pr-p-6 pr-text-sm">
                <div className="pr-grid pr-gap-3">
                  <div className="pr-font-semibold">Order Details</div>
                  <ul className="pr-grid pr-gap-3">
                    <li className="pr-flex pr-items-center pr-justify-between">
                      <span className="pr-text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className="pr-flex pr-items-center pr-justify-between">
                      <span className="pr-text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <hr className="pr-my-2" />
                  <ul className="pr-grid pr-gap-3">
                    <li className="pr-flex pr-items-center pr-justify-between">
                      <span className="pr-text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="pr-flex pr-items-center pr-justify-between">
                      <span className="pr-text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="pr-flex pr-items-center pr-justify-between">
                      <span className="pr-text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="pr-flex pr-items-center pr-justify-between pr-font-semibold">
                      <span className="pr-text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <hr className="pr-my-4" />
                <div className="pr-grid pr-grid-cols-2 pr-gap-4">
                  <div className="pr-grid pr-gap-3">
                    <div className="pr-font-semibold">Shipping Information</div>
                    <address className="pr-grid pr-gap-0.5 pr-not-italic pr-text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <div className="pr-grid pr-auto-rows-max pr-gap-3">
                    <div className="pr-font-semibold">Billing Information</div>
                    <div className="pr-text-muted-foreground">Same as shipping address</div>
                  </div>
                </div>
                <hr className="pr-my-4" />
                <div className="pr-grid pr-gap-3">
                  <div className="pr-font-semibold">Customer Information</div>
                  <dl className="pr-grid pr-gap-3">
                    <div className="pr-flex pr-items-center pr-justify-between">
                      <dt className="pr-text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="pr-flex pr-items-center pr-justify-between">
                      <dt className="pr-text-muted-foreground">Email</dt>
                      <dd>
                        <a
                          href="mailto:"
                          className="focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring"
                        >
                          liam@acme.com
                        </a>
                      </dd>
                    </div>
                    <div className="pr-flex pr-items-center pr-justify-between">
                      <dt className="pr-text-muted-foreground">Phone</dt>
                      <dd>
                        <a
                          href="tel:"
                          className="focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring"
                        >
                          +1 234 567 890
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <hr className="pr-my-4" />
                <div className="pr-grid pr-gap-3">
                  <div className="pr-font-semibold">Payment Information</div>
                  <dl className="pr-grid pr-gap-3">
                    <div className="pr-flex pr-items-center pr-justify-between">
                      <dt className="pr-flex pr-items-center pr-gap-1 pr-text-muted-foreground">
                        <CreditCard className="pr-h-4 pr-w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="pr-flex pr-flex-row pr-items-center pr-border-t pr-bg-muted/50 pr-px-6 pr-py-3">
                <div className="pr-text-xs pr-text-muted-foreground">
                  Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                {/*                 <Pagination className="pr-ml-auto mr-0 pr-w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="pr-h-6 pr-w-6">
                    <ChevronLeft className="pr-h-3.5 pr-w-3.5" />
                    <a className="pr-sr-only">Previous Order</a>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="pr-h-6 pr-w-6">
                    <ChevronRight className="pr-h-3.5 pr-w-3.5" />
                    <a className="pr-sr-only">Next Order</a>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination> */}
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
