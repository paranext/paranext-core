import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

/**
 * Regression pin for the vendored editor stylesheet `usj-nodes.css`.
 *
 * `usj-nodes.css` is a MANUAL copy of the editor library's `packages/platform/src/usj-nodes.css`
 * (see the file header for the commit it was synced from). Nothing rebuilds it, so it drifts
 * silently every time the library's sheet moves — and because the Storybook demo exposes the
 * `markerMode` and `isFormattedFont` controls, a drifted copy renders a "Standard view" that does
 * not match what the shipping app renders with the same editor build.
 *
 * These pins cover the Standard-view surface (the marker glyphs, the marker validation states, the
 * editable verse token, the UnknownNode containers, the attribute runs, and the note-caller
 * counters) plus the two deliberate divergences from the source that the header records. The
 * matchers are whitespace-tolerant on purpose: a Prettier or Stylelint reformat must not fail a pin
 * for a reason that has nothing to do with what it guards.
 */
describe('usj-nodes.css vendored editor stylesheet', () => {
  // Read from disk rather than importing the stylesheet: a CSS import is transformed (and, under
  // the browser test project, served) instead of handed over as source text.
  const css = readFileSync(path.resolve(__dirname, 'usj-nodes.css'), 'utf8');
  /**
   * The stylesheet with its comments stripped. Negative pins run against this so the prose
   * explaining why something is absent cannot itself count as the thing being present.
   */
  const declarations = css.replace(/\/\*[\s\S]*?\*\//g, '');

  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  /** Selector text, with each space kept as a REQUIRED descendant combinator. */
  const selectorPattern = (value: string) => escape(value.trim()).replace(/\s+/g, '\\s+');
  /** Declaration text, with every space optional so formatting choices cannot fail a pin. */
  const declarationPattern = (value: string) => escape(value.trim()).replace(/\s+/g, '\\s*');

  /**
   * Builds a matcher for "this exact selector list carries this declaration", tolerant of
   * whitespace and of where the declaration sits within the block.
   */
  const rule = (selectors: string[], declaration: string) =>
    new RegExp(
      `${selectors.map(selectorPattern).join(',\\s*')}\\s*\\{[^}]*${declarationPattern(declaration)}[^}]*\\}`,
    );

  it('is the editor stylesheet and not an empty or wrong file', () => {
    expect(css).toMatch(/\.usfm\.formatted-font\s*\{/);
    expect(css.length).toBeGreaterThan(10000);
  });

  it('records the source commit it was synced from', () => {
    // The header is the only record of how far behind the copy is. A re-sync that updates the
    // rules but leaves the pin stale is exactly the drift this file cannot otherwise detect.
    expect(css).toMatch(/packages\/platform\/src\/usj-nodes\.css/);
    expect(css).toMatch(/commit\s+[0-9a-f]{40}/);
  });

  describe('Standard-view marker glyphs', () => {
    // Standard view renders marker glyphs as MarkerNode spans carrying marker-syntax classes
    // (opening/closing/selfClosing) — not `marker`, which MarkerNode dropped upstream in #359.
    // The PT9 look (small gray) targets those classes, scoped to `.formatted-font.marker-editable`
    // so the Unformatted view keeps full-size plain markers.
    const glyphSelectors = [
      '.formatted-font.marker-editable .opening',
      '.formatted-font.marker-editable .closing',
      '.formatted-font.marker-editable .selfClosing',
    ];

    it('grays the editable marker glyphs', () => {
      expect(css).toMatch(
        rule(
          [...glyphSelectors, '.formatted-font.marker-editable .marker'],
          'color: rgba(140, 140, 140, 1);',
        ),
      );
    });

    it('shrinks the editable marker glyphs to 0.7em, chapter tokens excluded', () => {
      expect(css).toMatch(
        rule(
          [...glyphSelectors, '.formatted-font.marker-editable .marker:not(.chapter)'],
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
      expect(css).toMatch(
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

    it('scopes the marker validation states to the editable marker modes', () => {
      expect(css).toMatch(
        rule(
          ['.marker-editable .status_unknown', '.formatted-font.marker-editable .status_unknown'],
          'color: rgba(204, 30, 20, 1);',
        ),
      );
      expect(css).toMatch(
        rule(
          ['.marker-editable .status_invalid', '.formatted-font.marker-editable .status_invalid'],
          'border-bottom: 1px solid rgba(204, 30, 20, 1);',
        ),
      );
      // The unscoped legacy rules the scoped ones replaced must not return: they paint the error
      // red in every view, including the non-editable ones PT9 leaves alone.
      expect(declarations).not.toMatch(/^\.status_unknown\s*[,{]/m);
      expect(declarations).not.toMatch(/^\.status_invalid\s*[,{]/m);
    });
  });

  describe('Standard-view verse token', () => {
    // In Standard view a verse is a VerseNode — editable text whose content is literally `\v 4 `,
    // so the caret rests INSIDE this span and the grey badge from `.formatted-font .verse` would
    // sit directly behind it. PT9's Standard view has no badge there; the formatted, non-editable
    // views keep theirs.
    it('drops the verse badge background in Standard view', () => {
      expect(css).toMatch(
        rule(['.formatted-font.marker-editable .verse'], 'background-color: transparent;'),
      );
    });

    // The marker's own text carries the USFM separator space in this mode, so the box spacing
    // `.text-spacing .verse` adds for the non-editable views would read as a second space that has
    // no caret position and no selection highlight.
    it('drops the verse token box spacing in Standard view', () => {
      expect(css).toMatch(rule(['.text-spacing.marker-editable .verse'], 'margin: 0;'));
      expect(css).toMatch(rule(['.text-spacing.marker-editable .verse'], 'padding: 0;'));
    });
  });

  describe('UnknownNode containers', () => {
    // Lossless carriers for content the editor does not model directly. Hidden in every view;
    // Standard view reveals them as a subdued read-only box so the content is visible and inert
    // instead of silently invisible.
    it('hides them by default and reveals them in Standard view', () => {
      expect(css).toMatch(rule(['.unknown-block', '.unknown-inline'], 'display: none;'));
      expect(css).toMatch(rule(['.marker-editable .unknown-block'], 'display: block;'));
      expect(css).toMatch(rule(['.marker-editable .unknown-inline'], 'display: inline;'));
    });

    // The editor JS renders an UnknownNode's own USFM bytes as REAL child text, so a
    // content-generating pseudo-element duplicates it: a bare `\fig` shows its marker twice and a
    // single `//` optbreak displays as `////` with a caret that cannot be placed inside it.
    it('does not synthesize marker/optbreak text via ::before', () => {
      expect(declarations).not.toMatch(/\.unknown-(?:block|inline)[^{]*::before/);
      expect(declarations).not.toMatch(/content:\s*['"]\/\/['"]/);
    });

    // Blink implements only `auto | text | none | all`, so `contain` never did anything. The
    // containment it appeared to provide comes from the inert UnknownNode itself. Matches a
    // DECLARATION (trailing semicolon) so the comments explaining the omission don't trip it.
    it('does not declare the no-op user-select: contain', () => {
      expect(declarations).not.toMatch(/user-select:\s*contain\s*;/);
    });
  });

  describe('attribute runs', () => {
    // AttributeRunNode is the ONE wrapper span holding a verse's \va/\vp display triplet, a
    // chapter's \ca/\cp triplet, or a milestone's attribute run — dim by default, since `color`
    // inherits down to the glyphs and value riding inside it.
    it('dims the attribute run at rest', () => {
      expect(css).toMatch(rule(['.attribute-run'], 'color: rgba(170, 170, 170, 1);'));
    });

    // A fixed near-black hover color is all but invisible against a dark theme. `--foreground`
    // carries a complete color value here, so `var()` resolves; the literal stays only as the
    // fallback for a host that defines no such token.
    it('resolves the hover color against the host theme', () => {
      expect(css).toMatch(rule(['.attribute:hover'], 'color: var(--foreground'));
      expect(css).toMatch(rule(['.attribute-run:hover'], 'color: var(--foreground'));
    });
  });

  describe('chapter \\ca/\\cp attribute runs', () => {
    // A chapter's own `\ca`/`\cp` runs are nested INSIDE the chapter element, so they inherit
    // `.usfm_c`'s bold and compound against its 150% font-size. PT9 nests neither run, so both
    // render against the base text (24 / 21.28 / 24px against a 16px base) and each occupies its
    // own line. Without these rules the runs render bold at roughly 200%/225% of body text instead
    // of matching their standalone `char ca`/`cp` twins, and both sit on the chapter's line.
    it('keeps a nested \\ca run non-bold like its standalone twin', () => {
      expect(css).toMatch(rule(['.formatted-font .usfm_ca'], 'font-weight: normal;'));
    });

    it('uncompounds the nested run sizes against the chapter and gives each its own line', () => {
      expect(css).toMatch(rule(['.formatted-font .usfm_c .usfm_ca.usfm_ca'], 'display: block;'));
      expect(css).toMatch(
        rule(['.formatted-font .usfm_c .usfm_ca.usfm_ca'], 'font-size: calc(133% / 1.5);'),
      );
      expect(css).toMatch(rule(['.formatted-font .usfm_c .usfm_cp.usfm_cp'], 'display: block;'));
      expect(css).toMatch(
        rule(['.formatted-font .usfm_c .usfm_cp.usfm_cp'], 'font-size: calc(150% / 1.5);'),
      );
    });

    // The doubling is what keeps the app's generated project stylesheet from re-compounding the
    // runs: it emits `.editor-input.usfm .usfm_ca` at (0,3,0) and is injected later, so a
    // single-class rule here would tie and lose.
    it('out-specifies a generated project stylesheet rule for the same run', () => {
      expect(declarations).not.toMatch(/\.usfm_c\s+\.usfm_ca\s*\{/);
      expect(declarations).not.toMatch(/\.usfm_c\s+\.usfm_cp\s*\{/);
    });
  });

  describe('note callers and \\fp', () => {
    // Cross-references count on their own sequence, so they don't consume footnote letters.
    it('gives cross-references their own caller counter', () => {
      expect(css).toMatch(/@counter-style\s+cross-ref-callers\s*\{/);
      expect(css).toMatch(/counter-reset:\s*caller\s+crossref;/);
      expect(css).toMatch(/counter\(crossref,\s*cross-ref-callers\)/);
      // The footnote half must stay pinned too — a re-sync dropping the scoped footnote rules
      // while keeping the crossref ones would leave nothing incrementing `caller`.
      expect(css).toMatch(
        /\.note\[data-note-kind='footnote'\]\s+\.immutable-note-caller\[data-caller='\+'\]/,
      );
      expect(css).toMatch(/counter\(caller,\s*note-callers\)/);
      // Which sequence a note uses follows the editor's stamp, not an enumeration of marker
      // classes here: the classification is a PREFIX rule (`f*`/`ef*` are footnotes, everything
      // else is a cross-reference), so an enumeration left every other note marker — a custom
      // `\zfn`, say — matching neither arm and showing no caller at all.
      expect(css).toMatch(
        /\.note\[data-note-kind='crossref'\]\s+\.immutable-note-caller\[data-caller='\+'\]/,
      );
      expect(declarations).not.toMatch(/^\.note\.usfm_f\s/m);
      // An editor build that predates the stamping still shows its callers.
      expect(css).toMatch(
        /\.note:not\(\[data-note-kind\]\)\s+\.immutable-note-caller\[data-caller='\+'\]/,
      );
      // The generic rules the scoped versions replaced must not return — a copy that re-adds them
      // alongside the scoped ones would double-increment the footnote counter.
      expect(declarations).not.toMatch(/^\.immutable-note-caller\[data-caller='\+'\]\s*\{/m);
      expect(declarations).not.toMatch(
        /^\.note\.collapsed\s+\.immutable-note-caller\[data-caller='\+'\]\s*>\s*button::before/m,
      );
    });

    // \fp displays like a paragraph start while the note stays ONE inline run in the data. The
    // generated line break keeps the span inline and stays out of the DOM, so the caret can never
    // land in it and serialization is untouched.
    it('breaks the line before an expanded note\u2019s \\fp without making it a block', () => {
      expect(css).toMatch(rule(['.note.expanded .usfm_fp::before'], "content: '\\A';"));
      expect(css).toMatch(rule(['.note.expanded .usfm_fp::before'], 'white-space: pre;'));
    });
  });

  describe('real-table box', () => {
    // PT9 boxes every table it renders (ScriptureBase.css `table`/`td`/`td.markercell`), and so
    // does the editor library. `th` is named alongside `td` because ImmutableTableCellNode emits a
    // real <th> for th* markers, which PT9's td-only rule predates.
    it('boxes header cells alongside body cells', () => {
      expect(css).toMatch(rule(['.usfm table'], 'border-collapse: collapse;'));
      expect(css).toMatch(
        rule(['.usfm td', '.usfm th'], 'border: 1px solid var(--foreground, #000000);'),
      );
      expect(css).toMatch(rule(['.usfm td', '.usfm th'], 'padding-right: 0.28em;'));
    });
  });

  describe('divergences from the source recorded in the header', () => {
    // This repo's `--muted-foreground` holds a COMPLETE color value (an oklch()), not the raw HSL
    // components that the source's `hsl(var(--muted-foreground, 215 16% 65%) / alpha)` wrapping
    // assumes — so re-syncing that form verbatim produces invalid declarations and the rules stop
    // rendering. Matches a DECLARATION so the comments explaining the divergence don't trip it.
    it('never wraps a custom property in hsl() in a live declaration', () => {
      expect(declarations).not.toMatch(/hsl\(\s*var\(--/);
    });

    it('draws the UnknownNode box with literal grays', () => {
      expect(css).toMatch(
        rule(['.marker-editable .unknown-block'], 'border: 1px dashed rgba(140, 140, 140, 0.5);'),
      );
      expect(css).toMatch(
        rule(['.marker-editable .unknown-block'], 'background-color: rgba(140, 140, 140, 0.08);'),
      );
      expect(css).toMatch(
        rule(['.marker-editable .unknown-inline'], 'color: rgba(140, 140, 140, 0.85);'),
      );
    });

    it('colors the empty-verse ellipsis with the token directly plus a hex fallback', () => {
      expect(css).toMatch(
        rule(
          ['.psc-gutter-markers .verse.psc-empty-text::after'],
          'color: var(--muted-foreground, #6b7280);',
        ),
      );
    });

    // The editor library ships the armed-verse styling with literal reds. Binding it to the live
    // `--destructive` token is what makes the two-step verse delete legible in both themes.
    it('binds the armed-verse styling to the theme token instead of literal reds', () => {
      expect(css).toMatch(rule(['.verse-selected'], 'color: var(--destructive);'));
      expect(css).toMatch(
        rule(
          ['.dark .verse-selected'],
          'background-color: color-mix(in oklab, var(--destructive) 20%, transparent);',
        ),
      );
      expect(css).toMatch(/@keyframes\s+verse-armed-glow\s*\{/);
      expect(css).toMatch(
        rule(
          ['.verse-delete-armed .verse-selected'],
          'animation: verse-armed-glow 1.06s steps(1) infinite;',
        ),
      );
    });
  });

  describe('cross-copy drift pins (must agree with the shipping copy in platform-scripture-editor)', () => {
    // The two vendored copies of the editor stylesheet (this one and
    // extensions/src/platform-scripture-editor/src/_usj-nodes.scss) are pinned at different
    // upstream commits, and nothing structural keeps their rule sets in agreement — with each
    // suite asserting only its own copy's rules, a fix (the RTL/bidi gutter isolation, the
    // ::after outline) can land in one copy and silently miss the other. The shipping suite
    // carries the same three pins, so a fix landing in one copy fails the other's suite until it
    // is forwarded.
    it('isolates gutter marker text as LTR (RTL glyph-offset fix)', () => {
      expect(css).toMatch(
        rule(
          [
            '.psc-gutter-markers .para > .marker:not(.verse):not(.chapter):first-child',
            '.psc-gutter-markers .book > .marker:first-child',
          ],
          'unicode-bidi: isolate;',
        ),
      );
    });
    it('renders the active-text outline via ::after, never ::before (book-code collision)', () => {
      expect(css).toMatch(/\.psc-active-focus \.psc-active-text::after\s*\{/);
      expect(declarations).not.toMatch(/\.psc-active-focus \.psc-active-text::before/);
    });
    it('does not override text-align in the RTL gutter rule (Chrome/Firefox bidi paint quirk)', () => {
      const rtlGutter = declarations.match(
        /\.psc-gutter-markers\[dir='rtl'\] \.para[^{]*\{([^}]*)\}/,
      );
      expect(rtlGutter).not.toBeNull();
      expect(rtlGutter?.[1]).not.toContain('text-align');
    });
  });
});
