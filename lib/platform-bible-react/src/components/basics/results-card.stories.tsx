import { ThemeProvider } from '@/storybook/theme-provider.component';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, Copy, ExternalLink, Settings } from 'lucide-react';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { DropdownMenuItem } from '../shadcn-ui/dropdown-menu';
import { ResultsCard } from './results-card.component';
import { Badge } from '../shadcn-ui/badge';

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
  title: string;
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
        title: 'GEN 1:1',
        badges: ['Setup required'],
        description: 'Invalid or unknown character: (',
      },
      {
        key: 'check-card-2',
        title: 'GEN 1:1',
        badges: ['Setup required'],
        description: 'Invalid or unknown character: (',
        defaultSelected: true,
      },
      {
        key: 'check-card-3',
        title: 'GEN 1:1',
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
              isSelected={isSelected}
              isDenied={card.isDenied}
              accentColor={accentColor}
              onSelect={() =>
                setSelectedCardKey((current) => (current === card.key ? undefined : card.key))
              }
              dropdownContent={mockDropdownContent}
              additionalSelectedContent={
                <Badge className="tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md tw-bg-blue-500">
                  Characters Check
                </Badge>
              }
            >
              <div className="tw-flex tw-flex-col tw-gap-2">
                <div className="tw-flex tw-items-center tw-gap-2 tw-overflow-hidden">
                  <span className="tw-shrink-0 tw-text-nowrap tw-text-xs tw-font-medium">
                    {card.title}
                  </span>
                  {card.badges &&
                    card.badges.map((badge) => (
                      <Badge
                        key={`${card.key}-${badge}`}
                        className="tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md"
                        variant="secondary"
                      >
                        {badge}
                      </Badge>
                    ))}
                </div>
                <span className="tw-font-regular tw-overflow-hidden tw-text-ellipsis tw-text-xs tw-text-muted-foreground">
                  {card.description}
                </span>
              </div>
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
        title: 'GEN 1:1 God',
        description: 'In the beginning God created the heavens and the earth.',
      },
      {
        key: 'find-card-2',
        title: 'GEN 1:3 God',
        description: 'And God said, "Let there be light," and there was light.',
        defaultSelected: true,
      },
      {
        key: 'find-card-3',
        title: 'GEN 1:5 God',
        description:
          'God called the light "day," and the darkness he called "night." And there was evening and there was morning, the first day.',
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
              isSelected={isSelected}
              onSelect={() =>
                setSelectedCardKey((current) => (current === card.key ? undefined : card.key))
              }
              dropdownContent={mockDropdownContent}
              additionalSelectedContent={
                <div className="tw-text-xs tw-font-medium tw-text-muted-foreground">
                  {card.description}
                </div>
              }
            >
              <div className="tw-text-xs tw-font-medium">{card.title}</div>
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
