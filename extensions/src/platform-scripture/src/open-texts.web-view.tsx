/**
 * === NEW IN PT10 === Reason: React web view for the Open Texts dialog (SCR-003). PT9 equivalent:
 * SelectScrTextsForm.cs Maps to: UI-PKG-002, CAP-UI-003
 */
import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from 'lucide-react';
import {
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from 'platform-bible-react';
import { LocalizeKey, getErrorMessage } from 'platform-bible-utils';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import SettingSaver from './components/setting-saver.component';

// #region Types

/** Extended project info for the Open dialog */
interface ProjectInfo {
  name: string;
  id: string;
  fullName: string;
  language: string;
  versification: string;
  projectType: string;
  isResourceProject: boolean;
  isMarbleResource: boolean;
  isDictionary: boolean;
  isSourceLanguageText: boolean;
  isNoteType: boolean;
  isXmlResource: boolean;
  canOpen: boolean;
}

/** Open As window type */
type OpenAsType = 'Floating' | 'Tab' | 'Panel' | 'TextCollection' | 'Autohide';

/** Sort column keys */
type SortColumn = 'projectType' | 'name' | 'fullName' | 'language' | 'versification';
type SortDirection = 'ascending' | 'descending';

/** Saved selection (combined sets + lists) */
interface SavedSelection {
  name: string;
  source: 'set' | 'list';
  textNames: string[];
}

// #endregion

// #region Filter State Reducer

interface FilterState {
  projects: boolean;
  resources: boolean;
  enhancedResources: boolean;
  sourceLanguages: boolean;
  dictionaries: boolean;
  consultantNotes: boolean;
}

type FilterAction =
  | { type: 'TOGGLE'; filter: keyof FilterState }
  | { type: 'ENTER_TC_MODE'; previousNonTcState: Partial<FilterState> }
  | { type: 'EXIT_TC_MODE'; restoreState: Partial<FilterState> };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, [action.filter]: !state[action.filter] };
    case 'ENTER_TC_MODE':
      return {
        ...state,
        enhancedResources: false,
        sourceLanguages: false,
        dictionaries: false,
        consultantNotes: false,
      };
    case 'EXIT_TC_MODE':
      return {
        ...state,
        enhancedResources: action.restoreState.enhancedResources ?? false,
        sourceLanguages: action.restoreState.sourceLanguages ?? false,
        dictionaries: action.restoreState.dictionaries ?? false,
        consultantNotes: action.restoreState.consultantNotes ?? false,
      };
    default:
      return state;
  }
}

// #endregion

// #region Filter Logic (EXT-012)

function matchesFilter(project: ProjectInfo, filters: FilterState): boolean {
  if (filters.projects && !project.isResourceProject && !project.isNoteType) return true;
  if (
    filters.resources &&
    project.isResourceProject &&
    !project.isMarbleResource &&
    !project.isDictionary &&
    !project.isNoteType
  )
    return true;
  if (filters.enhancedResources && project.isMarbleResource) return true;
  if (filters.sourceLanguages && project.isSourceLanguageText) return true;
  if (
    filters.dictionaries &&
    (project.isDictionary || (project.isXmlResource && project.isDictionary))
  )
    return true;
  if (filters.consultantNotes && project.isNoteType) return true;
  return false;
}

function matchesTextFilter(project: ProjectInfo, text: string): boolean {
  if (!text) return true;
  const lower = text.toLowerCase();
  return (
    project.name.toLowerCase().includes(lower) ||
    project.fullName.toLowerCase().includes(lower) ||
    project.language.toLowerCase().includes(lower)
  );
}

// #endregion

// #region Type guards

function isProjectInfo(item: unknown): item is ProjectInfo {
  if (typeof item !== 'object' || !item) return false;
  if (!('name' in item) || !('id' in item)) return false;
  const { name, id } = item;
  return typeof name === 'string' && typeof id === 'string';
}

function parseProjectInfoArray(data: unknown): ProjectInfo[] {
  if (!Array.isArray(data)) return [];
  return data.filter(isProjectInfo).map((p) => ({
    name: p.name ?? '',
    id: p.id ?? '',
    fullName: (p as ProjectInfo).fullName ?? '',
    language: (p as ProjectInfo).language ?? '',
    versification: (p as ProjectInfo).versification ?? '',
    projectType: (p as ProjectInfo).projectType ?? '',
    isResourceProject: Boolean((p as ProjectInfo).isResourceProject),
    isMarbleResource: Boolean((p as ProjectInfo).isMarbleResource),
    isDictionary: Boolean((p as ProjectInfo).isDictionary),
    isSourceLanguageText: Boolean((p as ProjectInfo).isSourceLanguageText),
    isNoteType: Boolean((p as ProjectInfo).isNoteType),
    isXmlResource: Boolean((p as ProjectInfo).isXmlResource),
    canOpen: (p as ProjectInfo).canOpen !== false,
  }));
}

function parseSavedSelectionArray(data: unknown): SavedSelection[] {
  if (!Array.isArray(data)) return [];
  return data.filter(
    (item): item is SavedSelection =>
      typeof item === 'object' &&
      item !== null &&
      'name' in item &&
      typeof (item as SavedSelection).name === 'string' &&
      'textNames' in item &&
      Array.isArray((item as SavedSelection).textNames),
  );
}

// #endregion

// #region Localization

const OPEN_DIALOG_STRING_KEYS: LocalizeKey[] = [
  '%openDialog_title%',
  '%openDialog_showLabel%',
  '%openDialog_projects%',
  '%openDialog_resources%',
  '%openDialog_enhancedResources%',
  '%openDialog_sourceLanguages%',
  '%openDialog_dictionaries%',
  '%openDialog_consultantNotes%',
  '%openDialog_searchPlaceholder%',
  '%openDialog_showVersification%',
  '%openDialog_openAs%',
  '%openDialog_noFilters%',
  '%openDialog_savedSelections%',
  '%openDialog_tcPanel%',
  '%openDialog_floating%',
  '%openDialog_tab%',
  '%openDialog_panel%',
  '%openDialog_autohide%',
  '%openDialog_colType%',
  '%openDialog_colName%',
  '%openDialog_colFullName%',
  '%openDialog_colLanguage%',
  '%openDialog_colVersification%',
  '%openDialog_replaceConfirm%',
  '%openDialog_savedSelections_ariaLabel%',
  '%openDialog_save_ariaLabel%',
  '%openDialog_delete_ariaLabel%',
  '%general_ok%',
  '%general_cancel%',
  '%general_yes%',
  '%general_no%',
];

// #endregion

// #region Open As options

const OPEN_AS_OPTIONS: { value: OpenAsType; labelKey: LocalizeKey }[] = [
  { value: 'Floating', labelKey: '%openDialog_floating%' },
  { value: 'Tab', labelKey: '%openDialog_tab%' },
  { value: 'Panel', labelKey: '%openDialog_panel%' },
  { value: 'TextCollection', labelKey: '%openDialog_tcPanel%' },
  { value: 'Autohide', labelKey: '%openDialog_autohide%' },
];

// #endregion

global.webViewComponent = function OpenTextsWebView({ useWebViewState }: WebViewProps) {
  // #region State

  const [localizedStrings] = useLocalizedStrings(useMemo(() => OPEN_DIALOG_STRING_KEYS, []));

  const [showOpenModeSelectorStr] = useWebViewState<string>('showOpenModeSelector', 'true');
  const showOpenModeSelector = showOpenModeSelectorStr === 'true';

  const [allTexts, setAllTexts] = useState<ProjectInfo[]>([]);
  const [filters, dispatchFilters] = useReducer(filterReducer, {
    projects: true,
    resources: true,
    enhancedResources: false,
    sourceLanguages: false,
    dictionaries: false,
    consultantNotes: false,
  });
  const [nameFilter, setNameFilter] = useState('');
  const [showVersification, setShowVersification] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');
  const [openAsType, setOpenAsType] = useState<OpenAsType>('Panel');
  const [savedSelections, setSavedSelections] = useState<SavedSelection[]>([]);
  const [savedSelectionName, setSavedSelectionName] = useState('');
  const [showOverwriteDialog, setShowOverwriteDialog] = useState(false);

  // Store non-TC filter state for restoration when exiting TC mode
  const [preTcFilters, setPreTcFilters] = useState<Partial<FilterState>>({});

  const isTcMode = openAsType === 'TextCollection';

  // #endregion

  // #region Data loading (PAPI)

  useEffect(() => {
    async function loadData() {
      try {
        const textsResult = await papi.commands.sendCommand(
          'platformScripture.filterEligibleTexts',
        );
        const texts = parseProjectInfoArray(textsResult);

        // Get project types for display
        const textsWithTypes = await Promise.all(
          texts.map(async (t) => {
            try {
              const projectType = await papi.commands.sendCommand(
                'platformScripture.getProjectType',
                t.id,
              );
              return {
                ...t,
                projectType: typeof projectType === 'string' ? projectType : t.projectType,
              };
            } catch {
              return t;
            }
          }),
        );

        setAllTexts(textsWithTypes);
      } catch (error) {
        logger.error(`OpenTextsDialog: Error loading data: ${getErrorMessage(error)}`);
      }
    }

    loadData();
  }, []);

  // Load saved selections (combined sets + lists)
  useEffect(() => {
    async function loadSavedSelections() {
      try {
        const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
        const selections = parseSavedSelectionArray(result);
        setSavedSelections(selections);
      } catch (error) {
        logger.debug(`OpenTextsDialog: Could not load saved selections: ${getErrorMessage(error)}`);
      }
    }

    loadSavedSelections();
  }, []);

  // #endregion

  // #region Derived: visible projects

  const allFiltersOff = useMemo(
    () =>
      !filters.projects &&
      !filters.resources &&
      !filters.enhancedResources &&
      !filters.sourceLanguages &&
      !filters.dictionaries &&
      !filters.consultantNotes,
    [filters],
  );

  const visibleProjects = useMemo(() => {
    if (allFiltersOff) return [];

    let filtered = allTexts.filter(
      (p) => matchesFilter(p, filters) && matchesTextFilter(p, nameFilter),
    );

    // Sort
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortColumn] ?? '';
      const bVal = b[sortColumn] ?? '';
      const cmp = aVal.localeCompare(bVal);
      return sortDirection === 'ascending' ? cmp : -cmp;
    });

    return filtered;
  }, [allTexts, filters, nameFilter, sortColumn, sortDirection, allFiltersOff]);

  // #endregion

  // #region Sort

  const handleSort = useCallback(
    (column: SortColumn) => {
      if (sortColumn === column) {
        setSortDirection((d) => (d === 'ascending' ? 'descending' : 'ascending'));
      } else {
        setSortColumn(column);
        setSortDirection('ascending');
      }
    },
    [sortColumn],
  );

  const buildSortIcon = useCallback(
    (column: SortColumn) => {
      if (sortColumn !== column) return <ChevronsUpDown className="tw-pl-1" size={14} />;
      return sortDirection === 'ascending' ? (
        <ChevronUp className="tw-pl-1" size={14} />
      ) : (
        <ChevronDown className="tw-pl-1" size={14} />
      );
    },
    [sortColumn, sortDirection],
  );

  // #endregion

  // #region Selection

  const handleRowClick = useCallback((project: ProjectInfo, event: React.MouseEvent) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (event.ctrlKey || event.metaKey) {
        if (next.has(project.id)) next.delete(project.id);
        else next.add(project.id);
      } else {
        next.clear();
        next.add(project.id);
      }
      return next;
    });
  }, []);

  const handleRowDoubleClick = useCallback(
    (project: ProjectInfo) => {
      if (!project.canOpen) return;
      // Double-click = OK with this single project
      setSelectedIds(new Set([project.id]));
      logger.info(
        `OpenTextsDialog OK (double-click): ${JSON.stringify({ action: 'ok', selections: [project], openAsType })}`,
      );
    },
    [openAsType],
  );

  // #endregion

  // #region Open As change (TC mode)

  const handleOpenAsChange = useCallback(
    (value: string) => {
      const newType = value as OpenAsType;
      const wasTcMode = openAsType === 'TextCollection';
      const willBeTcMode = newType === 'TextCollection';

      if (!wasTcMode && willBeTcMode) {
        // Entering TC mode: save current non-TC filter state, then hide 4 buttons
        setPreTcFilters({
          enhancedResources: filters.enhancedResources,
          sourceLanguages: filters.sourceLanguages,
          dictionaries: filters.dictionaries,
          consultantNotes: filters.consultantNotes,
        });
        dispatchFilters({ type: 'ENTER_TC_MODE', previousNonTcState: {} });
      } else if (wasTcMode && !willBeTcMode) {
        // Exiting TC mode: restore previous filter state
        dispatchFilters({ type: 'EXIT_TC_MODE', restoreState: preTcFilters });
      }

      setOpenAsType(newType);
    },
    [openAsType, filters, preTcFilters],
  );

  // #endregion

  // #region Saved selections

  const handleSaveSelection = useCallback(
    async (name: string) => {
      const existing = savedSelections.find((s) => s.name === name);
      if (existing) {
        setSavedSelectionName(name);
        setShowOverwriteDialog(true);
        return;
      }
      try {
        const selectedProjects = allTexts.filter((t) => selectedIds.has(t.id));
        const textNames = selectedProjects.map((p) => p.name);

        if (isTcMode) {
          await papi.commands.sendCommand('platformScripture.saveTextList', {
            name,
            scrTextNames: textNames,
            scrProjectIndex: 0,
            hebGrkIndex: -1,
          });
        } else {
          await papi.commands.sendCommand('platformScripture.saveTextList', {
            name,
            scrTextNames: textNames,
            scrProjectIndex: 0,
            hebGrkIndex: -1,
          });
        }
        const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
        setSavedSelections(parseSavedSelectionArray(result));
      } catch (error) {
        logger.error(`OpenTextsDialog: Error saving selection: ${getErrorMessage(error)}`);
      }
    },
    [allTexts, selectedIds, savedSelections, isTcMode],
  );

  const handleConfirmOverwrite = useCallback(async () => {
    setShowOverwriteDialog(false);
    try {
      const selectedProjects = allTexts.filter((t) => selectedIds.has(t.id));
      const textNames = selectedProjects.map((p) => p.name);

      await papi.commands.sendCommand('platformScripture.saveTextList', {
        name: savedSelectionName,
        scrTextNames: textNames,
        scrProjectIndex: 0,
        hebGrkIndex: -1,
      });
      const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
      setSavedSelections(parseSavedSelectionArray(result));
    } catch (error) {
      logger.error(`OpenTextsDialog: Error saving selection: ${getErrorMessage(error)}`);
    }
  }, [allTexts, selectedIds, savedSelectionName]);

  const handleDeleteSelection = useCallback(async (name: string) => {
    try {
      await papi.commands.sendCommand('platformScripture.deleteTextList', name);
      const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
      setSavedSelections(parseSavedSelectionArray(result));
    } catch (error) {
      logger.error(`OpenTextsDialog: Error deleting selection: ${getErrorMessage(error)}`);
    }
  }, []);

  const handleSelectSavedSelection = useCallback(
    (name: string) => {
      const selection = savedSelections.find((s) => s.name === name);
      if (!selection) return;

      // Resolve names to project IDs
      const nameToProject = new Map<string, ProjectInfo>();
      allTexts.forEach((t) => nameToProject.set(t.name, t));

      const resolvedIds = new Set<string>();
      selection.textNames.forEach((textName) => {
        const project = nameToProject.get(textName);
        if (project) resolvedIds.add(project.id);
      });

      setSelectedIds(resolvedIds);
      setSavedSelectionName(name);
    },
    [allTexts, savedSelections],
  );

  // #endregion

  // #region Dialog actions

  const selectedProjects = useMemo(
    () => allTexts.filter((t) => selectedIds.has(t.id)),
    [allTexts, selectedIds],
  );

  const isOkEnabled = useMemo(
    () => selectedProjects.length > 0 && selectedProjects.every((p) => p.canOpen),
    [selectedProjects],
  );

  const handleOk = useCallback(() => {
    logger.info(
      `OpenTextsDialog OK: ${JSON.stringify({ action: 'ok', selections: selectedProjects, openAsType })}`,
    );
  }, [selectedProjects, openAsType]);

  const handleCancel = useCallback(() => {
    logger.info('OpenTextsDialog Cancel');
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && isOkEnabled) {
        handleOk();
      } else if (event.key === 'Escape') {
        handleCancel();
      }
    },
    [handleOk, handleCancel, isOkEnabled],
  );

  // #endregion

  // #region Derived state

  const savedSelectionNames = useMemo(() => savedSelections.map((s) => s.name), [savedSelections]);

  // Filter button definitions
  const filterButtons: {
    key: keyof FilterState;
    labelKey: LocalizeKey;
    hiddenInTcMode: boolean;
  }[] = useMemo(
    () => [
      { key: 'projects', labelKey: '%openDialog_projects%', hiddenInTcMode: false },
      { key: 'resources', labelKey: '%openDialog_resources%', hiddenInTcMode: false },
      {
        key: 'enhancedResources',
        labelKey: '%openDialog_enhancedResources%',
        hiddenInTcMode: true,
      },
      { key: 'sourceLanguages', labelKey: '%openDialog_sourceLanguages%', hiddenInTcMode: true },
      { key: 'dictionaries', labelKey: '%openDialog_dictionaries%', hiddenInTcMode: true },
      { key: 'consultantNotes', labelKey: '%openDialog_consultantNotes%', hiddenInTcMode: true },
    ],
    [],
  );

  // #endregion

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="pr-twp open-texts-dialog"
      data-testid="open-texts-dialog"
      onKeyDown={handleKeyDown}
    >
      {/* Filter area */}
      {showOpenModeSelector && (
        <div className="open-texts-filter-area">
          <div className="open-texts-filter-buttons">
            <Label className="tw-mr-2 tw-font-semibold">
              {localizedStrings['%openDialog_showLabel%']}
            </Label>
            {filterButtons.map((fb) => {
              if (fb.hiddenInTcMode && isTcMode) return null;
              return (
                <Button
                  key={fb.key}
                  type="button"
                  variant={filters[fb.key] ? 'default' : 'outline'}
                  size="sm"
                  className={cn('open-texts-toggle-button', filters[fb.key] && 'pressed')}
                  onClick={() => dispatchFilters({ type: 'TOGGLE', filter: fb.key })}
                  aria-pressed={filters[fb.key]}
                  aria-label={localizedStrings[fb.labelKey]}
                >
                  {localizedStrings[fb.labelKey]}
                </Button>
              );
            })}
          </div>
          <div className="open-texts-search-row">
            <div className="tw-relative tw-flex-1">
              <Search className="tw-absolute tw-left-2.5 tw-top-2.5 tw-h-4 tw-w-4 tw-text-muted-foreground" />
              <Input
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder={localizedStrings['%openDialog_searchPlaceholder%']}
                aria-label={localizedStrings['%openDialog_searchPlaceholder%']}
                className="tw-pl-9"
              />
            </div>
            <div className="tw-flex tw-items-center tw-gap-2">
              <Checkbox
                id="show-versification"
                checked={showVersification}
                onCheckedChange={(checked) => setShowVersification(checked === true)}
              />
              <Label htmlFor="show-versification" className="tw-cursor-pointer tw-text-sm">
                {localizedStrings['%openDialog_showVersification%']}
              </Label>
            </div>
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="open-texts-list-area">
        {allFiltersOff ? (
          <div className="open-texts-no-filters-overlay">
            <Label className="tw-text-muted-foreground">
              {localizedStrings['%openDialog_noFilters%']}
            </Label>
          </div>
        ) : (
          <div className="open-texts-list-container">
            <Table stickyHeader className="open-texts-table">
              <TableHeader stickyHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('projectType')} style={{ width: '20%' }}>
                    <div className="tw-flex tw-cursor-pointer tw-items-center">
                      <span>{localizedStrings['%openDialog_colType%']}</span>
                      {buildSortIcon('projectType')}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('name')} style={{ width: '20%' }}>
                    <div className="tw-flex tw-cursor-pointer tw-items-center">
                      <span>{localizedStrings['%openDialog_colName%']}</span>
                      {buildSortIcon('name')}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('fullName')} style={{ width: '40%' }}>
                    <div className="tw-flex tw-cursor-pointer tw-items-center">
                      <span>{localizedStrings['%openDialog_colFullName%']}</span>
                      {buildSortIcon('fullName')}
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort('language')} style={{ width: '20%' }}>
                    <div className="tw-flex tw-cursor-pointer tw-items-center">
                      <span>{localizedStrings['%openDialog_colLanguage%']}</span>
                      {buildSortIcon('language')}
                    </div>
                  </TableHead>
                  {showVersification && (
                    <TableHead onClick={() => handleSort('versification')} style={{ width: '15%' }}>
                      <div className="tw-flex tw-cursor-pointer tw-items-center">
                        <span>{localizedStrings['%openDialog_colVersification%']}</span>
                        {buildSortIcon('versification')}
                      </div>
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className={cn(
                      'tw-cursor-pointer',
                      selectedIds.has(project.id) && 'tw-bg-muted/50',
                      !project.canOpen && 'open-texts-row-inaccessible',
                    )}
                    onClick={(e) => handleRowClick(project, e)}
                    onDoubleClick={() => handleRowDoubleClick(project)}
                    aria-selected={selectedIds.has(project.id)}
                    aria-disabled={!project.canOpen}
                  >
                    <TableCell>{project.projectType}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.fullName}</TableCell>
                    <TableCell>{project.language}</TableCell>
                    {showVersification && <TableCell>{project.versification}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Footer: saved selections + Open As + OK/Cancel */}
      <div className="open-texts-footer">
        <div className="open-texts-footer-left">
          <SettingSaver
            savedNames={savedSelectionNames}
            selectedName={savedSelectionName}
            onSelect={handleSelectSavedSelection}
            onSave={handleSaveSelection}
            onDelete={handleDeleteSelection}
            placeholder={localizedStrings['%openDialog_savedSelections%']}
            ariaLabel={localizedStrings['%openDialog_savedSelections_ariaLabel%']}
            saveAriaLabel={localizedStrings['%openDialog_save_ariaLabel%']}
            deleteAriaLabel={localizedStrings['%openDialog_delete_ariaLabel%']}
          />
        </div>

        {showOpenModeSelector && (
          <div className="open-texts-open-as">
            <Label className="tw-text-sm tw-font-semibold tw-whitespace-nowrap">
              {localizedStrings['%openDialog_openAs%']}
            </Label>
            <Select value={openAsType} onValueChange={handleOpenAsChange}>
              <SelectTrigger
                className="tw-w-48"
                aria-label={localizedStrings['%openDialog_openAs%']}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OPEN_AS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {localizedStrings[option.labelKey]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="open-texts-footer-actions">
          <Button type="button" variant="default" disabled={!isOkEnabled} onClick={handleOk}>
            {localizedStrings['%general_ok%']}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {localizedStrings['%general_cancel%']}
          </Button>
        </div>
      </div>

      {/* Overwrite confirmation overlay */}
      {showOverwriteDialog && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-background/80">
          <div className="tw-max-w-sm tw-rounded-lg tw-border tw-border-border tw-bg-background tw-p-6">
            <Label className="tw-mb-4 tw-block tw-text-base tw-font-semibold">
              {localizedStrings['%openDialog_replaceConfirm%']}
            </Label>
            <div className="tw-flex tw-justify-end tw-gap-2">
              <Button type="button" variant="default" onClick={handleConfirmOverwrite}>
                {localizedStrings['%general_yes%']}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowOverwriteDialog(false)}>
                {localizedStrings['%general_no%']}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
