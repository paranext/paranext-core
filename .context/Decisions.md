---
title: Cross-Cutting Decisions
description: Architectural and implementation decisions affecting multiple features or the overall porting workflow.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Cross-Cutting Decisions

This file contains architectural and implementation decisions that affect multiple features or the overall porting workflow.

## When to Use This File vs Feature-Specific Decisions

| Decision Type                       | Location                                 |
| ----------------------------------- | ---------------------------------------- |
| Affects multiple features           | This file (`.context/Decisions.md`)      |
| Affects single feature              | `.context/features/{feature}/decisions/` |
| Workflow-level patterns             | This file                                |
| Feature-specific API/implementation | Feature folder                           |

## Purpose

Decisions are recorded to:

- **Preserve context** - Why was this approach chosen?
- **Enable learning** - What worked, what didn't?
- **Support future work** - What constraints exist?
- **Facilitate reviews** - What tradeoffs were considered?

## Decision Record Format

Each decision should follow this template:

```markdown
## Decision {N}: {Title}

**Date**: YYYY-MM-DD
**Phase**: Phase {1-4} - {Phase Name} (or "Cross-Cutting")
**Agent**: {Agent that made the decision}
**Status**: {Proposed | Accepted | Deprecated | Superseded}

### Context

What is the situation that requires a decision? What problem are we trying to solve?

### Options Considered

#### Option 1: {Name}

- **Pros**: {benefits}
- **Cons**: {drawbacks}
- **Effort**: {Low/Medium/High}

#### Option 2: {Name}

- **Pros**: {benefits}
- **Cons**: {drawbacks}
- **Effort**: {Low/Medium/High}

### Decision

What was chosen and why?

### Consequences

- **Positive**: {benefits that follow}
- **Negative**: {costs or risks accepted}
- **Neutral**: {other implications}

### Related Decisions

- Links to related decisions if any
```

## When to Record a Decision

Record decisions when:

1. **Architecture choices** - Component structure, data flow patterns
2. **Technology choices** - Libraries, frameworks, tools
3. **API design** - Interface shapes, method signatures
4. **Testing strategy** - What to test, how to test
5. **Tradeoffs** - Performance vs. readability, scope vs. time
6. **Deviations** - When PT10 differs from PT9 intentionally
7. **Workarounds** - Temporary solutions with future cleanup needed

## Example Cross-Cutting Decision

```markdown
## Decision 1: Use React Query for All Data Fetching

**Date**: 2024-01-15
**Phase**: Cross-Cutting
**Agent**: Human
**Status**: Accepted

### Context

Multiple features need to fetch data from the C# backend via PAPI.
We need a consistent pattern across all features.

### Options Considered

#### Option 1: Raw fetch with useState per feature

- **Pros**: No dependencies, simple
- **Cons**: Inconsistent patterns, duplicated boilerplate
- **Effort**: High (repeated per feature)

#### Option 2: React Query as standard

- **Pros**: Built-in caching, retry, loading states, consistency
- **Cons**: Additional dependency, learning curve
- **Effort**: Low per feature

### Decision

Use React Query as the standard data fetching pattern across all features.
This aligns with existing Platform.Bible extensions.

### Consequences

- **Positive**: Consistent data fetching pattern, automatic cache invalidation
- **Negative**: Team needs familiarity with React Query
- **Neutral**: Establishes a pattern other features must follow
```

## Feature-Specific Decision Structure

For decisions within a feature, use this structure:

```
.context/features/{feature}/decisions/
├── phase-1-decisions.md    # Analysis phase decisions
├── phase-2-decisions.md    # Specification phase decisions
└── phase-3-decisions.md    # Implementation phase decisions
```

### Decision Types by Phase

**Phase 1: Analysis**

- Classification decisions (Level A/B/C)
- Scope decisions (in/out of scope)
- Boundary decisions (where to split logic)

**Phase 2: Specification**

- API contract decisions
- Data model decisions
- Golden master scenario selection

**Phase 3: Implementation**

- Architecture patterns used
- Library/framework choices
- Code organization decisions
- Testing approach decisions
- Performance vs. clarity tradeoffs

## Maintenance

- Decisions are written by the orchestrator at the end of each phase
- Each subagent notes decisions in their output for consolidation
- Human review before finalizing
- Decisions can be updated with status changes (Deprecated, Superseded)

---

## Cross-Cutting Decisions Log

### Historical Workflow Decisions

These decisions were made during the initial AI-Assisted Porting Workflow design (2024-2025). They establish the foundational patterns for all feature porting work.

| # | Decision | Details |
|---|----------|---------|
| 1 | Hybrid Dual-Track approach | Features classified by complexity (A/B/C), parallel characterization and TDD work, tailored to ParatextData reuse % |
| 2 | Implementation strategy by level | TDD for Level A and extracted logic; Component-First for Level B UI and Level C |
| 3 | Verification approach | Golden Masters + Documentation (no Oracle MCP - ParatextData already in PT10 via NuGet) |
| 4 | Artifact storage | `.context/` and `.claude/` folders in separate git repo |
| 5 | Agent orchestration | Manual Claude commands triggering specialized subagents with human review gates |
| 6 | Mutation testing deferred | Moved to Future Improvements; add after baseline test coverage established |
| 7 | PT10 Alignment step | Phase 1-2 use `{TBD:*}` placeholders; Alignment Agent maps to paranext-core patterns in Phase 3 |
| 8 | Specification strategy by level | Level A: `test-specifications/`; Level B/C: `golden-masters/` capturing UI-layer behavior |
| 9 | Single source of truth | README.md is canonical for classification, scope, strategy; PR description is living document |
| 10 | Simplified testing strategy | Unit, Integration, Golden Master, Invariant (regular tests), Snapshot; property-based deferred |
| 11 | Traceability validation | Every test traces to specification ID (BHV-XXX, TS-XXX, INV-XXX) |
| 12 | Proof of work artifacts | Evidence files in `proofs/`; visual evidence required for ALL features including Level A |
| 13 | Testing Trophy model | Favor integration tests at service boundaries over excessive unit tests |
| 14 | Quality Gate G4.5 | Blocking gate verifying test quality before implementation begins |
| 15 | Coverage thresholds | 70% line coverage, 60% branch coverage (recommendations) |
| 16 | The Revert Test | Mandatory verification that tests fail without implementation |
| 17 | Audit trail hooks | Claude Code hooks log tool calls to `.context/audit-logs/` for exploration verification |
| 18 | Outside-In TDD | Outer acceptance test from Phase 2 specs constrains AI agents; acts as "fence" |
| 19 | Capability-based work units | Fine-grained capabilities (one per API method or UI component); per-capability strategy |
| 20 | Component-First acceptance | Visual verification IS the acceptance test; snapshot tests added AFTER visual match |
| 21 | Three approval gates | G1.5 (Scope), G3.5 (Specification), G10 (Implementation) via PR review in Reviewable |
| 22 | Branch strategy | `ai/feature/{feature-name}-{first-name}-{MM-DD-YYYY}` in both repos; unique per workflow run; name stored in `branch-name.txt`; ai-prompts PR from Phase 0, merged at G10 |
| 23 | Commit discipline | Agents commit after each step for incremental review and audit trail |
| 24 | PR as living document | PR description contains artifact links; no separate GitHub issue needed |
| 25 | External dependency handling | Archaeologist flags boundaries; Strategic Planner presents scope options; human decides |
| 26 | Characterization = Golden Master | Both capture PT9 behavior; store in `golden-masters/` directory |
| 27 | Multi-agent Archaeologist | 3-step workflow: Scanner → 4 parallel Workers (BHV ranges) → Consolidator |
| 28 | Phase 3 split into sub-phases | 4 focused commands: planning, backend, UI, integration (can parallelize BE+UI) |

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
