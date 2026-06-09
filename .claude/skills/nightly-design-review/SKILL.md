---
name: nightly-design-review
description: Nightly routine that finds PRs needing a design review and runs the ux-design-review skill on each, then hands you one triaged report in-session. Use to run (or schedule) the automated UX safety-net sweep. Selects ready+UX-flagged PRs pre-merge (primary), plus approved/green and just-merged-but-unreviewed PRs as backstops. Delivers copy/paste-ready findings, never auto-posts, and appends design-system gaps to the gap log.
---

# Nightly Design Review Routine

A belt-and-suspenders sweep: it assumes developers _should_ run `ux-design-review` before
their UX review but _might not_, and catches what slipped through — ideally before merge.
It invokes the shared **`ux-design-review`** skill on each selected PR and gives you **one
report you can triage in a minute**, with the noisy runs clearly marked so you can ignore
them.

It does not nitpick and it does not post anything on its own.

---

## Run it

This routine is designed for **Claude Code on the web**. Schedule it with the `loop` skill,
e.g. nightly:

```
/loop 24h /nightly-design-review
```

Or trigger a scheduled web session that calls `/nightly-design-review`. It needs the GitHub
MCP tools (to list PRs, diffs, labels, CI, and review state). It can also be run ad hoc any
time you want the sweep now.

---

## Step 1 — Select PRs to review

Use the GitHub tools against `paranext/paranext-core`. Build the candidate set from three
buckets, in priority order. Only consider PRs that touch UI-affecting files (see the
`ux-design-review` skill's file globs); skip the rest entirely.

**Primary — ready + UX-flagged, pre-merge** (the main job: catch issues _before_ merge)

- Open, **non-draft** PRs that are UX-relevant: carry a `ux` / UI label, **or** their linked
  Jira work item's UX-review property is `needs review` (the PR description links the Jira
  item per `ui-review.mdx`).

**Backstop A — approved + green, pre-merge** (last safe moment before merge)

- Open, non-draft PRs with code-review approval and passing CI, even if not UX-flagged —
  these are about to land.

**Backstop B — just-merged but unreviewed or significantly changed** (retrospective net)

- PRs **merged in the last 24h** that this routine never reviewed, **or** that received
  significant changes (roughly >50 changed lines, or new UI files) after their last review.

**De-dupe / skip:**

- Skip a PR if `ux-design-review` already reviewed this PR at its current head and nothing
  UI-affecting changed since. Detect prior reviews by your own review marker (see Step 3) or
  a recorded head SHA. The point of Backstop B is _significant change_ — re-review only when
  the diff materially moved.
- Skip drafts and WIP outright (they belong to the dev, not the net).

If the candidate set is empty, report "No PRs needed review tonight" and stop.

---

## Step 2 — Review each PR

For every selected PR, invoke the **`ux-design-review`** skill with the PR number. Let that
skill do the standards-vs-gap analysis, the premature/low-signal detection, and the verdict.
Do **not** re-implement the rubric here — keep a single source of review logic.

---

## Step 3 — Hand me one triaged report (in-session)

Deliver results to the session — do **not** post to GitHub or Discord. Make it fast to
triage and easy to act on:

1. **Triage table first**, sorted so I can ignore the noise:

   | PR  | Verdict | Blockers | Majors | One-line reason |
   | --- | ------- | -------- | ------ | --------------- |

   List **CONFIDENT** runs at the top, **LOW SIGNAL** (safe-to-ignore) clearly grouped at the
   bottom with their reason, **CLEAN** in between. The verdict line is the whole point: I
   should be able to skip every LOW SIGNAL row without reading it.

2. For each **CONFIDENT** PR, include the full findings and the **ready-to-paste PR comment**
   block from the skill — fenced so I can copy it verbatim into a PR review if I agree.

3. State plainly which PRs you would post on if I said go, and which you'd let ride.

**Never auto-post.** Posting a PR review happens only if I explicitly tell you to (then the
skill's `--comment` path submits one review per PR).

> Review marker: when you _do_ post on my say-so, the posted review is the dedupe marker for
> Step 1. For runs you don't post, record the reviewed head SHA in your session notes / the
> report so the next night's sweep doesn't re-flag an unchanged PR.

---

## Step 4 — Update the design-system gap log

Collect the **gap candidates** the skill surfaced across all PRs and append the distinct
ones to:

```
lib/platform-bible-react/src/stories/guidelines/design-system-gaps.md
```

Dedupe against what's already there; if a gap recurs, add the PR as another piece of
evidence and bump its frequency rather than duplicating the entry. Then mention in the report
how many gaps were added/reinforced — this is the secondary mission (finding deficiencies in
the design system) paying off over time. Recommend additions; don't author final guidelines.

Commit the gap-log change on the working branch with a clear message; don't open a PR for it
unless asked.

---

## ADDITIONAL BEHAVIOR — customize here

> Add any extra steps you want the nightly routine to take. This section is intentionally
> open so you can extend the routine without touching the shared review logic. Examples you
> might wire up:
>
> - Post a short digest to the `#review-ux` Discord thread when there is ≥1 CONFIDENT finding.
> - Open a single tracking issue summarizing the night's blockers.
> - Email me (alex_mercado@sil.org) the triage table via the Gmail tools.
> - Tighten/loosen the "significant change" threshold in Backstop B.
> - Narrow the primary bucket to specific labels or a specific milestone.
>
> Leave this section as-is to keep the default (in-session report + gap log) only.
