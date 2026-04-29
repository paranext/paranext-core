#!/usr/bin/env bash
#
# Bulk extraction driver for the Enhanced Resources data-shape audit (Phase B).
#
# Walks every in-scope Marble-encrypted resource on disk, runs --stats and (for the
# rich types) --samples, and writes JSON outputs to the canonical ai-prompts location.
#
# Failures of individual resources are captured in EXTRACTION_ERRORS.md; the run
# continues on error so partial results are always produced.

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECTS="$HOME/.platform.bible/projects/Paratext 9 Projects"
# Canonical location of audit artifacts is in the ai-prompts repo, NOT inside paranext-core
OUT="$HOME/workspaces/enhanced-resources/ai-prompts/ai-porting/.context/features/enhanced-resources/data-schemas/extraction-stats"
ERRORS="$OUT/EXTRACTION_ERRORS.md"

mkdir -p "$OUT"
: > "$ERRORS.tmp"

# Build once up front; subsequent invocations use --no-build for speed.
echo "Building extractor..."
( cd "$SCRIPT_DIR" && dotnet build --nologo --verbosity quiet ) >/dev/null

run() {
    local file="$1" id="$2" type="$3"
    echo "Stats: $id ($type)"
    if [ ! -f "$file" ]; then
        echo "- $id ($type): file not found at \`$file\`" >> "$ERRORS.tmp"
        return 0
    fi
    if ! ( cd "$SCRIPT_DIR" && dotnet run --no-build -- --stats "$file" --type "$type" \
        > "$OUT/$id-stats.json" 2> "$OUT/$id-stats.err" ); then
        echo "- $id ($type): stats failed — see \`$id-stats.err\`" >> "$ERRORS.tmp"
        return 0
    fi
    rm -f "$OUT/$id-stats.err"
}

run_samples() {
    local file="$1" id="$2" type="$3" count="${4:-3}"
    echo "Samples: $id ($type)"
    if [ ! -f "$file" ]; then
        echo "- $id ($type) samples: file not found at \`$file\`" >> "$ERRORS.tmp"
        return 0
    fi
    if ! ( cd "$SCRIPT_DIR" && dotnet run --no-build -- --samples "$file" --type "$type" --count "$count" \
        > "$OUT/samples-$type-$id.json" 2> "$OUT/samples-$type-$id.err" ); then
        echo "- $id ($type) samples: failed — see \`samples-$type-$id.err\`" >> "$ERRORS.tmp"
        return 0
    fi
    rm -f "$OUT/samples-$type-$id.err"
}

# ----- Lexicon (.mdv1z, .p8z) -----
run "$PROJECTS/_Resources/DCLEX.mdv1z" "DCLEX" "lexicon"
run "$PROJECTS/_Resources/SDBG.mdv1z" "SDBG-mdv1z" "lexicon"
run "$PROJECTS/_Resources/SDBH.mdv1z" "SDBH-mdv1z" "lexicon"
run "$PROJECTS/_Dictionaries/LN.p8z" "LN" "lexicon"
run "$PROJECTS/_Dictionaries/SDBH.p8z" "SDBH-p8z" "lexicon"

run_samples "$PROJECTS/_Resources/DCLEX.mdv1z" "DCLEX" "lexicon" 3
run_samples "$PROJECTS/_Resources/SDBG.mdv1z" "SDBG" "lexicon" 3
run_samples "$PROJECTS/_Resources/SDBH.mdv1z" "SDBH" "lexicon" 3

# ----- Encyclopedia (.mev1z, .p8z) -----
run "$PROJECTS/_Resources/MBL_ENC.mev1z" "MBL_ENC" "encyclopedia"
run "$PROJECTS/_Dictionaries/FAUNA.p8z" "FAUNA" "encyclopedia"
run "$PROJECTS/_Dictionaries/FLORA.p8z" "FLORA" "encyclopedia"
run "$PROJECTS/_Dictionaries/REALIA.p8z" "REALIA" "encyclopedia"

run_samples "$PROJECTS/_Resources/MBL_ENC.mev1z" "MBL_ENC" "encyclopedia" 3
run_samples "$PROJECTS/_Dictionaries/FAUNA.p8z" "FAUNA" "encyclopedia" 3

# ----- Semantic domains (embedded in lexicon resources) -----
run "$PROJECTS/_Resources/DCLEX.mdv1z" "DCLEX-domains" "domains"
run "$PROJECTS/_Resources/SDBG.mdv1z" "SDBG-domains" "domains"
run "$PROJECTS/_Resources/SDBH.mdv1z" "SDBH-domains" "domains"

# ----- Image index + media metadata -----
run "$PROJECTS/_Resources/IMG_INDX.mxv1z" "IMG_INDX" "images"
run "$PROJECTS/_Resources/IMG_HD.miv1z" "IMG_HD-v1" "images"
run "$PROJECTS/_Resources/IMG_HD.miv2z" "IMG_HD-v2" "images"
run "$PROJECTS/_Resources/IMG_LD.miv2z" "IMG_LD" "images"
run "$PROJECTS/_Resources/IMG_SD.miv2z" "IMG_SD" "images"
run "$PROJECTS/_Resources/IMG_THMB.miv2z" "IMG_THMB" "images"

# ----- Marble Bible / Source -----
run "$PROJECTS/_Resources/BHS+.mbv1z" "BHS+" "bible"
run "$PROJECTS/_Resources/KJV+.mbv2z" "KJV+" "bible"
run "$PROJECTS/_Resources/UBSGNT5+.mbv2z" "UBSGNT5+" "bible"
run "$PROJECTS/_Resources/ESV16UK+.mbv2z" "ESV16UK+" "bible"
run "$PROJECTS/_Resources/BHS.msv1z" "BHS-source" "source"
run "$PROJECTS/_Resources/GNT.msv1z" "GNT-source" "source"
run "$PROJECTS/_Resources/LXXDC.msv1z" "LXXDC-source" "source"

# Drop empty stats/samples JSONs and verbose .err files left by failed runs —
# the EXTRACTION_ERRORS.md document carries the canonical root-cause summary.
find "$OUT" -name "*.json" -size 0 -delete
find "$OUT" -name "*.err" -delete

# Promote ERRORS.tmp to a markdown file only if we actually recorded any failures.
# If a curated EXTRACTION_ERRORS.md already exists, keep it (it is hand-edited
# with explanations) rather than overwriting with the bare list.
if [ -s "$ERRORS.tmp" ] && [ ! -f "$ERRORS" ]; then
    {
        echo "# Extraction errors — $(date -Iseconds)"
        echo ""
        echo "The following resources could not be processed by run-all.sh."
        echo "Inspect the run output for the underlying stderr; the .err files"
        echo "are deleted at the end of the run."
        echo ""
        cat "$ERRORS.tmp"
    } > "$ERRORS"
    echo ""
    echo "Some resources failed; see $ERRORS"
fi
rm -f "$ERRORS.tmp"

echo "Done."
