namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for language validation.
/// Implements EXT-006 (LanguageIDValidator).
/// </summary>
public static class LanguageService
{
    /// <summary>
    /// Windows reserved filenames that cannot be used as language IDs.
    /// </summary>
    public static readonly IReadOnlyList<string> WindowsReservedNames = new[]
    {
        "CON",
        "PRN",
        "AUX",
        "NUL",
        "COM1",
        "COM2",
        "COM3",
        "COM4",
        "COM5",
        "COM6",
        "COM7",
        "COM8",
        "COM9",
        "LPT1",
        "LPT2",
        "LPT3",
        "LPT4",
        "LPT5",
        "LPT6",
        "LPT7",
        "LPT8",
        "LPT9",
    };

    /// <summary>
    /// Validates language selection including name uniqueness.
    /// </summary>
    /// <param name="languageId">Selected language ID (BCP-47 tag)</param>
    /// <param name="languageName">User-specified language name</param>
    /// <param name="existingLanguageNames">List of existing language names in use</param>
    /// <param name="initialLanguageName">Original name (for edit mode)</param>
    /// <returns>Validation result</returns>
    /// <remarks>
    /// Implements EXT-006: Language ID Validator
    /// Golden master: gm-006-language-validation
    ///
    /// Validation rules (VAL-010 through VAL-013):
    /// 1. Language name cannot be blank (VAL-010)
    /// 2. Language name must be unique across projects (VAL-011)
    /// 3. Variant characters must be a-z or 0-9 (VAL-012)
    /// 4. Final language ID cannot be Windows reserved filename (VAL-013)
    /// </remarks>
    public static ValidationResult ValidateLanguageSelection(
        string languageId,
        string languageName,
        IReadOnlyList<string> existingLanguageNames,
        string? initialLanguageName = null
    )
    {
        // VAL-010: Language name cannot be blank
        if (string.IsNullOrWhiteSpace(languageName))
        {
            return new ValidationResult(false, "Language_NameBlank");
        }

        // VAL-011: Language name must be unique (case-insensitive)
        // Skip uniqueness check if in edit mode and name hasn't changed
        bool isEditMode = initialLanguageName != null;
        bool nameUnchanged =
            isEditMode
            && languageName.Equals(initialLanguageName, StringComparison.OrdinalIgnoreCase);

        if (!nameUnchanged && existingLanguageNames != null)
        {
            foreach (var existingName in existingLanguageNames)
            {
                if (existingName.Equals(languageName, StringComparison.OrdinalIgnoreCase))
                {
                    return new ValidationResult(false, "Language_NameExists");
                }
            }
        }

        // VAL-012: Check for private use extension with invalid variant format
        // The pattern "-x-" indicates a private use extension which is not allowed
        if (languageId.Contains("-x-", StringComparison.OrdinalIgnoreCase))
        {
            return new ValidationResult(false, "Language_InvalidVariant");
        }

        // VAL-013: Final language ID cannot be Windows reserved filename
        if (
            WindowsReservedNames.Any(reserved =>
                reserved.Equals(languageId, StringComparison.OrdinalIgnoreCase)
            )
        )
        {
            return new ValidationResult(false, "Language_ReservedName");
        }

        // All validations passed
        return new ValidationResult(true);
    }
}
