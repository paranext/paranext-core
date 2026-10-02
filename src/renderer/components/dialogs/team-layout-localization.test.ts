import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS,
  TEAM_LAYOUT_DIALOG_STRING_KEYS,
} from './team-layout.component';

// Resolved from this file's location rather than `process.cwd()` so the test is not sensitive to
// the directory `vitest` happens to be invoked from.
const LOCALIZATION_DIR = resolve(__dirname, '../../../../assets/localization');

function localizationPath(fileName: string) {
  return resolve(LOCALIZATION_DIR, fileName);
}

function readStrings(fileName: string): { [key: string]: unknown } {
  return JSON.parse(readFileSync(localizationPath(fileName), 'utf8'));
}

/**
 * Keys whose value is missing, empty, or the key itself. The localization service returns the key
 * when a translation is missing, so such a key renders as literal `%key%` text.
 */
function findUnusableKeys(strings: { [key: string]: unknown }, keys: readonly string[]) {
  return keys.filter((key) => {
    const value = strings[key];
    return typeof value !== 'string' || value.length === 0 || value === key;
  });
}

const english = readStrings('en.json');
const spanish = readStrings('es.json');
// JSON.parse returns `any`, which assigns to the known shape of the metadata file without a type
// assertion
const metadata: { [key: string]: { deprecationInfo?: { date: string; message: string } } } =
  JSON.parse(readFileSync(localizationPath('metadata.json'), 'utf8'));

describe('Team layout dialog localization keys', () => {
  it('has a non-empty English translation for every key the dialog can request', () => {
    const missingOrInvalidKeys = findUnusableKeys(english, TEAM_LAYOUT_DIALOG_STRING_KEYS);

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following team layout dialog localization key(s) have no valid entry in ` +
          `${localizationPath('en.json')}: ${missingOrInvalidKeys.join(', ')}. The localization ` +
          `service falls back to returning the key itself when a translation is missing, so any ` +
          `key listed here will render as literal "%key%" text in the dialog instead of an ` +
          `English label.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });

  // en and es are the two languages maintained in this repo (Localization-Guide.md, "Always provide
  // both en AND es"); the remaining shipped locales carry none of this dialog's keys and are
  // translated elsewhere. Nothing in the build enforces en/es parity, so this is the guard.
  it('has a non-empty Spanish translation for every key the dialog can request', () => {
    const missingOrInvalidKeys = findUnusableKeys(spanish, TEAM_LAYOUT_DIALOG_STRING_KEYS);

    if (missingOrInvalidKeys.length > 0)
      throw new Error(
        `The following team layout dialog localization key(s) have no valid entry in ` +
          `${localizationPath('es.json')}: ${missingOrInvalidKeys.join(', ')}. Add the Spanish ` +
          `translation alongside the English one — en and es are both maintained in this repo.`,
      );

    expect(missingOrInvalidKeys).toHaveLength(0);
  });

  it('names the dialog for the thing being edited rather than the act of sharing it', () => {
    expect(english['%shareLayoutDialog_teamLayout_title%']).toBe('Team layout');
  });

  // The strings this dialog replaces shipped in v0.6.0-alpha.0.rc.0 and are immutable: a downstream
  // consumer or a translator working from an exported catalog still holds them, and the replacement
  // wording means something different, so the old keys keep their old values and the dialog reads
  // from new ones instead (Localization-Guide.md, "Existing Strings Are Immutable").
  it('leaves the superseded keys untouched rather than redefining them', () => {
    expect(english['%shareLayoutDialog_title%']).toBe('Share layout with team');
    expect(english['%shareLayoutDialog_description%']).toBe(
      "Review what you're about to share with your team before confirming.",
    );
  });

  // The column holds a Base or Model text, so its label says so. The old key shipped and means
  // something narrower, so it keeps its values and is retired instead.
  it('labels the left column as a Base or Model text, retiring the model-text-only label', () => {
    expect(TEAM_LAYOUT_DIALOG_STRING_KEYS).toContain('%shareLayoutDialog_baseOrModelText_label%');
    expect(TEAM_LAYOUT_DIALOG_STRING_KEYS).not.toContain('%shareLayoutDialog_modelText_label%');
    expect(english['%shareLayoutDialog_baseOrModelText_label%']).toBe('Base or Model text');
    expect(english['%shareLayoutDialog_modelText_label%']).toBe('Model text');
    expect(spanish['%shareLayoutDialog_modelText_label%']).toBe('Texto modelo');
    expect(metadata['%shareLayoutDialog_modelText_label%']?.deprecationInfo).toBeDefined();
  });

  // The resource tabs and the default-tab select happen to read alike, so one key could serve both
  // — until a translator rewords the select and silently reletters two tab headers with it.
  it('gives the resource tabs their own keys rather than the default-tab select keys', () => {
    const tabKeys = [
      '%shareLayoutDialog_tab_scriptureResources%',
      '%shareLayoutDialog_tab_commentaryResources%',
    ];
    const selectKeys = [
      '%shareLayoutDialog_activeTab_scriptureResource%',
      '%shareLayoutDialog_activeTab_commentaryResource%',
    ];

    expect(findUnusableKeys(english, tabKeys)).toHaveLength(0);
    expect(findUnusableKeys(spanish, tabKeys)).toHaveLength(0);
    tabKeys.forEach((key) => expect(TEAM_LAYOUT_DIALOG_STRING_KEYS).toContain(key));
    selectKeys.forEach((key) => expect(TEAM_LAYOUT_DIALOG_STRING_KEYS).toContain(key));
    // The assertion the test is named for. Membership alone is a tautology over an `as const`
    // array, and passes just as happily if `tabLabelKey` is reverted to reuse the select's keys —
    // which is the exact regression described above.
    expect(new Set([...tabKeys, ...selectKeys]).size).toBe(4);
  });
});

/**
 * The dialog's two resource tabs restate the resource panel's real tab titles, which live in the
 * `platform-scripture-editor` extension. `src/renderer` cannot import across the extension
 * boundary, so the file is parsed the same way `web-view.model.test.ts` parses its counterpart.
 */
const EXTENSION_STRINGS: {
  metadata?: { [key: string]: { deprecationInfo?: unknown } };
  localizedStrings: { [locale: string]: { [key: string]: string } };
} = JSON.parse(
  readFileSync(
    resolve(
      __dirname,
      '../../../../extensions/src/platform-scripture-editor/contributions/localizedStrings.json',
    ),
    'utf8',
  ),
);

describe('Team layout dialog tab labels', () => {
  // PT-4216 records this dialog's implicit coupling to the real tab titles, and PT-4550 changes
  // their formatting. Nothing links the two sides at runtime — the dialog hand-copies the values —
  // so this test is what turns a silent drift into a failing build.
  it.each([
    ['%shareLayoutDialog_tab_scriptureResources%', '%webView_resourcePanel_bibleTexts_title%'],
    ['%shareLayoutDialog_tab_commentaryResources%', '%webView_resourcePanel_commentaries_title%'],
    ['%shareLayoutDialog_activeTab_scriptureResource%', '%webView_resourcePanel_bibleTexts_title%'],
    [
      '%shareLayoutDialog_activeTab_commentaryResource%',
      '%webView_resourcePanel_commentaries_title%',
    ],
  ])('keeps %s in step with the resource panel title it restates', (dialogKey, panelKey) => {
    expect(english[dialogKey]).toBe(EXTENSION_STRINGS.localizedStrings.en[panelKey]);
    expect(spanish[dialogKey]).toBe(EXTENSION_STRINGS.localizedStrings.es[panelKey]);
  });
});

describe('Team layout dialog Base/Model explanation', () => {
  const panelEnglish = EXTENSION_STRINGS.localizedStrings.en;
  const panelSpanish = EXTENSION_STRINGS.localizedStrings.es;

  // The dialog reads the Model Text panel's own explanation strings rather than copies of them, so
  // users are never given two accounts of what a Base or Model text is. Those strings live in the
  // extension, not in en.json — which is why the key list is checked against the extension's file.
  it.each([...BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS])(
    '%s is defined by the Model Text panel in English and Spanish',
    (key) => {
      expect(panelEnglish[key]).toEqual(expect.stringMatching(/\S/));
      expect(panelSpanish[key]).toEqual(expect.stringMatching(/\S/));
      expect(english[key]).toBeUndefined();
    },
  );

  // A paragraph added to the panel's explanation must reach the dialog too, and a retired one must
  // leave it. Everything under the panel's `_baseOrModel_` prefix is explanation except the empty
  // state's own prompt; retired keys keep their values in the file but carry a deprecation notice.
  it("requests exactly the live paragraphs of the panel's explanation", () => {
    const livePanelParagraphKeys = Object.keys(panelEnglish).filter(
      (key) =>
        key.startsWith('%webView_modelTextPanel_emptyState_baseOrModel_') &&
        key !== '%webView_modelTextPanel_emptyState_baseOrModel_prompt%' &&
        !EXTENSION_STRINGS.metadata?.[key]?.deprecationInfo,
    );
    const requestedParagraphKeys = BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS.filter((key) =>
      key.startsWith('%webView_modelTextPanel_emptyState_baseOrModel_'),
    );

    expect(livePanelParagraphKeys.length).toBeGreaterThan(0);
    expect([...requestedParagraphKeys].sort()).toEqual(livePanelParagraphKeys.sort());
  });

  // The one deliberate difference between the two surfaces: the dialog drops the empty state's
  // opening "No Base or Model text selected." because the dialog is not an empty state. The prompt
  // must be exactly that one sentence followed by the dialog's summary.
  it.each([
    ['en', english, panelEnglish],
    ['es', spanish, panelSpanish],
  ])('summarizes with the %s empty-state prompt minus its first sentence', (_, dialog, panel) => {
    const summary = dialog['%shareLayoutDialog_baseOrModelText_summary%'];
    const prompt = panel['%webView_modelTextPanel_emptyState_baseOrModel_prompt%'];

    const firstSentenceEnd = prompt.indexOf('. ') + 1;

    expect(firstSentenceEnd).toBeGreaterThan(0);
    expect(prompt.slice(firstSentenceEnd + 1)).toBe(summary);
  });
});
