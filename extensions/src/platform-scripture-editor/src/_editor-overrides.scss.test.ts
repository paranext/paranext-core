import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

const EDITOR_OVERRIDES_SCSS_PATH = join(__dirname, '_editor-overrides.scss');

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
});
