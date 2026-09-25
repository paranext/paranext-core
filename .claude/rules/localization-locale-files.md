---
paths:
  - 'assets/localization/**'
---

## Which Locale Files a New Core String Goes In

`assets/localization/` holds more files than are actively translated, and one of them is not a
locale file at all, so their presence is not a signal that a new key belongs in all of them.

- **`en.json` and `es.json`** — add every new core string to both, with a real Spanish translation
  (not an English copy). These are the two locales under ongoing translation.
- **`fr.json`, `zh-hans.json`, `zh-hant.json`** — these are not locales under ongoing translation.
  Each holds roughly 160 keys, and about 123 of them are `%Book.*%` book names; the rest are the
  ~36 first-run Setup Wizard strings, left from when the wizard offered these languages. Leave them
  alone unless you are working on book names or the wizard.
- **`km.json`** — book-name ids (`%LocalizedId.*%`) only, sharing no keys with `en.json`. A new UI
  string never belongs here.
- **`metadata.json`** — not a locale file. It carries per-key metadata: `fallbackKey` (the Paratext
  9 string to fall back to) and `deprecationInfo` (when a key was retired and what replaced it). A
  new key needs an entry here only if it has a Paratext 9 fallback or it replaces a key you are
  deprecating.

So "this key is missing from four locale files" is the expected state, not a gap to close.

Having a locale file does not make a language selectable. Users are offered only the languages in
`OFFERED_INTERFACE_LANGUAGES` (`src/shared/data/interface-languages.data.ts`), English and Spanish
as of 2026-09-25. Offering a newly translated language is an edit to that list; see
`adr-offered-interface-languages-allowlist`.

Place new keys in alphabetical order among their neighbours, and keep the file valid JSON — a
trailing-comma slip takes localization down for every string, not just the new one.
