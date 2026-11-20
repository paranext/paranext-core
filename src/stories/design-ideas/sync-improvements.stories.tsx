/*
 * Design-ideas story: improvements to Send/Receive. A placeholder until the designs exist; when
 * they do, they also join the full window in Design ideas/Unified designs.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Card, CardDescription, CardHeader, CardTitle } from 'platform-bible-react';

const STRINGS = {
  title: 'Sync improvements',
  placeholder: 'Designs for improving Send/Receive will go here.',
} as const;

function SyncImprovementsPlaceholder() {
  return (
    <div className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-muted/40 tw:p-6">
      <Card className="tw:max-w-md">
        <CardHeader>
          <CardTitle>{STRINGS.title}</CardTitle>
          <CardDescription>{STRINGS.placeholder}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

const meta: Meta<typeof SyncImprovementsPlaceholder> = {
  title: 'Design ideas/Sync improvements',
  component: SyncImprovementsPlaceholder,
  parameters: { layout: 'fullscreen' },
  tags: ['!autodocs'],
};
export default meta;

type Story = StoryObj<typeof SyncImprovementsPlaceholder>;

export const Placeholder: Story = {};
