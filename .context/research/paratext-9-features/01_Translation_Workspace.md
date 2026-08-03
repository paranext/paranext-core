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
- Verse-by-verse display with chapter/verse numbers
- Footnotes, cross-references, and sidebars
- Drag-and-drop editing (optional, disabled by default)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Form: `TextForm`; Menus: Edit, View, Insert, Tools | `[MS]` |
| Form Relationships | `TextForm` inherits from `ParatextWindowWithMenus` | `[FR]` |
| Requirements | Section: "Drafting Support > Text Editing" | `[R]` |
| Manual | `../paratext-manual/chapters/04_keyboarding.md`: "Paratext 9 has five views" | `[M]` |
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
  - Manual: `../paratext-manual/chapters/02_organizing_desktop.md`, line 66
  - Quote: "Double-click on Paratext 9 icon on the **desktop**"
- ≡ Paratext > Paratext > Open > Projects
  - Manual: `../paratext-manual/chapters/02_organizing_desktop.md`, line 82
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
| Manual | `../paratext-manual/chapters/04_keyboarding.md`: "Ctrl + E... choose the view" | `[M]` |
| HelpData | ID: `bc18cda9-d8bc-4ee8-bdd3-3d7825314107`; Question: "What is the difference between the Preview, Basic, Formatted, Unformatted, and Standard view in Paratext?" | `[H]` |

**Key Quote** (from Requirements):
> "The Scripture editor must be able to show or hide USFM markers so that users can see exactly what markup is being employed"

**Key Quote** (from HelpData):
> "You must view the text in Standard, Formatted, or Unformatted view in order to insert markers in the project text. You cannot insert markers in Preview and Basic views."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `nextViewToolStripMenuItem_Click` at line 1933 |

**UI Entry Points**:
- ≡ Tab > View > Switch Scripture view (cycles through views)
  - Menu Structure: `TextForm`, handler `nextViewToolStripMenuItem_Click`, line 1933
  - File: `Paratext/TextForm.cs`
- ≡ Tab > View > [click "v" icon for expanded menu] > Select specific view
  - Manual: `../paratext-manual/chapters/04_keyboarding.md`, line 52
  - Quote: "**≡ Tab** under **View** menu, choose the view (usually Standard)."
- Ctrl+E (toggle view)
  - Manual: `../paratext-manual/chapters/04_keyboarding.md`, line 51
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
| Manual | `../paratext-manual/chapters/04_keyboarding.md`: "move your cursor to the correct book, chapter and verse" | `[M]` |
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
  - Manual: `../paratext-manual/chapters/04_keyboarding.md`, line 31
  - Quote: "Using the icons on the toolbar, change the project, book, chapter and verse as needed."
- Ctrl+B (go to navigation area)
  - Manual: `../paratext-manual/chapters/04_keyboarding.md`, line 137
  - Quote: "Ctrl + B = go to the navigation area of the toolbar."
  - HelpData ID: `3b10f808-04bc-4276-a7cf-d8bc1791312f`
  - Dialog: `OptionsForm`
  - Question: "How do I go to a Bible reference?"
- F8 / Ctrl+F8 (next/prev chapter)
  - Manual: `../paratext-manual/chapters/04_keyboarding.md`, line 135
  - Quote: "F8 = Next Chapter (Ctrl + F8 for previous chapter)"
- F9 / Ctrl+F9 (next/prev book)
  - Manual: `../paratext-manual/chapters/04_keyboarding.md`, line 136
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
| Manual | `../paratext-manual/chapters/02_organizing_desktop.md`: Video 0.2.3a reference | `[M]` |
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
| Manual | `../paratext-manual/chapters/02_organizing_desktop.md`: Video 0.2.3a | `[M]` |
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
| Manual | `../paratext-manual/chapters/02_organizing_desktop.md`: "Save current layout" | `[M]` |
| HelpData | Keywords: `ComponentWindows/Panels/Tabs`, `ComponentSavedLayouts`; Dialog: `SaveTextCombinationsForm` | `[H]` |

**Key Quote** (from Requirements):
> "Paratext utilizes a workspace management framework to not only provide tabs, panels, and floating windows, but also provides a way to save and share layouts with other team members"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `saveTextCombinationToolStripMenuItem_Click` at line 1357 |
| 0 | `Paratext/WindowMenu/SaveTextCombinationsForm.cs` | HelpData dialog | `SaveTextCombinationsForm` |
| 1 | `ParatextBase/ParatextWindows/ParatextWindow.cs` | Import in D0 | Line 14: `using Paratext.Base.ParatextWindows` |

**Floating-window chrome** (sub-feature "Float windows anywhere") — added 2026-07-23 by the
floating-windows investigation. This sub-feature previously had **no** implementation anchor here,
which led a PRD to assert that none existed; it does.

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/Themes/DockingTheme/ParatextFloatWindow.cs` | Investigation | Line 19: `sealed class ParatextFloatWindow : FloatWindow, IActiveWindowProvider, PersistedDockingWindow` (280 lines) — owns pushpin/always-on-top (`:55-66`), title+icon rules (`:103-117`), pin-state persistence (`:79`), min/max DWM workarounds (`:119-154`, PTX-17379), edge snapping (`:161`), 6-item reduced toolbar and title bar (`:204-270`) |
| 0 | `ParatextBase/Themes/DockingTheme/ParatextDockingTheme.cs` | Investigation | `:31` installs `ParatextFloatWindowFactory` as the **only** float-window factory; `:180-216` builds the tab-bar right-click menu — "Dock window" (`:196`), "Open as a floating window" (`:203`), "Move to autohide" (`:210`) |
| 1 | `ParatextBase/ParatextWindows/ParatextWindow.cs` | Investigation | `:368-411` `ChangeDockState` dock↔float state machine; `:395-400` centers over the main form only when the in-memory `floatBounds` (`:49`) is null |
| 1 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Investigation | `:371-376` `IsDockStateValid` — the Ctrl gate: **without** Ctrl, Float is valid only while the pointer is outside `MainWindow.Bounds` |
| 1 | `Paratext/WindowCollection.cs` | Investigation | `:1209-1214` `OpenAsType.Floating`; `:1348-1354` `GetFloatWindowFromPersistString` restores bounds + pin state with **no** off-screen clamping |
| 2 | `PtxUtils.UI/Winforms/SnappingFormHelper.cs` | Investigation | 15px edge snapping to other Paratext forms and `Screen.FromControl(owner).WorkingArea` (`:31, 56-69`); unconditional — the `EnableFormSnapping` setting is never read |
| 2 | `PtxUtils.UI/DialogRestorer.cs` | Investigation | `:186-276` off-screen clamping and multi-monitor spanning rules; `:278-285` never restores minimized (PT-3114) |

**Corrections to common assumptions** (verified 2026-07-23 against `~/Paratext@master`):

- The docking library is **WeifenLuo.WinFormsUI.Docking (DockPanel Suite) v3.0.4.0**, a checked-in
  WinForms DLL (`ParatextBase/ParatextBase.csproj:186-189`) — **not** AvalonDock, which appears
  nowhere in the tree.
- "Always on top" is an **owner-window** relationship (`Owner = DockPanel.FindForm()`,
  `ParatextFloatWindow.cs:55-66`), **not** `TopMost` — a pinned float window sits above Paratext
  only, never above other applications. This is what produces the documented maximize-while-pinned
  taskbar trap (HelpData "What are the limitations of a floating window?").
- Float geometry persists **across restarts** (`Settings.Default.WindowCollectionMemento`,
  `Paratext/MainForm.cs:2423`) and into **named, shareable** layouts — pin state rides along as the
  float window's `PersistString`.
- The Open dialog's first-run "Open As" default is **Panel**, not Floating
  (`SelectScrTextsForm.cs:850`), despite a stale XML doc comment at `OpenAsType.cs:11` saying
  otherwise. 17 tools hard-code `OpenAsType.Floating` with no user choice.

**Additional HelpData Items** (floating chrome; `Paratext/HelpData.xml`):
- ID: `7554630d-9d2a-43d5-bac9-2210b054bf11` - "What is a floating window?" (line 23634)
- ID: `95609de1-987e-4da4-bc8b-6b1d507bad09` - "What are the limitations of a floating window?" (line 2676)
- ID: `cb4d28bc-093e-463e-8a36-6fc4eec861ef` - "Where do items open in Paratext?" (line 15339)

**Autohide area** (sub-feature) — added 2026-07-23 by the Quick-Reference & Autohide investigation.
This sub-feature previously appeared in **one cell** of this file (the floating-window addendum's
tab-bar menu row) and in none of 1.6's Sub-Features, Implementation, UI Entry Points or HelpData
lists — which led a PRD to assert that autohide "has no PT9 source-file citation … the only source
is a HelpData description of end-user behavior, not implementation." **That assertion is refuted:**
there is a dedicated flyout class, a ~400-line hand-written strip, a user setting, unit tests, a BVT
test, and 17 HelpData items.

What it is: a **right-edge-only overlay dock zone of the single main-window `DockPanel`**. Any
`ParatextWindow` may be moved there; its tab collapses to a 16×16 icon in a vertical strip pinned to
the right edge **of the main window** (not of the screen), and clicking the icon slides out a flyout
that **overlays** — does not re-flow — the document area at **25% of the dock area's width** by
default, user-resizable by a splitter.

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/Themes/DockingTheme/ParatextDockingTheme.cs` | Investigation | `:207-212` "Move to autohide" → `ChangeDockState(DockState.DockRightAutoHide)` (loc key `ParatextDockingTheme_3`); `:193-198` "Dock window" → `ChangeDockState(DockState.Document)`; `:742-1150` **`ParatextAutoHideStrip : AutoHideStripBase`** — sizes (`:745-748`, collapsed 20/28 at `:772, 868`, expanded 90), `MeasureHeight()` returns 0 when empty (`:834-843`), `AllTabs` = right-autohide panes only (`:821-822`), scrollbar overflow (`:811-819, 1108-1137`), tooltips (`:899-923`), expand/collapse + persist (`:952-991`), paint incl. badges (`:993-1071`) |
| 0 | `ParatextBase/Themes/DockingTheme/ParatextAutoHideWindow.cs` | Investigation | 78 lines — `ParatextAutoHideWindow : DockPanel.AutoHideWindowControl`; `AnimateTime = 140` ms (`:11`); `DisplayingRectangle`/`OnLayout` overrides; per-edge splitter (`:47-62`); non-active panes parked off-screen at `x = -width` (`:64-73`) |
| 0 | `ParatextBase/ParatextWindows/ParatextWindow.cs` | Investigation | `:368-411` `ChangeDockState` state machine (accepts only `DockRightAutoHide`/`Document`/`Float`, else throws); **`:138-168` `MakeActive()`** — the single auto-activate funnel: `if (Pane.IsAutoHide) DockPanel.ActiveAutoHideContent = this`, then a *deferred* `DockHandler.Activate()` (calling `Activate()` alone would collapse the flyout); `:574-578, 684-695` lazy load — autohidden content defers `LoadWindow()` to `OnActivated` |
| 0 | `ParatextBase/Themes/DockingTheme/SendReceiveBadgeHelper.cs` | Investigation | 100 lines — the **colored dot**: 10px filled ellipse drawn iff a Send/Receive **update is available** for the project/resource. Set by `Paratext/Repository/AutoSendReceiveManager.cs:430-449`, cleared by performing a Send/Receive (`:197-210`). **Unrelated to activation** |
| 0 | `ParatextBase/Themes/DockingTheme/ScrollGroupBadgeHelper.cs` | Investigation | 93 lines — scroll-group letter badge on strip icons; its visibility raises the collapsed strip from 20 to 28 px |
| 1 | `Paratext/WindowCollection.cs` | Investigation | `:1234-1238` `OpenAsType.AutoHide`; `:650-652` `ResetAutoHideStripWindow()` before layout load (**PTXS-20868**, z-order fix); `:698-705` re-seeds `Pane.ActiveContent` for autohide panes saved with none (**PTX-18050**, invisible-pane fix); `:675-679` force-resets `Dock*Portion` to 0.25 after load; `:884-894` deferred invalidate on close; `:1204-1205` new-tab anchoring skips autohide panes |
| 1 | `Paratext/EditMenu/ListForm.cs` | Investigation | `:900-912` the **canonical auto-activate referrer** — a Results-list selection calls `ptw.MakeActive()` then scrolls to the match |
| 1 | `ParatextBase/ParatextWindows/WindowStackManager.cs` | Investigation | `:124-133, 199-217` undo-layout-change snapshot/restore of autohide panes incl. `AutoHidePortion` |
| 1 | `ParatextBase/ParatextWindows/WindowManagerHelper.cs` | Investigation | `:206-207` `FirstActiveWindow` excludes autohidden windows — they don't drive the main toolbar |
| 1 | `ParatextBase/CommonForms/SelectScrTextsForm.Designer.cs` | Investigation | `:414` the Open dialog's "Open As → **Autohide**" option (`OpenAsType.AutoHide = 4`, `ParatextBase/ParatextWindows/OpenAsType.cs:40-44`) |
| 1 | `ParatextBase/SharedSettings/Settings.Designer.cs` | Investigation | `:152-162` user setting `AutoHideBarExpanded` (default `False`) — strip expanded (90px, icon+label) vs collapsed (icon only) |
| 1 | `ParatextBase/MegaMenu/MegaMenuButton.cs` | Investigation | `:122-191` sets `HideWhenMouseLeaves = false` while a menu is open so the flyout doesn't collapse under it; same pattern in `Paratext/ParallelPassages/ParallelPassagesTool.cs:516-523` |
| 2 | `ParatextBase/WeifenLuo.WinFormsUI.Docking.dll` | Investigation | **v3.0.4.0, binary only — no source in tree.** Owns flyout geometry (`DockPanel.AutoHideWindowRectangle`), `DockContentHandler.AutoHidePortion` (default `0.25`), the mouse-leave collapse timer, and XML persistence of `DockState` + `AutoHidePortion`. Reproduce with `ilspycmd -t WeifenLuo.WinFormsUI.Docking.DockPanel <dll>` |
| — | `Paratext.Tests/WindowMenu/WindowCollectionTests.cs` | Investigation | `:538-613` three `[TestCase]`-driven undo-layout tests covering `DockRightAutoHide`; `UserInterfaceTests/BVTRepository9_1.cs:38` drives the "Move to autohide" context item |

**Autohide UI entry points** — there is **no** application-menu command, toolbar button, keyboard
shortcut, or drag gesture that enters autohide:
- Tab-bar right-click > **"Move to autohide"** (also available from a *floating* window's tab bar)
- Tab-bar right-click > **"Dock window"** on an expanded flyout — returns it to a docked panel
- Open dialog > "Open As" > **Autohide**
- Click an icon in the strip to expand; click the active icon again to collapse
- The strip's expand/collapse arrow (icon-only ⇄ icon+label), persisted in `AutoHideBarExpanded`
- ≡ main menu > Window > *(window name)* — `MakeActive()`, which expands an autohidden window

**Corrections to common assumptions** (verified 2026-07-23):

- **The strip is at the right edge of the main window**, not of the screen, and consumes
  `DockPadding.Right` (~23 px) once anything is autohidden. It measures 0 and is invisible when empty.
- **The flyout is 25% of the dock area** (the `DockPanel`'s client rect minus its padding, including
  the strip) — **not 25% of the screen**, as HelpData `ac545da7` loosely says. Clamped to
  `dockArea.Width - 24`, user-resizable by a 4 px splitter, per-content and persisted into layouts —
  but re-seeded to 0.25 on every fresh move into autohide.
- **The colored dot means "a Send/Receive or resource update is available"**, not "something
  referred to this window". Nothing connects the badge to activation. HelpData: *"The dot remains
  until you Send/Receive the project."*
- **Auto-activate is real** and funnels through `ParatextWindow.MakeActive()` (~40 call sites); the
  Results-list path is the one HelpData describes. The flyout then stays open until the mouse-leave
  rule fires — there is no timed auto-collapse.
- **Re-collapse** is a mouse-leave timer (2 × `MouseHoverTime`, ~800 ms) that is **disabled while
  the flyout's pane is activated** — so a focused flyout never auto-collapses. Hover-to-expand is
  **off** (`ShowAutoHideContentOnHover = false`, set in two places).
- **Autohide state IS persisted** — per-content `DockState`/`AutoHidePortion` into both the restart
  memento and named/shareable layouts.
- **Any `ParatextWindow` can be autohidden** (`DockAreas` is set once in the base class and
  overridden nowhere); there is no cap — overflow adds a scrollbar. Biblical Terms Renderings and a
  back-translation are eligible, but autohide is **not** their default placement; the user moves
  them there.
- **Right edge only in practice.** The plumbing is edge-agnostic but nothing routes to the other
  three; a window reaching `DockLeft/Top/BottomAutoHide` would render no strip icon and be
  unreachable.
- Content is **lazily loaded on first expand and then kept alive** — never unloaded while collapsed.

**Autohide HelpData Items** (`Paratext/HelpData.xml`; 17 items mention autohide):
- ID: `ac545da7-b7dd-4d2a-8102-160ddcc85a74` - "What is the autohide area and what is it for?" (line 5562)
- ID: `bb04b325-539c-48b3-ad53-313a339203be` - "How do I arrange open items in Paratext?" (line 24544;
  section "Move to or from autohide" at `:24624`, right-click-menu inventory at `:24605-24616`)
- ID: `cb4d28bc-093e-463e-8a36-6fc4eec861ef` - "Where do items open in Paratext?" (`:15384` documents
  the Open-dialog autohide option)
- ID: `f47bd6e2-4747-4fd6-add4-0cb4864c9e43` (line 20106) / `199ecab8-4f56-4453-9940-69ab35575f93`
  (line 22279) - the colored dot, for projects and for resources respectively
- IDs `e804749d-8c0c-48c1-9605-2a554592169c` (1865) and `1a140dc5-0380-440d-8d1f-d5a88fe1c7af`
  (25624) - shared/modified layouts explicitly include autohide contents

**UI Entry Points**:
- ≡ Paratext > Layout > Save current layout
  - Menu Structure: `MainForm`, handler `saveTextCombinationToolStripMenuItem_Click`, line 1357
  - File: `Paratext/MainForm.cs`
  - Manual: `../paratext-manual/chapters/02_organizing_desktop.md`, line 113
  - Quote: "**≡ Paratext**, under **Layout** > **Save current layout**"
  - HelpData ID: `aad37193-723a-4ffc-9026-7e42c8f82590`
  - Dialog: `SaveTextCombinationsForm`
  - Question: "How do I save a layout of open items?"
- ≡ Paratext > Layout > Manage layouts
  - Menu Structure: `MainForm`, handler `manageLayoutsToolStripMenuItem_Click`, line 1370
  - File: `Paratext/MainForm.cs`
- ≡ Paratext > Window > Arrange into columns/rows
  - Manual: `../paratext-manual/chapters/02_organizing_desktop.md`, line 93
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
| Manual | `../paratext-manual/chapters/04_keyboarding.md`: "use the **Find** feature to look for a word" | `[M]` |
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
  - Manual: `../paratext-manual/chapters/04_keyboarding.md`, line 44
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
- Floating popup window (always separate) — hosted in `ParatextFloatWindow`, so it inherits the
  full float chrome: title bar, "Always on top" pushpin, and a nav toolbar (back/forward, scroll
  group, project/resource combo, BCV verse control)
- Does not affect main scroll position (`ScrollGroup.None` at creation — but the user may join it
  to a group afterwards; the scroll-group button stays enabled)
- **Singleton** — at most one Quick Reference window exists; a second request re-targets the
  existing one and focuses its editor
- Opens from clickable reference icons, and from five further entry points (below)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Quick reference`; Handler: `quickReferenceToolStripMenuItem_Click`; Owner: `ParatextWindowWithMenus`; Shortcut **Ctrl+Q** | `[MS]` |
| Manual | Keyboard shortcuts documentation | `[M]` |
| HelpData | Keyword: `ComponentQuickReferenceWindow`; 2 items | `[H]` |
| Code | `WindowCollection.OpenQuickModeWindow` + 5 NUnit tests | `[C]` |

**Key Quote** (from HelpData):
> "A Quick Reference window is a text window which does not scroll together with any other open items"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/WindowCollection.cs` | Investigation | `:277-304` **`OpenQuickModeWindow(ScrText, VerseRef)`** — the whole feature. Singleton field `:75`; `new TextForm(true)`; `ScrollingGroup = ScrollGroup.None` (`:283`); `ShowWindow(…, OpenAsType.Floating)` (`:288`); re-target branch `:291-299`; cleared on close `:876-877` |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `quickReferenceToolStripMenuItem_Click` at **line 380**; Designer `:830` `ShortcutKeys = Keys.Control \| Keys.Q`, `:832` text, `:742` parent menu; enablement gate `:164` (Scripture projects only) |
| 0 | `Paratext/TextForm.cs` | Investigation | `:182-192` `TextForm(bool isQuickMode, …)`. The flag changes exactly **two** things: caption suffix `" (Quick Reference)"` (`:649-650`) and copyright-banner suppression (`:4117`) |
| 0 | `ParatextBase/Themes/DockingTheme/ParatextFloatWindow.cs` | Investigation | the hosting float chrome — see the 1.6 floating-window addendum |
| 1 | `ParatextInternalShared/ScriptureEditor/ScriptureViewSource.cs` | Investigation | `:315-335` `GetDefaultScriptureView` — decides which view the popup renders in |
| 1 | `Paratext/Checking/Reference/ReferenceAnnotation.cs` | Investigation | `:55-62` `Click` → `OpenQuickModeWindow`; `:40-53` valid vs invalid icon/style; `:68` hover text |
| 1 | `Paratext/Checking/Reference/ReferenceAnnotationSource.cs` | Investigation | produces the clickable icons; registered per-project at `TextForm.cs:904-911` |
| 1 | `ParatextBase/ParatextWindows/WindowCollectionBase.cs` | Investigation | `:144` abstract `OpenQuickModeWindow`; `:22-39` `OpenWindowBehavior.QuickReference` |
| 1 | `CorePluginInterfaces/IPluginHost.cs` | Investigation | `:52-73` public plugin API for opening a Quick Reference window |
| — | `Paratext.Tests/WindowMenu/WindowCollectionTests.cs` | Investigation | `:866, 995, 1092, 1190, 1286` — asserts singleton reuse, `ScrollGroup.None`, `DockState.Float` |

**UI Entry Points** (the inventory previously listed 2 of 8):
- ≡ Tab > Tools > Quick reference — **Ctrl+Q** (`ParatextWindowWithMenus.cs:380`; enabled only for
  Scripture projects). HelpData `747ceec6-…`
- Click a **valid** reference icon in the text (`ReferenceAnnotation.cs:55-62`; the red-X invalid
  icon is inert). HelpData `daad5fd1-…`
- Results list > View > **Quick reference mode**, then double-click / Alt+↑ / Alt+↓ a result
  (`Paratext/EditMenu/ListForm.cs:720-728, 904-908`; persisted in `Settings.Default.List_UseQuickMode`)
- Find/Replace > **"Quick Reference Mode"** checkbox — seeds the Results list it creates
  (`Paratext/EditMenu/FindReplaceForm.cs:766-769`)
- Project-qualified `link:ref:prj:…` hyperlink click in the editor
  (`Paratext/TextForm.cs:2722-2735` — only when the link supplied a `ScrText`; otherwise the main
  window navigates instead)
- Link click in an XML-resource window (`Paratext/XmlResource/XmlResourceWindow.cs:1290-1300`)
- `quickref:` link click in an Enhanced Resource / Marble window
  (`Paratext/Marble/MarbleForm.cs:2059-2063`; markup `quickref:` + zero-padded `BBBCCCVVV`)
- Plugin API `OpenWindowBehavior.QuickReference` (`ParatextBase/Plugins/ParatextPluginUtils.cs:154`)

**Corrections** (verified 2026-07-23 against `~/Paratext@master` by the autohide/Quick-Reference
investigation):

- The handler is at **`ParatextWindowWithMenus.cs:380`**, not 363 — the file has drifted. Both the
  old Implementation row and the old UI-Entry-Point row cited 363.
- **"No dedicated dialog class / HelpData-documented behavior only" is wrong.** There is no class
  *named* `QuickReference*`, but the feature is concrete code: `WindowCollection.OpenQuickModeWindow`
  (with an abstract seam in `WindowCollectionBase`), a singleton field, a dedicated
  `OpenWindowBehavior.QuickReference` enum value with XML docs, a public plugin API, and five NUnit
  tests. The window itself is `TextForm(isQuickMode: true)` hosted in `ParatextFloatWindow`.
- **The popup does NOT render in "Unformatted" view.** `OpenQuickModeWindow` resolves the view via
  `ScriptureViewSource.GetDefaultScriptureView` (`:315-335`): **`Standard`** for an editable
  Scripture project, **`Formatted`** for a resource / any non-editable project, `Study Bible` /
  `Study Bible Additions` for those project types, and `Standard Specification` on a book with a
  Bible-module association. `"Unformatted"` appears nowhere on the Quick Reference path.
- **Ctrl+Q is sourced twice** — `ParatextWindowWithMenus.Designer.cs:830` and the HelpData shortcut
  list (`HelpData.xml:8477`, "Ctrl + Q = Open Quick Reference window").
- The window is **not read-only** and not view-restricted by virtue of being quick-mode; it is an
  ordinary text window in a float window.
- Quick-mode-ness **does not survive a layout save/restore**: `TextFormMemento` has no quick-mode
  field and the restore path uses the parameterless ctor (`isQuickMode = false`), so a restored
  window comes back as a plain floating `TextForm` and is no longer the singleton.
- **Standard vs Unformatted**, verbatim from `ParatextInternalShared/ScriptureViews/*.xml`:
  Standard has the Notes secondary pane (footnote pane) and `StyleDropdownEnabled` true;
  Unformatted has neither, plus `DoMapping=false`, `UseMarkerPopup=false`, `PreserveWhitespace=true`.
  "Marker validation" is **not** a view setting — the nearest is `UseMarkerPopup`, which gates the
  marker *autocomplete* dropdown.
- PT9 defines **21** scripture views, 13 user-selectable; the commonly-cited five (Preview, Basic,
  Formatted, Unformatted, Standard) are what `TextForm.IsViewSelectable` leaves for a plain editable
  translation on a canonical, non-module book.

**HelpData Items**:
- ID: `747ceec6-54f3-4a94-8b71-157492cb2ac6` - "How do I open a Quick Reference window?" (line 15321)
- ID: `daad5fd1-67ba-40f0-96bb-7f570e165755` - "What is a Quick Reference window?" (line 29661)
- ID: `cb4d28bc-093e-463e-8a36-6fc4eec861ef` - "Where do items open in Paratext?" (line 15339) —
  Quick Reference heads the "always open as a floating window" list
- `HelpData.xml:8477` - keyboard-shortcut list entry for Ctrl+Q

**Validation**: [MS] - - [M] [H] [C] — Last verified: 2026-07-23

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
| Manual | `../paratext-manual/chapters/24_finalizing.md`, line 55: "From the **Insert** menu, choose **Figure**" | `[M]` |
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
  - Manual: `../paratext-manual/chapters/24_finalizing.md`, line 55
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
| HelpData | Keyword: `ComponentFootnotes`; Dialog: `FootnotePropertiesForm` | `[H]` |
| Manual | `../paratext-manual/chapters/04_keyboarding.md`: Insert menu | `[M]` |

**Key Quote** (from Requirements):
> "USFM supports not only verse text, but many supporting elements as well, including but not limited to introductory material, sidebars, footnotes, cross references, end notes, figures, and tables."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `footnoteToolStripMenuItem_Click` at line 1761 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `endNoteToolStripMenuItem_Click` at line 1771 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `InsertEfMarkerButtonOnClick` at line 4531 |

**UI Entry Points**:
- ≡ Tab > Insert > Footnote
  - Menu Structure: `TextForm`, handler `footnoteToolStripMenuItem_Click`, line 1761
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > End note
  - Menu Structure: `TextForm`, handler `endNoteToolStripMenuItem_Click`, line 1771
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > Extended footnote
  - Menu Structure: `TextForm`, handler `InsertEfMarkerButtonOnClick`, line 4531
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > Extended end note
  - Menu Structure: `TextForm`, handler `extendedEndNoteToolStripMenuItem_Click`, line 1734
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
| HelpData | Keyword: `ContentInsertCrossReference`; Dialog: `CrossReferencePropertiesForm` | `[H]` |
| Manual | `../paratext-manual/chapters/04_keyboarding.md`: Insert menu | `[M]` |

**Key Quote** (from Requirements):
> "USFM supports not only verse text, but many supporting elements as well, including but not limited to introductory material, sidebars, footnotes, cross references, end notes, figures, and tables."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `crossReferenceToolStripMenuItem_Click` at line 1766 |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `InsertExMarkerButtonOnClick` at line 4520 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `extractCrossReferencesToolStripMenuItem_Click` at line 472 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `insertCrossReferencesToolStripMenuItem_Click` at line 507 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `insertMissingOriginReferencesToolStripMenuItem_Click` at line 566 |

**UI Entry Points**:

*Interactive Insertion:*
- ≡ Tab > Insert > Cross-reference
  - Menu Structure: `TextForm`, handler `crossReferenceToolStripMenuItem_Click`, line 1766
  - File: `Paratext/TextForm.cs`
- ≡ Tab > Insert > Extended cross reference
  - Menu Structure: `TextForm`, handler `InsertExMarkerButtonOnClick`, line 4520
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
| Manual | `../paratext-manual/chapters/04_keyboarding.md`, line 63: "You can use ≡ Tab under View > Highlight Invalid Characters" | `[M]` |
| Manual | `../paratext-manual/chapters/08_spell_check.md`, line 21: "Work through your text with red squiggly lines" | `[M]` |

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
  - Manual: `../paratext-manual/chapters/08_spell_check.md`, line 21
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
## Notes

- FormattedEditor is at repo root (`FormattedEditor/`), not under `Paratext/`
- BCV navigation is toolbar-based with implementation in MainForm (line 329: Reference property, line 407: GotoReference method)
- Quick Reference menu item is in `ParatextWindowWithMenus` (base class), inherited by all windows
- Find/Replace has richest evidence chain showing UI → Logic → Data layers
- **Autocorrect**: Accessed via Project > Project settings > Quotation rules (not a dedicated menu item). Also uses autocorrect.txt file in project folder for custom replacements.
- All UI Entry Points now include `ownerForm` specification (menu inheritance: each menu item records its owning form)
- TextForm menus are owned by TextForm; ParatextWindowWithMenus menus are owned by that base class
- The distinction between ownerForm is critical: menus with same path from different forms are DIFFERENT menus

---
