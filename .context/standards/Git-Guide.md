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

```bash
# One-time setup: add the template as a remote
git remote add template https://github.com/paranext/paranext-extension-template.git

# Fetch and merge
git fetch template
git checkout main
git merge template/main --allow-unrelated-histories
```

**Important:**

- The merge commits created when updating from the template are part of the tracking history. Don't edit them out.
- Removing these merge commits causes duplicate conflicts in future template updates.
- After merging, resolve any conflicts and run `npm i` to update dependencies.

For full details, see the [Merging Template Changes wiki](https://github.com/paranext/paranext-extension-template/wiki/Merging-Template-Changes-into-Your-Extension).

---

## Related Documentation

- [Code Stewards wiki](https://github.com/paranext/paranext/wiki/Code-Stewards) — code ownership assignments
- [Code Review Guide wiki](https://github.com/paranext/paranext/wiki/Code-Review-Guide) — PR review process
