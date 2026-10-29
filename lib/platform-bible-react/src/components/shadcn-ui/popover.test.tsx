// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/shadcn-ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverPortalContainerProvider,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';

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

describe('PopoverContent window blur', () => {
  it('closes an open popover when the window blurs', async () => {
    render(
      <Popover>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>body</PopoverContent>
      </Popover>,
    );
    fireEvent.click(screen.getByText('open'));
    expect(await screen.findByText('body')).toBeInTheDocument();

    blurWindow();

    await waitFor(() => expect(screen.queryByText('body')).not.toBeInTheDocument());
  });

  // Regression guard: passes without the blur wiring too, because it asserts the opt-out path.
  it('keeps a popover open that prevents outside presses', async () => {
    render(
      <Popover>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent onPointerDownOutside={(event) => event.preventDefault()}>
          body
        </PopoverContent>
      </Popover>,
    );
    fireEvent.click(screen.getByText('open'));
    expect(await screen.findByText('body')).toBeInTheDocument();

    blurWindow();

    expect(screen.getByText('body')).toBeInTheDocument();
  });

  // Regression guard: passes without the blur wiring too, because it asserts the opt-out path.
  it('keeps a controlled popover without onOpenChange open', async () => {
    render(
      <Popover open>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>body</PopoverContent>
      </Popover>,
    );
    expect(await screen.findByText('body')).toBeInTheDocument();

    blurWindow();

    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('does not reopen when blur fires while closing, and the trigger still reopens it', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Popover>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>body</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByText('open'));
    expect(await screen.findByText('body')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    blurWindow();

    await waitFor(() => expect(screen.queryByText('body')).not.toBeInTheDocument());
    expect(consoleError).not.toHaveBeenCalled();

    await user.click(screen.getByText('open'));
    expect(await screen.findByText('body')).toBeInTheDocument();
    consoleError.mockRestore();
  });

  it('ignores window blur for a closed popover, leaving an open dialog alone', async () => {
    const handleOpenChange = vi.fn();
    render(
      <>
        <Popover>
          <PopoverTrigger>open</PopoverTrigger>
          <PopoverContent>body</PopoverContent>
        </Popover>
        <Dialog open onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogTitle>dialog title</DialogTitle>
          </DialogContent>
        </Dialog>
      </>,
    );
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    blurWindow();

    expect(handleOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes a popover inside a dialog but leaves the dialog open', async () => {
    function Host() {
      // React's ref callback API hands over null when the element unmounts
      // eslint-disable-next-line no-null/no-null
      const [dialogElement, setDialogElement] = useState<HTMLDivElement | null>(null);
      const [isDialogOpen, setIsDialogOpen] = useState(true);
      return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent ref={setDialogElement}>
            <DialogTitle>dialog title</DialogTitle>
            <PopoverPortalContainerProvider container={dialogElement}>
              <Popover>
                <PopoverTrigger>open</PopoverTrigger>
                <PopoverContent>body</PopoverContent>
              </Popover>
            </PopoverPortalContainerProvider>
          </DialogContent>
        </Dialog>
      );
    }
    render(<Host />);
    fireEvent.click(await screen.findByText('open'));
    expect(await screen.findByText('body')).toBeInTheDocument();

    blurWindow();

    await waitFor(() => expect(screen.queryByText('body')).not.toBeInTheDocument());
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
