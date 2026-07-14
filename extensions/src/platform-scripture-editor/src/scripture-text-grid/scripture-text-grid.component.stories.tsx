import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { ScriptureTextGrid } from './scripture-text-grid.component';
import {
  RESET_ZOOM_KEY,
  RESOURCE_CELL_STRING_KEYS,
  ZOOM_IN_KEY,
  ZOOM_OPTIONS_KEY,
  ZOOM_OUT_KEY,
} from './resource-cell-view.component';
import type { ResourceZoomController } from './use-resource-zoom.hook';

/**
 * The Scripture Text Grid row: one cell per shown resource, all synced to the active scrRef, laid
 * out as a horizontal row. Clicking a verse cell opens a resizable chapter-context panel beside the
 * row. In Storybook the connected `ResourceCell` runs against inert PAPI stubs, so every cell
 * renders its "Downloading…" offline state (the real `Editorial` never mounts) — these stories
 * capture the row layout, the chapter-context split, and the close button rather than live
 * scripture content.
 */
const meta: Meta<typeof ScriptureTextGrid> = {
  title: 'Bundled Extensions/platform-scripture-editor/ScriptureTextGrid',
  component: ScriptureTextGrid,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ScriptureTextGrid>;

const scrRef: SerializedVerseRef = {
  book: 'MAT',
  chapterNum: 5,
  verseNum: 3,
  versificationStr: 'English',
};

const resources = [
  { resourceId: 'web', projectId: 'web', label: 'WEB' },
  { resourceId: 'kjv', projectId: 'kjv', label: 'KJV' },
  { resourceId: 'heb', projectId: 'heb', label: 'עברית' },
];

/** Bounds the grid so its `h-full` layout behaves like a real web-view pane. */
const GRID_BOX_STYLE: React.CSSProperties = {
  height: '360px',
  width: '640px',
  overflow: 'hidden',
  border: '1px solid var(--border)',
  borderRadius: '4px',
};

function GridBox({ children }: { children: React.ReactNode }) {
  return <div style={GRID_BOX_STYLE}>{children}</div>;
}

const noop = () => {};

/** The default row: verse-mode cells laid out horizontally, no chapter-context split open. */
export const Row: Story = {
  render: () => (
    <GridBox>
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={noop}
        ariaLabel="Text Collection"
        onChapterContextChange={noop}
      />
    </GridBox>
  ),
};

/**
 * The default row with `onReorder` supplied: every cell receives a drag-handle grip and is
 * draggable. Documents that passing `onReorder` activates the drag-to-reorder UI without changing
 * the layout otherwise.
 */
export const RowDraggable: Story = {
  render: () => (
    <GridBox>
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={noop}
        ariaLabel="Text Collection"
        onChapterContextChange={noop}
        onReorder={noop}
      />
    </GridBox>
  ),
};

/**
 * The chapter-context split open for one resource: the verse row on the left, that resource's
 * chapter panel (with its labeled close button) on the right, separated by a resizable handle.
 */
export const ChapterContextOpen: Story = {
  render: () => (
    <GridBox>
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={noop}
        ariaLabel="Text Collection"
        chapterContext={resources[1]}
        onChapterContextChange={noop}
        onChapterContextClose={noop}
        closeChapterContextLabel="Close chapter view"
      />
    </GridBox>
  ),
};

// ---------------------------------------------------------------------------
// Zoom wiring at the grid level
// ---------------------------------------------------------------------------

const localizedStrings = getLocalizedStrings([...RESOURCE_CELL_STRING_KEYS]);
const zoomMenuLabels = {
  zoomIn: localizedStrings[ZOOM_IN_KEY] ?? 'Zoom In',
  zoomOut: localizedStrings[ZOOM_OUT_KEY] ?? 'Zoom Out',
  reset: localizedStrings[RESET_ZOOM_KEY] ?? 'Reset Zoom',
  options: localizedStrings[ZOOM_OPTIONS_KEY] ?? 'Zoom options for {resourceName}',
};

/**
 * A no-op stub `ResourceZoomController` that returns the default factor (1) for every resource.
 * Passed to `ScriptureTextGrid` so each `ResourceCell` renders with zoom wiring active and the
 * kebab button visible — without needing a real `useWebViewState` persistence layer. Because the
 * connected `ResourceCell` renders "Downloading…" in Storybook (PAPI stubs never resolve), the
 * focus here is the kebab affordance and the `data-resource-id` attribute wiring, not the text.
 */
const stubZoomController: ResourceZoomController = {
  getZoom: () => 1,
  setZoomForResource: noop,
  adjustZoom: noop,
  resetZoom: noop,
  pruneToResourceIds: noop,
};

/**
 * Grid with zoom wiring active: each cell receives a stub zoom controller that returns the default
 * factor (1), so the kebab button is rendered and the `data-resource-id` attribute is visible on
 * each column wrapper. In Storybook the cells remain in their "Downloading…" state (PAPI stubs);
 * this story documents the grid-level zoom plumbing rather than zoomed text content.
 */
export const RowWithZoomEnabled: Story = {
  render: () => (
    <GridBox>
      <ScriptureTextGrid
        resources={resources}
        scrRef={scrRef}
        setScrRef={noop}
        ariaLabel="Text Collection"
        onChapterContextChange={noop}
        zoom={stubZoomController}
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridBox>
  ),
};
