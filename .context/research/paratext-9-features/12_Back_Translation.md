# Paratext 9 - Back Translation & Adaptation

**Category**: 12  
**Focus**: Derived translations and back translations  
**User Roles**: Translators, Consultants  
**Manual Chapters**: 16 (Free BT), 17 (Interlinear BT), 25 (Study Bibles)  
**Last Updated**: January 21, 2026

---

## Overview

Back Translation and Adaptation features support creating derived projects from existing translations. This includes back translations for consultant review, adaptations to related languages, daughter translations, and Study Bible creation.

---

## Feature List

### 12.1 Free Back Translation

**Description**: Create a natural-sounding back translation that expresses what a reader understands from the translation.

**Sub-Features**:
- Create back translation project
- Link to base translation
- Synchronized navigation
- Track back translation status (checkboxes)
- Compare with base text
- Mark sections complete
- View differences for outdated verses
- Find unfinished/outdated verses

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | *No direct menu entry* - Back translation projects created via New Project dialog | `-` |
| Form Relationships | `ProjectPropertiesForm` opens `ScrTextListSelectionForm` (line 2459) | `[FR]` |
| Requirements | Section: "Quality Checking/Validation > Interlinear View" | `[R]` |
| Manual | `chapters/16_back_translation_1.md`, line 9: "In preparing for a consultant check, the consultant will need one or more versions of your text in a language they understand" | `[M]` |
| HelpData | Keyword: `ComponentBackTranslation`; Dialogs: `ProjectPropertiesForm_tabGeneral`, `ProjectUsersForm` | `[H]` |

**Key Quote** (from Requirements):
> "An interlinear view can also be used to generate a back translation"

**Key Quote** (from Manual, `16_back_translation_1.md`, line 9):
> "In preparing for a consultant check, the consultant will need one or more versions of your text in a language they understand. This is often called a back-translation."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | HelpData dialog | `ProjectPropertiesForm_tabGeneral` |
| 1 | `Paratext.Data.ProjectSettingsAccess` | Import in D0 | Line 13: `using Paratext.Data.ProjectSettingsAccess` |
| 1 | `ParatextBase/DerivedTranslation/DerivedTranslationManager.cs` | Import in D0 | Line 26: `using Paratext.Base.StudyBible` (same folder) |
| 1 | `ParatextData/DerivedTranslation/DerivedTranslationVerseFile.cs` | Field in D1 | Line 33: `DerivedTranslationVerseFile derivedStatusFile` |
| 2 | `ParatextData/DerivedTranslation/DerivedTranslationVerse.cs` | Type in D1 | Used by DerivedTranslationVerseFile |
| 2 | `ParatextData/ScrText.cs` | Field in D1 | Line 30: `ScrText derivedScrText`, `ScrText baseScrText` |

**Dialog Navigation**:
- `ProjectPropertiesForm` → `LanguageSettingsForm` (line 533)
- `ProjectPropertiesForm` → `LanguageIDSelectionForm` (line 559)
- `ProjectPropertiesForm` → `ScrTextListSelectionForm` (line 2459) - Base project selection

**UI Entry Points**:
- ≡ Paratext > New Project (Type: Back Translation)
  - Manual: `chapters/16_back_translation_1.md`, line 35
  - Quote: "**≡ Paratext** under **Paratext** > **New Project**"
  - HelpData ID: `64ae1a22-ef68-4b9f-8136-d628b9dc11c9`
  - Dialog: `ProjectPropertiesForm_tabGeneral`
  - Question: "How do I create a back translation project?"
- ≡ Project > Open base project
  - Manual: `chapters/16_back_translation_1.md`, line 29
  - Quote: "you can now open your project from the back translation (**≡ Project** choose **Open base project …**)"
- Status checkbox toolbar dropdown > Mark All Verses in Chapter as Finished
  - Manual: `chapters/16_back_translation_1.md`, line 68
  - Quote: "Choose **Mark All Verses in Chapter as Finished**"

**HelpData Items**:
- ID: `64ae1a22-ef68-4b9f-8136-d628b9dc11c9` - "How do I create a back translation project?"
- ID: `a46bfe17-2361-4f9e-b5cc-3c226554dfa9` - "How do I mark the status of a verse, section, chapter, or book in a back translation?"
- ID: `54ed0ac6-d0ce-49a3-aa8a-6e416d82dd47` - "How do I get status check boxes to display in a back translation project?"
- ID: `13037053-a8fa-44a1-baaf-6f2e37544f48` - "What symbols can occur in status check boxes in a back translation?"
- ID: `f4d426f5-2426-4c26-8d88-d954dbab326b` - "How do I monitor the status of a back translation?"
- ID: `0e4d5f3a-4b44-472c-8cdc-e6a2344f1765` - "How do I find an unfinished or outdated back translation verse?"
- ID: `c4fefc68-de84-438d-9f01-82f42384d9be` - "How do I find out why a back translation verse displays a red question mark?"
- Dialogs: `ProjectPropertiesForm_tabGeneral`, `ProjectUsersForm`

**Validation**: [-] [FR] [H] [M] [R] [C] — Last verified: 2026-01-21

---

### 12.2 Interlinear Back Translation

**Description**: Create a word-for-word back translation using the Interlinearizer tool.

> **Note**: This feature uses the same Interlinear tool as **9.1 Interlinear Tool** (in Category 09 Advanced Checking Tools), but for the specific purpose of generating back translations. See 9.1 for the alignment/checking use case.

**Sub-Features**:
- Word-by-word glossing
- Configure based on model text
- Copy glosses to back translation project
- Maintain word alignment
- Export interlinear text
- Generate literal back translation
- Approve glosses workflow

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Interlinearizer`; Handler: `uiFileOpenInterlinear_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 408; ownerForm: `ParatextWindowWithMenus` | `[MS]` |
| Form Relationships | `InterlinearForm` opens `InterlinearSetupForm` (line 160), `CopyGlossesForm` via menu | `[FR]` |
| Requirements | Section: "Quality Checking/Validation > Interlinear View" | `[R]` |
| Manual | `chapters/17_back_translation_2.md`, line 7: "There is another type of back translation...a word-for-word style back translation" | `[M]` |
| HelpData | Keyword: `ComponentInterlinearizer`; Dialogs: `InterlinearSetupForm_uiBasicTab`, `CopyGlossesForm` | `[H]` |

**Key Quote** (from Requirements):
> "The key issue in generating an interlinear view is to be able to do alignment between the two translations"

**Key Quote** (from Manual, `17_back_translation_2.md`, line 7):
> "There is another type of back translation that is sometimes used and that is a word-for-word style back translation. Some consultants may ask for this style of back translation."

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiFileOpenInterlinear_Click` at line 408 |
| 0 | `Paratext/Interlinear/InterlinearForm.cs` | Form Relationships | Opens `InterlinearSetupForm` at line 160 |
| 0 | `Paratext/Interlinear/InterlinearSetupForm.cs` | HelpData dialog | `InterlinearSetupForm_uiBasicTab` |
| 1 | `Paratext.Data.Interlinear` | Import in D0 | Line 14: `using Paratext.Data.Interlinear` |
| 1 | `Paratext.Data.Languages` | Import in D0 | Line 15: `using Paratext.Data.Languages` |
| 1 | `Paratext.Data.Linguistics` | Import in D0 | Line 16: `using Paratext.Data.Linguistics` |
| 0 | `Paratext/ToolsMenu/CopyGlossesForm.cs` | HelpData dialog | `CopyGlossesForm` |
| 2 | `ParatextData/ScrText.cs` | Field in D1 | InterlinearSetupForm line 56: `ScrText projectText` |

**Dialog Navigation**:
- `InterlinearForm` → `InterlinearSetupForm` (line 160)
- `InterlinearForm` → `ExportForm` (line 731)
- `InterlinearForm` → `CssDisplaySettingsForm` (line 802)
- `InterlinearSetupForm` → `ProjectPropertiesForm` (line 252)

**UI Entry Points**:
- ≡ Tab > Tools > Interlinearizer
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiFileOpenInterlinear_Click`, line 408
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - Manual: `chapters/17_back_translation_2.md`, line 24
  - Quote: "**≡ Tab**, under **Tools** > **Interlinearizer**"
  - HelpData ID: `6aa250fe-c02d-450c-b49e-b9aff98fc833`
  - Dialog: `InterlinearSetupForm_uiBasicTab`
- Output glosses to project checkbox
  - Manual: `chapters/17_back_translation_2.md`, line 35
  - Quote: "Click the checkbox to output glosses to the project"
- Approve glosses button
  - Manual: `chapters/17_back_translation_2.md`, line 75
  - Quote: "Click **Approve glosses**"

**HelpData Items**:
- ID: `6aa250fe-c02d-450c-b49e-b9aff98fc833` - "How do I create a back translation project with the Interlinearizer?"
- ID: `8f75abe5-371a-4865-8d99-1e224d110e4c` - "How do I generate an interlinear back translation?"
- ID: `cf150fe0-89eb-4155-a868-296695e33a44` - "What is the Interlinearizer?"
- ID: `8a5676ce-233c-4674-a599-13db1902b3c2` - "How do I copy glosses from one project to another?"
- Dialogs: `InterlinearSetupForm_uiBasicTab`, `InterlinearSetupForm_uiAdvancedTab`, `CopyGlossesForm`

**Validation**: [MS] [FR] [H] [M] [R] [C] — Last verified: 2026-01-21

---

### 12.3 Adaptation Projects

**Description**: Create an adaptation of an existing translation for a related language or dialect.

**Sub-Features**:
- Create from existing translation
- Maintain link to source
- Track changes from source
- See source updates
- Merge source changes

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Menu: `Tools > Interlinearizer` (select "Text revision/adaptation" task); Handler: `uiFileOpenInterlinear_Click`; File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`, line 408; ownerForm: `ParatextWindowWithMenus` | `[MS]` |
| Form Relationships | `InterlinearSetupForm` opens `ProjectPropertiesForm` (line 252) | `[FR]` |
| Requirements | Section: "Data Formats > Projects" | `[R]` |
| Manual | *No dedicated chapter found* | `-` |
| HelpData | Keyword: `adaptation` (within `ComponentInterlinearizer` context); ID: `cf150fe0-89eb-4155-a868-296695e33a44` | `[H]` |

**Key Quote** (from Requirements):
> "It is helpful to clarify if a Scripture translation project is derived from another translation. Paratext allows having explicit links between projects"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `uiFileOpenInterlinear_Click` at line 408 |
| 0 | `Paratext/Interlinear/InterlinearSetupForm.cs` | HelpData dialog | `InterlinearSetupForm_uiBasicTab` |
| 1 | `Paratext.Data.Interlinear` | Import in D0 | Line 14: `using Paratext.Data.Interlinear` |
| 0 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | HelpData dialog | `ProjectPropertiesForm_tabGeneral` |
| 1 | `ParatextData/DerivedTranslation/DerivedTranslationVerseFile.cs` | Import in D0 | Line 37: `using Paratext.Data.StudyBible` |
| 2 | `ParatextData/ScrText.cs` | Base class ref | Settings.TranslationInfo.BaseScrText |

**Not Found**:
- Dedicated AdaptationForm.cs (search: "AdaptationForm" - no matches; adaptations use InterlinearSetupForm or ProjectPropertiesForm)

**Dialog Navigation**:
- `InterlinearSetupForm` → `ProjectPropertiesForm` (line 252)

**UI Entry Points**:
- ≡ Tab > Tools > Interlinearizer (select "Text revision/adaptation" task)
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiFileOpenInterlinear_Click`, line 408
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `cf150fe0-89eb-4155-a868-296695e33a44`
  - Dialog: `InterlinearSetupForm_uiBasicTab`
  - Question: "What is the Interlinearizer?"
- ≡ Paratext > New Project (based on existing translation)
  - HelpData ID: `fba85b39-58c1-4ed4-b069-0d1ab8b0e2a6`
  - Dialog: `ProjectPropertiesForm_tabGeneral`
  - Question: "What different types of projects can I create in Paratext?"

**HelpData Items**:
- ID: `cf150fe0-89eb-4155-a868-296695e33a44` - "What is the Interlinearizer?" (keywords include `adaptation`)
- ID: `fba85b39-58c1-4ed4-b069-0d1ab8b0e2a6` - "What different types of projects can I create in Paratext?"
- Dialogs: `InterlinearSetupForm_uiBasicTab`, `InterlinearSetupForm_uiAdvancedTab`, `ProjectPropertiesForm_tabGeneral`

**Validation**: [MS] [FR] [H] [-] [R] [C] — Last verified: 2026-01-21

---

### 12.4 Daughter Translations

**Description**: Create a translation derived from another translation (mother/daughter relationship).

**Sub-Features**:
- Define parent-child relationship
- Track changes in parent
- Propagate updates
- Independent versioning
- Compare with parent
- Find outdated verses

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | *No direct menu entry* - Daughter translations created via New Project dialog | `-` |
| Form Relationships | `ProjectPropertiesForm` opens `ScrTextListSelectionForm` (line 2459) for base project selection | `[FR]` |
| Requirements | Section: "Data Formats > Projects" | `[R]` |
| Manual | *No dedicated chapter - concept referenced in BT chapters* | `-` |
| HelpData | Keyword: `daughter translation` (within `ComponentBackTranslation`); ID: `0e4d5f3a-4b44-472c-8cdc-e6a2344f1765` | `[H]` |

**Key Quote** (from Requirements):
> "Paratext allows having explicit links between projects so that if and when a base translation is updated, the derived translations can pick up and see those changes"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/ProjectMenu/ProjectPropertiesForm.cs` | HelpData dialog | `ProjectPropertiesForm_tabGeneral` |
| 1 | `ParatextBase/DerivedTranslation/DerivedTranslationManager.cs` | Folder structure | Same folder as ProjectProperties refs |
| 1 | `ParatextData/DerivedTranslation/DerivedTranslationVerseFile.cs` | Field in D1 | Line 33: `DerivedTranslationVerseFile derivedStatusFile` |
| 2 | `ParatextData/DerivedTranslation/DerivedTranslationVerse.cs` | Type in D1 | Used by DerivedTranslationVerseFile |
| 0 | `Paratext/DerivedTranslation/DerivedTranslationStatusAnnotationSource.cs` | Search | Provides status annotations |
| 2 | `ParatextData/ScrText.cs` | Field in D1 | Line 30: `ScrText derivedScrText`, `ScrText baseScrText` |

**Dialog Navigation**:
- `ProjectPropertiesForm` → `ScrTextListSelectionForm` (line 2459) - Base project selection

**UI Entry Points**:
- ≡ Paratext > New Project > Based on (select parent translation)
  - HelpData ID: `fba85b39-58c1-4ed4-b069-0d1ab8b0e2a6`
  - Dialog: `ProjectPropertiesForm_tabGeneral`
  - Question: "What different types of projects can I create in Paratext?"
- ≡ Edit > Go to > Next unfinished/outdated verse
  - HelpData ID: `0e4d5f3a-4b44-472c-8cdc-e6a2344f1765`
  - Question: "How do I find an unfinished or outdated back translation verse?" (applies to daughter translations)

**HelpData Items**:
- ID: `0e4d5f3a-4b44-472c-8cdc-e6a2344f1765` - "How do I find an unfinished or outdated back translation verse?" (keywords include `daughter translation`)
- ID: `fba85b39-58c1-4ed4-b069-0d1ab8b0e2a6` - "What different types of projects can I create in Paratext?"
- Dialogs: `ProjectPropertiesForm_tabGeneral`

**Validation**: [-] [FR] [H] [-] [R] [C] — Last verified: 2026-01-21

---

### 12.5 Study Bible Authoring

**Description**: Create a Study Bible with introductions, sidebars, and detailed footnotes based on a translation.

**Sub-Features**:
- Create Study Bible Additions project
- Link to base translation
- Add introductions (\ip markers)
- Add sidebars (\esb markers)
- Add study notes (extended footnotes \ef)
- Add cross-references (extended \ex)
- Define and manage categories
- Hide non-scriptural material
- Merge to publication project
- Track additions separately
- Migrate from legacy Study Bible format
- Assignments and Progress support (9.5+)

**Sources**:

| Source | Reference | Status |
|--------|-----------|--------|
| Menu Structure | Multiple menu items (see UI Entry Points below) | `[MS]` |
| Form Relationships | `StudyBibleForm` opens `BookChooserForm` (line 418); `StudyBibleMergeProjectForm` opens `ProjectPropertiesForm` (line 126) | `[FR]` |
| Requirements | *Not explicitly covered - newer feature* | `-` |
| Manual | `chapters/25_study_bibles.md`, line 29: "With Paratext 9.2 (and above) you can create a study Bible based on your translation" | `[M]` |
| HelpData | Keywords: `ComponentStudyBibleGeneral`, `ComponentStudyBibleAdditions`; Dialogs: `StudyBibleForm`, `EditStudyBibleCategoriesForm`, `ProjectPropertiesForm_tabStudyBible` | `[H]` |

**Key Quote** (from Manual, `25_study_bibles.md`, line 29):
> "With Paratext 9.2 (and above) you can create a study Bible based on your translation by adding introductory paragraphs, sidebars and detailed footnotes and additional cross-references"

**Implementation**:

| Depth | File | Found Via | Evidence |
|-------|------|-----------|----------|
| 0 | `Paratext/TextForm.cs` | Menu Structure | handler `studyBibleFootnoteToolStripMenuItem_Click` at line 1816 |
| 0 | `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs` | Menu Structure | handler `mergeStudyBibleProjectsToolStripMenuItem_Click` at line 630 |
| 0 | `Paratext/ToolsMenu/StudyBibleForm.cs` | HelpData dialog | `StudyBibleForm` |
| 1 | `Paratext.Data.StudyBible` | Import in D0 | Implied by namespace structure |
| 1 | `Paratext.Base.SBMerger` | Import in D0 | Line 8: `using Paratext.Base.SBMerger` |
| 1 | `Paratext.Data.Find` | Import in D0 | Line 10: `using Paratext.Data.Find` |
| 1 | `Paratext.Data.Repository` | Import in D0 | Line 11: `using Paratext.Data.Repository` |
| 0 | `ParatextBase/DerivedTranslation/EditStudyBibleCategoriesForm.cs` | HelpData dialog | `EditStudyBibleCategoriesForm` |
| 0 | `Paratext/StudyBibleTools/StudyBibleMergeProjectForm.cs` | Form Relationships | Opens `ProjectPropertiesForm` at line 126 |
| 2 | `ParatextData/StudyBible/StudyBibleAdditions.cs` | Namespace | Core data class |
| 2 | `ParatextData/StudyBible/StudyBibleCategory.cs` | Namespace | Category management |
| 2 | `ParatextData/StudyBible/StudyBibleOperations.cs` | Namespace | Operations logic |
| 2 | `ParatextData/StudyBible/MergedStudyBible.cs` | Namespace | Merge functionality |
| 2 | `ParatextData/ScrText.cs` | Field in D0 | Line 27: `ScrText scrText` |

**Dialog Navigation**:
- `StudyBibleForm` → `BookChooserForm` (line 418)
- `StudyBibleMergeProjectForm` → `ProjectPropertiesForm` (line 126)

**UI Entry Points**:
- ≡ Paratext > New Project (Type: Study Bible Additions)
  - Manual: `chapters/25_study_bibles.md`, line 52
  - Quote: "Use the **Paratext menu** to create a **new project**. Set the **type** of project to **Study Bible Additions**"
  - HelpData ID: `43e83c1a-358b-4fb4-a3e8-09ba395549d1`
  - Question: "How do I create a Study Bible Additions project?"
- Insert > Study Bible extended footnote
  - Menu Structure: `TextForm`, handler `studyBibleFootnoteToolStripMenuItem_Click`, line 1816
  - File: `Paratext/TextForm.cs`
- Insert > Study Bible cross reference
  - Menu Structure: `TextForm`, handler `studyBibleCrossReferenceToolStripMenuItem_Click`, line 1825
  - File: `Paratext/TextForm.cs`
- Insert > Study Bible sidebar
  - Menu Structure: `TextForm`, handler `studyBibleSidebarToolStripMenuItem_Click`, line 1831
  - File: `Paratext/TextForm.cs`
- Insert > Study Bible category
  - Menu Structure: `TextForm`, handler `studyBibleCategoryToolStripMenuItem_Click`, line 1836
  - File: `Paratext/TextForm.cs`
- Tools > Check study content order
  - Menu Structure: `TextForm`, handler `CheckStudyContentOrder_Click`, line 2267
  - File: `Paratext/TextForm.cs`
- ≡ Project > Advanced > Merge Study Bible projects
  - Menu Structure: `ParatextWindowWithMenus`, handler `mergeStudyBibleProjectsToolStripMenuItem_Click`, line 630
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
  - HelpData ID: `de3ba611-3977-41d2-a6c5-4c784f346fdc`
- ≡ Project > Advanced > Extract Study Bible Additions project from Study Bible
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiToolsAdvancedMigrateStudyBible_Click`, line 656
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- ≡ Project > Advanced > Update to latest Study Bible format
  - Menu Structure: `ParatextWindowWithMenus`, handler `uiToolsAdvancedMigrateToStudyBibleAdditions2FileFormat_Click`, line 678
  - File: `ParatextBase/ParatextWindows/ParatextWindowWithMenus.cs`
- Add + button on SBA toolbar (introductions)
  - Manual: `chapters/25_study_bibles.md`, line 64
  - Quote: "Click **Add +** on the toolbar"
- \esb button on toolbar (sidebars)
  - Manual: `chapters/25_study_bibles.md`, line 71
  - Quote: "click **\\esb** on the toolbar"
- \ex button on toolbar (extended cross-references)
  - Manual: `chapters/25_study_bibles.md`, line 80
  - Quote: "click **\\ex** on the toolbar"
- \ef button on toolbar (extended footnotes)
  - Manual: `chapters/25_study_bibles.md`, line 87
  - Quote: "click **\\ef** on the toolbar"
- Hide button on toolbar
  - Manual: `chapters/25_study_bibles.md`, line 94
  - Quote: "Click **Hide** on the toolbar"

**HelpData Items**:
- ID: `c09c05ce-3fc4-4476-b3e9-a4319fa043b4` - "Introduction to Study Bible projects"
- ID: `cfd2c2ae-cc0a-4cb4-9ea2-1a53ec902fda` - "Introduction to Study Bible Additions projects"
- ID: `43e83c1a-358b-4fb4-a3e8-09ba395549d1` - "How do I create a Study Bible Additions project?"
- ID: `92e85776-d0cf-40d6-a12b-773c268451f3` - "How do I insert Study Bible content?"
- ID: `75fd55a6-4289-4e6a-b562-14a1013dbe0e` - "How do I define and add categories to Study Bible content?"
- ID: `aec8d4bb-c1b7-44cb-804b-975e494b718b` - "How do I hide, replace, or add content in a Study Bible Additions project?"
- ID: `de3ba611-3977-41d2-a6c5-4c784f346fdc` - "How do I merge a \"three-project\" Study Bible into an existing Legacy Study Bible project?"
- ID: `367ae9d2-2741-41e1-9306-67fff180a56b` - "Guide: Project > Project settings > Project properties: Study Bible"
- Dialogs: `StudyBibleForm`, `EditStudyBibleCategoriesForm`, `ProjectPropertiesForm_tabStudyBible`

**Validation**: [MS] [FR] [H] [M] [-] [C] — Last verified: 2026-01-21

---

## Cross-References

**Related Categories**:
- **09 Advanced Checking Tools**: Interlinear tool creates back translations (9.1)
- **13 Data Formats**: Derived project relationships, USFM markers for Study Bibles
- **10 Collaboration & Sync**: Back translation and Study Bible projects shared via Send/Receive
- **11 Project Planning**: Assignments and Progress for back translation and Study Bible

**Dependencies**:
- Base/source translation project
- Interlinear tool (for word-for-word BT)
- Project linking infrastructure

---

## Validation Summary

| Feature | MS | FR | H | M | R | C | Last Verified |
|---------|----|----|---|---|---|---|---------------|
| 12.1 Free Back Translation | - | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 12.2 Interlinear BT | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 2026-01-21 |
| 12.3 Adaptation Projects | ✓ | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 12.4 Daughter Translations | - | ✓ | ✓ | - | ✓ | ✓ | 2026-01-21 |
| 12.5 Study Bible | ✓ | ✓ | ✓ | ✓ | - | ✓ | 2026-01-21 |

---

## Verification Log

| Date | Action | By |
|------|--------|-----|
| 2026-01-18 | HelpData queries for BackTranslation, StudyBible, Adaptation, Daughter | Claude |
| 2026-01-18 | Manual chapters 16, 17, 25 read for citations | Claude |
| 2026-01-18 | Evidence chain tracing from HelpData dialogs | Claude |
| 2026-01-18 | Code file searches: ProjectPropertiesForm, InterlinearSetupForm, StudyBibleForm, DerivedTranslation | Claude |
| 2026-01-21 | Reorganized: Category 10 renumbered to 12; feature numbers updated | Claude |
| 2026-01-21 | Menu Structure queries: "back", "interlinear", "study", "adapt" | Claude |
| 2026-01-21 | Added [MS] sources: 12.2/12.3 (Interlinearizer), 12.5 (Study Bible menus) | Claude |
| 2026-01-21 | Added [FR] Form Relationships and Dialog Navigation for all features | Claude |
| 2026-01-21 | Updated Validation Summary table to include MS, FR columns per FEATURE_TEMPLATE_v2.md v6.1 | Claude |

---

## Notes

- Back translations are critical for consultant checks
- Study Bible Additions is a relatively new feature (Paratext 9.2+), with significant improvements in 9.4 and 9.5
- Adaptation is commonly used for dialect variations and uses the Interlinearizer
- Daughter translations track changes from source (parent/base) translation
- DerivedTranslation infrastructure serves both back translations and daughter translations

---

**Document Version**: 5.0
**Template Version**: FEATURE_TEMPLATE_v2.md v6.1
**AGENTS.md Version**: 7.2
