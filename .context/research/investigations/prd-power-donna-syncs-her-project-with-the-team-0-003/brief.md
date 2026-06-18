# Discovery brief: Donna syncs her project with the team (core Send/Receive)

> Investigation of PRD `PRD-Power-Donna syncs her project with the team_0-003.md` (v0-003, 2026-06-12).
> Produced by `/investigate-prd`, then refined with two follow-up investigations (F9 mechanism;
> PT10 resilience reuse). All agents ran with full repo access (PT9 + the whole PT10 constellation).

## 1. Feature summary

**Problem.** On a distributed translation team, no one's work is shared until Send/Receive (S/R)
is triggered. S/R is the single mechanism that keeps a team on one project instead of many
drifting copies — it must be one obvious action, give clear feedback on what changed, and fail
gracefully on a poor connection.

**Appetite.** 2 weeks (1 developer + part-time designer). Foundation epic, ships first. Narrow
scope (defer the multi-project picker) rather than extend the timeline.

**Non-negotiables.** Manual S/R trigger (F9 + Project menu); select project(s) to sync; completion
confirmation; compact summary of what was sent/received; plain-language failure messages; resilient
to intermittent/slow connections (resume or fail cleanly, safely retryable, never half-synced or
corrupting local edits).

**No-gos.** Conflict-resolution UI, automatic/scheduled S/R, project history & revert (each a
separate PRD); Paratext Live (separate epic); USB-drive sync & Chorus Hub (separate epics). **No
modification to the S/R transport layer** — PT10 already syncs with PT9 teams; PT10 Power "adds UI
controls only."

> **Headline finding (read this first).** This is **not a from-scratch port**. A mature PT10
> Send/Receive extension (`paratextBibleSendReceive`, v0.4.0-alpha) already exists in
> `paratext-bible-internal-extensions`, backed by a C# command service in paranext-core whose
> transport bodies live in the Paratext 10 Studio overlay. **~90 % of the PRD's non-negotiables are
> already implemented and shipped.** The investigation re-frames the work from "port
> `SendReceiveProjectsForm`" to "validate the existing extension against the PRD and add **one** small
> net-new shortcut (F9, ~½ day)." Resilience — the PRD's load-bearing risk — is **confirmed
> inherited** (PT10 reuses PT9's `ParatextData` engine wholesale), not new work.

## 2. Aspect breakdown

All nine aspects derive from one PT9 source — `SendReceiveProjectsForm` / Category 10 — so they
were investigated as one feature (PT9 map + archaeology done once, not nine times). "PT9-port" is
the PRD's framing; the **PT10 status** column is the investigation's correction.

| # | Aspect | Origin | Appetite | PT10 status (investigation) |
|---|--------|--------|----------|------------------------------|
| 1 | Manual S/R trigger — menu | PT9-port | Non-neg | **Exists** — main menu + scripture-editor menu wired (`menus.json`, `openSendReceive`) |
| 1b| Manual S/R trigger — **F9 key** | net-new (PT10) | Non-neg | **Net-new, bounded** — no declarative keybinding API, but ~½-day one-branch add in the existing main-process `before-input-event` handler |
| 2 | Project selection (single + multi) | PT9-port | Non-neg (multi = 1st deferral) | **Exists** — multi-select table w/ persisted `selectedProjectIds` |
| 3 | Completion confirmation | PT9-port | Non-neg | **Exists** — results view (`isShowingResults`) |
| 4 | Received-changes summary (compact) | PT9-port | Non-neg | **Exists** — per-revision/per-book change list |
| 5 | Plain-language failure reporting | PT9-port | Non-neg | **Exists** — failures routed to notifications; overlay ships the localized strings |
| 6 | Resilient/retryable sync | PT9-port | Non-neg | **Inherited (confirmed)** — PT10 reuses PT9's `ParatextData` engine wholesale (NuGet 9.5.0.22); overlay calls `SharingLogic.ShareChanges` + `VersionedText.BackupDirectories` |
| 7 | Progress indicator | PT9-port | Nice-to-have | **Partial (deferred)** — binary `isSyncing` spinner; fine-grained fields stubbed/commented |
| 8 | New/updated project indication | PT9-port | Nice-to-have | **Exists** — `editedStatus` = `edited`/`new`/`unregistered`, rendered |
| 9 | Abort in-progress S/R | PT9-port | Nice-to-have | **Deferred** — C# `cancelSync` exists but only called on app-shutdown; no UI button |

## 3. PT9 reference (the port source — what it actually does)

PT9 S/R is a clean **two-layer split**: the entire sync *engine* is in the portable backend
`ParatextData/Repository/` (.NET Standard, cross-platform); the WinForms UI (`Paratext/Repository/`)
is a thin shell over it. The engine wraps **Mercurial (hg)** for transport + history, with a
Chorus-derived `ParatextMerge.py` 3-way merge tool; the Internet transport adds a REST
bundle-exchange protocol on top of hg. **PT10 reuses this exact engine (§4, §7-D).**

**Where the logic lives (file:line):**
- **Orchestration + result model** — `ParatextData/Repository/SharingLogic.cs` — `ShareChanges` (per-project loop w/ cooperative cancel, :59-175), `Share1Project` (:264-363), `SendReceiveResult`/`SendReceiveResultEnum` (`Succeeded/Failed/NotUpgraded/ProjectVersionUpgraded`, :580-613).
- **The push/pull transaction** — `ParatextData/Repository/VersionedText.cs:846-1030` — under one non-stealable project **WriteLock** (released in `finally`): remote-lock → stage → merge → **pull** → merge → reload → **push**.
- **Transport** — `ParatextData/Repository/Hg.cs` (Mercurial wrapper; recover/retry/exception taxonomy) + `SharedRepositorySource.cs` / `InternetSharedRepositorySource.cs` (Internet = the PRD's target; REST bundle exchange + explicit server lock).
- **Compact change summary** — `Paratext/Repository/ChangeListForm.cs` + `RevisionHtmlHelper.cs` + `ProjectFileType.cs`.
- **Entry points** — `Paratext/MainForm.cs:950` (multi, **Ctrl+Shift+S**), `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs:722` (single, **no accelerator**).

**Key behaviors (all ✓ verified from source):**
- **Interruption safety = recoverable, not transactional.** Push/pull atomicity is delegated to
  Mercurial (atomic per `hg` command). PT9 adds *recovery*, not a cross-command transaction:
  `Hg.RunCommand` auto-runs `hg recover` + retries once on interruption (`Hg.cs:910-965`); lock-file
  cleanup deletes `.hg/store/lock`/`wlock` on confirmation; a per-project hg **bundle backup** is
  written to `_Backups/{guid}.bndl` after each S/R and can rebuild a project. A crash mid-sequence
  can leave the repo *merged-but-not-pushed* — **the next S/R completes it**. The model is "retry
  the Send/Receive," and it is safe to do so. **(PT10 inherits all of this — §7-D.)**
- **Cancel = cooperative, between commands.** `CancelModes.Cancelable` shows a Cancel button but
  throws no exception; `Progress.Mgr.Cancelled` is checked at the *start of each hg command* and
  between projects. **An in-flight `hg push`/`pull` runs to completion** (or times out); you cannot
  abort mid-transfer. The thread-aborting `Abortable` mode is `[Obsolete]` and unused.
- **Compact summary = per-user → per-book (book id, chapters-changed, verse-count, Added/Removed/
  Modified) + a category list (Notes, Renderings, Spelling, Terms…) — no text diff.** Confirms the
  PRD's "compact, not a full comparison" requirement is exactly PT9's model. "Undo" column is
  admin-only.
- **Failure surface** — per-project `SendReceiveResultEnum` + `FailureMessage`; `ChangeListForm`
  maps each enum value to a plain-language sentence; a separate alert lists fully-failed projects.
- **Gating ("validation", no text fields):** resources never sync (`IsResourceProject`); unshared
  projects rejected; role `None` skipped; observers can pull but only push to non-Internet sources;
  committed-file exclusion rules (executable extensions, Windows-invalid chars, non-ASCII names).
- **Two hidden dev/power gestures** (new — not yet in `Pt9-Dev-Access-Inventory.md`):
  **Shift-at-open** resets the S/R tip-id cache (`SendReceiveProjectsForm.cs:451`); **Ctrl-on-button**
  forces sync of all enabled projects bypassing the change filter (`:731,750-755`). Proposed as
  DEV-002 / DEV-003; PT10 has no dev-mode surface yet (standing open question).

## 4. PT10 landscape (what already exists; where it lives)

**Recommended home: extend `paratext-bible-internal-extensions/src/paratext-bible-send-receive`.**
No new top-level structure; no approval needed. The feature already follows the prescribed
patterns exactly (extension contribution → C# command service over PAPI → network-event emitter for
progress), per Architecture.md.

**Already implemented (reuse-as-is unless noted):**
- **Triggers (menu)** — `contributions/menus.json`: main menu *Project > Send/Receive Projects…* +
  scripture-editor *Send/Receive this project*; `command:paratextBibleSendReceive.openSendReceive` / `runManualSync`.
- **Project selection (single + multi)** — `send-receive-view.component.tsx` (multi-select table,
  edited/new/unregistered status, last-S/R date, admin names, count-confirm); persisted via `settings.json`.
- **Completion confirmation + received-changes summary** — `results-view.component.tsx` + `result-user-list.component.tsx`.
- **Failure reporting** — `send-receive.web-view.tsx` / `main.ts` route auth/internet/registry
  failures to notifications; plain-language strings ship in the Studio overlay (`%sendReceive_error_*%`).
- **New/updated indication** — `EditedStatus` (`edited`/`new`/`unregistered`) in `platform-scripture.d.ts:1790`.
- **Transport / resilience (inherited wholesale)** — C# `ParatextProjectSendReceiveService.cs`
  registers `commitChanges`/`commitDaily`/`syncProjects`/`cancelSync`; the open-source bodies throw
  `PlatformUnimplementedException`, but the Studio overlay (`paratext-10-studio/repo-patches/paranext-core.patch`)
  fills them with code "adapted from `SendReceiveProjectsForm`" that calls **PT9's `ParatextData`
  engine directly**: `paranext-core/c-sharp/ParanextDataProvider.csproj:40` references `ParatextData`
  **NuGet 9.5.0.22**; the overlay calls `SharingLogic.ShareChanges`, `VersioningManager.Get(...).Commit`,
  `new InternetSharedRepositorySource(...)`, and `VersionedText.BackupDirectories(...)`. So all PT9
  resilience (hg recover/retry, `.hg/store/lock`+`wlock` cleanup, `_Backups/{guid}.bndl` bundle
  backup, WriteLock-in-finally) is present as-is — **not raw Mercurial reimplemented**.
- **Progress (binary)** — `sync-status.web-view.tsx` + `sync-state.ts` + `onSyncStateChanged` event.

**Reuse-vs-build (raw):** overwhelmingly reuse. The single genuine build item:
- **F9 keybinding — net-new, bounded.** No *declarative* keybinding/accelerator contribution system
  exists (the menu schema rejects an `accelerator` field via `unevaluatedProperties: false`). But
  app-global shortcuts already have one home: the Electron main-process `before-input-event` handler
  (`src/main/main.ts:606-679`, where F12/zoom/Ctrl+Tab live), and `commandService.sendCommand` is
  already imported/used there (`main.ts:1012,1029`). F9 is a one-branch insertion calling
  `command:paratextBibleSendReceive.openSendReceive` (zero-arg). ~½ day, low risk, app-global,
  cross-platform from that single spot. (Decided: F9 opens the S/R panel — §7-A.)

**Deferred nice-to-haves (see §7-B/C):** user-facing **abort** (`cancelSync` exists but only wired
to app-shutdown; safe wiring also needs a concurrent-sync guard, `main.ts:124-127`); **fine-grained
progress** (`SyncProgressEvent` fields are commented out; populating them needs overlay event emission).

## 5. Open questions & rabbit holes

**From the PRD:**
- *Mid-sync interruption detection / unambiguous retry* (the PRD's one open technical question) —
  **RESOLVED.** PT9's model is hg-atomic-per-command + auto-recover/retry + bundle-backup, safe to
  re-run; and PT10 **reuses that exact engine** (`ParatextData` NuGet 9.5.0.22 — §4, §7-D), so the
  resilience non-negotiable is already met by reuse. No new transport/recovery work needed; the plan
  must route through `SharingLogic.ShareChanges` + `VersionedText.BackupDirectories` (as the overlay
  does) and must not bypass them with direct `hg`.
- *USB/Chorus Hub, format compatibility* — confirmed out of scope; transport inherited, no changes.

**Surfaced by investigation:**
- **F9 semantics — RESOLVED.** F9 opens the S/R panel (`openSendReceive`); a deliberate new PT10
  trigger (not a port), feasible and bounded (§7-A).
- **No declarative keybinding API yet** — app-global shortcuts are hand-coded in one place
  (`src/main/main.ts` `before-input-event`). Fine for one shortcut; if a batch of shortcuts is on
  the roadmap, building the declarative API (§7-A, Expand) and making F9 its first consumer is the
  cleaner long-term path. Otherwise file as a follow-up.
- **Two PT9 dev/power gestures (DEV-002/003)** have no PT10 dev-mode surface — note for whoever owns
  `Pt9-Dev-Access-Inventory.md` and the future PT10 dev surface.
- **Missing concurrent-sync guard** (`main.ts:124-127`) — relevant only if abort (deferred) is later
  pursued; noted so it isn't forgotten.

## 6. PRD alignment

| PRD section | Original | Discovery finding | Proposed update |
|-------------|----------|-------------------|-----------------|
| Boundaries — non-negotiable | "Manual S/R trigger: **F9** and Project menu" | F9 is a deliberate **new PT10 trigger** (PT9 had no F9; only Ctrl+Shift+S). No declarative keybinding API exists, but F9 is a ~½-day one-branch add in the existing main-process shortcut handler → `openSendReceive` | Keep F9 as an in-scope **net-new** item (not a port). Semantics decided: F9 opens the S/R panel (§7-A) |
| Boundaries — non-negotiable | Select projects; "another path for >1 project" (multi = first deferral) | Multi-project selection **already exists** in PT10 | CLAR-2 resolved: nothing to defer or build — multi-project is shipped |
| Boundaries — non-negotiable | Confirmation / summary / plain-language failures | All **already exist** in PT10 | Reframe from "build" to "validate against the PRD wording" |
| §2 Appetite | 2 weeks, 1 dev + part-time designer | Feature is ~90 % built; the only genuine build is F9 (~½ day) | Appetite is substantially over-budgeted; surplus is a candidate to redirect to the dependent epics (auto-sync, conflicts, history) |
| §4 Risks — Feasibility (MEDIUM): "wiring Chorus cleanly into PT10 UI inside 2 weeks" | The main unknown | The wiring is **done** and resilience is **confirmed inherited** (`ParatextData` reused wholesale). The only genuine build is F9 (~½ day, bounded). | Re-rate Feasibility **LOW** — core is built + resilient by reuse; F9 is small and well-scoped |
| §5 Technical context | "PT9 implementation is fully documented (SendReceiveProjectsForm)" | True — and the PT10 equivalent is already implemented (and reuses the PT9 engine). Documentation value is now *fidelity-checking* the PT10 build against PT9 | Use the §3 behavior digest as the acceptance checklist for the existing PT10 extension |

## 7. Scope decisions (present options — decide at the checkpoint)

### A. F9 manual-trigger keybinding (in-scope net-new — confirmed feasible & bounded)
F9 is a deliberate new PT10 shortcut for S/R (confirmed: the PRD's intent is to *add* F9, not port
it). There is no declarative keybinding API, but app-global shortcuts already live in one place: the
Electron main-process `before-input-event` handler (`src/main/main.ts:606-679`, alongside F12/zoom),
where `commandService.sendCommand` is already imported and used.
- **Build (★ recommended) — one branch in the existing main-process handler.** Add
  `if (input.key === 'F9') { event.preventDefault(); commandService.sendCommand('paratextBibleSendReceive.openSendReceive'); }`
  near `main.ts:611`. Size: ~½ day incl. tests. Reuse: high (mirrors F12 exactly). Risk: low.
  App-global + cross-platform from that one spot.
- **Expand — build a declarative keybinding-contribution API** (add `accelerator` to the menu schema
  + a dispatcher). Size: multi-week (touches platform-bible-utils types, the JSON schema, the macOS
  & renderer menubars, generated `papi.d.ts`, docs). Reuse: low. Worth it **now** only if a batch of
  shortcuts is on the roadmap — then F9 becomes its first consumer. Otherwise file as a follow-up.
- **Avoid — renderer-level global keydown** (`react-hotkeys-hook` in the app shell). Web-view iframes
  are `about:srcdoc`; their key events don't bubble to the top renderer, so F9 would be missed when
  an editor is focused unless duplicated into every web-view. More code, worse coverage than Build.

> **Sub-decision — DECIDED:** F9 **opens the S/R panel** (`command:paratextBibleSendReceive.openSendReceive`,
> zero-arg). Always works regardless of focus; the user then picks/confirms projects in the panel.
> (Considered and rejected: immediate sync of the active project or all open projects — needs
> active-project resolution and changes the "one obvious action" meaning.)

### B. User-facing abort button (nice-to-have) — **DECIDED: defer (skip for alpha)**
Rely on the existing shutdown-cancel; no button for alpha. Safe wiring would also need a
concurrent-sync guard (`main.ts:124-127`), and PT9 itself can't abort an in-flight hg push/pull (only
between commands). If pursued later: a `runCancel` TS command + Cancel button wired to the existing
`cancelSync`, plus the guard.

### C. Fine-grained progress (nice-to-have) — **DECIDED: defer (keep binary spinner for alpha)**
Keep the existing binary `isSyncing` spinner. Populating the stubbed `SyncProgressEvent` fields would
require the overlay to emit per-project/phase events (cross-team) — revisit only if that emission is
confirmed and the box allows.

### D. Resilience (non-negotiable #6) — **RESOLVED by investigation: inherited, no build**
PT10 reuses PT9's `ParatextData` engine **wholesale** (NuGet 9.5.0.22; `ParanextDataProvider.csproj:40`).
The Studio overlay's S/R service calls `SharingLogic.ShareChanges` + `VersionedText.BackupDirectories`
directly, so PT9's recover/retry, lock-file cleanup, and `_Backups/{guid}.bndl` bundle backup are all
present as-is. The resilience non-negotiable is **already satisfied**. The only obligation for the
plan: route through the engine APIs (don't bypass with direct `hg`), and don't modify the transport
(no-go). *(Residual: the literal bytes of the `9.5.0.22` DLL weren't decompiled — verified against
the matching-version PT9 source; divergence very unlikely.)*

## 8. Recommended first slice

**The smallest valuable increment is validation + the one genuine build (F9) — the rest is already
built and resilience is confirmed inherited.**

1. **Acceptance-check the existing `paratext-bible-send-receive` extension against §3** — run it and
   confirm each non-negotiable behaves per the PT9 digest: menu trigger, single+multi selection,
   completion confirmation, the compact summary's fields (per-user → per-book chapters/verses/status
   + category list), and plain-language failure messages. Output: a pass/fail checklist that becomes
   the alpha acceptance criteria.
2. **Implement F9 (decision A — Build)** — add the F9 branch to `src/main/main.ts`'s
   `before-input-event` handler → `command:paratextBibleSendReceive.openSendReceive`, with a test.
   ~½ day. F9 opens the S/R panel (semantics decided — §7-A).
3. **Confirm resilience is exercised through the engine** — no build; just ensure the acceptance check
   covers an interrupted-then-retried sync, since resilience is inherited from `ParatextData` (§7-D).

Abort (B) and fine-grained progress (C) are **deferred** nice-to-haves. This slice delivers a
*shippable, PRD-validated* core S/R well inside the 2-week box — the appetite is substantially
over-budgeted, so the surplus is a candidate to redirect toward the dependent epics (auto-sync,
conflict resolution, history) that build on this foundation.
