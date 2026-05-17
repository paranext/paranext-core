# Block F Cycle 1 — Full Test Suite Green-Bar Evidence

**Date**: 2026-05-16
**Iteration**: ITER-28
**Loop**: enhanced-resources stabilization

## Test Results

| Suite                                    | Count               | Pass | Fail     | Status  |
| ---------------------------------------- | ------------------- | ---- | -------- | ------- |
| Vitest (paranext-core root)              | 40 files, 475 tests | 475  | 0        | ✓ GREEN |
| Vitest (lib/eslint-plugin-paranext)      | 16 files, 182 tests | 182  | 0        | ✓ GREEN |
| TypeScript typecheck (root + workspaces) | all packages        | —    | 0 errors | ✓ CLEAN |
| ESLint (root + workspaces)               | all packages        | —    | 0 errors | ✓ CLEAN |
| dotnet test (c-sharp-tests)              | 713 tests, 1 dll    | 713  | 0        | ✓ GREEN |

**Total: 1370 tests pass. Zero regressions.**

## Verification commands

```bash
# Vitest (root + eslint-plugin-paranext via npm test)
cd /home/lyonsm/workspaces/enhanced-resources/paranext-core
npm test
# Test Files  40 passed (40); Tests  475 passed (475)
# Test Files  16 passed (16); Tests  182 passed (182)

# TypeScript
npm run typecheck
# clean across all packages (root, paratext-registration, platform-enhanced-resources,
#   platform-get-resources, platform-lexical-tools, platform-scripture,
#   platform-scripture-editor, quick-verse, browserslist-config-detect-electron,
#   eslint-plugin-paranext, papi-dts)

# ESLint
npm run lint
# clean (lint:scripts + lint:styles across all workspaces)

# .NET / NUnit
cd c-sharp-tests && dotnet test
# Passed!  -  Failed:     0, Passed:   713, Skipped:     0, Total:   713, Duration: 2 s
```

## Test additions during this stabilization run

| Source                                    | New tests | File                                                                  |
| ----------------------------------------- | --------- | --------------------------------------------------------------------- |
| FN-009 (size cap)                         | 2         | `c-sharp-tests/EnhancedResources/MediaServiceFetchImageBytesTests.cs` |
| FN-030 (URL-encode)                       | 12        | `src/shared/utils/enhanced-resource.utils.test.ts`                    |
| FN-030 (protocol handler)                 | 1         | `src/main/services/enhanced-resource-protocol.service.test.ts`        |
| FN-005 (SDV tree)                         | 6         | `extensions/.../semantic-domain-viewer.test.tsx`                      |
| D-008 (annotation log downgrade)          | 2         | `extensions/.../scripture-pane.test.tsx`                              |
| D-010 (RPC EPIPE)                         | 7         | `src/shared/data/rpc.model.test.ts`                                   |
| D-012 (setUsj on prop change)             | 4         | `extensions/.../scripture-pane.test.tsx`                              |
| D-013 (chunked-RAF + setUsj coordination) | 4         | `extensions/.../scripture-pane.test.tsx`                              |
| D-014 (stdio resilience)                  | 13        | `src/main/stdio-resilience.util.test.ts`                              |
| **Total new tests**                       | **51**    |                                                                       |

All 51 new tests are green. Existing tests unchanged (no regressions).

## Verdict

**PASS.** Exit criterion 5 (`tests_green`) satisfied. Ready for walkthrough cycle 1 (Block F part 2).
