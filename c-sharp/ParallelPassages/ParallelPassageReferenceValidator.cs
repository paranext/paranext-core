using Paratext.Data;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Result of a reference validation operation.
/// </summary>
public record ReferenceValidationResult
{
    public bool HasError { get; init; }
    public string? ErrorMessage { get; init; }
}

/// <summary>
/// Thin wrapper around ParallelPassageReferenceScanner and CrossReferencesManager
/// from ParatextData/ParatextChecks. Stub for TDD RED phase.
/// </summary>
public class ParallelPassageReferenceValidator
{
    private readonly ScrText _scrText;

    public ParallelPassageReferenceValidator(ScrText scrText)
    {
        _scrText = scrText;
    }

    /// <summary>
    /// Validates a parallel passage reference string.
    /// Delegates to ParallelPassageReferenceScanner.ValidateRef().
    /// </summary>
    public ReferenceValidationResult ValidateRef(string parallelRef, string marker, bool inSidebar)
    {
        throw new NotImplementedException("CAP-018: Implementation pending");
    }

    /// <summary>
    /// Parses a reference string into a list of verse reference strings.
    /// Delegates to ParallelPassageReferenceScanner.GetScrRefListFromRef().
    /// </summary>
    public List<string> GetScrRefListFromRef(string xref)
    {
        throw new NotImplementedException("CAP-018: Implementation pending");
    }

    /// <summary>
    /// Checks if a USFM marker is one that can contain parallel passage references.
    /// </summary>
    public static bool IsMarkerScannerCaresAbout(string marker)
    {
        throw new NotImplementedException("CAP-018: Implementation pending");
    }

    /// <summary>
    /// Parses a project's USFM content for parallel passage references in a given book.
    /// Delegates to CrossReferencesManager.ParseProjectParallelRefs().
    /// </summary>
    public void ParseProjectParallelRefs(int bookNum, Action<string, string> onReferenceFound)
    {
        throw new NotImplementedException("CAP-018: Implementation pending");
    }

    /// <summary>
    /// Sets the parenthesis convention for a marker type (for testing).
    /// </summary>
    public void SetParenthesisConvention(string marker, bool useParentheses)
    {
        throw new NotImplementedException("CAP-018: Implementation pending");
    }

    /// <summary>
    /// Gets the parenthesis preference for a marker given counts.
    /// Returns null if tie (no preference established).
    /// </summary>
    public bool? GetParenthesisPreference(string marker, int withCount, int withoutCount)
    {
        throw new NotImplementedException("CAP-018: Implementation pending");
    }
}
