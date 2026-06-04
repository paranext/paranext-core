namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Related lexeme reference with relation type (Gloss, SemanticDomain, or Lexical).
/// Source: CAP-007, data-contracts.md Section 3.7, BHV-110, BHV-111
/// </summary>
public record RelatedLexemeRef(string Lemma, string Translit, string Gloss, string RelationType);
