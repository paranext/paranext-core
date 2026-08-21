---
name: pr-attach
description: Attach local screenshots/recordings to GitHub PR bodies or comments WITHOUT committing them to any repo, by uploading to GitHub's own user-attachments CDN and embedding the returned URL as an inline image. Use when PR verification evidence (screenshots, repro GIFs, short clips) should render inline on a PR. Fails soft by design — if the undocumented endpoint breaks, skip the images and continue; never block the workflow.
---

# pr-attach — inline PR images via GitHub's user-attachments CDN

Uploads files to the same CDN the GitHub web UI uses for drag-and-drop
(`uploads.github.com/user-attachments/assets`), then prints markdown embeds to paste into a
PR body or comment. Zero bytes land in any git repo — the point: this is a codebase, not a
photo album, and verification evidence still deserves to render inline where the reviewer
reads it.

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
lines into the PR body/comment being drafted. Supported types: png, jpg, jpeg, gif, webp,
mp4, mov, webm.

## The contract (graceful degradation — the point of this design)

- On ANY failure (endpoint gone, schema drift, timeout, auth) the script warns on stderr,
  prints nothing for that file, and exits **3** — its only failure code. Exit 3 means
  "no embeds available": the caller SKIPS the images and continues. Never retry-loop,
  never block, never fail a workflow because of a missing screenshot.
- Before a batch that matters, optionally run `--check` once; if it fails, skip the batch.
- If the endpoint dies permanently, fall back to the `paranext/media` repo pattern
  (push under `paranext-core/pr-<N>/`, embed `raw.githubusercontent.com` URLs — the rule
  proposed in PR #2506, in flight as of 2026-08-11), or post without images.

## Lifecycle facts (measured 2026-08-11)

- A fresh upload serves **only authenticated requests**; an anonymous fetch 404s. It becomes
  anonymously visible once its URL is referenced in **posted** content — the same
  activation-on-post lifecycle as drag-and-drop. So a 404 from a plain `curl` on a
  just-uploaded asset is NOT a failure. To verify a pending asset, fetch it with
  `Authorization: Bearer $(gh auth token)`.
- Assets uploaded with a `repository_id` inherit that repo's visibility once posted
  (paranext-core is public, so posted images render for everyone).
- The endpoint's real failure shape is an error JSON with no `url` field (e.g.
  `{"message":"Not Found",...}`) — the script's guard treats any response without a
  `https://github.com/user-attachments/assets/...` URL as breakage.

## House rules still apply

Uploading is silent and safe — it publishes nothing on its own. But **posting the body or
comment that embeds the images is still gated exactly as before**: this skill changes
nothing about posting approvals (see `/process-pr-feedback`'s G2 gate and the house rule
that posting under the user's name needs their explicit per-run approval).
