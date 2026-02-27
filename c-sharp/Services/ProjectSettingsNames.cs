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

    public const string PB_LANGUAGE_TAG = "platform.languageTag";
    public const string PT_LANGUAGE_TAG = "LanguageTag";

    public const string PB_VERSIFICATION = "platformScripture.versification";
    public const string PT_VERSIFICATION = "Versification";

    public const string PB_IS_EDITABLE = "platform.isEditable";
    public const string PT_IS_EDITABLE = "Editable";

    public const string PB_TEXT_DIRECTION = "platform.textDirection";
    public const string PT_TEXT_DIRECTION = "TextDirection";

    public const string PB_VALID_CHARACTERS = "platformScripture.validCharacters";
    public const string PT_VALID_CHARACTERS = "ValidCharacters";

    public const string PB_INVALID_CHARACTERS = "platformScripture.invalidCharacters";
    public const string PT_INVALID_CHARACTERS = "InvalidCharacters";

    public const string PB_REPEATABLE_WORDS = "platformScripture.repeatableWords";
    public const string PT_REPEATABLE_WORDS = "RepeatableWords";

    public const string PB_NONREPEATABLE_WORDS = "platformScripture.nonRepeatableWords";
    public const string PT_NONREPEATABLE_WORDS = "NonRepeatableWords";

    /// <summary>
    /// Content of the character class for base (word-forming) characters, derived from
    /// CharacterCategorizer.BaseCharacterRegex. This is a computed, read-only setting — it
    /// is not stored in Settings.xml. The value is a regex character class body (the content that
    /// goes inside '[]') and is safe for use in JavaScript/ECMAScript regex with the
    /// 'u' flag (the non-ECMAScript category '\p{Cn}' is excluded as part of converting
    /// the C# regex to JavaScript-compatible regex).
    /// </summary>
    public const string PB_BASE_CHARACTER_CLASS_REGEX = "platformScripture.baseCharacterClassRegex";
    public const string PT_BASE_CHARACTER_CLASS_REGEX = "BaseCharacterClassRegex";

    /// <summary>
    /// Content of the character class for diacritic (combining/modifier) characters, derived from
    /// CharacterCategorizer.DiacriticCharacterRegex. This is a computed, read-only setting — it
    /// is not stored in Settings.xml. The value is a regex character class body safe for use in
    /// ECMAScript (JavaScript) regex with the 'u' flag.
    /// </summary>
    public const string PB_DIACRITIC_CHARACTER_CLASS_REGEX =
        "platformScripture.diacriticCharacterClassRegex";
    public const string PT_DIACRITIC_CHARACTER_CLASS_REGEX = "DiacriticCharacterClassRegex";

    /// <summary>
    /// Regex pattern for word-medial characters (characters that can appear inside a word but not
    /// at its boundary), derived from CharacterCategorizer.WordMedialRegex. This is a computed,
    /// read-only setting — it is not stored in Settings.xml. Unlike the base/diacritic class bodies
    /// above, this is a full regex pattern (not wrapped in '[]') and is used as an alternation in
    /// word-boundary assertions. May be an empty string for scripts with no word-medial characters.
    /// The value is safe for use in ECMAScript (JavaScript) regex with the 'u' flag (C#-specific
    /// identity escapes like '\-' are converted to their hex equivalents, e.g. '\x2D').
    /// </summary>
    public const string PB_WORD_MEDIAL_CHARACTER_REGEX =
        "platformScripture.wordMedialCharacterRegex";
    public const string PT_WORD_MEDIAL_CHARACTER_REGEX = "WordMedialCharacterRegex";

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
            { PB_LANGUAGE_TAG, PT_LANGUAGE_TAG },
            { PB_NAME, PT_NAME },
            { PB_VERSIFICATION, PT_VERSIFICATION },
            { PB_IS_EDITABLE, PT_IS_EDITABLE },
            { PB_TEXT_DIRECTION, PT_TEXT_DIRECTION },
            { PB_VALID_CHARACTERS, PT_VALID_CHARACTERS },
            { PB_INVALID_CHARACTERS, PT_INVALID_CHARACTERS },
            { PB_REPEATABLE_WORDS, PT_REPEATABLE_WORDS },
            { PB_NONREPEATABLE_WORDS, PT_NONREPEATABLE_WORDS },
            { PB_BASE_CHARACTER_CLASS_REGEX, PT_BASE_CHARACTER_CLASS_REGEX },
            { PB_DIACRITIC_CHARACTER_CLASS_REGEX, PT_DIACRITIC_CHARACTER_CLASS_REGEX },
            { PB_WORD_MEDIAL_CHARACTER_REGEX, PT_WORD_MEDIAL_CHARACTER_REGEX },
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
