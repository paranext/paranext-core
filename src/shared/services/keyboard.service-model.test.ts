// CAP-008 (keyboard-switching) RED-phase tests — TS service-model contract surface.
//
// Traceability: strategic-plan-backend.md ### CAP-008 (PT10-only contract — no TS-XXX/BHV-XXX
// scenarios exist for this capability per the strategic plan); data-contracts.md §2.1
// (KeyboardId), §2.2 (ProjectId), §2.3 (KeyboardOption), §2.5 (KEYBOARD_SURFACE_TYPES /
// LiteralUnion / KeyboardSurfaceType), §9 (PT10 implementation alignment);
// backend-alignment.md §"Type Declaration" + §"Data Provider Data Types (PT10)";
// alignment-decisions.md #26-#30.
//
// The type-level assertions (expectTypeOf) are the executable specification for the
// capability's acceptance gate (`npm run typecheck:core`): if the service-model's exported
// types drift from the contract, tsc fails on this file.

import { describe, expect, expectTypeOf, it } from 'vitest';
import type { DataProviders } from 'papi-shared-types';
import type { PlatformEvent } from 'platform-bible-utils';
import type { WebViewId } from '@shared/models/web-view.model';
import type { IDataProvider } from '@shared/models/data-provider.interface';
import {
  KEYBOARD_SURFACE_TYPES,
  MAX_LAST_USED_KEYBOARDS,
  isCommentsInterface,
  isScriptureInterface,
  keyboardServiceProviderName,
  osKeyboardServiceProviderName,
} from '@shared/services/keyboard.service-model';
import type {
  CurrentKeyboard,
  IKeyboardService,
  IOsKeyboardDataProvider,
  KeyboardId,
  KeyboardOption,
  KeyboardServiceDataTypes,
  KeyboardSurfaceType,
  LiteralUnion,
  ManualKeyboardSwitchDetection,
  OsKeyboardServiceDataTypes,
  ProjectDefaultKeyboardSelector,
  ProjectId,
  SetCurrentKeyboardValue,
  SurfaceKeyboardArrayMap,
  SurfaceKeyboardMap,
} from '@shared/services/keyboard.service-model';

describe('keyboard.service-model contract constants', () => {
  it('exposes the keyboard service provider name platform.keyboard (wire contract)', () => {
    expect(keyboardServiceProviderName).toBe('platform.keyboard');
    // Literal type required so the papi-shared-types augmentation key is exact
    expectTypeOf<typeof keyboardServiceProviderName>().toEqualTypeOf<'platform.keyboard'>();
  });

  it('exposes the OS-primitive provider name platform.osKeyboard (CAP-007 C# DataProvider)', () => {
    expect(osKeyboardServiceProviderName).toBe('platform.osKeyboard');
    expectTypeOf<typeof osKeyboardServiceProviderName>().toEqualTypeOf<'platform.osKeyboard'>();
  });

  it('KEYBOARD_SURFACE_TYPES is exactly [vernacular, comments] in canonical order (data-contracts §2.5, alignment-decision #29 §D)', () => {
    // Order matters: surface-iterating consumers (the keyboard-selection dialog, tests)
    // import this const rather than hardcoding the list
    expect(KEYBOARD_SURFACE_TYPES).toEqual(['vernacular', 'comments']);
  });

  it('MAX_LAST_USED_KEYBOARDS is 1 (const tunable — alignment-decision #26 / strategic plan v2.3.0)', () => {
    expect(MAX_LAST_USED_KEYBOARDS).toBe(1);
  });
});

describe('isScriptureInterface (alignment-decision #30 — supersedes surfacesVisibleFor)', () => {
  it('matches a scripture projectInterface (case-insensitive substring per data-contracts §2.4 callout)', () => {
    expect(isScriptureInterface('platformScripture.USFM_Verse')).toBe(true);
    expect(isScriptureInterface('platformScripture.USFM_BookChapterVerse')).toBe(true);
  });

  it('matches regardless of casing', () => {
    expect(isScriptureInterface('SCRIPTURE')).toBe(true);
    expect(isScriptureInterface('Scripture')).toBe(true);
  });

  it('does not match a comments-only projectInterface', () => {
    expect(isScriptureInterface('legacyCommentManager.comments')).toBe(false);
  });

  it('does not match unrelated or empty projectInterfaces', () => {
    expect(isScriptureInterface('platform.placeholder')).toBe(false);
    expect(isScriptureInterface('')).toBe(false);
  });
});

describe('isCommentsInterface (alignment-decision #30)', () => {
  it('matches a comments projectInterface (case-insensitive substring)', () => {
    expect(isCommentsInterface('legacyCommentManager.comments')).toBe(true);
  });

  it('matches regardless of casing', () => {
    expect(isCommentsInterface('COMMENTS')).toBe(true);
    expect(isCommentsInterface('Comments')).toBe(true);
  });

  it('does not match a scripture-only projectInterface', () => {
    expect(isCommentsInterface('platformScripture.USFM_Verse')).toBe(false);
  });

  it('does not match unrelated or empty projectInterfaces', () => {
    expect(isCommentsInterface('platform.placeholder')).toBe(false);
    expect(isCommentsInterface('')).toBe(false);
  });

  it('both predicates accept a single string and return boolean', () => {
    expectTypeOf(isScriptureInterface).toEqualTypeOf<(projectInterface: string) => boolean>();
    expectTypeOf(isCommentsInterface).toEqualTypeOf<(projectInterface: string) => boolean>();
    // Runtime sanity: predicates are total over arbitrary strings (no throw)
    expect(typeof isScriptureInterface('anything')).toBe('boolean');
    expect(typeof isCommentsInterface('anything')).toBe('boolean');
  });
});

describe('KeyboardSurfaceType + LiteralUnion (data-contracts §2.5 forward-compat read tolerance)', () => {
  it('derives the known union from KEYBOARD_SURFACE_TYPES and tolerates unknown strings without collapsing', () => {
    // Known union derives from the const tuple — one-line surface addition propagates
    expectTypeOf<(typeof KEYBOARD_SURFACE_TYPES)[number]>().toEqualTypeOf<
      'vernacular' | 'comments'
    >();

    // Known values are assignable (autocomplete preserved)
    expectTypeOf<'vernacular'>().toExtend<KeyboardSurfaceType>();
    expectTypeOf<'comments'>().toExtend<KeyboardSurfaceType>();

    // Forward-compat read tolerance: a future surface string is still assignable
    expectTypeOf<'someFutureSurface'>().toExtend<KeyboardSurfaceType>();
    expectTypeOf<string>().toExtend<KeyboardSurfaceType>();

    // The LiteralUnion trick must NOT collapse to plain `string` (would lose
    // autocomplete + switch-default exhaustiveness pressure)
    expectTypeOf<KeyboardSurfaceType>().not.toEqualTypeOf<string>();

    // The exported helper itself behaves the same way
    expectTypeOf<'a'>().toExtend<LiteralUnion<'a'>>();
    expectTypeOf<'anything-else'>().toExtend<LiteralUnion<'a'>>();
    expectTypeOf<LiteralUnion<'a'>>().not.toEqualTypeOf<string>();

    // Runtime anchor so this spec block participates in the RED test run
    expect(KEYBOARD_SURFACE_TYPES).toHaveLength(2);
  });
});

describe('shared scalar + payload types', () => {
  it('KeyboardId and ProjectId are opaque strings (data-contracts §2.1/§2.2; INV-C06/INV-C07)', () => {
    expectTypeOf<KeyboardId>().toEqualTypeOf<string>();
    expectTypeOf<ProjectId>().toEqualTypeOf<string>();
    expect(true).toBe(true);
  });

  it('CurrentKeyboard carries keyboardId + optional project/surface context (backend-alignment CurrentKeyboard data type)', () => {
    expectTypeOf<CurrentKeyboard>().toEqualTypeOf<{
      keyboardId: KeyboardId;
      projectId: ProjectId | undefined;
      surfaceType: KeyboardSurfaceType | undefined;
    }>();
    expect(true).toBe(true);
  });

  it('ManualKeyboardSwitchDetection matches the alignment-decision #28 event payload', () => {
    expectTypeOf<ManualKeyboardSwitchDetection>().toEqualTypeOf<{
      projectId: ProjectId;
      surfaceType: KeyboardSurfaceType;
      manuallyChosenKeyboardId: KeyboardId;
    }>();
    expect(true).toBe(true);
  });

  it('KeyboardOption matches the C# record wire shape (data-contracts §2.3)', () => {
    expectTypeOf<KeyboardOption>().toEqualTypeOf<{
      id: KeyboardId;
      name: string;
      isRtlScript?: boolean;
    }>();
    expect(true).toBe(true);
  });

  it('SurfaceKeyboardMap / SurfaceKeyboardArrayMap type known keys strongly and tolerate unknown keys (alignment-decision #29 §D)', () => {
    expectTypeOf<SurfaceKeyboardMap['vernacular']>().toEqualTypeOf<KeyboardId | undefined>();
    expectTypeOf<SurfaceKeyboardMap['comments']>().toEqualTypeOf<KeyboardId | undefined>();
    // Index-signature tolerance for future surfaces persisted by newer PT10s
    expectTypeOf<SurfaceKeyboardMap['someFutureSurface']>().toEqualTypeOf<KeyboardId | undefined>();

    expectTypeOf<SurfaceKeyboardArrayMap['vernacular']>().toEqualTypeOf<KeyboardId[] | undefined>();
    expectTypeOf<SurfaceKeyboardArrayMap['comments']>().toEqualTypeOf<KeyboardId[] | undefined>();
    expectTypeOf<SurfaceKeyboardArrayMap['someFutureSurface']>().toEqualTypeOf<
      KeyboardId[] | undefined
    >();
    expect(true).toBe(true);
  });
});

describe('KeyboardServiceDataTypes (6 data types per backend-alignment §"Data Provider Data Types")', () => {
  it('declares exactly the six contracted data types', () => {
    expectTypeOf<keyof KeyboardServiceDataTypes>().toEqualTypeOf<
      | 'ProjectDefaultKeyboard'
      | 'ProjectDefaultKeyboards'
      | 'SystemDefaultKeyboard'
      | 'AvailableKeyboards'
      | 'CurrentKeyboard'
      | 'LastUsedKeyboards'
    >();
    expect(true).toBe(true);
  });

  it('ProjectDefaultKeyboard: selector { projectId, surfaceType }; get/set KeyboardId | undefined (undefined set = sentinel removal)', () => {
    expectTypeOf<ProjectDefaultKeyboardSelector>().toEqualTypeOf<{
      projectId: ProjectId;
      surfaceType: KeyboardSurfaceType;
    }>();
    expectTypeOf<
      KeyboardServiceDataTypes['ProjectDefaultKeyboard']['selector']
    >().toEqualTypeOf<ProjectDefaultKeyboardSelector>();
    expectTypeOf<KeyboardServiceDataTypes['ProjectDefaultKeyboard']['getData']>().toEqualTypeOf<
      KeyboardId | undefined
    >();
    expectTypeOf<KeyboardServiceDataTypes['ProjectDefaultKeyboard']['setData']>().toEqualTypeOf<
      KeyboardId | undefined
    >();
    expect(true).toBe(true);
  });

  it('ProjectDefaultKeyboards (plural): selector ProjectId; get SurfaceKeyboardMap; read-only (alignment-decision #29 §C)', () => {
    expectTypeOf<
      KeyboardServiceDataTypes['ProjectDefaultKeyboards']['selector']
    >().toEqualTypeOf<ProjectId>();
    expectTypeOf<
      KeyboardServiceDataTypes['ProjectDefaultKeyboards']['getData']
    >().toEqualTypeOf<SurfaceKeyboardMap>();
    expectTypeOf<KeyboardServiceDataTypes['ProjectDefaultKeyboards']['setData']>().toBeNever();
    expect(true).toBe(true);
  });

  it('SystemDefaultKeyboard: selector undefined; get KeyboardId | undefined; read-only (INV-C05 snapshot)', () => {
    expectTypeOf<
      KeyboardServiceDataTypes['SystemDefaultKeyboard']['selector']
    >().toEqualTypeOf<undefined>();
    expectTypeOf<KeyboardServiceDataTypes['SystemDefaultKeyboard']['getData']>().toEqualTypeOf<
      KeyboardId | undefined
    >();
    expectTypeOf<KeyboardServiceDataTypes['SystemDefaultKeyboard']['setData']>().toBeNever();
    expect(true).toBe(true);
  });

  it('AvailableKeyboards: selector undefined; get KeyboardOption[]; read-only', () => {
    expectTypeOf<
      KeyboardServiceDataTypes['AvailableKeyboards']['selector']
    >().toEqualTypeOf<undefined>();
    expectTypeOf<KeyboardServiceDataTypes['AvailableKeyboards']['getData']>().toEqualTypeOf<
      KeyboardOption[]
    >();
    expectTypeOf<KeyboardServiceDataTypes['AvailableKeyboards']['setData']>().toBeNever();
    expect(true).toBe(true);
  });

  it('CurrentKeyboard: selector WebViewId | undefined; get CurrentKeyboard | undefined; set discriminated { surfaceType } | { keyboardId } never undefined', () => {
    expectTypeOf<KeyboardServiceDataTypes['CurrentKeyboard']['selector']>().toEqualTypeOf<
      WebViewId | undefined
    >();
    expectTypeOf<KeyboardServiceDataTypes['CurrentKeyboard']['getData']>().toEqualTypeOf<
      CurrentKeyboard | undefined
    >();
    expectTypeOf<
      KeyboardServiceDataTypes['CurrentKeyboard']['setData']
    >().toEqualTypeOf<SetCurrentKeyboardValue>();
    expectTypeOf<SetCurrentKeyboardValue>().toEqualTypeOf<
      { surfaceType: KeyboardSurfaceType } | { keyboardId: KeyboardId }
    >();
    // `undefined` as set value would conflict with resetCurrentKeyboard semantics
    expectTypeOf<undefined>().not.toExtend<SetCurrentKeyboardValue>();
    expect(true).toBe(true);
  });

  it('LastUsedKeyboards: selector ProjectId; get SurfaceKeyboardArrayMap; read-only (alignment-decisions #26, #29 §C)', () => {
    expectTypeOf<
      KeyboardServiceDataTypes['LastUsedKeyboards']['selector']
    >().toEqualTypeOf<ProjectId>();
    expectTypeOf<
      KeyboardServiceDataTypes['LastUsedKeyboards']['getData']
    >().toEqualTypeOf<SurfaceKeyboardArrayMap>();
    expectTypeOf<KeyboardServiceDataTypes['LastUsedKeyboards']['setData']>().toBeNever();
    expect(true).toBe(true);
  });
});

describe('IKeyboardService consumer surface (the shape papi.keyboard exposes — CAP-016 registers it)', () => {
  it('is a data provider over KeyboardServiceDataTypes (generated get/set/subscribe surface)', () => {
    expectTypeOf<IKeyboardService>().toExtend<IDataProvider<KeyboardServiceDataTypes>>();
    expect(true).toBe(true);
  });

  it('exposes the ergonomic method surface from backend-alignment §"Top-Level papi.keyboard Wrapper"', () => {
    expectTypeOf<
      Parameters<IKeyboardService['getProjectDefaultKeyboard']>[0]
    >().toEqualTypeOf<ProjectDefaultKeyboardSelector>();
    expectTypeOf<ReturnType<IKeyboardService['getProjectDefaultKeyboard']>>().toEqualTypeOf<
      Promise<KeyboardId | undefined>
    >();
    expectTypeOf<
      Parameters<IKeyboardService['setProjectDefaultKeyboard']>[0]
    >().toEqualTypeOf<ProjectDefaultKeyboardSelector>();
    expectTypeOf<Parameters<IKeyboardService['setProjectDefaultKeyboard']>[1]>().toEqualTypeOf<
      KeyboardId | undefined
    >();

    expectTypeOf<
      Parameters<IKeyboardService['getProjectDefaultKeyboards']>[0]
    >().toEqualTypeOf<ProjectId>();
    expectTypeOf<ReturnType<IKeyboardService['getProjectDefaultKeyboards']>>().toEqualTypeOf<
      Promise<SurfaceKeyboardMap>
    >();

    expectTypeOf<ReturnType<IKeyboardService['getSystemDefaultKeyboard']>>().toEqualTypeOf<
      Promise<KeyboardId | undefined>
    >();
    expectTypeOf<ReturnType<IKeyboardService['getAvailableKeyboards']>>().toEqualTypeOf<
      Promise<KeyboardOption[]>
    >();

    expectTypeOf<Parameters<IKeyboardService['getCurrentKeyboard']>[0]>().toEqualTypeOf<
      WebViewId | undefined
    >();
    expectTypeOf<ReturnType<IKeyboardService['getCurrentKeyboard']>>().toEqualTypeOf<
      Promise<CurrentKeyboard | undefined>
    >();
    expectTypeOf<
      Parameters<IKeyboardService['setCurrentKeyboard']>[1]
    >().toEqualTypeOf<SetCurrentKeyboardValue>();

    expectTypeOf<
      Parameters<IKeyboardService['getLastUsedKeyboards']>[0]
    >().toEqualTypeOf<ProjectId>();
    expectTypeOf<ReturnType<IKeyboardService['getLastUsedKeyboards']>>().toEqualTypeOf<
      Promise<SurfaceKeyboardArrayMap>
    >();

    // Per-selector subscriptions come with the DataProvider surface
    expectTypeOf<IKeyboardService['subscribeProjectDefaultKeyboard']>().toBeFunction();
    expectTypeOf<IKeyboardService['subscribeProjectDefaultKeyboards']>().toBeFunction();
    expectTypeOf<IKeyboardService['subscribeSystemDefaultKeyboard']>().toBeFunction();
    expectTypeOf<IKeyboardService['subscribeAvailableKeyboards']>().toBeFunction();
    expectTypeOf<IKeyboardService['subscribeCurrentKeyboard']>().toBeFunction();
    expectTypeOf<IKeyboardService['subscribeLastUsedKeyboards']>().toBeFunction();
    expect(true).toBe(true);
  });

  it('exposes resetCurrentKeyboard as a non-data-type peer method (6-case table, backend-alignment)', () => {
    expectTypeOf<IKeyboardService['resetCurrentKeyboard']>().toEqualTypeOf<
      (webViewId: WebViewId | undefined) => Promise<boolean>
    >();
    expect(true).toBe(true);
  });

  it('exposes the onDidDetectManualKeyboardSwitch event field (alignment-decision #28)', () => {
    expectTypeOf<IKeyboardService['onDidDetectManualKeyboardSwitch']>().toEqualTypeOf<
      PlatformEvent<ManualKeyboardSwitchDetection>
    >();
    expect(true).toBe(true);
  });
});

describe('OsKeyboardServiceDataTypes + IOsKeyboardDataProvider (TS types for the C# platform.osKeyboard provider — CAP-007)', () => {
  it('declares exactly CurrentOsKeyboard and AvailableOsKeyboards', () => {
    expectTypeOf<keyof OsKeyboardServiceDataTypes>().toEqualTypeOf<
      'CurrentOsKeyboard' | 'AvailableOsKeyboards'
    >();
    expect(true).toBe(true);
  });

  it('CurrentOsKeyboard: selector undefined; get KeyboardId | undefined; set KeyboardId (activates at OS layer)', () => {
    expectTypeOf<
      OsKeyboardServiceDataTypes['CurrentOsKeyboard']['selector']
    >().toEqualTypeOf<undefined>();
    expectTypeOf<OsKeyboardServiceDataTypes['CurrentOsKeyboard']['getData']>().toEqualTypeOf<
      KeyboardId | undefined
    >();
    expectTypeOf<
      OsKeyboardServiceDataTypes['CurrentOsKeyboard']['setData']
    >().toEqualTypeOf<KeyboardId>();
    expect(true).toBe(true);
  });

  it('AvailableOsKeyboards: selector undefined; get KeyboardOption[]; read-only', () => {
    expectTypeOf<
      OsKeyboardServiceDataTypes['AvailableOsKeyboards']['selector']
    >().toEqualTypeOf<undefined>();
    expectTypeOf<OsKeyboardServiceDataTypes['AvailableOsKeyboards']['getData']>().toEqualTypeOf<
      KeyboardOption[]
    >();
    expectTypeOf<OsKeyboardServiceDataTypes['AvailableOsKeyboards']['setData']>().toBeNever();
    expect(true).toBe(true);
  });

  it('IOsKeyboardDataProvider exposes the generated method surface KeyboardActivationService consumes (CAP-010)', () => {
    expectTypeOf<IOsKeyboardDataProvider>().toExtend<IDataProvider<OsKeyboardServiceDataTypes>>();
    expectTypeOf<ReturnType<IOsKeyboardDataProvider['getCurrentOsKeyboard']>>().toEqualTypeOf<
      Promise<KeyboardId | undefined>
    >();
    expectTypeOf<
      Parameters<IOsKeyboardDataProvider['setCurrentOsKeyboard']>[1]
    >().toEqualTypeOf<KeyboardId>();
    expectTypeOf<ReturnType<IOsKeyboardDataProvider['getAvailableOsKeyboards']>>().toEqualTypeOf<
      Promise<KeyboardOption[]>
    >();
    expectTypeOf<IOsKeyboardDataProvider['subscribeCurrentOsKeyboard']>().toBeFunction();
    expectTypeOf<IOsKeyboardDataProvider['subscribeAvailableOsKeyboards']>().toBeFunction();
    expect(true).toBe(true);
  });
});

describe('papi-shared-types module augmentation (must not clash with other registrations — gate: typecheck across workspace)', () => {
  it('registers platform.keyboard and platform.osKeyboard in DataProviders', () => {
    expectTypeOf<DataProviders['platform.keyboard']>().toEqualTypeOf<IKeyboardService>();
    expectTypeOf<DataProviders['platform.osKeyboard']>().toEqualTypeOf<IOsKeyboardDataProvider>();
    // The augmentation keys must be driven by the exported consts
    expectTypeOf<
      DataProviders[typeof keyboardServiceProviderName]
    >().toEqualTypeOf<IKeyboardService>();
    expectTypeOf<
      DataProviders[typeof osKeyboardServiceProviderName]
    >().toEqualTypeOf<IOsKeyboardDataProvider>();
    expect(true).toBe(true);
  });
});
