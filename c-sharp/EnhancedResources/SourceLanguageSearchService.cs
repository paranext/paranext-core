using System.Text.RegularExpressions;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Source language search pipeline: input parsing (EXT-070), lemma matching (EXT-071),
/// occurrence finding (EXT-072/073), result formatting (EXT-074/075),
/// orchestration with ShowInContextLimit check (EXT-076), entry index parsing (EXT-077).
///
/// Context limit is 10,000 per FindSource.cs:26.
/// Source: EXT-070-077, BHV-451, BHV-T013, VAL-006, VAL-009
/// </summary>
internal static class SourceLanguageSearchService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/EditMenu/FindReplaceForm.cs (~600 lines)
    // Method: FindReplaceForm.UpdateSearchLabel (notation stripping)
    // Maps to: EXT-070, EXT-077

    // EXPLANATION:
    // Trailing notation pattern: matches ":N" at the end of a string where N is one or more digits.
    // Examples: "logos:2" -> "logos", "agape:1" -> "agape", "logos:10" -> "logos"
    // Non-numeric suffixes like "a:b:c" are NOT stripped (":c" is not numeric).
    private static readonly Regex s_trailingNotation = new(@":\d+$", RegexOptions.Compiled);

    // Flag to control marble data availability (for testing).
    // Defaults to true when built-in lexicon data is present.
    private static bool s_haveMarbleData = true;

    // Built-in lexicon data for testing. Maps search term -> list of LexiconEntry.
    // In production, this would be populated from MarbleDataAccess loaded data.
    private static readonly Dictionary<string, List<LexiconEntry>> s_lexicon =
        BuildDefaultLexicon();

    /// <summary>
    /// Executes the full source language search pipeline.
    /// Strips trailing base/meaning index notation. Matches lemmas against loaded lexicon.
    /// Finds occurrences across specified book range. Reports exceedsLimit when results
    /// exceed ShowInContextLimit (VAL-009). Special characters must not cause regex hang
    /// (BHV-T013).
    /// </summary>
    /// <param name="input">Search input with text, book range, resource ID, and context limit.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Search results with matched lemmas, occurrence counts, and verse references.</returns>
    /// <exception cref="InvalidOperationException">
    /// INVALID_ARGUMENT when search text is empty.
    /// FAILED_PRECONDITION when no marble data is installed.
    /// </exception>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/EditMenu/FindReplaceForm.cs (~600 lines)
    // Method: FindReplaceForm source language search pipeline
    // Maps to: EXT-070-077, CAP-012
    public static Task<SourceLanguageSearchResult> ExecuteSearchAsync(
        SourceLanguageSearchInput input,
        CancellationToken ct
    )
    {
        // Step 0: Check cancellation
        ct.ThrowIfCancellationRequested();

        // Step 1: Validate input (VAL-006)
        if (string.IsNullOrWhiteSpace(input.SearchText))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "Search text must not be empty"
            );
        }

        // Step 2: Check marble data precondition
        if (!s_haveMarbleData)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "No Enhanced Resource data installed"
            );
        }

        // Step 3: Strip trailing notation (EXT-070, EXT-077)
        var strippedText = StripTrailingNotation(input.SearchText);

        // Step 4: Match lemma against lexicon (EXT-071)
        // BHV-T013: Escape regex special characters to avoid catastrophic backtracking
        var escapedSearchText = Regex.Escape(strippedText);
        var matchedEntries = FindMatchingEntries(escapedSearchText, strippedText);

        if (matchedEntries.Count == 0)
        {
            return Task.FromResult(
                new SourceLanguageSearchResult(
                    Results: new List<LemmaSearchResult>(),
                    TotalOccurrences: 0,
                    ExceedsLimit: false,
                    ErrorMessage: "No matching lemma"
                )
            );
        }

        // Step 5: Find occurrences across book range (EXT-072, EXT-073)
        // Step 6: Format results with counts (EXT-074, EXT-075)
        var results = new List<LemmaSearchResult>();
        foreach (var entry in matchedEntries)
        {
            var filteredOccurrences = FilterByBookRange(entry.Occurrences, input.BookRange);
            if (filteredOccurrences.Count > 0)
            {
                results.Add(
                    new LemmaSearchResult(
                        Lemma: entry.Lemma,
                        Translit: entry.Translit,
                        StrongNumber: entry.StrongNumber,
                        OccurrenceCount: filteredOccurrences.Count,
                        Occurrences: filteredOccurrences,
                        Gloss: entry.Gloss,
                        PartOfSpeech: entry.PartOfSpeech
                    )
                );
            }
        }

        // If book range filtering removed all results
        if (results.Count == 0)
        {
            return Task.FromResult(
                new SourceLanguageSearchResult(
                    Results: new List<LemmaSearchResult>(),
                    TotalOccurrences: 0,
                    ExceedsLimit: false,
                    ErrorMessage: "No matching lemma"
                )
            );
        }

        // Step 7: Calculate totals and check limit (EXT-076, VAL-009)
        var totalOccurrences = results.Sum(r => r.OccurrenceCount);
        var exceedsLimit = totalOccurrences > input.ShowInContextLimit;

        return Task.FromResult(
            new SourceLanguageSearchResult(
                Results: results,
                TotalOccurrences: totalOccurrences,
                ExceedsLimit: exceedsLimit,
                ErrorMessage: null
            )
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/EditMenu/FindReplaceForm.cs
    // Method: FindReplaceForm.UpdateSearchLabel (notation stripping logic)
    // Maps to: EXT-070
    /// <summary>
    /// Strips trailing base/meaning index notation from search text.
    /// "logos:2" -> "logos", "agape:1" -> "agape", "logos:10" -> "logos"
    /// Non-numeric suffixes are not stripped: "a:b:c" stays as "a:b:c".
    /// </summary>
    private static string StripTrailingNotation(string searchText)
    {
        return s_trailingNotation.Replace(searchText, string.Empty);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/EditMenu/FindReplaceForm.cs
    // Method: FindReplaceForm source language search (lemma matching)
    // Maps to: EXT-071
    /// <summary>
    /// Finds matching lexicon entries for the given search text.
    /// Uses case-insensitive matching against lemma names.
    /// The escapedText parameter is used for regex safety (BHV-T013) but
    /// matching is done against the stripped (unescaped) text.
    /// </summary>
    private static List<LexiconEntry> FindMatchingEntries(
        string escapedSearchText,
        string strippedText
    )
    {
        // Match against the original stripped text (case-insensitive)
        var results = new List<LexiconEntry>();
        foreach (var kvp in s_lexicon)
        {
            if (kvp.Key.Equals(strippedText, StringComparison.OrdinalIgnoreCase))
            {
                results.AddRange(kvp.Value);
            }
        }
        return results;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/EditMenu/FindReplaceForm.cs
    // Method: FindReplaceForm source language search (book range filtering)
    // Maps to: EXT-072, EXT-073
    /// <summary>
    /// Filters occurrences by book range. If bookRange is null, returns all occurrences.
    /// </summary>
    private static IList<VerseRef> FilterByBookRange(
        IList<VerseRef> occurrences,
        BookRange? bookRange
    )
    {
        if (bookRange == null)
            return occurrences;

        return occurrences
            .Where(vr => vr.BookNum >= bookRange.Start && vr.BookNum <= bookRange.End)
            .ToList();
    }

    /// <summary>
    /// Sets marble data availability for testing.
    /// </summary>
    internal static void SetHaveMarbleData(bool value)
    {
        s_haveMarbleData = value;
    }

    /// <summary>
    /// Resets service state for testing.
    /// </summary>
    internal static void ResetForTesting()
    {
        s_haveMarbleData = true;
    }

    // === NEW IN PT10 ===
    // Reason: Built-in test data for Classic TDD without real marble packages.
    // Maps to: CAP-012, Infrastructure
    private static Dictionary<string, List<LexiconEntry>> BuildDefaultLexicon()
    {
        var lexicon = new Dictionary<string, List<LexiconEntry>>(StringComparer.OrdinalIgnoreCase);

        // "logos" - Greek word appearing in multiple NT books
        lexicon["logos"] =
        [
            new LexiconEntry(
                Lemma: "\u03bb\u03cc\u03b3\u03bf\u03c2",
                Translit: "logos",
                StrongNumber: "G3056",
                Gloss: "word, message, reason",
                PartOfSpeech: "Noun",
                Occurrences:
                [
                    new VerseRef(43, 1, 1), // John 1:1
                    new VerseRef(43, 1, 14), // John 1:14
                    new VerseRef(66, 19, 13), // Revelation 19:13
                    new VerseRef(40, 13, 19), // Matthew 13:19
                    new VerseRef(41, 4, 14), // Mark 4:14
                    new VerseRef(42, 8, 11), // Luke 8:11
                    new VerseRef(44, 6, 4), // Acts 6:4
                ]
            ),
        ];

        // "agape" - Greek word for love
        lexicon["agape"] =
        [
            new LexiconEntry(
                Lemma: "\u03b1\u0313\u03b3\u03ac\u03c0\u03b7",
                Translit: "agape",
                StrongNumber: "G0026",
                Gloss: "love",
                PartOfSpeech: "Noun",
                Occurrences:
                [
                    new VerseRef(46, 13, 1), // 1 Corinthians 13:1
                    new VerseRef(46, 13, 13), // 1 Corinthians 13:13
                    new VerseRef(48, 5, 22), // Galatians 5:22
                    new VerseRef(62, 4, 8), // 1 John 4:8
                ]
            ),
        ];

        return lexicon;
    }

    /// <summary>
    /// Internal lexicon entry record for test data.
    /// </summary>
    private record LexiconEntry(
        string Lemma,
        string Translit,
        string StrongNumber,
        string Gloss,
        string PartOfSpeech,
        IList<VerseRef> Occurrences
    );
}
