---
title: Extension Development Guide
description: Extension anatomy, lifecycle, PAPI usage, WebViews, and contribution points for Platform.Bible.
version: 1.1.5
status: active
created: 2026-03-04
last_updated: 2026-09-23
---

# Extension Development Guide

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

This document provides a concise overview of extension development for Platform.Bible. For comprehensive details, refer to the linked wiki pages.

---

## Extension Anatomy

Extensions follow a standardized directory structure:

```
extension-name/
├── assets/              # Static files (icons, JSON marketplace data)
├── contributions/       # Configuration files (menus, settings, localized strings)
├── src/
│   ├── main.ts          # Backend entry point (must be named main.ts)
│   ├── types/
│   │   └── extension-name.d.ts  # Type declarations
│   └── web-views/        # (or flat in src/ — both layouts are used)
│       ├── *.web-view.tsx   # React WebView components
│       └── *.web-view.scss  # WebView styles
├── manifest.json        # Extension metadata and entry points
├── package.json         # NPM package configuration
└── webpack/             # Build configuration
```

For complete details, see [Extension Anatomy wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy).

### Presentational Components vs. WebView Entry Points

Keep pure presentational React in `src/components/*.component.tsx`, separate from the
`*.web-view.tsx` files that serve as WebView entry points.

- **Decision:** Reusable presentational components (those with dedicated Storybook
  stories, free of WebView provider plumbing) live in `src/components/` as
  `*.component.tsx`. The matching `*.web-view.tsx` entry point imports the component and
  supplies the PAPI/data wiring.
- **Avoid:** putting `*.web-view.tsx` (a WebView entry point) under `src/components/`.
- **Rationale:** `*.component.tsx` is a different concern from `*.web-view.tsx` — pure
  presentation versus the WebView entry point — so the two are kept in separate
  locations. `paratext-registration`, `platform-lexical-tools`, and `platform-scripture`
  follow this layout (e.g. `platform-scripture/src/checklist.web-view.tsx` imports
  `ChecklistTool` from `./components/checklist.component`).

#### Component import purity (PAPI-decoupled)

A presentational `*.component.tsx` must be free of any PAPI/platform runtime coupling:
all data flows in via props, and all platform wiring (data fetching, settings, the
`globalThis.webViewComponent` assignment) lives in the matching `*.web-view.tsx` entry
point or web view provider. This keeps components reusable, Storybook-renderable, and
unit-testable without a running app.

A grep helps audit this — run it scoped to component files and **review each hit**:

```bash
grep -rnE "useData\b|useDataProvider\b|useSetting\b|papi\.|globalThis\.webViewComponent" \
  --include='*.component.tsx' extensions/src/{ext}/src/components/
```

Two categories are deliberately **not** counted as coupling: `useLocalizedStrings` from
`@papi/frontend/react` (the documented extension localization pattern — see
`Localization-Guide.md`) and logger imports. A data-fetching or settings hit is a coupling
leak: move it into the web view entry point/provider and pass the result down as a prop.
A handful of shipped components predate this rule and still carry hits (e.g.
`registration-form`, `track-project-dropdown`, `scripture-pane`, `footnotes-pane` in
`platform-scripture`) — treat those as legacy, not as license to add more.

---

## Backend Entry Point (main.ts)

The extension backend must export two functions:

```typescript
export async function activate(context: ExecutionActivationContext): Promise<void> {
  // Register commands, data providers, web views, etc.
  context.registrations.add(
    await commandPromise,
    await webViewProviderPromise,
    // ... all other registrations
  );
}

export async function deactivate(): Promise<boolean> {
  // Cleanup when extension unloads
  return true;
}
```

Extensions cannot use static imports—code must be bundled with webpack.

### Keep React-bundling value imports out of the main bundle

A **value** import (as opposed to `import type`) from a library that bundles React — e.g.
`@eten-tech-foundation/platform-editor`, `platform-bible-react` — must never be reachable from
`main.ts`, even transitively through a shared utils module. Webpack drags the library's whole
React-bundled output into the extension-host bundle, and `activate()` throws at load time because
`react/jsx-runtime` is unreachable in the extension-host sandbox. The failure is silent until cold
start: hot-reload QA sessions never re-run `activate()`, so a broken activation can survive many
test passes unnoticed.

The rules:

- In any module `main.ts` can reach, use `import type` only for such libraries.
- Put value imports (functions, constants) in a web-view-only module that no backend code imports
  (see `platform-scripture-editor.web-view.utils.ts` for the pattern and its header comment).
- After any change to the import graph of a module `main.ts` reaches, run a **cold-start
  activation smoke test** (fully restart the app and confirm the extension activates) before
  calling the change verified.

### Register each command once, globally

Register a command **once, for the whole app** — in `activate`, not per web view instance. A command
name is global: the second registration of the same name fails, so registering from a web view's
code means the first instance wins and every later one errors. Nothing about multi-window changes
this; `papi.commands.registerCommand` works exactly as it always has, and the platform adds no
per-window command facility.

If a command genuinely needs to act on ONE web view, take the web view id as its first argument
rather than registering a copy per instance. For richer per-instance interaction, use a **web view
controller** (see [WebViews](#webviews)), which already exists for that need: it is a network object
per web view, so its methods are addressed to a specific instance without any global name per
instance.

---

## PAPI (Platform API)

The Platform API enables extensions to interact with Platform.Bible:

### Core Services

| Service | Purpose |
|---------|---------|
| `papi.commands` | Register and send commands |
| `papi.dataProviders` | Register and access data providers |
| `papi.webViewProviders` | Register WebView providers |
| `papi.storage` | Extension-specific data storage |
| `papi.settings` | Access application settings |
| `papi.dialogs` | Show user dialogs |

### React Hooks (Frontend)

| Hook | Purpose |
|------|---------|
| `useData` | Subscribe to data provider data |
| `useDataProvider` | Access a data provider |
| `useProjectData` | Subscribe to project-specific data |
| `useSetting` | Access application settings |
| `useProjectSetting` | Access project-specific settings |

For complete PAPI documentation, see [PAPI wiki](https://github.com/paranext/paranext-extension-template/wiki/PAPI).

---

## Data Providers

Data providers mediate communication between frontend and backend:

```typescript
class MyDataProviderEngine implements IDataProviderEngine<MyDataTypes> {
  async getDataType(selector: string): Promise<Data> { /* ... */ }
  async setDataType(selector: string, data: Data): Promise<DataProviderUpdateInstructions> { /* ... */ }
}

// Registration
const provider = await papi.dataProviders.registerEngine(
  'extensionName.dataProviderName',
  new MyDataProviderEngine()
);
context.registrations.add(provider);
```

---

## WebViews

WebViews are React components rendered in sandboxed iframes:

```typescript
// my-component.web-view.tsx
import { useData } from '@papi/frontend/react';

globalThis.webViewComponent = function MyWebView() {
  const [data] = useData('extensionName.dataProvider').DataType('selector', 'default value'); // defaultValue (2nd arg) is required
  return <div>{data}</div>;
};
```

### Sandbox Constraints

WebViews run in sandboxed iframes with restricted permissions:

#### No `<form>` Elements

The sandbox does not have `allow-forms` permission. Form submissions are blocked even with `e.preventDefault()`.

**Pattern:** Use `<div>` with handlers instead:

```tsx
// ❌ BAD - causes sandbox error
<form onSubmit={handleSubmit}>
  <Button type="submit">OK</Button>
</form>

// ✅ GOOD - works in sandbox
<div onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
  <Button type="button" onClick={handleSubmit}>OK</Button>
</div>
```

#### Select Component Constraints

The Select component's value prop cannot be an empty string:

```tsx
// ❌ BAD - crashes with "value prop cannot be empty string"
<SelectItem value="">(None)</SelectItem>

// ✅ GOOD - use sentinel value
<SelectItem value="__none__">(None)</SelectItem>
// Handle in onChange: value === '__none__' ? undefined : value
```

#### React Key Anti-Patterns

Never use editable content in list item keys:

```tsx
// ❌ BAD - key changes when name changes, causing focus loss
{items.map(item => <Input key={item.name} value={item.name} />)}

// ✅ GOOD - stable key
{items.map(item => <Input key={item.id} value={item.name} />)}
```

### Opening WebViews with Layouts

When opening a WebView via `papi.webViews.openWebView()`, you can specify how it displays using the `layout` option:

- `'tab'` (default): Opens as a tab within the current dock panel.
- `'panel'`: Opens as a panel adjacent to the active tab (specify `direction` to control placement: `'left'`, `'right'`, `'bottom'`, `'top'`, etc.).
- `'float'`: Opens as a floating window; can specify `floatSize` and `position`: `'cascade'` or `'center'`.
- `'window'` **(experimental)**: Opens in its own application window. In Simple mode—which is single-window by design—this degrades to `'tab'`.
- `'replace-tab'`: Replaces an existing tab (requires `targetTabId`).

Additionally, `targetWindowId` **(experimental)** lets you open a WebView into a specific named window instead of the one the user is working in. Applies to `'tab'`, `'panel'`, and `'float'` layouts only; combining it with `'window'` is an error, and combining it with `'replace-tab'` is likewise an error—the tab being replaced already names the window. The open fails if no such window exists — it never falls back to another window. Window ids are platform-assigned and never reused, so an id names one window and only that window. Retrieve the id of the window your code is running in with `papi.window.getWindowId()`. That is not the same question as `platform.getFocusedWindowId`, which reports whichever window the user is looking at — it answers with a different window's id whenever yours is not the focused one.

Two **experimental** commands expose moving a WebView between windows:
`platform.moveWebViewToNewWindow(webViewId, isUserRequested?)` and
`platform.moveWebViewToWindow(webViewId, targetWindowId, isUserRequested?)`. A move closes the
WebView in its current window and reopens it — same `useWebViewState` state — in the target, so
consumers see a close event then an open event, and a WebView controller reference held across a
move must be re-acquired. The commands return the WebView's authoritative post-move id, which is
always the same id that was passed in: a WebView keeps the id it was minted with for its whole
life, across any number of moves. The optional `isUserRequested` parameter marks a move that a
person in this app asked for — e.g. a tab's own context menu — as opposed to an extension moving a
view on its own; it defaults to `false`. A window the platform deliberately opened in the
background is raised for a user-requested move and left alone otherwise.

`existingId: '?'` reuse is **cross-window** (experimental): the search covers every window,
prefers the window the user is working in when more than one matches, and raises the window
where the match was found — unless that window is one the platform deliberately kept in the
background and the user has not yet been in it, in which case content merely arriving there does
not raise it. The optional, **experimental** `existingProjectId` limits that search —
in every window, not just the one the call was headed for — to web views showing that project, so
a match for the project asked for outranks a web view of the same type showing another one
(combining it with a concrete `existingId` — or with no `existingId` at all — is an error). What a
window that cannot be asked means depends on which `existingId` was given. A `'?'` search names a
type, and every caller of one is an entry point the user just clicked, so an open that would create
goes ahead in the window the user is working in rather than doing nothing — accepting that it may
make a second copy of a view that already exists somewhere; a passive probe
(`createNewIfNotFound: false`) falls through to that same window and simply gets its not-found
answer. A `'window'` layout degrades to `'tab'` for such an open, so a duplicate is a tab the user
can see and close rather than a window taking the screen. A concrete `existingId` names one specific
view, so it refuses to guess instead: an open that would create fails, while a passive probe
(`createNewIfNotFound: false`) simply answers not-found.

### Styling Requirements

- Use **TailwindCSS** (Tailwind v4) with the `tw:` prefix for theming
- Use semantic color variables (e.g., `tw:bg-card`) instead of hardcoded colors
- Support RTL/LTR layouts using logical properties (`start`/`end` instead of `left`/`right`)

### Content Zoom (experimental)

A WebView opts into per-pane **content zoom** by marking the elements that render **project text** — scripture, note bodies, result snippets, resource text in its own font — and not the region around them. Buttons, inputs, filters, headers, badges and card frames stay outside every marked element, so they keep interface scale while the text grows:

```tsx
import { ContentZoomRoot } from 'platform-bible-react';

globalThis.webViewComponent = function MyWebView() {
  return (
    <div className="tw:flex tw:flex-col tw:h-full">
      <MyToolbar />
      {results.map((result) => (
        <p key={result.id}>
          <Button onClick={() => goTo(result.ref)}>{result.refLabel}</Button>
          <ContentZoomRoot as="span" className="scripture-font">
            {result.text}
          </ContentZoomRoot>
        </p>
      ))}
    </div>
  );
};
```

That is the whole opt-in. The platform then scales the marked elements on Ctrl/⌘+`+`/`-`/`0`, on Ctrl/⌘+wheel and from the tab context menu, remembers the level for that project and kind of pane, and shows the brief level indicator in the pane's top corner (top-right, top-left for right-to-left text). You write no key handler, no state and no CSS.

- **One area id across many text elements.** A *zoom area* is a named part of a view that zooms as one and keeps its own level. `<ContentZoomRoot>` with no `area` prop marks the view's `main` area — it renders the marker attribute with an empty value, and that empty value *is* the contract, not an oversight. A list or card view marks every text element with the same id and they zoom together; a view with several independently zoomable panes names each one (`area="footnotes"`), and each area gets its own level and memory. Ids are lower-case letters, digits and hyphens starting with a letter (`[a-z][a-z0-9-]*`); `default` is reserved. Use `as="span"` inside a `<p>`, a heading or a table cell. Text rendered by a `platform-bible-react` component (the comment cards) is marked by that component when you wrap it in `ContentZoomTextProvider`; your own inline text components can spread `useContentZoomTextProps()` onto their text element to take part the same way.
- **Areas must not nest.** A marked element inside another marked element is ignored (and logged once). Mark the text itself, not a scroll container that also holds a second area. Dividers, resize handles, banners and panel headers stay **outside** every area so they keep their size while the content scales.
- **Plain-HTML WebViews** put the attribute on each text element directly — `<div data-platform-content-zoom-root>` for the main area, `<div data-platform-content-zoom-root="footnotes">` (or a `<span>` for inline text) for a named one. `ContentZoomRoot` is only the React convenience wrapper over the same attribute; `CONTENT_ZOOM_ROOT_ATTRIBUTE` is exported beside it so you never have to spell the string.
- **Measuring inside a zoomed area.** The platform applies CSS `zoom` to the marked element, so `getBoundingClientRect()` inside it reports **zoomed** pixels while `getComputedStyle(element).fontSize` reports the **unzoomed** value. Code that converts between the two must read the factor itself, from the CSS custom property `--platform-content-zoom-<areaId>` on the WebView's `documentElement` (`--platform-content-zoom-main` for the unnamed area), falling back to `--platform-content-zoom-default`, which holds the Settings default that any area without its own level follows. (This mismatch is the PT-4167 caveat.)
- **If your view owns Ctrl/⌘+wheel for a sub-region of its own**, register that listener in the **capture** phase and call `stopPropagation()`. The platform's listener is deliberately on the bubble phase so that a view which does this keeps precedence; the Text Collection grid's per-resource zoom works exactly that way (`extensions/src/platform-scripture-editor/src/scripture-text-grid/use-resource-zoom-input.hook.ts`).
- **A view that marks nothing is not zoomed.** Content zoom acts only on *zoomable* panes: a first-party view the platform declares zoomable, or a view that currently renders at least one marked element. Anything else, including every URL WebView, renders at 100 % content zoom, shows no zoom items in its tab menu, and leaves Ctrl/⌘+`+`/`-`/`0` and Ctrl/⌘+wheel alone. *Interface scaling* still applies to it. Your view is zoomable only while at least one element carrying `data-platform-content-zoom-root` is rendered: the tab menu's zoom items, Ctrl/⌘ + `+`/`-`/`0` and Ctrl/⌘+wheel appear and act only then. If your view shows nothing to zoom for a while (before a search, while loading), render an empty marked element so the controls stay available.
- **Keep the terminology apart**, in your copy and in your identifiers. *Interface scaling* (the `platform.zoomFactor` setting) scales the **whole application**, chrome included; it is labelled "Interface scaling" in Settings. *Content zoom* is per **pane** and scales only marked content; its default is the `platform.webViewContentZoom` setting, labelled "Tab content default zoom" in Settings. Say **pane**, not "tab", for the thing that zooms — one tab may hold several panes, as the Scripture editor holds a text pane and a footnotes pane.
- **Simple mode's tab menu shows only the `platform.tabZoom` group.** It narrows the platform's contributed tab menu to that one group before rendering it, so an extension's own tab-menu contribution appears in Power mode only, never in Simple mode. A tab whose pane is not zoomable therefore has no tab menu at all in Simple mode.

`ContentZoomRoot`, `ContentZoomTextProvider`, `useContentZoomTextProps`, `CONTENT_ZOOM_ROOT_ATTRIBUTE` and the `data-platform-content-zoom-root` contract are **experimental** and may change without notice.

**Pop-ups stay at interface scale.** Menus, popovers, dropdowns and tooltips from
`platform-bible-react`, the pop-ups requested through `papi.overlays` (`showCommandPalette`,
`showPopover`, `showContextMenu`) and the Scripture editor's own right-click menu never take content
zoom, even when they open from zoomed text: content zoom makes project text readable, it does not
resize controls. Only their position follows the zoomed content. A pop-up you anchor to a position
in the text should read that position live — `useLivePopoverAnchor` from `platform-bible-react`
re-measures on scroll, resize and reflow — because `getBoundingClientRect()` inside a zoomed element
already reports viewport pixels, which is what the pop-up is placed in. Never put
`data-platform-content-zoom-root` on pop-up content: the platform zooms every element that carries it.

---

## Contributions

Extensions contribute to Platform.Bible through JSON configuration files in `contributions/`:

### Settings (`settings.json`)

`settings.json` is an **array of setting groups**. Each group has a `label` and a
`properties` object keyed by `<extension>.<settingId>`:

```json
[
  {
    "label": "%settings_group_label%",
    "properties": {
      "extensionName.settingName": {
        "label": "%setting_label%",
        "default": "defaultValue"
      }
    }
  }
]
```

### Menus (`menus.json`)

The main menu is defined under a `"mainMenu"` object with `columns`, `groups`, and
an `items` **array**. Each item references a `group` and a `command` (there is no
`"mainMenu.file"` key):

```json
{
  "mainMenu": {
    "columns": {},
    "groups": {},
    "items": [
      {
        "label": "%item_label%",
        "localizeNotes": "Application main menu > Column > Item",
        "group": "groupName",
        "order": 1,
        "command": "extensionName.commandName"
      }
    ]
  }
}
```

### Localized Strings (`localizedStrings.json`)

The language map is nested under a `"localizedStrings"` key, alongside a sibling
`"metadata"` object (use `{}` when there is no metadata):

```json
{
  "metadata": {},
  "localizedStrings": {
    "en": {
      "%setting_label%": "My Setting",
      "%item_label%": "My Menu Item"
    }
  }
}
```

For complete contribution examples, see [Extension Development How-To Guide wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Development-'How-To'-Guide).

---

## Type Declarations

Declare shared types in `src/types/extension-name.d.ts`:

```typescript
declare module 'extension-name' {
  import type { DataProviderDataType, IDataProvider } from '@papi/core';

  export type MyDataTypes = {
    DataTypeName: DataProviderDataType<Selector, ReturnType, SetType>;
  };

  export type IMyProvider = IDataProvider<MyDataTypes>;
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'extensionName.commandName': (param: Type) => Promise<Result>;
  }

  export interface DataProviders {
    'extensionName.dataName': IMyProvider;
  }
}
```

---

## Running Extensions

Load extensions via command-line arguments:

```bash
# Load specific extension
platform-bible --extensions /path/to/extension

# Load from extension directory
platform-bible --extensionDirs /path/to/extensions/folder
```

---

## Merging Template Updates

Keep your extension synchronized with template improvements:

```bash
# One-time: Add template as remote
git remote add template https://github.com/paranext/paranext-extension-template.git

# Fetch and merge updates
git fetch template
git checkout main
git merge template/main --allow-unrelated-histories
```

**Important:** Never squash template merges—use normal merge to preserve git history.

For details, see [Merging Template Changes wiki](https://github.com/paranext/paranext-extension-template/wiki/Merging-Template-Changes-into-Your-Extension).

---

## Related Documentation

- [Extension Anatomy wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy)
- [PAPI wiki](https://github.com/paranext/paranext-extension-template/wiki/PAPI)
- [Extension Development How-To Guide wiki](https://github.com/paranext/paranext-extension-template/wiki/Extension-Development-'How-To'-Guide)
- [System Architecture wiki](https://github.com/paranext/paranext-extension-template/wiki/System-Architecture)
- [Security-Guide.md](Security-Guide.md) - Module restrictions and sandboxing
- [Code-Style-Guide.md](Code-Style-Guide.md) - Coding conventions
- [Paranext-Core-Patterns.md](Paranext-Core-Patterns.md) - Implementation patterns

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
| 1.1.0   | 2026-09-15 | Add "Content Zoom (experimental)" under WebViews — the `ContentZoomRoot` / `data-platform-content-zoom-root` opt-in, one root per zoom area, the no-root whole-view fallback, the zoomed-`getBoundingClientRect` vs unzoomed-`fontSize` caveat, the capture-phase rule for views owning Ctrl+wheel, and the Interface-Scaling / content-zoom terminology split. |
| 1.1.1   | 2026-09-18 | Note that a command palette, popover or context menu requested through `papi.overlays` follows the requesting pane's content scale automatically — nothing for the extension author to opt in. |
| 1.1.2   | 2026-09-21 | Note that a view mounting the Scripture editor inside a zoom area hands it that area's element (`EditorOptions.contextMenuContainer`) so the editor's right-click menu takes the area's zoom. |
| 1.1.3   | 2026-09-23 | Content zoom acts only on zoomable panes (declared by the platform, or rendering a marked element): an unmarked view is no longer scaled whole; document the "zoomable only while a marker is rendered" limitation for third-party views and Simple mode's menu-less non-zoomable tabs. |
| 1.1.4   | 2026-09-23 | Pop-ups stay at interface scale: replace "Pop-ups follow their area" and the `papi.overlays` scaling note with one rule; `ContentZoomAreaProvider`, the pop-up attribute and `EditorOptions.contextMenuContainer` are gone. |
| 1.1.5   | 2026-09-23 | "Content Zoom": mark the project text, not a content root — per-element markers sharing one id, `as="span"`, `ContentZoomTextProvider` / `useContentZoomTextProps`. |
