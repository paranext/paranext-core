# Investigation: Project plan progress tracking in P10 Simple mode

**Date:** 2026-07-17
**Status:** Investigation (pre-design)
**Feature:** Let Saroj (Simple-mode persona) track translation work against the project plan
stored on a Paratext Scripture project.

**Researched against** (all file/line references in this doc were read at these
commits; line numbers will drift as the repos move):

| Repo                         | Branch @ commit                                       | Commit date |
| ---------------------------- | ----------------------------------------------------- | ----------- |
| Paratext (P9)                | `master` @ `66e97ce9fc4182d537f3a3dc2b7a36d476730b67` | 2026-07-14  |
| paranext-core (P10)          | `main` @ `e3701b4487188eaf9855e063c6ddef1f85066dc9`   | 2026-07-16  |
| paratext-10-studio (overlay) | `main` @ `1d7fe9f790f46c207f2795d2d1551e2a0475f98d`   | 2026-05-19  |

NuGet packages inspected by reflection: `ParatextData 9.5.0.22` / `ParatextChecks
9.5.0.22` (the versions `c-sharp/ParanextDataProvider.csproj` references; .NET Standard
2.0 build, the only one the packages ship).

## Tentative requirements

1. View the active chapter's current stage (as per project plan).
2. Fallback if no project plan is selected.
3. View which steps remain to be completed for this chapter, in order to progress to the
   next stage.
4. For steps which are a checkbox, Saroj is able to check a box in relation to this chapter.
5. For steps which are a check that must earn a "pass", Saroj is able to see the actions
   that must be done to earn the "pass".
6. View an indication when all steps have been completed, and the chapter is at the next
   stage.

**Deployment constraint:** the feature only needs to _work_ in Paratext 10 Studio (the
closed-source overlay built from `paratext-10-studio` `repo-patches/paranext-core.patch`),
but development may happen in this repo (paranext-core), the Studio patch repo, or the
related extension repos (`paratext-bible-extensions`, `paratext-bible-internal-extensions`).

**Simple mode** already exists in P10 as the `platform.interfaceMode` core setting
(`'simple' | 'power'`, `src/declarations/papi-shared-types.ts:275`, declared in
`src/extension-host/data/core-settings-info.data.ts:38`), switched via the **User
profile** dropdown in the title bar (**Interface mode**). Web-view layouts already
support simple-mode variants, so the feature has an existing mode to target.

> **Version caveat for all P9 references:** the P9 line refs and behaviors in this doc
> were researched against the Paratext repo at the commit pinned above, which builds
> **9.6.x** (`MaxSupportedParatextDataVersion = 9.6.1.1`). paranext-core currently links the
> **ParatextData/ParatextChecks 9.5.0.22** NuGet packages. Some mechanisms cited below
> (notably the `AdditionalCheck` forward-compat convention, §2.4/§5.3) exist only in
> 9.6.x. **Per the P9 team (2026-07-20): use `9.6.0.2-beta`** — it was created to
> include the changes this task needs (`9.6.0.1-beta` does not include them). Do not
> wait for a non-beta package: the `-beta` suffix remains until the corresponding P9
> 9.6 release ships and is not a stability signal. There is no known blocker to
> upgrading (the 9.5 bump was itself done to gain new capability).

**What is and isn't gated on the P9 9.6 _release_** (to head off a natural misreading —
the package prerequisite above is not a release prerequisite):

- **Not gated — the v1 feature.** Manual task ticks and stage advancement write only
  long-standing schema (`<Status>` entries, `ChapRevId`s) that every 9.x P9 reads and
  merges, and standard plans contain only check types every current P9 recognizes. P10
  wants the 9.6.0.2-beta package so _its own evaluator_ handles `AdditionalCheck`
  entries correctly and gets the helpers added for this task — not because P10's writes
  need 9.6 readers. Development and v1 shipping can proceed now.
- **Gated on 9.6 release + team adoption — P10 adding its own check types to plans.**
  That future phase rides the `AdditionalCheck` convention and must stamp the project
  via `UpdateMinimumParatextDataVersion(9.6)` (§5.3), locking out every pre-9.6 P9
  user — which, before 9.6 ships, is everyone on P9. Out of v1 scope (plan editing is
  excluded) anyway.
- **Independent of P10:** teammates on pre-9.6 P9 will wipe progress at stages
  containing `AdditionalCheck` entries (put there by a newer P9) regardless of what P10
  does — P9's own version-skew issue.

## TL;DR

- P9 stores the whole plan **and** all recorded progress in `ProjectProgress.xml` (plus a
  small `ProjectProgressExt.xml` overflow file) in the project directory, serialized with
  .NET `XmlSerializer` from classes in `ParatextData\ProjectProgress\`.
- paranext-core already references **ParatextData 9.5.0.22**, and the
  `Paratext.Data.ProjectProgress` namespace (with `ProjectProgressInfo`, `Stage`, `Task`,
  `Check`, …) is in that DLL and entirely unused today. Reading and writing the native
  files with full Send/Receive merge compatibility is therefore possible from
  `c-sharp/` with **no new dependency**.
- There are two distinct layers of "done":
  1. **Manual task marks** (`<Status bookChapter="62-3" done= user= date=>`) — simple
     writes, feasible anywhere paranext-core runs.
  2. **Stage completion per chapter** — a **Mercurial revision id** stored per chapter
     (`ChapRevId`), written only after committing the book to the project's Hg repo.
     Open-source paranext-core has **no Hg commit path** (all commit/S&R methods throw
     `PlatformUnimplementedException`); the real implementations live in the Studio
     overlay patch. Since the feature is Studio-only, this is workable — but it decides
     _where_ the advancement code can execute.
- The per-chapter evaluation engine (which steps apply, does a check pass, may this
  chapter advance) lives in P9's **UI assembly** (`Paratext\ProjectProgress\
TaskAndCheckProgress.cs`), _not_ in ParatextData — P10 must re-implement it, reusing
  ParatextData primitives plus P10's existing `CheckRunner`.
- Recommended access pattern: new `projectInterface` + data types on the existing C#
  `ParatextProjectDataProvider` (the Comments/`CommentManager` precedent), consumed via
  `useProjectData` in the web view.
- **Two findings from adversarial review bound the scope (§7):** (1) typical standard
  plans put check types P10 cannot evaluate in stage 3 onward, so automatic stage
  advancement caps at roughly stage 2 unless more check types are ported (§5.3) —
  manual task tracking works at every stage regardless; (2) the safety convention for
  steps P10 can't evaluate (`AdditionalCheck`) only exists in ParatextData 9.6.x, so a
  package upgrade from 9.5.0.22 to `9.6.0.2-beta` is a prerequisite for the write side.

---

## 1. P9 data model and storage

### 1.1 Files in the Scripture project directory

| File                        | Contents                                                                                                      | Reader/writer                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `ProjectProgress.xml`       | The plan (stages → tasks/checks) **and** recorded progress. Root element `<ProgressInfo>`.                    | `ProjectProgressInfo.ProgressDataFile` (`ParatextData\ProjectProgress\ProjectProgressInfo.cs:270`) |
| `ProjectProgressExt.xml`    | Backward-compat overflow: per-stage `OptionalChecks` + `BasePlanTaskMovedStage`.                              | `ProgressExtDataFile` (`ProjectProgressInfo.cs:390`)                                               |
| `ProjectProgress.tsv`       | **Derived, write-only** summary (percent complete per book/stage) regenerated on every save; never read back. | `ProjectProgressInfo.WriteTSV()` (`ProjectProgressInfo.cs:212`)                                    |
| `TranslationPriorities.xml` | Related but separate: ordered book/chapter translation priorities.                                            | `TranslationPriorities.Get(scrText)` (`TranslationPriorities.cs:14`)                               |

Nothing plan-related is stored in `Settings.xml`. Standard base plans are loose XML files
in `{ScrTextCollection.SettingsDirectory}\_StandardPlans` (custom plans in a `Custom`
subfolder), enumerated by `ProgressInfo.GetStandardPlans()` / `GetCustomPlans()`
(`ProgressInfo.cs:634,661`).

Send/Receive merges `ProjectProgress.xml` with a **custom three-way XML merger** keyed on
stage/task ids ("all claimed progress is kept"; `ParatextData\Repository\
ProjectFileClassifier.cs:1719-1932`). Note the merger is not fully semantic:
`CompletedChapters` entries are keyed **positionally** and `PreferDeletesOverChanges =
true`, so when two clients disagree about a chapter's `ChapRevId`, a clear (delete) wins
over an advancement — a wrong regression propagates.

P10 writes should go through the ParatextData classes rather than our own serializer so
the schema and merge behavior match P9 — but that is **not** a blanket round-trip
guarantee. `XmlSerializer` drops any element/attribute the linked ParatextData version
doesn't model (there is no `XmlAnyElement` catch-all). Real forward-compat plumbing does
exist — unknown enum strings survive round-trip (`Enum<T>.InternalValue`,
`PtxUtils/Enum.cs:96-100`), custom `<Field>` elements are preserved
(`TaskBase.cs:66-73,492-528`), and `CleanUpTasks` does not delete unknown tasks
(`ProjectProgressInfo.cs:313-343`) — but a plan written by a newer P9 with genuinely new
schema elements would lose them when older-linked P10 saves. Practical mitigation:
`GetMinimumRequiredVersion()` returns `999.0.0.0` when anything in the plan is
unrecognized (`ProgressInfo.cs:1229-1247`) — check it before allowing P10 writes.

### 1.2 Object model

```
ProjectProgressData  [XmlRoot "ProgressInfo"]              ProgressInfo.cs:955
├─ PlanId / PlanVersion
├─ BasePlanType {None | ProjectPlan | StandardPlan}, BasePlanId/Name/Modified
├─ PlannedBooks + EasiestBooks/EasyBooks/ModerateBooks/DifficultBooks : BookSet
└─ Stages[]                                                Stage.cs:17
    ├─ Id (GUID), Names/Descriptions (localized dictionaries)
    ├─ Tasks[]  : Task   — manual steps                    Task.cs:15
    │    ├─ Type {ManualByChapter | ManualByBook | ManualByProject}
    │    ├─ Availability {WhenStageIsComplete, AfterPreviousTaskForChapter, ...}
    │    ├─ BookAssignments[] → ChapterAssignment {user, chapter ranges}
    │    ├─ verses-per-day effort per difficulty bucket
    │    └─ TaskStatus[] {bookNum, chapterNum, IsDone, LastUpdatedBy, LastUpdateOn}
    ├─ Checks[] : Check  — automated steps                 Check.cs:14
    │    ├─ Type {BasicCheck, NoteCheck, SpellCheckUnknown, BiblicalTermRenderings,
    │    │        BackTranslation*, InterlinearGlosses, PassageCheck, ...,
    │    │        AdditionalCheck (sentinel for checks a newer Paratext owns)}
    │    ├─ BasicCheckType (when Type == BasicCheck), Details
    │    └─ PostponedBooks {bookNum → later StageId + reason}
    └─ StageBookStatus[] {BookNum, ChapterStatus[]}        Stage.cs:346
         one string per chapter: "" = not complete at this stage,
         otherwise the Hg revision id of the text when it passed this stage
```

Entry point: `ScrText.Progress` → `ProjectProgressInfo` (`ParatextData\ScrText.cs:337`),
with ready-made queries `IsCompleteAtStage`, `GetFirstIncompleteStageIndex`,
`PercentComplete`, `CalcCompletedChaptersAndVerses`, and `GetText(stageIndex)` (which
reconstructs the text as it was when a stage completed, using the stored Hg revision).

Class hierarchy: `ProgressInfo` (data holder) → `ReadOnlyProjectProgressInfo` (queries +
read-only guards) → `ProjectProgressInfo` (persistence; all mutators wrapped in the
persisted file's `UpdateLock()` write lock).

### 1.3 Two layers of "done"

1. **Manual task marks** — `Task.SetCompleteStatus(bookNum[, chapterNum], complete,
userName)` (`Task.cs:324-361`) creates/updates a `TaskStatus` entry. `ManualByProject`
   tasks store status on book −1; `ManualByBook` on chapter 0.
2. **Stage completion** — `ReadOnlyProjectProgressInfo.SetChapterRevision(stageIndex,
bookNum, chapterNum, revisionId)` (`ReadOnlyProjectProgressInfo.cs:184`) writes the
   `ChapRevId`. `CleanUpProgress()` (`:694`) enforces monotonicity: a chapter cannot be
   complete at stage N+1 unless complete at stage N.

### 1.4 Permissions

Plan editing and progress marking are gated by `PermissionType.Progress`
(`ParatextData\Users\PermissionManager.cs:26,75`); consumers call
`scrText.Permissions.CanEdit(PermissionType.Progress, userName)`. A user _without_ that
permission may still tick chapters **assigned to them** (assignment-based access); an
admin with the permission may tick anything. `ReadOnlyProjectProgressInfo` throws on all
mutators when read-only.

---

## 2. P9 runtime mechanics, mapped to the requirements

The evaluation engine is `Paratext\ProjectProgress\TaskAndCheckProgress.cs` — a
per-`(project, book)` object recomputed on demand, **never persisted**, living in the P9
UI assembly (not in the ParatextData NuGet paranext-core references). P10 must
re-implement its logic.

### 2.1 "Current stage" of a chapter (req 1)

Derived, not stored: the chapter's current stage is the lowest `stageIndex` where
`IsCompleteAtStage(stageIndex, bookNum, chapterNum)` is false (stages complete strictly
in order). The evaluator also computes `chapterToFirstFailingStage[chapterNum]`
(`TaskAndCheckProgress.cs:25,663`) — the first stage with an unresolved issue — and
`ChapterMayBeCompleted(stageIndex, chapterNum)` = `stageIndex <
chapterToFirstFailingStage[chapterNum]` (`:412`).

### 2.2 No plan / fallback (req 2)

An empty plan is `Stages` empty + `BasePlanType = None` (real example:
`ParatextProjects\zzz5\ProjectProgress.xml`). A missing file deserializes to an empty
`ProjectProgressData`. So "no plan selected" is detectable as `Stages.Count == 0`.

### 2.3 Which steps apply to a chapter (req 3)

- A stage's steps are `Stage.TasksAndChecks` (`Stage.cs:47`).
- Availability gating per `AvailabilityType` (`TaskAndCheckProgress.IsAvailable`,
  `:1222-1280`): immediately (`WhenBookStarts`/`WhenProjectStarts`), after the previous
  task per chapter/book, or when a prerequisite stage completes (per book or per
  chapter).
- Assignment filtering: `TaskBase.GetChapterAssignment(bookNum, userName, numChapters)`
  (`TaskBase.cs:189`); no assignment ⇒ not shown as the user's work (except
  `NotesAssignedToMeCheck`). Some checks derive "assigned users" from permissions
  (`Spellings`/`Renderings`, `Check.cs:299`).
- Postponed checks are relocated to their postponed stage
  (`FindStageLocationForChecks`, `:940`).

### 2.4 How a check earns a "pass" (req 5)

A check passes for a chapter when it yields **zero undenied issues** for that chapter.
Checks are **run on demand and never persisted**: each evaluator build runs
`Check.GetResults(checksDataSource)` (`Paratext\ProjectProgress\CheckX.cs:92`), e.g.:

- `BasicCheck` → `RunBasicChecks.RunSingleCheck`, dropping comments/warnings and
  **denied errors** (`ErrorMessageDenials.Get(scrText).IsDenied(...)`,
  `CheckX.cs:142-166`). The user earns a pass by **fixing each error or denying it**.
  Note the split: the check _engine_ (`RunBasicChecks`) is in the shared
  **ParatextChecks** assembly, but the pass/fail _filtering_ (drop `## ` comment
  results, drop `VerseListItemType.Warning`, apply denials) lives in **Paratext.exe's
  UI project** (`CheckX.cs:157-165`) — P10 gets the identical engine from the NuGet but
  must re-implement the filtering, with divergence risk if it differs (see §7).
- `NoteCheck` family → pass when the relevant comment threads are resolved.
- `SpellCheck*` → wordlist spelling states; `BiblicalTermRenderings` → term renderings
  present; `BackTranslation*`/`DerivedStatus`/`InterlinearGlosses`/`PassageCheck` →
  their respective subsystems.
- A check that cannot run (missing setup) marks all verses as issues so the stage cannot
  complete until configured (`SetupNeeded`, `CheckX.cs:892`).
- `AdditionalCheck` — a check owned by a newer Paratext version — is **skipped**: it
  neither auto-completes nor wipes recorded progress (`TaskAndCheckProgress.cs:100-113,
740-760`). This is the sanctioned pattern for an app that cannot evaluate a step, and
  the pattern P10 should copy for check types it can't run yet (see §5.3).
  **Version caveat:** this convention is _very recent_ P9 work (commits "Honor
  AdditionalCheck forward-compat convention (#628)", "promote AdditionalCheck to
  TaskType") on 9.6.x source — it is **not in the 9.5.0.22 NuGet** paranext-core links.
  Corollary: P9 versions _without_ the convention treat any unrecognized check as
  failing (`MarkAllChaptersToFailAtStage`, `TaskAndCheckProgress.cs:94-112`) and their
  automatic regression **wipes recorded `ChapRevId`s** — so the progress-wipe hazard
  already exists between P9 versions, and P10's behavior must be designed against the
  P9 versions teammates actually run.

### 2.5 Stage advancement and regression (req 6)

`TaskAndCheckProgress.RecordCompletedChapters()` (`TaskAndCheckProgress.cs:732-808`) is
**automatic on every evaluation** (after each task tick, on view load, after check
re-runs) — there is no explicit "advance" gesture. Per stage/chapter:

1. Guard: skip if project not writable; skip stages containing `AdditionalCheck`.
2. **Advance** (may complete && not yet complete): get `VersioningManager.Get(scrText)`;
   if the book file is untracked/modified, `versionedText.Commit("Record progress.")`;
   then `hgRevId = Hg.GetParents(vt.Repository)[0].Id`; write under
   `progressHelper.UpdateLock()` via `SetChapterRevision(stage, book, chapter, hgRevId)`
   (`:765-793`). The Hg commit is of the **book text**; the progress file is saved
   separately and S/R-merged.
3. **Regress** (complete but no longer may complete): `SetChapterRevision(..., "")`
   clears the `ChapRevId` (`:796-800`), and monotonicity cascades the clear to later
   stages. **What actually triggers it (corrected per P9 architect review):** a failing
   _check_ does **not** clear recorded completion. Check results with issues at a stage
   the book is already complete at are relocated forward to the first active stage
   (`CacheResults`, `TaskAndCheckProgress.cs:1373-1381`) and displayed there as a
   "regressed" check for users to review — so they never lower
   `chapterToFirstFailingStage` below a completed stage and the clear branch never
   fires from them. The clear fires in two cases: a **manual task is unmarked**
   (manual results are never relocated — a deliberate user action), and
   **unrecognized non-`AdditionalCheck` steps**, which fail all chapters at their own
   stage (`MarkAllChaptersToFailAtStage`, `:94-112`) and therefore DO wipe — that is
   the version-skew hazard in §2.4, not everyday check behavior.

### 2.6 Manual task marking (req 4)

Data write is `Task.SetCompleteStatus(...)` (records user + timestamp); it does **not**
lock or save itself — every P9 UI caller wraps it:
`using (progress.UpdateLock()) task.SetCompleteStatus(...)` then re-runs the evaluator
(`Paratext\TasksControl.cs:1882-1908, 2113-2154`). Chapters not in the user's available
assignment are disabled (`ChapterCompletionHelper.cs:65-97`).

---

## 3. What exists in P10 today

### 3.1 ParatextData is already referenced; ProjectProgress is unused

`c-sharp/ParanextDataProvider.csproj` references `ParatextData 9.5.0.22` and
`ParatextChecks 9.5.0.22` (upgrade to **9.6.0.2-beta** per the P9 team — see the version
caveat at the top). The
`Paratext.Data.ProjectProgress` namespace (incl. `ProjectProgressInfo`,
`ReadOnlyProjectProgressInfo`, `Stage`, `Task`, `Check`, `ProjectProgressUtils`) is
present in the DLL and **no paranext-core code uses it**. All the members the write-side
options need were verified public by reflection against the 9.5.0.22 .NET Standard 2.0 DLL:
`VersioningManager.Get`, `VersionedText.Commit`, `Hg.Default`, `Hg.GetParents`,
`ScrText.Progress`, `ProjectProgressInfo.UpdateLock`/`Save`/`SetChapterRevision`, and
`Task.SetCompleteStatus`. The
only mentions of `ProjectProgress` in this repo are S/R file-type doc enums
(`extensions/src/platform-scripture-editor/src/types/paratext-bible-send-receive.d.ts:71`)
and "deferred for PT10" comments about `ChangeBooksInProjectPlan` in
`c-sharp/ManageBooks/*Orchestrator.cs`.

### 3.2 How project data reaches web views (PDP architecture)

- The **C# base PDP** `ParatextProjectDataProvider` (`c-sharp/Projects/`) exposes
  `projectInterface`s (`ProjectInterfaces.cs`) each bundling data types
  (`ProjectDataType.cs`): USFM/USX book/chapter/verse, `Comments`, `Setting`,
  `ExtensionData`, versification, etc. Each data type is a `Get*`/`Set*` pair registered
  in `GetFunctions()` (`ParatextProjectDataProvider.cs:110-177`); setters fire
  `SendDataUpdateEvent`, and `subscribe*` is auto-generated TS-side.
- Factories (`ParatextProjectDataProviderFactory` etc., constructed in
  `c-sharp/Program.cs:83-120`) advertise the interfaces per project and lazily create one
  PDP per project.
- TS declares the matching types by augmenting `ProjectDataProviderInterfaces` in
  `papi-shared-types` (see the USJ/versification blocks in
  `extensions/src/platform-scripture/src/types/platform-scripture.d.ts:2308+`).
- React consumption: `useProjectData(projectInterface, projectId).DataType(selector,
default)` (`src/renderer/hooks/papi-hooks/use-project-data.hook.ts`), reactive via the
  PDP subscription.
- **Closest precedent for reading a native Paratext project file:** the Comments data
  types, backed by ParatextData's `CommentManager.Get(scrText)` (lazily cached,
  `ParatextProjectDataProvider.cs:98-104`), conditionally registered, mutations
  serialized, updates via `SendDataUpdateEvent`.

### 3.3 Checks subsystem (relevant to req 5)

- `c-sharp/Checks/CheckRunner.cs` — a PAPI network object (`dotNetCheckRunner`) with an
  async job/poll model: `beginCheckJob(CheckJobScope{InputRanges[], CheckIds[]})` →
  `retrieveCheckJobUpdate(jobId)`. Results are `CheckRunResult{CheckId, ProjectId,
MessageFormatString, VerseRef, IsDenied, ...}`. Checks execute at book granularity and
  are filtered to the requested chapter range; results are cached and invalidated on text
  or settings change (`CheckCache.cs`).
- Denials are ParatextData's `ErrorMessageDenials` over the project's `Denials.xml`,
  already wired: `denyCheckResult`/`allowCheckResult`, and `IsDenied` is applied to
  results (`CheckResultsRecorder.cs:172-202`). So "does chapter X pass check Y, denials
  accounted for" = run a chapter-scoped job and verify zero results with
  `IsDenied == false`.
- Supported check types (`CheckFactory.cs:15-35`): Capitalization, ChapterVerse,
  Characters, Marker, MatchedPairs, Numbers, ParagraphFinalPunctuation, Punctuation,
  Quotation(Types), QuotedText, References, RepeatedWord, Schema — i.e. the
  **BasicCheck** family. Note checks could be evaluated via `CommentManager` (unresolved
  threads). Not currently evaluable in P10: spelling states, biblical term renderings,
  back translation status, interlinear glosses, passage checks.
- **Severity gap:** `CheckRunResult` (`c-sharp/Checks/CheckRunResult.cs:9-20`) has **no
  error-vs-warning field** — `CheckResultsRecorder.RecordError` receives a
  `VerseListItemType` and discards it (`CheckResultsRecorder.cs:101-127`). P9's plan
  evaluation ignores warnings (§2.4); P10 cannot currently make that distinction, so a
  plan-check evaluator built on today's `CheckRunResult` would count warnings as
  failures where P9 does not. The severity must be plumbed through before plan checks
  can match P9.
- **In-process reuse is feasible with a refactor:** the job/poll surface is
  `CheckRunner`-specific, but execution is synchronous underneath —
  `CheckCache.RunChecksForProject` (`CheckCache.cs:101`) and `CheckForProject.Run`
  (`CheckForProject.cs:62`). `CheckCache` takes a `PapiClient` only for frontend
  invalidation notifications (`CheckCache.cs:39-77`); a C# advancement engine reusing it
  needs that dependency factored out (or a client passed in).
- Frontend: `extensions/src/platform-scripture/src/checks/*` +
  `checks-side-panel.web-view.tsx`; invalidation is pushed C#→TS via the
  `platformScripture.invalidateCheckResults` command (no PDP subscription for check
  results).

### 3.4 Mercurial availability — the Studio boundary

- **Open-source paranext-core never touches Hg.** `c-sharp/Projects/SendReceive/
ParatextProjectSendReceiveService.cs` has `CommitChanges`, `CommitDaily`,
  `SyncProjects`, `CancelSync` all throwing `PlatformUnimplementedException` ("Must be
  running Paratext 10 Studio…"). There is no commit-on-save; book edits go straight to
  disk via `ScrText.PutText`.
- **PT10 Studio patches these in.** `paratext-10-studio/repo-patches/paranext-core.patch`
  replaces the stubs with real implementations using ParatextData's
  `VersioningManager.Get(scrText)` / `versionedText.Commit(comment, forceCommit)` and
  exposes them as PAPI commands (`paratextBibleSendReceive.commitChanges`, etc.).
- **Hg is initialized globally at startup under Studio (verified).** The patched
  `ParatextProjectSendReceiveService.InitializeAsync()` runs
  `RegistryServer.Initialize(appVersion, RegistrationInfo.DefaultUser)` and sets
  **`Hg.Default = new Hg(FindHgInstallPath(), …ParatextMerge.py, …Mercurial)`** once,
  process-wide, before registering the S/R commands. `FindHgInstallPath()` looks for a
  bundled Mercurial (macOS), the standard install paths (e.g.
  `C:/Program Files/Mercurial/hg.exe`), or a user-configured
  `sendReceive_hgExecutablePath` setting. So under Studio, **any core-resident C# code
  can call `VersioningManager.Get(scrText)` / `versionedText.Commit(...)`** — the Hg
  machinery is not confined to the patched methods.
- **Guards still required.** Initialization is wrapped in try/catch: if no hg executable
  is found, `Hg.Default` stays null and the failure is only recorded in an error string —
  the same state as unpatched open core. The patch itself also notes that a
  partially-initialized `ScrText` (e.g. freshly downloaded into Temp Files) can "have a
  null VersioningManager, causing a NullReferenceException inside the Paratext library".
  Advancement code must therefore treat "Hg available" as a runtime capability check,
  not a compile-time or Studio-vs-core distinction.

**Consequence:** producing a genuine `ChapRevId` is possible **only where the Studio
overlay is applied** (or wherever Hg is initialized). Given the feature is Studio-only,
this is acceptable — but code developed in open paranext-core must guard the Hg path.

---

## 4. Options for exposing plan/progress data (read side)

| Option                                                         | Verdict                      | Notes / precedent                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(a) New data types on the C# `ParatextProjectDataProvider`** | **Recommended**              | New `projectInterface` (e.g. `platformScripture.ProjectPlan`) with data types like `ProjectPlan` (stages/steps definition) and `ChapterPlanStatus` (per-chapter step statuses). Comments/`CommentManager` is the direct precedent for wrapping a native ParatextData object per project. Reactive via `useProjectData`. |
| (b) Standalone C# network object                               | Viable                       | Like `CheckRunner`/`InventoryDataProvider` — better for cross-project dashboards than per-chapter UI; loses `useProjectData` ergonomics and per-project subscriptions.                                                                                                                                                  |
| (c) TS layering PDP + `ExtensionData`                          | **Rejected for native data** | `ExtensionData` only reads/writes under `{project}/shared/platform.bible/extensions/…`; it cannot reach `ProjectProgress.xml`. Would fork progress data away from P9.                                                                                                                                                   |
| (d) Plain PAPI commands                                        | Spike only                   | No subscriptions — UI wouldn't refresh after S/R or another user's tick.                                                                                                                                                                                                                                                |
| (e) Project settings                                           | Rejected                     | Scalar-only `Settings.xml` passthrough; wrong shape.                                                                                                                                                                                                                                                                    |

Wire format note: don't ship the `XmlSerializer` classes over JSON-RPC; define
serializable DTO projections (plan structure, per-chapter step list with status, current
stage) like `Comment`/`CheckRunResult` do.

The per-chapter step evaluation (availability, assignment, check pass) requires a P10
re-implementation of `TaskAndCheckProgress` in C#, reusing ParatextData primitives
(`IsCompleteAtStage`, availability enums, `GetChapterAssignment`, `UpdateLock`,
`SetChapterRevision`, `CleanUpProgress`) and P10's `CheckRunner`/`CommentManager` for
issue counting.

## 5. Options for the write side

### 5.1 Marking manual tasks done (req 4)

All options write through ParatextData so the XML and S/R merge stay P9-compatible.

- **M1 (recommended): setter on the new PDP interface** — e.g.
  `setChapterTaskCompletion({stageId, taskId, bookNum, chapterNum, complete})` →
  `using (progress.UpdateLock()) task.SetCompleteStatus(bookNum, chapterNum, complete,
userName)` → re-evaluate → `SendDataUpdateEvent`. Enforce
  `scrText.Permissions.CanEdit(PermissionType.Progress, userName)` OR
  assignment-based access, mirroring P9 (`TaskAndCheckProgress.cs:631`,
  `ChapterCompletionHelper.cs:65-97`). Works in open core (no Hg needed) — the write is
  just the progress XML.
  **Write gate (required):** per the repo's Send/Receive write-gate rule, the mutation
  must be wrapped in `using var _ = SendReceiveWriteLock.EnterWrite(projectId);`
  (`c-sharp/Projects/SendReceive/SendReceiveWriteLock.cs`), kept **tight** around the
  lock-and-save only. The `SendReceiveWriteLockCoverageTests` scanner will catch the
  `.Save(` call, but note it does _not_ recognize `UpdateLock()` or
  `VersionedText.Commit()` as write patterns — don't rely on the scanner to prove the
  progress paths are gated.
  **Permission precedent:** the `VerifyUser*` guards on comment mutations
  (`ParatextProjectDataProvider.cs:1156-1366`) and `IsUserProjectAdministrator()`
  (`:1960-1971`) are the enforcement idiom to copy; a Progress-permission gate itself is
  new logic (most existing setters do not pre-check permissions today).
- **M2: command-based mutation** (like `denyCheckResult` on `CheckRunner`) — same C#
  internals, but the read side then needs manual invalidation plumbing; only preferable
  if we pick option (b) for reads.
- Handle `ManualByBook`/`ManualByProject` tasks explicitly in the UI: the checkbox is
  chapter-scoped in the requirements, but those task types complete a whole book/project
  — either display them as book/project-scoped steps or exclude them from the
  chapter card.

### 5.2 Advancing stage completion (req 6)

The advancement itself should copy P9's model: **automatic re-evaluation after every
mutation/check-run**, advancing (and regressing!) chapters as `chapterToFirstFailingStage`
moves — but two caveats P9 does not surface must be designed deliberately:

- **Trigger policy.** In P9, evaluation (and therefore advancement _writes_, including
  Hg commits) runs on view load — merely opening the tasks view can mutate the project.
  P9 also has **no Send/Receive guard** around this (only `IsWritable`). Copied
  literally into P10, opening Saroj's panel would rewrite `ProjectProgress.xml` and
  create "Record progress." commits while Studio's startup auto-sync may be running.
  P10 should make _reads side-effect-free_ and only persist advancement on an explicit
  trigger (a task tick, a check run completing), not on panel open.
- **Write gate + tight scopes.** Advancement writes must take
  `SendReceiveWriteLock.EnterWrite(projectId)`, and the scope must cover only the
  commit-and-record step — never the check evaluation (which can take seconds). A
  starting sync drains open write scopes with a bounded ~10s timeout
  (`SendReceiveWriteLock.cs:185,302-312`) and proceeds degraded on timeout; a
  long-held advancement scope pushes it there.

- **A1 (recommended): implement in paranext-core C#, guarded Hg path.** The advancement
  engine lives beside the PDP; when a chapter may advance it calls
  `VersioningManager.Get(scrText)` → commit if dirty → `Hg.GetParents(...)[0].Id` →
  `SetChapterRevision` under `UpdateLock`, exactly like
  `TaskAndCheckProgress.cs:765-793`. Guard: if Hg is unavailable at runtime (unpatched
  open-source core, or Studio without a usable hg executable — see §3.4), skip the
  persist and expose the state as "all steps complete — ready to advance" without
  writing a `ChapRevId`. Everything is testable and reviewable in the open repo; Studio
  needs no extra patch code.
  **Verified:** the Studio patch sets `Hg.Default` process-wide in
  `ParatextProjectSendReceiveService.InitializeAsync()` at startup, so core-resident
  code can use `VersioningManager` under Studio (§3.4). The capability check should be
  a runtime one (e.g. `Hg.Default != null` plus a per-`ScrText` null-`VersioningManager`
  guard), not a build-time switch.
- **A2: implement the advancement in the Studio overlay patch** (extend the patched
  `ParatextProjectSendReceiveService` or add a patched progress service). Keeps all Hg
  usage in closed source, but patch-file development is hard to test/review, bloats the
  overlay, and the rest of the feature (evaluator, PDP) would still live in core —
  splitting one behavior across repos.
- **A3: delegate commit to the existing `paratextBibleSendReceive.commitChanges`
  command.** It returns only a Boolean — no revision id — and reading the revision
  afterwards needs the same in-process Hg access as A1, so this collapses into A1 with
  extra indirection. Only useful if we deliberately want _zero_ Hg code in core.
- **A4: write a non-Hg sentinel as the `ChapRevId`** (e.g. a marker string) so
  advancement works without Hg. Rejected: P9 treats the value as a revision id for
  stage-text reconstruction (`GetText(stageIndex)`), and polluting it would corrupt
  shared projects' semantics after Send/Receive.

### 5.3 Steps P10 cannot evaluate — and the advancement ceiling this creates

Plans routinely contain check types P10 can't run yet (spelling, biblical terms, back
translation, interlinear, passage checks — §3.3). Adopt P9's `AdditionalCheck`
semantics (`TaskAndCheckProgress.cs:100-113,751`): show the step as "evaluated in
Paratext 9 / not evaluable here", **never** auto-complete it, and **skip advancement for
stages containing it**. Critically, P10 must also never treat a step it merely _can't
evaluate_ as failing — that is the unrecognized-step path
(`MarkAllChaptersToFailAtStage`) that clears recorded `ChapRevId`s and propagates the
wipe to the whole team via S/R (§2.5). (Reminder: the `AdditionalCheck` convention
itself is 9.6.x-only — §2.4.)

**Minimum-data-version obligation (per P9 architect):** if P10 ever _adds_ a check to a
plan that relies on the `AdditionalCheck` convention (e.g. a P10-registered check type),
it must call `ScrText.Settings.UpdateMinimumParatextDataVersion(...)` to stamp the
project with a 9.6 minimum — pre-9.6 clients do not handle the value correctly and
would corrupt progress data. Pair this with UI that warns the user _before_ adding the
check that doing so shuts pre-9.6 Paratext users out of the project. (v1 of this
feature does not add checks to plans — plan editing is out of scope — so this binds the
later phase that registers new check types.)

**How hard the ceiling bites — measured against the real standard plans.** Tallying the
shipped base plans (`_StandardPlans\*.xml`), the SIL Base Plan (Rev 1.34) per stage:

| Stage           | Step types                                                                                                         | Evaluable in P10 today?                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| 1 (Draft)       | manual ×10, `BasicCheck` ×2, `NotesAssignedToMeCheck`                                                              | Yes, if note checks are built on `CommentManager` |
| 2               | manual ×11, `BasicCheck` ×4, `NoteCheck` ×2                                                                        | Yes, same condition                               |
| 3               | manual ×11, `BasicCheck` ×5, `SpellCheck*` ×2, `SpellingNoteCheck`, `RenderingNoteCheck`, `BiblicalTermRenderings` | **No** — five check types not evaluable           |
| 4–5             | manual only                                                                                                        | Blocked behind stage 3                            |
| 6 (Publication) | manual ×24, `PassageCheck`                                                                                         | **No**                                            |

The UBS Standard Translation plan has the same profile. **Under the skip rule, no
chapter can advance past stage 2 in P10**, and stages 1–2 only advance if note-check
evaluation is implemented. Requirement 6 is therefore achievable only for the early
stages of typical plans — a product-level scope decision, not an implementation detail.
(Manual task ticking — requirements 3–4 — works at every stage regardless, since
displaying steps and recording `TaskStatus` doesn't require evaluating checks.)

---

## 6. Requirements → mechanism map

| Req                                     | Mechanism                                                                                                                                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Current stage of active chapter      | Derive lowest incomplete stage per chapter via `IsCompleteAtStage`; expose as part of a `ChapterPlanStatus` data type; UI already knows the active BCV.                                                            |
| 2. Fallback when no plan                | `Stages.Count == 0` / missing `ProjectProgress.xml` ⇒ `hasPlan: false` in the DTO; web view renders fallback state.                                                                                                |
| 3. Remaining steps for chapter          | Re-implemented evaluator: stage's `TasksAndChecks`, availability gating, assignment filter (current user), postponement; return ordered steps with status.                                                         |
| 4. Checkbox steps                       | Manual `Task` types; `setChapterTaskCompletion` (option M1) with P9-equivalent permission/assignment rules.                                                                                                        |
| 5. Check steps — actions to earn a pass | Chapter-scoped `CheckRunner` job for the plan check's type; list undenied `CheckRunResult`s ("fix or deny each"); unsupported types per §5.3; severity gap must be fixed first (§3.3).                             |
| 6. Chapter advanced indication          | Automatic re-evaluation after each mutation/check change; persist `ChapRevId` via A1 in Studio; PDP update event → subscribed web view re-renders new stage. **Ceiling: stages 1–2 of typical plans only (§5.3).** |

## 7. Adversarial review findings (2026-07-17)

An adversarial fact-check of this doc's claims was run against both codebases (plus
reflection on the actual 9.5.0.22 DLL). Findings, most severe first — each folded into
the section noted:

1. **Version skew (critical, → header caveat, §2.4, §5.3):** the P9 mechanics cited were
   researched on 9.6.x source; the `AdditionalCheck` forward-compat convention this
   doc's safety story relies on is not in the linked 9.5.0.22 package. Resolution
   (confirmed by P9 team): upgrade ParatextData/ParatextChecks to **9.6.0.2-beta**,
   created to include the needed changes (9.6.0.1-beta does not); don't wait for a
   non-beta package. Older P9 clients on the same shared project remain a wipe hazard
   regardless of what P10 does; `UpdateMinimumParatextDataVersion` (§5.3) is the fence
   when P10-only constructs enter a project.
2. **Advancement ceiling (critical, → §5.3):** measured against the shipped standard
   plans, the skip-unevaluated-stages rule caps advancement at stage 2. Requirement 6
   needs a product-scope decision.
3. **Check divergence + severity gap (major, → §2.4, §3.3):** P9's pass/fail filtering
   is UI-assembly code P10 must re-implement, and `CheckRunResult` currently discards
   the warning/error distinction P9's filtering depends on. Blast radius (narrowed by
   the P9 architect's correction to §2.5): a divergent check result wrongly blocks or
   grants _advancement_ and mislabels "regressed" checks, but does **not** clear
   already-recorded stage completion — recorded `ChapRevId`s are only cleared when a
   manual task is unmarked or a step is treated as unrecognized, which §5.3 forbids P10
   to do for steps it merely can't evaluate.
4. **Send/Receive write gate omitted (major, → §5.1, §5.2):** all new mutation paths
   must take `SendReceiveWriteLock.EnterWrite`, scopes tight; the coverage scanner does
   not recognize `UpdateLock()`/`Commit()` so gating discipline is manual here.
5. **Evaluation-triggers-writes (major, → §5.2):** P9 advances/regresses on view load
   with no S/R guard; P10 must not copy that — reads side-effect-free, writes on
   explicit triggers only.
6. **XML round-trip claim overstated (moderate, → §1.1):** corrected; `XmlSerializer`
   drops elements it does not model; use `GetMinimumRequiredVersion()` as a write guard.
7. **No-assignments case (moderate, → open question below):** P9's availability filter
   hides tasks not assigned to the user; a project with a plan but no assignments
   renders an empty step list for Saroj. Needs a display policy.
8. **Permission enforcement partly aspirational (minor, → §5.1):** the `VerifyUser*`
   idiom exists to copy, but most existing setters don't pre-check permissions; the
   Progress gate is new logic.

Claims that survived verification: the storage model, object graph, and entry points;
the empty-plan test (`Stages.Count == 0` is exactly how P9 decides "no plan"); all
API members needed by the write side are public in the 9.5.0.22 DLL; `CheckCache` is
synchronously reusable in-process (after a `PapiClient` decoupling refactor); and
Simple mode exists as `platform.interfaceMode` (an earlier review draft wrongly claimed
it didn't — corrected in the header).

**Update (2026-07-20, P9 architect review):** three corrections folded in above —
(1) plan checks relying on `AdditionalCheck` must stamp the project via
`ScrText.Settings.UpdateMinimumParatextDataVersion` with a warn-first UI, since this
shuts pre-9.6 users out of the project (§5.3); (2) adopt the `9.6.0.2-beta` package —
9.6.0.1-beta lacks the needed changes, and the `-beta` suffix persists until P9 9.6
releases (header caveat, §3.1); (3) this doc originally claimed a failing check clears
recorded stage completion — wrong: failing checks are relocated to the active stage and
shown as "regressed" for review; recorded `ChapRevId`s are cleared only when a manual
task is un-marked (or via the unrecognized-step path). §2.5 corrected and verified against
`CacheResults` (`TaskAndCheckProgress.cs:1373-1381`); finding 3's blast radius narrowed
accordingly.

## 8. Open questions

1. **Where does the UI live?** Simple-mode web view in a core extension
   (`extensions/src/platform-scripture`?) vs. one of the `paratext-bible-*` extension
   repos. The C# PDP work must live in paranext-core either way (Studio patches this
   repo).
2. ~~**Hg initialization in Studio**~~ — **Answered:** the Studio patch sets
   `Hg.Default` process-wide at startup in
   `ParatextProjectSendReceiveService.InitializeAsync()`, so core-resident C# can call
   `VersioningManager.Get(scrText)` under Studio. A runtime capability guard is still
   required (hg executable may be missing; partially-initialized `ScrText`s can have a
   null `VersioningManager`). See §3.4.
3. **Regression UX (premise corrected):** P9 does _not_ silently drop a chapter's
   recorded stage when a check starts failing — the failing check is shown as a
   "regressed" check at the active stage for review (§2.5). Remaining Simple-mode
   questions: how should Saroj see a regressed check (P9 surfaces it in the task
   list), and is the case where a manual task is un-checked (which _does_ clear
   recorded completion, by deliberate user action) acceptable without extra messaging?
4. ~~**Permission story**~~ — **Answered (mostly):** open paranext-core already uses the
   Paratext registration identity — `RegistrationInfo.DefaultUser` in
   `c-sharp/Projects/LocalParatextProjects.cs:171,234`,
   `c-sharp/Users/ParatextRegistrationService.cs:44,83-91` — and `ScrText`s are
   constructed with it, so `scrText.Permissions.CanEdit(PermissionType.Progress, …)` and
   `TaskStatus.LastUpdatedBy` have a real user (`RegistrationInfo.DefaultUser.Name`).
   The comment/notes features already resolve the current user the same way
   (`ParatextProjectDataProvider.cs:544,715,1307`). Remaining detail for design: exact
   username string P9 expects in assignments vs. registration name.
5. **Scope of evaluation:** P9 evaluates a whole book per evaluator instance. For the
   "active chapter" UI we can evaluate book-at-a-time (checks run per book anyway in
   `CheckCache`) — confirm performance is acceptable on large books.
6. **Plan editing is out of scope** (create/modify plans, base-plan selection) — confirm.
7. **Advancement scope (product):** given the stage-2 ceiling on typical plans (§5.3),
   is "manual task tracking at every stage + automatic advancement through the early
   stages" an acceptable v1, with unsupported check types displayed but deferred to P9?
8. ~~**ParatextData upgrade**~~ — **Answered by the P9 team:** adopt **`9.6.0.2-beta`**
   (created for this task; 9.6.0.1-beta does not include the needed changes). Do not
   wait for a non-beta package — the `-beta` suffix remains until P9 9.6 releases and
   is not a stability signal.
9. **No-assignments policy:** P9 hides tasks not assigned to the current user. What
   should Saroj see on a project with a plan but no assignments — all steps
   (read-only?), or an empty state prompting assignment setup?

## 9. Key file reference

**P9 (`C:\Users\Ira\src\Paratext`)**

- Data model: `ParatextData\ProjectProgress\` — `ProgressInfo.cs`,
  `ReadOnlyProjectProgressInfo.cs`, `ProjectProgressInfo.cs`, `Stage.cs`, `Task.cs`,
  `TaskBase.cs`, `Check.cs`, `BookAssignments.cs`, `TranslationPriorities.cs`
- Entry point: `ParatextData\ScrText.cs:337` (`Progress`)
- Evaluator/advancement: `Paratext\ProjectProgress\TaskAndCheckProgress.cs`
  (advancement `:732-808`, availability `:1222-1280`), check execution
  `Paratext\ProjectProgress\CheckX.cs`
- Permissions: `ParatextData\Users\PermissionManager.cs:26,75`
- S/R merge: `ParatextData\Repository\ProjectFileClassifier.cs:1719-1932`
- Example data: `React POC API\bin\Debug\net6.0\ParatextProjects\zzz13\ProjectProgress.xml`

**P10 (`C:\Users\Ira\src\paranext-core`)**

- PDP: `c-sharp/Projects/ParatextProjectDataProvider.cs` (Comments template `:386-1540`),
  `ProjectDataType.cs`, `ProjectInterfaces.cs`, `LocalParatextProjects.cs`,
  `c-sharp/Program.cs:83-120`
- Checks: `c-sharp/Checks/CheckRunner.cs`, `CheckCache.cs`, `CheckResultsRecorder.cs`,
  `CheckFactory.cs`; TS side `extensions/src/platform-scripture/src/checks/`
- S/R stubs: `c-sharp/Projects/SendReceive/ParatextProjectSendReceiveService.cs`
- TS PDP declaration precedent:
  `extensions/src/platform-scripture/src/types/platform-scripture.d.ts:2308+`
- React hook: `src/renderer/hooks/papi-hooks/use-project-data.hook.ts`

**PT10 Studio (`C:\Users\Ira\src\paratext-10-studio`)**

- Overlay: `repo-patches/paranext-core.patch` — real `CommitChanges` via
  `VersioningManager.Get(scrText)` + `versionedText.Commit(...)`
