---
paths:
  - 'assets/localization/**'
---

## Which Locale Files a New Core String Goes In

`assets/localization/` holds more locale files than are actively translated, so their presence is
not a signal that a new key belongs in all of them.

- **`en.json` and `es.json`** — add every new core string to both, with a real Spanish translation
  (not an English copy).
- **`fr.json`, `zh-hans.json`, `zh-hant.json`** — these carry the first-run Setup Wizard strings so
  its language-selection demo can visibly change as the user picks a language. They are **not**
  locales under ongoing translation; leave them alone unless you are working on the wizard.
- **`km.json`** — unrelated to the above: book-name ids (`%LocalizedId.*%`) only, sharing no keys
  with `en.json`. A new UI string never belongs here.

So "this key is missing from four locale files" is the expected state, not a gap to close.

Place new keys in alphabetical order among their neighbours, and keep the file valid JSON — a
trailing-comma slip takes localization down for every string, not just the new one.
