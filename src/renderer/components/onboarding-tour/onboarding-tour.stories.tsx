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

// Storybook cannot fully replicate the real app's dock layout DOM, so the Tour's
// target selectors won't find their targets in stories. The Tour component renders
// null when no target is found, making this story primarily useful for
// verifying that OnboardingTour mounts and conditionally renders.
export const Default: Story = {};
