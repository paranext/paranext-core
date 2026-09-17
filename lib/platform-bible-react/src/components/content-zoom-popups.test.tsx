// @vitest-environment jsdom
import type { CSSProperties } from 'react';
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

const ROOT = 'data-platform-content-zoom-root';
const POPUP = 'data-platform-content-zoom-popup';
const FACTOR = '--platform-content-zoom-popup-factor';

function content(slot: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
  if (!element) throw new Error(`no ${slot} rendered`);
  return element;
}

const popover = (className?: string, style?: CSSProperties) => (
  <Popover defaultOpen>
    <PopoverTrigger>open</PopoverTrigger>
    <PopoverContent className={className} style={style}>
      body
    </PopoverContent>
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

afterEach(cleanup);

describe('pop-ups opened from zoomed content', () => {
  test.each([
    [
      'popover-content',
      popover(),
      'tw:max-w-[calc(var(--radix-popover-content-available-width)/var(--platform-content-zoom-popup-factor,1))]',
    ],
    [
      'dropdown-menu-content',
      menu,
      'tw:max-h-[calc(var(--radix-dropdown-menu-content-available-height)/var(--platform-content-zoom-popup-factor,1))]',
    ],
    [
      'tooltip-content',
      tooltip,
      'tw:max-w-[min(20rem,calc(var(--radix-tooltip-content-available-width)/var(--platform-content-zoom-popup-factor,1)))]',
    ],
  ])('%s outside every area renders as before', (slot, ui, zoomedClass) => {
    render(ui);
    const element = content(slot);
    expect(element.hasAttribute(ROOT)).toBe(false);
    expect(element.hasAttribute(POPUP)).toBe(false);
    expect(element.style.getPropertyValue(FACTOR)).toBe('');
    expect(element.className).not.toContain(zoomedClass);
  });

  test.each([
    [
      'popover-content',
      popover(),
      [
        'tw:max-w-[calc(var(--radix-popover-content-available-width)/var(--platform-content-zoom-popup-factor,1))]',
      ],
    ],
    [
      'dropdown-menu-content',
      menu,
      [
        'tw:max-h-[calc(var(--radix-dropdown-menu-content-available-height)/var(--platform-content-zoom-popup-factor,1))]',
        'tw:max-w-[calc(var(--radix-dropdown-menu-content-available-width)/var(--platform-content-zoom-popup-factor,1))]',
      ],
    ],
    [
      'tooltip-content',
      tooltip,
      [
        'tw:max-w-[min(20rem,calc(var(--radix-tooltip-content-available-width)/var(--platform-content-zoom-popup-factor,1)))]',
      ],
    ],
  ])('%s inside the main area follows that area', (slot, ui, zoomedClasses) => {
    render(<ContentZoomRoot>{ui}</ContentZoomRoot>);
    const element = content(slot);
    expect(element.getAttribute(ROOT)).toBe('');
    expect(element.getAttribute(POPUP)).toBe('');
    expect(element.style.getPropertyValue(FACTOR)).toBe(
      'var(--platform-content-zoom-main, var(--platform-content-zoom-default, 1))',
    );
    zoomedClasses.forEach((zoomedClass) => expect(element.className).toContain(zoomedClass));
    // Portaled out of the area element, so the platform sees a separate marker, not a nested one.
    expect(element.closest(`[${ROOT}]:not([${POPUP}])`)).toBeNull();
  });

  test('a named area reaches the pop-up', () => {
    render(<ContentZoomRoot area="footnotes">{popover()}</ContentZoomRoot>);
    const element = content('popover-content');
    expect(element.getAttribute(ROOT)).toBe('footnotes');
    expect(element.style.getPropertyValue(FACTOR)).toBe(
      'var(--platform-content-zoom-footnotes, var(--platform-content-zoom-default, 1))',
    );
  });

  test('the zoomed width cap replaces the tooltip’s own max width and the menu’s own max height', () => {
    render(<ContentZoomRoot>{tooltip}</ContentZoomRoot>);
    expect(content('tooltip-content').className).not.toMatch(/(^|\s)tw:max-w-xs(\s|$)/);
    cleanup();
    render(<ContentZoomRoot>{menu}</ContentZoomRoot>);
    expect(content('dropdown-menu-content').className).not.toContain(
      'tw:max-h-(--radix-dropdown-menu-content-available-height)',
    );
  });

  test('a caller’s own size class and inline max width still win', () => {
    render(<ContentZoomRoot>{popover('tw:max-w-sm', { maxWidth: '123px' })}</ContentZoomRoot>);
    const element = content('popover-content');
    expect(element.className).toContain('tw:max-w-sm');
    expect(element.className).not.toContain('--radix-popover-content-available-width');
    expect(element.style.maxWidth).toBe('123px');
    expect(element.getAttribute(ROOT)).toBe('');
  });

  test('the shared stacking tier is kept inside an area', () => {
    render(<ContentZoomRoot>{popover()}</ContentZoomRoot>);
    expect(content('popover-content').style.zIndex).not.toBe('');
  });
});
