import { describe, expect, test, vi, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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

  test('does not register duplicate listeners when called again with the same powerMonitor', () => {
    const on = vi.fn();
    const powerMonitor = { on };

    expect(registerPowerMonitorListeners(powerMonitor)).toBe(true);
    expect(registerPowerMonitorListeners(powerMonitor)).toBe(true);

    // A second registration on the same instance must not double the listener count — otherwise
    // every power transition would be logged twice.
    expect(on).toHaveBeenCalledTimes(POWER_EVENTS.length);
  });

  // Call-count assertions above only observe what the handlers under test happen to call — a
  // handler edited to also call e.g. `reconnectService.reconnect()` would still pass them
  // unchanged as long as it still logs once per event. These two tests instead constrain the
  // service's SOURCE, so a change that adds a call into another service is caught even before it
  // reaches a test double.
  describe('architectural guard: handlers stay log-only', () => {
    const serviceSource = readFileSync(
      resolve(__dirname, '../power-monitor-logging.service.ts'),
      'utf-8',
    );

    test('imports nothing but the logger service', () => {
      const importedModules = [...serviceSource.matchAll(/^import .+ from '([^']+)';$/gm)].map(
        (match) => match[1],
      );

      // Calling into another service (e.g. a reconnect service) requires importing it. Keeping
      // the import list to just the logger is what actually prevents this diagnostic hook from
      // growing into a reconnect trigger — if this assertion fails, the new import is crossing a
      // deliberate boundary: this file logs power transitions and must not act on them.
      expect(importedModules).toStrictEqual(['@shared/services/logger.service']);
    });

    test("each handler's body is a single logger.info call", () => {
      const handlerBodies = [
        ...serviceSource.matchAll(/powerMonitor\.on\(event, \(\) => \{\s*([\s\S]*?)\s*\}\);/g),
      ].map((match) => match[1].trim());

      expect(handlerBodies).toHaveLength(1); // one handler literal shared by all POWER_EVENTS
      handlerBodies.forEach((body) => {
        expect(body).toMatch(/^logger\.info\(`[^`]*`\);$/);
      });
    });
  });
});
