namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A see-also link to another encyclopedia entry (&lt;l&gt; tag).
/// </summary>
public record SeeAlsoElement(string EntryId, string DisplayText) : InlineElement("seeAlso");
