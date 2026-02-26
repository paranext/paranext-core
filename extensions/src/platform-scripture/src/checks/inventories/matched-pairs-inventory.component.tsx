import { logger } from '@papi/frontend';
import { useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  ColumnDef,
  Inventory,
  InventorySummaryItem,
  InventoryTableData,
  Scope,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { getErrorMessage, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import type { InventoryOptionValue } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { CMSOptionsDialog } from './cms-options-dialog.component';
import {
  undoRedoReducer,
  type StatusChangeRecord,
  type UndoRedoState,
} from './matched-pairs-inventory.utils';

const MATCHED_PAIRS_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
  '%webView_matchedPairsInventory_table_header_text%',
  '%webView_inventory_all%',
  '%webView_inventory_approved%',
  '%webView_inventory_unapproved%',
  '%webView_inventory_unknown%',
  '%webView_inventory_scope_currentBook%',
  '%webView_inventory_scope_chapter%',
  '%webView_inventory_scope_verse%',
  '%webView_inventory_filter_text%',
  '%webView_matchedPairsInventory_menu_inventory%',
  '%webView_matchedPairsInventory_menu_setSeparateStatus%',
  '%webView_matchedPairsInventory_menu_editOptions%',
  '%webView_matchedPairsInventory_menu_refresh%',
  '%webView_matchedPairsInventory_toolbar_undo%',
  '%webView_matchedPairsInventory_toolbar_redo%',
  '%webView_matchedPairsInventory_column_verseText%',
  '%webView_matchedPairsInventory_column_nonVerseText%',
  '%webView_matchedPairsInventory_statusBar_item%',
  '%webView_matchedPairsInventory_statusBar_items%',
];

/**
 * Creates column definitions for the matched pairs inventory table.
 *
 * @param textLabel Localized label for the text column
 * @param countLabel Localized label for the count column
 * @param statusLabel Localized label for the status column
 * @param approvedItems Array of approved items
 * @param onApprovedItemsChange Callback for updating approved items
 * @param unapprovedItems Array of unapproved items
 * @param onUnapprovedItemsChange Callback for updating unapproved items
 * @returns Column definitions for the inventory data table
 */
const createColumns = (
  textLabel: string,
  countLabel: string,
  statusLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
  {
    ...inventoryItemColumn(textLabel),
    cell: ({ row }) => (
      <div className="tw-text-lg tw-font-bold tw-font-mono tw-flex tw-justify-center">
        {row.getValue('item')}
      </div>
    ),
  },
  inventoryCountColumn(countLabel),
  inventoryStatusColumn(
    statusLabel,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
];

// Undo/redo types and reducer imported from matched-pairs-inventory.utils.ts

type MatchedPairsInventoryProps = {
  inventoryItems: InventorySummaryItem[] | undefined;
  verseRef?: SerializedVerseRef;
  setVerseRef: (scriptureReference: SerializedVerseRef) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  projectId?: string;
  areInventoryItemsLoading?: boolean;
  onItemSelected?: (itemKey: string) => void;
  /** Whether the user has permission to change item statuses. Defaults to true. */
  canMakeChanges?: boolean;
  /** Whether the user is an administrator (can toggle separation). Defaults to true. */
  isAdministrator?: boolean;
};

export function MatchedPairsInventory({
  inventoryItems,
  setVerseRef,
  localizedStrings,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  scope,
  onScopeChange,
  projectId,
  areInventoryItemsLoading,
  onItemSelected,
  canMakeChanges = true,
  isAdministrator = true,
}: MatchedPairsInventoryProps) {
  const [matchedPairsInventoryStrings] = useLocalizedStrings(MATCHED_PAIRS_INVENTORY_STRING_KEYS);
  const textLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_table_header_text%'],
    [matchedPairsInventoryStrings],
  );
  const countLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_inventory_table_header_count%'],
    [matchedPairsInventoryStrings],
  );
  const statusLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_inventory_table_header_status%'],
    [matchedPairsInventoryStrings],
  );
  const inventoryMenuLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_menu_inventory%'],
    [matchedPairsInventoryStrings],
  );
  const setSeparateStatusLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_menu_setSeparateStatus%'],
    [matchedPairsInventoryStrings],
  );
  const editOptionsLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_menu_editOptions%'],
    [matchedPairsInventoryStrings],
  );
  const refreshLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_menu_refresh%'],
    [matchedPairsInventoryStrings],
  );
  const undoLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_toolbar_undo%'],
    [matchedPairsInventoryStrings],
  );
  const redoLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_toolbar_redo%'],
    [matchedPairsInventoryStrings],
  );
  const verseTextLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_column_verseText%'],
    [matchedPairsInventoryStrings],
  );
  const nonVerseTextLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_column_nonVerseText%'],
    [matchedPairsInventoryStrings],
  );
  const itemLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_statusBar_item%'],
    [matchedPairsInventoryStrings],
  );
  const itemsLabel = useMemo(
    () => matchedPairsInventoryStrings['%webView_matchedPairsInventory_statusBar_items%'],
    [matchedPairsInventoryStrings],
  );

  // Undo/redo state (BHV-312)
  const [undoRedoState, dispatchUndoRedo] = useReducer(undoRedoReducer, {
    undoStack: [],
    redoStack: [],
  });

  // Separation state (BHV-314: verse/non-verse separation toggle)
  const [isSeparated, setIsSeparated] = useState(false);

  // Wrap onApprovedItemsChange and onUnapprovedItemsChange with undo tracking
  const previousApprovedRef = useRef<string[]>(approvedItems);
  const previousUnapprovedRef = useRef<string[]>(unapprovedItems);

  useEffect(() => {
    previousApprovedRef.current = approvedItems;
    previousUnapprovedRef.current = unapprovedItems;
  }, [approvedItems, unapprovedItems]);

  const handleApprovedItemsChangeWithUndo = useCallback(
    (items: string[]) => {
      dispatchUndoRedo({
        type: 'PUSH_CHANGE',
        change: {
          itemKey: '',
          previousApproved: previousApprovedRef.current,
          previousUnapproved: previousUnapprovedRef.current,
          newApproved: items,
          newUnapproved: unapprovedItems,
        },
      });
      onApprovedItemsChange(items);
    },
    [onApprovedItemsChange, unapprovedItems],
  );

  const handleUnapprovedItemsChangeWithUndo = useCallback(
    (items: string[]) => {
      dispatchUndoRedo({
        type: 'PUSH_CHANGE',
        change: {
          itemKey: '',
          previousApproved: approvedItems,
          previousUnapproved: previousUnapprovedRef.current,
          newApproved: approvedItems,
          newUnapproved: items,
        },
      });
      onUnapprovedItemsChange(items);
    },
    [onUnapprovedItemsChange, approvedItems],
  );

  // Keep a synchronous ref to undoRedoState so handlers always see the latest value.
  // useReducer dispatch is synchronous, but the component re-render (which updates
  // useCallback closures) is deferred. Using a ref ensures handleRedo sees the
  // redoStack populated by a preceding handleUndo dispatch within the same render cycle.
  const undoRedoRef = useRef(undoRedoState);
  undoRedoRef.current = undoRedoState;

  const handleUndo = useCallback(() => {
    const state = undoRedoRef.current;
    if (state.undoStack.length === 0) return;
    const lastChange = state.undoStack[state.undoStack.length - 1];
    onApprovedItemsChange(lastChange.previousApproved);
    onUnapprovedItemsChange(lastChange.previousUnapproved);
    dispatchUndoRedo({ type: 'UNDO' });
  }, [onApprovedItemsChange, onUnapprovedItemsChange]);

  const handleRedo = useCallback(() => {
    const state = undoRedoRef.current;
    if (state.redoStack.length === 0) return;
    const nextChange = state.redoStack[state.redoStack.length - 1];
    onApprovedItemsChange(nextChange.newApproved);
    onUnapprovedItemsChange(nextChange.newUnapproved);
    dispatchUndoRedo({ type: 'REDO' });
  }, [onApprovedItemsChange, onUnapprovedItemsChange]);

  const handleToggleSeparation = useCallback(() => {
    setIsSeparated((prev) => !prev);
    dispatchUndoRedo({ type: 'CLEAR' });
  }, []);

  // Track selected item for keyboard shortcuts (GAP-001, GAP-004)
  const [selectedItemKey, setSelectedItemKey] = useState<string | undefined>();

  const handleItemSelectedInternal = useCallback(
    (itemKey: string) => {
      setSelectedItemKey(itemKey);
      onItemSelected?.(itemKey);
    },
    [onItemSelected],
  );

  /** Change status of the selected item via keyboard shortcut (GAP-001) */
  const handleStatusChangeViaKeyboard = useCallback(
    (status: 'approved' | 'unapproved' | 'unknown') => {
      if (!selectedItemKey || !canMakeChanges) return;

      let newApproved = [...approvedItems];
      let newUnapproved = [...unapprovedItems];

      // Remove from both lists first
      newApproved = newApproved.filter((i) => i !== selectedItemKey);
      newUnapproved = newUnapproved.filter((i) => i !== selectedItemKey);

      // Add to appropriate list
      if (status === 'approved') {
        newApproved.push(selectedItemKey);
      } else if (status === 'unapproved') {
        newUnapproved.push(selectedItemKey);
      }
      // For 'unknown', item stays in neither list

      // Push combined change to undo stack
      dispatchUndoRedo({
        type: 'PUSH_CHANGE',
        change: {
          itemKey: selectedItemKey,
          previousApproved: previousApprovedRef.current,
          previousUnapproved: previousUnapprovedRef.current,
          newApproved,
          newUnapproved,
        },
      });

      onApprovedItemsChange(newApproved);
      onUnapprovedItemsChange(newUnapproved);
    },
    [
      selectedItemKey,
      canMakeChanges,
      approvedItems,
      unapprovedItems,
      onApprovedItemsChange,
      onUnapprovedItemsChange,
    ],
  );

  // Menu state
  const [isInventoryMenuOpen, setIsInventoryMenuOpen] = useState(false);

  // CMS Options Dialog state (BHV-314)
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const [optionValues, setOptionValues] = useState<InventoryOptionValue[]>([]);
  const inventoryDataProvider = useDataProvider('platformScripture.inventoryDataProvider');

  // Load option values when dialog opens
  useEffect(() => {
    if (!showOptionsDialog || !inventoryDataProvider || !projectId) return;

    let cancelled = false;
    const loadOptions = async () => {
      try {
        const values = await inventoryDataProvider.getInventoryOptionValues({
          projectId,
          inventoryId: 'MatchedPairs',
        });
        if (!cancelled && values) {
          setOptionValues(values);
        }
      } catch (error) {
        logger.error(`Error loading inventory option values: ${getErrorMessage(error)}`);
      }
    };
    loadOptions();
    return () => {
      cancelled = true;
    };
  }, [showOptionsDialog, inventoryDataProvider, projectId]);

  const handleOptionsSave = useCallback(
    async (changedValues: InventoryOptionValue[]) => {
      if (!inventoryDataProvider || !projectId || changedValues.length === 0) return;
      try {
        await inventoryDataProvider.setInventoryOptionValues(
          {
            projectId,
            inventoryId: 'MatchedPairs',
          },
          changedValues,
        );
      } catch (error) {
        logger.error(`Error saving inventory option values: ${getErrorMessage(error)}`);
      }
    },
    [inventoryDataProvider, projectId],
  );

  const columns = useMemo(() => {
    if (isSeparated) {
      // When separated, show verse text and non-verse text columns (BHV-314)
      return [
        {
          ...inventoryItemColumn(textLabel),
          cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
            <div className="tw-text-lg tw-font-bold tw-font-mono tw-flex tw-justify-center">
              {row.getValue('item')}
            </div>
          ),
        },
        inventoryCountColumn(verseTextLabel),
        inventoryStatusColumn(
          verseTextLabel,
          approvedItems,
          handleApprovedItemsChangeWithUndo,
          unapprovedItems,
          handleUnapprovedItemsChangeWithUndo,
        ),
        inventoryCountColumn(nonVerseTextLabel),
        inventoryStatusColumn(
          nonVerseTextLabel,
          approvedItems,
          handleApprovedItemsChangeWithUndo,
          unapprovedItems,
          handleUnapprovedItemsChangeWithUndo,
        ),
      ];
    }
    return createColumns(
      textLabel,
      countLabel,
      statusLabel,
      approvedItems,
      handleApprovedItemsChangeWithUndo,
      unapprovedItems,
      handleUnapprovedItemsChangeWithUndo,
    );
  }, [
    isSeparated,
    textLabel,
    countLabel,
    statusLabel,
    verseTextLabel,
    nonVerseTextLabel,
    approvedItems,
    handleApprovedItemsChangeWithUndo,
    unapprovedItems,
    handleUnapprovedItemsChangeWithUndo,
  ]);

  const itemCount = useMemo(() => {
    if (!inventoryItems) return 0;
    return inventoryItems.filter((item) => item.count > 0).length;
  }, [inventoryItems]);

  // Keyboard shortcuts (BHV-305, GAP-001, GAP-002)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;

      switch (e.key.toLowerCase()) {
        case 'y':
          e.preventDefault();
          handleStatusChangeViaKeyboard('approved');
          break;
        case 'n':
          e.preventDefault();
          handleStatusChangeViaKeyboard('unapproved');
          break;
        case 'u':
          e.preventDefault();
          handleStatusChangeViaKeyboard('unknown');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleStatusChangeViaKeyboard]);

  return (
    <div data-testid="inventory-form" className="tw-flex tw-flex-col tw-h-full">
      {/* Menu bar */}
      <div className="tw-flex tw-items-center tw-border-b tw-border-border tw-px-2 tw-py-1 tw-gap-2 tw-text-sm">
        <div className="tw-relative">
          <button
            type="button"
            role="menuitem"
            aria-label="Inventory"
            className="tw-px-2 tw-py-1 tw-rounded hover:tw-bg-muted"
            onClick={() => setIsInventoryMenuOpen(!isInventoryMenuOpen)}
          >
            {inventoryMenuLabel}
          </button>
          {isInventoryMenuOpen && (
            <div className="tw-absolute tw-left-0 tw-top-full tw-z-50 tw-bg-background tw-border tw-border-border tw-rounded tw-shadow-lg tw-min-w-[250px]">
              <button
                type="button"
                role="menuitem"
                className={`tw-w-full tw-text-left tw-px-3 tw-py-2 hover:tw-bg-muted tw-text-sm${!isAdministrator ? ' tw-opacity-50 tw-cursor-not-allowed' : ''}`}
                disabled={!isAdministrator}
                onClick={() => {
                  handleToggleSeparation();
                  setIsInventoryMenuOpen(false);
                }}
              >
                {setSeparateStatusLabel}
              </button>
              <button
                type="button"
                role="menuitem"
                className="tw-w-full tw-text-left tw-px-3 tw-py-2 hover:tw-bg-muted tw-text-sm"
                onClick={() => {
                  setShowOptionsDialog(true);
                  setIsInventoryMenuOpen(false);
                }}
              >
                {editOptionsLabel}
              </button>
              <button
                type="button"
                role="menuitem"
                className="tw-w-full tw-text-left tw-px-3 tw-py-2 hover:tw-bg-muted tw-text-sm"
                onClick={() => {
                  setIsInventoryMenuOpen(false);
                }}
              >
                {refreshLabel}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toolbar with undo/redo and filter controls */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1 tw-border-b tw-border-border">
        <button
          type="button"
          aria-label="Undo"
          className="tw-px-2 tw-py-1 tw-rounded hover:tw-bg-muted disabled:tw-opacity-50"
          disabled={undoRedoState.undoStack.length === 0}
          onClick={handleUndo}
        >
          {undoLabel}
        </button>
        <button
          type="button"
          aria-label="Redo"
          className="tw-px-2 tw-py-1 tw-rounded hover:tw-bg-muted disabled:tw-opacity-50"
          disabled={undoRedoState.redoStack.length === 0}
          onClick={handleRedo}
        >
          {redoLabel}
        </button>
      </div>

      {/* Inventory list with search, filter, and scope */}
      <div
        data-testid="inventory-list"
        className="tw-flex-1 tw-overflow-hidden tw-flex tw-flex-col"
      >
        <Inventory
          inventoryItems={inventoryItems}
          setVerseRef={setVerseRef}
          localizedStrings={localizedStrings}
          approvedItems={approvedItems}
          unapprovedItems={unapprovedItems}
          scope={scope}
          onScopeChange={onScopeChange}
          columns={columns}
          areInventoryItemsLoading={areInventoryItemsLoading}
          classNameForVerseText="scripture-font"
          onItemSelected={handleItemSelectedInternal}
        />
      </div>

      {/* Status bar with item count */}
      <div
        data-testid="item-count-label"
        className="tw-px-2 tw-py-1 tw-text-sm tw-text-muted-foreground tw-border-t tw-border-border"
      >
        {itemCount} {itemCount === 1 ? itemLabel : itemsLabel}
      </div>

      {/* CMS Options Dialog (BHV-314) */}
      <CMSOptionsDialog
        isOpen={showOptionsDialog}
        onClose={() => setShowOptionsDialog(false)}
        optionValues={optionValues}
        onSave={handleOptionsSave}
      />
    </div>
  );
}

export default MatchedPairsInventory;
