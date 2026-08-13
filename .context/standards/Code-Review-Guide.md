---
title: Code Review Guide
description: Code review process, Reviewable workflow, code stewards, and PR approval best practices.
version: 1.2.0
status: active
created: 2026-03-04
last_updated: 2026-08-13
---

# Code Review Guide

This document outlines the code review process and best practices for Platform.Bible development.

---

## Review Tools

The team recommends using **Reviewable** rather than GitHub's native review tools when available. Reviewable enforces completion requirements: all conversations must be resolved and every changed file must be reviewed before merging is allowed.

For detailed guidelines, see the [Code Review Guide wiki](https://github.com/paranext/paranext/wiki/Code-Review-Guide).

---

## Automated Per-Commit Review (roborev, optional)

[roborev](https://roborev.io) reviews each commit in the background with an AI agent and
collects the findings in a local queue, so problems surface while the change is still fresh
rather than at PR time. It complements human review and Reviewable; it does not replace either.

**This is opt-in and entirely local.** The repository ships a `.husky/post-commit` hook that
exits immediately when the `roborev` binary is not on `PATH`, so developers who have not
installed it are unaffected — no hook output, no delay, no failed commits.

### Per-machine setup

Everything below is per-developer and per-machine; none of it can be committed.

```bash
curl -fsSL https://roborev.io/install.sh | bash   # 1. install the binary
roborev config set --global default_agent claude-code   # 2. pick your review agent
roborev daemon restart
roborev skills install                            # 3. optional: /roborev-fix, /roborev-refine
roborev agent-hook install --agent claude         # 4. optional: mid-session fix reminders
```

Step 2 matters: `roborev check-agents` lists which agents your machine can actually reach, and
reviews fail silently if the configured agent is unavailable. Reviews run on **your own** agent
subscription and consume your quota.

If you install the agent hook, raise the default thresholds in `~/.roborev/config.toml` — the
shipped defaults interrupt every five turns, and the default instruction uses Codex's
`$roborev-fix` syntax rather than Claude Code's `/roborev-fix`:

```toml
[agent_hook]
turn_threshold = 15
instruction = "Invoke the /roborev-fix skill now."
```

Then browse findings with `roborev tui`, or pull them into an agent session with `/roborev-fix`.

### What the repository already provides

- `REVIEW.md` — review guidelines shared by roborev and Claude Code's `/code-review`, which
  both auto-discover this file. Keep project-wide review rules here.
- `.roborev.toml` — exclusions for generated output, skip patterns for WIP commits, and commit
  attribution. It deliberately does not pin a review agent; that is a per-developer choice.
- `.husky/post-commit` — the guarded hook described above.

Running `roborev init` is not required, and installs a second hook in `.husky/_/post-commit`.
That is harmless: the daemon coalesces duplicate requests for the same repository, git
reference, and review target into a single review.

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
| 1.2.0   | 2026-08-13 | Added optional roborev per-commit review section with per-machine setup |
