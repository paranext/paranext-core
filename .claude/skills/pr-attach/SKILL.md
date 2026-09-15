---
name: pr-attach
description: "[paranext-core ONLY] Attach local screenshots/recordings to GitHub PR bodies or comments WITHOUT committing them to any repo, by uploading to GitHub's own user-attachments CDN and embedding the returned URL. Use when PR verification evidence (screenshots, repro GIFs, short clips) should render inline on a PR. Fails soft by design — if the undocumented endpoint breaks, skip the images and continue; never block the workflow."
---

# pr-attach — inline PR images via GitHub's user-attachments CDN

Uploads files to the same CDN the GitHub web UI uses for drag-and-drop
(`uploads.github.com/user-attachments/assets`), then prints markdown embeds to paste into a
PR body or comment. Zero bytes land in any git repo, and verification evidence still renders
inline where the reviewer reads it.

**This rides an UNDOCUMENTED endpoint.** As of 2026-08-11 it works with a plain
`gh auth token` (HTTP 201, returns `{"url": "https://github.com/user-attachments/assets/<uuid>"}`),
but GitHub may change or remove it without notice. Treat images as a nice-to-have garnish:
the calling workflow must produce its deliverable with or without them.

## Usage

```bash
.claude/skills/pr-attach/scripts/pr-attach.sh [-r owner/repo] shot1.png shot2.png
# stdout, one line per success:
#   ![shot1.png](https://github.com/user-attachments/assets/<uuid>)
.claude/skills/pr-attach/scripts/pr-attach.sh --check   # endpoint canary (uploads a 1x1 png)
```

Without `-r` the repo is taken from the current directory's git remote. Paste the stdout
lines into the PR body/comment being drafted. Supported types, in any letter case: png, jpg,
jpeg, gif, webp, mp4, mov, webm. Videos are emitted as a **bare URL** rather than an
`![...]()` embed, because that is the form GitHub turns into a player.

## The contract

- On ANY failure (endpoint gone, schema drift, timeout, auth) the script warns on stderr
  and prints nothing for that file. **Exit 3 is its only failure code**, and it means *no
  embeds were produced*. A partial batch — some files uploaded, some did not — exits **0**
  with the usable embeds on stdout and a warning on stderr, because a caller told to treat a
  nonzero exit as "skip the images" would otherwise discard embeds that are perfectly good.
  Exit 3 means "no embeds available": the caller SKIPS the images and continues. Never
  retry-loop, never block, never fail a workflow because of a missing screenshot.
- Because callers are told to branch on 3 alone, the script keeps that true in the corner
  cases: SIGPIPE is ignored, so piping into `head` cannot exit 141; a failed write to stdout
  is counted as a failure rather than a delivered embed; and an interrupt cleans up and exits
  3 instead of resuming the batch one file at a time.
- Only a URL of the exact asset shape is accepted. The URL is interpolated into markdown, so
  a response with a crafted tail could otherwise inject a second link into a PR comment.
- Before a batch that matters, optionally run `--check` once; if it fails, skip the batch.
  `--check` is a canary rather than an upload: on success it exits 0 with **empty stdout**,
  writing its confirmation to stderr. Empty stdout from `--check` means healthy, not "no
  embeds". It takes no file arguments and needs `python3` for its 1x1 png.
- If the endpoint dies permanently, fall back to the `paranext/media` repo pattern
  (push under `paranext-core/pr-<N>/`, embed `raw.githubusercontent.com` URLs — proposed in
  paranext-core PR #2506; check that PR for its current state), or post without images.

## Lifecycle facts (measured 2026-08-11)

- A fresh upload serves **only authenticated requests**; an anonymous fetch 404s. It becomes
  anonymously visible once its URL is referenced in **posted** content — the same
  activation-on-post lifecycle as drag-and-drop. So a 404 from a plain `curl` on a
  just-uploaded asset is NOT a failure. To verify a pending asset, fetch it with
  `Authorization: Bearer $(gh auth token)`.
- Assets uploaded with a `repository_id` inherit that repo's visibility once posted
  (paranext-core is public, so posted images render for everyone).
- The endpoint's real failure shape is an error JSON with no `url` field (e.g.
  `{"message":"Not Found",...}`), which the script's guard treats as breakage.

## House rules still apply

Uploading is silent and safe — it publishes nothing on its own. But **posting the body or
comment that embeds the images is still gated exactly as before**: this skill changes
nothing about posting approvals (see `/process-pr-feedback`'s stop before pushing and
posting, and the house rule that posting under the user's name needs their explicit
per-run approval).
