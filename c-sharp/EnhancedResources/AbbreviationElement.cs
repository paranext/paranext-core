namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// An abbreviation tooltip (&lt;a&gt; tag).
/// </summary>
public record AbbreviationElement(string Key, string Definition) : InlineElement("abbreviation");
