## Keep the Keyboard Shortcuts Catalog Current

Platform.Bible documents every keyboard shortcut used anywhere in the application — main process,
bundled extensions, and the `platform-bible-react` component library — in ONE curated catalog (there
is no automated scan; it is maintained by hand):

- **Single source of truth** → `src/stories/keyboard-shortcuts.data.ts`

It is rendered by the shared `KeyboardShortcutsCatalog` component (exported from
`platform-bible-react`) on the **Reference → Keyboard shortcuts** page of the main Platform.Bible
Storybook.

### The rule

Whenever you **add, change, or remove** a keyboard handler — a `keydown`/`keyup`/`keypress`
listener, an Electron accelerator or `before-input-event` branch, or a `react-hotkeys-hook`
`useHotkeys` binding — add, update, or remove the matching `KeyboardShortcutEntry` in
`src/stories/keyboard-shortcuts.data.ts` as part of the same change, no matter which part of the app
(main process, extension, or component library) the handler lives in.

Keep each entry's `purpose`, `category`, `context`, per-OS `keys`, and `locations` (repo-relative
file paths) accurate. Use the per-OS display conventions documented in the
`Guidelines/Keyboard shortcuts` Storybook page (macOS symbols with no separator; Windows/Linux
words joined with `+`).
