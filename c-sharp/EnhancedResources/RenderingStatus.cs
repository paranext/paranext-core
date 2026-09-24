namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Rendering-status section of the tooltip - mirrors PT9 MarbleForm.cs:2715-2742.
/// Populated only when a tracked translation project is available to the ER webview.
/// The TS markdown emitter substitutes TrackedProjectName and FoundRendering into one
/// of five localized templates (see %enhancedResources_tooltip_*Rendering*% keys).
/// </summary>
public record RenderingStatus(
    RenderingStatusCode Code,
    string? FoundRendering,
    string? TrackedProjectName
);
