---
description: Create the Jira epic + work items from an approved /investigate-prd brief. Pass the brief path. e.g. /prd-to-jira .context/research/investigations/sync-project/brief.md
---

# PRD to Jira

Turn the approved investigation brief at **$ARGUMENTS** into a Jira parent issue with one child
work item per proposed work item — unless a ticket for that work already exists, which step 2
finds. **Creating** issues and the existing-ticket check require the Atlassian MCP server (Jira
tools); **drafting** doesn't — if Jira isn't connected, say so and follow step 1's offline path
(full drafts, stopping at the dry-run gate, which applies either way).

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
  type), summary = the feature name in the team's persona style (e.g. `Donna zooms in and out on
  the pane she's working in`). Description: the summary, the PRD's problem statement (quoted), a
  link to the PRD, and the non-negotiables table:
  `# | Requirement | Jira Ticket(s) | Related Nice-To-Haves`.
- **One Sub-task child per work item**, parented to the new Combined issue, summary =
  `<Area>: <what changes, in plain words>` (the brief's work-item title, rewritten to that rule if
  it isn't already). Description: the summary, then these sections in order:
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
   If Jira is unreachable (no Atlassian tools in this session), skip this verification and step 2,
   note both in the drafts, and continue — the dry-run gate below still applies, and both checks
   run at creation time, before the first create call.
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
   - **duplicate**, To Do and unassigned, a standard issue (Combined, Dev Task, Bug, …) →
     **recreate** it: a new Sub-task carrying all its content, a `Duplicate` link, and the old
     ticket closed — the API can't turn a standard issue into a Sub-task.
   - **duplicate** in progress or assigned to someone → **link** only, flagged for the user.
   - An open Combined or Epic that already **is** this feature → stop and ask whether the new
     children go under it instead of a new parent.
3. **Draft everything locally first**: the parent and every child, titles and full descriptions,
   per the target shape above, with the step 2 links and references folded in. Fill the
   descriptions from the brief and the investigation findings — don't thin them out; the
   PT-4025…PT-4030 tickets are the level of detail to match.
4. **Cold-read the drafts.** Run the skill's
   [cold-read check](../skills/jira-creation/SKILL.md#cold-read-check) over all the drafts in one
   agent, and fix what it finds before the gate.
5. **Dry-run gate (required — never skip).** Show the user:
   - the complete drafts and a one-line cold-read result;
   - the step 2 table — `Draft item | Existing ticket | Status | Relation | Proposed action` —
     or "no existing tickets found" with the phrases searched, or "existing-ticket check not run
     — Jira unreachable";
   - **separately, every ticket proposed for recreation**: its key and title, what the new
     Sub-task will hold, and that the old ticket will be closed.

   Get explicit approval before creating anything, and a separate explicit yes for each
   recreation — a general go-ahead doesn't cover closing someone's ticket. These are posted to
   the team's Jira under the user's name. Beyond the approved moves, links and recreations, never
   edit, transition or comment on an existing ticket.
6. **Create, then populate each description in a second pass.** Creating an issue in `PT` replaces
   your description with the work-item type's default template, so use the **`jira-creation`
   skill** ([`.claude/skills/jira-creation/SKILL.md`](../skills/jira-creation/SKILL.md)) — create
   → read the live template off the created issue → fit your content into its sections → push the
   edit → verify. Create the parent, then each child with the parent set — one at a time, filling
   and verifying each before moving on, and keeping the created keys. The child sections this
   command drafts (User Story, Description, Implementation Ideas, Testing Ideas, Definition of
   Done, Dependencies) are written to line up with a typical task template — map them onto
   whatever headings each issue actually shows, carrying any extras
   (e.g. **Dependencies**) under the closest section. For the parent, place the problem statement /
   PRD link / non-negotiables table under the closest headings rather than dropping the scaffold.
   Skip every child the gate approved as a **move**. After each issue is filled and verified,
   carry out its approved links, moves and recreations as the skill's process describes, and
   verify each.
7. **Back-fill the mapping**: update the parent's description so each non-negotiable row lists
   the ticket URL(s) in its "Jira Ticket(s)" cell — created and moved alike, marking moved ones
   "(existing)".
8. **Report and sync the brief**: list the parent + child keys — created, moved and recreated
   separately, plus the links made — and offer to update the brief's work-item table with the
   ticket keys (WI-n → PT-xxxx). The user commits the brief as usual.

## Failure handling

If a creation call fails midway, stop and report exactly which issues were created (keys) and
which weren't. Resume only on user instruction, and never recreate ones that already exist.
