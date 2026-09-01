import { logger } from '@shared/services/logger.service';

/**
 * Names Electron's `powerMonitor` actually emits, among those this service is interested in — a
 * hand-maintained mirror of the `on(event: '...')` overloads in `electron.d.ts`.
 *
 * Deliberately a named union rather than `(typeof POWER_EVENTS)[number]`: derived from the array,
 * the type would accept whatever the array happened to say, so a misspelled event name would
 * type-check, register on an emitter that never emits it, and pass every test here — since the
 * tests iterate the same array. Stated independently, the array is checked against it.
 */
type PowerMonitorEvent = 'suspend' | 'resume' | 'lock-screen' | 'unlock-screen' | 'shutdown';

/**
 * The slice of Electron's `powerMonitor` this service needs. Accepting a structural type keeps the
 * registration testable and lets it no-op where `powerMonitor` does not exist.
 */
export type PowerMonitorLike = { on(event: PowerMonitorEvent, listener: () => void): unknown };

/**
 * Power transitions worth recording. A suspend tears down Chromium's WebSockets, so without these
 * markers a disconnect in the log has no attributable cause.
 *
 * Not every one of these fires everywhere: per `electron.d.ts`, `lock-screen`/`unlock-screen` are
 * macOS and Windows only, and `shutdown` is Linux and macOS only. Registering them all regardless
 * is the point — a listener for an event the platform never emits costs nothing, while a missing
 * one leaves a log with no explanation for why it stops. `shutdown` is the marker that separates
 * "the OS took the app down" from "the app died", which is exactly the distinction NN-6 is about.
 */
export const POWER_EVENTS = [
  'suspend',
  'resume',
  'lock-screen',
  'unlock-screen',
  'shutdown',
] as const;

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
