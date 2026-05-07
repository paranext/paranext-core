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

// =============================================================================
// Phase-3-backend revision themes 1-12 — runtime verification against real
// projects (added 2026-04-30 re-verification pass).
//
// The base suite above proves the wire shape with a bogus projectId; the suite
// below proves theme-specific runtime paths against real ParatextData projects
// available in the live test environment. Tests dynamically discover real
// project IDs via filterProjects so they are stable across machines.
//
// Themes covered:
// - Theme 1 (M-014 wire shape) — old single-object shape now rejected with -32602
// - Theme 2 (AlertEntry[] response shape) — CreateBooksResult.errors carries
//   {text, caption, level} entries on the success path
// - Theme 3 (AlertCapture install) — orchestrator-side errors.Add path proves
//   the AlertEntry round-trip end-to-end; ParatextData-side Alert.Show capture
//   is covered by C# unit tests (ParatextGlobalsAlertInstallTests + 218 ManageBooks
//   tests). Real-disk write of new content cannot be exercised here without
//   user authorization for the specific project ID, so the install-path runtime
//   evidence is documented as a known gap (see runtime-evidence.md §"Known Gaps").
// - Theme 5 (NO_CUSTOM_VERSIFICATION precondition) — copyCustomVersification
//   returns FAILED_PRECONDITION when source has no custom.vrs
// - Theme 6 (3-level CreateBooks permission gate) — wire-boundary level-2
//   IsAdministratorOrTeamMember and orchestrator level-3 per-book CanEdit
//   both surface at the wire on real projects.
// =============================================================================

interface ProjectMetadata {
  projectId: string;
  name: string;
  projectType: string;
  isEditable: boolean;
}

interface ProjectListResult {
  projects: ProjectMetadata[];
}

interface ValidationResult {
  severity: 'ok' | 'warning' | 'error';
  message: string | null;
  affectedBooks: number[] | null;
}

interface AlertEntry {
  text: string;
  caption: string;
  level: 'info' | 'warning' | 'error';
}

interface CreateBooksResult {
  success: boolean;
  lastCreatedBookNum: number | null;
  warnings: AlertEntry[];
  errors: AlertEntry[];
  createdCount: number;
}

test.describe('manage-books phase-3-backend revision (themes 1-12) runtime verification', () => {
  // Each test discovers projects via filterProjects so the suite is portable —
  // there are no baked-in GUIDs and tests skip cleanly when a required project
  // type is not present in the current test environment.

  test('discover real projects available in this environment', async ({ papiLive }) => {
    const result = await papiLive.request<ProjectListResult>(`${METHOD_PREFIX}.filterProjects`, [
      { purpose: 'allScripture' },
    ]);
    expect(result.projects.length).toBeGreaterThan(0);
    // Surface what we found in the test output for traceability.
    // eslint-disable-next-line no-console -- diagnostic output for theme-verification trace
    console.log(
      `manage-books theme-verification: discovered ${result.projects.length} projects:`,
      result.projects.map((p) => `${p.name}(editable=${p.isEditable})`).join(', '),
    );
  });

  test('Theme 1: old single-object shape for copyCustomVersification is now rejected with -32602', async ({
    papiLive,
  }) => {
    // The pre-Theme-1 wire shape was a single record { sourceProjectId, destProjectId }.
    // After Theme 1 reconciliation, that shape MUST fail at deserialization (the C# delegate
    // takes two positional strings; a JSON object cannot bind to `string` at position 0).
    const wire = `${METHOD_PREFIX}.copyCustomVersification`;
    const response = await papiLive.requestRaw(wire, [
      { sourceProjectId: 'a', destProjectId: 'b' },
    ]);
    // EXPECT a protocol error here — this is the OPPOSITE of the rest of the suite.
    expect(response.error, 'old object shape must be rejected').toBeDefined();
    expect(response.error?.code).toBe(-32602);
  });

  test('Theme 5: copyCustomVersification surfaces NO_CUSTOM_VERSIFICATION when source lacks custom.vrs', async ({
    papiLive,
  }) => {
    // Discover projects fresh for this test (beforeAll hook pattern doesn't share state
    // across tests reliably with the fixture model — call filterProjects per test).
    const projectList = await papiLive.request<ProjectListResult>(
      `${METHOD_PREFIX}.filterProjects`,
      [{ purpose: 'allScripture' }],
    );

    // Find a project pair where the source has no custom.vrs. ROT, wgPIDGIN, MP1 are
    // known-no-custom in the test fixture set; the test picks the first available.
    const candidateNoCustomVrs = projectList.projects.find((p) =>
      ['ROT', 'wgPIDGIN', 'MP1'].includes(p.name),
    );
    const destination = projectList.projects.find((p) => p.name !== candidateNoCustomVrs?.name);

    test.skip(
      !candidateNoCustomVrs || !destination,
      'No project pair with non-custom-vrs source available; skipping.',
    );
    // After skip, both are defined — assert non-null for type narrowing.
    if (!candidateNoCustomVrs || !destination) return;

    const wire = `${METHOD_PREFIX}.copyCustomVersification`;
    const response = await papiLive.requestRaw(wire, [
      candidateNoCustomVrs.projectId,
      destination.projectId,
    ]);

    expectNotProtocolError(response, wire);
    expect(response.error, 'expected FAILED_PRECONDITION business error').toBeDefined();
    // Theme 5 fallback message: "Source project does not have a custom versification file"
    expect(response.error?.message).toMatch(/custom versification/i);
  });

  test('Theme 6 (level 2): createBooks against a project where user is not admin/team-member returns the level-2 gate error', async ({
    papiLive,
  }) => {
    const projectList = await papiLive.request<ProjectListResult>(
      `${METHOD_PREFIX}.filterProjects`,
      [{ purpose: 'allScripture' }],
    );

    // The level-2 wire-boundary gate (IsAdministratorOrTeamMember). In the live test
    // environment the user is admin on most projects; TPTS is the documented exception
    // (no admin/team-member role for the dev user). If TPTS is not present, skip.
    const nonAdminProject = projectList.projects.find((p) => p.name === 'TPTS');
    test.skip(
      !nonAdminProject,
      'No project found where user lacks admin/team-member role (Theme 6 level-2 gate not exercisable in this env).',
    );
    if (!nonAdminProject) return;

    const wire = `${METHOD_PREFIX}.createBooks`;
    const response = await papiLive.requestRaw(wire, [
      {
        projectId: nonAdminProject.projectId,
        bookNumbers: [60],
        creationMethod: 'empty',
      },
    ]);

    expectNotProtocolError(response, wire);
    expect(response.error, 'expected PERMISSION_DENIED business error').toBeDefined();
    expect(response.error?.message).toMatch(/administrator or team member/i);
  });

  test('Theme 6 (level 2 — validateCreateBooks pre-flight): non-admin returns ValidationResult.error', async ({
    papiLive,
  }) => {
    const projectList = await papiLive.request<ProjectListResult>(
      `${METHOD_PREFIX}.filterProjects`,
      [{ purpose: 'allScripture' }],
    );

    const nonAdminProject = projectList.projects.find((p) => p.name === 'TPTS');
    test.skip(
      !nonAdminProject,
      'No project found where user lacks admin/team-member role (Theme 6 validate-pre-flight not exercisable).',
    );
    if (!nonAdminProject) return;

    // ValidateCreateBooks does NOT throw for level-2 gap — it returns a structured
    // ValidationResult so the UI can disable the Create button without surfacing a
    // throw to the user. This is the documented Theme 6 contract.
    const result = await papiLive.request<ValidationResult>(
      `${METHOD_PREFIX}.validateCreateBooks`,
      [
        {
          projectId: nonAdminProject.projectId,
          bookNumbers: [60],
          creationMethod: 'empty',
        },
      ],
    );
    expect(result.severity).toBe('error');
    expect(result.message).toMatch(/administrator or team member/i);
  });

  test('Theme 6 (level 3 per-book CanEdit) + Theme 2 (AlertEntry[] response shape): createBooks against admin project where user lacks per-book edit returns AlertEntry[] errors', async ({
    papiLive,
  }) => {
    const projectList = await papiLive.request<ProjectListResult>(
      `${METHOD_PREFIX}.filterProjects`,
      [{ purpose: 'allScripture' }],
    );

    // Look for a project where the user IS admin/team-member (level-2 passes) but lacks
    // per-book CanEdit on at least one book. MP1 is the known fixture for this in the
    // current test env (admin but per-book CanEdit gates fire on book 40 / MAT).
    const partialEditProject = projectList.projects.find((p) => p.name === 'MP1');
    test.skip(
      !partialEditProject,
      'No project found where user is admin but lacks per-book CanEdit (Theme 6 level-3 not exercisable).',
    );
    if (!partialEditProject) return;

    // Book 40 (MAT) — the orchestrator's per-book CanEdit gate fires inside the
    // create loop. The book is filtered out and an errors entry is added.
    const wire = `${METHOD_PREFIX}.createBooks`;
    const result = await papiLive.request<CreateBooksResult>(wire, [
      {
        projectId: partialEditProject.projectId,
        bookNumbers: [40],
        creationMethod: 'empty',
      },
    ]);

    // Theme 2 wire shape: warnings/errors are AlertEntry[] (was string[] pre-revision).
    expect(Array.isArray(result.warnings)).toBe(true);
    expect(Array.isArray(result.errors)).toBe(true);

    // Theme 6 level-3: the per-book CanEdit failure is captured into errors[].
    expect(result.errors.length).toBeGreaterThan(0);
    const canEditError = result.errors.find((e) => /permission to edit/i.test(e.text));
    expect(canEditError, 'expected per-book CanEdit error captured into errors[]').toBeDefined();

    // Theme 2 / Theme 3 wire shape: each entry has the AlertEntry shape {text, caption, level}.
    if (canEditError) {
      expect(typeof canEditError.text).toBe('string');
      expect(typeof canEditError.caption).toBe('string');
      expect(['info', 'warning', 'error']).toContain(canEditError.level);
    }

    // The orchestrator filtered out the book — createdCount is 0; success false because
    // errors.Length > 0 per the documented contract.
    expect(result.createdCount).toBe(0);
    expect(result.success).toBe(false);
  });

  test('Theme 6 (copyBooks level-2 gate) + Theme 2 (response uses AlertEntry-typed errors): non-admin destination is rejected', async ({
    papiLive,
  }) => {
    const projectList = await papiLive.request<ProjectListResult>(
      `${METHOD_PREFIX}.filterProjects`,
      [{ purpose: 'allScripture' }],
    );

    // CopyBooks requires admin role on the DESTINATION (only-administrators gate).
    // In the test env the user is non-admin on MP1 (and TPTS). The source must be
    // editable enough that we can attempt the copy at all — ESVUS16 works.
    const destination = projectList.projects.find((p) => p.name === 'MP1');
    const source = projectList.projects.find((p) => p.name === 'ESVUS16');
    test.skip(
      !destination || !source,
      'Required source/destination pair not present in this environment.',
    );
    if (!destination || !source) return;

    const wire = `${METHOD_PREFIX}.copyBooks`;
    const response = await papiLive.requestRaw(wire, [
      {
        fromProjectId: source.projectId,
        toProjectId: destination.projectId,
        bookNumbers: [40],
      },
    ]);
    expectNotProtocolError(response, wire);
    // copyBooks throws PERMISSION_DENIED at the wire when the user is not admin on
    // the destination ("This is only available to administrators.")
    expect(response.error?.message).toMatch(/administrators/i);
  });

  test('Theme 2: createBooks success-path response carries warnings:AlertEntry[] and errors:AlertEntry[] (no string[] regression)', async ({
    papiLive,
  }) => {
    const projectList = await papiLive.request<ProjectListResult>(
      `${METHOD_PREFIX}.filterProjects`,
      [{ purpose: 'allScripture' }],
    );

    // Look for an editable project where the user is admin and the requested book
    // already exists — the orchestrator filters it out, returns success with empty
    // warnings/errors. This proves the wire field types are AlertEntry[] (arrays)
    // and not string[].
    const adminProject = projectList.projects.find((p) => p.name === 'ESVUS16');
    test.skip(!adminProject, 'ESVUS16 not present in environment.');
    if (!adminProject) return;

    const result = await papiLive.request<CreateBooksResult>(`${METHOD_PREFIX}.createBooks`, [
      {
        projectId: adminProject.projectId,
        bookNumbers: [1], // GEN — already present in ESVUS16, will be filtered out
        creationMethod: 'empty',
      },
    ]);

    // Theme 2: warnings & errors are arrays (the wire serializer must accept the
    // AlertEntry[] field types declared on the C# record).
    expect(Array.isArray(result.warnings)).toBe(true);
    expect(Array.isArray(result.errors)).toBe(true);
    // Success path with already-present book: book is filtered, no errors, count 0.
    expect(result.success).toBe(true);
    expect(result.createdCount).toBe(0);
  });
});
