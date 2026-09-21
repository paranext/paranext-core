// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { StructureProtectionState } from './use-structure-protection-state.hook';
import { StructureProtectionButton } from './structure-protection-button.component';

// jsdom does not implement ResizeObserver; platform-bible-react's Tooltip wires ResizeObservers.
// A no-op stub keeps the render path from throwing.
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

// Mutable mock return; each test sets the fields it cares about.
const mockState: StructureProtectionState = {
  isStructureProtected: true,
  isProtectedByAdmin: false,
  adminSettingError: undefined,
  canAdminToggle: false,
  isProtectionActive: true,
  setUserProtection: vi.fn(),
};

vi.mock('./use-structure-protection-state.hook', () => ({
  useStructureProtectionState: () => mockState,
}));

const STRINGS = {
  '%webView_platformScriptureEditor_structureProtection_lockedByAdmin%':
    'Structure locked by admin',
  '%webView_platformScriptureEditor_structureProtection_ariaLabel%': 'Toggle structure protection',
  '%webView_platformScriptureEditor_structureProtection_errorLoading%':
    'Structure protection state unavailable',
  '%webView_platformScriptureEditor_structureProtection_stateEditable%': 'USFM structure editable',
  '%webView_platformScriptureEditor_structureProtection_stateProtected%':
    'USFM structure protected',
};

const PERSONAL = 'Toggle structure protection';
const PROJECT = 'Toggle structure lock for project';

// A minimal PlatformError stand-in; the component only checks `adminSettingError !== undefined`.
// Cast through unknown because the object literal does not structurally satisfy PlatformError.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const ADMIN_ERROR = { platformErrorVersion: 1, message: 'load failed' } as unknown as NonNullable<
  StructureProtectionState['adminSettingError']
>;

function setState(next: Partial<StructureProtectionState>) {
  Object.assign(mockState, next);
}

afterEach(() => {
  vi.clearAllMocks();
  setState({
    isStructureProtected: true,
    isProtectedByAdmin: false,
    canAdminToggle: false,
    adminSettingError: undefined,
    isProtectionActive: true,
  });
});

describe('StructureProtectionButton — personal button', () => {
  it('renders Lock (not LockOpen) and ghost variant when protected', () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const button = screen.getByRole('button', { name: PERSONAL });
    expect(button.querySelector('.lucide-lock')).toBeInTheDocument();
    expect(button.querySelector('.lucide-lock-open')).not.toBeInTheDocument();
    expect(button.className).not.toContain('tw:text-destructive');
    expect(button).toBeEnabled();
  });

  it('renders LockOpen and destructive variant when unlocked', () => {
    setState({ isStructureProtected: false, canAdminToggle: false, isProtectedByAdmin: false });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const button = screen.getByRole('button', { name: PERSONAL });
    expect(button.querySelector('.lucide-lock-open')).toBeInTheDocument();
    expect(button.querySelector('.lucide-lock')).not.toBeInTheDocument();
    expect(button.className).toContain('tw:text-destructive');
  });

  it('uses the localized personal aria-label', () => {
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.getByRole('button', { name: PERSONAL })).toBeInTheDocument();
  });

  it('toggles only the user setting (never the admin setting)', () => {
    setState({ canAdminToggle: false, isProtectedByAdmin: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button', { name: PERSONAL }));
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
  });

  it('admin click on the personal button toggles only the user setting', () => {
    setState({ canAdminToggle: true, isProtectedByAdmin: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button', { name: PERSONAL }));
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
  });

  it('is disabled and a no-op for a non-admin on an admin-locked project', () => {
    setState({ canAdminToggle: false, isProtectedByAdmin: true, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const button = screen.getByRole('button', { name: PERSONAL });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('is disabled with the error tooltip when the admin setting failed to load', () => {
    setState({ canAdminToggle: false, isProtectedByAdmin: false, adminSettingError: ADMIN_ERROR });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const button = screen.getByRole('button', { name: PERSONAL });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('Ctrl+Shift+L toggles the personal user setting when enabled', () => {
    setState({ canAdminToggle: false, isProtectedByAdmin: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true });
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
  });

  it('Ctrl+Shift+L is a no-op when the personal button is disabled', () => {
    setState({ canAdminToggle: false, isProtectedByAdmin: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true });
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('does NOT fire the personal toggle on the admin combo (Ctrl+Alt+Shift+L)', () => {
    setState({ canAdminToggle: false, isProtectedByAdmin: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, altKey: true, shiftKey: true });
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('auto-opens the tooltip reporting the new current state when the state changes', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('USFM structure editable')).not.toBeInTheDocument();
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('USFM structure editable')).length).toBeGreaterThan(0);
  });

  // A state change opens this tooltip, not a hover, so there may be no pointer on the button and
  // no focus in it — and then none of Radix's dismissal paths can fire. While a modal covers this
  // web view's iframe, click-away and Escape cannot fire either, so without a timer the tooltip
  // stays on screen indefinitely over whatever opened the modal.
  it('dismisses an auto-opened tooltip on its own, with no pointer or focus on the button', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
      const { rerender } = render(
        <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
      );
      setState({ isStructureProtected: false });
      rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
      expect((await screen.findAllByText('USFM structure editable')).length).toBeGreaterThan(0);

      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      await waitFor(() =>
        expect(screen.queryByText('USFM structure editable')).not.toBeInTheDocument(),
      );
    } finally {
      vi.useRealTimers();
    }
  });

  // WCAG 1.4.13 (Content on Hover or Focus) requires hover content to stay visible until the
  // pointer moves away — and here it could not come back if it did not: Radix gates its
  // pointer-move open to once per hover session, so a tooltip dismissed under a stationary pointer
  // stays gone. This tooltip is also the only place the lock state is stated, since the aria-label
  // is the constant "Toggle structure protection".
  it('keeps a hover-opened tooltip up while the pointer is still on the button', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
      render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);

      const button = screen.getByRole('button', { name: 'Toggle structure protection' });
      await act(async () => {
        fireEvent.pointerMove(button, { pointerType: 'mouse' });
      });
      expect((await screen.findAllByText('USFM structure protected')).length).toBeGreaterThan(0);

      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      // The auto-dismiss timer is scoped to auto-opens; a hover is not one.
      expect(screen.getAllByText('USFM structure protected').length).toBeGreaterThan(0);
    } finally {
      vi.useRealTimers();
    }
  });

  // The accessible name is a constant, and the tooltip carrying the state is not a live region — so
  // without `aria-pressed` a screen-reader user pressing Ctrl+Shift+L is told nothing at all.
  it('reports the lock state through aria-pressed in both states', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );

    expect(screen.getByRole('button', { name: 'Toggle structure protection' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);

    expect(screen.getByRole('button', { name: 'Toggle structure protection' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  // A reader must be able to tell locked from unlocked without inferring it from an action verb.
  // Both states are asserted, since a tooltip that reports one state but names the action in the
  // other still leaves the state ambiguous.
  it('reports the protected state in the tooltip, not the action a click would take', async () => {
    setState({ isStructureProtected: false, canAdminToggle: false, isProtectedByAdmin: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    setState({ isStructureProtected: true });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('USFM structure protected')).length).toBeGreaterThan(0);
    expect(screen.queryByText('Lock structure')).not.toBeInTheDocument();
    expect(screen.queryByText('Unlock structure')).not.toBeInTheDocument();
  });

  it('shows the Ctrl+Shift+L hint in the tooltip when enabled', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('Ctrl+Shift+L')).not.toBeInTheDocument();
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Ctrl+Shift+L')).length).toBeGreaterThan(0);
  });

  it('auto-opens the "locked by admin" tooltip when an admin locks an already-protected project', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('Structure locked by admin')).not.toBeInTheDocument();
    setState({ isProtectedByAdmin: true });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Structure locked by admin')).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: PERSONAL })).toBeDisabled();
  });

  it('does not auto-open the tooltip on a re-render with no state change', () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.queryByText('USFM structure protected')).not.toBeInTheDocument();
  });

  it('closes the tooltip on scroll', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isProtectedByAdmin: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('USFM structure editable')).length).toBeGreaterThan(0);
    fireEvent.scroll(document.body);
    await waitFor(() =>
      expect(screen.queryByText('USFM structure editable')).not.toBeInTheDocument(),
    );
  });
});

describe('StructureProtectionButton — no team lock', () => {
  // The team-wide lock lives in the Team layout dialog, staged with the rest of the layout and
  // written on save. The toolbar carries only the personal toggle, for every role.
  it.each([true, false])('renders no team lock for canAdminToggle=%s', (canAdminToggle) => {
    setState({ canAdminToggle, isProtectedByAdmin: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);

    expect(screen.queryByRole('button', { name: PROJECT })).not.toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button', { name: PERSONAL })).toBeInTheDocument();
  });

  // The admin lock still governs what a non-admin may do; only the control for setting it moved.
  it('still disables the personal toggle for a non-admin while the team lock is on', () => {
    setState({ canAdminToggle: false, isProtectedByAdmin: true, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);

    expect(screen.getByRole('button', { name: PERSONAL })).toBeDisabled();
  });

  it('does not bind the admin shortcut to anything', () => {
    setState({ canAdminToggle: true, isProtectedByAdmin: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);

    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true, altKey: true });

    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });
});

describe('StructureProtectionButton — power mode', () => {
  it('renders nothing when protection is inactive', () => {
    setState({
      isProtectionActive: false,
      canAdminToggle: true,
      isProtectedByAdmin: true,
      isStructureProtected: true,
    });
    const { container } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole('button', { name: PERSONAL })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: PROJECT })).not.toBeInTheDocument();
  });
});
