import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { ScriptureTextGrid } from './scripture-text-grid.component';

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
