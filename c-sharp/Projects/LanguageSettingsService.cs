// === NEW IN PT10 ===
// Reason: Service for saving language settings - PAPI request handler
// Maps to: CAP-007, EXT-007, BHV-163, BHV-164

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for language settings operations.
/// PT9 Provenance: LanguageSettingsForm.SaveFormToScrLanguage()
/// Maps to: CAP-007, EXT-007
/// </summary>
internal static class LanguageSettingsService
{
    /// <summary>
    /// Saves language settings to a project's LDML file.
    /// Validates character rules before saving (requires CAP-006).
    /// Creates VCS commit after successful save.
    /// </summary>
    /// <param name="request">The language settings to save</param>
    /// <param name="canUpdateAllSettings">Whether user has permission to update all settings</param>
    /// <returns>Result indicating success or failure with details</returns>
    public static LanguageSettingsSaveResult SaveLanguageSettings(
        LanguageSettingsRequest request,
        bool canUpdateAllSettings
    )
    {
        // TODO: Implement in GREEN phase
        // This stub intentionally throws to ensure RED phase tests fail
        throw new NotImplementedException(
            "SaveLanguageSettings not yet implemented - TDD RED phase"
        );
    }
}
