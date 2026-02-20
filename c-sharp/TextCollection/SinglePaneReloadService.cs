// === EXTRACTION: EXT-008 SinglePaneReloadService ===
// Source: PT9/ParatextBase/TextCollection/TextCollectionControl.cs:357-420
// Complexity: Complex
// Behaviors: BHV-T007

using System.Collections.Concurrent;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Determines if single-pane needs full reload (text/view changed or forced).
/// Manages per-text zoom save/restore using dictionary keyed by project GUID.
/// Instance class -- one per TextCollection window.
/// Thread-safe via ConcurrentDictionary for zoom state.
/// </summary>
internal sealed class SinglePaneReloadService
{
    private readonly ConcurrentDictionary<string, double> _singleTextZooms = new();
    private string? _lastTextId;
    private string? _lastViewName;

    /// <summary>
    /// Determines whether the single pane needs a full reload and what zoom to apply.
    /// Saves the previous item's zoom before switching, restores or defaults zoom for the new item.
    /// </summary>
    /// <param name="curItem">Current selected text item.</param>
    /// <param name="previousItem">Previously selected text item, or null if first call.</param>
    /// <param name="verseRef">Current verse reference string.</param>
    /// <param name="viewName">Current view mode (Preview, Unformatted, Standard).</param>
    /// <param name="forceReload">Whether to force a full reload regardless of state.</param>
    /// <returns>ReloadDecision indicating if full reload is needed and what zoom to apply.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/TextCollection/TextCollectionControl.cs:357-420
    // Method: TextCollectionControl.ReloadSingle()
    // Maps to: EXT-008, BHV-T007
    //
    // EXPLANATION:
    // This method determines whether the single pane needs a full reload based on:
    // 1. Text changed (previousItem null or different ScrTextId from curItem)
    // 2. View mode changed (viewName differs from last call's viewName)
    // 3. Force reload flag set
    // When a full reload is needed and a previousItem exists, the previous item's
    // zoom is saved to the dictionary keyed by ScrTextId. The zoom to apply is then
    // looked up for curItem: if a saved zoom exists, use it; otherwise use curItem.Zoom
    // as the default. This matches PT9 lines 389-390 (save) and 408-413 (restore).
    public ReloadDecision DetermineReloadDecision(
        TextCollectionItem curItem,
        TextCollectionItem? previousItem,
        string verseRef,
        string viewName,
        bool forceReload
    )
    {
        // Determine if text changed (PT9 line 371: joinedScrText != uiSingleResource.ScriptureText)
        bool textChanged = previousItem == null || curItem.ScrTextId != previousItem.ScrTextId;

        // Determine if view mode changed (PT9 line 372: uiSingleResource.View.Name != viewName)
        bool viewModeChanged = _lastViewName != null && viewName != _lastViewName;

        // Full reload needed if any condition is true (PT9 line 371-372)
        bool fullReloadNeeded = textChanged || viewModeChanged || forceReload;

        if (fullReloadNeeded && previousItem != null)
        {
            // Save previous item's zoom before switching (PT9 lines 389-390)
            _singleTextZooms[previousItem.ScrTextId] = previousItem.Zoom;
        }

        // Determine zoom to apply for curItem (PT9 lines 408-413)
        // If no saved zoom exists, use curItem's own zoom as default
        double zoomToApply = _singleTextZooms.GetOrAdd(curItem.ScrTextId, curItem.Zoom);

        // Update tracked state for next call
        _lastTextId = curItem.ScrTextId;
        _lastViewName = viewName;

        return new ReloadDecision(fullReloadNeeded, zoomToApply);
    }
}
