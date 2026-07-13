import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { RESOURCE_CELL_STRING_KEYS, ResourceCellView } from './resource-cell-view.component';

/**
 * One cell of the Scripture Text Grid: a single resource's focused chapter. In the app the
 * connected `ResourceCell` fetches the chapter USJ and feeds a read-only `Editorial`; these stories
 * drive the presentational `ResourceCellView` directly so every state — downloading, failed, and
 * ready (LTR and RTL) — is reachable without a backend.
 */
const meta: Meta<typeof ResourceCellView> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceCell',
  component: ResourceCellView,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ResourceCellView>;

const localizedStrings = getLocalizedStrings([...RESOURCE_CELL_STRING_KEYS]);

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
 * Supplies the `grid` → `row` ARIA ancestors that `role="gridcell"` requires (in the app, PR-2's
 * `ScriptureTextGrid` row container provides these).
 */
function GridRowBox({ children }: { children: React.ReactNode }) {
  return (
    <div role="grid" aria-label="Scripture text grid story preview">
      <div role="row" style={ROW_BOX_STYLE}>
        {children}
      </div>
    </div>
  );
}

/** Wraps one cell in a bounded column inside a single-row grid (preserves single-cell stories). */
function GridCellBox({ children }: { children: React.ReactNode }) {
  return (
    <GridRowBox>
      <div style={CELL_BOX_STYLE}>{children}</div>
    </GridRowBox>
  );
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
    <GridCellBox>
      <ResourceCellView
        state="downloading"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </GridCellBox>
  ),
};

/**
 * The chapter failed to download (e.g. offline) — the localized "Download failed" subtitle, no
 * Spinner.
 */
export const Failed: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="failed"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </GridCellBox>
  ),
};

/** The chapter is ready — the editor slot renders (here a stand-in for the read-only `Editorial`). */
export const Ready: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
      />
    </GridCellBox>
  ),
};

/** A right-to-left resource: the cell honors the resource's own `dir`, independent of the UI locale. */
export const ReadyRightToLeft: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        editor={<SampleChapter rtl />}
      />
    </GridCellBox>
  ),
};

/** Verse mode, ready — the inline hanging name sits before a single verse (stand-in). */
export const VerseReady: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse />}
      />
    </GridCellBox>
  ),
};

/** Verse mode, empty — no text for the focused verse (e.g. verse 0). */
export const VerseEmpty: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        isVerseEmpty
        editor={undefined}
      />
    </GridCellBox>
  ),
};

/** Single-cell RTL verse: the resource's own `dir`, independent of the UI locale. */
export const VerseRightToLeft: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        nameDisplay="inline"
        editor={<SampleVerse rtl />}
      />
    </GridCellBox>
  ),
};

/**
 * Verse mode, inline name beside a longer verse — shows the verse text wrapping within its own
 * column to the right of the name (the P9-style compact treatment; later lines stay in the text
 * column rather than tucking under the name).
 */
export const VerseInlineWrapping: Story = {
  render: () => (
    <GridCellBox>
      <ResourceCellView
        state="ready"
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
    </GridCellBox>
  ),
};

/**
 * PR-1 partial-failure row smoke: ready, failed, and downloading cells side by side in one row.
 * Neighbors stay independent — one offline cell does not blank its siblings.
 */
export const PartialFailureRow: Story = {
  render: () => (
    <GridRowBox>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="failed"
          label="ASV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="downloading"
          label="KJV"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={undefined}
        />
      </div>
    </GridRowBox>
  ),
};

/**
 * PR-1 mixed-direction row smoke: LTR English beside RTL Hebrew and Arabic in one row. Each cell
 * applies its own `dir` on the content area, independent of the UI locale.
 */
export const MixedDirectionRow: Story = {
  render: () => (
    <GridRowBox>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          label="WEB"
          textDirection="ltr"
          localizedStrings={localizedStrings}
          editor={<SampleChapter />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
          label="עברית"
          textDirection="rtl"
          localizedStrings={localizedStrings}
          editor={<SampleChapter rtl />}
        />
      </div>
      <div style={CELL_BOX_STYLE}>
        <ResourceCellView
          state="ready"
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
    </GridRowBox>
  ),
};
