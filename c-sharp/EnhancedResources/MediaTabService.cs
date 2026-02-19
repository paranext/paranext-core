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
    /// Source: PT9/Paratext/Marble/MarbleImageData.cs:44-68, 155-172
    /// Method: BibleImages.Images setter (ref parsing) + ImageRefRange.OverlapsWith()
    /// Maps to: EXT-064, BHV-415
    /// </summary>
    /// <param name="imageReferenceRange">Reference range in BBBCCCVVV or BBBCCCVVV-BBBCCCVVV format.</param>
    /// <param name="queryVerse">The verse to check against.</param>
    /// <returns>True if the image reference range covers the query verse.</returns>
    public static bool ImageMatchesVerseRange(string imageReferenceRange, VerseReference queryVerse)
    {
        if (string.IsNullOrEmpty(imageReferenceRange))
            return false;

        string[] rangeParts = imageReferenceRange.Split('-');

        int bbbcccvvvStart = ParseBBBCCCVVV(rangeParts[0]);
        if (bbbcccvvvStart < 0)
            return false;

        int bbbcccvvvEnd = ParseBBBCCCVVV(rangeParts[rangeParts.Length > 1 ? 1 : 0]);
        if (bbbcccvvvEnd < 0)
            return false;

        int queryBBBCCCVVV =
            queryVerse.Book * 1000000 + queryVerse.Chapter * 1000 + queryVerse.Verse;

        // Whole-book sentinel: chapter = 000 means entire book
        int startChapter = (bbbcccvvvStart / 1000) % 1000;
        if (startChapter == 0)
        {
            int imageBook = bbbcccvvvStart / 1000000;
            return queryVerse.Book == imageBook;
        }

        // Whole-chapter sentinel: verse = 000 means entire chapter
        int startVerse = bbbcccvvvStart % 1000;
        if (startVerse == 0 && rangeParts.Length == 1)
        {
            int imageBook = bbbcccvvvStart / 1000000;
            int imageChapter = (bbbcccvvvStart / 1000) % 1000;
            return queryVerse.Book == imageBook && queryVerse.Chapter == imageChapter;
        }

        // Spanning range or single verse: numeric overlap
        return queryBBBCCCVVV >= bbbcccvvvStart && queryBBBCCCVVV <= bbbcccvvvEnd;
    }

    /// <summary>
    /// Parses a reference string to a BBBCCCVVV integer.
    /// Handles both 9-digit (BBBCCCVVV) and 14-digit (BBBCCCVVVWWWWW) formats.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/MarbleImageData.cs:47-48
    /// Method: BibleImages.Images setter (inline parsing)
    /// Maps to: EXT-064
    /// </summary>
    private static int ParseBBBCCCVVV(string refString)
    {
        if (!long.TryParse(refString, out long raw))
            return -1;

        // PT9 uses: (int)(long.Parse(part) / 100000L) to strip WWWWW suffix
        // For 9-digit input the value is already BBBCCCVVV (max ~066176176)
        if (raw > 999999999L)
            return (int)(raw / 100000L);

        return (int)raw;
    }
}
