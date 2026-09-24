using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Languages;

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
                // IsResourceProject, matching the platform.isPublished getter in
                // ParatextProjectDataProvider.
                isPublished: scrText.IsResourceProject
            ),
            scrText.Directory
        );
    }

    /// <summary>
    /// Reads a raw Paratext project setting value straight from the settings parameter dictionary -
    /// exactly the source (and behavior) <c>ParatextProjectDataProvider.GetProjectSetting</c> uses
    /// for non-special-cased settings (e.g. FullName/Language fall through to that generic branch),
    /// so a present value (even empty) matches what the corresponding <c>pdp.getSetting</c> call
    /// returns today. Read the dictionary directly
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
    /// The BCP 47 language tag for the project's writing system. The platform.languageTag getter
    /// reads <c>scrText.Language.LanguageId.Id</c> - the tag resolved from the project's LDML writing
    /// system - whereas this derives it from the stored <c>LanguageIsoCode</c> setting, avoiding the
    /// getter's side effects. The two agree when the LDML writing system matches the stored code, but
    /// diverge whenever the LDML tag is more specific or normalized than the raw stored code (see
    /// divergence 3).
    ///
    /// Do NOT read <c>scrText.Language</c>: forcing it constructs <c>ScrLanguage</c>, whose
    /// constructor opens and XML-parses the project's LDML file (zip-decompressed for resources),
    /// unacceptable I/O during read-only enumeration.
    ///
    /// We also avoid the <c>Settings.LanguageID</c> getter, which is NOT side-effect-free: for
    /// legacy/migrated projects whose stored <c>LanguageIsoCode</c> is absent/empty/":::" it
    /// resolves the language <em>name</em> via <c>LanguageIdHelper.FromCommonLanguageName</c> (the
    /// expensive one-time SIL <c>LanguageLookup</c> construction) AND persists the result back with
    /// <c>SetSetting</c>, mutating settings mid-enumeration (a later unrelated Save would then write
    /// it). Instead we read the raw <c>LanguageIsoCode</c> directly and reproduce the getter's
    /// resolution WITHOUT the persist. For the common case (a present, non-":::" code) this is a
    /// cheap string read; only legacy projects still incur the <c>FromCommonLanguageName</c> lookup
    /// - accepted here to keep the value correct (matching the getter) rather than diverge for speed.
    ///
    /// Divergences from the getter's final value:
    /// <list type="number">
    ///   <item>No LDML is loaded, so an unloadable/corrupt LDML file does not trigger
    ///     <c>ScrText.CreateLayoutEngine</c>'s catch, which would coerce a project with an otherwise
    ///     valid LanguageID to English (and, if writable, save an English LDML). Enumeration reports
    ///     the stored/resolved tag; the PDP's <c>platform.languageTag</c> would report "en".
    ///     (Preferable during enumeration.)</item>
    ///   <item>A null/empty resolved id is coerced to "en" here (matching
    ///     <c>CreateLayoutEngine</c>'s null/empty-code coercion) without persisting the change.
    ///     (Preferable during enumeration.)</item>
    ///   <item>Because the getter reads the LDML writing system while this reads the stored
    ///     <c>LanguageIsoCode</c>, the two can differ for a perfectly valid project whenever the LDML
    ///     tag is more specific or normalized than the stored code (e.g. LDML "en-US" vs. stored
    ///     "en"): the picker/Home would then show a different language than <c>pdp.getSetting</c>.
    ///     This is the general form of the "Settings.xml/LDML inconsistent" edge case; it is accepted
    ///     as the cost of not loading LDML per project during enumeration.</item>
    /// </list>
    /// </summary>
    private static string GetLanguageTag(ScrText scrText)
    {
        string? isoCode = scrText.GetRawParatextSetting(ProjectSettingsNames.PT_LANGUAGE_ISO_CODE);
        // Mirror ProjectSettings.LanguageID: a present, non-":::" code is used directly; otherwise
        // resolve from the language name (without the getter's SetSetting persist).
        LanguageId? languageId =
            !string.IsNullOrEmpty(isoCode) && isoCode != ":::"
                ? new LanguageId(isoCode)
                : LanguageIdHelper.FromCommonLanguageName(
                    scrText.GetRawParatextSetting(ProjectSettingsNames.PT_LANGUAGE, "")
                );
        // Match ScrText.CreateLayoutEngine's null/empty-code -> English coercion.
        return languageId == null || languageId.Code == "" ? "en" : languageId.Id;
    }

    /// <summary>
    /// Follows the platform.isEditable getter's logic: resource projects are always
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
    /// (<c>GetSetting == "T"</c>), which treats any value that is not exactly "T" as non-editable,
    /// so a malformed Editable setting excludes the project from the editable lists rather than
    /// dropping it entirely.
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
