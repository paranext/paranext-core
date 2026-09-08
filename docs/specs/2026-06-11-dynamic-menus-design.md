# Dynamic Menu System Design

- **Date**: 2026-06-11
- **Status**: Prototype implemented (June 2026); rebased onto `main` 2026-09-08, not yet merged
- **Branch**: `feat/dynamic-menus` (off `main`)

## Motivation

Menu contributions in Platform.Bible are static JSON documents. Extensions declare
columns, groups, and items in `contributions/menus.json`; the `MenuDocumentCombiner`
merges them with the platform base document; the `platform.menuDataServiceDataProvider`
serves the localized result; and the renderer (plus the macOS native menubar in the
main process) renders it. There is no way to show, hide, enable, disable, or check a
menu item based on application state.

Concrete demand already exists: the manage-books feature deferred its PT9
visibility/enable rules (DEF-UI-005 / FN-003) explicitly waiting on "menu.json
condition attributes that reference project/window state" — rules like _parent menu
visible when `fullProjectMenu && !isNoteType`_ and _Copy Books enabled when
`isEditable || hasEncodingConverter`_. VSCode solved the same problem with context
keys and when-clause expressions; this design adopts that model adapted to
Platform.Bible's multi-process, multi-tab architecture.

## Goals

1. Menu items can be dynamically **visible** (`when`), **enabled** (`enabledWhen`),
   and **checked** (`checkedWhen`) based on boolean expressions over named
   properties (context keys).
2. Context keys live in a single flat global store (the existing internal
   **shared-store** service), so menu evaluation is **synchronous** — no network
   calls when building a menu.
3. Scoping (per-project, per-web-view) is achieved by **key naming conventions plus
   template variables**, not rigid API scopes. Producers write natural state once,
   keyed by stable IDs; menu definitions reference it generically.
4. Evaluation is **reactive**: menus update live when context keys change.
5. Fully **backward compatible**: all new schema properties are optional; absent
   properties mean current static behavior.
6. Both TypeScript (extension host, renderer web views) and C# can produce context
   keys.

## Non-goals (v1)

- Dynamic labels (localization path stays untouched).
- Expressions on groups or columns (empty containers are pruned automatically
  instead).
- Extended operators (`=~`, `<`, `>`, `<=`, `>=`, `in`) — grammar reserves room.
- Frontend (web view) _reactive consumption_ of context keys (`onDidChange` is not
  exposed in `@papi/frontend` in v1).
- Keybinding/toolbar/view-visibility conditions — context keys are designed as a
  general mechanism (hence the non-menu-specific name) but menus are the only v1
  consumer.
- Caller-identity enforcement of key namespaces (see Ownership below).
- Wiring manage-books rules (feature is mid-merge; the scripture editor is the v1
  real-world consumer instead).

## Architecture Overview (Approach A: consumer-side evaluation)

```
producers                      store                       consumers
─────────                      ─────                       ─────────
extension host extensions ─┐
web views (frontend papi) ─┼─► papi.contextKeys ─► shared-store (in-memory,
C# data provider ──────────┘    (facade, prefix      synced to every process,
                                'contextKeys.')      Lamport clocks)
                                                          │ onDidChange
                                                          ▼
menus.json (when/enabledWhen/checkedWhen strings)    ┌─ renderer: useEvaluatedMenu
  └─► MenuDocumentCombiner (parse/validate at load)  ├─ main: macOS native menubar
  └─► menu data provider (document unchanged) ─────► └─ evaluate locally, sync,
                                                        re-evaluate on change
```

Expressions are parsed and validated **once at contribution load time**. The menu
document flows unchanged (with expression strings) through the existing data
provider. Each consumer surface evaluates locally and synchronously against its
in-process shared-store copy and re-evaluates on context-key change events.

Why consumer-side: zero added network traffic (shared-store already broadcasts each
change once); it is the only approach that supports per-instance scoping —
`getWebViewMenu(webViewType)` is keyed by _type_, but two tabs of the same type
showing different projects need different evaluation results, and only the consumer
knows which instance it is rendering; the menu document stays static and cacheable;
evaluation is a pure function shared by renderer and main process.

Rejected alternatives: producer-side evaluation in the menu data provider (network
chatter per context change, and per-instance scoping breaks against the
type-keyed provider API); shipping pre-parsed ASTs in the document (pollutes the
schema with an internal representation to save microseconds).

## Expression Grammar

```
expression  := orExpr
orExpr      := andExpr ( '||' andExpr )*
andExpr     := equality ( '&&' equality )*
equality    := unary ( ( '==' | '!=' ) unary )?
unary       := '!' unary | primary
primary     := '(' expression ')' | literal | propertyRef
literal     := 'true' | 'false' | number | sqString     // e.g. 'formatted'
propertyRef := segment ( '.' segment )+                 // min 2 segments
segment     := identifier | '{' identifier '}'          // {x} = template variable
```

- Precedence: `!` > `==`/`!=` > `&&` > `||`; parentheses override. Matches VSCode.
- Strings are single-quoted (JSON-friendly). No escape sequences in v1 — a string
  literal cannot contain a single quote. Numbers are JSON-style numerics.
- Equality is strict (`===` semantics after evaluation). Both sides of `==`/`!=`
  may be property refs or literals.
- A bare property ref is a truthiness test: `undefined`, `false`, `0`, and `''`
  are falsy; everything else truthy.
- Whitespace insignificant between tokens.

### Template variables

Property refs may contain `{placeholder}` segments expanded from the menu's
**evaluation context** before key lookup:

| Surface                                | Available variables                           |
| -------------------------------------- | --------------------------------------------- |
| Web view top menu and context menu     | `{webViewId}`, `{webViewType}`, `{projectId}` |
| Main menu (incl. macOS native menubar) | none in v1 — global keys only                 |

- If a placeholder has no value at evaluation time (e.g. a web view without a
  project), the entire property ref evaluates to `undefined` (falsy).
- Unknown placeholder _names_ are a **load-time validation error**, including any
  placeholder appearing in a `mainMenu` expression. This catches typos and
  misplaced scoped expressions early.

### Semantics summary

| Property      | Absent means   | Expression result false/undefined | Expression result truthy |
| ------------- | -------------- | --------------------------------- | ------------------------ |
| `when`        | always visible | item hidden                       | item visible             |
| `enabledWhen` | always enabled | item disabled (greyed)            | item enabled             |
| `checkedWhen` | plain item     | checkbox item, unchecked          | checkbox item, checked   |

## Schema Changes (`lib/platform-bible-utils/src/extension-contributions/menus.model.ts`)

All optional; fully backward compatible:

```ts
type MenuItemBase = OrderedItem & {
  // ... existing fields ...
  /** When-expression controlling visibility. Absent = always visible. */
  when?: string;
  /** When-expression controlling enabled state. Absent = always enabled. */
  enabledWhen?: string;
};

type MenuItemContainingCommand = MenuItemBase & {
  // ... existing fields ...
  /**
   * When-expression controlling the checkmark. Presence makes this item render as a checkbox-style
   * item. Absent = plain item.
   */
  checkedWhen?: string;
};
```

- `when`/`enabledWhen` apply to both command items and submenu items (a disabled
  submenu cannot open).
- `checkedWhen` applies only to command items.
- Groups and columns do **not** take expressions in v1. Instead, after evaluation
  the consumer **prunes empty containers**: a group with no visible items renders
  no separator; a submenu item whose submenu has no visible items is hidden; a
  column with no visible groups is hidden.
- The AJV `menuDocumentSchema` gains the three optional string properties.

## Context Keys

### Store and key model

- Single flat global namespace stored in the existing **shared-store** service
  under the reserved prefix `contextKeys.` (the prefix is internal; API callers
  use unprefixed keys).
- Key format: dot-separated identifier segments, minimum 2 (e.g.
  `platformScripture.project.abc123.isEditable`). Validated on `set`.
- Value type: `string | number | boolean` only — no objects/arrays. Keeps equality
  semantics trivial and discourages dumping arbitrary state into a UI-condition
  store. `remove` sets the value to `undefined` (shared-store semantics — keys are
  never deleted, avoiding recreate races).
- Recommended naming convention: `extensionName.scope.{scopeId}.property` for
  scoped state (e.g. `platformScriptureEditor.webView.<id>.isEditable`) and
  `extensionName.property` for globals. `platform.` is reserved for the platform.

### Ownership

- Shared-store's existing first-writer-wins **process** ownership applies: a key
  produced in one process cannot be overwritten from another. UI-toggle state
  naturally lives in the renderer; project state in the extension host or C#.
- Within a process (all extensions share the extension host; all web views share
  the renderer), protection is **by convention**: first key segment should be your
  extension's name, and **each key has exactly one producer**. The service
  validates key _format_ only. VSCode's `setContext` likewise has no identity
  enforcement. `ExecutionToken`-based enforcement (as `papi.storage` uses) can be
  added later if abuse materializes; it was rejected for v1 on ergonomic grounds.

### TypeScript service (`src/shared/services/context-keys.service.ts`)

```ts
// Defined in platform-bible-utils (the dependency-free evaluation engine needs
// it); re-exported here and through PAPI.
type ContextKeyValue = string | number | boolean;

const contextKeysService = {
  /** Set or update a context key. Throws on invalid key format or value type. */
  set(key: string, value: ContextKeyValue): void;
  get(key: string): ContextKeyValue | undefined;
  /** Sets the key's value to undefined. */
  remove(key: string): void;
  /** Fires on any context key change, local or remote. */
  onDidChange: PlatformEvent<{ key: string; value: ContextKeyValue | undefined }>;
};
```

Supporting changes to shared-store (which stays platform-internal):

1. `SharedStoreValues` gains an index entry for `` `contextKeys.${string}` `` with
   value type `ContextKeyValue | undefined`.
2. Shared-store exposes a platform-internal `onDidChange` event. It already
   receives every change over the network and applies it silently; this surfaces
   those changes (and local `set`s) to in-process subscribers. This event is the
   foundation of reactive menu re-evaluation.

### PAPI exposure

- `papi.contextKeys` exposed in **`@papi/backend`** (extension host) and
  **`@papi/frontend`** (web views) with `set` / `remove` / `get`. Producers need
  `get` to toggle their own values.
- The frontend API **omits `onDidChange`** in v1 to discourage web views consuming
  context keys as a general reactive state bus — menus consume on their behalf.
  Trivial to add later if a legitimate need appears.
- Renderer and main-process platform code use `contextKeysService` from
  `src/shared` directly, like other shared services.

### C# wrapper (`c-sharp/Services/ContextKeysService.cs`)

Mirror of the TS facade over the existing C# `SharedStore`: same `contextKeys.`
prefix, same key-format validation, same constrained value types. NUnit tests
included. No C# producer is wired in v1 (manage-books will be the first,
post-merge); this is infrastructure so the .NET data provider can publish
project-state keys without waiting on another platform PR.

## Evaluation Engine (`lib/platform-bible-utils`)

Pure, dependency-free module usable from renderer, main process, extension host,
and tests:

```ts
/** Parses a when-expression. Throws a descriptive error on invalid syntax. */
parseWhenExpression(expression: string): WhenExpressionAst;

/** Evaluates a when-expression. Parse results are memoized by expression string. */
evaluateWhenExpression(
  expression: string,
  getContextKey: (key: string) => ContextKeyValue | undefined,
  templateVars: Record<string, string | undefined>,
): boolean;

/**
 * Evaluates all expressions in a menu document. Works on MultiColumnMenu and
 * SingleColumnMenu, localized or not. Removes hidden items, prunes empty
 * groups/submenus/columns, decorates remaining items with
 * `disabled?: boolean` / `checked?: boolean`, and strips expression fields.
 */
evaluateMenu(menuDocument, getContextKey, templateVars): EvaluatedMenu;
```

## Load-Time Validation (`MenuDocumentCombiner`)

Contribution validation parses every `when` / `enabledWhen` / `checkedWhen`:

- Syntax errors reject that extension's contribution with a logged error — the
  same failure mode as today's invalid contributions.
- Placeholder names are validated per surface: `mainMenu` expressions may use
  none; `webViewMenus` (and default web view menus) may use `webViewId`,
  `webViewType`, `projectId`.

## Consumer Integration

| Surface                                                                       | Change                                                                                                                                                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New renderer hook `useEvaluatedMenu(menuData, templateVars)` (`src/renderer`) | Subscribes to `contextKeysService.onDidChange`; re-evaluates (memoized) and triggers re-render                                                                                                      |
| `platform-bible-toolbar.tsx` (main menu)                                      | Wraps menu data with the hook; vars = `{}`                                                                                                                                                          |
| `web-view.component.tsx` (web view top + context menus)                       | Hook with `{webViewId, webViewType, projectId}` from the web view definition                                                                                                                        |
| `PlatformMenubar` / `TabDropdownMenu` (`lib/platform-bible-react`)            | Render `disabled` (Radix prop) and `checked` (CheckboxItem variants). Components stay dumb — they receive pre-evaluated data. Storybook stories updated                                             |
| macOS native menubar (`src/main/platform-macos-menubar.util.ts`)              | Already rebuilds on menu-document updates; additionally rebuilds on `onDidChange`, mapping hidden → omitted item, `enabled` prop, checkbox item type. Main process already initializes shared-store |

Open menus update live: a context-key change re-renders the Radix menu content
while it is open.

## Real-World Wiring: Scripture Editor

The v1 proof-of-mechanism (replacing the originally-considered manage-books wiring,
which is mid-merge):

- `enabledWhen: "platformScriptureEditor.webView.{webViewId}.isEditable"` on the
  three insert-at-selection items (footnote, cross-reference, comment) in
  `extensions/src/platform-scripture-editor/contributions/menus.json`. Produced by
  the **extension host** (`main.ts` knows `isReadOnly` at web view
  creation/update).
- `checkedWhen: "platformScriptureEditor.webView.{webViewId}.footnotesPaneVisible"`
  on the Show Footnotes item. Produced by the **web view itself** via frontend
  `papi.contextKeys` (the visibility state lives in the web view component).
- Keys are removed on web view disposal.

This exercises backend production, frontend production, `{webViewId}` template
substitution, `enabledWhen`, and `checkedWhen` in one feature.

## Error Handling

- **Load time**: malformed expressions or unknown placeholders reject the
  contribution (logged).
- **Evaluation time** (rare — expressions are load-validated): fail safe per
  expression with one logged error: `when` → hidden, `enabledWhen` → disabled,
  `checkedWhen` → unchecked.
- **Startup race**: keys referenced before a producer publishes are `undefined` →
  falsy → items hidden/disabled until the key arrives. Producers should publish as
  early as natural (e.g. on web view creation). Documented behavior, not a bug.
- **Stale keys**: if a producer process dies, its keys remain at their last value
  until the producer re-publishes on restart. Context keys are ephemeral
  (in-memory, never persisted).
- **`set` with invalid key format or non-scalar value**: throws.

## Testing

- **platform-bible-utils** (vitest): parser (precedence, literals, template
  segments, syntax errors), evaluator (truthiness, `==`/`!=`, missing keys,
  missing vars), `evaluateMenu` (filtering, pruning, decoration).
- **MenuDocumentCombiner** (vitest): expression validation accept/reject cases,
  per-surface placeholder rules.
- **contextKeys service** (vitest): key-format validation, set/get/remove, change
  events — mirroring `shared-store.service.test.ts` patterns.
- **C#** (NUnit): `ContextKeysService` over `SharedStore`.
- **platform-bible-react**: component tests + Storybook stories for
  disabled/checked items.
- **Stretch**: one e2e smoke test (read-only editor → insert items disabled) in
  `e2e-tests/`.

Documentation is JSDoc-driven (papi docs are auto-generated); the `menus.model.ts`
JSDoc documents the grammar and key conventions. A `.context` standards write-up is
an ai-prompts follow-up, out of scope for this branch.

## Future Work

- Extended operators: `=~`, `<`, `>`, `<=`, `>=`, `in`.
- `onDidChange` in `@papi/frontend` if reactive frontend consumption proves useful.
- `ExecutionToken`-based key-namespace enforcement if convention proves
  insufficient.
- Context keys for keybindings, toolbars, and view visibility (the mechanism is
  deliberately general).
- Main-menu evaluation context (e.g. an `{activeProjectId}` notion) if a consumer
  needs it.
- Wire manage-books DEF-UI-005 rules once that feature settles on `main` (first C#
  producer).
- A `@papi/frontend/react` hook (e.g. `useEvaluatedWebViewMenu`) backed by a frontend
  `onDidChange` so self-rendering web views get reactive evaluation without manual
  dependency tracking (see Implementation Deviations #1).
- Shared-store ownership release or takeover on process restart, so extension-host
  hot-reload in dev does not orphan keys (see Implementation Deviations #2).

## Implementation Deviations (discovered during build)

1. **Self-rendered web view toolbars evaluate their own menus.** Web views that set
   `shouldShowToolbar: false` (e.g. the scripture editor) render their top menu inside the
   iframe, so the platform's renderer-side evaluation (`useEvaluatedMenu` in
   `web-view.component.tsx`) never touches it. v1 resolution: such web views evaluate their
   own menu with `evaluateMenu` + `papi.contextKeys.get`, re-evaluating on a version counter
   that the effects publishing its own keys bump after writing the store (the frontend
   deliberately has no `onDidChange`). Keying the evaluation on the React state itself reads
   the store before the write lands and shows the previous value. See the comment in
   `platform-scripture-editor.web-view.tsx`.
2. **Extension-host hot-reload vs key ownership.** Shared-store ownership is keyed to a
   random per-process ID minted at startup. When the extension host restarts without a full
   app restart (dev hot-reload), it gets a new process ID and can no longer update keys
   owned by its previous incarnation (the failed sets are logged). This is a pre-existing
   shared-store property affecting all its keys (e.g. network timeouts), but context keys
   make it visible in dev. A full app restart clears the store.
3. **Doc locations.** This spec and the implementation plan live in `docs/specs/` and
   `docs/plans/` (the repo's tracked convention) rather than `docs/superpowers/`
   (gitignored).
4. **Tab menus (added to `main` after the prototype).** Every tab now has a tab menu
   (`defaultWebViewTabMenu` / `webViewMenus.*.tabMenu`), rendered by the tab title from a
   one-shot read at mount. Its expressions are validated at load with `{webViewId}` and
   `{webViewType}` only (a tab acts on its frame, not on project content, so there is no
   `{projectId}`), and evaluated once with that read: visibility only, not live. Its
   move-to-window submenu has no items in the document (the window list is filled at open time),
   so `evaluateMenu` prunes only containers that evaluation emptied, never ones empty by
   construction. `main` also
   gained `hiddenInterfaceModes` (PR #2602), a producer-side per-interface-mode filter in the
   menu data provider; it is orthogonal to when-expressions and both apply.

## Decision Log

| Decision             | Choice                                                                     | Alternatives considered                                                                                                   |
| -------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Dynamic aspects      | Visibility, enablement, checked state                                      | Dynamic labels (rejected: complicates localization)                                                                       |
| Grammar              | VSCode-style expression strings                                            | Structured JSON operation trees; bare property refs only                                                                  |
| Scoping              | Flat global store + key naming convention + template vars in property refs | Rigid per-web-view/per-project API scopes; global-only VSCode model                                                       |
| Write API            | `papi.contextKeys` facade over shared-store                                | Exposing shared-store directly in PAPI; platform-internal only                                                            |
| Facade name          | `contextKeys` (general — VSCode terminology; menus are one consumer)       | `menuContext` (rejected: misleading), `uiContext`, `appState`                                                             |
| Frontend production  | `set`/`remove`/`get` in `@papi/frontend`; no `onDidChange`                 | Backend-only (rejected: forces unnatural backend round-trip for UI state)                                                 |
| Evaluation location  | Consumer-side (renderer + main), synchronous against local store copy      | Producer-side in menu data provider (rejected: network chatter; breaks per-instance scoping); pre-parsed ASTs in document |
| Namespace protection | Format validation + convention                                             | ExecutionToken enforcement (deferred)                                                                                     |
| v1 real consumer     | platform-scripture-editor (insert items + footnotes toggle)                | manage-books (rejected for v1: mid-merge from ai/main to main)                                                            |
