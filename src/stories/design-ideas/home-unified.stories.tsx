/*
 * Design-ideas stories for the unified Home + GetResources concept. See
 * `home-unified.component.tsx` for the accompanying component prototype.
 *
 * These stories demonstrate the concept across representative data shapes:
 *   - Default: a mixed catalog of installed projects, S/R-able-not-installed projects, DBL
 *     resources not yet installed, and update-available installed resources — with the first
 *     100 items initially fetched and the rest paged in on scroll or filter.
 *   - EmptyLocal: no local content; the list is fully populated by DBL discovery.
 *   - Loading: initial spinner state.
 *   - NoResults: zero items after data loads.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CardTitle } from 'platform-bible-react';
import { HomeIcon } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import {
  HomeUnified,
  HomeUnifiedProps,
  UnifiedItem,
  UnifiedItemAction,
  UnifiedItemType,
} from './home-unified.component';

const daysAgo = (days: number) => new Date(Date.now() - days * 1000 * 60 * 60 * 24).toISOString();
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 1000 * 60 * 60).toISOString();

// Long language list so the language-filter dropdown demonstrates scrolling. If any DBL bundle in
// production has a language not in this set, add it here so the filter shows its full inventory.
const LANGUAGES: readonly string[] = [
  'Amharic',
  'Arabic',
  'Assamese',
  'Aymara',
  'Bengali',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Cebuano',
  'Chinese',
  'Chichewa',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Farsi',
  'Filipino',
  'Finnish',
  'French',
  'Georgian',
  'German',
  'Greek (Ancient)',
  'Greek (Modern)',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Indonesian',
  'Italian',
  'Japanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Kinyarwanda',
  'Korean',
  'Kurdish (Sorani)',
  'Lao',
  'Latvian',
  'Lithuanian',
  'Luganda',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Marathi',
  'Mongolian',
  'Nepali',
  'Norwegian (Bokmål)',
  'Norwegian (Nynorsk)',
  'Odia',
  'Pashto',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Quechua',
  'Romanian',
  'Russian',
  'Serbian',
  'Sesotho',
  'Shona',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tagalog',
  'Tamil',
  'Telugu',
  'Thai',
  'Tigrinya',
  'Tongan',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Vietnamese',
  'Welsh',
  'Wolof',
  'Xhosa',
  'Yoruba',
  'Zulu',
];

const DBL_TYPES: UnifiedItemType[] = [
  'ScriptureResource',
  'CommentaryResource',
  'EnhancedResource',
  'SourceLanguageResource',
  'XmlResource',
];

// Reasonable-looking short-name letters. Enough distinct combinations for hundreds of rows.
const shortNameFor = (i: number): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const a = letters[i % letters.length];
  const b = letters[Math.floor(i / letters.length) % letters.length];
  const c = letters[Math.floor(i / (letters.length * letters.length)) % letters.length];
  return `${a}${b}${c}`;
};

// A representative selection of locally-installed rows (mix of projects, resources, sync-needed and
// update-available) plus a couple of S/R-server-only projects. These always come first in the mock
// dataset so the "recent first" behavior and the star-my-languages behavior are visible without
// scrolling.
const LOCAL_ITEMS: UnifiedItem[] = [
  {
    id: 'p-nnb',
    shortName: 'NNB',
    fullName: 'New Norwegian Bible — Working Draft',
    language: 'Norwegian (Nynorsk)',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: hoursAgo(3),
    editedOnServerIso: daysAgo(4),
    editedLocallyIso: hoursAgo(2),
  },
  {
    id: 'p-web',
    shortName: 'WEB',
    fullName: 'World English Bible',
    language: 'English',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: daysAgo(2),
  },
  {
    id: 'p-mrsyr',
    shortName: 'MRSYR',
    fullName: 'Marathi Working Draft',
    language: 'Marathi',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: daysAgo(1),
    // Only a local edit — this exercises the "one-line" sync tooltip branch.
    editedLocallyIso: hoursAgo(20),
  },
  {
    id: 'r-esv',
    shortName: 'ESV',
    fullName: 'English Standard Version',
    language: 'English',
    type: 'ScriptureResource',
    status: 'installedResource',
    lastUsedIso: daysAgo(5),
  },
  {
    id: 'r-nt-comm',
    shortName: 'NTComm',
    fullName: 'New Testament Commentary (Bruce, F.F.)',
    language: 'English',
    type: 'CommentaryResource',
    status: 'installedNeedsUpdate',
    lastUsedIso: daysAgo(30),
  },
  {
    id: 'r-sdbh',
    shortName: 'SDBH',
    fullName: 'Semantic Dictionary of Biblical Hebrew',
    language: 'Hebrew',
    type: 'EnhancedResource',
    status: 'installedResource',
  },
  {
    id: 'r-heb-lex',
    shortName: 'HebLex',
    fullName: 'Brown-Driver-Briggs Hebrew Lexicon',
    language: 'Hebrew',
    type: 'SourceLanguageResource',
    status: 'installedResource',
  },
  // A few more "Edited" (installedNeedsSync) projects to exercise the batch Sync affordance and
  // the sync-tooltip variants (both dates, local only, server only).
  {
    id: 'p-fr-lsg-draft',
    shortName: 'LSG-Draft',
    fullName: 'Louis Segond Revision Draft',
    language: 'French',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: hoursAgo(6),
    editedOnServerIso: daysAgo(1),
    editedLocallyIso: hoursAgo(4),
  },
  {
    id: 'p-sw-obt',
    shortName: 'SW-OBT',
    fullName: 'Swahili Old Testament Draft',
    language: 'Swahili',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: daysAgo(3),
    editedOnServerIso: daysAgo(10),
  },
  {
    id: 'p-de-nlv',
    shortName: 'DE-NLV',
    fullName: 'German New Living Version — In Progress',
    language: 'German',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: daysAgo(7),
    editedLocallyIso: daysAgo(2),
  },
  // A few more "Updated" (installedNeedsUpdate) resources so the Updated preset is meaningful.
  {
    id: 'r-web-audio',
    shortName: 'WEB-A',
    fullName: 'World English Bible (Audio Aligned)',
    language: 'English',
    type: 'ScriptureResource',
    status: 'installedNeedsUpdate',
    lastUsedIso: daysAgo(12),
  },
  {
    id: 'r-net-notes',
    shortName: 'NET-N',
    fullName: 'NET Bible Translation Notes',
    language: 'English',
    type: 'EnhancedResource',
    status: 'installedNeedsUpdate',
    lastUsedIso: daysAgo(22),
  },
  {
    id: 'r-greek-lex',
    shortName: 'BDAG',
    fullName: 'Bauer-Danker Greek-English Lexicon',
    language: 'Greek (Ancient)',
    type: 'SourceLanguageResource',
    status: 'installedNeedsUpdate',
  },
  {
    id: 's-sw-ntb',
    shortName: 'SW-NTB',
    fullName: 'Swahili New Testament — Beta',
    language: 'Swahili',
    type: 'Project',
    status: 'sharedNotInstalled',
  },
  {
    id: 's-quechua-nt',
    shortName: 'QUE-NT',
    fullName: 'Quechua New Testament (Draft)',
    language: 'Quechua',
    type: 'Project',
    status: 'sharedNotInstalled',
  },
];

// Deterministic pseudo-random so the generated catalog is stable across renders (important for
// autodocs and side-by-side visual review).
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const RESOURCE_KIND_LABEL: Record<UnifiedItemType, string> = {
  Project: 'Working Draft',
  ScriptureResource: 'Scripture Bundle',
  CommentaryResource: 'Reference Commentary',
  EnhancedResource: 'Enhanced Resource',
  SourceLanguageResource: 'Source Language Reference',
  XmlResource: 'XML Reference',
};

function buildDblCatalog(count: number): UnifiedItem[] {
  const rand = seededRandom(42);
  const items: UnifiedItem[] = [];
  for (let i = 0; i < count; i += 1) {
    const language = LANGUAGES[i % LANGUAGES.length];
    const type = DBL_TYPES[Math.floor(rand() * DBL_TYPES.length)];
    const sizeMb = Math.max(1, Math.round(rand() * 60));
    const shortName = shortNameFor(i);
    items.push({
      id: `d-${i}`,
      shortName,
      fullName: `${language} — ${RESOURCE_KIND_LABEL[type]} (${shortName})`,
      language,
      type,
      status: 'dblNotInstalled',
      sizeMb,
    });
  }
  return items;
}

// The full mock catalog: local rows first, then a large DBL discovery set. The initial fetch caps
// at INITIAL_PAGE items; the harness pages in the rest via onFetchMore.
const FULL_CATALOG: UnifiedItem[] = [...LOCAL_ITEMS, ...buildDblCatalog(240)];
const INITIAL_PAGE = 100;

const meta: Meta<typeof HomeUnified> = {
  title: 'Design ideas/Unified Home (Home + GetResources)',
  component: HomeUnified,
  parameters: {
    docs: {
      description: {
        component:
          'Prototype of a single, table-based Home view that merges installed projects, S/R-able ' +
          "projects on the server, and DBL resources into one search+filter surface. The user's " +
          "job — 'find and open my project/resource, no matter where it lives' — becomes one flow " +
          'instead of two disconnected screens (Home + Get Resources).',
      },
    },
  },
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof HomeUnified>;

// Wraps the component in a state harness so actions on rows visibly mutate the list. Reviewers can
// click Install/Get on a row and watch it go through in-flight → installed, click Sync to clear the
// "needs sync" state, and see the progressive-loading affordance kick in on scroll or filter.
function InteractiveHarness(overrides?: Partial<HomeUnifiedProps>) {
  const catalog = overrides?.items ?? FULL_CATALOG;
  return function InteractiveStory() {
    const [items, setItems] = useState<UnifiedItem[]>(() => catalog.slice(0, INITIAL_PAGE));
    const [inFlightIds, setInFlightIds] = useState<string[]>([]);
    const hasMore = items.length < catalog.length;

    // `catalog` is captured from the outer harness closure — it doesn't change across renders, so
    // omitting it from the deps array is correct and avoids the exhaustive-deps false positive that
    // would otherwise force a recreated callback on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleFetchMore = useCallback(() => {
      // Simulate a network round-trip so the "Loading more…" affordance is visible.
      setTimeout(() => {
        setItems(catalog);
      }, 400);
    }, []);

    const applyAction = useMemo(
      () =>
        (item: UnifiedItem, action: UnifiedItemAction): Promise<void> =>
          new Promise<void>((resolve) => {
            switch (action.kind) {
              case 'install':
              case 'get':
              case 'update': {
                setInFlightIds((prev) => [...prev, item.id]);
                setTimeout(() => {
                  setInFlightIds((prev) => prev.filter((id) => id !== item.id));
                  setItems((prev) =>
                    prev.map((current) => {
                      if (current.id !== item.id) return current;
                      // Projects sitting on the S/R server become editable local projects; DBL
                      // resources become installed resources. Updates just clear the update flag.
                      const nextStatus =
                        current.type === 'Project' ? 'installedProject' : 'installedResource';
                      // Intentionally leaving lastUsedIso untouched — Install/Get/Update change
                      // the item's *status*, not the user's usage history — so the row doesn't
                      // jump under "Recent" sort.
                      return { ...current, status: nextStatus };
                    }),
                  );
                  resolve();
                }, 900);
                break;
              }
              case 'sync': {
                setInFlightIds((prev) => [...prev, item.id]);
                setTimeout(() => {
                  setInFlightIds((prev) => prev.filter((id) => id !== item.id));
                  setItems((prev) =>
                    prev.map((current) =>
                      current.id === item.id
                        ? {
                            ...current,
                            status: 'installedProject',
                            // Same rationale as install/update: sync is a status change, not a
                            // fresh "opened" event. Leave lastUsedIso where it was so the row
                            // doesn't jump.
                            editedLocallyIso: undefined,
                            editedOnServerIso: undefined,
                          }
                        : current,
                    ),
                  );
                  resolve();
                }, 700);
                break;
              }
              case 'open':
                // Single-click Open bumps lastUsedIso so the row rises under "Recent" sort — that
                // matches what "last used" measures. Batch Open explicitly skips the bump so a
                // multiselect Open doesn't cascade-reorder every affected row.
                if (!action.batch) {
                  setItems((prev) =>
                    prev.map((current) =>
                      current.id === item.id
                        ? { ...current, lastUsedIso: new Date().toISOString() }
                        : current,
                    ),
                  );
                }
                resolve();
                break;
              case 'remove':
                setItems((prev) => prev.filter((current) => current.id !== item.id));
                resolve();
                break;
              default:
                resolve();
                break;
            }
          }),
      [],
    );

    return (
      <HomeUnified
        items={items}
        inFlightIds={inFlightIds}
        onItemAction={applyAction}
        hasMore={hasMore}
        onFetchMore={handleFetchMore}
        isLoading={overrides?.isLoading}
        variant={overrides?.variant}
        headerContent={
          overrides?.headerContent ?? (
            <div className="tw:flex tw:items-center tw:gap-2">
              <HomeIcon size={28} />
              <CardTitle>Home</CardTitle>
            </div>
          )
        }
      />
    );
  };
}

export const Default: Story = {
  render: InteractiveHarness(),
  parameters: {
    docs: {
      description: {
        story:
          'The full catalog: several installed projects/resources at the top, then the DBL ' +
          'discovery set. Only the first 100 items are loaded initially — scrolling near the ' +
          'bottom or applying any filter pages in the remaining ~150.',
      },
    },
  },
};

export const ButtonFiltersAndSrIntegration: Story = {
  render: InteractiveHarness({ variant: 'buttons' }),
  parameters: {
    docs: {
      description: {
        story:
          'Alternative layout: type filters shown as a horizontal row of big toggle buttons; the ' +
          'language filter shrinks to a count-only combobox with a hover tooltip listing the ' +
          'selected languages. Row names carry S/R-style status badges (Edited / Update / New / ' +
          'DBL), and Select All / None / Edited / New preselection buttons sit at the top-right ' +
          'of the table for quick multi-select from the send/receive dialog.',
      },
    },
  },
};

export const EmptyLocal: Story = {
  render: InteractiveHarness({
    items: buildDblCatalog(240),
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Brand-new install: nothing local, DBL discovery populates the list. "Only my ' +
          'languages" becomes inert (there are no local languages to seed from).',
      },
    },
  },
};

export const Loading: Story = {
  render: InteractiveHarness({ items: [], isLoading: true }),
};

export const NoResults: Story = {
  render: InteractiveHarness({ items: [] }),
  parameters: {
    docs: {
      description: {
        story: 'Zero items after data loads — shows the "browse DBL" empty-state prompt.',
      },
    },
  },
};
