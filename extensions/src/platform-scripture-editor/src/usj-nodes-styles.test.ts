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

  /**
   * Builds a matcher for "this exact selector list carries this declaration". Tolerant of
   * whitespace and of the declaration's position within the block, so reformatting the stylesheet
   * cannot fail these pins for a reason that has nothing to do with what they guard.
   */
  const rule = (selectors: string[], declaration: string) => {
    const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(
      `${selectors.map(escape).join(',\\s*')}\\s*\\{[^}]*${escape(declaration)}[^}]*\\}`,
    );
  };

  describe('PT9 Standard-view marker glyph styling', () => {
    // Standard view renders marker glyphs as MarkerNode spans carrying marker-syntax classes
    // (opening/closing/selfClosing) — not `marker`, which MarkerNode dropped upstream in #359.
    // The PT9 look (small gray) must target those classes, scoped to
    // `.formatted-font.marker-editable` so the Unformatted view keeps full-size plain markers.
    it('grays the editable marker glyphs', () => {
      expect(scss).toMatch(
        rule(
          [
            '.formatted-font.marker-editable .opening',
            '.formatted-font.marker-editable .closing',
            '.formatted-font.marker-editable .selfClosing',
            '.formatted-font.marker-editable .marker',
          ],
          'color: rgba(140, 140, 140, 1);',
        ),
      );
    });

    it('shrinks the editable marker glyphs to 0.7em, chapter tokens excluded', () => {
      expect(scss).toMatch(
        rule(
          [
            '.formatted-font.marker-editable .opening',
            '.formatted-font.marker-editable .closing',
            '.formatted-font.marker-editable .selfClosing',
            '.formatted-font.marker-editable .marker:not(.chapter)',
          ],
          'font-size: 0.7em;',
        ),
      );
    });

    // A \va/\vp value and its glyphs live inside one AttributeRunNode wrapper that already
    // carries `font-size: 66%`. Without this reset the 0.7em glyph rule above compounds against
    // that wrapper (0.7 x 0.66 ~= 46% of the paragraph), so the glyphs read visibly smaller than
    // the value they belong to. The four-class selector outranks the three-class glyph rule, so
    // the reset wins on specificity rather than declaration order.
    it('keeps \\va/\\vp glyphs the same size as their value instead of compounding', () => {
      expect(scss).toMatch(
        rule(
          [
            '.formatted-font.marker-editable .usfm_va .opening',
            '.formatted-font.marker-editable .usfm_va .closing',
            '.formatted-font.marker-editable .usfm_va .selfClosing',
            '.formatted-font.marker-editable .usfm_vp .opening',
            '.formatted-font.marker-editable .usfm_vp .closing',
            '.formatted-font.marker-editable .usfm_vp .selfClosing',
          ],
          'font-size: 100%;',
        ),
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

  describe('theming and dead declarations', () => {
    // A fixed near-black hover color is all but invisible against a dark theme. The host's
    // `--foreground` carries a complete color value here, so `var()` resolves; the literal stays
    // only as the fallback for a host that defines no such token.
    it('resolves the attribute hover color against the host theme', () => {
      expect(scss).toMatch(rule(['.attribute:hover'], 'color: var(--foreground'));
      expect(scss).toMatch(rule(['.attribute-run:hover'], 'color: var(--foreground'));
    });

    // Blink implements only `auto | text | none | all`, so `contain` never did anything. The
    // containment it appeared to provide comes from the inert UnknownNode itself. Matches a
    // DECLARATION (trailing semicolon) so the comments explaining the omission don't trip it.
    it('does not declare the no-op user-select: contain', () => {
      expect(scss).not.toMatch(/user-select:\s*contain\s*;/);
    });
  });

  describe('chapter \\ca/\\cp attribute runs', () => {
    // A chapter's own `\ca`/`\cp` runs are nested INSIDE the chapter element, so they inherit
    // `.usfm_c`'s bold and compound against its 150% font-size. Without these three rules the runs
    // render bold at roughly 200%/225% of body text instead of matching their standalone
    // `char ca`/`cp` twins, and `\ca` stays on the chapter's line instead of dropping below it.
    it('keeps a nested \\ca run non-bold like its standalone twin', () => {
      expect(scss).toMatch(/\.formatted-font \.usfm_ca \{[^}]*font-style: italic;[^}]*\}/);
      // The anti-bold rides on a DOUBLED class so a later-injected project stylesheet's
      // identical-specificity `.formatted-font .usfm_ca { font-weight: bold }` (hbkeng.scss has
      // exactly this) cannot win the tie on source order.
      expect(scss).toMatch(
        /\.formatted-font \.usfm_ca\.usfm_ca \{[^}]*font-weight: normal;[^}]*\}/,
      );
    });

    it('uncompounds the nested run sizes against the chapter and drops \\ca to its own line', () => {
      expect(scss).toContain(
        '.formatted-font .usfm_c .usfm_ca {\n  display: block;\n  font-size: calc(133% / 1.5);\n}',
      );
      expect(scss).toContain(
        '.formatted-font .usfm_c .usfm_cp {\n  font-size: calc(150% / 1.5);\n}',
      );
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
      // The footnote half is the FLOOR, not an enumerated f/fe/ef/efe list: a custom.sty note
      // marker (`\zfn` → class "note usfm_zfn") matched neither family list and rendered an
      // invisible, unclickable caller — no counter, empty ::before. Everything that is not a
      // cross-reference increments `caller`.
      expect(scss).toMatch(
        /\.note:not\(\.usfm_x\):not\(\.usfm_ex\) \.immutable-note-caller\[data-caller='\+'\]/,
      );
      expect(scss).toMatch(/counter\(caller, note-callers\)/);
      // The generic rules the scoped versions replaced must not return — a re-synced copy that
      // re-adds them alongside the scoped ones would double-increment the footnote counter.
      expect(scss).not.toMatch(/^\.immutable-note-caller\[data-caller='\+'\] \{/m);
      expect(scss).not.toMatch(
        /^\.note\.collapsed \.immutable-note-caller\[data-caller='\+'\] > button::before/m,
      );
    });
  });

  describe('cross-copy drift pins (must agree with the demo copy in platform-bible-react)', () => {
    // The two vendored copies of the editor stylesheet (this one and
    // lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css) are pinned at
    // different upstream commits, and their suites used to assert DISJOINT rule sets — which is
    // how the RTL/bidi gutter fixes and the ::after outline landed in only one copy. The demo
    // suite carries the same three pins, so a fix landing in one copy fails the other's suite
    // until it is forwarded.
    it('isolates gutter marker text as LTR (RTL glyph-offset fix)', () => {
      expect(scss).toMatch(
        /\.psc-gutter-markers \.para > \.marker:not\(\.verse\):not\(\.chapter\):first-child,\s*\.psc-gutter-markers \.book > \.marker:first-child \{[^}]*unicode-bidi: isolate;/,
      );
    });
    it('renders the active-text outline via ::after, never ::before (book-code collision)', () => {
      expect(scss).toMatch(/\.psc-active-focus \.psc-active-text::after\s*\{/);
      expect(scss.replace(/\/\*[\s\S]*?\*\//g, '')).not.toMatch(
        /\.psc-active-focus \.psc-active-text::before/,
      );
    });
    it('does not override text-align in the RTL gutter rule (Chrome/Firefox bidi paint quirk)', () => {
      const rtlGutter = scss
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .match(/\.psc-gutter-markers\[dir='rtl'\] \.para[^{]*\{([^}]*)\}/);
      expect(rtlGutter).not.toBeNull();
      expect(rtlGutter?.[1]).not.toContain('text-align');
    });
  });
});
