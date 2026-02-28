namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Display mode for Hebrew/Greek source words in the scripture pane.
///
/// Contract: Section 4.12 GenerateScriptureHtml (data-contracts.md)
/// Behavior: BHV-103 (Resource Font and Language Settings Resolution)
/// Golden Master: GM-034 (display modes)
/// </summary>
public enum SourceWordDisplayMode
{
    /// <summary>Show source words in their original script (Hebrew/Greek).</summary>
    Original,

    /// <summary>Show source words in transliterated (Latin script) form.</summary>
    Transliteration,

    /// <summary>Show both original script and transliteration.</summary>
    Both,
}
