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
   each work item's title and requirement wording for its child. On a resumed run, leave out the
   tickets this run already created — the keys in the brief's work-item table (step 6) and the
   skill's Process step 6. Propose one action per hit exactly as the skill's
   [Acting on what the search found](../skills/jira-creation/SKILL.md#acting-on-what-the-search-found)
   section says — link, move, convert, or link an existing ticket in place. Two rules are specific
   to a batch:
   - **An open ticket of any type that already *is* this whole feature** → stop and ask whether
     the new children go under it instead of a new parent. This comes first: a ticket that matches
     the whole feature is never moved or converted — those apply only to a duplicate of a single
     work item. If the user picks the existing ticket as the parent (it must be able to hold
     Sub-tasks — not an Epic or a Sub-task; otherwise ask again), create no new parent and don't
     edit the existing one: create only the children under it, and in step 7 give the user the
     requirements table as text to add there themselves.
   - **A work item settled by an existing ticket** — moved, converted, or linked in place because
     someone is working on it — gets no new child. That ticket counts as the work item's ticket in
     the requirements table and in the report.
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
   `Draft item` column) and, separately, every proposed conversion with its preview and any
   proposed description edit — or "no existing tickets found" with the phrases searched. Get
   explicit approval before creating anything, and a separate yes for each conversion and each
   edit of someone else's ticket. These are posted to the team's Jira under the user's name.
6. **Create, then populate each description in a second pass**, with the **`jira-creation`
   skill** ([`.claude/skills/jira-creation/SKILL.md`](../skills/jira-creation/SKILL.md)). Enter
   its Process at step 5 (resolve the target): its steps 1–4 — search, draft, cold read, approval
   — are this command's steps 2–5 and already ran once for the whole batch. Create the parent,
   then each child with the parent set — one at a time, filling and verifying each before moving
   on. **As each key is created, write it into the brief's work-item table** (WI-n → PT-xxxx), so
   a later session can tell what this run already made. Right after the parent is created, filled
   and verified, carry out the approved actions for work items settled by an existing ticket —
   each move, conversion and `Relates` link to the parent — and verify each.

   The child sections this command drafts (User Story, Description, Implementation Ideas, Testing
   Ideas, Definition of Done, Dependencies) are written to line up with a typical task template —
   map them onto whatever headings each issue actually shows, carrying any extras (e.g.
   **Dependencies**) under the closest section. For the parent, place the problem statement / PRD
   link / non-negotiables table under the closest headings rather than dropping the scaffold.
7. **Back-fill the mapping**: update the parent's description so each non-negotiable row lists
   the ticket URL(s) in its "Jira Ticket(s)" cell — created and existing alike, marking existing
   ones "(existing)" or "(existing, in progress)". If the parent is an existing ticket the user
   chose in step 2, don't edit it: show the filled-in table as text instead.
8. **Report**: list the parent + child keys — created, moved, converted, and existing tickets
   linked in place — plus the links made. The brief's work-item table already holds the keys; the
   user commits the brief as usual.

## Failure handling

If a call fails midway, stop and report exactly which issues were created (keys) and which
weren't, **and** every approved action on an existing ticket — move, conversion, link,
description edit — marked done or still owed. Resume only on user instruction, through the
skill's Process step 6 and its "Keep a record of the run": find this run's own tickets rather than
creating them again, and re-check each owed action against the ticket's live state before
carrying it out.
