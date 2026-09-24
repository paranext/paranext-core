import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavigationHistoryButtons,
  NavigationHistoryButtonsProps,
} from './navigation-history-buttons.component';

const meta: Meta<typeof NavigationHistoryButtons> = {
  title: 'Advanced/NavigationHistoryButtons',
  component: NavigationHistoryButtons,
  tags: ['autodocs', 'test'],
};

export default meta;

type Story = StoryObj<typeof NavigationHistoryButtons>;

const baseProps: NavigationHistoryButtonsProps = {
  canGoBack: true,
  canGoForward: true,
  backItems: [
    { label: 'Genesis 1:1', offset: -1 },
    { label: 'Exodus 5:1', offset: -2 },
    { label: 'Mark 4:1', offset: -3 },
  ],
  forwardItems: [{ label: 'Luke 2:1', offset: 1 }],
  onNavigate: (offset) => console.log('Navigate by offset:', offset),
  localizedStrings: {
    '%navigationHistory_back_tooltip%': 'Go back one reference',
    '%navigationHistory_forward_tooltip%': 'Go forward one reference',
    '%navigationHistory_backList_ariaLabel%': 'Back history',
    '%navigationHistory_forwardList_ariaLabel%': 'Forward history',
  },
};

export const Default: Story = { args: baseProps };

export const Empty: Story = {
  args: { ...baseProps, canGoBack: false, canGoForward: false, backItems: [], forwardItems: [] },
};
