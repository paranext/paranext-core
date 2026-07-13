// @vitest-environment jsdom
import '@testing-library/jest-dom';
import type React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  DOWNLOADING_KEY,
  FAILED_KEY,
  UNAVAILABLE_KEY,
  ResourceCellView,
} from './resource-cell-view.component';

// jsdom does not implement ResizeObserver; Radix's tooltip (opened on grip focus) queries it. A
// no-op stub keeps the render path from throwing. Built with vi.fn() returning a plain object so we
// don't trip the class-methods-use-this rule that real class methods would.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver is typed as a constructor with browser-only structural fields; a vi.fn factory
    // satisfies the runtime contract but not the typing, so cast through `unknown`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
});

const localizedStrings = {
  [UNAVAILABLE_KEY]: 'Resource unavailable',
  [DOWNLOADING_KEY]: 'Downloading…',
  [FAILED_KEY]: 'Download failed',
};

/** Renders cells in a plain div wrapper — ResourceCellView is now presentational, no role needed. */
function renderCells(cells: React.ReactNode) {
  return render(<div>{cells}</div>);
}

describe('ResourceCellView row smoke', () => {
  it('partial failure: ready, failed, and downloading cells render independently', () => {
    renderCells(
      <>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="failed"
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
        <ResourceCellView
          state="downloading"
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </>,
    );

    // Each resource's label text is visible in its header.
    expect(screen.getByText('WEB')).toBeInTheDocument();
    expect(screen.getByText('ASV')).toBeInTheDocument();
    expect(screen.getByText('KJV')).toBeInTheDocument();

    // No gridcell role — ResourceCellView is now purely presentational.
    expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

    // Content renders per state.
    expect(screen.getByText('Blessed are the poor in spirit')).toBeInTheDocument();
    expect(screen.getByText('Download failed')).toBeInTheDocument();
    expect(screen.getByText('Downloading…')).toBeInTheDocument();
    // Both failed and downloading cells show "Resource unavailable" as the primary status text.
    expect(screen.getAllByText('Resource unavailable')).toHaveLength(2);
  });

  it('mixed direction: LTR and RTL cells apply independent dir', () => {
    const { container } = renderCells(
      <>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<span>Blessed are the poor in spirit</span>}
        />
        <ResourceCellView
          state="ready"
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<span>אַשְׁרֵי הָאִישׁ</span>}
        />
        <ResourceCellView
          state="ready"
          label="العربية"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<span>طُوبَى لِلْمَسَاكِينِ</span>}
        />
      </>,
    );

    // No gridcell role — purely presentational.
    expect(screen.queryByRole('gridcell')).not.toBeInTheDocument();

    // Scope the direction counts to the rendered subtree (not the whole document).
    expect(container.querySelectorAll('[dir="ltr"]')).toHaveLength(1);
    expect(container.querySelectorAll('[dir="rtl"]')).toHaveLength(2);

    expect(screen.getByText('Blessed are the poor in spirit')).toBeInTheDocument();
    expect(screen.getByText('אַשְׁרֵי הָאִישׁ')).toBeInTheDocument();
    expect(screen.getByText('طُوبَى لِلْمَسَاكِينِ')).toBeInTheDocument();
  });
});

describe('ResourceCellView reorder grip', () => {
  it('renders the grip as a focusable, labeled control and fires onReorderKeyDown on keydown', () => {
    const onReorderKeyDown = vi.fn();
    renderCells(
      <ResourceCellView
        state="ready"
        label="Genesis"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>In the beginning</span>}
        showDragHandle
        reorderHandleId="gen"
        reorderHandleLabel="Reorder Genesis"
        reorderHint="Drag or press arrow keys to reorder"
        onReorderKeyDown={onReorderKeyDown}
      />,
    );

    const grip = screen.getByRole('button', { name: 'Reorder Genesis' });
    expect(grip).toHaveAttribute('data-reorder-handle-id', 'gen');
    // A real focusable control (button), not an aria-hidden decoration.
    expect(grip).not.toHaveAttribute('aria-hidden');
    grip.focus();
    expect(grip).toHaveFocus();

    fireEvent.keyDown(grip, { key: 'ArrowRight' });
    expect(onReorderKeyDown).toHaveBeenCalledTimes(1);
  });

  it('shows the reorder hint tooltip on grip focus', async () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="Genesis"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>In the beginning</span>}
        showDragHandle
        reorderHandleId="gen"
        reorderHandleLabel="Reorder Genesis"
        reorderHint="Drag or press arrow keys to reorder"
        onReorderKeyDown={vi.fn()}
      />,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Reorder Genesis' }));
    // Radix renders the tooltip content into a live region on focus.
    expect(await screen.findAllByText('Drag or press arrow keys to reorder')).not.toHaveLength(0);
  });

  it('does not crash when showDragHandle is set without reorder wiring', () => {
    renderCells(
      <ResourceCellView
        state="ready"
        label="Genesis"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<span>In the beginning</span>}
        showDragHandle
      />,
    );
    // The grip still renders (no aria-label supplied); the label text is still shown in the header.
    expect(screen.getByText('Genesis')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
