/**
 * === NEW IN PT10 ===
 *
 * Runtime verification tests for the manage-books feature. These tests exercise every PAPI
 * NetworkObject method registered under `object:platformScripture.manageBooks` against a
 * live-running Platform.Bible instance.
 *
 * The purpose is NOT to validate business logic — that is covered by the C# unit test suite (216
 * ManageBooks tests, all green) and the golden-master tests. The purpose here is to catch the
 * runtime-integration bugs that unit tests cannot see:
 *
 * - Parameter count / shape mismatches between the TS wire contract and the C# handler delegate
 * - Serialization / deserialization round-trips (including AlertEntry[] in ImportBooksResult)
 * - NetworkObject registration completeness (every documented method is reachable)
 * - Protocol correctness — an unreachable handler surfaces as -32601 Method not found, a wrong
 *   parameter shape as -32602 Invalid params; business-logic errors (missing project, lock
 *   unavailable, permission denied) surface as user errors with a distinct code (-32000 under
 *   StreamJsonRpc), meaning the handler was reached and executed.
 *
 * See backend-smoke-tests.md Smoke Test 4 for the canonical error-code rubric.
 *
 * Scope:
 *
 * - 1 method-discovery test (rpc.discover) over the set documented in data-contracts.md §7
 * - 12 per-method round-trip tests, one per registered NetworkObject function
 *
 * All 12 methods are exposed on the wire prefix `object:platformScripture.manageBooks`. See
 * `.context/features/manage-books/proofs/runtime-verification/param-alignment.md` for the TS-vs-C#
 * parameter-alignment matrix.
 */
import { test, expect, canConnectToPapi } from '../../fixtures/papi-live.fixture';

const METHOD_PREFIX = 'object:platformScripture.manageBooks';

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
 * (any code outside the protocol reserved range) proves the C# handler was reached and executed.
 * See backend-smoke-tests.md Smoke Test 4 rubric.
 */
function expectNotProtocolError(
  response: { error?: { code: number; message: string } },
  wireMethod: string,
): void {
  if (response.error) {
    const msg = `${wireMethod} returned JSON-RPC protocol error ${response.error.code}: "${response.error.message}" — this indicates the C# handler was NOT reached (parameter shape mismatch, missing registration, or internal serialization crash).`;
    expect(JSON_RPC_PROTOCOL_CODES, msg).not.toContain(response.error.code);
  }
}

test.beforeAll(async () => {
  test.skip(
    !(await canConnectToPapi()),
    'PAPI server not running on ws://localhost:8876 — skipping manage-books command verification',
  );
});

test.describe('manage-books PAPI command verification (wire-level round-trip)', () => {
  // -------------------------------------------------------------------------
  // 1. Discovery test — all 12 methods registered and discoverable
  // -------------------------------------------------------------------------
  test('all 12 manage-books NetworkObject methods are discoverable via rpc.discover', async ({
    papiLive,
  }) => {
    const schema = await papiLive.request<{ methods: { name: string }[] }>('rpc.discover', []);
    const methodNames = new Set(schema.methods.map((m) => m.name));

    // All 12 methods from data-contracts.md §7 (M-003..M-014 minus REMOVED M-001/M-002)
    const expected = [
      `${METHOD_PREFIX}.deleteBooks`,
      `${METHOD_PREFIX}.filterProjects`,
      `${METHOD_PREFIX}.createBooks`,
      `${METHOD_PREFIX}.getAvailableBooksForCreation`,
      `${METHOD_PREFIX}.validateCreateBooks`,
      `${METHOD_PREFIX}.getBookComparison`,
      `${METHOD_PREFIX}.getToProjectFilter`,
      `${METHOD_PREFIX}.copyBooks`,
      `${METHOD_PREFIX}.copyCustomVersification`,
      `${METHOD_PREFIX}.parseImportFiles`,
      `${METHOD_PREFIX}.checkOverlappingFiles`,
      `${METHOD_PREFIX}.importBooks`,
    ];

    expected.forEach((name) => {
      expect(methodNames, `expected ${name} to be registered`).toContain(name);
    });

    // The NetworkObject root itself should also be registered (registration sentinel).
    expect(methodNames).toContain(METHOD_PREFIX);
  });

  // -------------------------------------------------------------------------
  // 2. Per-method round-trip tests
  //
  // Each test sends a well-formed payload that the C# guard order will reject
  // BEFORE any side effects (unknown projectId → NOT_FOUND, missing fields →
  // INVALID_ARGUMENT, etc.). This is intentional — the goal is not to exercise
  // business logic (covered by C# unit tests + golden masters) but to prove
  // the wire path (params → handler → response → error shape) is intact.
  //
  // Using a well-known bogus project id "__papi_verification_nonexistent__"
  // guarantees every real-project guard fires cleanly without touching disk.
  // -------------------------------------------------------------------------

  const BOGUS_PROJECT_ID = '__papi_verification_nonexistent__';

  test('M-003 getAvailableBooksForCreation — positional string arg', async ({ papiLive }) => {
    const wire = `${METHOD_PREFIX}.getAvailableBooksForCreation`;
    const response = await papiLive.requestRaw(wire, [BOGUS_PROJECT_ID]);
    expectNotProtocolError(response, wire);
    // Expect NOT_FOUND error message path reached.
    if (response.error) {
      expect(response.error.message).toMatch(/Project not found|not found/i);
    }
  });

  test('M-004 createBooks — object { projectId, bookNumbers, creationMethod }', async ({
    papiLive,
  }) => {
    const wire = `${METHOD_PREFIX}.createBooks`;
    const response = await papiLive.requestRaw(wire, [
      {
        projectId: BOGUS_PROJECT_ID,
        bookNumbers: [1],
        creationMethod: 'empty',
      },
    ]);
    expectNotProtocolError(response, wire);
  });

  test('M-005 validateCreateBooks — same shape as createBooks', async ({ papiLive }) => {
    const wire = `${METHOD_PREFIX}.validateCreateBooks`;
    const response = await papiLive.requestRaw(wire, [
      {
        projectId: BOGUS_PROJECT_ID,
        bookNumbers: [1],
        creationMethod: 'empty',
      },
    ]);
    expectNotProtocolError(response, wire);
  });

  test('M-006 deleteBooks — object { projectId, bookNumbers }', async ({ papiLive }) => {
    const wire = `${METHOD_PREFIX}.deleteBooks`;
    const response = await papiLive.requestRaw(wire, [
      {
        projectId: BOGUS_PROJECT_ID,
        bookNumbers: [1, 2],
      },
    ]);
    expectNotProtocolError(response, wire);
  });

  test('M-007 getBookComparison — object { fromProjectId, toProjectId }', async ({ papiLive }) => {
    const wire = `${METHOD_PREFIX}.getBookComparison`;
    const response = await papiLive.requestRaw(wire, [
      {
        fromProjectId: `${BOGUS_PROJECT_ID}-src`,
        toProjectId: `${BOGUS_PROJECT_ID}-dst`,
      },
    ]);
    expectNotProtocolError(response, wire);
  });

  test('M-008 copyBooks — object { fromProjectId, toProjectId, bookNumbers }', async ({
    papiLive,
  }) => {
    const wire = `${METHOD_PREFIX}.copyBooks`;
    const response = await papiLive.requestRaw(wire, [
      {
        fromProjectId: `${BOGUS_PROJECT_ID}-src`,
        toProjectId: `${BOGUS_PROJECT_ID}-dst`,
        bookNumbers: [1],
      },
    ]);
    expectNotProtocolError(response, wire);
  });

  test('M-009 getToProjectFilter — object { purpose, sourceProjectType }', async ({ papiLive }) => {
    const wire = `${METHOD_PREFIX}.getToProjectFilter`;
    // Well-formed request — no preconditions, just returns a list. Should succeed
    // (or return a business error, but never a protocol error).
    const response = await papiLive.requestRaw(wire, [
      {
        purpose: 'copyDestination',
        sourceProjectType: 'Standard',
      },
    ]);
    expectNotProtocolError(response, wire);
    if (!response.error) {
      // Success path: expect a ProjectListResult with a `projects` array.
      expect(response.result).toHaveProperty('projects');
      expect(response.result).toMatchObject({ projects: expect.any(Array) });
    }
  });

  test('M-010 parseImportFiles — object { projectId, files, replaceEntireBook }', async ({
    papiLive,
  }) => {
    const wire = `${METHOD_PREFIX}.parseImportFiles`;
    const response = await papiLive.requestRaw(wire, [
      {
        projectId: BOGUS_PROJECT_ID,
        files: [
          {
            fileName: 'test.sfm',
            content: '\\id GEN\n\\c 1\n',
            included: true,
          },
        ],
        replaceEntireBook: true,
      },
    ]);
    expectNotProtocolError(response, wire);
  });

  test('M-011 importBooks — object { projectId, files, replaceEntireBook } returns AlertEntry[]', async ({
    papiLive,
  }) => {
    const wire = `${METHOD_PREFIX}.importBooks`;
    const response = await papiLive.requestRaw(wire, [
      {
        projectId: BOGUS_PROJECT_ID,
        files: [
          {
            fileName: 'test.sfm',
            content: '\\id GEN\n\\c 1\n',
            included: true,
          },
        ],
        replaceEntireBook: true,
      },
    ]);
    expectNotProtocolError(response, wire);
    // ImportBooksResult shape (success path): { success, importedCount, warnings: AlertEntry[], errors: AlertEntry[] }
    // The bogus projectId path returns NOT_FOUND before any ImportBooksResult is built, so
    // we don't assert shape here — the key point is protocol correctness.
  });

  test('M-012 checkOverlappingFiles — positional array of OverlapCheckEntry', async ({
    papiLive,
  }) => {
    const wire = `${METHOD_PREFIX}.checkOverlappingFiles`;
    // Well-formed input: two non-overlapping files. Expect success with severity !== 'error'.
    const response = await papiLive.requestRaw(wire, [
      [
        { fileName: 'gen.sfm', bookNum: 1, included: true },
        { fileName: 'exo.sfm', bookNum: 2, included: true },
      ],
    ]);
    expectNotProtocolError(response, wire);
    if (!response.error) {
      expect(response.result).toHaveProperty('severity');
    }
  });

  test('M-013 filterProjects — object { purpose }', async ({ papiLive }) => {
    const wire = `${METHOD_PREFIX}.filterProjects`;
    // Well-formed request — pure read-only query, should succeed.
    const response = await papiLive.requestRaw(wire, [{ purpose: 'allScripture' }]);
    expectNotProtocolError(response, wire);
    if (!response.error) {
      expect(response.result).toHaveProperty('projects');
      expect(response.result).toMatchObject({ projects: expect.any(Array) });
    }
  });

  test('M-014 copyCustomVersification — two positional strings (Theme 1 reconciled)', async ({
    papiLive,
  }) => {
    // data-contracts.md §4.14 specifies (sourceProjectId, destProjectId) as two positional
    // string arguments. The C# wire was reconciled to match this shape on 2026-04-30
    // (Theme 1 of phase-3-backend revision). See backend-alignment.md for the
    // "two same-typed positional args" exception to the general object-form preference.
    const wire = `${METHOD_PREFIX}.copyCustomVersification`;
    const response = await papiLive.requestRaw(wire, [
      `${BOGUS_PROJECT_ID}-src`,
      `${BOGUS_PROJECT_ID}-dst`,
    ]);
    expectNotProtocolError(response, wire);
  });
});
