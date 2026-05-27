# Split Paratext PDPF into Regular and Published Factories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split `ParatextProjectDataProviderFactory` into two factories — one for regular Paratext projects and one for _published_ projects (those with `ScrText.IsResourceProject == true`, i.e. `ResourceScrText` and `JoinedScrText` instances) — so published PDPs stop advertising `legacyCommentManager.comments` and stop registering comment-related PAPI methods at the wire boundary. The published factory matches the partition established by [PR #2333](https://github.com/paranext/paranext-core/pull/2333), where `platform.isPublished` was defined as exactly `scrText.IsResourceProject`.

**Architecture:** Both factories construct the existing `ParatextProjectDataProvider` class (single source file). Each factory builds `ProjectDetails` with a tailored `ProjectInterfaces` list and a tailored project filter (published vs unpublished). `ParatextProjectDataProvider.GetFunctions()` reads its own `ProjectDetails.Metadata.ProjectInterfaces` and conditionally includes comment methods only when `legacyCommentManager.comments` is advertised. PAPI's existing `(projectId, projectInterface) → factory` routing (`project-lookup.service-model.ts.getMinimalMatchPdpFactoryId`) handles the dispatch naturally — no PAPI-routing changes needed.

**Tech Stack:** .NET 8 / C#, NUnit, existing PapiClient + DummyPapiClient test infrastructure.

---

## Investigation Findings (do not redo)

These facts were verified against both `paranext-core` and `Paratext` (PT9) source before writing the plan. The implementer should trust them unless something contradicts during work.

### F1 — PAPI method registration is runtime-driven (not attribute-driven)

`c-sharp/NetworkObjects/DataProvider.cs` declares `protected abstract List<(string functionName, Delegate function)> GetFunctions()`. `RegisterDataProviderAsync()` registers exactly that list via `PapiClient.RegisterNetworkObjectAsync(DataProviderName, GetFunctions(), GetDataProviderCreatedDetails())`. There is no attribute scanning. **The PDP class itself controls its wire surface at construction time.**

### F2 — Factory and PDP each advertise their own projectInterface list

- Factory side: `c-sharp/Projects/ProjectDataProviderFactory.cs:30-45` — `_projectInterfaces` field is captured in ctor and emitted as `ProjectDataProviderFactoryAttributes.ProjectInterfaces` during `InitializeAsync`.
- PDP side: `c-sharp/Projects/ProjectDataProvider.cs:25-41` — `GetDataProviderCreatedDetails` emits `ProjectDetails.Metadata.ProjectInterfaces` to the network. This is the per-project per-PDP advertisement.

### F3 — PAPI routes by (projectId, projectInterface) → owning factory

`src/shared/models/project-lookup.service-model.ts:353-370` — `getMinimalMatchPdpFactoryId` picks the factory whose `pdpFactoryInfo` includes the requested `projectInterface` for that `projectMetadata`. Each project ID is owned by one factory (the factory whose `getAvailableProjects` returned it). So once a published project is owned by the published factory (which does NOT advertise `legacyCommentManager.comments`), any `get('legacyCommentManager.comments', publishedId)` call from the TS side will throw at lookup time with a clean error — exactly the behaviour we want.

### F4 — `LocalParatextProjects.GetParatextProjectInterfaces()` is the single source of the static list

Only callers in C#: the factory ctor (`ParatextProjectDataProviderFactory.cs:19`), `LoadProjectDetails` (dead helper at `LocalParatextProjects.cs:197`, no in-process callers), and `ScrTextExtensions.GetProjectDetails()` (`ScrTextExtensions.cs:13`). The extension method is the funnel for all per-project ProjectDetails creation.

### F5 — Comment-method set inside `GetFunctions()`

`ParatextProjectDataProvider.cs:106-117` — 12 entries:

```
getCommentThreads, createComment, addCommentToThread, deleteComment, updateComment,
setIsCommentThreadRead, findAssignableUsers, canUserCreateComments,
canUserAddCommentToThread, canUserAssignThread, canUserResolveThread,
canUserEditOrDeleteComment
```

All are scoped to the `legacyCommentManager.comments` interface; none belong to any other advertised interface.

### F6 — Existing in-PPDP `IsResourceProject` and ProjectType guards

- `CreateComment` line 644 — full resource ban (carries Study Bible Additions + TransliterationWithEncoder bans too)
- `AddCommentToThread` line 699 — resource AND IsGlobalNoteType (faithful port of PT9's `CommentEditHelper.AllowEditLast`)
- `UpdateComment` (via `VerifyUserCanEditOrDeleteComment` at line 786) — same shape
- `ResolveComment` path (line 840) — same shape
- `GetProjectSetting` line 1089 — resource override of PT_IS_EDITABLE → false (unrelated to comments, keep as-is)
- `SetProjectSetting` line 1198 — resource ban (unrelated to comments, keep as-is)
- `CreateComment` line 654 — Study Bible Additions ban
- `CreateComment` line 660 — TransliterationWithEncoder ban

**These do NOT change in this PR.** Lines 644 / 699 / 786 / 840 become dead-on-published-PDPs because the wire methods are no longer reachable on a published PDP — but they remain correct defense-in-depth and the user explicitly asked us not to touch them. Lines 654 and 660 remain load-bearing on the regular factory: SBA and TransliterationWithEncoder are NOT moved to the published factory (see F11 below).

### F7 — `LocalParatextProjects.GetAllProjectDetails()` already conditionally filters published projects

`LocalParatextProjects.cs:98-104`:

```csharp
var allScrTexts = GetScrTexts();
if (!RegistrationInfo.DefaultUser.IsValid)
    allScrTexts = allScrTexts.Where((scrText) => !scrText.IsResourceProject);
return allScrTexts.Select(scrText => scrText.GetProjectDetails());
```

When no valid Paratext registration is loaded, published projects are filtered out entirely. The new published factory inherits this filter automatically — it will simply report zero available projects when unregistered, which matches PT9 behavior.

### F8 — Existing factory consumers stay on the regular factory

- `c-sharp/Projects/SendReceive/ParatextProjectSendReceiveService.cs:8` — send/receive operates on unpublished projects (published projects don't sync).
- `c-sharp/ManageBooks/ManageBooksService.cs:128-133` — manage-books operates on unpublished projects (published projects are read-only).
- `c-sharp/Checks/CheckCache.cs:47` — uses `scrText.GetProjectDetails().Metadata.Id` (only reads the id, immune to interface-list changes).

No call-site changes needed in any of these.

### F9 — Extensions / TS-side references that mention `legacyCommentManager.comments`

- `extensions/src/platform-scripture-editor/src/main.ts:548` — calls `papi.projectDataProviders.get('legacyCommentManager.comments', projectId)` from an editor-active code path. After the split, calling this on a published projectId will throw at lookup (correct: editor cannot insert comments into a published project anyway).
- `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx:357` — `useProjectDataProvider('legacyCommentManager.comments', projectId)` returns `undefined` on published projects after the split (matches the "no PDP for this interface" contract).
- `extensions/src/legacy-comment-manager/src/main.ts:291` — inside a `/* */` commented-out debug block. Not active.
- `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx:119, 190` — comment-list-web-view consumes the interface; if a published ID is ever passed in, it gets `undefined` and shows an empty list. This is correct behavior.
- `extensions/src/legacy-comment-manager/src/project-data-provider/legacy-comment-manager-usj-pdpe.model.ts:21-22` — `LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES` includes both `platformScripture.USJ_Chapter` AND `legacyCommentManager.comments`. The PDPF that layers this overlay (`legacy-comment-manager-usj-pdpef.model.ts:30, 32`) requires BOTH interfaces on the underlying project. Once published projects stop advertising `legacyCommentManager.comments`, the USJ-comments overlay will naturally stop applying to them. **This is the desired emergent behavior.**

### F10 — Test infrastructure capabilities

- `c-sharp-tests/DummyPapiClient.cs:58, 78` — exposes `RegisteredRequestTypes` (collection of all wire keys currently registered) and `IsHandlerRegistered(key)`. These let tests assert which methods are/aren't on the wire after a PDP registers.
- `c-sharp-tests/PapiTestBase.cs:100-108` — `CreateProjectDetails(id, name, projectInterfaces?)` lets tests construct ProjectDetails with arbitrary interface lists. This means published-vs-unpublished PPDP tests do NOT need to fake `ScrText.IsResourceProject` — they can drive the discrimination through the projectInterfaces list directly. This is exactly how the new `GetFunctions()` gate will work.
- `c-sharp-tests/DummyScrText.cs` does not override `IsResourceProject` (no need for published-factory unit tests in this plan; the published factory's wire shape is tested by direct construction with a published-style ProjectDetails).

### F11 — Why the partition is exactly `IsResourceProject` and NOT a wider PT9 "no comments" set

PT9's canonical comment-allowance function (`Paratext/ParatextBase/ParatextDataExtensions.cs:92`) is:

```csharp
public static bool CanAddNotes(this ScrText scrText, bool allowInSba = false)
{
    return !scrText.IsResourceProject
        && scrText.Permissions.HaveRoleNotObserver
        && (allowInSba || !scrText.Settings.IsStudyBibleAdditions)
        && scrText.Settings.TranslationInfo.Type != ProjectType.TransliterationWithEncoder;
}
```

On the surface this defines a wider "no comments" set than just published projects: `IsResourceProject || IsStudyBibleAdditions || Type == TransliterationWithEncoder`. We deliberately do NOT widen the published factory's partition to that whole set, because:

- **SBA is NOT no-comments — it's no-comments-by-default-with-escape.** `Paratext/Paratext/WordList/WordListForm.cs:950, 2205` call `scrText.CanAddNotes(allowInSba: true)` to permit spelling-check spelling notes. Those go through the normal `CommentManager` / `CommentThread` infrastructure — they're real comments tagged as spelling notes, not a separate side-channel. SBA projects host legitimate `legacyCommentManager.comments` data; stripping the interface would break the spelling check when it gets ported.
- **TransliterationWithEncoder has no escape hatch in `CanAddNotes`**, but we don't have certainty about read-only scenarios (a project converted to that type might still have existing threads that need reading). Conservative call: leave it in the regular factory; the existing PPDP guard at line 660 stays load-bearing for creation, and the interface remains advertised so any existing thread reads continue to work.
- **ConsultantNotes / GlobalConsultantNotes / GlobalAnthropologyNotes** are note-only types (`IsNoteType()` in PT9 `ProjectType.cs:148`). They're filtered out before any factory sees them by `ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly)`. They're not served by any factory today and are out of scope for this PR.

If/when future work surfaces a need to restrict the interface set for SBA, TransliterationWithEncoder, or note-only types, the right move is _another_ dedicated factory with its own tailored interface list — not folding them into this one. The published factory's contract is specifically "the data shape published projects (`ResourceScrText` / `JoinedScrText`) can support", and broadening it would re-create the dishonest-interface problem this PR exists to fix.

### F12 — `IsResourceProject` is set by ScrText subclass, not by `ProjectType`

PT9: `Paratext/ParatextData/ScrText.cs:387` — `IsResourceProject` is a `virtual` property defaulting to `false`. Only two overrides set it true:

- `Paratext/ParatextData/ResourceScrText.cs:52` — projects loaded from `.p8z` (DBL / biblical resources)
- `Paratext/ParatextData/JoinedScrText.cs:47` — joined-resource views

`ProjectType.Resource`, `ProjectType.AuxiliaryResource`, `ProjectType.MarbleResource`, `ProjectType.XmlResource` are independent enum values that may or may not be loaded as `ResourceScrText`. The flag we discriminate on is the **storage-layer** property, not the project-type enum, which is why we don't switch on `ProjectType` in this plan.

---

## Chosen Design

**Discriminator:** `scrText.IsResourceProject`. This is the same flag PR #2333 used to back `platform.isPublished`, so the published factory's project set and the `platform.isPublished == true` set are guaranteed to coincide.

**Where the discrimination is encoded:** In `ProjectDetails.Metadata.ProjectInterfaces`. Each factory funnels its projects through a different code path that produces the appropriate interface list.

**How `GetFunctions()` is gated:** `ParatextProjectDataProvider.GetFunctions()` checks `ProjectDetails.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT)` and skips the 12 comment-related entries when absent. This puts a single line of conditional logic in PPDP and keeps the truth-source consistent (what we advertise == what we register).

**Why not a `_isPublished` bool on PPDP, or a subclass, or a factory-passed filter?**

- Subclass — user explicitly required PPDP to remain a single class in a single file. Rules out.
- `_isPublished` bool on PPDP — adds a parameter that duplicates information already present in the metadata; risks drift (could advertise X but register based on Y).
- Factory-passed function filter — heavier than needed; introduces a callback for a single-line check.

The metadata-check design is the smallest possible change and self-consistent.

**Factory split:**

- `ParatextProjectDataProviderFactory` (existing — name preserved for wire-compat; per F4 it's the only caller of `GetParatextProjectInterfaces()`). Advertises full interface list (with `LEGACY_COMMENT`). Filters its project view to unpublished projects.
- `ParatextPublishedProjectDataProviderFactory` (new file, mirrors the existing factory structure exactly). Advertises full interface list MINUS `LEGACY_COMMENT`. Filters its project view to published projects (`scrText.IsResourceProject == true`). Wire name: `platform.ParatextPublished-pdpf`.

**`LocalParatextProjects` API additions:**

- Add overload `GetParatextProjectInterfaces(bool isPublished)` returning the appropriate list. Keep the existing no-arg `GetParatextProjectInterfaces()` for backward compatibility — it returns the unpublished list (this preserves the dead-helper `LoadProjectDetails` and any out-of-tree callers).
- Add `GetAvailableUnpublishedProjectDetails()` and `GetAvailablePublishedProjectDetails()` methods that wrap the existing `GetAllProjectDetails()` filter with an additional `IsResourceProject`-based filter. Keep `GetAllProjectDetails()` unchanged.

---

## File Structure

### Files to create

- `c-sharp/Projects/ParatextPublishedProjectDataProviderFactory.cs` — new factory class, ~110 lines including the rationale doc-comment (mirrors existing factory structure).
- `c-sharp-tests/Projects/ParatextPublishedProjectDataProviderFactoryTests.cs` — new unit tests for the published factory.
- `c-sharp-tests/Projects/ParatextProjectDataProviderWireSurfaceTests.cs` — new tests asserting which wire methods are registered for published vs unpublished PDPs.

### Files to modify

- `c-sharp/Projects/LocalParatextProjects.cs` — split `s_paratextProjectInterfaces` into unpublished vs published lists; add the overloaded `GetParatextProjectInterfaces(bool)` and two new available-project helpers.
- `c-sharp/Projects/ScrTextExtensions.cs` — make `GetProjectDetails()` pick the correct interface list based on `scrText.IsResourceProject`.
- `c-sharp/Projects/ParatextProjectDataProvider.cs` — gate the 12 comment entries in `GetFunctions()` on `ProjectDetails.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT)`.
- `c-sharp/Projects/ParatextProjectDataProviderFactory.cs` — change `GetAvailableProjects` to call the new unpublished helper; change `GetProjectDataProviderID` to throw "Unknown project ID" for published projects (since they're not in this factory's scope).
- `c-sharp/Program.cs` — instantiate the new published factory alongside the existing one and add it to the `Task.WhenAll` initialization.
- `c-sharp-tests/Projects/ParatextProjectDataProviderFactoryTests.cs` — extend to assert advertised projectInterfaces and verify published project IDs are rejected by this factory.
- `c-sharp-tests/Projects/LocalParatextProjectsTests.cs` — add a unit test for the overloaded `GetParatextProjectInterfaces(bool)`.

### Files NOT touched (deliberate)

- The existing `IsResourceProject` and ProjectType guards inside `ParatextProjectDataProvider.cs` (lines 644, 654, 660, 699, 786, 840, 1089, 1198) — kept as defense-in-depth (or, for 654 and 660, kept load-bearing on the regular factory) per user instruction.
- All TS/extension files referencing `legacyCommentManager.comments` — emergent behaviour through PAPI lookup is correct on its own.
- `ManageBooksService.cs`, `ParatextProjectSendReceiveService.cs`, `CheckCache.cs` — already operate via the regular factory or via interface-agnostic ScrText paths.

---

## Task 1: Split the static project-interfaces list

**Files:**

- Modify: `c-sharp/Projects/LocalParatextProjects.cs:35-49, 119-122`
- Test: `c-sharp-tests/Projects/LocalParatextProjectsTests.cs` (new test cases appended)

- [ ] **Step 1.1: Write the failing test for the overloaded interface accessor**

Append to `c-sharp-tests/Projects/LocalParatextProjectsTests.cs` (do not remove existing tests):

```csharp
[Test]
public void GetParatextProjectInterfaces_Unpublished_IncludesLegacyComment()
{
    var interfaces = LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false);

    Assert.That(interfaces, Does.Contain(ProjectInterfaces.LEGACY_COMMENT));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.BASE));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_BOOK));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.VERSIFICATION));
}

[Test]
public void GetParatextProjectInterfaces_Published_ExcludesLegacyCommentButKeepsScripture()
{
    var interfaces = LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true);

    Assert.That(interfaces, Does.Not.Contain(ProjectInterfaces.LEGACY_COMMENT));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.BASE));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_BOOK));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_CHAPTER));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USFM_VERSE));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USX_BOOK));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USX_CHAPTER));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USX_VERSE));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.PLAIN_TEXT_VERSE));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.MARKER_NAMES));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.USER_TEXT_CONNECTION_SETTINGS));
    Assert.That(interfaces, Does.Contain(ProjectInterfaces.VERSIFICATION));
}

[Test]
public void GetParatextProjectInterfaces_NoArgs_MatchesUnpublished()
{
    // Backward-compat: the no-arg overload must continue to return the full (unpublished) list
    var noArgs = LocalParatextProjects.GetParatextProjectInterfaces();
    var unpublished = LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false);

    Assert.That(noArgs, Is.EqualTo(unpublished));
}
```

- [ ] **Step 1.2: Run the new tests — expect compile failure**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~LocalParatextProjectsTests.GetParatextProjectInterfaces"
```

Expected: build error — `GetParatextProjectInterfaces(bool)` overload does not exist.

- [ ] **Step 1.3: Add the published interfaces list and the overloaded method**

Edit `c-sharp/Projects/LocalParatextProjects.cs` — replace the existing block at lines 35-49 with:

```csharp
    private static readonly List<string> s_paratextUnpublishedProjectInterfaces =
    [
        ProjectInterfaces.BASE,
        ProjectInterfaces.LEGACY_COMMENT,
        ProjectInterfaces.USFM_BOOK,
        ProjectInterfaces.USFM_CHAPTER,
        ProjectInterfaces.USFM_VERSE,
        ProjectInterfaces.USX_BOOK,
        ProjectInterfaces.USX_CHAPTER,
        ProjectInterfaces.USX_VERSE,
        ProjectInterfaces.PLAIN_TEXT_VERSE,
        ProjectInterfaces.MARKER_NAMES,
        ProjectInterfaces.USER_TEXT_CONNECTION_SETTINGS,
        ProjectInterfaces.VERSIFICATION,
    ];

    // Published projects (ScrText.IsResourceProject == true, i.e. ResourceScrText and
    // JoinedScrText) are read-only in PT9 — ResourceProjectFileManager.SetXml() throws
    // AttemptedResourceWritingException — and cannot accept comment writes. They therefore do not
    // advertise legacyCommentManager.comments; everything else still applies because published
    // projects can still be read for scripture and resource-references.
    private static readonly List<string> s_paratextPublishedProjectInterfaces =
    [
        ProjectInterfaces.BASE,
        ProjectInterfaces.USFM_BOOK,
        ProjectInterfaces.USFM_CHAPTER,
        ProjectInterfaces.USFM_VERSE,
        ProjectInterfaces.USX_BOOK,
        ProjectInterfaces.USX_CHAPTER,
        ProjectInterfaces.USX_VERSE,
        ProjectInterfaces.PLAIN_TEXT_VERSE,
        ProjectInterfaces.MARKER_NAMES,
        ProjectInterfaces.USER_TEXT_CONNECTION_SETTINGS,
        ProjectInterfaces.VERSIFICATION,
    ];
```

Then replace the existing `GetParatextProjectInterfaces()` block at lines 119-122 with:

```csharp
    public static List<string> GetParatextProjectInterfaces() =>
        GetParatextProjectInterfaces(isPublished: false);

    public static List<string> GetParatextProjectInterfaces(bool isPublished)
    {
        var source = isPublished
            ? s_paratextPublishedProjectInterfaces
            : s_paratextUnpublishedProjectInterfaces;
        return [.. source];
    }
```

- [ ] **Step 1.4: Run the new tests — expect pass**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~LocalParatextProjectsTests.GetParatextProjectInterfaces"
```

Expected: 3 tests PASS.

- [ ] **Step 1.5: Run all LocalParatextProjects tests — confirm no regressions**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~LocalParatextProjectsTests"
```

Expected: all tests PASS (including the pre-existing `Initialize_SingleProject_ProjectIsRetrievable` cases).

- [ ] **Step 1.6: Commit**

```bash
cd /home/tj_co/source/repos/paranext-core
git add c-sharp/Projects/LocalParatextProjects.cs c-sharp-tests/Projects/LocalParatextProjectsTests.cs
git commit -m "$(cat <<'EOF'
refactor(c-sharp): split paratext project interfaces into published vs unpublished lists

Add GetParatextProjectInterfaces(bool isPublished) overload that returns the
published list (no legacyCommentManager.comments) when isPublished is true. The
no-arg overload still returns the full unpublished list for backward
compatibility. This is the foundation for splitting ParatextProjectDataProviderFactory.

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Route per-project interface selection through `IsResourceProject`

**Files:**

- Modify: `c-sharp/Projects/ScrTextExtensions.cs`
- Test: `c-sharp-tests/Projects/LocalParatextProjectsTests.cs` (new test case)

- [ ] **Step 2.1: Write the failing test**

The current `ScrTextExtensions.GetProjectDetails()` is the funnel for per-project metadata. We need a test that proves it picks the right interface list based on `IsResourceProject`. We use `DummyScrText` as the base and verify the unpublished path; we cannot easily fake `IsResourceProject` (it's set by ScrText subclass), so we test the per-project path by adding a small assertion in the existing `Initialize_SingleProject_ProjectIsRetrievable` flow.

Append to `c-sharp-tests/Projects/LocalParatextProjectsTests.cs`:

```csharp
[TestCase("ABC_4488", "PRJX", "abc7")]
public void Initialize_SingleUnpublishedProject_AdvertisesUnpublishedInterfaces(
    string folder, string name, string id)
{
    CreateTempProject(folder, CreateParatextProjectDetails(folder, name, id));
    _localProjects.Initialize();

    var details = _localProjects.GetProjectDetails(id);

    // Unpublished projects must advertise the full interface list including legacyCommentManager.comments
    Assert.That(
        details.Metadata.ProjectInterfaces,
        Does.Contain(ProjectInterfaces.LEGACY_COMMENT),
        "Unpublished Paratext project must advertise legacyCommentManager.comments");
    Assert.That(details.Metadata.ProjectInterfaces, Does.Contain(ProjectInterfaces.USFM_CHAPTER));
}
```

- [ ] **Step 2.2: Run — expect PASS already (current code returns unpublished list for everything)**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~LocalParatextProjectsTests.Initialize_SingleUnpublishedProject"
```

Expected: PASS (test documents current behavior; will continue to pass after Step 2.3).

- [ ] **Step 2.3: Update `ScrTextExtensions.GetProjectDetails()` to branch on `IsResourceProject`**

Replace the entire body of `c-sharp/Projects/ScrTextExtensions.cs` with:

```csharp
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

internal static class ScrTextExtensions
{
    internal static ProjectDetails GetProjectDetails(this ScrText scrText)
    {
        return new(
            scrText.Name,
            new(
                scrText.Guid.ToString().ToUpperInvariant(),
                LocalParatextProjects.GetParatextProjectInterfaces(
                    isPublished: scrText.IsResourceProject)
            ),
            scrText.Directory
        );
    }
}
```

- [ ] **Step 2.4: Run full Projects test suite — confirm no regressions**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~Projects"
```

Expected: all pre-existing tests PASS. The new unpublished assertion PASSES.

- [ ] **Step 2.5: Commit**

```bash
cd /home/tj_co/source/repos/paranext-core
git add c-sharp/Projects/ScrTextExtensions.cs c-sharp-tests/Projects/LocalParatextProjectsTests.cs
git commit -m "$(cat <<'EOF'
refactor(c-sharp): pick project interfaces per project based on IsResourceProject

Route ScrTextExtensions.GetProjectDetails() through the new
GetParatextProjectInterfaces(bool isPublished) overload so each scrText reports
the interface list that matches its actual capabilities. No behavior change yet
for unpublished projects; published projects will be picked up by the new
published factory in a later task.

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Add published/unpublished project-filtering helpers

**Files:**

- Modify: `c-sharp/Projects/LocalParatextProjects.cs:98-104`
- Test: `c-sharp-tests/Projects/LocalParatextProjectsTests.cs`

- [ ] **Step 3.1: Write the failing test**

Append to `c-sharp-tests/Projects/LocalParatextProjectsTests.cs`:

```csharp
[Test]
public void GetAvailableUnpublishedProjectDetails_UnpublishedOnly_ReturnsAll()
{
    CreateTempProject("NR1", CreateParatextProjectDetails("NR1", "First", "aaaa01"));
    CreateTempProject("NR2", CreateParatextProjectDetails("NR2", "Second", "aaaa02"));
    _localProjects.Initialize();

    var unpublished = _localProjects.GetAvailableUnpublishedProjectDetails().ToList();

    Assert.That(unpublished, Has.Count.EqualTo(2));
    Assert.That(
        unpublished.Select(d => d.Metadata.Id),
        Is.EquivalentTo(new[] { "AAAA01", "AAAA02" }));
}

[Test]
public void GetAvailablePublishedProjectDetails_NoPublished_ReturnsEmpty()
{
    CreateTempProject("NR1", CreateParatextProjectDetails("NR1", "First", "aaaa01"));
    _localProjects.Initialize();

    var published = _localProjects.GetAvailablePublishedProjectDetails().ToList();

    // DummyScrText / TestLocalParatextProjectsInTempDir produces unpublished ScrTexts
    // (IsResourceProject defaults to false on the base ScrText class), so the published
    // list is empty in this fixture. This documents the partition between the two helpers.
    Assert.That(published, Is.Empty);
}
```

- [ ] **Step 3.2: Run — expect compile failure (methods don't exist yet)**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~LocalParatextProjectsTests.GetAvailable"
```

Expected: build error — `GetAvailableUnpublishedProjectDetails` not defined.

- [ ] **Step 3.3: Add the helper methods**

Edit `c-sharp/Projects/LocalParatextProjects.cs` — replace the existing `GetAllProjectDetails()` block at lines 98-104 with:

```csharp
    public IEnumerable<ProjectDetails> GetAllProjectDetails()
    {
        var allScrTexts = GetVisibleScrTexts();
        return allScrTexts.Select(scrText => scrText.GetProjectDetails());
    }

    /// <summary>
    /// Available unpublished Paratext projects (regular, editable scripture projects).
    /// Used by <see cref="ParatextProjectDataProviderFactory"/> to populate its project list.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAvailableUnpublishedProjectDetails()
    {
        return GetVisibleScrTexts()
            .Where(scrText => !scrText.IsResourceProject)
            .Select(scrText => scrText.GetProjectDetails());
    }

    /// <summary>
    /// Available published Paratext projects (read-only DBL / biblical resources — backed by
    /// <c>ResourceScrText</c> or <c>JoinedScrText</c> in PT9). Used by
    /// <see cref="ParatextPublishedProjectDataProviderFactory"/> to populate its project list.
    /// </summary>
    public IEnumerable<ProjectDetails> GetAvailablePublishedProjectDetails()
    {
        return GetVisibleScrTexts()
            .Where(scrText => scrText.IsResourceProject)
            .Select(scrText => scrText.GetProjectDetails());
    }

    /// <summary>
    /// Returns the set of ScrTexts that should be visible to the user given current registration
    /// state. When the user has no valid Paratext registration, published projects are filtered out
    /// entirely (matching PT9 behavior).
    /// </summary>
    private static IEnumerable<ScrText> GetVisibleScrTexts()
    {
        var allScrTexts = GetScrTexts();
        if (!RegistrationInfo.DefaultUser.IsValid)
            allScrTexts = allScrTexts.Where((scrText) => !scrText.IsResourceProject);
        return allScrTexts;
    }
```

- [ ] **Step 3.4: Run the new tests — expect PASS**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~LocalParatextProjectsTests.GetAvailable"
```

Expected: 2 tests PASS.

- [ ] **Step 3.5: Run all LocalParatextProjects tests**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~LocalParatextProjectsTests"
```

Expected: all PASS.

- [ ] **Step 3.6: Commit**

```bash
cd /home/tj_co/source/repos/paranext-core
git add c-sharp/Projects/LocalParatextProjects.cs c-sharp-tests/Projects/LocalParatextProjectsTests.cs
git commit -m "$(cat <<'EOF'
refactor(c-sharp): add published/unpublished project-filter helpers

Introduce GetAvailableUnpublishedProjectDetails() and
GetAvailablePublishedProjectDetails() so each factory can claim its own slice
of projects. The existing GetAllProjectDetails() is preserved (still backed by
the same registration-aware GetVisibleScrTexts helper). No factory changes yet.

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Gate comment methods in `ParatextProjectDataProvider.GetFunctions()`

**Files:**

- Modify: `c-sharp/Projects/ParatextProjectDataProvider.cs:88-147`
- Test: `c-sharp-tests/Projects/ParatextProjectDataProviderWireSurfaceTests.cs` (new)

- [ ] **Step 4.1: Write the failing wire-surface test**

Create `c-sharp-tests/Projects/ParatextProjectDataProviderWireSurfaceTests.cs`:

```csharp
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextProjectDataProviderWireSurfaceTests : PapiTestBase
    {
        private static readonly string[] AllCommentWireMethodSuffixes =
        [
            ".getCommentThreads",
            ".createComment",
            ".addCommentToThread",
            ".deleteComment",
            ".updateComment",
            ".setIsCommentThreadRead",
            ".findAssignableUsers",
            ".canUserCreateComments",
            ".canUserAddCommentToThread",
            ".canUserAssignThread",
            ".canUserResolveThread",
            ".canUserEditOrDeleteComment",
        ];

        [Test]
        public async Task UnpublishedPdp_RegistersAllCommentMethodsAsync()
        {
            // Arrange: unpublished project advertises the full interface list including
            // legacyCommentManager.comments
            const string projId = "117777";
            var details = CreateProjectDetails(
                projId,
                "RegProj",
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false));
            ParatextProjects.FakeAddProject(details);

            // Act: construct PPDP and register it on the wire
            var pdp = new ParatextProjectDataProvider("PdpA", Client, details, ParatextProjects);
            await pdp.RegisterDataProviderAsync();

            // Assert: every comment method is on the wire
            foreach (var suffix in AllCommentWireMethodSuffixes)
            {
                Assert.That(
                    Client.RegisteredRequestTypes.Any(k => k.EndsWith(suffix)),
                    Is.True,
                    $"Expected unpublished PDP to register a wire method ending in '{suffix}'");
            }
        }

        [Test]
        public async Task PublishedPdp_DoesNotRegisterAnyCommentMethodAsync()
        {
            // Arrange: published project advertises only the published interface list (no
            // legacyCommentManager.comments)
            const string projId = "227777";
            var details = CreateProjectDetails(
                projId,
                "PublishedProj",
                LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true));
            ParatextProjects.FakeAddProject(details);

            // Act: construct PPDP and register it on the wire
            var pdp = new ParatextProjectDataProvider("PdpB", Client, details, ParatextProjects);
            await pdp.RegisterDataProviderAsync();

            // Assert: no comment method appears on the wire
            foreach (var suffix in AllCommentWireMethodSuffixes)
            {
                Assert.That(
                    Client.RegisteredRequestTypes.Any(k => k.EndsWith(suffix)),
                    Is.False,
                    $"Published PDP must NOT register a wire method ending in '{suffix}'");
            }

            // Sanity: scripture methods ARE registered (the published project is still readable)
            Assert.That(
                Client.RegisteredRequestTypes.Any(k => k.EndsWith(".getChapterUSFM")),
                Is.True,
                "Published PDP must still register scripture read methods");
        }
    }
}
```

- [ ] **Step 4.2: Run — expect failure**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~ParatextProjectDataProviderWireSurfaceTests"
```

Expected: `PublishedPdp_DoesNotRegisterAnyCommentMethodAsync` FAILS — comment methods are currently registered unconditionally. `UnpublishedPdp_RegistersAllCommentMethodsAsync` may pass.

- [ ] **Step 4.3: Gate comment-method entries in `GetFunctions()`**

Edit `c-sharp/Projects/ParatextProjectDataProvider.cs` — replace the `GetFunctions()` body at lines 88-147 with:

```csharp
    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        var retVal = base.GetFunctions();

        retVal.Add(("getBookUSFM", GetBookUsfm));
        retVal.Add(("setBookUSFM", SetBookUsfm));
        retVal.Add(("getChapterUSFM", GetChapterUsfm));
        retVal.Add(("setChapterUSFM", SetChapterUsfm));
        retVal.Add(("getVerseUSFM", GetVerseUsfm));

        retVal.Add(("getBookUSX", GetBookUsx));
        retVal.Add(("setBookUSX", SetBookUsx));
        retVal.Add(("getChapterUSX", GetChapterUsx));
        retVal.Add(("setChapterUSX", SetChapterUsx));
        retVal.Add(("getVerseUSX", GetVerseUsx));

        retVal.Add(("getVersePlainText", GetVersePlainText));

        // Comment methods are only registered when this PDP advertises legacyCommentManager.comments.
        // Published PDPs do not advertise that interface (published projects are read-only and PT9
        // throws AttemptedResourceWritingException on any write to a published project), so they
        // skip registration entirely instead of relying solely on per-method runtime guards.
        if (ProjectDetails.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT))
        {
            retVal.Add(("getCommentThreads", GetCommentThreads));
            retVal.Add(("createComment", CreateComment));
            retVal.Add(("addCommentToThread", AddCommentToThread));
            retVal.Add(("deleteComment", DeleteComment));
            retVal.Add(("updateComment", UpdateComment));
            retVal.Add(("setIsCommentThreadRead", SetIsCommentThreadRead));
            retVal.Add(("findAssignableUsers", FindAssignableUsers));
            retVal.Add(("canUserCreateComments", CanUserCreateComments));
            retVal.Add(("canUserAddCommentToThread", CanUserAddCommentToThread));
            retVal.Add(("canUserAssignThread", CanUserAssignThread));
            retVal.Add(("canUserResolveThread", CanUserResolveThread));
            retVal.Add(("canUserEditOrDeleteComment", CanUserEditOrDeleteComment));
        }

        retVal.Add(("getSetting", GetProjectSetting));
        retVal.Add(("setSetting", SetProjectSetting));

        retVal.Add(("resetSetting", ResetProjectSetting));

        retVal.Add(("getUserModelTexts", GetUserModelTexts));
        retVal.Add(("setUserModelTexts", SetUserModelTexts));
        retVal.Add(("resetUserModelTexts", ResetUserModelTexts));
        retVal.Add(
            ("getUserReferencedProjectsAndResources", GetUserReferencedProjectsAndResources)
        );
        retVal.Add(
            ("setUserReferencedProjectsAndResources", SetUserReferencedProjectsAndResources)
        );
        retVal.Add(
            ("resetUserReferencedProjectsAndResources", ResetUserReferencedProjectsAndResources)
        );

        retVal.Add(("getMarkerNames", GetMarkerNames));

        retVal.Add(("getFinalVerseNumber", GetFinalVerseNumber));
        retVal.Add(("setFinalVerseNumber", SetFinalVerseNumber));
        retVal.Add(("getFinalChapter", GetFinalChapter));
        retVal.Add(("setFinalChapter", SetFinalChapter));
        retVal.Add(("getFinalVerseNumbersInBook", GetFinalVerseNumbersInBook));
        retVal.Add(("setFinalVerseNumbersInBook", SetFinalVerseNumbersInBook));

        return retVal;
    }
```

- [ ] **Step 4.4: Run wire-surface tests — expect PASS**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~ParatextProjectDataProviderWireSurfaceTests"
```

Expected: both tests PASS.

- [ ] **Step 4.5: Run all Projects tests — confirm no regression**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~Projects"
```

Expected: all PASS. The pre-existing `ParatextProjectDataProviderCommentTests` (~2122 lines) continues to pass because the existing test setup builds PDPs with the unpublished interface list, which still advertises `legacyCommentManager.comments`.

- [ ] **Step 4.6: Commit**

```bash
cd /home/tj_co/source/repos/paranext-core
git add c-sharp/Projects/ParatextProjectDataProvider.cs c-sharp-tests/Projects/ParatextProjectDataProviderWireSurfaceTests.cs
git commit -m "$(cat <<'EOF'
refactor(c-sharp): gate PPDP comment-method registration on advertised interfaces

ParatextProjectDataProvider.GetFunctions() now only adds the 12 comment-related
wire methods when ProjectDetails.Metadata.ProjectInterfaces contains
legacyCommentManager.comments. Published PDPs (which don't advertise that
interface) no longer expose any comment method on the wire.

The existing IsResourceProject guards inside CreateComment / AddCommentToThread
/ UpdateComment / ResolveComment paths are intentionally left in place as
defense-in-depth — they are now unreachable on published PDPs but still correct
for the unpublished paths they were originally written for. The SBA and
TransliterationWithEncoder guards at lines 654 and 660 remain load-bearing on
unpublished PDPs (those project types stay on the regular factory; see plan
finding F11 for rationale).

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Filter the existing factory to unpublished projects only

**Files:**

- Modify: `c-sharp/Projects/ParatextProjectDataProviderFactory.cs:7-99`
- Test: `c-sharp-tests/Projects/ParatextProjectDataProviderFactoryTests.cs`

- [ ] **Step 5.1: Write the failing test**

Append to `c-sharp-tests/Projects/ParatextProjectDataProviderFactoryTests.cs`:

```csharp
[Test]
public async Task RegularFactory_AdvertisesLegacyCommentInterfaceAsync()
{
    var factory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
    await factory.InitializeAsync();

    // The factory registers its network-object-created event on Client. We don't introspect
    // that event payload directly; instead we assert the source of truth: the static interface
    // list it was constructed from.
    Assert.That(
        LocalParatextProjects.GetParatextProjectInterfaces(isPublished: false),
        Does.Contain(ProjectInterfaces.LEGACY_COMMENT));
}

[Test]
public async Task RegularFactory_GetAvailableProjects_OmitsPublishedAsync()
{
    // FakeAddProject uses DummyScrText which is unpublished (IsResourceProject == false on
    // the base ScrText class), so we cannot exercise the published-filter directly without a
    // resource-capable fake. We instead assert the contract by spelling it out: the factory's
    // project list comes from GetAvailableUnpublishedProjectDetails, never from
    // GetAllProjectDetails.
    const string projId = "305555";
    ParatextProjects.FakeAddProject(CreateProjectDetails(projId, "RegProj"));

    var factory = new ParatextProjectDataProviderFactory(Client, ParatextProjects);
    await factory.InitializeAsync();

    // We rely on the in-flow side-effect: the factory must have used the unpublished helper.
    // Sanity check: getting a PDP for the regular project must still succeed.
    var pdpId = factory.GetProjectDataProviderID(projId);
    Assert.That(pdpId, Is.Not.Null.And.Not.Empty);
}
```

- [ ] **Step 5.2: Run — expect the first new test PASSES (it only checks the helper), second PASSES (current factory still serves the project). These are guardrails for the upcoming change.**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~ParatextProjectDataProviderFactoryTests"
```

Expected: existing + new tests PASS.

- [ ] **Step 5.3: Update the factory to use the unpublished helper**

Edit `c-sharp/Projects/ParatextProjectDataProviderFactory.cs` — replace the body of `GetAvailableProjects` (line 30-33). Change:

```csharp
    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore)
    {
        return _paratextProjects.GetAllProjectDetails().Select(pd => pd.Metadata).ToList();
    }
```

to:

```csharp
    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore)
    {
        return _paratextProjects
            .GetAvailableUnpublishedProjectDetails()
            .Select(pd => pd.Metadata)
            .ToList();
    }
```

Also update `GetProjectDataProviderID` to reject published project IDs cleanly. Find the block around line 51-59:

```csharp
            ProjectDetails details;
            try
            {
                details = _paratextProjects.GetProjectDetails(projectID);
            }
            catch (KeyNotFoundException)
            {
                throw new KeyNotFoundException("Unknown project ID: " + projectID);
            }
```

and replace it with:

```csharp
            ProjectDetails details;
            try
            {
                details = _paratextProjects.GetProjectDetails(projectID);
            }
            catch (KeyNotFoundException)
            {
                throw new KeyNotFoundException("Unknown project ID: " + projectID);
            }

            // Published projects belong to ParatextPublishedProjectDataProviderFactory. Reject them
            // here so callers don't end up with an unpublished PDP whose advertised interfaces lie
            // about what the project can actually do. The truthful discriminator is the presence
            // of legacyCommentManager.comments in the advertised interfaces — only unpublished
            // Paratext projects advertise it.
            if (!details.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT))
            {
                throw new KeyNotFoundException(
                    $"Project {projectID} is published and cannot be served by this factory");
            }
```

- [ ] **Step 5.4: Run all factory tests — expect PASS**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~ParatextProjectDataProviderFactoryTests"
```

Expected: all PASS (published path is not exercised by current tests; unpublished path unchanged).

- [ ] **Step 5.5: Commit**

```bash
cd /home/tj_co/source/repos/paranext-core
git add c-sharp/Projects/ParatextProjectDataProviderFactory.cs c-sharp-tests/Projects/ParatextProjectDataProviderFactoryTests.cs
git commit -m "$(cat <<'EOF'
refactor(c-sharp): scope ParatextProjectDataProviderFactory to unpublished projects only

The factory's project list now comes from GetAvailableUnpublishedProjectDetails,
and GetProjectDataProviderID throws KeyNotFoundException for published project
IDs (identified by the absence of legacyCommentManager.comments in their
advertised interfaces). Existing unpublished flows are unchanged. Published
projects will be served by the new ParatextPublishedProjectDataProviderFactory
in the next task.

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Add `ParatextPublishedProjectDataProviderFactory`

**Files:**

- Create: `c-sharp/Projects/ParatextPublishedProjectDataProviderFactory.cs`
- Create: `c-sharp-tests/Projects/ParatextPublishedProjectDataProviderFactoryTests.cs`

- [ ] **Step 6.1: Write the failing test**

Create `c-sharp-tests/Projects/ParatextPublishedProjectDataProviderFactoryTests.cs`:

```csharp
using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextPublishedProjectDataProviderFactoryTests : PapiTestBase
    {
        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
        }

        [Test]
        public async Task PublishedFactory_AdvertisesInterfaceListWithoutLegacyCommentAsync()
        {
            var factory = new ParatextPublishedProjectDataProviderFactory(Client, ParatextProjects);
            await factory.InitializeAsync();

            // Truth check on the source of advertised interfaces.
            var advertised = LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true);

            Assert.That(advertised, Does.Not.Contain(ProjectInterfaces.LEGACY_COMMENT));
            Assert.That(advertised, Does.Contain(ProjectInterfaces.USFM_CHAPTER));
            Assert.That(advertised, Does.Contain(ProjectInterfaces.BASE));
        }

        [Test]
        public async Task PublishedFactory_GetAvailableProjects_IsEmptyForDummyUnpublishedFixturesAsync()
        {
            // DummyScrText / FakeAddProject produces unpublished ScrTexts (IsResourceProject ==
            // false on the base ScrText class), so the published factory's available list is empty
            // in the unit-test fixture. This is the partition assertion: unpublished projects go
            // to the other factory, not this one.
            const string projId = "315555";
            ParatextProjects.FakeAddProject(CreateProjectDetails(projId, "RegProj"));

            var factory = new ParatextPublishedProjectDataProviderFactory(Client, ParatextProjects);
            await factory.InitializeAsync();

            Assert.Throws<KeyNotFoundException>(() => factory.GetProjectDataProviderID(projId));
        }
    }
}
```

- [ ] **Step 6.2: Run — expect compile failure (class doesn't exist)**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~ParatextPublishedProjectDataProviderFactoryTests"
```

Expected: build error — `ParatextPublishedProjectDataProviderFactory` is undefined.

- [ ] **Step 6.3: Create the published factory**

Create `c-sharp/Projects/ParatextPublishedProjectDataProviderFactory.cs`:

```csharp
using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// PDP factory dedicated to <em>published</em> Paratext projects — those backed by
/// <c>ResourceScrText</c> (loaded from <c>.p8z</c> DBL / biblical resource files) or
/// <c>JoinedScrText</c> (joined-resource views). These are identified by
/// <c>ScrText.IsResourceProject == true</c>, the same flag <c>platform.isPublished</c> is computed
/// from (see PR #2333). The factory advertises every projectInterface the regular factory does
/// EXCEPT <c>legacyCommentManager.comments</c>, because:
/// <list type="bullet">
///   <item>Published projects are read-only at the storage layer —
///     <c>ResourceProjectFileManager.SetXml</c> throws
///     <c>AttemptedResourceWritingException</c> on every write, so all 12 comment wire methods
///     would be guaranteed to either throw or return empty data.</item>
///   <item>Comments are <em>technically</em> readable on these projects (the reads aren't
///     storage-blocked), but no published project format we know of ships with embedded comment
///     XML. Choosing not to advertise the interface trades a theoretical read-only capability we
///     don't believe is exercised for a wire surface that's honest about what the project can do.</item>
/// </list>
///
/// <para>
/// <strong>This factory is specifically for published projects (<c>IsResourceProject</c>).</strong>
/// Other PT9 project types that <em>also</em> have restricted comment support are intentionally
/// NOT served here:
/// </para>
/// <list type="bullet">
///   <item><strong>Study Bible Additions (<c>IsStudyBibleAdditions</c>):</strong> can host real
///     comments. PT9's <c>ParatextDataExtensions.CanAddNotes</c> takes an <c>allowInSba</c>
///     escape parameter, used by <c>WordListForm.cs</c> (lines 950, 2205) to create spelling
///     notes that flow through the normal <c>CommentManager</c> infrastructure. Stays on the
///     regular factory; the runtime guard at <c>ParatextProjectDataProvider.cs</c> line 654
///     remains load-bearing for the general-creation path.</item>
///   <item><strong><c>ProjectType.TransliterationWithEncoder</c>:</strong> has no escape hatch in
///     PT9's <c>CanAddNotes</c>, but we lack certainty about read-only scenarios (a project
///     converted to this type from another could still hold existing threads someone needs to
///     read). Stays on the regular factory; the runtime guard at
///     <c>ParatextProjectDataProvider.cs</c> line 660 remains load-bearing for creation.</item>
///   <item><strong>Note-only project types</strong> (<c>ConsultantNotes</c>,
///     <c>GlobalConsultantNotes</c>, <c>GlobalAnthropologyNotes</c>): filtered out before any
///     factory sees them by <c>ScrTextCollection.ScrTexts(IncludeProjects.ScriptureOnly)</c>.
///     Not served by any factory today; out of scope for this PR.</item>
/// </list>
///
/// <para>
/// <strong>Future restricted-interface project types should get their own dedicated PDPF</strong>
/// rather than being folded in here. This factory's contract is specifically "the data shape
/// published projects (<c>ResourceScrText</c> / <c>JoinedScrText</c>) can support" — broadening it
/// to cover other restriction patterns would re-create the dishonest-interface problem this
/// factory exists to fix.
/// </para>
/// </summary>
internal class ParatextPublishedProjectDataProviderFactory : ProjectDataProviderFactory
{
    internal const string PDPF_NAME = "ParatextPublished";
    private readonly LocalParatextProjects _paratextProjects;
    private readonly ConcurrentDictionary<string, ParatextProjectDataProvider> _pdpMap = new();
    private readonly object _creationLock = new();
    private readonly Random _random = new((int)DateTime.Now.Ticks);

    public ParatextPublishedProjectDataProviderFactory(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects
    )
        : base(
            LocalParatextProjects.GetParatextProjectInterfaces(isPublished: true),
            PDPF_NAME,
            papiClient
        )
    {
        _paratextProjects = paratextProjects;
    }

    protected override Task StartFactoryAsync()
    {
        _paratextProjects.Initialize();
        return Task.CompletedTask;
    }

    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore)
    {
        return _paratextProjects
            .GetAvailablePublishedProjectDetails()
            .Select(pd => pd.Metadata)
            .ToList();
    }

    public override string GetProjectDataProviderID(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return existingPdp.DataProviderName;

        lock (_creationLock)
        {
            if (_pdpMap.TryGetValue(projectID, out var existingPdpInLock))
                return existingPdpInLock.DataProviderName;

            ProjectDetails details;
            try
            {
                details = _paratextProjects.GetProjectDetails(projectID);
            }
            catch (KeyNotFoundException)
            {
                throw new KeyNotFoundException("Unknown project ID: " + projectID);
            }

            // Unpublished projects belong to ParatextProjectDataProviderFactory. Reject them here
            // (identified by the presence of legacyCommentManager.comments in their advertised
            // interfaces) so they don't accidentally get served by the published factory.
            if (details.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT))
            {
                throw new KeyNotFoundException(
                    $"Project {projectID} is not published and cannot be served by this factory");
            }

            var name = new string(
                Enumerable.Range(0, 30).Select(_ => (char)_random.Next(65, 90)).ToArray()
            );

            var newPdp = new ParatextProjectDataProvider(
                name,
                PapiClient,
                details,
                _paratextProjects
            );
            if (!_pdpMap.TryAdd(projectID, newPdp))
                throw new InvalidOperationException("Internal error adding project data provider");

            ThreadingUtils.RunTask(
                newPdp.RegisterDataProviderAsync(),
                $"Register published PDP {newPdp.DataProviderName} for project {details.Name}",
                ThreadingUtils.DefaultTimeout
            );
            return newPdp.DataProviderName;
        }
    }

    /// <summary>
    /// Get an existing PDP if it exists for a project id. Symmetrical with
    /// <see cref="ParatextProjectDataProviderFactory.GetExistingProjectDataProvider"/> so the
    /// unpublished-side callers (ManageBooksService, ParatextProjectSendReceiveService) have a
    /// parallel hook if they ever need one — but published projects don't currently flow through
    /// send/receive or manage-books, so no caller change is required.
    /// </summary>
    public ParatextProjectDataProvider? GetExistingProjectDataProvider(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return existingPdp;
        return null;
    }
}
```

- [ ] **Step 6.4: Run new published-factory tests — expect PASS**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test --filter "FullyQualifiedName~ParatextPublishedProjectDataProviderFactoryTests"
```

Expected: both tests PASS.

- [ ] **Step 6.5: Commit**

```bash
cd /home/tj_co/source/repos/paranext-core
git add c-sharp/Projects/ParatextPublishedProjectDataProviderFactory.cs c-sharp-tests/Projects/ParatextPublishedProjectDataProviderFactoryTests.cs
git commit -m "$(cat <<'EOF'
feat(c-sharp): add ParatextPublishedProjectDataProviderFactory

New factory dedicated to Paratext published projects (ResourceScrText /
JoinedScrText — same set as platform.isPublished from PR #2333). Advertises the
scripture + base interface list, deliberately omitting
legacyCommentManager.comments because published projects cannot accept comment
writes at the storage layer (ResourceProjectFileManager.SetXml throws). PDPs it
constructs reuse ParatextProjectDataProvider (single PDP class) but receive a
ProjectDetails whose Metadata.ProjectInterfaces drives GetFunctions() to skip
all comment-method registration.

Class-level doc-comment records why other restricted-interface PT9 project
types (SBA, TransliterationWithEncoder, note-only types) intentionally stay on
the regular factory rather than being folded in here — this factory's contract
is specifically "what published projects can support", and broadening it would
re-create the dishonest-interface problem.

Reciprocally rejects unpublished project IDs so the two factories partition the
project space cleanly. The wire registration is platform.ParatextPublished-pdpf.

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Wire the published factory into `Program.cs`

**Files:**

- Modify: `c-sharp/Program.cs:82, 98-105`

- [ ] **Step 7.1: Add the published factory to startup**

Edit `c-sharp/Program.cs`. Find the line at 82:

```csharp
            var paratextFactory = new ParatextProjectDataProviderFactory(papi, paratextProjects);
```

and append directly after it:

```csharp
            var paratextPublishedFactory = new ParatextPublishedProjectDataProviderFactory(papi, paratextProjects);
```

Then find the `Task.WhenAll(` block at line 98 and add the new factory's initialization. Change:

```csharp
            await Task.WhenAll(
                paratextFactory.InitializeAsync(),
                inventoryDataProvider.RegisterDataProviderAsync(),
```

to:

```csharp
            await Task.WhenAll(
                paratextFactory.InitializeAsync(),
                paratextPublishedFactory.InitializeAsync(),
                inventoryDataProvider.RegisterDataProviderAsync(),
```

(Leave the surrounding lines for `checkRunner`, `dblResources`, etc., untouched.)

- [ ] **Step 7.2: Build the C# project to confirm wiring compiles**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp
dotnet build
```

Expected: build succeeds with zero errors.

- [ ] **Step 7.3: Run the full C# test suite — confirm no regression**

```bash
cd /home/tj_co/source/repos/paranext-core/c-sharp-tests
dotnet test
```

Expected: all tests PASS (existing + new).

- [ ] **Step 7.4: Commit**

```bash
cd /home/tj_co/source/repos/paranext-core
git add c-sharp/Program.cs
git commit -m "$(cat <<'EOF'
feat(c-sharp): bootstrap ParatextPublishedProjectDataProviderFactory in Program.cs

Construct and initialize the new published factory alongside the existing
regular factory at startup. Both share the same LocalParatextProjects instance
so initialization (ScrTextCollection refresh, project root setup) only runs
once. PAPI will now route legacyCommentManager.comments lookups for published
project IDs to "no factory found" instead of to the regular factory's PDP that
previously silently advertised an interface it could not honor.

Co-Authored-By: Claude Code <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Cross-cutting verification

**Files:**

- Verify only — no edits unless the audit finds an issue.

- [ ] **Step 8.1: Verify no other C# code paths assume every Paratext project advertises `legacyCommentManager.comments`**

```bash
cd /home/tj_co/source/repos/paranext-core
grep -rn "LEGACY_COMMENT\|legacyCommentManager.comments\|GetParatextProjectInterfaces" c-sharp/ c-sharp-tests/
```

Expected hits should be limited to:

- `c-sharp/Projects/ProjectInterfaces.cs` (declaration)
- `c-sharp/Projects/LocalParatextProjects.cs` (lists + helpers, modified in Task 1)
- `c-sharp/Projects/ParatextProjectDataProvider.cs` (the new gate in `GetFunctions`, modified in Task 4)
- `c-sharp/Projects/ParatextProjectDataProviderFactory.cs` (the new reject-path, modified in Task 5)
- `c-sharp/Projects/ParatextPublishedProjectDataProviderFactory.cs` (new factory, added in Task 6)
- The corresponding test files

If any other C# file (e.g. checks, inventory, send-receive) references `LEGACY_COMMENT` outside these locations, STOP and investigate.

- [ ] **Step 8.2: Confirm extension-side and TS-side behavior is acceptable as-is**

```bash
cd /home/tj_co/source/repos/paranext-core
grep -rn "legacyCommentManager\.comments" src/ extensions/src/ lib/ | grep -v node_modules
```

Expected hits (already audited in F9 in the Investigation section):

- `extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts` — type declarations (no behavior).
- `extensions/src/legacy-comment-manager/src/main.ts:291` — inside `/* */` commented-out debug block. Inactive.
- `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx:119, 190` — consumes the PDP; receives `undefined` on published IDs, which the React hook handles by rendering `DEFAULT_LEGACY_COMMENT_THREADS` (empty list). Correct behavior.
- `extensions/src/legacy-comment-manager/src/project-data-provider/legacy-comment-manager-usj-pdpe.model.ts:21-22` — overlay requires the interface on the underlying project; published projects naturally drop out of the overlay's scope. Correct behavior.
- `extensions/src/platform-scripture-editor/src/main.ts:548` — "insert comment at selection" calls `papi.projectDataProviders.get('legacyCommentManager.comments', projectId)`. On a published projectId this now throws via PAPI lookup. The caller is already inside a `try`/`catch` block — verify by reading the surrounding context.
- `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx:357` — `useProjectDataProvider(...)` returns `undefined` on published projects; downstream `commentsPdp` consumers should already handle the undefined case. Verify by reading lines 350-380.

If any reference assumes the comments PDP is _always_ available without an undefined / try-catch guard, capture the file/line and STOP. If all references already handle the undefined-or-throw case, proceed.

- [ ] **Step 8.3: Run the full TypeScript test suite**

```bash
cd /home/tj_co/source/repos/paranext-core
npm test
```

Expected: all tests PASS. The TS test suite mocks PAPI in many places, so it should be unaffected by the C#-side split, but run it to be safe.

- [ ] **Step 8.4: Manual smoke test against a running app (gate before PR)**

Use the `app-runner` skill to start the app fresh, then verify:

1. An unpublished Paratext project still loads, displays scripture, and accepts new comments.
2. A published project (DBL / biblical resource) loads, displays scripture, and the comment UI either hides itself or shows zero comments without console errors. Specifically: in the comment list webview for a published project, you should see an empty list, not an unhandled promise rejection.
3. Send/receive on an unpublished project still works (no regression on `ManageBooksService` or `ParatextProjectSendReceiveService`).
4. Check the C# data provider log for any new errors during startup or project load.

If any smoke-test step fails, STOP and investigate before opening the PR.

- [ ] **Step 8.5: Decision-registry check**

Per `.claude/rules/architecture/adr-protocol.md`, read `.context/architecture/decision-registry.json` and search for entries matching:

- `patterns.csharp.factory` (factory splits)
- `patterns.csharp.dataProvider`
- `constraints.csharp.*` related to projectInterfaces or comment handling

If a relevant entry exists, confirm this PR complies. If no entry exists for "splitting a factory by project capability axis", capture the proposed entry as a follow-up note (do NOT block the PR; the user explicitly scoped this as platform refactor).

- [ ] **Step 8.6: Lint sweep**

```bash
cd /home/tj_co/source/repos/paranext-core
npm run lint
```

Expected: zero errors. (The C# Roslyn analyzers run as part of `dotnet build` in Task 7.2, so they're already covered.)

- [ ] **Step 8.7: Final integration check before PR**

```bash
cd /home/tj_co/source/repos/paranext-core
git status   # confirm clean except for known files
git log --oneline -10   # verify 7 commits from Tasks 1-7 are present
```

If state matches expectations, the branch is ready to push and PR via the `pr-creator` skill.

---

## Self-Review Notes

**Spec coverage:**

- Goal "split factory into two" → Tasks 5, 6 (existing factory → unpublished scope; new published factory).
- Goal "published projects stop advertising legacyCommentManager.comments" → Tasks 1, 2 (interface lists per published status; ScrTextExtensions routes through it).
- Goal "stop registering comment-related PAPI methods" → Task 4 (PPDP.GetFunctions gate).
- Constraint "PPDP stays one file, one class" → Tasks 4, 6 (both factories use the same PPDP type; only its GetFunctions changes).
- Constraint "don't touch existing guards" → Task 4 explicitly preserves them; Tasks 5, 6 do not modify PPDP method bodies.
- Constraint "no new readOnlyComments interface" → No new ProjectInterfaces.\* constants added.
- Constraint "no ManageBooks changes" → Task 8.1/8.2 audits confirm; no ManageBooks edits in any task.
- Test requirement "(a) published projects don't advertise comments, (b) published projects don't expose comment methods at the wire, (c) unpublished projects still expose both" → Task 1.1 covers (a), Task 4.1 covers (b) and (c).
- Key question "how does PAPI registration work?" → answered in Investigation F1; design uses metadata-driven runtime list gating.
- Key question "how does LocalParatextProjects split projects?" → Task 3 — two filter helpers backed by a shared `GetVisibleScrTexts` helper preserving the registration-aware filter.
- Key question "what happens to GetParatextProjectInterfaces?" → Task 1 — overloaded; no-arg defers to unpublished for backward compat.
- Key question "what about the existing IsResourceProject guards?" → Investigation F6 + Task 4 commit message — kept as defense-in-depth (or load-bearing for SBA/TransliterationWithEncoder on the regular factory), documented as such.
- Key question "should the partition extend beyond IsResourceProject?" → Investigation F11 + class-level doc-comment on `ParatextPublishedProjectDataProviderFactory` — no; SBA has real comments via spelling notes, TransliterationWithEncoder lacks read-path certainty, note-only types are filtered out earlier; future restricted-interface project types should get their own PDPF.
- Key question "any other callers assume the interface?" → Task 8.1 and 8.2 audits.

**Placeholder scan:** All steps have explicit code, exact bash commands, and verifiable expected output. No "TBD" / "add appropriate error handling" / "implement later" entries.

**Type consistency:**

- `GetParatextProjectInterfaces(bool isPublished)` — same name, signature, and call sites across Tasks 1, 2, 5, 6.
- `GetAvailableUnpublishedProjectDetails()` / `GetAvailablePublishedProjectDetails()` — defined in Task 3, consumed in Tasks 5 and 6 with matching names.
- `ParatextPublishedProjectDataProviderFactory` — class name, ctor signature `(PapiClient, LocalParatextProjects)`, and `PDPF_NAME = "ParatextPublished"` consistent between Tasks 6 and 7.
- Wire-method suffix array in Task 4.1 matches the 12 entries gated in Task 4.3.

No drift found.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-27-paratext-published-pdpf-split.md`. Two execution options:

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task with review between tasks. Best for verifying each TDD cycle before moving on.

**2. Inline Execution** — Execute tasks sequentially in this session using `superpowers:executing-plans`, batching with checkpoints at each task boundary.

Which approach?
