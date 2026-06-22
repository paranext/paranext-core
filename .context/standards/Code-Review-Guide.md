---
title: Code Review Guide
description: Code review process, Reviewable workflow, code stewards, and PR approval best practices.
version: 1.1.0
status: active
created: 2026-03-04
last_updated: 2026-06-15
---

# Code Review Guide

This document outlines the code review process and best practices for Platform.Bible development.

---

## Review Tools

The team recommends using **Reviewable** rather than GitHub's native review tools when available. Reviewable enforces completion requirements: all conversations must be resolved and every changed file must be reviewed before merging is allowed.

For detailed guidelines, see the [Code Review Guide wiki](https://github.com/paranext/paranext/wiki/Code-Review-Guide).

---

## Reviewer Responsibilities

### Comment Resolution

- Reviewers manage their own comment resolutions
- Comments default to **Blocking** status unless changed
- Set status to **Discussing** for optional/non-blocking items (allows authors to self-resolve)
- For non-blocking discussions, prefer Discord communication to avoid delaying merges

### Code Steward Requirements

Code stewards (code owners) must approve changes to their designated sections:
- At least one code steward for each affected section must approve
- PRs spanning multiple sections may require multiple reviewers
- Not every steward needs to review every file, but all files must be reviewed before approval

For current code steward assignments, see the [Code Stewards wiki](https://github.com/paranext/paranext/wiki/Code-Stewards).

### Review Workflow

1. Author submits PR and posts in `#reviews` Discord channel
2. GitHub automatically notifies relevant code stewards
3. Stewards react with appropriate emoji:
   - `:code_review:` for partial reviews
   - `:white_check_mark:` for complete reviews
4. Process completes when all sections receive required approval

---

## Author Responsibilities

- Merge pull requests after approval or enable auto-merge through GitHub
- For large PRs or those expecting multiple reviewers, skip auto-merge
- Signal completion of feedback with "Done" or explanatory comments
- Address tangentially related suggestions via new issues rather than the current PR

### Deep-linking to a file's diff

To point a reviewer straight at one file's diff, use GitHub's per-file anchor on the PR's `/files` tab: it is `diff-{sha256(repo-relative-path)}`. So the link is `https://github.com/{owner}/{repo}/pull/{N}/files#diff-{hash}`, and you can append `#L42-L58` for a line range. Compute the hash portably (when `shasum`/`awk` are sandbox-blocked) with: `python3 -c "import hashlib,sys; print(hashlib.sha256(sys.argv[1].encode()).hexdigest())" "path/to/file"`.

---

## Auto-Merge Guidelines

Use **Squash and merge** for most PRs through the GitHub UI.

**Exception:** Never squash template updates or new extensions—use normal merge to preserve git history. See [Git-Guide.md](Git-Guide.md) for details.

---

## Community Support

Request code reviews in the `#reviews` channel on the [Platform.Bible Discord server](https://discord.com/invite/platformbible).

---

## Related Documentation

- [Code Style Guide](Code-Style-Guide.md)
- [Git Guide](Git-Guide.md)
- [Code Review Guide wiki](https://github.com/paranext/paranext/wiki/Code-Review-Guide)
- [Code Stewards wiki](https://github.com/paranext/paranext/wiki/Code-Stewards)

## Version Log

| Version | Date       | Change                                                              |
| ------- | ---------- | ------------------------------------------------------------------- |
| 1.0.0   | 2026-03-04 | Initial version                                                     |
| 1.1.0   | 2026-06-15 | De-ported the AI-Assisted-Review (porting) section for the general profile |
