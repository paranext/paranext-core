import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';
import menuDataObject from './menu.data.json';

// Real shipped localization files drive these tests so a menu label that has no translation fails
// the build instead of reaching the user as literal %key% text.
// Note: using resolve(__dirname, ...) instead of fileURLToPath(new URL(..., import.meta.url))
// because this test runs under jsdom where import.meta.url does not have a file: scheme.
const localizationDir = resolve(__dirname, '../../../assets/localization');
// `metadata.json` maps each key to a redirect record rather than to a string, so the value shape is
// a parameter rather than baked into the reader.
const readLocalization = <T = Record<string, string>>(file: string): T =>
  JSON.parse(readFileSync(resolve(localizationDir, file), 'utf8'));

const en = readLocalization('en.json');
const es = readLocalization('es.json');
const metadata =
  readLocalization<Record<string, { fallbackKey?: string; deprecationInfo?: unknown }>>(
    'metadata.json',
  );

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

describe('The retired FAQs key redirects to the new one', () => {
  /**
   * Localized string values are immutable once shipped, so the relabel adds a key rather than
   * editing this one, and routes the retired key at the new one.
   *
   * The retired key's own values have to be gone for that redirect to do anything:
   * `getLocalizedString` returns `initialLanguageData[localizeKey]` and only consults `fallbackKey`
   * when that misses, so a retired key that keeps its value resolves to the old label forever and
   * the redirect is inert. Removing the values is what makes a consumer still holding the old key
   * render "Community support".
   */
  test.each([
    ['en', en],
    ['es', es],
  ])('%s no longer carries the retired key, so the redirect is reachable', (_, locale) => {
    expect(locale[RETIRED_FAQS_KEY]).toBeUndefined();
  });

  test('is redirected at the new key', () => {
    expect(metadata[RETIRED_FAQS_KEY]?.fallbackKey).toBe(COMMUNITY_SUPPORT_KEY);
  });

  // `deprecatedStringsByKey` warns on use of a deprecated key, but only when it carries this.
  test('is marked deprecated so its remaining consumers are logged', () => {
    expect(metadata[RETIRED_FAQS_KEY]?.deprecationInfo).toBeDefined();
  });

  test('redirects at a key that actually resolves in both shipped locales', () => {
    const { fallbackKey } = metadata[RETIRED_FAQS_KEY] ?? {};
    expect(fallbackKey && en[fallbackKey]).toBeTruthy();
    expect(fallbackKey && es[fallbackKey]).toBeTruthy();
  });
});

describe('Every menu label and tooltip is localized', () => {
  // `webViewMenus` carries no entries in the shipped document, so it contributes no keys; every
  // other section of menu.data.json is swept here.
  const menus = [
    ['mainMenu', menuDataObject.mainMenu],
    ['defaultWebViewTopMenu', menuDataObject.defaultWebViewTopMenu],
    ['defaultWebViewContextMenu', menuDataObject.defaultWebViewContextMenu],
    ['defaultWebViewTabMenu', menuDataObject.defaultWebViewTabMenu],
  ] as const;

  const itemKeys = menus.flatMap(([menuName, menu]) =>
    menu.items.flatMap((item) =>
      [item.label, 'tooltip' in item ? item.tooltip : undefined]
        .filter((key): key is string => typeof key === 'string')
        .map((key) => [`${menuName}: ${key}`, key] as const),
    ),
  );

  // Column labels are the menubar's own triggers — an unlocalized one shows a raw key across the
  // top of the app. `columns` also holds the `isExtensible` flag, which carries no label.
  const columnMenus = [
    ['mainMenu', menuDataObject.mainMenu],
    ['defaultWebViewTopMenu', menuDataObject.defaultWebViewTopMenu],
  ] as const;

  const columnKeys = columnMenus.flatMap(([menuName, menu]) =>
    Object.values(menu.columns)
      .filter((column) => typeof column === 'object' && 'label' in column)
      .map((column) => [`${menuName} column: ${column.label}`, column.label] as const),
  );

  const localizeKeys = [...itemKeys, ...columnKeys];

  test.each(localizeKeys)('%s resolves in English', (_, key) => {
    expect(en[key]).toBeTruthy();
  });

  // Column labels are excluded from the translated-language sweep: the Platform.Bible column is
  // labelled with the product name, which ships English-only in every locale by design. Menu items
  // carry no such exemption, so they are all expected to be translated.
  test.each(itemKeys)('%s resolves in Spanish', (_, key) => {
    expect(es[key]).toBeTruthy();
  });
});
