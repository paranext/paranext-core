---
paths:
  - "**/*.png"
  - "**/*.jpg"
  - "**/*.jpeg"
  - "**/*.gif"
  - "**/*.webp"
  - "**/*.mp4"
  - "**/*.mov"
  - "**/*.webm"
---

# Media Files: Route to `paranext/media`, Not the Code Repo

**Applies to binaries added to illustrate a PR** — before/after screenshots, repro
GIFs/clips. It does **not** apply to product assets the app ships (icons, bundled
images), which belong in the code repo as usual.

Keep PR-illustration binaries **out of `paranext-core`'s git history** — blobs are slow to
pull and bloat every clone. Committing them to the PR branch doesn't help even if you
delete them later: deleting a file in a new commit leaves the original blob reachable
through the earlier commit, so it stays in history. And if the squash-merge is skipped, or
a tag or long-lived branch keeps the commit reachable, the blob becomes permanent history
that every clone downloads forever. A separate asset branch in this repo has the same
problem.

## The rule

To attach a binary to a PR without a human, push it to the
[`paranext/media`](https://github.com/paranext/media) repo and link it by raw URL in the
PR body — e.g. `https://raw.githubusercontent.com/paranext/media/main/paranext-core/pr-<N>/<file>.png`.

- `paranext/media` **must be public** for the link to render: GitHub displays an embedded
  image by fetching its raw URL through an anonymous proxy, and a raw link to a private
  repo returns 404 for everyone — including people who have access to the repo. If a link
  404s, check that `paranext/media` is still public.
- **Don't use Git LFS.** LFS pointer files don't serve as viewable images over raw URLs,
  and it adds needless complexity (it's also metered past GitHub's free quota).
- Prefer an external host (e.g. Google Drive) for very large files.
