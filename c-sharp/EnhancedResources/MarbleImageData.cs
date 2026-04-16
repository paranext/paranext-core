// === STUB FOR TDD RED PHASE ===
// Source: EXT-009, BHV-612
// Target: c-sharp/EnhancedResources/Models/MarbleImageData.cs
// Will be replaced during GREEN phase implementation.

using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Image metadata with 3-level reference range matching (book, chapter, verse).
/// Groups images by StartRef, EndRef, and ImageData.
/// Best language code defaults to English if user language unavailable.
///
/// <para>Source: EXT-009, BHV-612</para>
/// </summary>
internal class MarbleImageData
{
    public string ImageId { get; }
    public VerseRef StartRef { get; }
    public VerseRef EndRef { get; }
    private readonly string[] _availableLanguages;

    public MarbleImageData(string imageId, VerseRef startRef, VerseRef endRef)
        : this(imageId, startRef, endRef, ["en"]) { }

    public MarbleImageData(
        string imageId,
        VerseRef startRef,
        VerseRef endRef,
        string[] availableLanguages
    )
    {
        ImageId = imageId;
        StartRef = startRef;
        EndRef = endRef;
        _availableLanguages = availableLanguages;
    }

    /// <summary>
    /// Matches images to a verse reference range at book, chapter, or verse level.
    /// Returns images whose reference ranges overlap with the query range.
    /// Source: EXT-009, BHV-612
    /// </summary>
    public static IList<MarbleImageData> GetForReferenceRange(
        IList<MarbleImageData> allImages,
        VerseRef startRef,
        VerseRef endRef
    )
    {
        throw new NotImplementedException("CAP-004 RED phase stub");
    }

    /// <summary>
    /// Returns the best language code for image captions.
    /// Defaults to English if the user's language is not available.
    /// Source: BHV-612
    /// </summary>
    public string GetBestLanguageCode(string userLanguage)
    {
        throw new NotImplementedException("CAP-004 RED phase stub");
    }
}
