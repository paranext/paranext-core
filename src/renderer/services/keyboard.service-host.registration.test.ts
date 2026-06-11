// CAP-016 (keyboard-switching) RED-phase tests — registration viability + composition-root seams
// carried over from CAP-015 (implementer plan decisions I-8 and I-3).
//
// I-8 (BLOCKING): the engine's four read-only data types (`ProjectDefaultKeyboards`,
// `SystemDefaultKeyboard`, `AvailableKeyboards`, `LastUsedKeyboards`) must each carry a `set*`
// member, because the REAL `buildDataProvider` (src/shared/services/data-provider.service.ts)
// THROWS "Data provider engine does not have matching get and set functions!" at registration —
// renderer startup would crash the moment `registerEngine` runs unmocked. The platform precedent
// for read-only data types is a THROWING setter (localization.service-host.ts `setLocalizedString`
// et al.). The parity test below runs the REAL validation (`buildDataProvider`'s
// `getDataProviderEngineDataTypeFunctions`, exported from data-provider-engine.model — no drift
// possible) against the engine that `initialize()` registers, so registration can never crash
// startup. The companion behavior pin (setters exist but always reject and never mutate/emit)
// lives in keyboard.service-host.test.ts (revised CAP-015 read-only pin).
//
// I-3: CAP-009's `resolveLegacyProjectKey` seam (EXT-106 pre-Guid migration, CAP-009 plan
// D-SEAM-2) is unwired in the composition root — legacy ≤20-char short-name entries silently drop
// instead of resolving. `initialize()` must construct the association store with a resolver
// backed by project lookup (a project's short name is its `platform.name` project setting).
//
// Traceability: strategic-plan-backend.md ### CAP-016 (edge cases / success criteria);
// implementer-CAP-015.md decisions I-8, I-3; CAP-009 test-writer plan D-SEAM-2.

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDataProviderEngineDataTypeFunctions } from '@shared/models/data-provider-engine.model';
import type {
  KeyboardId,
  KeyboardServiceDataTypes,
  KeyboardSurfaceType,
} from '@shared/services/keyboard.service-model';
import { osKeyboardServiceProviderName } from '@shared/services/keyboard.service-model';
import { keyboardsByProjectSettingKey } from '@renderer/services/keyboard/keyboard-association-store';
import type { KeyboardSwitchingDataProviderEngine } from '@renderer/services/keyboard.service-host';

const {
  capturedStoreOptions,
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
} = vi.hoisted(() => {
  const options: ({ resolveLegacyProjectKey?: unknown } | undefined)[] = [];
  return {
    capturedStoreOptions: options,
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
  };
});

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

// I-3 boundaries: the legacy-key resolver is backed by project lookup. Both the metadata
// enumeration and the per-project `platform.name` read (a project's short name) are served here —
// outcome assertions below do not prescribe the exact call sequence.
vi.mock('@shared/services/project-lookup.service', () => ({
  __esModule: true,
  projectLookupService: { getMetadataForAllProjects: mockGetMetadataForAllProjects },
  default: { getMetadataForAllProjects: mockGetMetadataForAllProjects },
}));

vi.mock('@shared/services/project-data-provider.service', () => ({
  __esModule: true,
  papiFrontendProjectDataProviderService: { get: mockProjectDataProviderGet },
  papiBackendProjectDataProviderService: { get: mockProjectDataProviderGet },
}));

// I-3a seam capture: wrap the REAL store class so the options `initialize()` passes are observable
vi.mock('@renderer/services/keyboard/keyboard-association-store', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@renderer/services/keyboard/keyboard-association-store')>();
  class KeyboardAssociationStore extends actual.KeyboardAssociationStore {
    constructor(...args: ConstructorParameters<typeof actual.KeyboardAssociationStore>) {
      super(...args);
      capturedStoreOptions.push(args[0]);
    }
  }
  return { ...actual, KeyboardAssociationStore };
});

/** Guid-style ProjectId of the project whose short name is {@link LEGACY_SHORT_NAME} */
const GUID_LEGACY = 'e6da4444-5555-6666-7777-88889999aab5';

/** PT9 legacy flat key: a project SHORT NAME (whole key length ≤ 20 — KeyboardHelper.cs:40) */
const LEGACY_SHORT_NAME = 'LEGACY';

/** A legacy short-name key no current project resolves to — must be DROPPED on migration */
const UNRESOLVABLE_SHORT_NAME = 'GONE';

const LEGACY_KEYBOARD = 'ar-SA';
const SYSTEM_DEFAULT = 'en-US';

/** Per-test value served for the `platform.keyboardsByProject` setting */
let seededKeyboardsSetting: unknown;

let registeredEngine: KeyboardSwitchingDataProviderEngine | undefined;

function createFakeOsKeyboardProvider() {
  return {
    getCurrentOsKeyboard: vi.fn(async (): Promise<KeyboardId | undefined> => SYSTEM_DEFAULT),
    setCurrentOsKeyboard: vi.fn(async () => true),
    getAvailableOsKeyboards: vi.fn(async () => [
      { id: SYSTEM_DEFAULT, name: SYSTEM_DEFAULT },
      { id: LEGACY_KEYBOARD, name: LEGACY_KEYBOARD },
    ]),
    subscribeCurrentOsKeyboard: vi.fn(async () => vi.fn(async () => true)),
  };
}

/** Loads a FRESH host module instance (the host memoizes `initialize` at module scope) */
async function initializeHost(): Promise<KeyboardSwitchingDataProviderEngine> {
  vi.resetModules();
  const host = await import('@renderer/services/keyboard.service-host');
  await host.initialize();
  if (!registeredEngine)
    throw new Error('Keyboard engine has not been registered — initialize() did not register');
  return registeredEngine;
}

beforeEach(() => {
  localStorage.clear();
  capturedStoreOptions.length = 0;
  registeredEngine = undefined;
  seededKeyboardsSetting = {};

  mockSettingsGet.mockReset();
  mockSettingsGet.mockImplementation(async (key: string) => {
    if (key === keyboardsByProjectSettingKey) return structuredClone(seededKeyboardsSetting);
    return undefined;
  });
  mockSettingsSet.mockReset();
  mockSettingsSet.mockResolvedValue(true);

  mockDataProvidersGet.mockReset();
  mockDataProvidersGet.mockImplementation(async (providerName: string) => {
    if (providerName === osKeyboardServiceProviderName) return createFakeOsKeyboardProvider();
    throw new Error(`Unexpected data provider requested in test: ${providerName}`);
  });

  mockRegisterEngine.mockReset();
  mockRegisterEngine.mockImplementation(
    async (_providerName: string, engine: KeyboardSwitchingDataProviderEngine) => {
      registeredEngine = engine;
      return { dispose: async () => true, onDidDispose: () => async () => true };
    },
  );

  mockNotificationSend.mockReset();
  mockNotificationSend.mockResolvedValue(undefined);

  mockSubscribeFocus.mockReset();
  mockSubscribeFocus.mockResolvedValue(vi.fn(async () => true));
  mockSubscribeAppFocus.mockReset();
  mockSubscribeAppFocus.mockResolvedValue(vi.fn(async () => true));
  mockGetFocus.mockReset();
  mockGetFocus.mockResolvedValue({ focusType: 'other' });
  mockGetAppFocus.mockReset();
  mockGetAppFocus.mockResolvedValue({ isAppFocused: true });

  mockGetOpenWebViewDefinition.mockReset();
  mockGetOpenWebViewDefinition.mockResolvedValue(undefined);

  mockCreateNetworkEventEmitter.mockReset();
  mockCreateNetworkEventEmitter.mockImplementation(() => ({
    emit: vi.fn(),
    event: vi.fn(),
    dispose: vi.fn(async () => true),
  }));

  mockGetLocalizedString.mockReset();
  mockGetLocalizedString.mockImplementation(
    async ({ localizeKey }: { localizeKey: string }) => localizeKey,
  );

  // I-3 world: exactly one project exists; its short name (`platform.name`) is LEGACY_SHORT_NAME
  mockGetMetadataForAllProjects.mockReset();
  mockGetMetadataForAllProjects.mockResolvedValue([
    { id: GUID_LEGACY, projectInterfaces: ['platform.base'], pdpFactoryInfo: {} },
  ]);
  mockProjectDataProviderGet.mockReset();
  mockProjectDataProviderGet.mockImplementation(
    async (_projectInterface: string, projectId: string) => ({
      getSetting: async (key: string) =>
        projectId === GUID_LEGACY && key === 'platform.name' ? LEGACY_SHORT_NAME : undefined,
    }),
  );
});

describe('registration viability against the real buildDataProvider validation (I-8)', () => {
  // buildDataProvider's getDataProviderEngineDataTypeFunctions throws when the get and set
  // data-type lists differ — the engine must therefore carry a setter for EVERY data type it
  // serves (read-only ones throw, localization.service-host precedent), or real registration
  // crashes renderer startup
  it('registers an engine whose get/set data-type lists match (real registerEngine precondition)', async () => {
    const engine = await initializeHost();

    // The REAL validation registration runs — throws the real registration error on any mismatch
    const dataTypeFunctions =
      getDataProviderEngineDataTypeFunctions<KeyboardServiceDataTypes>(engine);

    // Spell the enforced condition out too (same-length + same-members) for readable diagnostics
    const getDataTypes = [...(dataTypeFunctions.get('get') ?? [])].sort();
    const setDataTypes = [...(dataTypeFunctions.get('set') ?? [])].sort();
    expect(setDataTypes).toEqual(getDataTypes);
  });
});

describe('EXT-106 legacy-key resolution wiring (I-3 / CAP-009 D-SEAM-2)', () => {
  it('constructs the association store with a resolveLegacyProjectKey resolver', async () => {
    await initializeHost();

    expect(capturedStoreOptions).toHaveLength(1);
    expect(capturedStoreOptions[0]?.resolveLegacyProjectKey).toBeTypeOf('function');
  });

  it('resolves a legacy short-name entry to its project Guid via project lookup and drops unresolvable entries', async () => {
    // PT9 flat legacy shape (KeyboardHelper.cs:37-58): short-name keys with string keyboard ids
    seededKeyboardsSetting = {
      [LEGACY_SHORT_NAME]: LEGACY_KEYBOARD,
      [UNRESOLVABLE_SHORT_NAME]: 'fr-FR',
    };

    const engine = await initializeHost();

    // Resolved: the association is readable under the Guid of the project whose short name
    // (`platform.name` project setting) matches the legacy key
    const surfaceType: KeyboardSurfaceType = 'vernacular';
    await expect(
      engine.getProjectDefaultKeyboard({ projectId: GUID_LEGACY, surfaceType }),
    ).resolves.toBe(LEGACY_KEYBOARD);

    // The nested rewrite persisted EXACTLY once (INV-MIGRATE-01) and contains only the resolved
    // entry — the unresolvable short name is dropped (PT9 KeyboardHelper.cs:44-54), and no legacy
    // flat keys survive
    const rewriteCalls = mockSettingsSet.mock.calls.filter(
      ([key]) => key === keyboardsByProjectSettingKey,
    );
    expect(rewriteCalls).toHaveLength(1);
    expect(rewriteCalls[0]?.[1]).toEqual({ [GUID_LEGACY]: { vernacular: LEGACY_KEYBOARD } });
  });
});
