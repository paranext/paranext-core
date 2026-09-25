## Keep the Keyboard Shortcuts Catalog Current

Platform.Bible documents every keyboard shortcut used anywhere in the application — main process,
bundled extensions, and the `platform-bible-react` component library — in ONE curated catalog (there
is no automated scan; it is maintained by hand):

- **Single source of truth** → `src/shared/data/keyboard-shortcuts.data.ts`

It is rendered by the `KeyboardShortcutsCatalog` component, which lives in the main Platform.Bible
Storybook at `src/stories/keyboard-shortcuts-catalog/keyboard-shortcuts-catalog.component.tsx`, on
the **Reference → Keyboard shortcuts** page.

### The rule

Whenever you **add, change, or remove** a keyboard handler — a `keydown`/`keyup`/`keypress`
listener, an Electron accelerator or `before-input-event` branch, or a `react-hotkeys-hook`
`useHotkeys` binding — add, update, or remove the matching `KeyboardShortcutEntry` in
`src/shared/data/keyboard-shortcuts.data.ts` as part of the same change, no matter which part of the app
(main process, extension, or component library) the handler lives in.

Keep each entry's `purpose`, `category`, `context`, per-OS `keys`, and `locations` (repo-relative
file paths) accurate. Use the per-OS display conventions documented in the
`Guidelines/Keyboard shortcuts` Storybook page (macOS symbols with no separator; Windows/Linux
words joined with `+`).

### Menu shortcut hints

An entry's optional `command` is the PAPI command its chord runs. Menu items that run that command
show the chord as keycaps: the menu data service sets the hint string on the item, and the menu
renderers (`ShortcutKeys` from `platform-bible-react`) render it as one `Kbd` per key.

- Menus show only the first ` / ` alternative, so list first the one a menu should teach.
- Set `command` only if the chord works everywhere those items appear. Leave it unset for a chord
  the main process handles regardless of focus (open work: PT-4143), unless that handler runs this
  same command (the macOS View menu's content-zoom accelerators); leave it unset, too, for a chord
  that works only in some editor views.
- `src/shared/data/keyboard-shortcuts.data.test.ts` pins each `command`'s hint text and the menus
  that show it, so adding or reusing one needs a deliberate update. It rejects a chord shared with
  a different main-process entry, and any main-process location of the entry's own except those
  listed for that entry in `SAME_COMMAND_MAIN_PROCESS_LOCATIONS` — a handler that runs the same
  command the menu item does. Adding an entry there is a deliberate decision, not a way to silence
  the check.
- A menu built in extension code rather than served by the menu data service gets no hint and
  cannot import this core-only catalog. Put the chord in `platform-bible-utils` next to the related
  constants, and have both the catalog entry's `keys` and the menu read it from there, so the two
  cannot drift (as of 2026-09, the Text Collection's zoom items and the `content-zoom-*` entries
  share `CONTENT_ZOOM_*_SHORTCUT` from `content-zoom.util.ts`).
