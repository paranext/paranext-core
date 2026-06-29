import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useState } from 'react';
import type { HyphenationEntry } from 'platform-scripture';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { Hyphenation, HyphenationProps } from './hyphenation.component';
import { HYPHENATION_STRING_KEYS, HyphenationLocalizedStrings } from './hyphenation.utils';

// Resolve localization keys from the repo's locale files (all hyphenation keys are contributed in
// extensions/src/platform-scripture/contributions/localizedStrings.json)
const localizedStringsForStories: HyphenationLocalizedStrings = getLocalizedStrings([
  ...HYPHENATION_STRING_KEYS,
]);

/** Sample entries shaped like a PT9-generated hyphenatedWords.txt (mix of approved + guesses) */
const sampleEntries: HyphenationEntry[] = [
  { word: 'abafarisi', hyphenation: 'a=ba=fa=ri=si', isApproved: true },
  { word: 'beginning', hyphenation: 'be=gin=ning', isApproved: true },
  { word: 'created', hyphenation: 'cre=at=ed', isApproved: false },
  { word: 'darkness', hyphenation: 'dark=ness', isApproved: false },
  { word: 'earth', hyphenation: 'earth', isApproved: false },
  { word: 'firmament', hyphenation: 'fir=ma=ment', isApproved: true },
  { word: 'gathered', hyphenation: 'gath=ered', isApproved: false },
  { word: 'heaven', hyphenation: 'heav=en', isApproved: false },
  { word: 'jerusalem', hyphenation: 'jerusalem', isApproved: true },
  { word: 'lights', hyphenation: 'lights', isApproved: false },
  { word: 'morning', hyphenation: 'morn=ing', isApproved: false },
  { word: 'waters', hyphenation: 'wa=ters', isApproved: false },
];

/**
 * Stateful harness so reviewers can exercise the full add/edit/approve/delete flow in Storybook.
 * Mutations apply to local state, mimicking the data provider's behavior (lowercasing words,
 * sorting by word).
 */
function InteractiveHyphenation({ entries: initialEntries, ...props }: Partial<HyphenationProps>) {
  const [entries, setEntries] = useState<HyphenationEntry[]>(initialEntries ?? sampleEntries);

  const handleSaveEntry = useCallback(
    async (word: string, hyphenation: string, isApproved: boolean) => {
      const lowercaseWord = word.toLowerCase();
      setEntries((previous) => {
        const next = previous.filter((entry) => entry.word !== lowercaseWord);
        next.push({
          word: lowercaseWord,
          hyphenation: hyphenation.toLowerCase(),
          isApproved,
        });
        next.sort((a, b) => (a.word < b.word ? -1 : 1));
        return next;
      });
      return undefined;
    },
    [],
  );

  const handleDeleteEntry = useCallback(async (word: string) => {
    setEntries((previous) => previous.filter((entry) => entry.word !== word));
    return undefined;
  }, []);

  return (
    <div className="tw:h-[600px]">
      <Hyphenation
        isLoading={false}
        localizedStrings={localizedStringsForStories}
        {...props}
        entries={entries}
        onSaveEntry={handleSaveEntry}
        onDeleteEntry={handleDeleteEntry}
      />
    </div>
  );
}

const meta: Meta<typeof Hyphenation> = {
  title: 'Extensions/Platform Scripture/Hyphenation',
  component: Hyphenation,
  tags: ['autodocs', 'test'],
};

export default meta;

type Story = StoryObj<typeof InteractiveHyphenation>;

/** Typical project with a mix of approved and guessed hyphenations */
export const Default: Story = {
  render: () => <InteractiveHyphenation />,
};

/** Project with no hyphenation data yet (no hyphenatedWords.txt) */
export const Empty: Story = {
  render: () => <InteractiveHyphenation entries={[]} />,
};

/** File-cleanup notices shown when the file was edited outside Paratext (PT9 parity) */
export const WithFileNotices: Story = {
  render: () => <InteractiveHyphenation hadRedundancy hadUppercase />,
};

/** Loading state while entries are fetched from the data provider */
export const Loading: Story = {
  render: () => (
    <div className="tw:h-[600px]">
      <Hyphenation
        entries={[]}
        isLoading
        localizedStrings={localizedStringsForStories}
        onSaveEntry={async () => undefined}
        onDeleteEntry={async () => undefined}
      />
    </div>
  ),
};

/** Right-to-left project text direction (words render RTL; UI chrome stays LTR) */
export const RightToLeftProject: Story = {
  render: () => (
    <InteractiveHyphenation
      projectTextDirection="rtl"
      entries={[
        { word: 'בראשית', hyphenation: 'ברא=שית', isApproved: true },
        { word: 'אלהים', hyphenation: 'אל=הים', isApproved: false },
      ]}
    />
  ),
};
