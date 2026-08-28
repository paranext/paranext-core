// SMOKE TEST ONLY — uses app.fixture for CI smoke testing (launches Electron).
// Per-feature E2E tests MUST use cdp.fixture instead. See e2e-tests/tests/_example/.
//
// Verifies that `lib/papi-dts/wire-surface.json` — the checked-in snapshot of every declared
// wire-visible registration — still matches what the running app actually serves over
// `rpc.discover`. The snapshot is generated from static analysis (see
// `.erb/scripts/generate-wire-surface.ts`); this is the runtime half of that guarantee, catching a
// registration shape the static scanners cannot see (per `wire-surface.json`'s own header, some
// names — a nonce-minted PDP id, a per-window shard, a per-provider `onDidUpdate` event, a
// per-project C# data provider — only exist at runtime and cannot be snapshotted at all).
//
// The reduction rules that make a static snapshot entry and a live wire method comparable —
// deterministic wire-naming suffixes, network-object fan-out collapse, and the dynamic-id patterns
// for genuinely runtime-unique names — live in `../../fixtures/wire-surface-reduction.util.ts` (unit
// tested there) so they stay testable without launching Electron. This file only drives the live
// side: poll `rpc.discover` until the comparison itself is satisfied or a bounded budget expires,
// then run every comparison against the final result.
//
// Some declared registrations are excluded from the "must be live" half of that comparison
// entirely: dev-noisy-gated ones (below), and any registration the snapshot itself marks with a
// `liveness` field (`isComparableLive` in the reduction util) — declared surface a poll can never
// rely on catching (self-disposed on a startup timer, or created only inside a runtime path a smoke
// run doesn't exercise). Both stay in the set checked for direction 2 and marker agreement, so one
// that DOES happen to show up live is still recognized rather than flagged as unexplained.
//
// Deliberately does NOT use `papi-live.fixture` — its `canConnectToPapi` guard is built to skip
// gracefully when no app is running, which would make this test report success without ever
// comparing anything. If the live document can never be fetched at all, this test fails loudly
// instead.
import * as fs from 'fs';
import * as path from 'path';
import { test, expect } from '../../fixtures/app.fixture';
import { PROCESS_READY_TIMEOUT, sendPapiRequestOnce } from '../../fixtures/helpers';
import {
  buildExpectedLiveIdentifiers,
  checkMarkerAgreement,
  classifyLiveMethod,
  findMissingFromLive,
  isComparableLive,
  type LiveMethod,
  type MissingLiveEntry,
  type WireSurfaceDocument,
  type WireSurfaceRegistration,
} from '../../fixtures/wire-surface-reduction.util';

const SNAPSHOT_PATH = path.resolve(__dirname, '../../../lib/papi-dts/wire-surface.json');

// There is no single event that fires once "every extension has finished registering" — extensions,
// the bundled C# data providers, and core services each register independently and at their own
// pace, so any one proxy signal can fire long before the rest have landed. Instead this test polls
// `rpc.discover` directly and treats the comparison itself (direction 1 below: every snapshot entry
// that should be live IS live) as the readiness condition — keep fetching until nothing is missing,
// or the budget runs out. This turns a startup-ordering race into a legible bounded wait: a timeout
// fails with the still-missing list rather than a phantom diff taken mid-startup.
//
// Budget: double PROCESS_READY_TIMEOUT (used elsewhere for the point the main window and WebSocket
// come up). That milestone is much earlier than "every C# and bundled-extension registration has
// landed" — the stragglers this test waits for start registering only after the app is already
// up and are the slowest half of startup on a loaded CI runner — so this poll gets extra headroom
// rather than inheriting a budget sized for an earlier milestone.
const READINESS_TIMEOUT_MS = PROCESS_READY_TIMEOUT * 2;
const POLL_INTERVAL_MS = 250;

interface RpcDiscoverResult {
  methods?: LiveMethod[];
}

/**
 * Source directories of the extensions the extension host skips when noisy dev mode is off, and the
 * two registrations the .NET provider makes only in that mode.
 *
 * Kept as source locations rather than wire names because the gate is per extension, not per
 * registration: `TEST_EXTENSION_NAMES` in `src/extension-host/services/extension.service.ts`
 * decides which extensions load at all, so every name one of them registers disappears together.
 * The .NET side gates its two in `c-sharp/Program.cs`. Two of these directories declare nothing
 * today; they are listed anyway so the exclusion stays correct if they ever do.
 */
const DEV_NOISY_GATED_FILE_PREFIXES = [
  'extensions/src/hello-rock3/',
  'extensions/src/hello-someone/',
  'extensions/src/quick-verse/',
  'extensions/src/evil/',
  'extensions/src/c-sharp-provider-test/',
  'c-sharp/NetworkObjects/TimeDataProvider.cs',
];

/** Whether a registration exists only when noisy dev mode is on */
function isDevNoisyGated(registration: WireSurfaceRegistration): boolean {
  if (registration.name === 'command:test.addOne') return true;
  return DEV_NOISY_GATED_FILE_PREFIXES.some((prefix) => registration.file.startsWith(prefix));
}

function describeRegistration(reg: WireSurfaceRegistration): string {
  return `${reg.category} '${reg.name}' (${reg.language}, ${reg.file})`;
}

/**
 * Poll `rpc.discover` until every entry in `comparableRegistrations` that should be live IS live
 * (direction 1 finds nothing missing), or `budgetMs` elapses. `comparableRegistrations` must
 * already exclude anything the live comparison cannot require — dev-noisy-gated entries and
 * anything carrying a `liveness` annotation (`isComparableLive`) — so the early exit fires as soon
 * as everything that CAN be live IS live, rather than waiting out the full budget on a registration
 * a poll can never catch. Always returns the last fetched live methods (empty if every attempt
 * failed) and the last-computed missing list, so the caller can report a specific failure either
 * way — this never lets the test report success without having actually compared.
 */
async function pollUntilSnapshotIsLive(
  comparableRegistrations: readonly WireSurfaceRegistration[],
  budgetMs: number,
): Promise<{ liveMethods: LiveMethod[]; missing: MissingLiveEntry[]; lastError: unknown }> {
  let liveMethods: LiveMethod[] = [];
  let missing: MissingLiveEntry[] = [];
  let lastError: unknown;
  const deadline = Date.now() + budgetMs;

  for (;;) {
    const remainingForRequest = deadline - Date.now();
    try {
      // Sequential polling: each attempt must finish (or time out) before the next; parallelizing
      // would defeat the bounded-wait purpose.
      // eslint-disable-next-line no-await-in-loop
      const discoverResult = await sendPapiRequestOnce<RpcDiscoverResult>(
        'rpc.discover',
        [],
        undefined,
        Math.min(10_000, Math.max(1000, remainingForRequest)),
      );
      liveMethods = discoverResult.methods ?? [];
      lastError = undefined;
      missing = findMissingFromLive(
        comparableRegistrations,
        new Set(liveMethods.map((m) => m.name)),
      );
      if (missing.length === 0) return { liveMethods, missing, lastError };
    } catch (error) {
      lastError = error;
    }

    const sleepMs = Math.min(POLL_INTERVAL_MS, deadline - Date.now());
    if (sleepMs <= 0) return { liveMethods, missing, lastError };
    // Sequential polling: see above.
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>((resolve) => {
      setTimeout(resolve, sleepMs);
    });
  }
}

test.describe('Wire surface snapshot', () => {
  test('matches the live rpc.discover document', async ({
    // Destructured only to establish the fixture dependency: it ensures the shared smoke Electron
    // instance is launched before this test runs. Every actual call below goes straight over the
    // WebSocket via helpers.ts, matching ui-interaction.spec.ts's beforeAll.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    electronApp,
  }) => {
    test.setTimeout(READINESS_TIMEOUT_MS + 30_000);

    // JSON.parse's return type is `any`, so `.header` needs no type assertion here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8')) as WireSurfaceDocument;

    // `DEV_NOISY` gates the sample extensions and two C# test registrations at runtime, and a
    // static scan cannot see a runtime env gate — so they are always in the snapshot. Waiting for
    // them when they were never going to load would burn the whole budget on a fixture choice.
    //
    // This reads the same expression the launcher defaults from (`helpers.ts`), so it covers the
    // env-var route. It does NOT cover a caller passing `envOverrides: { DEV_NOISY: 'false' }`,
    // because those overrides never reach this process's environment: add the entries to this list
    // if that ever becomes how the smoke fixture launches.
    const devNoisyEnabled = (process.env.DEV_NOISY ?? 'true') === 'true';
    const registrationsToExpect = devNoisyEnabled
      ? snapshot.registrations
      : snapshot.registrations.filter((reg) => !isDevNoisyGated(reg));
    if (!devNoisyEnabled) {
      console.log(
        `DEV_NOISY is off; excluding ${snapshot.registrations.length - registrationsToExpect.length} ` +
          `gated registration(s) from the live comparison.`,
      );
    }

    // A registration carrying a `liveness` annotation (transient/lazy — see the module header and
    // `isComparableLive`'s doc comment) is real declared surface, but a poll can never rely on
    // catching it live, so it must not be waited on or reported missing. It stays in
    // `registrationsToExpect` (used below for direction 2 and marker agreement) in case it happens
    // to show up anyway.
    const comparableRegistrations = registrationsToExpect.filter(isComparableLive);
    const excludedForLiveness = registrationsToExpect.length - comparableRegistrations.length;
    if (excludedForLiveness > 0) {
      console.log(
        `Excluding ${excludedForLiveness} registration(s) marked not durably live (transient/lazy) ` +
          `from the "must be live" comparison.`,
      );
    }

    const { liveMethods, missing, lastError } = await pollUntilSnapshotIsLive(
      comparableRegistrations,
      READINESS_TIMEOUT_MS,
    );

    if (liveMethods.length === 0) {
      // Fail loudly and specifically — this must never read as a vacuous pass. See the module
      // header for why this test does not use papi-live.fixture's skip-on-disconnect guard.
      const lastErrorDetail = lastError
        ? ` Underlying error from the last attempt: ${lastError instanceof Error ? lastError.message : String(lastError)}`
        : ' The last rpc.discover response reported zero methods.';
      throw new Error(
        `Could not fetch a non-empty live OpenRPC document via rpc.discover within ` +
          `${READINESS_TIMEOUT_MS}ms — the wire surface snapshot cannot be verified against a ` +
          `running app.${lastErrorDetail}`,
      );
    }

    const expected = buildExpectedLiveIdentifiers(registrationsToExpect);

    // Direction 2 (the important one — see the module header): every live method reduces to a
    // snapshot entry, a documented dynamic pattern, or a known infrastructure method. Without this
    // direction, a registration shape neither scanner recognizes would never surface.
    const unknownLiveMethods = liveMethods
      .map((method) => method.name)
      .filter((name) => classifyLiveMethod(name, expected).kind === 'unknown');

    const markerDisagreements = checkMarkerAgreement(registrationsToExpect, liveMethods);

    const failureSections: string[] = [];

    if (missing.length > 0) {
      failureSections.push(
        `Declared in wire-surface.json but not found live after polling for up to ` +
          `${READINESS_TIMEOUT_MS}ms (${missing.length}):\n${missing
            .map(
              (m) =>
                `  - ${describeRegistration(m.registration)} — expected '${m.expectedWireName}'`,
            )
            .join('\n')}`,
      );
    }

    if (unknownLiveMethods.length > 0) {
      failureSections.push(
        `Live but unrecognized (${unknownLiveMethods.length}) — present on the running app, ` +
          `matching neither a snapshot entry, a documented dynamic pattern, nor the infrastructure ` +
          `allowlist. This is exactly the kind of registration shape the static scanners cannot see — ` +
          `investigate whether it is a new registration idiom (extend the scanner/reduction rules) or ` +
          `a genuine regression:\n${unknownLiveMethods.map((name) => `  - ${name}`).join('\n')}`,
      );
    }

    if (markerDisagreements.length > 0) {
      failureSections.push(
        `Experimental-marker disagreements (${markerDisagreements.length}) — the declared marker in ` +
          `wire-surface.json does not match what the live document reports. Legitimate only when the ` +
          `specific method has its own explicit override in source; verify before treating as a ` +
          `regression:\n${markerDisagreements
            .map(
              (d) =>
                `  - ${describeRegistration(d.registration)}: declared experimental=` +
                `${d.declaredExperimental}, live '${d.liveMethodName}' reports x-experimental=` +
                `${d.liveExperimental}`,
            )
            .join('\n')}`,
      );
    }

    expect(failureSections, failureSections.join('\n\n')).toEqual([]);
  });
});
