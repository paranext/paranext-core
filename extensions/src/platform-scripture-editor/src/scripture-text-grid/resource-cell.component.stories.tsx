import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { RESOURCE_CELL_STRING_KEYS, ResourceCellView } from './resource-cell.view';

/**
 * One cell of the Scripture Text Grid: a single resource's focused chapter. In the app the
 * connected `ResourceCell` fetches the chapter USJ and feeds a read-only `Editorial`; these stories
 * drive the presentational `ResourceCellView` directly so every state — downloading, failed, and
 * ready (LTR and RTL) — is reachable without a backend.
 */
const meta: Meta<typeof ResourceCellView> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceCell',
  component: ResourceCellView,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ResourceCellView>;

const localizedStrings = getLocalizedStrings([...RESOURCE_CELL_STRING_KEYS]);

/** Bounds the cell so its `h-full`/`overflow-auto` layout behaves like a real grid column. */
const CELL_BOX_STYLE: React.CSSProperties = {
  height: '320px',
  width: '280px',
  overflow: 'hidden',
  border: '1px solid hsl(var(--border))',
  borderRadius: '4px',
};

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

/** Chapter USJ is still downloading — a Spinner plus the localized "Downloading…" subtitle. */
export const Downloading: Story = {
  render: () => (
    <div style={CELL_BOX_STYLE}>
      <ResourceCellView
        state="downloading"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </div>
  ),
};

/**
 * The chapter failed to download (e.g. offline) — the localized "Download failed" subtitle, no
 * Spinner.
 */
export const Failed: Story = {
  render: () => (
    <div style={CELL_BOX_STYLE}>
      <ResourceCellView
        state="failed"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={undefined}
      />
    </div>
  ),
};

/** The chapter is ready — the editor slot renders (here a stand-in for the read-only `Editorial`). */
export const Ready: Story = {
  render: () => (
    <div style={CELL_BOX_STYLE}>
      <ResourceCellView
        state="ready"
        label="WEB"
        textDirection="ltr"
        localizedStrings={localizedStrings}
        editor={<SampleChapter />}
      />
    </div>
  ),
};

/** A right-to-left resource: the cell honors the resource's own `dir`, independent of the UI locale. */
export const ReadyRightToLeft: Story = {
  render: () => (
    <div style={CELL_BOX_STYLE}>
      <ResourceCellView
        state="ready"
        label="עברית"
        textDirection="rtl"
        localizedStrings={localizedStrings}
        editor={<SampleChapter rtl />}
      />
    </div>
  ),
};
