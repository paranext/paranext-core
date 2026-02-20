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
}
