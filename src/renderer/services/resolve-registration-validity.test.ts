import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as commandService from '@shared/services/command.service';
import { resolveRegistrationValidity } from './resolve-registration-validity';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSendCommand = vi.mocked(commandService.sendCommand);

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.useRealTimers());

describe('resolveRegistrationValidity', () => {
  it('returns "valid" when the command reports a valid registration', async () => {
    mockSendCommand.mockResolvedValue(true);
    await expect(resolveRegistrationValidity(1000)).resolves.toBe('valid');
  });

  it('returns "invalid" when the command reports no valid registration', async () => {
    mockSendCommand.mockResolvedValue(false);
    await expect(resolveRegistrationValidity(1000)).resolves.toBe('invalid');
  });

  it('returns "unknown" when the command rejects', async () => {
    mockSendCommand.mockRejectedValue(new Error('provider not up'));
    await expect(resolveRegistrationValidity(1000)).resolves.toBe('unknown');
  });

  it('returns "unknown" when the command does not answer before the timeout', async () => {
    vi.useFakeTimers();
    mockSendCommand.mockReturnValue(new Promise(() => {})); // never resolves
    const promise = resolveRegistrationValidity(15000);
    await vi.advanceTimersByTimeAsync(15000);
    await expect(promise).resolves.toBe('unknown');
  });

  it('returns "unknown" when the command resolves with a non-boolean (e.g. null) (FIX 2)', async () => {
    // Deliberately a literal `null`: the C# provider can send null over the websocket, and this
    // proves the resolver treats that wire value as "unknown". `undefined` wouldn't exercise the
    // same boundary, so the no-null rule is disabled here rather than weakening the test.
    // eslint-disable-next-line no-null/no-null
    mockSendCommand.mockResolvedValue(null);
    await expect(resolveRegistrationValidity(1000)).resolves.toBe('unknown');
  });
});
