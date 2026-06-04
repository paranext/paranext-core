import { Badge } from '@/components/shadcn-ui/badge';
import { Separator } from '@/components/shadcn-ui/separator';
import SourceLanguageIndexedList from './source-language-indexed-list.component';
import type { ErMediaListProps, MediaItem } from './source-language-indexed-list.types';

/**
 * ER Media list component (images and maps). Wraps SourceLanguageIndexedList with the thumbnail
 * variant, showing image previews alongside item titles, captions, and media type badges.
 *
 * @example
 *
 * ```tsx
 * <ErMediaList items={mediaItems} onItemClick={handleSelect} showSourceLanguage />;
 * ```
 */
export default function ErMediaList<T extends MediaItem>({
  showSourceLanguage = true,
  showTransliteration = false,
  ...listProps
}: ErMediaListProps<T>) {
  return (
    <SourceLanguageIndexedList
      {...listProps}
      variant="thumbnail"
      showSourceLanguage={showSourceLanguage}
      showTransliteration={showTransliteration}
      renderItem={(item) => (
        <div className="tw:flex tw:w-full tw:items-center tw:gap-3">
          {item.thumbnailUrl && (
            <img
              src={item.thumbnailUrl}
              alt={item.thumbnailAlt ?? item.primaryText}
              className="tw:h-14 tw:w-14 tw:shrink-0 tw:rounded tw:object-cover"
            />
          )}
          {!item.thumbnailUrl && (
            <div className="tw:flex tw:h-14 tw:w-14 tw:shrink-0 tw:items-center tw:justify-center tw:rounded tw:bg-muted">
              <span className="tw:text-xs tw:text-muted-foreground">
                {item.mediaType === 'map' ? 'Map' : 'Img'}
              </span>
            </div>
          )}
          <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-0.5 tw:overflow-hidden">
            <div className="tw:flex tw:items-baseline tw:gap-2">
              <span className="tw:truncate tw:text-sm tw:font-medium">{item.primaryText}</span>
              <Badge variant="outline" className="tw:shrink-0 tw:text-xs">
                {item.mediaType}
              </Badge>
            </div>
            {showSourceLanguage && item.sourceLanguageText && (
              <span className="tw:truncate tw:text-xs tw:text-muted-foreground">
                {item.sourceLanguageText}
                {showTransliteration && item.transliteration && (
                  <span className="tw:ml-1">({item.transliteration})</span>
                )}
              </span>
            )}
            {item.caption && (
              <p className="tw:truncate tw:text-xs tw:text-muted-foreground">{item.caption}</p>
            )}
          </div>
          <Separator className="tw:absolute tw:bottom-0 tw:left-0 tw:right-0" />
        </div>
      )}
    />
  );
}
