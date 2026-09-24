import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaEntryRow, MEDIA_ENTRY_ROW_STRING_KEYS } from './media-entry-row.component';
import {
  MOCK_MEDIA_ENTRY_CORINTH,
  MOCK_MEDIA_ENTRY_PENTECOST,
  MOCK_MAP_ENTRY_GALILEE,
  mockMediaThumbnailUrlResolver,
} from '../../data/media-tab.story-data';

const localizedStrings = getLocalizedStrings([...MEDIA_ENTRY_ROW_STRING_KEYS]);

type FixtureKey = 'corinth' | 'pentecost-range' | 'sba-galilee';

const FIXTURES: Record<FixtureKey, typeof MOCK_MEDIA_ENTRY_CORINTH & { description: string }> = {
  corinth: { ...MOCK_MEDIA_ENTRY_CORINTH, description: 'Single-verse image (gm-012)' },
  'pentecost-range': {
    ...MOCK_MEDIA_ENTRY_PENTECOST,
    description: 'Verse-range image, no lemma (gm-013)',
  },
  'sba-galilee': {
    ...MOCK_MAP_ENTRY_GALILEE,
    description: 'Satellite Bible Atlas map (gm-018)',
  },
};

const meta: Meta<typeof MediaEntryRow> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MediaTab/MediaEntryRow',
  component: MediaEntryRow,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    loaded: true,
    thumbnailUrlResolver: mockMediaThumbnailUrlResolver,
  },
  decorators: [
    (Story) => (
      <div className="tw:w-[420px] tw:border tw:border-border tw:p-2">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MediaEntryRow>;

/**
 * Default - fully interactive. Reviewers can:
 *
 * - Switch between three real fixtures: a single-verse image (Corinth), a verse-range entry without a
 *   lemma (Pentecost, gm-013), and a Satellite Bible Atlas map (Galilee, gm-018).
 * - Toggle the deferred-load state (`loaded`) to demonstrate BHV-359 thumbnail skeleton.
 * - Toggle the thumbnail-resolver presence to demonstrate the "no resolver" placeholder fallback.
 *
 * The `MediaEntryRow` component itself is a presentational body with no interactive behavior; row
 * click and selection are owned by the parent `SourceLanguageIndexedList` (exercised in
 * `MediaImagesTab` / `MediaMapsTab` interactive stories).
 */
function InteractiveMediaEntryRowDemo() {
  const [fixture, setFixture] = useState<FixtureKey>('corinth');
  const [loaded, setLoaded] = useState(true);
  const [hasResolver, setHasResolver] = useState(true);

  const item = FIXTURES[fixture];

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:text-xs">
        <label className="tw:flex tw:items-center tw:gap-1">
          Fixture:
          <select
            value={fixture}
            onChange={(e) => {
              if (
                e.target.value === 'corinth' ||
                e.target.value === 'pentecost-range' ||
                e.target.value === 'sba-galilee'
              ) {
                setFixture(e.target.value);
              }
            }}
          >
            <option value="corinth">Corinth (single verse)</option>
            <option value="pentecost-range">Pentecost (verse range)</option>
            <option value="sba-galilee">Galilee (Satellite Bible Atlas)</option>
          </select>
        </label>
        <label className="tw:flex tw:items-center tw:gap-1">
          <input type="checkbox" checked={!loaded} onChange={(e) => setLoaded(!e.target.checked)} />
          Defer (BHV-359 skeleton)
        </label>
        <label className="tw:flex tw:items-center tw:gap-1">
          <input
            type="checkbox"
            checked={!hasResolver}
            onChange={(e) => setHasResolver(!e.target.checked)}
          />
          No thumbnail resolver
        </label>
        <span className="tw:text-muted-foreground">{item.description}</span>
      </div>
      <MediaEntryRow
        item={item}
        loaded={loaded}
        thumbnailUrlResolver={hasResolver ? mockMediaThumbnailUrlResolver : undefined}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
    </div>
  );
}

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <InteractiveMediaEntryRowDemo />,
};

/**
 * LongTitle - the interactive Default cycles only between real-shaped fixtures whose titles fit
 * comfortably in the row. This static story shows the truncation behavior under a contrived long
 * title, which the interactive demo cannot reach without polluting the fixture set.
 */
export const LongTitle: Story = {
  args: {
    item: {
      imageId: 'long-title',
      title:
        'A very long title that should truncate gracefully when the row width is constrained by the parent layout',
      referenceLabel: 'PSA 119:1-176',
      collection: 'General',
      mediaType: 'image',
    },
  },
};

/**
 * NoThumbnailResolver - same fallback path the Default's "No thumbnail resolver" toggle reaches,
 * preserved as a static export so Chromatic captures the placeholder layout deterministically.
 */
export const NoThumbnailResolver: Story = {
  args: {
    item: MOCK_MEDIA_ENTRY_CORINTH,
    thumbnailUrlResolver: undefined,
  },
};
