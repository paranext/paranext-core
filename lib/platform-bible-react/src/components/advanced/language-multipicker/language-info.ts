/**
 * Mock language metadata. Field names align with `LanguageInfo` from
 * `ui-language-selector.component` (`autonym`, `otherNames`). Real implementation should derive
 * from IETF/ISO + autonym datasets and handle thousands of languages efficiently — the current
 * in-memory table is a placeholder.
 *
 * This module is the temporary data source for `LanguageMultipicker`. When a system-wide
 * language metadata service exists, swap this out and have the picker consume it.
 */
export interface LanguageInfo {
  /** Canonical name in English / ISO. */
  name: string;
  /** 3-letter best-effort code. */
  code: string;
  /** What the language calls itself. */
  autonym: string;
  /** Alternate names searchable but not normally displayed. */
  otherNames?: string[];
}

const TABLE: LanguageInfo[] = [
  { name: 'English', code: 'eng', autonym: 'English' },
  { name: 'Spanish', code: 'spa', autonym: 'Español', otherNames: ['Castellano'] },
  { name: 'French', code: 'fra', autonym: 'Français' },
  { name: 'German', code: 'deu', autonym: 'Deutsch', otherNames: ['Deutsche'] },
  { name: 'Portuguese', code: 'por', autonym: 'Português' },
  { name: 'Hebrew', code: 'heb', autonym: 'עברית' },
  { name: 'Greek', code: 'grc', autonym: 'Ἑλληνικά', otherNames: ['Koine'] },
];

const byName = new Map(TABLE.map((l) => [l.name, l]));

export function getLanguage(name: string): LanguageInfo {
  return byName.get(name) ?? { name, code: name.slice(0, 3).toLowerCase(), autonym: name };
}

/** Search haystack — name, autonym, code, and otherNames — case-insensitive. */
export function languageMatchesQuery(name: string, query: string): boolean {
  const info = getLanguage(name);
  const q = query.toLowerCase();
  return (
    info.name.toLowerCase().includes(q) ||
    info.autonym.toLowerCase().includes(q) ||
    info.code.toLowerCase().includes(q) ||
    (info.otherNames?.some((n) => n.toLowerCase().includes(q)) ?? false)
  );
}
