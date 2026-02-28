namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured representation of a parsed lexical link from Enhanced Resource USX data.
///
/// Contract: Section 3.1 (data-contracts.md)
/// Behavior: BHV-302 (Lexical Link Data Model)
/// </summary>
public record LexicalLink(
    /// <summary>Dictionary name: "SDBG", "SDBH", or "DCLEX".</summary>
    string Dictionary,
    /// <summary>Lemma text (Unicode normalized).</summary>
    string Lemma,
    /// <summary>Base form index (1-based, from 3-digit BBBMMM format).</summary>
    int BaseFormIndex,
    /// <summary>Meaning index (1-based, from 3-digit BBBMMM format).</summary>
    int MeaningIndex
);
