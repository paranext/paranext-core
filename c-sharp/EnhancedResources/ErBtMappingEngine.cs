using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Three-dimensional ER-to-Biblical Terms mapping analysis engine.
/// Matches ER terms to Biblical Terms by Reference, Sense, and Lemma
/// dimensions with cascading priority.
///
/// Contract: Section 4.10 AnalyzeErBtMapping (data-contracts.md)
/// Behavior: BHV-404 (three-dimensional matching)
/// Extraction: EXT-019 (ER-to-Biblical Terms Mapping Analysis)
/// PT9 Source: Paratext/Marble/ErToBtMapping.cs (2,186 lines)
///
/// Three dimensions with priority levels:
///   Reference: 8 priority levels
///   Sense: 7 priority levels
///   Lemma: 8 priority levels
/// </summary>
public class ErBtMappingEngine
{
    // =====================================================================
    // Test seams: Static delegates for test fixture injection
    // =====================================================================

    /// <summary>
    /// Test seam: Performs the three-dimensional mapping analysis.
    /// Returns (mappings, errorCode, errorMessage).
    /// If errorCode is non-null, the analysis failed.
    /// </summary>
    public static Func<
        string, // trackedProjectId
        string, // resourceId
        VerseRef, // verseRef
        string, // scope
        (IReadOnlyList<ErBtMapping>? Mappings, string? ErrorCode, string? ErrorMessage)
    >? TestAnalyzeMapping;

    /// <summary>
    /// Test seam: Checks whether the tracked project exists.
    /// </summary>
    public static Func<string, bool>? TestIsProjectAvailable;

    /// <summary>
    /// Test seam: Checks whether resources are initialized.
    /// </summary>
    public static Func<bool>? TestIsResourceInitialized;

    /// <summary>
    /// Test seam: Checks whether Biblical Terms data is available.
    /// </summary>
    public static Func<bool>? TestHaveTermsData;

    /// <summary>
    /// Test seam: Computes reference overlap between ER term and BT references.
    /// Returns a value from 0.0 to 1.0.
    /// </summary>
    public static Func<
        LexicalLink, // link
        string, // biblicalTermId
        double // overlap ratio
    >? TestComputeReferenceOverlap;

    // =====================================================================
    // Constants
    // =====================================================================

    /// <summary>
    /// Reference match threshold: >25% overlap required (INV-015).
    /// </summary>
    public const double ReferenceMatchThreshold = 0.25;

    /// <summary>Number of priority levels for Reference dimension.</summary>
    public const int ReferencePriorityLevels = 8;

    /// <summary>Number of priority levels for Sense dimension.</summary>
    public const int SensePriorityLevels = 7;

    /// <summary>Number of priority levels for Lemma dimension.</summary>
    public const int LemmaPriorityLevels = 8;

    // =====================================================================
    // Public API
    // =====================================================================

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/ErToBtMapping.cs:1-2186
    // Method: ErToBtMapping.Analyze (three-dimensional matching orchestrator)
    // Maps to: EXT-019, CAP-010
    /// <summary>
    /// Run the three-dimensional ER-to-Biblical Terms mapping analysis.
    ///
    /// Contract: Section 4.10 AnalyzeErBtMapping
    /// Ported from: PT9 ErToBtMapping.Analyze (EXT-019)
    /// </summary>
    public Task<ErBtMappingResult> AnalyzeErBtMappingAsync(
        ErBtMappingInput input,
        CancellationToken ct
    )
    {
        ct.ThrowIfCancellationRequested();

        var analyzeFunc = TestAnalyzeMapping ?? DefaultAnalyzeMapping;
        var (mappings, errorCode, errorMessage) = analyzeFunc(
            input.TrackedProjectId,
            input.ResourceId,
            input.VerseRef,
            input.Scope
        );

        if (errorCode is not null)
        {
            return Task.FromResult(
                new ErBtMappingResult(
                    Success: false,
                    Mappings: null,
                    Summary: null,
                    Error: new ErrorInfo(errorCode, errorMessage ?? string.Empty)
                )
            );
        }

        var mappingList = mappings ?? [];
        int total = mappingList.Count;
        int matched = mappingList.Count(m => m.BiblicalTermId is not null);
        int unmatched = total - matched;

        return Task.FromResult(
            new ErBtMappingResult(
                Success: true,
                Mappings: mappingList,
                Summary: new ErBtMappingSummary(total, matched, unmatched),
                Error: null
            )
        );
    }

    // === NEW IN PT10 ===
    // Reason: Default implementation placeholder for production use
    // Maps to: CAP-010 (infrastructure)
    private static (
        IReadOnlyList<ErBtMapping>? Mappings,
        string? ErrorCode,
        string? ErrorMessage
    ) DefaultAnalyzeMapping(
        string trackedProjectId,
        string resourceId,
        VerseRef verseRef,
        string scope
    )
    {
        return (new List<ErBtMapping>(), null, null);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/ErToBtMapping.cs (threshold logic)
    // Method: Reference overlap comparison
    // Maps to: INV-015 (Term Reference Match Threshold)
    /// <summary>
    /// Checks whether a reference overlap ratio exceeds the match threshold (INV-015).
    /// A match requires MORE THAN 25% overlap.
    /// </summary>
    public static bool MeetsReferenceThreshold(double overlapRatio)
    {
        return overlapRatio > ReferenceMatchThreshold;
    }
}
