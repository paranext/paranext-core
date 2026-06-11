// CAP-015 (keyboard-switching) RED-phase tests — KeyboardSwitchingDataProviderEngine: THE wire
// surface. `initialize()` is the single shared construction site for the renderer keyboard
// cluster: it composes CAP-009 (association store), CAP-010 (activation service), CAP-011/012/013
// (debounce / notifier / BT-filter map via the router), CAP-014 (focus router — constructed AND
// started here), CAP-018 (last-used store); registers the engine as `platform.keyboard` via
// `dataProviderService.registerEngine`; and wires the
// `platform.keyboard.onDidDetectManualKeyboardSwitch` network event (data-contracts §5.4).
//
// Traceability (strategic-plan-backend.md ### CAP-015):
// - Specs: spec-001 (per-field fan-out), spec-002 (read accessors), spec-003 (KeyboardId string
//   identity — PT10 translation of KeyboardProxy equality, INV-C07), spec-004 (system-default
//   snapshot equality/stability — PT10 translation of Host.DefaultKeyboard), spec-005
//   (architectural constraint: missing OS-keyboard service is a startup failure — BHV-T130),
//   spec-006 wire half (reads are pure — INV-A05/INV-C03 backend half), spec-008 (PAPI event
//   shape: single per-field event per change), spec-009 (full-chain event scoping), spec-016
//   dispatch half (subscriber dispatch under re-entrancy — snapshot-and-release at the engine's
//   update fanout), spec-017 (SSF AutoKeyboardSwitching inert — BHV-T140 negative surface),
//   spec-018 (per-field emitter fan-out — BHV-502 replacement); gm-009 wire side (dialog OK
//   orchestration — ACCEPTANCE).
// - Scenarios: TS-018 (gm-009), TS-034/TS-035/TS-074 (per-field event exactly once),
//   TS-036/TS-037 (per-field diff scoping/short-circuit), TS-038..TS-041 (accessors null-safety +
//   round-trip), TS-042/TS-043 (string identity — KeyboardProxy translation), TS-044 (null
//   rejection → empty-keyboardId boundary translation), TS-045/TS-046 (system-default snapshot),
//   TS-047/TS-048 (dialog data-carrier wire half: reads pure), TS-049 (init requires the OS
//   keyboard layer), TS-067 (re-entrancy), TS-068 (AutoKeyboardSwitching inert), TS-073
//   (fan-out/broadcast), TS-077 (no unrelated event types — ScriptureDataChanged analog).
//   TS-061/TS-062 (initial focus / focus trap) are dialog-UI half — CAP-UI-001 scope (see plan
//   Coverage Gaps).
// - Behaviors: BHV-100/101/103/105/106/107/108/109/110/300/309/501/502/503/505/T140.
// - Cross-product guards per BA-RF-002 (backend-alignment §"`CurrentKeyboard` data type");
//   resetCurrentKeyboard 6-case table per backend-alignment §"`resetCurrentKeyboard`"
//   (SP-BE-RF-007 — dedicated describe block, one test per row).
// - Update-event translation (plan D2/D3): PT10 collapsed the per-field events
//   onVernacularKeyboardChanged/onCommentsKeyboardChanged into `ProjectDefaultKeyboard`
//   data-provider subscriptions (decision #20 / FN-016). The registerEngine mock reproduces
//   papi's layering (set-return instructions AND notifyUpdate both produce onDidUpdate
//   emissions) and the harness subscriber reproduces `whichUpdates: 'deeply-equal'` semantics,
//   so per-selector scoping is asserted exactly the way the platform realizes it.

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isPlatformError, PlatformEventEmitter } from 'platform-bible-utils';
import type { PlatformError } from 'platform-bible-utils';
import type { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import type { SavedWebViewDefinition } from '@shared/models/web-view.model';
import type { FocusSubject } from '@shared/services/window.service-model';
import type {
  KeyboardId,
  KeyboardOption,
  KeyboardServiceDataTypes,
  KeyboardSurfaceType,
  ManualKeyboardSwitchDetection,
  ProjectDefaultKeyboardSelector,
} from '@shared/services/keyboard.service-model';
import {
  keyboardServiceProviderName,
  osKeyboardServiceProviderName,
} from '@shared/services/keyboard.service-model';
import { keyboardsByProjectSettingKey } from '@renderer/services/keyboard/keyboard-association-store';
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

/** Guid-style ProjectIds (INV-C06 — ScrText.Guid string form) */
const GUID_CONFIGURED = 'b3a91111-2222-3333-4444-5555666677e2'; // vernacular ar-SA, comments he-IL
const GUID_NEW = 'c4b82222-3333-4444-5555-6666777788f3'; // no associations (gm-009 fixture)
const GUID_UNCONFIGURED = 'd5c93333-4444-5555-6666-7777888899a4'; // no associations (manual switch)

/** The OS keyboard active at startup — captured as the SystemDefaultKeyboard (INV-C05) */
const SYSTEM_DEFAULT = 'en-US';

const VERNACULAR_KEYBOARD = 'ar-SA';
const COMMENTS_KEYBOARD = 'he-IL';
const OTHER_KEYBOARD = 'fr-FR';

const AVAILABLE_KEYBOARD_IDS = [
  SYSTEM_DEFAULT,
  VERNACULAR_KEYBOARD,
  OTHER_KEYBOARD,
  COMMENTS_KEYBOARD,
];

/** WebView ids — fixtures for the focus-guard semantics */
const WV_VERNACULAR = 'wv-vernacular'; // GUID_CONFIGURED + keyboardPreference 'vernacular'
const WV_PLAIN = 'wv-plain'; // GUID_CONFIGURED, NO keyboardPreference
const WV_UNCONFIGURED = 'wv-unconfigured'; // GUID_UNCONFIGURED + keyboardPreference 'vernacular'

/** Exact network event name per data-contracts §5.4 wire shape */
const MANUAL_SWITCH_NETWORK_EVENT = 'platform.keyboard.onDidDetectManualKeyboardSwitch';

/** Documented wire-boundary localize key (data-contracts §9 / backend-alignment §Error Codes) */
const WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY = '%keyboardSwitching_webviewNotFocused%';

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
 * Hand-rolled fake of the C# `platform.osKeyboard` DataProvider (CAP-007) — same shape as the
 * CAP-010/CAP-014 fakes, extended with a configurable `getCurrentOsKeyboard` failure (drives the
 * KEYBOARDING_OS_QUERY_FAILED paths). Realistic set-notifies-subscribers semantics per decision
 * #25: a PT10-initiated `setCurrentOsKeyboard` produces a `CurrentOsKeyboard` subscriber callback
 * exactly as the real DataProvider does.
 */
function createFakeOsKeyboardProvider() {
  let currentKeyboardId: KeyboardId | undefined = SYSTEM_DEFAULT;
  let getCurrentFailure: Error | undefined;
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
    getCurrentOsKeyboard: vi.fn(async () => {
      if (getCurrentFailure) throw getCurrentFailure;
      return currentKeyboardId;
    }),
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
    /** The OS-enumerated options as the fake serves them */
    getAvailableKeyboardOptions(): KeyboardOption[] {
      return availableKeyboards;
    },
    /** Every keyboard id written through `setCurrentOsKeyboard`, in order */
    getWrites(): KeyboardId[] {
      return this.setCurrentOsKeyboard.mock.calls.map(
        ([, keyboardId]: [undefined, KeyboardId]) => keyboardId,
      );
    },
    /** Simulates a USER (or external PAPI consumer) OS-keyboard change (decisions #25 / #28) */
    emitExternalChange(newKeyboardId: KeyboardId): void {
      currentKeyboardId = newKeyboardId;
      notifySubscribers(newKeyboardId);
    },
    /** When set, `getCurrentOsKeyboard` rejects with this error (OS query failure) */
    setGetCurrentFailure(error: Error | undefined): void {
      getCurrentFailure = error;
    },
  };
}

type FakeOsKeyboardProvider = ReturnType<typeof createFakeOsKeyboardProvider>;

let fakeOsKeyboard: FakeOsKeyboardProvider;

/** Per-test persisted associations served through the mocked `settings.service` (nested shape) */
let seededAssociations: {
  [projectId: string]: { vernacular?: KeyboardId; comments?: KeyboardId };
};

/** Per-test open-WebView fixture served through the mocked `webViewService` */
let openWebViews: { [webViewId: string]: SavedWebViewDefinition };

/** The focus subject `windowService.getFocus` reports — the engine's focus-guard source */
let currentFocusSubject: FocusSubject;

/** Captured `window.service` subscription callbacks (the router's renderer-local subscribes) */
let focusCallbacks: ((focusSubject: FocusSubject) => void)[];
let appFocusCallbacks: ((appFocus: { isAppFocused: boolean }) => void)[];
const mockFocusUnsubscribe = vi.fn(async () => true);
const mockAppFocusUnsubscribe = vi.fn(async () => true);

/** Engine + registration captured from the mocked `dataProviderService.registerEngine` */
let registeredProviderName: string | undefined;
let registeredEngine: KeyboardSwitchingDataProviderEngine | undefined;

/**
 * Every `onDidUpdate` emission the papi-layering emulation observed (plan D2): each entry is the
 * reformatted data-type-name list from EITHER a `set*` return value OR a `notifyUpdate` call —
 * exactly the two channels real `registerEngine` layers over. Exactly-once assertions therefore
 * catch double-emission regardless of which mechanism the implementation uses.
 */
let updateEmissions: string[][];

type ProjectDefaultKeyboardSubscriber = {
  selector: ProjectDefaultKeyboardSelector;
  callback: ReturnType<typeof vi.fn>;
  lastValue: KeyboardId | undefined;
};

/** Harness subscribers reproducing `whichUpdates: 'deeply-equal'` re-get semantics (plan D3) */
let projectDefaultKeyboardSubscribers: ProjectDefaultKeyboardSubscriber[];

/** Serializes subscriber delivery passes so re-entrant emissions process in order */
let subscriberProcessing: Promise<void>;

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

/** Delivers one emission pass to the harness subscribers (re-get + value-diff per selector) */
async function deliverToSubscribers(dataTypes: string[]): Promise<void> {
  if (!dataTypes.includes('ProjectDefaultKeyboard') && !dataTypes.includes('*')) return;
  const engine = requireEngine();
  await Promise.all(
    [...projectDefaultKeyboardSubscribers].map(async (subscriber) => {
      const value = await engine.getProjectDefaultKeyboard(subscriber.selector);
      if (value === subscriber.lastValue) return;
      subscriber.lastValue = value;
      subscriber.callback(value);
    }),
  );
}

function recordEmission(dataTypes: string[]): void {
  updateEmissions.push(dataTypes);
  subscriberProcessing = subscriberProcessing.then(
    () => deliverToSubscribers(dataTypes),
    () => undefined,
  );
}

/** Count of emissions naming the given data type (or the `'*'` wildcard) */
function emissionsNaming(dataType: keyof KeyboardServiceDataTypes & string): number {
  return updateEmissions.filter(
    (dataTypes) => dataTypes.includes(dataType) || dataTypes.includes('*'),
  ).length;
}

/**
 * Papi-layering emulation (plan D2): real `registerEngine` mutates the engine — `notifyUpdate` is
 * overwritten to emit, and every `set<data_type>` is layered over so its returned update
 * instructions emit. This harness reproduces both channels into {@link updateEmissions}.
 */
function wrapEngineLikePapi(engine: KeyboardSwitchingDataProviderEngine): void {
  engine.notifyUpdate = (updateInstructions) => {
    const dataTypes = reformatUpdateInstructions(updateInstructions ?? '*');
    if (dataTypes) recordEmission(dataTypes);
  };

  const originalSetProjectDefaultKeyboard = engine.setProjectDefaultKeyboard.bind(engine);
  engine.setProjectDefaultKeyboard = async (selector, keyboardId) => {
    const instructions = await originalSetProjectDefaultKeyboard(selector, keyboardId);
    const dataTypes = reformatUpdateInstructions(instructions, 'ProjectDefaultKeyboard');
    if (dataTypes) recordEmission(dataTypes);
    return instructions;
  };

  const originalSetCurrentKeyboard = engine.setCurrentKeyboard.bind(engine);
  engine.setCurrentKeyboard = async (selector, value) => {
    const instructions = await originalSetCurrentKeyboard(selector, value);
    const dataTypes = reformatUpdateInstructions(instructions, 'CurrentKeyboard');
    if (dataTypes) recordEmission(dataTypes);
    return instructions;
  };
}

/**
 * Registers a harness subscriber for `ProjectDefaultKeyboard` with the given selector — reproduces
 * `createDataProviderSubscriber` semantics: seed the comparison baseline with an initial get, then
 * on every emission naming the data type re-get with this selector and invoke the callback iff the
 * value changed (`whichUpdates: 'deeply-equal'`; values are strings so `===` is the equality).
 */
async function subscribeProjectDefaultKeyboardHarness(
  selector: ProjectDefaultKeyboardSelector,
  callback: ReturnType<typeof vi.fn> = vi.fn(),
): Promise<ReturnType<typeof vi.fn>> {
  const engine = requireEngine();
  projectDefaultKeyboardSubscribers.push({
    selector,
    callback,
    lastValue: await engine.getProjectDefaultKeyboard(selector),
  });
  return callback;
}

/**
 * Deterministic bounded settle for async fan-out (CAP-014 plan D11 precedent): all fakes resolve
 * immediately, so a fixed number of macrotask turns drains every promise chain. No real-time
 * dependence, no fake timers.
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
  currentFocusSubject = focusSubject;
  [...focusCallbacks].forEach((callback) => callback(focusSubject));
  await flushAsync();
}

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
 * Loads a fresh host module, runs `initialize()`, lets startup settle, and clears startup noise
 * (any initial-capture emissions and the activation service's startup OS reads) so each test
 * asserts only the windows it drives. Returns the engine captured from the registerEngine mock.
 */
async function initializeHost(): Promise<KeyboardSwitchingDataProviderEngine> {
  const host = await loadHostModule();
  await host.initialize();
  await flushAsync();
  updateEmissions.length = 0;
  fakeOsKeyboard.setCurrentOsKeyboard.mockClear();
  fakeOsKeyboard.getCurrentOsKeyboard.mockClear();
  return requireEngine();
}

/** Awaits a rejection and narrows it to a {@link PlatformError} with the expected code (plan D6) */
async function expectPlatformErrorRejection(
  promise: Promise<unknown>,
  code: 'INVALID_ARGUMENT' | 'NOT_FOUND' | 'UNAVAILABLE',
): Promise<PlatformError> {
  let caught: unknown;
  let resolved = false;
  try {
    await promise;
    resolved = true;
  } catch (error) {
    caught = error;
  }
  // resolved === true means the call did NOT reject — fail loudly with context
  if (resolved) throw new Error(`Expected the call to reject with ${code} but it resolved`);
  if (!isPlatformError(caught))
    throw new Error(`Expected a PlatformError rejection but got: ${String(caught)}`);
  expect(caught.code).toBe(code);
  return caught;
}

/** All member names reachable on the engine (own + full prototype chain below Object.prototype) */
function getAllMemberNames(target: object): string[] {
  const names = new Set<string>(Object.getOwnPropertyNames(target));
  let prototype: object | null = Object.getPrototypeOf(target);
  while (prototype && prototype !== Object.prototype) {
    Object.getOwnPropertyNames(prototype).forEach((name) => names.add(name));
    prototype = Object.getPrototypeOf(prototype);
  }
  return [...names];
}

beforeEach(() => {
  localStorage.clear();
  fakeOsKeyboard = createFakeOsKeyboardProvider();
  updateEmissions = [];
  projectDefaultKeyboardSubscribers = [];
  subscriberProcessing = Promise.resolve();
  manualSwitchDetections = [];
  focusCallbacks = [];
  appFocusCallbacks = [];
  registeredProviderName = undefined;
  registeredEngine = undefined;
  currentFocusSubject = FOCUS_OTHER;

  seededAssociations = {
    [GUID_CONFIGURED]: { vernacular: VERNACULAR_KEYBOARD, comments: COMMENTS_KEYBOARD },
  };
  openWebViews = {
    [WV_VERNACULAR]: createWebViewDefinition(WV_VERNACULAR, GUID_CONFIGURED, 'vernacular'),
    [WV_PLAIN]: createWebViewDefinition(WV_PLAIN, GUID_CONFIGURED, undefined),
    [WV_UNCONFIGURED]: createWebViewDefinition(WV_UNCONFIGURED, GUID_UNCONFIGURED, 'vernacular'),
  };

  mockSettingsGet.mockReset();
  mockSettingsGet.mockImplementation(async (key: string) => {
    if (key === keyboardsByProjectSettingKey) return structuredClone(seededAssociations);
    return undefined;
  });
  mockSettingsSet.mockReset();
  mockSettingsSet.mockResolvedValue(true);

  mockDataProvidersGet.mockReset();
  mockDataProvidersGet.mockImplementation(async (providerName: string) => {
    if (providerName === osKeyboardServiceProviderName) return fakeOsKeyboard;
    throw new Error(`Unexpected data provider requested in test: ${providerName}`);
  });

  mockRegisterEngine.mockReset();
  mockRegisterEngine.mockImplementation(
    async (providerName: string, engine: KeyboardSwitchingDataProviderEngine) => {
      registeredProviderName = providerName;
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

  // Wire-boundary localization echo: the "localized" string IS the localize key, so message
  // assertions can detect which key was resolved without baking translations into expectations
  mockGetLocalizedString.mockReset();
  mockGetLocalizedString.mockImplementation(
    async ({ localizeKey }: { localizeKey: string }) => localizeKey,
  );
});

describe('keyboard.service-host initialize() — composition root (single shared construction site)', () => {
  // BHV-104/BHV-601 (data-contracts §4.0): the host registers the engine at startup
  it('registers the platform.keyboard data provider engine', async () => {
    await initializeHost();

    expect(mockRegisterEngine).toHaveBeenCalledTimes(1);
    expect(registeredProviderName).toBe(keyboardServiceProviderName);
  });

  it('is idempotent — two initialize() calls register the engine exactly once', async () => {
    const host = await loadHostModule();
    await host.initialize();
    await host.initialize();

    expect(mockRegisterEngine).toHaveBeenCalledTimes(1);
  });

  // CAP-014 composition: the host constructs AND starts the focus router during setup
  it('starts the focus router: window-service Focus and AppFocus subscriptions are taken', async () => {
    await initializeHost();

    expect(mockSubscribeFocus).toHaveBeenCalledTimes(1);
    expect(mockSubscribeAppFocus).toHaveBeenCalledTimes(1);
  });

  // spec-005 / TS-049 / BHV-105 / BHV-T130 (PT10 translation of "PluginUtils requires a non-null
  // IKeyboardHelper"): a missing OS-keyboard layer is a loud startup failure, never a half-alive
  // keyboard service
  it('rejects when the platform.osKeyboard provider is unavailable (spec-005 / TS-049)', async () => {
    mockDataProvidersGet.mockReset();
    mockDataProvidersGet.mockImplementation(async (providerName: string) => {
      if (providerName === osKeyboardServiceProviderName) return undefined;
      throw new Error(`Unexpected data provider requested in test: ${providerName}`);
    });

    const host = await loadHostModule();
    // The startup failure must name the missing provider (CAP-010 initializeAsync precedent) —
    // a generic failure message would leave the root cause undiagnosable at startup
    await expect(host.initialize()).rejects.toThrow(osKeyboardServiceProviderName);
  });
});

describe('ProjectDefaultKeyboard / ProjectDefaultKeyboards — reads (spec-002, TS-038..TS-041, BHV-101/106/503)', () => {
  // INV-A02 accessor null-safety: undefined-when-absent, never throw
  it('returns undefined for both surfaces and an empty plural map when nothing is configured', async () => {
    const engine = await initializeHost();

    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'vernacular' }),
    ).resolves.toBeUndefined();
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'comments' }),
    ).resolves.toBeUndefined();
    await expect(engine.getProjectDefaultKeyboards(GUID_NEW)).resolves.toEqual({});
  });

  // TS-039/TS-041 round-trip + TS-042/TS-043 (spec-003 translation): KeyboardId is a plain string
  // with === identity (INV-C07) — `toBe` IS the KeyboardProxy value-equality analog
  it('returns the persisted id (string identity) with cross-surface and cross-project isolation', async () => {
    const engine = await initializeHost();

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      VERNACULAR_KEYBOARD,
    );

    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'vernacular' }),
    ).resolves.toBe(VERNACULAR_KEYBOARD);
    // Cross-surface isolation: the comments field of the same project is untouched
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'comments' }),
    ).resolves.toBeUndefined();
    // Cross-project isolation: another project's vernacular field is untouched
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_UNCONFIGURED, surfaceType: 'vernacular' }),
    ).resolves.toBeUndefined();
    // Plural view reflects exactly the one configured surface (alignment-decision #29 §C)
    await expect(engine.getProjectDefaultKeyboards(GUID_NEW)).resolves.toEqual({
      vernacular: VERNACULAR_KEYBOARD,
    });
  });

  // data-contracts §2.5: wire validation is WRITE-side only; reads tolerate unknown surfaces
  it('is lenient on unknown surface types for reads — returns undefined instead of throwing', async () => {
    const engine = await initializeHost();

    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_CONFIGURED, surfaceType: 'braille' }),
    ).resolves.toBeUndefined();
  });
});

describe('setProjectDefaultKeyboard — per-field diff + scoped update events (spec-001/spec-008, TS-034/TS-037/TS-074/TS-077, INV-C01/INV-C02)', () => {
  it('emits exactly one singular and one plural update per real change and touches no other data types', async () => {
    const engine = await initializeHost();

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      VERNACULAR_KEYBOARD,
    );
    await flushAsync();

    // spec-008 INV-PD-01: EXACTLY ONE per-field event per change (singular + the #29 §C plural)
    expect(emissionsNaming('ProjectDefaultKeyboard')).toBe(1);
    expect(emissionsNaming('ProjectDefaultKeyboards')).toBe(1);
    // TS-077 (ScriptureDataChanged analog): no unrelated data types, no '*' wildcard
    const allEmittedDataTypes = updateEmissions.flat();
    expect(allEmittedDataTypes).not.toContain('*');
    allEmittedDataTypes.forEach((dataType) => {
      expect(['ProjectDefaultKeyboard', 'ProjectDefaultKeyboards']).toContain(dataType);
    });
  });

  // TS-037 / INV-C02 / BHV-T005: per-field diff short-circuits — no event, no second persist
  it('short-circuits a no-op set: no update event, no second persistence write', async () => {
    const engine = await initializeHost();

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      VERNACULAR_KEYBOARD,
    );
    await flushAsync();
    const emissionCountAfterFirstSet = updateEmissions.length;
    const settingsWritesAfterFirstSet = mockSettingsSet.mock.calls.length;

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      VERNACULAR_KEYBOARD,
    );
    await flushAsync();

    expect(updateEmissions.length).toBe(emissionCountAfterFirstSet);
    expect(mockSettingsSet.mock.calls.length).toBe(settingsWritesAfterFirstSet);
  });

  // INV-B1-03 sentinel removal: undefined removes the association; the plural map drops the key
  it('removes the association on the undefined sentinel and emits the scoped updates', async () => {
    const engine = await initializeHost();

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
      undefined,
    );
    await flushAsync();

    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_CONFIGURED, surfaceType: 'vernacular' }),
    ).resolves.toBeUndefined();
    await expect(engine.getProjectDefaultKeyboards(GUID_CONFIGURED)).resolves.toEqual({
      comments: COMMENTS_KEYBOARD,
    });
    expect(emissionsNaming('ProjectDefaultKeyboard')).toBe(1);
    expect(emissionsNaming('ProjectDefaultKeyboards')).toBe(1);
  });

  // KEYBOARDING_INVALID_SURFACE_TYPE (alignment-decision #29 §D; data-contracts §2.5 validation):
  // writes are bounded to KEYBOARD_SURFACE_TYPES; error is localized at the wire boundary
  it('rejects an unknown surface type with INVALID_ARGUMENT via wire-boundary localization, persisting and emitting nothing', async () => {
    const engine = await initializeHost();

    await expectPlatformErrorRejection(
      engine.setProjectDefaultKeyboard(
        { projectId: GUID_CONFIGURED, surfaceType: 'braille' },
        VERNACULAR_KEYBOARD,
      ),
      'INVALID_ARGUMENT',
    );

    expect(mockGetLocalizedString).toHaveBeenCalledWith(
      expect.objectContaining({ localizeKey: expect.stringMatching(/^%keyboardSwitching_/) }),
    );
    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(updateEmissions).toEqual([]);
  });

  // data-contracts §4.3 errors / TS-044 PT10 translation (no KeyboardProxy constructor to reject
  // null — the boundary rejection surface is the empty-string keyboard id, INVALID_KEYBOARD_ID)
  it('rejects an empty-string keyboard id with INVALID_ARGUMENT', async () => {
    const engine = await initializeHost();

    await expectPlatformErrorRejection(
      engine.setProjectDefaultKeyboard(
        { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
        '',
      ),
      'INVALID_ARGUMENT',
    );

    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(updateEmissions).toEqual([]);
  });
});

describe('ProjectDefaultKeyboard subscribers — per-field fan-out (spec-009/spec-018, TS-035/TS-036/TS-073, INV-PD-01/INV-EMITTER-01)', () => {
  // spec-018 scenario 2 / BHV-502 replacement: broadcast — every subscriber of the changed
  // selector receives exactly one delivery
  it('delivers exactly one callback to each of three same-selector subscribers per change', async () => {
    const engine = await initializeHost();
    const selector: ProjectDefaultKeyboardSelector = {
      projectId: GUID_NEW,
      surfaceType: 'vernacular',
    };
    const subscriber1 = await subscribeProjectDefaultKeyboardHarness(selector);
    const subscriber2 = await subscribeProjectDefaultKeyboardHarness(selector);
    const subscriber3 = await subscribeProjectDefaultKeyboardHarness(selector);

    await engine.setProjectDefaultKeyboard(selector, VERNACULAR_KEYBOARD);
    await flushAsync();

    [subscriber1, subscriber2, subscriber3].forEach((subscriber) => {
      expect(subscriber).toHaveBeenCalledTimes(1);
      expect(subscriber).toHaveBeenCalledWith(VERNACULAR_KEYBOARD);
    });
  });

  // spec-009 scenario 1 / TS-036 / FLAG-C-003: per-field diff at the publisher — re-setting the
  // unchanged comments field emits nothing to its subscriber
  it('text-only change with comments already set: the comments subscriber receives nothing', async () => {
    const engine = await initializeHost();
    const vernacularSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_CONFIGURED,
      surfaceType: 'vernacular',
    });
    const commentsSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_CONFIGURED,
      surfaceType: 'comments',
    });

    // Dialog-OK shape: text changes; the comments selection equals the persisted value
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'vernacular' },
      OTHER_KEYBOARD,
    );
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_CONFIGURED, surfaceType: 'comments' },
      COMMENTS_KEYBOARD,
    );
    await flushAsync();

    expect(vernacularSubscriber).toHaveBeenCalledTimes(1);
    expect(vernacularSubscriber).toHaveBeenCalledWith(OTHER_KEYBOARD);
    expect(commentsSubscriber).not.toHaveBeenCalled();
    // The second (no-op) set produced no emission at all
    expect(emissionsNaming('ProjectDefaultKeyboard')).toBe(1);
  });

  // spec-008 scenario 3 / TS-035 / INV-PD-01: comments change does not reach vernacular selectors
  it('comments change does not reach a vernacular-selector subscriber', async () => {
    const engine = await initializeHost();
    const vernacularSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_NEW,
      surfaceType: 'vernacular',
    });
    const commentsSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_NEW,
      surfaceType: 'comments',
    });

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'comments' },
      OTHER_KEYBOARD,
    );
    await flushAsync();

    expect(commentsSubscriber).toHaveBeenCalledTimes(1);
    expect(commentsSubscriber).toHaveBeenCalledWith(OTHER_KEYBOARD);
    expect(vernacularSubscriber).not.toHaveBeenCalled();
  });

  // spec-009 scenario 3: two real changes → exactly two scoped events, one per surface
  it('both fields changed fire exactly two scoped updates — one delivery per surface subscriber', async () => {
    const engine = await initializeHost();
    const vernacularSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_NEW,
      surfaceType: 'vernacular',
    });
    const commentsSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_NEW,
      surfaceType: 'comments',
    });

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      VERNACULAR_KEYBOARD,
    );
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'comments' },
      OTHER_KEYBOARD,
    );
    await flushAsync();

    expect(emissionsNaming('ProjectDefaultKeyboard')).toBe(2);
    expect(vernacularSubscriber).toHaveBeenCalledTimes(1);
    expect(vernacularSubscriber).toHaveBeenCalledWith(VERNACULAR_KEYBOARD);
    expect(commentsSubscriber).toHaveBeenCalledTimes(1);
    expect(commentsSubscriber).toHaveBeenCalledWith(OTHER_KEYBOARD);
  });

  // spec-016 dispatch half / TS-067 / RF-A03: PT10 explicitly REJECTS PT9's hold-lock-while-
  // dispatching behavior — a subscriber that re-enters the write path must not deadlock, and both
  // writes persist + emit exactly once each (snapshot-and-release at the engine's update fanout)
  it('a subscriber re-entering setProjectDefaultKeyboard from its callback completes without deadlock', async () => {
    const engine = await initializeHost();
    const reentrantSetPromises: Promise<unknown>[] = [];
    const reentrantVernacularCallback = vi.fn(() => {
      if (reentrantSetPromises.length === 0)
        reentrantSetPromises.push(
          engine.setProjectDefaultKeyboard(
            { projectId: GUID_NEW, surfaceType: 'comments' },
            OTHER_KEYBOARD,
          ),
        );
    });
    await subscribeProjectDefaultKeyboardHarness(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      reentrantVernacularCallback,
    );
    const commentsSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_NEW,
      surfaceType: 'comments',
    });

    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      VERNACULAR_KEYBOARD,
    );
    await flushAsync();
    await Promise.all(reentrantSetPromises);
    await flushAsync();

    // Outer + re-entrant inner writes both persisted (no deadlock — the test would time out)
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'vernacular' }),
    ).resolves.toBe(VERNACULAR_KEYBOARD);
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'comments' }),
    ).resolves.toBe(OTHER_KEYBOARD);
    // One scoped event each (INV-REENTRY-01/02)
    expect(emissionsNaming('ProjectDefaultKeyboard')).toBe(2);
    expect(reentrantVernacularCallback).toHaveBeenCalledTimes(1);
    expect(commentsSubscriber).toHaveBeenCalledTimes(1);
    expect(commentsSubscriber).toHaveBeenCalledWith(OTHER_KEYBOARD);
  });
});

describe('SystemDefaultKeyboard — startup snapshot (spec-004, TS-045/TS-046, BHV-108, INV-C05)', () => {
  // spec-004 PT10 translation: the singleton Host.DefaultKeyboard becomes the captured snapshot
  // id; string === is the cross-type-equality analog. INV-C05: captured ONCE — later OS-level
  // changes are not picked up until restart.
  it('returns the startup snapshot and keeps it stable across later OS keyboard changes', async () => {
    const engine = await initializeHost();

    await expect(engine.getSystemDefaultKeyboard(undefined)).resolves.toBe(SYSTEM_DEFAULT);

    await emitExternalOsKeyboardChange(OTHER_KEYBOARD);

    await expect(engine.getSystemDefaultKeyboard(undefined)).resolves.toBe(SYSTEM_DEFAULT);
  });

  // backend-alignment "two paths" pitfall: getSystemDefaultKeyboard returns undefined when the
  // startup capture failed (no throw) while getCurrentKeyboard(undefined) THROWS on query failure
  it('returns undefined without throwing when the startup capture failed — while getCurrentKeyboard(undefined) still throws', async () => {
    fakeOsKeyboard.setGetCurrentFailure(new Error('OS keyboard query failed (test)'));

    const engine = await initializeHost();

    await expect(engine.getSystemDefaultKeyboard(undefined)).resolves.toBeUndefined();
    await expectPlatformErrorRejection(engine.getCurrentKeyboard(undefined), 'UNAVAILABLE');
  });
});

describe('AvailableKeyboards / CurrentKeyboard — reads (data-contracts §4.2; backend-alignment CurrentKeyboard get semantics)', () => {
  it('getAvailableKeyboards returns the OS enumeration', async () => {
    const engine = await initializeHost();

    await expect(engine.getAvailableKeyboards(undefined)).resolves.toEqual(
      fakeOsKeyboard.getAvailableKeyboardOptions(),
    );
  });

  it('getCurrentKeyboard(undefined) returns the active OS keyboard with undefined project context — never undefined', async () => {
    const engine = await initializeHost();

    await expect(engine.getCurrentKeyboard(undefined)).resolves.toEqual({
      keyboardId: SYSTEM_DEFAULT,
      projectId: undefined,
      surfaceType: undefined,
    });
  });

  // Guard semantic: the webViewId selector answers only for the currently-focused webview
  it('getCurrentKeyboard(webViewId) returns the value when that webview is focused and undefined when it is not', async () => {
    const engine = await initializeHost();

    currentFocusSubject = focusWebView(WV_VERNACULAR);
    await expect(engine.getCurrentKeyboard(WV_VERNACULAR)).resolves.toEqual({
      keyboardId: SYSTEM_DEFAULT,
      projectId: undefined,
      surfaceType: undefined,
    });

    currentFocusSubject = focusWebView(WV_PLAIN);
    await expect(engine.getCurrentKeyboard(WV_VERNACULAR)).resolves.toBeUndefined();
  });

  // KEYBOARDING_OS_QUERY_FAILED → UNAVAILABLE: "current" must always have an answer — a failed
  // OS query is an error, never a silent undefined (runtime failure after a good startup)
  it('getCurrentKeyboard(undefined) rejects UNAVAILABLE when the OS query fails', async () => {
    const engine = await initializeHost();

    fakeOsKeyboard.setGetCurrentFailure(new Error('OS keyboard query failed (test)'));

    const error = await expectPlatformErrorRejection(
      engine.getCurrentKeyboard(undefined),
      'UNAVAILABLE',
    );
    expect(error.code).toBe('UNAVAILABLE');
  });
});

describe('setCurrentKeyboard — selector/value cross-product guards (BA-RF-002; backend-alignment set-semantics table)', () => {
  // Row: (undefined, { surfaceType }) — no project context to resolve against
  it('(undefined, { surfaceType }) is rejected with INVALID_ARGUMENT and performs no OS write', async () => {
    const engine = await initializeHost();

    await expectPlatformErrorRejection(
      engine.setCurrentKeyboard(undefined, { surfaceType: 'vernacular' }),
      'INVALID_ARGUMENT',
    );

    expect(mockGetLocalizedString).toHaveBeenCalledWith(
      expect.objectContaining({ localizeKey: expect.stringMatching(/^%keyboardSwitching_/) }),
    );
    expect(fakeOsKeyboard.getWrites()).toEqual([]);
    expect(emissionsNaming('CurrentKeyboard')).toBe(0);
  });

  // Row: (undefined, { keyboardId }) — the M-004 `activate` fold: direct ad-hoc activation
  it('(undefined, { keyboardId }) activates directly with ad-hoc context and one CurrentKeyboard update', async () => {
    const engine = await initializeHost();

    await engine.setCurrentKeyboard(undefined, { keyboardId: VERNACULAR_KEYBOARD });
    await flushAsync();

    expect(fakeOsKeyboard.getWrites()).toEqual([VERNACULAR_KEYBOARD]);
    expect(emissionsNaming('CurrentKeyboard')).toBe(1);
    await expect(engine.getCurrentKeyboard(undefined)).resolves.toEqual({
      keyboardId: VERNACULAR_KEYBOARD,
      projectId: undefined,
      surfaceType: undefined,
    });
  });

  // Row: (webViewId focused, { surfaceType }) — resolves via ProjectDefaultKeyboard lookup. The
  // VALUE's surfaceType drives the lookup (not the webview's own keyboardPreference): asking the
  // vernacular-preference webview for 'comments' must activate the COMMENTS keyboard.
  it('(webViewId focused, { surfaceType }) resolves the project default keyboard for that surface and activates it', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_VERNACULAR);

    await engine.setCurrentKeyboard(WV_VERNACULAR, { surfaceType: 'comments' });
    await flushAsync();

    expect(fakeOsKeyboard.getWrites()).toEqual([COMMENTS_KEYBOARD]);
    expect(emissionsNaming('CurrentKeyboard')).toBe(1);
    await expect(engine.getCurrentKeyboard(undefined)).resolves.toEqual({
      keyboardId: COMMENTS_KEYBOARD,
      projectId: GUID_CONFIGURED,
      surfaceType: 'comments',
    });
  });

  // Row: (webViewId focused, { keyboardId }) — direct activation, focus-guarded
  it('(webViewId focused, { keyboardId }) activates that keyboard directly', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_VERNACULAR);

    await engine.setCurrentKeyboard(WV_VERNACULAR, { keyboardId: OTHER_KEYBOARD });
    await flushAsync();

    expect(fakeOsKeyboard.getWrites()).toEqual([OTHER_KEYBOARD]);
    expect(emissionsNaming('CurrentKeyboard')).toBe(1);
  });

  // Rows: (webViewId NOT focused, *) — KEYBOARDING_WEBVIEW_NOT_FOCUSED for BOTH value kinds,
  // with the documented localize key resolved at the wire boundary
  it('(webViewId not focused, either value kind) throws KEYBOARDING_WEBVIEW_NOT_FOCUSED and performs no OS write', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_PLAIN);

    const surfaceTypeError = await expectPlatformErrorRejection(
      engine.setCurrentKeyboard(WV_VERNACULAR, { surfaceType: 'vernacular' }),
      'NOT_FOUND',
    );
    const keyboardIdError = await expectPlatformErrorRejection(
      engine.setCurrentKeyboard(WV_VERNACULAR, { keyboardId: OTHER_KEYBOARD }),
      'NOT_FOUND',
    );

    expect(surfaceTypeError.message).toContain(WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY);
    expect(keyboardIdError.message).toContain(WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY);
    expect(mockGetLocalizedString).toHaveBeenCalledWith(
      expect.objectContaining({ localizeKey: WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY }),
    );
    expect(fakeOsKeyboard.getWrites()).toEqual([]);
    expect(emissionsNaming('CurrentKeyboard')).toBe(0);
  });
});

describe('resetCurrentKeyboard — the 6-case table (backend-alignment §resetCurrentKeyboard / SP-BE-RF-007)', () => {
  // Cases targeting the system default move the OS OFF the default first (plan D8): the CAP-010
  // chokepoint dedups writes to the already-active keyboard, so the restore write would otherwise
  // be invisible. No project surface is focused during the move, so no detection fires.

  it('case 1: undefined arg + no webview focused → activates the system default', async () => {
    const engine = await initializeHost();
    currentFocusSubject = FOCUS_OTHER;
    await emitExternalOsKeyboardChange(OTHER_KEYBOARD);

    await expect(engine.resetCurrentKeyboard(undefined)).resolves.toBe(true);

    expect(fakeOsKeyboard.getWrites()).toEqual([SYSTEM_DEFAULT]);
  });

  it('case 2: undefined arg + focused webview with keyboardPreference → activates the project default', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_VERNACULAR);

    await expect(engine.resetCurrentKeyboard(undefined)).resolves.toBe(true);

    expect(fakeOsKeyboard.getWrites()).toEqual([VERNACULAR_KEYBOARD]);
  });

  it('case 3: undefined arg + focused webview without keyboardPreference → activates the system default', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_PLAIN);
    await emitExternalOsKeyboardChange(OTHER_KEYBOARD);

    await expect(engine.resetCurrentKeyboard(undefined)).resolves.toBe(true);

    expect(fakeOsKeyboard.getWrites()).toEqual([SYSTEM_DEFAULT]);
  });

  it('case 4: webViewId of the focused webview with keyboardPreference → activates the project default', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_VERNACULAR);

    await expect(engine.resetCurrentKeyboard(WV_VERNACULAR)).resolves.toBe(true);

    expect(fakeOsKeyboard.getWrites()).toEqual([VERNACULAR_KEYBOARD]);
  });

  it('case 5: webViewId of the focused webview without keyboardPreference → activates the system default', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_PLAIN);
    await emitExternalOsKeyboardChange(OTHER_KEYBOARD);

    await expect(engine.resetCurrentKeyboard(WV_PLAIN)).resolves.toBe(true);

    expect(fakeOsKeyboard.getWrites()).toEqual([SYSTEM_DEFAULT]);
  });

  it('case 6: webViewId of a non-focused webview → throws KEYBOARDING_WEBVIEW_NOT_FOCUSED, no OS write', async () => {
    const engine = await initializeHost();
    currentFocusSubject = focusWebView(WV_PLAIN);

    const error = await expectPlatformErrorRejection(
      engine.resetCurrentKeyboard(WV_VERNACULAR),
      'NOT_FOUND',
    );

    expect(error.message).toContain(WEBVIEW_NOT_FOCUSED_LOCALIZE_KEY);
    expect(fakeOsKeyboard.getWrites()).toEqual([]);
  });
});

describe('manual-switch detection + LastUsedKeyboards (data-contracts §5.4; alignment-decisions #26/#28; CAP-014/CAP-018 composition)', () => {
  // §5.4 wire shape: PAPI network event via createNetworkEventEmitter with the EXACT event name;
  // the host wires the CAP-014 router's detection seam to it (full real-router chain)
  it('wires onDidDetectManualKeyboardSwitch as a network event and emits the detection payload through it', async () => {
    await initializeHost();

    expect(mockCreateNetworkEventEmitter).toHaveBeenCalledWith(MANUAL_SWITCH_NETWORK_EVENT);

    // Focus a project surface with NO configured keyboard, then the user switches the OS keyboard
    await emitFocus(focusWebView(WV_UNCONFIGURED));
    await emitExternalOsKeyboardChange(COMMENTS_KEYBOARD);

    expect(manualSwitchDetections).toEqual([
      {
        projectId: GUID_UNCONFIGURED,
        surfaceType: 'vernacular',
        manuallyChosenKeyboardId: COMMENTS_KEYBOARD,
      },
    ]);
  });

  // CAP-018 emitter seam → sendUpdate('LastUsedKeyboards', projectId); §5.4 side-effect ordering:
  // the append persists BEFORE the detection is emitted, so a reader reacting to the event sees
  // the just-switched keyboard
  it('translates the last-used append into a LastUsedKeyboards update with the value readable (store-before-emit)', async () => {
    const engine = await initializeHost();

    await emitFocus(focusWebView(WV_UNCONFIGURED));
    await emitExternalOsKeyboardChange(COMMENTS_KEYBOARD);

    expect(emissionsNaming('LastUsedKeyboards')).toBe(1);
    await expect(engine.getLastUsedKeyboards(GUID_UNCONFIGURED)).resolves.toEqual({
      vernacular: [COMMENTS_KEYBOARD],
    });
  });

  it('getLastUsedKeyboards returns an empty map for an unknown project', async () => {
    const engine = await initializeHost();

    await expect(engine.getLastUsedKeyboards(GUID_NEW)).resolves.toEqual({});
  });
});

describe('wire-surface invariants + gm-009 acceptance (read-only types, inert SSF nop, pure reads, dialog OK orchestration)', () => {
  // REVISED by CAP-016 (I-8 carried-over blocker; test-writer-CAP-016.md D4). The original
  // CAP-015 pin asserted these members were ABSENT, but the REAL registerEngine validation
  // (data-provider.service.ts:704-709) throws at registration when any `get<data_type>` lacks a
  // matching `set<data_type>` — renderer startup would crash. The platform read-only convention
  // is a THROWING setter (localization.service-host precedent). `KeyboardServiceDataTypes` still
  // pins `set: never` at the TYPE level (alignment-decisions #26/#29 §C; INV-C05); the runtime
  // setters exist purely for registration parity and must always reject without mutating or
  // emitting.
  it('read-only data types: setters exist for registration parity but always reject without mutating or emitting', async () => {
    const engine = await initializeHost();
    // The setters are deliberately absent from the engine's TYPE surface (set: never) — reach
    // them through the runtime function table the registration validation sees
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const engineUntyped = engine as unknown as Record<
      string,
      ((...args: unknown[]) => Promise<unknown>) | undefined
    >;

    const readOnlySetterNames = [
      'setProjectDefaultKeyboards',
      'setSystemDefaultKeyboard',
      'setAvailableKeyboards',
      'setLastUsedKeyboards',
    ];

    // Presence first (object-shape assertion reports WHICH setter is missing on failure)
    const setterPresence = Object.fromEntries(
      readOnlySetterNames.map((setterName) => [setterName, typeof engineUntyped[setterName]]),
    );
    expect(setterPresence).toEqual({
      setProjectDefaultKeyboards: 'function',
      setSystemDefaultKeyboard: 'function',
      setAvailableKeyboards: 'function',
      setLastUsedKeyboards: 'function',
    });

    // Every read-only setter must reject when invoked
    await Promise.all(
      readOnlySetterNames.map(async (setterName) => {
        await expect(
          engineUntyped[setterName]?.call(engine, undefined, undefined),
        ).rejects.toThrow();
      }),
    );

    await flushAsync();
    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(updateEmissions).toEqual([]);
    expect(fakeOsKeyboard.getWrites()).toEqual([]);
  });

  // spec-017 / TS-068 / BHV-T140 NEGATIVE-FINDING contract: PT9's SSF AutoKeyboardSwitching is a
  // compatibility nop. PT10 must NOT "helpfully" wire it up — no engine surface may reference it.
  // (Every other test in this file demonstrates keyboard behavior works without it.)
  it('exposes no AutoKeyboardSwitching surface (the setting stays inert)', async () => {
    const engine = await initializeHost();
    const memberNames = getAllMemberNames(engine);

    expect(memberNames.filter((name) => /autokeyboard/i.test(name))).toEqual([]);
  });

  // spec-006 wire half / TS-047/TS-048 / BHV-109/110/309 + INV-A05/INV-C03: the dialog is a pure
  // data carrier — its backend read surface must itself be pure (no persistence writes, no update
  // events, no OS writes from any get)
  it('reads are pure: no persistence writes, no update events, no OS writes', async () => {
    const engine = await initializeHost();

    await engine.getProjectDefaultKeyboard({
      projectId: GUID_CONFIGURED,
      surfaceType: 'vernacular',
    });
    await engine.getProjectDefaultKeyboards(GUID_CONFIGURED);
    await engine.getSystemDefaultKeyboard(undefined);
    await engine.getAvailableKeyboards(undefined);
    await engine.getCurrentKeyboard(undefined);
    await engine.getLastUsedKeyboards(GUID_CONFIGURED);
    await flushAsync();

    expect(mockSettingsSet).not.toHaveBeenCalled();
    expect(updateEmissions).toEqual([]);
    expect(fakeOsKeyboard.getWrites()).toEqual([]);
  });

  // ACCEPTANCE — gm-009 wire side (TS-018 / BHV-300 / EXT-101 / ALIGNMENT-5 / REV-004): the
  // dialog-OK orchestration is text-set → comments-set → activate(TEXT). The comments keyboard is
  // persisted but NEVER activated immediately (gm-009 expected-output:
  // notesKeyboardActivatedImmediately === false; callSequence ends with ActivateKeyboard(ar-SA)).
  // The UI half (who issues these calls) is CAP-UI-001; this pins what the wire does with them.
  it('ACCEPTANCE gm-009: dialog OK orchestration — text-set, comments-set, activate(text); comments keyboard never activated', async () => {
    const engine = await initializeHost();
    const vernacularSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_NEW,
      surfaceType: 'vernacular',
    });
    const commentsSubscriber = await subscribeProjectDefaultKeyboardHarness({
      projectId: GUID_NEW,
      surfaceType: 'comments',
    });

    // gm-009 call sequence: Associate(text) → Associate(notes) → ActivateKeyboard(text)
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'vernacular' },
      VERNACULAR_KEYBOARD,
    );
    await engine.setProjectDefaultKeyboard(
      { projectId: GUID_NEW, surfaceType: 'comments' },
      OTHER_KEYBOARD,
    );
    await engine.setCurrentKeyboard(undefined, { keyboardId: VERNACULAR_KEYBOARD });
    await flushAsync();

    // The ONLY OS activation is the text keyboard (notesKeyboardActivatedImmediately === false)
    expect(fakeOsKeyboard.getWrites()).toEqual([VERNACULAR_KEYBOARD]);
    // Both associations persisted
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'vernacular' }),
    ).resolves.toBe(VERNACULAR_KEYBOARD);
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_NEW, surfaceType: 'comments' }),
    ).resolves.toBe(OTHER_KEYBOARD);
    // Correctly scoped events: one per changed surface + one for the activation
    expect(emissionsNaming('ProjectDefaultKeyboard')).toBe(2);
    expect(emissionsNaming('CurrentKeyboard')).toBe(1);
    expect(vernacularSubscriber).toHaveBeenCalledTimes(1);
    expect(vernacularSubscriber).toHaveBeenCalledWith(VERNACULAR_KEYBOARD);
    expect(commentsSubscriber).toHaveBeenCalledTimes(1);
    expect(commentsSubscriber).toHaveBeenCalledWith(OTHER_KEYBOARD);
    // The active keyboard is the text keyboard
    await expect(engine.getCurrentKeyboard(undefined)).resolves.toEqual({
      keyboardId: VERNACULAR_KEYBOARD,
      projectId: undefined,
      surfaceType: undefined,
    });
  });
});
