---
description: Create the Jira epic + work items from an approved /investigate-prd brief. Pass the brief path. e.g. /prd-to-jira .context/research/investigations/sync-project/brief.md
---

# PRD to Jira

Turn the approved investigation brief at **$ARGUMENTS** into a Jira parent issue with one child
work item per proposed work item — unless a ticket for that work already exists, which step 2
finds. This needs the Atlassian MCP server (Jira tools) from the start, because the search for
existing tickets shapes the drafts: if Jira isn't connected, say so — "Jira isn't connected;
connect the Atlassian tools and rerun" — and stop.

## Preconditions

- If `$ARGUMENTS` is empty, ask for the brief path and stop until provided.
- Read the brief. It must contain a **Proposed work items** section and a **Requirement
  coverage** section. If either is missing, stop: the brief hasn't been through
  `/investigate-prd`'s checkpoint — finish that first.
- Find the brief's **Questions for the product owner** section — match by **title**, not
  number (it's §6 in the current template, but older briefs number it differently, e.g. §5).
  If it still contains a question whose answer would change the **work-item boundaries** (not
  just wording), point at it and confirm the user really wants to create tickets now. Questions
  that only affect details inside an item are fine — carry them into that item's description.

## Target shape (mirrors epic PT-4024)

Every ticket follows the `jira-creation` skill's
[Writing tickets people can read](../skills/jira-creation/SKILL.md#writing-tickets-people-can-read)
rules — a plain title, a `**Summary** —` paragraph on top, then the complete detail. The
readable top is in addition to the detail below, never a replacement for it.

- **One parent issue** — project `PT`, issue type **Combined** (the shared UX+Dev work-item
  type). Title: the feature name in the team's persona style (e.g. `Donna zooms in and out on the
  pane she's working in`). Description: the Summary paragraph, the PRD's problem statement
  (quoted), a link to the PRD that the team can open (if the PRD exists only on the user's
  machine, ask them for a shared link — never post a local path), and the non-negotiables table:
  `# | Requirement | Jira Ticket(s) | Related Nice-To-Haves`.
- **One Sub-task child per work item**, parented to the new Combined issue. Title:
  `<Area>: <what changes, in plain words>` (the brief's work-item title, rewritten to that rule if
  it isn't already). Description: the Summary paragraph, then these sections in order:
  - **User Story** — persona-framed, naming in words the requirements it serves, with their IDs
    in brackets: `…so the zoom level she set survives a restart (NN-3)`.
  - **Description** — what it does and which half of which contract it owns.
  - **Implementation Ideas** — the concrete pointers from the brief/investigation (file and
    function or symbol, not line numbers; existing components/services to reuse; what already
    exists vs. what's new).
  - **Testing Ideas** — concrete cases, from the investigation's behaviors/edge cases.
  - **Definition of Done** — the item's "done when", specific enough to evaluate.
  - **Dependencies** — blocks / depends on / can run in parallel with, naming sibling tickets by
    title, plus the requirements it serves, written out.
- **Never include time estimates.** No assignee, no status transitions — leave Jira defaults.
  (The only status change the flow can cause is the one a user-approved conversion makes, which the
  skill lists at the approval step.)

## Steps

1. **Resolve the target.** Site `paratextstudio.atlassian.net`, project `PT`. Verify the issue
   types with the issue-type metadata operation (see the skill's Process step 5) — expect
   **Combined** (parent) and **Sub-task** (child). If the names differ from this, show the user
   what exists and ask before proceeding.
2. **Find existing tickets for the same work.** Start from the brief's §2 **Jira** line and any
   `Existing ticket:` notes on its work items, but re-run the search — the brief may be days old
   and was searched by investigation phrases, not ticket titles. Follow the
   [Searching for existing work](../skills/jira-creation/SKILL.md#searching-for-existing-work)
   recipe in the `jira-creation` skill: phrases from the feature name for the parent, and from
   each work item's title and requirement wording for its child. Also run the skill's search for
   **your own recent tickets** (its Process step 1), and read every ticket key the brief already
   records — a `Parent ticket:` line, keys in the work-item table's Ticket column, a
   `Tickets created earlier:` line — together with the children of a recorded parent
   (`parent = <key>`). An earlier run that stopped partway left these; they go into the table like
   any other hit — a recorded parent through the whole-feature rule below — and nothing is skipped
   or claimed automatically. If the brief has a `Run stopped <date>` line older than 14 days, use
   that date in the own-tickets search instead. Propose one action per hit exactly as the skill's
   [Acting on what the search found](../skills/jira-creation/SKILL.md#acting-on-what-the-search-found)
   section says — link a related ticket, move or convert a duplicate, or leave an in-progress
   duplicate where it is and link it to the parent. Two rules are specific to a batch:
   - **An open ticket of any type that already *is* this whole feature** → stop and ask whether
     the new children go under it instead of a new parent. This comes first: a ticket that matches
     the whole feature is never moved or converted — those apply only to a duplicate of a single
     work item. If the user picks the existing ticket as the parent, the run is in
     **existing-parent mode**: the ticket must be able to hold Sub-tasks — read its
     `issuetype.hierarchyLevel` with `getJiraIssue` and require `0`, the standard level of
     Combined, Dev Task, UX Task and Bug (Initiative, Epic and Sub-task fail it; ask again); the
     step 5 gate shows its type, status, assignee, reporter and created date; no parent is
     created; step 6 re-reads it before attaching the first child and stops if it can no longer
     hold Sub-tasks. The existing parent is edited only with its own yes: if its body is still an
     unfilled template skeleton (typically left by an earlier run), it is drafted and cold-read in
     steps 3–4 like a new parent and the fill is proposed at the gate; step 7's back-fill is
     proposed there too. Without those yeses, step 7 hands the user the requirements table as text
     to add themselves.
   - **A work item settled by an existing ticket** — moved, converted, already under the chosen
     parent, filled as a leftover, or linked in place because someone is working on it — gets no
     new child. That ticket counts as the work item's ticket in the requirements table and in the
     report. A declined move or conversion settles nothing by itself: the skill's decline rule
     asks what that work item gets instead.
3. **Draft everything locally first**: the parent and every child, titles and full descriptions,
   per the target shape above, with the step 2 links and references folded in. Fill the
   descriptions from the brief and the investigation findings — don't thin them out; the
   PT-4025…PT-4030 tickets show the level of detail to match, but not the title style (their
   titles predate the plain-title rule).
4. **Cold-read the drafts.** Run the skill's
   [cold-read check](../skills/jira-creation/SKILL.md#cold-read-check) over all the drafts in one
   go, and fix what it finds before the gate.
5. **Dry-run gate (required — never skip).** Show the user what the skill's Process step 4
   requires — the drafts, the cold-read result, the existing-ticket table (here with a leading
   `Draft item` column) and, separately, every proposed conversion and any proposed description
   edit — or "no existing tickets found" with the phrases searched. A conversion needs the new
   parent's key for its preview, so unless the run is in existing-parent mode, the user approves
   each conversion here in principle and gives it a final yes in step 6, once its preview has
   run. Get explicit approval before creating anything, and a separate yes for each conversion
   and each edit of someone else's ticket. These are posted to the team's Jira under the user's
   name.
6. **Create, then populate each description in a second pass**, with the **`jira-creation`
   skill** ([`.claude/skills/jira-creation/SKILL.md`](../skills/jira-creation/SKILL.md)). Enter
   its Process at step 5 (resolve the target): its steps 1–4 — search, draft, cold read, approval
   — are this command's steps 2–5 and already ran once for the whole batch. Create the parent (in
   existing-parent mode, re-read the chosen ticket instead — see step 2 — and, if its fill was
   approved, fill it as the skill's steps 8–11 describe). Then create each child
   with the parent set, one at a time, filling and verifying each before moving on. **Write each
   key into the brief right after its create call, before the fill** — the parent's on a
   `Parent ticket: PT-xxxx` line directly above the §4 work-item table, and each child's in that
   table's **Ticket** column (add the column if an older brief lacks it). These keys are only a
   starting point for a later run's search: if this run stops, the next one finds them and its
   approval step decides what to do with each. A work item settled by an existing ticket gets
   `PT-xxxx (existing)` in the column once its action is done and verified.

   As soon as the parent is in place — created, filled and verified, or re-read in existing-parent
   mode — carry out the approved actions that need only the parent: each move, each `Relates` or
   `Blocks` link to the parent, and each conversion — previewing it now if it was approved in
   principle, showing the preview, and converting only after that conversion's final yes (see the
   skill's [Converting a duplicate](../skills/jira-creation/SKILL.md#converting-a-duplicate)). A
   link whose target is a child is made right after that child is created, filled and verified;
   if that work item was settled by an existing ticket instead, ask again. Re-check each ticket
   right before acting on it, verify each action, and run any approved description edit, as the
   skill's Process step 12 says.

   The child sections this command drafts (User Story, Description, Implementation Ideas, Testing
   Ideas, Definition of Done, Dependencies) are written to line up with a typical task template —
   map them onto whatever headings each issue actually shows, carrying any extras (e.g.
   **Dependencies**) under the closest section. For the parent, place the problem statement / PRD
   link / non-negotiables table under the closest headings rather than dropping the scaffold.
7. **Back-fill the mapping**: update the parent's description so each non-negotiable row lists
   the ticket URL(s) in its "Jira Ticket(s)" cell — created and existing alike, marking existing
   ones "(existing)" or "(existing, in progress)". In existing-parent mode the parent may be
   someone else's ticket and the keys didn't exist at the gate, so this edit gets its own yes now:
   re-check the parent, show its complete new body — everything it already says kept, written back
   in the format it was read in — and edit only on that yes. Otherwise show the filled-in table as
   text for the user to add themselves.
8. **Report**: list the parent + child keys — created, moved, converted, and existing tickets
   linked in place — plus the links made. The brief already holds the keys; the user commits the
   brief as usual.

## Failure handling

If a call fails midway, stop. Never retry a create that returned an error — Jira may have saved it
(the skill's Process step 6). Write a `Run stopped <date>` line directly above the brief's §4
work-item table, then report exactly which issues were created (keys) and which weren't, **and**
which approved actions on existing tickets — move, conversion, link, description edit — are done
and which are not.

There is no resume. To continue, run this command again on the same brief: it is an ordinary run.
Step 2's search finds what the stopped run made — the keys in the brief, and your own recent
tickets — and the approval step decides each one again, with fresh drafts and a fresh cold read.
The search for your own recent tickets finds only the tickets of whoever runs the command, so a
teammate who continues the work needs the brief, committed or handed over, with its keys in it.
