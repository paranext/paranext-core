# Comment Filters B — Per-Project Filter Persistence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Frozen record** — written 2026-09-16 against `0f93dc3c34e`. File:line citations reflect the tree
> at that commit. Follow the current files and the named symbols, not these line numbers.

**Goal:** Remember each user's comment-filter selection per project, so reopening a project restores the filters they left it on.

**Architecture:** A new `UserCommentFilters` project-data type on `ParatextProjectDataProvider`, backed by the existing `UserProjectSettings` store (`{projectDirectory}/Extensions/UserSettings-{userId}.xml`). The web view reads it on mount and writes on every change, replacing today's `useState`/`useWebViewState`. Follows the `UserModelTexts` pattern end to end.

**Tech Stack:** C# (.NET 8), NUnit, TypeScript, React 19, Vitest.

**Design:** [`2026-09-16-comment-filters-revamp-design.md`](./2026-09-16-comment-filters-revamp-design.md)

**Depends on:** plan A. The stored shape is `{ preset, scopeFilter }`, which only exists after A.

---

## Why this store

`UserProjectSettings` is per-user *and* per-project: each user gets their own `UserSettings-{userId}.xml`, so nobody reads anyone else's selection. It already holds `ModelTexts`, `StructureProtected` and `ReferencedProjectsAndResources`, and versions each setting with a `dataSchemaVersion`.

**It does travel in Send/Receive.** `Extensions/` is not in the ignore list — PT9's `.hgignore` (written by `ParatextData/Repository/VersionedText.cs`) covers only `local/**`, `PA7/**`, `InDesign/**`. Accepted deliberately: the file is per-user and unread by anyone else, so it transmits without being shared.

---

## Conventions for every task

```bash
cd extensions/src/legacy-comment-manager && npx vitest run
cd c-sharp-tests && dotnet test
cd /home/mgetgen/repos/paranext/paranext-core && dotnet csharpier check c-sharp
```

- Read `UserModelTexts`'s full path before writing anything — `GetUserModelTexts`, `SetUserModelTexts`, `ResetUserModelTexts`, their dispatch-table entries, `ValidateUserSettingVersion`, `ValidateVersionNotDowngraded` and `SendDataUpdateEvent`. This plan follows it exactly; deviating from it needs a stated reason.
- **Forward-facing comments**; no change narration.
- Pre-commit hook runs gitleaks and prettier. Never bypass it.
- Do not push.

---

## File Structure

| File | Responsibility | Tasks |
| --- | --- | --- |
| `c-sharp/Projects/ProjectDataType.cs` | Register the data type name | 1 |
| `c-sharp/Projects/CommentFilterSelection.cs` | **New** — the stored shape and its XML round-trip | 1 |
| `c-sharp/Projects/ParatextProjectDataProvider.cs` | get/set/reset + dispatch entries | 2 |
| `c-sharp-tests/Projects/CommentFilterSelectionTests.cs` | **New** — round-trip and version tests | 1 |
| `extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts` | Data type + method declarations | 3 |
| `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx` | Read on mount, write on change | 4 |

---

## Task 1: The stored shape and its serialization

**Files:**
- Create: `c-sharp/Projects/CommentFilterSelection.cs`
- Create: `c-sharp-tests/Projects/CommentFilterSelectionTests.cs`
- Modify: `c-sharp/Projects/ProjectDataType.cs`

- [ ] **Step 1: Write the failing round-trip test**

Create `c-sharp-tests/Projects/CommentFilterSelectionTests.cs`:

```csharp
using NUnit.Framework;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

[TestFixture]
public class CommentFilterSelectionTests
{
    [Test]
    public void RoundTripsThroughXml()
    {
        var selection = new CommentFilterSelection
        {
            DataVersion = "1.0.0",
            Preset = "unread-and-unresolved",
            ScopeFilter = "current-verse",
        };

        var restored = CommentFilterSelection.FromXml(CommentFilterSelection.ToXml(selection));

        Assert.That(restored.Preset, Is.EqualTo("unread-and-unresolved"));
        Assert.That(restored.ScopeFilter, Is.EqualTo("current-verse"));
    }

    [Test]
    public void ReadsDefaultsWhenElementsAreAbsent()
    {
        // A file written by an older build, or a hand-edited one, must not throw — an absent
        // selection is simply the default view rather than a corrupt setting.
        var restored = CommentFilterSelection.FromXml(new System.Xml.Linq.XElement("Items"));

        Assert.That(restored.Preset, Is.EqualTo("all"));
        Assert.That(restored.ScopeFilter, Is.EqualTo("all-books"));
    }
}
```

- [ ] **Step 2: Run and watch it fail**

```bash
cd c-sharp-tests && dotnet test --filter CommentFilterSelectionTests
```

Expected: FAIL to compile — `CommentFilterSelection` does not exist. That compile failure *is* the RED phase for C#, per `.claude/rules/testing/tdd-discipline.md`; commit skeleton stubs alongside the failing test if you split the commit.

- [ ] **Step 3: Implement the shape**

Create `c-sharp/Projects/CommentFilterSelection.cs`:

```csharp
using System.Xml.Linq;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// One user's comment-filter selection for one project. Stored per user in
/// <c>{projectDirectory}/Extensions/UserSettings-{userId}.xml</c>, so two people on the same
/// project keep independent selections.
/// </summary>
public class CommentFilterSelection
{
    public string DataVersion { get; set; } = "1.0.0";

    /// <summary>The named filter preset, e.g. <c>unresolved</c>. Defaults to <c>all</c>.</summary>
    public string Preset { get; set; } = "all";

    /// <summary>The Scripture scope, e.g. <c>current-chapter</c>. Defaults to <c>all-books</c>.</summary>
    public string ScopeFilter { get; set; } = "all-books";

    public static XElement ToXml(CommentFilterSelection selection) =>
        new(
            "Items",
            new XElement("Preset", selection.Preset),
            new XElement("ScopeFilter", selection.ScopeFilter)
        );

    /// <summary>
    /// Reads a selection, falling back to the default view for any element the file does not carry.
    /// Values are not validated against the known presets here: the set lives in TypeScript, and a
    /// value this build does not recognize is better surfaced by the frontend resolving it to its
    /// default than by the provider refusing to load the file.
    /// </summary>
    public static CommentFilterSelection FromXml(XElement? items) =>
        new()
        {
            Preset = items?.Element("Preset")?.Value ?? "all",
            ScopeFilter = items?.Element("ScopeFilter")?.Value ?? "all-books",
        };
}
```

Add to `c-sharp/Projects/ProjectDataType.cs`, beside the other `USER_*` entries:

```csharp
    public const string USER_COMMENT_FILTERS = "UserCommentFilters";
```

- [ ] **Step 4: Run, format, commit**

```bash
cd c-sharp-tests && dotnet test --filter CommentFilterSelectionTests
cd /home/mgetgen/repos/paranext/paranext-core/c-sharp && dotnet csharpier .
```

```bash
git add c-sharp/Projects/CommentFilterSelection.cs c-sharp/Projects/ProjectDataType.cs \
        c-sharp-tests/Projects/CommentFilterSelectionTests.cs
git commit -m "feat(comments): add the per-user comment filter selection shape

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Provider methods

**Files:**
- Modify: `c-sharp/Projects/ParatextProjectDataProvider.cs`

- [ ] **Step 1: Add the three methods**

Place them beside `GetUserModelTexts`/`SetUserModelTexts`/`ResetUserModelTexts` and mirror their structure exactly:

```csharp
    public CommentFilterSelection GetUserCommentFilters(object? param = null)
    {
        var (schemaVersion, content) = GetUserProjectSettings().GetSetting("CommentFilters");
        if (content == null)
            return new CommentFilterSelection();
        ValidateUserSettingVersion(schemaVersion, "CommentFilters");
        var selection = CommentFilterSelection.FromXml(content);
        selection.DataVersion = schemaVersion!;
        return selection;
    }

    public bool SetUserCommentFilters(object? value)
    {
        var selection = DeserializeCommentFilterSelection(value, "CommentFilters");
        ValidateUserSettingVersion(selection.DataVersion, "CommentFilters");
        var (currentVersion, _) = GetUserProjectSettings().GetSetting("CommentFilters");
        ValidateVersionNotDowngraded(selection.DataVersion, currentVersion, "CommentFilters");
        GetUserProjectSettings()
            .SetSetting("CommentFilters", selection.DataVersion, CommentFilterSelection.ToXml(selection));
        SendDataUpdateEvent(ProjectDataType.USER_COMMENT_FILTERS, "user comment filters update event");
        return true;
    }

    public bool ResetUserCommentFilters(object? param = null)
    {
        GetUserProjectSettings()
            .SetSetting(
                "CommentFilters",
                new CommentFilterSelection().DataVersion,
                CommentFilterSelection.ToXml(new CommentFilterSelection())
            );
        SendDataUpdateEvent(ProjectDataType.USER_COMMENT_FILTERS, "user comment filters update event");
        return true;
    }
```

Write `DeserializeCommentFilterSelection` modelled on the existing `DeserializeResourceReferenceList` — read that method and follow its error handling rather than inventing your own.

Register all three in the dispatch table beside `getUserModelTexts`:

```csharp
        retVal.Add(("getUserCommentFilters", GetUserCommentFilters));
        retVal.Add(("setUserCommentFilters", SetUserCommentFilters));
        retVal.Add(("resetUserCommentFilters", ResetUserCommentFilters));
```

- [ ] **Step 2: Decide the Send/Receive write gate, and record the decision**

`CLAUDE.md` requires any new C# path that mutates project data to open
`using var _ = SendReceiveWriteLock.EnterWrite(projectId);` as its entry point's first statement.
`SetUserModelTexts` — the closest existing analogue, writing the same file — does **not** have one.

Establish which is right before writing code, by reading `SendReceiveWriteLockCoverageTests` in
`c-sharp-tests/Projects/SendReceive/` and checking whether its scan covers this write pattern. Then
either add the gate, or add the inline `// SR-write-gate: exempt — <reason>` marker the coverage test
accepts. **Do not leave it unmarked**: the coverage test scans for `.Save(` and related patterns and
fails on any uncovered hit, so an unmarked new write will fail CI.

Report which you chose and the evidence.

- [ ] **Step 3: Verify and commit**

```bash
cd c-sharp-tests && dotnet test
cd /home/mgetgen/repos/paranext/paranext-core/c-sharp && dotnet csharpier .
```

```bash
git add c-sharp/Projects/ParatextProjectDataProvider.cs
git commit -m "feat(comments): read and write the per-user comment filter selection

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Declare the data type to the frontend

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts`

- [ ] **Step 1: Add the data type and methods**

Read how `UserModelTexts` is declared in
`extensions/src/platform-scripture/src/types/platform-scripture.d.ts` and mirror it. On the comments
project data provider interface add:

```ts
    /** This user's comment filter selection for this project. */
    UserCommentFilters: DataProviderDataType<undefined, CommentFilterSelection, CommentFilterSelection>;
```

with the matching `getUserCommentFilters` / `setUserCommentFilters` / `resetUserCommentFilters` /
`subscribeUserCommentFilters` members, and:

```ts
  /** One user's stored comment-filter selection for one project. */
  export type CommentFilterSelection = {
    dataVersion: string;
    preset: CommentPreset;
    scopeFilter: ScopeFilter;
  };
```

Note the C# properties are PascalCase and the TS shape is camelCase — confirm which casing crosses
the wire by reading how `ResourceReferenceList` is declared on the TS side, and match it.

- [ ] **Step 2: Verify and commit**

```bash
cd extensions/src/legacy-comment-manager && npx tsc -p ./tsconfig.json --noEmit
```

```bash
git add extensions/src/legacy-comment-manager/src/types/legacy-comment-manager.d.ts
git commit -m "feat(comments): declare the user comment filter data type

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Web view reads and writes it

**Files:**
- Modify: `extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx`

- [ ] **Step 1: Write the failing test**

Add to `src/comment-list.web-view.burst.test.tsx` (which already mocks the PAPI surface — follow its
existing mock shape rather than inventing one):

```tsx
it('restores the stored selection on mount and writes back on change', async () => {
  // The stored selection is the source of truth: a panel reopened on a project comes back to the
  // filters it was left on, rather than to the default view.
  const setUserCommentFilters = vi.fn();
  renderWebView({
    storedFilters: { dataVersion: '1.0.0', preset: 'unread', scopeFilter: 'current-book' },
    setUserCommentFilters,
  });

  await waitFor(() => {
    expect(screen.getByRole('combobox', { name: 'Filter comments' })).toHaveTextContent('Unread');
  });

  await userEvent.click(screen.getByRole('combobox', { name: 'Filter comments' }));
  await userEvent.click(screen.getByRole('option', { name: 'Resolved' }));

  expect(setUserCommentFilters).toHaveBeenCalledWith(
    expect.objectContaining({ preset: 'resolved', scopeFilter: 'current-book' }),
  );
});
```

- [ ] **Step 2: Run and watch it fail, then wire it up**

Replace the `useState`/`useWebViewState` filter state with the project-data hook, following how
`inventory.web-view.tsx:253` uses `useProjectSetting` and how other web views use `useProjectData`
for a settable type:

- read `UserCommentFilters` for the current `projectId`;
- until it resolves, render the loading state rather than querying with default filters — otherwise
  the list visibly flips from the default view to the stored one on every open;
- on any dropdown change, write the whole selection back;
- keep the `setFilters` message path working: a programmatic open still overrides the stored
  selection for that open, and **does not** write it back, so a one-shot link does not permanently
  change what the user sees next time. Assert that in a test.

- [ ] **Step 3: Verify the per-project claim**

Add a test that two different `projectId`s hold independent selections — this is the requirement's
whole point and a single-project test cannot show it.

- [ ] **Step 4: Run everything and commit**

```bash
cd extensions/src/legacy-comment-manager && npx vitest run && npx tsc -p ./tsconfig.json --noEmit
```

```bash
git add extensions/src/legacy-comment-manager/src/comment-list.web-view.tsx \
        extensions/src/legacy-comment-manager/src/comment-list.web-view.burst.test.tsx
git commit -m "feat(comments): restore each user's filter selection per project

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Deliberately not in this plan

- **Drafts** — plan C.
- **Sending the selection between users** — the file is per-user by design; nothing merges selections.
- **Migrating the old `useWebViewState` scope value** — it was per-web-view and died on close, so
  there is nothing durable to migrate from.
