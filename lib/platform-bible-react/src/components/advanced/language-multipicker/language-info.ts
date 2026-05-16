/**
 * Placeholder language metadata for `LanguageMultipicker`.
 *
 * # Language codes
 *
 * The rest of platform-bible identifies languages via **BCP-47** tags (e.g. `en`, `es-419`,
 * `zh-Hant`) — that's the IETF standard the codebase already uses (see
 * `ui-language-selector.component.tsx`). Where a language has a 2-letter ISO 639-1 code, BCP-47
 * tags use it (`en`); where it doesn't, BCP-47 falls back to the 3-letter ISO 639-3 code (`grc`
 * for Koine Greek).
 *
 * The codes in this placeholder follow that same convention. When this component is wired to
 * the real platform-bible language source, it should accept whatever BCP-47 tag form the
 * source provides — this module is a *temporary local mock* meant only to feed the prototype
 * stories.
 *
 * # `LanguageInfo` shape
 *
 * Mirrors `LanguageInfo` from `ui-language-selector.component.tsx` (`autonym`, `otherNames`)
 * so the eventual system-wide language source can serve both components without translation.
 */
export interface LanguageInfo {
  /** Canonical English name. e.g. "German". */
  name: string;
  /**
   * Best-effort BCP-47 tag. Prefer 2-letter ISO 639-1 where available, fall back to 3-letter
   * ISO 639-3 where the language has no 639-1 code.
   */
  code: string;
  /** What the language calls itself, in its own script. e.g. "Deutsch". */
  autonym: string;
  /**
   * Alternative names the language is also known by. Searchable but not normally displayed —
   * users can search "Deutsche" or "Castellano" and find the right match.
   */
  otherNames?: string[];
}

const TABLE: LanguageInfo[] = [
  { name: 'English', code: 'en', autonym: 'English' },
  { name: 'Spanish', code: 'es', autonym: 'Español', otherNames: ['Castellano'] },
  { name: 'French', code: 'fr', autonym: 'Français' },
  { name: 'German', code: 'de', autonym: 'Deutsch', otherNames: ['Deutsche'] },
  { name: 'Portuguese', code: 'pt', autonym: 'Português' },
  { name: 'Hebrew', code: 'he', autonym: 'עברית' },
  { name: 'Greek', code: 'grc', autonym: 'Ἑλληνικά', otherNames: ['Koine'] },
];

const byName = new Map(TABLE.map((l) => [l.name, l]));

export function getLanguage(name: string): LanguageInfo {
  return byName.get(name) ?? { name, code: name.slice(0, 3).toLowerCase(), autonym: name };
}

/** Case-insensitive match across name, autonym, code, and otherNames. */
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
