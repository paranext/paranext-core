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
    // BBBCCCVVV field extraction constants
    private const int BookMultiplier = 1_000_000; // BBB occupies digits 7-9
    private const int ChapterMultiplier = 1_000; // CCC occupies digits 4-6
    private const long MaxBbbcccvvv = 999_999_999L; // Threshold for 9-digit vs 14-digit format
    private const long WordSuffixDivisor = 100_000L; // Strips WWWWW suffix from 14-digit format

    /// <summary>
    /// Collection name that distinguishes Maps tab content from Images tab content.
    /// INV-012: Case-insensitive comparison.
    /// </summary>
    private const string SatelliteBibleAtlasCollection = "Satellite Bible Atlas";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MediaTab.cs:375-553
    // Method: MediaTab.LoadResources()
    // Maps to: EXT-072, EXT-075, CAP-011
    //
    // EXPLANATION:
    // This method orchestrates media tab loading:
    // 1. Validate resource and book exist (same pattern as other tab services)
    // 2. Compute the verse range from scope (verse/section/chapter)
    // 3. Get all image metadata for the book
    // 4. Filter images that match the scope range using ImageMatchesVerseRange
    // 5. Exclude "Satellite Bible Atlas" items per INV-012
    // 6. Build MediaDisplayItem records
    /// <summary>
    /// Loads the media tab content for a given resource, verse, and scope.
    /// Orchestrates scope filtering, image metadata lookup, range matching (CAP-018),
    /// and INV-012 filtering (excludes Satellite Bible Atlas).
    /// </summary>
    /// <param name="dataAccess">The data access layer (CAP-028).</param>
    /// <param name="resourceId">The resource ID to load images for.</param>
    /// <param name="verseRef">The current verse reference for scope calculation.</param>
    /// <param name="scope">The scope filter (verse/section/chapter).</param>
    /// <param name="wordFilter">Optional word filter to restrict images to matching tokens.</param>
    /// <returns>MediaTabContent with filtered image items.</returns>
    public static Task<MediaTabContent> LoadMediaTabAsync(
        MarbleDataAccess dataAccess,
        string resourceId,
        VerseReference verseRef,
        ScopeFilter scope,
        WordFilter? wordFilter
    )
    {
        var tokens = ValidateAndGetBookTokens(dataAccess, resourceId, verseRef);

        // Compute the verse range from scope
        var scopeRange = ComputeScopeRange(tokens, verseRef, scope);

        // Get all image metadata for the entire book range
        var allBookImages = dataAccess.GetImageMetadata(
            new VerseReference(verseRef.Book, 0, 0),
            new VerseReference(verseRef.Book, 999, 999)
        );

        // Filter images that match the scope range
        var scopedImages = FilterImagesForScope(allBookImages, verseRef, scopeRange);

        // INV-012: Exclude Satellite Bible Atlas
        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Marble/MediaTab.cs:555-565
        // Method: MediaTab.InvalidImageForTab()
        // Maps to: EXT-066, INV-012
        var filteredImages = scopedImages
            .Where(img =>
                !string.Equals(
                    img.CollectionName,
                    SatelliteBibleAtlasCollection,
                    StringComparison.OrdinalIgnoreCase
                )
            )
            .ToList();

        // Build display items
        var items = filteredImages
            .Select(img => new MediaDisplayItem(
                Id: img.ImageId,
                CollectionName: img.CollectionName,
                ReferenceRange: img.StartRef == img.EndRef
                    ? img.StartRef
                    : $"{img.StartRef}-{img.EndRef}",
                FilePath: img.FilePath,
                Expanded: false
            ))
            .ToList();

        var result = new MediaTabContent(items, HeaderHtml: "");
        return Task.FromResult(result);
    }

    /// <summary>
    /// Validates that the resource and book exist, returning the book's tokens.
    /// Throws RESOURCE_NOT_FOUND or BOOK_NOT_FOUND on failure.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Shared validation pattern for tab loading methods
    // Maps to: CAP-011
    private static IReadOnlyList<MarbleToken> ValidateAndGetBookTokens(
        MarbleDataAccess dataAccess,
        string resourceId,
        VerseReference verseRef
    )
    {
        if (!dataAccess.AvailableBibles.Contains(resourceId))
            throw new Exception($"RESOURCE_NOT_FOUND: Resource '{resourceId}' not found");

        var tokens = dataAccess.GetBookTokens(resourceId, verseRef.Book);
        if (tokens == null || tokens.Count == 0)
            throw new Exception(
                $"BOOK_NOT_FOUND: Book {verseRef.Book} not available in resource '{resourceId}'"
            );

        bool hasMatchingBook = tokens.Any(t =>
            t.VerseRef != null && t.VerseRef.Book == verseRef.Book
        );
        if (!hasMatchingBook)
            throw new Exception(
                $"BOOK_NOT_FOUND: Book {verseRef.Book} not available in resource '{resourceId}'"
            );

        return tokens;
    }

    /// <summary>
    /// Computes the verse range for the specified scope.
    /// Returns (startVerse, endVerse) pair within the current chapter.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Scope-based verse range computation for image filtering
    // Maps to: CAP-011
    private static (int StartVerse, int EndVerse) ComputeScopeRange(
        IReadOnlyList<MarbleToken> tokens,
        VerseReference verseRef,
        ScopeFilter scope
    )
    {
        return scope switch
        {
            ScopeFilter.CurrentVerse => (verseRef.Verse, verseRef.Verse),
            ScopeFilter.CurrentSection => ComputeSectionRange(tokens, verseRef),
            _ => (0, int.MaxValue), // CurrentChapter: all verses
        };
    }

    /// <summary>
    /// Computes the verse range for the section containing the given verse.
    /// Uses VerseRef-based tracking to detect section boundaries from tokens.
    /// Falls back to the full chapter if no matching section is found.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Section boundary detection using VerseRef fields (tokens may not have Text)
    // Maps to: CAP-011
    private static (int StartVerse, int EndVerse) ComputeSectionRange(
        IReadOnlyList<MarbleToken> tokens,
        VerseReference verseRef
    )
    {
        // First try GetSectionBoundaries (works when tokens have Text fields)
        var boundaries = MarbleDataParser.GetSectionBoundaries(tokens);
        if (boundaries.Count > 0)
        {
            var section = boundaries.FirstOrDefault(b =>
                verseRef.Verse >= b.StartVerse.Verse && verseRef.Verse <= b.EndVerse.Verse
            );
            if (section != null)
                return (section.StartVerse.Verse, section.EndVerse.Verse);
        }

        // Fallback: compute sections from VerseRef fields on tokens
        int currentVerse = 0;
        int lastVerse = 0;
        var sectionStarts = new List<int>();

        foreach (var token in tokens)
        {
            if (token.Type == MarbleTokenType.Verse && token.VerseRef != null)
            {
                currentVerse = token.VerseRef.Verse;
                if (currentVerse > lastVerse)
                    lastVerse = currentVerse;
            }
            else if (
                token.Type == MarbleTokenType.ParagraphStart
                && !string.IsNullOrEmpty(token.Style)
                && token.Style.StartsWith("s", StringComparison.OrdinalIgnoreCase)
            )
            {
                // Use VerseRef on the token if available, else use tracked verse
                int headingVerse = token.VerseRef?.Verse ?? currentVerse;
                sectionStarts.Add(headingVerse);
            }
        }

        if (lastVerse == 0)
            return (0, int.MaxValue);

        if (sectionStarts.Count == 0)
            return (1, lastVerse);

        // Build section ranges: content before first heading + each heading section
        // Pre-heading section: [1, firstHeading - 1]
        if (verseRef.Verse < sectionStarts[0])
            return (1, sectionStarts[0] - 1);

        // Section heading sections
        for (int i = 0; i < sectionStarts.Count; i++)
        {
            int startV = sectionStarts[i];
            int endV = i < sectionStarts.Count - 1 ? sectionStarts[i + 1] - 1 : lastVerse;

            if (verseRef.Verse >= startV && verseRef.Verse <= endV)
                return (startV, endV);
        }

        return (0, int.MaxValue);
    }

    /// <summary>
    /// Filters image entries that overlap the scope range.
    /// Uses ImageMatchesVerseRange for per-verse checking when scope is verse-level,
    /// and numeric range overlap for broader scopes.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Scope-aware image filtering combining CAP-018 matching with scope ranges
    // Maps to: CAP-011
    private static List<ImageEntry> FilterImagesForScope(
        IReadOnlyList<ImageEntry> allImages,
        VerseReference verseRef,
        (int StartVerse, int EndVerse) scopeRange
    )
    {
        var result = new List<ImageEntry>();

        foreach (var image in allImages)
        {
            bool matches = false;

            // For each verse in the scope range, check if the image matches.
            // Optimization: for verse scope (start == end), only one check.
            // For chapter/section scope, iterate the verse range but cap at reasonable bounds.
            if (scopeRange.StartVerse == scopeRange.EndVerse)
            {
                // Single verse check
                var refRange =
                    image.StartRef == image.EndRef
                        ? image.StartRef
                        : $"{image.StartRef}-{image.EndRef}";
                matches = ImageMatchesVerseRange(
                    refRange,
                    new VerseReference(verseRef.Book, verseRef.Chapter, scopeRange.StartVerse)
                );
            }
            else
            {
                // Range check: iterate verses in scope
                int endVerse = Math.Min(scopeRange.EndVerse, 200);
                int startVerse = Math.Max(scopeRange.StartVerse, 0);
                if (startVerse == 0)
                    startVerse = 1;

                var refRange =
                    image.StartRef == image.EndRef
                        ? image.StartRef
                        : $"{image.StartRef}-{image.EndRef}";

                for (int v = startVerse; v <= endVerse; v++)
                {
                    if (
                        ImageMatchesVerseRange(
                            refRange,
                            new VerseReference(verseRef.Book, verseRef.Chapter, v)
                        )
                    )
                    {
                        matches = true;
                        break;
                    }
                }
            }

            if (matches)
                result.Add(image);
        }

        return result;
    }

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

        string endPart = rangeParts.Length > 1 ? rangeParts[1] : rangeParts[0];
        int bbbcccvvvEnd = ParseBBBCCCVVV(endPart);
        if (bbbcccvvvEnd < 0)
            return false;

        int queryBBBCCCVVV =
            queryVerse.Book * BookMultiplier
            + queryVerse.Chapter * ChapterMultiplier
            + queryVerse.Verse;

        // Extract fields from the start reference once
        int imageBook = bbbcccvvvStart / BookMultiplier;
        int imageChapter = (bbbcccvvvStart / ChapterMultiplier) % ChapterMultiplier;
        int imageVerse = bbbcccvvvStart % ChapterMultiplier;

        // Whole-book sentinel: chapter = 000 means entire book
        if (imageChapter == 0)
            return queryVerse.Book == imageBook;

        // Whole-chapter sentinel: verse = 000 means entire chapter (single ref only)
        if (imageVerse == 0 && rangeParts.Length == 1)
            return queryVerse.Book == imageBook && queryVerse.Chapter == imageChapter;

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
        if (raw > MaxBbbcccvvv)
            return (int)(raw / WordSuffixDivisor);

        return (int)raw;
    }
}
