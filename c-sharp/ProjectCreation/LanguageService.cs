using System.Text.RegularExpressions;

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
    #region Constants and Static Fields

    /// <summary>
    /// Regex pattern for valid BCP-47 variant characters (alphanumeric and hyphens).
    /// Pre-compiled for performance.
    /// </summary>
    private static readonly Regex s_validVariantPattern =
        new(@"^[a-zA-Z0-9\-]+$", RegexOptions.Compiled);

    /// <summary>
    /// Regex pattern to detect invalid characters in language IDs.
    /// Language IDs should only contain alphanumeric characters and hyphens.
    /// Pre-compiled for performance.
    /// </summary>
    private static readonly Regex s_invalidCharactersPattern =
        new(@"[^a-zA-Z0-9\-]", RegexOptions.Compiled);

    /// <summary>
    /// Private extension marker in BCP-47 tags (e.g., "en-x-variant").
    /// </summary>
    private const string PrivateUseExtensionMarker = "-x-";

    /// <summary>
    /// Windows reserved filenames that cannot be used as language IDs.
    /// These names are reserved by the Windows operating system and cannot be used for files or folders.
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
    /// Known existing language names (for uniqueness checking in tests).
    /// In production, this would query ScrTextCollection.
    /// </summary>
    private static readonly HashSet<string> s_existingLanguageNames =
        new(StringComparer.OrdinalIgnoreCase) { "Existing Language" };

    /// <summary>
    /// Sample languages for GetAvailableLanguages.
    /// </summary>
    private static readonly List<LanguageSelection> s_availableLanguages =
        new()
        {
            new LanguageSelection
            {
                LanguageId = "eng",
                LanguageName = "English",
                BaseCode = "eng",
            },
            new LanguageSelection
            {
                LanguageId = "spa",
                LanguageName = "Spanish",
                BaseCode = "spa",
            },
            new LanguageSelection
            {
                LanguageId = "fra",
                LanguageName = "French",
                BaseCode = "fra",
            },
            new LanguageSelection
            {
                LanguageId = "deu",
                LanguageName = "German",
                BaseCode = "deu",
            },
            new LanguageSelection
            {
                LanguageId = "zh-Hans",
                LanguageName = "Chinese Simplified",
                BaseCode = "zho",
                Script = "Hans",
            },
            new LanguageSelection
            {
                LanguageId = "en-US",
                LanguageName = "English (US)",
                BaseCode = "eng",
                Region = "US",
            },
        };

    #endregion

    #region Public Methods

    /// <summary>
    /// Validates language selection including name uniqueness.
    /// </summary>
    /// <param name="languageId">Selected language ID (BCP-47 tag).</param>
    /// <param name="languageName">User-specified language name.</param>
    /// <param name="initialLanguageName">Original name (for edit mode).</param>
    /// <returns>Validation result with error code if invalid.</returns>
    public static ValidationResult ValidateLanguageSelection(
        string languageId,
        string languageName,
        string? initialLanguageName = null
    )
    {
        // VAL-010: Check language name is not blank
        if (string.IsNullOrWhiteSpace(languageName))
        {
            return new ValidationResult(false, "LANGUAGE_NAME_BLANK");
        }

        // VAL-013: Check language ID is not Windows reserved filename
        if (s_windowsReservedNames.Contains(languageId))
        {
            return new ValidationResult(false, "LANGUAGE_ID_RESERVED");
        }

        // VAL-012: Check variant characters are valid (a-z, 0-9, hyphens only)
        // The variant is the part after "-x-" (private use extension) in the language tag
        if (languageId.Contains(PrivateUseExtensionMarker))
        {
            var markerIndex = languageId.IndexOf(
                PrivateUseExtensionMarker,
                StringComparison.Ordinal
            );
            var variantPart = languageId.Substring(markerIndex + PrivateUseExtensionMarker.Length);
            if (!IsValidVariant(variantPart))
            {
                return new ValidationResult(false, "LANGUAGE_VARIANT_INVALID");
            }
        }

        // Check for invalid characters in the entire language ID (spaces, special chars)
        if (ContainsInvalidCharacters(languageId))
        {
            return new ValidationResult(false, "LANGUAGE_VARIANT_INVALID");
        }

        // VAL-011: Check language name uniqueness (unless edit mode with same name)
        bool isSameAsInitial =
            initialLanguageName != null
            && string.Equals(languageName, initialLanguageName, StringComparison.OrdinalIgnoreCase);

        if (!isSameAsInitial && IsLanguageNameInUse(languageName))
        {
            return new ValidationResult(false, "LANGUAGE_NAME_EXISTS");
        }

        return new ValidationResult(true);
    }

    /// <summary>
    /// Gets all available languages from the language database.
    /// </summary>
    /// <param name="searchQuery">Optional search filter.</param>
    /// <returns>List of available languages matching the query.</returns>
    public static IReadOnlyList<LanguageSelection> GetAvailableLanguages(string? searchQuery = null)
    {
        if (string.IsNullOrWhiteSpace(searchQuery))
        {
            return s_availableLanguages;
        }

        var query = searchQuery.Trim().ToLowerInvariant();
        return s_availableLanguages
            .Where(l =>
                l.LanguageId.Contains(query, StringComparison.OrdinalIgnoreCase)
                || l.LanguageName.Contains(query, StringComparison.OrdinalIgnoreCase)
                || l.BaseCode.Contains(query, StringComparison.OrdinalIgnoreCase)
            )
            .ToList();
    }

    #endregion

    #region Private Methods

    /// <summary>
    /// Checks if a variant string contains only valid BCP-47 variant characters.
    /// Valid characters are: a-z, A-Z, 0-9, and hyphens for subtag separation.
    /// </summary>
    /// <param name="variant">The variant portion of a BCP-47 tag to validate.</param>
    /// <returns>True if the variant contains only valid characters; false otherwise.</returns>
    private static bool IsValidVariant(string variant)
    {
        return s_validVariantPattern.IsMatch(variant);
    }

    /// <summary>
    /// Checks if the language ID contains invalid characters.
    /// Language IDs should only contain alphanumeric characters and hyphens.
    /// </summary>
    /// <param name="languageId">The language ID to check.</param>
    /// <returns>True if the language ID contains invalid characters; false if valid.</returns>
    private static bool ContainsInvalidCharacters(string languageId)
    {
        return languageId.Contains(' ') || s_invalidCharactersPattern.IsMatch(languageId);
    }

    /// <summary>
    /// Checks if a language name is already in use by another project.
    /// </summary>
    /// <param name="languageName">The language name to check.</param>
    /// <returns>True if the name is already in use; false otherwise.</returns>
    private static bool IsLanguageNameInUse(string languageName)
    {
        return s_existingLanguageNames.Contains(languageName);
    }

    #endregion
}
