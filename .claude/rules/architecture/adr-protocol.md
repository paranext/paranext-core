---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "c-sharp/**/*.cs"
---

# Architecture Decision Protocol

Before making ANY architectural decision, you MUST:

1. **Check the Decision Registry**: `.context/architecture/decision-registry.json`
2. **If entry exists**: Follow it exactly
3. **If no entry**: STOP and ask the human

## What Counts as an Architectural Decision?

- Choosing a library/package
- Choosing between patterns (Service vs Worker, etc.)
- Deciding how to handle errors
- Deciding how to structure files/folders
- Deciding on naming conventions
- Deciding what NOT to do

## Query Protocol

### Step 1: Read the Registry

Before writing code that involves any of the above decisions:

```
Read .context/architecture/decision-registry.json
```

### Step 2: Search for Relevant Entry

Look in these sections:
- `libraries.typescript` or `libraries.csharp` - for package choices
- `patterns.*` - for design pattern choices
- `constraints.*` - for things to avoid
- `naming.*` - for naming conventions
- `extensions.*` - for extension-specific rules

### Step 3: Follow or Escalate

**If entry exists:**
- Follow the documented `choice` exactly
- Avoid anything in `notAllowed`
- Reference the `rationale` if asked

**If no entry exists:**
- STOP implementation
- Use the Escalation Template below
- Wait for human decision

## Escalation Template

When no registry entry exists, ask the human:

> **Architectural Decision Needed**
>
> **Context**: [What you're trying to do]
>
> **Category**: [libraries/patterns/constraints/naming/extensions]
>
> **Options**:
> 1. [Option A] - [pros/cons]
> 2. [Option B] - [pros/cons]
>
> **Recommendation**: [Your suggestion with rationale]
>
> **Proposed Registry Entry**:
> ```json
> {
>   "[category].[subcategory].[name]": {
>     "choice": "[recommended option]",
>     "notAllowed": ["[alternatives to avoid]"],
>     "rationale": "[why this choice]"
>   }
> }
> ```

## After Human Decision

1. Update the registry with the new entry
2. Include "ADR update" in commit message
3. All future agents inherit this decision

## Hard Constraints (Pre-Commit Enforced)

These constraints are checked automatically by pre-commit hooks:
- `noAnyType` - No `any` types in TypeScript
- Architecture boundaries - No cross-process imports

Violations will block your commit. Fix them before committing.

## References

- [Decision Registry](/.context/architecture/decision-registry.json)
- [Decision Registry Schema](/.context/architecture/decision-registry.schema.json)
- [ADR Reviewer Agent](/.claude/agents/adr-reviewer.md)
