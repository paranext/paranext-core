namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Request to compare books between two projects.
///
/// === NEW IN PT10 ===
/// Reason: PAPI command pattern - public API wrapper for book comparison
/// Maps to: CAP-007
///
/// Used by the copy books dialog to get comparison information before copying.
/// </summary>
/// <param name="SourceProjectId">Source project ID (GUID string).</param>
/// <param name="DestProjectId">Destination project ID (GUID string).</param>
public record BookComparisonRequest(string SourceProjectId, string DestProjectId);
