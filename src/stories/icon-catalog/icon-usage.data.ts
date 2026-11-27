import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleCheck,
  IconInfoCircle,
  IconLayoutSidebar,
  IconLayoutSidebarRight,
  IconLoader,
  IconSearch,
  IconSelector,
  IconX,
} from '@tabler/icons-react';
import {
  ArrowDown,
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AtSign,
  Ban,
  Bold,
  Book,
  BookA,
  BookCopy,
  BookMarked,
  BookOpen,
  BookPlus,
  Box,
  ChartColumn,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  CircleAlert,
  CircleArrowDown,
  CircleArrowUp,
  CircleCheck,
  CircleCheckBig,
  CircleQuestionMark,
  CircleUserRound,
  CircleX,
  ClipboardCheck,
  ClipboardCopy,
  Clock,
  CloudOff,
  Copy,
  Download,
  Ellipsis,
  EllipsisVertical,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  FolderInput,
  FolderOpen,
  Funnel,
  Globe,
  GripVertical,
  Group,
  House,
  Image,
  Info,
  Italic,
  LandPlot,
  Languages,
  Library,
  LibraryBig,
  Link,
  LoaderCircle,
  Lock,
  LockOpen,
  Mail,
  MailOpen,
  MapPin,
  Maximize2,
  Menu,
  MessageSquare,
  MessageSquarePlus,
  Minus,
  Monitor,
  Moon,
  PanelBottom,
  PanelsTopLeft,
  Pen,
  Pencil,
  Plus,
  Redo,
  Redo2,
  RefreshCw,
  RemoveFormatting,
  Replace,
  ReplaceAll,
  RotateCcw,
  Scan,
  ScrollText,
  Search,
  SearchX,
  Settings,
  Settings2,
  Shapes,
  SlidersHorizontal,
  Sparkles,
  SquareFunction,
  SquareSigma,
  SquareSplitVertical,
  SquareX,
  Star,
  Sun,
  TextAlignStart,
  TextSearch,
  Trash2,
  TriangleAlert,
  Type,
  Undo,
  Undo2,
  User,
  Users,
  Wifi,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { IconCatalogEntry, IconConflictNote } from './icon-usage.model';

/**
 * The catalog of every icon glyph shown anywhere in Platform.Bible — the renderer (`src/`), the
 * bundled extensions (`extensions/src/`) and the `platform-bible-react` component library — with
 * every place each one is used and what it means there. It is maintained by hand: when you add,
 * change or remove an icon, update the matching entry (see `.claude/rules/icon-catalog.md`).
 * `icon-usage.data.test.ts` fails when a file imports or names an icon that is not listed here, or
 * when a listed site no longer shows it.
 *
 * Tests, stories, `lib/platform-bible-react/src/storybook/` and `components/demo/` are left out:
 * they are not part of the shipped app.
 */
export const ICON_CATALOG: IconCatalogEntry[] = [
  {
    name: 'TextAlignStart',
    library: 'lucide-react',
    component: TextAlignStart,
    importedAs: ['AlignLeft'],
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/find/replace-preview-options.component.tsx',
        meaning: 'Replace preview layout option: inline',
        concept: 'replace-preview-inline-layout',
      },
    ],
  },
  {
    name: 'ArrowDown',
    library: 'lucide-react',
    component: ArrowDown,
    importedAs: ['ArrowDownIcon'],
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx',
        meaning: 'Inventory column is sorted descending',
        concept: 'sort-descending',
      },
    ],
  },
  {
    name: 'ArrowDownUp',
    library: 'lucide-react',
    component: ArrowDownUp,
    usages: [
      {
        location: 'src/renderer/components/sync-status-button.component.tsx',
        meaning: 'Sync status: changes to send and to receive',
        concept: 'unsynced-both',
      },
    ],
  },
  {
    name: 'ArrowLeft',
    library: 'lucide-react',
    component: ArrowLeft,
    importedAs: ['ArrowLeftIcon'],
    usages: [
      {
        location:
          'extensions/src/platform-lexical-tools/src/components/dictionary/back-to-list-button.component.tsx',
        meaning: 'Back to the dictionary entry list',
        concept: 'navigate-back',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/dictionary-tab/dictionary-entry-detail.component.tsx',
        meaning: 'Back to the dictionary list',
        concept: 'navigate-back',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/media-tab/media-item-detail.component.tsx',
        meaning: 'Back to the media list',
        concept: 'navigate-back',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/encyclopedia-tab/encyclopedia-tab.component.tsx',
        meaning: 'Back to the encyclopedia list',
        concept: 'navigate-back',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/navigation-history-buttons/navigation-history-buttons.component.tsx',
        meaning: 'Navigation history: back (forward in right-to-left)',
        concept: 'navigate-back',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx',
        meaning: 'Back from the chapter grid to the book list',
        concept: 'navigate-back',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx',
        meaning: 'Go to the first page of a data table',
        concept: 'first-page',
      },
    ],
  },
  {
    name: 'ArrowRight',
    library: 'lucide-react',
    component: ArrowRight,
    importedAs: ['ArrowRightIcon'],
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/find/search-result.component.tsx',
        meaning: 'Between the found text and its replacement in a replace preview',
        concept: 'replace-with',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Adornment on the "replace with" input',
        concept: 'replace-with',
      },
      {
        location:
          'extensions/src/platform-scripture/src/find/replace-preview-options.component.tsx',
        meaning: 'Replace preview layout option: arrow',
        concept: 'replace-preview-arrow-layout',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/navigation-history-buttons/navigation-history-buttons.component.tsx',
        meaning: 'Navigation history: forward (back in right-to-left)',
        concept: 'navigate-forward',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx',
        meaning: 'Back from the chapter grid to the book list, right-to-left',
        concept: 'navigate-back',
        isMirrored: true,
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx',
        meaning: 'Go to the last page of a data table',
        concept: 'last-page',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
        meaning: 'Open the chosen project',
        concept: 'open-item',
      },
    ],
  },
  {
    name: 'ArrowUp',
    library: 'lucide-react',
    component: ArrowUp,
    importedAs: ['ArrowUpIcon'],
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/er-dictionary-filtered-list.component.tsx',
        meaning: '"Back" button that closes the entry detail',
        concept: 'navigate-back',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx',
        meaning: 'Save the edited comment',
        concept: 'submit',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx',
        meaning: 'Submit a comment or reply',
        concept: 'submit',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx',
        meaning: 'Inventory column is sorted ascending',
        concept: 'sort-ascending',
      },
    ],
  },
  {
    name: 'AtSign',
    library: 'lucide-react',
    component: AtSign,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx',
        meaning: 'Assign the thread to a user',
        concept: 'assign-user',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-editor/comment-editor.component.tsx',
        meaning: 'Assign the new comment to a user',
        concept: 'assign-user',
      },
    ],
  },
  {
    name: 'Ban',
    library: 'lucide-react',
    component: Ban,
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx',
        meaning: 'Group books by: none',
        concept: 'no-grouping',
      },
      {
        location: 'lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx',
        meaning: 'Fallback for a marker menu item that has no icon of its own',
        concept: 'no-icon-fallback',
      },
    ],
  },
  {
    name: 'Bold',
    library: 'lucide-react',
    component: Bold,
    importedAs: ['BoldIcon'],
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/editor/plugins/toolbar/font-format-toolbar-plugin.tsx',
        meaning: 'Bold text format',
        concept: 'bold',
      },
    ],
  },
  {
    name: 'Book',
    library: 'lucide-react',
    component: Book,
    lucideName: 'book',
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/components/checklist.component.tsx',
        meaning: 'Checklist toggle: verse text hidden',
        concept: 'verse-text-hidden',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: show the Bible texts panel',
        concept: 'bible-texts-panel',
      },
    ],
  },
  {
    name: 'BookA',
    library: 'lucide-react',
    component: BookA,
    lucideName: 'book-a',
    usages: [
      {
        location:
          'extensions/src/platform-lexical-tools/src/components/dictionary/domains-display.component.tsx',
        meaning: 'SDBH/SDBG lexical semantic domain',
        concept: 'lexical-domain',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx',
        meaning: 'Manage books section: book names (not yet available)',
        concept: 'book-names',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/toolbar/toolbar.component.tsx',
        meaning: 'Enhanced resources tab: dictionary',
        concept: 'dictionary',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx',
        meaning: 'Guide illustration of the dictionary tab',
        concept: 'dictionary',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: show the dictionary panel',
        concept: 'dictionary',
      },
      {
        location: 'extensions/src/platform-lexical-tools/contributions/menus.json',
        meaning: 'Main menu item: open the dictionary',
        concept: 'dictionary',
      },
      {
        location: 'extensions/src/platform-lexical-tools/src/main.ts',
        meaning: 'Dictionary web view tab icon',
        concept: 'dictionary',
      },
    ],
  },
  {
    name: 'BookCopy',
    library: 'lucide-react',
    component: BookCopy,
    lucideName: 'book-copy',
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx',
        meaning: 'Manage books section: show books',
        concept: 'manage-books',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu items: manage books, show books',
        concept: 'manage-books',
      },
    ],
  },
  {
    name: 'BookMarked',
    library: 'lucide-react',
    component: BookMarked,
    lucideName: 'book-marked',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: show the commentaries panel',
        concept: 'commentaries-panel',
      },
    ],
  },
  {
    name: 'BookOpen',
    library: 'lucide-react',
    component: BookOpen,
    lucideName: 'book-open',
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Get Resources dialog header; resource rows',
        concept: 'get-resources',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Home: resource filter option and resource rows',
        concept: 'resource',
      },
      {
        location: 'extensions/src/platform-scripture/src/components/checklist.component.tsx',
        meaning: 'Checklist toggle: verse text shown',
        concept: 'verse-text-shown',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/panel-readiness-view.component.tsx',
        meaning: 'Empty state of a resource panel',
        concept: 'resource',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts',
        meaning: 'Tab icon of an editor showing a resource',
        concept: 'resource',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/main.ts',
        meaning: 'Bible texts panel tab icon',
        concept: 'bible-texts-panel',
      },
    ],
  },
  {
    name: 'BookPlus',
    library: 'lucide-react',
    component: BookPlus,
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx',
        meaning: 'Manage books section: create books',
        concept: 'create-books',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Apply button: create books',
        concept: 'create-books',
      },
    ],
  },
  {
    name: 'Box',
    library: 'lucide-react',
    component: Box,
    usages: [
      {
        location:
          'extensions/src/platform-lexical-tools/src/components/dictionary/domains-display.component.tsx',
        meaning: 'Semantic domain from any other taxonomy',
        concept: 'other-domain',
      },
    ],
  },
  {
    name: 'ChartColumn',
    library: 'lucide-react',
    component: ChartColumn,
    importedAs: ['BarChart3'],
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx',
        meaning: 'Manage books section: progress tracking (not yet available)',
        concept: 'progress-tracking',
      },
    ],
  },
  {
    name: 'Check',
    library: 'lucide-react',
    component: Check,
    importedAs: ['CheckIcon'],
    usages: [
      {
        location: 'src/renderer/components/first-run/steps/sync-progress.component.tsx',
        meaning: 'First-run sync step finished',
        concept: 'done',
      },
      {
        location:
          'lib/platform-bible-react/src/components/basics/wizard-stepper/wizard-stepper.component.tsx',
        meaning: 'Wizard step completed',
        concept: 'done',
      },
      {
        location: 'src/renderer/components/projects/project-picker.component.tsx',
        meaning: 'Marks the current project',
        concept: 'selected',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx',
        meaning: 'Selected book',
        concept: 'selected',
      },
      {
        location: 'lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx',
        meaning: 'Marker applied to the selection',
        concept: 'selected',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx',
        meaning: 'Selected scope',
        concept: 'selected',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx',
        meaning: 'Resource already in the collection',
        concept: 'selected',
      },
      {
        location: 'src/renderer/components/dialogs/select-multiple-projects.dialog.tsx',
        meaning: 'Submit the chosen projects',
        concept: 'submit',
      },
      {
        location: 'src/renderer/components/dialogs/select-books-dialog.component.tsx',
        meaning: 'Submit the chosen books',
        concept: 'submit',
      },
      {
        location:
          'lib/platform-bible-react/src/components/basics/cancel-accept-buttons.component.tsx',
        meaning: 'Accept',
        concept: 'submit',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/resolve-check-button.component.tsx',
        meaning: 'Resolve a comment thread',
        concept: 'resolve',
      },
      {
        location:
          'extensions/src/platform-scripture/src/checks/checks-side-panel/check-card.component.tsx',
        meaning: 'Allow a denied check result',
        concept: 'allow-check',
      },
    ],
  },
  {
    name: 'ChevronDown',
    library: 'lucide-react',
    component: ChevronDown,
    usages: [
      {
        location: 'src/renderer/components/dialogs/team-layout.component.tsx',
        meaning: 'Model text select trigger',
        concept: 'open-dropdown',
      },
      {
        location: 'extensions/src/platform-get-resources/src/project-resource-filter.component.tsx',
        meaning: 'Project/resource filter trigger',
        concept: 'open-dropdown',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Find scope dropdown trigger',
        concept: 'open-dropdown',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Go to the next search result',
        concept: 'next-result',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/paragraph-style-trigger.component.tsx',
        meaning: 'Paragraph style trigger',
        concept: 'open-dropdown',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/character-marker-control/character-marker-control.component.tsx',
        meaning: 'Character marker trigger',
        concept: 'open-dropdown',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/resource-text-panel.component.tsx',
        meaning: 'Resource select trigger',
        concept: 'open-dropdown',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/model-text-panel.component.tsx',
        meaning: 'Model text select trigger',
        concept: 'open-dropdown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx',
        meaning: 'Filter dropdown trigger',
        concept: 'open-dropdown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
        meaning: 'Single-project selector trigger',
        concept: 'open-dropdown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx',
        meaning: 'Scope and reference triggers',
        concept: 'open-dropdown',
      },
      {
        location: 'lib/platform-bible-react/src/components/basics/combo-box.component.tsx',
        meaning: 'Combo box trigger',
        concept: 'open-dropdown',
      },
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Column sorted descending',
        concept: 'sort-descending',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Column sorted descending',
        concept: 'sort-descending',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx',
        meaning: 'Expanded book group',
        concept: 'expanded',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx',
        meaning: 'Expanded biblical terms section',
        concept: 'expanded',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx',
        meaning: 'Expanded result row',
        concept: 'expanded',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/developer-section/developer-section.component.tsx',
        meaning: 'Collapsed developer section (rotates 180° when expanded)',
        concept: 'collapsed',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx',
        meaning: 'Hidden replies: show all replies',
        concept: 'collapsed',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.navigation.ts',
        meaning: 'Go to the next verse',
        concept: 'next-verse',
      },
    ],
  },
  {
    name: 'ChevronLeft',
    library: 'lucide-react',
    component: ChevronLeft,
    importedAs: ['ChevronLeftIcon'],
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/media-viewer/media-viewer.component.tsx',
        meaning: 'Show the previous media item',
        concept: 'previous-item',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx',
        meaning: 'Go to the previous page of a data table',
        concept: 'previous-page',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx',
        meaning: 'Collapsed result row, right-to-left',
        concept: 'collapsed',
        isMirrored: true,
      },
    ],
  },
  {
    name: 'ChevronRight',
    library: 'lucide-react',
    component: ChevronRight,
    importedAs: ['ChevronRightIcon'],
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx',
        meaning: 'Collapsed book group',
        concept: 'collapsed',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx',
        meaning: 'Collapsed biblical terms section',
        concept: 'collapsed',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx',
        meaning: 'Collapsed result row',
        concept: 'collapsed',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/er-dictionary-filtered-list.component.tsx',
        meaning: 'Separator between semantic domain path segments',
        concept: 'breadcrumb-separator',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/er-dictionary-filtered-list.component.tsx',
        meaning: 'Collapsed semantic domain (rotates 90° when expanded)',
        concept: 'collapsed',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/media-viewer/media-viewer.component.tsx',
        meaning: 'Show the next media item',
        concept: 'next-item',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx',
        meaning: 'Go to the next page of a data table',
        concept: 'next-page',
      },
    ],
  },
  {
    name: 'ChevronsLeft',
    library: 'lucide-react',
    component: ChevronsLeft,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.navigation.ts',
        meaning: 'Go to the previous chapter (next chapter in right-to-left)',
        concept: 'previous-chapter',
      },
    ],
  },
  {
    name: 'ChevronsRight',
    library: 'lucide-react',
    component: ChevronsRight,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.navigation.ts',
        meaning: 'Go to the next chapter (previous chapter in right-to-left)',
        concept: 'next-chapter',
      },
    ],
  },
  {
    name: 'ChevronsUpDown',
    library: 'lucide-react',
    component: ChevronsUpDown,
    usages: [
      {
        location: 'src/renderer/components/docking/platform-dock-layout-positioning.util.ts',
        meaning: 'Dock tab bar: list the tabs that do not fit',
        concept: 'open-dropdown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
        meaning: 'Multi-project selector trigger',
        concept: 'open-dropdown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx',
        meaning: 'Multi-select combo box trigger',
        concept: 'open-dropdown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/scope-selector/select-books-picker.component.tsx',
        meaning: 'Book picker trigger',
        concept: 'open-dropdown',
      },
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Sortable column, not sorted',
        concept: 'sortable-column',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Sortable column, not sorted',
        concept: 'sortable-column',
      },
    ],
  },
  {
    name: 'ChevronUp',
    library: 'lucide-react',
    component: ChevronUp,
    importedAs: ['ChevronUpIcon'],
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Column sorted ascending',
        concept: 'sort-ascending',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Column sorted ascending',
        concept: 'sort-ascending',
      },
      {
        location:
          'extensions/src/platform-lexical-tools/src/components/dictionary/dictionary-entry-display.component.tsx',
        meaning: 'Scroll the dictionary entry to the top',
        concept: 'scroll-to-top',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Go to the previous search result',
        concept: 'previous-result',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx',
        meaning: 'All replies shown: hide them',
        concept: 'expanded',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.navigation.ts',
        meaning: 'Go to the previous verse',
        concept: 'previous-verse',
      },
    ],
  },
  {
    name: 'CircleAlert',
    library: 'lucide-react',
    component: CircleAlert,
    importedAs: ['AlertCircle'],
    usages: [
      {
        location: 'src/renderer/components/sync-status-button.component.tsx',
        meaning: 'Sync status: the last sync failed',
        concept: 'error',
      },
      {
        location: 'src/renderer/components/first-run/wizard-step-form.component.tsx',
        meaning: 'First-run step error alert',
        concept: 'error',
      },
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Resource action error alert',
        concept: 'error',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Sync failed alert',
        concept: 'error',
      },
      {
        location: 'extensions/src/paratext-registration/src/internet-settings.component.tsx',
        meaning: 'Internet settings error alert',
        concept: 'error',
      },
      {
        location:
          'extensions/src/paratext-registration/src/components/registration-form-view.component.tsx',
        meaning: 'Registration error alert',
        concept: 'error',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/footnotes/footnote-item.component.tsx',
        meaning: 'Footnote with a missing marker',
        concept: 'error',
      },
      {
        location: 'src/renderer/components/first-run/steps/identify-step.component.tsx',
        meaning: 'Notice that registration must be entered again',
        concept: 'warning',
      },
      {
        location:
          'src/renderer/components/extension-host-stopped-banner/extension-host-stopped-banner.component.tsx',
        meaning: 'Extension host restarted but has not yet confirmed it started',
        concept: 'warning',
      },
    ],
  },
  {
    name: 'CircleArrowDown',
    library: 'lucide-react',
    component: CircleArrowDown,
    usages: [
      {
        location: 'src/renderer/components/sync-status-button.component.tsx',
        meaning: 'Sync status: changes to receive',
        concept: 'unreceived-changes',
      },
    ],
  },
  {
    name: 'CircleArrowUp',
    library: 'lucide-react',
    component: CircleArrowUp,
    usages: [
      {
        location: 'src/renderer/components/sync-status-button.component.tsx',
        meaning: 'Sync status: changes to send',
        concept: 'unsent-changes',
      },
    ],
  },
  {
    name: 'CircleCheck',
    library: 'lucide-react',
    component: CircleCheck,
    importedAs: ['CircleCheckIcon'],
    usages: [
      {
        location: 'src/renderer/components/sync-status-button.component.tsx',
        meaning: 'Sync status: synced',
        concept: 'success',
      },
      {
        location: 'src/renderer/components/first-run/steps/identify-step.component.tsx',
        meaning: 'Registration is valid',
        concept: 'success',
      },
      {
        location:
          'src/renderer/components/extension-host-stopped-banner/extension-host-stopped-banner.component.tsx',
        meaning: 'Extension host restarted',
        concept: 'success',
      },
      {
        location: 'extensions/src/paratext-registration/src/internet-settings.component.tsx',
        meaning: 'Internet settings saved',
        concept: 'success',
      },
      {
        location:
          'extensions/src/paratext-registration/src/components/registration-form-view.component.tsx',
        meaning: 'Registration is valid',
        concept: 'success',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx',
        meaning: 'Inventory item status: approved',
        concept: 'approve',
      },
    ],
  },
  {
    name: 'CircleCheckBig',
    library: 'lucide-react',
    component: CircleCheckBig,
    lucideName: 'circle-check-big',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: open checks',
        concept: 'checks',
      },
    ],
  },
  {
    name: 'CircleQuestionMark',
    library: 'lucide-react',
    component: CircleQuestionMark,
    importedAs: ['CircleHelp', 'HelpCircle', 'CircleHelpIcon'],
    lucideName: 'circle-question-mark',
    usages: [
      {
        location: 'src/renderer/components/sync-status-button.component.tsx',
        meaning: 'Sync status: not known yet',
        concept: 'unknown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx',
        meaning: 'Inventory item status: unknown',
        concept: 'unknown',
      },
      {
        location:
          'extensions/src/platform-scripture/src/components/marker-settings-dialog.component.tsx',
        meaning: 'Help tooltips for equivalent markers and the marker filter',
        concept: 'more-info',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx',
        meaning: 'Extension support link',
        concept: 'help',
      },
      {
        location: 'src/extension-host/data/menu.data.json',
        meaning: 'Main menu item: visit the Getting Started page',
        concept: 'help',
      },
    ],
  },
  {
    name: 'CircleUserRound',
    library: 'lucide-react',
    component: CircleUserRound,
    usages: [
      {
        location: 'src/renderer/components/user-profile-popover/user-profile-popover.component.tsx',
        meaning: 'Toolbar button that opens the user profile',
        concept: 'user-profile',
      },
    ],
  },
  {
    name: 'CircleX',
    library: 'lucide-react',
    component: CircleX,
    importedAs: ['CircleXIcon'],
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx',
        meaning: 'Inventory item status: not approved',
        concept: 'unapprove',
      },
    ],
  },
  {
    name: 'ClipboardCheck',
    library: 'lucide-react',
    component: ClipboardCheck,
    lucideName: 'clipboard-check',
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/checks-side-panel.web-view-provider.ts',
        meaning: 'Checks side panel tab icon',
        concept: 'checks',
      },
    ],
  },
  {
    name: 'ClipboardCopy',
    library: 'lucide-react',
    component: ClipboardCopy,
    lucideName: 'clipboard-copy',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: copy the selection',
        concept: 'copy-to-clipboard',
      },
    ],
  },
  {
    name: 'Clock',
    library: 'lucide-react',
    component: Clock,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/advanced/recent-searches.component.tsx',
        meaning: 'Recent searches button and items',
        concept: 'recent',
      },
    ],
  },
  {
    name: 'CloudOff',
    library: 'lucide-react',
    component: CloudOff,
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Resource list could not load, or downloads are unavailable',
        concept: 'offline',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Server unreachable alert',
        concept: 'offline',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx',
        meaning: 'Resource catalog could not load',
        concept: 'offline',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/scripture-text-grid/catalog-retry-banner.component.tsx',
        meaning: 'Resource catalog could not load',
        concept: 'offline',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/panel-readiness-view.component.tsx',
        meaning: 'Resource catalog could not load',
        concept: 'offline',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx',
        meaning: 'Resource list could not load, or downloads are unavailable',
        concept: 'offline',
      },
    ],
  },
  {
    name: 'Copy',
    library: 'lucide-react',
    component: Copy,
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx',
        meaning: 'Manage books section: copy books',
        concept: 'copy-books',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Apply button: copy books',
        concept: 'copy-books',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/search-result.component.tsx',
        meaning: 'Copy the reference and/or verse text of a result',
        concept: 'copy-to-clipboard',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-editor.component.tsx',
        meaning: 'Copy the footnote',
        concept: 'copy-to-clipboard',
      },
      {
        location: 'lib/platform-bible-react/src/components/basics/error-dump.component.tsx',
        meaning: 'Copy the error details',
        concept: 'copy-to-clipboard',
      },
    ],
  },
  {
    name: 'Download',
    library: 'lucide-react',
    component: Download,
    lucideName: 'download',
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Apply button: import books',
        concept: 'import-books',
      },
      {
        location: 'extensions/src/platform-get-resources/contributions/menus.json',
        meaning: 'Main menu item: get resources',
        concept: 'get-resources',
      },
    ],
  },
  {
    name: 'Ellipsis',
    library: 'lucide-react',
    component: Ellipsis,
    importedAs: ['MoreHorizontal'],
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Resource row actions menu',
        concept: 'more-actions',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home-item-menu.tsx',
        meaning: 'Home row actions menu',
        concept: 'more-actions',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx',
        meaning: 'Comment actions menu',
        concept: 'more-actions',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/semantic-domain-viewer/er-dictionary-filtered-list.component.tsx',
        meaning: 'Semantic domain path segments that do not fit',
        concept: 'overflow',
      },
    ],
  },
  {
    name: 'EllipsisVertical',
    library: 'lucide-react',
    component: EllipsisVertical,
    importedAs: ['MoreVertical'],
    usages: [
      {
        location:
          'extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx',
        meaning: 'Resource cell options menu',
        concept: 'more-actions',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.tsx',
        meaning: 'Tab toolbar view info menu',
        concept: 'more-actions',
      },
      {
        location: 'lib/platform-bible-react/src/components/basics/results-card.component.tsx',
        meaning: 'Results card actions menu',
        concept: 'more-actions',
      },
    ],
  },
  {
    name: 'ExternalLink',
    library: 'lucide-react',
    component: ExternalLink,
    lucideName: 'external-link',
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Open the project in the registry',
        concept: 'opens-externally',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/copyright-notice/copyright-details-dialog.component.tsx',
        meaning: 'Permissions link opens in the browser',
        concept: 'opens-externally',
      },
      {
        location: 'src/extension-host/data/menu.data.json',
        meaning: 'Main menu items that open a web page',
        concept: 'opens-externally',
      },
    ],
  },
  {
    name: 'Eye',
    library: 'lucide-react',
    component: Eye,
    lucideName: 'eye',
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/find/replace-preview-options.component.tsx',
        meaning: 'Show the replace preview options',
        concept: 'preview-options',
      },
      {
        location: 'extensions/src/platform-scripture/src/components/checklist.component.tsx',
        meaning: 'Checklist toggle: matches shown',
        concept: 'matches-shown',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: switch Scripture view',
        concept: 'switch-view',
      },
    ],
  },
  {
    name: 'EyeOff',
    library: 'lucide-react',
    component: EyeOff,
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/components/checklist.component.tsx',
        meaning: 'Checklist toggle: matches hidden',
        concept: 'matches-hidden',
      },
    ],
  },
  {
    name: 'FileText',
    library: 'lucide-react',
    component: FileText,
    lucideName: 'file-text',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: show footnotes',
        concept: 'footnotes-pane',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/main.ts',
        meaning: 'Commentaries panel tab icon',
        concept: 'commentaries-panel',
      },
    ],
  },
  {
    name: 'FolderInput',
    library: 'lucide-react',
    component: FolderInput,
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx',
        meaning: 'Manage books section: import books',
        concept: 'import-books',
      },
    ],
  },
  {
    name: 'FolderOpen',
    library: 'lucide-react',
    component: FolderOpen,
    importedAs: ['FolderOpenIcon'],
    usages: [
      {
        location: 'src/renderer/components/dialogs/select-multiple-projects.dialog.tsx',
        meaning: 'Project list item',
        concept: 'project',
      },
      {
        location: 'src/renderer/components/dialogs/select-project.dialog.tsx',
        meaning: 'Project list item',
        concept: 'project',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Browse for files to import',
        concept: 'browse-files',
      },
    ],
  },
  {
    name: 'Funnel',
    library: 'lucide-react',
    component: Funnel,
    importedAs: ['Filter', 'FilterIcon'],
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/project-resource-filter.component.tsx',
        meaning: 'Project/resource filter trigger and its "all" option',
        concept: 'filter',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Book presence filter button',
        concept: 'filter',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx',
        meaning: 'Extension filter dropdown',
        concept: 'filter',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx',
        meaning: '"View" button that chooses which columns are visible',
        concept: 'column-visibility',
      },
    ],
  },
  {
    name: 'Globe',
    library: 'lucide-react',
    component: Globe,
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Resource language filter',
        concept: 'language',
      },
    ],
  },
  {
    name: 'GripVertical',
    library: 'lucide-react',
    component: GripVertical,
    usages: [
      {
        location:
          'extensions/src/platform-scripture-editor/src/scripture-text-grid/resource-cell-view.component.tsx',
        meaning: 'Drag to reorder a resource column',
        concept: 'drag-handle',
      },
    ],
  },
  {
    name: 'Group',
    library: 'lucide-react',
    component: Group,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
        meaning: 'Group-by menu button',
        concept: 'group-by',
      },
    ],
  },
  {
    name: 'House',
    library: 'lucide-react',
    component: House,
    importedAs: ['Home', 'HomeIcon'],
    lucideName: 'house',
    usages: [
      {
        location: 'src/renderer/components/platform-bible-toolbar.tsx',
        meaning: 'Toolbar button: open Home',
        concept: 'home',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.web-view.tsx',
        meaning: 'Home dialog header',
        concept: 'home',
      },
      {
        location: 'extensions/src/platform-get-resources/contributions/menus.json',
        meaning: 'Main menu item: open Home',
        concept: 'home',
      },
    ],
  },
  {
    name: 'Image',
    library: 'lucide-react',
    component: Image,
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/toolbar/toolbar.component.tsx',
        meaning: 'Enhanced resources tab: media',
        concept: 'media',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx',
        meaning: 'Guide illustration of the media tab',
        concept: 'media',
      },
    ],
  },
  {
    name: 'Info',
    library: 'lucide-react',
    component: Info,
    usages: [
      {
        location: 'src/renderer/components/first-run/first-run-shell.component.tsx',
        meaning: 'Notice that the registration was copied from Paratext 9',
        concept: 'info-notice',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/copyright-notice/copyright-notice-banner.component.tsx',
        meaning: 'Copyright notice banner',
        concept: 'info-notice',
      },
      {
        location: 'src/renderer/components/settings-tabs/settings-components/setting.component.tsx',
        meaning: 'Show the description of a setting',
        concept: 'more-info',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Tooltip explaining "from template"',
        concept: 'more-info',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find-filters.component.tsx',
        meaning: 'Tooltips explaining find filters',
        concept: 'more-info',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Tooltip explaining a find option',
        concept: 'more-info',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/copyright-notice/copyright-notice-indicator.component.tsx',
        meaning: 'Show the copyright notice of a resource',
        concept: 'more-info',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.tsx',
        meaning: 'Describe an internet access option',
        concept: 'more-info',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/toolbar/toolbar.component.tsx',
        meaning: 'Open the enhanced resources guide',
        concept: 'help',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx',
        meaning: 'Guide illustration of the guide button',
        concept: 'help',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/warning-ribbons/warning-ribbons.component.tsx',
        meaning: 'Warning ribbons (missing book, review status, image warning, copyright)',
        concept: 'warning',
      },
    ],
  },
  {
    name: 'Italic',
    library: 'lucide-react',
    component: Italic,
    importedAs: ['ItalicIcon'],
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/editor/plugins/toolbar/font-format-toolbar-plugin.tsx',
        meaning: 'Italic text format',
        concept: 'italic',
      },
    ],
  },
  {
    name: 'LandPlot',
    library: 'lucide-react',
    component: LandPlot,
    usages: [
      {
        location:
          'extensions/src/platform-lexical-tools/src/components/dictionary/domains-display.component.tsx',
        meaning: 'SDBH/SDBG contextual semantic domain',
        concept: 'contextual-domain',
      },
    ],
  },
  {
    name: 'Languages',
    library: 'lucide-react',
    component: Languages,
    usages: [
      {
        location: 'src/renderer/components/user-profile-popover/user-profile-popover.component.tsx',
        meaning: 'Interface language picker label',
        concept: 'language',
      },
    ],
  },
  {
    name: 'Library',
    library: 'lucide-react',
    component: Library,
    lucideName: 'library',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: show the text collection',
        concept: 'text-collection',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts',
        meaning: 'Text collection tab icon',
        concept: 'text-collection',
      },
    ],
  },
  {
    name: 'LibraryBig',
    library: 'lucide-react',
    component: LibraryBig,
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/toolbar/toolbar.component.tsx',
        meaning: 'Enhanced resources tab: encyclopedia',
        concept: 'encyclopedia',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx',
        meaning: 'Guide illustration of the encyclopedia tab',
        concept: 'encyclopedia',
      },
    ],
  },
  {
    name: 'Link',
    library: 'lucide-react',
    component: Link,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx',
        meaning: 'Extension website link',
        concept: 'opens-externally',
      },
    ],
  },
  {
    name: 'LoaderCircle',
    library: 'lucide-react',
    component: LoaderCircle,
    importedAs: ['Loader2'],
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Applying a book action',
        concept: 'loading',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
        meaning: 'Projects are loading',
        concept: 'loading',
      },
      {
        location: 'lib/platform-bible-react/src/components/basics/spinner.component.tsx',
        meaning: 'The shared Spinner component',
        concept: 'loading',
      },
    ],
  },
  {
    name: 'Lock',
    library: 'lucide-react',
    component: Lock,
    importedAs: ['LockIcon'],
    usages: [
      {
        location: 'src/renderer/components/projects/read-only-indicator.component.tsx',
        meaning: 'Read-only project',
        concept: 'locked',
      },
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Read-only project row',
        concept: 'locked',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/structure-protection-button.component.tsx',
        meaning: 'Structure protection is on',
        concept: 'locked',
      },
      {
        location: 'extensions/src/platform-scripture-editor/src/resource-text-panel.component.tsx',
        meaning: 'Resource set by the team',
        concept: 'locked',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx',
        meaning: 'Team resource that cannot be removed',
        concept: 'locked',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx',
        meaning: 'Resource that cannot be added or removed',
        concept: 'locked',
      },
    ],
  },
  {
    name: 'LockOpen',
    library: 'lucide-react',
    component: LockOpen,
    usages: [
      {
        location:
          'extensions/src/platform-scripture-editor/src/structure-protection-button.component.tsx',
        meaning: 'Structure protection is off',
        concept: 'unlocked',
      },
    ],
  },
  {
    name: 'Mail',
    library: 'lucide-react',
    component: Mail,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx',
        meaning: 'Unread thread: mark as read',
        concept: 'unread',
      },
    ],
  },
  {
    name: 'MailOpen',
    library: 'lucide-react',
    component: MailOpen,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-thread.component.tsx',
        meaning: 'Read thread: mark as unread',
        concept: 'read',
      },
    ],
  },
  {
    name: 'MapPin',
    library: 'lucide-react',
    component: MapPin,
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/toolbar/toolbar.component.tsx',
        meaning: 'Enhanced resources tab: maps',
        concept: 'maps',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/guide/marble-guide.component.tsx',
        meaning: 'Guide illustration of the maps tab',
        concept: 'maps',
      },
    ],
  },
  {
    name: 'Maximize2',
    library: 'lucide-react',
    component: Maximize2,
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/media-tab/media-item-detail.component.tsx',
        meaning: 'Open the media item full size',
        concept: 'maximize',
      },
    ],
  },
  {
    name: 'Menu',
    library: 'lucide-react',
    component: Menu,
    importedAs: ['MenuIcon'],
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/toolbar/toolbar.component.tsx',
        meaning: 'Enhanced resources tab menu',
        concept: 'open-menu',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.tsx',
        meaning: 'Tab toolbar project menu (default icon)',
        concept: 'open-menu',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx',
        meaning: 'Tab dropdown menu (default icon)',
        concept: 'open-menu',
      },
    ],
  },
  {
    name: 'MessageSquare',
    library: 'lucide-react',
    component: MessageSquare,
    lucideName: 'message-square',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu items: open comments',
        concept: 'comments',
      },
      {
        location:
          'extensions/src/legacy-comment-manager/src/comment-list-panel-web-view.factory.ts',
        meaning: 'Comments panel tab icon',
        concept: 'comments',
      },
    ],
  },
  {
    name: 'MessageSquarePlus',
    library: 'lucide-react',
    component: MessageSquarePlus,
    lucideName: 'message-square-plus',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: insert a comment',
        concept: 'add-comment',
      },
    ],
  },
  {
    name: 'Minus',
    library: 'lucide-react',
    component: Minus,
    usages: [
      {
        location:
          'src/renderer/components/settings-tabs/settings-components/zoom-stepper.component.tsx',
        meaning: 'Zoom setting stepper: decrease',
        concept: 'zoom-out',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/search-result.component.tsx',
        meaning: 'Text a replacement removes',
        concept: 'diff-removed',
      },
    ],
  },
  {
    name: 'Monitor',
    library: 'lucide-react',
    component: Monitor,
    usages: [
      {
        location: 'src/renderer/components/user-profile-popover/user-profile-popover.component.tsx',
        meaning: 'Appearance: follow the system theme',
        concept: 'theme-system',
      },
    ],
  },
  {
    name: 'Moon',
    library: 'lucide-react',
    component: Moon,
    usages: [
      {
        location: 'src/renderer/components/user-profile-popover/user-profile-popover.component.tsx',
        meaning: 'Appearance: dark theme',
        concept: 'theme-dark',
      },
    ],
  },
  {
    name: 'PanelBottom',
    library: 'lucide-react',
    component: PanelBottom,
    lucideName: 'panel-bottom',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: change where the footnotes pane is',
        concept: 'footnotes-pane-location',
      },
    ],
  },
  {
    name: 'PanelsTopLeft',
    library: 'lucide-react',
    component: PanelsTopLeft,
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/src/team-layout-button.component.tsx',
        meaning: 'Open the team layout dialog',
        concept: 'team-layout',
      },
    ],
  },
  {
    name: 'Pen',
    library: 'lucide-react',
    component: Pen,
    importedAs: ['PenIcon'],
    usages: [
      {
        location:
          'extensions/src/paratext-registration/src/components/registration-form-view.component.tsx',
        meaning: 'Change the registration',
        concept: 'edit',
      },
    ],
  },
  {
    name: 'Pencil',
    library: 'lucide-react',
    component: Pencil,
    lucideName: 'pencil',
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/components/checklist.component.tsx',
        meaning: 'Edit the checklist settings',
        concept: 'edit',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx',
        meaning: 'Edit a comment',
        concept: 'edit',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu: Edit submenu',
        concept: 'edit',
      },
    ],
  },
  {
    name: 'Plus',
    library: 'lucide-react',
    component: Plus,
    usages: [
      {
        location: 'src/renderer/components/docking/panel-extra-content.component.tsx',
        meaning: 'Open a new tab in this panel',
        concept: 'new-tab',
      },
      {
        location: 'extensions/src/platform-get-resources/src/new-tab.web-view.tsx',
        meaning: 'New tab dialog header',
        concept: 'new-tab',
      },
      {
        location:
          'src/renderer/components/settings-tabs/settings-components/zoom-stepper.component.tsx',
        meaning: 'Zoom setting stepper: increase',
        concept: 'zoom-in',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/search-result.component.tsx',
        meaning: 'Text a replacement adds',
        concept: 'diff-added',
      },
    ],
  },
  {
    name: 'Redo',
    library: 'lucide-react',
    component: Redo,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/basics/undo-redo-buttons.component.tsx',
        meaning: 'Redo button',
        concept: 'redo',
      },
    ],
  },
  {
    name: 'Redo2',
    library: 'lucide-react',
    component: Redo2,
    lucideName: 'redo-2',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: redo',
        concept: 'redo',
      },
    ],
  },
  {
    name: 'RefreshCw',
    library: 'lucide-react',
    component: RefreshCw,
    lucideName: 'refresh-cw',
    usages: [
      {
        location: 'src/renderer/components/sync-status-button.component.tsx',
        meaning: 'Sync status: up to date, ready to sync',
        concept: 'sync-idle',
      },
    ],
  },
  {
    name: 'RemoveFormatting',
    library: 'lucide-react',
    component: RemoveFormatting,
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/src/character-marker-menu.utils.ts',
        meaning: 'Remove the character marker(s) from the selection',
        concept: 'remove-character-marker',
      },
    ],
  },
  {
    name: 'Replace',
    library: 'lucide-react',
    component: Replace,
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Replace the focused result',
        concept: 'replace',
      },
    ],
  },
  {
    name: 'ReplaceAll',
    library: 'lucide-react',
    component: ReplaceAll,
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Replace all results',
        concept: 'replace-all',
      },
    ],
  },
  {
    name: 'RotateCcw',
    library: 'lucide-react',
    component: RotateCcw,
    usages: [
      {
        location:
          'src/renderer/components/settings-tabs/settings-components/zoom-stepper.component.tsx',
        meaning: 'Zoom setting stepper: reset to default',
        concept: 'zoom-reset',
      },
    ],
  },
  {
    name: 'Scan',
    library: 'lucide-react',
    component: Scan,
    lucideName: 'scan',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: reset zoom to default',
        concept: 'zoom-reset',
      },
    ],
  },
  {
    name: 'ScrollText',
    library: 'lucide-react',
    component: ScrollText,
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/home.component.tsx',
        meaning: 'Home: project filter option and project rows',
        concept: 'project',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx',
        meaning: 'Settings sidebar project selector',
        concept: 'project',
      },
    ],
  },
  {
    name: 'Search',
    library: 'lucide-react',
    component: Search,
    lucideName: 'search',
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/basics/search-bar.component.tsx',
        meaning: 'Search bar adornment',
        concept: 'search-field',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu items: open Find',
        concept: 'find',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find-web-view-definition.util.ts',
        meaning: 'Find tab icon',
        concept: 'find',
      },
    ],
  },
  {
    name: 'SearchX',
    library: 'lucide-react',
    component: SearchX,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx',
        meaning: 'No resources match the filter',
        concept: 'no-results',
      },
    ],
  },
  {
    name: 'Settings',
    library: 'lucide-react',
    component: Settings,
    lucideName: 'settings',
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/checks/checks-side-panel/check-card.component.tsx',
        meaning: 'Open the check settings and inventories',
        concept: 'settings',
      },
      {
        location: 'src/extension-host/data/menu.data.json',
        meaning: 'Menu items: open settings, open project settings',
        concept: 'settings',
      },
    ],
  },
  {
    name: 'Settings2',
    library: 'lucide-react',
    component: Settings2,
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx',
        meaning: 'Text collection view options',
        concept: 'view-options',
      },
    ],
  },
  {
    name: 'Shapes',
    library: 'lucide-react',
    component: Shapes,
    usages: [
      {
        location: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
        meaning: 'Resource type filter',
        concept: 'resource-type',
      },
    ],
  },
  {
    name: 'SlidersHorizontal',
    library: 'lucide-react',
    component: SlidersHorizontal,
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/find/find-filters.component.tsx',
        meaning: 'Show the find filters',
        concept: 'filter',
      },
    ],
  },
  {
    name: 'Sparkles',
    library: 'lucide-react',
    component: Sparkles,
    lucideName: 'sparkles',
    usages: [],
  },
  {
    name: 'SquareFunction',
    library: 'lucide-react',
    component: SquareFunction,
    importedAs: ['FunctionSquare'],
    lucideName: 'square-function',
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-type-dropdown.component.tsx',
        meaning: 'Note type: footnote',
        concept: 'footnote',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: insert a footnote',
        concept: 'footnote',
      },
    ],
  },
  {
    name: 'SquareSigma',
    library: 'lucide-react',
    component: SquareSigma,
    lucideName: 'square-sigma',
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-type-dropdown.component.tsx',
        meaning: 'Note type: endnote',
        concept: 'endnote',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: insert an endnote',
        concept: 'endnote',
      },
    ],
  },
  {
    name: 'SquareSplitVertical',
    library: 'lucide-react',
    component: SquareSplitVertical,
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/find/replace-preview-options.component.tsx',
        meaning: 'Replace preview layout option: block',
        concept: 'replace-preview-block-layout',
      },
    ],
  },
  {
    name: 'SquareX',
    library: 'lucide-react',
    component: SquareX,
    lucideName: 'square-x',
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/footnote-editor/footnote-type-dropdown.component.tsx',
        meaning: 'Note type: cross reference',
        concept: 'cross-reference',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: insert a cross reference',
        concept: 'cross-reference',
      },
    ],
  },
  {
    name: 'Star',
    library: 'lucide-react',
    component: Star,
    usages: [
      {
        location:
          'lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx',
        meaning: 'Starred option',
        concept: 'starred',
      },
    ],
  },
  {
    name: 'Sun',
    library: 'lucide-react',
    component: Sun,
    usages: [
      {
        location: 'src/renderer/components/user-profile-popover/user-profile-popover.component.tsx',
        meaning: 'Appearance: light theme',
        concept: 'theme-light',
      },
    ],
  },
  {
    name: 'TextSearch',
    library: 'lucide-react',
    component: TextSearch,
    usages: [
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Find input adornment',
        concept: 'search-field',
      },
    ],
  },
  {
    name: 'Trash2',
    library: 'lucide-react',
    component: Trash2,
    usages: [
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-sidebar.component.tsx',
        meaning: 'Manage books section: delete books',
        concept: 'delete',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
        meaning: 'Apply button: delete books',
        concept: 'delete',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx',
        meaning: 'Delete a comment',
        concept: 'delete',
      },
    ],
  },
  {
    name: 'TriangleAlert',
    library: 'lucide-react',
    component: TriangleAlert,
    importedAs: ['AlertTriangle'],
    usages: [
      {
        location:
          'src/renderer/components/extension-host-stopped-banner/extension-host-stopped-banner.component.tsx',
        meaning: 'Extension host stopped or restarting',
        concept: 'error',
      },
      {
        location: 'src/renderer/components/overlays/overlay-connection-lost.component.tsx',
        meaning: 'Connection lost',
        concept: 'error',
      },
      {
        location: 'extensions/src/platform-scripture/src/components/checklist.component.tsx',
        meaning: 'Checklist error alert',
        concept: 'error',
      },
      {
        location:
          'lib/platform-bible-react/src/components/basics/retryable-error-view.component.tsx',
        meaning: 'Default icon of the retryable error view',
        concept: 'error',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx',
        meaning: 'Book is out of scope',
        concept: 'warning',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/internet-access-option-list/internet-access-option-list.component.tsx',
        meaning: 'Internet access warning',
        concept: 'warning',
      },
    ],
  },
  {
    name: 'Type',
    library: 'lucide-react',
    component: Type,
    usages: [
      {
        location:
          'extensions/src/platform-scripture-editor/src/character-marker-control/character-marker-control.component.tsx',
        meaning: 'Character marker control',
        concept: 'character-marker',
      },
    ],
  },
  {
    name: 'Undo',
    library: 'lucide-react',
    component: Undo,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/basics/undo-redo-buttons.component.tsx',
        meaning: 'Undo button',
        concept: 'undo',
      },
    ],
  },
  {
    name: 'Undo2',
    library: 'lucide-react',
    component: Undo2,
    lucideName: 'undo-2',
    usages: [
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: undo',
        concept: 'undo',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/comment-list/comment-item.component.tsx',
        meaning: 'Cancel the comment edit',
        concept: 'cancel',
      },
    ],
  },
  {
    name: 'User',
    library: 'lucide-react',
    component: User,
    usages: [
      {
        location: 'src/renderer/components/user-profile-popover/user-profile-popover.component.tsx',
        meaning: 'Open profile and registration',
        concept: 'user-profile',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx',
        meaning: 'Number of users of an extension',
        concept: 'user-count',
      },
    ],
  },
  {
    name: 'Users',
    library: 'lucide-react',
    component: Users,
    lucideName: 'users',
    usages: [
      {
        location: 'src/extension-host/data/menu.data.json',
        meaning: 'Main menu item: visit the community support page',
        concept: 'community-support',
      },
    ],
  },
  {
    name: 'Wifi',
    library: 'lucide-react',
    component: Wifi,
    usages: [
      {
        location: 'src/renderer/components/user-profile-popover/user-profile-popover.component.tsx',
        meaning: 'Open network settings',
        concept: 'network-settings',
      },
    ],
  },
  {
    name: 'X',
    library: 'lucide-react',
    component: X,
    usages: [
      {
        location: 'src/renderer/components/dialogs/team-layout.component.tsx',
        meaning: 'Close the team layout dialog',
        concept: 'close',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/search-result.component.tsx',
        meaning: 'Dismiss a search result',
        concept: 'close',
      },
      {
        location: 'extensions/src/platform-scripture/src/find/find.component.tsx',
        meaning: 'Clear the find input',
        concept: 'close',
      },
      {
        location: 'extensions/src/platform-scripture/src/components/checklist.component.tsx',
        meaning: 'Dismiss the error and the help text',
        concept: 'close',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/toolbar/toolbar.component.tsx',
        meaning: 'Clear the filter input',
        concept: 'close',
      },
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/warning-ribbons/warning-ribbons.component.tsx',
        meaning: 'Dismiss a warning ribbon',
        concept: 'close',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid.component.tsx',
        meaning: 'Close the chapter context',
        concept: 'close',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/platform-scripture-editor-footnotes.component.tsx',
        meaning: 'Close the footnotes pane',
        concept: 'close',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/copyright-notice/copyright-notice-banner.component.tsx',
        meaning: 'Dismiss the copyright notice',
        concept: 'close',
      },
      {
        location:
          'extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx',
        meaning: 'Remove a resource from the collection',
        concept: 'close',
      },
      {
        location: 'lib/platform-bible-react/src/components/advanced/filter.component.tsx',
        meaning: 'Remove a selected filter value',
        concept: 'close',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx',
        meaning: 'Remove a resource',
        concept: 'close',
      },
      {
        location: 'lib/platform-bible-react/src/components/basics/search-bar.component.tsx',
        meaning: 'Clear the search',
        concept: 'close',
      },
      {
        location:
          'lib/platform-bible-react/src/components/basics/cancel-accept-buttons.component.tsx',
        meaning: 'Cancel',
        concept: 'cancel',
      },
      {
        location:
          'extensions/src/platform-scripture/src/checks/checks-side-panel/check-card.component.tsx',
        meaning: 'Deny a check result',
        concept: 'deny-check',
      },
      {
        location:
          'extensions/src/platform-scripture/src/manage-books-dialog/book-grid.component.tsx',
        meaning: 'Book is untracked',
        concept: 'untracked',
      },
    ],
  },
  {
    name: 'ZoomIn',
    library: 'lucide-react',
    component: ZoomIn,
    lucideName: 'zoom-in',
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/media-viewer/media-viewer.component.tsx',
        meaning: 'Zoom in on the media',
        concept: 'zoom-in',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: zoom in',
        concept: 'zoom-in',
      },
    ],
  },
  {
    name: 'ZoomOut',
    library: 'lucide-react',
    component: ZoomOut,
    lucideName: 'zoom-out',
    usages: [
      {
        location:
          'extensions/src/platform-enhanced-resources/src/components/media-viewer/media-viewer.component.tsx',
        meaning: 'Zoom out of the media',
        concept: 'zoom-out',
      },
      {
        location: 'extensions/src/platform-scripture-editor/contributions/menus.json',
        meaning: 'Editor menu item: zoom out',
        concept: 'zoom-out',
      },
    ],
  },
  {
    name: 'IconAlertOctagon',
    library: '@tabler/icons-react',
    component: IconAlertOctagon,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/sonner.tsx',
        meaning: 'Error toast',
        concept: 'error',
      },
    ],
  },
  {
    name: 'IconAlertTriangle',
    library: '@tabler/icons-react',
    component: IconAlertTriangle,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/sonner.tsx',
        meaning: 'Warning toast',
        concept: 'warning',
      },
    ],
  },
  {
    name: 'IconCheck',
    library: '@tabler/icons-react',
    component: IconCheck,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/advanced/menus/menu-icon.component.tsx',
        meaning: 'Checked menu item',
        concept: 'selected',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx',
        meaning: 'Checked menubar item',
        concept: 'selected',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/command.tsx',
        meaning: 'Checked command item',
        concept: 'selected',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/context-menu.tsx',
        meaning: 'Checked context menu item',
        concept: 'selected',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx',
        meaning: 'Checked checkbox',
        concept: 'selected',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/select.tsx',
        meaning: 'Selected option',
        concept: 'selected',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx',
        meaning: 'Checked dropdown menu item',
        concept: 'selected',
      },
    ],
  },
  {
    name: 'IconChevronDown',
    library: '@tabler/icons-react',
    component: IconChevronDown,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/select.tsx',
        meaning: 'Scroll the select list down',
        concept: 'scroll-list-down',
      },
    ],
  },
  {
    name: 'IconChevronLeft',
    library: '@tabler/icons-react',
    component: IconChevronLeft,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx',
        meaning: 'Submenu indicator, right-to-left',
        concept: 'submenu',
        isMirrored: true,
      },
    ],
  },
  {
    name: 'IconChevronRight',
    library: '@tabler/icons-react',
    component: IconChevronRight,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx',
        meaning: 'Submenu indicator',
        concept: 'submenu',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/context-menu.tsx',
        meaning: 'Submenu indicator',
        concept: 'submenu',
      },
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx',
        meaning: 'Submenu indicator',
        concept: 'submenu',
      },
    ],
  },
  {
    name: 'IconChevronUp',
    library: '@tabler/icons-react',
    component: IconChevronUp,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/select.tsx',
        meaning: 'Scroll the select list up',
        concept: 'scroll-list-up',
      },
    ],
  },
  {
    name: 'IconCircleCheck',
    library: '@tabler/icons-react',
    component: IconCircleCheck,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/sonner.tsx',
        meaning: 'Success toast',
        concept: 'success',
      },
    ],
  },
  {
    name: 'IconInfoCircle',
    library: '@tabler/icons-react',
    component: IconInfoCircle,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/sonner.tsx',
        meaning: 'Info toast',
        concept: 'info-notice',
      },
    ],
  },
  {
    name: 'IconLayoutSidebar',
    library: '@tabler/icons-react',
    component: IconLayoutSidebar,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx',
        meaning: 'Toggle the sidebar on the primary side',
        concept: 'toggle-sidebar',
      },
    ],
  },
  {
    name: 'IconLayoutSidebarRight',
    library: '@tabler/icons-react',
    component: IconLayoutSidebarRight,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx',
        meaning: 'Toggle the sidebar on the secondary side',
        concept: 'toggle-sidebar',
        isMirrored: true,
      },
    ],
  },
  {
    name: 'IconLoader',
    library: '@tabler/icons-react',
    component: IconLoader,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/sonner.tsx',
        meaning: 'Loading toast',
        concept: 'loading',
      },
    ],
  },
  {
    name: 'IconSearch',
    library: '@tabler/icons-react',
    component: IconSearch,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/command.tsx',
        meaning: 'Command input adornment',
        concept: 'search-field',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/interface-language-picker/interface-language-picker.component.tsx',
        meaning: 'Language search input adornment',
        concept: 'search-field',
      },
    ],
  },
  {
    name: 'IconSelector',
    library: '@tabler/icons-react',
    component: IconSelector,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/select.tsx',
        meaning: 'Select trigger',
        concept: 'open-dropdown',
      },
      {
        location:
          'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx',
        meaning: 'Book Chapter Control trigger',
        concept: 'open-dropdown',
      },
    ],
  },
  {
    name: 'IconX',
    library: '@tabler/icons-react',
    component: IconX,
    usages: [
      {
        location: 'lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx',
        meaning: 'Close a dialog',
        concept: 'close',
      },
    ],
  },
];

/**
 * The catalog's assessment of every conflict `findIconConflicts` detects, keyed by conflict id:
 * `icon:<name>` for one icon with several meanings, `concept:<concept>` for one meaning drawn with
 * several icons. `icon-usage.data.test.ts` requires exactly one note per detected conflict, so a
 * change that creates a conflict or resolves one must update this list.
 */
export const ICON_CONFLICT_NOTES: Record<string, IconConflictNote> = {
  // ---- One meaning, several icons ----
  'concept:bible-texts-panel': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use BookOpen, the resource icon, for the Bible texts panel. The menu item shows Book today while the panel tab it opens shows BookOpen; move the menu item to BookOpen.',
  },
  'concept:cancel': {
    severity: 'acceptable',
    recommendation:
      'X cancels a dialog; Undo2 cancels an in-progress comment edit, chosen deliberately because Trash2 and X were already taken on that card. Keep both, but do not add a third.',
  },
  'concept:checks': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use CircleCheck (the round circle check) for Checks. The menu item shows CircleCheckBig and the Checks tab shows ClipboardCheck today; move both to CircleCheck.',
  },
  'concept:close': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: no Tabler icons. Every close/dismiss/clear control uses lucide X except the shadcn dialog, which uses tabler IconX; replace it with lucide X.',
  },
  'concept:collapsed': {
    severity: 'fix',
    recommendation:
      'Collapsed sections show ChevronRight in most places, but the developer section and comment replies show ChevronDown when collapsed (and Up when expanded). Use ChevronRight → ChevronDown (rotate) for disclosure everywhere.',
  },
  'concept:commentaries-panel': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use BookMarked for the commentaries panel, in the menu item and the panel tab. The tab shows FileText today, which is also the "show footnotes" icon; stop using FileText for commentaries.',
  },
  'concept:copy-to-clipboard': {
    severity: 'review',
    recommendation:
      'Copy is used for copying to the clipboard everywhere except the editor\'s "Copy" menu item, which uses ClipboardCopy. Use Copy.',
  },
  'concept:edit': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use Pen for edit. Edit actions use Pencil today and the registration "Change" button uses Pen; replace Pencil with Pen.',
  },
  'concept:error': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: CircleAlert for errors, TriangleAlert for warnings, so the two can be told apart by shape. Errors use CircleAlert (alerts), TriangleAlert (banners, the checklist, the default retryable error) and tabler IconAlertOctagon (toasts) today; move the TriangleAlert and IconAlertOctagon errors to CircleAlert.',
  },
  'concept:expanded': {
    severity: 'fix',
    recommendation:
      'See "Collapsed section": expanded sections show ChevronDown except comment replies, which show ChevronUp. Use ChevronDown.',
  },
  'concept:filter': {
    severity: 'review',
    recommendation:
      'Filters use Funnel (imported as Filter), but the Find filters toggle uses SlidersHorizontal. Use Funnel unless the Find panel deliberately means "options" rather than "filter".',
  },
  'concept:get-resources': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use Download for Get Resources. The "Get resources" menu item shows Download; the Get Resources dialog header shows BookOpen (the generic resource icon) today; move the header to Download and keep BookOpen for resource rows.',
  },
  'concept:help': {
    severity: 'review',
    recommendation:
      'Help links use CircleQuestionMark, but the enhanced resources guide button uses Info. Use CircleQuestionMark for help and guides; keep Info for descriptions.',
  },
  'concept:import-books': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: always use the lucide Import icon for import. Manage books shows FolderInput for "Import" in the sidebar and Download on the Import apply button today; replace both with Import.',
  },
  'concept:info-notice': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: no Tabler icons. Info notices use lucide Info; toasts use tabler IconInfoCircle. Replace the toast icons with their lucide equivalents (Info, CircleCheck, TriangleAlert, CircleAlert, LoaderCircle).',
  },
  'concept:language': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use Languages for language. The resource language filter uses Globe and the interface language picker uses Languages; move the filter to Languages.',
  },
  'concept:loading': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: no Tabler icons. Loading uses lucide LoaderCircle (via Spinner) everywhere except toasts, which use tabler IconLoader; replace it with LoaderCircle.',
  },
  'concept:more-actions': {
    severity: 'review',
    recommendation:
      'Row and card action menus use Ellipsis in some places and EllipsisVertical in others. Pick one convention (for example vertical for cards and table rows, horizontal for inline toolbars) and document it.',
  },
  'concept:more-info': {
    severity: 'review',
    recommendation:
      'Info is the "more information" icon almost everywhere; the marker settings dialog uses CircleQuestionMark (HelpCircle). Use Info.',
  },
  'concept:navigate-back': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use ArrowLeft for back (mirrored in right-to-left). Back buttons use ArrowLeft except the enhanced resources dictionary list, which uses ArrowUp; move it to ArrowLeft.',
  },
  'concept:open-dropdown': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: no Tabler icons. Dropdown triggers use ChevronDown (single choice), ChevronsUpDown (multi choice, dock tab overflow) and tabler IconSelector (shadcn Select, Book Chapter Control); replace IconSelector with lucide ChevronsUpDown, the same shape. Keep ChevronsUpDown for selects and ChevronDown for menus and popovers.',
  },
  'concept:opens-externally': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use ExternalLink for anything that opens outside the app. The extension website link uses Link; move it to ExternalLink.',
  },
  'concept:project': {
    severity: 'review',
    recommendation:
      'Projects are ScrollText on Home and in Settings, but FolderOpen in the select-project dialogs. Use ScrollText.',
  },
  'concept:redo': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use Undo2 / Redo2 everywhere. The editor menu uses Redo2 while the shared UndoRedoButtons component uses Redo; move UndoRedoButtons to Redo2.',
  },
  'concept:search-field': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: use lucide Search for every search field. Search inputs show lucide Search (SearchBar), lucide TextSearch (Find) and tabler IconSearch (Command, language picker) today; replace TextSearch and IconSearch with Search.',
  },
  'concept:selected': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: no Tabler icons; a checkmark means checked or selected. Selection marks use lucide Check in components and tabler IconCheck in the shadcn primitives; replace IconCheck with lucide Check.',
  },
  'concept:sort-ascending': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: sort with ArrowUp / ArrowDown, so sort arrows are not confused with dropdown chevrons. Ascending sort is ArrowUp in the inventory and ChevronUp on Home and Get Resources; move ChevronUp to ArrowUp. For unsorted columns, see "ChevronsUpDown".',
  },
  'concept:sort-descending': {
    severity: 'fix',
    decided: true,
    recommendation: 'Decided: see "Sorted ascending": use ArrowDown.',
  },
  'concept:submit': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: never use ArrowUp or Check for submit: ArrowUp is for sorting and a checkmark means checked or selected. Dialogs submit with Check and comment boxes with ArrowUp today; both change. The submit icon is to be chosen by UX.',
  },
  'concept:success': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: no Tabler icons. Toasts use tabler IconCircleCheck; replace it with lucide CircleCheck.',
  },
  'concept:undo': {
    severity: 'fix',
    decided: true,
    recommendation: 'Decided: see "Redo": use Undo2.',
  },
  'concept:user-profile': {
    severity: 'review',
    recommendation:
      'The toolbar profile button shows CircleUserRound; the "Profile and registration" item inside it shows User. Use CircleUserRound for both.',
  },
  'concept:warning': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: TriangleAlert for every warning, CircleAlert for errors. Warnings use TriangleAlert, CircleAlert (registration notice, extension host restarting), Info (enhanced resources warning ribbons) and tabler IconAlertTriangle (toasts) today; move the CircleAlert, Info and IconAlertTriangle warnings to TriangleAlert.',
  },
  'concept:zoom-in': {
    severity: 'acceptable',
    recommendation:
      'Zoom actions use ZoomIn; the zoom setting stepper uses Plus, the standard shape for a numeric stepper. Keep.',
  },
  'concept:zoom-out': {
    severity: 'acceptable',
    recommendation: 'See "Zoom in": the stepper uses Minus. Keep.',
  },
  'concept:zoom-reset': {
    severity: 'review',
    recommendation:
      'Reset zoom is Scan in the editor menu and RotateCcw in the zoom setting stepper. Pick one; RotateCcw reads more clearly as "reset".',
  },

  // ---- One icon, several meanings ----
  'icon:ArrowLeft': {
    severity: 'review',
    recommendation:
      'ArrowLeft means "back" everywhere except the data table pagination, where it means "first page". Use ChevronsLeft for the first page (and ChevronsRight for the last).',
  },
  'icon:ArrowRight': {
    severity: 'review',
    recommendation:
      'ArrowRight means "replace with" in Find, "forward" in history, "last page" in pagination and "open" in the project selector. Move "last page" to ChevronsRight; the rest are distinct enough in context.',
  },
  'icon:ArrowUp': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: ArrowUp is for sorting (with ArrowDown). It also means submit (comments) and back (enhanced resources dictionary) today: move back to ArrowLeft and submit to the submit icon UX chooses (see "Submit or confirm").',
  },
  'icon:Ban': {
    severity: 'review',
    recommendation:
      'Ban means "no grouping" in the book grid and is the fallback for marker menu items without an icon, where it can read as "forbidden". Consider an empty slot for the fallback.',
  },
  'icon:BookA': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: BookA stays the dictionary icon. It also marks "Book names" in Manage books and the lexical semantic domain; give "Book names" a different icon, to be chosen by UX.',
  },
  'icon:Book': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: see "Bible texts panel": the Bible texts menu item moves to BookOpen, which leaves Book only for "verse text hidden" in the checklist.',
  },
  'icon:BookOpen': {
    severity: 'review',
    recommendation:
      'Decided in part: BookOpen is the resource icon and the Bible texts panel icon (menu and tab), and the Get Resources header moves to Download. Still open: "verse text shown" in the checklist; consider Eye/EyeOff or Text for the checklist verse-text toggle.',
  },
  'icon:Check': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: a checkmark means checked or selected, so stop using Check for submit (see "Submit or confirm"). Its other meanings (selected, done, resolve, allow) are compatible; keep those.',
  },
  'icon:ChevronDown': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: move sorting to arrows (see "Sorted descending"). Opening dropdowns, marking expanded sections and stepping to the next verse or search result are conventional; keep those.',
  },
  'icon:ChevronLeft': {
    severity: 'acceptable',
    recommendation: 'Previous page and previous media item: the same idea in two widgets. Keep.',
  },
  'icon:ChevronRight': {
    severity: 'acceptable',
    recommendation:
      'Collapsed section, breadcrumb separator, next page and next media item are all conventional uses of ChevronRight. Keep.',
  },
  'icon:ChevronUp': {
    severity: 'fix',
    recommendation:
      'Decided in part: sorting moves to ArrowUp (see "Sorted ascending"). ChevronUp also steps to the previous verse or search result, scrolls to the top, and marks expanded comment replies; move expanded replies to ChevronDown (see "Expanded section").',
  },
  'icon:ChevronsUpDown': {
    severity: 'review',
    recommendation:
      'ChevronsUpDown opens multi-select dropdowns and also marks an unsorted, sortable column. Use ArrowUpDown for sortable columns.',
  },
  'icon:CircleAlert': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: CircleAlert is for errors only; move its warning uses to TriangleAlert (see "Warning").',
  },
  'icon:CircleCheck': {
    severity: 'acceptable',
    decided: true,
    recommendation:
      'Decided: CircleCheck is also the Checks icon (see "Checks"), alongside success and "approved" in the inventory. Keep.',
  },
  'icon:CircleQuestionMark': {
    severity: 'review',
    recommendation:
      'CircleQuestionMark means help, more information and "unknown status" (sync, inventory). "Unknown" is a status, not an action; consider CircleDashed for unknown.',
  },
  'icon:Copy': {
    severity: 'acceptable',
    recommendation:
      'Copy means copy to the clipboard and copy books into another project; both are "copy". Keep.',
  },
  'icon:Download': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: Download is for getting resources (the "Get resources" menu item and the Get Resources header); move import to the lucide Import icon (see "Import books").',
  },
  'icon:Ellipsis': {
    severity: 'acceptable',
    recommendation:
      'Actions menus and a collapsed breadcrumb are both conventional for Ellipsis. Keep.',
  },
  'icon:Eye': {
    severity: 'review',
    recommendation:
      'Eye means "preview options", "matches shown" and "switch Scripture view". Consider a dedicated icon for switching views (for example Columns2).',
  },
  'icon:FileText': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: FileText stays "show footnotes" in the editor menu; the commentaries panel tab moves to BookMarked (see "Commentaries panel").',
  },
  'icon:FolderOpen': {
    severity: 'review',
    recommendation: 'See "Paratext project": keep FolderOpen for browsing files only.',
  },
  'icon:Funnel': {
    severity: 'fix',
    recommendation:
      'Funnel means filter, but the data table "View" button uses it to choose visible columns. Use Columns3 or Settings2 there.',
  },
  'icon:Info': {
    severity: 'fix',
    recommendation:
      'Decided in part: the enhanced resources warning ribbons move to TriangleAlert (see "Warning"). Keep Info for notices and descriptions; see "Help or guide" for the guide button.',
  },
  'icon:Minus': {
    severity: 'acceptable',
    recommendation:
      'Stepper decrease and "removed text" in a replace preview. Distinct contexts; keep.',
  },
  'icon:Plus': {
    severity: 'acceptable',
    recommendation: 'New tab, stepper increase and "added text". Distinct contexts; keep.',
  },
  'icon:Search': {
    severity: 'acceptable',
    decided: true,
    recommendation:
      'Decided: Search is the search icon everywhere, so the Find panel and a search field adornment share it. Keep.',
  },
  'icon:Undo2': {
    severity: 'acceptable',
    recommendation: 'See "Cancel": a deliberate choice on the comment card. Keep.',
  },
  'icon:User': {
    severity: 'review',
    recommendation:
      'See "User profile": use Users for the extension user count if User moves to the profile.',
  },
  'icon:X': {
    severity: 'review',
    recommendation:
      'X closes, dismisses, clears and removes (fine), cancels (fine), but also denies a check result and marks a book as untracked. Consider Ban for "deny" and a status icon for "untracked".',
  },
  'icon:TriangleAlert': {
    severity: 'fix',
    decided: true,
    recommendation:
      'Decided: TriangleAlert is for warnings only; move its error uses to CircleAlert (see "Error").',
  },
};
