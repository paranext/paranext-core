// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { beforeAll, describe, expect, test } from 'vitest';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/shadcn-ui/menubar';
import {
  Z_INDEX_ABOVE_DOCK,
  Z_INDEX_ABOVE_POPOVER,
  Z_INDEX_FIRST_RUN,
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
  Z_INDEX_OVERLAY,
  Z_INDEX_TOOLTIP,
} from './z-index';

// Radix measures its content on mount; jsdom ships neither ResizeObserver nor these methods.
class NoopResizeObserver implements ResizeObserver {
  // Keep an internal record of observed targets so the no-op methods touch `this` and don't
  // trip @typescript-eslint/class-methods-use-this. No test inspects this state.
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
});

// These assert ORDER, never specific numbers, so re-tiering the scale stays cheap while
// reordering it fails loudly. Each case names the UI that breaks when it is violated.
describe('z-index scale ordering', () => {
  test('modal content sits above its own backdrop', () => {
    expect(Z_INDEX_MODAL).toBeGreaterThan(Z_INDEX_MODAL_BACKDROP);
  });

  test('overlay content sits above modal content', () => {
    // A combobox or popover opened from inside a modal dialog must be usable.
    expect(Z_INDEX_ABOVE_DOCK).toBeGreaterThan(Z_INDEX_MODAL);
  });

  test('content portalled out of a popover sits above the popover layer', () => {
    // Radix portals a dropdown opened inside a popover to `document.body` instead of nesting it,
    // so the two are stacking siblings and PopoverContent's own tier competes directly with the
    // dropdown's. Losing this puts the footnote editor's note-type and caller dropdowns behind
    // the popover they belong to.
    expect(Z_INDEX_ABOVE_POPOVER).toBeGreaterThan(Z_INDEX_ABOVE_DOCK);
  });

  test('tooltips sit above every layer that can hold a tooltip trigger', () => {
    // A tooltip on a control inside a popover, select, context menu, or the menubar must be
    // readable — including one inside content portalled out of a popover, which is the highest
    // such layer. Nothing watched this ordering before, so raising a lower tier alone broke it
    // silently.
    expect(Z_INDEX_TOOLTIP).toBeGreaterThan(Z_INDEX_ABOVE_POPOVER);
  });

  test('the first-run gate sits above everything', () => {
    expect(Z_INDEX_FIRST_RUN).toBeGreaterThan(Z_INDEX_TOOLTIP);
  });
});

describe('the SCSS twin of the scale', () => {
  // `src/renderer/styles/_vars.scss` restates this scale for SCSS consumers and names this file as
  // canonical, but nothing kept them in agreement — so when Z_INDEX_ABOVE_DOCK was raised from 250
  // to 600 here, the SCSS copy stayed at 250 and the two disagreed for months. A drifted twin is
  // worse than a duplicated one: it makes the scale unreadable, because neither copy can be trusted
  // to say what a layer's value actually is.
  test('agrees with the TypeScript constants', async () => {
    const { readFile } = await import('node:fs/promises');
    const { fileURLToPath } = await import('node:url');
    const { dirname, resolve } = await import('node:path');
    // Anchored to this file rather than to cwd, which differs between a workspace-scoped run and a
    // repo-root one.
    const here = dirname(fileURLToPath(import.meta.url));
    const vars = await readFile(
      resolve(here, '../../../../src/renderer/styles/_vars.scss'),
      'utf8',
    );
    const scssValue = (name: string) => {
      const match = new RegExp(`\\$z-index--${name}:\\s*(\\d+)`).exec(vars);
      return match ? Number(match[1]) : undefined;
    };

    expect(scssValue('above-dock')).toBe(Z_INDEX_ABOVE_DOCK);
    expect(scssValue('above-popover')).toBe(Z_INDEX_ABOVE_POPOVER);
    expect(scssValue('overlay')).toBe(Z_INDEX_OVERLAY);
    expect(scssValue('modal-backdrop')).toBe(Z_INDEX_MODAL_BACKDROP);
    expect(scssValue('modal')).toBe(Z_INDEX_MODAL);
  });
});

describe('rendered stacking', () => {
  test('a tooltip inside a popover renders above it', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>
          <TooltipProvider>
            <Tooltip defaultOpen>
              <TooltipTrigger>hover me</TooltipTrigger>
              <TooltipContent>tip</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverContent>
      </Popover>,
    );

    const popover = document.querySelector<HTMLElement>('[data-slot="popover-content"]');
    const tooltip = document.querySelector<HTMLElement>('[data-slot="tooltip-content"]');
    // Assert both values are actually declared before comparing them. `Number('')` is 0, so a bare
    // `greaterThan` would keep passing as `675 > 0` if either component ever went back to setting
    // its stacking with a class instead of an inline style — the comparison would still be true and
    // would no longer be testing anything.
    expect(popover?.style.zIndex).toBe(String(Z_INDEX_ABOVE_DOCK));
    expect(tooltip?.style.zIndex).toBe(String(Z_INDEX_TOOLTIP));
    expect(Number(tooltip?.style.zIndex)).toBeGreaterThan(Number(popover?.style.zIndex));
  });

  test('the menubar declares a z-index on the overlay tier', () => {
    // The tooltip tier is documented as clearing "the menubar". At a stock z-class the menubar's
    // dropdown was two orders of magnitude below the tier it was described as belonging to, so it
    // rendered under any popover — and nothing here noticed.
    render(
      <Menubar defaultValue="file">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>one</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const menu = document.querySelector<HTMLElement>('[data-slot="menubar-content"]');
    expect(menu?.style.zIndex).toBe(String(Z_INDEX_ABOVE_DOCK));
  });

  test('a dropdown menu declares a z-index on the overlay tier', () => {
    // Without this the menu falls back to a stock z-class below the overlay tier, so it is
    // buried by any popover or dialog it is opened from.
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>one</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const menu = document.querySelector<HTMLElement>('[data-slot="dropdown-menu-content"]');
    expect(Number(menu?.style.zIndex)).toBeGreaterThanOrEqual(Z_INDEX_ABOVE_DOCK);
  });

  test('a caller can still override the dropdown menu z-index', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>menu</DropdownMenuTrigger>
        <DropdownMenuContent style={{ zIndex: 1234 }}>
          <DropdownMenuItem>one</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const menu = document.querySelector<HTMLElement>('[data-slot="dropdown-menu-content"]');
    expect(menu?.style.zIndex).toBe('1234');
  });
});
