using Paranext.DataProvider.Services;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

internal static class ScrTextExtensions
{
    internal static ProjectDetails GetProjectDetails(this ScrText scrText)
    {
        return new(
            scrText.Name,
            new(
                scrText.Guid.ToString().ToUpperInvariant(),
                LocalParatextProjects.GetParatextProjectInterfaces(
                    isPublished: scrText.IsResourceProject
                ),
                // The six display fields below are sourced from the exact same expressions the
                // platform.* setting getters in ParatextProjectDataProvider.GetProjectSetting use,
                // so a populated value here matches what pdp.getSetting('platform.*') returns today.
                name: scrText.Name,
                fullName: GetRawParatextSetting(scrText, ProjectSettingsNames.PT_FULL_NAME),
                language: GetRawParatextSetting(scrText, ProjectSettingsNames.PT_LANGUAGE),
                // The Id property of LanguageId is the BCP 47 language tag for the writing system
                // of this project - same source as the platform.languageTag getter
                // (ParatextProjectDataProvider.cs ~1591-1594).
                languageTag: scrText.Language.LanguageId.Id,
                isEditable: GetIsEditable(scrText),
                // platform.isPublished has no Settings.xml key; it's computed directly from
                // IsResourceProject (ParatextProjectDataProvider.cs ~1608-1612).
                isPublished: scrText.IsResourceProject
            ),
            scrText.Directory
        );
    }

    /// <summary>
    /// Reads a raw Paratext project setting value straight from the settings parameter dictionary -
    /// exactly the source (and behavior) <c>ParatextProjectDataProvider.GetProjectSetting</c> uses
    /// for non-special-cased settings (FullName/Language fall through to that generic branch; see
    /// ParatextProjectDataProvider.cs ~1686-1707), so a present value matches what the corresponding
    /// <c>pdp.getSetting</c> call returns today. Read the dictionary directly (NOT
    /// <c>ProjectSettings.GetSetting</c>, which adds base-text delegation the PDP path does not do)
    /// - same reasoning as <c>ProjectSummary.GetRawSetting</c> (c-sharp/ManageBooks/ProjectSummary.cs),
    /// which established this exact pattern for the same fidelity reason.
    ///
    /// Returns null when the setting is absent, rather than guessing at the PDP's contribution
    /// default: for FullName/Language that default is a localized placeholder string (e.g.
    /// "%project_full_name_missing%", resolved via the extension host's live localization state -
    /// current UI locale plus loaded translation bundle - in
    /// project-settings.service-host.ts's getDefault/isLocalizeKey), which is not available at
    /// project enumeration time and would risk returning a value that differs from what the PDP
    /// would actually return. ProjectMetadata's display fields are nullable specifically so callers
    /// can fall back appropriately in this case.
    /// </summary>
    private static string? GetRawParatextSetting(ScrText scrText, string ptSettingName) =>
        scrText.Settings.ParametersDictionary.TryGetValue(ptSettingName, out string? value)
            ? value
            : null;

    /// <summary>
    /// Replicates the platform.isEditable getter's exact logic
    /// (ParatextProjectDataProvider.cs ~1603-1606 and ~1686-1707): resource projects are always
    /// non-editable regardless of their stored Editable setting; otherwise the raw Editable
    /// Paratext setting is parsed as T/F, falling back to that setting's registered contribution
    /// default (true - a static boolean, not a localized string, so unlike FullName/Language this
    /// default IS faithfully reproducible without live extension-host state; see
    /// core-project-settings-info.data.ts's 'platform.isEditable': { default: true }) when the
    /// setting is entirely absent from Settings.xml.
    /// </summary>
    private static bool GetIsEditable(ScrText scrText)
    {
        if (scrText.IsResourceProject)
            return false;

        if (
            scrText.Settings.ParametersDictionary.TryGetValue(
                ProjectSettingsNames.PT_IS_EDITABLE,
                out string? rawValue
            )
        )
        {
            return rawValue.ToUpperInvariant() switch
            {
                "F" or "FALSE" => false,
                "T" or "TRUE" => true,
                // Malformed Editable value: fail open to the registered default rather than
                // throwing and dropping this project out of the whole enumeration result.
                _ => true,
            };
        }

        return true;
    }
}
