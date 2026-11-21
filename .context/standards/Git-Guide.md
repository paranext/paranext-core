---
title: Git and GitHub Guidelines
description: Branch structure, branch naming, merge practices, and template updates.
---

# Git and GitHub Guidelines

Our [release proposal](https://docs.google.com/document/d/1YDNTLUweF3USLUtxaoozMNMFBgzEzha91otWp4VlUuw/edit?tab=t.0#heading=h.udy5i8roaoxw) describes our branches and practices for interacting with the code base. This file is a condensed summary.

---

## Branch Structure

- **`main`**: contains the latest code. Regular development PRs target this branch. Feature branches are usually created from `main`.
- **`release-prep`**: code for the next release. Only branch admins merge here, and typically only via rebase/cherry-pick from `main`. Normal development does not target this branch.
  - At some point soon, `main` is rebased into `release-prep`; after that, changes are only cherry-picked from `main` as appropriate until the beta release.
- **hotfix branches (e.g. `hotfix-1.23.4`)**: created by branch admins from a release tag or from `main`. PRs targeting hotfix branches contain the specific fixes for a release. Changes can be made on the hotfix branch first and cherry-picked to `main`, or vice versa.

**Branch Admins**: See the [Code Stewards wiki](https://github.com/paranext/paranext/wiki/Code-Stewards). To become a branch admin, ask the current branch admins.

---

## Branch Naming

- **Start with the JIRA task ID** when applicable: `pt-1234-my-feature`.
- **Use all lower-case.**

---

## Merge Practices

### Squash and Merge (Default)

Always use "Squash and merge" when merging a PR in GitHub or setting auto-merge.

![Screenshot of a GitHub PR showing how to set to Squash and merge](https://github.com/user-attachments/assets/70f2ca49-4062-4468-8958-0939c67be9ba)

### Template Updates Exception

**Never squash and merge changes that create new extensions or pull updates from templates.** Template merges create git history that must be preserved for future template updates to work. Use a normal merge (merge commit) for these.

If you accidentally squash-merge a template update:

1. Tell an administrator immediately.
2. The administrator will need to reset `main` to before your merge and restart the PR.
3. Not fixing it causes future template updates to reset the extension to the template state.

**Note:** Reviewable's UI does different kinds of merges in different situations. Always use the GitHub UI to perform the actual merge.

---

## Merging Template Changes into an Extension

Keep extensions synchronized with template improvements.

### Repos with several extensions (paranext-core and the multi-extension-template repos)

paranext-core's `extensions/`, and repos built from `paranext-multi-extension-template` (such as paratext-bible-internal-extensions and paratext-assistant), update with one script, run from a clean branch off `main`:

```bash
npm run update-from-templates   # in paranext-core, run it inside extensions/
```

It brings in the multi-extension template (a subtree pull for core's `extensions/`, a merge at the root of the other repos), then subtree-pulls `paranext-extension-template` into each extension folder. It stops at the first conflict: resolve, commit, and run it again until every pull reports up to date. Then reconcile `package-lock.json` (take `main`'s side of any lockfile conflict, then `npm i --ignore-scripts` under the repo's pinned Node.js) and run the repo's checks.

Things to know:

- **Don't trust the script's exit code.** It exits 0 even when it stopped on conflicts; read its output and `git status`.
- **Check the direction before resolving.** If a pull's conflicts look applied backwards (the template's changes showing up as removals, or the repo's own edits undone), abort it and run the script again rather than resolving by hand.
- **Keep the repo's own identity and layout** (name, version, licence, `lib/` paths, `volta.extends`) and take the template's version bumps and additions.

The full procedure (the backwards-pull checks, core's deliberate differences from the templates, verification gotchas and the PR) is the `update-from-templates` skill: `.claude/skills/update-from-templates/SKILL.md`.

### A repo with one extension

A repo created directly from `paranext-extension-template` merges it:

```bash
# One-time setup: add the template as a remote
git remote add template https://github.com/paranext/paranext-extension-template.git

# Fetch and merge
git fetch template
git checkout main
git merge template/main --allow-unrelated-histories
```

### Either way

- The merge and squash commits created when updating from the templates are part of the tracking history. Don't edit them out, and merge the PR with a merge commit (see "Template Updates Exception").
- Removing these commits, or squash-merging the PR, causes duplicate conflicts in future template updates, or pulls that reset an extension to the template's state.

For full details, see the [Merging Template Changes wiki](https://github.com/paranext/paranext-extension-template/wiki/Merging-Template-Changes-into-Your-Extension).

---

## Related Documentation

- [Code Stewards wiki](https://github.com/paranext/paranext/wiki/Code-Stewards) — code ownership assignments
- [Code Review Guide wiki](https://github.com/paranext/paranext/wiki/Code-Review-Guide) — PR review process
