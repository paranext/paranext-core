using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for generating scripture pane HTML.
///
/// Contract: Section 4.12 GenerateScriptureHtml (data-contracts.md)
/// Behaviors: BHV-100, BHV-101, BHV-103, BHV-404, BHV-417, BHV-608, BHV-609
/// </summary>
public record GenerateScriptureHtmlInput(
    string ResourceId,
    VerseRef VerseRef,
    HighlightFlags HighlightFlags,
    SourceWordDisplayMode HebrewDisplayMode,
    SourceWordDisplayMode GreekDisplayMode,
    string? TrackedProjectId,
    string ScopeFilter,
    string? FilteredLemma
);
