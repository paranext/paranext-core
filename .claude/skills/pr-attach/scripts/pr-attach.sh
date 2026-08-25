#!/usr/bin/env bash
# Upload images/videos to GitHub's user-attachments CDN and print markdown embeds.
#
# Rides an UNDOCUMENTED endpoint (uploads.github.com/user-attachments/assets) that GitHub
# could remove or change at any time. Designed to FAIL SOFT: any failure prints a warning
# to stderr and prints nothing to stdout for that file. It must never block the workflow
# that calls it.
#
# Exit codes for an upload run: 0 = at least one embed reached stdout (a partial batch exits 0
# and warns, because the embeds it did produce are usable); 3 = no embeds, the skippable
# condition. Never any other nonzero code - so callers can branch on 3 alone. SIGPIPE is ignored
# rather than fatal, so a caller piping into `head` gets 0 or 3 like everyone else.
#
# `--check` is a canary, not an upload: on success it exits 0 having written only to stderr, so
# empty stdout there means the endpoint is healthy rather than that nothing was produced. It
# takes no file arguments and needs python3 to build its 1x1 png.
#
# Lifecycle fact (verified 2026-08-11): a fresh upload is served ONLY to authenticated
# requests; it becomes anonymously visible once the URL is referenced in posted content
# (PR body/comment) - the same activation-on-post lifecycle as drag-and-drop.
#
# Usage:
#   pr-attach.sh [-r owner/repo] file [file ...]   # print one embed line per file
#   pr-attach.sh --check [-r owner/repo]           # endpoint canary: upload a 1x1 png
#
# Fallback when this breaks: the paranext/media repo pattern proposed in paranext-core PR #2506
# (check that PR for its current state), or post without images.

set -u

# A closed reader on stdout must not kill the script: the contract callers are told to rely on is
# "0 or 3, never anything else", and a fatal SIGPIPE exits 141. Ignoring it turns the same event
# into a failed write, which the write check below reports as exit 3.
trap '' PIPE

TMPDIR_C=""
trap 'rm -rf "${TMPDIR_C:-}"' EXIT INT TERM

warn() { echo "pr-attach: $*" >&2; }

fail_hint() {
  warn "the user-attachments endpoint is undocumented and may have changed or been removed."
  warn "Fall back to the paranext/media repo (raw URLs; see paranext-core PR #2506) or post without images."
}

REPO=""
CHECK=0
FILES=()
FILE_COUNT=0
while [ $# -gt 0 ]; do
  case "$1" in
    -r)
      # Under `set -u` a bare `-r` dereferences an unset $2 and the shell exits 1, breaking the
      # "exits 3 - never any other nonzero code" contract callers are told to rely on.
      if [ $# -lt 2 ]; then warn "-r needs an argument (owner/repo)"; exit 3; fi
      REPO="$2"; shift 2 ;;
    --check) CHECK=1; shift ;;
    --)
      shift
      while [ $# -gt 0 ]; do FILES+=("$1"); FILE_COUNT=$((FILE_COUNT + 1)); shift; done ;;
    -?*)
      # Swallowing an unknown flag as a filename hides a typo: `--repo x/y` would warn once about
      # a missing file and then upload to the auto-detected repo instead, exiting 0.
      warn "unknown option: $1"; exit 3 ;;
    *) FILES+=("$1"); FILE_COUNT=$((FILE_COUNT + 1)); shift ;;
  esac
done

if ! command -v gh >/dev/null || ! command -v jq >/dev/null || ! command -v curl >/dev/null; then
  warn "missing gh/jq/curl"; exit 3
fi
if [ "$CHECK" = 1 ] && [ "$FILE_COUNT" -gt 0 ]; then
  warn "--check takes no file arguments"; exit 3
fi
if [ "$CHECK" = 0 ] && [ "$FILE_COUNT" -eq 0 ]; then
  warn "no files given"; exit 3
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
  FILE_COUNT=1
fi

mime_for() {
  # Screenshots off Windows tooling and phone captures routinely carry .PNG/.JPG.
  case "$(printf '%s' "${1##*.}" | tr '[:upper:]' '[:lower:]')" in
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
  NAME=$(basename -- "$f")
  # The name reaches the query string @uri-escaped, but the alt text is interpolated into
  # markdown, where a `]` or a newline in a filename would break out of the embed.
  ALT=$(printf '%s' "$NAME" | tr -d '\n\r][()')
  # The Authorization header goes in via a config file on stdin rather than argv: everything on
  # curl's command line is readable from /proc/<pid>/cmdline by any local process mid-upload.
  RESP=$(printf 'header = "Authorization: Bearer %s"\n' "$TOKEN" \
    | curl -sS --max-time 30 -X POST \
      "https://uploads.github.com/user-attachments/assets?name=$(jq -rn --arg n "$NAME" '$n|@uri')&content_type=$MIME&repository_id=$REPO_ID" \
      --config - -H "Accept: application/json" \
      --data-binary "@$f" 2>&1)
  URL=$(echo "$RESP" | jq -r '.url // empty' 2>/dev/null)
  # Matching the prefix alone is not enough. The URL is interpolated into `![alt](url)`, so a
  # response whose tail is `) [text](https://elsewhere` injects a second, fully-formed link into
  # whatever PR body or comment the caller pastes this into. Accept only the asset-id shape.
  if [[ "$URL" =~ ^https://github\.com/user-attachments/assets/[0-9a-fA-F-]+$ ]]; then
    if [ "$CHECK" = 1 ]; then
      echo "pr-attach: endpoint OK ($URL)" >&2
    else
      # GitHub renders a video as a player only from a bare URL on its own line; image markdown
      # around a video asset renders as a broken image.
      case "$MIME" in
        video/*) OUT="$URL" ;;
        *) OUT="![$ALT]($URL)" ;;
      esac
      # Counting an embed the write never delivered would report exit 0 with empty stdout.
      if echo "$OUT"; then
        OK_COUNT=$((OK_COUNT + 1))
      else
        warn "stdout write failed for $NAME"; RC=3
      fi
    fi
  else
    warn "upload failed for $NAME: $(echo "$RESP" | head -c 300)"
    fail_hint
    RC=3
  fi
done

# Exit 3 means "no embeds" - the skippable condition the header promises. A batch in which some
# files uploaded has embeds on stdout, and exiting 3 there would tell a caller following that
# contract to discard them.
if [ "$RC" != 0 ] && [ "$OK_COUNT" -gt 0 ]; then
  warn "partial batch: $OK_COUNT uploaded, the rest failed - embeds above are usable"
  exit 0
fi
exit $RC
