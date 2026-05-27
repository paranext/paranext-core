# Domain Glossary

## Model Text

A scripture resource (e.g. a DBL translation) used as a reference for a translation project. Stored as a `ResourceReferenceList` under `platformScripture.modelTexts`.

Has two distinct roles:
- **Reading reference** — the text the team reads while translating (currently served by the Model Text Panel)
- **Structural template** — the source of paragraph structure, headings, markers, and versification used to scaffold the translation editor

These roles may be served by the same resource or by different resources.

## Ghost Content

Structural scaffolding from the model text rendered **inside the translation editor** as fill-in-the-blank placeholders. Ghost content is display-only: it is not project data and has not been committed. When a translator enters content into a ghost slot, that content becomes project data and the ghost is replaced.

Ghost content shows **structure only** — translated text is stripped; structural elements remain. At minimum, block-level elements (**paranodes**) are preserved; some inline elements (**charnodes**) may be preserved (TBD). Heading text is stripped (it must be translated), but the heading slot position is preserved. The exact structure definition is decided separately and does not affect the ghost content architecture.

## Committed Content

Project data that a translator has explicitly entered. A chapter (or unit) moves from ghost to committed as the translator fills in content. Ghost content in chapters with no committed data can be freely swapped by switching the model text.

## Model Text Panel

An existing separate, synchronized, read-only panel that displays the current chapter of the model text alongside the translation editor. Serves the **reading reference** role. Distinct from ghost content.
