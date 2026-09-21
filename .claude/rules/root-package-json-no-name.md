---
paths:
  - 'package.json'
  - 'package-lock.json'
  - 'release/app/package.json'
---

## Never Add `name` or `version` to the Root `package.json`

The root `package.json` deliberately carries no `name` and no `version`. The app's identity lives in
`release/app/package.json` (`name: "platform-bible"`), and electron-builder resolves it from both
files in ways that are not obvious from either.

**Do not add these fields.** The full reasoning, the alternatives, and the manual test matrix any
future attempt must clear are in
[`adr-root-package-json-no-name`](../../.context/standards/Architecture-Decisions.md) — read that
before proposing a change, rather than re-deriving it.

### The symptom you are probably reacting to

Because npm falls back to the containing directory name when `name` is absent, running
`npm install` from a clone or git worktree **not** named `paranext-core` rewrites the root `name` in
`package-lock.json`:

```diff
-  "name": "paranext-core",
+  "name": "my-branch-worktree",
```

**Fix the lockfile, not the manifest.** Restore the line to `paranext-core`. A check in
`.husky/pre-commit` blocks the commit if you miss it, and the wrong name is otherwise
self-consistent — CI's "Verify no files changed after build" will not catch it.

That hook guards the symptom, not this rule: it compares the lockfile's root `name` against
`paranext-core`, so adding `"name": "paranext-core"` to the manifest makes npm write the expected
value and the check passes while the decision is being violated. What actually stops that is CI —
naming the root makes `import/no-relative-packages` reject 12 pre-existing imports across 9 files.
See the ADR for why that is a prerequisite rather than a nuisance.

### Why this rule exists

Adding the field is a reasonable-looking one-line change, so it keeps getting proposed — repeatedly
and independently, including by AI agents, each time rediscovering the reasoning from scratch. If
you are about to suggest it, you are not the first. The ADR weighs the payoff against the exposure
and records what a future attempt would have to demonstrate.
