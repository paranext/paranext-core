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
      expect(scss).toContain(
        '.formatted-font.marker-editable .opening,\n' +
          '.formatted-font.marker-editable .closing,\n' +
          '.formatted-font.marker-editable .selfClosing,\n' +
          '.formatted-font.marker-editable .marker {\n' +
          '  color: rgba(140, 140, 140, 1);\n' +
          '}',
      );
    });

    it('shrinks the editable marker glyphs to 0.7em, chapter tokens excluded', () => {
      expect(scss).toContain(
        '.formatted-font.marker-editable .opening,\n' +
          '.formatted-font.marker-editable .closing,\n' +
          '.formatted-font.marker-editable .selfClosing,\n' +
          '.formatted-font.marker-editable .marker:not(.chapter) {\n' +
          '  font-size: 0.7em;\n' +
          '}',
      );
    });

    // A \va/\vp value and its glyphs live inside one AttributeRunNode wrapper that already
    // carries `font-size: 66%`. Without this reset the 0.7em glyph rule above compounds against
    // that wrapper (0.7 x 0.66 ~= 46% of the paragraph), so the glyphs read visibly smaller than
    // the value they belong to. The four-class selector outranks the three-class glyph rule, so
    // the reset wins on specificity rather than declaration order.
    it('keeps \\va/\\vp glyphs the same size as their value instead of compounding', () => {
      expect(scss).toContain(
        '.formatted-font.marker-editable .usfm_va .opening,\n' +
          '.formatted-font.marker-editable .usfm_va .closing,\n' +
          '.formatted-font.marker-editable .usfm_va .selfClosing,\n' +
          '.formatted-font.marker-editable .usfm_vp .opening,\n' +
          '.formatted-font.marker-editable .usfm_vp .closing,\n' +
          '.formatted-font.marker-editable .usfm_vp .selfClosing {\n' +
          '  font-size: 100%;\n' +
          '}',
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

  describe('real-table box', () => {
    // PT9 boxes every table it renders (ScriptureBase.css `table`/`td`/`td.markercell`), and so
    // does the editor library. Scoping these to handbook resources alone leaves a Scripture
    // project's tables with no borders, no cell padding and uncollapsed edges, which reads as
    // run-together text rather than a table.
    it('boxes tables everywhere, not only in handbook resources', () => {
      expect(scss).toContain('.usfm table {\n  border-collapse: collapse;\n}');
      expect(scss).toMatch(
        /\.usfm td,\n\.usfm th \{[^}]*border: 1px solid #000000;[^}]*padding-right: 0\.28em;[^}]*\}/,
      );
      expect(scss).toMatch(/\.usfm td\.markercell \{\s*border-style: none;\s*\}/);
    });

    // A row's own \tr glyph rides in the anonymous cell the browser generates around the only
    // non-cell content of a <tr>, so it matches neither the td nor the th rule and would sit flush
    // against the table edge without this.
    it('pads a row marker like the cells around it', () => {
      expect(scss).toContain(
        '.usfm .table-row > .opening,\n' +
          '.usfm .table-row > .marker {\n' +
          '  padding-inline-start: 0.28em;\n' +
          '}',
      );
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
      // The footnote half must stay pinned too — a re-sync dropping the scoped footnote rules
      // while keeping the crossref ones would leave nothing incrementing `caller`.
      expect(scss).toMatch(/\.note\.usfm_f \.immutable-note-caller\[data-caller='\+'\]/);
      expect(scss).toMatch(/counter\(caller, note-callers\)/);
      // The generic rules the scoped versions replaced must not return — a re-synced copy that
      // re-adds them alongside the scoped ones would double-increment the footnote counter.
      expect(scss).not.toMatch(/^\.immutable-note-caller\[data-caller='\+'\] \{/m);
      expect(scss).not.toMatch(
        /^\.note\.collapsed \.immutable-note-caller\[data-caller='\+'\] > button::before/m,
      );
    });
  });
});
