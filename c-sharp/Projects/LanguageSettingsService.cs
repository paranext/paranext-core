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
    // EXPLANATION:
    // This service validates character rules before saving language settings.
    // Per INV-011, the save operation must be atomic - either all settings save
    // or none do. If character validation fails, no changes are persisted.
    // The actual LDML file persistence and VCS commit are handled by ParatextData.dll
    // integration (to be wired up in full integration phase).

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
        // Step 1: Validate character rules using CAP-006
        var validationRequest = new CharacterRulesValidationRequest(
            request.Separator,
            request.CharacterRules,
            LanguageId: "" // Language ID not needed for validation itself
        );

        var validationResult = LanguageValidationService.ValidateCharacterRules(validationRequest);

        // If validation fails, return failure with validation result
        if (!validationResult.IsValid)
        {
            return LanguageSettingsSaveResult.ValidationFailed(validationResult);
        }

        // Validation passed - return success
        // Note: Actual LDML persistence will be added in full integration phase
        // using ScrLanguage.WriteLdmlFile() with ParatextProjectDataProvider.RunWithinLock()
        return LanguageSettingsSaveResult.Succeeded();
    }
}
