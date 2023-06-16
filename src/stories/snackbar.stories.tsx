import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, Button } from 'papi-components';

//
const defaultSnackbarAction = <Button>Close</Button>;

const meta: Meta<typeof Snackbar> = {
  title: 'Basics/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    message: { control: 'text' },
    autoHideDuration: { control: 'number' },
    className: { control: 'text' },
    /*
     * adding actions to onClose: timeout, clickaway, or escapekeydown
     * they show up in actions console when they are called
     */
    onClose: { action: 'onClose' },
  },
};

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Primary: Story = {
  args: {
    ContentProps: {
      message: 'The default snackbar',
      action: defaultSnackbarAction,
      classes: { root: 'papi-snackbar primary' }, // styles the root element
    },
    // className: 'primary', // styles the div surrounding snackbar
    open: true,
    autoHideDuration: 6000,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This is the primary snackbar story. ' +
          'You can see the snackbar appear with a basic message and color scheme. ' +
          'If you open the actions console, you will see the snackbar calls onClose ' +
          'for three reasons: clickaway, timeout, and escapekeydown. If you perform ' +
          'any of these actions, the action will appear in the list, but the snackbar ' +
          'itself will not close.',
      },
    },
  },
};

export const Alert: Story = {
  args: {
    ...Primary.args,
    ContentProps: {
      message: 'WARNING',
      action: defaultSnackbarAction,
      classes: { root: 'papi-snackbar alert' },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This snackbar inherits the attributes from the primary, but highlights if ' +
          'the snackbar looked more like an alert.',
      },
    },
  },
};

export const Paratext: Story = {
  args: {
    ...Primary.args,
    ContentProps: {
      message: 'The Paratext snackbar',
      action: defaultSnackbarAction,
      classes: { root: 'papi-snackbar paratext' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This snackbar inherits the attributes from the primary, but is Paratext colors',
      },
    },
  },
};

export const ParatextBright: Story = {
  args: {
    ...Primary.args,
    ContentProps: {
      message: 'The bright Paratext snackbar',
      action: defaultSnackbarAction,
      classes: { root: 'papi-snackbar bright' },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This snackbar inherits the attributes from the primary, but is bright Paratext colors',
      },
    },
  },
};
