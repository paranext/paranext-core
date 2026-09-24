# Comment filters: two explicit dropdowns, persisted per project, with durable drafts

> **Frozen record** — approved 2026-09-16 against `fb1eea2dae8`. File:line citations reflect the
> tree at that commit; follow the current files and the named symbols, not these line numbers.

- **Date:** 2026-09-16
- **Branch:** `pt-4554-improving-comments` (continues from the NN-1.1/1.2/1.4 work already on it)
- **Status:** Approved, ready for implementation planning
- **Supersedes:** the NN-1.3 half of
  [`2026-09-14-comments-tab-improvements-design.md`](./2026-09-14-comments-tab-improvements-design.md)
  (decision D4 and its plan tasks 5, 6 and 7). The NN-1.1, NN-1.2 and NN-1.4 decisions in that
  document still stand and are already shipped on this branch.

## Why this replaces D4

The original work item described adding date and author filters and said the remaining work was
"UI only". Two premises turned out to be wrong:

1. **Date and author are not wanted in the frontend yet.** The backend supports both
   (`LegacyCommentThreadSelector.dateFilter` / `.author`, and `CommentThreadSelector.cs`), and that
   support stays. It is simply not surfaced.
2. **The orthogonal-axis model is not what users want.** Five dropdowns that AND together made the
   PT9 presets reachable only by composition. Users want the presets directly.

D4 also collapsed the toolbar behind a single `Filters` trigger with chips. That is reverted: the
toolbar returns to explicit inline dropdowns, as it looked before.

## What ships

Two independent dropdowns, always visible in the toolbar.

**Group 1 — preset.** One closed union replacing the four axes:

| Option | Selector |
| --- | --- |
| All notes *(default, first)* | `{}` |
| Unresolved notes assigned to me | `{ isResolved: false, assignedTo: <current user> }` |
| Unresolved | `{ isResolved: false }` |
| Unread notes assigned to me | `{ isRead: false, assignedTo: <current user> }` |
| Unread | `{ isRead: false }` |
| Unread and unresolved | `{ isRead: false, isResolved: false }` |
| Resolved | `{ isResolved: true }` |
| Unsaved notes | *client-side — see below* |
| Conflict | `{ type: 'Conflict' }` |

A single enum, not presets composed over retained axes. The UI never exposes the axes again, so the
combinatorial flexibility would be unused weight — and `assignedTo: 'Team'`, `assignedTo: ''`
(unassigned) and `type: 'Normal'` are deliberately dropped from the surface rather than hidden
behind a composition nobody can reach.

**Group 2 — scope.** Four options over the existing
`CommentScriptureRange.granularity` (`'book' | 'chapter' | 'verse'`), which the selector already
accepts — no backend work:

| Option | Selector |
| --- | --- |
| All books *(default, first)* | no `scriptureRanges` |
| Current book | `scriptureRanges: [{ granularity: 'book', … }]` |
| Current chapter | `scriptureRanges: [{ granularity: 'chapter', … }]` |
| Current verse | `scriptureRanges: [{ granularity: 'verse', … }]` |

All three "current" options follow the window's scroll-group reference live: changing verse re-runs
the query at the new verse, changing book at the new book.

### No scope coercion

`resolveEffectiveScopeFilter` and `canScopeToCurrentChapter` are deleted, along with the
`hiddenValues` gating on the scope dropdown. All four options are always offered.

This is a deliberate behaviour change. Today a panel that follows no editor
(`canScopeToCurrentChapter === false`, i.e. neither the Column 3 panel nor editor-wired) hides
"Current chapter" and coerces a stored value back to "All books", so the displayed value, the
offered options and the query cannot disagree.

Note what dropping it actually does. `useWebViewScrollGroupScrRef()` always returns a reference —
the scroll group holds a position at all times — so an unwired panel scoped to "Current book" does
**not** return nothing. It returns comments for whatever book the window's scroll group is on. That
may not be the position the user associates with that panel. Accepted: the Column 3 comments panel
always satisfies `canScopeToCurrentChapter`, so this only affects standalone comment lists, and
removing the rule removes a concept that would otherwise have to run on every persisted restore.

## Unsaved notes

**Definition** (confirmed against PT9): a thread carrying content the user typed but did not commit
— an unsent reply in the compose box, or an unsaved edit to an existing comment. Not "saved locally
but not yet sent/received".

PT9's mechanism, for reference: `UnfinishedFilter.Accept()` returns `false` for every thread, and
`CommentListForm.cs` re-adds unsaved items afterwards —
`.Where(t => (filterAdapter?.Accept(t) ?? true) || unsavedNoteContents.ContainsKey(t.Id) || …)`.
Its own comment calls this "basically a hack to show only the unsaved items by removing everything
else." The draft store is `Dictionary<string, ThreadEditState>` — draft html plus a pending assignee
— living on the form and cleared on save or cancel.

**We take the filter but not the always-visible rule.** In PT9 a drafted thread stays visible under
every filter. Here, a filter that excludes a drafted thread excludes it; only "Unsaved notes" shows
drafts. Decided deliberately: the alternative forces either an unfiltered query or a second query
per drafted thread, because PT10 pushes filtering into the selector where PT9 filters in memory, and
`LegacyCommentThreadSelector.threadId` is a single string with no set form.

**Consequently "Unsaved notes" is the one preset that does not map to a selector.** It sends a
scope-only selector and filters the result client-side to threads present in the draft map.

## Drafts must outlive the component

`CommentThread` currently owns `pendingCommentEditorState` and `pendingCommentAssignedUser` as local
`useState`, and `CommentItem` owns its edit-mode `editorState` the same way. All three die when the
component unmounts — which a filter change does routinely.

**Both components become controlled for draft state**: they receive the draft and report changes
upward, rather than owning it. The web view owns the map, because it survives filter changes and
re-queries.

`platform-bible-react` deliberately does **not** touch `localStorage` or know about projects. It is
a design-system package; storage and project identity belong to the extension. The draft flows
`web view → CommentListPanel → CommentList → CommentThread`, the same shape
`selectedThreadId` / `onSelectedThreadChange` already uses (`comment-list.types.ts:118,124`).

This is the largest part of the work and it widens the public `platform-bible-react` API, so it
requires `npm run build:pbr` and a committed `dist/` — the package ships through its committed
bundles and neither the root build nor any test suite rebuilds them.

## Persistence

Two kinds of durable state, deliberately in different stores.

| | Store | Scope | Survives restart | Sent/Received |
| --- | --- | --- | --- | --- |
| Filter selections | `UserProjectSettings` → `{projectDirectory}/Extensions/UserSettings-{userId}.xml` | per user, per project | yes | yes (per-user file; nobody reads another's) |
| Drafts | `localStorage`, key `legacyCommentManager.drafts.<projectId>` | per user, per project, per machine | yes | no — never leaves the machine |

**Filters** use the store already holding `ModelTexts`, `StructureProtected` and
`ReferencedProjectsAndResources` (`ParatextProjectDataProvider.cs`, `GetUserProjectSettings()`),
which versions each setting with a `dataSchemaVersion`. Each user gets their own file, so no user
sees another's filter selection. The file does travel in Send/Receive — `Extensions/` is not in
PT9's `.hgignore` (`VersionedText.cs`, which ignores only `local/**`, `PA7/**`, `InDesign/**`) —
accepted because it is per-user and unread by anyone else.

**Drafts** use `localStorage` because it never leaves the machine, which half-written comments
should not. Web view iframes share the renderer's origin (React web views get `allow-same-origin` to
reach PAPI), and `local-storage.service.ts` documents that its storage "is shared with every web
view iframe" and guards its own sweep against extensions' keys — so an extension writing there is an
anticipated pattern, not a novel one.

Three consequences to honour:

- **Wrap every access.** `local-storage-flag.util.ts` wraps all of its because `localStorage`
  "throws outright in a sandboxed or partially sandboxed context". Reads must render correctly with
  nothing stored.
- **Bound the size.** Roughly 5–10MB per origin, shared with everything else on it. Two rules, both
  cheap: drop a draft whose thread no longer exists when the map is loaded — PT9 does exactly this
  in `CommentListForm.CleanupUnsavedThreadIds()` — and drop a draft the moment its content becomes
  empty, so cancelling or clearing an editor does not leave a tombstone that makes the thread show
  under "Unsaved notes" forever. A hard cap is deliberately not specified: a user cannot realistically
  accumulate megabytes of hand-typed comment drafts, and an eviction policy that silently discards
  typed work is worse than the space it saves. Revisit if telemetry ever shows otherwise.
- **Machine-local.** Drafts do not follow a user to another machine and vanish if app data is
  cleared. This is still more durable than PT9, which loses them when the window closes.

## What is deleted

- The `Filters` trigger, its popover, the chips and `buildFilterChips`
- `closedAxis`, `ClosedAxisDefinition`, `CLOSED_AXES_BY_KEY`, `CLOSED_AXES`, `FilterAxisRow`
- `AuthorFilterDropdown` and the `PopoverPortalContainerProvider` usage
- The `date` and `author` axes, `DatePresetFilter`, `resolveDatePresetFilter`, `toAuthorOptions`,
  `AUTHOR_FILTER_ALL`
- The four orthogonal axes (`ResolvedFilter`, `ReadFilter`, `TypeFilter`, `AssignmentFilter`) and
  their label maps and guards
- `resolveEffectiveScopeFilter`, `canScopeToCurrentChapter`, the scope `hiddenValues` gating
- Every localization key belonging to the above, in both `en` and `es`

Four of the six open review findings against the collapsed toolbar retire with the code they were
against: the invisible scope filter, the unsearchable "All authors" value, the missing
keyboard-shortcuts-catalog entry, and the unfalsifiable no-search assertion. **Two do not, and must
be fixed rather than carried:**

- **The UTC day boundary.** `resolveDatePresetFilter` anchors "today" to UTC midnight while its own
  doc comment says it avoids exactly that; a US Pacific user at 8pm loses 17 hours of that day's
  comments. The date axis is being deleted, so this dies with it — but if any date logic is revived
  later it must not return.
- **The `ModifiedDate` semantics.** The backend filters on the thread's last activity, not its first
  comment. Only relevant if date filtering returns.

## Testing

1. **Each preset maps to its selector** — one assertion per option, including that `all` contributes
   nothing and `unsaved` contributes no selector clause at all.
2. **Each scope maps to its granularity**, and the three "current" options re-query when the
   scroll-group reference changes.
3. **`unsaved` filters client-side** to exactly the threads in the draft map, and a drafted thread
   excluded by the *scope* stays excluded (the always-visible rule is deliberately absent — pin it,
   so a future "improvement" cannot quietly reintroduce PT9's behaviour).
4. **A draft survives an unmount** — mount a thread, type, change the filter so it unmounts, restore
   the filter, assert the draft is still there. This is the whole point of hoisting the state and
   must fail if the state moves back into the component.
5. **A draft survives a reload** — write, re-read from a fresh store instance, assert equality; and a
   throwing `localStorage` degrades to "no drafts" rather than crashing the panel.
6. **Filter selections round-trip per project** — set, reopen the same project, assert restored; open
   a different project, assert its own selection rather than the first one's.
7. **No scope coercion** — a stored scope value survives a panel with no wired editor rather than
   being rewritten to "All books".
8. **Both draft kinds count** — an unsent reply and an unsaved edit each make a thread "unsaved".

## Open items

1. **Decomposition.** This is larger than the three items it replaces. The filter model and the two
   dropdowns are independent of the draft work; only the "Unsaved notes" preset needs drafts. If the
   plan runs long, the natural seam is to land the dropdowns and filter persistence first, then the
   draft hoisting and "Unsaved notes" second — with the preset present but disabled in between
   rather than absent, so the option list does not change shape twice.
2. **UX sign-off is no longer blocked.** The original D4 open item asked whether a popover satisfied
   "options displayed"; explicit dropdowns moot it.
3. **Q8** — whether the PT9 filter omissions are deliberate. Unanswered as of 2026-09-16;
   non-blocking.
4. **Coordinate with PR #2211** (per-view zoom, same web view) — open as of 2026-09-16.

## Provenance

Requirements settled in conversation on 2026-09-16. The "unsaved notes" definition was verified
against the Paratext 9 source (`ParatextData/ProjectComments/Filters/ThreadFilters.cs`,
`ThreadFilterSelectionAdapter.cs`, `Paratext/ProjectComments/CommentListForm.cs`) rather than
assumed; the initial assumption that it meant "saved locally but not sent/received" was wrong. The
Send/Receive exclusion list was read from `ParatextData/Repository/VersionedText.cs`. Storage
options and the iframe origin question were checked against the live paranext-core tree.
