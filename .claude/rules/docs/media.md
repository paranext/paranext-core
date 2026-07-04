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
pull and bloat every clone forever. Committing them to the PR branch doesn't help even if
you delete them later: a skipped squash, a lingering tag, or GitHub's infrequent gc can
leave the blob where everyone still pulls it down. A separate asset branch in this repo
has the same problem.

## The rule

To attach a binary to a PR without a human, push it to the
[`paranext/media`](https://github.com/paranext/media) repo and link it by URL in the PR
body (e.g. `https://raw.githubusercontent.com/paranext/media/<branch>/<path>`).

- **Do NOT enable Git LFS** on `paranext/media` — it costs money.
- Prefer an external host (e.g. Google Drive) for very large files.
- `paranext/media` is currently private, so raw URLs won't render inline for viewers
  without access. If that becomes a recurring problem, ask to make it public.
