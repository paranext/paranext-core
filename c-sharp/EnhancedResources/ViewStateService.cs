// === NEW IN PT10 ===
// Reason: PAPI command pattern - view state persistence for ER windows
// Maps to: CAP-022
// PT9 Source: MarbleForm.cs:2996-3026 (MarbleFormMemento)
// Contract: data-contracts.md Methods 22a/22b (SaveViewState / LoadViewState)
using System.Collections.Concurrent;
using System.Text.Json;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Provides persistence of Enhanced Resource window state.
/// Save persists state keyed by windowId; Load retrieves it.
/// Returns null when no saved state exists for the given windowId.
/// </summary>
internal static class ViewStateService
{
    private static readonly ConcurrentDictionary<string, string> s_store = new();

    private static readonly JsonSerializerOptions s_jsonOptions =
        new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

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
        var json = JsonSerializer.Serialize(state, s_jsonOptions);
        s_store[windowId] = json;
        return Task.CompletedTask;
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
        if (s_store.TryGetValue(windowId, out var json))
        {
            var state = JsonSerializer.Deserialize<EnhancedResourceViewState>(json, s_jsonOptions);
            return Task.FromResult(state);
        }
        return Task.FromResult<EnhancedResourceViewState?>(null);
    }
}
