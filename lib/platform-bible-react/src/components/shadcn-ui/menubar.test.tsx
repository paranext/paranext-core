// @vitest-environment jsdom
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/shadcn-ui/menubar';

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

describe('MenubarContent window blur', () => {
  it('closes an open menubar menu when the window blurs', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>file</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>item</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    await user.click(screen.getByText('file'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    blurWindow();

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('keeps a menu open that prevents outside presses', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>file</MenubarTrigger>
          <MenubarContent onPointerDownOutside={(event) => event.preventDefault()}>
            <MenubarItem>item</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    await user.click(screen.getByText('file'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    blurWindow();

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
