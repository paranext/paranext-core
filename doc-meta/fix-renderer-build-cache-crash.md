# Fix: Renderer Build V8 Bytecode Cache Crash

## Incident

| Field | Value |
| --- | --- |
| First observed | 2026-04-11 |
| Workflow | [Test #5730](https://github.com/paranext/paranext-core/actions/runs/24285521198/job/70914135269) |
| Triggering commit | [`a9b19c5`](https://github.com/paranext/paranext-core/commit/a9b19c5eea59f0a06cd011f2454d9df739f535c4) — `refactor: rename ExampleBlock variants prefer/avoid/neutral` |
| Branch | `pt-example-block-rename` |
| Platform | Linux (ubuntu-22.04) |
| Reproducible | **No** — re-running the same workflow passed cleanly |
| Frequency | Effectively one-time — see Frequency Analysis section |

## Symptom

`npm run build` fails during the concurrent `build:renderer` step with an immediate V8
fatal error — before any webpack compilation output:

```
[build:renderer] # Fatal error in , line 0
[build:renderer] # unreachable code
[build:renderer] #
[build:renderer] #FailureMessage Object: 0x7fff4d703790
[build:renderer] ----- Native stack trace -----
[build:renderer]  1: 0x10267a1  [webpack]
[build:renderer]  2: 0x29e9bcb V8_Fatal(char const*, ...) [webpack]
[build:renderer]  3: 0x18ad77c int v8::internal::Deserializer<v8::internal::Isolate>::ReadSingleBytecodeData<...>
[build:renderer]  ...
[build:renderer] 33: 0x18b4292 v8::internal::ObjectDeserializer::Deserialize() [webpack]
[build:renderer] 34: 0x18b4474 v8::internal::ObjectDeserializer::DeserializeSharedFunctionInfo(...)
[build:renderer] 35: 0x18a64a2 v8::internal::CodeSerializer::Deserialize(...)
[build:renderer] 36: 0x12cc530 v8::internal::Compiler::GetSharedFunctionInfoForScriptWithCachedData(...)
[build:renderer] 37: 0x121e627 v8::ScriptCompiler::CompileUnboundInternal(...)
[build:renderer] 38: 0xf85313 node::contextify::ContextifyScript::New(...)
```

Because `concurrently --kill-others-on-fail` is set, all other build targets
(`build:main`, `build:extension-host`, `build:types`, `build:extensions`,
`build:data-release`) are killed immediately after.

## Root Cause Analysis

### What the stack trace shows

This is **not a memory error**. The crash is deep in V8's bytecode deserializer:

- Frame 33–35: `ObjectDeserializer::Deserialize` → `CodeSerializer::Deserialize`
- Frame 36: `Compiler::GetSharedFunctionInfoForScriptWithCachedData`
- Frame 38: `ContextifyScript::New`

V8 is trying to load a pre-compiled script from a **V8 code cache** (bytecode snapshot).
The "unreachable code" fatal fires when the deserializer's switch statement encounters a
bytecode opcode it does not recognize — the canonical symptom of a **bytecode format
incompatibility** between the Node.js version that wrote the cache and the one reading it.

The crash is instant (before webpack emits any compilation progress), which confirms the
failure is in webpack's own startup/initialization phase, not during source compilation.

### Why the webpack filesystem cache is the likely culprit

`.erb/configs/webpack.config.renderer.prod.ts` (lines 38–47) enables webpack's persistent
filesystem cache with no Node.js version pinning:

```ts
cache: {
  type: 'filesystem',
  cacheDirectory: path.join(webpackPaths.rootPath, 'node_modules', '.cache', 'webpack-renderer'),
  buildDependencies: {
    config: [__filename],
    tsconfig: [path.resolve(webpackPaths.rootPath, 'tsconfig.json')],
  },
  compression: 'gzip',
  maxMemoryGenerations: 5,
},
```

This cache stores V8 bytecode snapshots of compiled modules. The `postinstall` script
(package.json line 80) runs webpack during `npm ci`:

```sh
npm run build:dll && cross-env NODE_ENV=development TS_NODE_TRANSPILE_ONLY=true webpack ...
```

If any V8 version delta exists between the Node.js that seeded the cache (postinstall) and
the one reading it (build:renderer) — which can happen due to Volta + `actions/setup-node`
both being configured in the CI workflow — the deserializer hits an unknown opcode and
crashes fatally.

### Why it's intermittent

- The crash re-ran successfully without code changes, which rules out a deterministic code bug.
- The V8 version delta only manifests when a stale cache entry from a prior step gets
  picked up. In most CI runs, the cache is cold and the delta never occurs.
- Timing between concurrent build processes and filesystem cache writes may also play a role.
- Frequency analysis across 2000 runs found only the original incident — see Frequency Analysis section.

### What the AI analysis got wrong (for the record)

An AI-generated root cause analysis suggested adding `NODE_OPTIONS="--max-old-space-size=8192"`
to `build:renderer`. This is incorrect:

- Memory exhaustion produces `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`, not "unreachable code".
- The "unreachable code" path is in the bytecode deserializer's switch statement — unrelated to heap size.
- Adding `--max-old-space-size` would have no effect on this crash.

## Proposed Fix

### Option A — Webpack cache version key (recommended)

Add a `version` key to the cache config so webpack automatically invalidates incompatible
caches rather than crashing on them.

**File:** `.erb/configs/webpack.config.renderer.prod.ts`

```ts
cache: {
  type: 'filesystem',
  // Tie cache validity to the Node.js version so stale V8 bytecodes from a different
  // runtime are invalidated gracefully instead of causing a fatal deserializer crash.
  version: `node-${process.version}`,
  cacheDirectory: path.join(webpackPaths.rootPath, 'node_modules', '.cache', 'webpack-renderer'),
  buildDependencies: {
    config: [__filename],
    tsconfig: [path.resolve(webpackPaths.rootPath, 'tsconfig.json')],
  },
  compression: 'gzip',
  maxMemoryGenerations: 5,
},
```

### Option B — Clean cache before build in CI (belt-and-suspenders)

The `clean:build-cache` script already exists in `package.json`:

```json
"clean:build-cache": "rimraf ./node_modules/.cache",
```

In `.github/workflows/test.yml`, insert before the `Build` step (~line 140):

```yaml
- name: Clean build cache
  run: npm run clean:build-cache

- name: Build
  run: npm run build
```

In `.github/workflows/package-main.yml`, update the `Install packages and build` step
(~line 115):

```yaml
- name: Install packages and build
  run: |
    npm ci
    npm run clean:build-cache
    npm run build
```

### Option C — Remove filesystem cache from prod renderer config

Production CI builds are one-shot and gain nothing from cross-run caching. Removing
`cache: { type: 'filesystem' }` from `webpack.config.renderer.prod.ts` eliminates the
hazard entirely. The cache was added for local dev rebuild speed but provides no benefit
in CI.

## What NOT to Do

Do **not** add `NODE_OPTIONS="--max-old-space-size=8192"` to `build:renderer`. The crash
is a V8 bytecode deserialization incompatibility. Heap size is irrelevant.

## Frequency Analysis

Two scan sessions were run using `.erb/scripts/check-build-crash-frequency.sh`.

### Session 1 — 50 runs, no path filter (2026-04-11, before re-run)

| Metric | Value |
| --- | --- |
| Runs scanned | 50 |
| Failed runs | 14 |
| Path filter | none |
| Crash found | **1** (run [#5730](https://github.com/paranext/paranext-core/actions/runs/24285521198)) |
| Crash % of all runs | 2.0% |
| Crash % of failed runs | 7.1% |

### Session 2 — 2000 runs, filtered to `lib/platform-bible-react` commits (2026-04-11, after re-run)

| Metric | Value |
| --- | --- |
| Runs scanned | 2000 |
| Failed runs | 551 |
| Passed path filter | 204 |
| Crash found | **0** |

Full results: `doc-meta/crash-frequency-results-2000.txt`

### Why the sessions disagree

Session 2 found 0 crashes despite covering 40× more history. The reason is not the path
filter — commit `a9b19c5` does touch `lib/platform-bible-react` and run #5730 was at
position 5 in the 2000-run list. The real cause is **GitHub's re-run behavior**:

When the user re-ran the failed workflow, GitHub replaced the job outcomes in-place. The
original failing Ubuntu job became `conclusion: success`; the overall run conclusion
changed from `failure` to `cancelled`. The script's phase 1 filter `select(.conclusion == "failure")`
therefore excluded run #5730, and `--log-failed` returned nothing for it anyway since no
jobs are currently marked failed.

**Implication:** historical scans systematically under-count crashes that were followed by
a successful re-run. Any occurrence that was re-run before a scan is invisible.

### Scanner filter strategy

The current two-phase design (path filter → log scan) has trade-offs worth understanding:

| Approach | API calls | Catches re-run-masked crashes | Notes |
| --- | --- | --- | --- |
| No filter, check all failed | low | no | Fast but misses re-runs like this one |
| Path filter on committed files | medium (1 per unique SHA) | no | Correctly narrows scope; not the cause of the miss here |
| Include `cancelled` conclusion | low overhead | **yes** | Catches re-run cases; add `cancelled` alongside `failure` in phase 1 |
| Filter by platform (Linux only) | none extra | no | Crash was Linux-specific; could skip Windows/macOS log fetches |
| No filter + include `cancelled` | low | **yes** | Broadest coverage; recommended for future scans |

**Recommended change to the script:** add `cancelled` to the conclusion filter in phase 1
so re-run-masked runs are included. The `--log-failed` call will return empty for
successful re-runs (no wasted log fetch), so there is no efficiency cost.

```sh
FAILED_JSON=$(echo "$RUNS" | jq '[.[] | select(.conclusion == "failure" or .conclusion == "cancelled")]')
```

Optionally add `--linux-only` flag to skip Windows/macOS log fetches, since the crash has
only been observed on ubuntu-22.04.

## Investigation Tools

- **Frequency script:** `.erb/scripts/check-build-crash-frequency.sh`  
  Usage: `bash .erb/scripts/check-build-crash-frequency.sh [--limit N] [--path-filter PATH]`
- **Results (2000-run scan):** `doc-meta/crash-frequency-results-2000.txt`

## Branch / PR Guidance

This is a CI infrastructure fix unrelated to any feature branch. It should live on its
own branch (`fix/renderer-build-cache-crash`) targeting `main`. Since the crash is
intermittent and low-frequency, it is not blocking — treat as a non-urgent hardening task.
