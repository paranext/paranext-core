# Storybook story guidelines (paranext-core root)

How to write Storybook stories for bundled-extension web views (and similar PAPI-coupled
components) in this repo so they behave like the real app. Read this before adding or editing a
`*.stories.tsx` under `extensions/src/**` or `src/**`.

> TL;DR: a story must be **fully interactive like the running app** — filters actually filter,
> search actually searches (and re-highlights), scope changes change the results, installs/saves
> transition through their states, and writes reflect in the UI. A story that only renders a fixed
> snapshot and ignores its own controls is a bug.

## The split

Each web view is split into three files:

1. **`<name>.component.tsx`** — presentational. Owns rendering and orchestration/derivation, but
   **no `@papi`**. Props = raw data + `localizedStrings` + operation callbacks (`on*`/`handle*`,
   `get*` for reads that depend on a value the component resolves, `show*` for in-app sub-UIs).
2. **`<name>.web-view.tsx`** — thin container: PAPI hooks/commands/PDPs → the component's props.
3. **`<name>.stories.tsx`** — a container backed by a **thin in-memory CRUD service** (seed
   `useState` + mutating callbacks) that stands in for PAPI.

Lift any child's internal `useLocalizedStrings` / `logger` / data hooks **up to the web view** so the
component (and everything a story imports) is `@papi`-free.

**Hard gate:** `npm run storybook:build` must pass. Storybook's webpack builder cannot resolve
`@papi/*`, so nothing reachable from a story may import it (directly or transitively).

## Where logic lives (the line the story must not cross)

A story may **only stand in for backend/data-layer behavior** — what PAPI does: queries, server-side
filtering, install/uninstall, server validation, persistence. It must **never contain UI logic**
(validation rules, enable/disable gating, display-state derivation). If a story needs UI behavior to
look right, that behavior is needed by the app too, so **put it in the presentational component** —
then the app and the story both get it for free, from one source.

Quick test: "Would the real web view compute this by calling PAPI, or is it client-side rendering
logic?"

- Client-side rule (format validation, "is the save button enabled", deriving display state from
  props) → **component**.
- Backend result (does the server accept this code, what rows match this query) → **story mock**.

> Cautionary example: the registration form's malformed-code hint and save-enabled gating were first
> reproduced in the story — wrong, that's UI logic. They were moved into `RegistrationFormView`
> (which derives them from its props), and the story was reduced to mocking only the backend
> `validateParatextRegistrationData` result. See `registration-form-view.component.tsx` /
> `.stories.tsx`.

## Make it interactive (the part that's easy to get wrong)

The presentational component usually renders **already-derived** data — the web view does the
filtering/searching/scoping via its **PAPI queries** (a data-layer concern) and feeds the component
the result. **The story harness must reproduce that data-layer behavior in-memory** (it's a backend
mock), not pass the raw seed straight through. This is distinct from UI logic, which belongs in the
component (see "Where logic lives" above) — the story mocks the _query/service_, never client-side
rules.

- **Filters / scope / search are controlled** → the harness holds the filter state AND derives the
  displayed data from it, mirroring the web view's **query** semantics (the data layer the web view
  would hit). Examples in this repo:
  - `comment-list.stories.tsx` — derives the visible threads from the comment/scope filters.
  - `checks-side-panel.stories.tsx` — derives `checkResults` from the selected check types + scope.
  - `find.stories.tsx` — a small in-memory search engine over a seed corpus; the term, match-case,
    word-restriction, regex, and scope all re-run the search and update the highlighting.
- **State transitions happen** → e.g. `get-resources.stories.tsx` flips a resource through
  installing (`idsBeingHandled`) → installed, and back for remove.
- **Writes reflect** → mutate the in-memory store immutably so reads re-render (approve/deny,
  add/edit/delete, replace-then-commit).
- **Lead with the populated state** → the first exported story shows data present; loading/empty/
  error come after.

## Callback conventions

| The real app action…                                  | In the story…                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------ |
| Opens a **completely different UI** (editor, dialog…) | `alertCommand('namespace.command', { args })` (announce, don't navigate) |
| Calls **another in-app UI component**                 | Wire the **real** component (e.g. render `ResourcePickerDialog` inline)  |
| **Saves/changes data** (the meaningful edits)         | Mutate the in-memory store so it reflects; add a failure story           |
| **Saves a setting** (passive config, e.g. text dir)   | `console.log` only                                                       |
| A **business** failure that already exists            | `rejectingMock('user-facing reason')` in a dedicated failure story       |

Use the shared helpers: `.storybook/story.utils.ts` (`alertCommand`, `rejectingMock`) and
`.storybook/localization.utils.ts` (`getLocalizedStrings` → real English strings). Keep the service
layer thin — CRUD-like mutation + only the error handling the web view already has. No new
validation, no "giant" mock backend.

## Panel background

`preview.ts` wraps every story in a full-height `tw:bg-background tw:text-foreground` surface so it
sits on the same panel color a web view occupies in an app dock. Don't fight this in a story.

## Editor (`Editorial`) stories

The `@eten-tech-foundation/platform-editor` editor needs styling the app loads globally but
Storybook does not. Without it the context menu is unstyled and the read-only marker toolbar shows
as a stray inline label (e.g. "p - Paragraph - Normal - First Line Indent"). In a story:

- Import `lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css` and
  `nodes-menu.css`.
- Inject the icon-free wrapper style (see `model-text-panel.stories.tsx` and
  `src/stories/platform/ten-layout-shared.tsx`); in particular `.editor-toolbar-container-readonly {
display: none; }`.
- **Do not** import `editor.css` / `editor-overrides.css` — they reference toolbar icon SVGs by
  absolute URL that the css-loader can't resolve, breaking the build.

Note: `usj-nodes.css` bare `table`/`td`/`rt` selectors are scoped to `.usfm` to avoid leaking table
borders into other stories — keep them scoped if you touch that file.

## A couple of footguns

- `Canon` is a **runtime value** from `@sillsdev/scripture`; `platform-bible-utils` re-exports it as
  a **type only**. Import `Canon` from `@sillsdev/scripture` or it's `undefined` at render
  (typechecks and builds, throws at runtime).
- Responsive components read the real window (e.g. the dictionary's drawer uses
  `matchMedia('(min-width: 1024px)')`). Storybook's canvas is wide, so width-dependent variants
  (like that drawer) won't appear unless the iframe itself is narrow.

## Verify before committing

1. Type check by running `npx tsc -p ./tsconfig.json` — clean.
2. ESLint on changed files — clean (prettier-format first).
3. `npm run storybook:build` — exit 0 (the real `@papi`-free gate).
4. Open each story and exercise it: filters/search/scope change the results, writes reflect,
   transitions run, the failure story shows its business error, and there are no runtime errors in
   the console.
5. Re-read the story diff for **UI logic that snuck in** (validation, enable/disable gating,
   display-state derivation). If you find any, move it into the component — the story should hold
   only data, backend mocks, and callback wiring (see "Where logic lives").
