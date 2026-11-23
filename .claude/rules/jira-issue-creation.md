---
paths:
  - ".claude/commands/prd-to-jira.md"
---

## Creating Jira Issues — Use the `jira-creation` Skill

Creating a work item in the Paratext `PT` Jira project is **create → read the live template →
fit your content into it → edit → verify**: the project replaces any description you pass to the
create call with the work-item type's default template, so the real description has to be
delivered by a follow-up edit.

The full process, the `PT` project reference (types, parenting, custom fields, content format),
and the failure modes live in one place — the **`jira-creation` skill**
(`.claude/skills/jira-creation/SKILL.md`). Invoke it before creating or editing any `PT` issue;
don't restate its steps here.
