#nullable enable

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for language validation and selection.
/// Implements CAP-EXT-006 (LanguageIDValidator) and CAP-011 (GetAvailableLanguages).
/// </summary>
internal static class LanguageService
{
    #region Constants

    /// <summary>
    /// Private use extension marker in BCP-47 language tags.
    /// Tags containing this marker are treated as invalid variants.
    /// </summary>
    private const string PrivateUseExtensionMarker = "-x-";

    /// <summary>
    /// Common languages available for project creation.
    /// In production, this would be replaced by a query to the ParatextData language database.
    /// </summary>
    private static readonly IReadOnlyList<LanguageSelection> CommonLanguages =
    [
        CreateLanguage("eng", "English"),
        CreateLanguage("spa", "Spanish"),
        CreateLanguage("fra", "French"),
        CreateLanguage("deu", "German"),
        CreateLanguage("por", "Portuguese"),
        CreateLanguage("zho", "Chinese"),
        CreateLanguage("ara", "Arabic"),
        CreateLanguage("hin", "Hindi"),
    ];

    #endregion

    #region Public Methods

    /// <summary>
    /// Validates language selection including name uniqueness.
    /// </summary>
    /// <param name="languageId">Selected language ID (BCP-47 tag).</param>
    /// <param name="languageName">User-specified language name.</param>
    /// <param name="existingLanguageNames">List of existing language names in use.</param>
    /// <param name="initialLanguageName">Original name (for edit mode).</param>
    /// <returns>Validation result.</returns>
    /// <remarks>
    /// <para>Implements CAP-EXT-006: Language ID Validator.</para>
    /// <para>Golden master: gm-006-language-validation.</para>
    /// <para>
    /// Validation rules (VAL-010 through VAL-013):
    /// <list type="number">
    /// <item>Language name cannot be blank (VAL-010)</item>
    /// <item>Language name must be unique across projects (VAL-011)</item>
    /// <item>Variant characters must be a-z or 0-9 (VAL-012)</item>
    /// <item>Final language ID cannot be Windows reserved filename (VAL-013)</item>
    /// </list>
    /// </para>
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
        if (IsNameDuplicate(languageName, existingLanguageNames, initialLanguageName))
        {
            return new ValidationResult(false, "Language_NameExists");
        }

        // VAL-012: Check for private use extension with invalid variant format
        if (HasPrivateUseExtension(languageId))
        {
            return new ValidationResult(false, "Language_InvalidVariant");
        }

        // VAL-013: Final language ID cannot be Windows reserved filename
        if (IsWindowsReservedName(languageId))
        {
            return new ValidationResult(false, "Language_ReservedName");
        }

        // All validations passed
        return new ValidationResult(true);
    }

    /// <summary>
    /// Gets all available languages from the language database, optionally filtered by a search query.
    /// </summary>
    /// <param name="searchQuery">
    /// Optional search filter. When provided, filters languages by matching against
    /// language ID, language name, or base code (case-insensitive).
    /// </param>
    /// <returns>
    /// A list of <see cref="LanguageSelection"/> objects representing available languages.
    /// Returns all languages when <paramref name="searchQuery"/> is null or empty.
    /// </returns>
    /// <remarks>
    /// <para>Implements CAP-011: GetAvailableLanguages.</para>
    /// <para>
    /// <b>Current Implementation:</b> Returns a hardcoded list of common languages
    /// (see <see cref="CommonLanguages"/>). A full implementation would query the
    /// ParatextData language database via <c>LanguageLookup</c>.
    /// </para>
    /// <para>
    /// Search behavior:
    /// <list type="bullet">
    /// <item>Case-insensitive substring matching</item>
    /// <item>Matches against LanguageId, LanguageName, and BaseCode fields</item>
    /// <item>Returns empty list if no matches found</item>
    /// </list>
    /// </para>
    /// </remarks>
    public static IReadOnlyList<LanguageSelection> GetAvailableLanguages(string? searchQuery = null)
    {
        // If no search query, return all common languages
        if (string.IsNullOrWhiteSpace(searchQuery))
        {
            return CommonLanguages;
        }

        // Filter by search query (case-insensitive substring match)
        return CommonLanguages.Where(lang => MatchesSearchQuery(lang, searchQuery)).ToList();
    }

    #endregion

    #region Private Methods

    /// <summary>
    /// Checks if the language name already exists in the list of existing names.
    /// </summary>
    /// <param name="languageName">Name to check.</param>
    /// <param name="existingLanguageNames">List of existing language names.</param>
    /// <param name="initialLanguageName">Original name if in edit mode.</param>
    /// <returns>True if the name is a duplicate.</returns>
    private static bool IsNameDuplicate(
        string languageName,
        IReadOnlyList<string>? existingLanguageNames,
        string? initialLanguageName
    )
    {
        // Skip uniqueness check if in edit mode and name hasn't changed
        bool isEditMode = initialLanguageName != null;
        bool nameUnchanged =
            isEditMode
            && languageName.Equals(initialLanguageName, StringComparison.OrdinalIgnoreCase);

        if (nameUnchanged || existingLanguageNames == null)
        {
            return false;
        }

        return existingLanguageNames.Any(existingName =>
            existingName.Equals(languageName, StringComparison.OrdinalIgnoreCase)
        );
    }

    /// <summary>
    /// Checks if the language ID contains a private use extension (-x-) which is not allowed.
    /// </summary>
    /// <param name="languageId">Language ID to check.</param>
    /// <returns><c>true</c> if the language ID contains the private use extension marker.</returns>
    private static bool HasPrivateUseExtension(string languageId)
    {
        return languageId.Contains(PrivateUseExtensionMarker, StringComparison.OrdinalIgnoreCase);
    }

    /// <summary>
    /// Checks if a language matches the given search query.
    /// </summary>
    /// <param name="language">Language to check.</param>
    /// <param name="searchQuery">Search query string.</param>
    /// <returns><c>true</c> if any searchable field contains the query.</returns>
    private static bool MatchesSearchQuery(LanguageSelection language, string searchQuery)
    {
        return language.LanguageId.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)
            || language.LanguageName.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)
            || language.BaseCode.Contains(searchQuery, StringComparison.OrdinalIgnoreCase);
    }

    /// <summary>
    /// Creates a simple language selection record with standard properties.
    /// </summary>
    /// <param name="code">ISO 639-3 language code.</param>
    /// <param name="name">English name of the language.</param>
    /// <returns>A new <see cref="LanguageSelection"/> with the specified values.</returns>
    private static LanguageSelection CreateLanguage(string code, string name)
    {
        return new LanguageSelection
        {
            LanguageId = code,
            LanguageName = name,
            BaseCode = code,
            Script = null,
            Region = null,
            Variant = null,
        };
    }

    /// <summary>
    /// Checks if a name is a Windows reserved filename.
    /// </summary>
    /// <param name="name">Name to check.</param>
    /// <returns>True if the name is a Windows reserved filename.</returns>
    private static bool IsWindowsReservedName(string name)
    {
        return ProjectCreationConstants.WindowsReservedNames.Any(reserved =>
            reserved.Equals(name, StringComparison.OrdinalIgnoreCase)
        );
    }

    #endregion
}
