import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { evaluateMenu, parseWhenExpression } from 'platform-bible-utils';

type MenuItem = {
  label: string;
  group: string;
  order: number;
  command?: string;
  iconNameBefore?: string;
  when?: string;
  enabledWhen?: string;
};
type Menu = {
  groups: Record<string, { order: number; isExperimental?: boolean }>;
  items: MenuItem[];
};

const menusJson = JSON.parse(readFileSync(join(__dirname, '../contributions/menus.json'), 'utf8'));
const { topMenu, contextMenu }: { topMenu: Menu; contextMenu: Menu } =
  menusJson.webViewMenus['platformScriptureEditor.react'];

const TEMPLATE_VARS = { webViewId: 'wv', projectId: 'p1' };
const HAS_SELECTION = 'platformScriptureEditor.contextMenu.hasSelection';
const IS_MAIN_EDITOR = 'platformScriptureEditor.contextMenu.isMainEditor';

/** Facts of an editable project's main editor with text selected. */
const ALL_FACTS_ON: Record<string, boolean> = {
  'platform.project.p1.isResource': false,
  'platform.project.p1.isEditable': true,
  'platformScripture.project.p1.canEditScripture': true,
  'platformScripture.project.p1.canCreateComments': true,
  'platformScriptureEditor.webView.wv.isReadOnly': false,
  'platformScriptureEditor.webView.wv.isPreview': false,
  'platformScriptureEditor.webView.wv.isSyncBlocked': false,
  [HAS_SELECTION]: true,
  [IS_MAIN_EDITOR]: true,
};

type EvaluatedItem = {
  command?: string;
  group: string;
  order: number;
  label?: string;
  iconNameBefore?: string;
  disabled?: boolean;
};

/** The evaluated context menu's items in display order (group order, then item order). */
function evaluate(
  overrides: Record<string, boolean> = {},
  absentKeys: string[] = [],
): EvaluatedItem[] {
  const facts = { ...ALL_FACTS_ON, ...overrides };
  absentKeys.forEach((key) => delete facts[key]);
  const evaluated: { groups: Record<string, { order: number }>; items: EvaluatedItem[] } =
    evaluateMenu(contextMenu, (key: string) => facts[key], TEMPLATE_VARS);
  return [...evaluated.items].sort(
    (a, b) =>
      evaluated.groups[a.group].order - evaluated.groups[b.group].order || a.order - b.order,
  );
}

const CUT = 'platformScriptureEditor.cutSelection';
const COPY = 'platformScriptureEditor.copySelection';
const PASTE = 'platformScriptureEditor.pasteAtSelection';
const PASTE_PLAIN = 'platformScriptureEditor.pasteAsPlainTextAtSelection';
const FIND = 'platformScripture.openFind';
const INSERT_COMMENT = 'platformScriptureEditor.insertCommentAtSelection';
const INSERT_FOOTNOTE = 'platformScriptureEditor.insertFootnoteAtSelection';
const INSERT_CROSS_REFERENCE = 'platformScriptureEditor.insertCrossReferenceAtSelection';
const INSERT_ENDNOTE = 'platformScriptureEditor.insertEndnoteAtSelection';
const INSERT_COMMANDS = [INSERT_COMMENT, INSERT_FOOTNOTE, INSERT_CROSS_REFERENCE, INSERT_ENDNOTE];
const NOTE_INSERT_COMMANDS = [INSERT_FOOTNOTE, INSERT_CROSS_REFERENCE, INSERT_ENDNOTE];

const commandsOf = (items: EvaluatedItem[]) => items.map((item) => item.command);
const isDisabled = (items: EvaluatedItem[], command: string) => {
  const matches = items.filter((item) => item.command === command);
  expect(matches).toHaveLength(1);
  return matches[0].disabled === true;
};

/** Each fact the clipboard items' editable condition reads, with the value that blocks editing. */
const EDITABLE_FACTS_BLOCKING: [string, boolean][] = [
  ['platform.project.p1.isEditable', false],
  ['platformScripture.project.p1.canEditScripture', false],
  ['platformScriptureEditor.webView.wv.isReadOnly', true],
  ['platformScriptureEditor.webView.wv.isPreview', true],
  ['platformScriptureEditor.webView.wv.isSyncBlocked', true],
];

describe('platform-scripture-editor context menu contribution', () => {
  it('enables Cut, Paste and Paste as plain text when every editable fact is permissive', () => {
    const items = evaluate();
    [CUT, PASTE, PASTE_PLAIN].forEach((command) => expect(isDisabled(items, command)).toBe(false));
  });

  it.each(EDITABLE_FACTS_BLOCKING)(
    'disables Cut, Paste and Paste as plain text on its own when %s is %s',
    (fact, blockingValue) => {
      const items = evaluate({ [fact]: blockingValue });
      [CUT, PASTE, PASTE_PLAIN].forEach((command) => expect(isDisabled(items, command)).toBe(true));
      // Copy and Find read without editing
      [COPY, FIND].forEach((command) => expect(isDisabled(items, command)).toBe(false));
    },
  );

  it('disables Cut and Copy when the selection key is absent, not just false', () => {
    const items = evaluate({}, [HAS_SELECTION]);
    expect(isDisabled(items, CUT)).toBe(true);
    expect(isDisabled(items, COPY)).toBe(true);
  });

  it('shows no Insert item when the main-editor key is absent, not just false', () => {
    const items = evaluate({}, [IS_MAIN_EDITOR]);
    expect(commandsOf(items)).toEqual([CUT, COPY, PASTE, PASTE_PLAIN, FIND]);
  });

  it('shows exactly one Copy, the project one without an icon, when the resource fact is unset', () => {
    const copies = evaluate({}, ['platform.project.p1.isResource']).filter(
      (item) => item.command === COPY,
    );
    expect(copies).toHaveLength(1);
    expect(copies[0].iconNameBefore).toBeUndefined();
  });

  it('shows every item in a project main editor with a selection, in order, all enabled', () => {
    const items = evaluate();
    expect(commandsOf(items)).toEqual([CUT, COPY, PASTE, PASTE_PLAIN, FIND, ...INSERT_COMMANDS]);
    items.forEach((item) => expect(item.disabled).toBeFalsy());
  });

  it('disables Cut and Copy while nothing is selected, and leaves the rest enabled', () => {
    const items = evaluate({ [HAS_SELECTION]: false });
    expect(isDisabled(items, CUT)).toBe(true);
    expect(isDisabled(items, COPY)).toBe(true);
    [PASTE, PASTE_PLAIN, FIND, ...INSERT_COMMANDS].forEach((command) =>
      expect(isDisabled(items, command)).toBe(false),
    );
  });

  it('shows exactly Copy (with the clipboard-copy icon) and Find on a resource', () => {
    const resourceFacts = { 'platform.project.p1.isResource': true };
    const items = evaluate(resourceFacts);
    expect(commandsOf(items)).toEqual([COPY, FIND]);
    expect(items[0]).toMatchObject({
      label: '%webView_platformScriptureEditor_copy%',
      iconNameBefore: 'clipboard-copy',
    });
    expect(items[0].disabled).toBeFalsy();
    expect(isDisabled(evaluate({ ...resourceFacts, [HAS_SELECTION]: false }), COPY)).toBe(true);
  });

  it('offers the project Copy without an icon', () => {
    const copy = evaluate().find((item) => item.command === COPY);
    expect(copy?.iconNameBefore).toBeUndefined();
  });

  it('shows no Insert item outside the main editor, such as in a footnote row editor', () => {
    const items = evaluate({ [IS_MAIN_EDITOR]: false });
    expect(commandsOf(items)).toEqual([CUT, COPY, PASTE, PASTE_PLAIN, FIND]);
  });

  it('disables Cut, both Pastes and the note Inserts in a read-only tab, but not Insert comment', () => {
    const items = evaluate({ 'platformScriptureEditor.webView.wv.isReadOnly': true });
    [CUT, PASTE, PASTE_PLAIN, ...NOTE_INSERT_COMMANDS].forEach((command) =>
      expect(isDisabled(items, command)).toBe(true),
    );
    [COPY, FIND, INSERT_COMMENT].forEach((command) =>
      expect(isDisabled(items, command)).toBe(false),
    );
  });

  it('keeps the items inside the declared groups, with unique orders within each group', () => {
    const seen = new Set<string>();
    contextMenu.items.forEach((item) => {
      expect(contextMenu.groups).toHaveProperty([item.group]);
      const key = `${item.group}#${item.order}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    });
  });

  it('declares every group experimental, none at the orders the platform defaults own, and no item experimental', () => {
    const groups = Object.values(contextMenu.groups);
    expect(groups.length).toBeGreaterThan(0);
    groups.forEach((group) => {
      expect(group.isExperimental).toBe(true);
      expect(group.order).toBeGreaterThanOrEqual(3);
    });
    contextMenu.items.forEach((item) => expect(item).not.toHaveProperty('isExperimental'));
  });

  it('parses every when-expression, request-scoped keys included', () => {
    const expressions = contextMenu.items.flatMap((item) =>
      [item.when, item.enabledWhen].filter((value): value is string => typeof value === 'string'),
    );
    expect(expressions.length).toBeGreaterThan(0);
    expressions.forEach((expression) =>
      expect(() => parseWhenExpression(expression)).not.toThrow(),
    );
  });
});

/**
 * Context-menu items without a top-menu twin of the same command, label key and icon. Every other
 * context item must match a top-menu item with the same command.
 *
 * - The resource Copy is labelled "Copy", as the request words it; the top menu's resource Copy says
 *   "Copy selection". It keeps the twin's icon.
 * - Paste as plain text is new and has no top-menu item.
 * - Find has three top-menu twins that differ by interface mode (Power's Edit flyout, Power's
 *   resource Edit section, Simple's Tools and resources); the context menu shows one Find in both
 *   modes, so matching any one twin's label and icon is enough.
 */
const RESOURCE_COPY_LABEL = '%webView_platformScriptureEditor_copy%';
const TWIN_EXCEPTIONS: Record<string, string> = {
  [`${COPY}|clipboard-copy|${RESOURCE_COPY_LABEL}`]:
    'resource Copy is labelled "Copy", not "Copy selection"',
  [`${PASTE_PLAIN}||%webView_platformScriptureEditor_pasteAsPlainText%`]:
    'new command, no top-menu twin',
};

describe('context menu items look like their top-menu twins', () => {
  const twinsOf = (command: string | undefined) =>
    topMenu.items.filter((item) => item.command === command);
  const exceptionKey = (item: MenuItem) =>
    `${item.command}|${item.iconNameBefore ?? ''}|${item.label}`;

  it.each(contextMenu.items.filter((item) => !(exceptionKey(item) in TWIN_EXCEPTIONS)))(
    '$command ($label) has the label key and icon of a top-menu twin',
    (item) => {
      expect(
        twinsOf(item.command).some(
          (twin) => twin.label === item.label && twin.iconNameBefore === item.iconNameBefore,
        ),
      ).toBe(true);
    },
  );

  it('lists only exceptions that exist in the context menu', () => {
    const present = contextMenu.items.map(exceptionKey);
    Object.keys(TWIN_EXCEPTIONS).forEach((key) => expect(present).toContain(key));
  });

  it('gives Paste as plain text no top-menu twin', () => {
    expect(twinsOf(PASTE_PLAIN)).toHaveLength(0);
  });

  it('labels the resource Copy "Copy" where its twin says "Copy selection", with the same icon', () => {
    const contextCopy = contextMenu.items.find(
      (item) => item.command === COPY && item.iconNameBefore === 'clipboard-copy',
    );
    const resourceTwin = twinsOf(COPY).find((item) => item.iconNameBefore === 'clipboard-copy');
    expect(contextCopy?.label).toBe('%webView_platformScriptureEditor_copy%');
    expect(resourceTwin?.label).toBe('%webView_platformScriptureEditor_copySelection%');
  });

  it('gives each Insert item the enabledWhen of its only twin and a when that adds the main-editor key', () => {
    INSERT_COMMANDS.forEach((command) => {
      const item = contextMenu.items.find((candidate) => candidate.command === command);
      const twins = twinsOf(command);
      expect(twins).toHaveLength(1);
      expect(item?.enabledWhen).toBe(twins[0].enabledWhen);
      expect(item?.when).toBe(`${twins[0].when} && ${IS_MAIN_EDITOR}`);
    });
  });

  it('gives the clipboard items exactly the editable condition of their top-menu twins', () => {
    const [topCut] = twinsOf(CUT);
    const [topPaste] = twinsOf(PASTE);
    const contextItem = (command: string) =>
      contextMenu.items.find((item) => item.command === command);
    expect(twinsOf(CUT)).toHaveLength(1);
    expect(twinsOf(PASTE)).toHaveLength(1);
    expect(topCut.enabledWhen).toBe(topPaste.enabledWhen);
    expect(contextItem(PASTE)?.enabledWhen).toBe(topPaste.enabledWhen);
    expect(contextItem(PASTE_PLAIN)?.enabledWhen).toBe(topPaste.enabledWhen);
    expect(contextItem(CUT)?.enabledWhen).toBe(`${topCut.enabledWhen} && ${HAS_SELECTION}`);
  });
});

/*
 * The Bible Texts, Commentaries and Model text panels are read-only: their right-click menu is Copy
 * and Find, and nothing else.
 */
const CAN_FIND = 'platformScriptureEditor.contextMenu.canFind';
const PANEL_WEB_VIEW_TYPES = [
  'platformScriptureEditor.bibleTexts',
  'platformScriptureEditor.commentaries',
  'platformScriptureEditor.modelText',
];

describe.each(PANEL_WEB_VIEW_TYPES)('%s context menu contribution', (webViewType) => {
  const panelMenu: Menu = menusJson.webViewMenus[webViewType].contextMenu;

  const evaluatePanel = (facts: Record<string, boolean>) => {
    const evaluated: { groups: Record<string, { order: number }>; items: EvaluatedItem[] } =
      evaluateMenu(panelMenu, (key: string) => facts[key], TEMPLATE_VARS);
    return [...evaluated.items].sort(
      (a, b) =>
        evaluated.groups[a.group].order - evaluated.groups[b.group].order || a.order - b.order,
    );
  };

  it('offers Copy then Find, with the editor menu icons and the same labels', () => {
    const items = evaluatePanel({ [HAS_SELECTION]: true, [CAN_FIND]: true });
    expect(commandsOf(items)).toEqual([COPY, FIND]);
    expect(items[0]).toMatchObject({
      label: '%webView_platformScriptureEditor_copy%',
      iconNameBefore: 'clipboard-copy',
    });
    expect(items[1]).toMatchObject({
      label: '%webView_platformScriptureEditor_openFind%',
      iconNameBefore: 'search',
    });
    items.forEach((item) => expect(item.disabled).toBeFalsy());
  });

  it.each([
    [true, false],
    [false, true],
    [undefined, true],
  ])('with the selection key %s Copy is disabled: %s', (hasSelection, isCopyDisabled) => {
    const facts: Record<string, boolean> = { [CAN_FIND]: true };
    if (hasSelection !== undefined) facts[HAS_SELECTION] = hasSelection;

    const items = evaluatePanel(facts);

    expect(isDisabled(items, COPY)).toBe(isCopyDisabled);
    // Find does not read the selection
    expect(isDisabled(items, FIND)).toBe(false);
  });

  it.each([
    [true, false],
    [false, true],
    [undefined, true],
  ])('with the can-find key %s Find is disabled: %s', (canFind, isFindDisabled) => {
    const facts: Record<string, boolean> = { [HAS_SELECTION]: true };
    if (canFind !== undefined) facts[CAN_FIND] = canFind;

    const items = evaluatePanel(facts);

    expect(isDisabled(items, FIND)).toBe(isFindDisabled);
    expect(isDisabled(items, COPY)).toBe(false);
  });

  it('declares both groups experimental at orders 3 and 4, and no item experimental', () => {
    expect(Object.values(panelMenu.groups)).toEqual([
      { order: 3, isExperimental: true },
      { order: 4, isExperimental: true },
    ]);
    panelMenu.items.forEach((item) => expect(item).not.toHaveProperty('isExperimental'));
  });

  it('serves no top menu of its own and leaves the platform defaults out', () => {
    expect(menusJson.webViewMenus[webViewType]).not.toHaveProperty('topMenu');
    expect(menusJson.webViewMenus[webViewType]).not.toHaveProperty('includeDefaults');
  });

  it('parses every when-expression', () => {
    panelMenu.items
      .flatMap((item) => [item.when, item.enabledWhen])
      .filter((value): value is string => typeof value === 'string')
      .forEach((expression) => expect(() => parseWhenExpression(expression)).not.toThrow());
  });
});
