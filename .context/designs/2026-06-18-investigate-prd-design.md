# `/investigate-prd` — PRD Investigation Command (Design)

**Status:** Draft for review · **Date:** 2026-06-18 · **Profile:** `general/`

> **Provenance:** Authored for the ai-prompts `general/` Claude profile during the design of `/investigate-prd`. That profile is now embedded directly in paranext-core, so the capability lives at `.claude/…` and `.context/…` (no `general/` prefix) and this design record lives under `.context/designs/`. References below to `general/`, ai-prompts, PR #326, and the `ai-porting` source reflect that original build context.

## 1. Goal

A user-invoked command in the `general/` Claude profile that reads a product **PRD** (Shape Up document), conducts a deep, **adaptive** investigation, and produces:

1. a **discovery brief** (what the feature is, where the relevant code lives, what already exists to build on, open questions, and a recommended first slice), then — after a human checkpoint —
2. an approved **implementation plan** that sets a developer up to start building.

This replaces the retired automated PT9→PT10 porting workflow (the `ai-porting/` phase-gated pipeline) with a lighter, PRD-driven entry point that **distills the investigation value of that workflow** while dropping its automation scaffolding.

## 2. Background & motivation

The team is moving away from the automated `ai-porting` workflow (phases 0–3, quality gates, golden masters, SRP/BHV traceability IDs, the split-PR lifecycle, step-reviewer between every step) to a **PRD-driven** way of working: the product owner hands off Shape Up PRDs, and engineering investigates and builds.

Crucially, **the discovery/investigation half of the old workflow contains genuinely valuable, reusable technique** — consulting the Feature Inventory, mapping a PT9 feature to its forms/data, archaeology of the PT9 source, and discovering existing PT10 conventions before implementing. This design **mines those bones** rather than reinventing them (see §11). What it deliberately leaves behind is the *automation harness* (§12).

A single PRD may **port/rebuild PT9 feature(s)** (citing PT9 forms like `SendReceiveProjectsForm` and an inventory category, e.g. "Category 10 — Collaboration & Sync"), **introduce entirely new feature(s)** (no PT9 antecedent), **or both at once** — the two are not mutually exclusive. The command breaks the PRD into aspects and investigates each accordingly: a **per-aspect** classification, not a single PORT/NET-NEW label.

## 3. Input: the PRD format (Shape Up)

PRDs follow a Shape Up structure (verified against three real examples in product's hands):

- **Metadata** — problem name, owner, status, **appetite** (the time box), **category** (links to the inventory taxonomy), feature complexity.
- **1. The Problem** — customer pain, who has it, evidence, cost of inaction.
- **2. Appetite & Boundaries** — a table of **non-negotiables / nice-to-haves / no-gos** (the scope budget).
- **3. Shaped Solution** — how it works, key interactions, **rabbit holes** (risky-looking work + the decided approach).
- **4. Risks** — value / usability / feasibility / viability.
- **5. Technical Context** — **systems involved** (often names the PT9 form), known constraints, **open technical questions**.
- **Changelog.**

The **category** + **systems-involved** fields are the bridge to the Feature Inventory and PT9.

## 4. Decisions (from design discussion)

| Decision | Choice |
|---|---|
| **Output** | Discovery brief → (after checkpoint) approved implementation plan. |
| **Access model** | Feature Inventory **bundled into the profile** (travels into paranext-core); PT9 source + the PT10 repo constellation **read live as configured sibling checkouts**, degrade gracefully when absent. |
| **Run model** | **Autonomous → one checkpoint**: investigate end-to-end, present the brief, get approval, then plan. |
| **Structure** | A thin orchestrating **command** + **4 reusable subagents** (also runnable standalone). |
| **Scope** | Adaptive **per aspect**: one PRD may port PT9 feature(s), introduce net-new feature(s), or mix both. |

## 5. Architecture

A user-invoked command orchestrating four well-bounded subagents over a bundled data dir.

```
general/
├── .claude/
│   ├── commands/investigate-prd.md          # orchestrator (thin)
│   └── agents/
│       ├── prd-interpreter.md               # parse + classify the PRD
│       ├── feature-mapper.md                # PT9 feature → inventory map   (port aspects)
│       ├── pt9-archaeologist.md             # read PT9 source → behavior    (port aspects)
│       └── pt10-reuse-scout.md              # sweep the PT10 constellation  (always)
└── .context/research/paratext-9-features/   # bundled Feature Inventory (from lyonsm/)
```

## 6. Flow (autonomous → one checkpoint)

```
/investigate-prd <path-to-prd.md>
  → prd-interpreter ──► normalized PRD + ASPECT BREAKDOWN
                        (each aspect: ports PT9 feature {form/category}  OR  net-new)
  → for each PT9-port aspect:  feature-mapper ─► pt9-archaeologist   ┐ (in parallel with)
    pt10-reuse-scout  (ALWAYS — covers net-new aspects AND reuse/fit ┘  for port aspects)
    (a fully net-new PRD simply has no port aspects → PT9 stages don't run)
  → command synthesizes the DISCOVERY BRIEF (§8)
  → CHECKPOINT: present brief; user reviews / edits / approves
  → hand off to the writing-plans skill → IMPLEMENTATION PLAN
```

The command itself stays thin: it dispatches the agents (in parallel where independent), collates their structured outputs into the brief, runs the checkpoint, and transitions to planning. It owns no investigation logic of its own.

## 7. Components (the 4 agents)

For each: **purpose · inputs · outputs · ai-porting source to mine** (what technique to lift; what scaffolding to drop). Full mining map in §11.

### 7.1 `prd-interpreter` *(always)*
- **Purpose:** parse the Shape Up PRD into a normalized structure and produce an **aspect breakdown**: for each feature/scope item, is it porting an existing PT9 feature (which form + inventory category) or net-new? A PRD can be a **mix** of both. Surface the appetite (scope budget), non-negotiables/no-gos, rabbit holes, and open technical questions.
- **Inputs:** path to the PRD markdown.
- **Outputs:** structured PRD summary + the per-aspect breakdown + the lists above.
- **ai-porting source:**
  - `commands/porting/phase-0-setup.md` **Step 5** extraction rubric — action-verb Goals, the **Non-Goals taxonomy** (related-features-excluded / edge-cases-not-handled / explicit-exclusions), testable success criteria → feeds the appetite/no-gos extraction.
  - `commands/porting/phase-1-discovery.md` **Step 0.5 "Feature Description Review"** — the pre-investigation **soundness gate**: completeness check (scope bounded? goals actionable? non-goals prevent creep?), a blocker taxonomy (missing deps / unclear terms / constraints-contradict-goals / missing access), and the structured `CLARIFICATION-{N}` question format → exactly the interpreter's "surface conflicts + open questions from the PRD."
  - The Shape-Up parsing itself is new (PRDs didn't exist in the old workflow). Drop: the feature-description.md artifact, the step-reviewer P1.1 gate, phase-status bookkeeping.

### 7.2 `feature-mapper` *(runs when ≥1 aspect ports a PT9 feature)*
- **Purpose:** take the PRD's PT9 references (form, category) → look them up in the **bundled Feature Inventory** → return the PT9 entry points (menus/handlers), forms, data classes, manual refs, and source citations. The "where to look in PT9" map.
- **Inputs:** the classification's PT9 features/category; the bundled inventory.
- **Outputs:** an inventory-derived PT9 map (entry points, forms, data, validated sources MS/FR/R/M/H/C).
- **ai-porting source:** `commands/porting/phase-0-setup.md` Step 2.5 "Consult Feature Inventory" (the grep-the-master-index lookup + the MS/FR/M/H/C source-key table mapping inventory codes to PT9 artifact types) + `agents/phase-1-discovery/documentation-scout.md` (help/manual mining; the `<Dialogs>`-field form-class extraction + user-term→code-term glossary). Quality-bar checklist from `.context/standards/review-criteria/discovery-doc-scout-review.md` — the four extraction targets: (1) entry points / menu paths, (2) UI element refs (dialog/control names), (3) step-by-step workflows, (4) domain terminology; (1)+(2) anchor the "where to look in PT9" map, (3)+(4) prime `pt9-archaeologist`. Drop: the porting research-corpus paths, BHV/EXT ID allocation, the `[auto]/[semi]/[human]` gate apparatus.

### 7.3 `pt9-archaeologist` *(for the PT9-port aspects; PT9 present)*
- **Purpose:** read the cited PT9 source (the forms/data `feature-mapper` found) and document what the feature actually **does** — behaviors, data shapes, key flows, edge cases, the backend it talks to (e.g. Chorus/Mercurial for sync).
- **Inputs:** the PT9 map; the PT9 source repo (`~/git/Paratext` or configured path).
- **Outputs:** a behavior/architecture digest of the PT9 feature (citable to file:line).
- **Degradation:** if PT9 isn't checked out, fall back to the inventory's citations and ask the user to point at / paste specific PT9 files.
- **ai-porting source:**
  - **Search recipe (core):** `commands/porting/phase-0-setup.md` **Step 3** — the compact 4-axis source search (entry points → main classes/forms/services → help [grep `HelpData.xml`] → tests [`Paratext.Tests/`]) with concrete grep/find recipes and the ParatextData-vs-Paratext layer split. Right altitude for a single agent.
  - **Archaeology technique:** `agents/phase-1-discovery/archaeologist-{scanner,worker-business,worker-ui,worker-integration,worker-tests}.md` + `requirements-extractor.md` — the layer-category map + the **reverse-dependency "consumer vs definer" scan** (finds the backend a feature talks to); read-base-classes-first / never-document-from-grep discipline; API contracts/invariants/data models; UI enum-per-value behavior tables + embedded-business-logic + exact validation rules; tests-as-behavior-source (assertion→rule, `[TestCase]`→edge-case); data-constraint extraction (char counts, value sets, disabled states).
  - **Behavior-probing heuristics:** `agents/phase-2-specification/spec-generator.md` (mine PT9's own unit tests — test class, inline data constants, `[TestCase]` param→output, helpers, fixtures) + `test-scenario-writer.md` (adversarial edge-case taxonomy — empty/null/boundary/unicode/concurrent/large/corrupt; validation-rule enumeration matrix). For UI features, `ui-spec-generator.md` — framework-agnostic documentation (abstract element-type inventory mapping PT9-control→abstract-type; annotated ASCII wireframes incl. state variants).
  - **Repo-navigation primer:** `.context/Paratext9-Overview.md` — consult-`AGENTS.md`-first per-directory map, noise-cutting search-exclusion globs, and the portable-backend (ParatextData/Checks/PtxUtils) vs must-rewrite-UI (WinForms/MAF/WCF) reuse-triage. Consider bundling a trimmed copy alongside the Feature Inventory as standing PT9 orientation.
  - **Dev-access-gesture flag:** `.context/Pt9-Dev-Access-Inventory.md` — when reading PT9 source, flag developer/power-user functionality hidden behind keyboard gestures (Shift-held-at-open, Shift+click, Ctrl+Shift+click) at file:line; none of the archaeologist workers cover this, and it changes the feature surface. The recurring "PT10 has no dev-mode surface yet" question → a brief open-question.
  - **Quality bar:** `.context/standards/review-criteria/discovery-workers-review.md` — **NO-PT10-IMPLEMENTATION-LEAKAGE** (record WHAT exists + WHERE in PT9 at file:line, without proposing PT10 service names/signatures — reuse-vs-build belongs to `pt10-reuse-scout`) + Verified/Inferred/Unknown confidence markers.
  - **Drop:** the BHV-/EXT-/VAL-/SUBFLOW- ID scheme, golden-master/characterization capture, the A/B/C + LB-PD/LB-UI logic-distribution (porting-effort estimation), the **`archaeologist-consolidator`** merge step (a single agent has nothing to consolidate — every real technique lives in the worker files), and the `worker-assignments.json` / step-review fan-out plumbing.

### 7.4 `pt10-reuse-scout` *(always)*
- **Purpose:** sweep the configured **PT10 repo constellation** — paranext-core, paratext-10-studio, paratext-bible-extensions, paratext-bible-internal-extensions — for existing related code/services/components, decide **where this feature should live** (which repo/extension), and identify what to **reuse vs build**. For net-new aspects this is the *primary* investigation (prior art + fit + reusable infra).
- **Inputs:** the PRD summary + aspect breakdown (incl. port aspects' PT9 form/category); the configured constellation paths. *(The scout runs in parallel with PT9 archaeology, so the `pt9-archaeologist` digest is an optional, often-not-yet-available enrichment — not a required input.)*
- **Outputs:** a PT10 landscape: relevant existing code (per repo), recommended home, reuse-vs-build list, applicable patterns.
- **Repo-relevance heuristic:** sweep the constellation for the feature's key terms / PT9 form names / inventory category; focus where there are hits (internal-only features → `paratext-bible-internal-extensions`; public → `paratext-bible-extensions`/core; app-shell → `paratext-10-studio`).
- **ai-porting source:**
  - `agents/phase-3-planning/alignment-agent.md` — the "discover existing paranext-core conventions before implementing" kernel.
  - **`agents/phase-1-discovery/feature-classifier.md` — the reuse-vs-build assessment** (the scout's defining deliverable, previously uncredited): locate where each behavior's logic lives → classify by type (business rule / calculation / validation / state-transition / data-transformation / decision-tree) → judge the fraction **reusable** from the available surface vs **rewritten**, with complexity tiers. Lift the assessment, drop the A/B/C effort labels.
  - `.context/Paratext10-Overview.md` — a PT10 "where to look" index (core-service file map, directory map, core-extension list); light, since general/ standards already cover most PT10 concepts.
  - One-liner from `agents/phase-3-backend/runtime-verifier.md`: to map an existing extension's command surface, grep `c-sharp/` for `RegisterRequestHandlerAsync` + read the `CommandHandlers` interface in `extensions/src/{ext}/src/types/{ext}.d.ts`.
  - Composes with the `discover-before-implementing.md` rule (#326). Drop: the porting artifact I/O (data-contracts/boundary-map/extraction-plan), the TBD-PT10-alignment outputs, utility-registry, the Step-Review loop, the A/B/C labels.

## 8. Output: the discovery brief

A single markdown brief written to the tracked, shared research area `.context/research/investigations/<prd-slug>/brief.md` (so PRD collaborators get it via git; the developer commits it) containing:

1. **Feature summary** — problem, appetite, non-negotiables, no-gos (from the PRD).
2. **Aspect breakdown** — each feature/scope item tagged: ports PT9 feature *X* / net-new (a PRD may have both).
3. **PT9 reference** *(for port aspects)* — where the logic lives (forms/data/flow), key behaviors, the backend.
4. **PT10 landscape** — what already exists across the constellation, **where the feature should live**, reuse-vs-build.
5. **Open questions & rabbit holes** — from the PRD + anything discovery surfaced.
6. **PRD alignment** — a discrepancy table (*PRD section | original | discovery finding | proposed update*) reconciling the PRD against what investigation found. *(Technique from `phase-1-discovery.md` Step 3.5 "Feature Description Review & Alignment".)*
7. **Scope decisions** — for each unclear boundary, dependency on un-built functionality, or heavy sub-flow surfaced, a structured **3-way option set** (reduce / expand / stub-or-defer) with a size + reuse + required-vs-optional summary and an agent **recommendation — presented for you to decide at the checkpoint, not auto-decided**. *(The "present options, don't auto-decide" heuristic from `AI-Porting-Workflow.md`; fits the one-checkpoint run model.)*
8. **Recommended first slice** — the smallest valuable increment that fits the appetite. **This seeds the implementation plan.**

## 9. Access model, constellation & degradation

- **Feature Inventory:** bundled at `general/.context/research/paratext-9-features/` → always present (travels with the profile into paranext-core). The **bundled copy is the source of truth** going forward; it is brought over **once** from `lyonsm/Paratext_Feature_Inventory/v2` (§13), after which that `lyonsm/` folder is obsolete.
- **Repo constellation** (read live as configured sibling checkouts; `additionalDirectories` / `~/git/<repo>` convention):
  - `Paratext` — PT9 source (port investigations).
  - `paranext-core` — framework.
  - `paratext-10-studio` — the PT10 app shell.
  - `paratext-bible-extensions` — public extensions.
  - `paratext-bible-internal-extensions` — internal (SIL/UBS) extensions.
- **Degradation:** any absent repo → the relevant agent notes the gap and tells the user what to provide (e.g. "PT9 not checked out — paste `SendReceiveProjectsForm.cs` or point me at it"); the brief is still produced from what's available.

## 10. Non-goals (explicitly NOT brought from ai-porting)

Phases & quality gates (G0–G10), `phase-status.json`/`branches.json`, golden masters / characterization / the gm-capture harness, SRP/BHV/TS/INV/CAP/EXT traceability IDs, the split-PR lifecycle + `pr-updater`/`review-manifest-generator`, `step-reviewer`/`work-unit-judge`/the Iterate-Until-Good loop, capability isolation, audit-logging hooks, the ADR governance gate, the utility-registry, the `ai/main` model. The capability produces a **brief + plan**, not gated artifacts.

## 11. Source material from ai-porting (mining map)

| New unit | Mine from | Lift | Drop |
|---|---|---|---|
| `prd-interpreter` | `phase-0-setup.md` §5; `phase-1-discovery.md` §0.5 | Step-5 extraction rubric (Goals / Non-Goals taxonomy / testable success-criteria); Step-0.5 PRD-soundness gate + `CLARIFICATION-{N}` | feature-description artifact, P1.1 gate, phase bookkeeping |
| `feature-mapper` | `phase-0-setup.md` §2.5; `documentation-scout.md`; `review-criteria/discovery-doc-scout-review.md` | inventory lookup + MS/FR/M/H/C key; help/manual mining; the 4 extraction-targets checklist | research-corpus paths, ID allocation, gate apparatus |
| `pt9-archaeologist` | `phase-0-setup.md` §3; `archaeologist-{scanner,workers}.md`; `requirements-extractor.md`; `phase-2-specification/{spec-generator,test-scenario-writer,ui-spec-generator}.md`; `Paratext9-Overview.md`; `Pt9-Dev-Access-Inventory.md`; `review-criteria/discovery-workers-review.md` | 4-axis search recipe; layer-map + reverse-dependency scan; read-in-full; contracts/invariants/entry-points; test-mining + edge-case taxonomy; framework-agnostic UI doc; PT9 repo-nav primer; **dev-access-gesture flag**; no-PT10-leakage + confidence markers | ID schemes, golden masters, A/B/C + logic-distribution, **`consolidator` merge step**, step-review, worker-assignments plumbing |
| `pt10-reuse-scout` | `alignment-agent.md`; **`feature-classifier.md`**; `Paratext10-Overview.md`; `runtime-verifier.md` | discover-existing-conventions kernel; **reuse-vs-build assessment**; PT10 where-to-look index; command-surface grep | porting artifact I/O, A/B/C labels, utility-registry, step-review |
| `investigate-prd` (orchestration) | `phase-1-discovery.md` (§3b); `phase-3-implementation-planning.md` | dispatch + **parallel fan-out** (disjoint inputs → separate outputs); **resume-detection** (idempotent re-runs); the autonomous-but-checkpointed feel | gates, step-reviewer, phase-status, forward-notes/revision-mode |
| discovery-brief (output) | `phase-1-discovery.md` §3.5; `AI-Porting-Workflow.md` | PRD-vs-findings reconciliation discrepancy table; the scope-options **"present-don't-decide"** 3-way heuristic | `ALIGNMENT-{N}`/artifact mechanics, gate framing |
| planning-handoff | `phase-3-planning/{capability-decomposer,strategic-planner}.md` | decompose into a first slice / ordered steps | CAP-ID isolation, micro-phases, TDD-variant gates — defer to the `writing-plans` skill |

**Global de-port rule** (same as PR #326): strip PT9/golden-master/SRP/phase/gate framing, fix any stale `tw-`→`tw:`/PNX codes, and verify every codebase claim against the live repos.

## 12. Edge cases

- PRD references a PT9 feature **not in the inventory** → note the gap; `pt9-archaeologist` searches PT9 directly from the PRD's named form.
- **Fully net-new** PRD (no port aspects) → `feature-mapper` + `pt9-archaeologist` don't run; `pt10-reuse-scout` leads. **Mixed** PRD → PT9 stages run for the port aspects only, alongside the always-on PT10 scan.
- PRD is part of an **epic** (cites sibling PRDs as "separate PRD") → note dependencies; scope investigation to the one PRD.
- A constellation repo **not checked out** → degrade + report what's missing.

## 13. Prerequisites & sequencing

- **Builds on PR #326** (the `general/` consolidation), which is **already merged into `ai/main`** — so its dependencies (the `discover-before-implementing.md` rule, the standards docs) are present. This work lives on its own branch, **`ai/investigate-prd-command`** (already based on the merged `ai/main`), and lands as its **own PR**.
- **Prerequisite task:** bring the Feature Inventory over **once** from `lyonsm/Paratext_Feature_Inventory/v2` into `general/.context/research/paratext-9-features/`; thereafter the bundled copy is canonical and the `lyonsm/` copy is obsolete.

## 14. Open decisions for the implementation plan

> **All resolved during planning.** Resolutions: (1) `/investigate-prd`; (2) bundled snapshot is canonical, no sync; (3) keep the four agents separate; (4) constellation + bundled standards only (flag external research as an open question); (5) documented `~/git/<repo>` convention + degrade (no `settings.json` change); (6) the tracked, shared `.context/research/investigations/<slug>/` (kept); (7) write the brief to disk **and** present an inline checkpoint summary; (8) yes — bundle trimmed `Paratext9-Overview.md` + the dev-access registry (and a trimmed PT10 index). The original options are retained below for the record.

1. **Command name** — `/investigate-prd` vs `/start-feature` vs `/prd`.
2. **Inventory maintenance** — how the bundled inventory is kept current going forward (in paranext-core); the `lyonsm/` source is obsolete after the one-time bring-over, so there's no ongoing sync from it.
3. **Agent granularity** — keep `feature-mapper` + `pt9-archaeologist` separate, or merge into one PT9-discovery agent?
4. **Net-new prior-art depth** — how far `pt10-reuse-scout` reaches (constellation only, or also external/standards research).
5. **Constellation config** — `settings.json` `additionalDirectories` defaults vs a documented `~/git/<repo>` convention vs prompting.
6. **Brief location & lifecycle** — `./.investigate/...` (gitignored) vs a chosen output dir; keep or discard after planning.
7. **Checkpoint UX** — inline summary vs writing the brief to disk and asking the user to read it.
8. **Bundle PT9-orientation references?** — whether to bring trimmed copies of `Paratext9-Overview.md` (the PT9 repo-nav primer) and the dev-access-gesture inventory alongside the Feature Inventory as standing orientation for `pt9-archaeologist`, vs. having the agent rediscover them each run.
