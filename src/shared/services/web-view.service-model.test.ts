// CAP-017 (keyboard-switching) RED-phase tests — `closeWebView` on the WebViewServiceType
// contract (cross-cutting platform addition (a)).
//
// Traceability: strategic-plan-backend.md ### CAP-017 (PT10-only platform contract — no
// TS-XXX/BHV-XXX scenarios per the strategic plan); data-contracts.md §9 "Code Placement →
// Existing PT10 code to extend" (`src/shared/services/web-view.service-model.ts` — add
// `closeWebView(webViewId: WebViewId): Promise<boolean>`); capability-list.md CAP-017 row.
// Consumers: CAP-UI-001 keyboard-selection dialog direct-commit close (alignment-decision #11)
// and CAP-UI-002 `openKeyboardSelection` command.
//
// The `expectTypeOf` assertions are the executable contract for the capability's acceptance
// compile gate (`npm run typecheck:core`). Host behavior (returns `false` when the webview is
// not found, no throw) is covered in `src/renderer/services/web-view.service-host.test.ts`.

import { describe, expect, expectTypeOf, it } from 'vitest';
import type { WebViewId } from '@shared/models/web-view.model';
import { NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE } from '@shared/services/web-view.service-model';
import type { WebViewServiceType } from '@shared/services/web-view.service-model';

describe('web-view.service-model closeWebView contract (CAP-017a)', () => {
  it('closeWebView takes a WebViewId and resolves to boolean (true = found and closed; false = not found, NOT a throw)', () => {
    expectTypeOf<WebViewServiceType['closeWebView']>().toEqualTypeOf<
      (webViewId: WebViewId) => Promise<boolean>
    >();
    expectTypeOf<ReturnType<WebViewServiceType['closeWebView']>>().toEqualTypeOf<
      Promise<boolean>
    >();

    // Runtime anchor so this spec block participates in the RED test run (CAP-008 precedent);
    // pins the network object the host registers `closeWebView` on
    expect(NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE).toBe('WebViewService');
  });
});
