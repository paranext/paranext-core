# Code Review Findings: worktree-startup-perf-investigation

Max-effort multi-agent review of `git diff main...HEAD` (branch `worktree-startup-perf-investigation`, HEAD 764c3e5590e).
Process: 10 finder angles -> 63 candidates -> 29 deduped -> 1 adversarial verifier each -> gap sweep -> 30 verified findings.
Every finding below survived verification (CONFIRMED unless marked PLAUSIBLE). Line numbers are 1-indexed into HEAD.

Instructions for the fixing session:

- Fix in the order listed (severity-ranked). Items 1-9 are the substantive ones; 10-30 are small.
- Some findings are narrowed/scoped by verification - read the "Scope" notes before acting; do not "fix" beyond what is stated.
- After fixes: `npm run typecheck && npm run lint && npm test && dotnet test c-sharp-tests/`. If TS model files under src/shared change, run `npm run build:types` to regenerate lib/papi-dts/papi.d.ts (never hand-edit it).
- The "Verified non-issues" section at the bottom lists claims that were investigated and REFUTED - do not re-fix those.

---

## HIGH

### 1. Program.cs background init split: silent faults + permanently dead one-shot consumers

- File: `c-sharp/Program.cs:127`
- The five services (inventoryDataProvider, checkRunner, checklistNetworkObject, manageBooksService, enhancedResourceFactory) moved to fire-and-forget `ThreadingUtils.RunTask(Task.Run(...))` AFTER the critical barrier. Two consequences:
  1. A registration fault is now only `Console.WriteLine`'d (ThreadingUtils.cs:39-40); previously a fault in the single `Task.WhenAll` escaped `Main` loudly. Five features silently missing all session.
  2. They previously STARTED concurrently with the barrier items; now they start only after the barrier (project scan + DBL + S/R init) completes. TS consumers with bounded one-shot acquisition can permanently fail on slow startups: use-checklist.ts:38-52 and manage-books.web-view.tsx:489-505 acquire their network object in a mount-once `useEffect(..., [])` with no onDidCreateNetworkObject re-subscription, backed only by the hub's MethodNotFound retry (rpc.model.ts:17-19, MAX_REQUEST_ATTEMPTS=10 x 1000ms ~ 9s). A restored Markers Checklist / Manage Books tab whose budget expires while the scan holds the barrier is dead until webview reload. check-aggregator mostly self-heals (20s waitForNetworkObject, re-run per call); enhanced-resources is immune (untimed waitForNetworkObject, see use-enhanced-resources-proxy.ts:127-128 which documents this exact cold-start race).
- Suggested fix (pick at least one): start the background group BEFORE awaiting the barrier (concurrent, as before) rather than after; surface faults louder than console (log error / crash in dev); and/or make checklist + manage-books acquisition resilient (re-acquire on onDidCreateNetworkObject or use the untimed waitForNetworkObject pattern the ER proxy uses).

### 2. LDML file I/O added to startup project enumeration

- File: `c-sharp/Projects/ScrTextExtensions.cs:26` (`languageTag: scrText.Language.LanguageId.Id`)
- `ScrText.Language` eagerly constructs `ScrLanguage`, whose constructor runs `wsDef = LoadWsDef(scrText)` (Paratext ScrLanguage.cs:190) = open + XML-parse the project's LDML file (zip-decompressed for resources), even though `ScrLanguage.LanguageId` itself short-circuits to `Settings.LanguageID` without needing wsDef. GetProjectDetails now runs for every project at enumeration, so the first getAvailableProjects does P+R LDML opens/parses inside the request the picker/Home block on. Pre-diff GetProjectDetails touched only Settings-backed data. Worse, `CreateLayoutEngine`'s failure path (ScrText.cs:1878-1893) does Alert.ShowLater, mutates Settings.LanguageID to English, and SAVES a healing English LDML into writable projects - during a read-only listing.
- Suggested fix: populate languageTag from `scrText.Settings.LanguageID?.Id` with the getter's coercion replicated - the PDP getter (ParatextProjectDataProvider.cs:1594) uses `scrText.Language.LanguageId.Id`, which coerces null/empty LanguageID to 'en'. So use `scrText.Settings.LanguageID?.Id ?? "en"` (or equivalent) and document the parity reasoning; do NOT keep forcing `scrText.Language`. Verify with ScrTextExtensionsTests.

## MEDIUM

### 3. Missing `isEditable` treated as non-editable (default inversion) [PLAUSIBLE - contract-level]

- File: `src/renderer/hooks/use-project-picker-data.hook.ts:167` (also line 147 for recents)
- `metadata.filter((m) => m.isEditable)` and `!!m?.isEditable` drop projects whose metadata omits the new optional field. The replaced `pdp.getSetting('platform.isEditable')` resolved the registered default `true` (core-project-settings-info.data.ts:36; papi.d.ts:4545 mandates getDefault fallback). No in-repo factory triggers this today (C# factories always populate; in-repo layering PDPFs pass base metadata through; lexical-tools/hello-rock3 serve no USX/USJ), but any third-party/pre-branch base PDPF's editable projects vanish silently.
- Suggested fix: treat `undefined` as editable (`m.isEditable !== false`) to preserve the registered-default semantics, or document the new contract loudly on ProjectMetadata.isEditable ("omitting means hidden from pickers"). Prefer the former for parity. Update the hook tests accordingly.

### 4. Metadata merge drops display fields (first-resolved-factory-wins) [PLAUSIBLE]

- File: `src/shared/models/project-lookup.service-model.ts:470` (merge branch ~493-498)
- `internalGetMetadata` seeds `enrichedMd` from whichever factory's getAvailableProjects RESOLVES first (Promise.all callbacks mutate the map as they resolve - nondeterministic) and merges only `projectInterfaces` from later factories. The diff documents display fields as first-factory-wins in a comment instead of merging. A factory reporting the same project id with bare `{id, projectInterfaces}` (type-legal - all six fields optional) nondeterministically strips name/fullName/language/isEditable provided by the C# factory -> project drops from picker or renders as raw hex id.
- Suggested fix: fill-if-absent merge at the existing merge branch (~6 lines: `enrichedMd.name ??= md.name;` etc. for all six fields), replacing/updating the comment added by this branch. Note for TS: `??=` on the type-asserted object; keep the no-null conventions.

### 5. GetIsEditable malformed-value divergence

- File: `c-sharp/Projects/ScrTextExtensions.cs:88` (`_ => true`)
- For a malformed Editable value (e.g. `<Editable>yes</Editable>`): metadata says true; `pdp.getSetting('platform.isEditable')` throws InvalidDataException (ParatextProjectDataProvider.cs:1696-1705 generic boolean branch); ParatextData's own `IsEditableText` (`GetSetting == "T"`) says false. The doc comment claims "replicates the platform.isEditable getter's exact logic". Old picker excluded such projects (per-project catch); now they show as editable and error downstream.
- Suggested fix: make the fallback `false` (matches ParatextData) or align with the getter; ideally resolve together with finding 9 (shared TryParseParatextBoolean with per-caller fallback). Update ScrTextExtensionsTests to pin the chosen behavior against the getter's, not just literals.

### 6. Dangling `project-scan-start` marks on re-entrant Initialize

- File: `c-sharp/Projects/LocalParatextProjects.cs:79`
- `Mark("project-scan-start")` is before `if (_isInitialized) return;` and the in-lock recheck; `Mark("project-scan-end")` (line 109) only after a full scan. Both factories call Initialize on the SAME instance inside the startup Task.WhenAll (ProjectDataProviderFactory.cs:27 -> ParatextProjectDataProviderFactoryBase.cs:41) -> duplicate start mark; every project's first PDP creation calls Initialize again (ParatextProjectDataProvider.cs:315 via DataProvider.cs:46) -> a dangling start mark at every project open, inflating the waterfall Total span.
- Suggested fix: move both marks inside the initialized-guarded critical section (start after the guards, end before releasing), or add `StartupTiming.MarkOnce(name)` (thread-safe HashSet in StartupTiming) and use it here - see also findings 15/14 which want the same once-mechanism.

### 7. Waterfall parser merges marks from multiple app runs

- File: `.erb/scripts/startup-waterfall.util.ts:18` (parseStartupMarks)
- electron-log main.log appends across launches (only 3MB size rotation, src/node/utils/log-archiver.util.ts; logger.service.ts never truncates). The parser keeps every STARTUP_MARK in the file, sorts by epoch, and reports Total span = last - first. Two instrumented runs -> merged timeline, duplicate process-start rows, span covering the gap between launches. Silent.
- Suggested fix: segment by run in the parser - slice from the LAST `main process-start` mark (or group by process-start boundaries and report the latest group; optionally warn when multiple runs detected). Add a test with two runs' marks.

### 8. Hook does 3 identical metadata fan-outs per refresh (consolidation)

- File: `src/renderer/hooks/use-project-picker-data.hook.ts:106` (also 135, 164)
- currentProject/recents/allProjects each call `projectLookupService.getMetadataForAllProjects` per refresh; the service applies id (line 481) and interface (507-515) filters CLIENT-side after contacting every PDPF and deepCloning full lists; 3 bundled layering PDPFs re-enumerate nested (project-data-provider-engine-factory.model.ts:192-193); refreshCounter is bumped by 4 webview events, re-running all three. NOT a regression (main did ~(2+N+M) enumerations + 5 getSetting RPCs per project; this branch is ~10x better) - but one shared unfiltered fetch per refresh, filtered locally, cuts the remaining fan-out 3x on the startup path.
- Suggested fix: fetch once per refresh (share one promise across the three usePromise callbacks) and derive currentProject by id, recents by id order, allProjects by interface+isEditable locally.

### 9. platform.\* projection duplicated (raw reader + bool parse)

- File: `c-sharp/Projects/ScrTextExtensions.cs:70` (GetRawParatextSetting ~55, GetIsEditable ~82)
- `GetRawParatextSetting` == `ProjectSummary.GetRawSetting` (c-sharp/ManageBooks/ProjectSummary.cs:105-108) modulo fallback param; GetIsEditable's T/F/TRUE/FALSE switch is the assembly's third copy (GetProjectSetting ~1696 throws on malformed; SetProjectSetting ~1865 normalizes). Copies already disagree (finding 5) and tests pin literals, not getter output.
- Suggested fix: extract one shared raw-setting reader (nullable fallback; ScrText extension) used by ScrTextExtensions + ProjectSummary, and `TryParseParatextBoolean(string, out bool)` in ProjectSettingsNames (beside IsParatextSettingABoolean, line 198) used by all three call sites with per-caller fallback (getter throws, setter normalizes, metadata defaults). Same assembly throughout; no blockers found.

## LOW

### 10. `isPublished ?? false` routing [PLAUSIBLE - external factories only]

- Files: `extensions/src/platform-get-resources/src/home.web-view.tsx:238`, `new-tab.web-view.tsx:78`
- isPublished routes openProject between openResourceViewer and openScriptureEditor (home.web-view.tsx:68-74, new-tab.web-view.tsx:40-47). Registered default is false, all in-repo suppliers populate/pass through the field, so today's behavior is unchanged; only a third-party factory whose PDP answers true while omitting metadata misroutes. Fix rides along with findings 3/4 (default semantics + merge); no separate change needed if those land.

### 11. Stale faulted Lazy rethrow window

- File: `c-sharp/Projects/ParatextProjectDataProviderFactoryBase.cs:134`
- Thread A gets Lazy L1 from GetOrAdd, is descheduled; B forces L1 -> factory throws (transient) -> B evicts L1; C's GetOrAdd creates L2, succeeds; A resumes, L1.Value rethrows the stale cached exception (catch at 136-148 only TryRemoves + rethrows, no map re-check). Old locked code re-attempted creation and succeeded. Self-heals on caller retry.
- Suggested fix (optional, small): on catch, if `_pdpMap.TryGetValue(projectID, out var current) && !ReferenceEquals(current, lazy)`, retry via the current entry (one bounded retry) instead of rethrowing.

### 12. Registration wait dropped: tolerance ~19s -> ~9s, faults silent to first caller

- File: `c-sharp/Projects/ParatextProjectDataProviderFactoryBase.cs:123`
- Scope note: the "permanently cached dead name" part was REFUTED as pre-existing (main TryAdd'd before RunTask and never evicted on registration fault either; faults after 10s were log-only on main too). The verified delta: old `RunTask(..., DefaultTimeout)` did `task.Wait(10s)` - delaying the returned name until registration finished and rethrowing early faults to the first caller. Now the name returns immediately; total slow-registration tolerance is only the TS retry budget (~9s vs ~19s), and faults never surface to callers.
- Suggested fix (judgment call): restore a bounded wait for the registration task inside GetProjectDataProviderID (outside the Lazy body so eviction semantics keep working), or track the registration Task on the PDP and have GetExistingProjectDataProvider/gets await it; at minimum log registration faults via the logger at error level with the project id.

### 13. DummyPapiClient.\_sentEvents plain Queue raced by concurrent registrations

- File: `c-sharp-tests/DummyPapiClient.cs:11`
- The new 4-thread factory tests run registration synchronously inline on each test thread (all awaits complete synchronously against the dummy), ending in `SendEventAsync` -> `_sentEvents.Enqueue` (line 66) concurrently. Same motivation as the ConcurrentDictionary conversion this branch already made to `_documentationByRequestType` (its comment concedes the concurrency).
- Fix: `Queue<>` -> `ConcurrentQueue<>` (adjust Dequeue in NextSentEvent to TryDequeue).

### 14. Extension reload re-fires activation "startup" marks mid-session

- File: `src/extension-host/services/extension.service.ts:1401` (marks at 1389-1401)
- Watcher events (installed post-startup, line 1602) -> reloadExtensions (line 702) -> activateExtensions (1527). change/unlink deactivates all (lines 714-715, 1495), so the full marked loop re-runs; even add-only installs re-fire `all-extensions-activated` unconditionally. Duplicate rows + session-length span in the same run.
- Suggested fix: once-per-session guard for these marks (module-level flag, or the shared markStartupOnce from finding 6's mechanism).

### 15. `first-get-chapter-usx` mark is per-PDP-instance

- File: `c-sharp/Projects/ParatextProjectDataProvider.cs:2487` (field at ~86)
- Each project's PDP emits its own "first" mark; opening a second project late injects a bogus startup mark inflating span. (Concurrency sub-claim refuted: StreamJsonRpc dispatches the sync handler serially - no double-mark race.)
- Suggested fix: make the guard static (process-wide) or use StartupTiming.MarkOnce (finding 6).

### 16. `bundle-eval-start` mislabels bundle-eval END

- File: `src/renderer/index.tsx:35`
- The mark runs after the entire static import graph evaluates (verified in built bundle). window-created -> bundle-eval-start silently contains download+parse+eval. Note: it cannot naively move up - globalThis.startupMarks is set in global-this.model.ts (itself the SECOND import; the first pulls React).
- Suggested fix: rename the mark to reflect reality (e.g. `bundle-eval-end` or `entry-body-start`), or add a tiny dedicated first-import module that reads the query param inline and marks true eval start.

### 17. Absent display fields serialize as JSON null, TS contract says undefined

- File: `c-sharp/Projects/ProjectMetadata.cs:46` (all four string fields)
- Verified end-to-end on the actual PapiClient formatter: wire carries `"fullName":null,...` while papi.d.ts says `fullName?: string` and the repo lint-bans null. In-repo consumers survive via `??`. Precedent exists (CheckJobStatusReport.Error), and the repo's own fix pattern is `[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]` (PlatformNotification.cs:7-22).
- Suggested fix: add WhenWritingNull JsonIgnore to the four nullable string properties (Name, FullName, Language, LanguageTag).

### 18. Recents exclusion Set is case-sensitive while lookup Map is not

- File: `src/renderer/hooks/use-project-picker-data.hook.ts:176` (Map at 141-146)
- The diff added the case-insensitivity comment + uppercased Map for recents lookup, but `!recentIdSet.has(p.id)` (line 176, code unchanged from main) compares raw. Latent (all first-party writers store uppercase ids) but internally inconsistent; a third-party recordProjectOpened caller with lowercase id lists the project in both Recent and All.
- Suggested fix: build recentIdSet from uppercased ids and compare `p.id.toUpperCase()` (or export/use a shared project-id comparator).

### 19. Activation mark-name sanitize: wrong target, duplicated

- File: `src/extension-host/services/extension.service.ts:1390` (and 1395)
- `.replace(/ /g, '-')` is unnecessary for spaces (parser tolerates multi-word names by design) but misses line terminators (a manifest name with \n splits the log line; the mark silently vanishes - nothing on the load path forbids it, the /\s/ check runs only in getExtensionKey). Expression + `globalThis.startupMarks` guard duplicated on both lines; markStartup's TSDoc demands a "space-free token" it doesn't enforce.
- Suggested fix: hoist once per iteration with `replace(/\s+/g, '-')`, or sanitize centrally inside markStartup and fix its TSDoc; drop the redundant outer guards (markStartup already checks; cost when disabled is one template literal per extension at startup).

### 20. resolveLanguage: dead '%' branch + stale contract

- File: `src/renderer/hooks/use-project-picker-data.hook.ts:28`
- The `%placeholder%` guard is unreachable now (metadata never carries getSetting defaults), and `resolveLanguage('','')` returns `{tag:'', displayName:''}` (Intl.DisplayNames RangeError caught) - the TSDoc says "returns undefined when unset". Consumers survive via falsy checks; hygiene only.
- Suggested fix: return undefined for empty language+tag, remove the dead '%' branch, update the TSDoc.

### 21. metadataToProjectItem TSDoc overclaims "non-empty"

- File: `src/renderer/hooks/use-project-picker-data.hook.ts:43`
- `??` passes '' through (present-but-empty FullName is a real, deliberately-supported Paratext case stored as ""). Behavior matches main exactly (old raw read returned '' too) - the branch's parity goal is met; the DOC is wrong.
- Suggested fix: correct the TSDoc ("defined" not "non-empty"). Do not change behavior (would break stated getSetting parity).

### 22. Random.Next(65, 90) is A-Y; rewritten comment says A-Z

- File: `c-sharp/Projects/ParatextProjectDataProviderFactoryBase.cs:111` (comment at 105)
- Exclusive upper bound; carried-over off-by-one, no functional impact. Fix: `Next(65, 91)` or fix the comment.

### 23. Metadata->LocalProjectInfo mapping duplicated; type re-declared

- Files: `extensions/src/platform-get-resources/src/home.web-view.tsx:236-242` == `new-tab.web-view.tsx:76-82`; new-tab re-declares LocalProjectInfo (lines 10-16) that home.component.tsx:73 exports (new-tab.stories.tsx already imports it).
- Suggested fix: one exported `metadataToLocalProjectInfo(data: ProjectMetadata): LocalProjectInfo` in home.component.tsx (both web views already import from it); delete new-tab's local type. Scope to the extension only - the renderer hook's mapper differs in shape and shares no bundle.

### 24. MARK_REGEX hardcodes the prefix the shared constant owns

- File: `.erb/scripts/startup-waterfall.util.ts:15`
- STARTUP_MARK_PREFIX's doc says "the startup-waterfall parser greps for this. Keep identical" but the parser never imports it. Direct import would drag logger.service side effects into the CLI.
- Suggested fix: move STARTUP_MARK_PREFIX to import-free `src/shared/data/platform.data.ts` (already touched by this branch), re-export from startup-timing.util for callers, and build MARK_REGEX with `new RegExp(...)` from it. Both ts-node (tsconfig-paths) and the .erb vitest project (vite-tsconfig-paths) resolve @shared/\* today. C# Prefix stays comment-linked (cross-language).

### 25. isStartupMarksEnvVariableSet nits

- File: `src/node/utils/util.ts:163`
- Redundant `!!x &&` conjunct; missing `: boolean` return type (sibling has it); TSDoc lacks `@returns` required by Code-Style-Guide for papi.d.ts-published symbols (papi.d.ts:6351; guide lines 148/158).
- Fix: `export const isStartupMarksEnvVariableSet = (): boolean => process.env.PT_STARTUP_MARKS === 'true';` with an @returns line. Then `npm run build:types`.

### 26. Test-file comment overclaims never-called assertion

- File: `src/renderer/hooks/use-project-picker-data.hook.test.ts:45`
- "every test below asserts it is never called" - only 3 of 8 do (lines 180, 208, 256). vi.resetAllMocks runs in beforeEach, so afterEach sees each test's call history; the hook never references the PDP service, so a uniform afterEach assertion passes today.
- Fix: add `afterEach(() => expect(papiFrontendProjectDataProviderService.get).not.toHaveBeenCalled())`, drop the 3 per-test assertions, keep the comment (now true).

### 27. New eslint-disable lacks why-justification

- File: `src/renderer/global-this.model.ts:41`
- Rule: .claude/rules/code-quality/eslint-disable-discipline.md requires a why-comment per suppression; the sibling three lines up has "null is used in this API meaning the param is not present", the new one only says what the code does.
- Fix: copy the sibling's one-line justification.

### 28. ResourceDummyScrText duplicated between test suites

- File: `c-sharp-tests/Projects/ScrTextExtensionsTests.cs:129` (duplicate of ManageBooks/ProjectFilterServiceTests.cs:725-731)
- Fix: promote one shared `internal class ResourceDummyScrText : DummyScrText` beside DummyScrText.cs with both pass-through ctors (ProjectFilterServiceTests uses the ProjectDetails ctor at :709; the new test uses parameterless at :110); delete both private copies.

### 29. Parity invariant restated in 4 places

- Files: `c-sharp/Projects/ScrTextExtensions.cs:17-19` and `38-41`, `ProjectMetadata.cs:15-17`, `ScrTextExtensionsTests.cs:11-15`
- The "sourced from the exact same expression as the platform.\* getter, so it matches pdp.getSetting today" prose is duplicated at length (per-property docs are fine as-is).
- Fix: keep the canonical statement in ProjectMetadata's `<remarks>`; replace the others with one-line pointers. Low priority; fold into finding 9's refactor if done.

### 30. startup-waterfall --log arg double-check

- File: `.erb/scripts/startup-waterfall.ts:29`
- `logArgIndex >= 0` tested twice with an `=== undefined` special case. Behaviorally-equivalent simpler form (verified for all five arg shapes) also improves the `--log ""` message:
  compute `const logPath = logArgIndex >= 0 ? process.argv[logArgIndex + 1] : defaultLogPath();` first, then `if (!logPath) { console.error('--log requires a path'); process.exit(1); }`.

---

## Verified non-issues (investigated and REFUTED - do not fix or re-report)

- **StartupTimingTests Console.SetOut race**: registration completes fully synchronously against DummyPapiClient, RunTask's completed-task branch logs inline, NUnit runs sequentially (no Parallelizable anywhere) - no late writes can pollute the redirected writer.
- **Recents 30s retry regression (hook:135)**: main's per-id path went through the SAME internalGetMetadataWithRetries loop (per stale id, i.e. N x 30 enumerations); the new single call is equal or strictly better.
- **Metadata fan-out lacks per-factory error isolation**: true, but pre-existing and the old per-id path had the identical all-factories dependency (getMetadataForProject -> same fan-out).
- **ProjectMetadata.ToString() not extended**: nothing in c-sharp ever stringifies ProjectMetadata/ProjectDetails; noise.
- **"Permanent PDP poisoning on registration failure introduced by this branch"**: pre-existing on main (TryAdd before RunTask, no eviction on registration fault, >10s faults log-only). Only the narrowed finding 12 stands.
- **includeProjectIds service-side case sensitivity**: areProjectIdsEqual uses localeCompare sensitivity:'accent' - case-insensitive; fine.
- **papi.d.ts regeneration**: `npm run build:types` produces zero drift; consistent with regeneration.
- **PT10 Studio overlay patch (~/paratext-10-studio/repo-patches/paranext-core.patch)**: no hunks overlap the rewritten symbols; GetExistingProjectDataProvider semantics preserved.
- **renderer/extension-host global-this import order for markStartup**: correct in all three entry points.
- **vitest .erb include / ts-node script wiring**: tests run and pass; script executes.
