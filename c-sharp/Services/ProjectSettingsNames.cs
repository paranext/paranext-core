namespace Paranext.DataProvider.Services;

public sealed class ProjectSettingsNames
{
    public const string PB_BOOKS_PRESENT = "platformScripture.booksPresent";
    public const string PT_BOOKS_PRESENT = "BooksPresent";

    public const string PB_NAME = "platform.name";
    public const string PT_NAME = "Name";

    public const string PB_FULL_NAME = "platform.fullName";
    public const string PT_FULL_NAME = "FullName";

    public const string PB_LANGUAGE = "platform.language";
    public const string PT_LANGUAGE = "Language";

    public const string PB_VERSIFICATION = "platformScripture.versification";
    public const string PT_VERSIFICATION = "Versification";

    public const string PB_IS_EDITABLE = "platform.isEditable";
    public const string PT_IS_EDITABLE = "Editable";

    public const string PB_VALID_CHARACTERS = "platformScripture.validCharacters";
    public const string PT_VALID_CHARACTERS = "ValidCharacters";

    public const string PB_INVALID_CHARACTERS = "platformScripture.invalidCharacters";
    public const string PT_INVALID_CHARACTERS = "InvalidCharacters";

    public const string PB_REPEATABLE_WORDS = "platformScripture.repeatableWords";
    public const string PT_REPEATABLE_WORDS = "RepeatableWords";

    public const string PB_NONREPEATABLE_WORDS = "platformScripture.nonRepeatableWords";
    public const string PT_NONREPEATABLE_WORDS = "NonRepeatableWords";

    /// <summary>
    /// Paratext setting names that are either T or F and need to be converted to booleans
    /// </summary>
    private static readonly HashSet<string> s_ptSettingBooleans =
    [
        "Editable",
        "MatchBasedOnStems",
        "AllowReadAccess",
        "AllowSharingWithSLDR",
    ];

    // Make sure this dictionary gets updated whenever new settings are added
    private static readonly Dictionary<string, string> s_platformBibleToParatextSettingsNames =
        new()
        {
            { PB_BOOKS_PRESENT, PT_BOOKS_PRESENT },
            { PB_FULL_NAME, PT_FULL_NAME },
            { PB_LANGUAGE, PT_LANGUAGE },
            { PB_NAME, PT_NAME },
            { PB_VERSIFICATION, PT_VERSIFICATION },
            { PB_IS_EDITABLE, PT_IS_EDITABLE },
            { PB_VALID_CHARACTERS, PT_VALID_CHARACTERS },
            { PB_INVALID_CHARACTERS, PT_INVALID_CHARACTERS },
            { PB_REPEATABLE_WORDS, PT_REPEATABLE_WORDS },
            { PB_NONREPEATABLE_WORDS, PT_NONREPEATABLE_WORDS },
        };

    private static readonly Dictionary<string, string> s_paratextToPlatformBibleSettingsNames =
        s_platformBibleToParatextSettingsNames.ToDictionary((i) => i.Value, (i) => i.Key);

    /// <summary>
    /// Convert project setting names from Platform.Bible terminology to Paratext terminology
    /// </summary>
    /// <param name="pbSettingName">Setting name in Platform.Bible terminology</param>
    /// <returns>Setting name in Paratext terminology if a mapping exists</returns>
    public static string? GetParatextSettingNameFromPlatformBibleSettingName(string pbSettingName)
    {
        return s_platformBibleToParatextSettingsNames.TryGetValue(pbSettingName, out string? retVal)
            ? retVal
            : null;
    }

    /// <summary>
    /// Convert project setting names from Paratext terminology to Platform.Bible terminology
    /// </summary>
    /// <param name="ptSettingName">Setting name in Paratext terminology</param>
    /// <returns>Setting name in Platform.Bible terminology if a mapping exists</returns>
    public static string? GetPlatformBibleSettingNameFromParatextSettingName(string ptSettingName)
    {
        return s_paratextToPlatformBibleSettingsNames.TryGetValue(ptSettingName, out string? retVal)
            ? retVal
            : null;
    }

    /// <summary>
    /// Determines whether a Paratext Setting is expected to be a boolean ("T" or "F" only)
    /// </summary>
    /// <param name="ptSettingName"></param>
    /// <returns></returns>
    public static bool IsParatextSettingABoolean(string ptSettingName)
    {
        return s_ptSettingBooleans.Contains(ptSettingName);
    }
}
