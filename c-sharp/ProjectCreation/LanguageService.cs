namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for language validation and selection.
/// Validates language selection including name uniqueness, variant characters,
/// and reserved filename checks.
///
/// Validation Rules:
/// - VAL-010: Language name cannot be blank
/// - VAL-011: Language name must be unique across projects (except edit mode)
/// - VAL-012: Variant characters must be a-z or 0-9 only
/// - VAL-013: Final language ID cannot be Windows reserved filename
/// </summary>
internal static class LanguageService
{
    /// <summary>
    /// Windows reserved filenames that cannot be used as language IDs.
    /// </summary>
    private static readonly HashSet<string> s_windowsReservedNames =
        new(StringComparer.OrdinalIgnoreCase)
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
    /// <param name="languageId">Selected language ID (BCP-47 tag).</param>
    /// <param name="languageName">User-specified language name.</param>
    /// <param name="initialLanguageName">Original name (for edit mode).</param>
    /// <returns>Validation result with error code if invalid.</returns>
    /// <remarks>
    /// Validation order:
    /// 1. VAL-010: Check language name is not blank
    /// 2. VAL-011: Check language name uniqueness (unless edit mode with same name)
    /// 3. VAL-012: Check variant characters are valid (a-z, 0-9)
    /// 4. VAL-013: Check language ID is not Windows reserved filename
    ///
    /// Error codes:
    /// - LANGUAGE_NAME_BLANK: Name is empty or whitespace
    /// - LANGUAGE_NAME_EXISTS: Name already used by another project
    /// - LANGUAGE_VARIANT_INVALID: Variant contains invalid characters
    /// - LANGUAGE_ID_RESERVED: ID is a Windows reserved filename
    /// </remarks>
    public static ValidationResult ValidateLanguageSelection(
        string languageId,
        string languageName,
        string? initialLanguageName = null
    )
    {
        // TODO: Implement language validation
        // This is a stub that throws NotImplementedException to ensure tests FAIL (RED state)
        throw new NotImplementedException(
            $"LanguageService.ValidateLanguageSelection not implemented for ID '{languageId}', name '{languageName}'"
        );
    }

    /// <summary>
    /// Gets all available languages from the language database.
    /// </summary>
    /// <param name="searchQuery">Optional search filter.</param>
    /// <returns>List of available languages matching the query.</returns>
    /// <remarks>
    /// Search matches against:
    /// - Language ID (BCP-47 tag)
    /// - Language name
    /// - Base code (ISO 639-3)
    /// </remarks>
    public static IReadOnlyList<LanguageSelection> GetAvailableLanguages(string? searchQuery = null)
    {
        // TODO: Implement language lookup
        // This is a stub that throws NotImplementedException to ensure tests FAIL (RED state)
        throw new NotImplementedException(
            $"LanguageService.GetAvailableLanguages not implemented for query '{searchQuery}'"
        );
    }
}
