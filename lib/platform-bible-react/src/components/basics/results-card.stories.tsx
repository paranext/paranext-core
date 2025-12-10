import { ThemeProvider } from '@/storybook/theme-provider.component';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, Copy, ExternalLink, Settings } from 'lucide-react';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Badge } from '../shadcn-ui/badge';
import { DropdownMenuItem } from '../shadcn-ui/dropdown-menu';
import { ResultsCard } from './results-card.component';
import { ScrRef } from './scripture-reference-button.component';

const meta: Meta<typeof ResultsCard> = {
  title: 'Basics/ResultsCard',
  component: ResultsCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A base component for displaying results in a card format. It provides common functionality like selection state, dropdown menus, and expandable content.

**Features:**
- Selectable state with visual feedback
- Optional dropdown menu when selected
- Expandable additional content when selected
- Responsive design with proper accessibility
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-lg tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockDropdownContent = (
  <>
    <DropdownMenuItem>
      <BookOpen className="tw-mr-2 tw-h-4 tw-w-4" />
      View Details
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Copy className="tw-mr-2 tw-h-4 tw-w-4" />
      Copy Reference
    </DropdownMenuItem>
    <DropdownMenuItem>
      <ExternalLink className="tw-mr-2 tw-h-4 tw-w-4" />
      Open in New Tab
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="tw-mr-2 tw-h-4 tw-w-4" />
      Settings
    </DropdownMenuItem>
  </>
);

export const Default: Story = {
  args: {
    isSelected: false,
    onSelect: fn(),
    cardKey: 'default-card',
    scrRef: { startRef: { book: 'John', chapterAndVerse: '3:16' } },
    children: (
      <div className="tw-space-y-1">
        <h3 className="tw-text-lg tw-font-semibold">John 3:16</h3>
        <p className="tw-text-sm tw-text-muted-foreground">
          For God so loved the world that he gave his one and only Son, that whoever believes in him
          shall not perish but have eternal life.
        </p>
      </div>
    ),
  },
};

type CardConfig = {
  key: string;
  ref: ScrRef;
  endRef?: ScrRef;
  search?: string;
  badges?: string[];
  description: string;
  isDenied?: boolean;
  defaultSelected?: boolean;
};

export const CheckCards: Story = {
  render: () => {
    const checkCards: CardConfig[] = [
      {
        key: 'check-card-1',
        ref: { book: 'GEN', chapterAndVerse: '1:1' },
        badges: ['Setup required'],
        description: 'Invalid or unknown character: (',
      },
      {
        key: 'check-card-2',
        ref: { book: 'GEN', chapterAndVerse: '1:1' },
        search: '(',
        description: 'Invalid or unknown character: (',
        defaultSelected: false,
      },
      {
        key: 'check-card-2a',
        ref: { book: 'GEN', chapterAndVerse: '1:1' },
        search: 'Some a bit longer text',
        badges: ['Setup required'],
        description: 'Invalid or unknown character: (',
      },
      {
        key: 'check-card-3',
        ref: { book: 'GEN', chapterAndVerse: '1:1' },
        search: 'Invalid name Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch',
        badges: ['Denied', 'Setup required'],
        description:
          "There's a place in Scotland called Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch, which has the longest place name in Europe.",
        isDenied: true,
      },
    ];

    const defaultSelectedCard = checkCards.find((card) => card.defaultSelected)?.key;
    const [selectedCardKey, setSelectedCardKey] = useState<string | undefined>(defaultSelectedCard);

    return (
      <div className="tw-space-y-2">
        <p className="tw-mb-4 tw-text-sm tw-text-muted-foreground">
          Click a card to select it. Only one card can be selected at a time.
        </p>
        {checkCards.map((card) => {
          const isSelected = selectedCardKey === card.key;
          const accentColor = 'tw-bg-blue-500';

          return (
            <ResultsCard
              cardKey={card.key}
              scrRef={{
                startRef: card.ref,
                endRef: card.endRef,
                text: card.search,
              }}
              badges={card.badges?.map((badge) => (
                <Badge key={`${card.key}-${badge}`} className="tw-rounded-md" variant="muted">
                  {badge}
                </Badge>
              ))}
              isSelected={isSelected}
              isDenied={card.isDenied}
              accentColor={accentColor}
              onSelect={() => {
                console.log('Card selected:', card.key);
                setSelectedCardKey(card.key);
              }}
              onDoubleClick={() => console.log('Card double clicked:', card.key)}
              dropdownContent={mockDropdownContent}
              additionalSelectedContent={
                <Badge className="tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md tw-bg-blue-500">
                  Characters Check
                </Badge>
              }
            >
              {card.description}
            </ResultsCard>
          );
        })}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive collection of check cards demonstrating different statuses with single-selection behavior.',
      },
    },
  },
};

export const FindCards: Story = {
  render: () => {
    const findCards: CardConfig[] = [
      {
        key: 'find-card-1',
        ref: { book: 'GEN', chapterAndVerse: '1:1' },
        search: 'God',
        description: 'In the beginning God created the heavens and the earth.',
      },
      {
        key: 'find-card-2',
        ref: { book: 'GEN', chapterAndVerse: '1:3' },
        search: 'God',
        description: 'And God said, "Let there be light," and there was light.',
        defaultSelected: true,
      },
      {
        key: 'find-card-3',
        ref: { book: 'GEN', chapterAndVerse: '1:5' },
        search:
          'abc abc ThisIsAVeryLongTitleToTestOverflowHandlingEasily abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc',
        description:
          'God called the light "day," and the darkness he called "night." ThisIsAVeryLongTextToTestOverflowHandlingEasily And there was evening and there was morning, the first day. ',
      },
      {
        key: 'find-card-4',
        ref: { book: 'JHN', chapterAndVerse: '1:14' },
        endRef: { book: 'JHN', chapterAndVerse: '1:15' },
        search:
          'The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth. \v15 John testified concerning him. He cried out, saying, “This is the one I spoke about when I said, ‘He who comes after me has surpassed me because he was before me.’”)',
        description:
          'God called the light "day," and the darkness he called "night." ThisIsAVeryLongTextToTestOverflowHandlingEasily And there was evening and there was morning, the first day. ',
      },
    ];

    const defaultSelectedCard = findCards.find((card) => card.defaultSelected)?.key;
    const [selectedCardKey, setSelectedCardKey] = useState<string | undefined>(defaultSelectedCard);

    return (
      <div className="tw-space-y-2">
        <p className="tw-mb-4 tw-text-sm tw-text-muted-foreground">
          Click a card to select it. Only one card can be selected at a time.
        </p>
        {findCards.map((card) => {
          const isSelected = selectedCardKey === card.key;

          return (
            <ResultsCard
              cardKey={card.key}
              scrRef={{
                startRef: card.ref,
                endRef: card.endRef,
                text: card.search,
              }}
              isSelected={isSelected}
              onSelect={() => {
                console.log('Card selected:', card.key);
                setSelectedCardKey(card.key);
              }}
              onDoubleClick={() => console.log('Card double clicked:', card.key)}
              dropdownContent={mockDropdownContent}
              additionalSelectedContent={
                <div className="tw-text-xs tw-font-medium tw-text-muted-foreground">
                  {card.description}
                </div>
              }
            />
          );
        })}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive collection of check cards demonstrating different statuses with single-selection behavior.',
      },
    },
  },
};
