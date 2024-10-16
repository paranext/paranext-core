import { LanguageStrings, LocalizeKey, ScriptureReference, substring } from 'platform-bible-utils';
import {
  Button,
  ColumnDef,
  Inventory,
  InventoryItem,
  InventoryTableData,
  Scope,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { useEffect, useMemo, useState } from 'react';
import papi from '@papi/frontend';

const MARKER_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_marker%',
  '%webView_inventory_table_header_preceding_marker%',
  '%webView_inventory_table_header_style_name%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_show_preceding_marker%',
];

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

const extractMarkers = (text: string): InventoryItem[] => {
  // Finds markers (a backslash character followed by any number of letters, digits and possibly a '*')
  const markers = text.match(/\\[a-zA-Z0-9]+\*?/g) || [];

  const inventoryItems: InventoryItem[] = [];
  markers.forEach((marker, index) => {
    const precedingMarker = index > 0 ? markers[index - 1] : '';
    inventoryItems.push({
      item: marker,
      relatedItem: precedingMarker,
    });
  });

  return inventoryItems;
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
 * @param markerNames
 * @param countLabel Localized label for the count column
 * @param statusLabel
 * @param approvedItems
 * @param onApprovedItemsChange
 * @param unapprovedItems
 * @param onUnapprovedItemsChange
 * @returns An array of columns that can be passed into the inventory component
 */
const createColumns = (
  itemLabel: string,
  styleNameLabel: string,
  markerNames: string[],
  countLabel: string,
  statusLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
): ColumnDef<InventoryTableData>[] => [
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
  inventoryStatusColumn(
    statusLabel,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
  ),
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
  const precedingMarkerLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_table_header_preceding_marker%'],
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
  const showPrecedingMarkerLabel = useMemo(
    () => markerInventoryStrings['%webView_inventory_show_preceding_marker%'],
    [markerInventoryStrings],
  );

  const columns = useMemo(
    () =>
      createColumns(
        itemLabel,
        styleNameLabel,
        markerNames,
        countLabel,
        statusLabel,
        approvedItems,
        onApprovedItemsChange,
        unapprovedItems,
        onUnapprovedItemsChange,
      ),
    [
      itemLabel,
      styleNameLabel,
      markerNames,
      countLabel,
      statusLabel,
      approvedItems,
      onApprovedItemsChange,
      unapprovedItems,
      onUnapprovedItemsChange,
    ],
  );

  return (
    <Inventory
      scriptureReference={scriptureReference}
      setScriptureReference={setScriptureReference}
      localizedStrings={localizedStrings}
      extractItems={extractMarkers}
      approvedItems={approvedItems}
      unapprovedItems={unapprovedItems}
      text={text}
      scope={scope}
      onScopeChange={onScopeChange}
      columns={columns}
      showRelatedItemsTableHeader={precedingMarkerLabel}
      showRelatedItemsButtonText={showPrecedingMarkerLabel}
    />
  );
}

export default MarkerInventory;
