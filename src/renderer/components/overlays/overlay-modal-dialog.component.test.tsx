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
});
