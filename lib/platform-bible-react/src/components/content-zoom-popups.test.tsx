// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import { ContentZoomRoot } from '@/components/advanced/content-zoom-root.component';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

/** The zoom-area marker. The platform zooms every element that carries it. */
const ROOT = 'data-platform-content-zoom-root';
/** A pop-up flag the platform does not recognize; asserted absent so no pop-up carries it. */
const UNRECOGNIZED_POPUP_FLAG = 'data-platform-content-zoom-popup';
/** The custom property a scaled pop-up would carry. */
const POPUP_FACTOR = '--platform-content-zoom-popup-factor';

function content(slot: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
  if (!element) throw new Error(`no ${slot} rendered`);
  return element;
}

const popover = (
  <Popover defaultOpen>
    <PopoverTrigger>open</PopoverTrigger>
    <PopoverContent>body</PopoverContent>
  </Popover>
);
const menu = (
  <DropdownMenu defaultOpen>
    <DropdownMenuTrigger>menu</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>one</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
const tooltip = (
  <TooltipProvider>
    <Tooltip defaultOpen>
      <TooltipTrigger>hover me</TooltipTrigger>
      <TooltipContent>tip</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Radix measures its content on mount; jsdom ships no ResizeObserver.
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

afterEach(cleanup);

describe('pop-ups opened from zoomed content stay at interface scale', () => {
  test.each([
    ['popover-content', popover],
    ['dropdown-menu-content', menu],
    ['tooltip-content', tooltip],
  ])('%s inside a zoom area carries no zoom marker, flag or factor', (slot, ui) => {
    const { container } = render(<ContentZoomRoot area="footnotes">{ui}</ContentZoomRoot>);
    // Positive control: the pop-up really opened from inside a marked area.
    expect(container.firstElementChild?.getAttribute(ROOT)).toBe('footnotes');
    const element = content(slot);
    expect(element.hasAttribute(ROOT)).toBe(false);
    expect(element.hasAttribute(UNRECOGNIZED_POPUP_FLAG)).toBe(false);
    expect(element.style.getPropertyValue(POPUP_FACTOR)).toBe('');
    expect(element.className).not.toContain(POPUP_FACTOR);
    expect(element.style.minWidth).toBe('');
  });

  test('a tooltip inside a zoom area keeps its own 20rem width limit', () => {
    render(<ContentZoomRoot>{tooltip}</ContentZoomRoot>);
    expect(content('tooltip-content').className).toMatch(/(^|\s)tw:max-w-xs(\s|$)/);
  });

  test('a dropdown menu inside a zoom area keeps its own available-height cap', () => {
    render(<ContentZoomRoot>{menu}</ContentZoomRoot>);
    expect(content('dropdown-menu-content').className).toContain(
      'tw:max-h-(--radix-dropdown-menu-content-available-height)',
    );
  });

  test('a popover inside a zoom area is not turned into a scroll box', () => {
    render(<ContentZoomRoot>{popover}</ContentZoomRoot>);
    expect(content('popover-content').className).not.toContain('tw:overflow-y-auto');
  });

  test('the shared stacking tier is kept inside a zoom area', () => {
    render(<ContentZoomRoot>{popover}</ContentZoomRoot>);
    expect(content('popover-content').style.zIndex).not.toBe('');
  });
});
