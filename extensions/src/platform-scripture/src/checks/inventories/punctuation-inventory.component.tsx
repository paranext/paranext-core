// import { LanguageStrings, LocalizeKey, ScriptureReference, substring } from 'platform-bible-utils';
import { LanguageStrings, LocalizeKey, ScriptureReference } from 'platform-bible-utils';
import {
  Button,
  ColumnDef,
  Inventory,
  // InventoryItemOccurrence,
  InventoryTableData,
  Scope,
  // getBookNumFromId,
  // getLinesFromUSFM,
  // getNumberFromUSFM,
  // getStatusForItem,
  inventoryCountColumn,
  inventoryItemColumn,
  inventoryStatusColumn,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useMemo, useState } from 'react';

const PUNCTUATION_INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_context%',
  '%webView_inventory_table_header_punctuation%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_table_header_unicode_value%',
  '%webView_inventory_table_punctuation_context_isolated%',
  '%webView_inventory_table_punctuation_context_wordInitial%',
  '%webView_inventory_table_punctuation_context_wordFinal%',
  '%webView_inventory_table_punctuation_context_wordMedial%',
  '%webView_inventory_table_punctuation_showSequences%',
  '%webView_inventory_table_punctuation_showSinglePunctuationCharacter%',
];

const punctuationRegex: RegExp = /[\p{P}]/gu;

// Logic like this is probably not needed anymore after
// https://github.com/paranext/paranext-core/issues/1384
// is fixed. I'll leave it in here for now, just in case

// const extractPunctuation = (
//   showSequences: boolean,
// ): ((
//   text: string | undefined,
//   scriptureRef: ScriptureReference,
//   approvedItems: string[],
//   unapprovedItems: string[],
// ) => InventoryTableData[]) => {
//   return (
//     text: string | undefined,
//     scriptureRef: ScriptureReference,
//     approvedItems: string[],
//     unapprovedItems: string[],
//   ) => {
//     if (!text) return [];

//     const tableData: InventoryTableData[] = [];

//     let currentBook: number | undefined = scriptureRef.bookNum;
//     let currentChapter: number | undefined = scriptureRef.chapterNum;
//     let currentVerse: number | undefined = scriptureRef.verseNum;

//     // Matches all punctuation characters
//     const punctuationRegex: RegExp = showSequences ? /[\p{P}]+/gu : /[\p{P}]/gu;

//     const lines = getLinesFromUSFM(text);

//     lines.forEach((line: string) => {
//       if (line.startsWith('\\id')) {
//         currentBook = getBookNumFromId(line);
//         currentChapter = 0;
//         currentVerse = 0;
//       }
//       if (line.startsWith('\\c')) {
//         currentChapter = getNumberFromUSFM(line);
//         currentVerse = 0;
//       }
//       if (line.startsWith('\\v')) {
//         currentVerse = getNumberFromUSFM(line);
//         if (currentChapter === 0) {
//           currentChapter = scriptureRef.chapterNum;
//         }
//       }

//       let match: RegExpExecArray | undefined = punctuationRegex.exec(line) ?? undefined;
//       while (match) {
//         // For this code to work correctly we need our regular expression to match a single
//         // punctuation character per match
//         if (match.length > 1)
//           throw new Error('Multiple punctuation characters found in a single match');

//         const punctuation = match[0];
//         const { index } = match;

//         let prefix = '';
//         let suffix = '';

//         // Check if preceding character is whitespace or not
//         if (index === 0) {
//           prefix = '_';
//         } else {
//           for (let i = index - 1; i >= 0; i--) {
//             const precedingChar = line[i];
//             if (/\s/.test(precedingChar)) {
//               prefix = '_';
//               break;
//             } else if (!/[\p{P}]/u.test(precedingChar)) {
//               break;
//             }
//           }
//         }

//         // Check if following character is whitespace or not
//         if (index === line.length - punctuation.length) {
//           suffix = '_';
//         } else {
//           for (let i = index + punctuation.length; i < line.length; i++) {
//             const followingChar = line[i];
//             if (/\s/.test(followingChar)) {
//               suffix = '_';
//               break;
//             } else if (!/[\p{P}]/u.test(followingChar)) {
//               break;
//             }
//           }
//         }

//         const item = `${prefix}${punctuation}${suffix}`;

//         const itemIndex = match.index;
//         const existingItem = tableData.find((tableEntry) => tableEntry.items[0] === item);
//         const newReference: InventoryItemOccurrence = {
//           reference: {
//             bookNum: currentBook !== undefined ? currentBook : -1,
//             chapterNum: currentChapter !== undefined ? currentChapter : -1,
//             verseNum: currentVerse !== undefined ? currentVerse : -1,
//           },
//           text: substring(line, Math.max(0, itemIndex - 25), Math.min(itemIndex + 25, line.length)),
//         };
//         if (existingItem) {
//           existingItem.count += 1;
//           existingItem.occurrences.push(newReference);
//         } else {
//           const newItem: InventoryTableData = {
//             items: [item],
//             count: 1,
//             status: getStatusForItem(item, approvedItems, unapprovedItems),
//             occurrences: [newReference],
//           };
//           tableData.push(newItem);
//         }

//         match = punctuationRegex.exec(line) ?? undefined;
//       }
//     });

//     return tableData;
//   };
// };

// function getPunctuationContext(
//   item: string,
//   isolatedLabel: string,
//   wordInitialLabel: string,
//   wordFinalLabel: string,
//   wordMedialLabel: string,
// ): string {
//   if (item.startsWith('_')) {
//     if (item.endsWith('_')) {
//       return isolatedLabel;
//     }

//     return wordInitialLabel;
//   }

//   if (item.endsWith('_')) {
//     return wordFinalLabel;
//   }

//   return wordMedialLabel;
// }

/**
 * Function that constructs the column for the inventory component
 *
 * @param itemLabel Localized label for the item column (e.g. 'Character', 'Repeated Word', etc.)
 * @param unicodeValueLabel Localized label for the Unicode Value column
 * @param countLabel Localized label for the count column
 * @param statusLabel Localized label for the status column
 * @param isolatedLabel Localized label for the context when punctuation appears in isolation
 * @param wordInitialLabel Localized label for the context when punctuation appears word initial
 * @param wordFinalLabel Localized label for the context when punctuation appears word final
 * @param wordMedialLabel Localized label for the context when punctuation appears word medial
 * @param approvedItems Array of approved items, typically as defined in `Settings.xml`
 * @param onApprovedItemsChange Callback function that stores the updated list of approved items
 * @param unapprovedItems Array of unapproved items, typically as defined in `Settings.xml`
 * @param onUnapprovedItemsChange Callback function that stores the updated list of unapproved items
 * @param showSequences True if inventory shows sequences of punctuation. False if it only considers
 *   single punctuation characters
 * @returns An array of columns that can be passed into the inventory component
 */
const createColumns = (
  itemLabel: string,
  unicodeValueLabel: string,
  // contextLabel: string,
  countLabel: string,
  statusLabel: string,
  // isolatedLabel: string,
  // wordInitialLabel: string,
  // wordFinalLabel: string,
  // wordMedialLabel: string,
  approvedItems: string[],
  onApprovedItemsChange: (items: string[]) => void,
  unapprovedItems: string[],
  onUnapprovedItemsChange: (items: string[]) => void,
  // showSequences: boolean,
): ColumnDef<InventoryTableData>[] => {
  // const contextColumn: ColumnDef<InventoryTableData> = {
  //   accessorKey: 'context',
  //   header: () => <Button variant="ghost">{contextLabel}</Button>,
  //   cell: ({ row }) => {
  //     const item: string = row.getValue('item');
  //     return getPunctuationContext(
  //       item,
  //       isolatedLabel,
  //       wordInitialLabel,
  //       wordFinalLabel,
  //       wordMedialLabel,
  //     );
  //   },
  // };

  return [
    inventoryItemColumn(itemLabel),
    {
      accessorKey: 'unicodeValue',
      header: () => <Button variant="ghost">{unicodeValueLabel}</Button>,
      cell: ({ row }) => {
        const item: string = row.getValue('item');
        return item.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
      },
    },
    inventoryCountColumn(countLabel),
    // ...(showSequences ? [] : [contextColumn]),
    inventoryStatusColumn(
      statusLabel,
      approvedItems,
      onApprovedItemsChange,
      unapprovedItems,
      onUnapprovedItemsChange,
    ),
  ];
};

type PunctuationInventoryProps = {
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
};

function PunctuationInventory({
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
}: PunctuationInventoryProps) {
  const [punctuationInventoryStrings] = useLocalizedStrings(PUNCTUATION_INVENTORY_STRING_KEYS);
  const itemLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_punctuation%'],
    [punctuationInventoryStrings],
  );
  const unicodeValueLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_unicode_value%'],
    [punctuationInventoryStrings],
  );
  // const contextLabel = useMemo(
  //   () => punctuationInventoryStrings['%webView_inventory_table_header_context%'],
  //   [punctuationInventoryStrings],
  // );
  const countLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_count%'],
    [punctuationInventoryStrings],
  );
  const statusLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_header_status%'],
    [punctuationInventoryStrings],
  );
  // const isolatedLabel = useMemo(
  //   () => punctuationInventoryStrings['%webView_inventory_table_punctuation_context_isolated%'],
  //   [punctuationInventoryStrings],
  // );
  // const wordInitialLabel = useMemo(
  //   () => punctuationInventoryStrings['%webView_inventory_table_punctuation_context_wordInitial%'],
  //   [punctuationInventoryStrings],
  // );
  // const wordFinalLabel = useMemo(
  //   () => punctuationInventoryStrings['%webView_inventory_table_punctuation_context_wordFinal%'],
  //   [punctuationInventoryStrings],
  // );
  // const wordMedialLabel = useMemo(
  //   () => punctuationInventoryStrings['%webView_inventory_table_punctuation_context_wordMedial%'],
  //   [punctuationInventoryStrings],
  // );
  const showSequencesLabel = useMemo(
    () => punctuationInventoryStrings['%webView_inventory_table_punctuation_showSequences%'],
    [punctuationInventoryStrings],
  );
  const showSinglePunctuationCharacterLabel = useMemo(
    () =>
      punctuationInventoryStrings[
        '%webView_inventory_table_punctuation_showSinglePunctuationCharacter%'
      ],
    [punctuationInventoryStrings],
  );

  const [showSequences, setShowSequences] = useState<boolean>(false);

  const columns = useMemo(
    () =>
      createColumns(
        itemLabel,
        unicodeValueLabel,
        // contextLabel,
        countLabel,
        statusLabel,
        // isolatedLabel,
        // wordInitialLabel,
        // wordFinalLabel,
        // wordMedialLabel,
        approvedItems,
        onApprovedItemsChange,
        unapprovedItems,
        onUnapprovedItemsChange,
        // showSequences,
      ),
    [
      itemLabel,
      unicodeValueLabel,
      // contextLabel,
      countLabel,
      statusLabel,
      // isolatedLabel,
      // wordInitialLabel,
      // wordFinalLabel,
      // wordMedialLabel,
      approvedItems,
      onApprovedItemsChange,
      unapprovedItems,
      onUnapprovedItemsChange,
      // showSequences,
    ],
  );

  return (
    <div className="tw-flex tw-flex-col">
      <Button
        className="tw-m-1"
        variant="outline"
        onClick={() => {
          setShowSequences((currentValue) => !currentValue);
        }}
      >
        {showSequences ? showSinglePunctuationCharacterLabel : showSequencesLabel}
      </Button>
      <Inventory
        scriptureReference={scriptureReference}
        setScriptureReference={setScriptureReference}
        localizedStrings={localizedStrings}
        // extractItems={extractPunctuation(showSequences)}
        extractItems={punctuationRegex}
        approvedItems={approvedItems}
        unapprovedItems={unapprovedItems}
        text={text}
        scope={scope}
        onScopeChange={onScopeChange}
        columns={columns}
      />
    </div>
  );
}

export default PunctuationInventory;
