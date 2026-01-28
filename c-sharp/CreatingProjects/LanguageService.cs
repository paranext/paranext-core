using System.Text.RegularExpressions;
using Paratext.Data;
using Paratext.Data.Languages;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for language validation.
/// </summary>
internal static class LanguageService
{
    private static readonly HashSet<string> s_reservedNames =
        ReservedNames.WindowsReservedFileNames;

    /// <summary>
    /// Validates a language selection against rules VAL-010 through VAL-013.
    /// </summary>
    public static ValidationResult ValidateLanguageSelection(
        string languageId,
        string languageName,
        string? initialLanguageName = null
    )
    {
        // VAL-010: Blank name
        if (string.IsNullOrEmpty(languageName))
            return new ValidationResult(false, "LANGUAGE_NAME_BLANK");

        // VAL-012: Invalid variant characters
        if (languageId.Contains("-x-") || languageId.Contains("-X-"))
        {
            string variant = languageId[
                (languageId.IndexOf("-x-", StringComparison.OrdinalIgnoreCase) + 3)..
            ];
            if (!Regex.IsMatch(variant, @"^[A-Za-z0-9]+$"))
                return new ValidationResult(false, "LANGUAGE_VARIANT_INVALID");
        }

        // VAL-013: Reserved filename as language ID
        string baseId = languageId.Contains('-')
            ? languageId[..languageId.IndexOf('-')]
            : languageId;
        if (s_reservedNames.Contains(baseId))
            return new ValidationResult(false, "LANGUAGE_ID_RESERVED");

        // VAL-011: Duplicate name check
        if (!string.Equals(languageName, initialLanguageName, StringComparison.Ordinal))
        {
            foreach (ScrText scrText in ScrTextCollection.ScrTexts(IncludeProjects.Everything))
            {
                if (
                    string.Equals(
                        scrText.Settings?.LanguageName,
                        languageName,
                        StringComparison.Ordinal
                    )
                )
                    return new ValidationResult(false, "LANGUAGE_NAME_EXISTS");
            }
        }

        return new ValidationResult(true);
    }

    /// <summary>
    /// Gets all available languages from the ParatextData language database.
    /// </summary>
    public static LanguageSearchResult GetAvailableLanguages(
        string? searchQuery = null,
        int maxResults = 50
    )
    {
        var languages = new List<LanguageSelection>();
        string search = searchQuery ?? "";
        int totalCount = 0;

        foreach (LanguageHelperInfo info in LanguageIdHelper.FindAllLanguageMatches(search))
        {
            string code = info.Code ?? "";
            string name = info.Name ?? "";

            if (string.IsNullOrEmpty(code) && string.IsNullOrEmpty(name))
                continue;

            totalCount++;

            if (languages.Count < maxResults)
            {
                languages.Add(
                    new LanguageSelection
                    {
                        LanguageId = code,
                        LanguageName = string.IsNullOrEmpty(name) ? code : name,
                        BaseCode = string.IsNullOrEmpty(info.Iso6393Code) ? code : info.Iso6393Code,
                        Script = info.Script,
                        Region = info.Region,
                        Variant = info.Variant,
                    }
                );
            }
        }

        return new LanguageSearchResult
        {
            Languages = languages,
            HasMore = totalCount > maxResults,
            TotalCount = totalCount,
        };
    }
}
