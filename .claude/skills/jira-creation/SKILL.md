---
name: jira-creation
description: "[Paratext PT Jira ONLY] Use when creating a work item (Combined, Sub-task, Dev Task, UX Task, Bug, Epic) in the Paratext `PT` project on paratextstudio.atlassian.net, or when a newly created issue's description shows empty template headings instead of the text that was written for it. NOT for other Jira sites or projects."
allowed-tools: mcp__atlassian__createJiraIssue, mcp__atlassian__editJiraIssue, mcp__atlassian__getJiraIssue, mcp__atlassian__getJiraProjectIssueTypesMetadata, mcp__atlassian__getJiraIssueTypeMetaWithFields, mcp__atlassian__searchJiraIssuesUsingJql
---

# Creating Jira Work Items in the Paratext `PT` Project

Platform.Bible work is tracked in the **Paratext (`PT`)** project on
`paratextstudio.atlassian.net`, reached through the Atlassian MCP server. OAuth — no API token —
so **issues are created under the signed-in human's own account**, are visible to the team
immediately, and **cannot be deleted by any MCP tool**. Create deliberately.

This skill is the single source of truth for the create-then-fill process.
`.claude/rules/jira-issue-creation.md` and `/prd-to-jira` both point here.

## Core principle

**The description passed to the create call does not survive. Draft it once, deliver it in a
second call — and re-send it whole every time it changes.**

**Every work-item type in `PT` has a default description template.** The project applies that
type's template at creation and it replaces whatever description was passed in. What lands on the
issue is a skeleton: headings with a placeholder `...` under each, and none of the drafted text.

So the drafted body reaches Jira in the **edit**, not the create. Every later change re-sends the
whole thing: `description` declares `"operations": ["set"]` and nothing else, so it has no append
or patch at any layer. (Array fields like `labels` do declare `add`/`remove`, but `editJiraIssue`
exposes only `fields` — set semantics — so through this tool every write is a whole-field
replacement regardless.)

Read the created issue back regardless — not to learn *whether* the template fired, it did, but
to get the exact headings this type uses today, which are what you fill.

## Two templated fields, not one

`description` is not the only templated body field, and on some types it isn't the right one:

- **Bug** has no `description` field on its create screen at all. Its body is
  **`customfield_10116` — "Bug Task Description"** (`## Observed Problem / ## Expected Behavior /
  ## How to Reproduce / ## Definition of Done / ## Environment / ## Original Report`). Writing a
  Bug's content into `description` puts it in the wrong place.
- **`customfield_10116` shows up on other types too**, carrying the same template (confirmed on
  Sub-task). It is **not** in `getJiraIssue`'s default field set, so it is invisible unless asked
  for by name — and it is routinely left as an unfilled skeleton (PT-4025 is one).

**Create-time metadata won't tell you which fields are templated**, in either direction: on
Sub-task, `description` reports `hasDefaultValue: false` though its template always fires, and
`customfield_10116` is absent from Sub-task's create screen yet appears populated on Sub-task
issues. Call `getJiraIssueTypeMetaWithFields` for what it *does* answer — which fields you may set
at create time, and that Bug has no `description` — and not for this.

The only reliable discovery is **reading the created issue back with `fields: ["*all"]`** and
seeing which fields came back as heading-plus-`...` skeletons. Do that once per type you haven't
handled before. Then decide, per templated field, whether it is yours to fill or is legitimately
left alone, and say which you chose — don't fill a second template with duplicated content just
because it's there.

## Process

1. **Draft the full description locally first**, before any Jira call. Keep the draft in the
   conversation verbatim — it has to survive intact into the step 8 edit and every later
   revision, and must never be reconstructed from memory or re-summarized.
2. **Get approval.** Show the user the summary, issue type, parent, and complete description, and
   wait for an explicit go-ahead. These post to the team's board under the user's name and MCP
   cannot delete them.
3. **Resolve the target and find the templated fields.** Pass
   `cloudId: "paratextstudio.atlassian.net"` (the hostname is accepted; don't hard-code a UUID).
   Confirm the issue type name with `getJiraProjectIssueTypesMetadata` for project `PT` — names
   and the set of types change. Then call `getJiraIssueTypeMetaWithFields` with
   `requiredFieldsOnly: false` for that type to see which body fields you may set at create time
   — this is where you learn a type has no `description` at all, as Bug doesn't. It will **not**
   tell you which fields are templated (see Two templated fields above); step 6 does that.
4. **Check for an existing issue before creating** whenever this is a resume, a retry, or a
   batch that may have partly run: `searchJiraIssuesUsingJql` with
   `project = PT AND summary ~ "<the summary>" ORDER BY created DESC`. A blank templated stub
   from an interrupted run is an issue to *fill*, not to recreate — nothing can delete the
   duplicate.
5. **Create** with `createJiraIssue`: `projectKey: "PT"`, `issueTypeName`, `summary`, `parent`
   (top-level parameter — used both for a Sub-task's parent and to epic-parent a Combined), and
   any custom fields under `additional_fields`. Set `contentFormat: "markdown"` and
   `responseContentFormat: "markdown"` explicitly (see Content format below). **Don't pass the
   drafted body text here** — the template discards it every time, so it only doubles the tokens.
   Send it in step 8.
6. **Read the live templates.** Re-read with `getJiraIssue` and
   `responseContentFormat: "markdown"`, using `fields: ["*all"]` for a type you haven't handled
   before (or at minimum `["description", "customfield_10116"]`). Custom fields are absent from
   the default field set, so a field you don't name is a template you'll never see. Note every
   field that came back as headings with `...` placeholders. **Never assume the headings** — each
   type has its own, and they change over time. Read the ones on *this* issue.
7. **Fit the draft into the live template's sections.** Keep its headings and their order. Put
   content that doesn't map cleanly under the closest heading. Do not delete a heading; do not
   substitute a different structure. Populate the template — don't replace it.
8. **Edit** with `editJiraIssue`, `contentFormat: "markdown"`, setting the field the content
   actually belongs in — `fields: { description: <complete filled-in text> }` for most types, or
   `fields: { customfield_10116: <complete filled-in text> }` for a Bug. A post-create edit
   sticks; the template default only fires on create.
9. **Verify against a specific string.** Re-read the field you just edited and confirm a
   distinctive phrase from the draft — pick one before editing, e.g. the first sentence under the
   second heading — is actually present in the returned text. "It looks right" is not a check. If
   the sections are still empty, the edit didn't take: stop and report rather than leaving a blank
   stub on the board.

**Several issues at once.** Every gap between create and fill is a window where a dead session
leaves a blank templated stub nobody can delete. So run steps 5–9 to completion on one issue
before starting the next; where a parent's key is needed first, create and fill the parent, then
each child in turn. Report each key as it is created, so an interrupted run leaves an exact record
of what exists — and resume through step 4, never by recreating.

## Content format

Both `createJiraIssue` and `editJiraIssue` take `contentFormat` (`"markdown"` or `"adf"`), and
the read tools take `responseContentFormat`. The tool schemas say the default **varies by tool**
when omitted, so pin it explicitly on every call and **read and write in the same format**.
Reading a template as ADF and writing it back as Markdown (or the reverse) is the fastest way to
turn the team's headings into literal text or an unreadable blob. `"markdown"` is the right
choice for ordinary descriptions.

## Worked example — filling, not replacing

A Sub-task read back right after create looks something like this. **This is an illustration of
the shape, not the sections to expect** — read the real ones off the issue:

```markdown
### User Story
...
### Description
...
### Definition of Done
...
```

Given a draft that says the results dialog needs a conflict link, the *right* edit keeps every
heading and distributes the draft into them:

```markdown
### User Story
As a translator finishing a Send/Receive, I want the results dialog to tell me a merge conflict
happened and take me to it, so I don't silently ship unresolved conflicts.

### Description
Add a clickable affordance on the conflict row in `results-view.component.tsx` that opens the
comment list filtered to unresolved conflicts. The cell is inert today.

### Definition of Done
- The conflict count is a link; activating it opens the filtered comment list.
- The count in the dialog matches the count in the list it opens.
```

The *wrong* edit throws the scaffold away and writes `## Problem / ## Approach` instead, or drops
`### User Story` because the draft had no persona. If the draft has nothing for a heading, keep
the heading and write the closest thing you have under it.

## `PT` project reference

| Thing | Value |
|---|---|
| Site / `cloudId` | `paratextstudio.atlassian.net` |
| Project key | `PT` |
| Work-item types | Initiative, Epic, Combined (shared UX+Dev item), Dev Task, UX Task, Sub-task, Bug, User Snap — re-verify with `getJiraProjectIssueTypesMetadata` |
| Parenting | Top-level `parent` parameter — a Sub-task's parent, or the epic above a Combined (e.g. `parent: "PT-3846"`) |
| Body fields | `description` on most types; `customfield_10116` ("Bug Task Description") on Bug, whose create screen has no `description`. Both are templated, and `customfield_10116` also appears on other types |
| Custom fields | `additional_fields`, e.g. `{ "customfield_10553": { "id": "10505" } }` (Sub Team → Simple) — confirm IDs with `getJiraIssueTypeMetaWithFields` |
| Deleting | Not possible via MCP — transition to a closed state or ask a human |

**Fields to leave alone:** set only what the user asked for. Don't invent an assignee, a
priority, or a status transition. For work items generated from a PRD investigation, the team
convention is stricter — no time estimates, no assignee, no transitions, Jira defaults
throughout (see `/prd-to-jira`). A human-directed request ("file this bug and assign it to me")
is a different case: do what was asked.

## Common mistakes

| Mistake | What happens | Instead |
|---|---|---|
| Passing the body text on create and assuming it stuck | Issue shows an empty skeleton; the drafted content is gone | Skip it on create; deliver it in the edit |
| Hard-coding the expected headings | Content lands under headings the template no longer has | Read the live template off the created issue |
| Writing a Bug's content into `description` | Bug's create screen has no `description` | Use `customfield_10116` |
| Reading back only `description` | A second templated field stays an empty skeleton nobody sees | Read with `fields: ["*all"]` on a type you haven't handled |
| Replacing the template with your own structure | Breaks the shape the team scans for | Fill the template's sections |
| Sending only the changed section in an edit | The rest of the description is wiped | Send the whole description every time |
| Mixing `markdown` and `adf` between read and write | Headings render as literal text | Pin both formats to `markdown` |
| Creating first, asking after | Un-deletable clutter on the team board | Approval gate before the first create call |
| Recreating after a failed run | A second un-deletable stub | Search by summary (step 4) and fill the existing one |
| Summarizing the draft to avoid re-typing it | Ticket ends up thinner than what was approved | Re-send the approved text verbatim |

## Red flags

- "The create call took the description, no need to check." — It didn't. Check.
- "I'll just append the new section." — There is no append. Send the whole field.
- "I'll compose it inline in the create call and skip the local draft." — Then there is nothing
  left to deliver in the edit.
- "I'll use the headings from the last ticket I made." — Read this issue's template.
- "The edit probably worked." — Name a string from the draft and find it in the read-back.
- Reporting an issue as created without having read its description back.
