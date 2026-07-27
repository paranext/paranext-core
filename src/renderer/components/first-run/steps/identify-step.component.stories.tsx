import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn, within, userEvent, waitFor } from 'storybook/test';
import * as commandService from '@shared/services/command.service';
import { IdentifyStep } from './identify.component';

const VALID_CODE = 'ABCDEF-ABCDEF-ABCDEF-ABCDEF-ABCDEF';
const DEMO_MODE_KEY = 'platform-bible.firstRunDemoMode';

const meta: Meta<typeof IdentifyStep> = {
  title: 'First run/IdentifyStep',
  component: IdentifyStep,
  tags: ['autodocs'],
  args: {
    onNext: fn(),
    setCanProceed: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof IdentifyStep>;

/** Empty form on first open — Save and restart is disabled until validated. */
export const Default: Story = {};

/**
 * Name entered; Save and restart is enabled because demo mode skips backend validation.
 *
 * Toggle demo mode via: `localStorage.setItem('platform-bible.firstRunDemoMode', 'true')`
 */
export const FilledValid: Story = {
  parameters: {
    beforeEach: () => {
      localStorage.setItem(DEMO_MODE_KEY, 'true');
      return () => localStorage.removeItem(DEMO_MODE_KEY);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/registration name/i), 'Test User');
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
    );
  },
};

/**
 * Backend returned "not found" — the inline error alert is shown and Save stays disabled. Name and
 * a correctly-formatted code are entered; the error appears after the validation debounce.
 */
export const InvalidCode: Story = {
  parameters: {
    beforeEach: () => {
      const original = commandService.sendCommand;
      // Replaces sendCommand so every validation attempt returns false (not found).
      // Object.defineProperty avoids a type assertion against the overloaded generic.
      Object.defineProperty(commandService, 'sendCommand', {
        value: fn().mockResolvedValue(false),
        writable: true,
        configurable: true,
      });
      return () => {
        Object.defineProperty(commandService, 'sendCommand', {
          value: original,
          writable: true,
          configurable: true,
        });
      };
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/registration name/i), 'Test User');
    await userEvent.type(canvas.getByLabelText(/registration code/i), VALID_CODE);
    await waitFor(() => expect(canvas.getByText(/not found/i)).toBeInTheDocument(), {
      timeout: 5000,
    });
  },
};

/**
 * Registration saved and platform.restart called — the form is replaced by a restart indicator. The
 * restart promise never resolves (the real process reboots here), so the restart view stays visible
 * until the story is reset.
 */
export const RestartPending: Story = {
  parameters: {
    beforeEach: () => {
      const original = commandService.sendCommand;
      const mock = fn()
        .mockResolvedValueOnce(true) // validateParatextRegistrationData → valid
        .mockResolvedValueOnce(undefined) // setParatextRegistrationData → ok
        .mockReturnValueOnce(new Promise<never>(() => {})); // platform.restart → never settles
      Object.defineProperty(commandService, 'sendCommand', {
        value: mock,
        writable: true,
        configurable: true,
      });
      return () => {
        Object.defineProperty(commandService, 'sendCommand', {
          value: original,
          writable: true,
          configurable: true,
        });
      };
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/registration name/i), 'Test User');
    await userEvent.type(canvas.getByLabelText(/registration code/i), VALID_CODE);
    await waitFor(
      () => expect(canvas.getByRole('button', { name: /save and restart/i })).not.toBeDisabled(),
      { timeout: 5000 },
    );
    await userEvent.click(canvas.getByRole('button', { name: /save and restart/i }));
    await waitFor(() => expect(canvas.getByText(/restarting/i)).toBeInTheDocument(), {
      timeout: 3000,
    });
  },
};
