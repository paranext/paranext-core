---
title: Code Review Guide
description: Code review process, Reviewable workflow, code stewards, and PR approval best practices.
version: 1.3.0
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

## Automated Per-Commit Review (roborev, optional)

[roborev](https://roborev.io) reviews each commit in the background with an AI agent and
collects the findings in a local queue, so problems surface while the change is still fresh
rather than at PR time. It complements human review and Reviewable; it does not replace either.

**This is opt-in and entirely local.** The repository ships a `.husky/post-commit` hook that
exits immediately when the `roborev` binary is not on `PATH`, so developers who have not
installed it are unaffected — no hook output, no delay, no failed commits.

### Per-machine setup

Everything below is per-developer and per-machine; none of it can be committed.

**1. Install the binary.** Prefer a versioned, checksum-verified release over piping a remote
script into a shell — this machine holds repository credentials and AI-agent tokens. Download
the archive for your platform plus `SHA256SUMS` from
[roborev releases](https://github.com/kenn-io/roborev/releases), verify it, then put `roborev`
on your `PATH`:

```bash
ARCHIVE="roborev_<version>_<platform>.tar.gz"   # fill in your version and platform
grep -F "$ARCHIVE" SHA256SUMS | sha256sum -c -  # macOS: shasum -a 256 -c -
```

Use the checking form (`-c`), not the digest-printing form — printing a hash you never compare
is not verification. Checking the named archive specifically also fails loudly when that name
is absent from the manifest; `sha256sum -c SHA256SUMS --ignore-missing` would instead pass on
some *other* listed file that happens to be in the directory.

Linux users can install the published `.deb` or `.rpm` instead. The upstream
`curl -fsSL https://roborev.io/install.sh | bash` one-liner also works, but read the script
first if you use it.

**2. Configure and verify your agent, then optionally add the agent integration.**

```bash
roborev config set --global default_agent claude-code   # pick your review agent
roborev config set --global review_model sonnet         # per-commit reviews on a cheaper model
roborev daemon restart
roborev check-agents                                    # confirm the agent is reachable
roborev skills install                                  # optional: /roborev-fix, /roborev-refine, /roborev-snooze
```

Per-commit review volume is high, so pin the review model to Sonnet; the interactive
`/code-review` command is unaffected and keeps whatever model the current session already runs on.
A rebase re-mints commit SHAs but enqueues no reviews (a 130-commit restack queued zero jobs; only
the real commit made afterwards was reviewed), so there is no reason to pause roborev while
rebasing — fix-round commits made during a rebase are exactly the ones a review should catch.

**Do not install the agent hooks** (`roborev agent-hook install`). They wire roborev into the
agent's tool-use and stop hooks, which inject "invoke the /roborev-fix skill now" into whatever
session happens to be running — including a reviewer agent roborev spawned itself. A diverted
reviewer edits the working tree and can launch an e2e run outside any coordination, which is how
one session lost a run on 2026-08-28. Read open findings with `roborev list` instead, and close
them with `roborev close` — `roborev comment` leaves a finding open, and the open count is what
the hooks act on.

Do not skip `roborev check-agents`. A configured-but-unreachable agent makes every review fail,
and that failure is genuinely invisible from the outside: the daemon rejects the enqueue with a
503, the post-commit hook still exits 0, and commits look completely normal while nothing is
ever reviewed. Reviews run on **your own** agent subscription and consume your quota.

**Confirm it is actually working.** After your first commit, run `roborev list` — you should
see a job for that commit. An empty list means reviews are not being enqueued; check
`~/.roborev/post-commit.log`, which records the real reason.

If you install the agent hook, keep roborev's default thresholds — they are tuned so the stack of
unfixed findings stays small between reminders. One override is required, though: the shipped
default instruction names Codex's `$roborev-fix`, which does nothing in Claude Code.

```toml
[agent_hook]
instruction = "Invoke the /roborev-fix skill now."
```

The hook reminds you every five turns once failed reviews have accumulated. When a long stretch of
work genuinely should not be interrupted, use `/roborev-snooze on 2h` rather than raising
`turn_threshold`: snoozing is temporary and scoped to the current worktree and branch, and reviews
keep enqueueing while it is active.

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

**Always pass `--global` to `roborev config set`.** It defaults to `--local`, and a local write
does not patch the committed `.roborev.toml` — it regenerates the whole file from roborev's
template. The values survive, but every explanatory comment is replaced by generated ones and the
file balloons to roughly 225 lines, which `git commit -a` will happily carry into your branch.
Machine-level settings belong in `~/.roborev/config.toml` anyway; edit `.roborev.toml` by hand
when the repository genuinely needs a change.

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
| 1.3.0   | 2026-08-27 | Pinned roborev's review model to Sonnet per machine; noted that a rebase enqueues no reviews; advised against installing the agent hooks |
