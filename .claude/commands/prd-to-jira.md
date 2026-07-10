---
description: Create the Jira epic + work items from an approved /investigate-prd brief. Pass the brief path. e.g. /prd-to-jira .context/research/investigations/sync-project/brief.md
---

# PRD to Jira

Turn the approved investigation brief at **$ARGUMENTS** into a Jira parent issue with one child
work item per proposed work item. Requires the Atlassian MCP server (Jira tools); if it isn't
connected, say so and stop.

## Preconditions

- If `$ARGUMENTS` is empty, ask for the brief path and stop until provided.
- Read the brief. It must contain a **Proposed work items** section and a **Requirement
  coverage** section. If either is missing, stop: the brief hasn't been through
  `/investigate-prd`'s checkpoint — finish that first.
- If §6 (questions for the product owner) still contains a question whose answer would change
  the **work-item boundaries** (not just wording), point at it and confirm the user really wants
  to create tickets now. Questions that only affect details inside an item are fine — carry them
  into that item's description.

## Target shape (mirrors epic PT-4024)

- **One parent issue** — project `PT`, issue type **Combined** (the shared UX+Dev work-item
  type), summary = the feature name. Description: the PRD's problem statement (quoted), a link
  to the PRD, and the non-negotiables table:
  `# | Requirement | Jira Ticket(s) | Related Nice-To-Haves`.
- **One Sub-task child per work item**, parented to the new Combined issue, summary = the work
  item's title. Description sections, in order:
  - **User Story** — persona-framed, citing the NN/NTH IDs it serves.
  - **Description** — what it does and which half of which contract it owns.
  - **Implementation Ideas** — the concrete pointers from the brief/investigation (`file:line`,
    existing components/services to reuse, what already exists vs. what's new).
  - **Testing Ideas** — concrete cases, from the investigation's behaviors/edge cases.
  - **Definition of Done** — the item's "done when", specific enough to evaluate.
  - **Dependencies** — blocks / depends on / can run in parallel with, in sibling-ticket terms,
    plus "Serves NN-n / NTH-n".
- **Never include time estimates.** No assignee, no status transitions — leave Jira defaults.

## Steps

1. **Resolve the target.** Site `paratextstudio.atlassian.net`, project `PT`. Verify the issue
   types with the issue-type metadata tool — expect **Combined** (parent) and **Sub-task**
   (child). If the names differ from this, show the user what exists and ask before proceeding.
2. **Draft everything locally first**: the parent summary + description and every child
   summary + description. Fill the descriptions from the brief and the investigation findings —
   don't thin them out; the PT-4025…PT-4030 tickets are the level of detail to match.
3. **Dry-run gate (required — never skip).** Show the user the complete drafts and get explicit
   approval before creating anything. These are posted to the team's Jira under the user's name.
4. **Create** the parent, then each child with the parent set. Create one at a time and keep the
   created keys.
5. **Back-fill the mapping**: update the parent's description so each non-negotiable row lists
   the created ticket URL(s) in its "Jira Ticket(s)" cell.
6. **Report and sync the brief**: list the parent + child keys, and offer to update the brief's
   work-item table with the ticket keys (WI-n → PT-xxxx). The user commits the brief as usual.

## Failure handling

If a creation call fails midway, stop and report exactly which issues were created (keys) and
which weren't. Resume only on user instruction, and never recreate ones that already exist.
