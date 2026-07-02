// CAP-017 (keyboard-switching) RED-phase tests — `keyboardPreference` declarative field on the
// WebView model (cross-cutting platform addition (c)).
//
// Traceability: strategic-plan-backend.md ### CAP-017 (PT10-only platform contract — no
// TS-XXX/BHV-XXX scenarios per the strategic plan); data-contracts.md §9 "Code Placement →
// Existing PT10 code to extend" (`src/shared/models/web-view.model.ts` — add
// `keyboardPreference?: KeyboardSurfaceType` to `WebViewDefinitionBase` + entry in
// `WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS`); backend-alignment.md §"WebView Declarative
// Field"; capability-list.md CAP-017 row (NOT in `SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS` — the
// field must round-trip through layout save/load); alignment-decisions #4/#5/#12.
//
// The `expectTypeOf` assertions are the executable type contract for the capability's
// acceptance compile gate (`npm run typecheck:core`): if `keyboardPreference` drifts off the
// WebView model surface, tsc fails on this file. Runtime assertions pin the const key arrays
// that drive `convertWebViewDefinitionToSaved` / `mergeUpdatablePropertiesIntoWebViewDefinition-
// IfChangesArePresent` in `web-view.service-host.ts` (behavior covered in
// `src/renderer/services/web-view.service-host.test.ts`).

import { describe, expect, expectTypeOf, it } from 'vitest';
import type { KeyboardSurfaceType } from '@shared/services/keyboard.service-model';
import {
  SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS,
  WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS,
} from '@shared/models/web-view.model';
import type {
  SavedWebViewDefinition,
  SavedWebViewDefinitionOmittedKeys,
  WebViewDefinitionHtml,
  WebViewDefinitionReact,
  WebViewDefinitionUpdatableProperties,
  WebViewDefinitionUpdateInfo,
  WebViewDefinitionURL,
} from '@shared/models/web-view.model';

describe('web-view.model keyboardPreference — updatable-property key array (CAP-017c)', () => {
  it('WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS includes keyboardPreference so an open WebView can have its preference updated', () => {
    expect(WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS).toContain('keyboardPreference');
  });

  it('keeps the pre-existing updatable keys intact (regression guard for the platform edit)', () => {
    ['iconUrl', 'title', 'tooltip', 'projectId', 'scrollGroupScrRef', 'state'].forEach((key) =>
      expect(WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS).toContain(key),
    );
  });
});

describe('web-view.model keyboardPreference — saved-definition round-trip keys (CAP-017c)', () => {
  it('SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS does NOT include keyboardPreference (must round-trip through layout save/load)', () => {
    expect(SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS).not.toContain('keyboardPreference');
  });

  it('keyboardPreference is not in the omitted-keys union at the type level either', () => {
    expectTypeOf<'keyboardPreference'>().not.toExtend<SavedWebViewDefinitionOmittedKeys>();

    // Runtime anchor so this spec block participates in the RED test run (CAP-008 precedent)
    expect(SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS.length).toBeGreaterThan(0);
  });
});

describe('web-view.model keyboardPreference — type surface (CAP-017c)', () => {
  it('every WebViewDefinition variant carries optional keyboardPreference: KeyboardSurfaceType (TS undefined, NEVER null per data-contracts §9)', () => {
    expectTypeOf<WebViewDefinitionReact['keyboardPreference']>().toEqualTypeOf<
      KeyboardSurfaceType | undefined
    >();
    expectTypeOf<WebViewDefinitionHtml['keyboardPreference']>().toEqualTypeOf<
      KeyboardSurfaceType | undefined
    >();
    expectTypeOf<WebViewDefinitionURL['keyboardPreference']>().toEqualTypeOf<
      KeyboardSurfaceType | undefined
    >();

    // Runtime anchor so this spec block participates in the RED test run (CAP-008 precedent)
    expect(WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS).toContain('keyboardPreference');
  });

  it('SavedWebViewDefinition retains keyboardPreference (the FocusKeyboardRouter reads it off saved definitions)', () => {
    expectTypeOf<SavedWebViewDefinition['keyboardPreference']>().toEqualTypeOf<
      KeyboardSurfaceType | undefined
    >();

    // Runtime anchor so this spec block participates in the RED test run (CAP-008 precedent)
    expect(SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS).not.toContain('keyboardPreference');
  });

  it('keyboardPreference is part of the updatable-properties type derived from the key array', () => {
    expectTypeOf<WebViewDefinitionUpdatableProperties['keyboardPreference']>().toEqualTypeOf<
      KeyboardSurfaceType | undefined
    >();
    expectTypeOf<WebViewDefinitionUpdateInfo['keyboardPreference']>().toEqualTypeOf<
      KeyboardSurfaceType | undefined
    >();

    // Runtime anchor so this spec block participates in the RED test run (CAP-008 precedent)
    expect(WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS).toContain('keyboardPreference');
  });
});
