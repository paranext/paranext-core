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

Project data that a translator has explicitly entered. The **chapter** is the atomic unit of commitment: if any project data exists for a chapter in the PDP, the entire chapter is treated as committed and ghost content is suppressed for it. Ghost content only appears in chapters with no existing project data.

**Adoption:** When a translator first types into a ghost chapter, the ghost structure (paranodes, verse slot positions, heading slots) is promoted to become the initial real project data for that chapter. The translator then edits within that committed scaffold. Ghost content is never written to the PDP directly — adoption is the only path from ghost to committed.

## Model Text Panel

An existing separate, synchronized, read-only panel that displays the current chapter of the model text alongside the translation editor. Serves the **reading reference** role. Distinct from ghost content.
