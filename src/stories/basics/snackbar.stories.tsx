import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, Button } from 'platform-bible-react';

const defaultSnackbarAction = <Button>Close</Button>;

const meta: Meta<typeof Snackbar> = {
  title: 'Basics/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    autoHideDuration: { control: 'number' },
    className: { control: 'text' },
    /*
     * Adding actions to onClose: timeout, clickaway, or escapekeydown
     * They show up in actions console when they are called
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
      className: 'papi-snackbar primary',
    },
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This is the primary snackbar story. ' +
          'You can see the snackbar appear with a basic message and color scheme.',
      },
    },
  },
};

export const Timeout: Story = {
  args: {
    ...Primary.args,
    ContentProps: {
      message: 'This snackbar will timeout',
      className: 'papi-snackbar primary',
    },
    autoHideDuration: 6000,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This snackbar inherits the attributes from the primary, but highlights if ' +
          'the snackbar has autoHideDuration enabled.',
      },
    },
  },
};

export const SnackbarWithButton: Story = {
  args: {
    ...Primary.args,
    ContentProps: {
      message: 'This snackbar has a button',
      action: defaultSnackbarAction,
      className: 'papi-snackbar primary',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This snackbar inherits the attributes from the primary, but contains a button ' +
          'to show the snackbar can have a button as the action.',
      },
    },
  },
};

export const DivAndSnackbarStyling: Story = {
  args: {
    ...Primary.args,
    ContentProps: {
      message: 'This snackbar has the div and snackbar styled',
      className: 'papi-snackbar primary', // styles the root element
    },
    className: 'papi-snackbar external', // styles the div surrounding snackbar
  },
  parameters: {
    docs: {
      description: {
        story:
          'This snackbar inherits the attributes from the primary, but the div ' +
          'is also styled. This is to demonstrate the difference between the two ' +
          'className attributes.',
      },
    },
  },
};

export const Alert: Story = {
  args: {
    ...Primary.args,
    ContentProps: {
      message: 'WARNING',
      className: 'papi-snackbar alert',
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
      className: 'papi-snackbar paratext',
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
      className: 'papi-snackbar bright',
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
