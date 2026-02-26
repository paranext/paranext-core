using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data.Checking;
using PtxUtils;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Factory for basic checks that preserves PT9 ordering and provides display name resolution.
/// Maps CheckType string values to ScriptureCheckBase instances with correct ordering
/// matching PT9's BasicChecks.basicChecksList.
///
/// EXT-012: Extracted from Paratext/Checking/BasicChecks.cs:14-78
/// BHV-124: CheckType display name resolution
/// INV-012: CheckType string values are immutable
/// </summary>
internal static class BasicChecksFactory
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/BasicChecks.cs:16-33
    // Method: BasicChecks static constructor (basicChecksList initialization)
    // Maps to: EXT-012
    private static readonly List<string> s_availableChecks =
    [
        CheckType.ChapterVerse.InternalValue,
        CheckType.Marker.InternalValue,
        CheckType.Character.InternalValue,
        CheckType.Punctuation.InternalValue,
        CheckType.Reference.InternalValue,
        CheckType.QuotedText.InternalValue,
        CheckType.Capitalization.InternalValue,
        CheckType.RepeatedWord.InternalValue,
        CheckType.MatchedPairs.InternalValue,
        CheckType.Quotation.InternalValue,
        CheckType.QuotationTypes.InternalValue,
        CheckType.Numbers.InternalValue,
        CheckType.Schema.InternalValue,
    ];

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/BasicChecks.cs:41-68
    // Method: BasicChecks.GetCheck(Enum<CheckType>)
    // Maps to: EXT-012
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

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/Checking/CheckType.cs:13-33
    // Maps to: BHV-124
    private static readonly Dictionary<string, Enum<CheckType>> s_checkTypesByInternalValue =
        new()
        {
            { CheckType.ChapterVerse.InternalValue, CheckType.ChapterVerse },
            { CheckType.Marker.InternalValue, CheckType.Marker },
            { CheckType.Character.InternalValue, CheckType.Character },
            { CheckType.Punctuation.InternalValue, CheckType.Punctuation },
            { CheckType.Reference.InternalValue, CheckType.Reference },
            { CheckType.QuotedText.InternalValue, CheckType.QuotedText },
            { CheckType.Capitalization.InternalValue, CheckType.Capitalization },
            { CheckType.RepeatedWord.InternalValue, CheckType.RepeatedWord },
            { CheckType.MatchedPairs.InternalValue, CheckType.MatchedPairs },
            { CheckType.Quotation.InternalValue, CheckType.Quotation },
            { CheckType.QuotationTypes.InternalValue, CheckType.QuotationTypes },
            { CheckType.Numbers.InternalValue, CheckType.Numbers },
            { CheckType.Schema.InternalValue, CheckType.Schema },
        };

    /// <summary>
    /// Gets the ordered list of available basic check type string values.
    /// The ordering matches PT9's BasicChecks.basicChecksList exactly.
    /// MatchedPairs is at index 8.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/BasicChecks.cs:38
    // Method: BasicChecks.AvailableChecks (property)
    // Maps to: EXT-012
    public static IReadOnlyList<string> AvailableChecks => s_availableChecks;

    /// <summary>
    /// Creates a new ScriptureCheckBase instance for the given check type string.
    /// The instance is not initialized (no ChecksDataSource provided).
    /// </summary>
    /// <param name="checkType">CheckType string value (e.g., "MatchedPairs")</param>
    /// <returns>A new ScriptureCheckBase instance, or null if unknown</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Checking/BasicChecks.cs:41-68
    // Method: BasicChecks.GetCheck(Enum<CheckType>)
    // Maps to: EXT-012
    public static ScriptureCheckBase? GetCheck(string checkType)
    {
        if (s_checkConstructors.TryGetValue(checkType, out var constructor))
            return constructor();

        return null;
    }

    /// <summary>
    /// Returns the localized display name for a check type string.
    /// For "MatchedPairs", returns "Unmatched Pairs of Punctuation".
    /// </summary>
    /// <param name="checkType">CheckType string value (e.g., "MatchedPairs")</param>
    /// <returns>The localized display name</returns>
    /// <exception cref="ArgumentException">
    /// If checkType is not a valid basic check type.
    /// Message format: "Unknown check type: {checkType}"
    /// </exception>
    // === NEW IN PT10 ===
    // Reason: PT9 accessed CheckType.ToLocalizedString() directly; PT10 needs string-based lookup
    // Maps to: CAP-011, BHV-124
    public static string GetCheckDisplayName(string checkType)
    {
        if (!s_checkTypesByInternalValue.TryGetValue(checkType, out var enumValue))
            throw new ArgumentException($"Unknown check type: {checkType}");

        return enumValue.ToLocalizedString();
    }
}
