/**
 * === NEW IN PT10 === Reason: Runtime regression test for the markers-checklist PAPI network object
 * (`platformScripture.checklistService`). Catches the integration failures that unit tests cannot:
 * PAPI registration, JSON-RPC routing, C#/JS type serialization, and parameter-count alignment at
 * the wire boundary.
 *
 * Verifies the three methods registered by `ChecklistNetworkObject.InitializeAsync`:
 *
 * - `buildChecklistData(ChecklistRequest)` — main pipeline
 * - `resolveComparativeTexts(activeProjectId, requestedTexts)` — GUID/name resolution
 * - `validateMarkerSettings(equivalentMarkers)` — pure validation
 *
 * Uses the live PAPI fixture: requires a running Platform.Bible instance with the WebSocket server
 * on port 8876. Tests skip automatically if the server is unreachable.
 */
import { test, expect, canConnectToPapi } from '../../fixtures/papi-live.fixture';

/**
 * JSON-RPC protocol-level error codes (per JSON-RPC 2.0 spec). A handler that routes correctly and
 * executes its body must NOT surface any of these — business-logic errors are implementation errors
 * (server-defined codes), not protocol errors.
 */
const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
const INVALID_PARAMS = -32602;
const INTERNAL_ERROR = -32603;

const PROTOCOL_ERROR_CODES = [
  PARSE_ERROR,
  INVALID_REQUEST,
  METHOD_NOT_FOUND,
  INVALID_PARAMS,
  INTERNAL_ERROR,
] as const;

/** Network-object wire prefix registered by c-sharp/Checklists/ChecklistNetworkObject.cs. */
const NETWORK_OBJECT = 'object:platformScripture.checklistService';
const BUILD_METHOD = `${NETWORK_OBJECT}.buildChecklistData`;
const RESOLVE_METHOD = `${NETWORK_OBJECT}.resolveComparativeTexts`;
const VALIDATE_METHOD = `${NETWORK_OBJECT}.validateMarkerSettings`;

test.beforeAll(async () => {
  test.skip(
    !(await canConnectToPapi()),
    'PAPI WebSocket server (port 8876) is not running — skipping markers-checklist command verification',
  );
});

test.describe('Markers Checklist PAPI Command Verification', () => {
  test('all expected network-object methods are discoverable via rpc.discover', async ({
    papiLive,
  }) => {
    const schema = await papiLive.request<{ methods: { name: string }[] }>('rpc.discover', []);
    const methodNames = schema.methods.map((m) => m.name);

    // The base network-object probe handler (returns true from the object prefix).
    expect(methodNames).toContain(NETWORK_OBJECT);
    // The three registered service methods.
    expect(methodNames).toContain(BUILD_METHOD);
    expect(methodNames).toContain(RESOLVE_METHOD);
    expect(methodNames).toContain(VALIDATE_METHOD);
  });

  test.describe('validateMarkerSettings', () => {
    test('returns valid=true with parsed pairs for well-formed input "p/q q1/q2"', async ({
      papiLive,
    }) => {
      const result = await papiLive.request<{
        valid: boolean;
        parsedPairs: { marker1: string; marker2: string }[] | null;
        errorMessage: string | null;
      }>(VALIDATE_METHOD, ['p/q q1/q2']);

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBeNull();
      expect(result.parsedPairs).not.toBeNull();
      expect(result.parsedPairs).toEqual([
        { marker1: 'p', marker2: 'q' },
        { marker1: 'q1', marker2: 'q2' },
      ]);
    });

    test('returns valid=false with error message for malformed input "invalid"', async ({
      papiLive,
    }) => {
      const result = await papiLive.request<{
        valid: boolean;
        parsedPairs: { marker1: string; marker2: string }[] | null;
        errorMessage: string | null;
      }>(VALIDATE_METHOD, ['invalid']);

      expect(result.valid).toBe(false);
      expect(result.parsedPairs).toBeNull();
      expect(result.errorMessage).toBe('Equivalent markers need to be entered in the form: p/q');
    });

    test('returns valid=true with empty array for empty string', async ({ papiLive }) => {
      const result = await papiLive.request<{
        valid: boolean;
        parsedPairs: { marker1: string; marker2: string }[] | null;
        errorMessage: string | null;
      }>(VALIDATE_METHOD, ['']);

      expect(result.valid).toBe(true);
      expect(result.parsedPairs).toEqual([]);
      expect(result.errorMessage).toBeNull();
    });
  });

  /**
   * Pick the first Paratext project id (USFM-capable). `ChecklistService` resolves project ids via
   * `LocalParatextProjects.GetParatextProject(id)` which parses ids as `HexId` — non-Paratext
   * projects (resource projects, lexical references) have short string ids like "SDBG" and will
   * fail the hex parse. A hex-style GUID is required.
   */
  async function findParatextProjectId(
    papiLive: import('../../fixtures/papi-live.fixture').PapiLiveClient,
  ): Promise<string | undefined> {
    const projects = await papiLive.request<{ id: string; projectInterfaces: string[] }[]>(
      'object:ProjectLookupService.getMetadataForAllProjects',
      [{}],
    );
    const match = projects?.find((p) =>
      p.projectInterfaces?.includes('platformScripture.USFM_Book'),
    );
    return match?.id;
  }

  test.describe('resolveComparativeTexts', () => {
    test('returns { texts: [] } for a valid project ID with no requested texts', async ({
      papiLive,
    }) => {
      // Pick any existing Paratext (USFM) project so the active-project lookup succeeds;
      // the feature excludes the active project from results, so an empty requested-texts
      // list is guaranteed to produce an empty response regardless of which project we use.
      const activeProjectId = await findParatextProjectId(papiLive);
      test.skip(
        !activeProjectId,
        'No Paratext (USFM) projects available for resolveComparativeTexts happy-path test',
      );

      const result = await papiLive.request<{
        texts: { id: string; name: string; fullName: string; available: boolean }[];
      }>(RESOLVE_METHOD, [activeProjectId, []]);

      expect(result).toEqual({ texts: [] });
    });

    test('surfaces a non-protocol error for an invalid active project ID', async ({ papiLive }) => {
      // The active-project-not-found condition is a business-logic error, so we use
      // sendRaw-style access via requestRaw to read the error code without throwing.
      const response = await papiLive.requestRaw(RESOLVE_METHOD, [
        'definitely-not-a-project-id',
        [],
      ]);

      // Either the call succeeds (unlikely with a bogus id) or returns an implementation-
      // defined error. It must NOT be a protocol-level JSON-RPC error.
      if (response.error) {
        expect(PROTOCOL_ERROR_CODES).not.toContain(response.error.code);
      }
    });
  });

  test.describe('buildChecklistData', () => {
    test('returns a well-formed ChecklistResult for a valid project + 1-verse range', async ({
      papiLive,
    }) => {
      const projectId = await findParatextProjectId(papiLive);
      test.skip(
        !projectId,
        'No Paratext (USFM) projects available for buildChecklistData happy-path test',
      );

      // VerseRef wire shape is { book, chapterNum, verseNum } per VerseRefConverter.cs
      const request = {
        projectId,
        comparativeTextIds: [],
        markerSettings: { equivalentMarkers: '', markerFilter: '' },
        verseRange: {
          start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
          end: { book: 'GEN', chapterNum: 1, verseNum: 5 },
        },
        hideMatches: false,
        showVerseText: false,
      };

      const result = await papiLive.request<{
        rows: unknown[];
        excludedCount?: number;
        truncated?: boolean;
      }>(BUILD_METHOD, [request]);

      // Contract shape: rows is always an array (possibly empty). The other fields are
      // optional depending on the result path (success vs empty-message vs truncated).
      expect(Array.isArray(result.rows)).toBe(true);
    });

    test('surfaces a non-protocol error for an invalid (non-hex) project ID', async ({
      papiLive,
    }) => {
      const request = {
        projectId: 'nonexistent-project-id',
        comparativeTextIds: [],
        markerSettings: { equivalentMarkers: '', markerFilter: '' },
        verseRange: {
          start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
          end: { book: 'GEN', chapterNum: 1, verseNum: 5 },
        },
        hideMatches: false,
        showVerseText: false,
      };

      const response = await papiLive.requestRaw(BUILD_METHOD, [request]);

      // Business-logic failure is expected and proves the handler executed. Whatever
      // code is returned must be a server-defined code, not a protocol-level JSON-RPC
      // error (which would indicate routing/registration/marshalling is broken).
      expect(response.error).toBeDefined();
      if (response.error) {
        expect(PROTOCOL_ERROR_CODES).not.toContain(response.error.code);
      }
    });
  });
});
