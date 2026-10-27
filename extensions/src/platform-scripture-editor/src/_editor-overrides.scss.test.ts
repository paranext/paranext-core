import { readFileSync } from 'fs';
import { join } from 'path';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

const EDITOR_OVERRIDES_SCSS_PATH = join(__dirname, '_editor-overrides.scss');
const DEMO_EDITOR_OVERRIDES_CSS_PATH = join(
  __dirname,
  '../../../../lib/platform-bible-react/src/components/demo/scripture-editor/editor-overrides.css',
);

/** The top-level `::selection` rule (the unfocused selection), as sorted `prop: value` strings. */
function unfocusedSelectionDeclarations(stylesheetPath: string): string[] {
  const body = /(?:^|\n)::selection \{([^}]*)\}/.exec(readFileSync(stylesheetPath, 'utf8'))?.[1];
  if (body === undefined) throw new Error(`${stylesheetPath} has no top-level ::selection rule`);
  return postcss
    .parse(`a {${body}}`)
    .nodes.flatMap((rule) => (rule.type === 'rule' ? rule.nodes : []))
    .flatMap((node) => (node.type === 'decl' ? [`${node.prop}: ${node.value}`] : []))
    .sort();
}

/**
 * Pins the right-click context menu's viewport-capped, visibly-scrollable list — see the comment
 * above the rule in `_editor-overrides.scss` for why this cannot be dropped on a routine vendored
 * refresh. Modeled on `simple-mode.scss.test.ts`'s source-scan approach: the affordance is a CSS
 * rule with no React counterpart to exercise, so a text pin is what catches a refresh silently
 * reinstating the vendored file's fixed 200px cap and hidden scrollbar.
 */
describe('_editor-overrides.scss', () => {
  it('caps the context menu list to the viewport instead of a fixed 200px', () => {
    const scss = readFileSync(EDITOR_OVERRIDES_SCSS_PATH, 'utf8');

    expect(scss).toContain('.typeahead-popover.auto-embed-menu ul {');
    expect(scss).toContain('max-height: calc(100vh - 16px);');
  });

  it('shows a visible, thin scrollbar for the context menu list rather than the vendored hidden one', () => {
    const scss = readFileSync(EDITOR_OVERRIDES_SCSS_PATH, 'utf8');

    expect(scss).toContain('overflow-y: auto;');
    expect(scss).toContain('scrollbar-width: thin;');
  });

  it('keeps a wheel scroll at the end of the list from chaining to the ancestor and closing the menu', () => {
    const scss = readFileSync(EDITOR_OVERRIDES_SCSS_PATH, 'utf8');

    expect(scss).toContain('overscroll-behavior: contain;');
  });

  // In every built-in theme `--secondary` equals or nearly equals `--muted`, the Simple tint on
  // character markers with no visible style, so a selection there would vanish into it.
  it('keeps the unfocused selection off the character-marker tint and its look-alike', () => {
    const background = unfocusedSelectionDeclarations(EDITOR_OVERRIDES_SCSS_PATH).find(
      (declaration) => declaration.startsWith('background-color: '),
    );

    expect(background).toBeDefined();
    expect(background).not.toMatch(/var\(--(secondary|muted)\)/);
  });

  it('shows the unfocused selection in the Storybook demo editor as the app does', () => {
    expect(unfocusedSelectionDeclarations(DEMO_EDITOR_OVERRIDES_CSS_PATH)).toEqual(
      unfocusedSelectionDeclarations(EDITOR_OVERRIDES_SCSS_PATH),
    );
  });
});

describe('selected paragraph marker row', () => {
  // The editor marks the paragraph whose gutter marker is selected with `psc-para-marker-selected`.
  // Selection gets a channel of its own, as in adr-list-selection-on-a-dedicated-visual-channel,
  // never the active-text focus box. Unlike that ADR's comment cards, the row also takes a fill
  // (its background carries no status), and fill and bar reach across the gutter as box-shadows.
  // Which tokens the bar and glyph are painted in is pinned by
  // paragraph-marker-selection-contrast.test.ts, next to the contrast sweep over those tokens.

  /** The stylesheet with its comments removed, so prose that names a selector cannot match it. */
  const declarations = readFileSync(EDITOR_OVERRIDES_SCSS_PATH, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  /** The declarations of the rule with exactly this selector, or undefined if there is none. */
  const block = (selector: string) =>
    declarations.match(new RegExp(`(?:^|\\})\\s*${escape(selector)}\\s*\\{([^}]*)\\}`))?.[1];
  const SELECTED_ROW = '.psc-gutter-markers .para.psc-para-marker-selected';

  it('measures the reach in a gutter width registered as a length, not in the paragraph’s own font size', () => {
    // An unregistered `4em` resolves where it is used, so a `\mt1` (166%) would push the bar past
    // the editor's edge, where it is clipped, and an `\s1` (0.8rem) would stop it inside the gutter.
    expect(declarations).toMatch(
      /@property --psc-para-marker-gutter-width\s*\{[^}]*syntax:\s*'<length>'[^}]*inherits:\s*true[^}]*initial-value:/,
    );
    expect(block('.psc-gutter-markers')).toContain(
      '--psc-para-marker-gutter-width: var(--psc-gutter-width',
    );
    const reach = block(SELECTED_ROW)?.match(/--psc-para-marker-selection-reach:([^;]*);/)?.[1];
    expect(reach).toContain('var(--psc-para-marker-gutter-width)');
    expect(reach).not.toContain('var(--psc-gutter-width)');
  });

  it('fills the row and reaches the fill and bar toward the left in LTR', () => {
    const ltr = block(SELECTED_ROW);
    expect(ltr).toContain('background-color: var(--accent)');
    // Toward inline-start, which is the left in LTR.
    expect(ltr).toMatch(/box-shadow:\s*calc\(4px - var\(--psc-para-marker-selection-reach\)\)/);
  });

  it('mirrors the fill and bar to the right in RTL', () => {
    const rtl = block(".psc-gutter-markers[dir='rtl'] .para.psc-para-marker-selected");
    expect(rtl).toMatch(/box-shadow:\s*calc\(var\(--psc-para-marker-selection-reach\) - 4px\)/);
  });

  it('strengthens the selected glyph', () => {
    const glyph = block(`${SELECTED_ROW} > .marker:not(.verse):not(.chapter):first-child`);
    expect(glyph).toContain('font-weight: 700');
  });

  it('keeps the selected row visible in forced colors, which drop the box-shadow and fill', () => {
    const forcedColors = declarations.match(
      new RegExp(
        `@media \\(forced-colors: active\\)\\s*\\{\\s*${escape(SELECTED_ROW)}\\s*\\{([^}]*)\\}`,
      ),
    )?.[1];
    expect(forcedColors).toMatch(/outline:[^;]*\bHighlight\b/);
  });

  it('uses no pseudo-element, which the focus box and book code already own', () => {
    // Positive control first: the selector this sweep looks for is present at all.
    expect(declarations).toContain('.psc-para-marker-selected');
    expect(declarations).not.toMatch(/\.psc-para-marker-selected[^{,]*::?(?:before|after)/);
  });
});
