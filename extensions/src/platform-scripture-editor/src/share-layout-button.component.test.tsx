// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { CanShareLayoutWithTeam } from './use-can-share-layout-with-team.hook';
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

const { mockShowDialog } = vi.hoisted(() => ({ mockShowDialog: vi.fn() }));

vi.mock('@papi/frontend', () => ({
  default: { dialogs: { showDialog: mockShowDialog } },
}));

// Mutable mock return; each test sets the fields it cares about.
const mockState: CanShareLayoutWithTeam = { canShareLayout: false, isLoading: true };

vi.mock('./use-can-share-layout-with-team.hook', () => ({
  useCanShareLayoutWithTeam: () => mockState,
}));

const STRINGS = {
  '%webView_platformScriptureEditor_shareLayout_ariaLabel%': 'Share layout with team',
};

const LABEL = 'Share layout with team';

function setState(next: Partial<CanShareLayoutWithTeam>) {
  Object.assign(mockState, next);
}

afterEach(() => {
  vi.clearAllMocks();
  setState({ canShareLayout: false, isLoading: true });
});

describe('ShareLayoutButton', () => {
  it('renders nothing while the permission check is loading', () => {
    setState({ canShareLayout: false, isLoading: true });
    const { container } = render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for a non-administrator', () => {
    setState({ canShareLayout: false, isLoading: false });
    const { container } = render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the button with the localized aria-label for an administrator', () => {
    setState({ canShareLayout: true, isLoading: false });
    render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.getByRole('button', { name: LABEL })).toBeInTheDocument();
  });

  it('opens the Share Layout dialog for the project on click', () => {
    setState({ canShareLayout: true, isLoading: false });
    render(<ShareLayoutButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button', { name: LABEL }));
    expect(mockShowDialog).toHaveBeenCalledWith('platform.shareLayoutDialog', {
      projectId: 'p1',
      isModal: true,
    });
  });

  it('falls back to the key text when no localized string is provided', () => {
    setState({ canShareLayout: true, isLoading: false });
    render(<ShareLayoutButton projectId="p1" />);
    expect(
      screen.getByRole('button', {
        name: '%webView_platformScriptureEditor_shareLayout_ariaLabel%',
      }),
    ).toBeInTheDocument();
  });
});
