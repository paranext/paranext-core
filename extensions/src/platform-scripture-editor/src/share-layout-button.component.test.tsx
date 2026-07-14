// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ShareLayoutButton } from './share-layout-button.component';

// jsdom does not implement ResizeObserver; platform-bible-react's Tooltip wires ResizeObservers.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies runtime contract but not structural
    // typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
});

const { mockShowDialog, mockUsePromise } = vi.hoisted(() => ({
  mockShowDialog: vi.fn(),
  mockUsePromise: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  default: { dialogs: { showDialog: mockShowDialog } },
}));

vi.mock('@papi/frontend/react', () => ({
  useProjectDataProvider: vi.fn(),
}));

// Real Button/Tooltip/etc. still come from the actual module; only usePromise is mocked, mirroring
// the [value, isLoading] contract share-layout.dialog.tsx relies on for the same admin check.
vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('platform-bible-react')>();
  return { ...actual, usePromise: mockUsePromise };
});

const STRINGS = {
  '%webView_platformScriptureEditor_shareLayout_ariaLabel%': 'Share layout with team',
};

const LABEL = 'Share layout with team';

/** `usePromise` returns `[value, isLoading]`; `canShareLayout` is `undefined` while unresolved. */
function setPermission(canShareLayout: boolean | undefined, isLoading: boolean) {
  mockUsePromise.mockReturnValue([canShareLayout, isLoading]);
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('ShareLayoutButton', () => {
  it('renders nothing while the permission check is loading', () => {
    setPermission(undefined, true);
    const { container } = render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for a non-administrator', () => {
    setPermission(false, false);
    const { container } = render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the button with the localized aria-label for an administrator', () => {
    setPermission(true, false);
    render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.getByRole('button', { name: LABEL })).toBeInTheDocument();
  });

  it('opens the Share Layout dialog for the project on click', () => {
    setPermission(true, false);
    render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button', { name: LABEL }));
    expect(mockShowDialog).toHaveBeenCalledWith('platform.shareLayoutDialog', {
      projectId: 'p1',
      isModal: true,
    });
  });

  it('falls back to the key text when no localized string is provided', () => {
    setPermission(true, false);
    render(<ShareLayoutButton projectId="p1" />);
    expect(
      screen.getByRole('button', {
        name: '%webView_platformScriptureEditor_shareLayout_ariaLabel%',
      }),
    ).toBeInTheDocument();
  });
});
