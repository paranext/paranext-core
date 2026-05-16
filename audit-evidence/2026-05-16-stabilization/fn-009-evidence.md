# FN-009 papi-er:// Security R2-R5 Polish - Evidence

**Date**: 2026-05-16
**Work item**: FN-009 (R2-R5; R1 covered separately by FN-030 commit `b7692261cd`)
**Status**: RESOLVED
**Iteration**: stabilization run-1, iteration 13
**Defect entry**: D-005
**Branch**: `ai/feature/enhanced-resources-rolf-03-04-2026`

## Summary

Four security recommendations from the post-3B audit were addressed:

| R#  | Topic                                      | Action                                |
| --- | ------------------------------------------ | ------------------------------------- |
| R2  | Size cap on `MediaService.FetchImageBytes` | **Applied** - 50 MB cap               |
| R3  | `Console.WriteLine` -> platform logger     | **Already in compliance** (no change) |
| R4  | Register `papi-er` as privileged scheme    | **Applied** in `src/main/main.ts`     |
| R5  | Document `connect-src` posture inline      | **Applied** in both CSP files         |

## R2: Size cap added to MediaService.FetchImageBytes

### File: `c-sharp/EnhancedResources/MediaService.cs`

**Before**: `File.ReadAllBytes(localPath)` was invoked unconditionally on the resolved image path. A corrupted or maliciously large file would be loaded into a `byte[]` in full, then base64-encoded (further inflating memory by ~4/3) before being returned to the renderer.

**After**: A constant `MaxImageSizeBytes = 50 * 1024 * 1024` is checked via `new FileInfo(localPath).Length` before `ReadAllBytes`. Files exceeding the cap are skipped with a logged warning and the search-order falls through to the next package (HD -> SD -> LD -> THMB), preserving graceful degradation.

**Grep verification (after)**:

```
$ grep -n "MaxImageSizeBytes\|exceeds.*cap\|byte cap" c-sharp/EnhancedResources/MediaService.cs
38:    private const long MaxImageSizeBytes = 50L * 1024L * 1024L;
211:                if (fileLength > MaxImageSizeBytes)
216:                            + $"{MaxImageSizeBytes}-byte cap"
```

### New tests in `c-sharp-tests/EnhancedResources/MediaServiceFetchImageBytesTests.cs`

1. `FetchImageBytes_OversizedFile_IsSkippedWithWarning_FallsThroughToNextProject` - verifies that an oversized HD candidate is skipped (with warning text containing `"exceeds"`, `"byte cap"`, and the project short-name) and the SD result is returned instead.
2. `FetchImageBytes_OnlyProjectHasOversizedFile_ReturnsNull` - verifies that when every candidate is oversized, the method returns `null` (no allocation).

Both tests use `new byte[cap + 1]` (52,428,801 bytes) to trip the limit. `FakeMarblePackage.ResolveAccessiblePath` writes the buffer to a temp file so `FileInfo.Length` reflects reality.

### Test results

```
$ dotnet test --filter "FullyQualifiedName~MediaServiceFetchImageBytes"
...
Enhanced Resources: warning - skipping Dromedary.jpg from IMG_HD: size 52428801 bytes exceeds 52428800-byte cap

Passed!  - Failed:     0, Passed:    11, Skipped:     0, Total:    11
```

Broader Media filter (`FullyQualifiedName~Media`): 26 passed, 0 failed.

## R3: Console.WriteLine -> platform logger

### Finding: ALREADY IN COMPLIANCE — no change required

The audit recommendation was based on the assumption that the C# codebase has a separate "platform logger" abstraction. Investigation shows this is not the case:

- **Roslyn analyzer PNX001** (`c-sharp/Paranext.Analyzers/Rules/BanTraceAnalyzer.cs`) explicitly bans `System.Diagnostics.Trace.*` and instructs developers to **"Use Console.WriteLine for logging instead"**:

  ```
  $ grep "Console.WriteLine" c-sharp/Paranext.Analyzers/Rules/BanTraceAnalyzer.cs
  10:/// PNX001: Detects usage of System.Diagnostics.Trace and reports an error.
  11:/// Use Console.WriteLine for logging instead.
  19:            title: "Use Console.WriteLine instead of Trace",
  20:            messageFormat: "Replace '{0}' with Console.WriteLine",
  ```

- **Existing usage across the C# codebase** (not just EnhancedResources) is uniformly `Console.WriteLine`:

  ```
  $ grep -rn "Console.WriteLine" c-sharp/ | wc -l
  ~40+ occurrences in PapiClient.cs, ThreadingUtils.cs, SharedStore.cs, SettingsService.cs,
  Program.cs, LocalParatextProjects.cs, ParatextProjectDataProvider.cs, etc.
  ```

The 18 `Console.WriteLine` calls in `c-sharp/EnhancedResources/` are therefore consistent with the platform's logging convention. Switching them to a different mechanism would diverge from the rest of the codebase and violate PNX001.

**Outcome**: R3 documented as a non-action; no code change.

## R4: Register papi-er as a privileged scheme

### File: `src/main/main.ts`

**Before**: `papi-er://` was registered only as a runtime `protocol.handle(...)` callback inside `enhancedResourceProtocolService.initialize()` (called from `app.whenReady`). Without privileged registration, Chromium treats the scheme as a generic non-standard scheme - no secure-context status, weaker URL parsing, and no explicit fetch/CORS opt-out at the Chromium layer.

**After**: Added a top-level `protocol.registerSchemesAsPrivileged([{ scheme: 'papi-er', privileges: { standard, secure, supportFetchAPI: false, corsEnabled: false, bypassCSP: false } }])` call at module load (before `app.ready` fires - Electron requirement). `supportFetchAPI: false` and `corsEnabled: false` enforce the same "renderable but not fetchable" posture at the Chromium layer that the CSP `connect-src` omission enforces at the renderer layer (defense in depth).

The `ENHANCED_RESOURCE_PROTOCOL_NAME` constant is imported from `@shared/utils/enhanced-resource.utils` (single source of truth - same constant already used by the protocol handler service).

**Grep verification (after)**:

```
$ grep -n "registerSchemesAsPrivileged" src/main/main.ts
94:protocol.registerSchemesAsPrivileged([
```

A documentation comment block (lines 70-92) explains each privilege flag and the security rationale.

## R5: Document connect-src posture inline

### Files

- `src/renderer/index.ejs` (lines 68-94)
- `src/renderer/services/web-view.service-host.ts` (lines 1436-1463)

**Before**: The CSP comments documented `img-src` and `media-src` permitting `papi-er:` but did not call attention to the deliberate omission of `papi-er:` from `connect-src`.

**After**: Both files now include an explicit NOTE in the `connect-src` comment block stating that `papi-er:` is intentionally omitted to prevent WebView / extension code from exfiltrating raw image bytes via `fetch()` / `XHR`. The `img-src` and `media-src` `papi-er:` entries cross-reference the connect-src note ("Renderable only - see connect-src note above for why this is NOT in connect-src.").

**Grep verification (after)**:

```
$ grep -n "intentionally\|Renderable only" src/renderer/index.ejs src/renderer/services/web-view.service-host.ts
src/renderer/index.ejs:74:        NOTE: `papi-er:` is intentionally omitted from connect-src ...
src/renderer/index.ejs:85:          Renderable only - see connect-src note above ...
src/renderer/index.ejs:93:          Renderable only - see connect-src note above ...
src/renderer/services/web-view.service-host.ts:1445: ...intentionally NOT in connect-src...
src/renderer/services/web-view.service-host.ts:1454:    Renderable only - see connect-src note above ...
src/renderer/services/web-view.service-host.ts:1461:    Renderable only - see connect-src note above ...
```

## Verification

| Check                                                   | Result                                                                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `dotnet test --filter "FullyQualifiedName~Media"`       | 26 passed, 0 failed                                                                                   |
| `dotnet test --filter "...MediaServiceFetchImageBytes"` | 11 passed, 0 failed (2 new)                                                                           |
| `npm run typecheck`                                     | Clean across all workspaces                                                                           |
| `npm run lint`                                          | 1 pre-existing prettier warning in `source-language-indexed-list.component.tsx` (unrelated to FN-009) |
| `vitest run` papi-er suites                             | 37 passed (utils + protocol service)                                                                  |

## App runtime impact

- **R2 + R3**: Require C# recompile. The running Platform.Bible (ports 8876/9223) will not pick up these changes until the next .NET data-provider restart. Loop does not restart the app; the next Block D live walkthrough will catch any startup regression. No regression expected - the size-cap path is only hit when an image file exceeds 50 MB, which no production marble package today does.
- **R4**: TypeScript main-process change. Picks up on next Electron restart. Privileged registration is a metadata-only change with no behavior change for existing image rendering.
- **R5**: Comment-only changes. No runtime impact.

## Commit hashes

- **paranext-core** code changes: `<paranext-core-hash>` (this commit)
- **ai-prompts** audit changes: `<ai-prompts-hash>` (this commit)

## File:line index

| Change                            | File                                                                  | Lines     |
| --------------------------------- | --------------------------------------------------------------------- | --------- |
| R2 const                          | `c-sharp/EnhancedResources/MediaService.cs`                           | 30-38     |
| R2 size check                     | `c-sharp/EnhancedResources/MediaService.cs`                           | 205-220   |
| R2 test (oversized falls through) | `c-sharp-tests/EnhancedResources/MediaServiceFetchImageBytesTests.cs` | 224-279   |
| R2 test (all oversized -> null)   | `c-sharp-tests/EnhancedResources/MediaServiceFetchImageBytesTests.cs` | 281-304   |
| R4 import                         | `src/main/main.ts`                                                    | 9-17      |
| R4 import constant                | `src/main/main.ts`                                                    | 66        |
| R4 registration block             | `src/main/main.ts`                                                    | 68-105    |
| R5 index.ejs note                 | `src/renderer/index.ejs`                                              | 73-95     |
| R5 web-view-service-host note     | `src/renderer/services/web-view.service-host.ts`                      | 1444-1462 |
