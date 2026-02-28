namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for parsing lexical link strings from Enhanced Resource USX data
/// into structured link objects.
///
/// Contract: Section 2.1 (data-contracts.md)
/// </summary>
public record LexicalLinkInput(
    /// <summary>
    /// Semicolon-separated link string from USX char element.
    /// Format: "Dictionary:Lemma:BBBMMM" where BBB and MMM are 3-digit zero-padded indices.
    /// Example: "SDBG:agapao:001002"
    /// </summary>
    string LinkString
);
