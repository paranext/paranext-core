import { describe, expect, test, vi, beforeEach } from 'vitest';
import {
  registerPowerMonitorListeners,
  POWER_EVENTS,
} from '@main/services/power-monitor-logging.service';

const { mockLoggerInfo, mockLoggerWarn } = vi.hoisted(() => ({
  mockLoggerInfo: vi.fn(),
  mockLoggerWarn: vi.fn(),
}));

// vi.mock and vi.hoisted calls are hoisted above the imports above at transform time, so the
// static imports can be written first here to satisfy import/first.
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: mockLoggerInfo, warn: mockLoggerWarn, error: vi.fn(), debug: vi.fn() },
}));

describe('registerPowerMonitorListeners', () => {
  beforeEach(() => {
    mockLoggerInfo.mockClear();
    mockLoggerWarn.mockClear();
  });

  test('does not throw and reports skipped when powerMonitor is unavailable', () => {
    expect(registerPowerMonitorListeners(undefined)).toBe(false);
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('Power monitor'));
  });

  test('registers a listener for every power event', () => {
    const on = vi.fn();
    expect(registerPowerMonitorListeners({ on })).toBe(true);
    expect(on).toHaveBeenCalledTimes(POWER_EVENTS.length);
    POWER_EVENTS.forEach((event) => {
      expect(on).toHaveBeenCalledWith(event, expect.any(Function));
    });
  });

  test('each handler only logs — it never acts', () => {
    const handlers: Array<() => void> = [];
    const on = vi.fn((_event: string, handler: () => void) => {
      handlers.push(handler);
    });
    registerPowerMonitorListeners({ on });

    handlers.forEach((handler) => handler());

    // Pins "diagnosis only, never act" — the invariant most likely to erode when
    // reconnect lands and someone reaches for the nearest suspend hook.
    expect(mockLoggerInfo).toHaveBeenCalledTimes(POWER_EVENTS.length);
    expect(on).toHaveBeenCalledTimes(POWER_EVENTS.length);
  });
});
