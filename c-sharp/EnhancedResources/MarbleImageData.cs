// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleImageData.cs:1-307
// Method: BibleImages.GetForReferenceRangeInternal(), ImageRefRange.OverlapsWith()
// Maps to: EXT-009, BHV-612

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
    /// <summary>Multiplier for the book component of BBBCCCVVV encoding.</summary>
    private const int BookMultiplier = 1_000_000;

    /// <summary>Multiplier for the chapter component of BBBCCCVVV encoding.</summary>
    private const int ChapterMultiplier = 1_000;

    /// <summary>
    /// Sentinel max value for chapter/verse in BBBCCCVVV encoding.
    /// Used in place of versification-dependent LastChapter/LastVerse.
    /// </summary>
    private const int MaxChapterOrVerse = 999;

    public string ImageId { get; }
    public VerseRef StartRef { get; }
    public VerseRef EndRef { get; }
    private readonly string[] _availableLanguages;

    // Precomputed BBBCCCVVV values for efficient range overlap checks.
    // Expanded for book-level (chapter=0) and chapter-level (verse=0) images.
    private readonly int _effectiveStartBbbcccvvv;
    private readonly int _effectiveEndBbbcccvvv;

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
        _availableLanguages = availableLanguages;

        // TS-034: If endRef < startRef, correct by swapping
        if (endRef.CompareTo(startRef) < 0)
        {
            EndRef = startRef;
            StartRef = startRef;
        }
        else
        {
            StartRef = startRef;
            EndRef = endRef;
        }

        _effectiveStartBbbcccvvv = StartRef.BBBCCCVVV;
        _effectiveEndBbbcccvvv = ExpandEndBbbcccvvv(StartRef, EndRef);
    }

    /// <summary>
    /// Matches images to a verse reference range at book, chapter, or verse level.
    /// Returns images whose reference ranges overlap with the query range.
    /// </summary>
    public static IList<MarbleImageData> GetForReferenceRange(
        IList<MarbleImageData> allImages,
        VerseRef startRef,
        VerseRef endRef
    )
    {
        int queryStart = startRef.BBBCCCVVV;
        int queryEnd = ExpandQueryEndBbbcccvvv(endRef);

        // PT9 overlap check: otherStartRef <= EndRef && otherEndRef >= StartRef
        return allImages
            .Where(image =>
                queryStart <= image._effectiveEndBbbcccvvv
                && queryEnd >= image._effectiveStartBbbcccvvv
            )
            .ToList();
    }

    /// <summary>
    /// Returns the best language code for image captions.
    /// Defaults to English if the user's language is not available.
    /// </summary>
    public string GetBestLanguageCode(string userLanguage)
    {
        if (_availableLanguages.Contains(userLanguage))
            return userLanguage;

        return "en";
    }

    /// <summary>
    /// Expands the end BBBCCCVVV value for image reference ranges at initialization.
    /// PT9 expands stored image ranges:
    /// - Book-level (chapter=0): expand to last chapter + last verse of book
    /// - Chapter-level (verse=0): expand to last verse of chapter
    /// Since versification info may be unavailable, uses 999 as max sentinel.
    /// </summary>
    private static int ExpandEndBbbcccvvv(VerseRef startRef, VerseRef endRef)
    {
        if (startRef.ChapterNum == 0)
        {
            // Book-level: cover entire book
            return endRef.BookNum * BookMultiplier
                + MaxChapterOrVerse * ChapterMultiplier
                + MaxChapterOrVerse;
        }

        if (endRef.VerseNum == 0 && endRef.ChapterNum > 0)
        {
            // Chapter-level: cover through last verse of end chapter
            return endRef.BookNum * BookMultiplier
                + endRef.ChapterNum * ChapterMultiplier
                + MaxChapterOrVerse;
        }

        return endRef.BBBCCCVVV;
    }

    /// <summary>
    /// Expands the query end BBBCCCVVV value for chapter-level queries (verse=0).
    /// Unlike image range expansion, queries do not expand at book level.
    /// </summary>
    private static int ExpandQueryEndBbbcccvvv(VerseRef endRef)
    {
        if (endRef.VerseNum == 0 && endRef.ChapterNum > 0)
        {
            return endRef.BookNum * BookMultiplier
                + endRef.ChapterNum * ChapterMultiplier
                + MaxChapterOrVerse;
        }

        return endRef.BBBCCCVVV;
    }
}
