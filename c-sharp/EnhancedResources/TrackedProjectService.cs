using Paratext.Data;
using Paratext.Data.Terms;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Change type classifications for tracked project notifications.
/// PT9 Source: MarbleForm.cs:971-1017 (three change types in ChangeListener)
/// Contract: extraction-plan.md EXT-012
/// </summary>
public enum TrackedProjectChangeType
{
    /// <summary>Rendering data changed in the tracked project.</summary>
    Rendering,

    /// <summary>Scripture text changed in the tracked project.</summary>
    Text,

    /// <summary>Biblical Terms list changed in the tracked project.</summary>
    BiblicalTermsList,
}

/// <summary>
/// Manages the tracked project lifecycle for BT (Biblical Terms) integration
/// in Enhanced Resources. Handles auto-selection logic, BT state initialization,
/// and change notification classification.
///
/// PT9 Source: Paratext/Marble/MarbleForm.cs:1897-1926, 2338-2362, 971-1017
/// Contract: extraction-plan.md EXT-004, EXT-005, EXT-012
/// </summary>
internal static class TrackedProjectService
{
    /// <summary>
    /// Auto-selects the best tracked project from available projects.
    /// Prefers stored FollowedProject, falls back to first open non-resource project.
    /// </summary>
    /// <param name="storedFollowedProject">
    /// Name of the previously stored tracked project (from persisted state). May be null.
    /// </param>
    /// <param name="openProjects">
    /// Currently open non-resource projects available for tracking.
    /// </param>
    /// <returns>The best ScrText to track, or null if no suitable project found.</returns>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/MarbleForm.cs:1897-1926
    /// Method: MarbleForm.SelectTrackedProject()
    /// Maps to: EXT-004, BHV-305
    /// </remarks>
    public static ScrText? SelectTrackedProject(
        string? storedFollowedProject,
        IEnumerable<ScrText> openProjects
    ) => throw new NotImplementedException();

    /// <summary>
    /// Initializes BT data (TermsList, TermRenderings, Analyzer) for the tracked project.
    /// When project is null, returns BtState with all fields null (clears BT state).
    /// </summary>
    /// <param name="trackedProject">The project to track, or null to clear.</param>
    /// <returns>BtState with initialized or cleared BT objects.</returns>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/MarbleForm.cs:2338-2362
    /// Method: MarbleForm.SetTrackedProject()
    /// Maps to: EXT-005
    /// </remarks>
    public static BtState SetTrackedProject(ScrText? trackedProject) =>
        throw new NotImplementedException();

    /// <summary>
    /// Classifies a change notification into a tracked project change type.
    /// Used by the change listener (EXT-012) to determine which panes need refreshing.
    /// </summary>
    /// <param name="changeType">The type of change detected.</param>
    /// <returns>The classified change type.</returns>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/MarbleForm.cs:971-1017
    /// Method: MarbleForm.ChangeListener()
    /// Maps to: EXT-012
    /// </remarks>
    public static TrackedProjectChangeType ClassifyChange(TrackedProjectChangeType changeType) =>
        throw new NotImplementedException();
}
