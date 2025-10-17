using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Creates inventory objects based on checkIds that have inventories
/// </summary>
public static class InventoryFactory
{
    private static readonly Dictionary<
        string,
        Func<ScriptureInventoryBase>
    > s_inventoryConstructors =
        new()
        {
            // Characters
            { CheckType.Character.InternalValue, () => new CharactersCheck() },
            // Markers
            { CheckType.Marker.InternalValue, () => new MarkerCheck() },
            // Unmatched pairs of punctuation
            { CheckType.MatchedPairs.InternalValue, () => new MatchedPairsCheck() },
            // Mixed capitalization
            { CheckType.MixedCapitalization.InternalValue, () => new MixedCapitalizationCheck() },
            // Markers missing final punctuation
            {
                CheckType.ParagraphFinalPunctuation.InternalValue,
                () => new ParagraphFinalPunctuationCheck()
            },
            // Punctuation
            { CheckType.Punctuation.InternalValue, () => new PunctuationCheck() },
            // QuotationCheck and QuotationTypesCheck are included because they implement
            // ScriptureInventoryBase even though they are configured through settings UI in
            // Paratext 9, not inventory UI.
            { CheckType.Quotation.InternalValue, () => new QuotationCheck() },
            { CheckType.QuotationTypes.InternalValue, () => new QuotationTypesCheck() },
            // Repeated words
            { CheckType.RepeatedWord.InternalValue, () => new RepeatedWordsCheck() },
            // Punctuation followed by lowercase
            {
                CheckType.SentenceFinalCapitalization.InternalValue,
                () => new SentenceFinalPunctCapitalizationCheck()
            },
            // Markers followed by lowercase
            { CheckType.StylesCapitalization.InternalValue, () => new UncapitalizedStylesCheck() },
        };

    public static IEnumerable<string> GetAvailableInventoryIds()
    {
        return s_inventoryConstructors.Keys;
    }

    public static ScriptureInventoryBase CreateInventory(
        string inventoryId,
        ChecksDataSource dataSource
    )
    {
        if (!s_inventoryConstructors.TryGetValue(inventoryId, out var constructor))
            throw new ArgumentException($"Unknown inventoryId: {inventoryId}");

        var inventory = constructor();
        inventory.Initialize(dataSource);
        return inventory;
    }
}
