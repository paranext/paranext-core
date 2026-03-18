---
title: Git and GitHub Guidelines
description: Branch strategy, squash-merge policy, PR workflow, template merges, and commit conventions.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Git and GitHub Guidelines

Our [release proposal](https://docs.google.com/document/d/1YDNTLUweF3USLUtxaoozMNMFBgzEzha91otWp4VlUuw/edit?tab=t.0#heading=h.udy5i8roaoxw) describes our branches and various practices for interacting with our code base. Following are a condensed summary of our branches and guidelines for working with Git and GitHub:

---

## Branch Structure

- **`main` branch**: contains latest code. All regular work that should go in the product should be put in PRs that target this branch. You will most likely generally be working on branches from this branch.
- **`release-prep` branch**: contains code for the next release. The only PRs targeting this branch should be rebases/cherry-picks from `main` as appropriate; normal development should not target this branch. Branch admins must approve PRs.
  - There will be some point soon when `main` is rebased into `release-prep`, then we will only cherry-pick changes from `main` as appropriate until we hit the beta release.
- **hotfix branches e.g. `hotfix-1.23.4`**: periodically, we may need to make specific changes to releases. Branch admins will create a branch from a release tag or from `main`. PRs should be made targeting these hotfix branches for the specific fixes we want in the hotfix. You can make the change off of the hotfix branch first and cherry-pick to `main` or vice versa.

**Branch Admins**: See [Code Stewards wiki](https://github.com/paranext/paranext/wiki/Code-Stewards) for current list.

- If you would like to be a branch admin, ask the current branch admins.

---

## Branch Naming

- **Name your branch starting with the JIRA task ID**: If you are making changes associated with a specific JIRA task, start your branch name with the JIRA task ID e.g. `pt-1234-my-feature`
- **Use all lower-case in branch names**: Do not use upper-case characters in branch names

---

## Merge Practices

### Squash and Merge (Default)

When merging a PR in GitHub or setting a PR to auto-merge, always use "Squash and merge".

![Screenshot of a GitHub PR showing how to set to Squash and merge](https://github.com/user-attachments/assets/70f2ca49-4062-4468-8958-0939c67be9ba)

### Template Updates Exception

**NEVER squash and merge changes that include creating new extensions or updating from templates!**

Merging updates from templates (including creating new extensions in the [multi-extension template](https://github.com/paranext/paranext-multi-extension-template)) creates important git history that must be preserved. **ALWAYS normal merge these changes!**

If you accidentally squash and merge template updates:
1. Let an administrator know immediately
2. The administrator will need to reset `main` to before your merge commit and restart the PR
3. If not fixed, future template updates will reset the extension to the template state

**Note:** Merging from Reviewable's UI does different kinds of merges in different situations, so please use the GitHub UI to perform merges.

---

## Merging Template Changes into Your Extension

Keep your extension synchronized with template improvements by merging updates from the template repository.

### Process

```bash
# One-time setup: Add the template as a remote
git remote add template https://github.com/paranext/paranext-extension-template.git

# Fetch the latest template changes
git fetch template

# Checkout your target branch
git checkout main

# Merge with unrelated histories flag
git merge template/main --allow-unrelated-histories
```

### Important Notes

- The merge commits created when updating from the template are important for git history
- **Do not edit your repository's git history** in ways that remove these merge commits
- Removing merge commits causes duplicate conflicts in future template updates
- After merging, resolve any conflicts and run `npm i` to update dependencies

For complete details, see [Merging Template Changes wiki](https://github.com/paranext/paranext-extension-template/wiki/Merging-Template-Changes-into-Your-Extension).

---

## Related Documentation

- [Code-Review-Guide.md](Code-Review-Guide.md) - PR review process and guidelines
- [Code Stewards wiki](https://github.com/paranext/paranext/wiki/Code-Stewards) - Code ownership assignments

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
