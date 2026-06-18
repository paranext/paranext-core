# Paratext 9 - Biblical Terms

**Category**: 04  
**Focus**: Key term consistency and rendering management  
**User Roles**: Translators, Consultants, Reviewers  
**Manual Chapters**: 7 (Proper Names), 9 (Glossary), 10 (Biblical Terms), 22 (Reports)  
**Last Updated**: 2026-01-21

---

## Overview

Biblical Terms features ensure consistent translation of key theological and biblical concepts throughout a translation. The Biblical Terms tool provides lists of important terms mapped to their occurrences in source texts, allowing translators to track how they've rendered each term and ensure consistency.

---

## Feature List

### 4.1 Biblical Terms Tool

**Description**: The primary tool for tracking and ensuring consistent translation of key biblical concepts. Links source language terms to their occurrences and shows how they've been rendered in the translation.

**Sub-Features**:
- View all biblical terms in a list
- Filter by term status (rendered, missing, guessed)
- Navigate to term occurrences
- See all verses where term occurs
- Compare renderings across verses
- View term definitions and glosses
- Link to source language lexicons

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Biblical Terms`; Handler: `biblicalTermsMenuItem_Click`; File: `ParatextWindowWithMenus.cs`, line 394 | `[MS]` |
| Form Relationships | `BiblicalTermsForm` opens: `GuessRenderingsForm` (874), `TermDefineFilterForm` (1733), `EditScrTextForm` (998) | `[FR]` |
| Requirements | Section: "Quality Checking/Validation > Rendering of Key, Biblical Terms" | `[R]` |
| Manual | `chapters/10_biblical_terms.md`, line 42: "**≡ Tab**, under **Tools** > **Biblical terms rendering**" | `[M]` |
| HelpData | Keyword: `ComponentBiblicalTermsTool`; Dialog: `BiblicalTermsForm`; 26 items | `[H]` |

**Key Quote** (from Requirements):
> "Paratext has large lists of key terms already built in along with a mapping of those terms to where they occur in the original source text"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `biblicalTermsMenuItem_Click` at line 394 |
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | HelpData dialog | `BiblicalTermsForm`, line 57 |
| 1 | `BiblicalTerms/Internal/BiblicalTermsGridControlLogic.cs` | Import in D0 | Line 31: `using BiblicalTerms.Internal` |
| 1 | `ParatextData/Terms/BiblicalTerms.cs` | Import in D0 | Line 33: `using Paratext.Data.Terms` |
| 1 | `ParatextData/Terms/BiblicalTermsList.cs` | Field in D0 | Line 67: `BiblicalTermsList _termsList` |
| 1 | `ParatextData/Terms/BiblicalTermsInfo.cs` | Field in D0 | Line 68: `BiblicalTermsInfo _termsInfo` |
| 2 | `ParatextData/Terms/Filters/BiblicalTermsFilter.cs` | Import in D1 | BiblicalTermsList.cs line 19: `using Paratext.Data.Terms.Filters` |
| 2 | `CorePluginInterfaces/IBiblicalTermsWindow.cs` | Interface in D0 | Line 12: `IBiblicalTermsWindow` |

**Dialog Navigation**:
- `BiblicalTermsForm` → `GuessRenderingsForm` (line 874)
- `BiblicalTermsForm` → `TermDefineFilterForm` (line 1733)
- `BiblicalTermsForm` → `EditScrTextForm` (line 998)
- `BiblicalTermsForm` → `ReattachNoteForm` (line 1149)
- `BiblicalTermsForm` → `ScrTextListSelectionForm` (line 2019)

**UI Entry Points**:
- Tools > Biblical Terms (Ctrl+Shift+B)
  - Menu Structure: `ParatextWindowWithMenus`, handler `biblicalTermsMenuItem_Click`, line 394
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Tools > Biblical Terms Renderings
  - Menu Structure: `ParatextWindowWithMenus`, handler `OpenRenderingsToolStripMenuItem_Click`, line 733
  - Manual: `chapters/10_biblical_terms.md`, line 42
  - Quote: "**≡ Tab**, under **Tools** > **Biblical terms rendering**"
  - HelpData ID: `32b4039d-2fa4-469a-ad09-691f944cac43`
  - Dialog: `BiblicalTermsForm`
  - Question: "Overview to the Biblical Terms tool"

**HelpData Items**:
- ID: `52e2374a-a457-4159-a078-0eafd2ab58ed` - "How do I correct an error in my project while in the Biblical Terms tool?"
- ID: `8a80c73f-0068-488d-99ca-114aaf46d024` - "Why do some terms appear to be missing in the Biblical Terms tool?"
- ID: `94fa4660-676d-473f-8ff6-673e45d6d0eb` - "Introduction to the Biblical Terms tool"
- Dialog: `BiblicalTermsForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 4.2 Term Renderings

**Description**: Store and manage approved renderings (translations) of biblical terms. Multiple renderings can be approved for different contexts.

**Sub-Features**:
- Add rendering for a term
- Mark rendering as approved
- Deny incorrect renderings
- Multiple renderings per term
- Context-specific renderings
- Edit renderings

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Biblical Terms Renderings`; Handler: `OpenRenderingsToolStripMenuItem_Click`; File: `ParatextWindowWithMenus.cs`, line 733 | `[MS]` |
| Menu Structure | Menu: `Edit > Edit renderings`; Handler: `editRenderingsToolStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 749 | `[MS]` |
| Form Relationships | `EditRenderingsForm` opens: `TermRenderingsDifferencesForm` (line 291) | `[FR]` |
| Requirements | Section: "Quality Checking/Validation" | `[R]` |
| Manual | `chapters/10_biblical_terms.md`, line 62: "Double-click in the renderings cell" | `[M]` |
| HelpData | Keyword: `ComponentBiblicalTermsRenderings`; Dialog: `EditRenderingsForm_tabTerm`; 24 items | `[H]` |

**Key Quote** (from Requirements):
> "It is an important exercise for the translation team to review how those terms are being translated in different parts of the translated text"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `OpenRenderingsToolStripMenuItem_Click` at line 733 |
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `editRenderingsToolStripMenuItem_Click` at line 749 |
| 0 | `BiblicalTerms/Internal/EditRenderingsForm.cs` | Form Relationships | `EditRenderingsForm`, line 34 |
| 1 | `ParatextData/Terms/BiblicalTerms.cs` | Import in D0 | Line 28: `using Paratext.Data.Terms` |
| 1 | `ParatextInternalShared/Terms/BiblicalTermsHTMLBuilder.cs` | Import in D0 | Line 29: `using ParatextInternalShared.Terms` |
| 2 | `BiblicalTerms/Internal/RenderingDifferences/TermRenderingsDifferencesForm.cs` | Opens dialog in D0 | EditRenderingsForm.cs line 291 |

**Dialog Navigation**:
- `BiblicalTermsForm` → `EditRenderingsForm` (via menu Edit > Edit renderings)
- `EditRenderingsForm` → `TermRenderingsDifferencesForm` (line 291)

**UI Entry Points**:
- Tools > Biblical Terms Renderings
  - Menu Structure: `ParatextWindowWithMenus`, handler `OpenRenderingsToolStripMenuItem_Click`, line 733
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Edit > Edit renderings (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `editRenderingsToolStripMenuItem_Click`, line 749
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Edit > Add rendering (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `addRenderingToolStripMenuItem_Click`, line 761
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Biblical Terms window > Double-click rendering cell
  - Manual: `chapters/10_biblical_terms.md`, line 62
  - Quote: "Double-click in the renderings cell of the Biblical Terms rendering window"
  - HelpData ID: `d1c8f5bc-d0a1-47fd-867d-c0cc09261e73`
  - Dialog: `EditRenderingsForm_tabTerm`
  - Question: "How do I add, edit, or approve renderings for Biblical Terms?"
- Ctrl+V to paste rendering
  - Manual: `chapters/10_biblical_terms.md`, line 66
  - Quote: "Paste (**Ctrl**+**V**) the rendering in the dialog box"

**HelpData Items**:
- ID: `d1c8f5bc-d0a1-47fd-867d-c0cc09261e73` - "How do I add, edit, or approve renderings for Biblical Terms?"
- ID: `eaea029f-8403-4dd9-9360-7f9f3d986b30` - "What is the Biblical Terms Renderings tool?"
- ID: `0437d0d3-db4d-4c62-b5c1-c3f26ac9eb03` - "How do I open the Biblical Terms Renderings tool for a project?"
- Dialogs: `EditRenderingsForm_tabTerm`, `EditRenderingsForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 4.3 Guessed Renderings

**Description**: Paratext automatically suggests possible renderings based on existing text, reducing manual entry work.

**Sub-Features**:
- Automatic rendering detection
- Confidence indicators
- Accept/reject guessed renderings
- Bulk approval of guesses
- Pattern-based guessing

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Guess renderings`; Handler: `guessRenderingsToolStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 868 | `[MS]` |
| Menu Structure | Menu: `Edit > Approve guessed renderings in selected terms`; Handler: `approveSelectedRenderingsToolStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 931 | `[MS]` |
| Menu Structure | Menu: `Tools > Clear guessed renderings`; Handler: `clearGuessedRenderingsStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 918 | `[MS]` |
| Form Relationships | `BiblicalTermsForm` opens: `GuessRenderingsForm` (line 874) | `[FR]` |
| Requirements | Section: "Quality Checking/Validation" | `[R]` |
| Manual | `chapters/10_biblical_terms.md`, line 87: "Add the rendering using **Ctrl**+**A**" | `[M]` |
| HelpData | Keyword: `ComponentGuessRenderings/Translations`; Dialog: `GuessRenderingsForm` | `[H]` |

**Key Quote** (from Requirements):
> "it is very helpful for Paratext to display 'guessed renderings' as possible based on translated text that is already in place. This can decrease how much text must be typed by the team."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `guessRenderingsToolStripMenuItem_Click` at line 868 |
| 0 | `BiblicalTerms/Internal/GuessRenderingsForm.cs` | Form Relationships | opened from BiblicalTermsForm line 874 |
| 1 | `ParatextData/Terms/BiblicalTerms.cs` | Import in D0 | Line 24: `using Paratext.Data.Terms` |

**Not Found**:
- `GuessRenderingsLogic.cs` (search: "GuessRenderingsLogic" - no matches, logic may be in GuessRenderingsForm.cs)

**Dialog Navigation**:
- `BiblicalTermsForm` → `GuessRenderingsForm` (line 874)

**UI Entry Points**:
- Tools > Guess renderings (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `guessRenderingsToolStripMenuItem_Click`, line 868
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Edit > Approve guessed renderings in selected terms (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `approveSelectedRenderingsToolStripMenuItem_Click`, line 931
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Tools > Clear guessed renderings (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `clearGuessedRenderingsStripMenuItem_Click`, line 918
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- View > Highlight guessed renderings (in TextForm)
  - Menu Structure: `TextForm`, handler `highlightGuessedRenderingsToolStripMenuItem_Click`, line 2104
  - File: `Paratext/TextForm.cs`
- Biblical Terms window > Guessed column
  - HelpData ID: `67911084-b133-40d1-aee8-a288f2a66c49`
  - Dialog: `GuessRenderingsForm`
  - Question: "How do I use the Guess Renderings tool?"
- Ctrl+A to add rendering from verse
  - Manual: `chapters/10_biblical_terms.md`, line 87
  - Quote: "Add the rendering using **Ctrl**+**A**"

**HelpData Items**:
- ID: `67911084-b133-40d1-aee8-a288f2a66c49` - "How do I use the Guess Renderings tool?"
- Dialog: `GuessRenderingsForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 4.4 Biblical Terms Lists

**Description**: Multiple lists of biblical terms are available, from comprehensive to focused, with ability to create custom lists.

**Sub-Features**:
- Pre-defined lists (Major Terms, All Terms, etc.)
- Project Biblical Terms list
- Custom list creation
- Add/remove terms from lists
- Import/export lists

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Open biblical terms list`; Handler: `selectTermsListToolStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 1054 | `[MS]` |
| Menu Structure | Menu: `Project > Import biblical terms list`; Handler: `importBtListMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 1366 | `[MS]` |
| Menu Structure | Menu: `Project > Export biblical terms list`; Handler: `exportCurrentListMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 1375 | `[MS]` |
| Form Relationships | `SelectTermsListForm` opens: `CustomDualButtonForm` (lines 399, 425, 529) | `[FR]` |
| Manual | `chapters/10_biblical_terms.md`, line 43: "**≡ Tab** (of the new window), under **Biblical Terms** > **Select Biblical terms list**" | `[M]` |
| HelpData | Keyword: `ComponentBiblicalTermsLists`; Dialog: `SelectTermsListForm`; 14 items | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `selectTermsListToolStripMenuItem_Click` at line 1054 |
| 0 | `BiblicalTerms/Internal/SelectTermsListForm.cs` | HelpData dialog | `SelectTermsListForm`, line 28 |
| 1 | `ParatextData/Terms/BiblicalTermsList.cs` | Import in D0 | BiblicalTermsList.cs references term lists |
| 1 | `ParatextData/Terms/BiblicalTermsListType.cs` | Import in D1 | BiblicalTermsList.cs line 17: `BiblicalTermsListType` |
| 2 | `ParatextData/Terms/Lists/*.xml` | Data directory | XML files containing term list data |

**Dialog Navigation**:
- `BiblicalTermsForm` → `SelectTermsListForm` (via menu Project > Open biblical terms list)
- `SelectTermsListForm` → `CustomDualButtonForm` (lines 399, 425, 529)

**UI Entry Points**:
- Project > Open biblical terms list (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `selectTermsListToolStripMenuItem_Click`, line 1054
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Project > Import biblical terms list (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `importBtListMenuItem_Click`, line 1366
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Project > Export biblical terms list (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `exportCurrentListMenuItem_Click`, line 1375
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Project > Export filtered biblical terms (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `exportFilteredTermsMenuItem_Click`, line 1380
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Paratext > Advanced > Import biblical terms list (in MainForm)
  - Menu Structure: `MainForm`, handler `importBTListToolStripMenuItem_Click`, line 1193
  - File: `Paratext/MainForm.cs`
- ≡ Tab > Biblical Terms > Select Biblical terms list
  - Manual: `chapters/10_biblical_terms.md`, line 43
  - Quote: "**≡ Tab** (of the new window), under **Biblical Terms** > **Select Biblical terms list**"
  - HelpData ID: `00806c7d-383c-47bc-96e3-3e7f1cb98cca`
  - Dialog: `SelectTermsListForm`
  - Question: "Guide: Tools > Biblical Terms: Biblical terms > Open biblical terms list"

**HelpData Items**:
- ID: `3f635e9c-23f2-4ed8-815f-7662e935db82` - "Introduction to Biblical Terms lists"
- ID: `14a9fafa-a688-4700-adc9-1dede427389d` - "How do I make a customized Biblical Terms list?"
- ID: `8d3ff6bf-fcb4-46ac-b2c0-982471eac784` - "How do I remove terms from a Project Biblical Terms list?"
- Dialogs: `SelectTermsListForm`, `ChooseAssociatedBTListForm`

**Validation**: [MS] [FR] [M] [H] [C] — Last verified: 2026-01-20

---

### 4.5 Term Categories & Filters

**Description**: Organize biblical terms into categories and filter the list to focus on specific types of terms or completion status.

**Sub-Features**:
- Pre-defined categories
- Filter by rendering status
- Filter by book/passage
- Filter by term type
- Search within terms

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Export filtered biblical terms`; Handler: `exportFilteredTermsMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 1380 | `[MS]` |
| Menu Structure | Menu: `View > Show category column`; Handler: `showCategoryColumnToolStripMenuItem_Click`; File: `BiblicalTermsRenderingsForm.cs`, line 380 | `[MS]` |
| Form Relationships | `BiblicalTermsForm` opens: `TermDefineFilterForm` (line 1733) | `[FR]` |
| Form Relationships | `BiblicalTermsRenderingsForm` opens: `TermDefineFilterForm` (line 476) | `[FR]` |
| Manual | `chapters/10_biblical_terms.md`, line 77: "From the second filter button choose **current book**" | `[M]` |
| HelpData | Keyword: `ComponentBiblicalTermsTool`; Dialog: `CategoriesChooserForm` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `exportFilteredTermsMenuItem_Click` at line 1380 |
| 0 | `BiblicalTerms/Internal/Filters/TermDefineFilterForm.cs` | Form Relationships | opened from BiblicalTermsForm line 1733 |
| 1 | `BiblicalTerms/Internal/Filters/BiblicalTermsTextFilterAdapter.cs` | Directory search | Filter adapter in BiblicalTerms directory |
| 1 | `ParatextData/Terms/Filters/BiblicalTermsFilter.cs` | Import in D0 | Line 23: `using Paratext.Data.Terms.Filters` |

**Dialog Navigation**:
- `BiblicalTermsForm` → `TermDefineFilterForm` (line 1733)
- `BiblicalTermsRenderingsForm` → `TermDefineFilterForm` (line 476)

**UI Entry Points**:
- Project > Export filtered biblical terms (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `exportFilteredTermsMenuItem_Click`, line 1380
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- View > Show category column (in Biblical Terms Renderings window)
  - Menu Structure: `BiblicalTermsRenderingsForm`, handler `showCategoryColumnToolStripMenuItem_Click`, line 380
  - File: `BiblicalTerms/Internal/BiblicalTermsRenderingsForm.cs`
- Biblical Terms window > Filter dropdown (second filter button)
  - Manual: `chapters/10_biblical_terms.md`, line 77
  - Quote: "From the second filter button choose **current book**"
  - HelpData ID: `d85752b0-e2b1-466d-8ad1-391891d16285`
  - Dialog: `BiblicalTermsForm`
  - Question: "How do I filter terms in the Biblical Terms tool?"
- Biblical Terms window > Category selection
  - HelpData ID: `6c893002-b636-47ca-b135-16eb9a277dbc`
  - Dialog: `CategoriesChooserForm`
  - Question: "How does the Biblical Terms tool help me to check proper names?"

**HelpData Items**:
- ID: `99a23736-45bb-45c3-a4ff-e5c5a05cadbd` - "What is a Biblical Term category?"
- ID: `6c893002-b636-47ca-b135-16eb9a277dbc` - "How does the Biblical Terms tool help me to check proper names?"
- ID: `db15eb3f-b3f9-46f2-95da-4f7942280673` - "How do I see Biblical Terms in a particular category?"
- Dialog: `CategoriesChooserForm`

**Validation**: [MS] [FR] [M] [H] [C] — Last verified: 2026-01-20

---

### 4.6 Glossary Integration

**Description**: Connect biblical term renderings to the project glossary for reader reference.

**Sub-Features**:
- Link term to glossary entry
- Create glossary entry from term
- View glossary from Biblical Terms
- Glossary citation in text (\w markers)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Edit > Link selected renderings to glossary`; Handler: `markGlossaryOccurrencesForSelectedTermsToolStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 1214 | `[MS]` |
| Menu Structure | Menu: `Edit > Unlink selected renderings from glossary`; Handler: `unmarkSelectedTermsForGlossary_Click`; File: `BiblicalTermsForm.cs`, line 1222 | `[MS]` |
| Menu Structure | Menu: `Edit > Unlink all renderings from glossary`; Handler: `unmarkAllTermsForGlossary_Click`; File: `BiblicalTermsForm.cs`, line 1247 | `[MS]` |
| Manual | `chapters/09_glossary.md` | `[M]` |
| HelpData | Keyword: `ComponentGlossary`; Dialog: `EditRenderingsForm_tabGlossary` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `markGlossaryOccurrencesForSelectedTermsToolStripMenuItem_Click` at line 1214 |
| 0 | `BiblicalTerms/Internal/EditRenderingsForm.cs` | HelpData dialog | `EditRenderingsForm_tabGlossary` tab |
| 1 | `ParatextData/GlossaryParser.cs` | Import in D0 | Glossary parsing utilities |

**UI Entry Points**:
- Edit > Link selected renderings to glossary (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `markGlossaryOccurrencesForSelectedTermsToolStripMenuItem_Click`, line 1214
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Edit > Unlink selected renderings from glossary (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `unmarkSelectedTermsForGlossary_Click`, line 1222
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Edit > Unlink all renderings from glossary (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `unmarkAllTermsForGlossary_Click`, line 1247
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Biblical Terms > Edit Renderings > Glossary tab
  - HelpData ID: `fa3431e2-a280-415d-b0ba-f111a5d525a0`
  - Dialog: `EditRenderingsForm_tabGlossary`
  - Question: "Guide: Tools > Biblical Terms: Edit > Edit renderings: Glossary"
- Double-click term > Glossary tab
  - HelpData ID: `e3e50bca-2bac-4286-8035-0f718aa8c8cb`
  - Question: "How do I associate an existing glossary entry with a Biblical Term?"

**HelpData Items**:
- ID: `e3e50bca-2bac-4286-8035-0f718aa8c8cb` - "How do I associate an existing glossary entry with a Biblical Term?"
- ID: `180a11d7-31b5-4f70-9aed-0accb4ae2c85` - "How do I unlink a Biblical Term rendering from a glossary entry?"
- ID: `fc5ab409-2b25-443b-9618-18b0a09d40d1` - "How do I link Biblical Term renderings to their glossary entries?"
- Dialog: `EditRenderingsForm_tabGlossary`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-20

---

### 4.7 Biblical Terms Notes

**Description**: Add and view notes attached to biblical terms for team communication.

**Sub-Features**:
- Add notes to terms
- View term notes in project
- Note status tracking
- Discussion notes vs. rendering descriptions

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Edit > Edit rendering discussion note`; Handler: `insertRenderingNoteToolStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 1341 | `[MS]` |
| Menu Structure | Menu: `Edit > Edit rendering discussion note`; Handler: `insertRenderingNoteToolStripMenuItem_Click`; File: `BiblicalTermsRenderingsForm.cs`, line 432 | `[MS]` |
| Form Relationships | `BiblicalTermsForm` opens: `ReattachNoteForm` (line 1149) | `[FR]` |
| Manual | `chapters/10_biblical_terms.md`, line 143: "Double-click on the note icon (in the second column)" | `[M]` |
| HelpData | Keyword: `ComponentBiblicalTermsNotes` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `insertRenderingNoteToolStripMenuItem_Click` at line 1341 |
| 0 | `BiblicalTerms/Internal/BiblicalTermsRenderingsForm.cs` | Menu Structure | handler `insertRenderingNoteToolStripMenuItem_Click` at line 432 |
| 1 | `ParatextData/ProjectComments/CommentManager.cs` | Import in D0 | Comment management for notes |
| 1 | `ParatextBase/ProjectComments/ReattachNoteForm.cs` | Form Relationships | opened from BiblicalTermsForm line 1149 |

**Dialog Navigation**:
- `BiblicalTermsForm` → `ReattachNoteForm` (line 1149)

**UI Entry Points**:
- Edit > Edit rendering discussion note (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `insertRenderingNoteToolStripMenuItem_Click`, line 1341
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- Edit > Edit rendering discussion note (in Biblical Terms Renderings window)
  - Menu Structure: `BiblicalTermsRenderingsForm`, handler `insertRenderingNoteToolStripMenuItem_Click`, line 432
  - File: `BiblicalTerms/Internal/BiblicalTermsRenderingsForm.cs`
- Double-click note icon (second column)
  - Manual: `chapters/10_biblical_terms.md`, line 143
  - Quote: "Double-click on the note icon (in the second column)"
  - HelpData ID: `a9527f52-9a9b-4bf2-a566-10ef23f45f9b`
  - Question: "How do I see Biblical Term notes in my project?"
- Edit > Edit rendering discussion note (in Biblical Terms Renderings window)
  - Menu Structure: `BiblicalTermsRenderingsForm`, handler `insertRenderingNoteToolStripMenuItem_Click`, line 432
  - HelpData ID: `ff67eb54-9d3d-4d67-bf3b-f2c4ad52f664`
  - Question: "How do I insert a note for a Biblical Term or a Biblical Term Rendering?"

**HelpData Items**:
- ID: `a9527f52-9a9b-4bf2-a566-10ef23f45f9b` - "How do I see Biblical Term notes in my project?"
- ID: `ff67eb54-9d3d-4d67-bf3b-f2c4ad52f664` - "How do I insert a note for a Biblical Term or a Biblical Term Rendering?"
- ID: `06e9ae3c-3184-4d1c-95d0-a64e65fa5007` - "Introduction to Biblical Term notes"
- ID: `3d0be131-da5e-4bc1-901e-2cddbad77d6d` - "What is the difference between a Biblical Term rendering discussion note and a Biblical Term rendering description?"

**Validation**: [MS] [FR] [M] [H] [C] — Last verified: 2026-01-20

---

### 4.8 Adapt Names

**Description**: Tool to systematically adapt proper names from a source project to the target language's conventions.

**Sub-Features**:
- Name adaptation from source to target
- Phonetic/orthographic transformations
- Batch name processing

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Adapt names`; Handler: `uiToolsAdaptNames_Click`; File: `BiblicalTermsForm.cs`, line 1317 | `[MS]` |
| HelpData | Keyword: `AdaptNames` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `uiToolsAdaptNames_Click` at line 1317 |

**UI Entry Points**:
- Tools > Adapt names (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `uiToolsAdaptNames_Click`, line 1317
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- ≡ Tab > Tools > Adapt names
  - HelpData Keyword: `AdaptNames`

**HelpData Items**:
- Keyword: `AdaptNames`

**Validation**: [MS] [H] — Last verified: 2026-01-20

---

### 4.9 Word Prefixes and Suffixes

**Description**: Define word prefixes and suffixes used to improve term rendering matching. When Paratext guesses renderings or matches terms, it uses these affixes to find morphological variants.

**Sub-Features**:
- Define prefixes for the project language
- Define suffixes for the project language
- Affix patterns for morphological matching
- Used by term rendering matching

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Word prefixes and suffixes`; Handler: `wordPrefixesAndSuffixesStripMenuItem_Click`; File: `BiblicalTermsForm.cs`, line 1044 | `[MS]` |
| HelpData | Keyword: `Prefixes/Suffixes` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `wordPrefixesAndSuffixesStripMenuItem_Click` at line 1044 |
| 0 | `BiblicalTerms/Internal/WordPrefixesAndSuffixesForm.cs` | Form Relationships | opened from BiblicalTermsForm |
| 1 | `ParatextData/Linguistics/MorphologicalMatcher.cs` | Import in D0 | lines 47-48: `suffixes = scrText.Settings.WordSuffixesList; prefixes = scrText.Settings.WordPrefixesList;` |
| 1 | `ParatextData/Terms/TermRenderingMatcher.cs` | Uses D1 | Uses MorphologicalMatcher for term matching |
| 2 | `ParatextData/ProjectSettingsAccess/ProjectSettings.cs` | Data source in D1 | line 406 comment: *"WordPrefixes are used when matching in BiblicalTerms"* |

**UI Entry Points**:
- Tools > Word prefixes and suffixes (in Biblical Terms window)
  - Menu Structure: `BiblicalTermsForm`, handler `wordPrefixesAndSuffixesStripMenuItem_Click`, line 1044
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
  - Opens: `WordPrefixesAndSuffixesForm`
  - HelpData Keyword: `Prefixes/Suffixes`

**Cross-Reference Note**:
- This feature is part of **Biblical Terms**, NOT Wordlist/Spelling
- The Settings.WordPrefixes/WordSuffixes are used **exclusively** for term rendering matching
- Wordlist morphology uses a separate `LexiconV2` + `ParatextLexicalAnalyser` system

**Validation**: [MS] [H] [C] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **09 Advanced Checking Tools**: Parallel Passages (9.2) complements term consistency checking

**Dependencies**:
- Biblical Terms lists (pre-defined or custom)
- Source language texts (for term definitions)
- Project text (for rendering analysis)

---

## Validation Summary

| Feature | MS | FR | R | M | H | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 4.1 Biblical Terms Tool | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 4.2 Term Renderings | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 4.3 Guessed Renderings | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 4.4 Biblical Terms Lists | ✓ | ✓ | - | ✓ | ✓ | ✓ | 2026-01-20 |
| 4.5 Categories & Filters | ✓ | ✓ | - | ✓ | ✓ | ✓ | 2026-01-20 |
| 4.6 Glossary Integration | ✓ | - | - | ✓ | ✓ | ✓ | 2026-01-20 |
| 4.7 Biblical Terms Notes | ✓ | ✓ | - | ✓ | ✓ | ✓ | 2026-01-20 |
| 4.8 Adapt Names | ✓ | - | - | - | ✓ | ✓ | 2026-01-20 |
| 4.9 Word Prefixes/Suffixes | ✓ | - | - | - | ✓ | ✓ | 2026-01-21 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-15 | HelpData queries for biblical terms (61 items found) | Claude |
| 2026-01-15 | Evidence chain tracing for BiblicalTermsForm and related files | Claude |
| 2026-01-15 | Updated to FEATURE_TEMPLATE_v2.md v5.0 | Claude |
| 2026-01-16 | Updated UI Entry Points with specific Manual and HelpData citations per AGENTS.md v6.4 | Claude |
| 2026-01-16 | Fixed Evidence Chain entries to include proper line number citations | Claude |
| 2026-01-16 | Updated to FEATURE_TEMPLATE_v2.md v5.2 | Claude |
| 2026-01-20 | Deep review against AGENTS.md v7.2 and FEATURE_TEMPLATE_v2.md v6.1 | Claude |
| 2026-01-20 | Added Menu Structure [MS] sources for all 8 features | Claude |
| 2026-01-20 | Added Form Relationships [FR] sources and Dialog Navigation sections | Claude |
| 2026-01-20 | Updated Implementation tables with MS-based Depth 0 entries | Claude |
| 2026-01-20 | Updated Validation Summary table with MS/FR columns | Claude |
| 2026-01-21 | Added 4.9 Word Prefixes/Suffixes (relocated from 05_Spelling_Wordlist.md per verification) | Claude |

---

## Notes

- Biblical Terms has a dedicated project directory (`BiblicalTerms/`) indicating major feature
- 26 HelpData items for ComponentBiblicalTermsTool, 24 for ComponentBiblicalTermsRenderings, 14 for ComponentBiblicalTermsLists
- Term data files in `ParatextData/Terms/Lists/` contain the actual term definitions
- Integration with Enhanced Resources (Marble) links terms to source language dictionaries
- Evidence chain line numbers are representative - actual line numbers may vary with code changes

---

**Document Version**: 5.1  
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1  
**Guidelines Version**: AGENTS.md v7.2
