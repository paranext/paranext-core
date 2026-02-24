import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import type { SavedScrTextList, ScrTextInfo } from 'platform-scripture';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import SettingSaver from './components/setting-saver.component';

// #region Localization Keys

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
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
  '%selectTexts_save%',
  '%selectTexts_delete%',
  '%selectTexts_ok%',
  '%selectTexts_cancel%',
];

/** Get English default for a localization key */
function getEnglishDefault(key: LocalizeKey): string {
  const defaults: Record<string, string> = {
    '%selectTexts_title%': 'Select Texts',
    '%selectTexts_allLabel%': 'All:',
    '%selectTexts_selectedLabel%': 'Selected:',
    '%selectTexts_addHint%': 'Double-click text to add',
    '%selectTexts_removeHint%': 'Double-click text to remove',
    '%selectTexts_savedCollections%': 'Saved text collections',
    '%selectTexts_replaceConfirm%': 'Replace existing selection?',
    '%selectTexts_colType%': 'Type',
    '%selectTexts_colName%': 'Name',
    '%selectTexts_colFullName%': 'Full Name',
    '%selectTexts_colLanguage%': 'Language',
    '%selectTexts_save%': 'Save',
    '%selectTexts_delete%': 'Delete',
    '%selectTexts_ok%': 'OK',
    '%selectTexts_cancel%': 'Cancel',
  };
  return defaults[key] || key;
}

// #endregion

global.webViewComponent = function SelectTextsWebView({ useWebViewState }: WebViewProps) {
  // Localized strings
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const getString = useCallback(
    (key: LocalizeKey): string => localizedStrings[key] || getEnglishDefault(key),
    [localizedStrings],
  );

  // State from web view provider
  const [initialSelectionIds] = useWebViewState<string[]>('initialSelectionIds', []);
  const [requiredSelectionIds] = useWebViewState<string[]>('requiredSelectionIds', []);

  // Component state
  const [allTexts, setAllTexts] = useState<ScrTextInfo[]>([]);
  const [leftItems, setLeftItems] = useState<ScrTextInfo[]>([]);
  const [rightItems, setRightItems] = useState<ScrTextInfo[]>([]);
  const [leftSelection, setLeftSelection] = useState<Set<number>>(new Set());
  const [rightSelection, setRightSelection] = useState<number | undefined>(undefined);
  const [savedCollections, setSavedCollections] = useState<SavedScrTextList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Track which items in rightItems are required
  const requiredIndices = useMemo(() => {
    const indices = new Set<number>();
    rightItems.forEach((item, index) => {
      if (requiredSelectionIds.includes(item.id)) {
        indices.add(index);
      }
    });
    return indices;
  }, [rightItems, requiredSelectionIds]);

  // Load data on mount
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setIsLoading(true);

        // Load available texts from backend
        let availableTexts: ScrTextInfo[] = [];
        try {
          const result = await papi.commands.sendCommand('platformScripture.filterEligibleTexts');
          if (Array.isArray(result)) {
            availableTexts = result;
          }
        } catch (err) {
          logger.warn(`Failed to load available texts: ${err}`);
          availableTexts = [];
        }

        // Filter out IsSecondaryText
        availableTexts = availableTexts.filter((t) => !t.isSecondaryText);

        // Load saved collections
        let collections: SavedScrTextList[] = [];
        try {
          const colResult = await papi.commands.sendCommand(
            'platformScripture.getSavedTextCollections',
          );
          if (Array.isArray(colResult)) {
            collections = colResult;
          }
        } catch (err) {
          logger.warn(`Failed to load saved collections: ${err}`);
          collections = [];
        }

        if (cancelled) return;

        setAllTexts(availableTexts);

        // Split into left and right based on initial selections
        const initialIds = new Set(initialSelectionIds);
        const requiredIds = new Set(requiredSelectionIds);

        // Build right items: required first, then initial selections
        const rightRequired = availableTexts.filter((t) => requiredIds.has(t.id));
        const rightInitial = availableTexts.filter(
          (t) => initialIds.has(t.id) && !requiredIds.has(t.id),
        );
        const rightList = [...rightRequired, ...rightInitial];

        // Left items: everything not in right list
        const rightIdSet = new Set(rightList.map((t) => t.id));
        const leftList = availableTexts
          .filter((t) => !rightIdSet.has(t.id))
          .sort((a, b) => a.name.localeCompare(b.name));

        setRightItems(rightList);
        setLeftItems(leftList);
        setSavedCollections(collections);
      } catch (err) {
        logger.error(`Failed to initialize SelectTextsDialog: ${err}`);
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
  }, [initialSelectionIds, requiredSelectionIds]);

  // #region Transfer Operations

  const handleAdd = useCallback(() => {
    if (leftSelection.size === 0) return;

    const selectedItems = Array.from(leftSelection)
      .sort((a, b) => a - b)
      .map((idx) => leftItems[idx])
      .filter(Boolean);

    const selectedIds = new Set(selectedItems.map((item) => item.id));

    setRightItems((prev) => [...prev, ...selectedItems]);
    setLeftItems((prev) => prev.filter((item) => !selectedIds.has(item.id)));
    setLeftSelection(new Set());
  }, [leftSelection, leftItems]);

  const handleRemove = useCallback(() => {
    if (rightSelection === undefined) return;
    if (requiredIndices.has(rightSelection)) return;

    const removedItem = rightItems[rightSelection];
    if (!removedItem) return;

    setRightItems((prev) => prev.filter((_, idx) => idx !== rightSelection));
    setLeftItems((prev) => [...prev, removedItem].sort((a, b) => a.name.localeCompare(b.name)));
    setRightSelection(undefined);
  }, [rightSelection, rightItems, requiredIndices]);

  const handleDoubleClickLeft = useCallback(
    (index: number) => {
      const item = leftItems[index];
      if (!item) return;

      setRightItems((prev) => [...prev, item]);
      setLeftItems((prev) => prev.filter((_, idx) => idx !== index));
      setLeftSelection(new Set());
    },
    [leftItems],
  );

  const handleDoubleClickRight = useCallback(
    (index: number) => {
      if (requiredIndices.has(index)) return;

      const item = rightItems[index];
      if (!item) return;

      setRightItems((prev) => prev.filter((_, idx) => idx !== index));
      setLeftItems((prev) => [...prev, item].sort((a, b) => a.name.localeCompare(b.name)));
      setRightSelection(undefined);
    },
    [rightItems, requiredIndices],
  );

  // #endregion

  // #region Reorder Operations

  const canMoveUp = useMemo(() => {
    if (rightSelection === undefined || rightSelection === 0) return false;
    if (requiredIndices.has(rightSelection)) return false;
    if (requiredIndices.has(rightSelection - 1)) return false;
    return true;
  }, [rightSelection, requiredIndices]);

  const canMoveDown = useMemo(() => {
    if (rightSelection === undefined || rightSelection >= rightItems.length - 1) return false;
    if (requiredIndices.has(rightSelection)) return false;
    if (requiredIndices.has(rightSelection + 1)) return false;
    return true;
  }, [rightSelection, rightItems.length, requiredIndices]);

  const handleMoveUp = useCallback(() => {
    if (!canMoveUp || rightSelection === undefined) return;

    setRightItems((prev) => {
      const newItems = [...prev];
      [newItems[rightSelection - 1], newItems[rightSelection]] = [
        newItems[rightSelection],
        newItems[rightSelection - 1],
      ];
      return newItems;
    });
    setRightSelection(rightSelection - 1);
  }, [canMoveUp, rightSelection]);

  const handleMoveDown = useCallback(() => {
    if (!canMoveDown || rightSelection === undefined) return;

    setRightItems((prev) => {
      const newItems = [...prev];
      [newItems[rightSelection], newItems[rightSelection + 1]] = [
        newItems[rightSelection + 1],
        newItems[rightSelection],
      ];
      return newItems;
    });
    setRightSelection(rightSelection + 1);
  }, [canMoveDown, rightSelection]);

  // #endregion

  // #region Saved Collections

  const handleSelectCollection = useCallback(
    (name: string) => {
      const collection = savedCollections.find((c) => c.name === name);
      if (!collection) return;

      // Resolve names to ScrTextInfo objects
      const nameSet = new Set(collection.scrTextNames);
      const resolvedTexts = allTexts.filter((t) => nameSet.has(t.name));

      // Rebuild right items preserving required items
      const requiredIds = new Set(requiredSelectionIds);
      const requiredItems = rightItems.filter((item) => requiredIds.has(item.id));
      const nonRequiredResolved = resolvedTexts.filter((t) => !requiredIds.has(t.id));

      const newRight = [...requiredItems, ...nonRequiredResolved];
      const newRightIds = new Set(newRight.map((t) => t.id));
      const newLeft = allTexts
        .filter((t) => !newRightIds.has(t.id))
        .sort((a, b) => a.name.localeCompare(b.name));

      setRightItems(newRight);
      setLeftItems(newLeft);
      setRightSelection(undefined);
      setLeftSelection(new Set());
    },
    [savedCollections, allTexts, requiredSelectionIds, rightItems],
  );

  const handleSaveCollection = useCallback(
    async (name: string) => {
      // Check if overwrite
      const existing = savedCollections.find((c) => c.name === name);
      if (existing) {
        const confirmMessage = getString('%selectTexts_replaceConfirm%');
        // eslint-disable-next-line no-alert
        if (!window.confirm(confirmMessage)) return;
      }

      try {
        await papi.commands.sendCommand(
          'platformScripture.saveTextList',
          name,
          rightItems.map((item) => item.name),
        );

        // Reload saved collections
        try {
          const colResult = await papi.commands.sendCommand(
            'platformScripture.getSavedTextCollections',
          );
          if (Array.isArray(colResult)) {
            setSavedCollections(colResult);
          }
        } catch (err) {
          logger.warn(`Failed to reload saved collections: ${err}`);
        }
      } catch (err) {
        logger.error(`Failed to save collection: ${err}`);
      }
    },
    [savedCollections, rightItems, getString],
  );

  const handleDeleteCollection = useCallback(async (name: string) => {
    try {
      await papi.commands.sendCommand('platformScripture.deleteTextList', name);

      // Reload saved collections
      try {
        const colResult = await papi.commands.sendCommand(
          'platformScripture.getSavedTextCollections',
        );
        if (Array.isArray(colResult)) {
          setSavedCollections(colResult);
        }
      } catch (err) {
        logger.warn(`Failed to reload saved collections: ${err}`);
      }
    } catch (err) {
      logger.error(`Failed to delete collection: ${err}`);
    }
  }, []);

  // #endregion

  // #region Left list multi-select

  const handleLeftRowClick = useCallback(
    (index: number, event: React.MouseEvent) => {
      if (event.ctrlKey || event.metaKey) {
        setLeftSelection((prev) => {
          const next = new Set(prev);
          if (next.has(index)) {
            next.delete(index);
          } else {
            next.add(index);
          }
          return next;
        });
      } else if (event.shiftKey && leftSelection.size > 0) {
        const anchor = Math.min(...Array.from(leftSelection));
        const start = Math.min(anchor, index);
        const end = Math.max(anchor, index);
        const next = new Set<number>();
        for (let i = start; i <= end; i++) {
          next.add(i);
        }
        setLeftSelection(next);
      } else {
        setLeftSelection(new Set([index]));
      }
    },
    [leftSelection],
  );

  // #endregion

  // #region Dialog Actions

  const handleOk = useCallback(() => {
    // Return selected texts excluding required items
    const requiredIds = new Set(requiredSelectionIds);
    const selections = rightItems.filter((item) => !requiredIds.has(item.id));

    // Send result back via web view mechanism
    const result = {
      action: 'ok',
      selections,
    };

    logger.info(`SelectTexts OK: ${JSON.stringify(result)}`);
  }, [rightItems, requiredSelectionIds]);

  const handleCancel = useCallback(() => {
    const result = {
      action: 'cancel',
    };
    logger.info(`SelectTexts Cancel: ${JSON.stringify(result)}`);
  }, []);

  // #endregion

  // Button enabled states
  const addEnabled = leftSelection.size > 0;
  const removeEnabled = rightSelection !== undefined && !requiredIndices.has(rightSelection);

  if (isLoading) {
    return (
      <div className="select-texts-dialog" data-testid="select-texts-dialog">
        <div className="tw-flex tw-items-center tw-justify-center tw-flex-1">
          <span>{getString('%selectTexts_title%')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="select-texts-dialog" data-testid="select-texts-dialog">
      {/* Main two-pane area */}
      <div className="select-texts-main">
        {/* Left panel: All texts */}
        <div className="select-texts-left-panel">
          <div className="select-texts-list-label">{getString('%selectTexts_allLabel%')}</div>
          <div
            className="select-texts-list-container"
            role="listbox"
            aria-label={getString('%selectTexts_allLabel%')}
            aria-multiselectable="true"
          >
            <table className="select-texts-table">
              <thead>
                <tr>
                  <th className="col-type">{getString('%selectTexts_colType%')}</th>
                  <th className="col-name">{getString('%selectTexts_colName%')}</th>
                  <th className="col-fullname">{getString('%selectTexts_colFullName%')}</th>
                  <th className="col-language">{getString('%selectTexts_colLanguage%')}</th>
                </tr>
              </thead>
              <tbody>
                {leftItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={leftSelection.has(index) ? 'selected' : ''}
                    role="option"
                    aria-selected={leftSelection.has(index)}
                    onClick={(e) => handleLeftRowClick(index, e)}
                    onDoubleClick={() => handleDoubleClickLeft(index)}
                  >
                    <td className="col-type">{item.projectType}</td>
                    <td className="col-name">{item.name}</td>
                    <td className="col-fullname">{item.fullName}</td>
                    <td className="col-language">{item.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="select-texts-hint">{getString('%selectTexts_addHint%')}</div>
        </div>

        {/* Center transfer buttons */}
        <div className="select-texts-center-buttons">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAdd}
            disabled={!addEnabled}
            aria-label={getString('%selectTexts_addHint%')}
          >
            <ChevronRight className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleRemove}
            disabled={!removeEnabled}
            aria-label={getString('%selectTexts_removeHint%')}
          >
            <ChevronLeft className="tw-h-4 tw-w-4" />
          </Button>
        </div>

        {/* Right panel: Selected texts + reorder */}
        <div className="select-texts-right-panel">
          <div className="select-texts-list-label">{getString('%selectTexts_selectedLabel%')}</div>
          <div className="select-texts-right-panel-with-reorder">
            <div
              className="select-texts-list-container"
              role="listbox"
              aria-label={getString('%selectTexts_selectedLabel%')}
            >
              <table className="select-texts-table">
                <thead>
                  <tr>
                    <th>{getString('%selectTexts_colName%')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rightItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${rightSelection === index ? 'selected' : ''} ${requiredIndices.has(index) ? 'required' : ''}`}
                      role="option"
                      aria-selected={rightSelection === index}
                      onClick={() => setRightSelection(index)}
                      onDoubleClick={() => handleDoubleClickRight(index)}
                    >
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="select-texts-reorder-buttons">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleMoveUp}
                disabled={!canMoveUp}
                aria-label="Move up"
              >
                <ArrowUp className="tw-h-4 tw-w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleMoveDown}
                disabled={!canMoveDown}
                aria-label="Move down"
              >
                <ArrowDown className="tw-h-4 tw-w-4" />
              </Button>
            </div>
          </div>
          <div className="select-texts-hint">{getString('%selectTexts_removeHint%')}</div>
        </div>
      </div>

      {/* Bottom area: saved collections + OK/Cancel */}
      <div className="select-texts-bottom">
        <SettingSaver
          savedNames={savedCollections.map((c) => c.name)}
          placeholder={getString('%selectTexts_savedCollections%')}
          onSelect={handleSelectCollection}
          onSave={handleSaveCollection}
          onDelete={handleDeleteCollection}
          saveLabel={getString('%selectTexts_save%')}
          deleteLabel={getString('%selectTexts_delete%')}
        />
        <div className="select-texts-dialog-actions">
          <Button type="button" onClick={handleOk}>
            {getString('%selectTexts_ok%')}
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {getString('%selectTexts_cancel%')}
          </Button>
        </div>
      </div>
    </div>
  );
};
