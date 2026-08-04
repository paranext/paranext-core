import { readFileSync } from 'fs';
import path from 'path';

/**
 * Regression pin for the vendored editor stylesheet `_usj-nodes.scss`.
 *
 * `_usj-nodes.scss` is a MANUAL copy of the editor library's `packages/platform/src/usj-nodes.css`
 * (see the file header). The editor JS (delivered separately, via the linked
 * `@eten-tech-foundation/platform-editor` package) renders an UnknownNode's own USFM bytes — the
 * opening marker and, for `\optbreak`, its `//` token — as REAL ImmutableTypedTextNode child text.
 * The library removed the two CSS `::before` rules that used to synthesize those labels precisely
 * because they now DUPLICATE the real text.
 *
 * When the vendored copy drifts (keeps the old `::before` rules while the JS renders real text) the
 * duplication is visible: a bare `\fig` shows its marker twice, and — the live-reported bug — a
 * single `//` optbreak displays as `////` with a caret that cannot be placed inside it (the extra
 * `//` is a pseudo-element, not addressable text). This test fails if any content-generating
 * `::before` is re-introduced onto an `.unknown-block`/`.unknown-inline` selector, catching that
 * drift before it ships.
 */
describe('_usj-nodes.scss vendored editor stylesheet', () => {
  const scss = readFileSync(path.resolve(__dirname, '_usj-nodes.scss'), 'utf8');

  it('still styles the UnknownNode containers (guards against reading the wrong/empty file)', () => {
    expect(scss).toContain('.marker-editable .unknown-block');
    expect(scss).toContain('.marker-editable .unknown-inline');
  });

  it('does not synthesize marker/optbreak text via ::before (the JS renders it as real text now)', () => {
    // Any `.unknown-...::before` re-introduces the duplicate that renders `\fig` twice and `//` as
    // `////`. Matches the selector regardless of the attribute qualifier or whitespace.
    const unknownBeforeRule = /\.unknown-(?:block|inline)[^{]*::before/;
    expect(scss).not.toMatch(unknownBeforeRule);
  });

  it('does not hard-code the literal optbreak `//` token anywhere (it is a real child text node)', () => {
    // The old rule was `content: '//'`. Its removal is what fixes the `////` display.
    expect(scss).not.toMatch(/content:\s*['"]\/\/['"]/);
  });
});
