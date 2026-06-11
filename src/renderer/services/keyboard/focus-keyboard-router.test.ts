// CAP-014 (keyboard-switching) RED-phase tests — FocusKeyboardRouter: the PT10 consolidation of
// PT9's 19+ focus-binding keyboard callsites into one renderer-hosted router. Subscribes to
// `window.service` Focus + AppFocus (CAP-017) and the C# `platform.osKeyboard` CurrentOsKeyboard
// change surface; reads the focused WebView's `keyboardPreference`; routes all activation and
// restoration through the CAP-010 chokepoint; forwards cross-app observations into CAP-011;
// throttles nothing itself (CAP-012 owns the missing-keyboard cadence); writes last-used history
// via CAP-018; emits manual-switch detections through the CAP-015 seam.
//
// Traceability (strategic-plan-backend.md ### CAP-014 — consolidated PT10 spec; the PT9 behaviors
// are characterization-level, no per-callsite spec-XXX/gm-XXX exists):
// - data-contracts §4.6 items 1-6 (focus-driven activation abstract requirements), §4.5
//   (restore verb + INV-B1-05), §5.3 (missing-keyboard notification source), §5.4
//   (onDidDetectManualKeyboardSwitch — trigger conditions, side-effect-before-emission, cadence)
// - alignment-decisions #26 (focus-out last-used append), #28 (manual-switch detection branch —
//   focus-driven, no polling, no per-OS native events), #29 §A (renderer host — local subscribes)
// - spec-015 INV-MK-02 / `osCalls.activate` assertions (assigned HERE by CAP-012's traceability
//   validator): the silent system-default fallback continues on EVERY focus event; only the
//   notification is throttled (and the throttle is CAP-012's, exercised composed in one test)
// - Scenarios: TS-019 (restore on non-project focus — BHV-311), TS-020/TS-024/TS-025 (project
//   switch & immediate activation — BHV-313/351/352), TS-026 (comments surface activation —
//   BHV-355), TS-031 (vernacular widget activation — BHV-401), TS-064/TS-065 (missing-keyboard
//   cadence — BHV-350/VAL-B-05); TS-021 (BHV-314 IME suppression) is runtime-watch scope, see
//   the IME regression-watch deliverable (implementation/decisions/ime-regression-watch.md)
// - Behaviors: BHV-311..314, BHV-350..358, BHV-400..405, BHV-450 (EXT-105/110/150/151/152/200/201
//   consolidation), BHV-356 (EXT-153 BT filter routing via CAP-013)
// - CAP-010 plan D7 HAZARD pinned behaviorally: the real KeyboardActivationService initializes
//   BEFORE the router starts, so its decision-#25 CurrentOsKeyboard subscriber registers FIRST —
//   the detector must obtain the pre-update expected value THROUGH the activation service.

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  KeyboardId,
  KeyboardOption,
  KeyboardSurfaceType,
  ManualKeyboardSwitchDetection,
} from '@shared/services/keyboard.service-model';
import { osKeyboardServiceProviderName } from '@shared/services/keyboard.service-model';
import type { FocusSubject } from '@shared/services/window.service-model';
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
import { KeyboardActivationService } from '@renderer/services/keyboard/keyboard-activation-service';
import { CrossAppFocusDebounce } from '@renderer/services/keyboard/cross-app-focus-debounce';
import { MissingKeyboardNotifier } from '@renderer/services/keyboard/missing-keyboard-notifier';
import { LastUsedKeyboardStore } from '@renderer/services/keyboard/last-used-keyboard-store';
import type { FocusKeyboardRouterOptions } from '@renderer/services/keyboard/focus-keyboard-router';
import { FocusKeyboardRouter } from '@renderer/services/keyboard/focus-keyboard-router';

const {
  mockDataProvidersGet,
  mockNotificationSend,
  mockSubscribeFocus,
  mockSubscribeAppFocus,
  mockGetFocus,
  mockGetAppFocus,
  mockGetOpenWebViewDefinition,
} = vi.hoisted(() => ({
  mockDataProvidersGet: vi.fn(),
  mockNotificationSend: vi.fn(),
  mockSubscribeFocus: vi.fn(),
  mockSubscribeAppFocus: vi.fn(),
  mockGetFocus: vi.fn(),
  mockGetAppFocus: vi.fn(),
  mockGetOpenWebViewDefinition: vi.fn(),
}));

vi.mock('@shared/services/data-provider.service', () => ({
  __esModule: true,
  dataProviderService: { get: mockDataProvidersGet },
  default: { get: mockDataProvidersGet },
}));

vi.mock('@shared/services/notification.service', () => ({
  __esModule: true,
  notificationService: { send: mockNotificationSend },
  default: { send: mockNotificationSend },
}));

vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
  default: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@shared/services/window.service', () => ({
  __esModule: true,
  windowService: {
    subscribeFocus: mockSubscribeFocus,
    subscribeAppFocus: mockSubscribeAppFocus,
    getFocus: mockGetFocus,
    getAppFocus: mockGetAppFocus,
  },
  default: {
    subscribeFocus: mockSubscribeFocus,
    subscribeAppFocus: mockSubscribeAppFocus,
    getFocus: mockGetFocus,
    getAppFocus: mockGetAppFocus,
  },
}));

vi.mock('@shared/services/web-view.service', () => ({
  __esModule: true,
  webViewService: { getOpenWebViewDefinition: mockGetOpenWebViewDefinition },
  default: { getOpenWebViewDefinition: mockGetOpenWebViewDefinition },
}));

/** Guid-style ProjectIds (INV-C06 — ScrText.Guid string form) */
const GUID_CONFIGURED = 'b3a91111-2222-3333-4444-5555666677e2'; // vernacular ar-SA, comments he-IL
const GUID_UNCONFIGURED = 'c4b82222-3333-4444-5555-6666777788f3'; // no associations
const GUID_COMMENTS_ONLY = 'd5c93333-4444-5555-6666-7777888899a4'; // comments fr-FR only
const GUID_PROJECT_B = 'e6da4444-5555-6666-7777-88889999aab5'; // vernacular fr-FR
const GUID_DEFAULT_KBD = 'f7eb5555-6666-7777-8888-9999aaaabbc6'; // vernacular == system default
const GUID_MISSING = 'a8fc6666-7777-8888-9999-aaaabbbbccd7'; // vernacular th-TH (NOT installed)

/** The OS keyboard active at startup — captured as the SystemDefaultKeyboard (INV-C05) */
const SYSTEM_DEFAULT = 'en-US';

/** OS-enumerated keyboards — 'th-TH' is deliberately ABSENT (missing-keyboard branch) */
const AVAILABLE_KEYBOARD_IDS = [SYSTEM_DEFAULT, 'ar-SA', 'fr-FR', 'he-IL'];

/** WebView ids — one per routing fixture */
const WV_VERNACULAR = 'wv-vernacular';
const WV_COMMENTS = 'wv-comments';
const WV_PLAIN = 'wv-plain'; // has a projectId but NO keyboardPreference → non-project surface
const WV_UNCONFIGURED = 'wv-unconfigured';
const WV_COMMENTS_ONLY = 'wv-comments-only';
const WV_PROJECT_B = 'wv-project-b';
const WV_DEFAULT_KBD = 'wv-default-kbd';
const WV_MISSING = 'wv-missing';
const WV_DESTROYED = 'wv-destroyed'; // never present in the open-webviews map

const FOCUS_OTHER: FocusSubject = { focusType: 'other' };

function focusWebView(id: string): FocusSubject {
  return { focusType: 'webView', id };
}

function createWebViewDefinition(
  id: string,
  projectId?: string,
  keyboardPreference?: KeyboardSurfaceType,
): SavedWebViewDefinition {
  return { id, webViewType: `test.${id}`, projectId, keyboardPreference };
}

/**
 * Hand-rolled fake of the C# `platform.osKeyboard` DataProvider (CAP-007), extended from the
 * CAP-010 test fake (plan D3) with `getAvailableOsKeyboards` (drives the missing-keyboard branch)
 * and realistic set-notifies-subscribers semantics: a PT10-initiated `setCurrentOsKeyboard`
 * produces a `CurrentOsKeyboard` subscriber callback, exactly as the real DataProvider does
 * (decision #25) — this is what makes the self-initiated-ignore branch of the manual-switch
 * detector meaningful.
 */
function createFakeOsKeyboardProvider() {
  let currentKeyboardId: KeyboardId | undefined = SYSTEM_DEFAULT;
  const availableKeyboards: KeyboardOption[] = AVAILABLE_KEYBOARD_IDS.map((id) => ({
    id,
    name: id,
  }));
  const subscribers: ((newKeyboardId: KeyboardId | undefined) => void)[] = [];
  const unsubscribe = vi.fn(async () => true);
  function notifySubscribers(newKeyboardId: KeyboardId | undefined): void {
    [...subscribers].forEach((callback) => callback(newKeyboardId));
  }
  return {
    getCurrentOsKeyboard: vi.fn(async () => currentKeyboardId),
    setCurrentOsKeyboard: vi.fn(async (_selector: undefined, keyboardId: KeyboardId) => {
      currentKeyboardId = keyboardId;
      notifySubscribers(keyboardId);
      return true;
    }),
    getAvailableOsKeyboards: vi.fn(async () => availableKeyboards),
    subscribeCurrentOsKeyboard: vi.fn(
      async (_selector: undefined, callback: (newKeyboardId: KeyboardId | undefined) => void) => {
        subscribers.push(callback);
        return unsubscribe;
      },
    ),
    /** The current OS keyboard as the fake OS reports it */
    getCurrentKeyboardIdSync(): KeyboardId | undefined {
      return currentKeyboardId;
    },
    /** Every keyboard id written through `setCurrentOsKeyboard`, in order */
    getWrites(): KeyboardId[] {
      return this.setCurrentOsKeyboard.mock.calls.map(
        ([, keyboardId]: [undefined, KeyboardId]) => keyboardId,
      );
    },
    /** Simulates a USER (or external PAPI consumer) OS-keyboard change (decision #25 / #28) */
    emitExternalChange(newKeyboardId: KeyboardId): void {
      currentKeyboardId = newKeyboardId;
      notifySubscribers(newKeyboardId);
    },
  };
}

type FakeOsKeyboardProvider = ReturnType<typeof createFakeOsKeyboardProvider>;

let fakeOsKeyboard: FakeOsKeyboardProvider;

/** Per-test association fixture consumed by the structural CAP-009 fake (CAP-010 precedent) */
let associationsByProject: {
  [projectId: string]: { vernacular?: KeyboardId; comments?: KeyboardId };
};

/** Structural fake of the CAP-009 store seam — only `get` is consumed by the router */
const fakeAssociationStore: FocusKeyboardRouterOptions['associationStore'] = {
  get: async (projectId, surfaceType) => {
    const surfaces = associationsByProject[projectId];
    if (!surfaces) return undefined;
    if (surfaceType === 'vernacular') return surfaces.vernacular;
    if (surfaceType === 'comments') return surfaces.comments;
    return undefined;
  },
};

/** Per-test open-WebView fixture served through the mocked `webViewService` */
let openWebViews: { [webViewId: string]: SavedWebViewDefinition };

/** Captured `window.service` subscription callbacks (the router's renderer-local subscribes) */
let focusCallbacks: ((focusSubject: FocusSubject) => void)[];
let appFocusCallbacks: ((appFocus: { isAppFocused: boolean }) => void)[];
const mockFocusUnsubscribe = vi.fn(async () => true);
const mockAppFocusUnsubscribe = vi.fn(async () => true);

/**
 * Deterministic bounded settle for the router's async handlers (plan D11): all fakes resolve
 * immediately, so a fixed number of macrotask turns drains every promise chain. No real-time
 * dependence, no fake timers (the router has no timers).
 */
async function flushAsync(): Promise<void> {
  await Array.from({ length: 10 }).reduce<Promise<unknown>>(
    (chain) =>
      chain.then(
        () =>
          new Promise((resolve) => {
            setTimeout(resolve, 0);
          }),
      ),
    Promise.resolve(),
  );
}

async function emitFocus(focusSubject: FocusSubject): Promise<void> {
  [...focusCallbacks].forEach((callback) => callback(focusSubject));
  await flushAsync();
}

async function emitAppFocus(isAppFocused: boolean): Promise<void> {
  [...appFocusCallbacks].forEach((callback) => callback({ isAppFocused }));
  await flushAsync();
}

async function emitExternalOsKeyboardChange(newKeyboardId: KeyboardId): Promise<void> {
  fakeOsKeyboard.emitExternalChange(newKeyboardId);
  await flushAsync();
}

type RouterTestContext = {
  router: FocusKeyboardRouter;
  activationService: KeyboardActivationService;
  lastUsedStore: LastUsedKeyboardStore;
  /** Vi.fn spy standing in for CAP-012 — call-count/arg assertions at the router boundary */
  notifySpy: ReturnType<typeof vi.fn>;
  detections: ManualKeyboardSwitchDetection[];
};

/**
 * Composes the router with REAL collaborators (plan D2): real KeyboardActivationService
 * (initialized FIRST so its decision-#25 subscriber registers before anything the router takes —
 * the adversarial ordering of plan D5), real CrossAppFocusDebounce, real LastUsedKeyboardStore
 * (jsdom localStorage). Service-heavy CAP-009 stays a structural fake; CAP-012 is a spy by default
 * (one composed test passes the real notifier).
 */
async function createStartedRouter(
  overrides: Partial<FocusKeyboardRouterOptions> = {},
): Promise<RouterTestContext> {
  const activationService = new KeyboardActivationService({
    associationStore: fakeAssociationStore,
  });
  await activationService.initializeAsync();

  const lastUsedStore = new LastUsedKeyboardStore();
  const notifySpy = vi.fn();
  const detections: ManualKeyboardSwitchDetection[] = [];

  const router = new FocusKeyboardRouter({
    activationService,
    crossAppFocusDebounce: new CrossAppFocusDebounce(),
    missingKeyboardNotifier: { notify: notifySpy },
    associationStore: fakeAssociationStore,
    lastUsedKeyboardStore: lastUsedStore,
    notifyDidDetectManualKeyboardSwitch: (detection) => detections.push(detection),
    ...overrides,
  });
  await router.startAsync();
  // Drop the activation service's startup reads from the assertion windows
  fakeOsKeyboard.getCurrentOsKeyboard.mockClear();
  return { router, activationService, lastUsedStore, notifySpy, detections };
}

beforeEach(() => {
  localStorage.clear();
  fakeOsKeyboard = createFakeOsKeyboardProvider();
  focusCallbacks = [];
  appFocusCallbacks = [];

  associationsByProject = {
    [GUID_CONFIGURED]: { vernacular: 'ar-SA', comments: 'he-IL' },
    [GUID_UNCONFIGURED]: {},
    [GUID_COMMENTS_ONLY]: { comments: 'fr-FR' },
    [GUID_PROJECT_B]: { vernacular: 'fr-FR' },
    [GUID_DEFAULT_KBD]: { vernacular: SYSTEM_DEFAULT },
    [GUID_MISSING]: { vernacular: 'th-TH' },
  };
  openWebViews = {
    [WV_VERNACULAR]: createWebViewDefinition(WV_VERNACULAR, GUID_CONFIGURED, 'vernacular'),
    [WV_COMMENTS]: createWebViewDefinition(WV_COMMENTS, GUID_CONFIGURED, 'comments'),
    [WV_PLAIN]: createWebViewDefinition(WV_PLAIN, GUID_CONFIGURED, undefined),
    [WV_UNCONFIGURED]: createWebViewDefinition(WV_UNCONFIGURED, GUID_UNCONFIGURED, 'vernacular'),
    [WV_COMMENTS_ONLY]: createWebViewDefinition(WV_COMMENTS_ONLY, GUID_COMMENTS_ONLY, 'comments'),
    [WV_PROJECT_B]: createWebViewDefinition(WV_PROJECT_B, GUID_PROJECT_B, 'vernacular'),
    [WV_DEFAULT_KBD]: createWebViewDefinition(WV_DEFAULT_KBD, GUID_DEFAULT_KBD, 'vernacular'),
    [WV_MISSING]: createWebViewDefinition(WV_MISSING, GUID_MISSING, 'vernacular'),
  };

  mockDataProvidersGet.mockReset();
  mockDataProvidersGet.mockImplementation(async (providerName: string) => {
    if (providerName === osKeyboardServiceProviderName) return fakeOsKeyboard;
    throw new Error(`Unexpected data provider requested in test: ${providerName}`);
  });

  mockNotificationSend.mockReset();
  mockNotificationSend.mockResolvedValue('notification-id');

  mockGetOpenWebViewDefinition.mockReset();
  mockGetOpenWebViewDefinition.mockImplementation(async (webViewId: string) => {
    return openWebViews[webViewId];
  });

  mockSubscribeFocus.mockReset();
  mockSubscribeFocus.mockImplementation(
    async (_selector: undefined, callback: (focusSubject: FocusSubject) => void) => {
      focusCallbacks.push(callback);
      return mockFocusUnsubscribe;
    },
  );
  mockSubscribeAppFocus.mockReset();
  mockSubscribeAppFocus.mockImplementation(
    async (_selector: undefined, callback: (appFocus: { isAppFocused: boolean }) => void) => {
      appFocusCallbacks.push(callback);
      return mockAppFocusUnsubscribe;
    },
  );
  mockFocusUnsubscribe.mockClear();
  mockAppFocusUnsubscribe.mockClear();

  mockGetFocus.mockReset();
  mockGetFocus.mockResolvedValue(FOCUS_OTHER);
  mockGetAppFocus.mockReset();
  mockGetAppFocus.mockResolvedValue({ isAppFocused: true });
});

describe('FocusKeyboardRouter — lifecycle (start/stop)', () => {
  // Strategic-plan contract: stop() releases every subscription taken by start(); a stopped
  // router routes nothing
  it('stopAsync releases the Focus and AppFocus subscriptions and stops routing', async () => {
    const { router } = await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));
    expect(fakeOsKeyboard.getWrites()).toContain('ar-SA');

    await router.stopAsync();

    expect(mockFocusUnsubscribe).toHaveBeenCalled();
    expect(mockAppFocusUnsubscribe).toHaveBeenCalled();
    const writesBefore = fakeOsKeyboard.getWrites().length;
    await emitFocus(focusWebView(WV_PROJECT_B));
    expect(fakeOsKeyboard.getWrites().length).toBe(writesBefore);
  });
});

describe('FocusKeyboardRouter — focus-in activation (§4.6 item 2 / BHV-313, BHV-350, BHV-352, BHV-401)', () => {
  // ACCEPTANCE (strategic plan): focus-in on a WebView with keyboardPreference 'vernacular'
  // activates the project's configured vernacular keyboard (TS-025 / TS-031 family)
  it("activates the project's vernacular keyboard on focus-in to a vernacular-preference WebView (ACCEPTANCE)", async () => {
    await createStartedRouter();

    await emitFocus(focusWebView(WV_VERNACULAR));

    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA']);
    expect(fakeOsKeyboard.getCurrentKeyboardIdSync()).toBe('ar-SA');
  });

  // TS-026 / BHV-355 family: a comments-preference surface resolves the COMMENTS association
  it("activates the project's comments keyboard on focus-in to a comments-preference WebView", async () => {
    await createStartedRouter();

    await emitFocus(focusWebView(WV_COMMENTS));

    expect(fakeOsKeyboard.getWrites()).toEqual(['he-IL']);
  });

  // Plan D9 (PT9 ActivateKeyboard(null) / VAL-B-04; edge-cases.md "user keeps whatever keyboard
  // was previously active"): preference WITHOUT a configured keyboard = silent no-op — no OS
  // write, no restore, no toast
  it('does nothing on focus-in to a preference-carrying surface with no configured keyboard', async () => {
    await createStartedRouter();

    await emitFocus(focusWebView(WV_UNCONFIGURED));

    expect(fakeOsKeyboard.getWrites()).toEqual([]);
    expect(mockNotificationSend).not.toHaveBeenCalled();
  });

  // TS-020 / TS-024 / BHV-313/351 (plan D8): switching directly between two projects' surfaces
  // activates the new project's keyboard with NO intermediate system-default write (PT9 call
  // order dispose→create→activate has no restore in between; avoids OS keyboard churn)
  it('switches projects directly: project A keyboard then project B keyboard, no intermediate default write', async () => {
    await createStartedRouter();

    await emitFocus(focusWebView(WV_VERNACULAR));
    await emitFocus(focusWebView(WV_PROJECT_B));

    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA', 'fr-FR']);
  });
});

describe('FocusKeyboardRouter — missing configured keyboard (§4.6 item 5 / VAL-B-05 / TS-064, TS-065 / spec-015)', () => {
  // Data-contracts §4.6 item 5 (plan D4): configured keyboard absent from AvailableOsKeyboards →
  // notify (CAP-012 seam) AND fall back to the captured system default. The fallback is
  // UNCONDITIONAL — not the INV-B1-05-gated restore.
  it('notifies the missing-keyboard notifier and falls back to the system default', async () => {
    const { notifySpy } = await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR)); // move the OS off the default first (ar-SA)

    await emitFocus(focusWebView(WV_MISSING));

    expect(notifySpy).toHaveBeenCalledTimes(1);
    expect(notifySpy.mock.calls[0][0]).toBe('th-TH');
    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA', SYSTEM_DEFAULT]);
  });

  // spec-015 INV-MK-02 (assigned here by CAP-012's validator): the router NEVER self-throttles —
  // the detection branch (notify + fallback attempt) runs on EVERY focus event into the
  // missing-keyboard surface. PT9's `osCalls.activate.count == focusEvents.count` translates to
  // attempt-per-focus at the router boundary; redundant OS WRITES are deduped by the CAP-010
  // chokepoint (spec-013 disposition), so the attempt count is pinned via the notify seam.
  it('repeats the notify call and fallback attempt on every focus event into the missing-keyboard surface', async () => {
    const { notifySpy } = await createStartedRouter();

    await emitFocus(focusWebView(WV_MISSING));
    await emitFocus(FOCUS_OTHER);
    await emitFocus(focusWebView(WV_MISSING));
    await emitFocus(FOCUS_OTHER);
    await emitFocus(focusWebView(WV_MISSING));

    expect(notifySpy).toHaveBeenCalledTimes(3);
    expect(notifySpy.mock.calls.map((call) => call[0])).toEqual(['th-TH', 'th-TH', 'th-TH']);
    expect(fakeOsKeyboard.getCurrentKeyboardIdSync()).toBe(SYSTEM_DEFAULT);
  });

  // TS-064 composed with the REAL CAP-012 notifier: across repeated focus events the user sees
  // exactly ONE notification per missing id per session (VAL-B-05 / INV-C09) while the silent
  // fallback continues
  it('surfaces exactly one user notification per missing keyboard id per session (composed with real CAP-012)', async () => {
    await createStartedRouter({ missingKeyboardNotifier: new MissingKeyboardNotifier() });

    await emitFocus(focusWebView(WV_MISSING));
    await emitFocus(FOCUS_OTHER);
    await emitFocus(focusWebView(WV_MISSING));
    await emitFocus(FOCUS_OTHER);
    await emitFocus(focusWebView(WV_MISSING));

    const missingKeyboardSends = mockNotificationSend.mock.calls.filter(([notification]) =>
      String(notification?.notificationId ?? '').includes('missingKeyboard'),
    );
    expect(missingKeyboardSends.length).toBe(1);
  });
});

describe('FocusKeyboardRouter — restore on leaving a project surface (§4.6 item 2 / BHV-311, BHV-450 family / TS-019)', () => {
  // TS-019 / BHV-311 (EXT-200 consolidation): focus moving to a non-project subject restores the
  // captured system default for the project being left
  it('restores the system default when focus moves from a project surface to a non-WebView subject', async () => {
    await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));

    await emitFocus(FOCUS_OTHER);

    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA', SYSTEM_DEFAULT]);
  });

  // Strategic-plan core behavior 4: a WebView with NO keyboardPreference is a non-project
  // surface — leaving to it restores the default (even though it carries a projectId)
  it('treats a WebView without keyboardPreference as a non-project surface and restores the default', async () => {
    await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));

    await emitFocus(focusWebView(WV_PLAIN));

    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA', SYSTEM_DEFAULT]);
  });

  // INV-B1-05 (PT9 ActivateDefaultKeyboard checks the TEXT keyboard only): leaving a
  // comments-only-configured project does NOT restore — the OS keeps the comments keyboard
  it('does not restore when the project being left has no vernacular keyboard (comments-only project)', async () => {
    await createStartedRouter();
    await emitFocus(focusWebView(WV_COMMENTS_ONLY));
    expect(fakeOsKeyboard.getWrites()).toEqual(['fr-FR']);

    await emitFocus(FOCUS_OTHER);

    expect(fakeOsKeyboard.getWrites()).toEqual(['fr-FR']);
    expect(fakeOsKeyboard.getCurrentKeyboardIdSync()).toBe('fr-FR');
  });

  // Strategic-plan edge case (plan D10): a focus event for a DESTROYED WebView (definition no
  // longer resolvable) is handled defensively — no throw, treated as a non-project surface
  it('handles a focus event for a destroyed WebView defensively: no throw, default restored', async () => {
    await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));

    await emitFocus(focusWebView(WV_DESTROYED));

    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA', SYSTEM_DEFAULT]);
  });
});

describe('FocusKeyboardRouter — cross-app return debounce (§4.6 item 4 / FN-015 / FB-27866 / BHV-350)', () => {
  // Strategic-plan core behavior 5a: AppFocus false→true with NO user OS change re-activates the
  // focused surface's keyboard. The OS write is a designed chokepoint no-op here, so the
  // re-activation attempt is pinned at the activation-service boundary (plan-documented spy
  // exception).
  it('re-activates the focused project keyboard on cross-app return when the user did not change the OS keyboard', async () => {
    const { activationService } = await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));
    const activateSpy = vi.spyOn(activationService, 'activateAsync');

    await emitAppFocus(false);
    await emitAppFocus(true);

    expect(activateSpy).toHaveBeenCalledWith('ar-SA');
  });

  // Strategic-plan core behavior 5b (the load-bearing accessibility requirement, FN-015): a
  // user-initiated OS keyboard change made while PT10 was blurred is HONORED — the next
  // activation is gated and the user's keyboard survives the return
  it("preserves the user's OS keyboard choice made while the app was blurred (gated activation)", async () => {
    await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));
    await emitAppFocus(false);
    await emitExternalOsKeyboardChange('th-TH'); // user switches via the OS while PT10 is blurred
    const writesBeforeReturn = fakeOsKeyboard.getWrites().length;

    await emitAppFocus(true);

    expect(fakeOsKeyboard.getWrites().length).toBe(writesBeforeReturn);
    expect(fakeOsKeyboard.getCurrentKeyboardIdSync()).toBe('th-TH');
  });

  // CAP-011 gate is ONE-SHOT (plan D6 — the router consults the gate immediately before every
  // focus-driven activation, so the consumed gate does not leak into later activations)
  it('activates normally on the next focus-driven activation after a gated cross-app return', async () => {
    await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));
    await emitAppFocus(false);
    await emitExternalOsKeyboardChange('th-TH');
    await emitAppFocus(true); // gated — user choice preserved

    await emitFocus(focusWebView(WV_COMMENTS));

    expect(fakeOsKeyboard.getCurrentKeyboardIdSync()).toBe('he-IL');
  });
});

describe('FocusKeyboardRouter — manual-switch detection (§5.4 / alignment-decision #28)', () => {
  // Decision #28 happy path + data-contracts §5.4 side-effect note: detection on an unconfigured
  // project surface appends to the last-used store BEFORE emitting (the dialog reads the store on
  // open and must already see the just-switched keyboard)
  it('detects a manual switch on an unconfigured project surface: appends to last-used BEFORE emitting', async () => {
    let lastUsedAtEmit: KeyboardId[] | undefined;
    const detections: ManualKeyboardSwitchDetection[] = [];
    const lastUsedStore = new LastUsedKeyboardStore();
    await createStartedRouter({
      lastUsedKeyboardStore: lastUsedStore,
      notifyDidDetectManualKeyboardSwitch: (detection) => {
        detections.push(detection);
        lastUsedAtEmit = lastUsedStore.get(GUID_UNCONFIGURED).vernacular;
      },
    });
    await emitFocus(focusWebView(WV_UNCONFIGURED));

    await emitExternalOsKeyboardChange('th-TH');

    expect(detections).toEqual([
      {
        projectId: GUID_UNCONFIGURED,
        surfaceType: 'vernacular',
        manuallyChosenKeyboardId: 'th-TH',
      },
    ]);
    expect(lastUsedAtEmit).toEqual(['th-TH']);
    expect(lastUsedStore.get(GUID_UNCONFIGURED).vernacular).toEqual(['th-TH']);
  });

  // Decision #28 condition 1 + CAP-010 plan D7 HAZARD: PT10-initiated activations are ignored —
  // INCLUDING ones that did not pass through the router (e.g. CAP-015 callers using the
  // activation service directly). The expected value must come THROUGH the activation service,
  // not from router-private tracking; the service's decision-#25 subscriber registered FIRST.
  it('ignores PT10-initiated activations, including ones made through the activation service directly', async () => {
    const { activationService, lastUsedStore, detections } = await createStartedRouter();
    await emitFocus(focusWebView(WV_UNCONFIGURED));

    await activationService.activateAsync('fr-FR'); // simulates a CAP-015 caller, NOT the router
    await flushAsync();

    expect(detections).toEqual([]);
    expect(lastUsedStore.get(GUID_UNCONFIGURED)).toEqual({});
  });

  // Decision #28 condition 2: no focused project surface → no detection, no append; the
  // decision-#25 state propagation still happens (lastActive reflects the external change)
  it('ignores a manual switch when no project surface is focused (state still propagates)', async () => {
    const { activationService, lastUsedStore, detections } = await createStartedRouter();
    await emitFocus(FOCUS_OTHER);

    await emitExternalOsKeyboardChange('th-TH');

    expect(detections).toEqual([]);
    expect(lastUsedStore.get(GUID_CONFIGURED)).toEqual({});
    expect(activationService.getLastActiveKeyboardId()).toBe('th-TH');
  });

  // Decision #28 condition 3 (UX explicit scope): a manual override of a CONFIGURED surface is
  // transient — no detection, no append from the detection branch
  it('ignores a manual switch on a configured project surface', async () => {
    const { lastUsedStore, detections } = await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR));

    await emitExternalOsKeyboardChange('th-TH');

    expect(detections).toEqual([]);
    expect(lastUsedStore.get(GUID_CONFIGURED)).toEqual({});
  });

  // Decision #28 sequencing (plan D5): after a detection the expected value updates to the
  // detected id (a same-id re-emission does NOT re-detect), and a SECOND distinct manual switch
  // is detected as a new event (§5.4 cadence: one event per detection, two switches = two events)
  it('updates the comparison baseline after detection: same-id re-emission ignored, second distinct switch detected', async () => {
    const { activationService, detections } = await createStartedRouter();
    await emitFocus(focusWebView(WV_UNCONFIGURED));

    await emitExternalOsKeyboardChange('th-TH');
    expect(activationService.getLastActiveKeyboardId()).toBe('th-TH');
    await emitExternalOsKeyboardChange('th-TH'); // redundant re-emission — comparison equal
    await emitExternalOsKeyboardChange('vi-VN'); // a real second manual switch

    expect(detections.map((detection) => detection.manuallyChosenKeyboardId)).toEqual([
      'th-TH',
      'vi-VN',
    ]);
  });
});

describe('FocusKeyboardRouter — last-used append on focus-out (alignment-decision #26)', () => {
  // Decision #26 (a): on focus-out from a project surface, when the active OS keyboard differs
  // from the one sampled at focus-IN, the focus-OUT keyboard is appended. The append samples the
  // OS BEFORE the restore write (the appended id is the user's override, not the restored
  // default).
  it("appends the user's override keyboard on focus-out from a configured surface", async () => {
    const { lastUsedStore } = await createStartedRouter();
    await emitFocus(focusWebView(WV_VERNACULAR)); // sampled 'en-US' at focus-in; router activates ar-SA
    await emitExternalOsKeyboardChange('th-TH'); // user override mid-focus (configured → no detection)

    await emitFocus(FOCUS_OTHER);

    expect(lastUsedStore.get(GUID_CONFIGURED).vernacular).toEqual(['th-TH']);
  });

  // Decision #26 negative: no keyboard change across the focus period → no append (the project's
  // configured keyboard EQUALS the keyboard active at focus-in, so activation is a no-op too)
  it('appends nothing when the OS keyboard is unchanged between focus-in and focus-out', async () => {
    const { lastUsedStore } = await createStartedRouter();
    await emitFocus(focusWebView(WV_DEFAULT_KBD)); // configured == system default == current OS

    await emitFocus(FOCUS_OTHER);

    expect(lastUsedStore.get(GUID_DEFAULT_KBD)).toEqual({});
  });
});

describe('FocusKeyboardRouter — Biblical Terms filter routing (BHV-356 / EXT-153 / CAP-013)', () => {
  // TS-027 family: Glossary resolves to the project's VERNACULAR keyboard
  it("routes FilterType 'Glossary' to the project's vernacular keyboard", async () => {
    const { router } = await createStartedRouter();

    await router.routeBiblicalTermsFilterAsync('Glossary', GUID_CONFIGURED);

    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA']);
  });

  // PT9 'notes' ≙ PT10 'comments' (data-contracts §2.5 naming note)
  it("routes FilterType 'Notes' to the project's comments keyboard", async () => {
    const { router } = await createStartedRouter();

    await router.routeBiblicalTermsFilterAsync('Notes', GUID_CONFIGURED);

    expect(fakeOsKeyboard.getWrites()).toEqual(['he-IL']);
  });

  // CAP-013 systemDefault resolution: the INV-B1-05 gate is the CALLER's job — applied here.
  // Gate passes (project has a vernacular keyboard) → restore to the captured default.
  it('restores the system default for an unmapped filter type when the project has a vernacular keyboard', async () => {
    const { router } = await createStartedRouter();
    await router.routeBiblicalTermsFilterAsync('Glossary', GUID_CONFIGURED); // OS now off-default

    await router.routeBiblicalTermsFilterAsync('All', GUID_CONFIGURED);

    expect(fakeOsKeyboard.getWrites()).toEqual(['ar-SA', SYSTEM_DEFAULT]);
  });

  // INV-B1-05 gate blocks the restore for a project with no vernacular association
  it('does not restore for an unmapped filter type when the project has no vernacular keyboard', async () => {
    const { router } = await createStartedRouter();

    await router.routeBiblicalTermsFilterAsync('All', GUID_UNCONFIGURED);

    expect(fakeOsKeyboard.getWrites()).toEqual([]);
  });
});
