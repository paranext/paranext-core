#!/usr/bin/env bash
# Upload images/videos to GitHub's user-attachments CDN and print markdown embeds.
#
# Rides an UNDOCUMENTED endpoint (uploads.github.com/user-attachments/assets) that GitHub
# could remove or change at any time. Designed to FAIL SOFT: any failure prints a warning
# to stderr, prints nothing to stdout for that file, and the script exits 3 — never any
# other nonzero code — so callers can treat "no embeds" as a skippable condition, not an
# error. It must never block the workflow that calls it.
#
# Lifecycle fact (verified 2026-08-11): a fresh upload is served ONLY to authenticated
# requests; it becomes anonymously visible once the URL is referenced in posted content
# (PR body/comment) — the same activation-on-post lifecycle as drag-and-drop.
#
# Usage:
#   pr-attach.sh [-r owner/repo] file [file ...]   # print one ![name](url) line per file
#   pr-attach.sh --check [-r owner/repo]           # endpoint canary: upload a 1x1 png
#
# Fallback when this breaks: the paranext/media repo (raw URLs; see paranext-core PR #2506).

set -u

REPO=""
CHECK=0
FILES=()
while [ $# -gt 0 ]; do
  case "$1" in
    -r) REPO="$2"; shift 2 ;;
    --check) CHECK=1; shift ;;
    *) FILES+=("$1"); shift ;;
  esac
done

warn() { echo "pr-attach: $*" >&2; }

fail_hint() {
  warn "the user-attachments endpoint is undocumented and may have changed or been removed."
  warn "Fall back to the paranext/media repo (raw URLs; paranext-core PR #2506) or post without images."
}

if ! command -v gh >/dev/null || ! command -v jq >/dev/null || ! command -v curl >/dev/null; then
  warn "missing gh/jq/curl"; exit 3
fi

if [ -z "$REPO" ]; then
  REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null) || true
fi
if [ -z "$REPO" ]; then
  warn "no repo given (-r owner/repo) and none detectable from cwd"; exit 3
fi

# On API errors gh prints the raw error JSON to stdout despite --jq, so require a number.
REPO_ID=$(gh api "repos/$REPO" --jq .id 2>/dev/null)
case "$REPO_ID" in
  ''|*[!0-9]*) warn "could not resolve repository id for $REPO"; exit 3 ;;
esac

TOKEN=$(gh auth token 2>/dev/null)
if [ -z "$TOKEN" ]; then
  warn "gh auth token unavailable"; exit 3
fi

if [ "$CHECK" = 1 ]; then
  TMPPNG=$(mktemp --suffix=.png)
  python3 - "$TMPPNG" <<'PYEOF'
import struct, sys, zlib
def chunk(t, d):
    c = struct.pack('>I', len(d)) + t + d
    return c + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
ihdr = struct.pack('>IIBBBBB', 1, 1, 8, 2, 0, 0, 0)
png = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr)
       + chunk(b'IDAT', zlib.compress(b'\x00\x80\x80\x80')) + chunk(b'IEND', b''))
open(sys.argv[1], 'wb').write(png)
PYEOF
  FILES=("$TMPPNG")
fi

if [ "$CHECK" = 0 ] && [ ${#FILES[@]} -eq 0 ]; then
  warn "no files given"; exit 3
fi

mime_for() {
  case "${1##*.}" in
    png) echo image/png ;; jpg|jpeg) echo image/jpeg ;; gif) echo image/gif ;;
    webp) echo image/webp ;; mp4) echo video/mp4 ;; mov) echo video/quicktime ;;
    webm) echo video/webm ;; *) echo "" ;;
  esac
}

RC=0
for f in "${FILES[@]}"; do
  if [ ! -f "$f" ]; then warn "no such file: $f"; RC=3; continue; fi
  MIME=$(mime_for "$f")
  if [ -z "$MIME" ]; then warn "unsupported extension: $f"; RC=3; continue; fi
  NAME=$(basename "$f")
  RESP=$(curl -sS --max-time 30 -X POST \
    "https://uploads.github.com/user-attachments/assets?name=$(jq -rn --arg n "$NAME" '$n|@uri')&content_type=$MIME&repository_id=$REPO_ID" \
    -H "Authorization: Bearer $TOKEN" -H "Accept: application/json" \
    --data-binary "@$f" 2>&1)
  URL=$(echo "$RESP" | jq -r '.url // empty' 2>/dev/null)
  case "$URL" in
    https://github.com/user-attachments/assets/*)
      if [ "$CHECK" = 1 ]; then
        echo "pr-attach: endpoint OK ($URL)" >&2
      else
        echo "![$NAME]($URL)"
      fi
      ;;
    *)
      warn "upload failed for $NAME: $(echo "$RESP" | head -c 300)"
      fail_hint
      RC=3
      ;;
  esac
done

[ "$CHECK" = 1 ] && rm -f "$TMPPNG"
exit $RC
