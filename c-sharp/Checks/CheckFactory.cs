using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

public static class CheckFactory
{
    // Note that CheckType.Schema is not available outside Paratext itself due to dependencies
    // It cannot be easily copied, either, without some refactoring
    private static readonly Dictionary<string, Func<ScriptureCheckBase>> s_checkConstructors =
        new()
        {
            { CheckType.Capitalization.InternalValue, () => new CapitalizationCheck() },
            { CheckType.ChapterVerse.InternalValue, () => new ChapterVerseCheck() },
            { CheckType.Character.InternalValue, () => new CharactersCheck() },
            { CheckType.Marker.InternalValue, () => new MarkerCheck() },
            { CheckType.MatchedPairs.InternalValue, () => new MatchedPairsCheck() },
            { CheckType.Numbers.InternalValue, () => new NumberCheck() },
            {
                CheckType.ParagraphFinalPunctuation.InternalValue,
                () => new ParagraphFinalPunctuationCheck()
            },
            { CheckType.Punctuation.InternalValue, () => new PunctuationCheck() },
            { CheckType.Quotation.InternalValue, () => new QuotationCheck() },
            { CheckType.QuotationTypes.InternalValue, () => new QuotationTypesCheck() },
            { CheckType.QuotedText.InternalValue, () => new QuotedTextCheck() },
            { CheckType.Reference.InternalValue, () => new CrossReferencesCheck() },
            { CheckType.RepeatedWord.InternalValue, () => new RepeatedWordsCheck() },
        };

    public static ScriptureCheckBase CreateCheck(string checkId, ChecksDataSource dataSource)
    {
        if (!s_checkConstructors.TryGetValue(checkId, out var constructor))
            throw new ArgumentException($"Unknown checkId: {checkId}");

        var check = constructor();
        check.Initialize(dataSource);
        return check;
    }
}
