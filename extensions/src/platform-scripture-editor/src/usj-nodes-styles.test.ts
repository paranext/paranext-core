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
      // The border color is theme-aware (var(--foreground, ...)) with PT9's literal black as the
      // no-theme fallback — a hard #000000 vanishes against a dark app theme.
      expect(scss).toMatch(
        /\.usfm td,\n\.usfm th \{[^}]*border: 1px solid var\(--foreground, #000000\);[^}]*padding-right: 0\.28em;[^}]*\}/,
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
    it('keys the caller counters on the editor-stamped data-note-kind (PT9 Standard.xslt classification)', () => {
      expect(scss).toMatch(/@counter-style cross-ref-callers/);
      expect(scss).toMatch(/counter-reset: caller crossref;/);
      // The editor stamps data-note-kind="footnote"/"crossref" on every .note per PT9's
      // Standard.xslt rule (marker starts with `f`/`ef` → footnote; EVERYTHING else — x, ex, and
      // custom note markers — crossref), so the counters key on the stamp instead of enumerating
      // marker classes here.
      expect(scss).toMatch(
        /\.note\[data-note-kind='footnote'\] \.immutable-note-caller\[data-caller='\+'\] \{\s*counter-increment: caller;\s*\}/,
      );
      expect(scss).toMatch(
        /\.note\.collapsed\[data-note-kind='footnote'\]\s+\.immutable-note-caller\[data-caller='\+'\]\s+> button::before \{\s*content: counter\(caller, note-callers\);\s*\}/,
      );
      expect(scss).toMatch(
        /\.note\[data-note-kind='crossref'\] \.immutable-note-caller\[data-caller='\+'\] \{\s*counter-increment: crossref;\s*\}/,
      );
      expect(scss).toMatch(
        /\.note\.collapsed\[data-note-kind='crossref'\]\s+\.immutable-note-caller\[data-caller='\+'\]\s+> button::before \{\s*content: counter\(crossref, cross-ref-callers\);\s*\}/,
      );
    });

    it('keeps transitional fallback rules for editor builds that predate the data-note-kind stamping', () => {
      // An unstamped .note (older editor build) falls back to the footnote sequence so its caller
      // stays visible (a counter and a non-empty ::before) instead of disappearing.
      expect(scss).toMatch(
        /\.note:not\(\[data-note-kind\]\) \.immutable-note-caller\[data-caller='\+'\] \{\s*counter-increment: caller;\s*\}/,
      );
      expect(scss).toMatch(
        /\.note\.collapsed:not\(\[data-note-kind\]\)\s+\.immutable-note-caller\[data-caller='\+'\]\s+> button::before \{\s*content: counter\(caller, note-callers\);\s*\}/,
      );
    });

    it('does not resurrect the retired marker-class or generic caller rules', () => {
      // The marker-class enumeration (`.usfm_x`/`.usfm_ex`) misclassified custom note markers —
      // PT9 gives every non-f/ef note style the cross-reference sequence — and must not return.
      expect(scss).not.toMatch(/\.note\.usfm_x \.immutable-note-caller/);
      expect(scss).not.toMatch(/\.note\.usfm_ex \.immutable-note-caller/);
      expect(scss).not.toMatch(/\.note:not\(\.usfm_x\)/);
      // Nor the fully generic rules the scoped versions replaced long ago — a re-synced copy that
      // re-adds them alongside the kind-keyed ones would double-increment the footnote counter.
      expect(scss).not.toMatch(/^\.immutable-note-caller\[data-caller='\+'\] \{/m);
      expect(scss).not.toMatch(
        /^\.note\.collapsed \.immutable-note-caller\[data-caller='\+'\] > button::before/m,
      );
    });
  });

  describe('cross-copy drift pins (must agree with the demo copy in platform-bible-react)', () => {
    // The two vendored copies of the editor stylesheet (this one and
    // lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css) are pinned at
    // different upstream commits, and nothing structural keeps their rule sets in agreement —
    // with each suite asserting only its own copy's rules, a fix (the RTL/bidi gutter isolation,
    // the ::after outline) can land in one copy and silently miss the other. The demo suite
    // carries the same three pins, so a fix landing in one copy fails the other's suite until it
    // is forwarded. The gutter indent-compensation block is covered structurally instead:
    // usj-nodes-scss-coverage.test.ts derives it from each copy's base rules and compares the two
    // copies' results, so no pin is needed for it here.
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
    describe('Simple-mode text sizes follow the project font size', () => {
      const code = scss.replace(/\/\*[\s\S]*?\*\//g, '');
      const gutterSection = code.slice(code.indexOf('@property --psc-base-font-size'));
      const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const ruleBody = (selectors: string[]) => {
        const match = new RegExp(
          `(?:^|\\}|;)\\s*${selectors.map(escapeRegExp).join(',\\s*')}\\s*\\{([^}]*)\\}`,
        ).exec(code);
        return match?.[1] ?? '';
      };

      it('registers --psc-base-font-size as an inherited length defaulting to 16px', () => {
        expect(code).toMatch(
          /@property --psc-base-font-size\s*\{[^}]*syntax:\s*'<length>'[^}]*inherits:\s*true[^}]*initial-value:\s*16px/,
        );
        expect(ruleBody(['.psc-gutter-markers'])).toContain('--psc-base-font-size: 1em;');
      });

      it('sizes Simple verse numbers and headings from the base size', () => {
        const verseSize = 'font-size: calc(var(--psc-base-font-size) * 13 / 16)';
        expect(
          ruleBody(['.psc-gutter-markers .usfm_v', '.psc-gutter-markers span.verse']),
        ).toContain(verseSize);
        expect(ruleBody(['.psc-gutter-markers .verse.marker::after'])).toContain(verseSize);
        expect(
          ruleBody([
            '.psc-gutter-markers .usfm_s',
            '.psc-gutter-markers .usfm_s1',
            '.psc-gutter-markers .usfm_s2',
            '.psc-gutter-markers .usfm_s3',
          ]),
        ).toContain('font-size: calc(var(--psc-base-font-size) * 0.8)');
        // The chapter numeral is decorative and deliberately stays a fixed size.
        expect(ruleBody(['.psc-gutter-markers .usfm_c::after'])).toContain('font-size: 5rem');
        expect(gutterSection).not.toContain('font-size: 13px');
        expect(gutterSection).not.toContain('font-size: 0.8rem');
      });
    });

    describe('empty-verse caret', () => {
      // The caret rules only show in layout, so what is pinned is that each load-bearing
      // declaration stays on exactly the selector list the editor renders for. A rule is matched
      // from its start, so a declaration in some other rule ending in the same selector can't pass.
      const rules = scss.replace(/\/\*[\s\S]*?\*\//g, '');
      const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const exactRule = (selectors: string[], declaration: string) =>
        new RegExp(
          `(?:^|\\}|;)\\s*${selectors.map(escapeRegExp).join(',\\s*')}\\s*\\{[^}]*${escapeRegExp(declaration)}`,
        );
      const activeVerse = '.psc-gutter-markers .verse:not(.marker).psc-empty-text-active';
      const host = `${activeVerse} + [data-caret-host]`;

      it('sizes the ellipsis box from one variable', () => {
        expect(rules).toContain(
          '--psc-empty-verse-ellipsis-width: calc(var(--psc-base-font-size) * 13 / 16);',
        );
        const box = [
          '.psc-gutter-markers .verse:not(.marker).psc-empty-text::after',
          `${activeVerse}::after`,
        ];
        expect(rules).toMatch(exactRule(box, 'display: inline-block;'));
        expect(rules).toMatch(
          exactRule(box, 'inline-size: var(--psc-empty-verse-ellipsis-width);'),
        );
      });

      it('draws the ellipsis for both empty-verse classes', () => {
        expect(rules).toMatch(
          exactRule(
            [
              '.psc-gutter-markers .psc-empty-text::after',
              '.psc-gutter-markers .psc-empty-text-active::after',
            ],
            "content: '…';",
          ),
        );
      });

      it("hides only the cursor's empty-verse ellipsis, keeping its box", () => {
        expect(rules).toMatch(exactRule([`${activeVerse}::after`], 'color: transparent;'));
        expect(rules).toMatch(exactRule([`${activeVerse}::after`], 'forced-color-adjust: none;'));
      });

      it('pulls the caret host back over the hidden ellipsis by the same width', () => {
        expect(rules).toMatch(
          exactRule(
            [host],
            'margin-inline-start: calc(-1 * var(--psc-empty-verse-ellipsis-width));',
          ),
        );
        expect(rules).toMatch(
          exactRule([host], 'margin-inline-end: var(--psc-empty-verse-ellipsis-width);'),
        );
      });

      it('keeps a caret host after any verse from adding a line break', () => {
        expect(rules).toMatch(exactRule(['.verse + [data-caret-host]'], 'text-wrap-mode: nowrap;'));
        expect(rules).toMatch(
          exactRule(['.verse + [data-caret-host]::after'], "content: '\\2060';"),
        );
      });

      it('isolates RTL verses so the caret host sits beside its own verse number', () => {
        // Without it, bidi reordering moves the host next to the following verse's digits, and
        // the host's negative margin pulls the caret back from there.
        expect(rules).toMatch(
          exactRule([".psc-gutter-markers[dir='rtl'] .verse"], 'direction: rtl;'),
        );
        expect(rules).toMatch(
          exactRule([".psc-gutter-markers[dir='rtl'] .verse"], 'unicode-bidi: isolate;'),
        );
        expect(rules).toMatch(
          exactRule([".psc-gutter-markers[dir='rtl'] .verse.marker"], 'direction: ltr;'),
        );
      });
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
