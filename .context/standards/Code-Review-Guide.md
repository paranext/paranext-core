---
title: Code Review Guide
description: Code review process, Reviewable workflow, code stewards, and PR approval best practices.
version: 1.2.0
status: active
created: 2026-03-04
last_updated: 2026-08-27
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

## Before the verdict

Four checks that come before a review is reported. Each of them exists because a review that
skipped it passed a defect the next stage caught.

- **A checklist from the requester is a floor, not the review.** Run the full review pass alongside
  it and hold the verdict until that pass finishes; then ask which branch of every two-way switch
  the diff's tests never exercise — default versus non-default mode, tracked versus untracked,
  first-load versus fallback. Rigour inside the places someone listed says nothing about the places
  nobody listed, and the most-travelled path is often one of the latter.

- **Run the control before attributing.** Before a symptom is blamed on a change, check the same
  signal on the base and on unrelated branches. Two occurrences inside one population are not a
  pattern until the population without that change has been looked at, and a wrong attribution
  sends someone after a defect they did not write.

- **Verify a premise in code, citing the line, before it reaches a rationale, an ADR or a report.**
  Grep the type definitions before accepting "cannot be done" as the reason for a workaround. A
  false premise costs far more to remove once it has been repeated across a design note, a decision
  log and a commit message than it costs to check once.

- **A change to a shutdown, close or persistence path keeps its end-to-end scenarios in the gate.**
  Unit tests, mutation checks and review have each passed defects on those paths that only an
  end-to-end run caught: what fails there is ordering and lifetime, which a mocked test reproduces
  by construction rather than exercises.

When a finding is a rule rather than a single site, state the rule and name every site it governs —
a reviewer's scope becomes the fixer's scope.

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
| 1.2.0   | 2026-08-27 | Added "Before the verdict": checks a review completes before it is reported |
