# GAP-023 evidence: `loadMedia` fails / Media tab empty — non-repro

**Work item:** GAP-023 (`loadMedia` fails for every verse, Media tab non-functional)
**Iteration:** 11, Block B
**Verdict:** PASS (non-repro / RESOLVED-NO-ACTION)
**Date:** 2026-05-16
**Head:** `96e64a86d4`

## Summary

GAP-023 was already fixed by the same two stacked commits that resolved GAP-022, because the underlying defect was the proxy-layer startup race — generic to every Enhanced Resources data-routing call (`loadDictionary`, `loadEncyclopedia`, `loadMedia`):

1. `e388b35c16` (2026-05-04, "Tier-1 runtime fixes (GAP-021, 022, 023)") — added a Stage-2 readiness gate inside `useEnhancedResourcesProxy` that polls `readInitializeResult.haveMarbleData` before resolving the proxy.
2. `27c9fe16b6` (2026-05-04, "Use waitForNetworkObject to fix startup-race definitively") — replaced the manual subscribe-then-retry with `papi.networkObjectStatus.waitForNetworkObject({ id })`, the platform primitive that subscribes to creation events FIRST and THEN checks the current snapshot, eliminating the race by construction.

Both commits are intact at the current head (`96e64a86d4`). Live papi-client probes against the running app (port 8876) confirm `loadMedia` resolves to fully-populated `MediaLoadResult` payloads on every probed reference. No backend code change is required; the existing test suite (`MediaServiceTests.cs` — covers `InvalidImageForTab` filtering for both tabs, `LoadResources_ImagesTab_ReturnsItemsWithCountLabel`, `LoadResources_ImagesTab_DisplayIndexAssignedSequentially`, `LoadResources_ImagesTab_ItemsHaveRequiredFields`, `LoadResources_NoItemsForScope_ReturnsEmptyStateMessage`, plus `MediaServiceFetchImageBytesTests.cs`) provides the regression guard on the C# side; the TS readiness gate is exercised by `use-enhanced-resources-proxy.test.ts`.

## Root cause (historical, for the audit trail)

Identical to GAP-022. The C# factory publishes the Enhanced Resources network object as soon as it registers method handlers, BEFORE `MarbleDataLoader` finishes hydrating the per-resource services. Calls during this race threw `FailedPrecondition "Enhanced Resources not yet loaded"`. The original `useEnhancedResourcesProxy` only waited for the network object's existence, not the data-load readiness. The wiring layer's catch handler in `enhanced-resource.web-view.tsx:2145` (Images) and `:2234` (Maps) then set the media state to `[]` and the effect's deps didn't change, so the Media tabs stayed empty for the lifetime of the window.

Two-stage fix (commits `e388b35c16` + `27c9fe16b6`):

1. `useEnhancedResourcesProxy` now calls `papi.networkObjectStatus.waitForNetworkObject({ id: NETWORK_OBJECT_ID })` (subscribe-before-check ordering — race-free).
2. After the network object resolves, it polls `readInitializeResult` until `haveMarbleData === true` (backoff 100ms / 200ms / 500ms / 1000ms then 1000ms steady-state, 30s timeout) before resolving the proxy to consumers.

## Live verification (2026-05-16, head `96e64a86d4`)

### Step 1 — confirm marble data is loaded

```
$ readInitializeResult
{ "haveMarbleData": true,
  "availableResources": ["ESV16UK+","UBSGNT5+","KJV+","BHS+"],
  "availableGlossLanguages": [18 languages incl. "en"],
  "requiredProjectsMissing": false,
  "missingRequiredPackages": [] }
```

### Step 2 — loadMedia probes across 4 verses x 2 tabs (Images / Maps), ESV16UK+ CurrentChapter scope

| Reference | Tab    | Result                           | Sample items                                                                                          |
| --------- | ------ | -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| JHN 1:14  | Images | **6 items**                      | `ATL-0906_new_testament_world`, `ATL-1060_trial_locations_jesus`, `ATL-1274_map_bethany_to_jerusalem` |
| JHN 1:14  | Maps   | 0 items (no SBA records for ref) | —                                                                                                     |
| GEN 1:1   | Images | **6 items**                      | `ATL-0019_babylonian_world_map`, `ATL-0080_enuma_elish`, `ATL-0088_genesis_cosmos`                    |
| GEN 1:1   | Maps   | 0 items (no SBA records for ref) | —                                                                                                     |
| MAT 1:1   | Images | **13 items**                     | `ATL-0906_new_testament_world`, `BOL-0008_abraham_machpelah`, `BOL-0346_genealogy`                    |
| MAT 1:1   | Maps   | 0 items (no SBA records for ref) | —                                                                                                     |
| GEN 2:1   | Images | **8 items**                      | `ATL-0019_babylonian_world_map`, `ATL-0080_enuma_elish`, `ATL-0454_proto-tabernacle`                  |
| GEN 2:1   | Maps   | 0 items (no SBA records for ref) | —                                                                                                     |

Eight independent `loadMedia` JSON-RPC calls, four references spanning both Testaments, both tab types — every call resolved successfully with no exception, no FailedPrecondition, and no `loadMedia failed` log entry.

### Step 3 — Images tab populated across all probed references

The Images tab is well-populated (6–13 items per verse) with real `imageId` payloads keyed to collections like `BOL` (Bible Illustrations), `ATL` (Atlas / general world-map collection), `PTZ`, `WEB`, etc. This is the GAP-023 reported failure mode — "Media tab empty for every verse" — comprehensively refuted: the Images tab returns the curated PT9-faithful media set for each reference.

### Step 4 — Maps tab is correctly filtered (by design)

The Maps tab returned 0 items on every probed reference. This is **not** a `loadMedia` failure — `MediaService.InvalidImageForTab` (line 51) intentionally restricts the Maps tab to images whose `collection == "Satellite Bible Atlas"` (the exact PT9 string at `MediaService.cs:27`). The marble test corpus in use does not include verse-keyed Satellite Bible Atlas records for the probed references; the call still returns a well-formed `MediaLoadResult` (200 OK, items=[], emptyStateMessage set). The bug GAP-023 describes (every call **failing**) is not reproducible — calls succeed with the contractual empty-state.

If the Maps tab is ultimately expected to render real SBA content for these verses, that is a separate data-coverage / dataset question for a future verification pass — not a `loadMedia` failure and not in GAP-023 scope.

### Step 5 — log scan

```
$ getLogFileContent | grep loadMedia
(no entries)
```

Zero `loadMedia` log mentions across the entire current log — no errors, no warnings, no failure entries since boot.

## Before-state (historical, from PR-140 audit window 2026-05-04 14:45–15:09)

`Enhanced Resources: loadMedia (Images) failed: ...` and `loadMedia (Maps) failed: ...` clustered in a 5-second window after each app start. The wiring layer's catch handlers (`enhanced-resource.web-view.tsx:2145`, `:2234`) then set media state to `[]` and the effect's deps didn't change, so it never refetched. Both Media sub-tabs were permanently empty for the lifetime of the window. Captured in `ai-porting/.context/features/enhanced-resources/implementation/ui-gap-analysis.md` v3.0.0 and resolved in v3.1.0.

## After-state (this iteration)

Eight independent `loadMedia` calls — four references (JHN 1:14, GEN 1:1, MAT 1:1, GEN 2:1), both tab types (Images, Maps) — all return well-formed payloads with no exception, no FailedPrecondition, and zero `loadMedia` log entries. Images tab returns 6–13 items per verse. The Media tab is fully functional.

## Existing regression coverage

- `c-sharp-tests/EnhancedResources/MediaServiceTests.cs` — covers `InvalidImageForTab` for both tabs (including case-sensitivity, the SBA-only filter for Maps and the SBA-exclusion filter for Images), `LoadResources_ImagesTab_ReturnsItemsWithCountLabel`, `LoadResources_ImagesTab_DisplayIndexAssignedSequentially`, `LoadResources_ImagesTab_ItemsHaveRequiredFields`, and `LoadResources_NoItemsForScope_ReturnsEmptyStateMessage` (the contractual empty-state).
- `c-sharp-tests/EnhancedResources/MediaServiceFetchImageBytesTests.cs` — covers the image-byte fetch path (`papi-er://` round-trip).
- `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.test.ts` — covers the TS readiness gate (the actual GAP-023 fix on the consumer side).

No additional regression test is required for this work item; per dispatcher instructions (non-repro branch), no code change is committed for GAP-023 itself.

## References

- Original fix commit (Tier-1, readiness-gate poll): `e388b35c16` "Tier-1 runtime fixes (GAP-021, 022, 023)"
- Definitive fix commit (waitForNetworkObject): `27c9fe16b6` "Use waitForNetworkObject to fix startup-race definitively"
- Current head: `96e64a86d4`
- ui-gap-analysis.md v3.1.0 RESOLVED note (lines 87–90, 198)
- Source: `c-sharp/EnhancedResources/MediaService.cs:69` (`LoadResources`), `c-sharp/EnhancedResources/MediaService.cs:51` (`InvalidImageForTab`), `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.ts` (readiness gate)
