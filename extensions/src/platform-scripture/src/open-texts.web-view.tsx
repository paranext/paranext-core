import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Checkbox, Input, Label } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import type { ScrTextInfo, SavedScrTextList } from 'platform-scripture';
import SettingSaver from './components/setting-saver.component';

// #region Types

/** Extended project info for the Open dialog with filter-related fields */
interface ProjectInfo extends ScrTextInfo {
  versification: string;
  isResourceProject: boolean;
  isMarbleResource: boolean;
  isDictionary: boolean;
  isSourceLanguageText: boolean;
  isNoteType: boolean;
  isXmlResource: boolean;
  canOpen: boolean;
}

type OpenAsType = 'Floating' | 'Tab' | 'Panel' | 'TextCollection' | 'Autohide';

type SortColumn = 'type' | 'name' | 'fullName' | 'language' | 'versification';
type SortDirection = 'ascending' | 'descending';

// #endregion

// #region Localization Keys

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%openTexts_title%',
  '%openTexts_showLabel%',
  '%openTexts_projects%',
  '%openTexts_resources%',
  '%openTexts_enhancedResources%',
  '%openTexts_sourceLanguageTexts%',
  '%openTexts_dictionaries%',
  '%openTexts_consultantNotes%',
  '%openTexts_searchPlaceholder%',
  '%openTexts_showVersification%',
  '%openTexts_colType%',
  '%openTexts_colName%',
  '%openTexts_colFullName%',
  '%openTexts_colLanguage%',
  '%openTexts_colVersification%',
  '%openTexts_noFiltersMessage%',
  '%openTexts_openAs%',
  '%openTexts_floating%',
  '%openTexts_tab%',
  '%openTexts_panel%',
  '%openTexts_textCollectionPanel%',
  '%openTexts_autohide%',
  '%openTexts_savedSelections%',
  '%openTexts_replaceConfirm%',
  '%openTexts_ok%',
  '%openTexts_cancel%',
  '%openTexts_save%',
  '%openTexts_delete%',
];

/** Get English default for a localization key */
function getEnglishDefault(key: LocalizeKey): string {
  const defaults: Record<string, string> = {
    '%openTexts_title%': 'Open',
    '%openTexts_showLabel%': 'Show:',
    '%openTexts_projects%': 'Projects',
    '%openTexts_resources%': 'Resources',
    '%openTexts_enhancedResources%': 'Enhanced Resources',
    '%openTexts_sourceLanguageTexts%': 'Source Language Texts',
    '%openTexts_dictionaries%': 'Dictionaries',
    '%openTexts_consultantNotes%': 'Consultant Notes',
    '%openTexts_searchPlaceholder%': 'Search for Name or Language',
    '%openTexts_showVersification%': 'Show Versification',
    '%openTexts_colType%': 'Type',
    '%openTexts_colName%': 'Name',
    '%openTexts_colFullName%': 'Full Name',
    '%openTexts_colLanguage%': 'Language',
    '%openTexts_colVersification%': 'Versification',
    '%openTexts_noFiltersMessage%':
      'No filters are selected. Click a button above to show items you can choose to open.',
    '%openTexts_openAs%': 'Open As:',
    '%openTexts_floating%': 'Floating',
    '%openTexts_tab%': 'Tab',
    '%openTexts_panel%': 'Panel',
    '%openTexts_textCollectionPanel%': 'Text collection panel',
    '%openTexts_autohide%': 'Autohide',
    '%openTexts_savedSelections%': 'Saved selections',
    '%openTexts_replaceConfirm%': 'Replace existing selection?',
    '%openTexts_ok%': 'OK',
    '%openTexts_cancel%': 'Cancel',
    '%openTexts_save%': 'Save',
    '%openTexts_delete%': 'Delete',
  };
  return defaults[key] || key;
}

// #endregion

// #region Open As Dropdown Options

const OPEN_AS_OPTIONS: { value: OpenAsType; labelKey: LocalizeKey }[] = [
  { value: 'Floating', labelKey: '%openTexts_floating%' },
  { value: 'Tab', labelKey: '%openTexts_tab%' },
  { value: 'Panel', labelKey: '%openTexts_panel%' },
  { value: 'TextCollection', labelKey: '%openTexts_textCollectionPanel%' },
  { value: 'Autohide', labelKey: '%openTexts_autohide%' },
];

// #endregion

// #region Filter Logic

/** Determines which filter category a project belongs to */
function getFilterCategories(project: ProjectInfo): string[] {
  const categories: string[] = [];
  if (project.isNoteType) {
    categories.push('consultantNotes');
  } else if (project.isDictionary || project.isXmlResource) {
    categories.push('dictionaries');
  } else if (project.isSourceLanguageText) {
    categories.push('sourceLanguages');
  } else if (project.isMarbleResource) {
    categories.push('enhancedResources');
  } else if (project.isResourceProject) {
    categories.push('resources');
  } else {
    categories.push('projects');
  }
  return categories;
}

/** Map ScrTextInfo to ProjectInfo with defaults */
function mapToProjectInfo(text: ScrTextInfo): ProjectInfo {
  // Derive filter-related booleans from projectType string
  const projectTypeLower = text.projectType.toLowerCase();
  const isResourceProject =
    projectTypeLower.includes('resource') || projectTypeLower.includes('bible');
  const isMarbleResource = projectTypeLower.includes('enhanced');
  const isDictionary = projectTypeLower.includes('dictionary');
  const isSourceLanguageText = projectTypeLower.includes('source language');
  const isNoteType = projectTypeLower.includes('note');
  const isXmlResource = false;

  return {
    ...text,
    versification: '',
    isResourceProject,
    isMarbleResource,
    isDictionary,
    isSourceLanguageText,
    isNoteType,
    isXmlResource,
    canOpen: true,
  };
}

// #endregion

// #region Sorting

function sortProjects(
  projects: ProjectInfo[],
  column: SortColumn,
  direction: SortDirection,
): ProjectInfo[] {
  const sorted = [...projects].sort((a, b) => {
    let valA: string;
    let valB: string;

    switch (column) {
      case 'type':
        valA = a.projectType;
        valB = b.projectType;
        break;
      case 'name':
        valA = a.name;
        valB = b.name;
        break;
      case 'fullName':
        valA = a.fullName;
        valB = b.fullName;
        break;
      case 'language':
        valA = a.language;
        valB = b.language;
        break;
      case 'versification':
        valA = a.versification;
        valB = b.versification;
        break;
      default:
        valA = a.name;
        valB = b.name;
    }

    const cmp = valA.localeCompare(valB, undefined, { sensitivity: 'base' });
    return direction === 'ascending' ? cmp : -cmp;
  });
  return sorted;
}

// #endregion

global.webViewComponent = function OpenTextsWebView({ useWebViewState }: WebViewProps) {
  // Localized strings
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const getString = useCallback(
    (key: LocalizeKey): string => localizedStrings[key] || getEnglishDefault(key),
    [localizedStrings],
  );

  // State from web view provider
  const [showOpenModeSelector] = useWebViewState<boolean>('showOpenModeSelector', true);

  // Core data
  const [allProjects, setAllProjects] = useState<ProjectInfo[]>([]);
  const [savedSelections, setSavedSelections] = useState<SavedScrTextList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [filters, setFilters] = useState({
    projects: true,
    resources: true,
    enhancedResources: false,
    sourceLanguages: false,
    dictionaries: false,
    consultantNotes: false,
  });

  // Stored filter states for TC mode restore
  const [storedFilters, setStoredFilters] = useState({
    enhancedResources: false,
    sourceLanguages: false,
    dictionaries: false,
    consultantNotes: false,
  });

  const [nameFilter, setNameFilter] = useState('');
  const [showVersification, setShowVersification] = useState(false);

  // Sort state
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Open As
  const [openAsType, setOpenAsType] = useState<OpenAsType>('Panel');

  const isTcMode = openAsType === 'TextCollection';

  // #region Data Loading

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setIsLoading(true);

        // Load all project metadata from platform project lookup service
        const projectMetadataList = await papi.projectLookup.getMetadataForAllProjects();

        if (cancelled) return;

        // Enrich each project with name from its data provider
        const enriched: ProjectInfo[] = await Promise.all(
          projectMetadataList.map(async (metadata) => {
            let projectName = metadata.id;
            let fullName = '';
            let language = '';
            let projectType = 'Project';

            try {
              const pdp = await papi.projectDataProviders.get('platform.base', metadata.id);
              const nameResult = await pdp.getSetting('platform.name');
              if (nameResult) projectName = nameResult;

              // Try to get language and fullName from settings
              try {
                const langResult = await pdp.getSetting('platform.language');
                if (langResult) language = langResult;
              } catch {
                // Language setting not available for this project
              }

              try {
                const fullNameResult = await pdp.getSetting('platform.fullName');
                if (fullNameResult) fullName = fullNameResult;
              } catch {
                // Full name setting not available for this project
              }
            } catch (err) {
              logger.warn(`Could not get details for project ${metadata.id}: ${err}`);
            }

            // Determine project type from projectInterfaces
            const interfaces = metadata.projectInterfaces || [];
            const interfacesStr = interfaces.join(' ').toLowerCase();
            if (interfacesStr.includes('dictionary')) projectType = 'Dictionary';
            else if (interfacesStr.includes('note')) projectType = 'Notes';
            else if (interfacesStr.includes('resource')) projectType = 'Resource';

            return mapToProjectInfo({
              name: projectName,
              id: metadata.id,
              fullName: fullName || projectName,
              language,
              projectType,
              isSecondaryText: false,
            });
          }),
        );

        if (!cancelled) {
          setAllProjects(enriched);
        }

        // Saved collections: currently no PAPI command to list saved collections.
        // The data provider exposes getSavedCollections as a data function but not as a command.
        // Saved collections will be empty initially until persistence is available.
        logger.debug('Saved text collections loading deferred (no list command available)');
      } catch (err) {
        logger.error(`Error loading Open dialog data: ${err}`);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  // #endregion

  // #region Filtering & Sorting

  const visibleProjects = useMemo(() => {
    const anyFilterOn = Object.values(filters).some((v) => v);
    if (!anyFilterOn) return [];

    const filtered = allProjects.filter((project) => {
      // Type filter
      const categories = getFilterCategories(project);
      const matchesTypeFilter = categories.some((cat) => {
        switch (cat) {
          case 'projects':
            return filters.projects;
          case 'resources':
            return filters.resources;
          case 'enhancedResources':
            return filters.enhancedResources;
          case 'sourceLanguages':
            return filters.sourceLanguages;
          case 'dictionaries':
            return filters.dictionaries;
          case 'consultantNotes':
            return filters.consultantNotes;
          default:
            return false;
        }
      });

      if (!matchesTypeFilter) return false;

      // Text filter
      if (nameFilter.trim()) {
        const search = nameFilter.trim().toLowerCase();
        const matchesText =
          project.name.toLowerCase().includes(search) ||
          project.fullName.toLowerCase().includes(search) ||
          project.language.toLowerCase().includes(search);
        if (!matchesText) return false;
      }

      return true;
    });

    return sortProjects(filtered, sortColumn, sortDirection);
  }, [allProjects, filters, nameFilter, sortColumn, sortDirection]);

  const allFiltersOff = !Object.values(filters).some((v) => v);

  // #endregion

  // #region Filter Toggle Handlers

  const toggleFilter = useCallback((filterKey: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filterKey]: !prev[filterKey] }));
  }, []);

  // #endregion

  // #region Sort Handler

  const handleHeaderClick = useCallback(
    (column: SortColumn) => {
      if (column === sortColumn) {
        setSortDirection((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
      } else {
        setSortColumn(column);
        setSortDirection('ascending');
      }
    },
    [sortColumn],
  );

  // #endregion

  // #region Selection Handlers

  const handleRowClick = useCallback((projectId: string, event: React.MouseEvent) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (event.ctrlKey || event.metaKey) {
        // Toggle individual selection
        if (next.has(projectId)) {
          next.delete(projectId);
        } else {
          next.add(projectId);
        }
      } else {
        // Single select
        next.clear();
        next.add(projectId);
      }
      return next;
    });
  }, []);

  const handleRowDoubleClick = useCallback((project: ProjectInfo) => {
    if (!project.canOpen) return;
    // Double-click = select and OK
    setSelectedIds(new Set([project.id]));
    // Close dialog (in real usage, this triggers accept)
    logger.info(`Open dialog: double-click OK for ${project.name}`);
  }, []);

  // #endregion

  // #region OK/Cancel

  const selectedProjects = useMemo(
    () => allProjects.filter((p) => selectedIds.has(p.id)),
    [allProjects, selectedIds],
  );

  const okEnabled = selectedProjects.length > 0 && selectedProjects.every((p) => p.canOpen);

  const handleOk = useCallback(() => {
    logger.info(
      `Open dialog OK: ${selectedProjects.map((p) => p.name).join(', ')} as ${openAsType}`,
    );
  }, [selectedProjects, openAsType]);

  const handleCancel = useCallback(() => {
    logger.info('Open dialog: Cancel');
  }, []);

  // #endregion

  // #region Open As Handler

  const handleOpenAsChange = useCallback(
    (value: string) => {
      const newType = value as OpenAsType;
      const wasTcMode = openAsType === 'TextCollection';
      const isNowTcMode = newType === 'TextCollection';

      if (isNowTcMode && !wasTcMode) {
        // Entering TC mode: store current TC-hidden filter states, then turn them off
        setStoredFilters({
          enhancedResources: filters.enhancedResources,
          sourceLanguages: filters.sourceLanguages,
          dictionaries: filters.dictionaries,
          consultantNotes: filters.consultantNotes,
        });
        setFilters((prev) => ({
          ...prev,
          enhancedResources: false,
          sourceLanguages: false,
          dictionaries: false,
          consultantNotes: false,
        }));
      } else if (!isNowTcMode && wasTcMode) {
        // Leaving TC mode: restore previously stored filter states
        setFilters((prev) => ({
          ...prev,
          enhancedResources: storedFilters.enhancedResources,
          sourceLanguages: storedFilters.sourceLanguages,
          dictionaries: storedFilters.dictionaries,
          consultantNotes: storedFilters.consultantNotes,
        }));
      }

      setOpenAsType(newType);
    },
    [openAsType, filters, storedFilters],
  );

  // #endregion

  // #region Saved Selection Handlers

  const savedNames = useMemo(() => savedSelections.map((s) => s.name), [savedSelections]);

  const handleSelectSaved = useCallback(
    (name: string) => {
      const found = savedSelections.find((s) => s.name === name);
      if (!found) return;
      // Select matching items in project list
      const matchIds = new Set(
        allProjects.filter((p) => found.scrTextNames.includes(p.name)).map((p) => p.id),
      );
      setSelectedIds(matchIds);
    },
    [savedSelections, allProjects],
  );

  const handleSaveSaved = useCallback(
    async (name: string) => {
      const existingEntry = savedSelections.find((s) => s.name === name);
      if (existingEntry) {
        // eslint-disable-next-line no-alert
        const confirmed = window.confirm(getString('%openTexts_replaceConfirm%'));
        if (!confirmed) return;
      }

      try {
        const textNames = selectedProjects.map((p) => p.name);
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        await (papi.commands.sendCommand as Function)(
          'platformScripture.textCollection.saveTextList',
          name,
          textNames,
        );

        // Update local state optimistically
        const textNames2 = selectedProjects.map((p) => p.name);
        setSavedSelections((prev) => {
          const filtered = prev.filter((s) => s.name !== name);
          return [
            ...filtered,
            { name, scrTextNames: textNames2, scrProjectIndex: -1, hebGrkIndex: -1 },
          ];
        });
      } catch (err) {
        logger.error(`Error saving selection: ${err}`);
      }
    },
    [savedSelections, selectedProjects, getString],
  );

  const handleDeleteSaved = useCallback(async (name: string) => {
    try {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      await (papi.commands.sendCommand as Function)(
        'platformScripture.textCollection.deleteTextList',
        name,
      );

      // Update local state optimistically
      setSavedSelections((prev) => prev.filter((s) => s.name !== name));
    } catch (err) {
      logger.error(`Error deleting selection: ${err}`);
    }
  }, []);

  // #endregion

  // #region Render

  if (isLoading) {
    return (
      <div className="open-texts-dialog" data-testid="open-texts-dialog">
        <div className="open-texts-loading">{getString('%openTexts_title%')}...</div>
      </div>
    );
  }

  const sortIndicator = (column: SortColumn) => {
    if (column !== sortColumn) return null;
    return (
      <span className="sort-indicator" aria-hidden="true">
        {sortDirection === 'ascending' ? '\u25B2' : '\u25BC'}
      </span>
    );
  };

  return (
    <div className="open-texts-dialog" data-testid="open-texts-dialog">
      {/* Filter Bar */}
      {showOpenModeSelector && (
        <div className="open-texts-filter-bar">
          <div className="open-texts-filter-row">
            <span className="open-texts-filter-label">{getString('%openTexts_showLabel%')}</span>
            <button
              type="button"
              className={`open-texts-toggle-btn ${filters.projects ? 'active' : ''}`}
              onClick={() => toggleFilter('projects')}
              aria-pressed={filters.projects}
              aria-label={getString('%openTexts_projects%')}
            >
              {getString('%openTexts_projects%')}
            </button>
            <button
              type="button"
              className={`open-texts-toggle-btn ${filters.resources ? 'active' : ''}`}
              onClick={() => toggleFilter('resources')}
              aria-pressed={filters.resources}
              aria-label={getString('%openTexts_resources%')}
            >
              {getString('%openTexts_resources%')}
            </button>
            {!isTcMode && (
              <>
                <button
                  type="button"
                  className={`open-texts-toggle-btn ${filters.enhancedResources ? 'active' : ''}`}
                  onClick={() => toggleFilter('enhancedResources')}
                  aria-pressed={filters.enhancedResources}
                  aria-label={getString('%openTexts_enhancedResources%')}
                >
                  {getString('%openTexts_enhancedResources%')}
                </button>
                <button
                  type="button"
                  className={`open-texts-toggle-btn ${filters.sourceLanguages ? 'active' : ''}`}
                  onClick={() => toggleFilter('sourceLanguages')}
                  aria-pressed={filters.sourceLanguages}
                  aria-label={getString('%openTexts_sourceLanguageTexts%')}
                >
                  {getString('%openTexts_sourceLanguageTexts%')}
                </button>
                <button
                  type="button"
                  className={`open-texts-toggle-btn ${filters.dictionaries ? 'active' : ''}`}
                  onClick={() => toggleFilter('dictionaries')}
                  aria-pressed={filters.dictionaries}
                  aria-label={getString('%openTexts_dictionaries%')}
                >
                  {getString('%openTexts_dictionaries%')}
                </button>
                <button
                  type="button"
                  className={`open-texts-toggle-btn ${filters.consultantNotes ? 'active' : ''}`}
                  onClick={() => toggleFilter('consultantNotes')}
                  aria-pressed={filters.consultantNotes}
                  aria-label={getString('%openTexts_consultantNotes%')}
                >
                  {getString('%openTexts_consultantNotes%')}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Search and Versification */}
      <div className="open-texts-search-row">
        <Input
          placeholder={getString('%openTexts_searchPlaceholder%')}
          value={nameFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameFilter(e.target.value)}
          className="tw-flex-1"
          aria-label={getString('%openTexts_searchPlaceholder%')}
        />
        <div className="tw-flex tw-items-center tw-gap-1">
          <Checkbox
            id="show-versification"
            checked={showVersification}
            onCheckedChange={(checked: boolean | 'indeterminate') =>
              setShowVersification(checked === true)
            }
          />
          <Label htmlFor="show-versification">{getString('%openTexts_showVersification%')}</Label>
        </div>
      </div>

      {/* Project List Table */}
      <div className="open-texts-table-container">
        {allFiltersOff ? (
          <div className="open-texts-no-filters-message">
            {getString('%openTexts_noFiltersMessage%')}
          </div>
        ) : (
          <table
            className="open-texts-table"
            role="grid"
            aria-label={getString('%openTexts_title%')}
          >
            <thead>
              <tr>
                <th
                  onClick={() => handleHeaderClick('type')}
                  aria-sort={sortColumn === 'type' ? sortDirection : undefined}
                  style={{ width: '20%' }}
                >
                  {getString('%openTexts_colType%')}
                  {sortIndicator('type')}
                </th>
                <th
                  onClick={() => handleHeaderClick('name')}
                  aria-sort={sortColumn === 'name' ? sortDirection : undefined}
                  style={{ width: '20%' }}
                >
                  {getString('%openTexts_colName%')}
                  {sortIndicator('name')}
                </th>
                <th
                  onClick={() => handleHeaderClick('fullName')}
                  aria-sort={sortColumn === 'fullName' ? sortDirection : undefined}
                  style={{ width: showVersification ? '30%' : '40%' }}
                >
                  {getString('%openTexts_colFullName%')}
                  {sortIndicator('fullName')}
                </th>
                <th
                  onClick={() => handleHeaderClick('language')}
                  aria-sort={sortColumn === 'language' ? sortDirection : undefined}
                  style={{ width: '20%' }}
                >
                  {getString('%openTexts_colLanguage%')}
                  {sortIndicator('language')}
                </th>
                {showVersification && (
                  <th
                    onClick={() => handleHeaderClick('versification')}
                    aria-sort={sortColumn === 'versification' ? sortDirection : undefined}
                    style={{ width: '15%' }}
                  >
                    {getString('%openTexts_colVersification%')}
                    {sortIndicator('versification')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {visibleProjects.map((project) => (
                <tr
                  key={project.id}
                  className={`${selectedIds.has(project.id) ? 'selected' : ''} ${!project.canOpen ? 'disabled-project' : ''}`}
                  onClick={(e) => handleRowClick(project.id, e)}
                  onDoubleClick={() => handleRowDoubleClick(project)}
                  aria-selected={selectedIds.has(project.id)}
                  aria-disabled={!project.canOpen}
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

      {/* Bottom Bar */}
      <div className="open-texts-bottom-bar">
        <SettingSaver
          savedNames={savedNames}
          placeholder={getString('%openTexts_savedSelections%')}
          onSelect={handleSelectSaved}
          onSave={handleSaveSaved}
          onDelete={handleDeleteSaved}
          saveLabel={getString('%openTexts_save%')}
          deleteLabel={getString('%openTexts_delete%')}
        />

        {showOpenModeSelector && (
          <div className="open-texts-open-as-section">
            <Label>{getString('%openTexts_openAs%')}</Label>
            <select
              value={openAsType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleOpenAsChange(e.target.value)
              }
              className="tw-border tw-border-border tw-rounded-md tw-px-2 tw-py-1 tw-text-sm tw-bg-background"
              aria-label={getString('%openTexts_openAs%')}
            >
              {OPEN_AS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {getString(opt.labelKey)}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="open-texts-action-buttons">
          <Button type="button" onClick={handleOk} disabled={!okEnabled}>
            {getString('%openTexts_ok%')}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {getString('%openTexts_cancel%')}
          </Button>
        </div>
      </div>
    </div>
  );

  // #endregion
};
