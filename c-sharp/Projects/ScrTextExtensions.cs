using System.Diagnostics.CodeAnalysis;
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
                // The six display fields below match what the platform.* setting getters in
                // ParatextProjectDataProvider.GetProjectSetting return - see the parity remarks
                // on ProjectMetadata.
                name: scrText.Name,
                fullName: scrText.GetRawParatextSetting(ProjectSettingsNames.PT_FULL_NAME),
                language: scrText.GetRawParatextSetting(ProjectSettingsNames.PT_LANGUAGE),
                languageTag: GetLanguageTag(scrText),
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
    /// for non-special-cased settings (e.g. FullName/Language fall through to that generic branch;
    /// see ParatextProjectDataProvider.cs ~1686-1707), so a present value (even empty) matches what
    /// the corresponding <c>pdp.getSetting</c> call returns today. Read the dictionary directly
    /// (NOT <c>ProjectSettings.GetSetting</c>, which adds base-text delegation the PDP path does
    /// not do, and NOT typed accessors, which can construct expensive per-project objects) so this
    /// stays a cheap, exception-free, parity-faithful lookup.
    ///
    /// When the setting is absent, returns <paramref name="fallback"/> (default null). Callers
    /// pass the setting's contribution default when it is faithfully reproducible (e.g.
    /// <c>ProjectSummary</c>'s Versification "4"), or leave null when it is not: for
    /// FullName/Language that default is a localized placeholder string (e.g.
    /// "%project_full_name_missing%", resolved via the extension host's live localization state -
    /// current UI locale plus loaded translation bundle - in
    /// project-settings.service-host.ts's getDefault/isLocalizeKey), which is not available at
    /// project enumeration time and would risk returning a value that differs from what the PDP
    /// would actually return. ProjectMetadata's display fields are nullable specifically so callers
    /// can fall back appropriately in this case.
    /// </summary>
    [return: NotNullIfNotNull(nameof(fallback))]
    internal static string? GetRawParatextSetting(
        this ScrText scrText,
        string ptSettingName,
        string? fallback = null
    ) =>
        scrText.Settings.ParametersDictionary.TryGetValue(ptSettingName, out string? value)
            ? value
            : fallback;

    /// <summary>
    /// The BCP 47 language tag for the project's writing system - same value as the
    /// platform.languageTag getter (ParatextProjectDataProvider.cs ~1591-1594), which reads
    /// <c>scrText.Language.LanguageId.Id</c>. Do NOT read <c>scrText.Language</c> here: forcing it
    /// constructs <c>ScrLanguage</c>, whose constructor opens and XML-parses the project's LDML
    /// file (zip-decompressed for resources), and whose failure path mutates and saves settings -
    /// unacceptable I/O during read-only project enumeration. <c>ScrLanguage.LanguageId</c>
    /// short-circuits to <c>Settings.LanguageID</c> anyway; the only behavior the
    /// <c>scrText.Language</c> path adds is coercing a null/empty LanguageID to English
    /// (ScrText.CreateLayoutEngine), replicated here so the value still matches the getter.
    /// </summary>
    private static string GetLanguageTag(ScrText scrText)
    {
        var languageId = scrText.Settings.LanguageID;
        return languageId == null || languageId.Code == "" ? "en" : languageId.Id;
    }

    /// <summary>
    /// Follows the platform.isEditable getter's logic
    /// (ParatextProjectDataProvider.cs ~1603-1606 and ~1686-1707): resource projects are always
    /// non-editable regardless of their stored Editable setting; otherwise the raw Editable
    /// Paratext setting is parsed as T/F, falling back to that setting's registered contribution
    /// default (true - a static boolean, not a localized string, so unlike FullName/Language this
    /// default IS faithfully reproducible without live extension-host state; see
    /// core-project-settings-info.data.ts's 'platform.isEditable': { default: true }) when the
    /// setting is entirely absent from Settings.xml.
    ///
    /// The one deliberate divergence: a present-but-malformed Editable value makes the getter
    /// throw, which enumeration must not do (it would drop the project from the whole result).
    /// Report false instead - matching ParatextData's own <c>IsEditableText</c>
    /// (<c>GetSetting == "T"</c>) and the old picker behavior, whose per-project catch excluded
    /// such projects from the editable lists when the getter threw.
    /// </summary>
    private static bool GetIsEditable(ScrText scrText)
    {
        if (scrText.IsResourceProject)
            return false;

        string? rawValue = scrText.GetRawParatextSetting(ProjectSettingsNames.PT_IS_EDITABLE);
        if (rawValue == null)
            return true;

        return ProjectSettingsNames.TryParseParatextBoolean(rawValue, out bool isEditable)
            && isEditable;
    }
}
