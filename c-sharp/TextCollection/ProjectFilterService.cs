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
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:769-791
    // Method: SelectScrTextsForm.MatchesFilter()
    // Maps to: EXT-012, VAL-010, BHV-T006
    public static bool MatchesFilter(
        string projectId,
        FilterButtonStates buttons,
        string searchText,
        bool isTcMode
    )
    {
        ScrText scrText = ScrTextCollection.GetById(HexId.FromStr(projectId));

        // In TC mode, EnhancedResources, SourceLanguages, Dictionaries, and
        // ConsultantNotes buttons are effectively disabled (VAL-010).
        // PT9 hid these buttons in the UI; PT10 enforces via isTcMode parameter.
        bool enhancedResources = !isTcMode && buttons.EnhancedResources;
        bool sourceLanguages = !isTcMode && buttons.SourceLanguages;
        bool dictionaries = !isTcMode && buttons.Dictionaries;
        bool consultantNotes = !isTcMode && buttons.ConsultantNotes;

        // Step 1: Check if the project matches any active button category
        bool selectedProjectType = false;

        // Projects: not resource AND not note type
        selectedProjectType |=
            buttons.Projects
            && !scrText.IsResourceProject
            && !scrText.Settings.TranslationInfo.Type.IsNoteType();

        // Resources: resource AND not marble AND not dictionary AND not note AND not xml dictionary
        selectedProjectType |=
            buttons.Resources
            && scrText.IsResourceProject
            && !scrText.IsMarbleResource
            && !scrText.IsDictionary
            && !scrText.Settings.TranslationInfo.Type.IsNoteType()
            && !scrText.IsXmlResourceDictionary;

        // Enhanced Resources: marble
        selectedProjectType |= enhancedResources && scrText.IsMarbleResource;

        // Source Languages: resource AND not marble AND not dictionary AND source language
        selectedProjectType |=
            sourceLanguages
            && scrText.IsResourceProject
            && !scrText.IsMarbleResource
            && !scrText.IsDictionary
            && scrText.IsSourceLanguageText;

        // Dictionaries: resource AND (dictionary OR xml dictionary)
        selectedProjectType |=
            dictionaries
            && scrText.IsResourceProject
            && (scrText.IsDictionary || scrText.IsXmlResourceDictionary);

        // Consultant Notes: note type
        selectedProjectType |=
            consultantNotes && scrText.Settings.TranslationInfo.Type.IsNoteType();

        if (!selectedProjectType)
            return false;

        // Step 2: If no search text, the type match is sufficient
        if (string.IsNullOrEmpty(searchText))
            return true;

        // Step 3: Check search text against Name, FullName, and LanguageName (case-insensitive)
        return scrText.Name.IndexOf(searchText, StringComparison.OrdinalIgnoreCase) >= 0
            || scrText.Settings.FullName.IndexOf(searchText, StringComparison.OrdinalIgnoreCase)
                >= 0
            || scrText.Settings.LanguageName.IndexOf(searchText, StringComparison.OrdinalIgnoreCase)
                >= 0;
    }
}
