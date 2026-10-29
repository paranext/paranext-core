using Paranext.DataProvider.Projects.SendReceive;
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

    /// <summary>
    /// Inventories whose <see cref="ScriptureInventoryBase.InventoryOptions"/> read the data source
    /// that <see cref="ScriptureInventoryBase.Initialize"/> hands them, so they cannot be described
    /// before they are initialized.
    /// </summary>
    private static readonly HashSet<string> s_inventoriesDescribedOnlyOnceInitialized =
    [
        ParagraphFinalPunctuation.InternalValue,
    ];

    public static IEnumerable<string> GetAvailableInventoryIds()
    {
        return s_inventoryConstructors.Keys;
    }

    /// <summary>
    /// Creates an inventory only to read what describes it — its type and options — never to look
    /// at or change the project's inventory. Unlike <see cref="CreateInventory"/>, it initializes
    /// the inventory only when it cannot be described otherwise, because initializing is where a
    /// check applies its defaults to the project: <c>CharactersCheck</c> saves the project's
    /// default characters to <c>Settings.xml</c> (Paratext 9 does that the first time someone uses
    /// the characters inventory or check, not when it starts), and <c>MatchedPairsCheck</c> and
    /// others set default parameter values in memory that the project's next save writes.
    /// <c>ParagraphFinalPunctuationCheck</c> is still initialized; it saves nothing, and only sets
    /// a value in memory when the project uses the advanced sentence-final view with no valid items.
    /// </summary>
    public static ScriptureInventoryBase CreateInventoryToDescribe(
        string inventoryId,
        ChecksDataSource dataSource
    )
    {
        if (s_inventoriesDescribedOnlyOnceInitialized.Contains(inventoryId))
            return CreateInventory(inventoryId, dataSource);

        if (!s_inventoryConstructors.TryGetValue(inventoryId, out var constructor))
            throw new ArgumentException($"Unknown inventoryId: {inventoryId}");
        return constructor();
    }

    /// <summary>
    /// <see cref="CreateInventory"/> for a caller that is not already inside the project's write
    /// scope. Initializing an inventory can save the project's settings — <c>CharactersCheck</c>
    /// saves the project's default characters the first time it is initialized, and
    /// <c>ChapterVerseCheck</c> can save the project's verse segment order — so the inventory is
    /// initialized inside its own write scope, and is refused while a Send/Receive of the project
    /// is armed.
    /// </summary>
    public static ScriptureInventoryBase CreateInventoryInItsOwnWriteScope(
        string projectId,
        string inventoryId,
        ChecksDataSource dataSource
    )
    {
        // TODO(PT-XXXX): wait for the sync to end instead of refusing, as Paratext 9 does
        using var _ = SendReceiveWriteLock.EnterWrite(projectId);
        return CreateInventory(inventoryId, dataSource);
    }

    /// <summary>
    /// Creates and initializes an inventory. Initializing can save the project's settings, so a
    /// caller that does not already hold the project's write scope uses
    /// <see cref="CreateInventoryInItsOwnWriteScope"/> instead.
    /// (<see cref="CreateInventoryToDescribe"/> calls this directly: the only inventory it
    /// initializes saves nothing.)
    /// </summary>
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
