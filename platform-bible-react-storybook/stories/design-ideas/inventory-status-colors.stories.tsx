import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties, Fragment } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { CircleCheckIcon, CircleHelpIcon, CircleXIcon } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui/utils';

/*
 * Throwaway comparison harness for choosing the inventory status "selected" colors.
 *
 * The real inventory status toggle (inventory-columns.tsx) currently styles the selected status
 * with `data-[state=on]:bg-muted` — the same token used for selected/hovered table rows, so the
 * selected status blends into the row highlight. This page compares three candidate styles for the
 * selected status, each oriented on the PT9 colors (green ✓, red ✗, blue ?), across all four theme
 * variants and against the row selection/hover backgrounds. Once a style is chosen, three semantic
 * theme variables will be added to index.css and wired into the real component, and this story will
 * be removed.
 *
 * Candidate colors here are defined as local CSS custom properties (per theme) so nothing in the
 * real theme is touched yet.
 */

type Status = 'approved' | 'unapproved' | 'unknown';
type StyleOption = 'soft' | 'vivid' | 'icon';
type RowState = 'normal' | 'selected' | 'hover';

const STATUSES: Status[] = ['approved', 'unapproved', 'unknown'];
const ROW_STATES: RowState[] = ['normal', 'selected', 'hover'];

const STATUS_LABELS: Record<Status, string> = {
  approved: 'Approved ✓',
  unapproved: 'Unapproved ✗',
  unknown: 'Unknown ?',
};

const ROW_STATE_LABELS: Record<RowState, string> = {
  normal: 'Normal row',
  selected: 'Selected row',
  hover: 'Hover row',
};

const OPTION_LABELS: Record<StyleOption, string> = {
  soft: 'Option 1 — Soft tinted fill (icon keeps normal foreground)',
  vivid: 'Option 2 — Saturated fill + light icon',
  icon: 'Option 3 — Colored icon only (background stays muted)',
};

// Literal selected-state class strings per option/status. Written out in full (no interpolation)
// so Tailwind's JIT scanner picks them up. The `bg-[var(--…)]` / `text-[var(--…)]` arbitrary values
// reference the per-theme candidate variables defined on each theme card below.
const SELECTED_CLASSES: Record<StyleOption, Record<Status, string>> = {
  soft: {
    approved: 'tw:data-[state=on]:bg-[var(--inv-soft-approved)] tw:data-[state=on]:text-foreground',
    unapproved:
      'tw:data-[state=on]:bg-[var(--inv-soft-unapproved)] tw:data-[state=on]:text-foreground',
    unknown: 'tw:data-[state=on]:bg-[var(--inv-soft-unknown)] tw:data-[state=on]:text-foreground',
  },
  vivid: {
    approved:
      'tw:data-[state=on]:bg-[var(--inv-vivid-approved)] tw:data-[state=on]:text-[var(--inv-on)]',
    unapproved:
      'tw:data-[state=on]:bg-[var(--inv-vivid-unapproved)] tw:data-[state=on]:text-[var(--inv-on)]',
    unknown:
      'tw:data-[state=on]:bg-[var(--inv-vivid-unknown)] tw:data-[state=on]:text-[var(--inv-on)]',
  },
  icon: {
    approved: 'tw:data-[state=on]:text-[var(--inv-icon-approved)]',
    unapproved: 'tw:data-[state=on]:text-[var(--inv-icon-unapproved)]',
    unknown: 'tw:data-[state=on]:text-[var(--inv-icon-unknown)]',
  },
};

// Candidate colors for the light theme variants (Platform.Bible Light + Paratext Light).
const LIGHT_VARS: Record<string, string> = {
  '--inv-soft-approved': 'oklch(0.9 0.07 150)',
  '--inv-soft-unapproved': 'oklch(0.9 0.07 25)',
  '--inv-soft-unknown': 'oklch(0.9 0.06 250)',
  '--inv-vivid-approved': 'oklch(0.62 0.15 150)',
  '--inv-vivid-unapproved': 'oklch(0.58 0.2 25)',
  '--inv-vivid-unknown': 'oklch(0.55 0.14 250)',
  '--inv-on': 'oklch(0.99 0 0)',
  '--inv-icon-approved': 'oklch(0.52 0.15 150)',
  '--inv-icon-unapproved': 'oklch(0.53 0.21 25)',
  '--inv-icon-unknown': 'oklch(0.5 0.15 250)',
};

// Candidate colors for the dark theme variants (Platform.Bible Dark + Paratext Dark).
const DARK_VARS: Record<string, string> = {
  '--inv-soft-approved': 'oklch(0.4 0.08 150)',
  '--inv-soft-unapproved': 'oklch(0.4 0.1 25)',
  '--inv-soft-unknown': 'oklch(0.4 0.08 250)',
  '--inv-vivid-approved': 'oklch(0.6 0.15 150)',
  '--inv-vivid-unapproved': 'oklch(0.56 0.2 25)',
  '--inv-vivid-unknown': 'oklch(0.54 0.14 250)',
  '--inv-on': 'oklch(0.99 0 0)',
  '--inv-icon-approved': 'oklch(0.8 0.16 150)',
  '--inv-icon-unapproved': 'oklch(0.72 0.17 25)',
  '--inv-icon-unknown': 'oklch(0.78 0.12 250)',
};

type ThemeCardConfig = { label: string; themeClass: string; vars: Record<string, string> };

const THEME_CARDS: ThemeCardConfig[] = [
  { label: 'Platform.Bible — Light', themeClass: 'light', vars: LIGHT_VARS },
  { label: 'Platform.Bible — Dark', themeClass: 'dark', vars: DARK_VARS },
  { label: 'Paratext — Light', themeClass: 'paratext-light', vars: LIGHT_VARS },
  { label: 'Paratext — Dark', themeClass: 'paratext-dark', vars: DARK_VARS },
];

/** A read-only copy of the real inventory status toggle, with candidate selected-state styling. */
function StatusToggleDemo({ status, option }: { status: Status; option: StyleOption }) {
  return (
    <ToggleGroup value={status} variant="outline" type="single" className="tw:gap-0">
      <ToggleGroupItem
        value="approved"
        className={cn('tw:rounded-e-none tw:border-e-0', SELECTED_CLASSES[option].approved)}
      >
        <CircleCheckIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="unapproved"
        className={cn('tw:rounded-none', SELECTED_CLASSES[option].unapproved)}
      >
        <CircleXIcon />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="unknown"
        className={cn('tw:rounded-s-none tw:border-s-0', SELECTED_CLASSES[option].unknown)}
      >
        <CircleHelpIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

/** Shows one style option as a grid of statuses (rows) × row-backgrounds (columns). */
function OptionBlock({ option }: { option: StyleOption }) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-2 tw:rounded-md tw:border tw:p-3">
      <div className="tw:text-sm tw:font-semibold">{OPTION_LABELS[option]}</div>
      <div className="tw:grid tw:grid-cols-[auto_auto_auto_auto] tw:items-center tw:gap-x-4 tw:gap-y-2">
        <div />
        {ROW_STATES.map((rowState) => (
          <div key={rowState} className="tw:text-xs tw:text-muted-foreground">
            {ROW_STATE_LABELS[rowState]}
          </div>
        ))}
        {STATUSES.map((status) => (
          <Fragment key={status}>
            <div className="tw:text-xs tw:text-muted-foreground">{STATUS_LABELS[status]}</div>
            {ROW_STATES.map((rowState) => (
              <div
                key={rowState}
                className={cn('tw:w-fit tw:rounded tw:p-1', {
                  'tw:bg-muted': rowState === 'selected',
                  'tw:bg-muted/50': rowState === 'hover',
                })}
              >
                <StatusToggleDemo status={status} option={option} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** A single theme variant card showing all three style options. */
function ThemeCard({ label, themeClass, vars }: ThemeCardConfig) {
  return (
    <div
      className={cn(
        'pr-twp tw:flex tw:flex-col tw:gap-4 tw:rounded-lg tw:border tw:bg-background tw:p-4 tw:text-foreground',
        themeClass,
      )}
      // CSS custom properties (--*) are not part of React.CSSProperties; casting the vars record is
      // the standard React pattern for passing CSS variables via the style prop.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      style={vars as CSSProperties}
    >
      <div className="tw:text-base tw:font-bold">{label}</div>
      <OptionBlock option="soft" />
      <OptionBlock option="vivid" />
      <OptionBlock option="icon" />
    </div>
  );
}

function InventoryStatusColorComparison() {
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:p-4">
      <div className="tw:max-w-3xl tw:text-sm tw:text-muted-foreground">
        Comparing three candidate styles for the selected inventory status, oriented on the PT9
        colors (green ✓, red ✗, blue ?). Each option is shown in all four theme variants and against
        the table&apos;s selected-row and hover-row backgrounds to check for clashes. Colors here
        are provisional; once a style is chosen, three semantic theme variables will be added and
        wired into the real component.
      </div>
      <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:xl:grid-cols-2">
        {THEME_CARDS.map((card) => (
          <ThemeCard key={card.themeClass} {...card} />
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof InventoryStatusColorComparison> = {
  title: 'Design ideas/Inventory Status Colors (Comparison)',
  component: InventoryStatusColorComparison,
  // Custom comparison page; no autogenerated docs needed.
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof InventoryStatusColorComparison>;

export const Comparison: Story = {};
