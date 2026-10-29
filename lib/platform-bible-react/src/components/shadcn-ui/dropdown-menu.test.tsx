// @vitest-environment jsdom
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';

// jsdom doesn't ship a ResizeObserver, which Radix's Popper-positioned content instantiates on
// mount. A no-op stub is sufficient since the tests inspect presence, not layout. The
// hasPointerCapture / scrollIntoView shims are installed repo-wide by vitest.setup.ts.
class NoopResizeObserver implements ResizeObserver {
  // Touch `this` so the no-op methods don't trip @typescript-eslint/class-methods-use-this.
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

function blurWindow() {
  act(() => {
    window.dispatchEvent(new Event('blur'));
  });
}

describe('DropdownMenuContent window blur', () => {
  it('closes an open dropdown menu when the window blurs', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText('open'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    blurWindow();

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('closes the sub-menu and the root menu on one blur', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>more</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>nested item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText('open'));
    await screen.findByRole('menu');
    // jsdom has no PointerEvent, so open the sub-menu with the keyboard
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(screen.getAllByRole('menu')).toHaveLength(2));

    blurWindow();

    await waitFor(() => expect(screen.queryAllByRole('menu')).toHaveLength(0));
  });

  // Regression guard: passes without the blur wiring too, because it asserts the opt-out path.
  it('keeps a controlled menu without onOpenChange open', async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    blurWindow();

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});

describe('DropdownMenuContent focus after dismissal', () => {
  it('does not move focus back to the trigger after a window-blur dismissal', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText('open'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    // Focus leaves the document, as when the user clicks into another iframe. A modal menu's focus
    // trap pulls focus back from any other element in this document, so the focus is dropped instead.
    act(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });

    blurWindow();

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(document.activeElement).not.toBe(screen.getByText('open'));
  });

  it('returns focus to the trigger after Escape', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText('open'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(document.activeElement).toBe(screen.getByText('open'));
  });
});
