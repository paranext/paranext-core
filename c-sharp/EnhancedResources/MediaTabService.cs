namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for media and maps tab content loading.
/// Includes image reference range matching for determining which images
/// are relevant to the current verse context.
///
/// PT9 Source: Paratext/Marble/MarbleImageData.cs, MediaTab.cs
/// Extractions: EXT-064, EXT-066, EXT-072, EXT-075
/// </summary>
internal static class MediaTabService
{
    /// <summary>
    /// Checks if an image reference range matches a query verse.
    /// Handles whole-book (CCC=000), whole-chapter (VVV=000), and spanning ranges.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/MarbleImageData.cs:95-150
    /// Method: BibleImages.GetForReferenceRange()
    /// Maps to: EXT-064, BHV-415
    /// </summary>
    /// <param name="imageReferenceRange">Reference range in BBBCCCVVV or BBBCCCVVV-BBBCCCVVV format.</param>
    /// <param name="queryVerse">The verse to check against.</param>
    /// <returns>True if the image reference range covers the query verse.</returns>
    public static bool ImageMatchesVerseRange(string imageReferenceRange, VerseReference queryVerse)
    {
        throw new NotImplementedException("CAP-018: ImageMatchesVerseRange not yet implemented");
    }
}
