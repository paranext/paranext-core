# FN-030 evidence: papi-er:// imageId URL-encode round-trip

**Work item:** FN-030 (papi-er:// image-id URL-encode round-trip)
**Iteration:** 12, Block C
**Verdict:** PASS (RESOLVED)
**Date:** 2026-05-16
**Defect:** D-004 (this run)

## Summary

Before this fix the renderer URL builder `buildPapiErImageUrl` correctly wrapped the imageId in `encodeURIComponent`, but the matching parser `parseEnhancedResourceUri` in `src/shared/utils/enhanced-resource.utils.ts` extracted the path component verbatim - no `decodeURIComponent`. For alphanumeric marble IDs (e.g. `ATL-0906_new_testament_world`, `Dromedary`) this is a no-op so today's test corpus does not exercise the gap. Real marble metadata however contains IDs with characters that `encodeURIComponent` escapes - `:`, `,`, spaces, `'`, `(`, `)`, `%`, non-ASCII - e.g. `Fauna:2.2b`, `304, Temple Mount`. When those IDs become wired up the C# `MediaService.FetchImageBytes` lookup compares `image.ImageId == "Fauna%3A2.2b"` (literal string equality) against `"Fauna:2.2b"` from `MediaData.Images` and returns null, surfacing as broken `<img>` placeholders in the renderer.

Fix is a 9-line surgical change in the TS parser: wrap the path segment in `decodeURIComponent` and re-throw `URIError` (raised on malformed escapes like a lone `%`) as the standard "Invalid papi-er URI" shape so the protocol handler maps it to a 400 response just like other parse failures. The C# side needs no change - the imageId reaches `FetchImageBytes` already decoded once the TS parser is fixed.

## Root cause (per FN-030 forward-note)

- **Producing site (encode)**: `extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx:1115`

  ```ts
  function buildPapiErImageUrl(imageId: string, size?: 'full'): string {
    const encoded = encodeURIComponent(imageId);
    const suffix = size === 'full' ? '?size=full' : '';
    return `papi-er://images/${encoded}${suffix}`;
  }
  ```

- **Consuming site (decode) BEFORE fix**: `src/shared/utils/enhanced-resource.utils.ts:59` extracted the raw substring:

  ```ts
  const imageId = questionMark >= 0 ? afterFirstSlash.substring(0, questionMark) : afterFirstSlash;
  ```

- **Downstream**: parsed `imageId` is forwarded as-is to `defaultFetchImageBytesInvoker` in `src/main/services/enhanced-resource-protocol.service.ts:66-70`, which sends a JSON-RPC request to `object:platform.enhancedResources.fetchImageBytes`. The C# `MediaService.FetchImageBytes` (`c-sharp/EnhancedResources/MediaService.cs:166`) compares the input ID to `MediaData.Images[i].ImageId` literally - no decoding step on the C# side, by design.

The encoder + decoder live in different processes (renderer for encode, main for parse - both share `src/shared`), so this gap is invisible to static type checking and to existing unit tests that hand-write `papi-er://images/Dromedary` (an ID that survives `encodeURIComponent` unchanged).

## Fix

### 1. `src/shared/utils/enhanced-resource.utils.ts` (parser - add decoder)

```ts
const encodedImageId =
  questionMark >= 0 ? afterFirstSlash.substring(0, questionMark) : afterFirstSlash;
const query = questionMark >= 0 ? afterFirstSlash.substring(questionMark + 1) : '';

if (!encodedImageId) throw new Error(`Invalid papi-er URI - empty imageId in "${uri}"`);

// FN-030: the renderer URL builder wraps imageId in encodeURIComponent before
// embedding it in the URL path. Real marble IDs contain `:`, spaces, parens,
// etc. (e.g. `Fauna:2.2b`, `304, Temple Mount`). Without this matching
// decodeURIComponent the C# MediaService.FetchImageBytes lookup compares
// image.ImageId == "Fauna%3A2.2b" and returns null. decodeURIComponent
// throws URIError on malformed escapes - re-throw as "Invalid papi-er URI"
// so the handler maps to 400 like any other parse failure.
let imageId: string;
try {
  imageId = decodeURIComponent(encodedImageId);
} catch {
  throw new Error(`Invalid papi-er URI - malformed percent-encoding in imageId "${uri}"`);
}
```

### 2. Tests added

**`src/shared/utils/enhanced-resource.utils.test.ts`** — new describe block "parseEnhancedResourceUri imageId URL-decoding (FN-030)" with 11 cases:

- Parameterized round-trip: `Fauna:2.2b`, `304, Temple Mount`, `Ark (top view)`, `100% Wool`, `a/b/c`, `name?with=query`, `O'Brien`, `héllo+wörld` (8 cases via `test.each`)
- `size=full` query combined with special-char ID
- Malformed percent-encoding (`bad%ZZpercent`) throws "Invalid papi-er URI - malformed percent-encoding"
- Back-compat: unencoded alphanumeric ID still works

**`src/main/services/enhanced-resource-protocol.service.test.ts`** — added end-to-end handler test `'decodes percent-encoded imageId before invoking the PAPI command (FN-030)'`: builds `papi-er://images/${encodeURIComponent('Fauna:2.2b')}?size=full`, asserts the PAPI command receives `imageId: 'Fauna:2.2b'`.

## Verification

```
$ npx vitest run src/main/services/enhanced-resource-protocol.service.test.ts \
                src/shared/utils/enhanced-resource.utils.test.ts
 ✓ src/main/services/enhanced-resource-protocol.service.test.ts (7 tests) 7ms
 ✓ src/shared/utils/enhanced-resource.utils.test.ts (30 tests) 6ms

 Test Files  2 passed (2)
      Tests  37 passed (37)
```

Full TypeScript suite:

```
$ npx vitest run
 Test Files  38 passed (38)
      Tests  455 passed (455)
   Duration  4.23s
```

Typecheck and lint on changed files: clean (no output).

## Live verification (Platform.Bible at head + fix)

This fix is a forward-looking guardrail. The current marble test corpus (`MediaService.FetchImageBytes`-eligible records) contains alphanumeric IDs that `encodeURIComponent` leaves unchanged, so the gap was invisible in live testing. Round-trip behavior with special-char IDs is fully covered by the unit tests above; live verification against an actual `Fauna:2.2b`-class ID will be exercised the next time real marble data is wired in. No app restart required for the TS-only change (renderer + main hot-reload picks it up via Webpack).

## Out of scope (handled elsewhere)

- C# `MediaService.FetchImageBytes` literal `ImageId` comparison - unchanged; correct as-is. The decoder gap is purely on the TS protocol parser path.
- FN-009 R2-R5 (size cap, logger swap, privileged-scheme registration, inline doc) - separate work item, not in FN-030 scope.

## Files touched

- `src/shared/utils/enhanced-resource.utils.ts` (+9 lines, decoder + URIError translation)
- `src/shared/utils/enhanced-resource.utils.test.ts` (+45 lines, 12 new test assertions)
- `src/main/services/enhanced-resource-protocol.service.test.ts` (+18 lines, 1 new test)
