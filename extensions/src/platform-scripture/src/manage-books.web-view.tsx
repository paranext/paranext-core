/**
 * === NEW IN PT10 === FN-008 (2026-05-01): Wiring layer for the unified Manage Books dialog. The
 * presentational component lives in platform-bible-react; this thin web view subscribes to PAPI
 * data, calls the platformScripture.manageBooks NetworkObject methods, and routes AlertEntry
 * results to the platform notification service per Theme C1.
 *
 * Adapter responsibilities (FN-008 #1):
 *
 * - LoadBooks(projectId) ← useProjectSetting('platformScripture.booksPresent')
 * - LoadProjects() ← manageBooks.filterProjects(...)
 * - LoadVersification(projectId) ← useProjectSetting('platformScripture.versification')
 * - OnCreateBooks/onDeleteBooks/onCopyBooks/onImportBooks ← manageBooks.{method}(...)
 * - OnMutationResult(result) ← iterates AlertEntry[] → notificationService.send
 * - IsProjectShared ← manageBooks.isProjectShared(projectId)
 * - ImportFile { file, date } ↔ ImportFileEntry { projectId, fileName, ... }
 *
 * Cross-launch callbacks land as info-toast stubs (DEF-UI-006/007/008) until the corresponding
 * platform commands ship.
 */
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { WebViewProps } from '@papi/core';
import { Canon } from '@sillsdev/scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  ProjectSelectorLocalizedStrings,
  ProjectSelectorOpenTab,
  ProjectSelectorProject,
} from 'platform-bible-react/internal';
import { formatReplacementString, getErrorMessage } from 'platform-bible-utils';
import { useOpenProjectTabs } from './hooks/use-open-project-tabs';
import {
  AlertEntry,
  EstherTemplate,
  ManageBooksCopyStrategy,
  ManageBooksCreateMethod,
  ManageBooksDialog,
  ManageBooksDialogBookInfo,
  ManageBooksDialogProject,
  ManageBooksImportFile,
  ManageBooksImportStrategy,
  MutationResult,
  MANAGE_BOOKS_DIALOG_STRING_KEYS,
} from './manage-books-dialog/manage-books-dialog.component';
import {
  GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS,
  GreekEstherTemplate,
  GreekEstherTemplatePicker,
  GreekEstherTemplatePickerLocalizedStrings,
} from './greek-esther-template-picker.component';

const NETWORK_OBJECT_ID = 'platformScripture.manageBooks';
const BOOKS_PRESENT_DEFAULT = '0'.repeat(123);

// Only Scripture Editor tabs should mark a project as "open" in the ProjectSelector.
// Other project-bound tabs (Manage Books itself, Checks side panel, etc.) carry a `projectId`
// but are not the "is the project open" signal users expect. Mirrors the canonical webViewType
// from `platform-scripture-editor.utils.ts` (SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react').
const SCRIPTURE_EDITOR_WEB_VIEW_TYPES = new Set<string>(['platformScriptureEditor.react']);

/**
 * Wire-shape of a single import file as the C# orchestrator expects to receive it. Mirrors
 * `ImportFileEntry.cs` in c-sharp/ManageBooks/ and the canonical `ImportFileEntry` definition in
 * `.context/features/manage-books/data-contracts.md` Section 2.5.
 *
 * Bug fix (2026-05-03): the prior shape `{projectId, fileName, bookNumber, replaceEntireBook}` did
 * not match the data-contracts wire shape — `Content` was missing entirely, leading to a
 * `NullReferenceException` inside `ImportBooksOrchestrator.IsUsxContent` (`content.TrimStart()` on
 * `null`), and `Included` was also absent (causing every file to be silently treated as
 * `Included=false` and skipped). The corrected shape matches both the C# `ImportFileEntry` record
 * and the e2e `manage-books-commands.spec.ts` "M-011 importBooks" payload exactly.
 */
type ImportFileEntry = {
  fileName: string;
  content: string;
  included: boolean;
};

/**
 * Wire-shape returned by `manageBooks.filterProjects` / `manageBooks.getToProjectFilter`. Mirrors
 * C# `ProjectListResult`.
 */
type ProjectListResult = {
  projects: {
    projectId: string;
    name: string;
    /**
     * PT9 `ProjectType` enum value (e.g. "Standard"). Mirrors the C# `ProjectSummary.ProjectType`
     * wire field. Currently unread on the client (the former commentary filter that consumed it was
     * removed — N4); kept to document the wire shape and for future use.
     */
    projectType: string;
    isEditable: boolean;
    /** Whether the project is a resource (read-only published text). */
    isResource: boolean;
    /**
     * Long human-readable name (e.g. "English Standard Version 2016"). I2: returned on the list so
     * the frontend no longer fetches `platform.fullName` per project. Empty when unset — fall back
     * to the short `name`.
     */
    fullName: string;
    /**
     * Versification as the numeric `ScrVersType` code in string form (e.g. "4"). I2: returned on
     * the list so the frontend no longer fetches `platformScripture.versification` per project.
     */
    versification: string;
  }[];
};

/**
 * Sidebar's enriched `ProjectSelectorProject` row. `isEditable` is added so the dialog can disable
 * mutating actions (Create / Copy / Import / Delete) when the active target is read-only — see
 * `manage-books-dialog.types.ts:ManageBooksDialogProject.isEditable`. The ProjectSelector itself
 * ignores this extra field.
 */
type SidebarProject = ProjectSelectorProject & { isEditable: boolean };

/**
 * Wire-shape of the manage-books NetworkObject as seen by the React layer. The methods listed here
 * are the ones we actually call in this wiring pass — not all 13 backend methods need a TS
 * signature for the dialog to function.
 */
/**
 * Wire-shape of a single book's comparison entry returned by `getBookComparison` /
 * `parseImportFiles`. Mirrors C# `BookComparisonEntry` (see ManageBooks/BookComparisonEntry.cs).
 * `SourceLastModified` / `DestLastModified` are ISO-8601 strings or null when the side has no date
 * (file missing or empty text).
 */
type BookComparisonEntry = {
  bookNum: number;
  bookName: string;
  comparisonState:
    | 'FilesAreSame'
    | 'DestDoesNotExist'
    | 'SourceIsNewer'
    | 'SourceIsOlder'
    | 'Undetermined'
    | 'SourceDoesNotExist';
  defaultIncluded: boolean;
  selectable: boolean;
  tooltipInfo: string;
  sourceLastModified: string | null;
  destLastModified: string | null;
};

type BookComparisonResult = { entries: BookComparisonEntry[] };

/**
 * Local typing for the `platformScripture.manageBooks` NetworkObject proxy. The backing C# network
 * object is marked experimental at registration (every method carries `x-experimental` in the live
 * OpenRPC document); this web-view-local interface mirrors that, since there is no shared
 * `papi-shared-types` interface for it.
 *
 * @experimental
 */
interface ManageBooksNetworkObject {
  /** @experimental */
  filterProjects: (input: {
    purpose: string;
    sourceProjectType?: string;
  }) => Promise<ProjectListResult>;
  /** @experimental */
  isProjectShared: (projectId: string) => Promise<boolean>;
  /** @experimental */
  createBooks: (request: {
    projectId: string;
    bookNumbers: number[];
    creationMethod: string;
    modelProjectId?: string;
    estherTemplate?: string;
  }) => Promise<MutationResult>;
  /** @experimental */
  deleteBooks: (request: { projectId: string; bookNumbers: number[] }) => Promise<MutationResult>;
  /** @experimental */
  copyBooks: (request: {
    fromProjectId: string;
    toProjectId: string;
    bookNumbers: number[];
    /**
     * When true (default), each book is written via `PutText(bookNum, 0, ...)` — destination
     * replaced. When false, the orchestrator runs the chapter-merge path (port of PT9
     * `WriteChaptersToBook`): source chapters overwrite dest counterparts; dest chapters not in
     * source survive. Optional + backwards-compatible.
     */
    replaceEntireBook?: boolean;
  }) => Promise<MutationResult>;
  /** @experimental */
  importBooks: (input: {
    projectId: string;
    files: ImportFileEntry[];
    replaceEntireBook: boolean;
  }) => Promise<MutationResult>;
  /**
   * Per-book Copy comparison.
   *
   * @experimental
   */
  getBookComparison: (input: {
    fromProjectId: string;
    toProjectId: string;
  }) => Promise<BookComparisonResult>;
  /**
   * A single project's own per-book last-modified dates (I9). Used to populate the destination
   * project's dates in Import mode, where no second project is involved. The `destLastModified` on
   * each entry is the real file date.
   *
   * @experimental
   */
  getProjectBookDates: (projectId: string) => Promise<BookComparisonResult>;
  /**
   * Per-book Import comparison; same wire shape as `getBookComparison`.
   *
   * @experimental
   */
  parseImportFiles: (input: {
    projectId: string;
    files: ImportFileEntry[];
  }) => Promise<BookComparisonResult>;
}

// ===== Adapter helpers =====================================================

/**
 * Decode the 123-char `platformScripture.booksPresent` setting into the shape the dialog consumes
 * (`ManageBooksDialogBookInfo[]`). Each '1' bit at index N means book number N+1 is present.
 */
function decodeBooksPresent(booksPresent: string): ManageBooksDialogBookInfo[] {
  const out: ManageBooksDialogBookInfo[] = [];
  for (let i = 0; i < booksPresent.length; i += 1) {
    if (booksPresent[i] === '1') {
      const bookNumber = i + 1;
      const bookId = Canon.bookNumberToId(bookNumber);
      if (bookId) out.push({ id: bookId });
    }
  }
  return out;
}

/**
 * Convert the dialog's `Record<bookId, ManageBooksImportFile>` shape into the wire-shape
 * `ImportFileEntry[]` the C# `ImportBooksOrchestrator` expects (data-contracts §2.5).
 *
 * `entry.content` is populated by the dialog's file picker (it reads `File.text()` at pick time).
 * If a story / decorator omits content, we forward an empty string — the orchestrator's parse
 * pipeline surfaces missing-content as a per-file MISSING_ID_LINE error rather than crashing, which
 * is the documented contract.
 */
function componentToImportFileEntries(
  files: Record<string, ManageBooksImportFile>,
): ImportFileEntry[] {
  return Object.entries(files).map(([, entry]) => ({
    fileName: entry.file,
    content: entry.content ?? '',
    included: true,
  }));
}

/**
 * Map the unified dialog's createMethod TS union into the wire-shape token the C# `CreationMethod`
 * enum accepts. The C# JSON deserializer is configured with `JsonStringEnumConverter` +
 * `JsonNamingPolicy.CamelCase` (see `c-sharp/JsonUtils/SerializationOptions.cs`), so the wire
 * tokens are the camelCase forms `'empty' | 'chapterVerse' | 'fromTemplate'` — matching the
 * canonical shape in `.context/features/manage-books/data-contracts.md` Section 2.2 and the e2e
 * `manage-books-commands.spec.ts` "M-004 createBooks" payload.
 *
 * Bug fix (2026-05-03): the prior mapping returned `'Empty' | 'ChapterAndVerseNumbers' |
 * 'FromTemplate'`, which the C# converter rejected and silently fell back to `Empty` (enum 0). That
 * produced an empty book regardless of the user's "Based on" / "With all chapter and verse numbers"
 * selection.
 */
function createMethodToWire(method: ManageBooksCreateMethod): string {
  switch (method) {
    case 'empty':
      return 'empty';
    case 'chapterVerse':
      return 'chapterVerse';
    case 'fromTemplate':
      return 'fromTemplate';
    default:
      // Exhaustiveness check; if a new method lands the type system will flag.
      return 'empty';
  }
}

/** Convert AlertEntry.level → platform notification severity. */
function alertLevelToSeverity(level: AlertEntry['level']): 'info' | 'warning' | 'error' {
  switch (level) {
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
    default:
      return 'info';
  }
}

/** Convert book-id strings to wire bookNumbers (drops invalid ids). */
function booksToNumbers(bookIds: string[]): number[] {
  const nums: number[] = [];
  bookIds.forEach((id) => {
    const n = Canon.bookIdToNumber(id);
    if (n) nums.push(n);
  });
  return nums;
}

// ===== Web view component ==================================================

global.webViewComponent = function ManageBooksWebView({
  projectId: initialProjectId,
  useWebViewState,
  updateWebViewDefinition,
}: WebViewProps) {
  // Persist projectId in the saved web view state so the dock-tab restores
  // the user's last choice across sessions.
  const [persistedProjectId, setPersistedProjectId] = useWebViewState<string>(
    'projectId',
    initialProjectId ?? '',
  );

  // The EXPLICIT open context wins over persisted state: since the Manila UX
  // follow-up the dialog is only opened from a scripture editor's hamburger
  // menu, so a fresh `initialProjectId` means "the user asked to manage THIS
  // project's books" — a previously-persisted choice (possibly stale, or even
  // a project id that no longer resolves) must not override it. Persistence
  // still covers dock-layout session restores, where the definition carries
  // no fresh option.
  const [projectId, setProjectIdLocal] = useState<string>(
    () => initialProjectId || persistedProjectId || '',
  );

  // Pull all the localization strings the dialog + picker need in one batch. Including the
  // picker keys here ensures the inline-rendered picker reads from the same string map and
  // localization fetches happen as a single round-trip.
  // (Hoisted above the project-change effect so the effect can read the localized title
  // template when computing the new tab title.)
  const stringKeys = useMemo(
    () => [...MANAGE_BOOKS_DIALOG_STRING_KEYS, ...GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS],
    [],
  );
  const [localizedStrings] = useLocalizedStrings(stringKeys);

  // Sync local → persisted whenever projectId changes.
  // Theme C wiring: if the dialog opened with no project context (main-menu
  // invocation), seed the projectId from the first available scripture project
  // once the manage-books NetworkObject resolves. The setter is a no-op when
  // projectId is already set so this only fires for the cold-open case.
  //
  // Per Sebastian review item 25 (2026-05-06): also recompute the dock-tab title
  // from the new project's `platform.name` setting and pass it to
  // `updateWebViewDefinition` so the tab label tracks project switches in real
  // time. Mirrors `manage-books.web-view-provider.ts` getWebView's title shape:
  //   `${titleTemplate}` when no project, otherwise
  //   `${titleTemplate} — {projectName}` (formatted via formatReplacementString).
  // Keeping these two title-construction sites in sync is intentional — the
  // initial title (provider) and update title (here) MUST match so the user
  // does not see the title shape change between cold-open and project switch.
  // Persist projectId to the web view's saved state on change. Kept as its own
  // effect so the title-update effect below can be triggered by `projectId`-only
  // and not get cancelled when `setPersistedProjectId` triggers a re-render.
  useEffect(() => {
    if (projectId && projectId !== persistedProjectId) {
      setPersistedProjectId(projectId);
    }
  }, [projectId, persistedProjectId, setPersistedProjectId]);

  // Update the dock-tab title (and projectId) on project change. Per Sebastian
  // review item 25 (2026-05-06), the tab label must track the active project
  // in real time. Mirrors `manage-books.web-view-provider.ts:getWebView` so the
  // initial title (cold open) and update title (project switch) both produce
  // `${titleTemplate}` (no project) or `${titleTemplate} — {projectName}`.
  //
  // `lastAppliedProjectIdRef` dedupes when this effect re-runs for non-projectId
  // dep changes (e.g. `localizedStrings` arriving from the localization service).
  // It must be a ref (not state) so the dedupe survives React's render → cleanup →
  // re-run cycle without cancelling the in-flight async PDP fetch.
  const lastAppliedProjectIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!projectId) return undefined;
    if (lastAppliedProjectIdRef.current === projectId) return undefined;
    lastAppliedProjectIdRef.current = projectId;

    let cancelled = false;
    (async () => {
      // Resolve the projectName (display name) the same way the provider does:
      // `platform.name` setting, falling back to projectId when unavailable.
      let projectName: string | undefined;
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        const nameSetting = await pdp.getSetting('platform.name');
        projectName = typeof nameSetting === 'string' ? nameSetting : projectId;
      } catch {
        projectName = projectId;
      }
      if (cancelled) return;

      // Compose the title using the localized template; if the localized string
      // hasn't loaded yet (string-fetch race), fall back to the English default
      // so the title still updates.
      const titleTemplate = localizedStrings['%manageBooks_dialog_title%'] ?? 'Manage books';
      const title = projectName
        ? formatReplacementString(`${titleTemplate} — {projectName}`, { projectName })
        : titleTemplate;

      try {
        const ok = updateWebViewDefinition({ projectId, title });
        if (!ok) {
          logger.debug(
            `manage-books: updateWebViewDefinition returned false (likely racing the saved-definition lifecycle)`,
          );
        }
      } catch (e) {
        logger.warn(
          `manage-books: updateWebViewDefinition threw: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projectId, updateWebViewDefinition, localizedStrings]);

  // Build a typed subset for the picker by copying the picker's keys out of the shared map.
  // This avoids a `as`-assertion (banned by no-type-assertion lint rule) at the wire boundary.
  const pickerLocalizedStrings = useMemo<GreekEstherTemplatePickerLocalizedStrings>(() => {
    const out: GreekEstherTemplatePickerLocalizedStrings = {};
    GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS.forEach((key) => {
      const value = localizedStrings[key];
      if (typeof value === 'string') out[key] = value;
    });
    return out;
  }, [localizedStrings]);

  // The ProjectSelector popover's internal strings (search placeholder,
  // filter labels, section headings) are not localized by default. Build a
  // ProjectSelectorLocalizedStrings object from the resolved manage-books
  // strings so all three pickers (sidebar / Copy "From" / Create "Based on")
  // share the same translations.
  const projectSelectorLocalizedStrings = useMemo<ProjectSelectorLocalizedStrings>(() => {
    const resolve = (key: keyof typeof localizedStrings, fallback: string) => {
      const value = localizedStrings[key];
      return typeof value === 'string' ? value : fallback;
    };
    return {
      searchPlaceholder: resolve(
        '%manageBooks_projectSelector_searchPlaceholder%',
        'Search projects & resources',
      ),
      filterAriaLabel: resolve('%manageBooks_projectSelector_filterAriaLabel%', 'Filter'),
      groupSectionLabel: resolve('%manageBooks_projectSelector_groupSectionLabel%', 'Group'),
      filterSectionLabel: resolve('%manageBooks_projectSelector_filterSectionLabel%', 'Filter'),
      filterGroupByOpenTabs: resolve(
        '%manageBooks_projectSelector_filterGroupByOpenTabs%',
        'By open tabs',
      ),
      filterShowSelectedOnly: resolve(
        '%manageBooks_projectSelector_filterShowSelectedOnly%',
        'Show selected only',
      ),
      openTabsSectionHeading: resolve(
        '%manageBooks_projectSelector_openTabsSectionHeading%',
        'Opened project & resource tabs',
      ),
      otherProjectsSectionHeading: resolve(
        '%manageBooks_projectSelector_otherProjectsSectionHeading%',
        'Your projects & resources',
      ),
      versificationUnknownSectionHeading: resolve(
        '%manageBooks_projectSelector_versificationUnknownSectionHeading%',
        'Unknown versification',
      ),
      boundButClosedTooltip: resolve(
        '%manageBooks_projectSelector_boundButClosedTooltip%',
        'Bound to {group} · not currently open',
      ),
      openButtonLabel: resolve('%manageBooks_projectSelector_openButtonLabel%', 'Open'),
      selectAll: resolve('%manageBooks_projectSelector_selectAll%', 'Select all'),
      clearAll: resolve('%manageBooks_projectSelector_clearAll%', 'Clear all'),
    };
  }, [localizedStrings]);

  // ===== PAPI: project list =================================================
  // Resolve the manage-books NetworkObject lazily on first render.
  const [manageBooksApi, setManageBooksApi] = useState<ManageBooksNetworkObject | undefined>(
    undefined,
  );
  useEffect(() => {
    let mounted = true;
    papi.networkObjects
      .get<ManageBooksNetworkObject>(NETWORK_OBJECT_ID)
      .then((obj) => {
        if (mounted) setManageBooksApi(obj);
        return undefined;
      })
      .catch((e) => {
        logger.error(
          `manage-books: failed to resolve NetworkObject ${NETWORK_OBJECT_ID}: ${e instanceof Error ? e.message : String(e)}`,
        );
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Seed default projectId on cold-open (main-menu invocation with no
  // active-editor context). Picks the first AllScripture project the wire
  // returns; if there are none we leave projectId empty and the dialog's
  // project Select shows the placeholder.
  useEffect(() => {
    if (projectId || !manageBooksApi) return;
    let cancelled = false;
    manageBooksApi
      .filterProjects({ purpose: 'AllScripture' })
      .then((result) => {
        if (cancelled || projectId) return undefined;
        const first = result.projects[0];
        if (first) setProjectIdLocal(first.projectId);
        return undefined;
      })
      .catch(() => {
        // best-effort
      });
    return () => {
      cancelled = true;
    };
  }, [projectId, manageBooksApi]);

  // ===== PAPI: booksPresent subscription =====================================
  const [booksPresentRaw] = useProjectSetting(
    projectId || undefined,
    'platformScripture.booksPresent',
    BOOKS_PRESENT_DEFAULT,
  );
  const [versificationRaw] = useProjectSetting(
    projectId || undefined,
    'platformScripture.versification',
    0,
  );

  // booksPresent decoded for the active project — the dialog calls
  // loadBooks(projectId) so we cache and serve from this map.
  const activeBooks = useMemo(() => {
    if (typeof booksPresentRaw === 'string') return decodeBooksPresent(booksPresentRaw);
    return [];
  }, [booksPresentRaw]);

  // Per-project per-book lastModified dates sourced from
  // manageBooksApi.getBookComparison. The dialog asks for books via
  // loadBooks(pid) and the result is a ManageBooksDialogBookInfo[] with an
  // optional `lastModified` field. We collect dates as comparison calls land
  // and merge them into the response on the fly, so Copy/Import mode's
  // computeCompareState heuristic (already wired in the dialog) starts
  // producing real `sourceIsNewer`/`sourceIsOlder`/`same`/`new` states.
  const [datesByProject, setDatesByProject] = useState<Record<string, Record<string, string>>>({});

  // Cache books for OTHER projects the dialog asks about (e.g. Copy source,
  // Create model). The dialog's loadBooks is called eagerly on project
  // change; we delegate to a per-project getProjectSetting fetch.
  const [bookCache, setBookCache] = useState<Record<string, ManageBooksDialogBookInfo[]>>({});
  const decorateWithDates = useCallback(
    (pid: string, books: ManageBooksDialogBookInfo[]): ManageBooksDialogBookInfo[] => {
      const dates = datesByProject[pid];
      if (!dates) return books;
      return books.map((b) => (dates[b.id] ? { ...b, lastModified: dates[b.id] } : b));
    },
    [datesByProject],
  );
  const loadBooks = useCallback(
    async (pid: string): Promise<ManageBooksDialogBookInfo[]> => {
      if (pid === projectId) return decorateWithDates(pid, activeBooks);
      if (bookCache[pid]) return decorateWithDates(pid, bookCache[pid]);
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', pid);
        const bp = await pdp.getSetting('platformScripture.booksPresent');
        const decoded = decodeBooksPresent(typeof bp === 'string' ? bp : BOOKS_PRESENT_DEFAULT);
        setBookCache((prev) => ({ ...prev, [pid]: decoded }));
        // Sebastian UX review item 7 (2026-06-12): historically the
        // comparison dates were fetched in a side-effect after this function
        // returned, so the first render showed the books with no status
        // badges, then a second render (triggered by datesByProject updating
        // the decorate ref) repainted them with status. The user perceived
        // that as "books load → status flickers in". We now fetch the
        // comparison synchronously alongside the booksPresent fetch and
        // bake the source dates into the returned books so the first
        // render is already final.
        if (manageBooksApi && projectId) {
          try {
            const cmp = await manageBooksApi.getBookComparison({
              fromProjectId: pid,
              toProjectId: projectId,
            });
            const fromDates: Record<string, string> = {};
            const toDates: Record<string, string> = {};
            cmp.entries.forEach((e) => {
              const bookId = Canon.bookNumberToId(e.bookNum);
              if (!bookId) return;
              if (e.sourceLastModified) fromDates[bookId] = e.sourceLastModified;
              if (e.destLastModified) toDates[bookId] = e.destLastModified;
            });
            setDatesByProject((prev) => ({
              ...prev,
              [pid]: { ...(prev[pid] ?? {}), ...fromDates },
              [projectId]: { ...(prev[projectId] ?? {}), ...toDates },
            }));
            return decoded.map((b) =>
              fromDates[b.id] ? { ...b, lastModified: fromDates[b.id] } : b,
            );
          } catch (cmpErr) {
            logger.warn(
              `manage-books: getBookComparison(${pid}, ${projectId}) inline failed: ${
                cmpErr instanceof Error ? cmpErr.message : String(cmpErr)
              }`,
            );
            // Fall through to undecorated below; the side-channel will fill
            // in dates on a later tick.
          }
        }
        return decorateWithDates(pid, decoded);
      } catch (e) {
        logger.warn(
          `manage-books: loadBooks(${pid}) failed: ${e instanceof Error ? e.message : String(e)}`,
        );
        return [];
      }
    },
    [projectId, activeBooks, bookCache, decorateWithDates, manageBooksApi],
  );

  // Side-channel: whenever the dialog asks about a non-active project (Copy
  // source, Create reference), also fire a getBookComparison(from=other,
  // to=active) so we can populate lastModified for both sides. The dialog's
  // gridItems heuristic (computeCompareState) consumes those dates and
  // produces correct new/newer/older/same labels.
  useEffect(() => {
    if (!manageBooksApi || !projectId) return undefined;
    const otherIds = Object.keys(bookCache);
    if (otherIds.length === 0) return undefined;
    let cancelled = false;
    Promise.all(
      otherIds.map(async (otherId) => {
        try {
          const result = await manageBooksApi.getBookComparison({
            fromProjectId: otherId,
            toProjectId: projectId,
          });
          if (cancelled) return undefined;
          const fromDates: Record<string, string> = {};
          const toDates: Record<string, string> = {};
          result.entries.forEach((e) => {
            const bookId = Canon.bookNumberToId(e.bookNum);
            if (!bookId) return;
            if (e.sourceLastModified) fromDates[bookId] = e.sourceLastModified;
            if (e.destLastModified) toDates[bookId] = e.destLastModified;
          });
          return { otherId, fromDates, toDates };
        } catch (err) {
          logger.warn(
            `manage-books: getBookComparison(${otherId}, ${projectId}) failed: ${
              err instanceof Error ? err.message : String(err)
            }`,
          );
          return undefined;
        }
      }),
    )
      .then((results) => {
        if (cancelled) return undefined;
        const next: Record<string, Record<string, string>> = {};
        let touchedAny = false;
        results.forEach((r) => {
          if (!r) return;
          touchedAny = true;
          next[r.otherId] = r.fromDates;
          next[projectId] = { ...(next[projectId] ?? {}), ...r.toDates };
        });
        if (!touchedAny) return undefined;
        setDatesByProject((prev) => {
          const merged = { ...prev };
          Object.entries(next).forEach(([pid, dates]) => {
            merged[pid] = { ...merged[pid], ...dates };
          });
          return merged;
        });
        return undefined;
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
    // datesByProject deliberately omitted from deps — listing it would re-fire the
    // effect on every comparison response, causing an infinite loop. We accept that
    // the cache check above is a soft-skip; the worst case is one redundant API
    // call per (other, active) pair, which the backend short-circuits via its own
    // caching.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manageBooksApi, projectId, bookCache]);

  // I9: populate the ACTIVE/destination project's own book dates. In pure Import mode no other
  // project is involved, so the side-channel above never fires and datesByProject[projectId] stays
  // empty — leaving the Import grid to compare every file against an `undefined` dest date and
  // label them all "New". We fetch the active project's real file dates via the dedicated
  // getProjectBookDates method: its destLastModified is the real GetLastWriteTime date (unlike
  // parseImportFiles, which stamps UtcNow), and books absent from the project map to null (so they
  // correctly stay "New"). A two-project getBookComparison(active, active) can't be used here — the
  // backend rejects same-project comparisons. Fires once per active project (deps are
  // [manageBooksApi, projectId]); it writes datesByProject via the functional setter without
  // reading it, so there's no need to depend on it and no re-fire loop.
  useEffect(() => {
    if (!manageBooksApi || !projectId) return undefined;
    let cancelled = false;
    manageBooksApi
      .getProjectBookDates(projectId)
      .then((result) => {
        if (cancelled) return undefined;
        const selfDates: Record<string, string> = {};
        result.entries.forEach((e) => {
          const bookId = Canon.bookNumberToId(e.bookNum);
          if (!bookId) return;
          // from===to, so both timestamps are the active project's own real file date.
          const date = e.destLastModified ?? e.sourceLastModified;
          if (date) selfDates[bookId] = date;
        });
        if (Object.keys(selfDates).length === 0) return undefined;
        setDatesByProject((prev) => ({
          ...prev,
          [projectId]: { ...(prev[projectId] ?? {}), ...selfDates },
        }));
        return undefined;
      })
      .catch((err) => {
        logger.warn(
          `manage-books: getProjectBookDates(${projectId}) failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
        return undefined;
      });
    return () => {
      cancelled = true;
    };
  }, [manageBooksApi, projectId]);

  // ===== Versification (per-project) =========================================
  const loadVersification = useCallback(
    async (pid: string): Promise<string> => {
      if (pid === projectId) {
        return typeof versificationRaw === 'number' || typeof versificationRaw === 'string'
          ? String(versificationRaw)
          : '0';
      }
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', pid);
        const v = await pdp.getSetting('platformScripture.versification');
        return v !== undefined ? String(v) : '0';
      } catch {
        return '0';
      }
    },
    [projectId, versificationRaw],
  );

  // ===== loadProjects via filterProjects =====================================
  const loadProjects = useCallback(async (): Promise<ManageBooksDialogProject[]> => {
    if (!manageBooksApi) return [];
    try {
      const result = await manageBooksApi.filterProjects({ purpose: 'AllScripture' });
      // I2: the C# `ProjectSummary` now carries name (short), fullName and versification directly,
      // so this is a single round-trip — no per-project `projectDataProviders.get` + `getSetting`
      // fan-out (which scaled linearly with project count and was the cause of the slow initial
      // load). `platform.name` resolves to `ScrText.Name` server-side, i.e. the same short `name`
      // already on the wire, so there is no separate display name to fetch.
      return result.projects.map((p) => ({
        id: p.projectId,
        shortName: p.name,
        name: p.name,
        // fullName is empty when unset server-side; fall back to the short name.
        fullName: p.fullName.length > 0 ? p.fullName : p.name,
        isEditable: p.isEditable,
        // Forward the isResource flag so the dialog can filter resources out of the Copy "From"
        // picker (licensing). The Create "Based on" picker includes resources (structure-only
        // read, PT9 parity).
        isResource: p.isResource,
        // Versification id (numeric ScrVersType as a string) for the Create "Based on" picker's
        // versification grouping. The localized name is resolved on the dialog side (it owns the
        // localizedStrings → versificationLabelKey map); here we forward the raw id.
        versificationId: p.versification,
      }));
    } catch (e) {
      logger.warn(
        `manage-books: filterProjects failed: ${e instanceof Error ? e.message : String(e)}`,
      );
      return [];
    }
  }, [manageBooksApi]);

  // ===== isProjectShared =====================================================
  const [isSharedProject, setIsSharedProject] = useState(false);
  useEffect(() => {
    if (!manageBooksApi || !projectId) {
      setIsSharedProject(false);
      return;
    }
    let cancelled = false;
    manageBooksApi
      .isProjectShared(projectId)
      .then((shared) => {
        if (!cancelled) setIsSharedProject(shared);
        return undefined;
      })
      .catch(() => {
        if (!cancelled) setIsSharedProject(false);
      });
    return () => {
      cancelled = true;
    };
  }, [manageBooksApi, projectId]);

  // ===== Sidebar projects (via ProjectSelector) ==============================
  // Feeds the sidebar's `<ProjectSelector mode="project">`. We extend the base
  // `ProjectSelectorProject` shape with `isEditable` (sourced from C# `ProjectSummary`) so the
  // dialog can disable Create / Copy / Import / Delete actions when the active target is
  // read-only. ProjectSelector ignores unknown fields, so passing the extended array directly is
  // safe. Source is `manageBooksApi.filterProjects` — the same call `loadProjects` uses, so the
  // sidebar list and the dialog's internal project list stay in lockstep.
  const [sidebarProjects, setSidebarProjects] = useState<readonly SidebarProject[]>([]);
  useEffect(() => {
    if (!manageBooksApi) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const result = await manageBooksApi.filterProjects({ purpose: 'AllScripture' });
        // I2: fullName comes straight off the wire now — no per-project getSetting fan-out.
        const enriched: SidebarProject[] = result.projects.map((p) => ({
          id: p.projectId,
          shortName: p.name,
          fullName: p.fullName.length > 0 ? p.fullName : p.name,
          isEditable: p.isEditable,
        }));
        if (!cancelled) setSidebarProjects(enriched);
      } catch (err) {
        logger.warn(`manage-books: sidebarProjects fetch failed: ${getErrorMessage(err)}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [manageBooksApi]);

  // ===== Open project tabs (for ProjectSelector grouping) ====================
  // The shared `useOpenProjectTabs` hook returns a richer shape (`webViewId`, `webViewType`); map
  // it down to the lighter `ProjectSelectorOpenTab` shape `<ProjectSelector>` consumes. The `scrollGroup`
  // current-reference label is omitted — Manage Books pickers don't surface scroll-group ref
  // tooltips today.
  // Filter to Scripture Editor tabs only — without this, every project-bound tab (Manage Books
  // itself, Checks side panel, etc.) would falsely mark a project as "open".
  const editorWebViewFilter = useCallback(
    (webView: { webViewType: string }) => SCRIPTURE_EDITOR_WEB_VIEW_TYPES.has(webView.webViewType),
    [],
  );
  const allOpenProjectTabs = useOpenProjectTabs(editorWebViewFilter);
  const projectSelectorOpenTabs = useMemo<ProjectSelectorOpenTab[]>(
    () =>
      allOpenProjectTabs.map((tab) => ({
        projectId: tab.projectId,
        scrollGroupId: tab.scrollGroupId,
      })),
    [allOpenProjectTabs],
  );

  // ===== Mutation result routing → toasts ====================================
  const onMutationResult = useCallback((result: MutationResult) => {
    const entries: AlertEntry[] = [...result.errors, ...result.warnings];
    entries.forEach((entry) => {
      const message = entry.caption ? `${entry.caption}: ${entry.text}` : entry.text;
      try {
        // notificationService is exposed on @papi/frontend; per
        // ui-spec-manage-books.md:118 toasts are the canonical surface.
        papi.notifications.send({ message, severity: alertLevelToSeverity(entry.level) });
      } catch (e) {
        logger.warn(
          `manage-books: notifications.send failed for AlertEntry: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    });
  }, []);

  // ===== Mutation handlers ===================================================
  const onCreateBooks = useCallback(
    async (args: {
      projectId: string;
      books: string[];
      method: ManageBooksCreateMethod;
      referenceProjectId?: string;
      estherTemplate?: EstherTemplate;
    }): Promise<MutationResult | undefined> => {
      if (!manageBooksApi) return undefined;
      return manageBooksApi.createBooks({
        projectId: args.projectId,
        bookNumbers: booksToNumbers(args.books),
        creationMethod: createMethodToWire(args.method),
        modelProjectId: args.referenceProjectId,
        estherTemplate: args.estherTemplate,
      });
    },
    [manageBooksApi],
  );

  const onDeleteBooks = useCallback(
    async (args: { projectId: string; books: string[] }): Promise<MutationResult | undefined> => {
      if (!manageBooksApi) return undefined;
      return manageBooksApi.deleteBooks({
        projectId: args.projectId,
        bookNumbers: booksToNumbers(args.books),
      });
    },
    [manageBooksApi],
  );

  const onCopyBooks = useCallback(
    async (args: {
      destProjectId: string;
      sourceProjectId: string;
      books: string[];
      strategy?: ManageBooksCopyStrategy;
    }): Promise<MutationResult | undefined> => {
      if (!manageBooksApi) return undefined;
      // The backend honors `replaceEntireBook`.
      // `strategy === 'nonExistingChapters'` → only chapters that are
      // missing, empty, or scaffolding-only in the destination are written
      // (CopyBooksOrchestrator merge path + UsfmChapterScaffolding). The
      // default + `replaceEntireBooks` route through whole-book replacement.
      return manageBooksApi.copyBooks({
        fromProjectId: args.sourceProjectId,
        toProjectId: args.destProjectId,
        bookNumbers: booksToNumbers(args.books),
        replaceEntireBook: args.strategy !== 'nonExistingChapters',
      });
    },
    [manageBooksApi],
  );

  const onImportBooks = useCallback(
    async (args: {
      projectId: string;
      files: Record<string, ManageBooksImportFile>;
      strategy: ManageBooksImportStrategy;
    }): Promise<MutationResult | undefined> => {
      if (!manageBooksApi) return undefined;
      const fileEntries = componentToImportFileEntries(args.files);
      return manageBooksApi.importBooks({
        projectId: args.projectId,
        files: fileEntries,
        replaceEntireBook: args.strategy === 'replaceEntireBooks',
      });
    },
    [manageBooksApi],
  );

  // ===== Cross-launch: Scripture Reference Settings (DEF-UI-006 — ADDRESSED 2026-05-03)
  // The `platform.openSettings` command opens the platform settings tab and reads the
  // calling web-view's `projectId` via `getOpenWebViewDefinition(webViewId)` — see
  // `src/renderer/services/web-view.service-host.ts:openSettingsTab`. Passing
  // `globalThis.webViewId` therefore scopes the resulting settings tab to the
  // currently-selected manage-books project (we keep the saved-definition's projectId
  // in sync via `updateWebViewDefinition` above).
  const onOpenScriptureReferenceSettings = useCallback(() => {
    papi.commands
      .sendCommand('platform.openSettings', globalThis.webViewId)
      .catch((e) =>
        logger.warn(
          `manage-books: platform.openSettings failed: ${e instanceof Error ? e.message : String(e)}`,
        ),
      );
  }, []);

  // ===== Cross-launch stubs (DEF-UI-007/008) =================================
  // Project canons and Registry have no PT10 cross-launch target yet. Per Phase 3 UI
  // Decision 13 (2026-05-04), the wiring layer simply omits the `onOpenProjectCanons` /
  // `onOpenRegistry` props from <ManageBooksDialog>. The dialog renders each button as
  // disabled with a "Not yet available — coming soon" tooltip on hover (the convention
  // used elsewhere in the dialog for not-yet-implemented affordances). When real
  // platform commands ship, replace the omission with `useCallback` handlers that route
  // to those commands — the buttons will auto-enable and the disabled+tooltip stub
  // disappears.

  // ===== File picker stub (DEF-UI-009 / FN-010 spike) ========================
  // No platform multi-file picker exists in PT10. The component falls back to
  // a native `<input type="file" multiple>` ref-click triggered by the visible
  // "Choose files…" / "Add files…" buttons. Per Sebastian review item 23
  // (2026-05-06), Import mode no longer auto-opens the picker on entry —
  // the user clicks the button explicitly.
  //
  // Tracked as DEF-UI-009 / FN-010 in deferred-functionality.md. When the
  // future `papi.dialogs.selectFiles({ multi, filters })` PAPI ships, wire
  // it in here as `const onPickImportFiles = async () => papi.dialogs.selectFiles(...)`.

  // ===== Greek Esther picker (WP-002) — modal-on-modal in-process render =====
  // The picker is a Radix `<Dialog>` rendered as a peer of the parent ManageBooksDialog inside
  // this same web view. Modal-on-modal stacking, focus trap, and Escape key are Radix Dialog
  // defaults. Promise resolution happens locally: when `onOpenEstherPicker` is invoked we open
  // the picker and stash the awaiting Promise's `resolve` in a ref; the picker's onSelect or
  // onCancel calls that resolver and clears the ref.
  //
  // WP-002 architectural decision: in-process render rather than `papi.webViews.openWebView`.
  // Rationale: the parent dialog awaits a `Promise<EstherTemplate | undefined>` returned from
  // this callback. In-process resolution is one ref + one useState; the cross-iframe alternative
  // would need a PAPI command + correlation ID + state subscription. Functional tests
  // (manage-books-functional-WP-002.spec.ts) also assert the picker renders inside the
  // manage-books iframe via `frame.getByRole('dialog', ...)`, which requires same-iframe render.
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerResolverRef = useRef<((value: GreekEstherTemplate | undefined) => void) | undefined>(
    undefined,
  );

  const onOpenEstherPicker = useCallback(async (): Promise<EstherTemplate | undefined> => {
    return new Promise<GreekEstherTemplate | undefined>((resolve) => {
      // If a previous picker invocation is somehow still pending (defensive — shouldn't happen
      // because the parent dialog awaits the promise sequentially), resolve it as cancelled
      // before starting a new one so we never leak an unresolved promise.
      if (pickerResolverRef.current) pickerResolverRef.current(undefined);
      pickerResolverRef.current = resolve;
      setPickerOpen(true);
    });
  }, []);

  const handlePickerSelect = useCallback((template: GreekEstherTemplate) => {
    setPickerOpen(false);
    const resolver = pickerResolverRef.current;
    pickerResolverRef.current = undefined;
    resolver?.(template);
  }, []);

  const handlePickerCancel = useCallback(() => {
    setPickerOpen(false);
    const resolver = pickerResolverRef.current;
    pickerResolverRef.current = undefined;
    resolver?.(undefined);
  }, []);

  // ===== Open/close ==========================================================
  // The web-view's only close affordance is the dock-tab X in the platform-
  // managed tab header. The in-component Cancel/Close buttons that previously
  // routed through `onOpenChange(false)` were removed (UI polish 2026-05-03)
  // because they duplicated the dock-tab X. ManageBooksDialog no longer accepts
  // an `onOpenChange` prop — sub-modals use local state setters internally.

  return (
    <>
      <ManageBooksDialog
        open
        projectId={projectId}
        onProjectIdChange={setProjectIdLocal}
        loadProjects={loadProjects}
        loadBooks={loadBooks}
        loadVersification={loadVersification}
        onOpenScriptureReferenceSettings={onOpenScriptureReferenceSettings}
        onCreateBooks={onCreateBooks}
        onDeleteBooks={onDeleteBooks}
        onCopyBooks={onCopyBooks}
        onImportBooks={onImportBooks}
        onMutationResult={onMutationResult}
        onOpenEstherPicker={onOpenEstherPicker}
        isSharedProject={isSharedProject}
        localizedStrings={localizedStrings}
        sidebarProjects={sidebarProjects}
        openTabs={projectSelectorOpenTabs}
        projectSelectorLocalizedStrings={projectSelectorLocalizedStrings}
      />
      <GreekEstherTemplatePicker
        open={pickerOpen}
        onSelect={handlePickerSelect}
        onCancel={handlePickerCancel}
        localizedStrings={pickerLocalizedStrings}
      />
    </>
  );
};
