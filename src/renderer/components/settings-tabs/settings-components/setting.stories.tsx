import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ReactNode } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Setting } from './setting.component';
import './settings.component.scss';

/** Sized like a settings card, so the label and control share a row as they do in the tab. */
function SettingCard({ children }: { children: ReactNode }) {
  return <div style={{ width: 600, maxWidth: '100%', padding: 16 }}>{children}</div>;
}

const projectSettingProps = {
  setSetting: fn(async () => undefined),
  isLoading: false,
  validateProjectSetting: fn(async () => true),
};

const meta: Meta<typeof Setting> = {
  title: 'Settings/Setting',
  component: Setting,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SettingCard>
        <Story />
      </SettingCard>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Setting>;

/** An editable setting with a description: the info button beside the label shows it. */
export const WithDescription: Story = {
  render: () => (
    <Setting
      {...projectSettingProps}
      settingKey="platform.fullName"
      setting="World English Bible"
      label="Project full name"
      description="The project's full name, shown wherever there is room for more than its short name."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The info button sits beside the label, ahead of the control, so it is the first tab stop.
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: /Project full name/ })).toHaveFocus();
  },
};

/** No description, so no info button. */
export const WithoutDescription: Story = {
  render: () => (
    <Setting
      {...projectSettingProps}
      settingKey="platform.fullName"
      setting="World English Bible"
      label="Project full name"
    />
  ),
};

/** A registered project's name: read-only, with the reason under the field. */
export const LockedTextWithReason: Story = {
  render: () => (
    <Setting
      {...projectSettingProps}
      settingKey="platform.fullName"
      setting="World English Bible"
      label="Project full name"
      description="The project's full name, shown wherever there is room for more than its short name."
      readOnly
      lockReason="Change this name in the Paratext Registry."
    />
  ),
};

/** A switch has no read-only state, so a locked one is disabled, with the reason under it. */
export const LockedSwitchWithReason: Story = {
  render: () => (
    <Setting
      {...projectSettingProps}
      settingKey="platform.isEditable"
      setting
      label="Is editable"
      readOnly
      lockReason="Only a project administrator can change this."
    />
  ),
};

/**
 * Locked with no reason under it: a setting contributed read-only, or any setting of a published
 * project, where the Settings tab says why once, above all of the project's settings.
 */
export const LockedWithoutReason: Story = {
  render: () => (
    <Setting
      {...projectSettingProps}
      settingKey="platformScripture.validCharacters"
      setting="a b c d e"
      label="Valid characters"
      readOnly
    />
  ),
};
