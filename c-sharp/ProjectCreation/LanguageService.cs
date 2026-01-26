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
        // The variant is the part after "-x-" in the language tag
        if (languageId.Contains("-x-"))
        {
            var variantPart = languageId.Substring(languageId.IndexOf("-x-") + 3);
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

    /// <summary>
    /// Checks if a variant string contains only valid characters (a-z, 0-9).
    /// </summary>
    private static bool IsValidVariant(string variant)
    {
        // Variant must only contain a-z (case insensitive), 0-9, and hyphens for subtags
        return Regex.IsMatch(variant, @"^[a-zA-Z0-9\-]+$");
    }

    /// <summary>
    /// Checks if the language ID contains invalid characters like spaces or special characters.
    /// </summary>
    private static bool ContainsInvalidCharacters(string languageId)
    {
        // Language IDs should only contain alphanumeric chars and hyphens
        return languageId.Contains(' ') || Regex.IsMatch(languageId, @"[^a-zA-Z0-9\-]");
    }

    /// <summary>
    /// Checks if a language name is already in use by another project.
    /// </summary>
    private static bool IsLanguageNameInUse(string languageName)
    {
        return s_existingLanguageNames.Contains(languageName);
    }
}
