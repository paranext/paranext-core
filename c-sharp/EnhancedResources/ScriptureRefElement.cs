namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A scripture reference goto link (&lt;s&gt; tag).
/// </summary>
public record ScriptureRefElement(string VerseRef, string DisplayText)
    : InlineElement("scriptureRef");
