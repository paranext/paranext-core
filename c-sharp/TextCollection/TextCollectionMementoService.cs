using Paratext.Data;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Stateless service for Text Collection memento operations.
/// CreateMemento serializes complete TC window state.
/// RestoreFromMemento resolves projects and detects missing ones.
/// </summary>
internal static class TextCollectionMementoService
{
    /// <summary>
    /// Creates a memento capturing complete TC window state.
    /// Returns empty memento if setupComplete is false (crash recovery safety guard).
    /// </summary>
    public static TextCollectionMemento CreateMemento(
        bool setupComplete,
        IList<TextCollectionItem> items,
        int curItem,
        bool singleShown,
        bool multiShown,
        string viewName,
        int singleZoom,
        int multiZoom,
        double splitterProportion,
        string reference,
        ScrollGroup scrollGroup
    )
    {
        if (!setupComplete)
            return new TextCollectionMemento();

        return new TextCollectionMemento
        {
            Items = items
                .Select(item => new TextCollectionItemState(
                    item.ScrTextName,
                    item.ScrTextId,
                    item.Zoom
                ))
                .ToList(),
            CurItem = curItem,
            SingleShown = singleShown,
            MultiShown = multiShown,
            ViewName = viewName,
            SingleZoom = singleZoom,
            MultiZoom = multiZoom,
            SplitterProportion = splitterProportion,
            Reference = reference,
            ScrollGroup = scrollGroup,
        };
    }

    /// <summary>
    /// Restores TC state from a memento. Detects missing projects and returns recovery info.
    /// Projects resolved via FindById(scrTextId) with fallback to Find(scrTextName).
    /// </summary>
    public static TextCollectionRestoreResult RestoreFromMemento(TextCollectionMemento memento)
    {
        ArgumentNullException.ThrowIfNull(memento);

        var restoredItems = new List<TextCollectionItem>();
        var missingProjectNames = new List<string>();

        foreach (TextCollectionItemState itemState in memento.Items)
        {
            ScrText? scrText =
                ScrTextCollection.FindById(HexId.FromStr(itemState.ScrTextId))
                ?? ScrTextCollection.Find(itemState.ScrTextName);

            if (scrText != null)
            {
                restoredItems.Add(
                    new TextCollectionItem(scrText.Name, scrText.Guid.ToString(), itemState.Zoom)
                );
            }
            else
            {
                missingProjectNames.Add(itemState.ScrTextName);
            }
        }

        return new TextCollectionRestoreResult
        {
            RestoredItems = restoredItems,
            MissingProjectNames = missingProjectNames,
            Memento = memento,
        };
    }
}
