# Architecture Decision Records (ADRs)

This directory holds **Architecture Decision Records** — short documents that capture a single
decision that was hard to reverse, surprising without context, and the result of a real trade-off.
An ADR records the **why** behind a decision so a future maintainer doesn't have to reconstruct it.

ADRs are **not** specs and **not** how-to docs. User-facing "how to use this pattern" guidance lives
in Storybook (`lib/platform-bible-react/src/stories/**`); ADRs only record the decision and the
alternatives we rejected.

## Status of this convention

This is a **newly proposed** convention for `paranext-core` — it was introduced alongside the first
ADR and is **safe to remove**. If the team decides not to adopt ADRs, delete this directory: the
**operative rules** a developer needs already live in the relevant Storybook page or code. What an
ADR adds on top is the **decision rationale and the rejected alternatives** — useful for a future
maintainer asking "why this way?", but not required to use the patterns. Deleting the directory
loses that "why," not the "what."

## Format

Each ADR is a numbered Markdown file (`NNNN-short-title.md`) with:

- **Status** — Proposed / Accepted / Superseded
- **Context** — the forces at play
- **Decision** — what we chose
- **Consequences** — what follows from it
- **Alternatives considered** — what we rejected and why
