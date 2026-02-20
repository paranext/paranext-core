// CAP-022 stub: TermHighlightFilter enum
// PT9 Source: MarbleForm.cs SelectedMarbleTermHighlight
// Contract: data-contracts.md TermHighlightFilter enum
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Controls which Biblical Terms are highlighted in the scripture pane.
/// </summary>
public enum TermHighlightFilter
{
    AllResearchTerms = 0,
    FoundTerms = 1,
    MissingTerms = 2,
}
