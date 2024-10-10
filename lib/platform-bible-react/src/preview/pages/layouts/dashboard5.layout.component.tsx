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
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

export default function Dashboard5Examples({ direction }: HasDirection) {
  const [progress, setProgress] = useState<number[]>([25]);
  return (
    <div className="tw-flex tw-h-[100%] tw-w-full tw-rounded-md tw-bg-muted/40">
      <aside className="tw-s-0 tw-inset-y-0 tw-z-10 tw-hidden tw-w-14 tw-flex-col tw-rounded-s-md tw-border-e tw-bg-background sm:tw-flex">
        <nav className="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-px-2 sm:tw-py-5">
          <div className="tw-group tw-flex tw-h-9 tw-w-9 tw-shrink-0 tw-items-center tw-justify-center tw-gap-2 tw-rounded-full tw-bg-primary tw-text-lg tw-font-semibold tw-text-primary-foreground md:tw-h-8 md:tw-w-8 md:tw-text-base">
            <Package2 className="tw-group-hover:tw-scale-110 tw-h-4 tw-w-4 tw-transition-all" />
            <a className="tw-sr-only">Acme Inc</a>
          </div>
          <div>
            <div>
              <div className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-lg tw-text-muted-foreground tw-transition-colors hover:tw-text-foreground md:tw-h-8 md:tw-w-8">
                <Home className="tw-h-5 tw-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-lg tw-bg-accent tw-text-accent-foreground tw-transition-colors hover:tw-text-foreground md:tw-h-8 md:tw-w-8">
                <ShoppingCart className="tw-h-5 tw-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-lg tw-text-muted-foreground tw-transition-colors hover:tw-text-foreground md:tw-h-8 md:tw-w-8">
                <Package className="tw-h-5 tw-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-lg tw-text-muted-foreground tw-transition-colors hover:tw-text-foreground md:tw-h-8 md:tw-w-8">
                <Users2 className="tw-h-5 tw-w-5" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-lg tw-text-muted-foreground tw-transition-colors hover:tw-text-foreground md:tw-h-8 md:tw-w-8">
                <LineChart className="tw-h-5 tw-w-5" />
              </div>
            </div>
          </div>
        </nav>
        <nav className="tw-mt-auto tw-flex tw-flex-col tw-items-center tw-gap-4 tw-px-2 sm:tw-py-5">
          <div>
            <div>
              <div className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-lg tw-text-muted-foreground tw-transition-colors hover:tw-text-foreground md:tw-h-8 md:tw-w-8">
                <Settings className="tw-h-5 tw-w-5" />
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <div className="tw-flex tw-flex-col tw-overflow-auto focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring sm:tw-gap-4 sm:tw-py-4 sm:tw-pl-14">
        <header className="sm:h-auto tw-sticky tw-top-0 tw-z-30 tw-flex tw-h-14 tw-items-center tw-gap-4 tw-border-b tw-bg-background tw-px-4 sm:tw-static sm:tw-border-0 sm:tw-bg-transparent sm:tw-px-6">
          <Tabs className="tw-hidden">
            <TabsList>
              <TabsTrigger value="a">
                <Button size="icon" variant="outline" className="sm:tw-hidden">
                  <PanelLeft className="tw-h-5 tw-w-5" />
                  <a className="tw-sr-only">Toggle Menu</a>
                </Button>
              </TabsTrigger>
              <TabsTrigger value="b" />
            </TabsList>

            {/* <SheetContent side="left" className="sm:max-tw-w-xs"> */}
            <TabsContent value="a" className="sm:max-tw-w-xs tw-bg-secondary">
              <nav className="tw-grid tw-gap-6 tw-text-lg tw-font-medium">
                <div className="tw-group tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-items-center tw-justify-center tw-gap-2 tw-rounded-full tw-bg-primary tw-text-lg tw-font-semibold tw-text-primary-foreground md:tw-text-base">
                  <Package2 className="tw-group-hover:tw-scale-110 tw-h-5 tw-w-5 tw-transition-all" />
                  <a className="tw-sr-only">Acme Inc</a>
                </div>
                <div className="tw-flex tw-items-center tw-gap-4 tw-px-2.5 tw-text-muted-foreground hover:tw-text-foreground">
                  <Home className="tw-h-5 tw-w-5" />
                  Dashboard
                </div>
                <div className="tw-flex tw-items-center tw-gap-4 tw-px-2.5 tw-text-foreground">
                  <ShoppingCart className="tw-h-5 tw-w-5" />
                  Orders
                </div>
                <div className="tw-flex tw-items-center tw-gap-4 tw-px-2.5 tw-text-muted-foreground hover:tw-text-foreground">
                  <Package className="tw-h-5 tw-w-5" />
                  Products
                </div>
                <div className="tw-flex tw-items-center tw-gap-4 tw-px-2.5 tw-text-muted-foreground hover:tw-text-foreground">
                  <Users2 className="tw-h-5 tw-w-5" />
                  Customers
                </div>
                <div className="tw-flex tw-items-center tw-gap-4 tw-px-2.5 tw-text-muted-foreground hover:tw-text-foreground">
                  <LineChart className="tw-h-5 tw-w-5" />
                  Settings
                </div>
              </nav>
            </TabsContent>
          </Tabs>
          {/*           <Breadcrumb className="tw-hidden md:tw-flex">
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
          <div className="tw-relative tw-ml-auto tw-flex-1 md:tw-grow-0">
            <Search className="tw-absolute tw-left-2.5 tw-top-2.5 tw-h-4 tw-w-4 tw-text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="tw-w-full tw-rounded-lg tw-bg-background tw-pl-8 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring md:tw-w-[200px] lg:tw-w-[336px]"
            />
          </div>
          <DropdownMenu dir={direction}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="tw-overflow-hidden tw-rounded-full">
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
        <main className="tw-grid tw-flex-1 tw-items-start tw-gap-4 tw-p-4 sm:tw-px-6 sm:tw-py-0 md:tw-gap-8 lg:tw-grid-cols-3 xl:tw-grid-cols-3">
          <div className="tw-grid tw-auto-rows-max tw-items-start tw-gap-4 md:tw-gap-8 lg:tw-col-span-2">
            <div className="tw-grid tw-gap-4 sm:tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-2 xl:tw-grid-cols-4">
              <Card className="sm:tw-col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-tw-w-lg tw-text-balance tw-leading-relaxed">
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
                  <CardTitle className="tw-text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="tw-text-xs tw-text-muted-foreground">
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
                    onValueChange={(value: number[]) => setProgress(value)}
                    aria-label={`${progress[0]}% increase`}
                  />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="tw-text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="tw-text-xs tw-text-muted-foreground">+10% from last month</div>
                </CardContent>
                <CardFooter>Progress value={10}</CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week" dir={direction}>
              <div className="tw-flex tw-items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="tw-ms-auto tw-flex tw-items-center tw-gap-2">
                  <DropdownMenu dir={direction}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="tw-h-7 tw-gap-1 tw-text-sm">
                        <ListFilter className="tw-h-3.5 tw-w-3.5" />
                        <span className="tw-sr-only sm:tw-not-sr-only">Filter</span>
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
                  <Button size="sm" variant="outline" className="tw-h-7 tw-gap-1 tw-text-sm">
                    <File className="tw-h-3.5 tw-w-3.5" />
                    <span className="tw-sr-only sm:tw-not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="tw-px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders from your store.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="tw-hidden sm:tw-table-cell">Type</TableHead>
                          <TableHead className="tw-hidden sm:tw-table-cell">Status</TableHead>
                          <TableHead className="tw-hidden md:tw-table-cell">Date</TableHead>
                          <TableHead className="tw-text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="tw-bg-accent">
                          <TableCell>
                            <div className="tw-font-medium">Liam Johnson</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Sale</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-bg-secondary tw-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-23</TableCell>
                          <TableCell className="tw-text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="tw-font-medium">Olivia Smith</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Refund</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-border tw-text-xs">Declined</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-24</TableCell>
                          <TableCell className="tw-text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="tw-font-medium">Noah Williams</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              noah@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Subscription</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-bg-secondary tw-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-25</TableCell>
                          <TableCell className="tw-text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="tw-font-medium">Emma Brown</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Sale</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-bg-secondary tw-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-26</TableCell>
                          <TableCell className="tw-text-right">$450.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="tw-font-medium">Liam Johnson</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Sale</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-bg-secondary tw-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-23</TableCell>
                          <TableCell className="tw-text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="tw-font-medium">Liam Johnson</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Sale</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-bg-secondary tw-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-23</TableCell>
                          <TableCell className="tw-text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="tw-font-medium">Olivia Smith</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              olivia@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Refund</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-bg-secondary tw-text-xs">Declined</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-24</TableCell>
                          <TableCell className="tw-text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="tw-font-medium">Emma Brown</div>
                            <div className="tw-hidden tw-text-sm tw-text-muted-foreground md:tw-inline">
                              emma@example.com
                            </div>
                          </TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">Sale</TableCell>
                          <TableCell className="tw-hidden sm:tw-table-cell">
                            <div className="tw-bg-secondary tw-text-xs">Fulfilled</div>
                          </TableCell>
                          <TableCell className="tw-hidden md:tw-table-cell">2023-06-26</TableCell>
                          <TableCell className="tw-text-right">$450.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="tw-overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="tw-flex tw-flex-row tw-items-start tw-bg-muted/50">
                <div className="tw-grid tw-gap-0.5">
                  <CardTitle className="tw-group tw-flex tw-items-center tw-gap-2 tw-text-lg">
                    Order Oe31b70H
                    <Button
                      size="icon"
                      variant="outline"
                      className="tw-h-6 tw-w-6 tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100"
                    >
                      <Copy className="tw-h-3 tw-w-3" />
                      <a className="tw-sr-only">Copy Order ID</a>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="tw-ml-auto tw-flex tw-items-center tw-gap-1">
                  <Button size="sm" variant="outline" className="tw-h-8 tw-gap-1">
                    <Truck className="tw-h-3.5 tw-w-3.5" />
                    <span className="lg:tw-sr-only xl:tw-not-sr-only xl:tw-whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu dir={direction}>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="tw-h-8 tw-w-8">
                        <MoreVertical className="tw-h-3.5 tw-w-3.5" />
                        <a className="tw-sr-only">More</a>
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
              <CardContent className="tw-p-6 tw-text-sm">
                <div className="tw-grid tw-gap-3">
                  <div className="tw-font-semibold">Order Details</div>
                  <ul className="tw-grid tw-gap-3">
                    <li className="tw-flex tw-items-center tw-justify-between">
                      <span className="tw-text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className="tw-flex tw-items-center tw-justify-between">
                      <span className="tw-text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <hr className="tw-my-2" />
                  <ul className="tw-grid tw-gap-3">
                    <li className="tw-flex tw-items-center tw-justify-between">
                      <span className="tw-text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="tw-flex tw-items-center tw-justify-between">
                      <span className="tw-text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="tw-flex tw-items-center tw-justify-between">
                      <span className="tw-text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="tw-flex tw-items-center tw-justify-between tw-font-semibold">
                      <span className="tw-text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <hr className="tw-my-4" />
                <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                  <div className="tw-grid tw-gap-3">
                    <div className="tw-font-semibold">Shipping Information</div>
                    <address className="tw-grid tw-gap-0.5 tw-not-italic tw-text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <div className="tw-grid tw-auto-rows-max tw-gap-3">
                    <div className="tw-font-semibold">Billing Information</div>
                    <div className="tw-text-muted-foreground">Same as shipping address</div>
                  </div>
                </div>
                <hr className="tw-my-4" />
                <div className="tw-grid tw-gap-3">
                  <div className="tw-font-semibold">Customer Information</div>
                  <dl className="tw-grid tw-gap-3">
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <dt className="tw-text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <dt className="tw-text-muted-foreground">Email</dt>
                      <dd>
                        <a
                          href="mailto:"
                          className="focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring"
                        >
                          liam@acme.com
                        </a>
                      </dd>
                    </div>
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <dt className="tw-text-muted-foreground">Phone</dt>
                      <dd>
                        <a
                          href="tel:"
                          className="focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring"
                        >
                          +1 234 567 890
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <hr className="tw-my-4" />
                <div className="tw-grid tw-gap-3">
                  <div className="tw-font-semibold">Payment Information</div>
                  <dl className="tw-grid tw-gap-3">
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <dt className="tw-flex tw-items-center tw-gap-1 tw-text-muted-foreground">
                        <CreditCard className="tw-h-4 tw-w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="tw-flex tw-flex-row tw-items-center tw-border-t tw-bg-muted/50 tw-px-6 tw-py-3">
                <div className="tw-text-xs tw-text-muted-foreground">
                  Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                {/*                 <Pagination className="tw-ml-auto mr-0 tw-w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="tw-h-6 tw-w-6">
                    <ChevronLeft className="tw-h-3.5 tw-w-3.5" />
                    <a className="tw-sr-only">Previous Order</a>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="tw-h-6 tw-w-6">
                    <ChevronRight className="tw-h-3.5 tw-w-3.5" />
                    <a className="tw-sr-only">Next Order</a>
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
