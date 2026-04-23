import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpenCheck,
  BookPlus,
  Copy,
  Download,
  ExternalLink,
  FolderOpen,
  Info,
  Loader2,
  Trash2,
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
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon } from '@sillsdev/scripture';

// --------------------------------------------------------------------------
// Draft/prototype only: consolidates the manage-books sub-screens from
// ui-alignment.md onto a single dialog with a left sidebar for navigation.
// Book selection reuses the shared BookSelector component. Mock data;
// no backend wiring.
// --------------------------------------------------------------------------

type SectionId = 'show' | 'create' | 'delete' | 'copy' | 'import';

type SectionDef = {
  id: SectionId;
  title: string;
  subtitle: string;
  Icon: typeof BookOpenCheck;
};

const SECTIONS: SectionDef[] = [
  { id: 'show', title: 'Show Books', subtitle: 'View books in this project', Icon: BookOpenCheck },
  { id: 'create', title: 'Create Books', subtitle: 'Add new books', Icon: BookPlus },
  { id: 'delete', title: 'Delete Books', subtitle: 'Remove books', Icon: Trash2 },
  { id: 'copy', title: 'Copy Books', subtitle: 'Copy between projects', Icon: Copy },
  { id: 'import', title: 'Import Books', subtitle: 'Import from files', Icon: Download },
];

const OT_BOOKS = [
  'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA',
  '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO',
];
const NT_BOOKS = [
  'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
];
const DC_BOOKS = ['TOB', 'JDT', 'WIS', 'SIR', 'BAR'];

const MOCK_PROJECTS = [
  { id: 'WEB', shortName: 'WEB', name: 'World English Bible' },
  { id: 'KJV', shortName: 'KJV', name: 'King James Version' },
  { id: 'NIV', shortName: 'NIV', name: 'New International Version' },
  { id: 'NLT', shortName: 'NLT', name: 'New Living Translation' },
];

// Which books are present in each project (mock). Used to derive availableBookInfo
// for the BookSelector in Create/Delete flows.
const PROJECT_PRESENT_BOOKS: Record<string, Set<string>> = {
  WEB: new Set(['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM']),
  KJV: new Set(['GEN', 'EXO', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK', 'JHN', 'ROM', '1CO']),
  NIV: new Set(['GEN', 'EXO', 'LEV', 'NUM', 'MAT', 'MRK']),
  NLT: new Set(['MAT', 'MRK', 'LUK', 'JHN']),
};

/**
 * Builds a 123-char availableBookInfo string for BookSelector. When `mode` is 'absent',
 * only books that are NOT yet in the project are available (used for Create). When 'present',
 * only books that ARE in the project are available (used for Delete).
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
const MOCK_COMPARISON: { book: string; fromDate?: string; toDate?: string; state: ComparisonState }[] = [
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
  { file: '01_GEN.sfm', book: 'GEN', fromDate: '2024-01-15', toDate: '2024-01-10', state: 'Newer' as const },
  { file: '02_EXO.sfm', book: 'EXO', fromDate: '2024-01-15', state: 'New' as const },
  { file: '40_MAT.usx', book: 'MAT', fromDate: '2024-02-01', toDate: '2024-03-15', state: 'Older' as const },
];

// --------------------------------------------------------------------------
// Sidebar
// --------------------------------------------------------------------------

function Sidebar({
  active,
  onSelect,
  projectId,
  onProjectChange,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  projectId: string;
  onProjectChange: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Manage Books sections"
      // Capped at 1/3 of the dialog width so the content area is always >= 2/3
      className="tw-flex tw-w-1/3 tw-max-w-56 tw-shrink-0 tw-flex-col tw-gap-1 tw-border-r tw-bg-muted/40 tw-p-3"
    >
      <div className="tw-px-2 tw-pb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground">
        Manage Books
      </div>
      <div className="tw-flex tw-flex-col tw-gap-1 tw-px-2 tw-pb-3">
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
      </div>
      {SECTIONS.map(({ id, title, subtitle, Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'tw-flex tw-items-start tw-gap-3 tw-rounded-md tw-px-3 tw-py-2 tw-text-start tw-text-sm tw-transition-colors',
              'hover:tw-bg-accent hover:tw-text-accent-foreground',
              'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring',
              isActive && 'tw-bg-accent tw-text-accent-foreground tw-font-medium',
            )}
          >
            <Icon className="tw-mt-0.5 tw-h-4 tw-w-4 tw-shrink-0" aria-hidden />
            <span className="tw-flex tw-flex-col">
              <span>{title}</span>
              <span className="tw-text-xs tw-font-normal tw-text-muted-foreground">{subtitle}</span>
            </span>
          </button>
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
  children,
}: {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="tw-flex tw-h-full tw-min-h-0 tw-flex-col">
      <header className="tw-border-b tw-px-6 tw-py-4">
        <h2 className="tw-text-lg tw-font-semibold">{title}</h2>
        {description && (
          <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">{description}</p>
        )}
      </header>
      <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-6 tw-py-4">{children}</div>
      {footer && (
        <footer className="tw-flex tw-justify-end tw-gap-2 tw-border-t tw-px-6 tw-py-3">
          {footer}
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
                isPresent ? 'tw-border-primary/40 tw-bg-primary/5' : 'tw-border-border tw-text-muted-foreground',
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
  const availableBookInfo = useMemo(
    () => buildAvailableBookInfo(projectId, 'absent'),
    [projectId],
  );
  // Drop any selection that is no longer valid when the project changes
  const effectiveSelection = selectedBookIds.filter(
    (id) => !(PROJECT_PRESENT_BOOKS[projectId]?.has(id)),
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
                '[&_button[role=combobox]]:tw-border-primary [&_button[role=combobox]]:tw-bg-primary [&_button[role=combobox]]:tw-text-primary-foreground [&_button[role=combobox]:hover]:tw-bg-primary/90',
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
              '[&_button[role=combobox]]:tw-border-primary [&_button[role=combobox]]:tw-bg-primary [&_button[role=combobox]]:tw-text-primary-foreground [&_button[role=combobox]:hover]:tw-bg-primary/90',
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

function comparisonVariant(state: ComparisonState): 'default' | 'secondary' | 'destructive' | 'outline' {
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
  const toProject =
    MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const { fromProjectId, selected, loading } = state;
  const fromProject = fromProjectId
    ? MOCK_PROJECTS.find((p) => p.id === fromProjectId)
    : undefined;

  const setFromProjectId = (next: string) =>
    setState((prev) => ({ ...prev, fromProjectId: next }));
  const setSelected = (updater: Set<string> | ((prev: Set<string>) => Set<string>)) =>
    setState((prev) => ({
      ...prev,
      selected: typeof updater === 'function' ? updater(prev.selected) : updater,
    }));

  const copyableRows = useMemo(
    () => MOCK_COMPARISON.filter((r) => r.state !== 'Missing'),
    [],
  );

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
                  'tw-border-primary tw-bg-primary tw-text-primary-foreground [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground hover:tw-bg-primary/90',
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
  state: ComparisonState;
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

  const setFiles = (updater: (prev: ImportRow[]) => ImportRow[]) =>
    setState((prev) => ({ ...prev, files: updater(prev.files) }));
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

  const clearList = () =>
    setState({ files: [], selected: new Set(), replace: new Set() });

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
                    <TableCell className="tw-align-middle tw-text-center">
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
                            <Badge variant={comparisonVariant(row.state)}>{row.state}</Badge>
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
                          <span className="tw-text-xs tw-text-muted-foreground">
                            {row.toDate}
                          </span>
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
  const sourceProject =
    MOCK_PROJECTS.find((p) => p.id === sourceProjectId) ?? destProject;
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
  onClose,
  onApply,
}: {
  books: string[];
  destProjectId: string;
  projectsData: Record<string, ProjectBookState>;
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
    books.forEach((b) => {
      init[b] = { overwrite: false };
    });
    setPicks(init);
    activeBookRef.current = undefined;
  }, [open, books]);

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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => pickFileFor(r.book)}
                          >
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
                        {r.state && (
                          <Badge variant={comparisonVariant(r.state)}>{r.state}</Badge>
                        )}
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

  const headerCheckboxState = (universe: string[], chosen: Set<string>): boolean | 'indeterminate' => {
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
                  Pick a destination project and a Copy-from project. Create, Copy, and Import
                  open a comparison sub-dialog; Delete applies immediately.
                </p>
              </header>

              <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-4 tw-gap-y-2 tw-border-b tw-px-6 tw-py-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Label
                    htmlFor="unified-project"
                    className="tw-text-xs tw-text-muted-foreground"
                  >
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
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
                  >
                    <BookPlus className="tw-mr-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Create
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="import"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
                  >
                    <Download className="tw-mr-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Import
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="copy"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-foreground data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
                  >
                    <Copy className="tw-mr-1 tw-h-3.5 tw-w-3.5" aria-hidden />
                    Copy from
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="delete"
                    className="tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:!tw-text-destructive data-[state=on]:tw-shadow-sm data-[state=off]:tw-text-muted-foreground"
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
                    onValueChange={(v) =>
                      setSourceProjectId(v === '__none__' ? undefined : v)
                    }
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
                                toggleAll(
                                  visiblePresentBooks,
                                  deleteSelected,
                                  setDeleteSelected,
                                )
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
                                toggleAll(
                                  visibleAbsentBooks,
                                  createSelected,
                                  setCreateSelected,
                                )
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
                                        <BookPlus
                                          className="tw-h-3.5 tw-w-3.5"
                                          aria-hidden
                                        />
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
                                  {(
                                    Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]
                                  ).map((m) => (
                                    <DropdownMenuItem
                                      key={m}
                                      onClick={() =>
                                        handleApplyCreate(Array.from(createSelected), m)
                                      }
                                    >
                                      {CREATE_METHOD_LABELS[m]}
                                    </DropdownMenuItem>
                                  ))}
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
                                    onClick={() =>
                                      setImportTargets(Array.from(importSelected))
                                    }
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
                                          <BookPlus
                                            className="tw-h-3.5 tw-w-3.5"
                                            aria-hidden
                                          />
                                        </Button>
                                      </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>{`Create ${book}`}</TooltipContent>
                                  </Tooltip>
                                  <DropdownMenuPortal>
                                    <DropdownMenuContent align="end">
                                      {(
                                        Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]
                                      ).map((m) => (
                                        <DropdownMenuItem
                                          key={m}
                                          onClick={() => handleApplyCreate([book], m)}
                                        >
                                          {CREATE_METHOD_LABELS[m]}
                                        </DropdownMenuItem>
                                      ))}
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
                                  <TooltipContent>
                                    {`Copy from ${sourceShortName}…`}
                                  </TooltipContent>
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
                  className="tw-h-7 tw-w-7 tw-text-muted-foreground group-hover:tw-text-primary group-focus-within:tw-text-primary"
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
                className="tw-h-7 tw-w-7 tw-text-muted-foreground group-hover:tw-text-primary group-focus-within:tw-text-primary"
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
            className="tw-h-7 tw-w-7 tw-text-muted-foreground group-hover:tw-text-primary group-focus-within:tw-text-primary"
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
              className="tw-h-7 tw-w-7 tw-text-muted-foreground group-hover:tw-text-destructive group-focus-within:tw-text-destructive"
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
                <BookOpenCheck
                  className="tw-h-5 tw-w-5 tw-text-muted-foreground"
                  aria-hidden
                />
                <div className="tw-flex tw-flex-col">
                  <h2 className="tw-text-lg tw-font-semibold">Manage Books</h2>
                  <p className="tw-text-xs tw-text-muted-foreground">
                    {`${totalPresent} of ${allBooks.length} canonical books in ${project.shortName}`}
                  </p>
                </div>
                <div className="tw-ml-auto tw-flex tw-items-center tw-gap-2">
                  <Label
                    htmlFor="sel-project"
                    className="tw-text-xs tw-text-muted-foreground"
                  >
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
                  <Label
                    htmlFor="sel-all"
                    className="tw-text-xs tw-text-muted-foreground"
                  >
                    {selected.size > 0
                      ? `${selected.size} selected`
                      : 'Select all visible'}
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
                              isPresent
                                ? 'tw-bg-primary'
                                : 'tw-bg-muted-foreground/30',
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
                    <span className="tw-text-sm tw-font-medium">
                      {`${selected.size} selected`}
                    </span>
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
                                  <BookPlus
                                    className="tw-mr-1.5 tw-h-3.5 tw-w-3.5"
                                    aria-hidden
                                  />
                                  {selectedAbsent.length > 0 &&
                                  selectedAbsent.length !== selected.size
                                    ? `Create ${selectedAbsent.length}`
                                    : 'Create'}
                                </Button>
                              </DropdownMenuTrigger>
                            </span>
                          </TooltipTrigger>
                          {selectedAbsent.length === 0 ? (
                            <TooltipContent>
                              No missing books in selection
                            </TooltipContent>
                          ) : selectedPresent.length > 0 ? (
                            <TooltipContent>
                              {`Creates the ${selectedAbsent.length} missing book${selectedAbsent.length === 1 ? '' : 's'}; skips ${selectedPresent.length} already present`}
                            </TooltipContent>
                          ) : undefined}
                        </Tooltip>
                        <DropdownMenuPortal>
                          <DropdownMenuContent align="end">
                            {(Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]).map(
                              (m) => (
                                <DropdownMenuItem
                                  key={m}
                                  onClick={() => createBooks(selectedAbsent, m)}
                                >
                                  {CREATE_METHOD_LABELS[m]}
                                </DropdownMenuItem>
                              ),
                            )}
                          </DropdownMenuContent>
                        </DropdownMenuPortal>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Copy
                              className="tw-mr-1.5 tw-h-3.5 tw-w-3.5"
                              aria-hidden
                            />
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

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => beginImport(selectedArr)}
                      >
                        <Download
                          className="tw-mr-1.5 tw-h-3.5 tw-w-3.5"
                          aria-hidden
                        />
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
                              <Trash2
                                className="tw-mr-1.5 tw-h-3.5 tw-w-3.5"
                                aria-hidden
                              />
                              {selectedPresent.length > 0 &&
                              selectedPresent.length !== selected.size
                                ? `Delete ${selectedPresent.length}`
                                : 'Delete'}
                            </Button>
                          </span>
                        </TooltipTrigger>
                        {selectedPresent.length === 0 ? (
                          <TooltipContent>
                            No books in the project are selected
                          </TooltipContent>
                        ) : selectedAbsent.length > 0 ? (
                          <TooltipContent>
                            {`Deletes the ${selectedPresent.length} present book${selectedPresent.length === 1 ? '' : 's'}; skips ${selectedAbsent.length} not in project`}
                          </TooltipContent>
                        ) : undefined}
                      </Tooltip>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelected(new Set())}
                      >
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
// ACTION-FIRST: inverse of SELECTION-FIRST. The user picks an action first,
// then the list narrows to only the books valid for that action. Context-
// specific prerequisites (source project for Copy, method for Create) appear
// inline alongside the action picker. Reuses CopySubDialog and ImportSubDialog.
// --------------------------------------------------------------------------

type ActionFirstAction = 'view' | 'create' | 'import' | 'copy' | 'delete';

function ActionFirstManageBooksDialog() {
  const [open, setOpen] = useState(true);
  const [projectId, setProjectId] = useState<string>(MOCK_PROJECTS[0].id);
  const [projectsData, setProjectsData] = useState<Record<string, ProjectBookState>>(() =>
    createInitialProjectBooks(),
  );
  const [action, setAction] = useState<ActionFirstAction>('view');
  // One selection set per action. A filter (copy state / import presence) only
  // affects what is visible and counted; the underlying selection persists, so
  // a subset filter naturally "reduces" the visible count while items outside
  // the filter stay selected for when the user switches back.
  const [selectionsByAction, setSelectionsByAction] = useState<
    Record<string, Set<string>>
  >({});
  const [filter, setFilter] = useState('');
  const [copySourceId, setCopySourceId] = useState<string | undefined>(undefined);
  const [createMethod, setCreateMethod] = useState<CreateMethod>('referenceText');
  const [importTargets, setImportTargets] = useState<string[]>([]);
  const [importFiles, setImportFiles] = useState<
    Record<string, { file: string; date: string }>
  >({});
  const importFileInputRef = useRef<HTMLInputElement>(null);
  const toggleGroupRef = useRef<HTMLDivElement>(null);
  const [toggleGroupWidth, setToggleGroupWidth] = useState<number | undefined>(
    undefined,
  );
  const [createReferenceId, setCreateReferenceId] = useState<string | undefined>(undefined);
  const [copyStateFilter, setCopyStateFilter] = useState<
    'all' | 'new' | 'newer' | 'older' | 'same'
  >('all');
  const [importPresenceFilter, setImportPresenceFilter] = useState<
    'all' | 'new' | 'existing'
  >('all');
  const [viewPresenceFilter, setViewPresenceFilter] = useState<
    'all' | 'new' | 'existing'
  >('all');
  const [importConflict, setImportConflict] = useState<
    { books: string[]; existing: string[] } | null
  >(null);

  const project = MOCK_PROJECTS.find((p) => p.id === projectId) ?? MOCK_PROJECTS[0];
  const current = projectsData[projectId] ?? { present: new Set<string>(), dates: {} };
  const otherProjects = MOCK_PROJECTS.filter((p) => p.id !== projectId);
  const copySourceProject = copySourceId
    ? MOCK_PROJECTS.find((p) => p.id === copySourceId)
    : undefined;
  const copySource = copySourceId ? projectsData[copySourceId] : undefined;
  const allBooks = useMemo(() => [...OT_BOOKS, ...NT_BOOKS, ...DC_BOOKS], []);

  const selected = useMemo(
    () => selectionsByAction[action] ?? new Set<string>(),
    [selectionsByAction, action],
  );
  const setSelected = (
    updater: Set<string> | ((prev: Set<string>) => Set<string>),
  ) =>
    setSelectionsByAction((prev) => {
      const current = prev[action] ?? new Set<string>();
      const next = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, [action]: next };
    });

  // Project change wipes selections: nothing carries across projects.
  useEffect(() => setSelectionsByAction({}), [projectId]);

  // Changing the copy source invalidates the copy selection.
  useEffect(() => {
    setSelectionsByAction((prev) => {
      if (!prev.copy) return prev;
      const next = { ...prev };
      delete next.copy;
      return next;
    });
  }, [copySourceId]);

  // Reset per-action filters when the action changes.
  useEffect(() => {
    setCopyStateFilter('all');
    setImportPresenceFilter('all');
    setViewPresenceFilter('all');
  }, [action]);

  // Clear the reference project when the creation method is no longer referenceText.
  useEffect(() => {
    if (createMethod !== 'referenceText') setCreateReferenceId(undefined);
  }, [createMethod]);

  // Source and reference projects can never equal destination.
  useEffect(() => {
    if (copySourceId === projectId) setCopySourceId(undefined);
    if (createReferenceId === projectId) setCreateReferenceId(undefined);
  }, [copySourceId, createReferenceId, projectId]);

  // Mirror the ToggleGroup width so the Create dropdown row can span the same
  // width (single dropdown fills; referenceText splits 50/50). Measure before
  // paint so the row renders at the correct width the first time Create is
  // selected, with no one-frame flash.
  useLayoutEffect(() => {
    const el = toggleGroupRef.current;
    if (!el) return undefined;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setToggleGroupWidth(rect.width);
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [action]);

  const universe = useMemo<string[]>(() => {
    switch (action) {
      case 'view':
        return allBooks;
      case 'create':
        return allBooks.filter((b) => !current.present.has(b));
      case 'delete':
        return allBooks.filter((b) => current.present.has(b));
      case 'copy':
        return copySource ? allBooks.filter((b) => copySource.present.has(b)) : [];
      case 'import':
        return allBooks;
      default:
        return [];
    }
  }, [action, allBooks, current, copySource]);

  const detectBookId = (filename: string): string | undefined => {
    const upper = filename.toUpperCase();
    return allBooks.find((b) => upper.includes(b));
  };
  const handleImportFilesPicked = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    const additions: Record<string, { file: string; date: string }> = {};
    const addedBooks: string[] = [];
    const unmatched: string[] = [];
    Array.from(picked).forEach((f) => {
      const book = detectBookId(f.name);
      if (!book) {
        unmatched.push(f.name);
        return;
      }
      additions[book] = { file: f.name, date: todayISO() };
      addedBooks.push(book);
    });
    if (unmatched.length > 0) {
      sonner.warning(
        unmatched.length === 1
          ? `Could not detect a matching book in "${unmatched[0]}"`
          : `Could not detect a matching book in ${unmatched.length} files`,
        {
          description:
            unmatched.length > 1 ? unmatched.join(', ') : undefined,
          duration: Infinity,
          closeButton: true,
        },
      );
    }
    if (addedBooks.length === 0) return;
    setImportFiles((prev) => ({ ...prev, ...additions }));
    setSelected((prev) => {
      const next = new Set(prev);
      addedBooks.forEach((b) => next.add(b));
      return next;
    });
  };

  const filterTerm = filter.trim().toLowerCase();

  // Apply the action-specific presence/state filter on top of the universe.
  const actionFilteredBooks = useMemo<string[]>(() => {
    if (action === 'copy' && copySource && copyStateFilter !== 'all') {
      return universe.filter((b) => {
        const destHas = current.present.has(b);
        const state = computeCompareState(
          copySource.dates[b],
          destHas ? current.dates[b] : undefined,
        );
        return state.toLowerCase() === copyStateFilter;
      });
    }
    if (action === 'import' && importPresenceFilter !== 'all') {
      return universe.filter((b) =>
        importPresenceFilter === 'new'
          ? !current.present.has(b)
          : current.present.has(b),
      );
    }
    if (action === 'view' && viewPresenceFilter !== 'all') {
      return universe.filter((b) =>
        viewPresenceFilter === 'existing'
          ? current.present.has(b)
          : !current.present.has(b),
      );
    }
    return universe;
  }, [
    action,
    universe,
    copyStateFilter,
    copySource,
    current,
    importPresenceFilter,
    viewPresenceFilter,
  ]);

  const textFilteredBooks = filterTerm
    ? actionFilteredBooks.filter(
        (b) =>
          b.toLowerCase().includes(filterTerm) ||
          Canon.bookIdToEnglishName(b).toLowerCase().includes(filterTerm),
      )
    : actionFilteredBooks;

  // Import mode: float books that have a picked file to the top, each group in
  // canonical order (the split preserves the original order within each group).
  const visibleBooks = useMemo<string[]>(() => {
    if (action !== 'import') return textFilteredBooks;
    const withFiles = textFilteredBooks.filter((b) => importFiles[b]);
    const withoutFiles = textFilteredBooks.filter((b) => !importFiles[b]);
    return [...withFiles, ...withoutFiles];
  }, [action, textFilteredBooks, importFiles]);

  const applyToCurrent = (mutate: (p: ProjectBookState) => ProjectBookState) =>
    setProjectsData((prev) => ({ ...prev, [projectId]: mutate(prev[projectId]) }));

  const runCreate = (books: string[]) => {
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
    setSelected(new Set());
  };

  const runDelete = (books: string[]) => {
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
    setSelected(new Set());
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
    setSelected(new Set());
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
    setImportFiles((prev) => {
      const next = { ...prev };
      rows.forEach((r) => delete next[r.book]);
      return next;
    });
    setSelected(new Set());
  };

  const toggleOne = (book: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(book)) next.delete(book);
      else next.add(book);
      return next;
    });

  // Books in the visible list that actually have a selection control (checkbox).
  // Select-all and the selected-count tooltip both operate on this narrower set,
  // so changing a filter (e.g. copy state or import presence) updates the count.
  const selectableVisibleBooks = useMemo<string[]>(() => {
    if (action === 'view') return [];
    if (action === 'import') return visibleBooks.filter((b) => !!importFiles[b]);
    return visibleBooks;
  }, [action, visibleBooks, importFiles]);
  const visibleSelectedCount = selectableVisibleBooks.filter((b) => selected.has(b)).length;

  const headerSelectState: boolean | 'indeterminate' = (() => {
    if (selectableVisibleBooks.length === 0 || visibleSelectedCount === 0) return false;
    if (visibleSelectedCount === selectableVisibleBooks.length) return true;
    return 'indeterminate';
  })();
  const toggleAllVisible = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      const allSel = selectableVisibleBooks.every((b) => next.has(b));
      if (allSel) selectableVisibleBooks.forEach((b) => next.delete(b));
      else selectableVisibleBooks.forEach((b) => next.add(b));
      return next;
    });

  // Apply / count only the books that are both selected and currently visible
  // (i.e. checkboxes under the current filter). Items selected but hidden by a
  // state/presence filter stay in `selected` for when the user switches back.
  const selectedArr = selectableVisibleBooks.filter((b) => selected.has(b));
  const hasInlineFiles = Object.keys(importFiles).length > 0;
  const canApply =
    action !== 'view' &&
    selectedArr.length > 0 &&
    (action !== 'copy' || !!copySourceId) &&
    !(action === 'create' && createMethod === 'referenceText' && !createReferenceId);

  const performImport = (books: string[], overwriteExisting: boolean) => {
    if (books.length === 0) return;
    const withFiles = books.filter((b) => importFiles[b]);
    if (withFiles.length > 0) {
      // Commit the books whose files were picked inline using the inline
      // modification dates. Any other selected books without inline files
      // fall back to the per-book sub-dialog.
      applyToCurrent((p) => {
        const nextPresent = new Set(p.present);
        const nextDates = { ...p.dates };
        withFiles.forEach((b) => {
          if (nextPresent.has(b) && !overwriteExisting) return;
          nextPresent.add(b);
          nextDates[b] = importFiles[b].date;
        });
        return { present: nextPresent, dates: nextDates };
      });
      setSelected((prev) => {
        const next = new Set(prev);
        withFiles.forEach((b) => next.delete(b));
        return next;
      });
      setImportFiles((prev) => {
        const next = { ...prev };
        withFiles.forEach((b) => delete next[b]);
        return next;
      });
      const remaining = books.filter((b) => !importFiles[b]);
      if (remaining.length > 0) setImportTargets(remaining);
      return;
    }
    setImportTargets(books);
  };

  const apply = () => {
    if (!canApply) return;
    switch (action) {
      case 'create':
        runCreate(selectedArr);
        return;
      case 'delete':
        runDelete(selectedArr);
        return;
      case 'copy':
        if (copySourceId) handleApplyCopy(selectedArr, copySourceId);
        return;
      case 'import': {
        const existing = selectedArr.filter((b) => current.present.has(b));
        if (existing.length > 0) {
          setImportConflict({ books: selectedArr, existing });
          return;
        }
        performImport(selectedArr, false);
        return;
      }
      default:
        return;
    }
  };

  const totalPresent = allBooks.filter((b) => current.present.has(b)).length;
  const subDialogOpen = importTargets.length > 0;

  const actionVerb = (() => {
    if (action === 'create') return 'Create';
    if (action === 'delete') return 'Delete';
    if (action === 'copy') return 'Copy';
    if (action === 'import') return 'Import';
    return '';
  })();

  const actionButtonLabel = (() => {
    if (!canApply) return actionVerb;
    const n = selectedArr.length;
    const suffix = `${n} book${n === 1 ? '' : 's'}`;
    const dest = project.shortName;
    if (action === 'create') return `Create ${suffix} in ${dest}`;
    if (action === 'delete') return `Delete ${suffix} from ${dest}`;
    if (action === 'copy') return `Copy ${suffix} into ${dest}`;
    if (action === 'import') {
      const withFiles = selectedArr.filter((b) => importFiles[b]).length;
      if (withFiles === n) return `Import ${suffix} into ${dest}`;
      if (withFiles > 0)
        return `Import ${withFiles} file${withFiles === 1 ? '' : 's'} into ${dest}, choose ${n - withFiles} more…`;
      return `Import ${suffix} into ${dest}…`;
    }
    return actionVerb;
  })();

  const renderComparisonBadge = (
    state: ComparisonState,
    sideALabel: string,
    sideADate: string | undefined,
    sideBLabel: string,
    sideBDate: string | undefined,
  ) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={comparisonVariant(state)}>{state}</Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div>{`${sideALabel}: ${sideADate ?? '—'}`}</div>
        <div>{`${sideBLabel}: ${sideBDate ?? '—'}`}</div>
      </TooltipContent>
    </Tooltip>
  );

  const renderMeta = (book: string) => {
    const isPresent = current.present.has(book);
    const destDate = current.dates[book];
    if (action === 'copy' && copySource && copySourceProject) {
      const sourceDate = copySource.dates[book];
      const state = computeCompareState(
        sourceDate,
        isPresent ? destDate : undefined,
      );
      if (state === 'New') {
        return (
          <Badge
            variant="outline"
            className="tw-font-normal tw-text-muted-foreground"
          >
            New
          </Badge>
        );
      }
      return renderComparisonBadge(
        state,
        copySourceProject.shortName,
        sourceDate,
        project.shortName,
        isPresent ? destDate : undefined,
      );
    }
    if (action === 'delete') {
      return (
        <Badge variant="secondary" className="tw-font-normal">
          {destDate ?? 'Present'}
        </Badge>
      );
    }
    if (action === 'create') {
      return (
        <Badge
          variant="outline"
          className="tw-font-normal tw-text-muted-foreground"
        >
          New
        </Badge>
      );
    }
    if (action === 'import') {
      const pick = importFiles[book];
      if (pick) {
        const state = computeCompareState(
          pick.date,
          isPresent ? destDate : undefined,
        );
        return (
          <>
            <span
              className="tw-max-w-[12rem] tw-truncate tw-text-xs tw-text-muted-foreground"
              title={pick.file}
            >
              {pick.file}
            </span>
            {renderComparisonBadge(
              state,
              'File',
              pick.date,
              project.shortName,
              isPresent ? destDate : undefined,
            )}
          </>
        );
      }
    }
    if (action === 'view' && !isPresent) return undefined;
    return isPresent ? (
      <Badge variant="secondary" className="tw-font-normal">
        {destDate ?? 'Present'}
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="tw-font-normal tw-text-muted-foreground"
      >
        New
      </Badge>
    );
  };

  const isFilterEmptyState =
    visibleBooks.length === 0 &&
    universe.length > 0 &&
    !(action === 'copy' && !copySourceId);
  const emptyStateMessage = (() => {
    if (action === 'copy' && !copySourceId)
      return 'Choose a source project to see books available to copy.';
    if (universe.length === 0) {
      if (action === 'create')
        return 'This project already contains every canonical book.';
      if (action === 'delete') return 'This project has no books to delete.';
      if (action === 'copy') return 'The chosen source project has no books to copy.';
    }
    return 'No books match the current filter.';
  })();
  const clearActiveFilters = () => {
    setFilter('');
    setCopyStateFilter('all');
    setImportPresenceFilter('all');
    setViewPresenceFilter('all');
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
      <Button onClick={() => setOpen(true)}>Open Action-First Manage Books</Button>
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
                <BookOpenCheck
                  className="tw-h-5 tw-w-5 tw-text-muted-foreground"
                  aria-hidden
                />
                <div className="tw-flex tw-flex-col">
                  <h2 className="tw-text-lg tw-font-semibold">Manage Books</h2>
                  <p className="tw-text-xs tw-text-muted-foreground">
                    {`${totalPresent} of ${allBooks.length} canonical books in ${project.shortName}`}
                  </p>
                </div>
                <div className="tw-ml-auto tw-mr-8 tw-flex tw-items-center tw-gap-2">
                  <Label
                    htmlFor="af-project"
                    className="tw-text-xs tw-text-muted-foreground"
                  >
                    Project
                  </Label>
                  <Select value={projectId} onValueChange={setProjectId}>
                    <SelectTrigger id="af-project" className="tw-h-8 tw-w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_PROJECTS.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.shortName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </header>

              <div className="tw-flex tw-flex-col tw-items-start tw-gap-2 tw-border-b tw-px-6 tw-py-3 tw-@container/actions">
                <ToggleGroup
                  ref={toggleGroupRef}
                  type="single"
                  variant="outline"
                  value={action}
                  onValueChange={(v) => v && setAction(v as ActionFirstAction)}
                  className="tw-gap-0"
                >
                  <ToggleGroupItem
                    value="view"
                    className="tw-h-9 tw-gap-1.5 !tw-rounded-r-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <BookOpenCheck
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    View
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="create"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <BookPlus
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    Create
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="import"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Download
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    Import
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="copy"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Copy
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    Copy
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="delete"
                    className="tw-ml-[-1px] tw-h-9 tw-gap-1.5 !tw-rounded-l-none tw-px-3 data-[state=on]:tw-z-10 data-[state=on]:!tw-bg-primary data-[state=on]:!tw-text-primary-foreground"
                  >
                    <Trash2
                      className="tw-hidden tw-h-4 tw-w-4 @md/actions:tw-inline"
                      aria-hidden
                    />
                    Delete
                  </ToggleGroupItem>
                </ToggleGroup>

                {action === 'view' && (
                  <div className="tw-flex tw-items-center tw-gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw-h-8 tw-px-2 tw-text-xs"
                    >
                      Scripture reference settings...
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw-h-8 tw-px-2 tw-text-xs"
                    >
                      Project canons...
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="tw-h-8 tw-gap-1.5 tw-px-2 tw-text-xs"
                    >
                      Registry
                      <ExternalLink
                        className="tw-h-3 tw-w-3 tw-text-muted-foreground"
                        aria-hidden
                      />
                    </Button>
                  </div>
                )}

                {action === 'create' && (
                  <div
                    className="tw-flex tw-items-center tw-gap-2"
                    style={{ width: toggleGroupWidth }}
                  >
                    <Select
                      value={createMethod}
                      onValueChange={(v) => setCreateMethod(v as CreateMethod)}
                    >
                      <SelectTrigger
                        id="af-method"
                        className="tw-h-8 tw-min-w-0 tw-flex-1"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(CREATE_METHOD_LABELS) as CreateMethod[]).map(
                          (m) => (
                            <SelectItem key={m} value={m}>
                              {CREATE_METHOD_LABELS[m]}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {createMethod === 'referenceText' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            className="tw-h-4 tw-w-4 tw-shrink-0 tw-text-muted-foreground"
                            aria-label="Based on info"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          Prefill with the same markers as a selected project
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {createMethod === 'referenceText' && (
                      <Select
                        value={createReferenceId ?? ''}
                        onValueChange={(v) =>
                          setCreateReferenceId(v || undefined)
                        }
                      >
                        <SelectTrigger
                          id="af-reference"
                          className={cn(
                            'tw-h-8 tw-min-w-0 tw-flex-1',
                            !createReferenceId &&
                              'tw-border-primary tw-bg-primary tw-text-primary-foreground [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground hover:tw-bg-primary/90',
                          )}
                        >
                          <SelectValue placeholder="Select reference project" />
                        </SelectTrigger>
                        <SelectContent>
                          {otherProjects.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}

                {action === 'copy' && (
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Label
                      htmlFor="af-source"
                      className="tw-text-xs tw-text-muted-foreground"
                    >
                      From
                    </Label>
                    <Select
                      value={copySourceId ?? ''}
                      onValueChange={(v) => setCopySourceId(v || undefined)}
                    >
                      <SelectTrigger
                        id="af-source"
                        className={cn(
                          'tw-h-8 tw-w-52',
                          !copySourceId &&
                            'tw-border-primary tw-bg-primary tw-text-primary-foreground [&>span]:tw-text-primary-foreground [&_svg]:tw-text-primary-foreground hover:tw-bg-primary/90',
                        )}
                      >
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {otherProjects.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {action === 'import' && (
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <input
                      ref={importFileInputRef}
                      type="file"
                      multiple
                      accept=".sfm,.usfm,.usx,.xml"
                      className="tw-hidden"
                      onChange={(e) => {
                        handleImportFilesPicked(e.target.files);
                        e.target.value = '';
                      }}
                    />
                    <Button
                      variant={hasInlineFiles ? 'outline' : 'default'}
                      size="sm"
                      className="tw-h-8"
                      onClick={() => importFileInputRef.current?.click()}
                    >
                      <FolderOpen
                        className="tw-mr-1.5 tw-h-3.5 tw-w-3.5"
                        aria-hidden
                      />
                      {hasInlineFiles ? 'Add files…' : 'Choose files…'}
                    </Button>
                    {hasInlineFiles && (
                      <>
                        <span className="tw-text-xs tw-text-muted-foreground">
                          {`${Object.keys(importFiles).length} file${Object.keys(importFiles).length === 1 ? '' : 's'} matched`}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="tw-h-8"
                          onClick={() => setImportFiles({})}
                        >
                          Clear
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="tw-flex tw-flex-nowrap tw-items-center tw-gap-2 tw-border-b tw-px-6 tw-py-2 tw-@container/filterbar">
                {action !== 'view' && (action !== 'import' || hasInlineFiles) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Checkbox
                          id="af-sel-all"
                          checked={headerSelectState}
                          disabled={selectableVisibleBooks.length === 0}
                          onCheckedChange={toggleAllVisible}
                          aria-label={
                            visibleSelectedCount > 0
                              ? `${visibleSelectedCount} selected`
                              : 'Select all'
                          }
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {visibleSelectedCount > 0
                        ? `${visibleSelectedCount} selected`
                        : 'Select all'}
                    </TooltipContent>
                  </Tooltip>
                )}
                <Input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter books…"
                  className="tw-h-8 tw-min-w-0 tw-max-w-xs tw-flex-1 tw-basis-24"
                  aria-label="Filter books"
                />
                <span
                  className={cn(
                    'tw-whitespace-nowrap tw-text-xs tw-text-muted-foreground',
                    action === 'copy' &&
                      'tw-hidden @md/filterbar:tw-inline',
                  )}
                >
                  {universe.length === 0
                    ? '0 books'
                    : `${visibleBooks.length} of ${universe.length}`}
                </span>
                {action === 'view' && (
                  <ToggleGroup
                    type="single"
                    value={viewPresenceFilter}
                    onValueChange={(v) =>
                      v && setViewPresenceFilter(v as typeof viewPresenceFilter)
                    }
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(['all', 'new', 'existing'] as const).map((s) => (
                      <ToggleGroupItem
                        key={s}
                        value={s}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
                {action === 'copy' && copySourceId && (
                  <ToggleGroup
                    type="single"
                    value={copyStateFilter}
                    onValueChange={(v) =>
                      v && setCopyStateFilter(v as typeof copyStateFilter)
                    }
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(['all', 'new', 'newer', 'older', 'same'] as const).map((s) => (
                      <ToggleGroupItem
                        key={s}
                        value={s}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
                {action === 'import' && (
                  <ToggleGroup
                    type="single"
                    value={importPresenceFilter}
                    onValueChange={(v) =>
                      v && setImportPresenceFilter(v as typeof importPresenceFilter)
                    }
                    className="tw-ml-auto tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
                  >
                    {(['all', 'new', 'existing'] as const).map((s) => (
                      <ToggleGroupItem
                        key={s}
                        value={s}
                        className="tw-h-6 tw-px-2 tw-text-xs tw-capitalize data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm"
                      >
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
              </div>

              <div className="tw-min-h-0 tw-flex-1 tw-overflow-auto tw-px-3 tw-py-2">
                {visibleBooks.length === 0 ? (
                  <div className="tw-flex tw-min-h-40 tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-text-center tw-text-sm tw-text-muted-foreground">
                    <span>{emptyStateMessage}</span>
                    {isFilterEmptyState && (
                      <Button variant="outline" size="sm" onClick={clearActiveFilters}>
                        Clear filter
                      </Button>
                    )}
                  </div>
                ) : (
                  <ul className="tw-flex tw-flex-col tw-gap-0.5">
                    {visibleBooks.map((book) => {
                      const isSelected = selected.has(book);
                      const showCheckbox =
                        action === 'create' ||
                        action === 'delete' ||
                        action === 'copy' ||
                        (action === 'import' && !!importFiles[book]);
                      // View mode has no placeholder — book names align with
                      // the filter input (which sits at the row's start since
                      // the bar's select-all checkbox is hidden too).
                      const showCheckboxPlaceholder =
                        action === 'import' && !importFiles[book];
                      const isMissingInView =
                        action === 'view' && !current.present.has(book);
                      return (
                        <li
                          key={book}
                          onClick={() => {
                            if (showCheckbox) toggleOne(book);
                          }}
                          className={cn(
                            'tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-px-3 tw-py-1.5 tw-text-sm hover:tw-bg-accent/60',
                            isSelected && 'tw-bg-accent',
                            showCheckbox && 'tw-cursor-pointer',
                          )}
                        >
                          {showCheckbox && (
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleOne(book)}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Select ${book}`}
                            />
                          )}
                          {showCheckboxPlaceholder && (
                            <span className="tw-h-4 tw-w-4 tw-shrink-0" aria-hidden />
                          )}
                          <div
                            className={cn(
                              'tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2',
                              isMissingInView &&
                                'tw-text-muted-foreground tw-line-through',
                            )}
                          >
                            <span className="tw-font-medium">{book}</span>
                            <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
                              {Canon.bookIdToEnglishName(book)}
                            </span>
                          </div>
                          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
                            {renderMeta(book)}
                            {action === 'view' &&
                              (current.present.has(book) ? (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="tw-h-7 tw-w-7 tw-p-0"
                                      aria-label={`Delete ${book}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectionsByAction((prev) => ({
                                          ...prev,
                                          delete: new Set([book]),
                                        }));
                                        setAction('delete');
                                      }}
                                    >
                                      <Trash2
                                        className="tw-h-3.5 tw-w-3.5"
                                        aria-hidden
                                      />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    Go to Delete screen
                                  </TooltipContent>
                                </Tooltip>
                              ) : (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="tw-h-7 tw-px-2 tw-text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectionsByAction((prev) => ({
                                          ...prev,
                                          create: new Set([book]),
                                        }));
                                        setAction('create');
                                      }}
                                    >
                                      Create
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    Go to Create screen
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <footer className="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-border-t tw-px-6 tw-py-3">
                <span className="tw-text-xs tw-text-muted-foreground">
                  {action === 'view'
                    ? `Viewing ${project.shortName}`
                    : action === 'create'
                      ? `Create in ${project.shortName} — ${CREATE_METHOD_LABELS[createMethod]}`
                      : action === 'delete'
                        ? `Delete from ${project.shortName}`
                        : action === 'copy'
                          ? copySourceProject
                            ? `Copy from ${copySourceProject.shortName} into ${project.shortName}`
                            : `Copy into ${project.shortName}`
                          : `Import into ${project.shortName}`}
                </span>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    {action === 'view' ? 'Close' : 'Cancel'}
                  </Button>
                  {action !== 'view' &&
                    (() => {
                      const actionButton = (
                        <Button
                          variant={action === 'delete' ? 'destructive' : 'default'}
                          disabled={!canApply}
                          onClick={apply}
                        >
                          {action === 'create' && (
                            <BookPlus
                              className="tw-mr-1.5 tw-h-4 tw-w-4"
                              aria-hidden
                            />
                          )}
                          {action === 'delete' && (
                            <Trash2 className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {action === 'copy' && (
                            <Copy className="tw-mr-1.5 tw-h-4 tw-w-4" aria-hidden />
                          )}
                          {action === 'import' && (
                            <Download
                              className="tw-mr-1.5 tw-h-4 tw-w-4"
                              aria-hidden
                            />
                          )}
                          {actionButtonLabel}
                        </Button>
                      );
                      let tooltip: string | undefined;
                      if (!canApply) {
                        const missing: string[] = [];
                        if (
                          action === 'copy' &&
                          !copySourceId
                        )
                          missing.push('choose a source project');
                        if (
                          action === 'create' &&
                          createMethod === 'referenceText' &&
                          !createReferenceId
                        )
                          missing.push(
                            "choose a reference project or change 'based on'",
                          );
                        if (selectedArr.length === 0)
                          missing.push(
                            action === 'import'
                              ? 'add a file or select a book'
                              : 'select at least one book',
                          );
                        if (missing.length > 0) {
                          const next = missing[0];
                          tooltip = `${next[0].toUpperCase()}${next.slice(1)}`;
                        }
                      } else if (action === 'create') {
                        if (createMethod === 'empty') tooltip = 'Create empty';
                        else if (createMethod === 'chapterVerse')
                          tooltip = 'Create with all chapters and verses';
                        else {
                          const ref = createReferenceId
                            ? MOCK_PROJECTS.find((p) => p.id === createReferenceId)
                            : undefined;
                          tooltip = `Create based on ${ref?.name ?? '…'}`;
                        }
                      } else if (action === 'copy') {
                        tooltip = `Create from ${copySourceProject?.name ?? '…'}`;
                      }
                      if (!tooltip) return actionButton;
                      return (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>{actionButton}</span>
                          </TooltipTrigger>
                          <TooltipContent>{tooltip}</TooltipContent>
                        </Tooltip>
                      );
                    })()}
                </div>
              </footer>
            </div>
          </TooltipProvider>
        </DialogContent>
      </Dialog>

      <ImportSubDialog
        books={importTargets}
        destProjectId={projectId}
        projectsData={projectsData}
        onClose={() => setImportTargets([])}
        onApply={handleApplyImport}
      />
      <Dialog
        open={!!importConflict}
        onOpenChange={(v) => {
          if (!v) setImportConflict(null);
        }}
      >
        <DialogContent className="tw-max-w-md">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <h2 className="tw-text-base tw-font-semibold">Books already exist</h2>
              <p className="tw-text-sm tw-text-muted-foreground">
                {importConflict &&
                  `${importConflict.existing.length} book${importConflict.existing.length === 1 ? '' : 's'} already exist${importConflict.existing.length === 1 ? 's' : ''} in ${project.name}: ${importConflict.existing.join(', ')}`}
              </p>
              <p className="tw-text-sm tw-text-muted-foreground">
                Choose how to proceed with the import or close to cancel.
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  if (!importConflict) return;
                  // In a real consumer this would dispatch a "replace entire
                  // books" callback; the local mock commits all selected books.
                  performImport(importConflict.books, true);
                  setImportConflict(null);
                }}
              >
                Replace entire books
              </Button>
              <Button
                onClick={() => {
                  if (!importConflict) return;
                  // Same local state change as Replace — real consumers wire
                  // this to a separate "import non-existing chapters" callback
                  // that merges at the chapter level instead of replacing.
                  performImport(importConflict.books, true);
                  setImportConflict(null);
                }}
              >
                Import non-existing chapters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Sonner position="top-center" />
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

