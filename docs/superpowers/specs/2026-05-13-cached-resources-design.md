# Cached DBL Resources — Design Spec

**Date:** 2026-05-13  
**Feature:** `platformGetResources.getCachedResources` command  
**Extension:** `platform-get-resources`

---

## Goal

Fetch DBL resources on extension startup, cache them in extension user data, and expose a command so T5/T6/T7 panels can pass `allResources` to `ResourcePickerDialog` without waiting for a live DBL fetch.

---

## Architecture

All logic lives inline in `extensions/src/platform-get-resources/src/main.ts`. No new files.

### Module-level state

```ts
let executionToken: ExecutionToken;
let cachedResources: DblResourceData[] | undefined;
let isFetching = false;
```

- `executionToken` is assigned from `context.executionToken` at the top of `activate()` — required by `papi.storage.readUserData` / `writeUserData`
- `cachedResources` defaults to `undefined` — distinguishes "never fetched / fetch failed" from `[]` (fetched successfully, but the registry returned no entries, e.g. dev/QA server)
- `isFetching` prevents concurrent fetch attempts

### Storage key

```ts
const RESOURCES_CACHE_KEY = 'cachedDblResources';
```

Read and written via `papi.storage.readUserData(executionToken, RESOURCES_CACHE_KEY)` and `papi.storage.writeUserData(executionToken, RESOURCES_CACHE_KEY, json)`. Stored as a JSON-serialized `DblResourceData[]` string.

---

## Data flows

### On `activate()`

1. Assign `executionToken = context.executionToken`
2. Read from storage: `papi.storage.readUserData(executionToken, RESOURCES_CACHE_KEY)`
   - If a string is returned, JSON-parse it into `cachedResources`
   - If nothing is stored (throws or returns empty), `cachedResources` remains `undefined`
3. Fire-and-forget `startBackgroundFetch()` (not awaited — activation does not block)

### `startBackgroundFetch()` — startup retry loop

Called once from `activate()`. Guards with `isFetching` so it cannot run concurrently.

```
max attempts: 10
delay between attempts: 1 second
```

Per attempt:

1. `await papi.dataProviders.get('platformGetResources.dblResourcesProvider')`  
   → if provider not yet available, wait 1s and retry
2. `await provider.isGetDblResourcesAvailable()`  
   → if `false`: abort immediately (no credentials configured — no point retrying)
3. Fetch resources from provider
4. On success: update `cachedResources`, persist via `papi.storage.writeUserData`
5. On failure: wait 1s and retry

If all 10 attempts fail, `isFetching` is cleared and `cachedResources` remains whatever it was (either `undefined` or stale cached data from a previous session).

### `getCachedResources` command

Returns `DblResourceData[] | undefined`.

```
1. If cachedResources !== undefined  →  return cachedResources immediately
2. If isFetching                     →  poll (e.g. 100 ms intervals) until isFetching is false, then return cachedResources
3. Otherwise (undefined, not fetching):
   a. Set isFetching = true
   b. await provider.isGetDblResourcesAvailable() — abort if false
   c. Directly await provider fetch (single attempt, no retry)
   d. On success: update cachedResources, persist to storage, return cachedResources
   e. On failure: return undefined
   f. Always: set isFetching = false
```

This on-demand path exists for the rare case where the user opens `ResourcePickerDialog` before the startup loop has succeeded (e.g. first launch, slow network). It does not retry — if the user keeps trying via the notification retry button, they re-enter through `openGetResources` which calls this command again.

### `openGetResources` command (updated behavior)

```
1. Open the Get Resources web view (existing behavior)
2. Await papi.commands.sendCommand('platformGetResources.getCachedResources')
3. If result is undefined:
   - Send a warning notification:
     - message: '%resources_fetch_failed%'
     - severity: Warning
     - clickCommandLabel: '%resources_retry%'
     - clickCommand: 'platformGetResources.openGetResources'
     - duration: 0  (stays until the user dismisses or clicks Retry)
```

Clicking "Retry" auto-dismisses the notification (Sonner dismisses on action click) and re-invokes `openGetResources`, which re-opens (or focuses) the web view and tries fetching again. If the background startup loop succeeds before the user clicks Retry, the notification stays on screen until manually dismissed — this is acceptable.

---

## Files changed

| File                                    | Change                                                                                                                                 |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `src/main.ts`                           | Add module-level state; add `startBackgroundFetch()`; update `openGetResources` handler; add `getCachedResources` command registration |
| `src/types/platform-get-resources.d.ts` | Add `getCachedResources` to `CommandHandlers`                                                                                          |
| `contributions/localizedStrings.json`   | Add `%resources_fetch_failed%` and `%resources_retry%`                                                                                 |

---

## Type declaration addition

```ts
// in platform-get-resources.d.ts → CommandHandlers
'platformGetResources.getCachedResources': () => Promise<DblResourceData[] | undefined>;
```

---

## Localization keys

```json
"%resources_fetch_failed%": "Opened Get Resources, but could not fetch the resource list",
"%resources_retry%": "Retry"
```

---

## What is NOT in scope

- Exposing a data provider with reactive updates (callers poll via the command)
- Cache expiry / TTL (cached data persists indefinitely; refreshed on each successful startup fetch)
- Surfacing `isFetching` state to callers
- Any UI changes to the Get Resources web view itself
