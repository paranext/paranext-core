namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parsed lexical link output. Contains strong number, source text, lemma,
/// and link type for scope-filtered results.
/// Source: data-contracts.md Section 3.2
/// STUB: Created by tdd-test-writer for CAP-003. Will be implemented by tdd-implementer.
/// </summary>
public record MarbleLexicalLinkOutput(
    string Lemma,
    string SenseId,
    string EntryReference,
    MarbleLinkType LinkType,
    string SourceText,
    string Transliteration,
    string StrongNumber
);
