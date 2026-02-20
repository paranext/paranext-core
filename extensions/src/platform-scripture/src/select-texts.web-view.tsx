import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Button } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SettingSaver, { SavedItem } from './components/setting-saver.component';

// #region Types

interface ScrTextInfo {
  name: string;
  id: string;
  fullName: string;
  language: string;
  projectType: string;
  isSecondaryText: boolean;
}

interface SavedScrTextList extends SavedItem {
  name: string;
  scrTextNames: string[];
  scrProjectIndex: number;
  hebGrkIndex: number;
}

type SortKey = 'projectType' | 'name' | 'fullName' | 'language';
type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

// #endregion

// #region Localization Keys

const SELECT_TEXTS_STRING_KEYS: LocalizeKey[] = [
  '%selectTexts_title%',
  '%selectTexts_allLabel%',
  '%selectTexts_selectedLabel%',
  '%selectTexts_addHint%',
  '%selectTexts_removeHint%',
  '%selectTexts_savedCollections%',
  '%selectTexts_replaceConfirm%',
  '%selectTexts_colType%',
  '%selectTexts_colName%',
  '%selectTexts_colFullName%',
  '%selectTexts_colLanguage%',
  '%selectTexts_ctxAdd%',
  '%selectTexts_ctxRemove%',
  '%selectTexts_ariaAdd%',
  '%selectTexts_ariaRemove%',
  '%selectTexts_ariaMoveUp%',
  '%selectTexts_ariaMoveDown%',
  '%common_ok%',
  '%common_cancel%',
];

// #endregion

// No sample data - items are loaded from PAPI at runtime

globalThis.webViewComponent = function SelectTextsDialog({ useWebViewState }: WebViewProps) {
  // Localized strings
  const [localizedStrings] = useLocalizedStrings(SELECT_TEXTS_STRING_KEYS);

  const allLabel = localizedStrings['%selectTexts_allLabel%'] || 'All:';
  const selectedLabel = localizedStrings['%selectTexts_selectedLabel%'] || 'Selected:';
  const addHint = localizedStrings['%selectTexts_addHint%'] || 'Double-click text to add';
  const removeHint = localizedStrings['%selectTexts_removeHint%'] || 'Double-click text to remove';
  const savedCollectionsPlaceholder =
    localizedStrings['%selectTexts_savedCollections%'] || 'Saved text collections';
  const replaceConfirmMsg =
    localizedStrings['%selectTexts_replaceConfirm%'] || 'Replace existing selection?';
  const colTypeLabel = localizedStrings['%selectTexts_colType%'] || 'Type';
  const colNameLabel = localizedStrings['%selectTexts_colName%'] || 'Name';
  const colFullNameLabel = localizedStrings['%selectTexts_colFullName%'] || 'Full Name';
  const colLanguageLabel = localizedStrings['%selectTexts_colLanguage%'] || 'Language';
  const ariaAddLabel = localizedStrings['%selectTexts_ariaAdd%'] || 'Add selected texts';
  const ariaRemoveLabel = localizedStrings['%selectTexts_ariaRemove%'] || 'Remove selected text';
  const ariaMoveUpLabel = localizedStrings['%selectTexts_ariaMoveUp%'] || 'Move up';
  const ariaMoveDownLabel = localizedStrings['%selectTexts_ariaMoveDown%'] || 'Move down';
  const okLabel = localizedStrings['%common_ok%'] || 'OK';
  const cancelLabel = localizedStrings['%common_cancel%'] || 'Cancel';

  // State - initialized empty, loaded from PAPI
  const [leftItems, setLeftItems] = useState<ScrTextInfo[]>([]);
  const [rightItems, setRightItems] = useState<ScrTextInfo[]>([]);
  const [leftSelection, setLeftSelection] = useState<Set<string>>(new Set());
  const [rightSelection, setRightSelection] = useState<string | undefined>(undefined);
  const [requiredIds] = useState<Set<string>>(new Set());
  const [savedCollections, setSavedCollections] = useState<SavedScrTextList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load available texts and saved collections from PAPI on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Get all scripture projects from the platform
        const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
          includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
        });

        // Enrich project metadata with display info
        const enrichedTexts: ScrTextInfo[] = await Promise.all(
          projectMetadata.map(async (data) => {
            const pdp = await papi.projectDataProviders.get('platform.base', data.id);
            const name = (await pdp.getSetting('platform.name')) ?? data.id;
            const fullName = (await pdp.getSetting('platform.fullName')) ?? name;
            const language = (await pdp.getSetting('platform.language')) ?? '';
            const isEditable = (await pdp.getSetting('platform.isEditable')) ?? false;

            return {
              name,
              id: data.id,
              fullName,
              language,
              projectType: isEditable ? 'Project' : 'Resource',
              isSecondaryText: false,
            };
          }),
        );

        // Filter out secondary texts for the left list
        setLeftItems(enrichedTexts.filter((t) => !t.isSecondaryText));

        // Load saved collections via PAPI command
        try {
          type TcProvider = {
            getSavedLists(): Promise<
              { name: string; textNames: string[]; hebGrkIndex: number; scrProjectIndex: number }[]
            >;
          };
          const tcProvider = (await papi.dataProviders.get(
            'platformScripture.textCollection' as never,
          )) as unknown as TcProvider;
          const lists = await tcProvider.getSavedLists();
          if (Array.isArray(lists)) {
            setSavedCollections(
              lists.map(
                (list: {
                  name: string;
                  textNames: string[];
                  hebGrkIndex?: number;
                  scrProjectIndex?: number;
                }) => ({
                  name: list.name,
                  scrTextNames: list.textNames,
                  scrProjectIndex: list.scrProjectIndex ?? -1,
                  hebGrkIndex: list.hebGrkIndex ?? -1,
                }),
              ),
            );
          }
        } catch (listError) {
          logger.debug(`SelectTexts: saved collections not available: ${listError}`);
        }

        logger.debug(`SelectTexts: loaded ${enrichedTexts.length} texts from PAPI`);
      } catch (error) {
        logger.warn(`SelectTexts: failed to load texts from PAPI: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Sorting state for left list
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'ascending',
  });

  // Web view state for persisting caption
  const [caption] = useWebViewState<string>('caption', 'Select Texts');

  // Log caption usage to avoid lint warning
  useEffect(() => {
    logger.debug(`SelectTextsDialog opened with caption: ${caption}`);
  }, [caption]);

  // Sorted left items
  const sortedLeftItems = useMemo(() => {
    return [...leftItems].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      const comparison = aVal.localeCompare(bVal);
      return sortConfig.direction === 'ascending' ? comparison : -comparison;
    });
  }, [leftItems, sortConfig]);

  // Sort handler
  const handleSort = useCallback((key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  }, []);

  // Left list selection handlers
  const handleLeftRowClick = useCallback((id: string, event: React.MouseEvent) => {
    setLeftSelection((prev) => {
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

  // Right list selection handler
  const handleRightRowClick = useCallback((id: string) => {
    setRightSelection(id);
  }, []);

  // Add items (left to right)
  const handleAdd = useCallback(() => {
    if (leftSelection.size === 0) return;
    const itemsToMove = leftItems.filter((item) => leftSelection.has(item.id));
    setRightItems((prev) => [...prev, ...itemsToMove]);
    setLeftItems((prev) => prev.filter((item) => !leftSelection.has(item.id)));
    setLeftSelection(new Set());
  }, [leftItems, leftSelection]);

  // Remove item (right to left)
  const handleRemove = useCallback(() => {
    if (!rightSelection) return;
    if (requiredIds.has(rightSelection)) return;
    const itemToMove = rightItems.find((item) => item.id === rightSelection);
    if (!itemToMove) return;
    setLeftItems((prev) => [...prev, itemToMove]);
    setRightItems((prev) => prev.filter((item) => item.id !== rightSelection));
    setRightSelection(undefined);
  }, [rightSelection, rightItems, requiredIds]);

  // Double-click handlers
  const handleLeftDoubleClick = useCallback((item: ScrTextInfo) => {
    setRightItems((prev) => [...prev, item]);
    setLeftItems((prev) => prev.filter((i) => i.id !== item.id));
    setLeftSelection((prev) => {
      const next = new Set(prev);
      next.delete(item.id);
      return next;
    });
  }, []);

  const handleRightDoubleClick = useCallback(
    (item: ScrTextInfo) => {
      if (requiredIds.has(item.id)) return;
      setLeftItems((prev) => [...prev, item]);
      setRightItems((prev) => prev.filter((i) => i.id !== item.id));
      if (rightSelection === item.id) setRightSelection(undefined);
    },
    [requiredIds, rightSelection],
  );

  // Move up
  const handleMoveUp = useCallback(() => {
    if (!rightSelection) return;
    const index = rightItems.findIndex((item) => item.id === rightSelection);
    if (index <= 0) return;
    // Cannot move past required item
    if (requiredIds.has(rightItems[index - 1].id)) return;
    const newItems = [...rightItems];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setRightItems(newItems);
  }, [rightSelection, rightItems, requiredIds]);

  // Move down
  const handleMoveDown = useCallback(() => {
    if (!rightSelection) return;
    const index = rightItems.findIndex((item) => item.id === rightSelection);
    if (index < 0 || index >= rightItems.length - 1) return;
    // Cannot move past required item
    if (requiredIds.has(rightItems[index + 1].id)) return;
    const newItems = [...rightItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setRightItems(newItems);
  }, [rightSelection, rightItems, requiredIds]);

  // Button enabled states
  const isAddEnabled = leftSelection.size > 0;
  const isRemoveEnabled = rightSelection !== undefined && !requiredIds.has(rightSelection);
  const rightSelectionIndex = rightSelection
    ? rightItems.findIndex((item) => item.id === rightSelection)
    : -1;
  const isMoveUpEnabled =
    rightSelection !== undefined &&
    rightSelectionIndex > 0 &&
    !requiredIds.has(rightItems[rightSelectionIndex - 1]?.id ?? '');
  const isMoveDownEnabled =
    rightSelection !== undefined &&
    rightSelectionIndex >= 0 &&
    rightSelectionIndex < rightItems.length - 1 &&
    !requiredIds.has(rightItems[rightSelectionIndex + 1]?.id ?? '');

  // Saved collection handlers
  const handleSelectCollection = useCallback(
    (collection: SavedScrTextList) => {
      // Resolve collection names to items
      const allAvailable = [...leftItems, ...rightItems];
      const resolved = collection.scrTextNames
        .map((textName) => allAvailable.find((t) => t.name === textName))
        .filter((t): t is ScrTextInfo => t !== undefined);

      const resolvedIds = new Set(resolved.map((t) => t.id));
      const remaining = allAvailable.filter((t) => !resolvedIds.has(t.id));

      setRightItems(resolved);
      setLeftItems(remaining);
      setLeftSelection(new Set());
      setRightSelection(undefined);
    },
    [leftItems, rightItems],
  );

  const handleSaveCollection = useCallback(
    (name: string) => {
      const textNames = rightItems.map((item) => item.name);
      const newCollection: SavedScrTextList = {
        name,
        scrTextNames: textNames,
        scrProjectIndex: -1,
        hebGrkIndex: -1,
      };

      // Update local state
      setSavedCollections((prev) => {
        const filtered = prev.filter((c) => c.name.toLowerCase() !== name.toLowerCase());
        return [...filtered, newCollection];
      });

      // Persist via PAPI command (M-016: SaveList)
      papi.commands
        .sendCommand('platformScripture.textCollection.saveTextList', name, textNames, -1, -1)
        .then(() => {
          logger.debug(`SelectTexts: saved collection '${name}' via PAPI`);
          return undefined;
        })
        .catch((error: unknown) => {
          logger.warn(`SelectTexts: failed to save collection via PAPI: ${error}`);
        });
    },
    [rightItems],
  );

  const handleDeleteCollection = useCallback((collection: SavedScrTextList) => {
    setSavedCollections((prev) =>
      prev.filter((c) => c.name.toLowerCase() !== collection.name.toLowerCase()),
    );

    // Delete via PAPI command (M-016: DeleteList)
    papi.commands
      .sendCommand('platformScripture.textCollection.deleteTextList', collection.name)
      .then(() => {
        logger.debug(`SelectTexts: deleted collection '${collection.name}' via PAPI`);
        return undefined;
      })
      .catch((error: unknown) => {
        logger.warn(`SelectTexts: failed to delete collection via PAPI: ${error}`);
      });
  }, []);

  // OK / Cancel handlers - wire results to web view state for caller retrieval
  const [, setDialogResult] = useWebViewState<
    | {
        action: 'ok' | 'cancel';
        selections?: ScrTextInfo[];
      }
    | undefined
  >('dialogResult', undefined);

  const handleOk = useCallback(() => {
    const selections = rightItems.filter((item) => !requiredIds.has(item.id));
    setDialogResult({ action: 'ok', selections });
    logger.debug(`SelectTexts OK: returning ${selections.length} selections via web view state`);
  }, [rightItems, requiredIds, setDialogResult]);

  const handleCancel = useCallback(() => {
    setDialogResult({ action: 'cancel' });
    logger.debug('SelectTexts Cancel');
  }, [setDialogResult]);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleOk();
      } else if (event.key === 'Escape') {
        handleCancel();
      }
    },
    [handleOk, handleCancel],
  );

  // Sort indicator
  const renderSortIcon = useCallback(
    (key: SortKey) => {
      if (sortConfig.key !== key) {
        return <ChevronsUpDown className="tw-ml-1 tw-inline" size={14} />;
      }
      return sortConfig.direction === 'ascending' ? (
        <ChevronUp className="tw-ml-1 tw-inline" size={14} />
      ) : (
        <ChevronDown className="tw-ml-1 tw-inline" size={14} />
      );
    },
    [sortConfig],
  );

  // Context menu handlers
  const handleLeftContextMenu = useCallback((event: React.MouseEvent, item: ScrTextInfo) => {
    event.preventDefault();
    // Select the right-clicked item
    setLeftSelection(new Set([item.id]));
    // Add it to right list
    setRightItems((prev) => [...prev, item]);
    setLeftItems((prev) => prev.filter((i) => i.id !== item.id));
  }, []);

  const handleRightContextMenu = useCallback(
    (event: React.MouseEvent, item: ScrTextInfo) => {
      event.preventDefault();
      if (requiredIds.has(item.id)) return;
      // Remove it from right list
      setLeftItems((prev) => [...prev, item]);
      setRightItems((prev) => prev.filter((i) => i.id !== item.id));
      if (rightSelection === item.id) setRightSelection(undefined);
    },
    [requiredIds, rightSelection],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="select-texts-dialog"
      data-testid="select-texts-dialog"
      onKeyDown={handleKeyDown}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div
          className="tw-flex tw-items-center tw-justify-center tw-p-4 tw-text-muted-foreground"
          data-testid="select-texts-loading"
        >
          Loading available texts from PAPI...
        </div>
      )}

      {/* Main content area: Left list + transfer buttons + Right list + reorder buttons */}
      <div className="select-texts-content">
        {/* Left panel: All available texts */}
        <div className="select-texts-left-panel">
          <div className="select-texts-list-label" id="left-list-label">
            {allLabel}
          </div>
          <div
            className="select-texts-list-container"
            role="listbox"
            aria-labelledby="left-list-label"
            aria-multiselectable="true"
          >
            <table className="select-texts-table">
              <thead>
                <tr>
                  <th
                    style={{ width: '20%' }}
                    onClick={() => handleSort('projectType')}
                    aria-sort={sortConfig.key === 'projectType' ? sortConfig.direction : 'none'}
                  >
                    {colTypeLabel}
                    {renderSortIcon('projectType')}
                  </th>
                  <th
                    style={{ width: '20%' }}
                    onClick={() => handleSort('name')}
                    aria-sort={sortConfig.key === 'name' ? sortConfig.direction : 'none'}
                  >
                    {colNameLabel}
                    {renderSortIcon('name')}
                  </th>
                  <th
                    style={{ width: '40%' }}
                    onClick={() => handleSort('fullName')}
                    aria-sort={sortConfig.key === 'fullName' ? sortConfig.direction : 'none'}
                  >
                    {colFullNameLabel}
                    {renderSortIcon('fullName')}
                  </th>
                  <th
                    style={{ width: '20%' }}
                    onClick={() => handleSort('language')}
                    aria-sort={sortConfig.key === 'language' ? sortConfig.direction : 'none'}
                  >
                    {colLanguageLabel}
                    {renderSortIcon('language')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedLeftItems.map((item) => (
                  <tr
                    key={item.id}
                    className={leftSelection.has(item.id) ? 'selected' : ''}
                    role="option"
                    aria-selected={leftSelection.has(item.id)}
                    onClick={(e) => handleLeftRowClick(item.id, e)}
                    onDoubleClick={() => handleLeftDoubleClick(item)}
                    onContextMenu={(e) => handleLeftContextMenu(e, item)}
                  >
                    <td>{item.projectType}</td>
                    <td>{item.name}</td>
                    <td>{item.fullName}</td>
                    <td>{item.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="select-texts-hint">{addHint}</div>
        </div>

        {/* Transfer buttons */}
        <div className="select-texts-transfer-buttons">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdd}
            disabled={!isAddEnabled}
            aria-label={ariaAddLabel}
            title={addHint}
            className="tw-h-8 tw-w-8 tw-p-0"
          >
            <ChevronRight className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={!isRemoveEnabled}
            aria-label={ariaRemoveLabel}
            title={removeHint}
            className="tw-h-8 tw-w-8 tw-p-0"
          >
            <ChevronLeft className="tw-h-4 tw-w-4" />
          </Button>
        </div>

        {/* Right panel: Selected texts */}
        <div className="select-texts-right-panel">
          <div className="select-texts-list-label" id="right-list-label">
            {selectedLabel}
          </div>
          <div
            className="select-texts-list-container"
            role="listbox"
            aria-labelledby="right-list-label"
          >
            <table className="select-texts-right-table">
              <thead>
                <tr>
                  <th>{colNameLabel}</th>
                </tr>
              </thead>
              <tbody>
                {rightItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`${rightSelection === item.id ? 'selected' : ''} ${requiredIds.has(item.id) ? 'required-item' : ''}`}
                    role="option"
                    aria-selected={rightSelection === item.id}
                    onClick={() => handleRightRowClick(item.id)}
                    onDoubleClick={() => handleRightDoubleClick(item)}
                    onContextMenu={(e) => handleRightContextMenu(e, item)}
                  >
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="select-texts-hint">{removeHint}</div>
        </div>

        {/* Reorder buttons */}
        <div className="select-texts-reorder-buttons">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMoveUp}
            disabled={!isMoveUpEnabled}
            aria-label={ariaMoveUpLabel}
            className="tw-h-8 tw-w-8 tw-p-0"
          >
            <ChevronUp className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMoveDown}
            disabled={!isMoveDownEnabled}
            aria-label={ariaMoveDownLabel}
            className="tw-h-8 tw-w-8 tw-p-0"
          >
            <ChevronDown className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      </div>

      {/* Footer: Saved collections + OK/Cancel */}
      <div className="select-texts-footer">
        <div className="select-texts-saved-section">
          <SettingSaver<SavedScrTextList>
            items={savedCollections}
            placeholder={savedCollectionsPlaceholder}
            onSelect={handleSelectCollection}
            onSave={handleSaveCollection}
            onDelete={handleDeleteCollection}
            confirmOverwriteMessage={replaceConfirmMsg}
          />
        </div>
        <div className="select-texts-actions">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" onClick={handleOk}>
            {okLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
