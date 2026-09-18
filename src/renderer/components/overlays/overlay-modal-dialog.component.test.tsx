import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import type { OverlayEntry } from '@renderer/services/overlays/overlay.service-model';
import { OverlayModalDialog } from './overlay-modal-dialog.component';

// Mock the overlay store
vi.mock('@renderer/services/overlays/overlay-store', () => ({
  resolveAndRemoveOverlay: vi.fn(),
}));

function createMockOverlay(
  componentContent: string,
  overrides?: Partial<Extract<OverlayEntry, { type: 'modalDialog' }>>,
): Extract<OverlayEntry, { type: 'modalDialog' }> {
  return {
    type: 'modalDialog',
    id: 'test-overlay',
    webViewId: 'test-webview',
    Component: () => <div data-testid="mock-component">{componentContent}</div>,
    props: {},
    resolve: vi.fn(),
    reject: vi.fn(),
    ...overrides,
  };
}

describe('OverlayModalDialog', () => {
  it('renders the provided component', () => {
    const overlay = createMockOverlay('Hello from component');
    render(<OverlayModalDialog overlay={overlay} />);
    expect(screen.getByTestId('mock-component')).toHaveTextContent('Hello from component');
  });

  it('renders inside a dialog with modal backdrop', () => {
    const overlay = createMockOverlay('Content');
    render(<OverlayModalDialog overlay={overlay} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders identically whatever the requesting pane’s zoom — a full-window dialog is not anchored to content and never scales with it', () => {
    // The shell reads no content-zoom scale for the requesting webViewId at all — this pins that
    // absence, so a dialog drawn at 200% because the pane behind it happens to be zoomed is not the
    // intent this shell falls into by accident.
    const overlay = createMockOverlay('Content');
    render(<OverlayModalDialog overlay={overlay} />);

    expect(screen.getByRole('dialog').style.zoom || '').toBe('');
  });
});
