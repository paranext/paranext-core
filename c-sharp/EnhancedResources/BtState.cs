using Paratext.Data.Terms;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// BT state for a tracked project.
/// Contains references to the Biblical Terms data structures needed for rendering
/// status calculation (CAP-007). All fields are null when no project is tracked.
///
/// The field types use ParatextData's Biblical Terms API:
/// - TermsList maps to BiblicalTermsList (term definitions and references)
/// - TermRenderings maps to TermRenderingsList (project-specific renderings)
/// - Analyzer maps to object (rendering guesser / analyzer for the project)
///
/// Contract: extraction-plan.md EXT-005
/// PT9 Source: MarbleForm.cs:2338-2362 (fields: _termsList, _termRenderings, _analyzer)
/// </summary>
public record BtState(
    BiblicalTermsList? TermsList,
    TermRenderingsList? TermRenderings,
    object? Analyzer
);
