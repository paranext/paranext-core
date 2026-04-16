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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleImageData.cs:30-68
    // Method: BibleImages.Images setter (reference expansion logic)
    // Maps to: EXT-009, BHV-612
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

        // EXPLANATION:
        // PT9 expands reference ranges at initialization time:
        // - Book-level (chapter=0): expand endRef to last chapter + last verse of book
        // - Chapter-level (verse=0): expand endRef to last verse of chapter
        // Since we may not have versification info, we use 999 as max sentinel value
        // (matching PT9 pattern where BBBCCCVVV caps at 999 for chapter/verse).
        _effectiveStartBbbcccvvv = StartRef.BBBCCCVVV;

        if (StartRef.ChapterNum == 0)
        {
            // Book-level: cover entire book
            _effectiveEndBbbcccvvv = EndRef.BookNum * 1000000 + 999 * 1000 + 999;
        }
        else if (EndRef.VerseNum == 0)
        {
            // Chapter-level: cover through last verse of end chapter
            _effectiveEndBbbcccvvv = EndRef.BookNum * 1000000 + EndRef.ChapterNum * 1000 + 999;
        }
        else
        {
            _effectiveEndBbbcccvvv = EndRef.BBBCCCVVV;
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleImageData.cs:122-150
    // Method: BibleImages.GetForReferenceRangeInternal()
    // Maps to: EXT-009, BHV-612
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
        int queryStart = startRef.BBBCCCVVV;
        int queryEnd = endRef.BBBCCCVVV;

        // Expand query end for chapter-level queries (verse=0)
        if (endRef.VerseNum == 0 && endRef.ChapterNum > 0)
        {
            queryEnd = endRef.BookNum * 1000000 + endRef.ChapterNum * 1000 + 999;
        }

        var result = new List<MarbleImageData>();

        foreach (var image in allImages)
        {
            // PT9 overlap check: otherStartRef <= EndRef && otherEndRef >= StartRef
            if (
                queryStart <= image._effectiveEndBbbcccvvv
                && queryEnd >= image._effectiveStartBbbcccvvv
            )
            {
                result.Add(image);
            }
        }

        return result;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleImageData.cs:264-267
    // Method: BibleImage.GetBestDefinition() (delegates to Localizer.GetBestLocalization)
    // Maps to: BHV-612
    /// <summary>
    /// Returns the best language code for image captions.
    /// Defaults to English if the user's language is not available.
    /// Source: BHV-612
    /// </summary>
    public string GetBestLanguageCode(string userLanguage)
    {
        if (_availableLanguages.Contains(userLanguage))
            return userLanguage;

        return "en";
    }
}
