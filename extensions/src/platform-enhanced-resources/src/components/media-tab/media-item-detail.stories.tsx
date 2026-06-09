import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MediaItemDetail, MEDIA_ITEM_DETAIL_STRING_KEYS } from './media-item-detail.component';
import type { MediaEntryRowData } from './media-entry-row.component';
import {
  MOCK_MEDIA_ENTRY_CORINTH,
  MOCK_MEDIA_ENTRY_PENTECOST,
  MOCK_MAP_ENTRY_GALILEE,
  mockMediaThumbnailUrlResolver,
} from '../../data/media-tab.story-data';

const localizedStrings = getLocalizedStrings([...MEDIA_ITEM_DETAIL_STRING_KEYS]);

type FixtureKey = 'corinth' | 'pentecost-range' | 'sba-galilee';

const FIXTURES: Record<FixtureKey, MediaEntryRowData & { description: string }> = {
  corinth: { ...MOCK_MEDIA_ENTRY_CORINTH, description: 'Single-verse image (gm-012)' },
  'pentecost-range': {
    ...MOCK_MEDIA_ENTRY_PENTECOST,
    description: 'Verse-range image (gm-013)',
  },
  'sba-galilee': {
    ...MOCK_MAP_ENTRY_GALILEE,
    description: 'Satellite Bible Atlas map (gm-018)',
  },
};

const meta: Meta<typeof MediaItemDetail> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MediaTab/MediaItemDetail',
  component: MediaItemDetail,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    thumbnailUrlResolver: mockMediaThumbnailUrlResolver,
    // No-op defaults for the required callbacks; the interactive Default overrides these with real
    // state setters (per UI-PKG-004 REV-006), and the static stories are render-only.
    onClose: () => {},
    onMaximize: () => {},
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

type Story = StoryObj<typeof MediaItemDetail>;

/**
 * Default - fully interactive. Reviewers can:
 *
 * - Switch between three real fixtures: a single-verse image (Corinth, gm-012), a verse-range image
 *   (Pentecost, gm-013), and a Satellite Bible Atlas map (Galilee, gm-018) - the badge text follows
 *   the entry's `mediaType` ("image" vs "map").
 * - Toggle the thumbnail-resolver presence to demonstrate the empty preview slot (when no resolver is
 *   supplied the `<img>` and overlay Maximize button are not rendered).
 *
 * `onClose` (Back-to-list button) and `onMaximize` (overlay button) are wired to a live action log
 * so the reviewer can see the parent callbacks fire. In production the parent
 * `SourceLanguageIndexedList` supplies `onClose` via `renderDetailContent` and `onMaximize` routes
 * to the MediaViewer dialog (UI-PKG-005).
 */
function InteractiveMediaItemDetailDemo() {
  const [fixture, setFixture] = useState<FixtureKey>('corinth');
  const [hasResolver, setHasResolver] = useState(true);
  const [lastAction, setLastAction] = useState<string>('(none)');

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
            <option value="corinth">Corinth (single-verse image)</option>
            <option value="pentecost-range">Pentecost (verse-range image)</option>
            <option value="sba-galilee">Galilee (Satellite Bible Atlas map)</option>
          </select>
        </label>
        <label className="tw:flex tw:items-center tw:gap-1">
          <input
            type="checkbox"
            checked={!hasResolver}
            onChange={(e) => setHasResolver(!e.target.checked)}
          />
          No thumbnail resolver (empty preview)
        </label>
        <span className="tw:text-muted-foreground">
          {item.description} · last action: {lastAction}
        </span>
      </div>
      <MediaItemDetail
        item={item}
        thumbnailUrlResolver={hasResolver ? mockMediaThumbnailUrlResolver : undefined}
        onClose={() => setLastAction('onClose')}
        onMaximize={() => setLastAction('onMaximize')}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
    </div>
  );
}

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <InteractiveMediaItemDetailDemo />,
};

/**
 * ImageItem - a single-verse image entry with a caption (verse-range label) and the preview image +
 * overlay Maximize button. Static export so Chromatic captures the default layout
 * deterministically.
 */
export const ImageItem: Story = {
  args: {
    item: MOCK_MEDIA_ENTRY_CORINTH,
  },
};

/**
 * MapItem - a Satellite Bible Atlas entry. Identical layout to ImageItem except the media-type
 * badge reads "map" (driven by `item.mediaType`).
 */
export const MapItem: Story = {
  args: {
    item: MOCK_MAP_ENTRY_GALILEE,
  },
};

/**
 * NoCaption - an entry with an empty `referenceLabel`; the verse-range caption paragraph is
 * omitted.
 *
 * NOTE FOR REVIEWER: `MediaEntryRowData.referenceLabel` is typed as a required `string`, and every
 * mock fixture supplies a non-empty label, so an empty caption is not a state the real parent is
 * known to produce. This story exercises the component's `item.referenceLabel && (...)` guard to
 * document the rendering, but please confirm whether a caption-less entry is actually reachable in
 * production before treating this as a supported state.
 */
export const NoCaption: Story = {
  args: {
    item: { ...MOCK_MEDIA_ENTRY_CORINTH, referenceLabel: '' },
  },
};

/**
 * NoThumbnailResolver - the empty preview slot reached by the Default's "No thumbnail resolver"
 * toggle, preserved as a static export. With no resolver the preview `<img>` and the overlay
 * Maximize button are not rendered (the component only renders the preview block when a resolved
 * URL exists).
 */
export const NoThumbnailResolver: Story = {
  args: {
    item: MOCK_MEDIA_ENTRY_PENTECOST,
    thumbnailUrlResolver: undefined,
  },
};
