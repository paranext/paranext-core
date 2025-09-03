import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SearchResult, { SearchResultProps } from './search-result.component';
import { ReactElement } from 'react';

const meta: Meta<typeof SearchResult> = {
  title: 'Bundled Extensions/platform-scripture/search-result',
  component: SearchResult,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
};
export default meta;

type Story = StoryObj<typeof SearchResult>;

function DefaultDecorator(Story: (update?: { args: SearchResultProps }) => ReactElement) {
  return (
    <Story
      args={{
        localizedBookData: new Map([['GEN', { localizedId: 'Genesis' }]]),
        searchResult: {
          verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, // mock verseRef object
          text: 'In the beginning God created the heavens and the earth.', // mock text
        },
        occurrenceInVerseIndex: 0,
        globalResultsIndex: 0,
        isSelected: false,
        projectId: 'project-id',
        onResultClick: () => {},
        onHideResult: () => {},
      }}
    />
  );
}

export const Default: Story = {
  decorators: [DefaultDecorator],
};
