import { Separator } from '@/components/shadcn-ui/separator';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type {
  EncyclopediaTeaser,
  ErEncyclopediaListProps,
} from './source-language-indexed-list.types';

/**
 * ER Encyclopedia list component. Wraps SourceLanguageIndexedList with encyclopedia-specific
 * rendering showing article titles with teaser/summary text and source language terms.
 *
 * @example
 *
 * ```tsx
 * <ErEncyclopediaList
 *   items={encyclopediaItems}
 *   onItemClick={handleSelect}
 *   showSourceLanguage
 * />;
 * ```
 */
export default function ErEncyclopediaList<T extends EncyclopediaTeaser>({
  showSourceLanguage = true,
  showTransliteration = true,
  ...listProps
}: ErEncyclopediaListProps<T>) {
  return (
    <SourceLanguageIndexedList
      {...listProps}
      showSourceLanguage={showSourceLanguage}
      showTransliteration={showTransliteration}
      renderItem={(item) => (
        <div className="tw:flex tw:w-full tw:flex-col tw:gap-0.5">
          <div className="tw:flex tw:items-baseline tw:gap-2">
            <span className="tw:text-sm tw:font-medium">{item.primaryText}</span>
            {showSourceLanguage && item.sourceLanguageText && (
              <span className="tw:text-sm tw:text-muted-foreground">
                {item.sourceLanguageText}
                {showTransliteration && item.transliteration && (
                  <span className="tw:ml-1">({item.transliteration})</span>
                )}
              </span>
            )}
          </div>
          {item.teaserText && (
            <p className="tw:line-clamp-2 tw:text-xs tw:text-muted-foreground">{item.teaserText}</p>
          )}
          <Separator className="tw:mt-1" />
        </div>
      )}
    />
  );
}
