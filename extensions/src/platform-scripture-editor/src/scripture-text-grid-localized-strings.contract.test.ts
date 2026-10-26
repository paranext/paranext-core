import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * The Text Collection grid cannot be mounted in jsdom — it depends on PAPI services and live data
 * providers — so its handling of unresolved localized strings is guarded by reading the source, the
 * same shape as `resource-panels-content-zoom.contract.test.ts` beside it. An unresolved lookup
 * comes back as the raw `%key%`, and a raw read hands that straight to the user. Most of this
 * file's reads have no `??`, so `paranext/no-nullish-localized-fallback` cannot see one come back.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));

/** Whitespace-insensitive haystack, so formatting alone can't fail this. */
function source(fileName: string): string {
  return readFileSync(path.join(SRC_DIR, fileName), 'utf-8').replace(/\s+/g, ' ');
}

describe('Text Collection grid localized strings', () => {
  it('reads every localized string through resolveLocalizedString', () => {
    const grid = source('scripture-text-grid.web-view.tsx');
    const reads = grid.match(/localizedStrings\[/g) ?? [];
    const resolvedReads = grid.match(/resolveLocalizedString\( ?localizedStrings\[/g) ?? [];

    // Guards the sweep against matching nothing, which would make the equality below vacuous.
    expect(reads.length).toBeGreaterThan(0);
    expect(resolvedReads).toHaveLength(reads.length);
  });
});
