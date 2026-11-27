## Keep the Keyboard Shortcuts Catalog Current

Platform.Bible documents every keyboard shortcut used anywhere in the application — main process,
bundled extensions, and the `platform-bible-react` component library — in ONE curated catalog (there
is no automated scan; it is maintained by hand):

- **Single source of truth** → `src/shared/data/keyboard-shortcuts.data.ts` (types in
  `keyboard-shortcuts.model.ts`, checks in `keyboard-shortcuts.data.test.ts`)

It is shown on ONE page in the main Platform.Bible (core) Storybook: **Reference → Keyboard
shortcuts** (`src/stories/keyboard-shortcuts.mdx`), which holds both the per-OS display conventions
and the catalog, rendered by `KeyboardShortcutsCatalog`
(`src/stories/keyboard-shortcuts-catalog/keyboard-shortcuts-catalog.component.tsx`). The
`platform-bible-react` Storybook's `Guidelines/Keyboard shortcuts` page is only a pointer to it; do
not add content there.

### The rule

Whenever you **add, change, or remove** a keyboard handler — a `keydown`/`keyup`/`keypress`
listener, an `onKeyDown`/`onKeyDownCapture` prop, an Electron accelerator the app sets, a
`before-input-event` branch, a Lexical `KEY_DOWN_COMMAND` handler, or a `react-hotkeys-hook`
`useHotkeys` binding — add, update, or remove the matching `KeyboardShortcutEntry` in
`src/shared/data/keyboard-shortcuts.data.ts` as part of the same change, no matter which part of the
app (main process, extension, or component library) the handler lives in.

Keep each entry's `purpose`, `category`, `context`, per-OS `keys`, and `locations` (repo-relative
file paths) accurate. Use the per-OS display conventions on the **Reference → Keyboard shortcuts**
page (macOS symbols with no separator; Windows/Linux words joined with `+`).

What belongs in the catalog — only shortcuts the application itself defines:

- Every named shortcut (a chord, function key, or single key that triggers an action) that app code
  binds, including a menu item whose `accelerator` the app sets itself.
- Hand-rolled widget navigation — arrow/Home/End/Enter/Space/Escape handling this repo implements
  itself for a custom list, grid, tree or table — goes in the `Widget navigation` category.
- Electron, OS and browser defaults stay out — including the accelerators Electron supplies for a
  bare macOS menu `role` (Quit, Hide, Close, Reload, the Edit menu, Full Screen) — as do library
  defaults (Radix/cmdk arrow keys, a native button's Enter/Space, a Radix dialog's Escape) and
  handlers that bind no key of their own. Never add an entry from memory: cite the code that binds
  it in `locations`; when you deliberately leave
  one out, add a line to the page's **Not catalogued** section so it is not mistaken for an
  omission.

### Make shortcuts discoverable

An app-defined shortcut should nearly always be discoverable: shown as the shortcut hint on the
menu item that runs the same action (set the entry's `command`; see below), or in the tooltip of
the control it triggers (`Guidelines/Tooltips` → "Keyboard shortcuts in tooltips" in the
`platform-bible-react` Storybook). When you add a shortcut, add one of the two in the same change,
or say in the PR why neither fits. Hand-rolled widget navigation is exempt.

### Conflicts

When a new or changed chord overlaps another entry's chord in a context where both can be active —
one press reaches both handlers, or one shadows the other — record it in `conflicts` on **both**
entries, with a note saying what happens and which handler wins if known. The test fails on a
conflict that is not listed back. Before choosing a chord, search the catalog for it on all three
OS columns, and check it against the OS and Electron defaults (the macOS menu bar's ⌘Q, ⌘W, ⌘R and
Edit-menu chords, for example), which are not catalogued. The page shows conflicts as badges and in its
Conflicts section.

### Paratext 9 comparison

When `.context/research/paratext-9-features/` covers the action, set `paratext9` (`status`, the
Paratext 9 `keys`, a `note`, and the `source` file `§` section). Record only what that research
states — never a Paratext 9 chord from memory. A Paratext 9 shortcut with no counterpart goes in
`paratext9OnlyShortcuts`; when you add its counterpart, move it to that entry's `paratext9`.

### Menu shortcut hints

An entry's optional `command` is the PAPI command its chord runs. Menu items that run that command
show the chord as keycaps: the menu data service sets the hint string on the item, and the menu
renderers (`ShortcutKeys` from `platform-bible-react/experimental`) render it as one `Kbd` per key.

- Menus show only the first ` / ` alternative, so list first the one a menu should teach.
- Set `command` only if the chord works everywhere those items appear. Leave it unset for a chord
  the main process handles regardless of focus (open work: PT-4143), unless that handler runs this
  same command (the macOS View menu's content-zoom accelerators); leave it unset, too, for a chord
  that works only in some editor views.
- `src/shared/data/keyboard-shortcuts.data.test.ts` pins each `command`'s hint text and the menus
  that show it, so adding or reusing one needs a deliberate update: every entry with a `command`
  needs its own `EXPECTED_MENU_HINTS` row. It rejects a chord shared with
  a different main-process entry, and any main-process location of the entry's own except those
  `SAME_COMMAND_MAIN_PROCESS_LOCATIONS` lists for that entry id and its current `command` — a
  handler that runs the same command the menu item does. Adding an entry there is a deliberate
  decision, not a way to silence the check.
- A menu built in extension code rather than served by the menu data service gets no hint and
  cannot import this core-only catalog. Put the chord in `platform-bible-utils` next to the related
  constants, and have both the catalog entry's `keys` and the menu read it from there, so the two
  cannot drift (as of 2026-09, the Text Collection's zoom items and the `content-zoom-*` entries
  share `CONTENT_ZOOM_*_SHORTCUT` from `content-zoom.util.ts`).
