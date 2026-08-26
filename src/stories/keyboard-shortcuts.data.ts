import { KeyboardShortcutEntry } from './keyboard-shortcuts-catalog/keyboard-shortcuts-catalog.component';

/**
 * The complete catalog of keyboard shortcuts used across the entire Platform.Bible application:
 * shortcuts handled in the Electron main process, shortcuts defined by bundled extensions, and
 * shortcuts defined inside the shared `platform-bible-react` component library. This is the single
 * source of truth — when you add, change, or remove any keyboard handler anywhere in the app,
 * update the matching entry here.
 *
 * Note on macOS modifier order: the `Guidelines/Keyboard shortcuts` page documents the macOS
 * display order as Control, Option, Shift, Command. A few entries intentionally deviate and show
 * Command before Option (`⌘⌥…`) because their `keys` mirror the modifier order written in the code
 * that handles them (`next-tab-group`, `previous-tab-group`, `scripture-insert-comment`). These are
 * raw `keydown` handlers, not OS-rendered menu accelerators, so the chord is identical regardless
 * of display order; the entries are kept in code order so they read the same as the handler
 * source.
 */
export const rootKeyboardShortcuts: KeyboardShortcutEntry[] = [
  {
    id: 'next-tab',
    purpose: 'Switch to the next tab in the window that received the keypress',
    category: 'Navigation',
    // Registered per window (each window's webContents gets its own before-input-event listener)
    // and acts only on that window's own tabs, not app-wide.
    context: 'Main process (per window)',
    keys: { macOS: '⌃⇥ / ⌘⇧]', windows: 'Ctrl+Tab', linux: 'Ctrl+Tab' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'previous-tab',
    purpose: 'Switch to the previous tab in the window that received the keypress',
    category: 'Navigation',
    // Registered per window (each window's webContents gets its own before-input-event listener)
    // and acts only on that window's own tabs, not app-wide.
    context: 'Main process (per window)',
    keys: { macOS: '⌃⇧⇥ / ⌘⇧[', windows: 'Ctrl+Shift+Tab', linux: 'Ctrl+Shift+Tab' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'next-tab-group',
    purpose: 'Switch to the next tab group in the window that received the keypress',
    category: 'Navigation',
    // Registered per window (each window's webContents gets its own before-input-event listener)
    // and acts only on that window's own tab groups, not app-wide.
    // macOS combo mirrors code order (`input.meta && input.alt`); see file note on modifier order
    context: 'Main process (per window)',
    keys: { macOS: '⌘⌥↓', windows: 'Ctrl+PageDown', linux: 'Ctrl+PageDown' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'previous-tab-group',
    purpose: 'Switch to the previous tab group in the window that received the keypress',
    category: 'Navigation',
    // Registered per window (each window's webContents gets its own before-input-event listener)
    // and acts only on that window's own tab groups, not app-wide.
    // macOS combo mirrors code order (`input.meta && input.alt`); see file note on modifier order
    context: 'Main process (per window)',
    keys: { macOS: '⌘⌥↑', windows: 'Ctrl+PageUp', linux: 'Ctrl+PageUp' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'go-to-next-chapter',
    purpose: 'Go to the next chapter in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: 'F8', windows: 'F8', linux: 'F8' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'go-to-previous-chapter',
    purpose: 'Go to the previous chapter in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌘F8', windows: 'Ctrl+F8', linux: 'Ctrl+F8' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'go-to-next-book',
    purpose: 'Go to the next book in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: 'F9', windows: 'F9', linux: 'F9' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'go-to-previous-book',
    purpose: 'Go to the previous book in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌘F9', windows: 'Ctrl+F9', linux: 'Ctrl+F9' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'go-to-next-verse',
    purpose: 'Go to the next verse in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌘↓', windows: 'Ctrl+↓', linux: 'Ctrl+↓' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'go-to-previous-verse',
    purpose: 'Go to the previous verse in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌘↑', windows: 'Ctrl+↑', linux: 'Ctrl+↑' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'open-book-chapter-control',
    purpose: 'Open the Book Chapter Control ready to type a reference',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌘B', windows: 'Ctrl+B', linux: 'Ctrl+B' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'reference-history-back',
    purpose: 'Go back one Scripture reference in the active scroll group’s history',
    category: 'Navigation',
    context: 'Main process (global)',
    // In RTL the back/forward pairs swap meaning (physical-direction-preserving, like Paratext 9)
    keys: { macOS: '⌘[', windows: 'Alt+←', linux: 'Alt+←' },
    locations: ['src/main/main.ts', 'src/main/reference-history-keyboard.util.ts'],
  },
  {
    id: 'reference-history-forward',
    purpose: 'Go forward one Scripture reference in the active scroll group’s history',
    category: 'Navigation',
    context: 'Main process (global)',
    // In RTL the back/forward pairs swap meaning (physical-direction-preserving, like Paratext 9)
    keys: { macOS: '⌘]', windows: 'Alt+→', linux: 'Alt+→' },
    locations: ['src/main/main.ts', 'src/main/reference-history-keyboard.util.ts'],
  },
  {
    id: 'focus-notification-toasts',
    purpose: 'Focus the notification toasts, cycling across position groups on repeated presses',
    category: 'Navigation',
    context: 'Renderer (global)',
    // Sonner's built-in Toaster hotkey and NotificationDisplay's focus-cycling handler share this
    // combo (NOTIFICATION_TOASTER_HOTKEY) - they must not drift apart.
    keys: { macOS: '⌥T', windows: 'Alt+T', linux: 'Alt+T' },
    locations: ['src/renderer/components/notification-display.tsx'],
  },
  {
    id: 'zoom-in',
    purpose: 'Zoom in',
    category: 'Zoom',
    context: 'Main process (global)',
    keys: { macOS: '⌘+', windows: 'Ctrl++', linux: 'Ctrl++' },
    locations: ['src/main/main.ts', 'src/main/platform-macos-menubar.data.ts'],
  },
  {
    id: 'zoom-out',
    purpose: 'Zoom out',
    category: 'Zoom',
    context: 'Main process (global)',
    keys: { macOS: '⌘-', windows: 'Ctrl+-', linux: 'Ctrl+-' },
    locations: ['src/main/main.ts', 'src/main/platform-macos-menubar.data.ts'],
  },
  {
    id: 'reset-zoom',
    purpose: 'Reset zoom to default',
    category: 'Zoom',
    context: 'Main process (global)',
    keys: { macOS: '⌘0', windows: 'Ctrl+0', linux: 'Ctrl+0' },
    locations: ['src/main/main.ts', 'src/main/platform-macos-menubar.data.ts'],
  },
  {
    id: 'dismiss-overlays',
    purpose:
      'Dismiss the topmost open overlay — a context menu, command palette, or popover (works in every frame, including web views)',
    category: 'Menus',
    context: 'Main process (global)',
    // Announced without preventDefault, so the focused frame still receives Escape and may act on
    // it too — e.g. the scripture editor's marker palette closes its own session. Only the bare,
    // initial press announces: a modified Escape (Shift/Ctrl/Alt/Meta) or an auto-repeat tick of a
    // held Escape is not the dismissal gesture. A modal dialog on top is left to its own shell,
    // and a focused command palette also answers Escape through its own keydown handler.
    keys: { macOS: '⎋', windows: 'Esc', linux: 'Esc' },
    locations: [
      'src/main/main.ts',
      'src/main/app-window-input.util.ts',
      'src/renderer/services/overlays/overlay.service-host.ts',
      'src/renderer/components/overlays/overlay-command-palette.component.tsx',
    ],
  },
  {
    id: 'dev-tools',
    purpose: 'Open developer tools',
    category: 'Developer',
    context: 'Main process (global)',
    keys: { macOS: 'F12', windows: 'F12', linux: 'F12' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'scripture-markers-menu',
    purpose: 'Open the inline markers menu',
    category: 'Editing',
    context: 'Scripture editor web view',
    keys: { macOS: '\\', windows: '\\', linux: '\\' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
      'lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts',
    ],
  },
  {
    id: 'scripture-markers-menu-commit-typed',
    purpose: 'Commit the marker typed in the markers menu',
    category: 'Editing',
    context:
      'Scripture editor web view (main text or the footnote editor popover), while the markers menu is open',
    // Space commits what was TYPED, not the highlighted entry: at a collapsed caret it materializes
    // the typed marker; over a selection it wraps only on an exact (case-insensitive) match and
    // otherwise closes without touching the selection. (The Enter-triggered paragraph menu is a
    // focused palette the forwarding table does not drive; its Space behavior is the overlay
    // input's own.)
    keys: { macOS: '␣', windows: 'Space', linux: 'Space' },
    locations: ['lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts'],
  },
  {
    id: 'scripture-markers-menu-commit-highlighted',
    purpose: 'Commit the highlighted entry in the markers menu',
    category: 'Editing',
    context:
      'Scripture editor web view (main text or the footnote editor popover), while the markers menu is open',
    // Enter and Tab are one commit gesture, matching the editor package's own menus. Over a
    // zero-match filter both are claimed no-ops (PT9 parity — the menu stays open). Enter also
    // commits the Enter-triggered paragraph menu — normally through the overlay's own input, and
    // through the forwarding table during the frames before that input wins focus, so an
    // Enter-Enter cannot reach the document.
    keys: { macOS: '⏎ / ⇥', windows: 'Enter / Tab', linux: 'Enter / Tab' },
    locations: ['lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts'],
  },
  {
    id: 'scripture-markers-menu-filter',
    purpose: 'Move the highlight and widen or narrow the typed filter in the markers menu',
    category: 'Editing',
    context:
      'Scripture editor web view (main text or the footnote editor popover), while the markers menu is open',
    // Arrow keys move the highlighted entry; Backspace widens the typed filter, or closes the
    // menu when nothing is typed. Marker characters (letters, digits, `+`, `-`) narrow it.
    keys: {
      macOS: '↑ / ↓ / ⌫',
      windows: 'Up / Down / Backspace',
      linux: 'Up / Down / Backspace',
    },
    locations: ['lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts'],
  },
  {
    id: 'scripture-markers-menu-commit-closing-marker',
    purpose: 'Commit a closing marker from the markers menu',
    category: 'Editing',
    context:
      'Scripture editor web view (main text or the footnote editor popover), while the markers menu is open',
    // The counterpart to Space's opening-marker commit: commits the typed marker's closing form
    // with no terminating space. Over a non-collapsed selection the selected content is replaced,
    // which is what typing a closing marker by hand has always done. Not offered in the
    // Enter-triggered paragraph menu.
    keys: { macOS: '*', windows: '*', linux: '*' },
    locations: ['lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts'],
  },
  {
    id: 'scripture-markers-menu-commit-and-reopen',
    purpose: 'Commit the typed marker and immediately open the markers menu again',
    category: 'Editing',
    context:
      'Scripture editor web view (main text or the footnote editor popover), while the markers menu is open',
    // Commits like Space but without the terminating space, then reopens for the backslash just
    // pressed, so a paired marker is one continuous flow. With nothing typed there is nothing to
    // commit and the backslash lands as an ordinary character.
    keys: { macOS: '\\', windows: '\\', linux: '\\' },
    locations: ['lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts'],
  },
  {
    id: 'scripture-close-markers-menu',
    purpose: 'Close the inline markers menu',
    category: 'Editing',
    context: 'Scripture editor web view',
    keys: { macOS: '⎋', windows: 'Esc', linux: 'Esc' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
      'lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts',
    ],
  },
  {
    id: 'scripture-find',
    purpose:
      'Bring Find to the front and put the caret in its search box — a permanent tab in Simple mode, a panel beside the editor in Power mode. Pre-fills the search box with the editor selection, if any',
    category: 'Navigation',
    context:
      'Scripture editor, model text, Bible text, commentary, and Text Collection web views. ' +
      'In Text Collection it searches the resource holding the caret; in the reference panels, the ' +
      'displayed resource. Does nothing (logged) until a scripture is resolved.',
    // macOS intentionally uses ⌃F (not the usual ⌘F). One shared hook holds the handler; the next
    // entries are the web views that mount it, and the last is the command they invoke.
    keys: { macOS: '⌃F', windows: 'Ctrl+F', linux: 'Ctrl+F' },
    locations: [
      'extensions/src/platform-scripture-editor/src/use-open-find-shortcut.hook.ts',
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
      'extensions/src/platform-scripture-editor/src/model-text-panel.web-view.tsx',
      'extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx',
      'extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx',
      'extensions/src/platform-scripture/src/main.ts',
      'extensions/src/platform-scripture/src/find/use-focus-search-on-invoke.hook.ts',
    ],
  },
  {
    id: 'scripture-insert-comment',
    purpose: 'Insert a comment at the selection',
    category: 'Editing',
    context: 'Scripture editor web view',
    // macOS combo mirrors code order (`event.metaKey && event.altKey`); see file note on modifier order
    keys: {
      macOS: '⌘⌥M',
      windows: 'Ctrl+Alt+M / Ctrl+Shift+N',
      linux: 'Ctrl+Alt+M / Ctrl+Shift+N',
    },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    ],
  },
  {
    id: 'scripture-insert-footnote',
    purpose: 'Insert a footnote at the selection (Standard view, editable)',
    category: 'Editing',
    context: 'Scripture editor web view',
    // macOS intentionally uses ⌃T (not ⌘T) to match the handler in
    // platform-scripture-editor.web-view.tsx (`event.ctrlKey`), like the find dialog's ⌃F.
    keys: { macOS: '⌃T', windows: 'Ctrl+T', linux: 'Ctrl+T' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    ],
  },
  {
    id: 'scripture-insert-cross-reference',
    purpose: 'Insert a cross-reference at the selection (Standard view, editable)',
    category: 'Editing',
    context: 'Scripture editor web view',
    // macOS intentionally uses ⌃⇧T (not ⌘⇧T) to match the handler in
    // platform-scripture-editor.web-view.tsx (`event.ctrlKey`), like the find dialog's ⌃F.
    keys: { macOS: '⌃⇧T', windows: 'Ctrl+Shift+T', linux: 'Ctrl+Shift+T' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    ],
  },
  {
    id: 'scripture-remove-character-formatting',
    purpose: 'Remove character formatting from the selection',
    category: 'Editing',
    // Handled inside the editor library that ships as the `@eten-tech-foundation/platform-editor`
    // package (its `MarkerEditPlugin` claims the chord from a `KEY_DOWN_COMMAND` handler that
    // requires Ctrl with no Alt/Shift/Meta, and acts only when there is a selection to unformat),
    // so there is no handler file in this repo to link. `locations` names the web view that mounts
    // that editor — the nearest in-repo code — because the field renders as links into
    // paranext-core and a path in another repo would not resolve.
    context:
      'Scripture editor web view (handled by the @eten-tech-foundation/platform-editor package)',
    // ⌃Space on macOS, deliberately not ⌘Space, which is Spotlight. ⌃ also keeps this consistent
    // with the editor's other in-web-view chords (⌃F, ⌃T, ⌃⇧T). ⌃Space can still collide with the
    // macOS input-source switcher and with some IME on/off toggles.
    keys: { macOS: '⌃Space', windows: 'Ctrl+Space', linux: 'Ctrl+Space' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    ],
  },
  {
    id: 'scripture-paragraph-markers-menu',
    purpose:
      'In Standard view, open the paragraph markers menu to split the paragraph. In other views, creates a new paragraph marker whose style matches the current paragraph marker style.',
    category: 'Editing',
    context: 'Scripture editor web view',
    // Enter is claimed in EVERY modifier state, matching PT9's KeyPressEditHandler (no modifier
    // check): any modifier chord with Enter — including Shift+Enter, which would otherwise insert
    // a soft line break with no USFM representation — opens the same menu.
    keys: { macOS: '⏎', windows: 'Enter', linux: 'Enter' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    ],
  },
  // The editor's arrow-key caret movement (verse hops, note boundaries, the two caret stops
  // around an \fp span's rendered line break — all in the scripture-editors repo's
  // ArrowNavigationPlugin) is deliberately NOT cataloged: arrow keys moving the caret in a
  // natural way is expected editor behavior, not a keyboard shortcut.
  {
    id: 'scripture-text-grid-open-chapter-context',
    purpose: 'Open the chapter-context view for the focused cell',
    category: 'View',
    context: 'Scripture Text Grid web view',
    keys: { macOS: '⏎ / ␣', windows: 'Enter / Space', linux: 'Enter / Space' },
    locations: [
      'extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.tsx',
    ],
  },
  {
    id: 'scripture-text-grid-move-between-cells',
    purpose: 'Move to the next or previous cell in the Scripture Text Grid',
    category: 'Navigation',
    context: 'Scripture Text Grid web view',
    keys: { macOS: '⇥ / ⇧⇥', windows: 'Tab / Shift+Tab', linux: 'Tab / Shift+Tab' },
    locations: [
      'extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.tsx',
    ],
  },
  {
    id: 'scripture-text-grid-close-chapter-context',
    purpose: 'Close the chapter-context view',
    category: 'View',
    context: 'Scripture Text Grid web view',
    keys: { macOS: '⎋', windows: 'Esc', linux: 'Esc' },
    locations: ['extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx'],
  },
  {
    id: 'scripture-text-grid-reorder-cell',
    purpose:
      'Reorder the focused Scripture Text Grid cell one position (verse view: up/down; chapter view: left/right)',
    category: 'View',
    context: 'Scripture Text Grid web view',
    keys: {
      macOS: '↑ / ↓ / ← / →',
      windows: 'Up Arrow / Down Arrow / Left Arrow / Right Arrow',
      linux: 'Up Arrow / Down Arrow / Left Arrow / Right Arrow',
    },
    locations: [
      'extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.tsx',
    ],
  },
  {
    id: 'enhanced-resources-toggle-footnotes',
    purpose: 'Toggle the footnotes panel',
    category: 'View',
    context: 'Enhanced resources web view',
    keys: { macOS: 'F7', windows: 'F7', linux: 'F7' },
    locations: [
      'extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx',
    ],
  },
  {
    id: 'enhanced-resources-zoom-in',
    purpose: 'Zoom the scripture pane in',
    category: 'Zoom',
    context: 'Enhanced resources web view',
    keys: { macOS: '⌘+', windows: 'Ctrl++', linux: 'Ctrl++' },
    locations: [
      'extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx',
    ],
  },
  {
    id: 'enhanced-resources-zoom-out',
    purpose: 'Zoom the scripture pane out',
    category: 'Zoom',
    context: 'Enhanced resources web view',
    keys: { macOS: '⌘-', windows: 'Ctrl+-', linux: 'Ctrl+-' },
    locations: [
      'extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx',
    ],
  },
  {
    id: 'enhanced-resources-reset-zoom',
    purpose: 'Reset the scripture pane zoom',
    category: 'Zoom',
    context: 'Enhanced resources web view',
    keys: { macOS: '⌘0', windows: 'Ctrl+0', linux: 'Ctrl+0' },
    locations: [
      'extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx',
    ],
  },
  // Shortcuts defined inside the shared platform-bible-react component library.
  {
    id: 'editor-undo',
    purpose: 'Undo the last edit in the editor',
    category: 'Editing',
    context: 'Editor (text editing)',
    keys: { macOS: '⌘Z', windows: 'Ctrl+Z', linux: 'Ctrl+Z' },
    locations: [
      'lib/platform-bible-react/src/components/basics/editor-keyboard-shortcuts.component.tsx',
    ],
  },
  {
    id: 'editor-redo',
    purpose: 'Redo the last undone edit',
    category: 'Editing',
    context: 'Editor (text editing)',
    keys: { macOS: '⇧⌘Z', windows: 'Ctrl+Y / Ctrl+Shift+Z', linux: 'Ctrl+Y / Ctrl+Shift+Z' },
    locations: [
      'lib/platform-bible-react/src/components/basics/editor-keyboard-shortcuts.component.tsx',
    ],
  },
  {
    id: 'comment-submit',
    purpose: 'Submit or save the comment being edited (new comment, reply, or edit)',
    category: 'Editing',
    context: 'Comment editor',
    keys: { macOS: '⌘⏎', windows: 'Ctrl+Enter', linux: 'Ctrl+Enter' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/comment-editor/comment-editor.component.tsx',
      'lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx',
      'lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx',
      'lib/platform-bible-react/src/components/advanced/comment-list/comment-list.utils.ts',
    ],
  },
  {
    id: 'footnote-markers-menu',
    purpose: 'Open the inline markers menu in the footnote editor',
    category: 'Editing',
    context: 'Footnote editor',
    keys: { macOS: '\\', windows: '\\', linux: '\\' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.component.tsx',
      'lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts',
    ],
  },
  {
    id: 'footnote-new-paragraph',
    purpose: 'Insert a new paragraph (\\fp) within the footnote being edited',
    category: 'Editing',
    context: 'Footnote editor',
    keys: { macOS: '⏎', windows: 'Enter', linux: 'Enter' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.component.tsx',
    ],
  },
  {
    id: 'picker-select-highlighted-item',
    purpose: 'Select the highlighted item in a picker whose search box is empty',
    category: 'Selection',
    // Opt-in per picker (`spaceSelectsHighlightedItem`) so a surface with its own Space semantics —
    // the marker palettes, which claim Space to commit what the user TYPED — keeps the key. Every
    // picker below opts in.
    context:
      'Book/chapter picker, project selector, book scope picker, combo boxes, inline marker menu',
    keys: { macOS: '␣', windows: 'Space', linux: 'Space' },
    locations: [
      'lib/platform-bible-react/src/components/shadcn-ui/command.tsx',
      'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx',
      'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
      'lib/platform-bible-react/src/components/advanced/scope-selector/select-books-picker.component.tsx',
      'lib/platform-bible-react/src/components/basics/combo-box.component.tsx',
      'lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx',
      'lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx',
    ],
  },
  {
    id: 'select-books-range',
    purpose: 'Range-select books (extend the selection to the clicked book)',
    category: 'Selection',
    context: 'Book picker',
    keys: { macOS: '⇧⏎', windows: 'Shift+Enter', linux: 'Shift+Enter' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/scope-selector/select-books-picker.component.tsx',
    ],
  },
  {
    id: 'menubar-close',
    purpose: 'Close the open application menu',
    category: 'Menus',
    context: 'Application menu bar',
    keys: { macOS: '⌥', windows: 'Alt', linux: 'Alt' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx',
    ],
  },
  {
    id: 'menubar-project',
    purpose: 'Open the Project menu',
    category: 'Menus',
    context: 'Application menu bar',
    keys: { macOS: '⌥P', windows: 'Alt+P', linux: 'Alt+P' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx',
    ],
  },
  {
    id: 'menubar-window',
    purpose: 'Open the Window menu',
    category: 'Menus',
    context: 'Application menu bar',
    keys: { macOS: '⌥L', windows: 'Alt+L', linux: 'Alt+L' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx',
    ],
  },
  {
    id: 'menubar-layout',
    purpose: 'Open the Layout menu',
    category: 'Menus',
    context: 'Application menu bar',
    keys: { macOS: '⌥N', windows: 'Alt+N', linux: 'Alt+N' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx',
    ],
  },
  {
    id: 'menubar-help',
    purpose: 'Open the Help menu',
    category: 'Menus',
    context: 'Application menu bar',
    keys: { macOS: '⌥H', windows: 'Alt+H', linux: 'Alt+H' },
    locations: [
      'lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx',
    ],
  },
  {
    id: 'tour-dismiss',
    purpose: 'Dismiss the onboarding tour',
    category: 'View',
    context: 'Onboarding tour overlay',
    keys: { macOS: '⎋', windows: 'Esc', linux: 'Esc' },
    locations: ['src/renderer/components/onboarding-tour/tour.component.tsx'],
  },
  {
    id: 'tour-focus-cycle',
    purpose: 'Cycle keyboard focus through the onboarding tour card buttons',
    category: 'Navigation',
    context: 'Onboarding tour overlay',
    keys: { macOS: '⇥ / ⇧⇥', windows: 'Tab / Shift+Tab', linux: 'Tab / Shift+Tab' },
    locations: ['src/renderer/components/onboarding-tour/tour.component.tsx'],
  },
];
