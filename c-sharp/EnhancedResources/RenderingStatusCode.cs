namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Discriminator for the five rendering-status states. Order matches PT9's
/// TermRenderingStatusCode enum in MarbleForm.cs.
/// </summary>
public enum RenderingStatusCode
{
    NoRenderingsEntered,
    RenderingDeniedInVerse,
    RenderingMissingInVerse,
    NoVerseText,
    GuessedRenderingFound,
    RenderingFound,
}
