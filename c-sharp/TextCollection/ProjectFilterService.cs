// === EXTRACTION: EXT-013 ProjectFilterService.GetProjectType ===
// Source: PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:717-730
// Complexity: Simple

using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Stateless service for project filtering and type categorization.
/// Contains: GetProjectType (CAP-012), MatchesFilter (CAP-011).
/// </summary>
internal static class ProjectFilterService
{
    /// <summary>
    /// Returns user-visible type string: "Dictionary", "Source Language Text",
    /// resource type, or "Project ({type})".
    /// SIMPLE: Priority chain of type checks using ParatextData properties.
    /// Source: EXT-013 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:717-730)
    /// </summary>
    /// <param name="projectId">Project GUID (HexId string).</param>
    /// <returns>User-visible type category string.</returns>
    public static string GetProjectType(string projectId)
    {
        // TDD stub: throws NotImplementedException to ensure RED state.
        // The implementer will fill in the priority chain:
        //   if (IsDictionary) return "Dictionary";
        //   if (IsSourceLanguageText) return "Source Language Text";
        //   if (IsResourceProject) return resource type string;
        //   else return "Project ({type})";
        throw new NotImplementedException("CAP-012: GetProjectType not yet implemented");
    }
}
