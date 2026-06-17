using System.IO;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Reads a batch of <c>platform.*</c> project settings directly from an in-memory
/// <see cref="ScrText"/> with NO network round-trips. Used to fill the opt-in
/// <see cref="ProjectMetadata.SettingsSnapshot"/> during a single <c>getAvailableProjects</c>
/// enumeration so consumers (e.g. the Home tab and the project picker) no longer fan out a
/// per-project <c>getSetting</c> call per setting.
///
/// <para>
/// Each handled key mirrors the cheap branch of
/// <see cref="ParatextProjectDataProvider.GetProjectSetting"/> exactly — folder <c>Name</c>, the
/// computed <c>IsResourceProject</c>/editability values, the LDML language tag, and raw
/// <c>ParametersDictionary</c> reads — but this reader NEVER calls <c>GetProjectSetting</c> or
/// <c>ProjectSettingsService.GetDefault</c>. <c>GetDefault</c> performs a blocking
/// <c>PapiClient</c> round-trip per missing (project, key); calling it here would reintroduce the
/// server-side fan-out this snapshot exists to eliminate. Unset raw settings therefore come back
/// as the empty string, and the consuming web view applies the platform-owned missing-value
/// fallback (keeping localization-key defaults in TypeScript where they are defined).
/// </para>
///
/// <para>
/// Only a whitelist of cheap, side-effect-free settings is handled. Any requested setting outside
/// the whitelist (or any that throws while being read) is omitted from the snapshot, so the
/// consumer transparently falls back to a per-key <c>getSetting</c> for it — the snapshot is
/// best-effort by contract.
/// </para>
/// </summary>
internal static class ProjectSettingsSnapshotReader
{
    /// <summary>
    /// Builds a snapshot mapping each requested <c>platform.*</c> setting name to its value for the
    /// given project. Keys that are not in the cheap whitelist (or that throw) are omitted.
    /// </summary>
    /// <param name="scrText">The project to read settings from.</param>
    /// <param name="platformSettingNames">The <c>platform.*</c> setting names to include.</param>
    public static Dictionary<string, object?> ReadSettings(
        ScrText scrText,
        IReadOnlyList<string> platformSettingNames
    )
    {
        var snapshot = new Dictionary<string, object?>();
        foreach (var settingName in platformSettingNames)
        {
            try
            {
                if (TryReadSetting(scrText, settingName, out var value))
                    snapshot[settingName] = value;
            }
            catch
            {
                // Best-effort by contract: a setting that cannot be read cheaply (e.g. malformed
                // LDML for the language tag) is simply omitted. The consumer detects the absent key
                // and falls back to a per-key getSetting for that one (project, key) pair.
            }
        }
        return snapshot;
    }

    private static bool TryReadSetting(ScrText scrText, string settingName, out object? value)
    {
        switch (settingName)
        {
            // The folder name wins over Settings.Name (Paratext parity); always present.
            case ProjectSettingsNames.PB_NAME:
                value = scrText.Name;
                return true;

            // Computed from ScrText.IsResourceProject — there is no Settings.xml key. A "published"
            // project is one PT9 called a "resource": fully read-only.
            case ProjectSettingsNames.PB_IS_PUBLISHED:
                value = scrText.IsResourceProject;
                return true;

            // Mirror GetProjectSetting('platform.isEditable') EXACTLY so the snapshot stays a faithful
            // batch of getSetting (a consumer's snapshot fast-path must match its getSetting fallback):
            // a resource is never editable (the resource override in GetProjectSetting), otherwise read
            // the raw "Editable" flag (T/F) — NOT Settings.Editable, which is version-gated and can
            // diverge from the raw flag getSetting reads. If the raw flag is absent we cannot reproduce
            // getSetting's GetDefault without a wire call, so omit the key and let the consumer fall
            // back to getSetting for this one project.
            case ProjectSettingsNames.PB_IS_EDITABLE:
                if (scrText.IsResourceProject)
                {
                    value = false;
                    return true;
                }
                if (
                    scrText.Settings.ParametersDictionary.TryGetValue(
                        ProjectSettingsNames.PT_IS_EDITABLE,
                        out string? editableRaw
                    )
                )
                {
                    value = CoerceParatextBool(editableRaw);
                    return true;
                }
                value = null;
                return false;

            // BCP-47 tag from the project's LDML file, not Settings.xml.
            case ProjectSettingsNames.PB_LANGUAGE_TAG:
                value = scrText.Language.LanguageId.Id;
                return true;

            // Raw parameter reads; empty string when unset. The consumer treats an empty value as
            // "not in the snapshot" and falls back to getSetting for it (which returns the platform
            // default), so the snapshot stays a faithful batch of getSetting rather than inventing a
            // different value for unset settings.
            case ProjectSettingsNames.PB_FULL_NAME:
                value = ReadRawSetting(scrText, ProjectSettingsNames.PT_FULL_NAME);
                return true;
            case ProjectSettingsNames.PB_LANGUAGE:
                value = ReadRawSetting(scrText, ProjectSettingsNames.PT_LANGUAGE);
                return true;

            default:
                value = null;
                return false;
        }
    }

    /// <summary>
    /// Reads a raw Paratext setting value straight from the parameters dictionary — exactly the
    /// source <see cref="ParatextProjectDataProvider.GetProjectSetting"/> uses for non-special-cased
    /// settings — returning the empty string when the key is absent. No <c>GetDefault</c> round-trip.
    /// </summary>
    private static string ReadRawSetting(ScrText scrText, string paratextSettingName) =>
        scrText.Settings.ParametersDictionary.TryGetValue(paratextSettingName, out string? value)
            ? value
            : string.Empty;

    /// <summary>
    /// Coerces a raw Paratext boolean setting value (T/F or TRUE/FALSE) to a bool, matching the
    /// coercion in <see cref="ParatextProjectDataProvider.GetProjectSetting"/>. Throws on an
    /// unexpected value; the per-setting catch in <see cref="ReadSettings"/> then omits the key, so
    /// the consumer falls back to getSetting rather than receiving a wrong value.
    /// </summary>
    private static bool CoerceParatextBool(string value) =>
        value.ToUpperInvariant() switch
        {
            "T" or "TRUE" => true,
            "F" or "FALSE" => false,
            _ => throw new InvalidDataException(
                $"Editable flag was not T/F or TRUE/FALSE: '{value}'"
            ),
        };
}
