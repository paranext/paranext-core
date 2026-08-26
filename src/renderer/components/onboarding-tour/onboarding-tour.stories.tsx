import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useState } from 'react';
import { persistDirection, readDirection } from 'platform-bible-react/experimental';
import {
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_PROJECT,
  SIMPLE_PANEL_ID_RESOURCES,
} from '@renderer/components/docking/simple-layout.data';
import { OnboardingTour } from './onboarding-tour.component';
import { resetTourDone } from './onboarding-tour.store';

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

/**
 * Stand-ins for the elements the tour anchors to in the running app: the three Simple-mode dock
 * columns (`data-dockid`) and the two toolbar controls (`data-testid`). Without them every step's
 * target selector misses, `Tour` filters the whole list away and the component renders nothing — so
 * the real five-stop composition (copy, card sides, spotlight padding) could only be reviewed by
 * launching Electron.
 *
 * The stand-ins mirror the real layout's shape — a toolbar row above three columns — because the
 * stops' `start`/`end` sides and the card's viewport clamping are only meaningful against a
 * plausible geometry.
 */
function SimpleModeScaffold() {
  return (
    <div className="tw:flex tw:h-screen tw:flex-col tw:bg-background tw:text-foreground">
      <div className="tw:flex tw:items-center tw:justify-end tw:gap-2 tw:border-b tw:border-border tw:p-2">
        <div data-testid="toolbar-sync-area" className="tw:rounded tw:bg-muted tw:px-3 tw:py-1">
          Sync
        </div>
        <div
          data-testid="user-profile-popover-trigger"
          className="tw:rounded tw:bg-muted tw:px-3 tw:py-1"
        >
          Profile
        </div>
      </div>
      <div className="tw:flex tw:min-h-0 tw:flex-1 tw:gap-1 tw:p-1">
        <div data-dockid={SIMPLE_PANEL_ID_PROJECT} className="tw:flex-1 tw:bg-muted tw:p-4">
          Project
        </div>
        <div data-dockid={SIMPLE_PANEL_ID_MODEL_TEXT} className="tw:flex-1 tw:bg-muted tw:p-4">
          Model text
        </div>
        <div data-dockid={SIMPLE_PANEL_ID_RESOURCES} className="tw:flex-1 tw:bg-muted tw:p-4">
          Resources and tools
        </div>
      </div>
    </div>
  );
}

/**
 * Clears the completion flag before the tour mounts, so re-opening the story re-runs the tour
 * instead of showing nothing after the first pass.
 */
function TourStory({ direction }: { direction: 'ltr' | 'rtl' }) {
  const [restoreDirection] = useState(() => {
    resetTourDone();
    const previous = readDirection();
    persistDirection(direction);
    return () => persistDirection(previous);
  });
  useEffect(() => restoreDirection, [restoreDirection]);
  return (
    <div dir={direction}>
      <SimpleModeScaffold />
      <OnboardingTour />
    </div>
  );
}

export const Default: Story = { render: () => <TourStory direction="ltr" /> };

/**
 * The same stops in a mirrored layout. Stop _order_ is deliberately not mirrored — it follows what
 * a new user needs to understand, not where the columns sit — so what changes here is only each
 * card's placement: `start`/`end` sides swap, and cards below a target hang from its right edge.
 */
export const RightToLeft: Story = {
  render: () => <TourStory direction="rtl" />,
  // Excluded from the docs page, which renders every story at once: both stories drive the same
  // global layout-direction store and the same anchor selectors, so side by side they would
  // clobber each other. View this one on its own canvas.
  parameters: { docs: { disable: true } },
};
