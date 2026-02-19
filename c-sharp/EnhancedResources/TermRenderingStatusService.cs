// PT9 Provenance: Paratext/Marble/DictionaryTab.cs:1378-1419 (CombineTermStatusCodes)
// Extraction: EXT-051
// Also contains: EXT-001 (CalculateRenderingStatus) -- to be added by CAP-007

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for rendering status calculation and combination.
/// Contains CombineTermStatusCodes (EXT-051, CAP-008) and
/// CalculateRenderingStatus (EXT-001, CAP-007).
/// </summary>
internal static class TermRenderingStatusService
{
    /// <summary>
    /// Merges a new per-verse status code into the display item's overall FoundStatus.
    /// INV-015: State machine with global override codes and priority rules.
    /// Global override codes (NotTermInProject, NoDictionaryEntry, NoRenderingsEntered,
    /// NoTrackedProject) always replace current status.
    /// </summary>
    /// <param name="currentStatus">The current combined status of the display item.</param>
    /// <param name="newStatus">The new per-verse status to merge in.</param>
    /// <returns>The combined status code after applying state machine rules.</returns>
    public static TermRenderingStatusCode CombineTermStatusCodes(
        TermRenderingStatusCode currentStatus,
        TermRenderingStatusCode newStatus
    )
    {
        throw new NotImplementedException();
    }
}
