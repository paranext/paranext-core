# Paratext 9 - Translation Workspace

**Category**: 01  
**Focus**: Core text editing, navigation, and workspace management  
**User Roles**: All users  
**Manual Chapters**: 2 (Organizing Desktop), 4 (Keyboarding)  
**Last Updated**: 2026-01-22

---

## Overview

The Translation Workspace encompasses the core features users interact with daily: the text editor, navigation tools, and workspace management. These form the foundation of Paratext's user interface.

---

## Feature List

### 1.1 Text Editor

**Description**: Primary interface for editing Scripture text.

**Sub-Features**:
- In-place editing with automatic USFM handling
- Paragraph-flow display with inline chapter/verse numbers (verified 2026-07-13: `ScriptureViews/Standard.xslt` renders USFM paragraphs with inline verse spans; PT9 has no verse-per-line editor mode)
- Footnotes, cross-references, and sidebars
- Drag-and-drop editing (optional, disabled by default)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Form: `TextForm`; Menus: Edit, View, Insert, Tools | `[MS]` |
| Form Relationships | `TextForm` inherits from `ParatextWindowWithMenus` | `[FR]` |
| Requirements | Section: "Drafting Support > Text Editing" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "Paratext 9 has five views" | `[M]` |
| HelpData | Keyword: `ComponentEditing/ListWindow`; Dialog: `OptionsForm` | `[H]` |

**Key Quote** (from Requirements):
> "It is imperative that a Scripture editor show a WYSIWYG view of the data"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Form Relationships | Main Scripture editing form; inherits `ParatextWindowWithMenus` |
| 1 | `FormattedEditor/FormattedEditorControl.cs` | Import in D0 | Line 50: `using Paratext.FormattedEditor;` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Line 126: `private ScrText loadedScrText;` |

**Not Found**:
- No HelpData dialog specifically for editor (uses generic `OptionsForm`)

**UI Entry Points**:
- Double-click Paratext 9 icon on desktop
  - Manual: `chapters/02_organizing_desktop.md`, line 66
  - Quote: "Double-click on Paratext 9 icon on the **desktop**"
- ≡ Paratext > Paratext > Open > Projects
  - Manual: `chapters/02_organizing_desktop.md`, line 82
  - Quote: "**≡ Paratext** menu under **Paratext** > **Open**, Projects"

**HelpData Items**:
- ID: `425c5dcf-5ed7-4366-96b7-0239decc24ba` - "How do I enable drag-and-drop editing?"
- ID: `5e6536c1-0665-427f-a0c8-f03ea7ca4dcc` - "Why can I only see one chapter of a book?"

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.2 Editor Views

**Description**: The Scripture editor provides 5 different view modes, each optimized for different translation workflow tasks. Switch between views using View > Switch Scripture view (cycles through views) or expand the menu to see all 5 views listed.

**View Modes**:

| View | Purpose | Editable | Shows Markers |
|------|---------|----------|---------------|
| **Standard** | Main editing view for translators. Full-featured with marker assistance. | Yes | Yes |
| **Formatted** | WYSIWYG editing. See formatted text while editing content. | Yes | No |
| **Unformatted** | Raw USFM editing for working with markup structure. | Yes | Yes |
| **Preview** | Read-only formatted view to see how text will appear. | No | No |
| **Basic** | Minimal read-only view for simple review. | No | Partial |

**Sub-Features by View**:

*Standard View:*
- Press **Enter** to see list of valid paragraph markers at cursor position
- Press **backslash (\\)** to see list of valid character/note markers
- Style dropdown menu available
- Invalid/unknown USFM markers display in red
- Footnote pane opens automatically when inserting notes

*Formatted View:*
- WYSIWYG display showing rendered text without markers
- Auto-formats verse numbers when entered
- Style dropdown menu available
- Displays figures inline

*Unformatted View:*
- Shows all USFM markers in the text
- Can edit markers directly
- USFMs for footnotes/cross-refs visible in text
- Can add missing chapter markers

*Preview View:*
- Read-only - cannot edit text
- Shows formatted, rendered text with figures
- Can still view project notes and consultant notes

*Basic View:*
- Minimal read-only view
- Does NOT support: highlighting, spelling display, notes, whitespace symbols

**View Options** (apply to all views except Basic):
- Show spaces and invisible characters (pilcrow button on toolbar)
- Highlight biblical term renderings
- Highlight guessed renderings
- Highlight invalid characters
- Display spelling errors
- Show footnotes
- Show project notes / consultant notes
- Show sidebars

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `View > Switch Scripture view`; Handler: `nextViewToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Requirements | Section: "Drafting Support > Text Editing" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "Ctrl + E... choose the view" | `[M]` |
| HelpData | ID: `bc18cda9-d8bc-4ee8-bdd3-3d7825314107`; Question: "What is the difference between the Preview, Basic, Formatted, Unformatted, and Standard view in Paratext?" | `[H]` |

**Key Quote** (from Requirements):
> "The Scripture editor must be able to show or hide USFM markers so that users can see exactly what markup is being employed"

**Key Quote** (from HelpData):
> "You must view the text in Standard, Formatted, or Unformatted view in order to insert markers in the project text. You cannot insert markers in Preview and Basic views."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `nextViewToolStripMenuItem_Click` at line 1986 |

**UI Entry Points**:
- ≡ Tab > View > Switch Scripture view (cycles through views)
  - Menu Structure: `TextForm`, handler `nextViewToolStripMenuItem_Click`, line 1986
  - File: `Paratext/TextForm.cs`
- ≡ Tab > View > [click "v" icon for expanded menu] > Select specific view
  - Manual: `chapters/04_keyboarding.md`, line 52
  - Quote: "**≡ Tab** under **View** menu, choose the view (usually Standard)."
- Ctrl+E (toggle view)
  - Manual: `chapters/04_keyboarding.md`, line 51
  - HelpData ID: `9b81209d-eb15-44d7-b646-44a837c03c54`
  - Question: "How do I insert markers in my project text?"

**HelpData Items**:
- ID: `bc18cda9-d8bc-4ee8-bdd3-3d7825314107` - "What is the difference between the Preview, Basic, Formatted, Unformatted, and Standard view in Paratext?"
- ID: `9b81209d-eb15-44d7-b646-44a837c03c54` - "How do I insert markers in my project text?"
- ID: `7a3b26d7-445e-4cec-be67-7d5a6ed4322b` - "What are USFMs?"
- ID: `cace882a-69cb-4325-8068-fc34a708e2ee` - "Why do some markers display in red?"

**Validation**: [MS] - [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.3 BCV Navigation

**Description**: Navigate directly to any book, chapter, and verse reference without scrolling.

**Sub-Features**:
- Book selection dropdown
- Chapter and verse selection
- Keyboard shortcuts (F8, F9, Ctrl+arrow)
- Go-to reference via toolbar (Ctrl+B)
- Reference history (back/forward)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | No dedicated menu item found; navigation is toolbar-based | - |
| Requirements | Section: "Drafting Support > Navigation" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "move your cursor to the correct book, chapter and verse" | `[M]` |
| HelpData | Keyword: `ComponentNavigation`; 3 items | `[H]` |

**Key Quote** (from Requirements):
> "A Scripture drafting platform must be able to understand BCV navigation, and allow a user to directly access any particular BCV reference without scrolling"

**Implementation**:

*Note: BCV navigation is toolbar-based (no menu item). Implementation is integrated into MainForm and VerseControl.*

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | HelpData confirmed → code search | Line 329: `public VerseRef Reference` property; Line 170: `uiVerseControlHost.VerseControl` |
| 0 | `Paratext/MainForm.cs` | HelpData confirmed → code search | Line 407: `Windows.GotoReference(verseRef, callingWindow)` method |

**Not Found**:
- `BCVRef.cs` (search: "BCVRef" - no matches in Paratext project)
- `Navigation*.cs` (search: "Navigation" - only XmlNavigationEntry.cs, unrelated)

**UI Entry Points**:
- Navigation toolbar icons (book, chapter, verse)
  - Manual: `chapters/04_keyboarding.md`, line 31
  - Quote: "Using the icons on the toolbar, change the project, book, chapter and verse as needed."
- Ctrl+B (go to navigation area)
  - Manual: `chapters/04_keyboarding.md`, line 137
  - Quote: "Ctrl + B = go to the navigation area of the toolbar."
  - HelpData ID: `3b10f808-04bc-4276-a7cf-d8bc1791312f`
  - Dialog: `OptionsForm`
  - Question: "How do I go to a Bible reference?"
- F8 / Ctrl+F8 (next/prev chapter)
  - Manual: `chapters/04_keyboarding.md`, line 135
  - Quote: "F8 = Next Chapter (Ctrl + F8 for previous chapter)"
- F9 / Ctrl+F9 (next/prev book)
  - Manual: `chapters/04_keyboarding.md`, line 136
  - Quote: "F9 = Next Book (Ctrl + F9 for previous book)"

**HelpData Items**:
- ID: `d095ae52-686a-4401-8527-ab686308c559` - "How do I see a history of references I have visited?"
- ID: `3b10f808-04bc-4276-a7cf-d8bc1791312f` - "How do I go to a Bible reference?"
- ID: `360065f5-625d-4921-8f41-1bc9c60e7a24` - "How do I navigate to a Bible reference?"
- Dialog: `OptionsForm`

**Validation**: - - [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.4 Synchronized Scrolling

**Description**: Multiple windows scroll together to show the same Scripture reference automatically.

**Sub-Features**:
- Automatic synchronization across linked windows
- Visual highlighting of current reference
- Cross-application sync (Logos, Translator's Workplace)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | No dedicated menu item found; automatic behavior | - |
| Requirements | Section: "Drafting Support > Navigation" | `[R]` |
| Manual | `chapters/02_organizing_desktop.md`: Video 0.2.3a reference | `[M]` |
| HelpData | Keyword: `ComponentSynchronizedScrolling`; 4 items | `[H]` |

**Key Quote** (from Requirements):
> "This synchronized scrolling is a foundational concept for Paratext. No one would want to have to individually scroll multiple windows whenever they move to a new reference."

**Implementation**:

*Note: This feature is automatic behavior without menu/dialog entry point. HelpData keyword `ComponentSynchronizedScrolling` confirms feature existence; implementation located via code search.*

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/FocusSharer.cs` | HelpData confirmed → code search | Line 85: `public Enum<ScrollGroup> ScrollingGroup` property manages sync |

**UI Entry Points**:
- Automatic when windows in same scroll group
  - HelpData ID: `57f159f0-376e-4de1-9060-16c41ac8e9ce`
  - Question: "How do I make sure my texts scroll together?"
- Cross-application scrolling configuration
  - HelpData ID: `0806beed-401e-4e25-a6ca-ebbabf277a51`
  - Question: "How do I ensure that my project scrolls together with other programs?"

**HelpData Items**:
- ID: `57f159f0-376e-4de1-9060-16c41ac8e9ce` - "How do I make sure my texts scroll together?"
- ID: `0806beed-401e-4e25-a6ca-ebbabf277a51` - "How do I ensure that my project scrolls together with other programs?"
- ID: `d9c2ecee-e7ed-4658-97ba-d802b3dae10f` - "Why do Logos resources not scroll together with Paratext?" (tech)
- ID: `167831f8-63bf-4b8e-96e8-0f0c15e7cccb` - "Can I have a text which doesn't scroll with other texts?"

**Validation**: - - [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.5 Scroll Groups

**Description**: Organize windows into independent groups for separate navigation.

**Sub-Features**:
- Create and manage scroll groups
- Assign windows to groups
- Visual indicators showing group membership

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | No dedicated menu item found; managed via title bar context menu | - |
| Requirements | Section: "Drafting Support > Navigation" | `[R]` |
| Manual | `chapters/02_organizing_desktop.md`: Video 0.2.3a | `[M]` |
| HelpData | Text search "scroll group": 30 items | `[H]` |

**Key Quote** (from Requirements):
> "there will be many times when a user wants to reference one verse in one window, and another verse in another window. In this case we will require different scroll groups to navigate independently"

**Implementation**:

*Note: This feature is automatic behavior without dedicated menu entry. HelpData text search "scroll group" confirms feature existence; implementation located via code search.*

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/Themes/DockingTheme/ScrollGroupBadgeHelper.cs` | HelpData confirmed → code search | Line 15: `public static class ScrollGroupBadgeHelper` draws scroll group badges |
| 1 | `ParatextBase/FocusSharer.cs` | Type reference in D0 | Line 27: `Enum<ScrollGroup> scrollGroup` parameter; Line 85: manages group membership |

**UI Entry Points**:
- Title bar scroll group indicator (badge)
  - HelpData ID: `d651e314-da92-4801-aadc-537a2f223807`
  - Question: "How do I prevent my text from scrolling together with other texts?"
- Tab menu or title bar right-click to change groups
  - HelpData ID: `167831f8-63bf-4b8e-96e8-0f0c15e7cccb`
  - Question: "Can I have a text which doesn't scroll with other texts?"

**HelpData Items**:
- ID: `d651e314-da92-4801-aadc-537a2f223807` - "How do I prevent my text from scrolling together with other texts?"
- ID: `167831f8-63bf-4b8e-96e8-0f0c15e7cccb` - "Can I have a text which doesn't scroll with other texts?"

**Validation**: - - [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.6 Window Docking & Layouts

**Description**: Advanced window management with docking, floating, tabbing, and saved layouts.

**Sub-Features**:
- Dock windows to edges and corners
- Float windows anywhere
- Tab multiple windows in same panel
- Save and restore layouts
- Share layouts with team members

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Layout > Save current layout`; Handler: `saveTextCombinationToolStripMenuItem_Click`; Owner: `MainForm` | `[MS]` |
| Menu Structure | Menu: `Layout > Manage layouts`; Handler: `manageLayoutsToolStripMenuItem_Click`; Owner: `MainForm` | `[MS]` |
| Form Relationships | Opens: `SaveTextCombinationsForm` from layout save | `[FR]` |
| Requirements | Section: "Drafting Support > Workspace Management" | `[R]` |
| Manual | `chapters/02_organizing_desktop.md`: "Save current layout" | `[M]` |
| HelpData | Keywords: `ComponentWindows/Panels/Tabs`, `ComponentSavedLayouts`; Dialog: `SaveTextCombinationsForm` | `[H]` |

**Key Quote** (from Requirements):
> "Paratext utilizes a workspace management framework to not only provide tabs, panels, and floating windows, but also provides a way to save and share layouts with other team members"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `saveTextCombinationToolStripMenuItem_Click` at line 1357 |
| 0 | `Paratext/WindowMenu/SaveTextCombinationsForm.cs` | HelpData dialog | `SaveTextCombinationsForm` |
| 1 | `ParatextBase/ParatextWindows/ParatextWindow.cs` | Import in D0 | Line 14: `using Paratext.Base.ParatextWindows` |

**UI Entry Points**:
- ≡ Paratext > Layout > Save current layout
  - Menu Structure: `MainForm`, handler `saveTextCombinationToolStripMenuItem_Click`, line 1357
  - File: `Paratext/MainForm.cs`
  - Manual: `chapters/02_organizing_desktop.md`, line 113
  - Quote: "**≡ Paratext**, under **Layout** > **Save current layout**"
  - HelpData ID: `aad37193-723a-4ffc-9026-7e42c8f82590`
  - Dialog: `SaveTextCombinationsForm`
  - Question: "How do I save a layout of open items?"
- ≡ Paratext > Layout > Manage layouts
  - Menu Structure: `MainForm`, handler `manageLayoutsToolStripMenuItem_Click`, line 1370
  - File: `Paratext/MainForm.cs`
- ≡ Paratext > Window > Arrange into columns/rows
  - Manual: `chapters/02_organizing_desktop.md`, line 93
  - Quote: "you can use the main Paratext menu to arrange windows by **rows** and **columns**"
  - HelpData ID: `bb04b325-539c-48b3-ad53-313a339203be`
  - Dialog: `SaveTextCombinationsForm`
  - Question: "How do I arrange open items in Paratext?"
- Project > Project settings > Share saved layouts
  - Menu Structure: `ParatextWindowWithMenus`, handler `shareSavedLayoutsToolStripMenuItem_Click`, line 928
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`

**HelpData Items**:
- ID: `f1a16e48-73bb-4ea1-b34b-5dcaf61c2e2d` - "What are panels and tabs?"
- ID: `aad37193-723a-4ffc-9026-7e42c8f82590` - "How do I save a layout of open items?"
- ID: `bb04b325-539c-48b3-ad53-313a339203be` - "How do I arrange open items in Paratext?"
- ID: `7ce3d7dd-098b-4be2-a501-9609a90c5d7d` - "How do I share a layout with others?"
- Dialogs: `SaveTextCombinationsForm`, `ShareSavedLayoutForm`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.7 Find and Replace

**Description**: Search and replace text with regular expression and USFM-aware support.

**Sub-Features**:
- Basic text search (Find)
- Find and replace
- Regular expression support (prefix: `regex:`)
- Multi-word search (up to 3 non-consecutive words)
- Match in: All text, Verse text, Publishable text

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Edit > Find`; Handler: `findToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `Edit > Replace`; Handler: `replaceToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Form Relationships | Opens: `FindReplaceForm` from TextForm | `[FR]` |
| Requirements | Section: "Drafting Support > Text Editing" | `[R]` |
| Manual | `chapters/04_keyboarding.md`: "use the **Find** feature to look for a word" | `[M]` |
| HelpData | Keyword: `ComponentFind/Replace`; Dialog: `FindReplaceForm_tabBasic` | `[H]` |

**Key Quote** (from Requirements):
> "Editors must be able to perform cut, copy, paste, and also find and replace"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `findToolStripMenuItem_Click` at line 1631 |
| 0 | `Paratext/EditMenu/FindReplaceForm.cs` | HelpData dialog | `FindReplaceForm_tabBasic` |
| 1 | `Paratext/EditMenu/FindReplaceSource.cs` | Import in D0 | Line 17: `using Paratext.Data.Find` |
| 1 | `Paratext/EditMenu/FindReplaceInFiles.cs` | Field type in D0 | Line 47: `FindReplaceSource` |
| 1 | `ParatextData/Find/FindSource.cs` | Base class | Line 24: `class FindReplaceSource : FindSource` |
| 1 | `ParatextData/Filters/SelectedPassages.cs` | Field in D0 | Line 48: `SelectedPassages selectedPassages` |
| 2 | `ParatextData/Find/SearchResult.cs` | Return type in D1 | FindSource.cs line 148: returns `SearchResult` |
| 2 | `ParatextData/Find/VerseListItemCollection.cs` | Parameter in D1 | FindSource.cs line 158: `List<VerseListItem>` |
| 2 | `ParatextData/ScrText.cs` | Field in D1 | FindSource.cs line 19: `protected ScrText _scrText` |

**Not Found**:
- `FindReplaceOptions.cs` (search: "FindReplaceOptions" - class defined inline, not separate file)

**Dialog Navigation**:
- `TextForm` → `FindReplaceForm` (via menu handler at line 1631)

**UI Entry Points**:
- ≡ Tab > Edit > Find (Ctrl+F)
  - Menu Structure: `TextForm`, handler `findToolStripMenuItem_Click`, line 1631
  - File: `Paratext/TextForm.cs`
  - Manual: `chapters/04_keyboarding.md`, line 44
  - Quote: "you could use the **Find** feature to look for a word that occurs in the verse you are looking for. Ctrl+F."
  - HelpData ID: `fd1874e8-271b-43b8-b8c7-8eda5fead261`
  - Dialog: `FindReplaceForm_tabBasic`
  - Question: "How do I find a word or phrase in a text?"
- ≡ Tab > Edit > Replace (Ctrl+H)
  - Menu Structure: `TextForm`, handler `replaceToolStripMenuItem_Click`, line 1636
  - File: `Paratext/TextForm.cs`
  - HelpData ID: `8aa266ed-7665-4233-bdd5-40f1eaf95020`
  - Dialog: `FindReplaceForm_tabReplacement`
  - Question: "How do I find and replace a word or phrase in my project?"

**HelpData Items**:
- ID: `fd1874e8-271b-43b8-b8c7-8eda5fead261` - "How do I find a word or phrase in a text?"
- ID: `8aa266ed-7665-4233-bdd5-40f1eaf95020` - "How do I find and replace a word or phrase?"
- ID: `a9112c8d-fbb4-465b-b7d0-15cf452d4e2a` - "Guide: Edit > Find: Multi Word Search"
- ID: `63ae049d-2b6c-4e51-8cfb-1ac947b2bad0` - "Guide: Edit > Find: Find and Replace"
- Dialogs: `FindReplaceForm_tabBasic`, `FindReplaceForm_tabMultiWord`, `FindReplaceForm_tabReplacement`

**Validation**: [MS] [FR] [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.8 Quick Reference Window

**Description**: Floating window for checking a Scripture reference without changing main navigation.

**Sub-Features**:
- Floating popup window (always separate)
- Does not affect main scroll position
- Opens from clickable reference icons

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Quick reference`; Handler: `quickReferenceToolStripMenuItem_Click`; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Manual | Keyboard shortcuts documentation | `[M]` |
| HelpData | Keyword: `ComponentQuickReferenceWindow`; 2 items | `[H]` |

**Key Quote** (from HelpData):
> "A Quick Reference window is a text window which does not scroll together with any other open items"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `quickReferenceToolStripMenuItem_Click` at line 363 |

**UI Entry Points**:
- ≡ Tab > Tools > Quick reference
  - Menu Structure: `ParatextWindowWithMenus`, handler `quickReferenceToolStripMenuItem_Click`, line 363
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `747ceec6-54f3-4a94-8b71-157492cb2ac6`
  - Question: "How do I open a Quick Reference window?"
- Click valid reference icon in text
  - HelpData ID: `daad5fd1-67ba-40f0-96bb-7f570e165755`
  - Dialog: `faq`
  - Question: "What is a Quick Reference window?"

**HelpData Items**:
- ID: `747ceec6-54f3-4a94-8b71-157492cb2ac6` - "How do I open a Quick Reference window?"
- ID: `daad5fd1-67ba-40f0-96bb-7f570e165755` - "What is a Quick Reference window?"

**Validation**: [MS] - - [M] [H] [C] — Last verified: 2026-01-20

---

### 1.9 Insert Figure/Illustration

**Description**: Insert figures and illustrations into Scripture text.

**Sub-Features**:
- Insert figure with caption
- Figure positioning options
- Image file reference
- Copyright information
- Verse range for placement

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Figure`; Handler: `figureToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Requirements | Section: "Data Formats > USFM" | `[R]` |
| Manual | `chapters/24_finalizing.md`, line 55: "From the **Insert** menu, choose **Figure**" | `[M]` |
| HelpData | Keyword: `ComponentInsertFigure`; Dialog: `FigurePropertiesForm` | `[H]` |

**Key Quote** (from Requirements):
> "USFM supports not only verse text, but many supporting elements as well, including but not limited to introductory material, sidebars, footnotes, cross references, end notes, figures, and tables."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `figureToolStripMenuItem_Click` at line 1808 |

**UI Entry Points**:
- ≡ Tab > Insert > Figure
  - Menu Structure: `TextForm`, handler `figureToolStripMenuItem_Click`, line 1808
  - File: `Paratext/TextForm.cs`
  - Manual: `chapters/24_finalizing.md`, line 55
  - Quote: "From the **Insert** menu, choose **Figure**"

**Validation**: [MS] - [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.10 Insert Table

**Description**: Insert tables into Scripture text with configurable rows and columns.

**Sub-Features**:
- Table row and column configuration
- USFM table markers (\tr, \th, \tc)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Table`; Handler: `tableToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Requirements | Section: "Data Formats > USFM" | `[R]` |
| HelpData | Keyword: `ComponentInsertTable`; Dialog: `InsertTableForm` | `[H]` |

**Key Quote** (from Requirements):
> "USFM supports not only verse text, but many supporting elements as well, including but not limited to introductory material, sidebars, footnotes, cross references, end notes, figures, and tables."

*Note: No specific Manual reference found for Insert Table.*

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `tableToolStripMenuItem_Click` at line 1781 |

**UI Entry Points**:
- ≡ Tab > Insert > Table
  - Menu Structure: `TextForm`, handler `tableToolStripMenuItem_Click`, line 1781
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] - [R] - [H] [C] — Last verified: 2026-01-20

---

### 1.11 Insert Footnotes & Endnotes

**Description**: Insert footnotes and endnotes into Scripture text with proper USFM markup.

**Sub-Features**:
- Insert footnote (\f marker)
- Insert endnote (\fe marker)
- Insert extended footnote (\ef marker)
- Insert extended endnote
- Footnote caller configuration
- Footnote pane for editing content

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Footnote`; Handler: `footnoteToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `Insert > End note`; Handler: `endNoteToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `Insert > Extended footnote`; Handler: `InsertEfMarkerButtonOnClick`; Owner: `TextForm` | `[MS]` |
| Requirements | Section: "Data Formats > USFM" | `[R]` |
| HelpData | Keyword: `ComponentFootnotes`; Dialog: `LanguageSettingsForm_tabOther` (note: no `FootnotePropertiesForm` exists anywhere in PT9 — insertion is dialogless via `Editor.InsertNote`; verified 2026-07-13) | `[H]` |
| Manual | `chapters/04_keyboarding.md`: Insert menu | `[M]` |

**Key Quote** (from Requirements):
> "USFM supports not only verse text, but many supporting elements as well, including but not limited to introductory material, sidebars, footnotes, cross references, end notes, figures, and tables."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `footnoteToolStripMenuItem_Click` at line 1796 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `endNoteToolStripMenuItem_Click` at line 1806 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `InsertEfMarkerButtonOnClick` at line 4597 |

**UI Entry Points**:
- ≡ Tab > Insert > Footnote
  - Menu Structure: `TextForm`, handler `footnoteToolStripMenuItem_Click`, line 1796
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > End note
  - Menu Structure: `TextForm`, handler `endNoteToolStripMenuItem_Click`, line 1806
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > Extended footnote
  - Menu Structure: `TextForm`, handler `InsertEfMarkerButtonOnClick`, line 4597
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > Extended end note
  - Menu Structure: `TextForm`, handler `extendedEndNoteToolStripMenuItem_Click`, line 1769
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] - [R] [M] [H] [C] — Last verified: 2026-01-20

---

### 1.12 Cross-Reference Tools

**Description**: Insert, extract, and manage cross-references in Scripture text. Includes both interactive insertion during drafting and batch operations for bulk cross-reference management.

**Sub-Features**:

*Interactive Insertion (Insert menu):*
- Insert cross-reference (\x marker)
- Insert extended cross-reference (\ex marker)
- Cross-reference target selection
- Format configuration

*Batch Operations (Project > Advanced menu):*
- Extract cross-references - extract all \xt markers from text
- Insert cross-references (batch) - bulk insert cross-references from source
- Insert missing origin references - add origin references where missing

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Cross-reference`; Handler: `crossReferenceToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `Insert > Extended cross reference`; Handler: `InsertExMarkerButtonOnClick`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Extract cross-references`; Handler: `extractCrossReferencesToolStripMenuItem_Click`; Line: 472; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Insert cross-references`; Handler: `insertCrossReferencesToolStripMenuItem_Click`; Line: 507; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Insert missing origin references`; Handler: `insertMissingOriginReferencesToolStripMenuItem_Click`; Line: 566; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Requirements | Section: "Data Formats > USFM" | `[R]` |
| HelpData | Keyword: `ContentInsertCrossReference` (note: no `CrossReferencePropertiesForm` exists anywhere in PT9 — insertion is dialogless via `Editor.InsertNote`; the only related dialog is the batch tool `InsertCrossReferencesForm`; verified 2026-07-13) | `[H]` |
| Manual | `chapters/04_keyboarding.md`: Insert menu | `[M]` |

**Key Quote** (from Requirements):
> "USFM supports not only verse text, but many supporting elements as well, including but not limited to introductory material, sidebars, footnotes, cross references, end notes, figures, and tables."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `crossReferenceToolStripMenuItem_Click` at line 1801 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `InsertExMarkerButtonOnClick` at line 4586 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `extractCrossReferencesToolStripMenuItem_Click` at line 472 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `insertCrossReferencesToolStripMenuItem_Click` at line 507 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `insertMissingOriginReferencesToolStripMenuItem_Click` at line 566 |

**UI Entry Points**:

*Interactive Insertion:*
- ≡ Tab > Insert > Cross-reference
  - Menu Structure: `TextForm`, handler `crossReferenceToolStripMenuItem_Click`, line 1801
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > Extended cross reference
  - Menu Structure: `TextForm`, handler `InsertExMarkerButtonOnClick`, line 4586
  - File: `Paratext/TextForm.cs`

*Batch Operations:*
- ≡ Tab > Project > Advanced > Extract cross-references
  - Menu Structure: `ParatextWindowWithMenus`, handler `extractCrossReferencesToolStripMenuItem_Click`, line 472
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Advanced > Insert cross-references
  - Menu Structure: `ParatextWindowWithMenus`, handler `insertCrossReferencesToolStripMenuItem_Click`, line 507
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Advanced > Insert missing origin references
  - Menu Structure: `ParatextWindowWithMenus`, handler `insertMissingOriginReferencesToolStripMenuItem_Click`, line 566
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`

**Use Cases**:
- Adding cross-references during translation drafting (interactive)
- Populating a new project with cross-references from a template (batch insert)
- Extracting cross-references for analysis or migration (batch extract)
- Fixing missing origin references in parallel passage systems (batch)

**Validation**: [MS] - [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 1.13 Insert Verse Numbers

**Description**: Insert verse number markers with automatic numbering.

**Sub-Features**:
- Insert verse marker (\v)
- Auto-increment verse numbers
- Verse bridge support (e.g., \v 3-4)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Verse number`; Handler: `verseNumberToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| HelpData | ID: `9b81209d-eb15-44d7-b646-44a837c03c54` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `verseNumberToolStripMenuItem_Click` at line 1756 |

**UI Entry Points**:
- ≡ Tab > Insert > Verse number
  - Menu Structure: `TextForm`, handler `verseNumberToolStripMenuItem_Click`, line 1756
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] - - - [H] [C] — Last verified: 2026-01-20

---

### 1.14 Insert Project Notes

**Description**: Insert project notes for team collaboration and comments on draft text.

**Sub-Features**:
- Insert project note
- Insert consultant note
- Note assignment and threading

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Insert > Project note`; Handler: `noteToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `Insert > Consultant note`; Handler: `consultantNoteToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Requirements | Section: "Workflow Management > Project Comments" | `[R]` |
| HelpData | Keyword: `ComponentProjectNotes` | `[H]` |

**Key Quote** (from Requirements):
> "Distributed team members need to be able to comment on each other's work. Adding a comment to a specific location of a vernacular Scripture text is a very convenient way of interacting."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `noteToolStripMenuItem_Click` at line 1719 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `consultantNoteToolStripMenuItem_Click` at line 1740 |

**UI Entry Points**:
- ≡ Tab > Insert > Project note
  - Menu Structure: `TextForm`, handler `noteToolStripMenuItem_Click`, line 1719
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > Consultant note
  - Menu Structure: `TextForm`, handler `consultantNoteToolStripMenuItem_Click`, line 1740
  - File: `Paratext/TextForm.cs`

**Validation**: [MS] - [R] - [H] [C] — Last verified: 2026-01-20

---

### 1.15 Autocorrect

**Description**: Automatic text corrections while typing, including quote mark handling and character replacement rules. Accessed via Project Settings > Quotation Rules dialog and the autocorrect.txt file.

**Sub-Features**:
- Quotation rules configuration (smart quotes)
- autocorrect.txt file support for custom replacements
- Automatic character replacement during typing
- Quote mark standardization
- Invisible character handling (spaces, NBSP, etc.)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Quotation rules`; Handler: `quotationRulesToolStripMenuItem_Click`; Owner: `ParatextWindowWithMenus` | `[MS]` |
| HelpData | Keyword: `ComponentAutocorrect`; 5 items; Dialog: `QuotationRulesForm` | `[H]` |

*Note: Autocorrect is configured via the Quotation Rules dialog (for quote marks) and the autocorrect.txt file (for general text replacements). No dedicated "Autocorrect" menu item exists.*

**Key Quote** (from HelpData ID: `06d326d5-ab42-4428-9402-79416108ee55`):
> "Create a new UTF-8 encoded text file in your project folder and name the file: autocorrect.txt"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `quotationRulesToolStripMenuItem_Click` at line 912 |
| 0 | `Paratext/Checking/QuotationRulesForm.cs` | HelpData dialog | `QuotationRulesForm` - handles quotation rules and autocorrect settings |
| 1 | `Paratext.Base.AutoReplace` namespace | Import in D0 | Line 16: `using Paratext.Base.AutoReplace;` |
| 1 | `PtxUtils.AutoReplace` namespace | Import in D0 | Line 25: `using PtxUtils.AutoReplace;` |

**Dialog Navigation**:
- `ParatextWindowWithMenus` → `QuotationRulesForm` (via menu handler at line 912)

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Quotation rules
  - Menu Structure: `ParatextWindowWithMenus`, handler `quotationRulesToolStripMenuItem_Click`, line 912
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `d5a62c31-6d19-4670-8ee7-8188dfcde4bc`
  - Dialog: `QuotationRulesForm`
  - Question: "How do I enter quote marks using the autocorrect feature?"
- autocorrect.txt file in project folder
  - HelpData ID: `06d326d5-ab42-4428-9402-79416108ee55`
  - Question: "How do I set up the autocorrect.txt file?"

**HelpData Items**:
- ID: `6a0a3227-ebd6-4b92-bd1e-fdcfdb70e2bc` - "What is the autocorrect feature?"
- ID: `06d326d5-ab42-4428-9402-79416108ee55` - "How do I set up the autocorrect.txt file?"
- ID: `d5a62c31-6d19-4670-8ee7-8188dfcde4bc` - "How do I enter quote marks using the autocorrect feature?"
- ID: `00ca64a5-dd88-4390-b257-cbbf001785c8` - "Why don't double quotation marks paste correctly from Character map?"
- ID: `16fca35a-a6ce-427f-a6d3-3c15dc8b7bc8` - "autocorrect file and modifier letters" (tech)
- Dialogs: `QuotationRulesForm`, `QuotationRulesForm_tabQuoteMarks`, `QuotationRulesForm_tabQuoteLocations`

**Validation**: [MS] - - - [H] [C] — Last verified: 2026-01-20

---

### 1.16 Text Normalization Utilities

**Description**: Batch text cleanup tools for normalizing whitespace and special characters throughout a project. These utilities modify the Scripture text to fix encoding and spacing issues.

**Sub-Features**:
- Replace no-break spaces with normal spaces
- Replace no-break spaces with normal spaces but keep tildes (preserves tilde-marked non-breaking spaces)
- Standardize whitespace (normalize all whitespace characters)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Replace no-break spaces with normal spaces`; Handler: `removeAllNonbreakingSpacesFromProjectToolStripMenuItem_Click`; Line: 574; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Replace no-break spaces with normal spaces but keep tildes`; Handler: `replaceNoBreakSpacesWithNormalSpacesButKeepTildesToolStripMenuItem_Click`; Line: 579; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Standardize whitespace`; Handler: `standardizeWhitespaceToolStripMenuItem_Click`; Line: 584; Owner: `ParatextWindowWithMenus` | `[MS]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `removeAllNonbreakingSpacesFromProjectToolStripMenuItem_Click` at line 574 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `replaceNoBreakSpacesWithNormalSpacesButKeepTildesToolStripMenuItem_Click` at line 579 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `standardizeWhitespaceToolStripMenuItem_Click` at line 584 |

**UI Entry Points**:
- ≡ Tab > Project > Advanced > Replace no-break spaces with normal spaces
  - Menu Structure: `ParatextWindowWithMenus`, handler `removeAllNonbreakingSpacesFromProjectToolStripMenuItem_Click`, line 574
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Advanced > Replace no-break spaces with normal spaces but keep tildes
  - Menu Structure: `ParatextWindowWithMenus`, handler `replaceNoBreakSpacesWithNormalSpacesButKeepTildesToolStripMenuItem_Click`, line 579
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Advanced > Standardize whitespace
  - Menu Structure: `ParatextWindowWithMenus`, handler `standardizeWhitespaceToolStripMenuItem_Click`, line 584
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`

**Use Cases**:
- Cleaning up text imported from external sources with incorrect spacing
- Fixing encoding issues from copy/paste operations
- Standardizing whitespace before publishing or archiving
- Removing invisible Unicode characters that cause display issues

**Related Features**:
- 2.5 Unicode Normalization (NFD/NFC) - character-level normalization
- 2.6 Valid Characters Configuration - character validation

**Validation**: [MS] - - - - [C] — Last verified: 2026-01-21

---

### 1.17 Editor Real-time Validation

**Description**: The Scripture editor provides immediate visual feedback as users work, displaying icons, colors, and highlighting to indicate the validity of references, markers, characters, and spelling without requiring users to run explicit checks.

**Sub-Features**:
- Reference validation icons (black = valid, red X = invalid) for cross-references and parallel passages
- Invalid or unknown USFM markers display in red (Standard and Unformatted views)
- Highlight invalid/unknown characters (red background highlighting)
- Display spelling errors (wavy red underline for incorrect/undecided words)
- Highlight biblical term renderings in text
- Highlight guessed biblical term renderings
- Clickable valid reference icons open Quick Reference window

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `View > Highlight invalid characters`; Handler: `highlightInvalidCharactersToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `View > Display spelling errors`; Handler: `displaySpellingMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `View > Highlight biblical term renderings`; Handler: `highlightBiblicalTermsToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| Menu Structure | Menu: `View > Highlight guessed renderings`; Handler: `highlightGuessedRenderingsToolStripMenuItem_Click`; Owner: `TextForm` | `[MS]` |
| HelpData | ID: `333a9610-21c9-4d5d-a7c1-bc97fe66eecc`; Section "More on the reference icon"; Keywords: `ComponentScriptureReferenceSettings` | `[H]` |
| HelpData | ID: `cace882a-69cb-4325-8068-fc34a708e2ee`; Question: "Why do some markers display in red?" | `[H]` |
| HelpData | ID: `50553df7-ae46-4a16-bc91-56265604a27a`; Question: "How do I highlight invalid or unknown characters in my text?" | `[H]` |
| Manual | `chapters/04_keyboarding.md`, line 63: "You can use ≡ Tab under View > Highlight Invalid Characters" | `[M]` |
| Manual | `chapters/08_spell_check.md`, line 21: "Work through your text with red squiggly lines" | `[M]` |

**Key Quote** (from HelpData ID: `333a9610-21c9-4d5d-a7c1-bc97fe66eecc`):
> "Wherever references occur, a reference icon shows whether the reference is valid or invalid... If a reference is invalid, the reference icon has a red X. If a reference is valid, the reference icon is entirely black and you can click the reference icon to open a Quick Reference window."

**Key Quote** (from HelpData ID: `cace882a-69cb-4325-8068-fc34a708e2ee`):
> "A marker is displayed in red in the Standard view if it is invalid, in other words if it is not part of the USFM set of markers, or if it is in the wrong place in your text."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `highlightInvalidCharactersToolStripMenuItem_Click` at line 2113 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `displaySpellingMenuItem_Click` at line 2186 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `highlightBiblicalTermsToolStripMenuItem_Click` at line 2095 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `highlightGuessedRenderingsToolStripMenuItem_Click` at line 2104 |

**UI Entry Points**:
- ≡ Tab > View > Highlight invalid characters
  - Menu Structure: `TextForm`, handler `highlightInvalidCharactersToolStripMenuItem_Click`, line 2113
  - File: `Paratext/TextForm.cs`
  - HelpData ID: `50553df7-ae46-4a16-bc91-56265604a27a`
  - Question: "How do I highlight invalid or unknown characters in my text?"
- ≡ Tab > View > Display spelling errors
  - Menu Structure: `TextForm`, handler `displaySpellingMenuItem_Click`, line 2186
  - File: `Paratext/TextForm.cs`
  - Manual: `chapters/08_spell_check.md`, line 21
- ≡ Tab > View > Highlight biblical term renderings
  - Menu Structure: `TextForm`, handler `highlightBiblicalTermsToolStripMenuItem_Click`, line 2095
  - File: `Paratext/TextForm.cs`
- ≡ Tab > View > Highlight guessed renderings
  - Menu Structure: `TextForm`, handler `highlightGuessedRenderingsToolStripMenuItem_Click`, line 2104
  - File: `Paratext/TextForm.cs`
- Reference icons display automatically in text (no menu required)
  - HelpData ID: `333a9610-21c9-4d5d-a7c1-bc97fe66eecc`
  - Question: "How do I check references?"
- Invalid USFM markers display in red automatically (no menu required)
  - HelpData ID: `cace882a-69cb-4325-8068-fc34a708e2ee`
  - Question: "Why do some markers display in red?"

**HelpData Items**:
- ID: `333a9610-21c9-4d5d-a7c1-bc97fe66eecc` - "How do I check references?" (includes section "More on the reference icon")
- ID: `cace882a-69cb-4325-8068-fc34a708e2ee` - "Why do some markers display in red?"
- ID: `50553df7-ae46-4a16-bc91-56265604a27a` - "How do I highlight invalid or unknown characters in my text?"
- Keywords: `ContentHighlightInvalidChar`, `ContentDisplaySpelling`, `ContentHighlightBibTermRend`, `ContentHighlightGuessedRend`

**Validation Behavior by View**:

| Validation Type | Standard | Formatted | Unformatted | Preview | Basic |
|-----------------|----------|-----------|-------------|---------|-------|
| Reference icons | Yes | Yes | Yes | Yes | No |
| Invalid markers in red | Yes | No | Yes | No | No |
| Invalid character highlighting | Yes | Yes | Yes | Yes | No |
| Spelling error underlines | Yes | Yes | Yes | No | No |
| Biblical term highlighting | Yes | Yes | Yes | No | No |

**Related Features**:
- 1.2 Editor Views - describes view-specific capabilities
- 6.4 Characters Inventory - defines valid/invalid characters
- 7.4 References Check - batch validation of references (vs. real-time icons)
- 5.1 Wordlist - spelling status configuration

**Validation**: [MS] - - [M] [H] [C] — Last verified: 2026-01-22

---

## Cross-References

**Related Categories**:
- **14 Integration**: RegEx Pal (14.9) for developing regex patterns used in Find and Replace

**Dependencies**:
- Project text (content to edit)
- USFM stylesheet (formatting definitions)

---

## Validation Summary

| Feature | MS | FR | R | M | H | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 1.1 Text Editor | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.2 Editor Views | ✓ | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.3 BCV Navigation | - | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.4 Sync Scrolling | - | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.5 Scroll Groups | - | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.6 Window Layouts | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.7 Find/Replace | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.8 Quick Reference | ✓ | - | - | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.9 Insert Figure | ✓ | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.10 Insert Table | ✓ | - | ✓ | - | ✓ | ✓ | 2026-01-20 |
| 1.11 Insert Footnotes | ✓ | - | ✓ | ✓ | ✓ | ✓ | 2026-01-20 |
| 1.12 Cross-Reference Tools | ✓ | - | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 1.13 Insert Verse Nums | ✓ | - | - | - | ✓ | ✓ | 2026-01-20 |
| 1.14 Insert Notes | ✓ | - | ✓ | - | ✓ | ✓ | 2026-01-20 |
| 1.15 Autocorrect | ✓ | - | - | - | ✓ | ✓ | 2026-01-20 |
| 1.16 Text Normalization | ✓ | - | - | - | - | ✓ | 2026-01-21 |
| 1.17 Editor Real-time Validation | ✓ | - | - | ✓ | ✓ | ✓ | 2026-01-22 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-15 | HelpData queries for all features | Claude |
| 2026-01-15 | Evidence chain tracing for Find/Replace | Claude |
| 2026-01-15 | Updated to FEATURE_TEMPLATE_v2.md v5.0 | Claude |
| 2026-01-16 | Updated UI Entry Points with proper citations per AGENTS.md v6.4 | Claude |
| 2026-01-16 | Added HelpData IDs, Dialogs, and Questions per FEATURE_TEMPLATE_v2.md v5.2 | Claude |
| 2026-01-20 | Reworked 1.2 from "Marker View" to "Editor Views" covering all 5 views | Claude |
| 2026-01-20 | Added 1.11 Insert Footnotes, 1.12 Insert Cross-refs, 1.13 Insert Verse Nums | Claude |
| 2026-01-20 | **Major update aligned with AGENTS.md v7.2 / FEATURE_TEMPLATE_v2.md v6.1** | Claude |
| 2026-01-20 | Added Menu Structure `[MS]` sources with handler names, files, line numbers | Claude |
| 2026-01-20 | Added Form Relationships `[FR]` sources where applicable | Claude |
| 2026-01-20 | Updated Sources tables to 6-source format | Claude |
| 2026-01-20 | Updated UI Entry Points with `ownerForm` per menu inheritance model | Claude |
| 2026-01-20 | Added Validation Summary columns for MS and FR | Claude |
| 2026-01-20 | Renamed 1.11 Autocorrect to 1.15; added 1.14 Insert Project Notes | Claude |
| 2026-01-20 | Added Dialog Navigation section to Find/Replace feature | Claude |
| 2026-01-20 | **Deep Review Session 2**: Added Requirements [R] to 1.9, 1.10 with USFM quote | Claude |
| 2026-01-20 | Added Manual [M] reference to 1.9 Insert Figure from chapter 24 | Claude |
| 2026-01-20 | **Deep Review Session 3**: Completed 1.15 Autocorrect stub with full implementation | Claude |
| 2026-01-20 | Fixed Validation Summary: Added [R] to 1.11, 1.12 (footnotes, cross-refs) | Claude |
| 2026-01-20 | Added Requirements [R] to 1.14 Insert Notes with Project Comments quote | Claude |
| 2026-01-20 | 1.15: Found Menu Structure entry via `quotationRulesToolStripMenuItem_Click` | Claude |
| 2026-01-20 | 1.15: Added QuotationRulesForm.cs evidence chain with AutoReplace imports | Claude |
| 2026-01-21 | Added 1.16 Text Normalization Utilities (whitespace cleanup tools from Project > Advanced) | Claude |
| 2026-01-21 | Expanded 1.12 from "Insert Cross-references" to "Cross-Reference Tools" with batch operations from Project > Advanced | Claude |
| 2026-01-22 | Added 1.17 Editor Real-time Validation (reference icons, invalid marker highlighting, character highlighting, spelling display, biblical term highlighting) | Claude |

---

## Notes

- FormattedEditor is at repo root (`FormattedEditor/`), not under `Paratext/`
- BCV navigation is toolbar-based with implementation in MainForm (line 329: Reference property, line 407: GotoReference method)
- Quick Reference menu item is in `ParatextWindowWithMenus` (base class), inherited by all windows
- Find/Replace has richest evidence chain showing UI → Logic → Data layers
- **Autocorrect**: Accessed via Project > Project settings > Quotation rules (not a dedicated menu item). Also uses autocorrect.txt file in project folder for custom replacements.
- All UI Entry Points now include `ownerForm` specification per AGENTS.md v7.2 menu inheritance model
- TextForm menus are owned by TextForm; ParatextWindowWithMenus menus are owned by that base class
- The distinction between ownerForm is critical: menus with same path from different forms are DIFFERENT menus

---

**Document Version**: 6.1  
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1  
**Guidelines Version**: AGENTS.md v7.2
