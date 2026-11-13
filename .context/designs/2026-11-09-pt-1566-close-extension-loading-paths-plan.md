# PT-1566 Close Extension Loading Paths — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extension code in the extension host can no longer reach blocked Node modules (or build
code from strings) through any known route, and tests fail if a route reopens.

**Architecture:** Extension entry files are no longer loaded with Node's `require`. The host reads
the file and compiles it with `vm.compileFunction`, handing it its own `module`, `exports` and
`require`, so extension code never touches Node's CommonJS loader, module cache or dynamic-import
machinery. At activation the host also stubs the `process` helpers that hand out modules and locks
the `constructor` of the four function prototypes. A probe set in the `evil` extension tries every
route; a Vitest harness runs those probes in a child Node process and asserts each was refused.

**Tech Stack:** TypeScript, Node 22 (Electron 39.8.8), `node:vm`, Vitest, tsx.

**Spec:** No separate spec — the design was approved in conversation (2026-11-09). The decisions are
recorded under "Decisions" below and will go into `Architecture-Decisions.md` in Task 4.

**Branch / worktree:** `pt-1566-close-extension-loading-paths` at
`.claude/worktrees/pt-1566-close-extension-loading-paths`.

## Decisions (approved in conversation)

- **Loader over hooks.** Closing the CommonJS loader, `require.cache`, and dynamic `import()` is done
  by loading extension files through `vm.compileFunction` with our own `module`/`require`, not by an
  ESM import hook plus caller detection. A spike in plain Node 22 confirmed: `module.constructor` is
  `Object`, `require.cache` is absent, and `import('fs')` rejects ("A dynamic import callback was not
  specified").
- **String-built code is blocked by locking prototypes at activation**, not by the
  `--disallow-code-generation-from-strings` startup option. The option is process-wide from the first
  line (affects the host and its bundled libraries) and setting it at runtime with
  `v8.setFlagsFromString` has no effect (spike-verified).
- **`process` helpers are replaced with throwing stubs at activation**: `getBuiltinModule`,
  `binding`, `_linkedBinding`, `dlopen`; `process.mainModule` is set to `undefined`. Host-side
  native-module loads after activation already fail today (the `Module.prototype.require` shim refuses
  everything but extension entry files), so stubbing `dlopen` adds no new breakage — Task 3 confirms
  no host code calls `process.dlopen` directly.
- **The `Module.prototype.require` shim stays** as defense in depth, reduced to "interface modules or
  throw" (no extension entry-file branch, since entry files no longer go through it).
- **Packaged builds are checked manually** with the demo script (Task 4). No automated packaged test.
- **Out of scope:** process-level isolation (Node `--permission`, per-extension processes). An
  in-process sandbox closes known routes; it is not a hard security boundary.

## Global Constraints

- Every refusal error message contains the exact substring `not allowed in extensions` (today's
  `require` message already does: `Requiring other than papi is not allowed in extensions!`).
- The new sandbox module imports only `node:` built-ins — no path aliases, no project modules — so
  the test harness can load it in a bare child process and `extension.service.ts`'s module-scope side
  effects are never triggered.
- Lockdown functions must be safe to call more than once (`activateExtensions` re-runs on every
  extension install/update/remove).
- Do not change the set of interface modules (`EXTENSION_INTERFACE_MODULE_SPECIFIERS`); it is a
  license boundary (`LICENSE-EXCEPTION.md`).
- Forward-facing comments only (`.claude/rules/code-quality/forward-facing-comments.md`).
- Skip `npm run typecheck` (user preference); verify with `npm run lint` and the tests named per task.

## Review Focus

1. **Extension reload mid-session** — `activateExtensions` runs again after an install/update; the
   lockdowns must not throw the second time, and a reloaded extension must run its *new* file
   contents (the old code deleted the `require.cache` entry; the vm loader re-reads the file). Tests:
   Task 1 `reloads changed file contents`, Task 2 harness applies each lockdown twice.
2. **Webpack-bundled extensions' module shapes** — bundles assign `module.exports = …`, set
   `exports.default`, or use top-level `this` as `exports`. All three must still yield an `activate`.
   Test: Task 1 `supports module.exports, exports.default and top-level this`.
3. **Errors at an extension's top level stay debuggable** — a throw while loading must surface with
   the extension's file path in the stack, not an anonymous vm frame. Test: Task 1
   `stack trace names the extension file`.
4. **The host keeps working after lockdown** — bundled extensions activate and run normally in dev.
   Check: Task 3 Step 5 (dev run, every bundled extension logs `finished activating`, no
   `not allowed in extensions` errors other than evil's probes).
5. **Entry-file resolution** — Node's `require(dir)` resolved the entry via the directory's
   `package.json`; the loader resolves it from the manifest's `main` (already normalized `.ts`→`.js`
   in `extension.service.ts:251`). They must name the same file for every bundled extension. Check:
   Task 3 Step 5 covers it (an extension that fails to resolve fails to activate).

---

### Task 1: Extension module loader

**Files:**
- Create: `src/extension-host/services/extension-sandbox.util.ts`
- Test: `src/extension-host/services/extension-sandbox.util.test.ts`

**Interfaces:**
- Produces:
  - `export type ExtensionRequire = (moduleName: string) => unknown;`
  - `export const NOT_ALLOWED_IN_EXTENSIONS = 'not allowed in extensions';`
  - `export function loadExtensionModule(entryFilePath: string, extensionRequire: ExtensionRequire): unknown`
    — reads the file synchronously, compiles it with `vm.compileFunction(source, ['exports', 'require', 'module', '__filename', '__dirname'], { filename: entryFilePath })`
    (no `importModuleDynamically`), calls it with `this` = `module.exports`, returns
    `module.exports`. `module` is a plain `{ exports: {} }`; the `require` passed in is a fresh
    arrow wrapping `extensionRequire`, so it has no `cache`, `main` or `resolve`.

- [ ] **Step 1: Write the failing tests** (tests write fixture files to a `fs.mkdtempSync` temp dir)

  - `returns what the file assigns to module.exports` — file `module.exports = { activate: 1 }` → `{ activate: 1 }`.
  - `supports module.exports, exports.default and top-level this` — three files:
    `exports.default = { activate: 1 }`, `this.activate = 1`, `module.exports = { activate: 1 }`; each returns an object exposing `activate` at the expected place.
  - `routes require calls to extensionRequire` — file `module.exports = require('@papi/backend')`, `extensionRequire` returns `'papi'` for that name → result `'papi'`; `extensionRequire` called once with `'@papi/backend'`.
  - `gives extension code no path to Node's loader` — file exports `[module.constructor === Object, typeof require.cache, typeof require.main, typeof require.resolve]` → `[true, 'undefined', 'undefined', 'undefined']`.
  - `refuses dynamic import` — file `module.exports = import('node:fs')` → the promise rejects.
  - `stack trace names the extension file` — file `throw new Error('boom')` → thrown error's `stack` contains `entryFilePath`.
  - `reloads changed file contents` — load, rewrite file to export `2`, load again → `2`.

- [ ] **Step 2: Run tests to verify they fail**

  Run: `npm test -- src/extension-host/services/extension-sandbox.util.test.ts`
  Expected: FAIL — module `./extension-sandbox.util` not found.

- [ ] **Step 3: Implement `loadExtensionModule` and the exports above in `extension-sandbox.util.ts`**

  Imports limited to `node:vm`, `node:fs`, `node:path` (Global Constraints).

- [ ] **Step 4: Run tests to verify they pass**

  Run: `npm test -- src/extension-host/services/extension-sandbox.util.test.ts`
  Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

  ```bash
  git add src/extension-host/services/extension-sandbox.util.ts src/extension-host/services/extension-sandbox.util.test.ts
  git commit -m "PT-1566: Load extension files through a vm wrapper with their own module and require"
  ```

---

### Task 2: Lockdowns and the evil sandbox probes

**Files:**
- Modify: `src/extension-host/services/extension-sandbox.util.ts`
- Modify: `extensions/src/evil/evil.js` (Node-side checks only; the web view checks are untouched)
- Create: `src/extension-host/services/extension-sandbox.probe-host.fixture.ts`
- Test: `src/extension-host/services/extension-sandbox.probes.test.ts`

**Interfaces:**
- Consumes: `loadExtensionModule`, `ExtensionRequire`, `NOT_ALLOWED_IN_EXTENSIONS` (Task 1).
- Produces:
  - `export function blockProcessModuleAccess(): void` — replaces `process.getBuiltinModule`,
    `process.binding`, `process._linkedBinding`, `process.dlopen` with functions that throw an
    `Error` whose message contains `NOT_ALLOWED_IN_EXTENSIONS`; sets `process.mainModule` to
    `undefined`. Idempotent.
  - `export function blockCodeGenerationFromStrings(): void` — deletes `globalThis.eval` and
    `globalThis.Function`; defines `constructor` as non-writable, non-configurable on the
    `prototype` of `Function`, `AsyncFunction`, `GeneratorFunction` and `AsyncGeneratorFunction`
    (each reached via `(<fn literal>).constructor` before locking), valued with a function that
    throws an `Error` containing `NOT_ALLOWED_IN_EXTENSIONS`. Idempotent: if already locked, return
    (redefining a non-configurable property throws).
  - In `evil.js`: `exports.runSandboxProbes = () => SandboxProbeResult[]` (async allowed; returns a
    promise if any probe is async), where
    `SandboxProbeResult = { name: string; outcome: 'refused' | 'escaped'; detail: string }`.
    At module load, evil runs the probes and logs one line
    `Sandbox probes: <refused>/<total> refused` via `papi.logger.info`, plus one
    `papi.logger.error('<<BAD>> Sandbox probe escaped: <name> — <detail>')` per escape.
    The `fetch`/`XMLHttpRequest`/`WebSocket`/`papi.fetch` checks move out of module load into
    `activate` (they make real network calls), keeping their current behavior. Remove evil's
    existing `require('fs')`, `require('https')` and `import('fs')` attempts — the probes replace them.

  **Probe table** (names are the `name` values; the test pins this list):

  | name | attempt | refused when |
  |---|---|---|
  | `require-fs` | `require('fs')` | throws with `not allowed in extensions` |
  | `require-node-fs` | `require('node:fs')` | same |
  | `process-getBuiltinModule` | `process.getBuiltinModule('fs')` | throws with marker, or not a function |
  | `process-binding` | `process.binding('fs')` | throws with marker |
  | `process-linkedBinding` | `process._linkedBinding('fs')` | throws with marker |
  | `process-dlopen` | `process.dlopen({}, '')` | throws with marker |
  | `process-mainModule` | `process.mainModule` | is `undefined` |
  | `module-loader` | `module.constructor._load` | is not a function |
  | `require-cache` | `require.cache` | is `undefined` |
  | `dynamic-import` | `await import('fs')` | rejects |
  | `function-constructor` | `(() => {}).constructor('return 1')` | throws with marker |
  | `async-function-constructor` | `(async () => {}).constructor('return 1')` | throws with marker |
  | `generator-function-constructor` | `(function* () {}).constructor('yield 1')` | throws with marker |
  | `async-generator-function-constructor` | `(async function* () {}).constructor('yield 1')` | throws with marker |
  | `global-eval` | `globalThis.eval` | is `undefined` |
  | `global-Function` | `globalThis.Function` | is `undefined` |

  Any other result — success, or an error without the marker — is `escaped`, with the value or
  error message as `detail`.

- [ ] **Step 1: Write the failing tests** in `extension-sandbox.probes.test.ts`

  The test runs `spawnSync(process.execPath, ['--import', 'tsx', FIXTURE, mode], { cwd: REPO_ROOT, encoding: 'utf8', timeout: 60_000 })`
  and parses the last stdout line as `SandboxProbeResult[]`. The fixture
  (`extension-sandbox.probe-host.fixture.ts`) takes `mode`:
  - `protected` — calls `blockProcessModuleAccess()` and `blockCodeGenerationFromStrings()` **twice
    each**, then `loadExtensionModule('extensions/src/evil/evil.js', stubRequire)` where `stubRequire`
    returns a stub `@papi/backend` (`logger` with no-op `info`/`warn`/`error`; nothing else) and
    throws `Requiring other than papi is not allowed in extensions!` for anything else — then prints
    `JSON.stringify(await exports.runSandboxProbes())`.
  - `unprotected` — no lockdowns; loads `evil.js` with Node's own `require` after patching
    `Module.prototype.require` to return the same stub for `@papi/backend` and throw the same
    message for every other specifier except `evil.js` itself (the pre-PT-1566 sandbox), then prints
    the probe results the same way.

  Tests:
  - `every probe is refused when the sandbox is applied` — `protected`: exit code 0; the result
    names equal the probe table's names exactly (order-insensitive); every `outcome` is `'refused'`
    (on failure, the assertion message lists escaped names with details).
  - `the probes detect escapes from the old sandbox` — `unprotected`: at least these are `'escaped'`:
    `process-getBuiltinModule`, `process-binding`, `module-loader`, `require-cache`,
    `dynamic-import`, `function-constructor`. (Positive control: proves a probe can report an escape.)

- [ ] **Step 2: Run tests to verify they fail**

  Run: `npm test -- src/extension-host/services/extension-sandbox.probes.test.ts`
  Expected: FAIL — `blockProcessModuleAccess` not exported / `runSandboxProbes` undefined.

- [ ] **Step 3: Implement the two lockdown functions in `extension-sandbox.util.ts`**

- [ ] **Step 4: Implement the probes in `evil.js` and the fixture**

- [ ] **Step 5: Run tests to verify they pass**

  Run: `npm test -- src/extension-host/services/extension-sandbox`
  Expected: PASS — Task 1's 7 tests and both probe tests.

- [ ] **Step 6: Mutation check**

  Temporarily make `blockProcessModuleAccess` a no-op → `every probe is refused…` fails naming the
  `process-*` probes. Restore. Repeat with the prototype lock removed → the four constructor probes
  fail. Restore.

- [ ] **Step 7: Commit**

  ```bash
  git add src/extension-host/services/extension-sandbox.util.ts src/extension-host/services/extension-sandbox.probe-host.fixture.ts src/extension-host/services/extension-sandbox.probes.test.ts extensions/src/evil/evil.js
  git commit -m "PT-1566: Block process module helpers and function constructors; evil reports each sandbox probe"
  ```

---

### Task 3: Wire the sandbox into the extension service

**Files:**
- Modify: `src/extension-host/services/extension.service.ts` — `systemRequire`/`requireOriginal`
  (lines ~96–167), `activateExtension` (~1165–1180), `deactivateExtension` cache removal
  (~1504–1508), `activateExtensions` shim and global stubs (~1372–1431)

**Interfaces:**
- Consumes: `loadExtensionModule`, `ExtensionRequire`, `blockProcessModuleAccess`,
  `blockCodeGenerationFromStrings` (Tasks 1–2).
- Produces: `function requireForExtension(moduleName: string): unknown` (module-private) — returns
  `EXTENSION_INTERFACE_MODULES[moduleName]` for interface modules, otherwise throws today's message
  (`Requiring other than papi is not allowed in extensions! ${getModuleSimilarApiMessage(moduleName)}. Read more…`).
  Used by both the loader and the `Module.prototype.require` shim.

- [ ] **Step 1: Load extensions through the loader**

  In `activateExtension`, replace the `systemRequire(...)` call with
  `loadExtensionModule(getPathFromUri(joinUriPaths(extension.dirUri, extension.main)), requireForExtension)`
  (`main` is non-empty here — `availableExtensions` filters on it). Keep the existing
  `AmbiguousExtensionModule` / `default` handling.

- [ ] **Step 2: Replace the shim and stubs in `activateExtensions`**

  - `Module.prototype.require = requireForExtension` (typed as today). Delete `extensionsWithCheck`'s
    `hasBeenImported` bookkeeping and the `TODO` about one extension importing another's file; keep
    the list itself if the activation loop still uses it, otherwise iterate `extensionsToActivate`.
  - Replace the `delete globalThis.eval` / `delete globalThis.Function` block with
    `blockCodeGenerationFromStrings()`; add `blockProcessModuleAccess()` beside it. Keep the existing
    comment's link and the `fetch`/`XMLHttpRequest`/`WebSocket` replacements unchanged.

- [ ] **Step 3: Remove dead loader code**

  Delete `requireOriginal`, `systemRequire`, the `__non_webpack_require__` declaration, and the
  `require.cache` deletion in `deactivateExtension` (the loader keeps no cache). Then confirm:
  Run: `git grep -nE "systemRequire|requireOriginal|__non_webpack_require__|process\.dlopen" -- src`
  Expected: no hits outside `extension-sandbox.util.ts`.

- [ ] **Step 4: Run tests and lint**

  Run: `npm test -- src/extension-host && npm run lint`
  Expected: PASS, no lint errors.

- [ ] **Step 5: Dev run (Review Focus 4 and 5)**

  Start the app with the `app-runner` skill using `DEV_NOISY=true` (evil only loads in noisy dev
  mode). With the `log-inspector` skill, confirm in `~/.config/Electron/logs/main.log`:
  - `extension.service: finished activating <name>` for every extension listed in
    `Activating the following extensions: …`;
  - `Sandbox probes: 16/16 refused`;
  - no `<<BAD>>` lines and no `not allowed in extensions` errors from extensions other than evil.

- [ ] **Step 6: Commit**

  ```bash
  git add src/extension-host/services/extension.service.ts
  git commit -m "PT-1566: Extension host loads extensions through the sandbox loader and applies the lockdowns"
  ```

---

### Task 4: Docs, decision record, and the demo script

**Files:**
- Modify: `.context/standards/Security-Guide.md` (Module Import Restrictions section)
- Modify: `.context/standards/Architecture-Decisions.md` (new entry, byte-order slug position)
- Modify: comments that describe the old shim — `LICENSING.md:146`,
  `src/extension-host/data/extension-interface-modules.data.ts:7`,
  `src/extension-host/services/extension.service.module-allowlist.test.ts:10`, and the four
  `extensions/src/*/src/extension-host-import-boundary.test.ts:10` headers
- Modify: `.context/standards/Architecture-Decisions.md:5357` if it states the shim is the mechanism

- [ ] **Step 1: Find the dev/packaged difference**

  In the main checkout (`/home/lwenger/Documents/Development/paranext-core`, on `main`), dev logs never show evil's
  `Successfully dynamically imported fs`, but plain Node (with or without `--import tsx`) lets it
  through. Find why (candidates: how dev resolves and wraps `extensions/dist/evil/evil.js` under tsx's
  CommonJS hook; `NODE_PATH`). Time-box to 1 hour; record the finding — or "not found within time
  box" — for the PR description. No code change: the vm loader makes both builds take one path.

- [ ] **Step 2: Update the Security Guide**

  Add under "Module Import Restrictions" a short "How the restrictions are enforced" subsection:
  extension files load through the host's own wrapper (no Node loader, cache or dynamic `import()`);
  `process` module helpers and function constructors are disabled at activation; `fetch` →
  `papi.fetch`; `XMLHttpRequest`/`WebSocket` disabled; the evil extension's sandbox probes and
  `extension-sandbox.probes.test.ts` are the regression guard. Note the in-process limit (not a hard
  security boundary).

- [ ] **Step 3: Add the decision record**

  Slug `adr-extensions-load-through-sandbox-loader`, inserted at its `LC_ALL=C sort` position. Context
  (PT-1566 routes), decision (the four Decisions bullets above), alternatives (ESM import hook +
  caller checks; `--disallow-code-generation-from-strings`; process isolation), consequences
  (extensions relying on string-built code or Node's `module` beyond `exports` break — already
  unsupported; module cache no longer used for reload).

- [ ] **Step 4: Update the comments listed under Files** so they describe "the extension `require`
  the host hands each extension file (and the `Module.prototype.require` shim)" rather than the shim
  alone. Run: `git grep -n "Module.prototype.require" -- ':!lib/papi-dts'` and confirm each hit reads
  correctly.

- [ ] **Step 5: Write the PR description draft** at
  `.context/designs/2026-11-09-pt-1566-pr-notes.md` (uncommitted scratch is fine; it is pasted into
  the PR) containing:
  - the Step 1 finding;
  - **Demo script:**
    1. Dev: `DEV_NOISY=true npm start`; in `~/.config/Electron/logs/main.log` find
       `Sandbox probes: 16/16 refused` and no `<<BAD>> Sandbox probe escaped` lines.
    2. Before/after (optional): run step 1 on `main` — evil's old checks pass silently there, so
       instead copy this branch's `evil.js` over `main`'s `extensions/dist/evil/evil.js` and see the
       escapes listed.
    3. Packaged: `npm run package`; run the app in `release/build/linux-unpacked/` with
       `DEV_NOISY=true` (add `--extensions <repo>/extensions/dist/evil` if evil is not in the
       package); in `~/.config/platform-bible/logs/main.log` find `Sandbox probes: 16/16 refused`.
       Packaged log level is `error`, so also pass `--logLevel info`.
  - suggested wiki text for "Module Import Restrictions" (the wiki is a separate repo).

- [ ] **Step 6: Lint and commit**

  Run: `npm run lint`
  Expected: no errors.

  ```bash
  git add .context/standards/Security-Guide.md .context/standards/Architecture-Decisions.md LICENSING.md src/extension-host/data/extension-interface-modules.data.ts src/extension-host/services/extension.service.module-allowlist.test.ts extensions/src/*/src/extension-host-import-boundary.test.ts .context/designs/2026-11-09-pt-1566-close-extension-loading-paths-plan.md
  git commit -m "PT-1566: Document how extension import restrictions are enforced"
  ```
