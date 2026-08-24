#!/usr/bin/env bash
# restack_battery.sh — prove a restack replayed faithfully. Run at the top of the stack.
#
# Usage: restack_battery.sh <out-dir> <old-base> <old-tip> <new-base> <new-tip> [repo-root]
#
# Every check prints output you must read. Exit codes are not the verification: an empty stdout
# from a failed redirect looks exactly like a passing set-difference, which is why the output
# directory is created up front and every path is absolute.
set -euo pipefail

if [ $# -lt 5 ]; then
  sed -n '2,8p' "$0" >&2; exit 64
fi
OUT=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
OLDBASE=$2; OLDTIP=$3; NEWBASE=$4; NEWTIP=$5
ROOT=${6:-$(git rev-parse --show-toplevel)}
# A function, not a string: `G="git -C $ROOT"` word-splits on a repo root containing a space,
# and git then reports an unrelated error for all six checks.
g() { git -C "$ROOT" "$@"; }
mkdir -p "$OUT"

echo "== 1. commit accounting =="
# Compare against the new TIP, not the new base: the base contains none of the branch's own
# commits, so `git cherry <new-base> ...` marks every commit '+' whether it survived or not.
g cherry "$NEWTIP" "$OLDTIP" "$OLDBASE" | tee "$OUT/cherry.txt"
DROPPED=$(grep -c '^+' "$OUT/cherry.txt" || true)
echo "   dropped candidates: $DROPPED (every '+' must be confirmed intentional via patch-id)"

# LC_ALL=C on BOTH sort and comm. `comm` honours LC_COLLATE (see `comm --help`), so pinning only
# the sorts leaves the two disagreeing under a locale that ignores punctuation in ordering —
# which yields a false-empty difference, precisely the check this battery exists for.
g diff --name-only "$OLDBASE" "$OLDTIP" | LC_ALL=C sort > "$OUT/A.txt"
g diff --name-only "$NEWBASE" "$NEWTIP" | LC_ALL=C sort > "$OUT/N.txt"
g diff --name-only "$OLDBASE" "$NEWBASE" | LC_ALL=C sort > "$OUT/BASETOUCHED.txt"

echo "== 2. N \\ A — content the new branch carries that the old never did (must be empty) =="
LC_ALL=C comm -13 "$OUT/A.txt" "$OUT/N.txt" | tee "$OUT/N_minus_A.txt"; echo "   [end]"
echo "== 3. A \\ N — content no longer carried (must be empty) =="
LC_ALL=C comm -23 "$OUT/A.txt" "$OUT/N.txt" | tee "$OUT/A_minus_N.txt"; echo "   [end]"

echo "== 4. byte-identity over A n N, excluding files the NEW BASE touched =="
LC_ALL=C comm -12 "$OUT/A.txt" "$OUT/N.txt" > "$OUT/AN.txt"
# The "new base did not touch" filter is computed, not assumed: a file the base changed is
# EXPECTED to differ, and folding it in with the rest makes the check unreadable.
LC_ALL=C comm -23 "$OUT/AN.txt" "$OUT/BASETOUCHED.txt" > "$OUT/AN_untouched.txt"
DIFFS=0
while IFS= read -r f; do
  [ -z "$f" ] && continue
  a=$(g rev-parse "$OLDTIP:$f" 2>/dev/null || echo missing-old)
  b=$(g rev-parse "$NEWTIP:$f" 2>/dev/null || echo missing-new)
  if [ "$a" != "$b" ]; then echo "   DIFFERS: $f"; DIFFS=$((DIFFS + 1)); fi
done < "$OUT/AN_untouched.txt"
echo "   checked $(wc -l < "$OUT/AN_untouched.txt") files, $DIFFS deviation(s)"
echo "   skipped (new base touched): $(LC_ALL=C comm -12 "$OUT/AN.txt" "$OUT/BASETOUCHED.txt" | tr '\n' ' ')"

echo "== 5. conflict markers =="
# '|||||||' is the diff3/zdiff3 base marker. Omitting it lets a conflicted file under
# merge.conflictStyle=diff3 pass a check whose whole purpose is to catch conflicted files.
# Branch on the exit code: 1 is "no match" (a pass), anything else is git failing — a mistyped
# tip would otherwise print "none" for the check whose whole purpose is catching conflicts.
set +e
g grep -nE '^(<{7} |>{7} |={7}$|\|{7})' "$NEWTIP" -- .
GREP_RC=$?
set -e
case $GREP_RC in
  0) echo "   !! CONFLICT MARKERS FOUND"; exit 1 ;;
  1) echo "   none" ;;
  *) echo "   !! git grep failed (rc=$GREP_RC) - this is NOT a pass"; exit 1 ;;
esac
echo "   [end]"

echo "== 6. surgery isolation (run manually after editing a mid-history commit) =="
echo "   git -C $ROOT range-diff $NEWBASE <pre-surgery-tip> $NEWTIP"
echo "   must show '!' on the edited commit and only on it."
