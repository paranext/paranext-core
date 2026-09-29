import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, fn } from 'storybook/test';
import { ZoomStepper } from './zoom-stepper.component';

const LABELS = {
  increase: 'Increase default zoom',
  decrease: 'Decrease default zoom',
  reset: 'Reset default zoom',
  atMaximum: 'Already at the largest zoom (300 %)',
  atMinimum: 'Already at the smallest zoom (50 %)',
  atDefault: 'Already at the default zoom',
  percentInput: 'Percentage',
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

/**
 * A container too narrow for both groups side by side: `−` and `+` stay on top, and the percentage
 * field and reset wrap underneath.
 */
export const Narrow: Story = {
  args: { value: 1.2 },
  decorators: [
    (Story) => (
      <div style={{ width: '7rem' }}>
        <Story />
      </div>
    ),
  ],
};

/** The percentage field takes a typed whole percentage, committed on Enter. */
export const TypedPercentage: Story = {
  args: { value: 1 },
  play: async ({ args, canvas, userEvent, step }) => {
    const field = canvas.getByRole('textbox', { name: 'Percentage' });
    await step('Type 137 and press Enter', async () => {
      await userEvent.clear(field);
      await userEvent.type(field, '137{Enter}');
    });
    await step('The typed percentage is committed as a factor', async () => {
      await expect(args.onChange).toHaveBeenCalledWith(1.37);
      await expect(field).toHaveDisplayValue(/^137\s%$/u);
    });
  },
};
