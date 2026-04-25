# Phase 3B Post-Review Audit Design - Enhanced Resources

- **Date**: 2026-04-25
- **Author**: Matt Lyons (via brainstorming session)
- **Feature**: enhanced-resources
- **Branch**: `ai/feature/enhanced-resources-rolf-03-04-2026`
- **Status**: Approved (ready for implementation plan)

## 1. Background

Phase 3B (backend implementation) for the `enhanced-resources` feature formally
passed gate `P3B.6` on 2026-04-22. Following gate passage, the user identified
serious problems and applied roughly 25 commits of post-3B fixes, including:

- Theme 16 - "server-owned token pipeline" (commit `ce19498918`).
- `IMarbleBookXmlSource` + `IMarbleBookTokenProvider` with LRU cache
  (commit `3abb084da0`).
- FU-CR1 / FU-CR3 / FU-CR4 fixes (dictionary `EntriesById` /
  `KnownResourceIds` population, missing-package threading, dual-index source
  language).
- `papi-er://` Electron protocol handler for marble images
  (commits `4c780b3d45`, `433f0a2e22`).
- `EnhancedResourceFactory` rewritten as a single NetworkObject
  (commit `b8ddfd8453`).
- Multiple service refactors to constructor-injected DI.

`data-contracts.md` was bumped to v2.3.0 with `last_updated: 2026-04-25` and
`status: draft`. Other UI-facing plans (`strategic-plan-ui.md` v2.3.0,
`ui-alignment.md` v1.4.0) were last generated on 2026-04-15 and may not fully
reflect the post-3B state.

`phase-3-backend` is currently in `awaiting_review` status. `phase-3-ui` is
`not_started`.

## 2. Goals

1. Verify the post-3B backend state is coherent before Phase 3 UI begins.
2. Run all standard quality checks (typecheck, lint, TS tests, C# tests) and
   confirm they pass; apply minimal inline fixes for trivial failures.
3. Reconcile UI-facing plans (`strategic-plan-ui.md`, `ui-alignment.md`) and
   `data-contracts.md` against the current post-3B backend implementation.
4. Produce a single audit artifact at
   `proofs/phase-3-backend/post-review-audit.md` with a clear "ready for UI"
   rollup (GREEN / YELLOW / RED) so the user can finalize Phase 3B.

## 3. Non-goals

1. Re-running TDD cycles for the original 14 capabilities (already gated).
2. Updating upstream artifacts (`behavior-catalog.md`, `boundary-map.md`,
   `business-rules.md`, `ui-inventory.md`, `golden-masters/`,
   `test-specifications/`) - drift there is reported, not auto-fixed.
3. Modifying historical decision/retrospective files.
4. Touching the untracked `e2e-tests/tests/enhanced-resources/` directory.
5. Starting any Phase 3 UI work. The audit is read-only with respect to UI;
   the user finalizes 3B themselves.
6. Auto-applying large fixes - those are surfaced as Blockers for user
   decision.

## 4. Audit Type

**Hybrid** (per user direction):

- **Focused audit** of post-P3B.6 change surface (~25 commits): code, tests,
  contracts, decisions, plans.
- **Coherence sweep** across all backend code/contracts/plans to catch
  second-order drift the post-3B fixes might have introduced (e.g. a fix in
  CAP-007 that subtly contradicts a CAP-001 invariant, or a Theme 16 ripple
  not yet propagated to UI plans).

## 5. Audit Report Structure

Single artifact at `proofs/phase-3-backend/post-review-audit.md`:

1. Frontmatter (`artifact: post-review-audit`, version `1.0.0`, `generated`,
   `agent`, `status`).
2. **Scope & Method** - trigger, audit type, files in scope, files out of
   scope.
3. **Change Surface** - commit range (`<P3B.6 sha>..HEAD`), backend code
   files changed, plan files changed, decisions/proofs entries.
4. **Quality Check Results** - table of checks (typecheck / lint / TS tests /
   C# tests) with command, result, notes; list of inline fixes applied
   (file:line + 1-line description); list of larger fixes deferred to
   Blockers.
5. **Theme 16 Ripple Analysis** - token pipeline shape, code consumers
   verified consistent, plan references status (data-contracts.md /
   strategic-plan-ui.md / ui-alignment.md).
6. **Subagent Verdicts (rolled up)** - one row per agent: verdict
   (PASS/CONCERNS/FAIL), Blocker count, Recommended count, Nit count, link
   or summary.
7. **Findings** - three subsections: Blockers, Recommended (do before UI),
   Nits (defer or skip). Each finding: ID, short title, file:line, what /
   why / fix-hint.
8. **Plan Reconciliation Summary** - per-plan: edits applied, version bump,
   Version Log entry summary; list of plans that were already coherent.
9. **Ready-for-UI Signal** - GREEN / YELLOW / RED rollup, outstanding
   blocker count, recommended next steps for the user.
10. Version Log table (per project convention).

### Severity buckets

- **Blocker** = pre-UI must-fix. Wrong invariant; broken
  test/typecheck/lint; data contract that doesn't match implementation; UI
  plan referencing a backend shape that no longer exists; security
  violation; ADR-registered decision violated.
- **Recommended** = should fix before UI but UI work can technically
  proceed. Stale plan wording that's not load-bearing; missing version-log
  entry; minor doc drift; non-load-bearing dead code.
- **Nit** = defer or skip. Naming preference, doc polish, micro-refactor
  with no behavioral effect.

## 6. Subagent Fan-Out

All eight subagents dispatched in parallel in a single message. Each
receives a shared brief plus an agent-specific focus line.

### Shared brief template

```
# Phase 3B Post-Review Audit - <agent focus>

## Context
You are reviewing the enhanced-resources feature AFTER Phase 3B
formally passed gate P3B.6 (2026-04-22). The user identified serious
problems and applied ~25 commits of post-3B fixes. You are part of a
parallel review fan-out designed to verify the post-fix state is
coherent before Phase 3 UI begins.

## Audit type
Hybrid: focused on the post-3B change surface (must catch) + coherence
sweep across all backend code/contracts/plans (best-effort, flag
second-order drift).

## Specific risk to watch
Theme 16 ("server-owned token pipeline", commit ce19498918) is an
architectural shift. Ripple analysis is required: any plan, contract,
test, or doc that references the OLD token pipeline shape is suspect.

## Change surface
- Feature root: .context/features/enhanced-resources/
- Backend code: c-sharp/EnhancedResources/, c-sharp-tests/EnhancedResources/
- Plans to compare against: data-contracts.md (v2.3.0 - just-updated,
  draft status), backend-alignment.md, strategic-plan-ui.md (v2.3.0),
  ui-alignment.md (v1.4.0)
- Commit range to focus on: <P3B.6 sha>..HEAD (filled at execution time)

## Out of scope
Untracked e2e-tests/tests/enhanced-resources/ directory, UI extension
code (not yet built), future UI phase work.

## Output expectations
- Verdict: PASS / CONCERNS / FAIL
- Buckets: Blocker / Recommended / Nit
- Each finding: file:line, what, why it matters, suggested fix
- DO NOT modify files. The orchestrator will apply fixes/edits.

## Your specific focus
<one paragraph per agent, see below>
```

### Per-agent focus

| Subagent                   | Focus line                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pr-reviewer-architecture` | Verify Theme 16 token pipeline architecture is consistent with `Architecture.md` and `Paranext-Core-Patterns.md`. Check `IMarbleBookXmlSource` / `IMarbleBookTokenProvider` / LRU cache placement. Verify `EnhancedResourceFactory` rewrite as single NetworkObject (commit `b8ddfd8453`) is correct. Watch for cross-process boundary violations and improper DI patterns. |
| `pr-reviewer-contracts`    | Verify `data-contracts.md` v2.3.0 (draft) accurately reflects the implemented C# code and the post-3B token pipeline. Reconcile MarbleToken shape, MarbleLexicalLinkOutput, ScopeFilterResult, all 13 method signatures. Confirm `M-013` / `M-016` / `M-017` / `M-018` REMOVED markers match code reality.                                                                  |
| `pr-reviewer-tests`        | Verify all post-3B C# changes have adequate test coverage (especially Theme 16's `DictionaryServiceTests`, `EncyclopediaServiceTests`, `GetTooltipDataTests` deltas). Check for tests still referencing old token shapes. Verify TDD discipline preserved through the post-3B fixes.                                                                                        |
| `pr-reviewer-completeness` | Trace each post-3B commit -> code change -> test -> contract update -> plan update. Find missing downstream artifacts. Verify all FU-CR\* fixes have corresponding entries somewhere (decisions / forward-notes / audit).                                                                                                                                                   |
| `pr-reviewer-consistency`  | Cross-artifact ID consistency: BHV-_, CAP-_, TS-_, M-_, FU-CR\* references must resolve. Check the data-contracts v2.3.0 update didn't break section-line refs in the TOC or other artifacts.                                                                                                                                                                               |
| `pr-reviewer-clarity`      | Look for dead code from refactors (especially Theme 16 + the DI-conversion sweep), stale comments referencing old patterns, naming inconsistencies in the new token-pipeline interfaces. Flag over-engineering.                                                                                                                                                             |
| `pr-reviewer-security`     | Verify the new `papi-er://` Electron protocol handler (commits `4c780b3d45`, `433f0a2e22`) follows `Security-Guide.md`. Check CSP additions are minimal/scoped, no blocked imports introduced, no extension-sandbox bypass.                                                                                                                                                 |
| `adr-reviewer`             | Verify post-3B decisions are registry-compliant. Check Theme 16's architectural shift, the NetworkObject + Factory choice (`b8ddfd8453`), DI conversions, and the `papi-er://` protocol decision against `decision-registry.json`. Recommend ADR additions for any newly-implicit decisions.                                                                                |

**Skipped**: `pr-reviewer-ux` (no UI built yet).

## 7. Theme 16 Ripple Analysis (Hands-On)

This is the most analysis-heavy section of the audit and is performed
hands-on in the orchestrating session, in parallel with the subagent fan-out.

Trace the new token pipeline end-to-end and verify each step has consistent
representation in plans / contracts / code:

1. **Source** - `IMarbleBookXmlSource` (commit `3abb084da0`) - where does
   book XML come from now? Confirm the abstraction boundary and ownership.
2. **Provider** - `IMarbleBookTokenProvider` + LRU cache - what's the cache
   key, eviction policy, thread-safety? Are these documented anywhere
   user-facing?
3. **Pipeline ownership** - "server-owned" (commit `ce19498918`) means the
   C# side now owns the token lifecycle; clarify what the
   renderer / extension-host receives.
4. **Token shape** - MarbleToken structure as currently emitted (verify
   against `data-contracts.md` 3.1).
5. **Consumers** - `ScopeFilterService` (CAP-003), `TooltipService`
   (CAP-014), etc. - confirm they consume tokens via the new provider, not
   directly from the parser.
6. **UI bridge** - `strategic-plan-ui.md` references the
   `MarbleToken[]-to-USJ conversion layer + annotation API for per-word
data`. Verify:
   - The `MarbleToken[]` shape the UI plan assumes still matches what the
     new pipeline emits.
   - The conversion-layer location (in extension? in `platform-bible-react`?)
     is decided and consistent with `ui-alignment.md`.
   - The annotation API design accounts for tokens being server-owned (e.g.
     lifecycle / refresh semantics).

Drift discovered at any of these six steps becomes either an inline plan
fix (executed per Section 8 of this spec, recorded in the audit's Section
8 Plan Reconciliation Summary) or a Blocker (recorded in the audit's
Section 7 Findings), depending on size.

## 8. Plan Reconciliation Strategy

For each of the three plans below:

1. Read top-to-bottom once to build a diff checklist against current code.
2. Apply minimal targeted edits: fix the specific stale wording / table
   cell, update version + Version Log row + `last_updated`. **No
   structural rewrites** unless a whole section is wrong - in which case it
   becomes a Blocker, not an inline fix.
3. Bump version per `frontmatter-common.md` rules: patch for
   clarifications, minor for new content, major for restructure (none
   expected).

| Plan                                                                      | Likely scope of edits                                                                                                                                                                                                      | Expected version bump                                                    |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `data-contracts.md` (v2.3.0, status: `draft`, `last_updated: 2026-04-25`) | Verify already-applied Theme 16 deltas are accurate; if the draft is correct, flip status to `approved`; if not, fix specific wording.                                                                                     | patch (-> 2.3.1) if fixes; status flip if clean                          |
| `strategic-plan-ui.md` (v2.3.0, generated 2026-04-15)                     | Update `MarbleToken[]-to-USJ` conversion language to reflect post-3B token shape; verify CAP-UI-001..009 backend-call references resolve to current method names; check Memento State Fields list against current backend. | patch (-> 2.3.1) likely; minor (-> 2.4.0) if a new ripple section needed |
| `ui-alignment.md` (v1.4.0, generated 2026-04-15)                          | Verify component mapping table still accurate; update Editor Capability Assessment if Theme 16 changed token shape; reconcile annotation API references.                                                                   | patch (-> 1.4.1) likely                                                  |

### Deferred-functionality + forward-notes pass

Quick pass while in the plan files:

- `implementation/deferred-functionality.md` - confirm any post-3B
  deferrals (e.g. parts of Theme 16 punted) are recorded.
- `forward-notes.md` - FN-001..FN-006 still relevant? FN-005 (tree
  component) and FN-006 (semantic domain breadcrumbs) feed the UI phase, so
  ensure they're not silently superseded by post-3B work.

### Edits not in scope

- `behavior-catalog.md`, `boundary-map.md`, `business-rules.md`,
  `ui-inventory.md`, `golden-masters/`, `test-specifications/` - upstream
  artifacts. If subagents flag drift here, it goes into Recommended, not
  auto-edited.
- `decisions/phase-3-backend-decisions.md`,
  `decisions/phase-3-backend-retrospective.md` - historical. The audit's
  own Version Log captures revisions instead.

## 9. Quality Check Execution

### Commands

| #   | Check                | Command             | Working dir      |
| --- | -------------------- | ------------------- | ---------------- |
| 1   | TypeScript typecheck | `npm run typecheck` | repo root        |
| 2   | TypeScript lint      | `npm run lint`      | repo root        |
| 3   | TypeScript tests     | `npm test`          | repo root        |
| 4   | C# tests             | `dotnet test`       | `c-sharp-tests/` |

C# format check (`dotnet csharpier --check .`) is **not** in the standard
pre-commit gate list - skip unless a subagent flags formatting drift.

For each check capture: command run, exit code, time elapsed, and the
relevant tail of output (truncated to ~50 lines if voluminous; full output
to a temp file linked from the audit if longer).

### Minimal-fix policy

A fix counts as "minimal and inline" if **all** of these hold:

- One file, one logical change.
- Less than 10 lines net.
- Cause is obvious from the failure message (e.g. unused import, missing
  semicolon, type narrowing one-liner, a stale-after-Theme-16 import path).
- No behavioral change beyond making the check green.
- Doesn't touch test assertions (only test infrastructure, e.g. fixing a
  test file's import).

If a fix needs even one of: multi-file change, design judgment, modifying
a test assertion to match new behavior, or more than 10 lines - it becomes
a **Blocker** in the audit with analysis, not an inline fix. The user
decides.

Every inline fix is documented in the audit's Section 4 (Quality Check
Results) with file:line and a one-liner.

## 10. Completion Criteria - The "Ready for UI" Signal

The audit's Section 9 (Ready-for-UI Signal) emits one of three
rollups:

- **GREEN** = ready for UI. All four checks pass (after any inline fixes),
  zero Blockers, zero subagent FAIL verdicts, plan reconciliation complete.
- **YELLOW** = your call. Checks pass, but one or more of: subagent
  CONCERNS verdict, Recommended findings present, plans reconciled with
  caveats, ADR additions suggested but not yet captured. UI work is
  technically unblocked - YELLOW just means there's polishing to consider.
- **RED** = not ready. Any of: a check still fails after fix attempts,
  Blockers present, a subagent FAIL verdict, plan-vs-code drift unresolved,
  security finding flagged.

The audit doesn't gate anything itself - it's an artifact the user reads to
make the call. The user finalizes Phase 3B themselves.

## 11. Execution Order (single end-to-end pass)

1. Capture P3B.6 commit sha + compute change-surface file list.
2. Run quality checks (1 -> 4), capture results.
3. Apply minimal inline fixes if any check fails; re-run that check.
4. Dispatch all eight subagents in parallel (single message).
5. While subagents run: hands-on Theme 16 ripple analysis (Section 7).
6. Subagents return; synthesize verdicts + hands-on findings.
7. Apply additional minimal inline fixes from subagent feedback.
8. Plan reconciliation edits (data-contracts, strategic-plan-ui,
   ui-alignment).
9. Optional: deferred-functionality + forward-notes touch-up.
10. Write `proofs/phase-3-backend/post-review-audit.md`.
11. Print summary to chat with the GREEN / YELLOW / RED signal.

## 12. Risks & Mitigations

| Risk                                                                                          | Mitigation                                                                                                                                                  |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subagents see plans before reconciliation; flag "drift" the orchestrator already plans to fix | Filter at synthesis. Dedupe is a known cost - accepted in exchange for fresh-context coverage of issues the orchestrator might miss.                        |
| Inline fix policy gets stretched ("just one more line")                                       | Hard 10-line ceiling; multi-file changes never qualify. Borderline cases default to Blocker.                                                                |
| Plan reconciliation requires structural rewrite the orchestrator misjudges as minor           | Always escalate to Blocker if a whole section is wrong; never silently restructure.                                                                         |
| Quality checks pass locally but fail CI for environmental reasons                             | Treat passing locally as the gate; CI failures discovered post-audit are out of scope and go into a follow-up.                                              |
| C# test environment missing or broken                                                         | Surface as Blocker; do not auto-install or auto-configure.                                                                                                  |
| Theme 16 ripple is larger than the audit budget                                               | If ripple analysis uncovers a structurally larger problem, stop the trace, write up findings as a Blocker, and let the user decide whether to expand scope. |

## 13. Open Questions

None remaining for this design phase. All clarifications resolved during
brainstorming:

- Audit type: hybrid (focused + coherence sweep).
- Output: single audit report + in-place plan edits.
- Subagents: yes, all eight minus `pr-reviewer-ux`.
- Quality-check failures: minimal inline fixes by orchestrator; larger
  fixes flagged as Blockers.
- Untracked `e2e-tests/`: ignored.
- The user finalizes Phase 3B themselves; the audit is informational.

## Version Log

| Version | Date       | Author                     | Change                                      |
| ------- | ---------- | -------------------------- | ------------------------------------------- |
| 1.0.0   | 2026-04-25 | Matt Lyons (brainstorming) | Initial design after brainstorming session. |
