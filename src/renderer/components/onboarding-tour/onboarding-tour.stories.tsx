import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { OnboardingTour } from './onboarding-tour.component';

const meta: Meta<typeof OnboardingTour> = {
  title: 'Advanced/OnboardingTour',
  component: OnboardingTour,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'One-shot Simple-mode orientation tour. Only shows when: Simple mode, first-run complete, tour not yet done.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof OnboardingTour>;

// OnboardingTour requires a live Simple-mode dock layout with real panel IDs in the DOM to show
// tour steps. In Storybook, the dock panels are absent so the Tour's step-filter finds no targets
// and the component renders null. This story is useful for verifying the component mounts without
// crashing — use the live app with localStorage.removeItem('platform-bible.onboardingTourComplete')
// to see the full tour.
export const Default: Story = {};
