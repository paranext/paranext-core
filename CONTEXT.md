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

Project data that a translator has entered that crosses the **meaningful content threshold** (see below). The **chapter** is the atomic unit of commitment.

**Per-chapter model text:** Once a chapter is committed, the global model text active at that moment is stamped onto the chapter as its model text. That stamp is what the chapter's ghost structure came from, and it persists even if the global model text is later changed.

**Before commitment:** A chapter with no meaningful content has no stamped model text. It displays ghost content derived from the current global model text. Changing the global model text immediately updates the ghost for all uncommitted chapters.

**Adoption:** When a chapter crosses the meaningful content threshold, its ghost structure (paranodes, verse slot positions, heading slots) is promoted to real project data, the current global model text is stamped onto the chapter, and subsequent edits are made within that committed scaffold.

## Meaningful Content Threshold

The point at which a chapter transitions from ghost to committed. Triggered by any non-whitespace text entry in a verse slot (Option A), but with a **grace period** before the PDP write actually occurs.

**Grace period (Undo Adoption):** When a translator first enters text into a ghost chapter, a countdown timer begins (initially 60 seconds — a magic number subject to tuning). The content exists in the editor's local state but is NOT yet written to the PDP. A dismissible notice lets the translator undo — discarding the local edits and reverting the chapter to ghost. If the timer expires without an undo, adoption completes: the ghost structure plus the translator's edits are written to the PDP and the chapter is committed.

This is the same mechanism as Gmail's "undo send": the default outcome is commitment; the user must act within the window to prevent it.

**Navigation during grace period:** If the translator navigates away before the timer expires, the countdown continues in the background. The undo notice persists in a global notification area and remains actionable until the timer expires. The chapter is committed (PDP write occurs) when the timer runs out, regardless of where the translator is.

**Multiple in-flight grace periods:** Multiple chapters can be in pending-adoption state simultaneously. Each has its own independent timer and undo notice. Typing in Genesis 2 before Genesis 1's timer expires does not affect Genesis 1's timer.

## Model Text Panel

An existing separate, synchronized, read-only panel that displays the current chapter of the model text alongside the translation editor. Serves the **reading reference** role. Distinct from ghost content.
