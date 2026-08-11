# Feasibility check — Sprint 89 Simple Quality PRD (draft 2)

> **Frozen record** — feasibility review by Katherine Jensen (AI-assisted) against draft 2 of
> [sp89-simple-quality.md](./sp89-simple-quality.md) — the PRD version committed alongside this
> file, 2026-08-12. PR states quoted below were live-checked that day; follow the current PRD
> and repos, not this document. The review text is preserved verbatim from line 1.

I'll ground this in the two dependency facts the PRD says are the critical path (PR #2425 upstream, and paratext-10-studio #171 here), then give you the assessment. Let me quickly check their live state.

Bash Check live state of PR #171 (this repo) and #2425 (upstream core)
IN
gh pr view 171 --json number,state,title,isDraft,updatedAt,mergeable,reviewDecision 2>&1 | head -40; echo "----2425----"; gh pr view 2425 --repo paranext/paranext-core --json number,state,title,isDraft,reviewDecision,updatedAt 2>&1 | head -40

OUT
{"isDraft":false,"mergeable":"UNKNOWN","number":171,"reviewDecision":"APPROVED","state":"MERGED","title":"fix(patch): scope GetSharedProjects() to explicit projectIds when given","updatedAt":"2026-08-12T11:37:52Z"}
----2425----
{"isDraft":false,"number":2425,"reviewDecision":"REVIEW_REQUIRED","state":"OPEN","title":"Improve performance when switching to Simple","updatedAt":"2026-08-11T18:06:53Z"}
Two facts confirmed against the live repos (today, 2026-08-12):

paratext-10-studio #171 — MERGED today. Titled "fix(patch): scope GetSharedProjects() to explicit projectIds when given" — so the in-repo prerequisite the PRD hangs NN-4's startup follow-on on is now cleared. (Caveat: that title reads like a Send/Receive project-scoping fix, not startup perf — worth a 5-minute confirm that #171 actually delivered the startup-enabling piece Tom meant, vs. sharing a number by coincidence.)
paranext-core #2425 — still OPEN, REVIEW_REQUIRED, last touched 2026-08-11. The critical-path PR has not landed and still needs review. This is the single fact the whole feasibility verdict pivots on.
Feasibility review — Sprint 89 non-negotiables
Bottom line
Conditionally feasible, but the "all 6 NN" target is a stretch, not a plan. The realistic landing is 4–5 of 6 NN dev-verified by sprint close, with tester verification trailing. Whether you hit 6 is decided almost entirely by one external bet: does #2425 land in the first 2–3 days? It gates two of the six NNs (NN-3 and NN-4). Everything else is normal sprint risk; #2425 is the thing that can turn "5 of 6" into "3 of 6."

The PRD itself is unusually well-hedged — time-boxed framing on the unbounded items, an escape valve on NN-5, dev-verification-counts-for-close, behavioral (not numeric) success criteria. Those hedges are why this is feasible at all. Read another way: the author has already pre-spent most of the slack. There isn't much left to absorb a surprise.

The capacity math is tighter than "3 FTE" sounds
3 FTE × 10 working days = 30 person-days nominal.
Deduct ceremonies/refine/PR-review (~10–15%), the context-switch tax on part-timers (a 0.4-FTE dev juggling other duties nets closer to 0.3 of useful throughput), and — critically — the PRD shifts packaged-build verification onto devs ("dev verification counts for close"), which eats dev capacity you'd normally hand to the tester.
Effective productive capacity ≈ 20–24 dev-days.
Sum of realistic per-NN midpoints is ~27–33 dev-days — i.e. over effective capacity by 20–40%, even after the NN-5 escape valve fires. That's the arithmetic behind "5 of 6 is the likely floor, 6 is the stretch."

"Spread across 5 people" is a mild negative, not a neutral repackaging of 3 FTE: 6 NNs / 5 people ≈ one apiece, but the NNs are wildly unequal (NN-5 is ~5 bugs, NN-2 is a "cluster"), and a part-timer's calendar gaps stall anyone downstream. Nobody part-time should own the #2425 / NN-3 / NN-4 critical path — that needs your closest-to-full-time person.

Per-NN sizing and risk
NN Size (dev-days) Confidence Dominant risk
NN-1 editor blank-out 3–5 Med-high Root cause is identified (hooks violation) + error boundary is boilerplate. But no repro → can't prove the blank-out is gone; error boundary is the real insurance.
NN-2 stale project/book text 4–6 Med Two known tickets are tractable; "Roopa's broader re-render cluster" is the unbounded part.
NN-3 mode-switch corruption 5–8 Low-med Gated on #2425. Requires building mode-switch regression-test infra that doesn't exist today. Flagged as "most likely to regress silently."
NN-4 startup/switch perf 6–9 Low Gated on #2425 (still OPEN). "Land someone else's PR with serious review feedback" is not an estimable task. Packaged-P10 verification is separate work.
NN-5 picker bugs + consolidation 6 (bugs) / 12+ (with consolidation) Med 5 distinct bugs across a messy surface. Escape valve assumed to fire — consolidation → NTH — is baked into my "feasible" read.
NN-6 WebSocket silent death 4–7 Med Not drop-in: server forgets registrations on drop; data-provider process exits on disconnect. Real engineering, but time-boxed to "visible failure + reconnect."
Dependency shape is contained, which is the saving grace: NN-1, NN-2, NN-5, NN-6 are independent and parallelize cleanly across four people; only NN-3 → NN-4 are coupled (both via #2425). So the right allocation is obvious — strongest 1–2 devs on the #2425/NN-3/NN-4 spine, everyone else on an independent NN.

Where it breaks
#2425 slips past week 1. Live status says OPEN/REVIEW_REQUIRED today. If it doesn't land in days 1–3, NN-3 and NN-4 both compress into a corner and you're looking at 4/6 at best. The PRD's own open question ("What will it take to land #2425?") is the correct sprint-entry gate — do not start the sprint without Tom's answer, and pre-define the NN-3/NN-4 fallback scopes now, not mid-sprint.
No-repro verification debt (NN-1, NN-6). You can ship plausible fixes but can't close them with confidence; "dev-verified on packaged build" is the honest bar, and the PRD already sets it there. Good — just don't let anyone read those two as "proven fixed."
One tester = verification serialization. The PRD absorbs this by letting dev-verification count, but that's capacity already subtracted above; it's not free.
Recommendations (in priority order)
Gate the sprint on #2425. Get Tom's landing estimate before day 1. If it can't plausibly land in week 1, adopt the pre-written NN-3/NN-4 fallback scopes immediately.
Treat "6 NN" as the stretch and "5 NN" as the commit. Set the escape valve on NN-5 (consolidation → NTH) as the default, not the contingency — my feasibility read already assumes it.
Staff the critical path with a near-full-time owner; put part-timers only on independent NNs (NN-1, NN-2, NN-5-bugs, NN-6).
Confirm the #171 → startup link (its merged title doesn't obviously match "startup follow-on") so NN-4 isn't built on a mis-referenced dependency.
Expect NTHs to be near-zero. At 20–40% over on the NNs alone, the "up to 10 NTH" line is aspirational; don't let it create the impression of extra committed scope.
