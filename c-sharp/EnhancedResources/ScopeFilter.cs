// CAP-022 stub: ScopeFilter enum
// PT9 Source: MarbleForm.cs scope filtering logic
// Contract: data-contracts.md ScopeFilter enum
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Specifies the filtering scope for research pane content.
/// </summary>
public enum ScopeFilter
{
    CurrentVerse = 0,
    CurrentSection = 1,
    CurrentChapter = 2,
    CurrentSense = 3,
}
