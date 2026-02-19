// CAP-022 stub: ViewStateService
// PT9 Source: MarbleForm.cs:2996-3026 (MarbleFormMemento)
// Contract: data-contracts.md Methods 22a/22b (SaveViewState / LoadViewState)
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Provides persistence of Enhanced Resource window state.
/// Save persists state keyed by windowId; Load retrieves it.
/// Returns null when no saved state exists for the given windowId.
///
/// Implementation: Uses SettingsService for persistence and JSON serialization
/// for the EnhancedResourceViewState record.
/// </summary>
internal static class ViewStateService
{
    /// <summary>
    /// Persists the Enhanced Resource window state for the given windowId.
    /// </summary>
    /// <param name="windowId">Unique identifier for the ER window instance.</param>
    /// <param name="state">The complete view state to persist.</param>
    public static Task SaveViewStateAsync(
        string windowId,
        EnhancedResourceViewState state,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException("CAP-022: SaveViewStateAsync not yet implemented");
    }

    /// <summary>
    /// Loads the previously-persisted Enhanced Resource window state for the given windowId.
    /// Returns null if no state has been saved for this windowId.
    /// </summary>
    /// <param name="windowId">Unique identifier for the ER window instance.</param>
    /// <returns>The saved view state, or null if no state exists.</returns>
    public static Task<EnhancedResourceViewState?> LoadViewStateAsync(
        string windowId,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException("CAP-022: LoadViewStateAsync not yet implemented");
    }
}
