/**
 * RED-phase TDD tests for CAP-001 — Mixed Capitalization Inventory open command + web-view-provider
 * wire identity.
 *
 * Feature: mixed-capitalization-inventory Capability: CAP-001 (openInventory command +
 * web-view-provider registration — TypeScript wiring in the `platform-scripture` extension; ZERO
 * net-new C#, per FN-008).
 *
 * Outside-In TDD: the outer acceptance test is the window-dedup contract (gm-017 / BHV-651). These
 * tests import a plain, side-effect-free seam module that the implementer must extract from
 * `main.ts` / `inventory.web-view.tsx` so the wiring is testable without executing the web-view
 * entry file (which assigns `global.webViewComponent` on import). The module under test:
 *
 * ./open-mixed-capitalization-inventory (currently does not exist — this is the RED state)
 *
 * Specs exercised:
 *
 * - Gm-017: FindOrCreateInventoryForm dedup contract (one web view per (projectId, checkType);
 *   re-open activates the existing window, does NOT re-Initialize).
 * - Spec-001 / INV-A02: persisted setting keys spelled correctly
 *   (`valid/invalidMixedCapitalization`).
 * - Spec-012 / INV-A03: on-wire CheckType identity is the PT9 typo `'MixexCapitalization'`, preserved
 *   verbatim.
 *
 * Only the external PAPI boundary (`@papi/frontend`) is mocked — no internal collaborators are
 * mocked (Testing Trophy).
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// --- External boundary mock: @papi/frontend webViews service ---------------------------------

interface WebViewDefinitionLike {
  id: string;
  webViewType?: string;
  projectId?: string;
  scrollGroupScrRef?: unknown;
}

const mockGetOpenWebViewDefinition =
  vi.fn<(webViewId: string) => Promise<WebViewDefinitionLike | undefined>>();
const mockOpenWebView =
  vi.fn<
    (
      webViewType: string,
      layout: unknown,
      options: { projectId?: string; existingId?: string; createNewIfNotFound?: boolean },
    ) => Promise<string | undefined>
  >();
const mockReloadWebView =
  vi.fn<
    (webViewType: string, webViewId: string, options: unknown) => Promise<string | undefined>
  >();

vi.mock('@papi/frontend', () => ({
  default: {
    webViews: {
      getOpenWebViewDefinition: (webViewId: string) => mockGetOpenWebViewDefinition(webViewId),
      openWebView: (
        webViewType: string,
        layout: unknown,
        options: { projectId?: string; existingId?: string; createNewIfNotFound?: boolean },
      ) => mockOpenWebView(webViewType, layout, options),
      reloadWebView: (webViewType: string, webViewId: string, options: unknown) =>
        mockReloadWebView(webViewType, webViewId, options),
    },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

// Module under test — extracted seam the implementer must create. Importing a not-yet-existing
// module is the RED signal at compile time; once it exists the behavioral assertions take over.
// The import is intentionally placed after `vi.mock` for readability; vitest hoists `vi.mock`
// above all imports regardless of position, so the mock is in effect when this module loads.
/* eslint-disable import/no-unresolved, import/extensions, import/first */
import {
  openMixedCapitalizationInventory,
  mixedCapitalizationInventoryWebViewType,
  mixedCapitalizationCheckId,
  validMixedCapitalizationSetting,
  invalidMixedCapitalizationSetting,
} from '../open-mixed-capitalization-inventory';
/* eslint-enable import/no-unresolved, import/extensions, import/first */

const EDITOR_WEB_VIEW_A = 'editor-webview-A';
const EDITOR_WEB_VIEW_B = 'editor-webview-B';
const PROJ_A = 'PROJ-A';
const PROJ_B = 'PROJ-B';

beforeEach(() => {
  mockGetOpenWebViewDefinition.mockReset();
  mockOpenWebView.mockReset();
  mockReloadWebView.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('CAP-001 wire identity (spec-012 / spec-001)', () => {
  it('persists CheckType as the PT9 typo "MixexCapitalization" verbatim', () => {
    // spec-012 INV-A03: CheckType.MixedCapitalization → 'MixexCapitalization'.
    // The PT9 typo (CheckType.InternalValue) is intentional and load-bearing for round-trip
    // with PT9-touched projects (TS-820). Renaming it would break interop.
    // BHV-651 wire identity / INV-A03.
    expect(mockGetOpenWebViewDefinition).toBeDefined(); // boundary wired
    expect(mixedCapitalizationCheckId).toBe('MixexCapitalization');
  });

  it('uses the platformScripture.mixedCapitalizationInventory web-view type, matching siblings', () => {
    // Sibling pattern: platformScripture.characterInventory / punctuationInventory / etc.
    // BHV-650 / BHV-651.
    expect(mixedCapitalizationInventoryWebViewType).toBe(
      'platformScripture.mixedCapitalizationInventory',
    );
  });

  it('spells the persisted approve/unapprove setting keys correctly (spec-001 / INV-A02)', () => {
    // spec-001 / INV-A02: the SSF parameter names are spelled CORRECTLY (only the CheckType
    // carries the typo). These keys drive the on-wire `ValidMixedCapitalization` /
    // `InvalidMixedCapitalization` SSF parameters (TS-001..TS-005, BHV-101).
    expect(validMixedCapitalizationSetting).toBe('platformScripture.validMixedCapitalization');
    expect(invalidMixedCapitalizationSetting).toBe('platformScripture.invalidMixedCapitalization');
  });
});

describe('CAP-001 openMixedCapitalizationInventory — open behavior (BHV-651 / §4.1)', () => {
  it('resolves projectId from the calling editor web view and opens a new inventory web view', async () => {
    // gm-017 scenario "same-project-twice" first call (windowsCreated → 1).
    // §4.1: projectId is inherited from the triggering editor's webViewId; SBA derived C#-side.
    // BHV-651 / TS-410.
    mockGetOpenWebViewDefinition.mockResolvedValue({ id: EDITOR_WEB_VIEW_A, projectId: PROJ_A });
    // No existing inventory window → dedup probe returns undefined; real open returns a new id.
    mockOpenWebView
      .mockResolvedValueOnce(undefined) // existingId:'?' probe finds nothing
      .mockResolvedValueOnce('mixed-cap-webview-A'); // create new

    const result = await openMixedCapitalizationInventory(EDITOR_WEB_VIEW_A);

    expect(result).toBe('mixed-cap-webview-A');
    // A web view of the correct type was opened.
    expect(mockOpenWebView).toHaveBeenCalledWith(
      mixedCapitalizationInventoryWebViewType,
      expect.anything(),
      expect.objectContaining({ projectId: PROJ_A }),
    );
  });

  it('returns undefined when no project context can be resolved (precondition / §4.1)', async () => {
    // §4.1 precondition: a project context MUST be resolvable from the triggering webViewId,
    // else the command returns undefined (matching the siblings) — no error thrown. TS-411 edge.
    mockGetOpenWebViewDefinition.mockResolvedValue(undefined);

    const result = await openMixedCapitalizationInventory('unknown-webview');

    expect(result).toBeUndefined();
    // Must NOT open any web view when there is no project context.
    expect(mockOpenWebView).not.toHaveBeenCalled();
  });
});

describe('CAP-001 window dedup contract — gm-017 / BHV-651 / INV-A14 / INV-C06', () => {
  it('same-project-twice: second open reuses the existing window and does NOT re-initialize', async () => {
    // gm-017 "same-project-twice": windowsCreated=1, secondCallReusesWindow=true,
    // secondCallTriggersInit=false. PT9 source: WindowCollection.FindOrCreateInventoryForm
    // (WindowCollection.cs:463-471) keys on (scrText, inventory.Type) and calls MakeActive on
    // the existing form rather than re-Initializing. PT10 implements this via the internal
    // `existingId:'?' / createNewIfNotFound:false` pattern (main.ts:239/:279). TS-410.
    mockGetOpenWebViewDefinition.mockImplementation(async (id: string) => {
      if (id === EDITOR_WEB_VIEW_A) return { id: EDITOR_WEB_VIEW_A, projectId: PROJ_A };
      // The dedup probe may look up the existing inventory web view's definition.
      if (id === 'mixed-cap-webview-A')
        return {
          id: 'mixed-cap-webview-A',
          webViewType: mixedCapitalizationInventoryWebViewType,
          projectId: PROJ_A,
        };
      return undefined;
    });

    // First open: probe finds nothing, then a new window is created.
    mockOpenWebView
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce('mixed-cap-webview-A')
      // Second open: dedup probe (existingId:'?') finds the existing window.
      .mockResolvedValueOnce('mixed-cap-webview-A');

    const first = await openMixedCapitalizationInventory(EDITOR_WEB_VIEW_A);
    const second = await openMixedCapitalizationInventory(EDITOR_WEB_VIEW_A);

    // secondCallReusesWindow=true: both calls resolve to the same web view id.
    expect(first).toBe('mixed-cap-webview-A');
    expect(second).toBe('mixed-cap-webview-A');

    // windowsCreated=1: exactly ONE plain create call (createNewIfNotFound !== false) across
    // both opens. The dedup probes use createNewIfNotFound:false and do not count as creates.
    const plainCreateCalls = mockOpenWebView.mock.calls.filter(
      ([, , options]) => options?.createNewIfNotFound !== false,
    );
    expect(plainCreateCalls).toHaveLength(1);

    // secondCallTriggersInit=false: the second open must NOT spawn a second create — reuse only.
    // (A reload/activate to bring-to-front is allowed; a fresh create is not.)
    const dedupProbeCalls = mockOpenWebView.mock.calls.filter(
      ([, , options]) => options?.existingId === '?' && options?.createNewIfNotFound === false,
    );
    expect(dedupProbeCalls.length).toBeGreaterThanOrEqual(1);
  });

  it('different-projects: opens a separate window per project (gm-017)', async () => {
    // gm-017 "different-projects": windowsCreated=2. The dedup key includes projectId, so
    // PROJ-A and PROJ-B each get their own Mixed Cap inventory window. TS-411.
    mockGetOpenWebViewDefinition.mockImplementation(async (id: string) => {
      if (id === EDITOR_WEB_VIEW_A) return { id: EDITOR_WEB_VIEW_A, projectId: PROJ_A };
      if (id === EDITOR_WEB_VIEW_B) return { id: EDITOR_WEB_VIEW_B, projectId: PROJ_B };
      return undefined;
    });

    // PROJ-A: probe miss → create; PROJ-B: probe miss → create.
    mockOpenWebView
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce('mixed-cap-webview-A')
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce('mixed-cap-webview-B');

    const a = await openMixedCapitalizationInventory(EDITOR_WEB_VIEW_A);
    const b = await openMixedCapitalizationInventory(EDITOR_WEB_VIEW_B);

    expect(a).toBe('mixed-cap-webview-A');
    expect(b).toBe('mixed-cap-webview-B');
    expect(a).not.toBe(b);

    // windowsCreated=2: two distinct plain create calls.
    const plainCreateCalls = mockOpenWebView.mock.calls.filter(
      ([, , options]) => options?.createNewIfNotFound !== false,
    );
    expect(plainCreateCalls).toHaveLength(2);
  });
});
