# PT-2602 - Main toolbar scroll group follows the active tab

- **Ticket:** [PT-2602](https://paratextstudio.atlassian.net/browse/PT-2602) - "Scroll Group - PB not changing the main toolbar scroll group based on the 'Active Tab'/cursor placement"
- **Depends on (done):** [PT-1517](https://paratextstudio.atlassian.net/browse/PT-1517) "Determine active tab" (shipped - the window focus service)
- **Builds on (open PR):** [#2478 / `pt-4036-versification-aware-sync`](https://github.com/paranext/paranext-core/pull/2478) - versification-aware scroll-group sync
- **Base branch:** `pt-4036-versification-aware-sync` (not `main`)
- **Date:** 2026-07-01

## 1. Problem

The main application toolbar (`src/renderer/components/platform-bible-toolbar.tsx`) owns a Book/Chapter/Verse (BCV) control and, in power mode, a scroll-group selector. Its scroll group is a standalone value persisted in `localStorage` under `platform-bible-toolbar.scrollGroupId` (default `0`), fed into `useScrollGroupScrRef`. It has **no awareness of which tab is focused**.

So if a user focuses a tab synced to scroll group C, the main toolbar keeps showing whatever group it was last set to (e.g. A). PT9 does not behave this way - its top toolbar reflects the active window's scroll group and reference. This ticket closes that gap.

## 2. Goal / Definition of Done

1. The main toolbar's scroll group follows the scroll group of the **active (focused) scripture tab**.
2. The main toolbar's BCV shows the **same reference the active tab shows** - i.e. the active tab's scroll-group reference converted into the active tab's project versification (leveraging #2478), so at cross-versification divergence points the two agree.
3. Switching the active tab, or changing the active tab's own scroll group, updates the toolbar accordingly.
4. The behavior degrades safely for tabs that are not scripture views synced to a numbered scroll group.

## 3. Background - the three subsystems this stitches together

### 3a. Scroll groups
- A scroll group is a `ScrollGroupId` (number). The **scroll-group service host** (`src/renderer/services/scroll-group.service-host.ts`) owns the actual `SerializedVerseRef` per group and (post-#2478) the group's `sourceProjectId`.
- Each WebView stores its association on its definition: `WebViewDefinition.scrollGroupScrRef` (`src/shared/models/web-view.model.ts:124`) - a **number** (synced to that group) or a `SerializedVerseRef` object (independent / "no scroll group").
- `WebViewDefinition.projectId` (`web-view.model.ts:119`) carries the tab's project (both fields are updatable and persisted; readable via `getSavedWebViewDefinition(webViewId)`).
- Hook `useScrollGroupScrRef(scrollGroupScrRef, setScrollGroupScrRef, projectId?)` returns `[scrRef, setScrRef, scrollGroupId, setScrollGroupId]`.

### 3b. Active-tab / focus (PT-1517, shipped)
- The **window service** (`src/renderer/services/window.service-host.ts`, model `src/shared/services/window.service-model.ts`) tracks focus via DOM `focusin`/`focusout` and exposes `papi.window.subscribeFocus(undefined, cb, options)` / `getFocus()`.
- `FocusSubject` is `{ focusType: 'webView', id }` | `{ focusType: 'tab', tabType, id }` | `{ focusType: 'other' }`. For a WebView tab, the tab `id` equals the WebView id.
- **Caveat that shapes this design:** focus collapses to `'other'` whenever it leaves all tabs - including when the user clicks the toolbar's own controls (the documented PT-1517 "known issue"). `getFocus()` does not remember the last active tab.

### 3c. Versification-aware sync (#2478, the base branch)
- The scroll group records the `sourceProjectId` its stored ref is expressed in; `ScrollGroupUpdateInfo` and `onDidUpdateScrRef` carry it.
- `useScrollGroupScrRef`'s third arg `projectId` converts the group's ref into that project's versification **for display**, and `setScrRef` stamps that project as the source. Conversion is display-only, stale-guarded, and pass-through-safe.
- Helpers available in the renderer: `getScrRefSourceProjectIdSync(scrollGroupId)` and `getScrRefForProject(...)`.

## 4. Design decisions (settled with the reporter)

| Decision | Resolution | Rationale |
| --- | --- | --- |
| **Base branch** | `pt-4036-versification-aware-sync` (#2478) | It already reworks the exact hook + toolbar; basing here avoids conflicts and delivers the versification half of the DoD |
| **Read direction** | Toolbar attaches to the active scripture tab's scroll group on active-tab change (and when that tab's own group changes) | The core of the ticket |
| **Versification** | While attached, the toolbar passes the **active tab's `projectId`** to `useScrollGroupScrRef`, so its BCV shows the identical ref the tab shows | Satisfies DoD #2 for free via #2478 |
| **Top-bar selector (power mode)** | **Non-destructive.** Changing it re-points the toolbar to the chosen group; it does **not** re-group any editor. The standalone toolbar group is kept | PT10 already has a per-tab selector that mutates a tab's group; making the top selector a second mutator (PT9's model) would be redundant. Giving it a distinct "drive/attach" role is clearer. See §7 for the PT9 analysis |
| **Manual override persistence** | A manual top-bar selection holds until the active tab changes to a **different** scripture tab, then the toolbar re-attaches | "Your override holds until you move on" |
| **No numbered-group active tab** (non-scripture webview, or a scripture tab set to "no scroll group") | **Keep the last group**; the standalone group persists | Avoids the toolbar going blank/undefined |
| **Focus -> `'other'`** | Track the *last active scripture tab*; ignore transient `'other'` focus (the toolbar's own controls) | Works around the PT-1517 caveat |
| **Override-navigate** | Navigating a group from the toolbar while overridden **moves that group's verse but preserves its `sourceProjectId`** ("move the verse, nothing else") | Upholds the reporter's principle that a top-bar change affects only the verse |

## 5. Behavior specification

### 5.1 What the toolbar follows
The toolbar follows the **last active scripture tab** = the most recently focused WebView tab whose `scrollGroupScrRef` is a **number** (a numbered scroll group). Focus subjects that are `'other'`, non-WebView tabs, non-scripture WebViews, or WebViews on an independent ("no scroll group") ref do **not** change the followed group - the toolbar keeps its last group.

### 5.2 The `projectId` the toolbar passes to `useScrollGroupScrRef`
This single value drives both the displayed-ref conversion and the navigation stamp. Let `toolbarGroup` be the toolbar's current group and `activeGroup`/`activeProjectId` describe the followed tab.

- **Attached** (`toolbarGroup === activeGroup`, the normal state): pass **`activeProjectId`**.
  - Display: the group's ref is converted into the active tab's versification -> identical to what the tab shows (**DoD #2**).
  - Navigate: `setScrRef` stamps `activeProjectId` as source - exactly as if the user navigated inside the tab.
- **Override / no active group** (`toolbarGroup !== activeGroup`, incl. no scripture tab active): pass **`getScrRefSourceProjectIdSync(toolbarGroup)`** (the group's own established owner).
  - Display: consumer equals source -> no conversion -> the group's raw stored ref is shown.
  - Navigate: `setScrRef` re-stamps the same source -> the group's versification owner is unchanged ("move the verse, nothing else").

Conceptually: *the toolbar always speaks the versification of whatever it currently reflects* - the active tab (attached) or the driven group's established owner (override). The act of **switching** the toolbar's group performs no writes at all; only a **navigation** writes.

### 5.3 Read direction (attach) details
- On active-tab change to a scripture tab with numbered group `g`, set `toolbarGroup := g` (re-attaches). If `g` equals the current toolbar group, the group is unchanged but the passed `projectId` still updates to the new tab's project (display re-converts).
- While a tab stays active, changes to *its own* `scrollGroupScrRef` (e.g. the user changes the tab's per-tab selector) propagate: the toolbar re-reads and follows.
- Re-attachment is keyed on the **active tab's identity**, so moving focus to a different scripture tab re-attaches even if both share a group number. A manual override therefore holds while the same tab stays active (a top-bar interaction only makes focus `'other'`, which is ignored) and is released when a different scripture tab becomes active.

### 5.4 Interface-mode differences
- **Power mode:** per-tab BCV + scroll-group selector exist on each tab *and* on the toolbar (both gated on `isPowerMode`). This is the only mode where the override path (§5.2) is reachable.
- **Simple mode:** no scroll-group selector anywhere; the toolbar BCV is "the single navigation point" (see `web-view.component.tsx:517-521`). Only the read direction applies - the toolbar BCV reflects and navigates the active tab's group. There is no override.

### 5.5 Worked scenarios
Setup: power mode; editor **W** = WEB project (English versification) in group **A**; editor **G** = an Original-versification project in group **B**.

1. **Follow + versification (DoD).** Focus W. Toolbar attaches to A and passes W's project; if A's verse was last set from an Original editor at `PSA 51:3` (Original), the toolbar shows `PSA 51:1` (WEB) - the same ref W shows.
2. **Navigate from the toolbar while attached.** Focused in W, type `PSA 51:1`. Group A's ref is set stamped WEB - identical to typing it in W; an Original follower of A lands on `51:3`.
3. **Override display.** Still focused in W, pick group **B** from the toolbar selector. Toolbar shows B's raw ref in B's own versification; W is untouched and still in A.
4. **Override navigate.** Driving B, type `PSA 51:1`. B's verse moves; B's `sourceProjectId` is preserved; B's followers convert as before.
5. **Release override.** Focus editor **G**. Toolbar re-attaches to G's group (B) and passes G's project.
6. **Non-scripture tab.** Focus a settings WebView (no group). Toolbar keeps the last group and ref.

## 6. Architecture / implementation sketch

No new services, providers, or top-level structures. The change reuses `windowService` (focus), `webViewService` (`getSavedWebViewDefinition`, `onDidUpdateWebView`), and the #2478 scroll-group hook/host. The only new artifact is one renderer hook, plus edits to the existing toolbar.

### 6.1 New hook: `useActiveTabScrollGroup` (toolbar-internal)
A renderer hook, but deliberately **toolbar-owned, not a public reuse surface**. The top toolbar is its only consumer today, and none is planned - so this extraction is **not** justified by reuse. It is justified by (a) keeping `PlatformBibleToolbar` (~335 lines, already busy) lean, and (b) making the ~30-50 lines of subscription/tracking logic **unit-testable in isolation** (feed it focus + WebView definitions, assert the returned tuple), which the testing strategy relies on. It reads renderer-local focus + WebView-definition state, so it lives in the renderer per the shared-patterns "host where the data lives" rule.

- **Placement:** co-located with the toolbar (a sibling file), imported directly by `platform-bible-toolbar.tsx`. **Not** exported through any shared/public hook barrel (notably not `papi-hooks/index.ts`), so it stays app-internal. If a second consumer ever appears, promoting it to a shared hook is a trivial follow-up - build that only when it's real.

Returns a description of the **current follow target**:
```ts
{
  webViewId?: string;            // identity of the last active scripture tab (for re-attach keying)
  scrollGroupId?: ScrollGroupId; // defined only when that tab is synced to a numbered group
  projectId?: string;            // that tab's WebViewDefinition.projectId
}
```
Internals:
1. Consume the existing window-service `Focus` data provider reactively via `useData('platform.windowServiceDataProvider').Focus(...)` (preferred over hand-rolling `subscribeFocus`, which duplicates the subscribe/unsubscribe the `useData` hook already manages). Derive the active WebView id from `focusType: 'webView'`, or `focusType: 'tab'` with `tabType === 'webView'`; ignore `'other'` and non-WebView tabs (keep last).
2. Read that WebView's definition via `getSavedWebViewDefinition(webViewId)` -> `scrollGroupScrRef`, `projectId`.
3. Subscribe to `papi.webViews.onDidUpdateWebView` and refresh when the tracked WebView's definition changes (its group or project).
4. Expose `scrollGroupId` only when `scrollGroupScrRef` is a number; otherwise leave it `undefined` (so the toolbar keeps its last group).

### 6.2 Toolbar changes: `platform-bible-toolbar.tsx`
- Consume `const active = useActiveTabScrollGroup();`.
- **Follow effect:** when `active.scrollGroupId` is a defined number, key an effect on `active.webViewId` (identity) and call `updateScrollGroupIdInternal(active.scrollGroupId)`.
- **`projectId` selection** (feeds the existing `useScrollGroupScrRef` third arg, replacing today's `currentProject`):
  `const attached = scrollGroupIdInternal === active.scrollGroupId;`
  `const effectiveProjectId = attached ? active.projectId : getScrRefSourceProjectIdSync(scrollGroupIdInternal);`
- The selector's `onChangeScrollGroupId` (`setScrollGroupId` -> `updateScrollGroupIdInternal`) is unchanged - it writes only the toolbar's own group, which naturally becomes an override until the next active-tab change.
- No write-back to any WebView definition from the toolbar (guarantees "move the verse, nothing else" and avoids feedback loops).

### 6.3 Files expected to change
- **New:** a toolbar-internal hook file co-located with the toolbar (e.g. `src/renderer/components/use-active-tab-scroll-group.hook.ts`) + its test. **No** shared/public barrel export (see §6.1).
- **Edit:** `src/renderer/components/platform-bible-toolbar.tsx` (consume hook, follow effect, `effectiveProjectId`).
- Possibly a tiny helper/getter if reading `getScrRefSourceProjectIdSync` from the toolbar warrants a cleaner surface (decide during planning; may be unnecessary).

## 7. Why Option B (non-destructive top selector), verified against PT9

PT9 source (`ParatextBase/ParatextWindows/WindowManagerHelper.cs`) shows its **single** top-toolbar scroll-group split button both reflects the active window's group (`:150`) and, on click, mutates it (`:406-414` -> `ActiveWindow.ScrollingGroup = group`). PT9 has no per-window group *selector* (only display-only badges, hidden when all windows share a group - `ScrollGroupBadgeHelper.cs:54-67`).

PT10 differs: each tab **already** has its own scroll-group selector (`web-view.component.tsx:533-542`, power mode) that mutates that tab's group - i.e. PT10 already provides PT9's "change this editor's group" affordance, on the tab. Reproducing it on the top bar (Option A) would make the top selector a redundant second mutator. Option B gives the two selectors complementary roles: **per-tab selector = change this editor's group; top selector = choose which group the top bar drives**, auto-attaching to the active tab. The PT9-A capability is not lost - it lives on the per-tab selector.

## 8. Edge cases & known limitations

- **Active tab on an independent ("no scroll group") ref.** The toolbar cannot represent "no group" (its group is always a number), so it keeps the last group and does **not** mirror the independent tab's ref. Accepted limitation; out of scope to relax the toolbar's number-only model.
- **Override-navigate downgrades correctness only if misused.** Preserving `sourceProjectId` keeps followers correct; there is no correctness regression versus today.
- **Startup / no scripture tab yet.** The toolbar shows its persisted `localStorage` group (today's behavior) until a scripture tab is focused.
- **Debounce.** Focus detection is debounced (~250 ms) upstream; the toolbar update inherits that latency, which is acceptable.
- **Popup focus.** Because we ignore `'other'` and key re-attachment on tab identity, opening the toolbar's own dropdown does not disturb the followed tab.

## 9. Testing strategy

Behavior-focused (Vitest; testing-trophy - favor the hook + integration seams over DOM snapshots):
- **`useActiveTabScrollGroup` unit/hook tests:** focus a WebView -> returns its group + project; `'other'` and non-scripture/non-WebView focus -> keeps last; `onDidUpdateWebView` on the tracked tab -> refreshes group/project; independent-ref tab -> `scrollGroupId` undefined.
- **Toolbar integration tests (mock the hook + scroll-group host):** active-tab change updates the toolbar group; attached state passes the active tab's `projectId`; override passes the group's `sourceProjectId` and holds until active-tab change; no write-back to WebView definitions occurs on selector change.
- **Manual / visual verification:** two projects with different versifications in one group - confirm the toolbar BCV matches the active tab's displayed ref across a divergence point (e.g. Psalm heading). (Reuses #2478's verification setup.)

## 10. Out of scope
- Relaxing the toolbar to represent "no scroll group" / independent refs.
- Any change to the per-tab selector semantics.
- New E2E automation (manual verification for the versification display this pass; automate later if desired).
- Reconciling PT-4036/PT-4037 ticket text (tracked on #2478).

## 11. Risks
- **Dependency on an open PR.** This branches from `pt-4036-versification-aware-sync`. If #2478 changes in review, rebase this branch; if #2478 is reworked substantially, the `projectId` plumbing here may need matching updates. Low risk - #2478 is marked mergeable/low-risk and the surface we depend on (`useScrollGroupScrRef(..., projectId)`, `getScrRefSourceProjectIdSync`) is small and stable.
- **Behavior change to the top-bar selector** (now non-destructive) - intentional and documented here; no data migration needed (the `localStorage` group key is retained).
