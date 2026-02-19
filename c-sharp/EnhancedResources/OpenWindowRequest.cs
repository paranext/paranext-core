// === NEW IN PT10 ===
// Reason: PAPI command pattern - request record for opening an ER window
// Maps to: CAP-031

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Behavior when opening a new Enhanced Resource window.
/// </summary>
public enum OpenWindowBehavior
{
    /// <summary>Open a new window regardless of existing windows.</summary>
    AlwaysNew = 0,

    /// <summary>Reuse existing window for the same resource if one is open.</summary>
    ReuseExisting = 1,
}

/// <summary>
/// Request to open an Enhanced Resource window for a specific resource.
/// </summary>
/// <param name="ResourceId">The Enhanced Resource identifier (e.g., "ESV16UK+").</param>
/// <param name="Behavior">Whether to reuse an existing window or always open new.</param>
public record OpenWindowRequest(
    string ResourceId,
    OpenWindowBehavior Behavior = OpenWindowBehavior.AlwaysNew
);
