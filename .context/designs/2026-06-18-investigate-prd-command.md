# `/investigate-prd` Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Provenance:** This plan was authored and executed for the ai-prompts `general/` Claude profile; that profile is now embedded directly in paranext-core. The delivered capability lives at `.claude/…` and `.context/…` (no `general/` prefix), and this plan + its design spec live here under `.context/designs/`. The `general/…` paths, the ai-prompts / `ai-porting` source-mining, and PR #326 references throughout reflect that original build context — kept as the historical record.

**Goal:** Add a `/investigate-prd <prd>` command to the `general/` Claude profile that reads a Shape-Up PRD, runs an adaptive per-aspect investigation (port PT9 feature(s) AND/OR net-new) via four reusable subagents over a bundled Paratext-9 Feature Inventory, produces a discovery brief, then after one human checkpoint hands off to the writing-plans skill.

**Architecture:** A thin orchestrating command dispatches four read-only subagents — `prd-interpreter` (always), `feature-mapper` + `pt9-archaeologist` (per PT9-port aspect), `pt10-reuse-scout` (always). The Feature Inventory and trimmed PT9/PT10 orientation docs are **bundled** into `general/.context/research/`; the live PT9 source and PT10 repo constellation are read from sibling checkouts under `~/git/`, degrading gracefully when absent. Output is a markdown brief written to the tracked, shared `.context/research/investigations/<prd-slug>/`, then writing-plans.

**Tech Stack:** Markdown command + agent files (Claude Code `general/` profile); no executable code. "Tests" are structural verifications (frontmatter parse, link/path checks, required-section greps, a de-port leakage sweep) plus one end-to-end smoke run against a real example PRD.

**Deliverable nature:** This project produces **prompt/markdown artifacts**, not runtime code. The TDD cycle is adapted: each task writes a concrete verification check, confirms it fails (file/section absent), authors the artifact, confirms it passes, and commits.

## Global Constraints

Every task implicitly includes these. Exact values copied from the spec (`.context/designs/2026-06-18-investigate-prd-design.md`) and the verified conventions survey.

- **De-port rule (from PR #326):** strip all PT9-porting/golden-master/SRP/phase/gate framing from any mined material — no phase/gate IDs (G0–G10, P1.x), no BHV/EXT/VAL/TS/SUBFLOW/CAP traceability IDs, no `phase-status.json`/`branches.json`, no golden-master/characterization, no split-PR lifecycle, no `archaeologist-consolidator`/`step-reviewer`/worker-assignments plumbing. Keep the *technique*, drop the *harness*.
- **Tailwind & lint codes:** if any mined snippet shows `tw-`/`pr-` prefixes, rewrite to `tw:`. Do not introduce fabricated lint codes (PNX011/PNX006 are not real; PNX001/004/005/007/008 are).
- **Verify codebase claims live:** any concrete PT9/PT10 path, class, or command named in an authored file must be verifiable against `~/git/Paratext` or `~/git/paranext-core`. Prefer the worked-example facts already verified in the inventory (e.g. Send/Receive → `SendReceiveProjectsForm` → inventory 10.1).
- **Command file convention:** optional YAML frontmatter; when present, `description` is the only key (pack an example invocation into it). Body opens with an H1 + one-line purpose, uses `## Overview`, `## Step N: <Name>`, `$ARGUMENTS` for the argument, blockquotes for literal user-facing text, fenced `bash` for literal commands.
- **Agent file convention:** frontmatter has `name` (kebab-case, **exactly equal to the filename stem**) + double-quoted `description`; read-only agents use `allowed-tools: Bash, Read, Grep, Glob` (no `model` key) and state up front "Read-only … Do NOT use Edit, Write, or any file-modifying tools." Body: H1 + role, `## Inputs`, a "read X first" directive, `## Step N — <Name>` (em-dash), `## Output`, `## Status reporting`. Empty sections get `None.` sentinels.
- **Dispatch convention:** commands launch a named agent with the Agent tool using `subagent_type: "<agent-name>"`; parallel agents must be dispatched **in a single response**. Status tokens shared command↔agent: `DONE` / `DONE_WITH_CONCERNS` / `BLOCKED` / `NEEDS_CONTEXT`.
- **Link & path conventions:** markdown cross-reference links from an agent file use `../../.context/...`; **runtime** grep/read paths (what an agent executes against the consuming repo's cwd, where `.context/` is a symlink) use `.context/research/...`.
- **Present options, don't auto-decide:** every checkpoint and every scope/ambiguity decision is presented to the human with a recommendation — never silently decided.
- **No settings.json change:** repo access uses the documented `~/git/<repo>` convention + graceful degradation. Do **not** add `additionalDirectories` or any path to `general/.claude/settings.json` (decision #5). `Edit/Write(.claude/settings.json)` is denied anyway.
- **Brief is shared, not gitignored:** the command writes the brief to the tracked research area `.context/research/investigations/<slug>/brief.md` so PRD collaborators get it via git (today through the ai-prompts profile repo; after `general/` moves into paranext-core, through paranext-core — the path is migration-stable). The command never auto-commits — the developer commits the brief in their normal flow.
- **Do not edit `~/git/paranext-core` directly** and do not delete the `lyonsm/` source in this plan (mark it obsolete only).

## File Structure

**Create:**
- `general/.context/research/paratext-9-features/` — bundled Feature Inventory: `00_Master_Feature_Index.md` + `01_*`…`16_*` category files (17 from source) + a new `README.md` (provenance + maintenance). 18 files total.
- `general/.context/research/Paratext9-Overview.md` — trimmed PT9 repo-navigation primer.
- `general/.context/research/Pt9-Dev-Access-Inventory.md` — seeded dev-access-gesture registry (format + DEV-001 worked example).
- `general/.context/research/paratext-10-orientation.md` — trimmed PT10 "where to look" index (complements `.context/standards/Architecture.md`; see Task 3).
- `general/.claude/agents/prd-interpreter.md`
- `general/.claude/agents/feature-mapper.md`
- `general/.claude/agents/pt9-archaeologist.md`
- `general/.claude/agents/pt10-reuse-scout.md`
- `general/.claude/commands/investigate-prd.md`

**Modify:**
- `general/claude-md/CLAUDE.md` — add one Reference-Documentation pointer to the bundled inventory *(small, Task 9)*.

**Runtime-created (not an authored deliverable):** `general/.context/research/investigations/<prd-slug>/brief.md` — the per-PRD discovery brief the command writes; tracked and shared via git (the developer commits it).

**Leave untouched:** `general/.claude/settings.json`; `lyonsm/Paratext_Feature_Inventory/**` (mark obsolete in the new README, do not delete).

---

## Task 1: Bundle the Feature Inventory

**Files:**
- Create dir: `general/.context/research/paratext-9-features/`
- Copy: `lyonsm/Paratext_Feature_Inventory/v2/{00_Master_Feature_Index,01..16}_*.md` → the new dir
- Create: `general/.context/research/paratext-9-features/README.md`

**Interfaces:**
- Produces: the canonical bundled inventory at runtime path `.context/research/paratext-9-features/`, with `00_Master_Feature_Index.md` as the lookup hub and per-category files `NN_<Name>.md`. `feature-mapper` (Task 5) greps these.

- [ ] **Step 1: Write the failing check**

Run (expect the dir to be absent → check "fails"):
```bash
ls general/.context/research/paratext-9-features/*.md 2>/dev/null | wc -l
```
Expected now: `0` (no such directory).

- [ ] **Step 2: Copy the inventory, dropping the source README**

The source README references a sibling `docs/` folder (one level up) that we are not bundling, so its links would dangle — we replace it with our own provenance README.
```bash
mkdir -p general/.context/research/paratext-9-features
cp lyonsm/Paratext_Feature_Inventory/v2/*.md general/.context/research/paratext-9-features/
rm general/.context/research/paratext-9-features/README.md
```

- [ ] **Step 3: Write the provenance README**

Create `general/.context/research/paratext-9-features/README.md`:
```markdown
# Paratext 9 Feature Inventory (bundled)

A catalogue of Paratext 9 features — for each: entry points (menus/handlers/shortcuts),
forms/dialogs, implementing C# classes (with `file:line` evidence), manual and HelpData
references, and which sources corroborate each finding. Used by the `feature-mapper` agent
(and `/investigate-prd`) to map a PRD's PT9 references to "where to look in PT9."

## How it's organized

- `00_Master_Feature_Index.md` — the lookup hub: a **Category Overview** (per-category file +
  feature table) and an **Alphabetical Index** (`- **Feature name** → C.F`). Start here.
- `NN_<Category>.md` — 16 category files. A "category" is the 2-digit prefix; a feature ID is
  `C.F` (category.feature), e.g. `10.1` = Send/Receive in `10_Collaboration_Sync.md`.

## Source codes

| Code | Source | PT9 artifact |
|:----:|--------|--------------|
| MS | Menu Structure | menu paths + Click-handler names/lines |
| FR | Form Relationships | WinForms forms / which form opens which dialog |
| R  | Requirements | requirements spec |
| M  | Manual | Paratext User Manual chapters |
| H  | HelpData | `HelpData.xml` context-help items (GUID + question + dialog) |
| C  | Code | Paratext C# source files |

## Provenance & maintenance

- Brought over **once** on 2026-06-18 from `ai-prompts/lyonsm/Paratext_Feature_Inventory/v2/`
  (source last verified 2026-01-21). **This bundled copy is now the source of truth.**
- The `lyonsm/` copy is obsolete — do not sync from it. Going forward, edit these files
  directly (here, and once this profile lands in paranext-core, there).
```

- [ ] **Step 4: Verify the bundle**

```bash
ls general/.context/research/paratext-9-features/*.md | wc -l          # expect 18
ls general/.context/research/paratext-9-features/00_Master_Feature_Index.md  # exists
grep -rn 'SendReceiveProjectsForm' general/.context/research/paratext-9-features/*.md | head   # join key resolves
grep -c '^### 10\.' general/.context/research/paratext-9-features/10_Collaboration_Sync.md      # expect 7
```
Expected: `18`; the index file lists; the form name appears in `10_Collaboration_Sync.md`; `7` features in category 10.

- [ ] **Step 5: Verify no dangling links into the dropped `docs/` folder**

```bash
grep -rn 'docs/AGENTS\|docs/FEATURE_TEMPLATE\|docs/PROJECT_INSTRUCTIONS' general/.context/research/paratext-9-features/
```
Expected: no output (the only file that referenced `docs/` was the source README we removed).

- [ ] **Step 6: Commit**

```bash
git add general/.context/research/paratext-9-features/
git commit -m "feat(investigate-prd): bundle Paratext 9 Feature Inventory into general/"
```

---

## Task 2: Bundle the trimmed PT9 orientation references

**Files:**
- Create: `general/.context/research/Paratext9-Overview.md`
- Create: `general/.context/research/Pt9-Dev-Access-Inventory.md`

**Interfaces:**
- Produces: standing PT9 orientation for `pt9-archaeologist` (Task 6) at runtime paths `.context/research/Paratext9-Overview.md` and `.context/research/Pt9-Dev-Access-Inventory.md`.

- [ ] **Step 1: Write the failing check**

```bash
ls general/.context/research/Paratext9-Overview.md general/.context/research/Pt9-Dev-Access-Inventory.md 2>/dev/null
```
Expected now: not found.

- [ ] **Step 2: Author the trimmed `Paratext9-Overview.md`**

Read the source `ai-porting/.context/Paratext9-Overview.md` for the live directory facts, then create `general/.context/research/Paratext9-Overview.md` with exactly these four load-bearing pieces (drop any phase/gate/porting framing per the de-port rule):
```markdown
# Paratext 9 — Repository Navigation Primer

Orientation for reading the PT9 source (`~/git/Paratext`). For detailed architecture,
code patterns, and gotchas, **always consult the repo's own `AGENTS.md` files first** —
this primer is only for orientation, search exclusions, and reuse triage.

## Consult AGENTS.md first

- Root `AGENTS.md` — build commands, solution files, architecture, key components, test
  projects, code style. (`CLAUDE.md` just points to `AGENTS.md`.)
- Per-directory `AGENTS.md` carry the depth: `ParatextData/` (core abstractions, USFM
  parsing, write-lock system, patterns, gotchas), `ParatextBase/` (window system, edit
  handlers, plugin system, themes, MegaMenu), `ParatextChecks/` (checking engine),
  `Paratext/` (main app), `PtxUtils/` (utilities), `BiblicalTerms/`, `FormattedEditor/`,
  `HtmlEditor/`, `HelpSystem/`.
- **Division of labor:** use *this* file for search exclusions / reuse triage / high-level
  orientation; use `AGENTS.md` files for architecture / code patterns / gotchas.

## Search exclusions (cut the noise)

Exclude `**/.git/**`, `/DataAccessServer/`, `/DataAccessServer.Tests/`, `/PA/` (none are
relevant to PT10 work). Ripgrep form:

    rg "SearchTerm" ~/git/Paratext -t cs \
      --glob '!**/.git/**' --glob '!**/DataAccessServer/**' \
      --glob '!**/DataAccessServer.Tests/**' --glob '!**/PA/**'

## Layer reuse triage (portable backend vs rewrite-UI)

- **Portable C# backend (reusable):** `ParatextData/` (.NET Standard 2.0, cross-platform),
  `ParatextChecks/` (portable business logic), `PtxUtils/` (utilities), the Repository layer
  (Mercurial/Chorus integration).
- **Windows-only, rewritten in PT10's web frontend:** all WinForms UI (`Paratext/`,
  `ParatextBase/`, editors), the MAF Plugin Framework, WCF services.
- The load-bearing split when reading a feature: logic in **ParatextData** = the backend the
  feature talks to (potentially reusable); logic in **Paratext** = UI (rewritten).
```

- [ ] **Step 3: Author the seeded `Pt9-Dev-Access-Inventory.md`**

Read the source `ai-porting/.context/Pt9-Dev-Access-Inventory.md` to copy DEV-001 accurately, then create `general/.context/research/Pt9-Dev-Access-Inventory.md` as a live append-target registry:
```markdown
# Paratext 9 — Developer/Power-User Access Inventory

A single registry of PT9 functionality hidden behind keyboard gestures (Shift-held-at-open,
Shift+click, Ctrl+Shift+click, …). Recording these in one place lets PT10 design an
equivalent dev-mode surface **once** instead of rediscovering it gesture-by-gesture.
Open team question: which dev-mode surface PT10 should adopt (hidden settings toggle,
`--dev` flag, an extension, or a build flavour) — PT10 has none yet.

## Contribution rules

- Any investigation that finds a dev-access behaviour MUST add a `DEV-###` row here.
- Use the next free `DEV-###` ID; cite exact PT9 source `file:line`; **never remove rows**
  (permanent history).
- In a UI/discovery write-up, tag the affected control, e.g.
  `(see DEV-007 — PT9 hid this behind Shift; PT10 currently exposes it unconditionally.)`

## Registry

| ID | Feature | PT9 trigger | What it gates | PT10 status (initial proposal) | PT9 source |
|----|---------|-------------|---------------|-------------------------------|------------|
| DEV-001 | project-plans | Shift held when opening the Manage Plans dialog (admin only) | `btnSaveBasePlan` visibility — hidden even for admins without Shift; with Shift shows iff `!progress.Data.IncludeExtendedData` | Dropped — admin sees it unconditionally (subject to the existing `!IncludeExtendedData` constraint); "visible" is the safer admin default; re-gate to dev-admin when PT10 adds a dev mode | `Paratext/ProjectProgress/ManageProgressPlansForm.cs:61-63` |

Row template (copy-ready):
`| DEV-### | {feature} | {gesture, exactly as PT9 detects it} | {what becomes visible/enabled/different} | {dropped/preserved/TBD} — {one-sentence rationale} | {file:line — gate snippet} |`
```

- [ ] **Step 4: Verify**

```bash
grep -q 'AGENTS.md first' general/.context/research/Paratext9-Overview.md && echo OK1
grep -q 'DEV-001' general/.context/research/Pt9-Dev-Access-Inventory.md && echo OK2
grep -rn 'phase-\|G0\|G1\.5\|BHV-\|golden master' general/.context/research/Paratext9-Overview.md general/.context/research/Pt9-Dev-Access-Inventory.md   # de-port: expect no output
```
Expected: `OK1`, `OK2`, and no de-port leakage.

- [ ] **Step 5: Commit**

```bash
git add general/.context/research/Paratext9-Overview.md general/.context/research/Pt9-Dev-Access-Inventory.md
git commit -m "feat(investigate-prd): bundle trimmed PT9 orientation + dev-access registry"
```

---

## Task 3: Bundle the trimmed PT10 orientation index

> **Note:** this index does **not** replace `.context/standards/Architecture.md` — it complements it. Architecture.md is the authoritative paranext-core patterns doc (service-host-vs-service, data-provider lifecycle, network-object limitations, process/import boundaries, security model); the orientation index is a lighter "given a feature concept, where do I grep first" map that *also* names the core extensions and flags that the other three constellation repos (studio, bible-extensions, internal-extensions) need their own sweep — coverage Architecture.md doesn't provide. `pt10-reuse-scout` reads **both** (Task 7): Architecture.md as the authority for placement/reuse decisions, this index as the quick cross-repo map.

**Files:**
- Create: `general/.context/research/paratext-10-orientation.md`

**Interfaces:**
- Produces: a PT10 where-to-look index at runtime path `.context/research/paratext-10-orientation.md`, read by `pt10-reuse-scout` (Task 7).

- [ ] **Step 1: Author the trimmed index**

Create `general/.context/research/paratext-10-orientation.md` (drop the marketing/tech-stack/CI prose from the source `Paratext10-Overview.md`; keep only the maps the scout greps from):
```markdown
# Paratext 10 / Platform.Bible — "Where to look" index

A first-grep map for `pt10-reuse-scout`. Covers **paranext-core only**; the other three
constellation repos (paratext-10-studio, paratext-bible-extensions,
paratext-bible-internal-extensions) are not mapped here and need their own sweep.

## Directory map (paranext-core)

    src/main/            Electron main process        src/renderer/    React UI (components, hooks, services)
    src/extension-host/  Extension runtime & PAPI     src/shared/      Code shared across all processes
    src/node/            Node-specific utilities
    lib/papi-dts/        PAPI type defs (papi.d.ts — the wire-contract source of truth)
    lib/platform-bible-react/   React component library
    lib/platform-bible-utils/   utilities & types  ← reuse-sweep target
    extensions/src/      core bundled extensions (one dir per extension)
    c-sharp/Services/    data services    c-sharp/Projects/  project mgmt    c-sharp/Checks/  data validation

## Core services (check before building cross-cutting logic)

- `src/main/services/`: extension-host, dotnet-data-provider, app, data-protection (encryption)
- `src/shared/services/`: network (JSON-RPC), command (registration/dispatch), settings, project-data-provider
- `src/extension-host/services/`: extension, menu-data, theme-data, localization (i18n)

## Core extensions (first targets for "is this already done?")

platform-scripture (reading), platform-scripture-editor (editing),
platform-lexical-tools (language/grammar), platform-get-resources (resources),
legacy-comment-manager (comments).

## Extension anatomy (what to read inside a hit)

`manifest.json` (metadata + contributions) · `src/main.ts` (entry) · `src/types/*.d.ts`
(typed surface, incl. `CommandHandlers`) · `contributions/` (menus, settings,
localizedStrings.json) · `assets/`.

## Architecture facts the scout needs

4 processes (main / renderer / extension-host / .NET data provider) talk **JSON-RPC 2.0 over
WebSocket, port 8876**. PAPI (`lib/papi-dts/papi.d.ts`) is the central extension API.
Webpack enforces import boundaries (main ≠ renderer ≠ extension-host; `shared` is safe
everywhere). Wire naming: `command:{ext}.{cmd}`, data-provider `object:{name}-data.{method}`,
updates `{objectId}:onDidUpdate`.
```

- [ ] **Step 2: Verify**

```bash
grep -q 'paranext-core only' general/.context/research/paratext-10-orientation.md && echo OK
grep -n 'tw-\|pr-[a-z]' general/.context/research/paratext-10-orientation.md   # expect none
```
Expected: `OK`, no `tw-`/`pr-` prefixes.

- [ ] **Step 3: Commit**

```bash
git add general/.context/research/paratext-10-orientation.md
git commit -m "feat(investigate-prd): bundle trimmed PT10 where-to-look index"
```

---

## Task 4: Author the `prd-interpreter` agent

**Files:**
- Create: `general/.claude/agents/prd-interpreter.md`

**Interfaces:**
- Consumes: `PRD_PATH` (string) injected by the command.
- Produces: a normalized PRD summary + an **Aspect Breakdown** (each aspect tagged `PT9-port {form/category}` / `net-new` / `hybrid`) + Goals / Non-Goals / Success-criteria + `CLARIFICATION-{N}` open questions. Downstream: the command routes each `PT9-port`/`hybrid` aspect to `feature-mapper`; `pt10-reuse-scout` always runs.

- [ ] **Step 1: Write the failing check**

```bash
test -f general/.claude/agents/prd-interpreter.md && echo EXISTS || echo MISSING
```
Expected now: `MISSING`.

- [ ] **Step 2: Author the agent file**

Create `general/.claude/agents/prd-interpreter.md` with this exact content:
````markdown
---
name: prd-interpreter
description: "Read-only agent for /investigate-prd. Parses a Shape-Up PRD into a normalized structure and a per-aspect breakdown (each aspect ports a PT9 feature, is net-new, or both), extracts Goals/Non-Goals/success-criteria, and surfaces conflicts and open questions as CLARIFICATION items. Input: PRD_PATH."
allowed-tools: Read, Grep, Glob
---

# PRD Interpreter

Read-only agent. You turn one Shape-Up PRD into a normalized structure that the rest of
`/investigate-prd` can act on. **Do NOT use Edit, Write, or any file-modifying tools.**

## Inputs

- `PRD_PATH` — path to the PRD markdown file.

## First action

Read the entire PRD at `PRD_PATH` before extracting anything. A PRD may both port existing
Paratext 9 features **and** introduce net-new ones — treat origin as a *per-aspect* property,
never a single label for the whole document.

## Step 1 — Parse the Shape-Up structure

Capture each section that is present:

- **Metadata** — problem name, owner, status, **appetite** (the time box), **category**
  (links to the Feature Inventory taxonomy), complexity.
- **The Problem** — customer pain, who has it, evidence, cost of inaction.
- **Appetite & Boundaries** — the table of **non-negotiables / nice-to-haves / no-gos**.
- **Shaped Solution** — how it works, key interactions, **rabbit holes** (risky work + the
  decided approach).
- **Risks** — value / usability / feasibility / viability.
- **Technical Context** — **systems involved** (often names a PT9 form), known constraints,
  **open technical questions**.
- **Changelog.**

The **category** and **systems-involved** fields are the bridge to the Feature Inventory and
PT9 — record them precisely (e.g. `Category 10 — Collaboration & Sync`, `SendReceiveProjectsForm`).

## Step 2 — Extract Goals / Non-Goals / Success criteria

- **Goals** — 3–5 specific behaviours the feature must achieve, phrased with **action verbs**
  ("Allow users to…", "Support…", "Enable…"). Base them on what the PRD actually asks for.
- **Non-Goals** — what is explicitly OUT of scope, in three buckets:
  - related features that won't be included,
  - edge cases that won't be handled,
  - explicit exclusions (the PRD's no-gos). Write `None.` under any bucket that has no entries.
- **Success criteria** — specific, testable outcomes; "what 'done' looks like." Derive from
  the non-negotiables.

## Step 3 — Build the aspect breakdown

Decompose the Shaped Solution + boundaries into discrete **aspects** (feature/scope items).
For **each** aspect decide its origin:

- **PT9-port** — rebuilds an existing PT9 feature. Record the PT9 form(s) and inventory
  category the PRD cites (or that you can infer from "systems involved").
- **net-new** — no PT9 antecedent.
- **hybrid** — does both (e.g. ports the sync engine *and* adds a new conflict-resolution UI).

Produce one row per aspect: `Aspect | Origin | PT9 form / category (if any) | One-line summary
| Appetite slice`. A fully net-new PRD has zero PT9-port aspects (the PT9 stages then don't run).

## Step 4 — Soundness gate

Before the investigation runs, check the PRD is investigable. **Completeness** (4 checks):

- Scope is bounded — are the boundaries clear enough to know what's in/out?
- Goals are actionable — can investigation agents use them to focus their search?
- Non-goals prevent scope creep — are exclusions clear?
- Success criteria are testable — can completion be objectively verified?

**Blocker taxonomy** (flag any that apply):

| Blocker type | Check |
|--------------|-------|
| Missing dependencies | Does the feature depend on other un-built functionality? |
| Unclear terminology | Are domain terms defined or obvious? |
| Conflicting constraints | Do constraints contradict the goals? |
| Missing access | Is the cited PT9 code / system actually identifiable? |

For each unresolved gap, emit a CLARIFICATION block:

```
## CLARIFICATION-{N}: {Brief title}
**Section**: {which PRD section has the issue}
**Issue**: {what is unclear or missing}
**Impact**: {how this affects the investigation}
**Suggested resolution**: {if applicable}
```

Do not invent answers — surface the gap. The command decides whether to stop and ask the human.

## Output

Return one markdown block:

```
## Normalized PRD: {problem name}
- Appetite: {time box}   Category: {category}   Complexity: {…}
- Problem: {1-2 sentences}
- Non-negotiables: {…}   No-gos: {…}   Rabbit holes: {…}

## Aspect breakdown
| Aspect | Origin | PT9 form / category | Summary | Appetite slice |
| … | PT9-port / net-new / hybrid | … | … | … |

## Goals
1. {action-verb goal} …

## Non-Goals
- Related-excluded: {…}
- Edge-cases-not-handled: {…}
- Explicit exclusions: {…}

## Success criteria
- {testable outcome} …

## Open questions
{CLARIFICATION-{N} blocks, or `None.`}
```

## Status reporting

End with one token:
- **DONE** — PRD parsed cleanly, no blockers.
- **DONE_WITH_CONCERNS** — parsed, but one or more CLARIFICATION items need the human.
- **BLOCKED** — could not read or make sense of the PRD; explain why.

## Not in scope (dropped from the old porting workflow)

No `feature-description.md` artifact, no phase/gate IDs, no tracking-issue/branch bookkeeping,
no BHV/EXT IDs. You normalize the PRD and stop.
````

- [ ] **Step 3: Verify structure & conventions**

```bash
# name must equal filename stem
grep -q '^name: prd-interpreter$' general/.claude/agents/prd-interpreter.md && echo NAME_OK
# read-only tool set
grep -q '^allowed-tools: Read, Grep, Glob$' general/.claude/agents/prd-interpreter.md && echo TOOLS_OK
# required sections present
for s in '## Inputs' '## Step 3 — Build the aspect breakdown' '## Step 4 — Soundness gate' '## Output' '## Status reporting'; do
  grep -qF "$s" general/.claude/agents/prd-interpreter.md && echo "OK: $s" || echo "MISSING: $s"
done
# de-port leakage
grep -n 'phase-status\|BHV-\|feature-description.md\|G1\.5\|golden master' general/.claude/agents/prd-interpreter.md   # expect none
```
Expected: `NAME_OK`, `TOOLS_OK`, all five `OK:`, no leakage hits.

- [ ] **Step 4: Commit**

```bash
git add general/.claude/agents/prd-interpreter.md
git commit -m "feat(investigate-prd): add prd-interpreter agent"
```

---

## Task 5: Author the `feature-mapper` agent

**Files:**
- Create: `general/.claude/agents/feature-mapper.md`

**Interfaces:**
- Consumes: `PT9_REFERENCES` (the form(s)/category of one PT9-port or hybrid aspect, from `prd-interpreter`); the bundled inventory at `.context/research/paratext-9-features/`.
- Produces: a "where to look in PT9" map — entry points (menus/handlers/shortcuts), forms/dialogs, implementing C# files (`file:line`), manual/Help refs, and which source codes corroborate each. Downstream: `pt9-archaeologist` reads the cited PT9 source.

- [ ] **Step 1: Write the failing check**

```bash
test -f general/.claude/agents/feature-mapper.md && echo EXISTS || echo MISSING
```
Expected now: `MISSING`.

- [ ] **Step 2: Author the agent file**

Create `general/.claude/agents/feature-mapper.md` with this exact content:
````markdown
---
name: feature-mapper
description: "Read-only agent for /investigate-prd. Maps a PRD's Paratext 9 references (form, category) to the bundled Feature Inventory and returns the PT9 entry points, forms, implementing classes, and manual/Help references — the 'where to look in PT9' map. Runs for PT9-port and hybrid aspects. Input: PT9_REFERENCES."
allowed-tools: Bash, Read, Grep, Glob
---

# Feature Mapper

Read-only agent. Given a PRD aspect that ports a PT9 feature, you find where that feature
lives in PT9 using the **bundled Feature Inventory** as the index, and return a map for the
archaeologist to read from. **Do NOT use Edit, Write, or any file-modifying tools.**

## Inputs

- `PT9_REFERENCES` — the form name(s) and/or inventory category for one aspect (e.g.
  `SendReceiveProjectsForm`, `Category 10 — Collaboration & Sync`).

## First action

Read `.context/research/paratext-9-features/00_Master_Feature_Index.md` — the lookup hub. It
has a **Category Overview** (per-category file + feature table) and an **Alphabetical Index**
(`- **Feature name** → C.F`). A feature ID is `C.F` (category.feature); category `C` maps to
file `NN_<Name>.md`.

## Step 1 — Look the feature up in the bundled inventory

Use whichever key the PRD gave you (form names are the highest-signal join key):

```bash
# by PT9 form / handler / source file name
grep -rn 'SendReceiveProjectsForm' .context/research/paratext-9-features/*.md
# by feature name → resolve C.F from the Alphabetical Index, then open NN_*.md at "### C.F"
grep -in '{feature keywords}' .context/research/paratext-9-features/00_Master_Feature_Index.md
```

If the feature is **not found**, it may be named differently in PT9 — note the gap, fall back
to the PRD's named form, and tell the archaeologist to search PT9 directly.

## Step 2 — Read the matched feature entry

Open the category file at the `### C.F` header and read the whole entry. Each entry has:
**Description**, **Sub-Features**, a **Sources** table (`Source | Reference | [code]`), an
**Implementation** table (`Depth | File | Found Via | Evidence` — the C# files at `file:line`),
**Dialog Navigation**, **UI Entry Points** (menu path + handler + shortcut), **HelpData
Items**, and a **Validation** line. Extract:

- **Entry points** — menu paths, Click-handler names + lines, keyboard shortcuts.
- **Forms / dialogs** — the WinForms form classes (from FR rows + Dialog Navigation).
- **Implementing classes** — every file in the Implementation table, with its `file:line`
  evidence and layer (`ParatextData/…` = portable backend; `Paratext/…` = UI).
- **Manual / Help references** — `M` chapters and `H` HelpData GUIDs/questions/dialogs.
- **Corroborating sources** — which of `MS FR R M H C` are present (more = better validated).

Source codes: **MS** menu entry points · **FR** form/dialog relationships · **R** requirements
· **M** manual tutorials · **H** HelpData topics · **C** confirmed source files.

## Step 3 — Corroborate against live PT9 *(only if `~/git/Paratext` is readable)*

The inventory is a **starting point, not exhaustive**. If PT9 is checked out, confirm and
extend with targeted searches (apply the exclusion globs from
`.context/research/Paratext9-Overview.md`):

```bash
find ~/git/Paratext -name '*{Feature}*.cs' -type f
grep -rn '{FeatureName}' ~/git/Paratext --include='*.cs'
```

If PT9 is **not** checked out, rely on the inventory's citations and say so.

### HelpData / manual mining (only when PT9 is present)

PT9's `HelpData.xml` is large (~17 MB) — never read it whole; targeted grep only. The
high-value mapping technique: the `<Dialogs>` field of a `<HelpDataItem>` names the **form
class** (e.g. `ProjectPropertiesForm_tabGeneral` → form `ProjectPropertiesForm`, tab
`General`). Search `<Question>` text with name variants first (user-facing language matches
best), then `<Keywords>` (`Component{Feature}*`/`Content{Feature}*` — naming is unpredictable),
then `<Dialogs>` for form classes. Build a small user-term → form/control glossary from any
`{tip:…}`/`{guidestep:…}` markers you encounter.

## Output

Return one markdown block:

```
## PT9 map: {feature name} ({C.F})
### Entry points
| Menu path | Handler | Shortcut | Source file:line |
### Forms / dialogs
- {Form class} — {role}  (file:line)
### Implementing classes
| File:line | Layer (ParatextData=backend / Paratext=UI) | Found via | Evidence |
### Manual / Help references
- {M chapter} … / {H GUID — question — dialog} …
### Corroboration
- Sources present: {MS FR R M H C}.  Confidence: {high if ≥4 / partial / low}.
### Gaps
- {anything the inventory didn't cover, or `None.`}
```

## Status reporting

- **DONE** — feature found and mapped.
- **DONE_WITH_CONCERNS** — mapped, but with gaps (low corroboration, or PT9 not readable).
- **NEEDS_CONTEXT** — feature not in the inventory and no usable PT9 reference to search.

## Not in scope (dropped from the old porting workflow)

Do not copy inventory content into porting artifacts; no research-corpus/`.context/features/`
paths, no feature/tracking-issue IDs, no `[auto]/[semi]/[human]` gate tags. You map, you don't
plan the port.
````

- [ ] **Step 3: Verify structure & conventions**

```bash
grep -q '^name: feature-mapper$' general/.claude/agents/feature-mapper.md && echo NAME_OK
grep -q '^allowed-tools: Bash, Read, Grep, Glob$' general/.claude/agents/feature-mapper.md && echo TOOLS_OK
# correct runtime path to the bundled inventory
grep -q '\.context/research/paratext-9-features/00_Master_Feature_Index.md' general/.claude/agents/feature-mapper.md && echo PATH_OK
for s in '## Inputs' '## Step 1 — Look the feature up' '## Output' '## Status reporting'; do
  grep -qF "$s" general/.claude/agents/feature-mapper.md && echo "OK: $s" || echo "MISSING: $s"
done
grep -n 'phase-\|BHV-\|EXT-\|gate-registry\|tw-' general/.claude/agents/feature-mapper.md   # expect none
```
Expected: `NAME_OK`, `TOOLS_OK`, `PATH_OK`, all `OK:`, no leakage.

- [ ] **Step 4: Commit**

```bash
git add general/.claude/agents/feature-mapper.md
git commit -m "feat(investigate-prd): add feature-mapper agent"
```

---

## Task 6: Author the `pt9-archaeologist` agent

**Files:**
- Create: `general/.claude/agents/pt9-archaeologist.md`

**Interfaces:**
- Consumes: `PT9_MAP` (one aspect's map from `feature-mapper`); the PT9 source at `~/git/Paratext`; the bundled `.context/research/Paratext9-Overview.md` + `.context/research/Pt9-Dev-Access-Inventory.md`.
- Produces: a behavior/architecture digest of the PT9 feature — behaviors, data models, exact validation rules, the backend it talks to, test-derived edge cases, UI wireframes (if applicable), dev-access flags, all cited to `file:line` with confidence markers. **Never proposes PT10 implementation** (that's `pt10-reuse-scout`'s job).

- [ ] **Step 1: Write the failing check**

```bash
test -f general/.claude/agents/pt9-archaeologist.md && echo EXISTS || echo MISSING
```
Expected now: `MISSING`.

- [ ] **Step 2: Author the agent file**

Create `general/.claude/agents/pt9-archaeologist.md` with this exact content:
````markdown
---
name: pt9-archaeologist
description: "Read-only agent for /investigate-prd. Reads the cited Paratext 9 source (the forms/classes feature-mapper found) and documents what the feature DOES — behaviors, data shapes, exact validation rules, the backend it talks to, and test-derived edge cases — every claim cited to file:line. Records WHAT/WHERE in PT9 only; never proposes PT10 implementation. Input: PT9_MAP."
allowed-tools: Bash, Read, Grep, Glob
---

# PT9 Archaeologist

Read-only agent. You read PT9 source and document what a feature actually does, faithfully
and with citations. **Do NOT use Edit, Write, or any file-modifying tools.**

## Inputs

- `PT9_MAP` — the entry points, forms, and implementing classes for one aspect (from
  `feature-mapper`).

## Degradation

If `~/git/Paratext` is not readable, you cannot read source. Fall back to the inventory's
citations in `PT9_MAP`, document what they assert, mark everything `⚠️ Unknown` where you
could not confirm, and ask the user to paste or point at the specific PT9 files (e.g.
"paste `SendReceiveProjectsForm.cs` or point me at the repo"). Still produce the digest from
what is available.

## First action

Read `.context/research/Paratext9-Overview.md` (repo-nav primer: consult per-directory
`AGENTS.md` first, the search-exclusion globs, and the portable-backend vs rewrite-UI triage).
Then consult the relevant `AGENTS.md` in the PT9 repo for the directories in `PT9_MAP`.

## Step 1 — Four-axis source search

Search the PT9 codebase along four axes (apply the exclusion globs from the primer):

1. **Entry points** — menus, toolbar buttons, shortcuts.
2. **Main classes** — the dialogs/forms/services in `PT9_MAP`.
3. **Help** — `grep -i '{keywords}' ~/git/Paratext/**/HelpData.xml`.
4. **Tests** — `~/git/Paratext/**/*Tests/`.

```bash
grep -rn '{FeatureName}' ~/git/Paratext --include='*.cs'
find ~/git/Paratext -name '*{Feature}*.cs' -type f
grep -rn 'ToolStripMenuItem.*{feature}' ~/git/Paratext --include='*.cs'   # entry points
grep -rn 'Keys\.' ~/git/Paratext --include='*.cs' | grep -i '{feature}'   # shortcuts
```

**The load-bearing layer split:** logic under `ParatextData/` is the **portable C# backend the
feature talks to**; logic under `Paratext/` is the **WinForms UI**. Note which layer each class
lives in.

## Step 2 — Reverse-dependency scan (find the backend a feature consumes)

If a backend layer returned **fewer than 3 files** in Step 1, check the *reverse* direction:
does the feature's UI code *consume* APIs from that layer even though no feature code is
*defined* there?

```bash
grep -rn 'using Paratext\.Data'  {feature-ui-files} --include='*.cs'
grep -rn 'using SIL\.Scripture'  {feature-ui-files} --include='*.cs'
grep -rn 'using Paratext\.Checks' {feature-ui-files} --include='*.cs'
grep -rn 'using PtxUtils'        {feature-ui-files} --include='*.cs'
```

| UI files importing the namespace | Conclusion |
|----------------------------------|------------|
| 0–2 | minimal relevance |
| 3–5 | **consumer dependency** — document the API surface used |
| 6+  | **heavy dependency** — must document the data flow; do not dismiss |

When a consumer dependency is found, catalogue which backend APIs are consumed and how the
data flows from those types (e.g. `ScrText`, `VerseRef`, `UsfmToken`) through the feature code.

## Step 3 — Read discipline (mandatory)

1. **Read the entire file** before documenting any behavior from it.
2. **Read base-class/partial-class files completely first** (Form → BaseForm; read base first).
3. **Read called in-scope files too.**
4. **Never document from grep results alone.** No partial (offset/limit) reads — read whole files.

Document only what exists (`✅ "ComboBox contains A, B, C"` verified from code), not what is
likely (`❌ "likely has a Help button"` → instead `✅ "Help button not found in the form source"`).

## Step 4 — Extract behavior

- **API contracts** — Signature · Location (`file.cs:line`) · Purpose · Parameters · Returns ·
  Throws (exception + when) · Thread safety.
- **Invariants** — the rule (what must always be true) · where enforced (`Class.Method` at
  `file:line`) · how · what happens on violation.
- **Data models** — location · key properties (type + meaning) · built-in validation · how persisted.
- **Behaviors** — per behavior: Trigger · Input · Output · **Side effects** (file I/O, state) ·
  Error handling · Edge cases.
- **Validation rules — exact.** A classic porting bug is dropping a character (PT9 "3–8 chars,
  A–Z, 0–9, **and underscores**" silently becomes "letters and numbers only"). Find rules in
  `errorProvider.SetError(...)`, `Validate*`/`IsValid*`/`Check*` methods, regex patterns,
  `btnOK.Enabled = validData`. For each field record the **exact character-set definition copied
  verbatim** and the error message (with its localization key). Never write vague rules
  ("Required", "Valid name").
- **Enum-per-value behavior** — when logic varies by an enum (`ProjectType`, `PermissionLevel`,
  …), **never** write "varies by type." Produce a per-value table (one row per enum value:
  Default values | Constraints | UI-state changes), and list values that can never apply.

## Step 5 — Mine PT9's own tests as a behavior source

Find the test class by target class/namespace in `~/git/Paratext/**/*Tests/`. Extract:

| Pattern | Use for |
|---------|---------|
| Inline data constants (`const string … = @"<xml …>"`) | real example inputs |
| `[TestCase("a","b","c")]` | parameters → known expected outputs |
| Test helpers / `[OneTimeSetUp]` | how to construct valid inputs / init steps |
| `Assert.Equal(expected, actual)` | implies a business rule |

Use the adversarial edge-case taxonomy to find what the tests probe — **Happy path** (valid
CRUD, typical volumes); **Edge cases** (empty/null, boundary min/max/just-over, unicode &
special chars, concurrent ops, large volumes, timeouts); **Error cases** (invalid formats,
missing data, permission failures, not-found, IO failures, corrupt data, constraint violations).
For each validated field, enumerate scenarios across Required / Length / Character-set /
Pattern / Uniqueness / Reserved-values.

## Step 6 — Document the UI (for UI features), framework-agnostically

Use **abstract element types**, not concrete components (PT10 chooses components later):

| Abstract type | PT9 control |
|---------------|-------------|
| text-input / text-area | TextBox / TextBox(multiline) |
| dropdown / searchable-dropdown | ComboBox (DropDownList / DropDown) |
| checkbox / checkbox-group | CheckBox / CheckedListBox |
| radio-group / multi-select-list | RadioButton group / ListBox(MultiSelect) |
| number-input / date-picker / file-picker | NumericUpDown / DateTimePicker / TextBox+Button |

Produce an annotated ASCII wireframe: show every element (annotated with its name, e.g.
`[projectName ▾]`), grouping lines, representative data, and **state-variant wireframes** for
Default / Loading / Empty / key visibility variants. Verify each control's **actual parent
container** before claiming tab membership (a common error) — mark `✓ Verified` / `? Inferred`
/ `⚠️ Unknown`.

## Step 7 — Flag developer/power-user access gestures

While reading, watch for functionality hidden behind keyboard gestures (Shift-held-at-open,
Shift+click, Ctrl+Shift+click — detected via `ControlExtensions.PortableModifierKeys & Keys.Shift`
or similar). For each, record the exact `file:line` gate and what it gates. Cross-reference
`.context/research/Pt9-Dev-Access-Inventory.md`; if it is a new gesture, propose the next
`DEV-###` row (PT10 has no dev-mode surface yet — note that as an open question).

## Quality bar

- **NO PT10 IMPLEMENTATION LEAKAGE (critical):** record WHAT logic exists and WHERE in PT9 at
  `file:line`. Do **not** propose PT10 service names, method signatures, "new service to create,"
  React/MUI/platform-bible-react, or any "PT10 equivalent." Reuse-vs-build and placement are
  `pt10-reuse-scout`'s job, not yours.
- **Confidence markers** on every order/membership/behavior claim: `✓ Verified` (from code) /
  `? Inferred` (from code order, needs check) / `⚠️ Unknown` (needs PT9 testing).
- **Review Flags** — end with a `## Review Flags` table noting any path you couldn't fully
  trace, anything inferred from a single call site, assumptions about undocumented rules, or
  code-vs-comment conflicts. If none: `No items flagged — all findings supported by direct code evidence.`

## Output

Return a behavior/architecture digest:

```
## PT9 behavior: {feature} 
### Summary
### Entry points
### Behaviors        (trigger / input / output / side-effects / error / edge cases, each with file:line)
### Data models
### Validation rules (exact char-sets verbatim + messages)
### Backend it talks to   (the consumed APIs / data flow; Chorus/Mercurial etc. for sync)
### Tests & edge cases     (from PT9's own tests)
### UI                     (abstract elements + ASCII wireframes + state variants — if applicable)
### Dev-access flags       (DEV-### proposals, or `None.`)
### Review Flags
```

## Status reporting

- **DONE** — feature documented from source with citations.
- **DONE_WITH_CONCERNS** — documented, but with `⚠️ Unknown` gaps or Review Flags.
- **NEEDS_CONTEXT** — PT9 not readable and `PT9_MAP` citations insufficient; say what to provide.

## Not in scope (dropped from the old porting workflow)

No BHV/EXT/VAL/SUBFLOW/TS ID numbering, no golden-master/characterization capture, no
A/B/C logic-distribution or porting-effort levels, no `archaeologist-consolidator` merge step,
no worker-assignment files or scope caps, no PT10 reusability columns. You read your cited
files directly and document — no fan-out, no port planning.
````

> **Revised after build (2026-06-18):** the shipped `pt9-archaeologist` and `pt10-reuse-scout`
> now permit *disciplined* fan-out (they hold the `Task` tool); the "no fan-out" wording in the
> snippet above reflects the original build only. What stays dropped is the heavyweight harness
> (`archaeologist-consolidator` / `worker-assignments.json` / step-review), not the act of spawning
> a helper. See commit `79cd3c120b`.

- [ ] **Step 3: Verify structure & conventions**

```bash
grep -q '^name: pt9-archaeologist$' general/.claude/agents/pt9-archaeologist.md && echo NAME_OK
grep -q '^allowed-tools: Bash, Read, Grep, Glob$' general/.claude/agents/pt9-archaeologist.md && echo TOOLS_OK
grep -q 'NO PT10 IMPLEMENTATION LEAKAGE' general/.claude/agents/pt9-archaeologist.md && echo LEAKAGE_RULE_OK
grep -q '\.context/research/Paratext9-Overview.md' general/.claude/agents/pt9-archaeologist.md && echo PRIMER_OK
grep -q '\.context/research/Pt9-Dev-Access-Inventory.md' general/.claude/agents/pt9-archaeologist.md && echo DEVACCESS_OK
for s in '## Degradation' '## Step 2 — Reverse-dependency scan' '## Step 5 — Mine PT9' '## Review Flags' '## Status reporting'; do
  grep -qF "$s" general/.claude/agents/pt9-archaeologist.md && echo "OK: $s" || echo "MISSING: $s"
done
grep -n 'BHV-\|golden master\|consolidator\|A/B/C\|phase-status' general/.claude/agents/pt9-archaeologist.md   # expect none in instructions (the drop note names them as excluded)
```
Expected: all `*_OK`, all `OK:`. The final grep is allowed to match **only** inside the "Not in scope" drop note (it names what to exclude); confirm there are no other occurrences.

- [ ] **Step 4: Commit**

```bash
git add general/.claude/agents/pt9-archaeologist.md
git commit -m "feat(investigate-prd): add pt9-archaeologist agent"
```

---

## Task 7: Author the `pt10-reuse-scout` agent

**Files:**
- Create: `general/.claude/agents/pt10-reuse-scout.md`

**Interfaces:**
- Consumes: the PRD summary (+ the `pt9-archaeologist` digest for port aspects); the PT10 constellation at `~/git/{paranext-core,paratext-10-studio,paratext-bible-extensions,paratext-bible-internal-extensions}`; **both** `.context/standards/Architecture.md` (authoritative patterns) **and** the bundled `.context/research/paratext-10-orientation.md` (quick cross-repo map).
- Produces: a PT10 landscape — relevant existing code per repo, recommended home (which repo/extension), reuse-vs-build classification, applicable patterns (`file:line`), and the existing command surface. Always runs; the primary investigation for net-new aspects.

- [ ] **Step 1: Write the failing check**

```bash
test -f general/.claude/agents/pt10-reuse-scout.md && echo EXISTS || echo MISSING
```
Expected now: `MISSING`.

- [ ] **Step 2: Author the agent file**

Create `general/.claude/agents/pt10-reuse-scout.md` with this exact content:
````markdown
---
name: pt10-reuse-scout
description: "Read-only agent for /investigate-prd. Sweeps the Paratext 10 repo constellation (paranext-core, paratext-10-studio, paratext-bible-extensions, paratext-bible-internal-extensions) for existing related code, decides where a feature should live, and classifies what to reuse vs build. Always runs; primary investigation for net-new aspects. Input: the PRD summary (+ PT9 digest for port aspects)."
allowed-tools: Bash, Read, Grep, Glob
---

# PT10 Reuse Scout

Read-only agent. You discover what already exists in Paratext 10 before anyone builds, decide
where a feature belongs, and judge reuse-vs-build. **Do NOT use Edit, Write, or any
file-modifying tools.**

## Inputs

- The PRD summary and aspect breakdown; for port aspects, the `pt9-archaeologist` behavior digest.

## The constellation (read live; degrade gracefully)

Sibling checkouts under `~/git/` (the documented convention):

- `~/git/paranext-core` — the Platform.Bible framework.
- `~/git/paratext-10-studio` — the PT10 app shell.
- `~/git/paratext-bible-extensions` — public extensions.
- `~/git/paratext-bible-internal-extensions` — internal (SIL/UBS) extensions; Send/Receive lives here.

If a repo is **not readable**, note which repo and which part of the sweep you had to skip, and
produce the landscape from what is available. If an agent reports it cannot access a repo, the
user can add it via `additionalDirectories` in their settings or launch Claude from a directory
containing the siblings.

## First actions — orient against the standards

Read **both**, and treat them as complementary:

1. `.context/standards/Architecture.md` — the **authoritative** paranext-core architecture: the
   service-host-vs-service pattern, the data-provider lifecycle, network-object limitations, the
   process/import boundaries (main ≠ renderer ≠ extension-host; `shared` is safe everywhere),
   PAPI as the bridge, and the security model. Your placement and reuse-vs-build recommendations
   **must respect these documented patterns** — e.g. don't propose logic that crosses a process
   boundary the standard forbids, and prefer the service/data-provider shapes it describes.
2. `.context/research/paratext-10-orientation.md` — a quick "where do I grep first" map
   (directory map, core services, core extensions, extension anatomy, wire-naming). It maps
   **paranext-core only** — the other three constellation repos need their own sweep.

If `paratext-10-orientation.md` isn't present, rely on Architecture.md plus a direct `ls` sweep
of each repo.

## Repo-relevance heuristic

Sweep all four repos for the feature's key terms / PT9 form names / inventory category, and
focus where there are hits: internal-only features → `paratext-bible-internal-extensions`;
public → `paratext-bible-extensions` / `paranext-core`; app-shell/window concerns →
`paratext-10-studio`.

## Step 1 — Discover existing related code (do NOT assume it's absent)

Multiple strategies — PT10 may name things differently than PT9:

- **Keyword search** — `grep -r '{keyword}' {repo}/c-sharp/`
- **Directory exploration (ALWAYS)** — `ls {repo}/c-sharp/`, then `ls` each plausible folder.
- **Concept-based search** — search what the feature *is about* (nouns: "project", "settings"),
  *does* (verbs: "validate", "generate", "save"), and the *data* it touches ("ScrText",
  "metadata") — not PT9 class names: `grep -ri 'create.*project' {repo}/c-sharp/ --include='*.cs'`
- **File-pattern search** — `find {repo} -name '*Project*' -type f`
- **Read the 2–3 most-likely files in full** (not just grep snippets); document what each does,
  its extension points (could new functionality be added here?), and conflicts (would adding
  here create confusion/coupling?).

## Step 2 — Map the existing command surface

For each relevant extension:

```bash
grep -rn 'RegisterRequestHandlerAsync' {repo}/c-sharp/                    # C# handler registrations
# read the typed inventory:
cat {repo}/extensions/src/{ext}/src/types/{ext}.d.ts                      # the CommandHandlers interface
grep -rn 'registerCommand' {repo}/extensions/src/{ext}/src/main.ts        # TS command prefix
```

Wire naming: `papi.commands.registerCommand('{ext}.{cmd}', …)` → `command:{ext}.{cmd}`;
data-provider methods → `object:{name}-data.{method}`; updates → `{objectId}:onDidUpdate`.
The `CommandHandlers` interface IS the typed list of what the extension already exposes.

## Step 3 — Decide where the feature should live

Build an Integration Options analysis:

```
| Candidate file/folder | Responsibility | Similarity (High/Med/Low) |
Options:
- Extend existing ({where}): pros / cons
- New folder/extension:        pros / cons
Recommendation: {choice} — Rationale: {why}
```

Anchor the recommendation in `Architecture.md`: name the documented pattern the feature should
follow (a shared/main/extension-host service, a data provider, a network object, an extension
contribution) and check the placement honors the process/import boundaries and security model it
defines. If you recommend a **new top-level folder / service / extension**, you MUST (per the
`discover-before-implementing` rule) state specific reasons no existing folder fits and name the
existing code that will be **reused (called, not duplicated)** — and flag that a new top-level
structure needs explicit human approval.

## Step 4 — Classify reuse-vs-build

Locate each discrete logic unit (a method or cohesive section, by `file:line`) and classify it:

- **Logic type** — business rule / calculation / validation / state-transition /
  data-transformation / decision-tree.
- **Reusable vs needs-rewrite** — *reusable* = portable, no UI/platform deps, clear inputs/outputs
  (consumable as-is); *needs-rewrite* = entangled with UI/platform. For each rewrite block record
  Type · Location · Lines · Purpose · Inputs · Outputs · Dependencies · entanglement notes.
- **Fraction reusable** = reusable lines / total lines, by **raw line counts** (do not weight by
  complexity or importance). When uncertain, lean to the higher-effort classification.
- **Complexity tier** per rewrite block — Simple (<20 lines) / Moderate (20–50) / Complex (50+);
  cross-check the label against the line count and flag any deliberate mismatch.
- Note **dependencies between blocks** (does A call B? shared state?) and **hotspots** (risky to
  migrate: many branches, tight coupling).

## Net-new aspects

For aspects with no PT9 antecedent, this sweep is the **primary** investigation: prior art,
architectural fit, and reusable infrastructure (services, hooks, components, PAPI surfaces). Stay
within the constellation + the bundled `general/` standards. If a net-new aspect clearly needs
research beyond them (external library choice, a pattern not present in-repo), **flag it as an
open question** — do not go off-repo to research it yourself.

## Quality bar — Review Flags

End with a `## Review Flags` table noting any code path you couldn't fully trace, anything
inferred from a single call site, or where you **could not determine reusability or placement
with confidence**. If none: `No items flagged.`

## Output

```
## PT10 landscape
### Relevant existing code (per repo)
| Repo | File:line | What it does | Similarity |
### Recommended home
{repo/extension} — Rationale: {…}  (new top-level structure? flag for approval)
### Command surface (existing)
{command:{ext}.{cmd} … with file:line}
### Reuse vs build
| Logic unit (file:line) | Type | Reusable / Rewrite | Fraction reusable | Complexity | Notes |
### Applicable patterns
- {pattern} @ {file:line}
### Open questions
{net-new research-needed items, or `None.`}
### Review Flags
```

## Status reporting

- **DONE** — constellation swept, placement + reuse-vs-build decided.
- **DONE_WITH_CONCERNS** — swept with gaps (a repo unreadable, or low-confidence reusability).
- **NEEDS_CONTEXT** — no constellation repo readable; say what to provide.

## Not in scope (dropped from the old porting workflow)

No A/B/C effort labels or `level:` field; no porting artifact I/O (`data-contracts.md`,
`boundary-map.md`, `extraction-plan.md`, `{TBD:*}` placeholders); no `utility-registry.json`
dependency (a utility grep sweep is fine, the registry file is not); no step-review loop, gate
IDs, branch/PR creation, or PT9-dossier prerequisites. You report findings; you don't fill
porting templates.
````

- [ ] **Step 3: Verify structure & conventions**

```bash
grep -q '^name: pt10-reuse-scout$' general/.claude/agents/pt10-reuse-scout.md && echo NAME_OK
grep -q '^allowed-tools: Bash, Read, Grep, Glob$' general/.claude/agents/pt10-reuse-scout.md && echo TOOLS_OK
# all four constellation repos named
for r in paranext-core paratext-10-studio paratext-bible-extensions paratext-bible-internal-extensions; do
  grep -q "$r" general/.claude/agents/pt10-reuse-scout.md && echo "REPO_OK: $r" || echo "REPO_MISSING: $r"
done
grep -q 'discover-before-implementing' general/.claude/agents/pt10-reuse-scout.md && echo RULE_REF_OK
# reads BOTH orientation sources
grep -q '\.context/standards/Architecture.md' general/.claude/agents/pt10-reuse-scout.md && echo ARCH_REF_OK
grep -q '\.context/research/paratext-10-orientation.md' general/.claude/agents/pt10-reuse-scout.md && echo ORIENT_REF_OK
for s in '## Step 4 — Classify reuse-vs-build' '## Net-new aspects' '## Output' '## Status reporting'; do
  grep -qF "$s" general/.claude/agents/pt10-reuse-scout.md && echo "OK: $s" || echo "MISSING: $s"
done
grep -n 'Level A\|Level B\|Level C\|data-contracts\|utility-registry\.json' general/.claude/agents/pt10-reuse-scout.md   # allowed only inside the drop note
```
Expected: all `*_OK` (incl. `ARCH_REF_OK`, `ORIENT_REF_OK`), four `REPO_OK`, all `OK:`. The final grep should match only inside "Not in scope."

- [ ] **Step 4: Commit**

```bash
git add general/.claude/agents/pt10-reuse-scout.md
git commit -m "feat(investigate-prd): add pt10-reuse-scout agent"
```

---

## Task 8: Author the `investigate-prd` command (orchestrator)

**Files:**
- Create: `general/.claude/commands/investigate-prd.md`

**Interfaces:**
- Consumes: `$ARGUMENTS` (path to the PRD). Dispatches the four agents by `subagent_type` and consumes their outputs (Tasks 4–7). Hands off to `superpowers:writing-plans`.
- Produces: a tracked, shared `.context/research/investigations/<prd-slug>/brief.md` and an inline checkpoint summary.

- [ ] **Step 1: Write the failing check**

```bash
test -f general/.claude/commands/investigate-prd.md && echo EXISTS || echo MISSING
```
Expected now: `MISSING`.

- [ ] **Step 2: Author the command file**

Create `general/.claude/commands/investigate-prd.md` with this exact content:
````markdown
---
description: Investigate a Shape-Up PRD (port PT9 feature(s) and/or net-new) and produce a discovery brief, then an implementation plan. Pass the PRD path. e.g. /investigate-prd docs/prds/sync-project.md
---

# Investigate PRD

Investigate the PRD at **$ARGUMENTS** and produce a discovery brief, then — after one human
checkpoint — an implementation plan.

## Overview

1. Parse the PRD into a normalized structure + a per-aspect breakdown (port PT9 / net-new / both).
2. Investigate each aspect: map + read PT9 source for port aspects; sweep the PT10 constellation
   always.
3. Synthesize a discovery brief.
4. **Checkpoint** — present the brief; the human reviews / edits / approves.
5. Hand off to `superpowers:writing-plans` to turn the approved brief into an implementation plan.

The command stays thin: it dispatches agents, collates their structured outputs, runs the
checkpoint, and transitions to planning. It owns no investigation logic of its own.

## Repo access

Investigations read sibling checkouts under `~/git/` — `Paratext` (PT9) and the PT10
constellation (`paranext-core`, `paratext-10-studio`, `paratext-bible-extensions`,
`paratext-bible-internal-extensions`). This is a **convention**, not a hard requirement: if an
agent reports it cannot read a repo, it degrades and notes the gap, and you tell the user they
can add the repo via `additionalDirectories` in their settings or launch Claude from a directory
containing the siblings. Never pin paths into settings for them.

## Step 1: Prepare the output location

If `$ARGUMENTS` is empty, ask the user for the PRD path and stop until they provide it.

Derive a slug from the PRD filename (lowercase; spaces and punctuation → hyphens; drop the
extension). Briefs live in the **shared, tracked** research area so collaborators get them via
git — `.context/research/investigations/<slug>/`. (Today `.context/` is shared through the
ai-prompts profile repo; once `general/` moves into paranext-core, `.context/` is paranext-core's
own tracked folder — the path is stable across that migration.)

```bash
SLUG="<derived-slug>"
mkdir -p ".context/research/investigations/$SLUG"
```

Do **not** auto-commit the brief — the developer commits it as part of their normal flow.

## Step 2: Interpret the PRD

Dispatch the `prd-interpreter` agent with the Agent tool (`subagent_type: "prd-interpreter"`),
passing `PRD_PATH: $ARGUMENTS`. Read its Aspect Breakdown and its status token.

## Step 3: Soundness gate (present, don't decide)

If `prd-interpreter` returned `DONE_WITH_CONCERNS` with `CLARIFICATION-{N}` items, **STOP** and
present them to the user before investigating:

> The PRD has open questions that affect the investigation:
> {list each CLARIFICATION-N with its suggested resolution}
> Want me to proceed with my best assumptions, or would you like to clarify first?

Wait for the user. Do not invent answers.

## Step 4: Investigate (parallel fan-out)

Dispatch the investigation agents. `pt10-reuse-scout` **always** runs. For each aspect tagged
`PT9-port` or `hybrid`, run `feature-mapper` then `pt9-archaeologist` (the map feeds the
archaeologist). A fully net-new PRD runs only the scout.

- **Wave A (single response, in parallel):** one `feature-mapper` (`subagent_type:
  "feature-mapper"`, pass that aspect's `PT9_REFERENCES`) per port/hybrid aspect, **and**
  `pt10-reuse-scout` (`subagent_type: "pt10-reuse-scout"`, pass the PRD summary). Dispatch all of
  these in one message.
- **Wave B (single response, in parallel):** for each `feature-mapper` that returned a map, one
  `pt9-archaeologist` (`subagent_type: "pt9-archaeologist"`, pass that aspect's `PT9_MAP`).

Each agent prompt ends with: "Follow the instructions in your agent definition exactly. Return
output in the specified format." Collect every agent's output and status token. If an agent
reports `NEEDS_CONTEXT` (e.g. PT9 not checked out), capture what it asked for — you'll surface it
at the checkpoint.

## Step 5: Synthesize the discovery brief

Write `.context/research/investigations/$SLUG/brief.md` with these sections (use `None.` for empty ones):

```markdown
# Discovery brief: {PRD problem name}

## 1. Feature summary
Problem, appetite, non-negotiables, no-gos (from the PRD).

## 2. Aspect breakdown
Each aspect tagged: ports PT9 feature {X} / net-new / hybrid.

## 3. PT9 reference  (port/hybrid aspects)
Where the logic lives (forms/data/flow at file:line), key behaviors, the backend it talks to.

## 4. PT10 landscape
What already exists across the constellation, where the feature should live, reuse-vs-build.

## 5. Open questions & rabbit holes
From the PRD + anything investigation surfaced (incl. any agent NEEDS_CONTEXT requests).

## 6. PRD alignment
| PRD section | Original | Discovery finding | Proposed update |
Reconcile the PRD against what investigation found (scope expansion/reduction, goal conflicts,
missing success criteria, complexity surprises).

## 7. Scope decisions  (present options, do NOT auto-decide)
For each unclear boundary, dependency on un-built functionality, or heavy sub-flow, a 3-way
option set — **reduce / expand / stub-or-defer** — each with a size + reuse + required-vs-optional
summary and a recommendation. These are for the human to decide at the checkpoint.

## 8. Recommended first slice
The smallest valuable increment that fits the appetite. This seeds the implementation plan.
```

## Step 6: Checkpoint (the one human gate)

Present a concise **inline** summary — the aspect breakdown, the Scope decisions (§7) with your
recommendations, and the Recommended first slice (§8) — and point to the full brief:

> Discovery brief written to `.context/research/investigations/$SLUG/brief.md`. Summary:
> {aspect breakdown; scope options with recommendations; recommended first slice}
> Review and edit the brief as you like. Approve it (or tell me what to change) and I'll turn it
> into an implementation plan.

Wait for approval. If the user requests changes, update the brief and re-present. Decide nothing
on the user's behalf.

## Step 7: Hand off to planning

On approval, invoke the **superpowers:writing-plans** skill to turn the approved brief —
especially §8 (the first slice) — into an implementation plan. Pass the brief path as context.

## Error handling

- **No PRD path** → ask for it (Step 1).
- **PRD references a PT9 feature not in the inventory** → `feature-mapper` notes the gap;
  `pt9-archaeologist` searches PT9 directly from the PRD's named form.
- **A constellation repo / PT9 not checked out** → the owning agent degrades and reports what's
  missing; the brief is still produced; surface the gap at the checkpoint.
- **The PRD is part of an epic** (cites sibling PRDs as "separate PRD") → note the dependencies;
  scope the investigation to this one PRD.

## Agent status protocol

Agents end with `DONE` / `DONE_WITH_CONCERNS` / `BLOCKED` / `NEEDS_CONTEXT`. Treat
`DONE_WITH_CONCERNS` and `NEEDS_CONTEXT` as material for §5 (open questions) and the checkpoint;
treat `BLOCKED` as a stop-and-ask.
````

- [ ] **Step 3: Verify structure, dispatch wiring & conventions**

```bash
# command frontmatter (description only) + argument placeholder
head -3 general/.claude/commands/investigate-prd.md | grep -q '^description:' && echo DESC_OK
grep -q '\$ARGUMENTS' general/.claude/commands/investigate-prd.md && echo ARGS_OK
# dispatches all four agents by the exact subagent_type names that match the agent files
for a in prd-interpreter feature-mapper pt9-archaeologist pt10-reuse-scout; do
  grep -q "subagent_type: \"$a\"" general/.claude/commands/investigate-prd.md && echo "DISPATCH_OK: $a" || echo "DISPATCH_MISSING: $a"
done
# the brief lands in the shared, tracked research area (not gitignored) + the 8 sections + handoff
grep -q '.context/research/investigations/' general/.claude/commands/investigate-prd.md && echo BRIEFPATH_OK
grep -q '.git/info/exclude\|.investigate/' general/.claude/commands/investigate-prd.md && echo "STALE_IGNORE (should be gone)" || echo NO_STALE_IGNORE
grep -q 'superpowers:writing-plans' general/.claude/commands/investigate-prd.md && echo HANDOFF_OK
grep -q 'PRD alignment' general/.claude/commands/investigate-prd.md && grep -q 'Recommended first slice' general/.claude/commands/investigate-prd.md && echo BRIEF_OK
# must NOT touch settings.json or pin paths
grep -n 'additionalDirectories\|settings.json' general/.claude/commands/investigate-prd.md   # only the "add via additionalDirectories" guidance line is acceptable
```
Expected: `DESC_OK`, `ARGS_OK`, four `DISPATCH_OK`, `BRIEFPATH_OK`, `NO_STALE_IGNORE`, `HANDOFF_OK`, `BRIEF_OK`. The final grep should show only the single guidance mention (telling the *user* they can add `additionalDirectories`), not any instruction for the command to edit settings.

- [ ] **Step 4: Cross-check agent-name consistency**

The `subagent_type` strings in the command must exactly equal the `name:` in each agent file:
```bash
for a in prd-interpreter feature-mapper pt9-archaeologist pt10-reuse-scout; do
  cmd=$(grep -c "subagent_type: \"$a\"" general/.claude/commands/investigate-prd.md)
  agent=$(grep -c "^name: $a$" general/.claude/agents/$a.md)
  echo "$a: command=$cmd agent=$agent"
done
```
Expected: every line shows `command>=1 agent=1`.

- [ ] **Step 5: Commit**

```bash
git add general/.claude/commands/investigate-prd.md
git commit -m "feat(investigate-prd): add the orchestrating command"
```

---

## Task 9: Cross-cutting verification, de-port sweep & discoverability

**Files:**
- Modify: `general/claude-md/CLAUDE.md` (one pointer row)

**Interfaces:**
- Consumes: all files from Tasks 1–8.
- Produces: a clean, internally consistent feature set + a discoverable inventory pointer.

- [ ] **Step 1: Whole-feature de-port leakage sweep**

Across every new file, confirm no porting-harness vocabulary leaked into *instructions* (drop
notes that name excluded concepts are fine — they're explicitly the "do not do this" list):
```bash
grep -rn 'phase-status\|branches.json\|gate-registry\|G[0-9]\b\|P[0-9]\.[0-9]\|step-reviewer\|worker-assignments\|golden master\|gm-capture\|ai/main' \
  general/.claude/agents/prd-interpreter.md general/.claude/agents/feature-mapper.md \
  general/.claude/agents/pt9-archaeologist.md general/.claude/agents/pt10-reuse-scout.md \
  general/.claude/commands/investigate-prd.md general/.context/research/
```
Review each hit: it must appear only inside a "Not in scope / dropped" note. Any hit in an
actual instruction is a bug — fix it.

- [ ] **Step 2: Tailwind / fabricated-lint-code sweep**

```bash
grep -rn 'tw-\|pr-[a-z]\|PNX011\|PNX006' general/.context/research/ general/.claude/agents/ general/.claude/commands/investigate-prd.md
```
Expected: no output. (We introduced no Tailwind classes or PNX codes; this guards against
accidental copy-in.)

- [ ] **Step 3: Frontmatter & name-stem consistency across all four agents**

```bash
for a in prd-interpreter feature-mapper pt9-archaeologist pt10-reuse-scout; do
  stem=$a
  name=$(awk -F': ' '/^name: /{print $2; exit}' general/.claude/agents/$a.md)
  [ "$name" = "$stem" ] && echo "OK: $a" || echo "MISMATCH: $a (name=$name)"
done
```
Expected: four `OK:` lines.

- [ ] **Step 4: Bundled-path references resolve**

Every runtime path an agent reads must exist in the bundle:
```bash
test -f general/.context/research/paratext-9-features/00_Master_Feature_Index.md && echo INV_OK
test -f general/.context/research/Paratext9-Overview.md && echo P9_OK
test -f general/.context/research/Pt9-Dev-Access-Inventory.md && echo DEV_OK
test -f general/.context/research/paratext-10-orientation.md && echo PT10_OK
test -f general/.context/standards/Architecture.md && echo ARCH_OK   # the scout's authoritative source must exist
```
Expected: `INV_OK`, `P9_OK`, `DEV_OK`, `PT10_OK`, `ARCH_OK`.

- [ ] **Step 5: Add a discoverability pointer to CLAUDE.md**

In `general/claude-md/CLAUDE.md`, under the "## Reference Documentation" table, add one row so
the bundled inventory is findable (the command itself is auto-discovered by Claude Code from
`.claude/commands/`, so it needs no registration):
```markdown
| PT9 Feature Inventory   | [paratext-9-features/](.context/research/paratext-9-features/README.md) | Catalogue of Paratext 9 features (entry points, forms, classes, sources) — used by `/investigate-prd` |
```

- [ ] **Step 6: Commit**

```bash
git add general/claude-md/CLAUDE.md
git commit -m "docs(investigate-prd): register bundled Feature Inventory in CLAUDE.md"
```

---

## Task 10: End-to-end smoke test against a real PRD

**Goal:** prove the whole pipeline produces a correct brief on a real PRD. This is the
acceptance test; run it in an environment where the `general/` profile is active (i.e. a
paranext-core checkout with the symlinks, with `~/git/Paratext` and the PT10 constellation
readable). The Send/Receive PRD is ideal because the inventory's worked example is exactly
`10.1 Send/Receive → SendReceiveProjectsForm`.

**Files:**
- Test input: `/mnt/c/Users/Paratext/Downloads/PRD-Power-Donna syncs her project with the team_0-003.md`

- [ ] **Step 1: Sanity-check the agents are loadable**

```bash
ls general/.claude/agents/{prd-interpreter,feature-mapper,pt9-archaeologist,pt10-reuse-scout}.md
ls general/.claude/commands/investigate-prd.md
```
Expected: all five listed.

- [ ] **Step 2: Run the command**

Invoke (from a context where the profile is active):
```
/investigate-prd "/mnt/c/Users/Paratext/Downloads/PRD-Power-Donna syncs her project with the team_0-003.md"
```

- [ ] **Step 3: Verify the brief**

Confirm `.context/research/investigations/<slug>/brief.md` exists and that:
- It contains all 8 sections (Feature summary → Recommended first slice).
- The aspect breakdown tags the sync aspect as **PT9-port** citing **Send/Receive** /
  **Category 10 — Collaboration & Sync**.
- §3 (PT9 reference) cites `SendReceiveProjectsForm` and the backend (Chorus/Mercurial via the
  Repository layer) — confirming `feature-mapper` → `pt9-archaeologist` resolved the worked
  example.
- §4 (PT10 landscape) names `paratext-bible-internal-extensions` as the likely home (Send/Receive
  is internal) — confirming `pt10-reuse-scout` swept the constellation.
- §7 presents scope options **without** auto-deciding; §8 proposes a first slice within appetite.

```bash
SLUG=$(ls -t .context/research/investigations/ | head -1)   # -t: newest first (a prior run won't shadow this one)
BRIEF=".context/research/investigations/$SLUG/brief.md"
for s in 'Feature summary' 'Aspect breakdown' 'PT9 reference' 'PT10 landscape' 'PRD alignment' 'Scope decisions' 'Recommended first slice'; do
  grep -qF "$s" "$BRIEF" && echo "OK: $s" || echo "MISSING: $s"
done
grep -q 'SendReceiveProjectsForm' "$BRIEF" && echo JOIN_OK
# the brief should be a tracked-able artifact (shows as untracked/new in the repo that owns .context), NOT gitignored
git -C "$(git rev-parse --show-toplevel)" check-ignore "$BRIEF" >/dev/null 2>&1 && echo "IGNORED (bug — brief must be shareable)" || echo SHAREABLE_OK
```
Expected: all `OK:`, `JOIN_OK`, `SHAREABLE_OK`.

- [ ] **Step 4: Verify the checkpoint + handoff behavior**

Confirm the command **paused** at the checkpoint (presented the brief and waited) rather than
proceeding straight to a plan, and that on approval it invoked `superpowers:writing-plans`. If it
auto-decided scope or skipped the checkpoint, that's a bug in Task 8 Step 6 — fix and re-run.

- [ ] **Step 5: Record the result**

If the smoke test surfaced inaccuracies (wrong inventory match, broken path, a degraded agent
that should have succeeded), fix the relevant file and re-run. When it passes, the feature is
done. The generated brief under `.context/research/investigations/<slug>/` is a shareable,
trackable artifact — commit it (in the repo that owns `.context/`) only if you want to keep this
smoke-test run; otherwise discard it. Don't commit it automatically.

---

## Self-Review

Run after the plan is written; fix inline.

**1. Spec coverage** (against `2026-06-18-investigate-prd-design.md`):

| Spec element | Task |
|---|---|
| §5 architecture: command + 4 agents + bundled research dir | Tasks 4–8 (agents/command), Tasks 1–3 (research) |
| §6 flow: interpret → per-aspect investigate → brief → checkpoint → writing-plans | Task 8 (Steps 2–7) |
| §7.1 `prd-interpreter` (parse + per-aspect classify + soundness gate) | Task 4 |
| §7.2 `feature-mapper` (inventory lookup, source-key codes, doc-scout mining) | Task 5 |
| §7.3 `pt9-archaeologist` (4-axis search, reverse-dep scan, read discipline, validation/enum, tests, UI, dev-access, no-leakage) | Task 6 |
| §7.4 `pt10-reuse-scout` (discover-conventions, reuse-vs-build, command surface, net-new primary) | Task 7 |
| §8 brief: 8 sections incl. PRD-alignment table + present-options scope decisions | Task 8 Step 5 |
| §9 access: bundled inventory (source of truth) + `~/git` constellation + degradation | Tasks 1–3, Task 7/8 |
| §10 non-goals (no gates/IDs/golden-masters/etc.) | Global Constraints + per-agent drop notes + Task 9 sweep |
| §11 mining map (all rows) | Tasks 4–8 embed the lifted technique; drop columns honored |
| §12 edge cases (not-in-inventory, fully-net-new, epic, repo-absent) | Task 8 Error handling |
| §13 prerequisite: bundle inventory once; `lyonsm/` obsolete | Task 1 (+ README) |
| §14 decisions (all 8) | command name `/investigate-prd`; 4 agents; `~/git`+degrade; bundle PT9 refs (Tasks 2/3); inventory README maintenance; constellation+standards net-new depth; brief shared & tracked at `.context/research/investigations/` (kept); checkpoint = disk + inline |

**2. Placeholder scan:** the agent/command bodies are complete authored files (no TBD/TODO).
`<derived-slug>` / `<slug>` / `{…}` inside the *command body* are runtime substitutions the
command performs at execution, not plan placeholders — that is correct and intended.

**3. Type/name consistency:** the four `subagent_type` strings in Task 8 equal the four `name:`
values in Tasks 4–7 (`prd-interpreter`, `feature-mapper`, `pt9-archaeologist`, `pt10-reuse-scout`)
— verified by Task 8 Step 4 and Task 9 Step 3. Runtime bundle paths
(`.context/research/paratext-9-features/00_Master_Feature_Index.md`,
`.context/research/Paratext9-Overview.md`, `.context/research/Pt9-Dev-Access-Inventory.md`,
`.context/research/paratext-10-orientation.md`) match the files created in Tasks 1–3 — verified
by Task 9 Step 4.

**4. Build-it-where-mining-falls-short (per the user's note):** the Shape-Up PRD *parsing*
(Task 4 Steps 1–3) and the *per-aspect port-AND/OR-net-new* classification are authored fresh —
ai-porting had no PRDs and treated a feature as a single PORT unit. The shared-brief location
(`.context/research/investigations/`, chosen to be stable across the upcoming `general/` →
paranext-core migration) is also a fresh decision, not mined. These are flagged as built, not mined.

---

## Execution Handoff

**Plan complete and saved to `.context/designs/2026-06-18-investigate-prd-command.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — I execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**






