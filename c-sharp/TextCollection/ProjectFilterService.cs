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
        ScrText scrText = ScrTextCollection.GetById(HexId.FromStr(projectId));

        if (!MatchesProjectType(scrText, buttons, isTcMode))
            return false;

        if (string.IsNullOrEmpty(searchText))
            return true;

        return MatchesSearchText(scrText, searchText);
    }

    /// <summary>
    /// Checks whether a project matches any active filter button category.
    /// In TC mode, EnhancedResources, SourceLanguages, Dictionaries, and
    /// ConsultantNotes buttons are effectively disabled (VAL-010).
    /// </summary>
    private static bool MatchesProjectType(
        ScrText scrText,
        FilterButtonStates buttons,
        bool isTcMode
    )
    {
        bool enhancedResources = !isTcMode && buttons.EnhancedResources;
        bool sourceLanguages = !isTcMode && buttons.SourceLanguages;
        bool dictionaries = !isTcMode && buttons.Dictionaries;
        bool consultantNotes = !isTcMode && buttons.ConsultantNotes;

        bool isNoteType = scrText.Settings.TranslationInfo.Type.IsNoteType();

        // Projects: not resource AND not note type
        if (buttons.Projects && !scrText.IsResourceProject && !isNoteType)
            return true;

        // Resources: resource AND not marble AND not dictionary AND not note AND not xml dictionary
        if (
            buttons.Resources
            && scrText.IsResourceProject
            && !scrText.IsMarbleResource
            && !scrText.IsDictionary
            && !isNoteType
            && !scrText.IsXmlResourceDictionary
        )
            return true;

        // Enhanced Resources: marble
        if (enhancedResources && scrText.IsMarbleResource)
            return true;

        // Source Languages: resource AND not marble AND not dictionary AND source language
        if (
            sourceLanguages
            && scrText.IsResourceProject
            && !scrText.IsMarbleResource
            && !scrText.IsDictionary
            && scrText.IsSourceLanguageText
        )
            return true;

        // Dictionaries: resource AND (dictionary OR xml dictionary)
        if (
            dictionaries
            && scrText.IsResourceProject
            && (scrText.IsDictionary || scrText.IsXmlResourceDictionary)
        )
            return true;

        // Consultant Notes: note type
        if (consultantNotes && isNoteType)
            return true;

        return false;
    }

    /// <summary>
    /// Checks whether the search text matches the project name, full name,
    /// or language name (case-insensitive substring match).
    /// </summary>
    private static bool MatchesSearchText(ScrText scrText, string searchText)
    {
        return scrText.Name.Contains(searchText, StringComparison.OrdinalIgnoreCase)
            || scrText.Settings.FullName.Contains(searchText, StringComparison.OrdinalIgnoreCase)
            || scrText.Settings.LanguageName.Contains(
                searchText,
                StringComparison.OrdinalIgnoreCase
            );
    }
}
