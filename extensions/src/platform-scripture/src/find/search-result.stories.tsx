import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SearchResult, { SearchResultProps } from './search-result.component';
import { ReactElement, useState } from 'react';
import { LocalizeKey } from 'platform-bible-utils';

const meta: Meta<typeof SearchResult> = {
  title: 'Bundled Extensions/platform-scripture/search-result',
  component: SearchResult,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
};
export default meta;

type Story = StoryObj<typeof SearchResult>;

const localizedBookData = new Map([['GEN', { localizedId: 'Genesis' }]]);
const verseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 }; // mock verseRef object
const currentVerseUsfm = '\\v1 In the beginning God created the heavens and the earth.'; // mock usfm text
const text = 'In the beginning'; // mock verse text
type LocalizedStrings = Record<LocalizeKey, string>;
const dummyLocalizedStrings = (keys: LocalizeKey[]): [LocalizedStrings, boolean] => [
  Object.fromEntries(keys.map((k) => [k, k])) as LocalizedStrings,
  false,
];

function DefaultDecorator(Story: (update?: { args: SearchResultProps }) => ReactElement) {
  const [selectedResult, setSelectedResult] = useState<number | undefined>();

  return (
    <>
      <Story
        args={{
          localizedBookData,
          searchResult: {
            verseRef,
            text,
          },
          occurrenceInVerseIndex: 0,
          globalResultsIndex: 0,
          isSelected: selectedResult === 0,
          onResultClick: () => setSelectedResult(selectedResult === 0 ? undefined : 0),
          onHideResult: () => {},
          useLocalizedStrings: dummyLocalizedStrings,
          currentVerseUsfm,
        }}
      />
      <Story
        args={{
          localizedBookData,
          searchResult: {
            verseRef,
            text,
          },
          occurrenceInVerseIndex: 0,
          globalResultsIndex: 1,
          isSelected: selectedResult === 1,
          onResultClick: () => setSelectedResult(selectedResult === 1 ? undefined : 1),
          onHideResult: () => {},
          useLocalizedStrings: dummyLocalizedStrings,
          currentVerseUsfm,
        }}
      />
    </>
  );
}

export const Default: Story = {
  decorators: [DefaultDecorator],
};
