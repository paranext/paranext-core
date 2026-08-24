## Explain the Why in Code; Keep Jira Keys Out of It

Not every developer who reads this repo can open every Jira issue — the codebase is public, the
tracker is not. A comment whose reasoning lives behind `PT-1234` is unreadable to whoever needs it
most.

### The rule

A code comment must stand on its own. Write the mechanism, not the ticket:

```ts
// BAD — the reader cannot look this up
// Availability reports what shipped in this build, not what has activated (PT-3954).

// GOOD — the reason travels with the code
// Availability reports what shipped in this build, not what has finished activating, so an
// unclassified failure this early usually means send/receive hasn't registered its commands yet.
```

Where a longer rationale is genuinely needed, link something in the repo — an ADR entry in
[`Architecture-Decisions.md`](../../.context/standards/Architecture-Decisions.md), a standards doc, or a
named symbol — rather than a ticket key.

### Where ticket references do belong

- **`TODO(PT-xxxx)` markers, and prose pointers to open work** — a key that points FORWARD, at work
  deliberately not done here, is not standing in for an explanation; it is the searchable link
  between this line and the rest of the story, and it tells a reader exactly when the code can be
  cleaned up. `TODO(PT-1234): Remove this workaround once the upstream bug is fixed` and "out of
  scope; see PT-4210" both belong. This is the same distinction
  [`forward-facing-comments.md`](code-quality/forward-facing-comments.md) draws, and the root
  `CLAUDE.md` requires such markers for the Send/Receive write gate. What this rule forbids is a key
  used INSTEAD of the reasoning — `// Availability reports what shipped (PT-3954).` — not a key used
  to name work that is still open.
- **ADR entries** — the `Source:` field is exactly for this, and the entry itself carries the
  reasoning, so the key is provenance rather than the explanation.
- **Commit messages and PR descriptions** — read alongside the tracker, by people who have it open.

Applies to new and edited code. There is no sweep of existing references; fix them opportunistically
when you touch the surrounding lines, replacing the key with the reasoning it was standing in for.
