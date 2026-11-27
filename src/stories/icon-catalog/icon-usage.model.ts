import type { ComponentType } from 'react';

/** Icon libraries the app draws icons from */
export type IconLibrary = 'lucide-react' | '@tabler/icons-react';

/** Any icon component from either library: both accept a `className` and SVG attributes */
export type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;

/**
 * What an icon stands for at one place it is used, in terms a designer would expect to look the
 * same everywhere it appears. Two sites share a concept when a user should be able to recognize
 * them as the same thing, so the catalog flags a concept drawn with more than one icon, and an icon
 * drawn for more than one concept.
 */
export type IconConcept = keyof typeof ICON_CONCEPTS;

/** One place an icon is shown, and what it means there */
export type IconUsage = {
  /** Repo-relative path of the file that renders or names the icon */
  location: string;
  /** What the icon means at this site, in a few words */
  meaning: string;
  /** The concept the icon represents here; see {@link ICON_CONCEPTS} */
  concept: IconConcept;
  /**
   * This site shows the icon only as the mirror image of the site's main icon: in right-to-left
   * text, or for a panel docked on the other side. Mirrored usages are listed but are left out of
   * conflict detection, because the pair stands for one concept by design.
   */
  isMirrored?: boolean;
};

/** One icon glyph and every place it is used */
export type IconCatalogEntry = {
  /** The library's canonical export name for the glyph (lucide's `displayName`) */
  name: string;
  library: IconLibrary;
  component: IconComponent;
  /**
   * Other export names of the same glyph that code imports it as. lucide keeps old names as aliases
   * (`AlertCircle` for `CircleAlert`, `CheckIcon` for `Check`), so one glyph can appear under
   * several names.
   */
  importedAs?: string[];
  /**
   * The glyph's kebab-case name when it is registered in `LUCIDE_ICONS_BY_NAME`
   * (`lib/platform-bible-react/src/components/basics/lucide-icons.util.ts`), so that menus
   * (`iconNameBefore` / `iconNameAfter`) and web view tabs (`iconName`) can name it
   */
  lucideName?: string;
  /** Every site that shows the glyph. Empty only for a registered name that nothing uses yet. */
  usages: IconUsage[];
};

/** How strongly the catalog recommends acting on a conflict */
export type IconConflictSeverity = 'fix' | 'review' | 'acceptable';

/** The curated assessment of one detected conflict */
export type IconConflictNote = {
  severity: IconConflictSeverity;
  recommendation: string;
};

/**
 * Every concept an icon stands for somewhere in the app, with a label for the catalog page. Add a
 * concept only when no existing one fits; reusing one is what lets the catalog spot two icons for
 * the same thing.
 */
export const ICON_CONCEPTS = {
  'add-comment': 'Add a comment',
  'allow-check': 'Allow a denied check result',
  approve: 'Approved',
  'assign-user': 'Assign a user',
  'bible-texts-panel': 'Bible texts panel',
  bold: 'Bold',
  'book-names': 'Book names',
  'breadcrumb-separator': 'Breadcrumb separator',
  'browse-files': 'Browse for files',
  cancel: 'Cancel',
  'character-marker': 'Character marker',
  checks: 'Checks',
  close: 'Close, dismiss, clear or remove',
  collapsed: 'Collapsed section (click to expand)',
  'column-visibility': 'Choose visible columns',
  comments: 'Comments',
  'commentaries-panel': 'Commentaries panel',
  'community-support': 'Community support',
  'contextual-domain': 'Contextual semantic domain',
  'copy-books': 'Copy books to another project',
  'copy-to-clipboard': 'Copy to the clipboard',
  'create-books': 'Create books',
  'cross-reference': 'Cross reference',
  delete: 'Delete',
  'deny-check': 'Deny a check result',
  dictionary: 'Dictionary',
  'diff-added': 'Text added by a replacement',
  'diff-removed': 'Text removed by a replacement',
  done: 'Completed step',
  'drag-handle': 'Drag to reorder',
  edit: 'Edit',
  encyclopedia: 'Encyclopedia',
  endnote: 'Endnote',
  error: 'Error',
  expanded: 'Expanded section (click to collapse)',
  filter: 'Filter',
  find: 'Find',
  'first-page': 'First page',
  footnote: 'Footnote',
  'footnotes-pane': 'Footnotes pane',
  'footnotes-pane-location': 'Footnotes pane location',
  'get-resources': 'Get resources',
  'group-by': 'Group by',
  help: 'Help or guide',
  home: 'Home',
  'import-books': 'Import books',
  'info-notice': 'Informational notice',
  italic: 'Italic',
  language: 'Language',
  'last-page': 'Last page',
  'lexical-domain': 'Lexical semantic domain',
  loading: 'Loading or working',
  locked: 'Locked or read-only',
  'manage-books': 'Manage books',
  maps: 'Maps',
  'matches-hidden': 'Matches hidden',
  'matches-shown': 'Matches shown',
  maximize: 'Maximize',
  media: 'Media',
  'more-actions': 'More actions menu',
  'more-info': 'More information about a nearby control',
  'navigate-back': 'Go back',
  'navigate-forward': 'Go forward',
  'network-settings': 'Network settings',
  'new-tab': 'New tab',
  'next-chapter': 'Next chapter',
  'next-item': 'Next item',
  'next-page': 'Next page',
  'next-result': 'Next search result',
  'next-verse': 'Next verse',
  'no-grouping': 'No grouping',
  'no-icon-fallback': 'Item with no icon of its own',
  'no-results': 'No matching results',
  offline: 'Offline or service unavailable',
  'open-dropdown': 'Open a dropdown, select or popover list',
  'open-item': 'Open the selected item',
  'open-menu': 'Open a menu',
  'opens-externally': 'Opens outside the app',
  'other-domain': 'Other semantic domain',
  overflow: 'Hidden items',
  'preview-options': 'Preview options',
  'previous-chapter': 'Previous chapter',
  'previous-item': 'Previous item',
  'previous-page': 'Previous page',
  'previous-result': 'Previous search result',
  'previous-verse': 'Previous verse',
  'progress-tracking': 'Progress tracking',
  project: 'Paratext project',
  read: 'Read',
  recent: 'Recent item',
  redo: 'Redo',
  'remove-character-marker': 'Remove character marker',
  replace: 'Replace',
  'replace-all': 'Replace all',
  'replace-preview-arrow-layout': 'Replace preview: arrow layout',
  'replace-preview-block-layout': 'Replace preview: block layout',
  'replace-preview-inline-layout': 'Replace preview: inline layout',
  'replace-with': 'Replace with',
  resolve: 'Resolve a comment thread',
  resource: 'Resource',
  'resource-type': 'Resource type',
  'scroll-list-down': 'Scroll a list down',
  'scroll-list-up': 'Scroll a list up',
  'scroll-to-top': 'Scroll to the top',
  'search-field': 'Search field',
  selected: 'Selected or checked item',
  settings: 'Settings',
  'sort-ascending': 'Sorted ascending',
  'sort-descending': 'Sorted descending',
  'sortable-column': 'Sortable column (not sorted)',
  starred: 'Starred item',
  submenu: 'Opens a submenu',
  submit: 'Submit or confirm',
  success: 'Success',
  'switch-view': 'Switch view',
  'sync-idle': 'Ready to sync',
  'team-layout': 'Team layout',
  'text-collection': 'Text collection',
  'theme-dark': 'Dark theme',
  'theme-light': 'Light theme',
  'theme-system': 'System theme',
  'toggle-sidebar': 'Toggle the sidebar',
  undo: 'Undo',
  unapprove: 'Not approved',
  unknown: 'Unknown status',
  unlocked: 'Unlocked',
  unread: 'Unread',
  'unreceived-changes': 'Changes to receive',
  'unsent-changes': 'Changes to send',
  'unsynced-both': 'Changes to send and receive',
  untracked: 'Untracked',
  'user-count': 'Number of users',
  'user-profile': 'User profile',
  'verse-text-hidden': 'Verse text hidden',
  'verse-text-shown': 'Verse text shown',
  'view-options': 'View options',
  warning: 'Warning',
  'zoom-in': 'Zoom in',
  'zoom-out': 'Zoom out',
  'zoom-reset': 'Reset zoom',
} as const;
