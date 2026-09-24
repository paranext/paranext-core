import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { RESOURCE_CELL_STRING_KEYS, ResourceCellView } from './resource-cell-view.component';

/**
 * One cell of the Scripture Text Grid: a single resource's focused chapter. In the app the
 * connected `ResourceCell` fetches the chapter USJ and feeds a read-only `Editorial`; these stories
 * drive the presentational `ResourceCellView` directly so every state — downloading, book not
 * available, failed, and ready (LTR and RTL) — is reachable without a backend.
 *
 * `ResourceCellView` is purely presentational — role, focus, and accessible name live on the parent
 * verse `listitem` in `ScriptureTextGrid`. Stories wrap it in a plain bounded box.
 *
 * States covered: `downloading`, `bookNotAvailable`, `failed`, `unavailable`, and `ready` (LTR and
 * RTL).
 */
const meta: Meta<typeof ResourceCellView> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceCell',
  component: ResourceCellView,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ResourceCellView>;

const localizedStrings = getLocalizedStrings([...RESOURCE_CELL_STRING_KEYS]);

/** Storybook runs no content zoom; every cell marks its text with this one area id. */
const STORY_ZOOM_AREA = 'resource-story';

/** Bounds the cell so its `h-full`/`overflow-auto` layout behaves like a real grid column. */
const CELL_BOX_STYLE: React.CSSProperties = {
  height: '320px',
  width: '280px',
  overflow: 'hidden',
  border: '1px solid var(--border)',
  borderRadius: '4px',
};

const ROW_BOX_STYLE: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  height: '320px',
};

/**
 * A plain flex container that frames multiple presentational cells side by side (no ARIA role
 * needed since ResourceCellView is purely presentational — the verse listitem role in
 * ScriptureTextGrid provides the accessible landmark).
 */
function CellRowBox({ children }: { children: React.ReactNode }) {
  return <div style={ROW_BOX_STYLE}>{children}</div>;
}

/**
 * Wraps one cell in a bounded column (preserves single-cell stories). `width` overrides the default
 * column width for stories that need a narrower pane.
 */
function CellBox({ children, width }: { children: React.ReactNode; width?: string }) {
  return <div style={{ ...CELL_BOX_STYLE, ...(width ? { width } : {}) }}>{children}</div>;
}

/** Stand-in for the read-only `Editorial` the connected cell supplies once the chapter is ready. */
function SampleChapter({ rtl = false }: { rtl?: boolean }) {
  const verses = rtl
    ? ['אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ בַּעֲצַת רְשָׁעִים', 'כִּי אִם בְּתוֹרַת יְהוָה חֶפְצוֹ']
    : [
        'Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
        'Blessed are those who mourn, for they shall be comforted.',
      ];
  return (
    <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
      {verses.map((text, index) => (
        <p key={text} style={{ margin: '0 0 8px' }}>
          <sup>{index + 3}</sup> {text}
        </p>
      ))}
    </div>
  );
}

/** Stand-in for the read-only `Editorial` when showing a single verse (poetry-style). */
function SampleVerse({ rtl = false }: { rtl?: boolean }) {
  const text = rtl
    ? 'אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ בַּעֲצַת רְשָׁעִים'
    : 'Blessed are the poor in spirit, for theirs is the kingdom of heaven.';
  return (
    <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
      <p style={{ margin: 0 }}>
        <sup>3</sup> {text}
      </p>
    </div>
  );
}

/** Chapter USJ is still downloading — a Spinner plus the localized "Downloading…" subtitle. */
export const Downloading: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="downloading"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * The chapter failed to download (e.g. offline) — the localized "Download failed" subtitle, no
 * Spinner.
 */
export const Failed: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="failed"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * The resource is installed and working, but has no such book — e.g. Genesis in a New
 * Testament-only text. Shows only the missing-book wording: no "Resource unavailable" heading and
 * no "Download failed", either of which would point the user at a re-download that cannot supply a
 * book the text never contained.
 */
export const BookNotAvailable: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="bookNotAvailable"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * The resource is not installed (or could not be resolved after installation) — shows "Resource not
 * installed." No spinner, no "Download failed" secondary line. Distinct from `Failed` so users can
 * tell whether they need to install the resource or retry a failed download.
 */
export const NotInstalled: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="unavailable"
        zoomArea={STORY_ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </CellBox>
  ),
};

/** The chapter is ready — the editor slot renders (here a stand-in for the read-only `Editorial`). */
export const Ready: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/** A right-to-left resource: the cell honors the resource's own `dir`, independent of the UI locale. */
export const ReadyRightToLeft: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        editor={<SampleChapter rtl />}
      />
    </CellBox>
  ),
};

/** Verse mode, ready — the inline hanging name sits before a single verse (stand-in). */
export const VerseReady: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse />}
      />
    </CellBox>
  ),
};

/** Verse mode, empty — this resource has no text for the focused verse. */
export const VerseEmpty: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        isVerseEmpty
        editor={undefined}
      />
    </CellBox>
  ),
};

/** Single-cell RTL verse: the resource's own `dir`, independent of the UI locale. */
export const VerseRightToLeft: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse rtl />}
      />
    </CellBox>
  ),
};

/**
 * Verse mode, inline name beside a longer verse — shows the verse text wrapping within its own
 * column to the right of the name (the P9-style compact treatment; later lines stay in the text
 * column rather than tucking under the name).
 */
export const VerseInlineWrapping: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={
          <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
            <p style={{ margin: 0 }}>
              <sup>3</sup> Blessed are the poor in spirit, for theirs is the kingdom of heaven, and
              great is their reward in the days to come.
            </p>
          </div>
        }
      />
    </CellBox>
  ),
};

/** Verse mode, not installed — the inline name stays beside the "Resource not installed" label. */
export const VerseNotInstalled: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="unavailable"
        zoomArea={STORY_ZOOM_AREA}
        label="NIV"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />
    </CellBox>
  ),
};

/** Verse mode, downloading — the inline name stays beside the unavailable placeholder + spinner. */
export const VerseDownloading: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="downloading"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />
    </CellBox>
  ),
};

/** Verse mode, failed — the inline name stays beside the "Download failed" placeholder. */
export const VerseFailed: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="failed"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={undefined}
      />
    </CellBox>
  ),
};

/**
 * Verse mode, long name — the inline label truncates at its width cap; hovering reveals the full
 * name via the tooltip (which opens only when the text is actually clipped).
 */
export const VerseLongName: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="New International Version 2011"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse />}
      />
    </CellBox>
  ),
};

/**
 * Verse mode, long name in a pane narrower than the label's width cap — the inline name must still
 * show its truncation "…" at the visible edge (not a hard cut); hover reveals the full name.
 */
export const VerseLongNameNarrowPane: Story = {
  render: () => (
    <CellBox width="110px">
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="New International Version 2011"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse />}
      />
    </CellBox>
  ),
};

/** Verse mode, RTL long name — truncates on the inline-start (right) side; tooltip reveals it. */
export const VerseLongNameRightToLeft: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="תרגום השבעים המלא לפי מהדורת רלפס"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse rtl />}
      />
    </CellBox>
  ),
};

/**
 * Verse mode, RTL long name in a pane narrower than the label's width cap — the truncation "…" must
 * still show at the visible inline-start (right) edge, mirroring the LTR narrow-pane case.
 */
export const VerseLongNameNarrowPaneRightToLeft: Story = {
  render: () => (
    <CellBox width="110px">
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="תרגום השבעים המלא לפי מהדורת רלפס"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse rtl />}
      />
    </CellBox>
  ),
};

/**
 * Partial-failure row smoke: ready, failed, unavailable, and downloading cells side by side.
 * Neighbors stay independent — one non-ready cell does not blank its siblings. The `unavailable`
 * cell shows "Resource not installed" (not "Download failed") so the two failure modes are
 * distinguishable at a glance.
 */
export const PartialFailureRow: Story = {
  render: () => (
    <CellRowBox>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="failed"
          zoomArea={STORY_ZOOM_AREA}
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="unavailable"
          zoomArea={STORY_ZOOM_AREA}
          label="NIV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="downloading"
          zoomArea={STORY_ZOOM_AREA}
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </div>
    </CellRowBox>
  ),
};

/**
 * A very long resource label in the chapter-context header: shows how the header truncates without
 * overflowing. No interaction needed — a visual smoke check for the layout.
 */
export const LongLabel: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="World English Bible Revised 2023 Study Edition"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/**
 * Ready, LTR, with the drag-handle grip visible in the cell header. In the app, supplying
 * `onReorder` to `ScriptureTextGrid` causes every chapter-view cell to receive
 * `showDragHandle={true}`. This story documents the grip's appearance in isolation.
 */
export const ReadyWithDragHandle: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        showDragHandle
        reorderHandleLabel="Reorder WEB"
        reorderHint="Drag or press arrow keys to reorder"
        editor={<SampleChapter />}
      />
    </CellBox>
  ),
};

/**
 * Ready, RTL, with the drag-handle grip visible. Documents that the grip placement is correct on
 * the RTL header, independent of the UI locale.
 */
export const ReadyRightToLeftWithDragHandle: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        zoomArea={STORY_ZOOM_AREA}
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        showDragHandle
        reorderHandleLabel="Reorder עברית"
        reorderHint="Drag or press arrow keys to reorder"
        editor={<SampleChapter rtl />}
      />
    </CellBox>
  ),
};

/**
 * Mixed-direction row smoke: LTR English beside RTL Hebrew and Arabic. Each cell applies its own
 * `dir` on the content area, independent of the UI locale.
 */
export const MixedDirectionRow: Story = {
  render: () => (
    <CellRowBox>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<SampleChapter rtl />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          zoomArea={STORY_ZOOM_AREA}
          label="العربية"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={
            <div style={{ fontFamily: 'serif', lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 8px' }}>
                <sup>3</sup> طُوبَى لِلْمَسَاكِينِ بِالرُّوحِ
              </p>
            </div>
          }
        />
      </div>
    </CellRowBox>
  ),
};
