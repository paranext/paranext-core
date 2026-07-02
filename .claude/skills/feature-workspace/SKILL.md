---
name: feature-workspace
description: "[paranext-core ONLY] Create, enter, list, and tear down multi-repo feature workspaces under ~/git/workspaces/<feature-slug>/ built from git worktrees of the sibling repos a feature touches. Use when a feature spans more than one repo, or to work inside a workspace that already exists. For a single-repo worktree, use the native EnterWorktree tool instead."
allowed-tools: Bash, Read
---

# Feature Workspace Skill

A **feature workspace** is a directory at `~/git/workspaces/<feature-slug>/` holding git
worktrees of the sibling repos a feature touches, so several features can be worked on
concurrently without disturbing the canonical checkouts under `~/git/`.

```
~/git/
├── paranext-core/                     # canonical checkouts — leave them alone
├── Paratext/                          # (PT9)
├── paratext-10-studio/
└── workspaces/
    └── pt-4029-resolve-conflict/      # one workspace per feature
        ├── paranext-core/             # worktree on branch pt-4029-resolve-conflict
        └── Paratext/                  # worktree, detached (read-only reference)
```

## When NOT to use this skill

For an isolated worktree of **one** repo, use the native `EnterWorktree` tool (or the
`superpowers:using-git-worktrees` skill). This skill is only for **multi-repo** feature
workspaces, and for entering existing ones.

## Repos and base branches

| Repo                                | Default base | Typical role                            |
| ----------------------------------- | ------------ | --------------------------------------- |
| `paranext-core`                     | `main`       | primary — almost always included        |
| `Paratext` (PT9)                    | `master`     | read-only reference → detached worktree |
| `paratext-10-studio`                | `main`       | include only if the feature touches it  |
| `paratext-bible-extensions`         | `main`       | include only if the feature touches it  |
| `paratext-bible-internal-extensions`| `main`       | include only if the feature touches it  |

Branch naming follows the repo convention: `pt-XXXX-description` for Jira-ticketed work,
or whatever the caller specifies. Use the **same branch name** in every editable repo of
the workspace, and name the workspace directory after it.

## Create a workspace

```bash
SLUG=pt-1234-my-feature                # feature slug = branch name
WS=~/git/workspaces/$SLUG
[ -d "$WS" ] && echo "workspace already exists — enter it instead" || mkdir -p "$WS"

# Editable repos (repeat per repo the feature changes; base per table above):
git -C ~/git/paranext-core fetch origin
git -C ~/git/paranext-core worktree add -b "$SLUG" "$WS/paranext-core" origin/main

# Read-only reference repos (e.g. PT9): pin a detached worktree so the code
# you analyze cannot drift if the canonical checkout is updated later.
git -C ~/git/Paratext fetch origin
git -C ~/git/Paratext worktree add --detach "$WS/Paratext" origin/master

# Each worktree needs its own dependencies:
cd "$WS/paranext-core" && npm install --prefer-offline
(cd "$WS/paranext-core/c-sharp" && dotnet restore)
```

Branch-handling notes (from hard experience):

- **Branch already exists** (locally or on `origin`): drop `-b` and use
  `git worktree add "$WS/paranext-core" "$SLUG"` — git reuses the local branch or
  auto-creates a tracking branch from the remote.
- **"already checked out" error**: the branch is in use by another worktree — often the
  canonical checkout itself. Run `git -C ~/git/<repo> worktree list` to find it; if the
  canonical checkout is sitting on the branch, switch it back to its base branch first.

## Enter an existing workspace

```bash
ls ~/git/workspaces/                       # find the workspace
cd ~/git/workspaces/<slug>/paranext-core   # work here, not in the canonical checkout
```

When the work needs to read sibling repos in the workspace, make them accessible to
Claude Code (`claude --add-dir ../Paratext`, or `permissions.additionalDirectories` in
`.claude/settings.local.json`).

## List workspaces

```bash
ls ~/git/workspaces/
git -C ~/git/paranext-core worktree list   # maps each worktree to its branch, per repo
```

## Tear down a workspace

Run `worktree remove` from each canonical repo. **Without `--force` it refuses if the
tree is dirty — that refusal is the safety guard.** Force only changes you confirmed are disposable.

```bash
WS=~/git/workspaces/<slug>
git -C ~/git/paranext-core worktree remove "$WS/paranext-core"
git -C ~/git/Paratext worktree remove "$WS/Paratext"
rm -rf "$WS"                               # leftovers (untracked artifacts, node_modules)
rmdir ~/git/workspaces 2>/dev/null || true # only removes the parent if now empty

# Optional, after the PR is merged:
git -C ~/git/paranext-core branch -D "<slug>"
```

If a worktree directory was deleted by hand, run `git -C ~/git/<repo> worktree prune`
to clear the stale registration.

## Hazards

- **Shared stash stack**: a repo's stash is shared across ALL its worktrees, and other
  sessions may push/pop it concurrently. Never use bare `git stash` in a worktree
  (existing project convention) — prefer a WIP commit; if you must stash, use
  `git stash push -u -m "<branch>: why"`, capture your entry's SHA from
  `git stash list --format='%H %gs'`, restore with `git stash apply <sha>` (not `pop`),
  then drop the entry by re-finding it by message.
- **One branch per worktree**: the same branch cannot be checked out in two worktrees.
- **Operate in the workspace, not the canonical checkout**: run the feature's git
  operations inside `~/git/workspaces/<slug>/<repo>`; never `reset --hard` a canonical
  checkout to "fix" a workspace problem.
