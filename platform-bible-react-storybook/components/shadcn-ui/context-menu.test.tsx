// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/shadcn-ui/context-menu';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';

// jsdom doesn't ship a ResizeObserver, which Radix's Popper-positioned ContextMenu content
// instantiates on mount. A no-op stub is sufficient since the test inspects style, not layout.
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
  if (typeof Element.prototype.hasPointerCapture !== 'function') {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

describe('ContextMenuContent', () => {
  // Regression test for PT-3877: the tab header context menu ("Open as floating tab") rendered
  // behind floating tab groups because ContextMenuContent inherited Tailwind `tw:z-50`, while
  // rc-dock floating panels render at z-index ~200. The content must declare a z-index above the
  // dock (matching the existing Popover fix) so it is never occluded.
  it('renders with a z-index above the dock so floating tab groups cannot occlude it', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Tab header</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open as floating tab</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText('Tab header'));

    const content = screen.getByRole('menu');
    expect(Number(content.style.zIndex)).toBeGreaterThanOrEqual(Z_INDEX_ABOVE_DOCK);
  });

  // Submenus (e.g. the dictionary copy submenu in platform-enhanced-resources) must sit on the
  // same above-dock layer as their parent, or they would be occluded by the dock / render behind
  // the parent menu once the parent was raised.
  it('renders submenu content with a z-index above the dock', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Tab header</ContextMenuTrigger>
        <ContextMenuContent>
          {/* forceMount so the submenu content is in the DOM without relying on jsdom layout/hover */}
          <ContextMenuSub>
            <ContextMenuSubTrigger>Copy as</ContextMenuSubTrigger>
            <ContextMenuSubContent forceMount>
              <ContextMenuItem>Surface form</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText('Tab header'));

    const subContent = screen
      .getAllByRole('menu', { hidden: true })
      .find((menu) => menu.dataset.slot === 'context-menu-sub-content');
    expect(subContent).toBeDefined();
    expect(Number(subContent?.style.zIndex)).toBeGreaterThanOrEqual(Z_INDEX_ABOVE_DOCK);
  });
});
