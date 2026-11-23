import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MOCK_COPYRIGHT_TEXT } from '../../data/marble-form.story-data';
import { CopyrightOverlay, COPYRIGHT_OVERLAY_STRING_KEYS } from './copyright-overlay.component';

const localizedStrings = getLocalizedStrings([...COPYRIGHT_OVERLAY_STRING_KEYS]);

const meta: Meta<typeof CopyrightOverlay> = {
  title: 'Bundled Extensions/platform-enhanced-resources/CopyrightOverlay',
  component: CopyrightOverlay,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    copyrightInfo: MOCK_COPYRIGHT_TEXT,
  },
};
export default meta;

type Story = StoryObj<typeof CopyrightOverlay>;

/**
 * [Revised: 2026-04-29] Theme 4 + Theme 12 — fully interactive default story driven by `useState`.
 * The "Show copyright" button toggles the controlled `open` prop; closing the Dialog (button, Esc,
 * or overlay click) updates the state via `onOpenChange`. Replaces the previous `Visible` /
 * `Dismissed` static variants because both are reachable via this interactive flow.
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 16 }}>
        <Button onClick={() => setOpen(true)}>Show copyright</Button>
        <CopyrightOverlay
          localizedStringsWithLoadingState={[localizedStrings, false]}
          copyrightInfo={MOCK_COPYRIGHT_TEXT}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};

/**
 * Empty copyrightInfo — renders the localized "no copyright information" fallback. Unreachable from
 * the interactive flow because the default story always supplies MOCK_COPYRIGHT_TEXT.
 */
export const EmptyCopyrightInfo: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ padding: 16 }}>
        <Button onClick={() => setOpen(true)}>Show copyright</Button>
        <CopyrightOverlay
          localizedStringsWithLoadingState={[localizedStrings, false]}
          copyrightInfo={undefined}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};
