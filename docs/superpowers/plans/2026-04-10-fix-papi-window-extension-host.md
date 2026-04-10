# Fix `papi.window` Extension Host Regression Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore `papi.window` access from the extension host while preserving per-window scoped registration for renderer windows.

**Architecture:** When `globalThis.windowId` is set (renderer), look up the scoped provider as today. When it is NOT set (extension host), use `sendCommand('platform.getFocusedWindowId')` to get the focused window's ID, then look up that window's scoped provider. The provider is resolved lazily on first use and cached. This matches the pre-PR behavior (extension host could use `papi.window`) while working with the new per-window registration model.

**Tech Stack:** TypeScript, Platform.Bible PAPI (network service, command service, data provider service)

**Key insight from investigation:** `createSyncProxyForAsyncObject` calls its `getObject` resolver on every method invocation, but `initialize()` caches the promise so the actual resolution only happens once. `sendCommand` has no initialization dependency — it just calls `networkService.request`, which works as soon as the network is up. The extension host starts after the first window is created and `platform.getFocusedWindowId` is registered, so no startup ordering issue.

---

### Task 1: Modify `window.service.ts` to support extension host

**Files:**

- Modify: `src/shared/services/window.service.ts`

- [ ] **Step 1: Replace the early rejection with focused-window fallback**

Replace the entire `initialize()` function. When `windowId` is absent, use `sendCommand('platform.getFocusedWindowId')` to dynamically resolve the focused window, then look up its scoped provider.

```typescript
import { dataProviderService } from '@shared/services/data-provider.service';
import { sendCommand } from '@shared/services/command.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
} from '@shared/services/window.service-model';

let dataProvider: IWindowService;
let initializationPromise: Promise<void>;

/**
 * Resolve the scoped window service provider name. In the renderer, uses the local windowId. In the
 * extension host, queries the focused window ID via command.
 */
async function resolveProviderName(): Promise<string> {
  if (globalThis.windowId) {
    return `${windowServiceProviderName}-${globalThis.windowId}`;
  }
  // Extension host: resolve the focused window's scoped provider
  const focusedWindowId = await sendCommand('platform.getFocusedWindowId');
  if (focusedWindowId === undefined) {
    throw new Error('Window service is not available: no focused window found. Is a window open?');
  }
  return `${windowServiceProviderName}-${focusedWindowId}`;
}

async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      const scopedName = await resolveProviderName();
      const provider = await dataProviderService.get(
        // dataProviderService.get expects the literal provider name type, but the scoped
        // name is built dynamically at runtime
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        scopedName as typeof windowServiceProviderName,
      );
      if (!provider) throw new Error('Window service undefined');
      dataProvider = provider;
    })();
  }
  return initializationPromise;
}

// Dynamic proxy target so dataProviderName returns the scoped name at access time (not at module
// load time, when windowId may not yet be set)
const windowServiceProxyTarget = {
  ...windowServiceObjectToProxy,
  get dataProviderName(): typeof windowServiceProviderName {
    // Provider name is dynamically scoped per window but the type system expects the literal type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (
      globalThis.windowId
        ? `${windowServiceProviderName}-${globalThis.windowId}`
        : windowServiceProviderName
    ) as typeof windowServiceProviderName;
  },
};

export const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  return dataProvider;
}, windowServiceProxyTarget);
```

Note: This also fixes the promise-constructor anti-pattern (review item #4 from the interview) by replacing `new Promise((resolve, reject) => { executor(); })` with a direct async IIFE.

- [ ] **Step 2: Verify lint passes**

Run: `npx eslint --ext .ts src/shared/services/window.service.ts`
Expected: No errors (warnings about `import/no-named-as-default` are pre-existing and acceptable)

- [ ] **Step 3: Verify typecheck passes**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Run tests**

Run: `npm test 2>&1 | tail -20`
Expected: All tests pass

- [ ] **Step 5: Stage and commit**

```bash
git add src/shared/services/window.service.ts
git commit -m "fix: restore papi.window access from extension host

When windowId is not set (extension host), resolve the focused window's
scoped provider via platform.getFocusedWindowId command instead of
immediately rejecting. The provider is resolved once on first use and
cached.

Also fixes the promise-constructor anti-pattern by using a direct async
IIFE instead of new Promise with an async executor.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Limitation and future improvement

The extension host resolves the focused window's provider once and caches it. If the user changes focus to a different window after the first `papi.window` call from the extension host, subsequent calls still go to the original window's provider.

This is acceptable because:

1. Extension host `papi.window` usage is rare and typically one-shot (e.g., `setFocus('nextTab')`)
2. The pre-PR behavior had no per-window concept at all, so any window is an improvement
3. A proper fix (re-resolving on every call) would require replacing `createSyncProxyForAsyncObject` with a custom proxy — that's a larger refactor best done as a follow-up

If this becomes a real problem, the fix is: remove the `initializationPromise` caching for the extension host path, or create a custom proxy that resolves the provider per-call when `windowId` is absent.
