// === EXTRACTION: EXT-001 TextCollectionMementoService ===
// Source: PT9/Paratext/TextCollectionForm.cs:166-278, 588-624
// Complexity: Complex
// Target: c-sharp/TextCollection/TextCollectionMementoService.cs
// Pattern: Service (stateless)
// Behaviors: BHV-600, BHV-T014, BHV-T015
// Scenarios: TS-048, TS-049, TS-050, TS-051

using Paratext.Data;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Stateless service for Text Collection memento operations.
/// CreateMemento serializes complete TC window state.
/// RestoreFromMemento resolves projects and detects missing ones.
/// </summary>
internal static class TextCollectionMementoService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/TextCollectionForm.cs:166-278
    // Method: TextCollectionForm.CreateMementoInternal
    // Maps to: EXT-001, BHV-600, BHV-T014
    /// <summary>
    /// Creates a memento capturing complete TC window state.
    /// Returns empty memento if setupComplete is false (BHV-600 safety guard).
    /// Source: PT9/Paratext/TextCollectionForm.cs:166-278
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
        // BHV-600: Return empty memento when setup not complete (crash recovery safety)
        if (!setupComplete)
        {
            return new TextCollectionMemento();
        }

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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/TextCollectionForm.cs:588-624
    // Method: TextCollectionForm.SetState
    // Maps to: EXT-001, BHV-103, BHV-516, BHV-T015
    /// <summary>
    /// Restores TC state from a memento. Detects missing projects and returns recovery info.
    /// Projects resolved via FindById(scrTextId) with fallback to Find(scrTextName).
    /// Source: PT9/Paratext/TextCollectionForm.cs:588-624
    /// </summary>
    public static TextCollectionRestoreResult RestoreFromMemento(TextCollectionMemento memento)
    {
        ArgumentNullException.ThrowIfNull(memento);

        var restoredItems = new List<TextCollectionItem>();
        var missingProjectNames = new List<string>();

        foreach (TextCollectionItemState itemState in memento.Items)
        {
            // BHV-103: Try FindById first, then fallback to Find by name
            ScrText? scrText = ScrTextCollection.FindById(HexId.FromStr(itemState.ScrTextId));

            if (scrText == null)
            {
                scrText = ScrTextCollection.Find(itemState.ScrTextName);
            }

            if (scrText != null)
            {
                // Use the resolved ScrText name (may differ from memento if renamed)
                restoredItems.Add(
                    new TextCollectionItem(scrText.Name, scrText.Guid.ToString(), itemState.Zoom)
                );
            }
            else
            {
                // BHV-516: Track missing projects for notification
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
