/**
 * === NEW IN PT10 === Reason: React web view for the Select Texts dialog (SCR-002). PT9 equivalent:
 * ScrTextListSelectionForm.cs Maps to: UI-PKG-001, CAP-UI-002
 */
import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
} from 'lucide-react';
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from 'platform-bible-react';
import { LocalizeKey, getErrorMessage } from 'platform-bible-utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SettingSaver from './components/setting-saver.component';
import {
  canMoveDown,
  canMoveUp,
  isRequiredItem,
  parseSavedScrTextListArray,
  parseScrTextInfoArray,
} from './select-texts.utils';
import type { SavedScrTextList, ScrTextInfo, SortDirection, SortKey } from './select-texts.utils';

// #region Localization

const SELECT_TEXTS_STRING_KEYS: LocalizeKey[] = [
  '%selectTexts_title%',
  '%selectTexts_allLabel%',
  '%selectTexts_selectedLabel%',
  '%selectTexts_addHint%',
  '%selectTexts_removeHint%',
  '%selectTexts_savedCollections%',
  '%selectTexts_replaceConfirm%',
  '%selectTexts_addSelectedText%',
  '%selectTexts_removeSelectedText%',
  '%selectTexts_save_ariaLabel%',
  '%selectTexts_delete_ariaLabel%',
  '%selectTexts_addButton_ariaLabel%',
  '%selectTexts_removeButton_ariaLabel%',
  '%selectTexts_moveUpButton_ariaLabel%',
  '%selectTexts_moveDownButton_ariaLabel%',
  '%selectTexts_savedCollections_ariaLabel%',
  '%selectTexts_colType%',
  '%selectTexts_colName%',
  '%selectTexts_colFullName%',
  '%selectTexts_colLanguage%',
  '%general_ok%',
  '%general_cancel%',
  '%general_yes%',
  '%general_no%',
];

// #endregion

global.webViewComponent = function SelectTextsWebView({ useWebViewState }: WebViewProps) {
  // #region State

  const [localizedStrings] = useLocalizedStrings(useMemo(() => SELECT_TEXTS_STRING_KEYS, []));

  // Parse initial data from web view state
  const [initialSelectionsJson] = useWebViewState<string>('initialSelections', '[]');
  const [requiredSelectionsJson] = useWebViewState<string>('requiredSelections', '[]');

  const initialSelections: ScrTextInfo[] = useMemo(() => {
    try {
      return parseScrTextInfoArray(JSON.parse(initialSelectionsJson));
    } catch {
      return [];
    }
  }, [initialSelectionsJson]);

  const requiredSelections: ScrTextInfo[] = useMemo(() => {
    try {
      return parseScrTextInfoArray(JSON.parse(requiredSelectionsJson));
    } catch {
      return [];
    }
  }, [requiredSelectionsJson]);

  const [allTexts, setAllTexts] = useState<ScrTextInfo[]>([]);
  const [leftItems, setLeftItems] = useState<ScrTextInfo[]>([]);
  const [rightItems, setRightItems] = useState<ScrTextInfo[]>([]);
  const [leftSelection, setLeftSelection] = useState<Set<string>>(new Set());
  const [rightSelection, setRightSelection] = useState<string | undefined>(undefined);
  const [savedCollections, setSavedCollections] = useState<SavedScrTextList[]>([]);
  const [savedCollectionName, setSavedCollectionName] = useState('');
  const [showOverwriteDialog, setShowOverwriteDialog] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: 'name', direction: 'ascending' });

  // #endregion

  // #region Data loading (PAPI)

  useEffect(() => {
    async function loadData() {
      try {
        // Load available texts via real PAPI command
        const textsResult = await papi.commands.sendCommand(
          'platformScripture.filterEligibleTexts',
        );
        const texts = parseScrTextInfoArray(textsResult);

        // Filter out IsSecondaryText items
        const filtered = texts.filter((t) => !t.isSecondaryText);
        setAllTexts(filtered);

        // Get project types for display
        const textsWithTypes = await Promise.all(
          filtered.map(async (t) => {
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

        // Split into left (available) and right (selected) based on initial selections
        const selectedIds = new Set(initialSelections.map((s) => s.id));
        const requiredIds = new Set(requiredSelections.map((r) => r.id));

        const rightInit = [
          ...requiredSelections,
          ...initialSelections.filter((s) => !requiredIds.has(s.id)),
        ];

        const leftInit = textsWithTypes.filter(
          (t) => !selectedIds.has(t.id) && !requiredIds.has(t.id),
        );

        setLeftItems(leftInit.sort((a, b) => a.name.localeCompare(b.name)));
        setRightItems(rightInit);
      } catch (error) {
        logger.error(`SelectTextsDialog: Error loading data: ${getErrorMessage(error)}`);
      }
    }

    loadData();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load saved collections
  useEffect(() => {
    async function loadSavedCollections() {
      try {
        const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
        setSavedCollections(parseSavedScrTextListArray(result));
      } catch (error) {
        logger.debug(
          `SelectTextsDialog: Could not load saved collections: ${getErrorMessage(error)}`,
        );
      }
    }

    loadSavedCollections();
  }, []);

  // #endregion

  // #region Sorting

  const sortedLeftItems = useMemo(() => {
    return [...leftItems].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? '';
      const bVal = b[sortConfig.key] ?? '';
      const cmp = aVal.localeCompare(bVal);
      return sortConfig.direction === 'ascending' ? cmp : -cmp;
    });
  }, [leftItems, sortConfig]);

  const handleSort = useCallback((key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending',
    }));
  }, []);

  const buildSortIcon = useCallback(
    (key: SortKey) => {
      if (sortConfig.key !== key) return <ChevronsUpDown className="tw-pl-1" size={14} />;
      return sortConfig.direction === 'ascending' ? (
        <ChevronUp className="tw-pl-1" size={14} />
      ) : (
        <ChevronDown className="tw-pl-1" size={14} />
      );
    },
    [sortConfig],
  );

  // #endregion

  // #region Transfer actions

  const handleAdd = useCallback(() => {
    if (leftSelection.size === 0) return;
    const toAdd = leftItems.filter((item) => leftSelection.has(item.id));
    setRightItems((prev) => [...prev, ...toAdd]);
    setLeftItems((prev) => prev.filter((item) => !leftSelection.has(item.id)));
    setLeftSelection(new Set());
  }, [leftItems, leftSelection]);

  const handleRemove = useCallback(() => {
    if (rightSelection === undefined) return;
    const item = rightItems.find((i) => i.id === rightSelection);
    if (!item || isRequiredItem(item, requiredSelections)) return;
    setLeftItems((prev) => [...prev, item].sort((a, b) => a.name.localeCompare(b.name)));
    setRightItems((prev) => prev.filter((i) => i.id !== rightSelection));
    setRightSelection(undefined);
  }, [rightItems, rightSelection, requiredSelections]);

  const handleMoveUp = useCallback(() => {
    if (rightSelection === undefined) return;
    const index = rightItems.findIndex((i) => i.id === rightSelection);
    if (!canMoveUp(index, rightItems, requiredSelections)) return;
    const newItems = [...rightItems];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setRightItems(newItems);
  }, [rightItems, rightSelection, requiredSelections]);

  const handleMoveDown = useCallback(() => {
    if (rightSelection === undefined) return;
    const index = rightItems.findIndex((i) => i.id === rightSelection);
    if (!canMoveDown(index, rightItems, requiredSelections)) return;
    const newItems = [...rightItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setRightItems(newItems);
  }, [rightItems, rightSelection, requiredSelections]);

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
      if (isRequiredItem(item, requiredSelections)) return;
      setLeftItems((prev) => [...prev, item].sort((a, b) => a.name.localeCompare(b.name)));
      setRightItems((prev) => prev.filter((i) => i.id !== item.id));
      if (rightSelection === item.id) setRightSelection(undefined);
    },
    [requiredSelections, rightSelection],
  );

  // #endregion

  // #region Left list selection

  const handleLeftRowClick = useCallback((item: ScrTextInfo, event: React.MouseEvent) => {
    setLeftSelection((prev) => {
      const next = new Set(prev);
      if (event.ctrlKey || event.metaKey) {
        if (next.has(item.id)) next.delete(item.id);
        else next.add(item.id);
      } else {
        next.clear();
        next.add(item.id);
      }
      return next;
    });
  }, []);

  // #endregion

  // #region Saved collections

  const handleSaveCollection = useCallback(
    async (name: string) => {
      const existing = savedCollections.find((c) => c.name === name);
      if (existing) {
        setSavedCollectionName(name);
        setShowOverwriteDialog(true);
        return;
      }
      try {
        await papi.commands.sendCommand('platformScripture.saveTextList', {
          name,
          scrTextNames: rightItems.map((item) => item.name),
          scrProjectIndex: 0,
          hebGrkIndex: -1,
        });
        const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
        setSavedCollections(parseSavedScrTextListArray(result));
      } catch (error) {
        logger.error(`SelectTextsDialog: Error saving collection: ${getErrorMessage(error)}`);
      }
    },
    [rightItems, savedCollections],
  );

  const handleConfirmOverwrite = useCallback(async () => {
    setShowOverwriteDialog(false);
    try {
      await papi.commands.sendCommand('platformScripture.saveTextList', {
        name: savedCollectionName,
        scrTextNames: rightItems.map((item) => item.name),
        scrProjectIndex: 0,
        hebGrkIndex: -1,
      });
      const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
      setSavedCollections(parseSavedScrTextListArray(result));
    } catch (error) {
      logger.error(`SelectTextsDialog: Error saving collection: ${getErrorMessage(error)}`);
    }
  }, [rightItems, savedCollectionName]);

  const handleDeleteCollection = useCallback(async (name: string) => {
    try {
      await papi.commands.sendCommand('platformScripture.deleteTextList', name);
      const result = await papi.commands.sendCommand('platformScripture.getSavedTextCollections');
      setSavedCollections(parseSavedScrTextListArray(result));
    } catch (error) {
      logger.error(`SelectTextsDialog: Error deleting collection: ${getErrorMessage(error)}`);
    }
  }, []);

  const handleSelectCollection = useCallback(
    (name: string) => {
      const collection = savedCollections.find((c) => c.name === name);
      if (!collection) return;

      // Resolve saved names to ScrTextInfo items
      const allAvailable = [...allTexts, ...rightItems];
      const uniqueMap = new Map<string, ScrTextInfo>();
      allAvailable.forEach((t) => uniqueMap.set(t.name, t));

      const resolvedItems = collection.scrTextNames
        .map((n) => uniqueMap.get(n))
        .filter((item): item is ScrTextInfo => item !== undefined);

      // Rebuild right items: required items at their positions, then resolved
      const requiredIds = new Set(requiredSelections.map((r) => r.id));
      const newRight = [
        ...requiredSelections,
        ...resolvedItems.filter((item) => !requiredIds.has(item.id)),
      ];

      // Rebuild left items
      const rightIds = new Set(newRight.map((i) => i.id));
      const newLeft = allTexts
        .filter((t) => !rightIds.has(t.id))
        .sort((a, b) => a.name.localeCompare(b.name));

      setRightItems(newRight);
      setLeftItems(newLeft);
      setSavedCollectionName(name);
    },
    [allTexts, rightItems, requiredSelections, savedCollections],
  );

  // #endregion

  // #region Dialog actions

  const handleOk = useCallback(() => {
    const requiredIds = new Set(requiredSelections.map((r) => r.id));
    const selections = rightItems.filter((item) => !requiredIds.has(item.id));
    logger.info(`SelectTextsDialog OK: ${JSON.stringify({ action: 'ok', selections })}`);
  }, [rightItems, requiredSelections]);

  const handleCancel = useCallback(() => {
    logger.info('SelectTextsDialog Cancel');
  }, []);

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

  // #endregion

  // #region Derived state

  const rightSelectionIndex = useMemo(() => {
    if (rightSelection === undefined) return -1;
    return rightItems.findIndex((i) => i.id === rightSelection);
  }, [rightItems, rightSelection]);

  const selectedRightItem = rightItems.find((i) => i.id === rightSelection);

  const isAddDisabled = leftSelection.size === 0;
  const isRemoveDisabled =
    rightSelection === undefined ||
    (selectedRightItem !== undefined && isRequiredItem(selectedRightItem, requiredSelections));
  const isMoveUpDisabled =
    rightSelection === undefined || !canMoveUp(rightSelectionIndex, rightItems, requiredSelections);
  const isMoveDownDisabled =
    rightSelection === undefined ||
    !canMoveDown(rightSelectionIndex, rightItems, requiredSelections);

  const savedCollectionNames = useMemo(
    () => savedCollections.map((c) => c.name),
    [savedCollections],
  );

  // #endregion

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="pr-twp select-texts-dialog"
      data-testid="select-texts-dialog"
      onKeyDown={handleKeyDown}
    >
      {/* Main body: left list, transfer buttons, right list, reorder buttons */}
      <div className="select-texts-body">
        {/* Left panel: All texts */}
        <div className="select-texts-left-panel">
          <Label className="tw-mb-1 tw-font-semibold">
            {localizedStrings['%selectTexts_allLabel%']}
          </Label>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="select-texts-list-container">
                <Table stickyHeader className="select-texts-left-table">
                  <TableHeader stickyHeader>
                    <TableRow>
                      <TableHead onClick={() => handleSort('projectType')} style={{ width: '20%' }}>
                        <div className="tw-flex tw-cursor-pointer tw-items-center">
                          <span>{localizedStrings['%selectTexts_colType%']}</span>
                          {buildSortIcon('projectType')}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort('name')} style={{ width: '20%' }}>
                        <div className="tw-flex tw-cursor-pointer tw-items-center">
                          <span>{localizedStrings['%selectTexts_colName%']}</span>
                          {buildSortIcon('name')}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort('fullName')} style={{ width: '40%' }}>
                        <div className="tw-flex tw-cursor-pointer tw-items-center">
                          <span>{localizedStrings['%selectTexts_colFullName%']}</span>
                          {buildSortIcon('fullName')}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort('language')} style={{ width: '20%' }}>
                        <div className="tw-flex tw-cursor-pointer tw-items-center">
                          <span>{localizedStrings['%selectTexts_colLanguage%']}</span>
                          {buildSortIcon('language')}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLeftItems.map((item) => (
                      <TableRow
                        key={item.id}
                        className={cn(
                          'tw-cursor-pointer',
                          leftSelection.has(item.id) && 'tw-bg-muted/50',
                        )}
                        onClick={(e) => handleLeftRowClick(item, e)}
                        onDoubleClick={() => handleLeftDoubleClick(item)}
                      >
                        <TableCell>{item.projectType}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.language}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem disabled={isAddDisabled} onClick={handleAdd}>
                {localizedStrings['%selectTexts_addSelectedText%']}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <Label className="select-texts-hint tw-text-muted-foreground">
            {localizedStrings['%selectTexts_addHint%']}
          </Label>
        </div>

        {/* Transfer buttons */}
        <div className="select-texts-transfer-buttons">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isAddDisabled}
            onClick={handleAdd}
            aria-label={localizedStrings['%selectTexts_addButton_ariaLabel%']}
          >
            <ChevronRight className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isRemoveDisabled}
            onClick={handleRemove}
            aria-label={localizedStrings['%selectTexts_removeButton_ariaLabel%']}
          >
            <ChevronLeft className="tw-h-4 tw-w-4" />
          </Button>
        </div>

        {/* Right panel: Selected texts */}
        <div className="select-texts-right-panel">
          <Label className="tw-mb-1 tw-font-semibold">
            {localizedStrings['%selectTexts_selectedLabel%']}
          </Label>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="select-texts-list-container">
                {rightItems.map((item) => {
                  const required = isRequiredItem(item, requiredSelections);
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                      key={item.id}
                      className={cn(
                        'select-texts-right-list-item',
                        rightSelection === item.id && 'selected',
                        required && 'required select-texts-required-item',
                      )}
                      onClick={() => setRightSelection(item.id)}
                      onDoubleClick={() => handleRightDoubleClick(item)}
                    >
                      {required ? `*${item.name}` : item.name}
                    </div>
                  );
                })}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem disabled={isRemoveDisabled} onClick={handleRemove}>
                {localizedStrings['%selectTexts_removeSelectedText%']}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <Label className="select-texts-hint tw-text-muted-foreground">
            {localizedStrings['%selectTexts_removeHint%']}
          </Label>
        </div>

        {/* Reorder buttons */}
        <div className="select-texts-reorder-buttons">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isMoveUpDisabled}
            onClick={handleMoveUp}
            aria-label={localizedStrings['%selectTexts_moveUpButton_ariaLabel%']}
          >
            <ArrowUp className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isMoveDownDisabled}
            onClick={handleMoveDown}
            aria-label={localizedStrings['%selectTexts_moveDownButton_ariaLabel%']}
          >
            <ArrowDown className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      </div>

      {/* Footer: saved collections + OK/Cancel */}
      <div className="select-texts-footer">
        <div className="select-texts-saved-collections">
          <SettingSaver
            savedNames={savedCollectionNames}
            selectedName={savedCollectionName}
            onSelect={handleSelectCollection}
            onSave={handleSaveCollection}
            onDelete={handleDeleteCollection}
            placeholder={localizedStrings['%selectTexts_savedCollections%']}
            ariaLabel={localizedStrings['%selectTexts_savedCollections_ariaLabel%']}
            saveAriaLabel={localizedStrings['%selectTexts_save_ariaLabel%']}
            deleteAriaLabel={localizedStrings['%selectTexts_delete_ariaLabel%']}
          />
        </div>
        <div className="select-texts-footer-actions">
          <Button type="button" variant="default" onClick={handleOk}>
            {localizedStrings['%general_ok%']}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {localizedStrings['%general_cancel%']}
          </Button>
        </div>
      </div>

      {/* Overwrite confirmation overlay (Dialog not available in platform-bible-react) */}
      {showOverwriteDialog && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-background/80">
          <div className="tw-max-w-sm tw-rounded-lg tw-border tw-border-border tw-bg-background tw-p-6">
            <Label className="tw-mb-4 tw-block tw-text-base tw-font-semibold">
              {localizedStrings['%selectTexts_replaceConfirm%']}
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
