# Jira draft — dry-run preview (nothing created)

> What `/prd-to-jira` would create for this brief, shown for approval. Project `PT`, parent issue
> type **Combined**, children **Sub-task**. No time estimates, no assignees, default status.

---

## Parent issue (Combined)

**Summary:** Donna syncs her project with the team (core Send/Receive) — gap closure

**Description:**

From the PRD: "A distributed team's work silently diverges unless members can push their changes
up and pull teammates' changes down. Send/Receive is the single mechanism keeping a team on one
project instead of many drifting copies; without it PT10 Power is unusable for any team of more
than one person."

Link to the full PRD: `PRD-Power-Donna syncs her project with the team_0-003.md`

Investigation note: the core S/R feature shipped end-to-end while this PRD was in draft
(`paratext-bible-send-receive` extension + Studio transport overlay + core toolbar/auth). This
epic covers the remaining gaps and the evidence pass; the appetite is far under the PRD's 2 weeks.

Non-Negotiables:

| # | Requirement | Jira Ticket(s) | Related Nice-To-Haves |
| --- | --- | --- | --- |
| 1 | Manual S/R trigger: F9 and Project menu | {WI-1 ticket} (menu trigger already ships) | |
| 2 | Donna needs to be able to select projects to sync | Shipped — evidence via {WI-3 ticket} | Donna wants to see which projects are new or updated (ships: Edited/New badges) |
| 3 | Donna receives confirmation that S/R is finished | Shipped — evidence via {WI-3 ticket} | |
| 4 | Donna receives a summary of what was sent and received | Shipped — evidence via {WI-3 ticket} | |
| 5 | Donna needs to know what went wrong with S/R, if it fails or is incomplete, in simple language | {WI-2 ticket}, {WI-3 ticket} | Donna has opportunity to abort the S/R process (ships; WI-2 makes the outcome honest) |
| 6 | Resilient to intermittent / slow connections (resume or fail cleanly) | Shipped as "fail cleanly + safe retry" — evidence via {WI-3 ticket}; no transfer resume (would require forbidden transport changes) | Progress indicator during sync (ships) |

---

## Sub-task 1 (WI-1): Wire F9 to open Send/Receive

### User Story

As Donna, I can press F9 anywhere in PT10 to start Send/Receive, matching the Project-menu
trigger (NN-1).

### Description

The Project-menu trigger ships (`paratext-bible-send-receive/contributions/menus.json`), but F9
is wired nowhere (deterministic `F9` grep: zero hits across paranext-core, paratext-10-studio,
and both extensions repos). ADR-0002 (`.context/standards/Architecture-Decisions.md`) already
decided the approach: a branch in the main-process `before-input-event` handler — not a
declarative keybinding API.

Provenance note: PT9 never bound F9 to S/R (F9 = "Next book"; the feature inventory's "(F9)"
annotation is an inventory error). F9-for-S/R is a new PT10 decision made by ADR-0002 from this
PRD.

### Implementation Ideas

- Add the F9 branch in `src/main/main.ts` (`before-input-event` handler, ~lines 618-685) →
  `commandService.sendCommand('paratextBibleSendReceive.openSendReceive')`.
- First verify F9 is unclaimed in PT10 (scripture editor and platform shortcuts) — cheap check,
  real prerequisite.
- Degrade gracefully when the S/R extension isn't installed or S/R is unavailable
  (`platformGetResources.isSendReceiveAvailable` gates the toolbar button the same way).

### Testing Ideas

- Unit test the handler branch (F9 dispatches the command; other keys unaffected).
- Manual: F9 with a shared project open shows the S/R dialog; F9 in Simple mode / without the
  extension does nothing harmful; no editor-navigation regression.

### Definition of Done

- F9 opens the Send/Receive dialog in Power mode; no regressions; `npm run typecheck && npm run
  lint && npm test` green.

### Dependencies

- Independent of the other sub-tasks; can run in parallel.
- Serves parent NN1.

---

## Sub-task 2 (WI-2): Show cancelled syncs as cancelled, not empty success

### User Story

As Donna, when I cancel a Send/Receive, the results clearly say it was cancelled — instead of
looking like a successful sync with no changes (NN-5; makes the NTH abort honest).

### Description

`send-receive.web-view.tsx` (~line 300) auto-shows results on completion but ignores the
`Cancelled` result flag (known gap, Studio #150): a cancelled run renders as an empty success.
PT9's behavior is the model: cancel finishes the in-flight project, then aborts, and tells the
user "Send/Receive cancelled. Results for any completed projects will be displayed."

### Implementation Ideas

- In `paratext-bible-send-receive`: add an explicit cancelled state to the results flow
  (`send-receive.web-view.tsx`, `results-view.component.tsx`) keyed off `ResultsData`.
- Keep completed projects' results visible under the cancelled banner (PT9 parity).
- New localized strings for the cancelled banner/status; follow localization rules.

### Testing Ideas

- Component test: results with `Cancelled` set render the cancelled state, not the success state.
- Manual: cancel mid-sync of several projects; completed projects' summaries still shown.

### Definition of Done

- A cancelled sync is visibly reported as cancelled; completed-project results remain; strings
  localized; lint/typecheck/tests green.

### Dependencies

- Independent of the other sub-tasks; can run in parallel.
- Serves parent NN5 (and the abort nice-to-have).

---

## Sub-task 3 (WI-3): Verify each non-negotiable against the shipped feature

### User Story

As the team, we have recorded evidence that every non-negotiable of the core S/R PRD is met by
the shipped feature in Power mode — or a named gap with a follow-up ticket (NN-2…NN-6).

### Description

The feature shipped while the PRD was in draft, so the epic's remaining risk is unverified
claims, not missing code. Walk each non-negotiable against the running app and record
pass/gap, using PT9's failure catalogue (from source archaeology) as the spot-check list.

### Implementation Ideas

- Checklist per NN: NN-2 picker + single-project path; NN-3 completion confirmation; NN-4 summary
  parity (user, book, chapter ranges, verse counts, notes/renderings file types); NN-5 failure
  messages; NN-6 interruption behavior.
- Failure-mode spot checks (PT9-derived): offline / connection lost; slow connection & timeout;
  interruption mid-transfer (kill the connection; verify clean fail, `hg` auto-recovery, safe
  retry); repository locked by another user; registration/auth failure; cancelled (pairs with
  WI-2).
- NN-6 acceptance reading (confirmed with owner): "fail cleanly + safe retry" — there is no
  partial-transfer resume in PT9 or PT10, and adding one would require forbidden transport
  changes.

### Testing Ideas

- The deliverable IS the test: a written checklist mapping each NN to evidence (screenshot/log)
  or a named gap. File one follow-up ticket per gap.

### Definition of Done

- Every NN row has evidence or a linked follow-up ticket; the checklist is committed to
  `.context/research/investigations/prd-power-donna-syncs-her-project-with-the-team-0-003/`.

### Dependencies

- Best run after WI-1 and WI-2 land (so their fixes are covered), but can start immediately.
- Serves parent NN2, NN3, NN4, NN5, NN6.
