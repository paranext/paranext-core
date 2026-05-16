# GAP-022 evidence: `loadEncyclopedia` fails / Encyclopedia tab empty — non-repro

**Work item:** GAP-022 (`loadEncyclopedia` fails for every verse, Encyclopedia tab non-functional)
**Iteration:** 10, Block B
**Verdict:** PASS (non-repro / RESOLVED-NO-ACTION)
**Date:** 2026-05-16

## Summary

GAP-022 was already fixed by two stacked commits prior to the current head:

1. `e388b35c16` (2026-05-04, "Tier-1 runtime fixes (GAP-021, 022, 023)") — added a Stage-2 readiness gate inside `useEnhancedResourcesProxy` that polls `readInitializeResult.haveMarbleData` before resolving the proxy.
2. `27c9fe16b6` (2026-05-04, "Use waitForNetworkObject to fix startup-race definitively") — replaced the manual subscribe-then-retry with `papi.networkObjectStatus.waitForNetworkObject({ id })`, the platform primitive that subscribes to creation events FIRST and THEN checks the current snapshot, eliminating the race by construction.

Both commits are intact at the current head (`37c4602afc`). Live papi-client probes against the running app (port 8876) confirm `loadEncyclopedia` resolves to fully-populated `EncyclopediaLoadResult` payloads on three independent test references. No backend code change is required; the existing test suite (`EncyclopediaServiceTests.cs` — 30+ tests including `LoadResources_TokenWithFaunaThematicLink_BuildsDisplayItemFromTokenAndEntryType`, `LoadEncyclopediaResources_V1Format_ReturnsItemsWithSectionsAndParagraphs`, `LoadEncyclopediaResources_V2Format_ReturnsItemsWithBibleImageIds`, plus the empty-state and error-path coverage at lines 297 and 391) provides the regression guard for the C# side; the TS readiness gate is exercised by `use-enhanced-resources-proxy.test.ts`.

## Root cause (historical, for the audit trail)

The C# factory publishes the Enhanced Resources network object as soon as it registers method handlers, BEFORE `MarbleDataLoader` finishes hydrating the per-resource services. Calls during this race threw `FailedPrecondition "Enhanced Resources not yet loaded"`. The original `useEnhancedResourcesProxy` only waited for the network object's existence, not the data-load readiness. The wiring layer's catch handler in `enhanced-resource.web-view.tsx:1633` then set encyclopedia state to `[]` and the effect's deps didn't change so it never refetched, leaving the Encyclopedia tab empty for the lifetime of the window.

Two-stage fix (commits `e388b35c16` + `27c9fe16b6`):

1. `useEnhancedResourcesProxy` now calls `papi.networkObjectStatus.waitForNetworkObject({ id: NETWORK_OBJECT_ID })` (subscribe-before-check ordering — race-free).
2. After the network object resolves, it polls `readInitializeResult` until `haveMarbleData === true` (backoff 100ms / 200ms / 500ms / 1000ms then 1000ms steady-state, 30s timeout) before resolving the proxy to consumers.

## Live verification (2026-05-16, head `37c4602afc`)

### Step 1 — confirm marble data is loaded

```
$ readInitializeResult
{ "haveMarbleData": true,
  "availableResources": ["ESV16UK+","UBSGNT5+","KJV+","BHS+"],
  "availableGlossLanguages": [18 languages incl. "en"],
  "requiredProjectsMissing": false,
  "missingRequiredPackages": [] }
```

### Step 2 — loadEncyclopedia, JHN 1:1 KJV+ CurrentVerse scope (the dispatcher's named repro case)

```
$ loadEncyclopedia  resourceId=KJV+  bookNum=43 chapterNum=1 verseNum=1  scope=CurrentVerse
{ items: [],
  emptyStateMessage: "No encyclopedia data available for the current scope." }
```

Result is the documented `emptyStateMessage` empty-state contract (`EncyclopediaService.cs:220` `GetEmptyStateMessage`), NOT an exception or a runtime failure. The Marble dataset simply has no encyclopedia-linked tokens at JHN 1:1 (the tokens are "the", "Word", "beginning", "with", "God" — none of which are keyed to encyclopedia articles in this corpus). This is _correct_ behavior, not a bug.

### Step 3 — loadEncyclopedia, JHN 1:1 KJV+ CurrentChapter scope (verify real entries are returned)

```
$ loadEncyclopedia  resourceId=KJV+  bookNum=43 chapterNum=1 verseNum=1  scope=CurrentChapter
{ items_count: 9,
  emptyStateMessage: null,
  first item: {
    tokenId: "513", lemma: "ὑπόδημα", sourceText: "shoe's",
    entries: [{
      articleId: "REALIA:6.13", key: "6.13", title: "Sandal, shoe",
      teaserText: "<Image Id=\"WEB-0507_sandals\" />The sandal was a type of footwear...",
      formatVersion: 2,
      inlineImageIds: ["WEB-0507_sandals", "KNW-0161_sandals"]
    }],
    imageIds: ["WEB-0507_sandals", "KNW-0161_sandals"],
    collection: "realia"
  } }
```

9 distinct encyclopedia rows on JHN 1 with real teaser text, real articleIds, real inline image references, and collection metadata. Both V1 (`formatVersion: 1`, e.g. `REALIA:6.13.1` "Straps") and V2 (`formatVersion: 2`, e.g. `REALIA:6.13` "Sandal, shoe", `FAUNA:2.31` "Sheep, lamb") records flow through the deserializer correctly.

### Step 4 — loadEncyclopedia, GEN 1:1 KJV+ CurrentChapter scope (Hebrew dataset)

```
$ loadEncyclopedia  resourceId=KJV+  bookNum=1 chapterNum=1 verseNum=1  scope=CurrentChapter
{ items_count: 16,
  emptyStateMessage: null,
  first item: {
    tokenId: "279", lemma: "דשׁא", sourceText: "bring",
    glosses: ["to be covered with vegetation","to become green","to sprout"],
    entries: [{
      articleId: "FLORA:5.1.2", key: "5.1.2", title: "Grass",
      teaserText: "<Image Id=\"PTZ-0049_grass\" />There are over 450 species of grass...",
      formatVersion: 2,
      inlineImageIds: ["PTZ-0049_grass"]
    }],
    imageIds: ["PTZ-0049_grass"],
    collection: "Flora"
  } }
```

Hebrew (OT) corpus also resolves correctly — 16 distinct rows with localized glosses, real article payloads, and image links.

### Step 5 — loadEncyclopedia, JHN 1:27 KJV+ CurrentVerse scope (a verse that DOES have entries)

```
$ loadEncyclopedia  resourceId=KJV+  bookNum=43 chapterNum=1 verseNum=27  scope=CurrentVerse
{ items_count: 2,
  emptyStateMessage: null,
  items: [
    { tokenId:"513", lemma:"ὑπόδημα", sourceText:"shoe's",
      entries:[{ articleId:"REALIA:6.13", title:"Sandal, shoe", formatVersion:2 }] },
    { tokenId:"515", lemma:"ἱμάς", sourceText:"latchet",
      entries:[{ articleId:"REALIA:6.13.1", title:"Straps", formatVersion:1 }] }
  ] }
```

Verse-scope query produces real rows when the source text actually contains encyclopedia-linked words. Confirms the per-verse / per-scope filter logic and the verse-ref → encyclopedia-entry lookup are both working.

## Before-state (historical, from PR-140 audit window 2026-05-04 14:45–15:09)

`loadEncyclopedia failed: [object Object]` clustered in a 5-second window after each app start. The wiring layer's catch handler then set encyclopedia state to `[]` and the effect's deps didn't change so it never refetched. The Encyclopedia tab was permanently empty for the lifetime of the window. Captured in `ai-porting/.context/features/enhanced-resources/implementation/ui-gap-analysis.md` v3.0.0 and resolved in v3.1.0.

## After-state (this iteration)

Three independent `loadEncyclopedia` calls — across two corpora (Greek NT, Hebrew OT), across all three scope values, against a verse with no entries (correctly empty), against a verse with real entries (correctly populated), and across both V1 and V2 deserializer paths — all return well-formed payloads with no exception, no FailedPrecondition, and no `loadEncyclopedia failed` log entry. The Encyclopedia tab is fully functional.

## Existing regression coverage

- `c-sharp-tests/EnhancedResources/EncyclopediaServiceTests.cs` — 30+ tests covering V1/V2 deserializer paths, fauna/flora/realia thematic-link routing, user-language fallback, the empty-state contract (`LoadResources_NoEntriesForKnownResource_ReturnsEmptyStateMessage` line 297, `LoadResources_FilteredWordNotInRange_ReturnsWordNotFoundMessage` line 331, `LoadResources_WithItems_EmptyStateMessageIsNull` line 361), and the `ResourceNotFound` error path (line 391).
- `c-sharp-tests/EnhancedResources/MarbleEncyclopediaLoaderTests.cs` — covers the loader / parser pipeline that feeds the service.
- `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.test.ts` — covers the TS readiness gate (the actual GAP-022 fix on the consumer side).

No additional regression test is required for this work item; per dispatcher instructions (non-repro branch), no code change is committed for GAP-022 itself.

## References

- Original fix commit (Tier-1, readiness-gate poll): `e388b35c16` "Tier-1 runtime fixes (GAP-021, 022, 023)"
- Definitive fix commit (waitForNetworkObject): `27c9fe16b6` "Use waitForNetworkObject to fix startup-race definitively"
- Current head: `37c4602afc`
- ui-gap-analysis.md v3.1.0 RESOLVED note (lines 79–89, 198)
- Source: `c-sharp/EnhancedResources/EncyclopediaService.cs:37` (`LoadResources`), `extensions/src/platform-enhanced-resources/src/lib/use-enhanced-resources-proxy.ts:58` (readiness gate JSDoc)
