import { LanguageStrings, LocalizeKey, ScriptureReference, substring } from 'platform-bible-utils';
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
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import papi from '@papi/frontend';
import { extractMarkers } from './inventory-utils';

const MARKER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_marker%',
  '%webView_inventory_table_header_style_name%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
];

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function getDescription(markersInfo: string[], marker: string): string | undefined {
  const markerWithoutBackslash = substring(marker, 1);
  // Escape all characters that need escaping to be handled as plain text
  const escapedMarker = markerWithoutBackslash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Search for whole words surrounded by whitespace or periods or at string boundaries (^ and $)
  const regex = new RegExp(`(^|[\\s.])${escapedMarker}([\\s.]|$)`);
  return markersInfo.find((markerNames) => regex.test(markerNames));
}

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
  markerNames: string[],
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
      const marker: string = row.getValue('item');
      return getDescription(markerNames, marker) || 'Unknown marker';
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
  const [scrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [markerNames, setMarkerNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchStylesheet = async () => {
      if (!projectId) return;
      const PDP = await papi.projectDataProviders.get('platformScripture.MarkerNames', projectId);
      const newMarkerNames = await PDP.getMarkerNames(scrRef.bookNum);
      if (newMarkerNames) setMarkerNames(newMarkerNames);
    };

    fetchStylesheet();
  }, [projectId, scrRef.bookNum]);

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

  const getColumns = useCallback(
    (onStatusChange: (changedItems: string[], status: Status) => void) =>
      createColumns(
        itemLabel,
        styleNameLabel,
        markerNames,
        countLabel,
        statusLabel,
        onStatusChange,
      ),
    [itemLabel, styleNameLabel, markerNames, countLabel, statusLabel],
  );

  useEffect(() => {
    console.log(markerNames);
  }, [markerNames]);

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
