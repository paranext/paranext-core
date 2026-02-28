using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for filtering the token stream to return only lexical links within
/// the specified scope (verse, section, chapter, or sense).
///
/// Contract: Section 2.2 ScopeFilterInput (data-contracts.md)
/// Behavior: BHV-402 (Scope Filter Selection), BHV-608 (Marble Data Parsing)
/// </summary>
public record ScopeFilterInput(
    VerseRef VerseRef,
    string Scope,
    string? FilteredLemma,
    string? FilteredSource,
    string ResourceId
);
