import { LanguageStrings, LocalizeKey, ScriptureReference } from 'platform-bible-utils';
import {
  Button,
  ColumnDef,
  Inventory,
  ItemData,
  Scope,
  Status,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import papi from '@papi/frontend';
import { ScrStylesheet } from 'platform-scripture';
import { extractMarkers } from './inventory-utils';

const MARKER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_marker%',
  '%webView_inventory_table_header_style_name%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

/**
 * Function that constructs the column for the inventory component
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @param styleNameLabel Localized label for the style name column
 * @param countLabel Localized label for the count column
 * @returns An array of columns that can be passed into the inventory component
 */
const createColumns = (
  itemLabel: string,
  styleNameLabel: string,
  stylesheet: ScrStylesheet,
  countLabel: string,
  statusLabel: string,
  statusChangeHandler: (items: string[], status: Status) => void,
): ColumnDef<ItemData>[] => [
  inventoryItemColumn(itemLabel),
  inventoryCountColumn(countLabel),
  {
    accessorKey: 'styleName',
    header: () => <Button variant="ghost">{styleNameLabel}</Button>,
    cell: ({ row }) => {
      const item: string = row.getValue('item');
      return `Hier moet je die description voor ${item} nog komen`;
    },
  },
  inventoryStatusColumn(statusLabel, statusChangeHandler),
];

type MarkerInventoryProps = {
  scriptureReference: ScriptureReference;
  setScriptureReference: (scriptureReference: ScriptureReference) => void;
  localizedStrings: LanguageStrings;
  approvedItems: string[];
  onApprovedItemsChange: (items: string[]) => void;
  unapprovedItems: string[];
  onUnapprovedItemsChange: (items: string[]) => void;
  text: string | undefined;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
  projectId?: string;
};

function MarkerInventory({
  scriptureReference,
  setScriptureReference,
  localizedStrings,
  approvedItems,
  onApprovedItemsChange,
  unapprovedItems,
  onUnapprovedItemsChange,
  text,
  scope,
  onScopeChange,
  projectId,
}: MarkerInventoryProps) {
  const [markerInventoryStrings] = useLocalizedStrings(MARKER_INVENTORY_STRING_KEYS);
  const itemLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_marker%'],
    [markerInventoryStrings],
  );
  const styleNameLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_style_name%'],
    [markerInventoryStrings],
  );
  const countLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_count%'],
    [markerInventoryStrings],
  );
  const statusLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_status%'],
    [markerInventoryStrings],
  );

  const [stylesheet, setStylesheet] = useState<ScrStylesheet>();

  useEffect(() => {
    const fetchStylesheet = async () => {
      if (!projectId) return;
      const PDP = await papi.projectDataProviders.get('platformScripture.ScrStylesheet', projectId);
      const scrStylesheet = await PDP.getScrStylesheet(1);
      setStylesheet(scrStylesheet);
    };

    fetchStylesheet();
  }, [projectId]);

  //   function getFirstCharactersUntilWhitespace(str: string) {
  //     const match = str.match(/^\S+/);
  //     return match ? match[0] : ''; // Return the matched string or an empty string if no match found
  // }

  // useEffect(() => {
  //   console.log(stylesheet);
  // }, [stylesheet]);

  const getColumns = useCallback(
    (onStatusChange: (changedItems: string[], status: Status) => void) =>
      createColumns(itemLabel, styleNameLabel, stylesheet, countLabel, statusLabel, onStatusChange),
    [itemLabel, styleNameLabel, stylesheet, countLabel, statusLabel],
  );

  return (
    <Inventory
      scriptureReference={scriptureReference}
      setScriptureReference={setScriptureReference}
      localizedStrings={localizedStrings}
      extractItems={extractMarkers}
      approvedItems={approvedItems}
      onApprovedItemsChange={onApprovedItemsChange}
      unapprovedItems={unapprovedItems}
      onUnapprovedItemsChange={onUnapprovedItemsChange}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      getColumns={getColumns}
    />
  );
}

export default MarkerInventory;
