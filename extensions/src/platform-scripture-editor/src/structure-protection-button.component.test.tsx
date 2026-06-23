// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { StructureProtectionState } from './use-structure-protection-state.hook';
import { StructureProtectionButton } from './structure-protection-button.component';

// jsdom does not implement ResizeObserver; platform-bible-react's Tooltip + other components wire
// ResizeObservers. A no-op stub keeps the render path from throwing.
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
  isAdminProtected: false,
  canAdminToggle: true,
  setAdminProtection: vi.fn(),
  setUserProtection: vi.fn(),
};

vi.mock('./use-structure-protection-state.hook', () => ({
  useStructureProtectionState: () => mockState,
}));

const STRINGS = {
  '%webView_platformScriptureEditor_structureProtection_protected%': 'Structure protected',
  '%webView_platformScriptureEditor_structureProtection_editable%': 'Structure editable',
  '%webView_platformScriptureEditor_structureProtection_lockedByAdmin%':
    'Structure locked by admin',
  '%webView_platformScriptureEditor_structureProtection_ariaLabel%': 'Toggle structure protection',
};

function setState(next: Partial<StructureProtectionState>) {
  Object.assign(mockState, next);
}

afterEach(() => {
  vi.clearAllMocks();
  setState({ isStructureProtected: true, isAdminProtected: false, canAdminToggle: true });
});

describe('StructureProtectionButton', () => {
  it('renders ShieldCheck (not ShieldOff) and is enabled when protected', () => {
    setState({ isStructureProtected: true, canAdminToggle: true, isAdminProtected: false });
    const { container } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    // lucide-react@1.8.0 renders `lucide-<kebab-icon-name>` on the svg.
    expect(container.querySelector('.lucide-shield-check')).toBeInTheDocument();
    expect(container.querySelector('.lucide-shield-off')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('renders ShieldOff when editable', () => {
    setState({ isStructureProtected: false, canAdminToggle: true, isAdminProtected: false });
    const { container } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(container.querySelector('.lucide-shield-off')).toBeInTheDocument();
    expect(container.querySelector('.lucide-shield-check')).not.toBeInTheDocument();
  });

  it('uses the localized aria-label', () => {
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.getByRole('button', { name: 'Toggle structure protection' })).toBeInTheDocument();
  });

  it('admin click toggles both the project and user settings to the new effective state', () => {
    // Admin, currently protected (isStructureProtected drives the icon) -> click unlocks both settings so the
    // admin's own icon flips and the team-wide lock is lifted in one action.
    setState({ canAdminToggle: true, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockState.setAdminProtection).toHaveBeenCalledWith(false);
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
  });

  it('non-admin click on an unlocked project toggles the user setting', () => {
    setState({ canAdminToggle: false, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('non-admin on an admin-locked project is disabled and does not toggle', () => {
    setState({ canAdminToggle: false, isAdminProtected: true, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('auto-opens the tooltip when the protection state changes', async () => {
    setState({ isStructureProtected: true, canAdminToggle: true, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    // Controlled tooltip starts closed, so its content is not rendered on mount.
    expect(screen.queryByText('Structure editable')).not.toBeInTheDocument();
    // Flip to editable; the useEffect should open the tooltip on the change.
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Structure editable')).length).toBeGreaterThan(0);
  });

  it('shows the keyboard shortcut hint in the tooltip when enabled', async () => {
    // The controlled tooltip starts closed; flip the protection state to auto-open it (same
    // mechanism as the auto-open test) so the tooltip content renders. jsdom's userAgent is not
    // Macintosh, so the non-mac hint is expected.
    setState({ isStructureProtected: true, canAdminToggle: true, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('Ctrl+Shift+L')).not.toBeInTheDocument();
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Ctrl+Shift+L')).length).toBeGreaterThan(0);
  });

  it('auto-opens the tooltip when an admin locks an already-protected project', async () => {
    // Non-admin, already protected: isStructureProtected stays true, but the admin lock disables the button
    // and changes the tooltip to "locked by admin" — a visible change that must surface the tooltip.
    setState({ isStructureProtected: true, canAdminToggle: false, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('Structure locked by admin')).not.toBeInTheDocument();
    setState({ isAdminProtected: true });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Structure locked by admin')).length).toBeGreaterThan(0);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not auto-open the tooltip on a re-render with no state change', () => {
    setState({ isStructureProtected: true, canAdminToggle: true, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.queryByText('Structure protected')).not.toBeInTheDocument();
  });

  it('Ctrl+Shift+L triggers the toggle when enabled', () => {
    setState({ canAdminToggle: true, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true });
    expect(mockState.setAdminProtection).toHaveBeenCalledWith(false);
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
  });

  it('Ctrl+Shift+L is a no-op when the button is disabled (non-admin + admin-locked)', () => {
    setState({ canAdminToggle: false, isAdminProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true });
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('closes the tooltip on scroll', async () => {
    setState({ isStructureProtected: true, canAdminToggle: true, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    // Transition to auto-open the tooltip.
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Structure editable')).length).toBeGreaterThan(0);
    // Scrolling anything should close it via the capture-phase listener.
    fireEvent.scroll(document.body);
    await waitFor(() => expect(screen.queryByText('Structure editable')).not.toBeInTheDocument());
  });
});
