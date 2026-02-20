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
    public ReloadDecision DetermineReloadDecision(
        TextCollectionItem curItem,
        TextCollectionItem? previousItem,
        string verseRef,
        string viewName,
        bool forceReload
    )
    {
        throw new NotImplementedException("CAP-007: DetermineReloadDecision not yet implemented");
    }
}
