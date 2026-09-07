import { describe, expect, it } from 'vitest';
import {
  buildExpectedLiveIdentifiers,
  checkMarkerAgreement,
  classifyLiveMethod,
  findMissingFromLive,
  getExpectedLiveCheck,
  isComparableLive,
  matchDynamicObjectId,
  resolveNetworkObjectMethod,
  type LiveMethod,
  type WireSurfaceDynamicRegistration,
  type WireSurfaceRegistration,
} from './wire-surface-reduction.util';

/** Build a full {@link WireSurfaceRegistration}, defaulting the fields most tests don't vary. */
function reg(
  overrides: Partial<WireSurfaceRegistration> & Pick<WireSurfaceRegistration, 'category' | 'name'>,
): WireSurfaceRegistration {
  return {
    experimental: false,
    documented: false,
    docsStaticallyResolved: true,
    language: 'typescript',
    file: 'src/somewhere.ts',
    registeredVia: 'test',
    ...overrides,
  };
}

/** Build a full {@link WireSurfaceDynamicRegistration}, defaulting the fields tests don't vary. */
function dynamicReg(
  overrides: Partial<WireSurfaceDynamicRegistration> &
    Pick<WireSurfaceDynamicRegistration, 'category'>,
): WireSurfaceDynamicRegistration {
  return {
    expression: 'someExpression',
    file: 'src/somewhere.ts',
    language: 'typescript',
    registeredVia: 'test',
    ...overrides,
  };
}

describe('getExpectedLiveCheck', () => {
  it('prefixes a command name with "command:"', () => {
    expect(getExpectedLiveCheck(reg({ category: 'command', name: 'platform.about' }))).toEqual({
      kind: 'exact',
      wireName: 'command:platform.about',
    });
  });

  it.each(['directRequestHandler', 'standaloneMethod', 'networkEvent'])(
    'passes %s names through unchanged (already the literal wire name)',
    (category) => {
      expect(getExpectedLiveCheck(reg({ category, name: 'dialog:selectProject' }))).toEqual({
        kind: 'exact',
        wireName: 'dialog:selectProject',
      });
    },
  );

  it('checks a networkObject by its bare name', () => {
    expect(getExpectedLiveCheck(reg({ category: 'networkObject', name: 'AppService' }))).toEqual({
      kind: 'objectExistence',
      objectId: 'AppService',
    });
  });

  it('appends -data to a dataProviderEngine name', () => {
    expect(
      getExpectedLiveCheck(reg({ category: 'dataProviderEngine', name: 'platform.placeholder' })),
    ).toEqual({ kind: 'objectExistence', objectId: 'platform.placeholder-data' });
  });

  it('appends -data to a constructor-registered C# dataProvider name', () => {
    expect(
      getExpectedLiveCheck(
        reg({
          category: 'dataProvider',
          name: 'current-time',
          registeredVia: 'DataProvider(name, papiClient) constructor',
        }),
      ),
    ).toEqual({ kind: 'objectExistence', objectId: 'current-time-data' });
  });

  it('does not double-suffix a name that already ends with -data', () => {
    expect(
      getExpectedLiveCheck(reg({ category: 'dataProviderEngine', name: 'already-suffixed-data' })),
    ).toEqual({ kind: 'objectExistence', objectId: 'already-suffixed-data' });
  });

  it('marks a GetNetworkObjectDocumentation override as unresolvable', () => {
    const check = getExpectedLiveCheck(
      reg({
        category: 'dataProvider',
        name: 'ParatextProjectDataProvider',
        registeredVia: 'DataProvider.GetNetworkObjectDocumentation override',
      }),
    );
    expect(check.kind).toBe('unresolvable');
  });

  it('appends -pdpf to a pdpFactory name', () => {
    expect(
      getExpectedLiveCheck(reg({ category: 'pdpFactory', name: 'helloRock3.helloRock3Pdpf' })),
    ).toEqual({ kind: 'objectExistence', objectId: 'helloRock3.helloRock3Pdpf-pdpf' });
  });

  it('appends -webViewProvider to a webViewProvider name', () => {
    expect(
      getExpectedLiveCheck(reg({ category: 'webViewProvider', name: 'helloRock3.html' })),
    ).toEqual({ kind: 'objectExistence', objectId: 'helloRock3.html-webViewProvider' });
  });

  it('reports an unrecognized category as unresolvable rather than guessing', () => {
    expect(getExpectedLiveCheck(reg({ category: 'somethingNew', name: 'x' })).kind).toBe(
      'unresolvable',
    );
  });
});

describe('isComparableLive', () => {
  it('treats a registration with no liveness field as comparable', () => {
    expect(isComparableLive(reg({ category: 'networkObject', name: 'AppService' }))).toBe(true);
  });

  it('treats a transient registration as not comparable', () => {
    expect(
      isComparableLive(
        reg({
          category: 'networkObject',
          name: 'testMain',
          liveness: 'transient',
          livenessReason: 'self-disposes 20s after startup',
        }),
      ),
    ).toBe(false);
  });

  it('treats a lazy registration as not comparable', () => {
    expect(
      isComparableLive(
        reg({
          category: 'networkEvent',
          name: 'platformScriptureEditor.onWillSwitchProject',
          liveness: 'lazy',
          livenessReason: 'created only on first project switch',
        }),
      ),
    ).toBe(false);
  });
});

describe('buildExpectedLiveIdentifiers / findMissingFromLive', () => {
  const registrations: WireSurfaceRegistration[] = [
    reg({ category: 'command', name: 'platform.about' }),
    reg({ category: 'networkObject', name: 'AppService' }),
    reg({
      category: 'dataProvider',
      name: 'ParatextProjectDataProvider',
      registeredVia: 'DataProvider.GetNetworkObjectDocumentation override',
    }),
  ];

  it('splits into exact wire names, object ids, and unresolvable entries', () => {
    const expected = buildExpectedLiveIdentifiers(registrations);
    expect([...expected.exactWireNames]).toEqual(['command:platform.about']);
    expect([...expected.objectIds]).toEqual(['AppService']);
    expect(expected.unresolvable).toHaveLength(1);
  });

  it('reports every expected name missing from an empty live set, skipping unresolvable entries', () => {
    const missing = findMissingFromLive(registrations, new Set());
    expect(missing.map((m) => m.expectedWireName).sort()).toEqual([
      'command:platform.about',
      'object:AppService',
    ]);
  });

  it('reports nothing missing once every expected name is present', () => {
    const missing = findMissingFromLive(
      registrations,
      new Set(['command:platform.about', 'object:AppService']),
    );
    expect(missing).toEqual([]);
  });

  it('defaults dynamicCategories to empty when no dynamicRegistrations are given', () => {
    expect([...buildExpectedLiveIdentifiers(registrations).dynamicCategories]).toEqual([]);
  });

  it('collects the distinct categories present in dynamicRegistrations', () => {
    const expected = buildExpectedLiveIdentifiers(registrations, [
      dynamicReg({ category: 'command' }),
      dynamicReg({ category: 'command' }),
      dynamicReg({ category: 'pdpFactory' }),
    ]);
    expect([...expected.dynamicCategories].sort()).toEqual(['command', 'pdpFactory']);
  });
});

/**
 * A window id in the shape `mintWindowId` (`src/main/services/window-state.service.ts`) actually
 * mints — lifted verbatim from a live CI run's `rpc.discover` document rather than invented, so
 * these tests fail against a pattern that only recognizes the pre-GUID numeric ids.
 */
const LIVE_WINDOW_ID = '1f638eb7-cda2-460c-984d-f563db876704';
/** A second live window id (uppercase-folded is covered separately below), from the same CI run. */
const LIVE_WINDOW_ID_2 = 'f4cee79b-945c-4eff-8fb8-6d8049bc7281';

describe('matchDynamicObjectId', () => {
  it.each([
    [
      `DialogService-${LIVE_WINDOW_ID}`,
      'per-window network-object shard (Dialog/Usersnap/BookChapterControl/WebView/NotificationService)',
    ],
    [
      `NotificationService-${LIVE_WINDOW_ID_2}`,
      'per-window network-object shard (Dialog/Usersnap/BookChapterControl/WebView/NotificationService)',
    ],
    [
      `platform.windowServiceDataProvider-${LIVE_WINDOW_ID}-data`,
      'per-window data-provider shard (window.service-shard.ts)',
    ],
    [
      'abc123nonce-pdp-data',
      'project data provider (nonce-minted PDP or per-project C# data provider)',
    ],
    ['webViewControllerSomeNanoid', 'per-open-webview controller'],
    ['someExtension.somePdpf-pdpf', 'PDP factory (unresolved call site)'],
    ['someExtension.someType-webViewProvider', 'web view provider (unresolved call site)'],
  ])('matches %s', (id, expectedPattern) => {
    expect(matchDynamicObjectId(id)).toBe(expectedPattern);
  });

  it('matches a window id with uppercase hex digits (not RFC-4122-strict)', () => {
    expect(matchDynamicObjectId(`DialogService-${LIVE_WINDOW_ID.toUpperCase()}`)).toBe(
      'per-window network-object shard (Dialog/Usersnap/BookChapterControl/WebView/NotificationService)',
    );
  });

  it('does not match a plain static id', () => {
    expect(matchDynamicObjectId('AppService')).toBeUndefined();
  });

  it('does not match a pre-GUID numeric window id (the shape no live id has any more)', () => {
    expect(matchDynamicObjectId('DialogService-42')).toBeUndefined();
    expect(matchDynamicObjectId('platform.windowServiceDataProvider-3-data')).toBeUndefined();
  });

  it('does not treat a per-function call on a webViewController id as the bare id', () => {
    expect(matchDynamicObjectId('webViewControllerabc.postMessage')).toBeUndefined();
  });

  it('does not match a per-window shard label with no trailing window id', () => {
    expect(matchDynamicObjectId('DialogService')).toBeUndefined();
  });
});

describe('resolveNetworkObjectMethod', () => {
  const expectedObjectIds = new Set(['platform.enhancedResources', 'AppService']);

  it('resolves a bare existence check against a known id', () => {
    expect(resolveNetworkObjectMethod('AppService', expectedObjectIds)).toEqual({
      objectId: 'AppService',
      functionName: undefined,
      matchedVia: 'expectedSnapshot',
    });
  });

  it('resolves a dotted id plus function name by splitting at the last dot', () => {
    expect(
      resolveNetworkObjectMethod('platform.enhancedResources.getResource', expectedObjectIds),
    ).toEqual({
      objectId: 'platform.enhancedResources',
      functionName: 'getResource',
      matchedVia: 'expectedSnapshot',
    });
  });

  it('resolves a dynamic-pattern id with a function name', () => {
    const result = resolveNetworkObjectMethod(
      `DialogService-${LIVE_WINDOW_ID}.showDialog`,
      expectedObjectIds,
    );
    expect(result).toEqual({
      objectId: `DialogService-${LIVE_WINDOW_ID}`,
      functionName: 'showDialog',
      matchedVia:
        'per-window network-object shard (Dialog/Usersnap/BookChapterControl/WebView/NotificationService)',
    });
  });

  it('returns undefined for a name matching neither an expected id nor any dynamic pattern', () => {
    expect(
      resolveNetworkObjectMethod('totallyUnknownObject.someFunction', expectedObjectIds),
    ).toBeUndefined();
    expect(resolveNetworkObjectMethod('totallyUnknownObject', expectedObjectIds)).toBeUndefined();
  });
});

describe('classifyLiveMethod', () => {
  const expected = buildExpectedLiveIdentifiers(
    [
      reg({ category: 'command', name: 'platform.about' }),
      reg({ category: 'networkObject', name: 'AppService' }),
    ],
    // A real wire-surface.json always documents the four dynamic command-registration call sites;
    // one representative entry is enough to corroborate the family for these tests.
    [dynamicReg({ category: 'command' })],
  );

  it('classifies core RPC infrastructure', () => {
    expect(classifyLiveMethod('rpc.discover', expected)).toEqual({ kind: 'infrastructure' });
    expect(classifyLiveMethod('network:registerMethod', expected)).toEqual({
      kind: 'infrastructure',
    });
  });

  it('classifies a known-constant scanner gap as expected', () => {
    expect(classifyLiveMethod('extensionAsset:getExtensionAsset', expected)).toEqual({
      kind: 'expected',
    });
  });

  it('classifies an exact snapshot match as expected', () => {
    expect(classifyLiveMethod('command:platform.about', expected)).toEqual({ kind: 'expected' });
  });

  it('classifies a network object existence check and its function fan-out as expected', () => {
    expect(classifyLiveMethod('object:AppService', expected)).toEqual({ kind: 'expected' });
    expect(classifyLiveMethod('object:AppService.someFunction', expected)).toEqual({
      kind: 'expected',
    });
  });

  it('classifies a dynamic window-shard object as a dynamic pattern', () => {
    const result = classifyLiveMethod(
      `object:DialogService-${LIVE_WINDOW_ID}.showDialog`,
      expected,
    );
    expect(result.kind).toBe('dynamicPattern');
  });

  it('classifies a per-provider update event on a known object', () => {
    const result = classifyLiveMethod('AppService:onDidUpdate', expected);
    expect(result.kind).toBe('dynamicPattern');
  });

  it('classifies a per-provider update event on a dynamic PDP as a dynamic pattern', () => {
    const result = classifyLiveMethod('somenonce-pdp-data:onDidUpdate', expected);
    expect(result.kind).toBe('dynamicPattern');
  });

  it('classifies an unrecognized onDidUpdate provider as unknown', () => {
    expect(classifyLiveMethod('totallyUnknownThing:onDidUpdate', expected)).toEqual({
      kind: 'unknown',
    });
  });

  it.each([
    'extensionSettingValidator:platform.someSetting',
    'extensionProjectSettingValidator:platform.someProjectSetting',
    'webViewMessage:abc123',
  ])('classifies %s as a dynamic prefix family', (name) => {
    expect(classifyLiveMethod(name, expected).kind).toBe('dynamicPattern');
  });

  it('classifies an unmatched command as the lenient dynamic command family', () => {
    expect(classifyLiveMethod('command:someExtension.contributedCommand', expected)).toEqual({
      kind: 'dynamicPattern',
      pattern: 'extension/runtime-contributed command',
    });
  });

  it('classifies an unmatched command as unrecognized when the snapshot documents no dynamic command registration site at all', () => {
    const noCommandSites = buildExpectedLiveIdentifiers([
      reg({ category: 'networkObject', name: 'AppService' }),
    ]);
    expect(classifyLiveMethod('command:not.declared', noCommandSites)).toEqual({ kind: 'unknown' });
  });

  it('classifies a command matching a static command entry by exact name as expected, not the lenient family', () => {
    expect(classifyLiveMethod('command:platform.about', expected)).toEqual({ kind: 'expected' });
  });

  it('classifies a command matching a C# standaloneMethod entry (already carrying the command: prefix) by exact name as expected', () => {
    const withStandaloneCommand = buildExpectedLiveIdentifiers([
      reg({
        category: 'standaloneMethod',
        name: 'command:paratextBibleSendReceive.breakSyncLock',
        language: 'csharp',
        registeredVia: 'PapiClient.RegisterRequestHandlerAsync',
      }),
    ]);
    expect(
      classifyLiveMethod('command:paratextBibleSendReceive.breakSyncLock', withStandaloneCommand),
    ).toEqual({ kind: 'expected' });
  });

  describe('the -pdpf suffix family', () => {
    it('classifies an unmatched -pdpf id as unrecognized when the snapshot has no pdpFactory entry at all', () => {
      const noPdpFactory = buildExpectedLiveIdentifiers([
        reg({ category: 'networkObject', name: 'AppService' }),
      ]);
      expect(classifyLiveMethod('object:platform.x-pdpf', noPdpFactory)).toEqual({
        kind: 'unknown',
      });
    });

    it('classifies a -pdpf id matching a static pdpFactory entry by exact declared name as expected', () => {
      const withStaticPdpFactory = buildExpectedLiveIdentifiers([
        reg({ category: 'pdpFactory', name: 'platform.x' }),
      ]);
      expect(classifyLiveMethod('object:platform.x-pdpf', withStaticPdpFactory)).toEqual({
        kind: 'expected',
      });
    });

    it('classifies an unmatched -pdpf id as the dynamic pattern once the snapshot documents a dynamic pdpFactory entry', () => {
      const withDynamicPdpFactory = buildExpectedLiveIdentifiers(
        [],
        [dynamicReg({ category: 'pdpFactory' })],
      );
      expect(classifyLiveMethod('object:someExtension.other-pdpf', withDynamicPdpFactory)).toEqual({
        kind: 'dynamicPattern',
        pattern: 'PDP factory (unresolved call site)',
      });
    });
  });

  describe('the -webViewProvider suffix family', () => {
    it('classifies an unmatched -webViewProvider id as unrecognized when the snapshot has no webViewProvider entry at all', () => {
      const noWebViewProvider = buildExpectedLiveIdentifiers([
        reg({ category: 'networkObject', name: 'AppService' }),
      ]);
      expect(classifyLiveMethod('object:platform.x-webViewProvider', noWebViewProvider)).toEqual({
        kind: 'unknown',
      });
    });

    it('classifies a -webViewProvider id matching a static webViewProvider entry by exact declared name as expected', () => {
      const withStaticWebViewProvider = buildExpectedLiveIdentifiers([
        reg({ category: 'webViewProvider', name: 'platform.x' }),
      ]);
      expect(
        classifyLiveMethod('object:platform.x-webViewProvider', withStaticWebViewProvider),
      ).toEqual({ kind: 'expected' });
    });

    it('classifies an unmatched -webViewProvider id as the dynamic pattern once the snapshot documents a dynamic webViewProvider entry', () => {
      const withDynamicWebViewProvider = buildExpectedLiveIdentifiers(
        [],
        [dynamicReg({ category: 'webViewProvider' })],
      );
      expect(
        classifyLiveMethod(
          'object:someExtension.other-webViewProvider',
          withDynamicWebViewProvider,
        ),
      ).toEqual({
        kind: 'dynamicPattern',
        pattern: 'web view provider (unresolved call site)',
      });
    });
  });

  it('classifies a fully unrecognized object as unknown', () => {
    expect(classifyLiveMethod('object:totallyNewThing', expected)).toEqual({ kind: 'unknown' });
  });

  it('classifies a fully unrecognized bare method as unknown', () => {
    expect(classifyLiveMethod('somethingNobodyRecognizes', expected)).toEqual({ kind: 'unknown' });
  });

  describe('every per-window-shard family, by exact live name', () => {
    // One existence method, one fanned method, per shard family — lifted verbatim from a live CI
    // run's rpc.discover document (window id 1f638eb7-cda2-460c-984d-f563db876704). A pattern
    // scoped to the pre-GUID numeric shape classifies every one of these as 'unknown'.
    it.each([
      `object:BookChapterControlService-${LIVE_WINDOW_ID}`,
      `object:BookChapterControlService-${LIVE_WINDOW_ID}.open`,
      `object:DialogService-${LIVE_WINDOW_ID}`,
      `object:DialogService-${LIVE_WINDOW_ID}.selectProject`,
      `object:DialogService-${LIVE_WINDOW_ID}.showAboutDialog`,
      `object:DialogService-${LIVE_WINDOW_ID}.showDialog`,
      `object:NotificationService-${LIVE_WINDOW_ID}`,
      `object:NotificationService-${LIVE_WINDOW_ID}.dismiss`,
      `object:NotificationService-${LIVE_WINDOW_ID}.send`,
      `object:platform.windowServiceDataProvider-${LIVE_WINDOW_ID}-data`,
      `object:platform.windowServiceDataProvider-${LIVE_WINDOW_ID}-data.getFocus`,
      `object:platform.windowServiceDataProvider-${LIVE_WINDOW_ID}-data.getNavigationContext`,
      `object:platform.windowServiceDataProvider-${LIVE_WINDOW_ID}-data.setFocus`,
      `platform.windowServiceDataProvider-${LIVE_WINDOW_ID}-data:onDidUpdate`,
      `object:UsersnapService-${LIVE_WINDOW_ID}`,
      `object:UsersnapService-${LIVE_WINDOW_ID}.closeOpenForm`,
      `object:UsersnapService-${LIVE_WINDOW_ID}.isFormCurrentlyOpen`,
      `object:UsersnapService-${LIVE_WINDOW_ID}.reportIssue`,
      `object:UsersnapService-${LIVE_WINDOW_ID}.submitIdea`,
      `object:WebViewService-${LIVE_WINDOW_ID}`,
      `object:WebViewService-${LIVE_WINDOW_ID}.adoptWebView`,
      `object:WebViewService-${LIVE_WINDOW_ID}.openWebView`,
    ])('classifies %s as a dynamic pattern, not unknown', (liveMethodName) => {
      expect(classifyLiveMethod(liveMethodName, expected).kind).toBe('dynamicPattern');
    });
  });
});

describe('checkMarkerAgreement', () => {
  it('reports no disagreement when an exact-category marker matches', () => {
    const registrations = [
      reg({ category: 'command', name: 'platform.about', experimental: true }),
    ];
    const live: LiveMethod[] = [{ name: 'command:platform.about', 'x-experimental': true }];
    expect(checkMarkerAgreement(registrations, live)).toEqual([]);
  });

  it('reports a disagreement when an exact-category marker does not match', () => {
    const registrations = [
      reg({ category: 'command', name: 'platform.about', experimental: true }),
    ];
    const live: LiveMethod[] = [{ name: 'command:platform.about', 'x-experimental': false }];
    const disagreements = checkMarkerAgreement(registrations, live);
    expect(disagreements).toHaveLength(1);
    expect(disagreements[0]).toMatchObject({
      liveMethodName: 'command:platform.about',
      declaredExperimental: true,
      liveExperimental: false,
    });
  });

  it('skips a registration whose docs were not statically resolved', () => {
    const registrations = [
      reg({ category: 'command', name: 'x', experimental: false, docsStaticallyResolved: false }),
    ];
    const live: LiveMethod[] = [{ name: 'command:x', 'x-experimental': true }];
    expect(checkMarkerAgreement(registrations, live)).toEqual([]);
  });

  it('always checks the existence method of a network object, regardless of fan-out', () => {
    const registrations = [
      reg({ category: 'networkObject', name: 'AppService', experimental: true }),
    ];
    const live: LiveMethod[] = [{ name: 'object:AppService', 'x-experimental': false }];
    const disagreements = checkMarkerAgreement(registrations, live);
    expect(disagreements).toHaveLength(1);
    expect(disagreements[0].liveMethodName).toBe('object:AppService');
  });

  it('flags a fanned method that disagrees with a true object-level marker', () => {
    const registrations = [
      reg({ category: 'networkObject', name: 'AppService', experimental: true }),
    ];
    const live: LiveMethod[] = [
      { name: 'object:AppService', 'x-experimental': true },
      { name: 'object:AppService.doThing', 'x-experimental': false },
    ];
    const disagreements = checkMarkerAgreement(registrations, live);
    expect(disagreements).toHaveLength(1);
    expect(disagreements[0].liveMethodName).toBe('object:AppService.doThing');
  });

  it('does not flag a fanned method when the object-level marker is false', () => {
    const registrations = [
      reg({ category: 'networkObject', name: 'AppService', experimental: false }),
    ];
    const live: LiveMethod[] = [
      { name: 'object:AppService', 'x-experimental': false },
      // Independently experimental with no object-level marker — not a disagreement.
      { name: 'object:AppService.doThing', 'x-experimental': true },
    ];
    expect(checkMarkerAgreement(registrations, live)).toEqual([]);
  });

  it('does not flag a registration missing entirely from the live document', () => {
    const registrations = [reg({ category: 'networkObject', name: 'Missing', experimental: true })];
    expect(checkMarkerAgreement(registrations, [])).toEqual([]);
  });
});
