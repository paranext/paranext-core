// CAP-017 (keyboard-switching) RED-phase tests — `AppFocus` data type on the window service
// contract (cross-cutting platform addition (b)).
//
// Traceability: strategic-plan-backend.md ### CAP-017 (PT10-only platform contract — no
// TS-XXX/BHV-XXX scenarios per the strategic plan); data-contracts.md §9 "Code Placement →
// Existing PT10 code to extend" (`src/shared/services/window.service-model.ts` — add `AppFocus`
// data type); backend-alignment.md §"AppFocus Extension" (full data-type triple
// `DataProviderDataType<undefined, AppFocusSubject, never>` + the internal
// `windowService.setAppFocus(true | false)` proxy); feedback/phase-3-planning-review-log.md
// RM-020 (emitter in `src/main/main.ts` L422-448 calls the proxy; the data-provider host stays
// co-located with `Focus` in the renderer engine — see window.service-host.test.ts).
// Consumers: CAP-011 CrossAppFocusDebounce + CAP-014 FocusKeyboardRouter (FN-015/FN-016).
//
// The `expectTypeOf` assertions and typed exercise functions are the executable contract for
// the capability's acceptance compile gate (`npm run typecheck:core`).

import { describe, expect, expectTypeOf, it } from 'vitest';
import type { PlatformError, UnsubscriberAsync } from 'platform-bible-utils';
import type {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { windowServiceProviderName } from '@shared/services/window.service-model';
import type {
  AppFocusSubject,
  FocusSubject,
  IWindowService,
  SetFocusSpecifier,
  WindowDataTypes,
} from '@shared/services/window.service-model';

describe('window.service-model AppFocus data type (CAP-017b)', () => {
  it('AppFocusSubject is exactly { isAppFocused: boolean } (backend-alignment §"AppFocus Extension")', () => {
    expectTypeOf<AppFocusSubject>().toEqualTypeOf<{ isAppFocused: boolean }>();

    // Runtime anchor so this spec block participates in the RED test run (CAP-008 precedent);
    // pins the provider the AppFocus data type lives on
    expect(windowServiceProviderName).toBe('platform.windowServiceDataProvider');
  });

  it('WindowDataTypes gains the AppFocus triple <undefined, AppFocusSubject, never> alongside Focus', () => {
    expectTypeOf<keyof WindowDataTypes>().toEqualTypeOf<'Focus' | 'AppFocus'>();
    expectTypeOf<WindowDataTypes['AppFocus']>().toEqualTypeOf<
      DataProviderDataType<undefined, AppFocusSubject, never>
    >();

    // Runtime anchor (CAP-008 precedent)
    expect(windowServiceProviderName).toBe('platform.windowServiceDataProvider');
  });

  it('AppFocus triple fields: selector undefined, getData AppFocusSubject, setData never (no public set path — only the RM-020 proxy mutates)', () => {
    expectTypeOf<WindowDataTypes['AppFocus']['selector']>().toEqualTypeOf<undefined>();
    expectTypeOf<WindowDataTypes['AppFocus']['getData']>().toEqualTypeOf<AppFocusSubject>();
    expectTypeOf<WindowDataTypes['AppFocus']['setData']>().toEqualTypeOf<never>();

    // Runtime anchor (CAP-008 precedent)
    expect(windowServiceProviderName).toBe('platform.windowServiceDataProvider');
  });

  it('the existing Focus triple is unchanged (regression guard for the platform edit)', () => {
    expectTypeOf<WindowDataTypes['Focus']>().toEqualTypeOf<
      DataProviderDataType<undefined, FocusSubject | undefined, SetFocusSpecifier>
    >();

    // Runtime anchor (CAP-008 precedent)
    expect(windowServiceProviderName).toBe('platform.windowServiceDataProvider');
  });
});

describe('window.service-model IWindowService AppFocus surface (CAP-017b)', () => {
  it('getAppFocus resolves AppFocusSubject with or without the undefined selector', () => {
    // Compiles only when the contracted signatures exist (typecheck:core acceptance gate)
    const exerciseGetAppFocus = (windowService: IWindowService) => {
      const withoutSelector: Promise<AppFocusSubject> = windowService.getAppFocus();
      const withSelector: Promise<AppFocusSubject> = windowService.getAppFocus(undefined);
      return [withoutSelector, withSelector];
    };
    expect(exerciseGetAppFocus).toBeTypeOf('function');
  });

  it('setAppFocus accepts the RM-020 proxy shape (isAppFocused: boolean) and the selector-first data-provider shape, mirroring setFocus', () => {
    const exerciseSetAppFocus = (windowService: IWindowService) => {
      const proxyShape: Promise<DataProviderUpdateInstructions<WindowDataTypes>> =
        windowService.setAppFocus(true);
      const selectorFirstShape: Promise<DataProviderUpdateInstructions<WindowDataTypes>> =
        windowService.setAppFocus(undefined, false);
      return [proxyShape, selectorFirstShape];
    };
    expect(exerciseSetAppFocus).toBeTypeOf('function');
  });

  it('subscribeAppFocus takes the undefined selector and a callback receiving AppFocusSubject | PlatformError, resolving an UnsubscriberAsync', () => {
    const exerciseSubscribeAppFocus = (
      windowService: IWindowService,
      options: DataProviderSubscriberOptions,
    ) => {
      const subscription: Promise<UnsubscriberAsync> = windowService.subscribeAppFocus(
        undefined,
        (appFocus: AppFocusSubject | PlatformError) => appFocus,
        options,
      );
      const subscriptionWithoutOptions: Promise<UnsubscriberAsync> =
        windowService.subscribeAppFocus(undefined, () => {});
      return [subscription, subscriptionWithoutOptions];
    };
    expect(exerciseSubscribeAppFocus).toBeTypeOf('function');
  });
});
