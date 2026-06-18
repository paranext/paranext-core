# ParatextData PT10 Readiness Assessment Report

## Executive Summary

This report assesses whether ParatextData is ready for PT10 feature implementation, identifying gaps that may require work in this codebase before PT10 development.

**Overall Finding:** ParatextData is **largely ready** for Level A features but has significant gaps for Level B/C features.

| Feature | Level | ParatextData % | Readiness | Effort to Fix Gaps |
|---------|-------|----------------|-----------|-------------------|
| Creating Projects | A | 95% | ✅ 90% | Low (1-2 days) |
| USB Syncing | A | 90% | ✅ 88% | Low (1-2 days) |
| S/R Conflict Resolution | B | 70% | ⚠️ 75% | Medium (3-5 days) |
| Parallel Passages | B | 40% | ⚠️ 55% | Medium (3-5 days) |
| Translation Resources | B/C | 80% | ⚠️ 70% | Medium (2-4 days) |
| Checklists | C | 5% | ❌ 5% | High (full rewrite in PT10) |

---

## Feature 1: Creating Projects (Level A, 95% ParatextData)

### Current Capabilities
- `ScrTextCollection` - Project collection management with `Initialize()`, `Add()`, `Get()`
- `ScrText` - Full project object with `Clone()` method for project duplication
- `ProjectSettings` - 100+ configurable properties (language, versification, encoding, etc.)
- Strong-named assembly with `[StableAPI]` attributes

### Gaps Identified

| Gap | Severity | Location | Description |
|-----|----------|----------|-------------|
| **No CreateProject factory** | Medium | `ScrTextCollection.cs` | Only `Clone()` exists; no `CreateNewProject(settings)` method |
| **Registry path hardcoded** | Medium | `ScrTextCollection.cs:670` | Default path `C:\My Paratext 9 Projects` hardcoded |
| **Version cap at 9.5.0.1** | Low | `ParatextInfo.cs:102` | `MaxSupportedParatextDataVersion` needs update for PT10 |
| **User registration required** | Low | `RegistrationInfo.cs` | Cannot create projects without valid `ParatextUser` |
| **No validation API** | Low | N/A | No centralized `ProjectCreationValidator` class |

### Missing APIs
- `ScrTextCollection.CreateNewProject(settings)` - High-level factory method
- `ProjectCreationValidator` - Settings validation before creation
- Project templates (Scripture, BackTranslation, Glossing, etc.)

### Critical Files
- `ParatextData/ScrTextCollection.cs` (1,689 lines)
- `ParatextData/ScrText.cs` (2,070 lines)
- `ParatextData/ProjectSettingsAccess/ProjectSettings.cs` (2,323 lines)
- `ParatextData/ParatextInfo.cs` (version constants)
- `PluginInterfaces/ParatextInternal/NewProjectSettings.cs` (exists but not integrated)

---

## Feature 2: USB Syncing (Level A, 90% ParatextData)

### Current Capabilities
- `FileSharedRepositorySource` - Complete USB/network folder implementation
- `USBSharedRepositorySource`, `NetworkSharedRepositorySource` - Concrete implementations
- Full operations: `GetRepositories()`, `CreateRepository()`, `Push()`, `Pull()`, `Verify()`
- Conflict recovery with `RecoverAndRetryPush()`, `HideAndCreateRepository()`
- Metadata via `SharedRepositoryInfoPT8.xml`

### Gaps Identified

| Gap | Severity | Location | Description |
|-----|----------|----------|-------------|
| **No async operations** | Medium | All sync methods | `Pull()`, `Push()` block UI; no `CancellationToken` |
| **Mercurial singleton** | Medium | `Hg.Default` throughout | Tightly coupled; hard to mock for testing |
| **No device detection** | Low | `FileSharedRepositorySource.cs` | Can't warn if USB disconnected mid-sync |
| **Alert dialogs hardcoded** | Low | `SharingLogic.cs` | UI alerts not abstracted |
| **No progress streaming** | Low | Uses `Progress.Mgr` | Callback-based, not async stream |

### Missing APIs
- `PullAsync()`, `PushAsync()` with `CancellationToken`
- `IVersionControl` interface (abstract away Mercurial)
- `IUSBDeviceMonitor` for presence/health checks
- `IErrorReporter` to replace `Alert.Show()`

### Testing Gaps
- No isolated unit tests for `FileSharedRepositorySourceBase`
- No simulation of USB disconnection, permission errors, disk full
- Integration tests rely on actual Mercurial

### Critical Files
- `ParatextData/Repository/FileSharedRepositorySource.cs` (414 lines)
- `ParatextData/Repository/SharedRepositorySource.cs` (367 lines)
- `ParatextData/Repository/SharingLogic.cs` (615 lines)
- `ParatextData/Repository/Hg.cs` (Mercurial wrapper)

---

## Feature 3: S/R Conflict Resolution (Level B, 70% ParatextData)

### Current Capabilities
- `BookFileMerger` - Three-way merge at chapter/verse level (590 lines)
- `IProjectFileMerger` interface with implementations for books, XML, INI, SSF files
- Conflict recording via `Comment` objects with `NoteType.Conflict`
- 7 conflict types: `ReadError`, `InvalidVerses`, `VerseBridgeDifferences`, `DuplicateVerses`, `VerseOrderError`, `VerseTextConflict`
- USFM normalization and verse bridging detection

### Gaps Identified

| Gap | Severity | Location | Description |
|-----|----------|----------|-------------|
| **No conflict preview** | High | N/A | Can't show conflicts before merge |
| **Hardcoded merge strategy** | Medium | `BookFileMerger.cs:180` | `keepMine = myChanges >= theirChanges` not configurable |
| **No selective resolution** | Medium | N/A | All-or-nothing merge; no per-conflict choice |
| **No BookFileMerger tests** | Medium | N/A | No dedicated unit tests found |
| **No rollback capability** | Low | N/A | Cannot undo after merge |
| **No severity classification** | Low | N/A | All conflicts treated equally |

### Missing APIs
- `IMergePredictorEngine` - Preview conflicts before merge
- `IConflictResolver` - Pluggable resolution strategies
- `IMergeProgressReporter` - Real-time status (not callback-based)
- `Conflict`, `ConflictType`, `ConflictSeverity` data models

### UI Logic in Paratext/ Layer (needs abstraction)
- `VersionedText.ShareChanges()` (1,500+ lines) - Merge orchestration
- `SendReceiveProjectsForm.cs` (1,800+ lines) - Change list display
- Conflict comment generation (presentation format)

### Critical Files
- `ParatextData/Repository/Mergers/BookFileMerger.cs` (590 lines)
- `ParatextData/Repository/Mergers/IProjectFileMerger.cs`
- `ParatextData/Repository/Mergers/ProjectSettingsFileMerger.cs` (5,204 lines)
- `Paratext/Repository/VersionedText.cs` (UI layer)

---

## Feature 4: Parallel Passages (Level B, 40% ParatextData)

### Current Capabilities
- `ParallelPassageStatuses` - Singleton with XML persistence
- `ParallelPassageStatus` - Full state model (Unfinished/Finished/Outdated/MissingText/IgnoredBook)
- `GetPassageState()`, `SetPassageState()`, `GetPreviousPassageVersion()`
- XML serialization to `ParallelPassageStatus.xml`
- WriteLock integration for concurrent access

### Gaps Identified

| Gap | Severity | Location | Description |
|-----|----------|----------|-------------|
| **No change notifications** | High | `ParallelPassageStatuses` | No events when status changes |
| **Empty History class** | High | `ParallelPassageStatus.cs` | `History` field marked "for future use" |
| **No query APIs** | Medium | N/A | No `GetAllPassagesByStatus()` method |
| **No user/timestamp tracking** | Medium | N/A | State changes not audited |
| **Comparison logic in UI only** | Medium | `Paratext/ParallelPassages/` | 4,185 lines in UI layer |

### Missing APIs
- `PassageStateChanged` event
- `GetAllPassagesByStatus(PassageStates)` - Bulk queries
- `GetPassageHistory(VerseRef)` - History retrieval
- `GetStatisticsForProject()` - Completion metrics
- `IParallelPassageService` interface

### UI Logic in Paratext/ Layer (needs extraction or rewrite)
- `ParallelPassagesTool.cs` (~1,800 lines) - Window management, XSLT rendering
- `SLTParallelPassage.cs` - Comparison logic
- Filter classes: `PassageFilters.cs`, `PassageFilterSelectionAdapter.cs`

### Critical Files
- `ParatextData/ParallelPassages/ParallelPassageStatus.cs` (342 lines)
- `Paratext/ParallelPassages/ParallelPassagesTool.cs` (UI layer)
- `Paratext/ParallelPassages/ParallelPassages.cs` (data aggregation)

---

## Feature 5: Translation Resources (Level B/C, 80% ParatextData)

### Current Capabilities
- `InstallableResource` - Base class for installable resources
- `InstallableDBLResource` - DBL API integration with REST client
- `DBLMetadata`, `DBLServices` - Metadata management
- `BibleModuleManager` - Module generation from USFM
- Resource installation with dependency tracking

### Gaps Identified

| Gap | Severity | Location | Description |
|-----|----------|----------|-------------|
| **No unified resource interface** | Medium | N/A | Handling scattered across classes |
| **No resource query APIs** | Medium | N/A | No `GetInstalledResources()`, `SearchResources()` |
| **No permission model** | Medium | N/A | No access control enforcement |
| **No installation history** | Low | N/A | No rollback or audit trail |
| **No usage tracking** | Low | N/A | No resource usage metrics |

### Missing APIs
- `IResourceService` - Unified resource access
- `IResourceRepository` - Resource storage/query
- `GetInstalledResources()`, `SearchResources()` methods
- `ResourceInstalled`, `ResourceUpdated` events
- Permission checking: `CanAccessResource(user, resource)`

### UI Logic in Paratext/ Layer
- `InstallResourcesForm.cs` (~1,000 lines) - Installation UI
- `XmlResourceWindow.cs` (~500 lines) - Resource viewing

### Critical Files
- `ParatextData/Archiving/InstallableResource.cs` (~400 lines)
- `ParatextData/Archiving/InstallableDBLResource.cs` (~300 lines)
- `ParatextData/BibleModule/BibleModuleManager.cs` (~300 lines)
- `ParatextData/DBLServices/DBLMetadata.cs`

---

## Feature 6: Checklists (Level C, 5% ParatextData)

### Current Capabilities (MINIMAL)
- `CheckingStatus` - Simple data class (BookName, Check, MD5, Date, Errors)
- `CheckingStatuses` - Tracks "have we run check X on book Y"
- XML persistence to `CheckingStatus.xml`

### Gaps Identified

| Gap | Severity | Location | Description |
|-----|----------|----------|-------------|
| **Complete data model missing** | Critical | N/A | Entire `CLData` structure is UI-only |
| **No results persistence** | Critical | N/A | Checklist results not stored |
| **No comparison storage** | Critical | N/A | Results regenerated every view |
| **All 5,845 lines in UI** | Critical | `Paratext/Checklists/` | Complete WinForms rewrite needed |
| **No settings persistence** | High | N/A | Marker/punctuation settings in UI only |

### What Exists ONLY in UI Layer (5,845 lines)
- `ChecklistsTool.cs` (~2,100 lines) - Main form
- `CLData.cs` - Complete data model (NOT in ParatextData)
- `CLDataSource.cs` and subclasses - Data extraction
- `CLVerseCellsDataSource`, `CLNoteCellsDataSource`, etc.
- XSLT templates, CSS, settings forms

### Required for PT10 (Complete Rewrite)
- Move `CLData` model to ParatextData
- Create `IChecklistService` interface
- Implement results persistence layer
- Create React components (replace WinForms)
- Implement settings storage in ParatextData

### Critical Files (all in UI layer)
- `Paratext/Checklists/ChecklistsTool.cs` (~2,100 lines)
- `Paratext/Checklists/CLData.cs` (574 lines)
- `Paratext/Checklists/CLDataSource.cs` (565 lines)

---

## Cross-Cutting Gaps

### Infrastructure Issues

| Issue | Affected Features | Description |
|-------|-------------------|-------------|
| **Static initialization** | All | `ParatextData.Initialize()` required with singleton patterns |
| **Mercurial coupling** | USB Syncing, S/R | `Hg.Default` singleton throughout |
| **No async/await** | USB Syncing, S/R | All operations synchronous |
| **Alert dialogs hardcoded** | USB Syncing, S/R | UI alerts not abstracted |
| **30+ TODO comments** | Various | Technical debt markers |

### Version/Package Status
- Source: v9.5.0.1-beta
- PT10 uses: v9.5.0.18 (via NuGet)
- `GeneratePackageOnBuild=true` configured
- Strong-named assembly with `[StableAPI]` markers

---

## Recommendations by Priority

### Must Fix Before PT10 Development

1. **Update version constants** (ParatextInfo.cs)
   - Change `MaxSupportedParatextDataVersion` to 10.x

2. **Add change notifications to ParallelPassageStatuses**
   - Implement `PassageStateChanged` event
   - Required for reactive UI updates

### Should Fix for Clean PT10 Integration

3. **Add CreateProject factory method** (ScrTextCollection.cs)
   - High-level `CreateNewProject(settings)` API

4. **Extract Mercurial abstraction** (Repository layer)
   - `IVersionControl` interface to decouple from `Hg.Default`

5. **Add async wrappers** (Repository layer)
   - `PullAsync()`, `PushAsync()` with cancellation

6. **Populate ParallelPassageHistory**
   - Structure exists; implement recording

### Can Defer (Work Around in PT10)

7. Abstract Alert dialogs
8. Add resource query APIs
9. Implement conflict preview system
10. Add comprehensive unit tests for mergers

---

## Effort Estimates

| Work Item | Effort | Priority |
|-----------|--------|----------|
| Version constant updates | 1 hour | Must do |
| ParallelPassage notifications | 4-8 hours | Must do |
| CreateProject factory | 4-8 hours | Should do |
| Mercurial abstraction | 2-3 days | Should do |
| Async wrappers | 1-2 days | Should do |
| History implementation | 4-8 hours | Should do |
| Checklists (PT10 rewrite) | 2-3 weeks | Separate project |

**Total preparation work:** 1-2 weeks for critical/important items
