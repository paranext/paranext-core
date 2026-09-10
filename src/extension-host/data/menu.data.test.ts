import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';
import menuDataObject from './menu.data.json';

// Real shipped localization files drive these tests so a menu label that has no translation fails
// the build instead of reaching the user as literal %key% text.
// Note: using resolve(__dirname, ...) instead of fileURLToPath(new URL(..., import.meta.url))
// because this test runs under jsdom where import.meta.url does not have a file: scheme.
const localizationDir = resolve(__dirname, '../../../assets/localization');
const readLocalization = (file: string): Record<string, string> =>
  JSON.parse(readFileSync(resolve(localizationDir, file), 'utf8'));

const en = readLocalization('en.json');
const es = readLocalization('es.json');
const metadata: Record<string, { fallbackKey?: string; deprecationInfo?: unknown }> =
  readLocalization('metadata.json');

const COMMUNITY_SUPPORT_KEY = '%mainMenu_helpInfo_visitCommunitySupportPage%';
const RETIRED_FAQS_KEY = '%mainMenu_helpInfo_visitFAQsPage%';

describe('Help menu community support label', () => {
  test('resolves to "Community support" in English', () => {
    expect(en[COMMUNITY_SUPPORT_KEY]).toBe('Community support');
  });

  test('has a real Spanish translation, not an English placeholder', () => {
    expect(es[COMMUNITY_SUPPORT_KEY]).toBeTruthy();
    expect(es[COMMUNITY_SUPPORT_KEY]).not.toBe(en[COMMUNITY_SUPPORT_KEY]);
  });

  test('is the label the Help menu item actually carries', () => {
    const item = menuDataObject.mainMenu.items.find(
      (menuItem) => 'command' in menuItem && menuItem.command === 'platform.visitFAQsPage',
    );
    expect(item?.label).toBe(COMMUNITY_SUPPORT_KEY);
  });

  // The label and the destination are the two things that can drift apart in a rename: renaming
  // the command alongside the key would silently repoint the item.
  test('still targets the unchanged platform.visitFAQsPage command', () => {
    const item = menuDataObject.mainMenu.items.find(
      (menuItem) => menuItem.label === COMMUNITY_SUPPORT_KEY,
    );
    expect(item && 'command' in item && item.command).toBe('platform.visitFAQsPage');
  });
});

describe('The retired FAQs key stays resolvable', () => {
  // Localized string values are immutable once shipped, so the rename adds a key rather than
  // editing this one. Anything still holding the old key keeps working.
  test.each([
    ['en', en],
    ['es', es],
  ])('%s still carries the retired key', (_, locale) => {
    expect(locale[RETIRED_FAQS_KEY]).toBeTruthy();
  });

  test('is redirected at the new key and marked deprecated', () => {
    expect(metadata[RETIRED_FAQS_KEY]?.fallbackKey).toBe(COMMUNITY_SUPPORT_KEY);
    expect(metadata[RETIRED_FAQS_KEY]?.deprecationInfo).toBeDefined();
  });
});

describe('Every menu label and tooltip is localized', () => {
  const menus = [
    ['mainMenu', menuDataObject.mainMenu],
    ['defaultWebViewTopMenu', menuDataObject.defaultWebViewTopMenu],
    ['defaultWebViewContextMenu', menuDataObject.defaultWebViewContextMenu],
  ] as const;

  const localizeKeys = menus.flatMap(([menuName, menu]) =>
    menu.items.flatMap((item) =>
      [item.label, 'tooltip' in item ? item.tooltip : undefined]
        .filter((key): key is string => typeof key === 'string')
        .map((key) => [`${menuName}: ${key}`, key] as const),
    ),
  );

  test.each(localizeKeys)('%s resolves in English', (_, key) => {
    expect(en[key]).toBeTruthy();
  });

  test.each(localizeKeys)('%s resolves in Spanish', (_, key) => {
    expect(es[key]).toBeTruthy();
  });
});
