// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  isAdminProtected: false,
  canAdminToggle: false,
  setAdminProtection: vi.fn(),
  setUserProtection: vi.fn(),
};

vi.mock('./use-structure-protection-state.hook', () => ({
  useStructureProtectionState: () => mockState,
}));

const STRINGS = {
  '%webView_platformScriptureEditor_structureProtection_lockStructure%': 'Lock structure',
  '%webView_platformScriptureEditor_structureProtection_unlockStructure%': 'Unlock structure',
  '%webView_platformScriptureEditor_structureProtection_lockStructureForProject%':
    'Lock structure for project',
  '%webView_platformScriptureEditor_structureProtection_unlockStructureForProject%':
    'Unlock structure for project',
  '%webView_platformScriptureEditor_structureProtection_lockedByAdmin%':
    'Structure locked by admin',
  '%webView_platformScriptureEditor_structureProtection_ariaLabel%': 'Toggle structure protection',
  '%webView_platformScriptureEditor_structureProtection_projectAriaLabel%':
    'Toggle structure lock for project',
};

const PERSONAL = 'Toggle structure protection';
const PROJECT = 'Toggle structure lock for project';

function setState(next: Partial<StructureProtectionState>) {
  Object.assign(mockState, next);
}

afterEach(() => {
  vi.clearAllMocks();
  setState({ isStructureProtected: true, isAdminProtected: false, canAdminToggle: false });
});

describe('StructureProtectionButton — personal button', () => {
  it('renders Lock (not LockOpen) and ghost variant when protected', () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isAdminProtected: false });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const button = screen.getByRole('button', { name: PERSONAL });
    expect(button.querySelector('.lucide-lock')).toBeInTheDocument();
    expect(button.querySelector('.lucide-lock-open')).not.toBeInTheDocument();
    expect(button.className).not.toContain('tw:text-destructive');
    expect(button).toBeEnabled();
  });

  it('renders LockOpen and destructive variant when unlocked', () => {
    setState({ isStructureProtected: false, canAdminToggle: false, isAdminProtected: false });
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
    setState({ canAdminToggle: false, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button', { name: PERSONAL }));
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('admin click on the personal button toggles only the user setting', () => {
    setState({ canAdminToggle: true, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button', { name: PERSONAL }));
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('is disabled and a no-op for a non-admin on an admin-locked project', () => {
    setState({ canAdminToggle: false, isAdminProtected: true, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const button = screen.getByRole('button', { name: PERSONAL });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('Ctrl+Shift+L toggles the personal user setting when enabled', () => {
    setState({ canAdminToggle: false, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true });
    expect(mockState.setUserProtection).toHaveBeenCalledWith(false);
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('Ctrl+Shift+L is a no-op when the personal button is disabled', () => {
    setState({ canAdminToggle: false, isAdminProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true });
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('does NOT fire the personal toggle on the admin combo (Ctrl+Alt+Shift+L)', () => {
    setState({ canAdminToggle: false, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, altKey: true, shiftKey: true });
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('auto-opens the tooltip with the action label when the state changes', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('Lock structure')).not.toBeInTheDocument();
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Lock structure')).length).toBeGreaterThan(0);
  });

  it('shows the Ctrl+Shift+L hint in the tooltip when enabled', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('Ctrl+Shift+L')).not.toBeInTheDocument();
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Ctrl+Shift+L')).length).toBeGreaterThan(0);
  });

  it('auto-opens the "locked by admin" tooltip when an admin locks an already-protected project', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.queryByText('Structure locked by admin')).not.toBeInTheDocument();
    setState({ isAdminProtected: true });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Structure locked by admin')).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: PERSONAL })).toBeDisabled();
  });

  it('does not auto-open the tooltip on a re-render with no state change', () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.queryByText('Unlock structure')).not.toBeInTheDocument();
  });

  it('closes the tooltip on scroll', async () => {
    setState({ isStructureProtected: true, canAdminToggle: false, isAdminProtected: false });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    setState({ isStructureProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Lock structure')).length).toBeGreaterThan(0);
    fireEvent.scroll(document.body);
    await waitFor(() => expect(screen.queryByText('Lock structure')).not.toBeInTheDocument());
  });
});

describe('StructureProtectionButton — admin project button', () => {
  it('is not rendered for a non-admin', () => {
    setState({ canAdminToggle: false, isAdminProtected: false, isStructureProtected: true });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect(screen.queryByRole('button', { name: PROJECT })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: PERSONAL })).toBeInTheDocument();
  });

  it('is rendered for an admin with ShieldCheck (locked) / ShieldOff (unlocked) icons', () => {
    setState({ canAdminToggle: true, isAdminProtected: true, isStructureProtected: true });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    const lockedButton = screen.getByRole('button', { name: PROJECT });
    expect(lockedButton.querySelector('.lucide-shield-check')).toBeInTheDocument();
    expect(lockedButton.className).not.toContain('tw:text-destructive');

    setState({ isAdminProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    const unlockedButton = screen.getByRole('button', { name: PROJECT });
    expect(unlockedButton.querySelector('.lucide-shield-off')).toBeInTheDocument();
    expect(unlockedButton.className).toContain('tw:text-destructive');
  });

  it('clicking the project button toggles only the admin setting', () => {
    setState({ canAdminToggle: true, isAdminProtected: false, isStructureProtected: false });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.click(screen.getByRole('button', { name: PROJECT }));
    expect(mockState.setAdminProtection).toHaveBeenCalledWith(true);
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('Ctrl+Alt+Shift+L toggles the project setting for an admin', () => {
    setState({ canAdminToggle: true, isAdminProtected: false, isStructureProtected: false });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, altKey: true, shiftKey: true });
    expect(mockState.setAdminProtection).toHaveBeenCalledWith(true);
    expect(mockState.setUserProtection).not.toHaveBeenCalled();
  });

  it('Ctrl+Shift+L (no Alt) does not toggle the project setting', () => {
    setState({ canAdminToggle: true, isAdminProtected: false, isStructureProtected: false });
    render(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    fireEvent.keyDown(window, { key: 'l', ctrlKey: true, shiftKey: true });
    expect(mockState.setAdminProtection).not.toHaveBeenCalled();
  });

  it('uses the localized project aria-label and shows the Ctrl+Alt+Shift+L hint', async () => {
    setState({ canAdminToggle: true, isAdminProtected: true, isStructureProtected: true });
    const { rerender } = render(
      <StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />,
    );
    expect(screen.getByRole('button', { name: PROJECT })).toBeInTheDocument();
    expect(screen.queryByText('Ctrl+Alt+Shift+L')).not.toBeInTheDocument();
    setState({ isAdminProtected: false });
    rerender(<StructureProtectionButton projectId="p1" localizedStrings={STRINGS} />);
    expect((await screen.findAllByText('Ctrl+Alt+Shift+L')).length).toBeGreaterThan(0);
  });
});
