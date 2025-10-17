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
            { CheckType.Character.InternalValue, () => new CharactersCheck() },
            { CheckType.Marker.InternalValue, () => new MarkerCheck() },
            { CheckType.MatchedPairs.InternalValue, () => new MatchedPairsCheck() },
            { CheckType.MixedCapitalization.InternalValue, () => new MixedCapitalizationCheck() },
            {
                CheckType.ParagraphFinalPunctuation.InternalValue,
                () => new ParagraphFinalPunctuationCheck()
            },
            { CheckType.Punctuation.InternalValue, () => new PunctuationCheck() },
            { CheckType.Quotation.InternalValue, () => new QuotationCheck() },
            { CheckType.QuotationTypes.InternalValue, () => new QuotationTypesCheck() },
            { CheckType.RepeatedWord.InternalValue, () => new RepeatedWordsCheck() },
            {
                CheckType.SentenceFinalCapitalization.InternalValue,
                () => new SentenceFinalPunctCapitalizationCheck()
            },
            { CheckType.StylesCapitalization.InternalValue, () => new UncapitalizedStylesCheck() },
        };

    public static IEnumerable<string> GetAvailableInventoryIds()
    {
        return s_inventoryConstructors.Keys;
    }

    public static ScriptureInventoryBase CreateInventory(
        string inventoryId,
        ChecksDataSource? dataSource = null
    )
    {
        if (!s_inventoryConstructors.TryGetValue(inventoryId, out var constructor))
            throw new ArgumentException($"Unknown inventoryId: {inventoryId}");

        var inventory = constructor();
        if (dataSource != null)
            inventory.Initialize(dataSource);
        return inventory;
    }
}
