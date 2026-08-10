# Refine-pass feedback — Sprint 89 Simple Quality PRD

> **Frozen record** — output of `/refine-prd docs/prds/sp89-simple-quality.md` run 2026-08-10
> against commit `b7d0abd374a`. Reflects the repos and open PRs as of that date; follow the
> current PRD and code, not this document.

## What the PRD asks

| Item     | Ask                                                                              | Testability                                                                                                |
| -------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| NN-1     | Editor never blanks; crash screen + logged details                               | A tester could verify this (kill the editor deliberately → crash screen appears)                           |
| NN-2     | Panes never show wrong project/book text                                         | A tester could verify this (clear repro steps exist in both tickets)                                       |
| NN-3     | Mode switching never corrupts layout or current project                          | Testable, but "never" rests on a race — needs the mid-load switch case called out as an explicit test step |
| NN-4     | Land fast-switch PR; time-boxed startup/switch improvement, before/after numbers | Testable as written ("materially improve and report")                                                      |
| NN-5     | Fix selection bugs; converge duplicates; keep two-surface design                 | Two people could read "converge" differently — see gaps                                                    |
| NN-6     | Never dies silently: diagnose + reconnect or visible failure                     | Testable once open question 3 (acceptance bar) is settled                                                  |
| NTH 1–10 | —                                                                                | All individually verifiable except NTH-9's footnote item and NTH-2 (premise checks below)                  |

## Reality check

**Per our PT9 reference:** the PRD makes no Paratext 9 claims — nothing to check.

**Already in Paratext 10** (shrinks or reshapes scope):

- **Cheaper than they look:** the history-dropdown layering bug (NTH-5) is the third
  occurrence of an already-solved layering problem — prior fixes come with a
  regression-test pattern to copy. The Simple zero-state dead-end (NTH-8) is mostly an
  existing "get resources" affordance that Simple's new-tab screen deliberately hides —
  button, action, and copy all exist. The sync banner jump (NTH-3) is a positioning
  change with existing overlay support.
- **Half done already:** the versification fix NTH-4 wants to port was merged in July;
  only the porting remains. One of NN-5's bugs (open-project dropdown empty at startup)
  was substantially fixed on main in early August — the residual issue is that "loading"
  and "you have no projects" look identical in the Simple toolbar. Another (resources
  not all shown) has an open PR in flight.
- **Reuse, don't invent (NN-2):** a working "book not available" message and banner copy
  already exist in the product (the editor and the enhanced-resources view); the
  affected panes never adopted them. A pattern also exists for re-pointing related panes
  when the project switches — the Text Collection isn't wired into it.
- **Genuinely new (NN-1):** no crash-catching safety net exists anywhere in the product
  today, so deliverable 2 is real net-new work — though a ready-made crash-details
  display component exists, currently unused. The scan confirmed the root-cause
  hypothesis and found a second small defect at the same spot: the diagnostic message
  the failure produces is currently empty, which is why this has been hard to chase.
- **Harder than it looks (NN-6):** zero reconnect capability exists today, and two
  structural constraints mean a reconnecting-socket package alone won't do it: the
  server forgets everything a connection registered when it drops (reconnect must
  re-establish all of it), and the data-provider side treats disconnect as "exit the
  process". Keep the NN scoped as written — mitigation-or-visible-failure — but
  "evaluate the package" should not read as "this is a drop-in".
- **Sequencing dependency (NN-3/NN-4/NN-5):** the open fast-switch PR already contains
  fixes for both the mode-switch race _and_ the Power-project-bleeds-into-Simple
  problem; NN-3 work started before it lands will collide with it. The two-surface
  picker design NN-5 pledges to preserve currently exists **only on an unmerged PR** —
  on main, that design has no code.

## Contradictions and gaps

1. **NN-5's counts are stale.** More selection surfaces exist than "two components +
   three dialogs" (including one that still ships mock data and a dialog pair with
   essentially no real users). Phrase the convergence target as an outcome — "one
   implementation per distinct job; retire the unused surfaces" — rather than exact
   counts that are already wrong.
2. **NN-5 presupposes unlanded work.** "Preserve the split per the recorded design"
   mandates protecting something that isn't on main. Say which comes first: land/revive
   that design work, or fold its design into the convergence effort.
3. **NTH-2's premise couldn't be confirmed.** The scan traced the sync progress text but
   could not find the "Syncing " + raw-string concatenation in any current checkout — it
   may come from a newer Studio patch than what's checked out. Keep the NTH but add
   "verify against the packaged build" as its first step.
4. **NTH-9's footnote item doesn't match the code.** No shared footnote setting exists
   that _could_ leak across panes; the panes named in the report contain no footnote
   behavior. Needs Levi's exact repro before it's committable.
5. **NTH-7 may not be fixable in this codebase.** The delete-guard bypass appears to
   live in the shared editor package (separate deliverable, own release path). Surface
   as a cross-package risk.
6. **NN-3's safety criterion has no backstop.** "No NN fix regresses Power" has no
   automated mode-switch test today. Consider making "a Simple↔Power switching
   regression test exists" part of NN-3's definition of done.
7. **Open question 4 (history carry-over) has no disposition** — neither in scope, out
   of scope, nor an NTH. Give it a home (likely: confirm works-as-intended and drop).

## Appetite sanity

The six NNs are not evenly sized. NN-5 (six-plus bugs _and_ a consolidation) and NN-6
(diagnosis plus a mitigation with two structural constraints) are each the size of a
small epic aspect; NN-1/NN-2 are well-bounded; NN-4 is deliberately time-boxed. Several
NTHs are near-free (5, 8, 3) — if the sprint squeezes, the cut line may fall _inside_
NN-5/NN-6 rather than at the NN/NTH boundary. NN-4 and NN-6 have time-box escape valves;
NN-5 has none — consider one (bugs are the NN, consolidation degrades to NTH under
pressure). Four separate open PRs are load-bearing for this sprint; landing them is real
sprint work the appetite should acknowledge.

## Questions to settle in the PRD

1. **NN-6 acceptance bar** (open question 3) — suggested: adopt the PRD's own
   recommendation explicitly; mitigation shipped + diagnosis reported = done.
2. **NN-5 sequencing** — is the two-surface design the committed product direction? If
   yes, the design PR lands (or its design is folded in) before convergence starts.
3. **NN-5 escape valve** — which half is truly non-negotiable if time runs short: the
   bug fixes (suggested) or the consolidation?
4. **Open question 4's disposition** — decide drop vs ticket.

## Fine to leave open

- BCV book-list UX (open question 1) — correctly logged, blocks only the book-list half
  of NTH-4.
- Sp 87 leftover set (open question 2) — correctly deferred to sprint boundary.
- PT-1641 root cause (open question 3) — fine once the acceptance bar is settled.
- Where exactly the sync progress strings originate (from NTH-2's premise check) — an
  engineering verification, correctly not answered in the PRD.
