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
import type { ProjectSelectorProject } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import {
  AlertEntry,
  EstherTemplate,
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
  projects: { projectId: string; name: string; projectType: string; isEditable: boolean }[];
};

/**
 * Wire-shape of the manage-books NetworkObject as seen by the React layer. The methods listed here
 * are the ones we actually call in this wiring pass — not all 13 backend methods need a TS
 * signature for the dialog to function.
 */
interface ManageBooksNetworkObject {
  filterProjects: (input: {
    purpose: string;
    sourceProjectType?: string;
  }) => Promise<ProjectListResult>;
  isProjectShared: (projectId: string) => Promise<boolean>;
  createBooks: (request: {
    projectId: string;
    bookNumbers: number[];
    creationMethod: string;
    modelProjectId?: string;
    estherTemplate?: string;
  }) => Promise<MutationResult>;
  deleteBooks: (request: { projectId: string; bookNumbers: number[] }) => Promise<MutationResult>;
  copyBooks: (request: {
    fromProjectId: string;
    toProjectId: string;
    bookNumbers: number[];
  }) => Promise<MutationResult>;
  importBooks: (input: {
    projectId: string;
    files: ImportFileEntry[];
    replaceEntireBook: boolean;
  }) => Promise<MutationResult>;
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

  const [projectId, setProjectIdLocal] = useState<string>(
    () => persistedProjectId || initialProjectId || '',
  );

  // Sync local → persisted whenever projectId changes.
  // Theme C wiring: if the dialog opened with no project context (main-menu
  // invocation), seed the projectId from the first available scripture project
  // once the manage-books NetworkObject resolves. The setter is a no-op when
  // projectId is already set so this only fires for the cold-open case.
  useEffect(() => {
    if (projectId && projectId !== persistedProjectId) {
      setPersistedProjectId(projectId);
      // Also update the dock-tab title to reflect the new project — keeps
      // the platform tab label aligned with the in-dialog header. The PAPI
      // helper is synchronous (returns boolean: did the update apply); a
      // false return is non-fatal so we just log it.
      try {
        const ok = updateWebViewDefinition({ projectId });
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
    }
  }, [projectId, persistedProjectId, setPersistedProjectId, updateWebViewDefinition]);

  // Pull all the localization strings the dialog + picker need in one batch. Including the
  // picker keys here ensures the inline-rendered picker reads from the same string map and
  // localization fetches happen as a single round-trip.
  const stringKeys = useMemo(
    () => [...MANAGE_BOOKS_DIALOG_STRING_KEYS, ...GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS],
    [],
  );
  const [localizedStrings] = useLocalizedStrings(stringKeys);

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

  // Cache books for OTHER projects the dialog asks about (e.g. Copy source,
  // Create model). The dialog's loadBooks is called eagerly on project
  // change; we delegate to a per-project getProjectSetting fetch.
  const [bookCache, setBookCache] = useState<Record<string, ManageBooksDialogBookInfo[]>>({});
  const loadBooks = useCallback(
    async (pid: string): Promise<ManageBooksDialogBookInfo[]> => {
      if (pid === projectId) return activeBooks;
      if (bookCache[pid]) return bookCache[pid];
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', pid);
        const bp = await pdp.getSetting('platformScripture.booksPresent');
        const decoded = decodeBooksPresent(typeof bp === 'string' ? bp : BOOKS_PRESENT_DEFAULT);
        setBookCache((prev) => ({ ...prev, [pid]: decoded }));
        return decoded;
      } catch (e) {
        logger.warn(
          `manage-books: loadBooks(${pid}) failed: ${e instanceof Error ? e.message : String(e)}`,
        );
        return [];
      }
    },
    [projectId, activeBooks, bookCache],
  );

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
      return Promise.all(
        result.projects.map(async (p) => {
          // The C# `ProjectSummary.Name` is `ScrText.Name` — the project's
          // short name (e.g. "ESVUS16", "MP1", 3-8 chars in practice). That's
          // exactly what the dialog wants for `shortName`. For the longer
          // display `name` we ask the project data provider's `platform.name`
          // setting (typically the user-friendly name); when that's
          // unavailable we fall back to the short name.
          let displayName = p.name;
          try {
            const pdp = await papi.projectDataProviders.get('platform.base', p.projectId);
            // platform.name is typed as `string | undefined` at runtime
            // (the setting may not be set on every project); coerce conservatively.
            const nameSetting = await pdp.getSetting('platform.name');
            displayName = typeof nameSetting === 'string' ? nameSetting : p.name;
          } catch {
            // fall through with wire-name as display
          }
          return { id: p.projectId, shortName: p.name, name: displayName };
        }),
      );
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
  // The rebuilt sidebar uses the cherry-picked `<ProjectSelector>` (commit `555de7cfdd`)
  // for the project picker. ProjectSelector consumes a richer `ProjectSelectorProject`
  // shape than `ManageBooksDialogProject`, so we wrap `manageBooksApi.filterProjects` —
  // the same source the original `loadProjects` callback uses, ensuring the sidebar list
  // and the dialog's internal project list stay in lockstep (e.g. ESVUS16 / shared
  // scripture projects show up in both).
  const [sidebarProjects, setSidebarProjects] = useState<readonly ProjectSelectorProject[]>([]);
  useEffect(() => {
    if (!manageBooksApi) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const result = await manageBooksApi.filterProjects({ purpose: 'AllScripture' });
        const enriched: ProjectSelectorProject[] = await Promise.all(
          result.projects.map(async (p) => {
            // Mirror loadProjects: try platform.fullName for the human-friendly long name; fall
            // back to the wire short name when unavailable.
            let fullName = p.name;
            try {
              const pdp = await papi.projectDataProviders.get('platform.base', p.projectId);
              const fnSetting = await pdp.getSetting('platform.fullName');
              if (typeof fnSetting === 'string' && fnSetting.length > 0) fullName = fnSetting;
            } catch {
              // best-effort; fall through with wire-name as full name
            }
            return { id: p.projectId, shortName: p.name, fullName };
          }),
        );
        if (!cancelled) setSidebarProjects(enriched);
      } catch (err) {
        logger.warn(`manage-books: sidebarProjects fetch failed: ${getErrorMessage(err)}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [manageBooksApi]);

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
    }): Promise<MutationResult | undefined> => {
      if (!manageBooksApi) return undefined;
      return manageBooksApi.copyBooks({
        fromProjectId: args.sourceProjectId,
        toProjectId: args.destProjectId,
        bookNumbers: booksToNumbers(args.books),
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
  // No discovered platform commands ship today; surface info notifications.
  const sendCrossLaunchStub = useCallback(() => {
    const message =
      localizedStrings['%manageBooks_crossLaunch_notYetAvailable%'] ??
      'Not yet available — coming soon';
    try {
      papi.notifications.send({ message, severity: 'info' });
    } catch {
      // notification service unavailable in tests — ignore
    }
  }, [localizedStrings]);

  // ===== File picker stub (DEF-UI-009 / FN-010 spike) ========================
  // No platform multi-file picker exists in PT10. We deliberately do NOT
  // pass an `onPickImportFiles` prop to the dialog: providing one triggers
  // the component's A8 auto-cancel-to-View-mode flow on `undefined` returns,
  // which would correctly fire when the user *dismisses* a real picker but
  // would incorrectly fire on every Import-mode entry while the picker is
  // unimplemented. With the prop omitted, the component falls back to its
  // native `<input type="file" multiple>` ref-click — Import mode stays
  // sticky and the user can browse via the visible "Choose files…" button.
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
  // The standalone `greek-esther-template-picker.web-view-provider.ts` exists for future callers
  // that want a free-floating dialog but is not on the WP-002 hot path.
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
        onOpenProjectCanons={sendCrossLaunchStub}
        onOpenRegistry={sendCrossLaunchStub}
        onCreateBooks={onCreateBooks}
        onDeleteBooks={onDeleteBooks}
        onCopyBooks={onCopyBooks}
        onImportBooks={onImportBooks}
        onMutationResult={onMutationResult}
        onOpenEstherPicker={onOpenEstherPicker}
        isSharedProject={isSharedProject}
        localizedStrings={localizedStrings}
        sidebarProjects={sidebarProjects}
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
