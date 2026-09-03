import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, fn, spyOn, within, userEvent, waitFor } from 'storybook/test';
import * as commandService from '@shared/services/command.service';
import { IdentifyStep } from './identify-step.component';

const VALID_CODE = 'ABCDEF-ABCDEF-ABCDEF-ABCDEF-ABCDEF';
const DEMO_MODE_KEY = 'platform-bible.firstRunDemoMode';
// The registry site a non-production environment resolves to. ParatextData maps Development, Test,
// and QualityAssurance all to this one host; only Production differs. Used here to show the "Visit
// Paratext Registry" link following the selected environment rather than always Production.
const NON_PRODUCTION_REGISTRY_URL = 'https://registry-dev.paratext.org';

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
 * The "Visit Paratext Registry" link points at whichever registry the selected server environment
 * uses (resolved via `paratextRegistration.getParatextRegistryUrl`), not a hardcoded production
 * URL. Here a non-production environment is selected, so the link targets the development registry
 * site.
 */
export const RegistryLinkFollowsSelectedServer: Story = {
  beforeEach: () => {
    // Route by command name so the mount-time URL lookup returns the non-production site while
    // any other command (none are triggered here) resolves harmlessly.
    const spy = spyOn(commandService, 'sendCommand').mockImplementation((command: string) =>
      command === 'paratextRegistration.getParatextRegistryUrl'
        ? Promise.resolve(NON_PRODUCTION_REGISTRY_URL)
        : Promise.resolve(undefined),
    );
    return () => spy.mockRestore();
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /visit paratext registry/i });
    await waitFor(() => expect(link).toHaveAttribute('href', NON_PRODUCTION_REGISTRY_URL));
  },
};

/**
 * Name entered; Save and restart is enabled because demo mode skips backend validation.
 *
 * Toggle demo mode via: `localStorage.setItem('platform-bible.firstRunDemoMode', 'true')`
 */
export const FilledValid: Story = {
  beforeEach: () => {
    localStorage.setItem(DEMO_MODE_KEY, 'true');
    return () => localStorage.removeItem(DEMO_MODE_KEY);
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
  beforeEach: () => {
    // Replaces sendCommand so every validation attempt returns false (not found).
    const spy = spyOn(commandService, 'sendCommand').mockResolvedValue(false);
    return () => spy.mockRestore();
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
 * Re-register mode (background re-check re-raised the wizard for an already-onboarded user whose
 * registration went invalid). Adds two affordances not present in fresh onboarding: a "Continue
 * without registration" escape hatch and a "Don't show this on startup again" suppression
 * checkbox.
 */
export const ReRegisterMode: Story = {
  args: { allowContinueWithoutRegistration: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: /continue without registration/i }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('checkbox', { name: /don't show this on startup again/i }),
    ).toBeInTheDocument();
  },
};

/**
 * Registration saved and platform.restart called — the form is replaced by a restart indicator. The
 * restart promise never resolves (the real process reboots here), so the restart view stays visible
 * until the story is reset.
 */
export const RestartPending: Story = {
  beforeEach: () => {
    // Route by command name so the mount-time registry-URL lookup can't consume the
    // validation/save mocks off a positional queue (it would leave Save disabled). Restart never
    // settles because the real process reboots here.
    const spy = spyOn(commandService, 'sendCommand').mockImplementation((command: string) => {
      switch (command) {
        case 'paratextRegistration.validateParatextRegistrationData':
          return Promise.resolve(true);
        case 'paratextRegistration.setParatextRegistrationData':
          return Promise.resolve(undefined);
        case 'platform.restart':
          return new Promise<never>(() => {});
        default:
          return Promise.resolve(undefined);
      }
    });
    return () => spy.mockRestore();
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
