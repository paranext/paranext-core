using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data.Checking;
using PtxUtils;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Factory for basic checks that preserves PT9 ordering and provides display name resolution.
/// Maps CheckType string values to ScriptureCheckBase instances with correct ordering
/// matching PT9's BasicChecks.basicChecksList.
/// </summary>
internal static class BasicChecksFactory
{
    /// <summary>
    /// Ordered list of basic check types matching PT9's BasicChecks.basicChecksList.
    /// This is the single source of truth for available checks and their ordering.
    /// </summary>
    private static readonly Enum<CheckType>[] s_orderedCheckTypes =
    [
        CheckType.ChapterVerse,
        CheckType.Marker,
        CheckType.Character,
        CheckType.Punctuation,
        CheckType.Reference,
        CheckType.QuotedText,
        CheckType.Capitalization,
        CheckType.RepeatedWord,
        CheckType.MatchedPairs,
        CheckType.Quotation,
        CheckType.QuotationTypes,
        CheckType.Numbers,
        CheckType.Schema,
    ];

    private static readonly List<string> s_availableChecks = s_orderedCheckTypes
        .Select(ct => ct.InternalValue)
        .ToList();

    private static readonly Dictionary<string, Func<ScriptureCheckBase>> s_checkConstructors =
        new()
        {
            { CheckType.ChapterVerse.InternalValue, () => new ChapterVerseCheck() },
            { CheckType.Marker.InternalValue, () => new MarkerCheck() },
            { CheckType.Character.InternalValue, () => new CharactersCheck() },
            { CheckType.Punctuation.InternalValue, () => new PunctuationCheck() },
            { CheckType.Reference.InternalValue, () => new CrossReferencesCheck() },
            { CheckType.QuotedText.InternalValue, () => new QuotedTextCheck() },
            { CheckType.Capitalization.InternalValue, () => new CapitalizationCheck() },
            { CheckType.RepeatedWord.InternalValue, () => new RepeatedWordsCheck() },
            { CheckType.MatchedPairs.InternalValue, () => new MatchedPairsCheck() },
            { CheckType.Quotation.InternalValue, () => new QuotationCheck() },
            { CheckType.QuotationTypes.InternalValue, () => new QuotationTypesCheck() },
            { CheckType.Numbers.InternalValue, () => new NumberCheck() },
            { CheckType.Schema.InternalValue, () => new UsxSchemaCheck() },
        };

    private static readonly Dictionary<string, Enum<CheckType>> s_checkTypesByInternalValue =
        s_orderedCheckTypes.ToDictionary(ct => ct.InternalValue);

    /// <summary>
    /// Gets the ordered list of available basic check type string values.
    /// The ordering matches PT9's BasicChecks.basicChecksList exactly.
    /// </summary>
    public static IReadOnlyList<string> AvailableChecks => s_availableChecks;

    /// <summary>
    /// Creates a new ScriptureCheckBase instance for the given check type string.
    /// The instance is not initialized (no ChecksDataSource provided).
    /// </summary>
    /// <param name="checkType">CheckType string value (e.g., "MatchedPairs")</param>
    /// <returns>A new ScriptureCheckBase instance, or null if unknown</returns>
    public static ScriptureCheckBase? GetCheck(string checkType)
    {
        if (s_checkConstructors.TryGetValue(checkType, out var constructor))
            return constructor();

        return null;
    }

    /// <summary>
    /// Returns the localized display name for a check type string.
    /// </summary>
    /// <param name="checkType">CheckType string value (e.g., "MatchedPairs")</param>
    /// <returns>The localized display name</returns>
    /// <exception cref="ArgumentException">If checkType is not a valid basic check type.</exception>
    public static string GetCheckDisplayName(string checkType)
    {
        if (!s_checkTypesByInternalValue.TryGetValue(checkType, out var enumValue))
            throw new ArgumentException($"Unknown check type: {checkType}");

        return enumValue.ToLocalizedString();
    }
}
