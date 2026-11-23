import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { evaluateMenu } from 'platform-bible-utils';

type MenuItem = {
  label: string;
  group: string;
  order: number;
  command?: string;
  iconNameBefore?: string;
  isExperimental?: boolean;
};
type Menu = {
  groups: Record<string, { order: number; isExperimental?: boolean }>;
  items: MenuItem[];
};

const menusJson = JSON.parse(readFileSync(join(__dirname, '../contributions/menus.json'), 'utf8'));
const stringsJson = JSON.parse(
  readFileSync(join(__dirname, '../contributions/localizedStrings.json'), 'utf8'),
);
const { contextMenu }: { contextMenu: Menu } =
  menusJson.webViewMenus['platformEnhancedResources.enhancedResource'];

const COPY = 'platformEnhancedResources.copySelection';
const HAS_SELECTION = 'platformEnhancedResources.contextMenu.hasSelection';

type EvaluatedItem = { command?: string; disabled?: boolean };

/** The evaluated context menu's items, with the selection fact set as given (absent when omitted). */
function evaluate(hasSelection?: boolean): EvaluatedItem[] {
  const facts: Record<string, boolean> = {};
  if (hasSelection !== undefined) facts[HAS_SELECTION] = hasSelection;
  const evaluated: { items: EvaluatedItem[] } = evaluateMenu(
    contextMenu,
    (key: string) => facts[key],
    { webViewId: 'wv' },
  );
  return evaluated.items;
}

describe('platform-enhanced-resources context menu contribution', () => {
  it('has one Copy item in one experimental group at order 3', () => {
    expect(Object.keys(contextMenu.groups)).toEqual(['platformEnhancedResources.contextClipboard']);
    expect(contextMenu.groups['platformEnhancedResources.contextClipboard']).toEqual({
      order: 3,
      isExperimental: true,
    });
    expect(contextMenu.items).toHaveLength(1);
    expect(contextMenu.items[0]).toMatchObject({
      command: COPY,
      iconNameBefore: 'clipboard-copy',
      group: 'platformEnhancedResources.contextClipboard',
    });
  });

  it('marks no item experimental (an item carrying the flag rejects the whole menus.json)', () => {
    contextMenu.items.forEach((item) => expect(item).not.toHaveProperty('isExperimental'));
  });

  it.each([
    [true, false],
    [false, true],
    [undefined, true],
  ])('with the selection fact %s, Copy is disabled: %s', (hasSelection, isDisabled) => {
    const items = evaluate(hasSelection);
    const copyItems = items.filter((item) => item.command === COPY);
    expect(copyItems).toHaveLength(1);
    expect(copyItems[0].disabled === true).toBe(isDisabled);
  });

  it('has an English and a Spanish label for every context menu item', () => {
    expect(contextMenu.items.length).toBeGreaterThan(0);
    contextMenu.items.forEach(({ label }) => {
      expect(stringsJson.localizedStrings.en[label]).toBeTruthy();
      expect(stringsJson.localizedStrings.es[label]).toBeTruthy();
      expect(stringsJson.metadata[label]?.notes).toBeTruthy();
    });
  });

  it('labels Copy "Copy" in English and "Copiar" in Spanish', () => {
    const { label } = contextMenu.items[0];
    expect(stringsJson.localizedStrings.en[label]).toBe('Copy');
    expect(stringsJson.localizedStrings.es[label]).toBe('Copiar');
  });
});
