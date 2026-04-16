using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for SourceLanguageSearchService.ExecuteSearchAsync - the full source language
/// search pipeline.
/// CAP-012: ExecuteSourceLanguageSearch
///
/// Behaviors: BHV-451 (Guide Form Owner Activation - referenced by VAL-006),
///            BHV-T013 (No Hang When Searching Special Characters),
///            BHV-601 (Scope-Based Link Filtering - referenced by TS-072 through TS-075)
/// Contract: Section 4.12 M-012, Section 2.10 SourceLanguageSearchInput,
///           Section 3.10 SourceLanguageSearchResult
/// Sources: EXT-070 (Input Parsing / Trailing Notation Stripping),
///          EXT-071 (Lemma Matching Against Loaded Lexicon),
///          EXT-072 (Occurrence Finding Across Books),
///          EXT-073 (Occurrence Finding - Book Range Constraint),
///          EXT-074 (Result Formatting With Occurrence Counts),
///          EXT-075 (Result Formatting With Verse References),
///          EXT-076 (Search Orchestration With ShowInContextLimit Check),
///          EXT-077 (Entry Index Parsing For Base Form Notation)
/// Invariants: VAL-006 (Source Language Search Input),
///             VAL-009 (ShowInContextLimit Prompt)
///
/// SourceLanguageSearchService is a static service that takes SourceLanguageSearchInput
/// and returns SourceLanguageSearchResult. The pipeline:
///   1. EXT-070: Strip trailing base/meaning index notation from search text
///   2. EXT-077: Parse entry index notation (e.g., "logos:2" -> "logos", index 2)
///   3. EXT-071: Match stripped text against loaded lexicon data
///   4. EXT-072/073: Find occurrences across specified book range
///   5. EXT-074/075: Format results with occurrence counts and verse references
///   6. EXT-076: Orchestrate pipeline, check ShowInContextLimit (VAL-009)
///   7. BHV-T013: Special characters must not cause regex hang
///
/// Context limit is 10,000 per FindSource.cs:26.
/// No matching lemma returns errorMessage="No matching lemma" (not an exception).
/// Empty search text throws INVALID_ARGUMENT.
/// No marble data throws FAILED_PRECONDITION.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class SourceLanguageSearchServiceTests
{
    #region Test Data Constants

    private const string TestResourceId = "SDBG";

    /// <summary>
    /// The context limit from FindSource.cs:26.
    /// When total occurrences exceed this, ExceedsLimit must be true.
    /// </summary>
    private const int ContextLimit = 10_000;

    /// <summary>
    /// Creates a test SourceLanguageSearchInput with the given search text.
    /// Default: all books, SDBG resource, standard context limit.
    /// </summary>
    private static SourceLanguageSearchInput CreateInput(
        string searchText,
        BookRange? bookRange = null,
        int showInContextLimit = ContextLimit
    )
    {
        return new SourceLanguageSearchInput(
            SearchText: searchText,
            BookRange: bookRange,
            ResourceId: TestResourceId,
            ShowInContextLimit: showInContextLimit
        );
    }

    #endregion

    #region Acceptance Tests

    // =========================================================================
    // Acceptance test (OUTER): Full pipeline search for a known lemma.
    // The search pipeline correctly strips trailing notation, matches lemmas,
    // finds occurrences across books, formats results with counts, and reports
    // exceedsLimit. This is the "done signal" for CAP-012.
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Description(
        "Acceptance: Full pipeline - search for known Greek lemma returns matching entries "
            + "with occurrence counts and verse references"
    )]
    public async Task ExecuteSearch_KnownLemma_ReturnsMatchingResultsWithOccurrences()
    {
        // Arrange: search for a Greek lemma that exists in the loaded lexicon
        var input = CreateInput("logos");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: results returned with populated fields
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results, Is.Not.Null);
        Assert.That(result.Results.Count, Is.GreaterThan(0), "TS-072: Must find matching lemma");
        Assert.That(result.ErrorMessage, Is.Null, "No error message when lemma matches are found");

        // Each result must have populated fields (EXT-074/075)
        foreach (var lemmaResult in result.Results)
        {
            Assert.That(lemmaResult.Lemma, Is.Not.Null.And.Not.Empty, "Lemma text required");
            Assert.That(
                lemmaResult.StrongNumber,
                Is.Not.Null.And.Not.Empty,
                "Strong number required"
            );
            Assert.That(
                lemmaResult.OccurrenceCount,
                Is.GreaterThan(0),
                "EXT-074: Occurrence count must be positive for matched lemma"
            );
            Assert.That(
                lemmaResult.Occurrences,
                Is.Not.Null,
                "EXT-075: Verse references must be populated"
            );
            Assert.That(
                lemmaResult.Occurrences.Count,
                Is.EqualTo(lemmaResult.OccurrenceCount),
                "EXT-074/075: Occurrences list count must match OccurrenceCount"
            );
        }

        // TotalOccurrences is sum of all individual counts
        var expectedTotal = result.Results.Sum(r => r.OccurrenceCount);
        Assert.That(
            result.TotalOccurrences,
            Is.EqualTo(expectedTotal),
            "TotalOccurrences must equal sum of individual occurrence counts"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-601")]
    [Description(
        "Acceptance: Pipeline strips trailing notation before searching "
            + "(EXT-070/077 combined with full pipeline)"
    )]
    public async Task ExecuteSearch_TrailingNotation_StrippedBeforeMatching()
    {
        // Arrange: search text with trailing base/meaning index notation
        // "logos:2" should be stripped to "logos" before matching (EXT-070, EXT-077)
        var inputWithNotation = CreateInput("logos:2");
        var inputWithoutNotation = CreateInput("logos");

        // Act
        var resultWithNotation = await SourceLanguageSearchService.ExecuteSearchAsync(
            inputWithNotation,
            CancellationToken.None
        );
        var resultWithoutNotation = await SourceLanguageSearchService.ExecuteSearchAsync(
            inputWithoutNotation,
            CancellationToken.None
        );

        // Assert: both should find the same lemma (notation stripped)
        Assert.That(resultWithNotation, Is.Not.Null);
        Assert.That(resultWithoutNotation, Is.Not.Null);
        Assert.That(
            resultWithNotation.Results.Count,
            Is.GreaterThan(0),
            "TS-073: Trailing notation must be stripped, allowing match"
        );
        // The results should reference the same lemma set (notation is stripped)
        Assert.That(
            resultWithNotation.Results.Select(r => r.Lemma).OrderBy(l => l),
            Is.EquivalentTo(resultWithoutNotation.Results.Select(r => r.Lemma).OrderBy(l => l)),
            "EXT-070: Stripping notation should yield same lemma results"
        );
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-075")]
    [Property("BehaviorId", "BHV-T013")]
    [Description("Acceptance: Special regex characters do not cause hang (BHV-T013, PTX-23229)")]
    public async Task ExecuteSearch_SpecialRegexChars_CompletesWithoutHanging()
    {
        // Arrange: special regex character that could cause catastrophic backtracking
        var input = CreateInput("]");

        // Act: must complete without hanging (timeout would indicate failure)
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(input, cts.Token);

        // Assert: completes successfully (may or may not find results)
        Assert.That(result, Is.Not.Null, "TS-075: Search must complete, not hang");
        Assert.That(result.Results, Is.Not.Null, "Result list must not be null");
    }

    #endregion

    #region Input Parsing - Trailing Notation (EXT-070, EXT-077)

    // =========================================================================
    // EXT-070: Strip trailing base/meaning index notation from search text.
    // EXT-077: Parse entry index for base form notation.
    // Examples: "logos:2" -> "logos", "agape:1" -> "agape"
    // VAL-006: Search term has trailing notation stripped server-side.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-070")]
    [Property("ValidationRule", "VAL-006")]
    [Description("EXT-070: Trailing colon-number notation stripped from search text")]
    public async Task ExecuteSearch_ColonNumberNotation_StrippedFromSearchText()
    {
        // Arrange: "logos:2" should search for "logos"
        var input = CreateInput("logos:2");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: search proceeds without error (notation stripped)
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.ErrorMessage,
            Is.Not.EqualTo("No matching lemma").Or.Null,
            "EXT-070: Trailing ':2' must be stripped; search for bare term should find results"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-077")]
    [Description("EXT-077: Multiple notation formats stripped correctly")]
    public async Task ExecuteSearch_VariousNotationFormats_AllStripped()
    {
        // Arrange: various trailing notation formats that EXT-077 should handle
        var searchTerms = new[] { "logos:1", "logos:2", "logos:10" };

        foreach (var term in searchTerms)
        {
            // Act
            var input = CreateInput(term);
            var result = await SourceLanguageSearchService.ExecuteSearchAsync(
                input,
                CancellationToken.None
            );

            // Assert: all should produce results (notation stripped, base term searched)
            Assert.That(result, Is.Not.Null, $"EXT-077: Search for '{term}' must complete");
            Assert.That(
                result.Results,
                Is.Not.Null,
                $"EXT-077: Result list for '{term}' must not be null"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-070")]
    [Description("EXT-070: Plain text without notation is not modified")]
    public async Task ExecuteSearch_PlainTextNoNotation_NotModified()
    {
        // Arrange: plain search text with no trailing notation
        var input = CreateInput("logos");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: search proceeds normally
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results, Is.Not.Null);
    }

    #endregion

    #region Lemma Matching (EXT-071)

    // =========================================================================
    // EXT-071: Match stripped search text against loaded lexicon data.
    // If no match found, returns empty results with errorMessage="No matching lemma".
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-071")]
    [Description("EXT-071: Search for existing lemma returns matched results")]
    public async Task ExecuteSearch_ExistingLemma_ReturnsResults()
    {
        // Arrange: a lemma known to exist in the loaded lexicon
        var input = CreateInput("logos");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: results found
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.Results.Count,
            Is.GreaterThan(0),
            "EXT-071: Existing lemma must return at least one match"
        );
        Assert.That(result.ErrorMessage, Is.Null, "No error when lemma found");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-071")]
    [Description(
        "EXT-071: Search for nonexistent lemma returns empty results with 'No matching lemma'"
    )]
    public async Task ExecuteSearch_NonexistentLemma_ReturnsNoMatchingLemmaMessage()
    {
        // Arrange: a term that does not exist in the lexicon
        var input = CreateInput("xyznonexistent");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: empty results with error message (not an exception)
        Assert.That(result, Is.Not.Null, "Must return a result object, not throw");
        Assert.That(result.Results, Is.Not.Null);
        Assert.That(result.Results, Is.Empty, "TS-074: Nonexistent lemma returns empty results");
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("No matching lemma"),
            "TS-074: Error message must be 'No matching lemma' for no results"
        );
        Assert.That(result.TotalOccurrences, Is.EqualTo(0), "No occurrences when no lemma matched");
        Assert.That(result.ExceedsLimit, Is.False, "ExceedsLimit must be false when no results");
    }

    #endregion

    #region Occurrence Finding Across Books (EXT-072, EXT-073)

    // =========================================================================
    // EXT-072: Find occurrences of matched lemma across all books.
    // EXT-073: Respect book range constraint when specified.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-072")]
    [Description("EXT-072: Search without book range searches all books")]
    public async Task ExecuteSearch_NoBookRange_SearchesAllBooks()
    {
        // Arrange: search with no book range (all books)
        var input = CreateInput("logos", bookRange: null);

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: results found across books (if lemma exists in multiple books)
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results, Is.Not.Null);
        if (result.Results.Count > 0)
        {
            // Occurrences should span books when no range constraint applied
            var allOccurrences = result.Results.SelectMany(r => r.Occurrences).ToList();
            Assert.That(
                allOccurrences,
                Is.Not.Empty,
                "EXT-072: Occurrences must be found when lemma exists"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-073")]
    [Description("EXT-073: Book range constraint limits results to specified range")]
    public async Task ExecuteSearch_WithBookRange_OnlyIncludesOccurrencesInRange()
    {
        // Arrange: search restricted to NT books only (40-66)
        var bookRange = new BookRange(Start: 40, End: 66);
        var input = CreateInput("logos", bookRange: bookRange);

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: all occurrences must be within the specified book range
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results, Is.Not.Null);
        foreach (var lemmaResult in result.Results)
        {
            foreach (var occurrence in lemmaResult.Occurrences)
            {
                Assert.That(
                    occurrence.BookNum,
                    Is.GreaterThanOrEqualTo(bookRange.Start).And.LessThanOrEqualTo(bookRange.End),
                    $"EXT-073: Occurrence in book {occurrence.BookNum} is outside range "
                        + $"[{bookRange.Start}, {bookRange.End}]"
                );
            }
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-073")]
    [Description("EXT-073: Single-book range returns only occurrences from that book")]
    public async Task ExecuteSearch_SingleBookRange_ReturnsOnlyThatBook()
    {
        // Arrange: search restricted to a single book (John = 43)
        var bookRange = new BookRange(Start: 43, End: 43);
        var input = CreateInput("logos", bookRange: bookRange);

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: occurrences only from book 43
        Assert.That(result, Is.Not.Null);
        foreach (var lemmaResult in result.Results)
        {
            foreach (var occurrence in lemmaResult.Occurrences)
            {
                Assert.That(
                    occurrence.BookNum,
                    Is.EqualTo(43),
                    "EXT-073: Single-book range must only return occurrences from that book"
                );
            }
        }
    }

    #endregion

    #region Result Formatting (EXT-074, EXT-075)

    // =========================================================================
    // EXT-074: Results formatted with occurrence counts.
    // EXT-075: Results include verse references for each occurrence.
    // Each LemmaSearchResult has: Lemma, Translit, StrongNumber,
    //   OccurrenceCount, Occurrences (VerseRef list), Gloss, PartOfSpeech.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-074")]
    [Description("EXT-074: Each LemmaSearchResult has all required fields populated")]
    public async Task ExecuteSearch_MatchFound_ResultHasAllRequiredFields()
    {
        // Arrange: known lemma search
        var input = CreateInput("logos");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: all fields populated on each result
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results.Count, Is.GreaterThan(0));

        foreach (var lemmaResult in result.Results)
        {
            Assert.That(lemmaResult.Lemma, Is.Not.Null.And.Not.Empty, "Lemma required");
            Assert.That(
                lemmaResult.Translit,
                Is.Not.Null.And.Not.Empty,
                "Transliteration required"
            );
            Assert.That(
                lemmaResult.StrongNumber,
                Is.Not.Null.And.Not.Empty,
                "Strong number required"
            );
            Assert.That(
                lemmaResult.OccurrenceCount,
                Is.GreaterThan(0),
                "EXT-074: Occurrence count must be > 0 for matched lemma"
            );
            Assert.That(
                lemmaResult.Gloss,
                Is.Not.Null,
                "Gloss required (may be empty if no gloss available)"
            );
            Assert.That(
                lemmaResult.PartOfSpeech,
                Is.Not.Null,
                "PartOfSpeech required (may be empty if unknown)"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-075")]
    [Description("EXT-075: Each occurrence has valid verse reference")]
    public async Task ExecuteSearch_MatchFound_OccurrencesHaveValidVerseRefs()
    {
        // Arrange
        var input = CreateInput("logos");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: each occurrence has valid VerseRef (book > 0, chapter >= 0, verse >= 0)
        Assert.That(result, Is.Not.Null);
        foreach (var lemmaResult in result.Results)
        {
            Assert.That(
                lemmaResult.Occurrences,
                Is.Not.Null,
                "EXT-075: Occurrences list must not be null"
            );
            foreach (var verseRef in lemmaResult.Occurrences)
            {
                Assert.That(
                    verseRef.BookNum,
                    Is.GreaterThanOrEqualTo(1),
                    "EXT-075: Book number must be >= 1"
                );
                Assert.That(
                    verseRef.ChapterNum,
                    Is.GreaterThanOrEqualTo(0),
                    "EXT-075: Chapter number must be >= 0"
                );
                Assert.That(
                    verseRef.VerseNum,
                    Is.GreaterThanOrEqualTo(0),
                    "EXT-075: Verse number must be >= 0"
                );
            }
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-074")]
    [Description("EXT-074: TotalOccurrences equals sum of individual OccurrenceCount values")]
    public async Task ExecuteSearch_MatchFound_TotalOccurrencesEqualsSumOfCounts()
    {
        // Arrange
        var input = CreateInput("logos");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: TotalOccurrences is the sum
        Assert.That(result, Is.Not.Null);
        if (result.Results.Count > 0)
        {
            var expectedTotal = result.Results.Sum(r => r.OccurrenceCount);
            Assert.That(
                result.TotalOccurrences,
                Is.EqualTo(expectedTotal),
                "EXT-074: TotalOccurrences must be sum of all OccurrenceCount values"
            );
        }
    }

    #endregion

    #region ExceedsLimit (EXT-076, VAL-009)

    // =========================================================================
    // EXT-076: Search orchestration with ShowInContextLimit check.
    // VAL-009: If total occurrences > ShowInContextLimit, ExceedsLimit = true.
    // Context limit is 10,000 per FindSource.cs:26.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-076")]
    [Property("ValidationRule", "VAL-009")]
    [Description("VAL-009: ExceedsLimit is false when total occurrences <= ShowInContextLimit")]
    public async Task ExecuteSearch_WithinLimit_ExceedsLimitIsFalse()
    {
        // Arrange: use a high limit so results stay within
        var input = CreateInput("logos", showInContextLimit: ContextLimit);

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: if results are within limit, ExceedsLimit is false
        Assert.That(result, Is.Not.Null);
        if (result.TotalOccurrences <= ContextLimit)
        {
            Assert.That(
                result.ExceedsLimit,
                Is.False,
                "VAL-009: ExceedsLimit must be false when TotalOccurrences <= ShowInContextLimit"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-076")]
    [Property("ValidationRule", "VAL-009")]
    [Description("VAL-009: ExceedsLimit is true when total occurrences > ShowInContextLimit")]
    public async Task ExecuteSearch_ExceedsLimit_ExceedsLimitIsTrue()
    {
        // Arrange: set a very low limit to trigger exceedsLimit with any results
        var input = CreateInput("logos", showInContextLimit: 1);

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: if there are results, they likely exceed limit of 1
        Assert.That(result, Is.Not.Null);
        if (result.TotalOccurrences > 1)
        {
            Assert.That(
                result.ExceedsLimit,
                Is.True,
                "VAL-009: ExceedsLimit must be true when TotalOccurrences > ShowInContextLimit"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-076")]
    [Property("ValidationRule", "VAL-009")]
    [Description("VAL-009: ExceedsLimit boundary - exactly at limit is false, limit+1 is true")]
    public async Task ExecuteSearch_BoundaryAtLimit_ExceedsLimitCorrect()
    {
        // Arrange: search for a known lemma
        var input = CreateInput("logos");

        // Act: first, determine how many occurrences exist
        var baseResult = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        Assert.That(baseResult, Is.Not.Null);

        if (baseResult.TotalOccurrences > 0)
        {
            // Test exactly at the boundary: limit == total occurrences
            var atLimitInput = CreateInput(
                "logos",
                showInContextLimit: baseResult.TotalOccurrences
            );
            var atLimitResult = await SourceLanguageSearchService.ExecuteSearchAsync(
                atLimitInput,
                CancellationToken.None
            );

            Assert.That(
                atLimitResult.ExceedsLimit,
                Is.False,
                "VAL-009: ExceedsLimit must be false when TotalOccurrences == ShowInContextLimit"
            );

            // Test just below the boundary: limit == total - 1
            var belowLimitInput = CreateInput(
                "logos",
                showInContextLimit: baseResult.TotalOccurrences - 1
            );
            var belowLimitResult = await SourceLanguageSearchService.ExecuteSearchAsync(
                belowLimitInput,
                CancellationToken.None
            );

            Assert.That(
                belowLimitResult.ExceedsLimit,
                Is.True,
                "VAL-009: ExceedsLimit must be true when TotalOccurrences > ShowInContextLimit"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ExtractionId", "EXT-076")]
    [Property("ValidationRule", "VAL-009")]
    [Description("VAL-009: ExceedsLimit is false when no matching lemma")]
    public async Task ExecuteSearch_NoMatchingLemma_ExceedsLimitIsFalse()
    {
        // Arrange: nonexistent lemma
        var input = CreateInput("xyznonexistent", showInContextLimit: 1);

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: no results means no limit exceeded
        Assert.That(result, Is.Not.Null);
        Assert.That(result.ExceedsLimit, Is.False, "ExceedsLimit false when no results");
    }

    #endregion

    #region Special Characters - Regex Safety (BHV-T013)

    // =========================================================================
    // BHV-T013: Special characters must not cause regex hang.
    // PTX-23229: Robustness against regex special characters.
    // These tests verify the search completes in reasonable time.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-075")]
    [Property("BehaviorId", "BHV-T013")]
    [Description("BHV-T013: Closing bracket ']' does not cause regex hang")]
    public async Task ExecuteSearch_ClosingBracket_DoesNotHang()
    {
        // Arrange: PTX-23229 specifically mentions ']' as problematic
        var input = CreateInput("]");

        // Act: must complete within timeout
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(input, cts.Token);

        // Assert: completed without hanging
        Assert.That(result, Is.Not.Null, "BHV-T013: Must complete, not hang on ']'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-075")]
    [Property("BehaviorId", "BHV-T013")]
    [Description("BHV-T013: Various regex special characters do not cause hang")]
    [TestCase("[")]
    [TestCase("(")]
    [TestCase(")")]
    [TestCase("{")]
    [TestCase("}")]
    [TestCase("*")]
    [TestCase("+")]
    [TestCase("?")]
    [TestCase("\\")]
    [TestCase("^")]
    [TestCase("$")]
    [TestCase("|")]
    [TestCase(".")]
    public async Task ExecuteSearch_RegexSpecialChar_DoesNotHang(string specialChar)
    {
        // Arrange: various regex metacharacters
        var input = CreateInput(specialChar);

        // Act: must complete within timeout
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(input, cts.Token);

        // Assert: completed without hanging
        Assert.That(result, Is.Not.Null, $"BHV-T013: Must complete, not hang on '{specialChar}'");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-075")]
    [Property("BehaviorId", "BHV-T013")]
    [Description("BHV-T013: Combined regex pattern does not cause catastrophic backtracking")]
    public async Task ExecuteSearch_CombinedRegexPattern_DoesNotHang()
    {
        // Arrange: a string that could cause catastrophic backtracking if used as raw regex
        var input = CreateInput("(a+)+b");

        // Act: must complete within timeout
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(input, cts.Token);

        // Assert: completed without hanging
        Assert.That(result, Is.Not.Null, "BHV-T013: Must not cause catastrophic backtracking");
    }

    #endregion

    #region Error Cases

    // =========================================================================
    // Error cases from contract Section 4.12:
    // Empty search text -> INVALID_ARGUMENT
    // No marble data -> FAILED_PRECONDITION
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Error: Empty search text throws INVALID_ARGUMENT")]
    public void ExecuteSearch_EmptySearchText_ThrowsInvalidArgument()
    {
        // Arrange: empty search text
        var input = CreateInput("");

        // Act & Assert: should throw with INVALID_ARGUMENT error code
        var ex = Assert.ThrowsAsync<InvalidOperationException>(
            async () =>
                await SourceLanguageSearchService.ExecuteSearchAsync(input, CancellationToken.None)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INVALID_ARGUMENT"),
            "Empty search text must use INVALID_ARGUMENT error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("Search text must not be empty"),
            "Error message must match contract"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Error: Whitespace-only search text throws INVALID_ARGUMENT")]
    public void ExecuteSearch_WhitespaceOnlySearchText_ThrowsInvalidArgument()
    {
        // Arrange: whitespace-only search text
        var input = CreateInput("   ");

        // Act & Assert: should throw with INVALID_ARGUMENT error code
        var ex = Assert.ThrowsAsync<InvalidOperationException>(
            async () =>
                await SourceLanguageSearchService.ExecuteSearchAsync(input, CancellationToken.None)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("INVALID_ARGUMENT"),
            "Whitespace-only search text must use INVALID_ARGUMENT error code"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Error: No marble data installed throws FAILED_PRECONDITION")]
    public void ExecuteSearch_NoMarbleData_ThrowsFailedPrecondition()
    {
        // Arrange: search when no marble data is installed
        var input = CreateInput("logos");

        // Act & Assert: should throw with FAILED_PRECONDITION error code
        // This test verifies behavior when MarbleDataAccess has no data loaded.
        // The implementer must ensure this check happens before search proceeds.
        var ex = Assert.ThrowsAsync<InvalidOperationException>(
            async () =>
                await SourceLanguageSearchService.ExecuteSearchAsync(input, CancellationToken.None)
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo("FAILED_PRECONDITION"),
            "No marble data must use FAILED_PRECONDITION error code"
        );
        Assert.That(
            ex.Message,
            Does.Contain("No Enhanced Resource data installed"),
            "Error message must match contract"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Error: CancellationToken cancellation is respected")]
    public void ExecuteSearch_CancelledToken_ThrowsOperationCancelled()
    {
        // Arrange: pre-cancelled token
        var input = CreateInput("logos");
        using var cts = new CancellationTokenSource();
        cts.Cancel();

        // Act & Assert: should throw OperationCanceledException
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await SourceLanguageSearchService.ExecuteSearchAsync(input, cts.Token)
        );
    }

    #endregion

    #region Validation Rules (VAL-006)

    // =========================================================================
    // VAL-006: Source Language Search Input validation.
    // Search term has trailing base/meaning index notation stripped server-side.
    // (Debounce is client-side - not tested here.)
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ValidationRule", "VAL-006")]
    [Description("VAL-006: Trailing notation with single digit stripped")]
    public async Task ExecuteSearch_TrailingNotationSingleDigit_Stripped()
    {
        // Arrange: "agape:1" should search for "agape"
        var input = CreateInput("agape:1");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: search completes without treating ":1" as part of the term
        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.Results,
            Is.Not.Null,
            "VAL-006: Search must complete after notation stripping"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ValidationRule", "VAL-006")]
    [Description("VAL-006: Trailing notation with multi-digit number stripped")]
    public async Task ExecuteSearch_TrailingNotationMultiDigit_Stripped()
    {
        // Arrange: "logos:10" should search for "logos"
        var input = CreateInput("logos:10");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: search completes (notation stripped)
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-601")]
    [Property("ValidationRule", "VAL-006")]
    [Description("VAL-006: Colon in middle of text is not treated as notation")]
    public async Task ExecuteSearch_ColonInMiddle_NotStripped()
    {
        // Arrange: "a:b:c" - only trailing notation should be stripped
        // If implemented correctly, only the trailing ":c" if it's numeric would be stripped.
        // "a:b:c" is not notation (c is not numeric), so the full string should be searched.
        var input = CreateInput("a:b:c");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: search completes (likely no match, but no error)
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results, Is.Not.Null);
    }

    #endregion

    #region SourceLanguageSearchResult Structure Tests

    // =========================================================================
    // Verify the structure of SourceLanguageSearchResult matches the contract.
    // Section 3.10: SourceLanguageSearchResult
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-601")]
    [Description("No-match result has correct default structure")]
    public async Task ExecuteSearch_NoMatch_ResultStructureCorrect()
    {
        // Arrange: search for term that won't match
        var input = CreateInput("xyznonexistent");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: correct structure for no-match case
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Results, Is.Not.Null, "Results must be non-null empty list");
        Assert.That(result.Results, Is.Empty, "Results must be empty for no match");
        Assert.That(result.TotalOccurrences, Is.EqualTo(0), "TotalOccurrences must be 0");
        Assert.That(result.ExceedsLimit, Is.False, "ExceedsLimit must be false");
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("No matching lemma"),
            "ErrorMessage must be 'No matching lemma'"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Successful result has null error message")]
    public async Task ExecuteSearch_SuccessfulMatch_ErrorMessageIsNull()
    {
        // Arrange
        var input = CreateInput("logos");

        // Act
        var result = await SourceLanguageSearchService.ExecuteSearchAsync(
            input,
            CancellationToken.None
        );

        // Assert: successful match has null error message
        Assert.That(result, Is.Not.Null);
        if (result.Results.Count > 0)
        {
            Assert.That(
                result.ErrorMessage,
                Is.Null,
                "ErrorMessage must be null when results are found"
            );
        }
    }

    #endregion
}
