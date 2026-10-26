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
