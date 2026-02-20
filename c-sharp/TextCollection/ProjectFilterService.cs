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
    /// Priority chain of type checks using ParatextData properties.
    /// Source: EXT-013 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:717-730)
    /// </summary>
    /// <param name="projectId">Project GUID (HexId string).</param>
    /// <returns>User-visible type category string.</returns>
    public static string GetProjectType(string projectId)
    {
        ScrText scrText = ScrTextCollection.GetById(HexId.FromStr(projectId));

        if (scrText.IsDictionary || (scrText.IsXmlResourceDictionary && scrText.IsResourceProject))
            return "Dictionary";

        if (scrText.IsSourceLanguageText)
            return "Source Language Text";

        if (scrText.IsResourceProject)
            return scrText.Settings.TranslationInfo.Type.LocalizedString(scrText);

        return $"Project ({scrText.Settings.TranslationInfo.Type.LocalizedString(scrText)})";
    }

    /// <summary>
    /// Determines if a project should be shown based on active filter buttons,
    /// search text, and TC-mode exclusions.
    /// In TC mode, Enhanced Resources, Source Language Texts, Dictionaries,
    /// and Consultant Notes are always hidden (VAL-010).
    /// Source: EXT-012 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:769-791)
    /// </summary>
    /// <param name="projectId">Project GUID (HexId string).</param>
    /// <param name="buttons">Filter button toggle states.</param>
    /// <param name="searchText">Text to search for in project name (case-insensitive). Empty means no filter.</param>
    /// <param name="isTcMode">Whether the dialog is in Text Collection mode.</param>
    /// <returns>True if the project should be shown.</returns>
    public static bool MatchesFilter(
        string projectId,
        FilterButtonStates buttons,
        string searchText,
        bool isTcMode
    )
    {
        // === STUB: CAP-011 MatchesFilter ===
        // Source: PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:769-791
        // Maps to: EXT-012, VAL-010, BHV-T006
        throw new NotImplementedException("CAP-011 MatchesFilter not yet implemented");
    }
}
