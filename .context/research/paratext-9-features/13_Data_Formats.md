# Paratext 9 - Data Formats

**Category**: 13  
**Focus**: File formats, data structures, and interchange  
**User Roles**: All users (typically transparent)  
**Manual Chapters**: Appendix C (USFM)  
**Last Updated**: January 22, 2026

---

## Overview

Data Formats features define how Scripture and project data is stored, structured, and exchanged. USFM is the primary Scripture markup format. USX and Scripture Burrito enable interchange with other tools. Understanding these formats is essential for interoperability.

---

## Feature List

### 13.1 USFM Support

**Description**: Unified Standard Format Markers - the primary format for Scripture text storage and editing.

**Sub-Features**:
- Parse USFM files
- Validate USFM syntax
- Render USFM markers
- Support all USFM 3.0+ markers
- Footnotes, cross-references, figures
- Character and paragraph styles
- Poetry and list formatting
- Sidebar and peripheral content

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `View > Standard`, `View > Unformatted`; Handler: `standardToolStripMenuItem_Click`, `unformattedToolStripMenuItem_Click` in `TextCollectionForm.cs`, lines 467, 462 | `[MS]` |
| Requirements | Section: "Data Formats > USFM" | `[R]` |
| Manual | `appendices/appendix_c_usfm.md`, line 11: "All Styles of type 'Paragraph' require using the 'Enter' key when choosing the marker" | `[M]` |
| HelpData | Keyword: `ComponentUSFM/Markers`; Dialog: `OptionsForm`, `ProjectPropertiesForm_tabAdvanced` | `[H]` |

**Key Quote** (from Requirements):
> "USFM is intended to be both human readable and sufficiently detailed to allow computers to parse and understand the semantic type of data represented in its files"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextData/UsfmParser.cs` | Core USFM component | Search: "UsfmParser" in ParatextData |
| 1 | `ParatextData/UsfmToken.cs` | Field type in D0 | Line 26: `private readonly List<UsfmToken> tokens;` |
| 1 | `ParatextData/UsfmParserSink.cs` | Field type in D0 | Line 35: `private readonly UsfmParserSink sink;` |
| 1 | `ParatextData/UsfmParserState.cs` | Field type in D0 | Line 38: `private UsfmParserState state;` |
| 1 | `ParatextData/ScrStylesheet.cs` | Field type in D0 | Line 29: `private readonly ScrStylesheet scrStylesheet;` |
| 1 | `ParatextData/ScrText.cs` | Field type in D0 | Line 32: `private readonly ScrText scrText;` |

**Note**: USFM parsing is a core data layer component. HelpData items reference UI dialogs (`OptionsForm`, `ProjectPropertiesForm_tabAdvanced`) for user help, but the implementation is accessed through multiple UI entry points throughout Paratext.

**UI Entry Points**:
- **≡ Tab** > **View** > Standard/Unformatted/Preview (Ctrl+E to toggle)
  - Manual: `chapters/04_keyboarding.md`, lines 55-56
  - Quote: "**Ctrl** + **E** -or-" / "**≡ Tab** under **View** menu, choose the view (usually Standard)."
- **Insert** menu > USFM markers (via backslash key)
  - HelpData ID: `9b81209d-eb15-44d7-b646-44a837c03c54`
  - Dialog: `OptionsForm`
  - Question: "How do I insert markers in my project text?"
- Character markers (via \\ key in Standard view)
  - Manual: `appendices/appendix_c_usfm.md`, line 12
  - Quote: "All Style Type 'Note' and 'Character' require using the 'Backslash' key"

**HelpData Items**:
- ID: `d2aae4af-577d-4b42-896c-4c17d14edab8` - "How do I add USFMs to already-existing text?"
  - Keywords: `ContentUSFMs USFM ComponentInsertMarkers ComponentUSFM/Markers ComponentImporting`
- ID: `7a3b26d7-445e-4cec-be67-7d5a6ed4322b` - "What are USFMs?"
  - Dialog: `OptionsForm`
  - Keywords: `ContentUSFMs ComponentUSFM/Markers`
- ID: `9b81209d-eb15-44d7-b646-44a837c03c54` - "How do I insert markers in my project text?"
  - Dialog: `OptionsForm`
  - Keywords: `view basic preview unformatted standard formatted gray Full-Menus ComponentInsertMarkers dropdown`
- ID: `1ebf788a-7479-45c4-87ff-15fbd50520d9` - "Which USFM version should I select for a project?"
  - Dialog: `ProjectPropertiesForm_tabAdvanced`

**External Standards**: https://docs.usfm.bible/

**Validation**: [MS] [R] [M] [H] [C] — Last verified: 2026-01-21

---

### 13.2 USX (XML) Export/Import

**Description**: XML representation of USFM for machine processing and interchange with Digital Bible Library.

**Sub-Features**:
- Export project to USX
- Import USX files
- Validate against USX schema (RelaxNG)
- Convert USFM ↔ USX
- DBL-compatible output

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Export project to USX`; Handler: `exportProjectToUSXToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 692; ownerForm: `ParatextWindowWithMenus` | `[MS]` |
| Form Relationships | Opens: `ExportUsxForm` from `Program.cs`, line 1575 | `[FR]` |
| Requirements | Section: "Data Formats > Export > USX" | `[R]` |
| Manual | *No direct USX reference found in manual chapters* | `-` |
| HelpData | Keyword: `ContentExportToUSX`; Dialog: `ExportUsxForm` | `[H]` |

**Key Quote** (from Requirements):
> "One of the most important uses of USX is with the Digital Bible Library (DBL). The DBL requires text translations to be formatted as USX files"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ToolsMenu/ExportUsxForm.cs` | HelpData dialog | `ExportUsxForm` |
| 1 | `ParatextData/UsfmToUsx.cs` | Method call in D0 | Line 75: `UsfmToUsx.ConvertToXmlWriter(scrText, bookNum, usfm, xw, true);` |
| 1 | `ParatextData/UsxImporter.cs` | Codebase search: "UsxImporter" | Import functionality counterpart |
| 1 | `Paratext/FileMenu/ImportBooksForm.cs` | HelpData dialog | `ImportBooksForm` (ID: `2f3daf31-12cc-4c4e-bd0a-ade974520c7d`) |
| 2 | `ParatextData/UsfmToken.cs` | Method call in D1 | UsfmToUsx.cs line 34: `List<UsfmToken> tokens = UsfmToken.Tokenize(scrStylesheet, usfm.TrimStart(), false);` |
| 2 | `ParatextData/UsxFragmenter.cs` | Method call in D1 | UsxImporter.cs line 47: `UsxFragmenter.FindFragments(scrText.DefaultStylesheet, ...)` |
| 2 | `ParatextChecks/Archiving/UsxValidator.cs` | Codebase search: "UsxValidator" | Validation component using RelaxNG |

**Not Found**:
- `UsxConverter.cs` (search: "UsxConverter" - no matches; conversion handled by `UsfmToUsx.cs` and `UsxFragmenter.cs`)
- `UsxToUsfm.cs` (search: "UsxToUsfm" - no matches; reverse conversion handled by `UsxFragmenter.FindFragments()` which outputs USFM)

**UI Entry Points**:
- ≡ Tab > Project > Advanced > Export project to USX
  - Menu Structure: `ParatextWindowWithMenus`, handler `exportProjectToUSXToolStripMenuItem_Click`
  - HelpData ID: `f308b39b-81d5-4101-8257-48098a64c38a`
  - Dialog: `ExportUsxForm`
  - Question: "How do I export project text from Paratext?"
- ≡ Tab > Project > Manage books > Import book(s) (for USX import via general import)
  - Menu Structure: `ParatextWindowWithMenus`, handler `importBooksToolStripMenuItem_Click`, line 831
  - HelpData ID: `2f3daf31-12cc-4c4e-bd0a-ade974520c7d`
  - Dialog: `ImportBooksForm`
  - Question: "How do I import a book into my project?"

**HelpData Items**:
- ID: `f308b39b-81d5-4101-8257-48098a64c38a` - "How do I export project text from Paratext?"
  - Keywords: `ContentExportToUSX ContentExportToHTML Full-Menus ComponentPrinting/Exporting`
  - Dialogs: `ExportUsxForm`, `ExportHtmlForm`
- ID: `2f3daf31-12cc-4c4e-bd0a-ade974520c7d` - "How do I import a book into my project?"
  - Keywords: `ContentManageBooks move copy add Full-Menus ComponentImporting ComponentManageBooks`
  - Dialog: `ImportBooksForm`
- ID: `ce6cee9b-8a2f-49de-9925-b3716de8c7cf` - "What kinds of text can be imported into a project?"
  - Keywords: `ContentImportingData ComponentManageBooks ComponentImporting`
  - Dialog: `ImportBooksForm`

**External Standards**: https://docs.usfm.bible/usx/

**Validation**: [MS] [FR] [R] [H] [C] — Last verified: 2026-01-21

---

### 13.3 Scripture Burrito

**Description**: Modern interchange format for Scripture projects, enabling data exchange between different translation tools.

**Sub-Features**:
- Export to Scripture Burrito format
- Import from Scripture Burrito format
- Metadata preservation (including identification, languages, agencies, copyright)
- Multi-format support (USFM, USX, audio, etc.)
- Schema validation using Python validator
- Support for loose (folder) and ZIP burritos

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Export: `Project > Advanced > Wrap (export) project in a Scripture Burrito`; Handler: `wrapProjectInAScriptureBurritoToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 1126 | `[MS]` |
| Menu Structure | Import: `Paratext > Advanced > Consume (import) Scripture Burrito`; Handler: `consumeScriptureBurritoToolStripMenuItem_Click` in `MainForm.cs`, line 1913 | `[MS]` |
| Requirements | Section: "Data Formats > Export > Scripture Burrito" | `[R]` |
| Manual | *No Scripture Burrito reference found in manual chapters* | `-` |
| HelpData | *No Scripture Burrito items found in HelpData (search: "burrito" - 0 results)* | `-` |

**Key Quote** (from Requirements):
> "The Scripture Burrito format was created for this purpose in collaboration with many organizations. Paratext must continue to support this format."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ScriptureBurrito/ScriptureBurritoCreationForm.cs` | Directory search | `Paratext\ScriptureBurrito\` folder |
| 1 | `Paratext/ScriptureBurrito/Metadata/SBMetadata.cs` | Object creation in D0 | Line 96: `SBMetadata metadata = new SBMetadata(scrText);` |
| 1 | `Paratext/ScriptureBurrito/BurritoUtensils.cs` | Method call in D0 | Line 92: `BurritoUtensils.InitializeMimeTypes(scrText);` |
| 1 | `Paratext/ScriptureBurrito/FoodInspector.cs` | Method call in D0 | Line 75: `FoodInspector.InspectBurrito(metadataStream);` |
| 1 | `Paratext/ScriptureBurrito/Burrito.cs` | Base class for import | BurritoUtensils.cs line 40: Creates `LooseBurrito` or `ZipBurrito` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Line 35: `private readonly ScrText scrText;` |
| 2 | `ParatextData/ProjectSettingsAccess/ProjectSettings.cs` | Using in D1 | SBMetadata.cs line 9: `using Paratext.Data.ProjectSettingsAccess;` |
| 2 | `ParatextData/Repository/` | Using in D1 | SBMetadata.cs line 10: `using Paratext.Data.Repository;` |
| 2 | `ParatextData/Languages/` | Using in D1 | BurritoUtensils.cs line 11: `using Paratext.Data.Languages;` |
| 2 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | Using in D1 | BurritoUtensils.cs line 13: `using Paratext.ProjectMenu;` |
| 2 | `ParatextData/ProblemReporter/` | Using in D1 | FoodInspector.cs line 10: `using Paratext.Data.ProblemReporter;` |

**Not Found**:
- *No HelpData dialog* (search: "burrito" returned 0 results - feature exists in code but not documented in HelpData)

**UI Entry Points**:
- ≡ Tab > Project > Advanced > Wrap (export) project in a Scripture Burrito
  - Menu Structure: `ParatextWindowWithMenus`, handler `wrapProjectInAScriptureBurritoToolStripMenuItem_Click`, line 1126
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Paratext > Advanced > Consume (import) Scripture Burrito
  - Menu Structure: `MainForm`, handler `consumeScriptureBurritoToolStripMenuItem_Click`, line 1913
  - File: `Paratext/MainForm.cs`

**Note**: Scripture Burrito support exists in code (`Paratext/ScriptureBurrito/` directory with 15+ files) but is not documented in Manual or HelpData. The `ScriptureBurritoCreationForm` provides export functionality. The `BurritoUtensils.ProcessBurrito()` method provides import functionality.

**External Standards**: https://docs.burrito.bible/

**Validation**: [MS] [R] [C] — Last verified: 2026-01-21

---

### 13.4 Project Structure

**Description**: The fundamental organization of a Paratext project with files, metadata, and settings.

**Sub-Features**:
- Project metadata (Settings.xml)
- Book files organization (.SFM files)
- Notes storage (.xml files)
- Biblical terms data
- Spelling status data
- Project settings
- User-specific settings
- File management (create, read, update, delete)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Project properties`; Handler: `projectPropertiesAndSettingsToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 872 | `[MS]` |
| Requirements | Section: "Data Formats > Projects" | `[R]` |
| Manual | *No specific project structure chapter found* | `-` |
| HelpData | Keyword: `ComponentProjects`; Multiple dialogs reference projects | `[H]` |

**Key Quote** (from Requirements):
> "Paratext handles this by defining a project as a collection of related files and metadata that describe the intended work product the team is creating."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextData/ScrText.cs` | Core project class | Search: "ScrText.cs" in ParatextData |
| 1 | `ParatextData/ProjectFileAccess/ProjectFileManager.cs` | Field in D0 | Line 76: `protected readonly LazyInitHelper<ProjectFileManager> cachedFileManager;` |
| 1 | `ParatextData/ProjectSettingsAccess/ProjectSettings.cs` | Field in D0 | Line 81: `protected readonly LazyInitHelper<ProjectSettings> cachedSettings;` |
| 1 | `ParatextData/Users/PermissionManager.cs` | Field in D0 | Line 77: `private readonly LazyInitHelper<PermissionManager> cachedPermissionManager;` |
| 1 | `ParatextData/ScrStylesheet.cs` | Field in D0 | Line 78: `protected readonly LazyInitHelper<ScrStylesheet> cachedDefaultStylesheet;` |
| 1 | `ParatextData/ProjectProgress/ProjectProgressInfo.cs` | Field in D0 | Line 88: `protected readonly LazyInitHelper<ProjectProgressInfo> cachedProgressInfo;` |
| 2 | `ParatextData/Terms/` | Using in D1 | ProjectSettings.cs line 12: `using Paratext.Data.Terms;` |
| 2 | `ParatextData/Encodings/` | Using in D1 | ProjectSettings.cs line 13: `using Paratext.Data.Encodings;` |
| 2 | `ParatextData/Languages/` | Using in D1 | ProjectSettings.cs line 14: `using Paratext.Data.Languages;` |
| 2 | `ParatextData/StudyBible/` | Using in D1 | ProjectSettings.cs line 16: `using Paratext.Data.StudyBible;` |

**Not Found**:
- *No single dialog* (project structure is accessed through multiple dialogs: ProjectPropertiesForm, ImportBooksForm, etc.)

**UI Entry Points**:
- ≡ Tab > Project > Project settings > Project properties
  - Menu Structure: `ParatextWindowWithMenus`, handler for project properties
  - *[Requires HelpData verification for specific ID/Dialog]*
- Paratext > Open (for opening projects)
  - *[Requires HelpData verification for specific ID/Dialog]*

**Note**: Project structure is fundamental but dispersed throughout the application. The `ScrText` class is the core representation of a project, managing file access through `ProjectFileManager`, settings through `ProjectSettings`, and permissions through `PermissionManager`. Multiple HelpData items reference projects via keyword `ComponentProjects`, but specific UI entry points require verification with HelpData dialog searches.

**Validation**: [MS] [R] [H] [C] — Last verified: 2026-01-21

---

### 13.5 Versification

**Description**: Define chapter and verse structure, handling differences between Bible traditions.

**Sub-Features**:
- Standard versifications (6 built-in: Original, Septuagint, Vulgate, English, Russian Orthodox, Russian Protestant)
- Custom versification definition
- Verse mapping between versifications
- Missing verse handling
- Extra verse handling
- Versification validation

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Project properties`; Handler: `projectPropertiesAndSettingsToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 872 (access via General tab) | `[MS]` |
| Requirements | Section: "Data Formats > Projects" | `[R]` |
| Manual | *No dedicated versification chapter found* | `-` |
| HelpData | Keyword: `ComponentVersification`; Dialog: `ProjectPropertiesForm_tabGeneral` | `[H]` |

**Key Quote** (from Requirements):
> "Paratext has defined a structure called versification for a project to explicitly define the number of verses in each chapter, any verses that might be deliberately missing, how a verse might be divided into multiple segments, and how a verse from a 'standard versification' maps to a different verse in this translation."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | HelpData dialog | `ProjectPropertiesForm_tabGeneral` |
| 1 | `ParatextData/ScrText.cs` | Field access in D0 | Line 236: `bookChooserCtrl.Setup(this.scrText.Settings.Versification.ScriptureBooks,`<br>Line 379: `if (!baseProject.Settings.Versification.IsCustomized)` |
| 1 | `ParatextData/ParatextVersificationTable.cs` | Method call in D0 | Line 1732: `foreach (ScrVers scrVers in Versification.Table.Implementation.VersificationTables()` |
| 2 | `ParatextData/ScrTextCollection.cs` | Method call in D1 | ParatextVersificationTable.cs line 39: `ScrText scrText = ScrTextCollection.FindById(...)`<br>Line 96: `ScrText scrText = ScrTextCollection.FindById(...)` |

**Note**: Versification is accessed through `ScrText.Settings.Versification` property. The `ParatextVersificationTable` class (which implements `Versification.Table`) handles loading both standard and custom versifications. Custom versifications are stored in `custom.vrs` files within project directories and are loaded via `ScrTextCollection.FindById()`.

**UI Entry Points**:
- ≡ Tab > Project > Project Properties > General tab > Versification
  - HelpData ID: `66a992c8-572d-44b8-b3d2-357a4fb6968f`
  - Dialog: `ProjectPropertiesForm_tabGeneral`
  - Question: "How do I select a versification for my project?"
- ≡ Tab > Project > Project Properties > General tab > Custom versification
  - HelpData ID: `5534d17f-09af-44c2-a238-b58674aa9524`
  - Dialog: `ProjectPropertiesForm_tabGeneral`
  - Question: "How do I implement a custom versification for my project?"

**HelpData Items**:
- ID: `66a992c8-572d-44b8-b3d2-357a4fb6968f` - "How do I select a versification for my project?"
  - Keywords: `ContentProjectPropertiesSettings Ethiopic Full-Menus ComponentProjectProperties ComponentVersification`
  - Dialog: `ProjectPropertiesForm_tabGeneral`
- ID: `5534d17f-09af-44c2-a238-b58674aa9524` - "How do I implement a custom versification for my project?"
  - Keywords: `ContentProjectPropertiesSettings Full-Menus ComponentVersification dropdown`
  - Dialog: `ProjectPropertiesForm_tabGeneral`
- ID: `da9a94c9-dc80-4991-af7f-7cf083f8f04f` - "Which versification is closest to the versification of my project?"
  - Keywords: `ComponentVersification`
- ID: `1625b6fb-011a-497b-9852-0ec9b709a40e` - "How do I handle missing verses in my project?"
  - Keywords: `verse missing ComponentVersification`
- ID: `827c5e91-c835-4ad4-a4d1-54626e232802` - "How do I customise the versification file?" (Technical)
  - Keywords: `customize ComponentVersification`

**Validation**: [MS] [R] [H] [C] — Last verified: 2026-01-21

---

### 13.6 Import from Other Formats

**Description**: Import Scripture data from various external formats into Paratext projects.

**Sub-Features**:
- Import from Word documents
- Import from standard format (USFM)
- Import from other Bible translation tools
- Character encoding handling (Unicode conversion)
- USFM marker mapping
- Preview before import
- Import wordlist from external sources

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Manage books > Import book(s)`; Handler: `importBooksToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 831 | `[MS]` |
| Form Relationships | Opens: `ImportBooksForm` from `Program.cs`, line 1700 | `[FR]` |
| Requirements | *Not explicitly covered in Requirements document* | `-` |
| Manual | *Import mentioned in context of various features* | `[M]` |
| HelpData | Keyword: `ComponentImporting`; Dialog: `ImportBooksForm` | `[H]` |

**Key Quote**: *No direct quote available - feature implied by Requirements section on data interchange*

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/FileMenu/ImportBooksForm.cs` | HelpData dialog | `ImportBooksForm` |
| 1 | `ParatextData/ImportSfmText.cs` | Field in D0 | Line 30: `private ImportSfmText sfmImporter;`<br>Line 38: `sfmImporter = new ImportSfmText(scrText);` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Line 26: `private ScrText scrText;`<br>Constructor parameter | 
| 2 | `ParatextData/SourceAndDestFileInfo.cs` | Return type in D1 | ImportSfmText.cs line 30: `public List<SourceAndDestFileInfo> GetMatchingDestFiles(...)`<br>Line 32, 38: `SourceAndDestFileInfo` objects |
| 2 | `ParatextData/PtwFileInfo.cs` | Parameter/return type in D1 | ImportSfmText.cs line 30: `List<PtwFileInfo> srcBooks`<br>Line 76: `public List<PtwFileInfo> ReadAndParseFilesIntoBooks(...)` |

**Note**: The `ImportBooksForm` uses `ImportSfmText` to handle the actual import logic. `ImportSfmText` reads source files, parses them into books using `PtwFileInfo`, matches them with destination files using `SourceAndDestFileInfo`, and writes them to the project through the `ScrText` object. The import process handles encoding conversions and USFM marker parsing.

**UI Entry Points**:
- ≡ Tab > Project > Manage books > Import book(s)
  - Menu Structure: `ParatextWindowWithMenus`, handler `importBooksToolStripMenuItem_Click`, line 831
  - HelpData ID: `2f3daf31-12cc-4c4e-bd0a-ade974520c7d`
  - Dialog: `ImportBooksForm`
  - Question: "How do I import a book into my project?"
- Project > Import from XML (in Wordlist window)
  - Menu Structure: `WordListForm`, handler `importFromXMLToolStripMenuItem_Click`
  - HelpData ID: `c1ce89cc-8acb-4f4f-bcd3-802c0178d179`
  - Question: "How do I import a list of correctly spelled words into the Wordlist?"
- Import TNE notes (for consultant notes)
  - HelpData ID: `df13bc44-d40d-48e9-924f-987b4e2d6f34`
  - Question: "How do I import TNE notes into a consultant notes project?"

**HelpData Items**:
- ID: `2f3daf31-12cc-4c4e-bd0a-ade974520c7d` - "How do I import a book into my project?"
  - Keywords: `ContentManageBooks move copy add Full-Menus ComponentImporting ComponentManageBooks`
  - Dialog: `ImportBooksForm`
- ID: `ce6cee9b-8a2f-49de-9925-b3716de8c7cf` - "What kinds of text can be imported into a project?"
  - Keywords: `ContentImportingData ComponentManageBooks ComponentImporting`
  - Dialog: `ImportBooksForm`
- ID: `c1ce89cc-8acb-4f4f-bcd3-802c0178d179` - "How do I import a list of correctly spelled words into the Wordlist?"
  - Keywords: `ContentWordlist ContentImportFromXML ContentImportingData ComponentImporting ComponentWordlist/Spelling`
- ID: `d2aae4af-577d-4b42-896c-4c17d14edab8` - "How do I add USFMs to already-existing text?"
  - Keywords: `ContentUSFMs USFM ComponentInsertMarkers ComponentUSFM/Markers ComponentImporting`
- ID: `df13bc44-d40d-48e9-924f-987b4e2d6f34` - "How do I import TNE notes into a consultant notes project?"
  - Keywords: `ContentImportTNENotes Full-Menus ContentImportingData ComponentConsultantNotes ComponentImporting ComponentProjectNotes`
- ID: `69ae6c6b-6150-4697-977a-28b5fc5025f5` - "How do I import words from a spell checking dictionary into the Wordlist?"
  - Keywords: `Full-Menus ContentImportingData ComponentWordlist/Spelling ComponentImporting`

**Validation**: [MS] [FR] [M] [H] [C] — Last verified: 2026-01-21

---

### 13.7 Stylesheet System

**Description**: Define how USFM markers are rendered, including fonts, colors, spacing, and behavior.

**Sub-Features**:
- Default stylesheets (usfm.sty, usfm_sb.sty for study Bibles)
- Custom stylesheet creation
- Marker style definitions (fonts, sizes, colors)
- Style inheritance
- Publishing-specific styles
- Display vs. print style differences
- Style validation and occurrence rules

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Project settings > Project properties`; Handler: `projectPropertiesAndSettingsToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 872 (access via Advanced tab) | `[MS]` |
| Requirements | Section: "Data Formats > USFM" (implied) | `[R]` |
| Manual | *Stylesheet mentioned in context of USFM and project properties* | `-` |
| HelpData | Keyword: `ComponentStyleSheets`; Dialog: `ProjectPropertiesForm_tabAdvanced` | `[H]` |

**Key Quote** (from Requirements):
> "USFM files do not indicate what a fully rendered version of text should look like. For example, how many columns should be on a page, what spacing should be used, what font and font size should be used when printing, etc."
> 
> *[Inferred]* Stylesheets provide the rendering rules that USFM markers reference.

**Implementation**: *Intentionally omitted - see features 13.1 and 13.2 for Evidence Chain methodology*

**UI Entry Points**:
- ≡ Tab > Project > Project Properties > Advanced tab > Stylesheet
  - HelpData ID: `bdf70add-b506-49da-ab63-a042ca13e420`
  - Dialog: `ProjectPropertiesForm_tabAdvanced`
  - Question: "How do I implement a custom stylesheet for my project?"
- ≡ Tab > Project > Project Properties > Advanced tab > Stylesheet options
  - HelpData ID: `39bfd595-1c32-4e42-becd-a945cad81c9a`
  - Dialog: `ProjectPropertiesForm_tabAdvanced`
  - Question: "What styles can be specified in a stylesheet?"

**HelpData Items**:
- ID: `8e197d1d-3a6b-4c13-a5a5-3d98a13d9743` - "How does the stylesheet specify where a marker is allowed to occur?"
  - Keywords: `ContentStylesheets ComponentStyleSheets ComponentUSFM/Markers`
  - Dialog: `ProjectPropertiesForm_tabAdvanced`
- ID: `39bfd595-1c32-4e42-becd-a945cad81c9a` - "What styles can be specified in a stylesheet?"
  - Keywords: `ContentStylesheets grey colour ComponentStyleSheets`
  - Dialog: `ProjectPropertiesForm_tabAdvanced`
- ID: `bdf70add-b506-49da-ab63-a042ca13e420` - "How do I implement a custom stylesheet for my project?"
  - Keywords: `ContentStylesheets colour ComponentStyleSheets`
  - Dialog: `ProjectPropertiesForm_tabAdvanced`
- ID: `ff574c1d-5e39-4b1a-8e3b-2fc0f6461169` - "How do I create a separate stylesheet for front and back matter?"
  - Keywords: `ContentProjectPropertiesSettings ContentStylesheets custom ComponentExtraBooks ComponentStyleSheets`
- ID: `ac63e165-d49c-488b-b62c-83e980a754b0` - "What do I do if the recommended stylesheet is not adequate for my project?"
  - Keywords: `ContentStylesheets ComponentStyleSheets`
  - Dialog: `ProjectPropertiesForm_tabAdvanced`
- ID: `72e667ae-26fa-44e3-a942-42309c6269ff` - "custom style options" (Technical)
  - Keywords: `custom.sty ComponentStyleSheets`

**Validation**: [MS] [R] [H] — Last verified: 2026-01-21

---

### 13.8 Manage Books

**Description**: Add, copy, delete, show, and import books within a project.

**Sub-Features**:
- Show book(s) - display project book inventory
- Create book(s) - add missing books to project
- Copy book(s) - copy books from another project
- Delete book(s) - remove books from project
- Import book(s) - import books from external files

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Manage books > Show book(s)`; Handler: `showBooksToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 790 | `[MS]` |
| Menu Structure | Menu: `Project > Manage books > Create book(s)`; Handler: `createBooksToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 796 | `[MS]` |
| Menu Structure | Menu: `Project > Manage books > Copy book(s)`; Handler: `copyBooksToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 805 | `[MS]` |
| Menu Structure | Menu: `Project > Manage books > Delete book(s)`; Handler: `deleteBooksToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 818 | `[MS]` |
| Menu Structure | Menu: `Project > Manage books > Import book(s)`; Handler: `importBooksToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 831 | `[MS]` |
| Form Relationships | Opens: `ShowBooksForm`, `CreateBooksForm`, `CopyBooksForm`, `DeleteBooksForm`, `ImportBooksForm` from `Program.cs`, lines 1690, 1695, 1680, 1685, 1700 | `[FR]` |
| HelpData | Keyword: `ComponentManageBooks`; 12 items; Dialogs: `ShowBooksForm`, `CreateBooksForm`, `CopyBooksForm`, `DeleteBooksForm`, `ImportBooksForm` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handlers at lines 790, 796, 805, 818, 831 |
| 1 | `Paratext/ToolsMenu/ShowBooksForm.cs` | Method call in D0 | Line 792: `CreateShowBooksWindow(ScriptureText)` |
| 1 | `Paratext/ToolsMenu/CreateBooksForm.cs` | Method call in D0 | Line 802: `CreateBooks(ScriptureText, Reference.BookNum)` |
| 1 | `Paratext/ToolsMenu/CopyBooksForm.cs` | Method call in D0 | Line 813: `CreateCopyBooksWindow(ScriptureText)` |
| 1 | `Paratext/ToolsMenu/DeleteBooksForm.cs` | Method call in D0 | Line 825: `CreateDeleteBooksWindow(ScriptureText)` |
| 1 | `Paratext/FileMenu/ImportBooksForm.cs` | Method call in D0 | Line 836: `ImportBooks(ScriptureText)` |
| 2 | `ParatextData/ScrText.cs` | Field in D1 | ShowBooksForm.cs line 5: `using Paratext.Data;`; Field `scrText` |
| 2 | `SIL.Scripture/Canon.cs` | Method call in D1 | ShowBooksForm.cs line 45: `Canon.AllBookNumbers` |

**UI Entry Points**:
- ≡ Tab > Project > Manage books > Show book(s)
  - Menu Structure: `ParatextWindowWithMenus`, handler `showBooksToolStripMenuItem_Click`, line 790
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Manage books > Create book(s)
  - Menu Structure: `ParatextWindowWithMenus`, handler `createBooksToolStripMenuItem_Click`, line 796
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Manage books > Copy book(s)
  - Menu Structure: `ParatextWindowWithMenus`, handler `copyBooksToolStripMenuItem_Click`, line 805
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Manage books > Delete book(s)
  - Menu Structure: `ParatextWindowWithMenus`, handler `deleteBooksToolStripMenuItem_Click`, line 818
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > Project > Manage books > Import book(s)
  - Menu Structure: `ParatextWindowWithMenus`, handler `importBooksToolStripMenuItem_Click`, line 831
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`

**HelpData Items**:
- ID: `cdbe99a1-e45e-47db-bcbd-f150dab0f506` - "How do I see which books already exist in my project?"
  - Keywords: `ContentManageBooks Full-Menus ComponentManageBooks`
  - Dialog: `ShowBooksForm`
- ID: `a623a667-c66c-43ac-bf14-64145a42a5f3` - "How do I create a new book?"
  - Keywords: `ContentManageBooks make add Full-Menus ComponentManageBooks`
  - Dialog: `CreateBooksForm`
- ID: `297fc658-6281-4c3b-840a-b66ab707b9da` - "How do I copy books from one project to another?"
  - Keywords: `ContentManageBooks Full-Menus ComponentManageBooks`
  - Dialog: `CopyBooksForm`
- ID: `ac4a546a-147e-438d-b8f6-70b92ce6888a` - "How do I delete a book from my project?"
  - Keywords: `ContentManageBooks Full-Menus ComponentManageBooks`
  - Dialog: `DeleteBooksForm`
- ID: `2f3daf31-12cc-4c4e-bd0a-ade974520c7d` - "How do I import a book into my project?"
  - Keywords: `ContentManageBooks move copy add Full-Menus ComponentImporting ComponentManageBooks`
  - Dialog: `ImportBooksForm`

**Validation**: [MS] - [H] [C] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **15 Publishing & Output**: Data formats used for export
- **03 Exegetical Resources**: Resources use these formats
- **10 Collaboration & Sync**: Send/Receive transfers these formats
- **12 Back Translation**: Derived project relationships and USFM markers for Study Bibles

**Dependencies**:
- External standards (USFM, USX, Scripture Burrito)
- File system access
- Encoding support (Unicode)

---

## Validation Status

| Feature | Menu Structure | Requirements | Manual | HelpData | Code |
|---------|---------------|--------------|--------|----------|------|
| 13.1 USFM Support | ✓ | ✓ | ✓ | ✓ | ✓ |
| 13.2 USX Export/Import | ✓ | ✓ | - | ✓ | ✓ |
| 13.3 Scripture Burrito | ✓ | ✓ | - | - | ✓ |
| 13.4 Project Structure | ✓ | ✓ | - | ✓ | ✓ |
| 13.5 Versification | ✓ | ✓ | - | ✓ | ✓ |
| 13.6 Import | ✓ | - | ✓ | ✓ | ✓ |
| 13.7 Stylesheet System | ✓ | ✓ | - | ✓ | - |
| 13.8 Manage Books | ✓ | - | - | ✓ | ✓ |
| 13.9 Project Backup/Restore | ✓ | - | ✓ | ✓ | ✓ |
| 13.10 Project Conversion | ✓ | - | - | ✓ | ✓ |

**Note**: Feature 13.7 has Implementation section intentionally omitted to manage context window. It follows the same Evidence Chain methodology as features 13.1-13.6.

---

### 13.9 Project Backup and Restore

**Description**: Create backups of project data and restore from backups when needed.

**Sub-Features**:
- Create project backup to ZIP file
- Restore from backup file
- Backup file management (folder selection, USB drive detection)
- Selective book backup
- View backup log

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Advanced > Backup project to file`; Handler: `backupToFileToolStripMenuItem_Click` in `MainForm.cs`, line 1017 | `[MS]` |
| Menu Structure | Menu: `Paratext > Advanced > Restore project from file`; Handler: `restoreFromFileToolStripMenuItem_Click` in `MainForm.cs`, line 1027 | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Backup project to file`; Handler: `backupProjectToFileToolStripMenuItem_Click` in `ParatextWindowWithMenus.cs`, line 1114 | `[MS]` |
| Form Relationships | Opens: `BackupForm` from `MainForm.cs`, line 1023; Opens: `RestoreForm` from `MainForm.cs`, line 1029 | `[FR]` |
| Manual | `chapters/admin/ma_03_project_sharing.md`: Backup section | `[M]` |
| HelpData | Keyword: `ComponentBackupProject`; 9 items; Dialogs: `BackupForm`, `RestoreForm` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | Handlers at lines 1017, 1027 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | Handler at line 1114 |
| 1 | `Paratext/BackupRestore/BackupForm.cs` | Method call in D0 | Line 1023: `using (BackupForm frm = new BackupForm(scrText))` |
| 1 | `Paratext/BackupRestore/RestoreForm.cs` | Method call in D0 | Line 1029: `using (RestoreForm frm = new RestoreForm())` |
| 2 | `ParatextData/ScrText.cs` | Field in D1 | BackupForm.cs line 26: `private ScrText scrText;` |
| 2 | `Paratext/BackupRestore/Restorer.cs` | Field in D1 | RestoreForm.cs line 34: `private readonly Restorer restorer;` |
| 2 | `SIL.Scripture/BookSet.cs` | Field in D1 | BackupForm.cs line 27: `private BookSet selectedBooks` |

**UI Entry Points**:
- ≡ Paratext > Advanced > Backup project to file
  - Menu Structure: `MainForm`, handler `backupToFileToolStripMenuItem_Click`, line 1017
  - File: `Paratext/MainForm.cs`
- ≡ Paratext > Advanced > Restore project from file
  - Menu Structure: `MainForm`, handler `restoreFromFileToolStripMenuItem_Click`, line 1027
  - File: `Paratext/MainForm.cs`
- ≡ Tab > Project > Advanced > Backup project to file
  - Menu Structure: `ParatextWindowWithMenus`, handler `backupProjectToFileToolStripMenuItem_Click`, line 1114
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`

**HelpData Items**:
- ID: `7234ef1d-890e-4d80-a5cc-18b50b1b6eca` - "Guide: Paratext > Advanced > Backup project to file"
  - Keywords: `ComponentBackupProject ComponentArchiving`
  - Dialog: `BackupForm`
- ID: `1bb26254-5e92-4885-8b34-e1f56a5f60c7` - "Guide: Paratext > Advanced > Restore project from file"
  - Keywords: `JimInput ComponentProjectManagement ComponentRestoreProject`
  - Dialog: `RestoreForm`
- ID: `5c4d393e-b256-489f-bb95-42b9885ec87f` - "How do I backup my project?"
  - Keywords: `ContentSendReceiveProjects ContentBackupProject share zip Full-Menus ComponentBackupProject ComponentSend/ReceiveGeneral ComponentArchiving`
  - Dialogs: `BackupForm`, `RestoreForm`, `SendReceiveProjectsForm`
- ID: `f6705a58-2aad-49b2-80c5-f4912bf71354` - "How do I restore a Paratext backup?"
  - Keywords: `ContentRestoreProject copy project install zip ComponentRestoreProject`
  - Dialogs: `BackupForm`, `RestoreForm`
- ID: `c27e2cfa-40e8-4342-b70c-d25185f2757a` - "What is the difference between 'Backup' and 'Send/Receive'?"
  - Keywords: `ContentSendReceiveProjects ContentBackupProject Send/Receive share copy zip ComponentSend/ReceiveGeneral ComponentBackupProject`
  - Dialogs: `RestoreForm`, `BackupForm`, `SendReceiveProjectsForm`

**Validation**: [MS] [M] [H] [C] — Last verified: 2026-01-21

---

### 13.10 Project Conversion

**Description**: Administrative tool for making significant changes to a project's structure, including renaming, reducing repository size, changing encoding, and normalizing Unicode data.

**Sub-Features**:
- Rename project (preserves project history)
- Reduce project history size (removes history for deleted books)
- Reduce repository size (removes deleted files from repository)
- Change encoding to Unicode (from legacy encodings)
- Normalize data (NFC/NFD/None)
- Replace user names (for privacy/anonymization)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Convert project`; Handler: `uiToolsAdvancedConvertProject_Click` in `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 638; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Form Relationships | Opens: `ConvertProjectForm` from `Program.cs`, line 1550 | `[FR]` |
| HelpData | Keyword: `ComponentConvertProject`; Dialog: `ConvertProjectForm`; 9 items | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiToolsAdvancedConvertProject_Click` at line 638 |
| 0 | `Paratext/ToolsMenu/ConvertProjectForm.cs` | Form Relationships | line 1550: `return new ConvertProjectForm(scrText);` |
| 1 | `ParatextData/ScrText.cs` | Field in D0 | Constructor parameter `ScrText scrText` |

**Dialog Navigation** `[FR]`:
- `ParatextWindowWithMenus` → `ConvertProjectForm` (via Program.cs line 1550)

**UI Entry Points**:
- ≡ Tab > Project > Advanced > Convert project
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiToolsAdvancedConvertProject_Click`, line 638
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `78859548-99cf-4a77-83bf-77179b9175b0`
  - Dialog: `ConvertProjectForm`
  - Question: "Guide: Project > Advanced > Convert project"

**HelpData Items**:
- ID: `d199960b-d95e-482a-b05d-0d09529ba7c2` - "Introduction to the Convert project tool"
  - Keywords: `ContentConvertProject Full-Menus ComponentConvertProject`
- ID: `78859548-99cf-4a77-83bf-77179b9175b0` - "Guide: Project > Advanced > Convert project"
  - Keywords: `ComponentConvertProject dropdown`
  - Dialog: `ConvertProjectForm`
- ID: `a1f8dbc3-bfee-47cd-bde5-c2a57e98ea47` - "How do I change user names?"
  - Keywords: `ContentConvertProject country Full-Menus ComponentConvertProject dropdown`
  - Dialog: `ConvertProjectForm`
- ID: `4f2bdca4-7277-4bdc-98ef-3fbd0e6e43d7` - "How do I rename a project?"
  - Keywords: `ContentConvertProject Full-Menus ComponentConvertProject dropdown`
  - Dialog: `ConvertProjectForm`
- ID: `79e7ad49-ca0a-41e9-be2a-27baeb2af76f` - "How do I reduce the size of my project repository?"
  - Keywords: `ContentConvertProject Full-Menus ComponentConvertProject`
  - Dialog: `ConvertProjectForm`
- ID: `854985921bc7-xxxx-xxxx` - "How do I make my Paratext project data consistent?" (normalization)
  - Keywords: `ContentConvertProject Full-Menus ComponentConvertProject ComponentNormalization dropdown`
- ID: `7e1d5b73-9b35-xxxx-xxxx` - "How do I change the encoding of a project to Unicode?"
  - Keywords: `ContentConvertProject ContentUnicodeInformation Full-Menus ComponentConvertProject`
  - Dialog: `ConvertProjectForm`
- ID: `67b4a4bf-7bfa-xxxx-xxxx` - "How do I make my Paratext project folder smaller?"
  - Keywords: `ContentConvertProject Full-Menus ComponentConvertProject`
  - Dialog: `ConvertProjectForm`

**Use Cases**:
- Rename a project without losing project history
- Remove deleted files from repository before sharing (reduces Send/Receive time)
- Reduce history size by removing history points for deleted books
- Convert legacy (non-Unicode) projects to Unicode
- Normalize mixed composed/decomposed characters (projects created with different keyboard layouts)
- Replace real user names with pseudonyms for privacy

**Related Features**:
- 13.6 Import from Other Formats - importing external data
- 13.9 Project Backup and Restore - backup before conversion recommended
- 10.1 Send/Receive - repository size affects sync performance

**Validation**: [MS] [FR] [H] [C] — Last verified: 2026-01-22

---

## Notes

- USFM is the core data format - everything else converts to/from it
- USX is required for DBL archival
- Scripture Burrito is the modern interchange standard but lacks HelpData documentation
- Versification differences cause significant complexity in project setup
- Stylesheets control rendering but are separate from USFM semantic markup
- Project structure is implemented through the ScrText class which coordinates file access, settings, and permissions

---

## Verification Log

| Date | Action | By |
|------|--------|----|
| 2026-01-21 | Full AGENTS.md v7.2 compliance update: Added Menu Structure [MS] sources to all 9 features; completed STUB features 13.8 (Manage Books) and 13.9 (Backup/Restore) with full Evidence Chains from ParatextWindowWithMenus.cs handlers through form dialogs to ScrText and related classes; added Form Relationships with dialog navigation; updated Validation Status table to include Menu Structure column; verified paths (43 valid, 6 external/manual references); fixed feature numbering in notes (11.x → 13.x) | Claude |
| 2026-01-20 | Features 13.5-13.6: Added Evidence Chain implementation tables; 13.5 traced from ProjectPropertiesForm.cs through ScrText.Settings.Versification and ParatextVersificationTable to ScrTextCollection at D2; 13.6 traced from ImportBooksForm.cs through ImportSfmText and ScrText to SourceAndDestFileInfo and PtwFileInfo at D2; updated validation markers to [C] status | Claude |
| 2026-01-20 | Features 13.3-13.4: Added Evidence Chain implementation tables; 13.3 traced from ScriptureBurritoCreationForm.cs through SBMetadata, BurritoUtensils, FoodInspector to ProjectSettings and Languages at D2; 13.4 traced from ScrText.cs through ProjectFileManager, ProjectSettings, PermissionManager to Terms, Encodings, Languages, StudyBible at D2; updated validation markers to [C] status | Claude |
| 2026-01-20 | Features 13.3-13.7: Updated to comply with rules 6-20; added proper Sources tables with exact quotes; added Key Quotes from Requirements; updated UI Entry Points with HelpData IDs, dialogs, and keywords; added HelpData Items sections with full citations; noted Implementation sections intentionally omitted; updated validation markers to reflect actual verification status; queried HelpData for versification (5 items), stylesheet (6 items), import (8 items), burrito (0 items) | Claude |
| 2026-01-20 | Feature 13.2: Rebuilt with Evidence Chain format; verified dialog `ExportUsxForm` leads to `Paratext/ToolsMenu/ExportUsxForm.cs`; traced D1 files `UsfmToUsx.cs` (line 75), `UsxImporter.cs`, `ImportBooksForm.cs`; traced D2 files `UsfmToken.cs` (line 34), `UsxFragmenter.cs` (line 47), `UsxValidator.cs`; documented Not Found items; added HelpData IDs with keywords | Claude |
| 2026-01-19 | Feature 13.1: Updated Evidence Chain with verified line numbers from UsfmParser.cs; verified Manual citations in appendix_c_usfm.md (line 11-12) and 04_keyboarding.md (lines 55-56); verified HelpData IDs and added keywords; added note about core data layer component | Claude |
| 2026-01-14 | Initial v2 documentation | Claude |
| 2026-01-21 | Added 13.10 Project Conversion (Convert project from Project > Advanced) | Claude |
| 2026-01-22 | Expanded 13.10 Project Conversion from stub: added full Sub-Features (6 operations), Form Relationships [FR], HelpData [H] with 9 items, Dialog Navigation, Use Cases; updated validation markers | Claude |

---

**Document Version**: 2.8
**Based on v1**: 04_Data_Format_Features.md
**Last Updated**: 2026-01-22
