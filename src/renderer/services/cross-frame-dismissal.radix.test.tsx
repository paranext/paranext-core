import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { DropdownMenu, Popover } from 'radix-ui';
import { Unsubscriber } from 'platform-bible-utils';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { registerFrameForCrossFrameDismissal } from '@renderer/services/cross-frame-dismissal.util';

/** Jsdom has no `PointerEvent`; Electron's Chromium does. Radix reads `pointerType` and `button`. */
class TestPointerEvent extends MouseEvent {
  readonly pointerType: string;

  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? '';
  }
}

/** Radix attaches its outside-press listener one task after the surface mounts */
async function waitForOutsidePressListener() {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });
}

describe('cross-frame dismissal of real Radix surfaces in the main document', () => {
  let webViewBody: HTMLElement;
  let unsubscribers: Unsubscriber[];

  beforeAll(() => {
    vi.stubGlobal('PointerEvent', TestPointerEvent);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    if (!iframe.contentWindow) throw new Error('jsdom did not create the iframe window');
    webViewBody = iframe.contentWindow.document.body;
    unsubscribers = [
      registerFrameForCrossFrameDismissal(window),
      registerFrameForCrossFrameDismissal(iframe.contentWindow),
    ];
  });

  afterEach(() => {
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  });

  function pressInWebView() {
    act(() => {
      webViewBody.dispatchEvent(
        new TestPointerEvent('pointerdown', { bubbles: true, button: 0, pointerType: 'mouse' }),
      );
    });
  }

  it('closes a modal dropdown menu without focusing its trigger again', async () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Tab menu</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Close tab</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>,
    );
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await waitForOutsidePressListener();

    pressInWebView();

    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    // Radix restores focus a task after the content unmounts
    await waitForOutsidePressListener();
    expect(screen.getByRole('button', { name: 'Tab menu' })).not.toHaveFocus();
  });

  it('closes a non-modal popover', async () => {
    render(
      <Popover.Root defaultOpen modal={false}>
        <Popover.Trigger>Book and chapter</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content>Book list</Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );
    expect(screen.getByText('Book list')).toBeInTheDocument();
    await waitForOutsidePressListener();

    pressInWebView();

    await waitFor(() => expect(screen.queryByText('Book list')).not.toBeInTheDocument());
  });

  it('keeps open a popover that opts out of outside-press dismissal', async () => {
    render(
      <Popover.Root defaultOpen modal={false}>
        <Popover.Trigger>Comment</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content onInteractOutside={(event) => event.preventDefault()}>
            Comment editor
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );
    await waitForOutsidePressListener();

    pressInWebView();
    await waitForOutsidePressListener();

    expect(screen.getByText('Comment editor')).toBeInTheDocument();
  });
});
