using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Service for building matched pairs inventory from scripture text.
/// Orchestrates the 4-way branching logic (Regular/SBA x Separated/NonSeparated)
/// via the existing InventoryWorker, and serializes results into InventoryBuildResult.
///
/// Maps to: M-002 BuildInventory, EXT-001
/// </summary>
internal static class InventoryBuildService
{
    /// <summary>
    /// Builds the matched pairs inventory for the specified project.
    /// </summary>
    /// <param name="projectId">Project identifier</param>
    /// <param name="isSba">Whether project is Study Bible Additions</param>
    /// <param name="isSeparated">Whether verse/non-verse separation is enabled</param>
    /// <param name="paratextProjects">Project lookup service</param>
    /// <returns>InventoryBuildResult with populated inventory items</returns>
    public static InventoryBuildResult BuildInventory(
        string projectId,
        bool isSba,
        bool isSeparated,
        LocalParatextProjects paratextProjects
    )
    {
        throw new NotImplementedException(
            "CAP-002: InventoryBuildService.BuildInventory not yet implemented"
        );
    }
}
