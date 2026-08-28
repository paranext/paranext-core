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
// side: fetch `rpc.discover`, then run both directions of the comparison against it.
//
// Deliberately does NOT use `papi-live.fixture` — its `canConnectToPapi` guard is built to skip
// gracefully when no app is running, which would make this test report success without ever
// comparing anything. If the live document cannot be fetched, this test fails loudly instead.
import * as fs from 'fs';
import * as path from 'path';
import { test, expect } from '../../fixtures/app.fixture';
import {
  PROCESS_READY_TIMEOUT,
  sendPapiRequestOnce,
  waitForPapiMethodRegistered,
} from '../../fixtures/helpers';
import {
  buildExpectedLiveIdentifiers,
  checkMarkerAgreement,
  classifyLiveMethod,
  findMissingFromLive,
  type LiveMethod,
  type WireSurfaceDocument,
  type WireSurfaceRegistration,
} from '../../fixtures/wire-surface-reduction.util';

const SNAPSHOT_PATH = path.resolve(__dirname, '../../../lib/papi-dts/wire-surface.json');

// The settings data provider's `set` method only becomes discoverable once
// `extensionService.initialize()` finishes in the extension host — the same gate
// ui-interaction.spec.ts uses to know every extension has finished registering. By the time it
// appears, the wire surface for this run has settled too, so it doubles as this test's readiness
// gate. Polling (never a sleep) means a slow runner fails with a named method, not a phantom diff.
const READINESS_METHOD = 'object:platform.settingsServiceDataProvider-data.set';
const READINESS_TIMEOUT_MS = PROCESS_READY_TIMEOUT;
const DISCOVER_TIMEOUT_MS = 30_000;

interface RpcDiscoverResult {
  methods?: LiveMethod[];
}

function describeRegistration(reg: WireSurfaceRegistration): string {
  return `${reg.category} '${reg.name}' (${reg.language}, ${reg.file})`;
}

test.describe('Wire surface snapshot', () => {
  test('matches the live rpc.discover document', async ({
    // Destructured only to establish the fixture dependency: it ensures the shared smoke Electron
    // instance is launched before this test runs. Every actual call below goes straight over the
    // WebSocket via helpers.ts, matching ui-interaction.spec.ts's beforeAll.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    electronApp,
  }) => {
    test.setTimeout(READINESS_TIMEOUT_MS + DISCOVER_TIMEOUT_MS + 30_000);

    await waitForPapiMethodRegistered(READINESS_METHOD, undefined, READINESS_TIMEOUT_MS);

    let discoverResult: RpcDiscoverResult;
    try {
      discoverResult = await sendPapiRequestOnce<RpcDiscoverResult>(
        'rpc.discover',
        [],
        undefined,
        DISCOVER_TIMEOUT_MS,
      );
    } catch (error) {
      // Fail loudly and specifically — this must never read as a vacuous pass. See the module
      // header for why this test does not use papi-live.fixture's skip-on-disconnect guard.
      throw new Error(
        `Could not fetch the live OpenRPC document via rpc.discover — the wire surface snapshot ` +
          `cannot be verified against a running app. Underlying error: ` +
          `${error instanceof Error ? error.message : String(error)}`,
      );
    }

    const liveMethods = discoverResult.methods ?? [];
    expect(
      liveMethods.length,
      'rpc.discover returned zero methods — something is wrong with the running app itself, not ' +
        'with this comparison.',
    ).toBeGreaterThan(0);

    // JSON.parse returns `any`; asserting the known shape of the checked-in snapshot file.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8')) as WireSurfaceDocument;
    const expected = buildExpectedLiveIdentifiers(snapshot.registrations);
    const liveMethodNames = new Set(liveMethods.map((m) => m.name));

    // Direction 1: every snapshot entry that should be live is present live.
    const missing = findMissingFromLive(snapshot.registrations, liveMethodNames);

    // Direction 2 (the important one — see the module header): every live method reduces to a
    // snapshot entry, a documented dynamic pattern, or a known infrastructure method. Without this
    // direction, a registration shape neither scanner recognizes would never surface.
    const unknownLiveMethods = liveMethods
      .map((method) => method.name)
      .filter((name) => classifyLiveMethod(name, expected).kind === 'unknown');

    const markerDisagreements = checkMarkerAgreement(snapshot.registrations, liveMethods);

    const failureSections: string[] = [];

    if (missing.length > 0) {
      failureSections.push(
        `Declared in wire-surface.json but not found live (${missing.length}):\n${missing
          .map(
            (m) => `  - ${describeRegistration(m.registration)} — expected '${m.expectedWireName}'`,
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
