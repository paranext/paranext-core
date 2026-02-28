namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// An inline image encoded as base64 (&lt;image&gt; tag).
/// </summary>
public record ImageElement(string Base64Data) : InlineElement("image");
