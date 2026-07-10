# Donna syncs her project with the team (core Send/Receive): investigation

> PRD: `PRD-Power-Donna syncs her project with the team_0-003.md` (v0-003, owner Vladimir).
> Shakedown run of `/investigate-prd`, 2026-07-02. No Jira tickets existed for this PRD when this
> ran; work items below are what the investigation proposes for the state of the code today.

## 1. What the PRD asks for

Distributed teams need to push their changes up and pull teammates' changes down; without
Send/Receive, PT10 Power is unusable for any team and every collaboration feature is blocked.
Appetite: 2 weeks (1 developer + part-time designer). Foundation epic for the three sibling sync
PRDs. Constraint: no transport-layer changes — "PT10 Power adds UI controls only."

| ID   | Non-negotiable                                                                     |
| ---- | ----------------------------------------------------------------------------------- |
| NN-1 | Manual S/R trigger: F9 and Project menu                                              |
| NN-2 | Donna needs to be able to select projects to sync                                    |
| NN-3 | Donna receives confirmation that S/R is finished                                     |
| NN-4 | Donna receives a summary of what was sent and received                               |
| NN-5 | Donna needs to know what went wrong with S/R, if it fails or is incomplete, in simple language |
| NN-6 | Resilient to intermittent / slow connections (resume or fail cleanly)                |

| ID    | Nice-to-have                                       |
| ----- | --------------------------------------------------- |
| NTH-1 | Progress indicator during sync                       |
| NTH-2 | Donna wants to see which projects are new or updated |
| NTH-3 | Donna has opportunity to abort the S/R process       |

No-gos: conflict-resolution UI · automatic/scheduled S/R · project history & revert · Paratext
Live · USB-drive sync & Chorus Hub (all separate PRDs/epics).

## 2. What already exists

**The feature is already shipped end-to-end in PT10** (last touched 2026-06-30). The
investigation found the prior discovery for this PRD reflected in ADR-0002, and the build merged:

- **Paratext 9 (reference):** the S/R transaction is commit → pull → merge → push-last, per
  project, atomic via Mercurial; results default to Failed until proven Succeeded (FB-51674);
  interrupted transactions are silently auto-repaired by `hg recover` on the next command —
  retry is simply running S/R again (`SharingLogic.cs:59-249`, `VersionedText.cs:846-1030`,
  `Hg.cs:903-965`). Fifteen distinct failure modes each have a plain-language message
  (`HandleErrors`). **F9 is NOT Send/Receive in PT9** — F9 is "Next book"; the only S/R
  accelerator is Ctrl+Shift+S on the multi-project form; the feature inventory's "(F9)"
  annotation is an inventory error the PRD inherited.
- **Paratext 10, shipped:** the `paratext-bible-send-receive` extension (internal-extensions)
  provides the dialog, multi-select picker with Edited/New badges + quick-selects (NN-2, NTH-2),
  auto-shown results with per-user/book/chapter/verse-count summary incl. notes/renderings file
  types (NN-3, NN-4), determinate progress bar + Cancel (NTH-1, NTH-3), and plain-language error
  classification with remediation buttons (NN-5). The real transport lives in the
  paratext-10-studio overlay patch calling ParatextData `SharingLogic` (NN-6 semantics inherited
  from PT9); paranext-core carries the wire contract, stub service, toolbar button, and the
  registration/auth extension. Project-menu trigger ships (NN-1, menu half).
- **Genuine gaps (deterministic sweeps):** `F9` has zero hits in all four repos (NN-1's F9 half
  unwired; ADR-0002 already prescribes the fix). A cancelled sync renders as an empty success
  (`Cancelled` flag ignored — known Studio #150). There is no transfer *resume* anywhere —
  resilience is reconnect-retry + per-project atomic transactions, i.e. "fail cleanly".

## 3. Proposed work items

| #    | Work item                                                    | Repo                                | Complexity | Depends on | Covers            |
| ---- | ------------------------------------------------------------ | ----------------------------------- | ---------- | ---------- | ----------------- |
| WI-1 | Wire F9 to open Send/Receive (ADR-0002)                       | paranext-core                       | Simple     | —          | NN-1              |
| WI-2 | Show cancelled syncs as cancelled, not empty success          | paratext-bible-internal-extensions  | Simple     | —          | NN-5, NTH-3       |
| WI-3 | Verify each non-negotiable against the shipped feature        | all (verification)                  | Moderate   | —          | NN-2…NN-6 (evidence) |

**WI-1 — Wire F9.** Add the F9 branch to the main-process `before-input-event` handler
(`src/main/main.ts` ~618-685) dispatching `paratextBibleSendReceive.openSendReceive`, exactly as
ADR-0002 prescribes (no declarative keybinding API). First verify F9 is unclaimed in PT10 (PT9
used it for book navigation, so users won't miss an old binding — but a PT10 collision must be
checked). Degrade gracefully when the S/R extension is absent.

**WI-2 — Honest cancelled-sync rendering.** `send-receive.web-view.tsx` (~line 300) ignores the
`Cancelled` result flag, so a cancelled run renders as a success with no changes. Add an explicit
cancelled state (PT9's wording is a good model: "Send/Receive cancelled. Results for any
completed projects will be displayed.") while keeping completed projects' results visible.
Localized strings included.

**WI-3 — Non-negotiable verification pass.** Walk NN-2…NN-6 against the running app in Power
mode and record pass/gap per NN, using the PT9 failure catalogue as the spot-check list: offline,
slow/timeout, interruption mid-transfer (verify clean fail + safe retry), repo locked by another
user, auth/registration failure, cancelled. Confirm summary parity (user, book, chapter ranges,
verse counts, notes/renderings). Each named gap becomes a new ticket.

## 4. Requirement coverage

| Requirement                   | Work item(s) | Notes                                                                     |
| ----------------------------- | ------------ | -------------------------------------------------------------------------- |
| NN-1 F9 + Project menu        | WI-1         | Menu trigger ships; F9 is the one unwired piece                             |
| NN-2 select projects          | WI-3         | Ships (picker + single-project path); WI-3 records the evidence             |
| NN-3 completion confirmation  | WI-3         | Ships (auto-shown results); WI-3 records the evidence                       |
| NN-4 sent/received summary    | WI-3         | Ships (per-user/book/chapters/verses + notes/renderings); WI-3 verifies parity |
| NN-5 plain-language failures  | WI-2, WI-3   | Ships for real failures; WI-2 fixes the cancelled case; WI-3 spot-checks messages |
| NN-6 resilient connections    | WI-3         | Ships as "fail cleanly + auto-reconnect + safe retry" — no transfer resume (see §5) |
| NTH-1 progress indicator      | —            | Ships (bar, percent, reconnecting state)                                    |
| NTH-2 new/updated indication  | —            | Ships (Edited/New badges + quick-select buttons)                            |
| NTH-3 abort                   | WI-2         | Ships (Cancel, effective ≤ ~2 s); WI-2 makes the outcome honest             |

## 5. Questions for the product owner

1. **Is this PRD now gap-closure?** The feature shipped while the PRD was in draft. Suggested:
   re-frame the epic as the three work items above; the 2-week appetite is far more than needed.
   *(Assumed yes for this brief.)*
2. **NN-6 "resume or fail cleanly".** There is no partial-transfer resume, in PT9 or PT10 —
   resilience is reconnect-retry plus atomic per-project transactions, and a literal resume would
   require the transport changes this PRD forbids. Suggested: accept "fail cleanly + safe retry"
   as satisfying NN-6, and let WI-3 verify it empirically.
3. **F9 provenance.** The PRD lists F9 as a PT9 behavior; PT9 actually binds F9 to "Next book"
   (the inventory annotation was wrong). ADR-0002 already commits PT10 to F9-for-S/R as a new
   decision — no action needed unless the owner wants to reconsider the key.
4. **PT9's hidden S/R support gestures** (Shift-open resets sync mementos, Ctrl-click forces all
   projects, hidden HTML export, `redirect.txt` server override…) — six were catalogued for the
   dev-access inventory (proposed DEV-002…DEV-007). Port any to PT10? Suggested: record, port none
   for now.
5. **PT9 quirks worth NOT reproducing** (from source archaeology): a release-build path where a
   cancelled batch reports overall success; two alerts that render literal `\n`; a scheduler bug
   (`.Milliseconds` vs `.TotalMilliseconds`) that stops periodic update checks after the first
   fire. None block this epic; listed so nobody ports them by accident.
