import { logger } from '@shared/services/logger.service';

/**
 * The slice of Electron's `powerMonitor` this service needs. Accepting a structural type keeps the
 * registration testable and lets it no-op where `powerMonitor` does not exist.
 */
export type PowerMonitorLike = { on(event: string, listener: () => void): unknown };

/**
 * Power transitions worth recording. A suspend tears down Chromium's WebSockets, so without these
 * markers a disconnect in the log has no attributable cause.
 */
export const POWER_EVENTS: readonly string[] = [
  'suspend',
  'resume',
  'lock-screen',
  'unlock-screen',
];

// Guards against a second `registerPowerMonitorListeners` call on the same `powerMonitor`
// doubling up listeners (and thus doubling every power log line) if a future caller invokes it
// again, e.g. on a second window or a restart path that re-runs startup. Keyed by the
// `powerMonitor` instance (rather than a single module-level flag) so unrelated `PowerMonitorLike`
// instances — such as separate fakes in tests — are not conflated with each other.
const registeredMonitors = new WeakSet<PowerMonitorLike>();

/**
 * Log OS power transitions so a disconnect can be correlated with what the machine was doing.
 *
 * Diagnosis only: these handlers log and nothing else. Reconnecting a dropped PAPI socket on resume
 * is deliberately out of scope here.
 *
 * @param powerMonitor Electron's `powerMonitor`. Must only be touched after the `ready` event, so
 *   callers pass it in rather than importing `electron` directly here.
 * @returns Whether listeners were registered
 */
export function registerPowerMonitorListeners(powerMonitor?: PowerMonitorLike): boolean {
  if (!powerMonitor || typeof powerMonitor.on !== 'function') {
    logger.warn('Power monitor unavailable; skipping power-transition logging');
    return false;
  }

  if (registeredMonitors.has(powerMonitor)) return true;

  POWER_EVENTS.forEach((event) => {
    powerMonitor.on(event, () => {
      logger.info(`Power transition: ${event}`);
    });
  });
  registeredMonitors.add(powerMonitor);
  return true;
}
