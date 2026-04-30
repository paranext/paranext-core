/* eslint-disable -- Frozen design artifact from paranext-core PR #2224 (Sebastian Wiehe).
 * 6 inline-twin variant prototypes (ViewListSelect/Unified/ActionFirst/SelectionFirst/
 * GroupedSelectionFirst/FutureOutlook). Per FN-008 we treat the stories file as documentation
 * of Sebastian's design exploration rather than a maintained Storybook test surface. Lint
 * compliance is not pursued; phase-3-ui will write a fresh STORY-004-conforming story for the
 * production component instead. */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Ban,
  BarChart3,
  BookA,
  BookOpenCheck,
  BookPlus,
  BookText,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FolderInput,
  FolderOpen,
  LayoutGrid,
  List,
  Loader2,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/shadcn-ui/dialog';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { BookSelector } from '@/components/advanced/scope-selector/book-selector.component';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Separator } from '@/components/shadcn-ui/separator';
import { Badge } from '@/components/shadcn-ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { SearchBar } from '@/components/basics/search-bar.component';
import {
  ManageBooksDialog as SharedManageBooksDialog,
  type ManageBooksDialogProject,
  type ManageBooksDialogBookInfo,
  type ManageBooksCreateMethod as SharedCreateMethod,
  type ManageBooksImportFile as SharedImportFile,
  type ManageBooksImportStrategy as SharedImportStrategy,
} from '@/components/advanced/manage-books-dialog/manage-books-dialog.component';
import { ManageBooksDialogWithScope } from './manage-books-dialog-with-scope.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon } from '@sillsdev/scripture';
import {
  DC_BOOK_IDS,
  NT_BOOK_IDS,
  OT_BOOK_IDS,
  PROJECT_SCOPES,
  PROJECT_SCOPE_ABBREVIATIONS,
  doesBookFitScope,
  type ProjectScope,
  type ProjectScopeId,
} from 'platform-bible-utils';

// --------------------------------------------------------------------------
// Draft/prototype only: consolidates the manage-books sub-screens from
// ui-alignment.md onto a single dialog with a left sidebar for navigation.
// Book selection reuses the shared BookSelector component. Mock data;
// no backend wiring.
// --------------------------------------------------------------------------

type SectionId =
  | 'show'
  | 'create'
  | 'delete'
  | 'copy'
  | 'import'
  | 'show-progress'
  | 'book-names'
  | 'introductions';

type SectionDef = {
  id: SectionId;
  title: string;
  subtitle: string;
  Icon: typeof BookOpenCheck;
  /** When set, render this headline above the button so neighbouring sections read as a group. */
  groupStart?: string;
};

const SECTIONS: SectionDef[] = [
  { id: 'show', title: 'Show Books', subtitle: 'View books in this project', Icon: BookOpenCheck },
  { id: 'create', title: 'Create Books', subtitle: 'Add new books', Icon: BookPlus },
  { id: 'delete', title: 'Delete Books', subtitle: 'Remove books', Icon: Trash2 },
  { id: 'copy', title: 'Copy Books', subtitle: 'Copy between projects', Icon: Copy },
  { id: 'import', title: 'Import Books', subtitle: 'Import from files', Icon: FolderInput },
];

// Sidebar layout used by the view-list variant. Show Books sits at the top alone;
// Create / Copy / Import / Delete form the "Manage Project Books" group; Progress
// tracking, Book Names, and Introductions form the "Reference" group at the bottom.
const VIEW_LIST_SECTIONS: SectionDef[] = [
  { id: 'show', title: 'Show Books', subtitle: 'View books in this project', Icon: BookOpenCheck },
  {
    id: 'create',
    title: 'Create Books',
    subtitle: 'Add new books',
    Icon: BookPlus,
    groupStart: 'Manage Project Books',
  },
  { id: 'copy', title: 'Copy Books', subtitle: 'Copy between projects', Icon: Copy },
  { id: 'import', title: 'Import Books', subtitle: 'Import from files', Icon: FolderInput },
  // Delete sits under Import per the latest sidebar layout — it's the destructive verb,
  // so it reads as the trailing option rather than mid-list.
  { id: 'delete', title: 'Delete Books', subtitle: 'Remove books', Icon: Trash2 },
  // Progress tracking and Book Names sit directly above Introductions, all under one
  // "Reference" header — they're the project-wide reading / planning surfaces.
  {
    id: 'show-progress',
    title: 'Progress tracking',
    subtitle: 'Start, stop, and review tracking',
    Icon: BarChart3,
    groupStart: 'Reference',
  },
  {
    id: 'book-names',
    title: 'Book Names',
    subtitle: 'Edit short and long book names (TOC1–3)',
    Icon: BookA,
  },
  {
    id: 'introductions',
    title: 'Introductions',
    subtitle: 'Compare introductory USFM across projects',
    Icon: BookText,
  },
];

// Use the canonical book lists from platform-bible-utils so OT / NT / DC stay consistent
// with the rest of the platform (and so we automatically pick up the full Deuterocanon
// rather than the abbreviated five-book sample we used to hard-code here).
const OT_BOOKS = OT_BOOK_IDS;
const NT_BOOKS = NT_BOOK_IDS;
const DC_BOOKS = DC_BOOK_IDS;
// Anything in the canon outside OT / NT / DC — e.g. front/back matter, glossary,
// indexing — counts as "extra". The Manage Books grid renders these in their own
// trailing group so users can see and act on them just like canonical books.
const KNOWN_BOOK_IDS = new Set([...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS]);
const EXTRA_BOOKS: string[] = Canon.allBookIds.filter((id) => !KNOWN_BOOK_IDS.has(id));
// Full ordered list of every book id the grid can show.
const ALL_BOOKS: string[] = [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS, ...EXTRA_BOOKS];

/**
 * Like `doesBookFitScope`, but treats "extra" books (front/back matter, glossary, etc.) as always
 * in-scope. The user-defined project scopes only describe canonical OT/NT/DC books, so applying
 * them to extras would falsely mark every extra as out-of-scope. The UI uses this helper everywhere
 * a book's scope membership feeds an "Out of scope" indicator.
 */
function bookIsInScope(scope: ProjectScope, book: string): boolean {
  if (!KNOWN_BOOK_IDS.has(book)) return true;
  return doesBookFitScope(scope, book);
}

const MOCK_PROJECTS = [
  { id: 'WEB', shortName: 'WEB', name: 'World English Bible' },
  { id: 'KJV', shortName: 'KJV', name: 'King James Version' },
  { id: 'NIV', shortName: 'NIV', name: 'New International Version' },
  { id: 'NLT', shortName: 'NLT', name: 'New Living Translation' },
  // Non-English projects so the Book Names workflow has obvious per-project differences
  // — Spanish (Reina-Valera 1960) and French (Louis Segond 1910).
  { id: 'RVR', shortName: 'RVR60', name: 'Reina-Valera 1960 (Español)' },
  { id: 'LSG', shortName: 'LSG', name: 'Louis Segond 1910 (Français)' },
  // Demonstrates the unregistered-project sidebar affordance — no scope, so the sidebar
  // shows the "Not registered" cue with a tooltip prompting the user to register.
  { id: 'DRAFT', shortName: 'DRAFT', name: 'Local Draft (unregistered)' },
];

/**
 * Per-project localized book names. Demonstrates how the Book Names workflow surfaces
 * project-specific TOC strings — Spanish, French, and a small handful of other languages are
 * populated for the books most likely to appear in the prototype.
 */
const PROJECT_LOCALIZED_BOOK_NAMES: Record<
  string,
  Record<string, { toc1: string; toc2: string; toc3: string }>
> = {
  RVR: {
    GEN: { toc1: 'Génesis', toc2: 'Génesis', toc3: 'Gn' },
    EXO: { toc1: 'Éxodo', toc2: 'Éxodo', toc3: 'Ex' },
    LEV: { toc1: 'Levítico', toc2: 'Levítico', toc3: 'Lv' },
    NUM: { toc1: 'Números', toc2: 'Números', toc3: 'Nm' },
    DEU: { toc1: 'Deuteronomio', toc2: 'Deuteronomio', toc3: 'Dt' },
    MAT: { toc1: 'San Mateo', toc2: 'Mateo', toc3: 'Mt' },
    MRK: { toc1: 'San Marcos', toc2: 'Marcos', toc3: 'Mr' },
    LUK: { toc1: 'San Lucas', toc2: 'Lucas', toc3: 'Lc' },
    JHN: { toc1: 'San Juan', toc2: 'Juan', toc3: 'Jn' },
    ACT: { toc1: 'Hechos', toc2: 'Hechos', toc3: 'Hch' },
    ROM: { toc1: 'Romanos', toc2: 'Romanos', toc3: 'Ro' },
  },
  LSG: {
    GEN: { toc1: 'Genèse', toc2: 'Genèse', toc3: 'Gn' },
    EXO: { toc1: 'Exode', toc2: 'Exode', toc3: 'Ex' },
    LEV: { toc1: 'Lévitique', toc2: 'Lévitique', toc3: 'Lv' },
    NUM: { toc1: 'Nombres', toc2: 'Nombres', toc3: 'Nb' },
    DEU: { toc1: 'Deutéronome', toc2: 'Deutéronome', toc3: 'Dt' },
    MAT: { toc1: 'Évangile selon Matthieu', toc2: 'Matthieu', toc3: 'Mt' },
    MRK: { toc1: 'Évangile selon Marc', toc2: 'Marc', toc3: 'Mc' },
    LUK: { toc1: 'Évangile selon Luc', toc2: 'Luc', toc3: 'Lc' },
    JHN: { toc1: 'Évangile selon Jean', toc2: 'Jean', toc3: 'Jn' },
    ACT: { toc1: 'Actes des Apôtres', toc2: 'Actes', toc3: 'Ac' },
    ROM: { toc1: 'Épître aux Romains', toc2: 'Romains', toc3: 'Rm' },
  },
};

// Which books are present in each project (mock). Used to derive availableBookInfo
// for the BookSelector in Create/Delete flows. KJV is the "full" reference project with
// all 66 canonical books; the others are partial so Copy/Import comparisons are varied.
const PROJECT_PRESENT_BOOKS: Record<string, Set<string>> = {
  WEB: new Set(['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM']),
  KJV: new Set([...OT_BOOKS, ...NT_BOOKS]),
  NIV: new Set(['GEN', 'EXO', 'LEV', 'NUM', 'MAT', 'MRK']),
  NLT: new Set(['MAT', 'MRK', 'LUK', 'JHN']),
  RVR: new Set([...OT_BOOKS, ...NT_BOOKS]),
  LSG: new Set(['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM']),
  DRAFT: new Set(['MAT', 'MRK']),
};

// Which books the project is configured to "track" (its scope). Tracked is a subset of
// present — "not in project" is always "not tracked", so the tracking workflows only need
// to reason about present books. Untracked-but-present books are the interesting case and
// get a destructive X icon wherever they appear.
const PROJECT_TRACKED_BOOKS: Record<string, Set<string>> = {
  WEB: new Set(['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'LUK', 'JHN']),
  KJV: new Set([...OT_BOOKS, ...NT_BOOKS]),
  NIV: new Set(['GEN', 'EXO', 'LEV', 'NUM', 'MAT']),
  NLT: new Set(['MAT', 'MRK', 'LUK']),
  RVR: new Set(['GEN', 'EXO', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT']),
  LSG: new Set(['MAT', 'MRK', 'LUK', 'JHN']),
  DRAFT: new Set(['MAT']),
};

/**
 * Builds a 123-char availableBookInfo string for BookSelector. When `mode` is 'absent', only books
 * that are NOT yet in the project are available (used for Create). When 'present', only books that
 * ARE in the project are available (used for Delete).
 */
function buildAvailableBookInfo(projectId: string, mode: 'present' | 'absent'): string {
  const present = PROJECT_PRESENT_BOOKS[projectId] ?? new Set<string>();
  return Canon.allBookIds
    .map((bookId) => {
      const isPresent = present.has(bookId);
      const available = mode === 'present' ? isPresent : !isPresent;
      return available ? '1' : '0';
    })
    .join('');
}

type ComparisonState = 'Same' | 'Newer' | 'Older' | 'Missing' | 'New';
const MOCK_COMPARISON: {
  book: string;
  fromDate?: string;
  toDate?: string;
  state: ComparisonState;
}[] = [
  { book: 'GEN', fromDate: '2024-01-15', toDate: '2024-01-10', state: 'Newer' },
  { book: 'EXO', fromDate: '2024-01-15', state: 'New' },
  { book: 'LEV', fromDate: '2023-12-01', toDate: '2023-12-01', state: 'Same' },
  { book: 'MAT', fromDate: '2024-02-01', toDate: '2024-03-15', state: 'Older' },
  { book: 'MRK', toDate: '2024-01-05', state: 'Missing' },
];

const MOCK_BOOK_SELECTOR_STRINGS = {
  '%webView_book_selector_books_selected%': 'books selected',
  '%webView_book_selector_select_books%': 'Select books',
  '%webView_book_selector_search_books%': 'Search books',
  '%webView_book_selector_select_all%': 'Select all',
  '%webView_book_selector_clear_all%': 'Clear all',
  '%webView_book_selector_no_book_found%': 'No book found',
  '%webView_book_selector_more%': 'more',
  '%scripture_section_ot_long%': 'Old Testament',
  '%scripture_section_nt_long%': 'New Testament',
  '%scripture_section_dc_long%': 'Deuterocanon',
  '%scripture_section_extra_long%': 'Extra',
};

const MOCK_IMPORT_FILES = [
  {
    file: '01_GEN.sfm',
    book: 'GEN',
    fromDate: '2024-01-15',
    toDate: '2024-01-10',
    state: 'Newer' as const,
  },
  { file: '02_EXO.sfm', book: 'EXO', fromDate: '2024-01-15', state: 'New' as const },
  {
    file: '40_MAT.usx',
    book: 'MAT',
    fromDate: '2024-02-01',
    toDate: '2024-03-15',
    state: 'Older' as const,
  },
];

// Prototype scope assignment per project. Each example project is given a distinct scope
// so the four most-common cases (NT-only, full Bible, OT-only, "with portions of OT") all
// appear in the View-list select story alongside the unregistered-project case (NLT) where
// no scope is selected at all. Chosen so at least one project (WEB) contains books outside
// its registered scope, making the unplanned-book indicator visible.
const PROJECT_SCOPE_IDS: Record<string, ProjectScopeId | undefined> = {
  // Distinct scopes across the registered projects so the View-list select story
  // exercises Bible-with-Deuterocanon, plain NT, plain OT, and the "shorter Bible" case
  // all in one place.
  WEB: 'newTestament',
  KJV: 'bibleWithDeuterocanon',
  NIV: 'oldTestament',
  NLT: 'shorterBible',
  RVR: 'bibleWithoutDeuterocanon',
  LSG: 'newTestamentPlusPortionsOfOldTestament',
  // DRAFT is intentionally not registered — the sidebar falls back to the "not
  // registered" affordance (icon when collapsed, text when expanded) instead of a scope
  // label, with a tooltip prompting the user to register.
  DRAFT: undefined,
};

// Short scope abbreviations for the collapsed sidebar are sourced from platform-bible-utils
// (re-aliased here so we don't have to repeat the long import everywhere).
const SCOPE_SHORT_CODES = PROJECT_SCOPE_ABBREVIATIONS;

// --------------------------------------------------------------------------
// Sidebar
// --------------------------------------------------------------------------

function Sidebar({
  active,
  onSelect,
  projectId,
  projectShortName,
  onProjectChange,
  collapsible = false,
  sections = SECTIONS,
  scopeId,
  onOpenScopeRegistry,
  onOpenScopeRegistration,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  projectId: string;
  /** Used in the "Register {short name} to select scope" tooltip when unregistered. */
  projectShortName: string;
  onProjectChange: (id: string) => void;
  /**
   * When true the sidebar shrinks to icons-only below the `sm` breakpoint so the content area can
   * keep enough room on narrow viewports.
   */
  collapsible?: boolean;
  /** Which sections to render. Defaults to the original five. */
  sections?: SectionDef[];
  /**
   * Scope the project is registered with. When undefined the project is treated as unregistered:
   * the sidebar shows a "Not registered" affordance prompting the user to open the registration
   * flow rather than the scope label.
   */
  scopeId?: ProjectScopeId | undefined;
  /** Invoked when the user clicks the registered scope label (open scope in registry). */
  onOpenScopeRegistry?: () => void;
  /** Invoked when the user clicks the "Not registered" affordance (open registration). */
  onOpenScopeRegistration?: () => void;
}) {
  const scope = scopeId ? PROJECT_SCOPES[scopeId] : undefined;
  const scopeShortCode = scopeId ? SCOPE_SHORT_CODES[scopeId] : undefined;
  const registerTooltip = `Register ${projectShortName} to select scope`;
  const changeScopeTooltip = 'Change scope in registration';
  return (
    <nav
      aria-label="Manage Books sections"
      // Capped at 1/3 of the dialog width so the content area is always >= 2/3.
      // When collapsible, the sidebar drops to a fixed icon strip below `sm`.
      className={cn(
        'tw-flex tw-shrink-0 tw-flex-col tw-gap-1 tw-border-r tw-bg-muted/40 tw-p-3',
        collapsible ? 'tw-w-14 sm:tw-w-1/3 sm:tw-max-w-56' : 'tw-w-1/3 tw-max-w-56',
      )}
    >
      {/*
        At short viewport heights (<= 780px) the secondary text — per-section subtext,
        group headlines, and the "Manage Books" heading — is hidden so the section buttons
        themselves stay legible without overflowing. Icon-only collapse stays width-driven.
        `!` prefixes the max-height rules so they reliably beat the width-based `sm:` rules.
      */}
      <div
        className={cn(
          'tw-px-2 tw-pb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground',
          collapsible && 'tw-hidden sm:tw-block',
          '[@media(max-height:780px)]:!tw-hidden',
        )}
      >
        Manage Books
      </div>
      <div
        className={cn(
          'tw-flex tw-flex-col tw-gap-1 tw-px-2 tw-pb-3',
          collapsible && 'tw-hidden sm:tw-flex',
        )}
      >
        <Label htmlFor="sidebar-project" className="tw-text-xs tw-text-muted-foreground">
          Project
        </Label>
        <Select value={projectId} onValueChange={onProjectChange}>
          <SelectTrigger id="sidebar-project" className="tw-h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MOCK_PROJECTS.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {scope ? (
          // Registered: simple "Scope: <name>" label (no badge — the muted "Scope:" prefix
          // is enough to label the value). Wrapped in a tooltip so the user knows clicking
          // takes them to the registration flow to change the scope.
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenScopeRegistry}
                className="tw-mt-1 tw-h-auto tw-justify-start tw-gap-2 tw-py-1 tw-pl-2 tw-pr-2 tw-text-left tw-text-xs tw-font-normal tw-leading-tight"
                aria-label={`Open scope in registry: ${scope.name}`}
              >
                <span className="tw-shrink tw-whitespace-normal">
                  <span className="tw-text-muted-foreground">Scope: </span>
                  {scope.name}
                </span>
                <ExternalLink className="tw-ml-auto tw-h-3 tw-w-3 tw-shrink-0" aria-hidden />
              </Button>
            </TooltipTrigger>
            {/*
              Anchored below so the tooltip never covers the scope name itself — the user
              is most likely hovering to find out what the scope IS, and we shouldn't be
              hiding the answer with the explainer.
            */}
            <TooltipContent side="bottom">{changeScopeTooltip}</TooltipContent>
          </Tooltip>
        ) : (
          // Not registered: same shape as the registered label, but the value is the muted
          // "Not registered" cue and the tooltip prompts the user to register.
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenScopeRegistration}
                className="tw-mt-1 tw-h-auto tw-justify-start tw-gap-2 tw-py-1 tw-pl-2 tw-pr-2 tw-text-left tw-text-xs tw-font-normal tw-leading-tight tw-text-muted-foreground"
                aria-label={registerTooltip}
              >
                <span className="tw-shrink tw-whitespace-normal">Not registered</span>
                <ExternalLink className="tw-ml-auto tw-h-3 tw-w-3 tw-shrink-0" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{registerTooltip}</TooltipContent>
          </Tooltip>
        )}
      </div>
      {collapsible && (
        // Collapsed-mode project picker: an icon button that opens a dropdown, followed by
        // a visual separator before the section icons. Only shown below `sm`.
        <div className="tw-flex tw-flex-col tw-gap-1 sm:tw-hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                title="Project"
                className={cn(
                  'tw-flex tw-items-center tw-justify-center tw-rounded-md tw-p-2 tw-text-sm tw-transition-colors',
                  'hover:tw-bg-accent hover:tw-text-accent-foreground',
                  'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
                )}
              >
                <FolderOpen className="tw-h-4 tw-w-4" aria-hidden />
                <span className="tw-sr-only">Project</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="start" sideOffset={4}>
                {MOCK_PROJECTS.map((p) => (
                  <DropdownMenuItem key={p.id} onSelect={() => onProjectChange(p.id)}>
                    {p.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
          {scope && scopeShortCode ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onOpenScopeRegistry}
                  aria-label={`Open scope in registry: ${scope.name}`}
                  className={cn(
                    'tw-flex tw-items-center tw-justify-center tw-gap-0.5 tw-rounded-md tw-border tw-bg-secondary tw-px-1 tw-py-1 tw-text-[10px] tw-font-semibold tw-text-secondary-foreground tw-transition-colors',
                    'hover:tw-bg-accent hover:tw-text-accent-foreground',
                    'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
                  )}
                >
                  <span className="tw-leading-none">{scopeShortCode}</span>
                  <ExternalLink className="tw-h-2.5 tw-w-2.5" aria-hidden />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="tw-flex tw-flex-col tw-gap-0.5 tw-text-xs">
                  <div>{scope.name}</div>
                  <div className="tw-text-muted-foreground">{changeScopeTooltip}</div>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            // Not registered, collapsed mode: an icon-only affordance — the tooltip carries
            // the prompt to register. Sized to match the project icon button above so the
            // icon strip stays visually consistent.
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onOpenScopeRegistration}
                  aria-label={registerTooltip}
                  className={cn(
                    'tw-flex tw-items-center tw-justify-center tw-rounded-md tw-p-2 tw-text-muted-foreground tw-transition-colors',
                    'hover:tw-bg-accent hover:tw-text-accent-foreground',
                    'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
                  )}
                >
                  <ExternalLink className="tw-h-4 tw-w-4" aria-hidden />
                </button>
              </TooltipTrigger>
              <TooltipContent>{registerTooltip}</TooltipContent>
            </Tooltip>
          )}
          <Separator className="tw-my-1" />
        </div>
      )}
      {sections.map(({ id, title, subtitle, Icon, groupStart }, index) => {
        const isActive = id === active;
        // The first section never gets a separator above it (nothing to separate from).
        // For subsequent sections, a `groupStart` heading also implies a separator so
        // the new group reads as visually distinct from the previous one — the heading
        // alone is too quiet next to a long list of section buttons.
        const showSeparator = !!groupStart && index > 0;
        return (
          <Fragment key={id}>
            {showSeparator && (
              <Separator className={cn('tw-my-1', collapsible && 'tw-hidden sm:tw-block')} />
            )}
            {groupStart && (
              <div
                className={cn(
                  // Tightened spacing above the heading so consecutive groups read as a
                  // visual stack rather than separately gapped sections.
                  'tw-mt-1 tw-px-3 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground',
                  collapsible && 'tw-hidden sm:tw-block',
                  '[@media(max-height:780px)]:!tw-hidden',
                )}
              >
                {groupStart}
              </div>
            )}
            <button
              type="button"
              onClick={() => onSelect(id)}
              aria-current={isActive ? 'page' : undefined}
              // Native tooltip label when the sidebar is collapsed to icons
              title={collapsible ? title : undefined}
              className={cn(
                'tw-flex tw-items-start tw-gap-3 tw-rounded-md tw-px-3 tw-py-2 tw-text-start tw-text-sm tw-transition-colors',
                'hover:tw-bg-accent hover:tw-text-accent-foreground',
                'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
                isActive && 'tw-bg-accent tw-font-medium tw-text-accent-foreground',
                collapsible && 'tw-justify-center sm:tw-justify-start',
              )}
            >
              <Icon className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0" aria-hidden />
              <span className={cn('tw-flex tw-flex-col', collapsible && 'tw-hidden sm:tw-flex')}>
                <span>{title}</span>
                <span
                  className={cn(
                    'tw-text-xs tw-font-normal tw-text-muted-foreground',
                    '[@media(max-height:780px)]:!tw-hidden',
                  )}
                >
                  {subtitle}
                </span>
              </span>
            </button>
          </Fragment>
        );
      })}
    </nav>
  );
}

// --------------------------------------------------------------------------
// Shared layout for a section: header, scrollable body, footer
// --------------------------------------------------------------------------

function SectionFrame({
  title,
  description,
  footer,
  footerStart,
  children,
}: {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  /** Content rendered on the left side of the footer; typically a "{x} of {y}" counter. */
  footerStart?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
      <header className="tw-border-b tw-px-6 tw-py-4">
        <h2 className="tw-text-lg tw-font-semibold">{title}</h2>
        {description && (
          <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground [@media(max-height:780px)]:!tw-hidden">
            {description}
          </p>
        )}
      </header>
      <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-6 tw-py-4">{children}</div>
      {(footer || footerStart) && (
        <footer className="tw-flex tw-items-center tw-gap-2 tw-border-t tw-px-6 tw-py-3">
          {footerStart && (
            <div className="tw-flex tw-items-center tw-text-xs tw-text-muted-foreground">
              {footerStart}
            </div>
          )}
          {footer && <div className="tw-ml-auto tw-flex tw-items-center tw-gap-2">{footer}</div>}
        </footer>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// SCR-001 Show Books
// --------------------------------------------------------------------------

function ShowBooksSection({
  projectId,
  projectName,
  onClose,
}: {
  projectId: string;
  projectName: string;
  onClose: () => void;
}) {
  const all = useMemo(() => [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS], []);
  const present = PROJECT_PRESENT_BOOKS[projectId] ?? new Set<string>();
  return (
    <SectionFrame
      title={`Show Books: ${projectName}`}
      description="Books that currently exist in this project are marked with a check."
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <ul className="tw-grid tw-grid-cols-3 tw-gap-1 tw-text-sm sm:tw-grid-cols-4 md:tw-grid-cols-5">
        {all.map((book) => {
          const isPresent = present.has(book);
          return (
            <li
              key={book}
              className={cn(
                'tw-flex tw-items-center tw-gap-2 tw-rounded tw-border tw-px-2 tw-py-1',
                isPresent
                  ? 'tw-border-primary/40 tw-bg-primary/5'
                  : 'tw-border-border tw-text-muted-foreground',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'tw-inline-block tw-h-2.5 tw-w-2.5 tw-rounded-full',
                  isPresent ? 'tw-bg-primary' : 'tw-bg-muted',
                )}
              />
              <span>{book}</span>
            </li>
          );
        })}
      </ul>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// SCR-002 Create Books
// --------------------------------------------------------------------------

function CreateBooksSection({
  projectId,
  projectName,
  projectShortName,
  onClose,
}: {
  projectId: string;
  projectName: string;
  projectShortName: string;
  onClose: () => void;
}) {
  const [method, setMethod] = useState<'empty' | 'chapterVerse' | 'fromTemplate'>('empty');
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  // Only books that don't exist yet in the project should be available to create
  const availableBookInfo = useMemo(() => buildAvailableBookInfo(projectId, 'absent'), [projectId]);
  // Drop any selection that is no longer valid when the project changes
  const effectiveSelection = selectedBookIds.filter(
    (id) => !PROJECT_PRESENT_BOOKS[projectId]?.has(id),
  );
  const count = effectiveSelection.length;
  return (
    <SectionFrame
      title={`Create Books: ${projectName}`}
      description="Create one or more empty books, with chapter and verse numbers, or based on a model."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={count === 0}>
            {`Create ${count} book${count === 1 ? '' : 's'} in ${projectShortName}`}
          </Button>
        </>
      }
    >
      <div className="tw-flex tw-flex-col tw-gap-5">
        <div className="tw-flex tw-flex-col tw-gap-2">
          <Label>Books</Label>
          <div
            className={cn(
              count === 0 &&
                '[&_button[role=combobox]:hover]:tw-bg-primary/90 [&_button[role=combobox]]:tw-border-primary [&_button[role=combobox]]:tw-bg-primary [&_button[role=combobox]]:tw-text-primary-foreground',
            )}
          >
            <BookSelector
              availableBookInfo={availableBookInfo}
              selectedBookIds={effectiveSelection}
              onChangeSelectedBookIds={setSelectedBookIds}
              localizedStrings={MOCK_BOOK_SELECTOR_STRINGS}
            />
          </div>
        </div>

        <Separator />

        <RadioGroup value={method} onValueChange={(v) => setMethod(v as typeof method)}>
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="empty" id="create-empty" />
            <Label htmlFor="create-empty">Create empty book</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="chapterVerse" id="create-cv" />
            <Label htmlFor="create-cv">Create with all chapter and verse numbers</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-3">
            <RadioGroupItem value="fromTemplate" id="create-model" />
            <Label htmlFor="create-model">Create based on:</Label>
            <Select disabled={method !== 'fromTemplate'}>
              <SelectTrigger className="tw-w-56">
                <SelectValue placeholder="Select model project…" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_PROJECTS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </RadioGroup>
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// SCR-003 Delete Books
// --------------------------------------------------------------------------

function DeleteBooksSection({
  projectId,
  projectName,
  projectShortName,
  onClose,
}: {
  projectId: string;
  projectName: string;
  projectShortName: string;
  onClose: () => void;
}) {
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  // Only books that actually exist in the project should be available to delete
  const availableBookInfo = useMemo(
    () => buildAvailableBookInfo(projectId, 'present'),
    [projectId],
  );
  const effectiveSelection = selectedBookIds.filter((id) =>
    PROJECT_PRESENT_BOOKS[projectId]?.has(id),
  );
  const count = effectiveSelection.length;
  return (
    <SectionFrame
      title={`Delete Books: ${projectName}`}
      description="This action removes books from the project and deletes them from disk."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={count === 0}>
            {`Delete ${count} book${count === 1 ? '' : 's'} from ${projectShortName}`}
          </Button>
        </>
      }
    >
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label>Books</Label>
        <div
          className={cn(
            count === 0 &&
              '[&_button[role=combobox]:hover]:tw-bg-primary/90 [&_button[role=combobox]]:tw-border-primary [&_button[role=combobox]]:tw-bg-primary [&_button[role=combobox]]:tw-text-primary-foreground',
          )}
        >
          <BookSelector
            availableBookInfo={availableBookInfo}
            selectedBookIds={effectiveSelection}
            onChangeSelectedBookIds={setSelectedBookIds}
            localizedStrings={MOCK_BOOK_SELECTOR_STRINGS}
          />
        </div>
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// SCR-004 Copy Books
// --------------------------------------------------------------------------

function comparisonVariant(
  state: ComparisonState,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (state) {
    case 'Same':
      return 'secondary';
    case 'Newer':
    case 'New':
      return 'default';
    case 'Older':
      return 'destructive';
    default:
      return 'outline';
  }
}

type CopyState = {
  fromProjectId: string | undefined;
  selected: Set<string>;
  loading: boolean;
  loadedFor: string | undefined;
};

function CopyBooksSection({
  projectId,
  projectName,
  state,
  setState,
  onClose,
}: {
  projectId: string;
  projectName: string;
  state: CopyState;
  setState: React.Dispatch<React.SetStateAction<CopyState>>;
  onClose: () => void;
}) {
  // Globally-selected project is the destination ("To"); user picks a source ("Copy from")
  const toProject = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const { fromProjectId, selected, loading } = state;
  const fromProject = fromProjectId ? MOCK_PROJECTS.find((p) => p.id === fromProjectId) : undefined;

  const setFromProjectId = (next: string) => setState((prev) => ({ ...prev, fromProjectId: next }));
  const setSelected = (updater: Set<string> | ((prev: Set<string>) => Set<string>)) =>
    setState((prev) => ({
      ...prev,
      selected: typeof updater === 'function' ? updater(prev.selected) : updater,
    }));

  const copyableRows = useMemo(() => MOCK_COMPARISON.filter((r) => r.state !== 'Missing'), []);

  // Simulate fetching the comparison when a new "Copy from" project is chosen.
  // Skip the delay if we already loaded this project in a prior mount.
  useEffect(() => {
    if (!fromProjectId || fromProjectId === state.loadedFor) return undefined;
    setState((prev) => ({ ...prev, loading: true, selected: new Set() }));
    const timeout = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        selected: new Set(copyableRows.slice(0, 2).map((r) => r.book)),
        loading: false,
        loadedFor: prev.fromProjectId,
      }));
    }, 700);
    return () => clearTimeout(timeout);
  }, [fromProjectId, state.loadedFor, copyableRows, setState]);
  const toggle = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  return (
    <SectionFrame
      title={`Copy Books: ${projectName}`}
      description="All books preceded by a check mark will be copied."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={selected.size === 0}>
            {`Copy ${selected.size} book${selected.size === 1 ? '' : 's'} into ${toProject.shortName}`}
          </Button>
        </>
      }
    >
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-grid tw-grid-cols-[auto_1fr] tw-items-center tw-gap-3">
          <Label htmlFor="copy-from">Copy from</Label>
          <Select value={fromProjectId} onValueChange={setFromProjectId}>
            <SelectTrigger
              id="copy-from"
              className={cn(
                !fromProjectId &&
                  'tw-border-primary tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90 [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground',
              )}
            >
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_PROJECTS.filter((p) => p.id !== toProject.id).map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!fromProject ? (
          <div className="tw-flex tw-h-full tw-min-h-40 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-border tw-border-dashed tw-p-10 tw-text-center tw-text-sm tw-text-muted-foreground">
            Select a project
          </div>
        ) : loading ? (
          <div className="tw-flex tw-h-full tw-min-h-40 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-rounded-md tw-border tw-p-10 tw-text-center tw-text-sm tw-text-muted-foreground">
            <Loader2 className="tw-h-6 tw-w-6 tw-animate-spin" aria-hidden />
            Comparing books between {fromProject.shortName} and {toProject.shortName}…
          </div>
        ) : (
          <div className="tw-rounded-md tw-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="tw-w-10">
                    <div className="tw-flex tw-items-center">
                      <Checkbox
                        checked={
                          selected.size === 0
                            ? false
                            : selected.size === copyableRows.length
                              ? true
                              : 'indeterminate'
                        }
                        onCheckedChange={() => {
                          if (selected.size === copyableRows.length) setSelected(new Set());
                          else setSelected(new Set(copyableRows.map((r) => r.book)));
                        }}
                        aria-label="Select all books"
                      />
                    </div>
                  </TableHead>
                  <TableHead>{`From: ${fromProject.shortName}`}</TableHead>
                  <TableHead>{`To: ${toProject.shortName}`}</TableHead>
                  <TableHead className="tw-w-24">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_COMPARISON.map((row) => {
                  const isMissing = row.state === 'Missing';
                  return (
                    <TableRow key={row.book}>
                      <TableCell>
                        {!isMissing && (
                          <Checkbox
                            checked={selected.has(row.book)}
                            onCheckedChange={() => toggle(row.book)}
                            aria-label={`Copy ${row.book}`}
                          />
                        )}
                      </TableCell>
                      <TableCell>{row.fromDate ? `${row.book} — ${row.fromDate}` : '—'}</TableCell>
                      <TableCell>{row.toDate ? `${row.book} — ${row.toDate}` : '—'}</TableCell>
                      <TableCell>
                        {!isMissing && (
                          <Badge variant={comparisonVariant(row.state)}>{row.state}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// SCR-005 Import Books
// --------------------------------------------------------------------------

type ImportRow = {
  file: string;
  book: string;
  fromDate?: string;
  toDate?: string;
  // 'Failed' is used by the view-list import workflow to keep an entry in the file list
  // even when no book could be detected — failed entries are surfaced to the user via a
  // persistent Sonner warning rather than via the book grid.
  state: ComparisonState | 'Failed';
  /** Reason the file couldn't be imported, when state === 'Failed'. */
  failureReason?: string;
};

type ImportState = {
  files: ImportRow[];
  selected: Set<string>;
  replace: Set<string>;
};

function ImportBooksSection({
  projectShortName,
  projectName,
  state,
  setState,
  onClose,
}: {
  projectShortName: string;
  projectName: string;
  state: ImportState;
  setState: React.Dispatch<React.SetStateAction<ImportState>>;
  onClose: () => void;
}) {
  const { files, selected, replace } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setSelected = (updater: Set<string> | ((prev: Set<string>) => Set<string>)) =>
    setState((prev) => ({
      ...prev,
      selected: typeof updater === 'function' ? updater(prev.selected) : updater,
    }));
  const setReplace = (updater: Set<string> | ((prev: Set<string>) => Set<string>)) =>
    setState((prev) => ({
      ...prev,
      replace: typeof updater === 'function' ? updater(prev.replace) : updater,
    }));

  const toggle = (file: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(file)) next.delete(file);
      else next.add(file);
      return next;
    });

  const toggleReplace = (file: string) =>
    setReplace((prev) => {
      const next = new Set(prev);
      if (next.has(file)) next.delete(file);
      else next.add(file);
      return next;
    });

  const openFileDialog = () => fileInputRef.current?.click();

  const handleFilesPicked = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    const existingNames = new Set(files.map((f) => f.file));
    const additions: ImportRow[] = [];
    Array.from(picked).forEach((f, idx) => {
      if (existingNames.has(f.name)) return;
      const mock = MOCK_IMPORT_FILES[idx % MOCK_IMPORT_FILES.length];
      additions.push({ ...mock, file: f.name });
    });
    if (additions.length === 0) return;
    setState((prev) => {
      const nextSelected = new Set(prev.selected);
      additions.forEach((a) => nextSelected.add(a.file));
      return { ...prev, files: [...prev.files, ...additions], selected: nextSelected };
    });
  };

  const clearList = () => setState({ files: [], selected: new Set(), replace: new Set() });

  const selectedCount = selected.size;
  const headerSelectState: boolean | 'indeterminate' =
    selected.size === 0 ? false : selected.size === files.length ? true : 'indeterminate';
  const headerReplaceState: boolean | 'indeterminate' =
    replace.size === 0 ? false : replace.size === files.length ? true : 'indeterminate';

  return (
    <SectionFrame
      title={`Import Books: ${projectName}`}
      description="Select files to import. Files with overlapping books must be resolved before import."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={selectedCount === 0}>
            {`Import ${selectedCount} book${selectedCount === 1 ? '' : 's'} into ${projectShortName}`}
          </Button>
        </>
      }
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".sfm,.usfm,.usx,.xml"
        className="tw-hidden"
        onChange={(e) => {
          handleFilesPicked(e.target.files);
          // Reset input so selecting the same file again re-triggers onChange
          e.target.value = '';
        }}
      />

      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
          {files.length === 0 ? (
            <Button onClick={openFileDialog}>Select files…</Button>
          ) : (
            <>
              <Button variant="outline" onClick={openFileDialog}>
                Select more files…
              </Button>
              <Button variant="outline" onClick={clearList}>
                Clear List
              </Button>
            </>
          )}
        </div>

        {files.length === 0 ? (
          <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-rounded-md tw-border tw-border-dashed tw-p-10 tw-text-center">
            <FolderOpen className="tw-h-8 tw-w-8 tw-text-muted-foreground" aria-hidden />
            <div className="tw-text-sm tw-text-muted-foreground">
              No files selected. Choose one or more book files to import.
            </div>
          </div>
        ) : (
          <div className="tw-rounded-md tw-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="tw-w-10 tw-text-center">
                    <div className="tw-flex tw-items-center tw-justify-center">
                      <Checkbox
                        checked={headerSelectState}
                        onCheckedChange={() => {
                          if (selected.size === files.length) setSelected(new Set());
                          else setSelected(new Set(files.map((f) => f.file)));
                        }}
                        aria-label="Select all files"
                      />
                    </div>
                  </TableHead>
                  <TableHead className="tw-text-center">Import from file</TableHead>
                  <TableHead className="tw-text-center">{`Import into ${projectShortName}`}</TableHead>
                  <TableHead className="tw-w-20 tw-text-center">
                    <div className="tw-flex tw-items-center tw-justify-center">
                      <Checkbox
                        checked={headerReplaceState}
                        onCheckedChange={() => {
                          if (replace.size === files.length) setReplace(new Set());
                          else setReplace(new Set(files.map((f) => f.file)));
                        }}
                        aria-label="Overwrite all files"
                      />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((row) => (
                  <TableRow key={row.file}>
                    <TableCell className="tw-text-center tw-align-middle">
                      <div className="tw-flex tw-items-center tw-justify-center">
                        <Checkbox
                          checked={selected.has(row.file)}
                          onCheckedChange={() => toggle(row.file)}
                          aria-label={`Import ${row.file}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="tw-max-w-0 tw-align-top">
                      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-x-2 tw-gap-y-1 tw-text-center">
                        <span className="tw-font-medium">{row.book}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={comparisonVariant(
                                row.state === 'Failed' ? 'Missing' : row.state,
                              )}
                            >
                              {row.state}
                            </Badge>
                          </TooltipTrigger>
                          {row.fromDate && (
                            <TooltipContent>Imported: {row.fromDate}</TooltipContent>
                          )}
                        </Tooltip>
                        <span className="tw-whitespace-normal tw-break-all tw-text-xs tw-text-muted-foreground">
                          {row.file}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="tw-align-top">
                      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-x-2 tw-gap-y-1 tw-text-center">
                        <span className="tw-font-medium">{row.book}</span>
                        {row.toDate && (
                          <span className="tw-text-xs tw-text-muted-foreground">{row.toDate}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="tw-w-20 tw-max-w-20 tw-align-middle">
                      <label className="tw-mx-auto tw-flex tw-w-fit tw-cursor-pointer tw-flex-col tw-items-center tw-gap-1">
                        <Checkbox
                          checked={replace.has(row.file)}
                          onCheckedChange={() => toggleReplace(row.file)}
                          aria-label={`Overwrite ${row.file}`}
                        />
                        <span className="tw-whitespace-normal tw-break-words tw-text-center tw-text-xs tw-leading-tight">
                          Overwrite content
                        </span>
                      </label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

function ManageBooksDialog() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState<SectionId>('show');
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const project = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const projectName = project.name;
  const projectShortName = project.shortName;
  // Lifted so the picked-files list survives sidebar tab switches
  const [importState, setImportState] = useState<ImportState>({
    files: [],
    selected: new Set(),
    replace: new Set(),
  });
  const [copyState, setCopyState] = useState<CopyState>({
    fromProjectId: undefined,
    selected: new Set(),
    loading: false,
    loadedFor: undefined,
  });

  const renderSection = () => {
    switch (active) {
      case 'show':
        return (
          <ShowBooksSection
            projectId={projectId}
            projectName={projectName}
            onClose={() => setOpen(false)}
          />
        );
      case 'create':
        return (
          <CreateBooksSection
            projectId={projectId}
            projectName={projectName}
            projectShortName={projectShortName}
            onClose={() => setOpen(false)}
          />
        );
      case 'delete':
        return (
          <DeleteBooksSection
            projectId={projectId}
            projectName={projectName}
            projectShortName={projectShortName}
            onClose={() => setOpen(false)}
          />
        );
      case 'copy':
        return (
          <CopyBooksSection
            projectId={projectId}
            projectName={projectName}
            state={copyState}
            setState={setCopyState}
            onClose={() => setOpen(false)}
          />
        );
      case 'import':
        return (
          <ImportBooksSection
            projectShortName={projectShortName}
            projectName={projectName}
            state={importState}
            setState={setImportState}
            onClose={() => setOpen(false)}
          />
        );
      default:
        return undefined;
    }
  };

  return (
    <>
      {/*
        Prototype-only: the shared Dialog sits at z-index 500 but Popover/Select/DropdownMenu
        content portals into document.body at a lower z-index, so they would otherwise render
        behind this dialog. Raise portaled popper/select content above Z_INDEX_MODAL, and
        force pointer-events on so the modal-body pointer-events:none cascade (from Radix
        Dialog) doesn't disable hover/scroll/keyboard interactions inside the popover.
      */}
      <style>{`
        [data-radix-popper-content-wrapper],
        [data-radix-select-content],
        [data-radix-popover-content],
        [data-radix-menu-content] {
          z-index: 600 !important;
          pointer-events: auto !important;
        }
      `}</style>
      <Button onClick={() => setOpen(true)}>Open Manage Books</Button>
      {/*
        modal={false}: Radix Dialog's default focus trap steals keyboard focus back when it
        escapes to a portaled popover (like BookSelector's cmdk Command), which prevents
        keyboard navigation and the cmdk-driven data-[selected=true] hover styling. Running
        non-modal lets the inner popover own focus while it's open.
      */}
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="tw-h-[80vh] tw-w-[95vw] tw-max-w-5xl tw-gap-0 tw-overflow-hidden tw-p-0"
          // With modal={false}, Radix treats clicks on any portaled popover/select/menu
          // content as "outside" the dialog and would close it. Suppress all outside-
          // interaction auto-close; the dialog closes only via the X button or footer.
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => {
            // Allow Esc to close Select/Popover first; only close the dialog if the event
            // wasn't already handled by a portaled popper.
            const wrapper = document.querySelector(
              '[data-radix-popper-content-wrapper][data-state="open"]',
            );
            if (wrapper) e.preventDefault();
          }}
        >
          <TooltipProvider delayDuration={200}>
            <div className="tw-flex tw-h-full tw-min-h-0">
              <Sidebar
                active={active}
                onSelect={setActive}
                projectId={projectId}
                projectShortName={projectShortName}
                onProjectChange={setProjectId}
              />
              <div className="tw-min-w-0 tw-flex-1">{renderSection()}</div>
            </div>
          </TooltipProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}

// --------------------------------------------------------------------------
// UNIFIED: single table of every canonical book. Rows stay in canonical order
// so the table never reflows. Create and Delete apply immediately; Copy and
// Import open sub-dialogs that show a comparison before applying.
// --------------------------------------------------------------------------

type ProjectBookState = { present: Set<string>; dates: Record<string, string> };

function createInitialProjectBooks(): Record<string, ProjectBookState> {
  const out: Record<string, ProjectBookState> = {};
  Object.entries(PROJECT_PRESENT_BOOKS).forEach(([pid, books]) => {
    const dates: Record<string, string> = {};
    Array.from(books).forEach((b, i) => {
      dates[b] = `2024-${String((i % 12) + 1).padStart(2, '0')}-10`;
    });
    out[pid] = { present: new Set(books), dates };
  });
  // Hand-crafted overrides so Copy shows a mix of Newer/Older/Same/New states
  // when copying into the default destination project (WEB).
  if (out.KJV) {
    out.KJV.dates.GEN = '2023-11-10';
    out.KJV.dates.EXO = '2025-03-10';
    out.KJV.dates.ROM = '2023-05-10';
  }
  if (out.NIV) {
    out.NIV.dates.GEN = '2023-09-10';
    out.NIV.dates.LEV = '2025-01-10';
    out.NIV.dates.EXO = '2023-08-10';
  }
  if (out.NLT) {
    out.NLT.dates.MAT = '2023-06-10';
    out.NLT.dates.JHN = '2025-04-10';
  }
  return out;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

function computeCompareState(
  sourceDate: string | undefined,
  destDate: string | undefined,
): ComparisonState {
  if (!sourceDate) return 'Missing';
  if (!destDate) return 'New';
  if (sourceDate === destDate) return 'Same';
  return sourceDate > destDate ? 'Newer' : 'Older';
}

/**
 * Badge for a "Last modified in X" cell: shows Newer/Older/Same comparing this side's date to the
 * other side's date when both sides have the book. Returns "—" otherwise.
 */
function renderSideBadge(
  thisSideHas: boolean,
  thisDate: string | undefined,
  otherDate: string | undefined,
) {
  if (!thisSideHas || !thisDate || !otherDate) {
    return <span className="tw-text-xs tw-text-muted-foreground">—</span>;
  }
  if (thisDate === otherDate) return <Badge variant="secondary">Same</Badge>;
  if (thisDate > otherDate) return <Badge>Newer</Badge>;
  return <Badge variant="destructive">Older</Badge>;
}

type CreateMethod = 'empty' | 'chapterVerse' | 'referenceText';

const CREATE_METHOD_LABELS: Record<CreateMethod, string> = {
  empty: 'Empty book',
  chapterVerse: 'With all chapter and verse numbers',
  referenceText: 'Based on',
};

function CopySubDialog({
  books,
  sourceProjectId,
  destProjectId,
  projectsData,
  onClose,
  onApply,
}: {
  books: string[];
  sourceProjectId: string | undefined;
  destProjectId: string;
  projectsData: Record<string, ProjectBookState>;
  onClose: () => void;
  onApply: (books: string[], sourceProjectId: string) => void;
}) {
  const open = books.length > 0 && !!sourceProjectId;
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!open) return undefined;
    setLoading(true);
    setChecked(new Set(books));
    const handle = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(handle);
  }, [open, books, sourceProjectId]);

  if (!open || !sourceProjectId) return undefined;

  const destProject = MOCK_PROJECTS.find((p) => p.id === destProjectId) ?? MOCK_PROJECTS[0];
  const sourceProject = MOCK_PROJECTS.find((p) => p.id === sourceProjectId) ?? destProject;
  const sourceData = projectsData[sourceProjectId] ?? { present: new Set<string>(), dates: {} };
  const destData = projectsData[destProjectId] ?? { present: new Set<string>(), dates: {} };

  const rows = books.map((book) => {
    const sourceHas = sourceData.present.has(book);
    const destHas = destData.present.has(book);
    const state = computeCompareState(
      sourceHas ? sourceData.dates[book] : undefined,
      destHas ? destData.dates[book] : undefined,
    );
    return {
      book,
      sourceDate: sourceData.dates[book],
      destDate: destData.dates[book],
      sourceHas,
      destHas,
      state,
    };
  });

  const copyableRows = rows.filter((r) => r.sourceHas);
  const toCopy = copyableRows.filter((r) => checked.has(r.book)).map((r) => r.book);
  const canApply = !loading && toCopy.length > 0;

  const toggle = (book: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  const allCopyableChecked =
    copyableRows.length > 0 && copyableRows.every((r) => checked.has(r.book));
  const headerCheckboxState: boolean | 'indeterminate' = allCopyableChecked
    ? true
    : copyableRows.some((r) => checked.has(r.book))
      ? 'indeterminate'
      : false;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      modal={false}
    >
      <DialogContent
        className="tw-max-h-[85vh] tw-w-[90vw] tw-max-w-3xl tw-gap-0 tw-overflow-hidden tw-p-0"
        style={{ zIndex: 700 }}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
      >
        <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
          <header className="tw-border-b tw-px-6 tw-py-4">
            <h2 className="tw-text-lg tw-font-semibold">
              {`Copy ${books.length} book${books.length === 1 ? '' : 's'} from ${sourceProject.shortName} into ${destProject.shortName}`}
            </h2>
            <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
              Review the comparison and confirm. Rows missing in the source cannot be copied.
            </p>
          </header>
          <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-6 tw-py-4">
            {loading ? (
              <div className="tw-flex tw-min-h-32 tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-border tw-p-6 tw-text-sm tw-text-muted-foreground">
                <Loader2 className="tw-h-4 tw-w-4 tw-animate-spin" aria-hidden />
                {`Comparing ${books.length} book${books.length === 1 ? '' : 's'} between ${sourceProject.shortName} and ${destProject.shortName}…`}
              </div>
            ) : (
              <div className="tw-rounded-md tw-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="tw-w-10">
                        <Checkbox
                          checked={headerCheckboxState}
                          disabled={copyableRows.length === 0}
                          onCheckedChange={() => {
                            if (allCopyableChecked) setChecked(new Set());
                            else setChecked(new Set(copyableRows.map((r) => r.book)));
                          }}
                          aria-label="Toggle all copyable rows"
                        />
                      </TableHead>
                      <TableHead>Book</TableHead>
                      <TableHead>{`From ${sourceProject.shortName}`}</TableHead>
                      <TableHead>{`In ${destProject.shortName}`}</TableHead>
                      <TableHead className="tw-w-24">State</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((r) => (
                      <TableRow key={r.book}>
                        <TableCell className="tw-py-1">
                          {r.sourceHas && (
                            <Checkbox
                              checked={checked.has(r.book)}
                              onCheckedChange={() => toggle(r.book)}
                              aria-label={`Copy ${r.book}`}
                            />
                          )}
                        </TableCell>
                        <TableCell className="tw-py-1 tw-font-medium">{r.book}</TableCell>
                        <TableCell className="tw-py-1 tw-text-xs tw-text-muted-foreground">
                          {r.sourceHas ? (r.sourceDate ?? '—') : '—'}
                        </TableCell>
                        <TableCell className="tw-py-1 tw-text-xs tw-text-muted-foreground">
                          {r.destHas ? (r.destDate ?? '—') : '—'}
                        </TableCell>
                        <TableCell className="tw-py-1">
                          <Badge variant={comparisonVariant(r.state)}>{r.state}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <footer className="tw-flex tw-justify-end tw-gap-2 tw-border-t tw-px-6 tw-py-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={!canApply}
              onClick={() => {
                if (canApply) onApply(toCopy, sourceProjectId);
              }}
            >
              {`Copy ${toCopy.length} book${toCopy.length === 1 ? '' : 's'} into ${destProject.shortName}`}
            </Button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ImportRowPick = { file?: string; fileDate?: string; overwrite: boolean };

function ImportSubDialog({
  books,
  destProjectId,
  projectsData,
  prePickedFiles,
  onClose,
  onApply,
}: {
  books: string[];
  destProjectId: string;
  projectsData: Record<string, ProjectBookState>;
  /**
   * Optional per-book file pre-fill. When the caller has already collected files (e.g. via a native
   * multi-select file dialog opened upstream), pass them here so the comparison table opens with
   * the File column populated and the Overwrite checkbox auto-ticked where the destination already
   * has the book — the user only has to review and confirm.
   */
  prePickedFiles?: Record<string, { name: string; date: string }>;
  onClose: () => void;
  onApply: (rows: { book: string; overwrite: boolean }[]) => void;
}) {
  const open = books.length > 0;
  const [picks, setPicks] = useState<Record<string, ImportRowPick>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeBookRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const init: Record<string, ImportRowPick> = {};
    const destPresent = projectsData[destProjectId]?.present ?? new Set<string>();
    books.forEach((b) => {
      const pre = prePickedFiles?.[b];
      init[b] = pre
        ? {
            file: pre.name,
            fileDate: pre.date,
            // Auto-tick Overwrite when the destination already has the book — the user
            // already implied "import this" by picking the file, so requiring a second
            // explicit click on Overwrite is just friction.
            overwrite: destPresent.has(b),
          }
        : { overwrite: false };
    });
    setPicks(init);
    activeBookRef.current = undefined;
  }, [open, books, prePickedFiles, projectsData, destProjectId]);

  if (!open) return undefined;

  const destProject = MOCK_PROJECTS.find((p) => p.id === destProjectId) ?? MOCK_PROJECTS[0];
  const destData = projectsData[destProjectId] ?? { present: new Set<string>(), dates: {} };

  const pickFileFor = (book: string) => {
    activeBookRef.current = book;
    fileInputRef.current?.click();
  };

  const handleFilesPicked = (files: FileList | null) => {
    const book = activeBookRef.current;
    activeBookRef.current = undefined;
    if (!files || files.length === 0 || !book) return;
    const file = files[0];
    setPicks((prev) => ({
      ...prev,
      [book]: { ...(prev[book] ?? { overwrite: false }), file: file.name, fileDate: todayISO() },
    }));
  };

  const toggleOverwrite = (book: string) =>
    setPicks((prev) => ({
      ...prev,
      [book]: { ...(prev[book] ?? { overwrite: false }), overwrite: !prev[book]?.overwrite },
    }));

  const rows = books.map((book) => {
    const pick = picks[book] ?? { overwrite: false };
    const destHas = destData.present.has(book);
    const destDate = destData.dates[book];
    const state: ComparisonState | undefined = pick.file
      ? computeCompareState(pick.fileDate, destDate)
      : undefined;
    const ready = !!pick.file && (!destHas || pick.overwrite);
    return { book, pick, destHas, destDate, state, ready };
  });

  const readyRows = rows.filter((r) => r.ready);
  const canApply = readyRows.length > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      modal={false}
    >
      <DialogContent
        className="tw-max-h-[85vh] tw-w-[90vw] tw-max-w-3xl tw-gap-0 tw-overflow-hidden tw-p-0"
        style={{ zIndex: 700 }}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
      >
        <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
          <header className="tw-border-b tw-px-6 tw-py-4">
            <h2 className="tw-text-lg tw-font-semibold">
              {`Import ${books.length} book${books.length === 1 ? '' : 's'} into ${destProject.shortName}`}
            </h2>
            <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
              Pick a file per book. Tick Overwrite when the book already exists in{' '}
              {destProject.shortName}.
            </p>
          </header>
          <input
            ref={fileInputRef}
            type="file"
            accept=".sfm,.usfm,.usx,.xml"
            className="tw-hidden"
            onChange={(e) => {
              handleFilesPicked(e.target.files);
              e.target.value = '';
            }}
          />
          <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-6 tw-py-4">
            <div className="tw-rounded-md tw-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead className="tw-w-32">{`In ${destProject.shortName}`}</TableHead>
                    <TableHead className="tw-w-24">State</TableHead>
                    <TableHead className="tw-w-28 tw-text-center">Overwrite</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.book}>
                      <TableCell className="tw-py-1 tw-font-medium">{r.book}</TableCell>
                      <TableCell className="tw-py-1 tw-text-xs">
                        <div className="tw-flex tw-items-center tw-gap-2">
                          <Button size="sm" variant="outline" onClick={() => pickFileFor(r.book)}>
                            <FolderOpen className="tw-mr-2 tw-h-3.5 tw-w-3.5" aria-hidden />
                            {r.pick.file ? 'Change…' : 'Pick file…'}
                          </Button>
                          {r.pick.file && (
                            <span className="tw-break-all tw-text-muted-foreground">
                              {r.pick.file}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="tw-py-1 tw-text-xs tw-text-muted-foreground">
                        {r.destHas ? (r.destDate ?? '—') : '—'}
                      </TableCell>
                      <TableCell className="tw-py-1">
                        {r.state && <Badge variant={comparisonVariant(r.state)}>{r.state}</Badge>}
                      </TableCell>
                      <TableCell className="tw-py-1 tw-text-center">
                        {r.destHas && r.pick.file && (
                          <Checkbox
                            checked={r.pick.overwrite}
                            onCheckedChange={() => toggleOverwrite(r.book)}
                            aria-label={`Overwrite ${r.book}`}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <footer className="tw-flex tw-justify-end tw-gap-2 tw-border-t tw-px-6 tw-py-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={!canApply}
              onClick={() => {
                if (canApply)
                  onApply(readyRows.map((r) => ({ book: r.book, overwrite: r.pick.overwrite })));
              }}
            >
              {`Import ${readyRows.length} book${readyRows.length === 1 ? '' : 's'} into ${destProject.shortName}`}
            </Button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UnifiedManageBooksDialog() {
  const [open, setOpen] = useState(true);
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const [sourceProjectId, setSourceProjectId] = useState<string | undefined>(undefined);
  const [projectsData, setProjectsData] = useState<Record<string, ProjectBookState>>(() =>
    createInitialProjectBooks(),
  );
  const [deleteSelected, setDeleteSelected] = useState<Set<string>>(new Set());
  const [createSelected, setCreateSelected] = useState<Set<string>>(new Set());
  const [copySelected, setCopySelected] = useState<Set<string>>(new Set());
  const [importSelected, setImportSelected] = useState<Set<string>>(new Set());
  const [filterText, setFilterText] = useState('');
  const [copyTargets, setCopyTargets] = useState<string[]>([]);
  const [importTargets, setImportTargets] = useState<string[]>([]);
  const [mode, setMode] = useState<'create' | 'import' | 'copy' | 'delete'>('create');

  const project = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const sourceProject = sourceProjectId
    ? MOCK_PROJECTS.find((p) => p.id === sourceProjectId)
    : undefined;
  const current = projectsData[projectId] ?? { present: new Set<string>(), dates: {} };
  const sourceData = sourceProjectId ? projectsData[sourceProjectId] : undefined;

  const allBooks = useMemo(() => [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS], []);
  const otherProjects = MOCK_PROJECTS.filter((p) => p.id !== projectId);
  const sourceShortName = sourceProject?.shortName ?? '…';

  // Drop any selections belonging to a different destination project when it changes.
  useEffect(() => {
    setDeleteSelected(new Set());
    setCreateSelected(new Set());
    setCopySelected(new Set());
    setImportSelected(new Set());
  }, [projectId]);

  // Clear copy selection if the source is cleared, since copy only makes sense with a source.
  useEffect(() => {
    if (!sourceProjectId) setCopySelected(new Set());
  }, [sourceProjectId]);

  // Source project must never equal the destination.
  useEffect(() => {
    if (sourceProjectId && sourceProjectId === projectId) setSourceProjectId(undefined);
  }, [sourceProjectId, projectId]);

  const applyToCurrent = (mutate: (p: ProjectBookState) => ProjectBookState) =>
    setProjectsData((prev) => ({ ...prev, [projectId]: mutate(prev[projectId]) }));

  const deleteOneBook = (bookId: string) => {
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      nextPresent.delete(bookId);
      const nextDates = { ...p.dates };
      delete nextDates[bookId];
      return { present: nextPresent, dates: nextDates };
    });
    setDeleteSelected((prev) => {
      if (!prev.has(bookId)) return prev;
      const next = new Set(prev);
      next.delete(bookId);
      return next;
    });
  };

  const bulkDelete = () => {
    if (deleteSelected.size === 0) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      deleteSelected.forEach((b) => {
        nextPresent.delete(b);
        delete nextDates[b];
      });
      return { present: nextPresent, dates: nextDates };
    });
    setDeleteSelected(new Set());
  };

  const handleApplyCreate = (booksToCreate: string[], _method: CreateMethod) => {
    if (booksToCreate.length === 0) return;
    // Mock: method only affects content generation; we just add the books with today's date.
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      booksToCreate.forEach((b) => {
        nextPresent.add(b);
        nextDates[b] = todayISO();
      });
      return { present: nextPresent, dates: nextDates };
    });
    setCreateSelected((prev) => {
      const next = new Set(prev);
      booksToCreate.forEach((b) => next.delete(b));
      return next;
    });
  };

  const handleApplyCopy = (books: string[], sourceId: string) => {
    const srcData = projectsData[sourceId];
    if (!srcData) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        if (srcData.present.has(b)) {
          nextPresent.add(b);
          nextDates[b] = srcData.dates[b] ?? todayISO();
        }
      });
      return { present: nextPresent, dates: nextDates };
    });
    setCopyTargets([]);
    setCopySelected((prev) => {
      const next = new Set(prev);
      books.forEach((b) => next.delete(b));
      return next;
    });
  };

  const handleApplyImport = (rows: { book: string; overwrite: boolean }[]) => {
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      rows.forEach((r) => {
        if (nextPresent.has(r.book) && !r.overwrite) return;
        nextPresent.add(r.book);
        nextDates[r.book] = todayISO();
      });
      return { present: nextPresent, dates: nextDates };
    });
    setImportTargets([]);
    setImportSelected((prev) => {
      const next = new Set(prev);
      rows.forEach((r) => next.delete(r.book));
      return next;
    });
  };

  const toggleDelete = (bookId: string) =>
    setDeleteSelected((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });
  const toggleCreate = (bookId: string) =>
    setCreateSelected((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });
  const toggleCopy = (bookId: string) =>
    setCopySelected((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });
  const toggleImport = (bookId: string) =>
    setImportSelected((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) next.delete(bookId);
      else next.add(bookId);
      return next;
    });

  // Filter rows by book ID or English name (case-insensitive).
  const filter = filterText.trim().toLowerCase();
  const visibleBooks = filter
    ? allBooks.filter(
        (b) =>
          b.toLowerCase().includes(filter) ||
          Canon.bookIdToEnglishName(b).toLowerCase().includes(filter),
      )
    : allBooks;

  const visiblePresentBooks = visibleBooks.filter((b) => current.present.has(b));
  const visibleAbsentBooks = visibleBooks.filter((b) => !current.present.has(b));
  const visibleCopyableBooks = sourceData
    ? visibleBooks.filter((b) => sourceData.present.has(b))
    : [];

  const headerCheckboxState = (
    universe: string[],
    chosen: Set<string>,
  ): boolean | 'indeterminate' => {
    if (universe.length === 0 || chosen.size === 0) return false;
    const allChosen = universe.every((b) => chosen.has(b));
    if (allChosen) return true;
    return universe.some((b) => chosen.has(b)) ? 'indeterminate' : false;
  };
  const headerDeleteState = headerCheckboxState(visiblePresentBooks, deleteSelected);
  const headerCreateState = headerCheckboxState(visibleAbsentBooks, createSelected);
  const headerCopyState = headerCheckboxState(visibleCopyableBooks, copySelected);
  const headerImportState = headerCheckboxState(visibleBooks, importSelected);

  const toggleAll = (
    universe: string[],
    chosen: Set<string>,
    setChosen: React.Dispatch<React.SetStateAction<Set<string>>>,
  ) => {
    if (universe.every((b) => chosen.has(b))) {
      setChosen((prev) => {
        if (universe.length === 0) return prev;
        const next = new Set(prev);
        universe.forEach((b) => next.delete(b));
        return next;
      });
    } else {
      setChosen((prev) => {
        const next = new Set(prev);
        universe.forEach((b) => next.add(b));
        return next;
      });
    }
  };

  const totalPresent = allBooks.filter((b) => current.present.has(b)).length;
  const subDialogOpen = copyTargets.length > 0 || importTargets.length > 0;

  return (
    <>
      <style>{`
        [data-radix-popper-content-wrapper],
        [data-radix-select-content],
        [data-radix-popover-content],
        [data-radix-menu-content] {
          z-index: 600 !important;
          pointer-events: auto !important;
        }
      `}</style>
      <Button onClick={() => setOpen(true)}>Open Unified Manage Books</Button>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="tw-h-[80vh] tw-w-[95vw] tw-max-w-5xl tw-gap-0 tw-overflow-hidden tw-p-0"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => {
            const wrapper = document.querySelector(
              '[data-radix-popper-content-wrapper][data-state="open"]',
            );
            if (wrapper || subDialogOpen) e.preventDefault();
          }}
        >
          <TooltipProvider delayDuration={200}>
            <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
              <header className="tw-border-b tw-px-6 tw-py-4">
                <h2 className="tw-text-lg tw-font-semibold">{`Manage Books: ${project.name}`}</h2>
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
                  Pick a destination project and a Copy-from project. Create, Copy, and Import open
                  a comparison sub-dialog; Delete applies immediately.
                </p>
              </header>

              <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-4 tw-gap-y-2 tw-border-b tw-px-6 tw-py-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Label htmlFor="unified-project" className="tw-text-xs tw-text-muted-foreground">
                    Project
                  </Label>
                  <Select value={projectId} onValueChange={setProjectId}>
                    <SelectTrigger id="unified-project" className="tw-h-8 tw-w-52">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_PROJECTS.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <span className="tw-ml-auto tw-text-xs tw-text-muted-foreground">
                  {`${totalPresent} of ${allBooks.length} books present`}
                </span>
              </div>

              {/* Permanent toolbar: filter + import (icon) + copy-from selector, all inline. */}
              <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-border-b tw-px-6 tw-py-2">
                <Input
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Filter books…"
                  className="tw-h-8 tw-max-w-xs"
                  aria-label="Filter books"
                />
                {/* Connected toggle buttons: drive the table's last column. */}
                <ToggleGroup
                  type="single"
                  value={mode}
                  onValueChange={(v) => {
                    if (v) setMode(v as typeof mode);
                  }}
                  className="tw-rounded-lg tw-bg-muted tw-p-1"
                >
                  <ToggleGroupItem
                    value="create"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=off]:tw-text-muted-foreground data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm"
                  >
                    <BookPlus className="tw-mr-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Create
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="import"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=off]:tw-text-muted-foreground data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm"
                  >
                    <Download className="tw-mr-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Import
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="copy"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=off]:tw-text-muted-foreground data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm"
                  >
                    <Copy className="tw-mr-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Copy from
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="delete"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=off]:tw-text-muted-foreground data-[state=on]:!tw-text-destructive data-[state=on]:tw-shadow-sm"
                  >
                    <Trash2 className="tw-mr-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Delete
                  </ToggleGroupItem>
                </ToggleGroup>
                <div className="tw-ml-auto tw-flex tw-flex-nowrap tw-items-center tw-gap-2">
                  <Label
                    htmlFor="unified-source"
                    className="tw-whitespace-nowrap tw-text-xs tw-text-muted-foreground"
                  >
                    Copy from
                  </Label>
                  <Select
                    value={sourceProjectId ?? '__none__'}
                    onValueChange={(v) => setSourceProjectId(v === '__none__' ? undefined : v)}
                  >
                    <SelectTrigger id="unified-source" className="tw-h-8 tw-w-32">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">None</SelectItem>
                      {otherProjects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto">
                <Table>
                  <TableHeader className="tw-sticky tw-top-0 tw-z-10 tw-bg-background">
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead className="tw-w-40">Last modified</TableHead>
                      {sourceProjectId && (
                        <TableHead className="tw-w-40">
                          {`Last modified in ${sourceShortName}`}
                        </TableHead>
                      )}
                      <TableHead className="tw-w-24 tw-text-center">
                        {mode === 'delete' && (
                          <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                            <Checkbox
                              checked={headerDeleteState}
                              disabled={visiblePresentBooks.length === 0}
                              onCheckedChange={() =>
                                toggleAll(visiblePresentBooks, deleteSelected, setDeleteSelected)
                              }
                              aria-label="Select all present books for delete"
                            />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    className="tw-h-7 tw-w-7"
                                    disabled={deleteSelected.size === 0}
                                    onClick={bulkDelete}
                                    aria-label={
                                      deleteSelected.size > 0
                                        ? `Delete ${deleteSelected.size} selected`
                                        : 'Select books to delete'
                                    }
                                  >
                                    <Trash2 className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                  </Button>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {deleteSelected.size > 0
                                  ? `Delete ${deleteSelected.size} selected`
                                  : 'Select books to delete'}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                        {mode === 'create' && (
                          <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                            <Checkbox
                              checked={headerCreateState}
                              disabled={visibleAbsentBooks.length === 0}
                              onCheckedChange={() =>
                                toggleAll(visibleAbsentBooks, createSelected, setCreateSelected)
                              }
                              aria-label="Select all absent books for create"
                            />
                            <DropdownMenu>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="tw-h-7 tw-w-7"
                                        disabled={createSelected.size === 0}
                                        aria-label={
                                          createSelected.size > 0
                                            ? `Create ${createSelected.size} selected`
                                            : 'Select books to create'
                                        }
                                      >
                                        <BookPlus className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                      </Button>
                                    </DropdownMenuTrigger>
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {createSelected.size > 0
                                    ? `Create ${createSelected.size} selected`
                                    : 'Select books to create'}
                                </TooltipContent>
                              </Tooltip>
                              <DropdownMenuPortal>
                                <DropdownMenuContent align="end">
                                  {(Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]).map(
                                    (m) => (
                                      <DropdownMenuItem
                                        key={m}
                                        onClick={() =>
                                          handleApplyCreate(Array.from(createSelected), m)
                                        }
                                      >
                                        {CREATE_METHOD_LABELS[m]}
                                      </DropdownMenuItem>
                                    ),
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenuPortal>
                            </DropdownMenu>
                          </div>
                        )}
                        {mode === 'copy' && (
                          <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                            <Checkbox
                              checked={headerCopyState}
                              disabled={visibleCopyableBooks.length === 0}
                              onCheckedChange={() =>
                                toggleAll(visibleCopyableBooks, copySelected, setCopySelected)
                              }
                              aria-label="Select all copyable books"
                            />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="tw-h-7 tw-w-7"
                                    disabled={copySelected.size === 0}
                                    onClick={() => setCopyTargets(Array.from(copySelected))}
                                    aria-label={
                                      copySelected.size > 0
                                        ? `Copy ${copySelected.size} selected from ${sourceShortName}`
                                        : 'Select books to copy'
                                    }
                                  >
                                    <Copy className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                  </Button>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {!sourceProjectId
                                  ? 'Pick a “Copy from” project first'
                                  : copySelected.size > 0
                                    ? `Copy ${copySelected.size} selected from ${sourceShortName}`
                                    : 'Select books to copy'}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                        {mode === 'import' && (
                          <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                            <Checkbox
                              checked={headerImportState}
                              disabled={visibleBooks.length === 0}
                              onCheckedChange={() =>
                                toggleAll(visibleBooks, importSelected, setImportSelected)
                              }
                              aria-label="Select all books for import"
                            />
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="tw-h-7 tw-w-7"
                                    disabled={importSelected.size === 0}
                                    onClick={() => setImportTargets(Array.from(importSelected))}
                                    aria-label={
                                      importSelected.size > 0
                                        ? `Import ${importSelected.size} selected`
                                        : 'Select books to import'
                                    }
                                  >
                                    <Download className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                  </Button>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {importSelected.size > 0
                                  ? `Import ${importSelected.size} selected`
                                  : 'Select books to import'}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleBooks.map((book) => {
                      const isPresent = current.present.has(book);
                      const destDate = current.dates[book];
                      const sourceHas = sourceData?.present.has(book) ?? false;
                      const sourceDate = sourceData?.dates[book];
                      return (
                        <TableRow key={book}>
                          <TableCell className="tw-py-1">
                            <div className="tw-flex tw-flex-col">
                              <span className="tw-font-medium">{book}</span>
                              <span className="tw-text-xs tw-text-muted-foreground">
                                {Canon.bookIdToEnglishName(book)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="tw-py-1 tw-text-xs tw-text-muted-foreground">
                            {isPresent ? (destDate ?? '—') : '—'}
                          </TableCell>
                          {sourceProjectId && (
                            <TableCell className="tw-py-1">
                              {renderSideBadge(
                                sourceHas,
                                sourceDate,
                                isPresent ? destDate : undefined,
                              )}
                            </TableCell>
                          )}
                          <TableCell className="tw-py-1 tw-text-center">
                            {mode === 'delete' && isPresent && (
                              <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                                <Checkbox
                                  checked={deleteSelected.has(book)}
                                  onCheckedChange={() => toggleDelete(book)}
                                  aria-label={`Mark ${book} for delete`}
                                />
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="tw-h-7 tw-w-7 tw-text-destructive hover:tw-text-destructive"
                                      onClick={() => deleteOneBook(book)}
                                      aria-label={`Delete ${book}`}
                                    >
                                      <Trash2 className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>{`Delete ${book}`}</TooltipContent>
                                </Tooltip>
                              </div>
                            )}
                            {mode === 'create' && !isPresent && (
                              <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                                <Checkbox
                                  checked={createSelected.has(book)}
                                  onCheckedChange={() => toggleCreate(book)}
                                  aria-label={`Mark ${book} for create`}
                                />
                                <DropdownMenu>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="tw-h-7 tw-w-7"
                                          aria-label={`Create ${book}`}
                                        >
                                          <BookPlus className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                        </Button>
                                      </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>{`Create ${book}`}</TooltipContent>
                                  </Tooltip>
                                  <DropdownMenuPortal>
                                    <DropdownMenuContent align="end">
                                      {(Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]).map(
                                        (m) => (
                                          <DropdownMenuItem
                                            key={m}
                                            onClick={() => handleApplyCreate([book], m)}
                                          >
                                            {CREATE_METHOD_LABELS[m]}
                                          </DropdownMenuItem>
                                        ),
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenuPortal>
                                </DropdownMenu>
                              </div>
                            )}
                            {mode === 'copy' && sourceHas && (
                              <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                                <Checkbox
                                  checked={copySelected.has(book)}
                                  onCheckedChange={() => toggleCopy(book)}
                                  aria-label={`Mark ${book} for copy`}
                                />
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="tw-h-7 tw-w-7"
                                      onClick={() => setCopyTargets([book])}
                                      aria-label={`Copy ${book} from ${sourceShortName}`}
                                    >
                                      <Copy className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>{`Copy from ${sourceShortName}…`}</TooltipContent>
                                </Tooltip>
                              </div>
                            )}
                            {mode === 'import' && (
                              <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                                <Checkbox
                                  checked={importSelected.has(book)}
                                  onCheckedChange={() => toggleImport(book)}
                                  aria-label={`Mark ${book} for import`}
                                />
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="tw-h-7 tw-w-7"
                                      onClick={() => setImportTargets([book])}
                                      aria-label={`Import ${book} from file`}
                                    >
                                      <Download className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Import from file…</TooltipContent>
                                </Tooltip>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <footer className="tw-flex tw-justify-end tw-border-t tw-px-6 tw-py-3">
                <Button onClick={() => setOpen(false)}>Close</Button>
              </footer>
            </div>
          </TooltipProvider>
        </DialogContent>
      </Dialog>

      <CopySubDialog
        books={copyTargets}
        sourceProjectId={sourceProjectId}
        destProjectId={projectId}
        projectsData={projectsData}
        onClose={() => setCopyTargets([])}
        onApply={handleApplyCopy}
      />
      <ImportSubDialog
        books={importTargets}
        destProjectId={projectId}
        projectsData={projectsData}
        onClose={() => setImportTargets([])}
        onApply={handleApplyImport}
      />
    </>
  );
}

// --------------------------------------------------------------------------
// SELECTION-FIRST: books-as-rows with a floating action bar. Row checkboxes
// drive selection for bulk actions; the same actions are also available as
// per-row shortcuts that appear on hover. Create/Copy/Import/Delete each
// work identically on a single book or a multi-book selection. Reuses
// CopySubDialog and ImportSubDialog from the Unified story.
// --------------------------------------------------------------------------

function SelectionRowActions({
  book,
  isPresent,
  otherProjects,
  onDelete,
  onCreate,
  onCopyFrom,
  onImport,
}: {
  book: string;
  isPresent: boolean;
  otherProjects: typeof MOCK_PROJECTS;
  onDelete: () => void;
  onCreate: (m: CreateMethod) => void;
  onCopyFrom: (sourceId: string) => void;
  onImport: () => void;
}) {
  return (
    <div className="tw-flex tw-items-center tw-gap-0.5">
      {!isPresent && (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="tw-h-7 tw-w-7 tw-text-muted-foreground group-focus-within:tw-text-primary group-hover:tw-text-primary"
                  aria-label={`Create ${book}`}
                >
                  <BookPlus className="tw-h-3.5 tw-w-3.5" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Create…</TooltipContent>
          </Tooltip>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              {(Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]).map((m) => (
                <DropdownMenuItem key={m} onClick={() => onCreate(m)}>
                  {CREATE_METHOD_LABELS[m]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      )}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-7 tw-w-7 tw-text-muted-foreground group-focus-within:tw-text-primary group-hover:tw-text-primary"
                aria-label={`Copy ${book} from another project`}
              >
                <Copy className="tw-h-3.5 tw-w-3.5" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Copy from…</TooltipContent>
        </Tooltip>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end">
            {otherProjects.map((p) => (
              <DropdownMenuItem key={p.id} onClick={() => onCopyFrom(p.id)}>
                {p.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="tw-h-7 tw-w-7 tw-text-muted-foreground group-focus-within:tw-text-primary group-hover:tw-text-primary"
            onClick={onImport}
            aria-label={`Import ${book} from file`}
          >
            <Download className="tw-h-3.5 tw-w-3.5" aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Import from file…</TooltipContent>
      </Tooltip>
      {isPresent && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="tw-h-7 tw-w-7 tw-text-muted-foreground group-focus-within:tw-text-destructive group-hover:tw-text-destructive"
              onClick={onDelete}
              aria-label={`Delete ${book}`}
            >
              <Trash2 className="tw-h-3.5 tw-w-3.5" aria-hidden />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

function SelectionManageBooksDialog() {
  const [open, setOpen] = useState(true);
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const [projectsData, setProjectsData] = useState<Record<string, ProjectBookState>>(() =>
    createInitialProjectBooks(),
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'all' | 'present' | 'absent'>('all');
  const [filter, setFilter] = useState('');
  const [copyTargets, setCopyTargets] = useState<string[]>([]);
  const [copySourceId, setCopySourceId] = useState<string | undefined>(undefined);
  const [importTargets, setImportTargets] = useState<string[]>([]);

  const project = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const current = projectsData[projectId] ?? { present: new Set<string>(), dates: {} };
  const allBooks = useMemo(() => [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS], []);
  const otherProjects = MOCK_PROJECTS.filter((p) => p.id !== projectId);

  // Reset selection when the destination project changes (selection is project-scoped).
  useEffect(() => setSelected(new Set()), [projectId]);

  const filterTerm = filter.trim().toLowerCase();
  const visibleBooks = allBooks.filter((b) => {
    const isPresent = current.present.has(b);
    if (view === 'present' && !isPresent) return false;
    if (view === 'absent' && isPresent) return false;
    if (!filterTerm) return true;
    return (
      b.toLowerCase().includes(filterTerm) ||
      Canon.bookIdToEnglishName(b).toLowerCase().includes(filterTerm)
    );
  });

  const selectedArr = Array.from(selected);
  const selectedPresent = selectedArr.filter((b) => current.present.has(b));
  const selectedAbsent = selectedArr.filter((b) => !current.present.has(b));
  const toggleOne = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  const applyToCurrent = (mutate: (p: ProjectBookState) => ProjectBookState) =>
    setProjectsData((prev) => ({ ...prev, [projectId]: mutate(prev[projectId]) }));

  const dropSelected = (books: string[]) =>
    setSelected((prev) => {
      const next = new Set(prev);
      books.forEach((b) => next.delete(b));
      return next;
    });

  const deleteBooks = (books: string[]) => {
    if (books.length === 0) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        nextPresent.delete(b);
        delete nextDates[b];
      });
      return { present: nextPresent, dates: nextDates };
    });
    dropSelected(books);
  };

  const createBooks = (books: string[], _method: CreateMethod) => {
    if (books.length === 0) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        nextPresent.add(b);
        nextDates[b] = todayISO();
      });
      return { present: nextPresent, dates: nextDates };
    });
    dropSelected(books);
  };

  const beginCopy = (books: string[], sourceId: string) => {
    if (books.length === 0) return;
    setCopySourceId(sourceId);
    setCopyTargets(books);
  };
  const beginImport = (books: string[]) => {
    if (books.length === 0) return;
    setImportTargets(books);
  };

  const handleApplyCopy = (books: string[], sourceId: string) => {
    const srcData = projectsData[sourceId];
    if (!srcData) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        if (srcData.present.has(b)) {
          nextPresent.add(b);
          nextDates[b] = srcData.dates[b] ?? todayISO();
        }
      });
      return { present: nextPresent, dates: nextDates };
    });
    setCopyTargets([]);
    setCopySourceId(undefined);
    dropSelected(books);
  };

  const handleApplyImport = (rows: { book: string; overwrite: boolean }[]) => {
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      rows.forEach((r) => {
        if (nextPresent.has(r.book) && !r.overwrite) return;
        nextPresent.add(r.book);
        nextDates[r.book] = todayISO();
      });
      return { present: nextPresent, dates: nextDates };
    });
    setImportTargets([]);
    dropSelected(rows.map((r) => r.book));
  };

  const headerSelectState: boolean | 'indeterminate' = (() => {
    if (visibleBooks.length === 0 || selected.size === 0) return false;
    if (visibleBooks.every((b) => selected.has(b))) return true;
    return visibleBooks.some((b) => selected.has(b)) ? 'indeterminate' : false;
  })();
  const toggleAllVisible = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      const allSel = visibleBooks.every((b) => next.has(b));
      if (allSel) visibleBooks.forEach((b) => next.delete(b));
      else visibleBooks.forEach((b) => next.add(b));
      return next;
    });

  const totalPresent = allBooks.filter((b) => current.present.has(b)).length;
  const subDialogOpen = copyTargets.length > 0 || importTargets.length > 0;

  return (
    <>
      <style>{`
        [data-radix-popper-content-wrapper],
        [data-radix-select-content],
        [data-radix-popover-content],
        [data-radix-menu-content] {
          z-index: 600 !important;
          pointer-events: auto !important;
        }
      `}</style>
      <Button onClick={() => setOpen(true)}>Open Selection Manage Books</Button>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="tw-h-[80vh] tw-w-[95vw] tw-max-w-4xl tw-gap-0 tw-overflow-hidden tw-p-0"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => {
            const wrapper = document.querySelector(
              '[data-radix-popper-content-wrapper][data-state="open"]',
            );
            if (wrapper || subDialogOpen) e.preventDefault();
          }}
        >
          <TooltipProvider delayDuration={200}>
            <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
              <header className="tw-flex tw-items-center tw-gap-3 tw-border-b tw-px-6 tw-py-4">
                <BookOpenCheck className="tw-h-5 tw-w-5 tw-text-muted-foreground" aria-hidden />
                <div className="tw-flex tw-flex-col">
                  <h2 className="tw-text-lg tw-font-semibold">Manage Books</h2>
                  <p className="tw-text-xs tw-text-muted-foreground">
                    {`${totalPresent} of ${allBooks.length} canonical books in ${project.shortName}`}
                  </p>
                </div>
                <div className="tw-ml-auto tw-flex tw-items-center tw-gap-2">
                  <Label htmlFor="sel-project" className="tw-text-xs tw-text-muted-foreground">
                    Project
                  </Label>
                  <Select value={projectId} onValueChange={setProjectId}>
                    <SelectTrigger id="sel-project" className="tw-h-8 tw-w-60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_PROJECTS.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </header>

              <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-border-b tw-px-6 tw-py-2">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Checkbox
                    id="sel-all"
                    checked={headerSelectState}
                    disabled={visibleBooks.length === 0}
                    onCheckedChange={toggleAllVisible}
                    aria-label="Select all visible books"
                  />
                  <Label htmlFor="sel-all" className="tw-text-xs tw-text-muted-foreground">
                    {selected.size > 0 ? `${selected.size} selected` : 'Select all visible'}
                  </Label>
                </div>
                <Input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter books…"
                  className="tw-h-8 tw-max-w-xs"
                  aria-label="Filter books"
                />
                <ToggleGroup
                  type="single"
                  value={view}
                  onValueChange={(v) => v && setView(v as typeof view)}
                  className="tw-ml-auto tw-rounded-lg tw-bg-muted tw-p-1"
                >
                  <ToggleGroupItem
                    value="all"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                  >
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="present"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                  >
                    In project
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="absent"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                  >
                    Missing
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-2 tw-py-2">
                {visibleBooks.length === 0 ? (
                  <div className="tw-flex tw-min-h-40 tw-items-center tw-justify-center tw-text-sm tw-text-muted-foreground">
                    No books match the current filter.
                  </div>
                ) : (
                  <ul className="tw-flex tw-flex-col tw-gap-0.5">
                    {visibleBooks.map((book) => {
                      const isPresent = current.present.has(book);
                      const date = current.dates[book];
                      const isSelected = selected.has(book);
                      return (
                        <li
                          key={book}
                          className={cn(
                            'tw-group tw-flex tw-items-center tw-gap-3 tw-rounded-md tw-px-3 tw-py-1.5 tw-text-sm hover:tw-bg-accent/60',
                            isSelected && 'tw-bg-accent',
                          )}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleOne(book)}
                            aria-label={`Select ${book}`}
                          />
                          <span
                            aria-hidden
                            className={cn(
                              'tw-inline-block tw-h-2 tw-w-2 tw-rounded-full',
                              isPresent ? 'tw-bg-primary' : 'tw-bg-muted-foreground/30',
                            )}
                          />
                          <div className="tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2">
                            <span className="tw-font-medium">{book}</span>
                            <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                              {Canon.bookIdToEnglishName(book)}
                            </span>
                          </div>
                          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
                            {isPresent ? (
                              <Badge variant="secondary" className="tw-font-normal">
                                {date ?? 'Present'}
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="tw-font-normal tw-text-muted-foreground"
                              >
                                Missing
                              </Badge>
                            )}
                            <SelectionRowActions
                              book={book}
                              isPresent={isPresent}
                              otherProjects={otherProjects}
                              onDelete={() => deleteBooks([book])}
                              onCreate={(m) => createBooks([book], m)}
                              onCopyFrom={(sourceId) => beginCopy([book], sourceId)}
                              onImport={() => beginImport([book])}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {selected.size > 0 && (
                <div className="tw-border-t tw-bg-muted/40 tw-px-6 tw-py-3">
                  <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
                    <span className="tw-text-sm tw-font-medium">{`${selected.size} selected`}</span>
                    {selectedPresent.length > 0 && selectedAbsent.length > 0 && (
                      <span className="tw-text-xs tw-text-muted-foreground">
                        {`(${selectedPresent.length} in project · ${selectedAbsent.length} missing)`}
                      </span>
                    )}
                    <div className="tw-ml-auto tw-flex tw-flex-wrap tw-items-center tw-gap-2">
                      <DropdownMenu>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={selectedAbsent.length === 0}
                                >
                                  <BookPlus className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                                  {selectedAbsent.length > 0 &&
                                  selectedAbsent.length !== selected.size
                                    ? `Create ${selectedAbsent.length}`
                                    : 'Create'}
                                </Button>
                              </DropdownMenuTrigger>
                            </span>
                          </TooltipTrigger>
                          {selectedAbsent.length === 0 ? (
                            <TooltipContent>No missing books in selection</TooltipContent>
                          ) : selectedPresent.length > 0 ? (
                            <TooltipContent>
                              {`Creates the ${selectedAbsent.length} missing book${selectedAbsent.length === 1 ? '' : 's'}; skips ${selectedPresent.length} already present`}
                            </TooltipContent>
                          ) : undefined}
                        </Tooltip>
                        <DropdownMenuPortal>
                          <DropdownMenuContent align="end">
                            {(Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]).map((m) => (
                              <DropdownMenuItem
                                key={m}
                                onClick={() => createBooks(selectedAbsent, m)}
                              >
                                {CREATE_METHOD_LABELS[m]}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Copy className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                            Copy from…
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuContent align="end">
                            {otherProjects.map((p) => (
                              <DropdownMenuItem
                                key={p.id}
                                onClick={() => beginCopy(selectedArr, p.id)}
                              >
                                {p.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>

                      <Button variant="outline" size="sm" onClick={() => beginImport(selectedArr)}>
                        <Download className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                        Import from files…
                      </Button>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={selectedPresent.length === 0}
                              onClick={() => deleteBooks(selectedPresent)}
                            >
                              <Trash2 className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                              {selectedPresent.length > 0 &&
                              selectedPresent.length !== selected.size
                                ? `Delete ${selectedPresent.length}`
                                : 'Delete'}
                            </Button>
                          </span>
                        </TooltipTrigger>
                        {selectedPresent.length === 0 ? (
                          <TooltipContent>No books in the project are selected</TooltipContent>
                        ) : selectedAbsent.length > 0 ? (
                          <TooltipContent>
                            {`Deletes the ${selectedPresent.length} present book${selectedPresent.length === 1 ? '' : 's'}; skips ${selectedAbsent.length} not in project`}
                          </TooltipContent>
                        ) : undefined}
                      </Tooltip>

                      <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <footer className="tw-flex tw-justify-end tw-border-t tw-px-6 tw-py-3">
                <Button onClick={() => setOpen(false)}>Close</Button>
              </footer>
            </div>
          </TooltipProvider>
        </DialogContent>
      </Dialog>

      <CopySubDialog
        books={copyTargets}
        sourceProjectId={copySourceId}
        destProjectId={projectId}
        projectsData={projectsData}
        onClose={() => {
          setCopyTargets([]);
          setCopySourceId(undefined);
        }}
        onApply={handleApplyCopy}
      />
      <ImportSubDialog
        books={importTargets}
        destProjectId={projectId}
        projectsData={projectsData}
        onClose={() => setImportTargets([])}
        onApply={handleApplyImport}
      />
    </>
  );
}

// --------------------------------------------------------------------------
// GROUPED SELECTION-FIRST: variant of SELECTION-FIRST where the All / In
// project / Missing filter is replaced by the view-list-select group-by
// toggle (None / Canon / Status), the bulk "Select all visible" affordance
// is replaced by per-group section headers (each with its own select-all
// checkbox), and a Show / Copy from / Import-from-files toggle group sits
// above the list. The chosen workflow drives both what comparison columns
// the rows expose (Show: project date only; Copy: source/dest date + state
// badge; Import: per-row file pick + dest date + state badge) and which
// commit button appears in the footer (Show: Create + Delete; Copy: Copy;
// Import: Import). Picking Copy from opens a project dropdown; picking
// Import opens a native multi-select file dialog and matches files to book
// ids by name. Both happen inline — no comparison sub-dialog.
// --------------------------------------------------------------------------

type GroupedWorkflow = 'manage' | 'progress' | 'copy' | 'import';

function GroupedSelectionFirstManageBooksDialog() {
  const [open, setOpen] = useState(true);
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const [projectsData, setProjectsData] = useState<Record<string, ProjectBookState>>(() =>
    createInitialProjectBooks(),
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [groupBy, setGroupBy] = useState<BookGridGroupBy>('status');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filter, setFilter] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [workflow, setWorkflow] = useState<GroupedWorkflow>('manage');
  const [copySourceId, setCopySourceId] = useState<string | undefined>(undefined);
  const [importFiles, setImportFiles] = useState<Record<string, { name: string; date: string }>>(
    {},
  );
  // When a per-row "Pick file…" button triggers the file input, this records the book
  // the file should be assigned to so the change handler can route it correctly.
  const importActiveBookRef = useRef<string | undefined>(undefined);
  const importFileInputRef = useRef<HTMLInputElement>(null);

  const project = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const current = projectsData[projectId] ?? { present: new Set<string>(), dates: {} };
  const allBooks = useMemo(() => [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS], []);
  const knownBookIds = useMemo(() => new Set(Canon.allBookIds), []);
  const otherProjects = MOCK_PROJECTS.filter((p) => p.id !== projectId);
  // Tracked-books set powers Progress workflow's grouping, badges, and
  // mutual-exclusion rule (Start tracking XOR Stop tracking, mirroring
  // Manage's Create XOR Delete).
  const tracked = useMemo(() => PROJECT_TRACKED_BOOKS[projectId] ?? new Set<string>(), [projectId]);

  // Selection is per-workflow: the same checked checkboxes mean different things in
  // each mode (books to act on vs. books to copy vs. books to import), so reset on
  // workflow change rather than carrying stale picks across.
  useEffect(() => setSelected(new Set()), [projectId, workflow]);

  // When files are picked for Import, auto-check those rows — the user just declared
  // intent by attaching files; making them re-check the checkboxes would be redundant.
  useEffect(() => {
    if (workflow !== 'import') return;
    setSelected((prev) => {
      const next = new Set(prev);
      Object.keys(importFiles).forEach((b) => next.add(b));
      return next;
    });
  }, [workflow, importFiles]);

  const sourceData = copySourceId ? projectsData[copySourceId] : undefined;
  const sourceProject = copySourceId
    ? (MOCK_PROJECTS.find((p) => p.id === copySourceId) ?? undefined)
    : undefined;

  const openImportFileDialog = (book?: string) => {
    importActiveBookRef.current = book;
    importFileInputRef.current?.click();
  };

  const handleImportFilesPicked = async (files: FileList | null) => {
    const activeBook = importActiveBookRef.current;
    importActiveBookRef.current = undefined;
    if (!files || files.length === 0) return;
    const today = todayISO();
    if (activeBook) {
      // Per-row pick: assign the first picked file to the active book regardless of
      // filename — the user explicitly chose this file for this book.
      const file = files[0];
      setImportFiles((prev) => ({
        ...prev,
        [activeBook]: { name: file.name, date: today },
      }));
      return;
    }
    // Bulk pick: each file maps to one book. Two-stage match:
    //   1. Read the file's first 1KB and look for the USFM `\id <CODE>` marker.
    //      That's the canonical declaration of which book a USFM file holds and
    //      is independent of how the file was named.
    //   2. Fall back to scanning the filename for any 3-char window that
    //      matches a known book id (handles Paratext-style "01GEN.SFM" /
    //      "40-MAT.usfm" / plain "GEN.usfm" naming). Earliest match wins.
    // Files whose inferred book is already imported overwrite the existing
    // entry — replacing-on-conflict matches the user's expectation that
    // picking the same book again is a deliberate update — and are surfaced
    // as a separate Sonner warning so the swap is visible (not silent).
    const inferred: Record<string, { name: string; date: string }> = {};
    const skipped: string[] = [];
    const duplicates: { book: string; oldName: string; newName: string }[] = [];
    const idFromName = (name: string): string | undefined => {
      const upper = name.toUpperCase();
      for (let i = 0; i + 3 <= upper.length; i += 1) {
        const candidate = upper.slice(i, i + 3);
        if (/^[A-Z0-9]{3}$/.test(candidate) && knownBookIds.has(candidate)) {
          return candidate;
        }
      }
      return undefined;
    };
    const idFromUsfm = async (file: File): Promise<string | undefined> => {
      try {
        const head = await file.slice(0, 1024).text();
        const m = head.match(/\\id\s+([A-Za-z0-9]{3})\b/);
        if (!m) return undefined;
        const code = m[1].toUpperCase();
        return knownBookIds.has(code) ? code : undefined;
      } catch {
        return undefined;
      }
    };
    await Promise.all(
      Array.from(files).map(async (file) => {
        const book = (await idFromUsfm(file)) ?? idFromName(file.name);
        if (!book) {
          skipped.push(file.name);
          return;
        }
        // If something already maps to this book — either persisted in
        // importFiles or matched earlier in this same pick — record the
        // swap and let the new file overwrite. Picking the same book
        // again is interpreted as a deliberate update.
        const existingName = inferred[book]?.name ?? importFiles[book]?.name;
        if (existingName) {
          duplicates.push({ book, oldName: existingName, newName: file.name });
        }
        inferred[book] = { name: file.name, date: today };
      }),
    );
    if (duplicates.length > 0) {
      sonner.warning(
        duplicates.length === 1
          ? `Updated import file for ${duplicates[0].book}`
          : `Updated import files for ${duplicates.length} books`,
        {
          description:
            duplicates.length <= 3
              ? duplicates.map((d) => `${d.book}: "${d.oldName}" → "${d.newName}"`).join(', ')
              : `Including ${duplicates
                  .slice(0, 2)
                  .map((d) => d.book)
                  .join(', ')} and ${duplicates.length - 2} more.`,
        },
      );
    }
    if (Object.keys(inferred).length === 0) {
      // Nothing made it into the batch. If duplicates explain that (the
      // duplicate-files warning already fired), don't pile a second toast
      // on top — only emit the no-match error when actual unmatched files
      // were the cause.
      if (skipped.length > 0 && duplicates.length === 0) {
        sonner.error('No files could be matched to a book', {
          description:
            skipped.length === 1
              ? `"${skipped[0]}" doesn't contain a recognized book id.`
              : `${skipped.length} file${skipped.length === 1 ? '' : 's'} couldn't be matched. File names need to contain a 3-letter book id (e.g. GEN, MAT).`,
        });
      }
      return;
    }
    if (skipped.length > 0) {
      // Partial match: still proceed with the recognized files, but warn so the
      // user knows some of their picks didn't make it into the table.
      sonner.warning(
        `Skipped ${skipped.length} file${skipped.length === 1 ? '' : 's'} that couldn't be matched to a book`,
        {
          description:
            skipped.length <= 3
              ? skipped.map((s) => `"${s}"`).join(', ')
              : `Including "${skipped.slice(0, 2).join('", "')}" and ${skipped.length - 2} more.`,
        },
      );
    }
    setImportFiles((prev) => ({ ...prev, ...inferred }));
    setWorkflow('import');
  };

  const pickCopySource = (sourceId: string) => {
    setCopySourceId(sourceId);
    setWorkflow('copy');
  };

  const matches = useMemo(() => makeBookMatcher(filter), [filter]);
  const isFiltered = filter.trim().length > 0;
  // The row list is workflow-scoped: Manage lists every canonical book; Progress
  // lists only books that exist in the destination project (only present books
  // can have progress); Copy lists only books that the chosen source project
  // actually has (rows the user can copy from); Import lists only books that
  // have an imported file. The table empties out until the prerequisite is
  // met, which keeps the visible rows actionable.
  const visibleBooks = useMemo(() => {
    let source: string[];
    if (workflow === 'import') {
      source = allBooks.filter((b) => importFiles[b]);
    } else if (workflow === 'copy') {
      source = sourceData ? allBooks.filter((b) => sourceData.present.has(b)) : [];
    } else if (workflow === 'progress') {
      source = allBooks.filter((b) => current.present.has(b));
    } else {
      source = allBooks;
    }
    return source.filter(matches);
  }, [allBooks, matches, workflow, importFiles, sourceData, current]);

  // Per-book comparison state for the active workflow. Used by both the row rendering
  // (list view) and the BookGridSelector items (grid view) so the table and the grid
  // surface the same Newer/Older/Same/New badge for each row.
  type RowCompare = {
    state?: ComparisonState;
    primaryDate?: string;
    primaryLabel?: string;
    secondaryDate?: string;
    secondaryLabel?: string;
  };
  const compareForBook = (book: string): RowCompare => {
    const destHas = current.present.has(book);
    const destDate = destHas ? current.dates[book] : undefined;
    if (workflow === 'copy' && sourceData) {
      const srcHas = sourceData.present.has(book);
      const srcDate = srcHas ? sourceData.dates[book] : undefined;
      const state = computeCompareState(srcDate, destDate);
      return {
        state,
        primaryDate: srcDate,
        primaryLabel: sourceProject ? `From ${sourceProject.shortName}` : 'From source',
        secondaryDate: destDate,
        secondaryLabel: `In ${project.shortName}`,
      };
    }
    if (workflow === 'import') {
      const file = importFiles[book];
      const state = file ? computeCompareState(file.date, destDate) : undefined;
      return {
        state,
        primaryDate: file?.date,
        primaryLabel: file ? `File (${file.name})` : 'File',
        secondaryDate: destDate,
        secondaryLabel: `In ${project.shortName}`,
      };
    }
    return {
      primaryDate: destDate,
      primaryLabel: 'Last modified',
    };
  };

  const items = useMemo<BookGridItem[]>(() => {
    // Type-lock detection — derived from `selected` directly so the useMemo
    // only depends on `selected`, `current.present`, and `tracked` rather
    // than the recomputed arrays declared below. The "type" varies by
    // workflow: Manage uses present/absent; Progress uses tracked/untracked.
    let hasSelPresent = false;
    let hasSelAbsent = false;
    let hasSelTracked = false;
    let hasSelUntracked = false;
    selected.forEach((b) => {
      if (current.present.has(b)) hasSelPresent = true;
      else hasSelAbsent = true;
      if (tracked.has(b)) hasSelTracked = true;
      else hasSelUntracked = true;
    });
    return visibleBooks.map((book) => {
      const isPresent = current.present.has(book);
      const isTracked = tracked.has(book);
      const isSelected = selected.has(book);
      const cmp = compareForBook(book);
      const tone =
        cmp.state && cmp.state !== 'Missing'
          ? (toneForComparisonState(cmp.state) as Exclude<BookGridTone, 'neutral'>)
          : 'neutral';
      const statusLabel =
        workflow === 'manage'
          ? isPresent
            ? 'In project'
            : 'Not in project'
          : workflow === 'progress'
            ? isTracked
              ? 'Tracked'
              : 'Untracked'
            : (cmp.state ?? (isPresent ? 'In project' : 'Not in project'));
      // Disabled rules mirror the list view's rowActionable: in Manage and
      // Progress the workflow exposes two mutually-exclusive footer
      // actions, so the row of the "other" type is disabled once a
      // selection of one type exists. Already-selected rows stay enabled
      // so the user can uncheck.
      const manageLocked =
        workflow === 'manage' &&
        !isSelected &&
        (hasSelPresent || hasSelAbsent) &&
        (isPresent ? !hasSelPresent : !hasSelAbsent);
      const progressLocked =
        workflow === 'progress' &&
        !isSelected &&
        (hasSelTracked || hasSelUntracked) &&
        (isTracked ? !hasSelTracked : !hasSelUntracked);
      const locked = manageLocked || progressLocked;
      // Progress overrides for the grid view: surface percentage + priority
      // through the tooltip-data slots (primaryDate / secondaryDate; the
      // BookGridSelector receives matching labels via primaryDateLabel /
      // secondaryDateLabel) and pin a small percentage chip onto the pill
      // itself via the `trailing` slot. Untracked rows leave the slots
      // empty since there's no progress to show.
      const progressN = deterministicNumberFromBook(book, 7);
      const priN = deterministicNumberFromBook(book, 13);
      const priLabel = priN >= 67 ? 'High' : priN >= 34 ? 'Medium' : 'Low';
      const progressPrimary =
        workflow === 'progress' && isTracked ? `${progressN}%` : cmp.primaryDate;
      const progressSecondary = workflow === 'progress' && isTracked ? priLabel : cmp.secondaryDate;
      const progressTrailing =
        workflow === 'progress' && isTracked ? (
          <span className="tw-ml-auto tw-shrink-0 tw-text-[10px] tw-font-medium tw-tabular-nums tw-text-muted-foreground">
            {`${progressN}%`}
          </span>
        ) : workflow === 'progress' ? (
          <span className="tw-ml-auto tw-shrink-0 tw-text-[10px] tw-text-muted-foreground">—</span>
        ) : undefined;
      return {
        book,
        present: isPresent,
        tone: tone as BookGridTone,
        statusLabel,
        primaryDate: progressPrimary,
        secondaryDate: progressSecondary,
        trailing: progressTrailing,
        disabled: locked,
        disabledReason: locked
          ? workflow === 'progress'
            ? 'Cannot mix start and stop tracking in one selection'
            : 'Cannot mix create and delete in one selection'
          : undefined,
      };
    });
    // compareForBook depends on workflow + sourceData + importFiles + current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleBooks, current, workflow, sourceData, importFiles, selected, tracked]);

  const totalsByLabel = useMemo<Record<string, number>>(() => {
    const totals: Record<string, number> = {};
    if (groupBy === 'canon') {
      totals['Old Testament'] = OT_BOOKS.length;
      totals['New Testament'] = NT_BOOKS.length;
      totals.Deuterocanon = DC_BOOKS.length;
    } else if (groupBy === 'status') {
      if (workflow === 'progress') {
        const presentBooks = allBooks.filter((b) => current.present.has(b));
        const trackedCount = presentBooks.filter((b) => tracked.has(b)).length;
        totals.Tracked = trackedCount;
        totals.Untracked = presentBooks.length - trackedCount;
      } else {
        const presentCount = allBooks.filter((b) => current.present.has(b)).length;
        totals['In project'] = presentCount;
        totals['Not in project'] = allBooks.length - presentCount;
      }
    }
    return totals;
  }, [groupBy, current, allBooks, workflow, tracked]);

  type ListGroup = { label?: string; books: string[] };
  const listGroups = useMemo<ListGroup[]>(() => {
    if (groupBy === 'none') {
      return visibleBooks.length === 0 ? [] : [{ books: visibleBooks }];
    }
    if (groupBy === 'canon') {
      const otSet = new Set(OT_BOOKS);
      const ntSet = new Set(NT_BOOKS);
      const dcSet = new Set(DC_BOOKS);
      const ot: string[] = [];
      const nt: string[] = [];
      const dc: string[] = [];
      visibleBooks.forEach((b) => {
        if (otSet.has(b)) ot.push(b);
        else if (ntSet.has(b)) nt.push(b);
        else if (dcSet.has(b)) dc.push(b);
      });
      return [
        { label: 'Old Testament', books: ot },
        { label: 'New Testament', books: nt },
        { label: 'Deuterocanon', books: dc },
      ].filter((g) => g.books.length > 0);
    }
    if (workflow === 'progress') {
      // Progress mode swaps in tracked/untracked groups for status grouping
      // — the type axis the workflow's footer actions operate on.
      const trackedBooks: string[] = [];
      const untrackedBooks: string[] = [];
      visibleBooks.forEach((b) => {
        if (tracked.has(b)) trackedBooks.push(b);
        else untrackedBooks.push(b);
      });
      return [
        { label: 'Tracked', books: trackedBooks },
        { label: 'Untracked', books: untrackedBooks },
      ].filter((g) => g.books.length > 0);
    }
    const inProj: string[] = [];
    const notInProj: string[] = [];
    visibleBooks.forEach((b) => {
      if (current.present.has(b)) inProj.push(b);
      else notInProj.push(b);
    });
    return [
      { label: 'In project', books: inProj },
      { label: 'Not in project', books: notInProj },
    ].filter((g) => g.books.length > 0);
  }, [groupBy, visibleBooks, current, workflow, tracked]);

  const selectedArr = Array.from(selected);
  const selectedPresent = selectedArr.filter((b) => current.present.has(b));
  const selectedAbsent = selectedArr.filter((b) => !current.present.has(b));

  const toggleOne = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) {
        next.delete(book);
      } else {
        next.add(book);
      }
      return next;
    });

  const toggleGroupSelectAll = (books: string[]) =>
    setSelected((prev) => {
      const next = new Set(prev);
      const allSelected = books.length > 0 && books.every((b) => next.has(b));
      if (allSelected) {
        books.forEach((b) => next.delete(b));
        return next;
      }
      let toAdd = books;
      // Match the per-row mutual-exclusion rule: when a single-type
      // selection already exists, only add books of that same type. With
      // no current type, add the whole group as-is — Status groups are
      // type-pure so this can't create a mixed selection, and the bulk
      // select-all is hidden for Canon grouping in Manage / Progress so
      // we don't have to defend against canon groups here.
      if (workflow === 'manage') {
        const existing = Array.from(next);
        const hasPresent = existing.some((b) => current.present.has(b));
        const hasAbsent = existing.some((b) => !current.present.has(b));
        if (hasPresent && !hasAbsent) {
          toAdd = books.filter((b) => current.present.has(b));
        } else if (hasAbsent && !hasPresent) {
          toAdd = books.filter((b) => !current.present.has(b));
        }
      } else if (workflow === 'progress') {
        const existing = Array.from(next);
        const hasTracked = existing.some((b) => tracked.has(b));
        const hasUntracked = existing.some((b) => !tracked.has(b));
        if (hasTracked && !hasUntracked) {
          toAdd = books.filter((b) => tracked.has(b));
        } else if (hasUntracked && !hasTracked) {
          toAdd = books.filter((b) => !tracked.has(b));
        }
      }
      toAdd.forEach((b) => next.add(b));
      return next;
    });

  const toggleCollapsed = (label: string) =>
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  const applyToCurrent = (mutate: (p: ProjectBookState) => ProjectBookState) =>
    setProjectsData((prev) => ({ ...prev, [projectId]: mutate(prev[projectId]) }));

  const dropSelected = (books: string[]) =>
    setSelected((prev) => {
      const next = new Set(prev);
      books.forEach((b) => next.delete(b));
      return next;
    });

  const deleteBooks = (books: string[]) => {
    if (books.length === 0) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        nextPresent.delete(b);
        delete nextDates[b];
      });
      return { present: nextPresent, dates: nextDates };
    });
    dropSelected(books);
  };

  const createBooks = (books: string[], _method: CreateMethod) => {
    if (books.length === 0) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        nextPresent.add(b);
        nextDates[b] = todayISO();
      });
      return { present: nextPresent, dates: nextDates };
    });
    dropSelected(books);
  };

  const commitCopy = () => {
    if (!copySourceId || !sourceData) return;
    const books = selectedArr.filter((b) => sourceData.present.has(b));
    if (books.length === 0) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        nextPresent.add(b);
        nextDates[b] = sourceData.dates[b] ?? todayISO();
      });
      return { present: nextPresent, dates: nextDates };
    });
    dropSelected(books);
    // Stay in copy mode so the user can chain another copy from the same source if
    // they want to — the rows just refresh with the new "Same" / "Newer" states.
  };

  const commitImport = () => {
    const books = selectedArr.filter((b) => importFiles[b]);
    if (books.length === 0) return;
    applyToCurrent((p) => {
      const nextPresent = new Set(p.present);
      const nextDates = { ...p.dates };
      books.forEach((b) => {
        nextPresent.add(b);
        nextDates[b] = importFiles[b].date;
      });
      return { present: nextPresent, dates: nextDates };
    });
    dropSelected(books);
    setImportFiles((prev) => {
      const next = { ...prev };
      books.forEach((b) => delete next[b]);
      return next;
    });
  };

  const totalPresent = allBooks.filter((b) => current.present.has(b)).length;

  const renderGroupCount = (label: string, filteredItems: BookGridItem[]) =>
    formatGroupCountText(
      filteredItems.length,
      totalsByLabel[label] ?? filteredItems.length,
      isFiltered,
    );

  return (
    <>
      <style>{`
        [data-radix-popper-content-wrapper],
        [data-radix-select-content],
        [data-radix-popover-content],
        [data-radix-menu-content] {
          z-index: 600 !important;
          pointer-events: auto !important;
        }
      `}</style>
      <Button onClick={() => setOpen(true)}>Open Manage Books (Grouped Selection-first)</Button>
      {/*
        Hidden file input drives the Import-from-files button: clicking the toolbar
        button forwards into the OS multi-select dialog and the resulting files are
        inferred to books by name before the comparison sub-dialog opens. Lives at the
        component root so it isn't unmounted by toolbar re-renders.
      */}
      <input
        ref={importFileInputRef}
        type="file"
        accept=".sfm,.usfm,.usx,.xml"
        multiple
        className="tw-hidden"
        onChange={(e) => {
          handleImportFilesPicked(e.target.files);
          e.target.value = '';
        }}
      />
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="tw-h-[80vh] tw-w-[95vw] tw-max-w-4xl tw-gap-0 tw-overflow-hidden tw-p-0"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => {
            const wrapper = document.querySelector(
              '[data-radix-popper-content-wrapper][data-state="open"]',
            );
            if (wrapper) e.preventDefault();
          }}
        >
          <TooltipProvider delayDuration={200}>
            <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
              <header className="tw-flex tw-items-center tw-gap-3 tw-border-b tw-px-6 tw-py-4">
                <BookOpenCheck className="tw-h-5 tw-w-5 tw-text-muted-foreground" aria-hidden />
                <div className="tw-flex tw-flex-col">
                  <h2 className="tw-text-lg tw-font-semibold">Manage Books</h2>
                  <p className="tw-text-xs tw-text-muted-foreground">
                    {`${totalPresent} of ${allBooks.length} canonical books in ${project.shortName}`}
                  </p>
                </div>
                {/* Right padding (pe-8) keeps the dropdown clear of the
                  dialog's built-in X close button, which sits in the top-
                  right corner with its own ~16-20px hit area. Without it,
                  the dropdown's chevron and the X button visually overlap
                  at narrow dialog widths. */}
                <div className="tw-ml-auto tw-flex tw-items-center tw-gap-2 tw-pe-8">
                  <Label
                    htmlFor="selection-grouped-project"
                    className="tw-text-xs tw-text-muted-foreground"
                  >
                    Project
                  </Label>
                  <Select value={projectId} onValueChange={setProjectId}>
                    <SelectTrigger id="selection-grouped-project" className="tw-h-8 tw-w-60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_PROJECTS.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </header>

              <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-border-b tw-px-6 tw-py-2">
                {/*
                  Workflow buttons sit at the very left as a connected segmented
                  group: each button is flush to the next, the inner edges are
                  squared, and only the outer left/right corners are rounded —
                  the visual reads as a single control with three options. The
                  active workflow's button uses the primary (default) variant;
                  the others render as outline. "Copy from" opens a project
                  picker dropdown via the chevron; "Import…" opens a native
                  multi-select file dialog and matches files to book ids by name.
                */}
                <div className="tw-flex tw-items-center">
                  <Button
                    variant={workflow === 'manage' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWorkflow('manage')}
                    className="tw-rounded-r-none focus-visible:tw-z-10"
                  >
                    <BookOpenCheck className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Manage
                  </Button>
                  <Button
                    variant={workflow === 'progress' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWorkflow('progress')}
                    className="tw--ml-px tw-rounded-none focus-visible:tw-z-10"
                  >
                    <BarChart3 className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Progress
                  </Button>
                  {/*
                    "Copy from" toggles between two button shapes based on
                    whether a source project has already been picked:
                    - No source yet: a single button. Clicking it opens the
                      project dropdown — there's nothing to enter copy mode
                      with otherwise, so the picker has to come up first.
                    - Source set: a split button. The main half enters copy
                      mode using the persisted source (no dropdown opens),
                      and the chevron half is a dedicated trigger for the
                      project picker so the user can switch source. Both
                      halves share the active styling so the split still
                      reads as a single connected control.
                  */}
                  {/*
                    "Copy from" — chevron-and-dropdown shape only when there's
                    nothing to commit-with-one-click: either no source has been
                    picked yet, or copy mode is already active (so clicking is
                    interpreted as "I want to switch source"). In the
                    in-between state — source picked, copy mode not active —
                    drop the chevron and let a single click switch to copy
                    mode using the persisted source. Same Button instance
                    either way; only the click handler and the trailing
                    chevron differ.
                  */}
                  {(() => {
                    const opensDropdown = !sourceProject || workflow === 'copy';
                    const button = (
                      <Button
                        variant={workflow === 'copy' ? 'default' : 'outline'}
                        size="sm"
                        className="tw--ml-px tw-rounded-none focus-visible:tw-z-10"
                        onClick={opensDropdown ? undefined : () => setWorkflow('copy')}
                      >
                        <Copy className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                        {sourceProject ? `Copy from ${sourceProject.shortName}` : 'Copy from'}
                        {opensDropdown && (
                          <ChevronDown className="tw-ml-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                        )}
                      </Button>
                    );
                    if (!opensDropdown) return button;
                    return (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuContent align="start">
                            {otherProjects.map((p) => (
                              <DropdownMenuItem key={p.id} onClick={() => pickCopySource(p.id)}>
                                {p.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>
                    );
                  })()}
                  {/*
                    "Import" mirrors the Copy from logic. The button reads
                    "Import…" (and clicks open the OS file picker) whenever
                    nothing is imported yet OR import mode is already active.
                    In the in-between state — files imported but mode not
                    active — drop the ellipsis and switch to import mode on
                    click using the persisted file batch.
                  */}
                  {(() => {
                    const opensPicker =
                      Object.keys(importFiles).length === 0 || workflow === 'import';
                    return (
                      <Button
                        variant={workflow === 'import' ? 'default' : 'outline'}
                        size="sm"
                        onClick={
                          opensPicker ? () => openImportFileDialog() : () => setWorkflow('import')
                        }
                        className="tw--ml-px tw-rounded-l-none focus-visible:tw-z-10"
                      >
                        <FolderInput className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                        {opensPicker ? 'Import…' : 'Import'}
                      </Button>
                    );
                  })()}
                </div>
                {/* "Clear list" only shows in import mode and dumps the
                  whole imported file batch (the rows themselves). It's a
                  separate button from the footer's selection Clear so the
                  user can wipe the list without first emptying the
                  selection. Re-adding files is done via Import… (its
                  trailing ellipsis surfaces that). */}
                {workflow === 'import' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={Object.keys(importFiles).length === 0}
                    onClick={() => {
                      setImportFiles({});
                      setSelected(new Set());
                    }}
                  >
                    Clear list
                  </Button>
                )}
              </div>

              <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-border-b tw-px-6 tw-py-2">
                {/* Clear-only checkbox at the head of the filter row.
                  Behavior is asymmetric on purpose: it can deselect
                  everything but never selects — toggling it from any
                  state always clears the selection. Disabled when
                  nothing is selected (so it can't fire a no-op). The
                  indeterminate visual signals the partial-selection
                  state without implying that clicking would select all.
                  Tooltip names the action since the checkbox itself
                  carries no label. */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* tw-ps-1 lines the checkbox up with the row
                      checkboxes / pill checkboxes in the body — 24px
                      (toolbar px-6) + 4px (ps-1) = 28px from the dialog
                      edge, matching the list rows' 20px content inset +
                      li's px-2, and the grid pills' 20px inset + pill's
                      px-2 border. The Checkbox keeps its disabled state
                      for accessibility but overrides the default
                      "forbidden" cursor with a plain default cursor so
                      hovering it doesn't read as "you can't do anything
                      here" — the user *can* clear, just not from this
                      state. */}
                    <span className="tw-inline-flex tw-shrink-0 tw-items-center tw-ps-1">
                      <Checkbox
                        checked={selected.size > 0 ? 'indeterminate' : false}
                        disabled={selected.size === 0}
                        onCheckedChange={() => setSelected(new Set())}
                        aria-label="Clear selection"
                        className="disabled:!tw-cursor-default"
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Clear selection</TooltipContent>
                </Tooltip>
                <div className="tw-min-w-0 tw-flex-1 [&_input]:tw-h-7">
                  <SearchBar
                    value={filter}
                    onSearch={setFilter}
                    placeholder="Filter books…"
                    isFullWidth
                  />
                </div>
                <BookGridGroupByToggle value={groupBy} onChange={setGroupBy} />
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(v) => v && setViewMode(v as typeof viewMode)}
                  className="tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  aria-label="View mode"
                >
                  <ToggleGroupItem
                    value="list"
                    className="tw-h-6 tw-w-7 tw-px-1 data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                    aria-label="List view"
                  >
                    <List className="tw-h-3.5 tw-w-3.5" aria-hidden />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="grid"
                    className="tw-h-6 tw-w-7 tw-px-1 data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="tw-h-3.5 tw-w-3.5" aria-hidden />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {viewMode === 'list' ? (
                // Outer scroll container keeps its px-2 so the vertical
                // scrollbar stays at the edge of the dialog body where the
                // user expects it. The inner wrapper adds px-3 — net
                // 8 + 12 = 20px content inset. Tighter padding inside the
                // row (li's px-2 below) is what brings the row checkbox
                // into alignment with the grid pills' inner content.
                <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-2 tw-py-2">
                  <div className="tw-px-3">
                    {visibleBooks.length === 0 ? (
                      <div className="tw-flex tw-min-h-40 tw-items-center tw-justify-center tw-text-sm tw-text-muted-foreground">
                        {workflow === 'import' && Object.keys(importFiles).length === 0
                          ? 'No files imported yet — click Import… to pick files.'
                          : 'No books match the current filter.'}
                      </div>
                    ) : (
                      listGroups.map((group) => {
                        const collapsed = group.label ? collapsedGroups.has(group.label) : false;
                        const groupSelectedCount = group.books.filter((b) =>
                          selected.has(b),
                        ).length;
                        const allSelected =
                          group.books.length > 0 && groupSelectedCount === group.books.length;
                        const headerCheckState: boolean | 'indeterminate' =
                          groupSelectedCount === 0 ? false : allSelected ? true : 'indeterminate';
                        const Chevron = collapsed ? ChevronRight : ChevronDown;
                        return (
                          <section key={group.label ?? 'all'} className="tw-flex tw-flex-col">
                            {group.label && (
                              <div className="tw-sticky tw-top-0 tw-z-10 tw-flex tw-items-center tw-gap-2 tw-bg-background tw-pt-1">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => group.label && toggleCollapsed(group.label)}
                                  aria-expanded={!collapsed}
                                  // px-2 lines the collapse chevron up
                                  // with the row checkbox below (rows use
                                  // li's px-2). 24px (toolbar/inner inset)
                                  // + 4px from header's outer = chevron at
                                  // 28px, matching the row checkbox.
                                  className="tw-h-6 tw-flex-1 tw-justify-start tw-gap-1 tw-px-2 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground hover:tw-text-foreground"
                                >
                                  <Chevron className="tw-h-3.5 tw-w-3.5" aria-hidden />
                                  <span>{group.label}</span>
                                  <span className="tw-ml-1 tw-font-normal tw-normal-case tw-tracking-normal tw-text-muted-foreground/70">
                                    {formatGroupCountText(
                                      group.books.length,
                                      totalsByLabel[group.label] ?? group.books.length,
                                      isFiltered,
                                    )}
                                  </span>
                                </Button>
                                {(() => {
                                  // Hide rules: in Manage and Progress, Canon
                                  // (and the no-grouping case) mix present and
                                  // absent books, so a bulk select-all would
                                  // create a mixed selection — drop the
                                  // checkbox entirely rather than disable it.
                                  const hideHeaderSelectAll =
                                    (workflow === 'manage' || workflow === 'progress') &&
                                    groupBy === 'canon';
                                  if (hideHeaderSelectAll) return undefined;
                                  // Disable rules: in Manage / Progress with
                                  // Status grouping, lock down the "other"
                                  // group's select-all whenever the user has
                                  // picked rows of the matching type — Status
                                  // groups are type-pure but the user could
                                  // still tick across them via the bulk
                                  // checkbox.
                                  let headerDisabled = group.books.length === 0;
                                  if (!headerDisabled && groupBy === 'status') {
                                    if (workflow === 'manage' && group.label === 'In project') {
                                      headerDisabled = selectedAbsent.length > 0;
                                    } else if (
                                      workflow === 'manage' &&
                                      group.label === 'Not in project'
                                    ) {
                                      headerDisabled = selectedPresent.length > 0;
                                    } else if (workflow === 'progress') {
                                      const selTracked = selectedArr.some((b) => tracked.has(b));
                                      const selUntracked = selectedArr.some((b) => !tracked.has(b));
                                      if (group.label === 'Tracked') {
                                        headerDisabled = selUntracked && !selTracked;
                                      } else if (group.label === 'Untracked') {
                                        headerDisabled = selTracked && !selUntracked;
                                      }
                                    }
                                  }
                                  return (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="tw-flex tw-shrink-0 tw-items-center tw-pe-2">
                                          <Checkbox
                                            checked={headerCheckState}
                                            onCheckedChange={() =>
                                              toggleGroupSelectAll(group.books)
                                            }
                                            disabled={headerDisabled}
                                            aria-label={`Select all ${group.label} books`}
                                          />
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>{`Select all ${group.label} books`}</TooltipContent>
                                    </Tooltip>
                                  );
                                })()}
                              </div>
                            )}
                            {!collapsed && (
                              <ul className="tw-flex tw-flex-col tw-gap-0.5">
                                {group.books.map((book) => {
                                  const isPresent = current.present.has(book);
                                  const destDate = current.dates[book];
                                  const isSelected = selected.has(book);
                                  const cmp = compareForBook(book);
                                  // Row "actionable" rules vary by workflow:
                                  // - Manage: mutual-exclusion on present vs.
                                  //   absent so the footer's Create XOR Delete
                                  //   pair never gets a mixed selection.
                                  // - Progress: mutual-exclusion on tracked vs.
                                  //   untracked so the footer's Start XOR Stop
                                  //   tracking pair never gets a mixed
                                  //   selection.
                                  // - Copy: only books the source has.
                                  // - Import: only books with a picked file
                                  //   (always true here since the row list is
                                  //   already filtered to imported books).
                                  const isTracked = tracked.has(book);
                                  const selTracked = selectedArr.some((b) => tracked.has(b));
                                  const selUntracked = selectedArr.some((b) => !tracked.has(b));
                                  const rowActionable = (() => {
                                    if (workflow === 'copy') return cmp.state !== 'Missing';
                                    if (workflow === 'import') return !!importFiles[book];
                                    if (workflow === 'progress') {
                                      if (isSelected) return true;
                                      if (!selTracked && !selUntracked) return true;
                                      return isTracked ? selTracked : selUntracked;
                                    }
                                    // workflow === 'manage'
                                    if (isSelected) return true;
                                    if (
                                      selectedPresent.length === 0 &&
                                      selectedAbsent.length === 0
                                    ) {
                                      return true;
                                    }
                                    return isPresent
                                      ? selectedPresent.length > 0
                                      : selectedAbsent.length > 0;
                                  })();
                                  return (
                                    <li
                                      key={book}
                                      // The whole row is the click target — clicking
                                      // anywhere on it toggles the checkbox. The
                                      // checkbox itself stops propagation so its own
                                      // onCheckedChange isn't double-fired by the row
                                      // handler.
                                      onClick={() => {
                                        if (rowActionable) toggleOne(book);
                                      }}
                                      className={cn(
                                        // px-2 here (instead of px-3) lines
                                        // the row checkbox up exactly with
                                        // the grid pill's inner checkbox —
                                        // pills use tw-px-2 inside their
                                        // border so this matches without
                                        // pushing the outer list inset
                                        // around.
                                        'tw-group tw-flex tw-select-none tw-items-center tw-gap-3 tw-rounded-md tw-px-2 tw-py-1.5 tw-text-sm hover:tw-bg-accent/60',
                                        isSelected && 'tw-bg-accent',
                                        !rowActionable && 'tw-opacity-60',
                                        rowActionable
                                          ? 'tw-cursor-pointer'
                                          : 'tw-cursor-not-allowed',
                                      )}
                                    >
                                      <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => toggleOne(book)}
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={!rowActionable}
                                        aria-label={`Select ${book}`}
                                      />
                                      <span
                                        aria-hidden
                                        className={cn(
                                          'tw-inline-block tw-h-2 tw-w-2 tw-rounded-full',
                                          isPresent ? 'tw-bg-primary' : 'tw-bg-muted-foreground/30',
                                        )}
                                      />
                                      <div className="tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2">
                                        <span className="tw-font-medium">{book}</span>
                                        <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                                          {Canon.bookIdToEnglishName(book)}
                                        </span>
                                      </div>
                                      {workflow === 'manage' && (
                                        <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
                                          {isPresent ? (
                                            <Badge variant="secondary" className="tw-font-normal">
                                              {destDate ?? 'Present'}
                                            </Badge>
                                          ) : (
                                            <Badge
                                              variant="outline"
                                              className="tw-font-normal tw-text-muted-foreground"
                                            >
                                              Missing
                                            </Badge>
                                          )}
                                        </div>
                                      )}
                                      {workflow === 'copy' && (
                                        <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-3 tw-text-xs">
                                          <span className="tw-w-24 tw-text-end tw-text-muted-foreground">
                                            {cmp.primaryDate ?? '—'}
                                          </span>
                                          <span aria-hidden className="tw-text-muted-foreground/50">
                                            →
                                          </span>
                                          <span className="tw-w-24 tw-text-muted-foreground">
                                            {cmp.secondaryDate ?? '—'}
                                          </span>
                                          {cmp.state ? (
                                            <Badge
                                              variant={comparisonVariant(cmp.state)}
                                              className="tw-font-normal"
                                            >
                                              {cmp.state}
                                            </Badge>
                                          ) : (
                                            <span className="tw-w-14" />
                                          )}
                                        </div>
                                      )}
                                      {workflow === 'import' && (
                                        <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-3 tw-text-xs">
                                          {importFiles[book] ? (
                                            <span
                                              className="tw-inline-flex tw-max-w-[16rem] tw-items-center tw-gap-1 tw-truncate tw-rounded tw-border tw-px-1.5 tw-py-0.5 tw-text-muted-foreground"
                                              title={`${importFiles[book].name} (${importFiles[book].date})`}
                                            >
                                              <FolderInput
                                                className="tw-h-3 tw-w-3 tw-shrink-0"
                                                aria-hidden
                                              />
                                              <span className="tw-truncate">
                                                {importFiles[book].name}
                                              </span>
                                            </span>
                                          ) : (
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              className="tw-h-6 tw-px-2 tw-text-xs"
                                              onClick={() => openImportFileDialog(book)}
                                            >
                                              <FolderInput
                                                className="tw-mr-1 tw-h-3 tw-w-3"
                                                aria-hidden
                                              />
                                              Pick file…
                                            </Button>
                                          )}
                                          <span className="tw-w-24 tw-text-muted-foreground">
                                            {cmp.secondaryDate ?? '—'}
                                          </span>
                                          {cmp.state ? (
                                            <Badge
                                              variant={comparisonVariant(cmp.state)}
                                              className="tw-font-normal"
                                            >
                                              {cmp.state}
                                            </Badge>
                                          ) : (
                                            <span className="tw-w-14" />
                                          )}
                                        </div>
                                      )}
                                      {workflow === 'progress' &&
                                        (() => {
                                          // Tracked rows surface a percentage
                                          // bar + priority badge — the same
                                          // visual signals the view-list-select
                                          // progress section uses. Untracked
                                          // rows render a quiet "Untracked"
                                          // hint so the user knows why the
                                          // progress data is empty.
                                          if (!isTracked) {
                                            return (
                                              <span className="tw-shrink-0 tw-text-xs tw-text-muted-foreground">
                                                Untracked
                                              </span>
                                            );
                                          }
                                          const progress = deterministicNumberFromBook(book, 7);
                                          const priN = deterministicNumberFromBook(book, 13);
                                          const priLabel =
                                            priN >= 67
                                              ? { label: 'High', tone: 'newer' as BookGridTone }
                                              : priN >= 34
                                                ? { label: 'Medium', tone: 'same' as BookGridTone }
                                                : { label: 'Low', tone: 'neutral' as BookGridTone };
                                          return (
                                            <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-3 tw-text-xs">
                                              <div className="tw-flex tw-w-24 tw-items-center tw-gap-2">
                                                <div
                                                  className="tw-hidden tw-h-1.5 tw-flex-1 tw-overflow-hidden tw-rounded tw-bg-muted [@media(min-width:640px)]:tw-block"
                                                  aria-hidden
                                                >
                                                  <div
                                                    className="tw-h-full tw-bg-primary"
                                                    style={{ width: `${progress}%` }}
                                                  />
                                                </div>
                                                <span className="tw-w-10 tw-shrink-0 tw-text-end tw-tabular-nums">
                                                  {progress}%
                                                </span>
                                              </div>
                                              <Badge
                                                variant={STATUS_BADGE_VARIANT[priLabel.tone]}
                                                // Fixed-width pill so High /
                                                // Medium / Low align in a
                                                // single column. tw-w-16 fits
                                                // the longest label ("Medium")
                                                // with a small breathing
                                                // margin.
                                                className="tw-w-16 tw-justify-center tw-font-normal"
                                              >
                                                {priLabel.label}
                                              </Badge>
                                            </div>
                                          );
                                        })()}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </section>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : (
                // No horizontal padding on the outer grid wrapper —
                // BookGridSelector owns the scroll, and we want its
                // scrollbar to land flush with the dialog body's right
                // edge (matching the list view's outer scroll). The
                // pills' 20px content inset is supplied via
                // contentClassName below.
                <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-py-2">
                  {visibleBooks.length === 0 ? (
                    <div className="tw-flex tw-min-h-40 tw-items-center tw-justify-center tw-text-sm tw-text-muted-foreground">
                      {workflow === 'import' && Object.keys(importFiles).length === 0
                        ? 'No files imported yet — click Import… to pick files.'
                        : 'No books match the current filter.'}
                    </div>
                  ) : (
                    <BookGridSelector
                      items={items}
                      selected={selected}
                      onToggle={toggleOne}
                      groupBy={groupBy}
                      // Tooltip lines: Progress puts percentage / priority
                      // through the date slots. Copy puts "From <src>" /
                      // "In <dest>" so the row tooltip surfaces both
                      // modification dates side-by-side. Other workflows
                      // fall back to "Last modified".
                      primaryDateLabel={
                        workflow === 'progress'
                          ? 'Progress'
                          : workflow === 'copy' && sourceProject
                            ? `From ${sourceProject.shortName}`
                            : 'Last modified'
                      }
                      secondaryDateLabel={
                        workflow === 'progress'
                          ? 'Priority'
                          : workflow === 'copy'
                            ? `In ${project.shortName}`
                            : undefined
                      }
                      renderGroupCount={renderGroupCount}
                      // Hide group select-all in Manage / Progress + Canon
                      // (or no grouping): those groups mix the workflow's
                      // two action types, so a bulk select-all could only
                      // build a mixed selection.
                      hideGroupSelectAll={() =>
                        (workflow === 'manage' || workflow === 'progress') && groupBy === 'canon'
                      }
                      // Disable group select-all in Manage / Progress +
                      // Status when the *opposite* type is already
                      // selected — locks the bulk checkbox so it can't add
                      // rows that conflict with the existing selection.
                      disableGroupSelectAll={(label) => {
                        if (groupBy !== 'status') return false;
                        if (workflow === 'manage') {
                          if (label === 'In project') return selectedAbsent.length > 0;
                          if (label === 'Not in project') return selectedPresent.length > 0;
                        }
                        if (workflow === 'progress') {
                          const selTracked = selectedArr.some((b) => tracked.has(b));
                          const selUntracked = selectedArr.some((b) => !tracked.has(b));
                          if (label === 'Tracked') return selUntracked && !selTracked;
                          if (label === 'Untracked') return selTracked && !selUntracked;
                        }
                        return false;
                      }}
                      // Asymmetric padding: 20px start matches the list
                      // view's left content inset, 28px end matches the
                      // list view's effective right inset (the list's
                      // 20px content-area inset plus the 8px tw-pe-2 on
                      // its group-header checkbox wrapper). With this,
                      // the grid's group select-all checkboxes land in
                      // the same vertical column as the list's. The
                      // scrollbar still sits flush against the dialog's
                      // right edge because the outer wrapper itself has
                      // no horizontal padding.
                      contentClassName="tw-ps-5 tw-pe-7"
                      onRangeToggle={(books, select) =>
                        setSelected((prev) => {
                          const next = new Set(prev);
                          books.forEach((b) => (select ? next.add(b) : next.delete(b)));
                          return next;
                        })
                      }
                    />
                  )}
                </div>
              )}

              <footer className="tw-flex tw-items-center tw-gap-2 tw-border-t tw-px-6 tw-py-3">
                {/*
                  The footer commit buttons alternate by workflow: Show exposes
                  Create + Delete (mutually exclusive thanks to the show-mode
                  selection rule, so only one is enabled at a time), Copy a
                  single Copy button, Import a single Import button. The active
                  button always carries the selection count.
                */}
                {workflow === 'manage' && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" disabled={selectedAbsent.length === 0}>
                          <BookPlus className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                          {`Create ${selectedAbsent.length} in ${project.shortName}`}
                          <ChevronDown className="tw-ml-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => createBooks(selectedAbsent, 'empty')}>
                            Create empty
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => createBooks(selectedAbsent, 'chapterVerse')}
                          >
                            Create with all chapter and verse numbers
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Create based on</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {otherProjects.map((p) => (
                                  <DropdownMenuItem
                                    key={p.id}
                                    onClick={() => createBooks(selectedAbsent, 'referenceText')}
                                  >
                                    {p.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>

                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={selectedPresent.length === 0}
                      onClick={() => deleteBooks(selectedPresent)}
                    >
                      <Trash2 className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                      {`Delete ${selectedPresent.length} from ${project.shortName}`}
                    </Button>
                  </>
                )}

                {workflow === 'copy' &&
                  (() => {
                    const copyableSelected = selectedArr.filter((b) => sourceData?.present.has(b));
                    return (
                      <Button
                        size="sm"
                        disabled={copyableSelected.length === 0}
                        onClick={commitCopy}
                      >
                        <Copy className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                        {`Copy ${copyableSelected.length} into ${project.shortName}`}
                      </Button>
                    );
                  })()}

                {workflow === 'import' &&
                  (() => {
                    const importableSelected = selectedArr.filter((b) => importFiles[b]);
                    return (
                      <Button
                        size="sm"
                        disabled={importableSelected.length === 0}
                        onClick={commitImport}
                      >
                        <Download className="tw-mr-1.5 tw-h-3.5 tw-w-3.5" aria-hidden />
                        {`Import ${importableSelected.length} into ${project.shortName}`}
                      </Button>
                    );
                  })()}

                {workflow === 'progress' &&
                  (() => {
                    // Tracking demo only — start/stop buttons mirror the
                    // view-list-select progress section's footer pattern.
                    // The variant doesn't actually mutate
                    // PROJECT_TRACKED_BOOKS; the buttons exist so the user
                    // can see the same shape of action.
                    const projectTracked = PROJECT_TRACKED_BOOKS[projectId] ?? new Set<string>();
                    const trackedSelected = selectedArr.filter((b) => projectTracked.has(b)).length;
                    const untrackedSelected = selectedArr.filter(
                      (b) => current.present.has(b) && !projectTracked.has(b),
                    ).length;
                    return (
                      <>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={trackedSelected === 0}
                          onClick={() => setSelected(new Set())}
                        >
                          {`Stop tracking ${trackedSelected}`}
                        </Button>
                        <Button
                          size="sm"
                          disabled={untrackedSelected === 0}
                          onClick={() => setSelected(new Set())}
                        >
                          {`Start tracking ${untrackedSelected}`}
                        </Button>
                      </>
                    );
                  })()}

                <Button variant="outline" onClick={() => setOpen(false)} className="tw-ml-auto">
                  Close
                </Button>
              </footer>
            </div>
          </TooltipProvider>
        </DialogContent>
      </Dialog>
      {/* Toaster mount — lives outside the dialog so its z-index isn't trapped
        in the dialog's stacking context. position="top-center" matches the
        sibling variants and keeps import-failure toasts visible. */}
      <Sonner position="top-center" style={{ zIndex: 9999 }} />
    </>
  );
}

// --------------------------------------------------------------------------
// ACTION-FIRST: inverse of SELECTION-FIRST. The user picks an action first,
// then the list narrows to only the books valid for that action. Context-
// specific prerequisites (source project for Copy, method for Create) appear
// inline alongside the action picker. Reuses CopySubDialog and ImportSubDialog.
// --------------------------------------------------------------------------

function ActionFirstManageBooksDialog() {
  const [open, setOpen] = useState(true);
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const [projectsData, setProjectsData] = useState<Record<string, ProjectBookState>>(() =>
    createInitialProjectBooks(),
  );

  const projectsDataRef = useRef(projectsData);
  useEffect(() => {
    projectsDataRef.current = projectsData;
  }, [projectsData]);

  const loadProjects = useCallback(
    (): ManageBooksDialogProject[] =>
      MOCK_PROJECTS.map((p) => ({ id: p.id, shortName: p.shortName, name: p.name })),
    [],
  );
  const loadBooks = useCallback((pid: string): ManageBooksDialogBookInfo[] => {
    const data = projectsDataRef.current[pid] ?? {
      present: new Set<string>(),
      dates: {},
    };
    return Array.from(data.present).map((id) => ({
      id,
      lastModified: data.dates[id],
    }));
  }, []);
  const loadVersification = useCallback((_pid: string) => 'eng', []);

  const applyTo = (pid: string, mutate: (p: ProjectBookState) => ProjectBookState) =>
    setProjectsData((prev) => ({
      ...prev,
      [pid]: mutate(prev[pid] ?? { present: new Set<string>(), dates: {} }),
    }));

  const onCreateBooks = useCallback(
    ({
      projectId: pid,
      books,
    }: {
      projectId: string;
      books: string[];
      method: SharedCreateMethod;
      referenceProjectId?: string;
    }) => {
      applyTo(pid, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        books.forEach((b) => {
          nextPresent.add(b);
          nextDates[b] = todayISO();
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );
  const onDeleteBooks = useCallback(
    ({ projectId: pid, books }: { projectId: string; books: string[] }) => {
      applyTo(pid, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        books.forEach((b) => {
          nextPresent.delete(b);
          delete nextDates[b];
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );
  const onCopyBooks = useCallback(
    ({
      destProjectId,
      sourceProjectId,
      books,
    }: {
      destProjectId: string;
      sourceProjectId: string;
      books: string[];
    }) => {
      const src = projectsDataRef.current[sourceProjectId];
      if (!src) return;
      applyTo(destProjectId, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        books.forEach((b) => {
          if (src.present.has(b)) {
            nextPresent.add(b);
            nextDates[b] = src.dates[b] ?? todayISO();
          }
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );
  const onImportBooks = useCallback(
    ({
      projectId: pid,
      files,
    }: {
      projectId: string;
      files: Record<string, SharedImportFile>;
      strategy: SharedImportStrategy;
    }) => {
      applyTo(pid, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        Object.entries(files).forEach(([book, { date }]) => {
          nextPresent.add(book);
          nextDates[book] = date;
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );

  const noop = useCallback((_pid: string) => {}, []);

  return (
    <>
      <style>{`
        [data-radix-popper-content-wrapper],
        [data-radix-select-content],
        [data-radix-popover-content],
        [data-radix-menu-content] {
          z-index: 600 !important;
          pointer-events: auto !important;
        }
      `}</style>
      <Button onClick={() => setOpen(true)}>Open Action-First Manage Books</Button>
      <SharedManageBooksDialog
        open={open}
        onOpenChange={setOpen}
        projectId={projectId}
        onProjectIdChange={setProjectId}
        loadProjects={loadProjects}
        loadBooks={loadBooks}
        loadVersification={loadVersification}
        onOpenScriptureReferenceSettings={noop}
        onOpenProjectCanons={noop}
        onOpenRegistry={noop}
        onCreateBooks={onCreateBooks}
        onDeleteBooks={onDeleteBooks}
        onCopyBooks={onCopyBooks}
        onImportBooks={onImportBooks}
      />
    </>
  );
}

// --------------------------------------------------------------------------
// FUTURE OUTLOOK: action-first dialog augmented with the project scope so the
// View screen reflects the scope (grouped list, missing/unplanned badges,
// remove-from-scope icon, and an add-to-scope button).
// --------------------------------------------------------------------------

const INITIAL_SCOPE_ID = 'newTestament' as const;
const INITIAL_SCOPE_NAME = 'New Testament';
const INITIAL_SCOPE_BOOKS = [...NT_BOOKS];

function FutureOutlookManageBooksDialog() {
  const [open, setOpen] = useState(true);
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const [projectsData, setProjectsData] = useState<Record<string, ProjectBookState>>(() =>
    createInitialProjectBooks(),
  );
  const [scopeBooks, setScopeBooks] = useState<string[]>(INITIAL_SCOPE_BOOKS);

  const projectsDataRef = useRef(projectsData);
  useEffect(() => {
    projectsDataRef.current = projectsData;
  }, [projectsData]);

  const loadProjects = useCallback(
    (): ManageBooksDialogProject[] =>
      MOCK_PROJECTS.map((p) => ({
        id: p.id,
        shortName: p.shortName,
        name: p.name,
      })),
    [],
  );
  const loadBooks = useCallback((pid: string): ManageBooksDialogBookInfo[] => {
    const data = projectsDataRef.current[pid] ?? {
      present: new Set<string>(),
      dates: {},
    };
    return Array.from(data.present).map((id) => ({
      id,
      lastModified: data.dates[id],
    }));
  }, []);
  const loadVersification = useCallback((_pid: string) => 'eng', []);

  const applyTo = (pid: string, mutate: (p: ProjectBookState) => ProjectBookState) => {
    // Update the ref eagerly so subsequent synchronous loadBooks calls (e.g.
    // refreshBooks fired right after the mutation) see the new state before
    // React has committed the setProjectsData update.
    const prev = projectsDataRef.current;
    const next = {
      ...prev,
      [pid]: mutate(prev[pid] ?? { present: new Set<string>(), dates: {} }),
    };
    projectsDataRef.current = next;
    setProjectsData(next);
  };

  const onCreateBooks = useCallback(
    ({ projectId: pid, books }: { projectId: string; books: string[] }) => {
      applyTo(pid, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        books.forEach((b) => {
          nextPresent.add(b);
          nextDates[b] = todayISO();
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );
  const onDeleteBooks = useCallback(
    ({ projectId: pid, books }: { projectId: string; books: string[] }) => {
      applyTo(pid, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        books.forEach((b) => {
          nextPresent.delete(b);
          delete nextDates[b];
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );
  const onCopyBooks = useCallback(
    ({
      destProjectId,
      sourceProjectId,
      books,
    }: {
      destProjectId: string;
      sourceProjectId: string;
      books: string[];
    }) => {
      const src = projectsDataRef.current[sourceProjectId];
      if (!src) return;
      applyTo(destProjectId, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        books.forEach((b) => {
          if (src.present.has(b)) {
            nextPresent.add(b);
            nextDates[b] = src.dates[b] ?? todayISO();
          }
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );
  const onImportBooks = useCallback(
    ({ projectId: pid, files }: { projectId: string; files: Record<string, SharedImportFile> }) => {
      applyTo(pid, (p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        Object.entries(files).forEach(([book, { date }]) => {
          nextPresent.add(book);
          nextDates[book] = date;
        });
        return { present: nextPresent, dates: nextDates };
      });
    },
    [],
  );

  const onAddBooksToScope = useCallback(({ books }: { projectId: string; books: string[] }) => {
    setScopeBooks((prev) => {
      const next = new Set(prev);
      books.forEach((b) => next.add(b));
      return Array.from(next);
    });
  }, []);
  const onRemoveBookFromScope = useCallback(({ book }: { projectId: string; book: string }) => {
    setScopeBooks((prev) => prev.filter((b) => b !== book));
  }, []);

  const noop = useCallback((_pid: string) => {}, []);

  return (
    <>
      <style>{`
        [data-radix-popper-content-wrapper],
        [data-radix-select-content],
        [data-radix-popover-content],
        [data-radix-menu-content] {
          z-index: 600 !important;
          pointer-events: auto !important;
        }
      `}</style>
      <Button onClick={() => setOpen(true)}>Open Future Outlook Manage Books</Button>
      <ManageBooksDialogWithScope
        open={open}
        onOpenChange={setOpen}
        projectId={projectId}
        onProjectIdChange={setProjectId}
        loadProjects={loadProjects}
        loadBooks={loadBooks}
        loadVersification={loadVersification}
        onOpenScriptureReferenceSettings={noop}
        onOpenRegistry={noop}
        onCreateBooks={onCreateBooks}
        onDeleteBooks={onDeleteBooks}
        onCopyBooks={onCopyBooks}
        onImportBooks={onImportBooks}
        scope={{
          id: INITIAL_SCOPE_ID,
          name: INITIAL_SCOPE_NAME,
          bookIds: scopeBooks,
        }}
        onAddBooksToScope={onAddBooksToScope}
        onRemoveBookFromScope={onRemoveBookFromScope}
      />
    </>
  );
}

// --------------------------------------------------------------------------
// VIEW-LIST-SELECT: same dialog as Default, but Create/Delete swap the
// BookSelector for a clickable grid of pills modeled on the Show view.
// --------------------------------------------------------------------------

type BookGridTone = 'neutral' | 'older' | 'newer' | 'new' | 'same';

// Pill styling matches the Show (view) list: present books get the primary tint, absent books
// render muted. Status (for Copy/Import) is surfaced via an inline Badge and doesn't affect
// the pill's own color — so the present/absent distinction stays consistent everywhere.
const BOOK_PILL_BASE_CLASS =
  'tw-flex tw-w-full tw-items-center tw-gap-2 tw-rounded tw-border tw-px-2 tw-py-1 tw-text-start';

const bookPillClasses = (present: boolean) =>
  cn(
    BOOK_PILL_BASE_CLASS,
    'tw-transition-colors hover:tw-bg-accent hover:tw-text-accent-foreground',
    present
      ? 'tw-border-primary/40 tw-bg-primary/5'
      : // Not-in-project books read as "placeholder" rows: a dashed outline in the
        // primary color signals that they could be added to the project, while the
        // muted text keeps them visually quieter than present rows.
        'tw-border-dashed tw-border-primary/40 tw-text-muted-foreground',
  );

const STATUS_BADGE_VARIANT: Record<
  BookGridTone,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  neutral: 'outline',
  older: 'destructive',
  newer: 'default',
  new: 'outline',
  same: 'secondary',
};

// Determines the order of groups when `groupBy === 'status'`. Lower numbers appear first.
// "In project" variants always lead; "Not in project" always trails. Comparison states
// (Newer / Older / New / Same) land in between in a natural review-first order. Labels
// without an explicit priority default to 50 and keep their first-encounter order.
const STATUS_GROUP_PRIORITY: Record<string, number> = {
  'In project, tracked': 0,
  'In project, untracked': 1,
  'In project': 2,
  Tracked: 3,
  Untracked: 4,
  // Scope-based groups used by Create. "In scope" leads, "Out of scope" trails.
  'In scope': 5,
  // Copy / Import groupings — sorted as: New - in scope, New - out of scope, Newer,
  // Same, Older. The new-scope split sits at the top so the "safest" additions are
  // visually first and "out of scope" sits right below where the user can find it.
  'New - in scope': 10,
  'New - out of scope': 11,
  Newer: 20,
  Same: 21,
  Older: 22,
  // Plain "New" (used when no scope is registered) keeps its spot ahead of the
  // comparison states.
  New: 12,
  'Out of scope': 80,
  'Not in project': 100,
};

// Status group labels that should start collapsed when first encountered. Lets
// destructive / risky groups stay out of the way until the user opens them.
const DEFAULT_COLLAPSED_STATUS_GROUPS: ReadonlySet<string> = new Set(['New - out of scope']);
const statusGroupPriority = (label: string): number => STATUS_GROUP_PRIORITY[label] ?? 50;

function toneForComparisonState(state: ComparisonState | 'Failed'): BookGridTone | 'hidden' {
  switch (state) {
    case 'Older':
      return 'older';
    case 'Newer':
      return 'newer';
    case 'New':
      return 'new';
    case 'Same':
      return 'same';
    case 'Missing':
    case 'Failed':
      return 'hidden';
    default:
      return 'neutral';
  }
}

type BookGridItem = {
  book: string;
  /** Whether the book currently exists in the (destination) project. Drives pill color + dot. */
  present: boolean;
  tone: BookGridTone;
  /** Used as the section header when grouping by Status. */
  statusLabel: string;
  /** Shown in the hover tooltip on the primary row (typically the selected project's date). */
  primaryDate?: string;
  /** Shown in the hover tooltip on the second row (source project or import file date). */
  secondaryDate?: string;
  /** Optional trailing slot rendered after the badge — used by Show to expose per-pill actions. */
  trailing?: React.ReactNode;
  /**
   * Whether this book falls outside the project's registered scope. When true a small monochrome
   * warning icon is shown on the pill and the tooltip carries an "Out of scope" line.
   */
  unplanned?: boolean;
  /**
   * Whether this book is currently untracked. Drives the tooltip's "Untracked" line (prefixed with
   * the destructive X glyph). Independent from the trailing X icon — the caller is still
   * responsible for setting `trailing: <UntrackedIcon />` when they want the marker on the row
   * itself.
   */
  untracked?: boolean;
  /**
   * When true the pill is rendered as a non-toggleable, dimmed row. Used for mutually- exclusive
   * selections (e.g. once the user has selected a Tracked book in the Plan Books workflow, every
   * Untracked row becomes disabled until the selection is cleared).
   */
  disabled?: boolean;
  /**
   * Optional explanation surfaced in the pill tooltip when the row is disabled — e.g. "Not
   * available in selected project" when a Create Books template doesn't include this book. Shown as
   * the bottom line of the tooltip in muted-foreground.
   */
  disabledReason?: string;
};

type BookGridGroupBy = 'canon' | 'status' | 'none';

function BookGridGroupByToggle({
  value,
  onChange,
}: {
  value: BookGridGroupBy;
  onChange: (next: BookGridGroupBy) => void;
}) {
  const itemClass =
    'tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm';
  return (
    <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
      {/*
        At narrow widths the "Group by" label is hidden so the toggle stays on a single row
        next to the filter input. The three buttons themselves remain self-explanatory:
        "Canon" / "Status" / Ban-icon.
      */}
      <Label className="tw-hidden tw-shrink-0 tw-text-xs tw-text-muted-foreground [@media(min-width:640px)]:tw-block">
        Group by
      </Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => {
          if (v) onChange(v as BookGridGroupBy);
        }}
        className="tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
        aria-label="Group books by"
      >
        {/* Order is Status → Canon → none (icon) so the most informative
            grouping leads, with the "off" toggle trailing. */}
        <ToggleGroupItem value="status" className={itemClass}>
          Status
        </ToggleGroupItem>
        <ToggleGroupItem value="canon" className={itemClass}>
          Canon
        </ToggleGroupItem>
        <ToggleGroupItem value="none" className={itemClass} aria-label="Group by none">
          <Ban className="tw-h-3.5 tw-w-3.5" aria-hidden />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

function BookGridSelector({
  items,
  selected,
  onToggle,
  groupBy,
  primaryDateLabel,
  secondaryDateLabel,
  interactive = true,
  showUnplannedTooltip = true,
  hideGroupSelectAll,
  disableGroupSelectAll,
  onRangeToggle,
  renderGroupCount,
  contentClassName,
}: {
  items: BookGridItem[];
  selected: Set<string>;
  onToggle: (book: string) => void;
  groupBy: BookGridGroupBy;
  /**
   * Extra classes merged into the scroll container's className. Useful for callers that need to
   * inset the inner content (pills) without moving the scroll container's outer position — e.g.
   * aligning pills with surrounding toolbar buttons while leaving the vertical scrollbar where it
   * is. Tailwind-merge resolution lets a `tw-px-*` here override the default `tw-p-1`'s horizontal
   * padding while keeping the vertical padding intact.
   */
  contentClassName?: string;
  /** If provided, the status-badge tooltip shows `<primaryDateLabel>: <item.primaryDate ?? '—'>`. */
  primaryDateLabel?: string;
  /**
   * If provided, the status-badge tooltip shows `<secondaryDateLabel>: <item.secondaryDate ??
   * '—'>`.
   */
  secondaryDateLabel?: string;
  /**
   * When false, pills render as non-interactive `<div>`s with no focus/keyboard handling (used by
   * Show Books).
   */
  interactive?: boolean;
  /**
   * Whether to wrap the unplanned `?` badge in a tooltip. Show Books sets this to `false` since it
   * already has a tooltip on the whole pill.
   */
  showUnplannedTooltip?: boolean;
  /**
   * Predicate run on each group label; returning true hides the group's select-all checkbox
   * entirely. Used by the Plan Books workflow to suppress canon-wide bulk selection (canon groups
   * mix tracked + untracked books, which cannot be acted on together — there's no useful state for
   * the checkbox to land in).
   */
  hideGroupSelectAll?: (label: string | undefined) => boolean;
  /**
   * Predicate run on each group label; returning true keeps the group's select-all checkbox visible
   * but renders it disabled. Useful when the group select-all would otherwise build a state the
   * workflow forbids (e.g. mixed-type selection in the grouped Selection-first variant's Show +
   * Canon mode), but you still want to show the checkbox for visual consistency with siblings.
   */
  disableGroupSelectAll?: (label: string | undefined) => boolean;
  /**
   * Bulk-toggle handler for shift-click range selection. The grid hands the parent the row-major
   * range between the last clicked anchor and the shift-clicked target along with the desired final
   * state (true = select, false = deselect). When omitted, shift- click behaves like a plain
   * click.
   */
  onRangeToggle?: (books: string[], select: boolean) => void;
  /**
   * Optional renderer for the count text shown next to a group's title. Receives the group's label
   * and the items currently visible in that group. Workflows that need to show a "(total X)"
   * affordance compute it from data they already have. When omitted, the grid falls back to
   * "(visibleCount)".
   */
  renderGroupCount?: (label: string, filteredItems: BookGridItem[]) => React.ReactNode;
}) {
  const groups = useMemo<{ label?: string; items: BookGridItem[] }[]>(() => {
    if (groupBy === 'none') {
      return items.length === 0 ? [] : [{ items }];
    }
    if (groupBy === 'canon') {
      const otSet = new Set(OT_BOOKS);
      const ntSet = new Set(NT_BOOKS);
      const dcSet = new Set(DC_BOOKS);
      const ot: BookGridItem[] = [];
      const nt: BookGridItem[] = [];
      const dc: BookGridItem[] = [];
      const extra: BookGridItem[] = [];
      items.forEach((it) => {
        if (otSet.has(it.book)) ot.push(it);
        else if (ntSet.has(it.book)) nt.push(it);
        else if (dcSet.has(it.book)) dc.push(it);
        else extra.push(it);
      });
      return [
        { label: 'Old Testament', items: ot },
        { label: 'New Testament', items: nt },
        { label: 'Deuterocanon', items: dc },
        { label: 'Extra', items: extra },
      ].filter((g) => g.items.length > 0);
    }
    // status
    const order: string[] = [];
    const byLabel = new Map<string, BookGridItem[]>();
    items.forEach((it) => {
      const bucket = byLabel.get(it.statusLabel);
      if (bucket) {
        bucket.push(it);
      } else {
        byLabel.set(it.statusLabel, [it]);
        order.push(it.statusLabel);
      }
    });
    // Stable sort by the predefined priority so e.g. "In project" always leads and
    // "Not in project" always trails regardless of which book happens to appear first.
    const sortedOrder = order
      .map((label, idx) => ({ label, idx }))
      .sort((a, b) => {
        const pa = statusGroupPriority(a.label);
        const pb = statusGroupPriority(b.label);
        return pa === pb ? a.idx - b.idx : pa - pb;
      })
      .map((entry) => entry.label);
    return sortedOrder.map((label) => ({ label, items: byLabel.get(label) ?? [] }));
  }, [items, groupBy]);

  // Collapse state per group label. Groups default to expanded except the ones listed
  // in DEFAULT_COLLAPSED_STATUS_GROUPS (e.g. "New - out of scope"), which start collapsed
  // so the destructive options stay tucked away until the user opens them. The default
  // set is recomputed whenever the visible group labels change so a freshly-introduced
  // collapsible group still starts collapsed even if the user already has interaction
  // history with the grid.
  const [userCollapsedGroups, setUserCollapsedGroups] = useState<Set<string>>(() => new Set());
  // `seenGroups` lets us tell "user has interacted with this group" apart from "this
  // group just appeared and should respect its default collapsed state". Once a label
  // shows up in seenGroups, the user's explicit choice (in userCollapsedGroups) wins.
  const [seenGroups, setSeenGroups] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    setSeenGroups((prev) => {
      const next = new Set(prev);
      let changed = false;
      groups.forEach((g) => {
        if (g.label && !next.has(g.label)) {
          next.add(g.label);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [groups]);
  const toggleCollapsed = (label: string) =>
    setUserCollapsedGroups((prev) => {
      const next = new Set(prev);
      // First explicit toggle on a default-collapsed group flips it open; subsequent
      // toggles flip it normally.
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  const isCollapsed = (label?: string) => {
    if (!label) return false;
    // If the user has explicitly toggled this group, honor that — otherwise fall back
    // to the per-label default.
    if (seenGroups.has(label)) {
      const defaultCollapsed = DEFAULT_COLLAPSED_STATUS_GROUPS.has(label);
      const userToggled = userCollapsedGroups.has(label);
      // XOR: default-collapsed groups are open when the user toggled them; default-open
      // groups are collapsed when the user toggled them.
      return defaultCollapsed !== userToggled;
    }
    return DEFAULT_COLLAPSED_STATUS_GROUPS.has(label);
  };

  // Only books from expanded groups participate in keyboard navigation — there's nothing
  // to focus inside a collapsed group.
  const flatBooks = useMemo(
    () => groups.flatMap((g) => (isCollapsed(g.label) ? [] : g.items)),
    // isCollapsed depends on userCollapsedGroups + seenGroups
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups, userCollapsedGroups, seenGroups],
  );
  const groupStarts = useMemo(() => {
    const starts: number[] = [];
    let sum = 0;
    groups.forEach((g) => {
      starts.push(sum);
      if (!isCollapsed(g.label)) sum += g.items.length;
    });
    return starts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, userCollapsedGroups, seenGroups]);

  const firstUlRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [columns, setColumns] = useState(2);
  // Anchor for shift-click range selection: the flatBooks index of the most recent
  // non-shift click. Reset when the visible items change so a stale anchor in a different
  // group can't produce an unexpectedly large range.
  const anchorIndexRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    anchorIndexRef.current = undefined;
  }, [items]);
  // Tracks which group's "select all" checkbox is currently being hovered so we can
  // visually highlight the books that would be toggled. Without this hint the user has
  // no way to tell the bulk checkbox apart from a per-row one.
  const [hoveredGroupLabel, setHoveredGroupLabel] = useState<string | undefined>(undefined);

  // Count the cells that share the first row's offsetTop to get a column count
  // that matches whatever CSS grid produces at the current container width.
  useEffect(() => {
    const ul = firstUlRef.current;
    if (!ul) return undefined;
    const measure = () => {
      const lis = ul.querySelectorAll<HTMLLIElement>(':scope > li');
      if (lis.length === 0) return;
      const firstTop = lis[0].offsetTop;
      let cols = 0;
      for (const li of Array.from(lis)) {
        if (li.offsetTop !== firstTop) break;
        cols += 1;
      }
      if (cols > 0) setColumns(cols);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [flatBooks.length, groups.length]);

  useEffect(() => {
    setFocusedIndex((prev) => {
      if (flatBooks.length === 0) return 0;
      return Math.min(prev, flatBooks.length - 1);
    });
  }, [flatBooks.length]);

  const moveFocus = (nextIdx: number) => {
    if (flatBooks.length === 0) return;
    const clamped = Math.max(0, Math.min(flatBooks.length - 1, nextIdx));
    setFocusedIndex(clamped);
    buttonRefs.current[clamped]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveFocus(focusedIndex + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveFocus(focusedIndex - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(focusedIndex + columns);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(focusedIndex - columns);
        break;
      case 'Home':
        e.preventDefault();
        moveFocus(0);
        break;
      case 'End':
        e.preventDefault();
        moveFocus(flatBooks.length - 1);
        break;
      default:
        break;
    }
  };

  // Always show at least 2 columns, then step up at sub-sm widths via arbitrary-media
  // variants so the grid also works nicely inside the narrow collapsed-sidebar layout.
  // Pills get wider whenever there's something extra inside them — a comparison badge
  // (Copy / Import) OR an out-of-scope warning glyph (Create when scope is set). Without
  // this the warning icon can push the badge or trailing slot out of the pill at narrow
  // widths.
  const anyBadges = items.some((it) => it.tone !== 'neutral');
  const anyUnplanned = items.some((it) => it.unplanned);
  const needsWiderPills = anyBadges || anyUnplanned;
  const gridColsClass = needsWiderPills
    ? 'tw-grid-cols-2 [@media(min-width:720px)]:tw-grid-cols-3 [@media(min-width:980px)]:tw-grid-cols-4'
    : 'tw-grid-cols-2 [@media(min-width:560px)]:tw-grid-cols-3 [@media(min-width:720px)]:tw-grid-cols-4 [@media(min-width:900px)]:tw-grid-cols-5';

  const renderPill = (item: BookGridItem, flatIndex: number) => {
    const isSelected = selected.has(item.book);
    const showBadge = item.tone !== 'neutral';
    // Compact sizing so "Newer"/"Older" don't push against the book code at narrow widths.
    const badgeClass =
      'tw-ml-auto tw-shrink-0 tw-whitespace-nowrap tw-px-1.5 tw-py-0 tw-text-[10px] tw-leading-tight';
    // No tooltip on the badge itself — the whole pill carries a single tooltip below so
    // the trigger is always the row, never a child element inside it. For "New - in
    // scope" / "New - out of scope" we render just "New" on the badge: the in/out cue is
    // already conveyed by the monochrome warning icon on the pill, so spelling it out on
    // the badge is redundant. The full label is still used as the status group key.
    const badgeLabel =
      item.statusLabel === 'New' || item.statusLabel.startsWith('New -') ? 'New' : item.statusLabel;
    const badge = showBadge ? (
      <Badge variant={STATUS_BADGE_VARIANT[item.tone]} className={badgeClass}>
        {badgeLabel}
      </Badge>
    ) : undefined;

    // The dot conveys whether the book is in the project (filled = present, muted = absent)
    // and always shows. Interactive UIs additionally render a checkbox in front of it to
    // convey selection state for the pending action.
    const dot = (
      <span
        aria-hidden
        className={cn(
          'tw-inline-block tw-h-2.5 tw-w-2.5 tw-shrink-0 tw-rounded-full',
          item.present ? 'tw-bg-primary' : 'tw-bg-muted',
        )}
      />
    );

    // Out-of-scope rows use a monochrome warning glyph rather than a badge: the goal is a
    // quiet "this is unusual" cue that doesn't compete with the comparison badge or the
    // pill's own coloring for attention. The explanatory text lives in the pill's tooltip.
    const unplannedIcon = item.unplanned ? (
      <span
        aria-label="Does not match project scope"
        className="tw-inline-flex tw-h-3.5 tw-w-3.5 tw-shrink-0 tw-items-center tw-justify-center tw-text-muted-foreground"
      >
        <AlertTriangle className="tw-h-3.5 tw-w-3.5" aria-hidden />
      </span>
    ) : undefined;

    const body = (
      <>
        {interactive && (
          <Checkbox
            checked={isSelected}
            tabIndex={-1}
            aria-hidden
            className="tw-pointer-events-none tw-shrink-0"
          />
        )}
        {dot}
        <span className="tw-shrink-0">{item.book}</span>
        {unplannedIcon}
        {badge}
        {item.trailing}
      </>
    );

    // Unified tooltip across all workflows. Composition rules:
    //   • Line 1: full English book name (semibold). Short id is intentionally not
    //     repeated here — it's already the pill's primary label.
    //   • Status line: only when the pill has no comparison badge (otherwise the badge
    //     already carries that information). Untracked rows get a leading X glyph so the
    //     status reads "✕ Untracked".
    //   • Out of scope: monochrome warning glyph plus the words "Out of scope".
    //   • Date lines: only rendered when their value is defined, so workflows that don't
    //     have dates for a row don't show "Last modified: —" placeholders.
    const englishName = Canon.bookIdToEnglishName(item.book) || item.book;
    // Status labels that the rest of the pill already conveys visually — the dot +
    // border style covers "In project" / "Not in project", and the warning glyph
    // covers "In scope" / "Out of scope". Surfacing them textually adds noise without
    // information, so they're skipped from the tooltip.
    const isRedundantStatus =
      item.statusLabel === 'In scope' ||
      item.statusLabel === 'Out of scope' ||
      item.statusLabel === 'In project' ||
      item.statusLabel === 'Not in project';
    const tooltipContent = (
      <div className="tw-flex tw-flex-col tw-gap-0.5 tw-text-xs">
        <div className="tw-font-semibold">{englishName}</div>
        {!showBadge && !isRedundantStatus && (
          <div className="tw-inline-flex tw-items-center tw-gap-1">
            {item.untracked && (
              <X className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-destructive" aria-hidden />
            )}
            <span>{item.untracked ? 'Untracked' : item.statusLabel}</span>
          </div>
        )}
        {item.unplanned && showUnplannedTooltip && (
          <div className="tw-inline-flex tw-items-center tw-gap-1">
            <AlertTriangle
              className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground"
              aria-hidden
            />
            <span>Out of scope</span>
          </div>
        )}
        {item.primaryDate !== undefined && primaryDateLabel !== undefined && (
          <div>
            {primaryDateLabel}: {item.primaryDate}
          </div>
        )}
        {item.secondaryDate !== undefined && secondaryDateLabel !== undefined && (
          <div>
            {secondaryDateLabel}: {item.secondaryDate}
          </div>
        )}
        {item.disabled && item.disabledReason && (
          <div className="tw-text-muted-foreground">{item.disabledReason}</div>
        )}
      </div>
    );

    if (!interactive) {
      const plain = <div className={bookPillClasses(item.present)}>{body}</div>;
      return (
        <Tooltip>
          <TooltipTrigger asChild>{plain}</TooltipTrigger>
          <TooltipContent side="left">{tooltipContent}</TooltipContent>
        </Tooltip>
      );
    }

    const button = (
      <button
        ref={(el) => {
          buttonRefs.current[flatIndex] = el;
        }}
        type="button"
        tabIndex={flatIndex === focusedIndex ? 0 : -1}
        aria-pressed={isSelected}
        aria-disabled={item.disabled || undefined}
        disabled={item.disabled}
        onClick={(e) => {
          if (item.disabled) return;
          // Shift-click extends a row-major range from the last non-shift anchor to this
          // pill, matching the behavior of Outlook-style email lists. The final state for
          // every book in the range is taken from the anchor's selection state so the
          // gesture is symmetrical (extending a select extends with select; extending a
          // deselect extends with deselect). Disabled rows in the range are skipped.
          if (e.shiftKey && onRangeToggle && anchorIndexRef.current !== undefined) {
            const anchor = anchorIndexRef.current;
            const start = Math.min(anchor, flatIndex);
            const end = Math.max(anchor, flatIndex);
            const anchorBook = flatBooks[anchor]?.book;
            const select = anchorBook ? selected.has(anchorBook) : true;
            const range: string[] = [];
            for (let i = start; i <= end; i += 1) {
              const it = flatBooks[i];
              if (!it || it.disabled) continue;
              range.push(it.book);
            }
            if (range.length > 0) onRangeToggle(range, select);
            return;
          }
          anchorIndexRef.current = flatIndex;
          onToggle(item.book);
        }}
        onFocus={() => setFocusedIndex(flatIndex)}
        className={cn(
          bookPillClasses(item.present),
          'tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1',
          // Selected pills foreground in primary color so the staged set reads at a
          // glance — works for both present (solid border) and not-in-project (dashed
          // border) rows.
          isSelected && 'tw-text-primary',
          item.disabled && 'tw-cursor-not-allowed tw-opacity-50',
        )}
      >
        {body}
      </button>
    );
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="left">{tooltipContent}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div
      onKeyDown={interactive ? onKeyDown : undefined}
      // tw-p-1 gives focus outlines breathing room so they aren't clipped by overflow-auto.
      // No vertical gap between groups: each group header carries its own `pt-3` so its
      // opaque background extends upward and nothing from the previous group remains
      // visible above the sticky header while scrolling.
      className={cn(
        'tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-overflow-auto tw-p-1',
        contentClassName,
      )}
    >
      {groups.map((group, gi) => {
        const collapsed = isCollapsed(group.label);
        const groupBooks = group.items.map((it) => it.book);
        const groupSelectedCount = groupBooks.reduce(
          (acc, book) => (selected.has(book) ? acc + 1 : acc),
          0,
        );
        const allSelected = groupBooks.length > 0 && groupSelectedCount === groupBooks.length;
        const headerCheckState: boolean | 'indeterminate' =
          groupSelectedCount === 0 ? false : allSelected ? true : 'indeterminate';
        const toggleAllInGroup = () => {
          if (allSelected) groupBooks.forEach((book) => onToggle(book));
          else groupBooks.filter((book) => !selected.has(book)).forEach((book) => onToggle(book));
        };
        const Chevron = collapsed ? ChevronRight : ChevronDown;
        return (
          <section key={group.label ?? 'all'} className="tw-flex tw-flex-col">
            {group.label && (
              <div
                className={cn(
                  // Compact sticky header — no internal vertical padding, just enough
                  // top spacing on follow-up groups to separate them visually. Spacing
                  // below the header is added on the <ul> below rather than on the
                  // header itself, so content doesn't slide *under* the padding while
                  // scrolling and get clipped.
                  'tw-sticky tw-top-0 tw-z-10 tw-flex tw-items-center tw-gap-2 tw-bg-background',
                  gi === 0 ? 'tw-pt-0' : 'tw-pt-1',
                )}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => group.label && toggleCollapsed(group.label)}
                  aria-expanded={!collapsed}
                  // px-2 lines the collapse chevron up with the pill
                  // checkboxes (pills use tw-px-2 inside their border) so
                  // the collapse and row controls share a column.
                  className="tw-h-6 tw-flex-1 tw-justify-start tw-gap-1 tw-px-2 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground hover:tw-text-foreground"
                >
                  <Chevron className="tw-h-3.5 tw-w-3.5" aria-hidden />
                  <span>{group.label}</span>
                  <span className="tw-ml-1 tw-font-normal tw-normal-case tw-tracking-normal tw-text-muted-foreground/70">
                    {renderGroupCount && group.label
                      ? renderGroupCount(group.label, group.items)
                      : `(${group.items.length})`}
                  </span>
                </Button>
                {/*
                  Select-all sits at the end of the row, opposite the chevron, so the
                  group label reads cleanly from left to right without a checkbox in
                  front of the title. Mouse-enter / leave on the checkbox sets the
                  hovered-group state, which drives the highlight on the pills below
                  so the user can see exactly which books the bulk action affects. A
                  tooltip with the group's name spells the action out for users who
                  haven't picked up on the highlight pattern yet.
                */}
                {interactive && !(hideGroupSelectAll?.(group.label) ?? false) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        onMouseEnter={() => group.label && setHoveredGroupLabel(group.label)}
                        onMouseLeave={() => setHoveredGroupLabel(undefined)}
                        className="tw-flex tw-shrink-0 tw-items-center"
                      >
                        <Checkbox
                          checked={headerCheckState}
                          onCheckedChange={toggleAllInGroup}
                          disabled={
                            groupBooks.length === 0 ||
                            (disableGroupSelectAll?.(group.label) ?? false)
                          }
                          aria-label={`Select all ${group.label} books`}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{`Select all ${group.label} books`}</TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
            {!collapsed && (
              <ul
                ref={gi === 0 ? firstUlRef : undefined}
                className={cn(
                  'tw-grid tw-auto-rows-min tw-gap-1 tw-text-sm',
                  // Tiny top margin so pills don't crowd the sticky group header. Lives
                  // on the ul (not the sticky header) so scrolling content doesn't get
                  // clipped under header padding.
                  group.label && 'tw-mt-0.5',
                  // While the group's bulk checkbox is hovered, push every pill in the
                  // group into its hover state. The descendant selectors land on the
                  // pill's <button> / <div>, overriding their default bg with the same
                  // accent the per-pill hover uses — so the user sees the bulk action's
                  // target as a row of "hovered" pills rather than a soft tint behind
                  // them.
                  hoveredGroupLabel === group.label &&
                    '[&_>li>button]:!tw-bg-accent [&_>li>button]:!tw-text-accent-foreground [&_>li>div]:!tw-bg-accent [&_>li>div]:!tw-text-accent-foreground',
                  gridColsClass,
                )}
              >
                {group.items.map((item, i) => (
                  <li key={item.book}>{renderPill(item, groupStarts[gi] + i)}</li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

/**
 * Matches a book against the user's filter text (case-insensitive match against the book id and
 * English name). An empty filter matches every book.
 */
function makeBookMatcher(filterText: string): (book: string) => boolean {
  const trimmed = filterText.trim().toLowerCase();
  if (!trimmed) return () => true;
  return (book) =>
    book.toLowerCase().includes(trimmed) ||
    Canon.bookIdToEnglishName(book).toLowerCase().includes(trimmed);
}

/**
 * Shared wrapper around the book grid that bundles the filter input, group-by toggle, and the grid
 * itself in one component. Every view-list workflow renders the same label + filter + group-by +
 * grid arrangement; consolidating it here keeps the layout (and the responsive rules around it —
 * e.g. the narrow-mode "Group by" label hide) in one place rather than re-implemented in every
 * section.
 */
function BookGridWithControls({
  label,
  filterText,
  setFilterText,
  groupBy,
  setGroupBy,
  items,
  selected,
  onToggle,
  onRangeToggle,
  primaryDateLabel,
  secondaryDateLabel,
  interactive = true,
  showUnplannedTooltip = true,
  hideGroupSelectAll,
  renderGroupCount,
}: {
  label: string;
  filterText: string;
  setFilterText: (next: string) => void;
  groupBy: BookGridGroupBy;
  setGroupBy: (next: BookGridGroupBy) => void;
  items: BookGridItem[];
  selected: Set<string>;
  onToggle: (book: string) => void;
  onRangeToggle?: (books: string[], select: boolean) => void;
  primaryDateLabel?: string;
  secondaryDateLabel?: string;
  interactive?: boolean;
  showUnplannedTooltip?: boolean;
  hideGroupSelectAll?: (label: string | undefined) => boolean;
  renderGroupCount?: (label: string, filteredItems: BookGridItem[]) => React.ReactNode;
}) {
  return (
    <>
      <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
        <Label className="tw-shrink-0">{label}</Label>
        <FilterBooksInput value={filterText} onChange={setFilterText} />
        <BookGridGroupByToggle value={groupBy} onChange={setGroupBy} />
      </div>
      <BookGridSelector
        items={items}
        selected={selected}
        onToggle={onToggle}
        groupBy={groupBy}
        primaryDateLabel={primaryDateLabel}
        secondaryDateLabel={secondaryDateLabel}
        interactive={interactive}
        showUnplannedTooltip={showUnplannedTooltip}
        hideGroupSelectAll={hideGroupSelectAll}
        onRangeToggle={onRangeToggle}
        renderGroupCount={renderGroupCount}
      />
    </>
  );
}

function FilterBooksInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  // SearchBar carries the search-icon and clear-button affordances natively. Wrapped in
  // a flex-1 div so it shrinks gracefully next to the label / group-by toggle without
  // pushing them off-screen. The descendant override on `[&_input]` shrinks the inner
  // Input's height so the filter row stays compact next to the other controls.
  return (
    <div className="tw-min-w-0 tw-flex-1 [&_input]:tw-h-7">
      <SearchBar value={value} onSearch={onChange} placeholder="Filter books…" isFullWidth />
    </div>
  );
}

/**
 * Standard group header count format used by most workflows: "{filtered} (total {total})" when a
 * filter is active and the totals diverge, otherwise just "{filtered}". Returns the bare text —
 * workflow-defined renderers wrap it in parens or other framing.
 */
function formatGroupCountText(filtered: number, total: number, isFiltered: boolean): string {
  if (!isFiltered || filtered === total) return `${filtered}`;
  return `${filtered} (total ${total})`;
}

/**
 * Show Books canon group count: surfaces both the project and the canon-group totals so the user
 * can read off "this many of these are in my project" at a glance. When the filter isn't active the
 * bracketed "(total …)" half collapses away since it would be a straight repeat.
 */
function formatCanonShowCountText(
  filteredInProject: number,
  filteredGroup: number,
  totalInProject: number,
  totalGroup: number,
  isFiltered: boolean,
): string {
  const main = `${filteredInProject} of ${filteredGroup} in project`;
  if (!isFiltered || (filteredInProject === totalInProject && filteredGroup === totalGroup)) {
    return main;
  }
  return `${main} (total ${totalInProject} of ${totalGroup})`;
}

function UntrackedIcon({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'tw-ml-auto tw-inline-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center',
        // When the row already carries another warning indicator (e.g. out-of-scope) the
        // X is rendered in muted-foreground so the row doesn't display two competing
        // warning colors next to each other.
        muted ? 'tw-text-muted-foreground' : 'tw-text-destructive',
      )}
    >
      <X className="tw-h-3.5 tw-w-3.5" />
    </span>
  );
}

function ShowBooksViewListSection({
  projectName,
  projectShortName,
  present,
  projectDates,
  tracked,
  scopeId,
  groupBy,
  setGroupBy,
  onClose,
}: {
  projectName: string;
  projectShortName: string;
  // Lifted state — read from the parent so optimistic Create/Delete/Copy/Import updates
  // are reflected here the moment they're dispatched, not only when a real backend call
  // settles.
  present: Set<string>;
  projectDates: Record<string, string>;
  tracked: Set<string>;
  scopeId?: ProjectScopeId;
  groupBy: BookGridGroupBy;
  setGroupBy: React.Dispatch<React.SetStateAction<BookGridGroupBy>>;
  onClose: () => void;
}) {
  const all = ALL_BOOKS;
  const scope = scopeId ? PROJECT_SCOPES[scopeId] : undefined;
  const [filterText, setFilterText] = useState('');
  const isFiltered = filterText.trim().length > 0;
  const matches = useMemo(() => makeBookMatcher(filterText), [filterText]);
  // Per-canon precomputed totals — both for the entire group and for the in-project
  // subset — so the canon group header can show "X of Y (total Z of A)".
  const canonGroupSets = useMemo<Record<string, string[]>>(
    () => ({
      'Old Testament': OT_BOOKS,
      'New Testament': NT_BOOKS,
      Deuterocanon: DC_BOOKS,
      Extra: EXTRA_BOOKS,
    }),
    [],
  );
  const items = useMemo<BookGridItem[]>(
    () =>
      all
        .filter((book) => matches(book))
        .map((book) => {
          const isPresent = present.has(book);
          const isTracked = tracked.has(book);
          const untrackedPresent = isPresent && !isTracked;
          // Flag books that are present in the project but fall outside the registered
          // scope — those get the monochrome warning glyph.
          const unplanned = !!scope && isPresent && !bookIsInScope(scope, book);
          return {
            book,
            present: isPresent,
            tone: 'neutral' as const,
            statusLabel: isPresent ? 'In project' : 'Not in project',
            // The unified pill tooltip surfaces "Last modified: <date>" automatically
            // when both primaryDate and primaryDateLabel are set.
            primaryDate: isPresent ? projectDates[book] : undefined,
            trailing: untrackedPresent ? <UntrackedIcon muted={unplanned} /> : undefined,
            unplanned,
            untracked: untrackedPresent,
          };
        }),
    [all, present, tracked, projectDates, matches, scope],
  );
  const noSelection = useMemo(() => new Set<string>(), []);
  const renderGroupCount = (label: string, filteredItems: BookGridItem[]) => {
    if (groupBy === 'canon') {
      const canonBooks = canonGroupSets[label] ?? [];
      const totalGroup = canonBooks.length;
      const totalInProject = canonBooks.filter((b) => present.has(b)).length;
      const filteredInProject = filteredItems.filter((it) => it.present).length;
      return formatCanonShowCountText(
        filteredInProject,
        filteredItems.length,
        totalInProject,
        totalGroup,
        isFiltered,
      );
    }
    // Status grouping: "In project" / "Not in project". Total is computed from the
    // unfiltered item set.
    const total = label === 'In project' ? present.size : all.length - present.size;
    return formatGroupCountText(filteredItems.length, total, isFiltered);
  };
  return (
    <SectionFrame
      title={`Show Books: ${projectName}`}
      description="Books currently in this project are highlighted with a filled dot."
      footerStart={
        <span>{`${present.size} book${present.size === 1 ? '' : 's'} in ${projectShortName}`}</span>
      }
      footer={
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-gap-2">
        <BookGridWithControls
          label="Books"
          filterText={filterText}
          setFilterText={setFilterText}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          items={items}
          selected={noSelection}
          onToggle={() => {}}
          interactive={false}
          primaryDateLabel="Last modified"
          renderGroupCount={renderGroupCount}
        />
      </div>
    </SectionFrame>
  );
}

function CreateBooksViewListSection({
  projectId,
  projectName,
  projectShortName,
  scopeId,
  present,
  projectsData,
  selected,
  setSelected,
  groupBy,
  setGroupBy,
  onCreate,
}: {
  projectId: string;
  projectName: string;
  projectShortName: string;
  scopeId?: ProjectScopeId;
  present: Set<string>;
  /** Lifted per-project state — used to look up template projects' book inventories. */
  projectsData: Record<string, ProjectBookState>;
  // Lifted to the parent so the selection survives tab switches.
  selected: Set<string>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  groupBy: BookGridGroupBy;
  setGroupBy: React.Dispatch<React.SetStateAction<BookGridGroupBy>>;
  onCreate: ViewListSectionHandlers['onCreate'];
}) {
  const all = ALL_BOOKS;
  const scope = scopeId ? PROJECT_SCOPES[scopeId] : undefined;
  const [method, setMethod] = useState<'empty' | 'chapterVerse' | 'fromTemplate'>('empty');
  // When the user picks "Create based on …" + a template project, only books that exist
  // in the template can be created from it — the rest get unchecked and disabled.
  const [templateProjectId, setTemplateProjectId] = useState<string | undefined>(undefined);
  const templateBooks = useMemo<Set<string> | undefined>(() => {
    if (method !== 'fromTemplate' || !templateProjectId) return undefined;
    return projectsData[templateProjectId]?.present;
  }, [method, templateProjectId, projectsData]);
  const [filterText, setFilterText] = useState('');
  const isFiltered = filterText.trim().length > 0;
  const matches = useMemo(() => makeBookMatcher(filterText), [filterText]);
  // Drop any selection that is no longer valid when the project changes — and also drop
  // books that aren't in the chosen template, since those can't be created from it.
  const effectiveSelection = useMemo(
    () =>
      new Set(
        Array.from(selected).filter(
          (id) => !present.has(id) && (!templateBooks || templateBooks.has(id)),
        ),
      ),
    [selected, present, templateBooks],
  );
  const count = effectiveSelection.size;
  const toggle = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });
  // Only books that don't yet exist in the project can be created — skip the rest.
  // When grouping by status the buckets are scope-driven ("In scope" / "Out of scope").
  const absentBooks = useMemo(() => all.filter((book) => !present.has(book)), [all, present]);
  // Total per group label across the unfiltered absent-books set, used by the group
  // header count formatter to surface "(total N)" while a filter is active.
  const totalsByGroup = useMemo(() => {
    const totals: Record<string, number> = {};
    const otSet = new Set(OT_BOOKS);
    const ntSet = new Set(NT_BOOKS);
    const dcSet = new Set(DC_BOOKS);
    absentBooks.forEach((b) => {
      const canon = otSet.has(b)
        ? 'Old Testament'
        : ntSet.has(b)
          ? 'New Testament'
          : dcSet.has(b)
            ? 'Deuterocanon'
            : 'Extra';
      const status = !scope || bookIsInScope(scope, b) ? 'In scope' : 'Out of scope';
      totals[canon] = (totals[canon] ?? 0) + 1;
      totals[status] = (totals[status] ?? 0) + 1;
    });
    return totals;
  }, [absentBooks, scope]);
  const items = useMemo<BookGridItem[]>(
    () =>
      absentBooks
        .filter((book) => matches(book))
        .map((book) => {
          const fitsScope = !scope || bookIsInScope(scope, book);
          // When a "Create based on" template is set, books that aren't present in
          // that template can't be created from it — they render disabled (and have
          // already been removed from the selection above).
          const disabledByTemplate = !!templateBooks && !templateBooks.has(book);
          return {
            book,
            present: false,
            tone: 'neutral' as const,
            statusLabel: fitsScope ? 'In scope' : 'Out of scope',
            unplanned: !!scope && !fitsScope,
            disabled: disabledByTemplate,
            disabledReason: disabledByTemplate ? 'Not available in selected project' : undefined,
          };
        }),
    [absentBooks, matches, scope, templateBooks],
  );
  const renderGroupCount = (label: string, filteredItems: BookGridItem[]) =>
    formatGroupCountText(filteredItems.length, totalsByGroup[label] ?? 0, isFiltered);
  return (
    <SectionFrame
      title={`Create Books: ${projectName}`}
      description="Create one or more empty books, with chapter and verse numbers, or based on a model."
      footerStart={
        <span>{`${absentBooks.length} book${absentBooks.length === 1 ? '' : 's'} available`}</span>
      }
      footer={
        <Button
          disabled={count === 0}
          onClick={() => {
            if (count === 0) return;
            void onCreate(Array.from(effectiveSelection), {
              method,
              templateProjectId: method === 'fromTemplate' ? templateProjectId : undefined,
            });
          }}
        >
          {`Create ${count} book${count === 1 ? '' : 's'} in ${projectShortName}`}
        </Button>
      }
    >
      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-gap-5">
        <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2">
          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
            <Label className="tw-shrink-0">Select books</Label>
            <FilterBooksInput value={filterText} onChange={setFilterText} />
            <BookGridGroupByToggle value={groupBy} onChange={setGroupBy} />
          </div>
          <BookGridSelector
            items={items}
            selected={effectiveSelection}
            onToggle={toggle}
            groupBy={groupBy}
            renderGroupCount={renderGroupCount}
            onRangeToggle={(books, select) =>
              setSelected((prev) => {
                const next = new Set(prev);
                books.forEach((b) => (select ? next.add(b) : next.delete(b)));
                return next;
              })
            }
          />
        </div>

        <Separator className="tw-shrink-0" />

        <RadioGroup
          className="tw-shrink-0"
          value={method}
          onValueChange={(v) => setMethod(v as typeof method)}
        >
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="empty" id="create-viewlist-empty" />
            <Label htmlFor="create-viewlist-empty">Create empty book</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="chapterVerse" id="create-viewlist-cv" />
            <Label htmlFor="create-viewlist-cv">Create with all chapter and verse numbers</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-3">
            <RadioGroupItem value="fromTemplate" id="create-viewlist-model" />
            <Label htmlFor="create-viewlist-model">Create based on:</Label>
            <Select
              value={templateProjectId}
              onValueChange={setTemplateProjectId}
              disabled={method !== 'fromTemplate'}
            >
              <SelectTrigger className="tw-w-56">
                <SelectValue placeholder="Select model project…" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_PROJECTS.filter((p) => p.id !== projectId).map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </RadioGroup>
      </div>
    </SectionFrame>
  );
}

function DeleteBooksViewListSection({
  projectName,
  projectShortName,
  present,
  projectDates,
  selected,
  setSelected,
  groupBy,
  setGroupBy,
  onDelete,
}: {
  projectName: string;
  projectShortName: string;
  present: Set<string>;
  projectDates: Record<string, string>;
  // Lifted to the parent so the selection survives tab switches.
  selected: Set<string>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  groupBy: BookGridGroupBy;
  setGroupBy: React.Dispatch<React.SetStateAction<BookGridGroupBy>>;
  onDelete: ViewListSectionHandlers['onDelete'];
}) {
  const all = ALL_BOOKS;
  const [filterText, setFilterText] = useState('');
  const isFiltered = filterText.trim().length > 0;
  const matches = useMemo(() => makeBookMatcher(filterText), [filterText]);
  const effectiveSelection = useMemo(
    () => new Set(Array.from(selected).filter((id) => present.has(id))),
    [selected, present],
  );
  const count = effectiveSelection.size;
  const toggle = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });
  // Only books that exist in the project can be deleted — skip the rest.
  const presentBooks = useMemo(() => all.filter((book) => present.has(book)), [all, present]);
  const totalsByGroup = useMemo(() => {
    const totals: Record<string, number> = {};
    const otSet = new Set(OT_BOOKS);
    const ntSet = new Set(NT_BOOKS);
    const dcSet = new Set(DC_BOOKS);
    presentBooks.forEach((b) => {
      const canon = otSet.has(b)
        ? 'Old Testament'
        : ntSet.has(b)
          ? 'New Testament'
          : dcSet.has(b)
            ? 'Deuterocanon'
            : 'Extra';
      totals[canon] = (totals[canon] ?? 0) + 1;
      totals['In project'] = (totals['In project'] ?? 0) + 1;
    });
    return totals;
  }, [presentBooks]);
  const items = useMemo<BookGridItem[]>(
    () =>
      presentBooks
        .filter((book) => matches(book))
        .map((book) => ({
          book,
          present: true,
          tone: 'neutral' as const,
          statusLabel: 'In project',
          primaryDate: projectDates[book],
        })),
    [presentBooks, projectDates, matches],
  );
  const renderGroupCount = (label: string, filteredItems: BookGridItem[]) =>
    formatGroupCountText(filteredItems.length, totalsByGroup[label] ?? 0, isFiltered);
  return (
    <SectionFrame
      title={`Delete Books: ${projectName}`}
      description="This action removes books from the project and deletes them from disk."
      footerStart={
        <span>{`${presentBooks.length} book${presentBooks.length === 1 ? '' : 's'} in ${projectShortName}`}</span>
      }
      footer={
        <Button
          variant="destructive"
          disabled={count === 0}
          onClick={() => {
            if (count === 0) return;
            void onDelete(Array.from(effectiveSelection));
          }}
        >
          {`Delete ${count} book${count === 1 ? '' : 's'} from ${projectShortName}`}
        </Button>
      }
    >
      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-gap-2">
        <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
          <Label className="tw-shrink-0">Select books</Label>
          <FilterBooksInput value={filterText} onChange={setFilterText} />
          <BookGridGroupByToggle value={groupBy} onChange={setGroupBy} />
        </div>
        <BookGridSelector
          items={items}
          selected={effectiveSelection}
          onToggle={toggle}
          groupBy={groupBy}
          renderGroupCount={renderGroupCount}
          onRangeToggle={(books, select) =>
            setSelected((prev) => {
              const next = new Set(prev);
              books.forEach((b) => (select ? next.add(b) : next.delete(b)));
              return next;
            })
          }
        />
      </div>
    </SectionFrame>
  );
}

function CopyBooksViewListSection({
  projectId,
  projectName,
  scopeId,
  projectsData,
  state,
  setState,
  groupBy,
  setGroupBy,
  onCopy,
}: {
  projectId: string;
  projectName: string;
  scopeId?: ProjectScopeId;
  projectsData: Record<string, ProjectBookState>;
  state: CopyState;
  setState: React.Dispatch<React.SetStateAction<CopyState>>;
  groupBy: BookGridGroupBy;
  setGroupBy: React.Dispatch<React.SetStateAction<BookGridGroupBy>>;
  onCopy: ViewListSectionHandlers['onCopy'];
}) {
  const toProject = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const scope = scopeId ? PROJECT_SCOPES[scopeId] : undefined;
  const [filterText, setFilterText] = useState('');
  const isFiltered = filterText.trim().length > 0;
  const matches = useMemo(() => makeBookMatcher(filterText), [filterText]);
  const { fromProjectId, selected, loading } = state;
  const fromProject = fromProjectId ? MOCK_PROJECTS.find((p) => p.id === fromProjectId) : undefined;

  // Setting `loading` in the same update as `fromProjectId` avoids the brief flicker
  // where the empty state has already gone but the spinner hasn't appeared yet — without
  // it we'd render one frame of the (still-empty) BookGridSelector between the two
  // state writes.
  const setFromProjectId = (next: string) =>
    setState((prev) => ({
      ...prev,
      fromProjectId: next,
      // Only enter the loading state when the picked project actually differs from the
      // last one we loaded for; reselecting the same project shouldn't kick a fake load.
      loading: next !== prev.loadedFor,
      selected: new Set(),
    }));
  const setSelected = (updater: Set<string> | ((prev: Set<string>) => Set<string>)) =>
    setState((prev) => ({
      ...prev,
      selected: typeof updater === 'function' ? updater(prev.selected) : updater,
    }));

  const canonicalOrder = useMemo(() => [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS], []);

  // Derive the comparison list from real project data: every book that exists in the
  // source project shows up with its state relative to the destination.
  const copyableItems: BookGridItem[] = useMemo(() => {
    if (!fromProjectId) return [];
    const sourceData = projectsData[fromProjectId] ?? {
      present: new Set<string>(),
      dates: {},
    };
    const destData = projectsData[toProject.id] ?? {
      present: new Set<string>(),
      dates: {},
    };
    const built: BookGridItem[] = [];
    canonicalOrder.forEach((book) => {
      if (!sourceData.present.has(book)) return;
      const sourceDate = sourceData.dates[book];
      const destDate = destData.dates[book];
      const compareState = computeCompareState(sourceDate, destDate);
      const tone = toneForComparisonState(compareState);
      if (tone === 'hidden') return;
      const destHas = destData.present.has(book);
      // Flag scope-mismatch only for new books — books already in the destination
      // project can't be "new" for this copy.
      const isUnplanned = !!scope && !destHas && !bookIsInScope(scope, book);
      // For "New" rows we split the status label by scope so the status grouping can
      // separate new in-scope additions (the safe ones) from new out-of-scope additions
      // (the ones the user should review). Other comparison states stay as-is.
      const statusLabel =
        compareState === 'New'
          ? scope
            ? isUnplanned
              ? 'New - out of scope'
              : 'New - in scope'
            : 'New'
          : compareState;
      built.push({
        book,
        present: destHas,
        tone,
        statusLabel,
        primaryDate: destDate,
        secondaryDate: sourceDate,
        unplanned: isUnplanned,
      });
    });
    return built;
  }, [fromProjectId, toProject.id, canonicalOrder, scope, projectsData]);

  const items = useMemo(
    () => copyableItems.filter((item) => matches(item.book)),
    [copyableItems, matches],
  );
  // Per-group totals from the unfiltered copyable set, used by the group header count
  // formatter when a filter is active.
  const totalsByGroup = useMemo(() => {
    const totals: Record<string, number> = {};
    const otSet = new Set(OT_BOOKS);
    const ntSet = new Set(NT_BOOKS);
    const dcSet = new Set(DC_BOOKS);
    copyableItems.forEach((it) => {
      const canon = otSet.has(it.book)
        ? 'Old Testament'
        : ntSet.has(it.book)
          ? 'New Testament'
          : dcSet.has(it.book)
            ? 'Deuterocanon'
            : 'Extra';
      totals[canon] = (totals[canon] ?? 0) + 1;
      totals[it.statusLabel] = (totals[it.statusLabel] ?? 0) + 1;
    });
    return totals;
  }, [copyableItems]);
  const renderGroupCount = (label: string, filteredItems: BookGridItem[]) =>
    formatGroupCountText(filteredItems.length, totalsByGroup[label] ?? 0, isFiltered);

  useEffect(() => {
    if (!fromProjectId || fromProjectId === state.loadedFor) return undefined;
    setState((prev) => ({ ...prev, loading: true, selected: new Set() }));
    const timeout = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        // Leave the selection empty — the user picks which books to copy themselves.
        loading: false,
        loadedFor: prev.fromProjectId,
      }));
    }, 700);
    return () => clearTimeout(timeout);
  }, [fromProjectId, state.loadedFor, setState]);

  // If the destination project flips to what was selected as the source, a project can't be
  // copying from itself — clear the "copy from" picker and the staged selection.
  useEffect(() => {
    if (fromProjectId && fromProjectId === toProject.id) {
      setState({
        fromProjectId: undefined,
        selected: new Set(),
        loading: false,
        loadedFor: undefined,
      });
    }
  }, [toProject.id, fromProjectId, setState]);

  const toggle = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  // Books that already exist in the destination project trigger a confirmation popover
  // when the Copy button is hit — they'd otherwise overwrite without warning. New books
  // (i.e. comparison state "New") skip the prompt and dispatch immediately.
  const destPresentSet = projectsData[toProject.id]?.present ?? new Set<string>();
  const conflictBooks = useMemo(
    () => Array.from(selected).filter((b) => destPresentSet.has(b)),
    [selected, destPresentSet],
  );
  const needsConfirm = conflictBooks.length > 0;
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Close the popover automatically if the conflict goes away (e.g. the user
  // unchecks the conflicting books while it's open).
  useEffect(() => {
    if (!needsConfirm && confirmOpen) setConfirmOpen(false);
  }, [needsConfirm, confirmOpen]);

  const dispatchCopy = (mode: OverwriteMode) => {
    if (!fromProjectId || selected.size === 0) return;
    setConfirmOpen(false);
    void onCopy(Array.from(selected), fromProjectId, mode);
  };

  return (
    <SectionFrame
      title={`Copy Books: ${projectName}`}
      description="All books preceded by a check mark will be copied."
      footerStart={
        fromProject && !loading ? (
          <span>
            {`${copyableItems.length} book${copyableItems.length === 1 ? '' : 's'} available from ${fromProject.shortName}`}
          </span>
        ) : undefined
      }
      footer={
        <>
          <Button
            disabled={selected.size === 0 || !fromProjectId}
            onClick={() => {
              if (selected.size === 0 || !fromProjectId) return;
              // Conflicts open the confirmation dialog so the user can pick a strategy;
              // a clean copy (no books already in the destination) dispatches straight
              // through with the safe "non-existing chapters" mode.
              if (needsConfirm) setConfirmOpen(true);
              else dispatchCopy('nonExisting');
            }}
          >
            {`Copy ${selected.size} book${selected.size === 1 ? '' : 's'} into ${toProject.shortName}`}
          </Button>
          <ConfirmOverwriteDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            conflictBooks={conflictBooks}
            destProjectName={toProject.name}
            variant="copy"
            onConfirm={dispatchCopy}
          />
        </>
      }
    >
      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-gap-4">
        <div className="tw-grid tw-shrink-0 tw-grid-cols-[auto_1fr] tw-items-center tw-gap-3">
          <Label htmlFor="copy-from-viewlist">Copy from</Label>
          {/*
            Keying the Select on the current value forces Radix to remount whenever the
            destination flips to match the source (which clears `fromProjectId`).
            Without the key, Radix retains the previously-rendered selected label and
            the "Select a project" placeholder never reappears.
          */}
          <Select
            key={fromProjectId ?? 'empty'}
            value={fromProjectId}
            onValueChange={setFromProjectId}
          >
            <SelectTrigger
              id="copy-from-viewlist"
              className={cn(
                !fromProjectId &&
                  'tw-border-primary tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90 [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground',
              )}
            >
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_PROJECTS.filter((p) => p.id !== toProject.id).map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!fromProject ? (
          <div className="tw-flex tw-min-h-40 tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-border tw-border-dashed tw-p-10 tw-text-center tw-text-sm tw-text-muted-foreground">
            Select a project
          </div>
        ) : loading ? (
          <div className="tw-flex tw-min-h-40 tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-rounded-md tw-border tw-p-10 tw-text-center tw-text-sm tw-text-muted-foreground">
            <Loader2 className="tw-h-6 tw-w-6 tw-animate-spin" aria-hidden />
            Comparing books between {fromProject.shortName} and {toProject.shortName}…
          </div>
        ) : (
          <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2">
            <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
              <Label className="tw-shrink-0">Select books</Label>
              <FilterBooksInput value={filterText} onChange={setFilterText} />
              <BookGridGroupByToggle value={groupBy} onChange={setGroupBy} />
            </div>
            <BookGridSelector
              items={items}
              selected={selected}
              onToggle={toggle}
              groupBy={groupBy}
              primaryDateLabel={toProject.shortName}
              secondaryDateLabel={fromProject.shortName}
              renderGroupCount={renderGroupCount}
              onRangeToggle={(books, select) =>
                setSelected((prev) => {
                  const next = new Set(prev);
                  books.forEach((b) => (select ? next.add(b) : next.delete(b)));
                  return next;
                })
              }
            />
          </div>
        )}
      </div>
    </SectionFrame>
  );
}

function ImportBooksViewListSection({
  projectShortName,
  projectName,
  scopeId,
  present,
  state,
  setState,
  groupBy,
  setGroupBy,
  onImport,
}: {
  projectShortName: string;
  projectName: string;
  scopeId?: ProjectScopeId;
  present: Set<string>;
  state: ImportState;
  setState: React.Dispatch<React.SetStateAction<ImportState>>;
  groupBy: BookGridGroupBy;
  setGroupBy: React.Dispatch<React.SetStateAction<BookGridGroupBy>>;
  onImport: ViewListSectionHandlers['onImport'];
}) {
  const { files, selected } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scope = scopeId ? PROJECT_SCOPES[scopeId] : undefined;
  const [filterText, setFilterText] = useState('');
  const isFiltered = filterText.trim().length > 0;
  const matches = useMemo(() => makeBookMatcher(filterText), [filterText]);

  const setSelected = (updater: Set<string> | ((prev: Set<string>) => Set<string>)) =>
    setState((prev) => ({
      ...prev,
      selected: typeof updater === 'function' ? updater(prev.selected) : updater,
    }));

  const openFileDialog = () => fileInputRef.current?.click();

  // Per-file validity check: read the file content and look for a USFM `\id BBB` marker.
  // If present, derive the book id from it. If absent, treat the file as unimportable.
  // Async because File.text() is async — we await all picks in handleFilesPicked.
  const readBookIdFromFile = async (
    f: File,
  ): Promise<{ ok: true; book: string } | { ok: false; reason: string }> => {
    try {
      // We only need the first ~1KB to find the \id line; reading the whole file would
      // be wasteful for large USX/XML inputs.
      const head = await f.slice(0, 4096).text();
      const match = head.match(/\\id\s+([A-Za-z0-9]{3})/);
      if (!match) return { ok: false, reason: 'No \\id marker found' };
      const candidate = match[1].toUpperCase();
      // The id must look like a real book id — a known canon entry. We check against
      // the same `Canon.allBookIds` the rest of the dialog uses.
      if (!Canon.allBookIds.includes(candidate)) {
        return { ok: false, reason: `Unknown book id: ${candidate}` };
      }
      return { ok: true, book: candidate };
    } catch (err) {
      return { ok: false, reason: 'Could not read file' };
    }
  };

  const handleFilesPicked = async (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    const existingNames = new Set(files.map((f) => f.file));
    const fresh = Array.from(picked).filter((f) => !existingNames.has(f.name));
    if (fresh.length === 0) return;
    // Inspect every fresh file in parallel — File.text() is independent per file.
    const results = await Promise.all(
      fresh.map(async (f) => ({ name: f.name, result: await readBookIdFromFile(f) })),
    );
    const successes: ImportRow[] = [];
    const failures: { file: string; reason: string }[] = [];
    results.forEach(({ name, result }, idx) => {
      if (result.ok) {
        // Use the parsed book id; pull mock comparison dates from MOCK_IMPORT_FILES so
        // the prototype still has interesting "Newer / New / Older" rows to show.
        const mock = MOCK_IMPORT_FILES[idx % MOCK_IMPORT_FILES.length];
        successes.push({
          file: name,
          book: result.book,
          fromDate: mock.fromDate,
          toDate: mock.toDate,
          state: mock.state,
        });
      } else {
        failures.push({ file: name, reason: result.reason });
      }
    });
    // Every picked file ends up in `state.files` — failures included — so the user can
    // see what was attempted. Failed entries don't appear in the book grid (their tone
    // resolves to 'hidden') but they remain in state so the failed-count chip and the
    // toast stay in sync.
    const failureRows: ImportRow[] = failures.map(({ file, reason }) => ({
      file,
      book: '',
      state: 'Failed',
      failureReason: reason,
    }));
    if (successes.length === 0 && failureRows.length === 0) return;
    setState((prev) => {
      const nextSelected = new Set(prev.selected);
      successes.forEach((a) => nextSelected.add(a.file));
      return {
        ...prev,
        files: [...prev.files, ...successes, ...failureRows],
        selected: nextSelected,
      };
    });
    if (failures.length > 0) {
      const titles = failures.slice(0, 3).map((x) => x.file);
      const more =
        failures.length > titles.length ? ` and ${failures.length - titles.length} more` : '';
      sonner.warning(
        `${failures.length} file${failures.length === 1 ? '' : 's'} could not be imported`,
        {
          description: `${titles.join(', ')}${more}`,
          duration: Infinity,
          dismissible: true,
          closeButton: true,
          action: {
            label: 'Dismiss',
            onClick: () => {
              // The toast's default handler dismisses it.
            },
          },
        },
      );
    }
  };

  const clearList = () => setState({ files: [], selected: new Set(), replace: new Set() });

  // Dedupe by book (if two files provide the same book, keep the first).
  const allImportItems: BookGridItem[] = useMemo(() => {
    const seen = new Set<string>();
    const built: BookGridItem[] = [];
    files.forEach((row) => {
      if (seen.has(row.book)) return;
      const tone = toneForComparisonState(row.state);
      if (tone === 'hidden') return;
      seen.add(row.book);
      const destHas = present.has(row.book);
      // Only flag new books that don't fit the scope; books already in the project
      // can't be "new".
      const isUnplanned = !!scope && !destHas && !bookIsInScope(scope, row.book);
      // Split "New" by scope so the status grouping separates safe new imports from
      // out-of-scope ones the user should review.
      const statusLabel =
        row.state === 'New'
          ? scope
            ? isUnplanned
              ? 'New - out of scope'
              : 'New - in scope'
            : 'New'
          : row.state;
      built.push({
        book: row.book,
        present: destHas,
        tone,
        statusLabel,
        primaryDate: row.toDate,
        secondaryDate: row.fromDate,
        unplanned: isUnplanned,
      });
    });
    return built;
  }, [files, present, scope]);

  const items = useMemo(
    () => allImportItems.filter((item) => matches(item.book)),
    [allImportItems, matches],
  );
  // Per-group totals from the unfiltered import set, used by the group header count
  // formatter when a filter is active.
  const totalsByGroup = useMemo(() => {
    const totals: Record<string, number> = {};
    const otSet = new Set(OT_BOOKS);
    const ntSet = new Set(NT_BOOKS);
    const dcSet = new Set(DC_BOOKS);
    allImportItems.forEach((it) => {
      const canon = otSet.has(it.book)
        ? 'Old Testament'
        : ntSet.has(it.book)
          ? 'New Testament'
          : dcSet.has(it.book)
            ? 'Deuterocanon'
            : 'Extra';
      totals[canon] = (totals[canon] ?? 0) + 1;
      totals[it.statusLabel] = (totals[it.statusLabel] ?? 0) + 1;
    });
    return totals;
  }, [allImportItems]);
  const renderGroupCount = (label: string, filteredItems: BookGridItem[]) =>
    formatGroupCountText(filteredItems.length, totalsByGroup[label] ?? 0, isFiltered);

  // Map a book selection back to the underlying files it covers (for the footer count).
  const selectedBookSet = useMemo(() => {
    const bookForFile = new Map(files.map((f) => [f.file, f.book]));
    const books = new Set<string>();
    selected.forEach((file) => {
      const book = bookForFile.get(file);
      if (book) books.add(book);
    });
    return books;
  }, [files, selected]);

  const toggleBook = (book: string) => {
    const matching = files.filter((f) => f.book === book).map((f) => f.file);
    setSelected((prev) => {
      const next = new Set(prev);
      const allOn = matching.every((file) => next.has(file));
      if (allOn) matching.forEach((file) => next.delete(file));
      else matching.forEach((file) => next.add(file));
      return next;
    });
  };

  // Books that already exist in the destination project trigger the overwrite
  // confirmation popover. New books skip the prompt. The selection lives in `selected`
  // (file ids), so we map it back through the file list to a unique set of book ids.
  const conflictBooks = useMemo(
    () => Array.from(selectedBookSet).filter((b) => present.has(b)),
    [selectedBookSet, present],
  );
  const needsConfirm = conflictBooks.length > 0;
  const [confirmOpen, setConfirmOpen] = useState(false);
  useEffect(() => {
    if (!needsConfirm && confirmOpen) setConfirmOpen(false);
  }, [needsConfirm, confirmOpen]);

  const dispatchImport = (mode: OverwriteMode) => {
    if (selectedBookSet.size === 0) return;
    setConfirmOpen(false);
    void onImport(Array.from(selectedBookSet), mode);
  };

  return (
    <SectionFrame
      title={`Import Books: ${projectName}`}
      description="Select files to import, then pick which of their books to bring into this project."
      footerStart={
        files.length > 0 ? (
          <span>{`${files.length} file${files.length === 1 ? '' : 's'} available to import`}</span>
        ) : undefined
      }
      footer={
        <>
          <Button
            disabled={selectedBookSet.size === 0}
            onClick={() => {
              if (selectedBookSet.size === 0) return;
              if (needsConfirm) setConfirmOpen(true);
              else dispatchImport('nonExisting');
            }}
          >
            {`Import ${selectedBookSet.size} book${selectedBookSet.size === 1 ? '' : 's'} into ${projectShortName}`}
          </Button>
          <ConfirmOverwriteDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            conflictBooks={conflictBooks}
            destProjectName={projectName}
            variant="import"
            onConfirm={dispatchImport}
          />
        </>
      }
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".sfm,.usfm,.usx,.xml"
        className="tw-hidden"
        onChange={(e) => {
          handleFilesPicked(e.target.files);
          e.target.value = '';
        }}
      />

      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-gap-4">
        <div className="tw-flex tw-shrink-0 tw-flex-wrap tw-items-center tw-gap-2">
          {files.length === 0 ? (
            <Button onClick={openFileDialog}>Select files…</Button>
          ) : (
            <>
              <Button variant="outline" onClick={openFileDialog}>
                Select more files…
              </Button>
              <Button variant="outline" onClick={clearList}>
                Clear List
              </Button>
              {(() => {
                const failedCount = files.filter((f) => f.state === 'Failed').length;
                if (failedCount === 0) return undefined;
                return (
                  <span className="tw-inline-flex tw-items-center tw-gap-1 tw-text-xs tw-text-muted-foreground">
                    <AlertTriangle className="tw-h-3.5 tw-w-3.5" aria-hidden />
                    {`${failedCount} file${failedCount === 1 ? '' : 's'} could not be imported`}
                  </span>
                );
              })()}
            </>
          )}
        </div>

        {files.length === 0 ? (
          <div className="tw-flex tw-min-h-40 tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-rounded-md tw-border tw-border-dashed tw-p-10 tw-text-center">
            <FolderOpen className="tw-h-8 tw-w-8 tw-text-muted-foreground" aria-hidden />
            <div className="tw-text-sm tw-text-muted-foreground">
              No files selected. Choose one or more book files to import.
            </div>
          </div>
        ) : (
          <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2">
            <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
              <Label className="tw-shrink-0">Select books</Label>
              <FilterBooksInput value={filterText} onChange={setFilterText} />
              <BookGridGroupByToggle value={groupBy} onChange={setGroupBy} />
            </div>
            <BookGridSelector
              items={items}
              selected={selectedBookSet}
              onToggle={toggleBook}
              groupBy={groupBy}
              primaryDateLabel={projectShortName}
              secondaryDateLabel="File"
              renderGroupCount={renderGroupCount}
              onRangeToggle={(books, select) => {
                const bookSet = new Set(books);
                const matchingFiles = files.filter((f) => bookSet.has(f.book)).map((f) => f.file);
                setSelected((prev) => {
                  const next = new Set(prev);
                  matchingFiles.forEach((f) => (select ? next.add(f) : next.delete(f)));
                  return next;
                });
              }}
            />
          </div>
        )}
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// Book Names workflow — table view of short / long name + TOC1–3, with inline
// edit and an option to copy each row's TOC values from another project.
// --------------------------------------------------------------------------

type BookNameOverrides = Record<string, { toc1?: string; toc2?: string; toc3?: string }>;

type BookNameCanonGroup = 'OT' | 'NT' | 'DC' | 'Extra';
function classifyBookForNames(book: string): BookNameCanonGroup {
  if (OT_BOOKS.includes(book)) return 'OT';
  if (NT_BOOKS.includes(book)) return 'NT';
  if (DC_BOOKS.includes(book)) return 'DC';
  return 'Extra';
}

/**
 * Bulk-import popover button. Replaces the inline label + select + Import row in the Book Names
 * action bar. The popover holds its own selected-project draft so closing without confirming
 * doesn't leave a stale value behind. Cancel and outside-click both close without committing;
 * Import calls back to the parent and closes.
 */
function BookNamesImportPopover({
  currentProjectId,
  onImport,
}: {
  currentProjectId: string;
  onImport: (sourceProjectId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  // Reset the selected project whenever the popover transitions to closed so reopening
  // it always starts at "no project" — the user has to make a fresh choice each time.
  useEffect(() => {
    if (!open) setSelected(undefined);
  }, [open]);
  const handleImport = () => {
    if (!selected) return;
    onImport(selected);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="tw-shrink-0">
          Import book names…
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="tw-flex tw-w-72 tw-flex-col tw-gap-3">
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="book-names-import-source" className="tw-text-xs tw-text-muted-foreground">
            Import book names from
          </Label>
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger id="book-names-import-source" className="tw-h-8">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_PROJECTS.filter((p) => p.id !== currentProjectId).map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="tw-flex tw-items-center tw-justify-end tw-gap-2 tw-pt-1">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleImport} disabled={!selected}>
            Import
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Per-row Edit popover. Holds its own draft so the values only commit when the user clicks Save —
 * clicking outside or hitting Cancel discards the draft. Component remounts whenever the user
 * navigates away from the Book Names workflow, which means any open popover is cancelled by
 * switching workflows for free.
 */
function BookNameEditPopover({
  book,
  initialValues,
  onSave,
}: {
  book: string;
  initialValues: { toc1: string; toc2: string; toc3: string };
  onSave: (values: { toc1: string; toc2: string; toc3: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(initialValues);
  // Re-seed the draft from the resolved row values whenever the popover opens — this is
  // the single point where committed state crosses into the popover's local copy. While
  // it's open, edits stay local until Save.
  useEffect(() => {
    if (open) setDraft(initialValues);
    // initialValues is recomputed on every render of the parent, so depending on it
    // would re-seed on every keystroke — only re-seed when the popover transitions to
    // open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const englishName = Canon.bookIdToEnglishName(book) || '';
  const handleSave = () => {
    onSave(draft);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="tw-h-7 tw-w-7" aria-label={`Edit ${book}`}>
          <Pencil className="tw-h-3.5 tw-w-3.5" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" align="start" className="tw-flex tw-w-72 tw-flex-col tw-gap-3">
        <div className="tw-flex tw-flex-col tw-gap-0.5">
          <div className="tw-text-xs tw-text-muted-foreground">Book</div>
          <div className="tw-flex tw-items-baseline tw-gap-2 tw-text-sm">
            <span className="tw-font-mono tw-font-semibold">{book}</span>
            {englishName && (
              <span className="tw-text-xs tw-text-muted-foreground">{englishName}</span>
            )}
          </div>
        </div>
        {(['toc3', 'toc2', 'toc1'] as const).map((field) => {
          const fieldLabel =
            field === 'toc3'
              ? 'Abbreviation (TOC3)'
              : field === 'toc2'
                ? 'Short name (TOC2)'
                : 'Long name (TOC1)';
          return (
            <div key={field} className="tw-flex tw-flex-col tw-gap-1">
              <Label
                htmlFor={`book-name-${book}-${field}`}
                className="tw-text-xs tw-text-muted-foreground"
              >
                {fieldLabel}
              </Label>
              <Input
                id={`book-name-${book}-${field}`}
                value={draft[field]}
                onChange={(e) => setDraft((prev) => ({ ...prev, [field]: e.target.value }))}
                className="tw-h-8"
                autoFocus={field === 'toc3'}
              />
            </div>
          );
        })}
        <div className="tw-flex tw-items-center tw-justify-end tw-gap-2 tw-pt-1">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function BookNamesViewListSection({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  // Always show the full canon — user can scan rows whether the book is in the project
  // or not. Names live alongside the book id even for absent books since they're a
  // project-wide concern, not a per-book-existence concern.
  const allBooks = ALL_BOOKS;
  const [overrides, setOverrides] = useState<BookNameOverrides>({});
  const [filterText, setFilterText] = useState('');
  const matches = useMemo(() => makeBookMatcher(filterText), [filterText]);
  // Per-canon collapse state, mirroring the book grid: groups default to expanded, and
  // toggling the chevron flips them. Reset whenever the project changes so a previously
  // collapsed group doesn't carry over onto a different book set.
  const [collapsedGroups, setCollapsedGroups] = useState<Set<BookNameCanonGroup>>(() => new Set());
  const toggleGroup = (id: BookNameCanonGroup) =>
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  // Reset edits whenever the user switches projects so we never apply edits made for
  // project A onto project B.
  useEffect(() => {
    setOverrides({});
    setCollapsedGroups(new Set());
  }, [projectId]);

  // Per-project localized default for a single field. Falls back through localized →
  // English → short id, so non-English projects show their own names but the table
  // remains populated for any project that doesn't have a localized entry yet.
  const localizedNameFor = (
    sourceProjectId: string,
    book: string,
    field: 'toc1' | 'toc2' | 'toc3',
  ): string => {
    const localized = PROJECT_LOCALIZED_BOOK_NAMES[sourceProjectId]?.[book]?.[field];
    if (localized) return localized;
    if (field === 'toc3') return book;
    return Canon.bookIdToEnglishName(book) || book;
  };
  const defaultFor = (book: string, field: 'toc1' | 'toc2' | 'toc3') =>
    localizedNameFor(projectId, book, field);
  // Resolved value for a row + field — user override takes precedence, otherwise the
  // project's localized default.
  const valueFor = (book: string, field: 'toc1' | 'toc2' | 'toc3') =>
    overrides[book]?.[field] ?? defaultFor(book, field);

  const importAllFromProject = (sourceProjectId: string) => {
    // Snapshot the previous overrides so the undo action can put them back exactly. The
    // fact that we capture the snapshot before mutating means undo always reverts to the
    // edit history as it was *before* the import, even if the user keeps editing while
    // the toast is open.
    const snapshot = overrides;
    const next: BookNameOverrides = { ...overrides };
    allBooks.forEach((book) => {
      next[book] = {
        toc1: localizedNameFor(sourceProjectId, book, 'toc1'),
        toc2: localizedNameFor(sourceProjectId, book, 'toc2'),
        toc3: localizedNameFor(sourceProjectId, book, 'toc3'),
      };
    });
    setOverrides(next);
    const sourceShort =
      MOCK_PROJECTS.find((p) => p.id === sourceProjectId)?.shortName ?? sourceProjectId;
    sonner.success(`Imported book names from ${sourceShort}`, {
      // Persistent + dismissable so users have time to read the change and undo if it
      // wasn't what they meant. The "Undo" action restores the prior overrides.
      duration: Infinity,
      dismissible: true,
      action: {
        label: 'Undo',
        onClick: () => setOverrides(snapshot),
      },
    });
  };

  // Group rows by canon section. The groups are rendered as collapsible <tbody> blocks
  // so the table stays a single grid (consistent column widths) while still chunking
  // visually like the book grid.
  const visibleByGroup = useMemo(() => {
    const groups: Record<BookNameCanonGroup, string[]> = { OT: [], NT: [], DC: [], Extra: [] };
    allBooks.filter((b) => matches(b)).forEach((b) => groups[classifyBookForNames(b)].push(b));
    return groups;
  }, [allBooks, matches]);
  // Per-canon totals across the unfiltered book list — used for the group header
  // "(total N)" count when a filter is active.
  const totalsByGroup = useMemo(() => {
    const totals: Record<BookNameCanonGroup, number> = { OT: 0, NT: 0, DC: 0, Extra: 0 };
    allBooks.forEach((b) => {
      totals[classifyBookForNames(b)] += 1;
    });
    return totals;
  }, [allBooks]);
  const isFiltered = filterText.trim().length > 0;

  const groupOrder: { id: BookNameCanonGroup; label: string }[] = [
    { id: 'OT', label: 'Old Testament' },
    { id: 'NT', label: 'New Testament' },
    { id: 'DC', label: 'Deuterocanon' },
    { id: 'Extra', label: 'Extra' },
  ];

  return (
    <SectionFrame
      title={`Book Names: ${projectName}`}
      description="Edit per-book TOC entries, or import them from another project. Changes apply to this project only."
      footer={
        <>
          <Button variant="outline" size="sm">
            Checklists…
          </Button>
          <Button variant="outline" size="sm">
            Scripture reference settings…
          </Button>
        </>
      }
    >
      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-gap-3">
        {/*
          Action row. Filter takes the lion's share of the width; the bulk import is
          tucked behind a single button that opens a popup with its own picker so the
          row stays compact on narrow viewports.
        */}
        <div className="tw-flex tw-shrink-0 tw-flex-wrap tw-items-center tw-gap-2">
          <Label className="tw-shrink-0">Books</Label>
          <FilterBooksInput value={filterText} onChange={setFilterText} />
          <BookNamesImportPopover currentProjectId={projectId} onImport={importAllFromProject} />
        </div>
        <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
          {/*
            Table is fixed-layout with percentage-based widths so the columns shrink in
            proportion as the dialog narrows — the section never produces a horizontal
            scrollbar. The Book column carries a fixed width (book ids are short and the
            user wants them left-aligned), and the rest of the columns share the
            remaining space evenly. Inputs are 100% wide inside their cells, so they
            shrink with the column.
          */}
          <Table className="tw-w-full tw-table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="tw-w-12">Book</TableHead>
                <TableHead className="tw-w-[15%]">Abbrev. (TOC3)</TableHead>
                <TableHead className="tw-w-[28%]">Short (TOC2)</TableHead>
                <TableHead>Long (TOC1)</TableHead>
                <TableHead className="tw-w-16" />
              </TableRow>
            </TableHeader>
            {groupOrder.map((g) => {
              const books = visibleByGroup[g.id];
              if (books.length === 0) return undefined;
              const isCollapsed = collapsedGroups.has(g.id);
              const Chevron = isCollapsed ? ChevronRight : ChevronDown;
              return (
                <TableBody key={g.id}>
                  <TableRow className="tw-bg-muted/40 hover:tw-bg-muted/40">
                    <TableCell colSpan={5} className="tw-p-0">
                      {/*
                        Group header is a ghost button spanning the whole row so the user
                        can click anywhere on the bar — chevron, label, count — to toggle
                        the rows below.
                      */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleGroup(g.id)}
                        aria-expanded={!isCollapsed}
                        className="tw-h-6 tw-w-full tw-justify-start tw-gap-1 tw-rounded-none tw-px-2 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground hover:tw-text-foreground"
                      >
                        <Chevron className="tw-h-3.5 tw-w-3.5" aria-hidden />
                        <span>{g.label}</span>
                        <span className="tw-ml-1 tw-font-normal tw-normal-case tw-tracking-normal tw-text-muted-foreground/70">
                          {formatGroupCountText(books.length, totalsByGroup[g.id], isFiltered)}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  {!isCollapsed &&
                    books.map((book) => (
                      <TableRow key={book}>
                        <TableCell className="tw-font-mono">{book}</TableCell>
                        <TableCell className="tw-truncate">{valueFor(book, 'toc3')}</TableCell>
                        <TableCell className="tw-truncate">{valueFor(book, 'toc2')}</TableCell>
                        <TableCell className="tw-truncate">{valueFor(book, 'toc1')}</TableCell>
                        <TableCell className="tw-text-right">
                          <BookNameEditPopover
                            book={book}
                            initialValues={{
                              toc1: valueFor(book, 'toc1'),
                              toc2: valueFor(book, 'toc2'),
                              toc3: valueFor(book, 'toc3'),
                            }}
                            onSave={(next) => setOverrides((prev) => ({ ...prev, [book]: next }))}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              );
            })}
          </Table>
        </div>
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// Show Progress workflow — surface per-book completion %, the project plan
// link, and book priorities. Reads the same tracked + present mocks as Plan
// Books; progress and priorities are mock-derived from the book id.
// --------------------------------------------------------------------------

function deterministicNumberFromBook(book: string, salt: number): number {
  // Cheap, stable pseudo-random integer in [0, 100). The same book always produces the
  // same value across renders so the demo doesn't shimmer between mounts.
  let h = salt;
  for (let i = 0; i < book.length; i += 1) h = (h * 31 + book.charCodeAt(i)) >>> 0;
  return h % 100;
}

function ShowProgressViewListSection({
  projectName,
  projectShortName,
  present,
  tracked,
  selected,
  setSelected,
  onStartTracking,
  onStopTracking,
}: {
  projectName: string;
  projectShortName: string;
  present: Set<string>;
  tracked: Set<string>;
  /**
   * Lifted selection so picks survive sidebar tab switches. Mirrors the Create / Delete pattern.
   * The footer Start/Stop tracking buttons mutate this set; the table rows and group header
   * checkboxes show its derived state.
   */
  selected: Set<string>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  onStartTracking: ViewListSectionHandlers['onStartTracking'];
  onStopTracking: ViewListSectionHandlers['onStopTracking'];
}) {
  const presentBooks = useMemo(() => ALL_BOOKS.filter((b) => present.has(b)), [present]);
  const [filterText, setFilterText] = useState('');
  const isFiltered = filterText.trim().length > 0;
  const matches = useMemo(() => makeBookMatcher(filterText), [filterText]);
  const filtered = useMemo(() => presentBooks.filter((b) => matches(b)), [presentBooks, matches]);

  // Drop selection entries that aren't currently visible (e.g. project switched and
  // the book isn't present anymore). Keeps the footer counts and mutual-exclusion logic
  // honest.
  const effectiveSelection = useMemo(
    () => new Set(Array.from(selected).filter((id) => present.has(id))),
    [selected, present],
  );
  const trackedSelectedCount = useMemo(
    () => Array.from(effectiveSelection).filter((b) => tracked.has(b)).length,
    [effectiveSelection, tracked],
  );
  const untrackedSelectedCount = effectiveSelection.size - trackedSelectedCount;
  // Mutual-exclusion: once the user picks any tracked row the untracked rows lock down,
  // and vice versa. Empty selection = no constraint.
  const dominantStatus: 'Tracked' | 'Untracked' | undefined =
    trackedSelectedCount > 0 ? 'Tracked' : untrackedSelectedCount > 0 ? 'Untracked' : undefined;

  // Group filtered books by tracking status. Each group is collapsible and has its own
  // select-all checkbox in the header. Status grouping is the natural fit here because
  // the two footer buttons (Start / Stop tracking) align 1:1 with the two groups.
  const trackedBooks = useMemo(() => filtered.filter((b) => tracked.has(b)), [filtered, tracked]);
  const untrackedBooks = useMemo(
    () => filtered.filter((b) => !tracked.has(b)),
    [filtered, tracked],
  );
  const aggregate =
    trackedBooks.length === 0
      ? 0
      : Math.round(
          trackedBooks.reduce((acc, b) => acc + deterministicNumberFromBook(b, 7), 0) /
            trackedBooks.length,
        );

  type GroupId = 'Tracked' | 'Untracked';
  const [collapsedGroups, setCollapsedGroups] = useState<Set<GroupId>>(() => new Set());
  const toggleGroup = (g: GroupId) =>
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  // Tracks which group's bulk select-all checkbox is being hovered, so we can paint a
  // soft highlight over its rows. Without this the user has no way to tell the bulk
  // checkbox apart from a per-row one.
  const [hoveredGroup, setHoveredGroup] = useState<GroupId | undefined>(undefined);

  const toggleBook = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  const groupSelectionState = (booksInGroup: string[]): boolean | 'indeterminate' => {
    if (booksInGroup.length === 0) return false;
    const sel = booksInGroup.filter((b) => effectiveSelection.has(b)).length;
    if (sel === 0) return false;
    if (sel === booksInGroup.length) return true;
    return 'indeterminate';
  };

  const toggleAllInGroup = (booksInGroup: string[]) => {
    const allSelected =
      booksInGroup.length > 0 && booksInGroup.every((b) => effectiveSelection.has(b));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) booksInGroup.forEach((b) => next.delete(b));
      else booksInGroup.forEach((b) => next.add(b));
      return next;
    });
  };

  const priorityLabel = (n: number): { label: string; tone: BookGridTone } => {
    if (n >= 67) return { label: 'High', tone: 'newer' };
    if (n >= 34) return { label: 'Medium', tone: 'same' };
    return { label: 'Low', tone: 'neutral' };
  };

  const renderGroup = (status: GroupId, booksInGroup: string[]) => {
    if (booksInGroup.length === 0) return undefined;
    const isCollapsed = collapsedGroups.has(status);
    const Chevron = isCollapsed ? ChevronRight : ChevronDown;
    const selectionState = groupSelectionState(booksInGroup);
    // The "opposite" group is locked once the user has staged a selection elsewhere —
    // its checkbox and rows are disabled so the action stays unambiguous.
    const isOppositeStatus = dominantStatus !== undefined && dominantStatus !== status;
    // While the bulk checkbox is hovered, every row in this group gets a soft
    // background tint so the user can see exactly what would change.
    const isGroupHovered = hoveredGroup === status;
    const rowHoverHighlight = isGroupHovered && 'tw-bg-accent/40';
    // Total count for this status across the unfiltered present-book set, so the group
    // header can surface "(total N)" while a filter is active.
    const totalForStatus =
      status === 'Tracked'
        ? presentBooks.filter((b) => tracked.has(b)).length
        : presentBooks.filter((b) => !tracked.has(b)).length;
    const countText = formatGroupCountText(booksInGroup.length, totalForStatus, isFiltered);
    return (
      <TableBody key={status}>
        <TableRow className={cn('tw-bg-muted/40 hover:tw-bg-muted/40', rowHoverHighlight)}>
          {/* colSpan covers the leading row-checkbox slot + Book + Name + Progress +
              Priority — i.e. everything except the trailing bulk checkbox cell. */}
          <TableCell colSpan={5} className="tw-p-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleGroup(status)}
              aria-expanded={!isCollapsed}
              className="tw-h-6 tw-w-full tw-justify-start tw-gap-1 tw-rounded-none tw-px-2 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground hover:tw-text-foreground"
            >
              <Chevron className="tw-h-3.5 tw-w-3.5" aria-hidden />
              <span>{status}</span>
              <span className="tw-ml-1 tw-font-normal tw-normal-case tw-tracking-normal tw-text-muted-foreground/70">
                {countText}
              </span>
            </Button>
          </TableCell>
          <TableCell className="tw-w-10 tw-p-0">
            {/*
              Wrapper picks up mouseenter/leave so the highlight tracks the checkbox
              specifically — hovering anywhere else on the header (chevron, label) does
              not trigger it. A tooltip names the group so users know exactly which
              rows the bulk action covers.
            */}
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  onMouseEnter={() => setHoveredGroup(status)}
                  onMouseLeave={() => setHoveredGroup(undefined)}
                  className="tw-flex tw-h-6 tw-items-center tw-justify-center"
                >
                  <Checkbox
                    checked={selectionState}
                    onCheckedChange={() => toggleAllInGroup(booksInGroup)}
                    disabled={isOppositeStatus}
                    aria-label={`Select all ${status} books`}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>{`Select all ${status} books`}</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
        {!isCollapsed &&
          booksInGroup.map((book) => {
            const isTracked = status === 'Tracked';
            const progress = deterministicNumberFromBook(book, 7);
            const pri = priorityLabel(deterministicNumberFromBook(book, 13));
            const rowDisabled = isOppositeStatus;
            return (
              <TableRow
                key={book}
                className={cn(rowDisabled && 'tw-opacity-50', rowHoverHighlight)}
              >
                {/*
                  Per-row checkbox lives at the start so it lines up under the row
                  identifier — only the bulk select-all stays on the right where group
                  actions belong.
                */}
                <TableCell className="tw-w-10">
                  <Checkbox
                    checked={effectiveSelection.has(book)}
                    onCheckedChange={() => toggleBook(book)}
                    disabled={rowDisabled}
                    aria-label={book}
                  />
                </TableCell>
                <TableCell className="tw-font-mono">{book}</TableCell>
                {/*
                  English name and the progress bar drop out at narrow widths so the
                  remaining columns (book id, progress %, priority) keep their breathing
                  room. The bar's percentage text stays so the user always sees a
                  numeric progress signal.
                */}
                <TableCell className="tw-hidden tw-text-muted-foreground [@media(min-width:640px)]:tw-table-cell">
                  {Canon.bookIdToEnglishName(book) || '—'}
                </TableCell>
                <TableCell>
                  {isTracked ? (
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <div
                        className="tw-hidden tw-h-1.5 tw-flex-1 tw-overflow-hidden tw-rounded tw-bg-muted [@media(min-width:640px)]:tw-block"
                        aria-hidden
                      >
                        <div
                          className="tw-h-full tw-bg-primary"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="tw-shrink-0 tw-text-right tw-text-xs tw-tabular-nums [@media(min-width:640px)]:tw-w-10">
                        {progress}%
                      </span>
                    </div>
                  ) : (
                    <span className="tw-text-xs tw-text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {isTracked ? (
                    <Badge variant={STATUS_BADGE_VARIANT[pri.tone]}>{pri.label}</Badge>
                  ) : (
                    <span className="tw-text-xs tw-text-muted-foreground">—</span>
                  )}
                </TableCell>
                {/* Trailing cell preserves the column slot the group's bulk checkbox
                    occupies in the header row. */}
                <TableCell className="tw-w-10" />
              </TableRow>
            );
          })}
      </TableBody>
    );
  };

  return (
    <SectionFrame
      title={`Progress tracking: ${projectName}`}
      description={`Aggregate ${aggregate}% complete across ${trackedBooks.length} tracked book${trackedBooks.length === 1 ? '' : 's'}. Use the checkboxes to start or stop tracking — only one action can be staged at a time.`}
      footerStart={
        <span>{`${presentBooks.length} book${presentBooks.length === 1 ? '' : 's'} in ${projectShortName}`}</span>
      }
      footer={
        <>
          <Button
            variant="destructive"
            disabled={trackedSelectedCount === 0 || dominantStatus === 'Untracked'}
            onClick={() => {
              if (trackedSelectedCount === 0) return;
              const trackedSelected = Array.from(effectiveSelection).filter((b) => tracked.has(b));
              void onStopTracking(trackedSelected);
            }}
          >
            {`Stop tracking (${trackedSelectedCount})`}
          </Button>
          <Button
            disabled={untrackedSelectedCount === 0 || dominantStatus === 'Tracked'}
            onClick={() => {
              if (untrackedSelectedCount === 0) return;
              const untrackedSelected = Array.from(effectiveSelection).filter(
                (b) => !tracked.has(b),
              );
              void onStartTracking(untrackedSelected);
            }}
          >
            {`Start tracking (${untrackedSelectedCount})`}
          </Button>
        </>
      }
    >
      <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col tw-gap-2">
        <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
          <Label className="tw-shrink-0">Books</Label>
          <FilterBooksInput value={filterText} onChange={setFilterText} />
        </div>
        <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Per-row checkbox column slot. */}
                <TableHead className="tw-w-10" />
                <TableHead className="tw-w-16">Book</TableHead>
                <TableHead className="tw-hidden [@media(min-width:640px)]:tw-table-cell">
                  Name
                </TableHead>
                {/* Progress column collapses to just the % at narrow widths. */}
                <TableHead className="tw-w-20 [@media(min-width:640px)]:tw-w-56">
                  Progress
                </TableHead>
                <TableHead className="tw-w-32">Priority</TableHead>
                {/* Trailing slot for the per-group bulk checkbox. */}
                <TableHead className="tw-w-10" />
              </TableRow>
            </TableHeader>
            {renderGroup('Tracked', trackedBooks)}
            {renderGroup('Untracked', untrackedBooks)}
          </Table>
        </div>
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// Introductions workflow — side-by-side compare of introductory USFM
// (\\imt, \\is, \\ip, …) for each book across projects. Mock content; the
// real implementation would surface actual project introduction markers.
// --------------------------------------------------------------------------

function IntroductionsViewListSection({
  projectId,
  projectName,
  projectShortName,
  present,
}: {
  projectId: string;
  projectName: string;
  projectShortName: string;
  present: Set<string>;
}) {
  const presentBooks = useMemo(() => ALL_BOOKS.filter((b) => present.has(b)), [present]);
  const [book, setBook] = useState<string | undefined>(presentBooks[0]);
  // If the project changes and the current book isn't present in the new project, fall
  // back to the first available book.
  useEffect(() => {
    if (book && !presentBooks.includes(book)) setBook(presentBooks[0]);
  }, [presentBooks, book]);

  // Mock introductory USFM for the currently selected book — a real implementation
  // would read the project's `\imt`, `\is`, `\ip`, etc. markers from the existing book
  // and surface them here for inline editing.
  const mockIntroFor = (b: string | undefined): string => {
    if (!b) return '';
    const englishName = Canon.bookIdToEnglishName(b) || b;
    return [
      `\\id ${b} ${projectShortName}`,
      `\\imt ${englishName}`,
      `\\is Introduction`,
      `\\ip Placeholder introduction to ${englishName} in ${projectShortName}.`,
      `\\io1 Outline:`,
      `\\io2 1. Setting`,
      `\\io2 2. Themes`,
    ].join('\n');
  };

  // Per-book draft state so switching books doesn't lose what the user typed for a
  // previously-viewed book. Drafts default to the mock content when first visited.
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  // Switching projects starts a fresh draft set — drafts are project-scoped.
  useEffect(() => {
    setDrafts({});
  }, [projectId]);

  const draftFor = (b: string | undefined) => (b ? (drafts[b] ?? mockIntroFor(b)) : '');

  return (
    <SectionFrame
      title={`Introductions: ${projectName}`}
      description="Click a book on the left to load its introductory USFM into the editor on the right."
      footerStart={
        <span>{`${presentBooks.length} book${presentBooks.length === 1 ? '' : 's'} in ${projectShortName}`}</span>
      }
      footer={
        <Button variant="outline" size="sm">
          Checklists…
        </Button>
      }
    >
      <div className="tw-grid tw-h-full tw-min-h-0 tw-grid-cols-[auto_1fr] tw-gap-3">
        {/*
          Left: scrollable list of every book in the project, keyed by short name. One
          click selects the book and loads its draft into the editor. Width auto-sizes
          to the longest entry so 1KI / 2KI / 3JN don't get clipped.
        */}
        <div className="tw-flex tw-min-h-0 tw-w-32 tw-flex-col tw-overflow-hidden tw-rounded-md tw-border">
          <div className="tw-shrink-0 tw-border-b tw-bg-muted/40 tw-px-3 tw-py-1.5 tw-text-xs tw-font-semibold">
            Books
          </div>
          <ul className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-py-1">
            {presentBooks.map((b) => {
              const isActive = b === book;
              return (
                <li key={b}>
                  <button
                    type="button"
                    onClick={() => setBook(b)}
                    aria-current={isActive ? 'page' : undefined}
                    title={Canon.bookIdToEnglishName(b) || b}
                    className={cn(
                      'tw-flex tw-w-full tw-items-center tw-px-3 tw-py-1 tw-text-left tw-font-mono tw-text-xs tw-transition-colors',
                      'hover:tw-bg-accent hover:tw-text-accent-foreground',
                      isActive && 'tw-bg-accent tw-font-semibold tw-text-accent-foreground',
                    )}
                  >
                    {b}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Right: USFM editor for the active book. Single pane — no comparison view. */}
        <div className="tw-flex tw-min-h-0 tw-flex-col tw-overflow-hidden tw-rounded-md tw-border">
          <div className="tw-flex tw-shrink-0 tw-items-center tw-justify-between tw-border-b tw-bg-muted/40 tw-px-3 tw-py-1.5 tw-text-xs tw-font-semibold">
            <span>
              {book ? `${book} — ${Canon.bookIdToEnglishName(book) || book}` : 'No book selected'}
            </span>
            <span className="tw-text-muted-foreground">{projectShortName}</span>
          </div>
          <textarea
            value={draftFor(book)}
            onChange={(e) => book && setDrafts((prev) => ({ ...prev, [book]: e.target.value }))}
            spellCheck={false}
            disabled={!book}
            className="tw-min-h-0 tw-flex-1 tw-resize-none tw-bg-background tw-p-3 tw-font-mono tw-text-xs tw-leading-relaxed tw-outline-none focus:tw-ring-1 focus:tw-ring-ring"
            aria-label="Introductory USFM"
          />
        </div>
      </div>
    </SectionFrame>
  );
}

// --------------------------------------------------------------------------
// View-list select: shared async helpers
// --------------------------------------------------------------------------

type OverwriteMode = 'overwrite' | 'nonExisting';

// Stand-in for the real "save to disk" / "talk to the backend" call. Resolves on success
// or rejects to drive the rollback path. The parent flips `simulateError` to demo the
// failure flow; without it every action resolves cleanly so screenshots stay stable.
function pretendBackendCall(simulateError: boolean, label: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) reject(new Error(`Backend rejected: ${label}`));
      else resolve();
    }, 600);
  });
}

/**
 * Confirmation dialog surfaced when the user kicks off Copy or Import while one or more selected
 * books already exist in the destination project (Newer / Older / Same in the comparison). Lets the
 * user pick whether to keep existing chapters intact (Overwrite non-existing chapters) or to fully
 * replace each conflicting book (Copy & overwrite / Import & overwrite). Mirrors the future-outlook
 * variant's conflict modal — a small, centered Dialog rather than an inline popover so the styling
 * stays consistent across the manage-books surface.
 */
function ConfirmOverwriteDialog({
  open,
  onOpenChange,
  conflictBooks,
  destProjectName,
  variant,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  conflictBooks: string[];
  destProjectName: string;
  variant: 'copy' | 'import';
  onConfirm: (mode: OverwriteMode) => void;
}) {
  const overwriteLabel = variant === 'copy' ? 'Copy & overwrite' : 'Import & overwrite';
  const verb = variant === 'copy' ? 'copy' : 'import';
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw-max-w-md">
        <div className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-1">
            <h2 className="tw-text-base tw-font-semibold">Books already exist</h2>
            <p className="tw-text-sm tw-text-muted-foreground">
              {`${conflictBooks.length} book${conflictBooks.length === 1 ? '' : 's'} already exist${conflictBooks.length === 1 ? 's' : ''} in ${destProjectName}: ${conflictBooks.join(', ')}`}
            </p>
            <p className="tw-text-sm tw-text-muted-foreground">
              {`Choose how to proceed with the ${verb} or close to cancel.`}
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
            <Button variant="outline" onClick={() => onConfirm('nonExisting')}>
              Overwrite non-existing chapters
            </Button>
            <Button onClick={() => onConfirm('overwrite')}>{overwriteLabel}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ViewListSectionHandlers = {
  onCreate: (
    books: string[],
    options: {
      method: 'empty' | 'chapterVerse' | 'fromTemplate';
      templateProjectId?: string;
    },
  ) => Promise<void>;
  onDelete: (books: string[]) => Promise<void>;
  onCopy: (books: string[], sourceProjectId: string, mode: OverwriteMode) => Promise<void>;
  onImport: (books: string[], mode: OverwriteMode) => Promise<void>;
  onStartTracking: (books: string[]) => Promise<void>;
  onStopTracking: (books: string[]) => Promise<void>;
};

function ManageBooksDialogViewListSelect() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState<SectionId>('show');
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const project = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const projectName = project.name;
  const projectShortName = project.shortName;
  const [importState, setImportState] = useState<ImportState>({
    files: [],
    selected: new Set(),
    replace: new Set(),
  });
  const [copyState, setCopyState] = useState<CopyState>({
    fromProjectId: undefined,
    selected: new Set(),
    loading: false,
    loadedFor: undefined,
  });
  // Lifted selections so Create / Delete / Track progress remember their picks when the
  // user tabs away and back within the same dialog session.
  const [createSelected, setCreateSelected] = useState<Set<string>>(() => new Set());
  const [deleteSelected, setDeleteSelected] = useState<Set<string>>(() => new Set());
  // Selection for the Progress Tracking workflow — start/stop tracking acts on this set.
  const [progressSelected, setProgressSelected] = useState<Set<string>>(() => new Set());
  // Shared groupBy so the user's Canon/Status choice carries across workflows.
  const [groupBy, setGroupBy] = useState<BookGridGroupBy>('canon');
  // Lifted, mutable mirror of the per-project book inventory. All view-list sections read
  // from this map (rather than the static module mocks) so that an optimistic update
  // applied here is reflected in every other section the moment the user dispatches an
  // action — Show, Copy comparisons, Delete, Import, etc.
  const [projectsData, setProjectsData] = useState<Record<string, ProjectBookState>>(() =>
    createInitialProjectBooks(),
  );
  const [trackedByProject, setTrackedByProject] = useState<Record<string, Set<string>>>(() => {
    const initial: Record<string, Set<string>> = {};
    Object.entries(PROJECT_TRACKED_BOOKS).forEach(([pid, set]) => {
      initial[pid] = new Set(set);
    });
    return initial;
  });
  // Test affordance: when on, every async handler rejects so the user can verify the
  // optimistic-update + rollback + error-toast flow without needing a real backend.
  const [simulateError, setSimulateError] = useState<boolean>(false);
  const present = projectsData[projectId]?.present ?? new Set<string>();
  const projectDates = projectsData[projectId]?.dates ?? {};
  const tracked = trackedByProject[projectId] ?? new Set<string>();
  const scopeId = PROJECT_SCOPE_IDS[projectId];

  // Apply an optimistic mutation to a single project, run the backend call, and roll back
  // on failure. Returns the resolved promise so callers can chain (e.g. clearing UI state
  // only after success). The label is surfaced in the rollback toast.
  const runOptimistic = async (
    label: string,
    apply: () => void,
    revert: () => void,
  ): Promise<void> => {
    apply();
    try {
      await pretendBackendCall(simulateError, label);
    } catch (err) {
      revert();
      sonner.error(`Could not ${label.toLowerCase()}`, {
        description: err instanceof Error ? err.message : String(err),
        position: 'bottom-center',
        duration: 6000,
        dismissible: true,
        closeButton: true,
      });
      throw err;
    }
  };

  const updateProjectData = (pid: string, mutate: (prev: ProjectBookState) => ProjectBookState) =>
    setProjectsData((prev) => ({
      ...prev,
      [pid]: mutate(prev[pid] ?? { present: new Set<string>(), dates: {} }),
    }));

  const restoreProjectData = (pid: string, snapshot: ProjectBookState | undefined) =>
    setProjectsData((prev) => {
      if (!snapshot) {
        const next = { ...prev };
        delete next[pid];
        return next;
      }
      return { ...prev, [pid]: snapshot };
    });

  const handleCreate: ViewListSectionHandlers['onCreate'] = async (books, options) => {
    if (books.length === 0) return;
    const targetId = projectId;
    const snapshot = projectsData[targetId];
    const sourceData =
      options.method === 'fromTemplate' && options.templateProjectId
        ? projectsData[options.templateProjectId]
        : undefined;
    const today = todayISO();
    const previousSelection = createSelected;
    setCreateSelected(new Set());
    try {
      await runOptimistic(
        `Create ${books.length} book${books.length === 1 ? '' : 's'}`,
        () =>
          updateProjectData(targetId, (prev) => {
            const nextPresent = new Set(prev.present);
            const nextDates = { ...prev.dates };
            books.forEach((b) => {
              nextPresent.add(b);
              // Books created from a template inherit the template's lastModified date so
              // Copy / Show comparisons stay coherent; otherwise we stamp today.
              nextDates[b] = sourceData?.dates[b] ?? today;
            });
            return { present: nextPresent, dates: nextDates };
          }),
        () => {
          restoreProjectData(targetId, snapshot);
          setCreateSelected(previousSelection);
        },
      );
    } catch {
      // Already surfaced by runOptimistic; swallow so the await chain doesn't bubble up
      // an unhandled rejection in callers that ignore the return value.
    }
  };

  const handleDelete: ViewListSectionHandlers['onDelete'] = async (books) => {
    if (books.length === 0) return;
    const targetId = projectId;
    const snapshot = projectsData[targetId];
    const trackedSnapshot = trackedByProject[targetId];
    const previousSelection = deleteSelected;
    setDeleteSelected(new Set());
    try {
      await runOptimistic(
        `Delete ${books.length} book${books.length === 1 ? '' : 's'}`,
        () => {
          updateProjectData(targetId, (prev) => {
            const nextPresent = new Set(prev.present);
            const nextDates = { ...prev.dates };
            books.forEach((b) => {
              nextPresent.delete(b);
              delete nextDates[b];
            });
            return { present: nextPresent, dates: nextDates };
          });
          // Deleted books are silently dropped from the tracked set — a tracked book that
          // no longer exists is meaningless and would otherwise leak into the Progress
          // workflow once the deletion lands on the backend.
          setTrackedByProject((prev) => {
            const current = prev[targetId];
            if (!current) return prev;
            const next = new Set(current);
            books.forEach((b) => next.delete(b));
            return { ...prev, [targetId]: next };
          });
        },
        () => {
          restoreProjectData(targetId, snapshot);
          setTrackedByProject((prev) => ({
            ...prev,
            [targetId]: trackedSnapshot ?? new Set<string>(),
          }));
          setDeleteSelected(previousSelection);
        },
      );
    } catch {
      // Surfaced by runOptimistic.
    }
  };

  const handleCopy: ViewListSectionHandlers['onCopy'] = async (books, sourceProjectId, mode) => {
    if (books.length === 0) return;
    const targetId = projectId;
    const snapshot = projectsData[targetId];
    const sourceData = projectsData[sourceProjectId];
    if (!sourceData) return;
    const previousCopyState = copyState;
    setCopyState((prev) => ({ ...prev, selected: new Set() }));
    const label = `Copy ${books.length} book${books.length === 1 ? '' : 's'}`;
    try {
      await runOptimistic(
        label,
        () =>
          updateProjectData(targetId, (prev) => {
            const nextPresent = new Set(prev.present);
            const nextDates = { ...prev.dates };
            books.forEach((b) => {
              if (!sourceData.present.has(b)) return;
              const alreadyHas = prev.present.has(b);
              // 'nonExisting' keeps existing books in the destination untouched — only
              // brand-new entries are written. 'overwrite' rewrites every selected book,
              // existing or not, with the source's date.
              if (mode === 'nonExisting' && alreadyHas) return;
              nextPresent.add(b);
              nextDates[b] = sourceData.dates[b] ?? todayISO();
            });
            return { present: nextPresent, dates: nextDates };
          }),
        () => {
          restoreProjectData(targetId, snapshot);
          setCopyState(previousCopyState);
        },
      );
    } catch {
      // Surfaced by runOptimistic.
    }
  };

  const handleImport: ViewListSectionHandlers['onImport'] = async (books, mode) => {
    if (books.length === 0) return;
    const targetId = projectId;
    const snapshot = projectsData[targetId];
    const importSnapshot = importState;
    // Build a per-book file lookup so the optimistic update can copy each file's date
    // straight onto the destination project. Files are keyed by name in importState; we
    // pick the first file matching each book.
    const fileForBook = new Map<string, ImportRow>();
    importState.files.forEach((row) => {
      if (!fileForBook.has(row.book)) fileForBook.set(row.book, row);
    });
    // Drop the imported files (and their selections) from the import list eagerly so the
    // user can immediately see what landed on the project; rollback restores them.
    const importedBookSet = new Set(books);
    setImportState((prev) => {
      const remainingFiles = prev.files.filter((f) => !importedBookSet.has(f.book));
      const remainingSelected = new Set(
        Array.from(prev.selected).filter((file) => {
          const row = prev.files.find((f) => f.file === file);
          return row ? !importedBookSet.has(row.book) : false;
        }),
      );
      const remainingReplace = new Set(
        Array.from(prev.replace).filter((b) => !importedBookSet.has(b)),
      );
      return { files: remainingFiles, selected: remainingSelected, replace: remainingReplace };
    });
    const label = `Import ${books.length} book${books.length === 1 ? '' : 's'}`;
    try {
      await runOptimistic(
        label,
        () =>
          updateProjectData(targetId, (prev) => {
            const nextPresent = new Set(prev.present);
            const nextDates = { ...prev.dates };
            books.forEach((b) => {
              const file = fileForBook.get(b);
              const alreadyHas = prev.present.has(b);
              if (mode === 'nonExisting' && alreadyHas) return;
              nextPresent.add(b);
              nextDates[b] = file?.fromDate ?? todayISO();
            });
            return { present: nextPresent, dates: nextDates };
          }),
        () => {
          restoreProjectData(targetId, snapshot);
          setImportState(importSnapshot);
        },
      );
    } catch {
      // Surfaced by runOptimistic.
    }
  };

  const handleStartTracking: ViewListSectionHandlers['onStartTracking'] = async (books) => {
    if (books.length === 0) return;
    const targetId = projectId;
    const trackedSnapshot = trackedByProject[targetId];
    const previousSelection = progressSelected;
    setProgressSelected(new Set());
    try {
      await runOptimistic(
        `Start tracking ${books.length} book${books.length === 1 ? '' : 's'}`,
        () =>
          setTrackedByProject((prev) => {
            const current = prev[targetId] ?? new Set<string>();
            const next = new Set(current);
            books.forEach((b) => next.add(b));
            return { ...prev, [targetId]: next };
          }),
        () => {
          setTrackedByProject((prev) => ({
            ...prev,
            [targetId]: trackedSnapshot ?? new Set<string>(),
          }));
          setProgressSelected(previousSelection);
        },
      );
    } catch {
      // Surfaced by runOptimistic.
    }
  };

  const handleStopTracking: ViewListSectionHandlers['onStopTracking'] = async (books) => {
    if (books.length === 0) return;
    const targetId = projectId;
    const trackedSnapshot = trackedByProject[targetId];
    const previousSelection = progressSelected;
    setProgressSelected(new Set());
    try {
      await runOptimistic(
        `Stop tracking ${books.length} book${books.length === 1 ? '' : 's'}`,
        () =>
          setTrackedByProject((prev) => {
            const current = prev[targetId] ?? new Set<string>();
            const next = new Set(current);
            books.forEach((b) => next.delete(b));
            return { ...prev, [targetId]: next };
          }),
        () => {
          setTrackedByProject((prev) => ({
            ...prev,
            [targetId]: trackedSnapshot ?? new Set<string>(),
          }));
          setProgressSelected(previousSelection);
        },
      );
    } catch {
      // Surfaced by runOptimistic.
    }
  };

  const renderSection = () => {
    switch (active) {
      case 'show':
        return (
          <ShowBooksViewListSection
            projectName={projectName}
            projectShortName={projectShortName}
            present={present}
            projectDates={projectDates}
            tracked={tracked}
            scopeId={scopeId}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            onClose={() => setOpen(false)}
          />
        );
      case 'create':
        return (
          <CreateBooksViewListSection
            projectId={projectId}
            projectName={projectName}
            projectShortName={projectShortName}
            scopeId={scopeId}
            present={present}
            projectsData={projectsData}
            selected={createSelected}
            setSelected={setCreateSelected}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            onCreate={handleCreate}
          />
        );
      case 'delete':
        return (
          <DeleteBooksViewListSection
            projectName={projectName}
            projectShortName={projectShortName}
            present={present}
            projectDates={projectDates}
            selected={deleteSelected}
            setSelected={setDeleteSelected}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            onDelete={handleDelete}
          />
        );
      case 'copy':
        return (
          <CopyBooksViewListSection
            projectId={projectId}
            projectName={projectName}
            scopeId={scopeId}
            projectsData={projectsData}
            state={copyState}
            setState={setCopyState}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            onCopy={handleCopy}
          />
        );
      case 'import':
        return (
          <ImportBooksViewListSection
            projectShortName={projectShortName}
            projectName={projectName}
            scopeId={scopeId}
            present={present}
            state={importState}
            setState={setImportState}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            onImport={handleImport}
          />
        );
      case 'show-progress':
        return (
          <ShowProgressViewListSection
            projectName={projectName}
            projectShortName={projectShortName}
            present={present}
            tracked={tracked}
            selected={progressSelected}
            setSelected={setProgressSelected}
            onStartTracking={handleStartTracking}
            onStopTracking={handleStopTracking}
          />
        );
      case 'book-names':
        return <BookNamesViewListSection projectId={projectId} projectName={projectName} />;
      case 'introductions':
        return (
          <IntroductionsViewListSection
            projectId={projectId}
            projectName={projectName}
            projectShortName={projectShortName}
            present={present}
          />
        );
      default:
        return undefined;
    }
  };

  return (
    <>
      <style>{`
        [data-radix-popper-content-wrapper],
        [data-radix-select-content],
        [data-radix-popover-content],
        [data-radix-menu-content] {
          z-index: 600 !important;
          pointer-events: auto !important;
        }
      `}</style>
      <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
        <Button onClick={() => setOpen(true)}>Open Manage Books (view-list select)</Button>
        {/*
          Backend-error toggle. Lets reviewers exercise the optimistic-update + rollback
          path without wiring a real backend. When on, every action's pretend backend call
          rejects, the optimistic UI snaps back to the prior state, and a sonner error
          surfaces with a description.
        */}
        <label className="tw-flex tw-items-center tw-gap-2 tw-text-xs tw-text-muted-foreground">
          <Checkbox checked={simulateError} onCheckedChange={(v) => setSimulateError(v === true)} />
          Simulate backend errors (rollback + sonner)
        </label>
      </div>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="tw-h-[80vh] tw-w-[95vw] tw-max-w-5xl tw-gap-0 tw-overflow-hidden tw-p-0"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => {
            const wrapper = document.querySelector(
              '[data-radix-popper-content-wrapper][data-state="open"]',
            );
            if (wrapper) e.preventDefault();
          }}
        >
          <TooltipProvider delayDuration={200}>
            <div className="tw-flex tw-h-full tw-min-h-0">
              <Sidebar
                active={active}
                onSelect={setActive}
                projectId={projectId}
                projectShortName={projectShortName}
                onProjectChange={setProjectId}
                collapsible
                sections={VIEW_LIST_SECTIONS}
                scopeId={scopeId}
                onOpenScopeRegistry={() => {
                  // Prototype only — a real app would open the registry.
                }}
                onOpenScopeRegistration={() => {
                  // Prototype only — a real app would open the registration flow.
                }}
              />
              <div className="tw-min-w-0 tw-flex-1">{renderSection()}</div>
            </div>
          </TooltipProvider>
        </DialogContent>
      </Dialog>
      {/*
        Toaster lives outside the dialog so it isn't trapped inside the dialog's stacking
        context — without that, the import warning ends up rendered behind the dialog
        backdrop and never reaches the user. position="top-center" matches the spec. The
        z-index is bumped above the dialog's own popper override (600) so the toast wins.
      */}
      <Sonner position="top-center" style={{ zIndex: 9999 }} />
    </>
  );
}

// --------------------------------------------------------------------------
// Storybook meta
// --------------------------------------------------------------------------

const meta: Meta<typeof ManageBooksDialog> = {
  title: 'Drafts/Manage Books Dialog',
  component: ManageBooksDialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Draft UI consolidating the manage-books sub-screens (Show, Create, Delete, Copy, Import) from `ui-alignment.md` onto a single dialog with a left sidebar. Book selection reuses the shared `BookSelector` component.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ManageBooksDialog>;

export const Default: Story = {};

export const ViewListSelect: Story = {
  name: 'View-list select (grid pills instead of BookSelector)',
  parameters: {
    docs: {
      description: {
        story:
          'Same sidebar-driven dialog as Default, but the Create and Delete sections replace the `BookSelector` combobox with a clickable version of the grid-of-pills list used by the Show (view) section. Each pill shows the present/absent dot; pills are disabled when they do not make sense for the current action (present books in Create, absent books in Delete), and clicking a pill toggles the book into the selection.',
      },
    },
  },
  render: () => <ManageBooksDialogViewListSelect />,
};

export const Unified: Story = {
  name: 'Unified (single table, direct-apply)',
  parameters: {
    docs: {
      description: {
        story:
          'One table listing every canonical book in project order. Per-row dropdown actions (add, delete, copy from another project, import/replace from file) apply immediately. Rows never reorder, so the layout does not reflow as books are added or removed. The only footer control is Close.',
      },
    },
  },
  render: () => <UnifiedManageBooksDialog />,
};

export const ActionFirst: Story = {
  name: 'Action-first (pick action, then books)',
  parameters: {
    docs: {
      description: {
        story:
          'Inverse of Selection-first. The user picks an action (Create / Import / Copy / Delete) first, then the list is narrowed to only the books that make sense for that action: absent books for Create, present books for Delete, source-only books for Copy (which also requires choosing a source project), and every canonical book for Import. Action-specific prerequisites — creation method, source project — appear inline next to the action picker. A single Apply button in the footer commits the work; Copy and Import route through the comparison sub-dialogs so modification dates can be reviewed.',
      },
    },
  },
  render: () => <ActionFirstManageBooksDialog />,
};

export const SelectionFirst: Story = {
  name: 'Selection-first (floating action bar)',
  parameters: {
    docs: {
      description: {
        story:
          'A row list where the same primitives handle single and multi-select: hover a row to use per-book shortcut buttons, or check any number of rows to expose the same actions on a floating action bar. Create, Copy from another project, Import from files, and Delete all operate uniformly on the current selection. A filter, a view toggle (All / In project / Missing), and a project switcher sit in the header. Copy and Import still open the comparison sub-dialogs so modification dates can be reviewed before submitting.',
      },
    },
  },
  render: () => <SelectionManageBooksDialog />,
};

export const GroupedSelectionFirst: Story = {
  name: 'Grouped Selection-first (list/grid toggle)',
  parameters: {
    docs: {
      description: {
        story:
          'Variant of Selection-first that swaps the All / In project / Missing filter for the view-list-select group-by toggle (None / Canon / Status) and replaces the bulk "Select all visible" affordance with collapsible per-group section headers (each carrying its own select-all checkbox). A view-mode toggle switches between the row list and the view-list-select pill grid. A Show / Copy from / Import-from-files toggle button group above the list selects the active workflow: rows then expose the corresponding comparison columns inline (Show: project date; Copy: source date / dest date / state badge; Import: per-row file pick / dest date / state badge) and the footer alternates between Create + Delete (Show), Copy (Copy), and Import (Import). Picking "Copy from" opens a project dropdown via the chevron; picking "Import from files" opens a native multi-select file dialog and matches files to book ids by name. No comparison sub-dialog — every comparison happens directly in the table.',
      },
    },
  },
  render: () => <GroupedSelectionFirstManageBooksDialog />,
};

export const FutureOutlook: Story = {
  name: 'Future outlook (scope-aware View)',
  parameters: {
    docs: {
      description: {
        story:
          'Action-first dialog with the project scope wired in: the View toggle is renamed "Scope", books are grouped by OT / NT / DC / Extra, rows are badged as Missing or Unplanned relative to the scope, the per-row delete icon becomes a "remove from scope" action, and an "Add books to scope" button in the footer opens a book picker restricted to books not yet in scope.',
      },
    },
  },
  render: () => <FutureOutlookManageBooksDialog />,
};
