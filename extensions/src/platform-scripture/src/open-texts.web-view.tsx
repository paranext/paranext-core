import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Button, Input } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import SettingSaver, { SavedItem } from './components/setting-saver.component';

// #region Types

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

interface SavedSelection extends SavedItem {
  name: string;
  source: 'set' | 'list';
  textNames: string[];
}

type OpenAsType = 'Floating' | 'Tab' | 'Panel' | 'TextCollection' | 'Autohide';

type SortKey = 'projectType' | 'name' | 'fullName' | 'language' | 'versification';
type SortDirection = 'ascending' | 'descending';

interface FilterState {
  projects: boolean;
  resources: boolean;
  enhancedResources: boolean;
  sourceLanguages: boolean;
  dictionaries: boolean;
  consultantNotes: boolean;
}

// #endregion

// #region Localization Keys

const OPEN_TEXTS_STRING_KEYS: LocalizeKey[] = [
  '%openTexts_title%',
  '%openTexts_showLabel%',
  '%openTexts_filterProjects%',
  '%openTexts_filterResources%',
  '%openTexts_filterEnhanced%',
  '%openTexts_filterSource%',
  '%openTexts_filterDict%',
  '%openTexts_filterNotes%',
  '%openTexts_searchPlaceholder%',
  '%openTexts_showVersification%',
  '%openTexts_colType%',
  '%openTexts_colName%',
  '%openTexts_colFullName%',
  '%openTexts_colLanguage%',
  '%openTexts_colVersification%',
  '%openTexts_noFiltersMessage%',
  '%openTexts_openAsLabel%',
  '%openTexts_openAsFloating%',
  '%openTexts_openAsTab%',
  '%openTexts_openAsPanel%',
  '%openTexts_openAsTcPanel%',
  '%openTexts_openAsAutohide%',
  '%openTexts_savedSelections%',
  '%openTexts_replaceConfirm%',
  '%openTexts_ariaFilterToggle%',
  '%openTexts_ariaSearchFilter%',
  '%openTexts_ariaSortColumn%',
  '%common_ok%',
  '%common_cancel%',
];

// #endregion

// #region Open As Options

const OPEN_AS_OPTIONS: { label: LocalizeKey; value: OpenAsType }[] = [
  { label: '%openTexts_openAsFloating%', value: 'Floating' },
  { label: '%openTexts_openAsTab%', value: 'Tab' },
  { label: '%openTexts_openAsPanel%', value: 'Panel' },
  { label: '%openTexts_openAsTcPanel%', value: 'TextCollection' },
  { label: '%openTexts_openAsAutohide%', value: 'Autohide' },
];

// #endregion

// #region Sample Data

const SAMPLE_PROJECTS: ProjectInfo[] = [
  {
    name: 'zzz3',
    id: 'proj-001',
    fullName: 'Test Project 3',
    language: 'English',
    versification: 'English',
    projectType: 'Project (Standard)',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'NIV84',
    id: 'res-001',
    fullName: 'NIV 1984',
    language: 'English',
    versification: 'English',
    projectType: 'Resource',
    isResourceProject: true,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'CEVUK',
    id: 'res-002',
    fullName: 'CEV UK Edition',
    language: 'English',
    versification: 'English',
    projectType: 'Resource',
    isResourceProject: true,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'FRA',
    id: 'proj-002',
    fullName: 'Francais Standard',
    language: 'French',
    versification: 'Original',
    projectType: 'Project (Standard)',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'GNTD',
    id: 'res-003',
    fullName: 'Good News Today',
    language: 'English',
    versification: 'English',
    projectType: 'Resource',
    isResourceProject: true,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'MARBLE1',
    id: 'res-enh-001',
    fullName: 'Enhanced Resource 1',
    language: 'English',
    versification: 'English',
    projectType: 'Enhanced Resource',
    isResourceProject: true,
    isMarbleResource: true,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'HBOGNT',
    id: 'res-src-001',
    fullName: 'Hebrew/Greek Original',
    language: 'Hebrew',
    versification: 'Original',
    projectType: 'Source Language Text',
    isResourceProject: true,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: true,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'ENGDICT',
    id: 'dict-001',
    fullName: 'English Dictionary',
    language: 'English',
    versification: '',
    projectType: 'Dictionary',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: true,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'CNOTES',
    id: 'notes-001',
    fullName: 'Consultant Notes',
    language: 'English',
    versification: 'English',
    projectType: 'Consultant Notes',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: true,
    isXmlResource: false,
    canOpen: true,
  },
  {
    name: 'LOCKED',
    id: 'proj-locked',
    fullName: 'Locked Project',
    language: 'English',
    versification: 'English',
    projectType: 'Project (Standard)',
    isResourceProject: false,
    isMarbleResource: false,
    isDictionary: false,
    isSourceLanguageText: false,
    isNoteType: false,
    isXmlResource: false,
    canOpen: false,
  },
];

const SAMPLE_SAVED_SELECTIONS: SavedSelection[] = [
  {
    name: 'English Bibles',
    source: 'set',
    textNames: ['NIV84', 'CEVUK', 'GNTD'],
  },
];

// #endregion

// #region Filter Logic (EXT-012: MatchesFilter)

function matchesTypeFilter(project: ProjectInfo, filters: FilterState): boolean {
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
  if (filters.dictionaries && project.isDictionary) return true;
  if (filters.consultantNotes && project.isNoteType) return true;
  return false;
}

function matchesNameFilter(project: ProjectInfo, nameFilter: string): boolean {
  if (!nameFilter.trim()) return true;
  const search = nameFilter.toLowerCase();
  return (
    project.name.toLowerCase().includes(search) ||
    project.fullName.toLowerCase().includes(search) ||
    project.language.toLowerCase().includes(search)
  );
}

function anyFilterActive(filters: FilterState): boolean {
  return (
    filters.projects ||
    filters.resources ||
    filters.enhancedResources ||
    filters.sourceLanguages ||
    filters.dictionaries ||
    filters.consultantNotes
  );
}

// #endregion

globalThis.webViewComponent = function OpenTextsDialog({ useWebViewState }: WebViewProps) {
  // Localized strings
  const [localizedStrings] = useLocalizedStrings(OPEN_TEXTS_STRING_KEYS);

  const showLabel = localizedStrings['%openTexts_showLabel%'] || 'Show:';
  const filterProjectsLabel = localizedStrings['%openTexts_filterProjects%'] || 'Projects';
  const filterResourcesLabel = localizedStrings['%openTexts_filterResources%'] || 'Resources';
  const filterEnhancedLabel =
    localizedStrings['%openTexts_filterEnhanced%'] || 'Enhanced Resources';
  const filterSourceLabel = localizedStrings['%openTexts_filterSource%'] || 'Source Language Texts';
  const filterDictLabel = localizedStrings['%openTexts_filterDict%'] || 'Dictionaries';
  const filterNotesLabel = localizedStrings['%openTexts_filterNotes%'] || 'Consultant Notes';
  const searchPlaceholder =
    localizedStrings['%openTexts_searchPlaceholder%'] || 'Search for Name or Language';
  const showVersificationLabel =
    localizedStrings['%openTexts_showVersification%'] || 'Show Versification';
  const colTypeLabel = localizedStrings['%openTexts_colType%'] || 'Type';
  const colNameLabel = localizedStrings['%openTexts_colName%'] || 'Name';
  const colFullNameLabel = localizedStrings['%openTexts_colFullName%'] || 'Full Name';
  const colLanguageLabel = localizedStrings['%openTexts_colLanguage%'] || 'Language';
  const colVersificationLabel = localizedStrings['%openTexts_colVersification%'] || 'Versification';
  const noFiltersMessage =
    localizedStrings['%openTexts_noFiltersMessage%'] ||
    'No filters are selected. Click a button above to show items you can choose to open.';
  const openAsLabel = localizedStrings['%openTexts_openAsLabel%'] || 'Open As:';
  const savedSelectionsPlaceholder =
    localizedStrings['%openTexts_savedSelections%'] || 'Saved selections';
  const replaceConfirmMsg =
    localizedStrings['%openTexts_replaceConfirm%'] || 'Replace existing selection?';
  const ariaFilterToggle = localizedStrings['%openTexts_ariaFilterToggle%'] || 'Toggle filter';
  const ariaSearchFilter =
    localizedStrings['%openTexts_ariaSearchFilter%'] || 'Search for name or language';
  const okLabel = localizedStrings['%common_ok%'] || 'OK';
  const cancelLabel = localizedStrings['%common_cancel%'] || 'Cancel';

  // Open As option labels
  const openAsFloatingLabel = localizedStrings['%openTexts_openAsFloating%'] || 'Floating';
  const openAsTabLabel = localizedStrings['%openTexts_openAsTab%'] || 'Tab';
  const openAsPanelLabel = localizedStrings['%openTexts_openAsPanel%'] || 'Panel';
  const openAsTcPanelLabel =
    localizedStrings['%openTexts_openAsTcPanel%'] || 'Text collection panel';
  const openAsAutohideLabel = localizedStrings['%openTexts_openAsAutohide%'] || 'Autohide';

  const openAsLabels: Record<OpenAsType, string> = useMemo(
    () => ({
      Floating: openAsFloatingLabel,
      Tab: openAsTabLabel,
      Panel: openAsPanelLabel,
      TextCollection: openAsTcPanelLabel,
      Autohide: openAsAutohideLabel,
    }),
    [
      openAsFloatingLabel,
      openAsTabLabel,
      openAsPanelLabel,
      openAsTcPanelLabel,
      openAsAutohideLabel,
    ],
  );

  // Web view state
  const [showOpenModeSelector] = useWebViewState<boolean>('showOpenModeSelector', true);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    projects: true,
    resources: true,
    enhancedResources: false,
    sourceLanguages: false,
    dictionaries: false,
    consultantNotes: false,
  });

  // Preserved filter state for TC mode restoration
  const [preservedFilters, setPreservedFilters] = useState<Partial<FilterState>>({});

  // Search filter
  const [nameFilter, setNameFilter] = useState('');

  // Show versification
  const [showVersification, setShowVersification] = useState(false);

  // Sort state
  const [sortColumn, setSortColumn] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');

  // Open As
  const [openAsType, setOpenAsType] = useState<OpenAsType>('Panel');

  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // All projects
  const [allProjects] = useState<ProjectInfo[]>(SAMPLE_PROJECTS);

  // Saved selections
  const [savedSelections, setSavedSelections] = useState<SavedSelection[]>(SAMPLE_SAVED_SELECTIONS);

  // Derived: TC mode
  const isTcMode = openAsType === 'TextCollection';

  // TC mode filter buttons
  const tcHiddenFilters: (keyof FilterState)[] = useMemo(
    () => ['enhancedResources', 'sourceLanguages', 'dictionaries', 'consultantNotes'],
    [],
  );

  // Filtered and sorted projects
  const visibleProjects = useMemo(() => {
    if (!anyFilterActive(filters)) return [];

    const filtered = allProjects.filter(
      (p) => matchesTypeFilter(p, filters) && matchesNameFilter(p, nameFilter),
    );

    return [...filtered].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      const comparison = aVal.localeCompare(bVal);
      return sortDirection === 'ascending' ? comparison : -comparison;
    });
  }, [allProjects, filters, nameFilter, sortColumn, sortDirection]);

  // Toggle filter button
  const handleToggleFilter = useCallback((filterKey: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [filterKey]: !prev[filterKey] }));
  }, []);

  // Sort handler
  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortColumn === key) {
        setSortDirection((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
      } else {
        setSortColumn(key);
        setSortDirection('ascending');
      }
    },
    [sortColumn],
  );

  // Row click (multi-select with Ctrl/Meta)
  const handleRowClick = useCallback((id: string, event: React.MouseEvent) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (event.ctrlKey || event.metaKey) {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      } else {
        next.clear();
        next.add(id);
      }
      return next;
    });
  }, []);

  // Row double-click = OK
  const handleRowDoubleClick = useCallback(
    (project: ProjectInfo) => {
      if (!project.canOpen) return;
      const output = {
        action: 'ok' as const,
        selections: [project],
        openAsType,
      };
      logger.debug(`OpenTextsDialog OK (double-click): ${JSON.stringify(output)}`);
    },
    [openAsType],
  );

  // Open As change
  const handleOpenAsChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = e.target.value as OpenAsType;
      setOpenAsType(newType);

      if (newType === 'TextCollection') {
        // Save current TC-hidden filter states and turn them off
        const preserved: Partial<FilterState> = {};
        tcHiddenFilters.forEach((key) => {
          preserved[key] = filters[key];
        });
        setPreservedFilters(preserved);
        setFilters((prev) => {
          const next = { ...prev };
          tcHiddenFilters.forEach((key) => {
            next[key] = false;
          });
          return next;
        });
      } else if (openAsType === 'TextCollection') {
        // Restore previously hidden filter states
        setFilters((prev) => {
          const next = { ...prev };
          tcHiddenFilters.forEach((key) => {
            if (preservedFilters[key] !== undefined) {
              next[key] = preservedFilters[key]!;
            }
          });
          return next;
        });
      }
    },
    [filters, openAsType, preservedFilters, tcHiddenFilters],
  );

  // Saved selection handlers
  const handleSelectSavedSelection = useCallback(
    (selection: SavedSelection) => {
      const matchingIds = new Set(
        allProjects.filter((p) => selection.textNames.includes(p.name)).map((p) => p.id),
      );
      setSelectedIds(matchingIds);
    },
    [allProjects],
  );

  const handleSaveSavedSelection = useCallback(
    (name: string) => {
      const selectedProjectNames = allProjects
        .filter((p) => selectedIds.has(p.id))
        .map((p) => p.name);
      const newSelection: SavedSelection = {
        name,
        source: isTcMode ? 'list' : 'set',
        textNames: selectedProjectNames,
      };
      setSavedSelections((prev) => {
        const filtered = prev.filter((s) => s.name.toLowerCase() !== name.toLowerCase());
        return [...filtered, newSelection];
      });
      logger.debug(`Saved selection: ${name}`);
    },
    [allProjects, selectedIds, isTcMode],
  );

  const handleDeleteSavedSelection = useCallback((selection: SavedSelection) => {
    setSavedSelections((prev) =>
      prev.filter((s) => s.name.toLowerCase() !== selection.name.toLowerCase()),
    );
    logger.debug(`Deleted selection: ${selection.name}`);
  }, []);

  // OK enabled
  const isOkEnabled = useMemo(() => {
    if (selectedIds.size === 0) return false;
    return allProjects.filter((p) => selectedIds.has(p.id)).every((p) => p.canOpen);
  }, [selectedIds, allProjects]);

  // OK / Cancel handlers
  const handleOk = useCallback(() => {
    const selections = allProjects.filter((p) => selectedIds.has(p.id));
    const output = {
      action: 'ok' as const,
      selections,
      openAsType,
    };
    logger.debug(`OpenTextsDialog OK: ${JSON.stringify(output)}`);
  }, [allProjects, selectedIds, openAsType]);

  const handleCancel = useCallback(() => {
    logger.debug('OpenTextsDialog Cancel');
  }, []);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (isOkEnabled) handleOk();
      } else if (event.key === 'Escape') {
        handleCancel();
      }
    },
    [handleOk, handleCancel, isOkEnabled],
  );

  // Sort indicator
  const renderSortIcon = useCallback(
    (key: SortKey) => {
      if (sortColumn !== key) {
        return <ChevronsUpDown className="tw-ml-1 tw-inline" size={14} />;
      }
      return sortDirection === 'ascending' ? (
        <ChevronUp className="tw-ml-1 tw-inline" size={14} />
      ) : (
        <ChevronDown className="tw-ml-1 tw-inline" size={14} />
      );
    },
    [sortColumn, sortDirection],
  );

  // Filter button definitions
  const filterButtons: { key: keyof FilterState; label: string; tcHidden: boolean }[] = useMemo(
    () => [
      { key: 'projects', label: filterProjectsLabel, tcHidden: false },
      { key: 'resources', label: filterResourcesLabel, tcHidden: false },
      { key: 'enhancedResources', label: filterEnhancedLabel, tcHidden: true },
      { key: 'sourceLanguages', label: filterSourceLabel, tcHidden: true },
      { key: 'dictionaries', label: filterDictLabel, tcHidden: true },
      { key: 'consultantNotes', label: filterNotesLabel, tcHidden: true },
    ],
    [
      filterProjectsLabel,
      filterResourcesLabel,
      filterEnhancedLabel,
      filterSourceLabel,
      filterDictLabel,
      filterNotesLabel,
    ],
  );

  const showNoFilters = !anyFilterActive(filters);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="open-texts-dialog" data-testid="open-texts-dialog" onKeyDown={handleKeyDown}>
      {/* Filter bar */}
      {showOpenModeSelector && (
        <div className="open-texts-filter-bar">
          <span className="open-texts-filter-label">{showLabel}</span>
          <div className="open-texts-filter-buttons">
            {filterButtons.map((fb) => {
              if (isTcMode && fb.tcHidden) return null;
              return (
                <Button
                  key={fb.key}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={filters[fb.key] ? 'open-texts-toggle-on' : ''}
                  onClick={() => handleToggleFilter(fb.key)}
                  aria-label={`${ariaFilterToggle}: ${fb.label}`}
                  aria-pressed={filters[fb.key]}
                >
                  {fb.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search row */}
      <div className="open-texts-search-row">
        <div className="open-texts-search-input">
          <Input
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={ariaSearchFilter}
            className="tw-h-8 tw-text-sm"
          />
        </div>
        <label className="open-texts-versification-check" htmlFor="show-versification-checkbox">
          <input
            type="checkbox"
            id="show-versification-checkbox"
            checked={showVersification}
            onChange={(e) => setShowVersification(e.target.checked)}
          />
          {showVersificationLabel}
        </label>
      </div>

      {/* Project list table */}
      <div className="open-texts-table-container">
        {showNoFilters ? (
          <div className="open-texts-no-filters-message">{noFiltersMessage}</div>
        ) : (
          <table className="open-texts-table" role="grid" aria-label={colNameLabel}>
            <thead>
              <tr>
                <th
                  style={{ width: '20%' }}
                  onClick={() => handleSort('projectType')}
                  aria-sort={sortColumn === 'projectType' ? sortDirection : 'none'}
                >
                  {colTypeLabel}
                  {renderSortIcon('projectType')}
                </th>
                <th
                  style={{ width: '20%' }}
                  onClick={() => handleSort('name')}
                  aria-sort={sortColumn === 'name' ? sortDirection : 'none'}
                >
                  {colNameLabel}
                  {renderSortIcon('name')}
                </th>
                <th
                  style={{ width: '40%' }}
                  onClick={() => handleSort('fullName')}
                  aria-sort={sortColumn === 'fullName' ? sortDirection : 'none'}
                >
                  {colFullNameLabel}
                  {renderSortIcon('fullName')}
                </th>
                <th
                  style={{ width: '20%' }}
                  onClick={() => handleSort('language')}
                  aria-sort={sortColumn === 'language' ? sortDirection : 'none'}
                >
                  {colLanguageLabel}
                  {renderSortIcon('language')}
                </th>
                {showVersification && (
                  <th
                    style={{ width: '15%' }}
                    onClick={() => handleSort('versification')}
                    aria-sort={sortColumn === 'versification' ? sortDirection : 'none'}
                  >
                    {colVersificationLabel}
                    {renderSortIcon('versification')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {visibleProjects.map((project) => (
                <tr
                  key={project.id}
                  className={`${selectedIds.has(project.id) ? 'selected' : ''} ${!project.canOpen ? 'inaccessible' : ''}`}
                  role="row"
                  aria-selected={selectedIds.has(project.id)}
                  aria-disabled={!project.canOpen}
                  onClick={(e) => handleRowClick(project.id, e)}
                  onDoubleClick={() => handleRowDoubleClick(project)}
                >
                  <td>{project.projectType}</td>
                  <td>{project.name}</td>
                  <td>{project.fullName}</td>
                  <td>{project.language}</td>
                  {showVersification && <td>{project.versification}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer: Saved selections + Open As + OK/Cancel */}
      <div className="open-texts-footer">
        <div className="open-texts-saved-section">
          <SettingSaver<SavedSelection>
            items={savedSelections}
            placeholder={savedSelectionsPlaceholder}
            onSelect={handleSelectSavedSelection}
            onSave={handleSaveSavedSelection}
            onDelete={handleDeleteSavedSelection}
            confirmOverwriteMessage={replaceConfirmMsg}
          />
        </div>
        {showOpenModeSelector && (
          <div className="open-texts-open-as-section">
            <span className="open-texts-open-as-label">{openAsLabel}</span>
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              value={openAsType}
              onChange={handleOpenAsChange}
              className="tw-h-8 tw-rounded-md tw-border tw-bg-background tw-px-2 tw-text-sm"
              aria-label={openAsLabel}
            >
              {OPEN_AS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {openAsLabels[opt.value]}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="open-texts-actions">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" onClick={handleOk} disabled={!isOkEnabled}>
            {okLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
