// @vitest-environment jsdom
/**
 * Grid ↔ hook wiring integration test.
 *
 * Unlike scripture-text-grid.component.test.tsx, this file does NOT mock `useResourceZoomInput`.
 * The goal is to prove that the REAL input hook is wired to the grid's real container ref and that
 * `resolveResourceIdFromElement` correctly resolves the target resource from a Ctrl+wheel event.
 *
 * Only the minimum external boundaries are mocked:
 *
 * - `resource-cell.component` (heavy PAPI/Editorial deps — no real data in tests)
 * - `platform-bible-react` Resizable* components (layout APIs absent in jsdom)
 */
import '@testing-library/jest-dom';
import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ScriptureTextGrid } from './scripture-text-grid.component';
import type { ResourceZoomController } from './use-resource-zoom.hook';
import type { GridResource } from './resource-cell.component';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Trivial ResourceCell stub — the data-resource-id lives on the grid wrapper (not inside
// ResourceCell), so a minimal stub is sufficient for the wheel-event wiring test.
vi.mock('./resource-cell.component', () => ({
  ResourceCell: ({ resourceRef }: { resourceRef: GridResource }) => (
    <div data-testid={`cell-inner-${resourceRef.resourceId}`}>{resourceRef.label}</div>
  ),
}));

// Preserve real platform-bible-react exports; replace only the layout-heavy Resizable* components
// that require DOM measurement APIs unavailable in jsdom.
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    ResizablePanelGroup: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="resizable-panel-group">{children}</div>
    ),
    ResizablePanel: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="resizable-panel">{children}</div>
    ),
    ResizableHandle: () => <div data-testid="resizable-handle" />,
  };
});

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const scrRef = { book: 'MAT', chapterNum: 5, verseNum: 3, versificationStr: 'English' };
const setScrRef = vi.fn();

const resources: GridResource[] = [
  { resourceId: 'res-alpha', projectId: 'proj-a', label: 'WEB' },
  { resourceId: 'res-beta', projectId: 'proj-b', label: 'KJV' },
];

const zoomMenuLabels = {
  zoomIn: 'Zoom In',
  zoomOut: 'Zoom Out',
  reset: 'Reset Zoom',
  options: 'Zoom options',
};

function makeSpyController(): ResourceZoomController & {
  adjustZoom: ReturnType<typeof vi.fn>;
} {
  return {
    adjustZoom: vi.fn(),
    getZoom: () => 1,
    resetZoom: vi.fn(),
    setZoomForResource: vi.fn(),
    pruneToResourceIds: vi.fn(),
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ScriptureTextGrid zoom wiring integration (real useResourceZoomInput)', () => {
  let zoom: ReturnType<typeof makeSpyController>;

  beforeEach(() => {
    zoom = makeSpyController();
  });

  it('Ctrl+wheel over the first cell calls adjustZoom with the first resourceId', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
      />,
    );

    // The data-resource-id attribute is on the grid's own wrapper div, not inside ResourceCell.
    const firstCellWrapper = document.querySelector('[data-resource-id="res-alpha"]');
    expect(firstCellWrapper).not.toBeNull();

    const event = new WheelEvent('wheel', {
      deltaY: -100,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    firstCellWrapper?.dispatchEvent(event);

    // The real hook must have caught the capture-phase event and resolved the resource id.
    expect(zoom.adjustZoom).toHaveBeenCalledWith('res-alpha', 1);
    // The browser's page-zoom is also suppressed.
    expect(event.defaultPrevented).toBe(true);
  });

  it('Ctrl+wheel over the second cell resolves the second resourceId independently', () => {
    render(
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={setScrRef}
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
      />,
    );

    const secondCellWrapper = document.querySelector('[data-resource-id="res-beta"]');
    expect(secondCellWrapper).not.toBeNull();

    secondCellWrapper?.dispatchEvent(
      new WheelEvent('wheel', {
        deltaY: 100,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );

    // zoom-out direction (deltaY > 0) maps to step -1.
    expect(zoom.adjustZoom).toHaveBeenCalledWith('res-beta', -1);
    // Wheel over the second cell must not have triggered the first resource.
    expect(zoom.adjustZoom).not.toHaveBeenCalledWith('res-alpha', expect.anything());
  });
});
