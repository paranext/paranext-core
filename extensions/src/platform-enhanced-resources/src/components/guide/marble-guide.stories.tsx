import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MarbleGuide, MARBLE_GUIDE_STRING_KEYS } from './marble-guide.component';

const localizedStrings = getLocalizedStrings([...MARBLE_GUIDE_STRING_KEYS]);

const meta: Meta<typeof MarbleGuide> = {
  title: 'Bundled Extensions/platform-enhanced-resources/MarbleGuide',
  component: MarbleGuide,
  tags: ['autodocs'],
  args: {
    open: true,
    neverShowAgain: false,
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
  decorators: [
    (Story) => (
      // The Dialog renders into a portal at document.body, so the surrounding container exists
      // mostly to provide a stable backdrop in the Storybook canvas.
      <div className="tw-relative tw-h-[720px] tw-w-[1024px] tw-border tw-border-border tw-bg-muted/40">
        <div className="tw-p-4 tw-text-sm tw-text-muted-foreground">
          MarbleGuide Dialog renders in a portal - look at the centred modal.
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MarbleGuide>;

/**
 * Default state - the guide is open with the "Don't show this again" checkbox unchecked. Matches
 * the first-time auto-show UX where the user has not yet opted out.
 */
export const Default: Story = {
  args: {
    open: true,
    neverShowAgain: false,
  },
};

/**
 * The user has ticked "Don't show this again" before pressing Close. On close the parent will
 * persist `showGuide = false` so the guide does not auto-show in future sessions.
 */
export const NeverShowAgainChecked: Story = {
  args: {
    open: true,
    neverShowAgain: true,
  },
};

/**
 * Sanity check: dialog with `open={false}` renders nothing visible. Useful to verify the parent's
 * controlled-open contract.
 */
export const Closed: Story = {
  args: {
    open: false,
    neverShowAgain: false,
  },
};

/**
 * Interactive story - exercises the controlled-open + controlled-checkbox flow from a parent's
 * perspective. The reopen button demonstrates how a toolbar info-icon would re-trigger the guide
 * after the user closes it.
 */
export const Interactive: Story = {
  render: function InteractiveStory() {
    const [open, setOpen] = useState(true);
    const [neverShowAgain, setNeverShowAgain] = useState(false);

    const handleClose = useCallback(() => {
      // In production wiring this is also where ShowMarbleGuide = !neverShowAgain is persisted.
      setOpen(false);
    }, []);

    return (
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-flex tw-items-center tw-gap-3">
          <Button type="button" onClick={() => setOpen(true)} data-testid="story-reopen-button">
            Reopen guide
          </Button>
          <span className="tw-text-sm tw-text-muted-foreground">
            neverShowAgain = {neverShowAgain ? 'true' : 'false'}
          </span>
        </div>
        <MarbleGuide
          open={open}
          neverShowAgain={neverShowAgain}
          onClose={handleClose}
          onNeverShowAgainChange={setNeverShowAgain}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
      </div>
    );
  },
};
