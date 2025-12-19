using Paratext.Checks;
using Paratext.Checks.Checks;
using Paratext.Data.Checking;

namespace Paranext.DataProvider.Checks;

using static CheckType;

/// <summary>
/// Creates inventory objects based on checkIds that have inventories
/// </summary>
internal static class InventoryFactory
{
    private static readonly Dictionary<
        string,
        Func<ScriptureInventoryBase>
    > s_inventoryConstructors =
        new()
        {
            // Characters
            { Character.InternalValue, () => new CharactersCheck() },
            // Markers
            { Marker.InternalValue, () => new MarkerCheck() },
            // Unmatched pairs of punctuation
            { MatchedPairs.InternalValue, () => new MatchedPairsCheck() },
            // Mixed capitalization
            { MixedCapitalization.InternalValue, () => new MixedCapitalizationCheck() },
            // Markers missing final punctuation
            {
                ParagraphFinalPunctuation.InternalValue,
                () => new ParagraphFinalPunctuationCheck()
            },
            // Punctuation
            { Punctuation.InternalValue, () => new PunctuationCheck() },
            // QuotationCheck and QuotationTypesCheck are included because they implement
            // ScriptureInventoryBase even though they are configured through settings UI in
            // Paratext 9, not inventory UI.
            { Quotation.InternalValue, () => new QuotationCheck() },
            { QuotationTypes.InternalValue, () => new QuotationTypesCheck() },
            // Repeated words
            { RepeatedWord.InternalValue, () => new RepeatedWordsCheck() },
            // Punctuation followed by lowercase
            {
                SentenceFinalCapitalization.InternalValue,
                () => new SentenceFinalPunctCapitalizationCheck()
            },
            // Markers followed by lowercase
            { StylesCapitalization.InternalValue, () => new UncapitalizedStylesCheck() },
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
