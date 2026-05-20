import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { defaultScrRef } from 'platform-bible-utils';
import {
  Blocks,
  BookOpen,
  Calendar,
  ClipboardPaste,
  Home,
  Inbox,
  Search,
  Settings,
  X,
} from 'lucide-react';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/shadcn-ui/menubar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/shadcn-ui/sidebar';
import { Switch } from '@/components/shadcn-ui/switch';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { ComboBox } from '@/components/basics/combo-box.component';
import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { usjFootnotes } from '@/components/advanced/footnotes/footnotes.usj.data';
import {
  MarkerMenu,
  type MarkerMenuItem,
  type MarkerMenuLocalizedStrings,
} from '@/components/advanced/marker-menu.component';
import {
  MultiSelectComboBox,
  type MultiSelectComboBoxEntry,
} from '@/components/advanced/multi-select-combo-box.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
type TooltipAlign = 'start' | 'center' | 'end';

/**
 * Interactive placement controls shared by every story. `side` and `align` map directly to the
 * matching props on `TooltipContent`, so changing them in the Controls panel re-places every
 * tooltip rendered by the story.
 */
type TooltipStoryArgs = ComponentProps<typeof Tooltip> & {
  side: TooltipSide;
  align: TooltipAlign;
};

const meta = {
  title: 'Shadcn/Tooltip',
  component: Tooltip,
  tags: ['autodocs', 'test'],
  argTypes: {
    delayDuration: { control: 'number' },
    disableHoverableContent: { control: 'boolean' },
    side: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'inline-radio' },
      description: 'Which side of the trigger the tooltip is placed on.',
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
      description: 'How the tooltip is aligned along the chosen side.',
    },
  },
  args: {
    side: 'top',
    align: 'center',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <TooltipProvider>
          <div className="tw:flex tw:justify-center tw:p-8">
            <Story />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<TooltipStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ side, align, ...args }) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic tooltip that appears when hovering over the trigger element.',
      },
    },
  },
};

export const WithCustomContent: Story = {
  render: ({ side, align, ...args }) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="default">Rich Content</Button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <div className="tw:space-y-1">
          <p className="tw:font-semibold">Custom Tooltip</p>
          <p className="tw:text-sm">You can put any content here</p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain rich content including multiple elements and custom styling.',
      },
    },
  },
};

export const WithDifferentTriggers: Story = {
  render: ({ side, align, ...args }) => (
    <div className="tw:flex tw:gap-4">
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Outline Button</Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>Tooltip on outline button</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="destructive">Destructive Button</Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>Tooltip on destructive button</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="ghost">Ghost Button</Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>Tooltip on ghost button</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be applied to different button variants and other trigger elements.',
      },
    },
  },
};

export const DelayedTooltip: Story = {
  render: ({ side, align, ...args }) => (
    <Tooltip {...args} delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button variant="secondary">Delayed Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>This tooltip appears after 1 second</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'You can customize the delay before the tooltip appears using the delayDuration prop.',
      },
    },
  },
};

export const Interactive: Story = {
  render: ({ side, align, ...args }) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={fn()}>
          Click &amp; Hover
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>This button is both clickable and has a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  args: {
    delayDuration: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips work seamlessly with interactive elements like clickable buttons.',
      },
    },
  },
};

/*
 * The stories below demonstrate how a tooltip can be attached to many different kinds of UI
 * surfaces — control triggers, individual menu/list entries, table rows/cells, and so on. Every
 * tooltip in each story reads the shared `side` and `align` controls, so changing them in the
 * Controls panel re-places all the tooltips at once.
 *
 * For composite controls (dropdown menu, menubar, select, combo box, multi-select combo box, marker
 * menu) the requested "trigger" and "entries" demos are shown side by side as SEPARATE component
 * instances within the same story.
 */

const BUTTON_VARIANTS = [
  'default',
  'destructive',
  'outline',
  'secondary',
  'ghost',
  'link',
] as const;

const BADGE_VARIANTS = [
  'default',
  'destructive',
  'outline',
  'secondary',
  'muted',
  'ghost',
  'link',
  'blueIndicator',
  'mutedIndicator',
] as const;

const DROPDOWN_ENTRIES = ['Profile', 'Billing', 'Settings', 'Log out'];
const MENUBAR_MENUS = [
  { value: 'file', label: 'File', entries: ['New', 'Open', 'Save', 'Exit'] },
  { value: 'edit', label: 'Edit', entries: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'] },
  { value: 'view', label: 'View', entries: ['Zoom In', 'Zoom Out', 'Reset Zoom'] },
];
const SELECT_ENTRIES = ['Genesis', 'Exodus', 'Leviticus', 'Numbers'];
const COMBO_BOX_BOOKS = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'];
const RADIO_ENTRIES = [
  { value: 'default', label: 'Default' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];
const TAB_ENTRIES = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'settings', label: 'Settings' },
];
const SIDEBAR_ENTRIES = [
  { label: 'Home', icon: Home },
  { label: 'Inbox', icon: Inbox },
  { label: 'Calendar', icon: Calendar },
  { label: 'Settings', icon: Settings },
];

const MULTI_SELECT_ENTRIES: MultiSelectComboBoxEntry[] = [
  { value: 'resources', label: 'Resource', secondaryLabel: '6' },
  { value: 'source-language-texts', label: 'Source Language Text', secondaryLabel: '3' },
  { value: 'dictionaries', label: 'Dictionary', secondaryLabel: '1' },
  { value: 'consultant-notes', label: 'Consultant Note', secondaryLabel: '1' },
];

const MARKER_MENU_STRINGS: MarkerMenuLocalizedStrings = {
  '%markerMenu_deprecated_label%': 'Deprecated',
  '%markerMenu_disallowed_label%': 'Disallowed',
  '%markerMenu_noResults%': 'No results found.',
  '%markerMenu_searchPlaceholder%': 'Type a style or search.',
};

const MARKER_MENU_ITEMS: MarkerMenuItem[] = [
  { marker: 'p', title: 'Paragraph', subtitle: 'normal (with indent first line)', action: fn() },
  { icon: ClipboardPaste, title: 'Paste', action: fn() },
  { icon: ClipboardPaste, title: 'Paste as plaintext', action: fn() },
  { marker: 'pi', title: 'Indented Paragraph', subtitle: 'indent level 1', action: fn() },
];

type PlacementArgs = { side: TooltipSide; align: TooltipAlign };

/** Caption used above the second instance in trigger/entries demos. */
function DemoCaption({ children }: { children: string }) {
  return <span className="tw:text-xs tw:font-medium tw:text-muted-foreground">{children}</span>;
}

// ComboBox owns its open state internally, so it needs controlled value state to demo the trigger.
function ComboBoxTriggerDemo({ side, align }: PlacementArgs) {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="tw:inline-flex">
          <ComboBox<string>
            options={COMBO_BOX_BOOKS}
            value={value}
            onChange={setValue}
            buttonPlaceholder="Select a book"
            textPlaceholder="Search books..."
            commandEmptyMessage="No books found"
            icon={<BookOpen />}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>Tooltip on the combo box trigger</p>
      </TooltipContent>
    </Tooltip>
  );
}

function MultiSelectTriggerDemo({ side, align }: PlacementArgs) {
  const [selected, setSelected] = useState<string[]>(['resources']);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="tw:inline-flex tw:w-[260px]">
          <MultiSelectComboBox
            entries={MULTI_SELECT_ENTRIES}
            selected={selected}
            onChange={setSelected}
            placeholder="Select types"
            icon={<Blocks />}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>Tooltip on the multi-select trigger</p>
      </TooltipContent>
    </Tooltip>
  );
}

function BcvControlDemo({ side, align }: PlacementArgs) {
  const [scrRef, setScrRef] = useState<SerializedVerseRef>(defaultScrRef);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="tw:inline-flex">
          <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} />
        </span>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>Tooltip on the book/chapter/verse control</p>
      </TooltipContent>
    </Tooltip>
  );
}

export const ButtonVariants: Story = {
  name: 'Button (all variants)',
  render: ({ side, align }) => (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
      {BUTTON_VARIANTS.map((variant) => (
        <Tooltip key={variant}>
          <TooltipTrigger asChild>
            <Button variant={variant}>{variant}</Button>
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p>{variant} button</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A tooltip attached to every Button variant. Use the side/align controls to reposition them all.',
      },
    },
  },
};

export const BadgeVariants: Story = {
  name: 'Badge (all variants)',
  render: ({ side, align }) => (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
      {BADGE_VARIANTS.map((variant) => (
        <Tooltip key={variant}>
          <TooltipTrigger asChild>
            <span className="tw:inline-flex">
              <Badge variant={variant}>{variant}</Badge>
            </span>
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p>{variant} badge</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A tooltip attached to every Badge variant. Use the side/align controls to reposition them all.',
      },
    },
  },
};

export const CheckboxWithLabel: Story = {
  name: 'Checkbox with label',
  render: ({ side, align }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="tw:inline-flex tw:items-center tw:gap-2">
          <Checkbox id="tooltip-checkbox" />
          <Label htmlFor="tooltip-checkbox">Accept terms and conditions</Label>
        </span>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>Tooltip on the checkbox and its label</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A tooltip covering a checkbox together with its associated label.',
      },
    },
  },
};

export const SwitchTooltip: Story = {
  name: 'Switch',
  render: ({ side, align }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="tw:inline-flex tw:items-center tw:gap-2">
          <Switch id="tooltip-switch" />
          <Label htmlFor="tooltip-switch">Airplane mode</Label>
        </span>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>Tooltip on the switch</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A tooltip attached to a switch toggle.',
      },
    },
  },
};

export const BookChapterVerseControl: Story = {
  name: 'BCV control',
  render: ({ side, align }) => <BcvControlDemo side={side} align={align} />,
  parameters: {
    docs: {
      description: {
        story: 'A tooltip on the book/chapter/verse control trigger.',
      },
    },
  },
};

export const DropdownMenuTooltips: Story = {
  name: 'Dropdown menu (trigger + entries)',
  render: ({ side, align }) => (
    <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-16">
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <DemoCaption>Tooltip on the trigger</DemoCaption>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open menu</Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
              <p>Tooltip on the dropdown menu trigger</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {DROPDOWN_ENTRIES.map((entry) => (
              <DropdownMenuItem key={entry}>{entry}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <DemoCaption>Tooltip on each entry</DemoCaption>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Entries</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {DROPDOWN_ENTRIES.map((entry) => (
              <DropdownMenuItem key={entry} onSelect={(event) => event.preventDefault()}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="tw:flex-1">{entry}</span>
                  </TooltipTrigger>
                  <TooltipContent side={side} align={align}>
                    <p>Tooltip on the {entry} entry</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Two dropdown menus: the first shows a tooltip on the trigger button, the second (rendered open) shows a tooltip on each menu entry.',
      },
    },
  },
};

export const MenubarTooltips: Story = {
  name: 'Menubar (trigger + entries)',
  render: ({ side, align }) => (
    <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-16">
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <DemoCaption>Tooltip on each trigger</DemoCaption>
        <Menubar>
          {MENUBAR_MENUS.map((menu) => (
            <MenubarMenu key={menu.value}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MenubarTrigger>{menu.label}</MenubarTrigger>
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                  <p>Tooltip on the {menu.label} menu trigger</p>
                </TooltipContent>
              </Tooltip>
              <MenubarContent>
                {menu.entries.map((entry) => (
                  <MenubarItem key={entry}>{entry}</MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>

      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <DemoCaption>Tooltip on each entry</DemoCaption>
        <Menubar defaultValue="file">
          {MENUBAR_MENUS.map((menu) => (
            <MenubarMenu key={menu.value} value={menu.value}>
              <MenubarTrigger>{menu.label}</MenubarTrigger>
              <MenubarContent>
                {menu.entries.map((entry) => (
                  <MenubarItem key={entry} onSelect={(event) => event.preventDefault()}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="tw:flex-1">{entry}</span>
                      </TooltipTrigger>
                      <TooltipContent side={side} align={align}>
                        <p>Tooltip on the {entry} entry</p>
                      </TooltipContent>
                    </Tooltip>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Two menubars: the first shows a tooltip on the menu trigger, the second (rendered open) shows a tooltip on each menu entry.',
      },
    },
  },
};

export const SelectTooltips: Story = {
  name: 'Select (trigger + entries)',
  render: ({ side, align }) => (
    <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-16">
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <DemoCaption>Tooltip on the trigger</DemoCaption>
        <Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger className="tw:w-48">
                <SelectValue placeholder="Select a book" />
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
              <p>Tooltip on the select trigger</p>
            </TooltipContent>
          </Tooltip>
          <SelectContent>
            {SELECT_ENTRIES.map((entry) => (
              <SelectItem key={entry} value={entry.toLowerCase()}>
                {entry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <DemoCaption>Tooltip on each entry</DemoCaption>
        <Select defaultOpen>
          <SelectTrigger className="tw:w-48">
            <SelectValue placeholder="Entries" />
          </SelectTrigger>
          <SelectContent>
            {SELECT_ENTRIES.map((entry) => (
              <SelectItem key={entry} value={entry.toLowerCase()}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{entry}</span>
                  </TooltipTrigger>
                  <TooltipContent side={side} align={align}>
                    <p>Tooltip on the {entry} entry</p>
                  </TooltipContent>
                </Tooltip>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Two selects: the first shows a tooltip on the trigger, the second (rendered open) shows a tooltip on each option entry.',
      },
    },
  },
};

export const RadioGroupEntries: Story = {
  name: 'Radio group entries',
  render: ({ side, align }) => (
    <RadioGroup defaultValue="comfortable" className="tw:gap-3">
      {RADIO_ENTRIES.map((entry) => (
        <Tooltip key={entry.value}>
          <TooltipTrigger asChild>
            <div className="tw:flex tw:items-center tw:gap-2">
              <RadioGroupItem value={entry.value} id={`tooltip-radio-${entry.value}`} />
              <Label htmlFor={`tooltip-radio-${entry.value}`}>{entry.label}</Label>
            </div>
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p>Tooltip on the {entry.label} entry</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A tooltip on each radio group entry.',
      },
    },
  },
};

export const SidebarEntries: Story = {
  name: 'Sidebar entries',
  render: ({ side, align }) => (
    <div className="tw:h-80 tw:w-full">
      {/* `collapsible="none"` keeps the sidebar visible at any width — the default sidebar is
          hidden below the `md` viewport breakpoint, which made the entries disappear in narrow
          story canvases. */}
      <SidebarProvider>
        <Sidebar collapsible="none" className="tw:h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {SIDEBAR_ENTRIES.map((entry) => {
                    const Icon = entry.icon;
                    return (
                      <SidebarMenuItem key={entry.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton>
                              <Icon />
                              {entry.label}
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side={side} align={align}>
                            <p>Tooltip on the {entry.label} entry</p>
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="tw:flex tw:items-center tw:gap-2 tw:p-4">
            <SidebarTrigger />
            <span className="tw:text-sm tw:text-muted-foreground">Hover a sidebar entry</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A tooltip on each sidebar navigation entry.',
      },
    },
  },
};

export const TabEntries: Story = {
  name: 'Tab entries',
  render: ({ side, align }) => (
    <Tabs defaultValue="overview">
      <TabsList>
        {TAB_ENTRIES.map((entry) => (
          <Tooltip key={entry.value}>
            <TooltipTrigger asChild>
              <TabsTrigger value={entry.value}>{entry.label}</TabsTrigger>
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
              <p>Tooltip on the {entry.label} tab</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
      {TAB_ENTRIES.map((entry) => (
        <TabsContent key={entry.value} value={entry.value}>
          {entry.label} content
        </TabsContent>
      ))}
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A tooltip on each tab entry.',
      },
    },
  },
};

export const TableRows: Story = {
  name: 'Table rows',
  render: ({ side, align }) => {
    const rows = [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    ];
    return (
      <Table>
        <TableCaption>Hover a row to see its tooltip.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <Tooltip key={row.email}>
              <TooltipTrigger asChild>
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent side={side} align={align}>
                <p>Tooltip on {row.name}&apos;s row</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A tooltip on each table row.',
      },
    },
  },
};

export const TableCells: Story = {
  name: 'Table cells',
  render: ({ side, align }) => {
    const headers = ['Name', 'Email', 'Role'];
    const row = ['Jane Smith', 'jane@example.com', 'Editor'];
    return (
      <Table>
        <TableCaption>Hover any cell to see its tooltip.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {row.map((cell, index) => (
              <Tooltip key={headers[index]}>
                <TooltipTrigger asChild>
                  <TableCell>{cell}</TableCell>
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                  <p>Tooltip on the {headers[index]} cell</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A tooltip on each individual table cell.',
      },
    },
  },
};

export const TableTextContent: Story = {
  name: 'Text content in a table',
  render: ({ side, align }) => {
    const rows = [
      {
        term: 'Justification',
        definition:
          'The act of God declaring a sinner righteous on the basis of faith in Jesus Christ.',
      },
      {
        term: 'Sanctification',
        definition: 'The ongoing process by which a believer is made holy and conformed to Christ.',
      },
    ];
    return (
      <Table className="tw:w-[420px]">
        <TableCaption>Hover the truncated definition text to read the full entry.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Term</TableHead>
            <TableHead>Definition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.term}>
              <TableCell>{row.term}</TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="tw:block tw:max-w-[220px] tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap">
                      {row.definition}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side={side} align={align}>
                    <p className="tw:max-w-xs">{row.definition}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A tooltip attached to the text content inside table cells — a common pattern for revealing text that is truncated to fit the column.',
      },
    },
  },
};

export const SearchBarClearButton: Story = {
  name: 'Search bar clear (X) button',
  render: ({ side, align }) => (
    <div className="tw:relative tw:w-64">
      <Search className="tw:absolute tw:inset-s-3 tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:opacity-50" />
      <Input
        className="tw:w-full tw:ps-9 tw:pe-9"
        defaultValue="search term"
        placeholder="Search..."
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="tw:absolute tw:inset-e-0 tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:hover:bg-transparent"
          >
            <X className="tw:h-4 tw:w-4" />
            <span className="tw:sr-only">Clear</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>Clear search</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A tooltip on a search bar's clear (X) button. The SearchBar component renders this button internally, so the search bar markup is reconstructed here to attach a tooltip to the clear button.",
      },
    },
  },
};

export const ComboBoxTooltips: Story = {
  name: 'Combo box',
  render: ({ side, align }) => <ComboBoxTriggerDemo side={side} align={align} />,
  parameters: {
    docs: {
      description: {
        story:
          'A tooltip on the real ComboBox trigger. The ComboBox renders its options internally with no per-entry slot, so per-entry tooltips would require modifying the component.',
      },
    },
  },
};

export const MultiSelectComboBoxTooltips: Story = {
  name: 'Multi-select combo box',
  render: ({ side, align }) => <MultiSelectTriggerDemo side={side} align={align} />,
  parameters: {
    docs: {
      description: {
        story:
          'A tooltip on the real MultiSelectComboBox trigger. The component renders its entries internally with no per-entry slot, so per-entry tooltips would require modifying the component.',
      },
    },
  },
};

export const MarkerMenuTooltips: Story = {
  name: 'Marker menu',
  render: ({ side, align }) => (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <ClipboardPaste className="tw:me-2 tw:h-4 tw:w-4" />
              Markers
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>Tooltip on the marker menu trigger</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="tw:w-64 tw:p-0">
        <MarkerMenu localizedStrings={MARKER_MENU_STRINGS} markerMenuItems={MARKER_MENU_ITEMS} />
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The marker menu has no built-in trigger, so this places the real MarkerMenu inside a Popover and attaches a tooltip to the button that opens it. The MarkerMenu renders its items internally with no per-entry slot, so per-entry tooltips would require modifying the component.',
      },
    },
  },
};

export const FootnoteListTooltip: Story = {
  name: 'Footnote list',
  render: ({ side, align }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="tw:h-[260px] tw:w-80 tw:overflow-auto tw:rounded tw:border tw:p-2">
          <FootnoteList
            footnotes={usjFootnotes}
            listId="tooltip-footnote-list"
            showMarkers={false}
            layout="horizontal"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>Tooltip on the footnote list</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A tooltip on the real FootnoteList component. The list renders its entries internally with no per-entry slot, so per-entry tooltips would require modifying the component.',
      },
    },
  },
};
