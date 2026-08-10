# Restack battery — rebasing a stack and proving it faithful

Used by **P6 — Integrate**, whenever a fix lands below the top of a branch stack. Run the full
battery at the top of the stack before anything is force-pushed. Nothing here is optional
because the failures it catches are invisible in per-commit review.

> *Provenance: the session-memory reference `rebase-verification-battery` (2026-06-12), which
> caught a real defect on its first outing, plus the working practice from the 2026-08 restack
> rounds (counts first, backup tags, stack-order pushes).*

---

## Before touching anything

1. **`git fetch origin` first.** "On a branch" is not a state you can read from
   `git branch --show-current` alone. Establish ahead/behind for every branch in the stack:

   ```bash
   git rev-list --count origin/<branch>..<branch>   # ahead
   git rev-list --count <branch>..origin/<branch>   # behind
   ```

   Do this for the whole stack **first**, and write the numbers down. They are the expectations
   every later check is measured against. Discovering the counts after the rebase means having
   nothing to compare to.

2. **Tag every branch tip before rewriting it.**

   ```bash
   git tag backup/<branch>-$(date +%Y%m%d-%H%M%S) <branch>
   ```

   Backup tags are the cheapest possible insurance and the only way to run the `range-diff`
   checks below. They are local; delete them once the stack is pushed and verified.

3. **Confirm each PR's actual base.** A stacked PR's base is the branch below it, not `main`.
   `gh pr view <n> --json baseRefName`. Rebasing a stacked branch onto `main` instead of its
   real base produces a conflict storm and a wrong diff.

## Rebase, don't merge

Rebase the stack bottom-up, each branch `--onto` the new tip of the one below:

```bash
git rebase --onto <new-base-tip> <old-base-tip> <branch>
```

Merging a base into a branch to "catch it up" creates divergence that snowballs up the stack.
Needing a merge fallback is a symptom that the stack is already polluted — treat it as a
mistake to avoid, not a normal move.

**Conflict-resolution staging hazards.** Stage **specific paths**. Never `git add -A` or
directory-wide adds mid-rebase; check `git status` for unexpected `A` entries before every
`git rebase --continue`. Never blanket `--continue || --skip` in a loop: `--skip` silently
drops real commits, and an untracked-file collision or a hook failure looks exactly like an
empty commit.

## The battery

Run all six at the top of the stack. `A` = the old range's changed files, `N` = the new range's.

```bash
git diff --name-only <old-base> <old-tip> | sort > /tmp/A.txt
git diff --name-only <new-base> <new-tip> | sort > /tmp/N.txt

comm -13 /tmp/A.txt /tmp/N.txt    # N \ A  — check 2, must be empty
comm -23 /tmp/A.txt /tmp/N.txt    # A \ N  — check 3, must be empty
comm -12 /tmp/A.txt /tmp/N.txt    # A ∩ N  — the input to check 4
```

`comm` needs both inputs sorted, which is why `sort` is not optional here.

1. **Commit accounting.** `git cherry <new-base> <old-tip> <old-base>` — every `-` (a pick
   git considers already present) must have an identical patch-id upstream:
   `git show <sha> | git patch-id --stable`. An unexplained `-` is a dropped commit.

2. **`N \ A` — content the new branch carries that the old never did.** Must be empty, or
   every entry a documented deviation. *This is the check that caught 33 untracked proof PNGs
   swept into a replayed commit by a broad `git add` during conflict resolution.*

3. **`A \ N` — content no longer carried.** Every entry must be either already-upstream
   (blob-identical on the new base) or a documented deletion.

4. **Byte-identity.** For files in `A ∩ N` that the new base did **not** touch,
   `git rev-parse <old-tip>:<file>` must equal `git rev-parse <new-tip>:<file>`. Only
   documented deviations may differ.

5. **Conflict markers.** `git grep -nE '^(<{7} |>{7} |={7}$)' <new-tip>`.

6. **Surgery isolation.** After editing one mid-history commit (`rebase -i`, `edit`, amend),
   `git range-diff <base> <pre-surgery-tip> <new-tip>` must show `!` on the edited commit and
   **only** on it. Read the range-diff rather than skimming it — it is the one check that shows
   what actually changed in a replay.

**Assert on positive output.** `ls a b` exit codes and a pipeline's `$?` (which is the last
command's) are useless as verification. Every check above must produce output you read.

## Force-pushing

Only after the battery passes, and only after the G2 approval that covers pushing.

- `--force-with-lease`, never bare `--force`.
- **Stack order, bottom first**, one branch per command, checking the result before the next.
  A batched compound push whose output garbles has produced non-existent objects and broken
  branches; re-derive every SHA from a fresh command at the moment you use it rather than
  trusting one printed earlier in the session.
- **Never rename a remote branch** as part of a restack. Renaming a branch that is the head of
  an open PR auto-closes that PR. Use the `pr-safe-branch-rename` skill if a rename is genuinely
  needed.
- After pushing, re-check `git rev-list --count origin/<branch>..<branch>` for every branch — it
  must be `0`, and the count must match the expectation recorded in step 1.

## Reporting

The G2 presentation includes the battery results, not a claim that it was run: the counts before
and after, the `N \ A` and `A \ N` sets (ideally empty), and the range-diff verdict. "Restack
verified" without those numbers is not a result.
