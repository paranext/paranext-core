# Cached DBL Resources Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fetch DBL resources on extension startup, cache them via `papi.storage`, and expose a `platformGetResources.getCachedResources` command so panels can access the resource list without waiting for a live DBL fetch.

**Architecture:** All logic lives inline in `extensions/src/platform-get-resources/src/main.ts`. Module-level state (`executionToken`, `cachedResources`, `isFetching`) holds the cache. A startup retry loop (`startBackgroundFetch`) populates the cache, and a command (`getCachedResources`) returns the cache on demand with on-demand fetching as a fallback.

**Tech Stack:** TypeScript, PAPI (`papi.storage`, `papi.dataProviders`, `papi.commands`, `papi.notifications`), `DblResourceData` from `platform-bible-utils`

---

## File Map

| Action | File                                                                          |
| ------ | ----------------------------------------------------------------------------- |
| Modify | `extensions/src/platform-get-resources/contributions/localizedStrings.json`   |
| Modify | `extensions/src/platform-get-resources/src/types/platform-get-resources.d.ts` |
| Modify | `extensions/src/platform-get-resources/src/main.ts`                           |

No new files. No test infrastructure exists in this extension; correctness is verified via `npm run typecheck` and `npm run lint`.

---

### Task 1: Add Localization Strings

**Files:**

- Modify: `extensions/src/platform-get-resources/contributions/localizedStrings.json`

- [ ] **Step 1: Insert English keys at alphabetically correct positions**

In the `en` object, insert `%resources_fetch_failed%` **before** `%resources_filterBy%` (fe < fi):

```json
      "%resources_dialog_title%": "Get Resources",
      "%resources_fetch_failed%": "Opened Get Resources, but could not fetch the resource list",
      "%resources_filterBy%": "Filter by",
```

Insert `%resources_retry%` **after** `%resources_results%` and before `%resources_searchedFor%` ("results" < "retry" < "searchedFor"):

```json
      "%resources_results%": "results",
      "%resources_retry%": "Retry",
      "%resources_searchedFor%": "Searched for",
```

- [ ] **Step 2: Insert Spanish keys at the same relative positions in `es`**

In the `es` object, insert `%resources_fetch_failed%` **before** `%resources_filterBy%`:

```json
      "%resources_dialog_title%": "Obtener recursos",
      "%resources_fetch_failed%": "Se abrió Obtener recursos, pero no se pudo obtener la lista de recursos",
      "%resources_filterBy%": "Filtrar por",
```

Insert `%resources_retry%` **after** `%resources_results%` and before `%resources_searchedFor%`:

```json
      "%resources_results%": "resultados",
      "%resources_retry%": "Reintentar",
      "%resources_searchedFor%": "Buscado:",
```

- [ ] **Step 3: Verify JSON is valid and lint passes**

Run: `npm run lint -- extensions/src/platform-get-resources`

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add extensions/src/platform-get-resources/contributions/localizedStrings.json
git commit -m "feat: add resources_fetch_failed and resources_retry localization keys"
```

---

### Task 2: Add getCachedResources Type Declaration

**Files:**

- Modify: `extensions/src/platform-get-resources/src/types/platform-get-resources.d.ts`

- [ ] **Step 1: Add DblResourceData import inside the papi-shared-types module block**

Locate the `declare module 'papi-shared-types'` block. After the existing `import type { IDblResourcesProvider }` line, add:

```ts
declare module 'papi-shared-types' {
  import type { IDblResourcesProvider } from 'platform-get-resources';
  import type { DblResourceData } from 'platform-bible-utils';
```

- [ ] **Step 2: Add the getCachedResources entry to CommandHandlers**

Inside `CommandHandlers`, after the `'platformGetResources.isSendReceiveAvailable'` entry, add:

```ts
    /**
     * Returns the cached list of DBL resources, fetching on demand if the cache is empty.
     *
     * @returns Cached DBL resources, or `undefined` if unavailable (credentials not configured or
     *   fetch failed)
     */
    'platformGetResources.getCachedResources': () => Promise<DblResourceData[] | undefined>;
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`

Expected: No new errors.

- [ ] **Step 4: Commit**

```bash
git add extensions/src/platform-get-resources/src/types/platform-get-resources.d.ts
git commit -m "feat: declare getCachedResources in CommandHandlers"
```

---

### Task 3: Module-Level State, sleep Helper, and Storage Read in activate()

**Files:**

- Modify: `extensions/src/platform-get-resources/src/main.ts`

- [ ] **Step 1: Add DblResourceData to the platform-bible-utils import**

Change:

```ts
import { isString } from 'platform-bible-utils';
```

to:

```ts
import type { DblResourceData } from 'platform-bible-utils';
import { isString } from 'platform-bible-utils';
```

- [ ] **Step 2: Add ExecutionToken to the @papi/core import**

Change the `@papi/core` import to include `ExecutionToken`:

```ts
import {
  ExecutionActivationContext,
  ExecutionToken,
  IWebViewProvider,
  ManageExtensions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
```

- [ ] **Step 3: Add cache constant, module-level state, and sleep helper**

After the `HOME_WEB_VIEW_SIZE` constant and before the `let manageExtensions` line, add:

```ts
const RESOURCES_CACHE_KEY = 'cachedDblResources';

let executionToken: ExecutionToken;
let cachedResources: DblResourceData[] | undefined;
let isFetching = false;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

- [ ] **Step 4: Assign executionToken and read from storage at the top of activate()**

At the very beginning of the `activate()` function body, before the `// #region Validate settings` line, add:

```ts
executionToken = context.executionToken;

try {
  const cached = await papi.storage.readUserData(executionToken, RESOURCES_CACHE_KEY);
  if (typeof cached === 'string' && cached.length > 0)
    cachedResources = JSON.parse(cached) as DblResourceData[];
} catch {
  // No cached data from previous session
}
```

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add extensions/src/platform-get-resources/src/main.ts
git commit -m "feat: add module-level cache state and read cached resources on activate"
```

---

### Task 4: Add startBackgroundFetch()

**Files:**

- Modify: `extensions/src/platform-get-resources/src/main.ts`

- [ ] **Step 1: Add the startBackgroundFetch function**

After the `sleep` helper function and before `export async function activate`, add:

```ts
async function startBackgroundFetch(): Promise<void> {
  if (isFetching) return;
  isFetching = true;

  try {
    for (let attempt = 0; attempt < 10; attempt++) {
      if (attempt > 0) await sleep(1000); // eslint-disable-line no-await-in-loop

      try {
        const provider = await papi.dataProviders.get(
          // eslint-disable-line no-await-in-loop
          'platformGetResources.dblResourcesProvider',
        );
        if (!provider) continue;

        if (!(await provider.isGetDblResourcesAvailable())) return; // eslint-disable-line no-await-in-loop

        const resources = await provider.getDblResources(undefined); // eslint-disable-line no-await-in-loop
        cachedResources = resources;
        await papi.storage.writeUserData(
          // eslint-disable-line no-await-in-loop
          executionToken,
          RESOURCES_CACHE_KEY,
          JSON.stringify(cachedResources),
        );
        return;
      } catch (e) {
        logger.debug(`Background resource fetch attempt ${attempt + 1} failed: ${e}`);
      }
    }
  } finally {
    isFetching = false;
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add extensions/src/platform-get-resources/src/main.ts
git commit -m "feat: add startBackgroundFetch with 10-attempt retry loop"
```

---

### Task 5: Register getCachedResources Command

**Files:**

- Modify: `extensions/src/platform-get-resources/src/main.ts`

- [ ] **Step 1: Add the getCachedResources handler function**

After `startBackgroundFetch` and before `export async function activate`, add:

```ts
async function getCachedResources(): Promise<DblResourceData[] | undefined> {
  if (cachedResources !== undefined) return cachedResources;

  if (isFetching) {
    while (isFetching) await sleep(100); // eslint-disable-line no-await-in-loop
    return cachedResources;
  }

  isFetching = true;
  try {
    const provider = await papi.dataProviders.get('platformGetResources.dblResourcesProvider');
    if (!provider) return undefined;

    if (!(await provider.isGetDblResourcesAvailable())) return undefined;

    const resources = await provider.getDblResources(undefined);
    cachedResources = resources;
    await papi.storage.writeUserData(
      executionToken,
      RESOURCES_CACHE_KEY,
      JSON.stringify(cachedResources),
    );
    return cachedResources;
  } catch (e) {
    logger.warn(`getCachedResources on-demand fetch failed: ${e}`);
    return undefined;
  } finally {
    isFetching = false;
  }
}
```

- [ ] **Step 2: Register the command in activate()**

Inside `activate()`, alongside the other command registrations, add:

```ts
const getCachedResourcesCommandPromise = papi.commands.registerCommand(
  'platformGetResources.getCachedResources',
  getCachedResources,
);
```

- [ ] **Step 3: Add to context.registrations.add(...)**

Add `await getCachedResourcesCommandPromise` to the existing `context.registrations.add(...)` call:

```ts
context.registrations.add(
  await excludePdpFactoryIdsInHomeValidatorPromise,
  await getResourcesWebViewProviderPromise,
  await homeWebViewProviderPromise,
  await newTabWebViewProviderPromise,
  await openGetResourcesWebViewCommandPromise,
  await openHomeWebViewCommandPromise,
  await openNewTabWebViewCommandPromise,
  await isSendReceiveAvailableCommandPromise,
  await getCachedResourcesCommandPromise,
);
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add extensions/src/platform-get-resources/src/main.ts
git commit -m "feat: register getCachedResources command"
```

---

### Task 6: Update openGetResources + Fire-and-Forget Background Fetch

**Files:**

- Modify: `extensions/src/platform-get-resources/src/main.ts`

- [ ] **Step 1: Update the openGetResources command handler**

Replace the entire handler body of `openGetResourcesWebViewCommandPromise`:

```ts
const openGetResourcesWebViewCommandPromise = papi.commands.registerCommand(
  'platformGetResources.openGetResources',
  async () => {
    const webViewId = await papi.webViews.openWebView(
      GET_RESOURCES_WEB_VIEW_TYPE,
      {
        type: 'float',
        floatSize: GET_RESOURCES_WEB_VIEW_SIZE,
      },
      // Focus existing one if one exists
      { existingId: '?' },
    );

    const resources = await papi.commands.sendCommand('platformGetResources.getCachedResources');
    if (resources === undefined)
      await papi.notifications.send({
        message: '%resources_fetch_failed%',
        severity: 'Warning',
        clickCommandLabel: '%resources_retry%',
        clickCommand: 'platformGetResources.openGetResources',
        duration: 0,
      });

    return webViewId;
  },
);
```

> **Note:** Check the `PlatformNotification` type in `papi.d.ts` (search for `notifications.send`) to verify the exact field names (`severity`, `clickCommandLabel`, `clickCommand`, `duration`). Run `npm run typecheck` to catch mismatches.

- [ ] **Step 2: Fire-and-forget startBackgroundFetch at end of activate()**

After the `context.registrations.add(...)` call and before the final `logger.debug` line, add:

```ts
// eslint-disable-next-line @typescript-eslint/no-floating-promises
startBackgroundFetch();
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`

Expected: No errors.

- [ ] **Step 4: Lint**

Run: `npm run lint -- extensions/src/platform-get-resources`

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add extensions/src/platform-get-resources/src/main.ts
git commit -m "feat: update openGetResources to await cached resources and notify on failure"
```

---

## Verification

After all tasks are complete, test manually by:

1. Running `./.erb/scripts/refresh.sh` to start the app
2. Opening the Get Resources panel — resources should appear (from cache or fresh fetch)
3. Simulating a first launch (clear `cachedDblResources` user data) and reopening — the on-demand fetch path triggers
4. With no DBL credentials configured — verifying no crash and `getCachedResources` returns `undefined`
