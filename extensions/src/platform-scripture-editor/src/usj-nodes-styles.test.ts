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

  describe('PT9 Standard-view marker glyph styling', () => {
    // Standard view renders marker glyphs as MarkerNode spans carrying marker-syntax classes
    // (opening/closing/selfClosing) — not `marker`, which MarkerNode dropped upstream in #359.
    // The PT9 look (small gray) must target those classes, scoped to
    // `.formatted-font.marker-editable` so the Unformatted view keeps full-size plain markers.
    it('grays the editable marker glyphs', () => {
      expect(scss).toMatch(
        /\.formatted-font\.marker-editable \.opening,[\s\S]{0,200}?\.formatted-font\.marker-editable \.marker \{\s*color: rgba\(140, 140, 140, 1\);\s*\}/,
      );
    });

    it('shrinks the editable marker glyphs to 0.7em, chapter tokens excluded', () => {
      expect(scss).toMatch(
        /\.formatted-font\.marker-editable \.opening,[\s\S]{0,200}?\.formatted-font\.marker-editable \.marker:not\(\.chapter\) \{\s*font-size: 0\.7em;\s*\}/,
      );
    });

    it('drops the verse badge background in Standard view (PT9 has no verse badge)', () => {
      expect(scss).toMatch(
        /\.formatted-font\.marker-editable \.verse \{[^}]*background-color: transparent;[^}]*\}/,
      );
    });

    it('scopes marker validation status rules to editable marker modes', () => {
      expect(scss).toMatch(/\.marker-editable \.status_unknown/);
      expect(scss).toMatch(/\.marker-editable \.status_invalid/);
      // The unscoped legacy rules were superseded by the scoped ones; they must not return.
      expect(scss).not.toMatch(/^\.status_unknown/m);
      expect(scss).not.toMatch(/^\.status_invalid/m);
    });
  });

  describe('note caller sequences', () => {
    it('gives cross-references their own caller counter so they do not consume footnote letters', () => {
      expect(scss).toMatch(/@counter-style cross-ref-callers/);
      expect(scss).toMatch(/counter-reset: caller crossref;/);
      expect(scss).toMatch(
        /\.note\.usfm_x \.immutable-note-caller\[data-caller='\+'\],\n\.note\.usfm_ex \.immutable-note-caller\[data-caller='\+'\] \{\s*counter-increment: crossref;\s*\}/,
      );
      expect(scss).toMatch(/counter\(crossref, cross-ref-callers\)/);
      // The generic rules the scoped versions replaced must not return — a re-synced copy that
      // re-adds them alongside the scoped ones would double-increment the footnote counter.
      expect(scss).not.toMatch(/^\.immutable-note-caller\[data-caller='\+'\] \{/m);
      expect(scss).not.toMatch(
        /^\.note\.collapsed \.immutable-note-caller\[data-caller='\+'\] > button::before/m,
      );
    });
  });
});
