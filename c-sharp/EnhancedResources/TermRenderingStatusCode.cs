namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// The 12 possible rendering status codes for a Biblical Terms link
/// against a tracked project.
///
/// Contract: Section 3.7 TermRenderingStatusResult (data-contracts.md)
/// Behavior: BHV-404 (Highlight Button Toggle State Machine)
/// Extraction: EXT-023 (Term Rendering Status Determination)
/// </summary>
public enum TermRenderingStatusCode
{
    NoTrackedProject,
    Found,
    Missing,
    TermNotInProject,
    FoundInVerse,
    MissingInVerse,
    FoundElsewhere,
    MissingElsewhere,
    Denied,
    GuessFound,
    GuessMissing,
    Unknown,
}
