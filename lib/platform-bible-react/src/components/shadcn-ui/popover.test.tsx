// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, beforeAll, describe, expect, it, test, vi } from 'vitest';
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

function PopoverUnderTest() {
  return (
    <Popover>
      <PopoverTrigger>Trigger</PopoverTrigger>
      <PopoverContent>Popover body</PopoverContent>
    </Popover>
  );
}

/**
 * Mirrors the ScopeSelector wiring: a host element captured by a ref callback and handed to the
 * provider, with the popover rendered inside. `container` starts null (before the host mounts) and
 * becomes the element on the second render, exactly as it does in the real consumer.
 */
function HostedPopover() {
  // React ref-callback state must be initialized to null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const [hostEl, setHostEl] = useState<HTMLDivElement | null>(null);
  return (
    <div data-testid="host" ref={setHostEl}>
      <PopoverPortalContainerProvider container={hostEl}>
        <PopoverUnderTest />
      </PopoverPortalContainerProvider>
    </div>
  );
}

async function openPopover() {
  await userEvent.click(screen.getByText('Trigger'));
  return waitFor(() => {
    const content = document.querySelector<HTMLElement>('[data-slot="popover-content"]');
    if (!content) throw new Error('popover content did not open');
    return content;
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// Pins the popover half of the shared portal-container factory. Both primitives build their own
// context from `createPortalContainerContext`, so a regression there would otherwise only be caught
// by the tooltip tests.
describe('PopoverContent portal target', () => {
  test('portals to document.body when no PopoverPortalContainerProvider is in scope', async () => {
    render(<PopoverUnderTest />);
    const popover = await openPopover();

    expect(document.body).toContainElement(popover);
    expect(screen.getByText('Trigger').parentElement).not.toContainElement(popover);
  });

  // Without this, a popover whose trigger sits inside a focus trap or dismiss layer (a Dialog, a
  // modal DropdownMenu) has its content mounted outside that subtree — the trap pulls focus back
  // out, and a click inside the popover reads as an outside click that dismisses the parent.
  test('portals into the provider container so it stays inside that ancestor', async () => {
    render(<HostedPopover />);
    const popover = await openPopover();

    expect(screen.getByTestId('host')).toContainElement(popover);
  });
});

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

  // jsdom has no exit animation, so this covers "blur after close is a no-op", not the animated
  // closing window.
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
          <DialogContent aria-describedby={undefined}>
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
          <DialogContent ref={setDialogElement} aria-describedby={undefined}>
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

  /** A modal popover (like the book and chapter pickers) portalled into a dialog's content. */
  function ModalPopoverInDialog() {
    // React's ref callback API hands over null when the element unmounts
    // eslint-disable-next-line no-null/no-null
    const [dialogElement, setDialogElement] = useState<HTMLDivElement | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent ref={setDialogElement} aria-describedby={undefined}>
          <DialogTitle>dialog title</DialogTitle>
          <PopoverPortalContainerProvider container={dialogElement}>
            <Popover modal>
              <PopoverTrigger>open</PopoverTrigger>
              <PopoverContent>
                <input aria-label="search" />
              </PopoverContent>
            </Popover>
          </PopoverPortalContainerProvider>
        </DialogContent>
      </Dialog>
    );
  }

  function getDialogContent() {
    const dialogContent = document.querySelector<HTMLElement>('[data-slot="dialog-content"]');
    if (!dialogContent) throw new Error('dialog content is not mounted');
    return dialogContent;
  }

  /** Lets FocusScope's MutationObserver callback and its zero-delay unmount timer run. */
  async function flushFocusScope() {
    await act(async () => {});
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  it('leaves the dialog unfocused when a nested popover closes while its web view is unfocused', async () => {
    // A web view's `top` is its host window, not itself; the hook reads it once, on mount
    vi.stubGlobal('top', {});
    render(<ModalPopoverInDialog />);
    const dialogElement = getDialogContent();
    fireEvent.click(await screen.findByText('open'));
    // Awaited so Radix's outside-press listener, registered a tick after mount, is in place
    const search = await screen.findByLabelText('search');
    act(() => search.focus());
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus');

    // The user clicked into another frame: this document no longer has focus
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    blurWindow();

    await waitFor(() => expect(screen.queryByLabelText('search')).not.toBeInTheDocument());
    await flushFocusScope();
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
    // A focus() inside an unfocused iframe would pull the frame's focus back from the other frame
    expect(
      focusSpy.mock.contexts.filter(
        (element) => element instanceof Node && dialogElement.contains(element),
      ),
    ).toEqual([]);
    expect(document.activeElement).not.toBe(dialogElement);
  });

  it("keeps the trap's container focus when the document has focus", async () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    render(<ModalPopoverInDialog />);
    const dialogElement = getDialogContent();
    fireEvent.click(await screen.findByText('open'));
    const search = await screen.findByLabelText('search');
    act(() => search.focus());
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus');

    fireEvent.keyDown(search, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByLabelText('search')).not.toBeInTheDocument());
    await flushFocusScope();
    // Radix's trap focuses its container when the focused node is removed; harmless while the
    // document keeps frame focus, so it stays in place there
    expect(focusSpy.mock.contexts).toContain(dialogElement);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('a trap that mounts while the document is unfocused still focuses its content', async () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    render(
      <Dialog open>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>t</DialogTitle>
          <input aria-label="first" />
        </DialogContent>
      </Dialog>,
    );

    await waitFor(() => expect(document.activeElement).not.toBe(document.body));
    expect(getDialogContent().contains(document.activeElement)).toBe(true);
  });
});

describe('PopoverContent focus after dismissal', () => {
  it('does not move focus back to the trigger after a window-blur dismissal', async () => {
    // A web view's `top` is its host window, not itself; the hook reads it once, on mount
    vi.stubGlobal('top', {});
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Popover modal>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>body</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByText('open'));
    expect(await screen.findByText('body')).toBeInTheDocument();
    // Focus leaves the document, as when the user clicks into another iframe. A modal popover's
    // focus trap pulls focus back from any other element in this document, so the focus is dropped
    // instead.
    act(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });

    // A window blur in a real browser means the document no longer has focus
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    blurWindow();

    await waitFor(() => expect(screen.queryByText('body')).not.toBeInTheDocument());
    // Let FocusScope's own zero-delay close-auto-focus timer run before asserting
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(document.activeElement).not.toBe(screen.getByText('open'));
  });

  it('returns focus to the trigger of a non-modal popover after an alt-tab close in the main document', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Popover>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>body</PopoverContent>
      </Popover>,
    );
    const trigger = screen.getByText('open');
    await user.click(trigger);
    expect(await screen.findByText('body')).toBeInTheDocument();
    expect(document.activeElement).not.toBe(trigger);

    // The OS window was deactivated: the main document no longer has focus
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    blurWindow();

    await waitFor(() => expect(screen.queryByText('body')).not.toBeInTheDocument());
    // Let FocusScope's own zero-delay close-auto-focus timer run before asserting
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(screen.getByText('open')).toHaveFocus();
  });

  it('returns focus to the trigger after Escape', async () => {
    // jsdom reports no document focus by default; a browser tab the user is working in has it
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
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

    await waitFor(() => expect(screen.queryByText('body')).not.toBeInTheDocument());
    expect(document.activeElement).toBe(screen.getByText('open'));
  });
});
