import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { vi } from '@storybook/test';
import * as commandService from '@shared/services/command.service';
import { InternetSettingsStep } from './internet-settings-step.component';

const MOCK_SETTINGS = {
  permittedInternetUse: 'VpnRequired' as const,
  selectedServer: 'Production' as const,
  proxyPort: 0,
};

const meta: Meta<typeof InternetSettingsStep> = {
  title: 'First Run/InternetSettingsStep',
  component: InternetSettingsStep,
  tags: ['autodocs', 'test'],
  args: {
    onNext: () => {},
    setCanProceed: () => {},
  },
  beforeEach() {
    // Default: fetch resolves with production/vpn-required settings.
    vi.spyOn(commandService, 'sendCommand').mockResolvedValue(MOCK_SETTINGS);
    return () => vi.restoreAllMocks();
  },
};
export default meta;

type Story = StoryObj<typeof InternetSettingsStep>;

/** Spinner is shown while settings are loading; Next is disabled. */
export const Loading: Story = {
  beforeEach() {
    vi.spyOn(commandService, 'sendCommand').mockImplementation(
      () => new Promise(() => {}), // never resolves — keeps component in loading state
    );
    return () => vi.restoreAllMocks();
  },
};

/** Settings loaded, VPN Required selected, Next enabled. */
export const Default: Story = {};

/** Enabled (unrestricted internet) option pre-selected. */
export const Enabled: Story = {
  beforeEach() {
    vi.spyOn(commandService, 'sendCommand').mockResolvedValue({
      ...MOCK_SETTINGS,
      permittedInternetUse: 'Enabled',
    });
    return () => vi.restoreAllMocks();
  },
};

/** Error alert shown and Retry button visible when the initial fetch fails. */
export const FetchError: Story = {
  beforeEach() {
    vi.spyOn(commandService, 'sendCommand').mockRejectedValue(new Error('Connection refused'));
    return () => vi.restoreAllMocks();
  },
};
