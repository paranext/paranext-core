import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { RESOURCE_CELL_STRING_KEYS, ResourceCellView } from './resource-cell-view.component';

/**
 * One cell of the Scripture Text Grid: a single resource's focused chapter. In the app the
 * connected `ResourceCell` fetches the chapter USJ and feeds a read-only `Editorial`; these stories
 * drive the presentational `ResourceCellView` directly so every state — downloading, failed, and
 * ready (LTR and RTL) — is reachable without a backend.
 *
 * `ResourceCellView` is purely presentational — role, focus, and accessible name live on the parent
 * verse `listitem` in `ScriptureTextGrid`. Stories wrap it in a plain bounded box.
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
 * A plain flex container that frames multiple presentational cells side by side (no ARIA role
 * needed since ResourceCellView is purely presentational — the verse listitem role in
 * ScriptureTextGrid provides the accessible landmark).
 */
function CellRowBox({ children }: { children: React.ReactNode }) {
  return <div style={ROW_BOX_STYLE}>{children}</div>;
}

/** Wraps one cell in a bounded column (preserves single-cell stories). */
function CellBox({ children }: { children: React.ReactNode }) {
  return <div style={CELL_BOX_STYLE}>{children}</div>;
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
        label="WEB"
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
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        editor={<SampleChapter rtl />}
      />
    </CellBox>
  ),
};

/** Verse mode, ready — the editor slot shows a single verse (stand-in). */
export const VerseReady: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleVerse />}
      />
    </CellBox>
  ),
};

/** Verse mode, empty — no text for the focused verse (e.g. verse 0). */
export const VerseEmpty: Story = {
  render: () => (
    <CellBox>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
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
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        editor={<SampleVerse rtl />}
      />
    </CellBox>
  ),
};

/**
 * Partial-failure row smoke: ready, failed, and downloading cells side by side. Neighbors stay
 * independent — one offline cell does not blank its siblings.
 */
export const PartialFailureRow: Story = {
  render: () => (
    <CellRowBox>
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
    </CellRowBox>
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
    </CellRowBox>
  ),
};
