## Agent/Command/Skill Authoring: Link, Don't Paraphrase

When writing or editing files in `.claude/agents/`, `.claude/commands/`, or `.claude/skills/`, prefer generic patterns over content that goes stale. Ask: "If a standard changes, would this text need to be hand-updated?" If yes, link to the source instead of restating it.

### Rule 1: Never paraphrase standards — link to `.context/standards/`

Don't duplicate standards content into an agent or command. A one-line purpose hint alongside the link is fine — it helps the agent recognize it needs to open the file — but multi-paragraph paraphrasing is not: it makes the agent think it already has the content, and the copy drifts from the source of truth.

| Content type                                       | Source of truth           | Agent/command contains |
| -------------------------------------------------- | ------------------------- | ---------------------- |
| Testing patterns, TDD rules, mocking strategies    | Testing-Guide.md          | Link only              |
| Code style, naming conventions, component patterns | Code-Style-Guide.md       | Link only              |
| Architecture patterns, file organization           | Paranext-Core-Patterns.md | Link only              |
| Component selection                                | Component-Selection-Quick-Reference.md | Link only |
| Workflow steps specific to this agent              | Inline in the agent       | Full content           |

### Rule 2: Reference skills by name, not by duplicating their content

```markdown
<!-- GOOD: reference the skill -->

For test commands, use the `test-runner` skill.

<!-- BAD: duplicate the skill's content -->

Run tests with: npm test / dotnet test c-sharp-tests/ ...
```

### Rule 3: Content that CAN be inline

- First actions / workflow steps specific to this agent
- Output specifications (what this agent produces)
- Agent-specific decision logic
- Quality checklists specific to this agent's output

### Rule 4: Content that MUST be linked

- Test quality guardrails and TDD patterns (Outside-In, RED-GREEN-REFACTOR) → `.context/standards/Testing-Guide.md`
- Code style and naming rules → `.context/standards/Code-Style-Guide.md`
- Architecture and file-organization patterns → `.context/standards/Paranext-Core-Patterns.md`
- Component selection → `.context/standards/Component-Selection-Quick-Reference.md`

**Example of a good reference:**

```markdown
## Test Quality Guardrails

Follow the [Testing Trophy model](../../.context/standards/Testing-Guide.md#test-strategy-the-testing-trophy)
and the [AI Agent Test Quality Guardrails](../../.context/standards/Testing-Guide.md#ai-agent-test-quality-guardrails).
```

**Why this matters:** when a standard is updated, every agent, command, and skill that links to it picks up the change automatically. Paraphrased content becomes stale and diverges from the source of truth.
