import { cn } from '@/utils/shadcn-ui/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Separator } from '@/components/shadcn-ui/separator';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type { ErDictionaryListProps, IndexedListItem } from './source-language-indexed-list.types';

/**
 * ER Dictionary list component. Wraps SourceLanguageIndexedList with dictionary-specific rendering
 * showing both columns (resource term + source language term), occurrence count badges, gloss
 * descriptions, and Strong's code badges.
 *
 * @example
 *
 * ```tsx
 * <ErDictionaryList
 *   items={dictionaryItems}
 *   onItemClick={handleSelect}
 *   showSourceLanguage
 *   showTransliteration
 *   getDescription={(item) => item.glosses}
 *   getBadges={(item) => item.strongsCodes}
 *   getOccurrenceCount={(item) => item.count}
 * />;
 * ```
 */
export default function ErDictionaryList<T extends IndexedListItem>({
  getDescription,
  getBadges,
  getOccurrenceCount,
  showSourceLanguage = true,
  showTransliteration = true,
  ...listProps
}: ErDictionaryListProps<T>) {
  return (
    <SourceLanguageIndexedList
      {...listProps}
      showSourceLanguage={showSourceLanguage}
      showTransliteration={showTransliteration}
      renderItem={(item) => (
        <ErDictionaryListItemContent
          item={item}
          showSourceLanguage={showSourceLanguage}
          showTransliteration={showTransliteration}
          description={getDescription?.(item)}
          badges={getBadges?.(item)}
          occurrenceCount={getOccurrenceCount?.(item)}
        />
      )}
    />
  );
}

function ErDictionaryListItemContent<T extends IndexedListItem>({
  item,
  showSourceLanguage,
  showTransliteration,
  description,
  badges,
  occurrenceCount,
}: {
  item: T;
  showSourceLanguage: boolean;
  showTransliteration: boolean;
  description?: string;
  badges?: string[];
  occurrenceCount?: number;
}) {
  return (
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
        {occurrenceCount !== undefined && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="tw:ml-1 tw:cursor-help tw:rounded tw:bg-accent tw:px-1.5 tw:py-0.5 tw:text-xs">
                  {occurrenceCount}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Occurrences</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="tw:flex tw:items-center tw:gap-2 tw:overflow-hidden">
        {description && (
          <p className="tw:truncate tw:text-sm tw:text-muted-foreground">{description}</p>
        )}
        {badges?.map((badge) => (
          <span
            key={badge}
            className={cn('tw:shrink-0 tw:rounded tw:bg-accent tw:px-1.5 tw:py-0.5 tw:text-xs')}
          >
            {badge}
          </span>
        ))}
      </div>
      <Separator className="tw:mt-1" />
    </div>
  );
}
