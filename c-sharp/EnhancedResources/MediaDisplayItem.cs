using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Display item for the Images or Maps tab.
/// Source: EXT-060, EXT-067, BHV-359
/// <para>
/// <see cref="Path"/> and <see cref="FileName"/> mirror the corresponding XML
/// elements on the IMG_INDX <c>BibleImage</c> record (PT9 MarbleImageData.cs:204-208).
/// They are needed by <see cref="MediaService.FetchImageBytes"/> to compute the
/// internal zip path inside an image-binary package (IMG_THMB / IMG_LD / IMG_SD /
/// IMG_HD); PT9 concatenates them as <c>Path.Combine(Path, FileName)</c>
/// (MarbleDataAccess.cs:281, 302).
/// </para>
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
    int DisplayIndex,
    string Path = "",
    string FileName = ""
);
