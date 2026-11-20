/**
 * Checks the `evil` test extension's sandbox probe results in a running app. `evil` loads only in
 * noisy dev mode (`DEV_NOISY=true`), runs its probes at load, at activation and 3 seconds later,
 * and returns each phase's results from the `evil.getSandboxProbeResults` command.
 */

/** Command that returns `evil`'s probe results, keyed by phase */
export const GET_SANDBOX_PROBE_RESULTS_COMMAND = 'evil.getSandboxProbeResults';

/** The phases `evil` runs its probes in */
export const SANDBOX_PROBE_PHASES = ['load', 'activate', 'after init'];

/** Matches `SandboxProbeResult` in `extensions/src/evil/evil.js` */
export type SandboxProbeResult = { name: string; outcome: 'refused' | 'escaped'; detail: string };

/** Result of {@link checkSandboxProbeResults} */
export type SandboxProbeResultsCheck = {
  /** Phases that have not run yet */
  missingPhases: string[];
  /** Every probe that escaped, and every phase that ran no probes */
  problems: string[];
};

/**
 * Checks the results `evil.getSandboxProbeResults` returned
 *
 * @param resultsByPhase The command's result
 * @returns Which phases have not run yet, and every result that shows an open route
 */
export function checkSandboxProbeResults(
  resultsByPhase: Record<string, SandboxProbeResult[]>,
): SandboxProbeResultsCheck {
  const problems: string[] = [];
  Object.entries(resultsByPhase).forEach(([phase, results]) => {
    if (results.length === 0) problems.push(`${phase}: no probes ran`);
    results
      .filter((result) => result.outcome !== 'refused')
      .forEach((result) => problems.push(`${phase}: ${result.name} escaped (${result.detail})`));
  });
  return {
    missingPhases: SANDBOX_PROBE_PHASES.filter((phase) => !(phase in resultsByPhase)),
    problems,
  };
}
