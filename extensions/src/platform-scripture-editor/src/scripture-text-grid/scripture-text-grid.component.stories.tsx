import { useState } from 'react';
import type React from 'react';
import { Button } from 'platform-bible-react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { ScriptureTextGrid } from './scripture-text-grid.component';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  RESET_ZOOM_KEY,
  RESOURCE_CELL_STRING_KEYS,
  ZOOM_IN_KEY,
  ZOOM_OPTIONS_KEY,
  ZOOM_OUT_KEY,
} from './resource-cell-view.component';
import type { ResourceZoomController } from './use-resource-content-zoom.hook';
import type { GridResource } from './grid-resources.utils';
// The verse rows' grip and name positioning. The real app loads it through
// `scripture-text-grid.web-view.scss`; Storybook loads story files lazily, so these stories import it
// themselves rather than relying on another story file having been opened first.
import '../_scripture-text-grid-verse.scss';

/**
 * The Scripture Text Grid row: one cell per shown resource, all synced to the active scrRef, laid
 * out as a horizontal row. Clicking a verse cell opens a resizable chapter-context panel beside the
 * row. In Storybook the connected `ResourceCell` runs against inert PAPI stubs, so every cell
 * renders its "Downloading…" state (the real `Editorial` never mounts) — these stories capture the
 * row layout, the chapter-context split, and the close button rather than live scripture content.
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

const resourcesWithUnresolvedCells: GridResource[] = [
  { resourceId: 'web', projectId: 'web', label: 'WEB' },
  { resourceId: 'niv', projectId: undefined, label: 'NIV', unresolvedReason: 'unverified' },
  { resourceId: 'esv', projectId: undefined, label: 'ESV', unresolvedReason: 'checking' },
  { resourceId: 'nlt', projectId: undefined, label: 'NLT', unresolvedReason: 'notInstalled' },
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
        isViewVisible
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
 * A row mixing a resolved cell with the three unresolved placeholder states — `unverified`,
 * `checking`, and `notInstalled` — so reviewers can confirm they are distinguishable side by side.
 * These are decided before any PAPI data arrives, so they render even against Storybook's inert
 * stubs.
 */
export const RowWithUnresolvedCells: Story = {
  render: () => (
    <GridBox>
      <ScriptureTextGrid
        resources={resourcesWithUnresolvedCells}
        scrRef={scrRef}
        setScrRef={noop}
        ariaLabel="Text Collection"
        onChapterContextChange={noop}
        isViewVisible
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
        isViewVisible
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
        isViewVisible
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
  zoomIn: localizedStrings[ZOOM_IN_KEY] ?? 'Zoom in',
  zoomOut: localizedStrings[ZOOM_OUT_KEY] ?? 'Zoom out',
  reset: localizedStrings[RESET_ZOOM_KEY] ?? 'Zoom reset',
  options: localizedStrings[ZOOM_OPTIONS_KEY] ?? 'Zoom options for {resourceName}',
};

/**
 * A stub `ResourceZoomController`: every resource follows a 100 % default with no level of its own.
 * Storybook runs no content zoom, so this story documents the menus' presence and the zoom scope on
 * each column (`data-platform-content-zoom-scope`), not zoomed text.
 */
const stubZoomController: ResourceZoomController = {
  getZoom: () => 1,
  hasOwnLevel: () => false,
  adjustZoom: noop,
  resetZoom: noop,
};

/**
 * Chapter view with zoom wiring active: each column's header carries the "⋮" button (revealed on
 * hover), and each column's right-click menu carries the zoom items. In Storybook the cells remain
 * in their "Downloading…" state (PAPI stubs).
 */
export const RowWithZoomEnabled: Story = {
  render: () => (
    <GridBox>
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={noop}
        ariaLabel="Text Collection"
        viewMode="chapter"
        zoom={stubZoomController}
        zoomMenuLabels={zoomMenuLabels}
      />
    </GridBox>
  ),
};

/**
 * The verse-aligned Grid view. Storybook's cells run against inert PAPI stubs, so they render their
 * "Downloading…" state rather than scripture — what this documents is the grid chrome: one column
 * per resource, a sticky resource-name header on each, and no interior grid lines. `AlignedGrid`'s
 * own stories show the row alignment with stand-in verse blocks.
 */
export const AlignedGridView: Story = {
  render: () => (
    <GridBox>
      <ScriptureTextGrid
        isViewVisible
        resources={resources}
        scrRef={scrRef}
        setScrRef={noop}
        viewMode="aligned"
        ariaLabel="Text Collection"
      />
    </GridBox>
  ),
};

// ---------------------------------------------------------------------------
// Reveal: scroll a resource's cell into view, focus it, and outline it
// ---------------------------------------------------------------------------

type RevealStoryProps = Pick<React.ComponentProps<typeof ScriptureTextGrid>, 'viewMode'>;

/**
 * Wraps the grid with a button that issues a reveal request for the second resource. The request
 * only exists after a click: the docs page renders every story at once, and a request present at
 * mount would scroll and focus that story's cell and drag the docs page to it. Each click carries a
 * new `requestId`, so clicking again reveals again; a pointer press inside the grid or a
 * non-modifier key press clears the outline.
 */
function RevealStory({ viewMode }: RevealStoryProps) {
  const [requestId, setRequestId] = useState(0);
  const target = resources[1];

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <div>
        <Button variant="outline" onClick={() => setRequestId((previous) => previous + 1)}>
          {`Go to result in ${target.label}`}
        </Button>
      </div>
      <GridBox>
        <ScriptureTextGrid
          isViewVisible
          resources={resources}
          scrRef={scrRef}
          setScrRef={noop}
          ariaLabel="Text Collection"
          viewMode={viewMode}
          onChapterContextChange={noop}
          revealRequest={requestId ? { projectId: target.projectId, requestId } : undefined}
          onRevealHandled={noop}
          onRevealed={noop}
          getRevealAnnouncement={(name) => `Showing the result in ${name}`}
        />
      </GridBox>
    </div>
  );
}

/**
 * The verse row after "Go to result": the KJV cell is scrolled into view, focused, and outlined.
 * Click the button again to reveal again; press in the grid or type to clear the outline.
 */
export const RowRevealed: Story = {
  render: () => <RevealStory viewMode="verse" />,
};

/**
 * Chapter view after "Go to result": the KJV column is scrolled into view and outlined, with focus
 * on its scroll area. Click the button again to reveal again.
 */
export const ChapterViewRevealed: Story = {
  render: () => <RevealStory viewMode="chapter" />,
};

/**
 * The aligned Grid view after "Go to result": the KJV column is outlined and the reveal is
 * announced through a visually hidden live region, since focus lands on the grid's shared root.
 */
export const AlignedGridViewRevealed: Story = {
  render: () => <RevealStory viewMode="aligned" />,
};
