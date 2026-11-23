# Paratext 10 Feature Porting Analysis

This document provides a detailed analysis of features planned for porting from Paratext 9 (Windows Forms/.NET) to Paratext 10 (Electron with C# backend).

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [S/R Conflict Resolution](#1-sr-conflict-resolution)
3. [Older Style Translation Resources](#2-older-style-translation-resources)
4. [USB Syncing](#3-usb-syncing)
5. [Checklists](#4-checklists)
6. [Creating Projects](#5-creating-projects)
7. [Parallel Passages](#6-parallel-passages)
8. [Platform.Bible Integration Patterns](#platformbible-integration-patterns)
9. [Porting Effort Summary](#porting-effort-summary)

---

## Architecture Overview

### Current Paratext 9 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                           │
│  Paratext (MainForm, Windows Forms, MDI, WeifenLuo Docking)    │
├─────────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                            │
│  ParatextBase (UI Controls, Common Forms, Theme Engine)        │
├─────────────────────────────────────────────────────────────────┤
│                    BUSINESS LOGIC LAYER                         │
│  ParatextData (.NET Standard 2.0 - portable library)           │
│  ParatextChecks (Validation and checking logic)                │
├─────────────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE LAYER                         │
│  DataAccessServer (Nancy REST API with JWT auth)               │
│  Repository (Mercurial version control integration)            │
│  PTLive (Real-time collaboration: WCF, AMQP, REST)            │
├─────────────────────────────────────────────────────────────────┤
│                    UTILITIES                                    │
│  PtxUtils, CBUtilities, SIL Libraries                          │
└─────────────────────────────────────────────────────────────────┘
```

### Target Paratext 10 Architecture (Platform.Bible / Paranext)

Paratext 10 is being built on **Platform.Bible** (paranext-core), an open-source, extensible Bible translation platform.

**Repository:** https://github.com/paranext/paranext-core
**Tech Stack:** Electron 36.5, React 18.3, TypeScript, .NET 8

#### Multi-Process Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Main Process (Electron)                       │
│  • Window management & app lifecycle                             │
│  • Spawns and manages child processes                            │
│  • IPC coordination                                              │
└────────────────┬────────────────────────────────────────────────┘
                 │ JSON-RPC 2.0 over WebSocket (port 8876)
    ┌────────────┼────────────┬───────────────────┐
    │            │            │                   │
┌───▼────────┐ ┌─▼──────────┐ ┌▼────────────────┐
│ Renderer   │ │ Extension  │ │ .NET Data       │
│ (React UI) │ │ Host       │ │ Provider        │
│            │ │            │ │                 │
│ • Web UI   │ │ • Loads    │ │ • ParatextData  │
│ • Dialogs  │ │   extensions│ │ • Project data  │
│ • Themes   │ │ • PAPI     │ │ • Mercurial     │
│ • WebViews │ │ • Services │ │ • C# services   │
└────────────┘ └────────────┘ └─────────────────┘
```

#### Key Platform.Bible Concepts

| Concept | Description |
|---------|-------------|
| **PAPI** | Platform API - frozen singleton object with 30+ services (commands, dataProviders, webViews, dialogs, settings, storage, network, logger, themes, localization, notifications, etc.) |
| **Extensions** | Most functionality provided through extensions (commands, data providers, web views). Uses TypeScript module augmentation for type-safe extension in `papi-shared-types.ts` |
| **Data Providers** | Three-layer abstraction: `IDataProviderEngine` (backend) → `IDataProvider` (API) → Network exposure. Supports subscription-based updates with deep equality checking |
| **Network Objects** | Objects exposed across processes via JSON-RPC. Base class in `c-sharp/NetworkObjects/`. Methods become RPC calls automatically |
| **SharedStore** | Cross-process in-memory data sharing using Lamport clock timestamps for deterministic conflict resolution |
| **WebViews** | Three content types: `react` (full PAPI access), `html` (full PAPI access), `url` (no PAPI access - cross-origin security). Use `WebViewFactory` for simplified provider creation |

#### Directory Structure (paranext-core)

```
paranext-core/
├── src/
│   ├── main/                 # Electron main process
│   ├── renderer/             # React UI (components, hooks, services)
│   ├── extension-host/       # Extension runtime & PAPI
│   ├── shared/               # Code shared across all processes
│   ├── declarations/         # PAPI type declarations (papi-shared-types.ts)
│   ├── node/                 # Node-side utilities and services
│   ├── client/               # Client-side code
│   └── @types/               # Additional type definitions
├── lib/
│   ├── papi-dts/            # PAPI type definitions (generated)
│   ├── platform-bible-react/ # React component library
│   └── platform-bible-utils/ # Utility functions
├── extensions/               # Core bundled extensions (13 total)
│   └── src/
│       ├── platform-scripture/        # Scripture reading
│       ├── platform-scripture-editor/ # Scripture editing
│       ├── platform-get-resources/    # Resource management
│       ├── platform-lexical-tools/    # Lexical tools
│       ├── legacy-comment-manager/    # Comment management
│       ├── paratext-registration/     # Paratext registration
│       ├── project-notes-data-provider/ # Project notes
│       ├── quick-verse/               # Quick verse lookup
│       ├── hello-someone/             # Reference implementation
│       ├── hello-rock3/               # Sample extension
│       └── ...
├── c-sharp/                  # .NET data provider backend
│   ├── Program.cs            # Entry point & provider registration
│   ├── PapiClient.cs         # JSON-RPC WebSocket communication
│   ├── Services/             # Core services (12 files)
│   ├── Projects/             # Project data providers (16+ files)
│   ├── Checks/               # Quality checks system (30+ files)
│   ├── NetworkObjects/       # Base classes for data providers
│   ├── JsonUtils/            # JSON serialization & custom converters
│   ├── ParatextUtils/        # Paratext initialization & globals
│   └── Users/                # User management
├── c-sharp-tests/            # C# unit tests (19 subdirectories)
├── .erb/                     # Electron React Boilerplate configs
├── webpack/                  # Webpack build configuration
└── release/                  # Electron release configuration
```

### Key Insight: ParatextData.dll

The Electron app interfaces with Paratext projects through **ParatextData.dll** in the .NET Data Provider process. This means:
- Mercurial is still used for version control
- All data layer logic is reusable
- UI layer (Windows Forms) must be completely rewritten as React components/extensions
- Communication happens via JSON-RPC 2.0 over WebSocket (port 8876) using `StreamJsonRpc` library

**NuGet packages** (from `ParanextDataProvider.csproj`):
```xml
<PackageReference Include="ParatextData" Version="9.5.0.18" />
<PackageReference Include="ParatextChecks" Version="9.5.0.18" />
```

**Initialization sequence** (from `Program.cs`):
```csharp
ParatextDataSettings.Initialize(new PersistedParatextDataSettings(papi));
PtxUtilsDataSettings.Initialize(new PersistedPtxUtilsSettings(papi));
ParatextGlobals.Initialize(ProjectRootFolder);
```

**Custom JSON converters** are implemented in `c-sharp/JsonUtils/` for Paratext types:
- `VerseRefConverter` - Scripture verse references
- `CommentConverter` / `CommentThreadConverter` - Project comments
- `InventoryOptionValueConverter` - Check inventory data

### Existing C# Data Providers

The following data providers are **already implemented** in the paranext-core codebase:

| Provider | File | Functions | Description |
|----------|------|-----------|-------------|
| **ParatextProjectDataProviderFactory** | `Projects/ParatextProjectDataProvider.cs` (57KB) | 35+ | USFM/USX read/write, comments, permissions, settings |
| **InventoryDataProvider** | `Checks/InventoryDataProvider.cs` (23KB) | 11 | Scripture inventory management |
| **CheckRunner** | `Checks/CheckRunner.cs` (15KB) | 9 | Quality checks (Capitalization, ChapterVerse, Quotation, etc.) |
| **DblResourcesDataProvider** | `Projects/DigitalBibleLibrary/DblDownloadableDataProvider.cs` | 4 | DBL resource discovery, installation, updates |

#### ParatextProjectDataProvider Functions

**USFM Operations:**
- `getBookUSFM`, `setBookUSFM`, `getChapterUSFM`, `setChapterUSFM`, `getVerseUSFM`

**USX Operations:**
- `getBookUSX`, `setBookUSX`, `getChapterUSX`, `setChapterUSX`, `getVerseUSX`

**Comments:**
- `getComments`, `setComments`, `getCommentThreads`, `createComment`, `addCommentToThread`, `deleteComment`, `updateComment`

**Permissions:**
- `canUserCreateComments`, `canUserAddCommentToThread`, `canUserAssignThread`, `canUserResolveThread`, `canUserEditOrDeleteComment`, `findAssignableUsers`

**Settings:**
- `getSetting`, `setSetting`, `resetSetting`, `getMarkerNames`

### Existing Services

| Service | File | Purpose |
|---------|------|---------|
| **AppService** | `Services/AppService.cs` | Application info (name, version) |
| **SettingsService** | `Services/SettingsService.cs` | Application-wide settings with event notifications |
| **ProjectSettingsService** | `Services/ProjectSettingsService.cs` | Per-project settings (40+ recognized fields) |
| **SharedStoreService** | `Services/SharedStore.cs` | Cross-process state sync with Lamport clocks |
| **LocalizationService** | `Services/LocalizationService.cs` | i18n handling |

---

## 1. S/R Conflict Resolution

### Overview

Send/Receive (S/R) Conflict Resolution handles merge conflicts when multiple users edit the same scripture text. It includes a "Compare Versions" dialog for viewing differences.

### Architecture Layers

| Layer | Components | Portability |
|-------|------------|-------------|
| **ParatextData** | Merge algorithms, conflict detection, DiffToken | ✅ Reusable |
| **ParatextBase** | ScrDiffControl (diff viewer) | ❌ Windows Forms |
| **Paratext** | SendReceiveProjectsForm, DifferencesToolForm | ❌ Windows Forms |

### Key Classes and Files

#### Data Layer (ParatextData) - Reusable

| File | Class | Purpose |
|------|-------|---------|
| `ParatextData/Repository/Mergers/BookFileMerger.cs` | `BookFileMerger` | Verse-level merging, conflict detection, creates conflict notes |
| `ParatextData/Repository/SharingLogic.cs` | `SharingLogic` | Orchestrates S/R flow, manages project updates |
| `ParatextData/Repository/VersionedText.cs` | `VersionedText` | Manages versioned project state, triggers merges |
| `ParatextData/Repository/Hg.cs` | `Hg` | Mercurial command wrapper |
| `ParatextData/UsfmDiff/DiffToken.cs` | `DiffToken` | Generates diff representation between USFM texts |
| `ParatextData/ProjectComments/CommentList.cs` | `Comment`, `NoteConflictType` | Stores conflict metadata |

#### UI Layer (Paratext) - Needs Rewrite

| File | Class | Purpose |
|------|-------|---------|
| `Paratext/Repository/SendReceiveProjectsForm.cs` | `SendReceiveProjectsForm` | Main S/R dialog |
| `Paratext/Repository/ChangeListForm.cs` | `ChangeListForm` | Review sent/received changes |
| `Paratext/ToolsMenu/DifferencesToolForm.cs` | `DifferencesToolForm` | **Compare Versions** dialog |
| `ParatextBase/UsfmDiff/ScrDiffControl.cs` | `ScrDiffControl` | Two-pane diff viewer control |

### Conflict Types

```csharp
public sealed class NoteConflictType : EnumType
{
    VerseTextConflict,           // Two users changed same verse
    InvalidVerses,               // Chapter has invalid verse syntax
    VerseBridgeDifferences,      // Verse bridging changed differently
    DuplicateVerses,             // Duplicate verse refs
    ReadError,                   // Error parsing one revision
    VerseOrderError,             // Ambiguous verse order
    StudyBibleChangeConflict,    // Study Bible conflicts
    None                         // No conflict
}
```

### Conflict Resolution Flow

```
1. User initiates S/R
   └─> SendReceiveProjectsForm.ShowDialog()

2. Pull remote changes
   └─> SharingLogic.ShareChanges()
       └─> VersionedText.ShareChanges()
           └─> Mercurial merge operation

3. Detect & record conflicts
   └─> BookFileMerger.Merge(mergeData)
       ├─> Three-way merge: parent, mine, theirs
       ├─> For each verse conflict:
       │   └─> Create Comment with NoteType.Conflict
       │   └─> Set ConflictType, Status = Todo
       │   └─> Store diff in AcceptedChangeXml
       └─> RecordConflict() → CommentManager.AddComment()

4. User reviews conflicts
   └─> Opens "Compare Versions" tool (DifferencesToolForm)
       └─> Uses ScrDiffControl for side-by-side view
       └─> Can accept, replace, or manually merge

5. Resolution recorded
   └─> ConflictResolutionAction = "replaced" or "merged"
   └─> Comment status = Resolved
```

### Porting Considerations

**What's reusable:**
- All merge logic in `BookFileMerger`
- Diff generation via `DiffToken`
- Conflict storage as Comments
- Mercurial operations via `Hg` class

**What needs rewriting:**
- `ScrDiffControl` - need web-based diff viewer
- `DifferencesToolForm` - new Electron UI
- `SendReceiveProjectsForm` - new Electron UI

**Recommended approach for Platform.Bible:**
- Create a **Data Provider** in `c-sharp/` that exposes diff data via `DiffToken.cs`
- Build a React **WebView extension** for the two-pane diff viewer
- Use `platform-bible-react` components for consistent UI
- Register commands via PAPI for conflict resolution actions
- Consider using a JavaScript diff library (e.g., `diff`, `jsdiff`) for frontend visualization

---

## 2. Older Style Translation Resources

### Overview

Translation resources are read-only, zipped Scripture reference materials. "Older style" resources store figures in the root directory, while newer resources use a `figures/` subfolder.

### Architecture Layers

| Layer | Components | Portability |
|-------|------------|-------------|
| **ParatextData** | ResourceScrText, ResourceProjectFileManager, zip handling | ✅ Reusable |
| **Paratext** | XmlResourceWindow (HTML viewer) | ❌ Windows Forms |

### Resource Types

```csharp
public enum ResourceType
{
    DBL,                    // Digital Bible Library (default)
    EnhancedResource,       // Legacy enhanced resources
    XmlResource,            // XML-based resources (newer)
    SourceLanguageResource  // Source language tools resources
}
```

### File Formats

| Format | Extension | Purpose |
|--------|-----------|---------|
| Legacy Resource | `.p8z` | Encrypted zip with embedded metadata |
| XML Resource | `.xml1z` | XML-based structured resources |
| Settings | `settings.xml` | Project settings within resource |

### Key Classes and Files

#### Data Layer (ParatextData) - Reusable

| File | Class | Purpose |
|------|-------|---------|
| `ParatextData/ResourceScrText.cs` | `ResourceScrText` | Base class for all resource types |
| `ParatextData/XmlResourceScrText.cs` | `XmlResourceScrText` | XML resource subclass |
| `ParatextData/ProjectFileAccess/ResourceProjectFileManager.cs` | `ResourceProjectFileManager` | Handles zip extraction, old vs new style figures |
| `ParatextData/ProjectFileAccess/ZippedProjectFileManagerBase.cs` | `ZippedProjectFileManagerBase` | Abstract zip operations |
| `ParatextData/Archiving/InstallableResource.cs` | `InstallableResource` | Resource discovery and installation |
| `ParatextData/Archiving/InstallableDBLResource.cs` | `InstallableDBLResource` | DBL integration |

#### UI Layer (Paratext) - Needs Rewrite

| File | Class | Purpose |
|------|-------|---------|
| `Paratext/XmlResource/XmlResourceWindow.cs` | `XmlResourceWindow` | Main XML resource viewer |
| `Paratext/XmlResource/XmlProjectSettings.cs` | `XmlProjectSettings` | Navigation scheme (BCV vs Dictionary) |
| `Paratext/FileMenu/InstallResourcesForm.cs` | `InstallResourcesForm` | Resource installation UI |

### Old vs New Style Resources

The key difference is **figure file location**:

```csharp
// From ResourceProjectFileManager.cs (lines 58-60)
// New resource files put figures in a figures/ folder
// Old resource files kept both text and figures in the same directory
```

**Handling in code:**
```csharp
private void MakeSureFileIsAccessible(string fileName)
{
    // Try figures/ subfolder first (new style)
    // Fall back to root directory (old style)
    // Transparent to calling code
}
```

### Directory Structure

```
Settings Directory/
  _Resources/           # Install location for resource files
  _Dictionaries/        # Install location for dictionary resources
  _resourcesById/       # ID-based resource mapping
  ValidResources.xml    # Cached resource integrity checks
```

### Porting Considerations

**What's reusable:**
- All zip handling and file extraction
- Resource validation and loading
- DBL integration
- Old/new style detection

**What needs rewriting:**
- HTML-based resource viewer (currently uses Firefox backend)
- XPath navigation for dictionary resources

**Recommended approach for Platform.Bible:**
- Extend `c-sharp/` Data Provider to serve resource content via JSON-RPC
- Build a React **WebView extension** for resource display
- Use Electron's webview capabilities for HTML/media rendering
- Implement BCV and Dictionary navigation as PAPI commands
- Leverage existing `platform-scripture` extension patterns

---

## 3. USB Syncing

### Overview

USB syncing allows users to synchronize projects via removable USB drives using Mercurial repositories.

### Architecture Layers

| Layer | Components | Portability |
|-------|------------|-------------|
| **ParatextData** | FileSharedRepositorySource, Hg push/pull, SendReceiveMemento | ✅ Reusable |
| **PtxUtils** | PathUtils.GetUsbDevices() | ⚠️ Platform-specific |
| **Paratext** | SendReceiveProjectsForm (drive dropdown) | ❌ Windows Forms |

### Key Classes and Files

#### Data Layer (ParatextData) - Reusable

| File | Class | Purpose |
|------|-------|---------|
| `ParatextData/Repository/FileSharedRepositorySource.cs` | `USBSharedRepositorySource` | USB repository operations |
| `ParatextData/Repository/SharedRepositorySource.cs` | `SharedRepositorySource` | Abstract base for all sync sources |
| `ParatextData/Repository/SendReceiveMemento.cs` | `SendReceiveMemento` | Persists last sync state |
| `ParatextData/Repository/SharingLogic.cs` | `SharingLogic` | Orchestrates sync operations |
| `ParatextData/Repository/Hg.cs` | `Hg` | Mercurial commands (push, pull, init) |

#### Platform-Specific (PtxUtils) - May Need Adaptation

| File | Method | Purpose |
|------|--------|---------|
| `PtxUtils/PathUtils.cs` | `GetUsbDevices()` | Enumerates USB drives |

**Windows implementation:**
```csharp
// Uses DriveInfo.GetDrives() + WMI Win32_DiskDrive
// Filters by DriveType.Removable and InterfaceType='USB'
```

**Linux implementation:**
```csharp
// Uses DBus/UDisks2 API
// Checks ConnectionBus == "usb" and Removable == true
```

### USB Directory Structure

```
USB Drive:\
  Shared Paratext 8 Projects\
    ProjectName^SendReceiveId\
      .hg\                        # Mercurial repository
      SharedRepositoryInfoPT8.xml # Project metadata
      [book files]
```

### Source Types

```csharp
enum SRSourceTypes
{
    Internet,     // Paratext servers
    Drive,        // USB drive
    Folder,       // Network folder
    ChorusHub,    // ChorusHub server
    WifiDirect    // WiFi direct connection
}
```

### Sync Flow

```
1. User selects "Drive" source in S/R dialog
2. PathUtils.GetUsbDevices() enumerates available USB drives
3. User selects drive from dropdown
4. For each selected project:
   └─> Hg.Push() - uploads local changes to USB
   └─> Hg.Pull() - downloads changes from USB
5. SendReceiveMemento persists last sync state
```

### Android Support

```csharp
// Fallback folder for PT Lite (Android)
Android/data/org.paratext.ptlite/files/Shared Paratext 8 Projects
```

### Porting Considerations

**What's reusable:**
- All Mercurial sync logic
- Repository source abstraction
- State persistence

**What needs adaptation:**
- `PathUtils.GetUsbDevices()` - may need Electron/Node.js equivalent
- USB device detection for macOS (if supporting Mac)

**What needs rewriting:**
- Drive selection UI

**Recommended approach for Platform.Bible:**
- Use Node.js `drivelist` package in **Main Process** for USB detection
- Expose USB operations via **Network Service** to Extension Host
- .NET Data Provider handles all Mercurial operations via ParatextData
- Build React component for drive picker UI
- Register S/R commands via PAPI

---

## 4. Checklists

### Overview

Checklists are verification tools that generate tabular comparisons of scripture data for quality assurance. There are **13 different checklist types**.

### Architecture Layers

| Layer | Components | Portability |
|-------|------------|-------------|
| **ParatextData** | Minimal - uses existing USFM parsing | ✅ Reusable |
| **Paratext** | ChecklistsTool, 13 data sources, XSLT rendering | ❌ **99% UI** |

**Key insight:** Checklists are **entirely UI-based** and generated dynamically (not persisted to disk).

### Checklist Types

1. **Verses** - Display verse text with section headings and footnotes
2. **Section Headings** - List section heading markers
3. **Book Titles** - Display book title markers
4. **Footnotes** - Extract and display all footnotes
5. **Cross References** - Extract cross references and parallel passage refs
6. **Markers** - Check for inconsistent USFM markers
7. **Relatively Long Verses** - Compare verse lengths across versions
8. **Relatively Short Verses** - Compare verse lengths across versions
9. **Long Sentences** - Identify lengthy sentences
10. **Long Paragraphs** - Identify lengthy paragraphs
11. **Quotation Differences** - Identify quotation mark inconsistencies
12. **Punctuation** - Review punctuation patterns
13. **Words/Phrases** - Search for specific words with morphological matching

### Key Classes and Files

#### UI Layer (Paratext) - Needs Complete Rewrite

| File | Class | Purpose |
|------|-------|---------|
| `Paratext/Checklists/ChecklistsTool.cs` | `ChecklistsTool` | Main UI form (1000+ lines) |
| `Paratext/Checklists/CLData.cs` | `CLData`, `CLRow`, `CLCell` | Data structures |
| `Paratext/Checklists/CLDataSource.cs` | `CLDataSource` | Abstract base for data extraction |
| `Paratext/Checklists/ChecklistsView.xslt` | - | XML to HTML transformation |
| `Paratext/Checklists/ChecklistsView.css` | - | Styling |

### Data Structures

```csharp
CLData
├── Title: string
├── HelpText: string
├── ScrTexts: List<ScrText>
├── CheckListType: ChecklistType
└── Rows: List<CLRow>

CLRow
├── Cells: List<CLCell>
├── Score: float (for sorting)
└── FirstRef: VerseRef

CLCell
├── VerseRef: VerseRef
├── Reference: string
├── Paragraphs: List<CLParagraph>
└── Words (for parallelism)
```

### Data Source Hierarchy

```
CLDataSource (abstract)
├── CLParagraphCellsDataSource
│   ├── CLSectionHeadingsDataSource
│   ├── CLBookTitlesDataSource
│   ├── CLLongSentencesDataSource
│   ├── CLLongParagraphsDataSource
│   └── CLMarkersDataSource
├── CLVerseCellsDataSource
│   ├── CLVersesDataSource
│   ├── CLRelativelyLongVersesDataSource
│   ├── CLRelativelyShortVersesDataSource
│   └── CLPunctuationDataSource
└── CLNoteCellsDataSource
    ├── CLFootnotesDataSource
    └── CLCrossReferencesDataSource
```

### Rendering Pipeline

```
CLDataSource.BuildRows()
    ↓
CLData (with Rows/Cells)
    ↓
CLData.ToXml()
    ↓
ChecklistsView.xslt transformation
    ↓
ChecklistsView.css styling
    ↓
HTML display
```

### Porting Considerations

**What's reusable:**
- USFM parsing from ParatextData
- Versification handling
- Basic text extraction

**What needs complete rewrite:**
- All 13 data source classes
- Table generation and alignment logic
- XSLT/HTML rendering pipeline
- Settings and filtering UI

**Recommended approach for Platform.Bible:**
- Create **Data Provider** in `c-sharp/` that generates checklist data as JSON
- Build a React **WebView extension** for checklist display
- Use `platform-bible-react` data table components or AG Grid
- Implement filtering/sorting in React frontend
- Register checklist commands via PAPI
- Consider moving some data source logic to C# backend for reuse

**This is the highest-effort feature to port** due to the 13 data source implementations.

---

## 5. Creating Projects

### Overview

Project creation involves creating new translation projects, derived projects (back translations, study Bibles), and resource projects.

### Architecture Layers

| Layer | Components | Portability |
|-------|------------|-------------|
| **ParatextData** | ScrText, ScrTextCollection, ProjectSettings, VersioningManager | ✅ ~80% Reusable |
| **Paratext** | RestoreForm, project wizards | ❌ Windows Forms |

### Project Types

```csharp
public enum ProjectType
{
    // Base Projects
    Standard,                  // Standard translation
    ConsultantNotes,           // Consultant notes
    GlobalConsultantNotes,     // Global consultant notes
    GlobalAnthropologyNotes,   // Biblical culture notes

    // Derived Projects (require base project)
    BackTranslation,           // Back translation
    Daughter,                  // Front translation based
    TransliterationManual,     // Manual transliteration
    TransliterationWithEncoder,// Encoder-based transliteration
    StudyBible,                // Study Bible
    StudyBibleAdditions,       // Study Bible additions
    Auxiliary,                 // Auxiliary project

    // Resource Projects
    Resource,                  // Copyrighted materials (not user-creatable)
    XmlResource,               // XML resource
    XmlDictionary,             // XML dictionary
    MarbleResource             // Marble enhanced resource
}
```

### Key Classes and Files

#### Data Layer (ParatextData) - Reusable

| File | Class | Purpose |
|------|-------|---------|
| `ParatextData/ScrText.cs` | `ScrText` | Core project representation |
| `ParatextData/ScrTextCollection.cs` | `ScrTextCollection` | Project registry |
| `ParatextData/ProjectSettingsAccess/ProjectSettings.cs` | `ProjectSettings` | Configuration management |
| `ParatextData/ProjectSettingsAccess/TranslationInformation.cs` | `TranslationInformation` | Project type and base project |
| `ParatextData/ProjectType.cs` | `ProjectType` | Project type enum |
| `ParatextData/ProjectFileAccess/ProjectFileManager.cs` | `ProjectFileManager` | File I/O abstraction |
| `ParatextData/ProjectFileAccess/UserProjectFileManager.cs` | `UserProjectFileManager` | User project file handling |
| `ParatextData/Repository/VersioningManager.cs` | `VersioningManager` | GUID and repository management |

#### Plugin API (PluginInterfaces)

| File | Class | Purpose |
|------|-------|---------|
| `PluginInterfaces/ParatextInternal/IProjectCreationAccess.cs` | `IProjectCreationAccess` | Project creation interface |
| `PluginInterfaces/ParatextInternal/NewProjectSettings.cs` | `NewProjectSettings` | Creation configuration |

**Note:** Plugin API is intentionally restricted to XML resources only.

### Project Creation Flow

```
1. Create ScrText instance
   └─> new ScrText(RegistrationInfo.DefaultUser)

2. Configure settings
   └─> Name, FullName, LanguageID, Versification
   └─> TranslationInfo for derived projects
   └─> File naming conventions, encoding

3. Assign GUID
   └─> VersioningManager.EnsureHasGuid(scrText)

4. Persist to disk
   └─> scrText.Save()
   └─> Creates Settings.xml
   └─> Creates project directory
   └─> Creates .hg repository

5. Register in collection
   └─> ScrTextCollection.Add(scrText)
```

### Files Created

```
My Paratext Projects/
├── ProjectShortName/
│   ├── Settings.xml        # Project configuration
│   ├── ProjectName.ldml    # Language definition
│   ├── .hg/                # Mercurial repository
│   │   └── ...
│   └── [book files when created]
├── _Dictionaries/
├── _Resources/
├── _projectsById/
└── _glossing/
```

### Porting Considerations

**What's reusable:**
- All project creation logic in `ScrText`
- Settings persistence
- Directory structure creation
- Mercurial repository initialization

**What needs rewriting:**
- Project creation wizard UI
- Project type selection
- Base project selection for derived types

**Recommended approach for Platform.Bible:**
- Extend .NET **Data Provider** to expose project creation via JSON-RPC
- Use existing `ScrText` and `ScrTextCollection` from ParatextData
- Build React wizard component using `platform-bible-react` dialog patterns
- Register `createProject` command via PAPI
- Validate settings in C# backend before creation

**This is a lower-effort feature to port** since most logic is already in ParatextData.

---

## 6. Parallel Passages

### Overview

Parallel passages show biblical verses that contain similar or identical content across different books (e.g., Synoptic Gospel parallels, OT quotations in NT).

### Architecture Layers

| Layer | Components | Portability |
|-------|------------|-------------|
| **ParatextData** | ParallelPassageStatus (status persistence) | ✅ Reusable |
| **Paratext** | ParallelPassagesTool, data models, XSLT rendering | ❌ Windows Forms |

### Key Classes and Files

#### Data Layer (ParatextData) - Reusable

| File | Class | Purpose |
|------|-------|---------|
| `ParatextData/ParallelPassages/ParallelPassageStatus.cs` | `ParallelPassageStatuses` | Persists approval status to XML |
| `ParatextData/ParallelPassages/ParallelPassageStatus.cs` | `PassageStates` enum | Status values |

#### UI Layer (Paratext) - Needs Rewrite

| File | Class | Purpose |
|------|-------|---------|
| `Paratext/ParallelPassages/ParallelPassagesTool.cs` | `ParallelPassagesTool` | Main UI tool (1000+ lines) |
| `Paratext/ParallelPassages/ParallelPassageSLT.cs` | `SLTParallelPassage`, `ParallelPassageAccessor` | Source language data |
| `Paratext/ParallelPassages/ParallelPassage.cs` | `ParallelPassage` | UI-friendly wrapper |
| `Paratext/ParallelPassages/ParallelText.cs` | `ParallelText` | Verses from one project |
| `Paratext/ParallelPassages/ParallelVerse.cs` | `ParallelVerse` | Single verse with analysis |
| `Paratext/ParallelPassages/ParallelWord.cs` | `ParallelWord`, `DegreeOfParallelism` | Word-level parallelism |
| `Paratext/ParallelPassages/ParallelPassageView.xslt` | - | HTML rendering (290 lines) |

### Data Structures

```csharp
SLTParallelPassage (from GRKP/HEBP projects)
├── Reference: VerseRef
├── Verses: List<VerseRef>
├── PassageType: ParallelPassageFilter
└── ParallelWords: List<string>  // Parallelism markers per verse

ParallelPassage (UI model)
├── Verses: List<LocalizedVerseReference>
└── Texts: List<ParallelText>

ParallelText (one project's verses)
├── ScrText: ScrText
├── ParallelVerses: List<ParallelVerse>
└── Status tracking

ParallelVerse
├── DisplayName: string
├── Verse: string
├── Status: PassageStates
└── Words: List<ParallelWord>

ParallelWord
├── Word: string
├── Gloss: string
├── Punctuation: string
└── Degree: DegreeOfParallelism
```

### Degree of Parallelism

```csharp
enum DegreeOfParallelism
{
    None,              // No parallelism detected
    CalculatedMatch,   // Algorithm found exact match
    ExpertClose,       // Expert identified similar meaning (+)
    ExpertExact        // Expert identified exact match (*)
}
```

### Passage Types

```csharp
enum ParallelPassageFilter
{
    All = 0,       // All parallel passages
    NTtoNT = 1,    // New Testament parallels
    NTtoOT = 2,    // NT quotations from OT
    OTtoOT = 3,    // Old Testament parallels
    Gospels = 4    // Synoptic Gospel parallels
}
```

### Status States

```csharp
enum PassageStates
{
    Unfinished = 1,   // Never finished or reverted
    Outdated = 2,     // Verse changed since marked finished
    Finished = 4,     // Marked finished, unchanged
    MissingText = 8,  // Verse text not present
    IgnoredBook = 32  // Not in checked books list
}
```

### Data Sources

1. **Pre-computed parallel data:** `ParallelPassages/ParallelPassages.xml` (installed with Paratext)
2. **Project text:** From ScrText projects
3. **Approval status:** `ParallelPassageStatus.xml` (per-project, persisted)

### Porting Considerations

**What's reusable:**
- Status persistence (`ParallelPassageStatuses`)
- Pre-computed parallel passage data

**What needs rewriting:**
- Passage list UI
- Word-by-word parallelism display
- XSLT rendering pipeline
- Filtering and navigation

**Recommended approach for Platform.Bible:**
- Create **Data Provider** in `c-sharp/` to load and serve parallel passage data
- Build a React **WebView extension** for the parallel passages tool
- Use `platform-bible-react` components for consistent styling
- Implement word-level highlighting with degree-of-parallelism color coding
- Register navigation commands via PAPI
- Persist approval status via Data Provider using existing `ParallelPassageStatuses`

---

## Platform.Bible Integration Patterns

When porting features to Platform.Bible, follow these architectural patterns:

### Data Provider Pattern

Each feature should expose its data through a **Data Provider** in the `c-sharp/` directory:

```csharp
// c-sharp/Services/ChecklistDataProvider.cs
public class ChecklistDataProvider : IDataProvider<ChecklistData>
{
    // Leverages ParatextData for business logic
    private readonly ScrText _scrText;

    public async Task<ChecklistData> GetData(ChecklistRequest request)
    {
        // Use existing ParatextData classes
        // Return JSON-serializable data
    }
}
```

### Extension Pattern

UI features should be implemented as **Extensions** in `extensions/src/`:

```
extensions/src/
└── platform-checklists/
    ├── manifest.json         # Extension metadata
    ├── src/
    │   ├── main.ts          # Extension entry point
    │   ├── checklist-panel.web-view.tsx  # React WebView
    │   └── types/
    └── contributions/        # Menu items, commands
```

### Communication Flow

```
┌─────────────────┐     PAPI Command      ┌─────────────────┐
│  React WebView  │ ─────────────────────►│  Extension Host │
│  (Renderer)     │                       │                 │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                          JSON-RPC │ WebSocket
                                                   │
                                          ┌────────▼────────┐
                                          │ .NET Data       │
                                          │ Provider        │
                                          │                 │
                                          │ • ParatextData  │
                                          │ • Mercurial     │
                                          └─────────────────┘
```

### Key Integration Points

| Feature Need | Platform.Bible Solution |
|--------------|------------------------|
| Display scripture | Use `platform-scripture` extension |
| Edit scripture | Use `platform-scripture-editor` extension |
| Show dialogs | Use `platform-bible-react` dialog components |
| Persist settings | Use Settings Service via PAPI |
| Navigate to verse | Use navigation commands via PAPI |
| Access project data | Create/extend Data Provider in `c-sharp/` |

---

## Porting Effort Summary

| Feature | ParatextData (Reusable) | UI (Rewrite) | Existing Infrastructure | Overall Effort |
|---------|------------------------|--------------|------------------------|----------------|
| **S/R Conflict Resolution** | High (merge, diff logic) | High (diff viewer, forms) | ParatextProjectDataProvider has comment/thread support | **High** |
| **Translation Resources** | High (zip, loading) | Medium (HTML viewer) | DblResourcesDataProvider exists for DBL | **Medium** |
| **USB Syncing** | High (Hg sync) | Low (drive picker) | None | **Medium** |
| **Checklists** | Minimal | **Very High** (99% UI) | CheckRunner + InventoryDataProvider exist | **Medium-High** |
| **Creating Projects** | High (all logic) | Low (wizard forms) | LocalParatextProjects + ProjectDataProviderFactory exist | **Low** |
| **Parallel Passages** | Low (status only) | High (tool, rendering) | None | **Medium-High** |

### Existing Infrastructure Impact

Several features have **significant infrastructure already in place**:

| Feature | Existing Support | Remaining Work |
|---------|-----------------|----------------|
| **S/R Conflict Resolution** | Comments API complete, thread management | Diff viewer UI, conflict resolution UI |
| **Translation Resources** | DBL download/install/uninstall | Resource viewer UI, navigation |
| **Checklists** | CheckRunner (14 check types), InventoryDataProvider | Checklist UI, data source extraction |
| **Creating Projects** | Project creation API, settings management | Wizard UI, project type selection |

### Recommended Porting Order

1. **Creating Projects** - Low effort, foundational feature, infrastructure exists
2. **USB Syncing** - Medium effort, mostly reusable backend
3. **Translation Resources** - Medium effort, DBL infrastructure exists
4. **Checklists** - Medium-high effort, CheckRunner provides backend
5. **Parallel Passages** - Medium-high effort, well-defined data model
6. **S/R Conflict Resolution** - High effort, complex UI requirements

### Cross-Cutting Concerns

1. **Mercurial Integration** - Required for S/R and USB sync
2. **USFM Parsing** - Used by all features via ParatextData
3. **Versification** - Required for all scripture-related features
4. **Project Comments** - Used by conflict resolution, parallel passages
5. **Status Persistence** - XML-based, handled by ParatextData

---

## Appendix: Key File Locations

### ParatextData (Reusable Core)

```
ParatextData/
├── Repository/
│   ├── Hg.cs                    # Mercurial wrapper
│   ├── SharingLogic.cs          # S/R orchestration
│   ├── FileSharedRepositorySource.cs  # USB sync
│   └── Mergers/
│       └── BookFileMerger.cs    # Conflict detection
├── ParallelPassages/
│   └── ParallelPassageStatus.cs # Status persistence
├── ProjectFileAccess/
│   ├── ProjectFileManager.cs    # File I/O
│   └── ResourceProjectFileManager.cs  # Resource handling
├── UsfmDiff/
│   └── DiffToken.cs             # Diff generation
├── ScrText.cs                   # Core project class
├── ScrTextCollection.cs         # Project registry
└── ResourceScrText.cs           # Resource projects
```

### Paratext UI (Needs Rewrite)

```
Paratext/
├── Repository/
│   ├── SendReceiveProjectsForm.cs
│   └── ChangeListForm.cs
├── ToolsMenu/
│   └── DifferencesToolForm.cs   # Compare Versions
├── Checklists/
│   ├── ChecklistsTool.cs
│   └── CLData.cs
├── ParallelPassages/
│   ├── ParallelPassagesTool.cs
│   └── ParallelPassageView.xslt
├── XmlResource/
│   └── XmlResourceWindow.cs
└── BackupRestore/
    └── RestoreForm.cs
```

### Platform-Specific

```
PtxUtils/
└── PathUtils.cs                 # USB device detection
```

### Platform.Bible C# Backend (paranext-core/c-sharp/)

```
c-sharp/
├── Program.cs                   # Entry point, provider registration
├── PapiClient.cs                # JSON-RPC WebSocket communication
├── Services/
│   ├── AppService.cs            # Application info
│   ├── SettingsService.cs       # App-wide settings
│   ├── ProjectSettingsService.cs # Per-project settings
│   ├── SharedStore.cs           # Cross-process state (Lamport clocks)
│   └── LocalizationService.cs   # i18n
├── Projects/
│   ├── ParatextProjectDataProvider.cs  # USFM/USX/Comments (57KB)
│   ├── LocalParatextProjects.cs        # Filesystem access
│   └── DigitalBibleLibrary/
│       └── DblDownloadableDataProvider.cs  # DBL integration
├── Checks/
│   ├── CheckRunner.cs           # Quality checks orchestrator
│   └── InventoryDataProvider.cs # Scripture inventory
├── NetworkObjects/
│   ├── DataProvider.cs          # Base data provider class
│   └── NetworkObject.cs         # Base network object class
├── JsonUtils/
│   ├── VerseRefConverter.cs     # VerseRef JSON converter
│   ├── CommentConverter.cs      # Comment JSON converter
│   └── SerializationOptions.cs  # JSON-RPC formatter setup
└── ParatextUtils/
    └── ParatextGlobals.cs       # Paratext initialization
```
