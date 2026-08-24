#!/usr/bin/env bash
# Upload images/videos to GitHub's user-attachments CDN and print markdown embeds.
#
# Rides an UNDOCUMENTED endpoint (uploads.github.com/user-attachments/assets) that GitHub
# could remove or change at any time. Designed to FAIL SOFT: any failure prints a warning
# to stderr and prints nothing to stdout for that file. It must never block the workflow
# that calls it.
#
# Exit codes: 0 = at least one embed on stdout (a partial batch exits 0 and warns, because
# the embeds it did produce are usable); 3 = no embeds, the skippable condition. Never any
# other nonzero code - so callers can branch on 3 alone.
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

warn() { echo "pr-attach: $*" >&2; }

fail_hint() {
  warn "the user-attachments endpoint is undocumented and may have changed or been removed."
  warn "Fall back to the paranext/media repo (raw URLs; paranext-core PR #2506) or post without images."
}

REPO=""
CHECK=0
FILES=()
while [ $# -gt 0 ]; do
  case "$1" in
    -r)
      # Under `set -u` a bare `-r` dereferences an unset $2 and the shell exits 1, breaking the
      # "exits 3 - never any other nonzero code" contract callers are told to rely on.
      if [ $# -lt 2 ]; then warn "-r needs an argument (owner/repo)"; exit 3; fi
      REPO="$2"; shift 2 ;;
    --check) CHECK=1; shift ;;
    *) FILES+=("$1"); shift ;;
  esac
done

if ! command -v gh >/dev/null || ! command -v jq >/dev/null || ! command -v curl >/dev/null; then
  warn "missing gh/jq/curl"; exit 3
fi
if [ "$CHECK" = 1 ] && ! command -v python3 >/dev/null; then
  warn "--check needs python3 to generate its canary png"; exit 3
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
  # `mktemp --suffix=` is GNU-only - BSD mktemp (macOS) rejects it, which would make --check fail
  # permanently there and report it through fail_hint, blaming GitHub for a local tool gap.
  TMPDIR_C=$(mktemp -d) || { warn "mktemp failed"; exit 3; }
  TMPPNG="$TMPDIR_C/canary.png"
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
OK_COUNT=0
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
        OK_COUNT=$((OK_COUNT + 1))
      fi
      ;;
    *)
      warn "upload failed for $NAME: $(echo "$RESP" | head -c 300)"
      fail_hint
      RC=3
      ;;
  esac
done

[ "$CHECK" = 1 ] && rm -rf "$TMPDIR_C"

# Exit 3 means "no embeds" - the skippable condition the header promises. A batch in which some
# files uploaded has embeds on stdout, and exiting 3 there would tell a caller following that
# contract to discard them.
if [ "$RC" != 0 ] && [ "$OK_COUNT" -gt 0 ]; then
  warn "partial batch: $OK_COUNT uploaded, the rest failed - embeds above are usable"
  exit 0
fi
exit $RC
