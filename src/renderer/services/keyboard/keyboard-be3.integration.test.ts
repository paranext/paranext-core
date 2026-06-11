// Micro-phase BE-3 (keyboard-switching) Pass-2 INTEGRATION tests — capability call chains
// composed by the REAL `keyboard.service-host` `initialize()` composition root (CAP-015): the
// engine (CAP-015/CAP-016 wire surface), CAP-009 association store, CAP-010 activation service,
// CAP-011 cross-app debounce, CAP-012 notifier, CAP-014 focus router (constructed AND started by
// the host), and CAP-018 last-used store are all the real wired cluster. Mocks are confined to
// TRUE external boundaries: `settings.service`, `data-provider.service` (registerEngine capture +
// fake C# `platform.osKeyboard` provider — CAP-007's chains were proven in the BE-1 Pass-2
// suite), `notification.service`, `localization.service`, `network.service`
// (`createNetworkEventEmitter`), `logger.service`, the `window.service` / `web-view.service`
// boundaries (CAP-017 Focus/AppFocus + `keyboardPreference` cross-cuts), and the
// `project-lookup` / project-data-provider EXT-106 legacy seam guards (never exercised — Guid
// fixtures). No internal collaborator is faked.
//
// Chains under test (BE-3 Integration Touchpoints; plan
// implementation/plans/test-writer-integration-BE3.md):
// 1. Full focus loop through the composed engine (BHV-450 / WARN-CAP014-1 round trip): wire
//    `setProjectDefaultKeyboard` → focus-in OS write → app-blur/refocus with the OS unchanged is
//    a quiet no-op (ungated re-activation deduped at the CAP-010 chokepoint — PTX-24331
//    disposition) → focus-out restores the captured system default
// 2. CAP-017 AppFocus → CAP-011 debounce → CAP-014 routing: a user OS change made while PT10 was
//    blurred is honored on cross-app return (FN-015 gate), produces NO manual-switch detection
//    (configured surface — §5.4 condition 3), and lands in CAP-018 last-used on focus-out
//    (decision #26) with one `LastUsedKeyboards` update
// 3. Wire mutation visibility (write→route consistency): each engine write fires exactly one
//    correctly-scoped `['ProjectDefaultKeyboard', 'ProjectDefaultKeyboards']` update AND the next
//    focus-in routes the LATEST association
// 4. Manual-switch detection through the composed stack (§5.4; decisions #26/#28): an external OS
//    change while an unconfigured project surface is focused emits exactly one
//    `platform.keyboard.onDidDetectManualKeyboardSwitch` network detection + one
//    `LastUsedKeyboards` update, readable via `getLastUsedKeyboards`
// 5. `resetCurrentKeyboard` 6-case-table spot-check through composition (backend-alignment
//    §resetCurrentKeyboard): case 4 reads the REAL `keyboardPreference` (CAP-017) after a wire
//    write; case 1 falls back to the captured system default with nothing focused
//
// Pass-2 expectation: these run against complete GREEN implementations and should PASS
// immediately; any failure is a real integration defect (not to be weakened away).

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlatformEventEmitter } from 'platform-bible-utils';
import type { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
import type { FocusSubject } from '@shared/services/window.service-model';
import { osKeyboardServiceProviderName } from '@shared/services/keyboard.service-model';
import type {
  KeyboardId,
  KeyboardOption,
  KeyboardServiceDataTypes,
  KeyboardSurfaceType,
  ManualKeyboardSwitchDetection,
} from '@shared/services/keyboard.service-model';
import type { KeyboardSwitchingDataProviderEngine } from '@renderer/services/keyboard.service-host';

const {
  mockSettingsGet,
  mockSettingsSet,
  mockDataProvidersGet,
  mockRegisterEngine,
  mockNotificationSend,
  mockSubscribeFocus,
  mockSubscribeAppFocus,
  mockGetFocus,
  mockGetAppFocus,
  mockGetOpenWebViewDefinition,
  mockCreateNetworkEventEmitter,
  mockGetLocalizedString,
  mockGetMetadataForAllProjects,
  mockProjectDataProviderGet,
} = vi.hoisted(() => ({
  mockSettingsGet: vi.fn(),
  mockSettingsSet: vi.fn(),
  mockDataProvidersGet: vi.fn(),
  mockRegisterEngine: vi.fn(),
  mockNotificationSend: vi.fn(),
  mockSubscribeFocus: vi.fn(),
  mockSubscribeAppFocus: vi.fn(),
  mockGetFocus: vi.fn(),
  mockGetAppFocus: vi.fn(),
  mockGetOpenWebViewDefinition: vi.fn(),
  mockCreateNetworkEventEmitter: vi.fn(),
  mockGetLocalizedString: vi.fn(),
  mockGetMetadataForAllProjects: vi.fn(),
  mockProjectDataProviderGet: vi.fn(),
}));

vi.mock('@shared/services/settings.service', () => ({
  __esModule: true,
  settingsService: { get: mockSettingsGet, set: mockSettingsSet },
  default: { get: mockSettingsGet, set: mockSettingsSet },
}));

vi.mock('@shared/services/data-provider.service', () => ({
  __esModule: true,
  dataProviderService: { get: mockDataProvidersGet, registerEngine: mockRegisterEngine },
  default: { get: mockDataProvidersGet, registerEngine: mockRegisterEngine },
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

vi.mock('@shared/services/network.service', () => ({
  __esModule: true,
  createNetworkEventEmitter: mockCreateNetworkEventEmitter,
  default: { createNetworkEventEmitter: mockCreateNetworkEventEmitter },
}));

vi.mock('@shared/services/localization.service', () => ({
  __esModule: true,
  localizationService: { getLocalizedString: mockGetLocalizedString },
  default: { getLocalizedString: mockGetLocalizedString },
}));

// EXT-106 legacy-short-name seam guards (host module imports them; Guid fixtures never invoke)
vi.mock('@shared/services/project-lookup.service', () => ({
  __esModule: true,
  projectLookupService: { getMetadataForAllProjects: mockGetMetadataForAllProjects },
  default: { getMetadataForAllProjects: mockGetMetadataForAllProjects },
}));

vi.mock('@shared/services/project-data-provider.service', () => ({
  __esModule: true,
  papiFrontendProjectDataProviderService: { get: mockProjectDataProviderGet },
  default: { get: mockProjectDataProviderGet },
}));

/** Guid-style ProjectIds (INV-C06 — ScrText.Guid string form; >20 chars keeps EXT-106 inert) */
const GUID_CONFIGURED = 'b3a91111-2222-3333-4444-5555666677e2';
const GUID_UNCONFIGURED = 'd5c93333-4444-5555-6666-7777888899a4';

/** The OS keyboard active at startup — captured as the SystemDefaultKeyboard (INV-C05) */
const SYSTEM_DEFAULT = 'en-US';

const PROJECT_KEYBOARD = 'ar-SA';
const OTHER_KEYBOARD = 'fr-FR';
const USER_CHOSEN_KEYBOARD = 'th-TH';

const AVAILABLE_KEYBOARD_IDS = [
  SYSTEM_DEFAULT,
  PROJECT_KEYBOARD,
  OTHER_KEYBOARD,
  USER_CHOSEN_KEYBOARD,
];

/** WebView ids — CAP-017 `keyboardPreference` cross-cut fixtures */
const WV_VERNACULAR = 'wv-vernacular'; // GUID_CONFIGURED + keyboardPreference 'vernacular'
const WV_UNCONFIGURED = 'wv-unconfigured'; // GUID_UNCONFIGURED + keyboardPreference 'vernacular'

/** Exact network event name per data-contracts §5.4 wire shape */
const MANUAL_SWITCH_NETWORK_EVENT = 'platform.keyboard.onDidDetectManualKeyboardSwitch';

/** Exact auto-switch notification payload (alignment-decision #27; localize-key assertion) */
const AUTO_SWITCH_NOTIFICATION = {
  message: '%keyboardSwitching_autoSwitched%',
  severity: 'info',
  duration: 3000,
  notificationId: 'keyboardSwitching:autoSwitched',
};

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
 * Fake of the C# `platform.osKeyboard` DataProvider (CAP-007 — the BE-1 boundary; its own chains
 * were proven in the BE-1 Pass-2 suite). Realistic set-notifies-subscribers semantics per decision
 * #25: PT10-initiated writes AND external user changes both produce `CurrentOsKeyboard` subscriber
 * callbacks exactly as the real DataProvider does — the manual-switch chain (touchpoint 4) rides
 * that subscription.
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
    /** Every keyboard id written through `setCurrentOsKeyboard`, in order */
    getWrites(): KeyboardId[] {
      return this.setCurrentOsKeyboard.mock.calls.map(
        ([, keyboardId]: [undefined, KeyboardId]) => keyboardId,
      );
    },
    /** The keyboard the fake OS currently reports active */
    getActiveKeyboardId(): KeyboardId | undefined {
      return currentKeyboardId;
    },
    /** Simulates a USER (or external PAPI consumer) OS-keyboard change (decisions #25 / #28) */
    emitExternalChange(newKeyboardId: KeyboardId): void {
      currentKeyboardId = newKeyboardId;
      notifySubscribers(newKeyboardId);
    },
  };
}

type FakeOsKeyboardProvider = ReturnType<typeof createFakeOsKeyboardProvider>;

let fakeOsKeyboard: FakeOsKeyboardProvider;

/** In-memory persisted-settings backing shared by the settings.service mock fns */
let persistedSettings: Record<string, unknown>;

/** Per-test open-WebView fixture served through the mocked `webViewService` */
let openWebViews: { [webViewId: string]: SavedWebViewDefinition };

/** The focus subject `windowService.getFocus` reports — the engine's focus-guard source */
let currentFocusSubject: FocusSubject;

/** Captured `window.service` subscription callbacks (the router's renderer-local subscribes) */
let focusCallbacks: ((focusSubject: FocusSubject) => void)[];
let appFocusCallbacks: ((appFocus: { isAppFocused: boolean }) => void)[];
const mockFocusUnsubscribe = vi.fn(async () => true);
const mockAppFocusUnsubscribe = vi.fn(async () => true);

/** Engine captured from the mocked `dataProviderService.registerEngine` */
let registeredEngine: KeyboardSwitchingDataProviderEngine | undefined;

/**
 * Every `onDidUpdate` emission the papi-layering emulation observed: each entry is the reformatted
 * data-type-name list from EITHER a `set*` return value OR a `notifyUpdate` call — exactly the two
 * channels real `registerEngine` layers over (CAP-015 unit-suite harness shape).
 */
let updateEmissions: string[][];

/** Detections delivered through the captured manual-switch network event emitter */
let manualSwitchDetections: ManualKeyboardSwitchDetection[];

function requireEngine(): KeyboardSwitchingDataProviderEngine {
  if (!registeredEngine)
    throw new Error('Keyboard engine has not been registered — call initializeHost first');
  return registeredEngine;
}

/**
 * Reproduces `data-provider.service`'s update-instruction reformat: `'*'` passes through; a string
 * becomes a one-element list; a non-empty array passes through; `true` from a `set<data_type>`
 * resolves to that set's own data type; anything falsy emits nothing.
 */
function reformatUpdateInstructions(
  instructions: DataProviderUpdateInstructions<KeyboardServiceDataTypes>,
  setDataType?: keyof KeyboardServiceDataTypes & string,
): string[] | undefined {
  if (instructions === '*') return ['*'];
  if (typeof instructions === 'string') return [instructions];
  if (Array.isArray(instructions)) return instructions.length > 0 ? [...instructions] : undefined;
  if (instructions === true && setDataType) return [setDataType];
  return undefined;
}

/**
 * Papi-layering emulation (CAP-015 unit-suite precedent): real `registerEngine` mutates the engine
 * — `notifyUpdate` is overwritten to emit, and every `set<data_type>` is layered over so its
 * returned update instructions emit. Both channels record into {@link updateEmissions}.
 */
function wrapEngineLikePapi(engine: KeyboardSwitchingDataProviderEngine): void {
  engine.notifyUpdate = (updateInstructions) => {
    const dataTypes = reformatUpdateInstructions(updateInstructions ?? '*');
    if (dataTypes) updateEmissions.push(dataTypes);
  };

  const originalSetProjectDefaultKeyboard = engine.setProjectDefaultKeyboard.bind(engine);
  engine.setProjectDefaultKeyboard = async (selector, keyboardId) => {
    const instructions = await originalSetProjectDefaultKeyboard(selector, keyboardId);
    const dataTypes = reformatUpdateInstructions(instructions, 'ProjectDefaultKeyboard');
    if (dataTypes) updateEmissions.push(dataTypes);
    return instructions;
  };

  const originalSetCurrentKeyboard = engine.setCurrentKeyboard.bind(engine);
  engine.setCurrentKeyboard = async (selector, value) => {
    const instructions = await originalSetCurrentKeyboard(selector, value);
    const dataTypes = reformatUpdateInstructions(instructions, 'CurrentKeyboard');
    if (dataTypes) updateEmissions.push(dataTypes);
    return instructions;
  };
}

/**
 * Deterministic bounded settle for async fan-out (CAP-014/CAP-015 suite precedent): all fakes
 * resolve immediately, so a fixed number of macrotask turns drains every promise chain.
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

/** Emits a window-service `Focus` subject through the router's REAL subscription callback */
async function emitFocus(focusSubject: FocusSubject): Promise<void> {
  currentFocusSubject = focusSubject;
  [...focusCallbacks].forEach((callback) => callback(focusSubject));
  await flushAsync();
}

/** Emits a window-service `AppFocus` subject (CAP-017 → CAP-011 chain entry) */
async function emitAppFocus(isAppFocused: boolean): Promise<void> {
  [...appFocusCallbacks].forEach((callback) => callback({ isAppFocused }));
  await flushAsync();
}

/** Emits an external (user / PAPI-consumer) OS keyboard change through the decision-#25 path */
async function emitExternalOsKeyboardChange(newKeyboardId: KeyboardId): Promise<void> {
  fakeOsKeyboard.emitExternalChange(newKeyboardId);
  await flushAsync();
}

/** Loads a FRESH host module instance (the host memoizes `initialize` at module scope) */
async function loadHostModule(): Promise<
  typeof import('@renderer/services/keyboard.service-host')
> {
  vi.resetModules();
  return import('@renderer/services/keyboard.service-host');
}

/**
 * Loads a fresh host module, runs the REAL `initialize()` composition root, lets startup settle,
 * and clears startup noise so each test asserts only the windows it drives. Returns the engine
 * captured from the registerEngine mock.
 */
async function initializeHost(): Promise<KeyboardSwitchingDataProviderEngine> {
  const host = await loadHostModule();
  await host.initialize();
  await flushAsync();
  updateEmissions.length = 0;
  fakeOsKeyboard.setCurrentOsKeyboard.mockClear();
  fakeOsKeyboard.getCurrentOsKeyboard.mockClear();
  mockNotificationSend.mockClear();
  return requireEngine();
}

beforeEach(() => {
  localStorage.clear();
  fakeOsKeyboard = createFakeOsKeyboardProvider();
  persistedSettings = {};
  updateEmissions = [];
  manualSwitchDetections = [];
  focusCallbacks = [];
  appFocusCallbacks = [];
  registeredEngine = undefined;
  currentFocusSubject = FOCUS_OTHER;

  openWebViews = {
    [WV_VERNACULAR]: createWebViewDefinition(WV_VERNACULAR, GUID_CONFIGURED, 'vernacular'),
    [WV_UNCONFIGURED]: createWebViewDefinition(WV_UNCONFIGURED, GUID_UNCONFIGURED, 'vernacular'),
  };

  mockSettingsGet.mockReset();
  mockSettingsGet.mockImplementation(async (key: string) => persistedSettings[key]);
  mockSettingsSet.mockReset();
  mockSettingsSet.mockImplementation(async (key: string, value: unknown) => {
    // Macrotask yield mirrors the CAP-009 unit-suite mock: keeps the store's write queue honest
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    persistedSettings[key] = value;
    return true;
  });

  mockDataProvidersGet.mockReset();
  mockDataProvidersGet.mockImplementation(async (providerName: string) => {
    if (providerName === osKeyboardServiceProviderName) return fakeOsKeyboard;
    throw new Error(`Unexpected data provider requested in test: ${providerName}`);
  });

  mockRegisterEngine.mockReset();
  mockRegisterEngine.mockImplementation(
    async (_providerName: string, engine: KeyboardSwitchingDataProviderEngine) => {
      registeredEngine = engine;
      wrapEngineLikePapi(engine);
      return { dispose: async () => true, onDidDispose: () => async () => true };
    },
  );

  mockNotificationSend.mockReset();
  mockNotificationSend.mockResolvedValue(undefined);

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
  mockGetFocus.mockReset();
  mockGetFocus.mockImplementation(async () => currentFocusSubject);
  mockGetAppFocus.mockReset();
  mockGetAppFocus.mockImplementation(async () => ({ isAppFocused: true }));

  mockGetOpenWebViewDefinition.mockReset();
  mockGetOpenWebViewDefinition.mockImplementation(async (webViewId: string) => {
    return openWebViews[webViewId];
  });

  mockCreateNetworkEventEmitter.mockReset();
  mockCreateNetworkEventEmitter.mockImplementation((eventType: string) => {
    const emitter = new PlatformEventEmitter<ManualKeyboardSwitchDetection>();
    if (eventType === MANUAL_SWITCH_NETWORK_EVENT)
      emitter.event((detection) => manualSwitchDetections.push(detection));
    return emitter;
  });

  // Wire-boundary localization echo: the "localized" string IS the localize key
  mockGetLocalizedString.mockReset();
  mockGetLocalizedString.mockImplementation(
    async ({ localizeKey }: { localizeKey: string }) => localizeKey,
  );

  // EXT-106 legacy seam guards — must never be exercised by Guid-keyed fixtures
  mockGetMetadataForAllProjects.mockReset();
  mockGetMetadataForAllProjects.mockResolvedValue([]);
  mockProjectDataProviderGet.mockReset();
  mockProjectDataProviderGet.mockRejectedValue(
    new Error('Unexpected project data provider request in test'),
  );
});

describe('BE-3 integration — full focus loop through the composed engine (touchpoint 1; BHV-450/WARN-CAP014-1)', () => {
  // Wire write (CAP-016) → real store (CAP-009) → focus-in routing (CAP-014 over CAP-017
  // Focus + keyboardPreference) → chokepoint OS write (CAP-010) → app-blur/refocus round trip
  // (CAP-011 over CAP-017 AppFocus) → focus-out restore (INV-B1-05 gate). TS-019/TS-020 family
  // at the composed-engine level.
  it('wire write → focus-in activates → blur/refocus unchanged is a quiet no-op → focus-out restores the default', async () => {
    const engine = await initializeHost();

    // Wire write through the registered engine — no OS write yet
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
      PROJECT_KEYBOARD,
    );
    expect(fakeOsKeyboard.getWrites()).toEqual([]);

    // Focus-in on the vernacular WebView (real router → real store → real chokepoint)
    await emitFocus(focusWebView(WV_VERNACULAR));
    expect(fakeOsKeyboard.getWrites()).toEqual([PROJECT_KEYBOARD]);

    // BHV-450 round trip: app-blur then cross-app return with the OS keyboard UNCHANGED — the
    // CAP-011 gate stays disarmed (OS equals the platform's own baseline) and the re-activation
    // is deduped at the CAP-010 chokepoint: no extra OS write, no extra toast, keyboard intact
    await emitAppFocus(false);
    await emitAppFocus(true);
    expect(fakeOsKeyboard.getWrites()).toEqual([PROJECT_KEYBOARD]);
    expect(fakeOsKeyboard.getActiveKeyboardId()).toBe(PROJECT_KEYBOARD);

    // Focus-out to a non-project subject: INV-B1-05 gated restore of the captured default
    await emitFocus(FOCUS_OTHER);
    expect(fakeOsKeyboard.getWrites()).toEqual([PROJECT_KEYBOARD, SYSTEM_DEFAULT]);
    expect(fakeOsKeyboard.getActiveKeyboardId()).toBe(SYSTEM_DEFAULT);

    // Exactly the two real OS writes toasted (#27); PT10's own writes never read as manual
    // switches (decision #28 condition 1 through the real pre-update seam)
    expect(mockNotificationSend).toHaveBeenCalledTimes(2);
    expect(mockNotificationSend).toHaveBeenCalledWith(
      expect.objectContaining(AUTO_SWITCH_NOTIFICATION),
    );
    expect(manualSwitchDetections).toEqual([]);
  });
});

describe('BE-3 integration — cross-app debounce honors the user (touchpoint 2; FN-015 / decision #26)', () => {
  // CAP-017 AppFocus → CAP-011 gate → CAP-014 routing → CAP-018 append → CAP-015 update event:
  // a user OS change while PT10 is blurred survives the cross-app return, produces no detection
  // (configured surface — §5.4 condition 3), and is recorded to last-used on focus-out.
  it('preserves a user OS change made while blurred, then records it to last-used on focus-out', async () => {
    const engine = await initializeHost();
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
      PROJECT_KEYBOARD,
    );
    await emitFocus(focusWebView(WV_VERNACULAR)); // OS now on the project keyboard

    // Blur, user switches the OS keyboard while away, then cross-app return
    await emitAppFocus(false);
    await emitExternalOsKeyboardChange(OTHER_KEYBOARD);
    await emitAppFocus(true);

    // FN-015: the return re-activation is GATED — the user's choice is not stomped
    expect(fakeOsKeyboard.getWrites()).toEqual([PROJECT_KEYBOARD]);
    expect(fakeOsKeyboard.getActiveKeyboardId()).toBe(OTHER_KEYBOARD);
    // §5.4 condition 3: a manual override of a CONFIGURED surface is transient — no detection
    expect(manualSwitchDetections).toEqual([]);

    // Focus-out: decision-#26 append (the user's keyboard differs from the focus-in sample)
    // lands in the real CAP-018 store with ONE LastUsedKeyboards update, then the gated restore
    await emitFocus(FOCUS_OTHER);
    await expect(engine.getLastUsedKeyboards(GUID_CONFIGURED)).resolves.toEqual({
      vernacular: [OTHER_KEYBOARD],
    });
    expect(
      updateEmissions.filter((dataTypes) => dataTypes.includes('LastUsedKeyboards')),
    ).toHaveLength(1);
    expect(fakeOsKeyboard.getWrites()).toEqual([PROJECT_KEYBOARD, SYSTEM_DEFAULT]);
  });
});

describe('BE-3 integration — wire mutation visibility (touchpoint 3; write→route consistency)', () => {
  // CAP-016 wire writes → scoped CAP-015 update emissions AND CAP-014 routing reads the SAME
  // store: a re-association made over the wire is what the next focus-in activates (spec-001/
  // spec-008 scoping at the composed level).
  it('each wire write emits one scoped update and the next focus-in routes the latest association', async () => {
    const engine = await initializeHost();

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
      PROJECT_KEYBOARD,
    );
    await emitFocus(focusWebView(WV_VERNACULAR));
    await emitFocus(FOCUS_OTHER); // restore — OS back to the system default

    // Re-associate over the wire, then focus in again: the NEW association routes
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
      OTHER_KEYBOARD,
    );
    await emitFocus(focusWebView(WV_VERNACULAR));

    expect(fakeOsKeyboard.getWrites()).toEqual([PROJECT_KEYBOARD, SYSTEM_DEFAULT, OTHER_KEYBOARD]);
    // Exactly one correctly-scoped update per wire write — and never a '*' wildcard
    expect(
      updateEmissions.filter((dataTypes) => dataTypes.includes('ProjectDefaultKeyboard')),
    ).toEqual([
      ['ProjectDefaultKeyboard', 'ProjectDefaultKeyboards'],
      ['ProjectDefaultKeyboard', 'ProjectDefaultKeyboards'],
    ]);
    expect(updateEmissions.every((dataTypes) => !dataTypes.includes('*'))).toBe(true);
  });
});

describe('BE-3 integration — manual-switch detection through the composed stack (touchpoint 4; §5.4)', () => {
  // External OS change (decision #25 subscription) → CAP-010 pre-update seam → CAP-014 detection
  // (conditions 1–3) → CAP-018 append → CAP-015 network event + LastUsedKeyboards update.
  it('an external OS change on an unconfigured focused surface emits the detection and the last-used update', async () => {
    const engine = await initializeHost();

    // Focus an UNCONFIGURED project surface: no association → silent no-op (no OS write)
    await emitFocus(focusWebView(WV_UNCONFIGURED));
    expect(fakeOsKeyboard.getWrites()).toEqual([]);

    // The user switches the OS keyboard manually while the surface is focused
    await emitExternalOsKeyboardChange(USER_CHOSEN_KEYBOARD);

    // §5.4 wire shape through the REAL network emitter wiring — exactly once
    expect(manualSwitchDetections).toEqual([
      {
        projectId: GUID_UNCONFIGURED,
        surfaceType: 'vernacular',
        manuallyChosenKeyboardId: USER_CHOSEN_KEYBOARD,
      },
    ]);
    // The append persisted in the real CAP-018 store and produced ONE LastUsedKeyboards update
    await expect(engine.getLastUsedKeyboards(GUID_UNCONFIGURED)).resolves.toEqual({
      vernacular: [USER_CHOSEN_KEYBOARD],
    });
    expect(
      updateEmissions.filter((dataTypes) => dataTypes.includes('LastUsedKeyboards')),
    ).toHaveLength(1);
    // The detection itself writes nothing to the OS and emits no auto-switch toast
    expect(fakeOsKeyboard.getWrites()).toEqual([]);
    expect(mockNotificationSend).not.toHaveBeenCalled();
  });
});

describe('BE-3 integration — resetCurrentKeyboard spot-check through composition (touchpoint 5)', () => {
  // 6-case-table case 4: an explicit webViewId of the FOCUSED webview reads the REAL CAP-017
  // keyboardPreference and resolves the wire-written project default through the real store.
  it('case 4: resetCurrentKeyboard(focused webViewId) activates the wire-written project default', async () => {
    const engine = await initializeHost();
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
      PROJECT_KEYBOARD,
    );
    // Focus reported by the engine's getFocus guard source — deliberately NOT emitted through
    // the router, so the only activation observable is reset's own resolution chain
    currentFocusSubject = focusWebView(WV_VERNACULAR);

    await expect(engine.resetCurrentKeyboard(WV_VERNACULAR)).resolves.toBe(true);

    expect(fakeOsKeyboard.getWrites()).toEqual([PROJECT_KEYBOARD]);
    expect(fakeOsKeyboard.getActiveKeyboardId()).toBe(PROJECT_KEYBOARD);
  });

  // 6-case-table case 1: undefined arg with NO webview focused falls back to the captured
  // system default — arranged off-default through the real ad-hoc setCurrentKeyboard wire path.
  it('case 1: resetCurrentKeyboard(undefined) with nothing focused restores the captured system default', async () => {
    const engine = await initializeHost();
    await engine.setCurrentKeyboard(undefined, { keyboardId: OTHER_KEYBOARD });
    expect(fakeOsKeyboard.getActiveKeyboardId()).toBe(OTHER_KEYBOARD);

    await expect(engine.resetCurrentKeyboard(undefined)).resolves.toBe(true);

    expect(fakeOsKeyboard.getWrites()).toEqual([OTHER_KEYBOARD, SYSTEM_DEFAULT]);
    expect(fakeOsKeyboard.getActiveKeyboardId()).toBe(SYSTEM_DEFAULT);
  });
});
