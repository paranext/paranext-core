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
  just wording), point at it and confirm the user really wants to create tickets now. Questions that only affect details inside an item are fine — carry them
  into that item's description.

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
- **Never include time estimates.** No assignee, no status transitions — leave Jira defaults. The
  only exception is closing a duplicate the user explicitly approved for recreation (step 2).

## Steps

1. **Resolve the target.** Site `paratextstudio.atlassian.net`, project `PT`. Verify the issue
   types with the issue-type metadata tool — expect **Combined** (parent) and **Sub-task**
   (child). If the names differ from this, show the user what exists and ask before proceeding.
2. **Find existing tickets for the same work.** Start from the brief's §2 **Jira** line and any
   `Existing ticket:` notes on its work items, but re-run the search — the brief may be days old
   and was searched by investigation phrases, not ticket titles. Follow the
   [Searching for existing work](../skills/jira-creation/SKILL.md#searching-for-existing-work)
   recipe in the `jira-creation` skill: phrases from the feature name for the parent, and from
   each work item's title and requirement wording for its child. Propose one action per hit, as
   the skill's [Acting on what the search found](../skills/jira-creation/SKILL.md#acting-on-what-the-search-found)
   table sets out:
   - **related**, **overlap** or **prior work** → create the child and **link** the existing
     ticket (`Relates`, or `Blocks` when one has to land first), naming it in the child's
     Dependencies with what it already owns.
   - **duplicate**, To Do and unassigned, already a Sub-task → **move** it: re-parent it under the
     new Combined instead of creating that child.
   - **duplicate** of one work item, To Do and unassigned, a standard issue (Combined, Dev Task,
     Bug, …) with no child tickets of its own → **recreate** it: the child for that work item
     becomes its replacement — its draft merged with all of the old ticket's content, and the old
     ticket's links recreated on it — and after creating it, link `Duplicate` and close the old
     ticket with resolution `Duplicate` (the API can't turn a standard issue into a Sub-task). If
     the old ticket has children, show them to the user and ask. If the user declines, create no
     child for that work item: link the old ticket to the new Combined with `Relates` instead.
   - **duplicate** in progress or assigned to someone → create no child for that work item: link
     the existing ticket to the new Combined with `Relates`, and flag it for the user.
   - An open Combined or Epic that already **is** this feature → stop and ask whether the new
     children go under it instead of a new parent. This takes precedence: a ticket that matches
     the whole feature is never proposed for recreation — that applies only to a duplicate of a
     single work item.
3. **Draft everything locally first**: the parent and every child, titles and full descriptions,
   per the target shape above, with the step 2 links and references folded in, and each
   recreation's old content merged into its child's draft. Fill the descriptions from the brief
   and the investigation findings — don't thin them out; the PT-4025…PT-4030 tickets show the
   level of detail to match, but not the title style (their titles predate the plain-title
   rule).
4. **Cold-read the drafts.** Run the skill's
   [cold-read check](../skills/jira-creation/SKILL.md#cold-read-check) over all the drafts in one
   agent, and fix what it finds before the gate.
5. **Dry-run gate (required — never skip).** Show the user:
   - the complete drafts and a one-line cold-read result;
   - the step 2 table — `Draft item | Existing ticket | Status | Assignee | Current parent (its
     status, assignee) | Relation | Proposed action` — or "no existing tickets found" with the
     phrases searched;
   - **separately, every ticket proposed for recreation**: its key and title, the complete merged
     draft of the child that replaces it, the links that will be recreated on it, and that the old
     ticket will be closed as a duplicate.

   Get explicit approval before creating anything, and a separate explicit yes for each
   recreation — a general go-ahead doesn't cover closing someone's ticket. These are posted to
   the team's Jira under the user's name. Beyond the approved moves, links and recreations, never
   edit, transition or comment on an existing ticket.
6. **Create, then populate each description in a second pass**, with the **`jira-creation`
   skill** ([`.claude/skills/jira-creation/SKILL.md`](../skills/jira-creation/SKILL.md)). Enter
   its Process at step 5 (resolve the target): its steps 1–4 — search, draft, cold read, approval
   — are this command's steps 2–5 and already ran once for the whole batch. From there: create →
   read the live template off the created issue → fit your content into its sections → push the
   edit → verify → carry out that issue's approved links, moves and closes. Create the parent,
   then each child with the parent set — one at a time, filling and verifying each before moving
   on, and keeping the created keys. A recreation's child is created exactly once, like any other
   child; closing the old ticket comes after it is filled and verified. Create no child for a work
   item the gate settled with an existing ticket (moved, declined recreation, or in progress
   elsewhere) — but **do** carry out its approved action: right after the parent is created,
   filled and verified, make each approved re-parent and each `Relates` link to the parent, and
   verify each by re-reading it.
   The child sections this command drafts (User Story, Description, Implementation Ideas, Testing
   Ideas, Definition of Done, Dependencies) are written to line up with a typical task template —
   map them onto whatever headings each issue actually shows, carrying any extras (e.g.
   **Dependencies**) under the closest section. For the parent, place the problem statement / PRD
   link / non-negotiables table under the closest headings rather than dropping the scaffold.
7. **Back-fill the mapping**: update the parent's description so each non-negotiable row lists
   the ticket URL(s) in its "Jira Ticket(s)" cell — created and existing alike, marking existing
   ones "(existing)" or "(existing, in progress)".
8. **Report and sync the brief**: list the parent + child keys — created, recreated (with the
   key each replaces), moved, and existing tickets linked in place — plus the links made, and
   offer to update the brief's work-item table with the ticket keys (WI-n → PT-xxxx). The user
   commits the brief as usual.

## Failure handling

If a creation call fails midway, stop and report exactly which issues were created (keys) and
which weren't, **and** every approved action on an existing ticket — re-parent, link, close —
marked done or still owed. Resume only on user instruction, and never recreate ones that already
exist; a resumed run finishes the owed actions first, under the original approval.
