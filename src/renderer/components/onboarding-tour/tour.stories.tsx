import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useState } from 'react';
import { persistDirection, readDirection } from 'platform-bible-react/experimental';
import { Tour } from './tour.component';

const meta: Meta<typeof Tour> = {
  title: 'Advanced/Tour',
  component: Tour,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Tour>;

function StoryWrapper() {
  const [open, setOpen] = useState(true);
  return (
    <div className="tw:flex tw:gap-8 tw:p-10">
      <div
        id="tour-demo-box-1"
        className="tw:h-30 tw:w-50 tw:rounded-lg tw:bg-muted tw:p-4 tw:text-muted-foreground"
      >
        Box A
      </div>
      <div
        id="tour-demo-box-2"
        className="tw:h-30 tw:w-50 tw:rounded-lg tw:bg-accent tw:p-4 tw:text-accent-foreground"
      >
        Box B
      </div>
      <Tour
        open={open}
        steps={[
          {
            target: '#tour-demo-box-1',
            title: 'Box A',
            description: 'Demonstrates the spotlight effect.',
            side: 'end',
          },
          {
            target: '#tour-demo-box-2',
            title: 'Box B',
            description: 'Click Done to finish.',
            side: 'bottom',
          },
          // Deliberately-missing target proves the step is skipped, not fatal:
          {
            target: '#does-not-exist',
            title: 'Skipped',
            description: 'You should never see this.',
          },
        ]}
        onDone={() => setOpen(false)}
        onSkip={() => setOpen(false)}
      />
    </div>
  );
}

export const Default: Story = { render: () => <StoryWrapper /> };

/**
 * Same two stops in a genuinely mirrored layout. Use this to check both direction-sensitive
 * behaviours by eye: the logical `end` side resolves to the target's left, and the `bottom` card
 * hangs from the target's right (inline-start) edge rather than its left.
 *
 * Both halves of the mirror are set here on purpose. `readDirection()` is what the tour reads, but
 * it reports the app's _global UI_ direction — it is not by itself evidence that any given
 * container's children are laid out mirrored. Setting `dir` on the wrapper as well is what makes
 * that premise true in the story, so a card that lands in the wrong place is visible rather than
 * masked by boxes that never moved.
 */
function RightToLeftWrapper() {
  const [restoreDirection] = useState(() => {
    const previous = readDirection();
    persistDirection('rtl');
    return () => persistDirection(previous);
  });
  useEffect(() => restoreDirection, [restoreDirection]);
  return (
    <div dir="rtl">
      <StoryWrapper />
    </div>
  );
}

export const RightToLeft: Story = {
  render: () => <RightToLeftWrapper />,
  // Excluded from the docs page, which renders every story at once: both stories drive the same
  // global layout-direction store, so side by side they would clobber each other. View this one on
  // its own canvas.
  parameters: { docs: { disable: true } },
};
