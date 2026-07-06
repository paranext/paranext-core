/**
 * === NEW IN PT10 ===
 *
 * Runtime verification tests for the keyboard-switching feature backend. These tests exercise the
 * feature's complete PAPI wire surface against a live-running Platform.Bible instance:
 *
 * 1. C# `platform.osKeyboard` data provider (network object `object:platform.osKeyboard-data`) — the
 *    thin OS-primitive layer (CAP-007)
 * 2. TS renderer-hosted `platform.keyboard` data provider (network object
 *    `object:platform.keyboard-data`) — the feature engine (CAP-015/CAP-016)
 *
 * The purpose is NOT to validate business logic — that is covered by the Vitest suite (engine,
 * store, router, activation service) and the NUnit suite (OsKeyboardDataProvider, primitives). The
 * purpose is to catch the runtime-integration bugs unit tests cannot see:
 *
 * - Parameter count / shape mismatches between the TS wire contract (`keyboard.service-model.ts`) and
 *   the C# handler delegates (`OsKeyboardDataProvider.cs`)
 * - Serialization round-trips (KeyboardOption record → camelCase JSON → TS interface)
 * - Registration completeness (both data providers reachable; every documented method on the wire)
 * - Cross-process registration: the TS engine registers in the RENDERER process — these tests prove
 *   its methods are reachable from an external WebSocket client (full network round-trip)
 * - Protocol correctness — unreachable handler → -32601, wrong parameter shape → -32602;
 *   business-logic errors surface with non-protocol codes, proving the handler executed
 *
 * See backend-smoke-tests.md Smoke Test 4 for the canonical error-code rubric, and
 * `.context/features/keyboard-switching/proofs/runtime-verification/param-alignment.md` for the
 * TS-vs-C# parameter-alignment matrix.
 *
 * Environment note (Linux/CI): the Linux primitive falls back gracefully without IBus — an EMPTY
 * `getAvailableOsKeyboards` list and a `null` `getCurrentOsKeyboard` are VALID results here (the
 * graceful-degradation contract, BHV-305 OS layer). Tests assert shape, not non-emptiness.
 */
import { test, expect, canConnectToPapi } from '../../fixtures/papi-live.fixture';

const OS_KEYBOARD_PREFIX = 'object:platform.osKeyboard-data';
const KEYBOARD_PREFIX = 'object:platform.keyboard-data';

/** A project id no real project can have — guarantees the no-association read paths fire. */
const BOGUS_PROJECT_ID = '__papi_verification_nonexistent__';
/** A keyboard id no OS can have — guarantees activation fails gracefully (VAL-B-04). */
const BOGUS_KEYBOARD_ID = '__papi_verification_bogus_keyboard__';
/** A webview id that is never focused — guarantees the focus guards fire. */
const BOGUS_WEB_VIEW_ID = '__papi_verification_bogus_webview__';

/** Protocol-level JSON-RPC error codes (MUST NOT be returned — indicates wiring bug). */
const JSON_RPC_PROTOCOL_CODES: readonly number[] = [
  -32700, // Parse error
  -32600, // Invalid Request
  -32601, // Method not found
  -32602, // Invalid params
  -32603, // Internal error
];

/**
 * Assert that, if a JSON-RPC error was returned, it is NOT a protocol-level error. A business error
 * (any code outside the protocol reserved range) proves the handler was reached and executed. See
 * backend-smoke-tests.md Smoke Test 4 rubric.
 */
function expectNotProtocolError(
  response: { error?: { code: number; message: string } },
  wireMethod: string,
): void {
  if (response.error) {
    const msg = `${wireMethod} returned JSON-RPC protocol error ${response.error.code}: "${response.error.message}" — this indicates the handler was NOT reached (parameter shape mismatch, missing registration, or internal serialization crash).`;
    expect(JSON_RPC_PROTOCOL_CODES, msg).not.toContain(response.error.code);
  }
}

test.beforeAll(async () => {
  test.skip(
    !(await canConnectToPapi()),
    'PAPI server not running on ws://localhost:8876 — skipping keyboard-switching command verification',
  );
});

test.describe('keyboard-switching PAPI wire verification (data providers + events)', () => {
  // ---------------------------------------------------------------------------
  // 1. Discovery — both data providers registered with every documented method
  // ---------------------------------------------------------------------------
  test('both keyboard data providers and all documented methods are discoverable via rpc.discover', async ({
    papiLive,
  }) => {
    const schema = await papiLive.request<{ methods: { name: string }[] }>('rpc.discover', []);
    const methodNames = new Set(schema.methods.map((m) => m.name));

    // C# platform.osKeyboard (data-contracts §9 "C# Implementation"; OsKeyboardDataProvider.cs)
    const expectedOsKeyboard = [
      `${OS_KEYBOARD_PREFIX}.getCurrentOsKeyboard`,
      `${OS_KEYBOARD_PREFIX}.setCurrentOsKeyboard`,
      `${OS_KEYBOARD_PREFIX}.getAvailableOsKeyboards`,
    ];

    // TS platform.keyboard (data-contracts §9 "Wire-Method Name Bindings"; 6 data types +
    // resetCurrentKeyboard peer method; read-only data types still expose registration-parity
    // setters that always reject — CAP-016 I-8)
    const expectedKeyboard = [
      `${KEYBOARD_PREFIX}.getProjectDefaultKeyboard`,
      `${KEYBOARD_PREFIX}.setProjectDefaultKeyboard`,
      `${KEYBOARD_PREFIX}.getProjectDefaultKeyboards`,
      `${KEYBOARD_PREFIX}.getSystemDefaultKeyboard`,
      `${KEYBOARD_PREFIX}.getAvailableKeyboards`,
      `${KEYBOARD_PREFIX}.getCurrentKeyboard`,
      `${KEYBOARD_PREFIX}.setCurrentKeyboard`,
      `${KEYBOARD_PREFIX}.getLastUsedKeyboards`,
      `${KEYBOARD_PREFIX}.resetCurrentKeyboard`,
    ];

    [...expectedOsKeyboard, ...expectedKeyboard].forEach((name) => {
      expect(methodNames, `expected ${name} to be registered`).toContain(name);
    });

    // The network-object roots themselves (registration sentinels).
    expect(methodNames).toContain(OS_KEYBOARD_PREFIX);
    expect(methodNames).toContain(KEYBOARD_PREFIX);

    // Wire-surface hygiene: the engine's internal resolvers are ECMAScript-private (`#`) and must
    // NOT leak onto the network (P3B.5 runtime-verification finding — TS `private` is not enough).
    expect(methodNames).not.toContain(`${KEYBOARD_PREFIX}.resolveResetTargetAsync`);
    expect(methodNames).not.toContain(`${KEYBOARD_PREFIX}.resolveSetCurrentKeyboardTargetAsync`);
  });

  // ---------------------------------------------------------------------------
  // 2. C# platform.osKeyboard round-trips (CAP-007)
  // ---------------------------------------------------------------------------

  test('osKeyboard.getCurrentOsKeyboard — selector undefined returns string or null (graceful no-IBus)', async ({
    papiLive,
  }) => {
    const wire = `${OS_KEYBOARD_PREFIX}.getCurrentOsKeyboard`;
    const response = await papiLive.requestRaw(wire, [undefined]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} should not error`).toBeUndefined();
    // Linux-without-IBus gracefully reports null; with a real OS layer it is an opaque string id.
    const keyboardId = response.result ?? undefined;
    if (keyboardId !== undefined) {
      expect(typeof keyboardId).toBe('string');
    }
  });

  test('osKeyboard.getAvailableOsKeyboards — returns KeyboardOption[] (empty list is a valid graceful result)', async ({
    papiLive,
  }) => {
    const wire = `${OS_KEYBOARD_PREFIX}.getAvailableOsKeyboards`;
    const response = await papiLive.requestRaw(wire, [undefined]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} should not error`).toBeUndefined();
    expect(Array.isArray(response.result), `${wire} must return an array`).toBe(true);
    // If the OS enumerated anything, each option must round-trip the camelCase KeyboardOption
    // shape (C# record KeyboardOption(Id, Name, IsRtlScript?) → { id, name, isRtlScript? }).
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- wire response narrowed after Array.isArray assert above
    const options = response.result as { id: unknown; name: unknown }[];
    options.forEach((option) => {
      expect(typeof option.id).toBe('string');
      expect(typeof option.name).toBe('string');
    });
  });

  test('osKeyboard.setCurrentOsKeyboard — bogus keyboard id is swallowed (VAL-B-04) and returns false', async ({
    papiLive,
  }) => {
    const wire = `${OS_KEYBOARD_PREFIX}.setCurrentOsKeyboard`;
    const response = await papiLive.requestRaw(wire, [undefined, BOGUS_KEYBOARD_ID]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} must never propagate activation failures`).toBeUndefined();
    // VAL-B-04: activation failures are swallowed and reported as `false`, never thrown — and no
    // onDidUpdate broadcast happens (broadcast-only-on-success is pinned by the C# unit suite).
    expect(response.result).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // 3. TS platform.keyboard read round-trips (CAP-015) — cross-process: these
  //    prove the RENDERER-registered engine is reachable over the network.
  // ---------------------------------------------------------------------------

  test('keyboard.getProjectDefaultKeyboard — unknown project returns no-association (null/undefined)', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.getProjectDefaultKeyboard`;
    const response = await papiLive.requestRaw(wire, [
      { projectId: BOGUS_PROJECT_ID, surfaceType: 'vernacular' },
    ]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} read path should not error`).toBeUndefined();
    // No association → undefined (serialized as null/absent on the wire).
    expect(response.result ?? undefined).toBeUndefined();
  });

  test('keyboard.getProjectDefaultKeyboards — unknown project returns empty per-surface map', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.getProjectDefaultKeyboards`;
    const response = await papiLive.requestRaw(wire, [BOGUS_PROJECT_ID]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} read path should not error`).toBeUndefined();
    expect(response.result).toEqual({});
  });

  test('keyboard.getSystemDefaultKeyboard — returns startup capture (string or null when capture failed)', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.getSystemDefaultKeyboard`;
    const response = await papiLive.requestRaw(wire, [undefined]);
    expectNotProtocolError(response, wire);
    expect(
      response.error,
      `${wire} never throws (INV-C05 capture-failure tolerance)`,
    ).toBeUndefined();
    const capturedKeyboardId = response.result ?? undefined;
    if (capturedKeyboardId !== undefined) {
      expect(typeof capturedKeyboardId).toBe('string');
    }
  });

  test('keyboard.getAvailableKeyboards — passthrough returns the same shape as the OS layer (live papi.keyboard round-trip)', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.getAvailableKeyboards`;
    const response = await papiLive.requestRaw(wire, [undefined]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} should not error`).toBeUndefined();
    expect(Array.isArray(response.result), `${wire} must return an array`).toBe(true);

    // The engine is a passthrough to platform.osKeyboard — both ends of the chain must agree
    // (closes the carried-over CAP-016 live round-trip item).
    const osResponse = await papiLive.requestRaw(`${OS_KEYBOARD_PREFIX}.getAvailableOsKeyboards`, [
      undefined,
    ]);
    expect(response.result).toEqual(osResponse.result);
  });

  test('keyboard.getCurrentKeyboard — selector undefined: CurrentKeyboard or OS-query-failed business error (never protocol error)', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.getCurrentKeyboard`;
    const response = await papiLive.requestRaw(wire, [undefined]);
    expectNotProtocolError(response, wire);
    if (response.error) {
      // Linux-without-IBus: the OS layer has no current keyboard, so the engine throws the
      // documented KEYBOARDING_OS_QUERY_FAILED (UNAVAILABLE) business error — handler reached.
      expect(response.error.message).toBeTruthy();
    } else {
      // A real OS layer: full CurrentKeyboard shape with ad-hoc (undefined) attribution allowed.
      expect(response.result).toHaveProperty('keyboardId');
    }
  });

  test('keyboard.getCurrentKeyboard — non-focused webview selector returns undefined (focus guard)', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.getCurrentKeyboard`;
    const response = await papiLive.requestRaw(wire, [BOGUS_WEB_VIEW_ID]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} guard path should not error`).toBeUndefined();
    expect(response.result ?? undefined).toBeUndefined();
  });

  test('keyboard.getLastUsedKeyboards — unknown project returns empty per-surface map', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.getLastUsedKeyboards`;
    const response = await papiLive.requestRaw(wire, [BOGUS_PROJECT_ID]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} read path should not error`).toBeUndefined();
    expect(response.result).toEqual({});
  });

  // ---------------------------------------------------------------------------
  // 4. TS platform.keyboard write-side guards — business errors prove the
  //    handler executed; none of these mutate state (guards fire first).
  // ---------------------------------------------------------------------------

  test('keyboard.setProjectDefaultKeyboard — unknown surface type rejected with business error (INVALID_ARGUMENT), no side effects', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.setProjectDefaultKeyboard`;
    const response = await papiLive.requestRaw(wire, [
      { projectId: BOGUS_PROJECT_ID, surfaceType: '__bogus_surface__' },
      'some-keyboard-id',
    ]);
    expectNotProtocolError(response, wire);
    expect(response.error, 'unknown surfaceType must be rejected (write-side guard)').toBeDefined();
  });

  test('keyboard.setCurrentKeyboard — { surfaceType } without webview selector rejected (no project context)', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.setCurrentKeyboard`;
    const response = await papiLive.requestRaw(wire, [undefined, { surfaceType: 'vernacular' }]);
    expectNotProtocolError(response, wire);
    expect(
      response.error,
      'surfaceType value without webview selector must be rejected (BA-RF-002)',
    ).toBeDefined();
  });

  test('keyboard.setCurrentKeyboard — ad-hoc bogus keyboardId is a silent no-op (false), never throws', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.setCurrentKeyboard`;
    const response = await papiLive.requestRaw(wire, [
      undefined,
      { keyboardId: BOGUS_KEYBOARD_ID },
    ]);
    expectNotProtocolError(response, wire);
    expect(
      response.error,
      'OS-layer activation failure must be swallowed (INV-C04)',
    ).toBeUndefined();
    expect(response.result).toBe(false);
  });

  test('keyboard.resetCurrentKeyboard — non-focused webview rejected with business error (NOT_FOUND, case 6)', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.resetCurrentKeyboard`;
    const response = await papiLive.requestRaw(wire, [BOGUS_WEB_VIEW_ID]);
    expectNotProtocolError(response, wire);
    expect(
      response.error,
      'non-focused webview must be rejected (6-case table row 6)',
    ).toBeDefined();
  });

  test('keyboard.resetCurrentKeyboard — undefined webview resolves via focus/system-default fallback and returns boolean', async ({
    papiLive,
  }) => {
    const wire = `${KEYBOARD_PREFIX}.resetCurrentKeyboard`;
    const response = await papiLive.requestRaw(wire, [undefined]);
    expectNotProtocolError(response, wire);
    expect(response.error, `${wire} fallback path should not error`).toBeUndefined();
    // Linux-without-IBus: no system default captured → no activation performed → false.
    // With a real OS layer this may be true. Either is a valid boolean wire result.
    expect(typeof response.result).toBe('boolean');
  });

  test('keyboard read-only data types — registration-parity setters always reject (CAP-016 I-8)', async ({
    papiLive,
  }) => {
    // The four read-only data types are `set: never` at the TYPE level but must carry runtime
    // setters for registerEngine parity. Each must reject with a business error — reaching the
    // throwing setter proves registration parity held at runtime. Sequential on purpose:
    // papi-live shares one WebSocket; per-method assertion messages report the exact method.
    async function expectReadOnlySetterRejects(wire: string): Promise<void> {
      const response = await papiLive.requestRaw(wire, [undefined, undefined]);
      expectNotProtocolError(response, wire);
      expect(response.error, `${wire} must reject (read-only data type)`).toBeDefined();
      expect(response.error?.message).toMatch(/disabled/i);
    }

    await expectReadOnlySetterRejects(`${KEYBOARD_PREFIX}.setProjectDefaultKeyboards`);
    await expectReadOnlySetterRejects(`${KEYBOARD_PREFIX}.setSystemDefaultKeyboard`);
    await expectReadOnlySetterRejects(`${KEYBOARD_PREFIX}.setAvailableKeyboards`);
    await expectReadOnlySetterRejects(`${KEYBOARD_PREFIX}.setLastUsedKeyboards`);
  });
});
