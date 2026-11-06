import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { testingUseCommentaryMarkerStyles } from './use-commentary-marker-styles.hook';

// The set of supported commentaries is hand-maintained in two places that must stay in sync (each
// file's comments say so): the TS `COMMENTARY_STYLES_BY_DBL_ENTRY_UID` map in the hook, and the C#
// `CommentariesWhiteList` in DblDownloadableDataProvider.cs. Comments alone can't stop them drifting,
// so this test compares the hook's map with the UIDs read from the C# source, which TypeScript
// cannot import.

/**
 * Every lowercase 16-hex DBL entry UID appearing in a slice of C# source text.
 *
 * The 16 hex chars must stand alone (not be part of a longer hex run), so a stray longer token like
 * a 40-char git SHA in a comment isn't chopped into fake 16-char "UIDs". Note this still cannot
 * tell a real whitelist entry from a UID that only appears in a comment inside the list — it
 * scrapes source text, so a comment-only mention there counts as if it were an entry.
 */
function uidsIn(text: string): Set<string> {
  return new Set(
    (text.match(/(?<![0-9a-fA-F])[0-9a-fA-F]{16}(?![0-9a-fA-F])/g) ?? []).map((uid) =>
      uid.toLowerCase(),
    ),
  );
}

const csharpPath = fileURLToPath(
  new URL(
    '../../../../c-sharp/Projects/DigitalBibleLibrary/DblDownloadableDataProvider.cs',
    import.meta.url,
  ),
);

describe('commentary DBL entry UID parity (TS hook ↔ C# CommentariesWhiteList)', () => {
  it('both registries contain exactly the same UID set', () => {
    const tsUids = Object.keys(testingUseCommentaryMarkerStyles.COMMENTARY_STYLES_BY_DBL_ENTRY_UID);
    const whiteList = readFileSync(csharpPath, 'utf-8').match(
      /CommentariesWhiteList\s*=\s*\[([\s\S]*?)\];/,
    );
    if (!whiteList) throw new Error('Could not locate CommentariesWhiteList in its source file');
    const csharpUids = uidsIn(whiteList[1]);

    // Sanity: we should have found the full set, not an empty/partial match.
    expect(csharpUids.size).toBeGreaterThanOrEqual(13);
    expect([...tsUids].sort()).toEqual([...csharpUids].sort());
  });
});
