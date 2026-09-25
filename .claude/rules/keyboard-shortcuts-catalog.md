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
  the main process claims regardless of focus (open work: PT-4143) or one that works only in some
  editor views — unless the main-process handler runs the SAME command as the entry (e.g. the
  macOS View menu's content-zoom accelerators), in which case the hint cannot lie and `command`
  may still be set.
- `src/shared/data/keyboard-shortcuts.data.test.ts` pins each `command`'s hint text and the menus
  that show it, so adding or reusing one needs a deliberate update. It also rejects a chord shared
  with a DIFFERENT main-process entry; an entry's own main-process location is excluded from that
  check, since a handler running the entry's own command cannot make its hint lie.
- A menu built by hand rather than through the menu data service — one that runs a platform
  command directly without going through `command`/`shortcut` — cannot read this catalog either
  (core-only) and must restate its chord as a literal string instead. The Text Collection's zoom
  menu (`ZoomItemsShared` in `extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx`)
  is the one example today; `keyboard-shortcuts.data.test.ts` pins its restated strings against
  the catalog's `content-zoom-in/out/reset` entries, so keep both in sync by hand.
