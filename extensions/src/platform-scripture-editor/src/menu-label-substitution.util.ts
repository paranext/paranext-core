import type { Localized, MultiColumnMenu } from 'platform-bible-utils';

const PROJECT_NAME_PLACEHOLDER = '{projectName}';
const PROJECT_NAME_PLACEHOLDER_WITH_LEADING_SPACE = /\s*\{projectName\}/g;

type MenuItem = Localized<MultiColumnMenu>['items'][number];
type TextField = 'label' | 'tooltip' | 'searchTerms';
const TEXT_FIELDS: TextField[] = ['label', 'tooltip', 'searchTerms'];

/**
 * Replaces every `{projectName}` placeholder in a string. The name is inserted literally, so braces
 * or `$` sequences inside it are never re-interpreted. An empty name removes the placeholder along
 * with the whitespace before it.
 */
function fillProjectName(text: string, projectName: string): string {
  // Accepted deviation from `.claude/rules/code-quality/native-string-vs-grapheme-helpers.md`,
  // which allows native string methods only when the haystack is ASCII by construction. This
  // haystack is localized text, but the needle is a fixed ASCII token that translators copy as is,
  // and native `includes`, `split` and `replace` only ever look for that exact token and insert the
  // name verbatim. A grapheme-aware search would differ only if a combining mark were fused onto
  // the closing brace, and then the text no longer contains the token as written.
  if (!text.includes(PROJECT_NAME_PLACEHOLDER)) return text;
  if (projectName === '') return text.replace(PROJECT_NAME_PLACEHOLDER_WITH_LEADING_SPACE, '');
  return text.split(PROJECT_NAME_PLACEHOLDER).join(projectName);
}

function fillProjectNameInItem(item: MenuItem, projectName: string): MenuItem {
  const filledItem = { ...item };
  let changed = false;
  TEXT_FIELDS.forEach((field) => {
    const text = item[field];
    if (typeof text !== 'string') return;
    const filledText = fillProjectName(text, projectName);
    if (filledText === text) return;
    filledItem[field] = filledText;
    changed = true;
  });
  return changed ? filledItem : item;
}

/**
 * Fills the project name into menu text that contains the `{projectName}` placeholder (in `label`,
 * `tooltip` and `searchTerms`). Menus are localized once for everyone in the extension host, which
 * cannot know which project a given editor shows, so the editor fills the name in here. The
 * placeholder spelling is a contract with the contributing extension's localized strings (for
 * example the Sync item's "Sync {projectName}").
 *
 * @param menu Localized menu, or `undefined` when the web view has none
 * @param projectName Name of the project the editor shows; `''` when not known yet
 * @returns The same menu reference when no text contains the placeholder, otherwise a copy with the
 *   text filled in
 */
export function substituteProjectNameInMenu<T extends Localized<MultiColumnMenu> | undefined>(
  menu: T,
  projectName: string,
): T {
  if (!menu) return menu;
  let changed = false;
  const items = menu.items.map((item) => {
    const filledItem = fillProjectNameInItem(item, projectName);
    if (filledItem !== item) changed = true;
    return filledItem;
  });
  return changed ? { ...menu, items } : menu;
}
