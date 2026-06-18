# ai-porting Content Salvage Audit

**Purpose.** The embedded Claude profile in paranext-core (PRs #2436 + #2438) salvages everything
worth keeping from the retired `ai-porting` workflow. The gated machinery (phases/gates,
step-review, golden-master capture, traceability IDs, the `ai/main` model, the utility registry)
was deliberately dropped. This audit targets the remaining gap: **durable CONTENT** — lasting
paranext-core / PT9 / PT10 knowledge — that lives in the `ai-porting` source but is not yet
represented in the embedded profile.

- **SOURCE (ai-porting):** `/home/paratext/git/ai-prompts/ai-porting` (its `.context/`, `.claude/`)
- **DEST (embedded profile):** `/home/paratext/git/pcwt-embed-claude` (its `.context/`, `.claude/`, `CLAUDE.md`)

Effort key: **S** ≈ a bullet / a paragraph; **M** ≈ a new subsection or a small new file; **L** ≈ a multi-file corpus import.

---

## 1. Executive summary

A substantial amount of durable knowledge is still missing. Across the 60 verifier-confirmed PORT
verdicts, after merging duplicates that describe the same underlying gap, there are **47 distinct
recommendations**. They cluster into a handful of themes:

**The headline gaps (highest value):**

1. **The PT9 reference corpora are absent entirely.** The Paratext 9.5 training manual (47 `.md`
   files), the `ParatextData-PT10-Readiness-Assessment`, the `Paratext-Feature-Porting-Analysis`,
   the BT-team product white paper, and the HelpData XSD/grammar are all referenced by the bundled
   feature inventory, but the documents themselves never came over. This is the single biggest
   content loss — the inventory cites sources DEST does not contain.
2. **Two genuinely-missing high-value C# backend patterns:** `AlertCapture` (surface ParatextData
   `Alert.Show` as `AlertEntry[]` instead of silently swallowing) and the cross-service
   **mutation-notify** pattern (`GetExistingProjectDataProvider(...)?.SendFullProjectUpdateEvent()`).
   Both already exist as *code* in the embedded `c-sharp/` tree but are undocumented as patterns.
3. **PT9→PT10 porting discipline is undocumented.** Legacy-containment, behavioral-preservation,
   the named over-engineering failure modes, "PT9 source is the oracle," "a reference pattern needs
   production consumers," "don't transliterate WinForms control-driven patterns," and the
   de-WinForms idiom mapping (`MessageBox.Show` → error result, `this.control.Text` → parameter,
   `Settings.Default.X` → injected service) — all absent. These are the crispest statements of
   the porting craft and survive independent of the dropped gate machinery.
4. **A cluster of validated quality bars** for components (no `@papi` in `*.component.tsx`,
   stories cover all state variants), backend smoke tests (restart test, stub taxonomy,
   effect-verification), planning (acyclic dependency graph, risk+mitigation, per-unit acceptance),
   and E2E (data assertions beyond `toBeVisible`, cross-screen spans).
5. **Several verified PT10 platform facts** for `/investigate-prd`: no production create-project
   primitive, `WriteLockManager` reuse, the project-Guid lookup mechanism, the shared checklist
   framework reuse map, and the `DifferencesToolForm` shared-surface map.

Most individual items are small (a bullet or a subsection). The corpora are the only **L** efforts.
Nothing high-value is already covered — the 60 PORT verdicts hold up under DEST grep verification;
1 input reclassifies (its only-already-covered half) and the rest are distinct or merged (see §6).

---

## 2. Recommend PORT (highest value first)

Effort and value as judged for **future PRD work in paranext-core** via `/investigate-prd`.
Duplicate verdicts describing one underlying gap are merged into a single row with a merge note.

### 2a. PT9 / PT10 reference corpora (the biggest losses)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 1 | `.context/research/paratext-manual/` → `.context/research/paratext-manual/` (port the 47 `.md` only; **leave behind** the 7.2 MB `images/` and 8.4 MB `paratext_manual.pdf`) | **high** | The 25-chapter PT9.5 user/admin training manual is the `M` source the bundled feature inventory cites 157 times; the inventory points at a corpus DEST doesn't contain. | L |
| 2 | `.context/research/ParatextData-PT10-Readiness-Assessment.md` → same path under DEST | **high** | Per-feature `ParatextData.dll` reuse %, gaps, missing APIs, effort estimates for 6 candidate features — direct input to scoping a PRD. | M |
| 3 | `.context/research/Paratext-Feature-Porting-Analysis.md` → same path under DEST (trim overlaps on import) | **high** | Richest PT9→PT10 archaeology doc: per-feature reusable-vs-rewrite layer map, class/enum/data-structure inventory, recommended PT10 approach + porting order. | M |
| 4 | `.context/research/BT Drafting Tool Requirements.md` → `.context/research/BT-Drafting-Tool-Requirements.md` | med | Nov-2025 Paratext-team white paper: BT role taxonomy + per-role capabilities + product requirements — the "who we serve / what a replacement must do" product knowledge; already cited by the DEST inventory. | M |
| 5 | `.context/schemas/helpdata/HelpData.xsd` **+** `.context/schemas/helpdata/README.md` (merged: same HelpData schema/grammar) → `.context/research/helpdata/HelpData.xsd` + a `HelpData-Reference.md` carrying the Answer-markup grammar and schema-field reference | med | The XSD formally defines `HelpDataItem` structure + the `{...}` Answer markup grammar; the README adds the markup syntax with examples and the `Dialogs`→form-name linking. DEST only has two near-identical technique paragraphs that don't reproduce the grammar. **Merge note:** combines the XSD verdict and the README verdict — both describe the one HelpData schema/grammar gap. | M |

### 2b. C# backend patterns (genuinely missing, high reuse)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 6 | `features/manage-books/adr-review-3-backend.md` **+** `architecture/decision-registry.json` `patterns.csharp.alertCapture` (merged: same `AlertCapture` pattern) → `Paranext-Core-Patterns.md` new "Advanced C# Patterns" subsection + rationale entry in `Architecture-Decisions.md` | **high** | Install `AlertCapture : Alert` at startup; wrap ParatextData calls that raise `Alert.Show`/`ShowLater` in `using var scope = AlertCapture.StartCapture()`; project `scope.Entries` (`AlertEntry[]`) into the wire result; `AsyncLocal` isolates concurrent calls. Without it the warnings are silently swallowed. **Merge note:** registry entry + manage-books ADR describe one pattern. | M |
| 7 | `features/manage-books/adr-review-3-backend.md` **+** `architecture/decision-registry.json` `patterns.csharp.mutationNotify` (merged: same mutation-notify pattern) → `Paranext-Core-Patterns.md` new subsection under NetworkObject + 1-line xref in `.claude/rules/architecture/csharp-patterns.md` | **high** | When a NetworkObject (not a DataProvider) mutates project data that DataProvider subscribers observe via `useProjectSetting`, call `GetExistingProjectDataProvider(projectId)?.SendFullProjectUpdateEvent()`. Sub-rules: notify own-project on create/delete/import; **copy-style notifies destination only**; read-only emits nothing; failed mutations emit nothing; paired calls defer. DEST only covers in-provider `Set*`. **Merge note:** registry entry + manage-books ADR describe one pattern. | M |
| 8 | `.context/standards/backend-smoke-tests.md` (Smoke Test 5, file-format/round-trip) → `Paranext-Core-Patterns.md` new "Writing ParatextData files (Settings.xml / project files)" subsection | **high** | Hard-won ParatextData write facts: `XmlSerializer` emits `true/false` where PT9 wants `T/F`, enum *names* where PT9 wants numbers, dashed GUIDs that `HexId.FromStr()` rejects — use a 40-char HexId, not `Guid.NewGuid()`. | M |
| 9 | `features/manage-books/adr-review-3-backend.md` (Decision #6, partial-success Result) → `Paranext-Core-Patterns.md` new "Partial-success Result contract" note under Exception Handling; 1-line pointer in `csharp-patterns.md` | med | Multi-item C# PAPI ops return `{ Success, Errors[], Warnings[] }` and accumulate per-item failures *inside* the loop rather than throwing (`CopyBooksResult`/`ImportBooksResult`). | S |
| 10 | `features/markers-checklist/adr-review-3-backend.md` (W2, sync delegates) → `Paranext-Core-Patterns.md` note under "Incoming Calls (PAPI Network → C#)" / "Bridging sync/async code" | med | Register NetworkObject/DataProvider delegates as synchronous `Func<>` (not `async Task`) when the underlying SDK work is CPU-bound and synchronous (ParatextData walks) — avoid spurious `Task.Run`. | S |
| 11 | `features/markers-checklist/adr-review-3-backend.md` (W-R1, PNX008 exception) → `Paranext-Core-Patterns.md` add a sentence to the "Polymorphic serialization" bullet | med | PNX008's prose bans `object`/`dynamic` on PAPI methods, but a delegate whose wire shape is a `[JsonPolymorphic]`/`[JsonDerivedType]` discriminated union MAY return `object` (never `dynamic`) so STJ picks the runtime type. | S |
| 12 | `project-backup-and-restore/forward-notes.md` (FN-005, write-locking) → `Paranext-Core-Patterns.md` new "Project write-locking — reuse `ParatextData.WriteLockManager`" subsection near concurrency guidance | med | PT10 already uses `WriteLockManager.ObtainLock(WriteScope.EntireProject)` directly in the PDP and Manage-Books orchestrators — reuse it and port `LockNotObtainedException` without rewrite. | S |

### 2c. PT9→PT10 porting discipline (lessons + invariants)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 13 | `.claude/rules/porting/workflow-rules.md` (lines 37–43, Porting Invariants) → new `.claude/rules/architecture/porting-discipline.md` | **high** | The crispest normative statement of porting discipline: **legacy containment** (preserve behavior, not structure), **behavioral preservation** (intentional change needs docs+approval+tests), **named failure modes** (over-engineering beyond PT9 parity, abstractions without value, inventing requirements). Leave behind the gate harness lines. | M |
| 14 | `mixed-cap/decisions/phase-2-retrospective.md` (oracle) **+** `markers-checklist/decisions/phase-1-decisions.md` (Decision 3) **+** `punctuation-checklist/forward-notes.md` (FN-001/FN-002 reproduce-vs-fix) **+** `review-criteria/discovery-workers-review.md` (Designer.cs-read-alongside-Forms half) (merged: PT9-source-is-the-oracle archaeology discipline) → `.claude/agents/pt9-archaeologist.md` Step 3 read-discipline / quality bar | **high** | Re-verify every decision against the actual PT9 `file:line`; help docs, UI labels, and prior-phase summaries can misdescribe what PT9 does (caught 4 corrections; help said marker mappings were directional, code proved bidirectional); read `*.Designer.cs` alongside its Form; when PT9 has a defensive guard or latent bug, flag it for a reviewer reproduce-vs-fix call. **Merge note:** four feature/review lessons assert one archaeology read-discipline principle. | M |
| 15 | `keyboard-switching/decisions/phase-3-planning-retrospective.md` (reference-pattern callers) → `.claude/rules/architecture/discover-before-implementing.md` append "Validate a reference pattern has production consumers" | **high** | A file you cite as a model to copy must have production callers — grep for them; `greek-esther`'s `useWebViewState('pickerResult')` had zero readers (aspirational scaffolding); the real model was manage-books direct-commit. Directly serves `pt10-reuse-scout`. | S |
| 16 | `keyboard-switching/decisions/phase-1-decisions.md` (don't transliterate WinForms) **+** `.context/templates/extraction-plan-template.md` (de-WinForms idiom mapping) (merged: WinForms de-coupling craft) → new `.claude/rules/architecture/winforms-porting.md` (or a section in `discover-before-implementing.md`); mirror the idiom mapping into `pt10-reuse-scout.md` Step 4 | **high** | Don't replicate WinForms control-driven patterns (scattered static-method callsites) — consolidate into a centralized router/service. Idiom mapping: `MessageBox.Show(...)` → return an error result; `this.control.Text` → method parameter; `Settings.Default.X` → injected parameter/service. **Merge note:** the phase-1 lesson and the extraction-plan mapping are two halves of one de-WinForms technique. | M |
| 17 | `markers-checklist/decisions/phase-3-backend-decisions.md` (Decision 13, line-for-line) → `Paranext-Core-Patterns.md` short "Porting fidelity" note under "Logic Placement" (as a documented *option* with its readability trade-off) + optional ADR for rationale | med | Keep PT9's distinct if-gates/loops as separate blocks with inline PT9 line-number comments so a reviewer can diff against PT9 — don't coalesce gates. | S |
| 18 | `mixed-cap/implementation/alignment-decisions.md` (Decision 4, verbatim wire IDs) → `Paranext-Core-Patterns.md` short "Preserve PT9 persisted/wire identifiers verbatim" note; xref from `csharp-patterns.md` | med | PT9's on-the-wire identifier typo `MixexCapitalization` is the persisted `CheckType.InternalValue` — the PT10 config MUST use the typo to round-trip with PT9-touched project data. | S |
| 19 | `.context/tools/gm-capture/README.md` (running PT9 DLLs under .NET 8) → `Paratext9-Overview.md` new section "Running PT9 APIs programmatically under .NET 8" (extract the technique; leave the gm harness behind) | **high** | Hard-won PT9-archaeology engineering: the ICU native fix, the WinForms split, the `BooksPresent` bitmap, archaeology patterns for running PT9 DLLs under .NET 8 for dynamic characterization. No DEST equivalent. | M |

### 2d. Localization (PT9-specific i18n knowledge)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 20 | `keyboard-switching/decisions/phase-1-decisions.md` (Decision 16) → `Localization-Guide.md` | med | An i18n feature must NOT inherit PT9's English-only surfaces; surfaces PT9 left unlocalized (e.g. early-startup error dialogs shown before the localizer bootstraps) MUST be internationalized in PT10 — a "self-defeating regression" otherwise. | S |
| 21 | `markers-checklist/decisions/phase-3-backend-retrospective.md` (DummyPapiClient default(T)) → `Localization-Guide.md` new "Testing localized C# backends" subsection; xref from `test-runner/reference.md` | med | `DummyPapiClient.SendRequestAsync` returns `default(T)` for unregistered services, so `GetLocalizedString` falls back to its `defaultValue` — wire integration tests still see English if a fallback is supplied. | S |
| 22 | `markers-checklist/decisions/phase-3-backend-retrospective.md` (catalogue Localizer.Str) → `.claude/agents/pt9-archaeologist.md` add a `Localizer.Str` sweep step + a `UserFacingStrings` digest section; xref `Localization-Guide.md` | med | Catalogue PT9 `Localizer.Str` / user-facing strings during discovery so all localize keys are known before backend TDD — Markers shipped two backend strings as English literals because the localization gap was found late. | S |
| 23 | `.claude/rules/code-quality/no-secrets.md` (### PT9 porting subsection) → `.claude/rules/code-quality/no-secrets.md` re-add the "### PT9 porting" subsection | med | When porting PT9 crypto/secrets features, document the *mechanism* (e.g. "AES-256 with key from user config"), never copy keys; use placeholder values in specs/contracts. | S |

### 2e. Component / UI architecture quality bars

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 24 | `review-criteria/ui-design-complete-review.md` (no-@papi + variant coverage) **+** `iteration-criteria/storybook-design-criteria.md` (COMP-002 / COMP-004 / STORY-003 / STORY-004) (merged: component-import-purity + story-coverage rules) → strengthen `Extension-Development-Guide.md` "Presentational Components vs WebView Entry Points" with the grep-enforceable "no `@papi`/`useData`/`useSetting`/`globalThis.webViewComponent` in any `*.component.tsx`" rule; put no-inline-demo-scaffold + all-state-variant + Default-wires-callbacks-to-useState into `Component-Builder-Patterns.md` | **high** | The strongest durable UI rule in the bucket: a presentational `*.component.tsx` is PAPI-decoupled (data flows in via props only); Storybook builds clean and stories cover every wireframe/state variant; demo controls live in a story decorator, not the component. **Merge note:** the gate criteria and the Storybook criteria assert the same two enforceable rules. | M |
| 25 | `manage-books/decisions/adr-review-3-ui-design.md` (component placement) → `.claude/rules/architecture/react-patterns.md` "Component placement: extension src/ vs lib/platform-bible-react" subsection (optional ADR) | med | Feature-specific UI lives in `extensions/src/{ext}/src/`; `lib/platform-bible-react/` is ONLY for multi-consumer reusables. | S |
| 26 | `markers-checklist/decisions/adr-review-3-ui-design.md` (component decoupling) → `.claude/rules/architecture/react-patterns.md` "Decoupling from unmerged lib work" under Component Style Decisions | med | When a component must depend on unmerged/unstable lib work (draft PRs), isolate via abstract props + callbacks so a later phase swaps in the real component. | S |
| 27 | `markers-checklist/decisions/phase-3-ui-decisions.md` (Decision 11, useWebViewState scope) → `.claude/rules/architecture/react-patterns.md` "Web-view UI-state persistence" caveat; xref from `Component-Builder-Patterns.md` | med | `useWebViewState<T>` is scoped per-`webViewId`; `openWebView` mints a new id each call, so close+reopen starts fresh unless the tool reuses its id (the Find tool does). | S |
| 28 | `markers-checklist/decisions/phase-3-ui-decisions.md` (Decision 8 / W-1, union narrowing) → `Paranext-Core-Patterns.md` consuming-side "narrowing a wire discriminated union" note in the serialization section | med | When a C# wire response is a discriminated union with NO named discriminator field, the TS consumer must narrow on property *presence* (`'rows' in response`), never on an absent `success` boolean. | S |
| 29 | `project-backup-and-restore/forward-notes.md` (FN-011, BookGridSelector) → `Component-Selection-Quick-Reference.md` "Book/file comparison grids" reuse note | med | Reuse Manage-Books' `BookGridSelector` (platform-scripture `manage-books-dialog/book-grid.component.tsx`) as the canonical per-row comparison grid rather than building a parallel table. | S |

### 2f. Testing quality bars (framework-agnostic)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 30 | `.context/standards/backend-smoke-tests.md` (Smoke Test 6 stub audit + effect-verification) → `Testing-Guide.md` expand "Side-Effect Verification" | med | The **restart test** (if I call this and restart the app, is the effect still there? if no, it's a stub), the 4-item stub taxonomy, and the reload-from-ParatextData effect-test pattern. | S |
| 31 | `markers-checklist/decisions/phase-3-backend-decisions.md` (Decision 2, C# RED phase) → `.claude/rules/testing/tdd-discipline.md` "C# RED phase" note; 1-liner into `Testing-Guide.md` RED section | **high** | In C# a RED commit can't be test-only — tests won't compile without the referenced types and the pre-commit hook runs `dotnet build`; commit minimal skeleton type stubs alongside the failing tests (no `--no-verify`). | S |
| 32 | `manage-books/adr-review-3-backend.md` (type-name test seam) → `Testing-Guide.md` new "Forcing non-virtual ParatextData outcomes via a type-name seam" under Test Doubles | med | Use a narrow `scrText.GetType().Name == 'LockNotObtainedScrText'` probe to simulate non-virtual/non-mockable PT9 API outcomes — documented in tension with the "use real ParatextData" rule. | S |
| 33 | `manage-books/decisions/phase-3-backend-retrospective.md` (runtime Playwright per-capability) → `Testing-Guide.md` | med | Run Playwright-against-live-app verification early/per-capability — unit tests won't catch cross-cutting wire bugs (e.g. a missing `JsonStringEnumConverter` at the C#↔TS enum boundary). | S |
| 34 | `manage-books/decisions/phase-3-backend-retrospective.md` (global static restore) → `Testing-Guide.md` new C# gotcha beside "ScrTextCollection Index Accumulation" | med | Tests that mutate a global mutable static (`Alert.Implementation`, etc.) must restore it in `try/finally` — unrestored, it silently breaks later-added tests under full-suite runs. (Lesson lives in the *retrospective*, not the ADR file first cited.) | S |
| 35 | `review-criteria/spec-test-scenario-review.md` (coverage mix) → `Testing-Guide.md` "Test scenario coverage mix" note near AI Agent Test Quality Guardrails | med | A healthy scenario mix (heuristic min ~15% edge, ~5% error); logicLayer not blanket-assigned; input/output testability. | S |
| 36 | `iteration-criteria/journey-test-criteria.md` (E2E assertion depth) → `Testing-Guide.md` E2E section "Journey/E2E assertion quality" note | med | Cross-screen journey/E2E tests must include DATA assertions (`toHaveValue`/text), beyond `toBeVisible`, and span 2+ work packages. (The UI-only/no-PAPI-shortcut principle is already covered.) | S |

### 2g. Planning / agent-authoring conventions

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 37 | `review-criteria/strategic-plan-review.md` (plan quality bars) → "Plan quality bars" note in `.claude/commands/investigate-prd.md` Step 7 | med | (1) capability/task dependencies form an acyclic graph that drives execution order; (2) explicit risk + concrete-mitigation pairs; (3) per-unit acceptance criteria / "done when". (TDD-for-backend / Component-First-for-UI already covered.) | S |
| 38 | `claude-md/CLAUDE.md` (§ Agent/Command/Skill Authoring Rules) → new `.claude/rules/agent-authoring-link-dont-paraphrase.md` | med | Never paraphrase standards in an agent/command; link to `.context/standards/` instead, so agents don't go stale; reference skills by name; what can be inline vs must be linked. | S |
| 39 | `mixed-cap/decisions/phase-3-planning-retrospective.md` (Decision 3a, command signature conformance) → `.claude/rules/architecture/extension-patterns.md` | med | Conform a net-new command's signature to its established siblings (bare `(webViewId?) → Promise<string\|undefined>`); derive context (projectId/reference/SBA) from state, don't add open params. | S |

### 2h. TypeScript / C# conventions (small)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 40 | `architecture/decision-registry.json` `patterns.typescript.statelessService / statefulService / processSpecificService` → `.claude/rules/architecture/shared-patterns.md` new "TypeScript Service Authoring"; 1-line pointer in `Architecture.md` §Service Layer | med | The TS service-authoring triplet: **stateless** = function exports (tree-shakeable, no class); **stateful** = module-level state + `initialize()`/`shutdown()`; **process-specific** = factory + dynamic import. DEST covers the proxy axis but not the authoring shape. | S |
| 41 | `architecture/decision-registry.json` `naming.types.libraryExposedTypes` → `Code-Style-Guide.md` TS Guidelines, single bullet | low | Shared-library exported types are namespace-prefixed to be collision-proof (`ManageBooksAlertEntry`); consumers re-import under bare aliases. Verified one-feature note — port as a single minor bullet. | S |

### 2i. Cross-platform / library choices

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 42 | `keyboard-switching/implementation/alignment-decisions.md` (Decision #13, native keyboarding) → `Paranext-Core-Patterns.md` "Library Choices" — extend the D-Bus bullet (~57–60) with the full per-platform recipe | med | Windows P/Invoke `user32.dll` `GetKeyboardLayoutList`/`ActivateKeyboardLayout` (+ `SIL.Windows.Forms.Keyboarding` .NET8 TFM caveat); Linux IBus `ListEngines`/`SetGlobalEngine` over `Tmds.DBus.Protocol` (no-op when daemon absent); macOS HIToolbox TIS `TISSelectInputSource` (+ Carbon-survival & signed-build entitlements caveats). Scope to Decision #13 only. | M |

### 2j. Architectural placement decisions (PT10 philosophy)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 43 | `keyboard-switching/implementation/alignment-decisions.md` (Decision #21, host placement) → `Paranext-Core-Patterns.md` extend "Logic Placement"; xref `csharp-patterns.md`/`shared-patterns.md` | **high** | The inverse of "ParatextData logic stays in C#": OS-state/UI-adjacent services (focus, WebViewDefinition, settings — NOT ParatextData) belong in a TypeScript service host; the C# data-provider process is reserved for ParatextData-backed services. | S |
| 44 | `keyboard-switching/implementation/alignment-decisions.md` (Decision #30, projectInterfaces not ProjectKind) → `Paranext-Core-Patterns.md` "prefer projectInterfaces predicates over a ProjectKind enum" near the "Adding a projectInterface" mechanics; xref `react-patterns.md` + `Component-Selection-Quick-Reference.md` | **high** | Drive variant/visibility logic from `projectInterfaces` capability predicates ("what can this project do?"), NOT a PT9-style `ProjectKind` typology — PT10's extensibility model is interface-based. | S |
| 45 | `keyboard-switching/implementation/alignment-decisions.md` (Decision #25 / RM-010) **+** `manage-books/implementation/alignment-decisions.md` (Decision 10, menu availability deferred) (merged: DataProvider/menu placement decisions) → for #25: `Paranext-Core-Patterns.md` note under "NetworkObject Classes" / DataProvider-vs-NetworkObject; for menu-availability: new ADR-0003 in `Architecture-Decisions.md` + xref in `Entry-Point-Guide.md` | med | (a) A C# layer that is the actual *writer* of mutable shared state should be a DataProvider, not a NetworkObject, so external PAPI mutations stay observable via subscription. (b) paranext-core has no predicate-gated menu visibility — menus stay always-available and backends check permission/state at submission and surface `PlatformError` codes. **Merge note:** both are DataProvider/menu placement decisions with rationale; grouped as one row, two ADR-style notes. | S |

### 2k. PT10 verified platform facts (for /investigate-prd)

| # | Source → DEST home | Value | Why (one line) | Effort |
|---|---|---|---|---|
| 46 | `project-backup-and-restore/forward-notes.md` (FN-010, no create-project) → new ADR in `Architecture-Decisions.md` "PT10 has no production create-project primitive" | **high** | Verified gap (2026-05-19 grep): no production create-project / `AddProject` / `ProjectPropertiesForm` equivalent; the PDP factory only registers PDPs for projects already on disk; only sample/test refs exist. | S |
| 47 | `punctuation-checklist/forward-notes.md` (FN-003 reuse map) **+** `mixed-cap/implementation/alignment-decisions.md` (inventory infra reuse) **+** `punctuation-checklist/forward-notes.md` (FN-003/FN-004 global-verse-range divergence) **+** `project-backup-and-restore/forward-notes.md` (FN-003 project-Guid lookup; FN-001 DifferencesToolForm) (merged: PT10 reuse-map + verified platform facts) → checklist reuse map → `Architecture-Decisions.md` + xref `08_Checklists.md`; inventory reuse fact → `06_Checking_Inventories.md`; verse-range divergence → `08_Checklists.md`; project-Guid → `paratext-10-orientation.md`; DifferencesToolForm → `09_Advanced_Checking_Tools.md` §9.3 + `paratext-10-orientation.md` | **high** | Reuse map for porting any new checklist (consume the markers `IChecklistService`/data-model/components, re-extract small pieces, add `ChecklistRowBuilder.BuildRowsNonMergingCells` upstream); the 6 sibling inventories already run on the shared `InventoryFactory`+generic `InventoryDataProvider` (zero net-new C#); PT9 verse-range is GLOBAL across checklist tools while PT10 markers stores it per-instance via `useWebViewState` (tracked ai-prompts#271); project-Guid is read from `Settings.xml /ScriptureText/Guid` via `LoadProjectDetails`; `DifferencesToolForm` is a shared PT9 verse-diff dialog used by 5+ callers with no PT10 port. **Merge note:** five `forward-notes`/alignment reuse-and-fact nuggets all populate the PT10 reuse map + the feature inventory — grouped because they are extracted facts, not separate doc imports. Strip the FN-###/EXT-###/gm harness IDs. | M |

---

## 3. Already covered (DEST evidence)

One half of one input reclassifies as already-covered; the rest of the 60 are distinct or merged.

- **`review-criteria/discovery-workers-review.md` — "no PT10 implementation leakage" half:** already
  in `.claude/agents/pt9-archaeologist.md:169` ("NO PT10 IMPLEMENTATION LEAKAGE (critical): record
  WHAT logic exists…"). Only the *Designer.cs-read-alongside-Forms* half of that input is a PORT
  (folded into **item 14**, archaeology read-discipline).

The 3 separate verifier-supplied ALREADY-COVERED inputs (outside the 60) remain already-covered:
- YAGNI / "PT9 oracles win" / "reject loudly over silent no-ops" — represented in DEST.
- Level-B logic placement — `Paranext-Core-Patterns.md` "Logic Placement" already answers it.
- ParatextData boundary analysis — `Testing-Guide.md:183,250` ("real ParatextData is the oracle;
  NEVER mock it") supersedes its premise.

---

## 4. Intentionally leave behind (harness, or superseded)

The 7 verifier LEAVE-BEHIND inputs, grouped:

- **Harness gate wrappers whose durable rules are already ported:** `review-criteria/tdd-green-review.md`
  (no-stub/no-TODO + implement-only-what's-asked already in DEST), `checklists/phase-1-validation.md`
  (G1.5 gate form; discovery-completeness bars already covered).
- **Superseded planning proposals (now shipped as code):** `research/csharp-analyzer-options.md`
  (analyzer choices already adopted in `.editorconfig`/CI).
- **Orphaned instruction-layers for absent corpora / obsolete tooling:**
  `schemas/paratext-manual/README.md` (corpus-structure doc; port only if the manual corpus is
  imported, as part of item 1), `.claude/scripts/extract-pdf-manual.py` (one-shot PDF extractor; not
  the regenerator it claims to be).
- **Doctrine whose durable kernel is fully covered:** `AI-Porting-Workflow.md` Proof-of-Work
  (the Revert Test is already ported; the rest is the dropped gate doctrine).
- **Partially-covered registry block:** `decision-registry.json` `patterns.errorHandling`
  (3 of 4 sub-keys — platformErrorCodes, backendLocalization, logging — already in DEST; the
  `Result<T>` axis adds little and is low value).

---

## 5. Open questions / judgment calls for the human

1. **The PT9 manual corpus (item 1, ~348 KB of `.md`).** Bring the 47 `.md` files but explicitly
   drop the 7.2 MB `images/` and 8.4 MB PDF? The inventory cites the manual by chapter/section, not
   by image — text-only keeps the references resolvable without bloating the repo. Confirm the
   image-drop is acceptable.
2. **`AlertCapture` / mutation-notify: doc vs code.** Both patterns already exist as *code* in the
   embedded `c-sharp/` tree (e.g. `AlertCapture.cs`, the `SendFullProjectUpdateEvent` call sites in
   the Manage-Books service). Items 6–7 document them as reusable patterns. Confirm you want the
   prose even though the code already ships — the value is teaching the *next* feature to apply it.
3. **New rule file vs section.** Items 13 (porting-discipline) and 16 (winforms-porting) propose new
   `.claude/rules/architecture/*.md` files. Prefer new one-rule files (matching the existing
   `grep-safety-net.md` convention) or fold into `discover-before-implementing.md`?
4. **Big-doc trimming.** Items 2–3 (Readiness Assessment, Porting Analysis) overlap the bundled
   feature inventory. Import whole (fast, some redundancy) or trim overlaps on the way in (slower,
   cleaner)? Recommend import-whole-then-prune-later.
5. **`helpdata` home.** Item 5 proposes `.context/research/helpdata/`. Is a dedicated dir warranted
   for one XSD + one grammar reference, or fold the grammar into a `paratext-9-features/HelpData-Reference.md`?

---

## 6. Reconciliation (MANDATORY) — all 60 PORT verdicts accounted for

Each input PORT source is listed with its disposition. **42 inputs map to a distinct kept item**
(items 1–47, where some kept items absorb a registry/ADR dup) + **17 merged-into** + **1
reclassified (split half)** = **60**. Distinct recommendations in §2 = **47**.

| Input # | Input PORT source (abbrev) | Disposition |
|---|---|---|
| 1 | registry `statelessService/statefulService/processSpecificService` | kept as **item 40** |
| 2 | registry `patterns.csharp.alertCapture` | **merged into item 6** (dup of manage-books AlertCapture) |
| 3 | registry `patterns.csharp.mutationNotify` | **merged into item 7** (dup of manage-books mutation-notify) |
| 4 | registry `naming.types.libraryExposedTypes` | kept as **item 41** |
| 5 | keyboard-switching alignment — native keyboarding (Decision #13) | kept as **item 42** |
| 6 | keyboard-switching alignment — C# reserved for ParatextData / TS host (Decision #21) | kept as **item 43** |
| 7 | keyboard-switching alignment — writer-of-state = DataProvider (Decision #25/RM-010) | **merged into item 45** (DataProvider/menu placement group) |
| 8 | keyboard-switching alignment — projectInterfaces not ProjectKind (Decision #30) | kept as **item 44** |
| 9 | keyboard-switching phase-1 — don't transliterate WinForms | **merged into item 16** (de-WinForms craft) |
| 10 | keyboard-switching phase-1 — i18n must not inherit English-only (Decision 16) | kept as **item 20** |
| 11 | keyboard-switching phase-3-planning — reference pattern needs callers | kept as **item 15** |
| 12 | manage-books adr-review-3-backend — AlertCapture AsyncLocal | kept as **item 6** (registry dup merged in) |
| 13 | manage-books adr-review-3-backend — mutation-notify SendFullProjectUpdateEvent | kept as **item 7** (registry dup merged in) |
| 14 | manage-books adr-review-3-backend — partial-success Result (Decision #6) | kept as **item 9** |
| 15 | manage-books adr-review-3-backend — type-name test seam | kept as **item 32** |
| 16 | manage-books adr-review-3-backend (→retrospective) — restore global static in try/finally | kept as **item 34** |
| 17 | manage-books alignment — menu availability deferred (Decision 10) | **merged into item 45** (DataProvider/menu placement group) |
| 18 | manage-books adr-review-3-ui-design — component placement | kept as **item 25** |
| 19 | manage-books phase-3-backend-retrospective — runtime Playwright per-capability | kept as **item 33** |
| 20 | mixed-cap alignment — preserve PT9 wire IDs verbatim (Decision 4) | kept as **item 18** |
| 21 | mixed-cap alignment — inventory infra reuse-dominated | **merged into item 47** (PT10 reuse-map/facts) |
| 22 | mixed-cap phase-2-retrospective — PT9 source is the oracle | **merged into item 14** (oracle archaeology) |
| 23 | mixed-cap phase-3-planning-retrospective — conform command signature (Decision 3a) | kept as **item 39** |
| 24 | markers-checklist adr-review-3-backend — sync Func<> delegates (W2) | kept as **item 10** |
| 25 | markers-checklist adr-review-3-backend — PNX008 object-return exception (W-R1) | kept as **item 11** |
| 26 | markers-checklist adr-review-3-ui-design — component decoupling via abstract props | kept as **item 26** |
| 27 | markers-checklist phase-3-ui — useWebViewState per-webViewId (Decision 11) | kept as **item 27** |
| 28 | markers-checklist phase-3-ui — narrow union on property presence (Decision 8) | kept as **item 28** |
| 29 | markers-checklist phase-3-backend — C# RED-phase skeleton stubs (Decision 2) | kept as **item 31** |
| 30 | markers-checklist phase-3-backend — line-for-line PT9 structure (Decision 13) | kept as **item 17** |
| 31 | markers-checklist phase-3-backend-retro — DummyPapiClient default(T) localization | kept as **item 21** |
| 32 | markers-checklist phase-3-backend-retro — catalogue Localizer.Str in discovery | kept as **item 22** |
| 33 | markers-checklist phase-1 — help docs can contradict code (Decision 3) | **merged into item 14** (oracle archaeology) |
| 34 | punctuation-checklist forward-notes — shared checklist framework reuse map (FN-003) | **merged into item 47** (PT10 reuse-map/facts) |
| 35 | punctuation-checklist forward-notes — global verse range divergence (FN-003/004) | **merged into item 47** (PT10 reuse-map/facts) |
| 36 | punctuation-checklist forward-notes — bug-for-bug reviewer call (FN-001/002) | **merged into item 14** (reproduce-vs-fix archaeology) |
| 37 | project-backup-and-restore forward-notes — no create-project primitive (FN-010) | kept as **item 46** |
| 38 | project-backup-and-restore forward-notes — DifferencesToolForm shared (FN-001) | **merged into item 47** (PT10 reuse-map/facts) |
| 39 | project-backup-and-restore forward-notes — WriteLockManager reuse (FN-005) | kept as **item 12** |
| 40 | project-backup-and-restore forward-notes — project Guid lookup (FN-003) | **merged into item 47** (PT10 reuse-map/facts) |
| 41 | project-backup-and-restore forward-notes — reuse BookGridSelector (FN-011) | kept as **item 29** |
| 42 | backend-smoke-tests — stub audit + restart + effect-verification | kept as **item 30** |
| 43 | backend-smoke-tests — file-format/round-trip/HexId (Smoke Test 5) | kept as **item 8** |
| 44 | review-criteria/discovery-workers-review — Designer.cs + no-PT10-leakage | **split:** no-PT10-leakage = already-covered (`pt9-archaeologist.md:169`); Designer.cs half **merged into item 14** |
| 45 | review-criteria/spec-test-scenario-review — coverage mix | kept as **item 35** |
| 46 | review-criteria/strategic-plan-review — plan quality bars | kept as **item 37** |
| 47 | review-criteria/ui-design-complete-review — no-@papi + variant coverage | **merged into item 24** (component-purity + story-coverage) |
| 48 | iteration-criteria/journey-test-criteria — E2E assertion depth | kept as **item 36** |
| 49 | iteration-criteria/storybook-design-criteria — COMP-002/004, STORY-003/004 | **merged into item 24** (component-purity + story-coverage) |
| 50 | research/paratext-manual/ corpus | kept as **item 1** |
| 51 | research/ParatextData-PT10-Readiness-Assessment.md | kept as **item 2** |
| 52 | research/Paratext-Feature-Porting-Analysis.md | kept as **item 3** |
| 53 | research/BT Drafting Tool Requirements.md | kept as **item 4** |
| 54 | schemas/helpdata/HelpData.xsd | kept as **item 5** (README merged in) |
| 55 | schemas/helpdata/README.md | **merged into item 5** (HelpData schema/grammar) |
| 56 | tools/gm-capture/README.md — PT9 DLLs under .NET 8 | kept as **item 19** |
| 57 | templates/extraction-plan-template.md — de-WinForms idiom mapping | **merged into item 16** (de-WinForms craft) |
| 58 | rules/porting/workflow-rules.md — porting invariants | kept as **item 13** |
| 59 | rules/code-quality/no-secrets.md — PT9 porting subsection | kept as **item 23** |
| 60 | claude-md/CLAUDE.md — link-don't-paraphrase authoring rule | kept as **item 38** |

**Tally.**
- Kept as a distinct §2 item: inputs #1, 4, 5, 6, 8, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 39, 41, 42, 43, 45, 46, 48, 50, 51, 52, 53, 54, 56, 58,
  59, 60 = **42**.
- Merged into an existing kept item: inputs #2, 3, 7, 9, 17, 21, 22, 33, 34, 35, 36, 38, 40, 47,
  49, 55, 57 = **17**.
- Reclassified split (input #44): one half already-covered, the other merged into item 14 = **1**.

**42 + 17 + 1 = 60.** Every PORT verdict is accounted for. Distinct recommendations in §2 = **47**.
