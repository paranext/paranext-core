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

// vi.mock and vi.hoisted calls are hoisted above the static imports at transform time, so the
// imports can be written first here to satisfy import/first.
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
  // unchanged as long as it still logs once per event. These import-surface tests instead constrain the
  // service's SOURCE, so a change that adds a call into another service is caught even before it
  // reaches a test double.
  describe('architectural guard: handlers stay log-only', () => {
    const serviceSource = readFileSync(
      resolve(__dirname, '../power-monitor-logging.service.ts'),
      'utf-8',
    );

    /**
     * True when an import clause (the part between `import` and `from`) brings in only types —
     * erased at compile time, so it cannot cause a runtime side effect and is not a route into
     * another service. Handles both `import type { X } from '...'` and inline `import { type X }
     * from '...'`.
     */
    function isTypeOnlyImportClause(clause: string): boolean {
      const trimmedClause = clause.trim();
      if (/^type\b/.test(trimmedClause)) return true;

      const namedImports = trimmedClause.match(/^\{([\s\S]*)\}$/);
      if (!namedImports) return false; // default or namespace import — always a runtime import

      const specifiers = namedImports[1]
        .split(',')
        .map((specifier) => specifier.trim())
        .filter((specifier) => specifier.length > 0);
      return specifiers.length > 0 && specifiers.every((specifier) => /^type\b/.test(specifier));
    }

    test('imports nothing but the logger service', () => {
      // Lazy `[\s\S]*?` (rather than `.+` anchored to one line) so an import statement Prettier
      // wraps across multiple lines is still matched.
      const importStatements = [
        ...serviceSource.matchAll(/import\s+([\s\S]*?)\s+from\s+'([^']+)';/g),
      ];
      const runtimeImportedModules = importStatements
        .filter((match) => !isTypeOnlyImportClause(match[1]))
        .map((match) => match[2]);

      // Calling into another service (e.g. a reconnect service) requires importing it. Keeping
      // the import list to just the logger is what actually prevents this diagnostic hook from
      // growing into a reconnect trigger — if this assertion fails, the new import is crossing a
      // deliberate boundary: this file logs power transitions and must not act on them.
      expect(runtimeImportedModules).toStrictEqual(['@shared/services/logger.service']);
    });

    test('contains no require(...) calls', () => {
      // A `require` call is a second route into another module that the import-statement scan
      // above does not see.
      expect(serviceSource).not.toMatch(/\brequire\s*\(/);
    });

    test('contains no dynamic import(...) calls', () => {
      // A dynamic `import()` is a third route into another module — also invisible to the
      // static-import scan above, and awaitable from inside a handler without changing its
      // top-level import list.
      expect(serviceSource).not.toMatch(/\bimport\s*\(/);
    });
  });
});
