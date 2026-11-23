import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The set of supported commentaries is hand-maintained in two places that must stay in sync (each
// file's comments say so): the TS `COMMENTARY_STYLES_BY_DBL_ENTRY_UID` map in the hook, and the C#
// `CommentariesWhiteList` in DblDownloadableDataProvider.cs. Comments alone can't stop them drifting,
// so this test reads both sources and asserts they hold exactly the same DBL-entry-UID set.

/**
 * Every lowercase 16-hex DBL entry UID appearing in a slice of source text.
 *
 * The 16 hex chars must stand alone (not be part of a longer hex run), so a stray longer token like
 * a 40-char git SHA in a comment isn't chopped into fake 16-char "UIDs". Note this still cannot
 * tell a real registry entry from a UID that only appears in a comment (e.g. "keep in sync with
 * 97196133a859179b") — it scrapes source text, so a comment-only mention counts as if it were an
 * entry. Don't rely on this test to catch a genuinely-missing entry that a comment happens to
 * name.
 */
function uidsIn(text: string): Set<string> {
  return new Set(
    (text.match(/(?<![0-9a-fA-F])[0-9a-fA-F]{16}(?![0-9a-fA-F])/g) ?? []).map((uid) =>
      uid.toLowerCase(),
    ),
  );
}

function regionUids(source: string, regionRe: RegExp, label: string): Set<string> {
  const match = source.match(regionRe);
  if (!match) throw new Error(`Could not locate the ${label} in its source file`);
  return uidsIn(match[1]);
}

const hookPath = fileURLToPath(new URL('./use-commentary-marker-styles.hook.ts', import.meta.url));
const csharpPath = fileURLToPath(
  new URL(
    '../../../../c-sharp/Projects/DigitalBibleLibrary/DblDownloadableDataProvider.cs',
    import.meta.url,
  ),
);

describe('commentary DBL entry UID parity (TS hook ↔ C# CommentariesWhiteList)', () => {
  it('both registries contain exactly the same UID set', () => {
    const tsUids = regionUids(
      readFileSync(hookPath, 'utf-8'),
      /COMMENTARY_STYLES_BY_DBL_ENTRY_UID[^{]*\{([\s\S]*?)\n\};/,
      'COMMENTARY_STYLES_BY_DBL_ENTRY_UID map',
    );
    const csharpUids = regionUids(
      readFileSync(csharpPath, 'utf-8'),
      /CommentariesWhiteList\s*=\s*\[([\s\S]*?)\];/,
      'CommentariesWhiteList',
    );

    // Sanity: we should have found the full set, not an empty/partial match.
    expect(tsUids.size).toBeGreaterThanOrEqual(13);
    expect([...tsUids].sort()).toEqual([...csharpUids].sort());
  });
});
