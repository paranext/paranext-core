# Paratext 9 - Publishing & Output

**Category**: 15
**Focus**: PDF generation, mobile apps, and archiving
**User Roles**: Typesetters, Distributors, Archivists
**Manual Chapters**: 14 (Printing), 24 (Finalizing)
**Last Updated**: 2026-01-21

---

## Overview

Publishing and Output features prepare translations for distribution. This includes generating PDFs for print, creating mobile apps, uploading to the Digital Bible Library for archival, and creating project backups.

---

## Feature List

### 15.1 PTXPrint Integration

**Description**: Generate high-quality PDF output for printing using PTXPrint, the recommended publishing tool launched from Paratext.

**Sub-Features**:
- Launch PTXPrint from Paratext
- Configure print settings (layout, margins, columns)
- Multiple layout options (Mini View, Basic View, Full View)
- Font selection and sizing
- Page headers/footers
- Booklet pagination (2-up printing)
- Generate print-ready PDF

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Export draft PDF (PTXprint)`; Handler: `printDraftToolStripMenuItem_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| HelpData | Keyword: `ContentPrintDraft`; Dialog: `PrintDraftForm` | `[H]` |
| Manual | `../paratext-manual/chapters/14_printing_drafts.md`: "PTXPrint has replaced the old Print Draft PDF" | `[M]` |
| Requirements | Section: "People-Centric View > Typesetter" | `[R]` |

**Key Quote** (Manual):
> "PTXPrint has replaced the old Print Draft PDF. It is currently only available in Arabic, Chinese (Simplified), English, French, Hungarian, Indonesian, Portuguese, Romanian, Russian and Spanish."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `printDraftToolStripMenuItem_Click` |

**UI Entry Points**:
- Project > Export draft PDF (PTXprint)
  - Menu Structure: `ParatextWindowWithMenus`, handler `printDraftToolStripMenuItem_Click`
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Also documented in:
  - Manual: `../paratext-manual/chapters/14_printing_drafts.md`
  - Quote: "**≡ Tab**, under **Project** > **Export Draft PDF** **(PTX Print)**"
  - HelpData ID: `fba9c421-0fe3-45c7-8932-425e03ba4602`

**HelpData Items**:
- ID: `fba9c421-0fe3-45c7-8932-425e03ba4602` - "How do I make a draft printout of my translation?"
- ID: `16b911f3-dd8e-42b4-a9c2-f4d0a569ef60` - "How do I apply consistent changes to the text when exporting it to PDF?"
- Dialogs: `PrintDraft`, `PrintDraftForm`

**External Dependency**: PTXPrint (external application)

**Validation**: [MS] - [H] [M] [R] - — Last verified: 2026-01-21

---

### 15.2 PublishingAssistant (Legacy)

**Description**: Legacy publishing tool integration for PDF generation. Replaced by PTXPrint.

**Sub-Features**:
- Generate PDF output
- Print settings
- Layout configuration
- Legacy compatibility

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Not found in current menu structure | `-` |
| HelpData | Not found as separate component | `-` |
| Manual | `../paratext-manual/chapters/14_printing_drafts.md`: "PTXPrint has replaced the old Print Draft PDF" | `[M]` |
| Requirements | Section: "People-Centric View > Typesetter"; Quote: "Integration with PublishingAssistant or PTXPrint" | `[R]` |

**Key Quote** (Requirements):
> "Integration with PublishingAssistant or PTXPrint to provide many settings and styling options to create aesthetically pleasing PDFs"

**Note**: PublishingAssistant has been deprecated in favor of PTXPrint. No current menu entry exists for PublishingAssistant.

**External Dependency**: PublishingAssistant (deprecated external application)

**Validation**: - - - [M] [R] - — Last verified: 2026-01-21

---

### 15.3 Scripture App Builder

**Description**: Create mobile Bible apps for Android and iOS from Paratext projects using Scripture App Builder.

**Sub-Features**:
- Export for Scripture App Builder
- App configuration options
- Multiple book selection
- Audio integration
- Search functionality

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Not found in current menu structure | `-` |
| HelpData | Not found | `-` |
| Manual | Not found in scraped chapters | `-` |
| Requirements | Section: "People-Centric View > Distributor"; Quote: "Integration with ScriptureAppBuilder" | `[R]` |

**Key Quote** (Requirements):
> "Integration with ScriptureAppBuilder to create 'Bible in an app' applications for mobile devices"

**Not Found**:
- No menu entry for Scripture App Builder (search: "sab", "scripture app" - no matches)
- No HelpData entries found (search: "Scripture App Builder" - no results)

**Note**: Scripture App Builder may be launched externally or through a mechanism not captured in the current menu structure analysis. The feature exists per Requirements but entry point is not documented in Menu Structure or HelpData.

**External Dependency**: Scripture App Builder (external application)

**Validation**: - - - - [R] - — Last verified: 2026-01-21

---

### 15.4 DBL Upload (Create DBL Bundle)

**Description**: Create text bundles for upload to the Digital Bible Library (DBL) for archival and distribution.

**Sub-Features**:
- Create DBL text bundle (USX format)
- Create DBL Paratext resource bundle
- Validate against DBL requirements
- Metadata preparation
- DBL authorization
- Enable DBL column in Send/Receive

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Create DBL text bundle`; Handler: `uiCreateUSXTextBundle_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Create DBL Paratext resource bundle`; Handler: `uiCreateDBLResourceBundle_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| Menu Structure | Menu: `Paratext > Advanced > Enable DBL column in Send/Receive dialog`; Handler: `uiEnableDBLColumnSR_Click`; File: `Paratext/MainForm.cs` | `[MS]` |
| Form Relationships | `CreateTextBundleForm` → `ResolveDBLEntryMismatchDialog` | `[FR]` |
| Form Relationships | `CreateTextBundleForm` → `DblAuthorizationForm` | `[FR]` |
| HelpData | ID: `58d88da1-a5b6-447e-a788-224fc884a974` - "What is the Digital Bible Library (DBL)?" | `[H]` |
| Requirements | Section: "People-Centric View > Archivist" | `[R]` |

**Key Quote** (Requirements):
> "Integration with the Digital Bible Library (DBL) for uploading completed projects for long-term storage and retrieval"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiCreateUSXTextBundle_Click` |
| 0 | `Paratext/Archiving/CreateTextBundleForm.cs` | Form Relationships | (form definition) |
| 1 | `Paratext/Archiving/ResolveDBLEntryMismatchDialog.cs` | Opens dialog in D0 | `using (var dlg = new ResolveDBLEntryMismatchDialog(...)` |
| 1 | `DblUploader/DblAuthorizationForm.cs` | Opens dialog in D0 | `using (var form = new DblAuthorizationForm())` |

**Dialog Navigation**:
- `CreateTextBundleForm` → `ResolveDBLEntryMismatchDialog`
- `CreateTextBundleForm` → `DblAuthorizationForm`
- `SendReceiveProjectsForm` → `CreateTextBundleForm`

**UI Entry Points**:
- Project > Advanced > Create DBL text bundle
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiCreateUSXTextBundle_Click`
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Project > Advanced > Create DBL Paratext resource bundle
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiCreateDBLResourceBundle_Click`
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Paratext > Advanced > Enable DBL column in Send/Receive dialog
  - Menu Structure: `MainForm`, handler `uiEnableDBLColumnSR_Click`
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `58d88da1-a5b6-447e-a788-224fc884a974` - "What is the Digital Bible Library (DBL)?"
- ID: `ed0690b4-142d-4870-a9a0-596ca207e7cb` - "How can I see if a project has been uploaded to the DBL?"
- ID: `08262a7e-4271-4575-bce1-fa6ad2cf5a26` - "How do I create a resource text from a project?"

**Validation**: [MS] [FR] [H] - [R] [C] — Last verified: 2026-01-21

---

### 15.5 Project Archive (Backup/Restore)

**Description**: Create complete project backups and archives for long-term storage, and restore projects from backup files.

**Sub-Features**:
- Backup project to file (zip)
- Restore project from file
- View backup log
- Book selection for backup
- Backup to USB/network drive
- Compare backup vs current (differences tool)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Paratext > Advanced > Backup project to file`; Handler: `backupToFileToolStripMenuItem_Click`; File: `Paratext/MainForm.cs` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Backup project to file`; Handler: `backupProjectToFileToolStripMenuItem_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| Menu Structure | Menu: `Paratext > Advanced > Restore project from file`; Handler: `restoreFromFileToolStripMenuItem_Click`; File: `Paratext/MainForm.cs` | `[MS]` |
| Menu Structure | Menu: `Paratext > Advanced > View backup log`; Handler: `viewBackupLogToolStripMenuItem_Click`; File: `Paratext/MainForm.cs` | `[MS]` |
| Form Relationships | `MainForm` → `BackupForm` | `[FR]` |
| Form Relationships | `MainForm` → `RestoreForm` | `[FR]` |
| HelpData | Keyword: `ComponentBackupProject`; Dialog: `BackupForm` | `[H]` |
| Requirements | Section: "People-Centric View > Archivist" | `[R]` |

**Key Quote** (HelpData ID: `c27e2cfa-40e8-4342-b70c-d25185f2757a`):
> "What is the difference between 'Backup' and 'Send/Receive'?"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/MainForm.cs` | Menu Structure | handler `backupToFileToolStripMenuItem_Click` |
| 0 | `Paratext/BackupRestore/BackupForm.cs` | Form Relationships | (form definition) |
| 0 | `Paratext/BackupRestore/RestoreForm.cs` | Form Relationships | (form definition) |
| 1 | `ParatextBase/CommonForms/BookChooserForm.cs` | Opens dialog in BackupForm | `using (BookChooserForm frm = new BookChooserForm(...)` |
| 1 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | Opens dialog in RestoreForm | `using (ProjectPropertiesForm form = new ProjectPropertiesForm(...)` |
| 1 | `Paratext/ToolsMenu/DifferencesToolForm.cs` | Opens dialog in RestoreForm | `using (DifferencesToolForm form = new DifferencesToolForm(...)` |

**Dialog Navigation**:
- `MainForm` → `BackupForm`
- `MainForm` → `RestoreForm`
- `BackupForm` → `BookChooserForm`
- `RestoreForm` → `ProjectPropertiesForm`
- `RestoreForm` → `DifferencesToolForm`

**UI Entry Points**:
- Paratext > Advanced > Backup project to file
  - Menu Structure: `MainForm`, handler `backupToFileToolStripMenuItem_Click`
  - File: `Paratext/MainForm.cs`
- Project > Advanced > Backup project to file
  - Menu Structure: `ParatextWindowWithMenus`, handler `backupProjectToFileToolStripMenuItem_Click`
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Paratext > Advanced > Restore project from file
  - Menu Structure: `MainForm`, handler `restoreFromFileToolStripMenuItem_Click`
  - File: `Paratext/MainForm.cs`

**HelpData Items**:
- ID: `7234ef1d-890e-4d80-a5cc-18b50b1b6eca` - "Guide: Paratext > Advanced > Backup project to file"
- ID: `5c4d393e-b256-489f-bb95-42b9885ec87f` - "How do I backup my project?"
- ID: `c27e2cfa-40e8-4342-b70c-d25185f2757a` - "What is the difference between 'Backup' and 'Send/Receive'?"
- ID: `f6705a58-2aad-49b2-80c5-f4912bf71354` - "How do I restore a Paratext backup?"
- Dialogs: `BackupForm`, `RestoreForm`

**Validation**: [MS] [FR] [H] - [R] [C] — Last verified: 2026-01-21

---

### 15.6 Print (Basic Print)

**Description**: Basic print functionality inherited across Paratext windows, distinct from PTXPrint PDF export.

**Sub-Features**:
- Print selected content
- Print from various forms (BiblicalTerms, WordList, Progress)
- Print list contents
- Basic print formatting

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Print`; Handler: `printToolStripMenuItem_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| Menu Structure | Menu: `Project > Print` (BiblicalTermsForm); Handler: `printStripMenuItem_Click`; File: `BiblicalTerms/Internal/BiblicalTermsForm.cs` | `[MS]` |
| Menu Structure | Menu: `List > Print list`; Handler: `printListToolStripMenuItem_Click`; File: `Paratext/EditMenu/ListForm.cs` | `[MS]` |
| Menu Structure | Menu: `List > Print texts in list`; Handler: `printTextsInListToolStripMenuItem_Click`; File: `Paratext/EditMenu/ListForm.cs` | `[MS]` |
| Menu Structure | Menu: `Progress Viewer > Print`; Handler: `Print_Click`; File: `Paratext/ProjectProgress/ProgressViewsForm.cs` | `[MS]` |
| HelpData | ID: `240f3226-c197-425a-8415-22856f96a8c5` - "How do I print a list of words to review?" | `[H]` |
| Manual | `../paratext-manual/chapters/14_printing_drafts.md`: "In this module you will learn how to print a draft of your translation" | `[M]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `printToolStripMenuItem_Click` |
| 0 | `BiblicalTerms/Internal/BiblicalTermsForm.cs` | Menu Structure | handler `printStripMenuItem_Click` |
| 0 | `Paratext/EditMenu/ListForm.cs` | Menu Structure | handler `printListToolStripMenuItem_Click` |
| 0 | `Paratext/ProjectProgress/ProgressViewsForm.cs` | Menu Structure | handler `Print_Click` |

**UI Entry Points**:
- Project > Print
  - Menu Structure: `ParatextWindowWithMenus`, handler `printToolStripMenuItem_Click`
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Project > Print (BiblicalTermsForm)
  - Menu Structure: `BiblicalTermsForm`, handler `printStripMenuItem_Click`
  - File: `BiblicalTerms/Internal/BiblicalTermsForm.cs`
- List > Print list
  - Menu Structure: `ListForm`, handler `printListToolStripMenuItem_Click`
  - File: `Paratext/EditMenu/ListForm.cs`
- List > Print texts in list
  - Menu Structure: `ListForm`, handler `printTextsInListToolStripMenuItem_Click`
  - File: `Paratext/EditMenu/ListForm.cs`
- Progress Viewer > Print
  - Menu Structure: `ProgressViewsForm`, handler `Print_Click`
  - File: `Paratext/ProjectProgress/ProgressViewsForm.cs`

**HelpData Items**:
- ID: `240f3226-c197-425a-8415-22856f96a8c5` - "How do I print a list of words to review?"
- Dialog: `NewWordlistPrintForm`

**Note**: This is the basic print functionality. For PDF generation with formatting options, use PTXPrint (15.1).

**Validation**: [MS] - [H] [M] - [C] — Last verified: 2026-01-21

---

### 15.7 Create Merged Publication Project

**Description**: Create a merged project that combines multiple projects for unified publication output.

**Sub-Features**:
- Combine projects for publication
- Unified styling across merged content
- Publication-ready merged output
- Merge Study Bible projects

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Create merged publication project`; Handler: `createMergedPublicationProject_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| Menu Structure | Menu: `Project > Advanced > Merge Study Bible projects`; Handler: `mergeStudyBibleProjectsToolStripMenuItem_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| HelpData | ID: `88d9ad33-b234-4662-b19b-d5f95b89ad41` - "How do I merge Study Bible Additions to a Study Bible Publication project?" | `[H]` |

**Key Quote** (HelpData text search):
> "Introduction to Study Bible projects" mentions merged publication projects for combining Study Bible content.

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `createMergedPublicationProject_Click` |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `mergeStudyBibleProjectsToolStripMenuItem_Click` |

**UI Entry Points**:
- Project > Create merged publication project
  - Menu Structure: `ParatextWindowWithMenus`, handler `createMergedPublicationProject_Click`
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Project > Advanced > Merge Study Bible projects
  - Menu Structure: `ParatextWindowWithMenus`, handler `mergeStudyBibleProjectsToolStripMenuItem_Click`
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`

**HelpData Items**:
- ID: `88d9ad33-b234-4662-b19b-d5f95b89ad41` - "How do I merge Study Bible Additions to a Study Bible Publication project?"
- ID: `c09c05ce-3fc4-4476-b3e9-a4319fa043b4` - "Introduction to Study Bible projects" (mentions merged publication)

**Validation**: [MS] - [H] - - [C] — Last verified: 2026-01-21

---

## Additional Export Features

### 15.8 Export to RTF

**Description**: Export project text to Rich Text Format for use in word processors.

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Export to RTF`; Handler: `uiFileSaveRTF_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| HelpData | ID: `757c2ae4-f6e5-4b4b-b7d4-83ab7d1f35ab` - "How do I save project text in Rich Text Format (RTF)?"; Dialog: `RtfExportForm` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiFileSaveRTF_Click` |

**Validation**: [MS] - [H] - - - — Last verified: 2026-01-21

---

### 15.9 Export to USX

**Description**: Export project to USX (Unified Scripture XML) format.

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Export project to USX`; Handler: `exportProjectToUSXToolStripMenuItem_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |
| HelpData | ID: `f308b39b-81d5-4101-8257-48098a64c38a` - "How do I export project text from Paratext?"; Dialog: `ExportUsxForm` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `exportProjectToUSXToolStripMenuItem_Click` |

**Validation**: [MS] - [H] - - - — Last verified: 2026-01-21

---

### 15.10 Scripture Burrito Export

**Description**: Wrap/export project in a Scripture Burrito format for interoperability.

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Wrap (export) project in a Scripture Burrito`; Handler: `wrapProjectInAScriptureBurritoToolStripMenuItem_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | `[MS]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `wrapProjectInAScriptureBurritoToolStripMenuItem_Click` |

**Validation**: [MS] - - - - - — Last verified: 2026-01-21

---

### 15.11 Export to HTML

**Description**: Export project text to HTML format for web viewing, sharing, or further processing.

**Sub-Features**:
- Export project to HTML
- HTML formatting options
- Web-compatible output generation

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Export Project to HTML`; Handler: `uiExportToHtml_Click`; Line: 1551; Owner: `TextForm` | `[MS]` |
| HelpData | Keyword: `ContentExportToHTML` (referenced in `ExportUsxForm` help) | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `uiExportToHtml_Click` |

**UI Entry Points**:
- ≡ Tab > Project > Advanced > Export Project to HTML
  - Menu Structure: `TextForm`, handler `uiExportToHtml_Click`
  - File: `Paratext/TextForm.cs`

**Use Cases**:
- Creating web-viewable Scripture text
- Sharing translation progress via web pages
- Pre-publishing review in browser format

**Related Features**:
- 15.8 Export to RTF - alternative text export format
- 15.9 Export to USX - XML-based export

**Validation**: [MS] - [H] - - - — Last verified: 2026-01-21

---

### 15.12 Bible Module Export

**Description**: Create a Bible module for use in other Bible software applications. Bible modules are specification-driven exports that produce Scripture portions (lectionaries, devotionals, topical collections) for distribution through third-party Bible readers.

**Sub-Features**:
- Create/open Bible module from specification file
- Edit module specification (text replacement rules, verse references)
- Preview module output
- Reload module after specification changes
- Module content validation and checking

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Project > Advanced > Bible module`; Handler: `openBibleModuleToolStripMenuItem_Click`; Line: 431; Owner: `ParatextWindowWithMenus` | `[MS]` |
| Menu Structure | Menu: `View > Reload Bible module`; Handler: `reloadModuleToolStripMenuItem_Click`; Line: 1879; Owner: `TextForm`; Shortcut: F5 | `[MS]` |
| Form Relationships | `CreateBibleModuleForm` at `Paratext/ToolsMenu/CreateBibleModuleForm.cs`; Opens from ParatextWindowWithMenus | `[FR]` |
| HelpData | ID: `0e264a9d-c781-426e-9b90-4fc8e237346c` - "How do I open a Bible module?"; Dialog: `CreateBibleModuleForm` | `[H]` |
| HelpData | ID: `52e2d0f8-61d3-48b1-9a3f-02a262c37743` - "How do I edit the specification for a Bible module?" | `[H]` |
| HelpData | Keywords: `ContentOpenBibleModule ComponentBibleModule` | `[H]` |

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `openBibleModuleToolStripMenuItem_Click` |
| 1 | `Paratext/ToolsMenu/CreateBibleModuleForm.cs` | Form Relationships | form class, implements `IModalWindow` |
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `reloadModuleToolStripMenuItem_Click` (for reload) |

**Dialog Navigation**:
- `ParatextWindowWithMenus` → `CreateBibleModuleForm` (via `openBibleModuleToolStripMenuItem_Click`)

**UI Entry Points**:
- ≡ Tab > Project > Advanced > Bible module...
  - Menu Structure: `ParatextWindowWithMenus`, handler `openBibleModuleToolStripMenuItem_Click`
  - Opens: `CreateBibleModuleForm` dialog
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Tab > View > Reload Bible module (F5)
  - Menu Structure: `TextForm`, handler `reloadModuleToolStripMenuItem_Click`
  - Available when Bible module is open in Extra book
  - File: `Paratext/TextForm.cs`

**HelpData Items**:
- ID: `0e264a9d-c781-426e-9b90-4fc8e237346c` - "How do I open a Bible module?"
- ID: `52e2d0f8-61d3-48b1-9a3f-02a262c37743` - "How do I edit the specification for a Bible module?"
- Keywords: `ContentOpenBibleModule`, `ComponentBibleModule`

**Use Cases**:
- Creating lectionaries (Scripture readings for worship services)
- Building topical Scripture collections
- Producing devotional reading plans
- Creating modules for Bible study software (e.g., Logos, e-Sword, theWord)
- Distributing translations through third-party platforms

**Related Features**:
- 15.3 Scripture App Builder - mobile app creation
- 15.4 DBL Upload - Digital Bible Library distribution

**Validation**: [MS] [FR] - - [H] - — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **13 Data Formats**: USX format required for DBL upload (see 13.2 USX Export)
- **11 Project Planning**: Progress.Bible reports publishing status
- **03 Exegetical Resources**: DBL is also source of resources
- **09 Advanced Checking Tools**: Concordance Builder prepares indexes for publishing

**Dependencies**:
- PTXPrint (external)
- Scripture App Builder (external)
- DBL account and registration
- Internet connection (for DBL upload)

---

## Validation Summary

| Feature | MS | FR | H | M | R | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 15.1 PTXPrint Integration | ✓ | - | ✓ | ✓ | ✓ | - | 2026-01-21 |
| 15.2 PublishingAssistant (Legacy) | - | - | - | ✓ | ✓ | - | 2026-01-21 |
| 15.3 Scripture App Builder | - | - | - | - | ✓ | - | 2026-01-21 |
| 15.4 DBL Upload | ✓ | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 15.5 Project Archive | ✓ | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 15.6 Print (Basic) | ✓ | - | ✓ | ✓ | - | ✓ | 2026-01-21 |
| 15.7 Merged Publication | ✓ | - | ✓ | - | - | ✓ | 2026-01-21 |
| 15.8 Export to RTF | ✓ | - | ✓ | - | - | - | 2026-01-21 |
| 15.9 Export to USX | ✓ | - | ✓ | - | - | - | 2026-01-21 |
| 15.10 Scripture Burrito | ✓ | - | - | - | - | - | 2026-01-21 |
| 15.11 Export to HTML | ✓ | - | ✓ | - | - | - | 2026-01-21 |
| 15.12 Bible Module Export | ✓ | ✓ | - | - | ✓ | - | 2026-01-21 |
## Notes

- PTXPrint is the current recommended publishing tool, replacing PublishingAssistant
- DBL is critical for long-term preservation and distribution
- Scripture App Builder may be launched externally - no menu entry found in Paratext menu structure
- Print (15.6) is basic printing; PTXPrint (15.1) is for PDF generation with full formatting
- Features 15.8-15.10 were added based on Menu Structure discovery

---

