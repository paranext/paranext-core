import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { spyOn, restoreAllMocks } from 'storybook/test';
import * as commandService from '@shared/services/command.service';
import { getJsonRpcRequestErrorMessagePrefix } from '@shared/data/rpc.model';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
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
    spyOn(commandService, 'sendCommand').mockResolvedValue(MOCK_SETTINGS);
    return () => restoreAllMocks();
  },
};
export default meta;

type Story = StoryObj<typeof InternetSettingsStep>;

/** Spinner is shown while settings are loading; Next is disabled. */
export const Loading: Story = {
  beforeEach() {
    spyOn(commandService, 'sendCommand').mockImplementation(
      () => new Promise(() => {}), // never resolves — keeps component in loading state
    );
    return () => restoreAllMocks();
  },
};

/**
 * Startup race: the data provider hasn't registered its handlers yet, so the fetch keeps failing
 * with JSON-RPC "method not found". After the wall-clock delay the "Getting things ready…" message
 * appears below the spinner. (Retries continue in the background until they succeed or the startup
 * budget is spent, after which the error + Retry is shown.)
 */
export const ConnectingToService: Story = {
  beforeEach() {
    spyOn(commandService, 'sendCommand').mockRejectedValue(
      // Same message shape the RPC layer actually throws, built from its own producer.
      new Error(
        `${getJsonRpcRequestErrorMessagePrefix(JSONRPCErrorCode.MethodNotFound)}: not found`,
      ),
    );
    return () => restoreAllMocks();
  },
};

/** Settings loaded, VPN Required selected, Next enabled. */
export const Default: Story = {};

/** Enabled (unrestricted internet) option pre-selected. */
export const Enabled: Story = {
  beforeEach() {
    spyOn(commandService, 'sendCommand').mockResolvedValue({
      ...MOCK_SETTINGS,
      permittedInternetUse: 'Enabled',
    });
    return () => restoreAllMocks();
  },
};

/** Error alert shown and Retry button visible when the initial fetch fails. */
export const FetchError: Story = {
  beforeEach() {
    spyOn(commandService, 'sendCommand').mockRejectedValue(new Error('Connection refused'));
    return () => restoreAllMocks();
  },
};
