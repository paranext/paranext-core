import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tour } from './tour.component';

const meta: Meta<typeof Tour> = {
  title: 'Advanced/Tour',
  component: Tour,
  tags: ['autodocs', 'test'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Tour>;

function StoryWrapper() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: 40, display: 'flex', gap: 32 }}>
      <div
        id="tour-demo-box-1"
        style={{ width: 200, height: 120, background: '#e0f2fe', borderRadius: 8, padding: 16 }}
      >
        Box A
      </div>
      <div
        id="tour-demo-box-2"
        style={{ width: 200, height: 120, background: '#fef9c3', borderRadius: 8, padding: 16 }}
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
            side: 'end',
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
