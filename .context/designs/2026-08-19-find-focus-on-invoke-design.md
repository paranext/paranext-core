# Find: focus the search input on invoke

> **Frozen record** — approved design as of 2026-08-19, for the `pt-4342-dock-find-in-simple` branch.
> Once implemented, the code is the authority; read the current files rather than this document.

## Problem

The PR's stated purpose is that every Find entry point lands on the one Find tab. It does — but on a
tab the user cannot type into. `Ctrl+F` fronts the tab and leaves the caret nowhere useful, so the
next keystroke is lost.

Mechanically: `openFind` leaves `bringToFront` at its `true` default, so for the reuse path
`openWebView` calls `updateWebViewDefinitionSync(id, {}, true)`, which reaches `focusTab` →
`revealTabGroupAndSetDocumentFocusToTab` → `setDocumentFocusToTab`. That calls
`webViewIframe.contentWindow.focus()`. Focus therefore *does* leave the editor and enter the Find
iframe — it lands on the iframe's `body`, not on the search input.

Two consequences worth stating precisely, because they shape the fix:

- `papi.window.setFocus({ focusType: 'webView', id })` routes to the same `focusTab`
  (`window.service-host.ts`, `PlatformWindowDataProviderEngine`). Adding such a call to `openFind`
  would be close to a no-op. The missing behavior is inside the iframe.
- `setDocumentFocusToTab` also restores `tabInfo.lastFocusedElement`, tracked per tab from a
  `focusin` listener on the iframe's `contentWindow` (`web-view.component.tsx`). So once the user has
  typed in the search box, later invokes *do* restore it. The gap is the **first** invoke of a
  session, and every invoke after a reload — a rebuilt iframe leaves `lastFocusedElement` pointing at
  a detached element, where `.focus()` is a no-op.

## Decisions

1. **Explicit invoke only.** `Ctrl+F` and the editor menu's Find item focus the search input.
   Clicking the Find tab does not; it keeps the platform's restore-last-focused-element behavior. A
   tab click is a navigation act, an invoke is a typing act, and overriding the restore would yank a
   user who was mid-edit in the Replace field back to Search on every return to the tab.
2. **Both interface modes.** Power mode has the identical gap and the identical intent, so there is
   no `interfaceMode` branch in the web view.
3. **One signal per `openFind` exit path.** See below.

## Why two signals

`openFind` has three exits. Two of them reuse an already-mounted panel and one rebuilds it, and no
single signal covers both shapes:

- **Reload path** — `Ctrl+F` with a selection, or project / editor id / read-only changed.
  `reloadWebView` rebuilds the iframe, so the component mounts fresh. A network event emitted here
  would race the new mount's `useEvent` subscription (a network round-trip) and usually lose.
- **No-reload path** — `Ctrl+F` with no selection on an already-correct panel. Nothing remounts, so a
  mount-time hook never fires. This is the *common* case: `updateRelatedFindPanel` now pre-sets
  project, editor id, and read-only at project-open time, so all three reload conditions already
  match and an empty selection is falsy.

So the reload path carries the request **in state**, which a fresh mount reads from its initial
value with no race; and the no-reload path uses a **network event**, which an already-subscribed
component receives immediately.

Rejected alternative: make `openFind` always reload so one mechanism suffices. It unifies the code
but rebuilds the Find iframe on every `Ctrl+F`, re-running the search and discarding the panel's
scroll position, and it worsens an eager-rebuild concern already raised in review.

## Data flow

```
Editor iframe: Ctrl+F keydown  (window keydown listener in the editor web view)
  └─> sendCommand('platformScripture.openFind', webViewId, selectedText)
        │
     openFind
        │  probe openWebView(existingId:'?', createNewIfNotFound:false)
        │  ── bringToFront already fronts the tab and focuses the iframe ──
        │
        ├─ no project ─────> emit FIND_FOCUS_SEARCH_EVENT { webViewId }
        │
        ├─ reload or create > reloadWebView / openWebView with shouldFocusSearch
        │                      └─> state.shouldFocusSearch ──> fresh mount
        │
        └─ reuse as-is ────> emit FIND_FOCUS_SEARCH_EVENT { webViewId }
                               └─> useEvent on the mounted web view
```

A third exit takes the event route too: the branch where no project can be resolved fronts an
existing Find and returns. Nothing remounts there either, and it is still an explicit invoke — leaving
it out would make Ctrl+F-with-no-project the one invoke that lands the user somewhere they cannot
type, which is the complaint this change answers.

All three converge inside `useFocusSearchOnInvoke`, on:

```ts
const requestFocusSearchInput = useRunWhenVisible(isViewVisible, () =>
  focusSearchInputRef.current(),
);
```

## Hidden case

Required by `.claude/rules/cross-view-sync-hidden-views.md`, and this change is subject to it.

- **Live**: the Find tab is visible, the focus request runs immediately.
- **Hidden**: in Simple mode the Find tab is *inactive* when `Ctrl+F` is pressed, so its pane is
  `display: none`, and `.focus()` on an element in a hidden subtree is a silent no-op. `openWebView`
  fronts the tab synchronously in the renderer, but the React re-render and rc-dock's visibility flip
  are not synchronous with the event arriving inside the iframe. Routing both triggers through
  `useRunWhenVisible` defers a request that arrives a frame early and consumes it on the visibility
  transition, instead of dropping it.

`useRunWhenVisible` is the hook this branch promoted to `platform-bible-react`, and its existing
tests already cover the arm-while-hidden / fire-on-visible behavior, so this is a backed mechanism
rather than an asserted one.

**Accepted consequence**, commented at the site: if the front-ing never happens, one request stays
armed and fires when the user next opens the Find tab. In practice the pane becomes visible in the
same batch, so the deferral is a safety net rather than a routine path — and a user who deliberately
opens Find landing in the search box is a reasonable outcome, not a wrong one.

## Components

| File | Change |
| --- | --- |
| `find.model.ts` *(new)* | `FIND_FOCUS_SEARCH_EVENT`, contract documented — mirrors `checklist.model.ts`. The payload type is declared API, so it lives in the `.d.ts` |
| `types/platform-scripture.d.ts` | `FindFocusSearchEvent` and the `NetworkEvents` entry; a focus sentence on `openFind` |
| `platform-scripture/src/main.ts` | Emitter created in `activate` before the command is exposed and disposed via `context.registrations`; `openFind` sets the option on the reload path, emits on the no-reload path |
| `find.web-view-provider.ts` | `shouldFocusSearch?: boolean` on `FindWebViewOptions` |
| `find/find-web-view-definition.util.ts` | `state.shouldFocusSearch: options.shouldFocusSearch ?? false` |
| `find/use-focus-search-on-invoke.hook.ts` *(new)* | Holds both delivery routes and the hidden-tab deferral, and returns the event handler. Extracted during implementation so the composition is testable without PAPI or a real iframe |
| `find.web-view.tsx` | `searchInputRef`; reads the state flag; calls the hook; one `useEvent` line |
| `find/find.component.tsx` | Accept `searchInputRef` and attach it to the existing search `Input` |
| `src/stories/keyboard-shortcuts.data.ts` | `scripture-find` `purpose` must say it focuses the search box |

The event payload carries `webViewId` and the web view filters on its own `id`. This differs
deliberately from `CHECKLIST_OPEN_SETTINGS_EVENT`, which broadcasts with `params: []` because it
*wants* every mounted checklist to react; here Power mode can hold more than one Find panel and only
the one `openFind` resolved should take focus.

The flag is scrubbed to `false` whenever the caller supplies nothing, so a value persisted into a
saved layout cannot fire on the next hydration. This is a one-shot request, so unconditional
scrubbing is correct — unlike `isReadOnly`, which describes durable state and therefore falls back to
the saved value when no project is named.

`openFind`'s signature does not change, but `platform-scripture.d.ts` does: the event payload type
`FindFocusSearchEvent` and the `NetworkEvents` entry that types the channel are declared there,
following `CheckResultsInvalidated`. **That makes this a public API addition**, and the PR body's
"API Changes" section has to say so.

## Testing

- `find-web-view-definition.util.test.ts` — the flag is set from options, scrubbed when absent, and
  never carried over from saved state. Pure, no iframe.
- `find/use-focus-search-on-invoke.hook.test.tsx` — both triggers, the way
  `use-run-when-visible.hook.test.tsx` does: mount hidden, fire the trigger, flip visible, assert the
  focus call lands. Also that the state request is consumed once per mount while each event is a fresh
  ask, and that an event naming another web view is ignored. Driving a real iframe is out of scope.
- No e2e test. That was declined earlier in this review and nothing here changes that call.

## Out of scope

Escape-to-dismiss is being tracked separately. Note that `Ctrl+F` is a `keydown` listener *inside the
editor iframe*, so once focus is in Find it no longer reaches that handler — `Ctrl+F` is not a toggle,
and Escape is the counterpart that makes the tab dismissable from the keyboard.
