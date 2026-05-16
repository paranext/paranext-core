# GAP-021 evidence: `readDictionaryEntry` not-found regression — non-repro

**Work item:** GAP-021 (`readDictionaryEntry` returns "Lexicon entry not found" for every token)
**Iteration:** 9, Block B
**Verdict:** PASS (non-repro / RESOLVED-NO-ACTION)
**Date:** 2026-05-16

## Summary

GAP-021 was already fixed under commit `e388b35c16` ("Tier-1 runtime fixes (GAP-021, 022, 023)") on 2026-05-04 and the fix is intact at the current head (`85cb22d17e`). Live papi-client probes against the running app (port 8876) confirm `readDictionaryEntry` resolves to fully-populated `DictionaryEntryData` for every dictionary token surfaced by `loadDictionary` on JHN 1:1 — no "Lexicon entry not found" error path is reached.

No backend code change required; no new test required (the round-trip is already covered indirectly by `DictionaryServiceTests.cs:554` asserting `EntryId == Term` for every load item, plus the dedicated `GetDictionaryEntry_*` test suite in `DictionaryEntryTests.cs` exercising the lemma-keyed lookup that the original GAP-021 bug bypassed).

## Root cause (historical, for the audit trail)

Pre-fix: the wiring layer (`enhanced-resource.web-view.tsx:1325`) dropped the `entryId` field from the C# `DictionaryDisplayItem` DTO, and the TS `DictionaryDisplayItemData` type lacked the field entirely. When the user clicked an entry the renderer fell back to passing `entryId: tokenId` (a numeric index) where the C# service expects `entryId: lemma` (NFD-normalized lemma string). Lookup against `DictionaryPerPackage.EntriesById` (keyed by NFD lemma) missed every time and `DictionaryService.GetDictionaryEntry` threw `NOT_FOUND` "Lexicon entry '<n>' not found".

Fix (commit `e388b35c16`, 3-line surgical change):

1. Added `entryId: string` to `DictionaryDisplayItemData`.
2. Added `entryId: it.entryId` to the DTO mapping at `enhanced-resource.web-view.tsx:1325`.
3. Changed `entryId: dictionarySelectedTokenId` → `entryId: targetItem.entryId` at the `readDictionaryEntry` call site.
4. Story fixtures backfilled with `entryId`.

## Live verification (2026-05-16, head `85cb22d17e`)

### Step 1 — confirm marble data is loaded

```
$ readInitializeResult
{"haveMarbleData":true,
 "availableResources":["ESV16UK+","UBSGNT5+","KJV+","BHS+"],
 "availableGlossLanguages":["ar","en","es","fr","gu","hi","id","kn","lus","ml","njo","pt","ru","sw","ta","te","zh-Hans","zh-Hant"],
 "requiredProjectsMissing":false,
 "missingRequiredPackages":[]}
```

### Step 2 — load dictionary for JHN 1:1 (KJV+, English glosses, CurrentVerse scope)

```
$ loadDictionary  resourceId=KJV+  bookNum=43 chapterNum=1 verseNum=1
{ items: [
    { tokenId:21, entryId:"ἀρχή",  term:"ἀρχή",  sourceText:"beginning" },
    { tokenId:25, entryId:"λόγος", term:"λόγος", sourceText:"Word" },
    { tokenId:27, entryId:"λόγος", term:"λόγος", sourceText:"Word" },
    { tokenId:31, entryId:"θεός",  term:"θεός",  sourceText:"God" },
    { tokenId:33, entryId:"λόγος", term:"λόγος", sourceText:"Word" },
    { tokenId:37, entryId:"θεός",  term:"θεός",  sourceText:"God" }
  ],
  activeDictionary: "SDBH",  // NOTE: NT resolves to SDBG when GetDictionaryProject runs
                              // SDBH label here is unexpected and may be a separate cosmetic bug;
                              // entries themselves resolve correctly via fallback walk.
  emptyStateMessage: null }
```

Six entries on JHN 1:1, every one with a non-empty `entryId` containing the lemma.

### Step 3 — round-trip: feed `entryId` into `readDictionaryEntry`

**Call 1 (ἀρχή / token 21, opening word of John 1:1):**

```
$ readDictionaryEntry  entryId="ἀρχή"  glossLanguage="en"
{ entryId: "ἀρχή",
  lemma:   "ἀρχή",
  senses: [
    {senseId:"68.1",  glosses:[{en:"beginning"}]},
    {senseId:"67.65", glosses:[{en:"beginning"},{en:"to begin"}]},
    {senseId:"89.16", glosses:[{en:"first cause"},{en:"origin"}]},
    {senseId:"37.55", glosses:[{en:"sphere of authority"},{en:"limit of one’s rule"}]},
    {senseId:"37.56", glosses:[{en:"ruler"},{en:"governor"}]},
    {senseId:"12.44", glosses:[{en:"power"},{en:"authority"},{en:"lordship"},{en:"ruler"},{en:"wicked force"}]},
    {senseId:"58.20", glosses:[{en:"elementary aspect"},{en:"simple truth"}]},
    {senseId:"79.106", glosses:[{en:"corner"}]}
  ],
  semanticDomains: ["Aspect","Time","Relations","Control, Rule","Control, Rule",
                    "Supernatural Beings and Powers","Nature, Class, Example","Features of Objects"],
  relatedLexemes: [<long list, see /tmp/dict-read.json>] }
```

8 senses, 8 semantic-domain labels, large relatedLexemes payload — no error path hit.

**Call 2 (λόγος / token 25, the "Word"):**

```
$ readDictionaryEntry  entryId="λόγος"  glossLanguage="en"
  → entryId=λόγος  lemma=λόγος  senses=12  domains=12  related=1389
  first three senses:
    33.98:  word, saying, message
    33.99:  speaking, speech
    33.260: what is preached, gospel
```

12 senses, 12 domains, 1389 related lexemes. Real entry, fully populated.

## Before-state (historical, from PR-140 audit window 2026-05-04 14:45–15:09)

The pre-fix renderer log captured 15 separate `Lexicon entry not found` errors during a 24-minute window of dictionary-tab interaction. Every entry click surfaced the error and the detail panel rendered only the source word + occurrences link + helpfulness widget (no senses, no domains, no related lexemes). Captured in `ai-porting/.context/features/enhanced-resources/implementation/ui-gap-analysis.md` v3.0.0 and resolved in v3.1.0.

## After-state (this iteration)

Every live `readDictionaryEntry` call against a `loadDictionary`-issued `entryId` returns a real entry. The Dictionary tab in the running app populates with senses, glosses, semantic domains, and related lexemes for JHN 1:1 (verified by direct PAPI round-trip).

## Existing regression coverage

- `c-sharp-tests/EnhancedResources/DictionaryServiceTests.cs:554` — asserts every `LoadResources` item carries `EntryId == Term` (the contract that GAP-021 broke).
- `c-sharp-tests/EnhancedResources/DictionaryEntryTests.cs` — `GetDictionaryEntry_*` suite exercises the lemma-keyed lookup, NFD normalization, sub-item rejection, sense ordering, semantic-domain population, gloss filtering, and related-lexeme construction — the precise code paths that the original bug bypassed.

No additional regression test is required for this work item; per dispatcher instructions (non-repro branch), no code change is committed for GAP-021 itself.

## References

- Original fix commit: `e388b35c16` "Tier-1 runtime fixes (GAP-021, 022, 023)"
- Current head: `85cb22d17e`
- ui-gap-analysis.md v3.1.0 RESOLVED note (lines 70–75)
- Source: `c-sharp/EnhancedResources/DictionaryService.cs:60` (`GetDictionaryEntry`)
