import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScriptureResultsViewer } from '@/components/advanced/scripture-results-viewer/scripture-results-viewer.component';
import { Button } from '@/components/shadcn-ui/button';
import { useState } from 'react';
import { generateRandomCheckingData } from '@/storybook/generate-random-checking-data';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof ScriptureResultsViewer> = {
  title: 'Advanced/ScriptureResultsViewer',
  component: ScriptureResultsViewer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    scriptureReferenceColumnName: { control: 'text' },
    typeColumnName: { control: 'text' },
    detailsColumnName: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ScriptureResultsViewer>;

const sampleChecks = [
  {
    id: 'preview.repeatedWords',
    displayName: 'Repeated Words',
    possibleErrors: ['Word repeated'],
  },
  {
    id: 'preview.characters',
    displayName: 'Characters',
    possibleErrors: ['Invalid character', 'Unknown character'],
  },
  {
    id: 'preview.quotationMarks',
    displayName: 'Quotation Marks',
    possibleErrors: [
      'Closing first-level quotation mark missing',
      'Closing second-level quotation mark missing',
      'Closing third-level quotation mark missing',
      'Missing continuer',
    ],
  },
  {
    id: 'preview.chapterVerseNumbers',
    displayName: 'Chapter/Verse Numbers',
    possibleErrors: [
      'Missing Verse number',
      'Missing chapter',
      'Empty verse',
      'Verse out of order',
      'Repeated verse number',
    ],
  },
];

const staticSources = sampleChecks.map((check) => ({
  source: check,
  data: generateRandomCheckingData(check.possibleErrors),
}));

export const Default: Story = {
  args: {
    sources: staticSources,
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details',
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer showing checking data with default column names.',
      },
    },
  },
};

export const CustomColumnNames: Story = {
  args: {
    sources: staticSources,
    scriptureReferenceColumnName: 'Reference',
    typeColumnName: 'Issue Type',
    detailsColumnName: 'Description',
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer with custom column names.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    sources: [],
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details',
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer with no data sources.',
      },
    },
  },
};

export const SingleCheck: Story = {
  args: {
    sources: [
      {
        source: sampleChecks[0],
        data: generateRandomCheckingData(sampleChecks[0].possibleErrors),
      },
    ],
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details',
  },
  parameters: {
    docs: {
      description: {
        story: 'A scripture results viewer showing results from a single check.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [sources, setSources] = useState(() =>
      sampleChecks.map((check) => ({
        source: check,
        data: generateRandomCheckingData(check.possibleErrors),
      })),
    );

    const updateSource = (index: number) => {
      const newData = generateRandomCheckingData(sampleChecks[index].possibleErrors);
      const updatedSource = {
        ...sources[index],
        data: newData,
      };

      const updatedSources = [...sources];
      updatedSources[index] = updatedSource;
      setSources(updatedSources);
    };

    return (
      <div className="tw-h-96 tw-overflow-y-hidden">
        <div className="tw-mb-4">
          {sampleChecks.map((check, index) => (
            <Button
              key={check.id}
              type="button"
              onClick={() => updateSource(index)}
              className="tw-mb-2 tw-mr-2"
            >
              Update {check.displayName} check results
            </Button>
          ))}
        </div>
        <ScriptureResultsViewer {...args} sources={sources} />
      </div>
    );
  },
  args: {
    scriptureReferenceColumnName: 'Scripture Reference',
    typeColumnName: 'Check Type',
    detailsColumnName: 'Error Details',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive scripture results viewer where you can update check results dynamically, matching the original example.',
      },
    },
  },
};
