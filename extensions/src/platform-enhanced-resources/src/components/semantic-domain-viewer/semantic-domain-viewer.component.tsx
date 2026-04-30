import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  ErDictionaryFilteredList,
  type IndexedListItem,
  type SemanticDomain,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  DictionaryDisplayItem,
  DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
  type DictionaryDisplayItemData,
} from '../dictionary-tab/dictionary-display-item.component';
import {
  DictionaryEntryDetail,
  DICTIONARY_ENTRY_DETAIL_STRING_KEYS,
} from '../dictionary-tab/dictionary-entry-detail.component';

/** Object containing all keys used for localization in this component. */
export const SEMANTIC_DOMAIN_VIEWER_STRING_KEYS = Object.freeze([
  '%enhancedResources_semanticDomain_title%',
  '%enhancedResources_semanticDomain_description%',
  ...DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
  ...DICTIONARY_ENTRY_DETAIL_STRING_KEYS,
] as const);

type SemanticDomainViewerLocalizedStringKey = (typeof SEMANTIC_DOMAIN_VIEWER_STRING_KEYS)[number];
type SemanticDomainViewerLocalizedStrings = {
  [key in SemanticDomainViewerLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Row item rendered inside `ErDictionaryFilteredList`: combines the IndexedListItem shape with the
 * DictionaryDisplayItemData payload so the row body and detail panel can both consume it.
 */
export type SemanticDomainFilteredItem = IndexedListItem & DictionaryDisplayItemData;

export type SemanticDomainViewerProps = {
  /** Whether the dialog is open (controlled by parent). */
  open: boolean;
  /**
   * Resolved breadcrumb path from root to the focused domain. When undefined the viewer defaults to
   * the first top-level domain (the "cold entry" / "Browse semantic domains" experience).
   */
  domainPath?: SemanticDomain[];
  /** Full domain hierarchy (root nodes). Forwarded to `ErDictionaryFilteredList`. */
  allDomains: SemanticDomain[];
  /** Dictionary entries belonging to the focused domain. */
  filteredEntries: SemanticDomainFilteredItem[];
  /** Loading flag for the filtered entries list. */
  isLoading?: boolean;

  /** Open-state change handler - mirrors shadcn Dialog's onOpenChange. */
  onOpenChange: (open: boolean) => void;
  /** Domain change handler - parent should update its path state. */
  onDomainChange: (newPath: SemanticDomain[]) => void;

  /** Click on a filtered entry row's source-text button (parent typically opens MarbleForm). */
  onEntryClick?: (entry: DictionaryDisplayItemData) => void;
  /** Click on the entry-level "Occurrences in all books" link inside the detail panel. */
  onAllOccurrencesClick?: (tokenId: string) => void;
  /** Click on a sense's "Occurrences in all books" link inside the detail panel. */
  onSenseOccurrencesClick?: (senseId: string) => void;

  localizedStringsWithLoadingState?: [SemanticDomainViewerLocalizedStrings, boolean];
};

/**
 * Pure presentational SemanticDomainViewer rendered as a centered shadcn Dialog wrapping
 * `ErDictionaryFilteredList`. The breadcrumb-popover navigation (UI-PKG-007) is provided internally
 * by `ErDictionaryFilteredList`, so this component is intentionally thin: it forwards the
 * controlled domain path + items + callbacks and supplies the `renderItem` / `renderDetailContent`
 * slots through `DictionaryDisplayItem` and `DictionaryEntryDetail`.
 *
 * Replaces the previous right-side Drawer surface (UI-PKG-007). The persistent tree pane,
 * breadcrumb, and Back/Close chrome are dropped - tree access lives in the breadcrumb popover and
 * the Dialog's built-in close handles dismissal.
 */
export function SemanticDomainViewer({
  open,
  domainPath,
  allDomains,
  filteredEntries,
  isLoading = false,
  onOpenChange,
  onDomainChange,
  onEntryClick = () => {},
  onAllOccurrencesClick = () => {},
  onSenseOccurrencesClick = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: SemanticDomainViewerProps) {
  const getLocalizedString = (key: SemanticDomainViewerLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleLabel = String(getLocalizedString('%enhancedResources_semanticDomain_title%'));
  const descriptionLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_description%'),
  );

  // Default to the first root domain when the parent did not supply a path. The "Browse semantic
  // domains" cold entry uses this so the dialog opens at a sensible breadcrumb root rather than
  // crashing inside `ErDictionaryFilteredList` (which requires a non-empty path to render the
  // first segment dropdown).
  const computeEffectivePath = (): SemanticDomain[] => {
    if (domainPath && domainPath.length > 0) return domainPath;
    if (allDomains[0]) return [allDomains[0]];
    return [];
  };
  const effectivePath = computeEffectivePath();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="semantic-domain-viewer"
        className="tw-flex tw-h-[80vh] tw-max-h-[600px] tw-w-[90vw] tw-max-w-3xl tw-flex-col tw-overflow-hidden tw-p-0"
      >
        <DialogTitle className="tw-sr-only">{titleLabel}</DialogTitle>
        <DialogDescription className="tw-sr-only">{descriptionLabel}</DialogDescription>
        <ErDictionaryFilteredList
          items={filteredEntries}
          domainPath={effectivePath}
          allDomains={allDomains}
          onDomainChange={onDomainChange}
          isLoading={isLoading}
          renderItem={(item) => (
            <DictionaryDisplayItem
              item={item}
              onSourceTextClick={(tokenId) => {
                const entry = filteredEntries.find((e) => e.tokenId === tokenId);
                if (entry) onEntryClick(entry);
              }}
              localizedStringsWithLoadingState={localizedStringsWithLoadingState}
            />
          )}
          renderDetailContent={(item, onClose) => (
            <DictionaryEntryDetail
              tokenId={item.tokenId}
              sourceText={item.sourceText}
              transliteration={item.translit}
              senses={item.senses}
              onAllOccurrencesClick={onAllOccurrencesClick}
              onSenseOccurrencesClick={onSenseOccurrencesClick}
              onClose={onClose}
              localizedStringsWithLoadingState={localizedStringsWithLoadingState}
            />
          )}
          className="tw-h-full"
        />
      </DialogContent>
    </Dialog>
  );
}

export default SemanticDomainViewer;
