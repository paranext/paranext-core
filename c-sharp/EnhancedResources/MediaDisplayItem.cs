using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Display item for the Images or Maps tab.
/// Source: EXT-060, EXT-067, BHV-359
/// </summary>
public record MediaDisplayItem(
    string ImageId,
    string ImageSource,
    string Title,
    string ThumbnailSource,
    VerseRef StartRef,
    VerseRef EndRef,
    string Collection,
    string LanguageCode,
    int DisplayIndex
);
