## Lint-Sweep Verification

When you make a "lint-fix sweep" commit (one whose stated purpose is to clear lint errors across multiple files), the commit MUST include a final repo-wide verification step, not just per-file `eslint --fix` runs.

### Why

`eslint --fix` only fixes **auto-fixable** rules. Many rules — including high-frequency ones like `react/destructuring-assignment` (most cases), `no-type-assertion/no-type-assertion`, `no-nested-ternary`, `promise/always-return`, and several `paranext/*` plugin rules — are **not auto-fixable**. A per-file sweep that only runs `--fix` will leave those errors in place, but produce a green-looking diff that suggests the sweep "fixed lint". CI then catches the residual errors at merge time, often after several commits have piled on top.

### The rule

Per-file `eslint --fix` is fine as a starting point — but before committing, run a repo-wide lint check as the final verification step:

1. Run `npm run lint` from the repo root (this is the same command CI runs).
2. Confirm zero remaining errors. Fix any unfixable ones inline as part of the sweep — don't punt them to a follow-up commit, since the whole point of the sweep is to leave the repo green.
3. Only then commit, with a message that asserts the verification (e.g. `style: lint-fix sweep across X — full repo lint clean`).

### Easy verification command

```bash
npm run lint   # repo-root, runs across all workspaces; non-zero exit on any error
```

Run it once before committing the sweep.
