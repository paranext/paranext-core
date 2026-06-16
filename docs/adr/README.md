# Architecture Decision Records (ADRs)

This directory holds **Architecture Decision Records** — short documents that capture a single
decision that was hard to reverse, surprising without context, and the result of a real trade-off.
An ADR records the **why** behind a decision so a future maintainer doesn't have to reconstruct it.

ADRs are **not** specs and **not** how-to docs. User-facing "how to use this pattern" guidance lives
in Storybook (`lib/platform-bible-react/src/stories/**`); ADRs only record the decision and the
alternatives we rejected.

## Status of this convention

This is a **newly proposed** convention for `paranext-core` — it was introduced alongside the first
ADR and is **safe to remove**. If the team decides not to adopt ADRs, delete this directory; no
decision information is lost, because each ADR's substance is also reflected in the relevant
Storybook page or code comments.

## Format

Each ADR is a numbered Markdown file (`NNNN-short-title.md`) with:

- **Status** — Proposed / Accepted / Superseded
- **Context** — the forces at play
- **Decision** — what we chose
- **Consequences** — what follows from it
- **Alternatives considered** — what we rejected and why
