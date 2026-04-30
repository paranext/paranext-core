import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  DictionarySenseItem,
  DICTIONARY_SENSE_ITEM_STRING_KEYS,
  type DictionarySenseDisplay,
} from './dictionary-sense-item.component';

const localizedStrings = getLocalizedStrings([...DICTIONARY_SENSE_ITEM_STRING_KEYS]);

/**
 * Hebrew elohim (gm-020 fixture). Demonstrates a relevant sense with a single Glosses value, two
 * Domain rows (repeating row label), and an Occurrences-in-all-books link.
 */
const RELEVANT_SENSE: DictionarySenseDisplay = {
  id: 'sense-1',
  senseNumber: 1,
  definition: 'The supreme deity of Israel; the one true God.',
  glosses: 'God',
  domains: [
    { id: 'sd-deity', label: 'Deity' },
    { id: 'sd-creator', label: 'Creator' },
  ],
  notes: 'Plural form used grammatically; majestic plural for a single God.',
  comment: 'Used ~2,600 times in the Hebrew Bible.',
  occurrencesInAllBooksCount: 2200,
  isRelevant: true,
};

/**
 * A sense flagged as non-relevant for the current verse - demonstrates the dimmed appearance and
 * the Comments-and-Notes optional row.
 */
const NON_RELEVANT_SENSE: DictionarySenseDisplay = {
  id: 'sense-2',
  senseNumber: 2,
  definition: 'A general term for divine beings or judges acting on behalf of God.',
  glosses: 'gods, rulers, judges',
  domains: [{ id: 'sd-judges', label: 'Authority > Judges' }],
  commentsAndNotes: 'Also used poetically for angelic beings.',
  occurrencesInAllBooksCount: 402,
  isRelevant: false,
};

const meta: Meta<typeof DictionarySenseItem> = {
  title: 'Bundled Extensions/platform-enhanced-resources/Shared/DictionarySenseItem',
  component: DictionarySenseItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pure presentational sense row used by DictionaryEntryDetail. Renders a sense number, a description, an "Occurrences in all books" link, and an optional table of Glosses / Domain / Notes / Comment / Comments-and-Notes rows that mirrors PT9.',
      },
    },
  },
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      <div className="tw-w-[480px] tw-p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DictionarySenseItem>;

/**
 * Default - fully interactive. The wrapper exposes a "Hide non-relevant" toggle plus a "Toggle
 * relevance" control so reviewers can flip the same sense between relevant and non-relevant states,
 * and observe the per-sense "Occurrences in all books" link routing through the wrapper's own click
 * counter (no parent component needed for this experience).
 */
function InteractiveSenseDemo() {
  const [hideNonRelevant, setHideNonRelevant] = useState(false);
  const [isRelevant, setIsRelevant] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const sense: DictionarySenseDisplay = isRelevant ? RELEVANT_SENSE : NON_RELEVANT_SENSE;

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-text-xs">
        <label className="tw-flex tw-items-center tw-gap-1">
          <input
            type="checkbox"
            checked={hideNonRelevant}
            onChange={(e) => setHideNonRelevant(e.target.checked)}
          />
          Hide non-relevant
        </label>
        <label className="tw-flex tw-items-center tw-gap-1">
          <input
            type="checkbox"
            checked={isRelevant}
            onChange={(e) => setIsRelevant(e.target.checked)}
          />
          Mark as relevant
        </label>
        <span className="tw-text-muted-foreground">
          Occurrences-link clicks: <strong>{clickCount}</strong>
        </span>
      </div>
      <DictionarySenseItem
        sense={sense}
        hideNonRelevant={hideNonRelevant}
        onSenseOccurrencesClick={() => setClickCount((c) => c + 1)}
        localizedStringsWithLoadingState={[localizedStrings, false]}
      />
    </div>
  );
}

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <InteractiveSenseDemo />,
};

/**
 * NonRelevantHidden - unreachable from Default because the interactive demo cannot stay rendering a
 * non-relevant sense while hideNonRelevant is on (the component returns nothing). This story
 * captures that the empty render is correct.
 */
export const NonRelevantHidden: Story = {
  args: {
    sense: NON_RELEVANT_SENSE,
    hideNonRelevant: true,
  },
};
