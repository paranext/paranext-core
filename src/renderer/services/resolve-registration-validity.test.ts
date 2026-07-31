import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as commandService from '@shared/services/command.service';
import { resolveRegistrationValidity } from './resolve-registration-validity';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSendCommand = vi.mocked(commandService.sendCommand);

// resetAllMocks (not clearAllMocks) so a leftover mock*Once queue can't leak into the next test.
beforeEach(() => vi.resetAllMocks());
afterEach(() => vi.useRealTimers());

describe('resolveRegistrationValidity', () => {
  it('returns "valid" when the command reports a valid registration', async () => {
    mockSendCommand.mockResolvedValue(true);
    await expect(resolveRegistrationValidity(1000)).resolves.toBe('valid');
    // Guard the cross-language contract: a typo or a rename of the C# command would make production
    // sendCommand reject (MethodNotFound) and strand the user on the error screen, yet without this
    // assertion the mocked test would still pass.
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextRegistration.doesUserHaveValidRegistration',
    );
  });

  it('returns "invalid" when the command reports no valid registration', async () => {
    mockSendCommand.mockResolvedValue(false);
    await expect(resolveRegistrationValidity(1000)).resolves.toBe('invalid');
  });

  it('returns "unknown" when the command rejects', async () => {
    mockSendCommand.mockRejectedValue(new Error('provider not up'));
    // maxAttempts: 1 keeps this focused on the single-attempt result (retry is covered below).
    await expect(resolveRegistrationValidity(1000, 1)).resolves.toBe('unknown');
  });

  it('returns "unknown" when the command does not answer before the timeout', async () => {
    vi.useFakeTimers();
    mockSendCommand.mockReturnValue(new Promise(() => {})); // never resolves
    const promise = resolveRegistrationValidity(15000, 1);
    await vi.advanceTimersByTimeAsync(15000);
    await expect(promise).resolves.toBe('unknown');
  });

  it('returns "unknown" when the command resolves with a non-boolean (e.g. null)', async () => {
    // Deliberately a literal `null`: the C# provider can send null over the websocket, and this
    // proves the resolver treats that wire value as "unknown". `undefined` wouldn't exercise the
    // same boundary, so the no-null rule is disabled here rather than weakening the test.
    // eslint-disable-next-line no-null/no-null
    mockSendCommand.mockResolvedValue(null);
    await expect(resolveRegistrationValidity(1000, 1)).resolves.toBe('unknown');
  });

  it('retries on "unknown" and returns "valid" once the provider comes up (PT-4302)', async () => {
    // The upgrade race: the provider isn't ready on the first probe, then answers on the next.
    mockSendCommand.mockRejectedValueOnce(new Error('provider not up')).mockResolvedValueOnce(true);
    // retryDelayMs: 0 keeps the test fast; the retry behavior is under test, not the backoff.
    await expect(resolveRegistrationValidity(1000, 3, 0)).resolves.toBe('valid');
    expect(mockSendCommand).toHaveBeenCalledTimes(2);
  });

  it('gives up with "unknown" after exhausting all attempts (PT-4302)', async () => {
    mockSendCommand.mockRejectedValue(new Error('provider not up'));
    await expect(resolveRegistrationValidity(1000, 3, 0)).resolves.toBe('unknown');
    expect(mockSendCommand).toHaveBeenCalledTimes(3);
  });

  it('does not retry when the first probe is already definitive (PT-4302)', async () => {
    // 'invalid' is a real answer, not a transient failure — retrying would waste startup time.
    mockSendCommand.mockResolvedValue(false);
    await expect(resolveRegistrationValidity(1000, 3, 0)).resolves.toBe('invalid');
    expect(mockSendCommand).toHaveBeenCalledTimes(1);
  });

  it('stops retrying as soon as a definitive "invalid" arrives mid-retry (PT-4302)', async () => {
    mockSendCommand
      .mockRejectedValueOnce(new Error('provider not up')) // attempt 1 → unknown
      .mockResolvedValueOnce(false); // attempt 2 → invalid
    await expect(resolveRegistrationValidity(1000, 3, 0)).resolves.toBe('invalid');
    expect(mockSendCommand).toHaveBeenCalledTimes(2); // did not run the 3rd attempt
  });

  it('uses the default maxAttempts when only timeout/delay are given (PT-4302)', async () => {
    // Guards the wiring of the default: a regression to 1 attempt would silently disable retry.
    mockSendCommand.mockRejectedValue(new Error('provider not up'));
    await expect(resolveRegistrationValidity(1000, undefined, 0)).resolves.toBe('unknown');
    expect(mockSendCommand).toHaveBeenCalledTimes(3);
  });

  it('still probes once when maxAttempts is non-positive (PT-4302)', async () => {
    // Defensive clamp: a caller passing 0 (or a bad config-derived value) must not skip the probe
    // and strand a registered user on the error screen without ever querying the provider.
    mockSendCommand.mockResolvedValue(true);
    await expect(resolveRegistrationValidity(1000, 0, 0)).resolves.toBe('valid');
    expect(mockSendCommand).toHaveBeenCalledTimes(1);
  });

  it('awaits the backoff between attempts and skips it after the last (PT-4302)', async () => {
    // Fake timers prove the delay is actually honored: with retryDelayMs: 0 elsewhere, a dropped
    // `await wait(...)` or a broken `attempt < maxAttempts` guard would be invisible.
    vi.useFakeTimers();
    mockSendCommand.mockRejectedValue(new Error('provider not up'));
    const promise = resolveRegistrationValidity(1000, 2, 2000);
    await vi.advanceTimersByTimeAsync(1000); // settle probe 1 (and its timeout arm)
    expect(mockSendCommand).toHaveBeenCalledTimes(1); // probe 2 is gated behind the 2s backoff
    await vi.advanceTimersByTimeAsync(2000); // elapse the backoff → probe 2 runs
    expect(mockSendCommand).toHaveBeenCalledTimes(2);
    // Resolves right after probe 2 without advancing further time → no trailing wait after the last.
    await expect(promise).resolves.toBe('unknown');
  });
});
