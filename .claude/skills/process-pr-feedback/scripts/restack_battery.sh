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
G="git -C $ROOT"
mkdir -p "$OUT"

echo "== 1. commit accounting =="
# Compare against the new TIP, not the new base: the base contains none of the branch's own
# commits, so `git cherry <new-base> ...` marks every commit '+' whether it survived or not.
$G cherry "$NEWTIP" "$OLDTIP" "$OLDBASE" | tee "$OUT/cherry.txt"
DROPPED=$(grep -c '^+' "$OUT/cherry.txt" || true)
echo "   dropped candidates: $DROPPED (every '+' must be confirmed intentional via patch-id)"

# LC_ALL=C on BOTH sort and comm. `comm` honours LC_COLLATE (see `comm --help`), so pinning only
# the sorts leaves the two disagreeing under a locale that ignores punctuation in ordering —
# which yields a false-empty difference, precisely the check this battery exists for.
$G diff --name-only "$OLDBASE" "$OLDTIP" | LC_ALL=C sort > "$OUT/A.txt"
$G diff --name-only "$NEWBASE" "$NEWTIP" | LC_ALL=C sort > "$OUT/N.txt"
$G diff --name-only "$OLDBASE" "$NEWBASE" | LC_ALL=C sort > "$OUT/BASETOUCHED.txt"

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
  a=$($G rev-parse "$OLDTIP:$f" 2>/dev/null || echo missing-old)
  b=$($G rev-parse "$NEWTIP:$f" 2>/dev/null || echo missing-new)
  if [ "$a" != "$b" ]; then echo "   DIFFERS: $f"; DIFFS=$((DIFFS + 1)); fi
done < "$OUT/AN_untouched.txt"
echo "   checked $(wc -l < "$OUT/AN_untouched.txt") files, $DIFFS deviation(s)"
echo "   skipped (new base touched): $(LC_ALL=C comm -12 "$OUT/AN.txt" "$OUT/BASETOUCHED.txt" | tr '\n' ' ')"

echo "== 5. conflict markers =="
# '|||||||' is the diff3/zdiff3 base marker. Omitting it lets a conflicted file under
# merge.conflictStyle=diff3 pass a check whose whole purpose is to catch conflicted files.
$G grep -nE '^(<{7} |>{7} |={7}$|\|{7})' "$NEWTIP" -- . || echo "   none"
echo "   [end]"

echo "== 6. surgery isolation (run manually after editing a mid-history commit) =="
echo "   git -C $ROOT range-diff $NEWBASE <pre-surgery-tip> $NEWTIP"
echo "   must show '!' on the edited commit and only on it."
