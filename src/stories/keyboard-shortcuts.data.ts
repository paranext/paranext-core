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
    purpose: 'Switch to the next tab',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌃⇥ / ⌘⇧]', windows: 'Ctrl+Tab', linux: 'Ctrl+Tab' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'previous-tab',
    purpose: 'Switch to the previous tab',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌃⇧⇥ / ⌘⇧[', windows: 'Ctrl+Shift+Tab', linux: 'Ctrl+Shift+Tab' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'next-tab-group',
    purpose: 'Switch to the next tab group',
    category: 'Navigation',
    context: 'Main process (global)',
    // macOS combo mirrors code order (`input.meta && input.alt`); see file note on modifier order
    keys: { macOS: '⌘⌥↓', windows: 'Ctrl+PageDown', linux: 'Ctrl+PageDown' },
    locations: ['src/main/main.ts'],
  },
  {
    id: 'previous-tab-group',
    purpose: 'Switch to the previous tab group',
    category: 'Navigation',
    context: 'Main process (global)',
    // macOS combo mirrors code order (`input.meta && input.alt`); see file note on modifier order
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
    keys: { macOS: '⌃F8', windows: 'Ctrl+F8', linux: 'Ctrl+F8' },
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
    keys: { macOS: '⌃F9', windows: 'Ctrl+F9', linux: 'Ctrl+F9' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'go-to-next-verse',
    purpose: 'Go to the next verse in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌃↓', windows: 'Ctrl+Down', linux: 'Ctrl+Down' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'go-to-previous-verse',
    purpose: 'Go to the previous verse in the active scroll group',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌃↑', windows: 'Ctrl+Up', linux: 'Ctrl+Up' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
  },
  {
    id: 'open-book-chapter-control',
    purpose: 'Open the Book Chapter Control ready to type a reference',
    category: 'Navigation',
    context: 'Main process (global)',
    keys: { macOS: '⌃B', windows: 'Ctrl+B', linux: 'Ctrl+B' },
    locations: ['src/main/main.ts', 'src/main/verse-navigation-shortcuts.util.ts'],
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
    ],
  },
  {
    id: 'scripture-close-markers-menu',
    purpose: 'Close the inline markers menu',
    category: 'Editing',
    context: 'Scripture editor web view',
    keys: { macOS: '⎋', windows: 'Esc', linux: 'Esc' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
    ],
  },
  {
    id: 'scripture-find',
    purpose: 'Open the find dialog',
    category: 'Navigation',
    context: 'Scripture editor web view',
    // macOS intentionally uses ⌃F (not the usual ⌘F) to match the handler in
    // platform-scripture-editor.web-view.tsx.
    keys: { macOS: '⌃F', windows: 'Ctrl+F', linux: 'Ctrl+F' },
    locations: [
      'extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx',
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
];
