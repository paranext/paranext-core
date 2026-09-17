import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { ZoomStepper } from './zoom-stepper.component';

const LABELS = {
  increase: 'Increase default zoom',
  decrease: 'Decrease default zoom',
  reset: 'Reset default zoom',
  atMaximum: 'Already at the largest zoom (300 %)',
  atMinimum: 'Already at the smallest zoom (50 %)',
  atDefault: 'Already at the default zoom',
};

const meta: Meta<typeof ZoomStepper> = {
  title: 'Settings/ZoomStepper',
  component: ZoomStepper,
  tags: ['autodocs'],
  args: {
    defaultValue: 1,
    labels: LABELS,
    groupLabel: 'Tab content default zoom',
    onChange: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof ZoomStepper>;

/** The default factor — reset is disabled since there is nothing to reset back to. */
export const Default: Story = {
  args: { value: 1 },
};

/** A factor the user has zoomed in from the default — reset is enabled. */
export const Zoomed: Story = {
  args: { value: 1.2 },
};

/** At the stepper's minimum — decrease is disabled, increase and reset are not. */
export const AtMinimum: Story = {
  args: { value: 0.5 },
};

/** At the stepper's maximum — increase is disabled, decrease and reset are not. */
export const AtMaximum: Story = {
  args: { value: 3 },
};

/** Every button disabled, e.g. while the setting is read-only during a Send/Receive. */
export const Disabled: Story = {
  args: { value: 1.2, disabled: true },
};
